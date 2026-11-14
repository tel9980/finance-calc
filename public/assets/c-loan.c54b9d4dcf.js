/* 自动生成，勿手改：loan 分类模块（点开才下载） */
const { $, BUILD_TAG, CAT_KEY, CAT_LABEL, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, EDITED, ERR_BOX, FAV_KEY, FIELDS, FIRST_ACTIVATE, INSTALL_HIDE_KEY, KEY, LAST_KEY, MONTH_CATS, MONTH_TABLE, NEXT_OF, PALETTE_EL, PENDING_PARAMS, PRE_KEY, QUOTA_WARNED, RECENT_KEY, SAVE_TIMER, SEARCH_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, TOAST_EL, TODAYBAR_KEY, UNITS, WF_ARCH_KEY, WF_AUTO_IDX, WF_AUTO_LIST, WF_AUTO_STEP, WF_AUTO_TIMER, WF_CUSTNAME_KEY, WF_CUST_KEY, WF_CUST_NAME, WF_DONE, WF_KEY, WF_LAST, WF_LEGACY, WF_MAN_KEY, WF_META_KEY, WF_MONTH_KEY, WF_NOTE_KEY, WF_NOTIFIED_KEY, WF_NOTIFY_KEY, WF_PATHS, WF_ROLE_KEY, WF_ROLE_READY, WF_SKIP_KEY, XL_ROWS, YEAR_TABLE, _onPanels, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bindWfDnd, bindWfInline, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, buildTabBadges, calcLoan, calcMap, calcWorkflow, clearWfMan, closePalette, cmpTabName, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, diagText, dlJson, doInstall, doPrint, drawMonthCats, drawMonthStack, drawReportCharts, drawRpMini, drawnMonthlyChart, drawnYearChart, enhanceNums, enhancePanelUi, ensureChunk, evalExpr, favList, fillCmpMod, fillMonthGrid, fillUnits, flash, flushParams, flushSave, fmt, fmtAt, fmtDate, fx, gauss, getWfCust, getWfDone, getWfMan, getWfMeta, getWfNotes, getWfSkip, hashTarget, installEvt, installHintHide, installHintOff, iosInstallTip, iosLike, isFav, lastName, leftAfter, linkTo, loadCmpA, loadSnaps, loadWfArch, loadWfCust, loadWfDone, loadWfMan, loadWfMeta, loadWfNotes, loadWfSkip, loanRows, makeSnap, markBadInputs, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numBlur, numFocus, numInput, numKey, numOf, openPalette, palKey, panelEls, panelParams, parseAmounts, parseDate, parseNum, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, prePanels, prefetchAllChunks, presets, printCover, pushRecent, pushSearch, pwaStandalone, quickOf, rateOf, readJsonFile, readMonthGrid, recentList, recordWf, refreshCounts, refreshTableTools, refreshTrackMods, refreshWfBadge, renderLoanTable, renderNext, renderPalette, renderPresets, renderSearchHist, renderSnapCompare, renderSnapList, renderTodayBar, renderTrack, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, saveWfCust, savedCat, scrollResultIfDeepLink, searchHist, setCat, setSub, setTheme, showErrorBox, showInstBar, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, syncInstallUi, tabCatLabel, tap, taxBy, toast, toggleWfStep, trimNum, unitFor, updShown, wfAllPaths, wfArchiveMonth, wfArchivePut, wfAutoNext, wfAutoStop, wfAutoWalk, wfBar, wfBindCustQ, wfBuildHandoff, wfCarryMissing, wfCarryQuery, wfCarryWarn, wfCsvCell, wfCustNameSave, wfDayDiff, wfDetailRender, wfFillCustSel, wfHandoff, wfHandoffCopy, wfHandoffCsv, wfHandoffPrint, wfHasAnyData, wfKnownMods, wfLegacyToNew, wfLoad, wfManSave, wfMetaSave, wfMigrateLegacy, wfMonthKey, wfMonthRoll, wfMonthTouch, wfNoteSave, wfNotifyCheck, wfNotifyGranted, wfNotifyPref, wfNotifySend, wfNotifySetPref, wfNotifyStatus, wfNotifyToggle, wfOpenInline, wfPad2, wfPlaceInline, wfProgress, wfRenderSummary, wfRoleSaved, wfScopedPaths, wfSet, wfSkipCurrent, wfSkipSave, wfStepKey, wfStepShare, wfStepState, wfTodayPick, wfTodayStr, wfVisiblePaths, yuan, zOf } = window.FC;

  function calcCombo() {
    var c = num($("cb-commercial"));
    var cr = num($("cb-commercial-rate")) / 100;
    var f = num($("cb-fund"));
    var fr = num($("cb-fund-rate")) / 100;
    var n = months(num($("cb-years")) * 12);

    var ok = n > 0 && c + f > 0;
    if (!ok) {
      $("cb-pay").textContent = "—";
      ["cb-total-principal", "cb-c-pay", "cb-f-pay", "cb-interest", "cb-allc", "cb-save"].forEach(function (id) { $(id).textContent = "—"; });
      $("cb-note").textContent = "填好贷款金额和年限后自动计算。";
      return;
    }

    var cP = annuityPayment(c, cr / 12, n);
    var fP = annuityPayment(f, fr / 12, n);
    var pay = cP + fP;
    var totalPrincipal = c + f;
    var totalPay = pay * n;
    var interest = totalPay - totalPrincipal;

    var allC = annuityPayment(totalPrincipal, cr / 12, n);
    var allCTotal = allC * n;
    var save = allCTotal - totalPay;

    $("cb-pay").textContent = money(pay);
    $("cb-total-principal").textContent = yuan(totalPrincipal);
    $("cb-c-pay").textContent = yuan(cP);
    $("cb-f-pay").textContent = yuan(fP);
    $("cb-interest").textContent = yuan(interest);
    $("cb-allc").textContent = "月供 " + money(allC) + "，利息 " + money(allCTotal - totalPrincipal) + " 元";
    $("cb-save").textContent = yuan(save);

    $("cb-note").textContent = fx(
      "组合贷 = 商业贷款 + 公积金贷款两笔并行，各自按自己的利率还款，月供相加。公积金部分利率低，所以能用满公积金额度就先贷满，剩下的走商贷；上例中组合贷比全部按商贷利率少付 " +
      money(save) + " 元利息。两笔贷款的实际年限、还款方式以公积金中心和银行审批为准。");
  }

  function calcPrepay() {
    var P = num($("pp-principal"));
    var r = num($("pp-rate")) / 100;
    var n = months(num($("pp-months")));
    var prepay = num($("pp-amount"));
    var fee = num($("pp-fee"));
    var mode = $("pp-mode").value;
    var i = r / 12;

    var ok = P > 0 && n > 0;
    if (!ok || prepay <= 0 || prepay >= P) {
      $("pp-save").textContent = "—";
      ["pp-oldpay", "pp-newpay", "pp-months-change", "pp-interest", "pp-net"].forEach(function (id) { $(id).textContent = "—"; });
      $("pp-note").textContent = prepay <= 0
        ? "填入本次打算提前还的金额后自动测算。"
        : "提前还款金额必须小于剩余本金（否则就是一次性结清，直接看结清金额即可）。";
      return;
    }

    var oldPay = annuityPayment(P, i, n);
    var oldInterest = oldPay * n - P;
    var P2 = P - prepay;
    var newPay, newN, newInterest;

    if (mode === "shorten") {
      if (i === 0) {
        newN = Math.ceil(P2 / oldPay);
      } else {
        var t = 1 - (P2 * i) / oldPay;
        newN = t > 0 ? Math.ceil(-Math.log(t) / Math.log(1 + i)) : n;
      }
      newN = Math.min(Math.max(1, newN), n);
      newPay = oldPay;
      newInterest = newPay * newN - P2;
    } else {
      newN = n;
      newPay = annuityPayment(P2, i, n);
      newInterest = newPay * n - P2;
    }

    var saved = oldInterest - newInterest;
    var net = saved - fee;

    $("pp-save").textContent = money(saved);
    $("pp-main-label").textContent = "可省利息";
    $("pp-oldpay").textContent = yuan(oldPay);
    $("pp-newpay").textContent = mode === "shorten"
      ? yuan(newPay) + "（不变）"
      : yuan(newPay) + "（少 " + money(oldPay - newPay) + "）";
    $("pp-months-change").textContent = mode === "shorten"
      ? n + " → " + newN + " 期（少 " + (n - newN) + " 期 / 约 " + fmt((n - newN) / 12, 1) + " 年）"
      : n + " 期（不变）";
    $("pp-interest").textContent = money(oldInterest) + " → " + money(newInterest) + " 元";
    $("pp-net").textContent = yuan(net);

    var note = mode === "shorten"
      ? "缩短期限：月供不变，把剩下的本金还得更快，省息最多；最后一期通常会比月供小一点。"
      : "减少月供：期限不变，每月还款压力变小，省息比缩短期限少一些，适合现金流紧的时候。";
    if (fee > 0) note += " 违约金/手续费 " + money(fee) + " 元已从省下的利息里扣掉。";
    if (net <= 0) note += " 净省为负说明违约金已经盖过省下的利息，这笔提前还款不划算。";
    note += " 提前还款是否收取违约金、每年能还几次，以你的贷款合同和银行当期规定为准。";
    $("pp-note").textContent = note;
    if ($("pp-links")) $("pp-links").innerHTML = "接着算："
      + linkTo("penalty", { "py-balance": P, "py-rate": num($("pp-rate")), "py-months": n, "py-lump": prepay }, "扣掉违约金还划算吗")
      + linkTo("repayvs", { "rv-principal": P, "rv-rate": num($("pp-rate")), "rv-months": n, "rv-cash": prepay }, "还是拿去理财")
      + linkTo("loanways", { "lw-balance": P, "lw-rate": num($("pp-rate")), "lw-months": n, "lw-lump": prepay }, "缩期限 vs 减月供");
  }

  function calcFund() {
    var bal = Math.max(0, num($("fd-balance"), 0));
    var mon = Math.max(0, num($("fd-monthly"), 0));
    var ratio = Math.max(0, num($("fd-ratio"), 24)) / 100;
    var mult = Math.max(0, num($("fd-mult"), 15));
    var years = Math.max(0, num($("fd-years"), 30));
    var rate = Math.max(0, num($("fd-rate"), 2.85)) / 100;
    var cap = Math.max(0, num($("fd-cap"), 0));
    var price = Math.max(0, num($("fd-price"), 0));
    var n = Math.max(1, Math.round(years * 12));

    var byBal = bal * mult;
    var base = ratio > 0 ? mon / ratio : 0;      // 缴存基数（个人+单位合计口径）
    var affordable = base * 0.5;                 // 常见要求：月供 ≤ 缴存基数 50%
    var byInc = annuityPV(affordable, rate / 12, n);
    var byCap = cap;

    var pick = { label: "账户余额 × 倍数", value: Math.max(0, byBal) };
    [["按还款能力反推", byInc], ["当地最高限额", byCap]].forEach(function (it) {
      if (it[1] < pick.value) pick = { label: it[0], value: Math.max(0, it[1]) };
    });
    var quota = Math.max(0, pick.value);

    $("fd-by-balance").textContent = yuan(byBal);
    $("fd-by-income").textContent = yuan(byInc) + "（月供上限 " + money(affordable) + "）";
    $("fd-by-cap").textContent = yuan(byCap);
    $("fd-limit").textContent = pick.label;
    $("fd-quota").textContent = money(quota);
    $("fd-pay").textContent = yuan(annuityPayment(quota, rate / 12, n)) + " × " + n + " 期";

    if (price > 0) {
      var gap = Math.max(0, price - quota);
      $("fd-gap").textContent = yuan(gap) + "（约占房价 " + pct(gap / price, 1) + "）";
    } else {
      $("fd-gap").textContent = "填房价后可算";
    }

    $("fd-note").textContent = "各地公积金中心口径差异很大，这里给三种最常见算法的结果并取最小值，请以当地为准："
      + "①余额倍数法：账户余额 × " + mult + " 倍；"
      + "②还款能力法：月缴存额 " + money(mon) + " ÷ 缴存比例 " + pct(ratio, 0) + " ≈ 缴存基数 " + money(base)
      + "，按月供不超过基数 50%（" + money(affordable) + "），以 " + pct(rate, 2) + " 的公积金利率、" + n + " 期反推现值；"
      + "③当地最高限额 " + money(cap) + "（单人/双人、首套/二套限额不同）。"
      + "另外多数城市要求连续足额缴存 6–12 个月、且贷款额不超过房屋总价的 70%–80%，额度批下来前别急着签合同。";
  }

  function calcLpr() {
    var P = Math.max(0, num($("lp-principal"), 0));
    var rOld = Math.max(0, num($("lp-old"), 0)) / 100 / 12;
    var rNew = Math.max(0, num($("lp-new"), 0)) / 100 / 12;
    var n = Math.max(1, Math.round(num($("lp-months"), 0)));

    var payOld = annuityPayment(P, rOld, n);
    var payNew = annuityPayment(P, rNew, n);
    var intOld = Math.max(0, payOld * n - P);
    var intNew = Math.max(0, payNew * n - P);
    var saveMonth = payOld - payNew;
    var saveTotal = intOld - intNew;

    $("lp-old-pay").textContent = yuan(payOld);
    $("lp-new-pay").textContent = yuan(payNew);
    $("lp-save-label").textContent = saveMonth >= 0 ? "每月少还" : "每月多还";
    $("lp-save-month").textContent = money(Math.abs(saveMonth));
    $("lp-interest").textContent = money(intOld) + " → " + money(intNew);
    $("lp-save-total").textContent = (saveMonth >= 0 ? "少付 " : "多付 ") + money(Math.abs(saveTotal))
      + " 元（每年约 " + money(Math.abs(saveMonth) * 12) + "）";

    var lpr = num($("lp-lpr"), 3.4), bp = num($("lp-bp"), 0);
    $("lp-calc-rate").textContent = pct((lpr + bp / 100) / 100, 3);

    $("lp-note").textContent = "算法：期限不变、按剩余本金重新用等额本息算月供。"
      + (saveMonth >= 0
        ? "利率从 " + pct(rOld * 12, 2) + " 降到 " + pct(rNew * 12, 2) + "，每月少还 " + money(saveMonth) + " 元，剩余 " + n + " 期合计少付利息 " + money(saveTotal) + " 元。"
        : "利率上升，每月多还 " + money(-saveMonth) + " 元，剩余 " + n + " 期合计多付利息 " + money(-saveTotal) + " 元。")
      + "LPR 换算：执行利率 = LPR + 加点，1BP = 0.01%。加点在合同期内通常固定不变，只有到重定价日（多为每年 1 月 1 日或放款日对应月）才按最新 LPR 调整，所以别把「LPR 降了」直接当成「我下个月就少还」。";
  }

  function calcOffset() {
    var P0 = Math.max(0, num($("of-principal"), 0));
    var rate = Math.max(0, num($("of-rate"), 0)) / 100;
    var n0 = Math.max(1, Math.min(600, Math.round(num($("of-months"), 240))));
    var acct0 = Math.max(0, num($("of-acct"), 0));
    var dep = Math.max(0, num($("of-dep"), 0));
    var mode = $("of-mode").value;
    var r = rate / 12;
    var pay0 = annuityPayment(P0, r, n0);

    // 月冲：每月账户进钱后先抵月供，本金不提前减少
    var bal = acct0, principal = P0, interest = 0, usedAcct = 0, cash = 0, m, runout = -1;
    for (m = 1; m <= n0 && principal > 0.005; m++) {
      bal += dep;
      var i = principal * r, p = Math.min(principal, pay0 - i);
      interest += i; principal -= p;
      var use = Math.min(bal, pay0);
      bal -= use; usedAcct += use; cash += pay0 - use;
      if (runout < 0 && bal < pay0 - 0.005) runout = m;
    }
    var mInt = interest, mCash = cash, mMonths = m - 1, mLeft = bal;

    // 年冲：每月自付全额月供，每满 12 个月用账户余额一次性冲本金
    bal = acct0; principal = P0; interest = 0; cash = 0; var prepaid = 0, mm = 0, left = n0, pay = pay0;
    while (left > 0 && principal > 0.005 && mm < 1200) {
      mm++; bal += dep;
      var i2 = principal * r, p2 = Math.min(principal, pay - i2);
      interest += i2; principal -= p2; cash += p2 + i2; left--;
      if (mm % 12 === 0 && left > 0 && bal > 0.005) {
        var u = Math.min(bal, principal);
        principal -= u; bal -= u; prepaid += u;
        if (principal <= 0.005) break;
        if (mode === "reduce") {
          pay = annuityPayment(principal, r, left);
        } else if (principal * r < pay) {
          var nn = Math.ceil(-Math.log(1 - principal * r / pay) / Math.log(1 + r));
          left = Math.max(1, nn);
        }
      }
    }
    var yInt = interest, yCash = cash, yMonths = mm;

    $("of-pay").textContent = yuan(pay0) + " / 月";
    $("of-runout").textContent = runout > 0 ? "约 " + runout + " 个月（之后自己还）" : "缴存够还，不用自己掏";
    $("of-m-int").textContent = yuan(mInt);
    $("of-m-cash").textContent = yuan(mCash);
    $("of-y-months").textContent = yMonths + " 期" + (yMonths < mMonths ? "（比月冲少 " + (mMonths - yMonths) + " 期）" : "");
    $("of-y-int").textContent = yuan(yInt);
    $("of-y-cash").textContent = yuan(yCash);
    $("of-y-pre").textContent = yuan(prepaid);
    var save = mInt - yInt;
    $("of-save").textContent = money(save > 0 ? save : 0);

    $("of-note").textContent = "两种方式用的是同一笔公积金，区别只在「什么时候动本金」："
      + "月冲是每月拿账户里的钱抵当月月供，本金一点没少，所以利息一分不省（" + money(mInt) + " 元照付），好处是头 " + (runout > 0 ? runout : 0) + " 个月不用掏现金，现金流最松。"
      + "年冲是每月自己先全额还月供、每年用账户余额一次性冲本金，" + (mode === "reduce" ? "之后月供下降、期限不变" : "之后保持月供、期限缩短")
      + "，利息只花 " + money(yInt) + " 元，少付 " + money(save) + " 元"
      + (yMonths < mMonths ? "，还能提前 " + (mMonths - yMonths) + " 期结清" : "") + "。"
      + " 代价是月供得自己先垫（账户余额 " + money(acct0) + " 只能一年用一次）。"
      + " 结论：手头现金流紧、刚买房那两年 → 月冲；有稳定收入、想省利息 → 年冲。"
      + " 各地规则不同（有的城市支持月冲+年冲组合、有的限制首次年冲须满 1 年、冲还贷后账户需保留最低余额），以当地公积金中心为准。";
  }

  function calcRepayVs() {
    var P = Math.max(0, num($("rv-principal"), 0));
    var rate = Math.max(0, num($("rv-rate"), 0)) / 100;
    var n = Math.max(1, Math.min(600, Math.round(num($("rv-months"), 240))));
    var cash = Math.max(0, num($("rv-cash"), 0));
    var inv = Math.max(0, num($("rv-invest"), 0)) / 100;
    var yrs = Math.max(1, Math.min(30, Math.round(num($("rv-years"), 10))));
    var N = Math.min(yrs * 12, n);
    var r = rate / 12, im = inv / 12;

    var pay0 = annuityPayment(P, r, n);
    var P1 = Math.max(0, P - cash);
    var leftover = Math.max(0, cash - P);       // 一次还清后剩下的钱
    var pay1 = annuityPayment(P1, r, n);
    var d = pay0 - pay1;
    var SA = leftAfter(P, r, pay0, N);
    var SB = leftAfter(P1, r, pay1, N);
    var FA = cash * Math.pow(1 + im, N);
    var FB = (im > 0 ? d * (Math.pow(1 + im, N) - 1) / im : d * N) + leftover * Math.pow(1 + im, N);
    var NA = FA - SA;          // 方案A：不提前还 → 理财终值 减 仍欠本金
    var NB = FB - SB;          // 方案B：提前还 → 少还的钱定投终值 减 仍欠本金
    var diff = NB - NA;

    $("rv-pay0").textContent = yuan(pay0) + " / 月";
    $("rv-pay1").textContent = yuan(pay1) + " / 月";
    $("rv-avg").textContent = yuan(d) + " / 月";
    $("rv-fa").textContent = yuan(FA);
    $("rv-sa").textContent = yuan(SA);
    $("rv-fb").textContent = yuan(FB);
    $("rv-sb").textContent = yuan(SB);
    $("rv-na").textContent = yuan(NA);
    $("rv-nb").textContent = yuan(NB);
    $("rv-diff").textContent = money(Math.abs(diff));
    $("rv-verdict").textContent = diff > 0 ? "提前还款更划算" : diff < 0 ? "拿钱去理财更划算" : "两者打平";

    $("rv-note").textContent = "比的是 " + yrs + " 年后谁的家底更厚，两种方案都扣掉「那时还欠银行的钱」再比："
      + " A 方案把 " + money(cash) + " 元拿去买 " + pct(inv, 2) + " 的理财，月供照旧 → " + money(FA) + " − 仍欠 " + money(SA) + " = " + money(NA) + "；"
      + " B 方案先还 " + money(cash) + "，月供从 " + money(pay0) + " 降到 " + money(pay1) + "，每月省下的 " + money(d) + " 元也去买同样的理财 → " + money(FB) + " − 仍欠 " + money(SB) + " = " + money(NB) + "。"
      + " 结论：" + (diff > 0
        ? "提前还款赢 " + money(diff) + " 元，因为贷款利率 " + pct(rate, 2) + " 高于你的理财收益 " + pct(inv, 2) + "——相当于一笔无风险套利。"
        : "理财赢 " + money(-diff) + " 元，因为你的理财收益 " + pct(inv, 2) + " 高于贷款利率 " + pct(rate, 2) + "，钱留在手里更值。")
      + " 判断口诀：拿贷款利率和「你能稳定拿到的税后理财收益率」比，前者高就还、后者高就投。"
      + " 别忘了三点：一是提前还款可能收违约金或限次数；二是还完就没这笔流动性了，家里要留 6 个月开支的应急钱；"
      + "三是房贷利息还能抵扣个税（住房贷款利息专项附加扣除每月 1000 元额度），全部还清后这项扣除也就没了。";
  }

  function calcLoanWays() {
    var P = Math.max(0, num($("lw-balance"), 0));
    var i = Math.max(0, num($("lw-rate"), 0)) / 100 / 12;
    var n = months(num($("lw-months"), 0));
    var L = Math.min(Math.max(0, num($("lw-lump"), 0)), P);
    var income = Math.max(0, num($("lw-income"), 0));

    var pay = annuityPayment(P, i, n);
    var baseInt = pay * n - P;

    /* A：月供不变，缩短期限 */
    var bal = P - L, k = 0, intA = 0, lastA = pay;
    while (bal > 0.005 && k < 1200) {
      var ip = bal * i;
      var pr = pay - ip;
      if (pr >= bal) { pr = bal; lastA = ip + pr; }
      intA += ip; bal -= pr; k++;
    }
    /* B：期限不变，减少月供 */
    var payB = annuityPayment(P - L, i, n);
    var intB = payB * n - (P - L);

    var saveA = Math.max(0, baseInt - intA);
    var saveB = Math.max(0, baseInt - intB);
    var diff = saveA - saveB;

    $("lw-saveA").textContent = money(saveA);
    $("lw-base").textContent = money(pay) + " / " + n + " 期";
    $("lw-baseint").textContent = yuan(baseInt);
    $("lw-monthsA").textContent = k + " 期（少 " + Math.max(0, n - k) + " 期，约 " + fmt(Math.max(0, n - k) / 12, 1) + " 年）";
    $("lw-intA").textContent = yuan(saveA);
    $("lw-payB").textContent = yuan(payB) + "（每月少 " + money(pay - payB) + "）";
    $("lw-intB").textContent = yuan(saveB);
    $("lw-diff").textContent = yuan(diff);
    $("lw-ratio").textContent = income > 0
      ? pct(pay / income, 1) + " / " + pct(payB / income, 1)
      : "填入月收入后显示";
    if (L > 0) {
      var unit = L / 100000;
      $("lw-per").textContent = money(saveA / unit) + " / " + money(saveB / unit);
    } else {
      $("lw-per").textContent = "先填提前还款金额";
    }

    $("lw-note").textContent = L <= 0
      ? "先填「这次提前还多少」，再比较两种还法。"
      : "这 " + money(L) + " 元提前还进去，银行给两种选择："
        + " A 月供不变、期限缩短，还完只需 " + k + " 期（少 " + Math.max(0, n - k) + " 期），省利息 " + money(saveA) + " 元；"
        + " B 期限不变、月供降到 " + money(payB) + " 元（每月少还 " + money(pay - payB) + "），省利息 " + money(saveB) + " 元。"
        + " 同样的钱，A 比 B 多省 " + money(diff) + " 元——因为 A 让你更早还完，少背了 " + Math.max(0, n - k) + " 期的利息。"
        + " 换算成每 10 万元：A 省 " + money(L > 0 ? saveA / (L / 100000) : 0) + "，B 省 " + money(L > 0 ? saveB / (L / 100000) : 0) + "。"
        + " 三个坑：① 银行柜面默认给的是 B（对它更有利，利息收得更久），要主动说「缩短期限、月供不变」；"
        + "② 多数银行还款满 1 年后免违约金、有的一年内收 1% 上下，办之前先问清；提前还款通常要求是万元的整数倍、部分银行每年限次数；"
        + "③ 组合贷先还商贷（利率高那头）。"
        + " 反方向也要算一遍：如果这笔钱的贷款利率低于你能稳定拿到的理财收益，那提前还款未必划算——上面「提前还款 vs 理财」那个标签同时算了这一面。";
  }

  function calcZeroLoan() {
    var A = Math.max(0, num($("zl-amount"), 0));
    var n = months(num($("zl-months"), 24));
    var fee = Math.max(0, num($("zl-fee"), 0));
    var disc = Math.max(0, num($("zl-discount"), 0));
    var r = Math.max(0, num($("zl-rate"), 0)) / 100;

    var m = A / n;
    /* IRR：t0 拿到 A 但先付手续费，之后每月还 m */
    function npv(i) {
      var v = A - fee;
      for (var t = 1; t <= n; t++) v -= m / Math.pow(1 + i, t);
      return v;
    }
    var lo = 0, hi = 1, irr = 0;
    if (npv(0) < 0) {
      for (var it = 0; it < 200; it++) {
        var mid = (lo + hi) / 2;
        if (npv(mid) < 0) lo = mid; else hi = mid;
      }
      irr = (lo + hi) / 2;
    }
    var real = irr * 12 * 100;

    /* 留存资金按月递减的理财收益 */
    var im = r / 12, gain = 0, b = A;
    for (var t2 = 1; t2 <= n; t2++) { gain += b * im; b -= m; if (b < 0) b = 0; }

    var cost = fee + disc;
    var netv = gain - cost;

    $("zl-real").textContent = fmt(real, 2);
    $("zl-pay").textContent = yuan(m);
    $("zl-feepct").textContent = A > 0 ? pct(fee / A, 2) : "—";
    $("zl-feeapr").textContent = m > 0 ? fmt(fee / m, 2) + " 个月" : "—";
    $("zl-cost").textContent = yuan(cost);
    $("zl-gain").textContent = yuan(gain);
    $("zl-net").textContent = netv >= 0
      ? "贷款更划算 " + money(netv) + " 元"
      : "全款更划算 " + money(-netv) + " 元";

    $("zl-note").textContent = "「0 利率」只是把利息换了个名字叫手续费。" + money(A) + " 元分 " + n + " 期、每期 " + money(m)
      + " 元，如果只收 " + money(fee) + " 元手续费，折成真实年化是 " + fmt(real, 2) + "%——"
      + " 算法是把手续费摊到每期现金里算 IRR，和信用卡分期的口径一致。"
      + (fee > 0 ? " 直观理解：手续费 " + pct(fee / A, 2) + " 听起来很低，但你的本金是逐月减少的，平均只占用一半，所以真实年化约等于费率 × 2 ÷ 年数。"
                 : " 手续费填 0 时真实成本就是 0%，这套算法会老老实实告诉你「这次确实免费」。")
      + " 另一半成本更容易被忽略：全款通常能多要优惠（" + money(disc) + " 元），贷款就拿不到，这笔钱也是贷款的代价。"
      + " 把「手续费 " + money(fee) + " + 放弃的优惠 " + money(disc) + "」和「钱留在手上按 " + pct(r, 1) + " 赚到的 " + money(gain) + "」相减："
      + (netv >= 0
        ? "净赚 " + money(netv) + " 元，这种情况下贷款确实划算——但前提是你真的有稳定的理财去处，且不会把钱花掉。"
        : "净亏 " + money(-netv) + " 元，全款更划算。这里最容易被销售话术套住的一句话就是「免息，等于白借」。")
      + " 还有三件事要问清：① 手续费是一次性先收还是摊进月供（先收的实际成本更高）；② 是否捆绑保险、GPS、延保，这些都要折进总价；③ 提前还款是否还要收剩余手续费。"
      + " 车贷、装修贷、家电分期都是这套算法，把金额和手续费换一下就行。";
  }

  function calcPenalty() {
    var P = Math.max(0, num($("py-balance"), 0));
    var rate = Math.max(0, num($("py-rate"), 0)) / 100;
    var N = months(num($("py-months"), 0));
    var L = Math.min(Math.max(0, num($("py-lump"), 0)), P);
    var fr = Math.max(0, num($("py-fee"), 0)) / 100;
    var inv = Math.max(0, num($("py-invest"), 0)) / 100;

    var i = rate / 12;
    var pay = annuityPayment(P, i, N);
    var baseInt = pay * N - P;

    var bal = P - L, k = 0, intA = 0;
    while (bal > 0.005 && k < 1200) {
      var ip = bal * i;
      var pr = pay - ip;
      if (pr >= bal) pr = bal;
      intA += ip; bal -= pr; k++;
    }
    var save = Math.max(0, baseInt - intA);
    var penAmt = L * fr;
    var netSave = save - penAmt;

    /* 现金流 IRR：现在掏 L+违约金，换来「少还 N−k 期月供」 */
    function irrOf(feeExtra) {
      var f = function (x) {
        var v = -(L + feeExtra);
        for (var t = k + 1; t <= N; t++) v += pay / Math.pow(1 + x, t);
        return v;
      };
      if (L <= 0 || k >= N) return 0;
      if (f(0) <= 0) return 0;
      var lo = -0.0001, hi = 0.5;
      for (var it = 0; it < 200; it++) {
        var mid = (lo + hi) / 2;
        if (f(mid) > 0) lo = mid; else hi = mid;
      }
      return (lo + hi) / 2 * 12;
    }
    var irrWith = irrOf(penAmt) * 100;
    var irrNo = irrOf(0) * 100;

    $("py-net").textContent = money(netSave);
    $("py-pay").textContent = yuan(pay) + " × " + N + " 期";
    $("py-int0").textContent = yuan(baseInt);
    $("py-int1").textContent = yuan(intA) + "（" + k + " 期还完）";
    $("py-save").textContent = yuan(save);
    $("py-feeamt").textContent = yuan(penAmt) + "（" + pct(fr, 2) + "）";
    $("py-irr").textContent = pct(irrWith / 100, 2) + "（无违约金 " + pct(irrNo / 100, 2) + "）";
    $("py-crit").textContent = pct(inv, 2) + " → " + (irrWith > inv * 100 ? "该还" : "不该还");

    if (L <= 0) {
      $("py-note").textContent = "先填「这次提前还多少」再看结论。判断逻辑很简单：提前还款等于一笔「按你自己的贷款利率」的无风险投资，"
        + "所以只要你的贷款利率高于你能稳定拿到的税后理财收益，提前还就是划算的；违约金通常只是把这个收益压低零点几个百分点。";
      return;
    }
    $("py-note").textContent = "提前还 " + money(L) + " 元、交 " + money(penAmt) + " 元违约金，换来「少还 "
      + Math.max(0, N - k) + " 期月供」，省下利息 " + money(save) + " 元，净省 " + money(netSave) + " 元。"
      + " 但「省了多少利息」这个数字有欺骗性——它没考虑时间。把这些现金流排到时间轴上算 IRR，"
      + "这次提前还款的等效年化收益是 " + pct(irrWith / 100, 2) + "（不交违约金时 " + pct(irrNo / 100, 2) + "）。"
      + " 而你的贷款利率是 " + pct(rate, 2) + "——两者本来就该相等，因为提前还款做的唯一一件事，就是「按原利率买回自己的债」。"
      + " 所以别纠结省了多少利息，只问一句：这笔钱不还贷，能不能稳定拿到超过 " + pct(irrWith / 100, 2) + " 的税后收益？"
      + (irrWith > inv * 100
        ? " 你现在填的理财收益是 " + pct(inv, 2) + "，低于这个数，所以提前还是划算的，差距约 " + fmt((irrWith - inv * 100), 2) + " 个百分点，而且是无风险的。"
        : " 你现在填的理财收益是 " + pct(inv, 2) + "，已经高过这个数，那就别提前还——但请确认这个收益是稳定到手的，不是某一年撞上的。")
      + " 关于违约金本身：这次省息 " + money(save) + " 元对 " + money(L) + " 元本金，意味着违约金率要收到 "
      + pct(save / (L > 0 ? L : 1), 1) + " 才刚好抵消，所以 1%–3% 的违约金基本不构成障碍，"
      + "真正要注意的是「还款未满一年收违约金、每年只能还 N 次、必须是万元整数倍」这类条款，"
      + "以及组合贷要先还利率高的商贷那头。最后一句提醒：提前还款换来的「省息」是纸面确定、现金不确定——"
      + "它减少的是未来支出，不会让账上多出一分钱，所以必须先留足应急金再动手。";
  }

  function calcZhuan() {
    var P = Math.max(0, num($("zg-balance"), 0));
    var N = months(num($("zg-months"), 120));
    var r = Math.max(0, num($("zg-rate"), 0)) / 100;
    var fr = Math.max(0, num($("zg-frate"), 0)) / 100;
    var quota = Math.max(0, num($("zg-quota"), 0));
    var cost = Math.max(0, num($("zg-cost"), 0));

    var oldPay = annuityPayment(P, r / 12, N);
    var oldInt = Math.max(0, oldPay * N - P);
    var q = Math.min(P, quota), rest = Math.max(0, P - q);
    var payF = q > 0 ? annuityPayment(q, fr / 12, N) : 0;
    var payC = rest > 0 ? annuityPayment(rest, r / 12, N) : 0;
    var newPay = payF + payC;
    var newInt = Math.max(0, newPay * N - P);
    var save = oldInt - newInt, cut = oldPay - newPay;
    var back = cut > 0 ? cost / cut : 0;

    $("zg-save").textContent = money(save);
    $("zg-old").textContent = yuan(oldPay) + " × " + N + " 期";
    $("zg-new").textContent = yuan(newPay);
    $("zg-cut").textContent = cut > 0 ? yuan(cut) + " / 月" : "—";
    $("zg-oldint").textContent = yuan(oldInt);
    $("zg-newint").textContent = yuan(newInt);
    $("zg-mix").textContent = rest > 0
      ? "公积金 " + money(q) + " ＋ 商贷 " + money(rest) + " 元"
      : "全部转公积金 " + money(q) + " 元";
    $("zg-back").textContent = back > 0 ? fmt(back, 1) + " 个月（约 " + fmt(back / 12, 1) + " 年）" : "—";

    if (P <= 0 || N <= 0) {
      $("zg-note").textContent = "填上剩余商贷本金、期数和两个利率，就能看到转成公积金贷款后省多少。";
      return;
    }
    if (save <= 0) {
      $("zg-note").textContent = "公积金利率（" + pct(fr, 2) + "）并不比你的商贷利率（" + pct(r, 2) + "）低，转了不省钱，还白付 "
        + money(cost) + " 元手续费。";
      return;
    }
    $("zg-note").textContent = "这笔钱里有 " + money(q) + " 元能转成公积金贷款（利率 " + pct(fr, 2) + "），"
      + (rest > 0 ? "剩下的 " + money(rest) + " 元仍是商贷（" + pct(r, 2) + "），要按组合贷重新算月供。" : "全部可以转，月供一次降到位。")
      + " 月供从 " + money(oldPay) + " 元降到 " + money(newPay) + " 元，每月少还 " + money(Math.max(0, cut)) + " 元，"
      + "剩余期限里一共少付 " + money(save) + " 元利息；一次性成本 " + money(cost) + " 元大约 "
      + fmt(back, 1) + " 个月回本，所以只要还能住满一年以上就值得办。"
      + " 注意三件事：① 转贷要原银行同意并先结清，多数城市要求过桥资金，这笔短期利息没算在里面；"
      + "② 公积金贷款有额度上限和缴存年限要求，实际能转多少以公积金中心审批为准；"
      + "③ 转成公积金后，原来享受的房贷利息专项附加扣除（每月 1000 元）照样有，不受影响。";
  }

  function calcFundLimit() {
    var target = Math.max(0, num($("fl-target"), 0));
    var bal = Math.max(0, num($("fl-bal"), 0));
    var monthly = Math.max(0, num($("fl-monthly"), 0));
    var mult = Math.max(1, Math.min(40, num($("fl-mult"), 15)));
    var cap = Math.max(0, num($("fl-cap"), 0));
    var rate = Math.max(0, num($("fl-rate"), 2.6)) / 100;
    var yrs = Math.max(1, Math.min(30, Math.round(num($("fl-years"), 30))));
    var n = yrs * 12;

    function loanOf(b) {
      var v = b * mult;
      if (cap > 0) v = Math.min(v, cap);
      return Math.max(0, v);
    }
    function pmtOf(p) { return p > 0 && rate > 0 ? annuityPayment(p, rate / 12, n) : (p > 0 ? p / n : 0); }

    var can = loanOf(bal);
    var needBal = mult > 0 ? (cap > 0 ? Math.min(target, cap) : target) / mult : 0;
    var gap = Math.max(0, needBal - bal);
    var needMonths = gap > 0 ? (monthly > 0 ? Math.ceil(gap / monthly) : Infinity) : 0;
    var after = loanOf(bal + (needMonths === Infinity ? 0 : needMonths * monthly));

    $("fl-can").textContent = money(can);
    $("fl-cover").textContent = target > 0 ? pct(can / target, 1) : "—";
    $("fl-needbal").textContent = yuan(needBal);
    $("fl-gap").textContent = gap > 0 ? yuan(gap) : "已经够了";
    $("fl-months").textContent = gap <= 0 ? "0 个月（现在就能贷）"
      : (needMonths === Infinity ? "按现在的月缴永远补不上（月缴为 0）" : needMonths + " 个月");
    $("fl-after").textContent = yuan(after) + "（月供 " + money(pmtOf(after)) + "）";
    $("fl-pmt").textContent = yuan(pmtOf(can)) + " / 月（" + yrs + " 年）";

    var body = $("fl-body");
    body.innerHTML = "";
    var list = [2000, 3000, 5000, 8000];
    for (var k = 0; k < list.length; k++) {
      var amt = list[k];
      var m = gap > 0 ? (amt > 0 ? Math.ceil(gap / amt) : Infinity) : 0;
      var balThen = bal + (m === Infinity ? 0 : m * amt);
      var lv = loanOf(balThen);
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + money(amt) + "</td><td>" + (m === Infinity ? "—" : m + " 个月")
        + "</td><td>" + money(balThen) + "</td><td>" + money(lv) + "</td>";
      body.appendChild(tr);
    }

    if (target <= 0 || bal <= 0) {
      $("fl-note").textContent = "填上想贷的额度、账户余额和月缴存额，就能看到「按余额能贷多少、还差几个月」，以及每个月要缴多少才追得上。";
      return;
    }
    var note = "公积金贷款额度各地口径不一样，最常见的一条是「可贷 = 账户余额 × 倍数」（倍数一般 10–20 倍，本例取 " + mult
      + "），再叠加一条「个人最高可贷 XX 万」的封顶（本例 " + money(cap) + " 元）。"
      + " 你现在余额 " + money(bal) + " 元 × " + mult + " 倍 = " + money(bal * mult) + " 元，" + (cap > 0 && bal * mult > cap ? "被封顶压到 " + money(cap) + " 元。" : "没碰到封顶。")
      + " 要贷满 " + money(target) + " 元，余额得有 " + money(needBal) + " 元";
    if (gap > 0) {
      note += "，还差 " + money(gap) + " 元；按每月缴存 " + money(monthly) + " 元算，"
        + (needMonths === Infinity ? "月缴为 0 就永远补不上，" : needMonths + " 个月后达标，也就是从今天起还要缴 "
          + needMonths + " 个月，这期间别断缴。")
        + " 想快一点就把月缴提上去（表格里给了月缴 2000/3000/5000/8000 各自要等多久）。";
    } else {
      note += "，你已经够了，可以直接按封顶额度申请。";
    }
    note += " 注意三点：① 多数城市还要求「连续缴存满 6 或 12 个月」才能申请，断缴会重算；"
      + " ② 还要求月供不超过缴存基数的一定比例（常见 50%），所以基数低的时候即使余额够也可能批不下来；"
      + " ③ 公积金利率 " + pct(rate, 2) + " 是政策利率，比商贷低一大截，能贷满就别浪费额度。";
    $("fl-note").textContent = note;
  }

  function calcLoanReal() {
    var P = Math.max(0, num($("lr-p"), 0));
    var r = Math.max(0, num($("lr-rate"), 0)) / 100;
    var n = Math.max(1, Math.round(num($("lr-n"), 12)));
    var fee = Math.max(0, num($("lr-fee"), 0));
    var mgR = Math.min(100, Math.max(0, num($("lr-margin"), 0))) / 100;
    var mgRate = Math.max(0, num($("lr-mrate"), 0)) / 100;
    var mode = $("lr-mode") ? $("lr-mode").value : "amort";

    var i = r / 12, mg = P * mgR, cash = P - fee - mg;
    var pay = mode === "amort" ? annuityPayment(P, i, n) : P * i;
    var cfs = [cash], t;
    for (t = 1; t <= n; t++) {
      var out = pay + (mode === "amort" ? 0 : (t === n ? P : 0));
      if (t === n) out -= mg + mg * mgRate * n / 12;
      cfs.push(-out);
    }
    function npv(rate) {
      var s = 0, k;
      for (k = 0; k < cfs.length; k++) s += cfs[k] / Math.pow(1 + rate, k);
      return s;
    }
    var lo = 1e-9, hi = 0.5, mid, g;
    for (g = 0; g < 200; g++) {
      mid = (lo + hi) / 2;
      if (npv(mid) < 0) lo = mid; else hi = mid;
    }
    var irrM = (lo + hi) / 2, irrY = irrM * 12;
    var totalPay = pay * n + (mode === "amort" ? 0 : 0);
    var grossOut = pay * n + fee + (mg - mg - mg * mgRate * n / 12);
    var costTotal = pay * n - P + fee - mg * mgRate * n / 12;

    $("lr-real").textContent = pct(irrY);
    $("lr-nominal").textContent = pct(r);
    $("lr-gap").textContent = "+" + fmt(irrY * 100 - r * 100, 2) + " 个百分点";
    $("lr-cash").textContent = money(cash) + " 元";
    $("lr-use").textContent = P > 0 ? pct(cash / P) : "—";
    $("lr-pay").textContent = money(pay) + " 元/月" + (mode === "int" ? "（利息，到期另还本 " + money(P) + "）" : "");
    $("lr-total").textContent = money(totalPay) + " 元";
    $("lr-cost").textContent = money(costTotal) + " 元";

    var ns = [12, 24, 36], html = "", j;
    for (j = 0; j < ns.length; j++) {
      var nn = ns[j];
      var pp = mode === "amort" ? annuityPayment(P, i, nn) : P * i;
      var cc = [cash], tt;
      for (tt = 1; tt <= nn; tt++) {
        var o2 = pp + (mode === "amort" ? 0 : (tt === nn ? P : 0));
        if (tt === nn) o2 -= mg + mg * mgRate * nn / 12;
        cc.push(-o2);
      }
      function npv2(rate) { var s = 0, k; for (k = 0; k < cc.length; k++) s += cc[k] / Math.pow(1 + rate, k); return s; }
      var a = 1e-9, b = 0.5, m2, q;
      for (q = 0; q < 200; q++) { m2 = (a + b) / 2; if (npv2(m2) < 0) a = m2; else b = m2; }
      html += '<tr class="' + (nn === n ? "c-info" : "") + '"><td>' + nn + " 期</td><td>" + money(pp) + "</td><td>" + money(pp * nn) + "</td><td>" + pct((a + b) / 2 * 12) + "</td></tr>";
    }
    $("lr-body").innerHTML = html;

    $("lr-note").textContent =
      " 银行报的名义年化 " + pct(r) + "，按现金流折出来的真实年化（IRR）是 " + pct(irrY) + "，差 " + fmt(irrY * 100 - r * 100, 2) + " 个百分点。" +
      " 差在哪：① 服务费 " + money(fee) + " 从放款里先扣，你实际只拿到 " + money(cash) + "（合同额的 " + pct(P > 0 ? cash / P : 0) + "）；" +
      "② 保证金 " + money(mg) + " 被占着，到期才退；③ 等额本息每月还本，本金平均只用了一半时间，利息却按全额收。" +
      " 所以选贷款只看一个数：真实年化 IRR。银行说的「月息 5 厘」「年化 6%」都是名义口径，含费之后往往高 2–4 个点。" +
      " 想压低真实成本：优先选先息后本（本例先息后本比等额本息低，因为本金用得久）、砍服务费、把保证金挪到不占用的产品上；" +
      " 期限越长、费越低，真实年化越接近名义值——短期小额过桥贷款的真实成本通常最惊人。";
  }

