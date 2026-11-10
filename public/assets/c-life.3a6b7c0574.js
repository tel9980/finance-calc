/* 自动生成，勿手改：life 分类模块（点开才下载） */
const { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DIVISOR, FAV_KEY, FIELDS, KEY, MONTH_TABLE, PRE_KEY, SNAP_KEY, SNAP_PICK, TABS, THEME_KEY, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, dlJson, ensureChunk, favList, fillUnits, flash, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, leftAfter, loadCmpA, loadSnaps, loanRows, makeSnap, money, monthToDate, monthlyIRR, months, npvDiff, num, numOf, panelEls, panelParams, parseAmounts, parseDate, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, presets, quickOf, rateOf, readJsonFile, refreshCounts, renderLoanTable, renderPresets, renderSnapCompare, renderSnapList, rentBuyAt, restore, runCalc, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, snapNameOf, snapshot, st0, stamp, startName, taxBy, yuan, zOf } = window.FC;

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
    var list = [1, 5, 6, 10, 15, 20, 25, 28];
    var y = today.getFullYear(), m = today.getMonth();
    for (var k = 0; k < list.length; k++) {
      var d = new Date(y, m, list[k]);
      var inf = info(d);
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + md(d) + "</td><td>" + md(inf.bd) + "</td><td>" + md(inf.pay)
        + "</td><td>" + inf.days + "</td>";
      body.appendChild(tr);
    }

    $("fp-note").textContent = "免息期的起点不是刷卡那天，而是「这笔钱被算进哪期账单」——"
      + "账单日 " + bill + " 号之后刷的，会推到下个月 " + bill + " 号出账，于是白拿更多天。"
      + " 你这张卡最长免息 " + best.days + " 天，就是刷在 " + md(bestDate) + "（账单日次日）的时候；"
      + " 今天刷只有 " + now.days + " 天，比最优少 " + Math.max(0, best.days - now.days) + " 天。大额消费挪到账单日次日再刷，等于白拿一个多月的无息贷款。"
      + " 但要记住三件事：① 免息期只对「全额还款」有效，哪怕差 1 元没还清，全部消费都从记账日起按日息 0.05% 计息（年化 18.25%），免息一天都没有；"
      + " ② 取现、转账、分期不享受免息，取现当天就开始算利息还有手续费；"
      + " ③ 所谓「最低还款」只是不逾期，利息照样全额算，所以别把免息期当收入，它只是让现金流顺一点。";
  }

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

export default { installment: calcInstallment, deal: calcDeal, card: calcCard, fx: calcFx, split: calcSplit, multi: calcMulti, car: calcCar, debtfree: calcDebtFree, debtmerge: calcDebtMerge, freeperiod: calcFreePeriod, ev: calcEv };
