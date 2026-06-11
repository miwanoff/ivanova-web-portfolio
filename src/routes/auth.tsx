import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Вхід — Марина Іванова" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setError("Невірний email або пароль.");
          return;
        }
        navigate({ to: "/inbox" });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/inbox` },
        });
        if (error) {
          setError(
            error.message.includes("already registered")
              ? "Користувач з таким email вже існує."
              : "Не вдалося створити акаунт. Спробуйте ще раз.",
          );
          return;
        }
        if (data.session) {
          navigate({ to: "/inbox" });
        } else {
          setInfo("Перевірте пошту — ми надіслали лист для підтвердження акаунта.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 tech-grid-bg opacity-30 animate-grid" />
      <div className="relative w-full max-w-md mx-6 animate-float-up">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">◢ Приватна зона</div>
        <h1 className="font-display text-5xl mb-8">
          {mode === "login" ? "ВХІД" : "РЕЄСТРАЦІЯ"}<span className="text-gradient">.</span>
        </h1>
        <form onSubmit={onSubmit} className="border border-border rounded-xl p-8 bg-card/70 backdrop-blur space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border rounded-md px-4 py-3 focus:border-primary focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Пароль</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-md px-4 py-3 focus:border-primary focus:outline-none transition"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive border border-destructive/40 rounded-md px-4 py-3">{error}</p>
          )}
          {info && (
            <p className="text-sm text-primary border border-primary/40 rounded-md px-4 py-3">{info}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm hover:shadow-[var(--shadow-glow)] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Зачекайте..." : mode === "login" ? "Увійти →" : "Створити акаунт →"}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError(null);
              setInfo(null);
            }}
            className="w-full text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition"
          >
            {mode === "login" ? "Немає акаунта? Зареєструватися" : "Вже є акаунт? Увійти"}
          </button>
        </form>
      </div>
    </div>
  );
}