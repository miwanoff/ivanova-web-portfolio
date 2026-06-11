import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Вкажіть ім'я (мінімум 2 символи)")
    .max(100, "Ім'я має бути коротшим за 100 символів"),
  email: z
    .string()
    .trim()
    .email("Введіть коректний email")
    .max(255, "Email має бути коротшим за 255 символів"),
  budget: z.string().trim().max(100, "Занадто довге значення").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Розкажіть трохи більше (мінімум 10 символів)")
    .max(2000, "Повідомлення має бути коротшим за 2000 символів"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      budget: data.budget || null,
      message: data.message,
    });

    if (error) {
      console.error("Failed to save contact message:", error);
      return { success: false as const, error: "Не вдалося надіслати повідомлення. Спробуйте ще раз." };
    }

    return { success: true as const };
  });