/**
 * 0.1-signal-loop 첫 DRIVE 실행 결과를 사람이 검토·채택한 기록.
 *
 * 이 파일은 "자동 수집"이 아니라 "사람이 WebSearch/WebFetch로 찾은 원문을 직접
 * 읽고 판단한 결과"를 재현 가능한 코드로 남긴 것이다 (DESIGN.local.md 게이트 4:
 * 최종 채택은 사람이 확인). 다시 실행해도 같은 결과가 data/signals.jsonl,
 * data/context_only.jsonl에 재구성된다.
 *
 * 실행: node collector/seed_0_1.js
 */
const { appendSignal, appendContextOnly } = require("./store");

const signals = [
  {
    source_module: "indiehackers",
    url: "https://www.indiehackers.com/post/i-built-something-nobody-wanted-and-shut-it-down-47d51c9147",
    quote:
      "Since nobody was using my app afterward, I buried it one year later. ... for the next time I definitely need to validate an idea and learn more about marketing.",
    date: "2022-02-06",
    matched_axis: [1, 4, 5],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "built it and nobody used it indie hacker",
    note: "본인 인턴십 프로젝트를 1년 뒤 방치. 마케팅/검증 없이 만들었다고 스스로 인정.",
  },
  {
    source_module: "indiehackers",
    url: "https://www.indiehackers.com/post/i-wasted-months-building-things-nobody-wanted-66eec1cc5b",
    quote:
      "I wasted months building things nobody wanted. Not because I couldn't build. But because I didn't validate hard enough first.",
    date: "2026-03-21",
    matched_axis: [1, 2, 3, 4, 5],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "built it and nobody used it indie hacker",
    note: "여러 제품 반복 실패(빈도) + 명시적 검증 부재 인정.",
  },
  {
    source_module: "indiehackers",
    url: "https://www.indiehackers.com/post/i-wasted-months-building-things-nobody-wanted-66eec1cc5b",
    quote:
      "So I built a simple tool for myself: You enter a startup idea, and it tells you: is this worth building?",
    date: "2026-03-21",
    matched_axis: [6],
    tag: "추론",
    near_primary: true,
    query_cluster: "built it and nobody used it indie hacker",
    note: "축6은 이번 사이클에서 항상 '추론'만 허용 (DESIGN.local.md). 본인이 검증 도구를 직접 만들었다는 사실 자체가 이 카테고리 수요의 간접 증거.",
  },
  {
    source_module: "indiehackers",
    url: "https://www.indiehackers.com/post/i-spent-two-years-building-things-nobody-used-this-time-im-stopping-at-v0-2-0-2182554f73",
    quote:
      "Over the last two years, I've built a lot of things... somewhere along the way, I forgot the most important question: Does anyone actually want this? ... I had spent months answering engineering questions before answering the product question.",
    date: "2026-08-11",
    matched_axis: [1, 2, 3, 4, 5],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "spent months building nobody wanted validate before building",
    note: "2년간 반복된 패턴 + 30일 기능 동결/실사용자 10명 기준으로 대응 방식을 스스로 바꿈.",
  },
  {
    source_module: "indiehackers",
    url: "https://www.indiehackers.com/post/i-validated-my-idea-with-almost-80-people-built-in-public-for-6-months-and-still-failed-spectacularly-6382ec2034",
    quote:
      "Most indie hackers (including me) validate in echo chambers... Building in public is amazing for community and accountability. But it can create a false sense of validation. 6 months later: 43 total signups, 2 paying customers, $18 MRR.",
    date: "2025-09-30",
    matched_axis: [1, 3, 4, 5],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "spent months building nobody wanted validate before building",
    note: "직접 증거 vs 간접 증거 충돌 사례: 설문/빌드인퍼블릭으로 '검증'했다고 믿었지만 실패 — 기존 검증 방식 자체에 대한 불만(축5)의 핵심 근거.",
  },
  {
    source_module: "indiehackers",
    url: "https://www.indiehackers.com/post/just-tried-foundersignal-and-wow-finally-an-easy-way-to-validate-ideas-2701c976f5",
    quote:
      "I've been wrestling with startup idea validation for ages. Manual research is a black hole, and guessing market fit is a recipe for wasted time.",
    date: "2025-07-17",
    matched_axis: [4, 5],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "how do you validate a startup idea before building",
    note: "기존 수동 검증 방식에 대한 명시적 불만.",
  },
  {
    source_module: "indiehackers",
    url: "https://www.indiehackers.com/post/just-tried-foundersignal-and-wow-finally-an-easy-way-to-validate-ideas-2701c976f5",
    quote: "Took me less than 5 minutes to get actionable insights I'd spend days trying to find myself.",
    date: "2025-07-17",
    matched_axis: [6],
    tag: "추론",
    near_primary: true,
    query_cluster: "how do you validate a startup idea before building",
    note: "축6 — 이미 존재하는 유사 검증 도구(FounderSignal)를 실제로 찾아 쓴 사례. 추론 등급 유지.",
  },
  {
    source_module: "kr_community",
    url: "https://velog.io/@seonggongjoyeon/%EB%82%B4-%EC%82%AC%EC%9D%B4%EB%93%9C%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B3%B5%EC%A4%91%EB%B6%84%ED%95%B4%EB%90%98%EC%A7%80-%EC%95%8A%EC%9C%BC%EB%A0%A4%EB%A9%B4-3%EA%B0%80%EC%A7%80-%EC%B2%B4%ED%81%AC%EB%A6%AC%EC%8A%A4%ED%8A%B8%EB%A1%9C-%EC%A7%84%EB%8B%A8%ED%95%98%EC%84%B8%EC%9A%94",
    quote:
      "디자인 외주로 120만원을 쓰고 결국 사이드프로젝트가 공중분해된 경험 ... 아무도 관심을 가지지 않더라고요 ... 아.. 이러면 안 되겠구나!",
    date: "2024-02-17",
    matched_axis: [1, 2, 3, 4, 5],
    tag: "추적가능",
    near_primary: true,
    query_cluster: "시간만 날렸다 OR 돈만 날렸다 사이드프로젝트 회고 (velog/tistory/brunch)",
    note: "국내 소스 유일한 채택 신호. Disquiet/OKKY 직접 접근 실패로 개인 블로그 검색으로 대체 수집 (RE0-MEMO 참고).",
  },
];

