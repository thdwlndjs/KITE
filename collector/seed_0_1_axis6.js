/**
 * 0.1-signal-loop 축6 보강 — "KITE와 겹치는 기존 도구(AI 아이디어 검증기 등)의
 * 실제 사용자 반응/한계"를 저비용(웹검색, Evidence Ladder 1~2단계)으로 조사.
 * seed_0_1.js / seed_0_1_round2.js와 같은 방식 — 사람이 WebSearch/WebFetch 원문을
 * 읽고 채택한 기록.
 *
 * 목적: JUDGMENT.local.md의 "축6은 추론 2건만" 상태를 보강하고, KITE의 구체적
 * 메커니즘(근거 사다리, AI 의견을 증거로 취급 안 함)이 기존 도구와 어디서
 * 달라야 하는지(solution shape) 근거를 남긴다. 새 사이클을 열지 않고 기존
 * 0.1-signal-loop 안에서 축6만 보강하기로 결정함(사용자 확인, 2026-09-11).
 *
 * 실행: node collector/seed_0_1_axis6.js
 */
const { appendSignal, appendContextOnly } = require("./store");

const signals = [
  {
    source_module: "indiehackers",
    url: "https://www.indiehackers.com/post/i-validated-my-idea-with-almost-80-people-built-in-public-for-6-months-and-still-failed-spectacularly-6382ec2034",
    quote:
      "Pratham Naik: ran a 3-week survey (200+ responses), #buildinpublic on Twitter, Reddit shares, newsletter. 'I validated the idea, not the business.' Result after 6 months: 43 signups, 2 paying customers, $18/month. 'Building in public is great for community and accountability, but it can create false validation' because responders were supportive builders, not people with the real problem. Improved method afterward: find people already paying for the problem, test with strangers outside your network, try presale before building (12 people prepaid $99).",
    date: "2025-09-30",
    matched_axis: [4, 5, 6],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "idea validation tool review indie hacker didn't help useless",
    note:
      "축4·5 기존 신호를 구체적 숫자로 보강 + 축6에 직접적 시사점: '소셜 검증(설문·빌드인퍼블릭)'은 가짜 신호였고, 이 저자가 스스로 도달한 개선책(낯선 사람 대상 프리세일)이 KITE의 근거 사다리 상위 단계(5~6단계)와 방향이 같음.",
  },
  {
    source_module: "indiehackers",
    url: "https://www.indiehackers.com/post/i-built-a-business-idea-validator-now-im-scared-mine-is-the-bad-idea-21b3b3cc3c",
    quote:
      "Sabb (tool: 'Franks'): pre-paywall 21 users across 7 countries, 184 events over 2 weeks; 6 days after adding payment, 0 paying users. 'Silence doesn't tell you if the product is wrong or the distribution is wrong... I'm scared my idea might be the bad one.' Gradually concludes the low trust/low differentiation feedback he got may be a positioning problem, not a product-defect.",
    date: "2026-04-26",
    matched_axis: [6],
    tag: "추론",
    near_primary: true,
    query_cluster: "Validator AI IdeaProof ProductGapHunt ValidateMySaaS review experience",
    note:
      "축6(유사 도구 실사용 흔적)에 직접 해당 — 이 세그먼트 안에서 실제로 '아이디어 검증기'류를 스스로 만들어보는 사람이 있고, 그 사람조차 무료→유료 전환 0%를 겪음. KITE 자신도 하나의 가설이라는 원칙(CLAUDE.md 6장)과 정확히 같은 실패 패턴 — 참고용으로 추론 태그 유지, 축6 '검증됨'으로 격상하지 않음.",
  },
];

const contextOnly = [
  {
    source_module: "web_search",
    url: "https://worthbuild.io/blog/best-startup-idea-validation-tools-2026-comparison",
    summary:
      "WorthBuild(검증 도구 벤더)가 자사 블로그에서 경쟁 도구(IdeaProof, Validator AI, ProductGapHunt, ValidateMySaaS)를 비교. 각 도구의 '한계'로 소개된 내용(예: 'breadth comes at cost of depth', '검증 점수 없음')은 벤더의 자기 홍보성 비교 콘텐츠.",
    reason_excluded:
      "CLAUDE.md 5장: '다른 검증 도구의 마케팅 콘텐츠는 증거로 취급하지 않는다' — 실사용자 리뷰가 아니라 경쟁사가 작성한 비교 마케팅 글. 다만 시장에 이미 5개 이상의 유사 도구가 존재한다는 경쟁 구도 파악에는 참고.",
  },
  {
    source_module: "web_search",
    url: "n/a (g2.com/products/ideaproof/reviews)",
    summary:
      "IdeaProof G2 리뷰 페이지에 실제 사용자 리뷰(평점·코멘트)가 있는지 확인 시도.",
    reason_excluded:
      "WebFetch 403 Forbidden — 소스 자체 접근 불가(도구 레벨 차단). Disquiet·Reddit에 이어 G2도 이 환경에서 직접 접근이 막힘. 리뷰 사이트류(G2, Trustpilot 등)는 계획 단계에서 접근성 스파이크 없이 전제하지 말 것 — MEMO.local.md 규칙과 동일 패턴 재확인.",
  },
  {
    source_module: "web_search",
    url: "https://www.inc.com/diana-bocco/founders-ai-prompting-business-ideas-confirmation-bias/91394909",
    summary:
      "Inc.com 기사 — 'AI 아이디어 검증 챗봇(ChatGPT, Validator AI 등)이 동의 편향(agreement bias)으로 과도하게 긍정적인 피드백을 준다'는 취지의 기사. WebSearch 요약으로는 확인됐으나 WebFetch 403으로 원문 인용을 직접 확인하지 못함.",
    reason_excluded:
      "원문 미확보(403) — 게이트4(신호 품질: 원문 인용 필요) 기준 미달. 방향성 참고용으로만 취급, 축6 신호로 채택하지 않음.",
  },
];

let addedCount = 0;
for (const s of signals) {
  const result = appendSignal(s);
  if (result.added) addedCount += 1;
}
for (const c of contextOnly) {
  appendContextOnly(c);
}

console.log(`axis6 signals: ${addedCount}/${signals.length} added`);
console.log(`axis6 context_only: ${contextOnly.length}건 기록`);
