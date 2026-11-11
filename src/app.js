/* 财务计算器 —— 纯前端，无依赖 */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };

  /* 数字解析：允许千分位、空格，以及 1.5万 / 2k / 3千 / 1亿 这类简写 */
  /* 极简四则运算求值（递归下降，不用 eval/Function——线上 CSP 禁 unsafe-eval）。
     支持 + - * / 与括号，数字允许小数；不支持 万/亿 与运算符混写。 */
  function evalExpr(src) {
    var s = String(src).replace(/[\s,，_]/g, "");
    var i = 0, n = s.length;
    if (!n) return NaN;
    function peek() { return i < n ? s.charAt(i) : ""; }
    function expr() {
      var v = term();
      while (peek() === "+" || peek() === "-") { var op = s.charAt(i++); var r = term(); v = op === "+" ? v + r : v - r; }
      return v;
    }
    function term() {
      var v = factor();
      while (peek() === "*" || peek() === "/") {
        var op = s.charAt(i++); var r = factor();
        if (!isFinite(r)) return NaN;
        if (op === "*") v = v * r;
        else { if (r === 0) return NaN; v = v / r; }
      }
      return v;
    }
    function factor() {
      if (peek() === "-") { i++; var v = factor(); return isFinite(v) ? -v : NaN; }
      if (peek() === "(") { i++; var v = expr(); if (peek() === ")") i++; return v; }
      var m = /^(\d+(\.\d+)?|\.\d+)/.exec(s.slice(i));
      if (!m) return NaN;
      i += m[0].length;
      return parseFloat(m[0]);
    }
    var r = expr();
    return (i === n && isFinite(r)) ? r : NaN;
  }

  function parseNum(v) {
    if (v === null || v === undefined) return NaN;
    if (typeof v === "number") return v;
    var s = String(v).replace(/[\s,，_]/g, "");
    if (!s) return NaN;
    /* 含运算符/括号 → 走四则运算（-5 这类纯负数也走这里，等价） */
    if (/[+\-*/()]/.test(s)) return evalExpr(s);
    var mul = 1;
    var m = /^(-?(?:\d+(?:\.\d+)?|\.\d+))(万|亿|千|[kKwW])$/.exec(s);
    if (m) {
      s = m[1];
      mul = m[2] === "亿" ? 1e8 : (m[2] === "千" || m[2] === "k" || m[2] === "K") ? 1e3 : 1e4;
    }
    var n = parseFloat(s);
    return isFinite(n) ? n * mul : NaN;
  }

  function num(el, fallback) {
    var v = parseNum(el && el.value);
    return isFinite(v) ? v : (fallback || 0);
  }

  /* 非法数字标红：非空但解析不出有限数字的输入框加 .bad，提醒用户改 */
  function markBadInputs(root) {
    var list = (root || document).querySelectorAll(".panel.is-on input.num");
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      var s = String(el.value || "").replace(/[\s,，_]/g, "");
      /* 合法 = 严格数字（可带 万/亿/千/k/w）或 能求值的四则表达式；否则标红（如 1..2、-、1.2.3） */
      var ok = /^-?(\d+(\.\d+)?|\.\d+)(万|亿|千|[kKwW])?$/.test(s) || (/[+\-*/()]/.test(s) && isFinite(evalExpr(s)));
      el.classList.toggle("bad", s !== "" && !ok);
    }
  }

  /* ---- 数字输入增强：千分位显示、1.5万/2k 简写、上下键步进 ---- */
  function trimNum(n) {
    if (!isFinite(n)) return "";
    return String(Math.round(n * 1e6) / 1e6);
  }
  function numKey(e) {
    if (e.key === "Enter") {
      /* 数字框里按 Enter = 跳到下一个输入（等效 Tab），批量录入更顺 */
      var list = [].slice.call((e.target.closest(".panel") || document).querySelectorAll("input.num"));
      var idx = list.indexOf(e.target);
      var next = list[(idx + 1) % list.length];
      e.preventDefault();
      if (next && next !== e.target) { next.focus(); try { next.select(); } catch (e2) {} }
      return;
    }
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    var el = e.target;
    if (!el || !el.classList || !el.classList.contains("num")) return;
    var step = Math.abs(parseFloat(el.getAttribute("step"))) || 1;
    if (e.shiftKey) step *= 10;
    var cur = parseNum(el.value);
    if (!isFinite(cur)) cur = 0;
    var next = e.key === "ArrowUp" ? cur + step : cur - step;
    var min = parseFloat(el.getAttribute("min")), max = parseFloat(el.getAttribute("max"));
    if (isFinite(min)) next = Math.max(min, next);
    if (isFinite(max)) next = Math.min(max, next);
    e.preventDefault();
    el.value = trimNum(next);
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }
  function numFocus(e) {
    var el = e.target;
    if (el && el.classList && el.classList.contains("num")) {
      el.value = el.value.replace(/[,\s]/g, "");
      try { el.select(); } catch (err) {}
    }
  }
  function numBlur(e) {
    var el = e.target;
    if (!el || !el.classList || !el.classList.contains("num")) return;
    var v = parseNum(el.value);
    if (!isFinite(v)) { el.value = ""; toast("这个格子不是有效数字，已清空，请重新填"); return; }
    /* 简写先还原成数字，再过千分位显示；小数位按原值保留 */
    el.value = Math.abs(v) >= 1000 ? v.toLocaleString("zh-CN", { maximumFractionDigits: 6 }) : trimNum(v);
  }
  function numInput(e) {
    var el = e.target;
    if (!el || !el.classList || !el.classList.contains("num")) return;
    var clean = el.value.replace(/[^0-9.\-+*/()万千亿kKwW,，\s]/g, "");
    if (clean !== el.value) el.value = clean;
  }
  /* 哪些输入框带内嵌单位（% / 年 / 月 / 天 / 岁 / 公里…）。金额框不在这张表里，保持干净。 */
  function unitFor(id) {
    if (id === "fx-rate") return "";                       // 汇率是「1 外币 = ? 人民币」
    if (id === "ud-rate") return "‱";                       // 逾期日利率是万分之几
    if (id === "lab-srate" || id === "lab-arate") return "元/时";
    if (id === "dl-discount") return "折";
    if (/(-rate|-growth|-ratio|-down|-deed|-agent|-vac|-swr)$/.test(id)) return "%";
    if (id === "rb-invest" || id === "rv-invest" || id === "bxsp-goal") return "%";
    if (/(-years)$/.test(id)) return "年";
    if (/(-months)$/.test(id)) return "月";
    if (/(-days)$/.test(id)) return "天";
    if (/(-km)$/.test(id)) return "公里";
    if (["hk-age","rp-age","ed-age","ra-age","fr-age","cc-age","pa-age"].indexOf(id) >= 0) return "岁";
    return "";
  }
  function enhanceNums(root) {
    var list = (root && root.querySelectorAll ? root : document).querySelectorAll('input[type="number"],input.num');
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      if (el.getAttribute("data-num")) continue;
      el.setAttribute("data-num", "1");
      if (el.type === "number") el.type = "text";
      el.classList.add("num");
      if (!el.getAttribute("inputmode")) el.setAttribute("inputmode", "decimal");
      el.setAttribute("autocomplete", "off");
      el.addEventListener("keydown", numKey);
      el.addEventListener("focus", numFocus);
      el.addEventListener("blur", numBlur);
      el.addEventListener("input", numInput);
      /* 内嵌单位：包一层 .suff，单位放在输入框右端（不参与保存） */
      var u = unitFor(el.id || "");
      if (u && !el.parentNode.classList.contains("suff")) {
        var wrap = document.createElement("span");
        wrap.className = "suff";
        el.parentNode.insertBefore(wrap, el);
        wrap.appendChild(el);
        var unit = document.createElement("i");
        unit.className = "unit";
        unit.textContent = u;
        wrap.appendChild(unit);
      }
    }
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

    if ($("ln-links")) $("ln-links").innerHTML = "接着算："
      + linkTo("prepay", { "pp-principal": P, "pp-rate": num($("ln-rate")), "pp-months": n }, "提前还款能省多少")
      + linkTo("loanways", { "lw-balance": P, "lw-rate": num($("ln-rate")), "lw-months": n }, "三种还法对撞")
      + linkTo("combo", { "cb-commercial": P, "cb-commercial-rate": num($("ln-rate")), "cb-years": Math.round(n / 12) }, "换成组合贷")
      + linkTo("penalty", { "py-balance": P, "py-rate": num($("ln-rate")), "py-months": n }, "违约金临界点");

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
    if ($("pp-links")) $("pp-links").innerHTML = "接着算："
      + linkTo("penalty", { "py-balance": P, "py-rate": num($("pp-rate")), "py-months": n, "py-lump": prepay }, "扣掉违约金还划算吗")
      + linkTo("repayvs", { "rv-principal": P, "rv-rate": num($("pp-rate")), "rv-months": n, "rv-cash": prepay }, "还是拿去理财")
      + linkTo("loanways", { "lw-balance": P, "lw-rate": num($("pp-rate")), "lw-months": n, "lw-lump": prepay }, "缩期限 vs 减月供");
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

  /* 站内跳转：把当前算出来的数带进目标模块的参数里，点一下就到那边并填好 */
  function linkTo(mod, params, label) {
    var q = [];
    for (var k in params) {
      if (!Object.prototype.hasOwnProperty.call(params, k)) continue;
      var v = params[k];
      if (v === undefined || v === null || v === "" || isNaN(v)) continue;
      q.push(k + "=" + encodeURIComponent(Math.round(Number(v) * 100) / 100));
    }
    return '<a href="#' + mod + (q.length ? "?" + q.join("&") : "") + '">' + (label || mod) + "</a>";
  }

  /* 「下一步常用」：算完一个模块，在结果卡底部给出最顺手的后续入口 */
  var NEXT_OF = {
    deposit: [["compound", "复利定投"], ["ladder", "存单阶梯"], ["annual", "算实际年化"]],
    loan: [["prepay", "提前还款"], ["combo", "组合贷"], ["loanways", "三种还法对撞"]],
    prepay: [["penalty", "违约金临界点"], ["loanways", "还法对撞"]],
    combo: [["fund", "公积金可贷"], ["loan", "纯商贷对比"]],
    compound: [["goal", "攒钱目标"], ["fire", "FIRE 自由"]],
    goal: [["compound", "复利定投"], ["fire", "FIRE 自由"]],
    installment: [["card", "信用卡分期"], ["zeroloan", "0 利率真实成本"]],
    annual: [["compound", "复利定投"], ["installment", "分期真实年化"]],
    tax: [["bonus", "年终奖拆分"], ["settle", "年度汇算"], ["salary", "到手工资"]],
    salary: [["tax", "个税"], ["bonus", "年终奖拆分"]],
    settle: [["tax", "个税"], ["bonus", "年终奖拆分"]],
    bonus: [["tax", "个税"], ["settle", "年度汇算"]],
    healthcheck: [["report", "一页体检报告"], ["balance", "资产负债"]],
    report: [["balance", "资产负债"], ["cashflow", "现金流月历"]],
    balance: [["cashflow", "现金流月历"], ["report", "一页体检报告"]],
    rentbuy: [["rentyield", "租售比"], ["housecash", "购房一次性支出"]],
    housecash: [["rentbuy", "租还是买"], ["budget", "买房预算反推"]],
    emergency: [["report", "一页体检报告"], ["cashflow", "现金流月历"]]
  };
  function renderNext(name) {
    var panel = document.querySelector(".panel.is-on");
    if (!panel) return;
    var card = panel.querySelector(".card.res");
    if (!card) return;
    var box = card.querySelector(".next");
    if (!box) {
      box = document.createElement("div");
      box.className = "next";
      card.appendChild(box);
    }
    var list = NEXT_OF[name];
    if (!list || !list.length) { box.hidden = true; box.innerHTML = ""; return; }
    /* 按最近使用排序：最近用过的排最前，其余保持默认顺序 */
    list = list.slice().sort(function (a, b) {
      var ia = recentList.indexOf(a[0]), ib = recentList.indexOf(b[0]);
      if (ia < 0) ia = 1e6; if (ib < 0) ib = 1e6;
      return ia - ib;
    });
    var html = [];
    for (var i = 0; i < list.length; i++) html.push('<a href="#' + list[i][0] + '">' + list[i][1] + "</a>");
    box.hidden = false;
    box.innerHTML = "下一步常用：" + html.join(" · ");
  }

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
    if ($("gl-links")) $("gl-links").innerHTML = "接着算："
      + linkTo("compound", { "cp-start": start, "cp-monthly": pmt, "cp-rate": num($("gl-rate")), "cp-years": years }, "放着不动能滚成多少")
      + linkTo("fire", { "fr-has": start + pmt * 12, "fr-save": pmt }, "离财务自由还有多远")
      + linkTo("deposit", { "dp-principal": target }, "目标金额存定期能有多少利息");
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
    if ($("rb-links")) $("rb-links").innerHTML = "接着算："
      + linkTo("housecash", { "hcx-price": price }, "签字当天要备多少现金")
      + linkTo("rentyield", { "ry-price": price, "ry-rent": num($("rb-rent")) }, "从房东视角看租售比")
      + linkTo("deed", { "dd-price": price }, "二手房税费多少")
      + linkTo("budget", { "bg-cash": num($("rb-price")) * num($("rb-down")) / 100 }, "这个首付能撑多贵的房");
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
    if ($("ry-links")) $("ry-links").innerHTML = "接着算："
      + linkTo("rentbuy", { "rb-price": price, "rb-rent": rent }, "换成租客视角比一比")
      + linkTo("housecash", { "hcx-price": price }, "这套房签字要备多少现金")
      + linkTo("rentup", { "ru-cur": rent }, "涨租多少值得搬家");
  }

  /* ================= 年度汇算退税 ================= */
  function calcSettle() {
    var wage = Math.max(0, num($("st2-wage"), 0));
    var ins = Math.max(0, num($("st2-ins"), 0));
    var special = Math.max(0, num($("st2-special"), 0));
    var other = Math.max(0, num($("st2-other"), 0));
    var withheld = Math.max(0, num($("st2-withheld"), 0));

    var income = wage + other * 0.8;
    var taxable = Math.max(0, income - 60000 - ins - special);
    var tax = taxBy(YEAR_TABLE, taxable);
    var diff = tax - withheld;
    var rate = 0;
    for (var i = 0; i < YEAR_TABLE.length; i++) { if (taxable <= YEAR_TABLE[i][0]) { rate = YEAR_TABLE[i][1]; break; } }
    var real = income > 0 ? tax / income : 0;

    $("st2-diff").textContent = diff <= 0 ? "退税 " + money(-diff) : "补税 " + money(diff);
    $("st2-diff-unit").textContent = "元";
    $("st2-income").textContent = yuan(income);
    $("st2-taxable").textContent = yuan(taxable);
    $("st2-tax").textContent = yuan(tax);
    $("st2-pre").textContent = yuan(withheld);
    $("st2-marginal").textContent = pct(rate, 0);
    $("st2-real").textContent = pct(real, 2);

    var note = "汇算就是把全年收入合起来重算一遍：综合所得收入额 " + money(income) + " − 起征点 60,000 − 三险一金 "
      + money(ins) + " − 专项附加扣除 " + money(special) + " = 应纳税所得额 " + money(taxable)
      + "，对应 " + pct(rate, 0) + " 档，全年应纳税额 " + money(tax) + "；和你已经预扣的 " + money(withheld) + " 一比，"
      + (diff < 0 ? "国家要退你 " + money(-diff) + " 元。" : (diff > 0 ? "你还要补 " + money(diff) + " 元。" : "正好不补不退。"));
    if (diff < 0) note += " 常见退税原因：平时没填专项附加扣除、年中换工作或失业导致重复扣除起征点、劳务报酬预扣率（20% 起）高于综合所得税率。";
    if (diff > 0) note += " 常见补税原因：两处以上工资薪金、多处劳务报酬、年中换工作后新单位重新扣起征点。补税不超过 400 元可免申报，超过要在 6 月 30 日前缴清，逾期有滞纳金。";
    note += " 别忘了还有两项能抵：个人养老金账户每年 12,000 元、符合条件的公益捐赠（不超应纳税所得额 30%）。专项附加扣除当年没填的，可以在汇算时补填，也能在三年内更正申报。";
    $("st2-note").textContent = note;
  }

  /* ================= 家庭资产负债表 ================= */
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

  /* ================= 灵活就业社保 ================= */
  function calcSelfIns() {
    var avg = Math.max(1, num($("si-avg"), 8000));
    var ratio = Math.min(300, Math.max(40, num($("si-ratio"), 60))) / 100;
    var pr = Math.max(0, num($("si-pension"), 20)) / 100;
    var mr = Math.max(0, num($("si-med"), 9)) / 100;
    var yrs = Math.max(1, num($("si-years"), 15));
    var age = parseInt($("si-age").value, 10) || 60;
    var div = DIVISOR[age] || 139;
    var ar = Math.max(0, num($("si-accountrate"), 2)) / 100;

    var base = avg * ratio;
    var pensionFee = base * pr, medFee = base * mr;
    var month = pensionFee + medFee;
    var accMonth = base * 0.08;
    var year = month * 12;
    var total = year * yrs;
    var ann = accMonth * 12;
    var accBal = ar > 0 ? ann * (Math.pow(1 + ar, yrs) - 1) / ar : ann * yrs;

    var index = base / avg;
    var basePension = (avg + avg * index) / 2 * yrs * 0.01;
    var accPension = accBal / div;
    var pension = basePension + accPension;
    var payback = pension > 0 ? total / (pension * 12) : 0;

    $("si-month").textContent = money(month);
    $("si-base").textContent = yuan(base) + "（社平的 " + pct(ratio, 0) + "）";
    $("si-split").textContent = money(pensionFee) + " / " + money(medFee) + " 元";
    $("si-accmonth").textContent = yuan(accMonth);
    $("si-year").textContent = yuan(year);
    $("si-total").textContent = yuan(total);
    $("si-accbal").textContent = yuan(accBal);
    $("si-pension-out").textContent = yuan(pension);
    $("si-payback").textContent = payback > 0 ? fmt(payback, 1) + " 年" : "—";

    $("si-note").textContent = "灵活就业自己全额缴，基数按社平的 " + pct(ratio, 0) + " = " + money(base) + " 元/月：养老 "
      + pct(pr, 0) + "（" + money(pensionFee) + "）+ 医疗 " + pct(mr, 0) + "（" + money(medFee) + "）= 每月 " + money(month) + " 元。"
      + " 关键区别：在职时单位替你出养老 16%，灵活就业这笔全归你自己掏，但只有 8%（" + money(accMonth) + " 元/月）进你个人账户，另外 "
      + pct(pr - 0.08, 0) + " 进统筹——所以「回本」不能只看个人账户，要算总缴费 ÷ 年养老金 = " + fmt(payback, 1) + " 年。"
      + " 缴 " + fmt(yrs, 0) + " 年、按记账利率 " + pct(ar, 1) + " 复利，账户攒到 " + money(accBal) + "，加上基础养老金 "
      + money(basePension) + "，退休每月约 " + money(pension) + " 元。"
      + " 实操提醒：医保各地费率与是否捆绑不同，有的城市可只缴养老；医保缴满当地规定年限（男 25/女 20 年居多）退休后才能终身免费享受；"
      + " 就业困难人员/4050 有社保补贴（常见补 2/3），别忘申请；断缴会影响买房买车落户的连续缴费年限。";
  }

  /* ================= 社保少缴核查 ================= */
  function calcUnderpay() {
    var wage = Math.max(0, num($("up-wage"), 0));
    var base = Math.max(0, num($("up-base"), 0));
    var pr = Math.max(0, num($("up-personal"), 10.5)) / 100;
    var cr = Math.max(0, num($("up-company"), 26.5)) / 100;
    var hf = Math.min(12, Math.max(0, num($("up-hf"), 5))) / 100;

    var diffBase = Math.max(0, wage - base);
    var pgap = diffBase * pr, cgap = diffBase * cr;
    var gap = pgap + cgap;
    var acc = diffBase * 0.08;

    $("up-gap").textContent = money(gap);
    $("up-diffbase").textContent = yuan(diffBase);
    $("up-pgap").textContent = yuan(pgap) + " / 月";
    $("up-cgap").textContent = yuan(cgap) + " / 月";
    $("up-acc").textContent = yuan(acc) + " / 月";
    $("up-year").textContent = yuan(gap * 12);
    $("up-ten").textContent = yuan(gap * 120);

    $("up-note").textContent = "按你的实际工资 " + money(wage) + " 元算，公司只按 " + money(base) + " 元申报，少报基数 "
      + money(diffBase) + " 元：个人部分每月少缴 " + money(pgap) + "（你到手多一点，但账户少积累）、单位每月少缴 "
      + money(cgap) + "（本该给你出的钱），合计每月 " + money(gap) + " 元、每年 " + money(gap * 12) + " 元。"
      + " 公积金按 " + pct(hf, 0) + " 两侧各算，每月还少 " + money(diffBase * hf * 2) + " 元（单位那半边是净损失）。"
      + " 直接后果：个人账户养老金每月少积累 " + money(acc) + "；医保个人账户少划入、住院报销封顶与大病保险跟着基数走；"
      + " 生育津贴、失业金、工伤一次性补助、公积金贷款额度（多数城市按缴存基数算）全部被压低。"
      + " 这是明确的违法行为——《社会保险法》第 60 条要求按本人工资足额申报、不得减免，第 86 条规定可加收滞纳金并处欠缴额 1–3 倍罚款。"
      + " 维权路径：先留证据（劳动合同、工资流水、工资条、考勤），再向社保费征收机构（现多为税务）或社保稽核部门举报，也可打 12333/12345；"
      + " 要求补缴社保一般不属劳动仲裁受案范围，走稽核更有效。提醒一句：举报后公司通常会知道，先想好自己的退路。";
  }


  /* ---------------- 三种还法对撞 ---------------- */
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

  /* ---------------- 定投 vs 一次性 ---------------- */
  function gauss() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function percentile(arr, p) {
    if (!arr.length) return 0;
    var a = arr.slice().sort(function (x, y) { return x - y; });
    var idx = (a.length - 1) * p;
    var lo = Math.floor(idx), hi = Math.ceil(idx);
    if (lo === hi) return a[lo];
    return a[lo] + (a[hi] - a[lo]) * (idx - lo);
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

  /* ---------------- 保单体检 ---------------- */
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

  /* ---------------- 到期日历 ---------------- */
  function parseDate(str) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((str || "").trim());
    if (!m) return null;
    var d = new Date(+m[1], +m[2] - 1, +m[3]);
    return isNaN(d.getTime()) ? null : d;
  }

  function addMonths(d, monthsToAdd) {
    var y = d.getFullYear(), mo = d.getMonth() + monthsToAdd, day = d.getDate();
    var first = new Date(y, mo, 1);
    var lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    return new Date(first.getFullYear(), first.getMonth(), Math.min(day, lastDay));
  }

  function fmtDate(d) {
    var mm = d.getMonth() + 1, dd = d.getDate();
    return d.getFullYear() + "-" + (mm < 10 ? "0" : "") + mm + "-" + (dd < 10 ? "0" : "") + dd;
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

  /* ---------------- 债务先还哪笔：雪崩 vs 雪球 ---------------- */
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

  /* ---------------- FIRE 财务自由 ---------------- */
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

  /* ---------------- 年缴费用分摊 ---------------- */
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

  /* ---------------- 买房预算反推 ---------------- */
  function calcBudget() {
    var income = Math.max(0, num($("bg-income"), 0));
    var cash = Math.max(0, num($("bg-cash"), 0));
    var downPct = Math.min(95, Math.max(0, num($("bg-down"), 30))) / 100;
    var rate = Math.max(0, num($("bg-rate"), 0)) / 100;
    var years = Math.max(1, Math.min(40, num($("bg-years"), 30)));
    var ratio = Math.min(80, Math.max(5, num($("bg-ratio"), 40))) / 100;
    var feePct = Math.max(0, num($("bg-fee"), 5)) / 100;
    var n = Math.round(years * 12), i = rate / 12;

    var payCap = income * ratio;
    var g = Math.pow(1 + i, n);
    var loanCap = i === 0 ? payCap * n : payCap * (1 - 1 / g) / i;
    var pByPay = downPct < 1 ? loanCap / (1 - downPct) : 0;
    var pByCash = downPct + feePct > 0 ? cash / (downPct + feePct) : 0;
    var P = Math.min(pByPay, pByCash);
    var loan = P * (1 - downPct);
    var dp = P * downPct;
    var feeAmt = P * feePct;
    var pay = annuityPayment(loan, i, n);
    var share = income > 0 ? pay / income : 0;

    $("bg-total").textContent = money(P);
    $("bg-paycap").textContent = yuan(payCap) + "（收入 " + pct(ratio, 0) + "）";
    $("bg-loancap").textContent = yuan(loanCap);
    $("bg-byPay").textContent = yuan(pByPay);
    $("bg-byCash").textContent = yuan(pByCash);
    $("bg-bottle").textContent = pByCash <= pByPay ? "现金（凑首付＋税费）" : "月供（收入不够撑）";
    $("bg-downamt").textContent = yuan(dp) + "（" + pct(downPct, 0) + "）";
    $("bg-feeamt").textContent = yuan(feeAmt) + "（" + pct(feePct, 1) + "）";
    $("bg-loan").textContent = yuan(loan) + " / " + yuan(pay);
    $("bg-share").textContent = pct(share, 1);
    $("bg-int").textContent = yuan(pay * n - loan);

    if (income <= 0 || cash <= 0) {
      $("bg-note").textContent = "先把家庭月收入和可动用的现金填上，再看能承受多贵的房子。";
      return;
    }
    var note = "两个约束同时存在，谁先顶住谁说了算：按收入，" + pct(ratio, 0) + " 的月供上限是 " + money(payCap) + " 元/月，"
      + "在 " + fmt(rate * 100, 2) + "%、" + years + " 年下最多贷 " + money(loanCap) + " 元，反推总价上限 " + money(pByPay) + " 元；"
      + "按现金，扣掉 " + pct(downPct, 0) + " 首付和 " + pct(feePct, 1) + " 税费装修，总价上限 " + money(pByCash) + " 元。"
      + " 取小的那个，你能承受的总价是 " + money(P) + " 元，卡在「" + (pByCash <= pByPay ? "现金" : "月供") + "」这一边。"
      + (pByCash <= pByPay
        ? " 也就是说，你的收入其实还能撑更贵的房子，是首付和税费的现金不够。"
        : " 也就是说，你的现金够，是收入撑不起更高的月供——这条更该尊重，别为了买大房把月供顶到收入的 50% 以上。")
      + " 还有三笔钱必须提前留在手里，否则会非常被动：① 契税、增值税、中介费、维修基金（二手房还有卖方税费的谈判空间）；"
      + " ② 装修与家电，通常占房价 8%–15%，二手房更高；③ 至少 6 个月月供的应急金，"
      + " 因为交房后最脆弱的时刻就是「首付掏空＋装修超支」的那半年。"
      + " 另外提醒：月供占比 40% 已经偏紧，30% 以内才叫舒服（银行审批常按 50% 流水，但那是它的风控线，不是你的生活线）；"
      + " 如果只能靠「30 年 + 顶格月供」才买得起，说明这个价位对你的现金流太薄了，先租一段时间或者买小一点，比硬扛更划算。";
    $("bg-note").textContent = note;
  }

  /* ---------------- 商转公能省多少 ---------------- */
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

  /* ---------------- 医保能报多少 ---------------- */
  function calcMedins() {
    var total = Math.max(0, num($("mi-total"), 0));
    var selfFull = Math.min(total, Math.max(0, num($("mi-self"), 0)));
    var ded = Math.max(0, num($("mi-ded"), 0));
    var ratio = Math.min(100, Math.max(0, num($("mi-ratio"), 85))) / 100;
    var cap = Math.max(0, num($("mi-cap"), 0));
    var bigStart = Math.max(0, num($("mi-bigstart"), 0));
    var bigRatio = Math.min(100, Math.max(0, num($("mi-bigratio"), 60))) / 100;

    var inner = Math.max(0, total - selfFull);
    var base = Math.max(0, inner - ded);
    var reimb = cap > 0 ? Math.min(base * ratio, cap) : base * ratio;
    var innerSelf = Math.max(0, inner - reimb);
    var big = Math.max(0, innerSelf - bigStart) * bigRatio;
    var selfPay = Math.max(0, total - reimb - big);
    var allReimb = reimb + big;

    $("mi-net").textContent = money(selfPay);
    $("mi-inner").textContent = yuan(inner);
    $("mi-base").textContent = yuan(base);
    $("mi-reimb").textContent = yuan(reimb);
    $("mi-inner-self").textContent = yuan(innerSelf);
    $("mi-big").textContent = yuan(big);
    $("mi-all").textContent = yuan(allReimb);
    $("mi-rate").textContent = total > 0 ? pct(allReimb / total, 1) : "—";
    $("mi-room").textContent = cap > 0 ? yuan(Math.max(0, cap - reimb)) : "不设封顶";

    if (total <= 0) {
      $("mi-note").textContent = "填住院总费用、完全自费的部分和当地报销规则，就能估出自己要掏多少。";
      return;
    }
    $("mi-note").textContent = "总费用 " + money(total) + " 元里，有 " + money(selfFull) + " 元是目录外全自费，一分不报；"
      + "目录内的 " + money(inner) + " 元先扣掉起付线 " + money(ded) + "，剩 " + money(base) + " 元按 "
      + pct(ratio, 0) + " 报销，统筹基金付 " + money(reimb) + " 元。"
      + (big > 0 ? "目录内自付的 " + money(innerSelf) + " 元超过大病保险起付线 " + money(bigStart) + "，大病保险再报 " + money(big) + " 元。" : "目录内自付 " + money(innerSelf) + " 元还没到大病保险起付线 " + money(bigStart) + "，大病保险这次不启动。")
      + " 所以账面报销比例是 " + pct(ratio, 0) + "，你实际拿到的是 " + pct(total > 0 ? allReimb / total : 0, 1) + "，自付 " + money(selfPay) + " 元。"
      + " 差距全在「目录外全自费」和「起付线」这两块——这也是为什么同样一场病，有人报八成、有人只报五成。"
      + " 各地起付线、报销比例、封顶线、大病保险规则差异很大，请按参保地政策填；职工医保与居民医保也不是一套数。";
  }

  /* ---------------- 养一个孩子要多少钱 ---------------- */
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

  /* ---------------- 个人养老金账户划算吗 ---------------- */
  function calcPPA() {
    var pay = Math.min(12000, Math.max(0, num($("pa-pay"), 0)));
    var age = Math.max(18, Math.min(59, Math.round(num($("pa-age"), 30))));
    var mr = Math.min(45, Math.max(0, num($("pa-rate"), 20))) / 100;
    var yrs = Math.max(1, Math.min(40, Math.round(num($("pa-years"), 20))));
    var ret = Math.max(0, num($("pa-ret"), 4)) / 100;
    var tOut = Math.min(45, Math.max(0, num($("pa-taxout"), 3))) / 100;

    function fv(annual) {
      return ret > 0 ? annual * (Math.pow(1 + ret, yrs) - 1) / ret : annual * yrs;
    }
    var acc = fv(pay);
    var out = acc * tOut;
    var net = acc - out;
    var own = fv(pay * (1 - mr));
    var diff = net - own;

    $("pa-diff").textContent = money(diff);
    $("pa-save").textContent = yuan(pay * mr);
    $("pa-saveall").textContent = yuan(pay * mr * yrs);
    $("pa-acc").textContent = yuan(acc);
    $("pa-out").textContent = yuan(out) + "（" + pct(tOut, 1) + "）";
    $("pa-net").textContent = yuan(net);
    $("pa-own").textContent = yuan(own);
    $("pa-in").textContent = yuan(pay * yrs) + "（每年 " + money(pay) + " × " + yrs + " 年）";

    var body = $("pa-body");
    body.innerHTML = "";
    var list = [0.03, 0.10, 0.20, 0.30, 0.45];
    for (var k = 0; k < list.length; k++) {
      var m = list[k];
      var ownK = fv(pay * (1 - m));
      var d = net - ownK;
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + pct(m, 0) + "</td><td>" + money(pay * m) + "</td><td>" + money(net)
        + "</td><td>" + money(ownK) + "</td><td>" + (d >= 0 ? "+" : "") + money(d) + "</td>";
      body.appendChild(tr);
    }

    if (pay <= 0) {
      $("pa-note").textContent = "填上每年打算放进去的金额（上限 12000 元）和你的边际税率，就能看到这个账户到底划算多少。";
      return;
    }
    $("pa-note").textContent = "工资税率 " + pct(mr, 0) + " 的人，每年放 " + money(pay) + " 元进个人养老金账户，当年少缴个税 " + money(pay * mr) + " 元，"
      + " " + yrs + " 年（" + age + " 岁放到 60 岁）累计省税 " + money(pay * mr * yrs) + " 元。账户里的钱按 " + pct(ret, 1) + " 滚 " + yrs + " 年到 " + money(acc) + " 元，"
      + "退休领取时统一按 " + pct(tOut, 1) + " 缴税 " + money(out) + " 元，最终到手 " + money(net) + " 元；"
      + " 同样这笔钱如果在外面自己投，得先按 " + pct(mr, 0) + " 缴税再投，只剩 " + money(own) + " 元。"
      + " 所以净赚 " + money(diff) + " 元。"
      + " 判断标准就一句：只要你现在的边际税率高于领取时的税率，这个账户就是赚的，赚的是「税率差」，不是收益差。"
      + " 税率 3% 的人基本没好处（省 3% 缴 3%），税率 20% 以上才有明显价值。"
      + " 代价是钱锁到退休（特殊情况如重病、出国定居才能提前取），所以先留够应急金再放；"
      + " 另外这里假设你在账户里买的基金/存款能拿到 " + pct(ret, 1) + " 年化——账户本身不保证收益，选错产品照样亏。";
  }


  /* ---------------- 公积金缴存与额度 ---------------- */
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

  /* ---------------- 应急金 ---------------- */
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

  /* ---------------- 收入分配体检 50/30/20 ---------------- */
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

  /* ---------------- 债务置换 ---------------- */
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

  /* ---------------- 信用卡免息期与最优刷卡日 ---------------- */
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

  /* ---------------- 加班费与请假扣款 ---------------- */
  function calcOvertime() {
    var salary = Math.max(0, num($("ot-salary"), 0));
    var days = Math.max(20, Math.min(31, num($("ot-days"), 21.75)));
    var wd = Math.max(0, num($("ot-wd"), 0));
    var rest = Math.max(0, num($("ot-rest"), 0));
    var hol = Math.max(0, num($("ot-hol"), 0));
    var leave = Math.max(0, num($("ot-leave"), 0));
    var sick = Math.max(0, num($("ot-sick"), 0));
    var sickRate = Math.min(100, Math.max(0, num($("ot-sickrate"), 60))) / 100;

    var dayPay = salary / days;
    var hourPay = dayPay / 8;
    var p1 = hourPay * 1.5 * wd;
    var p2 = hourPay * 2 * 8 * rest;
    var p3 = hourPay * 3 * 8 * hol;
    var ot = p1 + p2 + p3;
    var cutLeave = dayPay * leave;
    var cutSick = dayPay * sick * (1 - sickRate);
    var total = salary + ot - cutLeave - cutSick;

    $("ot-total").textContent = money(total);
    $("ot-hour").textContent = money(dayPay) + " / " + money(hourPay) + " 元";
    $("ot-p1").textContent = yuan(p1) + "（" + wd + " 小时）";
    $("ot-p2").textContent = yuan(p2) + "（" + rest + " 天）";
    $("ot-p3").textContent = yuan(p3) + "（" + hol + " 天）";
    $("ot-ot").textContent = yuan(ot);
    $("ot-ded").textContent = yuan(cutLeave) + " / " + yuan(cutSick);
    $("ot-share").textContent = total > 0 ? pct(ot / total, 1) : "—";

    var body = $("ot-body");
    body.innerHTML = "";
    for (var k = 1; k <= 4; k++) {
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + k + " 小时</td><td>" + money(hourPay * 1.5 * k) + "</td><td>"
        + money(hourPay * 2 * 8 * k) + "</td><td>" + money(hourPay * 3 * 8 * k) + "</td>";
      body.appendChild(tr);
    }

    $("ot-note").textContent = "算法先用「月薪 ÷ " + days + " ÷ 8」折出时薪 " + money(hourPay) + " 元（21.75 是法定的月计薪天数，"
      + "把 11 个法定节假日算进去了，所以别用 30 天除，那样算出来的时薪偏低、加班费吃亏）。"
      + " 工作日加班 1.5 倍、休息日 2 倍、法定节假日 3 倍，本例合计加班费 " + money(ot) + " 元，"
      + " 请假按日薪 " + money(dayPay) + " 元扣，病假按 " + pct(sickRate, 0) + " 发。"
      + " 三个容易被坑的点：① 节假日加班不能用调休顶替，必须给 3 倍工资（休息日才可以先安排补休）；"
      + " ② 加班费基数应是「正常工作时间工资」，很多公司按最低工资或基本工资算，属于违法；"
      + " ③ 每月加班一般不超过 36 小时，超过的部分即使给了钱，也仍然违规。";
  }

  /* ---------------- 涨租 vs 搬家 ---------------- */
  function calcRentUp() {
    var cur = Math.max(0, num($("ru-cur"), 0));
    var newR = Math.max(0, num($("ru-new"), 0));
    var cost = Math.max(0, num($("ru-cost"), 0));
    var alt = Math.max(0, num($("ru-alt"), 0));
    var years = Math.max(0.5, Math.min(20, num($("ru-years"), 3)));

    var stayYear = Math.max(0, newR - cur) * 12;
    var stay = Math.max(0, newR - cur) * 12 * years;
    var move = Math.max(0, alt - cur) * 12 * years + cost;
    var diff = stay - move;
    var gap = newR - alt;
    var be = gap > 0 ? cost / gap : Infinity;

    $("ru-diff").textContent = (diff >= 0 ? "" : "-") + money(Math.abs(diff));
    $("ru-stayyear").textContent = yuan(stayYear);
    $("ru-stay").textContent = yuan(stay) + "（" + years + " 年）";
    $("ru-move").textContent = yuan(move) + "（" + years + " 年）";
    $("ru-breakeven").textContent = gap > 0
      ? (be === Infinity ? "—" : be.toFixed(1) + " 个月")
      : "新房租不比涨后便宜，怎么搬都亏";
    $("ru-line").textContent = cur > 0 ? pct((newR - cur) / cur, 1) + "（涨到 " + money(newR) + " 元）" : "—";

    var body = $("ru-body");
    body.innerHTML = "";
    var list = [1, 2, 3, 5, 8];
    for (var k = 0; k < list.length; k++) {
      var y2 = list[k];
      var s = Math.max(0, newR - cur) * 12 * y2;
      var mv = Math.max(0, alt - cur) * 12 * y2 + cost;
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + y2 + " 年</td><td>" + money(s) + "</td><td>" + money(mv) + "</td><td>"
        + (s > mv ? "搬走省 " + money(s - mv) : "留下省 " + money(mv - s)) + "</td>";
      body.appendChild(tr);
    }

    var note = "房东把房租从 " + money(cur) + " 元涨到 " + money(newR) + " 元（涨 " + pct(cur > 0 ? (newR - cur) / cur : 0, 1) + "），"
      + " 接受的话每年多付 " + money(stayYear) + " 元。搬家在别处租 " + money(alt) + " 元、一次性花 " + money(cost) + " 元，"
      + " 两条路比到 " + years + " 年：留下多付 " + money(stay) + " 元，搬走多付 " + money(move) + " 元，"
      + (diff >= 0 ? "所以搬走更省 " + money(diff) + " 元。" : "所以留下更省 " + money(-diff) + " 元，别折腾。");
    if (gap > 0) {
      note += " 临界点是住满 " + be.toFixed(1) + " 个月：住得比这更久，搬家的固定成本就摊薄了；住不到就该忍下这次涨价。";
    }
    note += " 搬家成本别只算力气钱：中介费通常半个月到一个月房租、押金可能被扣、宽带移机、通勤变远的时间和交通费——"
      + " 一线城市一次搬家真实成本常在 5,000–10,000 元，很多人为了省 200 元/月搬家，结果一年才勉强回本。"
      + " 另外议价时可以直接拿「同地段同户型现在租多少」跟房东谈，行情在跌的时候，房东宁可少涨也不愿空置一个月。";
    $("ru-note").textContent = note;
  }

  /* ---------------- 油车 vs 电车 ---------------- */
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

  /* ---------------- 发票价税分离 ---------------- */
  function calcVat() {
    var amt = Math.max(0, num($("vt-amount"), 0));
    var mode = $("vt-mode").value === "net" ? "net" : "gross";
    var rate = Math.max(0, num($("vt-rate"), 0.13));
    var sur = Math.min(30, Math.max(0, num($("vt-surtax"), 12))) / 100;

    var net, vat, gross;
    if (mode === "net") { net = amt; vat = net * rate; gross = net + vat; }
    else { gross = amt; net = gross / (1 + rate); vat = gross - net; }

    var surAmt = vat * sur;
    $("vt-vat").textContent = money(vat);
    $("vt-net").textContent = yuan(net);
    $("vt-gross").textContent = yuan(gross);
    $("vt-share").textContent = gross > 0 ? pct(vat / gross) : "—";
    $("vt-surtax-amt").textContent = yuan(surAmt);
    $("vt-total-tax").textContent = yuan(vat + surAmt);
    $("vt-deduct").textContent = yuan(vat);

    var rates = [0.13, 0.09, 0.06, 0.05, 0.03, 0.01];
    var body = $("vt-body");
    body.innerHTML = "";
    for (var i = 0; i < rates.length; i++) {
      var r = rates[i], n2, v2, g2;
      if (mode === "net") { n2 = amt; v2 = n2 * r; g2 = n2 + v2; }
      else { g2 = amt; n2 = g2 / (1 + r); v2 = g2 - n2; }
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + pct(r, 0) + "</td><td>" + money(n2) + "</td><td>" + money(v2) +
        "</td><td>" + money(g2) + "</td>";
      if (Math.abs(r - rate) < 1e-9) tr.style.fontWeight = "650";
      body.appendChild(tr);
    }

    $("vt-note").textContent = "公式：不含税 = 含税 ÷ (1 + 税率)，税额 = 不含税 × 税率。开专票的税额对一般纳税人可抵扣，"
      + "开普票不能抵扣（对方是小规模或免税项目）。附加税费（城建 7% + 教育 3% + 地方教育 2%，市区口径，县城/镇为 5%+3%+2%）按实际缴纳的增值税计征，"
      + "不是发票上的项目，别把它算进价税合计。小规模纳税人月销售额未超起征点可免征增值税，具体以当期政策与当地税务口径为准。";
  }

  /* ---------------- 增值税与附加税 ---------------- */
  function calcVatDue() {
    var out = Math.max(0, num($("vd-out"), 0));
    var inn = Math.max(0, num($("vd-in"), 0));
    var carry = Math.max(0, num($("vd-carry"), 0));
    var sales = Math.max(0, num($("vd-sales"), 0));
    var ur = Math.min(20, Math.max(0, num($("vd-urban"), 7))) / 100;
    var er = Math.min(10, Math.max(0, num($("vd-edu"), 3))) / 100;
    var lr = Math.min(10, Math.max(0, num($("vd-local"), 2))) / 100;

    var raw = out - inn - carry;
    var due = Math.max(0, raw);
    var left = Math.max(0, -raw);
    var u = due * ur, e = due * er, l = due * lr;
    var sur = u + e + l;

    $("vd-due").textContent = money(due);
    $("vd-raw").textContent = yuan(raw);
    $("vd-left").textContent = yuan(left);
    $("vd-urban-amt").textContent = yuan(u);
    $("vd-edu-amt").textContent = yuan(e);
    $("vd-local-amt").textContent = yuan(l);
    $("vd-surtax").textContent = yuan(sur);
    $("vd-total").textContent = yuan(due + sur);
    $("vd-burden").textContent = sales > 0 ? pct(due / sales) : "—";

    var body = $("vd-body");
    body.innerHTML = "";
    var ms = [0, 0.1, 0.2, 0.3, 0.4];
    for (var i = 0; i < ms.length; i++) {
      var m = ms[i];
      var d2 = sales * m * 0.13;
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + pct(m, 0) + "</td><td>" + money(d2) + "</td><td>" +
        (sales > 0 ? pct(d2 / sales) : "—") + "</td>";
      body.appendChild(tr);
    }

    $("vd-note").textContent = "应交增值税 = 销项 − 进项 − 期初留抵，结果为负就是留抵，结转下期继续抵，不退税（除非符合留抵退税条件）。"
      + "下表按 13% 税率演示「毛利率越高、增值税税负越重」：税负率 ≈ 税率 × 毛利率，这也是为什么进项票要尽量取全。"
      + "附加税费以实际缴纳的增值税为计税依据，没有应交增值税就不用交附加。小微企业「六税两费」减半等优惠以当期文件为准。";
  }

  /* ---------------- 固定资产折旧 ---------------- */
  function calcDeprec() {
    var cost = Math.max(0, num($("fa-cost"), 0));
    var resRate = Math.min(50, Math.max(0, num($("fa-res"), 5))) / 100;
    var life = Math.max(1, Math.min(40, Math.round(num($("fa-life"), 5))));
    var method = $("fa-method").value;
    var used = Math.max(0, Math.round(num($("fa-used"), 0)));

    var resid = cost * resRate;
    var base = Math.max(0, cost - resid);
    var yrs = [], y, d, nav;

    if (method === "ddb" && life > 2) {
      nav = cost;
      for (y = 1; y <= life - 2; y++) {
        d = nav * (2 / life);
        yrs.push(d);
        nav -= d;
      }
      var tail = Math.max(0, nav - resid) / 2;
      yrs.push(tail);
      yrs.push(tail);
    } else if (method === "syd" && life > 1) {
      var sum = life * (life + 1) / 2;
      for (y = 1; y <= life; y++) yrs.push(base * (life - y + 1) / sum);
    } else {
      for (y = 1; y <= life; y++) yrs.push(base / life);
    }

    var total = 0, acc = 0, rows = "";
    var fullY = Math.floor(used / 12), partM = used % 12;
    var accAt = 0;
    for (y = 0; y < life; y++) {
      total += yrs[y];
      acc += yrs[y];
      rows += "<tr><td>第 " + (y + 1) + " 年</td><td>" + money(yrs[y]) + "</td><td>" +
        money(acc) + "</td><td>" + money(Math.max(0, cost - acc)) + "</td></tr>";
      if (y < fullY) accAt += yrs[y];
      else if (y === fullY) accAt += yrs[y] * (partM / 12);
    }
    $("fa-body").innerHTML = rows;

    var cls = method === "ddb" ? "双倍余额递减" : (method === "syd" ? "年数总和" : "年限平均（直线）");
    $("fa-month").textContent = money(yrs[0] / 12);
    $("fa-year").textContent = yuan(yrs[0]);
    $("fa-total").textContent = yuan(total);
    $("fa-acc").textContent = yuan(accAt);
    $("fa-nav").textContent = yuan(Math.max(0, cost - accAt));
    $("fa-resv").textContent = yuan(resid);
    $("fa-left").textContent = Math.max(0, life * 12 - used).toLocaleString("zh-CN") + " 个月";

    $("fa-note").textContent = "当前方法：" + cls + "。「每月折旧」按首年折旧额 ÷ 12 折算，加速折旧法下各月金额其实不同，年度表更准。"
      + "税法最低折旧年限（企业所得税法实施条例）：房屋建筑物 20 年，机器设备等生产设备 10 年，器具家具等 5 年，运输工具 4 年（飞机火车轮船外），电子设备 3 年；"
      + "会计上可以按实际使用寿命，但汇算清缴时低于税法年限要做纳税调整。折旧当月增加的固定资产当月不提、下月起提，当月减少的当月照提。";
  }

  /* ---------------- 保本点与目标利润 ---------------- */
  function calcBreakEven() {
    var price = Math.max(0, num($("be-price"), 0));
    var vc = Math.max(0, num($("be-vc"), 0));
    var fc = Math.max(0, num($("be-fc"), 0));
    var per = $("be-period").value === "year" ? "年" : "月";
    var target = Math.max(0, num($("be-target"), 0));
    var qty = Math.max(0, num($("be-qty"), 0));

    var cm = price - vc;
    var cmr = price > 0 ? cm / price : 0;
    var bep = cm > 0 ? fc / cm : Infinity;
    var tq = cm > 0 ? (fc + target) / cm : Infinity;
    var profit = qty * cm - fc;
    var mos = qty > 0 && isFinite(bep) ? (qty - bep) / qty : 0;
    var dol = profit !== 0 ? qty * cm / profit : Infinity;

    $("be-bep").textContent = isFinite(bep) ? Math.ceil(bep).toLocaleString("zh-CN") : "—";
    $("be-cm").textContent = yuan(cm);
    $("be-cmr").textContent = pct(cmr);
    $("be-beps").textContent = isFinite(bep) ? yuan(bep * price) : "—";
    $("be-tq").textContent = isFinite(tq) ? Math.ceil(tq).toLocaleString("zh-CN") + " 件" : "—";
    $("be-ts").textContent = isFinite(tq) ? yuan(tq * price) : "—";
    $("be-profit").textContent = yuan(profit);
    $("be-mos").textContent = cm > 0 ? pct(mos) : "—";
    $("be-dol").textContent = cm > 0 && isFinite(dol) ? fmt(dol, 2) + " 倍" : "—";

    var body = $("be-body");
    body.innerHTML = "";
    var picks = [0.6, 0.8, 1, 1.2, 1.4], i, q, tr;
    for (i = 0; i < picks.length; i++) {
      q = isFinite(bep) ? Math.round(bep * picks[i]) : 0;
      tr = document.createElement("tr");
      tr.innerHTML = "<td>" + q.toLocaleString("zh-CN") + " 件</td><td>" + money(q * price) +
        "</td><td>" + money(q * cm) + "</td><td>" + money(q * cm - fc) + "</td>";
      body.appendChild(tr);
    }

    if (cm <= 0) {
      $("be-note").textContent = "单价不高于单位变动成本（边际贡献 ≤ 0），每卖一件都在贴钱，卖得越多亏得越多，没有保本销量可言。"
        + "先把单价、料工费（变动成本）或固定成本这三项之一改到边际贡献为正，再回来看保本点。";
      return;
    }
    $("be-note").textContent = "保本销量 = 固定成本 ÷ 单位边际贡献；目标销量 = （固定成本 + 目标利润）÷ 单位边际贡献。"
      + "固定成本按" + per + "填写，结果也都是" + per + "口径。安全边际率 = （实际销量 − 保本销量）÷ 实际销量，低于 20% 说明离亏损很近。"
      + "经营杠杆 = 边际贡献 ÷ 利润，倍数为 3 表示销量降 10%，利润就掉 30%——固定成本越重，杠杆越高。";
  }

  /* ---------------- 报表体检（杜邦） ---------------- */
  function calcRatios() {
    var rev = Math.max(0, num($("rt-rev"), 0));
    var cogs = Math.max(0, num($("rt-cogs"), 0));
    var npf = num($("rt-np"), 0);
    var ca = Math.max(0, num($("rt-ca"), 0));
    var inv = Math.max(0, num($("rt-inv"), 0));
    var ar = Math.max(0, num($("rt-ar"), 0));
    var cl = Math.max(0, num($("rt-cl"), 0));
    var ta = Math.max(0, num($("rt-ta"), 0));
    var tl = Math.max(0, num($("rt-tl"), 0));
    var eq = num($("rt-eq"), 0);
    if (eq <= 0) eq = ta - tl;

    var gm = rev > 0 ? (rev - cogs) / rev : 0;
    var nm = rev > 0 ? npf / rev : 0;
    var cr = cl > 0 ? ca / cl : 0;
    var qr = cl > 0 ? (ca - inv) / cl : 0;
    var lev = ta > 0 ? tl / ta : 0;
    var roa = ta > 0 ? npf / ta : 0;
    var roe = eq > 0 ? npf / eq : 0;
    var turn = ta > 0 ? rev / ta : 0;
    var mult = eq > 0 ? ta / eq : 0;
    var ard = rev > 0 ? ar / rev * 365 : 0;
    var invd = cogs > 0 ? inv / cogs * 365 : 0;

    $("rt-roe").textContent = pct(roe);
    $("rt-gm").textContent = pct(gm);
    $("rt-nm").textContent = pct(nm);
    $("rt-cr").textContent = fmt(cr, 2);
    $("rt-qr").textContent = fmt(qr, 2);
    $("rt-lev").textContent = pct(lev);
    $("rt-roa").textContent = pct(roa);
    $("rt-ard").textContent = fmt(ard, 1) + " 天";
    $("rt-invd").textContent = fmt(invd, 1) + " 天";
    $("rt-cycle").textContent = fmt(ard + invd, 1) + " 天";

    var rows = [
      ["净利率（赚不赚钱）", pct(nm)],
      ["× 总资产周转率（转得快不快）", fmt(turn, 3) + " 次"],
      ["× 权益乘数（借了多少杠杆）", fmt(mult, 2) + " 倍"],
      ["= ROE（股东回报）", pct(nm * turn * mult)]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td></tr>";
    }
    $("rt-body").innerHTML = html;

    $("rt-note").textContent = "杜邦恒等式：ROE = 净利率 × 总资产周转率 × 权益乘数，三条路都能把 ROE 做上去，但靠加杠杆风险最大。"
      + "周转天数按 365 天算：应收账款周转天数 = 平均应收 ÷ 营业收入 × 365，存货周转天数 = 平均存货 ÷ 营业成本 × 365（用期末数会失真，有条件用期初期末平均）。"
      + "各行业基准差异极大（超市流动比率低于 1 也正常，重工业 2 以上才稳），这里不给标准值，只给你自己的数。";
  }

  /* ---------------- 银行余额调节 ---------------- */
  function calcRecon() {
    var book = num($("rc-book"), 0);
    var bank = num($("rc-bank"), 0);
    var a = Math.max(0, num($("rc-a"), 0));
    var b = Math.max(0, num($("rc-b"), 0));
    var c = Math.max(0, num($("rc-c"), 0));
    var d = Math.max(0, num($("rc-d"), 0));

    var s1 = book + c - d;
    var s2 = bank + a - b;
    var diff = s1 - s2;

    $("rc-final").textContent = money(s1);
    $("rc-side1").textContent = yuan(s1);
    $("rc-side2").textContent = yuan(s2);
    $("rc-diff").textContent = yuan(diff);
    $("rc-net").textContent = yuan(c - d);
    $("rc-verdict").textContent = Math.abs(diff) < 0.005 ? "两边相等，调节表平，可存档"
      : "不平，差 " + money(Math.abs(diff)) + " 元，要逐笔查";

    var rows = [
      ["企业已收、银行未收（在途支票 / 未到账）", "加在银行对账单侧", a],
      ["企业已付、银行未付（开出未兑付支票）", "减在银行对账单侧", b],
      ["银行已收、企业未收（托收、利息、退款）", "加在企业账面侧", c],
      ["银行已付、企业未付（手续费、代扣）", "减在企业账面侧", d]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" +
        money(rows[i][2]) + "</td></tr>";
    }
    $("rc-body").innerHTML = html;

    $("rc-note").textContent = "调节思路：企业账面余额加「银行已收企业未收」、减「银行已付企业未付」，得到调节后余额；"
      + "银行对账单余额加「企业已收银行未收」、减「企业已付银行未付」，得到同一个数。两边相等说明账没记错。"
      + "不平的常见原因：一方记账金额错、漏记一笔、把收款方记错，或银行扣了年费/短信费没入账。调节表只解决「时间差」，"
      + "真记错的必须做凭证更正，不能靠调节表抹平。";
  }

  /* ---------------- 差旅报销单合计 ---------------- */
  function calcExpense() {
    var days = Math.max(1, Math.round(num($("ex-days"), 1)));
    var nights = Math.max(0, Math.round(num($("ex-nights"), 0)));
    var hotel = Math.max(0, num($("ex-hotel"), 0));
    var hstd = Math.max(0, num($("ex-hstd"), 0));
    var mealStd = Math.max(0, num($("ex-meal"), 0));
    var local = Math.max(0, num($("ex-local"), 0));
    var travel = Math.max(0, num($("ex-travel"), 0));
    var other = Math.max(0, num($("ex-other"), 0));

    var hotelTotal = nights * hotel;
    var overPer = Math.max(0, hotel - hstd);
    var over = overPer * nights;
    var hotelOk = hotelTotal - over;
    var meal = days * mealStd;
    var total = hotelTotal + meal + local + travel + other;
    var paid = total - over;
    var vatHotel = Math.round(hotelOk / 1.06 * 0.06 * 100) / 100;
    var vatTravel = Math.round(travel / 1.09 * 0.09 * 100) / 100;
    var vat = vatHotel + vatTravel;
    var cost = paid - vat;

    $("ex-paid").textContent = money(paid);
    $("ex-total").textContent = yuan(total);
    $("ex-over").textContent = over > 0.005 ? yuan(over) : "无超标";
    $("ex-vat").textContent = yuan(vat) + "（住宿 " + money(vatHotel) + " + 交通 " + money(vatTravel) + "）";
    $("ex-cost").textContent = yuan(cost);
    $("ex-day").textContent = yuan(paid / days);

    var rows = [
      ["住宿", money(hotel) + " × " + nights + " 晚", money(hotelOk),
        over > 0.005 ? "超标 " + money(overPer) + "/晚，共 " + money(over) + " 自付" : "未超标"],
      ["餐补", money(mealStd) + " × " + days + " 天", money(meal), "按天包干，不用票"],
      ["市内交通", "—", money(local), "打车/地铁，可凭票"],
      ["城际交通", "—", money(travel), "火车/机票，9% 可抵扣"],
      ["其他", "—", money(other), "杂费"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" +
        rows[i][2] + "</td><td>" + rows[i][3] + "</td></tr>";
    }
    html += "<tr><td><b>合计</b></td><td>—</td><td><b>" + money(paid) + "</b></td><td>已扣超标 " +
      money(over) + "</td></tr>";
    $("ex-body").innerHTML = html;

    $("ex-note").textContent = "报销口径：住宿、城际交通按含税金额报销，但只有取得增值税专用发票（或按规定可抵扣的客票）"
      + "才能抵扣进项税——住宿 6%、铁路/航空运输 9%，餐补和餐饮发票不能抵扣。所以同样一张 1,350 元的住宿单，"
      + "专票比普票给公司省 " + money(vatHotel) + " 元，这也是财务催着要专票的原因。"
      + "超标部分属于个人消费，不能报销也不能抵税；若要税前扣除，还得并入工资薪金代扣个税。";
  }

  /* ---------------- 应收账款账龄 ---------------- */
  function calcAging() {
    var bs = [
      Math.max(0, num($("ag-b1"), 0)), Math.max(0, num($("ag-b2"), 0)),
      Math.max(0, num($("ag-b3"), 0)), Math.max(0, num($("ag-b4"), 0))
    ];
    var raw = ($("ag-rates") && $("ag-rates").value || "5,10,30,50").split(/[,，\s]+/);
    var rs = [];
    for (var i = 0; i < 4; i++) {
      var p = parseFloat(raw[i]);
      rs.push(isFinite(p) ? Math.max(0, Math.min(100, p)) / 100 : 0);
    }
    var have = Math.max(0, num($("ag-have"), 0));
    var names = ["1 年以内", "1–2 年", "2–3 年", "3 年以上"];

    var total = 0, prov = 0;
    for (var j = 0; j < 4; j++) { total += bs[j]; prov += bs[j] * rs[j]; }
    var delta = prov - have;
    var net = total - prov;

    $("ag-prov").textContent = money(prov);
    $("ag-total").textContent = yuan(total);
    $("ag-rate").textContent = total > 0 ? pct(prov / total) : "—";
    $("ag-have-out").textContent = yuan(have);
    $("ag-delta").textContent = (delta >= 0 ? "补提 " + money(delta) : "冲回 " + money(-delta)) + " 元";
    $("ag-net").textContent = yuan(net);

    var html = "";
    for (var k = 0; k < 4; k++) {
      html += "<tr><td>" + names[k] + "</td><td>" + money(bs[k]) + "</td><td>" +
        (total > 0 ? pct(bs[k] / total) : "—") + "</td><td>" + pct(rs[k]) + "</td><td>" +
        money(bs[k] * rs[k]) + "</td></tr>";
    }
    html += "<tr><td><b>合计</b></td><td><b>" + money(total) + "</b></td><td>100.00%</td><td>" +
      (total > 0 ? pct(prov / total) : "—") + "</td><td><b>" + money(prov) + "</b></td></tr>";
    $("ag-body").innerHTML = html;

    $("ag-note").textContent = "计提比例是公司的会计估计（准则要求按预期信用损失计提），没有法定固定比例，"
      + "但要有依据并能解释：通常 1 年以内 5%、1–2 年 10–30%、2–3 年 30–50%、3 年以上 50–100%，"
      + "个别认定（对方已破产、诉讼中）可单独全额计提。注意会计计提不等于税前扣除——"
      + "坏账准备在汇算时要做纳税调增，只有实际发生损失、按规定留存证据（法院判决、破产清算、逾期 3 年以上等）才能税前扣除，"
      + "「按 5‰ 计提可扣除」是早已废止的旧规定，别再用了。"
      + (delta > 0.005 ? " 本期需补提 " + money(delta) + " 元。" : (delta < -0.005 ? " 本期可冲回 " + money(-delta) + " 元。" : " 本期无需调整。"));
  }

  /* ---------------- 资金排期 ---------------- */
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

  /* ---------------- 含税报价与毛利 ---------------- */
  function calcPricing() {
    var cost = Math.max(0, num($("pr-cost"), 0));
    var margin = Math.max(0, Math.min(95, num($("pr-margin"), 0))) / 100;
    var vat = Math.max(0, num($("pr-vat"), 0)) / 100;
    var disc = Math.max(0, Math.min(90, num($("pr-disc"), 0))) / 100;
    var cust = Math.max(0, num($("pr-cust"), 0));

    var ex = margin >= 0.999 ? NaN : cost / (1 - margin);
    var inc = ex * (1 + vat);
    var gp = ex - cost;
    var discInc = inc * (1 - disc);
    var discEx = discInc / (1 + vat);
    var discGp = discEx - cost;
    var be = cost * (1 + vat);
    var need = disc >= 0.999 ? NaN : ex / (1 - disc) * (1 + vat);

    $("pr-in").textContent = isFinite(inc) ? money(inc) : "—";
    $("pr-ex").textContent = isFinite(ex) ? yuan(ex) : "—";
    $("pr-gp").textContent = isFinite(gp) ? money(gp) + " 元 / " + pct(margin) : "—";
    $("pr-discin").textContent = isFinite(discInc) ? yuan(discInc) : "—";
    $("pr-discgp").textContent = isFinite(discGp)
      ? money(discEx) + " / " + money(discGp) + " 元 / " + (discEx > 0 ? pct(discGp / discEx) : "—")
      : "—";
    $("pr-be").textContent = yuan(be);
    $("pr-need").textContent = isFinite(need) ? yuan(need) : "—";
    if (cust > 0.005) {
      var custEx = cust / (1 + vat);
      var custGp = custEx - cost;
      $("pr-custout").textContent = money(custGp) + " 元 / " + (custEx > 0 ? pct(custGp / custEx) : "—") +
        (custGp < 0 ? "（亏）" : "");
    } else {
      $("pr-custout").textContent = "填了客户价再算";
    }

    var html = "";
    var table = [0, 0.03, 0.05, 0.08, 0.10, 0.15, 0.20];
    for (var i = 0; i < table.length; i++) {
      var d = table[i];
      var pi = inc * (1 - d);
      var pe = pi / (1 + vat);
      var pg = pe - cost;
      html += "<tr" + (Math.abs(d - disc) < 0.001 ? ' class="c-info"' : "") + "><td>" +
        fmt(d * 100, 0) + "%</td><td>" + money(pi) + "</td><td>" + money(pe) + "</td><td>" +
        (pe > 0 ? pct(pg / pe) : "—") + "</td></tr>";
    }
    $("pr-body").innerHTML = html;

    $("pr-note").textContent = "毛利率一律按不含税算：售价 = 成本 ÷ (1 − 毛利率)，再乘 (1 + 税率) 得到含税报价。"
      + "折扣是从含税价上砍的，砍完不含税售价掉得比你想的快——目标毛利 40%，给 5% 折扣就只剩 " +
      (isFinite(discGp) && discEx > 0 ? pct(discGp / discEx, 1) : "—") +
      "，所以要么报价时预留折扣空间（本例要报 " + (isFinite(need) ? money(need) : "—") + " 才能折后仍保住 40%），"
      + "要么把折扣当成让利、明确走审批。另外毛利不等于净利：运费、销售提成、售后成本都要再摊，"
      + "含税报价还要考虑客户能否接受、同行的含税口径是否一致（有的报不含税价，比价前统一口径）。";
  }

  function calcTripleDe() {
    var np = num($("td-np"), 0), da = num($("td-da"), 0);
    var ar = num($("td-ar"), 0), inv = num($("td-inv"), 0), ap = num($("td-ap"), 0);
    var cfo = num($("td-cfo"), 0), cfi = num($("td-cfi"), 0), cff = num($("td-cff"), 0);
    var c0 = num($("td-cash0"), 0), c1 = num($("td-cash1"), 0);
    var ta = num($("td-ta"), 0), tl = num($("td-tl"), 0), te = num($("td-te"), 0);

    var cfoInd = np + da - ar - inv + ap;
    var net = cfo + cfi + cff;
    var c1exp = c0 + net;
    var tlte = tl + te;
    var d1 = cfo - cfoInd, d2 = c1 - c1exp, d3 = ta - tlte;
    var ok1 = Math.abs(d1) < 0.5, ok2 = Math.abs(d2) < 0.5, ok3 = Math.abs(d3) < 0.5;

    $("td-net").textContent = money(net);
    $("td-cfoind").textContent = yuan(cfoInd);
    $("td-d1").textContent = ok1 ? "0.00 元（平）" : money(d1) + " 元（不平）";
    $("td-sum").textContent = yuan(net);
    $("td-c1").textContent = money(c1exp) + " / " + money(c1) + " 元";
    $("td-d2").textContent = ok2 ? "0.00 元（平）" : money(d2) + " 元（不平）";
    $("td-d3").textContent = ok3 ? "0.00 元（平）" : money(d3) + " 元（不平）";

    var bad = [];
    if (!ok1) bad.push("经营现金流");
    if (!ok2) bad.push("现金净增加");
    if (!ok3) bad.push("资产负债表");
    $("td-verdict").textContent = bad.length === 0
      ? "三处都平，可以直接交表"
      : "有 " + bad.length + " 处不平：" + bad.join("、") + "，先查这几处再交表";

    var rows = [
      ["经营现金流：间接法 vs 表上", cfoInd, cfo, d1, ok1,
        "差额先看应收/存货/应付的变动有没有漏项，再看有没有把投资、筹资的现金流记进经营"],
      ["期末现金：期初＋三项 vs 期末", c1exp, c1, d2, ok2,
        "差额通常是受限资金、票据保证金没剔除，或者内部账户调拨没抵销"],
      ["资产 = 负债 + 所有者权益", tlte, ta, d3, ok3,
        "差额多半是本年利润没结转、或者待处理财产损溢还挂着没清"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      html += "<tr" + (r[4] ? "" : ' class="c-soft"') +
        "><td>" + r[0] + "</td><td>" + money(r[1]) + "</td><td>" + money(r[2]) +
        "</td><td>" + money(r[3]) + "</td><td>" + (r[4] ? "平" : "不平") + "</td></tr>";
    }
    $("td-body").innerHTML = html;

    var worst = "";
    if (!ok1) worst = "间接法差 " + money(d1) + " 元（" + rows[0][5] + "）。";
    else if (!ok2) worst = "期末现金差 " + money(d2) + " 元（" + rows[1][5] + "）。";
    else if (!ok3) worst = "资产负债表差 " + money(d3) + " 元（" + rows[2][5] + "）。";
    $("td-note").textContent = worst +
      "三张表的关系是：净利润经折旧摊销和营运资本变动调成经营现金流，经营＋投资＋筹资＝现金净增加，现金净增加接上期初就是期末；资产永远等于负债加权益。" +
      "实务里最常见的不平，一是现金流量表用「直接法」填了、附注的间接法没对上，二是本币折算差额和受限资金没单列。" +
      "这里只验四项主要调整，坏账计提、公允价值变动、投资收益、财务费用这些非付现和筹资性项目要自己补进去。";
  }

  function calcMultiMargin() {
    var rows = [], i, q, p, c;
    for (i = 1; i <= 4; i++) {
      q = Math.max(0, num($("mm-q" + i), 0));
      p = Math.max(0, num($("mm-p" + i), 0));
      c = Math.max(0, num($("mm-c" + i), 0));
      if (q > 0 && p > 0) {
        rows.push({ name: "产品 " + i, q: q, p: p, c: c, rev: q * p, gp: q * (p - c) });
      }
    }
    if (!rows.length) {
      $("mm-margin").textContent = "—";
      $("mm-total").textContent = "填一个销量再算";
      $("mm-lag").textContent = "—";
      $("mm-neg").textContent = "—";
      $("mm-cut").textContent = "—";
      $("mm-drag").textContent = "—";
      $("mm-worst").textContent = "—";
      $("mm-body").innerHTML = "";
      $("mm-note").textContent = "至少给一个产品填销量，才能算加权毛利率。";
      return;
    }

    var TR = 0, TG = 0;
    for (i = 0; i < rows.length; i++) { TR += rows[i].rev; TG += rows[i].gp; }
    var overall = TR > 0 ? TG / TR : 0;

    var lag = [], neg = [];
    for (i = 0; i < rows.length; i++) {
      var m = rows[i].rev > 0 ? rows[i].gp / rows[i].rev : 0;
      rows[i].margin = m;
      rows[i].share = TR > 0 ? rows[i].rev / TR : 0;
      if (m < overall - 0.0001) lag.push(rows[i].name + "（" + pct(m) + "）");
      if (rows[i].gp < -0.005) neg.push(rows[i].name + "（" + pct(m) + "，亏 " + money(-rows[i].gp) + " 元）");
    }

    var TR2 = 0, TG2 = 0;
    for (i = 0; i < rows.length; i++) {
      if (rows[i].gp >= 0) { TR2 += rows[i].rev; TG2 += rows[i].gp; }
    }
    var cutMargin = TR2 > 0 ? TG2 / TR2 : 0;

    var big = rows[0];
    for (i = 1; i < rows.length; i++) if (rows[i].rev > big.rev) big = rows[i];

    $("mm-margin").textContent = pct(overall);
    $("mm-total").textContent = money(TR) + " / " + money(TG) + " 元";
    $("mm-lag").textContent = lag.length ? lag.join("、") : "没有，都在综合毛利率之上";
    $("mm-neg").textContent = neg.length ? neg.join("、") : "没有负毛利产品";
    $("mm-cut").textContent = neg.length
      ? money(TR2) + " / " + money(TG2) + " 元 / " + pct(cutMargin)
      : "没有要剔的，等于全部";
    $("mm-drag").textContent = neg.length ? fmt((cutMargin - overall) * 100, 2) + " 个百分点" : "0.00 个百分点";
    $("mm-worst").textContent = big.name + "（占收入 " + pct(big.share) + "，毛利率 " + pct(big.margin) + "）" +
      (big.margin < overall - 0.0001 ? "，比综合线还低，是拖后腿的" : "，在综合线之上");

    var html = "";
    for (i = 0; i < rows.length; i++) {
      var r = rows[i];
      html += "<tr" + (r.gp < -0.005 ? ' class="c-soft"' : "") + "><td>" + r.name +
        "</td><td>" + fmt(r.q, 0) + "</td><td>" + money(r.rev) + "</td><td>" + money(r.gp) +
        "</td><td>" + pct(r.margin) + "</td><td>" + pct(r.share) + "</td></tr>";
    }
    html += "<tr><td>合计</td><td>—</td><td>" + money(TR) + "</td><td>" + money(TG) +
      "</td><td>" + pct(overall) + "</td><td>100.00%</td></tr>";
    $("mm-body").innerHTML = html;

    $("mm-note").textContent =
      "综合毛利率是「各产品毛利率按收入加权」，不是简单平均——低毛利产品占比一大，整体就被拖下去，这也是「越卖越忙却越不赚钱」的原因。" +
      (neg.length ? "负毛利产品（" + neg[0].split("（")[0] + "）每卖一件都在贴钱，要么提价、要么换料降本、要么直接砍掉或改成外购转手。" : "") +
      "注意这里只算毛利：运费、提成、售后、仓储都还在毛利之下，毛利为正不代表净利为正；砍掉一个产品也只省变动成本，固定费用照旧要摊到剩下产品上。";
  }

  function calcApTerms() {
    var amt = Math.max(0, num($("ap-amt"), 0));
    var disc = Math.max(0, Math.min(50, num($("ap-disc"), 0))) / 100;
    var d1 = Math.max(0, num($("ap-d1"), 0));
    var d2 = Math.max(d1 + 1, num($("ap-d2"), 30));
    var rate = Math.max(0, num($("ap-rate"), 0)) / 100;
    var gap = d2 - d1;

    var discAmt = amt * disc;
    var need = amt - discAmt;
    var ann = disc > 0 && disc < 1 ? (disc / (1 - disc)) * (365 / gap) : NaN;
    var interest = need * rate * (gap / 365);
    var netGain = discAmt - interest;

    $("ap-cost").textContent = isFinite(ann) ? pct(ann) : "—";
    $("ap-discamt").textContent = yuan(discAmt);
    $("ap-need").textContent = money(need) + " 元 / " + fmt(gap, 0) + " 天";
    $("ap-int").textContent = yuan(interest);
    $("ap-net").textContent = money(netGain) + " 元" + (netGain < 0 ? "（早付反而亏）" : "");
    $("ap-crit").textContent = isFinite(ann) ? pct(ann) : "—";

    if (disc <= 0) {
      $("ap-verdict").textContent = "没有折扣，谈不上取舍，能拖到信用期就拖到信用期";
    } else if (netGain > 0) {
      $("ap-verdict").textContent = "该早付：借 " + fmt(rate * 100, 1) + "% 的钱，换 " + pct(ann) + " 的年化回报，净赚 " + money(netGain) + " 元";
    } else {
      $("ap-verdict").textContent = "别早付：资金成本 " + fmt(rate * 100, 1) + "% 已经高过放弃折扣的 " + pct(ann) + "，等到信用期更划算";
    }

    var rateList = [0, 0.04, 0.06, 0.08, 0.10, 0.12, 0.18, 0.24, 0.36];
    var html = "";
    for (var i = 0; i < rateList.length; i++) {
      var rr = rateList[i];
      var it = need * rr * (gap / 365);
      var ng = discAmt - it;
      var hi = Math.abs(rr - rate) < 0.0005 ? ' class="c-info"' : "";
      html += "<tr" + hi + "><td>" + fmt(rr * 100, 0) + "%</td><td>" + money(it) + "</td><td>" +
        money(ng) + "</td><td>" + (ng > 0 ? "该早付" : "不该") + "</td></tr>";
    }
    $("ap-body").innerHTML = html;

    $("ap-note").textContent =
      "口诀：放弃折扣的成本 = 折扣率 ÷ (1 − 折扣率) × 365 ÷ (信用期 − 折扣期)，跟借款利率一比就知道该不该借。2/10 net 30 折成年化是 " +
      (isFinite(ann) ? pct(ann) : "—") + "，这几乎是中国市场上最贵的一笔钱，除非实在借不到，否则一定要拿。" +
      "早付的钱从哪来也要分清：自有闲钱按机会成本算，借钱按实际利率算，还要看银行能不能在折扣期内放款——赶不上就等于白算。" +
      "另一头别忘：早付会把自己的现金流提前抽出去，账上本来就紧的话，先看「资金排期」够不够撑过这几天。";
  }

  function calcAssetLedger() {
    var cards = [], i, v, l, s, m;
    for (i = 1; i <= 3; i++) {
      v = Math.max(0, num($("al-v" + i), 0));
      l = Math.max(0, num($("al-l" + i), 0));
      s = Math.max(0, Math.min(50, num($("al-s" + i), 0))) / 100;
      m = Math.max(0, num($("al-m" + i), 0));
      if (v > 0 && l > 0) {
        var life = l * 12;
        var total = v * (1 - s);
        var dep = total / life;
        var acc = Math.min(dep * m, total);
        var rem = Math.max(0, life - m);
        cards.push({
          name: "卡片 " + i, v: v, life: life, years: l, s: s, m: m,
          dep: rem > 0 ? dep : 0, acc: acc, net: v - acc, rem: rem
        });
      }
    }
    if (!cards.length) {
      $("al-month").textContent = "—";
      $("al-cost").textContent = "填一张卡片再算";
      $("al-acc").textContent = "—";
      $("al-net").textContent = "—";
      $("al-fwd").textContent = "—";
      $("al-done").textContent = "—";
      $("al-body").innerHTML = "";
      $("al-note").textContent = "至少填一张卡片（原值和年限都要大于 0）。";
      return;
    }

    var tDep = 0, tCost = 0, tAcc = 0, tNet = 0, fwd = 0, done = [], near = [];
    for (i = 0; i < cards.length; i++) {
      var c = cards[i];
      tDep += c.dep; tCost += c.v; tAcc += c.acc; tNet += c.net;
      fwd += c.dep * Math.min(12, c.rem);
      if (c.rem <= 0) done.push(c.name);
      else if (c.rem < 3) near.push(c.name + "（剩 " + c.rem + " 个月）");
    }

    $("al-month").textContent = money(tDep);
    $("al-cost").textContent = yuan(tCost);
    $("al-acc").textContent = yuan(tAcc);
    $("al-net").textContent = money(tNet) + " 元 / " + pct(tCost > 0 ? tNet / tCost : 0);
    $("al-fwd").textContent = yuan(fwd);
    var dn = [];
    if (done.length) dn.push("已提足：" + done.join("、"));
    if (near.length) dn.push("快提足：" + near.join("、"));
    $("al-done").textContent = dn.length ? dn.join("；") : "没有，都还在正常计提";

    var html = "";
    for (i = 0; i < cards.length; i++) {
      var c2 = cards[i];
      html += "<tr><td>" + c2.name + "</td><td>" + money(c2.v) + "</td><td>" + fmt(c2.years, 0) + " 年</td><td>" +
        fmt(c2.m, 0) + "</td><td>" + money(c2.dep) + "</td><td>" + money(c2.acc) + "</td><td>" +
        money(c2.net) + "</td><td>" + fmt(c2.rem, 0) + "</td></tr>";
    }
    html += "<tr><td>合计</td><td>" + money(tCost) + "</td><td>—</td><td>—</td><td>" + money(tDep) +
      "</td><td>" + money(tAcc) + "</td><td>" + money(tNet) + "</td><td>—</td></tr>";
    $("al-body").innerHTML = html;

    $("al-note").textContent =
      "直线法：月折旧 = 原值 × (1 − 残值率) ÷ (年限 × 12)，除不尽的尾差放在最后一个月调平（这里没做尾差处理，差了 1–2 分钱是正常的）。" +
      "税法给的是最低年限（房屋建筑物 20 年、机器设备 10 年、器具家具 5 年、运输工具 4 年、电子设备 3 年），会计上可以按实际耐用年限提，但汇算时要按税法年限调整。" +
      "已提足的不能再提，处置时要按账面净值转「固定资产清理」，售价与净值的差走「资产处置损益」；" +
      "残值率 5% 是常见估计，实务里也有直接按 0 提的，一旦定了就要一贯，别一年一变。";
  }

  /* ---------------- 应付账龄 ---------------- */
  function calcPayAge() {
    var a1 = Math.max(0, num($("pg-a1"), 0));
    var a2 = Math.max(0, num($("pg-a2"), 0));
    var a3 = Math.max(0, num($("pg-a3"), 0));
    var a4 = Math.max(0, num($("pg-a4"), 0));
    var term = Math.max(1, num($("pg-term"), 60));
    var buy = Math.max(0, num($("pg-buy"), 0));
    var rate = Math.max(0, num($("pg-rate"), 0)) / 100;

    var tot = a1 + a2 + a3 + a4;
    var amts = [a1, a2, a3, a4];
    var mids = [15, 45, 75, 105];
    var names = ["0–30 天", "31–60 天", "61–90 天", "90 天以上"];

    var wavg = 0, i;
    for (i = 0; i < 4; i++) wavg += amts[i] * mids[i];
    wavg = tot > 0 ? wavg / tot : 0;

    // 按信用期切：整档超过信用期的全额计入，含信用期的那一档按天数比例折算（假定档内均匀分布）
    var lows = [0, 30, 60, 90], ups = [30, 60, 90, 120];
    var over = 0;
    for (i = 0; i < 4; i++) {
      if (term <= lows[i]) over += amts[i];
      else if (term < ups[i]) over += amts[i] * ((ups[i] - term) / (ups[i] - lows[i]));
    }
    var overPct = tot > 0 ? over / tot : 0;
    var days = buy > 0 ? tot / (buy / 30) : NaN;

    $("pg-total").textContent = yuan(tot);
    $("pg-wavg").textContent = tot > 0
      ? fmt(wavg, 1) + " 天（信用期 " + fmt(term, 0) + " 天" + (wavg > term ? "，整体偏长" : "，在期内") + "）"
      : "—";
    $("pg-over").textContent = money(over) + " 元 / " + pct(overPct);
    $("pg-over90").textContent = yuan(a4);
    $("pg-days").textContent = isFinite(days) ? fmt(days, 1) + " 天" : "—";
    $("pg-value").textContent = money(tot * rate) + " 元/年（相当于无息融资）";
    $("pg-extend").textContent = buy > 0 ? money(buy * rate) + " 元/年（多占用一个月采购额）" : "—";
    $("pg-cash").textContent = yuan(tot);

    var html = "";
    for (i = 0; i < 4; i++) {
      var share = tot > 0 ? amts[i] / tot : 0;
      var status;
      if (term >= ups[i]) status = "未到期";
      else if (term > lows[i]) status = "部分超期";
      else if (i === 3) status = "严重超期";
      else status = "已超期";
      var bad = status !== "未到期";
      html += "<tr" + (bad ? ' class="c-bad"' : "") + "><td>" + names[i] + "</td><td>" +
        money(amts[i]) + "</td><td>" + pct(share) + "</td><td>" + status + "</td></tr>";
    }
    $("pg-body").innerHTML = html;

    var risk;
    if (tot <= 0) risk = "没填应付，先按供应商把余额拉出来再分档。";
    else if (overPct >= 0.3) risk = "超期占比 " + pct(overPct) + " 偏高：供应商随时可能停货、加价或走法律程序，先按欠款多的供应商排个沟通顺序。";
    else if (overPct > 0) risk = "超期占比 " + pct(overPct) + "，可控但别拖成习惯，账龄只会越拖越难谈。";
    else risk = "全部在信用期内，账期管理是干净的。";

    $("pg-note").textContent = risk +
      " 账龄按「发票日到今天」分档，信用期填合同里写的付款期限。应付看着是负债，其实是供应商给的无息贷款：余额 " +
      money(tot) + " 元、资金成本 " + fmt(rate * 100, 1) + "%，一年相当于省下 " + money(tot * rate) + " 元利息。" +
      "应付周转天数 = 余额 ÷ 日均采购额，跟同行比才有意义（同行业差 10 天就是竞争力差别）。" +
      "90 天以上的挂账要特别小心：税务上长期挂账可能被核定收入，供应商那边也可能已经起诉或转给催收了，会计上该不该继续挂着要和业务确认。" +
      "反过来，账期不是越长越好——拖到供应商加价、断供、或者给你排到后面发货，隐性成本比省下的利息高得多。";
  }

  /* ---------------- 成本核算（品种法） ---------------- */
  function calcCostCard() {
    var fin = Math.max(0, num($("cw-fin"), 0));
    var wip = Math.max(0, num($("cw-wip"), 0));
    var deg = Math.max(0, Math.min(100, num($("cw-deg"), 0))) / 100;
    var mat = Math.max(0, num($("cw-mat"), 0));
    var lab = Math.max(0, num($("cw-lab"), 0));
    var oh = Math.max(0, num($("cw-oh"), 0));

    var eqMat = fin + wip;              // 材料一次投入，按 100%
    var eqCnv = fin + wip * deg;        // 加工费按完工程度
    var uMat = eqMat > 0 ? mat / eqMat : 0;
    var uLab = eqCnv > 0 ? lab / eqCnv : 0;
    var uOh = eqCnv > 0 ? oh / eqCnv : 0;
    var unit = uMat + uLab + uOh;

    var finCost = fin * unit;
    var wipCost = wip * uMat + wip * deg * (uLab + uOh);
    var totalIn = mat + lab + oh;

    $("cw-unit").textContent = money(unit);
    $("cw-eq").textContent = fmt(eqMat, 2) + " 件 / " + fmt(eqCnv, 2) + " 件";
    $("cw-parts").textContent = money(uMat) + " / " + money(uLab) + " / " + money(uOh);
    $("cw-fincost").textContent = yuan(finCost);
    $("cw-wipcost").textContent = yuan(wipCost);
    $("cw-sum").textContent = money(finCost + wipCost) + " 元（投入合计 " + money(totalIn) + "）";
    $("cw-mix").textContent = unit > 0 ? pct(uMat / unit) + "（材料 " + money(uMat) + " / 人工 " + money(uLab) + " / 制费 " + money(uOh) + "）" : "—";

    var rows = [
      ["直接材料", mat, eqMat, uMat],
      ["直接人工", lab, eqCnv, uLab],
      ["制造费用", oh, eqCnv, uOh]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td>" + rows[i][0] + "</td><td>" + money(rows[i][1]) + "</td><td>" +
        fmt(rows[i][2], 2) + "</td><td>" + money(rows[i][3]) + "</td></tr>";
    }
    html += '<tr class="c-info"><td>合计</td><td>' + money(totalIn) + "</td><td>—</td><td>" +
      money(unit) + "</td></tr>";
    $("cw-body").innerHTML = html;

    $("cw-note").textContent =
      "约当产量法是月末在制品估价的通行做法：材料投产时一次投入，所以在产品按 100% 折算材料；人工和制造费用跟着加工进度走，按完工程度折算（" +
      fmt(deg * 100, 0) + "%）。单位成本 " + money(unit) + " 元/件里，材料占 " + (unit > 0 ? pct(uMat / unit) : "—") +
      "，材料占比越高，降本要先动采购和单耗，而不是裁人。" +
      "完工 " + money(finCost) + " 元转库存商品，在产品 " + money(wipCost) + " 元留在生产成本科目，两项加起来必须等于投入合计 " +
      money(totalIn) + " 元，差一分钱就是归集错了。" +
      "实务上还要注意：废品损失、返工、停工损失要么单列要么按比例摊，别混在正常成本里，否则单位成本会失真；" +
      "多品种就用品种法分批套，或者先按定额/标准成本结转、月末再算差异。";
  }

  /* ---------------- 预算差异分析 ---------------- */
  function calcBudgetVar() {
    var bq = Math.max(0, num($("bv-bq"), 0));
    var bp = Math.max(0, num($("bv-bp"), 0));
    var sq = Math.max(0, num($("bv-sq"), 0));
    var sp = Math.max(0, num($("bv-sp"), 0));
    var aq = Math.max(0, num($("bv-aq"), 0));
    var ap = Math.max(0, num($("bv-ap"), 0));
    var aqty = Math.max(0, num($("bv-aqty"), 0));
    var apx = Math.max(0, num($("bv-apx"), 0));

    var budGP = bq * bp - bq * sq * sp;
    var flexGP = aq * bp - aq * sq * sp;
    var actGP = aq * ap - aqty * apx;

    var volVar = flexGP - budGP;
    var priceVar = (ap - bp) * aq;
    var mpv = (apx - sp) * aqty;
    var mqv = (aqty - aq * sq) * sp;

    var gap = actGP - budGP;

    $("bv-gap").textContent = money(gap) + " 元" + (gap < 0 ? "（不利）" : gap > 0 ? "（有利）" : "");
    $("bv-levels").textContent = money(budGP) + " / " + money(flexGP) + " / " + money(actGP);

    function tag(v) {
      if (Math.abs(v) < 0.005) return "无差异";
      return v > 0 ? "有利 +" + money(v) : "不利 " + money(v);
    }
    $("bv-vol").textContent = tag(volVar);
    $("bv-price").textContent = tag(priceVar);
    $("bv-mpv").textContent = tag(-mpv);
    $("bv-mqv").textContent = tag(-mqv);

    var items = [
      ["销量差异（卖多卖少）", volVar, "销售 / 市场"],
      ["售价差异（价格高低）", priceVar, "销售 / 定价"],
      ["材料价差（买贵买便宜）", -mpv, "采购"],
      ["材料量差（用多用少）", -mqv, "生产 / 工艺"]
    ];
    var worst = items[0], html = "";
    for (var i = 0; i < items.length; i++) {
      var v = items[i][1];
      if (v < worst[1]) worst = items[i];
      var cls = Math.abs(v) < 0.005 ? "持平" : v > 0 ? "有利" : "不利";
      html += "<tr" + (v < 0 ? ' class="c-bad"' : "") + "><td>" + items[i][0] + "</td><td>" +
        money(v) + "</td><td>" + cls + "</td><td>" + items[i][2] + "</td></tr>";
    }
    $("bv-body").innerHTML = html;

    $("bv-main").textContent = worst[1] < -0.005
      ? worst[0] + "　" + money(worst[1]) + " 元（找" + worst[2] + "）"
      : "没有不利差异";

    $("bv-note").textContent =
      "差异要拆成「量」和「价」，否则只知道差了多少、不知道怪谁。三层比较：预算毛利 " + money(budGP) +
      "（预算量×预算价）→ 弹性预算 " + money(flexGP) + "（实际量×预算价，只反映卖多了）→ 实际毛利 " + money(actGP) +
      "（实际量×实际价）。" +
      "价差按实际用量算，量差按标准价算，这样两项加起来正好等于总差异，不会重复计算。" +
      "售价降 5 元是销售的事，材料贵 1 元是采购的事，单耗超标是生产的事——分开算才能找到人。" +
      "注意：材料量差算出来是 0 不代表没问题，可能只是实际用量刚好等于标准，单耗得按月盯着看趋势。";
  }

  /* ---------------- 月度利润表 ---------------- */
  function calcFinReport() {
    var rev = num($("pl-rev"), 0);
    var cogs = Math.max(0, num($("pl-cogs"), 0));
    var taxS = Math.max(0, num($("pl-tax"), 0));
    var se = Math.max(0, num($("pl-se"), 0));
    var ae = Math.max(0, num($("pl-ae"), 0));
    var rd = Math.max(0, num($("pl-rd"), 0));
    var fe = Math.max(0, num($("pl-fe"), 0));
    var oi = num($("pl-oi"), 0);
    var noi = num($("pl-noi"), 0);
    var noe = Math.max(0, num($("pl-noe"), 0));
    var tr = Math.max(0, Math.min(50, num($("pl-tr"), 25))) / 100;

    var gp = rev - cogs;
    var gm = rev > 0 ? gp / rev : 0;
    var op = gp - taxS - se - ae - rd - fe + oi;
    var nonOp = noi - noe;
    var tp = op + nonOp;
    var tax = tp > 0 ? tp * tr : 0;
    var np = tp - tax;

    $("pl-np").textContent = money(np) + " 元" + (np < 0 ? "（亏损）" : "");
    $("pl-gp").textContent = money(gp) + " 元 / " + pct(gm);
    $("pl-op").textContent = yuan(op);
    $("pl-tp").textContent = yuan(tp);
    $("pl-taxnp").textContent = money(tax) + " 元 / " + (rev > 0 ? pct(np / rev) : "—");
    $("pl-fee").textContent = money(se + ae + fe) + " 元 / " + (rev > 0 ? pct((se + ae + fe) / rev) : "—");

    var fixedCost = taxS + se + ae + rd + fe;
    $("pl-be").textContent = gm > 0 ? yuan(fixedCost / gm) + "（现收入 " + money(rev) + "）" : "毛利率≤0，涨价或降本前无保本点";

    var rows = [
      ["营业收入", rev],
      ["营业成本", -cogs],
      ["毛利", gp],
      ["税金及附加", -taxS],
      ["销售费用", -se],
      ["管理费用", -ae],
      ["研发费用", -rd],
      ["财务费用", -fe],
      ["其他收益 / 投资收益", oi],
      ["营业利润", op],
      ["营业外收支净额", nonOp],
      ["利润总额", tp],
      ["所得税", -tax],
      ["净利润", np]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      var name = rows[i][0], v = rows[i][1];
      var bold = (name === "毛利" || name === "营业利润" || name === "利润总额" || name === "净利润");
      var bg = bold ? ' class="c-info"' : "";
      html += "<tr" + bg + "><td class=\"tal\">" + (bold ? "<strong>" + name + "</strong>" : name) +
        "</td><td>" + money(v) + "</td><td>" + (rev > 0 ? pct(v / rev) : "—") + "</td></tr>";
    }
    $("pl-body").innerHTML = html;

    var verdict;
    if (np >= 0 && tp > 0) verdict = "本月赚钱，净利率 " + (rev > 0 ? pct(np / rev) : "—") + "。";
    else if (np < 0 && op > 0) verdict = "营业是赚的，被营业外收支拖成亏损，看看是哪笔一次性支出。";
    else verdict = "本月亏损 " + money(-np) + " 元，先看毛利是否为正，再看费用能不能压。";

    $("pl-note").textContent = verdict +
      " 三费（销售+管理+财务）合计 " + money(se + ae + fe) + " 元，占收入 " + (rev > 0 ? pct((se + ae + fe) / rev) : "—") +
      "，这通常是费用管控的主战场。保本收入 " + (gm > 0 ? money(fixedCost / gm) : "—") +
      " 元是按「毛利额刚好覆盖税金及附加和四项费用」倒算的，收入低于它就是亏。" +
      "这份表是管理口径粗表：所得税按利润总额直接乘税率，没考虑纳税调整、亏损弥补、递延所得税；" +
      "发给老板看够了，报税和申报请用正式财务报表口径，小微企业所得税优惠按当地当期政策确认税率。";
  }

  function calcInvoice() {
    var contract = Math.max(0, num($("iv-contract"), 0));
    var issued = Math.max(0, num($("iv-issued"), 0));
    var received = Math.max(0, num($("iv-received"), 0));
    var rate = Math.max(0, num($("iv-rate"), 0)) / 100;
    var overdue = Math.max(0, num($("iv-overdue"), 0));
    var days = Math.max(0, num($("iv-days"), 0));
    var penBp = Math.max(0, num($("iv-penalty"), 0));

    var k = 1 + rate;
    var left = Math.max(0, contract - issued);
    var leftEx = left / k;
    var issuedEx = issued / k;
    var recEx = received / k;
    var ar = Math.max(0, issued - received);
    var over = Math.min(overdue, ar);
    var ipct = contract > 0 ? issued / contract : 0;
    var rpct = contract > 0 ? received / contract : 0;
    var overPct = ar > 0 ? over / ar : 0;
    var penAmt = over * (penBp / 10000) * days;
    var all = ar + penAmt;

    $("iv-left").textContent = yuan(left);
    $("iv-ipct").textContent = pct(ipct) + (ipct >= 1 ? "（已开完）" : "");
    $("iv-rpct").textContent = pct(rpct) + (rpct > ipct ? "（收款超过开票，核一下预收）" : "");
    $("iv-issued-tax").textContent = money(issuedEx) + " / " + money(issued - issuedEx) + " 元";
    $("iv-left-tax").textContent = money(leftEx) + " / " + money(left - leftEx) + " 元";
    $("iv-ar").textContent = yuan(ar);
    $("iv-over").textContent = money(over) + " 元 / " + pct(overPct);
    $("iv-pen").textContent = days > 0 && penBp > 0
      ? money(penAmt) + " 元（" + fmt(over, 0) + " × " + fmt(penBp / 10000 * 100, 3) + "% × " + fmt(days, 0) + " 天）"
      : "没有约定罚息或没填逾期天数";
    $("iv-all").textContent = yuan(all);

    var rows = [
      ["合同总额", contract, contract / k, contract - contract / k],
      ["已开票", issued, issuedEx, issued - issuedEx],
      ["已收款", received, recEx, received - recEx],
      ["待开票", left, leftEx, left - leftEx],
      ["应收未收", ar, ar / k, ar - ar / k]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var flag = i === 4 && over > 0;
      html += "<tr" + (flag ? ' class="c-bad"' : "") + "><td>" + rows[i][0] + "</td><td>" +
        money(rows[i][1]) + "</td><td>" + money(rows[i][2]) + "</td><td>" + money(rows[i][3]) + "</td></tr>";
    }
    $("iv-body").innerHTML = html;

    var advice;
    if (contract <= 0) advice = "先把合同额填上，否则进度算不出来。";
    else if (rpct < ipct - 0.1) advice = "开票 " + pct(ipct) + " 但只回了 " + pct(rpct) + "：钱压在客户那边，先别急着开下一批票。";
    else if (ipct < 1) advice = "合同还剩 " + money(left) + " 未开票，按开票确认收入的话，这部分收入与销项税还在后面。";
    else advice = "合同已开满，接下来只剩收款。";

    $("iv-note").textContent = advice +
      " 台账三件事要盯住：① 待开票金额决定后面的收入与销项税，别忘了进项能不能跟上；② 应收余额 " +
      money(ar) + " 元才是真占用资金的部分，占合同 " + pct(contract > 0 ? ar / contract : 0) + "；③ 逾期 " +
      money(over) + " 元按合同可主张罚息 " + money(penAmt) + " 元，但主张罚息会伤客户关系，先按" +
      "「催收层级」走：财务催 → 业务催 → 停止发货 → 法务函。开票和收款不同步时，增值税纳税义务按开票或合同约定收款日先到者确认，" +
      "所以先开票后收钱的，税已经交了、钱还没到，这段利息是自己的成本。";
  }

  function calcExpBudget() {
    var names = ["人工成本", "租金水电", "市场推广", "差旅交通", "办公及其他"];
    var b = [], a = [], i;
    for (i = 1; i <= 5; i++) {
      b.push(Math.max(0, num($("eb-b" + i), 0)));
      a.push(Math.max(0, num($("eb-a" + i), 0)));
    }
    var tb = 0, ta = 0;
    for (i = 0; i < 5; i++) { tb += b[i]; ta += a[i]; }
    var diff = ta - tb;
    var rate = tb > 0 ? diff / tb : 0;

    var overCnt = 0, overSum = 0, saveCnt = 0, saveSum = 0;
    var topAmt = -Infinity, topName = "—", topRate = -Infinity, topRateName = "—";
    var html = "";
    for (i = 0; i < 5; i++) {
      var d = a[i] - b[i];
      var r = b[i] > 0 ? d / b[i] : (a[i] > 0 ? 1 : 0);
      if (d > 0) { overCnt++; overSum += d; if (d > topAmt) { topAmt = d; topName = names[i]; } }
      if (d < 0) { saveCnt++; saveSum += -d; }
      if (r > topRate && d > 0) { topRate = r; topRateName = names[i]; }
      var bad = d > 0 && r >= 0.1;
      html += "<tr" + (bad ? ' class="c-bad"' : "") + "><td>" + names[i] + "</td><td>" + money(b[i]) +
        "</td><td>" + money(a[i]) + "</td><td>" + (d > 0 ? "+" : "") + money(d) + "</td><td>" + pct(r) + "</td></tr>";
    }
    html += "<tr><td>合计</td><td>" + money(tb) + "</td><td>" + money(ta) + "</td><td>" +
      (diff > 0 ? "+" : "") + money(diff) + "</td><td>" + pct(rate) + "</td></tr>";

    $("eb-diff").textContent = (diff > 0 ? "+" : "") + money(diff) + " 元（" + (diff > 0 ? "不利" : (diff < 0 ? "有利" : "持平")) + "）";
    $("eb-total").textContent = money(tb) + " / " + money(ta) + " 元";
    $("eb-rate").textContent = pct(rate);
    $("eb-over").textContent = overCnt + " 个 / " + money(overSum) + " 元";
    $("eb-save").textContent = saveCnt + " 个 / " + money(saveSum) + " 元";
    $("eb-top").textContent = overCnt > 0 ? topName + " +" + money(topAmt) + " 元" : "无超支";
    $("eb-toprate").textContent = topRateName !== "—" ? topRateName + " " + pct(topRate) : "无超支";
    $("eb-cut").textContent = diff > 0 ? money(diff) + " 元（或收入侧同步提上去）" : "已经低于预算，不用砍";
    $("eb-body").innerHTML = html;

    var adv;
    if (tb <= 0) adv = "先填预算数，否则没有基准可比。";
    else if (rate >= 0.1) adv = "整体超预算 " + pct(rate) + "，先看是量涨了（业务扩张，算好事）还是价涨了/管不住。";
    else if (rate > 0) adv = "整体小幅超支 " + pct(rate) + "，可控，盯住超支率最高的那一项就行。";
    else adv = "整体在预算内，节余 " + money(-diff) + " 元，注意别为了省钱把该投的（推广、研发）砍掉了。";

    $("eb-note").textContent = adv +
      " 看预算差异先分「量差」和「价差」：收入涨了带来的费用增加是良性的，收入没动费用却涨才是问题。超支率 ≥10% 的科目要业务写原因（用红色行标出来了）。" +
      " 另外注意口径：预算里含不含税、含不含分摊、是不是同一个期间（月度 vs 累计），口径不一致比出来的差异没有意义。" +
      " 费用超支不等于浪费——推广费超支但带来更多新单，是投资；最怕的是人工和办公这类固定费用悄悄涨上去，砍起来很难。";
  }

  function calcEfficiency() {
    var rev = Math.max(0, num($("ef-rev"), 0));
    var head = Math.max(1, num($("ef-head"), 1));
    var labor = Math.max(0, num($("ef-labor"), 0));
    var opex = Math.max(0, num($("ef-opex"), 0));
    var gross = Math.max(0, num($("ef-gross"), 0));
    var net = num($("ef-net"), 0);

    var rph = rev / head, gph = gross / head, nph = net / head, lph = labor / head;
    var lrate = rev > 0 ? labor / rev : 0;
    var orate = rev > 0 ? opex / rev : 0;
    var lever = labor > 0 ? rev / labor : 0;
    var glever = labor > 0 ? gross / labor : 0;
    var nlever = labor > 0 ? net / labor : 0;
    var be = (labor + opex) / head;
    var cov = be > 0 ? rph / be : 0;

    $("ef-rph").textContent = money(rph) + " 元";
    $("ef-rphm").textContent = money(rph / 12) + " 元";
    $("ef-gph").textContent = money(gph) + " / " + money(nph) + " 元";
    $("ef-lph").textContent = money(lph) + " 元（月 " + money(lph / 12) + "）";
    $("ef-lrate").textContent = pct(lrate);
    $("ef-orate").textContent = pct(orate);
    $("ef-lever").textContent = fmt(lever, 2) + " 元 / " + fmt(glever, 2) + " 元 / " + fmt(nlever, 2) + " 元";
    $("ef-be").textContent = money(be) + " 元";
    $("ef-cov").textContent = fmt(cov, 2) + " 倍" + (cov < 1.2 ? "（离保本线太近）" : "");

    var rows = [
      ["人均创收", money(rph) + " 元/年", "核心人效指标，跟同行比才有意义"],
      ["人工成本率", pct(lrate), "人力密集型 15–25% 属常见区间，超 30% 要查结构"],
      ["期间费用率", pct(orate), "费用吃掉多少收入，逐月看趋势比看单月有用"],
      ["每元人工创收", fmt(lever, 2) + " 元", "低于 3 元说明人工没被充分用起来"],
      ["保本人均创收", money(be) + " 元", "人均低于这条线，整家公司就在亏"],
      ["人均净利", money(nph) + " 元", "真金白银的人均贡献"]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      html += "<tr><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td></tr>";
    }
    $("ef-body").innerHTML = html;

    var adv;
    if (rev <= 0) adv = "先把收入填上。";
    else if (net < 0) adv = "现在是亏的：人均创收 " + money(rph) + " 元低于保本线 " + money(be) + " 元，要么加收入、要么减人头。";
    else if (cov < 1.2) adv = "刚过保本线，利润对收入波动极其敏感，一张大单丢了就可能转亏。";
    else adv = "人效在保本线以上 " + fmt(cov, 2) + " 倍，重点转向提毛利而不是单纯加人。";

    $("ef-note").textContent = adv +
      " 三个关系要记住：① 人均创收看效率，人均净利看质量，两个都涨才是真改善；② 人工成本率 = 人工 ÷ 收入，加人前先算新增人头要带来多少收入才回本——按当前人工成本率，多加 1 个人要多做 " +
      money(lph / (lrate > 0 ? lrate : 1)) + " 元收入才不摊薄；③ 期间费用率要和控制线一起看，费用率下降如果是靠砍推广换来的，明年收入就会掉。" +
      " 提醒：期间费用里通常已经包含人工成本（销售人员工资、管理人员工资），如果这里填的是「含人工」的三费，人工成本率与费用率会重叠，别相加；真正的总负担是「人工 + 非人工费用」。" +
      " 人效高低受业务模式影响极大（贸易、代工、软件差十倍很正常），只能和自己的历史、和同行业比。";
  }

  function calcCashStmt() {
    var sale = Math.max(0, num($("cs-sale"), 0));
    var othin = Math.max(0, num($("cs-othin"), 0));
    var buy = Math.max(0, num($("cs-buy"), 0));
    var pay = Math.max(0, num($("cs-pay"), 0));
    var tax = Math.max(0, num($("cs-tax"), 0));
    var othout = Math.max(0, num($("cs-othout"), 0));
    var capex = Math.max(0, num($("cs-capex"), 0));
    var invpay = Math.max(0, num($("cs-invpay"), 0));
    var invback = Math.max(0, num($("cs-invback"), 0));
    var borrow = Math.max(0, num($("cs-borrow"), 0));
    var repay = Math.max(0, num($("cs-repay"), 0));
    var div = Math.max(0, num($("cs-div"), 0));
    var begin = num($("cs-begin"), 0);

    var opIn = sale + othin, opOut = buy + pay + tax + othout, op = opIn - opOut;
    var invIn = invback, invOut = capex + invpay, inv = invIn - invOut;
    var finIn = borrow, finOut = repay + div, fin = finIn - finOut;
    var net = op + inv + fin;
    var end = begin + net;
    var fcf = op - capex;

    $("cs-end").textContent = money(end) + " 元";
    $("cs-op").textContent = (op >= 0 ? "+" : "") + money(op) + " 元" + (op >= 0 ? "（造血）" : "（失血，重点查）");
    $("cs-inv").textContent = (inv >= 0 ? "+" : "") + money(inv) + " 元";
    $("cs-fin").textContent = (fin >= 0 ? "+" : "") + money(fin) + " 元";
    $("cs-net").textContent = (net >= 0 ? "+" : "") + money(net) + " 元";
    $("cs-fcf").textContent = (fcf >= 0 ? "+" : "") + money(fcf) + " 元" + (fcf >= 0 ? "（自己养得起投资）" : "（投资靠融资或老本撑着）");
    $("cs-io").textContent = money(opIn) + " / " + money(opOut) + " 元";

    var type;
    if (op > 0 && inv < 0 && fin < 0) type = "成熟期：经营造血、投产能、还债分红，最健康的结构";
    else if (op > 0 && inv < 0 && fin > 0) type = "扩张期：经营为正还在借钱投产能，要看投的东西能不能产生回报";
    else if (op < 0 && inv < 0) type = "危险：经营失血还在往外投，靠融资或老本兜，尽快止血";
    else if (op < 0 && fin > 0) type = "靠融资续命：经营现金为负，靠借钱维持，先查应收和存货";
    else if (op > 0 && inv > 0 && fin < 0) type = "收缩期：变卖资产、还债，通常是主动瘦身";
    else type = "混合型：三项方向不典型，逐笔看大额收支";
    $("cs-type").textContent = type;

    var rows = [
      ["经营活动", opIn, opOut, op],
      ["投资活动", invIn, invOut, inv],
      ["筹资活动", finIn, finOut, fin],
      ["合计", opIn + invIn + finIn, opOut + invOut + finOut, net]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var neg = rows[i][3] < 0;
      html += "<tr" + (neg ? ' class="c-bad"' : "") + "><td>" + rows[i][0] + "</td><td>" + money(rows[i][1]) +
        "</td><td>" + money(rows[i][2]) + "</td><td>" + (rows[i][3] >= 0 ? "+" : "") + money(rows[i][3]) + "</td></tr>";
    }
    $("cs-body").innerHTML = html;

    $("cs-note").textContent =
      " 期末现金 " + money(end) + " 元（期初 " + money(begin) + " + 本期净增加 " + money(net) + "）。" +
      "看现金流量表只看一件事：经营现金流是否为正、并且能不能覆盖资本开支。经营净额为正是「造血」，为负说明主营业务在烧钱，利润表再好看也是应收账款和存货堆出来的。" +
      "几个容易填错的口径：① 只算真金白银的进出，赊销赊购不进这张表；② 利息支出、分红放在筹资活动（现行准则口径），不要算进经营；③ 购建固定资产只看付现部分，欠供应商的设备款不算；" +
      "④ 银行承兑汇票、受限资金（保证金）不属于现金等价物，要剔除。" +
      " 交叉验证：间接法下「净利润 + 折旧摊销 − 营运资本增加」应接近经营净额，差太多就说明有非现金项目没调（如资产减值、公允价值变动、投资收益）。";
  }

  /* 存货周转与库龄分析 */
  function calcInvStock() {
    var beg = Math.max(0, num($("sk-beg"), 0));
    var end = Math.max(0, num($("sk-end"), 0));
    var cogs = Math.max(0, num($("sk-cogs"), 0));
    var basis = num($("sk-days"), 365) > 0 ? num($("sk-days"), 365) : 365;
    var a1 = Math.max(0, num($("sk-a1"), 0)), a2 = Math.max(0, num($("sk-a2"), 0));
    var a3 = Math.max(0, num($("sk-a3"), 0)), a4 = Math.max(0, num($("sk-a4"), 0));
    var r3 = Math.max(0, Math.min(100, num($("sk-r3"), 0))) / 100;
    var r4 = Math.max(0, Math.min(100, num($("sk-r4"), 0))) / 100;

    var avg = (beg + end) / 2;
    var turn = avg > 0 ? cogs / avg : 0;
    var days = turn > 0 ? basis / turn : 0;
    var tot = a1 + a2 + a3 + a4;
    var stale = a3 + a4;
    var staleRate = tot > 0 ? stale / tot : 0;
    var prov = a3 * r3 + a4 * r4;
    var release = cogs > 0 ? cogs / basis * 10 : 0;
    var cover = cogs > 0 ? end / cogs * basis : 0;

    $("sk-tdays").textContent = days > 0 ? fmt(days, 1) + " 天" : "—";
    $("sk-turn").textContent = turn > 0 ? fmt(turn, 2) + " 次" : "—";
    $("sk-avg").textContent = money(avg) + " 元";
    $("sk-total").textContent = money(tot) + " 元" + (Math.abs(tot - end) > 1 ? "（与期末存货差 " + money(tot - end) + " 元，核对一下）" : "（与期末存货一致）");
    $("sk-stale").textContent = money(stale) + " 元 / " + pct(staleRate, 2);
    $("sk-prov").textContent = money(prov) + " 元";
    $("sk-release").textContent = money(release) + " 元";
    $("sk-cover").textContent = fmt(cover, 1) + " 天（期末存货 ÷ 日均成本）";

    var bins = [
      ["0–30 天", a1, 0],
      ["31–90 天", a2, 0],
      ["91–180 天", a3, r3],
      ["180 天以上", a4, r4]
    ];
    var html = "", i;
    for (i = 0; i < bins.length; i++) {
      var share = tot > 0 ? bins[i][1] / tot : 0;
      var p = bins[i][1] * bins[i][2];
      html += "<tr" + (bins[i][2] > 0 ? ' class="c-warn"' : "") + "><td>" + bins[i][0] + "</td><td>" + money(bins[i][1]) +
        "</td><td>" + pct(share, 2) + "</td><td>" + pct(bins[i][2], 0) + "</td><td>" + money(p) + "</td></tr>";
    }
    html += "<tr><td><b>合计</b></td><td><b>" + money(tot) + "</b></td><td><b>" + pct(1, 2) + "</b></td><td>—</td><td><b>" + money(prov) + "</b></td></tr>";
    $("sk-body").innerHTML = html;

    $("sk-note").textContent =
      " 存货周转天数 " + fmt(days, 1) + " 天，意思是仓库里的货平均要 " + fmt(days, 1) + " 天才能变成成本卖掉；这个数字直接吃现金——" + 
      "周转天数每多 10 天，就多压住 " + money(release) + " 元的现金。" +
      " 看两个层次：周转（效率）和库龄（质量）。周转快但库龄里有大额 180 天以上的，通常是「新货掩盖旧货」，呆滞没清干净；" +
      "现在 91 天以上的占 " + pct(staleRate, 2) + "，建议准备 " + money(prov) + " 元。" +
      " 三个容易混的口径：① 周转天数要用「营业成本」不用「销售收入」；② 平均存货取期初期末简单平均即可，季节性强的企业用月度平均更准；" +
      "③ 会计上计提跌价准备不等于税务上能扣除——存货跌价准备在汇算时要做纳税调增，实际报废损失还要留好证据（盘点表、报废审批、责任认定）才能税前扣除。" +
      " 想降周转天数，动的是三件事：接单节奏（别一次压季度量）、采购批量（少批量多次到）、以及砍长库龄 SKU 的订购。";
  }

  /* 出口退税（生产企业免抵退） */
  function calcExport() {
    var exp = Math.max(0, num($("er-exp"), 0));
    var vat = Math.max(0, num($("er-vat"), 0)) / 100;
    var reb = Math.max(0, Math.min(100, num($("er-reb"), 0))) / 100;
    var dom = Math.max(0, num($("er-dom"), 0));
    var pin = Math.max(0, num($("er-in"), 0));
    var carry = Math.max(0, num($("er-carry"), 0));

    var non = exp * Math.max(0, vat - reb);
    var avail = pin - non;
    var dout = dom * vat;
    var raw = dout - avail - carry;
    var due = raw > 0 ? raw : 0;
    var left = raw < 0 ? -raw : 0;
    var ec = exp * reb;
    var refund = Math.min(left, ec);
    var exempt = ec - refund;
    var carryLeft = left > ec ? left - ec : 0;

    $("er-refund").textContent = money(refund) + " 元";
    $("er-ec").textContent = money(ec) + " 元";
    $("er-non").textContent = "-" + money(non) + " 元（转入成本）";
    $("er-avail").textContent = money(avail) + " 元";
    $("er-dout").textContent = money(dout) + " 元";
    $("er-raw").textContent = (due > 0 ? "应缴 " + money(due) + " 元（没有退税）" : "留抵 " + money(left) + " 元");
    $("er-exempt").textContent = money(exempt) + " 元";
    $("er-carryleft").textContent = money(carryLeft) + " 元";

    var rows = [
      ["① 免抵退税额 = 出口额 × 退税率", ec, "退税的上限，不是实际退到的钱"],
      ["② 不得免征和抵扣 = 出口额 × (征税率 − 退税率)", -non, "这部分进项不能退，转到成本里"],
      ["③ 转出后可抵扣进项 = 进项 − ②", avail, "拿去抵内销销项"],
      ["④ 内销销项 − ③ − 上期留抵", raw, raw > 0 ? "为正：要交税，没有退税" : "为负：形成期末留抵"],
      ["⑤ 应退税额 = min(④的留抵, ①)", refund, "实际能退到的现金"],
      ["⑥ 免抵额 = ① − ⑤", exempt, "抵掉内销应交税的部分，不发现金"],
      ["⑦ 结转下期留抵", carryLeft, "留抵超过免抵退税额的部分留到以后"]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var v = rows[i][1];
      html += "<tr" + (v < 0 ? ' class="c-bad"' : "") + "><td>" + rows[i][0] + "</td><td>" + (v >= 0 ? "" : "-") + money(Math.abs(v)) +
        "</td><td>" + rows[i][2] + "</td></tr>";
    }
    $("er-body").innerHTML = html;

    $("er-note").textContent =
      " 免抵退的算法就一句话：先算「不得免征和抵扣」把进项转出一块，剩下的进项去抵内销销项，抵不完的留抵再和「免抵退税额」比，小的那个才是真退给你的钱。" +
      " 本例退税率比征税率低 " + pct(vat - reb, 0) + "，等于出口额里有 " + money(non) + " 元的进项退不回来，直接变成成本——这就是「退税率差」对毛利的影响，" +
      "报价时如果按满额退税算成本，会低估 " + money(non) + " 元。" +
      " 几个实务口径：① 出口额按 FOB 价（离岸价）折算人民币，运费保费由客户承担的 CIF 要剔掉；② 单证要齐（报关单、出口发票、收汇凭证），" +
      "逾期不申报就视同内销补税；③ 退税率按商品编码（HS）定，不是按行业定，同一张报关单里不同商品可能不一样，要分别算；" +
      "④ 新办企业有免抵退税审核期，首几笔可能先「免抵」不退，别按满额做现金流预算；⑤ 留抵退税和出口退税是两套政策，别叠加重复算。";
  }

  /* 往来对账（双向调节） */
  function calcTieOut() {
    var a = num($("tie-a"), 0);
    var b = num($("tie-b"), 0);
    var c = Math.max(0, num($("tie-c"), 0));
    var d = Math.max(0, num($("tie-d"), 0));
    var e = Math.max(0, num($("tie-e"), 0));
    var f = Math.max(0, num($("tie-f"), 0));

    var mine = a + c + d - e;
    var theirs = b - f;
    var diff = mine - theirs;
    var rawDiff = a - b;
    var expl = (c + d - e) + f;

    $("tie-raw").textContent = (rawDiff >= 0 ? "+" : "-") + money(Math.abs(rawDiff)) + " 元";
    $("tie-mine").textContent = money(mine) + " 元";
    $("tie-theirs").textContent = money(theirs) + " 元";
    $("tie-diff").textContent = (Math.abs(diff) < 0.005 ? "0.00 元（已平）" : money(diff) + " 元（还有差额，继续查）");
    $("tie-expl").textContent = money(expl) + " 元";

    var verdict;
    if (Math.abs(diff) < 0.005) verdict = "已平账：差额 " + money(Math.abs(rawDiff)) + " 元全部由 " + money(expl) + " 元未达/漏记解释，双方盖章确认即可";
    else verdict = "尚未平：还有 " + money(diff) + " 元没解释，优先查在途资金、未开票、重复记账和串户";

    $("tie-verdict").textContent = verdict;

    var rows = [
      ["我方漏记（已开票/已发货未入账）", "我方", "+", c],
      ["对方已付、我方未收到（在途）", "我方", "+", d],
      ["我方重复记账 / 已收未销账", "我方", "−", e],
      ["对方未入账（少记）", "对方", "−", f]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      html += "<tr><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td>" + money(rows[i][3]) + "</td></tr>";
    }
    html += "<tr><td><b>调节后</b></td><td>我方 / 对方</td><td>=</td><td><b>" + money(mine) + " / " + money(theirs) + "</b></td></tr>";
    $("tie-body").innerHTML = html;

    $("tie-note").textContent =
      " 对账不平，九成是这四类原因：① 在途（我付了对方没收到、对方付了我没收到）；② 未开票（货发了票没开，一方挂了账一方没挂）；" +
      "③ 重复记账或串户（同一笔记两次、记到别的客户名下）；④ 金额口径不一致（含税/不含税、扣了返利或质保金、汇率不同）。" +
      " 操作顺序：先核总额（原始差额 " + money(Math.abs(rawDiff)) + " 元），再核笔数，再逐笔勾对——先勾大额和最近三个月的，通常 80% 的差额就出来了。" +
      " 对平之后一定要出「对账确认单」双方盖章，尤其是关联方和长账龄往来：这既是审计底稿，也是日后主张债权、避免诉讼时效过期的证据。" +
      " 提醒：调节表只是把差异分类，不能替代调账——属于我方漏记的要补凭证，重复记账的要红冲，别只在表上调平。";
  }

  /* 三费趋势（6 期） */
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

  /* ---------------- 多产品保本与安全边际 ---------------- */
  function calcMpbe() {
    var fc = Math.max(0, num($("mb-fc"), 0));
    var target = Math.max(0, num($("mb-target"), 0));
    var ps = [
      [num($("mb-p1"), 0), num($("mb-v1"), 0), Math.max(0, num($("mb-q1"), 0))],
      [num($("mb-p2"), 0), num($("mb-v2"), 0), Math.max(0, num($("mb-q2"), 0))],
      [num($("mb-p3"), 0), num($("mb-v3"), 0), Math.max(0, num($("mb-q3"), 0))]
    ];
    var rev = 0, cm = 0, i;
    for (i = 0; i < ps.length; i++) { rev += ps[i][0] * ps[i][2]; cm += (ps[i][0] - ps[i][1]) * ps[i][2]; }
    var cmr = rev > 0 ? cm / rev : 0;
    var profit = cm - fc;
    var bep = cmr > 0 ? fc / cmr : 0;
    var mos = rev > 0 ? (rev - bep) / rev : 0;
    var need = cmr > 0 ? (fc + target) / cmr : 0;

    $("mb-bep").textContent = money(bep) + " 元";
    $("mb-cmr").textContent = pct(cmr);
    $("mb-rev").textContent = money(rev) + " / " + money(cm) + " 元";
    $("mb-profit").textContent = (profit >= 0 ? "+" : "") + money(profit) + " 元" + (profit >= 0 ? "" : "（还没保本）");
    $("mb-mos").textContent = pct(mos) + (mos < 0 ? "（亏损区，销售额跌在保本点以下）" : mos < 0.15 ? "（很薄，抗跌能力弱）" : "（还行）");
    $("mb-gap").textContent = bep > rev ? money(bep - rev) + " 元" : "已超过保本点 " + money(rev - bep) + " 元";
    $("mb-need").textContent = money(need) + " 元（比现在多卖 " + money(Math.max(0, need - rev)) + "）";
    $("mb-lever").textContent = money(10000) + " 元";

    var html = "", names = ["产品 1", "产品 2", "产品 3"];
    for (i = 0; i < ps.length; i++) {
      var p = ps[i][0], v = ps[i][1], q = ps[i][2];
      var r = p * q, c = (p - v) * q, share = rev > 0 ? r / rev : 0;
      var alloc = fc * share, pf = c - alloc, beq = p > 0 ? (bep * share) / p : 0;
      var cls = pf < 0 ? ' class="c-bad"' : "";
      html += "<tr" + cls + "><td>" + names[i] + "</td><td>" + money(r) + "</td><td>" + pct(p > 0 ? (p - v) / p : 0) +
        "</td><td>" + money(alloc) + "</td><td>" + (pf >= 0 ? "+" : "") + money(pf) + "</td><td>" + fmt(beq, 0) + "</td></tr>";
    }
    $("mb-body").innerHTML = html;

    $("mb-note").textContent =
      " 多产品保本先算「加权平均边际贡献率」= 各产品边际贡献之和 ÷ 销售额之和，再用固定成本除以它得到保本销售额。当前 " + money(rev) +
      " 元销售、边际贡献率 " + pct(cmr) + "，保本要 " + money(bep) + " 元，所以现在是" + (profit >= 0 ? "盈利" : "亏损") + " " + money(Math.abs(profit)) + " 元。" +
      " 这张表最有用的地方是右下两列：把固定成本按销售结构分摊后，标红的行都是「毛利撑不起自己那份固定成本」的产品，它们的销量越大，公司亏得越多——涨价、砍产或换结构，比整体降本更直接。" +
      " 注意：① 「保本销量」是按当前销售结构均摊出来的，结构一变要重算；② 固定成本分摊法是管理口径，不是会计准则要求，只用于判断，不影响对外报表；③ 边际贡献率高的产品优先给产能。";
  }

  /* ---------------- 工资表代扣核对 ---------------- */
  function calcPayroll() {
    var gross = Math.max(0, num($("pc-gross"), 0));
    var si = Math.max(0, num($("pc-si"), 0));
    var hf = Math.max(0, num($("pc-hf"), 0));
    var tax = Math.max(0, num($("pc-tax"), 0));
    var other = Math.max(0, num($("pc-other"), 0));
    var act = Math.max(0, num($("pc-act"), 0));
    var tax2 = Math.max(0, num($("pc-tax2"), 0));
    var cosi = Math.max(0, num($("pc-cosi"), 0));
    var cohf = Math.max(0, num($("pc-cohf"), 0));
    var rev = Math.max(0, num($("pc-rev"), 0));
    var head = Math.max(1, num($("pc-head"), 1));

    var ded = si + hf + tax + other;
    var net = gross - ded;
    var diff = act - net;
    var taxdiff = tax - tax2;
    var co = cosi + cohf;
    var cost = gross + co;
    var rate = rev > 0 ? cost / rev : 0;
    var avg = cost / head;

    $("pc-net").textContent = money(net) + " 元";
    $("pc-diff").textContent = Math.abs(diff) < 0.5 ? "0.00 元（平）" : money(diff) + " 元（表上多发了）";
    $("pc-taxdiff").textContent = Math.abs(taxdiff) < 0.5 ? "0.00 元（一致）" : money(taxdiff) + " 元" + (taxdiff > 0 ? "（表内多扣，要退给员工并更正申报）" : "（表内少扣，员工汇算要补税）");
    $("pc-ded").textContent = pct(gross > 0 ? ded / gross : 0) + "（" + money(ded) + " 元）";
    $("pc-co").textContent = money(co) + " 元";
    $("pc-cost").textContent = money(cost) + " 元";
    $("pc-rate").textContent = pct(rate) + (rate > 0.3 ? "（偏高，人力密集行业一般 15–25%）" : "");
    $("pc-avg").textContent = money(avg) + " 元/人";

    var ok = Math.abs(diff) < 0.5 && Math.abs(taxdiff) < 0.5;
    $("pc-verdict").textContent = ok ? "三项勾稽全平，可以发放" :
      (Math.abs(diff) >= 0.5 ? "实发金额对不上，先查漏项（补发、扣款、个税零头）" : "个税与申报数不一致，先对齐再发");

    var rows = [["应发工资", gross, 1], ["个人社保", -si, gross > 0 ? si / gross : 0], ["个人公积金", -hf, gross > 0 ? hf / gross : 0],
      ["个人所得税", -tax, gross > 0 ? tax / gross : 0], ["其他扣款", -other, gross > 0 ? other / gross : 0], ["实发工资", net, gross > 0 ? net / gross : 0]];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var cls = (rows[i][0] === "实发工资" && Math.abs(diff) >= 0.5) ? ' class="c-warn"' : "";
      html += "<tr" + cls + "><td>" + rows[i][0] + "</td><td>" + money(rows[i][1]) + "</td><td>" + pct(rows[i][2]) + "</td></tr>";
    }
    $("pc-body").innerHTML = html;

    $("pc-note").textContent =
      " 工资表每月只需三处勾稽：① 应发 − 社保 − 公积金 − 个税 − 其他扣款 = 实发（与银行代发文件总额一致）；② 表内个税合计 = 自然人电子税务局申报数；③ 应发 + 单位承担社保公积金 = 用工总成本（进成本费用的就是这个数，不是实发数）。" +
      " 本月：代扣合计 " + money(ded) + " 元占应发 " + pct(gross > 0 ? ded / gross : 0) + "，用工总成本 " + money(cost) + " 元，人工成本率 " + pct(rate) + "。" +
      " 常见不平原因：离职补偿、补发上月工资没进表、商保和工会经费挂错科目、公积金基数年度调整只调了一半人、专项附加扣除当月才采集导致个税跳变。社保和个税都是代扣代缴，多扣了必须退，不能留在账上当收入。";
  }

  /* ---------------- 固定资产盘点差异 ---------------- */
  function calcAssetDiff() {
    var cost = Math.max(0, num($("ad-cost"), 0));
    var dep = Math.max(0, num($("ad-dep"), 0));
    var rv = Math.max(0, num($("ad-rv"), 0));
    var cd = Math.max(0, Math.min(100, num($("ad-cd"), 0))) / 100;
    var comp = Math.max(0, num($("ad-comp"), 0));
    var ins = Math.max(0, num($("ad-ins"), 0));
    var vat = Math.max(0, num($("ad-vat"), 0)) / 100;
    var tr = Math.max(0, num($("ad-tr"), 0)) / 100;

    var nav = Math.max(0, cost - dep);
    var vatout = nav * vat;
    var rec = comp + ins;
    var loss = nav + vatout - rec;
    var gain = rv * cd;
    var net = gain - loss;
    var taxsave = loss * tr;
    var taxadd = gain * tr;
    var navrate = cost > 0 ? nav / cost : 0;

    $("ad-net").textContent = (net >= 0 ? "+" : "") + money(net) + " 元";
    $("ad-nav").textContent = money(nav) + " 元";
    $("ad-vatout").textContent = money(vatout) + " 元";
    $("ad-rec").textContent = money(rec) + " 元";
    $("ad-loss").textContent = money(loss) + " 元";
    $("ad-gain").textContent = money(gain) + " 元";
    $("ad-taxsave").textContent = "约 " + money(taxsave) + " 元（需专项申报才可扣）";
    $("ad-taxadd").textContent = "约 " + money(taxadd) + " 元";
    $("ad-navrate").textContent = pct(navrate);

    var rows = [
      ["盘亏资产原值", cost, "固定资产清理（转出）"],
      ["已提折旧转销", -dep, "累计折旧（冲减）"],
      ["盘亏账面净值", nav, "待处理财产损溢"],
      ["进项税转出", vatout, "应交税费 — 进项税额转出"],
      ["责任人赔偿", -comp, "其他应收款"],
      ["保险赔付", -ins, "其他应收款"],
      ["盘亏净损失", loss, "管理费用 / 营业外支出"],
      ["盘盈入账（重置价 × 成新率）", gain, "以前年度损益调整（重要差错）"],
      ["对当期损益净影响", net, "—"]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var cls = rows[i][2] === "—" ? ' class="c-info"' : (rows[i][1] < 0 && rows[i][0].indexOf("赔偿") < 0 && rows[i][0].indexOf("赔付") < 0 && rows[i][0].indexOf("折旧") < 0 ? ' class="c-warn"' : "");
      html += "<tr" + cls + "><td>" + rows[i][0] + "</td><td>" + money(rows[i][1]) + "</td><td>" + rows[i][2] + "</td></tr>";
    }
    $("ad-body").innerHTML = html;

    $("ad-note").textContent =
      " 盘亏按「账面净值 + 不得抵扣的进项税 − 可收回的赔偿保险 = 净损失」入账；盘盈按「重置完全价值 × 成新率」入账，实务上作为前期差错更正（重要）调整留存收益，金额小的直接冲管理费用。" +
      " 本次盘亏账面净值 " + money(nav) + " 元、进项转出 " + money(vatout) + " 元，扣掉赔偿保险 " + money(rec) + " 元后净损失 " + money(loss) + " 元；盘盈 " + money(gain) + " 元，两边相抵对当期损益影响 " + (net >= 0 ? "+" : "") + money(net) + " 元。" +
      " 三个容易错的地方：① 只有管理不善造成的被盗、霉烂变质才转出进项税，正常报废和自然灾害不用转；② 税前扣除要留存盘点表、审批单、责任认定、赔偿协议，做资产损失专项申报，否则汇算要调增；③ 盘盈要交企业所得税，增值税上属于「自查发现」不视同销售。";
  }

  /* ---------------- 月度关账进度 ---------------- */
  function calcMonthClose() {
    var total = Math.max(1, num($("mw-total"), 1));
    var done = Math.max(0, Math.min(total, num($("mw-done"), 0)));
    var key = Math.max(0, num($("mw-key"), 0));
    var days = Math.max(0, num($("mw-days"), 0));
    var per = Math.max(0.01, num($("mw-per"), 0.35));
    var people = Math.max(1, num($("mw-people"), 1));

    var left = total - done;
    var hours = left * per;
    var need = hours / people;
    var slip = days - need;
    var pctDone = done / total;

    $("mw-pct").textContent = pct(pctDone);
    $("mw-left").textContent = left + " 项 / 关键 " + key + " 项";
    $("mw-hours").textContent = fmt(hours, 2) + " 人日";
    $("mw-need").textContent = fmt(need, 2) + " 天（" + people + " 人并行）";
    $("mw-slip").textContent = fmt(slip, 2) + " 天";

    var risk, verdict;
    if (key > 0 && slip < 0) { risk = "高：关键项没做完，且时间不够"; verdict = "把关键项先挑出来专人盯，其余延后或简化"; }
    else if (key > 0) { risk = "中：时间够，但关键项还在手上"; verdict = "关键项今天必须动，别留到最后一天"; }
    else if (slip < 0) { risk = "中：没有关键项，但时间不够"; verdict = "加人或者把非关键项放到下月补"; }
    else { risk = "低：按计划能完成"; verdict = "按清单顺序推进即可"; }
    $("mw-risk").textContent = risk;
    $("mw-verdict").textContent = verdict;

    var html = "", d, needP, ok;
    for (d = 1; d <= 5; d++) {
      needP = Math.ceil(hours / d);
      ok = d >= Math.min(days, 99) && needP <= people * 2 ? "能" : (needP <= people ? "能" : "人手不够");
      html += "<tr" + (ok === "能" ? "" : ' class="c-warn"') + "><td>" + d + " 天</td><td>" + needP + " 人</td><td>" + ok + "</td></tr>";
    }
    $("mw-body").innerHTML = html;

    $("mw-note").textContent =
      " 关账不是「做完 24 件事」，而是「在截止日前把关报表的那几件做完」。当前完成 " + done + "/" + total + "，" + pct(pctDone) + "，剩 " + left + " 项共 " + fmt(hours, 2) +
      " 人日，按 " + people + " 人并行要 " + fmt(need, 2) + " 天，距截止 " + fmt(days, 0) + " 天" + (slip >= 0 ? "，还有 " + fmt(slip, 2) + " 天空余。" : "，已经来不及 " + fmt(-slip, 2) + " 天。") +
      " 关账必做的五项：存货暂估与出入库截止、折旧摊销计提、往来对账与坏账计提、税金计提（增值税/附加/所得税）、收入成本截止测试（跨期单据）。" +
      " 想快就三招：把能自动化的（折旧、摊销、税金）固化成模板；能提前的（对账、暂估）月中就开始；实在不行先出「初版报表」标注待调整项，别为了完美误了申报期。";
  }


  /* ---------------- 应收保理 / 贴现 ---------------- */
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

  /* ---------------- 呆滞库存清理决策 ---------------- */
  function calcDeadStock() {
    var q = Math.max(0, num($("ds-q"), 0));
    var costU = Math.max(0, num($("ds-cost"), 0));
    var price = Math.max(0, num($("ds-price"), 0));
    var prob = Math.min(100, Math.max(0, num($("ds-prob"), 0))) / 100;
    var store = Math.max(0, num($("ds-store"), 0));
    var cut = Math.max(0, num($("ds-cut"), 0));
    var scrapFee = Math.max(0, num($("ds-scrap"), 0));
    var scrapVal = Math.max(0, num($("ds-val"), 0));

    var a = prob * price - store;
    var b = cut;
    var c = scrapVal - scrapFee;
    var extra = (b - a) * q;
    var totalB = b * q, book = costU * q;

    $("ds-extra").textContent = money(extra) + " 元";
    $("ds-a").textContent = money(a) + " 元" + (a < 0 ? "（等下去净亏）" : "");
    $("ds-b").textContent = money(b) + " 元";
    $("ds-c").textContent = money(c) + " 元";
    $("ds-crit").textContent = money(a) + " 元";
    $("ds-total").textContent = money(totalB) + " / 亏 " + money(book - totalB) + " 元";
    $("ds-storeamt").textContent = money(store * q) + " 元";

    var verdict;
    if (b >= a && b >= c) verdict = "降价清仓：每件比继续等多 " + money(b - a);
    else if (a >= b && a >= c) verdict = "继续等原价：只要概率够，等着更划算";
    else verdict = "直接报废：清仓价太低，处理掉止损";
    $("ds-verdict").textContent = verdict;

    var prices = [cut * 0.75, cut, cut * 1.25, cut * 1.5], html = "", i;
    for (i = 0; i < prices.length; i++) {
      var p = Math.round(prices[i] * 100) / 100;
      var tot = p * q, adv = (p - a) * q;
      html += "<tr" + (adv < 0 ? ' class="c-warn"' : "") + "><td>" + money(p) + " 元</td><td>" + money(tot) +
        "</td><td>" + (adv >= 0 ? "+" : "") + money(adv) + "</td><td>" + (adv >= 0 ? "清仓更划算" : "不如继续等") + "</td></tr>";
    }
    $("ds-body").innerHTML = html;

    $("ds-note").textContent =
      " 三个方案每件净回收：继续等原价 " + money(a) + " 元（" + pct(prob, 0) + " 概率卖 " + money(price) + " 元，再扣一年仓储 " + money(store) + "）、" +
      "降价清仓 " + money(b) + " 元、直接报废 " + money(c) + " 元。结论：" + verdict + "。" +
      " 关键一句：单位成本 " + money(costU) + " 元已经花出去了，是沉没成本，不该进这个比较——" +
      "决策只看「从现在往后每件还能拿回多少」。所以账面亏 " + money(book - totalB) + " 元这件事，清不清仓都会发生，" +
      "清仓只是把它从「藏在存货里」变成「摆到利润表上」，同时把现金拿回来。" +
      " 临界售价是 " + money(a) + " 元：只要有人愿意出这个价以上，清掉就比继续等强，别为了「不亏本卖」把货压到报废。" +
      " 实操上还要考虑：清仓会不会冲击正价渠道（走尾货、员工内购、B 端打包）；如果是管理不善造成的霉烂变质，进项税要转出；" +
      "正常降价销售不转出；报废损失税前扣除要留盘点表、审批和处置凭证。";
  }

  /* ---------------- 供应商账期谈判 ---------------- */
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

  /* ---------------- 13 周滚动现金流 ---------------- */
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


  /* ---------------- 票据贴现成本 ---------------- */
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

  /* ---------------- 贷款真实利率 ---------------- */
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

  /* ---------------- 催收优先级 ---------------- */
  function calcCollect() {
    var rate = Math.max(0, num($("co-rate"), 0)) / 100;
    var list = [], total = 0, i;
    for (i = 1; i <= 4; i++) {
      var a = Math.max(0, num($("co-a" + i), 0));
      var d = Math.max(0, num($("co-d" + i), 0));
      list.push({ a: a, d: d, score: a * d });
      total += a;
    }
    var wavg = 0, cost = 0, high = 0, late = 0;
    for (i = 0; i < list.length; i++) {
      wavg += list[i].a * list[i].d;
      cost += list[i].a * rate * list[i].d / 365;
      if (list[i].d > 180) high += list[i].a;
      if (list[i].d >= 1095) late++;
    }
    wavg = total > 0 ? wavg / total : 0;

    function act(d) {
      if (d <= 30) return "电话+账单提醒";
      if (d <= 90) return "书面催款函，暂停新单";
      if (d <= 180) return "上门面谈，签还款计划";
      if (d < 1095) return "法务介入，评估起诉";
      return "时效风险，先取得书面确认";
    }
    var sorted = list.slice().sort(function (x, y) { return y.score - x.score; });
    var html = "", k;
    for (k = 0; k < list.length; k++) {
      var r0 = list[k];
      var rank = sorted.indexOf(r0) + 1;
      var cls = r0.d > 180 ? "c-bad" : (r0.d > 90 ? "c-warn" : "");
      html += '<tr class="' + cls + '"><td>客户 ' + String.fromCharCode(65 + k) + "（第 " + rank + " 优先）</td><td>" + money(r0.a) +
        "</td><td>" + r0.d + " 天</td><td>" + fmt(r0.score / 10000, 1) + " 万·天</td><td>" + act(r0.d) + "</td></tr>";
    }
    $("co-body").innerHTML = html;

    $("co-total").textContent = money(total) + " 元";
    $("co-wavg").textContent = fmt(wavg, 1) + " 天";
    $("co-cost").textContent = money(cost) + " 元";
    $("co-high").textContent = money(high) + " 元 / " + pct(total > 0 ? high / total : 0);
    $("co-limit").textContent = late + " 笔" + (late === 0 ? "（暂无）" : "（必须马上处理）");
    $("co-first").textContent = sorted[0].a > 0 ? "金额×天数最大那笔：" + money(sorted[0].a) + " 元、" + sorted[0].d + " 天" : "无";
    $("co-act").textContent = act(sorted[0].d);

    $("co-note").textContent =
      " 逾期应收 " + money(total) + " 元，加权平均逾期 " + fmt(wavg, 1) + " 天，占着的资金一年值 " + money(cost) + " 元（按 " + pct(rate) + " 算）。" +
      " 排序逻辑是「金额 × 天数」：大额短逾期和小额长逾期都可能更紧急——前者影响现金流，后者影响能不能收回（拖过 3 年诉讼时效，法院就不支持了）。" +
      " 超 180 天的 " + money(high) + " 元（" + pct(total > 0 ? high / total : 0) + "）按现行准则要单独评估减值，别再用「都能收回来」的口径做账。" +
      " 催收的三个硬道理：① 越早越容易收回，回款概率随时间断崖式下降；② 停供是最有效的催收手段——已经发的货要不回来，还没发的可以停；" +
      "③ 诉讼时效 3 年，中间让对方签一份对账确认单或还款计划就能重新起算，这一步比打电话管用。";
  }

  /* ---------------- 月度经营数据包 ---------------- */
  function calcMgmtPack() {
    var rev = Math.max(0, num($("pk-rev"), 0));
    var bud = Math.max(0, num($("pk-bud"), 0));
    var ly = Math.max(0, num($("pk-ly"), 0));
    var gm = num($("pk-gm"), 0);
    var net = num($("pk-net"), 0);
    var ar = Math.max(0, num($("pk-ar"), 0));
    var inv = Math.max(0, num($("pk-inv"), 0));
    var cfo = num($("pk-cfo"), 0);

    var ach = bud > 0 ? rev / bud : NaN;
    var yoy = ly > 0 ? (rev - ly) / ly : NaN;
    var gmr = rev > 0 ? gm / rev : NaN;
    var nmr = rev > 0 ? net / rev : NaN;
    var cogs = rev - gm;
    var dso = rev > 0 ? ar / rev * 30 : NaN;
    var dio = cogs > 0 ? inv / cogs * 30 : NaN;
    var cycle = (isFinite(dso) ? dso : 0) + (isFinite(dio) ? dio : 0);

    $("pk-ach").textContent = isFinite(ach) ? pct(ach) : "—";
    $("pk-yoy").textContent = isFinite(yoy) ? (yoy >= 0 ? "+" : "") + pct(yoy) : "—";
    $("pk-margin").textContent = pct(gmr) + " / " + pct(nmr);
    $("pk-dso").textContent = isFinite(dso) ? fmt(dso, 1) + " 天" : "—";
    $("pk-dio").textContent = isFinite(dio) ? fmt(dio, 1) + " 天" : "—";
    $("pk-cycle").textContent = fmt(cycle, 1) + " 天";
    $("pk-cash").textContent = money(cfo) + " 元 vs 净利 " + money(net) + " 元" + (cfo < net ? "（现金没跟上利润）" : "（现金比利润好）");

    var focus = [];
    if (isFinite(ach) && ach < 0.95) focus.push("收入没达成，查大单丢在哪");
    if (isFinite(gmr) && gmr < 0.25) focus.push("毛利率偏低，查降价与成本");
    if (cfo < 0) focus.push("经营现金流为负，先问应收和存货");
    if (isFinite(dso) && dso > 60) focus.push("应收账款回款慢（DSO " + fmt(dso, 1) + " 天）");
    if (isFinite(dio) && dio > 60) focus.push("存货压得多（DIO " + fmt(dio, 1) + " 天）");
    $("pk-focus").textContent = focus.length ? focus.join("；") : "各项正常，按计划推进";

    var rows = [
      ["收入达成率", isFinite(ach) ? pct(ach) : "—", "100%", isFinite(ach) && ach >= 1 ? "达成" : "未达成"],
      ["收入同比", isFinite(yoy) ? pct(yoy) : "—", "正增长", isFinite(yoy) && yoy > 0 ? "增长" : "下滑"],
      ["毛利率", pct(gmr), "≥ 25%", isFinite(gmr) && gmr >= 0.25 ? "可以" : "偏低"],
      ["净利率", pct(nmr), "≥ 5%", isFinite(nmr) && nmr >= 0.05 ? "可以" : "偏薄"],
      ["应收周转天数", isFinite(dso) ? fmt(dso, 1) + " 天" : "—", "≤ 60 天", isFinite(dso) && dso <= 60 ? "正常" : "偏慢"],
      ["存货周转天数", isFinite(dio) ? fmt(dio, 1) + " 天" : "—", "≤ 60 天", isFinite(dio) && dio <= 60 ? "正常" : "偏慢"],
      ["经营现金流", money(cfo) + " 元", "≥ 净利润", cfo >= net ? "健康" : "需解释"]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var bad = rows[i][3] === "未达成" || rows[i][3] === "下滑" || rows[i][3] === "偏低" || rows[i][3] === "偏薄" || rows[i][3] === "偏慢" || rows[i][3] === "需解释";
      html += "<tr" + (bad ? ' class="c-warn"' : "") + "><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td>" + rows[i][3] + "</td></tr>";
    }
    $("pk-body").innerHTML = html;

    $("pk-note").textContent =
      " 一句话开场：收入 " + money(rev) + " 元，达成 " + (isFinite(ach) ? pct(ach) : "—") + "，同比 " + (isFinite(yoy) ? pct(yoy) : "—") +
      "；毛利率 " + pct(gmr) + "、净利率 " + pct(nmr) + "；经营现金流 " + money(cfo) + " 元。" +
      " 开会顺序建议：先看收入（卖得怎么样）→ 再看毛利（价格和成本谁在动）→ 再看现金（利润是真的吗）→ 最后看应收存货（钱压在哪）。" +
      " 最容易糊弄过去的一页就是「有利润没现金」：本例净利 " + money(net) + " 元但经营现金流 " + money(cfo) + " 元，" +
      "差额要靠应收（" + money(ar) + "）和存货（" + money(inv) + "）解释清楚，说不清就是账没做实。" +
      " 口径提醒：DSO 用「应收 ÷ 收入 × 30」、DIO 用「存货 ÷ 营业成本 × 30」，分母别都用收入；" +
      "现金周期严格口径还要减应付账款周转天数（DPO），本页没减，所以算是偏保守的上限。";
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

  function calcImpair() {
    var cost = Math.max(0, num($("im-cost"), 0));
    var price = Math.max(0, num($("im-price"), 0));
    var finish = Math.max(0, num($("im-finish"), 0));
    var sell = Math.max(0, num($("im-sell"), 0));
    var had = Math.max(0, num($("im-had"), 0));
    var up = Math.max(0, num($("im-up"), 0));
    var taxRate = Math.min(1, Math.max(0, num($("im-tax"), 25)) / 100);

    var nrv = price - finish - sell;
    var need = Math.max(0, cost - nrv);
    var delta = need - had;
    var after = Math.min(cost, Math.max(0, nrv));
    var rate = cost > 0 ? need / cost : NaN;
    var dta = need * taxRate;
    var nrv2 = up - finish - sell;
    var back = Math.min(need, Math.max(0, nrv2 - nrv));

    $("im-big").textContent = money(Math.max(0, delta)) + (delta < 0 ? "（应转回）" : "");
    $("im-nrv").textContent = yuan(nrv);
    $("im-gap").textContent = yuan(cost - nrv);
    $("im-rate").textContent = pct(rate);
    $("im-after").textContent = yuan(after);
    $("im-hadout").textContent = yuan(had) + (delta < 0 ? "（本期转回 " + money(-delta) + "）" : "（本期补提 " + money(delta) + "）");
    $("im-dta").textContent = yuan(dta);
    $("im-taxeff").textContent = delta >= 0
      ? "纳税调增 " + money(delta) + " 元（多交税，不是少交）"
      : "纳税调减 " + money(-delta) + " 元（转回要交税）";
    $("im-back").textContent = yuan(back);
    $("im-cap").textContent = yuan(need) + "（不能超过原计提）";

    var rows = [
      ["账面成本", yuan(cost), "存货原值"],
      ["预计售价（不含税）", yuan(price), "以资产负债表日最可靠证据为准"],
      ["减：至完工尚需投入", yuan(finish), "原材料类通常为 0"],
      ["减：销售费用及相关税费", yuan(sell), "运费、佣金、消费税等"],
      ["= 可变现净值", yuan(nrv), "NRV"],
      ["应有跌价准备余额", yuan(need), "成本高于 NRV 的部分"],
      ["已计提", yuan(had), "上期已计提的余额"],
      ["本期补提 /（转回）", (delta >= 0 ? "+" : "") + money(delta), delta >= 0 ? "计入资产减值损失" : "在原计提范围内冲回"]
    ];
    var html = "", i;
    for (i = 0; i < rows.length; i++) {
      var cls = i === 7 ? (delta > 0 ? ' class="c-warn"' : (delta < 0 ? ' class="c-info"' : "")) : "";
      html += "<tr" + cls + "><td>" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td></tr>";
    }
    $("im-body").innerHTML = html;

    $("im-note").textContent =
      " 这一笔：可变现净值 " + yuan(nrv) + "，比成本低 " + yuan(cost - nrv) + "，跌价 " + pct(rate) +
      "，应有准备余额 " + yuan(need) + "，本期" + (delta >= 0 ? "补提 " + yuan(delta) : "转回 " + yuan(-delta)) + "。" +
      " 三个容易做错的地方：① 计提必须按单个存货项目（或同一类别的合并口径），不能把赚钱的和亏钱的互相抵掉；" +
      "② 必须有证据（订单价、最近成交价、库龄呆滞评估），拍脑袋提一笔，审计和税务都不认；" +
      "③ 会计计提和税前扣除是两回事——计提当期要纳税调增，实际处置发生损失时才凭证据扣除，备查资料留好。" +
      " 按 " + pct(taxRate, 0) + " 税率，这笔计提能确认递延所得税资产 " + yuan(dta) +
      "，但现在不多缴现金，只是把税推后。" +
      " 转回：售价回升到 " + money(up) + " 时 NRV 变 " + yuan(nrv2) + "，可转回 " + yuan(back) +
      "，但累计转回不得超过已计提的 " + yuan(need) + "。";
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

  /* ===== 增值税税负率监控 ===== */
  function calcTaxBurden() {
    var sales = Math.max(0, num($("tbr-sales"), 0));
    var outVat = Math.max(0, num($("tbr-out"), 0));
    var inVat = Math.max(0, num($("tbr-in"), 0));
    var begin = Math.max(0, num($("tbr-begin"), 0));
    var prev = num($("tbr-prev"), 0);
    var ind = num($("tbr-ind"), 0);
    var surchRate = Math.max(0, num($("tbr-surch"), 0)) / 100;

    var pay = outVat - inVat - begin;
    var carry = pay < 0 ? -pay : 0;
    if (pay < 0) pay = 0;
    var burden = sales > 0 ? pay / sales * 100 : 0;
    var surch = pay * surchRate;
    var buy = outVat > 0 ? inVat / (outVat / sales) : 0;
    var gross = sales > 0 ? (sales - buy) / sales : 0;
    var bandLo = ind * 0.7, bandHi = ind * 1.3;
    var ok = burden >= bandLo && burden <= bandHi;

    var verdict = !isFinite(burden) || sales === 0 ? "先填销售额"
      : pay === 0 ? "本月无应交（留抵或免税）"
      : burden > bandHi ? "偏高：" + (inVat <= 0 ? "缺进项，确认是否漏抵" : "进项不足，看采购节奏")
      : burden < bandLo ? "偏低：留意被约谈，准备好毛利与进项说明"
      : "在参考区间内";

    $("tbr-big").textContent = fmt(burden, 2);
    $("tbr-pay").textContent = yuan(pay) + (carry > 0 ? "（期末留抵 " + money(carry) + "）" : "");
    $("tbr-surcharge").textContent = yuan(surch) + "（" + pct(surchRate, 0) + "）";
    $("tbr-mom").textContent = (burden - prev >= 0 ? "+" : "") + fmt(burden - prev, 2) + " 个百分点（上期 " + fmt(prev, 2) + "%）";
    $("tbr-gap").textContent = (burden - ind >= 0 ? "+" : "") + fmt(burden - ind, 2) + " 个百分点（行业 " + fmt(ind, 2) + "%）";
    $("tbr-buy").textContent = yuan(buy);
    $("tbr-gr").textContent = pct(gross, 2) + "（按进项倒推）";
    $("tbr-band").textContent = fmt(bandLo, 2) + "% ~ " + fmt(bandHi, 2) + "%";
    $("tbr-verdict").textContent = verdict;

    var rows = [
      ["销项税额", yuan(outVat), "按开票销售额计"],
      ["本月进项税额", yuan(inVat), "已认证抵扣部分"],
      ["期初留抵", yuan(begin), begin > 0 ? "本期已抵减" : "无"],
      ["应交增值税", yuan(pay), "销项 − 进项 − 留抵"],
      ["城建税及附加", yuan(surch), pct(surchRate, 0) + " 合计率"],
      ["增值税税负率", fmt(burden, 2) + "%", "应交增值税 ÷ 不含税销售额"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 3 || i === 5 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td class=\"tal\">" + rows[i][2] + "</td></tr>";
    }
    $("tbr-body").innerHTML = html;

    $("tbr-note").textContent = "税负率是个比值，不是税。偏低通常三条路：进项多（备货、设备集中采购）、享受优惠（免税/即征即退）、或者收入没开票——"
      + "前两条解释得清，第三条解释不清。偏高多半是「有销项没进项」，常见于客户要票、供应商不给票。"
      + "留存好进销项台账和合同，被问到时能当场对上，比事后找发票有用。";
  }

  /* ===== 利润敏感性 ===== */
  function calcSens() {
    var rev = Math.max(0, num($("sens-rev"), 0));
    var vr = Math.min(1, Math.max(0, num($("sens-vr"), 0) / 100));
    var fix = Math.max(0, num($("sens-fix"), 0));
    var shock = Math.abs(num($("sens-shock"), 5)) / 100;
    var target = Math.abs(num($("sens-target"), 20)) / 100;

    function npOf(r, v, f) { return r * (1 - v) - f; }
    var np0 = npOf(rev, vr, fix);
    var be = (1 - vr) > 0 ? fix / (1 - vr) : 0;
    var mos = rev > 0 ? (rev - be) / rev : 0;
    var cm = rev * (1 - vr);
    var lev = np0 !== 0 ? cm / np0 : 0;

    var ePrice = (npOf(rev * 1.01, vr, fix) - np0) / (np0 !== 0 ? np0 : 1) / 0.01;
    var eVc = (npOf(rev, vr * 1.01, fix) - np0) / (np0 !== 0 ? np0 : 1) / 0.01;
    var eFix = (npOf(rev, vr, fix * 1.01) - np0) / (np0 !== 0 ? np0 : 1) / 0.01;

    var targetNP = np0 * (1 + target);
    var needRev = (1 - vr) > 0 ? (targetNP + fix) / (1 - vr) : 0;
    var needVr = rev > 0 ? 1 - (targetNP + fix) / rev : 0;

    $("sens-big").textContent = money(np0);
    $("sens-be").textContent = yuan(be) + "（占当前 " + pct(rev > 0 ? be / rev : 0, 1) + "）";
    $("sens-mos").textContent = pct(mos, 2) + (mos < 0.2 ? "（薄，收入再掉两成见红）" : "（有缓冲）");
    $("sens-lev").textContent = fmt(lev, 2) + " 倍（收入跌 1%，净利跌 " + fmt(lev, 1) + "%）";
    $("sens-e-price").textContent = fmt(ePrice, 2) + " 倍";
    $("sens-e-vc").textContent = fmt(eVc, 2) + " 倍";
    $("sens-e-fix").textContent = fmt(eFix, 2) + " 倍";
    $("sens-need-rev").textContent = rev > 0 ? "+" + pct(needRev / rev - 1, 2) + "（到 " + money(needRev) + " 元）" : "—";
    $("sens-need-vr").textContent = needVr >= 0 ? pct(needVr, 2) + "（现为 " + pct(vr, 2) + "）" : "只降本做不到，收入也得涨";

    var cases = [
      ["售价 −" + pct(shock, 0), rev * (1 - shock), vr, fix],
      ["售价 +" + pct(shock, 0), rev * (1 + shock), vr, fix],
      ["销量 +" + pct(shock, 0), rev * (1 + shock), vr, fix],
      ["销量 −" + pct(shock, 0), rev * (1 - shock), vr, fix],
      ["变动成本率 +" + pct(shock, 0), rev, Math.min(1, vr * (1 + shock)), fix],
      ["固定成本 +" + pct(shock, 0), rev, vr, fix * (1 + shock)]
    ];
    var html = "";
    for (var i = 0; i < cases.length; i++) {
      var npv = npOf(cases[i][1], cases[i][2], cases[i][3]);
      var d = np0 !== 0 ? (npv - np0) / Math.abs(np0) : 0;
      var cls = d < 0 ? ' class="c-warn"' : "";
      html += "<tr" + cls + "><td class=\"tal\">" + cases[i][0] + "</td><td>" + (i < 2 ? "价格" : i < 4 ? "数量" : "成本") + "</td><td>"
        + money(npv) + "</td><td>" + (d >= 0 ? "+" : "") + pct(d, 2) + "</td></tr>";
    }
    $("sens-body").innerHTML = html;

    $("sens-note").textContent = "同样的 5%，落在不同变量上差别能到两三倍：售价和销量各 1% 对净利的影响一样（都是边际贡献率的倒数），"
      + "但降价还能换量、滞销只能靠降价，所以先动价格要看需求弹性。变动成本率最狠——它每 1 个点吃的是收入的 1%，不是成本的 1%。"
      + "固定成本看起来温和，但它决定了保本点，收入一掉就立刻放大亏损。";
  }

  /* ===== 合并抵销 ===== */
  function calcConsol() {
    var pmRev = Math.max(0, num($("cons-pm-rev"), 0));
    var subRev = Math.max(0, num($("cons-sub-rev"), 0));
    var inter = Math.max(0, num($("cons-inter"), 0));
    var pmNp = num($("cons-pm-np"), 0);
    var subNp = num($("cons-sub-np"), 0);
    var unreal = Math.max(0, num($("cons-unreal"), 0));
    var miR = Math.min(1, Math.max(0, num($("cons-mi"), 0) / 100));
    var inv = Math.max(0, num($("cons-inv"), 0));
    var subNet = Math.max(0, num($("cons-sub-net"), 0));
    var rec = Math.max(0, num($("cons-rec"), 0));

    var consRev = pmRev + subRev - inter;
    var consNp = pmNp + subNp - unreal;
    var miNp = subNp * miR;
    var parentNp = consNp - miNp;
    var miEq = subNet * miR;
    var gw = inv - subNet * (1 - miR);
    var margin = consRev > 0 ? consNp / consRev : 0;

    $("cons-big").textContent = money(consRev);
    $("cons-cut").textContent = "−" + money(inter) + "（占母公司收入 " + pct(pmRev > 0 ? inter / pmRev : 0, 1) + "）";
    $("cons-np").textContent = yuan(consNp);
    $("cons-mi-np").textContent = yuan(miNp) + "（" + pct(miR, 0) + "）";
    $("cons-parent-np").textContent = yuan(parentNp);
    $("cons-mi-eq").textContent = yuan(miEq);
    $("cons-gw").textContent = (gw >= 0 ? "商誉 " : "负商誉（计入当期损益）") + money(Math.abs(gw)) + " 元"
      + "（投资 " + money(inv) + " vs 享有净资产 " + money(subNet * (1 - miR)) + "）";
    $("cons-rec-out").textContent = "−" + money(rec);
    $("cons-margin").textContent = pct(margin, 2);

    var rows = [
      ["营业收入", money(pmRev), money(subRev), "−" + money(inter), money(consRev)],
      ["净利润", money(pmNp), money(subNp), "−" + money(unreal), money(consNp)],
      ["其中：归属母公司", money(pmNp), "—", "—", money(parentNp)],
      ["少数股东损益", "—", money(miNp), "—", money(miNp)],
      ["内部应收（资产）", money(rec), money(rec), "−" + money(rec), "0.00"],
      ["长期股权投资", money(inv), "—", "−" + money(inv), "0.00"],
      ["子公司净资产", "—", money(subNet), "—", money(subNet)]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 0 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>"
        + rows[i][2] + "</td><td>" + rows[i][3] + "</td><td>" + rows[i][4] + "</td></tr>";
    }
    $("cons-body").innerHTML = html;

    $("cons-note").textContent = "合并报表不是把两张表加起来，是先把「自己跟自己做」的交易全部抹掉：内部销售、内部应收应付、内部投资与权益。"
      + "没卖出去的存货里那部分内部利润也要抵掉，否则等于把左口袋的钱算成利润。"
      + "长投抵销后如果不是零，差额就是商誉（买贵了）或负商誉（买便宜了）；差额算不平，八成是持股比例或子公司净资产口径对不上。";
  }

  /* ===== 订货批量与安全库存 ===== */
  function calcEoq() {
    var D = Math.max(1, num($("eoq-d"), 1));
    var K = Math.max(0, num($("eoq-k"), 0));
    var H = Math.max(0.01, num($("eoq-h"), 1));
    var day = Math.max(0, num($("eoq-day"), 0));
    var sd = Math.max(0, num($("eoq-sd"), 0));
    var lt = Math.max(0, num($("eoq-lt"), 0));
    var svc = num($("eoq-svc"), 95);
    var moq = Math.max(0, num($("eoq-moq"), 0));

    var eoq = Math.sqrt(2 * D * K / H);
    var times = eoq > 0 ? D / eoq : 0;
    var gap = times > 0 ? 365 / times : 0;
    var total = Math.sqrt(2 * D * K * H);
    var z = svc <= 90 ? 1.28 : svc <= 95 ? 1.65 : svc <= 99 ? 2.33 : 2.58;
    var ss = z * sd * Math.sqrt(lt);
    var rop = day * lt + ss;
    var avg = eoq / 2 + ss;
    var moqCost = moq > 0 ? D / moq * K + moq / 2 * H : 0;

    $("eoq-big").textContent = fmt(eoq, 0);
    $("eoq-times").textContent = fmt(times, 1) + " 次/年";
    $("eoq-gap").textContent = "约 " + fmt(gap, 1) + " 天";
    $("eoq-total").textContent = yuan(total);
    $("eoq-split").textContent = money(times * K) + " / " + money(eoq / 2 * H) + " 元（各占一半是最优点）";
    $("eoq-ss").textContent = fmt(ss, 1) + " 件（z=" + fmt(z, 2) + "，" + fmt(svc, 0) + "% 服务水平）";
    $("eoq-rop").textContent = fmt(rop, 1) + " 件（提前期用掉 " + fmt(day * lt, 0) + " 件）";
    $("eoq-avg").textContent = fmt(avg, 1) + " 件，年持有成本 " + money(avg * H) + " 元";
    $("eoq-moqgap").textContent = moq > 0 ? (moqCost - total >= 0 ? "多花 " : "少花 ") + money(Math.abs(moqCost - total)) + " 元（起订 " + fmt(moq, 0) + " 件）" : "—";

    var lots = [0.5, 0.75, 1, 1.5, 2, moq > 0 ? moq / eoq : 0];
    var seen = {}, html = "";
    for (var i = 0; i < lots.length; i++) {
      if (!(lots[i] > 0)) continue;
      var q = Math.round(eoq * lots[i]);
      if (q <= 0 || seen[q]) continue;
      seen[q] = 1;
      var oc = D / q * K, hc = q / 2 * H, sum = oc + hc;
      var cls = q === Math.round(eoq) ? ' class="c-info"' : (sum > total * 1.02 ? ' class="c-warn"' : "");
      html += "<tr" + cls + "><td>" + fmt(q, 0) + " 件" + (q === Math.round(eoq) ? "（最优）" : "") + "</td><td>"
        + fmt(D / q, 1) + "</td><td>" + money(oc) + "</td><td>" + money(hc) + "</td><td>" + money(sum) + "</td></tr>";
    }
    $("eoq-body").innerHTML = html;

    $("eoq-note").textContent = "经济批量的道理很朴素：订得多，持有成本涨；订得少，订货成本涨，两者相等时最省。"
      + "所以与其纠结「哪个批量最便宜」，不如先把每次订货成本压下来（合并订单、电子对账），最优批量会自动变大、次数变少。"
      + "安全库存只覆盖提前期内的需求波动，供应商交期不稳、涨价囤货、旺季备货都要另外算；服务水平从 95% 提到 99%，安全库存要涨四成。";
  }

  /* ===== 销售提成方案对比 ===== */
  function calcCommission() {
    var sales = Math.max(0, num($("cm-sales"), 0));
    var ret = Math.min(1, Math.max(0, num($("cm-ret"), 0) / 100));
    var gm = Math.min(1, Math.max(0, num($("cm-gm"), 0) / 100));
    var sr = Math.max(0, num($("cm-sr"), 0)) / 100;
    var gr = Math.max(0, num($("cm-gr"), 0)) / 100;
    var achv = Math.max(0, num($("cm-achv"), 100)) / 100;
    var cash = Math.min(1, Math.max(0, num($("cm-cash"), 100) / 100));

    var base = sales * (1 - ret);
    var gross = base * gm;
    var c1 = base * sr;
    var c2 = gross * gr;
    var coeff = achv < 0.8 ? 0.5 : achv < 1 ? 1 : achv < 1.2 ? 1.2 : 1.5;
    var crit = gr > 0 ? sr / gr : 0;

    $("cm-big").textContent = money(c2);
    $("cm-c1").textContent = yuan(c1);
    $("cm-gap").textContent = (c1 - c2 >= 0 ? "" : "销售额法少付 ") + money(Math.abs(c1 - c2)) + " 元";
    $("cm-crit").textContent = pct(crit, 2) + "（毛利率高于它，按毛利提对销售更有利）";
    $("cm-coeff").textContent = fmt(coeff, 1) + "（完成率 " + pct(achv, 0) + "）";
    $("cm-cashout").textContent = money(c1 * coeff * cash) + " / " + money(c2 * coeff * cash) + " 元";
    $("cm-share").textContent = gross > 0 ? pct(c1 / gross, 2) : "—";
    $("cm-base").textContent = yuan(base) + "（退货 " + pct(ret, 0) + "）";

    var gms = [0.2, gm, 0.3, 0.35, 0.4], seen = {}, html = "";
    for (var i = 0; i < gms.length; i++) {
      var g = Math.round(gms[i] * 1000) / 1000;
      if (seen[g]) continue;
      seen[g] = 1;
      var a = base * sr, b = base * g * gr, d = b - a;
      var cls = Math.abs(g - gm) < 0.0005 ? ' class="c-info"' : (d < 0 ? ' class="c-warn"' : "");
      html += "<tr" + cls + "><td>" + pct(g, 0) + "</td><td>" + money(a) + "</td><td>" + money(b) + "</td><td>"
        + (d >= 0 ? "+" : "") + money(d) + "</td></tr>";
    }
    $("cm-body").innerHTML = html;

    $("cm-note").textContent = "按销售额提成的毛病很简单：打折、赊账、卖高毛利还是低毛利，销售拿的钱差不多，"
      + "所以他会默认选择「最容易签下来」的方式，而那通常是最不赚钱的方式。按毛利提成把这一层对齐了——降价自己吃亏，"
      + "但销售会开始挑客户、也和公司抢定价权，所以常见做法是「毛利提成为主 + 销售额门槛（完成率系数）保底」。"
      + "提成按回款发放是最有效的风控，滞销赊账的提成拖着不发，比任何制度都好使。";
  }

  /* ===== 固定资产投决 ===== */
  function calcCapex() {
    var inv = Math.max(0, num($("cpx-inv"), 0));
    var cf = num($("cpx-cf"), 0);
    var yrs = Math.max(1, Math.min(50, Math.round(num($("cpx-years"), 1))));
    var r = Math.max(0, num($("cpx-rate"), 0)) / 100;
    var rv = Math.max(0, num($("cpx-rv"), 0));

    var flows = [], i;
    for (i = 0; i < yrs; i++) flows.push(cf);
    flows[yrs - 1] += rv;

    var pv = 0, cum = 0, cumD = 0, pb = 0, dpb = 0, prev = 0, prevD = 0, html = "";
    html += "<tr><td>0</td><td>−" + money(inv) + "</td><td>−" + money(inv) + "</td><td>−" + money(inv) + "</td></tr>";
    for (i = 0; i < yrs; i++) {
      var d = flows[i] / Math.pow(1 + r, i + 1);
      pv += d;
      prev = cum; cum += flows[i];
      prevD = cumD; cumD += d;
      if (!pb && cum >= inv) pb = i + (inv - prev) / (flows[i] || 1) + 0;
      if (!dpb && cumD >= inv) dpb = i + (inv - prevD) / (d || 1) + 0;
      html += "<tr><td>" + (i + 1) + "</td><td>" + money(flows[i]) + "</td><td>" + money(d) + "</td><td>" + money(cumD - inv) + "</td></tr>";
    }
    var npv = pv - inv;
    var pi = inv > 0 ? pv / inv : 0;

    var lo = -0.99, hi = 5, k;
    for (k = 0; k < 200; k++) {
      var mid = (lo + hi) / 2, s = -inv;
      for (i = 0; i < yrs; i++) s += flows[i] / Math.pow(1 + mid, i + 1);
      if (s > 0) lo = mid; else hi = mid;
    }
    var irr = (lo + hi) / 2;
    var pvifa = r > 0 ? (1 - Math.pow(1 + r, -yrs)) / r : yrs;

    $("cpx-big").textContent = (npv >= 0 ? "" : "−") + money(Math.abs(npv));
    $("cpx-irr").textContent = pct(irr, 2);
    $("cpx-pi").textContent = fmt(pi, 4);
    $("cpx-pb").textContent = pb ? fmt(pb, 2) + " 年" : "项目期内收不回";
    $("cpx-dpb").textContent = dpb ? fmt(dpb, 2) + " 年" : "按 " + pct(r, 1) + " 折现收不回";
    $("cpx-pvifa").textContent = fmt(pvifa, 6) + "（" + yrs + " 年，" + pct(r, 1) + "）";
    $("cpx-verdict").textContent = npv > 0 && irr > r
      ? "可投：NPV " + money(npv) + " 元，IRR 高出折现率 " + fmt((irr - r) * 100, 2) + " 个百分点"
      : npv <= 0 ? "别投：按 " + pct(r, 1) + " 折现是亏的" : "临界：IRR 没超过折现率，谨慎";
    $("cpx-body").innerHTML = html;

    $("cpx-note").textContent = "三个指标各管一件事：NPV 管「值多少钱」（绝对值，可加总），IRR 管「赚多快」（比率，方便跟资金成本比），"
      + "回收期只管「多久能拿回本」——它把回收期之后的钱全当不存在，所以短平快项目会被高估。"
      + "现金流要用「税后 + 加回折旧」，别直接拿利润当现金流；营运资金占用和后期大修要算进去。"
      + "残值别拍脑袋定高，处置时的税费也会吃掉一部分。";
  }

  /* ===== 资金归集与内部借款 ===== */
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

  /* ===== 客户信用额度核定 ===== */
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

  /* ===== 年度预算联动 ===== */
  function calcBPlan() {
    var rev0 = Math.max(0, num($("bpl-rev"), 0));
    var g = num($("bpl-grow"), 0) / 100;
    var gm = Math.min(1, Math.max(0, num($("bpl-gm"), 0) / 100));
    var opexR = Math.max(0, num($("bpl-opex"), 0) / 100);
    var dep = Math.max(0, num($("bpl-dep"), 0));
    var taxR = Math.min(1, Math.max(0, num($("bpl-tax"), 0) / 100));
    var dso = Math.max(0, num($("bpl-dso"), 0));
    var dio = Math.max(0, num($("bpl-dio"), 0));
    var dpo = Math.max(0, num($("bpl-dpo"), 0));
    var cash0 = num($("bpl-cash"), 0);

    var rev = rev0 * (1 + g);
    var cogs = rev * (1 - gm);
    var gp = rev * gm;
    var opexv = rev * opexR;
    var op = gp - opexv - dep;
    var taxv = Math.max(0, op * taxR);
    var np = op - taxv;

    function wc(r, c) {
      var ar = r / 365 * dso, inv = c / 365 * dio, ap = c / 365 * dpo;
      return [ar, inv, ap, ar + inv - ap];
    }
    var y0 = wc(rev0, rev0 * (1 - gm));
    var y1 = wc(rev, cogs);
    var gap = y1[3] - y0[3];
    var free = np + dep - gap;
    var cash1 = cash0 + free;

    $("bpl-big").textContent = fmt(np, 2);
    $("bpl-rev2").textContent = fmt(rev, 2) + " 万元（增长 " + pct(g, 1) + "）";
    $("bpl-gp").textContent = fmt(gp, 2) + " / " + fmt(opexv, 2) + " 万元";
    $("bpl-op").textContent = fmt(op, 2) + " / " + fmt(taxv, 2) + " 万元";
    $("bpl-margin").textContent = rev > 0 ? pct(np / rev, 2) : "—";
    $("bpl-wc").textContent = fmt(y1[0], 2) + " / " + fmt(y1[1], 2) + " / " + fmt(y1[2], 2) + " 万元";
    $("bpl-nwc").textContent = fmt(y0[3], 2) + " → " + fmt(y1[3], 2) + " 万元";
    $("bpl-wcgap").textContent = (gap >= 0 ? "多占用 " : "释放 ") + fmt(Math.abs(gap), 2) + " 万元";
    $("bpl-free").textContent = fmt(cash1, 2) + " / " + fmt(free, 2) + " 万元";

    var rows = [
      ["营业收入", rev0, rev],
      ["营业成本", rev0 * (1 - gm), cogs],
      ["毛利", rev0 * gm, gp],
      ["三费", rev0 * opexR, opexv],
      ["营业利润", rev0 * gm - rev0 * opexR - dep, op],
      ["净利润", rev0 * gm - rev0 * opexR - dep - Math.max(0, (rev0 * gm - rev0 * opexR - dep) * taxR), np],
      ["应收账款", y0[0], y1[0]],
      ["存货", y0[1], y1[1]],
      ["应付账款", y0[2], y1[2]],
      ["净营运资金", y0[3], y1[3]]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      var d = rows[i][2] - rows[i][1];
      var cls = i === 5 ? ' class="c-info"' : (i === 9 && d > 0 ? ' class="c-warn"' : "");
      html += "<tr" + cls + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + fmt(rows[i][1], 2) + "</td><td>"
        + fmt(rows[i][2], 2) + "</td><td>" + (d >= 0 ? "+" : "") + fmt(d, 2) + "</td></tr>";
    }
    $("bpl-body").innerHTML = html;

    $("bpl-note").textContent = "预算是三张表的联动，不是一张利润表：收入涨 " + pct(g, 0) + "，应收和存货会按天数同比涨，"
      + "这部分钱要先垫出去，所以利润和现金经常反向。本例净利 " + fmt(np, 2) + " 万元，但要再垫 " + fmt(Math.max(0, gap), 2)
      + " 万元营运资金，自由现金流 " + fmt(free, 2) + " 万元。要么把 DSO 压下来（催收），要么把 DPO 谈上去（供应商账期），"
      + "否则增长越快越缺钱。";
  }

  /* ===== 出口退税资金占用 ===== */
  function calcRefundFlow() {
    var exp = Math.max(0, num($("rf-exp"), 0));
    var reb = Math.max(0, num($("rf-reb"), 0)) / 100;
    var rate = Math.max(0, num($("rf-rate"), 0)) / 100;
    var lag = Math.max(0, num($("rf-lag"), 0));
    var audit = Math.max(0, num($("rf-audit"), 0));
    var cost = Math.max(0, num($("rf-cost"), 0)) / 100;

    var month = exp * reb;
    var days = lag + audit;
    var bal = month * days / 30;
    var oc = bal * cost;
    var gap = exp * Math.max(0, rate - reb);
    var ten = month * 10 / 30 * cost;
    var optDays = 45;
    var optBal = month * optDays / 30;
    var optCost = optBal * cost;

    $("rf-big").textContent = money(bal);
    $("rf-month").textContent = yuan(month);
    $("rf-year").textContent = yuan(month * 12);
    $("rf-days").textContent = fmt(days, 0) + " 天（申报滞后 " + fmt(lag, 0) + " + 审核到账 " + fmt(audit, 0) + "）";
    $("rf-costv").textContent = yuan(oc) + "（年化 " + pct(cost, 1) + "）";
    $("rf-gap").textContent = (gap > 0 ? yuan(gap) + "/月，全年 " + money(gap * 12) + " 元" : "无（征退税率相同）");
    $("rf-ten").textContent = yuan(ten);
    $("rf-opt").textContent = "在途 " + money(optBal) + " 元，成本 " + money(optCost) + " 元，省 " + money(oc - optCost) + " 元/年";
    $("rf-advice").textContent = days > 60 ? "压缩申报滞后最划算：单证齐全就报，别攒到月底" : "周期已经不慢，重点转到征退差与进项管理";

    var rows = [
      ["出口 → 申报", lag, month * lag / 30, month * lag / 30 * cost],
      ["申报 → 审核 → 到账", audit, month * audit / 30, month * audit / 30 * cost],
      ["合计", days, bal, oc]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 2 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>"
        + fmt(rows[i][1], 0) + " 天</td><td>" + money(rows[i][2]) + "</td><td>" + money(rows[i][3]) + "</td></tr>";
    }
    $("rf-body").innerHTML = html;

    $("rf-note").textContent = "退税款不是「国家的钱晚点给」，是你先垫的钱。真正要管的是「平均在途余额 × 资金成本」，"
      + "所以两个动作最有效：单证齐了马上申报（别等月末凑批）、把出口发票和报关单信息提前对齐减少退回重报。"
      + "另外征退税率之差（本例 " + pct(Math.max(0, rate - reb), 1) + "）是永久性成本，进项不足时这部分转不回来，"
      + "报价时就要含进去，别等到年底才发现毛利被吃掉。";
  }

  /* ===== 制造费用分摊方法对比 ===== */
  function calcCostAlloc() {
    var oh = Math.max(0, num($("cal-oh"), 0));
    var q = [num($("cal-qa"), 0), num($("cal-qb"), 0), num($("cal-qc"), 0)];
    var h = [num($("cal-ha"), 0), num($("cal-hb"), 0), num($("cal-hc"), 0)];
    var m = [num($("cal-ma"), 0), num($("cal-mb"), 0), num($("cal-mc"), 0)];
    var mat = [num($("cal-ta"), 0), num($("cal-tb"), 0), num($("cal-tc"), 0)];
    var names = ["A", "B", "C"];

    var Tq = 0, Th = 0, Tm = 0, Tmat = 0, i;
    for (i = 0; i < 3; i++) {
      Tq += Math.max(0, q[i]);
      Th += Math.max(0, q[i]) * Math.max(0, h[i]);
      Tm += Math.max(0, q[i]) * Math.max(0, m[i]);
      Tmat += Math.max(0, mat[i]);
    }
    var rQ = Tq > 0 ? oh / Tq : 0;
    var rH = Th > 0 ? oh / Th : 0;
    var rM = Tm > 0 ? oh / Tm : 0;
    var rMat = Tmat > 0 ? oh / Tmat : 0;

    var unit = [], spread = [], html = "";
    for (i = 0; i < 3; i++) {
      var qq = Math.max(1e-9, q[i]);
      var u1 = oh * Math.max(0, q[i]) / (Tq || 1) / qq;
      var u2 = oh * Math.max(0, q[i]) * Math.max(0, h[i]) / (Th || 1) / qq;
      var u3 = oh * Math.max(0, q[i]) * Math.max(0, m[i]) / (Tm || 1) / qq;
      var u4 = oh * Math.max(0, mat[i]) / (Tmat || 1) / qq;
      unit.push([u1, u2, u3, u4]);
      spread.push(Math.max(u1, u2, u3, u4) - Math.min(u1, u2, u3, u4));
      html += "<tr><td class=\"tal\">产品 " + names[i] + "（" + fmt(q[i], 0) + " 件）</td><td>" + fmt(u1, 2) + "</td><td>"
        + fmt(u2, 2) + "</td><td>" + fmt(u3, 2) + "</td><td>" + fmt(u4, 2) + "</td><td>" + fmt(spread[i], 2) + "</td></tr>";
    }
    $("cal-body").innerHTML = html;

    var maxI = 0;
    for (i = 1; i < 3; i++) if (spread[i] > spread[maxI]) maxI = i;
    $("cal-big").textContent = fmt(spread[maxI], 2);
    $("cal-which").textContent = "产品 " + names[maxI] + "：" + fmt(Math.min.apply(null, unit[maxI]), 2) + " ~ " + fmt(Math.max.apply(null, unit[maxI]), 2) + " 元/件";
    $("cal-totals").textContent = fmt(Tq, 0) + " 件 / " + fmt(Th, 1) + " 工时 / " + fmt(Tm, 1) + " 机时";
    $("cal-r1").textContent = fmt(rQ, 2) + " 元/件";
    $("cal-r2").textContent = fmt(rH, 2) + " 元/工时 / " + fmt(rM, 2) + " 元/机时";
    $("cal-r3").textContent = pct(rMat, 2) + "（按材料成本比例）";

    var uu = unit[maxI];
    var pick = (uu[2] >= Math.max(uu[0], uu[3])) ? "按机器工时：自动化/设备密集的产线"
      : (uu[1] >= uu[0] ? "按工时：人工密集的产线" : "按产量：产品结构单一时够用");
    $("cal-pick").textContent = pick;
    $("cal-price").textContent = "产品 " + names[maxI] + " 的单位成本能差 " + fmt(spread[maxI], 2) + " 元，"
      + "按低价基准定价会亏本卖，按高价基准定价会丢单";

    $("cal-note").textContent = "分摊基准没有「绝对正确」，只有「和费用发生的原因最接近」。制造费用里折旧、电费、维修费主要是被机器消耗的，"
      + "所以按机时最贴近因果；人工密集的工序按工时；只有产品结构很单一时按产量才不至于失真；"
      + "按材料成本分摊最省事，但会让「材料贵、加工少」的产品替全厂背费用，报价一算就虚高。"
      + "作业成本法（ABC）思路一样，只是把「一个基准」拆成「多个动因」。";
  }

  /* ===== 进口到岸成本 ===== */
  function calcImportCost() {
    var fob = Math.max(0, num($("ic-fob"), 0));
    var frt = Math.max(0, num($("ic-frt"), 0));
    var ins = Math.max(0, num($("ic-ins"), 0));
    var fx = Math.max(0, num($("ic-fx"), 1));
    var dutyR = Math.max(0, num($("ic-duty"), 0)) / 100;
    var consR = Math.min(0.99, Math.max(0, num($("ic-cons"), 0) / 100));
    var vatR = Math.max(0, num($("ic-vat"), 0)) / 100;
    var port = Math.max(0, num($("ic-port"), 0));
    var agent = Math.max(0, num($("ic-agent"), 0));
    var qty = Math.max(1, num($("ic-qty"), 1));

    var cif = (fob + frt + ins) * fx;
    var duty = cif * dutyR;
    var cons = (cif + duty) / (1 - consR) * consR;
    var vat = (cif + duty + cons) * vatR;
    var fees = port + agent;
    var land = cif + duty + cons + fees;
    var cash = land + vat;
    var unitLand = land / qty;
    var unitCash = cash / qty;
    var ratio = cif > 0 ? (duty + cons + vat) / cif : 0;

    $("ic-big").textContent = fmt(unitLand, 2);
    $("ic-cif").textContent = yuan(cif) + "（" + fmt(fob + frt + ins, 0) + " 美元）";
    $("ic-dutyv").textContent = yuan(duty) + "（" + pct(dutyR, 1) + "）";
    $("ic-consv").textContent = yuan(cons) + (consR > 0 ? "（" + pct(consR, 1) + "，价内税，含在完税价里算）" : "（不涉及）");
    $("ic-vatv").textContent = yuan(vat) + "（拿来抵扣，不进成本）";
    $("ic-fees").textContent = yuan(fees);
    $("ic-land").textContent = yuan(land);
    $("ic-cash").textContent = yuan(cash) + " / " + money(unitCash) + " 元/件";
    $("ic-ratio").textContent = pct(ratio, 2) + "（其中可抵扣部分 " + pct(cif > 0 ? vat / cif : 0, 2) + "）";

    var rows = [
      ["CIF 完税价格", money(cif), "（货值＋运费＋保险）× 汇率"],
      ["关税", money(duty), pct(dutyR, 1) + " × CIF"],
      ["消费税", money(cons), consR > 0 ? "（CIF＋关税）÷(1−税率)×税率" : "本笔不涉及"],
      ["进口增值税", money(vat), "（CIF＋关税＋消费税）× " + pct(vatR, 0) + "，可抵扣"],
      ["港杂 + 代理", money(fees), "国内环节费用"],
      ["到岸成本（进存货）", money(land), "不含可抵扣增值税"],
      ["含税现金支出", money(cash), "到岸成本 + 进口增值税"],
      ["单位到岸成本", money(unitLand) + " 元/件", "到岸成本 ÷ " + fmt(qty, 0) + " 件"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 5 || i === 7 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td class=\"tal\">" + rows[i][2] + "</td></tr>";
    }
    $("ic-body").innerHTML = html;

    $("ic-note").textContent = "三个容易算错的地方：一是完税价格用 CIF（货值＋运费＋保险），漏了运费关税就少交、被追缴还带滞纳金；"
      + "二是消费税是价内税，要用「(CIF＋关税)÷(1−消费税率)」倒算，不是直接乘税率；"
      + "三是进口增值税可以抵扣，它占压的是资金不是成本，报价时算进单价会把价格报高一大截。"
      + "从付汇到抵扣通常隔一两个月，这段占压资金也要计入真实成本。";
  }

  /* ===== 关联方转移定价 ===== */
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

  /* ===== 股权激励费用摊销 ===== */
  function calcEsop() {
    var sh = Math.max(0, num($("es-shares"), 0));
    var fair = Math.max(0, num($("es-fair"), 0));
    var strike = Math.max(0, num($("es-strike"), 0));
    var yrs = Math.max(1, Math.round(num($("es-years"), 1)));
    var leave = Math.min(1, Math.max(0, num($("es-leave"), 0) / 100));
    var taxR = Math.min(1, Math.max(0, num($("es-tax"), 0) / 100));

    var per = Math.max(0, fair - strike) * 10000;
    var qty = sh * (1 - leave);
    var total = per * qty / 10000;
    var flat = total / yrs;
    var accW = [0.4, 0.3, 0.2, 0.1];
    var rows = [], html = "", dtaAcc = 0, firstAcc = 0;
    for (var i = 1; i <= yrs; i++) {
      var flatV = flat;
      var accV = i <= 4 ? total * accW[i - 1] : 0;
      if (yrs > 4 && i > 4) accV = 0;
      if (i === 1) firstAcc = accV;
      var deduct = i === yrs ? total : 0;
      dtaAcc += flatV * taxR;
      html += "<tr" + (i === yrs ? ' class="c-info"' : "") + "><td>第 " + i + " 年</td><td>" + fmt(flatV, 2)
        + "</td><td>" + fmt(accV, 2) + "</td><td>" + (deduct > 0 ? fmt(deduct, 2) : "—") + "</td></tr>";
    }
    $("es-body").innerHTML = html;

    $("es-big").textContent = fmt(total, 2);
    $("es-per").textContent = fmt(Math.max(0, fair - strike), 2) + " 元/股（公允 " + fmt(fair, 2) + " − 行权 " + fmt(strike, 2) + "）";
    $("es-qty").textContent = fmt(qty, 2) + " 万股（扣 " + pct(leave, 0) + " 离职率）";
    $("es-flat").textContent = fmt(flat, 2) + " 万元（" + yrs + " 年匀速）";
    $("es-acc").textContent = fmt(firstAcc, 2) + " 万元";
    $("es-diff").textContent = "会计每年确认 " + fmt(flat, 2) + " 万元，税务上归属前不扣除 → 前期纳税调增";
    $("es-dta").textContent = fmt(dtaAcc, 2) + " 万元（" + pct(taxR, 0) + "）";
    $("es-deduct").textContent = fmt(total, 2) + " 万元（按工资薪金扣除）";
    $("es-advice").textContent = yrs > 4 ? "等待期越长，每年摊销越轻，但激励感也越弱" : "常见 3–4 年匀速归属，加速归属首年费用更重";

    $("es-note").textContent = "股份支付费用是「不花钱的成本」：不影响现金流，但直接压净利润，还会拉低每股收益。"
      + "总额只跟授予日公允价值、行权价、数量和预计离职率有关，跟以后股价涨跌无关（后续公允价值变动不再调整）。"
      + "关键差异在时点：会计在等待期内分期确认，税务要等归属/解禁、按「公允价值 − 行权价」作为工资薪金才能扣，"
      + "所以前几年会计费用多、税上不让扣（调增并确认递延所得税资产），归属那年一次性大额扣除。"
      + "另外注意：激励对象个税按「工资薪金」单独计税的优惠政策、以及集团内跨主体授予还要考虑费用由谁承担。";
  }

  /* ===== 研发费用加计扣除 ===== */
  function calcRdExp() {
    var labor = Math.max(0, num($("rd-labor"), 0));
    var mat = Math.max(0, num($("rd-mat"), 0));
    var dep = Math.max(0, num($("rd-dep"), 0));
    var other = Math.max(0, num($("rd-other"), 0));
    var pctR = Math.max(0, num($("rd-pct"), 0)) / 100;
    var taxR = Math.min(1, Math.max(0, num($("rd-tax"), 0) / 100));

    var core = labor + mat + dep;
    var cap = core / 9 * 0.1 * 1.0;
    cap = core / (1 - 0.1) * 0.1;
    var eff = Math.min(other, cap);
    var base = core + eff;
    var add = base * pctR;
    var save = add * taxR;
    var totalAll = labor + mat + dep + other;
    var lost = Math.max(0, other - eff);
    var effRate = totalAll > 0 ? 1 - save / totalAll : 0;

    $("rd-big").textContent = fmt(add, 2);
    $("rd-total").textContent = fmt(totalAll, 2) + " 万元";
    $("rd-cap").textContent = fmt(cap, 2) + " 万元（前三项 ÷ 9 × 1）";
    $("rd-effect").textContent = fmt(eff, 2) + " 万元" + (lost > 0 ? "（超限 " + fmt(lost, 2) + " 不能加计）" : "（未超限，全额计入）");
    $("rd-base").textContent = fmt(base, 2) + " 万元";
    $("rd-save").textContent = pct(pctR, 0) + " 加计 / 少缴 " + fmt(save, 2) + " 万元";
    $("rd-eff").textContent = "实际负担 " + pct(effRate, 2) + "（相当于每 100 万研发只花 " + fmt(effRate * 100, 2) + " 万）";
    $("rd-lost").textContent = lost > 0 ? fmt(lost, 2) + " 万元" : "无";

    var rows = [
      ["人员人工费用", labor, "可以"],
      ["直接投入费用", mat, "可以"],
      ["折旧 / 摊销", dep, "可以"],
      ["其他相关费用", other, eff >= other ? "可以" : "部分可以（" + fmt(eff, 2) + "）"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 3 && lost > 0 ? ' class="c-warn"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + fmt(rows[i][1], 2) + "</td><td class=\"tal\">" + rows[i][2] + "</td></tr>";
    }
    $("rd-body").innerHTML = html;

    $("rd-note").textContent = "加计扣除等于国家替你分担一部分研发成本：按 " + pct(pctR, 0) + " 加计、税率 " + pct(taxR, 0)
      + "，就是研发支出的 " + pct(pctR * taxR, 0) + " 能少缴税，本例 " + fmt(save, 2) + " 万元。"
      + "三个容易踩的点：其他相关费用有 10% 限额（算法是前三项 ÷ 9 × 1，不是简单乘 10%）；"
      + "失败的研发活动、常规性升级、产品直接相关的外观设计不算；形成无形资产的按资本化金额的 200% 摊销，不能既费用化又资本化。"
      + "另外要留存立项决议、研发人员名单、工时与费用归集表，抽查时拿不出就是全额剔除。";
  }

  /* ===== 滚动预测 ===== */
  function calcRollFC() {
    var bud = Math.max(0, num($("rl-bud"), 0));
    var passed = Math.min(11, Math.max(0, Math.round(num($("rl-passed"), 0))));
    var act = Math.max(0, num($("rl-act"), 0));
    var rest = Math.max(0, num($("rl-rest"), 0));
    var gmb = num($("rl-gmb"), 0) / 100;
    var gma = num($("rl-gma"), 0) / 100;
    var left = 12 - passed;

    var fc = act + rest * left;
    var rate = bud > 0 ? fc / bud : 0;
    var gap = fc - bud;
    var expect = bud * passed / 12;
    var pace = expect > 0 ? act / expect : 0;
    var need = left > 0 ? (bud - act) / left : 0;
    var gpB = bud * gmb, gpF = fc * gma;

    $("rl-big").textContent = fmt(fc, 2);
    $("rl-rate").textContent = pct(rate, 2);
    $("rl-gap").textContent = (gap >= 0 ? "超出 " : "缺口 ") + fmt(Math.abs(gap), 2) + " 万元";
    $("rl-expect").textContent = fmt(expect, 2) + " 万元（" + fmt(passed, 0) + "/12）";
    $("rl-pace").textContent = pct(pace, 1) + (pace >= 1 ? "（略超进度）" : "（落后进度）");
    $("rl-need").textContent = fmt(need, 2) + " 万元/月";
    $("rl-delta").textContent = (need > rest ? "每月再加 " + fmt(need - rest, 2) : "无需加，可下调 " + fmt(rest - need, 2)) + " 万元";
    $("rl-gp").textContent = fmt(gpB, 2) + " → " + fmt(gpF, 2) + " 万元（" + (gpF >= gpB ? "+" : "") + fmt(gpF - gpB, 2) + "）";
    $("rl-advice").textContent = rate >= 1 ? "预算可达成，重点转向毛利质量" : (rate >= 0.95 ? "缺口在 5% 内，靠一两个大单可补" : "建议下调全年预算并同步削减费用投放");

    var rows = [
      ["收入", bud, fc],
      ["毛利", gpB, gpF],
      ["毛利率", gmb * 100, gma * 100]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      var f = i === 2 ? fmt(rows[i][1], 2) + "%" : fmt(rows[i][1], 2);
      var t = i === 2 ? fmt(rows[i][2], 2) + "%" : fmt(rows[i][2], 2);
      var d = rows[i][2] - rows[i][1];
      html += "<tr><td class=\"tal\">" + rows[i][0] + "</td><td>" + f + "</td><td>" + t + "</td><td>" + (d >= 0 ? "+" : "") + fmt(d, 2) + (i === 2 ? " 点" : "") + "</td></tr>";
    }
    $("rl-body").innerHTML = html;

    $("rl-note").textContent = "滚动预测的用法：已实现的收入是硬的，剩下的月份按最新判断重估，而不是把预算按月份摊完。"
      + "本例时间进度 " + fmt(passed, 0) + "/12 应有 " + fmt(expect, 2) + " 万元，实际 " + fmt(act, 2)
      + " 万元（" + pct(pace, 1) + "），靠剩余 " + fmt(left, 0) + " 个月每月 " + fmt(rest, 2) + " 万元只能到 "
      + fmt(fc, 2) + " 万元。注意毛利率同时在掉（" + pct(gmb, 0) + " → " + pct(gma, 0) + "），"
      + "收入差 " + fmt(Math.abs(gap), 2) + " 万元、毛利差 " + fmt(Math.abs(gpF - gpB), 2) + " 万元，"
      + "利润缺口比收入缺口更大——这时候靠打折冲量的做法会让差距进一步扩大。";
  }

  /* ===== 自产还是外购 ===== */
  function calcMakeOrBuy() {
    var q = Math.max(0, num($("mob-q"), 0));
    var vu = Math.max(0, num($("mob-vu"), 0));
    var avo = Math.max(0, num($("mob-avo"), 0));
    var price = Math.max(0, num($("mob-price"), 0));
    var extra = Math.max(0, num($("mob-extra"), 0));
    var rent = Math.max(0, num($("mob-rent"), 0));
    var fixAll = Math.max(0, num($("mob-fixall"), 0));

    var selfC = vu * q + avo;
    var buyC = (price + extra) * q - rent;
    var diff = selfC - buyC;
    var unitSelf = q > 0 ? selfC / q : 0;
    var unitBuy = price + extra;
    var critPrice = q > 0 ? (selfC + rent) / q - extra : 0;
    var perUnitGap = unitSelf - unitBuy;
    var perUnitSave = unitBuy - vu;
    var qCrit = perUnitSave > 0 ? (avo + rent) / perUnitSave : Infinity;

    $("mob-big").textContent = fmt(Math.abs(diff), 2) + (diff >= 0 ? "（外购更省）" : "（自产更省）");
    $("mob-self").textContent = yuan(selfC) + "（变动 " + money(vu * q) + " + 可避免固定 " + money(avo) + "）";
    $("mob-buy").textContent = yuan(buyC) + "（货款 " + money(price * q) + " + 增量 " + money(extra * q) + " − 租金 " + money(rent) + "）";
    $("mob-unit").textContent = "自产 " + money(unitSelf) + " 元/件 vs 外购 " + money(unitBuy) + " 元/件（差 " + money(Math.abs(perUnitGap)) + "）";
    $("mob-crit").textContent = money(critPrice) + " 元/件（高于此价自产更划算）";
    $("mob-qcrit").textContent = (isFinite(qCrit) && qCrit > 0) ? fmt(qCrit, 0) + " 件（低于此量外购更划算）" : "单位差额太小，需求量几乎不改变结论";
    $("mob-pick").textContent = diff >= 0 ? "转外购：外购总成本更低，但先确认质量、交期、断供风险能兜住" : "维持自产：外购看着单价低，把可避免固定成本和腾出产能的收益算进去并不划算";

    var wrongSelf = vu * q + fixAll;
    $("mob-wrong").textContent = "自产 " + money(wrongSelf) + " vs 外购 " + money(price * q + extra * q)
      + " → 会误判成外购省 " + money(wrongSelf - (price + extra) * q);

    var rows = [
      ["变动成本 / 货款", money(vu * q), money(price * q)],
      ["增量费用", "—", money(extra * q)],
      ["可避免固定成本", money(avo), "—"],
      ["腾出产能收益", "—", "−" + money(rent)],
      ["决策相关成本合计", money(selfC), money(buyC)],
      ["单位口径", money(unitSelf) + " 元", money(unitBuy) + " 元"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 4 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td></tr>";
    }
    $("mob-body").innerHTML = html;

    $("mob-note").textContent = "这类决策只比「会变的那部分」：自己生产的变动成本、停产后能省掉的固定成本、外购单价和外购带来的增量费用，"
      + "再加上腾出厂房设备能赚的钱。折旧、厂房租金、管理人员工资这些停产也照付的，跟决策无关，摊进单位成本就会得出「外购便宜一大截」的错误结论"
      + "（本例按错误口径会误判成省 " + money(wrongSelf - (price + extra) * q) + "，实际只差 " + money(Math.abs(diff)) + "）。"
      + "真正要小心的还有隐性成本：质量追责、交期、断供、技术外流。";
  }

  /* ===== 应收账款预期信用损失 ===== */
  function calcEcl() {
    var amt = [num($("ecl-a1"), 0), num($("ecl-a2"), 0), num($("ecl-a3"), 0), num($("ecl-a4"), 0), num($("ecl-a5"), 0)];
    var rate = [num($("ecl-r1"), 0) / 100, num($("ecl-r2"), 0) / 100, num($("ecl-r3"), 0) / 100,
      num($("ecl-r4"), 0) / 100, num($("ecl-r5"), 0) / 100];
    var adj = num($("ecl-adj"), 0) / 100;
    var prev = num($("ecl-prev"), 0);
    var names = ["未到期", "逾期 1–90 天", "逾期 91–180 天", "逾期 181–365 天", "逾期 1 年以上"];

    var total = 0, base = 0, html = "", i;
    for (i = 0; i < 5; i++) {
      var a = Math.max(0, amt[i]), r = Math.min(1, Math.max(0, rate[i]));
      var p = a * r;
      total += a; base += p;
      html += "<tr" + (i >= 3 ? ' class="c-warn"' : "") + "><td class=\"tal\">" + names[i] + "</td><td>" + money(a) + "</td><td>"
        + pct(r, 2) + "</td><td>" + money(p) + "</td></tr>";
    }
    $("ecl-body").innerHTML = html;

    var adjv = base * (1 + adj);
    var delta = adjv - prev;
    $("ecl-big").textContent = money(adjv);
    $("ecl-total").textContent = money(total);
    $("ecl-base").textContent = money(base);
    $("ecl-adjv").textContent = money(adjv) + "（前瞻调整 " + pct(adj, 0) + "）";
    $("ecl-delta").textContent = (delta >= 0 ? "补提 " : "冲回 ") + money(Math.abs(delta)) + " 元（期初 " + money(prev) + "）";
    $("ecl-ratio").textContent = total > 0 ? pct(adjv / total, 2) : "—";
    $("ecl-loss").textContent = "信用减值损失 " + money(Math.max(0, delta)) + " 元，直接冲减当期利润（不影响现金流）";
    $("ecl-tax").textContent = "会计计提不得税前扣除，汇算时纳税调增；实际发生坏账并留存证据才可扣除";

    $("ecl-note").textContent = "预期信用损失的核心是「分组 + 概率 + 前瞻」：同一账龄组的客户历史违约率乘上金额算出基础准备，"
      + "再按行业景气、客户集中度、宏观预期做前瞻调整。本例综合计提比例 " + (total > 0 ? pct(adjv / total, 2) : "—")
      + "，账龄超过 180 天的两档虽然只占 " + (total > 0 ? pct((Math.max(0, amt[3]) + Math.max(0, amt[4])) / total, 2) : "—")
      + "，却贡献了一半以上的准备——催收资源就该往这里压。注意：会计计提不等于能税前扣，别把「计提了」当成「省税了」。";
  }

  /* ===== 出口报价换算 ===== */
  function calcQuoteFx() {
    var cost = Math.max(0, num($("qf-cost"), 0));
    var qty = Math.max(1, num($("qf-qty"), 1));
    var dyn = Math.max(0, num($("qf-dyn"), 0));
    var port = Math.max(0, num($("qf-port"), 0));
    var gm = Math.min(0.9, Math.max(0, num($("qf-gm"), 0) / 100));
    var comm = Math.min(0.2, Math.max(0, num($("qf-comm"), 0) / 100));
    var fx = Math.max(0.01, num($("qf-fx"), 7));
    var frtUsd = Math.max(0, num($("qf-frt"), 0));
    var insR = Math.max(0, num($("qf-ins"), 0) / 100);

    var baseR = (cost * qty + dyn + port) / (1 - gm);
    var fob = baseR / (1 - comm);
    var commv = fob * comm;
    var frtR = frtUsd * fx;
    var cif = (fob + frtR) / (1 - insR);
    var insv = cif - fob - frtR;
    var profit = fob - commv - cost * qty - dyn - port;
    var unitFob = fob / qty, unitCif = cif / qty;

    $("qf-big").textContent = fmt(unitCif / fx, 2);
    $("qf-fob").textContent = money(fob) + " 元 / " + money(unitFob) + " 元（" + fmt(unitFob / fx, 2) + " 美元）";
    $("qf-comv").textContent = money(commv) + "（" + pct(comm, 1) + "）";
    $("qf-real").textContent = fob > 0 ? pct(profit / fob, 2) : "—";
    $("qf-frtv").textContent = money(frtR) + "（" + fmt(frtUsd, 0) + " 美元）";
    $("qf-insv").textContent = money(insv) + "（CIF × " + pct(insR, 2) + " 倒算）";
    $("qf-cif").textContent = money(cif) + " / " + money(unitCif) + " 元（" + fmt(unitCif / fx, 2) + " 美元）";
    $("qf-profit").textContent = money(profit / qty) + " 元（扣佣金与国内费用后）";
    $("qf-fxrisk").textContent = "FOB 收汇减少 " + money(fob / fx * 0.1) + " 元";

    var rows = [
      ["FOB 报价", money(fob), fmt(fob / fx, 2)],
      ["减：佣金", "−" + money(commv), fmt(commv / fx, 2)],
      ["减：工厂成本", "−" + money(cost * qty), fmt(cost * qty / fx, 2)],
      ["减：国内运费+港杂", "−" + money(dyn + port), fmt((dyn + port) / fx, 2)],
      ["净利", money(profit), fmt(profit / fx, 2)],
      ["CFR 报价（含海运费）", money(fob + frtR), fmt((fob + frtR) / fx, 2)],
      ["CIF 报价（含运保费）", money(cif), fmt(cif / fx, 2)]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 4 || i === 6 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td></tr>";
    }
    $("qf-body").innerHTML = html;

    $("qf-note").textContent = "报价是倒推出来的：先算「这批货必须卖多少钱才够目标毛利和覆盖国内费用」，再按条款往上加。"
      + "FOB 只管到船舷，CFR 加海运费，CIF 再加保险（保险按 CIF 的 " + pct(insR, 2) + " 倒算，不是按 FOB 乘）。"
      + "两个坑：一是佣金要从报价里倒着加，直接乘会少算；二是目标毛利率是对 FOB 算的，扣掉佣金后实际只有 "
      + (fob > 0 ? pct(profit / fob, 2) : "—") + "。收汇还要盯汇率，报出去到收款之间每跌 0.1 元，这批货就少收 " + money(fob / fx * 0.1) + " 元。";
  }

  /* ===== 多工厂产能分配 ===== */
  function calcCapacity() {
    var p = Math.max(0, num($("cap-p"), 0));
    var q = Math.max(0, num($("cap-q"), 0));
    var va = Math.max(0, num($("cap-va"), 0)), ca = Math.max(0, num($("cap-ca"), 0)), fa = Math.max(0, num($("cap-fa"), 0));
    var vb = Math.max(0, num($("cap-vb"), 0)), cb = Math.max(0, num($("cap-cb"), 0)), fb = Math.max(0, num($("cap-fb"), 0));
    var fixa = Math.max(0, num($("cap-fixa"), 0)), fixb = Math.max(0, num($("cap-fixb"), 0));
    var outP = Math.max(0, num($("cap-out"), 0));

    var cmA = p - va - fa, cmB = p - vb - fb;
    var firstIsA = cmA >= cmB;
    var qa = 0, qb = 0;
    if (firstIsA) { qa = Math.min(ca, q); qb = Math.min(cb, Math.max(0, q - qa)); }
    else { qb = Math.min(cb, q); qa = Math.min(ca, Math.max(0, q - qb)); }
    var cm = qa * cmA + qb * cmB;
    var profit = cm - fixa - fixb;

    var qa2 = Math.min(ca, q), qa3 = 0;
    var qb2 = Math.min(cb, Math.max(0, q - qa2));
    var cm2 = qa2 * cmA + qb2 * cmB;
    var qbW = Math.min(cb, q), qaW = Math.min(ca, Math.max(0, q - qbW));
    var cmW = qbW * cmB + qaW * cmA;

    $("cap-big").textContent = fmt(profit, 2);
    $("cap-a").textContent = money(cmA) + " / 台 · " + fmt(qa, 0) + " 台";
    $("cap-b").textContent = money(cmB) + " / 台 · " + fmt(qb, 0) + " 台";
    $("cap-cm").textContent = money(cm);
    $("cap-fix").textContent = money(fixa + fixb);
    $("cap-wrong").textContent = "少赚 " + money(cm2 - cmW) + "（先填 B 只有 " + money(cmW) + "）";
    var short = Math.max(0, q - ca - cb);
    $("cap-gap").textContent = short > 0 ? "还差 " + fmt(short, 0) + " 台：外协、加班或谈交货期"
      : "产能够（余 " + fmt(Math.max(0, ca + cb - q), 0) + " 台）";
    if (outP > 0 && short > 0) {
      var outCm = p - outP;
      var best = Math.max(cmA, cmB, 0);
      $("cap-outv").textContent = "外协每台贡献 " + money(outCm) + " 元，" + (outCm > 0
        ? (outP < vb + fb ? "比 B 厂自产还便宜，优先外协" : "能赚钱但不如自产，只用来补缺口")
        : "亏钱，别接这个量的单");
    } else if (outP > 0) {
      $("cap-outv").textContent = "当前产能够用，暂不需要外协（外协每台贡献 " + money(p - outP) + " 元）";
    } else {
      $("cap-outv").textContent = "未填外协价";
    }

    var rows = [
      ["按边际贡献排（最优）", fmt(qa, 0), fmt(qb, 0), money(cm), money(profit)],
      ["先填 A 再填 B", fmt(qa2, 0), fmt(qb2, 0), money(cm2), money(cm2 - fixa - fixb)],
      ["先填 B 再填 A", fmt(qaW, 0), fmt(qbW, 0), money(cmW), money(cmW - fixa - fixb)],
      ["A 全部产能单独", fmt(Math.min(ca, q), 0), "0", money(Math.min(ca, q) * cmA), money(Math.min(ca, q) * cmA - fixa - fixb)],
      ["B 全部产能单独", "0", fmt(Math.min(cb, q), 0), money(Math.min(cb, q) * cmB), money(Math.min(cb, q) * cmB - fixa - fixb)]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 0 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>"
        + rows[i][2] + "</td><td>" + rows[i][3] + "</td><td>" + rows[i][4] + "</td></tr>";
    }
    $("cap-body").innerHTML = html;

    $("cap-note").textContent = "排产只看单位边际贡献（售价 − 变动成本 − 运费）：A 厂 " + money(cmA) + "、B 厂 " + money(cmB)
      + "，所以先填 A。注意两家厂的「单位总成本」算下来可能一模一样（本例各 " + money((va * ca + fixa) / ca + fa) + " 和 "
      + money((vb * cb + fixb) / cb + fb) + "），因为固定费用被产量摊平了——这正是总成本法不能用来排产的原因："
      + "它把「不随产量变」的钱算成了每台的成本，产量一变结论就变。只有当订单超过总产能时，才用外协/加班补缺口，"
      + "判断标准仍是「外协一台能不能带来正的边际贡献」。";
  }

  function zOf(p) {
    if (p <= 0.5) return 0;
    if (p >= 0.9999) return 3.719;
    var a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
    var b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
    var c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
    var d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
    var q, r;
    if (p < 0.02425) {
      q = Math.sqrt(-2 * Math.log(p));
      return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    q = p - 0.5; r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }

  /* ===== 模具摊销与最小批量 ===== */
  function calcMold() {
    var fee = Math.max(0, num($("mold-fee"), 0));
    var life = Math.max(1, num($("mold-life"), 1));
    var price = Math.max(0, num($("mold-price"), 0));
    var vc = Math.max(0, num($("mold-vc"), 0));
    var q = Math.max(1, num($("mold-q"), 1));
    var disc = Math.max(0, num($("mold-disc"), 0));

    var perLife = fee / life, perQ = fee / q;
    var m1 = price - vc - perLife, m2 = disc - vc - perQ;
    var total = q * (disc - vc) - fee;
    var min1 = disc > vc ? fee / (disc - vc) : Infinity;
    var min2 = price > vc ? fee / (price - vc) : Infinity;
    var gap = min1 - q;

    $("mold-big").textContent = isFinite(min1) ? fmt(Math.ceil(min1), 0) : "—";
    $("mold-per").textContent = money(perLife) + " 元/件（按 " + fmt(life, 0) + " 件寿命）";
    $("mold-perq").textContent = money(perQ) + " 元/件（按 " + fmt(q, 0) + " 件订单）";
    $("mold-m1").textContent = money(m1) + " 元/件";
    $("mold-m2").textContent = money(m2) + " 元/件";
    $("mold-total").textContent = yuan(total) + "（扣完模具后）";
    $("mold-min1").textContent = isFinite(min2) ? fmt(Math.ceil(min2), 0) + " 件" : "—";
    $("mold-verdict").textContent = total >= 0
      ? "可接：全年摊完模具还赚 " + fmt(Math.abs(total), 2) + " 元，余量 " + fmt(q - min1, 0) + " 件"
      : "不足保本：还差 " + fmt(Math.ceil(gap), 0) + " 件，或单价需提到 " + money(vc + fee / q) + " 元";

    var qs = [0.2, 0.4, 0.6, 0.8, 1.0], html = "";
    for (var i = 0; i < qs.length; i++) {
      var cq = life * qs[i];
      var per = fee / cq;
      var cm = disc - vc - per;
      html += "<tr" + (cm < 0 ? ' class="c-warn"' : '') + "><td>" + fmt(cq, 0) + " 件</td><td>" + money(per)
        + "</td><td>" + money(cm) + "</td><td>" + money(cm * cq) + "</td></tr>";
    }
    $("mold-body").innerHTML = html;

    $("mold-note").textContent = "模具费是「先花出去、按件收回」的沉没性投入，判断能不能接单要用「这个客户能不能把模具摊平」，"
      + "而不是按全厂寿命摊销出来的好看数字。本例按寿命摊是 " + money(perLife) + " 元/件，看着很有赚头；"
      + "按这个客户的实际订单量摊是 " + money(perQ) + " 元/件，压价到 " + fmt(disc, 0) + " 元后每件只剩 "
      + money(disc - vc - perQ) + " 元。真正的底线是保本批量 " + fmt(Math.ceil(min1), 0) + " 件——达不到这个量，"
      + "这单越做越亏。另外模具的所有权、改模费用、客户跑单后模具怎么处理，都要落在合同里。";
  }

  /* ===== 阶梯返利 ===== */
  function calcRebate() {
    var base = Math.max(0, num($("reb-base"), 0));
    var gm = Math.min(1, Math.max(0, num($("reb-gm"), 0) / 100));
    var tiers = [
      { t: Math.max(0, num($("reb-t1"), 0)), p: Math.max(0, num($("reb-p1"), 0)) / 100 },
      { t: Math.max(0, num($("reb-t2"), 0)), p: Math.max(0, num($("reb-p2"), 0)) / 100 },
      { t: Math.max(0, num($("reb-t3"), 0)), p: Math.max(0, num($("reb-p3"), 0)) / 100 }
    ];
    tiers.sort(function (x, y) { return x.t - y.t; });

    function rateOf(s) {
      var r = 0;
      for (var i = 0; i < tiers.length; i++) if (s >= tiers[i].t) r = tiers[i].p;
      return r;
    }
    var r0 = rateOf(base);
    var net0 = base * gm - base * r0;
    var curName = r0 > 0 ? "已达 " + pct(r0, 1) + " 档" : "未达任何档位（无返利）";

    $("reb-cur").textContent = curName;
    $("reb-now").textContent = fmt(base * r0, 2) + " 万 / " + fmt(net0, 2) + " 万元";
    $("reb-rate").textContent = pct(1 - r0, 2) + "（返点即让价）";

    var html = "", best = null;
    for (var i = 0; i < tiers.length; i++) {
      var t = tiers[i].t, p = tiers[i].p;
      var reb = t * p, net = t * gm - reb, delta = net - net0;
      var crit = gm > p ? net0 / (gm - p) : Infinity;
      var need = t - base;
      var tag;
      if (base >= t) tag = "已达成";
      else if (delta > 0) tag = "冲";
      else tag = "不划算";
      if (base < t && delta > 0 && (!best || delta > best.delta)) best = { t: t, p: p, delta: delta, net: net, need: need, crit: crit };
      html += "<tr" + (tag === "冲" ? ' class="c-info"' : (tag === "不划算" ? ' class="c-warn"' : '')) + "><td>"
        + fmt(t, 0) + " 万 / " + pct(p, 1) + "</td><td>" + fmt(reb, 2) + "</td><td>" + fmt(net, 2) + "</td><td>"
        + (delta >= 0 ? "+" : "") + fmt(delta, 2) + "</td><td>" + (isFinite(crit) ? fmt(crit, 2) : "无法达成")
        + "</td><td class=\"tal\">" + tag + "</td></tr>";
    }
    $("reb-body").innerHTML = html;

    if (best) {
      $("reb-big").textContent = fmt(best.delta, 2);
      $("reb-pick").textContent = fmt(best.t, 0) + " 万 / " + pct(best.p, 1) + " 档（净毛利 " + fmt(best.net, 2) + " 万）";
      $("reb-crit").textContent = isFinite(best.crit) ? fmt(best.crit, 2) + " 万元（相当于只需比现在多卖 "
        + fmt(best.crit - base, 2) + " 万）" : "该档返点高于毛利率，越卖越亏";
      $("reb-advice").textContent = best.crit <= best.t
        ? "只要真能冲到 " + fmt(best.t, 0) + " 万就划算（临界点 " + fmt(best.crit, 2) + " 万低于门槛），可以把返点当促销工具用"
        : "必须先过临界点 " + fmt(best.crit, 2) + " 万才不亏，冲不到门槛还不如不冲";
    } else {
      $("reb-big").textContent = base * (1 - r0) > 0 ? "0.00" : "—";
      $("reb-pick").textContent = base >= tiers[tiers.length - 1].t ? "已在最高档，再冲没有增量" : "没有值得冲的档位";
      $("reb-crit").textContent = "—";
      $("reb-advice").textContent = "现有档位跳升幅度过大（返点接近甚至超过毛利率），建议把门槛做得更密、跳升更缓";
    }

    $("reb-note").textContent = "阶梯返利的坑在「全额返」：跨过门槛那一刻，前面已经卖掉的量也一起降价，所以不是「多卖 50 万只让 50 万」，"
      + "而是全年的销售额都按新档返。判断标准是「净毛利增量为正」——边际贡献（增量销售 × 毛利率）要大于返利增量。"
      + "本例从 " + fmt(base, 0) + " 万冲到下一档，临界点 " + (best && isFinite(best.crit) ? fmt(best.crit, 2) : "—")
      + " 万；也就是说跨档的代价固定，销量越接近门槛越危险。返利还要注意：开票与返利的税务处理（销售折让需红字发票）、"
      + "跨年返利的预提、以及客户为了拿返点年底压货次年退货。";
  }

  /* ===== 标准成本三差异 ===== */
  function calcStdCost() {
    var q = Math.max(0, num($("sc-q"), 0));
    var mqS = Math.max(0, num($("sc-mq"), 0)), mpS = Math.max(0, num($("sc-mp"), 0));
    var mqA = Math.max(0, num($("sc-maq"), 0)), mpA = Math.max(0, num($("sc-map"), 0));
    var lhS = Math.max(0, num($("sc-lh"), 0)), lrS = Math.max(0, num($("sc-lr"), 0));
    var lhA = Math.max(0, num($("sc-lah"), 0)), lrA = Math.max(0, num($("sc-lar"), 0));
    var vr = Math.max(0, num($("sc-vr"), 0));
    var va = Math.max(0, num($("sc-va"), 0));
    var fb = Math.max(0, num($("sc-fb"), 0)), fa = Math.max(0, num($("sc-fa"), 0));

    var mV = (mpA - mpS) * mqA, mQ = (mqA - mqS * q) * mpS;
    var lV = (lrA - lrS) * lhA, lQ = (lhA - lhS * q) * lrS;
    var vRate = lhA > 0 ? va / lhA : 0;
    var vV = (vRate - vr) * lhA, vQ = (lhA - lhS * q) * vr;
    var fV = fa - fb, fQ = 0;
    var total = mV + mQ + lV + lQ + vV + vQ + fV + fQ;

    var stdCost = q * (mqS * mpS + lhS * lrS + lhS * vr) + fb;
    $("sc-big").textContent = (total >= 0 ? "超支 " : "节约 ") + fmt(Math.abs(total), 2);
    $("sc-mat").textContent = money(mV) + " / " + money(mQ);
    $("sc-lab").textContent = money(lV) + " / " + money(lQ);
    $("sc-voh").textContent = money(vV) + " / " + money(vQ) + "（实际分配率 " + fmt(vRate, 2) + "）";
    $("sc-foh").textContent = money(fV) + " / " + money(fQ) + "（按产量＝正常产能计）";
    $("sc-dir").textContent = total >= 0 ? "不利差异（实际高于标准）" : "有利差异（实际低于标准）";

    var pairs = [["材料", mV, "价差：采购部（买贵了）"], ["材料", mQ, "量差：生产部（用多了/废品）"],
      ["人工", lV, "工资率差：人事/排班（工资涨、加班多）"], ["人工", lQ, "效率差：生产部（工时超了）"],
      ["变动制费", vV, "耗费差：车间（水电耗材涨）"], ["变动制费", vQ, "效率差：跟工时走"],
      ["固定制费", fV, "预算差：车间费用控制"], ["固定制费", fQ, "产量差：产能利用"]];
    var worst = 0, worstName = "";
    for (var i = 0; i < pairs.length; i++) if (pairs[i][1] > worst) { worst = pairs[i][1]; worstName = pairs[i][0] + pairs[i][2]; }
    $("sc-owner").textContent = worst > 0 ? worstName + "（" + money(worst) + "，最大头）" : "各项均在标准内";
    $("sc-ratio").textContent = stdCost > 0 ? pct(total / stdCost, 2) + "（标准成本 " + money(stdCost) + " 元）" : "—";

    var html = "";
    var rows = [["材料价差", mV, "价格"], ["材料量差", mQ, "用量"], ["人工工资率差", lV, "价格"],
      ["人工效率差", lQ, "用量"], ["变动制费耗费差", vV, "价格"], ["变动制费效率差", vQ, "用量"],
      ["固定制费耗费差", fV, "预算"], ["固定制费产量差", fQ, "产能"]];
    for (var j = 0; j < rows.length; j++) {
      html += "<tr" + (rows[j][1] > 0 ? ' class="c-warn"' : '') + "><td class=\"tal\">" + rows[j][0] + "</td><td>"
        + (rows[j][1] >= 0 ? "+" : "") + fmt(rows[j][1], 2) + "</td><td class=\"tal\">" + rows[j][2] + "</td></tr>";
    }
    html += "<tr class=\"c-info\"><td class=\"tal\">合计</td><td>" + (total >= 0 ? "+" : "") + fmt(total, 2) + "</td><td class=\"tal\">—</td></tr>";
    $("sc-body").innerHTML = html;

    $("sc-note").textContent = "三差异法的关键是「价差用实际量、量差用标准价」，这样价、量两段加起来恰好等于总差异，不会重复计算。"
      + "分完差异还要能追到人：价差归采购（涨价、急单空运），量差归生产（废品、工艺），工资率差归人事与排班，"
      + "固定制费的产量差归销售没接够单。提醒一句：标准成本要定期修订，标准长期不动会变成「历史平均数」，"
      + "差异里混着标准过时和真浪费，就失去管理意义；另外超支不一定全是坏事——赶工、加急往往换来更多订单。";
  }

  /* ===== 安全库存与服务水平 ===== */
  function calcSvc() {
    var d = Math.max(0, num($("svc-d"), 0));
    var sd = Math.max(0, num($("svc-sd"), 0));
    var lt = Math.max(0, num($("svc-lt"), 0));
    var sl = Math.min(0.999, Math.max(0.5, num($("svc-sl"), 95) / 100));
    var ann = Math.max(1, num($("svc-ann"), 1));
    var lot = Math.max(1, num($("svc-lot"), 1));
    var hold = Math.max(0, num($("svc-hold"), 0));
    var outc = Math.max(0, num($("svc-out"), 0));

    var sig = sd * Math.sqrt(lt);
    var orders = ann / lot;
    var z = zOf(sl);
    var ss = z * sig;
    var rop = d * lt + ss;

    function cost(p) {
      var zz = zOf(p), s2 = zz * sig;
      var hc = s2 * hold;
      var oc = orders * (1 - p) * outc;
      return { ss: s2, hc: hc, oc: oc, tot: hc + oc, z: zz };
    }
    var now = cost(sl);
    var hc = now.hc, oc = now.oc;

    $("svc-big").textContent = fmt(ss, 0);
    $("svc-z").textContent = fmt(z, 4) + "（对应 " + pct(sl, 1) + " 服务水平）";
    $("svc-ltd").textContent = fmt(d * lt, 0) + " 件 / " + fmt(sig, 2) + " 件";
    $("svc-rop").textContent = fmt(rop, 0) + " 件";
    $("svc-cost").textContent = money(hc) + " / " + money(oc) + " 元";
    $("svc-total").textContent = money(hc + oc) + " 元（年订货 " + fmt(orders, 1) + " 次）";

    var best = null, html = "";
    for (var p = 0.70; p <= 0.995; p += 0.005) {
      var c = cost(p);
      if (!best || c.tot < best.tot) { best = c; best.p = p; }
    }
    $("svc-best").textContent = pct(best.p, 1) + "（年总成本 " + money(best.tot) + " 元，安全库存 " + fmt(best.ss, 0) + " 件）";

    var up = cost(0.99);
    $("svc-up").textContent = "安全库存 +" + fmt(up.ss - ss, 0) + " 件（+" + pct(ss > 0 ? (up.ss / ss - 1) : 0, 1)
      + "），年成本 " + money(up.tot - now.tot) + " 元";

    var show = [0.80, 0.90, 0.95, 0.98, 0.99], mins = 1e18;
    var data = [];
    for (var i = 0; i < show.length; i++) {
      var c2 = cost(show[i]);
      data.push([show[i], c2]);
      if (c2.tot < mins) mins = c2.tot;
    }
    for (var k = 0; k < data.length; k++) {
      var pp = data[k][0], cc = data[k][1];
      html += "<tr" + (Math.abs(cc.tot - mins) < 1e-6 ? ' class="c-info"' : '') + "><td>" + pct(pp, 0)
        + "</td><td>" + fmt(cc.ss, 0) + "</td><td>" + fmt(d * lt + cc.ss, 0) + "</td><td>" + money(cc.hc)
        + "</td><td>" + money(cc.oc) + "</td><td>" + money(cc.tot) + "</td></tr>";
    }
    $("svc-body").innerHTML = html;

    $("svc-note").textContent = "安全库存＝z × 提前期内需求标准差，注意是「√提前期」放大日波动，不是把日标准差乘天数。"
      + "服务水平不是越高越好，一边是多备货的持有成本、一边是缺货的损失，本例最省的是 " + pct(best.p, 1)
      + " 左右。缺货代价高的品类（停线、罚款、客户流失）就该往上走；"
      + "反过来，需求稳定、能当天补货的东西，安全库存可以压到很低。"
      + "还有两个前提要满足：提前期本身要稳定（不然要另加一层缓冲），以及库存记录准确——账实不符时再高的服务水平也是假的。";
  }

  /* ===== 企业所得税汇算调整 ===== */
  function calcTaxAdj() {
    var rev = Math.max(0, num($("txj-rev"), 0));
    var profit = num($("txj-profit"), 0);
    var ent = Math.max(0, num($("txj-ent"), 0));
    var ad = Math.max(0, num($("txj-ad"), 0));
    var fine = Math.max(0, num($("txj-fine"), 0));
    var don = Math.max(0, num($("txj-don"), 0));
    var rd = Math.max(0, num($("txj-rd"), 0));
    var rdr = Math.max(0, num($("txj-rdr"), 0)) / 100;
    var pre = Math.max(0, num($("txj-pre"), 0));

    var entLim = Math.min(ent * 0.6, rev * 0.005);
    var entAdj = Math.max(0, ent - entLim);
    var adLim = rev * 0.15;
    var adAdj = Math.max(0, ad - adLim);
    var donLim = Math.max(0, profit) * 0.12;
    var donAdj = Math.max(0, don - donLim);
    var rdAdd = rd * rdr;

    var taxable = profit + entAdj + adAdj + fine + donAdj - rdAdd;
    var tax = taxable * 0.25;
    var due = tax - pre;

    $("txj-big").textContent = fmt(taxable, 2);
    $("txj-entv").textContent = fmt(entLim, 2) + " / +" + fmt(entAdj, 2) + " 万元";
    $("txj-adv").textContent = fmt(adLim, 2) + " / +" + fmt(adAdj, 2) + " 万元" + (adAdj > 0 ? "（超支可结转以后年度）" : "");
    $("txj-donv").textContent = fmt(donLim, 2) + " / +" + fmt(donAdj, 2) + " 万元";
    $("txj-finev").textContent = "+" + fmt(fine, 2) + " 万元（全额调增）";
    $("txj-rdv").textContent = "-" + fmt(rdAdd, 2) + " 万元（" + pct(rdr, 0) + " 加计）";
    $("txj-tax").textContent = fmt(tax, 2) + " / " + fmt(pre, 2) + " 万元";
    $("txj-due").textContent = (due >= 0 ? "补缴 " : "可退 ") + fmt(Math.abs(due), 2) + " 万元";
    $("txj-rate").textContent = rev > 0 ? pct(tax / rev, 2) + "（所得税 ÷ 收入）" : "—";

    var rows = [
      ["会计利润总额", profit, "起点"],
      ["业务招待费超限", entAdj, entAdj > 0 ? "调增" : "无调整"],
      ["广告宣传费超限", adAdj, adAdj > 0 ? "调增（可结转）" : "无调整"],
      ["罚款、滞纳金、赞助", fine, "调增（永久性）"],
      ["公益性捐赠超限", donAdj, donAdj > 0 ? "调增" : "无调整"],
      ["研发费用加计扣除", -rdAdd, "调减"],
      ["应纳税所得额", taxable, "×25% = " + fmt(tax, 2) + " 万元"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      var cls = (i === 0 || i === 6) ? ' class="c-info"' : (rows[i][1] !== 0 ? ' class="c-warn"' : "");
      html += "<tr" + cls + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + (rows[i][1] > 0 && i > 0 && i < 6 ? "+" : "") + fmt(rows[i][1], 2) + "</td><td class=\"tal\">" + rows[i][2] + "</td></tr>";
    }
    $("txj-body").innerHTML = html;

    $("txj-note").textContent = "汇算就是把会计利润按税法重算一遍，方向只有两个：不让扣的调增（罚款、超限招待、超标捐赠），让多扣的调减（研发加计、加速折旧）。"
      + "招待费永远只有 60% 能扣且不超过收入 5‰，是典型的「吃一半扔一半」；广告费超了别慌，可以结转以后年度；"
      + "捐赠要区分公益性（有资格票据、限 12%）与非公益性（一分不能扣）。本例会计利润 " + fmt(profit, 2) + " 万元，"
      + "调整后应纳税所得额 " + fmt(taxable, 2) + " 万元，应交 " + fmt(tax, 2) + " 万元。";
  }

  /* ===== 供应商集中度 ===== */
  function calcSupplier() {
    var tot = Math.max(1, num($("spl-tot"), 1));
    var t = [num($("spl-t1"), 0), num($("spl-t2"), 0), num($("spl-t3"), 0), num($("spl-t4"), 0), num($("spl-t5"), 0)];
    var days = Math.max(0, num($("spl-days"), 0));
    var loss = Math.max(0, num($("spl-loss"), 0));

    var sum = 0, hhi = 0, i, html = "", cum = 0;
    for (i = 0; i < 5; i++) { sum += Math.max(0, t[i]); }
    for (i = 0; i < 5; i++) {
      var v = Math.max(0, t[i]), share = v / tot;
      hhi += share * share;
      cum += share;
      html += "<tr><td class=\"tal\">第" + (i + 1) + "大</td><td>" + fmt(v, 0) + "</td><td>" + pct(share, 2) + "</td><td>" + pct(cum, 2) + "</td></tr>";
    }
    $("spl-body").innerHTML = html;

    var top5 = sum / tot;
    var top1 = Math.max(0, t[0]) / tot;
    var hhi10000 = hhi * 10000;
    var level = hhi10000 < 1000 ? "低集中（分散，议价力在你手上）"
      : hhi10000 < 1800 ? "中度集中（可接受，需备选）"
      : hhi10000 < 3000 ? "较高集中（单点风险，必须做备选）" : "高度集中（断供即停线）";
    var gap = Math.max(0, t[0]) * days / 365;
    var stopDays = days;
    var cost = stopDays * loss;

    $("spl-big").textContent = pct(top5, 1).replace('%', '');
    $("spl-top1").textContent = pct(top1, 2) + (top1 > 0.25 ? "（超过 25%，预警）" : "（在常见 25% 以内）");
    $("spl-sum").textContent = fmt(sum, 2) + " 万元";
    $("spl-hhi").textContent = fmt(hhi10000, 0) + "（0–10000，份额平方和）";
    $("spl-level").textContent = level;
    $("spl-gap").textContent = fmt(gap, 2) + " 万元（" + fmt(days, 0) + " 天）";
    $("spl-cost").textContent = fmt(cost, 2) + " 万元";
    $("spl-advice").textContent = top1 > 0.25 ? "第一大占比过高：先找第二货源做小批量验证，别等断供才找"
      : (top5 > 0.7 ? "前五家占比高但分散：谈年度框架价，锁量不锁价" : "结构健康，维持现有询价机制");

    $("spl-note").textContent = "集中度不是越低越好：供应商太分散，单家量小拿不到价、质量与交期还难管。要看的是「断供能不能扛住」——"
      + "第一大占比超 25% 就该有第二货源，超 40% 属于单点致命。真正要准备的三个动作：关键料号的替代料认证、"
      + "安全库存覆盖切换周期（本例 " + fmt(days, 0) + " 天）、合同里的断供应急条款与模具/图纸归属。"
      + "另外别忘了「反向集中」——如果这家也占它产能的大头，你反而有议价权。";
  }

  /* ===== 关联方利息扣除限额 ===== */
  function calcDebtCap() {
    var loan = Math.max(0, num($("dtc-loan"), 0));
    var eq = Math.max(0, num($("dtc-eq"), 0));
    var rate = Math.max(0, num($("dtc-rate"), 0)) / 100;
    var bank = Math.max(0, num($("dtc-bank"), 0)) / 100;
    var mult = Math.max(1, num($("dtc-mult"), 2));

    var paid = loan * rate;
    var lim = eq * mult;
    var rateCap = Math.min(rate, bank);
    var byRate = loan * rateCap;
    var byMult = Math.min(loan, lim) * rateCap;
    var ded = byMult;
    var notDed = paid - ded;
    var tax = notDed * 0.25;

    $("dtc-big").textContent = fmt(notDed, 2);
    $("dtc-ratio").textContent = eq > 0 ? fmt(loan / eq, 2) + " : 1（上限 " + fmt(mult, 1) + " : 1）" : "—";
    $("dtc-lim").textContent = fmt(lim, 2) + " 万元（权益 " + fmt(eq, 2) + " × " + fmt(mult, 1) + "）";
    $("dtc-paid").textContent = fmt(paid, 2) + " 万元";
    $("dtc-ratecap").textContent = fmt(byRate, 2) + " 万元（按 " + pct(rateCap, 2) + "）";
    $("dtc-multcap").textContent = fmt(byMult, 2) + " 万元";
    $("dtc-final").textContent = fmt(ded, 2) + " / " + fmt(notDed, 2) + " 万元";
    $("dtc-tax").textContent = fmt(tax, 2) + " 万元";
    $("dtc-advice").textContent = loan > lim
      ? "超出 " + fmt(loan - lim, 2) + " 万元：增资、改股权融资或走银行委贷压低关联借款"
      : (rate > bank ? "利率偏高：降到金融企业同期同类水平以内" : "两道关都过，可全额扣除");

    $("dtc-note").textContent = "税务局查关联方借款是两道关，先看利率（不高于金融企业同期同类贷款利率），再看债资比（非金融企业 2:1、金融 5:1，"
      + "按年度各月平均借款余额 ÷ 各月平均权益性投资）。两道都过才全额扣；超限部分不仅不能扣，还要按 25% 补税。"
      + "实务上常被忽略的三点：一是权益性投资不是实收资本，是所有者权益（含资本公积、留存收益）；"
      + "二是集团内统借统还、委托贷款也可能被认定为关联债权；三是同期资料与独立交易原则要能自证，否则可能被核定调整。";
  }

  /* ===== 设备一次性扣除税会差异 ===== */
  function calcAccDep() {
    var cost = Math.max(0, num($("adp-cost"), 0));
    var life = Math.max(1, num($("adp-life"), 1));
    var salv = Math.min(1, Math.max(0, num($("adp-salv"), 0) / 100));
    var taxR = Math.min(1, Math.max(0, num($("adp-tax"), 0) / 100));
    var disc = Math.max(0, num($("adp-disc"), 0)) / 100;

    var acc = cost * (1 - salv) / life;
    var firstDiff = cost - acc;
    var save = firstDiff * taxR;
    var laterPay = acc * taxR;
    var n = life - 1;
    var pv = 0, i;
    for (i = 1; i <= n; i++) { pv += laterPay / Math.pow(1 + disc, i); }
    var net = save - pv;
    var yieldPct = save > 0 ? (net / save) * 100 : 0;

    $("adp-big").textContent = fmt(save, 2);
    $("adp-acc").textContent = fmt(acc, 2) + " 万元/年（" + fmt(life, 0) + " 年，残值 " + pct(salv, 1) + "）";
    $("adp-taxdep").textContent = fmt(cost, 2) + " 万元（一次性全额扣除）";
    $("adp-diff").textContent = "-" + fmt(firstDiff, 2) + " 万元（当年纳税调减）";
    $("adp-later").textContent = fmt(acc, 2) + " / " + fmt(laterPay, 2) + " 万元 × " + fmt(n, 0) + " 年";
    $("adp-pv").textContent = fmt(pv, 2) + " 万元（按 " + pct(disc, 1) + " 折现）";
    $("adp-net").textContent = fmt(net, 2) + " 万元";
    $("adp-yield").textContent = fmt(yieldPct, 1) + "%（占递延税款的比例）";
    $("adp-advice").textContent = net > 0 ? "能用就用：等于向税局拿了一笔无息贷款" : "折现率太高或年限太短，收益有限";

    var html = "<tr><td class=\"tal\">第 1 年</td><td>" + fmt(acc, 2) + "</td><td>" + fmt(cost, 2) + "</td><td class=\"tal\">调减 " + fmt(firstDiff, 2) + "</td></tr>";
    for (i = 2; i <= life; i++) {
      html += "<tr><td class=\"tal\">第 " + i + " 年</td><td>" + fmt(acc, 2) + "</td><td>" + fmt(acc, 2) + "</td><td class=\"tal\">调增 " + fmt(acc, 2) + "</td></tr>";
    }
    $("adp-body").innerHTML = html;

    $("adp-note").textContent = "这是时间性差异，不是永久性优惠：一次性扣除只是把扣除提前，整个周期交的税一分不差。"
      + "它的价值在于「钱的时间价值」——当年少交 " + fmt(save, 2) + " 万元，以后 " + fmt(n, 0) + " 年逐年还回去，"
      + "折现后净赚 " + fmt(net, 2) + " 万元。所以：企业当年有利润、缺现金，就尽量用；连续亏损、本来就不交税，用了反而浪费额度。"
      + "会计上仍按年限折旧，形成「递延所得税负债」，报表要如实反映。"
      + "注意政策资格（行业限制、单位价值标准、购入时点）各地口径有差异，按当年文件执行。";
  }

  /* ===== 客户级盈利 ===== */
  function calcCustWin() {
    var cost = Math.max(0, num($("cwin-cost"), 0)) / 100;
    var cs = [
      { n: "A 客户", r: num($("cwin-ra"), 0), d: num($("cwin-da"), 0) / 100, b: num($("cwin-ba"), 0) / 100,
        f: num($("cwin-fa"), 0), s: num($("cwin-sa"), 0), t: num($("cwin-ta"), 0), g: num($("cwin-ga"), 0) / 100 },
      { n: "B 客户", r: num($("cwin-rb"), 0), d: num($("cwin-db"), 0) / 100, b: num($("cwin-bb"), 0) / 100,
        f: num($("cwin-fb"), 0), s: num($("cwin-sb"), 0), t: num($("cwin-tb"), 0), g: num($("cwin-gb"), 0) / 100 },
      { n: "C 客户", r: num($("cwin-rc"), 0), d: num($("cwin-dc"), 0) / 100, b: num($("cwin-bc"), 0) / 100,
        f: num($("cwin-fc"), 0), s: num($("cwin-sc"), 0), t: num($("cwin-tc"), 0), g: num($("cwin-gc"), 0) / 100 }
    ];
    var revT = 0, netT = 0, cutT = 0, occT = 0, html = "", i;
    for (i = 0; i < 3; i++) {
      var c = cs[i];
      c.gp = c.r * c.g;
      c.cut = c.r * c.d + c.r * c.b;
      c.fx = c.f + c.s;
      c.occ = c.r * c.t / 365 * cost;
      c.net = c.gp - c.cut - c.fx - c.occ;
      c.margin = c.r > 0 ? c.net / c.r : 0;
      revT += c.r; netT += c.net; cutT += c.cut; occT += c.occ;
    }
    var bi = 0, wi = 0;
    for (i = 1; i < 3; i++) { if (cs[i].net > cs[bi].net) bi = i; if (cs[i].net < cs[wi].net) wi = i; }

    for (i = 0; i < 3; i++) {
      var x = cs[i];
      html += "<tr" + (x.net < 0 ? ' class="c-bad"' : (i === bi ? ' class="c-info"' : "")) + "><td class=\"tal\">" + x.n
        + "</td><td>" + fmt(x.gp, 2) + "</td><td>" + fmt(x.cut, 2) + "</td><td>" + fmt(x.fx, 2) + "</td><td>"
        + fmt(x.occ, 2) + "</td><td>" + fmt(x.net, 2) + "</td><td>" + pct(x.margin, 1) + "</td></tr>";
    }
    $("cwin-body").innerHTML = html;

    $("cwin-big").textContent = fmt(cs[wi].net, 2);
    $("cwin-rank").textContent = cs[bi].n + " 净利率 " + pct(cs[bi].margin, 1) + " / " + cs[wi].n + " 净利率 " + pct(cs[wi].margin, 1);
    $("cwin-total").textContent = fmt(netT, 2) + " 万元";
    $("cwin-mix").textContent = fmt(revT, 2) + " 万元 / " + pct(revT > 0 ? netT / revT : 0, 2);
    $("cwin-cuts").textContent = fmt(cutT, 2) + " 万元（占收入 " + pct(revT > 0 ? cutT / revT : 0, 2) + "）";
    $("cwin-occ").textContent = fmt(occT, 2) + " 万元";
    $("cwin-worst").textContent = cs[wi].n + "：账期 " + fmt(cs[wi].t, 0) + " 天，占用 " + fmt(cs[wi].occ, 2) + " 万元";
    $("cwin-advice").textContent = cs[wi].net < 0
      ? "把 " + cs[wi].n + " 的折扣/返利收回来或缩账期，否则卖得越多亏得越多"
      : "整体健康，重点保住 " + cs[bi].n + " 这类高净利客户的份额";

    $("cwin-note").textContent = "毛利率是「谈价之前」的数字。客户要的折扣、年终返利、包邮运费、专属客服与技术支持、账期占用的利息，"
      + "全都从那点毛利里再扣一遍——本例三家的毛利率都是 25%–30%，但净贡献从 " + pct(cs[wi].margin, 1) + " 到 "
      + pct(cs[bi].margin, 1) + "。先用这张表把客户排个序，再决定「涨价、砍服务、缩账期、还是放弃」。"
      + "另外注意：收入占比大的客户不一定是赚钱的客户，最该谈条件的是净贡献最低那位。";
  }

  /* ===== 设备换新 ===== */
  function calcUpgrade() {
    var r = Math.max(0.0001, num($("upg-rate"), 8) / 100);
    var orun = num($("upg-oldrun"), 0), omt = num($("upg-oldmt"), 0);
    var osale = num($("upg-oldsale"), 0), olife = Math.max(1, num($("upg-oldlife"), 1)), osalv = num($("upg-oldsalv"), 0);
    var ninv = num($("upg-newinv"), 0), nrun = num($("upg-newrun"), 0), nmt = num($("upg-newmt"), 0);
    var nlife = Math.max(1, num($("upg-newlife"), 1)), nsalv = num($("upg-newsalv"), 0);

    function af(n) { return (1 - Math.pow(1 + r, -n)) / r; }
    var pfO = osalv / Math.pow(1 + r, olife);
    var pfN = nsalv / Math.pow(1 + r, nlife);
    var pvO = osale + (orun + omt) * af(olife) - pfO;
    var pvN = ninv + (nrun + nmt) * af(nlife) - pfN;
    var eacO = pvO / af(olife), eacN = pvN / af(nlife);
    var save = eacO - eacN;
    var maxInv = (eacO * af(nlife) - (nrun + nmt) * af(nlife) + pfN);

    $("upg-big").textContent = fmt(save, 2);
    $("upg-old").textContent = fmt(pvO, 2) + " / " + fmt(eacO, 2) + " 万元";
    $("upg-new").textContent = fmt(pvN, 2) + " / " + fmt(eacN, 2) + " 万元";
    $("upg-verdict").textContent = save > 0 ? "换新更省，每年省 " + fmt(save, 2) + " 万元" : "先别换：旧机年化成本更低 " + fmt(-save, 2) + " 万元";
    $("upg-maxinv").textContent = fmt(maxInv, 2) + " 万元（新机投资超过这个数就不划算）";
    $("upg-energy").textContent = fmt(nrun * 0.1, 2) + " 万元/年，" + fmt(nlife, 0) + " 年折现 " + fmt(nrun * 0.1 * af(nlife), 2) + " 万元";

    // 旧机拖一年再换的代价：少省一年 + 处置价再跌两成
    $("upg-delay").textContent = "少省 " + fmt(Math.max(0, save), 2) + " 万元，且旧机处置价通常再跌 " + fmt(osale * 0.2, 2) + " 万元";

    var rows = [
      ["年运行 + 维修成本", fmt(orun + omt, 2) + " 万元", fmt(nrun + nmt, 2) + " 万元"],
      ["设备投入 / 放弃的处置款", fmt(osale, 2) + " 万元", fmt(ninv, 2) + " 万元"],
      ["寿命末残值", fmt(osalv, 2) + " 万元 / " + fmt(olife, 0) + " 年", fmt(nsalv, 2) + " 万元 / " + fmt(nlife, 0) + " 年"],
      ["全部现金流现值", fmt(pvO, 2) + " 万元", fmt(pvN, 2) + " 万元"],
      ["年化成本（EAC）", fmt(eacO, 2) + " 万元", fmt(eacN, 2) + " 万元"],
      ["结论", save > 0 ? "换新" : "继续用", save > 0 ? "每年省 " + fmt(save, 2) + " 万元" : "旧机更省 " + fmt(-save, 2) + " 万元"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i >= 4 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td></tr>";
    }
    $("upg-body").innerHTML = html;

    $("upg-note").textContent = "寿命不一样的两个方案不能直接比现值，要把现值折成「每年多少钱」（年化成本 EAC）再比。"
      + "旧机现在能卖的钱是机会成本，必须算进去；新机省下的是「运行 + 维修」，而新机投资要摊到更多年。"
      + "实操上还有几笔账别漏：换新期间的停产损失、旧机超期服役的故障与质量风险、新机带来的产能与良率提升、"
      + "以及卖掉旧机的增值税与账面损失能不能税前扣除（资产损失要专项申报）。";
  }

  /* ===== 辅助部门费用分摊 ===== */
  function calcDeptAlloc() {
    var s1 = Math.max(0, num($("da-s1"), 0)), s2 = Math.max(0, num($("da-s2"), 0));
    var p12 = Math.max(0, num($("da-s12"), 0)), a1 = Math.max(0, num($("da-a1"), 0)), b1 = Math.max(0, num($("da-b1"), 0));
    var p21 = Math.max(0, num($("da-s21"), 0)), a2 = Math.max(0, num($("da-a2"), 0)), b2 = Math.max(0, num($("da-b2"), 0));
    var t1 = p12 + a1 + b1, t2 = p21 + a2 + b2;
    if (t1 <= 0) t1 = 1;
    if (t2 <= 0) t2 = 1;
    var n12 = p12 / t1, n1a = a1 / t1, n1b = b1 / t1;
    var n21 = p21 / t2, n2a = a2 / t2, n2b = b2 / t2;
    var prod2 = n2a + n2b; if (prod2 <= 0) prod2 = 1;
    var prod1 = n1a + n1b; if (prod1 <= 0) prod1 = 1;

    // 直接法：辅助部门之间不算，各自全部按生产比例分
    var dA = s1 * (n1a / prod1) + s2 * (n2a / prod2);
    var dB = s1 * (n1b / prod1) + s2 * (n2b / prod2);

    // 阶梯法：维修先分（给动力的并进去），动力再全部分给生产
    var s2b = s2 + s1 * n12;
    var sA = s1 * n1a + s2b * (n2a / prod2);
    var sB = s1 * n1b + s2b * (n2b / prod2);

    // 交互分配法：x1 = s1 + n21*x2, x2 = s2 + n12*x1
    var den = 1 - n12 * n21;
    var x1 = den > 1e-9 ? (s1 + n21 * s2) / den : s1;
    var x2 = den > 1e-9 ? (s2 + n12 * s1) / den : s2;
    var rA = x1 * n1a + x2 * n2a;
    var rB = x1 * n1b + x2 * n2b;

    var big = Math.max(Math.abs(dA - rA), Math.abs(sA - rA));
    $("da-big").textContent = fmt(big, 2);
    $("da-d").textContent = fmt(dA, 2) + " / " + fmt(dB, 2) + " 万元";
    $("da-s").textContent = fmt(sA, 2) + " / " + fmt(sB, 2) + " 万元";
    $("da-r").textContent = fmt(rA, 2) + " / " + fmt(rB, 2) + " 万元";
    $("da-true").textContent = "维修 " + fmt(x1, 2) + " / 动力 " + fmt(x2, 2) + " 万元（含互相转入）";
    $("da-sum").textContent = "都该等于 " + fmt(s1 + s2, 2) + " 万元："
      + fmt(dA + dB, 2) + " / " + fmt(sA + sB, 2) + " / " + fmt(rA + rB, 2);
    $("da-pick").textContent = big < 0.3 ? "差异很小，用直接法最省事，审计也认"
      : "互相服务占比高，A 车间差 " + fmt(big, 2) + " 万元，建议用交互分配法";

    var rows = [["直接法（不互分）", dA, dB, dA - rA], ["阶梯法（维修先分）", sA, sB, sA - rA], ["交互分配法（互相分）", rA, rB, 0]];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 2 ? ' class="c-info"' : "") + "><td class='tal'>" + rows[i][0] + "</td><td>" + fmt(rows[i][1], 2)
        + "</td><td>" + fmt(rows[i][2], 2) + "</td><td>" + (rows[i][3] >= 0 ? "+" : "") + fmt(rows[i][3], 2) + "</td></tr>";
    }
    $("da-body").innerHTML = html;

    $("da-note").textContent = "三种方法分出去的总钱数完全一样（都是 " + fmt(s1 + s2, 2) + " 万元），区别只在 A、B 之间怎么分。"
      + "直接法最省事，但把辅助部门互相提供的服务当作不存在——服务量大的车间会白占便宜；"
      + "阶梯法按「先分谁」的顺序分，先分的部门不吃亏、后分的不认账，顺序本身带主观；"
      + "交互分配法先解出各部门真实总成本（维修实际 " + fmt(x1, 2) + "、动力实际 " + fmt(x2, 2) + " 万元），再往生产分，最准。"
      + "选择标准：互相服务占比很小（本例维修给动力 " + pct(n12, 0) + "、动力给维修 " + pct(n21, 0) + "）就先别折腾；"
      + "占比大且两车间成本结构差异大时，分摊方法会直接改变产品报价和部门考核结果。";
  }

  /* ===== 股东回报与分红 ===== */
  function calcPayout() {
    var ret = num($("po-ret"), 0), npf = num($("po-np"), 0);
    var hold = Math.min(1, Math.max(0, num($("po-share"), 0) / 100));
    var ratio = Math.min(1, Math.max(0, num($("po-ratio"), 0) / 100));
    var tax = Math.min(1, Math.max(0, num($("po-tax"), 0) / 100));
    var roe = Math.max(0, num($("po-roe"), 0) / 100);
    var loan = Math.max(0, num($("po-loan"), 0));

    var div = npf * ratio;
    var dt = div * tax;
    var mine = div * hold, mineNet = mine * (1 - tax);
    var keep = ret + npf - div;
    var keepAll = ret + npf;
    var addProfit = keepAll * roe;
    var indirect = addProfit * hold;
    var indirectNet = indirect * (1 - tax);
    var loanTax = loan * tax;
    var loanLate = loanTax * 0.1825;

    $("po-big").textContent = fmt(mineNet, 2);
    $("po-div").textContent = fmt(div, 2) + " / " + fmt(dt, 2) + " 万元";
    $("po-sharev").textContent = fmt(mine, 2) + " / " + fmt(mineNet, 2) + " 万元";
    $("po-keep").textContent = fmt(keep, 2) + " 万元";
    $("po-nodiv").textContent = fmt(keepAll, 2) + " / " + fmt(addProfit, 2) + " 万元";
    $("po-ind").textContent = fmt(indirectNet, 2) + " 万元（税前 " + fmt(indirect, 2) + "，变现还要再交 " + pct(tax, 0) + "）";
    $("po-risk").textContent = loan > 0
      ? "借款 " + fmt(loan, 2) + " 万元视同分红，补个税 " + fmt(loanTax, 2) + " 万元，滞纳金约 " + fmt(loanLate, 2) + " 万元"
      : "无借款风险";

    var effRate = 1 - 0.75 * (1 - tax);
    $("po-alltax").textContent = "利润先交 25% 企业所得税，" + (ratio > 0 ? "分掉的部分再交 " + pct(tax, 0) + "，综合税负 " + pct(effRate, 2) : "不分红就暂时没有第二个税");

    var rows = [
      ["按 " + pct(ratio, 0) + " 分红", fmt(mineNet, 2) + " 万元", fmt(keep, 2) + " 万元", "当年拿现金，交 20% 个税"],
      ["不分红全留存", "0", fmt(keepAll, 2) + " 万元", "股东间接受益 " + fmt(indirectNet, 2) + " 万元（税后口径）"],
      ["股东借款 " + fmt(loan, 0) + " 万元不还", fmt(loan, 2) + " 万元（借款）", "—", "视同分红，补税 " + fmt(loanTax, 2) + " 万元"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 2 ? ' class="c-warn"' : (i === 0 ? ' class="c-info"' : "")) + "><td class=\"tal\">" + rows[i][0]
        + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td class=\"tal\">" + rows[i][3] + "</td></tr>";
    }
    $("po-body").innerHTML = html;

    $("po-note").textContent = "分红是「两道税」：公司先交 25% 企业所得税，利润分到自然人股东手上再交 20%，合起来 " + pct(effRate, 2)
      + "（不是 45%，因为两道税基数不同）。所以「分还是留」本质是让股东拿现金自己投（税后 80%）还是留在公司按 ROE 再投（"
      + pct(roe, 1) + "，但将来变现还要再交一次）。本例留存的间接价值 " + fmt(indirectNet, 2) + " 万元，高于直接分手的 "
      + fmt(mineNet, 2) + " 万元——前提是公司真能把钱投出这个回报，投不出去（账上趴着买理财）就该分掉。"
      + "红线：股东借款年末未归还且未用于生产经营，按「利息、股息、红利所得」视同分红补 20% 个税并加收滞纳金；"
      + "上市公司持股满 1 年免征、1 个月至 1 年减半，非上市不享受。";
  }

  /* ---------- 金额大写 ---------- */
  function cnUpper(numRaw) {
    var D = "零壹贰叁肆伍陆柒捌玖";
    var U = ["", "拾", "佰", "仟"];
    var B = ["", "万", "亿", "万亿"];
    var cents = Math.round(Math.abs(numRaw) * 100);
    var yuanPart = Math.floor(cents / 100);
    var jiao = Math.floor((cents % 100) / 10);
    var fen = cents % 10;

    function four(n) {
      var s = "";
      var str = String(n);
      var zero = false;
      for (var i = 0; i < str.length; i++) {
        var d = +str.charAt(i);
        var pos = str.length - 1 - i;
        if (d === 0) { zero = true; continue; }
        if (zero && s) s += "零";
        zero = false;
        s += D.charAt(d) + U[pos];
      }
      return s;
    }
    function intCn(n) {
      if (n === 0) return "";
      var groups = [];
      while (n > 0) { groups.push(n % 10000); n = Math.floor(n / 10000); }
      var out = "";
      for (var i = groups.length - 1; i >= 0; i--) {
        var g = groups[i];
        if (g === 0) { if (out) out += "零"; continue; }
        var part = four(g);
        if (out && g < 1000 && out.charAt(out.length - 1) !== "零") out += "零";
        out += part + B[i];
      }
      return out.replace(/零+/g, "零").replace(/零$/, "");
    }

    var body = intCn(yuanPart);
    var s = body ? body + "元" : "";
    if (yuanPart === 0 && jiao === 0 && fen === 0) return "零元整";
    if (jiao === 0 && fen === 0) return s + "整";
    if (fen === 0) return s + D.charAt(jiao) + "角整";
    if (jiao === 0) return s + "零" + D.charAt(fen) + "分";
    return s + D.charAt(jiao) + "角" + D.charAt(fen) + "分";
  }

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

  /* ---------- 账期到期与逾期 ---------- */
  function bizAdd(d, n) {
    var c = 0;
    while (c < n) {
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) c++;
    }
    return d;
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

  /* ---------- 工作日与日期差 ---------- */
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

  /* ---------- 增幅与年化 ---------- */
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

  /* ---------- 尾差分摊 ---------- */
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

  /* ---------- 税后反推税前 ---------- */
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

  var XL_ROWS = [
    ["按条件求和", "=SUMIFS(金额列, 部门列, \"销售部\", 月份列, \">=\"&DATE(2026,1,1))"],
    ["多条件查找", "=XLOOKUP(1,(A:A=姓名)*(B:B=月份),C:C,\"未找到\")"],
    ["左表补齐右表", "=IFNA(VLOOKUP($A2,表2!$A:$D,3,FALSE),\"\")"],
    ["老版本兜底", "=INDEX(表2!C:C,MATCH($A2,表2!A:A,0))"],
    ["去重清单", "=UNIQUE(明细!B2:B1000)"],
    ["排序", "=SORT(明细!A2:D100,4,-1)"],
    ["条件筛选", "=FILTER(明细!A2:D100,明细!D2:D100>10000,\"无\")"],
    ["按分隔符拆列", "=TEXTSPLIT(A2,\"-\")"],
    ["取中间几位", "=MID(A2,7,8)"],
    ["当月最后一天", "=EOMONTH(A2,0)"],
    ["推 N 个工作日", "=WORKDAY(A2,10,节假日!A:A)"],
    ["两个日期差月", "=DATEDIF(A2,B2,\"m\")"],
    ["四舍五入到分", "=ROUND(A2,2)"],
    ["账龄分档", "=LOOKUP(TODAY()-A2,{0,31,91,181,366},{\"未到期\",\"1-30\",\"31-90\",\"91-180\",\"180+\"})"],
    ["累计求和", "=SUM($C$2:C2)"],
    ["分类小计", "=SUMIF($B:$B,$B2,$C:$C)"],
    ["两级下拉", "=INDIRECT(\"字典!\"&$A2)"],
    ["标出重复项", "=COUNTIF($A:$A,$A2)>1"],
    ["LET 少写重复", "=LET(x,SUMIFS(C:C,A:A,A2),IF(x>0,x*0.05,0))"],
    ["透视式汇总", "=GROUPBY(区域,金额,SUM)"],
    ["千分位文本", "=TEXT(A2,\"#,##0.00\")"],
    ["把空值显示为 0", "=IFERROR(N(A2),0)"]
  ];
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

  function parseAmounts(str) {
    var m = String(str || "").replace(/[,，¥$、\s]+/g, " ").match(/-?\d+(?:\.\d+)?/g) || [];
    return m.map(function (x) { return parseFloat(x); }).filter(function (x) { return isFinite(x); });
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

  function calcRateAdj() {
    var oldB = num($("sbr-old"), 0), newB = num($("sbr-new"), 0);
    var pr = num($("sbr-pr"), 0) / 100, cr = num($("sbr-cr"), 0) / 100;
    var mo = Math.max(0, Math.min(12, Math.round(num($("sbr-months"), 6))));
    var wage = num($("sbr-wage"), 0);
    var p0 = oldB * pr, p1 = newB * pr, c0 = oldB * cr, c1 = newB * cr;
    var dp = p1 - p0, dc = c1 - c0, tot = dp + dc;
    $("sbr-big").textContent = fmt(tot, 2);
    $("sbr-p").textContent = money(p0) + " → " + money(p1) + " 元（" + (dp >= 0 ? "+" : "") + money(dp) + "）";
    $("sbr-c").textContent = money(c0) + " → " + money(c1) + " 元（" + (dc >= 0 ? "+" : "") + money(dc) + "）";
    $("sbr-net").textContent = (dp <= 0 ? "多拿 " : "少拿 ") + money(Math.abs(dp)) + " 元 / 月";
    $("sbr-back").textContent = money(tot * mo) + " 元（个人 " + money(dp * mo) + "，单位 " + money(dc * mo) + "）";
    $("sbr-year").textContent = money(tot * 12) + " 元（个人 " + money(dp * 12) + "，单位 " + money(dc * 12) + "）";
    var cap = "未触及填写的基数";
    if (wage > 0 && newB > 0 && newB / wage > 3) cap = "新基数超过工资 3 倍，检查是否填成上限";
    if (newB < oldB) cap = "新基数比旧的低，注意是否漏了补差方向";
    $("sbr-cap").textContent = cap;
    $("sbr-note").textContent = "各地缴费基数按上年度全口径社平工资的 60%–300% 设上下限，工资低于下限按下限缴、高于上限按上限缴，"
      + "所以「按实际工资缴」这句话只在区间内成立。调基后 1 月起的差额通常一次性补缴或退费，"
      + "在职月份才补，年中入职的按入职月算；员工年中离职的，补差仍要结清。"
      + "公积金是另一套上下限和另一套比例，别和社保混算。上面的比例要按当地险种组合填，"
      + "个人一般只有养老 8%、医疗 2%、失业 0.3%–0.5%，单位还含工伤和生育。";
  }

  function calcCreditPolicy() {
    var sales = num($("cpl-sales"), 0), cm = 1 - num($("cpl-vc"), 0) / 100;
    var d1 = num($("cpl-d1"), 0), b1 = num($("cpl-b1"), 0) / 100;
    var d2 = num($("cpl-d2"), 0), b2 = num($("cpl-b2"), 0) / 100;
    var disc = num($("cpl-disc"), 0) / 100, dd = num($("cpl-dd"), 0);
    var take = Math.min(1, Math.max(0, num($("cpl-take"), 0) / 100));
    var k = num($("cpl-cost"), 0) / 100;
    var o1 = sales / 360 * d1, oc1 = o1 * k, bad1 = sales * b1, net1 = sales * cm - oc1 - bad1;
    var avgD = take * dd + (1 - take) * d2;
    var o2 = sales / 360 * avgD, oc2 = o2 * k, dcost = sales * disc * take, bad2 = sales * b2;
    var net2 = sales * cm - dcost - oc2 - bad2, diff = net2 - net1;
    var ann = (d2 - dd) > 0 ? disc / (1 - disc) * 360 / (d2 - dd) : 0;
    $("cpl-big").textContent = fmt(diff, 2);
    $("cpl-o1").textContent = money(o1) + " / " + money(oc1) + " 元";
    $("cpl-n1").textContent = money(bad1) + " / " + money(net1) + " 元";
    $("cpl-ad").textContent = fmt(avgD, 1) + " 天";
    $("cpl-o2").textContent = money(o2) + " / " + money(oc2) + " 元";
    $("cpl-n2").textContent = money(dcost) + " / " + money(bad2) + " 元";
    $("cpl-n3").textContent = money(net2) + " 元";
    $("cpl-ann").textContent = ann > 0 ? pct(ann, 2) : "—";
    var head = diff >= 0 ? "新政策更划算，一年多赚 " + money(diff) + " 元。"
      : "新政策不划算，一年少赚 " + money(-diff) + " 元，除非短账期能带来更多订单。";
    $("cpl-note").textContent = head
      + " 折扣的真实代价要折成年化：" + (ann > 0 ? "放弃折扣等于按 " + pct(ann, 2) + " 年化借钱，" : "")
      + " 比一般流贷贵得多，所以客户几乎都会享受折扣，实际享受比例别按宣传填、按历史数据填。"
      + " 账期缩短省的只是资金占用，坏账率的下降才往往是大头；而折扣成本是硬支出，"
      + " 三者要一起算，只看「账期从 60 天压到 30 天」是假优化。收紧信用还会掉一部分销量，这里按销售收入不变处理。";
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

  function calcInvFund() {
    var cogs = num($("ifw-cogs"), 0);
    var d1 = num($("ifw-d1"), 90), d2 = num($("ifw-d2"), 60);
    var cr = num($("ifw-cost"), 0) / 100, hr = num($("ifw-hold"), 0) / 100;
    var now = cogs / 360 * d1, tgt = cogs / 360 * d2, rel = now - tgt;
    var s1 = rel * cr, s2 = rel * hr, sum = s1 + s2;
    $("ifw-big").textContent = money(rel);
    $("ifw-now").textContent = money(now) + " 元 / " + (d1 > 0 ? (360 / d1).toFixed(2) : "—") + " 次";
    $("ifw-tgt").textContent = money(tgt) + " 元 / " + (d2 > 0 ? (360 / d2).toFixed(2) : "—") + " 次";
    $("ifw-s1").textContent = money(s1) + " 元 / 年";
    $("ifw-s2").textContent = money(s2) + " 元 / 年";
    $("ifw-sum").textContent = money(sum) + " 元 / 年";
    $("ifw-rel").textContent = cogs > 0 ? pct(sum / cogs, 2) : "—";
    $("ifw-note").textContent = (rel >= 0
      ? "压缩 " + fmt(d1 - d2, 0) + " 天，等于把 " + money(rel) + " 元现金从仓库里拿回来，而且不用付利息。"
      : "目标天数比现在还长，会多占用 " + money(-rel) + " 元，这不是优化。")
      + " 周转天数按 360 天口径；存货金额是平均值（期初期末除以二），用期末数会高估波动。"
      + " 真要降库存，先减压最贵的那几类：单价高、专用性强、有保质期的；通用件反而适合多备。"
      + " 注意压库存可能牺牲交付率，缺货损失没算在这笔账里。";
  }

  function calcMachRate() {
    var fixed = num($("mhr-fixed"), 0), cap = num($("mhr-cap"), 0);
    var act = num($("mhr-act"), 0), qty = num($("mhr-qty"), 0);
    var use = cap > 0 ? act / cap : 0;
    var norm = cap > 0 ? fixed / cap : 0;
    var real = act > 0 ? fixed / act : 0;
    var idle = fixed * Math.max(0, 1 - use);
    var gap = real - norm;
    var unitReal = qty > 0 ? fixed / qty : 0;
    var unitNorm = qty > 0 ? fixed * Math.min(1, use) / qty : 0;
    $("mhr-big").textContent = fmt(real, 2);
    $("mhr-use").textContent = pct(use, 1);
    $("mhr-norm").textContent = fmt(norm, 2) + " 元/小时";
    $("mhr-idle").textContent = money(idle) + " 元 / 月（年 " + money(idle * 12) + "）";
    $("mhr-gap").textContent = fmt(gap, 2) + " 元/小时（" + pct(norm > 0 ? gap / norm : 0, 1) + "）";
    $("mhr-unit").textContent = fmt(unitReal - unitNorm, 2) + " 元/件（" + fmt(unitNorm, 2) + " → " + fmt(unitReal, 2) + "）";
    $("mhr-be").textContent = pct(1 - use, 1) + " 的固定费用没人吸收";
    $("mhr-note").textContent = "按实际工时摊固定费用，产量越少每件越贵——这就是「越闲越亏」的机械原因。"
      + " 正常产能费率（" + fmt(norm, 2) + " 元/小时）才该用来报价和做自制/外购比较，"
      + " 用实际费率报价会越忙越亏（忙的时候费率看着低，报价跟着压低）。"
      + " 闲置成本 " + money(idle) + "/月 到底该不该进产品成本，看管理口径：对外报告按正常产能分摊，"
      + " 闲置部分计入当期损益；内部定价要用正常产能费率。可用工时要扣掉计划检修和法定休息。";
  }

  function calcGovGrant() {
    var amt = num($("ggr-amt"), 0), years = Math.max(1, Math.round(num($("ggr-years"), 1)));
    var tr = num($("ggr-tax"), 25) / 100, dr = num($("ggr-rate"), 5) / 100;
    var isAsset = $("ggr-type").value !== "income";
    var n = isAsset ? years : 1;
    var annual = amt / n, monthly = annual / 12;
    var af = dr > 0 ? (1 - Math.pow(1 + dr, -n)) / dr : n;
    var pvDed = annual * tr * af;
    var pvTaxable = amt * tr - pvDed;
    var pvExempt = pvDed;
    var better = pvTaxable <= pvExempt;
    $("ggr-big").textContent = isAsset ? money(monthly) : money(amt);
    $("ggr-year").textContent = money(annual) + " 元（" + n + " 年摊完）";
    $("ggr-taxnow").textContent = money(amt * tr) + " 元";
    $("ggr-pvded").textContent = money(pvDed) + " 元";
    $("ggr-pv1").textContent = money(pvTaxable) + " 元";
    $("ggr-pv2").textContent = money(pvExempt) + " 元";
    $("ggr-pick").textContent = better
      ? "作应税收入更划算，现值省 " + money(pvExempt - pvTaxable) + " 元"
      : "作不征税收入更划算，现值省 " + money(pvTaxable - pvExempt) + " 元";
    $("ggr-note").textContent = "「不征税收入」不是免税：拿了它，对应的支出（折旧、费用）就不能税前扣除，"
      + "一免一扣互相抵消，只剩资金时间价值。所以对亏损或低税率企业，放弃不征税、按应税处理往往更划算"
      + "（当年交税但折旧能抵、亏损还能弥补）。要享受不征税，得满足专项用途、专款专用、单独核算、"
      + "有资金拨付文件这几个条件，而且 5 年（60 个月）内没花完要退回。"
      + " 会计上：与资产相关的先记递延收益、按资产使用寿命分期进其他收益；与收益相关的补已发生费用直接进当期，"
      + "补以后期间的费用先记递延收益。与日常活动无关的补助才进营业外收入。";
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

  function calcRebateAcc() {
    var sales = num($("rba-sales"), 0), rate = num($("rba-rate"), 0) / 100, ach = num($("rba-ach"), 0) / 100;
    var vc = num($("rba-vc"), 0) / 100;
    var fee = num($("rba-fee"), 0), promo = num($("rba-promo"), 0), staff = num($("rba-staff"), 0);
    var reb = sales * rate * ach;
    var net = sales - reb;
    var cost = fee + promo + staff;
    var gpRaw = sales * (1 - vc);
    var netGp = net * (1 - vc) - cost;
    var cr = net > 0 ? cost / net : 0;
    var rg = gpRaw > 0 ? reb / gpRaw : 0;
    var gm = net > 0 ? netGp / net : 0;
    var full = sales * rate - reb;
    $("rba-big").textContent = money(netGp);
    $("rba-reb").textContent = money(reb) + " 元（按 " + pct(rate, 1) + " × 达成 " + pct(ach, 0) + " 计提）";
    $("rba-net").textContent = money(net) + " 元";
    $("rba-cost").textContent = money(cost) + " 元（进场 " + money(fee) + " / 促销 " + money(promo) + " / 人员 " + money(staff) + "）";
    $("rba-cr").textContent = pct(cr, 2) + "（渠道费用 ÷ 净销售额）";
    $("rba-rg").textContent = pct(rg, 2) + "（返利 ÷ 毛利 " + money(gpRaw) + "）";
    $("rba-gm").textContent = pct(gm, 2) + "（原来 " + pct(1 - vc, 2) + "）";
    $("rba-full").textContent = "若 100% 达成，再多返 " + money(full) + " 元";
    $("rba-note").textContent = "返利属于可变对价：合同签下去就要按期望值（比例 × 达成概率）冲减收入并计提负债，"
      + "不能等年底客户来结账才认。计提过头（客户没达成）要转回，但准则要求「极可能不发生重大转回」才敢计，"
      + "所以保守一点先按达成概率打折更稳。渠道费用要按净销售额看费用率——先减返利再算，"
      + "否则进场费、促销费的真实占比会被高估；进商场、上平台的生意，渠道费用率 10% 以上很常见，"
      + "报价时必须把它算进价格里，靠销量摊薄是摊不掉的。";
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

  function calcLabVar() {
    var qty = num($("lab-qty"), 0), std = num($("lab-std"), 0);
    var srate = num($("lab-srate"), 0), ah = num($("lab-ah"), 0), arate = num($("lab-arate"), 0);
    var cap = Math.max(num($("lab-cap"), 0), ah);
    var stdH = qty * std;
    var rateVar = (arate - srate) * ah;
    var effVar = (ah - stdH) * srate;
    var total = rateVar + effVar;
    var actCost = ah * arate, stdCost = stdH * srate;
    var idle = (cap - ah) * srate;
    $("lab-big").textContent = money(total);
    $("lab-h").textContent = money(stdH) + " / " + money(ah) + " 小时（" + (ah - stdH > 0 ? "多耗 " : "省 ") + money(Math.abs(ah - stdH)) + "）";
    $("lab-rate").textContent = (rateVar >= 0 ? "超支 " : "节约 ") + money(Math.abs(rateVar)) + " 元（工资率 " + fmt(arate - srate, 2) + " × 实际 " + money(ah) + "h）";
    $("lab-eff").textContent = (effVar >= 0 ? "超支 " : "节约 ") + money(Math.abs(effVar)) + " 元（多耗 " + money(ah - stdH) + "h × 标准 " + fmt(srate, 2) + "）";
    $("lab-use").textContent = pct(ah / cap, 2) + "（实际 " + money(ah) + " ÷ 可用 " + money(cap) + "）";
    $("lab-eva").textContent = pct(stdH / ah, 2) + "（标准 " + money(stdH) + " ÷ 实际 " + money(ah) + "）";
    $("lab-idle").textContent = money(idle) + " 元（闲置 " + money(cap - ah) + "h × 标准 " + fmt(srate, 2) + "）";
    $("lab-note").textContent = "实际人工 " + money(actCost) + " 元，标准 " + money(stdCost) + " 元，差 " + money(total)
      + " 元 = 工资率差异 " + money(rateVar) + " ＋ 效率差异 " + money(effVar) + "，这两项相加才等于总差异。"
      + "闲置产能 " + money(idle) + " 元是另一个口径（固定费吸收不足），只说明「人闲着」，"
      + "已经包含在固定制造费用差异里，别再和上面两项相加，否则重复算账。"
      + "看差异先分工：工资率差异归人事/薪酬（涨薪、加班、临时工比例），效率差异归车间（工艺、良率、换线），"
      + "闲置归销售与计划（订单不足、排产不均衡）。";
  }

  function calcRdCap() {
    var total = num($("rdc-total"), 0), capR = num($("rdc-cap"), 0) / 100;
    var years = Math.max(1, num($("rdc-years"), 5)), months = Math.min(12, Math.max(1, num($("rdc-months"), 6)));
    var tax = num($("rdc-tax"), 0) / 100;
    var capAmt = total * capR, expAmt = total - capAmt;
    var amortY = capAmt / years, amortNow = amortY * months / 12;
    var hit = expAmt + amortNow;
    var gain = total - hit;
    var np = gain * (1 - tax);
    var addBase = expAmt + amortNow * 2;
    var taxSave = addBase * tax;
    var left = capAmt - amortNow;
    $("rdc-big").textContent = money(hit);
    $("rdc-split").textContent = money(expAmt) + " / " + money(capAmt) + " 元（资本化率 " + pct(capR, 1) + "）";
    $("rdc-amort").textContent = money(amortNow) + " 元（每年 " + money(amortY) + "，当年摊 " + months + " 个月）";
    $("rdc-gain").textContent = money(gain) + " 元（全部费用化会是 " + money(total) + "）";
    $("rdc-np").textContent = money(np) + " 元（税率 " + pct(tax, 0) + "）";
    $("rdc-add").textContent = money(addBase) + " 元（费用化 " + money(expAmt) + " ＋ 摊销 " + money(amortNow) + " ×2）";
    $("rdc-taxout").textContent = money(taxSave) + " 元";
    $("rdc-left").textContent = money(left) + " 元，剩余 " + fmt((years * 12 - months) / 12, 1) + " 年";
    $("rdc-note").textContent = "资本化的门槛是六个条件同时满足：技术上可行、有使用或出售意图、能带来经济利益、"
      + "资源充足、支出能可靠计量、开发阶段（研究阶段一律费用化）。实务里最容易出错的是「立项就资本化」——"
      + "可行性还没验证就转无形资产，属于典型的高估利润。"
      + "税务上费用化部分可按 100% 加计扣除、资本化部分按 200% 摊销（现行政策，按最新文件执行），"
      + "所以资本化会推迟加计扣除、也让当期税负先高后低；软件、医药这类项目还要注意摊销年限不短于 10 年（部分情形）"
      + "与减值测试。资本化只是把利润往后挪，不是凭空多赚 " + money(gain) + " 元。";
  }

  function calcSalesAllow() {
    var sales = num($("alw-sales"), 0);
    var allowR = num($("alw-allow"), 0) / 100, retR = num($("alw-ret"), 0) / 100;
    var giftCost = num($("alw-giftcost"), 0), giftVal = num($("alw-giftval"), 0);
    var vc = num($("alw-vc"), 0) / 100, vat = num($("alw-vat"), 0) / 100;
    var sur = 0.12, tax = 0.25;
    var allow = sales * allowR, ret = sales * retR;
    var cut = allow + ret;
    var net = sales - cut;
    var vatNormal = (sales - cut) * vat;
    var vatGift = giftVal * vat;
    var vatAll = vatNormal + vatGift;
    var surtax = vatAll * sur;
    var gpGross = net * (1 - vc);
    var gpNet = gpGross - giftCost;
    var giftSur = vatGift * sur;
    var giftTaxable = Math.max(0, giftVal - giftCost);
    var giftTax = giftTaxable * tax;
    var giftAll = giftCost + vatGift + giftSur + giftTax;
    $("alw-big").textContent = money(giftAll);
    $("alw-cut").textContent = money(cut) + " 元（折让 " + money(allow) + " / 退货 " + money(ret) + "）";
    $("alw-net").textContent = money(net) + " 元";
    $("alw-vatout").textContent = money(vatAll) + " 元（其中赠品视同销售 " + money(vatGift) + "）";
    $("alw-surtax").textContent = money(surtax) + " 元（按 12%）";
    $("alw-gp").textContent = money(gpGross) + " / " + money(gpNet) + " 元";
    $("alw-gv").textContent = money(vatGift) + " / " + money(giftSur) + " 元";
    $("alw-gt").textContent = "视同销售所得 " + money(giftTaxable) + " × " + pct(tax, 0) + " = " + money(giftTax) + " 元";
    $("alw-note").textContent = "三件事分开处理：① 折让和退货是冲减收入（同时冲减销项税），已经开票的要开红字发票，"
      + "不能挂「其他应收」或让业务员垫；② 赠品是「视同销售」——增值税按公允价值计销项、所得税按公允价值确认收入并结转成本，"
      + "所以送出去的成本不只是成本 " + money(giftCost) + "，全口径是 " + money(giftAll) + " 元，"
      + "相当于实际成本的 " + fmt(giftCost > 0 ? giftAll / giftCost : 0, 2) + " 倍；"
      + "③ 促销赠品建议按「买一赠一」组合销售开票（同一张发票上分摊价格），可以避免视同销售重复计税。"
      + "另外注意：折让、退回要冲减当期收入，不能追溯调整上年报表（除非是差错更正）。";
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

  function calcVatChoose() {
    var S = num($("vtc-sales"), 0);
    var cr = num($("vtc-cost"), 0) / 100, ded = num($("vtc-ded"), 0) / 100;
    var r13 = num($("vtc-rate13"), 0) / 100, r3 = num($("vtc-rate3"), 0) / 100;
    var tax = num($("vtc-tax"), 0) / 100, sur = 0.12;
    var C = S * cr;
    var out13 = S * r13, inVat = C * ded * r13;
    var pay1 = Math.max(0, out13 - inVat), sur1 = pay1 * sur;
    var np1 = (S - C - sur1) * (1 - tax);
    var pay2 = S * r3, sur2 = pay2 * sur;
    var C2 = C * (1 + r13 * ded);
    var np2 = (S - C2 - sur2) * (1 - tax);
    var diff = np1 - np2;
    var beCr = ded > 0 && r13 > 0 ? (sur * (r13 - r3)) / (ded * r13 * (1 + sur)) : 99;
    $("vtc-big").textContent = money(Math.abs(diff));
    $("vtc-g1").textContent = money(out13) + " / " + money(inVat) + " / " + money(pay1) + " 元";
    $("vtc-g2").textContent = money(sur1) + " / " + money(np1) + " 元";
    $("vtc-s1").textContent = money(pay2) + " 元（按 " + pct(r3, 1) + "，进项不能抵）";
    $("vtc-s2").textContent = money(C2) + " / " + money(sur2) + " 元";
    $("vtc-s3").textContent = money(np2) + " 元";
    $("vtc-be").textContent = beCr > 1 ? "进项抵扣率为 0，小规模一直更优" : "成本率 " + pct(beCr, 2) + " / 毛利率 " + pct(1 - beCr, 2);
    $("vtc-note").textContent = (diff >= 0 ? "按现在的成本结构和抵扣率，一般纳税人税后多赚 " + money(diff) + " 元。"
      : "按现在的成本结构和抵扣率，小规模税后多赚 " + money(Math.abs(diff)) + " 元——因为进项抵扣拿不回来，13% 销项基本白交。")
      + "判断的关键不是税率高低，而是「进项能不能抵」：采购能拿到 13% 专票的贸易、制造，一般纳税人合算；"
      + "人工为主、采购零散拿不到专票的服务业，小规模 3%（现行优惠期可能 1%）完胜。"
      + "还有三个非税因素要一起看：客户要不要 13% 专票（要就基本没得选）、"
      + "一般纳税人要建账、进项管理成本和被稽查概率更高、小规模年销售额超过 500 万必须转一般纳税人。"
      + "无差异点会随征收率优惠、行业加计抵减政策变化，算完要按最新文件复核。";
  }

  function calcProcessCost() {
    var m1 = num($("stp-m1"), 0), c1 = num($("stp-c1"), 0);
    var q1 = Math.max(1, num($("stp-q1"), 1)), q2 = Math.max(1, num($("stp-q2"), 1));
    var m2 = num($("stp-m2"), 0), c2 = num($("stp-c2"), 0), scrap = num($("stp-scrap"), 0);
    var cost1 = m1 + c1;
    var semiUnit = cost1 / q1;
    var carry = cost1;
    var total2 = carry + m2 + c2 - scrap;
    var unit = total2 / q2;
    var lossN = Math.max(0, q1 - q2);
    var lossCost = lossN * unit;
    var naive = total2 / q1;
    var matShare = (m1 + m2 - scrap) / total2, procShare = (c1 + c2) / total2;
    $("stp-big").textContent = fmt(unit, 2);
    $("stp-semi").textContent = fmt(semiUnit, 2) + " 元 / 转出 " + money(carry) + " 元";
    $("stp-total").textContent = money(total2) + " 元（含工序1 转入 " + money(carry) + "）";
    $("stp-loss").textContent = lossN + " 件 / " + money(lossCost) + " 元（占成本 " + pct(q1 > q2 ? lossCost / total2 : 0, 2) + "）";
    $("stp-naive").textContent = fmt(naive, 2) + " 元（少算 " + fmt(unit - naive, 2) + " 元/件）";
    $("stp-mix").textContent = pct(matShare, 1) + " / " + pct(procShare, 1);
    $("stp-note").textContent = "逐步结转分步法：上一步的半成品成本整体转进下一步，所以第二步的「材料」里含着第一步的人工和制造费用，"
      + "要还原成本结构就得按第一步的成本构成比例倒推（本模块用材料/加工占比近似）。"
      + "关键点是损耗：投入 " + money(q1) + " 件、产出 " + money(q2) + " 件，损耗的 " + lossN + " 件成本 "
      + money(lossCost) + " 元不能摊到产成品成本里（除非是正常损耗且准则允许），实务里多数按「正常损耗计入成本、"
      + "非正常损耗进营业外/管理费用」处理；直接用总成本除投入件数会低估单位成本 " + fmt(unit - naive, 2) + " 元。"
      + "另要注意：在产品要按完工程度折约当产量，别把在制当废品。";
  }

  function calcMakeOrOutsource() {
    var qty = num($("mko-qty"), 0), vc = num($("mko-vc"), 0);
    var inv = num($("mko-inv"), 0), life = Math.max(1, num($("mko-life"), 5));
    var opp = num($("mko-opp"), 0);
    var price = num($("mko-price"), 0), extra = num($("mko-extra"), 0);
    var dep = inv / life;
    var inTotal = qty * vc + dep;
    var outUnit = price + extra;
    var outTotal = qty * outUnit;
    var save = outTotal - inTotal;
    var inUnit = qty > 0 ? inTotal / qty : 0;
    var denom = outUnit - vc;
    var be = denom > 0 ? dep / denom : Infinity;
    var oppTotal = qty * opp;
    var saveWithOpp = save - oppTotal;
    $("mko-big").textContent = money(save);
    $("mko-in").textContent = money(inTotal) + " 元（变动 " + money(qty * vc) + " ＋ 折旧 " + money(dep) + "）";
    $("mko-out").textContent = money(outTotal) + " 元（" + fmt(outUnit, 2) + " 元/件）";
    $("mko-unit").textContent = fmt(inUnit, 2) + " vs " + fmt(outUnit, 2) + " 元/件";
    $("mko-be").textContent = (be === Infinity ? "—" : money(be) + " 件（低于此量委外更省）");
    $("mko-oppout").textContent = opp > 0
      ? "自制再让出价值 " + money(oppTotal) + " 的产能 → 自制优势变为 " + (saveWithOpp >= 0 ? "省 " : "亏 ") + money(Math.abs(saveWithOpp)) + " 元"
      : "机会成本填 0（产能确实闲置）";
    $("mko-note").textContent = "委外决策只比「相关成本」：自制的变动成本 vs 委外单价，加上只有自制才发生的专属投入（设备、模具、"
      + "专属人员），分摊来的固定制造费用是沉没成本，算进去必然把自制算贵。"
      + "本案例临界量 " + (be === Infinity ? "不存在" : money(be) + " 件") + "：量低于它，设备折旧摊不薄，委外更省（"
      + "这就是小批量订单外发的道理）；量越大自制越占优。还有三件事要一起想："
      + "① 产能能不能转做别的（机会成本 " + fmt(opp, 2) + " 元/件）；② 委外的质量与交付风险、技术外泄；"
      + "③ 自制省下的是毛利、委外省下的是固定投入——现金流时间点不同，要按年限折现比。";
  }

  function calcRebateDTA() {
    var rebate = num($("rdt-rebate"), 0), ret = num($("rdt-return"), 0);
    var stock = num($("rdt-stock"), 0), tax = num($("rdt-tax"), 0) / 100;
    var diff = rebate + ret;
    var dta = diff * tax;
    var netPL = (rebate + ret - stock) * (1 - tax) - stock * 0;
    var same = stock;
    $("rdt-big").textContent = money(dta);
    $("rdt-td").textContent = money(diff) + " 元（返利 " + money(rebate) + " ＋ 退货 " + money(ret) + "）";
    $("rdt-add").textContent = money(diff) + " 元（税法要等实际支付/实际退货才认）";
    $("rdt-cash").textContent = "当期多缴 " + money(dta) + "，实际发生时少缴 " + money(dta) + " 元";
    $("rdt-same").textContent = money(same) + " 元（退货存货成本冲回，账税一致）";
    $("rdt-pl").textContent = money(netPL) + " 元（收入冲减 " + money(rebate + ret) + "，税后 " + money((rebate + ret) * (1 - tax)) + "，扣除存货成本后）";
    $("rdt-note").textContent = "会计按权责发生制先冲收入、确认「应付退货退款」和「预计负债」，税法只认实际发生并有合法凭据的部分，"
      + "于是形成可抵扣暂时性差异 " + money(diff) + "，确认递延所得税资产 " + money(dta) + "，同时当期纳税调增。"
      + "注意三点：① 返利要凭红字发票或对方开具的收款凭证才能扣，光有合同和计提表不行；"
      + "② 退货的存货成本部分（" + money(stock) + "）账税一致，不产生差异，别重复算；③ 递延所得税资产要评估「未来有没有足够应纳税所得额」，"
      + "连续亏损的企业这部分资产可能确认不了，计提了也要做减值。";
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

  function calcWelfare() {
    var wage = num($("wlf-wage"), 0);
    var wel = num($("wlf-wel"), 0), edu = num($("wlf-edu"), 0), uni = num($("wlf-union"), 0);
    var tax = num($("wlf-tax"), 0) / 100;
    var emp = num($("wlf-emp"), 0), dis = num($("wlf-dis"), 0);
    var avg = num($("wlf-avg"), 0), crate = num($("wlf-rate"), 0) / 100;
    var limWel = wage * 0.14, limEdu = wage * 0.08, limUni = wage * 0.02;
    var overWel = Math.max(0, wel - limWel), overEdu = Math.max(0, edu - limEdu), overUni = Math.max(0, uni - limUni);
    var over = overWel + overEdu + overUni;
    var taxOut = over * tax;
    var need = emp * 0.015;
    var gap = Math.max(0, need - dis);
    var fund = gap * avg * crate;
    var save = Math.min(gap, 1) > 0 ? avg * crate : 0;
    $("wlf-big").textContent = money(over);
    $("wlf-welout").textContent = money(limWel) + " / " + money(wel) + (overWel > 0 ? "（超 " + money(overWel) + "）" : "（未超）");
    $("wlf-eduout").textContent = money(limEdu) + " / " + money(edu) + (overEdu > 0 ? "（超 " + money(overEdu) + "，可结转以后年度）" : "（未超）");
    $("wlf-uniout").textContent = money(limUni) + " / " + money(uni) + (overUni > 0 ? "（超 " + money(overUni) + "）" : "（未超）");
    $("wlf-taxout").textContent = money(taxOut) + " 元（调增 " + money(over) + " × " + pct(tax, 0) + "）";
    $("wlf-gap").textContent = fmt(need, 2) + " − " + fmt(dis, 0) + " = " + fmt(gap, 2) + " 人（按 1.5% 应安置 " + fmt(need, 2) + " 人）";
    $("wlf-fund").textContent = money(fund) + " 元（" + fmt(gap, 2) + " 人 × 年均工资 " + money(avg) + " × 征收比例 " + pct(crate, 0) + "）";
    $("wlf-save").textContent = money(save) + " 元/年（再多安置 1 人）";
    $("wlf-note").textContent = "三项经费的扣除基数都是「实际发放」的工资薪金，计提未发的不算；"
      + "福利费超 14% 永久性调增（不能结转），教育经费超 8% 可以结转以后年度继续扣，"
      + "工会经费要取得《工会经费收入专用收据》或税务代收凭据才能扣，只计提不上缴的不认。"
      + "残保金 = 差额人数 × 年平均工资 × 分档比例，安排残疾人就业比例越高征得越少，"
      + "安置 1–2 级残疾或重度残疾通常按 2 人折算，且要签 1 年以上合同、实际支付不低于最低工资、足额缴社保才算。";
  }

  function calcInputOut() {
    var inp = num($("itr-input"), 0);
    var t = num($("itr-tax"), 0), s = num($("itr-simple"), 0), f = num($("itr-free"), 0);
    var wf = num($("itr-welf"), 0), ls = num($("itr-loss"), 0);
    var tot = t + s + f;
    var ratio = tot > 0 ? (s + f) / tot : 0;
    var part = inp * ratio;
    var full = wf + ls;
    var out = part + full;
    var left = inp - part;
    $("itr-big").textContent = money(out);
    $("itr-ratio").textContent = pct(ratio, 2) + "（免税＋简易 " + money(s + f) + " ÷ 全部 " + money(tot) + "）";
    $("itr-part").textContent = money(part) + " 元（无法划分进项 " + money(inp) + " × 比例）";
    $("itr-full").textContent = money(wf) + " / " + money(ls) + " 元";
    $("itr-left").textContent = money(left) + " 元（只就一般计税项目抵扣）";
    $("itr-pct").textContent = inp > 0 ? pct(out / inp, 2) : "—";
    $("itr-risk").textContent = money(out * 12) + " 元／年（按本月水平外推，另加每日万分之五滞纳金）";
    $("itr-note").textContent = "能划分的按用途直接归集：专用于简易计税、免税、集体福利、个人消费的进项，以及非正常损失对应的进项，一律不得抵扣、全额转出；"
      + "只有「无法划分」的部分才按销售额比例分摊，公式是：不得抵扣进项 = 无法划分进项 ×（免税＋简易销售额 ÷ 全部销售额）。"
      + "常见漏项：食堂宿舍的水电气、给员工发的自产产品、管理不善导致的存货毁损、"
      + "简易计税项目领用的原材料；漏转被查要补税并加收滞纳金，还会影响纳税信用评级。"
      + "年度终了还要按全年数据清算一次，平时按月度比例转出的差额要调整。";
  }

  function calcStampDuty() {
    var sale = num($("sdt-sale"), 0), loan = num($("sdt-loan"), 0), lease = num($("sdt-lease"), 0);
    var trans = num($("sdt-trans"), 0), eq = num($("sdt-equity"), 0), cap = num($("sdt-capital"), 0);
    var half = $("sdt-half").value === "1";
    var v1 = sale * 0.0003, v2 = loan * 0.00005, v3 = lease * 0.001, v4 = trans * 0.0003, v5 = eq * 0.0005, v6 = cap * 0.00025;
    var raw = v1 + v2 + v3 + v4 + v5 + v6;
    var total = half ? raw * 0.5 : raw;
    var base = sale + loan + lease + trans + eq + cap;
    $("sdt-big").textContent = money(total);
    $("sdt-k1").textContent = money(v1) + " / " + money(v2) + " 元";
    $("sdt-k2").textContent = money(v3) + " / " + money(v4) + " 元";
    $("sdt-k3").textContent = money(v5) + " / " + money(v6) + " 元";
    $("sdt-raw").textContent = money(raw) + " 元（减半额 " + money(raw - total) + "）";
    $("sdt-rate").textContent = base > 0 ? pct(total / base, 3) : "—";
    $("sdt-tip").textContent = "若合同只写含税总价，按含税金额计税，多缴 " + money(total * 0.13 / 1.13) + " 元左右";
    $("sdt-note").textContent = "印花税按合同所列金额计征，合同分别列明价款和增值税的可按不含税金额算，"
      + "没分别列明的从高按含税金额，所以签合同时把「不含税价＋税率＋税额」写清楚是省钱动作。"
      + "常见坑：框架协议只写「按实际发生结算」的，先按 0 申报但要在实际结算时补；"
      + "同一合同含不同税目要分别计税，从高适用税率；电子合同、订单也算应税凭证。"
      + "小规模纳税人、小型微利企业和个体工商户可享「六税两费」减半（政策有期限，按当期执行）。"
      + "印花税不计入应交税费的「应交增值税」，而是税金及附加，一次缴清不退税。";
  }

  function calcAssetDisp() {
    var orig = num($("adsp-orig"), 0), dep = num($("adsp-dep"), 0), imp = num($("adsp-imp"), 0);
    var price = num($("adsp-price"), 0), vat = num($("adsp-vat"), 0) / 100;
    var fee = num($("adsp-fee"), 0), tax = num($("adsp-tax"), 0) / 100;
    var nbv = orig - dep - imp;
    var net = price / (1 + vat);
    var vatOut = price - net;
    var pl = net - nbv - fee;
    var taxOut = pl * tax;
    var after = pl - taxOut;
    var be = (nbv + fee) * (1 + vat);
    $("adsp-big").textContent = money(pl);
    $("adsp-nbv").textContent = money(nbv) + " 元（原值 " + money(orig) + " − 折旧 " + money(dep) + " − 减值 " + money(imp) + "）";
    $("adsp-net").textContent = money(net) + " / " + money(vatOut) + " 元";
    $("adsp-feeout").textContent = money(fee) + " 元";
    $("adsp-taxout").textContent = (pl >= 0 ? "多缴 " : "少缴 ") + money(Math.abs(taxOut)) + " 元";
    $("adsp-after").textContent = money(after) + " 元" + (pl < 0 ? "（计提资产处置损失）" : "（计入资产处置收益）");
    $("adsp-be").textContent = money(be) + " 元（含税，低于此价即亏损）";
    $("adsp-note").textContent = "处置损益 = 不含税售价 − 账面净值 − 清理费用，进「资产处置收益」（正常出售）"
      + "或「营业外收支」（报废毁损、非正常损失）。增值税看两头：已抵扣进项的按 13% 计销项；"
      + "以前未抵扣、简易计税的，可按 3% 减按 2% 征收（放弃则按 3%）。"
      + "别忘：报废毁损属于非正常损失时，之前抵扣的进项要转出；提前报废的损失要做专项申报才能在税前扣除；"
      + "处置当月照提折旧、次月起停止。保本售价 " + money(be) + " 元是含税口径，谈判时别拿净值直接当底价。";
  }

  function calcHeadcount() {
    var vol = num($("hc-vol"), 0), grow = num($("hc-grow"), 0) / 100;
    var eff = Math.max(1, num($("hc-eff"), 1)), now = num($("hc-now"), 0);
    var cost = num($("hc-cost"), 0), turn = num($("hc-turn"), 0) / 100, hire = num($("hc-hire"), 0);
    var tgt = vol * (1 + grow), need = tgt / eff;
    var gap = Math.max(0, need - now), churn = need * turn;
    var hires = gap + churn;
    var budget = need * cost, inc = (need - now) * cost;
    var effNeed = tgt / (eff * 1.1);
    var save = (need - effNeed) * cost;
    $("hc-big").textContent = fmt(gap, 1);
    $("hc-need").textContent = fmt(tgt, 0) + " 单 / " + fmt(need, 1) + " 人";
    $("hc-churn").textContent = fmt(churn, 1) + " 人（编制 " + fmt(need, 1) + " × 离职率 " + pct(turn, 0) + "）";
    $("hc-hireout").textContent = fmt(hires, 1) + " 人（缺口 " + fmt(gap, 1) + " ＋ 补员 " + fmt(churn, 1) + "）";
    $("hc-budget").textContent = money(budget) + " 元";
    $("hc-inc").textContent = money(inc) + " 元（现在 " + money(now * cost) + "）";
    $("hc-hirecost").textContent = money(hires * hire) + " 元";
    $("hc-eff10").textContent = money(save) + " 元（" + fmt(effNeed, 1) + " 人即可，少招 " + fmt(need - effNeed, 1) + " 人）";
    $("hc-note").textContent = "编制不是拍脑袋，是「业务量 ÷ 人均效能」倒推出来的；但人均效能要用近 12 个月的实际数据，"
      + "别用行业标杆，否则永远算不出缺口。离职率要乘在目标编制上（不是现有编制），"
      + "因为招进来的人也会走——招聘量 = 净增缺口 + 离职补员，这一步最常被漏掉，"
      + "所以「招 88 人」其实要招 " + fmt(hires, 1) + " 人。"
      + "人力预算别只算工资：社保公积金、年终奖、招聘与培训、工位设备都在里面，人均年成本要按全口径。"
      + "最后算一遍「提效」的杠杆：人均效能提 10% 就能少招 " + fmt(need - effNeed, 1) + " 人，"
      + "通常比砍人头更容易被接受，也更可持续。";
  }

  function calcMarkRoi() {
    var spend = num($("mroi-spend"), 0), newc = Math.max(1, num($("mroi-new"), 1));
    var aov = num($("mroi-aov"), 0), gm = num($("mroi-gm"), 0) / 100;
    var rep = num($("mroi-rep"), 0), life = num($("mroi-life"), 0);
    var cac = spend / newc, fg = aov * gm, ltv = aov * rep * life * gm;
    var roi = spend > 0 ? (newc * ltv - spend) / spend : 0;
    $("mroi-big").textContent = fmt(ltv / cac, 2);
    $("mroi-cac").textContent = money(cac) + " 元/人";
    $("mroi-fg").textContent = money(fg) + " 元（客单价 " + money(aov) + " × " + pct(gm, 0) + "）";
    $("mroi-be").textContent = fmt(cac / fg, 3) + " 单" + (cac / fg <= 1 ? "（首单即回本）" : "（首单不够，要等复购）");
    $("mroi-ltv").textContent = money(ltv) + " 元（" + fmt(rep, 1) + " 次/年 × " + fmt(life, 1) + " 年）";
    $("mroi-roi").textContent = fmt(roi, 2) + " 倍（毛利额 " + money(newc * ltv) + " ÷ 投入）";
    $("mroi-line").textContent = money(ltv / 3) + " 元（LTV/CAC ≥ 3 才算健康）";
    $("mroi-rev").textContent = money(newc * aov * rep * life) + " 元";
    $("mroi-note").textContent = "LTV/CAC ≥ 3 是经验健康线，低于 1 是每获一个客亏一次，1.5–2 之间要靠融资或复购硬撑。"
      + "几个口径坑：CAC 要算全口径（渠道费＋投放人力＋代理佣金＋首单补贴），只算广告费会把它算便宜；"
      + "LTV 用「毛利」不用「收入」，用收入会高估 2–3 倍；生命周期别用「预计」，要用历史留存曲线算出来的实际中位年限。"
      + "另外投产比高不等于该无限加投——边际 CAC 会随投放规模上升，"
      + "投放量翻倍前先看新增渠道的转化率是否掉、退货率是否上升。";
  }

  function calcRdProject() {
    var bud = num($("rdp-budget"), 0), mat = num($("rdp-mat"), 0), ext = num($("rdp-ext"), 0);
    var hrs = num($("rdp-hours"), 0), rate = num($("rdp-rate"), 0), oh = num($("rdp-oh"), 0) / 100;
    var mon = Math.min(12, Math.max(1, num($("rdp-mon"), 1)));
    var lab = hrs * rate, ohm = lab * oh;
    var cum = mat + lab + ohm + ext;
    var use = bud > 0 ? cum / bud : 0;
    var left = bud - cum;
    var mrate = cum / mon;
    var over = mrate * 12 - bud;
    var cap = left / (12 - mon);
    $("rdp-big").textContent = money(cum);
    $("rdp-lab").textContent = money(lab) + " / " + money(ohm) + " 元";
    $("rdp-use").textContent = pct(use, 2) + "（已执行 " + mon + " 个月）";
    $("rdp-left").textContent = money(left) + " 元";
    $("rdp-monrate").textContent = money(mrate) + " 元/月";
    $("rdp-over").textContent = (over > 0 ? "超 " : "余 ") + money(Math.abs(over)) + " 元（按 " + mon + " 个月外推到 12 个月）";
    $("rdp-cap").textContent = money(cap) + " 元/月（比现在要压 " + pct(mrate > 0 ? Math.max(0, 1 - cap / mrate) : 0, 1) + "）";
    $("rdp-note").textContent = "研发项目最容易失控的是工时归集：必须在项目号下按人按天记，"
      + "事后凭记忆分摊的工时，加计扣除时会被质疑真实性。间接费按直接人工的固定比例分摊（"
      + pct(oh, 0) + "）要写进立项文件，否则汇算时口径不一致。"
      + "预算使用率 " + pct(use, 2) + " 而时间只过了 " + fmt(mon / 12 * 100, 0) + "%，"
      + "说明前松后紧或有大额采购前置；按当前速度全年会" + (over > 0 ? "超支 " + money(over) : "结余 " + money(-over))
      + " 元，要么追加预算走变更流程，要么把剩余 " + (12 - mon) + " 个月的月度上限压到 " + money(cap) + " 元。"
      + "另外注意资本化判定是按项目阶段（研究/开发）而不是按项目整体，同一项目里前期费用化、后期资本化很常见。";
  }

  function calcIntSvc() {
    var cs = num($("isv-cost"), 0), mark = num($("isv-mark"), 0) / 100;
    var lo = num($("isv-low"), 0) / 100, hi = num($("isv-high"), 0) / 100;
    var ta = num($("isv-ta"), 0) / 100, tb = num($("isv-tb"), 0) / 100;
    var fee = cs * (1 + mark), add = fee - cs;
    var net = fee * tb - add * ta;
    var vat = fee * 0.06;
    var adjBase = Math.max(0, mark - hi) * cs;
    $("isv-big").textContent = money(net);
    $("isv-fee").textContent = money(fee) + " 元（成本 " + money(cs) + " ×(1＋" + pct(mark, 1) + ")）";
    $("isv-add").textContent = money(add) + " 元（留存在 " + pct(ta, 0) + " 税率方）";
    $("isv-range").textContent = pct(mark, 2) + " vs " + pct(lo, 1) + "–" + pct(hi, 1) + (mark >= lo && mark <= hi ? "（在区间内）" : "（超出区间，有调整风险）");
    $("isv-vat").textContent = money(vat) + " 元（接收方取得专票可抵，集团内不增负）";
    $("isv-vatcost").textContent = money(vat) + " 元会变成真实成本";
    $("isv-adj").textContent = adjBase > 0 ? "加成额调减 " + money(adjBase) + " 元，接收方补税 " + money(adjBase * tb) + " 元" : "无（区间内不调整）";
    $("isv-note").textContent = "关联方服务费要过三道关：① 受益性测试——接收方真的获得了服务、有实质内容（"
      + "有合同、有成果、有定价依据），母公司「管理费」笼统摊派不予扣除；② 定价符合独立交易原则，"
      + "常用成本加成法，加成率落在可比区间 " + pct(lo, 1) + "–" + pct(hi, 1) + " 内；"
      + "③ 有同期资料（本地文档），金额达到门槛的要准备主体文档与国别报告。"
      + "节税的原理是把利润从高税率主体挪到低税率主体，本例净省 " + money(net) + " 元，"
      + "但如果两边税率相同，除了增加合规成本没有任何好处；若接收方是亏损企业，当期省不了税反而更亏。"
      + "增值税 6% 在现代服务业，接收方不能抵扣（如用于简易计税、免税项目）时，" + money(vat) + " 元就是净成本。";
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

  function calcExportCheck() {
    var usd = num($("exc-usd"), 0), fx = num($("exc-fx"), 0);
    var inv = num($("exc-inv"), 0), rec = num($("exc-rec"), 0);
    var rate = num($("exc-rate"), 0) / 100, credit = num($("exc-credit"), 0);
    var cny = usd * fx;
    var diff = inv - cny;
    var recRate = usd > 0 ? rec / usd : 0;
    var rebate = cny * rate;
    var refund = Math.min(rebate, credit);
    var free = rebate - refund;
    var gap = cny * (0.13 - rate);
    $("exc-big").textContent = money(refund);
    $("exc-cny").textContent = money(cny) + " 元";
    $("exc-diff").textContent = money(diff) + " 元（" + pct(cny > 0 ? diff / cny : 0, 2) + "）" + (Math.abs(cny > 0 ? diff / cny : 0) > 0.05 ? "，超 5% 需书面说明" : "");
    $("exc-recrate").textContent = pct(recRate, 2) + (recRate < 1 ? "（未收汇 " + money((usd - rec) * fx) + " 元）" : "（已全额收汇）");
    $("exc-rebate").textContent = money(rebate) + " 元（" + money(cny) + " × " + pct(rate, 0) + "）";
    $("exc-free").textContent = money(free) + " 元（留抵不足，抵减内销应纳税额）";
    $("exc-gap").textContent = money(gap) + " 元（征 13% − 退 " + pct(rate, 0) + "，转入成本）";
    $("exc-note").textContent = "免抵退的三单要能对上：报关单（出口额）、出口发票（人民币金额）、收汇水单。"
      + "发票和报关单的差异最好控制在 5% 以内（汇率、运保费口径不同会有小额差），超了要能拿出说明；"
      + "收汇是退税的隐性条件，超过规定期限未收汇、且不符合视同收汇情形的，已退税款可能被追回。"
      + "退税额取「免抵退税额」与「期末留抵」的较小者：留抵大就全退，留抵小则差额变成免抵额去抵内销应纳税额。"
      + "征退税率之差（13% − 退税率）不能退，要转进成本，做报价时就得把它算进毛利里。"
      + "单证不齐、逾期不申报的出口货物，按规定要视同内销征税，这是外贸企业最常见的补税点。";
  }

  function calcVatCheck() {
    var outp = num($("vchk-out"), 0), invp = num($("vchk-inv"), 0), noinv = num($("vchk-noinv"), 0);
    var inp = num($("vchk-in"), 0), cert = num($("vchk-cert"), 0), tr = num($("vchk-tr"), 0);
    var dOut = invp + noinv, dIn = cert - tr;
    var od = outp - dOut, idf = inp - dIn;
    var due = dOut - dIn;
    var tot = Math.abs(od) + Math.abs(idf);
    var risk = tot === 0 ? "账表一致" : (tot > Math.abs(dOut) * 0.05 ? "差异偏大，需逐笔调节" : "小额差异，编制调节表说明");
    $("vchk-big").textContent = money(due);
    $("vchk-outp").textContent = money(dOut) + " 元（开票 " + money(invp) + " ＋ 未开票 " + money(noinv) + "）";
    $("vchk-outdiff").textContent = money(od) + " 元" + (od < 0 ? "（账面少于申报，可能少计收入）" : "（账面多于申报，可能多计或未开票未申报）");
    $("vchk-inp").textContent = money(dIn) + " 元（认证 " + money(cert) + " − 转出 " + money(tr) + "）";
    $("vchk-indiff").textContent = money(idf) + " 元" + (idf > 0 ? "（账面多，可能有未认证或未取得专票）" : "（账面少，可能重复抵扣或跨期）");
    $("vchk-total").textContent = money(tot) + " 元";
    $("vchk-risk").textContent = risk;
    $("vchk-note").textContent = "申报表和账面的差异不可能为零，关键是每一笔都能说出原因，并留下调节表。"
      + "销项侧常见差异：开了票未确认收入（预收）、确认收入未开票（要填「未开具发票」栏，否则下期冲回很麻烦）、"
      + "视同销售没申报（赠品、自用、职工福利）、价外费用漏计（违约金、延期付款利息）。"
      + "进项侧常见差异：专票未认证、认证了但属于不得抵扣项目没转出、旅客运输与农产品计算抵扣漏填、"
      + "红字发票冲减滞后。差异超过销项 5% 就属于金税系统容易预警的区间，"
      + "建议每月固定做这张勾稽表，和开票系统、认证平台、账面三个口径一起对。";
  }


  /* ---------------- 方案快照 / 一页体检报告 用到的公共件 ---------------- */
  var SNAP_KEY = "finance-calc-snaps";
  var SNAP_PICK = {};   // 勾选状态存内存，避免表格重绘后丢失selected

  function loadSnaps() {
    var arr = [];
    try { arr = JSON.parse(localStorage.getItem(SNAP_KEY) || "[]") || []; } catch (e) { arr = []; }
    return Array.isArray(arr) ? arr : [];
  }

  function saveSnaps(arr) {
    try { localStorage.setItem(SNAP_KEY, JSON.stringify(arr.slice(0, 20))); } catch (e) {}
  }

  function snapNameOf(mod) {
    var tb = document.querySelector('.tab[data-tab="' + mod + '"]');
    return tb ? tb.textContent.trim() : mod;
  }

  function fmtAt(ts) {
    var d = new Date(ts), z = function (n) { return (n < 10 ? "0" : "") + n; };
    return (d.getMonth() + 1) + "-" + z(d.getDate()) + " " + z(d.getHours()) + ":" + z(d.getMinutes());
  }

  /* 把当前面板（模块、名字、主结果、指标、参数）打成一个快照对象 */
  function makeSnap(name, note, tag) {
    var panel = document.querySelector(".panel.is-on");
    var tab = document.querySelector(".tab.is-on");
    if (!panel || !tab) return null;
    var mod = tab.dataset.tab;
    var rows = snapshot().rows || [];
    var params = panelEls().map(function (el) {
      var lab = el.closest("label");
      var sp = lab ? lab.querySelector("span") : null;
      return { id: el.id, label: sp ? sp.textContent.trim() : el.id, value: el.value };
    });
    return { id: "s" + Date.now(), mod: mod, modName: snapNameOf(mod), name: name || snapNameOf(mod), note: note || "", tag: tag || "", rows: rows, params: params, at: Date.now() };
  }

  /* ---------------- 家庭财务体检 ---------------- */
  function calcHealth() {
    var inc = Math.max(0, num($("hk-inc"), 0));
    var need = Math.max(0, num($("hk-need"), 0));
    var want = Math.max(0, num($("hk-want"), 0));
    var cash = Math.max(0, num($("hk-cash"), 0));
    var inv = Math.max(0, num($("hk-inv"), 0));
    var house = Math.max(0, num($("hk-house"), 0));
    var debt = Math.max(0, num($("hk-debt"), 0));
    var loan = Math.max(0, num($("hk-loan"), 0));
    var prem = Math.max(0, num($("hk-prem"), 0));
    var ins = Math.max(0, num($("hk-ins"), 0));

    var saveRate = inc > 0 ? (inc - need - want) / inc : 0;
    var emgMonths = need > 0 ? cash / need : 0;
    var assets = cash + inv + house;
    var lev = assets > 0 ? debt / assets : 0;
    var dsr = inc > 0 ? loan / inc : 0;
    var needIns = inc * 12 * 10 + debt - (cash + inv);
    if (needIns < 0) needIns = 0;
    var cover = needIns > 0 ? ins / needIns : 1;
    var premRate = inc > 0 ? prem / (inc * 12) : 0;
    var net = assets - debt;

    function scoreSave(v) { return v >= 0.30 ? 20 : v >= 0.20 ? 15 : v >= 0.10 ? 10 : 5; }
    function scoreEmg(v) { return v >= 6 ? 20 : v >= 4 ? 15 : v >= 2 ? 10 : 5; }
    function scoreLev(v) { return v < 0.30 ? 20 : v < 0.50 ? 15 : v < 0.70 ? 10 : 5; }
    function scoreDsr(v) { return v < 0.30 ? 20 : v < 0.40 ? 15 : v < 0.50 ? 10 : 5; }
    function scoreCover(v) { return v >= 1 ? 20 : v >= 0.7 ? 15 : v >= 0.4 ? 10 : 5; }

    var dims = [
      ["储蓄率", pct(saveRate, 1), scoreSave(saveRate), "≥30%"],
      ["应急金月数", fmt(emgMonths, 1) + " 个月", scoreEmg(emgMonths), "≥6 个月"],
      ["资产负债率", pct(lev, 1), scoreLev(lev), "<50%"],
      ["月供收入比", pct(dsr, 1), scoreDsr(dsr), "<40%"],
      ["保障覆盖", pct(cover, 1), scoreCover(cover), "≥100%"]
    ];
    var total = 0, weak = dims[0];
    for (var i = 0; i < dims.length; i++) {
      total += dims[i][2];
      if (dims[i][2] < weak[2]) weak = dims[i];
    }
    var rate = total >= 85 ? "优秀" : total >= 70 ? "良好" : total >= 55 ? "及格，有明显短板" : "需要改善";
    $("hk-big").textContent = fmt(total, 0);
    $("hk-save").textContent = pct(saveRate, 1) + "（月存 " + money(inc - need - want) + " 元）";
    $("hk-emg").textContent = fmt(emgMonths, 1) + " 个月（现金 " + money(cash) + " ÷ 必需支出 " + money(need) + "）";
    $("hk-lev").textContent = pct(lev, 1) + "（负债 " + money(debt) + " ÷ 资产 " + money(assets) + "）";
    $("hk-dsr").textContent = pct(dsr, 1) + "（月供 " + money(loan) + " ÷ 收入 " + money(inc) + "）";
    $("hk-cover").textContent = pct(cover, 1) + "（保额 " + money(ins) + " ÷ 应配 " + money(needIns) + "）";
    $("hk-premp").textContent = pct(premRate, 2) + "（年保费 " + money(prem) + "；保障型 5–10% 属正常）";
    $("hk-net").textContent = money(net) + " 元";
    $("hk-weak").textContent = weak[0] + "（" + weak[1] + "，得分 " + weak[2] + "/20）";
    var rows = [];
    for (var j = 0; j < dims.length; j++) {
      rows.push("<tr" + (dims[j][2] <= 10 ? ' class="c-warn"' : "") + '><td class="tal">' + dims[j][0]
        + "</td><td>" + dims[j][1] + "</td><td>" + dims[j][2] + " / 20</td><td>" + dims[j][3] + "</td></tr>");
    }
    $("hk-body").innerHTML = rows.join("");
    if ($("hk-links")) $("hk-links").innerHTML = "把这里的数搬过去看完整版："
      + linkTo("report", {
        "rp-inc": num($("hk-inc"), 0), "rp-need": num($("hk-need"), 0), "rp-want": num($("hk-want"), 0),
        "rp-cash": num($("hk-cash"), 0), "rp-inv": num($("hk-inv"), 0), "rp-house": num($("hk-house"), 0),
        "rp-debt": num($("hk-debt"), 0), "rp-loan": num($("hk-loan"), 0), "rp-ins": num($("hk-ins"), 0),
        "rp-prem": num($("hk-prem"), 0), "rp-age": num($("hk-age"), 0)
      }, "一页体检报告")
      + linkTo("emergency", { "em-exp": num($("hk-need"), 0) }, "应急金缺口");

    $("hk-note").textContent = "综合得分 " + fmt(total, 0) + " 分，评级「" + rate + "」。"
      + "五项各 20 分，取的是最常见的达标线：储蓄率 30%、应急金 6 个月、资产负债率 50%、月供收入比 40%、保障覆盖 100%。"
      + "你最短的那块板是「" + weak[0] + "」，先补它性价比最高——"
      + (weak[0] === "保障覆盖"
        ? "按责任法应配 " + money(needIns) + " 元（年收入 ×10 ＋ 负债 － 流动资产），现在还差 " + money(Math.max(0, needIns - ins)) + " 元；定期寿险比重疾便宜一个量级，先补寿险和意外。"
        : weak[0] === "应急金月数"
          ? "应急金要能覆盖 6 个月必需支出，缺口 " + money(Math.max(0, need * 6 - cash)) + " 元，放在货币基金里，别拿去买股票。"
          : weak[0] === "储蓄率"
            ? "储蓄率低于 20% 时，先砍可选支出而不是硬省必需支出，月存 " + money(Math.max(0, inc * 0.3 - (inc - need - want))) + " 元才够 30% 线。"
            : weak[0] === "资产负债率"
              ? "负债率高于 50% 时，新增债务要先还旧债，别用新贷养旧贷；房贷月供已占收入的 " + pct(dsr, 1) + "。"
              : "月供收入比超过 40%，收入哪怕短暂中断也会立刻吃紧，先把月供压到 " + money(inc * 0.4) + " 元以内。")
      + " 这套体检只做粗筛：没有统计你的养老金、公积金、年终奖和未来的大额支出，"
      + "所以分数低不等于财务不健康，要看具体是哪一项低。数据只在本机浏览器，不上传。";
  }

  /* ---------------- 一页体检报告 ---------------- */
  /* 12 个月支出缩略图（读「12 个月小结」已存的值） */
  function drawRpMini() {
    var cv = $("rp-mini");
    if (!cv || !cv.getContext) return;
    var vals = [], i, got = 0;
    var doc = {};
    try { doc = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { doc = {}; }
    for (i = 1; i <= 12; i++) {
      var v = Math.max(0, Number(doc["mt-m" + i]) || 0);
      if (v > 0) got++;
      vals.push(v);
    }
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = 720, hgt = 120;
    cv.width = w * dpr; cv.height = hgt * dpr;
    cv.style.width = "100%"; cv.style.height = "120px";
    var g = cv.getContext("2d");
    g.setTransform(1, 0, 0, 1, 0, 0); g.scale(dpr, dpr);
    g.clearRect(0, 0, w, hgt);
    if (!got) {
      g.fillStyle = "#94a3b8"; g.font = "11px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
      g.textAlign = "center"; g.fillText("还没有支出数据", w / 2, hgt / 2 - 4);
      if ($("rp-mini-note")) $("rp-mini-note").textContent = "到「12 个月小结」把 12 个月的支出填一下，就会在这里出现迷你图。";
      return;
    }
    var pad = 22, base = hgt - 16, max = 0;
    for (i = 0; i < 12; i++) max = Math.max(max, vals[i]);
    if (max <= 0) max = 1;
    var bw = (w - pad * 2) / 12 - 4, sum = 0;
    for (i = 0; i < 12; i++) {
      sum += vals[i];
      var bh = Math.max(vals[i] > 0 ? 2 : 0, (vals[i] / max) * (base - 10));
      var x = pad + i * (bw + 4);
      g.fillStyle = "#93b4f7";
      g.fillRect(x, base - bh, bw, bh);
      g.fillStyle = "#94a3b8"; g.font = "9px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
      g.textAlign = "center"; g.fillText(String(i + 1), x + bw / 2, hgt - 4);
    }
    if ($("rp-mini-note")) $("rp-mini-note").textContent = "取自「12 个月小结」，已填 " + got + " 个月，合计 " + money(sum) + " 元、月均 " + money(sum / Math.max(1, got)) + " 元。";
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

  /* ---------------- 方案快照 ---------------- */
  function calcSnaps() {
    renderSnapList();
    renderSnapCompare();
    refreshTrackMods();
  }

  /* 只重绘列表（存/删/清空时用） */
  function renderSnapList() {
    var arr = loadSnaps();
    var tb = $("snap-body");
    if (!tb) return;
    if (!arr.length) {
      tb.innerHTML = "<tr><td class=\"tal\" colspan=\"5\">还没有快照。先到任意模块调好参数，点顶部「＋ 存方案」。</td></tr>";
      $("snap-count").textContent = "0";
      return;
    }
    var sortEl = $("snap-sort"), qEl = $("snap-q");
    var q = qEl ? String(qEl.value || "").trim().toLowerCase() : "";
    if (q) {
      arr = arr.filter(function (s) {
        return [s.name, s.note, s.tag, s.modName, s.mod].join(" ").toLowerCase().indexOf(q.replace(/^#/, "")) >= 0;
      });
      if (!arr.length) {
        tb.innerHTML = "<tr><td class=\"tal\" colspan=\"5\">没有匹配「" + q.replace(/</g, "&lt;") + "」的方案。</td></tr>";
        return;
      }
    }
    var mode = sortEl ? sortEl.value : "new";
    if (mode === "old") arr = arr.slice().sort(function (a, b) { return a.at - b.at; });
    else if (mode === "mod") arr = arr.slice().sort(function (a, b) { return (a.modName || "").localeCompare(b.modName || "", "zh") || b.at - a.at; });
    else if (mode === "name") arr = arr.slice().sort(function (a, b) { return (a.name || "").localeCompare(b.name || "", "zh") || b.at - a.at; });
    else arr = arr.slice().sort(function (a, b) { return b.at - a.at; });
    var h = "";
    for (var i = 0; i < arr.length; i++) {
      var s = arr[i];
      var main = s.rows && s.rows.length ? s.rows[0][1] : "—";
      h += "<tr><td><input type=\"checkbox\" class=\"snap-pick\" data-id=\"" + s.id + "\"" + (SNAP_PICK[s.id] ? " checked" : "") + " aria-label=\"选择方案\"></td>"
        + "<td class=\"tal\"><a href=\"#" + s.mod + "\" class=\"snap-load\" data-id=\"" + s.id + "\">" + s.modName + "</a></td>"
        + "<td class=\"tal\"><b>" + (s.name || "") + "</b>" + (s.tag ? " <span class=\"tag\">#" + s.tag + "</span>" : "")
        + (s.note ? "<br><span class=\"mut\">" + s.note + "</span>" : "") + "</td>"
        + "<td>" + main + "</td><td>" + fmtAt(s.at) + " <button type=\"button\" class=\"ghost sm snap-ren\" data-id=\"" + s.id + "\">改</button><button type=\"button\" class=\"ghost sm snap-del\" data-id=\"" + s.id + "\">删</button></td></tr>";
    }
    tb.innerHTML = h;
    $("snap-count").textContent = String(arr.length);
  }

  /* 只重绘对比表（勾选变化时用，不动列表，避免勾选被重绘吃掉） */
  function renderSnapCompare() {
    window.__snapCompare = renderSnapCompare;
    var arr = loadSnaps();
    var box = $("snap-cmp-body");
    if (!box) return;
    if (!arr.length) { box.innerHTML = ""; return; }
    var picked = Object.keys(SNAP_PICK).filter(function (k) { return SNAP_PICK[k]; });
    var sel = arr.filter(function (x) { return picked.indexOf(x.id) >= 0; }).slice(0, 3);
    if (sel.length < 2) {
      box.innerHTML = "<tr><td class=\"tal\" colspan=\"4\">勾选 2–3 个方案就能并排比（最多 3 个）。</td></tr>";
      $("snap-note").textContent = "快照存在本机，最多 20 条；点模块名可以带着当时的参数回到那个模块继续调。";
      return;
    }
    var labels = [];
    sel.forEach(function (s) {
      (s.rows || []).forEach(function (r) { if (labels.indexOf(r[0]) < 0) labels.push(r[0]); });
    });
    var head = "<tr><th class=\"tal\">指标</th>";
    sel.forEach(function (s) { head += "<th>" + s.modName + " · " + (s.name || "") + (s.note ? "（" + s.note + "）" : "") + "</th>"; });
    if (sel.length >= 2) head += "<th>差异（相对第一个）</th>";
    function plNum(x) {
      var s = String(x == null ? "" : x).replace(/,/g, "").replace(/−/g, "-");
      var m = s.match(/-?\d+(\.\d+)?/);
      return m ? parseFloat(m[0]) : null;
    }
    var body = "";
    labels.forEach(function (lab) {
      body += "<tr><td class=\"tal\">" + lab + "</td>";
      var first = null;
      sel.forEach(function (s) {
        var hit = (s.rows || []).filter(function (r) { return r[0] === lab; })[0];
        if (first === null && hit) first = hit[1];
        body += "<td>" + (hit ? hit[1] : "—") + "</td>";
      });
      if (sel.length >= 2) {
        var last = null;
        for (var i2 = sel.length - 1; i2 >= 0; i2--) {
          var h2 = (sel[i2].rows || []).filter(function (r) { return r[0] === lab; })[0];
          if (h2) { last = h2[1]; break; }
        }
        var a1 = plNum(first), b1 = plNum(last);
        if (a1 !== null && b1 !== null && first !== last) {
          var d = b1 - a1, p = a1 !== 0 ? d / Math.abs(a1) : null;
          body += "<td class=\"tal\">" + (d > 0 ? "+" : d < 0 ? "−" : "") + fmt(Math.abs(d)) + (p === null ? "" : "（" + (p > 0 ? "+" : p < 0 ? "−" : "") + fmt(Math.abs(p) * 100, 1) + "%）") + "</td>";
        } else {
          body += "<td>—</td>";
        }
      }
      body += "</tr>";
    });
    box.innerHTML = head + "</tr>" + body;
    $("snap-note").textContent = "已选 " + sel.length + " 个方案并排对比（最多 3 个）；最后一列是相对第一个方案的差额与百分比。点「导出 CSV」可以把这张表存下来。";
  }

  /* 月度跟踪：同一个模块的前后两版快照对比 */
  function refreshTrackMods() {
    var sel = $("snap-track-mod");
    if (!sel) return;
    var arr = loadSnaps();
    var groups = {};
    arr.forEach(function (s) { (groups[s.mod] = groups[s.mod] || []).push(s); });
    var keys = Object.keys(groups).filter(function (k) { return groups[k].length >= 2; });
    var cur = sel.value;
    sel.innerHTML = '<option value="">先选模块</option>' + keys.map(function (k) {
      return '<option value="' + k + '">' + groups[k][0].modName + "（" + groups[k].length + " 版）</option>";
    }).join("");
    if (cur) sel.value = cur;
    return groups;
  }
  function renderTrack(prev, cur) {
    var tb = $("snap-track-body"), note = $("snap-track-note");
    if (!tb) return;
    var map = {};
    (prev.rows || []).forEach(function (r) { map[r[0]] = r[1]; });
    var labels = [];
    (cur.rows || []).forEach(function (r) { if (labels.indexOf(r[0]) < 0) labels.push(r[0]); });
    (prev.rows || []).forEach(function (r) { if (labels.indexOf(r[0]) < 0) labels.push(r[0]); });
    function numOf(x) {
      var s = String(x == null ? "" : x).replace(/,/g, "").replace(/−/g, "-");
      var m = s.match(/-?\d+(\.\d+)?/);
      return m ? parseFloat(m[0]) : null;
    }
    var rows = "";
    labels.forEach(function (lab) {
      var a2 = map[lab], b2 = null;
      (cur.rows || []).forEach(function (r) { if (r[0] === lab) b2 = r[1]; });
      var na = numOf(a2), nb = numOf(b2);
      var delta = "—", cls = "";
      if (na !== null && nb !== null && String(a2) !== String(b2)) {
        var d = nb - na;
        delta = (d > 0 ? "+" : d < 0 ? "−" : "") + fmt(Math.abs(d));
        cls = " class=\"c-info\"";
      }
      rows += "<tr" + cls + "><td class=\"tal\">" + lab + "</td><td>" + (a2 === undefined ? "—" : a2) + "</td><td>" + (b2 === undefined ? "—" : b2) + "</td><td class=\"tal\">" + delta + "</td></tr>";
    });
    tb.innerHTML = rows;
    var day1 = new Date(prev.at).toLocaleDateString("zh-CN");
    var day2 = new Date(cur.at).toLocaleDateString("zh-CN");
    note.textContent = "「上一版」" + (prev.name || "") + "（" + day1 + "）→「最新一版」" + (cur.name || "") + "（" + day2 + "）。蓝色行是有变化；建议存方案时名字带上月份（如「10 月」），月底回来看这一版。";
  }

  /* ---------------- 购房一次性支出 ---------------- */
  function calcHouseCash() {
    var price = Math.max(0, num($("hcx-price"), 0));
    var dpRate = Math.min(100, Math.max(0, num($("hcx-dp"), 30))) / 100;
    var deedR = Math.max(0, num($("hcx-deed"), 1.5)) / 100;
    var agentR = Math.max(0, num($("hcx-agent"), 2)) / 100;
    var fundR = Math.max(0, num($("hcx-fund"), 1)) / 100;
    var odd = Math.max(0, num($("hcx-odd"), 0));
    var deco = Math.max(0, num($("hcx-deco"), 0));
    var furn = Math.max(0, num($("hcx-furn"), 0));
    var move = Math.max(0, num($("hcx-move"), 0));
    var need = Math.max(0, num($("hcx-need"), 0));
    var cash = Math.max(0, num($("hcx-cash"), 0));

    var dp = price * dpRate;
    var deed = price * deedR, agent = price * agentR, fund = price * fundR;
    var sign = dp + deed + agent + fund + odd;
    var live = deco + furn + move;
    var emg = need * 6;
    var total = sign + live + emg;
    var gap = cash - total;
    var dpGap = cash - sign;
    var ratio = price > 0 ? (sign + live) / price : 0;
    var k = dpRate + deedR + agentR + fundR;
    var cap = k > 0 ? Math.max(0, (cash - odd - live - emg) / k) : 0;

    var big = $("hcx-big");
    if (big) big.textContent = fmt(sign);
    var dpo = $("hcx-dpout");
    if (dpo) dpo.textContent = money(dp) + " 元（" + pct(dpRate, 0) + "）";
    var taxo = $("hcx-tax");
    if (taxo) taxo.textContent = money(deed + agent + fund + odd) + " 元（占房价 " + (price > 0 ? pct((deed + agent + fund + odd) / price, 1) : "—") + "）";
    var liveo = $("hcx-live");
    if (liveo) liveo.textContent = money(live) + " 元";
    var emgo = $("hcx-emg");
    if (emgo) emgo.textContent = money(emg) + " 元";
    var ratioo = $("hcx-ratio");
    if (ratioo) ratioo.textContent = pct(ratio, 1) + "（首付＋税费＋装修）";
    var enough = $("hcx-enough");
    if (enough) {
      if (gap >= 0) enough.textContent = "够，还剩 " + money(gap) + " 元";
      else if (dpGap >= 0) enough.textContent = "签字够，装修缺口 " + money(-gap) + " 元";
      else enough.textContent = "不够，签字就缺 " + money(-dpGap) + " 元";
    }
    var capo = $("hcx-cap");
    if (capo) capo.textContent = money(cap) + " 元（保留 6 个月应急金后）";

    var tb = $("hcx-body");
    if (tb) {
      var rows = [
        ["首付", pct(dpRate, 0) + " × 成交价", dp],
        ["契税", pct(deedR, 2) + " × 成交价", deed],
        ["中介费", pct(agentR, 2) + " × 成交价", agent],
        ["维修基金", pct(fundR, 2) + " × 成交价", fund],
        ["评估/公证/工本", "定额", odd],
        ["装修", "定额", deco],
        ["家具家电", "定额", furn],
        ["搬家杂费", "定额", move],
        ["应急金", "6 × 月必需", emg],
        ["合计", "签字＋入住＋缓冲", total]
      ];
      var h = "";
      for (var i = 0; i < rows.length; i++) {
        var last = i === rows.length - 1;
        h += "<tr" + (last ? " class=\"c-soft\"" : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td class=\"tal\">"
          + rows[i][1] + "</td><td>" + money(rows[i][2]) + "</td></tr>";
      }
      tb.innerHTML = h;
    }

    var note = $("hcx-note");
    if (note) {
      var tips = [];
      tips.push("签字当天要付 " + money(sign) + " 元（首付＋税费），加上装修家具搬家 "
        + money(live) + " 元和 6 个月应急金 " + money(emg) + " 元，一共 " + money(total) + " 元。");
      if (gap < 0) tips.push("按现在的现金还差 " + money(-gap) + " 元：要么降总价到 " + money(cap) + " 元以内，要么延后装修（装修通常在交房后 3–6 个月才花）。");
      tips.push("容易被漏掉的三笔：契税（按成交价，首套 90㎡ 以下常为 1%、以上 1.5%）、中介费（通常买方 1–2%）、维修基金（多为每平米几十元或房价 1% 上下）。");
      tips.push("二手房还可能涉及增值税与个税（满五唯一可免），本表未单列，可把金额并入「评估/公证/工本」。");
      note.textContent = tips.join(" ");
    }
    if ($("hcx-links")) $("hcx-links").innerHTML = "接着算："
      + linkTo("deed", { "dd-price": price }, "二手房税费细算")
      + linkTo("rentbuy", { "rb-price": price }, "买还是租")
      + linkTo("budget", { "bg-cash": cash }, "这个现金能买多贵")
      + linkTo("planner", { "pl-price": price }, "买完这套之后的体检");
  }

  /* ---------------- 组合规划：买这套房之后 ---------------- */
  function plScoreSave(r) { return r >= 0.3 ? 20 : r >= 0.2 ? 15 : r >= 0.1 ? 10 : 5; }
  function plScoreEmg(m) { return m >= 6 ? 20 : m >= 4 ? 15 : m >= 2 ? 10 : 5; }
  function plScoreLev(r) { return r < 0.3 ? 20 : r < 0.5 ? 15 : r < 0.7 ? 10 : 5; }
  function plScoreDsr(r) { return r < 0.3 ? 20 : r < 0.4 ? 15 : r < 0.5 ? 10 : 5; }
  function plScoreCov(r) { return r >= 1 ? 20 : r >= 0.7 ? 15 : r >= 0.4 ? 10 : 5; }
  function plRank(s) { return s >= 85 ? "优秀" : s >= 70 ? "良好" : s >= 55 ? "及格" : "需要调整"; }

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

  /* ---------------- 家庭支出结构（套餐） ---------------- */
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

  /* ---------------- 12 个月记账小结 ---------------- */
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

  var MONTH_CATS = [["住（房贷/房租/物业）", "mt-c1", "#1e3a8a"], ["吃（餐饮/日用/超市）", "mt-c2", "#2563eb"],
    ["教育（学费/培训）", "mt-c3", "#7c3aed"], ["保险", "mt-c4", "#0891b2"], ["交通（车/打车/油）", "mt-c5", "#f97316"], ["其他（医疗/人情/娱乐）", "mt-c6", "#64748b"]];

  /* 72 格一键摊平：按上面 6 类的金额占比，把每个月的支出摊到 6 个分类里 */
  function fillMonthGrid() {
    var w = [], sum = 0, k, m;
    for (k = 1; k <= 6; k++) { var cv = Math.max(0, num($("mt-c" + k), 0)); w.push(cv); sum += cv; }
    if (sum <= 0) { w = [84000, 54000, 36000, 18000, 24000, 23000]; sum = w.reduce(function (x, y) { return x + y; }, 0); }
    var filled = 0;
    for (m = 1; m <= 12; m++) {
      var t = Math.max(0, num($("mt-m" + m), 0));
      if (t <= 0) continue;
      var acc = 0;
      for (k = 1; k <= 6; k++) {
        var el = $("mtg-" + m + "-" + k);
        if (!el) continue;
        var v = k < 6 ? Math.round(t * w[k - 1] / sum / 10) * 10 : Math.max(0, t - acc);
        el.value = v;
        acc += v;
      }
      filled++;
    }
    save();
    runCalc("monthly");
    toast("已按 6 类占比摊平 " + filled + " 个月（每行合计＝该月支出），再按实际改几格即可。", 4200);
  }
  function readMonthGrid() {
    var mat = [], total = 0, filled = 0;
    for (var m = 1; m <= 12; m++) {
      var row = [], rowSum = 0;
      for (var k = 1; k <= 6; k++) {
        var v = Math.max(0, num($("mtg-" + m + "-" + k), 0));
        row.push(v); rowSum += v;
      }
      if (rowSum > 0) filled++;
      total += rowSum;
      mat.push(row);
    }
    return { mat: mat, total: total, filled: filled };
  }

  function drawMonthStack(arr, sum, outTotal) {
    var cv = $("mt-stack-chart");
    if (!cv || !cv.getContext) return;
    var grid = readMonthGrid();
    if ($("mtg-note")) {
      $("mtg-note").textContent = grid.total <= 0
        ? "这里不填也能用（上面的结构图会按各月支出占比摊算）。想更准，就把每月 6 类分别填上。"
        : "逐月分类合计 " + money(grid.total) + " 元，" + (Math.abs(grid.total - outTotal) < 1 ? "和全年支出对得上。" : "和全年支出（" + money(outTotal) + " 元）差 " + money(Math.abs(grid.total - outTotal)) + " 元。")
          + " 已填 " + grid.filled + "/12 个月" + (grid.filled < 12 ? "，没填的月份不参与画图。" : "。");
    }
    if ($("mt-links")) $("mt-links").innerHTML = "把这一年的分类搬过去体检："
      + linkTo("bundle", {
        "bxsp-inc": num($("mt-inc"), 0), "bxsp-inc2": 0,
        /* 全年分类金额换成月均，支出结构是按月算的 */
        "bxsp-house": num($("mt-c1"), 0) / 12, "bxsp-food": num($("mt-c2"), 0) / 12, "bxsp-edu": num($("mt-c3"), 0) / 12,
        "bxsp-ins": num($("mt-c4"), 0) / 12, "bxsp-car": num($("mt-c5"), 0) / 12, "bxsp-other": num($("mt-c6"), 0) / 12
      }, "支出结构体检");
    var dpr = Math.min(2, window.devicePixelRatio || 1), w = 720, hgt = 210;
    cv.width = w * dpr; cv.height = hgt * dpr;
    cv.style.width = "100%"; cv.style.height = "210px";
    var g = cv.getContext("2d");
    g.setTransform(1, 0, 0, 1, 0, 0); g.scale(dpr, dpr);
    g.clearRect(0, 0, w, hgt);
    var i, k, outs = [];
    for (i = 1; i <= 12; i++) outs.push(Math.max(0, num($("mt-m" + i), 0)));
    var real = grid.total > 0;
    if (!real && (sum <= 0 || outTotal <= 0)) {
      g.fillStyle = "#94a3b8"; g.font = "11px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
      g.textAlign = "center"; g.fillText("先填上面的分类金额", w / 2, hgt / 2);
      return;
    }
    var pad = 24, base = hgt - 22, max = 0, monthTotals = [];
    for (i = 0; i < 12; i++) {
      var mt = 0;
      if (real) { for (k = 0; k < 6; k++) mt += grid.mat[i][k]; }
      else { mt = outs[i] / outTotal * sum; }
      monthTotals.push(mt);
      max = Math.max(max, mt);
    }
    if (max <= 0) max = 1;
    var bw = (w - pad * 2) / 12 - 6;
    for (i = 0; i < 12; i++) {
      var y = base, x = pad + i * (bw + 6);
      for (k = 0; k < 6; k++) {
        var part = real ? grid.mat[i][k] : monthTotals[i] * (arr[k].v / sum);
        if (part <= 0) continue;
        var ph = (part / max) * (base - 18);
        y -= ph;
        g.fillStyle = MONTH_CATS[k][2]; g.fillRect(x, y, bw, Math.max(0, ph));
      }
      g.fillStyle = "#94a3b8"; g.font = "10px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
      g.textAlign = "center"; g.fillText(String(i + 1), x + bw / 2, hgt - 8);
    }
    g.fillStyle = "#64748b"; g.font = "10px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
    g.textAlign = "left";
    g.fillText(real ? "（逐月实填）" : "（按占比摊算，仅供参考）", pad, 12);
  }

  function drawMonthCats(outTotal) {
    var arr = [], i, sum = 0;
    for (i = 0; i < MONTH_CATS.length; i++) {
      var v = Math.max(0, num($(MONTH_CATS[i][1]), 0));
      arr.push({ name: MONTH_CATS[i][0], v: v, color: MONTH_CATS[i][2] });
      sum += v;
    }
    var h = "";
    for (i = 0; i < arr.length; i++) {
      h += "<tr><td class=\"tal\">" + arr[i].name + "</td><td>" + money(arr[i].v) + "</td><td>"
        + fmt(sum > 0 ? arr[i].v / sum * 100 : 0) + "%</td><td>" + money(arr[i].v / 12) + "</td></tr>";
    }
    if ($("mt-cat-body")) $("mt-cat-body").innerHTML = h;
    var cv = $("mt-cat-chart");
    if (cv && cv.getContext) {
      var dpr = Math.min(2, window.devicePixelRatio || 1), w = 720, hgt = 120;
      cv.width = w * dpr; cv.height = hgt * dpr;
      cv.style.width = "100%"; cv.style.height = "120px";
      var g = cv.getContext("2d");
      g.setTransform(1, 0, 0, 1, 0, 0); g.scale(dpr, dpr);
      g.clearRect(0, 0, w, hgt);
      var x = 12, bw = w - 24, y0 = 34, bh = 26;
      if (sum <= 0) {
        g.fillStyle = "#94a3b8"; g.font = "11px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
        g.textAlign = "center"; g.fillText("填一下上面的分类金额，这里会画出结构条", w / 2, 60);
      } else {
        for (i = 0; i < arr.length; i++) {
          var wPiece = bw * arr[i].v / sum;
          g.fillStyle = arr[i].color; g.fillRect(x, y0, Math.max(0, wPiece), bh);
          if (wPiece > 46) {
            g.fillStyle = "#ffffff"; g.font = "11px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
            g.textAlign = "left"; g.fillText(fmt(arr[i].v / sum * 100) + "%", x + 6, y0 + 17);
          }
          x += wPiece;
        }
        var lx = 12;
        g.font = "10.5px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif"; g.textAlign = "left";
        for (i = 0; i < arr.length; i++) {
          g.fillStyle = arr[i].color; g.fillRect(lx, y0 + bh + 14, 8, 8);
          g.fillStyle = "#475569"; g.fillText(arr[i].name.replace(/（.*?）/g, ""), lx + 12, y0 + bh + 22);
          lx += g.measureText(arr[i].name.replace(/（.*?）/g, "")).width + 34;
        }
      }
    }
    drawMonthStack(arr, sum, outTotal);
    if ($("mt-cat-note")) $("mt-cat-note").textContent = sum <= 0
      ? "不填也能用，只是看不到支出结构。填了以后可以对比「住不超过 30%、教育 10–15%」这类经验区间。"
      : "分类合计 " + money(sum) + " 元，" + (Math.abs(sum - outTotal) < 1 ? "和全年支出对得上。" : "和全年支出（" + money(outTotal) + " 元）差 " + money(Math.abs(sum - outTotal)) + " 元，可能有一次性支出没归类。")
        + " 结构参考：住 25–30%、吃 15–20%、教育 10–15%、保险 5–10%、交通 5–10%。";
  }

  function drawnMonthlyChart(incomes, outs) {
    var cv = $("mt-chart");
    if (!cv || !cv.getContext) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = 720, hgt = 180;
    cv.width = w * dpr; cv.height = hgt * dpr;
    cv.style.width = "100%"; cv.style.height = "180px";
    var g = cv.getContext("2d");
    g.setTransform(1, 0, 0, 1, 0, 0); g.scale(dpr, dpr);
    g.clearRect(0, 0, w, hgt);
    var pad = 26, base = hgt - 22, max = 0, i;
    for (i = 0; i < 12; i++) max = Math.max(max, outs[i], incomes[i]);
    if (max <= 0) max = 1;
    var bw = (w - pad * 2) / 12 - 6;
    for (i = 0; i < 12; i++) {
      var bh = Math.max(1, (outs[i] / max) * (base - 16));
      var x = pad + i * (bw + 6), y = base - bh;
      g.fillStyle = outs[i] > incomes[i] ? "#dc2626" : "#93b4f7";
      g.fillRect(x, y, bw, bh);
      g.fillStyle = "#94a3b8"; g.font = "10px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
      g.textAlign = "center"; g.fillText(String(i + 1), x + bw / 2, hgt - 8);
      var iy = base - Math.min(1, incomes[i] / max) * (base - 16);
      g.strokeStyle = "#1e3a8a"; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(x - 1, iy); g.lineTo(x + bw + 1, iy); g.stroke();
    }
    g.fillStyle = "#1e3a8a"; g.font = "10px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
    g.textAlign = "left"; g.fillText("短横线＝当月收入", pad - 4, 12);
  }

  /* ---------------- 年度对比（最多 5 年） ---------------- */
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

  function drawnYearChart(ys, fc, cid, hpx) {
    var cv = $(cid || "yc-chart");
    if (!cv || !cv.getContext || !ys.length) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = 720, hgt = hpx || 200;
    cv.width = w * dpr; cv.height = hgt * dpr;
    cv.style.width = "100%"; cv.style.height = hgt + "px";
    var g = cv.getContext("2d");
    g.setTransform(1, 0, 0, 1, 0, 0); g.scale(dpr, dpr);
    g.clearRect(0, 0, w, hgt);
    var padL = 34, padR = 14, padT = 22, base = hgt - 24, max = 0, i;
    for (i = 0; i < ys.length; i++) max = Math.max(max, ys[i].inc, ys[i].out, ys[i].asset);
    if (fc) max = Math.max(max, fc.inc, fc.out, fc.asset);
    if (max <= 0) max = 1;
    var pts = ys.length + (fc ? 1 : 0);
    var stepX = pts > 1 ? (w - padL - padR) / (pts - 1) : 0;
    var series = [
      { key: "inc", color: "#1e3a8a", label: "收入" },
      { key: "out", color: "#f97316", label: "支出" },
      { key: "asset", color: "#16a34a", label: "资产" }
    ];
    g.strokeStyle = "#e2e8f0"; g.lineWidth = 1;
    for (i = 0; i <= 3; i++) {
      var y = padT + (base - padT) * i / 3;
      g.beginPath(); g.moveTo(padL, y); g.lineTo(w - padR, y); g.stroke();
    }
    for (i = 0; i < ys.length; i++) {
      g.fillStyle = "#94a3b8"; g.font = "10px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
      g.textAlign = "center"; g.fillText("第" + ys[i].n + "年", padL + i * stepX, hgt - 8);
    }
    if (fc) {
      g.fillStyle = "#94a3b8"; g.font = "10px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
      g.textAlign = "center"; g.fillText("预测", padL + ys.length * stepX, hgt - 8);
    }
    for (var sIdx = 0; sIdx < series.length; sIdx++) {
      var s0 = series[sIdx];
      g.strokeStyle = s0.color; g.lineWidth = 2; g.beginPath();
      for (i = 0; i < ys.length; i++) {
        var x = padL + i * stepX, yy = base - (ys[i][s0.key] / max) * (base - padT);
        if (i === 0) g.moveTo(x, yy); else g.lineTo(x, yy);
      }
      g.stroke();
      g.fillStyle = s0.color;
      for (i = 0; i < ys.length; i++) {
        var x2 = padL + i * stepX, y2 = base - (ys[i][s0.key] / max) * (base - padT);
        g.beginPath(); g.arc(x2, y2, 2.6, 0, Math.PI * 2); g.fill();
      }
      if (fc) {
        var lx0 = padL + (ys.length - 1) * stepX, ly0 = base - (ys[ys.length - 1][s0.key] / max) * (base - padT);
        var lx1 = padL + ys.length * stepX, ly1 = base - (fc[s0.key] / max) * (base - padT);
        g.setLineDash([5, 4]); g.lineWidth = 2;
        g.beginPath(); g.moveTo(lx0, ly0); g.lineTo(lx1, ly1); g.stroke(); g.setLineDash([]);
        g.beginPath(); g.arc(lx1, ly1, 2.6, 0, Math.PI * 2); g.fill();
      }
      g.font = "11px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif"; g.textAlign = "left";
      g.fillText(s0.label, padL + sIdx * 46, 12);
    }
  }

  /* ---------------- 一页纸年度报告 ---------------- */
  /* 年报里的小图：从已存数据回放 */
  function drawReportCharts() {
    var doc = {};
    try { doc = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { doc = {}; }
    function g(k, d) {
      var el = $(k);
      if (el && el.value !== undefined && el.value !== "") return Math.max(0, Number(el.value) || 0);
      var v = doc[k];
      return v === undefined || v === null || v === "" ? d : Number(v) || 0;
    }
    var ys = [], i;
    for (i = 1; i <= 5; i++) {
      var inc = Math.max(0, g("yc-inc" + i, 0)), out = Math.max(0, g("yc-out" + i, 0)), ast = Math.max(0, g("yc-asset" + i, 0));
      if (inc <= 0 && out <= 0 && ast <= 0) continue;
      ys.push({ n: i, inc: inc, out: out, asset: ast, left: inc - out, rate: inc > 0 ? (inc - out) / inc * 100 : 0 });
    }
    if (ys.length >= 2 && $("yrp-chart1")) drawnYearChart(ys, null, "yrp-chart1", 180);
    else if ($("yrp-chart1")) {
      var c1 = $("yrp-chart1").getContext("2d");
      c1.clearRect(0, 0, 720, 180);
      c1.fillStyle = "#94a3b8"; c1.font = "11px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
      c1.textAlign = "center"; c1.fillText("到「年度对比」填上几年的数，这里会出现趋势线", 360, 92);
    }
    var cats = [], sum = 0, k;
    for (k = 1; k <= 6; k++) {
      var v = Math.max(0, g("mt-c" + k, 0));
      cats.push({ name: ["住", "吃", "教育", "保险", "交通", "其他"][k - 1], v: v, color: MONTH_CATS[k - 1][2] });
      sum += v;
    }
    var cv = $("yrp-chart2");
    if (cv && cv.getContext) {
      var dpr = Math.min(2, window.devicePixelRatio || 1), w = 720, hgt = 110;
      cv.width = w * dpr; cv.height = hgt * dpr;
      cv.style.width = "100%"; cv.style.height = "110px";
      var g2 = cv.getContext("2d");
      g2.setTransform(1, 0, 0, 1, 0, 0); g2.scale(dpr, dpr);
      g2.clearRect(0, 0, w, hgt);
      if (sum <= 0) {
        g2.fillStyle = "#94a3b8"; g2.font = "11px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
        g2.textAlign = "center"; g2.fillText("到「12 个月小结」填一下分类金额", w / 2, 58);
      } else {
        var x = 12, bwid = w - 24, y0 = 26, bh = 24;
        for (k = 0; k < cats.length; k++) {
          var piece = bwid * cats[k].v / sum;
          g2.fillStyle = cats[k].color; g2.fillRect(x, y0, Math.max(0, piece), bh);
          if (piece > 44) {
            g2.fillStyle = "#fff"; g2.font = "11px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
            g2.textAlign = "left"; g2.fillText(fmt(cats[k].v / sum * 100) + "%", x + 6, y0 + 16);
          }
          x += piece;
        }
        var lx = 12;
        g2.font = "10.5px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif"; g2.textAlign = "left";
        for (k = 0; k < cats.length; k++) {
          g2.fillStyle = cats[k].color; g2.fillRect(lx, y0 + bh + 12, 8, 8);
          g2.fillStyle = "#475569"; g2.fillText(cats[k].name, lx + 12, y0 + bh + 20);
          lx += g2.measureText(cats[k].name).width + 32;
        }
      }
    }
    if ($("yrp-charts-note")) $("yrp-charts-note").textContent =
      (ys.length >= 2 ? "趋势图用的是「年度对比」里的 " + ys.length + " 年数据；" : "趋势图还没有数据；")
      + (sum > 0 ? "结构图用的是「12 个月小结」的分类金额。" : "结构图还没有数据。")
      + " 想改就先回那两个模块改，再回来看这份报告——打印/存 PDF 时会连图一起带走。";
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

  /* ============ 存货计价对比（先进先出 vs 加权平均） ============ */
  function calcFifoCost() {
    var bq = Math.max(0, num($("fifo-begq"), 0));
    var bp = Math.max(0, num($("fifo-begp"), 0));
    var iq = Math.max(0, num($("fifo-inq"), 0));
    var ip = Math.max(0, num($("fifo-inp"), 0));
    var sold = Math.max(0, num($("fifo-sold"), 0));
    var price = Math.max(0, num($("fifo-price"), 0));
    var totalQ = bq + iq;
    if (!(totalQ > 0)) {
      ["fifo-big","fifo-cogs-fifo","fifo-cogs-wa","fifo-end-fifo","fifo-end-wa","fifo-unit","fifo-gp","fifo-np"].forEach(function(id){ $(id).textContent = "—"; });
      $("fifo-note").textContent = "把期初数量或本期购入数量填上。";
      return;
    }
    var sold2 = Math.min(sold, totalQ);
    var begCost = bq * bp, inCost = iq * ip, totalCost = begCost + inCost;
    var waUnit = totalCost / totalQ;
    var cogsWa = sold2 * waUnit;
    var endWa = totalCost - cogsWa;
    var cogsFifo, endFifo;
    if (sold2 <= bq) {
      cogsFifo = sold2 * bp; endFifo = totalCost - cogsFifo;
    } else {
      cogsFifo = bq * bp + (sold2 - bq) * ip; endFifo = (totalQ - sold2) * ip;
    }
    var diff = cogsWa - cogsFifo;             // 加权 − 先进先出
    var gpDiff = -diff;                        // 毛利差额：先进先出 − 加权
    var npDiff = gpDiff * 0.75;
    $("fifo-cogs-fifo").textContent = money(cogsFifo);
    $("fifo-cogs-wa").textContent = money(cogsWa);
    $("fifo-end-fifo").textContent = money(endFifo);
    $("fifo-end-wa").textContent = money(endWa);
    $("fifo-unit").textContent = money(waUnit) + " / 件";
    $("fifo-big").textContent = money(diff);
    $("fifo-gp").textContent = money(gpDiff);
    $("fifo-np").textContent = money(npDiff);
    $("fifo-note").textContent = diff > 0.005
      ? "进货价在涨：加权平均把新老成本一锅端，销货成本比先进先出高 " + money(diff) + " 元、期末库存低 " + money(diff) + " 元；先进先出毛利高、更像「先买的先卖」。"
      : (diff < -0.005
        ? "进货价在跌：加权平均的销货成本反而更低。"
        : "两种方法算出来一样（单价没变）。") + " 所得税上存货计价方法一经选定不得随意变更。";
  }

  /* ============ 试算平衡表 ============ */
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

  /* ============ 季度企业所得税预缴 ============ */
  function calcCitPrep() {
    var income = Math.max(0, num($("cit-income"), 0));
    var cost = Math.max(0, num($("cit-cost"), 0));
    var expense = Math.max(0, num($("cit-expense"), 0));
    var other = num($("cit-other"), 0);
    var adjust = Math.max(0, num($("cit-adjust"), 0));
    var loss = Math.max(0, num($("cit-loss"), 0));
    var prepaid = Math.max(0, num($("cit-prepaid"), 0));
    var rate = Math.max(0, num($("cit-rate"), 25)) / 100;
    var profit = income - cost - expense + other;
    var taxable = Math.max(0, profit + adjust - loss);
    var tax = taxable * rate;
    var due = tax - prepaid;
    $("cit-profit").textContent = money(profit);
    $("cit-taxable").textContent = money(taxable);
    $("cit-tax").textContent = money(tax);
    $("cit-burden").textContent = income > 0 ? pct(tax / income) : "—";
    $("cit-big").textContent = money(due);
    $("cit-note").textContent = due >= 0
      ? "累计口径下还要补缴 " + money(due) + " 元。季度预缴按「累计数」算，不是每季度利润单独乘税率；亏损季度可零申报，下季度累计转正再缴。"
      : "累计已多缴 " + money(-due) + " 元，可以留抵以后季度，或次年汇算清缴时申请退税。";
  }

  /* ============ 成本性态（高低点法） ============ */
  function calcHlCost() {
    var hq = Math.max(0, num($("hlc-hq"), 0));
    var hc = Math.max(0, num($("hlc-hc"), 0));
    var lq = Math.max(0, num($("hlc-lq"), 0));
    var lc = Math.max(0, num($("hlc-lc"), 0));
    var pq = Math.max(0, num($("hlc-pq"), 0));
    if (!(hq > lq)) {
      ["hlc-big","hlc-vc","hlc-fc","hlc-eq","hlc-vr"].forEach(function(id){ $(id).textContent = "—"; });
      $("hlc-note").textContent = "最高业务量要大于最低业务量。";
      return;
    }
    var b = (hc - lc) / (hq - lq);
    var a = hc - b * hq;
    var y = a + b * pq;
    $("hlc-vc").textContent = money(b) + " / 件";
    $("hlc-fc").textContent = money(a);
    $("hlc-eq").textContent = "y = " + money(a) + " + " + money(b) + " × x";
    $("hlc-vr").textContent = y > 0 ? pct(b * pq / y) : "—";
    $("hlc-big").textContent = money(y);
    $("hlc-note").textContent = "按最高（" + money(hq) + "，成本 " + money(hc) + "）和最低（" + money(lq) + "，成本 " + money(lc) + "）两个点拆出来：单位变动成本 " + money(b) + " 元、固定成本 " + money(a) + " 元。预测 " + money(pq) + " 件的总成本 = " + money(y) + " 元。高低点法只看两头，中间月份波动被忽略，预算初筛够用，正式定价建议用回归。";
  }

  /* ===== 预算滚动预测 ===== */
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

  /* ===== 合并抵销进阶 ===== */
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

  /* ===== 综合税负预警 ===== */
  function calcTaxWarn() {
    var sales = Math.max(0, num($("tbw-sales"), 0));
    var inVat = Math.max(0, num($("tbw-input"), 0));
    var vatRate = Math.max(0, num($("tbw-vatrate"), 13)) / 100;
    var profit = Math.max(0, num($("tbw-profit"), 0));
    var itRate = Math.max(0, num($("tbw-itrate"), 25)) / 100;
    var paid = Math.max(0, num($("tbw-paid"), 0));
    var vatRef = Math.max(0, num($("tbw-vatref"), 3));
    var itRef = Math.max(0, num($("tbw-itref"), 1));
    var band = Math.max(0, num($("tbw-band"), 0.5));

    var outVat = sales * vatRate;
    var vat = outVat - inVat;
    var it = profit * itRate;
    var vatB = sales > 0 ? vat / sales * 100 : 0;
    var itB = sales > 0 ? it / sales * 100 : 0;
    var total = sales > 0 ? (vat + it) / sales * 100 : 0;

    function verdict(x, ref) {
      var lo = ref - band, hi = ref + band;
      if (x > hi) return { t: "偏高", d: "高于参考区间" };
      if (x < lo) return { t: "偏低", d: "低于参考区间" };
      return { t: "在区间内", d: "在参考区间内" };
    }
    var vv = verdict(vatB, vatRef), iv = verdict(itB, itRef);

    $("tbw-big").textContent = fmt(total, 2);
    $("tbw-vat").textContent = money(vat) + "（" + fmt(vatB, 2) + "%，参考 " + fmt(vatRef, 2) + "%）";
    $("tbw-vverdict").textContent = vv.t + "（" + vv.d + "）";
    $("tbw-it").textContent = money(it) + "（已缴 " + money(paid) + "，应补 " + money(Math.max(0, it - paid)) + "）";
    $("tbw-iverdict").textContent = iv.t + "（" + iv.d + "）";

    var rows = [
      ["增值税税负率", fmt(vatB, 2) + "%", fmt(vatRef, 2) + "%", fmt(vatRef - band, 2) + " ~ " + fmt(vatRef + band, 2) + "%", vv.t],
      ["所得税贡献率", fmt(itB, 2) + "%", fmt(itRef, 2) + "%", fmt(itRef - band, 2) + " ~ " + fmt(itRef + band, 2) + "%", iv.t],
      ["综合税负率", fmt(total, 2) + "%", fmt(vatRef + itRef, 2) + "%", "—", total > (vatRef + itRef + band * 2) ? "偏高" : total < (vatRef + itRef - band * 2) ? "偏低" : "在区间内"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td>" + rows[i][3] + "</td><td class=\"tal\">" + rows[i][4] + "</td></tr>";
    }
    $("tbw-body").innerHTML = html;

    var acts = [];
    if (vv.t === "偏低") acts.push("增值税税负率偏低——优先核对：有没有提前开票、未开票收入漏报、进项多取（备货/设备集中采购），把台账备好");
    if (vv.t === "偏高") acts.push("增值税税负率偏高——多为有销项没进项，确认供应商发票是否足额取得、加计抵减/即征即退是否应享未享");
    if (iv.t === "偏低") acts.push("所得税贡献率偏低——多为利润低或纳税调整不足，准备好毛利率与费用结构说明");
    if (iv.t === "偏高") acts.push("所得税贡献率偏高——核对成本费用发票、研发加计、小微/高新优惠是否漏享");
    if (!acts.length) acts.push("两税都在参考区间内，保持进销项与利润的匹配度即可");
    $("tbw-note").textContent = "行业参考值（增值税 " + fmt(vatRef, 2) + "%、所得税 " + fmt(itRef, 2) + "%）只是示例，以当地主管机关口径为准。税负是比值不是税：偏低调风险，偏高调利润。" + acts.join("；") + "。";
  }

  /* ===== 借款台账与利息测算 ===== */
  function calcLoanLedger() {
    var loans = [];
    for (var i = 1; i <= 3; i++) {
      var a = Math.max(0, num($("lnl-a" + i), 0));
      var r = Math.max(0, num($("lnl-r" + i), 0));
      var mo = Math.max(0, num($("lnl-m" + i), 0));
      if (a > 0) loans.push({ n: i, a: a, r: r, mo: mo });
    }
    var cap = Math.max(0, num($("lnl-cap"), 0));

    var tot = 0, yInt = 0;
    for (var j = 0; j < loans.length; j++) {
      tot += loans[j].a;
      yInt += loans[j].a * loans[j].r / 100;
    }
    var w = tot > 0 ? yInt / tot * 100 : 0;
    var mInt = yInt / 12;
    var capInt = mInt * cap;
    var expInt = yInt - capInt;

    $("lnl-big").textContent = fmt(w, 2);
    $("lnl-total").textContent = money(tot) + "（" + loans.length + " 笔）";
    $("lnl-mi").textContent = money(yInt) + " / " + money(mInt);
    $("lnl-capint").textContent = money(capInt) + "（月利息 × " + cap + " 个月）";
    $("lnl-expint").textContent = money(expInt);

    var next = null;
    for (var k = 0; k < loans.length; k++) {
      if (!next || loans[k].mo < next.mo) next = loans[k];
    }
    $("lnl-next").textContent = next ? "第 " + Math.round(next.mo) + " 个月：借款" + "①②③".charAt(next.n - 1) + " " + money(next.a) : "—";

    var html = "";
    for (var p = 0; p < loans.length; p++) {
      var L = loans[p];
      html += "<tr><td class=\"tal\">借款" + "①②③".charAt(L.n - 1) + "</td><td>" + money(L.a) + "</td><td>" + fmt(L.r, 2) + "%</td><td>" + Math.round(L.mo) + "</td><td>" + money(L.a * L.r / 100) + "</td><td>" + money(L.a * L.r / 100 / 12) + "</td></tr>";
    }
    html += "<tr class=\"c-info\"><td class=\"tal\">合计</td><td>" + money(tot) + "</td><td>" + fmt(w, 2) + "%</td><td>—</td><td>" + money(yInt) + "</td><td>" + money(mInt) + "</td></tr>";
    $("lnl-body").innerHTML = html;

    $("lnl-note").textContent = "加权平均利率 " + fmt(w, 2) + "% 是所有借款按金额加权的一年成本。利息资本化：专门借款先资本化（闲置收益可冲减），一般借款按加权平均利率；"
      + "本表按「月利息 × 资本化月数」粗算为 " + money(capInt) + "，实际要按累计资产支出加权平均。费用化部分进财务费用，直接影响当期利润。";
  }
  /* ===== 费用报销合规自查 ===== */
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

  /* ===== 合并报表递延所得税 ===== */
  function calcDTax() {
    var unreal = Math.max(0, num($("dtx-unreal"), 0));
    var buyRate = Math.max(0, num($("dtx-buy"), 25)) / 100;
    var sellRate = Math.max(0, num($("dtx-sell"), 15)) / 100;

    var dta = unreal * buyRate;
    var paid = unreal * sellRate;
    var taxEff = -dta;
    var ni = -unreal + dta;
    var spread = dta - paid;

    $("dtx-big").textContent = money(dta);
    $("dtx-diff").textContent = money(unreal) + "（存货账面 < 计税基础）";
    $("dtx-paid").textContent = money(paid) + "（销售方税率 " + pct(sellRate, 0) + "）";
    $("dtx-taxeff").textContent = "-" + money(dta) + "（抵减所得税费用）";
    $("dtx-ni").textContent = money(ni) + "（抵利润 -" + money(unreal) + " + 所得税费用抵减 " + money(dta) + "）";
    $("dtx-spread").textContent = money(spread) + (spread >= 0 ? "（DTA 大于单体已缴，将来按购买方税率多抵）" : "（DTA 小于单体已缴）");

    var rows = [
      ["抵销未实现利润", "-" + money(unreal), "借收入/贷成本、贷存货"],
      ["可抵扣暂时性差异", money(unreal), "账面价值 < 计税基础"],
      ["递延所得税资产", money(dta), "差异 × 购买方税率 " + pct(buyRate, 0)],
      ["单体已缴所得税", money(paid), "销售方已按 " + pct(sellRate, 0) + " 缴，税局不退"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td class=\"tal\">" + rows[i][2] + "</td></tr>";
    }
    $("dtx-body").innerHTML = html;

    $("dtx-note").textContent = "合并层面这笔内部利润不认，但单体已经缴了 " + money(paid) + " 的税，税局不会退；合并账上确认递延所得税资产 " + money(dta) + "，等于「预缴」挂在资产里，等存货真正对外卖出去时转回。"
      + "税率差 " + pct(sellRate, 0) + " → " + pct(buyRate, 0) + " 会让 DTA 与已缴差 " + money(Math.abs(spread)) + "，这是按购买方税率计量带来的正常结果，不是错账。";
  }

  /* ===== 存货减值与毛利联动 ===== */
  function calcInvImpair() {
    var sales = Math.max(0, num($("ivm-sales"), 0));
    var cogs = Math.max(0, num($("ivm-cogs"), 0));
    var a1 = Math.max(0, num($("ivm-a1"), 0));
    var a2 = Math.max(0, num($("ivm-a2"), 0));
    var a3 = Math.max(0, num($("ivm-a3"), 0));
    var p1 = Math.max(0, num($("ivm-p1"), 0)) / 100;
    var p2 = Math.max(0, num($("ivm-p2"), 0)) / 100;
    var p3 = Math.max(0, num($("ivm-p3"), 0)) / 100;

    var inv = a1 + a2 + a3;
    var imp1 = a1 * p1, imp2 = a2 * p2, imp3 = a3 * p3;
    var imp = imp1 + imp2 + imp3;
    var newCogs = cogs + imp;
    var gm = sales - newCogs;
    var gmargin = sales > 0 ? gm / sales : 0;
    var origMargin = sales > 0 ? (sales - cogs) / sales : 0;
    var drag = origMargin - gmargin;
    var impRate = inv > 0 ? imp / inv : 0;
    var oldPct = inv > 0 ? a3 / inv : 0;

    $("ivm-big").textContent = fmt(gmargin * 100, 2);
    $("ivm-imp").textContent = money(imp) + "（占库存 " + pct(impRate, 2) + "）";
    $("ivm-gm").textContent = money(gm) + "（毛利率 " + fmt(gmargin * 100, 2) + "%）";
    $("ivm-drag").textContent = fmt(drag * 100, 2) + " 个百分点（毛利少 " + money(imp) + "）";
    $("ivm-rate").textContent = pct(impRate, 2) + "（" + money(imp) + " ÷ " + money(inv) + "）";
    $("ivm-old").textContent = pct(oldPct, 2) + "（" + money(a3) + " 库存）";

    var rows = [
      ["90 天内", money(a1), pct(p1, 0), money(imp1)],
      ["91–180 天", money(a2), pct(p2, 0), money(imp2)],
      ["181 天以上", money(a3), pct(p3, 0), money(imp3)],
      ["合计", money(inv), "—", money(imp)]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr" + (i === 3 ? ' class="c-info"' : "") + "><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td>" + rows[i][3] + "</td></tr>";
    }
    $("ivm-body").innerHTML = html;

    $("ivm-note").textContent = "这笔减值 " + money(imp) + " 进当期损益，把毛利率从 " + fmt(origMargin * 100, 2) + "% 拖到 " + fmt(gmargin * 100, 2) + "%（" + fmt(drag * 100, 2) + " 个点）。"
      + (a3 > 0 ? "181 天以上库存 " + money(a3) + " 是最大雷区，计提了 " + money(imp3) + "，优先折价清掉或与供应商谈退回；" : "")
      + "会计计提当期纳税调增（DTA 只是推后不是省税），只有实际处置并留证据才能税前扣除。";
  }

  /* ===== 预算执行偏差预警 ===== */
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
  /* ===== 现金周转天数拆解 ===== */
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

  /* ===== 销售费用 ROI ===== */
  function calcSaleExp() {
    var sales = Math.max(0, num($("se-sales"), 0));
    var sales0 = Math.max(0, num($("se-sales0"), 0));
    var exp = Math.max(0, num($("se-exp"), 0));
    var exp0 = Math.max(0, num($("se-exp0"), 0));
    var margin = Math.min(100, Math.max(0, num($("se-margin"), 30))) / 100;

    var rate = sales > 0 ? exp / sales : 0;
    var rate0 = sales0 > 0 ? exp0 / sales0 : 0;
    var dE = exp - exp0;
    var dS = sales - sales0;
    var roi = dE > 0 ? dS * margin / dE : 0;
    var elas = dS > 0 && sales0 > 0 ? (exp0 > 0 ? (exp / exp0 - 1) / (sales / sales0 - 1) : 0) : 0;
    var newGm = dS * margin;
    var net = newGm - dE;

    $("se-big").textContent = fmt(roi, 2);
    $("se-rate").textContent = fmt(rate * 100, 2) + "% / " + fmt(rate0 * 100, 2) + "%";
    $("se-elas").textContent = fmt(elas, 2) + "（" + (elas < 1 ? "费效改善" : "费效变差") + "）";
    $("se-newgm").textContent = money(newGm) + "（增量收入 " + money(dS) + " × 毛利率 " + pct(margin, 0) + "）";
    $("se-net").textContent = money(net) + "（增量毛利 − 增量费用）";

    var rows = [
      ["销售收入", money(sales0), money(sales), (dS >= 0 ? "+" : "") + money(dS)],
      ["销售费用", money(exp0), money(exp), (dE >= 0 ? "+" : "") + money(dE)],
      ["销售费用率", fmt(rate0 * 100, 2) + "%", fmt(rate * 100, 2) + "%", (rate - rate0 >= 0 ? "+" : "") + fmt((rate - rate0) * 100, 2) + " 点"],
      ["边际毛利", "—", money(newGm), "增量收入 × 毛利率"]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html += "<tr><td class=\"tal\">" + rows[i][0] + "</td><td>" + rows[i][1] + "</td><td>" + rows[i][2] + "</td><td>" + rows[i][3] + "</td></tr>";
    }
    $("se-body").innerHTML = html;

    $("se-note").textContent = "边际 ROI " + fmt(roi, 2) + " 倍，即本期多花的 " + money(dE) + " 销售费用换回 " + money(newGm) + " 毛利，净赚 " + money(net) + "。"
      + (roi >= 1 ? "ROI &gt; 1，这波投入划算；" : "ROI &lt; 1，多花的费用连毛利都没赚回来，先停一停；")
      + "费用弹性 " + fmt(elas, 2) + (elas < 1 ? "（&lt;1，费用涨得比收入慢，方向健康）。" : "（&gt;1，费用跑得比收入快，要盯）。") + "不同渠道分开算，别让高效渠道补贴低效渠道。";
  }

  /* ===== 多部门费用分摊与考核 ===== */
  function calcDeptCost() {
    var names = ["销售部", "生产部", "管理部", "研发部"];
    var b = [], a = [];
    for (var i = 1; i <= 4; i++) {
      b.push(Math.max(0, num($("dc-b" + i), 0)));
      a.push(Math.max(0, num($("dc-a" + i), 0)));
    }
    var tb = 0, ta = 0;
    for (var j = 0; j < 4; j++) { tb += b[j]; ta += a[j]; }
    var diff = ta - tb;
    var rate = tb > 0 ? diff / tb : 0;

    function judge(r) {
      if (r > 0.10) return "🔴 超支";
      if (r > 0.05) return "🟡 超支";
      if (r < -0.10) return "🟢 大额节约";
      if (r < -0.05) return "🟢 节约";
      return "正常";
    }

    $("dc-big").textContent = (diff >= 0 ? "+" : "") + money(diff);
    $("dc-total").textContent = money(tb) + " / " + money(ta);
    $("dc-rate").textContent = (rate >= 0 ? "超支 " : "节约 ") + fmt(Math.abs(rate) * 100, 2) + "%";

    var worst = 0, worstR = -1;
    for (var k = 0; k < 4; k++) {
      var r = b[k] > 0 ? (a[k] - b[k]) / b[k] : 0;
      if (r > worstR) { worstR = r; worst = k; }
    }
    $("dc-worst").textContent = worstR > 0 ? names[worst] + "（超支 " + fmt(worstR * 100, 2) + "%）" : "都在预算内";

    var html = "";
    for (var p = 0; p < 4; p++) {
      var d = a[p] - b[p];
      var rr = b[p] > 0 ? d / b[p] : 0;
      html += "<tr><td class=\"tal\">" + names[p] + "</td><td>" + money(b[p]) + "</td><td>" + money(a[p]) + "</td><td>" + (d >= 0 ? "+" : "") + money(d) + "</td><td>" + (rr >= 0 ? "+" : "") + fmt(rr * 100, 2) + "%</td><td class=\"tal\">" + judge(rr) + "</td></tr>";
    }
    html += "<tr class=\"c-info\"><td class=\"tal\">合计</td><td>" + money(tb) + "</td><td>" + money(ta) + "</td><td>" + (diff >= 0 ? "+" : "") + money(diff) + "</td><td>" + (rate >= 0 ? "+" : "") + fmt(rate * 100, 2) + "%</td><td class=\"tal\">" + judge(rate) + "</td></tr>";
    $("dc-body").innerHTML = html;

    $("dcx-note").textContent = "总差异 " + (diff >= 0 ? "超支 " : "节约 ") + money(Math.abs(diff)) + "（" + fmt(Math.abs(rate) * 100, 2) + "%）。"
      + "费用中心考核看差异率不看绝对值：最该先问的是「" + names[worst] + "」——超支 " + fmt(worstR * 100, 2) + "%，要它说清是业务量涨了还是花冒了。"
      + "节约部门也要确认：是提效，还是没干活或把费用挂到了别的部门。";
  }

  /* ===== 存货盘点差异率趋势 ===== */
  function calcInvVar() {
    var inv = Math.max(0, num($("ivv-inv"), 0));
    var line = Math.max(0, num($("ivv-line"), 0.8));
    var d = [];
    for (var i = 1; i <= 6; i++) d.push(Math.max(0, num($("ivv-d" + i), 0)));
    var rates = d.map(function (x) { return inv > 0 ? x / inv * 100 : 0; });
    var total = 0;
    for (var j = 0; j < 6; j++) total += d[j];
    var avg = rates.reduce(function (s, x) { return s + x; }, 0) / 6;
    var f3 = (rates[0] + rates[1] + rates[2]) / 3;
    var l3 = (rates[3] + rates[4] + rates[5]) / 3;
    var over = 0;
    for (var k = 0; k < 6; k++) if (rates[k] > line) over++;

    $("ivv-big").textContent = fmt(avg, 2);
    $("ivv-total").textContent = money(total) + "（6 期累计）";
    $("ivv-trend").textContent = fmt(f3, 2) + "% vs " + fmt(l3, 2) + "%";
    var up = l3 - f3;
    $("ivv-verdict").textContent = up > 0.05 ? "🟡 上升（后 3 期高 " + fmt(up, 2) + " 点）" : up < -0.05 ? "🟢 下降" : "平稳";
    $("ivv-over").textContent = over + " 期（警戒线 " + fmt(line, 2) + "%）";

    var html = "";
    for (var p = 0; p < 6; p++) {
      var isOver = rates[p] > line;
      html += "<tr" + (isOver ? ' class="c-warn"' : "") + "><td class=\"tal\">第 " + (p + 1) + " 期</td><td>" + money(d[p]) + "</td><td>" + fmt(rates[p], 2) + "%</td><td class=\"tal\">" + (isOver ? "超线" : "正常") + "</td></tr>";
    }
    $("ivv-body").innerHTML = html;

    $("ivv-note").textContent = "平均差异率 " + fmt(avg, 2) + "%，累计盘亏 " + money(total) + "。趋势：前 3 期均值 " + fmt(f3, 2) + "% → 后 3 期 " + fmt(l3, 2) + "%（"
      + (up >= 0 ? "+" : "") + fmt(up, 2) + " 点）。" + (up > 0.05 ? "差异率在爬坡，别只看金额——先查出入库单据是否及时、盘点方法是否一致、监控有没有盲区。" : "趋势平稳，维持现有流程即可。")
      + "盘亏要在审批后做账务处理，人为损耗、失窃与自然损耗的账务和税务处理不一样。";
  }
  function calcAroverdue() {
    var rows = [], i;
    for (i = 1; i <= 4; i++) rows.push({
      amt: Math.max(0, num($("arv-a" + i), 0)),
      cr: Math.max(0, num($("arv-c" + i), 0)),
      dy: Math.max(0, num($("arv-d" + i), 0))
    });
    var rate = Math.min(100, Math.max(0, num($("arv-rate"), 6))) / 100;
    var tot = 0, od = 0, wd = 0, wc = 0, wov = 0, worst = null, worstScore = -1;
    for (i = 0; i < rows.length; i++) {
      var r = rows[i];
      var ov = Math.max(0, r.dy - r.cr);
      tot += r.amt;
      wd += r.dy * r.amt;
      wc += r.cr * r.amt;
      if (ov > 0) {
        od += r.amt;
        wov += ov * r.amt;
        var s = ov * r.amt;
        if (s > worstScore) { worstScore = s; worst = i; }
      }
    }
    var wAvgOd = od > 0 ? wov / od : 0;
    var wAvgD = tot > 0 ? wd / tot : 0;
    var wAvgC = tot > 0 ? wc / tot : 0;
    var cost = od > 0 ? od * (wAvgOd / 365) * rate : 0;
    $("arv-big").textContent = fmt(tot > 0 ? od / tot * 100 : 0, 2);
    $("arv-k1").textContent = money(tot) + " / " + money(od);
    $("arv-k2").textContent = fmt(wAvgOd, 2) + " 天";
    $("arv-k3").textContent = fmt(wAvgD, 2) + " 天";
    $("arv-k4").textContent = fmt(wAvgC, 2) + " 天";
    $("arv-k5").textContent = money(cost);
    $("arv-k6").textContent = worst === null ? "无逾期" : ("第 " + (worst + 1) + " 笔（逾期 " + fmt(rows[worst].dy - rows[worst].cr, 0) + " 天，金额 × 天数最大）");
    var tb = "";
    for (i = 0; i < rows.length; i++) {
      var r2 = rows[i], ov2 = Math.max(0, r2.dy - r2.cr);
      var cls = ov2 > 0 ? ' class="c-warn"' : "";
      tb += "<tr" + cls + "><td>" + (i + 1) + "</td><td>" + money(r2.amt) + "</td><td>" + fmt(r2.cr, 0) + "</td><td>" + fmt(r2.dy, 0) + "</td><td>" + fmt(ov2, 0) + "</td><td>" + (ov2 > 0 ? "逾期" : "按期") + "</td></tr>";
    }
    $("arv-body").innerHTML = tb;
    $("arv-note").textContent = "逾期金额占 " + fmt(tot > 0 ? od / tot * 100 : 0, 2) + "%，平均逾期 " + fmt(wAvgOd, 2) + " 天，DSO " + fmt(wAvgD, 2) + " 天。逾期不只是坏账风险，还按年化 " + pct(rate, 1) + " 吃掉资金收益；先催金额 × 逾期天数最大的那笔。";
  }
  function calcPayterms() {
    var amt = Math.max(0, num($("ppt-amount"), 1000000));
    var term = Math.max(0, num($("ppt-terms"), 30));
    var disc = Math.min(100, Math.max(0, num($("ppt-discount"), 2))) / 100;
    var dterm = Math.max(0, num($("ppt-discterms"), 10));
    var ext = Math.max(term, num($("ppt-extend"), 60));
    var rate = Math.min(100, Math.max(0, num($("ppt-rate"), 6))) / 100;
    var dd = amt * disc;
    var gap = Math.max(1, term - dterm);
    var ann = disc / (1 - disc) * 365 / gap;
    var gain20 = amt * gap / 365 * rate;
    var net = dd - gain20;
    var gain30 = amt * Math.max(0, ext - term) / 365 * rate;
    $("ppt-big").textContent = fmt(ann * 100, 2);
    $("ppt-k1").textContent = money(dd);
    $("ppt-k2").textContent = money(gain20);
    $("ppt-k3").textContent = money(net) + (net >= 0 ? "（拿折扣划算）" : "（拖账期划算）");
    $("ppt-k4").textContent = money(gain30);
    $("ppt-k5").textContent = net >= 0 ? (dterm + " 天内付款拿 " + pct(disc, 1) + " 折扣") : ("拖到 " + term + " 天账期更划算");
    $("ppt-note").textContent = "放弃折扣的真实代价 = " + pct(disc, 1) + " ÷ (1 − " + pct(disc, 1) + ") × 365 ÷ " + fmt(gap, 0) + " 天 = " + fmt(ann * 100, 2) + "%，远高于资金成本。延期付款能省利息但可能伤供应商关系与断供，只在现金紧张时用。";
  }
  function calcFxar() {
    var names = ["美元", "欧元", "港币", "日元"];
    var i, pls = [], end = 0, book = 0, tb = "";
    for (i = 1; i <= 4; i++) {
      var a = Math.max(0, num($("fxr-a" + i), 0));
      var r = Math.max(0, num($("fxr-r" + i), 0));
      var e = Math.max(0, num($("fxr-e" + i), 0));
      var pl = a * (e - r);
      pls.push(pl);
      end += a * e;
      book += a * r;
      tb += "<tr" + (pl < 0 ? ' class="c-warn"' : "") + "><td>" + names[i - 1] + "</td><td>" + fmt(a, 0) + "</td><td>" + fmt(r, 4) + "</td><td>" + fmt(e, 4) + "</td><td>" + money(pl) + "</td></tr>";
    }
    var net = 0; for (i = 0; i < 4; i++) net += pls[i];
    $("fxr-big").textContent = money(net);
    $("fxr-k1").textContent = money(end);
    $("fxr-k2").textContent = money(book);
    $("fxr-k3").textContent = money(pls[0]) + " / " + money(pls[1]);
    $("fxr-k4").textContent = money(pls[2]) + " / " + money(pls[3]);
    $("fxr-body").innerHTML = tb;
    $("fxr-note").textContent = "月末按期末汇率重估：净损益 " + money(net) + (net >= 0 ? "（收益）" : "（损失）") + "，进「财务费用——汇兑损益」。这是未实现损益，下月会随汇率转回；超毛利一半的单子建议锁汇。";
  }
  function calcFaimpair() {
    var cost = Math.max(0, num($("fai-cost"), 1000000));
    var dep = Math.max(0, num($("fai-dep"), 400000));
    var rec = Math.max(0, num($("fai-recover"), 550000));
    var had = Math.max(0, num($("fai-had"), 0));
    var years = Math.max(1, num($("fai-years"), 5));
    var tax = Math.min(100, Math.max(0, num($("fai-tax"), 25))) / 100;
    var bv = cost - dep;
    var imp = Math.max(0, bv - rec);
    var add = Math.max(0, imp - had);
    var after = bv - Math.max(imp, had);
    $("fai-big").textContent = money(add);
    $("fai-k1").textContent = money(bv);
    $("fai-k2").textContent = money(after);
    $("fai-k3").textContent = fmt(bv > 0 ? Math.max(imp, had) / bv * 100 : 0, 2) + "%";
    $("fai-k4").textContent = money(after / years) + "/年";
    $("fai-k5").textContent = money(add);
    $("fai-k6").textContent = money(-add * (1 - tax));
    $("fai-note").textContent = add > 0 ? ("可收回金额 " + money(rec) + " 低于账面 " + money(bv) + "，补提减值 " + money(add) + "。固定资产减值一经计提不得转回；会计减值当期纳税调增 " + money(add) + "，税后净利减少 " + money(add * (1 - tax)) + "。") : "未发生减值（可收回金额 ≥ 账面价值），无需计提。";
  }
  function calcCostbehav() {
    var qty = num($("cbh-qty"), 10000);
    var cm = num($("cbh-cm"), 600000);
    var names = ["房租物业", "水电能源", "销售佣金", "物流仓储"];
    var rows = [], f = 0, v = 0;
    for (var i = 1; i <= 4; i++) {
      var fi = num($("cbh-f" + i), 0), vi = num($("cbh-v" + i), 0);
      var vt = vi * qty;
      rows.push({ name: names[i - 1], f: fi, v: vi, vt: vt, tot: fi + vt });
      f += fi; v += vi;
    }
    var vt = v * qty, tot = f + vt, per = qty > 0 ? tot / qty : 0;
    var fshare = tot > 0 ? f / tot * 100 : 0;
    var op = cm - f, dol = op > 0 ? cm / op : 0;
    $("cbh-fshare").textContent = fmt(fshare);
    $("cbh-f").textContent = money(f);
    $("cbh-v").textContent = fmt(v) + " 元/件";
    $("cbh-vt").textContent = money(vt);
    $("cbh-tot").textContent = money(tot);
    $("cbh-per").textContent = money(per) + " /件";
    $("cbh-dol").textContent = fmt(dol) + " 倍";
    $("cbh-op").textContent = money(op);
    var tb = $("cbh-body");
    tb.innerHTML = "";
    rows.forEach(function (r) {
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + r.name + "</td><td>" + money(r.f) + "</td><td>" + fmt(r.v) + "</td><td>" + money(r.vt) + "</td><td>" + money(r.tot) + "</td>";
      tb.appendChild(tr);
    });
    $("cbh-note").textContent = "固定占比越高，业务量下滑时利润跌得越快（DOL=" + fmt(dol) + " 倍）。固定部分（房租、基本水电、保底物流）短期砍不动；变动部分（佣金、计件物流）会随业务量自动增减。想降本：先压单位变动费率，再谈固定费用的包干或按量阶梯计价。"
      + " 营业利润 = 边际贡献 " + money(cm) + " − 固定 " + money(f) + " = " + money(op) + "。";
  }
  function calcProfitcenter() {
    var c = [];
    for (var i = 1; i <= 2; i++) {
      var rev = num($("prc-a" + i), 0), vc = num($("prc-b" + i), 0), cf = num($("prc-c" + i), 0), uf = num($("prc-d" + i), 0);
      var cm = rev - vc, ctrl = cm - cf, cen = ctrl - uf;
      c.push({ rev: rev, cm: cm, ctrl: ctrl, cen: cen, cr: rev > 0 ? ctrl / rev * 100 : 0, cmr: rev > 0 ? cm / rev * 100 : 0 });
    }
    var rev = c[0].rev + c[1].rev, cm = c[0].cm + c[1].cm, ctrl = c[0].ctrl + c[1].ctrl, cen = c[0].cen + c[1].cen;
    var best = c[0].cr >= c[1].cr ? "中心 A（可控利润率 " + fmt(c[0].cr) + "%）" : "中心 B（可控利润率 " + fmt(c[1].cr) + "%）";
    var focus = c[0].cr <= c[1].cr ? "中心 A（可控利润率 " + fmt(c[0].cr) + "%）" : "中心 B（可控利润率 " + fmt(c[1].cr) + "%）";
    $("prc-ctrl").textContent = money(ctrl);
    $("prc-rev").textContent = money(rev);
    $("prc-cm").textContent = money(cm);
    $("prc-cen").textContent = money(cen);
    $("prc-best").textContent = best;
    $("prc-focus").textContent = focus;
    var tb = $("prc-body");
    tb.innerHTML = "";
    c.forEach(function (r, idx) {
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + (idx === 0 ? "A" : "B") + "</td><td>" + money(r.rev) + "</td><td>" + money(r.cm) + "</td><td>" + money(r.ctrl) + "</td><td>" + money(r.cen) + "</td><td>" + fmt(r.cr) + "%</td>";
      tb.appendChild(tr);
    });
    $("prc-note").textContent = "可控利润 = 收入 − 变动成本 − 该中心自己说了算的固定费用；总部分摊下来的（房租、总部费用）只列示、不考核，否则会冤枉把中心做好的负责人。"
      + " 两家边际贡献率都是 " + fmt(c[0].cmr) + "%（A）/" + fmt(c[1].cmr) + "%（B），但 B 可控固定重，可控利润率被压到 " + fmt(c[1].cr) + "%。先管可控固定费用最高的那家。";
  }
  function calcInvorder() {
    var demand = num($("ivo-demand"), 35000), safety = num($("ivo-safety"), 5000), price = num($("ivo-price"), 80);
    var names = ["90 天以内", "91–180 天", "181 天以上"];
    var rows = [], usable = 0, bad = 0, total = 0;
    for (var i = 1; i <= 3; i++) {
      var s = num($("ivo-s" + i), 0), p = num($("ivo-p" + i), 0) / 100;
      var u = s * p;
      rows.push({ name: names[i - 1], s: s, p: p * 100, u: u, share: 0 });
      usable += u; bad += s * (1 - p); total += s;
    }
    rows.forEach(function (r) { r.share = total > 0 ? r.s / total * 100 : 0; });
    var need = demand + safety;
    var order = Math.max(0, need - usable);
    $("ivo-order").textContent = fmt(order);
    $("ivo-usable").textContent = fmt(usable) + " 件";
    $("ivo-amt").textContent = money(order * price);
    $("ivo-bad").textContent = fmt(bad) + " 件";
    $("ivo-loss").textContent = money(bad * price);
    $("ivo-s3share").textContent = fmt(rows[2].share) + "%";
    $("ivo-s23share").textContent = fmt((rows[1].s + rows[2].s) / total * 100) + "%";
    $("ivo-advice").textContent = order > 0 ? ("先耗 181 天以上库存，再订 " + fmt(order) + " 件") : "库存够用，不用订货";
    var tb = $("ivo-body");
    tb.innerHTML = "";
    rows.forEach(function (r) {
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + r.name + "</td><td>" + fmt(r.s) + "</td><td>" + fmt(r.p) + "%</td><td>" + fmt(r.u) + "</td><td>" + fmt(r.share) + "%</td>";
      tb.appendChild(tr);
    });
    $("ivo-note").textContent = "现有库存 " + fmt(total) + " 件里能出良品 " + fmt(usable) + " 件；需求 + 安全库存 = " + fmt(need) + " 件，所以只需再订 " + fmt(order) + " 件（金额 " + money(order * price) + "）。"
      + " 181 天以上库存良品率最低（" + fmt(rows[2].p) + "%），" + fmt(rows[2].s) + " 件里有 " + fmt(rows[2].s * (1 - rows[2].p / 100)) + " 件会报废。老库存优先发出去，能把潜在报废损失从账面拉回现实。"
      + " 注意：良品率是估计值，实际以质检为准。";
  }
  function calcCreditterm() {
    var sales = num($("ct-sales"), 10000000), vc = num($("ct-vc"), 60) / 100, rate = num($("ct-rate"), 6) / 100;
    var bad30 = num($("ct-bad30"), 1) / 100, bad60 = num($("ct-bad60"), 2.5) / 100;
    var cm = sales * (1 - vc);
    function row(d, bad) {
      var occ = sales * vc * d / 365, cost = occ * rate, bl = sales * bad, ni = cm - cost - bl;
      return { d: d, occ: occ, cost: cost, bad: bl, ni: ni };
    }
    var r0 = row(0, 0), r30 = row(30, bad30), r60 = row(60, bad60);
    var best = r0.ni >= r30.ni && r0.ni >= r60.ni ? r0 : (r30.ni >= r60.ni ? r30 : r60);
    $("ct-best").textContent = money(best.ni);
    $("ct-ni0").textContent = money(r0.ni);
    $("ct-ni30").textContent = money(r30.ni);
    $("ct-ni60").textContent = money(r60.ni);
    $("ct-occ30").textContent = money(r30.occ);
    $("ct-occ60").textContent = money(r60.occ);
    $("ct-diff").textContent = money(r0.ni - r30.ni);
    $("ct-pick").textContent = (best === r0 ? "现款（0 天）" : (best === r30 ? "30 天账期" : "60 天账期"));
    var tb = $("ct-body");
    tb.innerHTML = "";
    [r0, r30, r60].forEach(function (r) {
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + (r.d === 0 ? "现款" : r.d + " 天账期") + "</td><td>" + money(r.occ) + "</td><td>" + money(r.cost) + "</td><td>" + money(r.bad) + "</td><td>" + money(r.ni) + "</td>";
      tb.appendChild(tr);
    });
    $("ct-note").textContent = "账期每拉长 30 天：占用资金按「销售额 × 变动成本率 × 天数 / 365」算，资金成本 = 占用 × 资金成本率；坏账 = 销售额 × 坏账率。"
      + " 本例 30 天比现款少赚 " + money(r0.ni - r30.ni) + "（资金成本 " + money(r30.cost) + " + 坏账 " + money(r30.bad) + "），60 天再少赚 " + money(r30.ni - r60.ni) + "。"
      + " 结论只在「账期长短不影响销量」的假设下成立；靠放账期换订单时，要把多卖的边际贡献一起算进去。";
  }

  var WF_KEY = "finance-calc-wfdone";
  var WF_DONE = {};
  function loadWfDone() { try { WF_DONE = JSON.parse(localStorage.getItem(WF_KEY) || "{}"); } catch (e) { WF_DONE = {}; } }
  function refreshWfBadge() {
    var tab = document.querySelector('.tab[data-tab="workflow"]');
    if (!tab) return;
    var man = 0;
    try { man = Object.keys(JSON.parse(localStorage.getItem(WF_MAN_KEY) || "{}")).length; } catch (e) {}
    tab.setAttribute("data-wfbadge", man > 0 ? "本月 " + man : "");
  }
  function wfSave() { try { localStorage.setItem(WF_KEY, JSON.stringify(WF_DONE)); } catch (e) {} }
  function getWfDone() { return WF_DONE; }
  function recordWf(name) {
    var links = document.querySelectorAll("#panel-workflow a[href^='#']");
    var known = {};
    for (var i = 0; i < links.length; i++) {
      var h = (links[i].getAttribute("href") || "").replace(/^#/, "").split("?")[0];
      known[h] = 1;
    }
    if (known[name] && !WF_DONE[name]) { WF_DONE[name] = 1; wfSave(); }
  }
  var WF_MAN_KEY = "finance-calc-wfman";
  var WF_MAN = {};
  function loadWfMan() { try { WF_MAN = JSON.parse(localStorage.getItem(WF_MAN_KEY) || "{}"); } catch (e) { WF_MAN = {}; } }
  function wfManSave() { try { localStorage.setItem(WF_MAN_KEY, JSON.stringify(WF_MAN)); } catch (e) {} }
  function getWfMan() { return WF_MAN; }
  function toggleWfMan(key) { if (WF_MAN[key]) { delete WF_MAN[key]; } else { WF_MAN[key] = 1; } wfManSave(); }
  function clearWfMan() { WF_MAN = {}; wfManSave(); }
  function calcWorkflow() {
    loadWfDone();
    loadWfMan();
    var wfDone = getWfDone();
    var wfMan = getWfMan();
    var links = document.querySelectorAll("#panel-workflow a[href^='#']");
    var total = links.length, done = 0, man = 0;
    var carry = {
      mgmtpack: [["pl-rev", "pk-rev"]],
      bplan: [["pk-rev", "bpl-rev"]],
      rollfc: [["bpl-rev", "rl-bud"]],
      budgetalert: [["bpl-rev", "bga-budinc"], ["bpl-opex", "bga-budexp"], ["rbg-budinc", "bga-budinc"], ["rbg-budexp", "bga-budexp"]],
      vatcheck: [["vd-out", "vchk-out"], ["vd-in", "vchk-in"]],
      ratios: [["pl-rev", "rt-rev"], ["pl-cogs", "rt-cogs"]],
      rollbudget: [["bpl-rev", "rbg-budinc"], ["bpl-opex", "rbg-budexp"], ["rl-bud", "rbg-budinc"], ["bga-budinc", "rbg-budinc"], ["bga-budexp", "rbg-budexp"]],
      taxadj: [["cit-income", "txj-rev"], ["cit-adjust", "txj-ad"]],
      taxwarn: [["txj-rev", "tbw-sales"], ["txj-profit", "tbw-profit"]]
    };
    var st = window.FC ? (window.FC.STORED || {}) : {};
    var ed = window.FC ? (window.FC.EDITED || {}) : {};
    for (var i = 0; i < links.length; i++) {
      var h = (links[i].getAttribute("href") || "").replace(/^#/, "").split("?")[0];
      var c = carry[h], qm = {};
      if (c) {
        for (var ci = 0; ci < c.length; ci++) {
          var sv = st[c[ci][0]];
          if (ed[c[ci][0]] && sv !== undefined && sv !== null && sv !== "") qm[c[ci][1]] = String(sv);
        }
      }
      var qs = [];
      for (var qk in qm) { if (Object.prototype.hasOwnProperty.call(qm, qk)) qs.push(encodeURIComponent(qk) + "=" + encodeURIComponent(qm[qk])); }
      links[i].setAttribute("href", "#" + h + (qs.length ? "?" + qs.join("&") : ""));
      if (wfDone[h]) { links[i].classList.add("wf-done"); done++; } else { links[i].classList.remove("wf-done"); }
    }
    var dets = document.querySelectorAll("#panel-workflow .card:not(.res) details");
    var stepSeq = 0;
    for (var j = 0; j < dets.length; j++) {
      var al = dets[j].querySelectorAll("a[href^='#']");
      var dt = 0, mt = 0;
      for (var k = 0; k < al.length; k++) {
        var hh = (al[k].getAttribute("href") || "").replace(/^#/, "").split("?")[0];
        if (wfDone[hh]) dt++;
        var key = j + "-" + k;
        var prevTick = al[k].nextSibling;
        var tickEl = (prevTick && prevTick.nodeType === 1 && prevTick.classList && prevTick.classList.contains("wf-tick")) ? prevTick : null;
        if (!tickEl) {
          tickEl = document.createElement("button");
          tickEl.type = "button";
          tickEl.className = "wf-tick";
          tickEl.setAttribute("aria-label", "标记本月已完成");
          tickEl.textContent = "✓";
          al[k].parentNode.insertBefore(tickEl, al[k].nextSibling);
        }
        tickEl.setAttribute("data-step", key);
        if (wfMan[key]) { tickEl.classList.add("on"); mt++; man++; } else { tickEl.classList.remove("on"); }
        stepSeq++;
      }
      var sum = dets[j].querySelector("summary");
      var oldB = sum.querySelector(".wfp");
      if (oldB) oldB.remove();
      var oldM = sum.querySelector(".wfpm");
      if (oldM) oldM.remove();
      var b = document.createElement("span");
      b.className = "wfp" + (dt === al.length && al.length > 0 ? " wfp-full" : "");
      b.textContent = dt + "/" + al.length;
      var m = document.createElement("span");
      m.className = "wfpm" + (mt === al.length && al.length > 0 ? " wfpm-full" : "");
      m.textContent = "本月 " + mt + "/" + al.length;
      sum.appendChild(b);
      sum.appendChild(m);
    }
    if ($("wf-big")) $("wf-big").textContent = done + "/" + total;
    if ($("wf-donekv")) $("wf-donekv").textContent = done + " 步";
    if ($("wf-pctkv")) $("wf-pctkv").textContent = (total ? pct(done / total, 1) : "0.0%");
    if ($("wf-mankv")) $("wf-mankv").textContent = man + "/" + total;
    var nextA = null;
    for (var j2 = 0; j2 < dets.length && !nextA; j2++) {
      var al2 = dets[j2].querySelectorAll("a[href^='#']");
      for (var k2 = 0; k2 < al2.length; k2++) {
        if (!wfMan[j2 + "-" + k2]) { nextA = al2[k2]; break; }
      }
    }
    if ($("wf-next")) {
      $("wf-next").textContent = "";
      if (nextA) {
        var na = document.createElement("a");
        na.setAttribute("href", nextA.getAttribute("href"));
        na.textContent = nextA.textContent.trim() + "（本月还没勾）";
        $("wf-next").appendChild(na);
      } else {
        $("wf-next").textContent = "本月全部勾完 ✓";
      }
    }
    var n = $("wf-note");
    if (n) n.textContent = done === 0 ? "五条常用岗位路径，点任意一步开始；点开过的模块会自动打勾，「✓」按钮手动标记本月已完成（月底点「清空本月手动打勾」重来）。" : (done >= total ? "五条路径全部走完一遍了。日常可以按岗位重复走：自动打勾不会清空，手动「✓」每月点一次、月底清空。" : "五条常用岗位路径；已点开 " + done + "/" + total + " 个。绿色✓＝自动（点开过），深色✓＝本月手动完成。");
  }
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest(".wf-tick") : null;
    if (t) {
      toggleWfMan(t.getAttribute("data-step") || "");
      if (typeof refreshWfBadge === "function") refreshWfBadge();
      if (typeof runCalc === "function") runCalc("workflow");
      return;
    }
    if (e.target && e.target.closest && e.target.closest("#wf-clear")) {
      clearWfMan();
      if (typeof refreshWfBadge === "function") refreshWfBadge();
      if (typeof runCalc === "function") runCalc("workflow");
      toast("已清空本月手动打勾");
    }
  });
  function calcExcoll() {
    var fob = num($("exr-fob"), 500000);
    var coll = num($("exr-collect"), 460000);
    var rate = num($("exr-rate"), 7.1);
    var rset = num($("exr-rateset"), 7.08);
    var spot = num($("exr-spot"), 7.05);
    var over = num($("exr-over"), 30);
    var warn = num($("exr-warn"), 6) / 100;
    var un = Math.max(0, fob - coll);
    var fxt = (rset - rate) * coll + (spot - rate) * un;
    var cny = un * spot;
    var occ = cny * warn / 365 * over;
    var cr = fob > 0 ? coll / fob : 0;
    $("exr-big").textContent = fmt(un, 2);
    $("exr-cr").textContent = pct(cr, 2);
    $("exr-fx").textContent = yuan(fxt);
    $("exr-cny").textContent = money(cny);
    $("exr-occ").textContent = money(occ);
    $("exr-verdict").textContent = cr >= 0.95 ? "收汇率正常（≥95%）" : (cr >= 0.9 ? "收汇率偏低，要盯紧（90%–95%）" : "收汇率风险（<90%），该催收了");
    $("exr-note").textContent = "汇兑损益 = 已收汇按收汇日汇率重估 + 未收汇按期末即期重估；逾期成本只算未收汇部分的资金占用（年化 " + (warn * 100) + "%，按 " + over + " 天）。报关（FOB）与收汇要逐笔核销，差 4,000 美元以上让单证查核销单。";
  }

  function calcAssetDispTax() {
    var mode = $("adt-mode").value;
    var price = num($("adt-price"), 452000);
    var net = num($("adt-net"), 400000);
    var fee = num($("adt-fee"), 5000);
    var vat = num($("adt-vat"), 13);
    var add = num($("adt-add"), 12) / 100;
    var tr = num($("adt-rate"), 25) / 100;
    var ni, vt, ad, pl, af, be;
    if (mode === "simple") {
      ni = price / 1.03;
      vt = ni * 0.02;
      ad = vt * add;
      pl = ni - net - fee;
      af = pl * (1 - tr);
      be = (net + fee) * 1.03 / 0.98;
      $("adt-modekv").textContent = "简易计税（3% 减按 2%）";
    } else {
      ni = price / (1 + vat / 100);
      vt = price - ni;
      ad = vt * add;
      pl = ni - net - fee;
      af = pl * (1 - tr);
      be = (net + fee) * (1 + vat / 100);
      $("adt-modekv").textContent = "一般计税（" + vat + "%）";
    }
    var altAf = mode === "simple" ? ((price / (1 + vat / 100)) - net - fee) * (1 - tr) : ((price / 1.03) - net - fee) * (1 - tr);
    $("adt-big").textContent = yuan(af);
    $("adt-ni").textContent = money(ni);
    $("adt-vt").textContent = money(vt);
    $("adt-ad").textContent = money(ad);
    $("adt-pl").textContent = yuan(pl);
    $("adt-be").textContent = money(be);
    $("adt-cmp").textContent = mode === "simple" ? "一般计税税后 " + yuan(altAf) : "简易计税税后 " + yuan(altAf) + "（若适用）";
    $("adt-note").textContent = "一般计税：销项 13%，进项可抵；简易计税 3% 减按 2%（限于 2016 年 4 月 30 日前取得或不得抵扣进项的资产）。保本售价 =（净值+清理费）×（1+税率）[简易为 ×1.03/0.98]，低于它卖就是亏。";
  }

  function calcTpdocs() {
    var rel = num($("tpd-related"), 30000000);
    var rev = num($("tpd-revenue"), 100000000);
    var thr = num($("tpd-threshold"), 25000000);
    var grp = num($("tpd-group"), 6000000000);
    var mthr = num($("tpd-master"), 1000000000);
    var cbr = num($("tpd-cbr"), 5500000000);
    var ratio = rev > 0 ? rel / rev : 0;
    var local = rel > thr;
    var master = grp > mthr;
    var cbrNeed = grp > cbr;
    $("tpd-big").textContent = pct(ratio, 2);
    $("tpd-local").textContent = local ? "需要准备（关联交易额超门槛）" : "未达门槛";
    $("tpd-masterkv").textContent = master ? "需要（集团合并收入超门槛）" : "不需要";
    $("tpd-cbrkv").textContent = cbrNeed ? "需要（集团合并收入超门槛）" : "不需要";
    $("tpd-risk").textContent = local ? "未按期准备的，税务机关可核定应纳税所得额、补税并加收利息" : "当前未达本地文档门槛，但定价仍需符合独立交易原则";
    var rows = [
      ["本地文档", money(thr), money(rel), local ? "需要" : "不需要"],
      ["主体文档", money(mthr), money(grp), master ? "需要" : "不需要"],
      ["国别报告", money(cbr), money(grp), cbrNeed ? "需要" : "不需要"]
    ];
    var tb = $("tpd-body");
    tb.innerHTML = "";
    for (var i = 0; i < rows.length; i++) {
      var tr = document.createElement("tr");
      for (var j = 0; j < rows[i].length; j++) {
        var td = document.createElement("td");
        td.textContent = rows[i][j];
        tr.appendChild(td);
      }
      tb.appendChild(tr);
    }
    $("tpd-note").textContent = "三个门槛互不替代：本地文档看「本企业关联交易额」，主体文档和国别报告看「集团合并收入」。门槛数字可改（各地/每年调整以主管税务机关口径为准），符合独立交易原则是根本。";
  }

  function calcFxhedge() {
    var expo = num($("fxh-expo"), 1000000);
    var spot = num($("fxh-spot"), 7.1);
    var fwd = num($("fxh-fwd"), 7.05);
    var ratio = num($("fxh-ratio"), 80) / 100;
    var fee = num($("fxh-fee"), 0.1) / 100;
    var down = num($("fxh-down"), 6.9);
    var locked = expo * ratio;
    var unlocked = expo - locked;
    var lockcny = locked * fwd;
    var unlockcny = unlocked * down;
    var hedged = lockcny + unlockcny;
    var noh = expo * down;
    var diff = hedged - noh;
    var cost = (spot - fwd) * locked;
    var feec = lockcny * fee;
    var net = diff - cost - feec;
    var be = locked > 0 ? fwd - feec / locked : fwd;
    $("fxh-big").textContent = yuan(net);
    $("fxh-locked").textContent = money(locked) + " 美元";
    $("fxh-unlocked").textContent = money(unlocked) + " 美元";
    $("fxh-hedged").textContent = money(hedged);
    $("fxh-noh").textContent = money(noh);
    $("fxh-diff").textContent = yuan(diff);
    $("fxh-cost").textContent = money(cost);
    $("fxh-feekv").textContent = money(feec);
    $("fxh-be").textContent = fmt(be, 5);
    $("fxh-note").textContent = "净收益 = 套保多收（锁汇部分按远期、未锁按情景即期）− 贴水成本（即期与远期的价差×锁汇额）− 手续费。盈亏平衡汇率 = 远期 − 手续费/锁汇额，情景即期低于它套保就赚。套保目的是锁定成本，不是博方向。";
  }

  function calcUnbilled() {
    var rev = num($("unb-rev"), 1000000);
    var inv = num($("unb-inv"), 600000);
    var cash = num($("unb-cash"), 450000);
    var days = num($("unb-days"), 60);
    var rate = num($("unb-rate"), 6) / 100;
    var vat = num($("unb-vat"), 13) / 100;
    var unb = Math.max(0, rev - inv);
    var ar = inv - cash;
    var invRate = rev > 0 ? inv / rev : 0;
    var cashRate = inv > 0 ? cash / inv : 0;
    var occ = ar * rate * days / 360;
    var vatDefer = unb * vat;
    $("unb-big").textContent = money(unb);
    $("unb-ar").textContent = money(ar);
    $("unb-invrate").textContent = pct(invRate, 2);
    $("unb-cashrate").textContent = pct(cashRate, 2);
    $("unb-occ").textContent = money(occ);
    $("unb-vatdefer").textContent = money(vatDefer);
    $("unb-note").textContent = "未开票收入 = 履约已确认 − 已开票（权责发生 vs 开票时点差）。应收余额只算「已开票未收款」，账期资金成本 = 应收 × 资金成本 × 账期 ÷ 360。未开票部分销项暂缓，但开票义务与纳税义务时点要按合同与增值税纳税义务发生时间判断，不能长期挂账。";
  }

  function calcDeferred() {
    var mode = $("dfr-mode").value;
    var amt = num($("dfr-amt"), 1200000);
    var months = Math.max(1, num($("dfr-months"), 12));
    var el = Math.max(0, num($("dfr-elapsed"), 3));
    var tax = num($("dfr-tax"), 25) / 100;
    var mo = amt / months;
    var rec = mo * Math.min(el, months);
    var bal = amt - rec;
    var p = amt > 0 ? rec / amt : 0;
    $("dfr-big").textContent = money(bal);
    $("dfr-mo").textContent = money(mo);
    $("dfr-rec").textContent = money(rec);
    $("dfr-pct").textContent = pct(p, 2);
    $("dfr-bal").textContent = money(bal);
    if (mode === "grant") {
      $("dfr-taxline").textContent = "不征税收入：对应支出不得税前扣除（只影响时间价值），5 年未使用要缴回";
      $("dfr-note").textContent = "政府补助走「递延收益」，与资产相关按资产寿命、与收益相关按期间摊销；作不征税收入处理时，对应的折旧/支出不得税前扣除，只是推迟不是免税。";
    } else {
      $("dfr-taxline").textContent = "预收账款先挂负债，按履约进度转收入，不提前缴增值税";
      $("dfr-note").textContent = "预收账款按服务期/履约进度逐月确认收入；确认节奏与增值税纳税义务发生时间可能不同（预收时点 vs 服务完成时点），以合同和税法规定为准。";
    }
  }

  function calcInterco() {
    var pairs = [];
    for (var i = 1; i <= 4; i++) {
      pairs.push([num($("ico-a" + i), 0), num($("ico-b" + i), 0)]);
    }
    var atot = 0, btot = 0, n = 0;
    for (var i = 0; i < pairs.length; i++) {
      atot += pairs[i][0];
      btot += pairs[i][1];
      if (Math.abs(pairs[i][0] - pairs[i][1]) > 0.005) n++;
    }
    var offset = Math.min(atot, btot);
    var diff = atot - btot;
    $("ico-big").textContent = money(diff);
    $("ico-atot").textContent = money(atot);
    $("ico-btot").textContent = money(btot);
    $("ico-offset").textContent = money(offset);
    $("ico-n").textContent = n + " 笔";
    var tb = $("ico-body");
    tb.innerHTML = "";
    for (var i = 0; i < pairs.length; i++) {
      var d = pairs[i][0] - pairs[i][1];
      var tr = document.createElement("tr");
      var st = Math.abs(d) <= 0.005 ? "平" : (d > 0 ? "应收多" : "应付多");
      [i + 1, money(pairs[i][0]), money(pairs[i][1]), money(d), st].forEach(function (v) {
        var td = document.createElement("td");
        td.textContent = v;
        tr.appendChild(td);
      });
      if (Math.abs(d) > 0.005) tr.className = "c-warn";
      tb.appendChild(tr);
    }
    $("ico-note").textContent = "表内逐组填集团内部往来（应收方挂账 vs 应付方挂账），两边一致才可抵销。";
    $("ico-note2").textContent = "合并报表抵销分录：借「应付账款」" + money(offset) + "、贷「应收账款」" + money(offset) + "；差异 " + money(diff) + " 单独挂账查明（未达账项/入账时点/科目错挂），不能直接冲平。";
  }

  function calcSharepay() {
    var mode = $("shp-mode").value;
    var shares = num($("shp-shares"), 1000000);
    var fv = num($("shp-fv"), 5);
    var vest = Math.max(0.5, num($("shp-vest"), 3));
    var el = Math.max(0, num($("shp-elapsed"), 12));
    var fee = num($("shp-fee"), 100) / 100;
    var tot = shares * fv * fee;
    var per = tot / vest;
    var acc = per * Math.min(el / 12, vest);
    var rem = Math.max(0, tot - acc);
    $("shp-big").textContent = money(acc);
    $("shp-tot").textContent = money(tot);
    $("shp-per").textContent = money(per);
    $("shp-acc").textContent = money(acc);
    $("shp-rem").textContent = money(rem);
    $("shp-note").textContent = (mode === "rs" ? "限制性股票" : "股票期权") + "：按授予日公允价值在等待期内直线摊销（累计确认=每年分摊×已过月数/12）。权益结算的股份支付费用在等待期内税前不得扣除，汇算清缴要调增；可行权比例按最佳估计，后续变了要调整。";
  }

  function calcVatrefund() {
    var credit = num($("vrf-credit"), 200000);
    var ratio = num($("vrf-ratio"), 100) / 100;
    var refund = num($("vrf-refund"), 60) / 100;
    var had = num($("vrf-had"), 0);
    var refundable = credit * ratio * refund - had;
    if (refundable < 0) refundable = 0;
    var left = credit - refundable;
    $("vrf-big").textContent = money(refundable);
    $("vrf-left").textContent = money(left);
    $("vrf-ratiokv").textContent = pct(ratio, 2);
    $("vrf-refundkv").textContent = pct(refund, 0);
    $("vrf-cash").textContent = money(refundable);
    $("vrf-note").textContent = "可退税额 = 期末留抵 × 进项构成比例 × 退税比例 − 已退。比例可改：先进制造业等行业用 100%，一般行业 60%（以当期政策为准）。退税是拿回自己垫的钱，不是利润；退税后留抵 = 期末留抵 − 退税额。申请条件（连续六个月增量留抵 >0、纳税信用等级等）以主管税务机关口径为准。";
  }

  function calcSmallmicro() {
    var income = num($("smm-income"), 2000000);
    var people = num($("smm-people"), 80);
    var assets = num($("smm-assets"), 10000000);
    var cap = num($("smm-cap"), 3000000);
    var peoplecap = num($("smm-peoplecap"), 300);
    var assetcap = num($("smm-assetcap"), 50000000);
    var rate = num($("smm-rate"), 25) / 100;
    var ok = income <= cap && people <= peoplecap && assets <= assetcap;
    var tax, ratekv, save, fails = [];
    if (ok) {
      tax = income * 0.05;
      ratekv = 5;
      save = income * rate - tax;
    } else {
      tax = income * rate;
      ratekv = rate * 100;
      save = 0;
      if (income > cap) fails.push("所得额超 " + money(cap));
      if (people > peoplecap) fails.push("人数超 " + peoplecap);
      if (assets > assetcap) fails.push("资产超 " + money(assetcap));
    }
    $("smm-big").textContent = money(tax);
    $("smm-verdict").textContent = ok ? "符合小型微利（减按 25% 计入、按 20% 征收，实际 5%）" : "不符合小型微利";
    $("smm-ratekv").textContent = ratekv + "%";
    $("smm-save").textContent = ok ? yuan(save) : "0.00 元";
    $("smm-fail").textContent = fails.length ? fails.join("；") : "无";
    $("smm-note").textContent = "三条件同时满足：应纳税所得额 ≤ " + money(cap) + "、从业人数 ≤ " + peoplecap + "、资产总额 ≤ " + money(assetcap) + "。从业人数与资产总额取全年季度平均值（不是期末数）。上限与优惠口径可改（以当期政策为准，历史上一度 100 万以内再减半）。";
  }

  function calcAddcredit() {
    var input = num($("acd-input"), 100000);
    var plus = num($("acd-plus"), 10) / 100;
    var brought = num($("acd-brought"), 15000);
    var tax = num($("acd-tax"), 50000);
    var taken = num($("acd-taken"), 0);
    var accrue = input * plus - taken;
    if (accrue < 0) accrue = 0;
    var avail = accrue + brought;
    var used = Math.min(avail, tax);
    var finalTax = tax - used;
    var carry = avail - used;
    $("acd-big").textContent = money(finalTax);
    $("acd-accrue").textContent = money(accrue);
    $("acd-avail").textContent = money(avail);
    $("acd-save").textContent = money(used);
    $("acd-carry").textContent = money(carry);
    $("acd-note").textContent = "加计抵减计提额 = 当期进项税额 × 加计比例（生产性服务业 10%/15%、先进制造业 5%，可改）；本期可抵减 = 计提 + 上期结转；实际应纳税 = 未加计应纳税 − 抵减额（抵不完的结转下期，不加计部分不足抵时不计提不结转）。政策执行期以当期公告为准。";
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

  function calcBankacct() {
    var b = [num($("bk-b1"),1200000), num($("bk-b2"),800000), num($("bk-b3"),500000), num($("bk-b4"),300000)];
    var s = [num($("bk-s1"),1200500), num($("bk-s2"),780000), num($("bk-s3"),500000), num($("bk-s4"),300000)];
    var rest = num($("bk-restrict"), 100000);
    var book = b[0]+b[1]+b[2]+b[3];
    var stmt = s[0]+s[1]+s[2]+s[3];
    var diff = stmt - book;
    var avail = book - rest;
    $("bk-big").textContent = money(avail);
    $("bk-book").textContent = money(book);
    $("bk-stmt").textContent = money(stmt);
    $("bk-diff").textContent = (diff >= 0 ? "+" : "") + money(diff);
    $("bk-restkv").textContent = money(rest);
    $("bk-note").textContent = "账面余额与对账单余额的差就是未达账项（企业已收银行未收、企业已付银行未付、银行已收企业未收、银行已付企业未付），要逐笔用「银行余额调节表」对平；受限资金（保证金、冻结款）账面有但用不了，所以可用资金 = 账面合计 − 受限。";
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

  function calcEstimatechg() {
    var cost = num($("est-cost"), 1000000), acc = num($("est-acc"), 400000);
    var salv = num($("est-salv"), 5) / 100, tax = num($("est-tax"), 25) / 100;
    var oldn = num($("est-old"), 5), newn = num($("est-new"), 3);
    var base = cost * (1 - salv) - acc;
    if (base < 0) base = 0;
    var oldv = oldn > 0 ? base / oldn : 0;
    var newv = newn > 0 ? base / newn : 0;
    var d = newv - oldv;
    var cum = d * newn;
    var net = -d * (1 - tax);
    $("est-big").textContent = money(d);
    $("est-oldv").textContent = money(oldv);
    $("est-newv").textContent = money(newv);
    $("est-cum").textContent = money(cum);
    $("est-net").textContent = money(net);
    $("est-note").textContent = "折旧年限变更是会计估计变更，采用未来适用法（不追溯调整以前年度）。每年多提折旧 = 剩余应提折旧 ÷ 新年限 − 原年折旧；税前列支口径可能与会计不同，这里只算会计影响，税会差异走递延所得税。";
  }

  function calcDtlind() {
    var bad = num($("dli-bad"), 500000), inv = num($("dli-inv"), 300000), dep = num($("dli-dep"), 100000);
    var tax = num($("dli-tax"), 25) / 100, dta0 = num($("dli-dta0"), 150000), dtl0 = num($("dli-dtl0"), 0);
    var dta = (bad + inv) * tax, dtl = dep * tax;
    var dta1 = dta - dta0, dtl1 = dtl - dtl0;
    var net = dtl1 - dta1;
    $("dli-big").textContent = money(dta);
    $("dli-dtl").textContent = money(dtl);
    $("dli-dta1").textContent = (dta1 >= 0 ? "+" : "") + money(dta1);
    $("dli-dtl1").textContent = (dtl1 >= 0 ? "+" : "") + money(dtl1);
    $("dli-net").textContent = (net >= 0 ? "+" : "") + money(net);
    $("dli-note").textContent = "递延所得税资产 = 可抵扣暂时性差异 × 税率（坏账准备、存货跌价等，预期能转回时确认）；递延所得税负债 = 应纳税暂时性差异 × 税率（加速折旧等）。本期变动 = 期末 − 期初；递延所得税费用 = 负债增加 − 资产增加，负数表示所得税费用减少（但不是少缴，是时间性差异）。";
  }

  function calcRelparty() {
    var amt = num($("rlp-amt"), 5000000);
    var equity = num($("rlp-equity"), 50000000);
    var prior = num($("rlp-prior"), 2000000);
    var board = num($("rlp-board"), 3000000);
    var disc = num($("rlp-disclose"), 0.5) / 100;
    var sh = num($("rlp-sh"), 30000000);
    var shpct = num($("rlp-shpct"), 5) / 100;
    var ratio = equity > 0 ? amt / equity : 0;
    var total = amt + prior;
    var boardOk = amt >= board && ratio >= disc;
    var shareOk = amt >= sh && ratio >= shpct;
    $("rlp-big").textContent = shareOk ? "需股东大会审议" : (boardOk ? "需董事会审议＋披露" : "未达审议线");
    $("rlp-ratio").textContent = pct(ratio, 2);
    $("rlp-total").textContent = money(total);
    $("rlp-boardkv").textContent = boardOk ? "是（金额 " + money(amt) + " ≥ " + money(board) + " 且占比达标）" : "否";
    $("rlp-shkv").textContent = shareOk ? "是（金额 " + money(amt) + " ≥ " + money(sh) + " 且占比 ≥ " + pct(shpct, 1) + "）" : "否";
    $("rlp-note").textContent = "口径：披露/董事会 = 金额 ≥ " + money(board) + " 且 占净资产 ≥ " + pct(disc, 2) + "；股东大会 = 金额 ≥ " + money(sh) + " 且 占比 ≥ " + pct(shpct, 1) + "。上市公司与关联法人以 300 万/0.5% 为常见披露线（可改），各板块与公司章程口径可能不同，重大关联交易须独立董事事前认可与回避表决；12 个月内同类交易要累计计算。";
  }

  function calcRepaircap() {
    var orig = num($("rep-orig"), 1000000);
    var dep = num($("rep-dep"), 600000);
    var amt = num($("rep-amt"), 300000);
    var years = num($("rep-years"), 5);
    var tax = num($("rep-tax"), 25) / 100;
    var life = num($("rep-life"), 1) > 0;
    var perf = num($("rep-perf"), 1) > 0;
    var cap = (life || perf);
    var capAmt = cap ? amt : 0;
    var expAmt = cap ? 0 : amt;
    var depAdd = cap && years > 0 ? amt / years : 0;
    var pretax = cap ? 0 : -expAmt;
    var aftertax = cap ? 0 : -expAmt * (1 - tax);
    $("rep-big").textContent = cap ? "资本化（后续支出）" : "费用化（当期损益）";
    $("rep-cap").textContent = money(capAmt);
    $("rep-pretax").textContent = pretax === 0 ? "0.00 元" : yuan(pretax);
    $("rep-aftertax").textContent = aftertax === 0 ? "0.00 元" : yuan(aftertax);
    $("rep-depkv").textContent = money(depAdd) + " /年";
    $("rep-note").textContent = cap ? "延长使用寿命或提高性能的后续支出资本化，按剩余年限 " + years + " 年重新计提折旧（每年 " + money(depAdd) + "，税前）；日常维修直接费用化。税会处理一般一致，但金额大且跨越多个年度的，注意与税务沟通一次性扣除还是分期。" : "日常维修/恢复原状，不延长寿命也不提高性能 → 全部费用化（当年税前 −" + money(amt) + "，税后 −" + money(amt * (1 - tax)) + "）。判断标准是实质重于形式：是否带来未来经济利益的增加。";
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

  var calcMap = {
    deposit: calcDeposit, loan: calcLoan, combo: calcCombo, prepay: calcPrepay,
    compound: calcCompound, goal: calcGoal, installment: calcInstallment,
    annual: calcAnnual, inflation: calcInflation, tax: calcTax, deal: calcDeal,
    salary: calcSalary, rentbuy: calcRentBuy, card: calcCard, fx: calcFx,
    fund: calcFund, lpr: calcLpr, deed: calcDeed, split: calcSplit,
    pension: calcPension, sell: calcSell, offset: calcOffset, multi: calcMulti,
    repayvs: calcRepayVs, edu: calcEdu, insure: calcInsure, car: calcCar,
    bonus: calcBonus, deduct: calcDeduct, ladder: calcLadder, rentyield: calcRentYield,
    settle: calcSettle, balance: calcBalance, selfins: calcSelfIns, underpay: calcUnderpay,
    loanways: calcLoanWays, dca: calcDCA, checkup: calcCheckup, calendar: calcCalendar,
    cashflow: calcCashflow, zeroloan: calcZeroLoan, riskalloc: calcRiskAlloc, penalty: calcPenalty,
    debtfree: calcDebtFree, fire: calcFire, annualfee: calcAnnualFee, budget: calcBudget,
    zhuan: calcZhuan, medins: calcMedins, childcost: calcChild, ppension: calcPPA,
    fundlimit: calcFundLimit, emergency: calcEmergency, rule503020: calcRule, debtmerge: calcDebtMerge,
    freeperiod: calcFreePeriod, overtime: calcOvertime, rentup: calcRentUp, ev: calcEv,
    vat: calcVat, vatdue: calcVatDue, deprec: calcDeprec, breakeven: calcBreakEven,
    ratios: calcRatios, recon: calcRecon,
    expense: calcExpense, aging: calcAging, funding: calcFunding, pricing: calcPricing,
    triplede: calcTripleDe, multimargin: calcMultiMargin, apterms: calcApTerms, assetledger: calcAssetLedger,
    payage: calcPayAge, costcard: calcCostCard, budgetvar: calcBudgetVar, finreport: calcFinReport,
    invoice: calcInvoice, expbudget: calcExpBudget, efficiency: calcEfficiency, cashstmt: calcCashStmt,
    invstock: calcInvStock, exportrebate: calcExport, tieout: calcTieOut, feetrend: calcFeeTrend,
    mpbe: calcMpbe, payroll: calcPayroll, assetdiff: calcAssetDiff, monthclose: calcMonthClose,
    factoring: calcFactoring, deadstock: calcDeadStock, aptalk: calcApTalk, cash13: calcCash13,
    bill: calcBill, loanreal: calcLoanReal, collect: calcCollect, mgmtpack: calcMgmtPack,
    settleway: calcSettleWay, creditline: calcCreditLine, impair: calcImpair, fxgain: calcFxGain,
    taxburden: calcTaxBurden, sens: calcSens, consol: calcConsol, eoq: calcEoq,
    bplan: calcBPlan, refundflow: calcRefundFlow, costalloc: calcCostAlloc, importcost: calcImportCost,
    makeorbuy: calcMakeOrBuy, ecl: calcEcl, quotefx: calcQuoteFx, capacity: calcCapacity,
    mold: calcMold, rebate: calcRebate, stdcost: calcStdCost, svc: calcSvc,
    taxadj: calcTaxAdj, supplier: calcSupplier, debtcap: calcDebtCap, accdep: calcAccDep,
    custwin: calcCustWin, upgrade: calcUpgrade, deptalloc: calcDeptAlloc, payout: calcPayout,
    numwords: calcNumWords, duedate: calcDueDate, workday: calcWorkDay, cagr: calcCagr, apportion: calcApportion, grossup: calcGrossUp,
    trprice: calcTrPrice, esop: calcEsop, rdexp: calcRdExp, rollfc: calcRollFC,
    commission: calcCommission, capex: calcCapex, pooling: calcPooling, creditlimit: calcCreditLimit,
    contractperf: calcContractPerf, projrev: calcProjRev, creditpolicy: calcCreditPolicy, rateadj: calcRateAdj,
    invfund: calcInvFund, machrate: calcMachRate, govgrant: calcGovGrant, fxtranslate: calcFxTranslate,
    rebateacc: calcRebateAcc, pledgeloan: calcPledgeLoan, labvar: calcLabVar, rdcap: calcRdCap,
    processcost: calcProcessCost, makeoroutsource: calcMakeOrOutsource, rebatedta: calcRebateDTA, leasebuy: calcLeaseBuy,
    welfare: calcWelfare, inputout: calcInputOut, stampduty: calcStampDuty, assetdisp: calcAssetDisp,
    headcount: calcHeadcount, markroi: calcMarkRoi, rdproject: calcRdProject, intsvc: calcIntSvc,
    accrual: calcAccrual, cfconsol: calcCfConsol, exportcheck: calcExportCheck, vatcheck: calcVatCheck,
    report: calcReport, snaps: calcSnaps,
    housecash: calcHouseCash, planner: calcPlanner,
    healthcheck: calcHealth,
    salesallow: calcSalesAllow, lease: calcLease, gpmix: calcGpmix, vatchoose: calcVatChoose,
    datemath: calcDatemath, pct3: calcPct3, xlhelp: calcXlHelp, csvrecon: calcCsvRecon,
    contractperf: calcContractPerf, projrev: calcProjRev, creditpolicy: calcCreditPolicy, rateadj: calcRateAdj,
    bundle: calcBundle, monthly: calcMonthly, yearcmp: calcYearCmp, yearreport: calcYearReport,
    fifocost: calcFifoCost, hlcost: calcHlCost, trialbal: calcTrialBal, citprep: calcCitPrep,
    rollbudget: calcRollBudget, csladv: calcCslAdv, taxwarn: calcTaxWarn, loanledger: calcLoanLedger,
    expcheck: calcExpCheck, dtax: calcDTax, invimpair: calcInvImpair, budgetalert: calcBudgetAlert,
    cashcycle: calcCashCycle, saleexp: calcSaleExp, deptcost: calcDeptCost, invvar: calcInvVar,
    aroverdue: calcAroverdue, payterms: calcPayterms, fxar: calcFxar, faimpair: calcFaimpair,
    costbehav: calcCostbehav, profitcenter: calcProfitcenter, invorder: calcInvorder, creditterm: calcCreditterm,
    workflow: calcWorkflow,
    excoll: calcExcoll, assetdisptax: calcAssetDispTax, tpdocs: calcTpdocs, fxhedge: calcFxhedge,
    unbilled: calcUnbilled, deferred: calcDeferred, interco: calcInterco, sharepay: calcSharepay,
    vatrefund: calcVatrefund, smallmicro: calcSmallmicro, addcredit: calcAddcredit, losscontract: calcLosscontract,
    bankacct: calcBankacct, equitychg: calcEquitychg, estimatechg: calcEstimatechg, dtlind: calcDtlind,
    relparty: calcRelparty, repaircap: calcRepaircap, eps: calcEps
  };

  var curCat = "hot", curSub = "";
  var RECENT_KEY = "finance-calc-recent";
  var LAST_KEY = "finance-calc-last";
  var recentList = [];
  try { recentList = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]") || []; } catch (e) { recentList = []; }
  function pushRecent(id) {
    if (!id) return;
    var i = recentList.indexOf(id);
    if (i >= 0) recentList.splice(i, 1);
    recentList.unshift(id);
    if (recentList.length > 10) recentList = recentList.slice(0, 10);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(recentList)); } catch (e) {}
    if (typeof refreshCounts === "function") refreshCounts();
  }
  var CAT_LABEL = {};
  function tabCatLabel(tab) {
    var toks = (tab.dataset.cat || "").split(/\s+/);
    for (var i = 0; i < toks.length; i++) {
      if (toks[i] === "hot" || toks[i] === "fav" || toks[i] === "recent") continue;
      return CAT_LABEL[toks[i]] || toks[i];
    }
    return CAT_LABEL[toks[0]] || toks[0];
  }
  function buildTabBadges() {
    var chips = document.querySelectorAll(".cat");
    for (var c = 0; c < chips.length; c++) {
      var ch = chips[c];
      var lab = (ch.dataset.label || "").trim();
      if (lab && ch.dataset.cat) CAT_LABEL[ch.dataset.cat] = lab;
    }
    var tb = document.querySelectorAll(".tab");
    for (var t = 0; t < tb.length; t++) {
      var el = tb[t];
      el.setAttribute("data-tbadge", tabCatLabel(el));
    }
  }
  var SEARCH_KEY = "finance-calc-search";
  var searchHist = [];
  try { searchHist = JSON.parse(localStorage.getItem(SEARCH_KEY) || "[]") || []; } catch (e) { searchHist = []; }
  function pushSearch(q) {
    if (!q) return;
    var i = searchHist.indexOf(q);
    if (i >= 0) searchHist.splice(i, 1);
    searchHist.unshift(q);
    if (searchHist.length > 5) searchHist = searchHist.slice(0, 5);
    try { localStorage.setItem(SEARCH_KEY, JSON.stringify(searchHist)); } catch (e) {}
    renderSearchHist();
  }
  function renderSearchHist() {
    var d = $("searchhist");
    if (!d) return;
    d.innerHTML = "";
    if (!searchHist.length) { d.hidden = true; return; }
    d.hidden = false;
    var lab = document.createElement("span");
    lab.className = "sh-label"; lab.textContent = "搜过：";
    d.appendChild(lab);
    for (var i = 0; i < searchHist.length; i++) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "sh-item"; b.textContent = searchHist[i]; b.setAttribute("data-sh", searchHist[i]);
      d.appendChild(b);
    }
    var clr = document.createElement("button");
    clr.type = "button"; clr.className = "sh-item sh-clear"; clr.textContent = "清空"; clr.setAttribute("data-sh-clear", "1");
    d.appendChild(clr);
  }
  var FAV_KEY = "finance-calc-fav";
  var favList = [];
  try { favList = JSON.parse(localStorage.getItem(FAV_KEY) || "[]") || []; } catch (e) { favList = []; }
  function isFav(id) { return favList.indexOf(id) >= 0; }
  function saveFav() {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(favList)); } catch (e) {}
    refreshCounts();
  }
  function refreshCounts() {
    var chips = document.querySelectorAll(".cat");
    for (var c = 0; c < chips.length; c++) {
      var cat = chips[c].dataset.cat, label = chips[c].dataset.label || chips[c].textContent.trim();
      var n;
      if (cat === "fav") n = favList.length;
      else if (cat === "recent") n = Math.min(recentList.length, 10);
      else n = document.querySelectorAll('.tab[data-cat~="' + cat + '"]').length;
      chips[c].textContent = label + " " + n;
    }
  }
  function matchQ(el, q) {
    if (el.textContent.toLowerCase().indexOf(q) >= 0) return true;
    if ((el.dataset.tab || "").indexOf(q) >= 0) return true;
    if ((el.dataset.py || "").indexOf(q) >= 0) return true;
    if ((el.dataset.alias || "").toLowerCase().indexOf(q) >= 0) return true;
    return false;
  }
  function applyFilter() {
    var qb = $("q");
    var raw = qb && qb.value ? qb.value.trim() : "";
    var q = raw.toLowerCase();
    /* 「分类:关键词」或「分类名 关键词」前缀：只在该分类里找 */
    var qcat = "";
    var CATS = {};
    var chipsAll = document.querySelectorAll(".cat");
    for (var c0 = 0; c0 < chipsAll.length; c0++) {
      var ch = chipsAll[c0];
      CATS[ch.dataset.cat] = ch.dataset.cat;
      var dl = (ch.dataset.label || "").trim();
      if (dl) CATS[dl.toLowerCase()] = ch.dataset.cat;
    }
    /* 常用简称，方便「税 折旧」「公司 折旧」这类只言片语 */
    var AL = { "税": "tax", "税费": "tax", "工资": "tax", "公司": "acct", "会计": "acct", "房": "house", "贷": "loan", "家庭": "family", "生活": "life", "工具": "util", "存钱": "save", "常用": "hot" };
    for (var al in AL) { if (Object.prototype.hasOwnProperty.call(AL, al)) CATS[al] = AL[al]; }
    var pm = raw.match(/^(\S+?)[:：\s]\s*(.*)$/);
    if (pm && CATS[pm[1].toLowerCase()]) { qcat = CATS[pm[1].toLowerCase()]; q = pm[2].toLowerCase(); }
    else if (raw && CATS[raw.toLowerCase()]) { qcat = CATS[raw.toLowerCase()]; q = ""; }
    var tb = document.querySelectorAll(".tab"), shown = 0;
    for (var t = 0; t < tb.length; t++) {
      var el = tb[t], cat = el.dataset.cat || "", ok;
      if (qcat === "fav") {
        ok = isFav(el.dataset.tab) && (!q || matchQ(el, q));
      } else if (qcat === "recent") {
        ok = recentList.indexOf(el.dataset.tab) >= 0 && (!q || matchQ(el, q));
      } else if (q) {
        ok = matchQ(el, q);                    /* 一搜索就跨分类找，不用先切分类 */
        if (ok && qcat) ok = cat.split(/\s+/).indexOf(qcat) >= 0;
      } else if (qcat) {
        ok = cat.split(/\s+/).indexOf(qcat) >= 0;
      } else if (curCat === "fav") {
        ok = isFav(el.dataset.tab);
      } else if (curCat === "recent") {
        ok = recentList.indexOf(el.dataset.tab) >= 0;
      } else {
        ok = cat.split(/\s+/).indexOf(curCat) >= 0;
        if (ok && curCat === "acct" && curSub) ok = (el.dataset.grp || "") === curSub || (curSub === "report" && (el.dataset.grp || "") === "report2");
      }
      el.hidden = !ok;
      if (ok) shown++;
    }
    var subs = $("subs");
    if (subs) subs.hidden = curCat !== "acct" || !!q;
    var tn = $("tabs");
    if (tn) tn.classList.toggle("tall", curCat === "acct" && !curSub && !q);
    if (tn) tn.classList.toggle("searching", !!q);
    var qc = $("qcount");
    if (qc) {
      qc.hidden = !q;
      if (q) qc.textContent = shown ? "命中 " + shown + " 个" : "没有匹配的模块";
    }
  }
  function setCat(cat) {
    curCat = cat; curSub = "";
    var chips = document.querySelectorAll(".cat");
    for (var c = 0; c < chips.length; c++) chips[c].classList.toggle("is-on", chips[c].dataset.cat === cat);
    var sb = document.querySelectorAll(".sub");
    for (var s = 0; s < sb.length; s++) sb[s].classList.toggle("is-on", sb[s].dataset.grp === "");
    var rc = $("btn-recent-clear");
    if (rc) rc.hidden = cat !== "recent";
    applyFilter();
    try { localStorage.setItem(CAT_KEY, cat); } catch (e) {}
  }
  function setSub(grp) {
    curSub = grp;
    var sb = document.querySelectorAll(".sub");
    for (var s = 0; s < sb.length; s++) sb[s].classList.toggle("is-on", sb[s].dataset.grp === grp);
    applyFilter();
  }

  var FIRST_ACTIVATE = true;
  function activate(name) {
    pushRecent(name);
    var self = document.querySelector('.tab[data-tab="' + name + '"]');
    var qb = $("q");
    if (qb && qb.value) { qb.value = ""; applyFilter(); }
    if (self && self.hidden) setCat(self.dataset.cat.split(/\s+/)[0]);
    /* O(1) 切页：只把上一个激活的标签/面板摘掉、给新的加上，不再每次扫 188 个节点 */
    var prevTab = document.querySelector(".tab.is-on");
    if (prevTab) { prevTab.classList.remove("is-on"); prevTab.setAttribute("aria-selected", "false"); }
    /* 防御性清场：正常情况下最多只有一个 .panel.is-on；万一设备/缓存把两个面板同时点亮，
       这里把除目标面板外的所有 is-on 都摘掉，保证切页后只显示一个模块 */
    var prevPanels = document.querySelectorAll(".panel.is-on");
    for (var _pi = 0; _pi < prevPanels.length; _pi++) {
      if (prevPanels[_pi].id !== "panel-" + name) prevPanels[_pi].classList.remove("is-on");
    }
    if (self) { self.classList.add("is-on"); self.setAttribute("aria-selected", "true"); }
    var panelEl = document.getElementById("panel-" + name);
    if (panelEl) panelEl.classList.add("is-on");
    if (calcMap[name]) calcMap[name]();
    if (location.hash !== "#" + name) history.replaceState(null, "", "#" + name);
    if (name !== "workflow") recordWf(name);
    var onTab = document.querySelector(".tab.is-on");
    /* 只有用户主动切页时才把标签滚到中间；首屏自动激活不滚，避免把浏览器的
       「顺序焦点起点」钉在标签上，导致键盘用户第一次按 Tab 跳过「跳到计算区」 */
    if (!FIRST_ACTIVATE && onTab && onTab.scrollIntoView) onTab.scrollIntoView({ block: "nearest", inline: "center" });
    var fv = $("btn-fav");
    if (fv) { var f = isFav(name); fv.textContent = f ? "★ 已置顶" : "☆ 置顶"; fv.classList.toggle("on", f); }
    try { localStorage.setItem(LAST_KEY, name); } catch (e) {}
    markBadInputs(document.querySelector(".panel.is-on"));
    renderNext(name);
  }

  $("tabs").addEventListener("click", function (e) {
    var t = e.target.closest(".tab");
    if (t) activate(t.dataset.tab);
  });

  window.addEventListener("hashchange", function () {
    var st = hashTarget();
    if (st.name && calcMap[st.name]) {
      activate(st.name);
      if (st.params) { applyParams(st.params); calcMap[st.name](); }
    }
  });

  $("cats").addEventListener("click", function (e) {
    var c = e.target.closest(".cat");
    if (!c) return;
    if ($("q")) $("q").value = "";
    setCat(c.dataset.cat);
    var first = document.querySelector('.tab[data-cat~="' + c.dataset.cat + '"]');
    if (!first) first = document.querySelector(".tab:not([hidden])");
    if (first && first.dataset.tab) activate(first.dataset.tab);
  });

  if ($("q")) {
    $("q").addEventListener("input", function () {
      applyFilter();
      var h = $("searchhist");
      if (h) h.hidden = !!$("q").value;
    });
    $("q").addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var first = document.querySelector(".tab:not([hidden])");
      if (first) { pushSearch($("q").value.trim()); activate(first.dataset.tab); flash($("q"), "跳到「" + first.textContent.trim() + "」"); }
    });
    $("q").addEventListener("focus", function () { if (!$("q").value) renderSearchHist(); });
    $("q").addEventListener("blur", function () { setTimeout(function () { var h = $("searchhist"); if (h) h.hidden = true; }, 180); });
  }
  if ($("searchhist")) $("searchhist").addEventListener("mousedown", function (e) {
    var b = e.target.closest ? e.target.closest(".sh-item") : null;
    if (!b) return;
    e.preventDefault();
    if (b.getAttribute("data-sh-clear")) {
      searchHist = [];
      try { localStorage.removeItem(SEARCH_KEY); } catch (e2) {}
      renderSearchHist();
      return;
    }
    var w = b.getAttribute("data-sh");
    if (w) { $("q").value = w; applyFilter(); $("q").focus(); }
  });
  if ($("subs")) $("subs").addEventListener("click", function (e) {
    var s = e.target.closest(".sub");
    if (!s) return;
    setSub(s.dataset.grp);
    var first = document.querySelector(".tab:not([hidden])");
    if (first) activate(first.dataset.tab);
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
    if (name === "snaps") return;   // 方案快照面板没有输入，勾选走 change 事件
    if (calcMap[name]) calcMap[name]();
    save();
    if (e.target && e.target.id) EDITED[e.target.id] = true;
    markBadInputs(panel);
  });

  /* 粘贴自动清洗：从 Excel/票据粘进来的「1,234,567」或「¥100,000 元」直接可用 */
  document.addEventListener("paste", function (e) {
    var el = e.target && e.target.closest ? e.target.closest("input.num") : null;
    if (!el) return;
    var txt = "";
    try { txt = (e.clipboardData || window.clipboardData).getData("text"); } catch (e2) {}
    if (!txt) return;
    var clean = txt.replace(/[,\s，、　]/g, "").replace(/[￥¥$€£]/g, "").replace(/元/g, "");
    clean = clean.replace(/[^0-9.\-+*/()万千亿kKwW]/g, "");
    if (!clean) return;
    e.preventDefault();
    el.value = clean;
    el.dispatchEvent(new Event("input", { bubbles: true }));
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
    "cr-price", "cr-years", "cr-residual", "cr-km", "cr-fc", "cr-oil", "cr-ins", "cr-maint", "cr-park", "cr-taxi",
    "lw-balance", "lw-rate", "lw-months", "lw-lump", "lw-income",
    "dc-amount", "dc-months", "dc-return", "dc-vol", "dc-hold", "dc-cash",
    "ck-income", "ck-expense", "ck-debt", "ck-edu", "ck-assets",
    "ck-haveLife", "ck-haveCI", "ck-haveAcc", "ck-premium",
    "cl-total", "cl-count", "cl-gap", "cl-term", "cl-rate", "cl-start",
    "cf-open", "cf-income", "cf-payday", "cf-loan", "cf-loanday", "cf-card", "cf-cardday", "cf-living",
    "zl-amount", "zl-months", "zl-fee", "zl-discount", "zl-rate",
    "ra-age", "ra-years", "ra-dd", "ra-stable", "ra-cap",
    "py-balance", "py-rate", "py-months", "py-lump", "py-fee", "py-invest",
    "df-bal1", "df-rate1", "df-min1", "df-bal2", "df-rate2", "df-min2", "df-bal3", "df-rate3", "df-min3", "df-extra",
    "fr-exp", "fr-has", "fr-save", "fr-rate", "fr-swr", "fr-age",
    "af-1", "af-1m", "af-2", "af-2m", "af-3", "af-3m", "af-4", "af-4m",
    "bg-income", "bg-cash", "bg-down", "bg-rate", "bg-years", "bg-ratio", "bg-fee",
    "zg-balance", "zg-months", "zg-rate", "zg-frate", "zg-quota", "zg-cost",
    "mi-total", "mi-self", "mi-ded", "mi-ratio", "mi-cap", "mi-bigstart", "mi-bigratio",
    "cc-age", "cc-pre", "cc-mid", "cc-uni", "cc-infl", "cc-rate",
    "pa-pay", "pa-rate", "pa-age", "pa-years", "pa-ret", "pa-taxout",
    "fl-target", "fl-bal", "fl-monthly", "fl-mult", "fl-cap", "fl-rate", "fl-years",
    "em-exp", "em-stab", "em-loan", "em-kid", "em-have", "em-save",
    "rg-inc", "rg-need", "rg-want", "rg-save",
    "dm-bal", "dm-old", "dm-new", "dm-fee", "dm-pay",
    "fp-bill", "fp-due", "fp-amount",
    "ot-salary", "ot-days", "ot-wd", "ot-rest", "ot-hol", "ot-leave", "ot-sick", "ot-sickrate",
    "ru-cur", "ru-new", "ru-cost", "ru-alt", "ru-years",
    "ev-km", "ev-oil", "ev-price", "ev-kwh", "ev-eprice", "ev-p1", "ev-p2", "ev-years",
    "ev-res1", "ev-res2", "ev-m1", "ev-m2", "ev-i1", "ev-i2",
    "vt-amount", "vt-mode", "vt-rate", "vt-surtax",
    "vd-out", "vd-in", "vd-carry", "vd-sales", "vd-urban", "vd-edu", "vd-local",
    "fa-cost", "fa-res", "fa-life", "fa-method", "fa-used",
    "be-price", "be-vc", "be-fc", "be-period", "be-target", "be-qty",
    "rt-rev", "rt-cogs", "rt-np", "rt-ca", "rt-inv", "rt-ar", "rt-cl", "rt-ta", "rt-tl", "rt-eq",
    "rc-book", "rc-bank", "rc-a", "rc-b", "rc-c", "rc-d",
    "ex-days", "ex-nights", "ex-hotel", "ex-hstd", "ex-meal", "ex-local", "ex-travel", "ex-other",
    "ag-b1", "ag-b2", "ag-b3", "ag-b4", "ag-rates", "ag-have",
    "fg-open", "fg-in", "fg-ind", "fg-a", "fg-ad", "fg-b", "fg-bd", "fg-c", "fg-cd", "fg-d", "fg-dd",
    "pr-cost", "pr-margin", "pr-vat", "pr-disc", "pr-cust",
    "td-np", "td-da", "td-ar", "td-inv", "td-ap", "td-cfo", "td-cfi", "td-cff", "td-cash0", "td-cash1", "td-ta", "td-tl", "td-te",
    "mm-q1", "mm-p1", "mm-c1", "mm-q2", "mm-p2", "mm-c2", "mm-q3", "mm-p3", "mm-c3", "mm-q4", "mm-p4", "mm-c4",
    "ap-amt", "ap-disc", "ap-d1", "ap-d2", "ap-rate",
    "al-v1", "al-l1", "al-s1", "al-m1", "al-v2", "al-l2", "al-s2", "al-m2", "al-v3", "al-l3", "al-s3", "al-m3",
    "pg-a1", "pg-a2", "pg-a3", "pg-a4", "pg-term", "pg-buy", "pg-rate",
    "cw-fin", "cw-wip", "cw-deg", "cw-mat", "cw-lab", "cw-oh",
    "bv-bq", "bv-bp", "bv-sq", "bv-sp", "bv-aq", "bv-ap", "bv-aqty", "bv-apx",
    "pl-rev", "pl-cogs", "pl-tax", "pl-se", "pl-ae", "pl-rd", "pl-fe", "pl-oi", "pl-noi", "pl-noe", "pl-tr",
    "iv-contract", "iv-issued", "iv-received", "iv-rate", "iv-overdue", "iv-days", "iv-penalty",
    "eb-b1", "eb-a1", "eb-b2", "eb-a2", "eb-b3", "eb-a3", "eb-b4", "eb-a4", "eb-b5", "eb-a5",
    "ef-rev", "ef-head", "ef-labor", "ef-opex", "ef-gross", "ef-net",
    "cs-sale", "cs-othin", "cs-buy", "cs-pay", "cs-tax", "cs-othout", "cs-capex", "cs-invpay", "cs-invback", "cs-borrow", "cs-repay", "cs-div", "cs-begin",
    "sk-beg", "sk-end", "sk-cogs", "sk-a1", "sk-a2", "sk-a3", "sk-a4", "sk-r3", "sk-r4", "sk-days",
    "er-exp", "er-vat", "er-reb", "er-dom", "er-in", "er-carry",
    "tie-a", "tie-b", "tie-c", "tie-d", "tie-e", "tie-f",
    "tr-r1", "tr-f1", "tr-r2", "tr-f2", "tr-r3", "tr-f3", "tr-r4", "tr-f4", "tr-r5", "tr-f5", "tr-r6", "tr-f6",
    "mb-fc", "mb-p1", "mb-v1", "mb-q1", "mb-p2", "mb-v2", "mb-q2", "mb-p3", "mb-v3", "mb-q3", "mb-target",
    "pc-gross", "pc-si", "pc-hf", "pc-tax", "pc-other", "pc-act", "pc-tax2", "pc-cosi", "pc-cohf", "pc-rev", "pc-head",
    "ad-cost", "ad-dep", "ad-rv", "ad-cd", "ad-comp", "ad-ins", "ad-vat", "ad-tr",
    "mw-total", "mw-done", "mw-key", "mw-days", "mw-per", "mw-people",
    "nt-face", "nt-days", "nt-rate", "nt-openfee", "nt-margin", "nt-cap", "nt-loan",
    "lr-p", "lr-rate", "lr-n", "lr-fee", "lr-margin", "lr-mrate", "lr-mode",
    "co-a1", "co-d1", "co-a2", "co-d2", "co-a3", "co-d3", "co-a4", "co-d4", "co-rate",
    "pk-rev", "pk-bud", "pk-ly", "pk-gm", "pk-net", "pk-ar", "pk-inv", "pk-cfo",
    "fc-amt", "fc-days", "fc-rate", "fc-fee", "fc-margin", "fc-loan",
    "ds-q", "ds-cost", "ds-price", "ds-prob", "ds-store", "ds-cut", "ds-scrap", "ds-val",
    "tn-buy", "tn-now", "tn-target", "tn-rate", "tn-markup",
    "wk-open", "wk-in", "wk-out", "wk-e1", "wk-w1", "wk-e2", "wk-w2", "wk-safe",
    "sw-amt", "sw-mon", "sw-rate", "sw-disc", "sw-bank", "sw-com", "sw-bd", "sw-cd",
    "crd-sales", "crd-net", "crd-coll", "crd-collrate", "crd-creditrate", "crd-guar", "crd-used", "crd-need",
    "im-cost", "im-price", "im-finish", "im-sell", "im-had", "im-up", "im-tax",
    "fxg-usd", "fxg-signed", "fxg-book", "fxg-spot", "fxg-spread", "fxg-fwd",
"tbr-sales", "tbr-out", "tbr-in", "tbr-begin", "tbr-prev", "tbr-ind", "tbr-surch", "sens-rev", "sens-vr", "sens-fix", "sens-shock", "sens-target", "cons-pm-rev", "cons-sub-rev", "cons-inter", "cons-pm-np", "cons-sub-np", "cons-unreal", "cons-mi", "cons-inv", "cons-sub-net", "cons-rec", "eoq-d", "eoq-k", "eoq-h", "eoq-day", "eoq-sd", "eoq-lt", "eoq-svc", "eoq-moq",
"cm-sales", "cm-ret", "cm-gm", "cm-sr", "cm-gr", "cm-achv", "cm-cash", "cpx-inv", "cpx-cf", "cpx-years", "cpx-rate", "cpx-rv", "pool-idle", "pool-a", "pool-b", "pool-in", "pool-out", "pool-demand", "pool-rate", "pool-wealth", "pool-equity", "crl-buy", "crl-term", "crl-vat", "crl-gm", "crl-netw", "crl-lev", "crl-late", "crl-cost", "bpl-rev", "bpl-grow", "bpl-gm", "bpl-opex", "bpl-dep", "bpl-tax", "bpl-dso", "bpl-dio", "bpl-dpo", "bpl-cash", "bpl-big", "bpl-rev2", "bpl-gp", "bpl-op", "bpl-margin", "bpl-wc", "bpl-nwc", "bpl-wcgap", "bpl-free", "bpl-body", "bpl-note", "rf-exp", "rf-reb", "rf-rate", "rf-lag", "rf-audit", "rf-cost", "rf-big", "rf-month", "rf-year", "rf-days", "rf-costv", "rf-gap", "rf-ten", "rf-opt", "rf-advice", "rf-body", "rf-note", "cal-oh", "cal-qa", "cal-qb", "cal-qc", "cal-ha", "cal-hb", "cal-hc", "cal-ma", "cal-mb", "cal-mc", "cal-ta", "cal-tb", "cal-tc", "cal-big", "cal-which", "cal-totals", "cal-r1", "cal-r2", "cal-r3", "cal-pick", "cal-price", "cal-body", "cal-note", "ic-fob", "ic-frt", "ic-ins", "ic-fx", "ic-duty", "ic-cons", "ic-vat", "ic-port", "ic-agent", "ic-qty", "ic-big", "ic-cif", "ic-dutyv", "ic-consv", "ic-vatv", "ic-fees", "ic-land", "ic-cash", "ic-ratio", "ic-body", "ic-note", "tp-cost", "tp-price", "tp-inner", "tp-ratea", "tp-rateb", "tp-lo", "tp-hi", "tp-big", "tp-a", "tp-b", "tp-profit", "tp-rate", "tp-low", "tp-high", "tp-save", "tp-per", "tp-body", "tp-note", "es-shares", "es-fair", "es-strike", "es-years", "es-leave", "es-tax", "es-big", "es-per", "es-qty", "es-flat", "es-acc", "es-diff", "es-dta", "es-deduct", "es-advice", "es-body", "es-note", "rd-labor", "rd-mat", "rd-dep", "rd-other", "rd-pct", "rd-tax", "rd-big", "rd-total", "rd-cap", "rd-effect", "rd-base", "rd-save", "rd-eff", "rd-lost", "rd-body", "rd-note", "rl-bud", "rl-passed", "rl-act", "rl-rest", "rl-gmb", "rl-gma", "rl-big", "rl-rate", "rl-gap", "rl-expect", "rl-pace", "rl-need", "rl-delta", "rl-gp", "rl-advice", "rl-body", "rl-note", "mob-q", "mob-vu", "mob-avo", "mob-price", "mob-extra", "mob-rent", "mob-fixall", "mob-big", "mob-self", "mob-buy", "mob-unit", "mob-crit", "mob-qcrit", "mob-pick", "mob-wrong", "mob-body", "mob-note", "ecl-a1", "ecl-a2", "ecl-a3", "ecl-a4", "ecl-a5", "ecl-r1", "ecl-r2", "ecl-r3", "ecl-r4", "ecl-r5", "ecl-adj", "ecl-prev", "ecl-big", "ecl-total", "ecl-base", "ecl-adjv", "ecl-delta", "ecl-ratio", "ecl-loss", "ecl-tax", "ecl-body", "ecl-note", "qf-cost", "qf-qty", "qf-dyn", "qf-port", "qf-gm", "qf-comm", "qf-fx", "qf-frt", "qf-ins", "qf-big", "qf-fob", "qf-comv", "qf-real", "qf-frtv", "qf-insv", "qf-cif", "qf-profit", "qf-fxrisk", "qf-body", "qf-note", "cap-q", "cap-p", "cap-va", "cap-ca", "cap-fa", "cap-vb", "cap-cb", "cap-fb", "cap-fixa", "cap-fixb", "cap-out", "cap-big", "cap-a", "cap-b", "cap-cm", "cap-fix", "cap-wrong", "cap-gap", "cap-outv", "cap-body", "cap-note", "mold-fee", "mold-life", "mold-price", "mold-vc", "mold-q", "mold-disc", "mold-big", "mold-per", "mold-perq", "mold-m1", "mold-m2", "mold-total", "mold-min1", "mold-verdict", "mold-body", "mold-note", "reb-base", "reb-gm", "reb-t1", "reb-p1", "reb-t2", "reb-p2", "reb-t3", "reb-p3", "reb-big", "reb-cur", "reb-now", "reb-rate", "reb-pick", "reb-crit", "reb-advice", "reb-body", "reb-note", "sc-q", "sc-mq", "sc-mp", "sc-maq", "sc-map", "sc-lh", "sc-lr", "sc-lah", "sc-lar", "sc-vr", "sc-va", "sc-fb", "sc-fa", "sc-big", "sc-mat", "sc-lab", "sc-voh", "sc-foh", "sc-dir", "sc-owner", "sc-ratio", "sc-body", "sc-note", "svc-d", "svc-sd", "svc-lt", "svc-sl", "svc-ann", "svc-lot", "svc-hold", "svc-out", "svc-big", "svc-z", "svc-ltd", "svc-rop", "svc-cost", "svc-total", "svc-best", "svc-up", "svc-body", "svc-note", "txj-rev", "txj-profit", "txj-ent", "txj-ad", "txj-fine", "txj-don", "txj-rd", "txj-rdr", "txj-pre", "txj-big", "txj-entv", "txj-adv", "txj-donv", "txj-finev", "txj-rdv", "txj-tax", "txj-due", "txj-rate", "txj-body", "txj-note", "spl-tot", "spl-t1", "spl-t2", "spl-t3", "spl-t4", "spl-t5", "spl-days", "spl-loss", "spl-big", "spl-top1", "spl-sum", "spl-hhi", "spl-level", "spl-gap", "spl-cost", "spl-advice", "spl-body", "spl-note", "dtc-loan", "dtc-eq", "dtc-rate", "dtc-bank", "dtc-mult", "dtc-big", "dtc-ratio", "dtc-lim", "dtc-paid", "dtc-ratecap", "dtc-multcap", "dtc-final", "dtc-tax", "dtc-advice", "dtc-note", "adp-cost", "adp-life", "adp-salv", "adp-tax", "adp-disc", "adp-big", "adp-acc", "adp-taxdep", "adp-diff", "adp-later", "adp-pv", "adp-net", "adp-yield", "adp-advice", "adp-body", "adp-note", "cwin-ra", "cwin-da", "cwin-ba", "cwin-fa", "cwin-sa", "cwin-ta", "cwin-ga", "cwin-rb", "cwin-db", "cwin-bb", "cwin-fb", "cwin-sb", "cwin-tb", "cwin-gb", "cwin-rc", "cwin-dc", "cwin-bc", "cwin-fc", "cwin-sc", "cwin-tc", "cwin-gc", "cwin-cost", "cwin-big", "cwin-rank", "cwin-total", "cwin-mix", "cwin-cuts", "cwin-occ", "cwin-worst", "cwin-advice", "cwin-body", "cwin-note", "upg-oldrun", "upg-oldmt", "upg-oldsale", "upg-oldlife", "upg-oldsalv", "upg-newinv", "upg-newlife", "upg-newrun", "upg-newmt", "upg-newsalv", "upg-rate", "upg-big", "upg-old", "upg-new", "upg-verdict", "upg-maxinv", "upg-energy", "upg-delay", "upg-body", "upg-note", "da-s1", "da-s12", "da-a1", "da-s2", "da-s21", "da-a2", "da-big", "da-d", "da-s", "da-r", "da-true", "da-sum", "da-pick", "da-body", "da-note", "po-ret", "po-np", "po-share", "po-ratio", "po-tax", "po-roe", "po-loan", "po-big", "po-div", "po-sharev", "po-keep", "po-nodiv", "po-ind", "po-risk", "po-alltax", "po-body", "po-note", "nw-amount", "nw-prefix", "ud-start", "ud-days", "ud-basis", "ud-amt", "ud-rate", "ud-today", "wd-a", "wd-b", "wd-hol", "wd-n", "cg-from", "cg-to", "cg-years", "apc-total", "apc-w", "gu-net", "gu-rate", "gu-spec", "gu-thr",
    "dtm-date", "dtm-months", "dtm-days",
    "pct-a", "pct-b", "pct-p1", "pct-p2",
    "rk-tol",
    "cfe-price", "cfe-cost", "cfe-actual", "cfe-billed", "cfe-cash",
    "sbr-wage", "sbr-old", "sbr-new", "sbr-pr", "sbr-cr", "sbr-months",
    "cpl-sales", "cpl-vc", "cpl-d1", "cpl-b1", "cpl-d2", "cpl-b2", "cpl-disc", "cpl-dd", "cpl-take", "cpl-cost",
    "prj-rev", "prj-cost", "prj-actual", "prj-billed", "prj-prior", "prj-pcost",
    "ifw-cogs", "ifw-d1", "ifw-d2", "ifw-cost", "ifw-hold",
    "mhr-fixed", "mhr-cap", "mhr-act", "mhr-qty",
    "ggr-amt", "ggr-type", "ggr-years", "ggr-tax", "ggr-rate",
    "fxt-asset", "fxt-liab", "fxt-cap", "fxt-ret0", "fxt-np", "fxt-close", "fxt-avg", "fxt-his", "fxt-open",,
    "rba-sales", "rba-rate", "rba-ach", "rba-vc", "rba-fee", "rba-promo", "rba-staff",
    "plg-ar", "plg-ratio", "plg-rate", "plg-days", "plg-fee", "plg-fact",
    "lab-qty", "lab-std", "lab-srate", "lab-ah", "lab-arate", "lab-cap",
    "rdc-total", "rdc-cap", "rdc-years", "rdc-months", "rdc-tax",
    "alw-sales", "alw-allow", "alw-ret", "alw-giftcost", "alw-giftval", "alw-vc", "alw-vat",
    "lse-rent", "lse-years", "lse-rate", "lse-when",
    "gpm-r1", "gpm-c1", "gpm-r2", "gpm-c2", "gpm-qty",
    "vtc-sales", "vtc-cost", "vtc-ded", "vtc-rate13", "vtc-rate3", "vtc-tax",
    "stp-m1", "stp-c1", "stp-q1", "stp-q2", "stp-m2", "stp-c2", "stp-scrap",
    "mko-qty", "mko-vc", "mko-inv", "mko-life", "mko-opp", "mko-price", "mko-extra",
    "rdt-rebate", "rdt-return", "rdt-stock", "rdt-tax",
    "lbu-price", "lbu-rent", "lbu-years", "lbu-rate", "lbu-tax", "lbu-maint", "lbu-resid",
    "wlf-wage", "wlf-wel", "wlf-edu", "wlf-union", "wlf-tax", "wlf-emp", "wlf-dis", "wlf-avg", "wlf-rate",
    "itr-input", "itr-tax", "itr-simple", "itr-free", "itr-welf", "itr-loss",
    "sdt-sale", "sdt-loan", "sdt-lease", "sdt-trans", "sdt-equity", "sdt-capital", "sdt-half",
    "adsp-orig", "adsp-dep", "adsp-imp", "adsp-price", "adsp-vat", "adsp-fee", "adsp-tax",
    "hc-vol", "hc-grow", "hc-eff", "hc-now", "hc-cost", "hc-turn", "hc-hire",
    "mroi-spend", "mroi-new", "mroi-aov", "mroi-gm", "mroi-rep", "mroi-life",
    "rdp-budget", "rdp-mat", "rdp-ext", "rdp-hours", "rdp-rate", "rdp-oh", "rdp-mon",
    "isv-cost", "isv-mark", "isv-low", "isv-high", "isv-ta", "isv-tb",
    "acr-rent", "acr-mon", "acr-ins", "acr-nofpiao", "acr-tax", "acr-get",
    "cfc-poa", "cfc-soa", "cfc-poi", "cfc-soi", "cfc-pof", "cfc-sof", "cfc-in", "cfc-inv",
    "exc-usd", "exc-fx", "exc-inv", "exc-rec", "exc-rate", "exc-credit",
    "vchk-out", "vchk-inv", "vchk-noinv", "vchk-in", "vchk-cert", "vchk-tr",
    "hk-inc", "hk-age", "hk-need", "hk-want", "hk-cash", "hk-inv", "hk-house", "hk-debt",
    "hk-loan", "hk-prem", "hk-ins",
    "rp-inc", "rp-need", "rp-want", "rp-cash", "rp-inv", "rp-house", "rp-debt", "rp-loan", "rp-ins", "rp-prem", "rp-age", "rp-rate", "rp-years", "rp-goal", "rp-gyear",
    "pl-inc",
    "pl-cash",
    "pl-inv",
    "pl-price",
    "pl-dp",
    "pl-rate",
    "pl-years",
    "pl-need",
    "pl-want",
    "pl-debt",
    "pl-ins",
    "pl-close", "pl-deco", "pl-cashall",
    "hcx-price", "hcx-dp", "hcx-deed", "hcx-agent", "hcx-fund", "hcx-odd",
    "hcx-deco", "hcx-furn", "hcx-move", "hcx-need", "hcx-cash",
    "bxsp-inc", "bxsp-house", "bxsp-edu", "bxsp-ins", "bxsp-car", "bxsp-food", "bxsp-other", "bxsp-goal", "mt-inc", "mt-m1", "mt-m2", "mt-m3", "mt-m4", "mt-m5", "mt-m6", "mt-m7", "mt-m8", "mt-m9", "mt-m10", "mt-m11", "mt-m12",
    "mt-mode", "mt-i1", "mt-i2", "mt-i3", "mt-i4", "mt-i5", "mt-i6", "mt-i7", "mt-i8", "mt-i9", "mt-i10", "mt-i11", "mt-i12", "bxsp-save", "yc-inc1", "yc-out1", "yc-asset1", "yc-inc2", "yc-out2", "yc-asset2",
    "yc-inc3", "yc-out3", "yc-asset3", "yc-inc4", "yc-out4", "yc-asset4", "yc-inc5", "yc-out5", "yc-asset5", "bxsp-inc2", "mt-c1", "mt-c2", "mt-c3", "mt-c4", "mt-c5", "mt-c6",
    "yrp-inc", "yrp-out", "yrp-a0", "yrp-a1", "yrp-cash", "yrp-debt", "yrp-house",
    "yrp-pinc", "yrp-pout", "yrp-pa1",
    "yc-target", "yc-years",
    "mtg-1-1", "mtg-1-2", "mtg-1-3", "mtg-1-4", "mtg-1-5", "mtg-1-6", "mtg-2-1", "mtg-2-2", "mtg-2-3", "mtg-2-4", "mtg-2-5", "mtg-2-6", "mtg-3-1", "mtg-3-2", "mtg-3-3", "mtg-3-4", "mtg-3-5", "mtg-3-6", "mtg-4-1", "mtg-4-2", "mtg-4-3", "mtg-4-4", "mtg-4-5", "mtg-4-6", "mtg-5-1", "mtg-5-2", "mtg-5-3", "mtg-5-4", "mtg-5-5", "mtg-5-6", "mtg-6-1", "mtg-6-2", "mtg-6-3", "mtg-6-4", "mtg-6-5", "mtg-6-6", "mtg-7-1", "mtg-7-2", "mtg-7-3", "mtg-7-4", "mtg-7-5", "mtg-7-6", "mtg-8-1", "mtg-8-2", "mtg-8-3", "mtg-8-4", "mtg-8-5", "mtg-8-6", "mtg-9-1", "mtg-9-2", "mtg-9-3", "mtg-9-4", "mtg-9-5", "mtg-9-6", "mtg-10-1", "mtg-10-2", "mtg-10-3", "mtg-10-4", "mtg-10-5", "mtg-10-6", "mtg-11-1", "mtg-11-2", "mtg-11-3", "mtg-11-4", "mtg-11-5", "mtg-11-6", "mtg-12-1", "mtg-12-2", "mtg-12-3", "mtg-12-4", "mtg-12-5", "mtg-12-6",
    "fifo-begq", "fifo-begp", "fifo-inq", "fifo-inp", "fifo-sold", "fifo-price",
    "tba-d1", "tba-c1", "tba-d2", "tba-c2", "tba-d3", "tba-c3", "tba-d4", "tba-c4", "tba-d5", "tba-c5", "tba-d6", "tba-c6", "tba-d7", "tba-c7", "tba-d8", "tba-c8",
    "cit-income", "cit-cost", "cit-expense", "cit-other", "cit-adjust", "cit-loss", "cit-prepaid", "cit-rate",
    "hlc-hq", "hlc-hc", "hlc-lq", "hlc-lc", "hlc-pq",
    "rbg-budinc", "rbg-budexp", "rbg-months", "rbg-adj", "rbg-actinc", "rbg-actexp",
    "csl-pinc", "csl-sinc", "csl-intra", "csl-unreal", "csl-recv", "csl-invest", "csl-net", "csl-own", "csl-pni", "csl-sni", "csl-div",
    "tbw-sales", "tbw-input", "tbw-vatrate", "tbw-profit", "tbw-itrate", "tbw-paid", "tbw-vatref", "tbw-itref", "tbw-band",
    "lnl-a1", "lnl-r1", "lnl-m1", "lnl-a2", "lnl-r2", "lnl-m2", "lnl-a3", "lnl-r3", "lnl-m3", "lnl-cap",
    "ec-total", "ec-special", "ec-vatrate", "ec-noticket", "ec-receipt", "ec-over", "ec-personal", "ec-tax",
    "dtx-unreal", "dtx-buy", "dtx-sell",
    "ivm-sales", "ivm-cogs", "ivm-a1", "ivm-p1", "ivm-a2", "ivm-p2", "ivm-a3", "ivm-p3",
    "bga-budinc", "bga-budexp", "bga-months", "bga-actinc", "bga-actexp",
    "cc-sales", "cc-cogs", "cc-ar", "cc-inv", "cc-ap", "cc-target",
    "se-sales", "se-sales0", "se-exp", "se-exp0", "se-margin",
    "dc-b1", "dc-a1", "dc-b2", "dc-a2", "dc-b3", "dc-a3", "dc-b4", "dc-a4",
    "ivv-inv", "ivv-d1", "ivv-d2", "ivv-d3", "ivv-d4", "ivv-d5", "ivv-d6", "ivv-line",
    "arv-a1", "arv-c1", "arv-d1", "arv-a2", "arv-c2", "arv-d2", "arv-a3", "arv-c3", "arv-d3", "arv-a4", "arv-c4", "arv-d4", "arv-rate",
    "ppt-amount", "ppt-terms", "ppt-discount", "ppt-discterms", "ppt-extend", "ppt-rate",
    "fxr-a1", "fxr-r1", "fxr-e1", "fxr-a2", "fxr-r2", "fxr-e2", "fxr-a3", "fxr-r3", "fxr-e3", "fxr-a4", "fxr-r4", "fxr-e4",
    "fai-cost", "fai-dep", "fai-recover", "fai-had", "fai-years", "fai-tax",
    "cbh-qty","cbh-cm","cbh-f1","cbh-v1","cbh-f2","cbh-v2","cbh-f3","cbh-v3","cbh-f4","cbh-v4",
    "pc-a1","pc-b1","pc-c1","pc-d1","pc-a2","pc-b2","pc-c2","pc-d2",
    "ivo-demand","ivo-safety","ivo-price","ivo-s1","ivo-p1","ivo-s2","ivo-p2","ivo-s3","ivo-p3",
    "ct-sales","ct-vc","ct-rate","ct-bad30","ct-bad60",
    "exr-fob","exr-collect","exr-rate","exr-rateset","exr-spot","exr-terms","exr-over","exr-warn",
    "adt-mode","adt-price","adt-net","adt-fee","adt-vat","adt-add","adt-rate",
    "tpd-related","tpd-revenue","tpd-threshold","tpd-group","tpd-master","tpd-cbr",
    "fxh-expo","fxh-spot","fxh-fwd","fxh-ratio","fxh-fee","fxh-down",
    "unb-rev","unb-inv","unb-cash","unb-days","unb-rate","unb-vat",
    "dfr-mode","dfr-amt","dfr-months","dfr-elapsed","dfr-tax",
    "ico-a1","ico-a2","ico-a3","ico-a4","ico-b1","ico-b2","ico-b3","ico-b4",
    "shp-mode","shp-shares","shp-fv","shp-vest","shp-elapsed","shp-fee",
    "vrf-credit","vrf-ratio","vrf-refund","vrf-had",
    "smm-income","smm-people","smm-assets","smm-cap","smm-peoplecap","smm-assetcap","smm-rate",
    "acd-input","acd-plus","acd-brought","acd-tax","acd-taken",
    "lc-price","lc-cost","lc-incurred",
    "bk-b1","bk-b2","bk-b3","bk-b4","bk-s1","bk-s2","bk-s3","bk-s4","bk-restrict",
    "eqc-sc0","eqc-cr0","eqc-re0","eqc-up0","eqc-np","eqc-re","eqc-div","eqc-add","eqc-oci",
    "est-cost","est-acc","est-salv","est-old","est-new","est-tax",
    "dli-bad","dli-inv","dli-dep","dli-tax","dli-dta0","dli-dtl0",
    "rlp-amt","rlp-equity","rlp-prior","rlp-board","rlp-disclose","rlp-sh","rlp-shpct",
    "rep-orig","rep-dep","rep-amt","rep-years","rep-tax","rep-life","rep-perf",
    "eps-ni","eps-pref","eps-shares","eps-price","eps-dil","eps-dilni"

];
  var KEY = "finance-calc-v63";
  var CAT_KEY = "finance-calc-cat";
  /* 构建时由 build.mjs 注入为 "v<内容哈希>"，页脚展示，方便核对版本 */
  var BUILD_TAG = "";

  /* ---------------- 现金流月历 ---------------- */
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

  /* ---------------- 0 利率真实成本 ---------------- */
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

  /* ---------------- 风险测评与配置 ---------------- */
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

  /* ---------------- 提前还款违约金临界点 ---------------- */
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

  /* 全量已存值：面板是懒挂载的，只存当前 DOM 会把没挂载模块的值弄丢 */
  var STORED = {};
  var EDITED = {};   // 本次会话被用户实际改过的输入（工作流带参跳转只带这些，默认值不带）
  var PENDING_PARAMS = null;
  var DEFERRED_TAPS = [];

  /* 面板是懒挂载的：给面板里的元素挂监听时要能等它出现 */
  function tap(id, ev, fn) {
    var el = $(id);
    if (el) el.addEventListener(ev, fn);
    else DEFERRED_TAPS.push([id, ev, fn]);
  }
  function runDeferredTaps() {
    if (!DEFERRED_TAPS.length) return;
    var rest = [];
    for (var i = 0; i < DEFERRED_TAPS.length; i++) {
      var d = DEFERRED_TAPS[i], el = $(d[0]);
      if (el) {
        el.addEventListener(d[1], d[2]);
        if (d[0] === "fx-cat") fillUnits();
      } else { rest.push(d); }
    }
    DEFERRED_TAPS = rest;
  }
  /* 月度跟踪按钮（挂在 tap 之后，确保 DEFERRED_TAPS 已就绪） */
  tap("snap-track", "click", function () {
    var sel = $("snap-track-mod");
    var mod = sel ? sel.value : "";
    var groups = refreshTrackMods();
    var g = mod ? groups[mod] : null;
    if (!g || g.length < 2) { flash(this, "先给同一个模块存两版快照"); if ($("snap-track-body")) $("snap-track-body").innerHTML = ""; return; }
    var sorted = g.slice().sort(function (x, y) { return x.at - y.at; });
    renderTrack(sorted[sorted.length - 2], sorted[sorted.length - 1]);
  });
  tap("snap-track-mod", "change", function () {});
  if ($("snap-track-mod")) refreshTrackMods();

  var SAVE_TIMER = null;
  function save() {
    for (var k = 0; k < FIELDS.length; k++) {
      var el = $(FIELDS[k]);
      if (el) STORED[FIELDS[k]] = el.value;
    }
    /* 输入时只更新内存，250ms 后再落盘一次，避免每敲一个字就写一次 localStorage */
    if (SAVE_TIMER) clearTimeout(SAVE_TIMER);
    SAVE_TIMER = setTimeout(flushSave, 250);
  }
  function flushSave() {
    SAVE_TIMER = null;
    try {
      localStorage.setItem(KEY, JSON.stringify(STORED));
    } catch (err) {
      if (!QUOTA_WARNED) {
        QUOTA_WARNED = true;
        toast("浏览器本地存储写不进去了（可能是隐私模式或存满）。这次改动只在当前页面有效，建议先到「方案快照」导出备份。", 6000);
      }
    }
  }
  window.addEventListener("pagehide", function () { if (SAVE_TIMER) { clearTimeout(SAVE_TIMER); flushSave(); } });

  /* 面板挂载后：先把存过的值填回去 */
  function applyStoredTo(root) {
    if (!root || !root.querySelectorAll) return;
    var els = root.querySelectorAll("input,select");
    for (var i = 0; i < els.length; i++) {
      var id = els[i].id;
      if (id && STORED[id] !== undefined) els[i].value = STORED[id];
    }
  }

  function restore() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var o = JSON.parse(raw) || {};
      STORED = o;
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
    lines.push("用这个链接打开就是同样参数：");
    lines.push(buildShare());
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
    var panel = document.querySelector(".panel.is-on");
    var tbody = panel ? panel.querySelector("table tbody") : null;
    if (tbody && tbody.rows.length) {
      rows.push(["明细表", ""]);
      var hd = panel.querySelector("table thead");
      if (hd) {
        var hr = [];
        hd.querySelectorAll("th").forEach(function (th) { hr.push(th.textContent.trim()); });
        if (hr.join("").length) rows.push(hr);
      }
      for (var ri = 0; ri < tbody.rows.length; ri++) {
        var tr = tbody.rows[ri], rr = [];
        for (var ci = 0; ci < tr.cells.length; ci++) rr.push(tr.cells[ci].textContent.trim());
        rows.push(rr);
      }
    }
    var csv = "\ufeff" + rows.map(function (r) { return r.map(esc).join(","); }).join("\r\n");
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "财务计算器-" + snap.name.replace(/\s/g, "") + ".csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  });

  // 单位下拉随类别变化
  tap("fx-cat", "change", function () { fillUnits(); calcFx(); save(); });
  if ($("fx-cat")) fillUnits();

  /* ---------------- 置顶 / 分享链接 / 底稿 / 预设 / 主题 ---------------- */
  function hashTarget() {
    var h = (location.hash || "").replace("#", "");
    var parts = h.split("?");
    return { name: parts[0] || "", params: parts[1] || "" };
  }

  function panelEls() {
    var panel = document.querySelector(".panel.is-on");
    if (!panel) return [];
    var els = panel.querySelectorAll("input,select");
    return [].slice.call(els).filter(function (el) {
      return el.id && el.type !== "search" && el.type !== "file" && el.id.indexOf("snap-") !== 0;
    });
  }

  function panelParams() {
    return panelEls().map(function (el) {
      return [encodeURIComponent(el.id), encodeURIComponent(el.value == null ? "" : el.value)];
    }).filter(function (kv) { return kv[1] !== ""; })
      .map(function (kv) { return kv[0] + "=" + kv[1]; });
  }

  function buildShare() {
    var t = document.querySelector(".tab.is-on");
    var name = t ? t.dataset.tab : "deposit";
    var qs = panelParams().join("&");
    return location.origin + location.pathname + "#" + name + (qs ? "?" + qs : "");
  }

  function scrollResultIfDeepLink() {
    if (window.innerWidth < 820) return;                 // 手机上结果在输入下方，不滚动跳过输入
    var res = document.querySelector(".panel.is-on .card.res");
    if (res && res.scrollIntoView) res.scrollIntoView({ block: "start", behavior: "auto" });
  }

  function applyParams(str, replay) {
    if (!str) return;
    if (!replay) PENDING_PARAMS = PENDING_PARAMS ? PENDING_PARAMS + "&" + str : str;
    str.split("&").forEach(function (kv) {
      var i = kv.indexOf("=");
      if (i < 0) return;
      var el = document.getElementById(decodeURIComponent(kv.slice(0, i)));
      if (!el || !el.tagName) return;
      el.value = decodeURIComponent(kv.slice(i + 1));
    });
    scrollResultIfDeepLink();
  }

  if ($("btn-fav")) $("btn-fav").addEventListener("click", function () {
    var t = document.querySelector(".tab.is-on");
    if (!t) return;
    var id = t.dataset.tab;
    if (isFav(id)) favList = favList.filter(function (x) { return x !== id; });
    else favList.push(id);
    saveFav();
    if (curCat === "fav") applyFilter();
    var on = isFav(id);
    this.textContent = on ? "★ 已置顶" : "☆ 置顶";
    this.classList.toggle("on", on);
  });

  var TOAST_EL = null, TOAST_T = null;
  function toast(msg, ms) {
    try {
      if (!TOAST_EL) {
        TOAST_EL = document.createElement("div");
        TOAST_EL.className = "toast";
        TOAST_EL.setAttribute("role", "status");
        document.body.appendChild(TOAST_EL);
      }
      TOAST_EL.textContent = msg;
      TOAST_EL.hidden = false;
      if (TOAST_T) clearTimeout(TOAST_T);
      TOAST_T = setTimeout(function () { if (TOAST_EL) TOAST_EL.hidden = true; }, ms || 3600);
    } catch (e) {}
  }

  /* ---- 错误自检：出错时给一张能复制的诊断卡，而不是白屏 ---- */
  var ERR_BOX = null, ERR_LAST = "";
  function diagText(msg) {
    var mod = (document.querySelector(".panel.is-on") || {}).id || "";
    return "时间：" + new Date().toISOString()
      + "\n页面：" + location.href
      + "\n面板：" + mod.replace("panel-", "")
      + "\n浏览器：" + (navigator.userAgent || "")
      + "\n视口：" + window.innerWidth + "×" + window.innerHeight
      + "\n错误：" + msg;
  }
  function showErrorBox(msg) {
    if (!msg) return;
    ERR_LAST = diagText(msg);
    if (!ERR_BOX) {
      ERR_BOX = document.createElement("div");
      ERR_BOX.className = "errbox";
      ERR_BOX.setAttribute("role", "alert");
      var t = document.createElement("b");
      t.textContent = "这个模块出了点问题";
      var d = document.createElement("p");
      d.setAttribute("data-role", "msg");
      var acts = document.createElement("div");
      acts.className = "erract";
      var copy = document.createElement("button");
      copy.textContent = "复制诊断信息";
      copy.className = "pri";
      copy.addEventListener("click", function () {
        copyText(ERR_LAST).then(function () { copy.textContent = "已复制"; })
          .catch(function () { copy.textContent = "复制失败，请手动选择"; });
      });
      var close = document.createElement("button");
      close.textContent = "关闭";
      close.addEventListener("click", function () { if (ERR_BOX) ERR_BOX.hidden = true; });
      acts.appendChild(copy); acts.appendChild(close);
      ERR_BOX.appendChild(t); ERR_BOX.appendChild(d); ERR_BOX.appendChild(acts);
      document.body.appendChild(ERR_BOX);
    }
    var mp = ERR_BOX.querySelector('[data-role="msg"]');
    if (mp) mp.textContent = String(msg).slice(0, 300);
    ERR_BOX.hidden = false;
  }
  window.addEventListener("error", function (e) {
    if (e && e.message) showErrorBox(e.message + (e.lineno ? "（第 " + e.lineno + " 行）" : ""));
  });
  window.addEventListener("unhandledrejection", function (e) {
    var r = e && e.reason;
    showErrorBox((r && r.message) || String(r || "未知的异步错误"));
  });

  var QUOTA_WARNED = false;
  function flash(btn, txt) {
    if (!btn) return;
    var old = btn.textContent;
    btn.textContent = txt;
    setTimeout(function () { btn.textContent = old; }, 1400);
  }

  if ($("btn-link")) $("btn-link").addEventListener("click", function () {
    var btn = this;
    copyText(buildShare()).then(function () { flash(btn, "链接已复制"); })
      .catch(function () { flash(btn, "复制失败，请手动复制地址栏"); });
  });

  if ($("btn-reset")) $("btn-reset").addEventListener("click", function () {
    var btn = this, panel = document.querySelector(".panel.is-on");
    if (!panel) return;
    var els = panel.querySelectorAll("input,select,textarea");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.type === "search" || el.id.indexOf("snap-") === 0) continue;   // 面板自身的控件不动
      if (el.tagName === "SELECT") {
        var def = -1;
        for (var o = 0; o < el.options.length; o++) { if (el.options[o].defaultSelected) { def = o; break; } }
        el.selectedIndex = def >= 0 ? def : 0;
      } else if (el.defaultValue != null) {
        el.value = el.defaultValue;
      }
    }
    var name = panel.id.replace("panel-", "");
    runCalc(name);
    save();
    flash(btn, "已恢复默认示例");
  });

  if ($("btn-clear")) $("btn-clear").addEventListener("click", function () {
    var panel = document.querySelector(".panel.is-on");
    if (!panel) return;
    var els = panel.querySelectorAll("input,select,textarea");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.type === "search" || el.id.indexOf("snap-") === 0) continue;
      if (el.tagName === "SELECT") el.selectedIndex = 0;
      else el.value = "";
    }
    var name = panel.id.replace("panel-", "");
    runCalc(name);
    save();
    toast("已清空本模块输入，可重新填写");
  });

  if ($("btn-recent-clear")) $("btn-recent-clear").addEventListener("click", function () {
    var btn = this;
    recentList = [];
    try { localStorage.removeItem(RECENT_KEY); } catch (e) {}
    refreshCounts();
    applyFilter();
    flash(btn, "已清空");
    toast("最近使用已清空");
  });

  if ($("btn-md")) $("btn-md").addEventListener("click", function () {
    var snap = snapshot(), panel = document.querySelector(".panel.is-on"), md = [];
    md.push("# 财务计算器 · " + (snap.name || "计算"));
    md.push("");
    md.push("> 生成时间 " + new Date().toLocaleString("zh-CN") + "　·　来源 " + location.origin + location.pathname);
    md.push("");
    md.push("## 一、输入参数");
    md.push("");
    var labels = panel ? panel.querySelectorAll("label.f") : [];
    for (var i = 0; i < labels.length; i++) {
      var sp = labels[i].querySelector("span"), el = labels[i].querySelector("input,select,textarea");
      if (!sp || !el) continue;
      var raw = el.value == null ? "" : el.value;
      if (el.tagName === "SELECT" && el.selectedIndex >= 0) raw = el.options[el.selectedIndex].textContent;
      var v = String(raw).replace(/\s*\n\s*/g, " / ");
      md.push("- " + sp.textContent.trim() + "：" + (v === "" ? "（空）" : v));
    }
    md.push("");
    md.push("## 二、计算结果");
    md.push("");
    snap.rows.forEach(function (r) { md.push("- **" + r[0] + "**：" + r[1]); });
    var tbody = panel ? panel.querySelector("tbody") : null;
    if (tbody && tbody.rows.length) {
      md.push("");
      md.push("## 三、明细（前 20 行）");
      md.push("");
      var head = panel.querySelector("thead tr");
      if (head) md.push("| " + [].map.call(head.children, function (th) { return th.textContent.trim(); }).join(" | ") + " |");
      if (head) md.push("|" + [].map.call(head.children, function () { return "---"; }).join("|") + "|");
      for (var r2 = 0; r2 < tbody.rows.length && r2 < 20; r2++) {
        md.push("| " + [].map.call(tbody.rows[r2].children, function (td) { return td.textContent.trim(); }).join(" | ") + " |");
      }
      if (tbody.rows.length > 20) md.push("| … 共 " + tbody.rows.length + " 行，完整数据请用「下载 CSV」 |  |");
    }
    var hasTable = !!(tbody && tbody.rows.length);
    if (snap.note) { md.push(""); md.push("## " + (hasTable ? "四" : "三") + "、口径说明"); md.push(""); md.push(snap.note); }
    md.push("");
    md.push("*本底稿由财务计算器生成，纯前端计算、数据未上传。所有结果按页面默认假设的公式推算，"
      + "实际以合同、票据、当地政策和银行/税务口径为准。*");
    var blob = new Blob([md.join("\n")], { type: "text/markdown;charset=utf-8" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "财务计算器-" + (snap.name || "底稿").replace(/\s/g, "") + ".md";
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setTimeout(function () { URL.revokeObjectURL(link.href); }, 2000);
    flash(this, "已导出 .md");
  });

  var PRE_KEY = "finance-calc-presets";
  var presets = [];
  try { presets = JSON.parse(localStorage.getItem(PRE_KEY) || "[]") || []; } catch (e) { presets = []; }
  function savePresets() {
    try { localStorage.setItem(PRE_KEY, JSON.stringify(presets)); } catch (e) {}
    renderPresets();
  }
  function renderPresets() {
    var sel = $("preset");
    if (!sel) return;
    var cur = sel.value, opts = ['<option value="">参数预设 ' + (presets.length || "") + "</option>"];
    presets.forEach(function (p, i) {
      opts.push('<option value="' + i + '">' + p.name + "（" + p.module + "）</option>");
    });
    sel.innerHTML = opts.join("");
    sel.value = cur && presets[+cur] ? cur : "";
  }
  if ($("btn-preset-save")) $("btn-preset-save").addEventListener("click", function () {
    var t = document.querySelector(".tab.is-on");
    var module = t ? t.dataset.tab : "";
    var name = t ? t.textContent.trim() : "计算";
    var label = window.prompt("给这套参数起个名字（只存在本机浏览器）", name + " · 常用情形");
    if (!label) return;
    var data = {};
    panelEls().forEach(function (el) { data[el.id] = el.value; });
    presets = presets.filter(function (p) { return !(p.module === module && p.name === label); });
    presets.push({ name: label, module: module, data: data });
    savePresets();
    flash(this, "已存为预设");
  });
  if ($("btn-preset-del")) $("btn-preset-del").addEventListener("click", function () {
    var sel = $("preset");
    if (!sel || sel.value === "") { flash(this, "先在左边选一个预设"); return; }
    presets.splice(+sel.value, 1);
    sel.value = "";
    savePresets();
    flash(this, "已删除");
  });
  if ($("preset")) $("preset").addEventListener("change", function () {
    var i = this.value;
    if (i === "") return;
    var p = presets[+i];
    if (!p) return;
    if (calcMap[p.module]) activate(p.module);
    Object.keys(p.data).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.value = p.data[id];
    });
    if (calcMap[p.module]) calcMap[p.module]();
    save();
  });

  var THEME_KEY = "finance-calc-theme";
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    var b = $("btn-theme");
    if (b) b.textContent = t === "dark" ? "浅色" : "深色";
  }
  if ($("btn-theme")) $("btn-theme").addEventListener("click", function () {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
  (function () {
    var t = "";
    try { t = localStorage.getItem(THEME_KEY) || ""; } catch (e) {}
    if (!t) t = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
    setTheme(t);
  })();

  document.addEventListener("keydown", function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) {
      if ($("q")) { e.preventDefault(); $("q").focus(); $("q").select(); }
      return;
    }
    if (e.key === "Escape" && document.activeElement === $("q")) {
      $("q").value = ""; applyFilter(); $("q").blur();
      return;
    }
    if ((e.key === "ArrowRight" || e.key === "ArrowLeft") && /(^| )tab( |$)/.test(document.activeElement.className || "")) {
      var list = [].filter.call(document.querySelectorAll(".tab"), function (x) { return !x.hidden; });
      var idx = list.indexOf(document.activeElement);
      if (idx < 0) return;
      var nx = list[idx + (e.key === "ArrowRight" ? 1 : -1)];
      if (nx) { e.preventDefault(); nx.focus(); }
    }
  });

  /* ---------------- 对比 A/B ---------------- */
  var CMP_KEY = "finance-calc-cmpA";
  function loadCmpA() {
    try { return JSON.parse(localStorage.getItem(CMP_KEY) || "null"); } catch (e) { return null; }
  }
  function saveCmpA(o) {
    try { localStorage.setItem(CMP_KEY, JSON.stringify(o)); } catch (e) {}
  }
  function numOf(v) {
    var m = String(v).replace(/[^0-9.\-]/g, "");
    var n = m ? parseFloat(m) : NaN;
    return isFinite(n) ? n : NaN;
  }
  function currentSnap() {
    var snap = snapshot();
    var tab = document.querySelector(".tab.is-on");
    var params = {};
    panelEls().forEach(function (el) { params[el.id] = el.value; });
    return { mod: tab ? tab.dataset.tab : "", name: snap.name, rows: snap.rows, params: params };
  }
  function cmpTabName(mod) {
    var t = document.querySelector('.tab[data-tab="' + mod + '"]');
    return t ? t.textContent.replace(/\s+/g, "") : mod;
  }
  function fillCmpMod() {
    var sel = $("cmp-mod");
    if (!sel || sel.options.length) return;
    var tabs = document.querySelectorAll(".tab[data-tab]");
    for (var i = 0; i < tabs.length; i++) {
      var o = document.createElement("option");
      o.value = tabs[i].dataset.tab;
      o.textContent = tabs[i].textContent.replace(/\s+/g, "");
      sel.appendChild(o);
    }
  }
  if ($("cmp-mod")) $("cmp-mod").addEventListener("change", function () {
    if (this.value) { try { location.hash = this.value; } catch (e) {} }
  });
  if ($("btn-cmp")) $("btn-cmp").addEventListener("click", function () {
    var btn = this, cur = currentSnap(), A = loadCmpA();
    if (!A) {
      saveCmpA(cur); fillCmpMod();
      if ($("cmp-mod")) $("cmp-mod").value = cur.mod;
      if ($("cmpbox")) $("cmpbox").hidden = true;
      flash(btn, "已存 A：" + cur.name);
      return;
    }
    fillCmpMod();
    var keys = [], seen = {};
    A.rows.forEach(function (r) { if (seen[r[0]] === undefined) { seen[r[0]] = true; keys.push(r[0]); } });
    cur.rows.forEach(function (r) { if (seen[r[0]] === undefined) { seen[r[0]] = true; keys.push(r[0]); } });
    var mapA = {}, mapB = {};
    A.rows.forEach(function (r) { mapA[r[0]] = r[1]; });
    cur.rows.forEach(function (r) { mapB[r[0]] = r[1]; });
    var html = [], diffN = 0;
    keys.forEach(function (k) {
      var av = mapA[k] !== undefined ? mapA[k] : "—";
      var bv = mapB[k] !== undefined ? mapB[k] : "—";
      var na = numOf(av), nb = numOf(bv);
      var d = (isFinite(na) && isFinite(nb)) ? nb - na : NaN;
      var changed = isFinite(d) && Math.abs(d) > 0.005;
      var onlyOne = (av === "—") !== (bv === "—");
      if (changed || onlyOne) diffN++;
      html.push("<tr" + ((changed || onlyOne) ? ' class="c-info"' : "") + '><td class="tal">' + k + "</td><td>" + av
        + "</td><td>" + bv + "</td><td>" + (isFinite(d) ? (d > 0 ? "+" : "") + fmt(d, 2) : "—") + "</td></tr>");
    });
    var pd = [];
    Object.keys(cur.params).forEach(function (k) {
      if (A.params && A.params[k] !== undefined && A.params[k] !== cur.params[k]) pd.push(k + "：" + A.params[k] + " → " + cur.params[k]);
    });
    var cross = A.mod !== cur.mod;
    if ($("cmp-title")) $("cmp-title").textContent = cross ? "A「" + cmpTabName(A.mod) + "」 vs B「" + cmpTabName(cur.mod) + "」 · 跨模块对比" : cur.name + " · 前后对比";
    if ($("cmp-body")) $("cmp-body").innerHTML = html.join("");
    if ($("cmp-note")) $("cmp-note").textContent =
      (cross ? "这是两个不同模块的并排对比，只在一侧有的指标显示「—」。A 是上次点这里时存的快照，B 是现在这个模块。" : "同模块前后对比。")
      + (pd.length ? "改动的参数：" + pd.join("；") + "。" : "")
      + (diffN ? "有 " + diffN + " 项变化/差异（蓝色行）。" : "所有结果完全一致。")
      + " 再点一次会把当前结果存成新的 A。浏览器关了也不丢。";
    if ($("cmpbox")) { $("cmpbox").hidden = false; $("cmpbox").scrollIntoView({ block: "nearest" }); }
    saveCmpA(cur);
    flash(btn, cross ? "已跨模块对比" : "已对比");
  });
  if ($("cmp-close")) $("cmp-close").addEventListener("click", function () { $("cmpbox").hidden = true; });

  /* 单模块结果图：把当前面板的主结果 + 指标 + 口径画成一张 980 宽的 PNG，方便发微信 */
  tap("btn-card", "click", function () {
    var btn = this, sn = snapshot();
    if (!sn.rows.length) { flash(btn, "这个模块没有可截图的结果"); return; }
    var mod = document.querySelector(".tab.is-on");
    var name = mod ? mod.textContent.trim() : sn.name;
    var FONT = "-apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
    var W = 980, pad = 30, lineH = 30;
    var rows = sn.rows.slice(0, 9);
    var noteLines = [];
    var cv0 = document.createElement("canvas");
    var g0 = cv0.getContext("2d");
    g0.font = "13px " + FONT;
    (function wrapNote(txt) {
      if (!txt) return;
      var max = W - pad * 2, line = "";
      for (var i = 0; i < txt.length && noteLines.length < 4; i++) {
        if (g0.measureText(line + txt[i]).width > max) { noteLines.push(line); line = ""; }
        line += txt[i];
      }
      if (line && noteLines.length < 4) noteLines.push(line);
    })(sn.note || "");
    var share = "";
    try { share = buildShare().replace(/^https?:\/\//, ""); } catch (e) { share = ""; }
    var top = 104, hgt = top + rows.length * lineH + noteLines.length * 19 + (share ? 20 : 0) + 62;
    var cv = document.createElement("canvas");
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = hgt * dpr;
    var g = cv.getContext("2d");
    g.scale(dpr, dpr);
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, hgt);
    g.fillStyle = "#1e3a8a"; g.fillRect(0, 0, W, 6);
    g.font = "bold 22px " + FONT; g.fillStyle = "#0f172a";
    g.fillText(name, pad, 48);
    g.font = "13px " + FONT; g.fillStyle = "#64748b";
    g.fillText("财务计算器 · " + location.host + "　·　" + new Date().toLocaleString("zh-CN"), pad, 74);
    g.strokeStyle = "#e2e8f0"; g.beginPath(); g.moveTo(pad, top - 16); g.lineTo(W - pad, top - 16); g.stroke();
    g.textBaseline = "middle";
    for (var i = 0; i < rows.length; i++) {
      var y = top + i * lineH + 6;
      if (i === 0) {
        g.fillStyle = "#eef2ff"; g.fillRect(pad - 8, y - lineH / 2 - 2, W - pad * 2 + 16, lineH);
        g.font = "bold 17px " + FONT; g.fillStyle = "#1e3a8a"; g.textAlign = "left";
        g.fillText(rows[i][0], pad, y);
        g.textAlign = "right"; g.font = "bold 19px " + FONT;
        g.fillText(rows[i][1], W - pad, y);
        g.textAlign = "left";
      } else {
        g.font = "14px " + FONT; g.fillStyle = "#475569"; g.textAlign = "left";
        g.fillText(rows[i][0], pad, y);
        g.fillStyle = "#0f172a"; g.font = "15px " + FONT; g.textAlign = "right";
        g.fillText(rows[i][1], W - pad, y);
        g.textAlign = "left";
      }
    }
    var ny = top + rows.length * lineH + 14;
    g.font = "12px " + FONT; g.fillStyle = "#94a3b8";
    for (var n = 0; n < noteLines.length; n++) g.fillText(noteLines[n], pad, ny + n * 19);
    if (share) {
      g.fillStyle = "#64748b"; g.font = "11.5px " + FONT;
      g.fillText(clipRawShare("打开这个链接就是当前参数：" + share, W - pad * 2), pad, ny + noteLines.length * 19 + 4);
    }
    g.fillStyle = "#cbd5e1"; g.font = "11.5px " + FONT;
    g.fillText("纯前端计算，数据不上传 · 结果按页面假设推算，实际以合同与当地政策为准", pad, hgt - 20);
    function clipRawShare(txt, max) {
      if (g.measureText(txt).width <= max) return txt;
      var s2 = txt;
      while (s2.length > 8 && g.measureText(s2 + "…").width > max) s2 = s2.slice(0, -1);
      return s2 + "…";
    }
    cv.toBlob(function (blob) {
      var a2 = document.createElement("a");
      a2.href = URL.createObjectURL(blob);
      a2.download = "财务计算器-" + name + ".png";
      document.body.appendChild(a2); a2.click(); document.body.removeChild(a2);
      setTimeout(function () { URL.revokeObjectURL(a2.href); }, 2000);
      flash(btn, "已导出结果图");
    }, "image/png");
  });

  /* 竖版长图：更适合发群里 / 朋友圈的窄高版 */
  tap("btn-vcard", "click", function () {
    var btn = this, sn = snapshot();
    if (!sn.rows.length) { flash(btn, "这个模块没有可截图的结果"); return; }
    var mod = document.querySelector(".tab.is-on");
    var name = mod ? mod.textContent.trim() : sn.name;
    var FONT = "-apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
    var W = 750, pad = 26, top = 96;
    var rows = sn.rows.slice(0, 15);
    var cv0 = document.createElement("canvas"), g0 = cv0.getContext("2d");
    g0.font = "14px " + FONT;
    function wrap(txt, max, cap) {
      if (!txt) return [];
      var out = [], line = "";
      for (var i = 0; i < txt.length && out.length < cap; i++) {
        if (g0.measureText(line + txt[i]).width > max) { out.push(line); line = ""; }
        line += txt[i];
      }
      if (line && out.length < cap) out.push(line);
      return out;
    }
    var notes = wrap(sn.note || "", W - pad * 2, 8);
    var share = "";
    try { share = buildShare().replace(/^https?:\/\//, ""); } catch (e) { share = ""; }
    var shareLine = share ? wrap("打开这个链接就是当前参数：" + share, W - pad * 2, 2) : [];
    var hgt = top + rows.length * 34 + 10 + notes.length * 20 + shareLine.length * 19 + 64;
    var cv = document.createElement("canvas");
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = hgt * dpr;
    var g = cv.getContext("2d");
    g.scale(dpr, dpr);
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, hgt);
    g.fillStyle = "#1e3a8a"; g.fillRect(0, 0, W, 8);
    g.font = "bold 24px " + FONT; g.fillStyle = "#0f172a";
    g.fillText(name, pad, 46);
    g.font = "12px " + FONT; g.fillStyle = "#94a3b8";
    g.fillText("财务计算器 · " + location.host, pad, 68);
    g.fillText(new Date().toLocaleString("zh-CN"), pad, 86);
    g.strokeStyle = "#e2e8f0"; g.beginPath(); g.moveTo(pad, top - 14); g.lineTo(W - pad, top - 14); g.stroke();
    g.textBaseline = "middle";
    for (var i = 0; i < rows.length; i++) {
      var y = top + i * 34 + 4;
      if (i === 0) {
        g.fillStyle = "#eef2ff"; g.fillRect(pad - 10, y - 22, W - pad * 2 + 20, 34);
        g.font = "bold 16px " + FONT; g.fillStyle = "#1e3a8a"; g.textAlign = "left";
        g.fillText(rows[i][0], pad, y);
        g.textAlign = "right"; g.font = "bold 20px " + FONT;
        g.fillText(rows[i][1], W - pad, y);
        g.textAlign = "left";
      } else {
        g.font = "13px " + FONT; g.fillStyle = "#64748b"; g.textAlign = "left";
        g.fillText(rows[i][0], pad, y);
        g.fillStyle = "#0f172a"; g.font = "14px " + FONT; g.textAlign = "right";
        g.fillText(rows[i][1], W - pad, y);
        g.textAlign = "left";
      }
    }
    var ny = top + rows.length * 34 + 12;
    g.font = "11.5px " + FONT; g.fillStyle = "#94a3b8";
    for (var n = 0; n < notes.length; n++) g.fillText(notes[n], pad, ny + n * 20);
    var sy = ny + notes.length * 20 + 4;
    g.fillStyle = "#64748b"; g.font = "11px " + FONT;
    for (var s2 = 0; s2 < shareLine.length; s2++) g.fillText(shareLine[s2], pad, sy + s2 * 19);
    g.fillStyle = "#cbd5e1"; g.font = "11px " + FONT;
    g.fillText("纯前端计算，数据不上传 · 结果按页面假设推算", pad, hgt - 20);
    cv.toBlob(function (blob) {
      var a2 = document.createElement("a");
      a2.href = URL.createObjectURL(blob);
      a2.download = "财务计算器-" + name + "-竖版.png";
      document.body.appendChild(a2); a2.click(); document.body.removeChild(a2);
      setTimeout(function () { URL.revokeObjectURL(a2.href); }, 2000);
      flash(btn, "已导出竖版长图");
    }, "image/png");
  });

  /* 体检报告：打印 / 存 PDF（浏览器打印面板里选「另存为 PDF」） */
  tap("mt-csv", "click", function () {
    var mode = $("mt-mode") ? $("mt-mode").value : "avg";
    var incAvg = Math.max(0, num($("mt-inc"), 0));
    var rows = [["月份", "收入", "支出", "当月结余", "累计结余"]], cum = 0;
    for (var i = 1; i <= 12; i++) {
      var inc = mode === "monthly" ? Math.max(0, num($("mt-i" + i), 0)) : incAvg;
      var out = Math.max(0, num($("mt-m" + i), 0));
      cum += inc - out;
      rows.push([i + "月", inc.toFixed(2), out.toFixed(2), (inc - out).toFixed(2), cum.toFixed(2)]);
    }
    var csv = "\ufeff" + rows.map(function (r) { return r.join(","); }).join("\r\n");
    var url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    var a2 = document.createElement("a");
    a2.href = url; a2.download = "财务计算器-12个月小结.csv";
    document.body.appendChild(a2); a2.click(); a2.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    flash(this, "已导出 CSV");
  });

  tap("yrp-print", "click", function () {
    var old = document.title;
    document.title = "财务计算器-年度财务报告";
    setTimeout(function () { window.print(); }, 60);
    setTimeout(function () { document.title = old; }, 1500);
  });

  /* 打印：加封面页 + 页脚（含页码，Chrome 打印时生效）+ 表头跨页重复 */
  function printCover(name) {
    var el = document.getElementById("print-cover");
    if (!el) {
      el = document.createElement("div");
      el.id = "print-cover";
      el.className = "printcover";
      document.body.appendChild(el);
    }
    el.innerHTML = '<div class="pc-in"><h1>财务计算器</h1><h2>' + name.replace(/</g, "&lt;") + '</h2><p>纯前端计算 · 数据不上传</p><p class="pc-time">' + new Date().toLocaleString("zh-CN") + '</p><p class="pc-note">本页为打印封面，结果以正文为准；计算按页面假设推算，实际以合同与当地政策为准。</p></div>';
  }
  function doPrint(name) {
    printCover(name);
    document.title = "财务计算器-" + name;
    var old = document.title;
    window.print();
    setTimeout(function () { document.title = old; }, 1200);
  }

  tap("rp-pdf", "click", function () {
    doPrint("家庭财务体检");
  });

  if ($("btn-print")) $("btn-print").addEventListener("click", function () {
    var t = document.querySelector(".tab.is-on");
    doPrint(t ? t.textContent.trim() : "计算");
  });

  tap("snap-sort", "change", function () { renderSnapList(); });
  tap("snap-q", "input", function () { renderSnapList(); });

  tap("hk-pull", "click", function () {
    var o = {};
    try { o = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) {}
    var got = 0;
    var take = function (dst, src) {
      if (o[src] !== undefined && o[src] !== "" && $(dst)) { $(dst).value = o[src]; got++; }
    };
    take("hk-inc", "rg-inc"); take("hk-need", "rg-need"); take("hk-want", "rg-want");
    take("hk-cash", "em-have"); take("hk-loan", "cf-loan");
    calcHealth(); save();
    flash(this, got ? "已读取 " + got + " 项" : "还没填过别的模块");
  });

  /* 有新版本时给一条「点此刷新」，不然用户会在旧页面里填半天 */
  var updShown = false;
  function showUpdateBar() {
    if (updShown) return;
    updShown = true;
    var bar = document.createElement("div");
    bar.className = "updbar";
    bar.innerHTML = "<span>有新版本了</span><button type=\"button\" class=\"upd-go\">刷新</button><button type=\"button\" class=\"upd-x\" aria-label=\"关闭\">×</button>";
    bar.querySelector(".upd-go").addEventListener("click", function () { location.reload(); });
    bar.querySelector(".upd-x").addEventListener("click", function () { bar.parentNode && bar.parentNode.removeChild(bar); });
    document.body.appendChild(bar);
  }
  if ("serviceWorker" in navigator && /^(https:|http:\/\/(localhost|127\.0\.0\.1))/.test(location.origin + "/")) {
    window.addEventListener("load", function () {
      try {
        navigator.serviceWorker.register("./sw.js").then(function (reg) {
          if (reg.waiting) showUpdateBar();
          reg.addEventListener("updatefound", function () {
            var nw = reg.installing;
            if (!nw) return;
            nw.addEventListener("statechange", function () {
              if (nw.state === "installed" && navigator.serviceWorker.controller) showUpdateBar();
            });
          });
        }).catch(function () {});
        var once = false;
        navigator.serviceWorker.addEventListener("controllerchange", function () {
          if (once) return; once = true;
          if (navigator.serviceWorker.controller) showUpdateBar();
        });
      } catch (e) {}
    });
  }


  /* ---------------- 方案快照：按钮与行内交互 ---------------- */
  if ($("btn-snap")) $("btn-snap").addEventListener("click", function () {
    var tab = document.querySelector(".tab.is-on");
    var def = (tab ? tab.textContent.trim() : "方案") + " #" + (loadSnaps().length + 1);
    var nm = "";
    try { nm = window.prompt("方案名称（可留空；要加备注和标签就写「名称｜备注｜标签」）", def) || ""; } catch (e) { nm = ""; }
    var parts = nm.split(/[｜|]/);
    var s = makeSnap((parts[0] || "").trim() || def, (parts[1] || "").trim(), (parts[2] || "").trim().replace(/^#/, ""));
    if (!s) return;
    var arr = loadSnaps();
    arr.unshift(s);
    saveSnaps(arr);
    runCalc("snaps");
    flash(this, "已存方案");
  });

  tap("snap-cmp", "click", function () { runCalc("snaps"); });

  tap("snap-all", "change", function () {
    var on = !!this.checked;
    var arr = loadSnaps();
    for (var i = 0; i < arr.length; i++) SNAP_PICK[arr[i].id] = on;
    renderSnapList(); renderSnapCompare();
  });

  tap("snap-del-sel", "click", function () {
    var picked = Object.keys(SNAP_PICK).filter(function (k) { return SNAP_PICK[k]; });
    if (!picked.length) { flash(this, "先勾选要删的方案"); return; }
    var ok = true;
    try { ok = window.confirm("删除选中的 " + picked.length + " 个方案？"); } catch (e) {}
    if (!ok) return;
    saveSnaps(loadSnaps().filter(function (x) { return picked.indexOf(x.id) < 0; }));
    SNAP_PICK = {};
    var all = $("snap-all"); if (all) all.checked = false;
    runCalc("snaps");
    flash(this, "已删除 " + picked.length + " 个");
  });

  tap("snap-clear", "click", function () {
    var ok = true;
    try { ok = window.confirm("清空全部方案快照？此操作不能撤销。"); } catch (e) {}
    if (!ok) return;
    saveSnaps([]);
    SNAP_PICK = {};
    runCalc("snaps");
    flash(this, "已清空");
  });

  document.addEventListener("click", function (e) {
    var ren = e.target.closest ? e.target.closest(".snap-ren") : null;
    if (ren) {
      var rarr = loadSnaps();
      var one = rarr.filter(function (x) { return x.id === ren.dataset.id; })[0];
      if (!one) return;
      var nm2 = "";
      try { nm2 = window.prompt("方案名称", one.name || ""); } catch (err) { return; }
      if (nm2 === null) return;
      var nt2 = "";
      try { nt2 = window.prompt("备注（可留空，如：A 客户 / 保守版）", one.note || ""); } catch (err) { nt2 = one.note || ""; }
      one.name = (nm2 || "").trim() || one.name;
      one.note = (nt2 || "").trim();
      saveSnaps(rarr);
      runCalc("snaps");
      return;
    }
    var del = e.target.closest ? e.target.closest(".snap-del") : null;
    if (del) {
      var id = del.dataset.id;
      delete SNAP_PICK[id];
      saveSnaps(loadSnaps().filter(function (x) { return x.id !== id; }));
      runCalc("snaps");
      return;
    }
    var load = e.target.closest ? e.target.closest(".snap-load") : null;
    if (load) {
      var snap = loadSnaps().filter(function (x) { return x.id === load.dataset.id; })[0];
      if (!snap) return;
      activate(snap.mod);
      var q = (snap.params || []).filter(function (p) { return p.id && p.value !== ""; })
        .map(function (p) { return encodeURIComponent(p.id) + "=" + encodeURIComponent(p.value); }).join("&");
      if (q) applyParams(q);
      runCalc(snap.mod);
      return;
    }
  });

  document.addEventListener("change", function (e) {
    if (e.target && e.target.classList && e.target.classList.contains("snap-pick")) {
      SNAP_PICK[e.target.dataset.id] = e.target.checked;
      if (window.__snapCompare) window.__snapCompare(); else runCalc("snaps");
    }
  });

  /* ---------------- 备份与迁移（快照 JSON / 整站备份） ---------------- */
  function dlJson(name, obj) {
    var blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }
  function stamp() {
    var d = new Date(), p = function (n) { return (n < 10 ? "0" : "") + n; };
    return "" + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + "-" + p(d.getHours()) + p(d.getMinutes());
  }
  function readJsonFile(input, cb) {
    var f = input.files && input.files[0];
    if (!f) return;
    var fr = new FileReader();
    fr.onload = function () {
      var obj = null;
      try { obj = JSON.parse(String(fr.result)); } catch (e) { obj = null; }
      input.value = "";
      if (!obj) { window.alert("这个文件不是有效的 JSON，没有导入。"); return; }
      cb(obj);
    };
    fr.readAsText(f, "utf-8");
  }
  tap("snap-export", "click", function () {
    dlJson("财务计算器-方案快照-" + stamp() + ".json",
      { app: "finance-calc", kind: "snaps", v: 1, at: new Date().toISOString(), snaps: loadSnaps() });
    flash(this, "已导出");
  });
  tap("snap-import", "click", function () { if ($("snap-file")) $("snap-file").click(); });

  tap("snap-csv", "click", function () {
    var lines = [["模块", "字段 id", "名称", "值", "来源"]], k, seen = 0;
    var idsAll = (typeof FIELDS !== "undefined" && FIELDS.length) ? FIELDS : Object.keys(STORED);
    for (var ii = 0; ii < idsAll.length; ii++) {
      k = idsAll[ii];
      var el = document.getElementById(k);
      var stored = Object.prototype.hasOwnProperty.call(STORED, k) ? STORED[k] : undefined;
      var live = el && el.value !== undefined ? el.value : undefined;
      var val = stored !== undefined ? stored : live;
      if (val === undefined || val === "" || val === null) continue;
      var label = "";
      if (el) {
        var lb = el.closest ? el.closest("label") : null;
        if (lb) { var sp = lb.querySelector("span"); if (sp) label = sp.textContent.trim(); }
        if (!label && el.getAttribute("aria-label")) label = el.getAttribute("aria-label");
      }
      var panel = el && el.closest ? el.closest(".panel") : null;
      var modName = panel ? (panel.id || "").replace(/^panel-/, "") : "";
      lines.push([modName, k, label || "", String(val), stored !== undefined ? "已保存" : "当前页面"]);
      seen++;
    }
    var csv = "\ufeff" + lines.map(function (r) { return r.map(function (c) { return /[",\n]/.test(c) ? '"' + String(c).replace(/"/g, '""') + '"' : c; }).join(","); }).join("\r\n");
    var url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    var a3 = document.createElement("a");
    a3.href = url; a3.download = "财务计算器-全部参数.csv";
    document.body.appendChild(a3); a3.click(); a3.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    flash(this, "已导出 " + seen + " 项参数");
  });
  tap("snap-file", "change", function () {
    readJsonFile(this, function (obj) {
      var incoming = (obj && obj.snaps) || (Object.prototype.toString.call(obj) === "[object Array]" ? obj : null);
      if (!incoming || !incoming.length) { window.alert("文件里没有找到方案快照。"); return; }
      var cur = loadSnaps(), ids = {}, add = 0;
      cur.forEach(function (s) { ids[s.id] = 1; });
      incoming.forEach(function (s) {
        if (!s || !s.id || !s.mod || ids[s.id]) return;
        ids[s.id] = 1; cur.unshift(s); add++;
      });
      saveSnaps(cur.slice(0, 12));
      runCalc("snaps");
      flash($("snap-import"), add ? "导入 " + add + " 条" : "没有新方案");
    });
  });
  tap("snap-csvin", "click", function () { if ($("snap-csvfile")) $("snap-csvfile").click(); });

  tap("snap-csvfile", "change", function () {
    var f = this.files && this.files[0];
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      var txt = String(rd.result || "").replace(/^\ufeff/, "");
      var rows = txt.split(/\r?\n/), n = 0, kv = {}, i, cells;
      for (i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue;
        cells = rows[i].match(/("([^"]|"")*"|[^,]*)(,|$)/g) || [];
        var vals = [];
        for (var c = 0; c < cells.length; c++) {
          var v = cells[c].replace(/,$/, "");
          if (v.charAt(0) === '"') v = v.slice(1, -1).replace(/""/g, '"');
          vals.push(v);
        }
        if (vals.length < 4) continue;
        var id = vals[1], value = vals[3];
        if (!id || value === "" || FIELDS.indexOf(id) < 0) continue;
        kv[id] = value; n++;
      }
      if (!n) { window.alert("这个 CSV 里没找到可导入的参数（需要「导出全部参数 CSV」导出的格式）。"); return; }
      var ok = true;
      try { ok = window.confirm("将导入 " + n + " 项参数并覆盖当前值，确定吗？"); } catch (e) {}
      if (!ok) return;
      for (var k in kv) { if (Object.prototype.hasOwnProperty.call(STORED, k) || FIELDS.indexOf(k) >= 0) STORED[k] = kv[k]; }
      try { localStorage.setItem(KEY, JSON.stringify(STORED)); } catch (e) {}
      window.alert("已导入 " + n + " 项参数，页面将刷新以应用。");
      location.reload();
    };
    rd.readAsText(f, "utf-8");
    this.value = "";
  });

  tap("snap-backup", "click", function () {
    var data = {};
    FIELDS.forEach(function (f) { var el = $(f); if (el && el.value !== "") data[f] = el.value; });
    var cat = "hot";
    try { cat = localStorage.getItem(CAT_KEY) || "hot"; } catch (e) {}
    dlJson("财务计算器-备份-" + stamp() + ".json", {
      app: "finance-calc", kind: "all", v: 1, at: new Date().toISOString(),
      fields: data, fav: favList, presets: presets, snaps: loadSnaps(), cat: cat,
      theme: document.documentElement.getAttribute("data-theme") || "light"
    });
    flash(this, "已备份");
  });
  tap("snap-restore", "click", function () { if ($("bak-file")) $("bak-file").click(); });
  tap("bak-file", "change", function () {
    readJsonFile(this, function (obj) {
      if (!obj || obj.app !== "finance-calc" || !obj.kind) { window.alert("这不是财务计算器的备份文件。"); return; }
      var ok = true;
      try { ok = window.confirm("用这份备份覆盖本机的填写值、置顶、预设与快照？页面会刷新。"); } catch (e) {}
      if (!ok) return;
      try {
        if (obj.fields) FIELDS.forEach(function (f) {
          var el = $(f);
          if (el && obj.fields[f] !== undefined && obj.fields[f] !== null) el.value = obj.fields[f];
        });
        if (obj.fav) localStorage.setItem(FAV_KEY, JSON.stringify(obj.fav));
        if (obj.presets) localStorage.setItem(PRE_KEY, JSON.stringify(obj.presets));
        if (obj.snaps) localStorage.setItem(SNAP_KEY, JSON.stringify(obj.snaps.slice(0, 20)));
        if (obj.cat) localStorage.setItem(CAT_KEY, obj.cat);
        if (obj.theme) localStorage.setItem(THEME_KEY, obj.theme);
        save();
      } catch (e) {}
      location.reload();
    });
  });

  tap("snap-png", "click", function () {
    var btn = this, box = $("snap-cmp-body");
    if (!box) return;
    var table = box.closest("table");
    var head = table ? table.querySelector("thead tr") : null;
    var hs = head ? [].map.call(head.children, function (th) { return th.textContent.trim(); }) : [];
    var rows = [];
    var trs = box.querySelectorAll("tr");
    for (var r = 0; r < trs.length; r++) {
      rows.push([].map.call(trs[r].children, function (td) { return td.textContent.trim(); }));
    }
    if (rows.length < 2 || rows[0].length < 2) { flash(btn, "先勾选 2–3 个方案"); return; }
    var cols = Math.max(hs.length, rows[0].length, 2);
    var pad = 22, rowH = 32, top = 96, w = 980;
    var hgt = top + 34 + rows.length * rowH + 40;
    var cv = document.createElement("canvas");
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = w * dpr; cv.height = hgt * dpr;
    var g = cv.getContext("2d");
    g.scale(dpr, dpr);
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, hgt);
    g.fillStyle = "#1e3a8a"; g.font = "bold 21px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
    g.fillText("财务计算器 · 方案对比", pad, 44);
    g.fillStyle = "#64748b"; g.font = "13px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
    g.fillText("生成时间 " + new Date().toLocaleString("zh-CN") + "　·　" + location.host, pad, 68);
    if (hs.length > 1) {
      var legend = "";
      for (var li = 1; li < hs.length; li++) legend += (li > 1 ? "　|　" : "") + String.fromCharCode(64 + li) + ". " + hs[li];
      g.fillStyle = "#475569"; g.font = "12.5px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
      g.fillText(clipRaw(legend, w - pad * 2), pad, 86);
    }
    var cw = (w - pad * 2) / cols;
    function clipRaw(txt, max) {
      var f = g.font;
      if (g.measureText(String(txt)).width <= max) return String(txt);
      var s = String(txt);
      while (s.length > 1 && g.measureText(s + "…").width > max) s = s.slice(0, -1);
      g.font = f;
      return s + "…";
    }
    function clip(txt, max) {
      var t = String(txt);
      if (g.measureText(t).width <= max) return t;
      var s = t;
      while (s.length > 1 && g.measureText(s + "…").width > max) s = s.slice(0, -1);
      return s + "…";
    }
    g.textBaseline = "middle";
    g.fillStyle = "#eef2ff"; g.fillRect(pad, top, w - pad * 2, 34);
    g.fillStyle = "#1e3a8a"; g.font = "bold 14px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
    for (var i = 0; i < cols; i++) {
      var label = hs[i] == null ? "" : hs[i];
      if (i === 0) g.textAlign = "left", g.fillText(clip(label, cw - 14), pad + 10, top + 17);
      else g.textAlign = "right", g.fillText(clip(label, cw - 14), pad + cw * (i + 1) - 10, top + 17);
    }
    g.font = "14px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
    for (var r2 = 0; r2 < rows.length; r2++) {
      var y = top + 34 + r2 * rowH;
      if (r2 % 2 === 1) { g.fillStyle = "#f8fafc"; g.fillRect(pad, y, w - pad * 2, rowH); }
      g.fillStyle = "#0f172a";
      for (var c = 0; c < cols; c++) {
        var txt = rows[r2][c] == null ? "" : rows[r2][c];
        if (c === 0) { g.textAlign = "left"; g.fillText(clip(txt, cw - 14), pad + 10, y + rowH / 2); }
        else { g.textAlign = "right"; g.fillText(clip(txt, cw - 14), pad + cw * (c + 1) - 10, y + rowH / 2); }
      }
    }
    g.strokeStyle = "#e2e8f0"; g.lineWidth = 1;
    g.beginPath(); g.moveTo(pad, top + 34 + rows.length * rowH); g.lineTo(w - pad, top + 34 + rows.length * rowH); g.stroke();
    g.textAlign = "left"; g.fillStyle = "#94a3b8"; g.font = "12px -apple-system,'PingFang SC','Microsoft YaHei',sans-serif";
    g.fillText("纯前端计算，数据不上传 · 结果按页面假设推算，实际以合同与当地政策为准", pad, top + 34 + rows.length * rowH + 22);
    cv.toBlob(function (blob) {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "财务计算器-方案对比-" + fmtAt(Date.now()).replace(/[^\d]/g, "").slice(0, 12) + ".png";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
      flash(btn, "已导出 PNG");
    }, "image/png");
  });

  /* 面板挂载完成后，把「分享链接带来的参数」补上（之前的 applyParams 找不到元素） */
  function flushParams() {
    if (!PENDING_PARAMS) return;
    var s = PENDING_PARAMS;
    PENDING_PARAMS = null;
    applyParams(s, true);
  }

  tap("mtg-fill", "click", function () { fillMonthGrid(); });

  /* ---------------- 命令面板（Ctrl/Cmd+K） ---------------- */
  var PALETTE_EL = null;
  function openPalette() {
    if (!PALETTE_EL) {
      PALETTE_EL = document.createElement("div");
      PALETTE_EL.id = "palette";
      PALETTE_EL.className = "palette";
      PALETTE_EL.innerHTML = '<div class="pal-box" role="dialog" aria-modal="true" aria-label="模块搜索面板">'
        + '<input class="pal-q" id="pal-q" type="search" placeholder="输入模块名、英文 id 或拼音，↑↓ 选择，回车打开">'
        + '<ul class="pal-list" id="pal-list"></ul>'
        + '<p class="pal-hint">共 188 个模块 · Enter 打开 · Esc 关闭</p></div>';
      document.body.appendChild(PALETTE_EL);
      $("pal-q").addEventListener("input", renderPalette);
      $("pal-q").addEventListener("keydown", palKey);
      PALETTE_EL.addEventListener("click", function (e) {
        if (e.target === PALETTE_EL) { closePalette(); return; }
        var li = e.target.closest ? e.target.closest("li[data-tab]") : null;
        if (li) { closePalette(); activate(li.dataset.tab); }
      });
    }
    PALETTE_EL.hidden = false;
    var inp = $("pal-q");
    if (inp) { inp.value = ""; }
    renderPalette();
    setTimeout(function () { if (inp) inp.focus(); }, 0);
  }
  function closePalette() { if (PALETTE_EL) PALETTE_EL.hidden = true; }
  function renderPalette() {
    var q = ($("pal-q").value || "").trim().toLowerCase();
    var list = $("pal-list");
    if (!list) return;
    var items = [];
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
      var t = tabs[i];
      if (!q || matchQ(t, q)) items.push({ id: t.dataset.tab, label: t.textContent.trim() });
    }
    if (!items.length) { list.innerHTML = '<li class="pal-none">没有匹配的模块</li>'; return; }
    items = items.slice(0, 50);
    list.innerHTML = items.map(function (x, i) {
      return '<li data-tab="' + x.id + '"' + (i === 0 ? ' class="is-on"' : '') + '><span>' + x.label + '</span><em>' + x.id + '</em></li>';
    }).join("");
  }
  function palKey(e) {
    var list = $("pal-list");
    var items = list ? list.querySelectorAll("li[data-tab]") : [];
    var cur = list ? list.querySelector("li.is-on") : null;
    var idx = cur ? Array.prototype.indexOf.call(items, cur) : -1;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!items.length) return;
      var n = (idx + (e.key === "ArrowDown" ? 1 : items.length - 1)) % items.length;
      if (cur) cur.classList.remove("is-on");
      items[n].classList.add("is-on");
      if (items[n].scrollIntoView) items[n].scrollIntoView({ block: "nearest" });
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (cur) { var id = cur.dataset.tab; closePalette(); activate(id); }
      return;
    }
    if (e.key === "Escape") { e.preventDefault(); closePalette(); return; }
  }
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); openPalette(); }
  });
  if ($("btn-palette")) $("btn-palette").addEventListener("click", function () { openPalette(); });
  if ($("totop")) {
    window.addEventListener("scroll", function () {
      var t = $("totop");
      if (t) t.hidden = window.scrollY < 400;
    }, { passive: true });
    $("totop").addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* 面板级 UI 增强：hint 可折叠 + 长列表表格工具栏（懒加载面板与核心面板共用） */
  function enhancePanelUi(el) {
    var hints = el.querySelectorAll(".card.res p.hint");
    for (var h0 = 0; h0 < hints.length; h0++) {
      var h = hints[h0];
      if (h.closest("details")) continue;
      var det = document.createElement("details");
      det.className = "hintd"; det.open = true;
      var sum = document.createElement("summary");
      sum.textContent = "假设说明";
      h.parentNode.insertBefore(det, h);
      det.appendChild(sum); det.appendChild(h);
    }
  }

  /* 表格工具栏只挂在「真正长」的明细表上（≥10 行），短对比表不再多出两个按钮 */
  function refreshTableTools(el) {
    if (!el) return;
    var tbox = el.querySelector(".tablebox table");
    if (!tbox) return;
    var n = 0;
    var tb = tbox.tBodies && tbox.tBodies.length ? tbox.tBodies[0] : null;
    if (tb) n = tb.rows.length;
    var ex = el.querySelector(".tbtools");
    if (n >= 10) {
      if (!ex) {
        var tbw = document.createElement("div");
        tbw.className = "tbtools";
        var b1 = document.createElement("button"); b1.type = "button"; b1.className = "ghost sm"; b1.setAttribute("data-act", "copy-table"); b1.textContent = "复制表格";
        var b2 = document.createElement("button"); b2.type = "button"; b2.className = "ghost sm"; b2.setAttribute("data-act", "print-table"); b2.textContent = "打印";
        tbw.appendChild(b1); tbw.appendChild(b2);
        var hb = el.querySelector(".tablebox");
        if (hb && hb.parentNode) hb.parentNode.insertBefore(tbw, hb);
      }
    } else if (ex) {
      ex.parentNode.removeChild(ex);
    }
  }

  /* 长列表表格工具栏 + 点击结果数字复制 */
  document.addEventListener("click", function (ev) {
    var b = ev.target && ev.target.closest ? ev.target.closest("[data-act]") : null;
    if (b) {
      var act = b.getAttribute("data-act");
      var card = b.closest(".card");
      var table = card ? card.querySelector(".tablebox table") : null;
      if (act === "copy-table" && table) {
        var lines = [], hd = table.querySelector("thead");
        if (hd) {
          var hr = []; hd.querySelectorAll("th").forEach(function (th) { hr.push(th.textContent.trim()); });
          if (hr.join("").length) lines.push(hr.join("\t"));
        }
        table.querySelectorAll("tbody tr").forEach(function (tr) {
          var rr = []; tr.querySelectorAll("td").forEach(function (td) { rr.push(td.textContent.trim()); });
          lines.push(rr.join("\t"));
        });
        copyText(lines.join("\n")).then(function () { toast("表格已复制（可直接粘进 Excel）"); }).catch(function () { toast("复制失败，请手动选择"); });
      } else if (act === "print-table") {
        doPrint(snapshot().name);
      }
      return;
    }
    var t = ev.target && ev.target.closest ? ev.target.closest(".big strong, ul.kv li b") : null;
    if (!t) return;
    var v = (t.textContent || "").trim();
    if (!v || v === "—" || v === "载入中…") return;
    copyText(v).then(function () { toast("已复制：" + v); }).catch(function () {});
  });

  /* 点击表格任意一行 = 复制这一行（制表符分隔，可直接粘进 Excel） */
  document.addEventListener("click", function (ev) {
    var tr = ev.target && ev.target.closest ? ev.target.closest("tbody tr") : null;
    if (!tr) return;
    if (ev.target.closest && ev.target.closest("a,button,input,select,textarea")) return;
    var cells = [];
    tr.querySelectorAll("td").forEach(function (td) { cells.push(td.textContent.trim()); });
    var line = cells.join("\t");
    if (!line) return;
    copyText(line).then(function () { toast("已复制这一行：" + line); }).catch(function () {});
  });

  /* ---------------- 启动 ---------------- */
  enhanceNums(document);
  var prePanels = document.querySelectorAll(".panel");
  for (var pp = 0; pp < prePanels.length; pp++) enhancePanelUi(prePanels[pp]);
  restore();
  buildTabBadges();
  refreshCounts();
  renderPresets();
  var savedCat = "hot";
  try { savedCat = localStorage.getItem(CAT_KEY) || "hot"; } catch (e) {}
  if (!document.querySelector('.cat[data-cat="' + savedCat + '"]')) savedCat = "hot";
  setCat(savedCat);
  var st0 = hashTarget();
  var lastName = "";
  try { lastName = localStorage.getItem(LAST_KEY) || ""; } catch (e) {}
  loadWfDone();
  refreshWfBadge();
  var startName = TABS[st0.name] ? st0.name : (TABS[lastName] ? lastName : "deposit");
  activate(startName);
  if (st0.params) { applyParams(st0.params); if (calcMap[startName]) calcMap[startName](); }
  FIRST_ACTIVATE = false;
  /* 启动兜底：首屏只保留当前模块一个面板，其余 is-on 一律摘掉（防缓存/竞态导致的叠面板） */
  var _onPanels = document.querySelectorAll(".panel.is-on");
  for (var _op = 0; _op < _onPanels.length; _op++) {
    if (_onPanels[_op].id !== "panel-" + startName) _onPanels[_op].classList.remove("is-on");
  }
  /* 首次使用引导：只提示一次 */
  try {
    if (!localStorage.getItem("finance-calc-hello")) {
      localStorage.setItem("finance-calc-hello", "1");
      setTimeout(function () {
        toast("提示：按 Ctrl/Cmd+K 或点「⌘K 搜模块」快速找功能；点结果数字可复制；所有数据只存本机浏览器，不上传。", 5600);
      }, 900);
    }
  } catch (e) {}
  if (typeof bindPrefetch === "function") bindPrefetch();
  $("ver").textContent = "财务计算器 · 纯前端 · 更新于 " + new Date().toISOString().slice(0, 10) + (BUILD_TAG ? " · " + BUILD_TAG : "");
})();
