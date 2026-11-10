/* 自动生成，勿手改：save 分类模块（点开才下载） */
const { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DIVISOR, FAV_KEY, FIELDS, KEY, MONTH_TABLE, PRE_KEY, SNAP_KEY, SNAP_PICK, TABS, THEME_KEY, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, dlJson, ensureChunk, favList, fillUnits, flash, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, leftAfter, loadCmpA, loadSnaps, loanRows, makeSnap, money, monthToDate, monthlyIRR, months, npvDiff, num, numOf, panelEls, panelParams, parseAmounts, parseDate, pct, percentile, presets, quickOf, rateOf, readJsonFile, refreshCounts, renderLoanTable, renderPresets, renderSnapCompare, renderSnapList, rentBuyAt, restore, runCalc, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, snapNameOf, snapshot, st0, stamp, startName, taxBy, yuan, zOf } = window.FC;

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

export default { deposit: calcDeposit, compound: calcCompound, goal: calcGoal, annual: calcAnnual, inflation: calcInflation, ladder: calcLadder, dca: calcDCA, calendar: calcCalendar };
