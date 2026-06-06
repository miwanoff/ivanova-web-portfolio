import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroPoster from "@/assets/hero-poster.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Марина Іванова — Веб-розробниця" },
      { name: "description", content: "Створюю сучасні швидкі веб-додатки на React, TypeScript та Node.js." },
      { property: "og:title", content: "Марина Іванова — Веб-розробниця" },
      { property: "og:description", content: "Створюю сучасні швидкі веб-додатки." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden -mt-20 pt-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroPoster}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source
            src="https://cdn.pixabay.com/video/2020/08/30/48569-454825064_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 tech-grid-bg opacity-40 animate-grid" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 w-full">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6 animate-float-up">
            ◢ Веб-розробниця · Київ, Україна
          </div>
          <h1 className="font-display text-[clamp(3.5rem,12vw,11rem)] leading-[0.85] animate-float-up" style={{ animationDelay: "0.1s" }}>
            КОД,<br />
            ЯКИЙ <span className="text-gradient">ПРАЦЮЄ.</span>
          </h1>
          <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-float-up" style={{ animationDelay: "0.3s" }}>
            <p className="max-w-md text-lg text-muted-foreground">
              Я Марина Іванова — фронтенд-розробниця з 6+ роками досвіду. Перетворюю складні ідеї на швидкі, доступні та красиві інтерфейси.
            </p>
            <div className="flex gap-4">
              <Link to="/projects" className="px-8 py-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm hover:shadow-[var(--shadow-glow)] transition-all">
                Дивитися роботи →
              </Link>
              <Link to="/contact" className="px-8 py-4 border border-border font-mono uppercase tracking-wider text-sm hover:border-primary hover:text-primary transition">
                Зв'язатися
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border/50 py-8 overflow-hidden bg-card/30">
        <div className="flex animate-marquee whitespace-nowrap font-display text-5xl md:text-7xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12 pr-12">
              {["React", "TypeScript", "Next.js", "Node.js", "TailwindCSS", "GraphQL", "PostgreSQL", "Figma"].map((s) => (
                <span key={s} className="flex items-center gap-12 text-muted-foreground/40 hover:text-primary transition">
                  {s}
                  <span className="text-primary">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* INTRO STATS */}
      <section className="mx-auto max-w-7xl px-6 py-32 grid md:grid-cols-3 gap-12">
        {[
          { n: "6+", l: "Років у розробці" },
          { n: "40+", l: "Запущених проєктів" },
          { n: "12", l: "Країн клієнтів" },
        ].map((s) => (
          <div key={s.l} className="border-l-2 border-primary pl-6">
            <div className="font-display text-7xl text-gradient">{s.n}</div>
            <div className="font-mono uppercase text-xs tracking-wider text-muted-foreground mt-3">{s.l}</div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="relative rounded-2xl border border-border bg-card/50 overflow-hidden p-12 md:p-20">
          <div className="absolute inset-0 tech-grid-bg opacity-30" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <h2 className="font-display text-5xl md:text-7xl">
              МАЄШ <span className="text-gradient">ІДЕЮ?</span><br />
              ЗРОБИМО.
            </h2>
            <div>
              <p className="text-muted-foreground text-lg mb-6">
                Від MVP до повноцінного продукту — я допоможу вам пройти шлях від концепції до запуску.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm hover:shadow-[var(--shadow-glow)] transition">
                Почати проєкт →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
