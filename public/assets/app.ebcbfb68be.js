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


  /* ---------------- 4. 复利 / 定投 ---------------- */


  /* ---------------- 5. 年化 ---------------- */


  /* ---------------- 6. 通胀 / 购买力 ---------------- */


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



  /* ---------------- 8. 组合贷 ---------------- */


  /* ---------------- 9. 攒钱目标 ---------------- */
  function monthToDate(m) {
    var d = new Date();
    d.setMonth(d.getMonth() + m);
    return d.getFullYear() + " 年 " + (d.getMonth() + 1) + " 月";
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



  /* ---------------- 11. 折扣 / 单价 ---------------- */


  /* ---------------- 标签切换 & 事件 ---------------- */

  /* ---------------- 8. 到手工资（累计预扣法） ---------------- */
  function cumulativeTax(monthlyGross, insuranceMonthly, specialMonthly, months) {
    var income = monthlyGross * months;
    var deduct = 5000 * months + insuranceMonthly * months + specialMonthly * months;
    var taxable = Math.max(0, income - deduct);
    return taxBy(YEAR_TABLE, taxable);
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



  /* ---------------- 10. 信用卡循环利息 ---------------- */


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




  /* ================= 公积金可贷额度 ================= */
  function annuityPV(pay, i, n) {
    if (i <= 0) return pay * n;
    return pay * (1 - Math.pow(1 + i, -n)) / i;
  }



  /* ================= 利率调整后的月供（LPR 重定价） ================= */


  /* ================= 二手房交易税费 ================= */


  /* ================= AA 分摊 ================= */


  /* ================= 退休金测算 ================= */
  var DIVISOR = { 40: 233, 45: 216, 50: 195, 55: 170, 60: 139, 65: 101 };



  /* ================= 卖房换房 ================= */


  /* ================= 公积金对冲：月冲 vs 年冲 ================= */


  /* ================= 多币种折算 ================= */
  var CURS = [
    { k: "USD", name: "美元", id: "mc-usd", out: "mc-usd-out", digits: 2 },
    { k: "EUR", name: "欧元", id: "mc-eur", out: "mc-eur-out", digits: 2 },
    { k: "JPY", name: "日元", id: "mc-jpy", out: "mc-jpy-out", digits: 0 },
    { k: "HKD", name: "港币", id: "mc-hkd", out: "mc-hkd-out", digits: 2 },
    { k: "GBP", name: "英镑", id: "mc-gbp", out: "mc-gbp-out", digits: 2 }
  ];



  /* ================= 提前还款 vs 理财 ================= */
  function leftAfter(P, i, pay, m) {
    var x = P;
    for (var k = 0; k < m; k++) { x = x * (1 + i) - pay; if (x <= 0) return 0; }
    return x;
  }



  /* ================= 教育金 ================= */


  /* ================= 保险保额 ================= */


  /* ================= 买车 vs 打车 ================= */


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



  /* ================= 专项附加扣除 ================= */


  /* ================= 存单阶梯 ================= */


  /* ================= 租售比 ================= */


  /* ================= 年度汇算退税 ================= */


  /* ================= 家庭资产负债表 ================= */


  /* ================= 灵活就业社保 ================= */


  /* ================= 社保少缴核查 ================= */



  /* ---------------- 三种还法对撞 ---------------- */


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



  /* ---------------- 保单体检 ---------------- */


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



  /* ---------------- 债务先还哪笔：雪崩 vs 雪球 ---------------- */


  /* ---------------- FIRE 财务自由 ---------------- */


  /* ---------------- 年缴费用分摊 ---------------- */


  /* ---------------- 买房预算反推 ---------------- */


  /* ---------------- 商转公能省多少 ---------------- */


  /* ---------------- 医保能报多少 ---------------- */


  /* ---------------- 养一个孩子要多少钱 ---------------- */


  /* ---------------- 个人养老金账户划算吗 ---------------- */



  /* ---------------- 公积金缴存与额度 ---------------- */


  /* ---------------- 应急金 ---------------- */


  /* ---------------- 收入分配体检 50/30/20 ---------------- */


  /* ---------------- 债务置换 ---------------- */


  /* ---------------- 信用卡免息期与最优刷卡日 ---------------- */


  /* ---------------- 加班费与请假扣款 ---------------- */


  /* ---------------- 涨租 vs 搬家 ---------------- */


  /* ---------------- 油车 vs 电车 ---------------- */


  /* ---------------- 发票价税分离 ---------------- */


  /* ---------------- 增值税与附加税 ---------------- */


  /* ---------------- 固定资产折旧 ---------------- */


  /* ---------------- 保本点与目标利润 ---------------- */


  /* ---------------- 报表体检（杜邦） ---------------- */


  /* ---------------- 银行余额调节 ---------------- */


  /* ---------------- 差旅报销单合计 ---------------- */


  /* ---------------- 应收账款账龄 ---------------- */


  /* ---------------- 资金排期 ---------------- */


  /* ---------------- 含税报价与毛利 ---------------- */










  /* ---------------- 应付账龄 ---------------- */


  /* ---------------- 成本核算（品种法） ---------------- */


  /* ---------------- 预算差异分析 ---------------- */


  /* ---------------- 月度利润表 ---------------- */










  /* 存货周转与库龄分析 */


  /* 出口退税（生产企业免抵退） */


  /* 往来对账（双向调节） */


  /* 三费趋势（6 期） */


  /* ---------------- 多产品保本与安全边际 ---------------- */


  /* ---------------- 工资表代扣核对 ---------------- */


  /* ---------------- 固定资产盘点差异 ---------------- */


  /* ---------------- 月度关账进度 ---------------- */



  /* ---------------- 应收保理 / 贴现 ---------------- */


  /* ---------------- 呆滞库存清理决策 ---------------- */


  /* ---------------- 供应商账期谈判 ---------------- */


  /* ---------------- 13 周滚动现金流 ---------------- */



  /* ---------------- 票据贴现成本 ---------------- */


  /* ---------------- 贷款真实利率 ---------------- */


  /* ---------------- 催收优先级 ---------------- */


  /* ---------------- 月度经营数据包 ---------------- */










  /* ===== 增值税税负率监控 ===== */


  /* ===== 利润敏感性 ===== */


  /* ===== 合并抵销 ===== */


  /* ===== 订货批量与安全库存 ===== */


  /* ===== 销售提成方案对比 ===== */


  /* ===== 固定资产投决 ===== */


  /* ===== 资金归集与内部借款 ===== */


  /* ===== 客户信用额度核定 ===== */


  /* ===== 年度预算联动 ===== */


  /* ===== 出口退税资金占用 ===== */


  /* ===== 制造费用分摊方法对比 ===== */


  /* ===== 进口到岸成本 ===== */


  /* ===== 关联方转移定价 ===== */


  /* ===== 股权激励费用摊销 ===== */


  /* ===== 研发费用加计扣除 ===== */


  /* ===== 滚动预测 ===== */


  /* ===== 自产还是外购 ===== */


  /* ===== 应收账款预期信用损失 ===== */


  /* ===== 出口报价换算 ===== */


  /* ===== 多工厂产能分配 ===== */


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


  /* ===== 阶梯返利 ===== */


  /* ===== 标准成本三差异 ===== */


  /* ===== 安全库存与服务水平 ===== */


  /* ===== 企业所得税汇算调整 ===== */


  /* ===== 供应商集中度 ===== */


  /* ===== 关联方利息扣除限额 ===== */


  /* ===== 设备一次性扣除税会差异 ===== */


  /* ===== 客户级盈利 ===== */


  /* ===== 设备换新 ===== */


  /* ===== 辅助部门费用分摊 ===== */


  /* ===== 股东回报与分红 ===== */


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



  /* ---------- 账期到期与逾期 ---------- */
  function bizAdd(d, n) {
    var c = 0;
    while (c < n) {
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) c++;
    }
    return d;
  }


  /* ---------- 工作日与日期差 ---------- */


  /* ---------- 增幅与年化 ---------- */


  /* ---------- 尾差分摊 ---------- */


  /* ---------- 税后反推税前 ---------- */






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


  function parseAmounts(str) {
    var m = String(str || "").replace(/[,，¥$、\s]+/g, " ").match(/-?\d+(?:\.\d+)?/g) || [];
    return m.map(function (x) { return parseFloat(x); }).filter(function (x) { return isFinite(x); });
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
  function makeSnap(name, note) {
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
    return { id: "s" + Date.now(), mod: mod, modName: snapNameOf(mod), name: name || snapNameOf(mod), note: note || "", rows: rows, params: params, at: Date.now() };
  }

  /* ---------------- 家庭财务体检 ---------------- */


  /* ---------------- 一页体检报告 ---------------- */


  /* ---------------- 方案快照 ---------------- */


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
        return [s.name, s.note, s.modName, s.mod].join(" ").toLowerCase().indexOf(q) >= 0;
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
        + "<td class=\"tal\"><b>" + (s.name || "") + "</b>" + (s.note ? "<br><span class=\"mut\">" + s.note + "</span>" : "") + "</td>"
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

  /* ---------------- 购房一次性支出 ---------------- */


  /* ---------------- 组合规划：买这套房之后 ---------------- */
  function plScoreSave(r) { return r >= 0.3 ? 20 : r >= 0.2 ? 15 : r >= 0.1 ? 10 : 5; }
  function plScoreEmg(m) { return m >= 6 ? 20 : m >= 4 ? 15 : m >= 2 ? 10 : 5; }
  function plScoreLev(r) { return r < 0.3 ? 20 : r < 0.5 ? 15 : r < 0.7 ? 10 : 5; }
  function plScoreDsr(r) { return r < 0.3 ? 20 : r < 0.4 ? 15 : r < 0.5 ? 10 : 5; }
  function plScoreCov(r) { return r >= 1 ? 20 : r >= 0.7 ? 15 : r >= 0.4 ? 10 : 5; }
  function plRank(s) { return s >= 85 ? "优秀" : s >= 70 ? "良好" : s >= 55 ? "及格" : "需要调整"; }



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

undefined

  /* ---- 按分类懒加载：只有点到的模块才下载对应 chunk ---- */
  var CHUNK_OF = { "deposit": "save", "loan": "loan", "combo": "loan", "prepay": "loan", "compound": "save", "goal": "save", "installment": "life", "annual": "save", "inflation": "save", "tax": "tax", "deal": "life", "salary": "tax", "rentbuy": "house", "card": "life", "fx": "life", "fund": "loan", "lpr": "loan", "deed": "house", "split": "life", "pension": "tax", "sell": "house", "offset": "loan", "multi": "life", "repayvs": "loan", "edu": "family", "insure": "family", "car": "life", "bonus": "tax", "deduct": "tax", "ladder": "save", "rentyield": "house", "settle": "tax", "balance": "family", "selfins": "tax", "underpay": "tax", "loanways": "loan", "dca": "save", "checkup": "family", "calendar": "save", "cashflow": "family", "zeroloan": "loan", "riskalloc": "family", "penalty": "loan", "debtfree": "life", "fire": "family", "annualfee": "family", "budget": "house", "zhuan": "loan", "medins": "tax", "childcost": "family", "ppension": "tax", "fundlimit": "loan", "emergency": "family", "rule503020": "family", "debtmerge": "life", "freeperiod": "life", "overtime": "tax", "rentup": "house", "ev": "life", "vat": "acct-tax", "vatdue": "acct-tax", "deprec": "acct-cost", "breakeven": "acct-perf", "ratios": "acct-report", "recon": "acct-report", "expense": "acct-report", "aging": "acct-bd", "funding": "acct-cash", "pricing": "acct-perf", "triplede": "acct-report", "multimargin": "acct-perf", "apterms": "acct-bd", "assetledger": "acct-cost", "payage": "acct-bd", "costcard": "acct-cost", "budgetvar": "acct-cost", "finreport": "acct-report", "invoice": "acct-bd", "expbudget": "acct-report", "efficiency": "acct-report", "cashstmt": "acct-report", "invstock": "acct-bd", "exportrebate": "acct-tax", "tieout": "acct-bd", "feetrend": "acct-report", "mpbe": "acct-perf", "payroll": "acct-perf", "assetdiff": "acct-cost", "monthclose": "acct-report", "factoring": "acct-cash", "deadstock": "acct-bd", "aptalk": "acct-cash", "cash13": "acct-cash", "bill": "acct-cash", "loanreal": "loan", "collect": "acct-bd", "mgmtpack": "acct-report", "settleway": "acct-cash", "creditline": "acct-cash", "impair": "acct-bd", "fxgain": "acct-cash", "taxburden": "acct-tax", "sens": "acct-report", "consol": "acct-report", "eoq": "acct-bd", "bplan": "acct-report", "refundflow": "acct-tax", "costalloc": "acct-cost", "importcost": "acct-perf", "makeorbuy": "acct-cost", "ecl": "acct-bd", "quotefx": "acct-perf", "capacity": "acct-cost", "mold": "acct-cost", "rebate": "acct-perf", "stdcost": "acct-cost", "svc": "acct-bd", "taxadj": "acct-tax", "supplier": "acct-bd", "debtcap": "acct-tax", "accdep": "acct-tax", "custwin": "acct-bd", "upgrade": "acct-cost", "deptalloc": "acct-cost", "payout": "acct-perf", "numwords": "util", "duedate": "util", "workday": "util", "cagr": "util", "apportion": "util", "grossup": "util", "trprice": "acct-cash", "esop": "acct-tax", "rdexp": "acct-tax", "rollfc": "acct-report", "commission": "acct-perf", "capex": "acct-cost", "pooling": "acct-cash", "creditlimit": "acct-cash", "contractperf": "acct-report", "projrev": "acct-report", "creditpolicy": "acct-bd", "rateadj": "tax", "invfund": "acct-bd", "machrate": "acct-cost", "govgrant": "acct-tax", "fxtranslate": "acct-report", "rebateacc": "acct-perf", "pledgeloan": "acct-cash", "labvar": "acct-cost", "rdcap": "acct-tax", "processcost": "acct-cost", "makeoroutsource": "acct-cost", "rebatedta": "acct-tax", "leasebuy": "acct-cash", "welfare": "acct-tax", "inputout": "acct-tax", "stampduty": "acct-tax", "assetdisp": "acct-cost", "headcount": "acct-perf", "markroi": "acct-perf", "rdproject": "acct-cost", "intsvc": "acct-tax", "accrual": "acct-report", "cfconsol": "acct-report", "exportcheck": "acct-tax", "vatcheck": "acct-tax", "report": "family", "snaps": "util", "housecash": "house", "planner": "family", "healthcheck": "hot", "salesallow": "acct-tax", "lease": "acct-report", "gpmix": "acct-report", "vatchoose": "acct-tax", "datemath": "util", "pct3": "util", "xlhelp": "util", "csvrecon": "util" };
  var TABS = { "deposit": 1, "loan": 1, "combo": 1, "prepay": 1, "compound": 1, "goal": 1, "installment": 1, "annual": 1, "inflation": 1, "tax": 1, "deal": 1, "salary": 1, "rentbuy": 1, "card": 1, "fx": 1, "fund": 1, "lpr": 1, "deed": 1, "split": 1, "pension": 1, "sell": 1, "offset": 1, "multi": 1, "repayvs": 1, "edu": 1, "insure": 1, "car": 1, "bonus": 1, "deduct": 1, "ladder": 1, "rentyield": 1, "settle": 1, "balance": 1, "selfins": 1, "underpay": 1, "loanways": 1, "dca": 1, "checkup": 1, "calendar": 1, "cashflow": 1, "zeroloan": 1, "riskalloc": 1, "penalty": 1, "debtfree": 1, "fire": 1, "annualfee": 1, "budget": 1, "zhuan": 1, "medins": 1, "childcost": 1, "ppension": 1, "fundlimit": 1, "emergency": 1, "rule503020": 1, "debtmerge": 1, "freeperiod": 1, "overtime": 1, "rentup": 1, "ev": 1, "vat": 1, "vatdue": 1, "deprec": 1, "breakeven": 1, "ratios": 1, "recon": 1, "expense": 1, "aging": 1, "funding": 1, "pricing": 1, "triplede": 1, "multimargin": 1, "apterms": 1, "assetledger": 1, "payage": 1, "costcard": 1, "budgetvar": 1, "finreport": 1, "invoice": 1, "expbudget": 1, "efficiency": 1, "cashstmt": 1, "invstock": 1, "exportrebate": 1, "tieout": 1, "feetrend": 1, "mpbe": 1, "payroll": 1, "assetdiff": 1, "monthclose": 1, "factoring": 1, "deadstock": 1, "aptalk": 1, "cash13": 1, "bill": 1, "loanreal": 1, "collect": 1, "mgmtpack": 1, "settleway": 1, "creditline": 1, "impair": 1, "fxgain": 1, "taxburden": 1, "sens": 1, "consol": 1, "eoq": 1, "bplan": 1, "refundflow": 1, "costalloc": 1, "importcost": 1, "makeorbuy": 1, "ecl": 1, "quotefx": 1, "capacity": 1, "mold": 1, "rebate": 1, "stdcost": 1, "svc": 1, "taxadj": 1, "supplier": 1, "debtcap": 1, "accdep": 1, "custwin": 1, "upgrade": 1, "deptalloc": 1, "payout": 1, "numwords": 1, "duedate": 1, "workday": 1, "cagr": 1, "apportion": 1, "grossup": 1, "trprice": 1, "esop": 1, "rdexp": 1, "rollfc": 1, "commission": 1, "capex": 1, "pooling": 1, "creditlimit": 1, "contractperf": 1, "projrev": 1, "creditpolicy": 1, "rateadj": 1, "invfund": 1, "machrate": 1, "govgrant": 1, "fxtranslate": 1, "rebateacc": 1, "pledgeloan": 1, "labvar": 1, "rdcap": 1, "processcost": 1, "makeoroutsource": 1, "rebatedta": 1, "leasebuy": 1, "welfare": 1, "inputout": 1, "stampduty": 1, "assetdisp": 1, "headcount": 1, "markroi": 1, "rdproject": 1, "intsvc": 1, "accrual": 1, "cfconsol": 1, "exportcheck": 1, "vatcheck": 1, "report": 1, "snaps": 1, "housecash": 1, "planner": 1, "healthcheck": 1, "salesallow": 1, "lease": 1, "gpmix": 1, "vatchoose": 1, "datemath": 1, "pct3": 1, "xlhelp": 1, "csvrecon": 1 };
  var CHUNK_FILES = { "save": "assets/c-save.1da39d83a9.js", "loan": "assets/c-loan.34aeae3a7c.js", "life": "assets/c-life.2e698054e4.js", "tax": "assets/c-tax.40117aff8f.js", "house": "assets/c-house.407d65b515.js", "family": "assets/c-family.f21a93a798.js", "acct-tax": "assets/c-acct-tax.2f25671bd6.js", "acct-cost": "assets/c-acct-cost.8906504f8f.js", "acct-perf": "assets/c-acct-perf.6ffbaa6727.js", "acct-report": "assets/c-acct-report.f768fbb162.js", "acct-bd": "assets/c-acct-bd.8e80ef2942.js", "acct-cash": "assets/c-acct-cash.6e77d92ba4.js", "util": "assets/c-util.44b7631221.js", "hot": "assets/c-hot.3bb1a811c2.js" };
  var CORE_CALC = { "loan": calcLoan };
  var calcMap = {};
  Object.keys(CORE_CALC).forEach(function (k) { calcMap[k] = CORE_CALC[k]; });
  var chunkReady = {};
  var PANEL_HTML = {}, ACTIVE = null;
  function mountPanels(grp) {
    var set = PANEL_HTML[grp];
    if (!set) return;
    var host = document.getElementById("panels");
    if (!host) return;
    for (var k in set) {
      if (document.getElementById("panel-" + k)) continue;
      var box = document.createElement("div");
      box.innerHTML = set[k];
      var el = box.firstElementChild;
      if (!el) continue;
      host.appendChild(el);
      applyStoredTo(el);
      if (el.id === "panel-" + ACTIVE) el.classList.add("is-on");
    }
    delete PANEL_HTML[grp];
    runDeferredTaps();
  }
  function ensureChunk(grp) {
    if (chunkReady[grp]) return chunkReady[grp];
    var file = CHUNK_FILES[grp];
    if (!file) return Promise.resolve();
    chunkReady[grp] = import(new URL(file, document.baseURI).href).then(function (mod) {
      var api = (mod && mod.default) ? mod.default : mod;
      Object.keys(api).forEach(function (k) { calcMap[k] = api[k]; });
      if (mod && mod.PANELS) PANEL_HTML[grp] = mod.PANELS;
      mountPanels(grp);
      flushParams();
    }).catch(function (err) {
      chunkReady[grp] = null;
      if (window.console) console.error("chunk 加载失败: " + grp, err);
    });
    return chunkReady[grp];
  }
  function runCalc(name) {
    if (calcMap[name]) { calcMap[name](); return Promise.resolve(); }
    var grp = CHUNK_OF[name];
    if (!grp) return Promise.resolve();
    var pn = document.getElementById("panel-" + name);
    var bgs = pn ? pn.querySelector(".big strong") : null;
    if (bgs && (bgs.textContent === "—" || bgs.textContent === "")) bgs.textContent = "载入中…";
    return ensureChunk(grp).then(function () {
      mountPanels(grp);
      flushParams();
      if (calcMap[name]) calcMap[name]();
    });
  }

  var curCat = "hot", curSub = "";
  var RECENT_KEY = "finance-calc-recent";
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
    var q = (qb && qb.value ? qb.value : "").trim().toLowerCase();
    var tb = document.querySelectorAll(".tab"), shown = 0;
    for (var t = 0; t < tb.length; t++) {
      var el = tb[t], cat = el.dataset.cat || "", ok;
      if (q) {
        ok = matchQ(el, q);                    /* 一搜索就跨分类找，不用先切分类 */
      } else if (curCat === "fav") {
        ok = isFav(el.dataset.tab);
      } else if (curCat === "recent") {
        ok = recentList.indexOf(el.dataset.tab) >= 0;
      } else {
        ok = cat.split(/\s+/).indexOf(curCat) >= 0;
        if (ok && curCat === "acct" && curSub) ok = (el.dataset.grp || "") === curSub;
      }
      el.hidden = !ok;
      if (ok) shown++;
    }
    var subs = $("subs");
    if (subs) subs.hidden = curCat !== "acct" || !!q;
    var tn = $("tabs");
    if (tn) tn.classList.toggle("tall", curCat === "acct" && !curSub && !q);
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
    applyFilter();
    try { localStorage.setItem(CAT_KEY, cat); } catch (e) {}
  }
  function setSub(grp) {
    curSub = grp;
    var sb = document.querySelectorAll(".sub");
    for (var s = 0; s < sb.length; s++) sb[s].classList.toggle("is-on", sb[s].dataset.grp === grp);
    applyFilter();
  }

  function activate(name) {
    ACTIVE = name;
    pushRecent(name);
    var self = document.querySelector('.tab[data-tab="' + name + '"]');
    var qb = $("q");
    if (qb && qb.value) { qb.value = ""; applyFilter(); }
    if (self && self.hidden) setCat(self.dataset.cat.split(/\s+/)[0]);
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
      var on = tabs[i].dataset.tab === name;
      tabs[i].classList.toggle("is-on", on);
      tabs[i].setAttribute("aria-selected", on ? "true" : "false");
    }
    var panels = document.querySelectorAll(".panel");
    for (var j = 0; j < panels.length; j++) panels[j].classList.toggle("is-on", panels[j].id === "panel-" + name);
    runCalc(name);
    if (location.hash !== "#" + name) history.replaceState(null, "", "#" + name);
    var onTab = document.querySelector(".tab.is-on");
    if (onTab && onTab.scrollIntoView) onTab.scrollIntoView({ block: "nearest", inline: "center" });
    var fv = $("btn-fav");
    if (fv) { var f = isFav(name); fv.textContent = f ? "★ 已置顶" : "☆ 置顶"; fv.classList.toggle("on", f); }
  }

  $("tabs").addEventListener("click", function (e) {
    var t = e.target.closest(".tab");
    if (t) activate(t.dataset.tab);
  });

  window.addEventListener("hashchange", function () {
    var st = hashTarget();
    if (st.name && TABS[st.name]) {
      activate(st.name);
      if (st.params) { applyParams(st.params); runCalc(st.name); }
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
    $("q").addEventListener("input", function () { applyFilter(); });
    $("q").addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var first = document.querySelector(".tab:not([hidden])");
      if (first) { activate(first.dataset.tab); flash($("q"), "跳到「" + first.textContent.trim() + "」"); }
    });
  }
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
    runCalc(name);
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
    "rp-inc", "rp-need", "rp-want", "rp-cash", "rp-inv", "rp-house", "rp-debt", "rp-loan", "rp-ins", "rp-prem", "rp-age", "rp-rate", "rp-years",
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
    "hcx-deco", "hcx-furn", "hcx-move", "hcx-need", "hcx-cash"
];
  var KEY = "finance-calc-v46";
  var CAT_KEY = "finance-calc-cat";

  /* ---------------- 现金流月历 ---------------- */


  /* ---------------- 0 利率真实成本 ---------------- */


  /* ---------------- 风险测评与配置 ---------------- */


  /* ---------------- 提前还款违约金临界点 ---------------- */


  /* 全量已存值：面板是懒挂载的，只存当前 DOM 会把没挂载模块的值弄丢 */
  var STORED = {};
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

  function save() {
    try {
      for (var k = 0; k < FIELDS.length; k++) {
        var el = $(FIELDS[k]);
        if (el) STORED[FIELDS[k]] = el.value;
      }
      localStorage.setItem(KEY, JSON.stringify(STORED));
    } catch (err) { /* 隐私模式忽略 */ }
  }

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
    if (TABS[p.module]) activate(p.module);
    Object.keys(p.data).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.value = p.data[id];
    });
    runCalc(p.module);
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
  if ($("btn-cmp")) $("btn-cmp").addEventListener("click", function () {
    var btn = this, cur = currentSnap(), A = loadCmpA();
    if (!A || A.mod !== cur.mod) {
      saveCmpA(cur);
      if ($("cmpbox")) $("cmpbox").hidden = true;
      flash(btn, "已存 A");
      return;
    }
    var mapA = {};
    A.rows.forEach(function (r) { mapA[r[0]] = r[1]; });
    var html = [], diffN = 0;
    cur.rows.forEach(function (r) {
      var av = mapA[r[0]] !== undefined ? mapA[r[0]] : "—";
      var na = numOf(av), nb = numOf(r[1]);
      var d = (isFinite(na) && isFinite(nb)) ? nb - na : NaN;
      var changed = isFinite(d) && Math.abs(d) > 0.005;
      if (changed) diffN++;
      html.push("<tr" + (changed ? ' class="c-info"' : "") + '><td class="tal">' + r[0] + "</td><td>" + av
        + "</td><td>" + r[1] + "</td><td>" + (isFinite(d) ? (d > 0 ? "+" : "") + fmt(d, 2) : "—") + "</td></tr>");
    });
    var pd = [];
    Object.keys(cur.params).forEach(function (k) {
      if (A.params && A.params[k] !== undefined && A.params[k] !== cur.params[k]) pd.push(k + "：" + A.params[k] + " → " + cur.params[k]);
    });
    if ($("cmp-title")) $("cmp-title").textContent = cur.name + " · 前后对比";
    if ($("cmp-body")) $("cmp-body").innerHTML = html.join("");
    if ($("cmp-note")) $("cmp-note").textContent =
      (pd.length ? "改动的参数：" + pd.join("；") + "。" : "参数没有改动。")
      + (diffN ? "结果有 " + diffN + " 项变化（蓝色行）。" : "所有结果完全一致。")
      + " A 是上一次点这里时的快照，B 是现在；再点一次会把当前结果存成新的 A。浏览器关了也不丢。";
    if ($("cmpbox")) { $("cmpbox").hidden = false; $("cmpbox").scrollIntoView({ block: "nearest" }); }
    saveCmpA(cur);
    flash(btn, "已对比");
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
    var top = 104, hgt = top + rows.length * lineH + noteLines.length * 19 + 62;
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
    g.fillStyle = "#cbd5e1"; g.font = "11.5px " + FONT;
    g.fillText("纯前端计算，数据不上传 · 结果按页面假设推算，实际以合同与当地政策为准", pad, hgt - 20);
    cv.toBlob(function (blob) {
      var a2 = document.createElement("a");
      a2.href = URL.createObjectURL(blob);
      a2.download = "财务计算器-" + name + ".png";
      document.body.appendChild(a2); a2.click(); document.body.removeChild(a2);
      setTimeout(function () { URL.revokeObjectURL(a2.href); }, 2000);
      flash(btn, "已导出结果图");
    }, "image/png");
  });

  /* 体检报告：打印 / 存 PDF（浏览器打印面板里选「另存为 PDF」） */
  tap("rp-pdf", "click", function () {
    document.title = "财务计算器-家庭财务体检";
    window.print();
    setTimeout(function () { document.title = "财务计算器 · 个人理财 + 公司财务"; }, 1200);
  });

  if ($("btn-print")) $("btn-print").addEventListener("click", function () {
    var t = document.querySelector(".tab.is-on");
    document.title = "财务计算器-" + (t ? t.textContent.trim() : "计算");
    window.print();
    setTimeout(function () { document.title = "财务计算器 · 个人理财 + 公司财务"; }, 1200);
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
    try { nm = window.prompt("方案名称（可留空；想写备注就写「名称｜备注」）", def) || ""; } catch (e) { nm = ""; }
    var parts = nm.split(/[｜|]/);
    var s = makeSnap((parts[0] || "").trim() || def, (parts[1] || "").trim());
    if (!s) return;
    var arr = loadSnaps();
    arr.unshift(s);
    saveSnaps(arr);
    runCalc("snaps");
    flash(this, "已存方案");
  });

  tap("snap-cmp", "click", function () { runCalc("snaps"); });

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

  /* chunk 里要用到的工具函数，统一挂到 window.FC */
  window.FC = { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, FAV_KEY, FIELDS, KEY, MONTH_TABLE, PENDING_PARAMS, PRE_KEY, RECENT_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, dlJson, ensureChunk, favList, fillUnits, flash, flushParams, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, leftAfter, loadCmpA, loadSnaps, loanRows, makeSnap, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numOf, panelEls, panelParams, parseAmounts, parseDate, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, presets, pushRecent, quickOf, rateOf, readJsonFile, recentList, refreshCounts, renderLoanTable, renderPresets, renderSnapCompare, renderSnapList, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tap, taxBy, updShown, yuan, zOf };

  /* ---------------- 启动 ---------------- */
  restore();
  refreshCounts();
  renderPresets();
  var savedCat = "hot";
  try { savedCat = localStorage.getItem(CAT_KEY) || "hot"; } catch (e) {}
  if (!document.querySelector('.cat[data-cat="' + savedCat + '"]')) savedCat = "hot";
  setCat(savedCat);
  var st0 = hashTarget();
  var startName = TABS[st0.name] ? st0.name : "deposit";
  activate(startName);
  if (st0.params) { applyParams(st0.params); runCalc(startName); }
  $("ver").textContent = "财务计算器 · 纯前端 · 更新于 " + new Date().toISOString().slice(0, 10);
})();
