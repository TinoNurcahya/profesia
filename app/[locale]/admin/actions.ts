"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const professionMutationSchema = z.object({
  id: z.coerce.number().int().positive().optional(), slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
  name_id: z.string().min(2).max(120), name_en: z.string().min(2).max(120),
  description_id: z.string().min(20).max(2000), description_en: z.string().min(20).max(2000),
  status: z.enum(["draft", "published", "archived"]), locale: z.enum(["id", "en"]),
});

export type AdminActionResult = { success: true } | { success: false; error: string };

export async function saveProfession(_: AdminActionResult | null, formData: FormData): Promise<AdminActionResult> {
  const parsed = professionMutationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { success: false, error: "invalid_payload" };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "unauthorized" };
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).maybeSingle();
  if (!profile?.is_admin) return { success: false, error: "forbidden" };
  const { locale, id, ...allowedFields } = parsed.data;
  const before = id ? (await supabase.from("professions").select("*").eq("id", id).maybeSingle()).data : null;
  const mutation = id ? supabase.from("professions").update(allowedFields).eq("id", id).select("id").single() : supabase.from("professions").insert(allowedFields).select("id").single();
  const { data, error } = await mutation;
  if (error) return { success: false, error: "write_failed" };
  await supabase.from("audit_log").insert({ actor_id: user.id, action: id ? "update" : "create", entity_type: "profession", entity_id: String(data.id), before_data: before, after_data: allowedFields });
  revalidatePath(`/${locale}/professions`);
  revalidatePath(`/${locale}/admin`);
  return { success: true };
}
