import { CLIENT_ROW } from "@/content/home";

/**
 * Les entreprises équipées, en une ligne, sous l'accueil.
 *
 * Quatre noms, en texte, immobiles. Une bande qui défile convient à vingt
 * logos ; avec quatre noms elle tourne à vide et empêche de lire. Chaque nom
 * est réel et le lecteur peut les comparer aux trois cas détaillés dessous.
 */
export function ClientNames() {
  return (
    <section id="clients" aria-label="Entreprises équipées" className="client-row">
      <div className="container-page client-row-inner">
        <p className="client-row-label">{CLIENT_ROW.label}</p>
        <ul className="client-row-list">
          {CLIENT_ROW.names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
