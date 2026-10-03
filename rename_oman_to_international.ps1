import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const roots = ["app", "components", "lib"];
const allowedExtensions = new Set([".ts", ".tsx", ".js", ".jsx"]);

const persianReplacements = [
  ["فرصت‌های آموزشی عمان", "فرصت‌های آموزشی بین‌المللی"],
  ["فرصت هاي آموزشي عمان", "فرصت‌های آموزشی بین‌المللی"],
  ["بازار عمان و فرصت‌های بین‌المللی", "بازارهای بین‌المللی و فرصت‌های حرفه‌ای"],
  ["بازار عمان", "بازارهای بین‌المللی"],
  ["دوره‌های عمان", "دوره‌های بین‌الملل"],
  ["دوره هاي عمان", "دوره‌های بین‌الملل"],
  ["برنامه‌های عمان", "برنامه‌های بین‌الملل"],
  ["برنامه هاي عمان", "برنامه‌های بین‌الملل"],
  ["عمان", "بین‌الملل"],
];

const arabicReplacements = [
  ["برامج كاردو المرتبطة بعُمان", "برامج كاردو الدولية"],
  ["برامج كاردو المتعلقة بعُمان", "برامج كاردو الدولية"],
  ["برامج عُمان", "البرامج الدولية"],
  ["برامج عمان", "البرامج الدولية"],
  ["الاستفسار عن برامج عُمان", "الاستفسار عن البرامج الدولية"],
  ["الاستفسار عن برامج عمان", "الاستفسار عن البرامج الدولية"],
  ["إرسال طلب برامج عُمان", "إرسال طلب البرامج الدولية"],
  ["إرسال طلب برامج عمان", "إرسال طلب البرامج الدولية"],
  ["اكتب ما الذي تريد معرفته عن برامج عُمان...", "اكتب ما الذي تريد معرفته عن البرامج الدولية..."],
  ["اكتب ما الذي تريد معرفته عن برامج عمان...", "اكتب ما الذي تريد معرفته عن البرامج الدولية..."],
  ["التدريب المؤسسي المتخصص وبرامج عُمان", "التدريب المؤسسي المتخصص والبرامج الدولية"],
  ["التدريب المؤسسي المتخصص وبرامج عمان", "التدريب المؤسسي المتخصص والبرامج الدولية"],
  ["للمؤسسات وبرامج عُمان", "للمؤسسات والبرامج الدولية"],
  ["للمؤسسات وبرامج عمان", "للمؤسسات والبرامج الدولية"],
  ["CARDO / OMAN", "CARDO / INTERNATIONAL"],
];

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getFiles(fullPath));
      continue;
    }

    if (allowedExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function applyAll(content, replacements) {
  let result = content;

  for (const [from, to] of replacements) {
    result = result.split(from).join(to);
  }

  return result;
}

const files = roots.flatMap((root) => getFiles(path.join(projectRoot, root)));

let changed = 0;

for (const file of files) {
  const relative = path.relative(projectRoot, file).replaceAll("\\", "/");
  const original = fs.readFileSync(file, "utf8");

  let updated = original;

  if (relative.startsWith("app/ar/")) {
    updated = applyAll(updated, arabicReplacements);
  } else {
    updated = applyAll(updated, persianReplacements);
  }

  if (updated !== original) {
    fs.writeFileSync(file, updated, "utf8");
    changed += 1;
    console.log(`Updated: ${relative}`);
  }
}

console.log("");
console.log(`Done. ${changed} file(s) updated.`);
console.log("");
console.log("Important:");
console.log("- Internal identifiers such as category=oman, requestType='oman', and lib/omanCourses.ts are NOT changed.");
console.log("- Search the project for the visible word عمان after this script finishes.");
console.log("- Then run: npm run dev");
