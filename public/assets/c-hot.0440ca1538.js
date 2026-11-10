/* 自动生成，勿手改：hot 分类模块（点开才下载） */
const { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DIVISOR, FAV_KEY, FIELDS, KEY, MONTH_TABLE, PRE_KEY, SNAP_KEY, SNAP_PICK, TABS, THEME_KEY, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, ensureChunk, favList, fillUnits, flash, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, leftAfter, loadCmpA, loadSnaps, loanRows, makeSnap, money, monthToDate, monthlyIRR, months, npvDiff, num, numOf, panelEls, panelParams, parseAmounts, parseDate, pct, percentile, presets, quickOf, rateOf, refreshCounts, renderLoanTable, renderPresets, renderSnapCompare, renderSnapList, rentBuyAt, restore, runCalc, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, snapNameOf, snapshot, st0, startName, taxBy, yuan, zOf } = window.FC;

  function calcHealth() {
    var inc = Math.max(0, num($("hk-inc"), 0));
    var need = Math.max(0, num($("hk-need"), 0));
    var want = Math.max(0, num($("hk-want"), 0));
    var cash = Math.max(0, num($("hk-cash"), 0));
    var inv = Math.max(0, num($("hk-inv"), 0));
    var house = Math.max(0, num($("hk-house"), 0));
    var debt = Math.max(0, num($("hk-debt"), 0));
    var loan = Math.max(0, num($("hk-loan"), 0));
    var prem = Math.max(0, num($("hk-prem"), 0));
    var ins = Math.max(0, num($("hk-ins"), 0));

    var saveRate = inc > 0 ? (inc - need - want) / inc : 0;
    var emgMonths = need > 0 ? cash / need : 0;
    var assets = cash + inv + house;
    var lev = assets > 0 ? debt / assets : 0;
    var dsr = inc > 0 ? loan / inc : 0;
    var needIns = inc * 12 * 10 + debt - (cash + inv);
    if (needIns < 0) needIns = 0;
    var cover = needIns > 0 ? ins / needIns : 1;
    var premRate = inc > 0 ? prem / (inc * 12) : 0;
    var net = assets - debt;

    function scoreSave(v) { return v >= 0.30 ? 20 : v >= 0.20 ? 15 : v >= 0.10 ? 10 : 5; }
    function scoreEmg(v) { return v >= 6 ? 20 : v >= 4 ? 15 : v >= 2 ? 10 : 5; }
    function scoreLev(v) { return v < 0.30 ? 20 : v < 0.50 ? 15 : v < 0.70 ? 10 : 5; }
    function scoreDsr(v) { return v < 0.30 ? 20 : v < 0.40 ? 15 : v < 0.50 ? 10 : 5; }
    function scoreCover(v) { return v >= 1 ? 20 : v >= 0.7 ? 15 : v >= 0.4 ? 10 : 5; }

    var dims = [
      ["储蓄率", pct(saveRate, 1), scoreSave(saveRate), "≥30%"],
      ["应急金月数", fmt(emgMonths, 1) + " 个月", scoreEmg(emgMonths), "≥6 个月"],
      ["资产负债率", pct(lev, 1), scoreLev(lev), "<50%"],
      ["月供收入比", pct(dsr, 1), scoreDsr(dsr), "<40%"],
      ["保障覆盖", pct(cover, 1), scoreCover(cover), "≥100%"]
    ];
    var total = 0, weak = dims[0];
    for (var i = 0; i < dims.length; i++) {
      total += dims[i][2];
      if (dims[i][2] < weak[2]) weak = dims[i];
    }
    var rate = total >= 85 ? "优秀" : total >= 70 ? "良好" : total >= 55 ? "及格，有明显短板" : "需要改善";
    $("hk-big").textContent = fmt(total, 0);
    $("hk-save").textContent = pct(saveRate, 1) + "（月存 " + money(inc - need - want) + " 元）";
    $("hk-emg").textContent = fmt(emgMonths, 1) + " 个月（现金 " + money(cash) + " ÷ 必需支出 " + money(need) + "）";
    $("hk-lev").textContent = pct(lev, 1) + "（负债 " + money(debt) + " ÷ 资产 " + money(assets) + "）";
    $("hk-dsr").textContent = pct(dsr, 1) + "（月供 " + money(loan) + " ÷ 收入 " + money(inc) + "）";
    $("hk-cover").textContent = pct(cover, 1) + "（保额 " + money(ins) + " ÷ 应配 " + money(needIns) + "）";
    $("hk-premp").textContent = pct(premRate, 2) + "（年保费 " + money(prem) + "；保障型 5–10% 属正常）";
    $("hk-net").textContent = money(net) + " 元";
    $("hk-weak").textContent = weak[0] + "（" + weak[1] + "，得分 " + weak[2] + "/20）";
    var rows = [];
    for (var j = 0; j < dims.length; j++) {
      rows.push("<tr" + (dims[j][2] <= 10 ? ' class="c-warn"' : "") + '><td class="tal">' + dims[j][0]
        + "</td><td>" + dims[j][1] + "</td><td>" + dims[j][2] + " / 20</td><td>" + dims[j][3] + "</td></tr>");
    }
    $("hk-body").innerHTML = rows.join("");
    $("hk-note").textContent = "综合得分 " + fmt(total, 0) + " 分，评级「" + rate + "」。"
      + "五项各 20 分，取的是最常见的达标线：储蓄率 30%、应急金 6 个月、资产负债率 50%、月供收入比 40%、保障覆盖 100%。"
      + "你最短的那块板是「" + weak[0] + "」，先补它性价比最高——"
      + (weak[0] === "保障覆盖"
        ? "按责任法应配 " + money(needIns) + " 元（年收入 ×10 ＋ 负债 － 流动资产），现在还差 " + money(Math.max(0, needIns - ins)) + " 元；定期寿险比重疾便宜一个量级，先补寿险和意外。"
        : weak[0] === "应急金月数"
          ? "应急金要能覆盖 6 个月必需支出，缺口 " + money(Math.max(0, need * 6 - cash)) + " 元，放在货币基金里，别拿去买股票。"
          : weak[0] === "储蓄率"
            ? "储蓄率低于 20% 时，先砍可选支出而不是硬省必需支出，月存 " + money(Math.max(0, inc * 0.3 - (inc - need - want))) + " 元才够 30% 线。"
            : weak[0] === "资产负债率"
              ? "负债率高于 50% 时，新增债务要先还旧债，别用新贷养旧贷；房贷月供已占收入的 " + pct(dsr, 1) + "。"
              : "月供收入比超过 40%，收入哪怕短暂中断也会立刻吃紧，先把月供压到 " + money(inc * 0.4) + " 元以内。")
      + " 这套体检只做粗筛：没有统计你的养老金、公积金、年终奖和未来的大额支出，"
      + "所以分数低不等于财务不健康，要看具体是哪一项低。数据只在本机浏览器，不上传。";
  }

export default { healthcheck: calcHealth };
