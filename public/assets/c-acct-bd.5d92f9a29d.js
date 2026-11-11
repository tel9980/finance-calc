/* 自动生成，勿手改：acct-bd 分类模块（点开才下载） */
const { $, BUILD_TAG, CAT_KEY, CAT_LABEL, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, ERR_BOX, FAV_KEY, FIELDS, FIRST_ACTIVATE, KEY, LAST_KEY, MONTH_CATS, MONTH_TABLE, NEXT_OF, PALETTE_EL, PENDING_PARAMS, PRE_KEY, QUOTA_WARNED, RECENT_KEY, SAVE_TIMER, SEARCH_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, TOAST_EL, UNITS, XL_ROWS, YEAR_TABLE, _onPanels, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, buildTabBadges, calcLoan, calcMap, closePalette, cmpTabName, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, diagText, dlJson, doPrint, drawMonthCats, drawMonthStack, drawReportCharts, drawRpMini, drawnMonthlyChart, drawnYearChart, enhanceNums, enhancePanelUi, ensureChunk, evalExpr, favList, fillCmpMod, fillMonthGrid, fillUnits, flash, flushParams, flushSave, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, lastName, leftAfter, linkTo, loadCmpA, loadSnaps, loanRows, makeSnap, markBadInputs, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numBlur, numFocus, numInput, numKey, numOf, openPalette, palKey, panelEls, panelParams, parseAmounts, parseDate, parseNum, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, prePanels, presets, printCover, pushRecent, pushSearch, quickOf, rateOf, readJsonFile, readMonthGrid, recentList, refreshCounts, refreshTableTools, refreshTrackMods, renderLoanTable, renderNext, renderPalette, renderPresets, renderSearchHist, renderSnapCompare, renderSnapList, renderTrack, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, scrollResultIfDeepLink, searchHist, setCat, setSub, setTheme, showErrorBox, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tabCatLabel, tap, taxBy, toast, trimNum, unitFor, updShown, yuan, zOf } = window.FC;

  function calcAging() {
    var bs = [
      Math.max(0, num($("ag-b1"), 0)), Math.max(0, num($("ag-b2"), 0)),
      Math.max(0, num($("ag-b3"), 0)), Math.max(0, num($("ag-b4"), 0))
    ];
    var raw = ($("ag-rates") && $("ag-rates").value || "5,10,30,50").split(/[,，\s]+/);
    var rs = [];
    for (var i = 0; i < 4; i++) {
      var p = parseFloat(raw[i]);
      rs.push(isFinite(p) ? Math.max(0, Math.min(100, p)) / 100 : 0);
    }
    var have = Math.max(0, num($("ag-have"), 0));
    var names = ["1 年以内", "1–2 年", "2–3 年", "3 年以上"];

    var total = 0, prov = 0;
    for (var j = 0; j < 4; j++) { total += bs[j]; prov += bs[j] * rs[j]; }
    var delta = prov - have;
    var net = total - prov;

    $("ag-prov").textContent = money(prov);
    $("ag-total").textContent = yuan(total);
    $("ag-rate").textContent = total > 0 ? pct(prov / total) : "—";
    $("ag-have-out").textContent = yuan(have);
    $("ag-delta").textContent = (delta >= 0 ? "补提 " + money(delta) : "冲回 " + money(-delta)) + " 元";
    $("ag-net").textContent = yuan(net);

    var html = "";
    for (var k = 0; k < 4; k++) {
      html += "<tr><td>" + names[k] + "</td><td>" + money(bs[k]) + "</td><td>" +
        (total > 0 ? pct(bs[k] / total) : "—") + "</td><td>" + pct(rs[k]) + "</td><td>" +
        money(bs[k] * rs[k]) + "</td></tr>";
    }
    html += "<tr><td><b>合计</b></td><td><b>" + money(total) + "</b></td><td>100.00%</td><td>" +
      (total > 0 ? pct(prov / total) : "—") + "</td><td><b>" + money(prov) + "</b></td></tr>";
    $("ag-body").innerHTML = html;

    $("ag-note").textContent = "计提比例是公司的会计估计（准则要求按预期信用损失计提），没有法定固定比例，"
      + "但要有依据并能解释：通常 1 年以内 5%、1–2 年 10–30%、2–3 年 30–50%、3 年以上 50–100%，"
      + "个别认定（对方已破产、诉讼中）可单独全额计提。注意会计计提不等于税前扣除——"
      + "坏账准备在汇算时要做纳税调增，只有实际发生损失、按规定留存证据（法院判决、破产清算、逾期 3 年以上等）才能税前扣除，"
      + "「按 5‰ 计提可扣除」是早已废止的旧规定，别再用了。"
      + (delta > 0.005 ? " 本期需补提 " + money(delta) + " 元。" : (delta < -0.005 ? " 本期可冲回 " + money(-delta) + " 元。" : " 本期无需调整。"));
  }

  function calcApTerms() {
    var amt = Math.max(0, num($("ap-amt"), 0));
    var disc = Math.max(0, Math.min(50, num($("ap-disc"), 0))) / 100;
    var d1 = Math.max(0, num($("ap-d1"), 0));
    var d2 = Math.max(d1 + 1, num($("ap-d2"), 30));
    var rate = Math.max(0, num($("ap-rate"), 0)) / 100;
    var gap = d2 - d1;

    var discAmt = amt * disc;
    var need = amt - discAmt;
    var ann = disc > 0 && disc < 1 ? (disc / (1 - disc)) * (365 / gap) : NaN;
    var interest = need * rate * (gap / 365);
    var netGain = discAmt - interest;

    $("ap-cost").textContent = isFinite(ann) ? pct(ann) : "—";
    $("ap-discamt").textContent = yuan(discAmt);
    $("ap-need").textContent = money(need) + " 元 / " + fmt(gap, 0) + " 天";
    $("ap-int").textContent = yuan(interest);
    $("ap-net").textContent = money(netGain) + " 元" + (netGain < 0 ? "（早付反而亏）" : "");
    $("ap-crit").textContent = isFinite(ann) ? pct(ann) : "—";

    if (disc <= 0) {
      $("ap-verdict").textContent = "没有折扣，谈不上取舍，能拖到信用期就拖到信用期";
    } else if (netGain > 0) {
      $("ap-verdict").textContent = "该早付：借 " + fmt(rate * 100, 1) + "% 的钱，换 " + pct(ann) + " 的年化回报，净赚 " + money(netGain) + " 元";
    } else {
      $("ap-verdict").textContent = "别早付：资金成本 " + fmt(rate * 100, 1) + "% 已经高过放弃折扣的 " + pct(ann) + "，等到信用期更划算";
    }

    var rateList = [0, 0.04, 0.06, 0.08, 0.10, 0.12, 0.18, 0.24, 0.36];
    var html = "";
    for (var i = 0; i < rateList.length; i++) {
      var rr = rateList[i];
      var it = need * rr * (gap / 365);
      var ng = discAmt - it;
      var hi = Math.abs(rr - rate) < 0.0005 ? ' class="c-info"' : "";
      html += "<tr" + hi + "><td>" + fmt(rr * 100, 0) + "%</td><td>" + money(it) + "</td><td>" +
        money(ng) + "</td><td>" + (ng > 0 ? "该早付" : "不该") + "</td></tr>";
    }
    $("ap-body").innerHTML = html;

    $("ap-note").textContent =
      "口诀：放弃折扣的成本 = 折扣率 ÷ (1 − 折扣率) × 365 ÷ (信用期 − 折扣期)，跟借款利率一比就知道该不该借。2/10 net 30 折成年化是 " +
      (isFinite(ann) ? pct(ann) : "—") + "，这几乎是中国市场上最贵的一笔钱，除非实在借不到，否则一定要拿。" +
      "早付的钱从哪来也要分清：自有闲钱按机会成本算，借钱按实际利率算，还要看银行能不能在折扣期内放款——赶不上就等于白算。" +
      "另一头别忘：早付会把自己的现金流提前抽出去，账上本来就紧的话，先看「资金排期」够不够撑过这几天。";
  }

  function calcPayAge() {
    var a1 = Math.max(0, num($("pg-a1"), 0));
    var a2 = Math.max(0, num($("pg-a2"), 0));
    var a3 = Math.max(0, num($("pg-a3"), 0));
    var a4 = Math.max(0, num($("pg-a4"), 0));
    var term = Math.max(1, num($("pg-term"), 60));
    var buy = Math.max(0, num($("pg-buy"), 0));
    var rate = Math.max(0, num($("pg-rate"), 0)) / 100;

    var tot = a1 + a2 + a3 + a4;
    var amts = [a1, a2, a3, a4];
    var mids = [15, 45, 75, 105];
    var names = ["0–30 天", "31–60 天", "61–90 天", "90 天以上"];

    var wavg = 0, i;
    for (i = 0; i < 4; i++) wavg += amts[i] * mids[i];
    wavg = tot > 0 ? wavg / tot : 0;

    // 按信用期切：整档超过信用期的全额计入，含信用期的那一档按天数比例折算（假定档内均匀分布）
    var lows = [0, 30, 60, 90], ups = [30, 60, 90, 120];
    var over = 0;
    for (i = 0; i < 4; i++) {
      if (term <= lows[i]) over += amts[i];
      else if (term < ups[i]) over += amts[i] * ((ups[i] - term) / (ups[i] - lows[i]));
    }
    var overPct = tot > 0 ? over / tot : 0;
    var days = buy > 0 ? tot / (buy / 30) : NaN;

    $("pg-total").textContent = yuan(tot);
    $("pg-wavg").textContent = tot > 0
      ? fmt(wavg, 1) + " 天（信用期 " + fmt(term, 0) + " 天" + (wavg > term ? "，整体偏长" : "，在期内") + "）"
      : "—";
    $("pg-over").textContent = money(over) + " 元 / " + pct(overPct);
    $("pg-over90").textContent = yuan(a4);
    $("pg-days").textContent = isFinite(days) ? fmt(days, 1) + " 天" : "—";
    $("pg-value").textContent = money(tot * rate) + " 元/年（相当于无息融资）";
    $("pg-extend").textContent = buy > 0 ? money(buy * rate) + " 元/年（多占用一个月采购额）" : "—";
    $("pg-cash").textContent = yuan(tot);

    var html = "";
    for (i = 0; i < 4; i++) {
      var share = tot > 0 ? amts[i] / tot : 0;
      var status;
      if (term >= ups[i]) status = "未到期";
      else if (term > lows[i]) status = "部分超期";
      else if (i === 3) status = "严重超期";
      else status = "已超期";
      var bad = status !== "未到期";
      html += "<tr" + (bad ? ' class="c-bad"' : "") + "><td>" + names[i] + "</td><td>" +
        money(amts[i]) + "</td><td>" + pct(share) + "</td><td>" + status + "</td></tr>";
    }
    $("pg-body").innerHTML = html;

    var risk;
    if (tot <= 0) risk = "没填应付，先按供应商把余额拉出来再分档。";
    else if (overPct >= 0.3) risk = "超期占比 " + pct(overPct) + " 偏高：供应商随时可能停货、加价或走法律程序，先按欠款多的供应商排个沟通顺序。";
    else if (overPct > 0) risk = "超期占比 " + pct(overPct) + "，可控但别拖成习惯，账龄只会越拖越难谈。";
    else risk = "全部在信用期内，账期管理是干净的。";

    $("pg-note").textContent = risk +
      " 账龄按「发票日到今天」分档，信用期填合同里写的付款期限。应付看着是负债，其实是供应商给的无息贷款：余额 " +
      money(tot) + " 元、资金成本 " + fmt(rate * 100, 1) + "%，一年相当于省下 " + money(tot * rate) + " 元利息。" +
      "应付周转天数 = 余额 ÷ 日均采购额，跟同行比才有意义（同行业差 10 天就是竞争力差别）。" +
      "90 天以上的挂账要特别小心：税务上长期挂账可能被核定收入，供应商那边也可能已经起诉或转给催收了，会计上该不该继续挂着要和业务确认。" +
      "反过来，账期不是越长越好——拖到供应商加价、断供、或者给你排到后面发货，隐性成本比省下的利息高得多。";
  }

  function calcInvoice() {
    var contract = Math.max(0, num($("iv-contract"), 0));
    var issued = Math.max(0, num($("iv-issued"), 0));
    var received = Math.max(0, num($("iv-received"), 0));
    var rate = Math.max(0, num($("iv-rate"), 0)) / 100;
    var overdue = Math.max(0, num($("iv-overdue"), 0));
    var days = Math.max(0, num($("iv-days"), 0));
    var penBp = Math.max(0, num($("iv-penalty"), 0));

    var k = 1 + rate;
    var left = Math.max(0, contract - issued);
    var leftEx = left / k;
    var issuedEx = issued / k;
    var recEx = received / k;
    var ar = Math.max(0, issued - received);
    var over = Math.min(overdue, ar);
    var ipct = contract > 0 ? issued / contract : 0;
    var rpct = contract > 0 ? received / contract : 0;
    var overPct = ar > 0 ? over / ar : 0;
    var penAmt = over * (penBp / 10000) * days;
    var all = ar + penAmt;

    $("iv-left").textContent = yuan(left);
    $("iv-ipct").textContent = pct(ipct) + (ipct >= 1 ? "（已开完）" : "");
    $("iv-rpct").textContent = pct(rpct) + (rpct > ipct ? "（收款超过开票，核一下预收）" : "");
    $("iv-issued-tax").textContent = money(issuedEx) + " / " + money(issued - issuedEx) + " 元";
    $("iv-left-tax").textContent = money(leftEx) + " / " + money(left - leftEx) + " 元";
    $("iv-ar").textContent = yuan(ar);
    $("iv-over").textContent = money(over) + " 元 / " + pct(overPct);
    $("iv-pen").textContent = days > 0 && penBp > 0
      ? money(penAmt) + " 元（" + fmt(over, 0) + " × " + fmt(penBp / 10000 * 100, 3) + "% × " + fmt(days, 0) + " 天）"
      : "没有约定罚息或没填逾期天数";
    $("iv-all").textContent = yuan(all);

    var rows = [
      ["合同总额", contract, contract / k, contract - contract / k],
      ["已开票", issued, issuedEx, issued - issuedEx],
      ["已收款", received, recEx, received - recEx],
      ["待开票", left, leftEx, left - leftEx],
      ["应收未收", ar, ar / k, ar - ar / k]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var flag = i === 4 && over > 0;
      html += "<tr" + (flag ? ' class="c-bad"' : "") + "><td>" + rows[i][0] + "</td><td>" +
        money(rows[i][1]) + "</td><td>" + money(rows[i][2]) + "</td><td>" + money(rows[i][3]) + "</td></tr>";
    }
    $("iv-body").innerHTML = html;

    var advice;
    if (contract <= 0) advice = "先把合同额填上，否则进度算不出来。";
    else if (rpct < ipct - 0.1) advice = "开票 " + pct(ipct) + " 但只回了 " + pct(rpct) + "：钱压在客户那边，先别急着开下一批票。";
    else if (ipct < 1) advice = "合同还剩 " + money(left) + " 未开票，按开票确认收入的话，这部分收入与销项税还在后面。";
    else advice = "合同已开满，接下来只剩收款。";

    $("iv-note").textContent = advice +
      " 台账三件事要盯住：① 待开票金额决定后面的收入与销项税，别忘了进项能不能跟上；② 应收余额 " +
      money(ar) + " 元才是真占用资金的部分，占合同 " + pct(contract > 0 ? ar / contract : 0) + "；③ 逾期 " +
      money(over) + " 元按合同可主张罚息 " + money(penAmt) + " 元，但主张罚息会伤客户关系，先按" +
      "「催收层级」走：财务催 → 业务催 → 停止发货 → 法务函。开票和收款不同步时，增值税纳税义务按开票或合同约定收款日先到者确认，" +
      "所以先开票后收钱的，税已经交了、钱还没到，这段利息是自己的成本。";
  }

  function calcInvStock() {
    var beg = Math.max(0, num($("sk-beg"), 0));
    var end = Math.max(0, num($("sk-end"), 0));
    var cogs = Math.max(0, num($("sk-cogs"), 0));
    var basis = num($("sk-days"), 365) > 0 ? num($("sk-days"), 365) : 365;
    var a1 = Math.max(0, num($("sk-a1"), 0)), a2 = Math.max(0, num($("sk-a2"), 0));
    var a3 = Math.max(0, num($("sk-a3"), 0)), a4 = Math.max(0, num($("sk-a4"), 0));
    var r3 = Math.max(0, Math.min(100, num($("sk-r3"), 0))) / 100;
    var r4 = Math.max(0, Math.min(100, num($("sk-r4"), 0))) / 100;

    var avg = (beg + end) / 2;
    var turn = avg > 0 ? cogs / avg : 0;
    var days = turn > 0 ? basis / turn : 0;
    var tot = a1 + a2 + a3 + a4;
    var stale = a3 + a4;
    var staleRate = tot > 0 ? stale / tot : 0;
    var prov = a3 * r3 + a4 * r4;
    var release = cogs > 0 ? cogs / basis * 10 : 0;
    var cover = cogs > 0 ? end / cogs * basis : 0;

    $("sk-tdays").textContent = days > 0 ? fmt(days, 1) + " 天" : "—";
    $("sk-turn").textContent = turn > 0 ? fmt(turn, 2) + " 次" : "—";
    $("sk-avg").textContent = money(avg) + " 元";
    $("sk-total").textContent = money(tot) + " 元" + (Math.abs(tot - end) > 1 ? "（与期末存货差 " + money(tot - end) + " 元，核对一下）" : "（与期末存货一致）");
    $("sk-stale").textContent = money(stale) + " 元 / " + pct(staleRate, 2);
    $("sk-prov").textContent = money(prov) + " 元";
    $("sk-release").textContent = money(release) + " 元";
    $("sk-cover").textContent = fmt(cover, 1) + " 天（期末存货 ÷ 日均成本）";

    var bins = [
      ["0–30 天", a1, 0],
      ["31–90 天", a2, 0],
      ["91–180 天", a3, r3],
      ["180 天以上", a4, r4]
    ];
    var html = "", i;
    for (i = 0; i < bins.length; i++) {
      var share = tot > 0 ? bins[i][1] / tot : 0;
      var p = bins[i][1] * bins[i][2];
      html += "<tr" + (bins[i][2] > 0 ? ' class="c-warn"' : "") + "><td>" + bins[i][0] + "</td><td>" + money(bins[i][1]) +
        "</td><td>" + pct(share, 2) + "</td><td>" + pct(bins[i][2], 0) + "</td><td>" + money(p) + "</td></tr>";
    }
    html += "<tr><td><b>合计</b></td><td><b>" + money(tot) + "</b></td><td><b>" + pct(1, 2) + "</b></td><td>—</td><td><b>" + money(prov) + "</b></td></tr>";
    $("sk-body").innerHTML = html;

    $("sk-note").textContent =
      " 存货周转天数 " + fmt(days, 1) + " 天，意思是仓库里的货平均要 " + fmt(days, 1) + " 天才能变成成本卖掉；这个数字直接吃现金——" + 
      "周转天数每多 10 天，就多压住 " + money(release) + " 元的现金。" +
      " 看两个层次：周转（效率）和库龄（质量）。周转快但库龄里有大额 180 天以上的，通常是「新货掩盖旧货」，呆滞没清干净；" +
      "现在 91 天以上的占 " + pct(staleRate, 2) + "，建议准备 " + money(prov) + " 元。" +
      " 三个容易混的口径：① 周转天数要用「营业成本」不用「销售收入」；② 平均存货取期初期末简单平均即可，季节性强的企业用月度平均更准；" +
      "③ 会计上计提跌价准备不等于税务上能扣除——存货跌价准备在汇算时要做纳税调增，实际报废损失还要留好证据（盘点表、报废审批、责任认定）才能税前扣除。" +
      " 想降周转天数，动的是三件事：接单节奏（别一次压季度量）、采购批量（少批量多次到）、以及砍长库龄 SKU 的订购。";
  }

  function calcTieOut() {
    var a = num($("tie-a"), 0);
    var b = num($("tie-b"), 0);
    var c = Math.max(0, num($("tie-c"), 0));
    var d = Math.max(0, num($("tie-d"), 0));
    var e = Math.max(0, num($("tie-e"), 0));
    var f = Math.max(0, num($("tie-f"), 0));

    var mine = a + c + d - e;
    var theirs = b - f;
    var diff = mine - theirs;
    var rawDiff = a - b;
    var expl = (c + d - e) + f;

    $("tie-raw").textContent = (rawDiff >= 0 ? "+" : "-") + money(Math.abs(rawDiff)) + " 元";
    $("tie-mine").textContent = money(mine) + " 元";
    $("tie-theirs").textContent = money(theirs) + " 元";
    $("tie-diff").textContent = (Math.abs(diff) < 0.005 ? "0.00 元（已平）" : money(diff) + " 元（还有差额，继续查）");
    $("tie-expl").textContent = money(expl) + " 元";

    var verdict;
    if (Math.abs(diff) < 0.005) verdict = "已平账：差额 " + money(Math.abs(rawDiff)) + " 元全部由 " + money(expl) + " 元未达/漏记解释，双方盖章确认即可";
    else verdict = "尚未平：还有 " + money(diff) + " 元没解释，优先查在途资金、未开票、重复记账和串户";

    $("tie-verdict").textContent = verdict;

    var rows = [
      ["我方漏记（已开票/已发货未入账）", "我方", "+", c],
      ["对方已付、我方未收到（在途）", "我方", "+", d],
      ["我方重复记账 / 已收未销账", "我方", "−", e],
      ["对方未入账（少记）", "对方", "−", f]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      html += "<tr><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td>" + money(rows[i][3]) + "</td></tr>";
    }
    html += "<tr><td><b>调节后</b></td><td>我方 / 对方</td><td>=</td><td><b>" + money(mine) + " / " + money(theirs) + "</b></td></tr>";
    $("tie-body").innerHTML = html;

    $("tie-note").textContent =
      " 对账不平，九成是这四类原因：① 在途（我付了对方没收到、对方付了我没收到）；② 未开票（货发了票没开，一方挂了账一方没挂）；" +
      "③ 重复记账或串户（同一笔记两次、记到别的客户名下）；④ 金额口径不一致（含税/不含税、扣了返利或质保金、汇率不同）。" +
      " 操作顺序：先核总额（原始差额 " + money(Math.abs(rawDiff)) + " 元），再核笔数，再逐笔勾对——先勾大额和最近三个月的，通常 80% 的差额就出来了。" +
      " 对平之后一定要出「对账确认单」双方盖章，尤其是关联方和长账龄往来：这既是审计底稿，也是日后主张债权、避免诉讼时效过期的证据。" +
      " 提醒：调节表只是把差异分类，不能替代调账——属于我方漏记的要补凭证，重复记账的要红冲，别只在表上调平。";
  }

  function calcDeadStock() {
    var q = Math.max(0, num($("ds-q"), 0));
    var costU = Math.max(0, num($("ds-cost"), 0));
    var price = Math.max(0, num($("ds-price"), 0));
    var prob = Math.min(100, Math.max(0, num($("ds-prob"), 0))) / 100;
    var store = Math.max(0, num($("ds-store"), 0));
    var cut = Math.max(0, num($("ds-cut"), 0));
    var scrapFee = Math.max(0, num($("ds-scrap"), 0));
    var scrapVal = Math.max(0, num($("ds-val"), 0));

    var a = prob * price - store;
    var b = cut;
    var c = scrapVal - scrapFee;
    var extra = (b - a) * q;
    var totalB = b * q, book = costU * q;

    $("ds-extra").textContent = money(extra) + " 元";
    $("ds-a").textContent = money(a) + " 元" + (a < 0 ? "（等下去净亏）" : "");
    $("ds-b").textContent = money(b) + " 元";
    $("ds-c").textContent = money(c) + " 元";
    $("ds-crit").textContent = money(a) + " 元";
    $("ds-total").textContent = money(totalB) + " / 亏 " + money(book - totalB) + " 元";
    $("ds-storeamt").textContent = money(store * q) + " 元";

    var verdict;
    if (b >= a && b >= c) verdict = "降价清仓：每件比继续等多 " + money(b - a);
    else if (a >= b && a >= c) verdict = "继续等原价：只要概率够，等着更划算";
    else verdict = "直接报废：清仓价太低，处理掉止损";
    $("ds-verdict").textContent = verdict;

    var prices = [cut * 0.75, cut, cut * 1.25, cut * 1.5], html = "", i;
    for (i = 0; i < prices.length; i++) {
      var p = Math.round(prices[i] * 100) / 100;
      var tot = p * q, adv = (p - a) * q;
      html += "<tr" + (adv < 0 ? ' class="c-warn"' : "") + "><td>" + money(p) + " 元</td><td>" + money(tot) +
        "</td><td>" + (adv >= 0 ? "+" : "") + money(adv) + "</td><td>" + (adv >= 0 ? "清仓更划算" : "不如继续等") + "</td></tr>";
    }
    $("ds-body").innerHTML = html;

    $("ds-note").textContent =
      " 三个方案每件净回收：继续等原价 " + money(a) + " 元（" + pct(prob, 0) + " 概率卖 " + money(price) + " 元，再扣一年仓储 " + money(store) + "）、" +
      "降价清仓 " + money(b) + " 元、直接报废 " + money(c) + " 元。结论：" + verdict + "。" +
      " 关键一句：单位成本 " + money(costU) + " 元已经花出去了，是沉没成本，不该进这个比较——" +
      "决策只看「从现在往后每件还能拿回多少」。所以账面亏 " + money(book - totalB) + " 元这件事，清不清仓都会发生，" +
      "清仓只是把它从「藏在存货里」变成「摆到利润表上」，同时把现金拿回来。" +
      " 临界售价是 " + money(a) + " 元：只要有人愿意出这个价以上，清掉就比继续等强，别为了「不亏本卖」把货压到报废。" +
      " 实操上还要考虑：清仓会不会冲击正价渠道（走尾货、员工内购、B 端打包）；如果是管理不善造成的霉烂变质，进项税要转出；" +
      "正常降价销售不转出；报废损失税前扣除要留盘点表、审批和处置凭证。";
  }

  function calcCollect() {
    var rate = Math.max(0, num($("co-rate"), 0)) / 100;
    var list = [], total = 0, i;
    for (i = 1; i <= 4; i++) {
      var a = Math.max(0, num($("co-a" + i), 0));
      var d = Math.max(0, num($("co-d" + i), 0));
      list.push({ a: a, d: d, score: a * d });
      total += a;
    }
    var wavg = 0, cost = 0, high = 0, late = 0;
    for (i = 0; i < list.length; i++) {
      wavg += list[i].a * list[i].d;
      cost += list[i].a * rate * list[i].d / 365;
      if (list[i].d > 180) high += list[i].a;
      if (list[i].d >= 1095) late++;
    }
    wavg = total > 0 ? wavg / total : 0;

    function act(d) {
      if (d <= 30) return "电话+账单提醒";
      if (d <= 90) return "书面催款函，暂停新单";
      if (d <= 180) return "上门面谈，签还款计划";
      if (d < 1095) return "法务介入，评估起诉";
      return "时效风险，先取得书面确认";
    }
    var sorted = list.slice().sort(function (x, y) { return y.score - x.score; });
    var html = "", k;
    for (k = 0; k < list.length; k++) {
      var r0 = list[k];
      var rank = sorted.indexOf(r0) + 1;
      var cls = r0.d > 180 ? "c-bad" : (r0.d > 90 ? "c-warn" : "");
      html += '<tr class="' + cls + '"><td>客户 ' + String.fromCharCode(65 + k) + "（第 " + rank + " 优先）</td><td>" + money(r0.a) +
        "</td><td>" + r0.d + " 天</td><td>" + fmt(r0.score / 10000, 1) + " 万·天</td><td>" + act(r0.d) + "</td></tr>";
    }
    $("co-body").innerHTML = html;

    $("co-total").textContent = money(total) + " 元";
    $("co-wavg").textContent = fmt(wavg, 1) + " 天";
    $("co-cost").textContent = money(cost) + " 元";
    $("co-high").textContent = money(high) + " 元 / " + pct(total > 0 ? high / total : 0);
    $("co-limit").textContent = late + " 笔" + (late === 0 ? "（暂无）" : "（必须马上处理）");
    $("co-first").textContent = sorted[0].a > 0 ? "金额×天数最大那笔：" + money(sorted[0].a) + " 元、" + sorted[0].d + " 天" : "无";
    $("co-act").textContent = act(sorted[0].d);

    $("co-note").textContent =
      " 逾期应收 " + money(total) + " 元，加权平均逾期 " + fmt(wavg, 1) + " 天，占着的资金一年值 " + money(cost) + " 元（按 " + pct(rate) + " 算）。" +
      " 排序逻辑是「金额 × 天数」：大额短逾期和小额长逾期都可能更紧急——前者影响现金流，后者影响能不能收回（拖过 3 年诉讼时效，法院就不支持了）。" +
      " 超 180 天的 " + money(high) + " 元（" + pct(total > 0 ? high / total : 0) + "）按现行准则要单独评估减值，别再用「都能收回来」的口径做账。" +
      " 催收的三个硬道理：① 越早越容易收回，回款概率随时间断崖式下降；② 停供是最有效的催收手段——已经发的货要不回来，还没发的可以停；" +
      "③ 诉讼时效 3 年，中间让对方签一份对账确认单或还款计划就能重新起算，这一步比打电话管用。";
  }

  function calcImpair() {
    var cost = Math.max(0, num($("im-cost"), 0));
    var price = Math.max(0, num($("im-price"), 0));
    var finish = Math.max(0, num($("im-finish"), 0));
    var sell = Math.max(0, num($("im-sell"), 0));
    var had = Math.max(0, num($("im-had"), 0));
    var up = Math.max(0, num($("im-up"), 0));
    var taxRate = Math.min(1, Math.max(0, num($("im-tax"), 25)) / 100);

    var nrv = price - finish - sell;
    var need = Math.max(0, cost - nrv);
    var delta = need - had;
    var after = Math.min(cost, Math.max(0, nrv));
    var rate = cost > 0 ? need / cost : NaN;
    var dta = need * taxRate;
    var nrv2 = up - finish - sell;
    var back = Math.min(need, Math.max(0, nrv2 - nrv));

    $("im-big").textContent = money(Math.max(0, delta)) + (delta < 0 ? "（应转回）" : "");
    $("im-nrv").textContent = yuan(nrv);
    $("im-gap").textContent = yuan(cost - nrv);
    $("im-rate").textContent = pct(rate);
    $("im-after").textContent = yuan(after);
    $("im-hadout").textContent = yuan(had) + (delta < 0 ? "（本期转回 " + money(-delta) + "）" : "（本期补提 " + money(delta) + "）");
    $("im-dta").textContent = yuan(dta);
    $("im-taxeff").textContent = delta >= 0
      ? "纳税调增 " + money(delta) + " 元（多交税，不是少交）"
      : "纳税调减 " + money(-delta) + " 元（转回要交税）";
    $("im-back").textContent = yuan(back);
    $("im-cap").textContent = yuan(need) + "（不能超过原计提）";

    var rows = [
      ["账面成本", yuan(cost), "存货原值"],
      ["预计售价（不含税）", yuan(price), "以资产负债表日最可靠证据为准"],
      ["减：至完工尚需投入", yuan(finish), "原材料类通常为 0"],
      ["减：销售费用及相关税费", yuan(sell), "运费、佣金、消费税等"],
      ["= 可变现净值", yuan(nrv), "NRV"],
      ["应有跌价准备余额", yuan(need), "成本高于 NRV 的部分"],
      ["已计提", yuan(had), "上期已计提的余额"],
      ["本期补提 /（转回）", (delta >= 0 ? "+" : "") + money(delta), delta >= 0 ? "计入资产减值损失" : "在原计提范围内冲回"]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var cls = i === 7 ? (delta > 0 ? ' class="c-warn"' : (delta < 0 ? ' class="c-info"' : "")) : "";
      html += "<tr" + cls + "><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td></tr>";
    }
    $("im-body").innerHTML = html;

    $("im-note").textContent =
      " 这一笔：可变现净值 " + yuan(nrv) + "，比成本低 " + yuan(cost - nrv) + "，跌价 " + pct(rate) +
      "，应有准备余额 " + yuan(need) + "，本期" + (delta >= 0 ? "补提 " + yuan(delta) : "转回 " + yuan(-delta)) + "。" +
      " 三个容易做错的地方：① 计提必须按单个存货项目（或同一类别的合并口径），不能把赚钱的和亏钱的互相抵掉；" +
      "② 必须有证据（订单价、最近成交价、库龄呆滞评估），拍脑袋提一笔，审计和税务都不认；" +
      "③ 会计计提和税前扣除是两回事——计提当期要纳税调增，实际处置发生损失时才凭证据扣除，备查资料留好。" +
      " 按 " + pct(taxRate, 0) + " 税率，这笔计提能确认递延所得税资产 " + yuan(dta) +
      "，但现在不多缴现金，只是把税推后。" +
      " 转回：售价回升到 " + money(up) + " 时 NRV 变 " + yuan(nrv2) + "，可转回 " + yuan(back) +
      "，但累计转回不得超过已计提的 " + yuan(need) + "。";
  }

  function calcEoq() {
    var D = Math.max(1, num($("eoq-d"), 1));
    var K = Math.max(0, num($("eoq-k"), 0));
    var H = Math.max(0.01, num($("eoq-h"), 1));
    var day = Math.max(0, num($("eoq-day"), 0));
    var sd = Math.max(0, num($("eoq-sd"), 0));
    var lt = Math.max(0, num($("eoq-lt"), 0));
    var svc = num($("eoq-svc"), 95);
    var moq = Math.max(0, num($("eoq-moq"), 0));

    var eoq = Math.sqrt(2 * D * K / H);
    var times = eoq > 0 ? D / eoq : 0;
    var gap = times > 0 ? 365 / times : 0;
    var total = Math.sqrt(2 * D * K * H);
    var z = svc <= 90 ? 1.28 : svc <= 95 ? 1.65 : svc <= 99 ? 2.33 : 2.58;
    var ss = z * sd * Math.sqrt(lt);
    var rop = day * lt + ss;
    var avg = eoq / 2 + ss;
    var moqCost = moq > 0 ? D / moq * K + moq / 2 * H : 0;

    $("eoq-big").textContent = fmt(eoq, 0);
    $("eoq-times").textContent = fmt(times, 1) + " 次/年";
    $("eoq-gap").textContent = "约 " + fmt(gap, 1) + " 天";
    $("eoq-total").textContent = yuan(total);
    $("eoq-split").textContent = money(times * K) + " / " + money(eoq / 2 * H) + " 元（各占一半是最优点）";
    $("eoq-ss").textContent = fmt(ss, 1) + " 件（z=" + fmt(z, 2) + "，" + fmt(svc, 0) + "% 服务水平）";
    $("eoq-rop").textContent = fmt(rop, 1) + " 件（提前期用掉 " + fmt(day * lt, 0) + " 件）";
    $("eoq-avg").textContent = fmt(avg, 1) + " 件，年持有成本 " + money(avg * H) + " 元";
    $("eoq-moqgap").textContent = moq > 0 ? (moqCost - total >= 0 ? "多花 " : "少花 ") + money(Math.abs(moqCost - total)) + " 元（起订 " + fmt(moq, 0) + " 件）" : "—";

    var lots = [0.5, 0.75, 1, 1.5, 2, moq > 0 ? moq / eoq : 0];
    var seen = {}, html = "";
    for (var i = 0; i < lots.length; i++) {
      if (!(lots[i] > 0)) continue;
      var q = Math.round(eoq * lots[i]);
      if (q <= 0 || seen[q]) continue;
      seen[q] = 1;
      var oc = D / q * K, hc = q / 2 * H, sum = oc + hc;
      var cls = q === Math.round(eoq) ? ' class="c-info"' : (sum > total * 1.02 ? ' class="c-warn"' : "");
      html += "<tr" + cls + "><td>" + fmt(q, 0) + " 件" + (q === Math.round(eoq) ? "（最优）" : "") + "</td><td>"
        + fmt(D / q, 1) + "</td><td>" + money(oc) + "</td><td>" + money(hc) + "</td><td>" + money(sum) + "</td></tr>";
    }
    $("eoq-body").innerHTML = html;

    $("eoq-note").textContent = "经济批量的道理很朴素：订得多，持有成本涨；订得少，订货成本涨，两者相等时最省。"
      + "所以与其纠结「哪个批量最便宜」，不如先把每次订货成本压下来（合并订单、电子对账），最优批量会自动变大、次数变少。"
      + "安全库存只覆盖提前期内的需求波动，供应商交期不稳、涨价囤货、旺季备货都要另外算；服务水平从 95% 提到 99%，安全库存要涨四成。";
  }

  function calcEcl() {
    var amt = [num($("ecl-a1"), 0), num($("ecl-a2"), 0), num($("ecl-a3"), 0), num($("ecl-a4"), 0), num($("ecl-a5"), 0)];
    var rate = [num($("ecl-r1"), 0) / 100, num($("ecl-r2"), 0) / 100, num($("ecl-r3"), 0) / 100,
      num($("ecl-r4"), 0) / 100, num($("ecl-r5"), 0) / 100];
    var adj = num($("ecl-adj"), 0) / 100;
    var prev = num($("ecl-prev"), 0);
    var names = ["未到期", "逾期 1–90 天", "逾期 91–180 天", "逾期 181–365 天", "逾期 1 年以上"];

    var total = 0, base = 0, html = "", i;
    for (i = 0; i < 5; i++) {
      var a = Math.max(0, amt[i]), r = Math.min(1, Math.max(0, rate[i]));
      var p = a * r;
      total += a; base += p;
      html += "<tr" + (i >= 3 ? ' class="c-warn"' : "") + "><td class=\"tal\">" + names[i] + "</td><td>" + money(a) + "</td><td>"
        + pct(r, 2) + "</td><td>" + money(p) + "</td></tr>";
    }
    $("ecl-body").innerHTML = html;

    var adjv = base * (1 + adj);
    var delta = adjv - prev;
    $("ecl-big").textContent = money(adjv);
    $("ecl-total").textContent = money(total);
    $("ecl-base").textContent = money(base);
    $("ecl-adjv").textContent = money(adjv) + "（前瞻调整 " + pct(adj, 0) + "）";
    $("ecl-delta").textContent = (delta >= 0 ? "补提 " : "冲回 ") + money(Math.abs(delta)) + " 元（期初 " + money(prev) + "）";
    $("ecl-ratio").textContent = total > 0 ? pct(adjv / total, 2) : "—";
    $("ecl-loss").textContent = "信用减值损失 " + money(Math.max(0, delta)) + " 元，直接冲减当期利润（不影响现金流）";
    $("ecl-tax").textContent = "会计计提不得税前扣除，汇算时纳税调增；实际发生坏账并留存证据才可扣除";

    $("ecl-note").textContent = "预期信用损失的核心是「分组 + 概率 + 前瞻」：同一账龄组的客户历史违约率乘上金额算出基础准备，"
      + "再按行业景气、客户集中度、宏观预期做前瞻调整。本例综合计提比例 " + (total > 0 ? pct(adjv / total, 2) : "—")
      + "，账龄超过 180 天的两档虽然只占 " + (total > 0 ? pct((Math.max(0, amt[3]) + Math.max(0, amt[4])) / total, 2) : "—")
      + "，却贡献了一半以上的准备——催收资源就该往这里压。注意：会计计提不等于能税前扣，别把「计提了」当成「省税了」。";
  }

  function calcSvc() {
    var d = Math.max(0, num($("svc-d"), 0));
    var sd = Math.max(0, num($("svc-sd"), 0));
    var lt = Math.max(0, num($("svc-lt"), 0));
    var sl = Math.min(0.999, Math.max(0.5, num($("svc-sl"), 95) / 100));
    var ann = Math.max(1, num($("svc-ann"), 1));
    var lot = Math.max(1, num($("svc-lot"), 1));
    var hold = Math.max(0, num($("svc-hold"), 0));
    var outc = Math.max(0, num($("svc-out"), 0));

    var sig = sd * Math.sqrt(lt);
    var orders = ann / lot;
    var z = zOf(sl);
    var ss = z * sig;
    var rop = d * lt + ss;

    function cost(p) {
      var zz = zOf(p), s2 = zz * sig;
      var hc = s2 * hold;
      var oc = orders * (1 - p) * outc;
      return { ss: s2, hc: hc, oc: oc, tot: hc + oc, z: zz };
    }
    var now = cost(sl);
    var hc = now.hc, oc = now.oc;

    $("svc-big").textContent = fmt(ss, 0);
    $("svc-z").textContent = fmt(z, 4) + "（对应 " + pct(sl, 1) + " 服务水平）";
    $("svc-ltd").textContent = fmt(d * lt, 0) + " 件 / " + fmt(sig, 2) + " 件";
    $("svc-rop").textContent = fmt(rop, 0) + " 件";
    $("svc-cost").textContent = money(hc) + " / " + money(oc) + " 元";
    $("svc-total").textContent = money(hc + oc) + " 元（年订货 " + fmt(orders, 1) + " 次）";

    var best = null, html = "";
    for (var p = 0.70; p <= 0.995; p += 0.005) {
      var c = cost(p);
      if (!best || c.tot < best.tot) { best = c; best.p = p; }
    }
    $("svc-best").textContent = pct(best.p, 1) + "（年总成本 " + money(best.tot) + " 元，安全库存 " + fmt(best.ss, 0) + " 件）";

    var up = cost(0.99);
    $("svc-up").textContent = "安全库存 +" + fmt(up.ss - ss, 0) + " 件（+" + pct(ss > 0 ? (up.ss / ss - 1) : 0, 1)
      + "），年成本 " + money(up.tot - now.tot) + " 元";

    var show = [0.80, 0.90, 0.95, 0.98, 0.99], mins = 1e18;
    var data = [];
    for (var i = 0; i < show.length; i++) {
      var c2 = cost(show[i]);
      data.push([show[i], c2]);
      if (c2.tot < mins) mins = c2.tot;
    }
    for (var k = 0; k < data.length; k++) {
      var pp = data[k][0], cc = data[k][1];
      html += "<tr" + (Math.abs(cc.tot - mins) < 1e-6 ? ' class="c-info"' : '') + "><td>" + pct(pp, 0)
        + "</td><td>" + fmt(cc.ss, 0) + "</td><td>" + fmt(d * lt + cc.ss, 0) + "</td><td>" + money(cc.hc)
        + "</td><td>" + money(cc.oc) + "</td><td>" + money(cc.tot) + "</td></tr>";
    }
    $("svc-body").innerHTML = html;

    $("svc-note").textContent = "安全库存＝z × 提前期内需求标准差，注意是「√提前期」放大日波动，不是把日标准差乘天数。"
      + "服务水平不是越高越好，一边是多备货的持有成本、一边是缺货的损失，本例最省的是 " + pct(best.p, 1)
      + " 左右。缺货代价高的品类（停线、罚款、客户流失）就该往上走；"
      + "反过来，需求稳定、能当天补货的东西，安全库存可以压到很低。"
      + "还有两个前提要满足：提前期本身要稳定（不然要另加一层缓冲），以及库存记录准确——账实不符时再高的服务水平也是假的。";
  }

  function calcSupplier() {
    var tot = Math.max(1, num($("spl-tot"), 1));
    var t = [num($("spl-t1"), 0), num($("spl-t2"), 0), num($("spl-t3"), 0), num($("spl-t4"), 0), num($("spl-t5"), 0)];
    var days = Math.max(0, num($("spl-days"), 0));
    var loss = Math.max(0, num($("spl-loss"), 0));

    var sum = 0, hhi = 0, i, html = "", cum = 0;
    for (i = 0; i < 5; i++) { sum += Math.max(0, t[i]); }
    for (i = 0; i < 5; i++) {
      var v = Math.max(0, t[i]), share = v / tot;
      hhi += share * share;
      cum += share;
      html += "<tr><td class=\"tal\">第" + (i + 1) + "大</td><td>" + fmt(v, 0) + "</td><td>" + pct(share, 2) + "</td><td>" + pct(cum, 2) + "</td></tr>";
    }
    $("spl-body").innerHTML = html;

    var top5 = sum / tot;
    var top1 = Math.max(0, t[0]) / tot;
    var hhi10000 = hhi * 10000;
    var level = hhi10000 < 1000 ? "低集中（分散，议价力在你手上）"
      : hhi10000 < 1800 ? "中度集中（可接受，需备选）"
      : hhi10000 < 3000 ? "较高集中（单点风险，必须做备选）" : "高度集中（断供即停线）";
    var gap = Math.max(0, t[0]) * days / 365;
    var stopDays = days;
    var cost = stopDays * loss;

    $("spl-big").textContent = pct(top5, 1).replace('%', '');
    $("spl-top1").textContent = pct(top1, 2) + (top1 > 0.25 ? "（超过 25%，预警）" : "（在常见 25% 以内）");
    $("spl-sum").textContent = fmt(sum, 2) + " 万元";
    $("spl-hhi").textContent = fmt(hhi10000, 0) + "（0–10000，份额平方和）";
    $("spl-level").textContent = level;
    $("spl-gap").textContent = fmt(gap, 2) + " 万元（" + fmt(days, 0) + " 天）";
    $("spl-cost").textContent = fmt(cost, 2) + " 万元";
    $("spl-advice").textContent = top1 > 0.25 ? "第一大占比过高：先找第二货源做小批量验证，别等断供才找"
      : (top5 > 0.7 ? "前五家占比高但分散：谈年度框架价，锁量不锁价" : "结构健康，维持现有询价机制");

    $("spl-note").textContent = "集中度不是越低越好：供应商太分散，单家量小拿不到价、质量与交期还难管。要看的是「断供能不能扛住」——"
      + "第一大占比超 25% 就该有第二货源，超 40% 属于单点致命。真正要准备的三个动作：关键料号的替代料认证、"
      + "安全库存覆盖切换周期（本例 " + fmt(days, 0) + " 天）、合同里的断供应急条款与模具/图纸归属。"
      + "另外别忘了「反向集中」——如果这家也占它产能的大头，你反而有议价权。";
  }

  function calcCustWin() {
    var cost = Math.max(0, num($("cwin-cost"), 0)) / 100;
    var cs = [
      { n: "A 客户", r: num($("cwin-ra"), 0), d: num($("cwin-da"), 0) / 100, b: num($("cwin-ba"), 0) / 100,
        f: num($("cwin-fa"), 0), s: num($("cwin-sa"), 0), t: num($("cwin-ta"), 0), g: num($("cwin-ga"), 0) / 100 },
      { n: "B 客户", r: num($("cwin-rb"), 0), d: num($("cwin-db"), 0) / 100, b: num($("cwin-bb"), 0) / 100,
        f: num($("cwin-fb"), 0), s: num($("cwin-sb"), 0), t: num($("cwin-tb"), 0), g: num($("cwin-gb"), 0) / 100 },
      { n: "C 客户", r: num($("cwin-rc"), 0), d: num($("cwin-dc"), 0) / 100, b: num($("cwin-bc"), 0) / 100,
        f: num($("cwin-fc"), 0), s: num($("cwin-sc"), 0), t: num($("cwin-tc"), 0), g: num($("cwin-gc"), 0) / 100 }
    ];
    var revT = 0, netT = 0, cutT = 0, occT = 0, html = "", i;
    for (i = 0; i < 3; i++) {
      var c = cs[i];
      c.gp = c.r * c.g;
      c.cut = c.r * c.d + c.r * c.b;
      c.fx = c.f + c.s;
      c.occ = c.r * c.t / 365 * cost;
      c.net = c.gp - c.cut - c.fx - c.occ;
      c.margin = c.r > 0 ? c.net / c.r : 0;
      revT += c.r; netT += c.net; cutT += c.cut; occT += c.occ;
    }
    var bi = 0, wi = 0;
    for (i = 1; i < 3; i++) { if (cs[i].net > cs[bi].net) bi = i; if (cs[i].net < cs[wi].net) wi = i; }

    for (i = 0; i < 3; i++) {
      var x = cs[i];
      html += "<tr" + (x.net < 0 ? ' class="c-bad"' : (i === bi ? ' class="c-info"' : "")) + "><td class=\"tal\">" + x.n
        + "</td><td>" + fmt(x.gp, 2) + "</td><td>" + fmt(x.cut, 2) + "</td><td>" + fmt(x.fx, 2) + "</td><td>"
        + fmt(x.occ, 2) + "</td><td>" + fmt(x.net, 2) + "</td><td>" + pct(x.margin, 1) + "</td></tr>";
    }
    $("cwin-body").innerHTML = html;

    $("cwin-big").textContent = fmt(cs[wi].net, 2);
    $("cwin-rank").textContent = cs[bi].n + " 净利率 " + pct(cs[bi].margin, 1) + " / " + cs[wi].n + " 净利率 " + pct(cs[wi].margin, 1);
    $("cwin-total").textContent = fmt(netT, 2) + " 万元";
    $("cwin-mix").textContent = fmt(revT, 2) + " 万元 / " + pct(revT > 0 ? netT / revT : 0, 2);
    $("cwin-cuts").textContent = fmt(cutT, 2) + " 万元（占收入 " + pct(revT > 0 ? cutT / revT : 0, 2) + "）";
    $("cwin-occ").textContent = fmt(occT, 2) + " 万元";
    $("cwin-worst").textContent = cs[wi].n + "：账期 " + fmt(cs[wi].t, 0) + " 天，占用 " + fmt(cs[wi].occ, 2) + " 万元";
    $("cwin-advice").textContent = cs[wi].net < 0
      ? "把 " + cs[wi].n + " 的折扣/返利收回来或缩账期，否则卖得越多亏得越多"
      : "整体健康，重点保住 " + cs[bi].n + " 这类高净利客户的份额";

    $("cwin-note").textContent = "毛利率是「谈价之前」的数字。客户要的折扣、年终返利、包邮运费、专属客服与技术支持、账期占用的利息，"
      + "全都从那点毛利里再扣一遍——本例三家的毛利率都是 25%–30%，但净贡献从 " + pct(cs[wi].margin, 1) + " 到 "
      + pct(cs[bi].margin, 1) + "。先用这张表把客户排个序，再决定「涨价、砍服务、缩账期、还是放弃」。"
      + "另外注意：收入占比大的客户不一定是赚钱的客户，最该谈条件的是净贡献最低那位。";
  }

  function calcCreditPolicy() {
    var sales = num($("cpl-sales"), 0), cm = 1 - num($("cpl-vc"), 0) / 100;
    var d1 = num($("cpl-d1"), 0), b1 = num($("cpl-b1"), 0) / 100;
    var d2 = num($("cpl-d2"), 0), b2 = num($("cpl-b2"), 0) / 100;
    var disc = num($("cpl-disc"), 0) / 100, dd = num($("cpl-dd"), 0);
    var take = Math.min(1, Math.max(0, num($("cpl-take"), 0) / 100));
    var k = num($("cpl-cost"), 0) / 100;
    var o1 = sales / 360 * d1, oc1 = o1 * k, bad1 = sales * b1, net1 = sales * cm - oc1 - bad1;
    var avgD = take * dd + (1 - take) * d2;
    var o2 = sales / 360 * avgD, oc2 = o2 * k, dcost = sales * disc * take, bad2 = sales * b2;
    var net2 = sales * cm - dcost - oc2 - bad2, diff = net2 - net1;
    var ann = (d2 - dd) > 0 ? disc / (1 - disc) * 360 / (d2 - dd) : 0;
    $("cpl-big").textContent = fmt(diff, 2);
    $("cpl-o1").textContent = money(o1) + " / " + money(oc1) + " 元";
    $("cpl-n1").textContent = money(bad1) + " / " + money(net1) + " 元";
    $("cpl-ad").textContent = fmt(avgD, 1) + " 天";
    $("cpl-o2").textContent = money(o2) + " / " + money(oc2) + " 元";
    $("cpl-n2").textContent = money(dcost) + " / " + money(bad2) + " 元";
    $("cpl-n3").textContent = money(net2) + " 元";
    $("cpl-ann").textContent = ann > 0 ? pct(ann, 2) : "—";
    var head = diff >= 0 ? "新政策更划算，一年多赚 " + money(diff) + " 元。"
      : "新政策不划算，一年少赚 " + money(-diff) + " 元，除非短账期能带来更多订单。";
    $("cpl-note").textContent = head
      + " 折扣的真实代价要折成年化：" + (ann > 0 ? "放弃折扣等于按 " + pct(ann, 2) + " 年化借钱，" : "")
      + " 比一般流贷贵得多，所以客户几乎都会享受折扣，实际享受比例别按宣传填、按历史数据填。"
      + " 账期缩短省的只是资金占用，坏账率的下降才往往是大头；而折扣成本是硬支出，"
      + " 三者要一起算，只看「账期从 60 天压到 30 天」是假优化。收紧信用还会掉一部分销量，这里按销售收入不变处理。";
  }

  function calcInvFund() {
    var cogs = num($("ifw-cogs"), 0);
    var d1 = num($("ifw-d1"), 90), d2 = num($("ifw-d2"), 60);
    var cr = num($("ifw-cost"), 0) / 100, hr = num($("ifw-hold"), 0) / 100;
    var now = cogs / 360 * d1, tgt = cogs / 360 * d2, rel = now - tgt;
    var s1 = rel * cr, s2 = rel * hr, sum = s1 + s2;
    $("ifw-big").textContent = money(rel);
    $("ifw-now").textContent = money(now) + " 元 / " + (d1 > 0 ? (360 / d1).toFixed(2) : "—") + " 次";
    $("ifw-tgt").textContent = money(tgt) + " 元 / " + (d2 > 0 ? (360 / d2).toFixed(2) : "—") + " 次";
    $("ifw-s1").textContent = money(s1) + " 元 / 年";
    $("ifw-s2").textContent = money(s2) + " 元 / 年";
    $("ifw-sum").textContent = money(sum) + " 元 / 年";
    $("ifw-rel").textContent = cogs > 0 ? pct(sum / cogs, 2) : "—";
    $("ifw-note").textContent = (rel >= 0
      ? "压缩 " + fmt(d1 - d2, 0) + " 天，等于把 " + money(rel) + " 元现金从仓库里拿回来，而且不用付利息。"
      : "目标天数比现在还长，会多占用 " + money(-rel) + " 元，这不是优化。")
      + " 周转天数按 360 天口径；存货金额是平均值（期初期末除以二），用期末数会高估波动。"
      + " 真要降库存，先减压最贵的那几类：单价高、专用性强、有保质期的；通用件反而适合多备。"
      + " 注意压库存可能牺牲交付率，缺货损失没算在这笔账里。";
  }

  function calcInvVar() {
    var inv = Math.max(0, num($("ivv-inv"), 0));
    var line = Math.max(0, num($("ivv-line"), 0.8));
    var d = [];
    for (var i = 1; i <= 6; i++) d.push(Math.max(0, num($("ivv-d" + i), 0)));
    var rates = d.map(function (x) { return inv > 0 ? x / inv * 100 : 0; });
    var total = 0;
    for (var j = 0; j < 6; j++) total += d[j];
    var avg = rates.reduce(function (s, x) { return s + x; }, 0) / 6;
    var f3 = (rates[0] + rates[1] + rates[2]) / 3;
    var l3 = (rates[3] + rates[4] + rates[5]) / 3;
    var over = 0;
    for (var k = 0; k < 6; k++) if (rates[k] > line) over++;

    $("ivv-big").textContent = fmt(avg, 2);
    $("ivv-total").textContent = money(total) + "（6 期累计）";
    $("ivv-trend").textContent = fmt(f3, 2) + "% vs " + fmt(l3, 2) + "%";
    var up = l3 - f3;
    $("ivv-verdict").textContent = up > 0.05 ? "🟡 上升（后 3 期高 " + fmt(up, 2) + " 点）" : up < -0.05 ? "🟢 下降" : "平稳";
    $("ivv-over").textContent = over + " 期（警戒线 " + fmt(line, 2) + "%）";

    var html = "";
    for (var p = 0; p < 6; p++) {
      var isOver = rates[p] > line;
      html += "<tr" + (isOver ? ' class="c-warn"' : "") + "><td class=\"tal\">第 " + (p + 1) + " 期</td><td>" + money(d[p]) + "</td><td>" + fmt(rates[p], 2) + "%</td><td class=\"tal\">" + (isOver ? "超线" : "正常") + "</td></tr>";
    }
    $("ivv-body").innerHTML = html;

    $("ivv-note").textContent = "平均差异率 " + fmt(avg, 2) + "%，累计盘亏 " + money(total) + "。趋势：前 3 期均值 " + fmt(f3, 2) + "% → 后 3 期 " + fmt(l3, 2) + "%（"
      + (up >= 0 ? "+" : "") + fmt(up, 2) + " 点）。" + (up > 0.05 ? "差异率在爬坡，别只看金额——先查出入库单据是否及时、盘点方法是否一致、监控有没有盲区。" : "趋势平稳，维持现有流程即可。")
      + "盘亏要在审批后做账务处理，人为损耗、失窃与自然损耗的账务和税务处理不一样。";
  }

  function calcAroverdue() {
    var rows = [], i;
    for (i = 1; i <= 4; i++) rows.push({
      amt: Math.max(0, num($("arv-a" + i), 0)),
      cr: Math.max(0, num($("arv-c" + i), 0)),
      dy: Math.max(0, num($("arv-d" + i), 0))
    });
    var rate = Math.min(100, Math.max(0, num($("arv-rate"), 6))) / 100;
    var tot = 0, od = 0, wd = 0, wc = 0, wov = 0, worst = null, worstScore = -1;
    for (i = 0; i < rows.length; i++) {
      var r = rows[i];
      var ov = Math.max(0, r.dy - r.cr);
      tot += r.amt;
      wd += r.dy * r.amt;
      wc += r.cr * r.amt;
      if (ov > 0) {
        od += r.amt;
        wov += ov * r.amt;
        var s = ov * r.amt;
        if (s > worstScore) { worstScore = s; worst = i; }
      }
    }
    var wAvgOd = od > 0 ? wov / od : 0;
    var wAvgD = tot > 0 ? wd / tot : 0;
    var wAvgC = tot > 0 ? wc / tot : 0;
    var cost = od > 0 ? od * (wAvgOd / 365) * rate : 0;
    $("arv-big").textContent = fmt(tot > 0 ? od / tot * 100 : 0, 2);
    $("arv-k1").textContent = money(tot) + " / " + money(od);
    $("arv-k2").textContent = fmt(wAvgOd, 2) + " 天";
    $("arv-k3").textContent = fmt(wAvgD, 2) + " 天";
    $("arv-k4").textContent = fmt(wAvgC, 2) + " 天";
    $("arv-k5").textContent = money(cost);
    $("arv-k6").textContent = worst === null ? "无逾期" : ("第 " + (worst + 1) + " 笔（逾期 " + fmt(rows[worst].dy - rows[worst].cr, 0) + " 天，金额 × 天数最大）");
    var tb = "";
    for (i = 0; i < rows.length; i++) {
      var r2 = rows[i], ov2 = Math.max(0, r2.dy - r2.cr);
      var cls = ov2 > 0 ? ' class="c-warn"' : "";
      tb += "<tr" + cls + "><td>" + (i + 1) + "</td><td>" + money(r2.amt) + "</td><td>" + fmt(r2.cr, 0) + "</td><td>" + fmt(r2.dy, 0) + "</td><td>" + fmt(ov2, 0) + "</td><td>" + (ov2 > 0 ? "逾期" : "按期") + "</td></tr>";
    }
    $("arv-body").innerHTML = tb;
    $("arv-note").textContent = "逾期金额占 " + fmt(tot > 0 ? od / tot * 100 : 0, 2) + "%，平均逾期 " + fmt(wAvgOd, 2) + " 天，DSO " + fmt(wAvgD, 2) + " 天。逾期不只是坏账风险，还按年化 " + pct(rate, 1) + " 吃掉资金收益；先催金额 × 逾期天数最大的那笔。";
  }

  function calcPayterms() {
    var amt = Math.max(0, num($("ppt-amount"), 1000000));
    var term = Math.max(0, num($("ppt-terms"), 30));
    var disc = Math.min(100, Math.max(0, num($("ppt-discount"), 2))) / 100;
    var dterm = Math.max(0, num($("ppt-discterms"), 10));
    var ext = Math.max(term, num($("ppt-extend"), 60));
    var rate = Math.min(100, Math.max(0, num($("ppt-rate"), 6))) / 100;
    var dd = amt * disc;
    var gap = Math.max(1, term - dterm);
    var ann = disc / (1 - disc) * 365 / gap;
    var gain20 = amt * gap / 365 * rate;
    var net = dd - gain20;
    var gain30 = amt * Math.max(0, ext - term) / 365 * rate;
    $("ppt-big").textContent = fmt(ann * 100, 2);
    $("ppt-k1").textContent = money(dd);
    $("ppt-k2").textContent = money(gain20);
    $("ppt-k3").textContent = money(net) + (net >= 0 ? "（拿折扣划算）" : "（拖账期划算）");
    $("ppt-k4").textContent = money(gain30);
    $("ppt-k5").textContent = net >= 0 ? (dterm + " 天内付款拿 " + pct(disc, 1) + " 折扣") : ("拖到 " + term + " 天账期更划算");
    $("ppt-note").textContent = "放弃折扣的真实代价 = " + pct(disc, 1) + " ÷ (1 − " + pct(disc, 1) + ") × 365 ÷ " + fmt(gap, 0) + " 天 = " + fmt(ann * 100, 2) + "%，远高于资金成本。延期付款能省利息但可能伤供应商关系与断供，只在现金紧张时用。";
  }

  function calcFxar() {
    var names = ["美元", "欧元", "港币", "日元"];
    var i, pls = [], end = 0, book = 0, tb = "";
    for (i = 1; i <= 4; i++) {
      var a = Math.max(0, num($("fxr-a" + i), 0));
      var r = Math.max(0, num($("fxr-r" + i), 0));
      var e = Math.max(0, num($("fxr-e" + i), 0));
      var pl = a * (e - r);
      pls.push(pl);
      end += a * e;
      book += a * r;
      tb += "<tr" + (pl < 0 ? ' class="c-warn"' : "") + "><td>" + names[i - 1] + "</td><td>" + fmt(a, 0) + "</td><td>" + fmt(r, 4) + "</td><td>" + fmt(e, 4) + "</td><td>" + money(pl) + "</td></tr>";
    }
    var net = 0; for (i = 0; i < 4; i++) net += pls[i];
    $("fxr-big").textContent = money(net);
    $("fxr-k1").textContent = money(end);
    $("fxr-k2").textContent = money(book);
    $("fxr-k3").textContent = money(pls[0]) + " / " + money(pls[1]);
    $("fxr-k4").textContent = money(pls[2]) + " / " + money(pls[3]);
    $("fxr-body").innerHTML = tb;
    $("fxr-note").textContent = "月末按期末汇率重估：净损益 " + money(net) + (net >= 0 ? "（收益）" : "（损失）") + "，进「财务费用——汇兑损益」。这是未实现损益，下月会随汇率转回；超毛利一半的单子建议锁汇。";
  }

  function calcInvorder() {
    var demand = num($("ivo-demand"), 35000), safety = num($("ivo-safety"), 5000), price = num($("ivo-price"), 80);
    var names = ["90 天以内", "91–180 天", "181 天以上"];
    var rows = [], usable = 0, bad = 0, total = 0;
    for (var i = 1; i <= 3; i++) {
      var s = num($("ivo-s" + i), 0), p = num($("ivo-p" + i), 0) / 100;
      var u = s * p;
      rows.push({ name: names[i - 1], s: s, p: p * 100, u: u, share: 0 });
      usable += u; bad += s * (1 - p); total += s;
    }
    rows.forEach(function (r) { r.share = total > 0 ? r.s / total * 100 : 0; });
    var need = demand + safety;
    var order = Math.max(0, need - usable);
    $("ivo-order").textContent = fmt(order);
    $("ivo-usable").textContent = fmt(usable) + " 件";
    $("ivo-amt").textContent = money(order * price);
    $("ivo-bad").textContent = fmt(bad) + " 件";
    $("ivo-loss").textContent = money(bad * price);
    $("ivo-s3share").textContent = fmt(rows[2].share) + "%";
    $("ivo-s23share").textContent = fmt((rows[1].s + rows[2].s) / total * 100) + "%";
    $("ivo-advice").textContent = order > 0 ? ("先耗 181 天以上库存，再订 " + fmt(order) + " 件") : "库存够用，不用订货";
    var tb = $("ivo-body");
    tb.innerHTML = "";
    rows.forEach(function (r) {
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + r.name + "</td><td>" + fmt(r.s) + "</td><td>" + fmt(r.p) + "%</td><td>" + fmt(r.u) + "</td><td>" + fmt(r.share) + "%</td>";
      tb.appendChild(tr);
    });
    $("ivo-note").textContent = "现有库存 " + fmt(total) + " 件里能出良品 " + fmt(usable) + " 件；需求 + 安全库存 = " + fmt(need) + " 件，所以只需再订 " + fmt(order) + " 件（金额 " + money(order * price) + "）。"
      + " 181 天以上库存良品率最低（" + fmt(rows[2].p) + "%），" + fmt(rows[2].s) + " 件里有 " + fmt(rows[2].s * (1 - rows[2].p / 100)) + " 件会报废。老库存优先发出去，能把潜在报废损失从账面拉回现实。"
      + " 注意：良品率是估计值，实际以质检为准。";
  }

  function calcCreditterm() {
    var sales = num($("ct-sales"), 10000000), vc = num($("ct-vc"), 60) / 100, rate = num($("ct-rate"), 6) / 100;
    var bad30 = num($("ct-bad30"), 1) / 100, bad60 = num($("ct-bad60"), 2.5) / 100;
    var cm = sales * (1 - vc);
    function row(d, bad) {
      var occ = sales * vc * d / 365, cost = occ * rate, bl = sales * bad, ni = cm - cost - bl;
      return { d: d, occ: occ, cost: cost, bad: bl, ni: ni };
    }
    var r0 = row(0, 0), r30 = row(30, bad30), r60 = row(60, bad60);
    var best = r0.ni >= r30.ni && r0.ni >= r60.ni ? r0 : (r30.ni >= r60.ni ? r30 : r60);
    $("ct-best").textContent = money(best.ni);
    $("ct-ni0").textContent = money(r0.ni);
    $("ct-ni30").textContent = money(r30.ni);
    $("ct-ni60").textContent = money(r60.ni);
    $("ct-occ30").textContent = money(r30.occ);
    $("ct-occ60").textContent = money(r60.occ);
    $("ct-diff").textContent = money(r0.ni - r30.ni);
    $("ct-pick").textContent = (best === r0 ? "现款（0 天）" : (best === r30 ? "30 天账期" : "60 天账期"));
    var tb = $("ct-body");
    tb.innerHTML = "";
    [r0, r30, r60].forEach(function (r) {
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + (r.d === 0 ? "现款" : r.d + " 天账期") + "</td><td>" + money(r.occ) + "</td><td>" + money(r.cost) + "</td><td>" + money(r.bad) + "</td><td>" + money(r.ni) + "</td>";
      tb.appendChild(tr);
    });
    $("ct-note").textContent = "账期每拉长 30 天：占用资金按「销售额 × 变动成本率 × 天数 / 365」算，资金成本 = 占用 × 资金成本率；坏账 = 销售额 × 坏账率。"
      + " 本例 30 天比现款少赚 " + money(r0.ni - r30.ni) + "（资金成本 " + money(r30.cost) + " + 坏账 " + money(r30.bad) + "），60 天再少赚 " + money(r30.ni - r60.ni) + "。"
      + " 结论只在「账期长短不影响销量」的假设下成立；靠放账期换订单时，要把多卖的边际贡献一起算进去。";
  }

