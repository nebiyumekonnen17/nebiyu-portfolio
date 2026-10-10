/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS smoke test loads TypeScript compiler directly. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");

// Run the real production validation module using the installed TypeScript compiler.
const source = fs.readFileSync("lib/link-hub.ts", "utf8");
const js = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
}).outputText;
const result = { exports: {} };
new Function("exports", "module", js)(result.exports, result);
const {
  DARK_HUB_TEMPLATES,
  LIGHT_HUB_TEMPLATES,
  DEFAULT_HUB_BACKGROUND,
  initialHub,
  validateHub,
} = result.exports;

assert.equal(DARK_HUB_TEMPLATES.length, 7, "Exactly seven dark templates");
assert.equal(LIGHT_HUB_TEMPLATES.length, 7, "Exactly seven light templates");
for (const presets of [DARK_HUB_TEMPLATES, LIGHT_HUB_TEMPLATES]) {
  assert.equal(new Set(presets.map(x => x.id)).size, 7, "Template IDs must be unique");
}
assert.ok(DARK_HUB_TEMPLATES.some(x => x.id === "futuristic-tech"));
assert.ok(DARK_HUB_TEMPLATES.some(x => x.id === "aurora"));
assert.ok(LIGHT_HUB_TEMPLATES.some(x => x.id === "futuristic-light"));
assert.ok(LIGHT_HUB_TEMPLATES.some(x => x.id === "aurora-light"));

const v = structuredClone(initialHub);
v.design.darkTemplate = "futuristic-tech";
v.design.lightTemplate = "aurora-light";
v.design.background = {
  intensity: 200, placement: "full", motion: true,
  texture: false, cardOpacity: 10,
};
const accepted = validateHub(v);
assert.equal(accepted.design.darkTemplate, "futuristic-tech");
assert.equal(accepted.design.lightTemplate, "aurora-light");
assert.equal(accepted.design.background.intensity, 100);
assert.equal(accepted.design.background.cardOpacity, 85);
assert.equal(accepted.design.background.placement, "full");
assert.equal(accepted.design.background.texture, false);
assert.equal(accepted.design.background.motion, true);
assert.deepEqual(accepted.links, validateHub(initialHub).links, "Links should remain unchanged");

const old = structuredClone(initialHub);
delete old.design.background;
assert.deepEqual(validateHub(old).design.background, DEFAULT_HUB_BACKGROUND, "Old drafts should remain readable");
old.design.darkTemplate = "purple-slate";
old.design.lightTemplate = "warm-neutral";
assert.equal(validateHub(old).design.darkTemplate, "purple-slate");
assert.equal(validateHub(old).design.lightTemplate, "warm-neutral");

const css = fs.readFileSync("app/links/links.css", "utf8");
for (const id of DARK_HUB_TEMPLATES.map(x => x.id)) {
  assert.ok(css.includes('data-dark-template="' + id + '"'), id + " needs CSS");
}
for (const id of LIGHT_HUB_TEMPLATES.map(x => x.id)) {
  assert.ok(css.includes('data-light-template="' + id + '"'), id + " needs CSS");
}
for (const name of ["circuits.svg","aurora.svg","waves.svg","topographic.svg"]) {
  assert.ok(fs.existsSync("public/assets/links/" + name), name + " must exist");
}
console.log("Theme library regression checks passed: 14 templates, assets, legacy drafts and customization limits.");
