/* 自动生成，勿手改：family 分类模块（点开才下载） */
const { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DIVISOR, FAV_KEY, FIELDS, KEY, MONTH_TABLE, PRE_KEY, SNAP_KEY, SNAP_PICK, TABS, THEME_KEY, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, dlJson, ensureChunk, favList, fillUnits, flash, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, leftAfter, loadCmpA, loadSnaps, loanRows, makeSnap, money, monthToDate, monthlyIRR, months, npvDiff, num, numOf, panelEls, panelParams, parseAmounts, parseDate, pct, percentile, presets, quickOf, rateOf, readJsonFile, refreshCounts, renderLoanTable, renderPresets, renderSnapCompare, renderSnapList, rentBuyAt, restore, runCalc, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, snapNameOf, snapshot, st0, stamp, startName, taxBy, yuan, zOf } = window.FC;

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
    $("rp-note").textContent = "总分 " + score + "（" + level + "），短板是" + names[worst] + "。"
      + acts[worst] + " 打分只看五项硬指标，不含投资能力与收入稳定性；数据只在本机，点「打印」可存成一页 PDF。";
  }

export default { edu: calcEdu, insure: calcInsure, balance: calcBalance, checkup: calcCheckup, cashflow: calcCashflow, riskalloc: calcRiskAlloc, fire: calcFire, annualfee: calcAnnualFee, childcost: calcChild, emergency: calcEmergency, rule503020: calcRule, report: calcReport };
