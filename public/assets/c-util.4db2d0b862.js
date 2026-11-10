/* 自动生成，勿手改：util 分类模块（点开才下载） */
const { $, CAT_KEY, CHUNK_FILES, CHUNK_OF, CMP_KEY, CORE_CALC, CURS, DEFERRED_TAPS, DIVISOR, FAV_KEY, FIELDS, KEY, MONTH_CATS, MONTH_TABLE, PENDING_PARAMS, PRE_KEY, RECENT_KEY, SNAP_KEY, SNAP_PICK, STORED, TABS, THEME_KEY, UNITS, XL_ROWS, YEAR_TABLE, activate, addMonths, annuityPV, annuityPayment, applyFilter, applyParams, applyStoredTo, bizAdd, bonusSoloTax, buildLoanSchedule, buildShare, calcLoan, calcMap, cnUpper, combineTax, convertTemp, copyText, cumulativeTax, curCat, currentSnap, dlJson, drawMonthCats, drawRpMini, drawnMonthlyChart, drawnYearChart, ensureChunk, favList, fillUnits, flash, flushParams, fmt, fmtAt, fmtDate, fx, gauss, hashTarget, isFav, leftAfter, loadCmpA, loadSnaps, loanRows, makeSnap, matchQ, money, monthToDate, monthlyIRR, months, npvDiff, num, numOf, panelEls, panelParams, parseAmounts, parseDate, pct, percentile, plRank, plScoreCov, plScoreDsr, plScoreEmg, plScoreLev, plScoreSave, presets, pushRecent, quickOf, rateOf, readJsonFile, recentList, refreshCounts, renderLoanTable, renderPresets, renderSnapCompare, renderSnapList, rentBuyAt, restore, runCalc, runDeferredTaps, save, saveCmpA, saveFav, savePresets, saveSnaps, savedCat, setCat, setSub, setTheme, showUpdateBar, snapNameOf, snapshot, st0, stamp, startName, tap, taxBy, updShown, yuan, zOf } = window.FC;

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

  function calcSnaps() {
    renderSnapList();
    renderSnapCompare();
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

export const PANELS = {"snaps":"  <section class=\"panel\" id=\"panel-snaps\">\n    <div class=\"cols\">\n      <div class=\"card\">\n        <h2>方案快照</h2>\n        <p class=\"hint\">在任意模块调好参数，回来点「存当前方案」，就能把不同方案并排比。快照只存在本机，最多 20 条。</p>\n        <span class=\"row\"><label class=\"f\"><span>排序</span><select id=\"snap-sort\">\n          <option value=\"new\">最新的在前面</option>\n          <option value=\"old\">最早的在前</option>\n          <option value=\"mod\">按模块分组</option>\n          <option value=\"name\">按方案名</option>\n        </select></label><label class=\"f\"><span>只看含关键词的方案</span><input id=\"snap-q\" type=\"search\" placeholder=\"方案名 / 备注 / 模块名\"></label></span>\n        <p class=\"btnrow\">\n          <button class=\"ghost\" type=\"button\" id=\"snap-cmp\">刷新对比</button>\n          <button class=\"ghost\" type=\"button\" id=\"snap-clear\">清空全部</button>\n          <button class=\"ghost\" type=\"button\" id=\"snap-export\">导出快照 JSON</button>\n          <button class=\"ghost\" type=\"button\" id=\"snap-import\">导入快照</button>\n          <button class=\"ghost\" type=\"button\" id=\"snap-backup\">整站备份</button>\n          <button class=\"ghost\" type=\"button\" id=\"snap-restore\">恢复备份</button>\n          <button class=\"ghost\" type=\"button\" id=\"snap-png\">导出对比图 PNG</button>\n          <button class=\"ghost\" type=\"button\" id=\"snap-del-sel\">删除选中</button>\n          <input type=\"file\" id=\"snap-file\" accept=\".json,application/json\" hidden>\n          <input type=\"file\" id=\"bak-file\" accept=\".json,application/json\" hidden>\n        </p>\n        <em>已存 <b id=\"snap-count\">0</b> 个方案。点模块名可以带着当时的参数跳回那个模块继续调；换手机或换浏览器时用「整站备份」把填写值、置顶、预设、快照一起带走。</em>\n      </div>\n      <div class=\"card res\">\n        <h2>快照列表</h2>\n        <div class=\"tablebox\">\n          <table>\n            <thead><tr><th><input type=\"checkbox\" id=\"snap-all\" aria-label=\"全选\"></th><th class=\"tal\">模块</th><th class=\"tal\">方案名</th><th>主结果</th><th>时间</th></tr></thead>\n            <tbody id=\"snap-body\"></tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n    <div class=\"card res\">\n      <h2>并排对比（勾选 2–3 个）</h2>\n      <div class=\"tablebox\">\n        <table>\n          <thead><tr><th class=\"tal\">指标</th><th>—</th></tr></thead>\n          <tbody id=\"snap-cmp-body\"></tbody>\n        </table>\n      </div>\n      <p class=\"hint\" id=\"snap-note\"></p>\n    </div>\n  </section>\n","numwords":"  <section class=\"panel\" id=\"panel-numwords\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入金额</h2>\n    <label class=\"f\"><span>金额（元）</span><input id=\"nw-amount\" type=\"number\" inputmode=\"decimal\" step=\"0.01\" value=\"1234567.89\"></label>\n    <label class=\"f\"><span>是否加「人民币」前缀</span><span class=\"row\"><input id=\"nw-prefix\" type=\"number\" inputmode=\"numeric\" min=\"0\" max=\"1\" step=\"1\" value=\"1\"></span></label>\n    <em>口径：填 1 加「人民币」，填 0 不加；小数位超过两位会被四舍五入到分。财务凭证、发票、支票的大写金额栏都按这套规则写。</em>\n  </div>\n  <div class=\"card res\">\n    <h2>大写金额</h2>\n    <div class=\"big\"><span class=\"k\">中文大写</span><strong id=\"nw-big\">—</strong></div>\n    <ul class=\"kv\">\n      <li><span>小写金额</span><b id=\"nw-low\">—</b></li>\n      <li><span>整数部分（元）</span><b id=\"nw-int\">—</b></li>\n      <li><span>角 / 分</span><b id=\"nw-cent\">—</b></li>\n      <li><span>规范写法</span><b id=\"nw-rule\">—</b></li>\n      <li><span>常见错误</span><b id=\"nw-warn\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"nw-note\"></p>\n  </div>\n    </div>\n  </section>\n","duedate":"  <section class=\"panel\" id=\"panel-duedate\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>账期起算与到期</h2>\n    <label class=\"f\"><span>开票 / 起算日</span><input id=\"ud-start\" type=\"date\" value=\"2026-08-01\"></label>\n    <label class=\"f\"><span>账期天数</span><input id=\"ud-days\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"60\"></label>\n    <label class=\"f\"><span>账期口径</span><span class=\"row\"><input id=\"ud-basis\" type=\"number\" inputmode=\"numeric\" min=\"0\" max=\"1\" step=\"1\" value=\"0\"></span></label>\n    <label class=\"f\"><span>应收金额（元）</span><input id=\"ud-amt\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"10000\" value=\"100000\"></label>\n    <label class=\"f\"><span>逾期日利率（万分之）</span><input id=\"ud-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"0.5\" value=\"5\"></label>\n    <label class=\"f\"><span>对照日（算逾期用）</span><input id=\"ud-today\" type=\"date\" value=\"2026-11-10\"></label>\n    <em>口径：账期口径填 0 = 自然日，1 = 工作日（跳过周六日，不含法定节假日，需自己补）；日利率按万分之填，5 就是 0.05%/天（年化 18.25%）。</em>\n  </div>\n  <div class=\"card res\">\n    <h2>到期与逾期</h2>\n    <div class=\"big\"><span class=\"k\">到期日</span><strong id=\"ud-big\">—</strong></div>\n    <ul class=\"kv\">\n      <li><span>状态</span><b id=\"ud-state\">—</b></li>\n      <li><span>逾期天数</span><b id=\"ud-over\">—</b></li>\n      <li><span>回款周期（自起算日）</span><b id=\"ud-cycle\">—</b></li>\n      <li><span>逾期利息</span><b id=\"ud-int\">—</b></li>\n      <li><span>资金占用成本（至到期日）</span><b id=\"ud-hold\">—</b></li>\n      <li><span>工作日口径到期日</span><b id=\"ud-biz\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"ud-note\"></p>\n  </div>\n    </div>\n  </section>\n","workday":"  <section class=\"panel\" id=\"panel-workday\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>工作日与日期差</h2>\n    <label class=\"f\"><span>起始日</span><input id=\"wd-a\" type=\"date\" value=\"2026-11-10\"></label>\n    <label class=\"f\"><span>结束日</span><input id=\"wd-b\" type=\"date\" value=\"2026-12-10\"></label>\n    <label class=\"f\"><span>期间额外非工作日（天）</span><input id=\"wd-hol\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"0\"></label>\n    <label class=\"f\"><span>从起始日顺延（工作日）</span><input id=\"wd-n\" type=\"number\" inputmode=\"numeric\" min=\"0\" step=\"1\" value=\"10\"></label>\n    <em>口径：工作日只跳过周六日，法定节假日请填在「额外非工作日」里（含调休，按净额填）。结束日不计入跨度天数，与「30 天后」的算法一致。</em>\n  </div>\n  <div class=\"card res\">\n    <h2>天数</h2>\n    <div class=\"big\"><span class=\"k\">工作日</span><strong id=\"wd-big\">—</strong><span class=\"unit\">天</span></div>\n    <ul class=\"kv\">\n      <li><span>自然日</span><b id=\"wd-cal\">—</b></li>\n      <li><span>其中周末</span><b id=\"wd-weekend\">—</b></li>\n      <li><span>含首尾天数</span><b id=\"wd-inc\">—</b></li>\n      <li><span>顺延结果日</span><b id=\"wd-target\">—</b></li>\n      <li><span>顺延含周末共</span><b id=\"wd-span\">—</b></li>\n      <li><span>折算周数</span><b id=\"wd-week\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"wd-note\"></p>\n  </div>\n    </div>\n  </section>\n","cagr":"  <section class=\"panel\" id=\"panel-cagr\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>增幅与年化</h2>\n    <label class=\"f\"><span>期初值</span><input id=\"cg-from\" type=\"number\" inputmode=\"decimal\" step=\"1\" value=\"100\"></label>\n    <label class=\"f\"><span>期末值</span><input id=\"cg-to\" type=\"number\" inputmode=\"decimal\" step=\"1\" value=\"180\"></label>\n    <label class=\"f\"><span>间隔年数</span><input id=\"cg-years\" type=\"number\" inputmode=\"decimal\" min=\"0.01\" step=\"0.5\" value=\"3\"></label>\n    <em>口径：期初期末可以是收入、利润、人数、股价，单位一致就行。年数按 12 个月 = 1 年折算，比如 18 个月填 1.5。</em>\n  </div>\n  <div class=\"card res\">\n    <h2>增长率</h2>\n    <div class=\"big\"><span class=\"k\">年化增速（CAGR）</span><strong id=\"cg-big\">—</strong></div>\n    <ul class=\"kv\">\n      <li><span>总增长</span><b id=\"cg-total\">—</b></li>\n      <li><span>年均增加额</span><b id=\"cg-avg\">—</b></li>\n      <li><span>翻倍所需年数</span><b id=\"cg-double\">—</b></li>\n      <li><span>按此速度 5 年后</span><b id=\"cg-y5\">—</b></li>\n      <li><span>按此速度 10 年后</span><b id=\"cg-y10\">—</b></li>\n      <li><span>降至一半所需年数</span><b id=\"cg-half\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"cg-note\"></p>\n  </div>\n    </div>\n  </section>\n","apportion":"  <section class=\"panel\" id=\"panel-apportion\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>按权重分摊</h2>\n    <label class=\"f\"><span>待分摊总额（元）</span><input id=\"apc-total\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"100\" value=\"1000\"></label>\n    <label class=\"f\"><span>权重（逗号分隔，最多 8 项）</span><input id=\"apc-w\" type=\"text\" inputmode=\"text\" value=\"1,1,1\"></label>\n    <em>口径：权重可以是人数、面积、工时、销售额，用逗号分隔，例如 3,2,2,1；金额精确到分，尾差按「最大余额法」补给小数部分最大的项，保证分完合计等于总额。</em>\n  </div>\n  <div class=\"card res\">\n    <h2>分摊结果</h2>\n    <div class=\"big\"><span class=\"k\">合计校验</span><strong id=\"apc-big\">—</strong></div>\n    <ul class=\"kv\">\n      <li><span>项数</span><b id=\"apc-n\">—</b></li>\n      <li><span>权重合计</span><b id=\"apc-wsum\">—</b></li>\n      <li><span>未分摊尾差</span><b id=\"apc-diff\">—</b></li>\n      <li><span>差额最大的一笔</span><b id=\"apc-max\">—</b></li>\n    </ul>\n    <div class=\"tablebox\"><table><thead><tr><th>序号</th><th>权重</th><th>占比</th><th>分摊金额</th></tr></thead><tbody id=\"apc-body\"></tbody></table></div>\n    <p class=\"hint\" id=\"apc-note\"></p>\n  </div>\n    </div>\n  </section>\n","grossup":"  <section class=\"panel\" id=\"panel-grossup\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>税后反推税前</h2>\n    <label class=\"f\"><span>目标到手月薪（元）</span><input id=\"gu-net\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"20000\"></label>\n    <label class=\"f\"><span>个人社保公积金比例（%）</span><input id=\"gu-rate\" type=\"number\" inputmode=\"decimal\" min=\"0\" max=\"60\" step=\"0.5\" value=\"17.5\"></label>\n    <label class=\"f\"><span>专项附加扣除（元/月）</span><input id=\"gu-spec\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"2000\"></label>\n    <label class=\"f\"><span>起征点（元/月）</span><input id=\"gu-thr\" type=\"number\" inputmode=\"decimal\" min=\"0\" step=\"500\" value=\"5000\"></label>\n    <em>口径：按月度累计预扣的税率表算，社保按税前×比例（各地有上下限，这里不设）；反推用二分法，结果四舍五入到分后可能差几毛钱。</em>\n  </div>\n  <div class=\"card res\">\n    <h2>倒推结果</h2>\n    <div class=\"big\"><span class=\"k\">税前月薪</span><strong id=\"gu-big\">—</strong></div>\n    <ul class=\"kv\">\n      <li><span>社保公积金（个人）</span><b id=\"gu-si\">—</b></li>\n      <li><span>个人所得税</span><b id=\"gu-tax\">—</b></li>\n      <li><span>税负率（税/税前）</span><b id=\"gu-tr\">—</b></li>\n      <li><span>年到手 / 年税前</span><b id=\"gu-year\">—</b></li>\n      <li><span>年薪口径个税合计</span><b id=\"gu-ytax\">—</b></li>\n      <li><span>单位总成本（含单位社保 25%）</span><b id=\"gu-cost\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"gu-note\"></p>\n  </div>\n    </div>\n  </section>\n","datemath":"  <section class=\"panel\" id=\"panel-datemath\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>起始日期</span>\n      <input id=\"dtm-date\" type=\"date\" value=\"2026-01-31\">\n    </label>\n    <label class=\"f\">\n      <span>加减月数（负数为往前）</span>\n      <input id=\"dtm-months\" type=\"number\" inputmode=\"numeric\" step=\"1\" value=\"3\">\n    </label>\n    <label class=\"f\">\n      <span>再加减天数</span>\n      <input id=\"dtm-days\" type=\"number\" inputmode=\"numeric\" step=\"1\" value=\"0\">\n      <em>合同「3 个月后」按对日算；到期日遇法定节假日顺延要自己再调</em>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">结果日期</span><strong id=\"dtm-big\">—</strong><span class=\"unit\">日</span></div>\n    <ul class=\"kv\">\n      <li><span>星期</span><b id=\"dtm-week\">—</b></li>\n      <li><span>与起始相隔</span><b id=\"dtm-gap\">—</b></li>\n      <li><span>月末对日</span><b id=\"dtm-rule\">—</b></li>\n      <li><span>当年第几天</span><b id=\"dtm-doy\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"dtm-note\"></p>\n  </div>\n    </div>\n  </section>\n","pct3":"  <section class=\"panel\" id=\"panel-pct3\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>基数 A（元）</span>\n      <input id=\"pct-a\" type=\"number\" inputmode=\"decimal\" step=\"1000\" value=\"1000000\">\n    </label>\n    <label class=\"f\">\n      <span>比较数 B（元）</span>\n      <input id=\"pct-b\" type=\"number\" inputmode=\"decimal\" step=\"1000\" value=\"1120000\">\n    </label>\n    <label class=\"f\">\n      <span>百分比 1（%）</span>\n      <input id=\"pct-p1\" type=\"number\" inputmode=\"decimal\" step=\"0.1\" value=\"30\">\n    </label>\n    <label class=\"f\">\n      <span>百分比 2（%）</span>\n      <input id=\"pct-p2\" type=\"number\" inputmode=\"decimal\" step=\"0.1\" value=\"33\">\n      <em>百分比之间只能相减出「百分点」，不能相除当增幅</em>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">B 相对 A 的增幅</span><strong id=\"pct-big\">—</strong><span class=\"unit\">%</span></div>\n    <ul class=\"kv\">\n      <li><span>差额（B − A）</span><b id=\"pct-diff\">—</b></li>\n      <li><span>B 占 A 的比例</span><b id=\"pct-share\">—</b></li>\n      <li><span>A 占 B 的比例</span><b id=\"pct-share2\">—</b></li>\n      <li><span>两个百分比的差</span><b id=\"pct-pp\">—</b></li>\n      <li><span>百分比的相对变化</span><b id=\"pct-rel\">—</b></li>\n      <li><span>换算示例</span><b id=\"pct-demo\">—</b></li>\n    </ul>\n    <p class=\"hint\" id=\"pct-note\"></p>\n  </div>\n    </div>\n  </section>\n","xlhelp":"  <section class=\"panel\" id=\"panel-xlhelp\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>怎么用</h2>\n    <ul class=\"kv\">\n      <li><span>单元格引用</span><b>A1 相对 · $A$1 绝对 · A$1 锁行</b></li>\n      <li><span>区域</span><b>A1:A100 · 整列 A:A · 表名 表1[列名]</b></li>\n      <li><span>报错速查</span><b>#N/A 没找到 · #REF! 引用被删 · #DIV/0! 除零 · #VALUE! 类型不对</b></li>\n      <li><span>WPS</span><b>XLOOKUP/LET 新版支持，老旧版本用 INDEX+MATCH 兜底</b></li>\n    </ul>\n    <p class=\"hint\">公式只是工具，先想清楚「按什么键匹配、要第几列、找不到怎么办」这三件事，写出来基本不会错。</p>\n  </div>\n  <div class=\"card res\">\n    <h2>常用公式</h2>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th class=\"tal\">场景</th><th class=\"tal\">公式</th></tr></thead>\n        <tbody id=\"xl-body\"></tbody>\n      </table>\n    </div>\n  </div>\n    </div>\n  </section>\n","csvrecon":"  <section class=\"panel\" id=\"panel-csvrecon\">\n    <div class=\"cols\">\n  <div class=\"card\">\n    <h2>输入</h2>\n    <label class=\"f\">\n      <span>账面金额（一行一个，可粘贴）</span>\n      <textarea id=\"rk-book\" rows=\"5\">12000\n3500.5\n8800\n-1500</textarea>\n    </label>\n    <label class=\"f\">\n      <span>银行流水金额（一行一个）</span>\n      <textarea id=\"rk-bank\" rows=\"5\">12000\n3500.5\n8800\n-1500\n260</textarea>\n    </label>\n    <label class=\"f\">\n      <span>允许误差（元）</span>\n      <input id=\"rk-tol\" type=\"number\" inputmode=\"decimal\" step=\"0.01\" value=\"0.01\">\n      <em>支持负数、逗号和货币符号，会自动清洗；同金额多笔按次数配对</em>\n    </label>\n  </div>\n  <div class=\"card res\">\n    <h2>结果</h2>\n    <div class=\"big\"><span class=\"k\">合计差额（流水 − 账面）</span><strong id=\"rk-big\">—</strong><span class=\"unit\">元</span></div>\n    <ul class=\"kv\">\n      <li><span>账面</span><b id=\"rk-booksum\">—</b></li>\n      <li><span>流水</span><b id=\"rk-banksum\">—</b></li>\n      <li><span>未匹配笔数</span><b id=\"rk-unmatch\">—</b></li>\n      <li><span>未匹配合计</span><b id=\"rk-unsum\">—</b></li>\n    </ul>\n    <div class=\"tablebox\">\n      <table>\n        <thead><tr><th class=\"tal\">未匹配</th><th>金额</th></tr></thead>\n        <tbody id=\"rk-body\"></tbody>\n      </table>\n    </div>\n    <p class=\"hint\" id=\"rk-note\"></p>\n  </div>\n    </div>\n  </section>\n"};
export default { numwords: calcNumWords, duedate: calcDueDate, workday: calcWorkDay, cagr: calcCagr, apportion: calcApportion, grossup: calcGrossUp, snaps: calcSnaps, datemath: calcDatemath, pct3: calcPct3, xlhelp: calcXlHelp, csvrecon: calcCsvRecon };
