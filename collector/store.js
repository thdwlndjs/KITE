const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_DIR = path.join(__dirname, "..", "data");
const SIGNALS_FILE = path.join(DATA_DIR, "signals.jsonl");
const CONTEXT_ONLY_FILE = path.join(DATA_DIR, "context_only.jsonl");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function makeId(url, quote) {
  return crypto.createHash("sha1").update(`${url}::${quote}`).digest("hex").slice(0, 16);
}

/** @param {import('./schema').Signal} record */
function appendSignal(record) {
  ensureDataDir();
  const id = record.id || makeId(record.url, record.quote);
  const existing = loadSignals();
  if (existing.some((s) => s.id === id)) {
    return { added: false, id, reason: "duplicate" };
  }
  const full = { id, collected_at: new Date().toISOString(), ...record };
  fs.appendFileSync(SIGNALS_FILE, JSON.stringify(full) + "\n", "utf8");
  return { added: true, id };
}

function loadSignals() {
  if (!fs.existsSync(SIGNALS_FILE)) return [];
  return fs
    .readFileSync(SIGNALS_FILE, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

/**
 * 근접 1차 신호 기준(1인칭 + 구체적 디테일)에 못 미치는 콘텐츠 저장소.
 * docs/CONTEXT.md 4장: "증거로 집계하지 않고 별도로만 남겨 둔다(맥락 참고용)".
 * 판단 게이트 집계(report.js)에는 포함되지 않는다 — negative corpus.
 */
function appendContextOnly(record) {
  ensureDataDir();
  const full = { collected_at: new Date().toISOString(), ...record };
  fs.appendFileSync(CONTEXT_ONLY_FILE, JSON.stringify(full) + "\n", "utf8");
}

function loadContextOnly() {
  if (!fs.existsSync(CONTEXT_ONLY_FILE)) return [];
  return fs
    .readFileSync(CONTEXT_ONLY_FILE, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

module.exports = {
  appendSignal,
  loadSignals,
  appendContextOnly,
  loadContextOnly,
  makeId,
  SIGNALS_FILE,
  CONTEXT_ONLY_FILE,
};
