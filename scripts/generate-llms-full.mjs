import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const posts = [
  ["Thally vs Mintlify", "thally-vs-mintlify"],
  ["Thally vs GitBook", "thally-vs-gitbook"],
  ["Thally vs Docusaurus", "thally-vs-docusaurus"],
  ["AI-native documentation", "what-is-ai-native-documentation"],
  ["Agent-readable documentation", "agent-ready-docs-llms-txt-mcp"],
];

const sections = [
  await readFile(path.join(root, "public/llms.txt"), "utf8"),
  `# Canonical pricing\n\n${await readFile(path.join(root, "public/pricing.md"), "utf8")}`,
];

for (const [title, slug] of posts) {
  const body = await readFile(path.join(root, "src/app/blog", slug, "content.mdx"), "utf8");
  sections.push(`# Article: ${title}\n\nCanonical URL: https://thally.io/blog/${slug}\n\n${body.trim()}`);
}

const header = [
  "# Thally full agent corpus",
  "",
  "> Expanded first-party content for retrieval and citation. Canonical HTML pages remain the source of truth.",
  "",
  "Generated from the same repository as thally.io. Last generated: 2026-07-19.",
  "",
].join("\n");

await writeFile(path.join(root, "public/llms-full.txt"), `${header}${sections.join("\n\n---\n\n")}\n`);
