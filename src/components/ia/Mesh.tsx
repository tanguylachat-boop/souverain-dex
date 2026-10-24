import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/scroll-track";

/**
 * Nappe de dégradés animée, rendue en WebGL dans un seul fragment shader :
 * un champ de bruit simplex déforme les coordonnées, cinq foyers gaussiens
 * dérivent lentement et s'ajoutent à la nuit, un grain fin évite les paliers.
 * Écrite pour LX Studio dans sa palette (nuit, bleu profond, bleu LX, bleu
 * clair). Sans WebGL ou avec mouvement réduit, le calque CSS en dessous
 * (`.ia-mesh-css`) tient seul.
 *
 * Le rendu ne tourne que lorsque le canvas est visible, à 1,5× de densité
 * au plus, et s'arrête avec le composant.
 */

const VERT = `attribute vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uInt;
uniform vec4 uCtl[5];
uniform vec2 uAmp[5];
uniform vec3 uCol[5];
uniform float uWgt[5];
const vec3 NIGHT = vec3(0.020, 0.039, 0.141);

vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865, 0.366025403, -0.577350269, 0.024390243);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float ratio = uRes.x / max(uRes.y, 1.0);
  float t = uTime * 0.06;
  // Coordonnées déformées par le bruit : la nappe ondule, elle ne glisse pas.
  float n1 = snoise(uv * 1.6 + vec2(t * 0.7, -t * 0.5));
  float n2 = snoise(uv * 3.1 - vec2(t * 0.4, t * 0.6));
  vec2 w = uv + vec2(n1, n2) * 0.09;
  vec3 col = NIGHT;
  for (int k = 0; k < 5; k++) {
    vec2 c = uCtl[k].xy + uAmp[k] * vec2(sin(uTime * uCtl[k].z + uCtl[k].w), cos(uTime * uCtl[k].z * 0.8 + uCtl[k].w * 1.3));
    vec2 d = (w - c) * vec2(ratio, 1.0);
    float g = exp(-dot(d, d) * uWgt[k]);
    col += uCol[k] * g * uInt;
  }
  // Isolignes douces du champ de bruit, seulement là où la nappe éclaire.
  float iso = smoothstep(0.02, 0.0, abs(fract(n1 * 2.5) - 0.5) - 0.48);
  col += vec3(0.18, 0.32, 0.6) * iso * 0.06 * clamp((col.b - NIGHT.b) * 6.0, 0.0, 1.0);
  col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.018;
  gl_FragColor = vec4(col, 1.0);
}`;

// Foyers : x, y (0..1), vitesse, phase. Amplitudes de dérive. Couleurs déjà
// pondérées (elles s'ajoutent à la nuit). Raideur : grande = lueur serrée.
const CTL = [
  0.24, 0.34, 0.079, 0.0, 0.78, 0.22, 0.061, 1.9, 0.55, 0.78, 0.052, 3.4, 0.1, 0.86, 0.068, 5.1,
  0.92, 0.62, 0.046, 2.3,
];
const AMP = [0.18, 0.2, 0.16, 0.24, 0.2, 0.18, 0.15, 0.22, 0.17, 0.26];
const COL = [
  0.03,
  0.09,
  0.3, // bleu profond, la nappe de fond
  0.07,
  0.19,
  0.52, // bleu LX, large
  0.22,
  0.36,
  0.58, // bleu clair, resserré
  0.05,
  0.15,
  0.44, // bleu LX, second foyer
  0.14,
  0.24,
  0.4, // bleu clair, pointe
];
const WGT = [1.9, 3.1, 6.2, 4.0, 8.2];

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function Mesh({
  intensity = 1,
  className = "",
  always = false,
}: {
  intensity?: number;
  className?: string;
  /** Rendu WebGL aussi sur téléphone. Sinon, sous 760 px, le calque CSS suffit. */
  always?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (!always && window.matchMedia("(max-width: 760px)").matches) return;
    const opts = {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power" as const,
    };
    const gl = (canvas.getContext("webgl", opts) ??
      canvas.getContext("experimental-webgl", opts)) as WebGLRenderingContext | null;
    if (!gl) return;
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const u = (name: string) => gl.getUniformLocation(prog, name);
    gl.uniform4fv(u("uCtl"), CTL);
    gl.uniform2fv(u("uAmp"), AMP);
    gl.uniform3fv(u("uCol"), COL);
    gl.uniform1fv(u("uWgt"), WGT);
    gl.uniform1f(u("uInt"), intensity);
    const uRes = u("uRes");
    const uTime = u("uTime");

    const reduced = prefersReducedMotion();
    let frame = 0;
    let visible = false;
    let running = false;
    const start = performance.now() - Math.random() * 60_000;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr * 0.7));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr * 0.7));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };
    const draw = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      frame = 0;
      if (!running) return;
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const resume = () => {
      if (running || reduced) return;
      running = true;
      size();
      frame = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    size();
    draw(performance.now());
    canvas.classList.add("is-on");

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) resume();
        else pause();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);
    const onResize = () => {
      size();
      if (!running) draw(performance.now());
    };
    window.addEventListener("resize", onResize);
    const onVis = () => {
      if (document.hidden) pause();
      else if (visible) resume();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      pause();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [intensity, always]);

  return (
    <>
      <div className="ia-mesh-css" aria-hidden="true" />
      <canvas ref={ref} className={`ia-mesh ${className}`.trim()} aria-hidden="true" />
    </>
  );
}