const contextOnly = [
  {
    source_module: "kr_community",
    url: "https://okky.kr/articles/1462158",
    summary: "신입 개발자의 사이드프로젝트 일반 회고. 검증 실패나 구체적 손실 언급 없음.",
    reason_excluded: "구체적 디테일(기간/비용/유저수) 없음 — 근접 1차 신호 기준 미달",
  },
  {
    source_module: "kr_community",
    url: "https://okky.kr/articles/1098965",
    summary: "지인의 사이드프로젝트 실패 사례를 전달하는 글. 경고성 조언.",
    reason_excluded: "1인칭 경험이 아님(지인 전언) — 근접 1차 신호 기준 미달",
  },
  {
    source_module: "web_search",
    url: "https://www.indiehackers.com/post/dont-waste-20k-a-4-step-checklist-for-validating-your-startup-idea-8f91e23f40",
    summary: "'$20k를 날렸다'는 제목이지만 본문은 일반 체크리스트, 본인의 구체적 손실 서술 없음.",
    reason_excluded: "제목만 1인칭 손실을 암시, 본문은 일반 조언 콘텐츠",
  },
  {
    source_module: "kr_community",
    url: "https://velog.io/@langoustine/%EC%82%AC%EC%9D%B4%EB%93%9C-%ED%8C%80-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9B%84%EA%B8%B0",
    summary: "사이드 팀 프로젝트의 코드 리뷰/협업 회고. 시장 검증과 무관.",
    reason_excluded: "6개 축 어디에도 매칭되지 않음(주제 불일치)",
  },
  {
    source_module: "kr_community",
    url: "https://disquiet.io/articles/4NsWP5",
    summary: "'10만 유저의 사이드 프로젝트를 멈추다' — WebSearch 요약으로만 존재 확인, 원문 인용 불가.",
    reason_excluded: "WebFetch 403 Forbidden — 접근 실패 (근접 1차 신호로 채택하려면 원문 인용 필요, 현재 불가)",
  },
  {
    source_module: "kr_community",
    url: "https://disquiet.io/@berw06090/makerlog/...",
    summary: "반년간 사이드프로젝트 후 오프라인 이벤트로 전환한 사례.",
    reason_excluded: "WebFetch 403 Forbidden — 접근 실패",
  },
  {
    source_module: "kr_community",
    url: "https://disquiet.io/articles/G7se7E",
    summary: "'프로덕테스트' 제작 후기, 100일간 4,000 누적 방문.",
    reason_excluded: "WebFetch 403 Forbidden — 접근 실패, WebSearch 요약 외 원문 확보 못 함",
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

console.log(`signals: ${addedCount}/${signals.length} added (나머지는 중복)`);
console.log(`context_only: ${contextOnly.length}건 기록 (판단 집계 제외, 맥락 참고용)`);
