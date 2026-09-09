import { chromium } from "playwright";
import path from "node:path";

const targets = [
  { url: "https://bio-genome-fe.vercel.app", out: "public/projects/biogenome.png" },
  { url: "https://aspire-foundation-ten.vercel.app", out: "public/projects/aspire-foundation.png" },
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 2,
});

for (const { url, out } of targets) {
  console.log(`Navigating to ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1200);
  const outPath = path.resolve(out);
  await page.screenshot({ path: outPath });
  console.log(`Saved ${outPath}`);
}

await browser.close();
