/* 自动生成，勿手改：hot 分类模块（点开才下载） */
const { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, FAV_KEY, FIELDS, FIRST_ACTIVATE, KEY, MONTH_CATS, MONTH_TABLE, PENDING_PARAMS, PRE_KEY, QUOTA_WARNED, RECENT_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, TOAST_EL, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, dlJson, drawMonthCats, drawMonthStack, drawReportCharts, drawRpMini, drawnMonthlyChart, drawnYearChart, ensureChunk, favList, fillMonthGrid, fillUnits, flash, flushParams, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, leftAfter, loadCmpA, loadSnaps, loanRows, makeSnap, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numOf, panelEls, panelParams, parseAmounts, parseDate, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, presets, pushRecent, quickOf, rateOf, readJsonFile, readMonthGrid, recentList, refreshCounts, renderLoanTable, renderPresets, renderSnapCompare, renderSnapList, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tap, taxBy, toast, updShown, yuan, zOf } = window.FC;

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

export const PANELS = {"healthcheck":"  <section class=\"panel\" id=\"panel-healthcheck\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入 <button class=\"ghost sm\" id=\"hk-pull\" type=\"button\">读取我填过的数据</button></h2>\n    <span class=\"row\">\n      <input id=\"hk-inc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\" aria-label=\"月收入\">\n      <input id=\"hk-age\" type=\"number\" inputmode=\"numeric\" min=\"16\" max=\"90\" step=\"1\" value=\"32\" aria-label=\"年龄\">\n    </span>\n    <p class=\"hint\">左：家庭月收入（税后），右：年龄</p>\n    <span class=\"row\">\n      <input id=\"hk-need\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"10000\" aria-label=\"月必需支出\">\n      <input id=\"hk-want\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"3000\" aria-label=\"月可选支出\">\n    </span>\n    <p class=\"hint\">左：月必需支出（房租房贷、吃饭、水电、学费），右：月可选支出（娱乐、旅游、非必需）</p>\n    <span class=\"row\">\n      <input id=\"hk-cash\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"50000\" aria-label=\"现金及活期\">\n      <input id=\"hk-inv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\" aria-label=\"投资资产\">\n    </span>\n    <p class=\"hint\">左：现金、活期、货币基金，右：股票基金等投资资产（按市值）</p>\n    <span class=\"row\">\n      <input id=\"hk-house\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"2000000\" aria-label=\"自住房市值\">\n      <input id=\"hk-debt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\" aria-label=\"负债余额\">\n    </span>\n    <p class=\"hint\">左：自住房当前市值（无房填 0），右：全部负债余额（房贷＋车贷＋信用贷）</p>\n    <span class=\"row\">\n      <input id=\"hk-loan\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"6000\" aria-label=\"月还款\">\n      <input id=\"hk-prem\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"8000\" aria-label=\"年保费\">\n    </span>\n    <p class=\"hint\">左：每月还本付息合计，右：全家年缴保费</p>\n    <label class=\"f\">\n      <span>已配置的身故/重疾保额合计</span>\n      <input id=\"hk-ins\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"500000\">\n      <em>只算保障型（定期寿险、重疾、意外），不含理财型保额</em>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">综合得分</span><strong id=\"hk-big\">—</strong><span class=\"unit\">/ 100</span></div>\n    <ul class=\"kv\">\n      <li><span>储蓄率 / 建议 ≥30%</span><b id=\"hk-save\">—</b></li>\n      <li><span>应急金 / 建议 ≥6 个月</span><b id=\"hk-emg\">—</b></li>\n      <li><span>资产负债率 / 建议 &lt;50%</span><b id=\"hk-lev\">—</b></li>\n      <li><span>月供收入比 / 建议 &lt;40%</span><b id=\"hk-dsr\">—</b></li>\n      <li><span>保障覆盖 / 建议 ≥100%</span><b id=\"hk-cover\">—</b></li>\n      <li><span>保费占收入</span><b id=\"hk-premp\">—</b></li>\n      <li><span>家庭净资产</span><b id=\"hk-net\">—</b></li>\n      <li><span>最短的那块板</span><b id=\"hk-weak\">—</b></li>\n    </ul>\n    <div class=\"tablebox\"><table><thead><tr><th>维度</th><th>你的数</th><th>得分</th><th>达标线</th></tr></thead><tbody id=\"hk-body\"></tbody></table></div>\n    <p class=\"hint\" id=\"hk-note\"></p>\n  </div>\n    </div>\n  </section>\n"};
export default { healthcheck: calcHealth };
