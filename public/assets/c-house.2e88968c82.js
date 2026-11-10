/* 自动生成，勿手改：house 分类模块（点开才下载） */
const { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, ERR_BOX, FAV_KEY, FIELDS, FIRST_ACTIVATE, KEY, LAST_KEY, MONTH_CATS, MONTH_TABLE, NEXT_OF, PALETTE_EL, PENDING_PARAMS, PRE_KEY, QUOTA_WARNED, RECENT_KEY, SAVE_TIMER, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, TOAST_EL, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, closePalette, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, diagText, dlJson, doPrint, drawMonthCats, drawMonthStack, drawReportCharts, drawRpMini, drawnMonthlyChart, drawnYearChart, enhanceNums, ensureChunk, favList, fillMonthGrid, fillUnits, flash, flushParams, flushSave, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, lastName, leftAfter, linkTo, loadCmpA, loadSnaps, loanRows, makeSnap, markBadInputs, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numBlur, numFocus, numInput, numKey, numOf, openPalette, palKey, panelEls, panelParams, parseAmounts, parseDate, parseNum, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, presets, printCover, pushRecent, quickOf, rateOf, readJsonFile, readMonthGrid, recentList, refreshCounts, refreshTrackMods, renderLoanTable, renderNext, renderPalette, renderPresets, renderSnapCompare, renderSnapList, renderTrack, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, showErrorBox, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tap, taxBy, toast, trimNum, unitFor, updShown, yuan, zOf } = window.FC;

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
    if ($("ry-links")) $("ry-links").innerHTML = "接着算："
      + linkTo("rentbuy", { "rb-price": price, "rb-rent": rent }, "换成租客视角比一比")
      + linkTo("housecash", { "hcx-price": price }, "这套房签字要备多少现金")
      + linkTo("rentup", { "ru-cur": rent }, "涨租多少值得搬家");
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

