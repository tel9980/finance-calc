/* 自动生成，勿手改：acct-cash 分类模块（点开才下载） */
const { $, CAT_KEY, CAT_LABEL, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, ERR_BOX, FAV_KEY, FIELDS, FIRST_ACTIVATE, KEY, LAST_KEY, MONTH_CATS, MONTH_TABLE, NEXT_OF, PALETTE_EL, PENDING_PARAMS, PRE_KEY, QUOTA_WARNED, RECENT_KEY, SAVE_TIMER, SEARCH_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, TOAST_EL, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, buildTabBadges, calcLoan, calcMap, closePalette, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, diagText, dlJson, doPrint, drawMonthCats, drawMonthStack, drawReportCharts, drawRpMini, drawnMonthlyChart, drawnYearChart, enhanceNums, enhancePanelUi, ensureChunk, evalExpr, favList, fillMonthGrid, fillUnits, flash, flushParams, flushSave, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, lastName, leftAfter, linkTo, loadCmpA, loadSnaps, loanRows, makeSnap, markBadInputs, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numBlur, numFocus, numInput, numKey, numOf, openPalette, palKey, panelEls, panelParams, parseAmounts, parseDate, parseNum, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, prePanels, presets, printCover, pushRecent, pushSearch, quickOf, rateOf, readJsonFile, readMonthGrid, recentList, refreshCounts, refreshTableTools, refreshTrackMods, renderLoanTable, renderNext, renderPalette, renderPresets, renderSearchHist, renderSnapCompare, renderSnapList, renderTrack, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, searchHist, setCat, setSub, setTheme, showErrorBox, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tabCatLabel, tap, taxBy, toast, trimNum, unitFor, updShown, yuan, zOf } = window.FC;

  function calcFunding() {
    var open = Math.max(0, num($("fg-open"), 0));
    var events = [];
    function pushEv(amt, day, name) {
      if (Math.abs(amt) > 0.005) events.push({ amt: amt, day: Math.max(1, Math.min(30, Math.round(day))), name: name });
    }
    var inflow = Math.max(0, num($("fg-in"), 0));
    if (inflow > 0.005) events.push({ amt: inflow, day: Math.max(1, Math.min(30, Math.round(num($("fg-ind"), 25)))), name: "客户回款" });
    pushEv(-Math.max(0, num($("fg-a"), 0)), num($("fg-ad"), 10), "工资社保");
    pushEv(-Math.max(0, num($("fg-b"), 0)), num($("fg-bd"), 15), "供应商货款");
    pushEv(-Math.max(0, num($("fg-c"), 0)), num($("fg-cd"), 20), "税金");
    pushEv(-Math.max(0, num($("fg-d"), 0)), num($("fg-dd"), 5), "其他支出");
    events.sort(function (x, y) { return x.day - y.day; });

    var bal = open, minBal = open, minDay = 0, firstNeg = 0, html = "", net = 0;
    for (var i = 0; i < events.length; i++) {
      bal += events[i].amt;
      net += events[i].amt;
      if (bal < minBal) { minBal = bal; minDay = events[i].day; }
      if (bal < -0.005 && !firstNeg) firstNeg = events[i].day;
      html += "<tr" + (bal < -0.005 ? ' class="c-bad"' : "") + "><td>" + events[i].day + " 日</td><td>" +
        events[i].name + "</td><td>" + (events[i].amt >= 0 ? "+" : "−") + money(Math.abs(events[i].amt)) +
        "</td><td>" + money(bal) + "</td></tr>";
    }
    html += "<tr><td>30 日</td><td><b>月末结存</b></td><td>—</td><td><b>" + money(bal) + "</b></td></tr>";
    $("fg-body").innerHTML = html;

    $("fg-min").textContent = money(minBal);
    $("fg-minday").textContent = minDay ? "第 " + minDay + " 天" : "全程未下探";
    $("fg-gap").textContent = minBal < -0.005 ? yuan(-minBal) : "不需要，余额始终为正";
    $("fg-firstneg").textContent = firstNeg ? "第 " + firstNeg + " 天开始不够付" : "无";
    $("fg-end").textContent = yuan(bal);
    $("fg-net").textContent = (net >= 0 ? "+" : "−") + money(Math.abs(net)) + " 元";

    $("fg-note").textContent = "资金计划按「钱真正进出账户的日期」排，不是发票日期——"
      + "客户说月底付却压到下月 5 号到账，是资金链断掉的典型原因，票期、账期、到账日要分开记。"
      + "月初余额为正、月中却出现负数（本例第 " + (firstNeg || 0) + " 天）说明钱不是不够，是时点错配，"
      + "靠挪付款日、票据贴现或短期授信过桥就能解决，别等到账上真没钱。"
      + "这里没算票据贴现成本、授信提款利息，也没算月初现金之外的可动用额度，实际排期要把这些额度一起标进去。";
  }

  function calcFactoring() {
    var amt = Math.max(0, num($("fc-amt"), 0));
    var days = Math.max(1, Math.round(num($("fc-days"), 90)));
    var rate = Math.max(0, num($("fc-rate"), 0)) / 100;
    var feeR = Math.max(0, num($("fc-fee"), 0)) / 100;
    var marginR = Math.min(100, Math.max(0, num($("fc-margin"), 0))) / 100;
    var loanR = Math.max(0, num($("fc-loan"), 0)) / 100;

    var interest = amt * rate * days / 365;
    var fee = amt * feeR;
    var hold = amt * marginR;
    var cost = interest + fee;
    var netIn = amt - cost - hold;
    var nominal = amt > 0 ? cost / amt * 365 / days : 0;
    var real = netIn > 0 ? cost / netIn * 365 / days : 0;
    var holdCost = hold * rate * days / 365;
    var allin = netIn > 0 ? (cost + holdCost) / netIn * 365 / days : 0;
    var loanCost = amt * loanR * days / 365;
    var diff = cost - loanCost;

    $("fc-net").textContent = money(netIn) + " 元";
    $("fc-int").textContent = money(interest) + " 元";
    $("fc-feeamt").textContent = money(fee) + " 元（" + pct(feeR) + "）";
    $("fc-hold").textContent = money(hold) + " 元";
    $("fc-cost").textContent = money(cost) + " 元";
    $("fc-nominal").textContent = pct(nominal);
    $("fc-real").textContent = pct(real);
    $("fc-allin").textContent = pct(allin);
    $("fc-diff").textContent = (diff >= 0 ? "+" : "") + money(diff) + " 元" + (diff > 0 ? "（保理更贵）" : "（保理更便宜）");

    var terms = [30, 60, 90, 120, 180], html = "", i;
    for (i = 0; i < terms.length; i++) {
      var d = terms[i];
      var c = amt * rate * d / 365 + fee;
      var n = amt - c - hold;
      var nm = amt > 0 ? c / amt * 365 / d : 0;
      var rl = n > 0 ? c / n * 365 / d : 0;
      var hit = d === days;
      html += '<tr class="' + (hit ? "c-info" : "") + '"><td>' + d + " 天" + (hit ? "（本次）" : "") + "</td><td>" + money(c) +
        "</td><td>" + pct(nm) + "</td><td>" + pct(rl) + "</td></tr>";
    }
    $("fc-body").innerHTML = html;

    $("fc-note").textContent =
      " 这笔保理实际到账 " + money(netIn) + " 元，综合成本 " + money(cost) + " 元，折成真实年化 " + pct(real) + "。" +
      "为什么真实年化比名义年化高：① 手续费按应收账款全额一次性收，不按天数摊；② 保证金被扣着但不计息，能用的钱变少了。" +
      " 判断标准：拿真实年化去比自己的替代融资成本（流贷 " + pct(loanR) + "）。本例保理比借流贷多花 " + money(diff) + " 元，" +
      (diff > 0 ? "如果应收质量好、能拿到流贷，就先用流贷。" : "保理反而更便宜，优先做保理。") +
      " 另外三个容易被忽略的点：有追索权保理本质是借款（应收继续挂在表上），无追索权才是真卖断（可以出表）；" +
      "带追索权的话客户不还钱你要回购；保理商还会查买方资信，账期越长、买方越弱，费率越高。" +
      " 表里可以看到：期限越短，手续费被摊得越薄，年化反而越高——所以拿保理给 30 天的应收做短期周转是最贵的。";
  }

  function calcApTalk() {
    var buy = Math.max(0, num($("tn-buy"), 0));
    var now = Math.max(0, num($("tn-now"), 0));
    var target = Math.max(0, num($("tn-target"), 0));
    var rate = Math.max(0, num($("tn-rate"), 0)) / 100;
    var markup = Math.max(0, num($("tn-markup"), 0)) / 100;

    var ext = target - now;
    var occ = ext > 0 ? buy * ext / 30 : 0;
    var gain = occ * rate * ext / 365;
    var cost = buy * markup;
    var net = gain - cost;
    var crit = buy > 0 ? gain / buy : 0;

    $("tn-gain").textContent = money(gain) + " 元/月";
    $("tn-ext").textContent = (ext > 0 ? "+" : "") + ext + " 天" + (ext <= 0 ? "（没延长就不用谈）" : "");
    $("tn-occ").textContent = money(occ) + " 元";
    $("tn-cost").textContent = money(cost) + " 元（" + pct(markup) + "）";
    $("tn-net").textContent = (net >= 0 ? "+" : "") + money(net) + " 元" + (net >= 0 ? "（划算）" : "（不划算）");
    $("tn-crit").textContent = pct(crit);
    $("tn-year").textContent = money(net * 12) + " 元";

    var verdict;
    if (net > 0) verdict = "接受：加价 " + pct(markup) + " 低于可承受上限 " + pct(crit);
    else if (crit > 0) verdict = "不接受：加价 " + pct(markup) + " 高于上限，最多能给到 " + pct(crit) + " 或要求降到 " + money(crit * buy) + " 元/月以内";
    else verdict = "不延长：没有可量的资金收益";
    $("tn-verdict").textContent = verdict;

    var terms = [45, 60, 75, 90], html = "", i;
    for (i = 0; i < terms.length; i++) {
      var d = terms[i], e = d - now;
      var o = e > 0 ? buy * e / 30 : 0;
      var g = o * rate * e / 365;
      var cr = buy > 0 ? g / buy : 0;
      html += '<tr class="' + (d === target ? "c-info" : "") + '"><td>' + d + " 天</td><td>" + money(o) + "</td><td>" + money(g) + "</td><td>" + pct(cr) + "</td></tr>";
    }
    $("tn-body").innerHTML = html;

    $("tn-note").textContent =
      " 账期从 " + now + " 天谈到 " + target + " 天，等于多占用供应商 " + money(occ) + " 元，" +
      "按你的资金成本 " + pct(rate) + " 算，这段无息资金值 " + money(gain) + " 元/月。供应商为此要加价 " + money(cost) + " 元/月，" +
      "净 " + (net >= 0 ? "赚 " : "亏 ") + money(Math.abs(net)) + " 元/月，一年 " + money(net * 12) + " 元。" +
      " 换算成一句能直接谈判的话：加价率只要低于 " + pct(crit) + " 就接，高于就要求打折或用别的方式补（比如免运费、缩短交期、承担包装）。" +
      " 三个提醒：① 这是现金流游戏，不是利润游戏——延长账期不增加利润，只改善现金，供应商加价却是实打实的成本进毛利；" +
      "② 别忘了早付折扣（2/10 net 30 那种）的反面：放弃折扣的年化成本通常远高于资金成本，谈判时先算清折不折得起；" +
      "③ 账期拉长会得罪小供应商（他们也缺钱），把最长账期留给大供应商，小供应商用准时付款换价格。";
  }

  function calcCash13() {
    var open = num($("wk-open"), 0);
    var inflow = Math.max(0, num($("wk-in"), 0));
    var outflow = Math.max(0, num($("wk-out"), 0));
    var e1 = Math.max(0, num($("wk-e1"), 0)), w1 = Math.round(num($("wk-w1"), 0));
    var e2 = Math.max(0, num($("wk-e2"), 0)), w2 = Math.round(num($("wk-w2"), 0));
    var safe = Math.max(0, num($("wk-safe"), 0));

    var bal = open, min = open, minWeek = 0, below = [], html = "", w;
    var totalIn = 0, totalOut = 0;
    for (w = 1; w <= 13; w++) {
      var once = (w === w1 ? -e1 : 0) + (w === w2 ? -e2 : 0);
      var netW = inflow - outflow + once;
      bal += netW;
      totalIn += inflow;
      totalOut += outflow - once;
      if (bal < min) { min = bal; minWeek = w; }
      if (bal < safe) below.push(w);
      html += "<tr" + (bal < safe ? ' class="c-warn"' : "") + "><td>第 " + w + " 周</td><td>" + money(inflow) + "</td><td>" + money(outflow) +
        "</td><td>" + (once === 0 ? "—" : money(once)) + "</td><td>" + money(bal) + "</td></tr>";
    }
    $("wk-body").innerHTML = html;

    var gap = safe - min;
    $("wk-min").textContent = money(min) + " 元";
    $("wk-minw").textContent = "第 " + minWeek + " 周";
    $("wk-below").textContent = below.length + " 周" + (below.length ? "（第 " + below.join("、") + " 周）" : "");
    $("wk-gap").textContent = (gap > 0 ? money(gap) + " 元" : "0 元（没跌破）");
    $("wk-end").textContent = money(bal) + " 元";
    $("wk-net").textContent = (bal - open >= 0 ? "+" : "") + money(bal - open) + " 元";

    var verdict;
    if (min < 0) verdict = "危险：第 " + minWeek + " 周现金会转负，必须提前安排融资或推迟付款";
    else if (gap > 0) verdict = "偏紧：" + below.length + " 周低于安全线，最低点距安全线差 " + money(gap) + " 元，先备好授信额度";
    else verdict = "安全：13 周内始终高于安全线，最低 " + money(min) + " 元";
    $("wk-verdict").textContent = verdict;

    $("wk-note").textContent =
      " 13 周最低现金 " + money(min) + " 元，出现在第 " + minWeek + " 周；期末 " + money(bal) + " 元，13 周净变动 " + money(bal - open) + " 元。" +
      " 这张表的用处不是预测得多准，而是提前看清「哪一周会紧」——现金流危机几乎都是时点错配，不是全年没钱。" +
      " 判断顺序：先看会不会转负（要立刻安排），再看能否守住安全线（备授信），最后看期末是否在改善（结构性失血还是季节性）。" +
      " 三条止血手段按优先级：① 催收（把大客户的收款日往前挪，比融资便宜）；② 谈付款节奏（工资、税金、货款错开同一周）；" +
      "③ 融资（银行授信、票据、保理），这一步放最后，因为最贵。" +
      " 口径提醒：按「钱真正进出账户的日期」排，不是按合同日期；税金和工资是硬时点不能挪；" +
      "已开未收的承兑汇票、已被质押的保证金不算可用现金，别把它们算进期初。";
  }

  function calcBill() {
    var face = Math.max(0, num($("nt-face"), 0));
    var days = Math.max(1, Math.round(num($("nt-days"), 180)));
    var rate = Math.max(0, num($("nt-rate"), 0)) / 100;
    var openR = Math.max(0, num($("nt-openfee"), 0)) / 100;
    var marginR = Math.min(100, Math.max(0, num($("nt-margin"), 0))) / 100;
    var capR = Math.max(0, num($("nt-cap"), 0)) / 100;
    var loanR = Math.max(0, num($("nt-loan"), 0)) / 100;

    var interest = face * rate * days / 360;
    var net = face - interest;
    var openFee = face * openR;
    var mCost = face * marginR * capR * days / 360;
    var total = interest + openFee + mCost;
    var any = face > 0 ? total / face * 360 / days : 0;
    var loanInt = face * loanR * days / 360;
    var save = loanInt - total;

    $("nt-net").textContent = money(net) + " 元";
    $("nt-int").textContent = money(interest) + " 元（按 360 天）";
    $("nt-real").textContent = net > 0 ? pct(interest / net * 360 / days) : "—";
    $("nt-ofee").textContent = money(openFee) + " 元";
    $("nt-mcost").textContent = money(mCost) + " 元";
    $("nt-total").textContent = money(total) + " 元（占票面 " + pct(face > 0 ? total / face : 0) + "）";
    $("nt-any").textContent = pct(any);
    $("nt-loanint").textContent = money(loanInt) + " 元";
    $("nt-save").textContent = (save >= 0 ? "省 " : "贵 ") + money(Math.abs(save)) + " 元";

    var terms = [30, 60, 90, 180, 270, 360], html = "", i;
    for (i = 0; i < terms.length; i++) {
      var d = terms[i];
      var it = face * rate * d / 360;
      var t = it + openFee + face * marginR * capR * d / 360;
      var a = face > 0 ? t / face * 360 / d : 0;
      html += '<tr class="' + (d === days ? "c-info" : "") + '"><td>' + d + " 天</td><td>" + money(it) + "</td><td>" + money(face - it) +
        "</td><td>" + pct(a) + "</td></tr>";
    }
    $("nt-body").innerHTML = html;

    $("nt-note").textContent =
      " 票面 " + money(face) + " 元的票据，贴现息 " + money(interest) + "，实际到账 " + money(net) + "，贴现这一段折年化 " + pct(interest / (net || 1) * 360 / days) + "。" +
      " 但开票环节还有两块成本：手续费 " + money(openFee) + "（按票面、一次性）、保证金 " + money(face * marginR) + " 被银行占着，按你的资金成本折 " + money(mCost) + "。" +
      " 加上这两块，票据全链条折年化 " + pct(any) + "，和同期借流贷 " + pct(loanR) + " 比" + (save >= 0 ? "省 " + money(save) : "贵 " + money(Math.abs(save))) + " 元。" +
      " 三个实务点：① 贴现按 360 天计息，别用 365 天算；② 银行承兑汇票信用好、贴现率低，商票贴现率通常高出一大截，还要看开票人资质；" +
      "③ 保证金比例是隐形成本——30% 保证金意味着你实际只拿到 70% 的钱，却付了 100% 的手续费。" +
      " 决策口诀：票据成本要比的是「不贴现、等到期的机会成本」或「流贷利率」，不是比票面。";
  }

  function calcSettleWay() {
    var amt = Math.max(0, num($("sw-amt"), 0));
    var mon = Math.max(0, num($("sw-mon"), 0));
    var r = Math.max(0, num($("sw-rate"), 0)) / 100;
    var disc = Math.min(1, Math.max(0, num($("sw-disc"), 0)) / 100);
    var bank = Math.max(0, num($("sw-bank"), 0)) / 100;
    var com = Math.max(0, num($("sw-com"), 0)) / 100;
    var bd = Math.max(0, num($("sw-bd"), 0)) / 100;
    var cd = Math.max(0, num($("sw-cd"), 0)) / 100;
    var f = mon / 12;
    var df = 1 + r * f;

    function pvEnd(x) { return df > 0 ? x / df : x; }
    var base = pvEnd(amt);
    var payDisc = amt * (1 - disc);
    var payBank = amt * (1 + bank);
    var payCom = amt * (1 + com);

    var cases = [
      ["立即付（享 " + pct(disc, 1) + " 折扣）", payDisc, payDisc, 0],
      ["现汇立即付（无折扣）", amt, amt, 0],
      ["银行承兑 " + fmt(mon, 0) + " 个月", payBank, pvEnd(payBank), f],
      ["商业承兑 " + fmt(mon, 0) + " 个月", payCom, pvEnd(payCom), f],
      ["月结 " + fmt(mon, 0) + " 个月（基准）", amt, base, f]
    ];

    var best = 0, i;
    for (i = 0; i < cases.length; i++) if (cases[i][2] < cases[best][2]) best = i;

    var html = "";
    for (i = 0; i < cases.length; i++) {
      var chg = cases[i][2] - base;
      var cls = i === best ? ' class="c-info"' : (chg > 0 ? ' class="c-warn"' : "");
      html += "<tr" + cls + "><td>" + cases[i][0] + (i === best ? " ◀ 最省" : "") + "</td><td>" +
        money(cases[i][1]) + "</td><td>" + money(cases[i][2]) + "</td><td>" +
        (chg === 0 ? "基准" : (chg > 0 ? "+" : "") + money(chg)) + "</td></tr>";
    }
    $("sw-body").innerHTML = html;

    var discRate = f > 0 ? disc / (1 - disc) / f : NaN;
    var gap = payDisc - base;

    $("sw-big").textContent = money(Math.abs(gap));
    $("sw-discrate").textContent = isFinite(discRate) ? pct(discRate) : "—";
    $("sw-cost").textContent = pct(r);
    $("sw-verdict").textContent = !isFinite(discRate) ? "—"
      : (discRate > r ? "该提前付（折扣收益高于资金成本）" : "别为折扣提前付（折扣收益低于资金成本）");
    $("sw-base").textContent = yuan(base);
    $("sw-bankdisc").textContent = yuan(payBank * bd * f);
    $("sw-comdisc").textContent = yuan(payCom * cd * f);
    $("sw-bankgap").textContent = yuan(pvEnd(payBank) - base);
    $("sw-comgap").textContent = yuan(pvEnd(payCom) - base);

    $("sw-note").textContent =
      " 比法：把每种方式的钱都折算到「现在」这个时点（单利、按 " + fmt(f * 12, 0) + " 个月 / 12 计），再看谁便宜。" +
      " 现汇折扣这笔：拿到 " + pct(disc, 1) + " 折扣相当于年化 " + (isFinite(discRate) ? pct(discRate) : "—") +
      "，" + (isFinite(discRate) && discRate > r ? "高于" : "低于") + "你的资金成本 " + pct(r) +
      "，所以" + (isFinite(discRate) && discRate > r ? "值得提前付" : "不值得为折扣提前付款") +
      "，月结反而" + (gap >= 0 ? "省 " + yuan(gap) : "多花 " + yuan(-gap)) + "。" +
      " 票据这头：开票加价只是名义，真正的钱是供应商拿去贴现的利息——银承 " +
      yuan(payBank * bd * f) + "、商承 " + yuan(payCom * cd * f) +
      "，商承贴现率高是因为它是企业信用、不是银行信用，供应商往往还要再加价或直接拒收。" +
      " 口径提醒：贴现一般按 360 天计息；银承还有开票手续费和保证金占用，这部分没算进加价里，实际成本会更高；" +
      "反过来，如果你自己是收票方，收到的票要贴现，同样按这个成本从毛利里扣。";
  }

  function calcCreditLine() {
    var sales = Math.max(0, num($("crd-sales"), 0));
    var net = Math.max(0, num($("crd-net"), 0));
    var coll = Math.max(0, num($("crd-coll"), 0));
    var collRate = Math.min(1, Math.max(0, num($("crd-collrate"), 0)) / 100);
    var creditRate = Math.max(0, num($("crd-creditrate"), 0)) / 100;
    var guar = Math.max(0, num($("crd-guar"), 0));
    var used = Math.max(0, num($("crd-used"), 0));
    var need = Math.max(0, num($("crd-need"), 0));

    var c1 = coll * collRate;
    var c2 = sales * creditRate;
    var total = c1 + c2 + guar;
    var avail = Math.max(0, total - used);
    var cover = need > 0 ? avail / need : NaN;
    var space = Math.max(0, net * 0.7 - used);
    var extra = collRate > 0 ? Math.max(0, need * 2 - avail) / collRate : NaN;
    var collShare = total > 0 ? c1 / total : NaN;
    var flex = !isFinite(collShare) ? "—"
      : (collShare > 0.6 ? "偏重抵押，想再扩额得先加抵押物" : (collShare < 0.35 ? "信用额度为主，注意银行抽贷" : "抵押与信用较均衡"));

    $("crd-big").textContent = money(avail);
    $("crd-c1").textContent = yuan(c1);
    $("crd-c2").textContent = yuan(c2);
    $("crd-c3").textContent = yuan(guar);
    $("crd-total").textContent = yuan(total);
    $("crd-split").textContent = money(used) + " / " + money(avail) + " 元";
    $("crd-cover").textContent = isFinite(cover) ? fmt(cover, 2) + " 倍" : "—";
    $("crd-space").textContent = yuan(space);
    $("crd-extra").textContent = isFinite(extra) ? yuan(extra) : "—";
    $("crd-flex").textContent = flex;

    var rows = [
      ["抵押类（房产/土地/设备）", yuan(c1), "评估 " + money(coll) + " × 抵押率 " + pct(collRate, 0)],
      ["信用类（看流水与报表）", yuan(c2), "销售 " + money(sales) + " × 系数 " + pct(creditRate, 0)],
      ["保证类（担保公司/股东）", yuan(guar), "按可增额度直接取数"],
      ["理论总额", yuan(total), "三类相加，实际以银行审批为准"],
      ["已用授信", yuan(used), total > 0 ? "占总额 " + pct(used / total, 0) : "—"],
      ["可用余额", yuan(avail), isFinite(cover) ? "可覆盖月均需求 " + fmt(cover, 2) + " 倍" : "—"]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var bad = i === 5 && isFinite(cover) && cover < 1;
      html += "<tr" + (bad ? ' class="c-warn"' : "") + "><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td></tr>";
    }
    $("crd-body").innerHTML = html;

    $("crd-note").textContent =
      " 结论怎么用：理论总额 " + yuan(total) + "、已用 " + yuan(used) + "，手上还有 " + yuan(avail) +
      (isFinite(cover) ? "，能顶 " + fmt(cover, 2) + " 个月的月均资金需求" : "") + "。" +
      (isFinite(cover) && cover < 1 ? " 覆盖不到 1 倍，属于偏紧，先把回款节奏和付款周期捋一遍，再谈扩额。" : " 覆盖超过 1 倍，短期不缺，重点转到额度的期限结构和成本上。") +
      " 注意三点：① 抵押率各行不同，房产常见 50%–70%、厂房土地更低，设备要打折且不好处置；" +
      "② 信用额度几乎都盯着销售收入和纳税流水，报表一旦下滑银行会缩额甚至抽贷，这是中小企业最常见的断粮方式；" +
      "③ 净资产 70% 的负债率是常见的内部风控线，本例还能新增 " + yuan(space) +
      "，超了即使有抵押物也难批。" +
      " 想覆盖 2 倍需求，按当前抵押率还需再拿出 " + (isFinite(extra) ? yuan(extra) : "—") + " 的抵押物评估值。";
  }

  function calcFxGain() {
    var usd = Math.max(0, num($("fxg-usd"), 0));
    var rs = Math.max(0, num($("fxg-signed"), 0));
    var rb = Math.max(0, num($("fxg-book"), 0));
    var rp = Math.max(0, num($("fxg-spot"), 0));
    var spread = Math.max(0, num($("fxg-spread"), 0)) / 100;
    var fwd = Math.max(0, num($("fxg-fwd"), 0));

    var signedOut = usd * rs;
    var bookOut = usd * rb;
    var spotOut = usd * rp;
    var fee = spotOut * spread;
    var cash = spotOut - fee;
    var pnl = spotOut - bookOut;
    var loss = spotOut - signedOut;
    var fwdOut = usd * fwd;
    var fwdGain = fwdOut - spotOut;
    var exp = spotOut * 0.01;

    $("fxg-big").textContent = (pnl >= 0 ? "+" : "−") + money(Math.abs(pnl));
    $("fxg-signedout").textContent = yuan(signedOut);
    $("fxg-spotout").textContent = yuan(spotOut);
    $("fxg-loss").textContent = (loss >= 0 ? "+" : "−") + money(Math.abs(loss)) + " 元";
    $("fxg-bookout").textContent = yuan(bookOut);
    $("fxg-fee").textContent = yuan(fee);
    $("fxg-cash").textContent = yuan(cash);
    $("fxg-fwdout").textContent = (fwdGain >= 0 ? "+" : "−") + money(Math.abs(fwdGain)) + " 元";
    $("fxg-exp").textContent = yuan(exp);

    var rows = [
      ["签约 / 报价汇率", fmt(rs, 4), yuan(signedOut), "—"],
      ["账面记账汇率", fmt(rb, 4), yuan(bookOut), (bookOut - signedOut >= 0 ? "+" : "−") + money(Math.abs(bookOut - signedOut))],
      ["收款日即期汇率", fmt(rp, 4), yuan(spotOut), (loss >= 0 ? "+" : "−") + money(Math.abs(loss))],
      ["远期锁汇价", fmt(fwd, 4), yuan(fwdOut), (fwdOut - signedOut >= 0 ? "+" : "−") + money(Math.abs(fwdOut - signedOut))],
      ["实际到账（扣点差）", "—", yuan(cash), (cash - signedOut >= 0 ? "+" : "−") + money(Math.abs(cash - signedOut))]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var bad = (i === 2 && loss < 0) || (i === 4 && cash < signedOut);
      html += "<tr" + (bad ? ' class="c-warn"' : "") + "><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td>" + rows[i][3] + "</td></tr>";
    }
    $("fxg-body").innerHTML = html;

    $("fxg-note").textContent =
      " 两笔账别混：① 汇兑损益是 " + (pnl >= 0 ? "收益 " : "损失 ") + yuan(Math.abs(pnl)) +
      "——账面按 " + fmt(rb, 4) + " 记的应收 " + yuan(bookOut) + "，实际按 " + fmt(rp, 4) + " 收，差额进财务费用；" +
      "② 相对当初报价 " + fmt(rs, 4) + " 少了 " + yuan(Math.abs(loss)) +
      "，这才是生意层面真正被吃掉的毛利，报价时若按 " + fmt(rs, 4) + " 算利润，这笔等于白干一部分。" +
      " 结汇点差 " + pct(spread) + " 又吃掉 " + yuan(fee) + "，实际到账 " + yuan(cash) + "。" +
      " 怎么防：汇率每波动 1%，这笔业务的敞口就是 " + yuan(exp) +
      "；超过毛利一半的单子就该锁汇。远期按 " + fmt(fwd, 4) + " 锁住能多拿 " + yuan(Math.abs(fwdGain)) +
      "（本例相当于把不确定性换成确定收益），期权则保留下行保护但要先付权利金。" +
      " 口径提醒：外币货币性项目期末按即期汇率折算，差额进财务费用—汇兑损益；" +
      "收到的美元若留在账户上不结汇，汇率变动会继续影响账面，这也是常见的「利润被汇率吃掉」的来源。";
  }

  function calcTrPrice() {
    var cost = Math.max(0, num($("tp-cost"), 0));
    var price = Math.max(0, num($("tp-price"), 0));
    var inner = Math.max(0, num($("tp-inner"), 0));
    var ra = Math.min(1, Math.max(0, num($("tp-ratea"), 0) / 100));
    var rb = Math.min(1, Math.max(0, num($("tp-rateb"), 0) / 100));
    var lo = Math.max(0, num($("tp-lo"), 0) / 100);
    var hi = Math.max(0, num($("tp-hi"), 0) / 100);

    function part(x) {
      var pa = x - cost, pb = price - x;
      return { pa: pa, pb: pb, ta: pa * ra, tb: pb * rb, tt: pa * ra + pb * rb };
    }
    var now = part(inner);
    var lowP = cost * (1 + lo), highP = cost * (1 + hi);
    var atLow = part(lowP), atHigh = part(highP);
    var best = Math.min(atLow.tt, atHigh.tt);
    var save = now.tt - best;
    var per = 100 * (ra - rb);

    $("tp-big").textContent = fmt(now.tt, 2);
    $("tp-a").textContent = fmt(now.pa, 2) + " / " + fmt(now.ta, 2) + " 万元";
    $("tp-b").textContent = fmt(now.pb, 2) + " / " + fmt(now.tb, 2) + " 万元";
    $("tp-profit").textContent = fmt(price - cost, 2) + " 万元（定价怎么变都不变）";
    $("tp-rate").textContent = price > cost ? pct(now.tt / (price - cost), 2) : "—";
    $("tp-low").textContent = fmt(lowP, 2) + " 万元（税负 " + fmt(atLow.tt, 2) + "）";
    $("tp-high").textContent = fmt(highP, 2) + " 万元（税负 " + fmt(atHigh.tt, 2) + "）";
    $("tp-save").textContent = save > 0 ? "省 " + fmt(save, 2) + " 万元" : "当前定价已在区间内较优点";
    $("tp-per").textContent = (per >= 0 ? "省 " : "多交 ") + fmt(Math.abs(per), 2) + " 万元（税率差 " + pct(Math.abs(ra - rb), 0) + "）";

    var rows = [], pts = [lowP, inner, highP, price];
    for (var i = 0; i < pts.length; i++) {
      var q = part(pts[i]);
      rows.push([fmt(pts[i], 2), q.ta, q.tb, q.tt]);
    }
    var html = "";
    for (var j = 0; j < rows.length; j++) {
      html += "<tr" + (j === 1 ? ' class="c-info"' : (j === 0 ? ' class="c-soft"' : "")) + "><td>" + rows[j][0] + "</td><td>"
        + fmt(rows[j][1], 2) + "</td><td>" + fmt(rows[j][2], 2) + "</td><td>" + fmt(rows[j][3], 2) + "</td></tr>";
    }
    $("tp-body").innerHTML = html;

    $("tp-note").textContent = "集团赚的总额是 " + fmt(price - cost, 2) + " 万元，一分不会变；能被「安排」的只有这些利润在哪个税率下交税。"
      + "把利润往低税率一方挪，每挪 100 万元省 " + fmt(Math.abs(per), 2) + " 万元（等于两边税率差）。"
      + "但定价必须有支持：成本加成法要能说明加成率的可比性，否则税务机关有权按合理方法核定，补税还加利息；"
      + "跨境还要叠加关税、预提所得税（股息 10%、利息/特许权 10% 或协定优惠）和同期资料准备义务，别只盯企业所得税。";
  }

  function calcPooling() {
    var idle = Math.max(0, num($("pool-idle"), 0));
    var sa = Math.max(0, num($("pool-a"), 0));
    var sb = Math.max(0, num($("pool-b"), 0));
    var inR = Math.max(0, num($("pool-in"), 0)) / 100;
    var outR = Math.max(0, num($("pool-out"), 0)) / 100;
    var demand = Math.max(0, num($("pool-demand"), 0)) / 100;
    var pr = Math.min(1, Math.max(0, num($("pool-rate"), 100) / 100));
    var wealth = Math.max(0, num($("pool-wealth"), 0)) / 100;
    var equity = Math.max(0, num($("pool-equity"), 0));

    var pooled = idle * pr;
    var loans = Math.min(pooled, sa + sb);
    var want = sa + sb;
    var intIn = loans * inR;
    var save = loans * outR - loans * demand;
    var rest = Math.max(0, pooled - loans);
    var restIncome = rest * wealth;
    var total = save + restIncome;
    var ratio = equity > 0 ? loans / equity : 0;
    var cap = equity * 2;

    $("pool-big").textContent = (total >= 0 ? "" : "−") + money(Math.abs(total));
    $("pool-pooled").textContent = yuan(pooled) + "（可归集 " + pct(pr, 0) + "）";
    $("pool-loans").textContent = yuan(loans) + (loans < want ? "（缺口 " + money(want - loans) + " 元仍要外部融资）" : "（缺口已全覆盖）");
    $("pool-int").textContent = yuan(intIn) + "（A " + money(sa * inR) + " / B " + money(sb * inR) + "）";
    $("pool-rest").textContent = yuan(restIncome) + "（闲置 " + money(rest) + " 元 × " + pct(wealth, 1) + "）";
    $("pool-all").textContent = yuan(total) + " / " + pct(idle > 0 ? total / idle : 0, 2);
    $("pool-ratio").textContent = fmt(ratio, 2) + " 倍（上限 2 倍，即 " + money(cap) + " 元）";
    $("pool-verdict").textContent = ratio <= 2
      ? "利息可全额税前扣除"
      : "超债资比：超额 " + money(loans - cap) + " 元对应利息不得扣除";

    var rows = [
      ["母公司归集闲置资金", money(pooled), "—", "转入资金池"],
      ["子公司 A 内部借款", money(Math.min(sa, loans)), pct(inR, 2), money(Math.min(sa, loans) * inR)],
      ["子公司 B 内部借款", money(Math.min(sb, Math.max(0, loans - sa))), pct(inR, 2), money(Math.min(sb, Math.max(0, loans - sa)) * inR)],
      ["对照：外部流贷同额", money(loans), pct(outR, 2), money(loans * outR)],
      ["剩余资金理财", money(rest), pct(wealth, 2), money(restIncome)]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 3 ? ' class="c-warn"' : (i === 4 ? ' class="c-info"' : "")) + "><td class=\"tal\">" + rows[i][0]
        + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td>" + rows[i][3] + "</td></tr>";
    }
    $("pool-body").innerHTML = html;

    $("pool-note").textContent = "资金池的收益不是「子公司付的利息」——那笔钱在集团合并报表里会互相抵销，等于没赚。真正赚的是"
      + "「子公司少付外部利息 − 母公司闲置资金本来能赚的那点活期」，本例差额主要来自这个利差。"
      + "税务上要盯两点：一是关联方借款利息必须符合独立交易原则（利率要有可比依据、要有借款合同和资金流水），"
      + "二是债资比 2:1（金融企业 5:1）超限部分利息不得扣除。另外资金池要做成「委托贷款」或持牌财务公司模式，"
      + "直接划转在部分地区和银行会被认定为无真实交易背景。";
  }

  function calcCreditLimit() {
    var buy = Math.max(0, num($("crl-buy"), 0));
    var term = Math.max(0, num($("crl-term"), 0));
    var vat = Math.max(0, num($("crl-vat"), 0)) / 100;
    var gm = Math.min(1, Math.max(0, num($("crl-gm"), 0) / 100));
    var netw = Math.max(0, num($("crl-netw"), 0));
    var lev = Math.min(1, Math.max(0, num($("crl-lev"), 0) / 100));
    var late = Math.max(0, num($("crl-late"), 0));
    var cost = Math.max(0, num($("crl-cost"), 0)) / 100;

    var ar = buy * (1 + vat) / 365 * term;
    var arCost = ar * cost;
    var gross = buy * gm;
    var mult = arCost > 0 ? gross / arCost : 0;

    var c1 = buy * 0.2, c2 = netw * 0.1, c3 = ar * 1.2;
    var limit = Math.min(c1, c2, c3);

    var score = 100;
    if (lev > 0.7) score -= 20; else if (lev >= 0.6) score -= 10;
    score -= Math.floor(late / 2) * 10;
    if (late >= 3) score -= 10;
    var pd = 0.01 + late * 0.01 + (lev > 0.7 ? 0.02 : 0);
    var el = limit * pd;

    $("crl-big").textContent = money(limit);
    $("crl-ar").textContent = yuan(ar) + "（含税销售 ÷ 365 × " + fmt(term, 0) + " 天）";
    $("crl-cost2").textContent = yuan(arCost);
    $("crl-mult").textContent = fmt(mult, 2) + " 倍" + (mult < 5 ? "（薄，扛不住拖欠）" : "（厚，值得放）");
    $("crl-score").textContent = fmt(Math.max(0, score), 0) + " 分（负债率 " + pct(lev, 0) + "，逾期 " + fmt(late, 0) + " 次）";
    $("crl-pd").textContent = pct(pd, 2);
    $("crl-el").textContent = yuan(el);
    $("crl-verdict").textContent = gross > el * 5
      ? "可放：" + fmt(mult, 1) + " 倍毛利覆盖，预期损失只占毛利 " + pct(gross > 0 ? el / gross : 0, 2)
      : "谨慎：预期损失已接近毛利，要求预付或提供担保/信保";

    var rows = [
      ["年采购额的 20%", money(buy) + " × 20%", money(c1)],
      ["客户净资产的 10%", money(netw) + " × 10%", money(c2)],
      ["账期占用的 1.2 倍", money(ar) + " × 1.2", money(c3)],
      ["取最小 → 建议额度", "min(以上三项)", money(limit)]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 3 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td class=\"tal\">" + rows[i][1] + "</td><td>" + rows[i][2] + "</td></tr>";
    }
    $("crl-body").innerHTML = html;

    $("crl-note").textContent = "额度不是拍出来的，是三条硬约束里最小的那条：他一年能买多少（20%）、他自己有多少底子（净资产 10%）、"
      + "以及他占你多少钱（应收占用的 1.2 倍）。真正决定赚不赚的是「毛利 ÷ 占用成本」——"
      + "毛利薄的生意，一笔坏账能吃掉好几单的利润。放账期前先查两样：涉诉与被执行记录、有没有拖欠别家的货款。"
      + "有条件的话，要求客户提供担保、投保信用险，或者做有追索权保理，把风险先转移出去再谈额度。";
  }

  function calcPledgeLoan() {
    var ar = num($("plg-ar"), 0), ratio = num($("plg-ratio"), 0) / 100;
    var rate = num($("plg-rate"), 0) / 100, days = Math.max(1, num($("plg-days"), 90));
    var feeRate = num($("plg-fee"), 0) / 100, fact = num($("plg-fact"), 0) / 100;
    var amt = ar * ratio;
    var interest = amt * rate * days / 360;
    var fee = amt * feeRate;
    var tot = interest + fee;
    var real = amt > 0 ? tot / amt * 360 / days : 0;
    var factCost = ar * fact * days / 360;
    var diff = factCost - tot;
    var rest = ar - amt;
    $("plg-big").textContent = fmt(real * 100, 2);
    $("plg-amt").textContent = money(amt) + " 元（" + pct(ratio, 0) + " × " + money(ar) + "）";
    $("plg-int").textContent = money(interest) + " 元";
    $("plg-feeout").textContent = money(fee) + " 元";
    $("plg-tot").textContent = money(tot) + " 元";
    $("plg-factout").textContent = money(factCost) + " 元（按 " + pct(fact, 2) + " 全额计息）";
    $("plg-diff").textContent = (diff >= 0 ? "保理多花 " : "保理少花 ") + money(Math.abs(diff)) + " 元";
    $("plg-rest").textContent = money(rest) + " 元（" + pct(1 - ratio, 2) + "）";
    $("plg-note").textContent = (diff >= 0 ? "这笔业务质押贷款更便宜，省 " + money(diff) + " 元。" : "这笔业务保理反而更便宜，因为保理能按全额融资、把更多应收账款变成现金。")
      + "两者的差别不只在利率：质押是「借钱」，应收账款还在你账上、要继续催收、要计提坏账，"
      + "贷款到期必须还；保理是「卖债权」，无追索权保理才能出表（拿到银行的放弃追索确认），"
      + "有追索权的保理实质仍是融资、不能出表还要确认负债。"
      + "另外质押率通常 70%–90%，剩下一截仍压在自己身上，客户回款直接进监管账户、挪用会被认定违规。";
  }

  function calcLeaseBuy() {
    var price = num($("lbu-price"), 0), rent = num($("lbu-rent"), 0);
    var n = Math.max(1, Math.round(num($("lbu-years"), 8)));
    var r = num($("lbu-rate"), 0) / 100, tax = num($("lbu-tax"), 0) / 100;
    var maint = num($("lbu-maint"), 0), resid = num($("lbu-resid"), 0);
    var pvaf = r > 0 ? (1 - Math.pow(1 + r, -n)) / r : n;
    var dfN = Math.pow(1 + r, -n);
    var lseAT = rent * (1 - tax);
    var lsePV = lseAT * pvaf;
    var dep = price / n;
    var shieldPV = dep * tax * pvaf;
    var maintPV = maint * (1 - tax) * pvaf;
    var residNet = resid * (1 - tax);
    var residPV = residNet * dfN;
    var buyPV = price + maintPV - shieldPV - residPV;
    var diff = buyPV - lsePV;
    var crit = pvaf > 0 ? buyPV / ((1 - tax) * pvaf) : 0;
    $("lbu-big").textContent = money(Math.abs(diff)) + (diff >= 0 ? "（租赁更省）" : "（购买更省）");
    $("lbu-lse").textContent = money(lseAT) + " / " + money(lsePV) + " 元";
    $("lbu-buy").textContent = money(buyPV) + " 元（买价 " + money(price) + " ＋ 维护 " + money(maintPV) + " − 税盾 " + money(shieldPV) + " − 残值 " + money(residPV) + "）";
    $("lbu-shield").textContent = money(shieldPV) + " 元（年折旧 " + money(dep) + " × " + pct(tax, 0) + "）";
    $("lbu-mr").textContent = money(maintPV) + " / " + money(residPV) + " 元（残值税后 " + money(residNet) + "）";
    $("lbu-crit").textContent = money(crit) + " 元/年（超过这个租金就该买）";
    $("lbu-note").textContent = "比的是「税后现金流现值」，不是租金总额和买价：租赁租金当期全额可扣税，"
      + "购买的钱要通过每年折旧慢慢抵税（税盾现值 " + money(shieldPV) + "），期末残值还要交处置所得税。"
      + "本案例租赁现值 " + money(lsePV) + " vs 购买现值 " + money(buyPV) + "，" + (diff >= 0 ? "租赁更省 " : "购买更省 ")
      + money(Math.abs(diff)) + " 元；临界年租金 " + money(crit) + " 元。"
      + "真正决定胜负的是折现率与残值假设：折现率高、残值低、租期短，租赁更容易赢；"
      + "能拿到加速折旧或一次性税前扣除优惠、且残值高的资产，购买通常更划算。别忘了租赁还有额度占用、"
      + "提前解约罚则和资产不归自己的问题，购买则压现金流、占授信。";
  }