export const PANELS = {"combo":"  <section class=\"panel\" id=\"panel-combo\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（等额本息）</h2>\n    <label class=\"f\">\n      <span>商业贷款金额（元）</span>\n      <input id=\"cb-commercial\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"700000\">\n    </label>\n    <label class=\"f\">\n      <span>商贷年利率（%）</span>\n      <input id=\"cb-commercial-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"3.1\">\n    </label>\n    <label class=\"f\">\n      <span>公积金贷款金额（元）</span>\n      <input id=\"cb-fund\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\">\n    </label>\n    <label class=\"f\">\n      <span>公积金年利率（%）</span>\n      <input id=\"cb-fund-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"2.6\">\n      <em>首套 5 年以上公积金贷款利率通常低于商贷约 0.5 个百分点以上</em>\n    </label>\n    <label class=\"f\">\n      <span>贷款年限</span>\n      <input id=\"cb-years\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"30\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">合计月供</span>\n      <strong id=\"cb-pay\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>贷款总额</span><b id=\"cb-total-principal\">—</b></li>\n      <li><span>商贷月供</span><b id=\"cb-c-pay\">—</b></li>\n      <li><span>公积金月供</span><b id=\"cb-f-pay\">—</b></li>\n      <li><span>利息合计</span><b id=\"cb-interest\">—</b></li>\n      <li><span>若全部按商贷利率</span><b id=\"cb-allc\">—</b></li>\n      <li><span>组合贷省下的利息</span><b id=\"cb-save\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"cb-note\"></p>\n  </div>\n    </div>\n  </section>\n","prepay":"  <section class=\"panel\" id=\"panel-prepay\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（按等额本息测算）</h2>\n    <label class=\"f\">\n      <span>当前剩余本金（元）</span>\n      <input id=\"pp-principal\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\">\n    </label>\n    <label class=\"f\">\n      <span>贷款年利率（%）</span>\n      <input id=\"pp-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"3.1\">\n    </label>\n    <label class=\"f\">\n      <span>剩余期数（月）</span>\n      <input id=\"pp-months\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"12\" value=\"240\">\n    </label>\n    <label class=\"f\">\n      <span>本次提前还款金额（元）</span>\n      <input id=\"pp-amount\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\">\n    </label>\n    <label class=\"f\">\n      <span>违约金 / 手续费（元，没有填 0）</span>\n      <input id=\"pp-fee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"0\">\n    </label>\n    <label class=\"f\">\n      <span>银行给的选项</span>\n      <select id=\"pp-mode\">\n        <option value=\"shorten\" selected>缩短期限，月供不变</option>\n        <option value=\"reduce\">减少月供，期限不变</option>\n      </select>\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\" id=\"pp-main-label\">可省利息</span>\n      <strong id=\"pp-save\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>提前还款前月供</span><b id=\"pp-oldpay\">—</b></li>\n      <li><span>提前还款后月供</span><b id=\"pp-newpay\">—</b></li>\n      <li><span>还款期数变化</span><b id=\"pp-months-change\">—</b></li>\n      <li><span>剩余利息（原来 → 现在）</span><b id=\"pp-interest\">—</b></li>\n      <li><span>扣掉违约金后净省</span><b id=\"pp-net\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"pp-note\"></p>\n        <p class=\"jump\" id=\"pp-links\"></p>\n  </div>\n    </div>\n  </section>\n","fund":"  <section class=\"panel\" id=\"panel-fund\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>公积金账户余额（元）</span>\n      <input id=\"fd-balance\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"50000\">\n    </label>\n    <label class=\"f\">\n      <span>每月缴存额（个人+单位，元）</span>\n      <input id=\"fd-monthly\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"2400\">\n    </label>\n    <label class=\"f\">\n      <span>缴存比例（个人+单位，%）</span>\n      <input id=\"fd-ratio\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"2\" value=\"24\">\n      <em>两边各 12% 就填 24；按你实际缴存比例填</em>\n    </label>\n    <label class=\"f\">\n      <span>余额倍数（很多城市 10–20 倍）</span>\n      <input id=\"fd-mult\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"15\">\n    </label>\n    <label class=\"f\">\n      <span>贷款年限（年）</span>\n      <input id=\"fd-years\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"30\">\n    </label>\n    <label class=\"f\">\n      <span>公积金贷款年利率（%）</span>\n      <input id=\"fd-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"2.85\">\n    </label>\n    <label class=\"f\">\n      <span>当地最高限额（元，单人/双人不同）</span>\n      <input id=\"fd-cap\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1200000\">\n    </label>\n    <label class=\"f\">\n      <span>想买的房子总价（元，可留 0）</span>\n      <input id=\"fd-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50000\" value=\"2000000\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果（取各口径最小值）</h2>\n    <div class=\"big\">\n      <span class=\"k\">大致可贷额度</span>\n      <strong id=\"fd-quota\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>口径一：账户余额 × 倍数</span><b id=\"fd-by-balance\">—</b></li>\n      <li><span>口径二：按还款能力反推</span><b id=\"fd-by-income\">—</b></li>\n      <li><span>口径三：当地最高限额</span><b id=\"fd-by-cap\">—</b></li>\n      <li><span>受限于</span><b id=\"fd-limit\">—</b></li>\n      <li><span>按此额度贷款月供</span><b id=\"fd-pay\">—</b></li>\n      <li><span>房款还需自筹（首付+缺口）</span><b id=\"fd-gap\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"fd-note\"></p>\n  </div>\n    </div>\n  </section>\n","lpr":"  <section class=\"panel\" id=\"panel-lpr\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>剩余贷款本金（元）</span>\n      <input id=\"lp-principal\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\">\n    </label>\n    <label class=\"f\">\n      <span>原执行利率（%）</span>\n      <input id=\"lp-old\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"3.90\">\n    </label>\n    <label class=\"f\">\n      <span>新执行利率（%）</span>\n      <input id=\"lp-new\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"3.10\">\n    </label>\n    <label class=\"f\">\n      <span>剩余期数（月）</span>\n      <input id=\"lp-months\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"12\" value=\"240\">\n    </label>\n    <h2 class=\"sub\">LPR + 加点 换算（可选）</h2>\n    <label class=\"f\">\n      <span>LPR（%）与加点（BP，1BP=0.01%）</span>\n      <span class=\"row\">\n        <input id=\"lp-lpr\" type=\"number\" inputmode=\"decimal\" step=\"0.05\" value=\"3.40\">\n        <input id=\"lp-bp\" type=\"number\" inputmode=\"decimal\" step=\"5\" value=\"-30\">\n      </span>\n      <em>执行利率 = LPR + 加点；加点在合同期内一般固定，LPR 每次重定价日才变</em>\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果（等额本息、期限不变）</h2>\n    <div class=\"big\">\n      <span class=\"k\" id=\"lp-save-label\">每月少还</span>\n      <strong id=\"lp-save-month\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>原月供</span><b id=\"lp-old-pay\">—</b></li>\n      <li><span>新月供</span><b id=\"lp-new-pay\">—</b></li>\n      <li><span>剩余总利息（原 → 新）</span><b id=\"lp-interest\">—</b></li>\n      <li><span>剩余期限总共少付</span><b id=\"lp-save-total\">—</b></li>\n      <li><span>LPR+加点 换算出的执行利率</span><b id=\"lp-calc-rate\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"lp-note\"></p>\n  </div>\n    </div>\n  </section>\n","offset":"  <section class=\"panel\" id=\"panel-offset\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>公积金贷款余额（元）</span>\n      <input id=\"of-principal\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\">\n    </label>\n    <label class=\"f\">\n      <span>贷款利率（年，%）</span>\n      <input id=\"of-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"3.1\">\n    </label>\n    <label class=\"f\">\n      <span>剩余期数（月）</span>\n      <input id=\"of-months\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"12\" value=\"240\">\n    </label>\n    <label class=\"f\">\n      <span>公积金账户余额（元）</span>\n      <input id=\"of-acct\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"50000\">\n    </label>\n    <label class=\"f\">\n      <span>每月缴存额（元，可用于还贷部分）</span>\n      <input id=\"of-dep\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"2400\">\n    </label>\n    <label class=\"f\">\n      <span>年冲方式</span>\n      <select id=\"of-mode\">\n        <option value=\"reduce\" selected>减少月供（期限不变）</option>\n        <option value=\"shrink\">缩短期限（月供不变）</option>\n      </select>\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">年冲比月冲少付利息</span>\n      <strong id=\"of-save\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>当前月供（未对冲）</span><b id=\"of-pay\">—</b></li>\n      <li><span>月冲：账户资金能用几个月</span><b id=\"of-runout\">—</b></li>\n      <li><span>月冲：贷款期累计利息</span><b id=\"of-m-int\">—</b></li>\n      <li><span>月冲：自己掏的现金合计</span><b id=\"of-m-cash\">—</b></li>\n      <li><span>年冲：贷款结清期数</span><b id=\"of-y-months\">—</b></li>\n      <li><span>年冲：贷款期累计利息</span><b id=\"of-y-int\">—</b></li>\n      <li><span>年冲：自己掏的现金合计</span><b id=\"of-y-cash\">—</b></li>\n      <li><span>年冲：账户资金共冲本金</span><b id=\"of-y-pre\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"of-note\"></p>\n  </div>\n    </div>\n  </section>\n","repayvs":"  <section class=\"panel\" id=\"panel-repayvs\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>剩余贷款本金（元）</span>\n      <input id=\"rv-principal\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\">\n    </label>\n    <label class=\"f\">\n      <span>贷款利率（年，%）</span>\n      <input id=\"rv-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"3.9\">\n    </label>\n    <label class=\"f\">\n      <span>剩余还款期数（月）</span>\n      <input id=\"rv-months\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"12\" value=\"240\">\n    </label>\n    <label class=\"f\">\n      <span>手里可用于提前还款的钱（元）</span>\n      <input id=\"rv-cash\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\">\n    </label>\n    <label class=\"f\">\n      <span>理财年化收益率（%）</span>\n      <input id=\"rv-invest\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"3\">\n    </label>\n    <label class=\"f\">\n      <span>比较年限（年）</span>\n      <input id=\"rv-years\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"30\" step=\"1\" value=\"10\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">提前还款多出的净资产</span>\n      <strong id=\"rv-diff\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>现在月供</span><b id=\"rv-pay0\">—</b></li>\n      <li><span>提前还后月供（期限不变）</span><b id=\"rv-pay1\">—</b></li>\n      <li><span>每月少还（拿去理财）</span><b id=\"rv-avg\">—</b></li>\n      <li><span>方案A：闲钱理财终值</span><b id=\"rv-fa\">—</b></li>\n      <li><span>方案A：期末仍欠本金</span><b id=\"rv-sa\">—</b></li>\n      <li><span>方案B：每月少还的钱定投终值</span><b id=\"rv-fb\">—</b></li>\n      <li><span>方案B：期末仍欠本金</span><b id=\"rv-sb\">—</b></li>\n      <li><span>方案A 期末净资产（理财 − 欠款）</span><b id=\"rv-na\">—</b></li>\n      <li><span>方案B 期末净资产（定投 − 欠款）</span><b id=\"rv-nb\">—</b></li>\n      <li><span>结论</span><b id=\"rv-verdict\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"rv-note\"></p>\n  </div>\n    </div>\n  </section>\n","loanways":"  <section class=\"panel\" id=\"panel-loanways\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>剩余贷款本金（元）</span>\n      <input id=\"lw-balance\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\">\n    </label>\n    <label class=\"f\">\n      <span>当前年利率（%）</span>\n      <input id=\"lw-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"3.9\">\n    </label>\n    <label class=\"f\">\n      <span>剩余还款期数（月）</span>\n      <input id=\"lw-months\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"12\" value=\"240\">\n    </label>\n    <label class=\"f\">\n      <span>这次提前还多少（元）</span>\n      <input id=\"lw-lump\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\">\n    </label>\n    <label class=\"f\">\n      <span>家庭月收入（元，可选）</span>\n      <input id=\"lw-income\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">缩短期限能省的利息</span>\n      <strong id=\"lw-saveA\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>原来月供 / 剩余期数</span><b id=\"lw-base\">—</b></li>\n      <li><span>原来还要付的利息</span><b id=\"lw-baseint\">—</b></li>\n      <li><span>A 缩期限：还完只需</span><b id=\"lw-monthsA\">—</b></li>\n      <li><span>A 缩期限：省利息</span><b id=\"lw-intA\">—</b></li>\n      <li><span>B 减月供：新月供</span><b id=\"lw-payB\">—</b></li>\n      <li><span>B 减月供：省利息</span><b id=\"lw-intB\">—</b></li>\n      <li><span>A 比 B 多省</span><b id=\"lw-diff\">—</b></li>\n      <li><span>月供占家庭收入（A / B）</span><b id=\"lw-ratio\">—</b></li>\n      <li><span>每 10 万元提前还款省息（A / B）</span><b id=\"lw-per\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"lw-note\"></p>\n  </div>\n    </div>\n  </section>\n","zeroloan":"  <section class=\"panel\" id=\"panel-zeroloan\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>贷款金额（元）</span>\n      <input id=\"zl-amount\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"100000\"></label>\n    <label class=\"f\"><span>分几期（月）</span>\n      <input id=\"zl-months\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"120\" step=\"1\" value=\"24\"></label>\n    <label class=\"f\"><span>手续费 / 服务费（元，一次性）</span>\n      <input id=\"zl-fee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"3000\"></label>\n    <label class=\"f\"><span>全款能拿到的优惠（元）</span>\n      <input id=\"zl-discount\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"5000\"></label>\n    <label class=\"f\"><span>你的钱能拿到的年化（%）</span>\n      <input id=\"zl-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"3\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">真实年化成本</span><strong id=\"zl-real\">—</strong><span class=\"unit\">%</span></div>\n    <ul class=\"kv\">\n      <li><span>名义月供</span><b id=\"zl-pay\">—</b></li>\n      <li><span>手续费相当于本金的</span><b id=\"zl-feepct\">—</b></li>\n      <li><span>手续费相当于几个月月供</span><b id=\"zl-feeapr\">—</b></li>\n      <li><span>总多付（手续费 + 放弃的优惠）</span><b id=\"zl-cost\">—</b></li>\n      <li><span>钱留在手上的收益</span><b id=\"zl-gain\">—</b></li>\n      <li><span>贷款比全款</span><b id=\"zl-net\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"zl-note\"></p>\n  </div>\n    </div>\n  </section>\n","penalty":"  <section class=\"panel\" id=\"panel-penalty\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>剩余贷款本金（元）</span>\n      <input id=\"py-balance\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\"></label>\n    <label class=\"f\"><span>年利率（%）</span>\n      <input id=\"py-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"3.9\"></label>\n    <label class=\"f\"><span>剩余期数（月）</span>\n      <input id=\"py-months\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1\" value=\"240\"></label>\n    <label class=\"f\"><span>这次提前还（元）</span>\n      <input id=\"py-lump\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\"></label>\n    <label class=\"f\"><span>违约金（占提前还款额，%）</span>\n      <input id=\"py-fee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"1\"></label>\n    <label class=\"f\"><span>你的钱能拿到的年化（%）</span>\n      <input id=\"py-invest\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"3\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">净省利息</span><strong id=\"py-net\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>提前还款前的月供</span><b id=\"py-pay\">—</b></li>\n      <li><span>不提前还，剩余利息</span><b id=\"py-int0\">—</b></li>\n      <li><span>提前还（缩期限）后剩余利息</span><b id=\"py-int1\">—</b></li>\n      <li><span>省下的利息</span><b id=\"py-save\">—</b></li>\n      <li><span>违约金</span><b id=\"py-feeamt\">—</b></li>\n      <li><span>等效年化收益（含违约金）</span><b id=\"py-irr\">—</b></li>\n      <li><span>临界：理财收益超过这个数才别还</span><b id=\"py-crit\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"py-note\"></p>\n  </div>\n    </div>\n  </section>\n","zhuan":"  <section class=\"panel\" id=\"panel-zhuan\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>剩余商贷本金（元）</span>\n      <input id=\"zg-balance\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n    <label class=\"f\"><span>剩余期数（月）</span>\n      <input id=\"zg-months\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"12\" value=\"300\"></label>\n    <label class=\"f\"><span>商贷年利率（%）</span>\n      <input id=\"zg-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"3.9\"></label>\n    <label class=\"f\"><span>公积金年利率（%）</span>\n      <input id=\"zg-frate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"2.6\"></label>\n    <label class=\"f\"><span>公积金最多能转多少（元）</span>\n      <input id=\"zg-quota\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50000\" value=\"800000\"></label>\n    <label class=\"f\"><span>转贷一次性成本（元）</span>\n      <input id=\"zg-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"8000\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">省下的利息</span><strong id=\"zg-save\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>原商贷月供</span><b id=\"zg-old\">—</b></li>\n      <li><span>转后月供合计</span><b id=\"zg-new\">—</b></li>\n      <li><span>每月少还</span><b id=\"zg-cut\">—</b></li>\n      <li><span>不转，剩余利息</span><b id=\"zg-oldint\">—</b></li>\n      <li><span>转后剩余利息</span><b id=\"zg-newint\">—</b></li>\n      <li><span>额度怎么分</span><b id=\"zg-mix\">—</b></li>\n      <li><span>一次性成本多久挣回来</span><b id=\"zg-back\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"zg-note\"></p>\n  </div>\n    </div>\n  </section>\n","fundlimit":"  <section class=\"panel\" id=\"panel-fundlimit\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>想贷多少（元）</span>\n      <input id=\"fl-target\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\"></label>\n    <label class=\"f\"><span>公积金账户现有余额（元）</span>\n      <input id=\"fl-bal\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"30000\"></label>\n    <label class=\"f\"><span>每月缴存额（个人＋单位，元）</span>\n      <input id=\"fl-monthly\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"3000\"></label>\n    <label class=\"f\"><span>当地余额倍数（可贷 = 余额 × 倍数）</span>\n      <input id=\"fl-mult\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"40\" step=\"1\" value=\"15\"></label>\n    <label class=\"f\"><span>当地最高可贷额度（元）</span>\n      <input id=\"fl-cap\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\"></label>\n    <label class=\"f\"><span>公积金贷款利率（%）</span>\n      <input id=\"fl-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"2.6\"></label>\n    <label class=\"f\"><span>打算贷多少年</span>\n      <input id=\"fl-years\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"30\" step=\"1\" value=\"30\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">按现在的余额能贷到</span><strong id=\"fl-can\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>占目标的比例</span><b id=\"fl-cover\">—</b></li>\n      <li><span>要贷到目标需要多少余额</span><b id=\"fl-needbal\">—</b></li>\n      <li><span>余额还差</span><b id=\"fl-gap\">—</b></li>\n      <li><span>按现在的月缴还差几个月</span><b id=\"fl-months\">—</b></li>\n      <li><span>补足后能贷（含封顶）</span><b id=\"fl-after\">—</b></li>\n      <li><span>对应月供（等额本息）</span><b id=\"fl-pmt\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>月缴存额</th><th>补足缺口要几个月</th><th>那时账户余额</th><th>那时能贷</th></tr></thead>\n        <tbody id=\"fl-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"fl-note\"></p>\n  </div>\n    </div>\n  </section>\n","loanreal":"  <section class=\"panel\" id=\"panel-loanreal\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（一笔贷款的真实成本）</h2>\n    <label class=\"f\"><span>贷款金额（元）</span>\n      <input id=\"lr-p\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n    <label class=\"f\"><span>名义年利率（%）</span>\n      <input id=\"lr-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"6\"></label>\n    <label class=\"f\"><span>期限（月）</span>\n      <input id=\"lr-n\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"360\" step=\"1\" value=\"12\"></label>\n    <label class=\"f\"><span>一次性服务费 / 管理费（元，放款时扣）</span>\n      <input id=\"lr-fee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"15000\"></label>\n    <label class=\"f\"><span>保证金比例（%，到期退）</span>\n      <input id=\"lr-margin\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"5\"></label>\n    <label class=\"f\"><span>保证金存款年化（%）</span>\n      <input id=\"lr-mrate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"1.5\"></label>\n    <label class=\"f\"><span>还款方式</span>\n      <select id=\"lr-mode\">\n        <option value=\"amort\" selected>等额本息（每月还本付息）</option>\n        <option value=\"int\">先息后本（每月付息，到期还本）</option>\n      </select></label>\n    <em>银行说的「年化 6%」通常不是真实成本：钱到手的少了、又要按月还本</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">真实年化成本（IRR）</span><strong id=\"lr-real\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>名义年化</span><b id=\"lr-nominal\">—</b></li>\n      <li><span>比名义高</span><b id=\"lr-gap\">—</b></li>\n      <li><span>实际到手可用资金</span><b id=\"lr-cash\">—</b></li>\n      <li><span>资金使用率（到手 ÷ 合同额）</span><b id=\"lr-use\">—</b></li>\n      <li><span>每期还款额</span><b id=\"lr-pay\">—</b></li>\n      <li><span>还款总额（含最后退回保证金）</span><b id=\"lr-total\">—</b></li>\n      <li><span>总付出成本（含费、息）</span><b id=\"lr-cost\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>期限</th><th>每期还款</th><th>还款总额</th><th>真实年化</th></tr></thead>\n        <tbody id=\"lr-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"lr-note\"></p>\n  </div>\n    </div>\n  </section>\n"};
export default { combo: calcCombo, prepay: calcPrepay, fund: calcFund, lpr: calcLpr, offset: calcOffset, repayvs: calcRepayVs, loanways: calcLoanWays, zeroloan: calcZeroLoan, penalty: calcPenalty, zhuan: calcZhuan, fundlimit: calcFundLimit, loanreal: calcLoanReal };
