/* 自动生成，勿手改：house 分类模块（点开才下载） */
const { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DIVISOR, FAV_KEY, FIELDS, KEY, MONTH_TABLE, PRE_KEY, SNAP_KEY, SNAP_PICK, TABS, THEME_KEY, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, dlJson, ensureChunk, favList, fillUnits, flash, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, leftAfter, loadCmpA, loadSnaps, loanRows, makeSnap, money, monthToDate, monthlyIRR, months, npvDiff, num, numOf, panelEls, panelParams, parseAmounts, parseDate, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, presets, quickOf, rateOf, readJsonFile, refreshCounts, renderLoanTable, renderPresets, renderSnapCompare, renderSnapList, rentBuyAt, restore, runCalc, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, snapNameOf, snapshot, st0, stamp, startName, taxBy, yuan, zOf } = window.FC;

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

export default { rentbuy: calcRentBuy, deed: calcDeed, sell: calcSell, rentyield: calcRentYield, budget: calcBudget, rentup: calcRentUp };