export const PANELS = {"funding":"  <section class=\"panel\" id=\"panel-funding\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（本月 30 天资金计划）</h2>\n    <label class=\"f\"><span>月初可用余额（元）</span>\n      <input id=\"fg-open\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"200000\"></label>\n    <label class=\"f\"><span>预计回款金额（元）</span>\n      <input id=\"fg-in\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"600000\"></label>\n    <label class=\"f\"><span>回款到账日（几号）</span>\n      <input id=\"fg-ind\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"30\" step=\"1\" value=\"25\"></label>\n    <label class=\"f\"><span>工资（元）/ 发放日</span>\n      <span class=\"row\"><input id=\"fg-a\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"150000\"><input id=\"fg-ad\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"30\" step=\"1\" value=\"10\"></span></label>\n    <label class=\"f\"><span>货款（元）/ 付款日</span>\n      <span class=\"row\"><input id=\"fg-b\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"300000\"><input id=\"fg-bd\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"30\" step=\"1\" value=\"15\"></span></label>\n    <label class=\"f\"><span>税金（元）/ 缴款日</span>\n      <span class=\"row\"><input id=\"fg-c\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"80000\"><input id=\"fg-cd\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"30\" step=\"1\" value=\"20\"></span></label>\n    <label class=\"f\"><span>其他支出（元）/ 付款日</span>\n      <span class=\"row\"><input id=\"fg-d\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"60000\"><input id=\"fg-dd\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"30\" step=\"1\" value=\"5\"></span></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">本月最低余额</span><strong id=\"fg-min\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>最低余额出现在</span><b id=\"fg-minday\">—</b></li>\n      <li><span>需要提前备的头寸（缺口）</span><b id=\"fg-gap\">—</b></li>\n      <li><span>首次转负的日子</span><b id=\"fg-firstneg\">—</b></li>\n      <li><span>月末余额</span><b id=\"fg-end\">—</b></li>\n      <li><span>当月净流入</span><b id=\"fg-net\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>日期</th><th>事项</th><th>金额</th><th>当日余额</th></tr></thead>\n        <tbody id=\"fg-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"fg-note\"></p>\n  </div>\n    </div>\n  </section>\n","factoring":"  <section class=\"panel\" id=\"panel-factoring\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（一笔应收做保理 / 贴现）</h2>\n    <label class=\"f\"><span>应收账款金额（元）</span>\n      <input id=\"fc-amt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n    <label class=\"f\"><span>距到期还有（天）</span>\n      <input id=\"fc-days\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"90\"></label>\n    <label class=\"f\"><span>保理 / 贴现年化利率（%）</span>\n      <input id=\"fc-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"8\"></label>\n    <label class=\"f\"><span>一次性手续费率（%）</span>\n      <input id=\"fc-fee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"0.8\"></label>\n    <label class=\"f\"><span>保证金扣留比例（%，到期退还不计息）</span>\n      <input id=\"fc-margin\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"10\"></label>\n    <label class=\"f\"><span>不保理改借流贷的年化利率（%）</span>\n      <input id=\"fc-loan\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"6\"></label>\n    <em>手续费按应收账款全额一次性收，所以期限越短、年化越吓人</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">实际到账金额</span><strong id=\"fc-net\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>融资利息</span><b id=\"fc-int\">—</b></li>\n      <li><span>一次性手续费</span><b id=\"fc-feeamt\">—</b></li>\n      <li><span>保证金扣留（到期退）</span><b id=\"fc-hold\">—</b></li>\n      <li><span>综合融资成本</span><b id=\"fc-cost\">—</b></li>\n      <li><span>名义年化（成本 ÷ 全额 × 365 ÷ 天）</span><b id=\"fc-nominal\">—</b></li>\n      <li><span>真实年化（成本 ÷ 实际到账 × 365 ÷ 天）</span><b id=\"fc-real\">—</b></li>\n      <li><span>全口径年化（含保证金占用）</span><b id=\"fc-allin\">—</b></li>\n      <li><span>比借流贷多花</span><b id=\"fc-diff\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>剩余期限</th><th>综合成本</th><th>名义年化</th><th>真实年化</th></tr></thead>\n        <tbody id=\"fc-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"fc-note\"></p>\n  </div>\n    </div>\n  </section>\n","aptalk":"  <section class=\"panel\" id=\"panel-aptalk\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（跟供应商谈账期）</h2>\n    <label class=\"f\"><span>月采购额（元，不含税）</span>\n      <input id=\"tn-buy\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2000000\"></label>\n    <label class=\"f\"><span>现在账期（天）</span>\n      <input id=\"tn-now\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"30\"></label>\n    <label class=\"f\"><span>想谈到（天）</span>\n      <input id=\"tn-target\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"60\"></label>\n    <label class=\"f\"><span>自己的资金年化成本（%）</span>\n      <input id=\"tn-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"6\"></label>\n    <label class=\"f\"><span>供应商要求加价（%）</span>\n      <input id=\"tn-markup\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"1\"></label>\n    <em>账期延长等于向供应商借了一笔无息货款，值不值看能不能盖住加价</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">延长账期带来的资金收益</span><strong id=\"tn-gain\">—</strong><span class=\"unit\">元/月</span></div>\n    <ul class=\"kv\">\n      <li><span>账期能延长</span><b id=\"tn-ext\">—</b></li>\n      <li><span>多占用供应商资金</span><b id=\"tn-occ\">—</b></li>\n      <li><span>加价要多付（按加价率）</span><b id=\"tn-cost\">—</b></li>\n      <li><span>净收益</span><b id=\"tn-net\">—</b></li>\n      <li><span>可接受的最高加价率</span><b id=\"tn-crit\">—</b></li>\n      <li><span>一年下来值多少</span><b id=\"tn-year\">—</b></li>\n      <li><span>结论</span><b id=\"tn-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>谈到</th><th>多占用资金</th><th>资金收益</th><th>可接受最高加价</th></tr></thead>\n        <tbody id=\"tn-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"tn-note\"></p>\n  </div>\n    </div>\n  </section>\n","cash13":"  <section class=\"panel\" id=\"panel-cash13\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（13 周滚动）</h2>\n    <label class=\"f\"><span>期初现金（元）</span>\n      <input id=\"wk-open\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\"></label>\n    <label class=\"f\"><span>每周平均回款（元）</span>\n      <input id=\"wk-in\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\"></label>\n    <label class=\"f\"><span>每周平均付款（元）</span>\n      <input id=\"wk-out\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"280000\"></label>\n    <label class=\"f\"><span>大额支出 1（元）/ 第几周</span>\n      <span class=\"row\"><input id=\"wk-e1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"400000\">\n        <input id=\"wk-w1\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"13\" step=\"1\" value=\"6\"></span></label>\n    <label class=\"f\"><span>大额支出 2（元）/ 第几周</span>\n      <span class=\"row\"><input id=\"wk-e2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\">\n        <input id=\"wk-w2\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"13\" step=\"1\" value=\"10\"></span></label>\n    <label class=\"f\"><span>安全现金线（元）</span>\n      <input id=\"wk-safe\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\"></label>\n    <em>周均回款付款按经验值填，大额支出单独放；真做预测请把已签合同和已承诺付款逐笔列进去</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">13 周内最低现金</span><strong id=\"wk-min\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>最低点出现在</span><b id=\"wk-minw\">—</b></li>\n      <li><span>低于安全线的周数 / 周次</span><b id=\"wk-below\">—</b></li>\n      <li><span>最大缺口（相对安全线）</span><b id=\"wk-gap\">—</b></li>\n      <li><span>13 周末现金</span><b id=\"wk-end\">—</b></li>\n      <li><span>13 周净变动</span><b id=\"wk-net\">—</b></li>\n      <li><span>风险判断</span><b id=\"wk-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>周</th><th>回款</th><th>付款</th><th>一次性</th><th>周末余额</th></tr></thead>\n        <tbody id=\"wk-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"wk-note\"></p>\n  </div>\n    </div>\n  </section>\n","bill":"  <section class=\"panel\" id=\"panel-bill\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（银承 / 商票贴现）</h2>\n    <label class=\"f\"><span>票面金额（元）</span>\n      <input id=\"nt-face\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n    <label class=\"f\"><span>距到期（天）</span>\n      <input id=\"nt-days\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"180\"></label>\n    <label class=\"f\"><span>贴现年化利率（%）</span>\n      <input id=\"nt-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"2.8\"></label>\n    <label class=\"f\"><span>开票手续费率（%，万分之五填 0.05）</span>\n      <input id=\"nt-openfee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"0.05\"></label>\n    <label class=\"f\"><span>开票保证金比例（%）</span>\n      <input id=\"nt-margin\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"30\"></label>\n    <label class=\"f\"><span>自有资金年化成本 / 流贷年化（%）</span>\n      <div class=\"row\">\n        <input id=\"nt-cap\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"6\">\n        <input id=\"nt-loan\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"6\">\n      </div></label>\n    <em>票据贴现按 360 天计息（不是 365），这是行业惯例</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">贴现实际到账</span><strong id=\"nt-net\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>贴现息</span><b id=\"nt-int\">—</b></li>\n      <li><span>贴现实际年化（息 ÷ 到账 × 360 ÷ 天）</span><b id=\"nt-real\">—</b></li>\n      <li><span>开票手续费</span><b id=\"nt-ofee\">—</b></li>\n      <li><span>保证金占用成本</span><b id=\"nt-mcost\">—</b></li>\n      <li><span>票据全链条成本</span><b id=\"nt-total\">—</b></li>\n      <li><span>全成本折年化</span><b id=\"nt-any\">—</b></li>\n      <li><span>同期借流贷的利息</span><b id=\"nt-loanint\">—</b></li>\n      <li><span>开票贴现比流贷</span><b id=\"nt-save\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>剩余期限</th><th>贴现息</th><th>到账</th><th>全成本年化</th></tr></thead>\n        <tbody id=\"nt-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"nt-note\"></p>\n  </div>\n    </div>\n  </section>\n","settleway":"  <section class=\"panel\" id=\"panel-settleway\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（同一笔货款，比四种结算方式）</h2>\n    <label class=\"f\"><span>货款金额（元）</span>\n      <input id=\"sw-amt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n    <label class=\"f\"><span>账期（月）</span>\n      <input id=\"sw-mon\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"6\"></label>\n    <label class=\"f\"><span>你的资金成本（年化 %）</span>\n      <input id=\"sw-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"6\"></label>\n    <label class=\"f\"><span>现汇现金折扣（%）</span>\n      <input id=\"sw-disc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2\"></label>\n    <label class=\"f\"><span>银行承兑开票加价（%）</span>\n      <input id=\"sw-bank\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"1.5\"></label>\n    <label class=\"f\"><span>商业承兑开票加价（%）</span>\n      <input id=\"sw-com\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2\"></label>\n    <label class=\"f\"><span>银承 / 商承贴现年化（%）</span>\n      <span class=\"row\"><input id=\"sw-bd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2.8\">\n        <input id=\"sw-cd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"6\"></span></label>\n    <em>口径：把「什么时候付钱」和「付多少钱」折算到同一个时间点比较，而不是只比名义金额</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">月结比「现汇拿折扣」省</span><strong id=\"sw-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>现金折扣折算年化收益</span><b id=\"sw-discrate\">—</b></li>\n      <li><span>你的资金成本（年化）</span><b id=\"sw-cost\">—</b></li>\n      <li><span>该不该为折扣提前付款</span><b id=\"sw-verdict\">—</b></li>\n      <li><span>月结基准的现值</span><b id=\"sw-base\">—</b></li>\n      <li><span>银承贴现成本（转嫁给供应商）</span><b id=\"sw-bankdisc\">—</b></li>\n      <li><span>商承贴现成本（转嫁给供应商）</span><b id=\"sw-comdisc\">—</b></li>\n      <li><span>银承比月结贵</span><b id=\"sw-bankgap\">—</b></li>\n      <li><span>商承比月结贵</span><b id=\"sw-comgap\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>结算方式</th><th>名义支出</th><th>折现后现值</th><th>相对月结</th></tr></thead>\n        <tbody id=\"sw-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"sw-note\"></p>\n  </div>\n    </div>\n  </section>\n","creditline":"  <section class=\"panel\" id=\"panel-creditline\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（授信测算）</h2>\n    <label class=\"f\"><span>年销售收入（元）</span>\n      <input id=\"crd-sales\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"50000000\"></label>\n    <label class=\"f\"><span>净资产（元）</span>\n      <input id=\"crd-net\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"20000000\"></label>\n    <label class=\"f\"><span>抵押物评估值（元）</span>\n      <input id=\"crd-coll\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"15000000\"></label>\n    <label class=\"f\"><span>抵押率（%）</span>\n      <input id=\"crd-collrate\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"60\"></label>\n    <label class=\"f\"><span>信用额度系数（占销售收入 %）</span>\n      <input id=\"crd-creditrate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"20\"></label>\n    <label class=\"f\"><span>保证担保可增额度（元）</span>\n      <input id=\"crd-guar\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"5000000\"></label>\n    <label class=\"f\"><span>已用授信（元）</span>\n      <input id=\"crd-used\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"12000000\"></label>\n    <label class=\"f\"><span>月均资金需求（元）</span>\n      <input id=\"crd-need\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"8000000\"></label>\n    <em>抵押率、信用系数各行差异大，用你银行给的实际数替换默认值</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">还没用的授信额度</span><strong id=\"crd-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>抵押可贷（评估值 × 抵押率）</span><b id=\"crd-c1\">—</b></li>\n      <li><span>信用可贷（销售收入 × 系数）</span><b id=\"crd-c2\">—</b></li>\n      <li><span>保证担保可增</span><b id=\"crd-c3\">—</b></li>\n      <li><span>理论授信总额</span><b id=\"crd-total\">—</b></li>\n      <li><span>已用 / 可用</span><b id=\"crd-split\">—</b></li>\n      <li><span>能覆盖几个月均需求</span><b id=\"crd-cover\">—</b></li>\n      <li><span>70% 负债率下的新增空间</span><b id=\"crd-space\">—</b></li>\n      <li><span>要覆盖 2 倍需求还需抵押物</span><b id=\"crd-extra\">—</b></li>\n      <li><span>结构评价</span><b id=\"crd-flex\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>额度来源</th><th>可贷金额</th><th>测算依据</th></tr></thead>\n        <tbody id=\"crd-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"crd-note\"></p>\n  </div>\n    </div>\n  </section>\n","fxgain":"  <section class=\"panel\" id=\"panel-fxgain\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（出口收汇）</h2>\n    <label class=\"f\"><span>出口金额（美元）</span>\n      <input id=\"fxg-usd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n    <label class=\"f\"><span>签约 / 报价汇率</span>\n      <input id=\"fxg-signed\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.001\" value=\"7.1\"></label>\n    <label class=\"f\"><span>账面应收记账汇率</span>\n      <input id=\"fxg-book\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.001\" value=\"7.08\"></label>\n    <label class=\"f\"><span>收款日即期汇率</span>\n      <input id=\"fxg-spot\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.001\" value=\"7.05\"></label>\n    <label class=\"f\"><span>结汇点差 / 手续费（%）</span>\n      <input id=\"fxg-spread\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"0.2\"></label>\n    <label class=\"f\"><span>远期锁汇价</span>\n      <input id=\"fxg-fwd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.001\" value=\"7.09\"></label>\n    <em>汇率只作示例，请换成你实际的签约价与收款日价</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">汇兑损益（计入财务费用）</span><strong id=\"fxg-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>签约汇率口径收入</span><b id=\"fxg-signedout\">—</b></li>\n      <li><span>按即期结汇可得</span><b id=\"fxg-spotout\">—</b></li>\n      <li><span>相对签约汇率少收</span><b id=\"fxg-loss\">—</b></li>\n      <li><span>账面应收（记账汇率）</span><b id=\"fxg-bookout\">—</b></li>\n      <li><span>结汇点差成本</span><b id=\"fxg-fee\">—</b></li>\n      <li><span>实际到账人民币</span><b id=\"fxg-cash\">—</b></li>\n      <li><span>做了远期锁汇多得</span><b id=\"fxg-fwdout\">—</b></li>\n      <li><span>汇率每波动 1% 的敞口</span><b id=\"fxg-exp\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>口径</th><th>汇率</th><th>人民币金额</th><th>与签约比</th></tr></thead>\n        <tbody id=\"fxg-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"fxg-note\"></p>\n  </div>\n    </div>\n  </section>\n","pooling":"  <section class=\"panel\" id=\"panel-pooling\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（资金归集与内部借款）</h2>\n    <label class=\"f\"><span>母公司闲置资金（元）</span>\n      <input id=\"pool-idle\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"30000000\"></label>\n    <label class=\"f\"><span>子公司 A / B 资金缺口（元）</span>\n      <span class=\"row\"><input id=\"pool-a\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"12000000\">\n        <input id=\"pool-b\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"8000000\"></span></label>\n    <label class=\"f\"><span>内部借款利率 / 外部流贷利率（%）</span>\n      <span class=\"row\"><input id=\"pool-in\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"4.5\">\n        <input id=\"pool-out\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"5.5\"></span></label>\n    <label class=\"f\"><span>原闲置资金收益率（活期 %）</span>\n      <input id=\"pool-demand\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"0.2\"></label>\n    <label class=\"f\"><span>可归集比例（%）</span>\n      <input id=\"pool-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"90\"></label>\n    <label class=\"f\"><span>剩余资金理财收益率（%）</span>\n      <input id=\"pool-wealth\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2.5\"></label>\n    <label class=\"f\"><span>借款子公司权益（元，算债资比）</span>\n      <input id=\"pool-equity\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000000\" value=\"15000000\"></label>\n    <em>口径：集团层面的利息收支互相抵销，真正省下来的是「少付外部利息 − 闲置资金原本能赚的钱」</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">集团每年净省</span><strong id=\"pool-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>可归集金额</span><b id=\"pool-pooled\">—</b></li>\n      <li><span>内部借款合计</span><b id=\"pool-loans\">—</b></li>\n      <li><span>内部利息（母收子付，合并抵销）</span><b id=\"pool-int\">—</b></li>\n      <li><span>剩余资金理财收益</span><b id=\"pool-rest\">—</b></li>\n      <li><span>合计收益 / 综合收益率</span><b id=\"pool-all\">—</b></li>\n      <li><span>债资比（关联借款 ÷ 权益）</span><b id=\"pool-ratio\">—</b></li>\n      <li><span>利息扣除结论</span><b id=\"pool-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>动作</th><th>金额</th><th>利率</th><th>年利息</th></tr></thead>\n        <tbody id=\"pool-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"pool-note\"></p>\n  </div>\n    </div>\n  </section>\n","creditlimit":"  <section class=\"panel\" id=\"panel-creditlimit\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（客户信用额度核定）</h2>\n    <label class=\"f\"><span>客户年采购额（元，不含税）</span>\n      <input id=\"crl-buy\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"12000000\"></label>\n    <label class=\"f\"><span>申请账期（天）／增值税率（%）</span>\n      <span class=\"row\"><input id=\"crl-term\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"15\" value=\"60\">\n        <input id=\"crl-vat\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"13\"></span></label>\n    <label class=\"f\"><span>毛利率（%）</span>\n      <input id=\"crl-gm\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\"></label>\n    <label class=\"f\"><span>客户净资产（元）</span>\n      <input id=\"crl-netw\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"20000000\"></label>\n    <label class=\"f\"><span>客户资产负债率（%）</span>\n      <input id=\"crl-lev\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"60\"></label>\n    <label class=\"f\"><span>近一年逾期次数（次）</span>\n      <input id=\"crl-late\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"1\"></label>\n    <label class=\"f\"><span>你的资金成本（%）</span>\n      <input id=\"crl-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"6\"></label>\n    <em>口径：额度取「年采购的 20% / 净资产的 10% / 应收占用的 1.2 倍」三者最小，再用毛利率与预期损失比一次</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">建议信用额度</span><strong id=\"crl-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>账期占用的应收资金</span><b id=\"crl-ar\">—</b></li>\n      <li><span>这笔占用的年利息成本</span><b id=\"crl-cost2\">—</b></li>\n      <li><span>毛利 ÷ 占用成本</span><b id=\"crl-mult\">—</b></li>\n      <li><span>客户信用评分</span><b id=\"crl-score\">—</b></li>\n      <li><span>预估违约概率</span><b id=\"crl-pd\">—</b></li>\n      <li><span>预期损失（额度 × 违约率）</span><b id=\"crl-el\">—</b></li>\n      <li><span>结论</span><b id=\"crl-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>约束</th><th>算法</th><th>额度</th></tr></thead>\n        <tbody id=\"crl-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"crl-note\"></p>\n  </div>\n    </div>\n  </section>\n","trprice":"  <section class=\"panel\" id=\"panel-trprice\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（关联方转移定价）</h2>\n    <label class=\"f\"><span>甲公司生产成本（万元）</span>\n      <input id=\"tp-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"800\"></label>\n    <label class=\"f\"><span>乙公司对外售价（万元）</span>\n      <input id=\"tp-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"1200\"></label>\n    <label class=\"f\"><span>当前内部定价（万元）</span>\n      <input id=\"tp-inner\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50\" value=\"1000\"></label>\n    <label class=\"f\"><span>甲 / 乙 所得税率（%）</span>\n      <span class=\"row\"><input id=\"tp-ratea\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\">\n        <input id=\"tp-rateb\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"15\"></span></label>\n    <label class=\"f\"><span>成本加成法区间（%，下限 / 上限）</span>\n      <span class=\"row\"><input id=\"tp-lo\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"5\">\n        <input id=\"tp-hi\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"10\"></span></label>\n    <em>口径：集团总利润不变，变的是利润留在哪个税率的口袋里。定价必须落在可比区间内，否则税务机关可核定调整并加收利息</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">当前方案集团总税负</span><strong id=\"tp-big\">—</strong><span class=\"unit\">万元</span></div>\n    <ul class=\"kv\">\n      <li><span>甲利润 / 甲税</span><b id=\"tp-a\">—</b></li>\n      <li><span>乙利润 / 乙税</span><b id=\"tp-b\">—</b></li>\n      <li><span>集团利润合计</span><b id=\"tp-profit\">—</b></li>\n      <li><span>综合税率</span><b id=\"tp-rate\">—</b></li>\n      <li><span>合规区间内最低价（加成下限）</span><b id=\"tp-low\">—</b></li>\n      <li><span>合规区间内最高价（加成上限）</span><b id=\"tp-high\">—</b></li>\n      <li><span>区间内最优可省税</span><b id=\"tp-save\">—</b></li>\n      <li><span>内部价每下调 100 万</span><b id=\"tp-per\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>内部定价</th><th>甲税</th><th>乙税</th><th>合计税负</th></tr></thead>\n        <tbody id=\"tp-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"tp-note\"></p>\n  </div>\n    </div>\n  </section>\n","pledgeloan":"  <section class=\"panel\" id=\"panel-pledgeloan\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>应收账款余额（合格账款）</span>\n      <input id=\"plg-ar\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"5000000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"plg-ratio\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"80\" aria-label=\"质押率\">\n      <input id=\"plg-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"5\" aria-label=\"质押贷款利率\">\n    </span>\n    <p class=\"hint\">左：质押率（%），右：质押贷款利率（%）</p>\n    <span class=\"row\">\n      <input id=\"plg-days\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"30\" value=\"90\" aria-label=\"融资期限\">\n      <input id=\"plg-fee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"0.3\" aria-label=\"手续费率\">\n    </span>\n    <p class=\"hint\">左：期限（天），右：一次性手续费率（%）</p>\n    <label class=\"f\">\n      <span>保理综合年化（对比）</span>\n      <input id=\"plg-fact\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"9\">\n      <em>保理按发票全额计息，往往还要留 10% 保证金</em>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">质押融资实际年化</span><strong id=\"plg-big\">—</strong><span class=\"unit\">%</span></div>\n    <ul class=\"kv\">\n      <li><span>可融资额度</span><b id=\"plg-amt\">—</b></li>\n      <li><span>利息</span><b id=\"plg-int\">—</b></li>\n      <li><span>手续费</span><b id=\"plg-feeout\">—</b></li>\n      <li><span>本期总成本</span><b id=\"plg-tot\">—</b></li>\n      <li><span>同期限保理成本</span><b id=\"plg-factout\">—</b></li>\n      <li><span>差额（保理 − 质押）</span><b id=\"plg-diff\">—</b></li>\n      <li><span>未融资部分仍占压</span><b id=\"plg-rest\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"plg-note\"></p>\n  </div>\n    </div>\n  </section>\n","leasebuy":"  <section class=\"panel\" id=\"panel-leasebuy\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>资产买价</span>\n      <input id=\"lbu-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"lbu-rent\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"180000\" aria-label=\"年租金\">\n      <input id=\"lbu-years\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"8\" aria-label=\"租期与折旧年限\">\n    </span>\n    <p class=\"hint\">左：年租金（含维护），右：租期＝折旧年限（年）</p>\n    <span class=\"row\">\n      <input id=\"lbu-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"6\" aria-label=\"折现率\">\n      <input id=\"lbu-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\" aria-label=\"所得税率\">\n    </span>\n    <p class=\"hint\">左：折现率/借款利率（%），右：所得税率（%）</p>\n    <span class=\"row\">\n      <input id=\"lbu-maint\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5000\" value=\"30000\" aria-label=\"购买年维护费\">\n      <input id=\"lbu-resid\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"80000\" aria-label=\"期末残值\">\n    </span>\n    <p class=\"hint\">左：购买方案自担维护费（元/年），右：期末可回收残值</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">租赁比购买省（现值）</span><strong id=\"lbu-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>租赁：税后年成本 / 现值</span><b id=\"lbu-lse\">—</b></li>\n      <li><span>购买：现值合计</span><b id=\"lbu-buy\">—</b></li>\n      <li><span>其中折旧税盾现值</span><b id=\"lbu-shield\">—</b></li>\n      <li><span>维护费现值 / 残值现值</span><b id=\"lbu-mr\">—</b></li>\n      <li><span>盈亏临界年租金</span><b id=\"lbu-crit\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"lbu-note\"></p>\n  </div>\n    </div>\n  </section>\n"};
export default { funding: calcFunding, factoring: calcFactoring, aptalk: calcApTalk, cash13: calcCash13, bill: calcBill, settleway: calcSettleWay, creditline: calcCreditLine, fxgain: calcFxGain, trprice: calcTrPrice, pooling: calcPooling, creditlimit: calcCreditLimit, pledgeloan: calcPledgeLoan, leasebuy: calcLeaseBuy };
