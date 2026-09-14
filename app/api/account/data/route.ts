import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { error } = await supabase.rpc("delete_my_account_data");
  if (error) return NextResponse.json({ error: "deletion_failed" }, { status: 503 });
  await supabase.auth.signOut();
  return NextResponse.json({ success: true });
}
