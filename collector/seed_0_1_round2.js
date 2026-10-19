/**
 * 0.1-signal-loop 2차 DRIVE(이터레이션) 결과.
 * seed_0_1.js와 같은 방식 — 사람이 WebSearch/WebFetch 원문을 읽고 채택한 기록.
 * 목적: 게이트1(소스 3곳+)/게이트2(15~20건) 미달을 새 소스(dev.to, Hacker News)
 * 추가 + 기존 소스(velog, indiehackers) 확장으로 채운다 (MEMO.local.md "다음 사이클 결정" 참고).
 *
 * 실행: node collector/seed_0_1_round2.js
 */
const { appendSignal, appendContextOnly } = require("./store");

const signals = [
  {
    source_module: "devto",
    url: "https://dev.to/st_vladyslav/what-4-months-of-solo-saas-building-taught-me-the-hard-way-1ed8",
    quote:
      "I spent four months perfecting features while doing virtually zero marketing... Three signups in the first week, and two were friends doing me a favor. The wake-up call forced me to completely flip my priorities.",
    date: "2025-05-29",
    matched_axis: [1, 3, 4, 5],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "I built it and nobody came lessons learned solo founder",
    note: "새 소스(dev.to) 1호. 4개월 기능 개발 후 마케팅 0 → 첫 주 가입 3명(2명은 지인).",
  },
  {
    source_module: "devto",
    url: "https://dev.to/techwood/10-mistakes-i-made-as-a-first-time-solo-founder-4i58",
    quote:
      "At Imabulary, we've spent a couple of weeks perfecting the quiz instead of shipping and selling. (이후 교훈: 처음 15회 고객 인터뷰 후 프리세일 시작)",
    date: "2025-10-23",
    matched_axis: [4, 5],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "I built it and nobody came lessons learned solo founder",
    note: "실제 서비스명(Imabulary) + 구체적 수치(15회 인터뷰) 명시.",
  },
  {
    source_module: "kr_community",
    url: "https://velog.io/@seonkyo0466/%EC%82%AC%EC%9D%B4%EB%93%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-MVP%EB%B6%80%ED%84%B0-%EC%88%98%EC%9D%B5%ED%99%94%EA%B9%8C%EC%A7%80-feat.-1%EB%85%84-%ED%9A%8C%EA%B3%A0",
    quote:
      "좋은 제품을 만들면 자연스레 사용자는 따라온다고 생각했습니다. (한달만에 개발, DAU 800+, MAU 7천+)",
    date: "2024-09-25",
    matched_axis: [4],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "사이드프로젝트 만들었는데 아무도 안씀 회고 후기",
    note: "반대 증거(균형용): 사전 검증 없이 개인 문제에서 출발했지만 DAU 800+로 성공 — '검증 없으면 무조건 실패'는 아님을 보여주는 사례.",
  },
  {
    source_module: "hackernews",
    url: "https://news.ycombinator.com/item?id=29691811",
    quote:
      "vegetablepotpie: talked to 10+ filmmakers, got '끔찍한 아이디어(terrible idea)' feedback, stopped before building, saved hundreds of hours of development.",
    date: null,
    matched_axis: [4],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "Ask HN: How do you validate demand for your side-project?",
    note: "새 소스(Hacker News) 1호. 인터뷰(축4 대응방식)가 실제로 낭비를 막은 성공 사례 — 균형 증거.",
  },
  {
    source_module: "hackernews",
    url: "https://news.ycombinator.com/item?id=29691811",
    quote:
      "gumby: validation bar was 50 strangers using it for 1+ month; 6 months later reached the 20s.",
    date: null,
    matched_axis: [4],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "Ask HN: How do you validate demand for your side-project?",
    note: "스스로 정한 검증 기준(50명/1개월)을 실제 운영.",
  },
  {
    source_module: "hackernews",
    url: "https://news.ycombinator.com/item?id=29691811",
    quote:
      "rhtgrg: overpriced a PDF tool out of overconfidence with no formal validation, but got sales within the first few days anyway.",
    date: null,
    matched_axis: [1],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "Ask HN: How do you validate demand for your side-project?",
    note: "반대 증거(균형용): 정식 검증 없이도 성공한 사례.",
  },
  {
    source_module: "hackernews",
    url: "https://news.ycombinator.com/item?id=44625082",
    quote: "Husena: I spent months building a product that nobody wanted. A classic, painful lesson.",
    date: null,
    matched_axis: [1, 3],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "Ask HN: How do you validate a product idea before building?",
    note: "구체적 숫자는 약하지만(only 'months') 1인칭+명시적 손실 인정으로 채택.",
  },
  {
    source_module: "indiehackers",
    url: "https://www.indiehackers.com/post/we-built-a-multiplayer-game-launched-it-quietly-and-barely-anyone-came-now-were-learning-distribution-from-scratch-6d51341527",
    quote:
      "We built Vizzy — a multiplayer emoji puzzle game with 6 modes. It's live... barely anyone came. we built the hooks but didn't instrument or optimize them... focused on distribution before confirming product-market fit.",
    date: "2026-04-22",
    matched_axis: [1, 4],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "built it and nobody used it indie hacker (확장)",
    note: "PMF 확인 전 분배(마케팅)에 집중 — 순서가 뒤바뀐 대응방식 사례.",
  },
  {
    source_module: "indiehackers",
    url: "https://www.indiehackers.com/post/solo-dev-here-nobody-using-my-app-how-do-you-actually-do-marketing-4e4bfad079",
    quote:
      "shipped twice, went through apple review 3 times ... honest count right now is 1 (me). i did not look at SuppCo 160K database before building. that is on me.",
    date: "2026-05-26",
    matched_axis: [1, 3, 4, 5],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "built it and nobody used it indie hacker (확장)",
    note: "가장 구체적인 신호 중 하나 — 존재하는 시장 데이터(16만 건 DB)조차 안 보고 만들었다고 본인이 인정.",
  },
];

