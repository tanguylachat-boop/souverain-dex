import { createRouter, useRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

function DefaultErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <main className="ia-main" style={{ display: "grid", placeItems: "center", padding: "24px" }}>
      <div style={{ maxWidth: 480, textAlign: "center" }}>
        <p className="ia-eyebrow" style={{ justifyContent: "center" }}>
          Erreur
        </p>
        <h1
          className="ia-title"
          style={{ margin: "16px auto 0", fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          Quelque chose n'a pas fonctionné.
        </h1>
        <p className="ia-lede" style={{ margin: "14px auto 0" }}>
          Rechargez la page. Si le problème persiste, écrivez à contact@lxstudio.ch.
        </p>
        {import.meta.env.DEV && error.message ? (
          <pre
            style={{
              marginTop: 16,
              textAlign: "left",
              fontSize: 12,
              whiteSpace: "pre-wrap",
              color: "#8a1c1c",
            }}
          >
            {error.message}
          </pre>
        ) : null}
        <div className="ia-btn-row" style={{ marginTop: 28, justifyContent: "center" }}>
          <button
            type="button"
            className="ia-btn is-primary"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Réessayer
          </button>
          <a href="/" className="ia-btn is-outline">
            Retour à l'accueil
          </a>
        </div>
      </div>
    </main>
  );
}

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent,
  });

  return router;
};
