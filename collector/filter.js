/**
 * 근접 1차 신호 후보 필터 (DESIGN.local.md 게이트 4).
 *
 * 이 필터는 "채택"을 결정하지 않는다 — 후보를 추리기만 한다.
 * 최종 채택 여부는 사람이 원문을 읽고 판단한다 (docs/CONTEXT.md 4장:
 * "자동 필터로 후보를 추리고 최종 채택 여부는 사람이 확인하는 방식을 병행").
 */

const FIRST_PERSON = [
  "제가", "저는", "저희", "제 프로젝트", "만들었는데", "만들어봤는데",
  "출시했는데", "런칭했는데", "접었습니다", "접었다", "피벗했습니다",
  "i built", "i made", "i launched", "i spent", "i wasted", "my project", "we built", "we launched",
];

const CONCRETE_DETAIL = [
  /\d+\s*(개월|달|주|년)/, // 기간
  /\d+\s*(명|유저|사용자|users?)/, // 규모
  /(\$|₩)\s*\d+/, // 금액
  /\d+\s*(만원|달러|dollars?)/,
  /\d+\s*(시간|hours?)/,
];

function isNearPrimaryCandidate(text) {
  const lower = text.toLowerCase();
  const personHits = FIRST_PERSON.filter((kw) => lower.includes(kw.toLowerCase()));
  const detailHits = CONCRETE_DETAIL.filter((re) => re.test(text));

  return {
    isCandidate: personHits.length > 0 && detailHits.length > 0,
    personHits,
    detailHits: detailHits.map((re) => re.toString()),
  };
}

module.exports = { isNearPrimaryCandidate };
