export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} LX Studio. Tous droits réservés.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Mentions légales</a>
          <a href="mailto:contact@lxstudio.ch" className="hover:text-foreground transition-colors">
            contact@lxstudio.ch
          </a>
        </div>
      </div>
    </footer>
  );
}
