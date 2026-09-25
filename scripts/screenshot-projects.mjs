import { chromium } from "playwright";
import path from "node:path";

const targets = [
  { url: "https://prometheusalts.com", out: "public/projects/prometheus.png" },
  // WOW.js / AOS fade-ins on the hero need a few seconds to settle.
  { url: "https://pulse-iq.com", out: "public/projects/pulse-iq.png", settle: 3500 },
  { url: "https://bio-genome-fe.vercel.app", out: "public/projects/biogenome.png" },
  { url: "https://aspire-foundation-ten.vercel.app", out: "public/projects/aspire-foundation.png" },
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 2,
});

for (const { url, out, settle = 1200 } of targets) {
  console.log(`Navigating to ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(settle);
  const outPath = path.resolve(out);
  await page.screenshot({ path: outPath });
  console.log(`Saved ${outPath}`);
}

await browser.close();
