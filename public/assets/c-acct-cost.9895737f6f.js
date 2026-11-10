/* 自动生成，勿手改：acct-cost 分类模块（点开才下载） */
const { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, FAV_KEY, FIELDS, KEY, MONTH_CATS, MONTH_TABLE, PENDING_PARAMS, PRE_KEY, RECENT_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, dlJson, drawMonthCats, drawMonthStack, drawReportCharts, drawRpMini, drawnMonthlyChart, drawnYearChart, ensureChunk, favList, fillUnits, flash, flushParams, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, leftAfter, loadCmpA, loadSnaps, loanRows, makeSnap, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numOf, panelEls, panelParams, parseAmounts, parseDate, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, presets, pushRecent, quickOf, rateOf, readJsonFile, readMonthGrid, recentList, refreshCounts, renderLoanTable, renderPresets, renderSnapCompare, renderSnapList, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tap, taxBy, updShown, yuan, zOf } = window.FC;

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

export const PANELS = {"deprec":"  <section class=\"panel\" id=\"panel-deprec\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\"><span>固定资产原值（元，含税价按入账价值填）</span>\n      <input id=\"fa-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"100000\"></label>\n    <label class=\"f\"><span>预计净残值率（%）</span>\n      <input id=\"fa-res\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"50\" step=\"1\" value=\"5\"></label>\n    <label class=\"f\"><span>折旧年限（年）</span>\n      <input id=\"fa-life\" type=\"number\" inputmode=\"decimal\" min=\"1\" max=\"40\" step=\"1\" value=\"5\"></label>\n    <label class=\"f\"><span>折旧方法</span>\n      <select id=\"fa-method\">\n        <option value=\"straight\" selected>年限平均法（直线法，最常用）</option>\n        <option value=\"ddb\">双倍余额递减法</option>\n        <option value=\"syd\">年数总和法</option>\n      </select></label>\n    <label class=\"f\"><span>已计提月数（算当前净值用）</span>\n      <input id=\"fa-used\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"0\"></label>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">每月折旧</span><strong id=\"fa-month\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>首年折旧额</span><b id=\"fa-year\">—</b></li>\n      <li><span>应计提折旧总额</span><b id=\"fa-total\">—</b></li>\n      <li><span>已累计折旧（按月数）</span><b id=\"fa-acc\">—</b></li>\n      <li><span>当前账面净值</span><b id=\"fa-nav\">—</b></li>\n      <li><span>预计净残值</span><b id=\"fa-resv\">—</b></li>\n      <li><span>还剩多少个月</span><b id=\"fa-left\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>年度</th><th>年折旧</th><th>累计折旧</th><th>期末净值</th></tr></thead>\n        <tbody id=\"fa-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"fa-note\"></p>\n  </div>\n    </div>\n  </section>\n","assetledger":"  <section class=\"panel\" id=\"panel-assetledger\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（直线法，原值填 0 表示这行不用）</h2>\n    <label class=\"f\">\n      <span>卡片 1</span>\n      <span class=\"row\">\n        <input id=\"al-v1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"100000\" placeholder=\"原值\">\n        <input id=\"al-l1\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"50\" step=\"1\" value=\"5\" placeholder=\"年限\">\n        <input id=\"al-s1\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"50\" step=\"1\" value=\"5\" placeholder=\"残值率%\">\n        <input id=\"al-m1\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"18\" placeholder=\"已提月数\">\n      </span>\n    </label>\n    <label class=\"f\">\n      <span>卡片 2</span>\n      <span class=\"row\">\n        <input id=\"al-v2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"60000\" placeholder=\"原值\">\n        <input id=\"al-l2\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"50\" step=\"1\" value=\"10\" placeholder=\"年限\">\n        <input id=\"al-s2\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"50\" step=\"1\" value=\"5\" placeholder=\"残值率%\">\n        <input id=\"al-m2\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"40\" placeholder=\"已提月数\">\n      </span>\n    </label>\n    <label class=\"f\">\n      <span>卡片 3</span>\n      <span class=\"row\">\n        <input id=\"al-v3\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"12000\" placeholder=\"原值\">\n        <input id=\"al-l3\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"50\" step=\"1\" value=\"3\" placeholder=\"年限\">\n        <input id=\"al-s3\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"50\" step=\"1\" value=\"0\" placeholder=\"残值率%\">\n        <input id=\"al-m3\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"10\" placeholder=\"已提月数\">\n      </span>\n    </label>\n    <em>每行四个框依次填：原值 / 年限 / 残值率% / 已提月数（从开始计提那个月算到上个月为止）；当月新增的下月才提</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">本月折旧合计（直线法）</span><strong id=\"al-month\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>原值合计</span><b id=\"al-cost\">—</b></li>\n      <li><span>累计折旧合计</span><b id=\"al-acc\">—</b></li>\n      <li><span>账面净值合计 / 净值率</span><b id=\"al-net\">—</b></li>\n      <li><span>未来 12 个月还要提的折旧</span><b id=\"al-fwd\">—</b></li>\n      <li><span>已提足 / 剩不到 3 个月</span><b id=\"al-done\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>卡片</th><th>原值</th><th>年限</th><th>已提月数</th><th>月折旧</th><th>累计折旧</th><th>净值</th><th>剩余月数</th></tr></thead>\n        <tbody id=\"al-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"al-note\"></p>\n  </div>\n    </div>\n  </section>\n","costcard":"  <section class=\"panel\" id=\"panel-costcard\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（品种法：一个产品、月末有在制）</h2>\n    <label class=\"f\">\n      <span>本月完工入库数量（件）</span>\n      <input id=\"cw-fin\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"10\" value=\"900\">\n    </label>\n    <label class=\"f\">\n      <span>月末在产品数量（件）</span>\n      <input id=\"cw-wip\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"10\" value=\"100\">\n    </label>\n    <label class=\"f\">\n      <span>在产品完工程度（%，加工费按此折算）</span>\n      <input id=\"cw-deg\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"50\">\n    </label>\n    <label class=\"f\">\n      <span>直接材料（元，期初在制 + 本月投入）</span>\n      <input id=\"cw-mat\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"60000\">\n    </label>\n    <label class=\"f\">\n      <span>直接人工（元）</span>\n      <input id=\"cw-lab\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\">\n    </label>\n    <label class=\"f\">\n      <span>制造费用（元）</span>\n      <input id=\"cw-oh\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"30000\">\n    </label>\n    <em>材料默认「投产时一次投入」，所以在产品按 100% 折算材料；人工和制造费用按完工程度折算。若材料是陆续投入，把完工程度也套到材料上</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">完工产品单位成本</span><strong id=\"cw-unit\">—</strong><span class=\"unit\">元/件</span></div>\n    <ul class=\"kv\">\n      <li><span>材料约当产量 / 加工约当产量</span><b id=\"cw-eq\">—</b></li>\n      <li><span>单位材料 / 单位人工 / 单位制造费用</span><b id=\"cw-parts\">—</b></li>\n      <li><span>完工产品成本合计</span><b id=\"cw-fincost\">—</b></li>\n      <li><span>月末在产品成本</span><b id=\"cw-wipcost\">—</b></li>\n      <li><span>两项合计（应等于投入总额）</span><b id=\"cw-sum\">—</b></li>\n      <li><span>材料占单位成本</span><b id=\"cw-mix\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>成本项</th><th>本月金额</th><th>约当产量</th><th>单位成本</th></tr></thead>\n        <tbody id=\"cw-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"cw-note\"></p>\n  </div>\n    </div>\n  </section>\n","budgetvar":"  <section class=\"panel\" id=\"panel-budgetvar\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（预算 vs 实际）</h2>\n    <label class=\"f\">\n      <span>预算销量（件）</span>\n      <input id=\"bv-bq\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"10\" value=\"1000\">\n    </label>\n    <label class=\"f\">\n      <span>预算单价（元）</span>\n      <input id=\"bv-bp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"100\">\n    </label>\n    <label class=\"f\">\n      <span>标准单耗（kg/件）</span>\n      <input id=\"bv-sq\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"5\">\n    </label>\n    <label class=\"f\">\n      <span>材料标准价（元/kg）</span>\n      <input id=\"bv-sp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"10\">\n    </label>\n    <label class=\"f\">\n      <span>实际销量（件）</span>\n      <input id=\"bv-aq\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"10\" value=\"1100\">\n    </label>\n    <label class=\"f\">\n      <span>实际单价（元）</span>\n      <input id=\"bv-ap\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"95\">\n    </label>\n    <label class=\"f\">\n      <span>实际材料用量（kg）</span>\n      <input id=\"bv-aqty\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"5500\">\n    </label>\n    <label class=\"f\">\n      <span>实际材料单价（元/kg）</span>\n      <input id=\"bv-apx\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"11\">\n    </label>\n    <em>只算毛利层面的差异（收入 − 材料成本），人工和制造费用差异用同样办法套</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">毛利差异（实际 − 预算）</span><strong id=\"bv-gap\">—</strong><span class=\"unit\"></span></div>\n    <ul class=\"kv\">\n      <li><span>预算毛利 / 弹性预算毛利 / 实际毛利</span><b id=\"bv-levels\">—</b></li>\n      <li><span>销量差异（卖多卖少）</span><b id=\"bv-vol\">—</b></li>\n      <li><span>售价差异（价格高低）</span><b id=\"bv-price\">—</b></li>\n      <li><span>材料价差（买贵买便宜）</span><b id=\"bv-mpv\">—</b></li>\n      <li><span>材料量差（用多用少）</span><b id=\"bv-mqv\">—</b></li>\n      <li><span>最大拖累项</span><b id=\"bv-main\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>差异项</th><th>金额</th><th>有利/不利</th><th>该找谁</th></tr></thead>\n        <tbody id=\"bv-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"bv-note\"></p>\n  </div>\n    </div>\n  </section>\n","assetdiff":"  <section class=\"panel\" id=\"panel-assetdiff\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（一次盘点结果）</h2>\n    <label class=\"f\"><span>盘亏资产原值（元）</span>\n      <input id=\"ad-cost\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"50000\"></label>\n    <label class=\"f\"><span>盘亏资产已提折旧（元）</span>\n      <input id=\"ad-dep\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"20000\"></label>\n    <label class=\"f\"><span>盘盈资产重置完全价值（元）</span>\n      <input id=\"ad-rv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"30000\"></label>\n    <label class=\"f\"><span>成新率（%）</span>\n      <input id=\"ad-cd\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"60\"></label>\n    <label class=\"f\"><span>责任人赔偿 / 保险赔付（元）</span>\n      <span class=\"row\">\n        <input id=\"ad-comp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"5000\">\n        <input id=\"ad-ins\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"10000\">\n      </span></label>\n    <label class=\"f\"><span>增值税率（%，非正常损失要转出进项）</span>\n      <input id=\"ad-vat\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"20\" step=\"1\" value=\"13\"></label>\n    <label class=\"f\"><span>企业所得税率（%）</span>\n      <input id=\"ad-tr\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"50\" step=\"1\" value=\"25\"></label>\n    <em>管理不善造成的被盗、霉烂变质才需要转出进项税；正常报废、自然灾害不用转出</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">本次盘点对损益净影响</span><strong id=\"ad-net\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>盘亏账面净值（原值 − 已提折旧）</span><b id=\"ad-nav\">—</b></li>\n      <li><span>进项税转出</span><b id=\"ad-vatout\">—</b></li>\n      <li><span>可收回赔偿合计</span><b id=\"ad-rec\">—</b></li>\n      <li><span>盘亏净损失（税前）</span><b id=\"ad-loss\">—</b></li>\n      <li><span>盘盈入账价值（重置价 × 成新率）</span><b id=\"ad-gain\">—</b></li>\n      <li><span>净损失可少缴所得税</span><b id=\"ad-taxsave\">—</b></li>\n      <li><span>盘盈应计应税所得</span><b id=\"ad-taxadd\">—</b></li>\n      <li><span>固定资产净值率（盘亏资产）</span><b id=\"ad-navrate\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>事项</th><th>金额</th><th>账务处理</th></tr></thead>\n        <tbody id=\"ad-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"ad-note\"></p>\n  </div>\n    </div>\n  </section>\n","capex":"  <section class=\"panel\" id=\"panel-capex\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（固定资产投决）</h2>\n    <label class=\"f\"><span>初始投资（元）</span>\n      <input id=\"cpx-inv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"5000000\"></label>\n    <label class=\"f\"><span>每年净现金流（元）</span>\n      <input id=\"cpx-cf\" type=\"number\" inputmode=\"decimal\" step=\"50000\" value=\"1200000\"></label>\n    <label class=\"f\"><span>使用年限（年）</span>\n      <input id=\"cpx-years\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1\" value=\"8\"></label>\n    <label class=\"f\"><span>折现率（%）</span>\n      <input id=\"cpx-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"8\"></label>\n    <label class=\"f\"><span>期末残值（元）</span>\n      <input id=\"cpx-rv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50000\" value=\"500000\"></label>\n    <em>口径：NPV &gt; 0 且 IRR &gt; 折现率才值得投；回收期只说明多久回本，不含风险，别单独用它拍板</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">净现值 NPV</span><strong id=\"cpx-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>内部收益率 IRR</span><b id=\"cpx-irr\">—</b></li>\n      <li><span>盈利指数 PI</span><b id=\"cpx-pi\">—</b></li>\n      <li><span>静态回收期</span><b id=\"cpx-pb\">—</b></li>\n      <li><span>动态回收期</span><b id=\"cpx-dpb\">—</b></li>\n      <li><span>年金现值系数</span><b id=\"cpx-pvifa\">—</b></li>\n      <li><span>投资结论</span><b id=\"cpx-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>年</th><th>净现金流</th><th>折现现值</th><th>累计现值</th></tr></thead>\n        <tbody id=\"cpx-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"cpx-note\"></p>\n  </div>\n    </div>\n  </section>\n","costalloc":"  <section class=\"panel\" id=\"panel-costalloc\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（制造费用分摊，三个产品）</h2>\n    <label class=\"f\"><span>制造费用合计（元/月）</span>\n      <input id=\"cal-oh\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\"></label>\n    <label class=\"f\"><span>产量 A / B / C（件）</span>\n      <span class=\"row\"><input id=\"cal-qa\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"1000\">\n        <input id=\"cal-qb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"2000\">\n        <input id=\"cal-qc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"1500\"></span></label>\n    <label class=\"f\"><span>单位工时 A / B / C（小时）</span>\n      <span class=\"row\"><input id=\"cal-ha\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"2\">\n        <input id=\"cal-hb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"1\">\n        <input id=\"cal-hc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"0.5\"></span></label>\n    <label class=\"f\"><span>单位机器工时 A / B / C</span>\n      <span class=\"row\"><input id=\"cal-ma\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"3\">\n        <input id=\"cal-mb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"1\">\n        <input id=\"cal-mc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"0.5\"></span></label>\n    <label class=\"f\"><span>直接材料总额 A / B / C（元）</span>\n      <span class=\"row\"><input id=\"cal-ta\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"100000\">\n        <input id=\"cal-tb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"100000\">\n        <input id=\"cal-tc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\"></span></label>\n    <em>口径：四种基准都能把制造费用分完，区别在「谁替谁背」。选错基准，高工时产品吃亏、高材料产品背锅</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">方法差异最大（单位制造费用极差）</span><strong id=\"cal-big\">—</strong><span class=\"unit\">元/件</span></div>\n    <ul class=\"kv\">\n      <li><span>差异最大的产品</span><b id=\"cal-which\">—</b></li>\n      <li><span>总产量 / 总工时 / 总机时</span><b id=\"cal-totals\">—</b></li>\n      <li><span>分配率：产量法</span><b id=\"cal-r1\">—</b></li>\n      <li><span>分配率：工时法 / 机时法</span><b id=\"cal-r2\">—</b></li>\n      <li><span>分配率：材料成本法</span><b id=\"cal-r3\">—</b></li>\n      <li><span>建议采用的基准</span><b id=\"cal-pick\">—</b></li>\n      <li><span>对定价的影响</span><b id=\"cal-price\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>产品</th><th>产量法</th><th>工时法</th><th>机时法</th><th>材料法</th><th>极差</th></tr></thead>\n        <tbody id=\"cal-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"cal-note\"></p>\n  </div>\n    </div>\n  </section>\n","makeorbuy":"  <section class=\"panel\" id=\"panel-makeorbuy\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（自产还是外购）</h2>\n    <label class=\"f\"><span>年需求量（件）</span>\n      <input id=\"mob-q\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"10000\"></label>\n    <label class=\"f\"><span>自产单位变动成本（元/件）</span>\n      <input id=\"mob-vu\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"45\"></label>\n    <label class=\"f\"><span>停产后可避免的固定成本（元/年）</span>\n      <input id=\"mob-avo\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"60000\"></label>\n    <label class=\"f\"><span>外购单价（元/件）</span>\n      <input id=\"mob-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"52\"></label>\n    <label class=\"f\"><span>外购带来的增量费用（元/件）</span>\n      <input id=\"mob-extra\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"1.5\"></label>\n    <label class=\"f\"><span>腾出产能的租金收入（元/年）</span>\n      <input id=\"mob-rent\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5000\" value=\"40000\"></label>\n    <label class=\"f\"><span>现有全部固定制造费用（元/年）</span>\n      <input id=\"mob-fixall\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50000\" value=\"300000\"></label>\n    <em>口径：只比「会变的那部分」。停产也照付的固定费用跟决策无关，把它摊进单位成本是最常见的算错方式</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">差额（正=外购更省）</span><strong id=\"mob-big\">—</strong><span class=\"unit\">元/年</span></div>\n    <ul class=\"kv\">\n      <li><span>自产相关成本</span><b id=\"mob-self\">—</b></li>\n      <li><span>外购相关成本（已扣租金）</span><b id=\"mob-buy\">—</b></li>\n      <li><span>单位口径对比</span><b id=\"mob-unit\">—</b></li>\n      <li><span>临界外购价</span><b id=\"mob-crit\">—</b></li>\n      <li><span>临界需求量</span><b id=\"mob-qcrit\">—</b></li>\n      <li><span>结论</span><b id=\"mob-pick\">—</b></li>\n      <li><span>如果把全部固定费用摊进去（错）</span><b id=\"mob-wrong\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>自产</th><th>外购</th></tr></thead>\n        <tbody id=\"mob-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"mob-note\"></p>\n  </div>\n    </div>\n  </section>\n","capacity":"  <section class=\"panel\" id=\"panel-capacity\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（两个工厂怎么排产）</h2>\n    <label class=\"f\"><span>订单量（台）</span>\n      <input id=\"cap-q\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"14000\"></label>\n    <label class=\"f\"><span>售价（元/台）</span>\n      <input id=\"cap-p\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"150\"></label>\n    <label class=\"f\"><span>A 厂：变动成本 / 产能 / 运费</span>\n      <span class=\"row\"><input id=\"cap-va\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"80\">\n        <input id=\"cap-ca\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"10000\">\n        <input id=\"cap-fa\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"12\"></span></label>\n    <label class=\"f\"><span>B 厂：变动成本 / 产能 / 运费</span>\n      <span class=\"row\"><input id=\"cap-vb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"92\">\n        <input id=\"cap-cb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"6000\">\n        <input id=\"cap-fb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"5\"></span></label>\n    <label class=\"f\"><span>A 厂 / B 厂固定成本（元）</span>\n      <span class=\"row\"><input id=\"cap-fixa\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50000\" value=\"300000\">\n        <input id=\"cap-fixb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"50000\" value=\"150000\"></span></label>\n    <label class=\"f\"><span>外协价（元/台，0=不考虑）</span>\n      <input id=\"cap-out\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"118\"></label>\n    <em>口径：排产按单位边际贡献（售价−变动成本−运费）从高到低填满，不按单位总成本——总成本里含着不随产量变的固定费用</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">最优排产下的利润</span><strong id=\"cap-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>A 厂边际贡献 / 排产</span><b id=\"cap-a\">—</b></li>\n      <li><span>B 厂边际贡献 / 排产</span><b id=\"cap-b\">—</b></li>\n      <li><span>总边际贡献</span><b id=\"cap-cm\">—</b></li>\n      <li><span>固定成本合计</span><b id=\"cap-fix\">—</b></li>\n      <li><span>反着排（先填 B）会少赚</span><b id=\"cap-wrong\">—</b></li>\n      <li><span>产能不够怎么办</span><b id=\"cap-gap\">—</b></li>\n      <li><span>外协划算吗</span><b id=\"cap-outv\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>方案</th><th>A 产量</th><th>B 产量</th><th>边际贡献</th><th>利润</th></tr></thead>\n        <tbody id=\"cap-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"cap-note\"></p>\n  </div>\n    </div>\n  </section>\n","upgrade":"  <section class=\"panel\" id=\"panel-upgrade\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（设备继续用还是换新，万元）</h2>\n    <label class=\"f\"><span>旧机：年运行成本 / 年维修费</span>\n      <span class=\"row\"><input id=\"upg-oldrun\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"80\">\n        <input id=\"upg-oldmt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"12\"></span></label>\n    <label class=\"f\"><span>旧机：现在卖掉能得 / 剩余寿命</span>\n      <span class=\"row\"><input id=\"upg-oldsale\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"60\">\n        <input id=\"upg-oldlife\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1\" value=\"4\"></span></label>\n    <label class=\"f\"><span>旧机：寿命末残值</span>\n      <input id=\"upg-oldsalv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"20\"></label>\n    <label class=\"f\"><span>新机：投资额 / 寿命（年）</span>\n      <span class=\"row\"><input id=\"upg-newinv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"260\">\n        <input id=\"upg-newlife\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1\" value=\"8\"></span></label>\n    <label class=\"f\"><span>新机：年运行成本 / 年维修费</span>\n      <span class=\"row\"><input id=\"upg-newrun\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"50\">\n        <input id=\"upg-newmt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"4\"></span></label>\n    <label class=\"f\"><span>新机：寿命末残值 / 折现率%</span>\n      <span class=\"row\"><input id=\"upg-newsalv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"40\">\n        <input id=\"upg-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"8\"></span></label>\n    <em>口径：寿命不同不能直接比现值，要折成「年化成本」比；旧机现在卖得掉的钱是放弃的机会成本，必须计入</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">换新每年省（年化成本差）</span><strong id=\"upg-big\">—</strong><span class=\"unit\">万元/年</span></div>\n    <ul class=\"kv\">\n      <li><span>旧机：现值 / 年化成本</span><b id=\"upg-old\">—</b></li>\n      <li><span>新机：现值 / 年化成本</span><b id=\"upg-new\">—</b></li>\n      <li><span>结论</span><b id=\"upg-verdict\">—</b></li>\n      <li><span>新机投资上限（打平点）</span><b id=\"upg-maxinv\">—</b></li>\n      <li><span>新机能耗再降 10% 的额外收益</span><b id=\"upg-energy\">—</b></li>\n      <li><span>旧机再拖一年，成本上升</span><b id=\"upg-delay\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>项目</th><th>旧机</th><th>新机</th></tr></thead>\n        <tbody id=\"upg-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"upg-note\"></p>\n  </div>\n    </div>\n  </section>\n","deptalloc":"  <section class=\"panel\" id=\"panel-deptalloc\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（辅助部门费用分摊，万元）</h2>\n    <label class=\"f\"><span>维修部费用</span>\n      <input id=\"da-s1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"10\"></label>\n    <label class=\"f\"><span>维修部提供服务：给动力 / 给 A / 给 B（%）</span>\n      <span class=\"row\"><input id=\"da-s12\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"40\">\n        <input id=\"da-a1\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"40\">\n        <input id=\"da-b1\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"20\"></span></label>\n    <label class=\"f\"><span>动力部费用</span>\n      <input id=\"da-s2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"20\"></label>\n    <label class=\"f\"><span>动力部提供服务：给维修 / 给 A / 给 B（%）</span>\n      <span class=\"row\"><input id=\"da-s21\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"20\">\n        <input id=\"da-a2\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"30\">\n        <input id=\"da-b2\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"5\" value=\"50\"></span></label>\n    <em>口径：三个百分比是「这个部门的成本分别给了谁」，相加不必等于 100（程序会自动归一）。辅助部门互相服务越多，三种方法差得越远</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">三种方法下 A 车间分摊额最大差</span><strong id=\"da-big\">—</strong><span class=\"unit\">万元</span></div>\n    <ul class=\"kv\">\n      <li><span>直接法：A / B</span><b id=\"da-d\">—</b></li>\n      <li><span>阶梯法：A / B</span><b id=\"da-s\">—</b></li>\n      <li><span>交互分配法：A / B</span><b id=\"da-r\">—</b></li>\n      <li><span>交互法下两部门真实成本</span><b id=\"da-true\">—</b></li>\n      <li><span>合计校验</span><b id=\"da-sum\">—</b></li>\n      <li><span>该用哪种</span><b id=\"da-pick\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>方法</th><th>A 车间</th><th>B 车间</th><th>与交互法差</th></tr></thead>\n        <tbody id=\"da-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"da-note\"></p>\n  </div>\n    </div>\n  </section>\n","mold":"  <section class=\"panel\" id=\"panel-mold\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（模具/工装摊销与最小批量）</h2>\n    <label class=\"f\"><span>模具/工装投入（元）</span>\n      <input id=\"mold-fee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"600000\"></label>\n    <label class=\"f\"><span>模具可产件数（寿命）</span>\n      <input id=\"mold-life\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"5000\" value=\"50000\"></label>\n    <label class=\"f\"><span>正常售价（元/件）</span>\n      <input id=\"mold-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"100\"></label>\n    <label class=\"f\"><span>单件变动成本（元）</span>\n      <input id=\"mold-vc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"60\"></label>\n    <label class=\"f\"><span>该客户年订单量（件）</span>\n      <input id=\"mold-q\" type=\"number\" inputmode=\"decimal\" min=\"1\" step=\"1000\" value=\"20000\"></label>\n    <label class=\"f\"><span>客户压价到（元/件）</span>\n      <input id=\"mold-disc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"95\"></label>\n    <em>口径：专用模具只能靠这一个客户摊，摊销基数应当用「这个客户的累计订单量」，不是全厂产量</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">保本最小批量（按压价后）</span><strong id=\"mold-big\">—</strong><span class=\"unit\">件</span></div>\n    <ul class=\"kv\">\n      <li><span>按寿命摊销</span><b id=\"mold-per\">—</b></li>\n      <li><span>按该客户年订单摊销</span><b id=\"mold-perq\">—</b></li>\n      <li><span>原价下单件毛利</span><b id=\"mold-m1\">—</b></li>\n      <li><span>压价后单件毛利</span><b id=\"mold-m2\">—</b></li>\n      <li><span>该客户全年毛利贡献</span><b id=\"mold-total\">—</b></li>\n      <li><span>按原价的最小批量</span><b id=\"mold-min1\">—</b></li>\n      <li><span>结论</span><b id=\"mold-verdict\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>累计产量</th><th>单件摊销</th><th>压价后单件毛利</th><th>累计毛利</th></tr></thead>\n        <tbody id=\"mold-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"mold-note\"></p>\n  </div>\n    </div>\n  </section>\n","stdcost":"  <section class=\"panel\" id=\"panel-stdcost\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（标准成本与实际，本期）</h2>\n    <label class=\"f\"><span>实际产量（件）</span>\n      <input id=\"sc-q\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"1000\"></label>\n    <label class=\"f\"><span>材料：标准单耗 / 标准单价</span>\n      <span class=\"row\"><input id=\"sc-mq\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2\">\n        <input id=\"sc-mp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"10\"></span></label>\n    <label class=\"f\"><span>材料：实际耗用 / 实际单价</span>\n      <span class=\"row\"><input id=\"sc-maq\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"2100\">\n        <input id=\"sc-map\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"10.5\"></span></label>\n    <label class=\"f\"><span>人工：标准工时 / 标准工资率</span>\n      <span class=\"row\"><input id=\"sc-lh\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"0.5\">\n        <input id=\"sc-lr\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"30\"></span></label>\n    <label class=\"f\"><span>人工：实际工时 / 实际工资率</span>\n      <span class=\"row\"><input id=\"sc-lah\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"520\">\n        <input id=\"sc-lar\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"32\"></span></label>\n    <label class=\"f\"><span>变动制费标准分配率（元/工时）</span>\n      <input id=\"sc-vr\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"8\"></label>\n    <label class=\"f\"><span>变动制费实际发生（元）</span>\n      <input id=\"sc-va\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"4420\"></label>\n    <label class=\"f\"><span>固定制费：预算 / 实际</span>\n      <span class=\"row\"><input id=\"sc-fb\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\">\n        <input id=\"sc-fa\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20800\"></span></label>\n    <em>口径：价差按实际用量算、量差按标准价算，这样两段加起来才等于总差异，不重不漏</em>\n  </div>\n\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">本期总差异</span><strong id=\"sc-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>材料价差 / 量差</span><b id=\"sc-mat\">—</b></li>\n      <li><span>人工工资率差 / 效率差</span><b id=\"sc-lab\">—</b></li>\n      <li><span>变动制费耗费差 / 效率差</span><b id=\"sc-voh\">—</b></li>\n      <li><span>固定制费耗费差 / 产量差</span><b id=\"sc-foh\">—</b></li>\n      <li><span>差异方向</span><b id=\"sc-dir\">—</b></li>\n      <li><span>谁该负责</span><b id=\"sc-owner\">—</b></li>\n      <li><span>占标准成本比例</span><b id=\"sc-ratio\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th>差异项</th><th>金额（元）</th><th>性质</th></tr></thead>\n        <tbody id=\"sc-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"sc-note\"></p>\n  </div>\n    </div>\n  </section>\n","machrate":"  <section class=\"panel\" id=\"panel-machrate\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>月度固定制造费用（折旧、租金、管理人员等）</span>\n      <input id=\"mhr-fixed\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"600000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"mhr-cap\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"10000\" aria-label=\"可用工时\">\n      <input id=\"mhr-act\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"8000\" aria-label=\"实际工时\">\n    </span>\n    <p class=\"hint\">左：月可用工时/机时（理论产能），右：实际利用工时</p>\n    <label class=\"f\">\n      <span>当月产量（件）</span>\n      <input id=\"mhr-qty\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"4000\">\n      <em>用来把费率换算成每件产品摊多少固定成本</em>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">实际固定费率</span><strong id=\"mhr-big\">—</strong><span class=\"unit\">元/小时</span></div>\n    <ul class=\"kv\">\n      <li><span>产能利用率</span><b id=\"mhr-use\">—</b></li>\n      <li><span>正常产能费率</span><b id=\"mhr-norm\">—</b></li>\n      <li><span>闲置产能成本</span><b id=\"mhr-idle\">—</b></li>\n      <li><span>费率虚高</span><b id=\"mhr-gap\">—</b></li>\n      <li><span>每件多摊固定成本</span><b id=\"mhr-unit\">—</b></li>\n      <li><span>固定费用空转比例</span><b id=\"mhr-be\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"mhr-note\"></p>\n  </div>\n    </div>\n  </section>\n","labvar":"  <section class=\"panel\" id=\"panel-labvar\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>实际产量（件）</span>\n      <input id=\"lab-qty\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"10\" value=\"1000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"lab-std\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.1\" value=\"2\" aria-label=\"单位标准工时\">\n      <input id=\"lab-srate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"30\" aria-label=\"标准工资率\">\n    </span>\n    <p class=\"hint\">左：单位标准工时（小时），右：标准工资率（元/小时）</p>\n    <span class=\"row\">\n      <input id=\"lab-ah\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"2200\" aria-label=\"实际工时\">\n      <input id=\"lab-arate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"32\" aria-label=\"实际工资率\">\n    </span>\n    <p class=\"hint\">左：实际投入工时，右：实际工资率（元/小时）</p>\n    <label class=\"f\">\n      <span>可用产能工时</span>\n      <input id=\"lab-cap\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"2400\">\n      <em>用来看「人闲着」这部分，和效率差异是两个口径，别相加</em>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">人工总差异（超支）</span><strong id=\"lab-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>标准工时 / 实际工时</span><b id=\"lab-h\">—</b></li>\n      <li><span>工资率差异</span><b id=\"lab-rate\">—</b></li>\n      <li><span>效率差异</span><b id=\"lab-eff\">—</b></li>\n      <li><span>工时利用率</span><b id=\"lab-use\">—</b></li>\n      <li><span>效率达成率</span><b id=\"lab-eva\">—</b></li>\n      <li><span>闲置产能（吸收不足）</span><b id=\"lab-idle\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"lab-note\"></p>\n  </div>\n    </div>\n  </section>\n","processcost":"  <section class=\"panel\" id=\"panel-processcost\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入（两道工序）</h2>\n    <span class=\"row\">\n      <input id=\"stp-m1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"600000\" aria-label=\"工序1 投入材料\">\n      <input id=\"stp-c1\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\" aria-label=\"工序1 加工成本\">\n    </span>\n    <p class=\"hint\">工序1：左材料，右加工成本（人工＋制造费用）</p>\n    <span class=\"row\">\n      <input id=\"stp-q1\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"100\" value=\"5000\" aria-label=\"工序1 产出半成品数量\">\n      <input id=\"stp-q2\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"100\" value=\"4900\" aria-label=\"工序2 产出产成品数量\">\n    </span>\n    <p class=\"hint\">左：半成品产出件数，右：产成品产出件数（差额就是损耗）</p>\n    <span class=\"row\">\n      <input id=\"stp-m2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"100000\" aria-label=\"工序2 追加材料\">\n      <input id=\"stp-c2\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"150000\" aria-label=\"工序2 加工成本\">\n    </span>\n    <p class=\"hint\">工序2：左追加材料，右加工成本</p>\n    <label class=\"f\">\n      <span>报废件残值收入</span>\n      <input id=\"stp-scrap\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"8000\">\n      <em>废料/残值冲减成本；没有就填 0</em>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">产成品单位成本</span><strong id=\"stp-big\">—</strong><span class=\"unit\">元/件</span></div>\n    <ul class=\"kv\">\n      <li><span>半成品单位成本 / 转出</span><b id=\"stp-semi\">—</b></li>\n      <li><span>产成品总成本</span><b id=\"stp-total\">—</b></li>\n      <li><span>损耗件数 / 损耗成本</span><b id=\"stp-loss\">—</b></li>\n      <li><span>若不计损耗的单位成本</span><b id=\"stp-naive\">—</b></li>\n      <li><span>成本结构（材料 / 加工）</span><b id=\"stp-mix\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"stp-note\"></p>\n  </div>\n    </div>\n  </section>\n","makeoroutsource":"  <section class=\"panel\" id=\"panel-makeoroutsource\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>年需求量（件）</span>\n      <input id=\"mko-qty\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"500\" value=\"12000\">\n    </label>\n    <label class=\"f\">\n      <span>自制单位变动成本</span>\n      <input id=\"mko-vc\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"45\">\n      <em>只算材料＋直接人工＋变动制造费用；分摊的固定费用不算</em>\n    </label>\n    <label class=\"f\">\n      <span>自制需新增专用设备投入</span>\n      <input id=\"mko-inv\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"200000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"mko-life\" type=\"number\" inputmode=\"numeric\" min=\"1\" step=\"1\" value=\"5\" aria-label=\"设备年限\">\n      <input id=\"mko-opp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"0\" aria-label=\"产能机会成本\">\n    </span>\n    <p class=\"hint\">左：设备年限（年），右：占用产能的机会成本（元/件，闲置填 0）</p>\n    <span class=\"row\">\n      <input id=\"mko-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1\" value=\"52\" aria-label=\"委外单价\">\n      <input id=\"mko-extra\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"2\" aria-label=\"委外附加费用\">\n    </span>\n    <p class=\"hint\">左：委外含运单价，右：检验/物流/管理附加（元/件）</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">自制每年省</span><strong id=\"mko-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>自制：变动＋折旧</span><b id=\"mko-in\">—</b></li>\n      <li><span>委外：全额</span><b id=\"mko-out\">—</b></li>\n      <li><span>单位相关成本对比</span><b id=\"mko-unit\">—</b></li>\n      <li><span>盈亏临界量</span><b id=\"mko-be\">—</b></li>\n      <li><span>含机会成本后</span><b id=\"mko-oppout\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"mko-note\"></p>\n  </div>\n    </div>\n  </section>\n","assetdisp":"  <section class=\"panel\" id=\"panel-assetdisp\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <span class=\"row\">\n      <input id=\"adsp-orig\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"1000000\" aria-label=\"原值\">\n      <input id=\"adsp-dep\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"600000\" aria-label=\"累计折旧\">\n    </span>\n    <p class=\"hint\">左：固定资产原值，右：累计折旧</p>\n    <span class=\"row\">\n      <input id=\"adsp-imp\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"0\" aria-label=\"减值准备\">\n      <input id=\"adsp-price\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"452000\" aria-label=\"含税售价\">\n    </span>\n    <p class=\"hint\">左：已计提减值准备，右：含税处置价款</p>\n    <span class=\"row\">\n      <input id=\"adsp-vat\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"13\" aria-label=\"增值税率\">\n      <input id=\"adsp-fee\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"1000\" value=\"5000\" aria-label=\"清理费用\">\n    </span>\n    <p class=\"hint\">左：增值税率（已抵扣进项按 13%），右：清理费用（不含税）</p>\n    <label class=\"f\">\n      <span>所得税率（%）</span>\n      <input id=\"adsp-tax\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"100\" step=\"1\" value=\"25\">\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">处置净损益</span><strong id=\"adsp-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>账面净值</span><b id=\"adsp-nbv\">—</b></li>\n      <li><span>不含税售价 / 销项税</span><b id=\"adsp-net\">—</b></li>\n      <li><span>清理费用</span><b id=\"adsp-feeout\">—</b></li>\n      <li><span>所得税影响</span><b id=\"adsp-taxout\">—</b></li>\n      <li><span>税后净影响</span><b id=\"adsp-after\">—</b></li>\n      <li><span>保本售价（含税）</span><b id=\"adsp-be\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"adsp-note\"></p>\n  </div>\n    </div>\n  </section>\n","rdproject":"  <section class=\"panel\" id=\"panel-rdproject\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>项目预算</span>\n      <input id=\"rdp-budget\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100000\" value=\"3000000\">\n    </label>\n    <span class=\"row\">\n      <input id=\"rdp-mat\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"800000\" aria-label=\"直接材料\">\n      <input id=\"rdp-ext\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"300000\" aria-label=\"委外与检测\">\n    </span>\n    <p class=\"hint\">左：直接材料，右：委外/检测/试制等外部支出</p>\n    <span class=\"row\">\n      <input id=\"rdp-hours\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"6000\" aria-label=\"已归集工时\">\n      <input id=\"rdp-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10\" value=\"150\" aria-label=\"人工费率\">\n    </span>\n    <p class=\"hint\">左：已归集研发工时，右：小时人工费率（含社保）</p>\n    <span class=\"row\">\n      <input id=\"rdp-oh\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"5\" value=\"60\" aria-label=\"间接费分摊率\">\n      <input id=\"rdp-mon\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"12\" step=\"1\" value=\"8\" aria-label=\"已执行月数\">\n    </span>\n    <p class=\"hint\">左：间接费分摊率（% 按直接人工），右：已执行月数</p>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">累计已发生</span><strong id=\"rdp-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>直接人工 / 间接费分摊</span><b id=\"rdp-lab\">—</b></li>\n      <li><span>预算使用率</span><b id=\"rdp-use\">—</b></li>\n      <li><span>预算余额</span><b id=\"rdp-left\">—</b></li>\n      <li><span>当前月均消耗</span><b id=\"rdp-monrate\">—</b></li>\n      <li><span>按当前速度超支预测</span><b id=\"rdp-over\">—</b></li>\n      <li><span>剩余月份每月上限</span><b id=\"rdp-cap\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"rdp-note\"></p>\n  </div>\n    </div>\n  </section>\n"};
export default { deprec: calcDeprec, assetledger: calcAssetLedger, costcard: calcCostCard, budgetvar: calcBudgetVar, assetdiff: calcAssetDiff, costalloc: calcCostAlloc, makeorbuy: calcMakeOrBuy, capacity: calcCapacity, mold: calcMold, stdcost: calcStdCost, upgrade: calcUpgrade, deptalloc: calcDeptAlloc, capex: calcCapex, machrate: calcMachRate, labvar: calcLabVar, processcost: calcProcessCost, makeoroutsource: calcMakeOrOutsource, assetdisp: calcAssetDisp, rdproject: calcRdProject };
