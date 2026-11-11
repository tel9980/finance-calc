/* 自动生成，勿手改：save 分类模块（点开才下载） */
const { $, BUILD_TAG, CAT_KEY, CAT_LABEL, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, EDITED, ERR_BOX, FAV_KEY, FIELDS, FIRST_ACTIVATE, KEY, LAST_KEY, MONTH_CATS, MONTH_TABLE, NEXT_OF, PALETTE_EL, PENDING_PARAMS, PRE_KEY, QUOTA_WARNED, RECENT_KEY, SAVE_TIMER, SEARCH_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, TOAST_EL, UNITS, WF_AUTO_IDX, WF_AUTO_LIST, WF_AUTO_TIMER, WF_CUST, WF_CUST_KEY, WF_DONE, WF_KEY, WF_MAN, WF_MAN_KEY, WF_NOTES, WF_NOTE_KEY, WF_ROLE_KEY, XL_ROWS, YEAR_TABLE, _onPanels, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, buildTabBadges, calcLoan, calcMap, clearWfMan, closePalette, cmpTabName, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, diagText, dlJson, doPrint, drawMonthCats, drawMonthStack, drawReportCharts, drawRpMini, drawnMonthlyChart, drawnYearChart, enhanceNums, enhancePanelUi, ensureChunk, evalExpr, favList, fillCmpMod, fillMonthGrid, fillUnits, flash, flushParams, flushSave, fmt, fmtAt, fmtDate, fx, gauss, getWfCust, getWfDone, getWfMan, getWfNotes, hashTarget, isFav, lastName, leftAfter, linkTo, loadCmpA, loadSnaps, loadWfCust, loadWfDone, loadWfMan, loadWfNotes, loanRows, makeSnap, markBadInputs, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numBlur, numFocus, numInput, numKey, numOf, openPalette, palKey, panelEls, panelParams, parseAmounts, parseDate, parseNum, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, prePanels, presets, printCover, pushRecent, pushSearch, quickOf, rateOf, readJsonFile, readMonthGrid, recentList, recordWf, refreshCounts, refreshTableTools, refreshTrackMods, refreshWfBadge, renderLoanTable, renderNext, renderPalette, renderPresets, renderSearchHist, renderSnapCompare, renderSnapList, renderTrack, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, saveWfCust, savedCat, scrollResultIfDeepLink, searchHist, setCat, setSub, setTheme, showErrorBox, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tabCatLabel, tap, taxBy, toast, toggleWfMan, trimNum, unitFor, updShown, wfAutoStop, wfAutoWalk, wfHandoff, wfManSave, wfNoteSave, wfSave, yuan, zOf } = window.FC;

  function calcDeposit() {
    var P = num($("dp-principal"));
    var r = num($("dp-rate")) / 100;
    var term = num($("dp-term"));
    var unit = $("dp-unit").value;
    var mode = $("dp-mode").value;

    var years = unit === "year" ? term : unit === "month" ? term / 12 : term / 365;
    var interest = 0;

    if (P > 0 && years > 0 && r >= 0) {
      if (mode === "simple") interest = P * r * years;
      else if (mode === "year") interest = P * (Math.pow(1 + r, years) - 1);
      else interest = P * (Math.pow(1 + r / 12, years * 12) - 1);
    }

    var total = P + interest;
    var real = P > 0 && years > 0 && total > 0 ? Math.pow(total / P, 1 / years) - 1 : 0;
    var m = years * 12;

    $("dp-interest").textContent = money(interest);
    $("dp-total").textContent = yuan(total);
    $("dp-real").textContent = pct(real, 3);
    $("dp-permonth").textContent = m > 0 ? yuan(interest / m) : "—";
    $("dp-perday").textContent = years > 0 ? yuan(interest / (years * 365)) : "—";

    var note = "";
    if (P <= 0 || years <= 0) {
      note = "填好本金和期限后自动计算。";
    } else if (mode === "simple") {
      note = "单利：利息 = 本金 × 年利率 × 年数。整存整取定期到期一次性付息，利息免征个人所得税。";
      if (unit === "day") note += " 按天算时一年按 365 天折。";
    } else {
      note = "复利口径：每年（或每月）的利息滚入本金再计息。银行定期到期一次性付息并不滚利，实际收益以单利口径为准。";
    }
    $("dp-note").textContent = note;
  }

  function calcCompound() {
    var P0 = num($("cp-start"));
    var pmt = num($("cp-monthly"));
    var r = num($("cp-rate")) / 100;
    var n = months(num($("cp-years")) * 12);
    var timing = $("cp-timing").value;
    var i = r / 12;

    var growth = Math.pow(1 + i, n);
    var fvPrincipal = P0 * growth;
    var fvPmt;
    if (n <= 0) fvPmt = 0;
    else if (i === 0) fvPmt = pmt * n;
    else fvPmt = pmt * ((growth - 1) / i) * (timing === "begin" ? 1 + i : 1);

    var fv = fvPrincipal + fvPmt;
    var cost = P0 + pmt * n;
    var gain = fv - cost;

    $("cp-fv").textContent = money(fv);
    $("cp-cost").textContent = yuan(cost);
    $("cp-gain").textContent = yuan(gain);
    $("cp-ratio").textContent = cost > 0 ? pct(gain / cost) : "—";

    var dbl = "—";
    if (r > 0) dbl = fmt(Math.log(2) / Math.log(1 + r), 1) + " 年";
    else if (r === 0) dbl = "不会翻倍";
    $("cp-double").textContent = dbl;

    var note;
    if (n <= 0) note = "填好年限后自动计算。";
    else if (r <= 0) note = "年化收益率为 0 时，期末总额就是本金累加。";
    else {
      note = "按月复利测算：本金滚 " + n + " 个月，定投按" + (timing === "begin" ? "月初" : "月底") +
        "投入。定期定额买基金、理财的长期结果接近这个口径。";
      if (pmt > 0) note += " 其中每月定投部分到期值 " + money(fvPmt) + " 元。";
    }
    $("cp-note").textContent = note;
  }

  function calcGoal() {
    var target = num($("gl-target"));
    var start = num($("gl-start"));
    var pmt = num($("gl-monthly"));
    var i = num($("gl-rate")) / 100 / 12;
    var years = num($("gl-years"));

    if (!(target > 0)) {
      $("gl-time").textContent = "—";
      ["gl-date", "gl-cost", "gl-gain", "gl-need"].forEach(function (id) { $(id).textContent = "—"; });
      $("gl-note").textContent = "填好目标金额后自动计算。";
      return;
    }

    if (start >= target) {
      $("gl-time").textContent = "已经攒够了";
      $("gl-time-unit").textContent = "";
      $("gl-date").textContent = "—";
      $("gl-cost").textContent = yuan(start);
      $("gl-gain").textContent = "—";
      $("gl-need").textContent = "0 元";
      $("gl-note").textContent = "现有资金已经达到目标金额，不用再存。";
      return;
    }

    var m = -1, fv = 0;
    for (var k = 1; k <= 1200; k++) {
      fv = i > 0
        ? start * Math.pow(1 + i, k) + pmt * ((Math.pow(1 + i, k) - 1) / i)
        : start + pmt * k;
      if (fv >= target) { m = k; break; }
    }

    if (m < 0) {
      $("gl-time").textContent = "攒不到";
      $("gl-time-unit").textContent = "";
      $("gl-date").textContent = "—";
      $("gl-cost").textContent = "—";
      $("gl-gain").textContent = "—";
      $("gl-need").textContent = "—";
      $("gl-note").textContent = "每月存的钱太少、收益率又不够，100 年也到不了目标，得提高每月存款额。";
    } else {
      var yy = Math.floor(m / 12), mm = m % 12;
      $("gl-time").textContent = yy > 0 ? yy + " 年" + (mm > 0 ? " " + mm + " 个月" : "") : mm + " 个月";
      $("gl-time-unit").textContent = "";
      $("gl-date").textContent = "约 " + monthToDate(m);
      var cost = start + pmt * m;
      $("gl-cost").textContent = yuan(cost);
      $("gl-gain").textContent = yuan(fv - cost);
    }

    var M = months(years * 12);
    var need = 0;
    if (M > 0) {
      need = i > 0
        ? ((target - start * Math.pow(1 + i, M)) * i) / (Math.pow(1 + i, M) - 1)
        : (target - start) / M;
      need = Math.max(0, need);
    }
    $("gl-need").textContent = M > 0 ? yuan(need) + "（" + fmt(years, years % 1 === 0 ? 0 : 1) + " 年内）" : "—";

    if (m >= 0) {
      $("gl-note").textContent = fx(
        "按每月存 " + money(pmt) + " 元、年化 " + fmt(num($("gl-rate")), 2) + "% 测算，约 " + m +
        " 个月后达成 " + money(target) + " 元目标。想更快就两条路：多存（每月多 " + money(Math.max(0, need - pmt)) +
        " 元可在设定年限内达成）或者提高收益率——但收益率越高风险越大，日常攒钱别把收益率当成主要变量。");
    }
    if ($("gl-links")) $("gl-links").innerHTML = "接着算："
      + linkTo("compound", { "cp-start": start, "cp-monthly": pmt, "cp-rate": num($("gl-rate")), "cp-years": years }, "放着不动能滚成多少")
      + linkTo("fire", { "fr-has": start + pmt * 12, "fr-save": pmt }, "离财务自由还有多远")
      + linkTo("deposit", { "dp-principal": target }, "目标金额存定期能有多少利息");
  }

  function calcAnnual() {
    var start = num($("an-start"));
    var end = num($("an-end"));
    var days = num($("an-days"));

    if (!(start > 0 && end > 0 && days > 0)) {
      ["an-cagr", "an-simple", "an-return", "an-perday", "an-yeargain"].forEach(function (id) { $(id).textContent = "—"; });
      $("an-note").textContent = "本金、期末金额、持有天数都要大于 0。";
      return;
    }

    var ret = end / start - 1;
    var cagr = Math.pow(end / start, 365 / days) - 1;
    var simple = (ret * 365) / days;

    $("an-cagr").textContent = fmt(cagr * 100, 2);
    $("an-simple").textContent = pct(simple);
    $("an-return").textContent = pct(ret);
    $("an-perday").textContent = yuan((end - start) / days);
    $("an-yeargain").textContent = yuan(start * cagr);
    $("an-note").textContent =
      "复利年化 = (期末÷本金)^(365÷天数) − 1，用来横向比较不同期限的产品；持有不满一年时短期波动会被放大，别拿几天的高收益直接年化当预期。";
  }

  function calcInflation() {
    var amount = num($("if-amount"));
    var r = num($("if-rate")) / 100;
    var years = num($("if-years"));

    var ok = amount > 0 && years > 0;
    var factor = Math.pow(1 + r, years);
    var power = ok ? amount / factor : 0;
    var need = ok ? amount * factor : 0;
    var loss = ok ? 1 - 1 / factor : 0;

    $("if-main").textContent = money(power);
    $("if-main-label").textContent = "N 年后的购买力";
    $("if-power").textContent = yuan(power);
    $("if-need").textContent = yuan(need);
    $("if-loss").textContent = pct(loss);
    $("if-annualloss").textContent = ok ? pct(1 - 1 / (1 + r), 3) + " / 年" : "—";

    var note;
    if (!ok) note = "填好金额和年数后自动计算。";
    else if (r === 0) note = "通胀率为 0 时，钱的购买力不变。";
    else {
      note = "按 " + fmt(r * 100, 2) + "% 的年通胀率：今天的 " + money(amount) + " 元，过 " + fmt(years, 0) +
        " 年的购买力只相当于今天的 " + money(power) + " 元；想买到今天同样的东西，届时需要 " + money(need) +
        " 元。也就是说，理财年化收益率长期至少要跑过通胀率，钱才没在变薄。";
    }
    $("if-note").textContent = note;
  }

  function calcLadder() {
    var total = Math.max(0, num($("ld-total"), 0));
    var r1 = Math.max(0, num($("ld-r1"), 0)) / 100;
    var r2 = Math.max(0, num($("ld-r2"), 0)) / 100;
    var r3 = Math.max(0, num($("ld-r3"), 0)) / 100;
    var part = total / 3;
    var i1 = part * r1 * 1, i2 = part * r2 * 2, i3 = part * r3 * 3;
    var sum = i1 + i2 + i3;
    var all = total * r3 * 3;
    var avg = total > 0 ? sum / total / 3 : 0;

    $("ld-int").textContent = money(sum);
    $("ld-part").textContent = yuan(part);
    $("ld-i1").textContent = yuan(i1);
    $("ld-i2").textContent = yuan(i2);
    $("ld-i3").textContent = yuan(i3);
    $("ld-all").textContent = yuan(all);
    $("ld-cost").textContent = yuan(Math.max(0, all - sum));
    $("ld-avg").textContent = pct(avg, 3);
    $("ld-m12").textContent = yuan(part + i1) + "（本息）";

    var rows = [
      ["第 1 年末", part, "1 年期", i1, part + i1],
      ["第 2 年末", part, "2 年期", i2, part + i2],
      ["第 3 年末", part, "3 年期", i3, part + i3]
    ];
    var body = $("ld-body");
    body.innerHTML = "";
    for (var i = 0; i < rows.length; i++) {
      var tr = document.createElement("tr");
      for (var j = 0; j < rows[i].length; j++) {
        var td = document.createElement("td");
        td.textContent = j === 1 || j === 3 || j === 4 ? money(rows[i][j]) : rows[i][j];
        tr.appendChild(td);
      }
      body.appendChild(tr);
    }

    $("ld-note").textContent = "把 " + money(total) + " 元拆成三份各 " + money(part) + "，分别存 1 年、2 年、3 年期，"
      + "于是从第 1 年末开始每年都有一笔到期，用钱不用全砸在定期里提前支取（那样只能拿活期利息）。"
      + " 三年累计利息 " + money(sum) + "，平均年化 " + pct(avg, 3) + "；如果一开始全存 3 年期，利息是 " + money(all)
      + "，也就是为了「每年都有一笔能取」多付出的代价约 " + money(Math.max(0, all - sum)) + " 元。"
      + " 滚动起来的做法是：第 1 年末到期的那笔改存 3 年期，第 2 年末到期的那笔也改存 3 年期——三年之后三笔全部变成 3 年期，且仍然每年到期一笔，收益就追上「全存 3 年」了。"
      + " 利率按你能拿到的挂牌价填（中小银行、大额存单通常更高），存款保险对同一家银行本息最高偿付 50 万元，超过就分散到不同银行。";
  }

  function calcDCA() {
    var M = Math.max(0, num($("dc-amount"), 0));
    var n = Math.max(1, months(num($("dc-months"), 12)));
    var mu = Math.max(-0.99, num($("dc-return"), 6) / 100);
    var sig = Math.max(0, Math.min(2, num($("dc-vol"), 18) / 100));
    var c = Math.max(0, num($("dc-cash"), 2) / 100);
    var hold = Math.max(0, num($("dc-hold"), 0));
    var T = n + Math.round(hold * 12);

    var expLump = M * Math.pow(1 + mu, T / 12);
    var expDCA = 0, part = M / n;
    for (var q = 0; q < n && q < T; q++) {
      expDCA += part * Math.pow(1 + c, q / 12) * Math.pow(1 + mu, (T - q) / 12);
    }

    var s = sig / Math.sqrt(12);
    var m = Math.log(1 + mu) / 12 - s * s / 2;
    var trials = 2000, wins = 0, lumpVals = [], dcaVals = [];
    for (var t = 0; t < trials; t++) {
      var G = new Array(T + 1), cum = 1;
      G[T] = 1;
      for (var j = T - 1; j >= 0; j--) {
        cum *= Math.exp(m + s * gauss());
        G[j] = cum;
      }
      var lump = M * G[0], dca = 0;
      for (var q2 = 0; q2 < n && q2 < T; q2++) dca += part * Math.pow(1 + c, q2 / 12) * G[q2];
      lumpVals.push(lump); dcaVals.push(dca);
      if (lump > dca) wins++;
    }

    var winRate = wins / trials;
    $("dc-dca").textContent = money(expDCA);
    $("dc-lump").textContent = yuan(expLump);
    $("dc-gap").textContent = yuan(expLump - expDCA);
    $("dc-win").textContent = pct(winRate, 1);
    $("dc-dcaMed").textContent = yuan(percentile(dcaVals, 0.5));
    $("dc-lumpMed").textContent = yuan(percentile(lumpVals, 0.5));
    $("dc-dcaBad").textContent = yuan(percentile(dcaVals, 0.05));
    $("dc-lumpBad").textContent = yuan(percentile(lumpVals, 0.05));
    $("dc-info").textContent = money(M) + " 元 / " + T + " 个月";

    var badGap = percentile(dcaVals, 0.05) - percentile(lumpVals, 0.05);
    $("dc-note").textContent = "同样 " + money(M) + " 元，" + n + " 个月内分批投完，之后继续持有 " + fmt(hold, 0) + " 年："
      + " 定投期望 " + money(expDCA) + " 元，一次性期望 " + money(expLump) + " 元，一次性高出 " + money(expLump - expDCA) + " 元。"
      + " 这不是 bug：钱越早入市，享受上涨的时间越长，定投平均有一半的钱晚了半年进场。"
      + " 2000 次蒙特卡洛模拟里，一次性有 " + pct(winRate, 1) + " 的概率跑赢定投——期望值和胜率都偏向一次性。"
      + " 定投换来的不是更高收益，而是更窄的结果分布：看最差 5% 的情形，一次性只剩 " + money(percentile(lumpVals, 0.05))
      + " 元，定投有 " + money(percentile(dcaVals, 0.05)) + " 元（高 " + money(badGap) + "），"
      + " 因为定投的后续买入是在跌下来之后发生的。"
      + " 所以：手里已有一大笔钱、且能承受 30% 以上浮亏的，一次性（或 3–6 个月分批）更合理；靠每月工资结余攒钱的，定投本来就是唯一选项。"
      + " 参数提醒：预期收益填的是长期年化期望（股基历史 6–8% 是常见假设），波动率 18% 约等于沪深 300 量级、债基 3–5%。"
      + " 两个可以自己验证的地方：① 把「未投入资金收益」填 0、预期收益也填 0，两边期望值会完全相等"
      + "——说明零漂移下波动本身不创造收益，这里定投期望高出的那部分全部来自没投出去的钱赚了货基利息；"
      + " ② 把波动率也填 0，两边退化为纯复利，一次性必然更高。所以别把定投当「提高收益」的工具，它买的是纪律和更窄的下限。";
  }

  function calcCalendar() {
    var total = Math.max(0, num($("cl-total"), 0));
    var cnt = Math.max(1, Math.min(36, Math.round(num($("cl-count"), 12))));
    var gap = Math.max(1, months(num($("cl-gap"), 1)));
    var term = Math.max(1, months(num($("cl-term"), 12)));
    var rate = Math.max(0, num($("cl-rate"), 0)) / 100;
    var start = parseDate($("cl-start").value);
    if (!start) {
      start = new Date();
      start = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      $("cl-start").value = fmtDate(start);
      save();
    }

    var per = total / cnt;
    var interest = per * rate * term / 12;

    var rows = [], body = $("cl-body");
    body.innerHTML = "";
    var firstDue = null, lastDue = null;
    for (var t = 0; t < cnt; t++) {
      var from = addMonths(start, t * gap);
      var due = addMonths(from, term);
      if (t === 0) firstDue = due;
      lastDue = due;
      var cells = [(t + 1) + "", fmtDate(from), fmtDate(due), money(per), money(interest), money(per + interest)];
      var tr = document.createElement("tr");
      for (var j = 0; j < cells.length; j++) {
        var td = document.createElement("td");
        td.textContent = cells[j];
        tr.appendChild(td);
      }
      body.appendChild(tr);
    }

    var sumInt = interest * cnt;
    var gapDays = 0;
    if (cnt > 1) gapDays = Math.round((addMonths(start, gap) - start) / 86400000);
    var spanDays = Math.round((lastDue - firstDue) / 86400000);

    $("cl-each").textContent = money(per + interest);
    $("cl-per").textContent = yuan(per);
    $("cl-first").textContent = fmtDate(firstDue);
    $("cl-last").textContent = fmtDate(lastDue);
    $("cl-gapdays").textContent = cnt > 1 ? gapDays + " 天（" + gap + " 个月）" : "只有一笔";
    $("cl-span").textContent = cnt > 1 ? spanDays + " 天（约 " + fmt(spanDays / 30.44, 1) + " 个月）" : "—";
    $("cl-int").textContent = yuan(sumInt);
    $("cl-sum").textContent = yuan(total + sumInt);

    $("cl-note").textContent = "把 " + money(total) + " 拆成 " + cnt + " 笔各 " + money(per) + "，从 " + fmtDate(start)
      + " 起每 " + gap + " 个月存一笔、每笔存 " + term + " 个月：第一笔 " + fmtDate(firstDue) + " 到期，最后一笔 " + fmtDate(lastDue)
      + " 到期，此后每 " + (cnt > 1 ? gapDays + " 天" : "—") + "就有一笔钱到期。"
      + " 每笔利息 " + money(interest) + "，全部到期利息合计 " + money(sumInt) + "，到期本息 " + money(total + sumInt) + " 元。"
      + " 这么排的意义：既不是把钱全压在一笔定期上（急用就得提前支取、按活期算），也不会出现「好几笔同时到期、到期日全挤在一个月」"
      + "——那样再投资时点集中，一旦赶上利率下行就一起被压价。均匀错开之后，每隔一段时间都有一笔可续投、可取用。"
      + " 玩法延展：① 工资到账就存一笔（间隔 1 个月），一年后每月都有一笔到期，等于自己的「月度现金流」；"
      + " ② 期限设成阶梯（1 年、2 年、3 年各排几笔），兼顾收益和灵活；③ 到期就续存最长可接受期限，收益会逐步追上全存长期。"
      + " 两个提醒：存款保险对同一家银行本息最高偿付 50 万元，总额超过就分散到不同银行；利率按你能拿到的挂牌价填，"
      + "中小银行、大额存单通常更高，但要注意是否有「靠档计息」「提前支取按活期」的条款。日期计算按自然月对日、遇到月末自动取当月最后一天。";
  }

