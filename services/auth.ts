export type ActionResult<T = null> =
  | { success: true; data: T }
  | { success: false; error: string };

async function request(path: string, body?: object): Promise<ActionResult<null>> {
  try {
    const response = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
    const result = (await response.json()) as { success?: boolean; error?: string };
    if (!response.ok || !result.success) return { success: false, error: result.error || "Permintaan tidak dapat diproses." };
    return { success: true, data: null };
  } catch { return { success: false, error: "Server tidak dapat dihubungi. Coba lagi." }; }
}

export function signIn(email: string, password: string) { return request("/api/auth/login", { email, password }); }
export function signUp(email: string, password: string, name: string, username: string) { return request("/api/auth/register", { email, password, name, username }); }
export function signOut() { return request("/api/auth/logout"); }
