const baseUrl = (process.env.SMOKE_BASE_URL || "http://localhost:3000").replace(/\/$/, "");

async function check(path, expectedStatus = 200) {
  const response = await fetch(`${baseUrl}${path}`);
  const body = await response.text();
  if (response.status !== expectedStatus) throw new Error(`${path}: expected ${expectedStatus}, received ${response.status}`);
  if (expectedStatus === 200 && path.endsWith("/id") && (!body.includes("Profesia") || body.includes("Internal Server Error"))) throw new Error(`${path}: unexpected page content`);
  if (expectedStatus === 200 && path.endsWith("/en") && (!body.includes("Profesia") || body.includes("Internal Server Error"))) throw new Error(`${path}: unexpected page content`);
  if (expectedStatus === 200 && path === "/sitemap.xml" && !body.includes("/id")) throw new Error(`${path}: missing locale URL`);
  if (expectedStatus === 200 && path === "/robots.txt" && !body.includes("sitemap.xml")) throw new Error(`${path}: missing sitemap reference`);
  console.log(`${path} ${response.status}`);
}

await check("/id");
await check("/en");
await check("/id/route-that-does-not-exist", 404);
await check("/sitemap.xml");
await check("/robots.txt");
console.log("Route smoke tests passed");
