import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, password, name, username } = (await request.json()) as { email?: string; password?: string; name?: string; username?: string };
    if (!email || !password || !name || !username || password.length < 8) return NextResponse.json({ error: "Data pendaftaran tidak valid." }, { status: 400 });
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({ email: email.toLowerCase().trim(), password, options: { data: { name: name.trim(), username: username.toLowerCase().trim() } } });
    if (error) return NextResponse.json({ error: "Email atau username sudah digunakan." }, { status: 409 });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: unknown) {
    console.error("Registration failed:", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat mendaftar. Coba lagi." }, { status: 500 });
  }
}