const contextOnly = [
  {
    source_module: "kr_community",
    url: "https://velog.io/@whatever/%EB%82%B4-%EC%82%AC%EC%9D%B4%EB%93%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EA%B0%80-%EC%9D%98%EB%AF%B8-%EC%97%86%EB%8A%94-%EC%9D%B4%EC%9C%A0",
    summary: "사이드프로젝트가 '의미 없는' 이유에 대한 일반론적 관찰/조언.",
    reason_excluded: "1인칭 구체 경험이 아니라 일반 관찰 — 근접 1차 신호 기준 미달",
  },
  {
    source_module: "kr_community",
    url: "https://velog.io/@sidehustlerstory/danny-postma",
    summary: "Danny Postma(유명 창업자)의 성공 사례를 블로거가 3인칭으로 정리한 글.",
    reason_excluded: "블로그 작성자 본인의 경험이 아님(3인칭 케이스 스터디)",
  },
  {
    source_module: "devto",
    url: "https://dev.to/web5lab_938e9096be8dc3e78/the-brutal-and-rewarding-reality-of-solo-saas-founder-1lk3",
    summary: "solo SaaS founder의 어려움(외로움, 유통 문제) 서술이나 구체적 숫자 없음.",
    reason_excluded: "1인칭이나 구체적 디테일(숫자) 부재 — 근접 1차 신호 기준 미달",
  },
  {
    source_module: "devto",
    url: "https://dev.to/7onic/solo-builder-1-what-nobody-tells-you-59e1",
    summary: "디자인 시스템 개발 중 겪은 엔지니어링 실수(버튼 variant 중복 등) 회고.",
    reason_excluded: "주제 불일치 — 시장 검증이 아니라 내부 엔지니어링 실수에 관한 글",
  },
  {
    source_module: "hackernews",
    url: "https://news.ycombinator.com/item?id=44625082",
    summary: "chistev: 'I'm also building something I don't know if anybody even wants.'",
    reason_excluded: "진행 중인 상태 언급일 뿐 결과/구체적 디테일 없음 — 근접 1차 신호 기준 미달",
  },
  {
    source_module: "web_search",
    url: "n/a (reddit.com)",
    summary: "Reddit을 3번째 소스로 시도했으나 WebSearch 도구가 'not accessible to our user agent' 오류로 전체 도메인 차단.",
    reason_excluded: "소스 자체에 접근 불가 (도구 레벨 차단) — CONTEXT.md 4장이 우려한 '레딧 API 폐지' 리스크가 이 환경에서도 그대로 재현됨",
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

console.log(`round2 signals: ${addedCount}/${signals.length} added`);
console.log(`round2 context_only: ${contextOnly.length}건 기록`);
