/* 自动生成，勿手改：acct-report2 分类模块（点开才下载） */
const { $, BUILD_TAG, CAT_KEY, CAT_LABEL, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, EDITED, ERR_BOX, FAV_KEY, FIELDS, FIRST_ACTIVATE, KEY, LAST_KEY, MONTH_CATS, MONTH_TABLE, NEXT_OF, PALETTE_EL, PENDING_PARAMS, PRE_KEY, QUOTA_WARNED, RECENT_KEY, SAVE_TIMER, SEARCH_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, TOAST_EL, UNITS, WF_DONE, WF_KEY, WF_MAN, WF_MAN_KEY, XL_ROWS, YEAR_TABLE, _onPanels, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, buildTabBadges, calcLoan, calcMap, clearWfMan, closePalette, cmpTabName, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, diagText, dlJson, doPrint, drawMonthCats, drawMonthStack, drawReportCharts, drawRpMini, drawnMonthlyChart, drawnYearChart, enhanceNums, enhancePanelUi, ensureChunk, evalExpr, favList, fillCmpMod, fillMonthGrid, fillUnits, flash, flushParams, flushSave, fmt, fmtAt, fmtDate, fx, gauss, getWfDone, getWfMan, hashTarget, isFav, lastName, leftAfter, linkTo, loadCmpA, loadSnaps, loadWfDone, loadWfMan, loanRows, makeSnap, markBadInputs, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numBlur, numFocus, numInput, numKey, numOf, openPalette, palKey, panelEls, panelParams, parseAmounts, parseDate, parseNum, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, prePanels, presets, printCover, pushRecent, pushSearch, quickOf, rateOf, readJsonFile, readMonthGrid, recentList, recordWf, refreshCounts, refreshTableTools, refreshTrackMods, refreshWfBadge, renderLoanTable, renderNext, renderPalette, renderPresets, renderSearchHist, renderSnapCompare, renderSnapList, renderTrack, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, scrollResultIfDeepLink, searchHist, setCat, setSub, setTheme, showErrorBox, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tabCatLabel, tap, taxBy, toast, toggleWfMan, trimNum, unitFor, updShown, wfManSave, wfSave, yuan, zOf } = window.FC;

  function calcFeeTrend() {
    var revs = [], fees = [], i;
    for (i = 1; i <= 6; i++) {
      revs.push(Math.max(0, num($("tr-r" + i), 0)));
      fees.push(Math.max(0, num($("tr-f" + i), 0)));
    }
    var rates = [], valid = [];
    for (i = 0; i < 6; i++) {
      var rr = revs[i] > 0 ? fees[i] / revs[i] : NaN;
      rates.push(rr);
      if (isFinite(rr)) valid.push(rr);
    }
    var sumR = 0, sumF = 0, lastIdx = -1, firstIdx = -1;
    for (i = 0; i < 6; i++) {
      sumR += revs[i]; sumF += fees[i];
      if (revs[i] > 0) { if (firstIdx < 0) firstIdx = i; lastIdx = i; }
    }
    var avgRate = sumR > 0 ? sumF / sumR : NaN;
    var nowRate = lastIdx >= 0 ? rates[lastIdx] : NaN;
    var baseRate = firstIdx >= 0 ? rates[firstIdx] : NaN;

    var feeGrow = (firstIdx >= 0 && fees[firstIdx] > 0) ? fees[lastIdx] / fees[firstIdx] - 1 : NaN;
    var revGrow = (firstIdx >= 0 && revs[firstIdx] > 0) ? revs[lastIdx] / revs[firstIdx] - 1 : NaN;
    var syncFee = (firstIdx >= 0 && revs[firstIdx] > 0) ? fees[firstIdx] * revs[lastIdx] / revs[firstIdx] : NaN;
    var over = isFinite(syncFee) ? fees[lastIdx] - syncFee : NaN;

    var cnt = 0;
    for (i = 0; i < 6; i++) if (isFinite(rates[i]) && isFinite(baseRate) && rates[i] > baseRate + 1e-9) cnt++;

    $("tr-now").textContent = isFinite(nowRate) ? pct(nowRate, 2) : "—";
    $("tr-avg").textContent = isFinite(avgRate) ? pct(avgRate, 2) : "—";
    $("tr-sums").textContent = money(sumF) + " / " + money(sumR) + " 元";
    $("tr-growth").textContent = (isFinite(feeGrow) ? pct(feeGrow, 2) : "—") + " / " + (isFinite(revGrow) ? pct(revGrow, 2) : "—");
    $("tr-sync").textContent = isFinite(syncFee) ? money(syncFee) + " 元" : "—";
    $("tr-over").textContent = isFinite(over) ? (over >= 0 ? "+" : "-") + money(Math.abs(over)) + " 元" : "—";
    $("tr-cnt").textContent = cnt + " / 6 期";

    var verdict;
    if (!isFinite(feeGrow) || !isFinite(revGrow)) verdict = "数据不足，至少填两期收入";
    else if (feeGrow > revGrow + 0.02) verdict = "警惕：费用涨得比收入快 " + pct(feeGrow - revGrow, 2) + "，费用率在往上走";
    else if (feeGrow > revGrow + 0.005) verdict = "略偏快：费用涨得比收入快 " + pct(feeGrow - revGrow, 2) + "，费用率小幅上移，盯住下一期";
    else if (revGrow > feeGrow + 0.02) verdict = "健康：收入涨得比费用快 " + pct(revGrow - feeGrow, 2) + "，规模效应在显现";
    else verdict = "基本同步：费用与收入增速接近，费用率稳定";
    $("tr-verdict").textContent = verdict;

    var html = "", prev = NaN;
    for (i = 0; i < 6; i++) {
      var delta = (isFinite(rates[i]) && isFinite(prev)) ? rates[i] - prev : NaN;
      var dText = isFinite(delta) ? (delta >= 0 ? "+" : "-") + fmt(Math.abs(delta) * 100, 2) + " 个点" : "—";
      var warn = (isFinite(rates[i]) && isFinite(baseRate) && rates[i] > baseRate + 1e-9) ? ' class="c-warn"' : "";
      html += "<tr" + warn + "><td>第 " + (i + 1) + " 期</td><td>" + money(revs[i]) + "</td><td>" + money(fees[i]) +
        "</td><td>" + (isFinite(rates[i]) ? pct(rates[i], 2) : "—") + "</td><td>" + dText + "</td></tr>";
      if (isFinite(rates[i])) prev = rates[i];
    }
    html += "<tr><td><b>合计 / 平均</b></td><td><b>" + money(sumR) + "</b></td><td><b>" + money(sumF) + "</b></td><td><b>" +
      (isFinite(avgRate) ? pct(avgRate, 2) : "—") + "</b></td><td>—</td></tr>";
    $("tr-body").innerHTML = html;

    $("tr-note").textContent =
      " 看费用只看一个比值：费用率（三费 ÷ 收入）。费用绝对额涨不一定是问题，收入涨得更快就没问题；" +
      "收入不动费用还涨，才是真问题。本例费用涨 " + pct(feeGrow, 2) + "、收入涨 " + pct(revGrow, 2) +
      "，按收入增速同步算应该只花 " + money(syncFee) + " 元，实际多花 " + money(Math.abs(over)) + " 元。" +
      " 拆费用要看结构而不是总额：销售费用涨通常是主动投入（要问「带来了多少新客/订单」），管理费用涨多是刚性（人头、房租、系统），" +
      "财务费用涨看的是有息负债和利率。哪一类涨得最快，责任人和对策完全不同。" +
      " 提醒两个口径：① 三费＝销售＋管理＋财务，研发费用如果单列就别重复加；② 比较时期间要一致，月度比月度、累计比累计，" +
      "季末集中报销和年终奖计提会让单月费用率虚高，最好同时看滚动 12 个月（TTM）费用率。";
  }

  function calcContractPerf() {
    var price = num($("cfe-price"), 0), cost = num($("cfe-cost"), 0), actual = num($("cfe-actual"), 0);
    var billed = num($("cfe-billed"), 0), cash = num($("cfe-cash"), 0);
    if (price <= 0 || cost <= 0) {
      $("cfe-big").textContent = "—"; $("cfe-rev").textContent = "—"; $("cfe-gp").textContent = "—";
      $("cfe-rate").textContent = "—"; $("cfe-asset").textContent = "—"; $("cfe-ar").textContent = "—";
      $("cfe-left").textContent = "—"; $("cfe-note").textContent = "合同总价和预计总成本都要大于 0。";
      return;
    }
    var prog = Math.min(1, Math.max(0, actual / cost));
    var rev = price * prog, gp = rev - actual;
    var bal = rev - billed, ar = billed - cash;
    var leftRev = price - rev, leftCost = Math.max(0, cost - actual);
    $("cfe-big").textContent = fmt(prog * 100, 2);
    $("cfe-rev").textContent = money(rev) + " 元";
    $("cfe-gp").textContent = money(gp) + " 元";
    $("cfe-rate").textContent = rev > 0 ? pct(gp / rev, 2) : "—";
    $("cfe-asset").textContent = bal >= 0 ? "合同资产 " + money(bal) + " 元" : "合同负债 " + money(-bal) + " 元";
    $("cfe-ar").textContent = money(ar) + " 元";
    $("cfe-left").textContent = money(leftRev) + " / " + money(leftCost) + " 元";
    var warn = cost > price ? "⚠ 预计总成本已经超过合同总价，这是亏损合同，要立刻确认预计损失 " + money(cost - price) + " 元，不能等完工。"
      : "进度是按成本投入比推的，前提是「成本花得多就干得多」。";
    $("cfe-note").textContent = warn
      + "合同资产和应收账款要分开看：已经确认收入但还没到结算节点的是合同资产（有履约风险），"
      + "已经开票的是应收（有信用风险）。已开票小于已确认收入，说明进度跑在结算前面，现金流会吃紧；"
      + "反过来结算跑在前面就是合同负债。变更、索赔、奖励款只有在「很可能收到且能可靠计量」时才计入合同价。";
  }

  function calcProjRev() {
    var rev = num($("prj-rev"), 0), cost = num($("prj-cost"), 0), actual = num($("prj-actual"), 0);
    var prior = num($("prj-prior"), 0), pcost = num($("prj-pcost"), 0), billed = num($("prj-billed"), 0);
    if (rev <= 0 || cost <= 0) {
      $("prj-big").textContent = "—"; $("prj-pct").textContent = "—"; $("prj-cum").textContent = "—";
      $("prj-cst").textContent = "—"; $("prj-gp").textContent = "—"; $("prj-asset").textContent = "—";
      $("prj-left").textContent = "—"; $("prj-done").textContent = "—";
      $("prj-note").textContent = "合同总收入和预计总成本都要大于 0。";
      return;
    }
    var pctDone = Math.min(1, Math.max(0, actual / cost));
    var cum = rev * pctDone, period = cum - prior;
    var pc = Math.max(0, actual - pcost);
    var gpPeriod = period - pc, gpCum = cum - actual;
    var asset = cum - billed, leftCost = Math.max(0, cost - actual);
    $("prj-big").textContent = money(period);
    $("prj-pct").textContent = pct(pctDone, 2);
    $("prj-cum").textContent = money(cum) + " 元";
    $("prj-cst").textContent = money(pc) + " 元";
    $("prj-gp").textContent = money(gpPeriod) + " / " + money(gpCum) + " 元";
    $("prj-asset").textContent = asset >= 0 ? money(asset) + " 元" : "合同负债 " + money(-asset) + " 元";
    $("prj-left").textContent = money(leftCost) + " 元";
    $("prj-done").textContent = "按完成合同法本期确认 0，差 " + money(period) + " 元收入往后推";
    $("prj-note").textContent = "建造合同、工程、定制软件这类「在客户场地上造、别人拿去没用」的项目，"
      + "只要履约进度能可靠计量，就必须按进度确认收入，不能等验收一次性确认（那是旧准则的做法）。"
      + " 进度用「累计已发生成本 ÷ 预计总成本」最常用，但前提是成本与履约进度基本同步；"
      + " 如果材料一次投入很多（比如钢结构、设备到货即入成本），投入法会高估进度，这时该用「已完成的工程量/工作量」或「已施工天数」。"
      + " 预计总成本要随项目滚动更新，一旦预计总成本超过合同收入，差额要立即全额确认预计损失。"
      + " 已结算小于已确认收入的部分是合同资产，不是应收，别混在应收账款里做坏账计提。";
  }

  function calcFxTranslate() {
    var asset = num($("fxt-asset"), 0), liab = num($("fxt-liab"), 0);
    var cap = num($("fxt-cap"), 0), ret0 = num($("fxt-ret0"), 0), np = num($("fxt-np"), 0);
    var close = num($("fxt-close"), 0), avg = num($("fxt-avg"), 0);
    var his = num($("fxt-his"), 0), open = num($("fxt-open"), 0);
    var A = asset * close, L = liab * close, C = cap * his, N = np * avg, R0 = ret0 * open;
    var R1 = R0 + N;
    var equity = C + R1;
    var diff = (A - L) - equity;
    $("fxt-big").textContent = money(diff);
    $("fxt-a").textContent = money(A) + " 万元（@" + close + "）";
    $("fxt-l").textContent = money(L) + " 万元（@" + close + "）";
    $("fxt-c").textContent = money(C) + " 万元（@" + his + "）";
    $("fxt-r").textContent = money(R1) + " 万元（期初 " + money(R0) + " ＋ 净利 " + money(N) + "）";
    $("fxt-n").textContent = money(N) + " 万元（@" + avg + "）";
    $("fxt-rel").textContent = equity !== 0 ? pct(diff / Math.abs(equity), 2) : "—";
    $("fxt-note").textContent = (diff >= 0 ? "差额为正，计入其他综合收益（权益增加）" : "差额为负，计入其他综合收益（权益减少）")
      + "，不进当期利润。汇率规则：资产和负债用期末汇率，实收资本用出资当天历史汇率（以后不再变），"
      + "利润表项目用平均汇率或交易日汇率，挤不平的差额就是「外币报表折算差额」。"
      + " 这套是境外经营的折算；如果是境内企业自己持有外币货币性项目，汇兑差额走当期损益（财务费用），不是其他综合收益。"
      + " 处置这家境外子公司时，累计的折算差额要全部转入当期损益。";
  }

  function calcAccrual() {
    var rent = num($("acr-rent"), 0), mon = Math.min(12, Math.max(0, num($("acr-mon"), 0)));
    var ins = num($("acr-ins"), 0), nf = num($("acr-nofpiao"), 0);
    var tax = num($("acr-tax"), 0) / 100, get = $("acr-get").value === "1";
    var rNow = rent * mon / 12, rNext = rent - rNow;
    var iNow = ins * mon / 12, iNext = ins - iNow;
    var bal = rNext + iNext + nf;
    var taxOut = get ? 0 : nf * tax;
    $("acr-big").textContent = money(bal);
    $("acr-rentout").textContent = money(rNow) + " / " + money(rNext) + " 元";
    $("acr-insout").textContent = money(iNow) + " / " + money(iNext) + " 元";
    $("acr-nf").textContent = money(nf) + " 元";
    $("acr-taxout").textContent = get
      ? "汇算清缴前补齐发票，全额扣除，无需调增"
      : "逾期未取得发票，调增 " + money(nf) + "，补税 " + money(taxOut) + " 元";
    $("acr-monout").textContent = money((rent + ins) / 12) + " 元";
    $("acr-ratio").textContent = nf > 0 ? pct((rNext + iNext) / (rNext + iNext + nf), 1) : "—";
    $("acr-note").textContent = "跨期费用的核心是「归属期」，不是「付款期」：预付的房租、保险、年费要先挂「预付账款/长期待摊费用」，"
      + "再按月摊进损益；反过来，已经发生但没付款、没取票的费用要预提，否则本年利润虚高。"
      + "税务上有个关键时间窗：汇算清缴申报截止日（次年 5 月 31 日）前取得发票，当年就能扣；"
      + "逾期未取得的必须调增，以后年度取得时再追补扣除（追补期限一般 5 年）。"
      + "本模块算出的待摊＋预提余额 " + money(bal) + " 元是资产负债表日的挂账数，"
      + "要和明细台账逐项对上，年底最容易出的差错就是「摊多了没冲平」或「预提跨年忘了冲回」。";
  }

  function calcCfConsol() {
    var poa = num($("cfc-poa"), 0), soa = num($("cfc-soa"), 0);
    var poi = num($("cfc-poi"), 0), soi = num($("cfc-soi"), 0);
    var pof = num($("cfc-pof"), 0), sof = num($("cfc-sof"), 0);
    var iin = num($("cfc-in"), 0), iinv = num($("cfc-inv"), 0);
    var raw = poa + soa + poi + soi + pof + sof;
    var oa = poa + soa - iin;
    var oi = poi + soi + iinv;
    var of = pof + sof - iinv;
    var net = oa + oi + of;
    $("cfc-big").textContent = money(net);
    $("cfc-raw").textContent = money(raw) + " 元";
    $("cfc-oa").textContent = money(oa) + " 元";
    $("cfc-oi").textContent = money(oi) + " 元";
    $("cfc-of").textContent = money(of) + " 元";
    $("cfc-eff").textContent = money(net - raw) + " 元（内部收现 " + money(iin) + " ＋ 投资抵销 " + money(iinv) + " 的两头）";
    $("cfc-tie").textContent = "合并净增加 " + money(net) + " 应与「期末货币资金 − 期初货币资金（剔除汇率影响）」相等";
    $("cfc-note").textContent = "合并现金流量表不是把几张表加总，要抵三类内部交易：① 内部销售——卖方记「销售商品收到的现金」、"
      + "买方记「购买商品支付的现金」，抵掉后集团对外的现金流才不被虚增；"
      + "② 母公司对子公司的投资——在母公司是投资流出、在子公司是吸收投资流入，必须两头同时抵销，"
      + "否则净增加额虽然不变但结构全乱；③ 内部借款与利息、内部股利分配同理。"
      + "容易漏的是跨期的：本期内部销售、下期才付款的，抵销要看现金流实际发生期间，"
      + "以及子公司少数股东部分不抵销。最后一定做勾稽：合并现金净增加额 = 合并资产负债表货币资金的变动"
      + "（有外币的要剔汇率变动影响），这里对不上，八成是抵销做错了或受限资金没剔。";
  }

  function calcLease() {
    var rent = num($("lse-rent"), 0);
    var n = Math.max(1, Math.round(num($("lse-years"), 5)));
    var r = num($("lse-rate"), 0) / 100;
    var when = $("lse-when").value === "1" ? 1 : 0;
    var pv = 0, i;
    for (i = 1; i <= n; i++) pv += rent / Math.pow(1 + r, i);
    if (when === 1) pv *= (1 + r);
    var rou = pv, dep = rou / n;
    var bal = pv, rows = [], totalInt = 0;
    for (i = 1; i <= n; i++) {
      var pay = rent;
      if (when === 1) {
        bal = bal - rent;
        var int1 = bal * r;
        totalInt += int1;
        rows.push([i, bal + rent, int1, rent, bal + int1]);
        bal = bal + int1;
      } else {
        var int2 = bal * r;
        totalInt += int2;
        var end = bal + int2 - pay;
        rows.push([i, bal, int2, pay, end]);
        bal = end;
      }
    }
    var y1int = rows[0][2];
    var expY1 = y1int + dep;
    var diff = expY1 - rent;
    $("lse-big").textContent = money(pv);
    $("lse-rou").textContent = money(rou) + " 元（按现值，另加初始直接费用）";
    $("lse-y1").textContent = money(y1int) + " / " + money(dep) + " 元";
    $("lse-exp").textContent = money(expY1) + " 元（利息＋折旧）";
    $("lse-diff").textContent = (diff >= 0 ? "首年多 " : "首年少 ") + money(Math.abs(diff)) + " 元（前高后低，全期总额相同）";
    $("lse-end").textContent = money(rows[0][4]) + " 元";
    $("lse-ebitda").textContent = "+" + money(rent) + " 元（租金从费用变利息＋折旧）";
    $("lse-body").innerHTML = rows.map(function (x) {
      return "<tr><td>" + x[0] + "</td><td>" + money(x[1]) + "</td><td>" + money(x[2]) + "</td><td>" + money(x[3]) + "</td><td>" + money(x[4]) + "</td></tr>";
    }).join("");
    $("lse-note").textContent = "新租赁准则（CAS 21，2021 年起执行）把经营租赁也搬上表：租期超过 12 个月、且不是低价值资产，"
      + "都要确认使用权资产和租赁负债，只有「短期租赁」和「低价值租赁」可以继续按直线法计入费用。"
      + "结果是前几年费用高（利息＋折旧 > 租金）、后面低，全期总额一样；同时资产和负债同时变大，"
      + "资产负债率上升、EBITDA 反而变好看——这也是很多企业报表「突然变好」的原因。"
      + "全期利息合计 " + money(totalInt) + " 元。折现率优先用租赁内含利率，拿不到才用增量借款利率。";
  }

  function calcGpmix() {
    var r1 = num($("gpm-r1"), 0), c1 = num($("gpm-c1"), 0);
    var r2 = num($("gpm-r2"), 0), c2 = num($("gpm-c2"), 0);
    var g = num($("gpm-qty"), 0) / 100;
    var gp1 = r1 - c1, gp2 = r2 - c2;
    var gm1 = r1 > 0 ? gp1 / r1 : 0, gm2 = r2 > 0 ? gp2 / r2 : 0;
    var volEff = r1 * g * gm1;
    var priceRev = r2 - r1 * (1 + g);
    var priceEff = priceRev * gm1;
    var cr1 = r1 > 0 ? c1 / r1 : 0, cr2 = r2 > 0 ? c2 / r2 : 0;
    var costEff = -r2 * (cr2 - cr1);
    var sum = volEff + priceEff + costEff;
    $("gpm-big").textContent = money(gp2 - gp1);
    $("gpm-gm").textContent = pct(gm1, 2) + " → " + pct(gm2, 2) + "（" + (gm2 >= gm1 ? "+" : "") + fmt((gm2 - gm1) * 100, 2) + " 个点）";
    $("gpm-vol").textContent = (volEff >= 0 ? "+" : "") + money(volEff) + " 元（量增 " + pct(g, 1) + " × 上年毛利）";
    $("gpm-price").textContent = (priceEff >= 0 ? "+" : "") + money(priceEff) + " 元（收入超出量增部分 " + money(priceRev) + " × 上年毛利率）";
    $("gpm-cost").textContent = (costEff >= 0 ? "+" : "") + money(costEff) + " 元（成本率 " + pct(cr1, 2) + " → " + pct(cr2, 2) + "）";
    $("gpm-sum").textContent = money(sum) + " 元（应等于毛利额变动 " + money(gp2 - gp1) + "）";
    $("gpm-px").textContent = r1 > 0 ? (priceRev >= 0 ? "涨价 " : "降价 ") + pct(Math.abs(priceRev / (r1 * (1 + g))), 2) : "—";
    $("gpm-note").textContent = "毛利率从 " + pct(gm1, 2) + " 掉到 " + pct(gm2, 2) + "，但毛利额其实是" + (gp2 - gp1 >= 0 ? "增长" : "下降") + " "
      + money(Math.abs(gp2 - gp1)) + " 元的——**毛利率下滑和毛利额下滑是两件事**，别用毛利率骂业务、也别用毛利额夸业务。"
      + "三项拆开看：卖得更多贡献 " + money(volEff) + "、卖得更贵贡献 " + money(priceEff) + "、成本率上升吃掉 " + money(costEff) + "。"
      + "如果成本率效应最大，问题在采购/工艺/产品结构（低价产品占比上升会同时压低价格和拉高成本率）；"
      + "如果价格效应为负而量在涨，多半是降价换量，要算一下边际贡献是不是真的增加。";
  }

  function calcTrialBal() {
    var d = 0, c = 0;
    for (var i = 1; i <= 8; i++) {
      d += Math.max(0, num($("tba-d" + i), 0));
      c += Math.max(0, num($("tba-c" + i), 0));
    }
    var diff = d - c;
    $("tba-debit").textContent = money(d);
    $("tba-credit").textContent = money(c);
    $("tba-big").textContent = money(Math.abs(diff));
    $("tba-dir").textContent = diff === 0 ? "—" : (diff > 0 ? "借方多" : "贷方多");
    $("tba-bal").textContent = diff === 0 ? "平" : "不平";
    $("tba-note").textContent = diff === 0
      ? "借贷平衡：借方合计 = 贷方合计 = " + money(d) + " 元。试算平不代表账一定对，漏记又补记、借贷同时错记等还是查不出，月底要再和银行对账单、往来函证核对。"
      : "不平衡，差额 " + money(Math.abs(diff)) + " 元（" + (diff > 0 ? "借方多" : "贷方多") + "）。先查三处：是不是漏录了一笔、金额有没有抄错（如 4500 写成 45000）、借贷方向有没有写反。";
  }

  function calcRollBudget() {
    var budInc = Math.max(0, num($("rbg-budinc"), 0));
    var budExp = Math.max(0, num($("rbg-budexp"), 0));
    var m = Math.min(11, Math.max(1, Math.round(num($("rbg-months"), 6))));
    var actInc = Math.max(0, num($("rbg-actinc"), 0));
    var actExp = Math.max(0, num($("rbg-actexp"), 0));
    var adj = Math.max(0, num($("rbg-adj"), 100)) / 100;
    var rem = 12 - m;
    var bAvgI = budInc / 12, bAvgE = budExp / 12;
    var finc = actInc + bAvgI * rem * adj;
    var fexp = actExp + bAvgE * rem * adj;
    var budProfit = budInc - budExp;
    var fprofit = finc - fexp;
    var incRate = budInc > 0 ? finc / budInc : 0;
    var ev = fexp - budExp;
    var needI = rem > 0 ? (budInc - actInc) / rem : 0;
    var needE = rem > 0 ? (budExp - actExp) / rem : 0;

    $("rbg-big").textContent = money(fprofit);
    $("rbg-finc").textContent = money(finc) + "（达成 " + pct(incRate, 2) + "）";
    $("rbg-fexp").textContent = money(fexp) + "（" + (ev >= 0 ? "超支 " : "节约 ") + money(Math.abs(ev)) + (budExp > 0 ? "，" + pct(ev / budExp, 2) : "") + "）";
    $("rbg-profit").textContent = money(fprofit) + "（预算 " + money(budProfit) + "，差 " + (fprofit - budProfit >= 0 ? "+" : "") + money(fprofit - budProfit) + "）";
    $("rbg-need").textContent = money(needI) + "（比预算月均高 " + pct(bAvgI > 0 ? needI / bAvgI - 1 : 0, 1) + "）";
    $("rbg-expneed").textContent = money(needE) + "（预算月均 " + money(bAvgE) + "）";

    var rows = [
      ["收入", money(budInc), money(actInc), money(bAvgI * rem * adj), money(finc)],
      ["费用", money(budExp), money(actExp), money(bAvgE * rem * adj), money(fexp)],
      ["利润", money(budProfit), money(actInc - actExp), money((bAvgI - bAvgE) * rem * adj), money(fprofit)]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 2 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td>" + rows[i][3] + "</td><td>" + rows[i][4] + "</td></tr>";
    }
    $("rbg-body").innerHTML = html;

    var tips = [];
    if (finc < budInc) tips.push("收入要追平预算，剩余 " + rem + " 个月需月均 " + money(needI) + "（当前实际月均 " + money(actInc / m) + "）");
    else tips.push("按当前预测收入可达成预算");
    if (fexp > budExp) tips.push("费用要守住预算，剩余月份需压到月均 " + money(needE));
    else tips.push("费用预计控制在预算内");
    $("rbg-note").textContent = "口径：已过 " + m + " 个月用实际数，剩余 " + rem + " 个月按全年预算月均 × 修正系数 " + pct(adj, 0) + " 外推。" + tips.join("；") + "。滚动预测是管理动作，不是审计数字，每月要更新一次实际数。";
  }

  function calcCslAdv() {
    var pinc = Math.max(0, num($("csl-pinc"), 0));
    var sinc = Math.max(0, num($("csl-sinc"), 0));
    var intra = Math.max(0, num($("csl-intra"), 0));
    var unreal = Math.max(0, num($("csl-unreal"), 0));
    var recv = Math.max(0, num($("csl-recv"), 0));
    var invest = Math.max(0, num($("csl-invest"), 0));
    var net = Math.max(0, num($("csl-net"), 0));
    var own = Math.min(100, Math.max(0, num($("csl-own"), 80))) / 100;
    var pni = Math.max(0, num($("csl-pni"), 0));
    var sni = Math.max(0, num($("csl-sni"), 0));
    var div = Math.max(0, num($("csl-div"), 0));

    var rev = pinc + sinc - intra;
    var cni = pni + sni - unreal;
    var share = net * own;
    var gw = invest - share;
    var minorPl = (sni - unreal) * (1 - own);
    var minorEq = net * (1 - own);
    var parent = cni - minorPl;

    $("csl-big").textContent = money(cni);
    $("csl-rev").textContent = money(rev) + "（母公司 " + money(pinc) + " + 子公司 " + money(sinc) + " − 内部 " + money(intra) + "）";
    $("csl-parent").textContent = money(parent);
    $("csl-minorpl").textContent = money(minorPl);
    $("csl-minoreq").textContent = money(minorEq) + "（" + pct(1 - own, 0) + " × 子公司净资产）";
    $("csl-gw").textContent = gw >= 0 ? money(gw) + "（商誉）" : money(Math.abs(gw)) + "（负商誉/营业外收入）";
    $("csl-margin").textContent = pct(rev > 0 ? cni / rev : 0, 2) + "（合并净利 ÷ 合并收入）";

    var rows = [
      ["内部销售收入", "-" + money(intra), "抵消母子之间卖货"],
      ["存货中未实现利润", "-" + money(unreal), "上游未实现，随少数股东分摊"],
      ["内部往来", "-" + money(recv), "应收应付对冲"],
      ["长投 vs 净资产份额", money(invest) + " − " + money(share), gw >= 0 ? "差额为商誉 " + money(gw) : "差额为负商誉"],
      ["内部股利", "-" + money(div), "权益法下已含在长投，不再重复确认"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td class=\"tal\">" + rows[i][2] + "</td></tr>";
    }
    $("csl-body").innerHTML = html;

    $("csl-note").textContent = "合并口径：收入/成本/往来/股利全部抵销，存货中未实现利润要从净利里挖掉——本例抵了 " + money(unreal) + "，其中少数股东摊掉 " + money(unreal * (1 - own)) + "。"
      + "长投与净资产份额的差额在非同一控制下是商誉、同一控制下走资本公积（本例按非同一控制）。净利率 " + pct(rev > 0 ? cni / rev : 0, 2) + " 是合并层面口径，别跟单体报表比。";
  }

  function calcExpCheck() {
    var total = Math.max(0, num($("ec-total"), 0));
    var special = Math.max(0, num($("ec-special"), 0));
    var vatRate = Math.max(0, num($("ec-vatrate"), 6)) / 100;
    var noTicket = Math.max(0, num($("ec-noticket"), 0));
    var receipt = Math.max(0, num($("ec-receipt"), 0));
    var over = Math.max(0, num($("ec-over"), 0));
    var personal = Math.max(0, num($("ec-personal"), 0));
    var taxRate = Math.max(0, num($("ec-tax"), 25)) / 100;

    var vat = special * vatRate;
    var adjust = noTicket + receipt + personal;
    var moreTax = adjust * taxRate;
    var ok = Math.max(0, total - noTicket - receipt - over - personal);
    var rate = total > 0 ? ok / total : 0;

    $("ec-big").textContent = money(ok);
    $("ec-rate").textContent = pct(rate, 2) + "（" + money(ok) + " ÷ " + money(total) + "）";
    $("ec-vat").textContent = money(vat) + "（专票 " + money(special) + " × " + pct(vatRate, 0) + "）";
    $("ec-adjust").textContent = money(adjust) + "（无票 + 白条 + 个人）";
    $("ec-taxamt").textContent = money(moreTax) + "（调增 × " + pct(taxRate, 0) + "）";

    var rows = [
      ["专票（可抵进项）", money(special), "进项 " + money(vat) + "，三流一致才可抵"],
      ["无发票", money(noTicket), "不能税前扣除，汇算调增"],
      ["白条 / 收据", money(receipt), "不能税前扣除，汇算调增"],
      ["超出公司标准", money(over), over > 0 ? "公司不承担则不入账；承担则调增" : "无"],
      ["个人消费", money(personal), "与经营无关，不得扣除且调增"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td class=\"tal\">" + rows[i][2] + "</td></tr>";
    }
    $("ec-body").innerHTML = html;

    $("ec-note").textContent = "合规率 " + pct(rate, 2) + "：这张单子里有 " + money(noTicket + receipt + personal) + " 不能税前扣除，要多缴所得税 " + money(moreTax) + "；"
      + (over > 0 ? "超标 " + money(over) + " 别走公司账，让个人承担或下次卡标准；" : "")
      + "无票部分能用「小额零星+收款凭证（注明姓名、身份证号、项目、金额）」顶一部分，其余尽量换专票/普票。";
  }

  function calcBudgetAlert() {
    var budInc = Math.max(0, num($("bga-budinc"), 0));
    var budExp = Math.max(0, num($("bga-budexp"), 0));
    var m = Math.min(11, Math.max(1, Math.round(num($("bga-months"), 5))));
    var actInc = Math.max(0, num($("bga-actinc"), 0));
    var actExp = Math.max(0, num($("bga-actexp"), 0));

    var time = m / 12;
    var incRate = budInc > 0 ? actInc / budInc : 0;
    var expRate = budExp > 0 ? actExp / budExp : 0;
    var incDev = incRate - time;
    var expDev = expRate - time;
    var rem = 12 - m;
    var needInc = rem > 0 ? (budInc - actInc) / rem : 0;
    var capExp = rem > 0 ? (budExp - actExp) / rem : 0;

    function light(dev, dir) {
      var a = Math.abs(dev);
      if (a >= 0.10) return "🔴 红灯（" + (dir === "收入" ? "落后" : "超支") + " ≥10 点）";
      if (a >= 0.05) return "🟡 黄灯（" + (dir === "收入" ? "落后" : "超支") + " ≥5 点）";
      return "🟢 绿灯";
    }

    $("bga-big").textContent = fmt(expRate * 100, 2);
    $("bga-inc").textContent = fmt(incRate * 100, 2) + "%（时间进度 " + fmt(time * 100, 2) + "%，偏差 " + (incDev >= 0 ? "+" : "") + fmt(incDev * 100, 2) + " 点）";
    $("bga-inclight").textContent = light(incDev, "收入");
    $("bga-explight").textContent = light(expDev, "费用");
    $("bga-needinc").textContent = money(needInc) + "（预算月均 " + money(budInc / 12) + "）";
    $("bga-capexp").textContent = money(capExp) + "（预算月均 " + money(budExp / 12) + "）";

    var rows = [
      ["收入", money(budInc), money(actInc), fmt(incRate * 100, 2) + "%", fmt(time * 100, 2) + "%", (incDev >= 0 ? "+" : "") + fmt(incDev * 100, 2) + " 点", light(incDev, "收入")],
      ["费用", money(budExp), money(actExp), fmt(expRate * 100, 2) + "%", fmt(time * 100, 2) + "%", (expDev >= 0 ? "+" : "") + fmt(expDev * 100, 2) + " 点", light(expDev, "费用")]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td>" + rows[i][3] + "</td><td>" + rows[i][4] + "</td><td>" + rows[i][5] + "</td><td class=\"tal\">" + rows[i][6] + "</td></tr>";
    }
    $("bga-body").innerHTML = html;

    var tips = [];
    if (incDev < -0.05) tips.push("收入落后时间进度，追平需剩余 " + rem + " 个月月均 " + money(needInc));
    if (expDev > 0.05) tips.push("费用跑得比时间快，剩余月份要压到月均 " + money(capExp));
    if (!tips.length) tips.push("收入与费用都在节奏内");
    $("bga-note").textContent = "执行率 = 已发生 ÷ 全年预算，对拍时间进度 " + fmt(time * 100, 2) + "%。" + tips.join("；")
      + "。费用执行率 " + fmt(expRate * 100, 2) + "% 若是因为「提前付年费/备货」这类一次性支出，看口径时要把它们剔掉再比，否则会误报。";
  }

  function calcCashCycle() {
    var sales = Math.max(0, num($("cc-sales"), 0));
    var cogs = Math.max(0, num($("cc-cogs"), 0));
    var ar = Math.max(0, num($("cc-ar"), 0));
    var inv = Math.max(0, num($("cc-inv"), 0));
    var ap = Math.max(0, num($("cc-ap"), 0));
    var target = Math.max(0, num($("cc-target"), 0));

    var ds = sales / 365;
    var dc = cogs / 365;
    var dso = ds > 0 ? ar / ds : 0;
    var dio = dc > 0 ? inv / dc : 0;
    var dpo = dc > 0 ? ap / dc : 0;
    var ccc = dso + dio - dpo;
    var occ = dc * ccc;
    var gap = ccc - target;

    $("cc-big").textContent = fmt(ccc, 2);
    $("cc-dso").textContent = fmt(dso, 2) + " 天（应收 " + money(ar) + "）";
    $("cc-dio").textContent = fmt(dio, 2) + " 天（存货 " + money(inv) + "）";
    $("cc-dpo").textContent = fmt(dpo, 2) + " 天（应付 " + money(ap) + "）";
    $("cc-occ").textContent = money(occ) + "（日均销售成本 × " + fmt(ccc, 2) + " 天）";
    $("cc-perday").textContent = money(dc) + "（每压 1 天周转就少占这些钱）";
    $("cc-gap").textContent = gap > 0 ? fmt(gap, 2) + " 天（需释放 " + money(dc * gap) + "）" : "已达标（优于目标 " + fmt(Math.abs(gap), 2) + " 天）";

    var rows = [
      ["应收账款", money(ar), fmt(dso, 2), "收得越慢越占钱"],
      ["存货", money(inv), fmt(dio, 2), "压货越多越占钱"],
      ["应付账款", money(ap), "-" + fmt(dpo, 2), "欠得越久越省现金"],
      ["现金周期", "—", fmt(ccc, 2), "DSO + DIO − DPO"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 3 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td class=\"tal\">" + rows[i][3] + "</td></tr>";
    }
    $("cc-body").innerHTML = html;

    var tips = [];
    if (dso >= dio && dso >= dpo) tips.push("应收是最大头（" + fmt(dso, 2) + " 天），先抓回款：账期谈判、催收排期、保理");
    if (dio >= dso && dio >= dpo) tips.push("存货是最大头（" + fmt(dio, 2) + " 天），先抓库存：库龄清理、安全库存下调、以销定采");
    if (dpo < 30) tips.push("应付只有 " + fmt(dpo, 2) + " 天，能否在不伤供应商关系的前提下谈长账期");
    $("ccy-note").textContent = "现金周转 " + fmt(ccc, 2) + " 天，意味着从付钱进货到收回货款要压 " + money(occ) + " 在营运资金里。"
      + tips.join("；") + "。每把周转压 1 天，就少占 " + money(dc) + "。";
  }

  function calcLosscontract() {
    var price = num($("lc-price"), 1000000);
    var cost = num($("lc-cost"), 1200000);
    var incurred = num($("lc-incurred"), 300000);
    var totalLoss = Math.max(0, cost - price);
    var progress = cost > 0 ? incurred / cost : 0;
    if (progress > 1) progress = 1;
    var recognized = totalLoss * progress;
    var provision = totalLoss - recognized;
    var margin = price > 0 ? (price - cost) / price : 0;
    $("lc-big").textContent = money(provision);
    $("lc-total").textContent = money(totalLoss);
    $("lc-progress").textContent = pct(progress, 2);
    $("lc-recognized").textContent = money(recognized);
    $("lc-margin").textContent = pct(margin, 2);
    $("lc-note").textContent = "预计总成本 > 合同总价即为亏损合同：已发生部分按进度进损益，未发生部分计提预计负债（本期计提 = 总损失 − 已确认亏损）。有标的资产的，先做减值测试再计提预计负债，不得重复。可撤结合同不确认损失（只有当义务不可撤销时才计提）。";
  }

  function calcEquitychg() {
    var sc0 = num($("eqc-sc0"), 5000000), cr0 = num($("eqc-cr0"), 1000000);
    var re0 = num($("eqc-re0"), 500000), up0 = num($("eqc-up0"), 800000);
    var np = num($("eqc-np"), 1200000), re = num($("eqc-re"), 120000), div = num($("eqc-div"), 300000);
    var add = num($("eqc-add"), 0), oci = num($("eqc-oci"), 50000);
    var sc1 = sc0 + add, cr1 = cr0, re1 = re0 + re, up1 = up0 + np - re - div;
    var total = sc1 + cr1 + re1 + up1 + oci;
    $("eqc-big").textContent = money(total);
    $("eqc-sc1").textContent = money(sc1);
    $("eqc-cr1").textContent = money(cr1);
    $("eqc-re1").textContent = money(re1);
    $("eqc-up1").textContent = money(up1);
    $("eqc-note").textContent = "期末未分配利润 = 期初 + 净利润 − 提取盈余公积 − 分配股利；其他综合收益单独列示不计入净利润。勾稽：期末权益合计 = 期初合计 + 净利润 + 增资 + 其他综合收益 − 分红。这里是简化版，未含库存股、股份支付等复杂项。";
  }

  function calcEps() {
    var ni = num($("eps-ni"), 10000000);
    var pref = num($("eps-pref"), 500000);
    var shares = num($("eps-shares"), 50000000);
    var dil = num($("eps-dil"), 5000000);
    var dilni = num($("eps-dilni"), 300000);
    var price = num($("eps-price"), 10);
    var basic = shares > 0 ? (ni - pref) / shares : 0;
    var diluted = (shares + dil) > 0 ? (ni - pref + dilni) / (shares + dil) : 0;
    var anti = diluted > basic;
    var pe = basic > 0 ? price / basic : 0;
    var ppe = diluted > 0 ? price / diluted : 0;
    $("eps-big").textContent = fmt(basic, 4);
    $("eps-dilkv").textContent = fmt(diluted, 4);
    $("eps-pe").textContent = pe > 0 ? fmt(pe, 2) + " 倍" : "—";
    $("eps-pped").textContent = ppe > 0 ? fmt(ppe, 2) + " 倍" : "—";
    $("eps-judge").textContent = anti ? "反稀释（不计入稀释每股收益）" : "具稀释性";
    $("eps-note").textContent = "基本 EPS =（归母净利润 − 优先股股息）÷ 加权平均普通股股数；稀释 EPS 再把可转债/期权/认股权证等潜在普通股按「假设转换」加入分子分母。若稀释 EPS 反而比基本 EPS 高（反稀释），准则要求不纳入计算。加权股数要按发行/回购时间加权，不是期末数。";
  }

export const PANELS = {"feetrend":"  <section class=\"panel\" id=\"panel-feetrend\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（连续 6 期收入与三费，元）</h2>\n    <label class=\"f\"><span>第 1 期 收入 / 三费</span>\n      <span class=\"row\"><input id=\"tr-r1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\"><input id=\"tr-f1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"120000\"></span></label>\n    <label class=\"f\"><span>第 2 期 收入 / 三费</span>\n      <span class=\"row\"><input id=\"tr-r2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"850000\"><input id=\"tr-f2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"125000\"></span></label>\n    <label class=\"f\"><span>第 3 期 收入 / 三费</span>\n      <span class=\"row\"><input id=\"tr-r3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"900000\"><input id=\"tr-f3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"138000\"></span></label>\n    <label class=\"f\"><span>第 4 期 收入 / 三费</span>\n      <span class=\"row\"><input id=\"tr-r4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"880000\"><input id=\"tr-f4\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"135000\"></span></label>\n    <label class=\"f\"><span>第 5 期 收入 / 三费</span>\n      <span class=\"row\"><input id=\"tr-r5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"950000\"><input id=\"tr-f5\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"146000\"></span></label>\n    <label class=\"f\"><span>第 6 期 收入 / 三费</span>\n      <span class=\"row\"><input id=\"tr-r6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"><input id=\"tr-f6\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"152000\"></span></label>\n    <em>三费＝销售费用＋管理费用＋财务费用；第 1 期当基准，看后面几期是收入涨得快还是费用涨得快</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">最新一期费用率</span><strong id=\"tr-now\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>六期平均费用率（加权）</span><b id=\"tr-avg\">—</b></li>\n      <li><span>六期费用合计 / 收入合计</span><b id=\"tr-sums\">—</b></li>\n      <li><span>费用增速 / 收入增速</span><b id=\"tr-growth\">—</b></li>\n      <li><span>费用随收入同步增长「应花」</span><b id=\"tr-sync\">—</b></li>\n      <li><span>实际比同步增长多花</span><b id=\"tr-over\">—</b></li>\n      <li><span>高于基准费用率的期数</span><b id=\"tr-cnt\">—</b></li>\n      <li><span>趋势判定</span><b id=\"tr-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>期间</th><th>收入</th><th>三费</th><th>费用率</th><th>环比</th></tr></thead>\n        <tbody id=\"tr-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"tr-note\"></p>\n  </div>\n    </div>\n  </section>\n","contractperf":"  <section class=\"panel\" id=\"panel-contractperf\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（不含税口径）</h2>\n    <label class=\"f\">\n      <span>合同总价</span>\n      <input id=\"cfe-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"10000000\">\n    </label>\n    <label class=\"f\">\n      <span>预计总成本</span>\n      <input id=\"cfe-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"8000000\">\n    </label>\n    <label class=\"f\">\n      <span>累计已发生成本</span>\n      <input id=\"cfe-actual\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"3000000\">\n      <em>投入法：用累计实际成本 ÷ 预计总成本推履约进度</em>\n    </label>\n    <span class=\"row\">\n      <input id=\"cfe-billed\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2500000\" aria-label=\"累计已开票结算\">\n      <input id=\"cfe-cash\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2000000\" aria-label=\"累计已收款\">\n    </span>\n    <p class=\"hint\">左：累计已结算（开票），右：累计已收款</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">履约进度</span><strong id=\"cfe-big\">—</strong><span class=\"unit\">%</span></div>\n    <ul class=\"kv\">\n      <li><span>累计应确认收入</span><b id=\"cfe-rev\">—</b></li>\n      <li><span>累计确认毛利</span><b id=\"cfe-gp\">—</b></li>\n      <li><span>毛利率</span><b id=\"cfe-rate\">—</b></li>\n      <li><span>合同资产 / 合同负债</span><b id=\"cfe-asset\">—</b></li>\n      <li><span>应收账款（已开票未收）</span><b id=\"cfe-ar\">—</b></li>\n      <li><span>剩余收入 / 尚需成本</span><b id=\"cfe-left\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"cfe-note\"></p>\n  </div>\n    </div>\n  </section>\n","projrev":"  <section class=\"panel\" id=\"panel-projrev\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（不含税口径）</h2>\n    <span class=\"row\">\n      <input id=\"prj-rev\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"20000000\" aria-label=\"合同总收入\">\n      <input id=\"prj-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"16000000\" aria-label=\"预计总成本\">\n    </span>\n    <p class=\"hint\">左：合同总收入，右：预计总成本</p>\n    <span class=\"row\">\n      <input id=\"prj-actual\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"4000000\" aria-label=\"累计已发生成本\">\n      <input id=\"prj-billed\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"3500000\" aria-label=\"累计已结算\">\n    </span>\n    <p class=\"hint\">左：本期累计已发生成本，右：累计已结算（开票）</p>\n    <span class=\"row\">\n      <input id=\"prj-prior\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"3000000\" aria-label=\"上年累计确认收入\">\n      <input id=\"prj-pcost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2400000\" aria-label=\"上年累计发生成本\">\n    </span>\n    <p class=\"hint\">左：上年累计已确认收入，右：上年累计已发生成本</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">本期应确认收入</span><strong id=\"prj-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>完工进度</span><b id=\"prj-pct\">—</b></li>\n      <li><span>累计应确认收入</span><b id=\"prj-cum\">—</b></li>\n      <li><span>本期发生成本</span><b id=\"prj-cst\">—</b></li>\n      <li><span>本期毛利 / 累计毛利</span><b id=\"prj-gp\">—</b></li>\n      <li><span>合同资产（已确认未结算）</span><b id=\"prj-asset\">—</b></li>\n      <li><span>尚需发生成本</span><b id=\"prj-left\">—</b></li>\n      <li><span>完成合同法对比</span><b id=\"prj-done\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"prj-note\"></p>\n  </div>\n    </div>\n  </section>\n","fxtranslate":"  <section class=\"panel\" id=\"panel-fxtranslate\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（金额单位：万美元）</h2>\n    <span class=\"row\">\n      <input id=\"fxt-asset\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"1000\" aria-label=\"资产总额\">\n      <input id=\"fxt-liab\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"600\" aria-label=\"负债总额\">\n    </span>\n    <p class=\"hint\">左：资产总额，右：负债总额（期末数）</p>\n    <span class=\"row\">\n      <input id=\"fxt-cap\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"300\" aria-label=\"实收资本\">\n      <input id=\"fxt-ret0\" type=\"number\" inputmode=\"decimal\" step=\"1000\" value=\"50\" aria-label=\"期初未分配利润\">\n    </span>\n    <p class=\"hint\">左：实收资本，右：期初未分配利润</p>\n    <label class=\"f\">\n      <span>本年净利润（外币）</span>\n      <input id=\"fxt-np\" type=\"number\" inputmode=\"decimal\" step=\"1000\" value=\"50\">\n    </label>\n    <span class=\"row\">\n      <input id=\"fxt-close\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"7.10\" aria-label=\"期末汇率\">\n      <input id=\"fxt-avg\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"7.05\" aria-label=\"平均汇率\">\n    </span>\n    <p class=\"hint\">左：期末汇率，右：平均汇率（利润表用）</p>\n    <span class=\"row\">\n      <input id=\"fxt-his\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"6.90\" aria-label=\"出资日历史汇率\">\n      <input id=\"fxt-open\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"7.20\" aria-label=\"期初汇率\">\n    </span>\n    <p class=\"hint\">左：实收资本历史汇率，右：期初汇率（期初未分配利润用）</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果（折合人民币，万元）</h2>\n    <div class=\"big\"><span class=\"k\">外币报表折算差额</span><strong id=\"fxt-big\">—</strong><span class=\"unit\">万元</span></div>\n    <ul class=\"kv\">\n      <li><span>资产折算</span><b id=\"fxt-a\">—</b></li>\n      <li><span>负债折算</span><b id=\"fxt-l\">—</b></li>\n      <li><span>实收资本折算</span><b id=\"fxt-c\">—</b></li>\n      <li><span>期末未分配利润</span><b id=\"fxt-r\">—</b></li>\n      <li><span>本年净利润折算</span><b id=\"fxt-n\">—</b></li>\n      <li><span>差额占所有者权益</span><b id=\"fxt-rel\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"fxt-note\"></p>\n  </div>\n    </div>\n  </section>\n","lease":"  <section class=\"panel\" id=\"panel-lease\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>年租金（不含税）</span>\n      <input id=\"lse-rent\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"600000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"lse-years\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"30\" step=\"1\" value=\"5\" aria-label=\"租赁期\">\n      <input id=\"lse-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"5\" aria-label=\"折现率\">\n    </span>\n    <p class=\"hint\">左：租赁期（年），右：增量借款利率（%）</p>\n    <label class=\"f\">\n      <span>付款时点</span>\n      <select id=\"lse-when\">\n        <option value=\"0\" selected>每年年末付（普通年金）</option>\n        <option value=\"1\">每年年初付（预付年金）</option>\n      </select>\n      <em>新租赁准则：除短期（≤12 个月）和低价值资产外，经营租赁也要上表</em>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">租赁负债（现值）</span><strong id=\"lse-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>使用权资产（原值）</span><b id=\"lse-rou\">—</b></li>\n      <li><span>首年利息 / 折旧</span><b id=\"lse-y1\">—</b></li>\n      <li><span>首年费用合计</span><b id=\"lse-exp\">—</b></li>\n      <li><span>比旧准则（直线租金）</span><b id=\"lse-diff\">—</b></li>\n      <li><span>首年末负债余额</span><b id=\"lse-end\">—</b></li>\n      <li><span>EBITDA 变化</span><b id=\"lse-ebitda\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>年</th><th>期初负债</th><th>利息</th><th>租金</th><th>期末负债</th></tr></thead>\n        <tbody id=\"lse-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"lse-note\"></p>\n  </div>\n    </div>\n  </section>\n","gpmix":"  <section class=\"panel\" id=\"panel-gpmix\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <span class=\"row\">\n      <input id=\"gpm-r1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"10000000\" aria-label=\"上年收入\">\n      <input id=\"gpm-c1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"7000000\" aria-label=\"上年成本\">\n    </span>\n    <p class=\"hint\">上年：收入 / 成本</p>\n    <span class=\"row\">\n      <input id=\"gpm-r2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"12000000\" aria-label=\"本年收入\">\n      <input id=\"gpm-c2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"8760000\" aria-label=\"本年成本\">\n    </span>\n    <p class=\"hint\">本年：收入 / 成本</p>\n    <label class=\"f\">\n      <span>销量增长率（%）</span>\n      <input id=\"gpm-qty\" type=\"number\" inputmode=\"decimal\" step=\"1\" value=\"10\">\n      <em>用来把收入增长拆成「卖得更多」和「卖得更贵」两块</em>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">毛利额变动</span><strong id=\"gpm-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>上年 / 本年毛利率</span><b id=\"gpm-gm\">—</b></li>\n      <li><span>销量效应</span><b id=\"gpm-vol\">—</b></li>\n      <li><span>价格效应</span><b id=\"gpm-price\">—</b></li>\n      <li><span>成本率效应</span><b id=\"gpm-cost\">—</b></li>\n      <li><span>三项合计校验</span><b id=\"gpm-sum\">—</b></li>\n      <li><span>隐含售价变化</span><b id=\"gpm-px\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"gpm-note\"></p>\n  </div>\n    </div>\n  </section>\n","accrual":"  <section class=\"panel\" id=\"panel-accrual\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <span class=\"row\">\n      <input id=\"acr-rent\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"240000\" aria-label=\"预付全年房租\">\n      <input id=\"acr-mon\" type=\"number\" inputmode=\"numeric\" min=\"0\" max=\"12\" step=\"1\" value=\"7\" aria-label=\"本年已过月数\">\n    </span>\n    <p class=\"hint\">左：跨年度的预付房租（12 个月口径），右：本年度已过月数</p>\n    <label class=\"f\">\n      <span>预付全年保险费</span>\n      <input id=\"acr-ins\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"60000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"acr-nofpiao\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"150000\" aria-label=\"已发生未取得发票\">\n      <input id=\"acr-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\" aria-label=\"所得税率\">\n    </span>\n    <p class=\"hint\">左：已预提但截至年末仍未取得发票的金额，右：所得税率（%）</p>\n    <label class=\"f\">\n      <span>能否在汇算清缴结束前取得发票</span>\n      <select id=\"acr-get\">\n        <option value=\"1\" selected>能，已补齐</option>\n        <option value=\"0\">不能，逾期未取得</option>\n      </select>\n      <em>汇算清缴申报截止日为次年 5 月 31 日，此前补齐即可扣除</em>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">待摊＋预提余额</span><strong id=\"acr-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>房租：本年应摊 / 结转下年</span><b id=\"acr-rentout\">—</b></li>\n      <li><span>保险：本年应摊 / 结转下年</span><b id=\"acr-insout\">—</b></li>\n      <li><span>预提未取票金额</span><b id=\"acr-nf\">—</b></li>\n      <li><span>税务处理</span><b id=\"acr-taxout\">—</b></li>\n      <li><span>本月应摊合计</span><b id=\"acr-monout\">—</b></li>\n      <li><span>跨期费用占预提比</span><b id=\"acr-ratio\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"acr-note\"></p>\n  </div>\n    </div>\n  </section>\n","cfconsol":"  <section class=\"panel\" id=\"panel-cfconsol\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（正数为流入，负数为流出）</h2>\n    <span class=\"row\">\n      <input id=\"cfc-poa\" type=\"number\" inputmode=\"decimal\" step=\"100000\" value=\"8000000\" aria-label=\"母公司经营\">\n      <input id=\"cfc-soa\" type=\"number\" inputmode=\"decimal\" step=\"100000\" value=\"2000000\" aria-label=\"子公司经营\">\n    </span>\n    <p class=\"hint\">左：母公司经营活动净额，右：子公司经营活动净额</p>\n    <span class=\"row\">\n      <input id=\"cfc-poi\" type=\"number\" inputmode=\"decimal\" step=\"100000\" value=\"-5000000\" aria-label=\"母公司投资\">\n      <input id=\"cfc-soi\" type=\"number\" inputmode=\"decimal\" step=\"100000\" value=\"-1500000\" aria-label=\"子公司投资\">\n    </span>\n    <p class=\"hint\">左：母公司投资活动净额，右：子公司投资活动净额</p>\n    <span class=\"row\">\n      <input id=\"cfc-pof\" type=\"number\" inputmode=\"decimal\" step=\"100000\" value=\"3000000\" aria-label=\"母公司筹资\">\n      <input id=\"cfc-sof\" type=\"number\" inputmode=\"decimal\" step=\"100000\" value=\"500000\" aria-label=\"子公司筹资\">\n    </span>\n    <p class=\"hint\">左：母公司筹资活动净额，右：子公司筹资活动净额</p>\n    <span class=\"row\">\n      <input id=\"cfc-in\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"1200000\" aria-label=\"内部销售收现抵销\">\n      <input id=\"cfc-inv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"5000000\" aria-label=\"对子公司投资抵销\">\n    </span>\n    <p class=\"hint\">左：内部销售当期收现（经营流入抵销），右：母公司对子公司投资/子公司实收（投资与筹资同时抵销）</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">合并现金净增加</span><strong id=\"cfc-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>简单相加（未抵销）</span><b id=\"cfc-raw\">—</b></li>\n      <li><span>经营活动净额</span><b id=\"cfc-oa\">—</b></li>\n      <li><span>投资活动净额</span><b id=\"cfc-oi\">—</b></li>\n      <li><span>筹资活动净额</span><b id=\"cfc-of\">—</b></li>\n      <li><span>抵销影响合计</span><b id=\"cfc-eff\">—</b></li>\n      <li><span>与资产负债表货币资金变动</span><b id=\"cfc-tie\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"cfc-note\"></p>\n  </div>\n    </div>\n  </section>\n","trialbal":"  <section class=\"panel\" id=\"panel-trialbal\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：试算平衡表（借方 / 贷方）</h2>\n        <label class=\"f\"><span>库存现金（左借 / 右贷）</span><span class=\"row\"><input id=\"tba-d1\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"5000\" aria-label=\"库存现金借方\"><input id=\"tba-c1\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"0\" aria-label=\"库存现金贷方\"></span></label>\n        <label class=\"f\"><span>银行存款（左借 / 右贷）</span><span class=\"row\"><input id=\"tba-d2\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"45000\" aria-label=\"银行存款借方\"><input id=\"tba-c2\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"0\" aria-label=\"银行存款贷方\"></span></label>\n        <label class=\"f\"><span>应收账款（左借 / 右贷）</span><span class=\"row\"><input id=\"tba-d3\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"20000\" aria-label=\"应收账款借方\"><input id=\"tba-c3\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"0\" aria-label=\"应收账款贷方\"></span></label>\n        <label class=\"f\"><span>固定资产（左借 / 右贷）</span><span class=\"row\"><input id=\"tba-d4\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"30000\" aria-label=\"固定资产借方\"><input id=\"tba-c4\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"0\" aria-label=\"固定资产贷方\"></span></label>\n        <label class=\"f\"><span>应付账款（左借 / 右贷）</span><span class=\"row\"><input id=\"tba-d5\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"0\" aria-label=\"应付账款借方\"><input id=\"tba-c5\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"10000\" aria-label=\"应付账款贷方\"></span></label>\n        <label class=\"f\"><span>短期借款（左借 / 右贷）</span><span class=\"row\"><input id=\"tba-d6\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"0\" aria-label=\"短期借款借方\"><input id=\"tba-c6\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"20000\" aria-label=\"短期借款贷方\"></span></label>\n        <label class=\"f\"><span>实收资本（左借 / 右贷）</span><span class=\"row\"><input id=\"tba-d7\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"0\" aria-label=\"实收资本借方\"><input id=\"tba-c7\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"60000\" aria-label=\"实收资本贷方\"></span></label>\n        <label class=\"f\"><span>主营业务收入（左借 / 右贷）</span><span class=\"row\"><input id=\"tba-d8\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"0\" aria-label=\"主营业务收入借方\"><input id=\"tba-c8\" type=\"number\" inputmode=\"decimal\" step=\"100\" value=\"10000\" aria-label=\"主营业务收入贷方\"></span></label>\n        <em>每行两个格子：左借方、右贷方。哪边没有就填 0。借贷不平要么漏了一笔，要么金额抄错、方向写反。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>试算结果</h2>\n        <div class=\"big\"><span class=\"k\">借贷差额</span><strong id=\"tba-big\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>借方合计</span><b id=\"tba-debit\">—</b></li>\n          <li><span>贷方合计</span><b id=\"tba-credit\">—</b></li>\n          <li><span>是否平衡</span><b id=\"tba-bal\">—</b></li>\n          <li><span>差额方向</span><b id=\"tba-dir\">—</b></li>\n        </ul>\n        <p class=\"hint\" id=\"tba-note\"></p>\n      </div>\n    </div>\n  </section>\n","rollbudget":"  <section class=\"panel\" id=\"panel-rollbudget\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：全年预算与已发生实际</h2>\n        <span class=\"row\">\n          <label class=\"f\"><span>全年预算收入</span><input id=\"rbg-budinc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"12000000\"></label>\n          <label class=\"f\"><span>全年预算费用</span><input id=\"rbg-budexp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"9000000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>已过月份</span><input id=\"rbg-months\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"11\" step=\"1\" value=\"6\"></label>\n          <label class=\"f\"><span>剩余月份修正系数 %</span><input id=\"rbg-adj\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"100\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>已发生收入</span><input id=\"rbg-actinc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"5400000\"></label>\n          <label class=\"f\"><span>已发生费用</span><input id=\"rbg-actexp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"4800000\"></label>\n        </span>\n        <em>口径：已过月份用实际数，剩余月份用全年预算月均 × 修正系数外推，得出「全年预测」。修正系数 100% = 保持预算节奏，低于 100% 表示预计后几个月会收缩。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果：滚动预测到年底</h2>\n        <div class=\"big\"><span class=\"k\">全年预测利润</span><strong id=\"rbg-big\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>全年预测收入 / 达成率</span><b id=\"rbg-finc\">—</b></li>\n          <li><span>全年预测费用 / 超支节约</span><b id=\"rbg-fexp\">—</b></li>\n          <li><span>预测利润（vs 预算）</span><b id=\"rbg-profit\">—</b></li>\n          <li><span>追平预算需月均收入</span><b id=\"rbg-need\">—</b></li>\n          <li><span>守住费用需月均支出</span><b id=\"rbg-expneed\">—</b></li>\n        </ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">项目</th><th>全年预算</th><th>已发生</th><th>剩余预测</th><th>全年预测</th></tr></thead>\n            <tbody id=\"rbg-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"rbg-note\"></p>\n      </div>\n    </div>\n  </section>\n","csladv":"  <section class=\"panel\" id=\"panel-csladv\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：母子公司与内部交易</h2>\n        <span class=\"row\">\n          <label class=\"f\"><span>母公司收入</span><input id=\"csl-pinc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"50000000\"></label>\n          <label class=\"f\"><span>子公司收入</span><input id=\"csl-sinc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"20000000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>内部销售收入</span><input id=\"csl-intra\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"8000000\"></label>\n          <label class=\"f\"><span>存货中未实现利润</span><input id=\"csl-unreal\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"500000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>内部往来余额</span><input id=\"csl-recv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"3000000\"></label>\n          <label class=\"f\"><span>母公司长投</span><input id=\"csl-invest\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"20000000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>子公司净资产</span><input id=\"csl-net\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"22000000\"></label>\n          <label class=\"f\"><span>母公司持股比例 %</span><input id=\"csl-own\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"80\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>母公司净利</span><input id=\"csl-pni\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"4000000\"></label>\n          <label class=\"f\"><span>子公司净利</span><input id=\"csl-sni\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"1000000\"></label>\n        </span>\n        <label class=\"f\"><span>内部股利（母公司收到）</span><input id=\"csl-div\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"200000\"></label>\n        <em>口径：非同一控制合并，长投与子公司净资产份额之差计商誉；同一控制合并差额进资本公积。未实现利润默认发生在子公司（上游），按少数股东比例分摊。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果：合并抵销工作底稿</h2>\n        <div class=\"big\"><span class=\"k\">合并净利</span><strong id=\"csl-big\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>合并收入</span><b id=\"csl-rev\">—</b></li>\n          <li><span>归母净利</span><b id=\"csl-parent\">—</b></li>\n          <li><span>少数股东损益</span><b id=\"csl-minorpl\">—</b></li>\n          <li><span>少数股东权益</span><b id=\"csl-minoreq\">—</b></li>\n          <li><span>商誉（非同一控制）</span><b id=\"csl-gw\">—</b></li>\n          <li><span>合并净利率</span><b id=\"csl-margin\">—</b></li>\n        </ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">抵销项目</th><th>金额</th><th class=\"tal\">说明</th></tr></thead>\n            <tbody id=\"csl-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"csl-note\"></p>\n      </div>\n    </div>\n  </section>\n","expcheck":"  <section class=\"panel\" id=\"panel-expcheck\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：报销单与票据构成</h2>\n        <span class=\"row\">\n          <label class=\"f\"><span>报销总额</span><input id=\"ec-total\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"10000\"></label>\n          <label class=\"f\"><span>其中专票金额（进项可抵）</span><input id=\"ec-special\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"5000\"></label>\n        </span>\n        <label class=\"f\"><span>专票税率 %</span><input id=\"ec-vatrate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"6\"></label>\n        <span class=\"row\">\n          <label class=\"f\"><span>无发票金额</span><input id=\"ec-noticket\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"1000\"></label>\n          <label class=\"f\"><span>白条 / 收据金额</span><input id=\"ec-receipt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"800\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>超出公司标准</span><input id=\"ec-over\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"500\"></label>\n          <label class=\"f\"><span>混入个人消费</span><input id=\"ec-personal\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"700\"></label>\n        </span>\n        <label class=\"f\"><span>所得税率 %</span><input id=\"ec-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"25\"></label>\n        <em>口径：无票、白条、个人消费都不能税前扣除；超标部分公司不承担就不入账、若承担同样调增。专票要三流一致（合同/资金/发票）才能抵进项。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果：合规自查</h2>\n        <div class=\"big\"><span class=\"k\">合规可报金额</span><strong id=\"ec-big\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>合规率</span><b id=\"ec-rate\">—</b></li>\n          <li><span>可抵扣进项税</span><b id=\"ec-vat\">—</b></li>\n          <li><span>需纳税调增</span><b id=\"ec-adjust\">—</b></li>\n          <li><span>因此多缴所得税</span><b id=\"ec-taxamt\">—</b></li>\n        </ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">票据类型</th><th>金额</th><th class=\"tal\">税务处理</th></tr></thead>\n            <tbody id=\"ec-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"ec-note\"></p>\n      </div>\n    </div>\n  </section>\n","budgetalert":"  <section class=\"panel\" id=\"panel-budgetalert\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：全年预算与已执行</h2>\n        <span class=\"row\">\n          <label class=\"f\"><span>全年预算收入</span><input id=\"bga-budinc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"12000000\"></label>\n          <label class=\"f\"><span>全年预算费用</span><input id=\"bga-budexp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"9000000\"></label>\n        </span>\n        <label class=\"f\"><span>已过月份</span><input id=\"bga-months\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"11\" step=\"1\" value=\"5\"></label>\n        <span class=\"row\">\n          <label class=\"f\"><span>已发生收入</span><input id=\"bga-actinc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"4800000\"></label>\n          <label class=\"f\"><span>已发生费用</span><input id=\"bga-actexp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"4300000\"></label>\n        </span>\n        <em>口径：按「时间进度」对拍执行率——费用跑得比时间快要亮灯，收入跑得比时间慢也要亮灯。预警阈值：偏差 5 个百分点黄灯、10 个百分点红灯（可按需要改判断，数字只作示例）。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果：执行率预警</h2>\n        <div class=\"big\"><span class=\"k\">费用执行率</span><strong id=\"bga-big\">—</strong><span class=\"unit\">%</span></div>\n        <ul class=\"kv\">\n          <li><span>收入执行率（时间进度）</span><b id=\"bga-inc\">—</b></li>\n          <li><span>收入预警灯</span><b id=\"bga-inclight\">—</b></li>\n          <li><span>费用预警灯</span><b id=\"bga-explight\">—</b></li>\n          <li><span>追平收入需月均</span><b id=\"bga-needinc\">—</b></li>\n          <li><span>守住费用月均限额</span><b id=\"bga-capexp\">—</b></li>\n        </ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">指标</th><th>全年预算</th><th>已发生</th><th>执行率</th><th>时间进度</th><th>偏差</th><th class=\"tal\">灯</th></tr></thead>\n            <tbody id=\"bga-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"bga-note\"></p>\n      </div>\n    </div>\n  </section>\n","cashcycle":"  <section class=\"panel\" id=\"panel-cashcycle\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：营运资金三要素</h2>\n        <span class=\"row\">\n          <label class=\"f\"><span>年销售收入</span><input id=\"cc-sales\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"12000000\"></label>\n          <label class=\"f\"><span>年销售成本</span><input id=\"cc-cogs\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"9000000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>平均应收账款</span><input id=\"cc-ar\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2000000\"></label>\n          <label class=\"f\"><span>平均存货</span><input id=\"cc-inv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2200000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>平均应付账款</span><input id=\"cc-ap\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1800000\"></label>\n          <label class=\"f\"><span>目标现金周转天数</span><input id=\"cc-target\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"60\"></label>\n        </span>\n        <em>口径：按 365 天计。DSO = 应收 ÷ 日均销售额，DIO = 存货 ÷ 日均销售成本，DPO = 应付 ÷ 日均销售成本；现金周期 = DSO + DIO − DPO。应付越晚、应收存货越快，占钱越少。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果：现金周转天数拆解</h2>\n        <div class=\"big\"><span class=\"k\">现金周转天数</span><strong id=\"cc-big\">—</strong><span class=\"unit\">天</span></div>\n        <ul class=\"kv\">\n          <li><span>应收天数 DSO</span><b id=\"cc-dso\">—</b></li>\n          <li><span>存货天数 DIO</span><b id=\"cc-dio\">—</b></li>\n          <li><span>应付天数 DPO（抵扣）</span><b id=\"cc-dpo\">—</b></li>\n          <li><span>占压资金</span><b id=\"cc-occ\">—</b></li>\n          <li><span>每压 1 天释放</span><b id=\"cc-perday\">—</b></li>\n          <li><span>距目标还差</span><b id=\"cc-gap\">—</b></li>\n        </ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">环节</th><th>金额</th><th>天数</th><th class=\"tal\">说明</th></tr></thead>\n            <tbody id=\"cc-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"ccy-note\"></p>\n      </div>\n    </div>\n  </section>\n","losscontract":"  <section class=\"panel\" id=\"panel-losscontract\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>亏损合同预计负债</h2>\n        <label class=\"f\"><span>合同总价</span><input id=\"lc-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n        <label class=\"f\"><span>预计总成本</span><input id=\"lc-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1200000\"></label>\n        <label class=\"f\"><span>已发生成本</span><input id=\"lc-incurred\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\"></label>\n      </div>\n      <div class=\"card res\">\n        <h2>结果</h2>\n        <div class=\"big\"><span class=\"k\">本期计提预计负债</span><strong id=\"lc-big\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>预计总损失</span><b id=\"lc-total\">—</b></li>\n          <li><span>履约进度（成本比例）</span><b id=\"lc-progress\">—</b></li>\n          <li><span>已确认亏损</span><b id=\"lc-recognized\">—</b></li>\n          <li><span>合同毛利率</span><b id=\"lc-margin\">—</b></li>\n        </ul>\n        <p class=\"hint\" id=\"lc-note\"></p>\n      </div>\n    </div>\n  </section>\n","equitychg":"  <section class=\"panel\" id=\"panel-equitychg\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>所有者权益变动表</h2>\n        <span class=\"row\">\n          <label class=\"f\"><span>期初实收资本</span><input id=\"eqc-sc0\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"5000000\"></label>\n          <label class=\"f\"><span>期初资本公积</span><input id=\"eqc-cr0\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>期初盈余公积</span><input id=\"eqc-re0\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\"></label>\n          <label class=\"f\"><span>期初未分配利润</span><input id=\"eqc-up0\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\"></label>\n        </span>\n        <label class=\"f\"><span>本年净利润</span><input id=\"eqc-np\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1200000\"></label>\n        <span class=\"row\">\n          <label class=\"f\"><span>提取盈余公积</span><input id=\"eqc-re\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"120000\"></label>\n          <label class=\"f\"><span>分配股利</span><input id=\"eqc-div\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>本期增资</span><input id=\"eqc-add\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"0\"></label>\n          <label class=\"f\"><span>其他综合收益增加</span><input id=\"eqc-oci\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"50000\"></label>\n        </span>\n      </div>\n      <div class=\"card res\">\n        <h2>结果</h2>\n        <div class=\"big\"><span class=\"k\">期末权益合计</span><strong id=\"eqc-big\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>期末实收资本</span><b id=\"eqc-sc1\">—</b></li>\n          <li><span>期末资本公积</span><b id=\"eqc-cr1\">—</b></li>\n          <li><span>期末盈余公积</span><b id=\"eqc-re1\">—</b></li>\n          <li><span>期末未分配利润</span><b id=\"eqc-up1\">—</b></li>\n        </ul>\n        <p class=\"hint\" id=\"eqc-note\"></p>\n      </div>\n    </div>\n  </section>\n","eps":"  <section class=\"panel\" id=\"panel-eps\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>每股收益测算（基本 + 稀释）</h2>\n        <label class=\"f\"><span>归母净利润</span><input id=\"eps-ni\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"10000000\"></label>\n        <label class=\"f\"><span>优先股股息</span><input id=\"eps-pref\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\"></label>\n        <span class=\"row\">\n          <label class=\"f\"><span>加权平均普通股股数</span><input id=\"eps-shares\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"50000000\"></label>\n          <label class=\"f\"><span>当前股价</span><input id=\"eps-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" value=\"10\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>稀释性潜在普通股股数</span><input id=\"eps-dil\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"5000000\"></label>\n          <label class=\"f\"><span>稀释项增加的净利润</span><input id=\"eps-dilni\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\"></label>\n        </span>\n      </div>\n      <div class=\"card res\">\n        <h2>结果</h2>\n        <div class=\"big\"><span class=\"k\">基本每股收益</span><strong id=\"eps-big\">—</strong><span class=\"unit\">元/股</span></div>\n        <ul class=\"kv\">\n          <li><span>稀释每股收益</span><b id=\"eps-dilkv\">—</b></li>\n          <li><span>市盈率（基本）</span><b id=\"eps-pe\">—</b></li>\n          <li><span>市盈率（稀释）</span><b id=\"eps-pped\">—</b></li>\n          <li><span>稀释性判断</span><b id=\"eps-judge\">—</b></li>\n        </ul>\n        <p class=\"hint\" id=\"eps-note\"></p>\n      </div>\n    </div>\n  </section>\n"};
export default { feetrend: calcFeeTrend, contractperf: calcContractPerf, projrev: calcProjRev, fxtranslate: calcFxTranslate, accrual: calcAccrual, cfconsol: calcCfConsol, lease: calcLease, gpmix: calcGpmix, trialbal: calcTrialBal, rollbudget: calcRollBudget, csladv: calcCslAdv, expcheck: calcExpCheck, budgetalert: calcBudgetAlert, cashcycle: calcCashCycle, losscontract: calcLosscontract, equitychg: calcEquitychg, eps: calcEps };
