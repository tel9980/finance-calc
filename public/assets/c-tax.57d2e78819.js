/* 自动生成，勿手改：tax 分类模块（点开才下载） */
const { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, FAV_KEY, FIELDS, KEY, MONTH_CATS, MONTH_TABLE, PENDING_PARAMS, PRE_KEY, RECENT_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, dlJson, drawMonthCats, drawMonthStack, drawRpMini, drawnMonthlyChart, drawnYearChart, ensureChunk, favList, fillUnits, flash, flushParams, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, leftAfter, loadCmpA, loadSnaps, loanRows, makeSnap, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numOf, panelEls, panelParams, parseAmounts, parseDate, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, presets, pushRecent, quickOf, rateOf, readJsonFile, recentList, refreshCounts, renderLoanTable, renderPresets, renderSnapCompare, renderSnapList, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tap, taxBy, updShown, yuan, zOf } = window.FC;

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

export const PANELS = {"tax":"  <section class=\"panel\" id=\"panel-tax\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（综合所得 · 年度）</h2>\n    <label class=\"f\">\n      <span>全年工资薪金收入（税前，元）</span>\n      <input id=\"tx-income\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"240000\">\n    </label>\n    <label class=\"f\">\n      <span>全年三险一金（个人缴纳部分，元）</span>\n      <input id=\"tx-insurance\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"36000\">\n    </label>\n    <label class=\"f\">\n      <span>全年专项附加扣除（元）</span>\n      <input id=\"tx-special\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"24000\">\n      <em>子女教育、住房贷款利息/租金、赡养老人、继续教育、大病医疗、3 岁以下照护等合计</em>\n    </label>\n    <label class=\"f\">\n      <span>全年其他扣除（商业健康险、年金、个人养老金等，元）</span>\n      <input id=\"tx-other\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"0\">\n    </label>\n    <label class=\"f\">\n      <span>年终奖（元，没有填 0）</span>\n      <input id=\"tx-bonus\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"60000\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\" id=\"tx-main-label\">全年个税合计</span>\n      <strong id=\"tx-total\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>应纳税所得额（工资部分）</span><b id=\"tx-taxable\">—</b></li>\n      <li><span>工资部分个税</span><b id=\"tx-salary-tax\">—</b></li>\n      <li><span>年终奖单独计税</span><b id=\"tx-bonus-solo\">—</b></li>\n      <li><span>年终奖并入综合所得（多缴）</span><b id=\"tx-bonus-merged\">—</b></li>\n      <li><span>更划算的方式</span><b id=\"tx-best\">—</b></li>\n      <li><span>税后到手</span><b id=\"tx-net\">—</b></li>\n      <li><span>实际税负率</span><b id=\"tx-rate\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"tx-note\"></p>\n  </div>\n    </div>\n  </section>\n","salary":"  <section class=\"panel\" id=\"panel-salary\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>税前月薪（元）</span>\n      <input id=\"sl-gross\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"25000\">\n    </label>\n    <label class=\"f\">\n      <span>五险一金缴费基数（元）</span>\n      <input id=\"sl-base\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"25000\">\n      <em>一般等于月薪，但有上下限；按工资条上的实际基数填更准</em>\n    </label>\n    <label class=\"f\">\n      <span>公积金个人比例（%）</span>\n      <input id=\"sl-hf\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"12\" step=\"1\" value=\"12\">\n      <em>常见 5%–12%，单位同比例缴纳</em>\n    </label>\n    <label class=\"f\">\n      <span>专项附加扣除（元/月）</span>\n      <input id=\"sl-special\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"2000\">\n    </label>\n    <label class=\"f\">\n      <span>算到当年第几个月</span>\n      <input id=\"sl-month\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"12\" step=\"1\" value=\"12\">\n      <em>累计预扣法下半年会跳档：选 7 看 7 月当月，选 12 看全年平均</em>\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\" id=\"sl-main-label\">本月到手</span>\n      <strong id=\"sl-net\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>五险一金个人部分</span><b id=\"sl-insurance\">—</b></li>\n      <li><span>本月个税（预扣）</span><b id=\"sl-tax\">—</b></li>\n      <li><span>累计已缴个税（到这月）</span><b id=\"sl-acc-tax\">—</b></li>\n      <li><span>全年到手</span><b id=\"sl-year-net\">—</b></li>\n      <li><span>公司另为你缴的社保公积金</span><b id=\"sl-employer\">—</b></li>\n      <li><span>个税 / 税前</span><b id=\"sl-rate\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"sl-note\"></p>\n  </div>\n    </div>\n  </section>\n","pension":"  <section class=\"panel\" id=\"panel-pension\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>当地上年度月社平工资（元）</span>\n      <input id=\"pn-avg\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"8000\">\n    </label>\n    <label class=\"f\">\n      <span>本人平均缴费指数（0.6–3）</span>\n      <input id=\"pn-index\" type=\"number\" inputmode=\"decimal\" min=\"0.1\" max=\"5\" step=\"0.05\" value=\"1\">\n    </label>\n    <label class=\"f\">\n      <span>累计缴费年限（年）</span>\n      <input id=\"pn-years\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"30\">\n    </label>\n    <label class=\"f\">\n      <span>个人账户余额（元）</span>\n      <input id=\"pn-balance\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"200000\">\n    </label>\n    <label class=\"f\">\n      <span>退休年龄</span>\n      <select id=\"pn-age\">\n        <option value=\"50\">50 岁（计发 195 期）</option>\n        <option value=\"55\">55 岁（计发 170 期）</option>\n        <option value=\"60\" selected>60 岁（计发 139 期）</option>\n        <option value=\"65\">65 岁（计发 101 期）</option>\n      </select>\n    </label>\n    <label class=\"f\">\n      <span>期望退休后每月开支（元）</span>\n      <input id=\"pn-expense\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"6000\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">预计每月养老金</span>\n      <strong id=\"pn-total\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>基础养老金</span><b id=\"pn-base\">—</b></li>\n      <li><span>个人账户养老金</span><b id=\"pn-acc\">—</b></li>\n      <li><span>退休前缴费工资（社平×指数）</span><b id=\"pn-wage\">—</b></li>\n      <li><span>养老金替代率</span><b id=\"pn-replace\">—</b></li>\n      <li><span>每年可领</span><b id=\"pn-year\">—</b></li>\n      <li><span>个人账户计发月数</span><b id=\"pn-months\">—</b></li>\n      <li><span>每月缺口（期望开支 − 养老金）</span><b id=\"pn-gap\">—</b></li>\n      <li><span>缺口需自备（按 25 倍年缺口）</span><b id=\"pn-need\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"pn-note\"></p>\n  </div>\n    </div>\n  </section>\n","bonus":"  <section class=\"panel\" id=\"panel-bonus\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>全年工资薪金收入（元，不含年终奖）</span>\n      <input id=\"bn-income\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"240000\">\n    </label>\n    <label class=\"f\">\n      <span>全年三险一金个人部分（元）</span>\n      <input id=\"bn-ins\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"36000\">\n    </label>\n    <label class=\"f\">\n      <span>全年专项附加扣除合计（元）</span>\n      <input id=\"bn-special\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"24000\">\n    </label>\n    <label class=\"f\">\n      <span>年终奖总额（元）</span>\n      <input id=\"bn-bonus\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"60000\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">最低总税额</span>\n      <strong id=\"bn-best\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>工资部分应纳税所得额</span><b id=\"bn-taxable\">—</b></li>\n      <li><span>方案A 全部单独计税</span><b id=\"bn-a\">—</b></li>\n      <li><span>方案B 全部并入综合所得</span><b id=\"bn-b\">—</b></li>\n      <li><span>最优拆分：并入工资</span><b id=\"bn-split-in\">—</b></li>\n      <li><span>最优拆分：单独计税</span><b id=\"bn-split-solo\">—</b></li>\n      <li><span>其中工资部分税</span><b id=\"bn-wage-tax\">—</b></li>\n      <li><span>其中奖金部分税</span><b id=\"bn-bonus-tax\">—</b></li>\n      <li><span>比方案A（全单独）少缴</span><b id=\"bn-save-a\">—</b></li>\n      <li><span>比方案B（全并入）少缴</span><b id=\"bn-save-b\">—</b></li>\n      <li><span>税后到手（含奖）</span><b id=\"bn-net\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"bn-note\"></p>\n  </div>\n    </div>\n  </section>\n","deduct":"  <section class=\"panel\" id=\"panel-deduct\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>收入</h2>\n    <label class=\"f\">\n      <span>全年工资薪金收入（元）</span>\n      <input id=\"dq-income\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"300000\">\n    </label>\n    <label class=\"f\">\n      <span>全年三险一金个人部分（元）</span>\n      <input id=\"dq-ins\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"45000\">\n    </label>\n    <h2 class=\"sub\">专项附加扣除</h2>\n    <label class=\"f\">\n      <span>子女教育（每个子女，2000 元/月）</span>\n      <input id=\"dq-child\" type=\"number\" inputmode=\"numeric\" min=\"0\" max=\"10\" step=\"1\" value=\"1\">\n    </label>\n    <label class=\"f\">\n      <span>3 岁以下婴幼儿（每个，2000 元/月）</span>\n      <input id=\"dq-baby\" type=\"number\" inputmode=\"numeric\" min=\"0\" max=\"10\" step=\"1\" value=\"0\">\n    </label>\n    <label class=\"f\">\n      <span>继续教育</span>\n      <select id=\"dq-edu\">\n        <option value=\"0\" selected>无</option>\n        <option value=\"4800\">学历（继续教育）400 元/月</option>\n        <option value=\"3600\">职业资格 3600 元（当年一次性）</option>\n      </select>\n    </label>\n    <label class=\"f\">\n      <span>住房贷款利息（首套，1000 元/月）</span>\n      <select id=\"dq-loan\">\n        <option value=\"0\" selected>无</option>\n        <option value=\"12000\">有，1000 元/月</option>\n      </select>\n    </label>\n    <label class=\"f\">\n      <span>住房租金（与贷款利息二选一）</span>\n      <select id=\"dq-rent\">\n        <option value=\"0\" selected>无</option>\n        <option value=\"9600\">直辖市/省会/计划单列市 800 元/月</option>\n        <option value=\"13200\">市辖区人口 &gt; 100 万 1100 元/月</option>\n        <option value=\"18000\">市辖区人口 ≤ 100 万 1500 元/月</option>\n      </select>\n    </label>\n    <label class=\"f\">\n      <span>赡养老人</span>\n      <select id=\"dq-elder\">\n        <option value=\"0\" selected>无</option>\n        <option value=\"36000\">独生子女 3000 元/月</option>\n        <option value=\"18000\">非独生，分摊 1500 元/月</option>\n      </select>\n    </label>\n    <label class=\"f\">\n      <span>大病医疗自付金额（元，年，超 1.5 万部分）</span>\n      <input id=\"dq-med\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"0\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">一年少缴个税</span>\n      <strong id=\"dq-save\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>专项附加扣除合计（年）</span><b id=\"dq-total\">—</b></li>\n      <li><span>不填扣除时的应纳税所得额</span><b id=\"dq-base0\">—</b></li>\n      <li><span>不填扣除时应缴个税</span><b id=\"dq-tax0\">—</b></li>\n      <li><span>填完扣除后应纳税所得额</span><b id=\"dq-base1\">—</b></li>\n      <li><span>填完扣除后应缴个税</span><b id=\"dq-tax1\">—</b></li>\n      <li><span>实际税负率（税 ÷ 收入）</span><b id=\"dq-rate\">—</b></li>\n      <li><span>每月少扣（工资条上能看到的）</span><b id=\"dq-month\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"dq-note\"></p>\n  </div>\n    </div>\n  </section>\n","settle":"  <section class=\"panel\" id=\"panel-settle\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>全年工资薪金收入（税前，元）</span>\n      <input id=\"st2-wage\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"300000\">\n    </label>\n    <label class=\"f\">\n      <span>全年三险一金（个人部分，元）</span>\n      <input id=\"st2-ins\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"45000\">\n    </label>\n    <label class=\"f\">\n      <span>全年专项附加扣除（元）</span>\n      <input id=\"st2-special\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"24000\">\n    </label>\n    <label class=\"f\">\n      <span>劳务报酬收入（元，按 80% 计入）</span>\n      <input id=\"st2-other\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"0\">\n    </label>\n    <label class=\"f\">\n      <span>全年已预扣预缴个税（元，个税 App 可查）</span>\n      <input id=\"st2-withheld\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"20000\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">汇算结果</span>\n      <strong id=\"st2-diff\">—</strong>\n      <span class=\"unit\" id=\"st2-diff-unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>综合所得收入额</span><b id=\"st2-income\">—</b></li>\n      <li><span>应纳税所得额</span><b id=\"st2-taxable\">—</b></li>\n      <li><span>全年应纳税额</span><b id=\"st2-tax\">—</b></li>\n      <li><span>已预扣预缴</span><b id=\"st2-pre\">—</b></li>\n      <li><span>边际税率（下一个百元要缴的）</span><b id=\"st2-marginal\">—</b></li>\n      <li><span>实际税负率（税 ÷ 收入）</span><b id=\"st2-real\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"st2-note\"></p>\n  </div>\n    </div>\n  </section>\n","selfins":"  <section class=\"panel\" id=\"panel-selfins\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>当地社平工资（元/月）</span>\n      <input id=\"si-avg\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"8000\">\n    </label>\n    <label class=\"f\">\n      <span>缴费基数档次（社平的 %，60–300）</span>\n      <input id=\"si-ratio\" type=\"number\" inputmode=\"decimal\" min=\"40\" max=\"300\" step=\"10\" value=\"60\">\n    </label>\n    <label class=\"f\">\n      <span>养老保险费率（%，灵活就业一般 20）</span>\n      <input id=\"si-pension\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"20\">\n    </label>\n    <label class=\"f\">\n      <span>医疗保险费率（%，含大病）</span>\n      <input id=\"si-med\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"9\">\n    </label>\n    <label class=\"f\">\n      <span>计划缴费年限（年）</span>\n      <input id=\"si-years\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1\" value=\"15\">\n    </label>\n    <label class=\"f\">\n      <span>退休年龄</span>\n      <select id=\"si-age\">\n        <option value=\"55\">55 岁（计发 170 期）</option>\n        <option value=\"60\" selected>60 岁（计发 139 期）</option>\n      </select>\n    </label>\n    <label class=\"f\">\n      <span>个人账户记账利率（%）</span>\n      <input id=\"si-accountrate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">每月要缴</span>\n      <strong id=\"si-month\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>缴费基数</span><b id=\"si-base\">—</b></li>\n      <li><span>其中养老 / 医疗</span><b id=\"si-split\">—</b></li>\n      <li><span>每月进个人账户</span><b id=\"si-accmonth\">—</b></li>\n      <li><span>每年要缴</span><b id=\"si-year\">—</b></li>\n      <li><span>缴满年限合计</span><b id=\"si-total\">—</b></li>\n      <li><span>退休时个人账户累计</span><b id=\"si-accbal\">—</b></li>\n      <li><span>预计月养老金</span><b id=\"si-pension-out\">—</b></li>\n      <li><span>回本年限（合计 ÷ 年养老金）</span><b id=\"si-payback\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"si-note\"></p>\n  </div>\n    </div>\n  </section>\n","underpay":"  <section class=\"panel\" id=\"panel-underpay\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>你的实际月工资（应缴基数，元）</span>\n      <input id=\"up-wage\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"15000\">\n    </label>\n    <label class=\"f\">\n      <span>公司实际申报的基数（元）</span>\n      <input id=\"up-base\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"6000\">\n    </label>\n    <label class=\"f\">\n      <span>个人合计费率（%，养老8+医疗2+失业0.5）</span>\n      <input id=\"up-personal\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"10.5\">\n    </label>\n    <label class=\"f\">\n      <span>单位合计费率（%，养老16+医疗9.8+失业0.5+工伤0.2）</span>\n      <input id=\"up-company\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"26.5\">\n    </label>\n    <label class=\"f\">\n      <span>公积金比例（%，两侧各）</span>\n      <input id=\"up-hf\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"12\" step=\"1\" value=\"5\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">每月被少缴</span>\n      <strong id=\"up-gap\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>少报的基数</span><b id=\"up-diffbase\">—</b></li>\n      <li><span>个人少缴（你少扣、也少积累）</span><b id=\"up-pgap\">—</b></li>\n      <li><span>单位少缴（本该给你出的）</span><b id=\"up-cgap\">—</b></li>\n      <li><span>其中个人账户养老金少积累</span><b id=\"up-acc\">—</b></li>\n      <li><span>每年少缴合计</span><b id=\"up-year\">—</b></li>\n      <li><span>10 年少缴合计</span><b id=\"up-ten\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"up-note\"></p>\n  </div>\n    </div>\n  </section>\n","medins":"  <section class=\"panel\" id=\"panel-medins\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>住院总费用（元）</span>\n      <input id=\"mi-total\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"80000\"></label>\n    <label class=\"f\"><span>其中完全自费（目录外，元）</span>\n      <input id=\"mi-self\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"12000\"></label>\n    <label class=\"f\"><span>起付线（元）</span>\n      <input id=\"mi-ded\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"1300\"></label>\n    <label class=\"f\"><span>统筹报销比例（%）</span>\n      <input id=\"mi-ratio\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"85\"></label>\n    <label class=\"f\"><span>统筹封顶线（元）</span>\n      <input id=\"mi-cap\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\"></label>\n    <label class=\"f\"><span>大病保险起付（元）</span>\n      <input id=\"mi-bigstart\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"10000\"></label>\n    <label class=\"f\"><span>大病保险报销比例（%）</span>\n      <input id=\"mi-bigratio\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"60\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">你自己要掏</span><strong id=\"mi-net\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>医保目录内费用</span><b id=\"mi-inner\">—</b></li>\n      <li><span>扣掉起付线后的可报基数</span><b id=\"mi-base\">—</b></li>\n      <li><span>统筹基金报销</span><b id=\"mi-reimb\">—</b></li>\n      <li><span>目录内还要自付</span><b id=\"mi-inner-self\">—</b></li>\n      <li><span>大病保险再报</span><b id=\"mi-big\">—</b></li>\n      <li><span>合计报销</span><b id=\"mi-all\">—</b></li>\n      <li><span>实际报销比例</span><b id=\"mi-rate\">—</b></li>\n      <li><span>离封顶线还剩</span><b id=\"mi-room\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"mi-note\"></p>\n  </div>\n    </div>\n  </section>\n","ppension":"  <section class=\"panel\" id=\"panel-ppension\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>每年放进账户（元，上限 12000）</span>\n      <input id=\"pa-pay\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"12000\"></label>\n    <label class=\"f\"><span>你现在的边际税率（%）</span>\n      <input id=\"pa-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"45\" step=\"1\" value=\"20\"></label>\n    <label class=\"f\"><span>现在几岁</span>\n      <input id=\"pa-age\" type=\"number\" inputmode=\"decimal\" min=\"18\" max=\"59\" step=\"1\" value=\"30\"></label>\n    <label class=\"f\"><span>还能缴多少年（到 60 岁）</span>\n      <input id=\"pa-years\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"40\" step=\"1\" value=\"20\"></label>\n    <label class=\"f\"><span>账户里投资年化（%）</span>\n      <input id=\"pa-ret\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"4\"></label>\n    <label class=\"f\"><span>领取时缴税（%）</span>\n      <input id=\"pa-taxout\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"45\" step=\"1\" value=\"3\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">比放在外面投多拿</span><strong id=\"pa-diff\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>每年少缴个税</span><b id=\"pa-save\">—</b></li>\n      <li><span>这些年一共省税</span><b id=\"pa-saveall\">—</b></li>\n      <li><span>账户滚到退休时</span><b id=\"pa-acc\">—</b></li>\n      <li><span>领取时缴税</span><b id=\"pa-out\">—</b></li>\n      <li><span>最终到手</span><b id=\"pa-net\">—</b></li>\n      <li><span>同样的钱自己投（先交税）</span><b id=\"pa-own\">—</b></li>\n      <li><span>本金投入</span><b id=\"pa-in\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>边际税率</th><th>每年省税</th><th>账户净到手</th><th>自己投</th><th>净收益差</th></tr></thead>\n        <tbody id=\"pa-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"pa-note\"></p>\n  </div>\n    </div>\n  </section>\n","overtime":"  <section class=\"panel\" id=\"panel-overtime\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>月薪（税前，元）</span>\n      <input id=\"ot-salary\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"10000\"></label>\n    <label class=\"f\"><span>月计薪天数</span>\n      <input id=\"ot-days\" type=\"number\" inputmode=\"decimal\" min=\"20\" max=\"31\" step=\"0.25\" value=\"21.75\"></label>\n    <label class=\"f\"><span>工作日加班（小时）</span>\n      <input id=\"ot-wd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"20\"></label>\n    <label class=\"f\"><span>休息日加班（天）</span>\n      <input id=\"ot-rest\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"2\"></label>\n    <label class=\"f\"><span>法定节假日加班（天）</span>\n      <input id=\"ot-hol\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"1\"></label>\n    <label class=\"f\"><span>事假（天）</span>\n      <input id=\"ot-leave\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"1\"></label>\n    <label class=\"f\"><span>病假（天）</span>\n      <input id=\"ot-sick\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"2\"></label>\n    <label class=\"f\"><span>病假工资比例（%）</span>\n      <input id=\"ot-sickrate\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"60\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">这个月应发合计</span><strong id=\"ot-total\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>日薪 / 时薪</span><b id=\"ot-hour\">—</b></li>\n      <li><span>工作日加班（1.5 倍）</span><b id=\"ot-p1\">—</b></li>\n      <li><span>休息日加班（2 倍）</span><b id=\"ot-p2\">—</b></li>\n      <li><span>节假日加班（3 倍）</span><b id=\"ot-p3\">—</b></li>\n      <li><span>加班费小计</span><b id=\"ot-ot\">—</b></li>\n      <li><span>事假扣 / 病假扣</span><b id=\"ot-ded\">—</b></li>\n      <li><span>加班费占应发比例</span><b id=\"ot-share\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>每小时加班</th><th>工作日</th><th>休息日</th><th>节假日</th></tr></thead>\n        <tbody id=\"ot-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"ot-note\"></p>\n  </div>\n    </div>\n  </section>\n","rateadj":"  <section class=\"panel\" id=\"panel-rateadj\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>月工资（应发）</span>\n      <input id=\"sbr-wage\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"sbr-old\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"12000\" aria-label=\"旧缴费基数\">\n      <input id=\"sbr-new\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"15000\" aria-label=\"新缴费基数\">\n    </span>\n    <p class=\"hint\">左：调整前基数，右：调整后基数（当地上下限要自己按公布值填）</p>\n    <span class=\"row\">\n      <input id=\"sbr-pr\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"10.5\" aria-label=\"个人比例\">\n      <input id=\"sbr-cr\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"26.5\" aria-label=\"单位比例\">\n    </span>\n    <p class=\"hint\">左：个人合计比例（%），右：单位合计比例（%）</p>\n    <label class=\"f\">\n      <span>当年已按旧基数缴了几个月</span>\n      <input id=\"sbr-months\" type=\"number\" inputmode=\"numeric\" min=\"0\" max=\"12\" step=\"1\" value=\"6\">\n      <em>多数地区 7 月调基，1–6 月差额要一次性补缴或退费</em>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">每月合计多缴</span><strong id=\"sbr-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>个人：旧 → 新</span><b id=\"sbr-p\">—</b></li>\n      <li><span>单位：旧 → 新</span><b id=\"sbr-c\">—</b></li>\n      <li><span>到手工资变化</span><b id=\"sbr-net\">—</b></li>\n      <li><span>已缴月份补退</span><b id=\"sbr-back\">—</b></li>\n      <li><span>全年影响（12 个月）</span><b id=\"sbr-year\">—</b></li>\n      <li><span>基数是否受限</span><b id=\"sbr-cap\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"sbr-note\"></p>\n  </div>\n    </div>\n  </section>\n"};
export default { tax: calcTax, salary: calcSalary, pension: calcPension, bonus: calcBonus, deduct: calcDeduct, settle: calcSettle, selfins: calcSelfIns, underpay: calcUnderpay, medins: calcMedins, ppension: calcPPA, overtime: calcOvertime, rateadj: calcRateAdj };
