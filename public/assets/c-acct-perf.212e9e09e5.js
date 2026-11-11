/* 自动生成，勿手改：acct-perf 分类模块（点开才下载） */
const { $, BUILD_TAG, CAT_KEY, CAT_LABEL, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, EDITED, ERR_BOX, FAV_KEY, FIELDS, FIRST_ACTIVATE, KEY, LAST_KEY, MONTH_CATS, MONTH_TABLE, NEXT_OF, PALETTE_EL, PENDING_PARAMS, PRE_KEY, QUOTA_WARNED, RECENT_KEY, SAVE_TIMER, SEARCH_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, TOAST_EL, UNITS, WF_AUTO_IDX, WF_AUTO_LIST, WF_AUTO_TIMER, WF_DONE, WF_KEY, WF_MAN, WF_MAN_KEY, WF_ROLE_KEY, XL_ROWS, YEAR_TABLE, _onPanels, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, buildTabBadges, calcLoan, calcMap, clearWfMan, closePalette, cmpTabName, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, diagText, dlJson, doPrint, drawMonthCats, drawMonthStack, drawReportCharts, drawRpMini, drawnMonthlyChart, drawnYearChart, enhanceNums, enhancePanelUi, ensureChunk, evalExpr, favList, fillCmpMod, fillMonthGrid, fillUnits, flash, flushParams, flushSave, fmt, fmtAt, fmtDate, fx, gauss, getWfDone, getWfMan, hashTarget, isFav, lastName, leftAfter, linkTo, loadCmpA, loadSnaps, loadWfDone, loadWfMan, loanRows, makeSnap, markBadInputs, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numBlur, numFocus, numInput, numKey, numOf, openPalette, palKey, panelEls, panelParams, parseAmounts, parseDate, parseNum, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, prePanels, presets, printCover, pushRecent, pushSearch, quickOf, rateOf, readJsonFile, readMonthGrid, recentList, recordWf, refreshCounts, refreshTableTools, refreshTrackMods, refreshWfBadge, renderLoanTable, renderNext, renderPalette, renderPresets, renderSearchHist, renderSnapCompare, renderSnapList, renderTrack, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, scrollResultIfDeepLink, searchHist, setCat, setSub, setTheme, showErrorBox, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tabCatLabel, tap, taxBy, toast, toggleWfMan, trimNum, unitFor, updShown, wfAutoStop, wfAutoWalk, wfManSave, wfSave, yuan, zOf } = window.FC;

  function calcBreakEven() {
    var price = Math.max(0, num($("be-price"), 0));
    var vc = Math.max(0, num($("be-vc"), 0));
    var fc = Math.max(0, num($("be-fc"), 0));
    var per = $("be-period").value === "year" ? "年" : "月";
    var target = Math.max(0, num($("be-target"), 0));
    var qty = Math.max(0, num($("be-qty"), 0));

    var cm = price - vc;
    var cmr = price > 0 ? cm / price : 0;
    var bep = cm > 0 ? fc / cm : Infinity;
    var tq = cm > 0 ? (fc + target) / cm : Infinity;
    var profit = qty * cm - fc;
    var mos = qty > 0 && isFinite(bep) ? (qty - bep) / qty : 0;
    var dol = profit !== 0 ? qty * cm / profit : Infinity;

    $("be-bep").textContent = isFinite(bep) ? Math.ceil(bep).toLocaleString("zh-CN") : "—";
    $("be-cm").textContent = yuan(cm);
    $("be-cmr").textContent = pct(cmr);
    $("be-beps").textContent = isFinite(bep) ? yuan(bep * price) : "—";
    $("be-tq").textContent = isFinite(tq) ? Math.ceil(tq).toLocaleString("zh-CN") + " 件" : "—";
    $("be-ts").textContent = isFinite(tq) ? yuan(tq * price) : "—";
    $("be-profit").textContent = yuan(profit);
    $("be-mos").textContent = cm > 0 ? pct(mos) : "—";
    $("be-dol").textContent = cm > 0 && isFinite(dol) ? fmt(dol, 2) + " 倍" : "—";

    var body = $("be-body");
    body.innerHTML = "";
    var picks = [0.6, 0.8, 1, 1.2, 1.4], i, q, tr;
    for (i = 0; i < picks.length; i++) {
      q = isFinite(bep) ? Math.round(bep * picks[i]) : 0;
      tr = document.createElement("tr");
      tr.innerHTML = "<td>" + q.toLocaleString("zh-CN") + " 件</td><td>" + money(q * price) +
        "</td><td>" + money(q * cm) + "</td><td>" + money(q * cm - fc) + "</td>";
      body.appendChild(tr);
    }

    if (cm <= 0) {
      $("be-note").textContent = "单价不高于单位变动成本（边际贡献 ≤ 0），每卖一件都在贴钱，卖得越多亏得越多，没有保本销量可言。"
        + "先把单价、料工费（变动成本）或固定成本这三项之一改到边际贡献为正，再回来看保本点。";
      return;
    }
    $("be-note").textContent = "保本销量 = 固定成本 ÷ 单位边际贡献；目标销量 = （固定成本 + 目标利润）÷ 单位边际贡献。"
      + "固定成本按" + per + "填写，结果也都是" + per + "口径。安全边际率 = （实际销量 − 保本销量）÷ 实际销量，低于 20% 说明离亏损很近。"
      + "经营杠杆 = 边际贡献 ÷ 利润，倍数为 3 表示销量降 10%，利润就掉 30%——固定成本越重，杠杆越高。";
  }

  function calcPricing() {
    var cost = Math.max(0, num($("pr-cost"), 0));
    var margin = Math.max(0, Math.min(95, num($("pr-margin"), 0))) / 100;
    var vat = Math.max(0, num($("pr-vat"), 0)) / 100;
    var disc = Math.max(0, Math.min(90, num($("pr-disc"), 0))) / 100;
    var cust = Math.max(0, num($("pr-cust"), 0));

    var ex = margin >= 0.999 ? NaN : cost / (1 - margin);
    var inc = ex * (1 + vat);
    var gp = ex - cost;
    var discInc = inc * (1 - disc);
    var discEx = discInc / (1 + vat);
    var discGp = discEx - cost;
    var be = cost * (1 + vat);
    var need = disc >= 0.999 ? NaN : ex / (1 - disc) * (1 + vat);

    $("pr-in").textContent = isFinite(inc) ? money(inc) : "—";
    $("pr-ex").textContent = isFinite(ex) ? yuan(ex) : "—";
    $("pr-gp").textContent = isFinite(gp) ? money(gp) + " 元 / " + pct(margin) : "—";
    $("pr-discin").textContent = isFinite(discInc) ? yuan(discInc) : "—";
    $("pr-discgp").textContent = isFinite(discGp)
      ? money(discEx) + " / " + money(discGp) + " 元 / " + (discEx > 0 ? pct(discGp / discEx) : "—")
      : "—";
    $("pr-be").textContent = yuan(be);
    $("pr-need").textContent = isFinite(need) ? yuan(need) : "—";
    if (cust > 0.005) {
      var custEx = cust / (1 + vat);
      var custGp = custEx - cost;
      $("pr-custout").textContent = money(custGp) + " 元 / " + (custEx > 0 ? pct(custGp / custEx) : "—") +
        (custGp < 0 ? "（亏）" : "");
    } else {
      $("pr-custout").textContent = "填了客户价再算";
    }

    var html = "";
    var table = [0, 0.03, 0.05, 0.08, 0.10, 0.15, 0.20];
    for (var i = 0; i < table.length; i++) {
      var d = table[i];
      var pi = inc * (1 - d);
      var pe = pi / (1 + vat);
      var pg = pe - cost;
      html += "<tr" + (Math.abs(d - disc) < 0.001 ? ' class="c-info"' : "") + "><td>" +
        fmt(d * 100, 0) + "%</td><td>" + money(pi) + "</td><td>" + money(pe) + "</td><td>" +
        (pe > 0 ? pct(pg / pe) : "—") + "</td></tr>";
    }
    $("pr-body").innerHTML = html;

    $("pr-note").textContent = "毛利率一律按不含税算：售价 = 成本 ÷ (1 − 毛利率)，再乘 (1 + 税率) 得到含税报价。"
      + "折扣是从含税价上砍的，砍完不含税售价掉得比你想的快——目标毛利 40%，给 5% 折扣就只剩 " +
      (isFinite(discGp) && discEx > 0 ? pct(discGp / discEx, 1) : "—") +
      "，所以要么报价时预留折扣空间（本例要报 " + (isFinite(need) ? money(need) : "—") + " 才能折后仍保住 40%），"
      + "要么把折扣当成让利、明确走审批。另外毛利不等于净利：运费、销售提成、售后成本都要再摊，"
      + "含税报价还要考虑客户能否接受、同行的含税口径是否一致（有的报不含税价，比价前统一口径）。";
  }

  function calcMultiMargin() {
    var rows = [], i, q, p, c;
    for (i = 1; i <= 4; i++) {
      q = Math.max(0, num($("mm-q" + i), 0));
      p = Math.max(0, num($("mm-p" + i), 0));
      c = Math.max(0, num($("mm-c" + i), 0));
      if (q > 0 && p > 0) {
        rows.push({ name: "产品 " + i, q: q, p: p, c: c, rev: q * p, gp: q * (p - c) });
      }
    }
    if (!rows.length) {
      $("mm-margin").textContent = "—";
      $("mm-total").textContent = "填一个销量再算";
      $("mm-lag").textContent = "—";
      $("mm-neg").textContent = "—";
      $("mm-cut").textContent = "—";
      $("mm-drag").textContent = "—";
      $("mm-worst").textContent = "—";
      $("mm-body").innerHTML = "";
      $("mm-note").textContent = "至少给一个产品填销量，才能算加权毛利率。";
      return;
    }

    var TR = 0, TG = 0;
    for (i = 0; i < rows.length; i++) { TR += rows[i].rev; TG += rows[i].gp; }
    var overall = TR > 0 ? TG / TR : 0;

    var lag = [], neg = [];
    for (i = 0; i < rows.length; i++) {
      var m = rows[i].rev > 0 ? rows[i].gp / rows[i].rev : 0;
      rows[i].margin = m;
      rows[i].share = TR > 0 ? rows[i].rev / TR : 0;
      if (m < overall - 0.0001) lag.push(rows[i].name + "（" + pct(m) + "）");
      if (rows[i].gp < -0.005) neg.push(rows[i].name + "（" + pct(m) + "，亏 " + money(-rows[i].gp) + " 元）");
    }

    var TR2 = 0, TG2 = 0;
    for (i = 0; i < rows.length; i++) {
      if (rows[i].gp >= 0) { TR2 += rows[i].rev; TG2 += rows[i].gp; }
    }
    var cutMargin = TR2 > 0 ? TG2 / TR2 : 0;

    var big = rows[0];
    for (i = 1; i < rows.length; i++) if (rows[i].rev > big.rev) big = rows[i];

    $("mm-margin").textContent = pct(overall);
    $("mm-total").textContent = money(TR) + " / " + money(TG) + " 元";
    $("mm-lag").textContent = lag.length ? lag.join("、") : "没有，都在综合毛利率之上";
    $("mm-neg").textContent = neg.length ? neg.join("、") : "没有负毛利产品";
    $("mm-cut").textContent = neg.length
      ? money(TR2) + " / " + money(TG2) + " 元 / " + pct(cutMargin)
      : "没有要剔的，等于全部";
    $("mm-drag").textContent = neg.length ? fmt((cutMargin - overall) * 100, 2) + " 个百分点" : "0.00 个百分点";
    $("mm-worst").textContent = big.name + "（占收入 " + pct(big.share) + "，毛利率 " + pct(big.margin) + "）" +
      (big.margin < overall - 0.0001 ? "，比综合线还低，是拖后腿的" : "，在综合线之上");

    var html = "";
    for (i = 0; i < rows.length; i++) {
      var r = rows[i];
      html += "<tr" + (r.gp < -0.005 ? ' class="c-soft"' : "") + "><td>" + r.name +
        "</td><td>" + fmt(r.q, 0) + "</td><td>" + money(r.rev) + "</td><td>" + money(r.gp) +
        "</td><td>" + pct(r.margin) + "</td><td>" + pct(r.share) + "</td></tr>";
    }
    html += "<tr><td>合计</td><td>—</td><td>" + money(TR) + "</td><td>" + money(TG) +
      "</td><td>" + pct(overall) + "</td><td>100.00%</td></tr>";
    $("mm-body").innerHTML = html;

    $("mm-note").textContent =
      "综合毛利率是「各产品毛利率按收入加权」，不是简单平均——低毛利产品占比一大，整体就被拖下去，这也是「越卖越忙却越不赚钱」的原因。" +
      (neg.length ? "负毛利产品（" + neg[0].split("（")[0] + "）每卖一件都在贴钱，要么提价、要么换料降本、要么直接砍掉或改成外购转手。" : "") +
      "注意这里只算毛利：运费、提成、售后、仓储都还在毛利之下，毛利为正不代表净利为正；砍掉一个产品也只省变动成本，固定费用照旧要摊到剩下产品上。";
  }

  function calcMpbe() {
    var fc = Math.max(0, num($("mb-fc"), 0));
    var target = Math.max(0, num($("mb-target"), 0));
    var ps = [
      [num($("mb-p1"), 0), num($("mb-v1"), 0), Math.max(0, num($("mb-q1"), 0))],
      [num($("mb-p2"), 0), num($("mb-v2"), 0), Math.max(0, num($("mb-q2"), 0))],
      [num($("mb-p3"), 0), num($("mb-v3"), 0), Math.max(0, num($("mb-q3"), 0))]
    ];
    var rev = 0, cm = 0, i;
    for (i = 0; i < ps.length; i++) { rev += ps[i][0] * ps[i][2]; cm += (ps[i][0] - ps[i][1]) * ps[i][2]; }
    var cmr = rev > 0 ? cm / rev : 0;
    var profit = cm - fc;
    var bep = cmr > 0 ? fc / cmr : 0;
    var mos = rev > 0 ? (rev - bep) / rev : 0;
    var need = cmr > 0 ? (fc + target) / cmr : 0;

    $("mb-bep").textContent = money(bep) + " 元";
    $("mb-cmr").textContent = pct(cmr);
    $("mb-rev").textContent = money(rev) + " / " + money(cm) + " 元";
    $("mb-profit").textContent = (profit >= 0 ? "+" : "") + money(profit) + " 元" + (profit >= 0 ? "" : "（还没保本）");
    $("mb-mos").textContent = pct(mos) + (mos < 0 ? "（亏损区，销售额跌在保本点以下）" : mos < 0.15 ? "（很薄，抗跌能力弱）" : "（还行）");
    $("mb-gap").textContent = bep > rev ? money(bep - rev) + " 元" : "已超过保本点 " + money(rev - bep) + " 元";
    $("mb-need").textContent = money(need) + " 元（比现在多卖 " + money(Math.max(0, need - rev)) + "）";
    $("mb-lever").textContent = money(10000) + " 元";

    var html = "", names = ["产品 1", "产品 2", "产品 3"];
    for (i = 0; i < ps.length; i++) {
      var p = ps[i][0], v = ps[i][1], q = ps[i][2];
      var r = p * q, c = (p - v) * q, share = rev > 0 ? r / rev : 0;
      var alloc = fc * share, pf = c - alloc, beq = p > 0 ? (bep * share) / p : 0;
      var cls = pf < 0 ? ' class="c-bad"' : "";
      html += "<tr" + cls + "><td>" + names[i] + "</td><td>" + money(r) + "</td><td>" + pct(p > 0 ? (p - v) / p : 0) +
        "</td><td>" + money(alloc) + "</td><td>" + (pf >= 0 ? "+" : "") + money(pf) + "</td><td>" + fmt(beq, 0) + "</td></tr>";
    }
    $("mb-body").innerHTML = html;

    $("mb-note").textContent =
      " 多产品保本先算「加权平均边际贡献率」= 各产品边际贡献之和 ÷ 销售额之和，再用固定成本除以它得到保本销售额。当前 " + money(rev) +
      " 元销售、边际贡献率 " + pct(cmr) + "，保本要 " + money(bep) + " 元，所以现在是" + (profit >= 0 ? "盈利" : "亏损") + " " + money(Math.abs(profit)) + " 元。" +
      " 这张表最有用的地方是右下两列：把固定成本按销售结构分摊后，标红的行都是「毛利撑不起自己那份固定成本」的产品，它们的销量越大，公司亏得越多——涨价、砍产或换结构，比整体降本更直接。" +
      " 注意：① 「保本销量」是按当前销售结构均摊出来的，结构一变要重算；② 固定成本分摊法是管理口径，不是会计准则要求，只用于判断，不影响对外报表；③ 边际贡献率高的产品优先给产能。";
  }

  function calcPayroll() {
    var gross = Math.max(0, num($("pc-gross"), 0));
    var si = Math.max(0, num($("pc-si"), 0));
    var hf = Math.max(0, num($("pc-hf"), 0));
    var tax = Math.max(0, num($("pc-tax"), 0));
    var other = Math.max(0, num($("pc-other"), 0));
    var act = Math.max(0, num($("pc-act"), 0));
    var tax2 = Math.max(0, num($("pc-tax2"), 0));
    var cosi = Math.max(0, num($("pc-cosi"), 0));
    var cohf = Math.max(0, num($("pc-cohf"), 0));
    var rev = Math.max(0, num($("pc-rev"), 0));
    var head = Math.max(1, num($("pc-head"), 1));

    var ded = si + hf + tax + other;
    var net = gross - ded;
    var diff = act - net;
    var taxdiff = tax - tax2;
    var co = cosi + cohf;
    var cost = gross + co;
    var rate = rev > 0 ? cost / rev : 0;
    var avg = cost / head;

    $("pc-net").textContent = money(net) + " 元";
    $("pc-diff").textContent = Math.abs(diff) < 0.5 ? "0.00 元（平）" : money(diff) + " 元（表上多发了）";
    $("pc-taxdiff").textContent = Math.abs(taxdiff) < 0.5 ? "0.00 元（一致）" : money(taxdiff) + " 元" + (taxdiff > 0 ? "（表内多扣，要退给员工并更正申报）" : "（表内少扣，员工汇算要补税）");
    $("pc-ded").textContent = pct(gross > 0 ? ded / gross : 0) + "（" + money(ded) + " 元）";
    $("pc-co").textContent = money(co) + " 元";
    $("pc-cost").textContent = money(cost) + " 元";
    $("pc-rate").textContent = pct(rate) + (rate > 0.3 ? "（偏高，人力密集行业一般 15–25%）" : "");
    $("pc-avg").textContent = money(avg) + " 元/人";

    var ok = Math.abs(diff) < 0.5 && Math.abs(taxdiff) < 0.5;
    $("pc-verdict").textContent = ok ? "三项勾稽全平，可以发放" :
      (Math.abs(diff) >= 0.5 ? "实发金额对不上，先查漏项（补发、扣款、个税零头）" : "个税与申报数不一致，先对齐再发");

    var rows = [["应发工资", gross, 1], ["个人社保", -si, gross > 0 ? si / gross : 0], ["个人公积金", -hf, gross > 0 ? hf / gross : 0],
      ["个人所得税", -tax, gross > 0 ? tax / gross : 0], ["其他扣款", -other, gross > 0 ? other / gross : 0], ["实发工资", net, gross > 0 ? net / gross : 0]];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var cls = (rows[i][0] === "实发工资" && Math.abs(diff) >= 0.5) ? ' class="c-warn"' : "";
      html += "<tr" + cls + "><td>" + rows[i][0] + "</td><td>" + money(rows[i][1]) + "</td><td>" + pct(rows[i][2]) + "</td></tr>";
    }
    $("pc-body").innerHTML = html;

    $("pc-note").textContent =
      " 工资表每月只需三处勾稽：① 应发 − 社保 − 公积金 − 个税 − 其他扣款 = 实发（与银行代发文件总额一致）；② 表内个税合计 = 自然人电子税务局申报数；③ 应发 + 单位承担社保公积金 = 用工总成本（进成本费用的就是这个数，不是实发数）。" +
      " 本月：代扣合计 " + money(ded) + " 元占应发 " + pct(gross > 0 ? ded / gross : 0) + "，用工总成本 " + money(cost) + " 元，人工成本率 " + pct(rate) + "。" +
      " 常见不平原因：离职补偿、补发上月工资没进表、商保和工会经费挂错科目、公积金基数年度调整只调了一半人、专项附加扣除当月才采集导致个税跳变。社保和个税都是代扣代缴，多扣了必须退，不能留在账上当收入。";
  }

  function calcImportCost() {
    var fob = Math.max(0, num($("ic-fob"), 0));
    var frt = Math.max(0, num($("ic-frt"), 0));
    var ins = Math.max(0, num($("ic-ins"), 0));
    var fx = Math.max(0, num($("ic-fx"), 1));
    var dutyR = Math.max(0, num($("ic-duty"), 0)) / 100;
    var consR = Math.min(0.99, Math.max(0, num($("ic-cons"), 0) / 100));
    var vatR = Math.max(0, num($("ic-vat"), 0)) / 100;
    var port = Math.max(0, num($("ic-port"), 0));
    var agent = Math.max(0, num($("ic-agent"), 0));
    var qty = Math.max(1, num($("ic-qty"), 1));

    var cif = (fob + frt + ins) * fx;
    var duty = cif * dutyR;
    var cons = (cif + duty) / (1 - consR) * consR;
    var vat = (cif + duty + cons) * vatR;
    var fees = port + agent;
    var land = cif + duty + cons + fees;
    var cash = land + vat;
    var unitLand = land / qty;
    var unitCash = cash / qty;
    var ratio = cif > 0 ? (duty + cons + vat) / cif : 0;

    $("ic-big").textContent = fmt(unitLand, 2);
    $("ic-cif").textContent = yuan(cif) + "（" + fmt(fob + frt + ins, 0) + " 美元）";
    $("ic-dutyv").textContent = yuan(duty) + "（" + pct(dutyR, 1) + "）";
    $("ic-consv").textContent = yuan(cons) + (consR > 0 ? "（" + pct(consR, 1) + "，价内税，含在完税价里算）" : "（不涉及）");
    $("ic-vatv").textContent = yuan(vat) + "（拿来抵扣，不进成本）";
    $("ic-fees").textContent = yuan(fees);
    $("ic-land").textContent = yuan(land);
    $("ic-cash").textContent = yuan(cash) + " / " + money(unitCash) + " 元/件";
    $("ic-ratio").textContent = pct(ratio, 2) + "（其中可抵扣部分 " + pct(cif > 0 ? vat / cif : 0, 2) + "）";

    var rows = [
      ["CIF 完税价格", money(cif), "（货值＋运费＋保险）× 汇率"],
      ["关税", money(duty), pct(dutyR, 1) + " × CIF"],
      ["消费税", money(cons), consR > 0 ? "（CIF＋关税）÷(1−税率)×税率" : "本笔不涉及"],
      ["进口增值税", money(vat), "（CIF＋关税＋消费税）× " + pct(vatR, 0) + "，可抵扣"],
      ["港杂 + 代理", money(fees), "国内环节费用"],
      ["到岸成本（进存货）", money(land), "不含可抵扣增值税"],
      ["含税现金支出", money(cash), "到岸成本 + 进口增值税"],
      ["单位到岸成本", money(unitLand) + " 元/件", "到岸成本 ÷ " + fmt(qty, 0) + " 件"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 5 || i === 7 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td class=\"tal\">" + rows[i][2] + "</td></tr>";
    }
    $("ic-body").innerHTML = html;

    $("ic-note").textContent = "三个容易算错的地方：一是完税价格用 CIF（货值＋运费＋保险），漏了运费关税就少交、被追缴还带滞纳金；"
      + "二是消费税是价内税，要用「(CIF＋关税)÷(1−消费税率)」倒算，不是直接乘税率；"
      + "三是进口增值税可以抵扣，它占压的是资金不是成本，报价时算进单价会把价格报高一大截。"
      + "从付汇到抵扣通常隔一两个月，这段占压资金也要计入真实成本。";
  }

  function calcQuoteFx() {
    var cost = Math.max(0, num($("qf-cost"), 0));
    var qty = Math.max(1, num($("qf-qty"), 1));
    var dyn = Math.max(0, num($("qf-dyn"), 0));
    var port = Math.max(0, num($("qf-port"), 0));
    var gm = Math.min(0.9, Math.max(0, num($("qf-gm"), 0) / 100));
    var comm = Math.min(0.2, Math.max(0, num($("qf-comm"), 0) / 100));
    var fx = Math.max(0.01, num($("qf-fx"), 7));
    var frtUsd = Math.max(0, num($("qf-frt"), 0));
    var insR = Math.max(0, num($("qf-ins"), 0) / 100);

    var baseR = (cost * qty + dyn + port) / (1 - gm);
    var fob = baseR / (1 - comm);
    var commv = fob * comm;
    var frtR = frtUsd * fx;
    var cif = (fob + frtR) / (1 - insR);
    var insv = cif - fob - frtR;
    var profit = fob - commv - cost * qty - dyn - port;
    var unitFob = fob / qty, unitCif = cif / qty;

    $("qf-big").textContent = fmt(unitCif / fx, 2);
    $("qf-fob").textContent = money(fob) + " 元 / " + money(unitFob) + " 元（" + fmt(unitFob / fx, 2) + " 美元）";
    $("qf-comv").textContent = money(commv) + "（" + pct(comm, 1) + "）";
    $("qf-real").textContent = fob > 0 ? pct(profit / fob, 2) : "—";
    $("qf-frtv").textContent = money(frtR) + "（" + fmt(frtUsd, 0) + " 美元）";
    $("qf-insv").textContent = money(insv) + "（CIF × " + pct(insR, 2) + " 倒算）";
    $("qf-cif").textContent = money(cif) + " / " + money(unitCif) + " 元（" + fmt(unitCif / fx, 2) + " 美元）";
    $("qf-profit").textContent = money(profit / qty) + " 元（扣佣金与国内费用后）";
    $("qf-fxrisk").textContent = "FOB 收汇减少 " + money(fob / fx * 0.1) + " 元";

    var rows = [
      ["FOB 报价", money(fob), fmt(fob / fx, 2)],
      ["减：佣金", "−" + money(commv), fmt(commv / fx, 2)],
      ["减：工厂成本", "−" + money(cost * qty), fmt(cost * qty / fx, 2)],
      ["减：国内运费+港杂", "−" + money(dyn + port), fmt((dyn + port) / fx, 2)],
      ["净利", money(profit), fmt(profit / fx, 2)],
      ["CFR 报价（含海运费）", money(fob + frtR), fmt((fob + frtR) / fx, 2)],
      ["CIF 报价（含运保费）", money(cif), fmt(cif / fx, 2)]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 4 || i === 6 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td></tr>";
    }
    $("qf-body").innerHTML = html;

    $("qf-note").textContent = "报价是倒推出来的：先算「这批货必须卖多少钱才够目标毛利和覆盖国内费用」，再按条款往上加。"
      + "FOB 只管到船舷，CFR 加海运费，CIF 再加保险（保险按 CIF 的 " + pct(insR, 2) + " 倒算，不是按 FOB 乘）。"
      + "两个坑：一是佣金要从报价里倒着加，直接乘会少算；二是目标毛利率是对 FOB 算的，扣掉佣金后实际只有 "
      + (fob > 0 ? pct(profit / fob, 2) : "—") + "。收汇还要盯汇率，报出去到收款之间每跌 0.1 元，这批货就少收 " + money(fob / fx * 0.1) + " 元。";
  }

  function calcRebate() {
    var base = Math.max(0, num($("reb-base"), 0));
    var gm = Math.min(1, Math.max(0, num($("reb-gm"), 0) / 100));
    var tiers = [
      { t: Math.max(0, num($("reb-t1"), 0)), p: Math.max(0, num($("reb-p1"), 0)) / 100 },
      { t: Math.max(0, num($("reb-t2"), 0)), p: Math.max(0, num($("reb-p2"), 0)) / 100 },
      { t: Math.max(0, num($("reb-t3"), 0)), p: Math.max(0, num($("reb-p3"), 0)) / 100 }
    ];
    tiers.sort(function (x, y) { return x.t - y.t; });

    function rateOf(s) {
      var r = 0;
      for (var i = 0; i < tiers.length; i++) if (s >= tiers[i].t) r = tiers[i].p;
      return r;
    }
    var r0 = rateOf(base);
    var net0 = base * gm - base * r0;
    var curName = r0 > 0 ? "已达 " + pct(r0, 1) + " 档" : "未达任何档位（无返利）";

    $("reb-cur").textContent = curName;
    $("reb-now").textContent = fmt(base * r0, 2) + " 万 / " + fmt(net0, 2) + " 万元";
    $("reb-rate").textContent = pct(1 - r0, 2) + "（返点即让价）";

    var html = "", best = null;
    for (var i = 0; i < tiers.length; i++) {
      var t = tiers[i].t, p = tiers[i].p;
      var reb = t * p, net = t * gm - reb, delta = net - net0;
      var crit = gm > p ? net0 / (gm - p) : Infinity;
      var need = t - base;
      var tag;
      if (base >= t) tag = "已达成";
      else if (delta > 0) tag = "冲";
      else tag = "不划算";
      if (base < t && delta > 0 && (!best || delta > best.delta)) best = { t: t, p: p, delta: delta, net: net, need: need, crit: crit };
      html += "<tr" + (tag === "冲" ? ' class="c-info"' : (tag === "不划算" ? ' class="c-warn"' : '')) + "><td>"
        + fmt(t, 0) + " 万 / " + pct(p, 1) + "</td><td>" + fmt(reb, 2) + "</td><td>" + fmt(net, 2) + "</td><td>"
        + (delta >= 0 ? "+" : "") + fmt(delta, 2) + "</td><td>" + (isFinite(crit) ? fmt(crit, 2) : "无法达成")
        + "</td><td class=\"tal\">" + tag + "</td></tr>";
    }
    $("reb-body").innerHTML = html;

    if (best) {
      $("reb-big").textContent = fmt(best.delta, 2);
      $("reb-pick").textContent = fmt(best.t, 0) + " 万 / " + pct(best.p, 1) + " 档（净毛利 " + fmt(best.net, 2) + " 万）";
      $("reb-crit").textContent = isFinite(best.crit) ? fmt(best.crit, 2) + " 万元（相当于只需比现在多卖 "
        + fmt(best.crit - base, 2) + " 万）" : "该档返点高于毛利率，越卖越亏";
      $("reb-advice").textContent = best.crit <= best.t
        ? "只要真能冲到 " + fmt(best.t, 0) + " 万就划算（临界点 " + fmt(best.crit, 2) + " 万低于门槛），可以把返点当促销工具用"
        : "必须先过临界点 " + fmt(best.crit, 2) + " 万才不亏，冲不到门槛还不如不冲";
    } else {
      $("reb-big").textContent = base * (1 - r0) > 0 ? "0.00" : "—";
      $("reb-pick").textContent = base >= tiers[tiers.length - 1].t ? "已在最高档，再冲没有增量" : "没有值得冲的档位";
      $("reb-crit").textContent = "—";
      $("reb-advice").textContent = "现有档位跳升幅度过大（返点接近甚至超过毛利率），建议把门槛做得更密、跳升更缓";
    }

    $("reb-note").textContent = "阶梯返利的坑在「全额返」：跨过门槛那一刻，前面已经卖掉的量也一起降价，所以不是「多卖 50 万只让 50 万」，"
      + "而是全年的销售额都按新档返。判断标准是「净毛利增量为正」——边际贡献（增量销售 × 毛利率）要大于返利增量。"
      + "本例从 " + fmt(base, 0) + " 万冲到下一档，临界点 " + (best && isFinite(best.crit) ? fmt(best.crit, 2) : "—")
      + " 万；也就是说跨档的代价固定，销量越接近门槛越危险。返利还要注意：开票与返利的税务处理（销售折让需红字发票）、"
      + "跨年返利的预提、以及客户为了拿返点年底压货次年退货。";
  }

  function calcPayout() {
    var ret = num($("po-ret"), 0), npf = num($("po-np"), 0);
    var hold = Math.min(1, Math.max(0, num($("po-share"), 0) / 100));
    var ratio = Math.min(1, Math.max(0, num($("po-ratio"), 0) / 100));
    var tax = Math.min(1, Math.max(0, num($("po-tax"), 0) / 100));
    var roe = Math.max(0, num($("po-roe"), 0) / 100);
    var loan = Math.max(0, num($("po-loan"), 0));

    var div = npf * ratio;
    var dt = div * tax;
    var mine = div * hold, mineNet = mine * (1 - tax);
    var keep = ret + npf - div;
    var keepAll = ret + npf;
    var addProfit = keepAll * roe;
    var indirect = addProfit * hold;
    var indirectNet = indirect * (1 - tax);
    var loanTax = loan * tax;
    var loanLate = loanTax * 0.1825;

    $("po-big").textContent = fmt(mineNet, 2);
    $("po-div").textContent = fmt(div, 2) + " / " + fmt(dt, 2) + " 万元";
    $("po-sharev").textContent = fmt(mine, 2) + " / " + fmt(mineNet, 2) + " 万元";
    $("po-keep").textContent = fmt(keep, 2) + " 万元";
    $("po-nodiv").textContent = fmt(keepAll, 2) + " / " + fmt(addProfit, 2) + " 万元";
    $("po-ind").textContent = fmt(indirectNet, 2) + " 万元（税前 " + fmt(indirect, 2) + "，变现还要再交 " + pct(tax, 0) + "）";
    $("po-risk").textContent = loan > 0
      ? "借款 " + fmt(loan, 2) + " 万元视同分红，补个税 " + fmt(loanTax, 2) + " 万元，滞纳金约 " + fmt(loanLate, 2) + " 万元"
      : "无借款风险";

    var effRate = 1 - 0.75 * (1 - tax);
    $("po-alltax").textContent = "利润先交 25% 企业所得税，" + (ratio > 0 ? "分掉的部分再交 " + pct(tax, 0) + "，综合税负 " + pct(effRate, 2) : "不分红就暂时没有第二个税");

    var rows = [
      ["按 " + pct(ratio, 0) + " 分红", fmt(mineNet, 2) + " 万元", fmt(keep, 2) + " 万元", "当年拿现金，交 20% 个税"],
      ["不分红全留存", "0", fmt(keepAll, 2) + " 万元", "股东间接受益 " + fmt(indirectNet, 2) + " 万元（税后口径）"],
      ["股东借款 " + fmt(loan, 0) + " 万元不还", fmt(loan, 2) + " 万元（借款）", "—", "视同分红，补税 " + fmt(loanTax, 2) + " 万元"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 2 ? ' class="c-warn"' : (i === 0 ? ' class="c-info"' : "")) + "><td class=\"tal\">" + rows[i][0]
        + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td class=\"tal\">" + rows[i][3] + "</td></tr>";
    }
    $("po-body").innerHTML = html;

    $("po-note").textContent = "分红是「两道税」：公司先交 25% 企业所得税，利润分到自然人股东手上再交 20%，合起来 " + pct(effRate, 2)
      + "（不是 45%，因为两道税基数不同）。所以「分还是留」本质是让股东拿现金自己投（税后 80%）还是留在公司按 ROE 再投（"
      + pct(roe, 1) + "，但将来变现还要再交一次）。本例留存的间接价值 " + fmt(indirectNet, 2) + " 万元，高于直接分手的 "
      + fmt(mineNet, 2) + " 万元——前提是公司真能把钱投出这个回报，投不出去（账上趴着买理财）就该分掉。"
      + "红线：股东借款年末未归还且未用于生产经营，按「利息、股息、红利所得」视同分红补 20% 个税并加收滞纳金；"
      + "上市公司持股满 1 年免征、1 个月至 1 年减半，非上市不享受。";
  }

  function calcCommission() {
    var sales = Math.max(0, num($("cm-sales"), 0));
    var ret = Math.min(1, Math.max(0, num($("cm-ret"), 0) / 100));
    var gm = Math.min(1, Math.max(0, num($("cm-gm"), 0) / 100));
    var sr = Math.max(0, num($("cm-sr"), 0)) / 100;
    var gr = Math.max(0, num($("cm-gr"), 0)) / 100;
    var achv = Math.max(0, num($("cm-achv"), 100)) / 100;
    var cash = Math.min(1, Math.max(0, num($("cm-cash"), 100) / 100));

    var base = sales * (1 - ret);
    var gross = base * gm;
    var c1 = base * sr;
    var c2 = gross * gr;
    var coeff = achv < 0.8 ? 0.5 : achv < 1 ? 1 : achv < 1.2 ? 1.2 : 1.5;
    var crit = gr > 0 ? sr / gr : 0;

    $("cm-big").textContent = money(c2);
    $("cm-c1").textContent = yuan(c1);
    $("cm-gap").textContent = (c1 - c2 >= 0 ? "" : "销售额法少付 ") + money(Math.abs(c1 - c2)) + " 元";
    $("cm-crit").textContent = pct(crit, 2) + "（毛利率高于它，按毛利提对销售更有利）";
    $("cm-coeff").textContent = fmt(coeff, 1) + "（完成率 " + pct(achv, 0) + "）";
    $("cm-cashout").textContent = money(c1 * coeff * cash) + " / " + money(c2 * coeff * cash) + " 元";
    $("cm-share").textContent = gross > 0 ? pct(c1 / gross, 2) : "—";
    $("cm-base").textContent = yuan(base) + "（退货 " + pct(ret, 0) + "）";

    var gms = [0.2, gm, 0.3, 0.35, 0.4], seen = {}, html = "";
    for (var i = 0; i < gms.length; i++) {
      var g = Math.round(gms[i] * 1000) / 1000;
      if (seen[g]) continue;
      seen[g] = 1;
      var a = base * sr, b = base * g * gr, d = b - a;
      var cls = Math.abs(g - gm) < 0.0005 ? ' class="c-info"' : (d < 0 ? ' class="c-warn"' : "");
      html += "<tr" + cls + "><td>" + pct(g, 0) + "</td><td>" + money(a) + "</td><td>" + money(b) + "</td><td>"
        + (d >= 0 ? "+" : "") + money(d) + "</td></tr>";
    }
    $("cm-body").innerHTML = html;

    $("cm-note").textContent = "按销售额提成的毛病很简单：打折、赊账、卖高毛利还是低毛利，销售拿的钱差不多，"
      + "所以他会默认选择「最容易签下来」的方式，而那通常是最不赚钱的方式。按毛利提成把这一层对齐了——降价自己吃亏，"
      + "但销售会开始挑客户、也和公司抢定价权，所以常见做法是「毛利提成为主 + 销售额门槛（完成率系数）保底」。"
      + "提成按回款发放是最有效的风控，滞销赊账的提成拖着不发，比任何制度都好使。";
  }

  function calcRebateAcc() {
    var sales = num($("rba-sales"), 0), rate = num($("rba-rate"), 0) / 100, ach = num($("rba-ach"), 0) / 100;
    var vc = num($("rba-vc"), 0) / 100;
    var fee = num($("rba-fee"), 0), promo = num($("rba-promo"), 0), staff = num($("rba-staff"), 0);
    var reb = sales * rate * ach;
    var net = sales - reb;
    var cost = fee + promo + staff;
    var gpRaw = sales * (1 - vc);
    var netGp = net * (1 - vc) - cost;
    var cr = net > 0 ? cost / net : 0;
    var rg = gpRaw > 0 ? reb / gpRaw : 0;
    var gm = net > 0 ? netGp / net : 0;
    var full = sales * rate - reb;
    $("rba-big").textContent = money(netGp);
    $("rba-reb").textContent = money(reb) + " 元（按 " + pct(rate, 1) + " × 达成 " + pct(ach, 0) + " 计提）";
    $("rba-net").textContent = money(net) + " 元";
    $("rba-cost").textContent = money(cost) + " 元（进场 " + money(fee) + " / 促销 " + money(promo) + " / 人员 " + money(staff) + "）";
    $("rba-cr").textContent = pct(cr, 2) + "（渠道费用 ÷ 净销售额）";
    $("rba-rg").textContent = pct(rg, 2) + "（返利 ÷ 毛利 " + money(gpRaw) + "）";
    $("rba-gm").textContent = pct(gm, 2) + "（原来 " + pct(1 - vc, 2) + "）";
    $("rba-full").textContent = "若 100% 达成，再多返 " + money(full) + " 元";
    $("rba-note").textContent = "返利属于可变对价：合同签下去就要按期望值（比例 × 达成概率）冲减收入并计提负债，"
      + "不能等年底客户来结账才认。计提过头（客户没达成）要转回，但准则要求「极可能不发生重大转回」才敢计，"
      + "所以保守一点先按达成概率打折更稳。渠道费用要按净销售额看费用率——先减返利再算，"
      + "否则进场费、促销费的真实占比会被高估；进商场、上平台的生意，渠道费用率 10% 以上很常见，"
      + "报价时必须把它算进价格里，靠销量摊薄是摊不掉的。";
  }

  function calcHeadcount() {
    var vol = num($("hc-vol"), 0), grow = num($("hc-grow"), 0) / 100;
    var eff = Math.max(1, num($("hc-eff"), 1)), now = num($("hc-now"), 0);
    var cost = num($("hc-cost"), 0), turn = num($("hc-turn"), 0) / 100, hire = num($("hc-hire"), 0);
    var tgt = vol * (1 + grow), need = tgt / eff;
    var gap = Math.max(0, need - now), churn = need * turn;
    var hires = gap + churn;
    var budget = need * cost, inc = (need - now) * cost;
    var effNeed = tgt / (eff * 1.1);
    var save = (need - effNeed) * cost;
    $("hc-big").textContent = fmt(gap, 1);
    $("hc-need").textContent = fmt(tgt, 0) + " 单 / " + fmt(need, 1) + " 人";
    $("hc-churn").textContent = fmt(churn, 1) + " 人（编制 " + fmt(need, 1) + " × 离职率 " + pct(turn, 0) + "）";
    $("hc-hireout").textContent = fmt(hires, 1) + " 人（缺口 " + fmt(gap, 1) + " ＋ 补员 " + fmt(churn, 1) + "）";
    $("hc-budget").textContent = money(budget) + " 元";
    $("hc-inc").textContent = money(inc) + " 元（现在 " + money(now * cost) + "）";
    $("hc-hirecost").textContent = money(hires * hire) + " 元";
    $("hc-eff10").textContent = money(save) + " 元（" + fmt(effNeed, 1) + " 人即可，少招 " + fmt(need - effNeed, 1) + " 人）";
    $("hc-note").textContent = "编制不是拍脑袋，是「业务量 ÷ 人均效能」倒推出来的；但人均效能要用近 12 个月的实际数据，"
      + "别用行业标杆，否则永远算不出缺口。离职率要乘在目标编制上（不是现有编制），"
      + "因为招进来的人也会走——招聘量 = 净增缺口 + 离职补员，这一步最常被漏掉，"
      + "所以「招 88 人」其实要招 " + fmt(hires, 1) + " 人。"
      + "人力预算别只算工资：社保公积金、年终奖、招聘与培训、工位设备都在里面，人均年成本要按全口径。"
      + "最后算一遍「提效」的杠杆：人均效能提 10% 就能少招 " + fmt(need - effNeed, 1) + " 人，"
      + "通常比砍人头更容易被接受，也更可持续。";
  }

  function calcMarkRoi() {
    var spend = num($("mroi-spend"), 0), newc = Math.max(1, num($("mroi-new"), 1));
    var aov = num($("mroi-aov"), 0), gm = num($("mroi-gm"), 0) / 100;
    var rep = num($("mroi-rep"), 0), life = num($("mroi-life"), 0);
    var cac = spend / newc, fg = aov * gm, ltv = aov * rep * life * gm;
    var roi = spend > 0 ? (newc * ltv - spend) / spend : 0;
    $("mroi-big").textContent = fmt(ltv / cac, 2);
    $("mroi-cac").textContent = money(cac) + " 元/人";
    $("mroi-fg").textContent = money(fg) + " 元（客单价 " + money(aov) + " × " + pct(gm, 0) + "）";
    $("mroi-be").textContent = fmt(cac / fg, 3) + " 单" + (cac / fg <= 1 ? "（首单即回本）" : "（首单不够，要等复购）");
    $("mroi-ltv").textContent = money(ltv) + " 元（" + fmt(rep, 1) + " 次/年 × " + fmt(life, 1) + " 年）";
    $("mroi-roi").textContent = fmt(roi, 2) + " 倍（毛利额 " + money(newc * ltv) + " ÷ 投入）";
    $("mroi-line").textContent = money(ltv / 3) + " 元（LTV/CAC ≥ 3 才算健康）";
    $("mroi-rev").textContent = money(newc * aov * rep * life) + " 元";
    $("mroi-note").textContent = "LTV/CAC ≥ 3 是经验健康线，低于 1 是每获一个客亏一次，1.5–2 之间要靠融资或复购硬撑。"
      + "几个口径坑：CAC 要算全口径（渠道费＋投放人力＋代理佣金＋首单补贴），只算广告费会把它算便宜；"
      + "LTV 用「毛利」不用「收入」，用收入会高估 2–3 倍；生命周期别用「预计」，要用历史留存曲线算出来的实际中位年限。"
      + "另外投产比高不等于该无限加投——边际 CAC 会随投放规模上升，"
      + "投放量翻倍前先看新增渠道的转化率是否掉、退货率是否上升。";
  }

  function calcSaleExp() {
    var sales = Math.max(0, num($("se-sales"), 0));
    var sales0 = Math.max(0, num($("se-sales0"), 0));
    var exp = Math.max(0, num($("se-exp"), 0));
    var exp0 = Math.max(0, num($("se-exp0"), 0));
    var margin = Math.min(100, Math.max(0, num($("se-margin"), 30))) / 100;

    var rate = sales > 0 ? exp / sales : 0;
    var rate0 = sales0 > 0 ? exp0 / sales0 : 0;
    var dE = exp - exp0;
    var dS = sales - sales0;
    var roi = dE > 0 ? dS * margin / dE : 0;
    var elas = dS > 0 && sales0 > 0 ? (exp0 > 0 ? (exp / exp0 - 1) / (sales / sales0 - 1) : 0) : 0;
    var newGm = dS * margin;
    var net = newGm - dE;

    $("se-big").textContent = fmt(roi, 2);
    $("se-rate").textContent = fmt(rate * 100, 2) + "% / " + fmt(rate0 * 100, 2) + "%";
    $("se-elas").textContent = fmt(elas, 2) + "（" + (elas < 1 ? "费效改善" : "费效变差") + "）";
    $("se-newgm").textContent = money(newGm) + "（增量收入 " + money(dS) + " × 毛利率 " + pct(margin, 0) + "）";
    $("se-net").textContent = money(net) + "（增量毛利 − 增量费用）";

    var rows = [
      ["销售收入", money(sales0), money(sales), (dS >= 0 ? "+" : "") + money(dS)],
      ["销售费用", money(exp0), money(exp), (dE >= 0 ? "+" : "") + money(dE)],
      ["销售费用率", fmt(rate0 * 100, 2) + "%", fmt(rate * 100, 2) + "%", (rate - rate0 >= 0 ? "+" : "") + fmt((rate - rate0) * 100, 2) + " 点"],
      ["边际毛利", "—", money(newGm), "增量收入 × 毛利率"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td>" + rows[i][3] + "</td></tr>";
    }
    $("se-body").innerHTML = html;

    $("se-note").textContent = "边际 ROI " + fmt(roi, 2) + " 倍，即本期多花的 " + money(dE) + " 销售费用换回 " + money(newGm) + " 毛利，净赚 " + money(net) + "。"
      + (roi >= 1 ? "ROI &gt; 1，这波投入划算；" : "ROI &lt; 1，多花的费用连毛利都没赚回来，先停一停；")
      + "费用弹性 " + fmt(elas, 2) + (elas < 1 ? "（&lt;1，费用涨得比收入慢，方向健康）。" : "（&gt;1，费用跑得比收入快，要盯）。") + "不同渠道分开算，别让高效渠道补贴低效渠道。";
  }

  function calcProfitcenter() {
    var c = [];
    for (var i = 1; i <= 2; i++) {
      var rev = num($("prc-a" + i), 0), vc = num($("prc-b" + i), 0), cf = num($("prc-c" + i), 0), uf = num($("prc-d" + i), 0);
      var cm = rev - vc, ctrl = cm - cf, cen = ctrl - uf;
      c.push({ rev: rev, cm: cm, ctrl: ctrl, cen: cen, cr: rev > 0 ? ctrl / rev * 100 : 0, cmr: rev > 0 ? cm / rev * 100 : 0 });
    }
    var rev = c[0].rev + c[1].rev, cm = c[0].cm + c[1].cm, ctrl = c[0].ctrl + c[1].ctrl, cen = c[0].cen + c[1].cen;
    var best = c[0].cr >= c[1].cr ? "中心 A（可控利润率 " + fmt(c[0].cr) + "%）" : "中心 B（可控利润率 " + fmt(c[1].cr) + "%）";
    var focus = c[0].cr <= c[1].cr ? "中心 A（可控利润率 " + fmt(c[0].cr) + "%）" : "中心 B（可控利润率 " + fmt(c[1].cr) + "%）";
    $("prc-ctrl").textContent = money(ctrl);
    $("prc-rev").textContent = money(rev);
    $("prc-cm").textContent = money(cm);
    $("prc-cen").textContent = money(cen);
    $("prc-best").textContent = best;
    $("prc-focus").textContent = focus;
    var tb = $("prc-body");
    tb.innerHTML = "";
    c.forEach(function (r, idx) {
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + (idx === 0 ? "A" : "B") + "</td><td>" + money(r.rev) + "</td><td>" + money(r.cm) + "</td><td>" + money(r.ctrl) + "</td><td>" + money(r.cen) + "</td><td>" + fmt(r.cr) + "%</td>";
      tb.appendChild(tr);
    });
    $("prc-note").textContent = "可控利润 = 收入 − 变动成本 − 该中心自己说了算的固定费用；总部分摊下来的（房租、总部费用）只列示、不考核，否则会冤枉把中心做好的负责人。"
      + " 两家边际贡献率都是 " + fmt(c[0].cmr) + "%（A）/" + fmt(c[1].cmr) + "%（B），但 B 可控固定重，可控利润率被压到 " + fmt(c[1].cr) + "%。先管可控固定费用最高的那家。";
  }

export const PANELS = {"breakeven":"  <section class=\"panel\" id=\"panel-breakeven\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>单价（元，不含税）</span>\n      <input id=\"be-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"100\"></label>\n    <label class=\"f\"><span>单位变动成本（元，材料 + 计件工资 + 运费等）</span>\n      <input id=\"be-vc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"60\"></label>\n    <label class=\"f\"><span>固定成本总额（房租、工资、折旧等）</span>\n      <input id=\"be-fc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\"></label>\n    <label class=\"f\"><span>固定成本是</span>\n      <select id=\"be-period\">\n        <option value=\"month\" selected>每月的</option>\n        <option value=\"year\">每年的</option>\n      </select></label>\n    <label class=\"f\"><span>目标利润（元，同期）</span>\n      <input id=\"be-target\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"10000\"></label>\n    <label class=\"f\"><span>当前销量（件 / 期）</span>\n      <input id=\"be-qty\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"800\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">保本销量（不赚不亏）</span><strong id=\"be-bep\">—</strong><span class=\"unit\">件/期</span></div>\n    <ul class=\"kv\">\n      <li><span>单位边际贡献</span><b id=\"be-cm\">—</b></li>\n      <li><span>边际贡献率</span><b id=\"be-cmr\">—</b></li>\n      <li><span>保本销售额</span><b id=\"be-beps\">—</b></li>\n      <li><span>达成目标利润要卖</span><b id=\"be-tq\">—</b></li>\n      <li><span>对应销售额</span><b id=\"be-ts\">—</b></li>\n      <li><span>当前利润</span><b id=\"be-profit\">—</b></li>\n      <li><span>安全边际率（还能掉多少量）</span><b id=\"be-mos\">—</b></li>\n      <li><span>经营杠杆（利润对销量的敏感度）</span><b id=\"be-dol\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>销量</th><th>收入</th><th>边际贡献</th><th>利润</th></tr></thead>\n        <tbody id=\"be-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"be-note\"></p>\n  </div>\n    </div>\n  </section>\n","pricing":"  <section class=\"panel\" id=\"panel-pricing\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（报一个价之前）</h2>\n    <label class=\"f\"><span>单位成本（不含税，元）</span>\n      <input id=\"pr-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"100\"></label>\n    <label class=\"f\"><span>目标毛利率（%）</span>\n      <input id=\"pr-margin\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"95\" step=\"1\" value=\"40\"></label>\n    <label class=\"f\"><span>增值税税率（%）</span>\n      <input id=\"pr-vat\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"13\"></label>\n    <label class=\"f\"><span>打算给客户的折扣（%）</span>\n      <input id=\"pr-disc\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"90\" step=\"1\" value=\"5\"></label>\n    <label class=\"f\"><span>客户现成的报价（含税，元，可空）</span>\n      <input id=\"pr-cust\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"170\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">建议报价（含税）</span><strong id=\"pr-in\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>对应不含税售价</span><b id=\"pr-ex\">—</b></li>\n      <li><span>单件毛利 / 毛利率</span><b id=\"pr-gp\">—</b></li>\n      <li><span>打完折含税价</span><b id=\"pr-discin\">—</b></li>\n      <li><span>打完折不含税价 / 毛利 / 毛利率</span><b id=\"pr-discgp\">—</b></li>\n      <li><span>保本含税价（毛利率 0）</span><b id=\"pr-be\">—</b></li>\n      <li><span>想保住目标毛利，折扣前得报</span><b id=\"pr-need\">—</b></li>\n      <li><span>按客户现价做，毛利率</span><b id=\"pr-custout\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>折扣</th><th>含税报价</th><th>不含税</th><th>毛利率</th></tr></thead>\n        <tbody id=\"pr-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"pr-note\"></p>\n  </div>\n    </div>\n  </section>\n","multimargin":"  <section class=\"panel\" id=\"panel-multimargin\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（销量填 0 表示这行不用）</h2>\n    <label class=\"f\">\n      <span>产品 1</span>\n      <span class=\"row\">\n        <input id=\"mm-q1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"1000\" placeholder=\"销量\">\n        <input id=\"mm-p1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"100\" placeholder=\"单价(不含税)\">\n        <input id=\"mm-c1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"60\" placeholder=\"单位成本\">\n      </span>\n    </label>\n    <label class=\"f\">\n      <span>产品 2</span>\n      <span class=\"row\">\n        <input id=\"mm-q2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"800\" placeholder=\"销量\">\n        <input id=\"mm-p2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"200\" placeholder=\"单价(不含税)\">\n        <input id=\"mm-c2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"170\" placeholder=\"单位成本\">\n      </span>\n    </label>\n    <label class=\"f\">\n      <span>产品 3</span>\n      <span class=\"row\">\n        <input id=\"mm-q3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"500\" placeholder=\"销量\">\n        <input id=\"mm-p3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"300\" placeholder=\"单价(不含税)\">\n        <input id=\"mm-c3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"310\" placeholder=\"单位成本\">\n      </span>\n    </label>\n    <label class=\"f\">\n      <span>产品 4</span>\n      <span class=\"row\">\n        <input id=\"mm-q4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"0\" placeholder=\"销量\">\n        <input id=\"mm-p4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"80\" placeholder=\"单价(不含税)\">\n        <input id=\"mm-c4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"50\" placeholder=\"单位成本\">\n      </span>\n    </label>\n    <em>每行三个框依次填：销量 / 单价（不含税）/ 单位成本，销量填 0 表示这行不用；要按含税报价比较，先用「发票价税分离」换算</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">综合毛利率（加权）</span><strong id=\"mm-margin\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>总收入 / 总毛利</span><b id=\"mm-total\">—</b></li>\n      <li><span>低于综合毛利率的产品</span><b id=\"mm-lag\">—</b></li>\n      <li><span>负毛利产品</span><b id=\"mm-neg\">—</b></li>\n      <li><span>剔掉负毛利后：收入 / 毛利 / 毛利率</span><b id=\"mm-cut\">—</b></li>\n      <li><span>负毛利产品拉低了几个点</span><b id=\"mm-drag\">—</b></li>\n      <li><span>收入占比最大的产品</span><b id=\"mm-worst\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>产品</th><th>销量</th><th>收入</th><th>毛利</th><th>毛利率</th><th>收入占比</th></tr></thead>\n        <tbody id=\"mm-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"mm-note\"></p>\n  </div>\n    </div>\n  </section>\n","mpbe":"  <section class=\"panel\" id=\"panel-mpbe\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（多产品，元/件）</h2>\n    <label class=\"f\"><span>月固定成本合计（房租、固定工资、折旧等）</span>\n      <input id=\"mb-fc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\"></label>\n    <label class=\"f\"><span>产品 1</span>\n      <span class=\"row\">\n        <input id=\"mb-p1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"100\" placeholder=\"单价\">\n        <input id=\"mb-v1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"60\" placeholder=\"单位变动成本\">\n        <input id=\"mb-q1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"2000\" placeholder=\"销量/件\">\n      </span></label>\n    <label class=\"f\"><span>产品 2</span>\n      <span class=\"row\">\n        <input id=\"mb-p2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"50\" placeholder=\"单价\">\n        <input id=\"mb-v2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"25\" placeholder=\"单位变动成本\">\n        <input id=\"mb-q2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"3000\" placeholder=\"销量/件\">\n      </span></label>\n    <label class=\"f\"><span>产品 3</span>\n      <span class=\"row\">\n        <input id=\"mb-p3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"200\" placeholder=\"单价\">\n        <input id=\"mb-v3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"150\" placeholder=\"单位变动成本\">\n        <input id=\"mb-q3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"500\" placeholder=\"销量/件\">\n      </span></label>\n    <label class=\"f\"><span>想赚到的月利润（元）</span>\n      <input id=\"mb-target\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"50000\"></label>\n    <em>每行三个框依次填：单价 / 单位变动成本 / 销量；固定成本按销售结构分摊，用来判断哪个产品其实在补贴哪个</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">保本销售额（多产品合计）</span><strong id=\"mb-bep\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>加权平均边际贡献率</span><b id=\"mb-cmr\">—</b></li>\n      <li><span>当前销售额 / 边际贡献</span><b id=\"mb-rev\">—</b></li>\n      <li><span>当前利润</span><b id=\"mb-profit\">—</b></li>\n      <li><span>安全边际率（负数表示还没保本）</span><b id=\"mb-mos\">—</b></li>\n      <li><span>离保本还差（金额）</span><b id=\"mb-gap\">—</b></li>\n      <li><span>要赚到设定利润需要卖</span><b id=\"mb-need\">—</b></li>\n      <li><span>固定成本每降 1 万，利润增</span><b id=\"mb-lever\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>产品</th><th>收入</th><th>边际贡献率</th><th>分摊固定</th><th>利润</th><th>保本销量</th></tr></thead>\n        <tbody id=\"mb-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"mb-note\"></p>\n  </div>\n    </div>\n  </section>\n","payroll":"  <section class=\"panel\" id=\"panel-payroll\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（本月工资表汇总，元）</h2>\n    <label class=\"f\"><span>应发工资合计（税前，含奖金补贴）</span>\n      <input id=\"pc-gross\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"500000\"></label>\n    <label class=\"f\"><span>代扣个人社保</span>\n      <input id=\"pc-si\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"52500\"></label>\n    <label class=\"f\"><span>代扣个人公积金</span>\n      <input id=\"pc-hf\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"60000\"></label>\n    <label class=\"f\"><span>代扣个人所得税（工资表上的）</span>\n      <input id=\"pc-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"18000\"></label>\n    <label class=\"f\"><span>其他扣款（罚款、借款、餐费等）</span>\n      <input id=\"pc-other\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"3000\"></label>\n    <label class=\"f\"><span>实发合计（表上、银行代发金额）</span>\n      <input id=\"pc-act\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"366500\"></label>\n    <label class=\"f\"><span>税务系统申报个税（自然人电子税务局数）</span>\n      <input id=\"pc-tax2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"17600\"></label>\n    <label class=\"f\"><span>单位承担社保 / 单位承担公积金</span>\n      <span class=\"row\">\n        <input id=\"pc-cosi\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"120000\">\n        <input id=\"pc-cohf\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"60000\">\n      </span></label>\n    <label class=\"f\"><span>同期营业收入（算人工成本率用）</span>\n      <input id=\"pc-rev\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"3000000\"></label>\n    <label class=\"f\"><span>发薪人数</span>\n      <input id=\"pc-head\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"50\"></label>\n    <em>三步勾稽：应发 − 各项代扣 = 实发；表内个税 = 申报个税；应发 + 单位承担 = 用工总成本</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">应发 − 代扣（应有实发）</span><strong id=\"pc-net\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>与表上实发差额（0 = 平）</span><b id=\"pc-diff\">—</b></li>\n      <li><span>个税申报差异（表内 − 申报）</span><b id=\"pc-taxdiff\">—</b></li>\n      <li><span>代扣合计占应发</span><b id=\"pc-ded\">—</b></li>\n      <li><span>单位承担合计（社保＋公积金）</span><b id=\"pc-co\">—</b></li>\n      <li><span>用工总成本（应发＋单位承担）</span><b id=\"pc-cost\">—</b></li>\n      <li><span>人工成本率（÷ 同期收入）</span><b id=\"pc-rate\">—</b></li>\n      <li><span>人均用工成本</span><b id=\"pc-avg\">—</b></li>\n      <li><span>勾稽结论</span><b id=\"pc-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>金额</th><th>占应发</th></tr></thead>\n        <tbody id=\"pc-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"pc-note\"></p>\n  </div>\n    </div>\n  </section>\n","commission":"  <section class=\"panel\" id=\"panel-commission\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（销售提成方案对比）</h2>\n    <label class=\"f\"><span>销售额（不含税，元）</span>\n      <input id=\"cm-sales\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n    <label class=\"f\"><span>退货率（%）</span>\n      <input id=\"cm-ret\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"5\"></label>\n    <label class=\"f\"><span>毛利率（%）</span>\n      <input id=\"cm-gm\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\"></label>\n    <label class=\"f\"><span>按销售额提成（%）／按毛利提成（%）</span>\n      <span class=\"row\"><input id=\"cm-sr\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"3\">\n        <input id=\"cm-gr\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"10\"></span></label>\n    <label class=\"f\"><span>目标完成率（%）</span>\n      <input id=\"cm-achv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"110\"></label>\n    <label class=\"f\"><span>提成按回款比例发放（%）</span>\n      <input id=\"cm-cash\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"80\"></label>\n    <em>口径：两个方案的提成额相等时对应的毛利率就是「临界毛利率」，高于它按毛利提对销售更有利，低于它按销售额提更有利</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">按毛利提成的提成额</span><strong id=\"cm-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>按销售额提成</span><b id=\"cm-c1\">—</b></li>\n      <li><span>两者差额（销售额法多付）</span><b id=\"cm-gap\">—</b></li>\n      <li><span>临界毛利率</span><b id=\"cm-crit\">—</b></li>\n      <li><span>完成率系数</span><b id=\"cm-coeff\">—</b></li>\n      <li><span>按回款发放后实发（销 / 毛）</span><b id=\"cm-cashout\">—</b></li>\n      <li><span>提成占毛利比（销售额法）</span><b id=\"cm-share\">—</b></li>\n      <li><span>退货后提成基数</span><b id=\"cm-base\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>毛利率</th><th>按销售额提成</th><th>按毛利提成</th><th>差额</th></tr></thead>\n        <tbody id=\"cm-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"cm-note\"></p>\n  </div>\n    </div>\n  </section>\n","importcost":"  <section class=\"panel\" id=\"panel-importcost\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（进口到岸成本）</h2>\n    <label class=\"f\"><span>FOB 货值（美元）</span>\n      <input id=\"ic-fob\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"100000\"></label>\n    <label class=\"f\"><span>国际运费 / 保险费（美元）</span>\n      <span class=\"row\"><input id=\"ic-frt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"5000\">\n        <input id=\"ic-ins\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"1000\"></span></label>\n    <label class=\"f\"><span>汇率（人民币/美元）</span>\n      <input id=\"ic-fx\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"7.1\"></label>\n    <label class=\"f\"><span>关税税率（%）</span>\n      <input id=\"ic-duty\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"8\"></label>\n    <label class=\"f\"><span>消费税税率（%）</span>\n      <input id=\"ic-cons\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"0\"></label>\n    <label class=\"f\"><span>进口增值税率（%）</span>\n      <input id=\"ic-vat\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"13\"></label>\n    <label class=\"f\"><span>港杂费 / 代理费（元）</span>\n      <span class=\"row\"><input id=\"ic-port\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"8000\">\n        <input id=\"ic-agent\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"3000\"></span></label>\n    <label class=\"f\"><span>数量（件）</span>\n      <input id=\"ic-qty\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"100\" value=\"1000\"></label>\n    <em>口径：完税价格按 CIF（货值＋运费＋保险）；进口增值税是可抵扣的，进成本的是关税和港杂，别把它算进单价再报价</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">单位到岸成本（不含可抵扣税）</span><strong id=\"ic-big\">—</strong><span class=\"unit\">元/件</span></div>\n    <ul class=\"kv\">\n      <li><span>CIF 完税价格</span><b id=\"ic-cif\">—</b></li>\n      <li><span>关税</span><b id=\"ic-dutyv\">—</b></li>\n      <li><span>消费税</span><b id=\"ic-consv\">—</b></li>\n      <li><span>进口增值税（可抵扣）</span><b id=\"ic-vatv\">—</b></li>\n      <li><span>港杂 + 代理</span><b id=\"ic-fees\">—</b></li>\n      <li><span>到岸总成本（进存货）</span><b id=\"ic-land\">—</b></li>\n      <li><span>含税现金支出 / 单位含税</span><b id=\"ic-cash\">—</b></li>\n      <li><span>税负占货值比例</span><b id=\"ic-ratio\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>金额（元）</th><th>说明</th></tr></thead>\n        <tbody id=\"ic-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"ic-note\"></p>\n  </div>\n    </div>\n  </section>\n","quotefx":"  <section class=\"panel\" id=\"panel-quotefx\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（出口报价换算）</h2>\n    <label class=\"f\"><span>工厂成本（不含税，元/件）</span>\n      <input id=\"qf-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"100\"></label>\n    <label class=\"f\"><span>数量（件）</span>\n      <input id=\"qf-qty\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"500\" value=\"5000\"></label>\n    <label class=\"f\"><span>国内运费 / 港杂报关（元）</span>\n      <span class=\"row\"><input id=\"qf-dyn\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"8000\">\n        <input id=\"qf-port\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"6000\"></span></label>\n    <label class=\"f\"><span>目标毛利率（% of FOB）</span>\n      <input id=\"qf-gm\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"90\" step=\"1\" value=\"20\"></label>\n    <label class=\"f\"><span>佣金率（%）</span>\n      <input id=\"qf-comm\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"20\" step=\"1\" value=\"3\"></label>\n    <label class=\"f\"><span>汇率（人民币/美元）</span>\n      <input id=\"qf-fx\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"7.1\"></label>\n    <label class=\"f\"><span>海运费（美元）/ 保险费率（%）</span>\n      <span class=\"row\"><input id=\"qf-frt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"3000\">\n        <input id=\"qf-ins\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"0.5\"></span></label>\n    <em>口径：FOB/CIF/CFR 的差别只在「谁付运费保险」；报价一律倒推——先算出要卖多少钱，再换算成条款价</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">CIF 报价单价</span><strong id=\"qf-big\">—</strong><span class=\"unit\">美元/件</span></div>\n    <ul class=\"kv\">\n      <li><span>FOB 总额 / 单价</span><b id=\"qf-fob\">—</b></li>\n      <li><span>佣金</span><b id=\"qf-comv\">—</b></li>\n      <li><span>扣佣后实际毛利率</span><b id=\"qf-real\">—</b></li>\n      <li><span>海运费（折人民币）</span><b id=\"qf-frtv\">—</b></li>\n      <li><span>保险费</span><b id=\"qf-insv\">—</b></li>\n      <li><span>CIF 总额 / 单价</span><b id=\"qf-cif\">—</b></li>\n      <li><span>每件净利</span><b id=\"qf-profit\">—</b></li>\n      <li><span>换汇每跌 0.1 元的影响</span><b id=\"qf-fxrisk\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>人民币</th><th>美元</th></tr></thead>\n        <tbody id=\"qf-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"qf-note\"></p>\n  </div>\n    </div>\n  </section>\n","payout":"  <section class=\"panel\" id=\"panel-payout\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（股东回报与分红，万元）</h2>\n    <label class=\"f\"><span>未分配利润 / 当年净利</span>\n      <span class=\"row\"><input id=\"po-ret\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"1000\">\n        <input id=\"po-np\" type=\"number\" inputmode=\"decimal\" step=\"50\" value=\"300\"></span></label>\n    <label class=\"f\"><span>大股东持股 % / 分红比例 %</span>\n      <span class=\"row\"><input id=\"po-share\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"60\">\n        <input id=\"po-ratio\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"30\"></span></label>\n    <label class=\"f\"><span>股息红利个税 % / 留存再投资回报 %</span>\n      <span class=\"row\"><input id=\"po-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"20\">\n        <input id=\"po-roe\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"10\"></span></label>\n    <label class=\"f\"><span>股东借款年末未还（万元）</span>\n      <input id=\"po-loan\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"200\"></label>\n    <em>口径：分红是「公司交完 25% 企业所得税后，股东再交 20%」；股东借款年底不还又不用于经营，会被视同分红补税</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">分红后大股东到手</span><strong id=\"po-big\">—</strong><span class=\"unit\">万元</span></div>\n    <ul class=\"kv\">\n      <li><span>分红总额 / 个税</span><b id=\"po-div\">—</b></li>\n      <li><span>大股东分得 / 到手</span><b id=\"po-sharev\">—</b></li>\n      <li><span>分红后未分配利润</span><b id=\"po-keep\">—</b></li>\n      <li><span>不分红：留存 / 次年增利</span><b id=\"po-nodiv\">—</b></li>\n      <li><span>留存带给大股东的间接价值</span><b id=\"po-ind\">—</b></li>\n      <li><span>股东借款视同分红风险</span><b id=\"po-risk\">—</b></li>\n      <li><span>综合税负（企业+个人）</span><b id=\"po-alltax\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>方案</th><th>大股东当年到手</th><th>留在公司</th><th>说明</th></tr></thead>\n        <tbody id=\"po-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"po-note\"></p>\n  </div>\n    </div>\n  </section>\n","rebate":"  <section class=\"panel\" id=\"panel-rebate\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（阶梯返利，三档）</h2>\n    <label class=\"f\"><span>客户当前年销售额（万元）</span>\n      <input id=\"reb-base\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"950\"></label>\n    <label class=\"f\"><span>你的毛利率（%）</span>\n      <input id=\"reb-gm\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"30\"></label>\n    <label class=\"f\"><span>第 1 档：门槛 / 返点（%）</span>\n      <span class=\"row\"><input id=\"reb-t1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"800\">\n        <input id=\"reb-p1\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"0.5\" value=\"2\"></span></label>\n    <label class=\"f\"><span>第 2 档：门槛 / 返点（%）</span>\n      <span class=\"row\"><input id=\"reb-t2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"1000\">\n        <input id=\"reb-p2\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"0.5\" value=\"3\"></span></label>\n    <label class=\"f\"><span>第 3 档：门槛 / 返点（%）</span>\n      <span class=\"row\"><input id=\"reb-t3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"1500\">\n        <input id=\"reb-p3\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"0.5\" value=\"5\"></span></label>\n    <em>口径：返点按「全年总销售额」全额计算，不是只算超出部分——所以跨越门槛那一刻，前面卖的量也一起降价</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">最值得冲的那一档净增</span><strong id=\"reb-big\">—</strong><span class=\"unit\">万元</span></div>\n    <ul class=\"kv\">\n      <li><span>当前处于哪一档</span><b id=\"reb-cur\">—</b></li>\n      <li><span>当前返利 / 净毛利</span><b id=\"reb-now\">—</b></li>\n      <li><span>当前实际回款率</span><b id=\"reb-rate\">—</b></li>\n      <li><span>最值得冲的档位</span><b id=\"reb-pick\">—</b></li>\n      <li><span>跨档临界销售额</span><b id=\"reb-crit\">—</b></li>\n      <li><span>建议</span><b id=\"reb-advice\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>档位</th><th>返利额</th><th>净毛利</th><th>净增</th><th>临界销售</th><th>结论</th></tr></thead>\n        <tbody id=\"reb-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"reb-note\"></p>\n  </div>\n    </div>\n  </section>\n","rebateacc":"  <section class=\"panel\" id=\"panel-rebateacc\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（不含税口径）</h2>\n    <label class=\"f\">\n      <span>销售额</span>\n      <input id=\"rba-sales\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"10000000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"rba-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"5\" aria-label=\"合同返利比例\">\n      <input id=\"rba-ach\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"90\" aria-label=\"预计达成率\">\n    </span>\n    <p class=\"hint\">左：合同返利比例（%），右：预计达成概率（%）——按期望值计提，不能等年底一次冲</p>\n    <label class=\"f\">\n      <span>变动成本率（%）</span>\n      <input id=\"rba-vc\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"70\">\n    </label>\n    <span class=\"row\">\n      <input id=\"rba-fee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\" aria-label=\"进场费\">\n      <input id=\"rba-promo\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"400000\" aria-label=\"促销费\">\n    </span>\n    <p class=\"hint\">左：进场费/条码费，右：促销与陈列费</p>\n    <label class=\"f\">\n      <span>导购与人员费用</span>\n      <input id=\"rba-staff\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\">\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">计入渠道后的净毛利</span><strong id=\"rba-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>应计提返利（期望值）</span><b id=\"rba-reb\">—</b></li>\n      <li><span>净销售额</span><b id=\"rba-net\">—</b></li>\n      <li><span>渠道费用合计</span><b id=\"rba-cost\">—</b></li>\n      <li><span>渠道费用率</span><b id=\"rba-cr\">—</b></li>\n      <li><span>返利占毛利</span><b id=\"rba-rg\">—</b></li>\n      <li><span>综合毛利率（费用后）</span><b id=\"rba-gm\">—</b></li>\n      <li><span>全额达成影响</span><b id=\"rba-full\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"rba-note\"></p>\n  </div>\n    </div>\n  </section>\n","headcount":"  <section class=\"panel\" id=\"panel-headcount\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>当前年业务量</span>\n      <input id=\"hc-vol\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"120000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"hc-grow\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"20\" aria-label=\"业务量增长\">\n      <input id=\"hc-eff\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"10\" value=\"500\" aria-label=\"人均年效能\">\n    </span>\n    <p class=\"hint\">左：业务量增长（%），右：人均年效能（单/人·年）</p>\n    <span class=\"row\">\n      <input id=\"hc-now\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"5\" value=\"200\" aria-label=\"现有在岗人数\">\n      <input id=\"hc-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"120000\" aria-label=\"人均年成本\">\n    </span>\n    <p class=\"hint\">左：现有在岗人数，右：人均年综合成本（含社保公积金）</p>\n    <span class=\"row\">\n      <input id=\"hc-turn\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"15\" aria-label=\"离职率\">\n      <input id=\"hc-hire\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"8000\" aria-label=\"单人招聘成本\">\n    </span>\n    <p class=\"hint\">左：年离职率（%），右：单人招聘成本（含渠道、面试、培训期损耗）</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">编制缺口</span><strong id=\"hc-big\">—</strong><span class=\"unit\">人</span></div>\n    <ul class=\"kv\">\n      <li><span>目标业务量 / 需求人数</span><b id=\"hc-need\">—</b></li>\n      <li><span>离职补员</span><b id=\"hc-churn\">—</b></li>\n      <li><span>全年招聘量</span><b id=\"hc-hireout\">—</b></li>\n      <li><span>全年人工预算</span><b id=\"hc-budget\">—</b></li>\n      <li><span>比现在多花的钱</span><b id=\"hc-inc\">—</b></li>\n      <li><span>招聘费用</span><b id=\"hc-hirecost\">—</b></li>\n      <li><span>效能提 10% 可省</span><b id=\"hc-eff10\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"hc-note\"></p>\n  </div>\n    </div>\n  </section>\n","markroi":"  <section class=\"panel\" id=\"panel-markroi\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>渠道投入合计</span>\n      <input id=\"mroi-spend\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1200000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"mroi-new\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"4000\" aria-label=\"获得新客数\">\n      <input id=\"mroi-aov\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"2000\" aria-label=\"客单价\">\n    </span>\n    <p class=\"hint\">左：获得新客数，右：客单价（元/单）</p>\n    <span class=\"row\">\n      <input id=\"mroi-gm\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"40\" aria-label=\"毛利率\">\n      <input id=\"mroi-rep\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"1.5\" aria-label=\"年复购次数\">\n    </span>\n    <p class=\"hint\">左：毛利率（%），右：年均复购次数</p>\n    <label class=\"f\">\n      <span>客户生命周期（年）</span>\n      <input id=\"mroi-life\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"3\">\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">LTV ÷ CAC</span><strong id=\"mroi-big\">—</strong><span class=\"unit\">倍</span></div>\n    <ul class=\"kv\">\n      <li><span>CAC（单个获客成本）</span><b id=\"mroi-cac\">—</b></li>\n      <li><span>首单毛利</span><b id=\"mroi-fg\">—</b></li>\n      <li><span>回本所需单量</span><b id=\"mroi-be\">—</b></li>\n      <li><span>LTV（生命周期毛利）</span><b id=\"mroi-ltv\">—</b></li>\n      <li><span>投入产出比 ROI</span><b id=\"mroi-roi\">—</b></li>\n      <li><span>健康线 CAC（LTV/3）</span><b id=\"mroi-line\">—</b></li>\n      <li><span>带来总收入</span><b id=\"mroi-rev\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"mroi-note\"></p>\n  </div>\n    </div>\n  </section>\n","saleexp":"  <section class=\"panel\" id=\"panel-saleexp\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：两期销售与费用</h2>\n        <span class=\"row\">\n          <label class=\"f\"><span>本期销售收入</span><input id=\"se-sales\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"10000000\"></label>\n          <label class=\"f\"><span>上期销售收入</span><input id=\"se-sales0\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"8000000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>本期销售费用</span><input id=\"se-exp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1200000\"></label>\n          <label class=\"f\"><span>上期销售费用</span><input id=\"se-exp0\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n        </span>\n        <label class=\"f\"><span>毛利率 %</span><input id=\"se-margin\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"30\"></label>\n        <em>口径：边际 ROI = 增量收入 × 毛利率 ÷ 增量销售费用，衡量「多花的每一元费用多赚多少毛利」，&gt;1 才算划算。费用弹性 = 费用增速 ÷ 收入增速，&lt;1 说明费用涨得比收入慢，费效在改善。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果：销售费用投入产出</h2>\n        <div class=\"big\"><span class=\"k\">边际 ROI</span><strong id=\"se-big\">—</strong><span class=\"unit\">倍</span></div>\n        <ul class=\"kv\">\n          <li><span>销售费用率（本期 / 上期）</span><b id=\"se-rate\">—</b></li>\n          <li><span>费用弹性（费用增速 ÷ 收入增速）</span><b id=\"se-elas\">—</b></li>\n          <li><span>增量毛利</span><b id=\"se-newgm\">—</b></li>\n          <li><span>增量净贡献</span><b id=\"se-net\">—</b></li>\n        </ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">指标</th><th>上期</th><th>本期</th><th>变化</th></tr></thead>\n            <tbody id=\"se-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"se-note\"></p>\n      </div>\n    </div>\n  </section>\n","profitcenter":"  <section class=\"panel\" id=\"panel-profitcenter\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>利润中心责任报告</h2>\n        <label class=\"f\"><span>中心 A 收入</span><input id=\"prc-a1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2000000\" class=\"num\"></label>\n        <span class=\"row\"><label class=\"f\"><span>A 变动成本</span><input id=\"prc-b1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1200000\" class=\"num\"></label><label class=\"f\"><span>A 可控固定</span><input id=\"prc-c1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\" class=\"num\"></label></span>\n        <label class=\"f\"><span>A 不可控固定（总部分摊）</span><input id=\"prc-d1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\" class=\"num\"></label>\n        <label class=\"f\"><span>中心 B 收入</span><input id=\"prc-a2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1500000\" class=\"num\"></label>\n        <span class=\"row\"><label class=\"f\"><span>B 变动成本</span><input id=\"prc-b2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"900000\" class=\"num\"></label><label class=\"f\"><span>B 可控固定</span><input id=\"prc-c2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"400000\" class=\"num\"></label></span>\n        <label class=\"f\"><span>B 不可控固定（总部分摊）</span><input id=\"prc-d2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"150000\" class=\"num\"></label>\n        <em>考核只看「可控利润」，总部摊下来的费用列示但不考核。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果</h2>\n        <div class=\"big\"><span class=\"k\">可控利润合计</span><strong id=\"prc-ctrl\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>收入合计</span><b id=\"prc-rev\">—</b></li>\n          <li><span>边际贡献合计</span><b id=\"prc-cm\">—</b></li>\n          <li><span>中心利润合计（减分摊后）</span><b id=\"prc-cen\">—</b></li>\n          <li><span>按可控利润率考核</span><b id=\"prc-best\">—</b></li>\n          <li><span>最该先管</span><b id=\"prc-focus\">—</b></li>\n        </ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th>中心</th><th>收入</th><th>边际贡献</th><th>可控利润</th><th>中心利润</th><th>可控利润率</th></tr></thead>\n            <tbody id=\"prc-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"prc-note\"></p>\n      </div>\n    </div>\n  </section>\n"};
export default { breakeven: calcBreakEven, pricing: calcPricing, multimargin: calcMultiMargin, mpbe: calcMpbe, payroll: calcPayroll, importcost: calcImportCost, quotefx: calcQuoteFx, rebate: calcRebate, payout: calcPayout, commission: calcCommission, rebateacc: calcRebateAcc, headcount: calcHeadcount, markroi: calcMarkRoi, saleexp: calcSaleExp, profitcenter: calcProfitcenter };
