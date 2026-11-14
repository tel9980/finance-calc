/* 自动生成，勿手改：life 分类模块（点开才下载） */
const { $, BUILD_TAG, CAT_KEY, CAT_LABEL, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, EDITED, ERR_BOX, FAV_KEY, FIELDS, FIRST_ACTIVATE, INSTALL_HIDE_KEY, KEY, LAST_KEY, MONTH_CATS, MONTH_TABLE, NEXT_OF, PALETTE_EL, PENDING_PARAMS, PRE_KEY, QUOTA_WARNED, RECENT_KEY, SAVE_TIMER, SEARCH_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, TOAST_EL, UNITS, WF_ARCH_KEY, WF_AUTO_IDX, WF_AUTO_LIST, WF_AUTO_STEP, WF_AUTO_TIMER, WF_CUSTNAME_KEY, WF_CUST_KEY, WF_CUST_NAME, WF_DONE, WF_KEY, WF_LAST, WF_LEGACY, WF_MAN_KEY, WF_META_KEY, WF_MONTH_KEY, WF_NOTE_KEY, WF_PATHS, WF_ROLE_KEY, WF_ROLE_READY, WF_SKIP_KEY, XL_ROWS, YEAR_TABLE, _onPanels, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bindWfDnd, bindWfInline, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, buildTabBadges, calcLoan, calcMap, calcWorkflow, clearWfMan, closePalette, cmpTabName, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, diagText, dlJson, doInstall, doPrint, drawMonthCats, drawMonthStack, drawReportCharts, drawRpMini, drawnMonthlyChart, drawnYearChart, enhanceNums, enhancePanelUi, ensureChunk, evalExpr, favList, fillCmpMod, fillMonthGrid, fillUnits, flash, flushParams, flushSave, fmt, fmtAt, fmtDate, fx, gauss, getWfCust, getWfDone, getWfMan, getWfMeta, getWfNotes, getWfSkip, hashTarget, installEvt, installHintHide, installHintOff, iosInstallTip, iosLike, isFav, lastName, leftAfter, linkTo, loadCmpA, loadSnaps, loadWfArch, loadWfCust, loadWfDone, loadWfMan, loadWfMeta, loadWfNotes, loadWfSkip, loanRows, makeSnap, markBadInputs, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numBlur, numFocus, numInput, numKey, numOf, openPalette, palKey, panelEls, panelParams, parseAmounts, parseDate, parseNum, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, prePanels, prefetchAllChunks, presets, printCover, pushRecent, pushSearch, pwaStandalone, quickOf, rateOf, readJsonFile, readMonthGrid, recentList, recordWf, refreshCounts, refreshTableTools, refreshTrackMods, refreshWfBadge, renderLoanTable, renderNext, renderPalette, renderPresets, renderSearchHist, renderSnapCompare, renderSnapList, renderTrack, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, saveWfCust, savedCat, scrollResultIfDeepLink, searchHist, setCat, setSub, setTheme, showErrorBox, showInstBar, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, syncInstallUi, tabCatLabel, tap, taxBy, toast, toggleWfStep, trimNum, unitFor, updShown, wfArchiveMonth, wfArchivePut, wfAutoNext, wfAutoStop, wfAutoWalk, wfBar, wfBindCustQ, wfBuildHandoff, wfCarryQuery, wfCsvCell, wfCustNameSave, wfFillCustSel, wfHandoff, wfHandoffCopy, wfHandoffCsv, wfKnownMods, wfLegacyToNew, wfLoad, wfManSave, wfMetaSave, wfMigrateLegacy, wfMonthKey, wfMonthRoll, wfMonthTouch, wfNoteSave, wfOpenInline, wfPad2, wfRenderSummary, wfSet, wfSkipCurrent, wfSkipSave, wfStepKey, wfStepShare, wfStepState, wfVisiblePaths, yuan, zOf } = window.FC;

  function calcInstallment() {
    var P = num($("is-amount"));
    var n = months(num($("is-months")));
    var mode = $("is-mode").value;
    var rate = num($("is-rate"));

    $("is-rate-label").textContent = mode === "monthly" ? "每期费率（%）"
      : mode === "once" ? "总费率（%）" : "总手续费（元）";

    if (!(P > 0 && n > 0)) {
      $("is-apr").textContent = "—";
      ["is-pay", "is-fee", "is-nominal", "is-multiple"].forEach(function (id) { $(id).textContent = "—"; });
      $("is-note").textContent = "填好分期金额和期数后自动计算。";
      return;
    }

    var feeTotal;
    if (mode === "monthly") feeTotal = P * (rate / 100) * n;
    else if (mode === "once") feeTotal = P * (rate / 100);
    else feeTotal = rate;

    var pay = (P + feeTotal) / n;
    var r = monthlyIRR(P, pay, n);
    var apr = Math.pow(1 + r, 12) - 1;
    var nominal = (feeTotal / P) * (12 / n);

    $("is-apr").textContent = fmt(apr * 100, 2);
    $("is-pay").textContent = yuan(pay);
    $("is-fee").textContent = yuan(feeTotal);
    $("is-nominal").textContent = pct(nominal);
    $("is-multiple").textContent = nominal > 0 ? fmt(apr / nominal, 2) + " 倍" : "—";

    var howItIs = mode === "monthly" ? "每期按最初本金收 " + fmt(rate, 2) + "% 手续费"
      : mode === "once" ? "一次性按最初本金收 " + fmt(rate, 2) + "% 手续费"
      : "总共收 " + money(rate) + " 元手续费";
    $("is-note").textContent = fx(
      "这笔分期是" + howItIs + "，但你每月都在还本金，实际占用的钱越来越少，所以真实成本远高于表面费率——" +
      "上面那一栏就是 IRR（内部收益率）口径，相当于「按实际占用资金折算的年化利率」，也是《民法典》和监管要求金融机构披露的年化综合成本口径。" +
      "表面看只有 " + pct(nominal) + "，实际年化 " + fmt(apr * 100, 2) + "%。提前还款通常不退手续费，办之前先算这一栏。");
  }

  function calcDeal() {
    var price = num($("dl-price"));
    var factor = num($("dl-discount")) / 10;
    var threshold = num($("dl-threshold"));
    var off = num($("dl-off"));
    var qty = num($("dl-qty"));

    if (!(price > 0 && qty > 0)) {
      $("dl-pay").textContent = "—";
      ["dl-real-discount", "dl-save", "dl-unit", "dl-next"].forEach(function (id) { $(id).textContent = "—"; });
      $("dl-note").textContent = "填好原价和数量后自动计算。";
    } else {
      if (factor <= 0) factor = 1;
      var list = price * qty;
      var sub = list * factor;
      var times = threshold > 0 ? Math.floor(sub / threshold) : 0;
      var reduce = times * off;
      var pay = Math.max(0, sub - reduce);

      $("dl-pay").textContent = money(pay);
      $("dl-real-discount").textContent = fmt((pay / list) * 10, 2) + " 折";
      $("dl-save").textContent = yuan(list - pay);
      $("dl-unit").textContent = yuan(pay / qty);
      if (threshold > 0) {
        var rem = sub % threshold;
        var need = rem === 0 ? threshold : threshold - rem;
        $("dl-next").textContent = "还差 " + money(need) + " 元可再多减 " + money(off) + " 元";
      } else {
        $("dl-next").textContent = "未设满减";
      }

      var better = "";
      if (threshold > 0) {
        var gap = threshold - rem;
        if (gap > 0 && gap <= off) better = " 注意：只差 " + money(gap) + " 元就能再减 " + money(off) + " 元，凑单更划算。";
      }
      $("dl-note").textContent = threshold > 0
        ? fx("先打折再满减（多数平台的算法）：折后小计 " + money(sub) + " 元，满 " + money(threshold) +
             " 减 " + money(off) + " 命中 " + times + " 次，减掉 " + money(reduce) + " 元。算下来相当于 " +
             fmt((pay / list) * 10, 2) + " 折，比单看折扣力度更真实。" + better)
        : fx("只按折扣算：原价 " + money(price) + " × " + fmt(factor * 10, 2) + " 折 × " + fmt(qty, 0) +
             " 件，折后 " + money(sub) + " 元。要叠加满减就在上面填满减条件。");
    }

    // 单价比较
    var pa = num($("dl-pa")), qa = num($("dl-qa")), ua = $("dl-ua").value;
    var pb = num($("dl-pb")), qb = num($("dl-qb")), ub = $("dl-ub").value;
    if (pa > 0 && qa > 0 && pb > 0 && qb > 0) {
      var unitA = pa / qa, unitB = pb / qb;
      var cheap = Math.min(unitA, unitB), pricey = Math.max(unitA, unitB);
      var diff = (pricey - cheap) / cheap;
      var aWins = unitA <= unitB;
      $("dl-winner").textContent = aWins ? "商品 A" : "商品 B";
      $("dl-winner-unit").textContent = "每" + (aWins ? ua : ub) + "更便宜";
      var ud = function (v) { return fmt(v, v >= 10 ? 2 : v >= 1 ? 3 : 4); };
      $("dl-unit-a").textContent = "每" + ua + " " + ud(unitA) + " 元";
      $("dl-unit-b").textContent = "每" + ub + " " + ud(unitB) + " 元";
      $("dl-diff").textContent = pct(diff) + "（贵的那方贵这么多）";
      $("dl-note2").textContent = fx(
        (aWins ? "A" : "B") + " 的每 " + (aWins ? ua : ub) + " 单价更低，另一件贵了 " + pct(diff) +
        "。比价别看总价和包装大小，算到每克/每毫升才准；" + (ua !== ub ? "两边单位不同时（" + ua + " vs " + ub + "）要先把单位换算统一再比。" : "同类单位直接比单价即可。"));
    } else {
      $("dl-winner").textContent = "—";
      $("dl-winner-unit").textContent = "";
      ["dl-unit-a", "dl-unit-b", "dl-diff"].forEach(function (id) { $(id).textContent = "—"; });
      $("dl-note2").textContent = "两件商品的价格和数量都填上才能比单价。";
    }
  }

  function calcCard() {
    var B = num($("cd-balance"));
    var minRate = num($("cd-min")) / 100;
    var daily = num($("cd-rate")) / 100;
    var days = Math.max(1, num($("cd-days")) || 30);
    var i = daily * days;

    if (B <= 0 || minRate <= 0) {
      ["cd-interest", "cd-apr", "cd-min-amt", "cd-months", "cd-total-int", "cd-left", "cd-save"].forEach(function (id) { $(id).textContent = "—"; });
      $("cd-note").textContent = "填账单金额和最低还款比例后自动计算。";
      return;
    }

    // 只还最低：未全额还款时全额计息（含已还部分），按月模拟
    var firstInt = B * i;
    var minPay = B * minRate;
    var bal = B + firstInt - minPay;
    var totalInt = firstInt;
    var periods = 1;
    var left12 = bal;
    while (bal > 0.5 && periods < 1200) {
      var int = bal * i;
      var pay = Math.max(bal * minRate, 10);
      if (pay > bal + int) pay = bal + int;
      bal = bal + int - pay;
      totalInt += int;
      periods++;
      if (periods === 12) left12 = bal;
    }

    $("cd-interest").textContent = money(firstInt);
    $("cd-apr").textContent = pct(daily * 365, 2) + "（日息 " + fmt(daily * 100, 3) + "% × 365）";
    $("cd-min-amt").textContent = yuan(minPay);
    $("cd-months").textContent = periods >= 1200 ? "几乎还不完" : periods + " 期（约 " + fmt(periods / 12, 1) + " 年）";
    $("cd-total-int").textContent = yuan(totalInt);
    $("cd-left").textContent = yuan(left12);
    $("cd-save").textContent = yuan(totalInt);

    $("cd-note").textContent = "关键点：只要没在到期还款日前全额还清，就已经不享受免息期——已还的部分也会从消费记账日起按日息计息，" +
      "所以只还最低还款，利息是按整笔欠款滚的。日息万分之五折合年化 18.25%，比大多数消费贷都贵；" +
      "能全额还就全额还，实在不行优先考虑账单分期（年化通常 13%–16%），别长期只还最低。";
  }

  function calcFx() {
    var amount = num($("fx-amount"));
    var rate = num($("fx-rate"));
    var fee = num($("fx-fee")) / 100;
    var curName = $("fx-cur").value;

    var toCny = amount * rate;
    var netCny = toCny * (1 - fee);
    var revForeign = rate > 0 ? amount / rate : 0;
    var revNet = revForeign * (1 - fee);

    $("fx-main-label").textContent = curName + " → 人民币";
    $("fx-main").textContent = money(toCny);
    $("fx-main-unit").textContent = "元";
    $("fx-net").textContent = money(netCny) + " 元" + (fee > 0 ? "（扣 " + pct(fee) + "）" : "");
    $("fx-rev").textContent = money(revForeign) + " " + curName + (fee > 0 ? "，实际到手 " + money(revNet) : "");

    // 单位换算
    var cat = $("fx-cat").value;
    var list = UNITS[cat];
    if ($("fx-from").options.length !== list.length) fillUnits();
    var v = num($("fx-value"));
    var fi = parseInt($("fx-from").value, 10) || 0;
    var ti = parseInt($("fx-to").value, 10) || 0;
    var out, formula;
    if (cat === "temp") {
      out = convertTemp(v, fi, ti);
      formula = list[fi][0] + " → " + list[ti][0];
    } else {
      var f = list[fi][1], t = list[ti][1];
      out = (v * f) / t;
      formula = "1 " + list[fi][0] + " = " + fmt(f / t, 4) + " " + list[ti][0];
    }
    var digits = Math.abs(out) < 1 ? 6 : 2;
    $("fx-unit-result").textContent = fmt(out, digits) + " " + list[ti][0];
    $("fx-unit-formula").textContent = formula;
    $("fx-note").textContent = "汇率这里不联网，需要你按当天银行牌价手填（现汇卖出价更适合算换汇成本）。" +
      "单位换算里 1 斤 = 500 克、1 亩 = 666.67 平方米、1 码 = 0.9144 米。";
  }

  function calcSplit() {
    var total = Math.max(0, num($("sp-total"), 0));
    var people = Math.max(1, Math.round(num($("sp-people"), 1)));
    var feeRate = Math.max(0, num($("sp-fee"), 0)) / 100;
    var roundTo = num($("sp-round"), 0);
    var who = $("sp-who").value;

    var feeAmt = total * feeRate;
    var gross = total + feeAmt;
    var each0 = gross / people;
    var each = each0;
    if (who === "self") {
      each = roundTo > 0 ? Math.floor(each0 / roundTo) * roundTo : Math.round(each0 * 100) / 100;
    }
    var selfPay = who === "self" ? gross - each * (people - 1) : each0;
    var check = each * (people - 1) + selfPay;

    $("sp-gross").textContent = yuan(gross);
    $("sp-fee-amt").textContent = yuan(feeAmt);
    $("sp-each").textContent = money(each);
    $("sp-others").textContent = people > 1 ? yuan(each) + " × " + (people - 1) + " 人" : "—";
    $("sp-self").textContent = yuan(selfPay) + (who === "self" && selfPay >= each - 0.0001 ? "（含零头 " + money(selfPay - each) + "）" : "");
    $("sp-check").textContent = yuan(check);
    $("sp-note").textContent = "算法：（消费总额 " + money(total) + " + 服务费 " + pct(feeRate, 2) + "）÷ " + people + " 人 = 每人 " + money(each0) + "。"
      + (who === "self" && roundTo > 0
        ? "按「抹到 " + roundTo + " 元」处理，其他人各付 " + money(each) + "，零头 " + money(gross - each * people) + " 由发起人承担，收款合计 " + money(check) + " 与实付一致。"
        : "每人金额先四舍五入到分，差出来的几分钱由发起人补，收款合计与实付一致。")
      + " 聚餐 AA 里最容易吵的两件事：服务费有没有算进人均、以及有没有人没喝酒/没吃某道菜——后者建议单独把酒水剔除后再按人数分。";
  }

  function calcMulti() {
    var amt = Math.max(0, num($("mc-amount"), 0));
    var cur = $("mc-cur").value || "CNY";
    var rates = {}, cny = amt;
    for (var i = 0; i < CURS.length; i++) {
      rates[CURS[i].k] = Math.max(0, num($(CURS[i].id), 0));
    }
    if (cur !== "CNY") cny = amt * (rates[cur] || 0);

    $("mc-cny").textContent = money(cny);
    var parts = [];
    for (var j = 0; j < CURS.length; j++) {
      var c = CURS[j], rr = rates[c.k];
      var v = rr > 0 ? cny / rr : 0;
      $(c.out).textContent = rr > 0 ? fmt(v, c.digits) + " " + c.name : "请填汇率";
      if (rr > 0) parts.push(c.name + " " + fmt(v, c.digits));
    }
    var spread = cny / 1.004;
    $("mc-spread").textContent = money(spread) + " 元（少的 " + money(cny - spread) + " 就是点差成本）";

    $("mc-note").textContent = "先把金额统一折成人民币 " + money(cny) + " 元（" + (cur === "CNY" ? "本来就是人民币" : "按你填的 " + cur + " 汇率折算") + "），再按各币种汇率换出去："
      + (parts.length ? parts.join("、") : "（汇率未填）") + "。"
      + " 这里的汇率必须你自己填——本页不联网、不取实时行情，写上你能换到的实际价格才有意义。"
      + " 真实换汇三个损耗点：银行「现汇/现钞」买卖价差（个人购汇按银行卖出价，通常比中间价贵 0.3%–1%）；"
      + "跨境汇款电报费/手续费（每笔几十到两百元）；境外刷卡走卡组织汇率，Visa/Mastercard 可能再收 0–3% 货币转换费（银联多数免）。"
      + " 另外个人年度便利化额度是每人每年等值 5 万美元，超过要提供真实用途凭证。";
  }

  function calcCar() {
    var price = Math.max(0, num($("cr-price"), 0));
    var yrs = Math.max(1, Math.min(20, Math.round(num($("cr-years"), 8))));
    var resid = Math.min(100, Math.max(0, num($("cr-residual"), 30))) / 100;
    var km = Math.max(0, num($("cr-km"), 0));
    var fc = Math.max(0, num($("cr-fc"), 0));
    var oil = Math.max(0, num($("cr-oil"), 0));
    var ins = Math.max(0, num($("cr-ins"), 0));
    var maint = Math.max(0, num($("cr-maint"), 0));
    var park = Math.max(0, num($("cr-park"), 0));
    var taxi = Math.max(0, num($("cr-taxi"), 0));

    var dep = (price - price * resid) / yrs;
    var fuel = km * fc / 100 * oil;
    var fixed = ins + maint + park;
    var total = dep + fuel + fixed;
    var perkm = km > 0 ? total / km : 0;
    var taxiYear = km * taxi;
    var diff = taxiYear - total;

    $("cr-total").textContent = money(total);
    $("cr-dep").textContent = yuan(dep);
    $("cr-fuel").textContent = yuan(fuel);
    $("cr-fixed").textContent = yuan(fixed);
    $("cr-perkm").textContent = km > 0 ? money(perkm) + " 元 / 公里" : "—（填了里程才算）";
    $("cr-taxi-year").textContent = yuan(taxiYear);
    $("cr-diff").textContent = (diff >= 0 ? "打车贵 " : "养车贵 ") + money(Math.abs(diff)) + " 元 / 年";
    $("cr-life").textContent = yuan(total * yrs) + "（" + yrs + " 年）";

    $("cr-note").textContent = "每年真实成本 = 折旧 " + money(dep) + "（" + money(price) + " 元开 " + yrs + " 年、残值 " + pct(resid, 0) + " 卖掉，这是最大的一块，也最容易被忽略）"
      + " + 油费 " + money(fuel) + "（" + fmt(km, 0) + " 公里 × " + fmt(fc, 1) + "L/100km × " + money(oil) + " 元）"
      + " + 保险保养停车 " + money(fixed) + " = " + money(total) + " 元，折合 " + money(perkm) + " 元/公里。"
      + " 同样里程打车要 " + money(taxiYear) + " 元，" + (diff >= 0 ? "打车反而贵 " + money(diff) : "养车贵 " + money(-diff)) + " 元/年。"
      + " 关键结论：车的大部分成本是「固定」的（折旧、保险、停车），开得越少每公里越贵——"
      + "年里程低于 8000 公里、又在限行/停车贵的城市，打车+租车通常更划算；年里程过 1.5 万公里、有孩子要接送、常跑郊区，买车才值。"
      + " 另外别忘了：购置税（燃油车约车价 8.85%）、上牌费、首年保险、贷款利息都没算在这里；"
      + "电车还有充电/家充桩/电池衰减，油车还有大保养和轮胎。买之前先把这笔账算清，别只看月供。";
  }

  function calcDebtFree() {
    var list = [
      { n: "车贷尾款", b: Math.max(0, num($("df-bal1"), 0)), r: Math.max(0, num($("df-rate1"), 0)) / 100, m: Math.max(0, num($("df-min1"), 0)) },
      { n: "信用卡", b: Math.max(0, num($("df-bal2"), 0)), r: Math.max(0, num($("df-rate2"), 0)) / 100, m: Math.max(0, num($("df-min2"), 0)) },
      { n: "消费贷", b: Math.max(0, num($("df-bal3"), 0)), r: Math.max(0, num($("df-rate3"), 0)) / 100, m: Math.max(0, num($("df-min3"), 0)) }
    ].filter(function (d) { return d.b > 0.005; });
    var extra = Math.max(0, num($("df-extra"), 0));

    function run(mode, ex) {
      var ds = list.map(function (d) { return { n: d.n, b: d.b, r: d.r, m: d.m, done: 0, int0: 0 }; });
      var pool = ex, month = 0, intTotal = 0, alive = ds.length > 0;
      while (alive && month < 600) {
        month++;
        ds.forEach(function (d) {
          if (d.b <= 0.005) return;
          var it = d.b * d.r / 12;
          d.b += it; d.int0 += it; intTotal += it;
        });
        ds.forEach(function (d) {
          if (d.b <= 0.005) return;
          d.b -= Math.min(d.b, d.m);
        });
        var left = pool;
        while (left > 0.005) {
          var act = ds.filter(function (d) { return d.b > 0.005; });
          if (!act.length) break;
          var t = act[0];
          act.forEach(function (d) {
            if (mode === "avalanche" ? d.r > t.r : d.b < t.b) t = d;
          });
          var p = Math.min(t.b, left);
          t.b -= p; left -= p;
        }
        pool = ex;
        ds.forEach(function (d) { if (d.b <= 0.005) pool += d.m; });
        ds.forEach(function (d) { if (d.b <= 0.005 && !d.done) d.done = month; });
        alive = ds.some(function (d) { return d.b > 0.005; });
      }
      return { months: month, interest: intTotal, rows: ds, capped: alive };
    }

    var A = run("avalanche", extra), S = run("snowball", extra), M = run("avalanche", 0);
    var totalDebt = list.reduce(function (s, d) { return s + d.b; }, 0);
    var perMonth = extra + list.reduce(function (s, d) { return s + d.m; }, 0);
    var diff = S.interest - A.interest;
    var firstA = null, firstS = null;
    list.forEach(function (d) {
      if (!firstA || d.r > firstA.r) firstA = d;
      if (!firstS || d.b < firstS.b) firstS = d;
    });

    $("df-months").textContent = A.capped ? ">600" : String(A.months);
    $("df-total").textContent = yuan(totalDebt);
    $("df-permonth").textContent = yuan(perMonth) + (extra > 0 ? "（含额外 " + money(extra) + "）" : "");
    $("df-intA").textContent = yuan(A.interest);
    $("df-intS").textContent = yuan(S.interest);
    $("df-diff").textContent = diff > 0.005 ? yuan(diff) + "（高息优先更省）" : "两者一样";
    $("df-minonly").textContent = M.capped ? "50 年都还不完" : M.months + " 个月 / 利息 " + money(M.interest) + " 元";
    $("df-first").textContent = (firstA ? firstA.n : "—") + "（" + (firstA ? money(firstA.b) : "0") + " 元，利率 " + (firstA ? fmt(firstA.r * 100, 1) : "0") + "%）";

    var body = $("df-body");
    body.innerHTML = "";
    list.forEach(function (d, idx) {
      var tr = document.createElement("tr");
      var aRow = A.rows[idx] || { done: 0, int0: 0 };
      var sRow = S.rows[idx] || { done: 0, int0: 0 };
      [d.n, money(d.b), fmt(d.r * 100, 1) + "%",
        (A.capped ? ">600" : aRow.done) + " 月", (S.capped ? ">600" : sRow.done) + " 月", money(aRow.int0)
      ].forEach(function (v) {
        var td = document.createElement("td");
        td.textContent = v;
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });

    if (!list.length) {
      $("df-note").textContent = "先填上至少一笔欠款的余额和利率。";
      return;
    }
    var note = "两种打法的区别只有一句：雪崩法把额外的钱先砸向利率最高的那笔（数学最优），雪球法先砸向余额最小的那笔（最快看到「清零」，心理最优）。"
      + " 在你这个例子里，雪崩法总利息 " + money(A.interest) + " 元，雪球法 " + money(S.interest) + " 元，差 "
      + money(Math.abs(diff)) + " 元";
    note += diff > 0.005
      ? "，雪崩法更省。差额看着不大，是因为你的月供已经压过利息了；如果信用卡余额再大一点、或者额外加的钱再多一点，这个差距会迅速放大。"
      : "，两者一样——说明你的最低还款已经远高于利息，钱的顺序排不排队都无所谓，这种情况下先清哪笔看心情就行。";
    note += " 真正的杀手是这个：只还最低、一分不加，要 " + (M.capped ? "50 年以上（等于永远还不完）" : M.months + " 个月、付 " + money(M.interest) + " 元利息") + "。"
      + " 所以顺序问题远不如「每月多砸进去 " + money(extra) + " 元」重要。"
      + " 三条实操：① 先把应急金留够（3–6 个月支出）再加速还债，否则一遇到意外又得刷卡，白干；"
      + " ② 信用卡循环利息按日息万分之五算，年化 18% 左右，任何「理财」都跑不赢它，优先清掉；"
      + " ③ 别用「新贷还旧贷」把高息换成看起来低息的长期贷款——如果总成本没降，你只是把痛苦拉长了。"
      + " 还清一笔之后，记得把原来那笔月供继续投出去，别让它悄悄变成消费。";
    $("df-note").textContent = note;
  }

  function calcDebtMerge() {
    var P = Math.max(0, num($("dm-bal"), 0));
    var oldR = Math.max(0, num($("dm-old"), 0)) / 100;
    var newR = Math.max(0, num($("dm-new"), 0)) / 100;
    var feeP = Math.max(0, num($("dm-fee"), 0)) / 100;
    var pay = Math.max(0, num($("dm-pay"), 0));

    function sim(principal, annual, fee) {
      var bal = principal * (1 + fee), m = 0, tot = 0, i = annual / 12;
      if (pay <= bal * i) return null;
      while (bal > 0.005 && m < 720) {
        var it = bal * i;
        tot += it;
        bal = bal + it - pay;
        m++;
      }
      if (bal > 0.005) return null;
      return { m: m, tot: tot };
    }

    var a = sim(P, oldR, 0);
    var b = sim(P, newR, feeP);
    var feeAmt = P * feeP;
    var body = $("dm-body");
    body.innerHTML = "";

    if (!a || !b) {
      $("dm-save").textContent = "—";
      ["dm-m1", "dm-t1", "dm-m2", "dm-t2", "dm-feeamt", "dm-breakeven"].forEach(function (id) { $(id).textContent = "—"; });
      $("dm-note").textContent = "每月还款额太小（连利息都不够还），本金永远还不完。把「每月能还多少」调大到超过「余额 × 月利率」再算。";
      return;
    }

    var saveV = a.tot - b.tot - feeAmt;
    $("dm-save").textContent = money(saveV);
    $("dm-m1").textContent = a.m + " 个月";
    $("dm-t1").textContent = yuan(a.tot);
    $("dm-m2").textContent = b.m + " 个月";
    $("dm-t2").textContent = yuan(b.tot);
    $("dm-feeamt").textContent = yuan(feeAmt) + "（" + pct(feeP, 2) + "）";

    var be = null, lo = 0, hi = 0.6;
    for (var s = 0; s < 60; s++) {
      var mid = (lo + hi) / 2, r = sim(P, newR, mid);
      var sv = r ? a.tot - r.tot - P * mid : -1;
      if (sv > 0) lo = mid; else hi = mid;
      if (r && Math.abs(sv) < 0.5) { be = mid; break; }
    }
    if (be === null) be = hi;
    $("dm-breakeven").textContent = pct(be, 2) + "（" + money(P * be) + " 元）";

    var list = [0, 0.01, 0.02, 0.03, 0.05, 0.08];
    for (var k = 0; k < list.length; k++) {
      var fr = list[k], rr = sim(P, newR, fr);
      var sv2 = rr ? a.tot - rr.tot - P * fr : -1;
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + pct(fr, 0) + "</td><td>" + money(P * fr) + "</td><td>" + (sv2 >= 0 ? "+" : "") + money(sv2)
        + "</td><td>" + (sv2 > 0 ? "划算" : (sv2 > -50 ? "打平" : "不划算")) + "</td>";
      body.appendChild(tr);
    }

    $("dm-note").textContent = "用同样每月还 " + money(pay) + " 元来比：不置换要还 " + a.m + " 个月、付利息 " + money(a.tot)
      + " 元；换成 " + pct(newR, 2) + " 的新贷（手续费 " + money(feeAmt) + " 元计进本金）只要 " + b.m + " 个月、付利息 " + money(b.tot)
      + " 元。合计（含手续费）省 " + money(saveV) + " 元，手续费率只要低于 " + pct(be, 2) + " 就还是划算的。"
      + " 判断标准一句话：新贷的真实年化（利率 + 手续费摊到期限里）低于旧债利率，就值得换。"
      + " 但置换有三个坑：① 只有「真降息」才划算，很多产品看着利率低，加上手续费、服务费、保证金后真实年化并没降多少；"
      + " ② 借新还旧本质是把短期高息换成长期低息，如果你还按原来那样慢慢还，总利息反而可能变多——所以这里固定了「每月还多少」来比；"
      + " ③ 别为了置换去碰「以贷养贷」的中介过桥，那类综合成本经常超过 24%，比原来的信用卡还贵。";
  }

  function calcFreePeriod() {
    var bill = Math.min(28, Math.max(1, Math.round(num($("fp-bill"), 5))));
    var due = Math.min(28, Math.max(1, Math.round(num($("fp-due"), 25))));
    var amount = Math.max(0, num($("fp-amount"), 0));
    var DAY = 86400000;
    var today = new Date(); today.setHours(0, 0, 0, 0);

    function billFor(d) {
      var y = d.getFullYear(), m = d.getMonth();
      return d.getDate() <= bill ? new Date(y, m, bill) : new Date(y, m + 1, bill);
    }
    function payFor(bd) {
      return due > bill ? new Date(bd.getFullYear(), bd.getMonth(), due)
                        : new Date(bd.getFullYear(), bd.getMonth() + 1, due);
    }
    function md(d) { return (d.getMonth() + 1) + "/" + d.getDate(); }
    function info(d) {
      var bd = billFor(d), pay = payFor(bd);
      return { bd: bd, pay: pay, days: Math.max(0, Math.round((pay - d) / DAY)) };
    }

    var now = info(today);
    var bestDate = new Date(today.getFullYear(), today.getMonth(), bill + 1);
    if (bestDate <= today) bestDate = new Date(today.getFullYear(), today.getMonth() + 1, bill + 1);
    var best = info(bestDate);

    $("fp-days").textContent = now.days;
    $("fp-billdate").textContent = md(now.bd) + " 出账";
    $("fp-paydate").textContent = md(now.pay);
    $("fp-max").textContent = best.days + " 天";
    $("fp-best").textContent = md(bestDate) + "（账单日 " + md(best.bd) + " → 还款 " + md(best.pay) + "）";
    $("fp-lost").textContent = Math.max(0, best.days - now.days) + " 天";
    $("fp-cost").textContent = amount > 0
      ? yuan(amount * 0.138) + "（按 13.8% 年化借一年的利息）"
      : "填个金额就能看到";

    var body = $("fp-body");
    body.innerHTML = "";
    // 消费日跟着「账单日」走：今天 → 本期出账日 → 出账次日（最优）→ 出账后若干天，改账单日会同步刷新
    var bd0 = billFor(today);
    var dates = [today, bd0, new Date(bd0.getFullYear(), bd0.getMonth(), bd0.getDate() + 1)];
    [3, 7, 14, 20, 25].forEach(function (off) {
      dates.push(new Date(bd0.getFullYear(), bd0.getMonth(), bd0.getDate() + off));
    });
    for (var k = 0; k < dates.length; k++) {
      var d = dates[k];
      var inf = info(d);
      var label = d.getTime() === today.getTime() ? md(d) + "（今天）" : md(d);
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + label + "</td><td>" + md(inf.bd) + "</td><td>" + md(inf.pay)
        + "</td><td>" + inf.days + "</td>";
      body.appendChild(tr);
    }

    $("fp-note").textContent = "免息期的起点不是刷卡那天，而是「这笔钱被算进哪期账单」——"
      + "账单日 " + bill + " 号之后刷的，会推到下个月 " + bill + " 号出账，于是白拿更多天。"
      + " 你这张卡最长免息 " + best.days + " 天，就是刷在 " + md(bestDate) + "（账单日次日）的时候；"
      + " 今天刷只有 " + now.days + " 天，比最优少 " + Math.max(0, best.days - now.days) + " 天。大额消费挪到账单日次日再刷，等于白拿一个多月的无息贷款。下方表格的消费日会跟着账单日自动重算：第一行是今天，其后是出账日、出账次日（最优）和出账后几个关键日子；改账单日/还款日，全表同步刷新。"
      + " 但要记住三件事：① 免息期只对「全额还款」有效，哪怕差 1 元没还清，全部消费都从记账日起按日息 0.05% 计息（年化 18.25%），免息一天都没有；"
      + " ② 取现、转账、分期不享受免息，取现当天就开始算利息还有手续费；"
      + " ③ 所谓「最低还款」只是不逾期，利息照样全额算，所以别把免息期当收入，它只是让现金流顺一点。";
  }

  function calcEv() {
    var km = Math.max(0, num($("ev-km"), 0));
    var oilL = Math.max(0, num($("ev-oil"), 0));
    var oilP = Math.max(0, num($("ev-price"), 0));
    var kwh = Math.max(0, num($("ev-kwh"), 0));
    var eP = Math.max(0, num($("ev-eprice"), 0));
    var p1 = Math.max(0, num($("ev-p1"), 0));
    var p2 = Math.max(0, num($("ev-p2"), 0));
    var yrs = Math.max(1, Math.min(20, Math.round(num($("ev-years"), 8))));
    var r1 = Math.min(100, Math.max(0, num($("ev-res1"), 30))) / 100;
    var r2 = Math.min(100, Math.max(0, num($("ev-res2"), 25))) / 100;
    var m1 = Math.max(0, num($("ev-m1"), 0));
    var m2 = Math.max(0, num($("ev-m2"), 0));
    var i1 = Math.max(0, num($("ev-i1"), 0));
    var i2 = Math.max(0, num($("ev-i2"), 0));

    var oilE = km * oilL / 100 * oilP;
    var evE = km * kwh / 100 * eP;
    var oilY = oilE + m1 + i1;
    var evY = evE + m2 + i2;

    function total(price, yearCost, resid, k) {
      return price + yearCost * k - price * resid;
    }
    var t1 = total(p1, oilY, r1, yrs);
    var t2 = total(p2, evY, r2, yrs);
    var diff = t1 - t2;

    var fixedDiff = (m1 - m2) + (i1 - i2);
    var perKm = (oilL * oilP - kwh * eP) / 100;
    var priceDiff = (p2 - p1) - (p2 * r2 - p1 * r1);
    var crit = perKm > 0 ? (priceDiff / yrs - fixedDiff) / perKm : 0;

    $("ev-diff").textContent = (diff >= 0 ? "" : "-") + money(Math.abs(diff));
    $("ev-energy").textContent = money(oilE) + " / " + money(evE);
    $("ev-year").textContent = money(oilY) + " / " + money(evY);
    $("ev-perkm").textContent = money(km > 0 ? oilY / km : 0) + " / " + money(km > 0 ? evY / km : 0) + " 元";
    $("ev-t1").textContent = yuan(t1);
    $("ev-t2").textContent = yuan(t2);
    $("ev-crit").textContent = Math.max(0, Math.round(crit)).toLocaleString("zh-CN") + " 公里/年";

    var body = $("ev-body");
    body.innerHTML = "";
    var list = [5000, 10000, 15000, 20000, 30000];
    for (var k = 0; k < list.length; k++) {
      var kk = list[k];
      var oy = kk * oilL / 100 * oilP + m1 + i1;
      var ey = kk * kwh / 100 * eP + m2 + i2;
      var a = total(p1, oy, r1, yrs), b = total(p2, ey, r2, yrs);
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + money(kk) + "</td><td>" + money(a) + "</td><td>" + money(b) + "</td><td>"
        + (a > b ? "电车省 " + money(a - b) : "油车省 " + money(b - a)) + "</td>";
      body.appendChild(tr);
    }

    $("ev-note").textContent = "按一年开 " + money(km) + " 公里（油价 " + oilP + " 元/L、电耗 " + kwh + " 度/100km、电价 " + eP
      + " 元/度）算：油费 " + money(oilE) + " 元、电费 " + money(evE) + " 元，一年光能源就差 " + money(oilE - evE) + " 元。"
      + " 加上保养和保险，油车一年 " + money(oilY) + " 元、电车 " + money(evY) + " 元。"
      + " 把购车差价和 " + yrs + " 年后的残值也算进来，开满 " + yrs + " 年油车总花费 " + money(t1) + " 元、电车 " + money(t2) + " 元，"
      + (diff >= 0 ? "电车省 " + money(diff) + " 元。" : "电车反而贵 " + money(-diff) + " 元。")
      + " 关键变量是里程：盈亏平衡点大约在每年 " + Math.max(0, Math.round(crit)).toLocaleString("zh-CN") + " 公里，开得比这多电车才划算。"
      + " 三个常被忽略的项：① 电车首年折旧很猛（三年掉价常超一半），保值率差的部分我按残值率算了，实际可能更狠；"
      + " ② 家里能不能装充电桩决定电价，全靠公共快充（1.5 元/度以上）时优势会被吃掉一半；"
      + " ③ 电池衰减、换电成本、保险逐年上涨都没算进去，长途多的人还要算上补能时间成本。";
  }

export const PANELS = {"installment":"  <section class=\"panel\" id=\"panel-installment\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>分期金额（元）</span>\n      <input id=\"is-amount\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"12000\">\n    </label>\n    <label class=\"f\">\n      <span>分期期数（月）</span>\n      <input id=\"is-months\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"12\">\n    </label>\n    <label class=\"f\">\n      <span>手续费怎么收</span>\n      <select id=\"is-mode\">\n        <option value=\"monthly\" selected>每期收，按期费率</option>\n        <option value=\"once\">一次性收，按总费率</option>\n        <option value=\"fixed\">直接给总手续费金额</option>\n      </select>\n    </label>\n    <label class=\"f\">\n      <span id=\"is-rate-label\">每期费率（%）</span>\n      <input id=\"is-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"0.6\">\n      <em>银行/平台常写「月费率 0.6%」或「每期 0.6%」，就填这里</em>\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">实际年化利率（IRR 口径）</span>\n      <strong id=\"is-apr\">—</strong>\n      <span class=\"unit\">%</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>每期还款</span><b id=\"is-pay\">—</b></li>\n      <li><span>手续费合计</span><b id=\"is-fee\">—</b></li>\n      <li><span>名义年化（费率×12）</span><b id=\"is-nominal\">—</b></li>\n      <li><span>比宣传的费率贵多少倍</span><b id=\"is-multiple\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"is-note\"></p>\n  </div>\n    </div>\n  </section>\n","deal":"  <section class=\"panel\" id=\"panel-deal\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>打折 / 满减</h2>\n    <label class=\"f\">\n      <span>原价（元 / 件）</span>\n      <input id=\"dl-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"299\">\n    </label>\n    <label class=\"f\">\n      <span>折扣（几折，不打折填 10）</span>\n      <input id=\"dl-discount\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"8.5\">\n    </label>\n    <label class=\"f\">\n      <span>满减条件（满 X 元，没有填 0）</span>\n      <input id=\"dl-threshold\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"300\">\n    </label>\n    <label class=\"f\">\n      <span>满减金额（减 Y 元）</span>\n      <input id=\"dl-off\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"50\">\n    </label>\n    <label class=\"f\">\n      <span>数量（件）</span>\n      <input id=\"dl-qty\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"2\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">实际要付</span>\n      <strong id=\"dl-pay\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>相当于打几折</span><b id=\"dl-real-discount\">—</b></li>\n      <li><span>省了多少钱</span><b id=\"dl-save\">—</b></li>\n      <li><span>每件实际单价</span><b id=\"dl-unit\">—</b></li>\n      <li><span>离下一档满减还差</span><b id=\"dl-next\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"dl-note\"></p>\n  </div>\n    </div>\n\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>单价比较：哪个更划算</h2>\n    <label class=\"f\">\n      <span>商品 A</span>\n      <span class=\"row\">\n        <input id=\"dl-pa\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"39.9\" placeholder=\"价格\">\n        <input id=\"dl-qa\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"750\" placeholder=\"数量\">\n        <select id=\"dl-ua\">\n          <option value=\"克\" selected>克</option>\n          <option value=\"毫升\">毫升</option>\n          <option value=\"个\">个</option>\n          <option value=\"片\">片</option>\n        </select>\n      </span>\n    </label>\n    <label class=\"f\">\n      <span>商品 B</span>\n      <span class=\"row\">\n        <input id=\"dl-pb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"56\" placeholder=\"价格\">\n        <input id=\"dl-qb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"1100\" placeholder=\"数量\">\n        <select id=\"dl-ub\">\n          <option value=\"克\" selected>克</option>\n          <option value=\"毫升\">毫升</option>\n          <option value=\"个\">个</option>\n          <option value=\"片\">片</option>\n        </select>\n      </span>\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>比较结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">更划算的是</span>\n      <strong id=\"dl-winner\">—</strong>\n      <span class=\"unit\" id=\"dl-winner-unit\"></span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>商品 A 单价</span><b id=\"dl-unit-a\">—</b></li>\n      <li><span>商品 B 单价</span><b id=\"dl-unit-b\">—</b></li>\n      <li><span>差价比例</span><b id=\"dl-diff\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"dl-note2\"></p>\n  </div>\n    </div>\n  </section>\n","card":"  <section class=\"panel\" id=\"panel-card\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>本期账单金额（元）</span>\n      <input id=\"cd-balance\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"10000\">\n    </label>\n    <label class=\"f\">\n      <span>最低还款比例（%）</span>\n      <input id=\"cd-min\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"10\">\n    </label>\n    <label class=\"f\">\n      <span>日利率（%）</span>\n      <input id=\"cd-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.005\" value=\"0.05\">\n      <em>信用卡循环利息一般是日息万分之五，即 0.05%</em>\n    </label>\n    <label class=\"f\">\n      <span>每期计息天数</span>\n      <input id=\"cd-days\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"30\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果（只还最低还款）</h2>\n    <div class=\"big\">\n      <span class=\"k\">首期利息</span>\n      <strong id=\"cd-interest\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>折合年化利率</span><b id=\"cd-apr\">—</b></li>\n      <li><span>本期最低还款额</span><b id=\"cd-min-amt\">—</b></li>\n      <li><span>一直只还最低，还清需要</span><b id=\"cd-months\">—</b></li>\n      <li><span>累计利息</span><b id=\"cd-total-int\">—</b></li>\n      <li><span>12 期后仍欠</span><b id=\"cd-left\">—</b></li>\n      <li><span>若这次全额还清可省利息</span><b id=\"cd-save\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"cd-note\"></p>\n  </div>\n    </div>\n  </section>\n","fx":"  <section class=\"panel\" id=\"panel-fx\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>汇率换算</h2>\n    <label class=\"f\">\n      <span>金额</span>\n      <span class=\"row\">\n        <input id=\"fx-amount\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"1000\">\n        <select id=\"fx-cur\">\n          <option value=\"美元\">美元 USD</option>\n          <option value=\"欧元\">欧元 EUR</option>\n          <option value=\"日元\">日元 JPY</option>\n          <option value=\"港币\">港币 HKD</option>\n          <option value=\"英镑\">英镑 GBP</option>\n          <option value=\"澳元\">澳元 AUD</option>\n          <option value=\"加元\">加元 CAD</option>\n          <option value=\"韩元\">韩元 KRW</option>\n          <option value=\"新币\">新币 SGD</option>\n          <option value=\"泰铢\">泰铢 THB</option>\n        </select>\n      </span>\n    </label>\n    <label class=\"f\">\n      <span>汇率：1 外币 = ? 人民币</span>\n      <input id=\"fx-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"7.10\">\n      <em>汇率每天变，按你手上银行 App 的实时牌价填</em>\n    </label>\n    <label class=\"f\">\n      <span>换汇手续费 / 点差（%）</span>\n      <input id=\"fx-fee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"0\">\n    </label>\n\n    <h2 class=\"sub\">单位换算</h2>\n    <label class=\"f\">\n      <span>类别</span>\n      <select id=\"fx-cat\">\n        <option value=\"length\" selected>长度</option>\n        <option value=\"weight\">重量</option>\n        <option value=\"area\">面积</option>\n        <option value=\"volume\">体积</option>\n        <option value=\"temp\">温度</option>\n      </select>\n    </label>\n    <label class=\"f\">\n      <span>数值</span>\n      <input id=\"fx-value\" type=\"number\" inputmode=\"decimal\" step=\"1\" value=\"1\">\n    </label>\n    <label class=\"f\">\n      <span>从 / 到</span>\n      <span class=\"row\">\n        <select id=\"fx-from\"></select>\n        <select id=\"fx-to\"></select>\n      </span>\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\" id=\"fx-main-label\">折合人民币</span>\n      <strong id=\"fx-main\">—</strong>\n      <span class=\"unit\" id=\"fx-main-unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>扣掉手续费后实际到账</span><b id=\"fx-net\">—</b></li>\n      <li><span>反过来：人民币 → 外币</span><b id=\"fx-rev\">—</b></li>\n      <li><span>单位换算结果</span><b id=\"fx-unit-result\">—</b></li>\n      <li><span>换算关系</span><b id=\"fx-unit-formula\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"fx-note\"></p>\n  </div>\n    </div>\n  </section>\n","split":"  <section class=\"panel\" id=\"panel-split\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>消费总额（元）</span>\n      <input id=\"sp-total\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"1288\">\n    </label>\n    <label class=\"f\">\n      <span>参与人数（含自己）</span>\n      <input id=\"sp-people\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"6\">\n    </label>\n    <label class=\"f\">\n      <span>服务费 / 小费（%）</span>\n      <input id=\"sp-fee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"10\">\n    </label>\n    <label class=\"f\">\n      <span>抹零方式</span>\n      <select id=\"sp-round\">\n        <option value=\"0\" selected>精确到分</option>\n        <option value=\"1\">抹到元</option>\n        <option value=\"10\">抹到 10 元</option>\n      </select>\n    </label>\n    <label class=\"f\">\n      <span>谁承担抹零差额</span>\n      <select id=\"sp-who\">\n        <option value=\"self\" selected>发起人（自己多出）</option>\n        <option value=\"all\">大家平摊（不抹零）</option>\n      </select>\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">每人应付</span>\n      <strong id=\"sp-each\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>含服务费的实付总额</span><b id=\"sp-gross\">—</b></li>\n      <li><span>其中服务费</span><b id=\"sp-fee-amt\">—</b></li>\n      <li><span>其他人各付</span><b id=\"sp-others\">—</b></li>\n      <li><span>发起人（你）实际付</span><b id=\"sp-self\">—</b></li>\n      <li><span>收款合计核对</span><b id=\"sp-check\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"sp-note\"></p>\n  </div>\n    </div>\n  </section>\n","multi":"  <section class=\"panel\" id=\"panel-multi\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>金额</span>\n      <input id=\"mc-amount\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"10000\">\n    </label>\n    <label class=\"f\">\n      <span>这笔钱是哪种货币</span>\n      <select id=\"mc-cur\">\n        <option value=\"CNY\" selected>人民币 CNY</option>\n        <option value=\"USD\">美元 USD</option>\n        <option value=\"EUR\">欧元 EUR</option>\n        <option value=\"JPY\">日元 JPY</option>\n        <option value=\"HKD\">港币 HKD</option>\n        <option value=\"GBP\">英镑 GBP</option>\n      </select>\n    </label>\n    <h2 class=\"sub\">汇率（元 / 1 外币，手动填）</h2>\n    <label class=\"f\">\n      <span>美元 USD</span>\n      <input id=\"mc-usd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"7.10\">\n    </label>\n    <label class=\"f\">\n      <span>欧元 EUR</span>\n      <input id=\"mc-eur\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"7.75\">\n    </label>\n    <label class=\"f\">\n      <span>日元 JPY（每 1 日元）</span>\n      <input id=\"mc-jpy\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.001\" value=\"0.0475\">\n    </label>\n    <label class=\"f\">\n      <span>港币 HKD</span>\n      <input id=\"mc-hkd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.001\" value=\"0.912\">\n    </label>\n    <label class=\"f\">\n      <span>英镑 GBP</span>\n      <input id=\"mc-gbp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"9.05\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">折合人民币</span>\n      <strong id=\"mc-cny\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>美元 USD</span><b id=\"mc-usd-out\">—</b></li>\n      <li><span>欧元 EUR</span><b id=\"mc-eur-out\">—</b></li>\n      <li><span>日元 JPY</span><b id=\"mc-jpy-out\">—</b></li>\n      <li><span>港币 HKD</span><b id=\"mc-hkd-out\">—</b></li>\n      <li><span>英镑 GBP</span><b id=\"mc-gbp-out\">—</b></li>\n      <li><span>银行卖出价上浮 0.4% 后</span><b id=\"mc-spread\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"mc-note\"></p>\n  </div>\n    </div>\n  </section>\n","car":"  <section class=\"panel\" id=\"panel-car\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>车价（元，含购置税等落地价差可另计）</span>\n      <input id=\"cr-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"150000\">\n    </label>\n    <label class=\"f\">\n      <span>计划开几年</span>\n      <input id=\"cr-years\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"20\" step=\"1\" value=\"8\">\n    </label>\n    <label class=\"f\">\n      <span>届时残值率（%）</span>\n      <input id=\"cr-residual\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"30\">\n    </label>\n    <label class=\"f\">\n      <span>每年行驶（公里）</span>\n      <input id=\"cr-km\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"15000\">\n    </label>\n    <label class=\"f\">\n      <span>综合油耗（L/100km）</span>\n      <input id=\"cr-fc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"8\">\n    </label>\n    <label class=\"f\">\n      <span>油价（元/升）</span>\n      <input id=\"cr-oil\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"8\">\n    </label>\n    <label class=\"f\">\n      <span>保险（元/年）</span>\n      <input id=\"cr-ins\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"5000\">\n    </label>\n    <label class=\"f\">\n      <span>保养维修（元/年）</span>\n      <input id=\"cr-maint\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"2000\">\n    </label>\n    <label class=\"f\">\n      <span>停车洗车过路（元/年）</span>\n      <input id=\"cr-park\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"3600\">\n    </label>\n    <label class=\"f\">\n      <span>打车折算单价（元/公里）</span>\n      <input id=\"cr-taxi\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2.4\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">养车每年总成本</span>\n      <strong id=\"cr-total\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>每年折旧</span><b id=\"cr-dep\">—</b></li>\n      <li><span>每年油费</span><b id=\"cr-fuel\">—</b></li>\n      <li><span>保险+保养+停车</span><b id=\"cr-fixed\">—</b></li>\n      <li><span>每公里成本</span><b id=\"cr-perkm\">—</b></li>\n      <li><span>同等里程打车每年</span><b id=\"cr-taxi-year\">—</b></li>\n      <li><span>打车 − 养车</span><b id=\"cr-diff\">—</b></li>\n      <li><span>持有期内总花费</span><b id=\"cr-life\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"cr-note\"></p>\n  </div>\n    </div>\n  </section>\n","debtfree":"  <section class=\"panel\" id=\"panel-debtfree\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（三笔债务，用不到的填 0）</h2>\n    <label class=\"f\"><span>第 1 笔：名称</span><span class=\"hint\">车贷尾款</span></label>\n    <label class=\"f\"><span>余额（元）</span>\n      <input id=\"df-bal1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"15000\"></label>\n    <label class=\"f\"><span>年利率（%）</span>\n      <input id=\"df-rate1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"4\"></label>\n    <label class=\"f\"><span>每月最低还款（元）</span>\n      <input id=\"df-min1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"1200\"></label>\n    <label class=\"f\"><span>第 2 笔：名称</span><span class=\"hint\">信用卡</span></label>\n    <label class=\"f\"><span>余额（元）</span>\n      <input id=\"df-bal2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"50000\"></label>\n    <label class=\"f\"><span>年利率（%）</span>\n      <input id=\"df-rate2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"18\"></label>\n    <label class=\"f\"><span>每月最低还款（元）</span>\n      <input id=\"df-min2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"500\"></label>\n    <label class=\"f\"><span>第 3 笔：名称</span><span class=\"hint\">消费贷</span></label>\n    <label class=\"f\"><span>余额（元）</span>\n      <input id=\"df-bal3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"60000\"></label>\n    <label class=\"f\"><span>年利率（%）</span>\n      <input id=\"df-rate3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"9\"></label>\n    <label class=\"f\"><span>每月最低还款（元）</span>\n      <input id=\"df-min3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"800\"></label>\n    <label class=\"f\"><span>每月额外能多还（元）</span>\n      <input id=\"df-extra\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"2000\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">高息优先，还清要</span><strong id=\"df-months\">—</strong><span class=\"unit\">个月</span></div>\n    <ul class=\"kv\">\n      <li><span>欠款合计</span><b id=\"df-total\">—</b></li>\n      <li><span>每月实际投入（最低还款＋额外）</span><b id=\"df-permonth\">—</b></li>\n      <li><span>雪崩法（先还利率最高）总利息</span><b id=\"df-intA\">—</b></li>\n      <li><span>雪球法（先还金额最小）总利息</span><b id=\"df-intS\">—</b></li>\n      <li><span>雪崩法少付利息</span><b id=\"df-diff\">—</b></li>\n      <li><span>只还最低、一分不加</span><b id=\"df-minonly\">—</b></li>\n      <li><span>第一笔该先清掉</span><b id=\"df-first\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>债务</th><th>余额</th><th>利率</th><th>雪崩</th><th>雪球</th><th>利息</th></tr></thead>\n        <tbody id=\"df-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"df-note\"></p>\n  </div>\n    </div>\n  </section>\n","debtmerge":"  <section class=\"panel\" id=\"panel-debtmerge\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>现在欠多少（高息那边，元）</span>\n      <input id=\"dm-bal\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"50000\"></label>\n    <label class=\"f\"><span>现在这笔的年利率（%）</span>\n      <input id=\"dm-old\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"18\"></label>\n    <label class=\"f\"><span>置换后的年利率（%）</span>\n      <input id=\"dm-new\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"7\"></label>\n    <label class=\"f\"><span>置换手续费（按本金 %）</span>\n      <input id=\"dm-fee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"2\"></label>\n    <label class=\"f\"><span>每月能还多少（元）</span>\n      <input id=\"dm-pay\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"2500\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">置换后能省</span><strong id=\"dm-save\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>不置换：还清要</span><b id=\"dm-m1\">—</b></li>\n      <li><span>不置换：付的利息</span><b id=\"dm-t1\">—</b></li>\n      <li><span>置换后：还清要</span><b id=\"dm-m2\">—</b></li>\n      <li><span>置换后：付的利息</span><b id=\"dm-t2\">—</b></li>\n      <li><span>手续费（计入本金）</span><b id=\"dm-feeamt\">—</b></li>\n      <li><span>手续费率高到多少就不划算了</span><b id=\"dm-breakeven\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>手续费率</th><th>手续费</th><th>净省</th><th>结论</th></tr></thead>\n        <tbody id=\"dm-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"dm-note\"></p>\n  </div>\n    </div>\n  </section>\n","freeperiod":"  <section class=\"panel\" id=\"panel-freeperiod\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>账单日（每月的几号出账）</span>\n      <input id=\"fp-bill\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"28\" step=\"1\" value=\"5\"></label>\n    <label class=\"f\"><span>还款日（每月的几号还钱）</span>\n      <input id=\"fp-due\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"28\" step=\"1\" value=\"25\"></label>\n    <label class=\"f\"><span>计划刷多少（元，可留空）</span>\n      <input id=\"fp-amount\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"5000\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">今天刷，能免息用</span><strong id=\"fp-days\">—</strong><span class=\"unit\">天</span></div>\n    <ul class=\"kv\">\n      <li><span>这笔钱算在哪期账单</span><b id=\"fp-billdate\">—</b></li>\n      <li><span>最晚哪天还</span><b id=\"fp-paydate\">—</b></li>\n      <li><span>最长能免息多少天</span><b id=\"fp-max\">—</b></li>\n      <li><span>最优刷卡日</span><b id=\"fp-best\">—</b></li>\n      <li><span>今天刷比最优差多少天</span><b id=\"fp-lost\">—</b></li>\n      <li><span>这笔钱如果按分期真实成本（年化 13.8%）</span><b id=\"fp-cost\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>消费日</th><th>算进账单</th><th>最晚还款</th><th>免息天数</th></tr></thead>\n        <tbody id=\"fp-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"fp-note\"></p>\n  </div>\n    </div>\n  </section>\n","ev":"  <section class=\"panel\" id=\"panel-ev\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>一年开多少公里</span>\n      <input id=\"ev-km\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"15000\"></label>\n    <label class=\"f\"><span>油车百公里油耗（L）</span>\n      <input id=\"ev-oil\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"8\"></label>\n    <label class=\"f\"><span>油价（元/L）</span>\n      <input id=\"ev-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"8\"></label>\n    <label class=\"f\"><span>电车百公里电耗（度）</span>\n      <input id=\"ev-kwh\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"15\"></label>\n    <label class=\"f\"><span>电价（元/度，家充约 0.6、公充约 1.5）</span>\n      <input id=\"ev-eprice\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"0.6\"></label>\n    <label class=\"f\"><span>油车落地价 / 电车落地价（元）</span>\n      <div class=\"row\">\n        <input id=\"ev-p1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5000\" value=\"150000\">\n        <input id=\"ev-p2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5000\" value=\"180000\">\n      </div></label>\n    <label class=\"f\"><span>开几年 / 残值率（%）</span>\n      <div class=\"row\">\n        <input id=\"ev-years\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"20\" step=\"1\" value=\"8\">\n        <input id=\"ev-res1\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"30\">\n        <input id=\"ev-res2\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"25\">\n      </div></label>\n    <label class=\"f\"><span>每年保养（油/电，元）</span>\n      <div class=\"row\">\n        <input id=\"ev-m1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"200\" value=\"2000\">\n        <input id=\"ev-m2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"200\" value=\"800\">\n      </div></label>\n    <label class=\"f\"><span>每年保险（油/电，元）</span>\n      <div class=\"row\">\n        <input id=\"ev-i1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"4000\">\n        <input id=\"ev-i2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"5500\">\n      </div></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">电车开满期比油车省</span><strong id=\"ev-diff\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>每年油费 / 电费</span><b id=\"ev-energy\">—</b></li>\n      <li><span>每年用车总成本（油 / 电）</span><b id=\"ev-year\">—</b></li>\n      <li><span>每公里（油 / 电）</span><b id=\"ev-perkm\">—</b></li>\n      <li><span>开满期总成本（油）</span><b id=\"ev-t1\">—</b></li>\n      <li><span>开满期总成本（电）</span><b id=\"ev-t2\">—</b></li>\n      <li><span>临界年里程（低于它油车更省）</span><b id=\"ev-crit\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>一年开</th><th>油车总成本</th><th>电车总成本</th><th>谁省</th></tr></thead>\n        <tbody id=\"ev-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"ev-note\"></p>\n  </div>\n    </div>\n  </section>\n"};
export default { installment: calcInstallment, deal: calcDeal, card: calcCard, fx: calcFx, split: calcSplit, multi: calcMulti, car: calcCar, debtfree: calcDebtFree, debtmerge: calcDebtMerge, freeperiod: calcFreePeriod, ev: calcEv };
