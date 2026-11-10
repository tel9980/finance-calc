/* 自动生成，勿手改：acct-tax 分类模块（点开才下载） */
const { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, FAV_KEY, FIELDS, FIRST_ACTIVATE, KEY, MONTH_CATS, MONTH_TABLE, PENDING_PARAMS, PRE_KEY, QUOTA_WARNED, RECENT_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, TOAST_EL, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, dlJson, drawMonthCats, drawMonthStack, drawReportCharts, drawRpMini, drawnMonthlyChart, drawnYearChart, ensureChunk, favList, fillMonthGrid, fillUnits, flash, flushParams, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, leftAfter, linkTo, loadCmpA, loadSnaps, loanRows, makeSnap, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numOf, panelEls, panelParams, parseAmounts, parseDate, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, presets, pushRecent, quickOf, rateOf, readJsonFile, readMonthGrid, recentList, refreshCounts, renderLoanTable, renderPresets, renderSnapCompare, renderSnapList, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tap, taxBy, toast, updShown, yuan, zOf } = window.FC;

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

export const PANELS = {"vat":"  <section class=\"panel\" id=\"panel-vat\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>金额（元）</span>\n      <input id=\"vt-amount\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"113000\"></label>\n    <label class=\"f\"><span>这个金额是</span>\n      <select id=\"vt-mode\">\n        <option value=\"gross\" selected>含税价（发票价税合计）</option>\n        <option value=\"net\">不含税价（销售额）</option>\n      </select></label>\n    <label class=\"f\"><span>税率 / 征收率</span>\n      <select id=\"vt-rate\">\n        <option value=\"0.13\" selected>13% —— 货物、加工修理修配、有形动产租赁</option>\n        <option value=\"0.09\">9% —— 交通运输、建筑、不动产、农产品、邮电</option>\n        <option value=\"0.06\">6% —— 现代服务、金融、生活服务、无形资产</option>\n        <option value=\"0.05\">5% —— 简易计税（不动产销售/出租等）</option>\n        <option value=\"0.03\">3% —— 小规模纳税人征收率</option>\n        <option value=\"0.01\">1% —— 小规模减按征收</option>\n      </select></label>\n    <label class=\"f\"><span>附加税费合计（% 的增值税，城建 7 + 教育 3 + 地方教育 2）</span>\n      <input id=\"vt-surtax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"30\" step=\"1\" value=\"12\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">税额</span><strong id=\"vt-vat\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>不含税金额（收入 / 成本）</span><b id=\"vt-net\">—</b></li>\n      <li><span>价税合计（含税）</span><b id=\"vt-gross\">—</b></li>\n      <li><span>税额占含税价</span><b id=\"vt-share\">—</b></li>\n      <li><span>城建及附加（按上面的比例）</span><b id=\"vt-surtax-amt\">—</b></li>\n      <li><span>这笔业务实际税负（税 + 附加）</span><b id=\"vt-total-tax\">—</b></li>\n      <li><span>一般纳税人可抵扣进项（拿到专票时）</span><b id=\"vt-deduct\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>税率</th><th>不含税</th><th>税额</th><th>含税</th></tr></thead>\n        <tbody id=\"vt-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"vt-note\"></p>\n  </div>\n    </div>\n  </section>\n","vatdue":"  <section class=\"panel\" id=\"panel-vatdue\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（本期）</h2>\n    <label class=\"f\"><span>销项税额（元，开出去的发票）</span>\n      <input id=\"vd-out\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"130000\"></label>\n    <label class=\"f\"><span>进项税额（元，收到的专票认证抵扣）</span>\n      <input id=\"vd-in\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"78000\"></label>\n    <label class=\"f\"><span>期初留抵税额（元，上期没抵完结转的）</span>\n      <input id=\"vd-carry\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"5000\"></label>\n    <label class=\"f\"><span>本期不含税销售额（元，算税负率用）</span>\n      <input id=\"vd-sales\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n    <label class=\"f\"><span>城市维护建设税 / 教育费附加 / 地方教育附加（%）</span>\n      <div class=\"row\">\n        <input id=\"vd-urban\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"20\" step=\"1\" value=\"7\">\n        <input id=\"vd-edu\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"10\" step=\"1\" value=\"3\">\n        <input id=\"vd-local\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"10\" step=\"1\" value=\"2\">\n      </div></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">本期应交增值税</span><strong id=\"vd-due\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>销项 − 进项 − 期初留抵</span><b id=\"vd-raw\">—</b></li>\n      <li><span>期末留抵（结转下期）</span><b id=\"vd-left\">—</b></li>\n      <li><span>城建税</span><b id=\"vd-urban-amt\">—</b></li>\n      <li><span>教育费附加</span><b id=\"vd-edu-amt\">—</b></li>\n      <li><span>地方教育附加</span><b id=\"vd-local-amt\">—</b></li>\n      <li><span>附加税费合计</span><b id=\"vd-surtax\">—</b></li>\n      <li><span>本期要交出去的钱（税 + 附加）</span><b id=\"vd-total\">—</b></li>\n      <li><span>增值税税负率（应交 ÷ 销售额）</span><b id=\"vd-burden\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>毛利率</th><th>应交增值税</th><th>税负率</th></tr></thead>\n        <tbody id=\"vd-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"vd-note\"></p>\n  </div>\n    </div>\n  </section>\n","taxburden":"  <section class=\"panel\" id=\"panel-taxburden\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（本月增值税数据）</h2>\n    <label class=\"f\"><span>不含税销售额（元）</span>\n      <input id=\"tbr-sales\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n    <label class=\"f\"><span>销项税额（元）</span>\n      <input id=\"tbr-out\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"130000\"></label>\n    <label class=\"f\"><span>本月认证进项税额（元）</span>\n      <input id=\"tbr-in\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"90000\"></label>\n    <label class=\"f\"><span>期初留抵税额（元）</span>\n      <input id=\"tbr-begin\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"5000\"></label>\n    <label class=\"f\"><span>上期税负率（%）</span>\n      <input id=\"tbr-prev\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"3.2\"></label>\n    <label class=\"f\"><span>行业参考税负率（%）</span>\n      <input id=\"tbr-ind\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"3\"></label>\n    <label class=\"f\"><span>附加税费合计率（%）</span>\n      <input id=\"tbr-surch\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"12\"></label>\n    <em>口径：税负率 = 应交增值税 ÷ 不含税销售额。行业参考值只为对照，各地各行业差异大，以主管税务机关口径为准</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">本月增值税税负率</span><strong id=\"tbr-big\">—</strong><span class=\"unit\">%</span></div>\n    <ul class=\"kv\">\n      <li><span>应交增值税</span><b id=\"tbr-pay\">—</b></li>\n      <li><span>城建税及教育费附加</span><b id=\"tbr-surcharge\">—</b></li>\n      <li><span>环比上期</span><b id=\"tbr-mom\">—</b></li>\n      <li><span>对比行业参考</span><b id=\"tbr-gap\">—</b></li>\n      <li><span>采购额（不含税）</span><b id=\"tbr-buy\">—</b></li>\n      <li><span>倒推毛利率</span><b id=\"tbr-gr\">—</b></li>\n      <li><span>预警区间（行业 ±30%）</span><b id=\"tbr-band\">—</b></li>\n      <li><span>判断</span><b id=\"tbr-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>金额</th><th>说明</th></tr></thead>\n        <tbody id=\"tbr-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"tbr-note\"></p>\n  </div>\n    </div>\n  </section>\n","refundflow":"  <section class=\"panel\" id=\"panel-refundflow\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（出口退税资金占用）</h2>\n    <label class=\"f\"><span>月均出口额（元，人民币）</span>\n      <input id=\"rf-exp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"5000000\"></label>\n    <label class=\"f\"><span>退税率 / 征税率（%）</span>\n      <span class=\"row\"><input id=\"rf-reb\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"10\">\n        <input id=\"rf-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"13\"></span></label>\n    <label class=\"f\"><span>出口到申报滞后（天）</span>\n      <input id=\"rf-lag\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"30\"></label>\n    <label class=\"f\"><span>申报到到账（天）</span>\n      <input id=\"rf-audit\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"45\"></label>\n    <label class=\"f\"><span>你的资金成本（年化 %）</span>\n      <input id=\"rf-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"6\"></label>\n    <em>口径：退税款在「申报—审核—到账」这段时间是垫着的钱，按在途余额乘资金成本算占用，不是按年退税总额算</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">在途退税额（垫着的钱）</span><strong id=\"rf-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>每月应退税额</span><b id=\"rf-month\">—</b></li>\n      <li><span>全年退税额</span><b id=\"rf-year\">—</b></li>\n      <li><span>总占用天数</span><b id=\"rf-days\">—</b></li>\n      <li><span>年资金占用成本</span><b id=\"rf-costv\">—</b></li>\n      <li><span>征退税率差（不可退，进成本）</span><b id=\"rf-gap\">—</b></li>\n      <li><span>每压缩 10 天可省</span><b id=\"rf-ten\">—</b></li>\n      <li><span>若压到 15+30 天</span><b id=\"rf-opt\">—</b></li>\n      <li><span>建议</span><b id=\"rf-advice\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>环节</th><th>天数</th><th>在途退税额</th><th>占用成本（年）</th></tr></thead>\n        <tbody id=\"rf-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"rf-note\"></p>\n  </div>\n    </div>\n  </section>\n","taxadj":"  <section class=\"panel\" id=\"panel-taxadj\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（企业所得税汇算调整）</h2>\n    <label class=\"f\"><span>营业收入（万元）</span>\n      <input id=\"txj-rev\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"5000\"></label>\n    <label class=\"f\"><span>会计利润总额（万元）</span>\n      <input id=\"txj-profit\" type=\"number\" inputmode=\"decimal\" step=\"50\" value=\"500\"></label>\n    <label class=\"f\"><span>业务招待费发生额（万元）</span>\n      <input id=\"txj-ent\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"20\"></label>\n    <label class=\"f\"><span>广告宣传费发生额（万元）</span>\n      <input id=\"txj-ad\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"300\"></label>\n    <label class=\"f\"><span>罚款滞纳金等（万元，不得扣除）</span>\n      <input id=\"txj-fine\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"5\"></label>\n    <label class=\"f\"><span>公益性捐赠（万元）</span>\n      <input id=\"txj-don\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"40\"></label>\n    <label class=\"f\"><span>研发费用（万元，加计比例 %）</span>\n      <span class=\"row\"><input id=\"txj-rd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"100\">\n        <input id=\"txj-rdr\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"25\" value=\"100\"></span></label>\n    <label class=\"f\"><span>已预缴所得税（万元）</span>\n      <input id=\"txj-pre\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"90\"></label>\n    <em>口径：招待费按「发生额 60%」与「收入 5‰」孰低；广告费限 15%（超支可结转以后年度）；捐赠限利润总额 12%；研发加计比例这里做成参数，按你适用的政策填</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">应纳税所得额</span><strong id=\"txj-big\">—</strong><span class=\"unit\">万元</span></div>\n    <ul class=\"kv\">\n      <li><span>招待费限额 / 调增</span><b id=\"txj-entv\">—</b></li>\n      <li><span>广告费限额 / 调增</span><b id=\"txj-adv\">—</b></li>\n      <li><span>捐赠限额 / 调增</span><b id=\"txj-donv\">—</b></li>\n      <li><span>罚款类调增</span><b id=\"txj-finev\">—</b></li>\n      <li><span>研发加计调减</span><b id=\"txj-rdv\">—</b></li>\n      <li><span>应交所得税 / 已预缴</span><b id=\"txj-tax\">—</b></li>\n      <li><span>应补（退）税额</span><b id=\"txj-due\">—</b></li>\n      <li><span>实际税负率</span><b id=\"txj-rate\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>调整项目</th><th>金额</th><th>方向</th></tr></thead>\n        <tbody id=\"txj-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"txj-note\"></p>\n  </div>\n    </div>\n  </section>\n","debtcap":"  <section class=\"panel\" id=\"panel-debtcap\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（关联方利息扣除限额）</h2>\n    <label class=\"f\"><span>关联方借款余额（万元）</span>\n      <input id=\"dtc-loan\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"3000\"></label>\n    <label class=\"f\"><span>权益性投资（万元，所有者权益）</span>\n      <input id=\"dtc-eq\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"1000\"></label>\n    <label class=\"f\"><span>借款年利率（%）</span>\n      <input id=\"dtc-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"6\"></label>\n    <label class=\"f\"><span>同期金融企业同类贷款利率（%）</span>\n      <input id=\"dtc-bank\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"5\"></label>\n    <label class=\"f\"><span>债资比上限（倍）</span>\n      <input id=\"dtc-mult\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"0.5\" value=\"2\"></label>\n    <em>口径：两道关——利率不超金融企业同期同类水平，且借款不超权益性投资的规定倍数（非金融 2:1，金融 5:1）；两道都过才全额扣</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">不得税前扣除的利息</span><strong id=\"dtc-big\">—</strong><span class=\"unit\">万元</span></div>\n    <ul class=\"kv\">\n      <li><span>实际债资比</span><b id=\"dtc-ratio\">—</b></li>\n      <li><span>可计算利息的借款上限</span><b id=\"dtc-lim\">—</b></li>\n      <li><span>实际支付利息</span><b id=\"dtc-paid\">—</b></li>\n      <li><span>按利率关可扣</span><b id=\"dtc-ratecap\">—</b></li>\n      <li><span>按债资比关可扣</span><b id=\"dtc-multcap\">—</b></li>\n      <li><span>最终可扣除 / 不得扣除</span><b id=\"dtc-final\">—</b></li>\n      <li><span>多缴企业所得税</span><b id=\"dtc-tax\">—</b></li>\n      <li><span>建议</span><b id=\"dtc-advice\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"dtc-note\"></p>\n  </div>\n    </div>\n  </section>\n","accdep":"  <section class=\"panel\" id=\"panel-accdep\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（设备一次性扣除 / 加速折旧）</h2>\n    <label class=\"f\"><span>设备原值（万元）</span>\n      <input id=\"adp-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"480\"></label>\n    <label class=\"f\"><span>会计折旧年限（年）</span>\n      <input id=\"adp-life\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1\" value=\"10\"></label>\n    <label class=\"f\"><span>预计残值率（%）</span>\n      <input id=\"adp-salv\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"5\"></label>\n    <label class=\"f\"><span>企业所得税率（%）</span>\n      <input id=\"adp-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\"></label>\n    <label class=\"f\"><span>资金成本（折现率 %）</span>\n      <input id=\"adp-disc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"6\"></label>\n    <em>口径：会计按年限平均摊，税法允许一次性扣除（设备器具单位价值在一定标准以下）；差异只是「什么时候交」，不是「少交」</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">当年少缴所得税（递延金额）</span><strong id=\"adp-big\">—</strong><span class=\"unit\">万元</span></div>\n    <ul class=\"kv\">\n      <li><span>会计每年折旧</span><b id=\"adp-acc\">—</b></li>\n      <li><span>税法当年扣除</span><b id=\"adp-taxdep\">—</b></li>\n      <li><span>当年税会差异</span><b id=\"adp-diff\">—</b></li>\n      <li><span>后续每年纳税调增 / 多缴</span><b id=\"adp-later\">—</b></li>\n      <li><span>后续调增的现值合计</span><b id=\"adp-pv\">—</b></li>\n      <li><span>递延带来的净现值收益</span><b id=\"adp-net\">—</b></li>\n      <li><span>相当于白拿的年化收益率</span><b id=\"adp-yield\">—</b></li>\n      <li><span>建议</span><b id=\"adp-advice\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>年度</th><th>会计折旧</th><th>税前扣除</th><th>纳税调整</th></tr></thead>\n        <tbody id=\"adp-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"adp-note\"></p>\n  </div>\n    </div>\n  </section>\n","esop":"  <section class=\"panel\" id=\"panel-esop\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（股权激励费用摊销）</h2>\n    <label class=\"f\"><span>授予数量（万股）</span>\n      <input id=\"es-shares\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"100\"></label>\n    <label class=\"f\"><span>授予日公允价值（元/股）</span>\n      <input id=\"es-fair\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"10\"></label>\n    <label class=\"f\"><span>行权价（元/股）</span>\n      <input id=\"es-strike\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"4\"></label>\n    <label class=\"f\"><span>等待期 / 归属年数</span>\n      <input id=\"es-years\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1\" value=\"4\"></label>\n    <label class=\"f\"><span>预计离职率（%，每年）</span>\n      <input id=\"es-leave\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"5\"></label>\n    <label class=\"f\"><span>所得税率（%）</span>\n      <input id=\"es-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\"></label>\n    <em>口径：费用 =（公允价值 − 行权价）× 数量 ×（1 − 预计离职率），在等待期内按期分摊；税务上要等到归属/解禁才按工资薪金扣除</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">股份支付费用总额</span><strong id=\"es-big\">—</strong><span class=\"unit\">万元</span></div>\n    <ul class=\"kv\">\n      <li><span>每股激励价值</span><b id=\"es-per\">—</b></li>\n      <li><span>考虑离职后的可行权数量</span><b id=\"es-qty\">—</b></li>\n      <li><span>匀速归属：每年费用</span><b id=\"es-flat\">—</b></li>\n      <li><span>加速归属（40/30/20/10）首年费用</span><b id=\"es-acc\">—</b></li>\n      <li><span>会计与税务差异（前几年）</span><b id=\"es-diff\">—</b></li>\n      <li><span>递延所得税资产（累计）</span><b id=\"es-dta\">—</b></li>\n      <li><span>归属年度可税前扣除</span><b id=\"es-deduct\">—</b></li>\n      <li><span>提示</span><b id=\"es-advice\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>年度</th><th>匀速归属</th><th>加速归属</th><th>税务扣除</th></tr></thead>\n        <tbody id=\"es-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"es-note\"></p>\n  </div>\n    </div>\n  </section>\n","rdexp":"  <section class=\"panel\" id=\"panel-rdexp\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（研发费用加计扣除）</h2>\n    <label class=\"f\"><span>人员人工费用（万元）</span>\n      <input id=\"rd-labor\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"300\"></label>\n    <label class=\"f\"><span>直接投入费用（万元）</span>\n      <input id=\"rd-mat\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"150\"></label>\n    <label class=\"f\"><span>折旧 / 无形资产摊销（万元）</span>\n      <input id=\"rd-dep\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"30\"></label>\n    <label class=\"f\"><span>其他相关费用（万元）</span>\n      <input id=\"rd-other\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"20\"></label>\n    <label class=\"f\"><span>加计扣除比例（%）</span>\n      <input id=\"rd-pct\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"200\" step=\"25\" value=\"100\"></label>\n    <label class=\"f\"><span>企业所得税率（%）</span>\n      <input id=\"rd-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\"></label>\n    <em>口径：「其他相关费用」有 10% 限额（＝前三项 ÷ 9% 的封顶算法），超了不能加计；失败的研发活动、常规性升级不算</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">可加计扣除金额（再加一次）</span><strong id=\"rd-big\">—</strong><span class=\"unit\">万元</span></div>\n    <ul class=\"kv\">\n      <li><span>研发费用归集合计</span><b id=\"rd-total\">—</b></li>\n      <li><span>其他相关费用限额</span><b id=\"rd-cap\">—</b></li>\n      <li><span>可计入的其他费用</span><b id=\"rd-effect\">—</b></li>\n      <li><span>加计扣除基数</span><b id=\"rd-base\">—</b></li>\n      <li><span>加计比例 / 少缴所得税</span><b id=\"rd-save\">—</b></li>\n      <li><span>相当于研发投入打折后</span><b id=\"rd-eff\">—</b></li>\n      <li><span>不能加计的部分</span><b id=\"rd-lost\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>金额（万元）</th><th>能否加计</th></tr></thead>\n        <tbody id=\"rd-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"rd-note\"></p>\n  </div>\n    </div>\n  </section>\n","exportrebate":"  <section class=\"panel\" id=\"panel-exportrebate\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（生产企业免抵退，月申报数）</h2>\n    <label class=\"f\"><span>出口销售额 FOB（人民币，元）</span>\n      <input id=\"er-exp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"5000000\"></label>\n    <label class=\"f\"><span>征税率（%）</span>\n      <input id=\"er-vat\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"20\" step=\"1\" value=\"13\"></label>\n    <label class=\"f\"><span>出口退税率（%）</span>\n      <input id=\"er-reb\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"20\" step=\"1\" value=\"10\"></label>\n    <label class=\"f\"><span>内销销售额（不含税，元）</span>\n      <input id=\"er-dom\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\"></label>\n    <label class=\"f\"><span>本期进项税额（元，已认证）</span>\n      <input id=\"er-in\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"400000\"></label>\n    <label class=\"f\"><span>上期留抵税额（元）</span>\n      <input id=\"er-carry\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"0\"></label>\n    <em>出口额按 FOB 价折算人民币；退税率低于征税率的那部分差额不能退，要做进项税额转出</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">本期应退税额</span><strong id=\"er-refund\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>免抵退税额（出口额 × 退税率）</span><b id=\"er-ec\">—</b></li>\n      <li><span>不得免征和抵扣税额（进项转出）</span><b id=\"er-non\">—</b></li>\n      <li><span>转出后可抵扣进项</span><b id=\"er-avail\">—</b></li>\n      <li><span>内销销项税额</span><b id=\"er-dout\">—</b></li>\n      <li><span>应纳税额 / 期末留抵</span><b id=\"er-raw\">—</b></li>\n      <li><span>免抵额（抵掉内销税的部分）</span><b id=\"er-exempt\">—</b></li>\n      <li><span>退税后仍结转下期的留抵</span><b id=\"er-carryleft\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>步骤</th><th>金额</th><th>说明</th></tr></thead>\n        <tbody id=\"er-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"er-note\"></p>\n  </div>\n    </div>\n  </section>\n","govgrant":"  <section class=\"panel\" id=\"panel-govgrant\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>补助金额</span>\n      <input id=\"ggr-amt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"2400000\">\n    </label>\n    <label class=\"f\">\n      <span>类型</span>\n      <select id=\"ggr-type\">\n        <option value=\"asset\">与资产相关（买设备、建房）</option>\n        <option value=\"income\">与收益相关（补已发生或未来的费用）</option>\n      </select>\n    </label>\n    <span class=\"row\">\n      <input id=\"ggr-years\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"10\" aria-label=\"摊销年限\">\n      <input id=\"ggr-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"25\" aria-label=\"企业所得税率\">\n    </span>\n    <p class=\"hint\">左：摊销年限（年），右：企业所得税率（%）</p>\n    <label class=\"f\">\n      <span>资金成本 / 折现率（%）</span>\n      <input id=\"ggr-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"5\">\n      <em>用来比较「作不征税收入」和「作应税收入」哪个划算</em>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">每月计入损益</span><strong id=\"ggr-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>年计入损益</span><b id=\"ggr-year\">—</b></li>\n      <li><span>作应税收入：当期纳税</span><b id=\"ggr-taxnow\">—</b></li>\n      <li><span>10 年折旧/费用抵税现值</span><b id=\"ggr-pvded\">—</b></li>\n      <li><span>作应税：净税收成本现值</span><b id=\"ggr-pv1\">—</b></li>\n      <li><span>作不征税：净税收成本现值</span><b id=\"ggr-pv2\">—</b></li>\n      <li><span>结论</span><b id=\"ggr-pick\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"ggr-note\"></p>\n  </div>\n    </div>\n  </section>\n","rdcap":"  <section class=\"panel\" id=\"panel-rdcap\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>当年研发支出合计</span>\n      <input id=\"rdc-total\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"6000000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"rdc-cap\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"40\" aria-label=\"资本化比例\">\n      <input id=\"rdc-years\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"5\" aria-label=\"摊销年限\">\n    </span>\n    <p class=\"hint\">左：资本化比例（%），右：摊销年限（年）</p>\n    <span class=\"row\">\n      <input id=\"rdc-months\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"12\" step=\"1\" value=\"6\" aria-label=\"当年摊销月数\">\n      <input id=\"rdc-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\" aria-label=\"所得税率\">\n    </span>\n    <p class=\"hint\">左：当年摊销月数，右：所得税率（%）</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">当年研发影响损益</span><strong id=\"rdc-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>费用化 / 资本化</span><b id=\"rdc-split\">—</b></li>\n      <li><span>当年摊销</span><b id=\"rdc-amort\">—</b></li>\n      <li><span>比全部费用化多出利润</span><b id=\"rdc-gain\">—</b></li>\n      <li><span>净利影响（税后）</span><b id=\"rdc-np\">—</b></li>\n      <li><span>加计扣除基数</span><b id=\"rdc-add\">—</b></li>\n      <li><span>少缴企业所得税</span><b id=\"rdc-taxout\">—</b></li>\n      <li><span>未来仍需摊销</span><b id=\"rdc-left\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"rdc-note\"></p>\n  </div>\n    </div>\n  </section>\n","salesallow":"  <section class=\"panel\" id=\"panel-salesallow\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（不含税口径）</h2>\n    <label class=\"f\">\n      <span>销售额（开票不含税）</span>\n      <input id=\"alw-sales\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"alw-allow\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"0.5\" value=\"3\" aria-label=\"折让率\">\n      <input id=\"alw-ret\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"0.5\" value=\"2\" aria-label=\"退货率\">\n    </span>\n    <p class=\"hint\">左：销售折让率（%），右：预计退货率（%）</p>\n    <span class=\"row\">\n      <input id=\"alw-giftcost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"50000\" aria-label=\"赠品成本\">\n      <input id=\"alw-giftval\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"80000\" aria-label=\"赠品公允价\">\n    </span>\n    <p class=\"hint\">左：赠品成本，右：赠品公允价值（视同销售的计税依据）</p>\n    <span class=\"row\">\n      <input id=\"alw-vc\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"70\" aria-label=\"成本率\">\n      <input id=\"alw-vat\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"13\" aria-label=\"增值税率\">\n    </span>\n    <p class=\"hint\">左：成本率（%），右：增值税率（%）；附加按 12%、所得税 25% 固定</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">赠品全口径代价</span><strong id=\"alw-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>折让 / 退货冲减收入</span><b id=\"alw-cut\">—</b></li>\n      <li><span>收入净额</span><b id=\"alw-net\">—</b></li>\n      <li><span>销项税合计（含视同销售）</span><b id=\"alw-vatout\">—</b></li>\n      <li><span>附加税费</span><b id=\"alw-surtax\">—</b></li>\n      <li><span>毛利（赠品费用前 / 后）</span><b id=\"alw-gp\">—</b></li>\n      <li><span>赠品销项税 / 附加</span><b id=\"alw-gv\">—</b></li>\n      <li><span>赠品所得税影响</span><b id=\"alw-gt\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"alw-note\"></p>\n  </div>\n    </div>\n  </section>\n","vatchoose":"  <section class=\"panel\" id=\"panel-vatchoose\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（不含税口径）</h2>\n    <label class=\"f\">\n      <span>年销售额</span>\n      <input id=\"vtc-sales\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"5000000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"vtc-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"70\" aria-label=\"成本率\">\n      <input id=\"vtc-ded\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"100\" aria-label=\"进项可抵扣比例\">\n    </span>\n    <p class=\"hint\">左：成本率（%），右：采购中能拿到专票的比例（%）——人工为主的行业要调低</p>\n    <span class=\"row\">\n      <input id=\"vtc-rate13\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"13\" aria-label=\"一般纳税人税率\">\n      <input id=\"vtc-rate3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"3\" aria-label=\"小规模征收率\">\n    </span>\n    <p class=\"hint\">左：一般纳税人税率（%），右：小规模征收率（%）</p>\n    <label class=\"f\">\n      <span>所得税率（%）</span>\n      <input id=\"vtc-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\">\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">一般纳税人多赚（税后）</span><strong id=\"vtc-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>一般：销项 / 进项 / 应交</span><b id=\"vtc-g1\">—</b></li>\n      <li><span>一般：附加 / 净利</span><b id=\"vtc-g2\">—</b></li>\n      <li><span>小规模：应交增值税</span><b id=\"vtc-s1\">—</b></li>\n      <li><span>小规模：含税成本 / 附加</span><b id=\"vtc-s2\">—</b></li>\n      <li><span>小规模：净利</span><b id=\"vtc-s3\">—</b></li>\n      <li><span>无差异成本率 / 毛利率</span><b id=\"vtc-be\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"vtc-note\"></p>\n  </div>\n    </div>\n  </section>\n","rebatedta":"  <section class=\"panel\" id=\"panel-rebatedta\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（权责发生制下已计提）</h2>\n    <label class=\"f\">\n      <span>已计提未支付的销售返利</span>\n      <input id=\"rdt-rebate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\">\n    </label>\n    <label class=\"f\">\n      <span>预计退货负债（应付退货款）</span>\n      <input id=\"rdt-return\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\">\n    </label>\n    <label class=\"f\">\n      <span>预计退货存货成本可收回</span>\n      <input id=\"rdt-stock\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"210000\">\n      <em>退货入库的存货，按账面成本冲回主营成本，这部分不产生税会差异</em>\n    </label>\n    <label class=\"f\">\n      <span>所得税率（%）</span>\n      <input id=\"rdt-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\">\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">确认递延所得税资产</span><strong id=\"rdt-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>可抵扣暂时性差异</span><b id=\"rdt-td\">—</b></li>\n      <li><span>当期纳税调增</span><b id=\"rdt-add\">—</b></li>\n      <li><span>当期多缴税 / 未来少缴</span><b id=\"rdt-cash\">—</b></li>\n      <li><span>其中税会一致部分</span><b id=\"rdt-same\">—</b></li>\n      <li><span>利润表影响（税后）</span><b id=\"rdt-pl\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"rdt-note\"></p>\n  </div>\n    </div>\n  </section>\n","welfare":"  <section class=\"panel\" id=\"panel-welfare\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>工资薪金总额</span>\n      <input id=\"wlf-wage\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"10000000\">\n      <em>限额的计算基数是「实际发放的合理工资薪金」，不是计提数</em>\n    </label>\n    <span class=\"row\">\n      <input id=\"wlf-wel\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1600000\" aria-label=\"职工福利费实际发生\">\n      <input id=\"wlf-edu\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"900000\" aria-label=\"职工教育经费实际发生\">\n    </span>\n    <p class=\"hint\">左：职工福利费（限额 14%），右：职工教育经费（限额 8%，超额可结转以后年度）</p>\n    <span class=\"row\">\n      <input id=\"wlf-union\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"180000\" aria-label=\"工会经费实际发生\">\n      <input id=\"wlf-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\" aria-label=\"所得税率\">\n    </span>\n    <p class=\"hint\">左：工会经费（限额 2%，须有专用收据），右：所得税率（%）</p>\n    <span class=\"row\">\n      <input id=\"wlf-emp\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"10\" value=\"200\" aria-label=\"在职职工人数\">\n      <input id=\"wlf-dis\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"2\" aria-label=\"已安置残疾人数\">\n    </span>\n    <p class=\"hint\">左：在职职工人数，右：已安置残疾人数（比例 1.5%）</p>\n    <span class=\"row\">\n      <input id=\"wlf-avg\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"90000\" aria-label=\"年平均工资\">\n      <input id=\"wlf-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"90\" aria-label=\"残保金征收比例\">\n    </span>\n    <p class=\"hint\">左：职工年平均工资，右：分档征收比例（%，按当地分档政策填）</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">超限调增合计</span><strong id=\"wlf-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>福利费：限额 / 实际</span><b id=\"wlf-welout\">—</b></li>\n      <li><span>教育经费：限额 / 实际</span><b id=\"wlf-eduout\">—</b></li>\n      <li><span>工会经费：限额 / 实际</span><b id=\"wlf-uniout\">—</b></li>\n      <li><span>合计多缴企业所得税</span><b id=\"wlf-taxout\">—</b></li>\n      <li><span>残保金差额人数</span><b id=\"wlf-gap\">—</b></li>\n      <li><span>应缴残保金</span><b id=\"wlf-fund\">—</b></li>\n      <li><span>再安置 1 人可省</span><b id=\"wlf-save\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"wlf-note\"></p>\n  </div>\n    </div>\n  </section>\n","inputout":"  <section class=\"panel\" id=\"panel-inputout\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>当期无法划分的进项税额</span>\n      <input id=\"itr-input\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"130000\">\n      <em>如办公费、水电、房租、通信用车等同时服务两类业务的进项</em>\n    </label>\n    <span class=\"row\">\n      <input id=\"itr-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"8000000\" aria-label=\"一般计税销售额\">\n      <input id=\"itr-simple\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"2000000\" aria-label=\"简易计税销售额\">\n    </span>\n    <p class=\"hint\">左：一般计税销售额，右：简易计税销售额</p>\n    <label class=\"f\">\n      <span>免税销售额</span>\n      <input id=\"itr-free\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"0\">\n    </label>\n    <span class=\"row\">\n      <input id=\"itr-welf\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"50000\" aria-label=\"集体福利个人消费进项\">\n      <input id=\"itr-loss\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"30000\" aria-label=\"非正常损失进项\">\n    </span>\n    <p class=\"hint\">左：用于集体福利/个人消费的进项（全额转出），右：非正常损失进项（全额转出）</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">本期应转出进项</span><strong id=\"itr-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>不得抵扣比例</span><b id=\"itr-ratio\">—</b></li>\n      <li><span>按比例转出</span><b id=\"itr-part\">—</b></li>\n      <li><span>福利 / 损失全额转出</span><b id=\"itr-full\">—</b></li>\n      <li><span>仍可抵扣进项</span><b id=\"itr-left\">—</b></li>\n      <li><span>转出占进项比</span><b id=\"itr-pct\">—</b></li>\n      <li><span>漏转的年度风险</span><b id=\"itr-risk\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"itr-note\"></p>\n  </div>\n    </div>\n  </section>\n","stampduty":"  <section class=\"panel\" id=\"panel-stampduty\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（不含税金额，合同分别列明价款与税额的按不含税）</h2>\n    <span class=\"row\">\n      <input id=\"sdt-sale\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"10000000\" aria-label=\"买卖合同\">\n      <input id=\"sdt-loan\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"5000000\" aria-label=\"借款合同\">\n    </span>\n    <p class=\"hint\">左：买卖合同（0.03%），右：借款合同（0.005%，仅银行等金融机构借款）</p>\n    <span class=\"row\">\n      <input id=\"sdt-lease\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"1200000\" aria-label=\"租赁合同\">\n      <input id=\"sdt-trans\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"800000\" aria-label=\"运输合同\">\n    </span>\n    <p class=\"hint\">左：租赁合同（0.1%），右：运输合同（0.03%）</p>\n    <span class=\"row\">\n      <input id=\"sdt-equity\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"2000000\" aria-label=\"产权转移书据\">\n      <input id=\"sdt-capital\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"3000000\" aria-label=\"营业账簿\">\n    </span>\n    <p class=\"hint\">左：股权转让等产权转移书据（0.05%），右：实收资本＋资本公积合计（0.025%）</p>\n    <label class=\"f\">\n      <span>是否适用小规模/小微减半</span>\n      <select id=\"sdt-half\">\n        <option value=\"1\" selected>是，减半征收</option>\n        <option value=\"0\">否，全额</option>\n      </select>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">印花税合计</span><strong id=\"sdt-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>买卖 / 借款</span><b id=\"sdt-k1\">—</b></li>\n      <li><span>租赁 / 运输</span><b id=\"sdt-k2\">—</b></li>\n      <li><span>产权转移 / 账簿</span><b id=\"sdt-k3\">—</b></li>\n      <li><span>减半前合计</span><b id=\"sdt-raw\">—</b></li>\n      <li><span>综合税负率</span><b id=\"sdt-rate\">—</b></li>\n      <li><span>未列明增值税的后果</span><b id=\"sdt-tip\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"sdt-note\"></p>\n  </div>\n    </div>\n  </section>\n","intsvc":"  <section class=\"panel\" id=\"panel-intsvc\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>服务提供的实际成本</span>\n      <input id=\"isv-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"2000000\">\n    </label>\n    <label class=\"f\">\n      <span>加成率（%）</span>\n      <input id=\"isv-mark\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"8\">\n      <em>成本加成法：服务费 = 成本 ×(1＋加成率)，加成率要在可比区间内</em>\n    </label>\n    <span class=\"row\">\n      <input id=\"isv-low\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"5\" aria-label=\"可比区间下限\">\n      <input id=\"isv-high\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"12\" aria-label=\"可比区间上限\">\n    </span>\n    <p class=\"hint\">左：可比加成率下限（%），右：上限（%）</p>\n    <span class=\"row\">\n      <input id=\"isv-ta\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\" aria-label=\"提供服务方税率\">\n      <input id=\"isv-tb\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"15\" aria-label=\"接收方税率\">\n    </span>\n    <p class=\"hint\">左：提供服务方所得税率（%），右：接收方所得税率（%）</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">集团净省税</span><strong id=\"isv-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>内部服务费</span><b id=\"isv-fee\">—</b></li>\n      <li><span>加成额（利润转移）</span><b id=\"isv-add\">—</b></li>\n      <li><span>加成率 vs 可比区间</span><b id=\"isv-range\">—</b></li>\n      <li><span>增值税（6%，接收方可抵）</span><b id=\"isv-vat\">—</b></li>\n      <li><span>若接收方不能抵扣</span><b id=\"isv-vatcost\">—</b></li>\n      <li><span>加成率超出区间的调整</span><b id=\"isv-adj\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"isv-note\"></p>\n  </div>\n    </div>\n  </section>\n","exportcheck":"  <section class=\"panel\" id=\"panel-exportcheck\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <span class=\"row\">\n      <input id=\"exc-usd\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\" aria-label=\"报关出口额美元\">\n      <input id=\"exc-fx\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.01\" value=\"7.10\" aria-label=\"汇率\">\n    </span>\n    <p class=\"hint\">左：报关单出口额（美元），右：记账汇率</p>\n    <span class=\"row\">\n      <input id=\"exc-inv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"7120000\" aria-label=\"出口发票人民币\">\n      <input id=\"exc-rec\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"950000\" aria-label=\"已收汇美元\">\n    </span>\n    <p class=\"hint\">左：出口发票人民币金额，右：已收汇美元金额</p>\n    <span class=\"row\">\n      <input id=\"exc-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"10\" aria-label=\"退税率\">\n      <input id=\"exc-credit\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"600000\" aria-label=\"期末留抵税额\">\n    </span>\n    <p class=\"hint\">左：出口货物退税率（%），右：期末留抵税额</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">本期应退税额</span><strong id=\"exc-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>报关折人民币</span><b id=\"exc-cny\">—</b></li>\n      <li><span>发票 − 报关 差异</span><b id=\"exc-diff\">—</b></li>\n      <li><span>收汇率</span><b id=\"exc-recrate\">—</b></li>\n      <li><span>免抵退税额</span><b id=\"exc-rebate\">—</b></li>\n      <li><span>免抵额</span><b id=\"exc-free\">—</b></li>\n      <li><span>不得免征和抵扣（征退差）</span><b id=\"exc-gap\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"exc-note\"></p>\n  </div>\n    </div>\n  </section>\n","vatcheck":"  <section class=\"panel\" id=\"panel-vatcheck\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <span class=\"row\">\n      <input id=\"vchk-out\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1300000\" aria-label=\"账面销项税额\">\n      <input id=\"vchk-inv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1250000\" aria-label=\"开票系统销项\">\n    </span>\n    <p class=\"hint\">左：账面「应交税费—应交增值税（销项税额）」, 右：开票系统已开票销项税额</p>\n    <span class=\"row\">\n      <input id=\"vchk-noinv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"60000\" aria-label=\"未开票收入销项\">\n      <input id=\"vchk-in\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"900000\" aria-label=\"账面进项税额\">\n    </span>\n    <p class=\"hint\">左：未开票收入对应销项，右：账面进项税额</p>\n    <span class=\"row\">\n      <input id=\"vchk-cert\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"880000\" aria-label=\"勾选认证进项\">\n      <input id=\"vchk-tr\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"30000\" aria-label=\"进项转出\">\n    </span>\n    <p class=\"hint\">左：已勾选认证的进项税额，右：本期进项税额转出</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">本期应交增值税</span><strong id=\"vchk-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>申报应列销项</span><b id=\"vchk-outp\">—</b></li>\n      <li><span>销项：账面 − 申报</span><b id=\"vchk-outdiff\">—</b></li>\n      <li><span>申报可抵进项</span><b id=\"vchk-inp\">—</b></li>\n      <li><span>进项：账面 − 申报</span><b id=\"vchk-indiff\">—</b></li>\n      <li><span>勾稽差异合计</span><b id=\"vchk-total\">—</b></li>\n      <li><span>风险判断</span><b id=\"vchk-risk\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"vchk-note\"></p>\n  </div>\n    </div>\n  </section>\n"};
export default { vat: calcVat, vatdue: calcVatDue, exportrebate: calcExport, taxburden: calcTaxBurden, refundflow: calcRefundFlow, taxadj: calcTaxAdj, debtcap: calcDebtCap, accdep: calcAccDep, esop: calcEsop, rdexp: calcRdExp, govgrant: calcGovGrant, rdcap: calcRdCap, rebatedta: calcRebateDTA, welfare: calcWelfare, inputout: calcInputOut, stampduty: calcStampDuty, intsvc: calcIntSvc, exportcheck: calcExportCheck, vatcheck: calcVatCheck, salesallow: calcSalesAllow, vatchoose: calcVatChoose };
