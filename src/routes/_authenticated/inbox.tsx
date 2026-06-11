import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { supabase } from "@/integrations/supabase/client";
import { getInboxMessages, deleteInboxMessage } from "@/lib/inbox.functions";

export const Route = createFileRoute("/_authenticated/inbox")({
  head: () => ({
    meta: [
      { title: "Вхідні — Марина Іванова" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: InboxPage,
});

function InboxPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchMessages = useServerFn(getInboxMessages);
  const removeMessage = useServerFn(deleteInboxMessage);

  const { data, isPending, isError } = useQuery({
    queryKey: ["inbox-messages"],
    queryFn: () => fetchMessages(),
  });

  const onDelete = async (id: string) => {
    await removeMessage({ data: { id } });
    queryClient.invalidateQueries({ queryKey: ["inbox-messages"] });
  };

  const onSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="relative min-h-[80vh]">
      <div className="absolute inset-0 tech-grid-bg opacity-30 animate-grid" />
      <div className="relative mx-auto max-w-4xl px-6 py-20">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-10 animate-float-up">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">◢ Приватна зона</div>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)]">
              ВХІДНІ<span className="text-gradient">.</span>
            </h1>
          </div>
          <button
            onClick={onSignOut}
            className="px-4 py-2 rounded-md border border-border text-xs font-mono uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary transition"
          >
            Вийти →
          </button>
        </div>

        {isPending && <p className="font-mono text-sm text-muted-foreground">Завантаження...</p>}
        {isError && (
          <p className="text-sm text-destructive border border-destructive/40 rounded-md px-4 py-3">
            Не вдалося завантажити повідомлення. Спробуйте оновити сторінку.
          </p>
        )}

        {data && !data.authorized && (
          <div className="border border-border rounded-xl p-8 bg-card/70 backdrop-blur">
            <p className="font-display text-2xl mb-2">ДОСТУП ЗАБОРОНЕНО</p>
            <p className="text-muted-foreground text-sm">
              Ця сторінка доступна лише власниці сайту. Ваш акаунт не має прав адміністратора.
            </p>
          </div>
        )}

        {data?.authorized && data.messages.length === 0 && (
          <div className="border border-border rounded-xl p-12 bg-card/70 backdrop-blur text-center">
            <p className="font-display text-2xl mb-2">ПОКИ ПОРОЖНЬО</p>
            <p className="text-muted-foreground text-sm">Нові повідомлення з форми контактів з'являться тут.</p>
          </div>
        )}

        {data?.authorized && data.messages.length > 0 && (
          <ul className="space-y-4">
            {data.messages.map((m) => (
              <li key={m.id} className="border border-border rounded-xl p-6 bg-card/70 backdrop-blur animate-float-up">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="font-semibold">{m.name}</div>
                    <a href={`mailto:${m.email}`} className="font-mono text-sm text-primary hover:underline">
                      {m.email}
                    </a>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-muted-foreground">
                      {new Date(m.created_at).toLocaleString("uk-UA", { dateStyle: "medium", timeStyle: "short" })}
                    </div>
                    {m.budget && (
                      <div className="mt-1 inline-block px-2 py-0.5 rounded border border-primary/40 text-primary font-mono text-xs">
                        {m.budget}
                      </div>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-sm text-foreground/90 whitespace-pre-wrap">{m.message}</p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => onDelete(m.id)}
                    className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-destructive transition"
                  >
                    Видалити ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}