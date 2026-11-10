/* 自动生成，勿手改：acct 分类模块（点开才下载） */
const { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DIVISOR, FAV_KEY, FIELDS, KEY, MONTH_TABLE, PRE_KEY, SNAP_KEY, SNAP_PICK, TABS, THEME_KEY, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, ensureChunk, favList, fillUnits, flash, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, leftAfter, loadCmpA, loadSnaps, loanRows, makeSnap, money, monthToDate, monthlyIRR, months, npvDiff, num, numOf, panelEls, panelParams, parseAmounts, parseDate, pct, percentile, presets, quickOf, rateOf, refreshCounts, renderLoanTable, renderPresets, renderSnapCompare, renderSnapList, rentBuyAt, restore, runCalc, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, snapNameOf, snapshot, st0, startName, taxBy, yuan, zOf } = window.FC;

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

export default { vat: calcVat, vatdue: calcVatDue, deprec: calcDeprec, breakeven: calcBreakEven, ratios: calcRatios, recon: calcRecon, expense: calcExpense, aging: calcAging, funding: calcFunding, pricing: calcPricing, triplede: calcTripleDe, multimargin: calcMultiMargin, apterms: calcApTerms, assetledger: calcAssetLedger, payage: calcPayAge, costcard: calcCostCard, budgetvar: calcBudgetVar, finreport: calcFinReport, invoice: calcInvoice, expbudget: calcExpBudget, efficiency: calcEfficiency, cashstmt: calcCashStmt, invstock: calcInvStock, exportrebate: calcExport, tieout: calcTieOut, feetrend: calcFeeTrend, mpbe: calcMpbe, payroll: calcPayroll, assetdiff: calcAssetDiff, monthclose: calcMonthClose, factoring: calcFactoring, deadstock: calcDeadStock, aptalk: calcApTalk, cash13: calcCash13, bill: calcBill, collect: calcCollect, mgmtpack: calcMgmtPack, settleway: calcSettleWay, creditline: calcCreditLine, impair: calcImpair, fxgain: calcFxGain, taxburden: calcTaxBurden, sens: calcSens, consol: calcConsol, eoq: calcEoq, bplan: calcBPlan, refundflow: calcRefundFlow, costalloc: calcCostAlloc, importcost: calcImportCost, makeorbuy: calcMakeOrBuy, ecl: calcEcl, quotefx: calcQuoteFx, capacity: calcCapacity, mold: calcMold, rebate: calcRebate, stdcost: calcStdCost, svc: calcSvc, taxadj: calcTaxAdj, supplier: calcSupplier, debtcap: calcDebtCap, accdep: calcAccDep, custwin: calcCustWin, upgrade: calcUpgrade, deptalloc: calcDeptAlloc, payout: calcPayout, trprice: calcTrPrice, esop: calcEsop, rdexp: calcRdExp, rollfc: calcRollFC, commission: calcCommission, capex: calcCapex, pooling: calcPooling, creditlimit: calcCreditLimit, contractperf: calcContractPerf, projrev: calcProjRev, creditpolicy: calcCreditPolicy, invfund: calcInvFund, machrate: calcMachRate, govgrant: calcGovGrant, fxtranslate: calcFxTranslate, rebateacc: calcRebateAcc, pledgeloan: calcPledgeLoan, labvar: calcLabVar, rdcap: calcRdCap, processcost: calcProcessCost, makeoroutsource: calcMakeOrOutsource, rebatedta: calcRebateDTA, leasebuy: calcLeaseBuy, welfare: calcWelfare, inputout: calcInputOut, stampduty: calcStampDuty, assetdisp: calcAssetDisp, headcount: calcHeadcount, markroi: calcMarkRoi, rdproject: calcRdProject, intsvc: calcIntSvc, accrual: calcAccrual, cfconsol: calcCfConsol, exportcheck: calcExportCheck, vatcheck: calcVatCheck, salesallow: calcSalesAllow, lease: calcLease, gpmix: calcGpmix, vatchoose: calcVatChoose };
