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

  /* ---------------- 8. 到手工资（累计预扣法） ---------------- */
  function cumulativeTax(monthlyGross, insuranceMonthly, specialMonthly, months) {
    var income = monthlyGross * months;
    var deduct = 5000 * months + insuranceMonthly * months + specialMonthly * months;
    var taxable = Math.max(0, income - deduct);
    return taxBy(YEAR_TABLE, taxable);
  }

  function calcSalary() {
    var gross = num($("sl-gross"));
    var base = num($("sl-base")) || gross;
    var hfRate = num($("sl-hf")) / 100;
    var special = num($("sl-special"));
    var month = Math.max(1, Math.min(12, Math.round(num($("sl-month")) || 12)));

    // 个人部分：养老 8% + 医疗 2% + 失业 0.5%，公积金按填写比例
    var socialRate = 0.08 + 0.02 + 0.005;
    var insuranceMonthly = base * socialRate + base * hfRate;

    var accTax = cumulativeTax(gross, insuranceMonthly, special, month);
    var prevTax = cumulativeTax(gross, insuranceMonthly, special, month - 1);
    var monthTax = accTax - prevTax;
    var net = gross - insuranceMonthly - monthTax;

    var tax12 = cumulativeTax(gross, insuranceMonthly, special, 12);
    var yearNet = gross * 12 - insuranceMonthly * 12 - tax12;
    // 单位缴纳：养老 16% + 医疗含生育约 9.8% + 失业 0.5% + 工伤 0.2%，公积金同比例
    var employer = base * (0.16 + 0.098 + 0.005 + 0.002) + base * hfRate;

    if (gross <= 0) {
      ["sl-net", "sl-insurance", "sl-tax", "sl-acc-tax", "sl-year-net", "sl-employer", "sl-rate"].forEach(function (id) { $(id).textContent = "—"; });
      $("sl-note").textContent = "填税前月薪后自动计算。";
      return;
    }

    $("sl-main-label").textContent = month + " 月到手";
    $("sl-net").textContent = money(net);
    $("sl-insurance").textContent = yuan(insuranceMonthly);
    $("sl-tax").textContent = yuan(monthTax);
    $("sl-acc-tax").textContent = yuan(accTax);
    $("sl-year-net").textContent = yuan(yearNet);
    $("sl-employer").textContent = yuan(employer);
    $("sl-rate").textContent = pct(accTax / (gross * month));

    var note = "按累计预扣法：累计应纳税所得额 = 累计收入 − 累计 5000×月数 − 累计五险一金 − 累计专项附加扣除，再套年度税率表，本月税额 = 本月累计 − 上月累计。";
    if (month < 12) note += " 所以一年里前面几个月税少、后面月份税多，全年合计和年度汇算结果一致。";
    note += " 个人比例按养老 8% + 医疗 2% + 失业 0.5% 计，公积金按你填的比例；各地比例和基数上下限不同，以工资条为准。";
    $("sl-note").textContent = note;
  }

  /* ---------------- 9. 租房还是买房 ---------------- */
  function rentBuyAt(g) {
    var price = num($("rb-price"));
    var downRate = num($("rb-down")) / 100;
    var loanRate = num($("rb-rate")) / 100;
    var loanYears = num($("rb-years"));
    var rent0 = num($("rb-rent"));
    var hold = Math.max(1, num($("rb-hold")));
    var rg = num($("rb-rgrowth")) / 100;
    var inv = num($("rb-invest")) / 100;
    var costY = num($("rb-cost"));

    var down = price * downRate;
    var loan = Math.max(0, price - down);
    var n = Math.round(loanYears * 12);
    var i = loanRate / 12;
    var pay = n > 0 ? annuityPayment(loan, i, n) : 0;
    var months = Math.round(hold * 12);

    // 期末房产价值与剩余贷款
    var houseValue = price * Math.pow(1 + g, hold);
    var k = Math.min(months, n);
    var balance = 0;
    if (n > 0 && k < n) {
      if (i === 0) balance = loan * (1 - k / n);
      else {
        var gk = Math.pow(1 + i, k);
        balance = loan * gk - pay * ((gk - 1) / i);
      }
      balance = Math.max(0, balance);
    }
    var buyNet = houseValue - balance;

    // 租房：首付拿去理财 + 每月差额（月供+持有成本−租金）也理财
    var rentNet = down * Math.pow(1 + inv, hold);
    var im = inv / 12;
    for (var m = 1; m <= months; m++) {
      var yr = Math.floor((m - 1) / 12);
      var rentNow = rent0 * Math.pow(1 + rg, yr);
      var diff = pay + costY / 12 - rentNow;
      rentNet += diff * Math.pow(1 + im, months - m);
    }
    return { buyNet: buyNet, rentNet: rentNet, down: down, loan: loan, pay: pay, months: months, houseValue: houseValue, balance: balance };
  }

  function calcRentBuy() {
    var price = num($("rb-price"));
    var hold = Math.max(1, num($("rb-hold")));
    var g = num($("rb-growth")) / 100;

    if (price <= 0) {
      ["rb-diff", "rb-buy-net", "rb-rent-net", "rb-loan", "rb-monthly", "rb-house", "rb-breakeven"].forEach(function (id) { $(id).textContent = "—"; });
      $("rb-note").textContent = "填房价后自动比较。";
      return;
    }

    var r = rentBuyAt(g);
    var diff = r.buyNet - r.rentNet;

    $("rb-diff-label").textContent = fmt(hold, 0) + " 年后：买房比租房" + (diff >= 0 ? "多" : "少");
    $("rb-diff").textContent = money(Math.abs(diff));
    $("rb-buy-net").textContent = yuan(r.buyNet);
    $("rb-rent-net").textContent = yuan(r.rentNet);
    $("rb-loan").textContent = money(r.down) + " / " + money(r.loan) + " 元";
    $("rb-monthly").textContent = money(r.pay) + " / " + money(num($("rb-rent"))) + " / " + money(r.pay + num($("rb-cost")) / 12 - num($("rb-rent"))) + " 元";
    $("rb-house").textContent = yuan(r.houseValue);

    // 二分法找临界房价涨幅
    var lo = -0.3, hi = 0.3, mid;
    for (var it = 0; it < 80; it++) {
      mid = (lo + hi) / 2;
      if (rentBuyAt(mid).buyNet - rentBuyAt(mid).rentNet < 0) lo = mid; else hi = mid;
    }
    $("rb-breakeven").textContent = pct((lo + hi) / 2);

    var note = "口径：买房期末净资产 = 期末房价 − 剩余贷款；租房期末资产 = 首付按理财年化滚 " +
      fmt(hold, 0) + " 年 + 每月(月供+持有成本−租金)的差额同样拿去理财。两边都不算契税、中介费、装修和卖房税费，所以真实结论通常比这里更偏向租房一点。";
    note += diff >= 0
      ? " 当前假设下买房更划算，主要看房价涨幅能不能撑住：房价年涨幅低于 " + pct((lo + hi) / 2) + " 时结论会翻转。"
      : " 当前假设下租房更划算：首付和月供差额拿去理财的钱，比房子升值加上省下的租金更多。把「房价年涨幅」调到 " + pct((lo + hi) / 2) + " 以上才反超。";
    $("rb-note").textContent = note;
  }

  /* ---------------- 10. 信用卡循环利息 ---------------- */
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

  /* ---------------- 11. 汇率 / 单位换算 ---------------- */
  var UNITS = {
    length: [["米", 1], ["千米", 1000], ["厘米", 0.01], ["毫米", 0.001], ["英里", 1609.344], ["英尺", 0.3048], ["英寸", 0.0254]],
    weight: [["千克", 1], ["克", 0.001], ["斤", 0.5], ["两", 0.05], ["磅", 0.45359237], ["盎司", 0.028349523125], ["吨", 1000]],
    area: [["平方米", 1], ["平方千米", 1e6], ["公顷", 10000], ["亩", 666.6666667], ["平方英尺", 0.09290304]],
    volume: [["升", 1], ["毫升", 0.001], ["立方米", 1000], ["加仑（美）", 3.785411784]],
    temp: [["摄氏度 ℃", 1], ["华氏度 ℉", 1], ["开尔文 K", 1]]
  };

  function fillUnits() {
    var cat = $("fx-cat").value;
    var list = UNITS[cat];
    var html = "";
    for (var k = 0; k < list.length; k++) html += '<option value="' + k + '">' + list[k][0] + "</option>";
    $("fx-from").innerHTML = html;
    $("fx-to").innerHTML = html;
    $("fx-to").value = String(Math.min(1, list.length - 1));
  }

  function convertTemp(v, from, to) {
    // 先转摄氏度
    var c = from === 0 ? v : from === 1 ? (v - 32) * 5 / 9 : v - 273.15;
    return to === 0 ? c : to === 1 ? c * 9 / 5 + 32 : c + 273.15;
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


  /* ================= 公积金可贷额度 ================= */
  function annuityPV(pay, i, n) {
    if (i <= 0) return pay * n;
    return pay * (1 - Math.pow(1 + i, -n)) / i;
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

  /* ================= 利率调整后的月供（LPR 重定价） ================= */
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

  /* ================= 二手房交易税费 ================= */
  function calcDeed() {
    var price = Math.max(0, num($("dd-price"), 0));
    var deedRate = Math.max(0, num($("dd-deed"), 1)) / 100;
    var hold = $("dd-hold").value;
    var vatRate = Math.max(0, num($("dd-vat"), 5.3)) / 100;
    var itMode = $("dd-income-tax").value;
    var agentRate = Math.max(0, num($("dd-agent"), 2)) / 100;
    var other = Math.max(0, num($("dd-other"), 0));
    var cost = Math.max(0, num($("dd-cost"), 0));

    var deedAmt = price * deedRate;
    var agentAmt = price * agentRate;
    var vatAmt = hold === "0" ? price * vatRate : 0;
    var diff = Math.max(0, price - cost);
    var itAmt = itMode === "0" ? 0 : (itMode === "20" ? diff * 0.2 : price * 0.01);
    var total = deedAmt + agentAmt + vatAmt + itAmt + other;
    var buyer = price + deedAmt + agentAmt + other;

    $("dd-deed-amt").textContent = yuan(deedAmt);
    $("dd-agent-amt").textContent = yuan(agentAmt);
    $("dd-vat-amt").textContent = vatAmt > 0 ? yuan(vatAmt) : "免征";
    $("dd-it-amt").textContent = itMode === "0" ? "免征" : yuan(itAmt) + (itMode === "20" ? "（差额 " + money(diff) + " × 20%）" : "（成交价 × 1%）");
    $("dd-other-amt").textContent = yuan(other);
    $("dd-total").textContent = money(total);
    $("dd-buyer").textContent = yuan(buyer);
    $("dd-ratio").textContent = price > 0 ? pct(total / price, 2) : "—";

    var first = $("dd-first").value, area = num($("dd-area"), 0);
    var sug = first === "1" ? (area > 0 && area <= 90 ? "1%（首套 90㎡ 及以下）" : "1.5%（首套 90㎡ 以上）")
      : (first === "2" ? "1%–2%（二套，各地不同）" : "3% 起（三套及以上）");
    $("dd-note").textContent = "按你填的「第 " + first + " 套 / " + (area > 0 ? area + "㎡" : "面积未填") + "」，契税常见税率是 " + sug + "，当前按 " + pct(deedRate, 2) + " 计算。"
      + "税费是「谁名下、第几套、面积多大、持有几年」四个变量一起决定的，这里按最常见的规则估算："
      + "契税由买方交（税率自己填，首套 90㎡ 及以下多为 1%、90㎡ 以上 1.5%，二套各地 1%–2%，三套起常按 3%）；"
      + "增值税及附加在持有满 2 年时免征（北上广深非普通住宅另有规定），不满 2 年按全额约 5.3% 计；"
      + "个税「满五唯一」免征，否则按核定 1% 或差额 20% 计（能提供原值凭证才可走差额）。"
      + "中介费一般由买方承担（可谈），其他杂费含评估、登记、公证、贷款服务费等。实际以当地税务核定为准，签约前让中介出一份税费清单。";
  }

  /* ================= AA 分摊 ================= */
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

  /* ================= 退休金测算 ================= */
  var DIVISOR = { 40: 233, 45: 216, 50: 195, 55: 170, 60: 139, 65: 101 };

  function calcPension() {
    var avg = Math.max(0, num($("pn-avg"), 0));
    var idx = Math.min(5, Math.max(0.1, num($("pn-index"), 1)));
    var yrs = Math.max(0, num($("pn-years"), 0));
    var bal = Math.max(0, num($("pn-balance"), 0));
    var age = parseInt($("pn-age").value, 10) || 60;
    var expense = Math.max(0, num($("pn-expense"), 0));
    var div = DIVISOR[age] || 139;

    var wage = avg * idx;                       // 本人指数化月平均缴费工资
    var base = (avg + wage) / 2 * yrs * 0.01;   // 基础养老金
    var acc = bal / div;                        // 个人账户养老金
    var total = base + acc;
    var replace = wage > 0 ? total / wage : 0;
    var gap = expense - total;

    $("pn-total").textContent = money(total);
    $("pn-base").textContent = yuan(base);
    $("pn-acc").textContent = yuan(acc);
    $("pn-wage").textContent = yuan(wage);
    $("pn-replace").textContent = pct(replace, 2);
    $("pn-year").textContent = yuan(total * 12);
    $("pn-months").textContent = div + " 期（" + age + " 岁退休）";
    $("pn-gap").textContent = gap > 0 ? yuan(gap) : "无缺口，高出 " + money(-gap) + " 元";
    $("pn-need").textContent = gap > 0 ? yuan(gap * 12 * 25) : "—";

    var note = "算法：基础养老金 =（社平工资 " + money(avg) + " + 指数化工资 " + money(wage) + "）÷ 2 × 缴费年限 "
      + fmt(yrs, 0) + " 年 × 1% = " + money(base) + "；个人账户养老金 = 账户余额 " + money(bal)
      + " ÷ 计发月数 " + div + " = " + money(acc) + "；两项相加即每月养老金。"
      + " 计发月数是国家精算表（60 岁 139、55 岁 170、50 岁 195），账户余额领完后由统筹基金继续按原标准发放，不会停。";
    if (yrs < 15) note += " 注意：累计缴费不足 15 年不能按月领基础养老金，需延缴或转城乡居民养老保险，个人账户部分可一次性领取。";
    if (replace > 0 && replace < 0.4) note += " 替代率只有 " + pct(replace, 1) + "，低于国际警戒线 40%，说明光靠社保退休后生活水平会明显下降。";
    if (gap > 0) note += " 缺口 " + money(gap) + " 元/月，按 25 倍年缺口（约 4% 提取率）粗算，需要在退休时另有 " + money(gap * 12 * 25) + " 元可投资资产。";
    note += " 未计入过渡性养老金（有视同缴费年限的「中人」会再多一块）、未考虑未来社平工资上涨与养老金年度调整，所以真实金额大概率高于此值。";
    $("pn-note").textContent = note;
  }

  /* ================= 卖房换房 ================= */
  function calcSell() {
    var price = Math.max(0, num($("sv-price"), 0));
    var loan = Math.max(0, num($("sv-loan"), 0));
    var vatR = Math.max(0, num($("sv-vat"), 0)) / 100;
    var itR = Math.max(0, num($("sv-it"), 0)) / 100;
    var agentR = Math.max(0, num($("sv-agent"), 0)) / 100;
    var otherR = Math.max(0, num($("sv-other"), 0)) / 100;
    var newPrice = Math.max(0, num($("sv-new"), 0));
    var downR = Math.min(100, Math.max(0, num($("sv-down"), 30))) / 100;
    var rate = Math.max(0, num($("sv-rate"), 0)) / 100;
    var years = Math.max(1, Math.min(40, Math.round(num($("sv-years"), 30))));

    var vat = price * vatR, it = price * itR, agent = price * agentR, other = price * otherR;
    var tax = vat + it + agent + other;
    var net = price - loan - tax;
    var dpay = newPrice * downR;
    var gap = dpay - net;
    var nloan = Math.max(0, newPrice - dpay);
    var mpay = annuityPayment(nloan, rate / 12, years * 12);

    $("sv-net").textContent = money(net);
    $("sv-tax").textContent = yuan(tax);
    $("sv-vat-amt").textContent = yuan(vat);
    $("sv-it-amt").textContent = yuan(it);
    $("sv-agent-amt").textContent = yuan(agent);
    $("sv-other-amt").textContent = yuan(other);
    $("sv-tax-ratio").textContent = price > 0 ? pct(tax / price, 2) : "—";
    $("sv-dpay").textContent = yuan(dpay);
    $("sv-gap").textContent = gap > 0 ? "还差 " + money(gap) + " 元" : "结余 " + money(-gap) + " 元";
    $("sv-nloan").textContent = yuan(nloan);
    $("sv-mpay").textContent = nloan > 0 ? yuan(mpay) + " / 月（" + years * 12 + " 期）" : "全款，无月供";

    $("sv-note").textContent = "卖房到手 = 成交价 " + money(price) + " − 剩余贷款 " + money(loan) + "（必须先还清解押）− 卖方税费 " + money(tax) + " = " + money(net) + "。"
      + " 换新房首付 " + money(dpay) + "，"
      + (gap > 0 ? "净额不够，还需再筹 " + money(gap) + " 元" : "净额还有 " + money(-gap) + " 元结余，可补贴税费或装修")
      + "；新贷 " + money(nloan) + "、按 " + pct(rate, 2) + " 贷 " + years + " 年，月供 " + money(mpay) + "。"
      + " 实操注意：先卖后买要安排好过渡住处，先买后卖则要看首套/二套认定（多地「认房又认贷」，旧房未过户可能被算二套，首付比例和利率都会上去）；"
      + "新房还有契税、维修基金、装修等一次性支出，别忘了在结余里扣掉。";
  }

  /* ================= 公积金对冲：月冲 vs 年冲 ================= */
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

  /* ================= 多币种折算 ================= */
  var CURS = [
    { k: "USD", name: "美元", id: "mc-usd", out: "mc-usd-out", digits: 2 },
    { k: "EUR", name: "欧元", id: "mc-eur", out: "mc-eur-out", digits: 2 },
    { k: "JPY", name: "日元", id: "mc-jpy", out: "mc-jpy-out", digits: 0 },
    { k: "HKD", name: "港币", id: "mc-hkd", out: "mc-hkd-out", digits: 2 },
    { k: "GBP", name: "英镑", id: "mc-gbp", out: "mc-gbp-out", digits: 2 }
  ];

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

  /* ================= 提前还款 vs 理财 ================= */
  function leftAfter(P, i, pay, m) {
    var x = P;
    for (var k = 0; k < m; k++) { x = x * (1 + i) - pay; if (x <= 0) return 0; }
    return x;
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

  /* ================= 教育金 ================= */
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

  /* ================= 保险保额 ================= */
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

  /* ================= 买车 vs 打车 ================= */
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

  /* ================= 年终奖拆分 ================= */
  function rateOf(table, per) {
    for (var i = 0; i < table.length; i++) if (per <= table[i][0]) return table[i][1];
    return table[table.length - 1][1];
  }
  function quickOf(table, per) {
    for (var i = 0; i < table.length; i++) if (per <= table[i][0]) return table[i][2];
    return table[table.length - 1][2];
  }
  /* 年终奖单独计税：总额 ÷ 12 找月度税率表档位，税额 = 总额 × 税率 − 速算扣除 */
  function bonusSoloTax(b) {
    if (b <= 0) return 0;
    var per = b / 12;
    return Math.max(0, b * rateOf(MONTH_TABLE, per) - quickOf(MONTH_TABLE, per));
  }
  function combineTax(base) { return Math.max(0, taxBy(YEAR_TABLE, base)); }

  function calcBonus() {
    var income = Math.max(0, num($("bn-income"), 0));
    var ins = Math.max(0, num($("bn-ins"), 0));
    var special = Math.max(0, num($("bn-special"), 0));
    var bonus = Math.max(0, num($("bn-bonus"), 0));
    var W = Math.max(0, income - ins - special - 60000);

    var taxA = combineTax(W) + bonusSoloTax(bonus);        // 全单独
    var taxB = combineTax(W + bonus);                      // 全并入

    // 拆分：x 并入综合所得，bonus-x 单独计税
    var pick = function (x) { return combineTax(W + x) + bonusSoloTax(bonus - x); };
    var bestX = 0, bestT = pick(0);
    for (var x = 0; x <= bonus; x += 100) {
      var t = pick(x);
      if (t < bestT - 0.005) { bestT = t; bestX = x; }
    }
    var lo = Math.max(0, bestX - 100), hi = Math.min(bonus, bestX + 100);
    for (var y = lo; y <= hi; y += 1) {
      var t2 = pick(y);
      if (t2 < bestT - 0.005) { bestT = t2; bestX = y; }
    }
    var wageT = combineTax(W + bestX), bonT = bonusSoloTax(bonus - bestX);

    $("bn-best").textContent = money(bestT);
    $("bn-taxable").textContent = yuan(W);
    $("bn-a").textContent = yuan(taxA) + "（工资 " + money(combineTax(W)) + " + 奖金 " + money(bonusSoloTax(bonus)) + "）";
    $("bn-b").textContent = yuan(taxB);
    $("bn-split-in").textContent = yuan(bestX);
    $("bn-split-solo").textContent = yuan(bonus - bestX);
    $("bn-wage-tax").textContent = yuan(wageT);
    $("bn-bonus-tax").textContent = yuan(bonT);
    $("bn-save-a").textContent = taxA - bestT > 0.5 ? yuan(taxA - bestT) : "已是最优（不用拆）";
    $("bn-save-b").textContent = taxB - bestT > 0.5 ? yuan(taxB - bestT) : "已是最优（不用拆）";
    $("bn-net").textContent = yuan(income + bonus - ins - bestT);

    var ratioSolo = bonus - bestX > 0 ? (bonus - bestX) / 12 : 0;
    var note = "两个政策各算一遍再取小的："
      + "①单独计税——年终奖总额 ÷ 12 找工作表（3,000 元以内 3%、3,000–12,000 元 10%、12,000–25,000 元 20%…），税额 = 年终奖 × 该档税率 − 速算扣除数，这笔钱不占综合所得的额度；"
      + "②并入综合所得——和工资合并按年度累进表算。"
      + " 本例工资部分应纳税所得额 " + money(W) + "：全单独 " + money(taxA) + "、全并入 " + money(taxB)
      + "，最优是「" + money(bestX) + " 并入工资 + " + money(bonus - bestX) + " 单独计税」，合计 " + money(bestT) + " 元"
      + (bonus - bestX > 0 ? "（单独那部分落在 " + pct(rateOf(MONTH_TABLE, ratioSolo), 0) + " 档）" : "") + "。"
      + " 拆分能省钱的原因是：单独计税没有速算扣除数的平滑，存在「陷阱区间」——年终奖 36,000 元税 1,080 元，发 36,001 元税 3,390 元，多发 1 元多交 2,310 元；"
      + "同理 14.4 万、30 万、42 万、66 万、96 万都是跳档点。所以要么把超出部分挤到工资里，要么干脆让单位把奖金压到档位以内。"
      + " 注意事项：单独计税优惠目前延续到 2027 年 12 月 31 日，一个纳税年度内只能用一次；实操上要单位在申报时选对方式，事后可在年度汇算时改。";
    if (bonus === 0) note = "年终奖填 0 时，这里算的就是纯工资个税：" + money(bestT) + " 元。把年终奖填进去才能比较拆分方案。";
    $("bn-note").textContent = note;
  }

  /* ================= 专项附加扣除 ================= */
  function calcDeduct() {
    var income = Math.max(0, num($("dq-income"), 0));
    var ins = Math.max(0, num($("dq-ins"), 0));
    var child = Math.max(0, Math.round(num($("dq-child"), 0))) * 24000;
    var baby = Math.max(0, Math.round(num($("dq-baby"), 0))) * 24000;
    var edu = num($("dq-edu"), 0);
    var loanI = num($("dq-loan"), 0);
    var rent = num($("dq-rent"), 0);
    var elder = num($("dq-elder"), 0);
    var medRaw = Math.max(0, num($("dq-med"), 0));
    var med = Math.min(80000, Math.max(0, medRaw - 15000));

    var houseBoth = loanI > 0 && rent > 0;
    var house = houseBoth ? Math.max(loanI, rent) : loanI + rent;
    var total = child + baby + edu + house + elder + med;

    var base0 = Math.max(0, income - ins - 60000);
    var base1 = Math.max(0, base0 - total);
    var t0 = Math.max(0, taxBy(YEAR_TABLE, base0));
    var t1 = Math.max(0, taxBy(YEAR_TABLE, base1));
    var save = t0 - t1;

    $("dq-save").textContent = money(save);
    $("dq-total").textContent = yuan(total);
    $("dq-base0").textContent = yuan(base0);
    $("dq-tax0").textContent = yuan(t0);
    $("dq-base1").textContent = yuan(base1);
    $("dq-tax1").textContent = yuan(t1);
    $("dq-rate").textContent = income > 0 ? pct(t1 / income, 2) : "—";
    $("dq-month").textContent = yuan(save / 12) + " / 月";

    var parts = [];
    if (child) parts.push("子女教育 " + money(child));
    if (baby) parts.push("婴幼儿照护 " + money(baby));
    if (edu) parts.push("继续教育 " + money(edu));
    if (house) parts.push((houseBoth ? "住房贷款利息/租金（二选一取高的）" : loanI ? "住房贷款利息" : "住房租金") + " " + money(house));
    if (elder) parts.push("赡养老人 " + money(elder));
    if (med) parts.push("大病医疗 " + money(med));
    var note = "专项附加扣除合计 " + money(total) + " 元/年"
      + (parts.length ? "（" + parts.join("、") + "）" : "（一项都没选）")
      + "，把应纳税所得额从 " + money(base0) + " 压到 " + money(base1) + "，个税从 " + money(t0) + " 降到 " + money(t1)
      + "，一年少缴 " + money(save) + " 元、平均每月 " + money(save / 12) + " 元。";
    if (houseBoth) note += " 注意：住房贷款利息和住房租金只能二选一，这里已按金额高的那项算。";
    if (medRaw > 0 && medRaw <= 15000) note += " 大病医疗要自付超过 1.5 万元的部分才能扣，你的金额没到起扣点，扣除为 0。";
    note += " 几个容易漏的：婴幼儿照护三项（3 岁以下）标准已提到 2000 元/月/孩，和子女教育不冲突；"
      + "赡养老人只要父母任一方满 60 岁就能扣，非独生子女兄弟姐妹分摊、每人每月不超过 1,500 元；"
      + "继续教育里职业资格证书是「取得当年一次性 3,600 元」，学历教育是每月 400 元（同一学历最长 48 个月）；"
      + "所有扣除都在个税 App 里填，填了当月就能少扣，年底还能在汇算时补退。";
    $("dq-note").textContent = note;
  }

  /* ================= 存单阶梯 ================= */
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

  /* ================= 租售比 ================= */
  function calcRentYield() {
    var price = Math.max(0, num($("ry-price"), 0));
    var rent = Math.max(0, num($("ry-rent"), 0));
    var downR = Math.min(100, Math.max(0, num($("ry-down"), 30))) / 100;
    var rate = Math.max(0, num($("ry-rate"), 0)) / 100;
    var yrs = Math.max(1, Math.min(40, Math.round(num($("ry-years"), 30))));
    var hold = Math.max(1, Math.min(40, Math.round(num($("ry-hold"), 10))));
    var g = num($("ry-growth"), 0) / 100;
    var rg = num($("ry-rgrowth"), 0) / 100;
    var cost = Math.max(0, num($("ry-cost"), 0));
    var vac = Math.min(60, Math.max(0, num($("ry-vac"), 0))) / 100;

    var loan = price * (1 - downR);
    var i = rate / 12, n = yrs * 12;
    var pay = annuityPayment(loan, i, n);
    var ann = rent * 12 * (1 - vac);
    var grossRatio = price > 0 ? rent * 12 / price : 0;
    var effRatio = price > 0 ? ann / price : 0;
    var netRatio = price > 0 ? (ann - cost) / price : 0;

    // 现金流 + IRR（月度）
    var months = hold * 12;
    var cf = [-price * downR];
    var P = loan, rentSum = 0, invest = price * downR, exit = 0, loanEnd = 0;
    for (var m = 1; m <= months; m++) {
      var it = P * i, pr = Math.min(P, pay - it);
      P -= pr;
      var rNow = rent * Math.pow(1 + rg, Math.floor((m - 1) / 12));
      var cash = rNow * (1 - vac) - pay - cost / 12;
      rentSum += rNow * (1 - vac);
      if (cash < 0) invest += -cash;
      if (m === months) {
        loanEnd = P;
        exit = price * Math.pow(1 + g, hold) - P;
        cash += exit;
      }
      cf.push(cash);
    }
    var npv = function (r) {
      var s = 0, d = 1;
      for (var k = 0; k < cf.length; k++) { d *= (1 + r); s += cf[k] / d; }
      return s;
    };
    var lo = -0.9, hi = 1.0;
    for (var z = 0; z < 120; z++) {
      var mid = (lo + hi) / 2;
      if (npv(mid) > 0) lo = mid; else hi = mid;
    }
    var mr = (lo + hi) / 2;
    var annualIrr = (Math.pow(1 + mr, 12) - 1) * 100;

    $("ry-irr").textContent = fmt(annualIrr, 2);
    $("ry-ratio").textContent = pct(grossRatio, 2);
    $("ry-eff").textContent = pct(effRatio, 2);
    $("ry-net").textContent = pct(netRatio, 2);
    $("ry-pay").textContent = yuan(pay) + " / 月";
    $("ry-cash").textContent = yuan(rent - pay - cost / 12) + " / 月";
    $("ry-price-end").textContent = yuan(price * Math.pow(1 + g, hold));
    $("ry-loan-end").textContent = yuan(loanEnd);
    $("ry-rent-sum").textContent = yuan(rentSum);
    $("ry-invest").textContent = yuan(invest);
    $("ry-exit").textContent = yuan(exit);

    var note = "租售比 = 年租金 " + money(rent * 12) + " ÷ 房价 " + money(price) + " = " + pct(grossRatio, 2) + "，"
      + "扣掉 " + pct(vac, 0) + " 空置/欠租后 " + pct(effRatio, 2) + "，再扣年持有成本 " + money(cost) + " 后只有 " + pct(netRatio, 2) + "。"
      + " 国际经验把 3%–5% 当合理区间，1.5%–2% 意味着「靠租金回本要 50 年以上」，这种房子买的是涨价预期、不是租金现金流。"
      + " 上面的年化 " + fmt(annualIrr, 2) + "% 是加杠杆后的股东回报（首付 " + money(price * downR) + "、月供 " + money(pay) + "、持有 " + hold + " 年按房价每年 " + pct(g, 1) + "、租金每年 " + pct(rg, 1) + " 卖出），"
      + (rent - pay - cost / 12 < 0
          ? "并且已经算进每月还要自己再掏 " + money(pay + cost / 12 - rent) + " 元的负现金流。"
          : "并且已经算进每月净收 " + money(rent - pay - cost / 12) + " 元的正现金流。")
      + " 没算契税/中介/装修/卖房税费和空置期的物业费；房价涨幅是最大的变量——把年涨幅调到 0% 再看这个数，就知道租金能不能单独撑起这笔投资。";
    $("ry-note").textContent = note;
  }

  var calcMap = {
    deposit: calcDeposit, loan: calcLoan, combo: calcCombo, prepay: calcPrepay,
    compound: calcCompound, goal: calcGoal, installment: calcInstallment,
    annual: calcAnnual, inflation: calcInflation, tax: calcTax, deal: calcDeal,
    salary: calcSalary, rentbuy: calcRentBuy, card: calcCard, fx: calcFx,
    fund: calcFund, lpr: calcLpr, deed: calcDeed, split: calcSplit,
    pension: calcPension, sell: calcSell, offset: calcOffset, multi: calcMulti,
    repayvs: calcRepayVs, edu: calcEdu, insure: calcInsure, car: calcCar,
    bonus: calcBonus, deduct: calcDeduct, ladder: calcLadder, rentyield: calcRentYield
  };

  function activate(name) {
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle("is-on", tabs[i].dataset.tab === name);
    var panels = document.querySelectorAll(".panel");
    for (var j = 0; j < panels.length; j++) panels[j].classList.toggle("is-on", panels[j].id === "panel-" + name);
    if (calcMap[name]) calcMap[name]();
    if (location.hash !== "#" + name) history.replaceState(null, "", "#" + name);
    var onTab = document.querySelector(".tab.is-on");
    if (onTab && onTab.scrollIntoView) onTab.scrollIntoView({ block: "nearest", inline: "center" });
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
    "dl-pa", "dl-qa", "dl-ua", "dl-pb", "dl-qb", "dl-ub",
    "sl-gross", "sl-base", "sl-hf", "sl-special", "sl-month",
    "rb-price", "rb-down", "rb-rate", "rb-years", "rb-rent", "rb-hold",
    "rb-growth", "rb-rgrowth", "rb-invest", "rb-cost",
    "cd-balance", "cd-min", "cd-rate", "cd-days",
    "fx-amount", "fx-cur", "fx-rate", "fx-fee", "fx-cat", "fx-value", "fx-from", "fx-to",
    "fd-balance", "fd-monthly", "fd-ratio", "fd-mult", "fd-years", "fd-rate", "fd-cap", "fd-price",
    "lp-principal", "lp-old", "lp-new", "lp-months", "lp-lpr", "lp-bp",
    "dd-price", "dd-area", "dd-first", "dd-deed", "dd-hold", "dd-vat", "dd-income-tax", "dd-agent", "dd-other", "dd-cost",
    "sp-total", "sp-people", "sp-fee", "sp-round", "sp-who",
    "pn-avg", "pn-index", "pn-years", "pn-balance", "pn-age", "pn-expense",
    "sv-price", "sv-loan", "sv-vat", "sv-it", "sv-agent", "sv-other", "sv-new", "sv-down", "sv-rate", "sv-years",
    "of-principal", "of-rate", "of-months", "of-acct", "of-dep", "of-mode",
    "mc-amount", "mc-cur", "mc-usd", "mc-eur", "mc-jpy", "mc-hkd", "mc-gbp",
    "rv-principal", "rv-rate", "rv-months", "rv-cash", "rv-invest", "rv-years",
    "ed-age", "ed-go", "ed-cur", "ed-infl", "ed-have", "ed-rate", "ed-monthly",
    "in-income", "in-expense", "in-debt", "in-edu", "in-assets", "in-have", "in-years",
    "cr-price", "cr-years", "cr-residual", "cr-km", "cr-fc", "cr-oil", "cr-ins", "cr-maint", "cr-park", "cr-taxi"
  ];
  var KEY = "finance-calc-v8";

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


  /* ---------------- 复制结果 / 下载 CSV ---------------- */
  function snapshot() {
    var panel = document.querySelector(".panel.is-on");
    var tab = document.querySelector(".tab.is-on");
    if (!panel) return { name: "", rows: [] };
    var rows = [];
    var big = panel.querySelector(".big");
    if (big) {
      var k = big.querySelector(".k"), v = big.querySelector("strong");
      if (k && v) rows.push([k.textContent.trim(), v.textContent.trim() + (big.querySelector(".unit") ? " " + big.querySelector(".unit").textContent.trim() : "")]);
    }
    var kv = panel.querySelectorAll(".kv li");
    for (var i = 0; i < kv.length; i++) {
      var sp = kv[i].querySelector("span"), b = kv[i].querySelector("b");
      if (sp && b) rows.push([sp.textContent.trim(), b.textContent.trim()]);
    }
    var note = panel.querySelector(".hint");
    return { name: tab ? tab.textContent.trim() : "", rows: rows, note: note ? note.textContent.trim() : "" };
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (res, rej) {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); res(); } catch (e) { rej(e); }
      document.body.removeChild(ta);
    });
  }

  $("btn-copy").addEventListener("click", function () {
    var snap = snapshot(), lines = ["【财务计算器】" + snap.name];
    snap.rows.forEach(function (r) { lines.push(r[0] + "：" + r[1]); });
    if (snap.note) lines.push("说明：" + snap.note);
    lines.push("（" + new Date().toLocaleString("zh-CN") + " 计算）");
    var btn = this, old = btn.textContent;
    copyText(lines.join("\n")).then(function () {
      btn.textContent = "已复制"; setTimeout(function () { btn.textContent = old; }, 1300);
    }).catch(function () {
      btn.textContent = "复制失败，请手动选择"; setTimeout(function () { btn.textContent = old; }, 1600);
    });
  });

  $("btn-csv").addEventListener("click", function () {
    var snap = snapshot();
    var esc = function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; };
    var rows = [["模块", snap.name], ["生成时间", new Date().toLocaleString("zh-CN")], ["项目", "数值"]];
    snap.rows.forEach(function (r) { rows.push(r); });
    if (snap.note) rows.push(["说明", snap.note]);
    var csv = "\ufeff" + rows.map(function (r) { return r.map(esc).join(","); }).join("\r\n");
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "财务计算器-" + snap.name.replace(/\s/g, "") + ".csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  });

  // 单位下拉随类别变化
  $("fx-cat").addEventListener("change", function () { fillUnits(); calcFx(); save(); });
  fillUnits();

  /* ---------------- 启动 ---------------- */
  restore();
  var start = (location.hash || "").replace("#", "");
  activate(calcMap[start] ? start : "deposit");
  $("ver").textContent = "财务计算器 · 纯前端 · 更新于 " + new Date().toISOString().slice(0, 10);
})();
