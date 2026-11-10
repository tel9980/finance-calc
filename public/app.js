/* 财务计算器 —— 纯前端，无依赖 */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };

  function num(el, fallback) {
    var v = parseFloat(el && el.value);
    return isFinite(v) ? v : (fallback || 0);
  }

  function fmt(n, digits) {
    if (!isFinite(n)) return "—";
    var d = digits === undefined ? 2 : digits;
    return n.toLocaleString("zh-CN", { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function money(n) { return fmt(n, 2); }
  function fx(str) { return str; }
  function yuan(n) { return money(n) + " 元"; }

  function pct(x, digits) {
    if (!isFinite(x)) return "—";
    return fmt(x * 100, digits === undefined ? 2 : digits) + "%";
  }

  function months(monthsRaw) {
    return Math.max(0, Math.min(1200, Math.round(monthsRaw)));
  }

  /* 等额本息月供 */
  function annuityPayment(P, i, n) {
    if (n <= 0) return 0;
    if (i === 0) return P / n;
    var g = Math.pow(1 + i, n);
    return (P * i * g) / (g - 1);
  }

  /* ---------------- 1. 存款 ---------------- */
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

  /* ---------------- 2. 贷款 ---------------- */
  var loanRows = [];

  function buildLoanSchedule(P, i, n, method) {
    var rows = [], k, x, rest;
    if (method === "equal-payment") {
      var pay = annuityPayment(P, i, n);
      rest = P;
      for (k = 1; k <= n; k++) {
        var int = rest * i;
        var pri = pay - int;
        if (k === n) { pri = rest; pay = pri + int; }
        rest = Math.max(0, rest - pri);
        rows.push({ k: k, pay: pay, pri: pri, int: int, rest: rest });
      }
    } else {
      var prin = P / n;
      rest = P;
      for (k = 1; k <= n; k++) {
        var it = rest * i;
        var pr = k === n ? rest : prin;
        rest = Math.max(0, rest - pr);
        rows.push({ k: k, pay: pr + it, pri: pr, int: it, rest: rest });
      }
    }
    return rows;
  }

  function calcLoan() {
    var P = num($("ln-principal"));
    var r = num($("ln-rate")) / 100;
    var n = months(num($("ln-years")) * 12);
    var method = $("ln-method").value;
    var i = r / 12;
    var ok = P > 0 && n > 0 && r >= 0;

    loanRows = ok ? buildLoanSchedule(P, i, n, method) : [];

    if (!ok) {
      $("ln-pay").textContent = "—";
      ["ln-total", "ln-interest", "ln-ratio", "ln-count"].forEach(function (id) { $(id).textContent = "—"; });
      $("ln-note").textContent = "填好贷款金额、利率和期限后自动计算。";
      renderLoanTable();
      return;
    }

    var total = 0;
    for (var k = 0; k < loanRows.length; k++) total += loanRows[k].pay;
    var interest = total - P;
    var first = loanRows[0].pay;
    var last = loanRows[n - 1].pay;
    var showLast = document.querySelector('input[name="ln-show"]:checked').value === "last";

    $("ln-pay-label").textContent = method === "equal-payment" ? "每月月供" : (showLast ? "末月月供" : "首月月供");
    $("ln-pay").textContent = money(method === "equal-payment" ? first : (showLast ? last : first));
    $("ln-total").textContent = yuan(total);
    $("ln-interest").textContent = yuan(interest);
    $("ln-ratio").textContent = pct(interest / P);
    $("ln-count").textContent = n + " 期（" + fmt(n / 12, n % 12 === 0 ? 0 : 1) + " 年）";

    $("ln-note").textContent = method === "equal-payment"
      ? "等额本息：每月还款额固定，前期利息占比高、本金还得慢。月供 = 本金×月利率×(1+月利率)^期数 ÷ [(1+月利率)^期数−1]。"
      : "等额本金：每月还的本金固定，利息随剩余本金递减，月供逐月下降。首月最高（" + money(first) +
        " 元）、末月最低（" + money(last) + " 元），总利息比等额本息少。";

    renderLoanTable();
  }

  function renderLoanTable() {
    var tb = $("ln-table").querySelector("tbody");
    var box = $("ln-box");
    if (!loanRows.length) {
      tb.innerHTML = "";
      box.hidden = true;
      $("ln-toggle").textContent = "展开明细";
      return;
    }
    var html = "";
    for (var k = 0; k < loanRows.length; k++) {
      var x = loanRows[k];
      html += "<tr><td>" + x.k + "</td><td>" + money(x.pay) + "</td><td>" + money(x.pri) +
        "</td><td>" + money(x.int) + "</td><td>" + money(x.rest) + "</td></tr>";
    }
    tb.innerHTML = html;
  }

  /* ---------------- 3. 提前还款 ---------------- */
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
  }

  /* ---------------- 4. 复利 / 定投 ---------------- */
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

  /* ---------------- 5. 年化 ---------------- */
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

  /* ---------------- 6. 通胀 / 购买力 ---------------- */
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

  /* ---------------- 7. 个税 ---------------- */
  // [级距上限, 税率, 速算扣除数]
  var YEAR_TABLE = [
    [36000, 0.03, 0], [144000, 0.10, 2520], [300000, 0.20, 16920],
    [420000, 0.25, 31920], [660000, 0.30, 52920], [960000, 0.35, 85920],
    [Infinity, 0.45, 181920]
  ];
  var MONTH_TABLE = [
    [3000, 0.03, 0], [12000, 0.10, 210], [25000, 0.20, 1410],
    [35000, 0.25, 2660], [55000, 0.30, 4410], [80000, 0.35, 7160],
    [Infinity, 0.45, 15160]
  ];

  function taxBy(table, taxable) {
    if (taxable <= 0) return 0;
    for (var k = 0; k < table.length; k++) {
      if (taxable <= table[k][0]) return taxable * table[k][1] - table[k][2];
    }
    return 0;
  }

  function calcTax() {
    var income = num($("tx-income"));
    var insurance = num($("tx-insurance"));
    var special = num($("tx-special"));
    var other = num($("tx-other"));
    var bonus = num($("tx-bonus"));

    var taxable = Math.max(0, income - 60000 - insurance - special - other);
    var salaryTax = taxBy(YEAR_TABLE, taxable);

    // 年终奖单独计税：奖金 ÷ 12 找税率
    var bonusSolo = 0;
    if (bonus > 0) {
      var per = bonus / 12;
      var rate = 0.03, quick = 0;
      for (var k = 0; k < MONTH_TABLE.length; k++) {
        if (per <= MONTH_TABLE[k][0]) { rate = MONTH_TABLE[k][1]; quick = MONTH_TABLE[k][2]; break; }
      }
      bonusSolo = Math.max(0, bonus * rate - quick);
    }

    // 年终奖并入综合所得
    var mergedTax = taxBy(YEAR_TABLE, taxable + bonus);
    var bonusMerged = Math.max(0, mergedTax - salaryTax);

    var useSolo = bonus > 0 && bonusSolo <= bonusMerged;
    var total = salaryTax + (bonus > 0 ? Math.min(bonusSolo, bonusMerged) : 0);
    var grossAll = income + bonus;
    var net = grossAll - insurance - total;

    $("tx-total").textContent = money(total);
    $("tx-taxable").textContent = yuan(taxable);
    $("tx-salary-tax").textContent = yuan(salaryTax);
    $("tx-bonus-solo").textContent = bonus > 0 ? yuan(bonusSolo) : "—";
    $("tx-bonus-merged").textContent = bonus > 0 ? yuan(bonusMerged) : "—";
    $("tx-best").textContent = bonus > 0
      ? (Math.abs(bonusSolo - bonusMerged) < 0.01
        ? "两种一样（差 " + money(Math.abs(bonusSolo - bonusMerged)) + " 元）"
        : (useSolo ? "单独计税，省 " : "并入综合所得，省 ") + money(Math.abs(bonusSolo - bonusMerged)) + " 元")
      : "无年终奖";
    $("tx-net").textContent = yuan(net);
    $("tx-rate").textContent = grossAll > 0 ? pct(total / grossAll) : "—";

    var note = "综合所得年度应纳税额 = (全年收入 − 6 万基本减除费用 − 三险一金 − 专项附加扣除 − 其他扣除) × 税率 − 速算扣除数。";
    if (bonus > 0) {
      note += " 年终奖单独计税是把奖金 ÷ 12 找月度税率表，再按全额乘税率减速算扣除数；并入综合所得则是和工资一起按年度税率表算。两种里挑税额低的那个算——单独计税的优惠政策目前延续到 2027 年底。";
    }
    note += " 这里算的是全年汇算口径，每月预扣预缴的数额会随累计所得变化，年末汇算时多退少补。";
    $("tx-note").textContent = note;
  }

  /* ---------------- 8. 组合贷 ---------------- */
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

  /* ---------------- 9. 攒钱目标 ---------------- */
  function monthToDate(m) {
    var d = new Date();
    d.setMonth(d.getMonth() + m);
    return d.getFullYear() + " 年 " + (d.getMonth() + 1) + " 月";
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

  /* ---------------- 10. 分期真实利率 ---------------- */
  function npvDiff(r, pay, n, P) {
    if (Math.abs(r) < 1e-12) return pay * n - P;
    return (pay * (1 - Math.pow(1 + r, -n))) / r - P;
  }

  function monthlyIRR(P, pay, n) {
    var lo = 0, hi = 1;
    for (var k = 0; k < 200; k++) {
      var mid = (lo + hi) / 2;
      if (npvDiff(mid, pay, n, P) > 0) lo = mid;
      else hi = mid;
    }
    return (lo + hi) / 2;
  }

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

  /* ---------------- 11. 折扣 / 单价 ---------------- */
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

  /* ---------------- 标签切换 & 事件 ---------------- */
  var calcMap = {
    deposit: calcDeposit, loan: calcLoan, combo: calcCombo, prepay: calcPrepay,
    compound: calcCompound, goal: calcGoal, installment: calcInstallment,
    annual: calcAnnual, inflation: calcInflation, tax: calcTax, deal: calcDeal
  };

  function activate(name) {
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle("is-on", tabs[i].dataset.tab === name);
    var panels = document.querySelectorAll(".panel");
    for (var j = 0; j < panels.length; j++) panels[j].classList.toggle("is-on", panels[j].id === "panel-" + name);
    if (calcMap[name]) calcMap[name]();
    if (location.hash !== "#" + name) history.replaceState(null, "", "#" + name);
  }

  $("tabs").addEventListener("click", function (e) {
    var t = e.target.closest(".tab");
    if (t) activate(t.dataset.tab);
  });

  $("ln-toggle").addEventListener("click", function () {
    var box = $("ln-box");
    box.hidden = !box.hidden;
    this.textContent = box.hidden ? "展开明细" : "收起明细";
  });

  document.addEventListener("input", function (e) {
    var panel = e.target.closest(".panel");
    if (!panel) return;
    var name = panel.id.replace("panel-", "");
    if (calcMap[name]) calcMap[name]();
    save();
  });

  /* 记住上次填写（本机 localStorage，不上传） */
  var FIELDS = [
    "dp-principal", "dp-rate", "dp-term", "dp-unit", "dp-mode",
    "ln-principal", "ln-rate", "ln-years", "ln-method",
    "pp-principal", "pp-rate", "pp-months", "pp-amount", "pp-fee", "pp-mode",
    "cp-start", "cp-monthly", "cp-rate", "cp-years", "cp-timing",
    "cb-commercial", "cb-commercial-rate", "cb-fund", "cb-fund-rate", "cb-years",
    "gl-target", "gl-start", "gl-monthly", "gl-rate", "gl-years",
    "is-amount", "is-months", "is-mode", "is-rate",
    "an-start", "an-end", "an-days",
    "if-amount", "if-rate", "if-years",
    "tx-income", "tx-insurance", "tx-special", "tx-other", "tx-bonus",
    "dl-price", "dl-discount", "dl-threshold", "dl-off", "dl-qty",
    "dl-pa", "dl-qa", "dl-ua", "dl-pb", "dl-qb", "dl-ub"
  ];
  var KEY = "finance-calc-v3";

  function save() {
    try {
      var o = {};
      for (var k = 0; k < FIELDS.length; k++) {
        var el = $(FIELDS[k]);
        if (el) o[FIELDS[k]] = el.value;
      }
      localStorage.setItem(KEY, JSON.stringify(o));
    } catch (err) { /* 隐私模式忽略 */ }
  }

  function restore() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var o = JSON.parse(raw);
      for (var k = 0; k < FIELDS.length; k++) {
        var el = $(FIELDS[k]);
        if (el && o[FIELDS[k]] !== undefined && o[FIELDS[k]] !== "") el.value = o[FIELDS[k]];
      }
    } catch (err) { /* 忽略损坏数据 */ }
  }

  /* ---------------- 启动 ---------------- */
  restore();
  var start = (location.hash || "").replace("#", "");
  activate(calcMap[start] ? start : "deposit");
  $("ver").textContent = "财务计算器 · 纯前端 · 更新于 " + new Date().toISOString().slice(0, 10);
})();
