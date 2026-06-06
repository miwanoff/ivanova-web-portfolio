import { createFileRoute } from "@tanstack/react-router";
import marina from "@/assets/marina.jpg";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Навички — Марина Іванова" },
      { name: "description", content: "Технології, інструменти та підходи у роботі Марини Іванової." },
      { property: "og:title", content: "Навички — Марина Іванова" },
      { property: "og:description", content: "Технологічний стек та експертиза." },
    ],
  }),
  component: SkillsPage,
});

const groups = [
  { t: "Фронтенд", s: [["React", 95], ["TypeScript", 92], ["Next.js", 88], ["TailwindCSS", 96], ["Three.js / GSAP", 75]] },
  { t: "Бекенд", s: [["Node.js", 85], ["PostgreSQL", 80], ["GraphQL", 78], ["REST API", 90], ["Supabase", 82]] },
  { t: "Інструменти", s: [["Figma", 88], ["Git / GitHub", 95], ["Docker", 70], ["Vercel / Cloudflare", 85], ["Vitest / Playwright", 80]] },
];

function SkillsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid lg:grid-cols-[1fr_400px] gap-16 mb-20">
        <div className="animate-float-up">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">◢ 02 / Стек</div>
          <h1 className="font-display text-[clamp(3rem,9vw,8rem)]">
            ЩО Я<br /><span className="text-gradient">ВМІЮ.</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground text-lg">
            Я працюю на стику дизайну та інженерії: пишу чистий код, дбаю про продуктивність і вірю, що деталі змінюють усе.
          </p>
        </div>
        <div className="relative animate-float-up" style={{ animationDelay: "0.2s" }}>
          <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl" />
          <img
            src={marina}
            alt="Марина Іванова"
            width={800}
            height={1024}
            loading="lazy"
            className="relative rounded-xl border border-border w-full object-cover"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {groups.map((g, gi) => (
          <div key={g.t} className="border border-border rounded-xl p-8 bg-card/50 hover:border-primary transition animate-float-up" style={{ animationDelay: `${gi * 0.1}s` }}>
            <h3 className="font-display text-2xl mb-6 flex items-center gap-3">
              <span className="text-primary">◆</span> {g.t}
            </h3>
            <ul className="space-y-4">
              {g.s.map(([name, val]) => (
                <li key={name as string}>
                  <div className="flex justify-between text-sm font-mono mb-1">
                    <span>{name}</span>
                    <span className="text-primary">{val}%</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${val}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}