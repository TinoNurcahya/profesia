import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { fetchProfessions } from "@/services/professions";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const allowedSort = ["salary_desc", "salary_asc", "wlb_desc", "name_asc"] as const;
    const sort = allowedSort.includes(params.get("sort") as (typeof allowedSort)[number]) ? params.get("sort") as (typeof allowedSort)[number] : undefined;
    const numberParam = (key: string) => { const value = Number(params.get(key)); return Number.isFinite(value) ? value : undefined; };
    const professions = await fetchProfessions({ search: params.get("search") || undefined, category: params.get("category") || undefined, mbti: params.get("mbti") || undefined, riasec: params.get("riasec") || undefined, prospects: params.get("prospects") || undefined, education: params.get("education") || undefined, salaryMin: numberParam("salaryMin"), salaryMax: numberParam("salaryMax"), sort });
    return NextResponse.json({ success: true, data: professions }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
  } catch (error) {
    console.error("Profession catalog API failed:", error);
    return NextResponse.json({ success: false, error: "Profession catalog unavailable" }, { status: 503 });
  }
}
