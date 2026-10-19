/**
 * Signal record shape — one adopted or candidate piece of evidence.
 * (.re0/iteration/0.1-signal-loop/DESIGN.local.md 게이트 4, 6과 대응)
 *
 * @typedef {Object} Signal
 * @property {string} id               - url+quote 해시. 중복 방지용.
 * @property {string} source_module    - "web_search" | "indiehackers" | "kr_community"
 * @property {string} url
 * @property {string} quote            - 원문 발췌 (직접 인용).
 * @property {string|null} date        - ISO 날짜, 모르면 null.
 * @property {number[]} matched_axis   - docs/CONTEXT.md 3장 축 번호 1~6 중 매칭된 것들.
 * @property {"추적가능"|"추론"|"가정"} tag
 * @property {boolean} near_primary    - 품질 필터(1인칭+구체적 디테일) 통과 여부. false면 판단 근거 집계에서 제외.
 * @property {string} query_cluster    - 이 신호를 찾은 검색 클러스터/쿼리.
 * @property {string} collected_at     - 수집 시각 ISO timestamp.
 * @property {string} [note]           - 채택/기각 사유 메모 (사람 검토 결과).
 */

const AXES = {
  1: "존재 여부",
  2: "빈도",
  3: "심각도",
  4: "현재 대응 방식",
  5: "기존 방식에 대한 불만",
  6: "KITE식 접근에 대한 행동 의향",
};

const TAGS = ["추적가능", "추론", "가정"];

module.exports = { AXES, TAGS };
