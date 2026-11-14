/* 自动生成，勿手改：acct-report 分类模块（点开才下载） */
const { $, BUILD_TAG, CAT_KEY, CAT_LABEL, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, EDITED, ERR_BOX, FAV_KEY, FIELDS, FIRST_ACTIVATE, KEY, LAST_KEY, MONTH_CATS, MONTH_TABLE, NEXT_OF, PALETTE_EL, PENDING_PARAMS, PRE_KEY, QUOTA_WARNED, RECENT_KEY, SAVE_TIMER, SEARCH_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, TOAST_EL, UNITS, WF_ARCH_KEY, WF_AUTO_IDX, WF_AUTO_LIST, WF_AUTO_STEP, WF_AUTO_TIMER, WF_CUSTNAME_KEY, WF_CUST_KEY, WF_CUST_NAME, WF_DONE, WF_KEY, WF_LAST, WF_LEGACY, WF_MAN_KEY, WF_META_KEY, WF_NOTE_KEY, WF_PATHS, WF_ROLE_KEY, WF_ROLE_READY, WF_SKIP_KEY, XL_ROWS, YEAR_TABLE, _onPanels, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bindWfDnd, bindWfInline, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, buildTabBadges, calcLoan, calcMap, calcWorkflow, clearWfMan, closePalette, cmpTabName, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, diagText, dlJson, doPrint, drawMonthCats, drawMonthStack, drawReportCharts, drawRpMini, drawnMonthlyChart, drawnYearChart, enhanceNums, enhancePanelUi, ensureChunk, evalExpr, favList, fillCmpMod, fillMonthGrid, fillUnits, flash, flushParams, flushSave, fmt, fmtAt, fmtDate, fx, gauss, getWfCust, getWfDone, getWfMan, getWfMeta, getWfNotes, getWfSkip, hashTarget, isFav, lastName, leftAfter, linkTo, loadCmpA, loadSnaps, loadWfArch, loadWfCust, loadWfDone, loadWfMan, loadWfMeta, loadWfNotes, loadWfSkip, loanRows, makeSnap, markBadInputs, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numBlur, numFocus, numInput, numKey, numOf, openPalette, palKey, panelEls, panelParams, parseAmounts, parseDate, parseNum, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, prePanels, presets, printCover, pushRecent, pushSearch, quickOf, rateOf, readJsonFile, readMonthGrid, recentList, recordWf, refreshCounts, refreshTableTools, refreshTrackMods, refreshWfBadge, renderLoanTable, renderNext, renderPalette, renderPresets, renderSearchHist, renderSnapCompare, renderSnapList, renderTrack, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, saveWfCust, savedCat, scrollResultIfDeepLink, searchHist, setCat, setSub, setTheme, showErrorBox, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tabCatLabel, tap, taxBy, toast, toggleWfStep, trimNum, unitFor, updShown, wfArchiveMonth, wfAutoNext, wfAutoStop, wfAutoWalk, wfBar, wfBindCustQ, wfBuildHandoff, wfCarryQuery, wfCsvCell, wfCustNameSave, wfFillCustSel, wfHandoff, wfHandoffCopy, wfHandoffCsv, wfKnownMods, wfLegacyToNew, wfLoad, wfManSave, wfMetaSave, wfMigrateLegacy, wfNoteSave, wfOpenInline, wfPad2, wfRenderSummary, wfSet, wfSkipCurrent, wfSkipSave, wfStepKey, wfStepShare, wfStepState, wfVisiblePaths, yuan, zOf } = window.FC;

  function calcRatios() {
    var rev = Math.max(0, num($("rt-rev"), 0));
    var cogs = Math.max(0, num($("rt-cogs"), 0));
    var npf = num($("rt-np"), 0);
    var ca = Math.max(0, num($("rt-ca"), 0));
    var inv = Math.max(0, num($("rt-inv"), 0));
    var ar = Math.max(0, num($("rt-ar"), 0));
    var cl = Math.max(0, num($("rt-cl"), 0));
    var ta = Math.max(0, num($("rt-ta"), 0));
    var tl = Math.max(0, num($("rt-tl"), 0));
    var eq = num($("rt-eq"), 0);
    if (eq <= 0) eq = ta - tl;

    var gm = rev > 0 ? (rev - cogs) / rev : 0;
    var nm = rev > 0 ? npf / rev : 0;
    var cr = cl > 0 ? ca / cl : 0;
    var qr = cl > 0 ? (ca - inv) / cl : 0;
    var lev = ta > 0 ? tl / ta : 0;
    var roa = ta > 0 ? npf / ta : 0;
    var roe = eq > 0 ? npf / eq : 0;
    var turn = ta > 0 ? rev / ta : 0;
    var mult = eq > 0 ? ta / eq : 0;
    var ard = rev > 0 ? ar / rev * 365 : 0;
    var invd = cogs > 0 ? inv / cogs * 365 : 0;

    $("rt-roe").textContent = pct(roe);
    $("rt-gm").textContent = pct(gm);
    $("rt-nm").textContent = pct(nm);
    $("rt-cr").textContent = fmt(cr, 2);
    $("rt-qr").textContent = fmt(qr, 2);
    $("rt-lev").textContent = pct(lev);
    $("rt-roa").textContent = pct(roa);
    $("rt-ard").textContent = fmt(ard, 1) + " 天";
    $("rt-invd").textContent = fmt(invd, 1) + " 天";
    $("rt-cycle").textContent = fmt(ard + invd, 1) + " 天";

    var rows = [
      ["净利率（赚不赚钱）", pct(nm)],
      ["× 总资产周转率（转得快不快）", fmt(turn, 3) + " 次"],
      ["× 权益乘数（借了多少杠杆）", fmt(mult, 2) + " 倍"],
      ["= ROE（股东回报）", pct(nm * turn * mult)]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td></tr>";
    }
    $("rt-body").innerHTML = html;

    $("rt-note").textContent = "杜邦恒等式：ROE = 净利率 × 总资产周转率 × 权益乘数，三条路都能把 ROE 做上去，但靠加杠杆风险最大。"
      + "周转天数按 365 天算：应收账款周转天数 = 平均应收 ÷ 营业收入 × 365，存货周转天数 = 平均存货 ÷ 营业成本 × 365（用期末数会失真，有条件用期初期末平均）。"
      + "各行业基准差异极大（超市流动比率低于 1 也正常，重工业 2 以上才稳），这里不给标准值，只给你自己的数。";
  }

  function calcRecon() {
    var book = num($("rc-book"), 0);
    var bank = num($("rc-bank"), 0);
    var a = Math.max(0, num($("rc-a"), 0));
    var b = Math.max(0, num($("rc-b"), 0));
    var c = Math.max(0, num($("rc-c"), 0));
    var d = Math.max(0, num($("rc-d"), 0));

    var s1 = book + c - d;
    var s2 = bank + a - b;
    var diff = s1 - s2;

    $("rc-final").textContent = money(s1);
    $("rc-side1").textContent = yuan(s1);
    $("rc-side2").textContent = yuan(s2);
    $("rc-diff").textContent = yuan(diff);
    $("rc-net").textContent = yuan(c - d);
    $("rc-verdict").textContent = Math.abs(diff) < 0.005 ? "两边相等，调节表平，可存档"
      : "不平，差 " + money(Math.abs(diff)) + " 元，要逐笔查";

    var rows = [
      ["企业已收、银行未收（在途支票 / 未到账）", "加在银行对账单侧", a],
      ["企业已付、银行未付（开出未兑付支票）", "减在银行对账单侧", b],
      ["银行已收、企业未收（托收、利息、退款）", "加在企业账面侧", c],
      ["银行已付、企业未付（手续费、代扣）", "减在企业账面侧", d]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" +
        money(rows[i][2]) + "</td></tr>";
    }
    $("rc-body").innerHTML = html;

    $("rc-note").textContent = "调节思路：企业账面余额加「银行已收企业未收」、减「银行已付企业未付」，得到调节后余额；"
      + "银行对账单余额加「企业已收银行未收」、减「企业已付银行未付」，得到同一个数。两边相等说明账没记错。"
      + "不平的常见原因：一方记账金额错、漏记一笔、把收款方记错，或银行扣了年费/短信费没入账。调节表只解决「时间差」，"
      + "真记错的必须做凭证更正，不能靠调节表抹平。";
  }

  function calcExpense() {
    var days = Math.max(1, Math.round(num($("ex-days"), 1)));
    var nights = Math.max(0, Math.round(num($("ex-nights"), 0)));
    var hotel = Math.max(0, num($("ex-hotel"), 0));
    var hstd = Math.max(0, num($("ex-hstd"), 0));
    var mealStd = Math.max(0, num($("ex-meal"), 0));
    var local = Math.max(0, num($("ex-local"), 0));
    var travel = Math.max(0, num($("ex-travel"), 0));
    var other = Math.max(0, num($("ex-other"), 0));

    var hotelTotal = nights * hotel;
    var overPer = Math.max(0, hotel - hstd);
    var over = overPer * nights;
    var hotelOk = hotelTotal - over;
    var meal = days * mealStd;
    var total = hotelTotal + meal + local + travel + other;
    var paid = total - over;
    var vatHotel = Math.round(hotelOk / 1.06 * 0.06 * 100) / 100;
    var vatTravel = Math.round(travel / 1.09 * 0.09 * 100) / 100;
    var vat = vatHotel + vatTravel;
    var cost = paid - vat;

    $("ex-paid").textContent = money(paid);
    $("ex-total").textContent = yuan(total);
    $("ex-over").textContent = over > 0.005 ? yuan(over) : "无超标";
    $("ex-vat").textContent = yuan(vat) + "（住宿 " + money(vatHotel) + " + 交通 " + money(vatTravel) + "）";
    $("ex-cost").textContent = yuan(cost);
    $("ex-day").textContent = yuan(paid / days);

    var rows = [
      ["住宿", money(hotel) + " × " + nights + " 晚", money(hotelOk),
        over > 0.005 ? "超标 " + money(overPer) + "/晚，共 " + money(over) + " 自付" : "未超标"],
      ["餐补", money(mealStd) + " × " + days + " 天", money(meal), "按天包干，不用票"],
      ["市内交通", "—", money(local), "打车/地铁，可凭票"],
      ["城际交通", "—", money(travel), "火车/机票，9% 可抵扣"],
      ["其他", "—", money(other), "杂费"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" +
        rows[i][2] + "</td><td>" + rows[i][3] + "</td></tr>";
    }
    html += "<tr><td><b>合计</b></td><td>—</td><td><b>" + money(paid) + "</b></td><td>已扣超标 " +
      money(over) + "</td></tr>";
    $("ex-body").innerHTML = html;

    $("ex-note").textContent = "报销口径：住宿、城际交通按含税金额报销，但只有取得增值税专用发票（或按规定可抵扣的客票）"
      + "才能抵扣进项税——住宿 6%、铁路/航空运输 9%，餐补和餐饮发票不能抵扣。所以同样一张 1,350 元的住宿单，"
      + "专票比普票给公司省 " + money(vatHotel) + " 元，这也是财务催着要专票的原因。"
      + "超标部分属于个人消费，不能报销也不能抵税；若要税前扣除，还得并入工资薪金代扣个税。";
  }

  function calcTripleDe() {
    var np = num($("td-np"), 0), da = num($("td-da"), 0);
    var ar = num($("td-ar"), 0), inv = num($("td-inv"), 0), ap = num($("td-ap"), 0);
    var cfo = num($("td-cfo"), 0), cfi = num($("td-cfi"), 0), cff = num($("td-cff"), 0);
    var c0 = num($("td-cash0"), 0), c1 = num($("td-cash1"), 0);
    var ta = num($("td-ta"), 0), tl = num($("td-tl"), 0), te = num($("td-te"), 0);

    var cfoInd = np + da - ar - inv + ap;
    var net = cfo + cfi + cff;
    var c1exp = c0 + net;
    var tlte = tl + te;
    var d1 = cfo - cfoInd, d2 = c1 - c1exp, d3 = ta - tlte;
    var ok1 = Math.abs(d1) < 0.5, ok2 = Math.abs(d2) < 0.5, ok3 = Math.abs(d3) < 0.5;

    $("td-net").textContent = money(net);
    $("td-cfoind").textContent = yuan(cfoInd);
    $("td-d1").textContent = ok1 ? "0.00 元（平）" : money(d1) + " 元（不平）";
    $("td-sum").textContent = yuan(net);
    $("td-c1").textContent = money(c1exp) + " / " + money(c1) + " 元";
    $("td-d2").textContent = ok2 ? "0.00 元（平）" : money(d2) + " 元（不平）";
    $("td-d3").textContent = ok3 ? "0.00 元（平）" : money(d3) + " 元（不平）";

    var bad = [];
    if (!ok1) bad.push("经营现金流");
    if (!ok2) bad.push("现金净增加");
    if (!ok3) bad.push("资产负债表");
    $("td-verdict").textContent = bad.length === 0
      ? "三处都平，可以直接交表"
      : "有 " + bad.length + " 处不平：" + bad.join("、") + "，先查这几处再交表";

    var rows = [
      ["经营现金流：间接法 vs 表上", cfoInd, cfo, d1, ok1,
        "差额先看应收/存货/应付的变动有没有漏项，再看有没有把投资、筹资的现金流记进经营"],
      ["期末现金：期初＋三项 vs 期末", c1exp, c1, d2, ok2,
        "差额通常是受限资金、票据保证金没剔除，或者内部账户调拨没抵销"],
      ["资产 = 负债 + 所有者权益", tlte, ta, d3, ok3,
        "差额多半是本年利润没结转、或者待处理财产损溢还挂着没清"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      html += "<tr" + (r[4] ? "" : ' class="c-soft"') +
        "><td>" + r[0] + "</td><td>" + money(r[1]) + "</td><td>" + money(r[2]) +
        "</td><td>" + money(r[3]) + "</td><td>" + (r[4] ? "平" : "不平") + "</td></tr>";
    }
    $("td-body").innerHTML = html;

    var worst = "";
    if (!ok1) worst = "间接法差 " + money(d1) + " 元（" + rows[0][5] + "）。";
    else if (!ok2) worst = "期末现金差 " + money(d2) + " 元（" + rows[1][5] + "）。";
    else if (!ok3) worst = "资产负债表差 " + money(d3) + " 元（" + rows[2][5] + "）。";
    $("td-note").textContent = worst +
      "三张表的关系是：净利润经折旧摊销和营运资本变动调成经营现金流，经营＋投资＋筹资＝现金净增加，现金净增加接上期初就是期末；资产永远等于负债加权益。" +
      "实务里最常见的不平，一是现金流量表用「直接法」填了、附注的间接法没对上，二是本币折算差额和受限资金没单列。" +
      "这里只验四项主要调整，坏账计提、公允价值变动、投资收益、财务费用这些非付现和筹资性项目要自己补进去。";
  }

  function calcFinReport() {
    var rev = num($("pl-rev"), 0);
    var cogs = Math.max(0, num($("pl-cogs"), 0));
    var taxS = Math.max(0, num($("pl-tax"), 0));
    var se = Math.max(0, num($("pl-se"), 0));
    var ae = Math.max(0, num($("pl-ae"), 0));
    var rd = Math.max(0, num($("pl-rd"), 0));
    var fe = Math.max(0, num($("pl-fe"), 0));
    var oi = num($("pl-oi"), 0);
    var noi = num($("pl-noi"), 0);
    var noe = Math.max(0, num($("pl-noe"), 0));
    var tr = Math.max(0, Math.min(50, num($("pl-tr"), 25))) / 100;

    var gp = rev - cogs;
    var gm = rev > 0 ? gp / rev : 0;
    var op = gp - taxS - se - ae - rd - fe + oi;
    var nonOp = noi - noe;
    var tp = op + nonOp;
    var tax = tp > 0 ? tp * tr : 0;
    var np = tp - tax;

    $("pl-np").textContent = money(np) + " 元" + (np < 0 ? "（亏损）" : "");
    $("pl-gp").textContent = money(gp) + " 元 / " + pct(gm);
    $("pl-op").textContent = yuan(op);
    $("pl-tp").textContent = yuan(tp);
    $("pl-taxnp").textContent = money(tax) + " 元 / " + (rev > 0 ? pct(np / rev) : "—");
    $("pl-fee").textContent = money(se + ae + fe) + " 元 / " + (rev > 0 ? pct((se + ae + fe) / rev) : "—");

    var fixedCost = taxS + se + ae + rd + fe;
    $("pl-be").textContent = gm > 0 ? yuan(fixedCost / gm) + "（现收入 " + money(rev) + "）" : "毛利率≤0，涨价或降本前无保本点";

    var rows = [
      ["营业收入", rev],
      ["营业成本", -cogs],
      ["毛利", gp],
      ["税金及附加", -taxS],
      ["销售费用", -se],
      ["管理费用", -ae],
      ["研发费用", -rd],
      ["财务费用", -fe],
      ["其他收益 / 投资收益", oi],
      ["营业利润", op],
      ["营业外收支净额", nonOp],
      ["利润总额", tp],
      ["所得税", -tax],
      ["净利润", np]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      var name = rows[i][0], v = rows[i][1];
      var bold = (name === "毛利" || name === "营业利润" || name === "利润总额" || name === "净利润");
      var bg = bold ? ' class="c-info"' : "";
      html += "<tr" + bg + "><td class=\"tal\">" + (bold ? "<strong>" + name + "</strong>" : name) +
        "</td><td>" + money(v) + "</td><td>" + (rev > 0 ? pct(v / rev) : "—") + "</td></tr>";
    }
    $("pl-body").innerHTML = html;

    var verdict;
    if (np >= 0 && tp > 0) verdict = "本月赚钱，净利率 " + (rev > 0 ? pct(np / rev) : "—") + "。";
    else if (np < 0 && op > 0) verdict = "营业是赚的，被营业外收支拖成亏损，看看是哪笔一次性支出。";
    else verdict = "本月亏损 " + money(-np) + " 元，先看毛利是否为正，再看费用能不能压。";

    $("pl-note").textContent = verdict +
      " 三费（销售+管理+财务）合计 " + money(se + ae + fe) + " 元，占收入 " + (rev > 0 ? pct((se + ae + fe) / rev) : "—") +
      "，这通常是费用管控的主战场。保本收入 " + (gm > 0 ? money(fixedCost / gm) : "—") +
      " 元是按「毛利额刚好覆盖税金及附加和四项费用」倒算的，收入低于它就是亏。" +
      "这份表是管理口径粗表：所得税按利润总额直接乘税率，没考虑纳税调整、亏损弥补、递延所得税；" +
      "发给老板看够了，报税和申报请用正式财务报表口径，小微企业所得税优惠按当地当期政策确认税率。";
  }

  function calcExpBudget() {
    var names = ["人工成本", "租金水电", "市场推广", "差旅交通", "办公及其他"];
    var b = [], a = [], i;
    for (i = 1; i <= 5; i++) {
      b.push(Math.max(0, num($("eb-b" + i), 0)));
      a.push(Math.max(0, num($("eb-a" + i), 0)));
    }
    var tb = 0, ta = 0;
    for (i = 0; i < 5; i++) { tb += b[i]; ta += a[i]; }
    var diff = ta - tb;
    var rate = tb > 0 ? diff / tb : 0;

    var overCnt = 0, overSum = 0, saveCnt = 0, saveSum = 0;
    var topAmt = -Infinity, topName = "—", topRate = -Infinity, topRateName = "—";
    var html = "";
    for (i = 0; i < 5; i++) {
      var d = a[i] - b[i];
      var r = b[i] > 0 ? d / b[i] : (a[i] > 0 ? 1 : 0);
      if (d > 0) { overCnt++; overSum += d; if (d > topAmt) { topAmt = d; topName = names[i]; } }
      if (d < 0) { saveCnt++; saveSum += -d; }
      if (r > topRate && d > 0) { topRate = r; topRateName = names[i]; }
      var bad = d > 0 && r >= 0.1;
      html += "<tr" + (bad ? ' class="c-bad"' : "") + "><td>" + names[i] + "</td><td>" + money(b[i]) +
        "</td><td>" + money(a[i]) + "</td><td>" + (d > 0 ? "+" : "") + money(d) + "</td><td>" + pct(r) + "</td></tr>";
    }
    html += "<tr><td>合计</td><td>" + money(tb) + "</td><td>" + money(ta) + "</td><td>" +
      (diff > 0 ? "+" : "") + money(diff) + "</td><td>" + pct(rate) + "</td></tr>";

    $("eb-diff").textContent = (diff > 0 ? "+" : "") + money(diff) + " 元（" + (diff > 0 ? "不利" : (diff < 0 ? "有利" : "持平")) + "）";
    $("eb-total").textContent = money(tb) + " / " + money(ta) + " 元";
    $("eb-rate").textContent = pct(rate);
    $("eb-over").textContent = overCnt + " 个 / " + money(overSum) + " 元";
    $("eb-save").textContent = saveCnt + " 个 / " + money(saveSum) + " 元";
    $("eb-top").textContent = overCnt > 0 ? topName + " +" + money(topAmt) + " 元" : "无超支";
    $("eb-toprate").textContent = topRateName !== "—" ? topRateName + " " + pct(topRate) : "无超支";
    $("eb-cut").textContent = diff > 0 ? money(diff) + " 元（或收入侧同步提上去）" : "已经低于预算，不用砍";
    $("eb-body").innerHTML = html;

    var adv;
    if (tb <= 0) adv = "先填预算数，否则没有基准可比。";
    else if (rate >= 0.1) adv = "整体超预算 " + pct(rate) + "，先看是量涨了（业务扩张，算好事）还是价涨了/管不住。";
    else if (rate > 0) adv = "整体小幅超支 " + pct(rate) + "，可控，盯住超支率最高的那一项就行。";
    else adv = "整体在预算内，节余 " + money(-diff) + " 元，注意别为了省钱把该投的（推广、研发）砍掉了。";

    $("eb-note").textContent = adv +
      " 看预算差异先分「量差」和「价差」：收入涨了带来的费用增加是良性的，收入没动费用却涨才是问题。超支率 ≥10% 的科目要业务写原因（用红色行标出来了）。" +
      " 另外注意口径：预算里含不含税、含不含分摊、是不是同一个期间（月度 vs 累计），口径不一致比出来的差异没有意义。" +
      " 费用超支不等于浪费——推广费超支但带来更多新单，是投资；最怕的是人工和办公这类固定费用悄悄涨上去，砍起来很难。";
  }

  function calcEfficiency() {
    var rev = Math.max(0, num($("ef-rev"), 0));
    var head = Math.max(1, num($("ef-head"), 1));
    var labor = Math.max(0, num($("ef-labor"), 0));
    var opex = Math.max(0, num($("ef-opex"), 0));
    var gross = Math.max(0, num($("ef-gross"), 0));
    var net = num($("ef-net"), 0);

    var rph = rev / head, gph = gross / head, nph = net / head, lph = labor / head;
    var lrate = rev > 0 ? labor / rev : 0;
    var orate = rev > 0 ? opex / rev : 0;
    var lever = labor > 0 ? rev / labor : 0;
    var glever = labor > 0 ? gross / labor : 0;
    var nlever = labor > 0 ? net / labor : 0;
    var be = (labor + opex) / head;
    var cov = be > 0 ? rph / be : 0;

    $("ef-rph").textContent = money(rph) + " 元";
    $("ef-rphm").textContent = money(rph / 12) + " 元";
    $("ef-gph").textContent = money(gph) + " / " + money(nph) + " 元";
    $("ef-lph").textContent = money(lph) + " 元（月 " + money(lph / 12) + "）";
    $("ef-lrate").textContent = pct(lrate);
    $("ef-orate").textContent = pct(orate);
    $("ef-lever").textContent = fmt(lever, 2) + " 元 / " + fmt(glever, 2) + " 元 / " + fmt(nlever, 2) + " 元";
    $("ef-be").textContent = money(be) + " 元";
    $("ef-cov").textContent = fmt(cov, 2) + " 倍" + (cov < 1.2 ? "（离保本线太近）" : "");

    var rows = [
      ["人均创收", money(rph) + " 元/年", "核心人效指标，跟同行比才有意义"],
      ["人工成本率", pct(lrate), "人力密集型 15–25% 属常见区间，超 30% 要查结构"],
      ["期间费用率", pct(orate), "费用吃掉多少收入，逐月看趋势比看单月有用"],
      ["每元人工创收", fmt(lever, 2) + " 元", "低于 3 元说明人工没被充分用起来"],
      ["保本人均创收", money(be) + " 元", "人均低于这条线，整家公司就在亏"],
      ["人均净利", money(nph) + " 元", "真金白银的人均贡献"]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      html += "<tr><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td></tr>";
    }
    $("ef-body").innerHTML = html;

    var adv;
    if (rev <= 0) adv = "先把收入填上。";
    else if (net < 0) adv = "现在是亏的：人均创收 " + money(rph) + " 元低于保本线 " + money(be) + " 元，要么加收入、要么减人头。";
    else if (cov < 1.2) adv = "刚过保本线，利润对收入波动极其敏感，一张大单丢了就可能转亏。";
    else adv = "人效在保本线以上 " + fmt(cov, 2) + " 倍，重点转向提毛利而不是单纯加人。";

    $("ef-note").textContent = adv +
      " 三个关系要记住：① 人均创收看效率，人均净利看质量，两个都涨才是真改善；② 人工成本率 = 人工 ÷ 收入，加人前先算新增人头要带来多少收入才回本——按当前人工成本率，多加 1 个人要多做 " +
      money(lph / (lrate > 0 ? lrate : 1)) + " 元收入才不摊薄；③ 期间费用率要和控制线一起看，费用率下降如果是靠砍推广换来的，明年收入就会掉。" +
      " 提醒：期间费用里通常已经包含人工成本（销售人员工资、管理人员工资），如果这里填的是「含人工」的三费，人工成本率与费用率会重叠，别相加；真正的总负担是「人工 + 非人工费用」。" +
      " 人效高低受业务模式影响极大（贸易、代工、软件差十倍很正常），只能和自己的历史、和同行业比。";
  }

  function calcCashStmt() {
    var sale = Math.max(0, num($("cs-sale"), 0));
    var othin = Math.max(0, num($("cs-othin"), 0));
    var buy = Math.max(0, num($("cs-buy"), 0));
    var pay = Math.max(0, num($("cs-pay"), 0));
    var tax = Math.max(0, num($("cs-tax"), 0));
    var othout = Math.max(0, num($("cs-othout"), 0));
    var capex = Math.max(0, num($("cs-capex"), 0));
    var invpay = Math.max(0, num($("cs-invpay"), 0));
    var invback = Math.max(0, num($("cs-invback"), 0));
    var borrow = Math.max(0, num($("cs-borrow"), 0));
    var repay = Math.max(0, num($("cs-repay"), 0));
    var div = Math.max(0, num($("cs-div"), 0));
    var begin = num($("cs-begin"), 0);

    var opIn = sale + othin, opOut = buy + pay + tax + othout, op = opIn - opOut;
    var invIn = invback, invOut = capex + invpay, inv = invIn - invOut;
    var finIn = borrow, finOut = repay + div, fin = finIn - finOut;
    var net = op + inv + fin;
    var end = begin + net;
    var fcf = op - capex;

    $("cs-end").textContent = money(end) + " 元";
    $("cs-op").textContent = (op >= 0 ? "+" : "") + money(op) + " 元" + (op >= 0 ? "（造血）" : "（失血，重点查）");
    $("cs-inv").textContent = (inv >= 0 ? "+" : "") + money(inv) + " 元";
    $("cs-fin").textContent = (fin >= 0 ? "+" : "") + money(fin) + " 元";
    $("cs-net").textContent = (net >= 0 ? "+" : "") + money(net) + " 元";
    $("cs-fcf").textContent = (fcf >= 0 ? "+" : "") + money(fcf) + " 元" + (fcf >= 0 ? "（自己养得起投资）" : "（投资靠融资或老本撑着）");
    $("cs-io").textContent = money(opIn) + " / " + money(opOut) + " 元";

    var type;
    if (op > 0 && inv < 0 && fin < 0) type = "成熟期：经营造血、投产能、还债分红，最健康的结构";
    else if (op > 0 && inv < 0 && fin > 0) type = "扩张期：经营为正还在借钱投产能，要看投的东西能不能产生回报";
    else if (op < 0 && inv < 0) type = "危险：经营失血还在往外投，靠融资或老本兜，尽快止血";
    else if (op < 0 && fin > 0) type = "靠融资续命：经营现金为负，靠借钱维持，先查应收和存货";
    else if (op > 0 && inv > 0 && fin < 0) type = "收缩期：变卖资产、还债，通常是主动瘦身";
    else type = "混合型：三项方向不典型，逐笔看大额收支";
    $("cs-type").textContent = type;

    var rows = [
      ["经营活动", opIn, opOut, op],
      ["投资活动", invIn, invOut, inv],
      ["筹资活动", finIn, finOut, fin],
      ["合计", opIn + invIn + finIn, opOut + invOut + finOut, net]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var neg = rows[i][3] < 0;
      html += "<tr" + (neg ? ' class="c-bad"' : "") + "><td>" + rows[i][0] + "</td><td>" + money(rows[i][1]) +
        "</td><td>" + money(rows[i][2]) + "</td><td>" + (rows[i][3] >= 0 ? "+" : "") + money(rows[i][3]) + "</td></tr>";
    }
    $("cs-body").innerHTML = html;

    $("cs-note").textContent =
      " 期末现金 " + money(end) + " 元（期初 " + money(begin) + " + 本期净增加 " + money(net) + "）。" +
      "看现金流量表只看一件事：经营现金流是否为正、并且能不能覆盖资本开支。经营净额为正是「造血」，为负说明主营业务在烧钱，利润表再好看也是应收账款和存货堆出来的。" +
      "几个容易填错的口径：① 只算真金白银的进出，赊销赊购不进这张表；② 利息支出、分红放在筹资活动（现行准则口径），不要算进经营；③ 购建固定资产只看付现部分，欠供应商的设备款不算；" +
      "④ 银行承兑汇票、受限资金（保证金）不属于现金等价物，要剔除。" +
      " 交叉验证：间接法下「净利润 + 折旧摊销 − 营运资本增加」应接近经营净额，差太多就说明有非现金项目没调（如资产减值、公允价值变动、投资收益）。";
  }

  function calcMonthClose() {
    var total = Math.max(1, num($("mw-total"), 1));
    var done = Math.max(0, Math.min(total, num($("mw-done"), 0)));
    var key = Math.max(0, num($("mw-key"), 0));
    var days = Math.max(0, num($("mw-days"), 0));
    var per = Math.max(0.01, num($("mw-per"), 0.35));
    var people = Math.max(1, num($("mw-people"), 1));

    var left = total - done;
    var hours = left * per;
    var need = hours / people;
    var slip = days - need;
    var pctDone = done / total;

    $("mw-pct").textContent = pct(pctDone);
    $("mw-left").textContent = left + " 项 / 关键 " + key + " 项";
    $("mw-hours").textContent = fmt(hours, 2) + " 人日";
    $("mw-need").textContent = fmt(need, 2) + " 天（" + people + " 人并行）";
    $("mw-slip").textContent = fmt(slip, 2) + " 天";

    var risk, verdict;
    if (key > 0 && slip < 0) { risk = "高：关键项没做完，且时间不够"; verdict = "把关键项先挑出来专人盯，其余延后或简化"; }
    else if (key > 0) { risk = "中：时间够，但关键项还在手上"; verdict = "关键项今天必须动，别留到最后一天"; }
    else if (slip < 0) { risk = "中：没有关键项，但时间不够"; verdict = "加人或者把非关键项放到下月补"; }
    else { risk = "低：按计划能完成"; verdict = "按清单顺序推进即可"; }
    $("mw-risk").textContent = risk;
    $("mw-verdict").textContent = verdict;

    var html = "", d, needP, ok;
    for (d = 1; d <= 5; d++) {
      needP = Math.ceil(hours / d);
      ok = d >= Math.min(days, 99) && needP <= people * 2 ? "能" : (needP <= people ? "能" : "人手不够");
      html += "<tr" + (ok === "能" ? "" : ' class="c-warn"') + "><td>" + d + " 天</td><td>" + needP + " 人</td><td>" + ok + "</td></tr>";
    }
    $("mw-body").innerHTML = html;

    $("mw-note").textContent =
      " 关账不是「做完 24 件事」，而是「在截止日前把关报表的那几件做完」。当前完成 " + done + "/" + total + "，" + pct(pctDone) + "，剩 " + left + " 项共 " + fmt(hours, 2) +
      " 人日，按 " + people + " 人并行要 " + fmt(need, 2) + " 天，距截止 " + fmt(days, 0) + " 天" + (slip >= 0 ? "，还有 " + fmt(slip, 2) + " 天空余。" : "，已经来不及 " + fmt(-slip, 2) + " 天。") +
      " 关账必做的五项：存货暂估与出入库截止、折旧摊销计提、往来对账与坏账计提、税金计提（增值税/附加/所得税）、收入成本截止测试（跨期单据）。" +
      " 想快就三招：把能自动化的（折旧、摊销、税金）固化成模板；能提前的（对账、暂估）月中就开始；实在不行先出「初版报表」标注待调整项，别为了完美误了申报期。";
  }

  function calcMgmtPack() {
    var rev = Math.max(0, num($("pk-rev"), 0));
    var bud = Math.max(0, num($("pk-bud"), 0));
    var ly = Math.max(0, num($("pk-ly"), 0));
    var gm = num($("pk-gm"), 0);
    var net = num($("pk-net"), 0);
    var ar = Math.max(0, num($("pk-ar"), 0));
    var inv = Math.max(0, num($("pk-inv"), 0));
    var cfo = num($("pk-cfo"), 0);

    var ach = bud > 0 ? rev / bud : NaN;
    var yoy = ly > 0 ? (rev - ly) / ly : NaN;
    var gmr = rev > 0 ? gm / rev : NaN;
    var nmr = rev > 0 ? net / rev : NaN;
    var cogs = rev - gm;
    var dso = rev > 0 ? ar / rev * 30 : NaN;
    var dio = cogs > 0 ? inv / cogs * 30 : NaN;
    var cycle = (isFinite(dso) ? dso : 0) + (isFinite(dio) ? dio : 0);

    $("pk-ach").textContent = isFinite(ach) ? pct(ach) : "—";
    $("pk-yoy").textContent = isFinite(yoy) ? (yoy >= 0 ? "+" : "") + pct(yoy) : "—";
    $("pk-margin").textContent = pct(gmr) + " / " + pct(nmr);
    $("pk-dso").textContent = isFinite(dso) ? fmt(dso, 1) + " 天" : "—";
    $("pk-dio").textContent = isFinite(dio) ? fmt(dio, 1) + " 天" : "—";
    $("pk-cycle").textContent = fmt(cycle, 1) + " 天";
    $("pk-cash").textContent = money(cfo) + " 元 vs 净利 " + money(net) + " 元" + (cfo < net ? "（现金没跟上利润）" : "（现金比利润好）");

    var focus = [];
    if (isFinite(ach) && ach < 0.95) focus.push("收入没达成，查大单丢在哪");
    if (isFinite(gmr) && gmr < 0.25) focus.push("毛利率偏低，查降价与成本");
    if (cfo < 0) focus.push("经营现金流为负，先问应收和存货");
    if (isFinite(dso) && dso > 60) focus.push("应收账款回款慢（DSO " + fmt(dso, 1) + " 天）");
    if (isFinite(dio) && dio > 60) focus.push("存货压得多（DIO " + fmt(dio, 1) + " 天）");
    $("pk-focus").textContent = focus.length ? focus.join("；") : "各项正常，按计划推进";

    var rows = [
      ["收入达成率", isFinite(ach) ? pct(ach) : "—", "100%", isFinite(ach) && ach >= 1 ? "达成" : "未达成"],
      ["收入同比", isFinite(yoy) ? pct(yoy) : "—", "正增长", isFinite(yoy) && yoy > 0 ? "增长" : "下滑"],
      ["毛利率", pct(gmr), "≥ 25%", isFinite(gmr) && gmr >= 0.25 ? "可以" : "偏低"],
      ["净利率", pct(nmr), "≥ 5%", isFinite(nmr) && nmr >= 0.05 ? "可以" : "偏薄"],
      ["应收周转天数", isFinite(dso) ? fmt(dso, 1) + " 天" : "—", "≤ 60 天", isFinite(dso) && dso <= 60 ? "正常" : "偏慢"],
      ["存货周转天数", isFinite(dio) ? fmt(dio, 1) + " 天" : "—", "≤ 60 天", isFinite(dio) && dio <= 60 ? "正常" : "偏慢"],
      ["经营现金流", money(cfo) + " 元", "≥ 净利润", cfo >= net ? "健康" : "需解释"]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var bad = rows[i][3] === "未达成" || rows[i][3] === "下滑" || rows[i][3] === "偏低" || rows[i][3] === "偏薄" || rows[i][3] === "偏慢" || rows[i][3] === "需解释";
      html += "<tr" + (bad ? ' class="c-warn"' : "") + "><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td>" + rows[i][3] + "</td></tr>";
    }
    $("pk-body").innerHTML = html;

    $("pk-note").textContent =
      " 一句话开场：收入 " + money(rev) + " 元，达成 " + (isFinite(ach) ? pct(ach) : "—") + "，同比 " + (isFinite(yoy) ? pct(yoy) : "—") +
      "；毛利率 " + pct(gmr) + "、净利率 " + pct(nmr) + "；经营现金流 " + money(cfo) + " 元。" +
      " 开会顺序建议：先看收入（卖得怎么样）→ 再看毛利（价格和成本谁在动）→ 再看现金（利润是真的吗）→ 最后看应收存货（钱压在哪）。" +
      " 最容易糊弄过去的一页就是「有利润没现金」：本例净利 " + money(net) + " 元但经营现金流 " + money(cfo) + " 元，" +
      "差额要靠应收（" + money(ar) + "）和存货（" + money(inv) + "）解释清楚，说不清就是账没做实。" +
      " 口径提醒：DSO 用「应收 ÷ 收入 × 30」、DIO 用「存货 ÷ 营业成本 × 30」，分母别都用收入；" +
      "现金周期严格口径还要减应付账款周转天数（DPO），本页没减，所以算是偏保守的上限。";
  }

  function calcSens() {
    var rev = Math.max(0, num($("sens-rev"), 0));
    var vr = Math.min(1, Math.max(0, num($("sens-vr"), 0) / 100));
    var fix = Math.max(0, num($("sens-fix"), 0));
    var shock = Math.abs(num($("sens-shock"), 5)) / 100;
    var target = Math.abs(num($("sens-target"), 20)) / 100;

    function npOf(r, v, f) { return r * (1 - v) - f; }
    var np0 = npOf(rev, vr, fix);
    var be = (1 - vr) > 0 ? fix / (1 - vr) : 0;
    var mos = rev > 0 ? (rev - be) / rev : 0;
    var cm = rev * (1 - vr);
    var lev = np0 !== 0 ? cm / np0 : 0;

    var ePrice = (npOf(rev * 1.01, vr, fix) - np0) / (np0 !== 0 ? np0 : 1) / 0.01;
    var eVc = (npOf(rev, vr * 1.01, fix) - np0) / (np0 !== 0 ? np0 : 1) / 0.01;
    var eFix = (npOf(rev, vr, fix * 1.01) - np0) / (np0 !== 0 ? np0 : 1) / 0.01;

    var targetNP = np0 * (1 + target);
    var needRev = (1 - vr) > 0 ? (targetNP + fix) / (1 - vr) : 0;
    var needVr = rev > 0 ? 1 - (targetNP + fix) / rev : 0;

    $("sens-big").textContent = money(np0);
    $("sens-be").textContent = yuan(be) + "（占当前 " + pct(rev > 0 ? be / rev : 0, 1) + "）";
    $("sens-mos").textContent = pct(mos, 2) + (mos < 0.2 ? "（薄，收入再掉两成见红）" : "（有缓冲）");
    $("sens-lev").textContent = fmt(lev, 2) + " 倍（收入跌 1%，净利跌 " + fmt(lev, 1) + "%）";
    $("sens-e-price").textContent = fmt(ePrice, 2) + " 倍";
    $("sens-e-vc").textContent = fmt(eVc, 2) + " 倍";
    $("sens-e-fix").textContent = fmt(eFix, 2) + " 倍";
    $("sens-need-rev").textContent = rev > 0 ? "+" + pct(needRev / rev - 1, 2) + "（到 " + money(needRev) + " 元）" : "—";
    $("sens-need-vr").textContent = needVr >= 0 ? pct(needVr, 2) + "（现为 " + pct(vr, 2) + "）" : "只降本做不到，收入也得涨";

    var cases = [
      ["售价 −" + pct(shock, 0), rev * (1 - shock), vr, fix],
      ["售价 +" + pct(shock, 0), rev * (1 + shock), vr, fix],
      ["销量 +" + pct(shock, 0), rev * (1 + shock), vr, fix],
      ["销量 −" + pct(shock, 0), rev * (1 - shock), vr, fix],
      ["变动成本率 +" + pct(shock, 0), rev, Math.min(1, vr * (1 + shock)), fix],
      ["固定成本 +" + pct(shock, 0), rev, vr, fix * (1 + shock)]
    ];
    var html = "";
    for (var i = 0; i < cases.length; i++) {
      var npv = npOf(cases[i][1], cases[i][2], cases[i][3]);
      var d = np0 !== 0 ? (npv - np0) / Math.abs(np0) : 0;
      var cls = d < 0 ? ' class="c-warn"' : "";
      html += "<tr" + cls + "><td class=\"tal\">" + cases[i][0] + "</td><td>" + (i < 2 ? "价格" : i < 4 ? "数量" : "成本") + "</td><td>"
        + money(npv) + "</td><td>" + (d >= 0 ? "+" : "") + pct(d, 2) + "</td></tr>";
    }
    $("sens-body").innerHTML = html;

    $("sens-note").textContent = "同样的 5%，落在不同变量上差别能到两三倍：售价和销量各 1% 对净利的影响一样（都是边际贡献率的倒数），"
      + "但降价还能换量、滞销只能靠降价，所以先动价格要看需求弹性。变动成本率最狠——它每 1 个点吃的是收入的 1%，不是成本的 1%。"
      + "固定成本看起来温和，但它决定了保本点，收入一掉就立刻放大亏损。";
  }

  function calcConsol() {
    var pmRev = Math.max(0, num($("cons-pm-rev"), 0));
    var subRev = Math.max(0, num($("cons-sub-rev"), 0));
    var inter = Math.max(0, num($("cons-inter"), 0));
    var pmNp = num($("cons-pm-np"), 0);
    var subNp = num($("cons-sub-np"), 0);
    var unreal = Math.max(0, num($("cons-unreal"), 0));
    var miR = Math.min(1, Math.max(0, num($("cons-mi"), 0) / 100));
    var inv = Math.max(0, num($("cons-inv"), 0));
    var subNet = Math.max(0, num($("cons-sub-net"), 0));
    var rec = Math.max(0, num($("cons-rec"), 0));

    var consRev = pmRev + subRev - inter;
    var consNp = pmNp + subNp - unreal;
    var miNp = subNp * miR;
    var parentNp = consNp - miNp;
    var miEq = subNet * miR;
    var gw = inv - subNet * (1 - miR);
    var margin = consRev > 0 ? consNp / consRev : 0;

    $("cons-big").textContent = money(consRev);
    $("cons-cut").textContent = "−" + money(inter) + "（占母公司收入 " + pct(pmRev > 0 ? inter / pmRev : 0, 1) + "）";
    $("cons-np").textContent = yuan(consNp);
    $("cons-mi-np").textContent = yuan(miNp) + "（" + pct(miR, 0) + "）";
    $("cons-parent-np").textContent = yuan(parentNp);
    $("cons-mi-eq").textContent = yuan(miEq);
    $("cons-gw").textContent = (gw >= 0 ? "商誉 " : "负商誉（计入当期损益）") + money(Math.abs(gw)) + " 元"
      + "（投资 " + money(inv) + " vs 享有净资产 " + money(subNet * (1 - miR)) + "）";
    $("cons-rec-out").textContent = "−" + money(rec);
    $("cons-margin").textContent = pct(margin, 2);

    var rows = [
      ["营业收入", money(pmRev), money(subRev), "−" + money(inter), money(consRev)],
      ["净利润", money(pmNp), money(subNp), "−" + money(unreal), money(consNp)],
      ["其中：归属母公司", money(pmNp), "—", "—", money(parentNp)],
      ["少数股东损益", "—", money(miNp), "—", money(miNp)],
      ["内部应收（资产）", money(rec), money(rec), "−" + money(rec), "0.00"],
      ["长期股权投资", money(inv), "—", "−" + money(inv), "0.00"],
      ["子公司净资产", "—", money(subNet), "—", money(subNet)]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 0 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>"
        + rows[i][2] + "</td><td>" + rows[i][3] + "</td><td>" + rows[i][4] + "</td></tr>";
    }
    $("cons-body").innerHTML = html;

    $("cons-note").textContent = "合并报表不是把两张表加起来，是先把「自己跟自己做」的交易全部抹掉：内部销售、内部应收应付、内部投资与权益。"
      + "没卖出去的存货里那部分内部利润也要抵掉，否则等于把左口袋的钱算成利润。"
      + "长投抵销后如果不是零，差额就是商誉（买贵了）或负商誉（买便宜了）；差额算不平，八成是持股比例或子公司净资产口径对不上。";
  }

  function calcBPlan() {
    var rev0 = Math.max(0, num($("bpl-rev"), 0));
    var g = num($("bpl-grow"), 0) / 100;
    var gm = Math.min(1, Math.max(0, num($("bpl-gm"), 0) / 100));
    var opexR = Math.max(0, num($("bpl-opex"), 0) / 100);
    var dep = Math.max(0, num($("bpl-dep"), 0));
    var taxR = Math.min(1, Math.max(0, num($("bpl-tax"), 0) / 100));
    var dso = Math.max(0, num($("bpl-dso"), 0));
    var dio = Math.max(0, num($("bpl-dio"), 0));
    var dpo = Math.max(0, num($("bpl-dpo"), 0));
    var cash0 = num($("bpl-cash"), 0);

    var rev = rev0 * (1 + g);
    var cogs = rev * (1 - gm);
    var gp = rev * gm;
    var opexv = rev * opexR;
    var op = gp - opexv - dep;
    var taxv = Math.max(0, op * taxR);
    var np = op - taxv;

    function wc(r, c) {
      var ar = r / 365 * dso, inv = c / 365 * dio, ap = c / 365 * dpo;
      return [ar, inv, ap, ar + inv - ap];
    }
    var y0 = wc(rev0, rev0 * (1 - gm));
    var y1 = wc(rev, cogs);
    var gap = y1[3] - y0[3];
    var free = np + dep - gap;
    var cash1 = cash0 + free;

    $("bpl-big").textContent = fmt(np, 2);
    $("bpl-rev2").textContent = fmt(rev, 2) + " 万元（增长 " + pct(g, 1) + "）";
    $("bpl-gp").textContent = fmt(gp, 2) + " / " + fmt(opexv, 2) + " 万元";
    $("bpl-op").textContent = fmt(op, 2) + " / " + fmt(taxv, 2) + " 万元";
    $("bpl-margin").textContent = rev > 0 ? pct(np / rev, 2) : "—";
    $("bpl-wc").textContent = fmt(y1[0], 2) + " / " + fmt(y1[1], 2) + " / " + fmt(y1[2], 2) + " 万元";
    $("bpl-nwc").textContent = fmt(y0[3], 2) + " → " + fmt(y1[3], 2) + " 万元";
    $("bpl-wcgap").textContent = (gap >= 0 ? "多占用 " : "释放 ") + fmt(Math.abs(gap), 2) + " 万元";
    $("bpl-free").textContent = fmt(cash1, 2) + " / " + fmt(free, 2) + " 万元";

    var rows = [
      ["营业收入", rev0, rev],
      ["营业成本", rev0 * (1 - gm), cogs],
      ["毛利", rev0 * gm, gp],
      ["三费", rev0 * opexR, opexv],
      ["营业利润", rev0 * gm - rev0 * opexR - dep, op],
      ["净利润", rev0 * gm - rev0 * opexR - dep - Math.max(0, (rev0 * gm - rev0 * opexR - dep) * taxR), np],
      ["应收账款", y0[0], y1[0]],
      ["存货", y0[1], y1[1]],
      ["应付账款", y0[2], y1[2]],
      ["净营运资金", y0[3], y1[3]]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      var d = rows[i][2] - rows[i][1];
      var cls = i === 5 ? ' class="c-info"' : (i === 9 && d > 0 ? ' class="c-warn"' : "");
      html += "<tr" + cls + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + fmt(rows[i][1], 2) + "</td><td>"
        + fmt(rows[i][2], 2) + "</td><td>" + (d >= 0 ? "+" : "") + fmt(d, 2) + "</td></tr>";
    }
    $("bpl-body").innerHTML = html;

    $("bpl-note").textContent = "预算是三张表的联动，不是一张利润表：收入涨 " + pct(g, 0) + "，应收和存货会按天数同比涨，"
      + "这部分钱要先垫出去，所以利润和现金经常反向。本例净利 " + fmt(np, 2) + " 万元，但要再垫 " + fmt(Math.max(0, gap), 2)
      + " 万元营运资金，自由现金流 " + fmt(free, 2) + " 万元。要么把 DSO 压下来（催收），要么把 DPO 谈上去（供应商账期），"
      + "否则增长越快越缺钱。";
  }

  function calcRollFC() {
    var bud = Math.max(0, num($("rl-bud"), 0));
    var passed = Math.min(11, Math.max(0, Math.round(num($("rl-passed"), 0))));
    var act = Math.max(0, num($("rl-act"), 0));
    var rest = Math.max(0, num($("rl-rest"), 0));
    var gmb = num($("rl-gmb"), 0) / 100;
    var gma = num($("rl-gma"), 0) / 100;
    var left = 12 - passed;

    var fc = act + rest * left;
    var rate = bud > 0 ? fc / bud : 0;
    var gap = fc - bud;
    var expect = bud * passed / 12;
    var pace = expect > 0 ? act / expect : 0;
    var need = left > 0 ? (bud - act) / left : 0;
    var gpB = bud * gmb, gpF = fc * gma;

    $("rl-big").textContent = fmt(fc, 2);
    $("rl-rate").textContent = pct(rate, 2);
    $("rl-gap").textContent = (gap >= 0 ? "超出 " : "缺口 ") + fmt(Math.abs(gap), 2) + " 万元";
    $("rl-expect").textContent = fmt(expect, 2) + " 万元（" + fmt(passed, 0) + "/12）";
    $("rl-pace").textContent = pct(pace, 1) + (pace >= 1 ? "（略超进度）" : "（落后进度）");
    $("rl-need").textContent = fmt(need, 2) + " 万元/月";
    $("rl-delta").textContent = (need > rest ? "每月再加 " + fmt(need - rest, 2) : "无需加，可下调 " + fmt(rest - need, 2)) + " 万元";
    $("rl-gp").textContent = fmt(gpB, 2) + " → " + fmt(gpF, 2) + " 万元（" + (gpF >= gpB ? "+" : "") + fmt(gpF - gpB, 2) + "）";
    $("rl-advice").textContent = rate >= 1 ? "预算可达成，重点转向毛利质量" : (rate >= 0.95 ? "缺口在 5% 内，靠一两个大单可补" : "建议下调全年预算并同步削减费用投放");

    var rows = [
      ["收入", bud, fc],
      ["毛利", gpB, gpF],
      ["毛利率", gmb * 100, gma * 100]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      var f = i === 2 ? fmt(rows[i][1], 2) + "%" : fmt(rows[i][1], 2);
      var t = i === 2 ? fmt(rows[i][2], 2) + "%" : fmt(rows[i][2], 2);
      var d = rows[i][2] - rows[i][1];
      html += "<tr><td class=\"tal\">" + rows[i][0] + "</td><td>" + f + "</td><td>" + t + "</td><td>" + (d >= 0 ? "+" : "") + fmt(d, 2) + (i === 2 ? " 点" : "") + "</td></tr>";
    }
    $("rl-body").innerHTML = html;

    $("rl-note").textContent = "滚动预测的用法：已实现的收入是硬的，剩下的月份按最新判断重估，而不是把预算按月份摊完。"
      + "本例时间进度 " + fmt(passed, 0) + "/12 应有 " + fmt(expect, 2) + " 万元，实际 " + fmt(act, 2)
      + " 万元（" + pct(pace, 1) + "），靠剩余 " + fmt(left, 0) + " 个月每月 " + fmt(rest, 2) + " 万元只能到 "
      + fmt(fc, 2) + " 万元。注意毛利率同时在掉（" + pct(gmb, 0) + " → " + pct(gma, 0) + "），"
      + "收入差 " + fmt(Math.abs(gap), 2) + " 万元、毛利差 " + fmt(Math.abs(gpF - gpB), 2) + " 万元，"
      + "利润缺口比收入缺口更大——这时候靠打折冲量的做法会让差距进一步扩大。";
  }

  function calcInterco() {
    var pairs = [];
    for (var i = 1; i <= 4; i++) {
      pairs.push([num($("ico-a" + i), 0), num($("ico-b" + i), 0)]);
    }
    var atot = 0, btot = 0, n = 0;
    for (var i = 0; i < pairs.length; i++) {
      atot += pairs[i][0];
      btot += pairs[i][1];
      if (Math.abs(pairs[i][0] - pairs[i][1]) > 0.005) n++;
    }
    var offset = Math.min(atot, btot);
    var diff = atot - btot;
    $("ico-big").textContent = money(diff);
    $("ico-atot").textContent = money(atot);
    $("ico-btot").textContent = money(btot);
    $("ico-offset").textContent = money(offset);
    $("ico-n").textContent = n + " 笔";
    var tb = $("ico-body");
    tb.innerHTML = "";
    for (var i = 0; i < pairs.length; i++) {
      var d = pairs[i][0] - pairs[i][1];
      var tr = document.createElement("tr");
      var st = Math.abs(d) <= 0.005 ? "平" : (d > 0 ? "应收多" : "应付多");
      [i + 1, money(pairs[i][0]), money(pairs[i][1]), money(d), st].forEach(function (v) {
        var td = document.createElement("td");
        td.textContent = v;
        tr.appendChild(td);
      });
      if (Math.abs(d) > 0.005) tr.className = "c-warn";
      tb.appendChild(tr);
    }
    $("ico-note").textContent = "表内逐组填集团内部往来（应收方挂账 vs 应付方挂账），两边一致才可抵销。";
    $("ico-note2").textContent = "合并报表抵销分录：借「应付账款」" + money(offset) + "、贷「应收账款」" + money(offset) + "；差异 " + money(diff) + " 单独挂账查明（未达账项/入账时点/科目错挂），不能直接冲平。";
  }

export const PANELS = {"ratios":"  <section class=\"panel\" id=\"panel-ratios\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（本期，单位：元）</h2>\n    <label class=\"f\"><span>营业收入</span>\n      <input id=\"rt-rev\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"10000000\"></label>\n    <label class=\"f\"><span>营业成本</span>\n      <input id=\"rt-cogs\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"7000000\"></label>\n    <label class=\"f\"><span>净利润</span>\n      <input id=\"rt-np\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n    <label class=\"f\"><span>流动资产 / 其中存货</span>\n      <div class=\"row\">\n        <input id=\"rt-ca\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"4000000\">\n        <input id=\"rt-inv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1200000\">\n      </div></label>\n    <label class=\"f\"><span>应收账款 / 流动负债</span>\n      <div class=\"row\">\n        <input id=\"rt-ar\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1500000\">\n        <input id=\"rt-cl\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2500000\">\n      </div></label>\n    <label class=\"f\"><span>总资产 / 总负债</span>\n      <div class=\"row\">\n        <input id=\"rt-ta\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"9000000\">\n        <input id=\"rt-tl\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"5000000\">\n      </div></label>\n    <label class=\"f\"><span>所有者权益（不填则按 总资产 − 总负债）</span>\n      <input id=\"rt-eq\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"4000000\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">净资产收益率 ROE</span><strong id=\"rt-roe\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>毛利率</span><b id=\"rt-gm\">—</b></li>\n      <li><span>净利率</span><b id=\"rt-nm\">—</b></li>\n      <li><span>流动比率（≥2 偏稳，<1 偏紧）</span><b id=\"rt-cr\">—</b></li>\n      <li><span>速动比率（≥1 较安全）</span><b id=\"rt-qr\">—</b></li>\n      <li><span>资产负债率</span><b id=\"rt-lev\">—</b></li>\n      <li><span>总资产报酬率 ROA</span><b id=\"rt-roa\">—</b></li>\n      <li><span>应收账款周转天数</span><b id=\"rt-ard\">—</b></li>\n      <li><span>存货周转天数</span><b id=\"rt-invd\">—</b></li>\n      <li><span>营业周期（应收 + 存货）</span><b id=\"rt-cycle\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>杜邦分解</th><th>数值</th></tr></thead>\n        <tbody id=\"rt-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"rt-note\"></p>\n  </div>\n    </div>\n  </section>\n","recon":"  <section class=\"panel\" id=\"panel-recon\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（月末，单位：元）</h2>\n    <label class=\"f\"><span>企业银行存款日记账余额</span>\n      <input id=\"rc-book\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"152300\"></label>\n    <label class=\"f\"><span>银行对账单余额</span>\n      <input id=\"rc-bank\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"167200\"></label>\n    <label class=\"f\"><span>企业已收、银行未收（收到支票还没进账）</span>\n      <input id=\"rc-a\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"8000\"></label>\n    <label class=\"f\"><span>企业已付、银行未付（开出支票对方还没取）</span>\n      <input id=\"rc-b\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"3200\"></label>\n    <label class=\"f\"><span>银行已收、企业未收（托收货款、利息入账）</span>\n      <input id=\"rc-c\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"20400\"></label>\n    <label class=\"f\"><span>银行已付、企业未付（手续费、代扣水电）</span>\n      <input id=\"rc-d\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"700\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">调节后余额（两边应一致）</span><strong id=\"rc-final\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>企业侧：账面 + 银行已收未收 − 银行已付未付</span><b id=\"rc-side1\">—</b></li>\n      <li><span>银行侧：对账单 + 企业已收未收 − 企业已付未付</span><b id=\"rc-side2\">—</b></li>\n      <li><span>两边差额（0 = 平）</span><b id=\"rc-diff\">—</b></li>\n      <li><span>未达账项净额</span><b id=\"rc-net\">—</b></li>\n      <li><span>结论</span><b id=\"rc-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>未达账项</th><th>调节哪一边</th><th>金额</th></tr></thead>\n        <tbody id=\"rc-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"rc-note\"></p>\n  </div>\n    </div>\n  </section>\n","expense":"  <section class=\"panel\" id=\"panel-expense\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（一次出差）</h2>\n    <label class=\"f\"><span>出差天数</span>\n      <input id=\"ex-days\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"4\"></label>\n    <label class=\"f\"><span>住宿晚数</span>\n      <input id=\"ex-nights\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"3\"></label>\n    <label class=\"f\"><span>住宿单价（元/晚，含税）</span>\n      <input id=\"ex-hotel\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"450\"></label>\n    <label class=\"f\"><span>住宿标准（元/晚，公司制度）</span>\n      <input id=\"ex-hstd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"400\"></label>\n    <label class=\"f\"><span>餐补标准（元/天）</span>\n      <input id=\"ex-meal\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"100\"></label>\n    <label class=\"f\"><span>市内交通（元）</span>\n      <input id=\"ex-local\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"180\"></label>\n    <label class=\"f\"><span>城际交通（元，含税）</span>\n      <input id=\"ex-travel\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"1200\"></label>\n    <label class=\"f\"><span>其他（元）</span>\n      <input id=\"ex-other\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"0\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">可报销合计（含税）</span><strong id=\"ex-paid\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>报销单合计（未扣超标）</span><b id=\"ex-total\">—</b></li>\n      <li><span>超标金额（个人自付）</span><b id=\"ex-over\">—</b></li>\n      <li><span>可抵扣进项税（住宿 6% + 交通 9%）</span><b id=\"ex-vat\">—</b></li>\n      <li><span>企业实际费用成本（含税 − 进项税）</span><b id=\"ex-cost\">—</b></li>\n      <li><span>日均报销</span><b id=\"ex-day\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>实际</th><th>可报</th><th>说明</th></tr></thead>\n        <tbody id=\"ex-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"ex-note\"></p>\n  </div>\n    </div>\n  </section>\n","triplede":"  <section class=\"panel\" id=\"panel-triplede\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（利润表 / 现金流量表 / 资产负债表）</h2>\n    <label class=\"f\">\n      <span>净利润</span>\n      <input id=\"td-np\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"1200000\">\n    </label>\n    <label class=\"f\">\n      <span>折旧与摊销</span>\n      <input id=\"td-da\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"300000\">\n    </label>\n    <label class=\"f\">\n      <span>应收账款增加（减少填负数）</span>\n      <input id=\"td-ar\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"200000\">\n    </label>\n    <label class=\"f\">\n      <span>存货增加</span>\n      <input id=\"td-inv\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"150000\">\n    </label>\n    <label class=\"f\">\n      <span>应付账款增加</span>\n      <input id=\"td-ap\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"120000\">\n    </label>\n    <label class=\"f\">\n      <span>经营现金流净额（表上填的）</span>\n      <input id=\"td-cfo\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"1270000\">\n    </label>\n    <label class=\"f\">\n      <span>投资活动现金流净额</span>\n      <input id=\"td-cfi\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"-500000\">\n    </label>\n    <label class=\"f\">\n      <span>筹资活动现金流净额</span>\n      <input id=\"td-cff\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"100000\">\n    </label>\n    <label class=\"f\">\n      <span>期初现金及现金等价物</span>\n      <input id=\"td-cash0\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"300000\">\n    </label>\n    <label class=\"f\">\n      <span>期末现金及现金等价物</span>\n      <input id=\"td-cash1\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"1170000\">\n    </label>\n    <label class=\"f\">\n      <span>资产总计</span>\n      <input id=\"td-ta\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"5000000\">\n    </label>\n    <label class=\"f\">\n      <span>负债合计</span>\n      <input id=\"td-tl\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"3000000\">\n    </label>\n    <label class=\"f\">\n      <span>所有者权益合计</span>\n      <input id=\"td-te\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"2000000\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">现金净增加额</span><strong id=\"td-net\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>经营现金流（间接法推算）</span><b id=\"td-cfoind\">—</b></li>\n      <li><span>间接法 vs 表上：差多少</span><b id=\"td-d1\">—</b></li>\n      <li><span>三项现金流合计</span><b id=\"td-sum\">—</b></li>\n      <li><span>期末现金：应有 / 实填</span><b id=\"td-c1\">—</b></li>\n      <li><span>期末现金：差多少</span><b id=\"td-d2\">—</b></li>\n      <li><span>资产 = 负债 + 权益：差多少</span><b id=\"td-d3\">—</b></li>\n      <li><span>整体结论</span><b id=\"td-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>勾稽检查</th><th>应有</th><th>实填</th><th>差额</th><th>结论</th></tr></thead>\n        <tbody id=\"td-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"td-note\"></p>\n  </div>\n    </div>\n  </section>\n","finreport":"  <section class=\"panel\" id=\"panel-finreport\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（本月损益数据，元）</h2>\n    <label class=\"f\">\n      <span>营业收入</span>\n      <input id=\"pl-rev\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\">\n    </label>\n    <label class=\"f\">\n      <span>营业成本</span>\n      <input id=\"pl-cogs\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"700000\">\n    </label>\n    <label class=\"f\">\n      <span>税金及附加</span>\n      <input id=\"pl-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"8000\">\n    </label>\n    <label class=\"f\">\n      <span>销售费用</span>\n      <input id=\"pl-se\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"60000\">\n    </label>\n    <label class=\"f\">\n      <span>管理费用</span>\n      <input id=\"pl-ae\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"80000\">\n    </label>\n    <label class=\"f\">\n      <span>研发费用</span>\n      <input id=\"pl-rd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"40000\">\n    </label>\n    <label class=\"f\">\n      <span>财务费用</span>\n      <input id=\"pl-fe\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\">\n    </label>\n    <label class=\"f\">\n      <span>其他收益 / 投资收益（负数表示损失）</span>\n      <input id=\"pl-oi\" type=\"number\" inputmode=\"decimal\" step=\"1000\" value=\"5000\">\n    </label>\n    <label class=\"f\">\n      <span>营业外收入 / 营业外支出</span>\n      <div class=\"row\">\n        <input id=\"pl-noi\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"3000\">\n        <input id=\"pl-noe\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"1000\">\n      </div>\n    </label>\n    <label class=\"f\">\n      <span>企业所得税率（%，小微 5 或 25）</span>\n      <input id=\"pl-tr\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"50\" step=\"1\" value=\"25\">\n    </label>\n    <em>这是管理用的粗表，不含递延所得税、资产减值、公允价值变动等复杂科目，用来快速看每月赚不赚钱</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">本月净利润</span><strong id=\"pl-np\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>毛利 / 毛利率</span><b id=\"pl-gp\">—</b></li>\n      <li><span>营业利润</span><b id=\"pl-op\">—</b></li>\n      <li><span>利润总额</span><b id=\"pl-tp\">—</b></li>\n      <li><span>所得税 / 净利率</span><b id=\"pl-taxnp\">—</b></li>\n      <li><span>三费合计（销售+管理+财务）占收入</span><b id=\"pl-fee\">—</b></li>\n      <li><span>保本营业收入（毛利额覆盖固定费用）</span><b id=\"pl-be\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>金额</th><th>占收入</th></tr></thead>\n        <tbody id=\"pl-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"pl-note\"></p>\n  </div>\n    </div>\n  </section>\n","expbudget":"  <section class=\"panel\" id=\"panel-expbudget\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（预算 vs 实际，元）</h2>\n    <label class=\"f\"><span>人工成本：预算 / 实际</span>\n      <span class=\"row\"><input id=\"eb-b1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"200000\"><input id=\"eb-a1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"215000\"></span>\n    </label>\n    <label class=\"f\"><span>租金水电：预算 / 实际</span>\n      <span class=\"row\"><input id=\"eb-b2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"60000\"><input id=\"eb-a2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"58000\"></span>\n    </label>\n    <label class=\"f\"><span>市场推广：预算 / 实际</span>\n      <span class=\"row\"><input id=\"eb-b3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"80000\"><input id=\"eb-a3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"96000\"></span>\n    </label>\n    <label class=\"f\"><span>差旅交通：预算 / 实际</span>\n      <span class=\"row\"><input id=\"eb-b4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"30000\"><input id=\"eb-a4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"24000\"></span>\n    </label>\n    <label class=\"f\"><span>办公及其他：预算 / 实际</span>\n      <span class=\"row\"><input id=\"eb-b5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\"><input id=\"eb-a5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"21500\"></span>\n    </label>\n    <em>左边填预算、右边填本月（或本年累计）实际；超支率超过 10% 的科目会被点名</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">总差异（实际 − 预算）</span><strong id=\"eb-diff\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>预算合计 / 实际合计</span><b id=\"eb-total\">—</b></li>\n      <li><span>差异率</span><b id=\"eb-rate\">—</b></li>\n      <li><span>超支科目（个 / 合计）</span><b id=\"eb-over\">—</b></li>\n      <li><span>节约科目（个 / 合计）</span><b id=\"eb-save\">—</b></li>\n      <li><span>超支最多（金额）</span><b id=\"eb-top\">—</b></li>\n      <li><span>超支率最高</span><b id=\"eb-toprate\">—</b></li>\n      <li><span>要压回到预算需砍</span><b id=\"eb-cut\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>科目</th><th>预算</th><th>实际</th><th>差异</th><th>差异率</th></tr></thead>\n        <tbody id=\"eb-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"eb-note\"></p>\n  </div>\n    </div>\n  </section>\n","efficiency":"  <section class=\"panel\" id=\"panel-efficiency\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（经营数据）</h2>\n    <label class=\"f\">\n      <span>营业收入（元/期）</span>\n      <input id=\"ef-rev\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"50000000\">\n    </label>\n    <label class=\"f\">\n      <span>员工人数（人）</span>\n      <input id=\"ef-head\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"80\">\n    </label>\n    <label class=\"f\">\n      <span>人工成本总额（含社保公积金）</span>\n      <input id=\"ef-labor\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"8000000\">\n    </label>\n    <label class=\"f\">\n      <span>期间费用合计（销售＋管理＋财务）</span>\n      <input id=\"ef-opex\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"8000000\">\n    </label>\n    <label class=\"f\">\n      <span>毛利</span>\n      <input id=\"ef-gross\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"15000000\">\n    </label>\n    <label class=\"f\">\n      <span>净利润</span>\n      <input id=\"ef-net\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"3712500\">\n    </label>\n    <em>期间费用里已经包含人工成本的话，看结果时把「费用率」当重复口径处理，别两个一起加</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">人均创收（元/年）</span><strong id=\"ef-rph\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>人均创收（元/月）</span><b id=\"ef-rphm\">—</b></li>\n      <li><span>人均毛利 / 人均净利</span><b id=\"ef-gph\">—</b></li>\n      <li><span>人均人工成本（元/年）</span><b id=\"ef-lph\">—</b></li>\n      <li><span>人工成本率（人工 ÷ 收入）</span><b id=\"ef-lrate\">—</b></li>\n      <li><span>期间费用率</span><b id=\"ef-orate\">—</b></li>\n      <li><span>每 1 元人工创收 / 创毛利 / 创净利</span><b id=\"ef-lever\">—</b></li>\n      <li><span>保本人均创收（人工＋费用 ÷ 人数）</span><b id=\"ef-be\">—</b></li>\n      <li><span>当前人均创收是保本线的</span><b id=\"ef-cov\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>指标</th><th>数值</th><th>看什么</th></tr></thead>\n        <tbody id=\"ef-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"ef-note\"></p>\n  </div>\n    </div>\n  </section>\n","cashstmt":"  <section class=\"panel\" id=\"panel-cashstmt\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（本期现金收支，元）</h2>\n    <label class=\"f\"><span>经营：销售商品收到的现金</span>\n      <input id=\"cs-sale\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"950000\"></label>\n    <label class=\"f\"><span>经营：其他经营收现（补贴、退税等）</span>\n      <input id=\"cs-othin\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"20000\"></label>\n    <label class=\"f\"><span>经营：采购商品支付的现金</span>\n      <input id=\"cs-buy\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"620000\"></label>\n    <label class=\"f\"><span>经营：支付给职工的现金</span>\n      <input id=\"cs-pay\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"180000\"></label>\n    <label class=\"f\"><span>经营：支付的各项税费</span>\n      <input id=\"cs-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"80000\"></label>\n    <label class=\"f\"><span>经营：其他经营活动付现</span>\n      <input id=\"cs-othout\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"40000\"></label>\n    <label class=\"f\"><span>投资：购建固定资产等付现</span>\n      <input id=\"cs-capex\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"120000\"></label>\n    <label class=\"f\"><span>投资：对外投资支付</span>\n      <input id=\"cs-invpay\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"50000\"></label>\n    <label class=\"f\"><span>投资：收回投资 / 处置资产收现</span>\n      <input id=\"cs-invback\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"30000\"></label>\n    <label class=\"f\"><span>筹资：取得借款收现</span>\n      <input id=\"cs-borrow\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\"></label>\n    <label class=\"f\"><span>筹资：偿还借款付现</span>\n      <input id=\"cs-repay\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"150000\"></label>\n    <label class=\"f\"><span>筹资：支付利息 / 分红付现</span>\n      <input id=\"cs-div\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"72000\"></label>\n    <label class=\"f\"><span>期初现金及现金等价物</span>\n      <input id=\"cs-begin\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\"></label>\n    <em>只填实际过账的现金，赊销赊购不算；利息、分红记筹资，不记经营</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">期末现金及现金等价物</span><strong id=\"cs-end\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>经营活动净额</span><b id=\"cs-op\">—</b></li>\n      <li><span>投资活动净额</span><b id=\"cs-inv\">—</b></li>\n      <li><span>筹资活动净额</span><b id=\"cs-fin\">—</b></li>\n      <li><span>本期现金净增加</span><b id=\"cs-net\">—</b></li>\n      <li><span>自由现金流（经营 − 资本开支）</span><b id=\"cs-fcf\">—</b></li>\n      <li><span>经营现金流入 / 流出</span><b id=\"cs-io\">—</b></li>\n      <li><span>结构诊断</span><b id=\"cs-type\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>流入</th><th>流出</th><th>净额</th></tr></thead>\n        <tbody id=\"cs-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"cs-note\"></p>\n  </div>\n    </div>\n  </section>\n","monthclose":"  <section class=\"panel\" id=\"panel-monthclose\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（关账进度）</h2>\n    <label class=\"f\"><span>结账清单总项数</span>\n      <input id=\"mw-total\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"24\"></label>\n    <label class=\"f\"><span>已完成项数</span>\n      <input id=\"mw-done\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"17\"></label>\n    <label class=\"f\"><span>未完成里影响报表的关键项</span>\n      <input id=\"mw-key\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"2\"></label>\n    <label class=\"f\"><span>距关账 / 申报截止还有（天）</span>\n      <input id=\"mw-days\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"3\"></label>\n    <label class=\"f\"><span>剩余每项平均耗时（人日）</span>\n      <input id=\"mw-per\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"0.35\"></label>\n    <label class=\"f\"><span>可并行投入人数</span>\n      <input id=\"mw-people\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"2\"></label>\n    <em>关键项指不完成就没法出报表的：存货暂估、折旧计提、往来对账、税金计提、收入截止测试</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">关账完成率</span><strong id=\"mw-pct\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>剩余项数 / 其中关键项</span><b id=\"mw-left\">—</b></li>\n      <li><span>剩余工作量（人日）</span><b id=\"mw-hours\">—</b></li>\n      <li><span>按当前人力需（天）</span><b id=\"mw-need\">—</b></li>\n      <li><span>时间余量（负数=来不及）</span><b id=\"mw-slip\">—</b></li>\n      <li><span>风险等级</span><b id=\"mw-risk\">—</b></li>\n      <li><span>结论</span><b id=\"mw-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>剩余天数</th><th>需投入人数</th><th>能否按期</th></tr></thead>\n        <tbody id=\"mw-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"mw-note\"></p>\n  </div>\n    </div>\n  </section>\n","mgmtpack":"  <section class=\"panel\" id=\"panel-mgmtpack\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（月度经营数据，元）</h2>\n    <label class=\"f\"><span>营业收入：本月 / 预算 / 去年同期</span>\n      <span class=\"row\"><input id=\"pk-rev\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1200000\">\n        <input id=\"pk-bud\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\">\n        <input id=\"pk-ly\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"900000\"></span></label>\n    <label class=\"f\"><span>毛利（元）</span>\n      <input id=\"pk-gm\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"360000\"></label>\n    <label class=\"f\"><span>净利润（元）</span>\n      <input id=\"pk-net\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"96000\"></label>\n    <label class=\"f\"><span>期末应收账款（元）</span>\n      <input id=\"pk-ar\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2000000\"></label>\n    <label class=\"f\"><span>期末存货（元）</span>\n      <input id=\"pk-inv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1500000\"></label>\n    <label class=\"f\"><span>经营活动现金流净额（元，负数直接填）</span>\n      <input id=\"pk-cfo\" type=\"number\" inputmode=\"decimal\" step=\"10000\" value=\"-50000\"></label>\n    <em>开会前把这 8 个数填好，本页直接给「讲什么、哪里要问」</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">收入预算达成率</span><strong id=\"pk-ach\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>同比（对去年同期）</span><b id=\"pk-yoy\">—</b></li>\n      <li><span>毛利率 / 净利率</span><b id=\"pk-margin\">—</b></li>\n      <li><span>应收周转天数（DSO）</span><b id=\"pk-dso\">—</b></li>\n      <li><span>存货周转天数（DIO）</span><b id=\"pk-dio\">—</b></li>\n      <li><span>现金周期（DSO + DIO）</span><b id=\"pk-cycle\">—</b></li>\n      <li><span>经营现金流 vs 净利润</span><b id=\"pk-cash\">—</b></li>\n      <li><span>本次会议强调</span><b id=\"pk-focus\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>指标</th><th>本期</th><th>参照</th><th>判断</th></tr></thead>\n        <tbody id=\"pk-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"pk-note\"></p>\n  </div>\n    </div>\n  </section>\n","sens":"  <section class=\"panel\" id=\"panel-sens\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（利润敏感性）</h2>\n    <label class=\"f\"><span>营业收入（元）</span>\n      <input id=\"sens-rev\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"10000000\"></label>\n    <label class=\"f\"><span>变动成本率（%）</span>\n      <input id=\"sens-vr\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"70\"></label>\n    <label class=\"f\"><span>固定成本（元）</span>\n      <input id=\"sens-fix\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"2000000\"></label>\n    <label class=\"f\"><span>冲击幅度（%）</span>\n      <input id=\"sens-shock\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"5\"></label>\n    <label class=\"f\"><span>想在净利上提（%）</span>\n      <input id=\"sens-target\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"20\"></label>\n    <em>口径：售价与销量同比率变化时净利变化相同；真正拖利润的是变动成本率，它吃掉的是全部收入的百分点</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">当前净利</span><strong id=\"sens-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>保本收入</span><b id=\"sens-be\">—</b></li>\n      <li><span>安全边际率</span><b id=\"sens-mos\">—</b></li>\n      <li><span>经营杠杆</span><b id=\"sens-lev\">—</b></li>\n      <li><span>敏感性：售价 ±1%</span><b id=\"sens-e-price\">—</b></li>\n      <li><span>敏感性：变动成本率 ±1%</span><b id=\"sens-e-vc\">—</b></li>\n      <li><span>敏感性：固定成本 ±1%</span><b id=\"sens-e-fix\">—</b></li>\n      <li><span>要提净利：收入需增加</span><b id=\"sens-need-rev\">—</b></li>\n      <li><span>或把变动成本率降到</span><b id=\"sens-need-vr\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>变量</th><th>变动</th><th>净利</th><th>变化</th></tr></thead>\n        <tbody id=\"sens-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"sens-note\"></p>\n  </div>\n    </div>\n  </section>\n","consol":"  <section class=\"panel\" id=\"panel-consol\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（母子公司合并）</h2>\n    <label class=\"f\"><span>母公司营业收入（元）</span>\n      <input id=\"cons-pm-rev\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"50000000\"></label>\n    <label class=\"f\"><span>子公司营业收入（元）</span>\n      <input id=\"cons-sub-rev\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"20000000\"></label>\n    <label class=\"f\"><span>内部交易收入（元）</span>\n      <input id=\"cons-inter\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"8000000\"></label>\n    <label class=\"f\"><span>母公司净利润（元）</span>\n      <input id=\"cons-pm-np\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"5000000\"></label>\n    <label class=\"f\"><span>子公司净利润（元）</span>\n      <input id=\"cons-sub-np\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"3000000\"></label>\n    <label class=\"f\"><span>存货中未实现内部利润（元）</span>\n      <input id=\"cons-unreal\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\"></label>\n    <label class=\"f\"><span>少数股东持股（%）</span>\n      <input id=\"cons-mi\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"20\"></label>\n    <label class=\"f\"><span>长期股权投资 / 子公司净资产（元）</span>\n      <span class=\"row\"><input id=\"cons-inv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"20000000\">\n        <input id=\"cons-sub-net\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"22000000\"></span></label>\n    <label class=\"f\"><span>内部应收应付余额（元）</span>\n      <input id=\"cons-rec\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"3000000\"></label>\n    <em>口径：先抵销内部交易和内部往来，再按持股比例拆归母与少数股东，最后核对长投与子公司净资产是否对平</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">合并营业收入</span><strong id=\"cons-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>内部交易抵销</span><b id=\"cons-cut\">—</b></li>\n      <li><span>合并净利润</span><b id=\"cons-np\">—</b></li>\n      <li><span>少数股东损益</span><b id=\"cons-mi-np\">—</b></li>\n      <li><span>归属于母公司净利</span><b id=\"cons-parent-np\">—</b></li>\n      <li><span>少数股东权益</span><b id=\"cons-mi-eq\">—</b></li>\n      <li><span>长投与子公司净资产差额</span><b id=\"cons-gw\">—</b></li>\n      <li><span>内部往来抵销（资产减少）</span><b id=\"cons-rec-out\">—</b></li>\n      <li><span>合并净利率</span><b id=\"cons-margin\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>母公司</th><th>子公司</th><th>抵销</th><th>合并</th></tr></thead>\n        <tbody id=\"cons-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"cons-note\"></p>\n  </div>\n    </div>\n  </section>\n","bplan":"  <section class=\"panel\" id=\"panel-bplan\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（明年预算，基于今年实际）</h2>\n    <label class=\"f\"><span>今年营业收入（万元）</span>\n      <input id=\"bpl-rev\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"5000\"></label>\n    <label class=\"f\"><span>明年收入增长（%）</span>\n      <input id=\"bpl-grow\" type=\"number\" inputmode=\"decimal\" step=\"1\" value=\"15\"></label>\n    <label class=\"f\"><span>毛利率（%）</span>\n      <input id=\"bpl-gm\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"30\"></label>\n    <label class=\"f\"><span>三费占收入（%）</span>\n      <input id=\"bpl-opex\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"12\"></label>\n    <label class=\"f\"><span>折旧摊销（万元）</span>\n      <input id=\"bpl-dep\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"100\"></label>\n    <label class=\"f\"><span>所得税率（%）</span>\n      <input id=\"bpl-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\"></label>\n    <label class=\"f\"><span>应收 / 存货 / 应付周转天数</span>\n      <span class=\"row\"><input id=\"bpl-dso\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"50\">\n        <input id=\"bpl-dio\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"60\">\n        <input id=\"bpl-dpo\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"45\"></span></label>\n    <label class=\"f\"><span>期初现金（万元）</span>\n      <input id=\"bpl-cash\" type=\"number\" inputmode=\"decimal\" step=\"50\" value=\"500\"></label>\n    <em>口径：先算利润、再算营运资金，最后才推现金——利润涨了现金可能是负的，差额全压在应收和存货里</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">明年预计净利</span><strong id=\"bpl-big\">—</strong><span class=\"unit\">万元</span></div>\n    <ul class=\"kv\">\n      <li><span>明年收入</span><b id=\"bpl-rev2\">—</b></li>\n      <li><span>毛利 / 三费</span><b id=\"bpl-gp\">—</b></li>\n      <li><span>营业利润 / 所得税</span><b id=\"bpl-op\">—</b></li>\n      <li><span>净利率</span><b id=\"bpl-margin\">—</b></li>\n      <li><span>应收 / 存货 / 应付（明年）</span><b id=\"bpl-wc\">—</b></li>\n      <li><span>净营运资金（今年 → 明年）</span><b id=\"bpl-nwc\">—</b></li>\n      <li><span>营运资金增加占用的现金</span><b id=\"bpl-wcgap\">—</b></li>\n      <li><span>期末现金 / 自由现金流</span><b id=\"bpl-free\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>今年</th><th>明年</th><th>变化</th></tr></thead>\n        <tbody id=\"bpl-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"bpl-note\"></p>\n  </div>\n    </div>\n  </section>\n","rollfc":"  <section class=\"panel\" id=\"panel-rollfc\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（滚动预测 vs 年度预算）</h2>\n    <label class=\"f\"><span>年度收入预算（万元）</span>\n      <input id=\"rl-bud\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"6000\"></label>\n    <label class=\"f\"><span>已过月数</span>\n      <input id=\"rl-passed\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"11\" step=\"1\" value=\"6\"></label>\n    <label class=\"f\"><span>实际累计收入（万元）</span>\n      <input id=\"rl-act\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"2800\"></label>\n    <label class=\"f\"><span>剩余月份月均预测（万元）</span>\n      <input id=\"rl-rest\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"500\"></label>\n    <label class=\"f\"><span>预算毛利率 / 实际毛利率（%）</span>\n      <span class=\"row\"><input id=\"rl-gmb\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"30\">\n        <input id=\"rl-gma\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"27\"></span></label>\n    <em>口径：滚动预测＝已实现 + 剩余月份的最新判断，不是把预算按比例摊；一旦差异超过 5%，就该改后面的资源配置而不是等年底解释</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">全年最新预测收入</span><strong id=\"rl-big\">—</strong><span class=\"unit\">万元</span></div>\n    <ul class=\"kv\">\n      <li><span>预算达成率</span><b id=\"rl-rate\">—</b></li>\n      <li><span>缺口 / 超出</span><b id=\"rl-gap\">—</b></li>\n      <li><span>按时间进度应有的累计</span><b id=\"rl-expect\">—</b></li>\n      <li><span>实际相对进度</span><b id=\"rl-pace\">—</b></li>\n      <li><span>要达成预算，剩余月均需做到</span><b id=\"rl-need\">—</b></li>\n      <li><span>相对当前预测每月要加</span><b id=\"rl-delta\">—</b></li>\n      <li><span>毛利影响（预算 vs 预测）</span><b id=\"rl-gp\">—</b></li>\n      <li><span>建议</span><b id=\"rl-advice\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>预算</th><th>最新预测</th><th>差异</th></tr></thead>\n        <tbody id=\"rl-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"rl-note\"></p>\n  </div>\n    </div>\n  </section>\n","interco":"  <section class=\"panel\" id=\"panel-interco\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>集团内部往来抵销明细</h2>\n        <div class=\"tablebox\"><table><thead><tr><th>往来组</th><th>应收方</th><th>应付方</th></tr></thead><tbody>\n          <tr><td>1</td><td><input id=\"ico-a1\" type=\"number\" inputmode=\"decimal\" min=\"0\" value=\"1200000\"></td><td><input id=\"ico-b1\" type=\"number\" inputmode=\"decimal\" min=\"0\" value=\"1200000\"></td></tr>\n          <tr><td>2</td><td><input id=\"ico-a2\" type=\"number\" inputmode=\"decimal\" min=\"0\" value=\"800000\"></td><td><input id=\"ico-b2\" type=\"number\" inputmode=\"decimal\" min=\"0\" value=\"800000\"></td></tr>\n          <tr><td>3</td><td><input id=\"ico-a3\" type=\"number\" inputmode=\"decimal\" min=\"0\" value=\"500000\"></td><td><input id=\"ico-b3\" type=\"number\" inputmode=\"decimal\" min=\"0\" value=\"480000\"></td></tr>\n          <tr><td>4</td><td><input id=\"ico-a4\" type=\"number\" inputmode=\"decimal\" min=\"0\" value=\"300000\"></td><td><input id=\"ico-b4\" type=\"number\" inputmode=\"decimal\" min=\"0\" value=\"300000\"></td></tr>\n        </tbody></table></div>\n        <p class=\"hint\" id=\"ico-note\"></p>\n      </div>\n      <div class=\"card res\">\n        <h2>结果</h2>\n        <div class=\"big\"><span class=\"k\">抵销差异</span><strong id=\"ico-big\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>应收方合计</span><b id=\"ico-atot\">—</b></li>\n          <li><span>应付方合计</span><b id=\"ico-btot\">—</b></li>\n          <li><span>可抵销额（取小）</span><b id=\"ico-offset\">—</b></li>\n          <li><span>差异笔数</span><b id=\"ico-n\">—</b></li>\n        </ul>\n        <div class=\"tablebox\"><table><thead><tr><th>组</th><th>应收方</th><th>应付方</th><th>差异</th><th>状态</th></tr></thead><tbody id=\"ico-body\"></tbody></table></div>\n        <p class=\"hint\" id=\"ico-note2\"></p>\n      </div>\n    </div>\n  </section>\n"};
export default { ratios: calcRatios, recon: calcRecon, expense: calcExpense, triplede: calcTripleDe, finreport: calcFinReport, expbudget: calcExpBudget, efficiency: calcEfficiency, cashstmt: calcCashStmt, monthclose: calcMonthClose, mgmtpack: calcMgmtPack, sens: calcSens, consol: calcConsol, bplan: calcBPlan, rollfc: calcRollFC, interco: calcInterco };
