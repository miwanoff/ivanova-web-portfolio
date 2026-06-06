import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Головна" },
  { to: "/projects", label: "Проєкти" },
  { to: "/skills", label: "Навички" },
  { to: "/contact", label: "Контакти" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-tight">
          МАРИНА<span className="text-gradient">.DEV</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-mono uppercase tracking-wider">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-muted-foreground hover:text-primary transition-colors relative group"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>
        <a
          href="mailto:marina@dev.ua"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary/40 text-primary text-xs font-mono uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all"
        >
          Готова до співпраці
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 mt-32">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row justify-between gap-6 text-sm text-muted-foreground font-mono">
        <div>© 2026 Марина Іванова. Зроблено з кодом та кавою.</div>
        <div className="flex gap-6">
          <a href="https://github.com" className="hover:text-primary transition">GitHub</a>
          <a href="https://linkedin.com" className="hover:text-primary transition">LinkedIn</a>
          <a href="https://t.me" className="hover:text-primary transition">Telegram</a>
        </div>
      </div>
    </footer>
  );
}