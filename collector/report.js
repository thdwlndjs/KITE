/**
 * .re0/iteration/0.1-signal-loop/EVIDENCE.local.md 게이트 대비 현재 상태를 출력한다.
 * 이 스크립트는 판단을 내리지 않는다 — 기준 도달 여부만 보여준다.
 */
const { loadSignals } = require("./store");
const { AXES } = require("./schema");

const MIN_SOURCES = 3;
const MIN_SIGNALS = 15;
const MAX_SINGLE_SOURCE_SHARE = 0.7;

function report() {
  const all = loadSignals();
  const adopted = all.filter((s) => s.near_primary && s.tag === "추적가능");

  const bySource = {};
  const byAxis = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  for (const s of adopted) {
    bySource[s.source_module] = (bySource[s.source_module] || 0) + 1;
    for (const axis of s.matched_axis || []) {
      if (byAxis[axis] !== undefined) byAxis[axis] += 1;
    }
  }

  const sourceCount = Object.keys(bySource).length;
  const totalAdopted = adopted.length;
  const maxShare =
    totalAdopted === 0 ? 0 : Math.max(...Object.values(bySource), 0) / totalAdopted;

  console.log("=== KITE 0.1-signal-loop 게이트 현황 ===\n");
  console.log(`전체 저장 레코드: ${all.length}건 (후보 포함), 채택(근접 1차 신호): ${totalAdopted}건\n`);

  console.log("[게이트 1] 소스 다양성");
  console.log(`  소스 수: ${sourceCount} (기준 ${MIN_SOURCES}+) ${sourceCount >= MIN_SOURCES ? "PASS" : "FAIL"}`);
  console.log(`  소스별 채택 건수:`, bySource);
  console.log(
    `  최대 소스 비중: ${(maxShare * 100).toFixed(0)}% (기준 <${MAX_SINGLE_SOURCE_SHARE * 100}%) ${
      maxShare < MAX_SINGLE_SOURCE_SHARE || totalAdopted === 0 ? "PASS" : "FAIL — 다양성 미달"
    }\n`
  );

  console.log("[게이트 2] 최소 관찰량");
  console.log(`  채택 신호: ${totalAdopted} (기준 ${MIN_SIGNALS}+) ${totalAdopted >= MIN_SIGNALS ? "PASS" : "미달 — 잠정 신호로만 취급"}\n`);

  console.log("[게이트 3] 축 커버리지");
  for (const [axis, label] of Object.entries(AXES)) {
    const count = byAxis[axis];
    const status = axis == 6 ? "이번 사이클에서 항상 미확정" : count > 0 ? `${count}건` : "미확인 (0건)";
    console.log(`  축${axis} (${label}): ${status}`);
  }

  const readyToJudge =
    sourceCount >= MIN_SOURCES && totalAdopted >= MIN_SIGNALS && maxShare < MAX_SINGLE_SOURCE_SHARE;

  console.log(`\n=== 판단 가능 여부: ${readyToJudge ? "예 — 판단 카드 작성 가능" : "아니오 — 탐색 계속"} ===`);
}

report();
