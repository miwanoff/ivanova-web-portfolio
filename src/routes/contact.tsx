import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Контакти — Марина Іванова" },
      { name: "description", content: "Зв'яжіться з Мариною Івановою щодо вебпроєктів та співпраці." },
      { property: "og:title", content: "Контакти — Марина Іванова" },
      { property: "og:description", content: "Напишіть мені про ваш проєкт." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="relative min-h-[80vh]">
      <div className="absolute inset-0 tech-grid-bg opacity-30 animate-grid" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-16">
        <div className="animate-float-up">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">◢ 03 / Зв'язок</div>
          <h1 className="font-display text-[clamp(3rem,9vw,8rem)]">
            ДАВАЙТЕ<br /><span className="text-gradient">ПОГОВОРИМО.</span>
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground text-lg">
            Маєте проєкт? Шукаєте розробницю в команду? Або просто хочете обговорити веб — я відповім протягом 24 годин.
          </p>
          <div className="mt-10 space-y-4 font-mono text-sm">
            <div className="flex gap-3"><span className="text-primary">→</span> marina@dev.ua</div>
            <div className="flex gap-3"><span className="text-primary">→</span> +380 67 123 45 67</div>
            <div className="flex gap-3"><span className="text-primary">→</span> Київ, Україна (UTC+2)</div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="border border-border rounded-xl p-8 bg-card/70 backdrop-blur animate-float-up space-y-5"
          style={{ animationDelay: "0.2s" }}
        >
          {sent ? (
            <div className="text-center py-12">
              <div className="font-display text-5xl text-gradient mb-4">ДЯКУЮ!</div>
              <p className="text-muted-foreground">Я отримала ваше повідомлення і відповім якнайшвидше.</p>
            </div>
          ) : (
            <>
              <Field label="Ваше ім'я" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Бюджет" name="budget" placeholder="$5K – $20K" />
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Розкажіть про проєкт</label>
                <textarea required rows={5} className="w-full bg-background border border-border rounded-md px-4 py-3 focus:border-primary focus:outline-none transition" />
              </div>
              <button className="w-full py-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm hover:shadow-[var(--shadow-glow)] transition">
                Надіслати →
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-md px-4 py-3 focus:border-primary focus:outline-none transition"
      />
    </div>
  );
}