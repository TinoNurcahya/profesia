import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as { email?: string; password?: string };
    if (!email || !password) return NextResponse.json({ error: "Email dan kata sandi wajib diisi." }, { status: 400 });
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email: email.toLowerCase().trim(), password });
    if (error) return NextResponse.json({ error: "Email atau kata sandi salah." }, { status: 401 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat masuk. Coba lagi." }, { status: 500 });
  }
}
