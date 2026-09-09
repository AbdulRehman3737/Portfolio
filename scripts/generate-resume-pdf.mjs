import { chromium } from "playwright";
import path from "node:path";

const url = process.env.RESUME_URL ?? "http://localhost:3000/resume";
const out = path.resolve("public/resume.pdf");

const browser = await chromium.launch();
const page = await browser.newPage();

console.log(`Navigating to ${url}`);
await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.emulateMedia({ media: "print" });

await page.pdf({
  path: out,
  format: "Letter",
  printBackground: true,
  margin: { top: "0.5in", bottom: "0.5in", left: "0.5in", right: "0.5in" },
});

console.log(`Saved ${out}`);
await browser.close();
