/* 自动生成，勿手改：family 分类模块（点开才下载） */
const { $, BUILD_TAG, CAT_KEY, CAT_LABEL, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, EDITED, ERR_BOX, FAV_KEY, FIELDS, FIRST_ACTIVATE, KEY, LAST_KEY, MONTH_CATS, MONTH_TABLE, NEXT_OF, PALETTE_EL, PENDING_PARAMS, PRE_KEY, QUOTA_WARNED, RECENT_KEY, SAVE_TIMER, SEARCH_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, TOAST_EL, UNITS, WF_ARCH_KEY, WF_AUTO_IDX, WF_AUTO_LIST, WF_AUTO_STEP, WF_AUTO_TIMER, WF_CUSTNAME_KEY, WF_CUST_KEY, WF_CUST_NAME, WF_DONE, WF_KEY, WF_LAST, WF_LEGACY, WF_MAN_KEY, WF_META_KEY, WF_MONTH_KEY, WF_NOTE_KEY, WF_PATHS, WF_ROLE_KEY, WF_ROLE_READY, WF_SKIP_KEY, XL_ROWS, YEAR_TABLE, _onPanels, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bindWfDnd, bindWfInline, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, buildTabBadges, calcLoan, calcMap, calcWorkflow, clearWfMan, closePalette, cmpTabName, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, diagText, dlJson, doPrint, drawMonthCats, drawMonthStack, drawReportCharts, drawRpMini, drawnMonthlyChart, drawnYearChart, enhanceNums, enhancePanelUi, ensureChunk, evalExpr, favList, fillCmpMod, fillMonthGrid, fillUnits, flash, flushParams, flushSave, fmt, fmtAt, fmtDate, fx, gauss, getWfCust, getWfDone, getWfMan, getWfMeta, getWfNotes, getWfSkip, hashTarget, isFav, lastName, leftAfter, linkTo, loadCmpA, loadSnaps, loadWfArch, loadWfCust, loadWfDone, loadWfMan, loadWfMeta, loadWfNotes, loadWfSkip, loanRows, makeSnap, markBadInputs, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numBlur, numFocus, numInput, numKey, numOf, openPalette, palKey, panelEls, panelParams, parseAmounts, parseDate, parseNum, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, prePanels, presets, printCover, pushRecent, pushSearch, quickOf, rateOf, readJsonFile, readMonthGrid, recentList, recordWf, refreshCounts, refreshTableTools, refreshTrackMods, refreshWfBadge, renderLoanTable, renderNext, renderPalette, renderPresets, renderSearchHist, renderSnapCompare, renderSnapList, renderTrack, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, saveWfCust, savedCat, scrollResultIfDeepLink, searchHist, setCat, setSub, setTheme, showErrorBox, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tabCatLabel, tap, taxBy, toast, toggleWfStep, trimNum, unitFor, updShown, wfArchiveMonth, wfArchivePut, wfAutoNext, wfAutoStop, wfAutoWalk, wfBar, wfBindCustQ, wfBuildHandoff, wfCarryQuery, wfCsvCell, wfCustNameSave, wfFillCustSel, wfHandoff, wfHandoffCopy, wfHandoffCsv, wfKnownMods, wfLegacyToNew, wfLoad, wfManSave, wfMetaSave, wfMigrateLegacy, wfMonthKey, wfMonthRoll, wfMonthTouch, wfNoteSave, wfOpenInline, wfPad2, wfRenderSummary, wfSet, wfSkipCurrent, wfSkipSave, wfStepKey, wfStepShare, wfStepState, wfVisiblePaths, yuan, zOf } = window.FC;

  function calcEdu() {
    var age = Math.max(0, Math.min(17, num($("ed-age"), 3)));
    var go = Math.max(15, Math.min(25, num($("ed-go"), 18)));
    var cur = Math.max(0, num($("ed-cur"), 0));
    var infl = Math.max(0, num($("ed-infl"), 3)) / 100;
    var have = Math.max(0, num($("ed-have"), 0));
    var rate = Math.max(0, num($("ed-rate"), 3)) / 100;
    var monthly = Math.max(0, num($("ed-monthly"), 0));
    var k = Math.max(0, go - age);

    var first = cur * Math.pow(1 + infl, k);
    var total = 0;
    for (var j = 0; j < 4; j++) total += first * Math.pow(1 + infl, j);
    var haveFV = have * Math.pow(1 + rate, k);
    var gap = total - haveFV;
    var im = rate / 12, N = Math.round(k * 12);
    var fac = im > 0 ? (Math.pow(1 + im, N) - 1) / im : N;
    var plan = monthly * fac + haveFV;
    var needM = plan >= total ? 0 : (gap > 0 ? gap / fac : 0);

    $("ed-total").textContent = money(total);
    $("ed-years").textContent = k + " 年（约 " + N + " 个月）";
    $("ed-first").textContent = yuan(first);
    $("ed-havefv").textContent = yuan(haveFV);
    $("ed-gap").textContent = gap > 0 ? yuan(gap) : "无缺口，多出 " + money(-gap) + " 元";
    $("ed-plan").textContent = yuan(plan);
    $("ed-needm").textContent = needM > 0 ? yuan(needM) + " / 月" : "现在这样就够了";
    $("ed-gapm").textContent = (gap > 0 && plan < total) ? yuan(gap / Math.max(1, N)) + " / 月" : "—";

    $("ed-note").textContent = "现在每年 " + money(cur) + " 元，按每年涨 " + pct(infl, 1) + "、还有 " + k + " 年，" + go
      + " 岁第一年就要 " + money(first) + " 元，4 年合计 " + money(total) + " 元（学费涨幅通常比 CPI 快，一线城市民办/海外更夸张，可用上面的涨幅调整）。"
      + " 已存的 " + money(have) + " 元按 " + pct(rate, 2) + " 滚 " + k + " 年变成 " + money(haveFV) + " 元。"
      + (gap > 0
        ? " 缺口 " + money(gap) + " 元：按现在每月存 " + money(monthly) + " 元，届时能攒到 " + money(plan) + " 元，"
          + (plan >= total ? "够了。" : "还差 " + money(total - plan) + " 元，每月要再多存 " + money((total - plan) / fac) + " 元。")
        : " 没有缺口，可以适当降低每月储蓄或提高目标学校档次。")
      + " 教育金是刚性支出、时间确定，别用股票/权益基金当唯一来源；"
      + " 期限 5 年内的优先存款/国债/同业存单指数，期限长再考虑债基定投；也可用年金险锁定，但要注意流动性差、前几年退保会亏本。";
  }

  function calcInsure() {
    var income = Math.max(0, num($("in-income"), 0));
    var expense = Math.max(0, num($("in-expense"), 0));
    var debt = Math.max(0, num($("in-debt"), 0));
    var eduNeed = Math.max(0, num($("in-edu"), 0));
    var assets = Math.max(0, num($("in-assets"), 0));
    var have = Math.max(0, num($("in-have"), 0));
    var yrs = Math.max(1, Math.min(30, Math.round(num($("in-years"), 10))));

    var need1 = Math.max(0, expense * yrs + debt + eduNeed - assets);
    var need2 = income * 10;
    var need = Math.max(need1, need2);
    var gap = Math.max(0, need - have);

    $("in-need").textContent = money(need);
    $("in-need1").textContent = yuan(need1) + "（支出×" + yrs + " + 负债 + 教育金 − 资产）";
    $("in-need2").textContent = yuan(need2);
    $("in-gap").textContent = gap > 0 ? yuan(gap) : "已覆盖";
    $("in-ci3").textContent = yuan(income * 3);
    $("in-ci5").textContent = yuan(income * 5);
    $("in-acc").textContent = yuan(income * 10);
    $("in-prem").textContent = yuan(income * 0.05) + " – " + yuan(income * 0.10);

    $("in-note").textContent = "保额不是拍脑袋定的，用两种口径夹一下取大的："
      + "家庭责任法 = 年支出 " + money(expense) + " × " + yrs + " 年 + 负债 " + money(debt) + " + 子女教育 " + money(eduNeed)
      + " − 可变现资产 " + money(assets) + " = " + money(need1) + "（意思是人不在了，家人还能维持现有生活并把债还清）；"
      + "收入倍数法 = 年收入 " + money(income) + " × 10 = " + money(need2) + "。取大值 " + money(need) + "，扣除已有 " + money(have) + "，"
      + "还差 " + money(gap) + "。"
      + " 险种优先级：① 百万医疗险（几百块换几百万额度，先给全家配上）；② 定期寿险（家庭经济支柱才需要，保到孩子独立、房贷还完为止，保额就按上面这个数）；"
      + "③ 重疾险（覆盖 3–5 年收入，因为大病后往往 3–5 年不能正常上班）；④ 意外险（一年几十到几百，杠杆最高）。"
      + " 理财型/返还型/分红型先别碰——保费贵、保障低，先纯保障把保额做够。"
      + " 年保费控制在家庭年收入 5%–10%（" + money(income * 0.05) + "–" + money(income * 0.10) + "），超了说明结构有问题；"
      + "健康告知一定要如实填，这是理赔时最容易踩的坑。";
  }

  function calcBalance() {
    var cash = Math.max(0, num($("bl-cash"), 0));
    var save = Math.max(0, num($("bl-save"), 0));
    var invest = Math.max(0, num($("bl-invest"), 0));
    var house = Math.max(0, num($("bl-house"), 0));
    var car = Math.max(0, num($("bl-car"), 0));
    var other = Math.max(0, num($("bl-other"), 0));
    var mortgage = Math.max(0, num($("bl-mortgage"), 0));
    var mpay = Math.max(0, num($("bl-mpay"), 0));
    var debt = Math.max(0, num($("bl-debt"), 0));
    var income = Math.max(0, num($("bl-income"), 0));
    var expense = Math.max(0, num($("bl-expense"), 0));

    var assets = cash + save + invest + house + car + other;
    var liab = mortgage + debt;
    var net = assets - liab;
    var lev = assets > 0 ? liab / assets : 0;
    var housePct = assets > 0 ? house / assets : 0;
    var liquid = cash + save;
    var burn = expense + mpay;
    var runway = burn > 0 ? liquid / burn : 0;
    var dti = income > 0 ? mpay / income : 0;
    var surplus = income - burn;

    $("bl-net").textContent = money(net);
    $("bl-assets").textContent = yuan(assets);
    $("bl-liab").textContent = yuan(liab);
    $("bl-lev").textContent = pct(lev, 1);
    $("bl-housepct").textContent = pct(housePct, 1);
    $("bl-liquid").textContent = yuan(liquid);
    $("bl-runway").textContent = fmt(runway, 1) + " 个月";
    $("bl-dti").textContent = pct(dti, 1);
    $("bl-surplus").textContent = (surplus >= 0 ? "+" : "−") + money(Math.abs(surplus)) + " 元";

    var tags = [];
    tags.push(lev > 0.5 ? "负债率 " + pct(lev, 0) + " 偏高（> 50%），房价一跌就容易资不抵债" : "负债率 " + pct(lev, 0) + "，在健康区间（≤ 50%）");
    tags.push(dti > 0.35 ? "月供占收入 " + pct(dti, 0) + "，超过 35% 的红线，遇到降薪会很被动" : "月供占收入 " + pct(dti, 0) + "，压力可控（≤ 35%）");
    tags.push(runway < 3 ? "应急金只够 " + fmt(runway, 1) + " 个月，低于 3 个月的警戒线" : (runway < 6 ? "应急金 " + fmt(runway, 1) + " 个月，建议补到 6 个月" : "应急金 " + fmt(runway, 1) + " 个月，够用"));
    if (housePct > 0.7) tags.push("房产占总资产 " + pct(housePct, 0) + "，集中度太高，几乎全部身家押在一套房上");
    if (surplus < 0) tags.push("每月收支为负，靠消耗存量过日子");
    $("bl-note").textContent = "净资产 " + money(net) + " = 总资产 " + money(assets) + " − 总负债 " + money(liab) + "。逐项体检：" + tags.join("；") + "。"
      + " 四个常用健康线：负债率 ≤ 50%、月供/收入 ≤ 35%、应急金 ≥ 6 个月支出、房产占资产 ≤ 70%（超过就是把身家压在一套房上）。"
      + " 注意房子要按「现在卖得掉的价格」算，不是当年买入价；自住房虽然不产生现金流，但市值减去剩余贷款才是你真正的房产权益。";
  }

  function calcCheckup() {
    var inc = Math.max(0, num($("ck-income"), 0));
    var exp = Math.max(0, num($("ck-expense"), 0));
    var debt = Math.max(0, num($("ck-debt"), 0));
    var edu = Math.max(0, num($("ck-edu"), 0));
    var assets = Math.max(0, num($("ck-assets"), 0));
    var haveLife = Math.max(0, num($("ck-haveLife"), 0));
    var haveCI = Math.max(0, num($("ck-haveCI"), 0));
    var haveAcc = Math.max(0, num($("ck-haveAcc"), 0));
    var premium = Math.max(0, num($("ck-premium"), 0));

    var needDuty = debt + edu + exp * 10 - assets;
    var needMult = inc * 10;
    var lifeNeed = Math.max(0, Math.max(needDuty, needMult));
    var lifeGap = Math.max(0, lifeNeed - haveLife);
    var ciLow = inc * 3, ciHigh = inc * 5;
    var ciGap = Math.max(0, ciLow - haveCI);
    var accNeed = inc * 10;
    var accGap = Math.max(0, accNeed - haveAcc);

    $("ck-lifeGap").textContent = money(lifeGap);
    $("ck-lifeNeed").textContent = yuan(lifeNeed) + "（责任法 " + money(Math.max(0, needDuty)) + " / 收入倍数法 " + money(needMult) + "）";
    $("ck-lifeHave").textContent = yuan(haveLife);
    $("ck-ciNeed").textContent = money(ciLow) + " – " + money(ciHigh) + " 元";
    $("ck-ciGap").textContent = ciGap > 0 ? yuan(ciGap) + "（按 3 倍算）" : "已够（按 3 倍算）";
    $("ck-accNeed").textContent = yuan(accNeed);
    $("ck-accGap").textContent = accGap > 0 ? yuan(accGap) : "已够";
    $("ck-ratio").textContent = lifeNeed > 0 ? pct(Math.min(1.5, haveLife / lifeNeed), 0) : "—";
    $("ck-cost").textContent = inc > 0 ? pct(premium / inc, 1) + "（建议 5%–10%，纯保障可更低）" : "—";

    $("ck-note").textContent = "家庭年收入 " + money(inc) + "、年支出 " + money(exp) + "。寿险按两种算法取高："
      + " 责任法 = 负债 " + money(debt) + " + 教育金 " + money(edu) + " + 10 年生活费 " + money(exp * 10) + " − 可变现资产 " + money(assets)
      + " = " + money(Math.max(0, needDuty)) + "；收入倍数法 = 年收入 × 10 = " + money(needMult) + "，所以应配 " + money(lifeNeed) + "，"
      + " 现有 " + money(haveLife) + "，缺口 " + money(lifeGap) + " 元。"
      + " 重疾按 3–5 倍年收入（" + money(ciLow) + "–" + money(ciHigh) + "），因为重疾不是「治病的钱」而是「3–5 年不能拼命工作时的生活费+康复费」，"
      + " 医疗费由百万医疗险报销，两者别混。意外险保额对齐寿险（约 10 倍年收入），一年几百块就能买到上百万。"
      + " 现在一年保费 " + money(premium) + "，占收入 " + (inc > 0 ? pct(premium / inc, 1) : "—") + "，家庭总保费控制在 5%–10% 是常见区间，纯保障型能压到 3% 以内。"
      + " 配置顺序（预算有限就按这个砍）：社保打底 → 百万医疗（几百块、先看健康告知）→ 意外（一年期）→ 定期寿险（保到 60 岁，保额按上面的缺口）→ 重疾 → 教育金/养老金。"
      + " 三条铁律：先保大人后保小孩；买纯保障、别买「有病赔钱没病返本」的返还型（同样的钱保额只有三分之一）；健康告知一定如实写，"
      + " 两年不可抗辩条款不等于可以隐瞒。房子、存款、公积金、年金保险都不算「保额」，只算可变现资产，别重复计算。";
  }

  function calcCashflow() {
    var open = Math.max(0, num($("cf-open"), 0));
    var inc = Math.max(0, num($("cf-income"), 0));
    var payday = Math.min(31, Math.max(1, Math.round(num($("cf-payday"), 10))));
    var loan = Math.max(0, num($("cf-loan"), 0));
    var loanday = Math.min(31, Math.max(1, Math.round(num($("cf-loanday"), 20))));
    var card = Math.max(0, num($("cf-card"), 0));
    var cardday = Math.min(31, Math.max(1, Math.round(num($("cf-cardday"), 25))));
    var living = Math.max(0, num($("cf-living"), 0));
    var daily = living / 30;

    var evs = [];
    if (inc > 0) evs.push({ day: payday, label: "发薪", amt: inc });
    if (loan > 0) evs.push({ day: loanday, label: "房贷 / 房租", amt: -loan });
    if (card > 0) evs.push({ day: cardday, label: "信用卡还款", amt: -card });
    evs.sort(function (a, b) { return a.day - b.day; });

    var bal = open, mn = open, mnDay = 1, rows = [], ei = 0;
    for (var d = 1; d <= 30; d++) {
      while (ei < evs.length && evs[ei].day === d) {
        bal += evs[ei].amt;
        rows.push({ day: d, label: evs[ei].label, amt: evs[ei].amt, bal: bal, key: true });
        ei++;
      }
      bal -= daily;
      if (bal < mn) { mn = bal; mnDay = d; }
    }
    rows.push({ day: 30, label: "月末", amt: 0, bal: bal, key: true });

    var body = $("cf-body");
    body.innerHTML = "";
    var hasMinRow = false;
    for (var r = 0; r < rows.length; r++) {
      if (rows[r].day === mnDay && rows[r].key) hasMinRow = true;
    }
    var out = rows.slice();
    if (!hasMinRow) {
      out.push({ day: mnDay, label: "余额最低（日常开销累积所致）", amt: 0, bal: mn, key: false });
      out.sort(function (a, b) { return a.day - b.day; });
    }
    for (var o = 0; o < out.length; o++) {
      var it = out[o];
      var cells = [it.day + " 日", it.label,
        it.amt === 0 ? "—" : (it.amt > 0 ? "+" : "−") + money(Math.abs(it.amt)),
        money(it.bal)];
      var tr = document.createElement("tr");
      for (var j = 0; j < cells.length; j++) {
        var td = document.createElement("td");
        td.textContent = cells[j];
        tr.appendChild(td);
      }
      body.appendChild(tr);
    }

    var net = inc - loan - card - living;
    var need = Math.max(0, open - mn);
    var bigAmt = 0, bigName = "—";
    if (loan > 0 && loan >= card && loan >= living) { bigAmt = loan; bigName = "房贷 / 房租 " + money(loan); }
    else if (card >= living && card > 0) { bigAmt = card; bigName = "信用卡 " + money(card); }
    else if (living > 0) { bigAmt = living; bigName = "日常开销 " + money(living); }

    $("cf-min").textContent = money(mn);
    $("cf-minday").textContent = "第 " + mnDay + " 天";
    $("cf-end").textContent = yuan(bal);
    $("cf-net").textContent = (net >= 0 ? "+" : "−") + money(Math.abs(net));
    $("cf-need").textContent = mn >= 0
      ? "不用额外备（最低点还剩 " + money(mn) + " 元）"
      : money(open - mn) + " 元（现在差 " + money(-mn) + " 元）";
    $("cf-big").textContent = bigName;

    $("cf-note").textContent = "月初 " + money(open) + "、月收入 " + money(inc) + "（" + payday + " 日到账）、"
      + "房贷/房租 " + money(loan) + "（" + loanday + " 日扣）、信用卡 " + money(card) + "（" + cardday + " 日还）、"
      + "日常开销 " + money(living) + "（按每天 " + money(daily) + " 摊）。"
      + " 月底算下来净结余 " + (net >= 0 ? "+" : "−") + money(Math.abs(net)) + "，看着还行；"
      + " 但真正危险的是第 " + mnDay + " 天：那一刻账上只剩 " + money(mn) + " 元。"
      + (mn < 0
        ? " 已经破零了——发薪日之前要先垫 " + money(-mn) + " 元，否则就是信用卡取现或者花呗。"
        : (mn < inc * 0.5
          ? " 还没破零，但最紧的时候账上只剩 " + money(mn) + " 元，遇到一笔意外支出就会断。"
          : " 最低点还剩 " + money(mn) + " 元，这个月的现金节奏是安全的。"))
      + " 这就是「月底有结余、月中却周转不开」的由来：结余是整月平均的结果，现金流是按天发生的。"
      + " 三个可操作的动作：① 把房贷扣款日调到发薪日后 1–3 天（多数银行 App 就能改），能省掉整个月的垫资；"
      + "② 信用卡账单日和还款日错开，账单日刚过就花的钱有近 50 天免息期，把大额消费挪到账单日之后；"
      + "③ 留一笔「缓冲金」＝ 上面那个最低点缺口 ×2，放货币基金，别动它。"
      + " 这张表只算一个月，且假设日常开销每天均匀发生；真实情况是月初月末花得多，那最低点还会更低，缓冲金按缺口 ×2 备才稳。";
  }

  function calcRiskAlloc() {
    var age = Math.min(80, Math.max(18, Math.round(num($("ra-age"), 30))));
    var years = Math.max(0, num($("ra-years"), 10));
    var dd = Math.max(0, Math.min(60, num($("ra-dd"), 20)));
    var stable = $("ra-stable").value;
    var cap = Math.max(0, num($("ra-cap"), 0));

    var eq = 100 - age;
    var adjY = years >= 10 ? 10 : (years >= 5 ? 0 : (years >= 3 ? -8 : -15));
    var adjD = dd >= 30 ? 10 : (dd >= 20 ? 0 : (dd >= 10 ? -10 : -20));
    var adjS = stable === "stable" ? 5 : (stable === "normal" ? 0 : -10);
    eq = eq + adjY + adjD + adjS;
    eq = Math.max(10, Math.min(90, Math.round(eq / 5) * 5));

    var debt = Math.round((100 - eq) * 0.75);
    var cash = 100 - eq - debt;
    var ret = (eq * 0.06 + debt * 0.03 + cash * 0.015) / 100;
    var worst = -(eq * 0.35) / 100 + (debt * 0.02 + cash * 0.015) / 100;
    var level = eq <= 25 ? "保守型" : (eq <= 45 ? "稳健型" : (eq <= 65 ? "平衡型" : (eq <= 80 ? "进取型" : "激进型")));

    $("ra-eq").textContent = eq + "";
    $("ra-level").textContent = level;
    $("ra-mix").textContent = eq + "% / " + debt + "% / " + cash + "%";
    $("ra-amt").textContent = cap > 0
      ? money(cap * eq / 100) + " / " + money(cap * debt / 100) + " / " + money(cap * cash / 100) + " 元"
      : "填入金额后显示";
    $("ra-ret").textContent = pct(ret, 2);
    $("ra-loss").textContent = pct(Math.abs(worst), 1)
      + (cap > 0 ? "（约 " + money(cap * Math.abs(worst)) + " 元）" : "");
    $("ra-reb").textContent = eq >= 60 ? "每年一次，或偏离 5 个百分点就调回" : "每年一次，或偏离 10 个百分点就调回";

    $("ra-note").textContent = "按年龄 " + age + " 岁、这笔钱 " + fmt(years, 0) + " 年不用、最多能忍 " + fmt(dd, 0) + "% 的回撤、收入"
      + (stable === "stable" ? "稳定" : (stable === "normal" ? "一般" : "波动大"))
      + "算，股票类资产给 " + eq + "%（基准是 100 − 年龄 = " + (100 - age) + "%，再按期限 " + (adjY >= 0 ? "+" : "") + adjY
      + "、回撤容忍 " + (adjD >= 0 ? "+" : "") + adjD + "、收入稳定性 " + (adjS >= 0 ? "+" : "") + adjS + " 修正，上下限 10%–90%）。"
      + " 长期预期年化 " + pct(ret, 2) + "（股票 6%、债券 3%、现金 1.5% 的长期中枢，不是今年的数字）；"
      + " 但真正要先接受的是一头：股票极端年份跌 35% 时，这个组合大概亏 " + pct(Math.abs(worst), 1)
      + (cap > 0 ? "，也就是 " + money(cap * Math.abs(worst)) + " 元" : "") + "。"
      + " 判断标准很简单：把上面那个亏损金额念出来，如果这个数字会让你睡不着、或者你会在那时候清仓，那就把股票比例往下调 10–20 个百分点，一直调到你真能坐住为止。"
      + " 配置上限是由「跌了会不会卖」决定的，不是由收益期望决定的——一个拿不住的 80% 股，长期收益不如一个拿得住的 50% 股。"
      + " 几条纪律：① 先留 3–6 个月支出做应急金，这笔钱不进这个配置；② 债券部分用短债/中短债基金，别用长久期；"
      + "③ 再平衡是这套方法里唯一真正「自动低买高卖」的动作，别省掉；④ 三年内要用的钱（首付、学费）一分都不要放股票。";
  }

  function calcFire() {
    var exp = Math.max(0, num($("fr-exp"), 0));
    var has = Math.max(0, num($("fr-has"), 0));
    var saveM = Math.max(0, num($("fr-save"), 0));
    var r = Math.max(0, num($("fr-rate"), 0)) / 100;
    var swr = Math.max(0.1, num($("fr-swr"), 4)) / 100;
    var age = Math.max(0, num($("fr-age"), 30));
    var target = exp * 12 / swr;
    var i = r / 12;

    function reach(monthly, rate) {
      var m = 0, bal = has, ii = rate / 12;
      while (bal < target && m < 1200) {
        bal = bal * (1 + ii) + monthly;
        m++;
      }
      return { m: m, bal: bal, done: bal >= target };
    }

    var res = reach(saveM, r);
    var g = Math.pow(1 + i, 120);
    var pmt10 = target > has * g
      ? (target - has * g) / (i === 0 ? 120 : (g - 1) / i)
      : 0;

    $("fr-target").textContent = money(target);
    $("fr-gap").textContent = target > has ? yuan(target - has) : "已经超过目标";
    $("fr-time").textContent = res.done ? (Math.floor(res.m / 12) + " 年 " + (res.m % 12) + " 个月") : "按这个速度到不了（试试提高月存或收益）";
    $("fr-ageout").textContent = res.done ? fmt(age + res.m / 12, 1) + " 岁" : "—";
    $("fr-progress").textContent = target > 0 ? pct(Math.min(1, has / target), 2) : "—";
    $("fr-withdraw").textContent = yuan(target * swr / 12) + "（刚好覆盖月支出 " + money(exp) + "）";
    $("fr-pmt").textContent = pmt10 > 0 ? yuan(pmt10) + " / 月" : "已有资产按这个收益 10 年就够，不用再存";
    var sens = [0.03, 0.05, 0.07].map(function (rr) {
      var x = reach(saveM, rr);
      return fmt(rr * 100, 0) + "% → " + (x.done ? (x.m / 12).toFixed(1) + " 年" : "到不了");
    });
    $("fr-sens").textContent = sens.join(" / ");

    if (exp <= 0) {
      $("fr-note").textContent = "先填现在的月支出。FIRE 的算法只有一句话：把「一年要花的钱」除以「安全提取率」，就是你需要的那笔本金。";
      return;
    }
    var note = "目标本金 = 年支出 " + money(exp * 12) + " ÷ 安全提取率 " + fmt(swr * 100, 1) + "%，得 " + money(target) + " 元。"
      + " 这个算法的含义是：这笔钱不靠工资、只靠本金增值，每年提出 " + fmt(swr * 100, 1) + "%（" + money(target * swr) + " 元）来生活。"
      + " 为什么是 4%：历史上美股/美股+债组合 30 年不破产的提取率大约在这个量级，但它是「美国历史数据 + 30 年期限」的结论，不是自然规律；"
      + " 想更稳（比如 40–50 年、或想留给后人），用 3%–3.5%，本金要求会立刻涨三到四成。"
      + " 你现在的进度是 " + pct(Math.min(1, has / target), 1) + "，按每月存 " + money(saveM) + " 元、年化 " + fmt(r * 100, 1) + "% 测算，"
      + (res.done
        ? "还要 " + Math.floor(res.m / 12) + " 年 " + (res.m % 12) + " 个月，大约 " + fmt(age + res.m / 12, 1) + " 岁达成。"
        : "以这个速度到不了目标，得把月存提上去或把收益预期放现实一点。")
      + " 注意它的敏感性：同一笔钱，年化 3% 和 7% 的差别不是「小一点」，而是相差好几年（" + sens.join("、") + "），"
      + " 所以别用「我一定能拿到 8%」来给这个计划加速。"
      + " 三个容易被忽略的点：① 支出会变——有房贷、有孩子、父母年纪大了，月支出都会往上走，目标是移动靶；"
      + " ② FIRE 之后往往还有零散收入（接活、写东西、做咨询），「半自由」比全退更常见也更稳；"
      + " ③ 别把自住房算进这笔本金——你还得住。真要落地，先按 3.5% 提取率算一个「够稳」的数，再按 4% 算一个「够快」的数，中间那段就是你的操作空间。";
    $("fr-note").textContent = note;
  }

  function calcAnnualFee() {
    var items = [
      { n: "物业费", v: Math.max(0, num($("af-1"), 0)), mo: Math.min(12, Math.max(1, Math.round(num($("af-1m"), 1)))) },
      { n: "车险", v: Math.max(0, num($("af-2"), 0)), mo: Math.min(12, Math.max(1, Math.round(num($("af-2m"), 1)))) },
      { n: "保险", v: Math.max(0, num($("af-3"), 0)), mo: Math.min(12, Math.max(1, Math.round(num($("af-3m"), 1)))) },
      { n: "学费/其它", v: Math.max(0, num($("af-4"), 0)), mo: Math.min(12, Math.max(1, Math.round(num($("af-4m"), 1)))) }
    ].filter(function (x) { return x.v > 0; });

    var total = items.reduce(function (s, x) { return s + x.v; }, 0);
    var monthly = total / 12;
    var byMonth = [];
    for (var mi = 1; mi <= 12; mi++) byMonth[mi] = 0;
    items.forEach(function (x) { byMonth[x.mo] += x.v; });
    var peak = 0, peakAmt = 0;
    for (var mj = 1; mj <= 12; mj++) if (byMonth[mj] > peakAmt) { peakAmt = byMonth[mj]; peak = mj; }
    var maxItem = 0;
    items.forEach(function (x) { if (x.v > maxItem) maxItem = x.v; });
    var lead = monthly > 0 ? Math.ceil(maxItem / monthly) : 0;

    $("af-monthly").textContent = money(monthly);
    $("af-total").textContent = yuan(total);
    $("af-max").textContent = maxItem > 0 ? yuan(maxItem) : "—";
    var peakCount = items.filter(function (x) { return x.mo === peak; }).length;
    $("af-peak").textContent = peak > 0 ? peak + " 月（" + peakCount + " 笔，共 " + money(peakAmt) + " 元）" : "—";
    $("af-peakamt").textContent = total > 0 ? pct(peakAmt / total, 1) + "（" + money(peakAmt) + " / " + money(total) + "）" : "—";
    $("af-lead").textContent = lead > 0 ? lead + " 个月开始存" : "—";
    $("af-check").textContent = total > 0 ? money(total / 365) + " 元 / 天" : "—";

    var body = $("af-body");
    body.innerHTML = "";
    items.forEach(function (x) {
      var tr = document.createElement("tr");
      [x.n, money(x.v), x.mo + " 月", money(x.v / 12)].forEach(function (v) {
        var td = document.createElement("td");
        td.textContent = v;
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });

    if (!items.length) {
      $("af-note").textContent = "把一年只交一次的费用填进来（物业费、车险、寿险、学费、会员费），看看每月该预留多少。";
      return;
    }
    var note = "一年要交 " + money(total) + " 元，摊到每月是 " + money(monthly) + " 元（每天约 " + money(total / 365) + " 元）。"
      + " 这类钱最容易出问题的地方不是金额，而是「集中到期」：你的缴费压力最大的是 " + peak + " 月，一次性要拿出 " + money(peakAmt) + " 元，"
      + " 如果那个月正好还赶上过年、开学、换手机，就会出现「这个月怎么这么紧」的感觉。"
      + " 做法很简单也很有效：开一个单独的账户（或者单独一张卡），每月发工资日先划 " + money(monthly) + " 元进去，只用来交这些年度费用，"
      + " 到缴费月从里面直接付——不用算、不用记、也不会临时抓瞎。"
      + " 如果你偏要「到期才准备」，那最大的一笔 " + money(maxItem) + " 元需要提前 " + lead + " 个月开始攒才攒得出来。"
      + " 顺带提醒：车险和保险续费前记得比价，长期客户往往是最贵的客户；物业费若按年缴有折扣可以选年缴，但要把折扣和「钱放在自己手里的收益」比一比；"
      + " 年缴金额通常会在缴费前一个月通知，收到通知就把它填进这里更新一下，别让分摊额停在旧数字上。";
    $("af-note").textContent = note;
  }

  function calcChild() {
    var age = Math.max(0, Math.min(18, Math.round(num($("cc-age"), 0))));
    var pre = Math.max(0, num($("cc-pre"), 0));
    var mid = Math.max(0, num($("cc-mid"), 0));
    var uni = Math.max(0, num($("cc-uni"), 0));
    var infl = Math.max(0, num($("cc-infl"), 0)) / 100;
    var rate = Math.max(0, num($("cc-rate"), 0)) / 100;

    var total = 0, pv = 0, peak = 0, peakAge = 0;
    var sPre = 0, sMid = 0, sUni = 0, yrs = 0;
    for (var a = age; a <= 22; a++) {
      var base = a <= 6 ? pre : (a <= 18 ? mid : uni);
      var v = base * Math.pow(1 + infl, a - age);
      total += v;
      pv += v / Math.pow(1 + infl, a - age);
      if (a <= 6) sPre += v; else if (a <= 18) sMid += v; else sUni += v;
      if (v > peak) { peak = v; peakAge = a; }
      yrs++;
    }
    var perMonth = yrs > 0 ? total / (yrs * 12) : 0;
    var nMonths = Math.max(1, (Math.max(18, age) - age) * 12);
    var i = rate / 12;
    var annFactor = i > 0 ? (1 - Math.pow(1 + i, -nMonths)) / i : nMonths;
    var save = annFactor > 0 ? pv / annFactor : 0;

    $("cc-total").textContent = money(total);
    $("cc-pv").textContent = yuan(pv);
    $("cc-month").textContent = yuan(perMonth);
    $("cc-peak").textContent = peakAge + " 岁那年：" + yuan(peak);
    $("cc-pre-sum").textContent = yuan(sPre);
    $("cc-mid-sum").textContent = yuan(sMid);
    $("cc-uni-sum").textContent = yuan(sUni);
    $("cc-save").textContent = yuan(save) + "（存到 18 岁）";

    if (total <= 0) {
      $("cc-note").textContent = "填上各阶段每年的花费，就能看到从现在到大学毕业一共要准备多少钱。";
      return;
    }
    $("cc-note").textContent = "从现在（" + age + " 岁）到 22 岁毕业，按每年花费上涨 " + pct(infl, 1) + " 算，一共要花 " + money(total) + " 元，"
      + "折成今天的钱是 " + money(pv) + " 元（这两个数的差就是通胀；如果通胀和你的理财收益都是 " + pct(infl, 1) + "，那两者相等，说明你只是在「搬钱」并没有增值）。"
      + " 平均每月 " + money(perMonth) + " 元，最贵的是 " + peakAge + " 岁那年 " + money(peak) + " 元。"
      + " 要一次性备齐，今天就得有 " + money(pv) + " 元；改成每月定投、按 " + pct(rate, 1) + " 年化滚到 18 岁，每月存 " + money(save) + " 元就够。"
      + " 这里只算「养」的钱：吃穿、教育、医疗、兴趣班、出行。没算买房首付、结婚、留学，也没算你为了带娃少赚的那部分收入——"
      + "真正的大头往往就是后者。";
  }

  function calcEmergency() {
    var exp = Math.max(0, num($("em-exp"), 0));
    var stab = $("em-stab") ? $("em-stab").value : "normal";
    var hasLoan = $("em-loan") ? $("em-loan").value === "1" : true;
    var hasKid = $("em-kid") ? $("em-kid").value === "1" : true;
    var have = Math.max(0, num($("em-have"), 0));
    var per = Math.max(0, num($("em-save"), 0));

    var m = 3, why = ["基础 3"];
    if (stab === "steady") { m -= 1; why.push("收入稳定 −1"); }
    else if (stab === "risky") { m += 2; why.push("收入波动 +2"); }
    if (hasLoan) { m += 1; why.push("房贷 +1"); }
    if (hasKid) { m += 1; why.push("养娃/赡老 +1"); }
    var raw = m;
    m = Math.max(2, Math.min(12, m));
    if (raw !== m) why.push("上下限压到 " + m);

    var target = exp * m;
    var gap = Math.max(0, target - have);
    var coverM = exp > 0 ? have / exp : 0;
    var needM = gap > 0 ? (per > 0 ? Math.ceil(gap / per) : Infinity) : 0;

    $("em-target").textContent = money(target);
    $("em-months").textContent = m + " 个月（" + why.join(" ＋ ") + "）";
    $("em-gap").textContent = gap > 0 ? yuan(gap) : "已经够了";
    $("em-cover").textContent = coverM.toFixed(1) + " 个月";
    $("em-need").textContent = gap <= 0 ? "0 个月" : (needM === Infinity ? "每月存 0，补不上" : needM + " 个月");

    var body = $("em-body");
    body.innerHTML = "";
    var list = [1000, 2000, 3000, 5000];
    for (var k = 0; k < list.length; k++) {
      var p = list[k];
      var mm = gap > 0 ? (p > 0 ? Math.ceil(gap / p) : Infinity) : 0;
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + money(p) + " 元</td><td>" + (mm === Infinity ? "—" : mm + " 个月")
        + "</td><td>" + (exp > 0 ? ((have + (mm === Infinity ? 0 : mm * p)) / exp).toFixed(1) + " 个月" : "—") + "</td>";
      body.appendChild(tr);
    }

    if (exp <= 0) {
      $("em-note").textContent = "先填上每月刚性支出（房租/房贷、吃饭、交通、水电这些不花不行的钱），再选收入稳定性和家庭负担，就能算出该备多少。";
      return;
    }
    var note = "应急金算的是「不工作也能活几个月」，所以只按刚性支出算，不含旅游、娱乐。"
      + " 你这情况建议备 " + m + " 个月 = " + money(target) + " 元（" + why.join("＋") + "）。";
    if (gap > 0) {
      note += " 现在有 " + money(have) + " 元，只够撑 " + coverM.toFixed(1) + " 个月，还差 " + money(gap) + " 元；"
        + (needM === Infinity ? "" : "按每月存 " + money(per) + " 元，还要 " + needM + " 个月。");
    } else {
      note += " 现在有 " + money(have) + " 元，已经够撑 " + coverM.toFixed(1) + " 个月，别再往这里多放了，多出来的钱去做长期投资。";
    }
    note += " 放哪：只放能当天或次日到账的东西——货币基金、银行 T+0 现金管理、短期存单，别买理财、别买基金、别锁 3 年。"
      + " 顺序上先应急金、再还高息债、最后才谈投资，反过来做的话一旦急用钱就得刷信用卡，利息立刻吃掉一年收益。"
      + " 另外这笔钱要单独放一张卡或一个账户，别和日常开销混在一起，否则你会不知不觉花掉它。";
    $("em-note").textContent = note;
  }

  function calcRule() {
    var inc = Math.max(1, num($("rg-inc"), 1));
    var need = Math.max(0, num($("rg-need"), 0));
    var want = Math.max(0, num($("rg-want"), 0));
    var saveV = Math.max(0, num($("rg-save"), 0));
    var left = inc - need - want - saveV;

    var pN = need / inc, pW = want / inc, pS = saveV / inc;
    var incNeed = need / 0.5;
    var cut = need - inc * 0.5;

    $("rg-saverate").textContent = (pS * 100).toFixed(1);
    function vs(v, base) {
      var d = v - base;
      if (Math.abs(d) < 0.0005) return "（与基准持平）";
      return "（" + (d > 0 ? "超 " : "低 ") + pct(Math.abs(d), 1) + "）";
    }
    $("rg-needp").textContent = pct(pN, 1) + vs(pN, 0.5);
    $("rg-wantp").textContent = pct(pW, 1) + vs(pW, 0.3);
    $("rg-savep").textContent = pct(pS, 1) + vs(pS, 0.2);
    $("rg-cut").textContent = cut > 0 ? yuan(cut) + "（要压到 " + money(inc * 0.5) + " 元）" : "没有超（" + money(-cut) + " 元余量）";
    $("rg-incneed").textContent = yuan(incNeed);
    $("rg-left").textContent = Math.abs(left) < 0.5 ? "0（三档正好分完）" : (left > 0 ? yuan(left) + "（没安排用途）" : yuan(-left) + "（超出了收入）");

    var body = $("rg-body");
    body.innerHTML = "";
    var rows = [
      ["必需支出", need, pN, 0.5],
      ["可选支出", want, pW, 0.3],
      ["储蓄投资", saveV, pS, 0.2]
    ];
    for (var k = 0; k < rows.length; k++) {
      var r = rows[k];
      var d = r[2] - r[3];
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + r[0] + "</td><td>" + money(r[1]) + "</td><td>" + pct(r[2], 1)
        + "</td><td>" + pct(r[3], 0) + "</td><td>" + (d >= 0 ? "+" : "") + pct(d, 1)
        + "</td><td>" + money(inc * r[3]) + "</td>";
      body.appendChild(tr);
    }

    var head = "你的结构是 必需 " + pct(pN, 1) + " / 可选 " + pct(pW, 1) + " / 储蓄 " + pct(pS, 1) + "，";
    var advice;
    if (pN > 0.5) {
      advice = "必需支出偏高 " + pct(pN - 0.5, 1) + "。要么把它压到 " + money(inc * 0.5) + " 元（少花 " + money(cut)
        + " 元，能压的通常是房租/通勤/保险这几块），要么把收入提到 " + money(incNeed) + " 元。收入不变又不砍支出的话，储蓄率很难起来。";
    } else if (pS < 0.2) {
      advice = "必需支出还在 50% 以内，但储蓄只有 " + pct(pS, 1) + "，钱漏在可选支出上（比基准多 " + money(Math.max(0, want - inc * 0.3))
        + " 元）。先把这部分砍到 " + money(inc * 0.3) + " 元，储蓄率就能补到 20%。";
    } else {
      advice = "结构健康：必需支出在 50% 以内、储蓄超过 20%，多出来的钱优先补应急金，再考虑提前还贷或长期定投。";
    }
    $("rg-note").textContent = head + advice
      + " 50/30/20 是「先保生存、再谈享受、最后强制存钱」的粗分配，不是法律。"
      + " 高房价城市必需支出压不到 50% 很正常，这时候看两件事：储蓄率有没有到 20%、必需支出有没有在下降。"
      + " 另外「还房贷本金」算储蓄不算支出——它是把钱从左口袋换到右口袋（换成房子权益），别把它塞进必需支出里，否则你的储蓄率会被低估。";
  }

  function calcReport() {
    var inc = Math.max(0, num($("rp-inc"), 0));
    var need = Math.max(0, num($("rp-need"), 0));
    var want = Math.max(0, num($("rp-want"), 0));
    var cash = Math.max(0, num($("rp-cash"), 0));
    var inv = Math.max(0, num($("rp-inv"), 0));
    var house = Math.max(0, num($("rp-house"), 0));
    var debt = Math.max(0, num($("rp-debt"), 0));
    var loan = Math.max(0, num($("rp-loan"), 0));
    var ins = Math.max(0, num($("rp-ins"), 0));
    var prem = Math.max(0, num($("rp-prem"), 0));
    var age = Math.max(18, num($("rp-age"), 30));
    var rate = Math.max(0, num($("rp-rate"), 3.1));
    var years = Math.max(1, Math.round(num($("rp-years"), 30)));

    var save = 0, em = 0, lev = 0, dsr = 0, cover = 0;
    var saveRate = inc > 0 ? (inc - need - want) / inc : 0;
    var emMonths = need > 0 ? cash / need : 0;
    var totalAsset = cash + inv + house;
    var levRate = totalAsset > 0 ? debt / totalAsset : 0;
    var dsrRate = inc > 0 ? loan / inc : 0;
    var needIns = Math.max(0, inc * 12 * 10 + debt - (cash + inv));
    var coverRate = needIns > 0 ? ins / needIns : 1;

    save = saveRate >= 0.3 ? 20 : saveRate >= 0.2 ? 15 : saveRate >= 0.1 ? 10 : 5;
    em = emMonths >= 6 ? 20 : emMonths >= 4 ? 15 : emMonths >= 2 ? 10 : 5;
    lev = levRate < 0.3 ? 20 : levRate < 0.5 ? 15 : levRate < 0.7 ? 10 : 5;
    dsr = dsrRate < 0.3 ? 20 : dsrRate < 0.4 ? 15 : dsrRate < 0.5 ? 10 : 5;
    cover = coverRate >= 1 ? 20 : coverRate >= 0.7 ? 15 : coverRate >= 0.4 ? 10 : 5;

    var score = save + em + lev + dsr + cover;
    var level = score >= 85 ? "优秀" : score >= 70 ? "良好" : score >= 55 ? "及格" : "需要调整";

    var fireTarget = need + want > 0 ? (need + want) * 12 / 0.04 : 0;
    var fireProg = fireTarget > 0 ? (cash + inv) / fireTarget : 0;
    var maxPay = inc * 0.4;
    var loanCap = rate >= 0 && years > 0 ? annuityPV(maxPay, rate / 100 / 12, years * 12) : 0;
    var ssRate = 0.225;
    var ss = inc * ssRate;
    var mTax = taxBy(MONTH_TABLE, Math.max(0, inc - ss - 5000));
    var net = inc - ss - mTax;
    var netWorth = totalAsset - debt;
    var insGap = Math.max(0, needIns - ins);

    var rows = [
      ["储蓄率", pct(saveRate), save, "≥30%", save],
      ["应急金储备", fmt(emMonths, 1) + " 个月", em, "≥6 个月", em],
      ["资产负债率", pct(levRate), lev, "<50%", lev],
      ["月供收入比", pct(dsrRate), dsr, "<40%", dsr],
      ["保障覆盖", pct(coverRate), cover, "≥100%", cover]
    ];
    var names = ["储蓄率", "应急金储备", "资产负债率", "月供收入比", "保障覆盖"];
    var acts = [
      "储蓄率偏低：先把每月自动转出固定金额（工资到账当天划走），目标先到 20%。",
      "应急金不足：优先把 6 个月刚性支出放进货币基金/活期，别投波动资产。",
      "负债偏重：优先还高息负债，新增负债前先压降总负债率到 50% 以内。",
      "月供偏紧：把月供控制在收入 40% 以内，留出收入中断时的缓冲。",
      "保障缺口：先把寿险/重疾配到「10 倍年收入 + 负债 − 可变现资产」，纯保障型优先。"
    ];
    var worst = 0;
    for (var i = 1; i < rows.length; i++) if (rows[i][2] < rows[worst][2]) worst = i;

    $("rp-big").textContent = fmt(score, 0);
    $("rp-uni").textContent = "分 · " + level;
    var kvs = [
      ["家庭净资产", yuan(netWorth)],
      ["税后到手（估）", yuan(net) + "/月"],
      ["应急金缺口", emMonths >= 6 ? "已够 6 个月" : yuan(Math.max(0, need * 6 - cash))],
      ["保障缺口", insGap > 0 ? yuan(insGap) : "已够"],
      ["FIRE 目标（4% 提取）", yuan(fireTarget)],
      ["FIRE 进度", pct(fireProg)],
      ["月供上限（收入 40%）", yuan(maxPay)],
      ["按 " + fmt(rate, 2) + "% / " + years + " 年可贷", yuan(loanCap)],
      ["年保费占收入", pct(inc > 0 ? prem / (inc * 12) : 0)]
    ];
    var kvHtml = "";
    for (var k = 0; k < kvs.length; k++) kvHtml += "<li><span>" + kvs[k][0] + "</span><b>" + kvs[k][1] + "</b></li>";
    $("rp-kv").innerHTML = kvHtml;

    var html = "";
    for (var r = 0; r < rows.length; r++) {
      var cls = rows[r][2] <= 10 ? " class=\"c-warn\"" : "";
      html += "<tr" + cls + "><td class=\"tal\">" + rows[r][0] + "</td><td>" + rows[r][1] + "</td><td>" + rows[r][2] + " / 20</td><td>" + rows[r][3] + "</td></tr>";
    }
    $("rp-body").innerHTML = html;

    var ease = [1.0, 1.0, 0.6, 0.55, 0.85];
    var pri = [];
    for (var q = 0; q < rows.length; q++) pri.push({ i: q, gap: 20 - rows[q][2] });
    pri.sort(function (x, y) { return y.gap * ease[y.i] - x.gap * ease[x.i]; });
    var ph = "";
    for (var q2 = 0; q2 < pri.length && q2 < 3; q2++) {
      var it = pri[q2];
      if (it.gap <= 0) continue;
      ph += "<li><b>" + names[it.i] + "</b>（还差 " + it.gap + " 分）" + acts[it.i] + "</li>";
    }
    if ($("rp-pri")) $("rp-pri").innerHTML = ph || '<li>五项都到线了，保持现在的节奏就行。</li>';

    if ($("rp-links")) $("rp-links").innerHTML = "接着算："
      + linkTo("emergency", { "em-exp": need }, "应急金要备多少")
      + linkTo("fire", { "fr-exp": need, "fr-has": cash + inv, "fr-age": age }, "多久能不上班")
      + linkTo("budget", { "bg-income": inc }, "月供上限 → 能买多贵")
      + linkTo("insure", { "in-income": inc * 12, "in-expense": need * 12, "in-assets": cash + inv, "in-debt": debt }, "保额够不够")
      + linkTo("yearreport", { "yrp-inc": inc * 12, "yrp-out": need * 12 }, "全年 → 年度报告");

    if ($("rp-goaltext")) {
      var goalG = Math.max(0, num($("rp-goal"), 0));
      var gYear = Math.max(1, Math.round(num($("rp-gyear"), 3)));
      var netG = totalAsset - debt;
      var needG = goalG - netG;
      var gi = 0.03 / 12, gn = gYear * 12;
      var savG = Math.max(0, inc - need - want);
      var gTxt;
      if (!(goalG > 0)) {
        gTxt = "在输入卡最后一行填「目标净资产 / 目标年限」，这里会反推每月要存多少。";
      } else if (needG <= 0) {
        gTxt = "目标反推：想 " + gYear + " 年后把净资产做到 " + money(goalG) + " 元——你现在的净资产已经有 "
          + money(netG) + " 元，已经达标了。把目标调高一点才有参考意义。";
      } else {
        var pmtG = needG * gi / (Math.pow(1 + gi, gn) - 1);
        var monG = Math.ceil(Math.log(1 + needG * gi / Math.max(1, savG)) / Math.log(1 + gi));
        var yG = Math.floor(monG / 12), rG = monG % 12;
        gTxt = "目标反推：想 " + gYear + " 年后净资产做到 " + money(goalG) + " 元，现在 " + money(netG)
          + " 元，还差 " + money(needG) + " 元；按 3% 年化（货基/债基一档）算，每月要存 " + money(pmtG) + " 元。"
          + (savG > 0
            ? "按你现在每月存 " + money(savG) + " 元的速度、同样 3% 年化，约要 " + (yG > 0 ? yG + " 年 " : "") + rG + " 个月。"
            : "你现在每月没有结余，先补现金流再谈目标。");
      }
      $("rp-goaltext").textContent = gTxt;
    }

    $("rp-note").textContent = "总分 " + score + "（" + level + "），短板是" + names[worst] + "。"
      + acts[worst] + " 打分只看五项硬指标，不含投资能力与收入稳定性；数据只在本机，点「打印」可存成一页 PDF。";
    drawRpMini();
  }

  function calcPlanner() {
    var inc = Math.max(0, num($("pl-inc"), 0));
    var cash = Math.max(0, num($("pl-cash"), 0));
    var inv = Math.max(0, num($("pl-inv"), 0));
    var price = Math.max(0, num($("pl-price"), 0));
    var dpRate = Math.min(100, Math.max(0, num($("pl-dp"), 30))) / 100;
    var rate = Math.max(0, num($("pl-rate"), 3.1)) / 100;
    var years = Math.min(30, Math.max(1, Math.round(num($("pl-years"), 30))));
    var need = Math.max(0, num($("pl-need"), 0));
    var want = Math.max(0, num($("pl-want"), 0));
    var debt0 = Math.max(0, num($("pl-debt"), 0));
    var ins = Math.max(0, num($("pl-ins"), 0));

    var closeR = Math.max(0, num($("pl-close"), 3)) / 100;
    var deco0 = Math.max(0, num($("pl-deco"), 0));
    var closeAmt = price * closeR + deco0;
    var dpNeed = price * dpRate;
    var signNeed = dpNeed + closeAmt;
    var loan = Math.max(0, price - dpNeed);
    var n = years * 12;
    var i = rate / 12;
    var pay = loan > 0 ? annuityPayment(loan, i, n) : 0;
    var cashLeft = cash - signNeed;
    var left = inc - need - want - pay;
    var saveRate = inc > 0 ? left / inc : 0;
    var emg = need > 0 ? cashLeft / need : 0;
    var assets = price + inv;
    var debtAfter = debt0 + loan;
    var lev = assets > 0 ? debtAfter / assets : 0;
    var dsr = inc > 0 ? pay / inc : 0;
    var protectNeed = inc * 12 * 10 + debtAfter - (inv + Math.max(0, cashLeft));
    var cover = protectNeed > 0 ? ins / protectNeed : 1;

    var sNow = plScoreSave(inc > 0 ? (inc - need - want) / inc : 0) + plScoreEmg(need > 0 ? cash / need : 0)
      + plScoreLev((price === 0 && inv === 0) ? 0 : (debt0 / (cash + inv || 1))) + plScoreDsr(0)
      + plScoreCov((inc * 12 * 10 + debt0 - (cash + inv)) > 0 ? ins / (inc * 12 * 10 + debt0 - (cash + inv)) : 1);
    var sAfter = plScoreSave(saveRate) + plScoreEmg(emg) + plScoreLev(lev) + plScoreDsr(dsr) + plScoreCov(cover);

    var keepEmg = need * 6;
    var kk = dpRate + closeR;
    var capPrice = kk > 0 ? Math.max(0, (cash - keepEmg - deco0) / kk) : 0;
    var capDsr = inc > 0 ? annuityPV(inc * 0.4, i, n) : 0;
    var capByDsr = dpRate < 1 ? capDsr / (1 - dpRate) : capDsr;

    var big = $("pl-big"), score = $("pl-score"), dpo = $("pl-dpout"), payo = $("pl-pay");
    var ratio = $("pl-ratio"), lefto = $("pl-left"), saveo = $("pl-save"), emgo = $("pl-emg"), capo = $("pl-cap");
    if (big) big.textContent = String(Math.round(sAfter));
    if (score) score.textContent = Math.round(sNow) + " 分 → " + Math.round(sAfter) + " 分（" + plRank(sAfter) + "）";
    if (dpo) dpo.textContent = money(dpNeed) + " 元 / " + (cashLeft >= 0 ? "余 " + money(cashLeft) + " 元" : "缺 " + money(-cashLeft) + " 元");
    var cashallo = $("pl-cashall");
    if (cashallo) cashallo.textContent = money(signNeed) + " 元（首付＋税费中介 " + money(closeAmt) + "）";
    if (payo) payo.textContent = money(loan) + " 元 · 月供 " + money(pay) + " 元";
    if (ratio) ratio.textContent = pct(dsr, 1) + (dsr > 0.4 ? "（超过 40% 警戒线）" : "");
    if (lefto) lefto.textContent = (left >= 0 ? money(left) : "−" + money(-left)) + " 元 / 月";
    if (saveo) saveo.textContent = pct(saveRate, 1);
    if (emgo) emgo.textContent = emg > 0 ? months(Math.floor(emg)) + "（剩 " + money(cashLeft) + " 元）" : "0 个月（首付把现金用光了）";
    if (capo) capo.textContent = money(capPrice) + " 元" + (capByDsr < capPrice ? "（月供还能再撑到 " + money(capByDsr) + "）" : "（卡在现金，不是月供）");

    var tb = $("plz-body");
    if (tb) {
      var rows = [
        ["储蓄率", pct(inc > 0 ? (inc - need - want) / inc : 0, 1), pct(saveRate, 1),
          plScoreSave(inc > 0 ? (inc - need - want) / inc : 0), plScoreSave(saveRate)],
        ["应急金（月）", months(Math.floor(need > 0 ? cash / need : 0)), months(Math.floor(emg)),
          plScoreEmg(need > 0 ? cash / need : 0), plScoreEmg(emg)],
        ["资产负债率", pct(debt0 / (cash + inv || 1), 1), pct(lev, 1),
          plScoreLev(debt0 / (cash + inv || 1)), plScoreLev(lev)],
        ["月供收入比", "0.0%", pct(dsr, 1), plScoreDsr(0), plScoreDsr(dsr)],
        ["保障覆盖", pct((inc * 12 * 10 + debt0 - (cash + inv)) > 0 ? ins / (inc * 12 * 10 + debt0 - (cash + inv)) : 1, 1), pct(cover, 1),
          plScoreCov((inc * 12 * 10 + debt0 - (cash + inv)) > 0 ? ins / (inc * 12 * 10 + debt0 - (cash + inv)) : 1), plScoreCov(cover)]
      ];
      var h = "";
      for (var k = 0; k < rows.length; k++) {
        var r = rows[k], d = r[4] - r[3];
        h += "<tr><td class=\"tal\">" + r[0] + "</td><td>" + r[1] + "</td><td>" + r[2] + "</td>"
          + "<td class=\"" + (d < 0 ? "c-bad" : d > 0 ? "c-soft" : "") + "\">" + (d > 0 ? "+" : "") + d + " 分</td></tr>";
      }
      tb.innerHTML = h;
    }

    var note = $("plz-note");
    if (note) {
      var tips = [];
      if (cashLeft < 0) tips.push("首付还差 " + money(-cashLeft) + " 元，先攒够再谈。");
      else if (cashLeft < keepEmg) tips.push("首付会把应急金压到 " + months(Math.floor(emg)) + " 个月（建议留 6 个月 = " + money(keepEmg) + " 元），把首付降到 " + money(usable) + " 元、房价上限 " + money(capPrice) + " 元更稳。");
      if (dsr > 0.4) tips.push("月供占收入 " + pct(dsr, 1) + "，超过 40%。");
      if (saveRate < 0.1) tips.push("买房后储蓄率只有 " + pct(saveRate, 1) + "，几乎没有缓冲，一次装修或换工作就会被动。");
      if (cover < 0.7) tips.push("加了房贷后保障缺口变大：应配 " + money(Math.max(0, protectNeed)) + " 元（10 倍年收入＋负债－可变现资产），现在只有 " + pct(cover, 1) + "。");
      if (!tips.length) tips.push("这组数下买房后现金流与保障都还站得住，注意留足 6 个月应急金再签字。");
      tips.push("这里的「现金剩余」已扣掉税费中介等一次性支出 " + money(closeAmt) + " 元（占房价 " + pct(closeR, 1) + " ＋定额 " + money(deco0) + "），装修按交房后再花，没算进来。");
      note.textContent = "现在 " + Math.round(sNow) + " 分 → 买房后 " + Math.round(sAfter) + " 分（" + plRank(sAfter) + "）。" + tips.join(" ");
    }
  }

  function calcBundle() {
    var inc1 = Math.max(0, num($("bxsp-inc"), 0));
    var inc2 = Math.max(0, num($("bxsp-inc2"), 0));
    var inc = inc1 + inc2;
    var goal = Math.max(0, num($("bxsp-goal"), 25));
    var defs = [
      ["住（房贷/租金）", "bxsp-house", 25, 30],
      ["教育", "bxsp-edu", 10, 15],
      ["保险", "bxsp-ins", 5, 10],
      ["交通", "bxsp-car", 5, 10],
      ["餐饮日用", "bxsp-food", 10, 15],
      ["其他", "bxsp-other", 10, 15]
    ];
    var rows = [], total = 0, over = [], low = [], worse = [], top = { name: "", v: 0 }, h = "";
    for (var i = 0; i < defs.length; i++) {
      var v = Math.max(0, num($(defs[i][1]), 0));
      total += v;
      if (v > top.v) top = { name: defs[i][0], v: v };
      var share = inc > 0 ? v / inc * 100 : 0;
      var lo = defs[i][2], hi = defs[i][3], judge = "合理", cls = "";
      if (inc > 0) {
        if (share > hi) {
          over.push(defs[i][0]);
          if (share - hi >= 5) { judge = "严重偏高"; cls = "c-bad"; worse.push(defs[i][0]); }
          else { judge = "偏高"; cls = "c-warn"; }
        } else if (share < lo) {
          low.push(defs[i][0]);
          if (lo - share >= 5) { judge = "严重偏低"; cls = "c-bad"; worse.push(defs[i][0]); }
          else { judge = "偏低"; cls = "c-soft"; }
        }
      }
      rows.push({ name: defs[i][0], v: v, share: share, lo: lo, hi: hi, judge: judge, cls: cls });
    }
    var left = inc - total, rate = inc > 0 ? left / inc * 100 : 0;
    var sav = Math.max(0, num($("bxsp-save"), 0));
    var savShare = inc > 0 ? sav / inc * 100 : 0;
    var savOk = savShare >= goal;
    var savGap = goal - savShare;
    rows.push({ name: "储蓄/投资", v: sav, share: savShare, lo: Math.max(0, goal - 3), hi: goal,
      judge: savOk ? "达标" : (savGap >= 5 ? "严重不足" : "不足"),
      cls: savOk ? "" : (savGap >= 5 ? "c-bad" : "c-warn"),
      rangeTxt: "≥" + goal + "%" });
    for (var r = 0; r < rows.length; r++) {
      h += "<tr class=\"" + rows[r].cls + "\"><td class=\"tal\">" + rows[r].name + "</td><td>" + money(rows[r].v)
        + "</td><td>" + fmt(rows[r].share) + "%</td><td>" + (rows[r].rangeTxt || (rows[r].lo + "–" + rows[r].hi + "%")) + "</td><td>" + rows[r].judge + "</td></tr>";
    }
    if ($("bxsp-body")) $("bxsp-body").innerHTML = h;
    var score = 100 - over.length * 12 - low.length * 6;
    if (inc <= 0) score = 0;
    score = Math.max(0, Math.min(100, Math.round(score)));
    if ($("bxsp-big")) $("bxsp-big").textContent = money(total);
    if ($("bxsp-inall")) $("bxsp-inall").textContent = money(inc) + " 元" + (inc2 > 0 ? "（本人 " + money(inc1) + " + 另一半 " + money(inc2) + "）" : "");
    if ($("bxsp-left")) $("bxsp-left").textContent = money(left) + " 元";
    if ($("bxsp-rate")) $("bxsp-rate").textContent = fmt(rate) + "%";
    if ($("bxsp-year")) $("bxsp-year").textContent = money(left * 12) + " 元";
    if ($("bxsp-top")) $("bxsp-top").textContent = top.name + " " + fmt(inc > 0 ? top.v / inc * 100 : 0) + "%";
    if ($("bxsp-over")) $("bxsp-over").textContent = over.length ? over.join("、") : "没有";
    if ($("bxsp-worst")) $("bxsp-worst").textContent = worse.length
      ? worse.join("、") + "（偏离参考区间 5 个百分点以上，标红）"
      : (savOk ? "没有偏离过大的项" : "储蓄/投资（差 " + fmt(Math.max(0, savGap)) + " 个百分点）");
    if ($("bxsp-sv")) $("bxsp-sv").textContent = money(sav + Math.max(0, left)) + " 元（" + fmt(inc > 0 ? (sav + Math.max(0, left)) / inc * 100 : 0) + "%）";
    if ($("bxsp-score")) $("bxsp-score").textContent = score + " 分";
    if ($("bxsp-links")) $("bxsp-links").innerHTML = "带着这些数接着算："
      + linkTo("emergency", { "em-exp": total }, "月支出 → 应急金")
      + linkTo("rentbuy", { "rb-rent": Math.max(0, num($("bxsp-house"), 0)) }, "住这笔 → 租还是买")
      + linkTo("insure", { "in-income": inc * 12, "in-expense": total * 12 }, "收入/支出 → 保额")
      + linkTo("car", { "cr-km": 15000 }, "交通 → 买车还是打车")
      + linkTo("report", { "rp-inc": inc, "rp-need": total }, "整体 → 一页体检");
    var tip;
    if (left < 0) tip = "每月已经入不敷出 " + money(-left) + " 元，先砍「" + (over.length ? over[0] : "其他") + "」这类偏高的项，再谈投资。";
    else if (rate < goal) tip = "储蓄率 " + fmt(rate) + "% 还差目标 " + goal + "% ，每月要少花 " + money(inc * goal / 100 - left) + " 元才能达标。";
    else tip = "储蓄率 " + fmt(rate) + "% 已经达标（目标 " + goal + "%），可以优先把应急金补到 6 个月支出。";
    if ($("bxsp-note")) $("bxsp-note").textContent = tip
      + " 参考区间是经验值：住 25–30%、教育 10–15%、保险 5–10%、交通 5–10%、餐饮日用 10–15%、其他 10–15%；"
      + "一线城市住房占比普遍超 30%，不必硬套，关键是「先存后花」。评分只看 6 类支出，储蓄/投资那一行只做达标提醒（目标 " + goal + "%）。"
      + " 表里偏红＝偏离参考区间 5 个百分点以上，优先动这几格；浅橙/浅蓝是小幅偏离。";
  }

  function calcMonthly() {
    var mode = $("mt-mode") ? $("mt-mode").value : "avg";
    if ($("mt-incbox")) $("mt-incbox").hidden = mode !== "monthly";
    var incAvg = Math.max(0, num($("mt-inc"), 0));
    var outs = [], incomes = [], i;
    for (i = 1; i <= 12; i++) {
      outs.push(Math.max(0, num($("mt-m" + i), 0)));
      incomes.push(mode === "monthly" ? Math.max(0, num($("mt-i" + i), 0)) : incAvg);
    }
    var inTotal = 0, outTotal = 0, maxI = 0, minI = 0, neg = 0, streak = 0, best = 0, cum = 0, h = "";
    for (i = 0; i < 12; i++) {
      inTotal += incomes[i];
      outTotal += outs[i];
      if (outs[i] > outs[maxI]) maxI = i;
      if (outs[i] < outs[minI]) minI = i;
    }
    for (i = 0; i < 12; i++) {
      var bal = incomes[i] - outs[i];
      cum += bal;
      if (bal < 0) { neg++; streak++; if (streak > best) best = streak; } else streak = 0;
      h += "<tr class=\"" + (bal < 0 ? "c-warn" : "") + "\"><td class=\"tal\">" + (i + 1) + " 月</td><td>" + money(outs[i])
        + "</td><td>" + money(bal) + "</td><td>" + money(cum) + "</td></tr>";
    }
    var save = inTotal - outTotal, rate = inTotal > 0 ? save / inTotal * 100 : 0;
    if ($("mt-body")) $("mt-body").innerHTML = h;
    if ($("mt-big")) $("mt-big").textContent = money(save);
    if ($("mt-in")) $("mt-in").textContent = money(inTotal) + " 元";
    if ($("mt-inavg")) $("mt-inavg").textContent = money(inTotal / 12) + " 元";
    if ($("mt-out")) $("mt-out").textContent = money(outTotal) + " 元";
    if ($("mt-avg")) $("mt-avg").textContent = money(outTotal / 12) + " 元";
    if ($("mt-rate")) $("mt-rate").textContent = fmt(rate) + "%";
    if ($("mt-max")) $("mt-max").textContent = (maxI + 1) + " 月 " + money(outs[maxI]) + " 元";
    if ($("mt-min")) $("mt-min").textContent = (minI + 1) + " 月 " + money(outs[minI]) + " 元";
    if ($("mt-gap")) $("mt-gap").textContent = money(outs[maxI] - outs[minI]) + " 元（" + fmt(outs[minI] > 0 ? (outs[maxI] / outs[minI] - 1) * 100 : 0) + "%）";
    if ($("mt-neg")) $("mt-neg").textContent = neg + " 个月";
    if ($("mt-streak")) $("mt-streak").textContent = best + " 个月";
    if ($("mt-note")) $("mt-note").textContent =
      (neg ? "有 " + neg + " 个月当月结余为负" + (best >= 2 ? "，最长连续 " + best + " 个月" : "") + "，先看这几个月的支出里有没有一次性大项（学费、保险、年节）。" : "12 个月都是正结余，节奏很稳。")
      + " 全年储蓄率 " + fmt(rate) + "%" + (mode === "monthly" ? "（按逐月真实收入算）" : "（按收入平摊算，切上面「逐月填真实到手」更准）")
      + "；年终奖、十三薪这类不进月收入的钱另外存，别当成月供能力。图上柱高是当月支出，虚线是当月收入。";
    drawnMonthlyChart(incomes, outs);
    drawMonthCats(outTotal);
  }

  function calcYearCmp() {
    var ys = [], i;
    for (i = 1; i <= 5; i++) {
      var inc = Math.max(0, num($("yc-inc" + i), 0));
      var out = Math.max(0, num($("yc-out" + i), 0));
      var ast = Math.max(0, num($("yc-asset" + i), 0));
      if (inc <= 0 && out <= 0 && ast <= 0) continue;
      ys.push({ n: i, inc: inc, out: out, asset: ast, left: inc - out, rate: inc > 0 ? (inc - out) / inc * 100 : 0 });
    }
    var h = "", j, totalLeft = 0;
    for (j = 0; j < ys.length; j++) {
      totalLeft += ys[j].left;
      h += "<tr class=\"" + (ys[j].left < 0 ? "c-warn" : "") + "\"><td class=\"tal\">第 " + ys[j].n + " 年</td><td>" + money(ys[j].inc)
        + "</td><td>" + money(ys[j].out) + "</td><td>" + money(ys[j].left) + "</td><td>" + fmt(ys[j].rate) + "%</td><td>" + money(ys[j].asset) + "</td></tr>";
    }
    if ($("yc-body")) $("yc-body").innerHTML = h;
    var f = ys[0] || { inc: 0, out: 0, asset: 0, left: 0, rate: 0 }, L = ys[ys.length - 1] || f;
    var periods = Math.max(1, ys.length - 1);
    function cagr(v0, v1) { return v0 > 0 && v1 > 0 ? (Math.pow(v1 / v0, 1 / periods) - 1) * 100 : 0; }
    var cInc = cagr(f.inc, L.inc), cOut = cagr(f.out, L.out), cAst = cagr(f.asset, L.asset);
    var dA = L.asset - f.asset;
    var incG = f.inc > 0 ? (L.inc / f.inc - 1) * 100 : 0, outG = f.out > 0 ? (L.out / f.out - 1) * 100 : 0;
    var best = null, worst = null;
    for (j = 0; j < ys.length; j++) {
      if (!best || ys[j].rate > best.rate) best = ys[j];
      if (!worst || ys[j].rate < worst.rate) worst = ys[j];
    }
    var gap = dA - totalLeft;
    if ($("yc-big")) $("yc-big").textContent = (dA >= 0 ? "+" : "") + money(dA);
    if ($("yc-inccagr")) $("yc-inccagr").textContent = fmt(cInc) + "%";
    if ($("yc-outcagr")) $("yc-outcagr").textContent = fmt(cOut) + "%";
    if ($("yc-assetcagr")) $("yc-assetcagr").textContent = fmt(cAst) + "%";
    if ($("yc-incg")) $("yc-incg").textContent = (incG >= 0 ? "+" : "") + fmt(incG) + "%";
    if ($("yc-outg")) $("yc-outg").textContent = (outG >= 0 ? "+" : "") + fmt(outG) + "%";
    if ($("yc-left")) $("yc-left").textContent = money(f.left) + " → " + money(L.left) + " 元";
    if ($("yc-rate")) $("yc-rate").textContent = fmt(f.rate) + "% → " + fmt(L.rate) + "%";
    if ($("yc-gap")) $("yc-gap").textContent = (gap >= 0 ? "资产多增 " : "资产少增 ") + money(Math.abs(gap)) + " 元";
    if ($("yc-best")) $("yc-best").textContent = (best ? "第 " + best.n + " 年 " + fmt(best.rate) + "%" : "—")
      + " / " + (worst ? "第 " + worst.n + " 年 " + fmt(worst.rate) + "%" : "—");
    var focus;
    if (cOut > cInc + 0.5) focus = "支出涨得比收入快";
    else if (L.rate < f.rate) focus = "储蓄率在下滑";
    else if (gap < 0) focus = "钱没落在账上（有一次性大额支出）";
    else focus = "收入、储蓄、资产都在向上，保持";
    if ($("yc-focus")) $("yc-focus").textContent = focus;
    if ($("yc-note")) $("yc-note").textContent =
      "看 " + ys.length + " 年：" + (ys.length > 1 ? "收入年均 " + fmt(cInc) + "%、支出年均 " + fmt(cOut) + "%、资产年均 " + fmt(cAst) + "%。" : "只有一年数据，填满 2 年以上才能看趋势。")
      + " 这几年累计结余 " + money(totalLeft) + " 元，资产实际增加 " + money(dA) + " 元，差 " + money(Math.abs(gap)) + " 元"
      + (gap >= 0 ? "（来自理财收益、公积金或结转）。" : "（这一年有大额一次性支出，或资产市值缩水）。")
      + " 提醒：自住房不在资产里，房贷月供只算支出。";
    if ($("yc-forecast")) {
      if (ys.length >= 2) {
        var nInc = L.inc * (1 + cInc / 100), nOut = L.out * (1 + cOut / 100);
        var nLeft = nInc - nOut, nRate = nInc > 0 ? nLeft / nInc * 100 : 0;
        var nAsset = L.asset + nLeft;
        if ($("yc-forecast")) $("yc-forecast").textContent =
          "按这几年速度外推下一年（虚线）：收入约 " + money(nInc) + " 元、支出约 " + money(nOut) + " 元，"
          + "结余约 " + money(nLeft) + " 元、储蓄率约 " + fmt(nRate) + "%" + (nRate >= L.rate ? "（比最近一年还好）" : "（比最近一年差，要靠控制支出）")
          + "，年末金融资产约 " + money(nAsset) + " 元。这只是把过去的斜率延长，不预测行情，别拿它当目标；想改结果就改支出那一栏。";
        drawnYearChart(ys, { inc: nInc, out: nOut, asset: nAsset });
      } else {
        $("yc-forecast").textContent = "至少填两年才能外推下一年。";
      }
    }
    if ($("yc-goal")) {
      var target = Math.max(0, num($("yc-target"), 0)), yrs = Math.max(1, Math.round(num($("yc-years"), 1)));
      var curAsset = L.asset, needTotal = target - curAsset;
      if (target <= 0) {
        $("yc-goal").textContent = "填一个目标金额（比如 100 万）就能倒推每年、每月要存多少。";
      } else if (needTotal <= 0) {
        $("yc-goal").textContent = "现在已经有 " + money(curAsset) + " 元，已经超过目标 " + money(target) + " 元了。";
      } else {
        var perYear = needTotal / yrs, perMonth = perYear / 12;
        var needRate = L.inc > 0 ? perYear / L.inc * 100 : 0;
        var haveYear = Math.max(0, L.left), gapYear = perYear - haveYear;
        var text = "要在 " + yrs + " 年后把金融资产做到 " + money(target) + " 元，从现在的 " + money(curAsset) + " 元出发，"
          + "这 " + yrs + " 年一共要存 " + money(needTotal) + " 元：平均每年 " + money(perYear) + "、每月 " + money(perMonth) + " 元。";
        if (L.inc > 0) {
          text += " 按现在的收入 " + money(L.inc) + " 元算，这等于每年存下收入的 " + fmt(needRate) + "%";
          text += needRate <= 30 ? "，属于可做到的范围。" : needRate <= 50 ? "，压力不小，得砍支出或涨收入。" : "，很难只靠省出来，需要提高收入。";
        }
        text += " 你现在每年能存 " + money(haveYear) + " 元，"
          + (gapYear <= 0 ? "已经超过这个速度，按现在的节奏就能达成。" : "按这个速度 " + yrs + " 年只存到 " + money(curAsset + haveYear * yrs) + " 元，差 " + money(gapYear * yrs) + " 元，每年还要多存 " + money(gapYear) + " 元（每月多 " + money(gapYear / 12) + "）。");
        var iM = 0.03 / 12, nM = yrs * 12;
        var pmtWith = iM > 0 ? needTotal * iM / (Math.pow(1 + iM, nM) - 1) : needTotal / nM;
        text += " 上面的数没算投资收益；如果这 " + yrs + " 年能拿到 3% 年化，每月实际只需存 " + money(pmtWith)
          + " 元，比不算收益少 " + money(Math.max(0, perMonth - pmtWith)) + " 元。";
        $("yc-goal").textContent = text;
      }
    }
  }

  function calcYearReport() {
    var inc = Math.max(0, num($("yrp-inc"), 0)), out = Math.max(0, num($("yrp-out"), 0));
    var a0 = Math.max(0, num($("yrp-a0"), 0)), a1 = Math.max(0, num($("yrp-a1"), 0));
    var cash = Math.max(0, num($("yrp-cash"), 0)), debt = Math.max(0, num($("yrp-debt"), 0));
    var house = Math.max(0, num($("yrp-house"), 0));
    var left = inc - out, rate = inc > 0 ? left / inc * 100 : 0;
    var dA = a1 - a0, ag = a0 > 0 ? dA / a0 * 100 : 0;
    var net = a1 + house - debt;
    var lev = (a1 + house) > 0 ? debt / (a1 + house) * 100 : 0;
    var monOut = out / 12, emg = monOut > 0 ? cash / monOut : 0;
    var gap = dA - left;
    if ($("yrp-big")) $("yrp-big").textContent = money(net);
    if ($("yrp-rate")) $("yrp-rate").textContent = fmt(rate) + "%（结余 " + money(left) + " 元）";
    if ($("yrp-ag")) $("yrp-ag").textContent = (ag >= 0 ? "+" : "") + fmt(ag) + "%（" + (dA >= 0 ? "+" : "") + money(dA) + " 元）";
    if ($("yrp-gap")) $("yrp-gap").textContent = (Math.abs(gap) < 1 ? "对得上" : (gap > 0 ? "资产多增 " : "资产少增 ") + money(Math.abs(gap)) + " 元");
    if ($("yrp-lev")) $("yrp-lev").textContent = fmt(lev) + "%";
    if ($("yrp-emg")) $("yrp-emg").textContent = fmt(emg, 1) + " 个月";
    var pinc = Math.max(0, num($("yrp-pinc"), 0)), pout = Math.max(0, num($("yrp-pout"), 0)), pa1 = Math.max(0, num($("yrp-pa1"), 0));
    var cmpTxt = "", cmpKv = "";
    if (pinc > 0 && inc > 0) {
      var pLeft = pinc - pout, pRate = pinc > 0 ? pLeft / pinc * 100 : 0;
      cmpKv = "收入 " + (inc >= pinc ? "+" : "") + fmt((inc / pinc - 1) * 100) + "% · 支出 "
        + (pout > 0 ? ((out >= pout ? "+" : "") + fmt((out / pout - 1) * 100) + "%") : "—")
        + " · 储蓄率 " + fmt(pRate) + "% → " + fmt(rate) + "%";
      cmpTxt = "和上一年比：收入 " + money(pinc) + " → " + money(inc) + " 元，支出 " + money(pout) + " → " + money(out)
        + " 元，储蓄率 " + fmt(pRate) + "% → " + fmt(rate) + "%" + (rate >= pRate ? "，存钱的比例提高了。" : "，存钱的比例下降了，支出涨得比收入快。")
        + (pa1 > 0 ? " 年末金融资产 " + money(pa1) + " → " + money(a1) + " 元。" : "");
    }
    if ($("yrp-cmp")) $("yrp-cmp").textContent = cmpKv || "填上「上一年」三个数就能看到同比。";
    var score = 0;
    score += rate >= 30 ? 25 : rate >= 20 ? 20 : rate >= 10 ? 12 : rate >= 0 ? 5 : 0;
    score += emg >= 6 ? 25 : emg >= 4 ? 18 : emg >= 2 ? 10 : 3;
    score += lev < 30 ? 25 : lev < 50 ? 18 : lev < 70 ? 10 : 3;
    score += ag >= 10 ? 25 : ag >= 5 ? 18 : ag >= 0 ? 10 : 2;
    var grade = score >= 85 ? "A（很稳）" : score >= 70 ? "B（健康）" : score >= 55 ? "C（及格）" : "D（要调整）";
    if ($("yrp-grade")) $("yrp-grade").textContent = grade + " · " + score + " 分";
    var lines = [];
    lines.push("这一年你的税后收入 " + money(inc) + " 元，花了 " + money(out) + " 元，"
      + (left >= 0 ? "存下 " + money(left) + " 元，储蓄率 " + fmt(rate) + "%。" : "超支 " + money(-left) + " 元，储蓄率是负的，先把支出按住再谈投资。"));
    lines.push("金融资产从 " + money(a0) + " 元到 " + money(a1) + " 元，"
      + (dA >= 0 ? "增加 " + money(dA) + " 元（" + fmt(ag) + "%）" : "减少 " + money(-dA) + " 元")
      + (Math.abs(gap) < 1 ? "，和这一年的结余正好对上。" : (gap > 0 ? "，比结余多出 " + money(gap) + " 元，多出来的是理财收益、公积金或上年结转。" : "，比结余少了 " + money(-gap) + " 元，可能有一次性大额支出，或者持仓市值跌了。")));
    lines.push("手上的现金 " + money(cash) + " 元，按每月花 " + money(monOut) + " 元算，能撑 " + fmt(emg, 1) + " 个月，"
      + (emg >= 6 ? "应急金已经够了。" : emg >= 3 ? "离 6 个月的安全线还差 " + money(monOut * 6 - cash) + " 元，建议先补这一块。" : "偏薄，遇到失业或大病会很被动，优先级排在投资前面。"));
    lines.push("负债 " + money(debt) + " 元，负债率 " + fmt(lev) + "%"
      + (lev < 30 ? "，属于很健康的水平。" : lev < 50 ? "，在可接受范围，但别再加大杠杆。" : lev < 70 ? "，偏高了，新增负债要谨慎。" : "，已经很高，任何收入中断都会立刻变成危机。"));
    var next = rate >= 30 && emg >= 6 ? "下一年可以把多出来的钱按「应急金 → 保险 → 指数基金/长期定投」的顺序放。" : "下一年的第一件事是把储蓄率提到 20% 以上、应急金补到 6 个月。";
    if (cmpTxt) lines.splice(1, 0, cmpTxt);
    lines.push("净资产（含自住房）" + money(net) + " 元。综合评级 " + grade + "。" + next);
    if ($("yrp-text")) $("yrp-text").innerHTML = lines.map(function (t) { return "<p>" + t + "</p>"; }).join("");
    drawReportCharts();
    if ($("yrp-note")) $("yrp-note").textContent = "储蓄率 " + (rate >= 20 ? "≥20% 算及格" : "低于 20%，偏紧")
      + "；应急金 6 个月是常用安全线；负债率 50% 是多数家庭的警戒线。自住房计入净资产但不变现，所以别把它当现金流。";
  }

export const PANELS = {"planner":"  <section class=\"panel\" id=\"panel-planner\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：你的家底与目标房子</h2>\n        <label class=\"f\"><span>月收入（税后）</span><input id=\"pl-inc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\"></label>\n        <span class=\"row\">\n          <label class=\"f\"><span>现有现金</span><input id=\"pl-cash\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"900000\"></label>\n          <label class=\"f\"><span>现有投资</span><input id=\"pl-inv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>目标房价</span><input id=\"pl-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2000000\"></label>\n          <label class=\"f\"><span>首付比例 %</span><input id=\"pl-dp\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"30\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>房贷利率 %</span><input id=\"pl-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"3.1\"></label>\n          <label class=\"f\"><span>贷款年限</span><input id=\"pl-years\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"30\" step=\"1\" value=\"30\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>月必需支出</span><input id=\"pl-need\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"10000\"></label>\n          <label class=\"f\"><span>月可选支出</span><input id=\"pl-want\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"3000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>现有其他负债</span><input id=\"pl-debt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"0\"></label>\n          <label class=\"f\"><span>已配寿险/重疾保额</span><input id=\"pl-ins\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>税费/中介等（占房价 %）</span><input id=\"pl-close\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"20\" step=\"0.5\" value=\"3\"></label>\n          <label class=\"f\"><span>装修家具等（一次性）</span><input id=\"pl-deco\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"150000\"></label>\n        </span>\n        <em>口径：月供按等额本息；「买房后」把首付＋税费中介＋装修家具一次全部算作已支出，其余负债只算房贷余额。契税/中介费率各地不同，默认 3% 只是示例。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果：买完这套房，你的财务体检</h2>\n        <div class=\"big\"><span class=\"k\">买房后体检分</span><strong id=\"pl-big\">—</strong><span class=\"unit\">/100</span></div>\n        <ul class=\"kv\">\n          <li><span>现在 vs 买房后</span><b id=\"pl-score\">—</b></li>\n          <li><span>首付需要 / 现金剩余</span><b id=\"pl-dpout\">—</b></li>\n          <li><span>签字前要备的现金</span><b id=\"pl-cashall\">—</b></li>\n          <li><span>贷款与月供</span><b id=\"pl-pay\">—</b></li>\n          <li><span>月供占收入</span><b id=\"pl-ratio\">—</b></li>\n          <li><span>买房后每月结余</span><b id=\"pl-left\">—</b></li>\n          <li><span>买房后储蓄率</span><b id=\"pl-save\">—</b></li>\n          <li><span>应急金能撑（买房后）</span><b id=\"pl-emg\">—</b></li>\n          <li><span>现金能撑的房价上限</span><b id=\"pl-cap\">—</b></li>\n        </ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">维度</th><th>现在</th><th>买房后</th><th>得分变化</th></tr></thead>\n            <tbody id=\"plz-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"plz-note\"></p>\n      </div>\n    </div>\n  </section>\n","report":"  <section class=\"panel\" id=\"panel-report\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：家庭财务（月度）</h2>\n        <label class=\"f\"><span>月收入（税后到手）</span><input id=\"rp-inc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\"></label>\n        <label class=\"f\"><span>月必需支出（房租房贷外）</span><input id=\"rp-need\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"10000\"></label>\n        <label class=\"f\"><span>月可选支出（娱乐/旅行等）</span><input id=\"rp-want\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"3000\"></label>\n        <label class=\"f\"><span>现金及活期</span><input id=\"rp-cash\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"50000\"></label>\n        <label class=\"f\"><span>投资资产（基金/股票等）</span><input id=\"rp-inv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\"></label>\n        <label class=\"f\"><span>自住房市值</span><input id=\"rp-house\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"2000000\"></label>\n        <label class=\"f\"><span>负债余额（房贷＋其他）</span><input id=\"rp-debt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\"></label>\n        <label class=\"f\"><span>每月还贷</span><input id=\"rp-loan\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"6000\"></label>\n        <label class=\"f\"><span>已配置保额（寿险＋重疾）</span><input id=\"rp-ins\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\"></label>\n        <label class=\"f\"><span>年缴保费</span><input id=\"rp-prem\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"8000\"></label>\n        <span class=\"row\">\n          <input id=\"rp-age\" type=\"number\" inputmode=\"numeric\" min=\"18\" max=\"80\" step=\"1\" value=\"32\" aria-label=\"年龄\">\n          <input id=\"rp-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"20\" step=\"0.05\" value=\"3.1\" aria-label=\"房贷利率%\">\n          <input id=\"rp-years\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"30\" step=\"1\" value=\"30\" aria-label=\"贷款年限\">\n        </span>\n        <em>依次是：年龄 / 房贷利率 % / 贷款年限。评分只看五项硬指标，不含投资能力与收入稳定性。</em>\n        <span class=\"row\">\n          <input id=\"rp-goal\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50000\" value=\"1000000\" aria-label=\"目标净资产\">\n          <input id=\"rp-gyear\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"40\" step=\"1\" value=\"3\" aria-label=\"目标年限（年）\">\n        </span>\n        <em>最后一行：目标净资产 / 目标年限（年）——用来反推「每月要存多少」，会一起打进 PDF。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>一页体检报告</h2>\n        <div class=\"big\"><span class=\"k\">综合评分</span><strong id=\"rp-big\">—</strong><span class=\"unit\" id=\"rp-uni\">分</span></div>\n        <ul class=\"kv\" id=\"rp-kv\"></ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">维度</th><th>你的数</th><th>得分</th><th>达标线</th></tr></thead>\n            <tbody id=\"rp-body\"></tbody>\n          </table>\n        </div>\n        <h2 class=\"sub\">你记的 12 个月支出</h2>\n        <canvas id=\"rp-mini\" width=\"720\" height=\"120\" aria-label=\"12 个月支出缩略图\"></canvas>\n        <p class=\"hint\" id=\"rp-mini-note\"></p>\n        <h2 class=\"sub\">先改这三项（按\"缺分 × 好改程度\"排）</h2>\n        <ol class=\"pri\" id=\"rp-pri\"></ol>\n        <p class=\"rpgoal\" id=\"rp-goaltext\"></p>\n        <p class=\"jump\" id=\"rp-links\"></p>\n        <p class=\"hint\" id=\"rp-note\"></p>\n        <p class=\"btnrow\"><button class=\"ghost\" type=\"button\" id=\"rp-pdf\">导出这份报告（PDF / 打印）</button></p>\n      </div>\n    </div>\n  </section>\n","edu":"  <section class=\"panel\" id=\"panel-edu\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>孩子现在几岁</span>\n      <input id=\"ed-age\" type=\"number\" inputmode=\"numeric\" min=\"0\" max=\"17\" step=\"1\" value=\"3\">\n    </label>\n    <label class=\"f\">\n      <span>计划上大学年龄</span>\n      <input id=\"ed-go\" type=\"number\" inputmode=\"numeric\" min=\"15\" max=\"25\" step=\"1\" value=\"18\">\n    </label>\n    <label class=\"f\">\n      <span>现在每年学费+生活费（元）</span>\n      <input id=\"ed-cur\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"30000\">\n    </label>\n    <label class=\"f\">\n      <span>教育费用年涨幅（%）</span>\n      <input id=\"ed-infl\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"3\">\n    </label>\n    <label class=\"f\">\n      <span>已经存了多少（元）</span>\n      <input id=\"ed-have\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5000\" value=\"50000\">\n    </label>\n    <label class=\"f\">\n      <span>这笔钱理财年化（%）</span>\n      <input id=\"ed-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"3\">\n    </label>\n    <label class=\"f\">\n      <span>现在每月能存（元）</span>\n      <input id=\"ed-monthly\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"2000\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">上大学时 4 年总花费</span>\n      <strong id=\"ed-total\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>距离上大学还有</span><b id=\"ed-years\">—</b></li>\n      <li><span>届时第一年费用</span><b id=\"ed-first\">—</b></li>\n      <li><span>已有存款届时变成</span><b id=\"ed-havefv\">—</b></li>\n      <li><span>缺口（只算已有存款）</span><b id=\"ed-gap\">—</b></li>\n      <li><span>按现在每月存能攒到</span><b id=\"ed-plan\">—</b></li>\n      <li><span>要补上缺口每月得存</span><b id=\"ed-needm\">—</b></li>\n      <li><span>缺口平摊到每个月</span><b id=\"ed-gapm\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"ed-note\"></p>\n  </div>\n    </div>\n  </section>\n","insure":"  <section class=\"panel\" id=\"panel-insure\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>家庭年收入（元）</span>\n      <input id=\"in-income\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\">\n    </label>\n    <label class=\"f\">\n      <span>家庭年支出（元）</span>\n      <input id=\"in-expense\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"120000\">\n    </label>\n    <label class=\"f\">\n      <span>负债余额（房贷车贷等，元）</span>\n      <input id=\"in-debt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\">\n    </label>\n    <label class=\"f\">\n      <span>子女教育金需求（元）</span>\n      <input id=\"in-edu\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\">\n    </label>\n    <label class=\"f\">\n      <span>可变现资产（元）</span>\n      <input id=\"in-assets\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\">\n    </label>\n    <label class=\"f\">\n      <span>已有寿险保额（元）</span>\n      <input id=\"in-have\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"0\">\n    </label>\n    <label class=\"f\">\n      <span>生活费按几年算</span>\n      <input id=\"in-years\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"30\" step=\"1\" value=\"10\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">建议寿险保额</span>\n      <strong id=\"in-need\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>家庭责任法</span><b id=\"in-need1\">—</b></li>\n      <li><span>收入倍数法（10 倍年收入）</span><b id=\"in-need2\">—</b></li>\n      <li><span>还差多少保额</span><b id=\"in-gap\">—</b></li>\n      <li><span>重疾险建议（3 倍年收入）</span><b id=\"in-ci3\">—</b></li>\n      <li><span>重疾险建议（5 倍年收入）</span><b id=\"in-ci5\">—</b></li>\n      <li><span>意外险建议（10 倍年收入）</span><b id=\"in-acc\">—</b></li>\n      <li><span>年保费预算（收入 5%–10%）</span><b id=\"in-prem\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"in-note\"></p>\n  </div>\n    </div>\n  </section>\n","balance":"  <section class=\"panel\" id=\"panel-balance\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>资产（元）</h2>\n    <label class=\"f\"><span>现金 / 活期</span>\n      <input id=\"bl-cash\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"50000\"></label>\n    <label class=\"f\"><span>存款 / 理财 / 货币基金</span>\n      <input id=\"bl-save\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\"></label>\n    <label class=\"f\"><span>股票 / 基金 / 保险现金价值</span>\n      <input id=\"bl-invest\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"150000\"></label>\n    <label class=\"f\"><span>房产市值</span>\n      <input id=\"bl-house\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2000000\"></label>\n    <label class=\"f\"><span>车产市值</span>\n      <input id=\"bl-car\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"100000\"></label>\n    <label class=\"f\"><span>其他资产（股权、收藏等）</span>\n      <input id=\"bl-other\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"0\"></label>\n    <h2 class=\"sub\">负债与收支</h2>\n    <label class=\"f\"><span>房贷余额</span>\n      <input id=\"bl-mortgage\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\"></label>\n    <label class=\"f\"><span>房贷月供</span>\n      <input id=\"bl-mpay\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"4477\"></label>\n    <label class=\"f\"><span>其他负债（车贷/消费贷/信用卡）</span>\n      <input id=\"bl-debt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"0\"></label>\n    <label class=\"f\"><span>家庭月税后收入</span>\n      <input id=\"bl-income\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"30000\"></label>\n    <label class=\"f\"><span>家庭月支出（不含月供）</span>\n      <input id=\"bl-expense\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"12000\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">净资产</span>\n      <strong id=\"bl-net\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>总资产</span><b id=\"bl-assets\">—</b></li>\n      <li><span>总负债</span><b id=\"bl-liab\">—</b></li>\n      <li><span>负债率（负债 ÷ 资产）</span><b id=\"bl-lev\">—</b></li>\n      <li><span>房产占总资产</span><b id=\"bl-housepct\">—</b></li>\n      <li><span>能马上动用的钱</span><b id=\"bl-liquid\">—</b></li>\n      <li><span>应急金可支撑月数</span><b id=\"bl-runway\">—</b></li>\n      <li><span>月供 ÷ 月收入</span><b id=\"bl-dti\">—</b></li>\n      <li><span>每月结余</span><b id=\"bl-surplus\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"bl-note\"></p>\n  </div>\n    </div>\n  </section>\n","checkup":"  <section class=\"panel\" id=\"panel-checkup\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>家庭年收入（元，税后）</span>\n      <input id=\"ck-income\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\">\n    </label>\n    <label class=\"f\">\n      <span>家庭年支出（元）</span>\n      <input id=\"ck-expense\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"120000\">\n    </label>\n    <label class=\"f\">\n      <span>负债余额（元，房贷车贷等）</span>\n      <input id=\"ck-debt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\">\n    </label>\n    <label class=\"f\">\n      <span>子女教育金目标（元）</span>\n      <input id=\"ck-edu\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\">\n    </label>\n    <label class=\"f\">\n      <span>可变现资产（元，存款基金股票）</span>\n      <input id=\"ck-assets\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\">\n    </label>\n    <label class=\"f\">\n      <span>现有寿险保额（元）</span>\n      <input id=\"ck-haveLife\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\">\n    </label>\n    <label class=\"f\">\n      <span>现有重疾保额（元）</span>\n      <input id=\"ck-haveCI\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\">\n    </label>\n    <label class=\"f\">\n      <span>现有意外保额（元）</span>\n      <input id=\"ck-haveAcc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\">\n    </label>\n    <label class=\"f\">\n      <span>现在一年交多少保费（元）</span>\n      <input id=\"ck-premium\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"8000\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">寿险保额缺口</span>\n      <strong id=\"ck-lifeGap\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>应配寿险（责任法 / 收入倍数法取高）</span><b id=\"ck-lifeNeed\">—</b></li>\n      <li><span>现有寿险</span><b id=\"ck-lifeHave\">—</b></li>\n      <li><span>应配重疾（3–5 倍年收入）</span><b id=\"ck-ciNeed\">—</b></li>\n      <li><span>重疾缺口</span><b id=\"ck-ciGap\">—</b></li>\n      <li><span>应配意外（约 10 倍年收入）</span><b id=\"ck-accNeed\">—</b></li>\n      <li><span>意外缺口</span><b id=\"ck-accGap\">—</b></li>\n      <li><span>寿险充足度</span><b id=\"ck-ratio\">—</b></li>\n      <li><span>年保费占收入</span><b id=\"ck-cost\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"ck-note\"></p>\n  </div>\n    </div>\n  </section>\n","cashflow":"  <section class=\"panel\" id=\"panel-cashflow\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>月初手上的钱（元）</span>\n      <input id=\"cf-open\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\"></label>\n    <label class=\"f\"><span>月收入（税后，元）</span>\n      <input id=\"cf-income\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"15000\"></label>\n    <label class=\"f\"><span>发薪日（1–31）</span>\n      <input id=\"cf-payday\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"31\" step=\"1\" value=\"10\"></label>\n    <label class=\"f\"><span>房贷 / 房租月供（元）</span>\n      <input id=\"cf-loan\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"5978.23\"></label>\n    <label class=\"f\"><span>房贷 / 房租扣款日</span>\n      <input id=\"cf-loanday\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"31\" step=\"1\" value=\"20\"></label>\n    <label class=\"f\"><span>信用卡本期应还（元）</span>\n      <input id=\"cf-card\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"3500\"></label>\n    <label class=\"f\"><span>信用卡还款日</span>\n      <input id=\"cf-cardday\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"31\" step=\"1\" value=\"25\"></label>\n    <label class=\"f\"><span>日常开销（月合计，元）</span>\n      <input id=\"cf-living\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"4500\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">月中最低余额</span><strong id=\"cf-min\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>最低余额出现在</span><b id=\"cf-minday\">—</b></li>\n      <li><span>月末余额</span><b id=\"cf-end\">—</b></li>\n      <li><span>本月净结余</span><b id=\"cf-net\">—</b></li>\n      <li><span>月初至少要备多少才不破零</span><b id=\"cf-need\">—</b></li>\n      <li><span>最大的单笔支出</span><b id=\"cf-big\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>日</th><th>事件</th><th>金额</th><th>当日余额</th></tr></thead>\n        <tbody id=\"cf-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"cf-note\"></p>\n  </div>\n    </div>\n  </section>\n","riskalloc":"  <section class=\"panel\" id=\"panel-riskalloc\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>年龄</span>\n      <input id=\"ra-age\" type=\"number\" inputmode=\"numeric\" min=\"18\" max=\"80\" step=\"1\" value=\"30\"></label>\n    <label class=\"f\"><span>这笔钱多久不用（年）</span>\n      <input id=\"ra-years\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"10\"></label>\n    <label class=\"f\"><span>最多能忍住亏多少（%）</span>\n      <input id=\"ra-dd\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"60\" step=\"5\" value=\"20\"></label>\n    <label class=\"f\"><span>收入稳定性</span>\n      <select id=\"ra-stable\">\n        <option value=\"stable\">稳定（体制内 / 大厂正式工）</option>\n        <option value=\"normal\" selected>一般</option>\n        <option value=\"volatile\">波动大（销售 / 创业 / 自由职业）</option>\n      </select></label>\n    <label class=\"f\"><span>可投资金额（元）</span>\n      <input id=\"ra-cap\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">股票类资产</span><strong id=\"ra-eq\">—</strong><span class=\"unit\">%</span></div>\n    <ul class=\"kv\">\n      <li><span>风险等级</span><b id=\"ra-level\">—</b></li>\n      <li><span>股票 / 债券 / 现金</span><b id=\"ra-mix\">—</b></li>\n      <li><span>对应金额</span><b id=\"ra-amt\">—</b></li>\n      <li><span>长期预期年化</span><b id=\"ra-ret\">—</b></li>\n      <li><span>极端年份可能亏</span><b id=\"ra-loss\">—</b></li>\n      <li><span>要不要再平衡 / 多久</span><b id=\"ra-reb\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"ra-note\"></p>\n  </div>\n    </div>\n  </section>\n","fire":"  <section class=\"panel\" id=\"panel-fire\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>现在每月支出（元）</span>\n      <input id=\"fr-exp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"12000\"></label>\n    <label class=\"f\"><span>已有可投资资产（元）</span>\n      <input id=\"fr-has\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\"></label>\n    <label class=\"f\"><span>每月还能存（元）</span>\n      <input id=\"fr-save\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"8000\"></label>\n    <label class=\"f\"><span>预期年化收益（%）</span>\n      <input id=\"fr-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"5\"></label>\n    <label class=\"f\"><span>安全提取率（%）</span>\n      <input id=\"fr-swr\" type=\"number\" inputmode=\"decimal\" min=\"0.5\" step=\"0.5\" value=\"4\"></label>\n    <label class=\"f\"><span>现在的年龄</span>\n      <input id=\"fr-age\" type=\"number\" inputmode=\"decimal\" min=\"15\" step=\"1\" value=\"30\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">需要的本金</span><strong id=\"fr-target\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>离目标还差</span><b id=\"fr-gap\">—</b></li>\n      <li><span>按当前存钱速度还要</span><b id=\"fr-time\">—</b></li>\n      <li><span>那大约是你多少岁</span><b id=\"fr-ageout\">—</b></li>\n      <li><span>当前进度</span><b id=\"fr-progress\">—</b></li>\n      <li><span>达成后每月可提取</span><b id=\"fr-withdraw\">—</b></li>\n      <li><span>想在 10 年内达成，每月要存</span><b id=\"fr-pmt\">—</b></li>\n      <li><span>收益 3% / 5% / 7% 各要多久</span><b id=\"fr-sens\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"fr-note\"></p>\n  </div>\n    </div>\n  </section>\n","annualfee":"  <section class=\"panel\" id=\"panel-annualfee\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（一年交一次的费用）</h2>\n    <label class=\"f\"><span>物业费 每年（元）</span>\n      <input id=\"af-1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"3600\"></label>\n    <label class=\"f\"><span>物业费 缴费月份（1–12）</span>\n      <input id=\"af-1m\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"12\" step=\"1\" value=\"3\"></label>\n    <label class=\"f\"><span>车险 每年（元）</span>\n      <input id=\"af-2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"5000\"></label>\n    <label class=\"f\"><span>车险 缴费月份（1–12）</span>\n      <input id=\"af-2m\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"12\" step=\"1\" value=\"9\"></label>\n    <label class=\"f\"><span>保险（寿险/重疾）每年（元）</span>\n      <input id=\"af-3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"12000\"></label>\n    <label class=\"f\"><span>保险 缴费月份（1–12）</span>\n      <input id=\"af-3m\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"12\" step=\"1\" value=\"6\"></label>\n    <label class=\"f\"><span>学费/其它 每年（元）</span>\n      <input id=\"af-4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"20000\"></label>\n    <label class=\"f\"><span>学费/其它 缴费月份（1–12）</span>\n      <input id=\"af-4m\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"12\" step=\"1\" value=\"8\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">每月先划走</span><strong id=\"af-monthly\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>一年要交的合计</span><b id=\"af-total\">—</b></li>\n      <li><span>最大的一笔</span><b id=\"af-max\">—</b></li>\n      <li><span>压力最集中的月份</span><b id=\"af-peak\">—</b></li>\n      <li><span>这个月占全年</span><b id=\"af-peakamt\">—</b></li>\n      <li><span>只在缴费前才准备，要提前</span><b id=\"af-lead\">—</b></li>\n      <li><span>分摊到每天</span><b id=\"af-check\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>年费</th><th>缴费月</th><th>每月分摊</th></tr></thead>\n        <tbody id=\"af-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"af-note\"></p>\n  </div>\n    </div>\n  </section>\n","childcost":"  <section class=\"panel\" id=\"panel-childcost\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>孩子现在几岁</span>\n      <input id=\"cc-age\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"18\" step=\"1\" value=\"0\"></label>\n    <label class=\"f\"><span>0–6 岁：每年花多少（元）</span>\n      <input id=\"cc-pre\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"30000\"></label>\n    <label class=\"f\"><span>7–18 岁：每年花多少（元）</span>\n      <input id=\"cc-mid\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"40000\"></label>\n    <label class=\"f\"><span>大学 4 年：每年花多少（元）</span>\n      <input id=\"cc-uni\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"50000\"></label>\n    <label class=\"f\"><span>每年花费上涨（%）</span>\n      <input id=\"cc-infl\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"3\"></label>\n    <label class=\"f\"><span>你的钱能拿到的年化（%）</span>\n      <input id=\"cc-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"3\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">到 22 岁一共要花</span><strong id=\"cc-total\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>折成今天的钱</span><b id=\"cc-pv\">—</b></li>\n      <li><span>平均每月</span><b id=\"cc-month\">—</b></li>\n      <li><span>最贵的一年</span><b id=\"cc-peak\">—</b></li>\n      <li><span>学前段合计</span><b id=\"cc-pre-sum\">—</b></li>\n      <li><span>中小学段合计</span><b id=\"cc-mid-sum\">—</b></li>\n      <li><span>大学段合计</span><b id=\"cc-uni-sum\">—</b></li>\n      <li><span>现在开始每月存</span><b id=\"cc-save\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"cc-note\"></p>\n  </div>\n    </div>\n  </section>\n","emergency":"  <section class=\"panel\" id=\"panel-emergency\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>每月刚性支出（房租/吃饭/还款等，元）</span>\n      <input id=\"em-exp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"9000\"></label>\n    <label class=\"f\"><span>收入稳定性</span>\n      <select id=\"em-stab\">\n        <option value=\"steady\">稳定（编制/大厂老员工）</option>\n        <option value=\"normal\" selected>一般（普通上班族）</option>\n        <option value=\"risky\">波动（提成/自由职业/创业）</option>\n      </select></label>\n    <label class=\"f\"><span>有没有房贷/车贷</span>\n      <select id=\"em-loan\">\n        <option value=\"1\" selected>有</option>\n        <option value=\"0\">没有</option>\n      </select></label>\n    <label class=\"f\"><span>要不要养娃或赡养老人</span>\n      <select id=\"em-kid\">\n        <option value=\"1\" selected>有</option>\n        <option value=\"0\">没有</option>\n      </select></label>\n    <label class=\"f\"><span>手上已备了多少（元）</span>\n      <input id=\"em-have\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\"></label>\n    <label class=\"f\"><span>每月还能存多少（元）</span>\n      <input id=\"em-save\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"3000\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">应急金该备到</span><strong id=\"em-target\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>备几个月</span><b id=\"em-months\">—</b></li>\n      <li><span>现在还差</span><b id=\"em-gap\">—</b></li>\n      <li><span>现在的钱能撑</span><b id=\"em-cover\">—</b></li>\n      <li><span>按每月存要几个月补上</span><b id=\"em-need\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>若每月存</th><th>补足缺口要几个月</th><th>那时可撑</th></tr></thead>\n        <tbody id=\"em-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"em-note\"></p>\n  </div>\n    </div>\n  </section>\n","rule503020":"  <section class=\"panel\" id=\"panel-rule503020\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>税后月收入（元）</span>\n      <input id=\"rg-inc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\"></label>\n    <label class=\"f\"><span>必需支出（房子/吃饭/交通/水电/还债，元）</span>\n      <input id=\"rg-need\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"12000\"></label>\n    <label class=\"f\"><span>可选支出（娱乐/购物/订阅/旅游，元）</span>\n      <input id=\"rg-want\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"4000\"></label>\n    <label class=\"f\"><span>储蓄与投资（含提前还贷，元）</span>\n      <input id=\"rg-save\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"4000\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">储蓄率</span><strong id=\"rg-saverate\">—</strong><span class=\"unit\">%</span></div>\n    <ul class=\"kv\">\n      <li><span>必需支出占比（基准 50%）</span><b id=\"rg-needp\">—</b></li>\n      <li><span>可选支出占比（基准 30%）</span><b id=\"rg-wantp\">—</b></li>\n      <li><span>储蓄占比（基准 20%）</span><b id=\"rg-savep\">—</b></li>\n      <li><span>必需支出超出基准</span><b id=\"rg-cut\">—</b></li>\n      <li><span>按现在的支出结构，收入要到</span><b id=\"rg-incneed\">—</b></li>\n      <li><span>未分配到任何一档的钱</span><b id=\"rg-left\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>分类</th><th>你的金额</th><th>你的占比</th><th>基准</th><th>差</th><th>基准金额</th></tr></thead>\n        <tbody id=\"rg-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"rg-note\"></p>\n  </div>\n    </div>\n  </section>\n","bundle":"  <section class=\"panel\" id=\"panel-bundle\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：家庭每月开支</h2>\n        <label class=\"f\"><span>本人每月税后收入</span><input id=\"bxsp-inc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"30000\"></label>\n        <label class=\"f\"><span>另一半每月税后收入（共同开销就填上）</span><input id=\"bxsp-inc2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"0\"></label>\n        <label class=\"f\"><span>住（房贷/租金+物业）</span><input id=\"bxsp-house\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"7000\"></label>\n        <label class=\"f\"><span>教育（学费+辅导）</span><input id=\"bxsp-edu\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"3000\"></label>\n        <label class=\"f\"><span>保险（纯保障+储蓄型）</span><input id=\"bxsp-ins\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"1500\"></label>\n        <label class=\"f\"><span>交通（车贷+油+打车）</span><input id=\"bxsp-car\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"2000\"></label>\n        <label class=\"f\"><span>餐饮日用</span><input id=\"bxsp-food\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"4500\"></label>\n        <label class=\"f\"><span>其他（医疗/人情/娱乐）</span><input id=\"bxsp-other\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"3000\"></label>\n        <label class=\"f\"><span>每月定投/储蓄（转出）</span><input id=\"bxsp-save\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"3000\"></label>\n        <label class=\"f\"><span>目标储蓄率（%）</span><input id=\"bxsp-goal\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"80\" step=\"1\" value=\"25\"></label>\n        <em>这是把「房贷、养娃、保险、养车、日常」放在一张表里看结构。各项的数字都可以到对应模块里先单独算准再填进来。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果</h2>\n        <div class=\"big\"><span class=\"k\">每月总支出</span><strong id=\"bxsp-big\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>家庭合计收入</span><b id=\"bxsp-inall\">—</b></li>\n          <li><span>每月结余</span><b id=\"bxsp-left\">—</b></li>\n          <li><span>实际储蓄率</span><b id=\"bxsp-rate\">—</b></li>\n          <li><span>全年可存</span><b id=\"bxsp-year\">—</b></li>\n          <li><span>最大头</span><b id=\"bxsp-top\">—</b></li>\n          <li><span>超参考区间的项</span><b id=\"bxsp-over\">—</b></li>\n          <li><span>最该先改的（偏离≥5 个点）</span><b id=\"bxsp-worst\">—</b></li>\n          <li><span>储蓄＋结余</span><b id=\"bxsp-sv\">—</b></li>\n          <li><span>结构评分</span><b id=\"bxsp-score\">—</b></li>\n        </ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">类别</th><th>金额</th><th>占收入</th><th>参考区间</th><th>判断</th></tr></thead>\n            <tbody id=\"bxsp-body\"></tbody>\n          </table>\n        </div>\n        <h2 class=\"sub\">想细算就去这几个模块</h2>\n        <p class=\"hint\" id=\"bxsp-links\"></p>\n        <p class=\"hint\" id=\"bxsp-note\"></p>\n      </div>\n    </div>\n  </section>\n","monthly":"  <section class=\"panel\" id=\"panel-monthly\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：每月支出</h2>\n        <label class=\"f\"><span>每月税后收入（月均模式下用这个）</span><input id=\"mt-inc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\"></label>\n        <label class=\"f\"><span>收入怎么填</span><select id=\"mt-mode\">\n          <option value=\"avg\">按月均收入平摊（简单）</option>\n          <option value=\"monthly\">逐月填真实到手（有年终奖/调薪时用）</option>\n        </select></label>\n        <div id=\"mt-incbox\" hidden>\n          <h2 class=\"sub\">12 个月的真实收入</h2>\n          <span class=\"row\"><input id=\"mt-i1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\" aria-label=\"1月收入\"><input id=\"mt-i2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\" aria-label=\"2月收入\"></span>\n          <span class=\"row\"><input id=\"mt-i3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\" aria-label=\"3月收入\"><input id=\"mt-i4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\" aria-label=\"4月收入\"></span>\n          <span class=\"row\"><input id=\"mt-i5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\" aria-label=\"5月收入\"><input id=\"mt-i6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\" aria-label=\"6月收入\"></span>\n          <span class=\"row\"><input id=\"mt-i7\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\" aria-label=\"7月收入\"><input id=\"mt-i8\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\" aria-label=\"8月收入\"></span>\n          <span class=\"row\"><input id=\"mt-i9\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\" aria-label=\"9月收入\"><input id=\"mt-i10\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\" aria-label=\"10月收入\"></span>\n          <span class=\"row\"><input id=\"mt-i11\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\" aria-label=\"11月收入\"><input id=\"mt-i12\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"26000\" aria-label=\"12月收入\"></span>\n        </div>\n        <h2 class=\"sub\">12 个月的支出（从 1 月到 12 月）</h2>\n        <span class=\"row\"><input id=\"mt-m1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"18000\" aria-label=\"1月支出\"><input id=\"mt-m2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"19500\" aria-label=\"2月支出\"></span>\n        <span class=\"row\"><input id=\"mt-m3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"21000\" aria-label=\"3月支出\"><input id=\"mt-m4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"17600\" aria-label=\"4月支出\"></span>\n        <span class=\"row\"><input id=\"mt-m5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"22300\" aria-label=\"5月支出\"><input id=\"mt-m6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"19800\" aria-label=\"6月支出\"></span>\n        <span class=\"row\"><input id=\"mt-m7\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"18500\" aria-label=\"7月支出\"><input id=\"mt-m8\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"20200\" aria-label=\"8月支出\"></span>\n        <span class=\"row\"><input id=\"mt-m9\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"19100\" aria-label=\"9月支出\"><input id=\"mt-m10\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"18700\" aria-label=\"10月支出\"></span>\n        <span class=\"row\"><input id=\"mt-m11\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"20500\" aria-label=\"11月支出\"><input id=\"mt-m12\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"23800\" aria-label=\"12月支出\"></span>\n        <em>只填支出就够了——收入按月平摊。有年终奖、调薪、奖金月，就切到「逐月填真实到手」。支出可以照银行 App 的月度账单抄。</em>\n        <h2 class=\"sub\">全年支出的分类（可不填，用于看结构）</h2>\n        <label class=\"f\"><span>住（房贷/房租/物业）</span><input id=\"mt-c1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"84000\"></label>\n        <label class=\"f\"><span>吃（餐饮/日用/超市）</span><input id=\"mt-c2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"54000\"></label>\n        <label class=\"f\"><span>教育（学费/培训）</span><input id=\"mt-c3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"36000\"></label>\n        <label class=\"f\"><span>保险</span><input id=\"mt-c4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"18000\"></label>\n        <label class=\"f\"><span>交通（车/打车/油）</span><input id=\"mt-c5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"24000\"></label>\n        <label class=\"f\"><span>其他（医疗/人情/娱乐）</span><input id=\"mt-c6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"23000\"></label>\n        <p class=\"btnrow\"><button class=\"ghost\" type=\"button\" id=\"mt-csv\">导出这 12 个月 CSV</button></p>\n      </div>\n      <div class=\"card res\">\n        <h2>结果</h2>\n        <div class=\"big\"><span class=\"k\">全年结余</span><strong id=\"mt-big\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>全年收入</span><b id=\"mt-in\">—</b></li>\n          <li><span>月均收入</span><b id=\"mt-inavg\">—</b></li>\n          <li><span>全年支出</span><b id=\"mt-out\">—</b></li>\n          <li><span>月均支出</span><b id=\"mt-avg\">—</b></li>\n          <li><span>储蓄率</span><b id=\"mt-rate\">—</b></li>\n          <li><span>花得最多的月</span><b id=\"mt-max\">—</b></li>\n          <li><span>花得最少的月</span><b id=\"mt-min\">—</b></li>\n          <li><span>支出波动</span><b id=\"mt-gap\">—</b></li>\n          <li><span>结余为负的月数</span><b id=\"mt-neg\">—</b></li>\n          <li><span>最长连续为负</span><b id=\"mt-streak\">—</b></li>\n        </ul>\n        <canvas id=\"mt-chart\" width=\"720\" height=\"180\" aria-label=\"每月支出柱状图\"></canvas>\n        <h2 class=\"sub\">全年支出结构</h2>\n        <canvas id=\"mt-cat-chart\" width=\"720\" height=\"120\" aria-label=\"支出结构堆叠条\"></canvas>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">类别</th><th>全年</th><th>占比</th><th>折合每月</th></tr></thead>\n            <tbody id=\"mt-cat-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"mt-cat-note\"></p>\n                  <p class=\"jump\" id=\"mt-links\"></p>\n<details class=\"mtg\">\n          <summary>逐月记 6 类（72 格，可选；填了就用真实数据画月度结构）</summary>\n          <p class=\"mtgact\"><button class=\"ghost sm\" type=\"button\" id=\"mtg-fill\">按上面 6 类的占比，一键摊平这 72 格</button>\n            <span class=\"hint\">摊平后每行合计＝该月支出，再按实际改几格就行。</span></p>\n          <div class=\"tablebox\">\n            <table class=\"grid\">\n              <thead><tr><th class=\"tal\">月份</th><th>住</th><th>吃</th><th>教育</th><th>保险</th><th>交通</th><th>其他</th></tr></thead>\n              <tbody id=\"mtg-body\">\n            <tr><td class=\"tal\">1月</td><td><input id=\"mtg-1-1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-1-2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-1-3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-1-4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-1-5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-1-6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td></tr>\n            <tr><td class=\"tal\">2月</td><td><input id=\"mtg-2-1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-2-2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-2-3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-2-4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-2-5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-2-6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td></tr>\n            <tr><td class=\"tal\">3月</td><td><input id=\"mtg-3-1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-3-2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-3-3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-3-4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-3-5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-3-6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td></tr>\n            <tr><td class=\"tal\">4月</td><td><input id=\"mtg-4-1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-4-2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-4-3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-4-4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-4-5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-4-6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td></tr>\n            <tr><td class=\"tal\">5月</td><td><input id=\"mtg-5-1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-5-2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-5-3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-5-4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-5-5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-5-6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td></tr>\n            <tr><td class=\"tal\">6月</td><td><input id=\"mtg-6-1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-6-2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-6-3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-6-4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-6-5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-6-6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td></tr>\n            <tr><td class=\"tal\">7月</td><td><input id=\"mtg-7-1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-7-2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-7-3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-7-4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-7-5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-7-6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td></tr>\n            <tr><td class=\"tal\">8月</td><td><input id=\"mtg-8-1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-8-2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-8-3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-8-4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-8-5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-8-6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td></tr>\n            <tr><td class=\"tal\">9月</td><td><input id=\"mtg-9-1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-9-2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-9-3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-9-4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-9-5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-9-6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td></tr>\n            <tr><td class=\"tal\">10月</td><td><input id=\"mtg-10-1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-10-2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-10-3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-10-4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-10-5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-10-6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td></tr>\n            <tr><td class=\"tal\">11月</td><td><input id=\"mtg-11-1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-11-2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-11-3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-11-4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-11-5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-11-6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td></tr>\n            <tr><td class=\"tal\">12月</td><td><input id=\"mtg-12-1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-12-2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-12-3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-12-4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-12-5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td><td><input id=\"mtg-12-6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"0\"></td></tr>\n              </tbody>\n            </table>\n          </div>\n          <p class=\"hint\" id=\"mtg-note\"></p>\n        </details>\n        <h2 class=\"sub\">按月的支出结构（按各月支出占比摊算）</h2>\n        <canvas id=\"mt-stack-chart\" width=\"720\" height=\"210\" aria-label=\"每月支出结构堆叠图\"></canvas>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">月份</th><th>支出</th><th>当月结余</th><th>累计结余</th></tr></thead>\n            <tbody id=\"mt-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"mt-note\"></p>\n      </div>\n    </div>\n  </section>\n","yearcmp":"  <section class=\"panel\" id=\"panel-yearcmp\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：多年度对比（最多 5 年，留 0 表示没有这一年）</h2>\n        <h2 class=\"sub\">第 1 年（最早）</h2>\n        <label class=\"f\"><span>年收入（税后）</span><input id=\"yc-inc1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"250000\"></label>\n        <label class=\"f\"><span>年支出</span><input id=\"yc-out1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"232000\"></label>\n        <label class=\"f\"><span>年末资产（不含自住房）</span><input id=\"yc-asset1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"150000\"></label>\n        <h2 class=\"sub\">第 2 年</h2>\n        <label class=\"f\"><span>年收入（税后）</span><input id=\"yc-inc2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"268000\"></label>\n        <label class=\"f\"><span>年支出</span><input id=\"yc-out2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"241000\"></label>\n        <label class=\"f\"><span>年末资产（不含自住房）</span><input id=\"yc-asset2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"205000\"></label>\n        <h2 class=\"sub\">第 3 年</h2>\n        <label class=\"f\"><span>年收入（税后）</span><input id=\"yc-inc3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"240000\"></label>\n        <label class=\"f\"><span>年支出</span><input id=\"yc-out3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"239000\"></label>\n        <label class=\"f\"><span>年末资产（不含自住房）</span><input id=\"yc-asset3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"350000\"></label>\n        <h2 class=\"sub\">第 4 年</h2>\n        <label class=\"f\"><span>年收入（税后）</span><input id=\"yc-inc4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"288000\"></label>\n        <label class=\"f\"><span>年支出</span><input id=\"yc-out4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"262000\"></label>\n        <label class=\"f\"><span>年末资产（不含自住房）</span><input id=\"yc-asset4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"412000\"></label>\n        <h2 class=\"sub\">第 5 年（最近）</h2>\n        <label class=\"f\"><span>年收入（税后）</span><input id=\"yc-inc5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"312000\"></label>\n        <label class=\"f\"><span>年支出</span><input id=\"yc-out5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"275000\"></label>\n        <label class=\"f\"><span>年末资产（不含自住房）</span><input id=\"yc-asset5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"520000\"></label>\n        <h2 class=\"sub\">目标反推（可选）</h2>\n        <label class=\"f\"><span>想在几年后把金融资产做到（元）</span><input id=\"yc-target\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50000\" value=\"1000000\"></label>\n        <label class=\"f\"><span>还剩几年</span><input id=\"yc-years\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"40\" step=\"1\" value=\"5\"></label>\n        <em>资产填「不含自住房的金融资产＋投资房」，看的是能生钱的那部分。收入用税后到手，和自己的银行卡对得上。想比 2 年就把后面几年填 0；目标反推不填也能用。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果</h2>\n        <div class=\"big\"><span class=\"k\">资产总增长</span><strong id=\"yc-big\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>收入年均增长（CAGR）</span><b id=\"yc-inccagr\">—</b></li>\n          <li><span>支出年均增长（CAGR）</span><b id=\"yc-outcagr\">—</b></li>\n          <li><span>资产年均增长（CAGR）</span><b id=\"yc-assetcagr\">—</b></li>\n          <li><span>收入增幅（最近一年）</span><b id=\"yc-incg\">—</b></li>\n          <li><span>支出增幅（最近一年）</span><b id=\"yc-outg\">—</b></li>\n          <li><span>结余（最早 → 最近）</span><b id=\"yc-left\">—</b></li>\n          <li><span>储蓄率（最早 → 最近）</span><b id=\"yc-rate\">—</b></li>\n          <li><span>资产增加 vs 累计结余</span><b id=\"yc-gap\">—</b></li>\n          <li><span>最好 / 最差的一年</span><b id=\"yc-best\">—</b></li>\n          <li><span>哪一项最该管</span><b id=\"yc-focus\">—</b></li>\n        </ul>\n        <canvas id=\"yc-chart\" width=\"720\" height=\"200\" aria-label=\"收入支出资产趋势图\"></canvas>\n        <p class=\"hint\" id=\"yc-goal\"></p>\n        <p class=\"hint\" id=\"yc-forecast\"></p>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">年份</th><th>收入</th><th>支出</th><th>结余</th><th>储蓄率</th><th>资产</th></tr></thead>\n            <tbody id=\"yc-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"yc-note\"></p>\n      </div>\n    </div>\n  </section>\n","yearreport":"  <section class=\"panel\" id=\"panel-yearreport\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：这一年的四个数</h2>\n        <label class=\"f\"><span>全年收入（税后）</span><input id=\"yrp-inc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"300000\"></label>\n        <label class=\"f\"><span>全年支出</span><input id=\"yrp-out\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"260000\"></label>\n        <label class=\"f\"><span>年初金融资产</span><input id=\"yrp-a0\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"350000\"></label>\n        <label class=\"f\"><span>年末金融资产</span><input id=\"yrp-a1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"460000\"></label>\n        <label class=\"f\"><span>手上的现金（活期＋货基）</span><input id=\"yrp-cash\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"60000\"></label>\n        <label class=\"f\"><span>负债余额（房贷＋其他）</span><input id=\"yrp-debt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\"></label>\n        <label class=\"f\"><span>自住房市值（没有填 0）</span><input id=\"yrp-house\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50000\" value=\"1800000\"></label>\n        <h2 class=\"sub\">想和上一年比？填这三个（不填就跳过）</h2>\n        <label class=\"f\"><span>上一年收入</span><input id=\"yrp-pinc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"0\"></label>\n        <label class=\"f\"><span>上一年支出</span><input id=\"yrp-pout\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"0\"></label>\n        <label class=\"f\"><span>上一年年末金融资产</span><input id=\"yrp-pa1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"0\"></label>\n        <p class=\"btnrow\"><button class=\"ghost\" type=\"button\" id=\"yrp-print\">打印 / 存成 PDF</button></p>\n        <em>一页纸年报，拿去给家里人看的版本。数据全部来自你自己填的四个数，不联网、不上传。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>这一年过得怎么样</h2>\n        <div class=\"big\"><span class=\"k\">净资产</span><strong id=\"yrp-big\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>储蓄率</span><b id=\"yrp-rate\">—</b></li>\n          <li><span>金融资产增长</span><b id=\"yrp-ag\">—</b></li>\n          <li><span>结余 vs 资产增加</span><b id=\"yrp-gap\">—</b></li>\n          <li><span>负债率（含自住房）</span><b id=\"yrp-lev\">—</b></li>\n          <li><span>现金能撑几个月</span><b id=\"yrp-emg\">—</b></li>\n          <li><span>综合评级</span><b id=\"yrp-grade\">—</b></li>\n          <li><span>和上一年比</span><b id=\"yrp-cmp\">—</b></li>\n        </ul>\n        <h2 class=\"sub\">这几年的走势（取自「年度对比」已填的数）</h2>\n        <canvas id=\"yrp-chart1\" width=\"720\" height=\"180\" aria-label=\"多年度收入支出资产趋势\"></canvas>\n        <h2 class=\"sub\">支出结构（取自「12 个月小结」已填的分类）</h2>\n        <canvas id=\"yrp-chart2\" width=\"720\" height=\"110\" aria-label=\"支出结构条\"></canvas>\n        <p class=\"hint\" id=\"yrp-charts-note\"></p>\n        <h2 class=\"sub\">年报正文</h2>\n        <div id=\"yrp-text\" class=\"yrptext\"></div>\n        <p class=\"hint\" id=\"yrp-note\"></p>\n      </div>\n    </div>\n  </section>\n"};
export default { edu: calcEdu, insure: calcInsure, balance: calcBalance, checkup: calcCheckup, cashflow: calcCashflow, riskalloc: calcRiskAlloc, fire: calcFire, annualfee: calcAnnualFee, childcost: calcChild, emergency: calcEmergency, rule503020: calcRule, report: calcReport, planner: calcPlanner, bundle: calcBundle, monthly: calcMonthly, yearcmp: calcYearCmp, yearreport: calcYearReport };
