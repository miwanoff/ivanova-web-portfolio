import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Проєкти — Марина Іванова" },
      { name: "description", content: "Підбірка вибраних проєктів: вебзастосунки, інтерфейси та продукти." },
      { property: "og:title", content: "Проєкти — Марина Іванова" },
      { property: "og:description", content: "Вибрані роботи Марини Іванової." },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  { y: "2025", t: "NEONBANK", d: "Цифровий необанк нового покоління. Дизайн-система, мобільний веб, складні форми KYC.", tags: ["React", "Next.js", "Stripe"], c: "from-cyan-500/30 to-blue-500/10" },
  { y: "2025", t: "ORBIT CRM", d: "B2B-платформа управління відносинами з клієнтами для логістичних компаній.", tags: ["TypeScript", "GraphQL", "Postgres"], c: "from-orange-500/30 to-pink-500/10" },
  { y: "2024", t: "LUMEN STUDIO", d: "Сайт креативного агентства з відеофоном, складними анімаціями та інтерактивом.", tags: ["GSAP", "Three.js", "Vite"], c: "from-violet-500/30 to-cyan-500/10" },
  { y: "2024", t: "KITCHEN OS", d: "SaaS для управління ресторанами: меню, замовлення, кухонний дисплей у реальному часі.", tags: ["React", "Node.js", "WebSockets"], c: "from-emerald-500/30 to-teal-500/10" },
  { y: "2023", t: "VESNA CHARITY", d: "Платформа для українських благодійних фондів зі звітністю та збором донатів.", tags: ["Astro", "Stripe", "Sanity"], c: "from-yellow-500/30 to-orange-500/10" },
  { y: "2023", t: "PIXEL PORTFOLIO", d: "Конструктор портфоліо для дизайнерів з drag-and-drop редактором та темою.", tags: ["React", "DnD", "Supabase"], c: "from-pink-500/30 to-violet-500/10" },
];

function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-20 animate-float-up">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">◢ 01 / Портфоліо</div>
        <h1 className="font-display text-[clamp(3rem,10vw,9rem)]">
          ВИБРАНІ<br /><span className="text-gradient">РОБОТИ</span>
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground text-lg">
          Шість років. Десятки запусків. Ось проєкти, якими я пишаюся найбільше.
        </p>
      </div>

      <div className="grid gap-6">
        {projects.map((p, i) => (
          <article
            key={p.t}
            className="group relative border border-border rounded-xl overflow-hidden bg-card hover:border-primary transition-all animate-float-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${p.c} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative grid md:grid-cols-[80px_1fr_auto] gap-6 p-8 items-center">
              <div className="font-mono text-sm text-muted-foreground">{p.y}</div>
              <div>
                <h3 className="font-display text-3xl md:text-5xl mb-2 group-hover:text-gradient transition">{p.t}</h3>
                <p className="text-muted-foreground max-w-2xl">{p.d}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs font-mono border border-border rounded-full">{t}</span>
                  ))}
                </div>
              </div>
              <div className="font-display text-5xl text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                →
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}