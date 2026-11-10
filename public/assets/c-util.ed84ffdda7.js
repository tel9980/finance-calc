/* 自动生成，勿手改：util 分类模块（点开才下载） */
const { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DIVISOR, FAV_KEY, FIELDS, KEY, MONTH_TABLE, PRE_KEY, SNAP_KEY, SNAP_PICK, TABS, THEME_KEY, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, dlJson, ensureChunk, favList, fillUnits, flash, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, leftAfter, loadCmpA, loadSnaps, loanRows, makeSnap, money, monthToDate, monthlyIRR, months, npvDiff, num, numOf, panelEls, panelParams, parseAmounts, parseDate, pct, percentile, presets, quickOf, rateOf, readJsonFile, refreshCounts, renderLoanTable, renderPresets, renderSnapCompare, renderSnapList, rentBuyAt, restore, runCalc, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, snapNameOf, snapshot, st0, stamp, startName, taxBy, yuan, zOf } = window.FC;

  function calcNumWords() {
    var v = num($("nw-amount"), 0);
    var pre = num($("nw-prefix"), 0) >= 1;
    var txt = cnUpper(v);
    $("nw-big").textContent = (v < 0 ? "负" : "") + (pre ? "人民币" : "") + txt;
    $("nw-low").textContent = "¥" + fmt(Math.abs(v), 2);
    var cents = Math.round(Math.abs(v) * 100);
    $("nw-int").textContent = fmt(Math.floor(cents / 100), 0) + " 元";
    var jiao = Math.floor((cents % 100) / 10), fen = cents % 10;
    $("nw-cent").textContent = jiao + " 角 " + fen + " 分";
    var tail = txt.slice(-1);
    $("nw-rule").textContent = tail === "整" ? "到元为止写「整」，规范" : (jiao > 0 && fen === 0 ? "有角无分：写「X角整」" : "有分：角分都要写，末尾不加「整」");
    $("nw-warn").textContent = (cents % 100 === 0 && tail !== "整") ? "整数金额必须补「整」" : "不得用「另」、不得简写、不得涂改";
    $("nw-note").textContent = "凭证和发票的大写栏要求：金额到「元」的末尾写「整」（或「正」），有角无分写「X角整」，有分则角分都写、末尾不加「整」；中间连续的零只写一个「零」，元位为零时写「零元」；不得涂改，错了整张作废重开。";
  }

  function calcDueDate() {
    var s = parseDate($("ud-start").value) || new Date();
    var days = Math.max(0, Math.round(num($("ud-days"), 0)));
    var biz = num($("ud-basis"), 0) >= 1;
    var amt = num($("ud-amt"), 0);
    var rateW = num($("ud-rate"), 0);
    var today = parseDate($("ud-today").value) || new Date();

    var due = biz ? bizAdd(s, days) : new Date(s.getFullYear(), s.getMonth(), s.getDate() + days);
    var over = Math.round((today - due) / 86400000);
    $("ud-big").textContent = fmtDate(due);
    $("ud-state").textContent = over > 0 ? "已逾期 " + over + " 天" : (over === 0 ? "今天到期" : "还有 " + (-over) + " 天到期");
    $("ud-over").textContent = over > 0 ? over + " 天" : "0 天";
    $("ud-cycle").textContent = Math.round((today - s) / 86400000) + " 天";
    var daily = rateW / 10000;
    $("ud-int").textContent = over > 0 ? yuan(amt * daily * over) : "0.00 元（未逾期）";
    $("ud-hold").textContent = yuan(amt * daily * days) + "（" + fmt(days, 0) + " 天 × " + fmt(daily * 100, 3) + "%）";
    $("ud-biz").textContent = biz ? fmtDate(due) + "（就是上面）" : fmtDate(bizAdd(s, days));
    $("ud-note").textContent = "到期日从「起算日」开始数账期天数，起算日当天不算（次日起算），所以 8/1 开票 + 60 天自然日 = 9/30。逾期利息按「金额 × 日利率 × 逾期天数」算单利，合同没约定罚息时通常按 LPR 或万分之五主张；逾期超过 3 年注意诉讼时效（对账确认单可重新起算）。工作日口径会把周末跳过，法定节假日别忘了自己扣。";
  }

  function calcWorkDay() {
    var a = parseDate($("wd-a").value) || new Date();
    var b = parseDate($("wd-b").value) || new Date();
    var hol = Math.max(0, Math.round(num($("wd-hol"), 0)));
    var n = Math.max(0, Math.round(num($("wd-n"), 0)));
    var span = Math.round((b - a) / 86400000);
    var weekend = 0, bizDays = 0;
    var step = span >= 0 ? 1 : -1;
    for (var i = 1; i <= Math.abs(span); i++) {
      var d = new Date(a.getFullYear(), a.getMonth(), a.getDate() + i * step);
      if (d.getDay() === 0 || d.getDay() === 6) weekend++; else bizDays++;
    }
    var net = Math.max(0, bizDays - hol);
    $("wd-big").textContent = fmt(net, 0);
    $("wd-cal").textContent = fmt(Math.abs(span), 0) + " 天";
    $("wd-weekend").textContent = fmt(weekend, 0) + " 天";
    $("wd-inc").textContent = fmt(Math.abs(span) + 1, 0) + " 天";
    var target = bizAdd(a, n);
    $("wd-target").textContent = fmtDate(target);
    $("wd-span").textContent = Math.round((target - a) / 86400000) + " 天";
    $("wd-week").textContent = fmt(Math.abs(span) / 7, 1) + " 周";
    $("wd-note").textContent = "工作日 = 自然日 − 周末 − 额外非工作日（法定节假日与调休按净额填）。算工期、算审批时限、算「N 个工作日内付款」都用这个；注意「含首尾」比跨度多一天，合同里写「自 X 日起 N 个工作日内」以起算日次日起算。";
  }

  function calcCagr() {
    var f = num($("cg-from"), 0);
    var t = num($("cg-to"), 0);
    var y = num($("cg-years"), 1) || 1;
    if (f <= 0 || t <= 0) {
      $("cg-big").textContent = "—";
      $("cg-note").textContent = "期初值和期末值都要大于 0 才能算年化（跨正负号时年化增速没有意义，用绝对差额看）。";
      return;
    }
    var g = t / f - 1;
    var c = Math.pow(t / f, 1 / y) - 1;
    $("cg-big").textContent = pct(c, 2);
    $("cg-total").textContent = pct(g, 2);
    $("cg-avg").textContent = fmt((t - f) / y, 2);
    $("cg-double").textContent = c > 0 ? fmt(Math.log(2) / Math.log(1 + c), 2) + " 年" : "不会翻倍";
    $("cg-y5").textContent = fmt(t * Math.pow(1 + c, 5), 2);
    $("cg-y10").textContent = fmt(t * Math.pow(1 + c, 10), 2);
    var halfY = Math.abs(Math.log(0.5) / Math.log(1 + c));
    $("cg-half").textContent = fmt(halfY, 2) + " 年" + (c > 0 ? "（翻倍用）" : "（减半用）");
    $("cg-note").textContent = "总增长看的是累计幅度，年化（CAGR）才是可比的速度：涨 80% 用 3 年，年化 21.64%，不是 26.67%。「七二法则」估翻倍用 72÷增速%，精确算是 ln2÷ln(1+g)。利润从 −100 到 +100 这种跨零的情况不能算 CAGR。";
  }

  function calcApportion() {
    var total = num($("apc-total"), 0);
    var raw = ($("apc-w").value || "").split(/[,，\s]+/).filter(function (x) { return x !== ""; });
    var w = [];
    for (var i = 0; i < raw.length && i < 8; i++) {
      var v = Math.max(0, parseFloat(raw[i]) || 0);
      w.push(v);
    }
    if (!w.length) w = [1];
    var sum = w.reduce(function (s, x) { return s + x; }, 0) || 1;
    var cents = Math.round(total * 100);
    var base = [], rema = [], alloc = 0;
    for (var j = 0; j < w.length; j++) {
      var exact = cents * w[j] / sum;
      var fl = Math.floor(exact);
      base.push(fl);
      rema.push(exact - fl);
      alloc += fl;
    }
    var left = cents - alloc;
    var order = rema.map(function (r, idx) { return idx; }).sort(function (p, q) { return rema[q] - rema[p] || p - q; });
    for (var k = 0; k < left && k < order.length; k++) base[order[k]] += 1;
    var rows = "", sumBack = 0, maxIdx = 0, maxGap = -1;
    for (var m = 0; m < base.length; m++) {
      sumBack += base[m];
      var exactM = cents * w[m] / sum;
      var gap = base[m] - exactM;
      if (gap > maxGap) { maxGap = gap; maxIdx = m; }
      rows += "<tr><td>" + (m + 1) + "</td><td>" + fmt(w[m], 2) + "</td><td>" + pct(w[m] / sum, 2) + "</td><td>" + money(base[m] / 100) + "</td></tr>";
    }
    $("apc-body").innerHTML = rows;
    $("apc-big").textContent = money(sumBack / 100) + " / " + money(total, 2);
    $("apc-n").textContent = String(w.length);
    $("apc-wsum").textContent = fmt(sum, 2);
    $("apc-diff").textContent = money((cents - sumBack) / 100);
    $("apc-max").textContent = "第 " + (maxIdx + 1) + " 项（多分 " + money(maxGap / 100) + "）";
    $("apc-note").textContent = "分摊最怕「分不完」或「多一分」：先按权重算出小数金额，取整到分后把剩下的分按小数部分从大到小补，这就是最大余额法，也叫尾差调整。总额 1000 元三个人平分，实际是 333.34 / 333.33 / 333.33，不是三个 333.33（那样少 1 分）。费用分摊、收入确认、佣金拆单、合并报表抵销都用得上。";
  }

  function calcGrossUp() {
    var target = num($("gu-net"), 0);
    var rate = Math.max(0, num($("gu-rate"), 0)) / 100;
    var spec = num($("gu-spec"), 0);
    var thr = num($("gu-thr"), 5000);
    function netOf(gross) {
      var si = gross * rate;
      var tax = taxBy(MONTH_TABLE, Math.max(0, gross - si - thr - spec));
      return { si: si, tax: tax, net: gross - si - tax };
    }
    var lo = target, hi = Math.max(target * 3, 1000);
    for (var i = 0; i < 120; i++) {
      var mid = (lo + hi) / 2;
      if (netOf(mid).net < target) lo = mid; else hi = mid;
    }
    var g = Math.round((lo + hi) / 2 * 100) / 100;
    var r = netOf(g);
    $("gu-big").textContent = money(g) + " 元";
    $("gu-si").textContent = yuan(r.si);
    $("gu-tax").textContent = yuan(r.tax);
    $("gu-tr").textContent = pct(r.tax / g, 2);
    $("gu-year").textContent = yuan(target * 12) + " / " + yuan(g * 12);
    $("gu-ytax").textContent = yuan(r.tax * 12);
    $("gu-cost").textContent = yuan(g * 1.25);
    $("gu-note").textContent = "招聘谈薪最常被问的一句：「到手 2 万，税前要多少？」按月度预扣表反推，本例税前约 2.60 万，公司实际成本还要加单位社保公积金约 25%。注意：社保有缴费基数上下限（各地不同，这里按工资全额算），年终奖若单独计税会让全年税负不同；谈 offer 时说的「总包」要问清是否含单位社保、是否含年终奖。";
  }

  function calcSnaps() {
    renderSnapList();
    renderSnapCompare();
  }

  function calcDatemath() {
    var d = parseDate($("dtm-date").value);
    var mo = Math.round(num($("dtm-months"), 0)), dy = Math.round(num($("dtm-days"), 0));
    if (!d) {
      $("dtm-big").textContent = "—"; $("dtm-week").textContent = "—";
      $("dtm-gap").textContent = "—"; $("dtm-rule").textContent = "—"; $("dtm-doy").textContent = "—";
      $("dtm-note").textContent = "起始日期请按 2026-01-31 的格式填写。";
      return;
    }
    var mid = addMonths(d, mo);
    var r = dy ? new Date(mid.getFullYear(), mid.getMonth(), mid.getDate() + dy) : mid;
    var clamped = mid.getDate() !== d.getDate();
    var gap = Math.round((r.getTime() - d.getTime()) / 86400000);
    var wd = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][r.getDay()];
    var doy = Math.round((r - new Date(r.getFullYear(), 0, 1)) / 86400000) + 1;
    var isEnd = r.getDate() === new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate();
    $("dtm-big").textContent = fmtDate(r);
    $("dtm-week").textContent = wd;
    $("dtm-gap").textContent = (gap >= 0 ? "+" : "") + gap + " 天（" + (gap / 30.44).toFixed(2) + " 个月）";
    $("dtm-rule").textContent = clamped ? "已按月末截断（" + fmtDate(mid) + "）" : (isEnd ? "正好落在月末" : "按日对日，未截断");
    $("dtm-doy").textContent = "第 " + doy + " 天" + (isEnd ? "，且是当月最后一天" : "");
    $("dtm-note").textContent = "「N 个月后」按对日算：起始日不存在的那天以月末为准（1/31 加 1 个月是 2/28 或 2/29），"
      + "所以同一个合同写「3 个月」和写「90 天」能差一两天。到期日遇法定节假日、周末是否顺延，"
      + "要看合同或票据约定，工具不会自动顺延；票据到期日按《票据法》另有规定，别直接套。";
  }

  function calcPct3() {
    var a = num($("pct-a"), 0), b = num($("pct-b"), 0);
    var p1 = num($("pct-p1"), 0), p2 = num($("pct-p2"), 0);
    var diff = b - a, grow = a !== 0 ? diff / a : 0;
    var share = a !== 0 ? b / a : 0, share2 = b !== 0 ? a / b : 0;
    var pp = p2 - p1, rel = p1 !== 0 ? pp / p1 : 0;
    $("pct-big").textContent = a !== 0 ? fmt(grow * 100, 2) : "—";
    $("pct-diff").textContent = money(diff) + " 元";
    $("pct-share").textContent = a !== 0 ? pct(share, 2) : "—";
    $("pct-share2").textContent = b !== 0 ? pct(share2, 2) : "—";
    $("pct-pp").textContent = fmt(pp, 2) + " 个百分点";
    $("pct-rel").textContent = p1 !== 0 ? pct(rel, 2) : "—";
    $("pct-demo").textContent = "A 每 100 元变成 " + fmt(a !== 0 ? b / a * 100 : 0, 2) + " 元";
    $("pct-note").textContent = "三个东西别混：占比是「部分 ÷ 整体」，增幅是「差额 ÷ 原来的数」，"
      + "百分点是两个百分数相减的结果。30% 到 33% 是「涨了 3 个百分点」，相对变化是 "
      + pct(rel, 2) + "，说成「涨了 3%」会差 10 倍。分母为 0 或为负（比如利润由负转正）时，"
      + "增幅没有意义，直接看绝对差额。";
  }

  function calcXlHelp() {
    var box = $("xl-body");
    if (!box) return;
    var esc = function (v) {
      return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    };
    box.innerHTML = XL_ROWS.map(function (r) {
      return "<tr><td class=\"tal\">" + esc(r[0]) + "</td><td class=\"tal\"><code>" + esc(r[1]) + "</code></td></tr>";
    }).join("");
  }

  function calcCsvRecon() {
    var book = parseAmounts($("rk-book").value), bank = parseAmounts($("rk-bank").value);
    var tol = Math.abs(num($("rk-tol"), 0.01));
    var used = bank.map(function () { return false; });
    var missBook = [], missBank = [];
    book.forEach(function (v) {
      var hit = -1;
      for (var i = 0; i < bank.length; i++) {
        if (!used[i] && Math.abs(bank[i] - v) <= tol) { hit = i; break; }
      }
      if (hit >= 0) used[hit] = true; else missBook.push(v);
    });
    for (var j = 0; j < bank.length; j++) if (!used[j]) missBank.push(bank[j]);
    var sb = book.reduce(function (s, v) { return s + v; }, 0);
    var sk = bank.reduce(function (s, v) { return s + v; }, 0);
    var diff = sk - sb;
    var unAll = missBook.map(function (v) { return ["账面有、流水没有", v]; })
      .concat(missBank.map(function (v) { return ["流水有、账面没有", v]; }));
    var unSum = unAll.reduce(function (s, r) { return s + r[1]; }, 0);
    $("rk-big").textContent = fmt(diff, 2);
    $("rk-booksum").textContent = book.length + " 笔 / " + money(sb) + " 元";
    $("rk-banksum").textContent = bank.length + " 笔 / " + money(sk) + " 元";
    $("rk-unmatch").textContent = unAll.length + " 笔（账面缺 " + missBook.length + " / 流水缺 " + missBank.length + "）";
    $("rk-unsum").textContent = money(unSum) + " 元";
    $("rk-body").innerHTML = unAll.length
      ? unAll.slice(0, 30).map(function (r) {
        return "<tr><td class=\"tal\">" + r[0] + "</td><td>" + money(r[1]) + "</td></tr>";
      }).join("")
      : "<tr><td class=\"tal\" colspan=\"2\">两边的金额全部配对成功</td></tr>";
    $("rk-note").textContent = unAll.length === 0
      ? "双向金额完全配对。注意：这只证明「金额和笔数对得上」，不等于业务实质对得上——"
        + "还需要核日期、对方户名、摘要，避免两笔金额相同但业务不同的款项互相抵消。"
      : "未匹配合计 " + money(unSum) + " 元，与净差额不同是正常的：一正一负两笔未达会互相抵消。"
        + "先查是不是在途（银行已收未入账、公司已付未扣款），再查手续费、利息、代扣代缴这类「账面没记」的项目，"
        + "最后才是真正的错账或漏记。同金额多笔按出现顺序配对，所以明细顺序不影响结果。";
  }

export default { numwords: calcNumWords, duedate: calcDueDate, workday: calcWorkDay, cagr: calcCagr, apportion: calcApportion, grossup: calcGrossUp, snaps: calcSnaps, datemath: calcDatemath, pct3: calcPct3, xlhelp: calcXlHelp, csvrecon: calcCsvRecon };