export const PANELS = {"aging":"  <section class=\"panel\" id=\"panel-aging\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（应收账款余额与计提政策）</h2>\n    <label class=\"f\"><span>1 年以内（元）</span>\n      <input id=\"ag-b1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"500000\"></label>\n    <label class=\"f\"><span>1–2 年（元）</span>\n      <input id=\"ag-b2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"120000\"></label>\n    <label class=\"f\"><span>2–3 年（元）</span>\n      <input id=\"ag-b3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"40000\"></label>\n    <label class=\"f\"><span>3 年以上（元）</span>\n      <input id=\"ag-b4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\"></label>\n    <label class=\"f\"><span>各档计提比例（%，逗号分隔）</span>\n      <input id=\"ag-rates\" type=\"text\" inputmode=\"decimal\" value=\"5,10,30,50\"></label>\n    <label class=\"f\"><span>已计提坏账准备（元）</span>\n      <input id=\"ag-have\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"40000\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">应计提坏账准备</span><strong id=\"ag-prov\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>应收账款合计</span><b id=\"ag-total\">—</b></li>\n      <li><span>综合计提比例</span><b id=\"ag-rate\">—</b></li>\n      <li><span>已计提</span><b id=\"ag-have-out\">—</b></li>\n      <li><span>本期应补提（负数=冲回）</span><b id=\"ag-delta\">—</b></li>\n      <li><span>计提后应收账款净额</span><b id=\"ag-net\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>账龄</th><th>余额</th><th>占比</th><th>计提比例</th><th>应计提</th></tr></thead>\n        <tbody id=\"ag-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"ag-note\"></p>\n  </div>\n    </div>\n  </section>\n","apterms":"  <section class=\"panel\" id=\"panel-apterms\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（供应商给的付款条件）</h2>\n    <label class=\"f\">\n      <span>应付金额（发票金额，元）</span>\n      <input id=\"ap-amt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"100000\">\n    </label>\n    <label class=\"f\">\n      <span>现金折扣率（%，如 2/10 里的 2）</span>\n      <input id=\"ap-disc\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"50\" step=\"0.1\" value=\"2\">\n    </label>\n    <label class=\"f\">\n      <span>折扣期（天，如 2/10 里的 10）</span>\n      <input id=\"ap-d1\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"10\">\n    </label>\n    <label class=\"f\">\n      <span>信用期（天，如 net 30 里的 30）</span>\n      <input id=\"ap-d2\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"30\">\n    </label>\n    <label class=\"f\">\n      <span>你的资金年化成本（%，借款利率或理财收益）</span>\n      <input id=\"ap-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"6\">\n    </label>\n    <em>资金成本就填「多占用这笔钱一年的机会成本」：银行流贷利率、票据贴现率，或自有资金的机会收益</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">放弃折扣的年化成本</span><strong id=\"ap-cost\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>早付能拿到的折扣</span><b id=\"ap-discamt\">—</b></li>\n      <li><span>早付要自筹的钱 / 提前天数</span><b id=\"ap-need\">—</b></li>\n      <li><span>为早付而借钱的利息</span><b id=\"ap-int\">—</b></li>\n      <li><span>早付净赚</span><b id=\"ap-net\">—</b></li>\n      <li><span>临界资金成本率（高于它就别早付）</span><b id=\"ap-crit\">—</b></li>\n      <li><span>结论</span><b id=\"ap-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>资金成本</th><th>这几天利息</th><th>净收益</th><th>该不该早付</th></tr></thead>\n        <tbody id=\"ap-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"ap-note\"></p>\n  </div>\n    </div>\n  </section>\n","payage":"  <section class=\"panel\" id=\"panel-payage\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（应付明细按账龄分档）</h2>\n    <label class=\"f\">\n      <span>0–30 天应付（元）</span>\n      <input id=\"pg-a1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"120000\">\n    </label>\n    <label class=\"f\">\n      <span>31–60 天应付（元）</span>\n      <input id=\"pg-a2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"80000\">\n    </label>\n    <label class=\"f\">\n      <span>61–90 天应付（元）</span>\n      <input id=\"pg-a3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"50000\">\n    </label>\n    <label class=\"f\">\n      <span>90 天以上应付（元）</span>\n      <input id=\"pg-a4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"30000\">\n    </label>\n    <label class=\"f\">\n      <span>合同约定信用期（天）</span>\n      <input id=\"pg-term\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"60\">\n    </label>\n    <label class=\"f\">\n      <span>月均采购额（元）</span>\n      <input id=\"pg-buy\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\">\n    </label>\n    <label class=\"f\">\n      <span>资金年化成本（%）</span>\n      <input id=\"pg-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"6\">\n    </label>\n    <em>账龄按「发票日到今天的间隔」分档；信用期填合同里写的付款期限，没有合同就填行业惯例</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">应付账款余额合计</span><strong id=\"pg-total\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>加权平均账龄</span><b id=\"pg-wavg\">—</b></li>\n      <li><span>超过信用期的金额 / 占比</span><b id=\"pg-over\">—</b></li>\n      <li><span>其中 90 天以上（高风险）</span><b id=\"pg-over90\">—</b></li>\n      <li><span>应付周转天数（余额 ÷ 日均采购）</span><b id=\"pg-days\">—</b></li>\n      <li><span>无偿占用供应商资金的价值</span><b id=\"pg-value\">—</b></li>\n      <li><span>账期再加 30 天能多省</span><b id=\"pg-extend\">—</b></li>\n      <li><span>一次付清需要多少现金</span><b id=\"pg-cash\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>账龄档</th><th>金额</th><th>占比</th><th>状态</th></tr></thead>\n        <tbody id=\"pg-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"pg-note\"></p>\n  </div>\n    </div>\n  </section>\n","invoice":"  <section class=\"panel\" id=\"panel-invoice\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（单个合同 / 客户）</h2>\n    <label class=\"f\">\n      <span>合同总金额（含税，元）</span>\n      <input id=\"iv-contract\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1130000\">\n    </label>\n    <label class=\"f\">\n      <span>已开票金额（含税，元）</span>\n      <input id=\"iv-issued\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"678000\">\n    </label>\n    <label class=\"f\">\n      <span>已收款金额（含税，元）</span>\n      <input id=\"iv-received\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"452000\">\n    </label>\n    <label class=\"f\">\n      <span>增值税税率（%）</span>\n      <input id=\"iv-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"13\">\n    </label>\n    <label class=\"f\">\n      <span>其中已逾期未收（元）</span>\n      <input id=\"iv-overdue\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"150000\">\n    </label>\n    <label class=\"f\">\n      <span>逾期平均天数（天）</span>\n      <input id=\"iv-days\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"45\">\n    </label>\n    <label class=\"f\">\n      <span>合同约定日罚息（万分之）</span>\n      <input id=\"iv-penalty\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"5\">\n    </label>\n    <em>金额一律填含税数；合同分期开票的，一单一条，按月汇总看进度</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">待开票金额（含税）</span><strong id=\"iv-left\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>开票进度（占合同）</span><b id=\"iv-ipct\">—</b></li>\n      <li><span>回款进度（占合同）</span><b id=\"iv-rpct\">—</b></li>\n      <li><span>已开票：不含税 / 销项税额</span><b id=\"iv-issued-tax\">—</b></li>\n      <li><span>待开票：不含税 / 应缴销项税</span><b id=\"iv-left-tax\">—</b></li>\n      <li><span>应收余额（已开票未收）</span><b id=\"iv-ar\">—</b></li>\n      <li><span>其中逾期 / 占应收</span><b id=\"iv-over\">—</b></li>\n      <li><span>按合同可主张罚息</span><b id=\"iv-pen\">—</b></li>\n      <li><span>最终要收回的合计</span><b id=\"iv-all\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>环节</th><th>含税</th><th>不含税</th><th>税额</th></tr></thead>\n        <tbody id=\"iv-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"iv-note\"></p>\n  </div>\n    </div>\n  </section>\n","deadstock":"  <section class=\"panel\" id=\"panel-deadstock\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（一批呆滞库存怎么办）</h2>\n    <label class=\"f\"><span>呆滞数量（件）</span>\n      <input id=\"ds-q\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"10\" value=\"1000\"></label>\n    <label class=\"f\"><span>单位成本（元，账面）</span>\n      <input id=\"ds-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"120\"></label>\n    <label class=\"f\"><span>原价（元/件，不含税）</span>\n      <input id=\"ds-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"150\"></label>\n    <label class=\"f\"><span>按原价在一年内卖掉的概率（%）</span>\n      <input id=\"ds-prob\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"30\"></label>\n    <label class=\"f\"><span>仓储保管费（元/件·年）</span>\n      <input id=\"ds-store\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"12\"></label>\n    <label class=\"f\"><span>降价清仓价（元/件，不含税）</span>\n      <input id=\"ds-cut\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"60\"></label>\n    <label class=\"f\"><span>报废处理费（元/件）</span>\n      <input id=\"ds-scrap\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"5\"></label>\n    <label class=\"f\"><span>报废残值回收（元/件）</span>\n      <input id=\"ds-val\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"3\"></label>\n    <em>单位成本是沉没成本，决策只看「从现在往后还能拿回多少」</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">清仓比继续等 多回收</span><strong id=\"ds-extra\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>方案 A：继续等原价（每件净回收）</span><b id=\"ds-a\">—</b></li>\n      <li><span>方案 B：降价清仓（每件净回收）</span><b id=\"ds-b\">—</b></li>\n      <li><span>方案 C：直接报废（每件净回收）</span><b id=\"ds-c\">—</b></li>\n      <li><span>清仓的临界售价（低于它不如继续等）</span><b id=\"ds-crit\">—</b></li>\n      <li><span>清仓总回收 / 与账面比</span><b id=\"ds-total\">—</b></li>\n      <li><span>继续等一年的仓储费</span><b id=\"ds-storeamt\">—</b></li>\n      <li><span>保守结论</span><b id=\"ds-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>清仓价</th><th>总回收</th><th>比继续等多</th><th>该不该清</th></tr></thead>\n        <tbody id=\"ds-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"ds-note\"></p>\n  </div>\n    </div>\n  </section>\n","collect":"  <section class=\"panel\" id=\"panel-collect\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（4 笔逾期应收，金额 / 逾期天数）</h2>\n    <label class=\"f\"><span>客户 A</span>\n      <span class=\"row\"><input id=\"co-a1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"200000\">\n        <input id=\"co-d1\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"45\"></span></label>\n    <label class=\"f\"><span>客户 B</span>\n      <span class=\"row\"><input id=\"co-a2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"120000\">\n        <input id=\"co-d2\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"120\"></span></label>\n    <label class=\"f\"><span>客户 C</span>\n      <span class=\"row\"><input id=\"co-a3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"80000\">\n        <input id=\"co-d3\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"200\"></span></label>\n    <label class=\"f\"><span>客户 D</span>\n      <span class=\"row\"><input id=\"co-a4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"50000\">\n        <input id=\"co-d4\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"400\"></span></label>\n    <label class=\"f\"><span>资金年化成本（%）</span>\n      <input id=\"co-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"6\"></label>\n    <em>每行左边填逾期金额、右边填已逾期天数；排序按「金额 × 天数」打分</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">逾期应收合计</span><strong id=\"co-total\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>加权平均逾期天数</span><b id=\"co-wavg\">—</b></li>\n      <li><span>这些钱一年的利息成本</span><b id=\"co-cost\">—</b></li>\n      <li><span>高风险（超 180 天）金额 / 占比</span><b id=\"co-high\">—</b></li>\n      <li><span>临近诉讼时效（超 3 年）</span><b id=\"co-limit\">—</b></li>\n      <li><span>最该先催的</span><b id=\"co-first\">—</b></li>\n      <li><span>建议动作</span><b id=\"co-act\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>客户</th><th>金额</th><th>逾期天数</th><th>紧迫度打分</th><th>动作</th></tr></thead>\n        <tbody id=\"co-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"co-note\"></p>\n  </div>\n    </div>\n  </section>\n","impair":"  <section class=\"panel\" id=\"panel-impair\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（存货跌价，按单个品类算一次）</h2>\n    <label class=\"f\"><span>账面成本（元）</span>\n      <input id=\"im-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1500000\"></label>\n    <label class=\"f\"><span>预计售价（不含税，元）</span>\n      <input id=\"im-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1400000\"></label>\n    <label class=\"f\"><span>至完工尚需投入（元）</span>\n      <input id=\"im-finish\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"0\"></label>\n    <label class=\"f\"><span>销售费用及相关税费（元）</span>\n      <input id=\"im-sell\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"120000\"></label>\n    <label class=\"f\"><span>已计提跌价准备（元）</span>\n      <input id=\"im-had\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"0\"></label>\n    <label class=\"f\"><span>之后售价回升到（不含税，元）</span>\n      <input id=\"im-up\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1450000\"></label>\n    <label class=\"f\"><span>企业所得税税率（%）</span>\n      <input id=\"im-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\"></label>\n    <em>可变现净值 = 预计售价 − 至完工尚需投入 − 销售费用及税费</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">本期应计提跌价准备</span><strong id=\"im-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>可变现净值（NRV）</span><b id=\"im-nrv\">—</b></li>\n      <li><span>成本 − NRV</span><b id=\"im-gap\">—</b></li>\n      <li><span>跌价率</span><b id=\"im-rate\">—</b></li>\n      <li><span>计提后账面价值</span><b id=\"im-after\">—</b></li>\n      <li><span>已计提（本次是补提/转回）</span><b id=\"im-hadout\">—</b></li>\n      <li><span>递延所得税资产（可确认）</span><b id=\"im-dta\">—</b></li>\n      <li><span>对当期所得税的影响</span><b id=\"im-taxeff\">—</b></li>\n      <li><span>售价回升后可转回</span><b id=\"im-back\">—</b></li>\n      <li><span>转回上限</span><b id=\"im-cap\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>金额</th><th>说明</th></tr></thead>\n        <tbody id=\"im-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"im-note\"></p>\n  </div>\n    </div>\n  </section>\n","eoq":"  <section class=\"panel\" id=\"panel-eoq\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（订货批量与安全库存）</h2>\n    <label class=\"f\"><span>年需求量（件）</span>\n      <input id=\"eoq-d\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"500\" value=\"12000\"></label>\n    <label class=\"f\"><span>每次订货成本（元/次）</span>\n      <input id=\"eoq-k\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"500\"></label>\n    <label class=\"f\"><span>单位年持有成本（元/件·年）</span>\n      <input id=\"eoq-h\" type=\"number\" inputmode=\"decimal\" min=\"0.01\" step=\"1\" value=\"12\"></label>\n    <label class=\"f\"><span>日均需求 / 需求标准差（件）</span>\n      <span class=\"row\"><input id=\"eoq-day\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"40\">\n        <input id=\"eoq-sd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"8\"></span></label>\n    <label class=\"f\"><span>采购提前期（天）</span>\n      <input id=\"eoq-lt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"5\"></label>\n    <label class=\"f\"><span>目标服务水平（%）</span>\n      <input id=\"eoq-svc\" type=\"number\" inputmode=\"decimal\" min=\"50\" max=\"99.9\" step=\"1\" value=\"95\"></label>\n    <label class=\"f\"><span>供应商最小起订量（件）</span>\n      <input id=\"eoq-moq\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"2000\"></label>\n    <em>口径：订货成本与持有成本之和最小时最省；安全库存只防「提前期内需求波动」，不防断供和涨价</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">经济订货批量</span><strong id=\"eoq-big\">—</strong><span class=\"unit\">件</span></div>\n    <ul class=\"kv\">\n      <li><span>年订货次数</span><b id=\"eoq-times\">—</b></li>\n      <li><span>订货间隔</span><b id=\"eoq-gap\">—</b></li>\n      <li><span>年相关总成本</span><b id=\"eoq-total\">—</b></li>\n      <li><span>其中：订货成本 / 持有成本</span><b id=\"eoq-split\">—</b></li>\n      <li><span>安全库存（z）</span><b id=\"eoq-ss\">—</b></li>\n      <li><span>再订货点</span><b id=\"eoq-rop\">—</b></li>\n      <li><span>平均库存</span><b id=\"eoq-avg\">—</b></li>\n      <li><span>按最小起订量 的成本增量</span><b id=\"eoq-moqgap\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>每次订货量</th><th>年订货次数</th><th>订货成本</th><th>持有成本</th><th>合计</th></tr></thead>\n        <tbody id=\"eoq-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"eoq-note\"></p>\n  </div>\n    </div>\n  </section>\n","ecl":"  <section class=\"panel\" id=\"panel-ecl\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（应收账款预期信用损失）</h2>\n    <label class=\"f\"><span>未到期金额（元）</span>\n      <input id=\"ecl-a1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"8000000\"></label>\n    <label class=\"f\"><span>逾期 1–90 天金额（元）</span>\n      <input id=\"ecl-a2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"1500000\"></label>\n    <label class=\"f\"><span>逾期 91–180 天金额（元）</span>\n      <input id=\"ecl-a3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"600000\"></label>\n    <label class=\"f\"><span>逾期 181–365 天金额（元）</span>\n      <input id=\"ecl-a4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"250000\"></label>\n    <label class=\"f\"><span>逾期 1 年以上金额（元）</span>\n      <input id=\"ecl-a5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50000\" value=\"150000\"></label>\n    <label class=\"f\"><span>各档违约率（%，按上同顺序）</span>\n      <span class=\"row\"><input id=\"ecl-r1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"0.5\">\n        <input id=\"ecl-r2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"2\">\n        <input id=\"ecl-r3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"8\"></span></label>\n    <label class=\"f\"><span>违约率（181–365 天 / 1 年以上，%）</span>\n      <span class=\"row\"><input id=\"ecl-r4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"25\">\n        <input id=\"ecl-r5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"60\"></span></label>\n    <label class=\"f\"><span>前瞻性调整（%，正数=再谨慎些）</span>\n      <input id=\"ecl-adj\" type=\"number\" inputmode=\"decimal\" step=\"5\" value=\"20\"></label>\n    <label class=\"f\"><span>期初已计提坏账准备（元）</span>\n      <input id=\"ecl-prev\" type=\"number\" inputmode=\"decimal\" step=\"10000\" value=\"80000\"></label>\n    <em>口径：预期信用损失按账龄组合分别乘违约率，再乘前瞻调整；不是「应收×一个统一个比例」</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">期末应计提坏账准备</span><strong id=\"ecl-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>应收账款合计</span><b id=\"ecl-total\">—</b></li>\n      <li><span>基础准备（未调整）</span><b id=\"ecl-base\">—</b></li>\n      <li><span>前瞻调整后</span><b id=\"ecl-adjv\">—</b></li>\n      <li><span>本期补提 / 冲回</span><b id=\"ecl-delta\">—</b></li>\n      <li><span>综合计提比例</span><b id=\"ecl-ratio\">—</b></li>\n      <li><span>信用减值损失影响</span><b id=\"ecl-loss\">—</b></li>\n      <li><span>税务口径提醒</span><b id=\"ecl-tax\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>账龄</th><th>金额</th><th>违约率</th><th>准备</th></tr></thead>\n        <tbody id=\"ecl-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"ecl-note\"></p>\n  </div>\n    </div>\n  </section>\n","custwin":"  <section class=\"panel\" id=\"panel-custwin\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（客户级盈利，三个客户／万元）</h2>\n    <label class=\"f\"><span>A 客户：收入 / 折扣% / 返利%</span>\n      <span class=\"row\"><input id=\"cwin-ra\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"500\">\n        <input id=\"cwin-da\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"3\">\n        <input id=\"cwin-ba\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"2\"></span></label>\n    <label class=\"f\"><span>A 客户：运费 / 服务成本 / 账期天数 / 毛利率%</span>\n      <span class=\"row\"><input id=\"cwin-fa\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"8\">\n        <input id=\"cwin-sa\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"10\">\n        <input id=\"cwin-ta\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"60\">\n        <input id=\"cwin-ga\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\"></span></label>\n    <label class=\"f\"><span>B 客户：收入 / 折扣% / 返利%</span>\n      <span class=\"row\"><input id=\"cwin-rb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"300\">\n        <input id=\"cwin-db\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"8\">\n        <input id=\"cwin-bb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"5\"></span></label>\n    <label class=\"f\"><span>B 客户：运费 / 服务成本 / 账期天数 / 毛利率%</span>\n      <span class=\"row\"><input id=\"cwin-fb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"15\">\n        <input id=\"cwin-sb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"20\">\n        <input id=\"cwin-tb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"120\">\n        <input id=\"cwin-gb\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\"></span></label>\n    <label class=\"f\"><span>C 客户：收入 / 折扣% / 返利%</span>\n      <span class=\"row\"><input id=\"cwin-rc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"200\">\n        <input id=\"cwin-dc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"0\">\n        <input id=\"cwin-bc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"0\"></span></label>\n    <label class=\"f\"><span>C 客户：运费 / 服务成本 / 账期天数 / 毛利率%</span>\n      <span class=\"row\"><input id=\"cwin-fc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"2\">\n        <input id=\"cwin-sc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"3\">\n        <input id=\"cwin-tc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"30\">\n        <input id=\"cwin-gc\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"30\"></span></label>\n    <label class=\"f\"><span>资金成本（年化 %）</span>\n      <input id=\"cwin-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"6\"></label>\n    <em>口径：毛利率是「定价前」的，客户要求的折扣、返利、运费、专属服务、账期占用都要从毛利里再扣一遍</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">净贡献最低的客户</span><strong id=\"cwin-big\">—</strong><span class=\"unit\">万元</span></div>\n    <ul class=\"kv\">\n      <li><span>最好 / 最差客户</span><b id=\"cwin-rank\">—</b></li>\n      <li><span>三客户净贡献合计</span><b id=\"cwin-total\">—</b></li>\n      <li><span>收入合计 / 综合净利率</span><b id=\"cwin-mix\">—</b></li>\n      <li><span>折扣 + 返利 合计吃掉</span><b id=\"cwin-cuts\">—</b></li>\n      <li><span>账期占用成本合计</span><b id=\"cwin-occ\">—</b></li>\n      <li><span>最差客户占用账期</span><b id=\"cwin-worst\">—</b></li>\n      <li><span>建议</span><b id=\"cwin-advice\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>客户</th><th>毛利</th><th>折扣+返利</th><th>运费+服务</th><th>占用成本</th><th>净贡献</th><th>净利率</th></tr></thead>\n        <tbody id=\"cwin-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"cwin-note\"></p>\n  </div>\n    </div>\n  </section>\n","svc":"  <section class=\"panel\" id=\"panel-svc\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（安全库存与服务水平）</h2>\n    <label class=\"f\"><span>日均需求（件）</span>\n      <input id=\"svc-d\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"100\"></label>\n    <label class=\"f\"><span>日需求标准差（件）</span>\n      <input id=\"svc-sd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"30\"></label>\n    <label class=\"f\"><span>补货提前期（天）</span>\n      <input id=\"svc-lt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"7\"></label>\n    <label class=\"f\"><span>目标服务水平（%）</span>\n      <input id=\"svc-sl\" type=\"number\" inputmode=\"decimal\" min=\"50\" max=\"99.9\" step=\"1\" value=\"95\"></label>\n    <label class=\"f\"><span>年需求量（件）</span>\n      <input id=\"svc-ann\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1000\" value=\"36500\"></label>\n    <label class=\"f\"><span>每次订货量（件）</span>\n      <input id=\"svc-lot\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"100\" value=\"1000\"></label>\n    <label class=\"f\"><span>单件年持有成本（元）</span>\n      <input id=\"svc-hold\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"12\"></label>\n    <label class=\"f\"><span>一次缺货的代价（元）</span>\n      <input id=\"svc-out\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"500\"></label>\n    <em>口径：安全库存抵的是「提前期内需求波动」，提前期越长、波动越大，需要的缓冲越多</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">安全库存</span><strong id=\"svc-big\">—</strong><span class=\"unit\">件</span></div>\n    <ul class=\"kv\">\n      <li><span>z 值</span><b id=\"svc-z\">—</b></li>\n      <li><span>提前期内需求 / 标准差</span><b id=\"svc-ltd\">—</b></li>\n      <li><span>再订货点</span><b id=\"svc-rop\">—</b></li>\n      <li><span>年持有成本 / 年缺货成本</span><b id=\"svc-cost\">—</b></li>\n      <li><span>年总成本（持有＋缺货）</span><b id=\"svc-total\">—</b></li>\n      <li><span>最省的服务水平</span><b id=\"svc-best\">—</b></li>\n      <li><span>服务水平从 95% 提到 99%</span><b id=\"svc-up\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>服务水平</th><th>安全库存</th><th>再订货点</th><th>持有成本</th><th>缺货成本</th><th>合计</th></tr></thead>\n        <tbody id=\"svc-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"svc-note\"></p>\n  </div>\n    </div>\n  </section>\n","supplier":"  <section class=\"panel\" id=\"panel-supplier\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（供应商集中度）</h2>\n    <label class=\"f\"><span>年度采购总额（万元）</span>\n      <input id=\"spl-tot\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"100\" value=\"5000\"></label>\n    <label class=\"f\"><span>第一大供应商采购额（万元）</span>\n      <input id=\"spl-t1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"1500\"></label>\n    <label class=\"f\"><span>第二 / 第三（万元）</span>\n      <span class=\"row\"><input id=\"spl-t2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"1000\">\n        <input id=\"spl-t3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"700\"></span></label>\n    <label class=\"f\"><span>第四 / 第五（万元）</span>\n      <span class=\"row\"><input id=\"spl-t4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"400\">\n        <input id=\"spl-t5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"300\"></span></label>\n    <label class=\"f\"><span>断供后切换新供应商所需天数</span>\n      <input id=\"spl-days\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"15\" value=\"90\"></label>\n    <label class=\"f\"><span>停产一天的毛利损失（万元）</span>\n      <input id=\"spl-loss\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"8\"></label>\n    <em>口径：集中度看两件事——前五家占比（结构）与第一大占比（单点风险）；HHI 是各家份额平方和，越集中越大</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">前五大供应商采购占比</span><strong id=\"spl-big\">—</strong><span class=\"unit\">%</span></div>\n    <ul class=\"kv\">\n      <li><span>第一大供应商占比</span><b id=\"spl-top1\">—</b></li>\n      <li><span>前五家采购额合计</span><b id=\"spl-sum\">—</b></li>\n      <li><span>集中度指数 HHI</span><b id=\"spl-hhi\">—</b></li>\n      <li><span>集中度判断</span><b id=\"spl-level\">—</b></li>\n      <li><span>第一大断供影响采购额</span><b id=\"spl-gap\">—</b></li>\n      <li><span>断供期毛利损失（估算）</span><b id=\"spl-cost\">—</b></li>\n      <li><span>建议</span><b id=\"spl-advice\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>供应商</th><th>采购额（万元）</th><th>占比</th><th>累计占比</th></tr></thead>\n        <tbody id=\"spl-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"spl-note\"></p>\n  </div>\n    </div>\n  </section>\n","invstock":"  <section class=\"panel\" id=\"panel-invstock\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（存货与库龄）</h2>\n    <label class=\"f\"><span>期初存货（元）</span>\n      <input id=\"sk-beg\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1200000\"></label>\n    <label class=\"f\"><span>期末存货（元）</span>\n      <input id=\"sk-end\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1500000\"></label>\n    <label class=\"f\"><span>本期营业成本（元，算周转用）</span>\n      <input id=\"sk-cogs\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"9000000\"></label>\n    <label class=\"f\"><span>库龄 0–30 天（元）</span>\n      <input id=\"sk-a1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"600000\"></label>\n    <label class=\"f\"><span>库龄 31–90 天（元）</span>\n      <input id=\"sk-a2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\"></label>\n    <label class=\"f\"><span>库龄 91–180 天（元）</span>\n      <input id=\"sk-a3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\"></label>\n    <label class=\"f\"><span>库龄 180 天以上（元）</span>\n      <input id=\"sk-a4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"100000\"></label>\n    <label class=\"f\"><span>91–180 天建议计提比例（%）</span>\n      <input id=\"sk-r3\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"10\"></label>\n    <label class=\"f\"><span>180 天以上建议计提比例（%）</span>\n      <input id=\"sk-r4\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"50\"></label>\n    <label class=\"f\"><span>一年按多少天算（周转天数口径）</span>\n      <input id=\"sk-days\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"366\" step=\"1\" value=\"365\"></label>\n    <em>库龄四档金额合计应等于期末存货；计提比例是会计估计，按自家呆滞风险定，不是法定数</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">存货周转天数</span><strong id=\"sk-tdays\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>存货周转率（次）</span><b id=\"sk-turn\">—</b></li>\n      <li><span>平均存货</span><b id=\"sk-avg\">—</b></li>\n      <li><span>库龄四档合计</span><b id=\"sk-total\">—</b></li>\n      <li><span>呆滞金额（91 天以上）/ 占比</span><b id=\"sk-stale\">—</b></li>\n      <li><span>建议存货跌价准备</span><b id=\"sk-prov\">—</b></li>\n      <li><span>周转天数缩短 10 天可释放现金</span><b id=\"sk-release\">—</b></li>\n      <li><span>期末存货相当于多少天的成本</span><b id=\"sk-cover\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>库龄档</th><th>金额</th><th>占比</th><th>计提比例</th><th>建议准备</th></tr></thead>\n        <tbody id=\"sk-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"sk-note\"></p>\n  </div>\n    </div>\n  </section>\n","tieout":"  <section class=\"panel\" id=\"panel-tieout\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（双向对账，单位：元）</h2>\n    <label class=\"f\"><span>我方账面应收（应付）余额</span>\n      <input id=\"tie-a\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"226000\"></label>\n    <label class=\"f\"><span>对方账面余额（对账单）</span>\n      <input id=\"tie-b\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"240000\"></label>\n    <label class=\"f\"><span>我方漏记、应加上（已开票对方未到票等）</span>\n      <input id=\"tie-c\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"8000\"></label>\n    <label class=\"f\"><span>对方已付在途、我方未收到</span>\n      <input id=\"tie-d\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"10000\"></label>\n    <label class=\"f\"><span>我方重复记账、应减去</span>\n      <input id=\"tie-e\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"4000\"></label>\n    <label class=\"f\"><span>对方未入账、应减去（对方侧）</span>\n      <input id=\"tie-f\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"0\"></label>\n    <em>四个调节项按「谁少记了」填：我方少记就加到我方，对方少记就从对方减</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">原始差额（我方 − 对方）</span><strong id=\"tie-raw\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>我方调节后</span><b id=\"tie-mine\">—</b></li>\n      <li><span>对方调节后</span><b id=\"tie-theirs\">—</b></li>\n      <li><span>调节后差额（0 = 平）</span><b id=\"tie-diff\">—</b></li>\n      <li><span>已解释的差额</span><b id=\"tie-expl\">—</b></li>\n      <li><span>结论</span><b id=\"tie-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>调节项</th><th>调节哪边</th><th>方向</th><th>金额</th></tr></thead>\n        <tbody id=\"tie-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"tie-note\"></p>\n  </div>\n    </div>\n  </section>\n","creditpolicy":"  <section class=\"panel\" id=\"panel-creditpolicy\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>年赊销额</span>\n      <input id=\"cpl-sales\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"12000000\">\n    </label>\n    <label class=\"f\">\n      <span>变动成本率（%）</span>\n      <input id=\"cpl-vc\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"70\">\n      <em>边际贡献率 = 1 − 变动成本率</em>\n    </label>\n    <span class=\"row\">\n      <input id=\"cpl-d1\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"60\" aria-label=\"现政策账期\">\n      <input id=\"cpl-b1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2\" aria-label=\"现政策坏账率\">\n    </span>\n    <p class=\"hint\">左：现政策账期（天），右：现政策坏账率（%）</p>\n    <span class=\"row\">\n      <input id=\"cpl-d2\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"30\" aria-label=\"新政策账期\">\n      <input id=\"cpl-b2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"1\" aria-label=\"新政策坏账率\">\n    </span>\n    <p class=\"hint\">左：新政策账期（天），右：新政策坏账率（%）</p>\n    <span class=\"row\">\n      <input id=\"cpl-disc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2\" aria-label=\"现金折扣率\">\n      <input id=\"cpl-dd\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"10\" aria-label=\"折扣付款期\">\n    </span>\n    <p class=\"hint\">左：现金折扣率（%），右：折扣付款期（天）</p>\n    <span class=\"row\">\n      <input id=\"cpl-take\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"60\" aria-label=\"享受折扣客户比例\">\n      <input id=\"cpl-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"5\" aria-label=\"资金成本\">\n    </span>\n    <p class=\"hint\">左：享受折扣的客户占比（%），右：资金成本（%）</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">新政策比现政策多赚</span><strong id=\"cpl-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>现政策：占用 / 机会成本</span><b id=\"cpl-o1\">—</b></li>\n      <li><span>现政策：坏账 / 净贡献</span><b id=\"cpl-n1\">—</b></li>\n      <li><span>新政策：平均收款天数</span><b id=\"cpl-ad\">—</b></li>\n      <li><span>新政策：占用 / 机会成本</span><b id=\"cpl-o2\">—</b></li>\n      <li><span>新政策：折扣成本 / 坏账</span><b id=\"cpl-n2\">—</b></li>\n      <li><span>新政策：净贡献</span><b id=\"cpl-n3\">—</b></li>\n      <li><span>折扣折成年化</span><b id=\"cpl-ann\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"cpl-note\"></p>\n  </div>\n    </div>\n  </section>\n","invfund":"  <section class=\"panel\" id=\"panel-invfund\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>年营业成本</span>\n      <input id=\"ifw-cogs\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"9000000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"ifw-d1\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"90\" aria-label=\"当前周转天数\">\n      <input id=\"ifw-d2\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"60\" aria-label=\"目标周转天数\">\n    </span>\n    <p class=\"hint\">左：当前存货周转天数，右：目标周转天数</p>\n    <span class=\"row\">\n      <input id=\"ifw-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"5\" aria-label=\"资金成本\">\n      <input id=\"ifw-hold\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2\" aria-label=\"仓储损耗率\">\n    </span>\n    <p class=\"hint\">左：资金成本（%），右：仓储/保管/损耗率（% 占存货金额，按年）</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">可释放资金</span><strong id=\"ifw-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>当前平均存货 / 周转次数</span><b id=\"ifw-now\">—</b></li>\n      <li><span>目标平均存货 / 周转次数</span><b id=\"ifw-tgt\">—</b></li>\n      <li><span>资金成本节省</span><b id=\"ifw-s1\">—</b></li>\n      <li><span>仓储损耗节省</span><b id=\"ifw-s2\">—</b></li>\n      <li><span>合计年化收益</span><b id=\"ifw-sum\">—</b></li>\n      <li><span>相当于营业成本</span><b id=\"ifw-rel\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"ifw-note\"></p>\n  </div>\n    </div>\n  </section>\n","invvar":"  <section class=\"panel\" id=\"panel-invvar\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：6 期盘点差异</h2>\n        <label class=\"f\"><span>平均库存金额</span><input id=\"ivv-inv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"2000000\"></label>\n        <span class=\"row\">\n          <label class=\"f\"><span>第 1 期盘亏</span><input id=\"ivv-d1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"12000\"></label>\n          <label class=\"f\"><span>第 2 期盘亏</span><input id=\"ivv-d2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"9500\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>第 3 期盘亏</span><input id=\"ivv-d3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"15000\"></label>\n          <label class=\"f\"><span>第 4 期盘亏</span><input id=\"ivv-d4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"8200\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>第 5 期盘亏</span><input id=\"ivv-d5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"18000\"></label>\n          <label class=\"f\"><span>第 6 期盘亏</span><input id=\"ivv-d6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"21000\"></label>\n        </span>\n        <label class=\"f\"><span>差异率警戒线 %</span><input id=\"ivv-line\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"0.8\"></label>\n        <em>口径：差异率 = 盘亏 ÷ 平均库存。单期数字有偶然性，看趋势：最近 3 期均值比前 3 期高，说明账实管理水平在变差，要查收发存流程、出入库单据与盘点方法。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果：差异率趋势预警</h2>\n        <div class=\"big\"><span class=\"k\">平均差异率</span><strong id=\"ivv-big\">—</strong><span class=\"unit\">%</span></div>\n        <ul class=\"kv\">\n          <li><span>累计盘亏</span><b id=\"ivv-total\">—</b></li>\n          <li><span>前 3 期 vs 后 3 期均值</span><b id=\"ivv-trend\">—</b></li>\n          <li><span>趋势判定</span><b id=\"ivv-verdict\">—</b></li>\n          <li><span>超警戒线期数</span><b id=\"ivv-over\">—</b></li>\n        </ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">期次</th><th>盘亏</th><th>差异率</th><th class=\"tal\">是否超线</th></tr></thead>\n            <tbody id=\"ivv-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"ivv-note\"></p>\n      </div>\n    </div>\n  </section>\n","aroverdue":"  <section class=\"panel\" id=\"panel-aroverdue\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入 · 回款记录（4 笔）</h2>\n        <span class=\"row\"><label class=\"f\"><span>第1笔 金额</span><input id=\"arv-a1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"300000\"></label><label class=\"f\"><span>信用期(天)</span><input id=\"arv-c1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"30\"></label><label class=\"f\"><span>实际回款(天)</span><input id=\"arv-d1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"25\"></label></span>\n        <span class=\"row\"><label class=\"f\"><span>第2笔 金额</span><input id=\"arv-a2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"200000\"></label><label class=\"f\"><span>信用期(天)</span><input id=\"arv-c2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"30\"></label><label class=\"f\"><span>实际回款(天)</span><input id=\"arv-d2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"40\"></label></span>\n        <span class=\"row\"><label class=\"f\"><span>第3笔 金额</span><input id=\"arv-a3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"150000\"></label><label class=\"f\"><span>信用期(天)</span><input id=\"arv-c3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"60\"></label><label class=\"f\"><span>实际回款(天)</span><input id=\"arv-d3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"75\"></label></span>\n        <span class=\"row\"><label class=\"f\"><span>第4笔 金额</span><input id=\"arv-a4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"100000\"></label><label class=\"f\"><span>信用期(天)</span><input id=\"arv-c4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"45\"></label><label class=\"f\"><span>实际回款(天)</span><input id=\"arv-d4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"90\"></label></span>\n        <label class=\"f\"><span>资金成本(年化%)</span><input id=\"arv-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"6\"></label>\n        <em>口径：逾期天数 = 实际回款天数 − 信用期（负数算按期）；加权按金额。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果</h2>\n        <div class=\"big\"><span class=\"k\">逾期金额占比</span><strong id=\"arv-big\">—</strong><span class=\"unit\">%</span></div>\n        <ul class=\"kv\">\n          <li><span>应收总额 / 逾期金额</span><b id=\"arv-k1\">—</b></li>\n          <li><span>加权平均逾期天数</span><b id=\"arv-k2\">—</b></li>\n          <li><span>加权回款天数（DSO）</span><b id=\"arv-k3\">—</b></li>\n          <li><span>加权平均信用期</span><b id=\"arv-k4\">—</b></li>\n          <li><span>逾期资金成本</span><b id=\"arv-k5\">—</b></li>\n          <li><span>最该先催的一笔</span><b id=\"arv-k6\">—</b></li>\n        </ul>\n        <div class=\"tablebox\"><table><thead><tr><th>笔</th><th>金额</th><th>信用期</th><th>实际</th><th>逾期</th><th>判定</th></tr></thead><tbody id=\"arv-body\"></tbody></table></div>\n        <p class=\"hint\" id=\"arv-note\"></p>\n      </div>\n    </div>\n  </section>\n","payterms":"  <section class=\"panel\" id=\"panel-payterms\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入 · 供应商付款条款</h2>\n        <label class=\"f\"><span>采购金额</span><input id=\"ppt-amount\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n        <label class=\"f\"><span>标准账期(天)</span><input id=\"ppt-terms\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"30\"></label>\n        <span class=\"row\"><label class=\"f\"><span>折扣率(%)</span><input id=\"ppt-discount\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"2\"></label><label class=\"f\"><span>折扣期(天)</span><input id=\"ppt-discterms\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"10\"></label></span>\n        <label class=\"f\"><span>可延期至(天，无折扣)</span><input id=\"ppt-extend\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"60\"></label>\n        <label class=\"f\"><span>资金成本(年化%)</span><input id=\"ppt-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"6\"></label>\n        <em>口径：在「拿折扣」与「拖到账期/延期」之间选净收益大的；延期无折扣。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果</h2>\n        <div class=\"big\"><span class=\"k\">放弃折扣的年化成本</span><strong id=\"ppt-big\">—</strong><span class=\"unit\">%</span></div>\n        <ul class=\"kv\">\n          <li><span>折扣金额</span><b id=\"ppt-k1\">—</b></li>\n          <li><span>拖满 20 天的资金收益</span><b id=\"ppt-k2\">—</b></li>\n          <li><span>拿折扣净赚</span><b id=\"ppt-k3\">—</b></li>\n          <li><span>再延期 30 天多省利息</span><b id=\"ppt-k4\">—</b></li>\n          <li><span>最优策略</span><b id=\"ppt-k5\">—</b></li>\n        </ul>\n        <p class=\"hint\" id=\"ppt-note\"></p>\n      </div>\n    </div>\n  </section>\n","fxar":"  <section class=\"panel\" id=\"panel-fxar\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入 · 外币应收（月末重估）</h2>\n        <span class=\"row\"><label class=\"f\"><span>美元余额</span><input id=\"fxr-a1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"500000\"></label><label class=\"f\"><span>记账汇率</span><input id=\"fxr-r1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"7.10\"></label><label class=\"f\"><span>期末汇率</span><input id=\"fxr-e1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"7.25\"></label></span>\n        <span class=\"row\"><label class=\"f\"><span>欧元余额</span><input id=\"fxr-a2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"300000\"></label><label class=\"f\"><span>记账汇率</span><input id=\"fxr-r2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"7.70\"></label><label class=\"f\"><span>期末汇率</span><input id=\"fxr-e2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"7.55\"></label></span>\n        <span class=\"row\"><label class=\"f\"><span>港币余额</span><input id=\"fxr-a3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"1000000\"></label><label class=\"f\"><span>记账汇率</span><input id=\"fxr-r3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.001\" value=\"0.91\"></label><label class=\"f\"><span>期末汇率</span><input id=\"fxr-e3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.001\" value=\"0.92\"></label></span>\n        <span class=\"row\"><label class=\"f\"><span>日元余额</span><input id=\"fxr-a4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"20000000\"></label><label class=\"f\"><span>记账汇率</span><input id=\"fxr-r4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.001\" value=\"0.047\"></label><label class=\"f\"><span>期末汇率</span><input id=\"fxr-e4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.001\" value=\"0.046\"></label></span>\n        <em>口径：汇兑损益 = 余额 ×（期末汇率 − 记账汇率）；正为收益、负为损失，属未实现损益。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果</h2>\n        <div class=\"big\"><span class=\"k\">汇兑净损益</span><strong id=\"fxr-big\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>期末应收折人民币</span><b id=\"fxr-k1\">—</b></li>\n          <li><span>记账人民币</span><b id=\"fxr-k2\">—</b></li>\n          <li><span>美元 / 欧元</span><b id=\"fxr-k3\">—</b></li>\n          <li><span>港币 / 日元</span><b id=\"fxr-k4\">—</b></li>\n        </ul>\n        <div class=\"tablebox\"><table><thead><tr><th>币种</th><th>余额</th><th>记账</th><th>期末</th><th>损益</th></tr></thead><tbody id=\"fxr-body\"></tbody></table></div>\n        <p class=\"hint\" id=\"fxr-note\"></p>\n      </div>\n    </div>\n  </section>\n","invorder":"  <section class=\"panel\" id=\"panel-invorder\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>存货库龄与订货联动</h2>\n        <label class=\"f\"><span>未来需求（件）</span><input id=\"ivo-demand\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"35000\" class=\"num\"></label>\n        <span class=\"row\"><label class=\"f\"><span>安全库存（件）</span><input id=\"ivo-safety\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"5000\" class=\"num\"></label><label class=\"f\"><span>单价（元/件）</span><input id=\"ivo-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"80\" class=\"num\"></label></span>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th>库龄段</th><th>现有数量（件）</th><th>良品率（%）</th></tr></thead>\n            <tbody>\n              <tr><td>90 天以内</td><td><input id=\"ivo-s1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"25000\" class=\"num\"></td><td><input id=\"ivo-p1\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"100\" class=\"num\"></td></tr>\n              <tr><td>91–180 天</td><td><input id=\"ivo-s2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"10000\" class=\"num\"></td><td><input id=\"ivo-p2\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"95\" class=\"num\"></td></tr>\n              <tr><td>181 天以上</td><td><input id=\"ivo-s3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"5000\" class=\"num\"></td><td><input id=\"ivo-p3\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"70\" class=\"num\"></td></tr>\n            </tbody>\n          </table>\n        </div>\n        <em>先算「现有库存能出多少良品」，再决定还要订多少。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果</h2>\n        <div class=\"big\"><span class=\"k\">建议订货量</span><strong id=\"ivo-order\">—</strong><span class=\"unit\">件</span></div>\n        <ul class=\"kv\">\n          <li><span>现有库存可用良品</span><b id=\"ivo-usable\">—</b></li>\n          <li><span>订货金额</span><b id=\"ivo-amt\">—</b></li>\n          <li><span>不良品数量</span><b id=\"ivo-bad\">—</b></li>\n          <li><span>不良品潜在损失</span><b id=\"ivo-loss\">—</b></li>\n          <li><span>181 天以上占比</span><b id=\"ivo-s3share\">—</b></li>\n          <li><span>91 天以上占比</span><b id=\"ivo-s23share\">—</b></li>\n          <li><span>耗用顺序建议</span><b id=\"ivo-advice\">—</b></li>\n        </ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th>库龄段</th><th>数量</th><th>良品率</th><th>可用良品</th><th>占比</th></tr></thead>\n            <tbody id=\"ivo-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"ivo-note\"></p>\n      </div>\n    </div>\n  </section>\n","creditterm":"  <section class=\"panel\" id=\"panel-creditterm\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>销售回款账期政策对比</h2>\n        <label class=\"f\"><span>年销售额（元）</span><input id=\"ct-sales\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"10000000\" class=\"num\"></label>\n        <label class=\"f\"><span>变动成本率（%）</span><input id=\"ct-vc\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"60\" class=\"num\"></label>\n        <label class=\"f\"><span>资金成本（%）</span><input id=\"ct-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"6\" class=\"num\"></label>\n        <span class=\"row\"><label class=\"f\"><span>30 天账期坏账率（%）</span><input id=\"ct-bad30\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"0.1\" value=\"1\" class=\"num\"></label><label class=\"f\"><span>60 天账期坏账率（%）</span><input id=\"ct-bad60\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"0.1\" value=\"2.5\" class=\"num\"></label></span>\n        <em>假设账期越长销量不变，只比较账期占用资金成本与坏账损失。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果</h2>\n        <div class=\"big\"><span class=\"k\">最优方案净利</span><strong id=\"ct-best\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>现款净利</span><b id=\"ct-ni0\">—</b></li>\n          <li><span>30 天账期净利</span><b id=\"ct-ni30\">—</b></li>\n          <li><span>60 天账期净利</span><b id=\"ct-ni60\">—</b></li>\n          <li><span>30 天占用资金</span><b id=\"ct-occ30\">—</b></li>\n          <li><span>60 天占用资金</span><b id=\"ct-occ60\">—</b></li>\n          <li><span>30 天比现款少赚</span><b id=\"ct-diff\">—</b></li>\n          <li><span>最优选择</span><b id=\"ct-pick\">—</b></li>\n        </ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th>方案</th><th>资金占用</th><th>资金成本</th><th>坏账</th><th>净利</th></tr></thead>\n            <tbody id=\"ct-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"ct-note\"></p>\n      </div>\n    </div>\n  </section>\n"};
export default { aging: calcAging, apterms: calcApTerms, payage: calcPayAge, invoice: calcInvoice, invstock: calcInvStock, tieout: calcTieOut, deadstock: calcDeadStock, collect: calcCollect, impair: calcImpair, eoq: calcEoq, ecl: calcEcl, svc: calcSvc, supplier: calcSupplier, custwin: calcCustWin, creditpolicy: calcCreditPolicy, invfund: calcInvFund, invvar: calcInvVar, aroverdue: calcAroverdue, payterms: calcPayterms, fxar: calcFxar, invorder: calcInvorder, creditterm: calcCreditterm };
