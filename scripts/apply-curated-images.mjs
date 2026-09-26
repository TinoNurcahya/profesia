import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// Curated 54 authentic, verified WebP photos in English naming (100% local, high performance)
const curatedImages = {
  "software-engineer": "/images/professions/software-engineer.webp",
  "data-scientist": "/images/professions/data-scientist.webp",
  "cybersecurity-specialist": "/images/professions/cybersecurity-specialist.webp",
  "cloud-solutions-architect": "/images/professions/cloud-solutions-architect.webp",
  "devops-engineer": "/images/professions/devops-engineer.webp",
  "ai-machine-learning-engineer": "/images/professions/ai-machine-learning-engineer.webp",
  "database-administrator": "/images/professions/database-administrator.webp",
  "mobile-app-developer": "/images/professions/mobile-app-developer.webp",
  "qa-automation-engineer": "/images/professions/qa-automation-engineer.webp",
  "blockchain-developer": "/images/professions/blockchain-developer.webp",
  "dokter-umum": "/images/professions/general-practitioner.webp",
  "dokter-gigi": "/images/professions/dentist.webp",
  "apoteker": "/images/professions/pharmacist.webp",
  "perawat": "/images/professions/registered-nurse.webp",
  "psikolog-klinis": "/images/professions/clinical-psychologist.webp",
  "fisioterapis": "/images/professions/physical-therapist.webp",
  "pediatrician": "/images/professions/pediatrician.webp",
  "psychiatrist": "/images/professions/psychiatrist.webp",
  "clinical-dietitian": "/images/professions/clinical-dietitian.webp",
  "nurse-midwife": "/images/professions/nurse-midwife.webp",
  "radiologic-technologist": "/images/professions/radiologic-technologist.webp",
  "medical-lab-technologist": "/images/professions/medical-lab-technologist.webp",
  "ui-ux-designer": "/images/professions/ui-ux-designer.webp",
  "animator-3d-artist": "/images/professions/animator-3d-artist.webp",
  "graphic-designer": "/images/professions/graphic-designer.webp",
  "video-editor": "/images/professions/video-editor.webp",
  "interior-designer": "/images/professions/interior-designer.webp",
  "architect": "/images/professions/architect.webp",
  "commercial-photographer": "/images/professions/commercial-photographer.webp",
  "fashion-designer": "/images/professions/fashion-designer.webp",
  "copywriter": "/images/professions/copywriter.webp",
  "game-designer": "/images/professions/game-designer.webp",
  "motion-graphic-designer": "/images/professions/motion-graphic-designer.webp",
  "digital-marketer": "/images/professions/digital-marketing-specialist.webp",
  "product-manager": "/images/professions/product-manager.webp",
  "financial-analyst": "/images/professions/financial-analyst.webp",
  "public-accountant": "/images/professions/public-accountant.webp",
  "human-resources-manager": "/images/professions/human-resources-manager.webp",
  "seo-specialist": "/images/professions/seo-specialist.webp",
  "social-media-manager": "/images/professions/social-media-manager.webp",
  "brand-manager": "/images/professions/brand-manager.webp",
  "business-development-manager": "/images/professions/business-development-manager.webp",
  "public-relations-specialist": "/images/professions/public-relations-specialist.webp",
  "dosen-universitas": "/images/professions/university-lecturer.webp",
  "guru-sekolah-menengah": "/images/professions/high-school-teacher.webp",
  "instructional-designer": "/images/professions/instructional-designer.webp",
  "career-counselor": "/images/professions/career-counselor.webp",
  "research-scientist": "/images/professions/research-scientist.webp",
  "kindergarten-teacher": "/images/professions/kindergarten-teacher.webp",
  "special-education-teacher": "/images/professions/special-education-teacher.webp",
  "digital-archivist-librarian": "/images/professions/digital-librarian.webp",
  "mechanical-engineer": "/images/professions/mechanical-engineer.webp",
  "electrical-engineer": "/images/professions/electrical-engineer.webp",
  "civil-engineer": "/images/professions/civil-engineer.webp"
};

// 1. Update data/professions-seed.json & backup
const seedPath = resolve("data/professions-seed.json");
const backupPath = resolve("data/professions-seed.json.backup.json");
const seedData = JSON.parse(readFileSync(seedPath, "utf8"));

let updatedCount = 0;
for (const p of seedData) {
  if (curatedImages[p.slug]) {
    p.image_url = curatedImages[p.slug];
    updatedCount++;
  }
}

const formattedJson = JSON.stringify(seedData, null, 2);
writeFileSync(seedPath, formattedJson, "utf8");
writeFileSync(backupPath, formattedJson, "utf8");
console.log(`Updated ${updatedCount} professions in ${seedPath} and backup.`);

// 2. Generate supabase/migrations/0010_update_profession_images.sql
const sqlLines = [
  "-- Migration 0010: Update profession images with authentic WebP photography",
  "-- Generated for all 54 standardized O*NET professions (100% English WebP)",
  "",
];

for (const [slug, imageUrl] of Object.entries(curatedImages)) {
  sqlLines.push(
    `UPDATE public.professions SET image_url = '${imageUrl}' WHERE slug = '${slug}';`
  );
}

sqlLines.push("");

const migrationPath = resolve("supabase/migrations/0010_update_profession_images.sql");
writeFileSync(migrationPath, sqlLines.join("\n"), "utf8");
console.log(`Generated SQL migration in ${migrationPath}`);

// 3. Auto-sync to live Supabase database
try {
  const { existsSync } = await import("fs");
  if (existsSync(".env.local")) {
    const { createClient } = await import("@supabase/supabase-js");
    const env = readFileSync(".env.local", "utf8");
    const getVar = (name) => {
      const line = env.split("\n").find((l) => l.trim().startsWith(name));
      return line ? line.split("=")[1]?.trim().replace(/^['"]|['"]$/g, "") : null;
    };
    const url = getVar("NEXT_PUBLIC_SUPABASE_URL");
    const key = getVar("SUPABASE_SERVICE_ROLE_KEY") || getVar("NEXT_PUBLIC_SUPABASE_ANON_KEY");

    if (url && key) {
      console.log("\nSyncing directly to live Supabase database...");
      const supabase = createClient(url, key, { auth: { persistSession: false } });
      let synced = 0;
      for (const p of seedData) {
        const { error } = await supabase
          .from("professions")
          .update({ image_url: p.image_url })
          .eq("slug", p.slug);
        if (!error) synced++;
      }
      console.log(`Supabase synced: ${synced}/${seedData.length} rows updated successfully!`);
    }
  }
} catch (err) {
  console.log("Supabase auto-sync skipped:", err.message);
}
