import { Link } from "@tanstack/react-router";
import { OTHER_PROJECTS } from "@/content/home";

/**
 * Une ligne discrète, tout en bas : les autres projets du studio.
 *
 * Ils ne sont plus des cartes sur la page d'accueil, parce qu'un patron de
 * PME venu pour ses devis n'a rien à faire d'une application de sport. Les
 * liens restent pour qui les cherche, et pour le maillage interne.
 */
export function OtherProjects() {
  return (
    <aside className="other-projects" aria-label={OTHER_PROJECTS.label}>
      <div className="container-page other-projects-inner">
        <span className="other-projects-label">{OTHER_PROJECTS.label} :</span>
        <ul>
          {OTHER_PROJECTS.links.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="other-projects-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