export const PANELS = {"deposit":"  <section class=\"panel is-on\" id=\"panel-deposit\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>存款本金（元）</span>\n      <input id=\"dp-principal\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"100000\">\n    </label>\n    <label class=\"f\">\n      <span>年利率（%）</span>\n      <input id=\"dp-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"1.05\">\n      <em>填银行挂牌的年利率，如 1.05 表示 1.05%</em>\n    </label>\n    <label class=\"f\">\n      <span>存款期限</span>\n      <span class=\"row\">\n        <input id=\"dp-term\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"2\">\n        <select id=\"dp-unit\">\n          <option value=\"year\" selected>年</option>\n          <option value=\"month\">个月</option>\n          <option value=\"day\">天</option>\n        </select>\n      </span>\n    </label>\n    <label class=\"f\">\n      <span>计息方式</span>\n      <select id=\"dp-mode\">\n        <option value=\"simple\" selected>单利（整存整取定期）</option>\n        <option value=\"year\">按年复利（利滚利）</option>\n        <option value=\"month\">按月复利</option>\n      </select>\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">到期利息</span>\n      <strong id=\"dp-interest\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>本息合计</span><b id=\"dp-total\">—</b></li>\n      <li><span>实际年化（复利口径）</span><b id=\"dp-real\">—</b></li>\n      <li><span>折合每月利息</span><b id=\"dp-permonth\">—</b></li>\n      <li><span>折合每天利息</span><b id=\"dp-perday\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"dp-note\"></p>\n  </div>\n    </div>\n  </section>\n","compound":"  <section class=\"panel\" id=\"panel-compound\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>初始本金（元）</span>\n      <input id=\"cp-start\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"100000\">\n    </label>\n    <label class=\"f\">\n      <span>每月追加投入（元）</span>\n      <input id=\"cp-monthly\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"1000\">\n    </label>\n    <label class=\"f\">\n      <span>年化收益率（%）</span>\n      <input id=\"cp-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"3\">\n    </label>\n    <label class=\"f\">\n      <span>投资年限</span>\n      <input id=\"cp-years\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"10\">\n    </label>\n    <label class=\"f\">\n      <span>投入时点</span>\n      <select id=\"cp-timing\">\n        <option value=\"end\" selected>期末（月底投）</option>\n        <option value=\"begin\">期初（月初投）</option>\n      </select>\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">期末总额</span>\n      <strong id=\"cp-fv\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>累计投入本金</span><b id=\"cp-cost\">—</b></li>\n      <li><span>累计收益</span><b id=\"cp-gain\">—</b></li>\n      <li><span>收益 / 本金</span><b id=\"cp-ratio\">—</b></li>\n      <li><span>资金翻倍约需</span><b id=\"cp-double\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"cp-note\"></p>\n  </div>\n    </div>\n  </section>\n","goal":"  <section class=\"panel\" id=\"panel-goal\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>目标金额（元）</span>\n      <input id=\"gl-target\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"500000\">\n    </label>\n    <label class=\"f\">\n      <span>现在已经有的（元）</span>\n      <input id=\"gl-start\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"100000\">\n    </label>\n    <label class=\"f\">\n      <span>每月能存下（元）</span>\n      <input id=\"gl-monthly\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"3000\">\n    </label>\n    <label class=\"f\">\n      <span>年化收益率（%，存定期就填存款利率）</span>\n      <input id=\"gl-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"2\">\n    </label>\n    <label class=\"f\">\n      <span>如果希望几年内攒够？</span>\n      <input id=\"gl-years\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"5\">\n      <em>用来反推「每月至少要存多少」</em>\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">按现在的存法，还需</span>\n      <strong id=\"gl-time\">—</strong>\n      <span class=\"unit\" id=\"gl-time-unit\"></span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>预计达成时间</span><b id=\"gl-date\">—</b></li>\n      <li><span>期间累计投入</span><b id=\"gl-cost\">—</b></li>\n      <li><span>其中利息贡献</span><b id=\"gl-gain\">—</b></li>\n      <li><span>想在设定年限内攒够，每月需存</span><b id=\"gl-need\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"gl-note\"></p>\n        <p class=\"jump\" id=\"gl-links\"></p>\n  </div>\n    </div>\n  </section>\n","annual":"  <section class=\"panel\" id=\"panel-annual\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>投入本金（元）</span>\n      <input id=\"an-start\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"100000\">\n    </label>\n    <label class=\"f\">\n      <span>当前市值 / 到期金额（元）</span>\n      <input id=\"an-end\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"106000\">\n    </label>\n    <label class=\"f\">\n      <span>持有天数</span>\n      <input id=\"an-days\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"365\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">复利年化收益率</span>\n      <strong id=\"an-cagr\">—</strong>\n      <span class=\"unit\">%</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>单利年化</span><b id=\"an-simple\">—</b></li>\n      <li><span>区间总收益率</span><b id=\"an-return\">—</b></li>\n      <li><span>日均收益</span><b id=\"an-perday\">—</b></li>\n      <li><span>年化收益额</span><b id=\"an-yeargain\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"an-note\"></p>\n  </div>\n    </div>\n  </section>\n","inflation":"  <section class=\"panel\" id=\"panel-inflation\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>金额（元）</span>\n      <input id=\"if-amount\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\">\n    </label>\n    <label class=\"f\">\n      <span>年通胀率（%）</span>\n      <input id=\"if-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2.5\">\n      <em>近年国内 CPI 多在 0–3% 区间，可填你实际感受到的涨幅</em>\n    </label>\n    <label class=\"f\">\n      <span>年数</span>\n      <input id=\"if-years\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"20\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\" id=\"if-main-label\">未来购买力</span>\n      <strong id=\"if-main\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>现在这笔钱的购买力（折今天）</span><b id=\"if-power\">—</b></li>\n      <li><span>想维持同样生活，届时需要</span><b id=\"if-need\">—</b></li>\n      <li><span>购买力累计缩水</span><b id=\"if-loss\">—</b></li>\n      <li><span>购买力年均缩水</span><b id=\"if-annualloss\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"if-note\"></p>\n  </div>\n    </div>\n  </section>\n","ladder":"  <section class=\"panel\" id=\"panel-ladder\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>总金额（元）</span>\n      <input id=\"ld-total\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\">\n    </label>\n    <label class=\"f\">\n      <span>1 年期利率（年，%）</span>\n      <input id=\"ld-r1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"1.35\">\n    </label>\n    <label class=\"f\">\n      <span>2 年期利率（年，%）</span>\n      <input id=\"ld-r2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"1.45\">\n    </label>\n    <label class=\"f\">\n      <span>3 年期利率（年，%）</span>\n      <input id=\"ld-r3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"1.75\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">阶梯存三年累计利息</span>\n      <strong id=\"ld-int\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>每份金额（三等分）</span><b id=\"ld-part\">—</b></li>\n      <li><span>1 年期利息</span><b id=\"ld-i1\">—</b></li>\n      <li><span>2 年期利息</span><b id=\"ld-i2\">—</b></li>\n      <li><span>3 年期利息</span><b id=\"ld-i3\">—</b></li>\n      <li><span>全部存 3 年期利息</span><b id=\"ld-all\">—</b></li>\n      <li><span>阶梯的机会成本</span><b id=\"ld-cost\">—</b></li>\n      <li><span>阶梯平均年化</span><b id=\"ld-avg\">—</b></li>\n      <li><span>第 1 年末可动用</span><b id=\"ld-m12\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>到期时点</th><th>本金</th><th>存期</th><th>利息</th><th>到期本息</th></tr></thead>\n        <tbody id=\"ld-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"ld-note\"></p>\n  </div>\n    </div>\n  </section>\n","dca":"  <section class=\"panel\" id=\"panel-dca\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>总金额（元）</span>\n      <input id=\"dc-amount\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"120000\">\n    </label>\n    <label class=\"f\">\n      <span>分几个月投完（月）</span>\n      <input id=\"dc-months\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1\" value=\"12\">\n    </label>\n    <label class=\"f\">\n      <span>预期年化收益（%，期望值）</span>\n      <input id=\"dc-return\" type=\"number\" inputmode=\"decimal\" step=\"0.5\" value=\"6\">\n    </label>\n    <label class=\"f\">\n      <span>年化波动率（%，股基约 15–20）</span>\n      <input id=\"dc-vol\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"18\">\n    </label>\n    <label class=\"f\">\n      <span>投完后继续持有（年）</span>\n      <input id=\"dc-hold\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"5\">\n    </label>\n    <label class=\"f\">\n      <span>未投入资金收益（年化 %，货币基金）</span>\n      <input id=\"dc-cash\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">定投的期望期末值</span>\n      <strong id=\"dc-dca\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>一次性买入的期望期末值</span><b id=\"dc-lump\">—</b></li>\n      <li><span>期望差（一次性 − 定投）</span><b id=\"dc-gap\">—</b></li>\n      <li><span>模拟中一次性胜出的概率</span><b id=\"dc-win\">—</b></li>\n      <li><span>定投中位数</span><b id=\"dc-dcaMed\">—</b></li>\n      <li><span>一次性中位数</span><b id=\"dc-lumpMed\">—</b></li>\n      <li><span>定投最差 5% 情形</span><b id=\"dc-dcaBad\">—</b></li>\n      <li><span>一次性最差 5% 情形</span><b id=\"dc-lumpBad\">—</b></li>\n      <li><span>总投入 / 持有总月数</span><b id=\"dc-info\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"dc-note\"></p>\n  </div>\n    </div>\n  </section>\n","calendar":"  <section class=\"panel\" id=\"panel-calendar\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>总金额（元）</span>\n      <input id=\"cl-total\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"120000\">\n    </label>\n    <label class=\"f\">\n      <span>分几笔（笔）</span>\n      <input id=\"cl-count\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"36\" step=\"1\" value=\"12\">\n    </label>\n    <label class=\"f\">\n      <span>每笔间隔（月）</span>\n      <input id=\"cl-gap\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1\" value=\"1\">\n    </label>\n    <label class=\"f\">\n      <span>每笔期限（月）</span>\n      <input id=\"cl-term\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1\" value=\"12\">\n    </label>\n    <label class=\"f\">\n      <span>年利率（%）</span>\n      <input id=\"cl-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"1.9\">\n    </label>\n    <label class=\"f\">\n      <span>首笔起存日</span>\n      <input id=\"cl-start\" type=\"date\" value=\"\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">每笔到期本息</span>\n      <strong id=\"cl-each\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>每笔本金</span><b id=\"cl-per\">—</b></li>\n      <li><span>首笔到期日</span><b id=\"cl-first\">—</b></li>\n      <li><span>末笔到期日</span><b id=\"cl-last\">—</b></li>\n      <li><span>相邻两笔到期间隔</span><b id=\"cl-gapdays\">—</b></li>\n      <li><span>全部到期覆盖时长</span><b id=\"cl-span\">—</b></li>\n      <li><span>总利息</span><b id=\"cl-int\">—</b></li>\n      <li><span>到期本息合计</span><b id=\"cl-sum\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>期次</th><th>起存日</th><th>到期日</th><th>本金</th><th>利息</th><th>到期本息</th></tr></thead>\n        <tbody id=\"cl-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"cl-note\"></p>\n  </div>\n    </div>\n  </section>\n"};
export default { deposit: calcDeposit, compound: calcCompound, goal: calcGoal, annual: calcAnnual, inflation: calcInflation, ladder: calcLadder, dca: calcDCA, calendar: calcCalendar };