export const PANELS = {"housecash":"  <section class=\"panel\" id=\"panel-housecash\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>输入：这套房从签字到住进去要花多少现金</h2>\n        <span class=\"row\">\n          <label class=\"f\"><span>成交价</span><input id=\"hcx-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2000000\"></label>\n          <label class=\"f\"><span>首付比例 %</span><input id=\"hcx-dp\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"30\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>契税 %（占成交价）</span><input id=\"hcx-deed\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"10\" step=\"0.5\" value=\"1.5\"></label>\n          <label class=\"f\"><span>中介费 %（占成交价）</span><input id=\"hcx-agent\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"10\" step=\"0.5\" value=\"2\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>维修基金 %（占成交价）</span><input id=\"hcx-fund\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"5\" step=\"0.5\" value=\"1\"></label>\n          <label class=\"f\"><span>评估/公证/工本等（元）</span><input id=\"hcx-odd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"5000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>装修（元）</span><input id=\"hcx-deco\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\"></label>\n          <label class=\"f\"><span>家具家电（元）</span><input id=\"hcx-furn\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5000\" value=\"80000\"></label>\n        </span>\n        <span class=\"row\">\n          <label class=\"f\"><span>搬家/杂费（元）</span><input id=\"hcx-move\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"10000\"></label>\n          <label class=\"f\"><span>月必需支出（算应急金）</span><input id=\"hcx-need\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"10000\"></label>\n        </span>\n        <label class=\"f\"><span>现有现金（元）</span><input id=\"hcx-cash\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"900000\"></label>\n        <em>口径：契税按成交价×税率估算（首套 90㎡ 以下常为 1%、以上 1.5%，二套更高，以当地为准）；中介费、维修基金各地差异大；二手房还有增值税/个税（满五唯一可免），此处未单列，可并进「税费」。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>结果：签字前要准备多少钱</h2>\n        <div class=\"big\"><span class=\"k\">签字前现金总需求</span><strong id=\"hcx-big\">—</strong><span class=\"unit\">元</span></div>\n        <ul class=\"kv\">\n          <li><span>首付</span><b id=\"hcx-dpout\">—</b></li>\n          <li><span>税费（契税＋中介＋基金＋杂费）</span><b id=\"hcx-tax\">—</b></li>\n          <li><span>装修家具搬家</span><b id=\"hcx-live\">—</b></li>\n          <li><span>建议留的应急金（6 个月）</span><b id=\"hcx-emg\">—</b></li>\n          <li><span>一次性支出占房价</span><b id=\"hcx-ratio\">—</b></li>\n          <li><span>现金够不够</span><b id=\"hcx-enough\">—</b></li>\n          <li><span>能承受的最高成交价</span><b id=\"hcx-cap\">—</b></li>\n        </ul>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th class=\"tal\">项目</th><th>算法</th><th>金额</th></tr></thead>\n            <tbody id=\"hcx-body\"></tbody>\n          </table>\n        </div>\n        <p class=\"hint\" id=\"hcx-note\"></p>\n        <p class=\"jump\" id=\"hcx-links\"></p>\n      </div>\n    </div>\n  </section>\n","rentbuy":"  <section class=\"panel\" id=\"panel-rentbuy\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>房价（元）</span>\n      <input id=\"rb-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50000\" value=\"2000000\">\n    </label>\n    <label class=\"f\">\n      <span>首付比例（%）</span>\n      <input id=\"rb-down\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"30\">\n    </label>\n    <label class=\"f\">\n      <span>房贷年利率（%）</span>\n      <input id=\"rb-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"3.1\">\n    </label>\n    <label class=\"f\">\n      <span>贷款年限（年）</span>\n      <input id=\"rb-years\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"30\">\n    </label>\n    <label class=\"f\">\n      <span>同地段月租金（元）</span>\n      <input id=\"rb-rent\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"4000\">\n    </label>\n    <label class=\"f\">\n      <span>打算持有几年后比较</span>\n      <input id=\"rb-hold\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1\" value=\"10\">\n    </label>\n    <label class=\"f\">\n      <span>房价年涨幅（%）</span>\n      <input id=\"rb-growth\" type=\"number\" inputmode=\"decimal\" step=\"0.5\" value=\"2\">\n    </label>\n    <label class=\"f\">\n      <span>租金年涨幅（%）</span>\n      <input id=\"rb-rgrowth\" type=\"number\" inputmode=\"decimal\" step=\"0.5\" value=\"3\">\n    </label>\n    <label class=\"f\">\n      <span>理财年化（%）（首付和差额的钱）</span>\n      <input id=\"rb-invest\" type=\"number\" inputmode=\"decimal\" step=\"0.5\" value=\"2.5\">\n    </label>\n    <label class=\"f\">\n      <span>每年持有成本（物业+维修+取暖等，元）</span>\n      <input id=\"rb-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"5000\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\" id=\"rb-diff-label\">十年后净资产差</span>\n      <strong id=\"rb-diff\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>买房：期末净资产（房产 − 剩余贷款）</span><b id=\"rb-buy-net\">—</b></li>\n      <li><span>租房：期末资产（首付+差额去理财）</span><b id=\"rb-rent-net\">—</b></li>\n      <li><span>首付 / 贷款</span><b id=\"rb-loan\">—</b></li>\n      <li><span>月供 / 月租金 / 月差额</span><b id=\"rb-monthly\">—</b></li>\n      <li><span>期末房子值多少</span><b id=\"rb-house\">—</b></li>\n      <li><span>临界房价年涨幅（低于它租房更划算）</span><b id=\"rb-breakeven\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"rb-note\"></p>\n        <p class=\"jump\" id=\"rb-links\"></p>\n  </div>\n    </div>\n  </section>\n","deed":"  <section class=\"panel\" id=\"panel-deed\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>成交价 / 网签价（元）</span>\n      <input id=\"dd-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50000\" value=\"2000000\">\n    </label>\n    <label class=\"f\">\n      <span>建筑面积（㎡）</span>\n      <input id=\"dd-area\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"90\">\n    </label>\n    <label class=\"f\">\n      <span>买方第几套</span>\n      <select id=\"dd-first\">\n        <option value=\"1\" selected>首套</option>\n        <option value=\"2\">二套</option>\n        <option value=\"3\">三套及以上</option>\n      </select>\n    </label>\n    <label class=\"f\">\n      <span>契税税率（%）</span>\n      <input id=\"dd-deed\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"1\">\n      <em>首套 90㎡ 及以下多为 1%，90㎡ 以上 1.5%；二套多为 1%–2%，以当地为准</em>\n    </label>\n    <label class=\"f\">\n      <span>卖方持有年限</span>\n      <select id=\"dd-hold\">\n        <option value=\"2\" selected>满 2 年（免增值税）</option>\n        <option value=\"0\">不满 2 年（要交增值税）</option>\n      </select>\n    </label>\n    <label class=\"f\">\n      <span>增值税及附加税率（%）</span>\n      <input id=\"dd-vat\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"5.3\">\n    </label>\n    <label class=\"f\">\n      <span>卖方个税</span>\n      <select id=\"dd-income-tax\">\n        <option value=\"1\" selected>核定征收 1%（按成交价）</option>\n        <option value=\"0\">满五唯一，免征</option>\n        <option value=\"20\">差额 20%</option>\n      </select>\n    </label>\n    <label class=\"f\">\n      <span>中介费率（%）</span>\n      <input id=\"dd-agent\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"2\">\n    </label>\n    <label class=\"f\">\n      <span>其他杂费（评估/登记/公证等，元）</span>\n      <input id=\"dd-other\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"2000\">\n    </label>\n    <label class=\"f\">\n      <span>卖方原购房价（元，算差额个税用）</span>\n      <input id=\"dd-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50000\" value=\"1200000\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">税费合计</span>\n      <strong id=\"dd-total\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>契税（买方）</span><b id=\"dd-deed-amt\">—</b></li>\n      <li><span>中介费</span><b id=\"dd-agent-amt\">—</b></li>\n      <li><span>增值税及附加（卖方）</span><b id=\"dd-vat-amt\">—</b></li>\n      <li><span>个税（卖方）</span><b id=\"dd-it-amt\">—</b></li>\n      <li><span>其他杂费</span><b id=\"dd-other-amt\">—</b></li>\n      <li><span>买方要准备（房款+买方税费）</span><b id=\"dd-buyer\">—</b></li>\n      <li><span>税费占成交价</span><b id=\"dd-ratio\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"dd-note\"></p>\n  </div>\n    </div>\n  </section>\n","sell":"  <section class=\"panel\" id=\"panel-sell\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>卖旧房</h2>\n    <label class=\"f\">\n      <span>现房成交价（元）</span>\n      <input id=\"sv-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2000000\">\n    </label>\n    <label class=\"f\">\n      <span>剩余贷款本金（元）</span>\n      <input id=\"sv-loan\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\">\n    </label>\n    <label class=\"f\">\n      <span>增值税及附加（%，满 2 年多为 0）</span>\n      <input id=\"sv-vat\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"0\">\n    </label>\n    <label class=\"f\">\n      <span>个人所得税（%，满五唯一为 0）</span>\n      <input id=\"sv-it\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"1\">\n    </label>\n    <label class=\"f\">\n      <span>中介费（%）</span>\n      <input id=\"sv-agent\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2\">\n    </label>\n    <label class=\"f\">\n      <span>其他卖方费用（%，评估/担保等）</span>\n      <input id=\"sv-other\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"0.3\">\n    </label>\n    <h2 class=\"sub\">换新房</h2>\n    <label class=\"f\">\n      <span>新房总价（元）</span>\n      <input id=\"sv-new\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"3000000\">\n    </label>\n    <label class=\"f\">\n      <span>首付比例（%）</span>\n      <input id=\"sv-down\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"30\">\n    </label>\n    <label class=\"f\">\n      <span>新贷款利率（年，%）</span>\n      <input id=\"sv-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"3.1\">\n    </label>\n    <label class=\"f\">\n      <span>新贷款年限（年）</span>\n      <input id=\"sv-years\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"40\" step=\"1\" value=\"30\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">卖房到手净额</span>\n      <strong id=\"sv-net\">—</strong>\n      <span class=\"unit\">元</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>卖方税费合计</span><b id=\"sv-tax\">—</b></li>\n      <li><span>其中增值税及附加</span><b id=\"sv-vat-amt\">—</b></li>\n      <li><span>其中个人所得税</span><b id=\"sv-it-amt\">—</b></li>\n      <li><span>其中中介费</span><b id=\"sv-agent-amt\">—</b></li>\n      <li><span>其中其他费用</span><b id=\"sv-other-amt\">—</b></li>\n      <li><span>税费占成交价</span><b id=\"sv-tax-ratio\">—</b></li>\n      <li><span>新房首付需要</span><b id=\"sv-dpay\">—</b></li>\n      <li><span>资金缺口（负数即结余）</span><b id=\"sv-gap\">—</b></li>\n      <li><span>新贷款金额</span><b id=\"sv-nloan\">—</b></li>\n      <li><span>新贷款月供</span><b id=\"sv-mpay\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"sv-note\"></p>\n  </div>\n    </div>\n  </section>\n","rentyield":"  <section class=\"panel\" id=\"panel-rentyield\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>房子总价（元）</span>\n      <input id=\"ry-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2000000\">\n    </label>\n    <label class=\"f\">\n      <span>月租金（元）</span>\n      <input id=\"ry-rent\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"4000\">\n    </label>\n    <label class=\"f\">\n      <span>首付比例（%）</span>\n      <input id=\"ry-down\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"30\">\n    </label>\n    <label class=\"f\">\n      <span>贷款利率（年，%）</span>\n      <input id=\"ry-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"3.1\">\n    </label>\n    <label class=\"f\">\n      <span>贷款年限（年）</span>\n      <input id=\"ry-years\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"40\" step=\"1\" value=\"30\">\n    </label>\n    <label class=\"f\">\n      <span>持有年限（年）</span>\n      <input id=\"ry-hold\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"40\" step=\"1\" value=\"10\">\n    </label>\n    <label class=\"f\">\n      <span>房价年涨幅（%）</span>\n      <input id=\"ry-growth\" type=\"number\" inputmode=\"decimal\" min=\"-20\" max=\"30\" step=\"0.5\" value=\"2\">\n    </label>\n    <label class=\"f\">\n      <span>租金年涨幅（%）</span>\n      <input id=\"ry-rgrowth\" type=\"number\" inputmode=\"decimal\" min=\"-20\" max=\"30\" step=\"0.5\" value=\"3\">\n    </label>\n    <label class=\"f\">\n      <span>年持有成本（元，物业+维修+保险）</span>\n      <input id=\"ry-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"6000\">\n    </label>\n    <label class=\"f\">\n      <span>空置与欠租（% 年租金）</span>\n      <input id=\"ry-vac\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"60\" step=\"1\" value=\"5\">\n    </label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\">\n      <span class=\"k\">持有到期年化收益（IRR）</span>\n      <strong id=\"ry-irr\">—</strong>\n      <span class=\"unit\">%</span>\n    </div>\n    <ul class=\"kv\">\n      <li><span>租售比（年租金 ÷ 房价）</span><b id=\"ry-ratio\">—</b></li>\n      <li><span>扣空置后的有效租金回报</span><b id=\"ry-eff\">—</b></li>\n      <li><span>再扣持有成本的净回报</span><b id=\"ry-net\">—</b></li>\n      <li><span>月供</span><b id=\"ry-pay\">—</b></li>\n      <li><span>每月现金流（租金 − 月供 − 成本）</span><b id=\"ry-cash\">—</b></li>\n      <li><span>持有期末房价</span><b id=\"ry-price-end\">—</b></li>\n      <li><span>期末剩余贷款</span><b id=\"ry-loan-end\">—</b></li>\n      <li><span>累计净租金收入</span><b id=\"ry-rent-sum\">—</b></li>\n      <li><span>累计自掏现金（首付+补贴月供）</span><b id=\"ry-invest\">—</b></li>\n      <li><span>期末卖出到手（扣贷款）</span><b id=\"ry-exit\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"ry-note\"></p>\n        <p class=\"jump\" id=\"ry-links\"></p>\n  </div>\n    </div>\n  </section>\n","budget":"  <section class=\"panel\" id=\"panel-budget\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>家庭月收入（税后，元）</span>\n      <input id=\"bg-income\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"30000\"></label>\n    <label class=\"f\"><span>手里可用现金（含税费，元）</span>\n      <input id=\"bg-cash\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"700000\"></label>\n    <label class=\"f\"><span>首付比例（%）</span>\n      <input id=\"bg-down\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"30\"></label>\n    <label class=\"f\"><span>房贷利率（%）</span>\n      <input id=\"bg-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.05\" value=\"3.1\"></label>\n    <label class=\"f\"><span>贷款年限（年）</span>\n      <input id=\"bg-years\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1\" value=\"30\"></label>\n    <label class=\"f\"><span>月供最高占收入（%）</span>\n      <input id=\"bg-ratio\" type=\"number\" inputmode=\"decimal\" min=\"5\" max=\"80\" step=\"5\" value=\"40\"></label>\n    <label class=\"f\"><span>税费+装修预留（占总价，%）</span>\n      <input id=\"bg-fee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"5\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">能承受的房子总价</span><strong id=\"bg-total\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>月供上限（收入的设定比例）</span><b id=\"bg-paycap\">—</b></li>\n      <li><span>按这条月供能贷到</span><b id=\"bg-loancap\">—</b></li>\n      <li><span>受月供约束的最高总价</span><b id=\"bg-byPay\">—</b></li>\n      <li><span>受现金约束的最高总价</span><b id=\"bg-byCash\">—</b></li>\n      <li><span>卡在哪一边</span><b id=\"bg-bottle\">—</b></li>\n      <li><span>首付</span><b id=\"bg-downamt\">—</b></li>\n      <li><span>税费+装修要预留</span><b id=\"bg-feeamt\">—</b></li>\n      <li><span>贷款额 / 月供</span><b id=\"bg-loan\">—</b></li>\n      <li><span>月供占收入</span><b id=\"bg-share\">—</b></li>\n      <li><span>30 年总共付的利息</span><b id=\"bg-int\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"bg-note\"></p>\n  </div>\n    </div>\n  </section>\n","rentup":"  <section class=\"panel\" id=\"panel-rentup\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>现在月租（元）</span>\n      <input id=\"ru-cur\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"4000\"></label>\n    <label class=\"f\"><span>房东要涨到（元）</span>\n      <input id=\"ru-new\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"4400\"></label>\n    <label class=\"f\"><span>搬家一次的总成本（中介/押金损失/搬家，元）</span>\n      <input id=\"ru-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"6000\"></label>\n    <label class=\"f\"><span>同地段新租价（元）</span>\n      <input id=\"ru-alt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"4200\"></label>\n    <label class=\"f\"><span>还打算住几年</span>\n      <input id=\"ru-years\" type=\"number\" inputmode=\"decimal\" min=\"0.5\" max=\"20\" step=\"0.5\" value=\"3\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">搬走能省（或亏）</span><strong id=\"ru-diff\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>接受涨租：每年多付</span><b id=\"ru-stayyear\">—</b></li>\n      <li><span>接受涨租：住满期的总多付</span><b id=\"ru-stay\">—</b></li>\n      <li><span>搬走：住满期的总多付（含搬家费）</span><b id=\"ru-move\">—</b></li>\n      <li><span>搬家的盈亏平衡要住</span><b id=\"ru-breakeven\">—</b></li>\n      <li><span>涨租幅度的临界点</span><b id=\"ru-line\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>还住</th><th>接受涨租多付</th><th>搬走多付</th><th>哪边划算</th></tr></thead>\n        <tbody id=\"ru-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"ru-note\"></p>\n  </div>\n    </div>\n  </section>\n"};
export default { rentbuy: calcRentBuy, deed: calcDeed, sell: calcSell, rentyield: calcRentYield, budget: calcBudget, rentup: calcRentUp, housecash: calcHouseCash };
