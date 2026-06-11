import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function ensureAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: isAdmin, error: roleError } = await supabaseAdmin.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (roleError) throw new Error("Не вдалося перевірити права доступу");
  if (isAdmin) return { supabaseAdmin, isAdmin: true as const };

  // First-owner claim: if no admin exists yet, the first signed-in user becomes the owner.
  const { count, error: countError } = await supabaseAdmin
    .from("user_roles")
    .select("id", { count: "exact", head: true })
    .eq("role", "admin");
  if (countError) throw new Error("Не вдалося перевірити права доступу");

  if ((count ?? 0) === 0) {
    const { error: grantError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });
    if (!grantError) return { supabaseAdmin, isAdmin: true as const };
  }

  return { supabaseAdmin, isAdmin: false as const };
}

export const getInboxMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin, isAdmin } = await ensureAdmin(context.userId);
    if (!isAdmin) return { authorized: false as const, messages: [] };

    const { data, error } = await supabaseAdmin
      .from("contact_messages")
      .select("id, name, email, budget, message, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error("Не вдалося завантажити повідомлення");

    return { authorized: true as const, messages: data ?? [] };
  });

export const deleteInboxMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin, isAdmin } = await ensureAdmin(context.userId);
    if (!isAdmin) throw new Error("Доступ заборонено");

    const { error } = await supabaseAdmin.from("contact_messages").delete().eq("id", data.id);
    if (error) throw new Error("Не вдалося видалити повідомлення");
    return { success: true as const };
  });