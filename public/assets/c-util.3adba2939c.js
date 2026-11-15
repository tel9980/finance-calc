var L=Object.defineProperty;var f=(t,a)=>L(t,"name",{value:a,configurable:!0});const{$:n,BACKUP_KEY:en,BUILD_TAG:sn,CAT_KEY:ln,CAT_LABEL:pn,CHUNK_FILES:dn,CHUNK_OF:on,CMP_KEY:rn,CORE_CALC:cn,CURS:un,DEFERRED_TAPS:bn,DEMO_SAVED:vn,DIVISOR:hn,EDITED:fn,ERR_BOX:mn,FAV_KEY:gn,FIELDS:wn,FIRST_ACTIVATE:yn,FREQ:Cn,FREQ_KEY:xn,INSTALL_HIDE_KEY:En,KEY:kn,LAST_KEY:Sn,MONTH_CATS:Tn,MONTH_TABLE:K,NEXT_OF:Mn,PALETTE_EL:An,PENDING_PARAMS:_n,PRE_KEY:Dn,QUOTA_WARNED:Wn,RECENT_KEY:Fn,SAVE_TIMER:Nn,SCHEMA_KEY:Pn,SCHEMA_VERSION:Rn,SEARCH_KEY:Ln,SNAP_DROP_SEEN:Kn,SNAP_KEY:Yn,SNAP_MAX:In,SNAP_PICK:On,STORED:Bn,TABS:Hn,TAB_NATURAL:Un,THEME_KEY:Gn,TOAST_EL:Vn,TODAYBAR_KEY:Xn,UNITS:Qn,WF_ARCH_KEY:zn,WF_AUTO_IDX:$n,WF_AUTO_LIST:qn,WF_AUTO_STEP:Jn,WF_AUTO_TIMER:jn,WF_CUSTNAME_KEY:Zn,WF_CUST_KEY:nt,WF_CUST_NAME:tt,WF_DONE:at,WF_EDIT:et,WF_EDIT_KEY:st,WF_KEY:lt,WF_LAST:it,WF_LEGACY:pt,WF_MAN_KEY:dt,WF_MD:ot,WF_MD_FIELDS:rt,WF_MD_KEY:ct,WF_MD_LINKS:ut,WF_META_KEY:bt,WF_MONTH_KEY:vt,WF_NOTE_KEY:ht,WF_NOTIFIED_KEY:ft,WF_NOTIFY_KEY:mt,WF_PATHS:gt,WF_ROLE_KEY:wt,WF_ROLE_READY:yt,WF_SKIP_KEY:Ct,WF_TASK_KEY:xt,WF_TEMPLATES:Et,XL_ROWS:Y,YEAR_TABLE:kt,_onPanels:St,a11yTouch:Tt,activate:Mt,addMonths:I,annuityPV:At,annuityPayment:_t,applyFilter:Dt,applyParams:Wt,applyStoredTo:Ft,applyWfTpl:Nt,backupAgeDays:Pt,bindWfDnd:Rt,bindWfInline:Lt,bizAdd:D,bonusSoloTax:Kt,buildLoanSchedule:Yt,buildShare:It,buildTabBadges:Ot,bumpFreq:Bt,calcLoan:Ht,calcMap:Ut,calcWorkflow:Gt,clearWfMan:Vt,closePalette:Xt,cmpTabName:Qt,cnUpper:O,combineTax:zt,convertTemp:$t,copyText:qt,cumulativeTax:Jt,curCat:jt,currentSnap:Zt,demoFill:na,demoHint:ta,diagText:aa,dlJson:ea,doInstall:sa,doPrint:la,drawMonthCats:ia,drawMonthStack:pa,drawReportCharts:da,drawRpMini:oa,drawnMonthlyChart:ra,drawnYearChart:ca,enhanceNums:ua,enhancePanelUi:ba,ensureChunk:va,evalExpr:ha,favList:fa,fillCmpMod:ma,fillMonthGrid:ga,fillUnits:wa,flash:ya,flushParams:Ca,flushSave:xa,fmt:u,fmtAt:Ea,fmtDate:S,fx:ka,gauss:Sa,getWfCust:Ta,getWfDone:Ma,getWfMan:Aa,getWfMeta:_a,getWfNotes:Da,getWfSkip:Wa,hashTarget:Fa,installEvt:Na,installHintHide:Pa,installHintOff:Ra,iosInstallTip:La,iosLike:Ka,isFav:Ya,lastName:Ia,leftAfter:Oa,linkTo:Ba,loadCmpA:Ha,loadSnaps:Ua,loadWfArch:Ga,loadWfCust:Va,loadWfDone:Xa,loadWfEdit:Qa,loadWfMan:za,loadWfMeta:$a,loadWfNotes:qa,loadWfSkip:Ja,loadWfTask:ja,loanRows:Za,makeSnap:ne,markBackup:te,markBadInputs:ae,matchQ:ee,money:g,monthToDate:se,monthlyIRR:le,months:ie,npvDiff:pe,num:c,numBlur:de,numFocus:oe,numInput:re,numKey:ce,numOf:ue,openPalette:be,orderTabsForQuery:ve,palKey:he,panelEls:fe,panelParams:me,parseAmounts:P,parseDate:T,parseNum:ge,pct:C,percentile:we,plRank:ye,plScoreCov:Ce,plScoreDsr:xe,plScoreEmg:Ee,plScoreLev:ke,plScoreSave:Se,prePanels:Te,prefetchAllChunks:Me,presets:Ae,printCover:_e,pushRecent:De,pushSearch:We,pwaStandalone:Fe,quickOf:Ne,rateOf:Pe,readJsonFile:Re,readMonthGrid:Le,recentList:Ke,recordWf:Ye,refreshCounts:Ie,refreshTableTools:Oe,refreshTrackMods:B,refreshWfBadge:Be,renderLoanTable:He,renderNext:Ue,renderPalette:Ge,renderPresets:Ve,renderSearchHist:Xe,renderSnapCompare:H,renderSnapList:U,renderTodayBar:Qe,renderTrack:ze,renderWfTpl:$e,rentBuyAt:qe,restore:Je,runCalc:je,runDeferredTaps:Ze,save:ns,saveCmpA:ts,saveFav:as,savePresets:es,saveSnaps:ss,saveWfCust:ls,savedCat:is,schemaInit:ps,schemaMigrate:ds,scrollResultIfDeepLink:os,searchHist:rs,setCat:cs,setSub:us,setTheme:bs,shareCalc:vs,sharePayload:hs,showErrorBox:fs,showInstBar:ms,showUpdateBar:gs,snapNameOf:ws,snapTipText:ys,snapshot:Cs,st0:xs,stamp:Es,startName:ks,syncInstallUi:Ss,tabCatLabel:Ts,tabScore:Ms,tap:As,taxBy:G,toast:_s,toggleWfStep:Ds,trimNum:Ws,unitFor:Fs,updShown:Ns,wfAllPaths:Ps,wfArchiveMonth:Rs,wfArchivePut:Ls,wfAutoNext:Ks,wfAutoStop:Ys,wfAutoWalk:Is,wfBar:Os,wfBindCustQ:Bs,wfBuildHandoff:Hs,wfCarryMissing:Us,wfCarryQuery:Gs,wfCarryWarn:Vs,wfCsvCell:Xs,wfCustNameSave:Qs,wfDayDiff:zs,wfDetailRender:$s,wfEditPath:qs,wfEditReset:Js,wfEditSave:js,wfEditToggle:Zs,wfFillCustSel:nl,wfHandoff:tl,wfHandoffCopy:al,wfHandoffCsv:el,wfHandoffPrint:sl,wfHasAnyData:ll,wfHideStep:il,wfKnownMods:pl,wfLegacyToNew:dl,wfLoad:ol,wfManSave:rl,wfMdHref:cl,wfMdRender:ul,wfMdSave:bl,wfMetaSave:vl,wfMigrateLegacy:hl,wfMonthKey:fl,wfMonthRoll:ml,wfMonthTouch:gl,wfMoveStep:wl,wfNoteSave:yl,wfNotifyCheck:Cl,wfNotifyGranted:xl,wfNotifyPref:El,wfNotifySend:kl,wfNotifySetPref:Sl,wfNotifyStatus:Tl,wfNotifyToggle:Ml,wfOpenInline:Al,wfOpenTasks:_l,wfPad2:Dl,wfPathMods:Wl,wfPlaceInline:Fl,wfPlaceNear:Nl,wfProgress:Pl,wfRenderSummary:Rl,wfRoleSaved:Ll,wfScopedPaths:Kl,wfSet:Yl,wfSkipCurrent:Il,wfSkipSave:Ol,wfStepKey:Bl,wfStepShare:Hl,wfStepState:Ul,wfTaskAdd:Gl,wfTaskBox:Vl,wfTaskDel:Xl,wfTaskPending:Ql,wfTaskSave:zl,wfTaskToggle:$l,wfTodayPick:ql,wfTodayStr:Jl,wfUnhideStep:jl,wfVisiblePaths:Zl,yuan:x,zOf:ni}=window.FC;function V(){var t=c(n("nw-amount"),0),a=c(n("nw-prefix"),0)>=1,s=O(t);n("nw-big").textContent=(t<0?"负":"")+(a?"人民币":"")+s,n("nw-low").textContent="¥"+u(Math.abs(t),2);var l=Math.round(Math.abs(t)*100);n("nw-int").textContent=u(Math.floor(l/100),0)+" 元";var e=Math.floor(l%100/10),p=l%10;n("nw-cent").textContent=e+" 角 "+p+" 分";var i=s.slice(-1);n("nw-rule").textContent=i==="整"?"到元为止写「整」，规范":e>0&&p===0?"有角无分：写「X角整」":"有分：角分都要写，末尾不加「整」",n("nw-warn").textContent=l%100===0&&i!=="整"?"整数金额必须补「整」":"不得用「另」、不得简写、不得涂改",n("nw-note").textContent="凭证和发票的大写栏要求：金额到「元」的末尾写「整」（或「正」），有角无分写「X角整」，有分则角分都写、末尾不加「整」；中间连续的零只写一个「零」，元位为零时写「零元」；不得涂改，错了整张作废重开。"}f(V,"calcNumWords");function X(){var t=T(n("ud-start").value)||new Date,a=Math.max(0,Math.round(c(n("ud-days"),0))),s=c(n("ud-basis"),0)>=1,l=c(n("ud-amt"),0),e=c(n("ud-rate"),0),p=T(n("ud-today").value)||new Date,i=s?D(t,a):new Date(t.getFullYear(),t.getMonth(),t.getDate()+a),d=Math.round((p-i)/864e5);n("ud-big").textContent=S(i),n("ud-state").textContent=d>0?"已逾期 "+d+" 天":d===0?"今天到期":"还有 "+-d+" 天到期",n("ud-over").textContent=d>0?d+" 天":"0 天",n("ud-cycle").textContent=Math.round((p-t)/864e5)+" 天";var o=e/1e4;n("ud-int").textContent=d>0?x(l*o*d):"0.00 元（未逾期）",n("ud-hold").textContent=x(l*o*a)+"（"+u(a,0)+" 天 × "+u(o*100,3)+"%）",n("ud-biz").textContent=s?S(i)+"（就是上面）":S(D(t,a)),n("ud-note").textContent="到期日从「起算日」开始数账期天数，起算日当天不算（次日起算），所以 8/1 开票 + 60 天自然日 = 9/30。逾期利息按「金额 × 日利率 × 逾期天数」算单利，合同没约定罚息时通常按 LPR 或万分之五主张；逾期超过 3 年注意诉讼时效（对账确认单可重新起算）。工作日口径会把周末跳过，法定节假日别忘了自己扣。"}f(X,"calcDueDate");function Q(){for(var t=T(n("wd-a").value)||new Date,a=T(n("wd-b").value)||new Date,s=Math.max(0,Math.round(c(n("wd-hol"),0))),l=Math.max(0,Math.round(c(n("wd-n"),0))),e=Math.round((a-t)/864e5),p=0,i=0,d=e>=0?1:-1,o=1;o<=Math.abs(e);o++){var b=new Date(t.getFullYear(),t.getMonth(),t.getDate()+o*d);b.getDay()===0||b.getDay()===6?p++:i++}var v=Math.max(0,i-s);n("wd-big").textContent=u(v,0),n("wd-cal").textContent=u(Math.abs(e),0)+" 天",n("wd-weekend").textContent=u(p,0)+" 天",n("wd-inc").textContent=u(Math.abs(e)+1,0)+" 天";var m=D(t,l);n("wd-target").textContent=S(m),n("wd-span").textContent=Math.round((m-t)/864e5)+" 天",n("wd-week").textContent=u(Math.abs(e)/7,1)+" 周",n("wd-note").textContent="工作日 = 自然日 − 周末 − 额外非工作日（法定节假日与调休按净额填）。算工期、算审批时限、算「N 个工作日内付款」都用这个；注意「含首尾」比跨度多一天，合同里写「自 X 日起 N 个工作日内」以起算日次日起算。"}f(Q,"calcWorkDay");function z(){var t=c(n("cg-from"),0),a=c(n("cg-to"),0),s=c(n("cg-years"),1)||1;if(t<=0||a<=0){n("cg-big").textContent="—",n("cg-note").textContent="期初值和期末值都要大于 0 才能算年化（跨正负号时年化增速没有意义，用绝对差额看）。";return}var l=a/t-1,e=Math.pow(a/t,1/s)-1;n("cg-big").textContent=C(e,2),n("cg-total").textContent=C(l,2),n("cg-avg").textContent=u((a-t)/s,2),n("cg-double").textContent=e>0?u(Math.log(2)/Math.log(1+e),2)+" 年":"不会翻倍",n("cg-y5").textContent=u(a*Math.pow(1+e,5),2),n("cg-y10").textContent=u(a*Math.pow(1+e,10),2);var p=Math.abs(Math.log(.5)/Math.log(1+e));n("cg-half").textContent=u(p,2)+" 年"+(e>0?"（翻倍用）":"（减半用）"),n("cg-note").textContent="总增长看的是累计幅度，年化（CAGR）才是可比的速度：涨 80% 用 3 年，年化 21.64%，不是 26.67%。「七二法则」估翻倍用 72÷增速%，精确算是 ln2÷ln(1+g)。利润从 −100 到 +100 这种跨零的情况不能算 CAGR。"}f(z,"calcCagr");function $(){for(var t=c(n("apc-total"),0),a=(n("apc-w").value||"").split(/[,，\s]+/).filter(function(E){return E!==""}),s=[],l=0;l<a.length&&l<8;l++){var e=Math.max(0,parseFloat(a[l])||0);s.push(e)}s.length||(s=[1]);for(var p=s.reduce(function(E,k){return E+k},0)||1,i=Math.round(t*100),d=[],o=[],b=0,v=0;v<s.length;v++){var m=i*s[v]/p,r=Math.floor(m);d.push(r),o.push(m-r),b+=r}for(var h=i-b,y=o.map(function(E,k){return k}).sort(function(E,k){return o[k]-o[E]||E-k}),M=0;M<h&&M<y.length;M++)d[y[M]]+=1;for(var W="",A=0,F=0,_=-1,w=0;w<d.length;w++){A+=d[w];var R=i*s[w]/p,N=d[w]-R;N>_&&(_=N,F=w),W+="<tr><td>"+(w+1)+"</td><td>"+u(s[w],2)+"</td><td>"+C(s[w]/p,2)+"</td><td>"+g(d[w]/100)+"</td></tr>"}n("apc-body").innerHTML=W,n("apc-big").textContent=g(A/100)+" / "+g(t,2),n("apc-n").textContent=String(s.length),n("apc-wsum").textContent=u(p,2),n("apc-diff").textContent=g((i-A)/100),n("apc-max").textContent="第 "+(F+1)+" 项（多分 "+g(_/100)+"）",n("apc-note").textContent="分摊最怕「分不完」或「多一分」：先按权重算出小数金额，取整到分后把剩下的分按小数部分从大到小补，这就是最大余额法，也叫尾差调整。总额 1000 元三个人平分，实际是 333.34 / 333.33 / 333.33，不是三个 333.33（那样少 1 分）。费用分摊、收入确认、佣金拆单、合并报表抵销都用得上。"}f($,"calcApportion");function q(){var t=c(n("gu-net"),0),a=Math.max(0,c(n("gu-rate"),0))/100,s=c(n("gu-spec"),0),l=c(n("gu-thr"),5e3);function e(m){var r=m*a,h=G(K,Math.max(0,m-r-l-s));return{si:r,tax:h,net:m-r-h}}f(e,"netOf");for(var p=t,i=Math.max(t*3,1e3),d=0;d<120;d++){var o=(p+i)/2;e(o).net<t?p=o:i=o}var b=Math.round((p+i)/2*100)/100,v=e(b);n("gu-big").textContent=g(b)+" 元",n("gu-si").textContent=x(v.si),n("gu-tax").textContent=x(v.tax),n("gu-tr").textContent=C(v.tax/b,2),n("gu-year").textContent=x(t*12)+" / "+x(b*12),n("gu-ytax").textContent=x(v.tax*12),n("gu-cost").textContent=x(b*1.25),n("gu-note").textContent="招聘谈薪最常被问的一句：「到手 2 万，税前要多少？」按月度预扣表反推，本例税前约 2.60 万，公司实际成本还要加单位社保公积金约 25%。注意：社保有缴费基数上下限（各地不同，这里按工资全额算），年终奖若单独计税会让全年税负不同；谈 offer 时说的「总包」要问清是否含单位社保、是否含年终奖。"}f(q,"calcGrossUp");function J(){U(),H(),B()}f(J,"calcSnaps");function j(){var t=T(n("dtm-date").value),a=Math.round(c(n("dtm-months"),0)),s=Math.round(c(n("dtm-days"),0));if(!t){n("dtm-big").textContent="—",n("dtm-week").textContent="—",n("dtm-gap").textContent="—",n("dtm-rule").textContent="—",n("dtm-doy").textContent="—",n("dtm-note").textContent="起始日期请按 2026-01-31 的格式填写。";return}var l=I(t,a),e=s?new Date(l.getFullYear(),l.getMonth(),l.getDate()+s):l,p=l.getDate()!==t.getDate(),i=Math.round((e.getTime()-t.getTime())/864e5),d=["周日","周一","周二","周三","周四","周五","周六"][e.getDay()],o=Math.round((e-new Date(e.getFullYear(),0,1))/864e5)+1,b=e.getDate()===new Date(e.getFullYear(),e.getMonth()+1,0).getDate();n("dtm-big").textContent=S(e),n("dtm-week").textContent=d,n("dtm-gap").textContent=(i>=0?"+":"")+i+" 天（"+(i/30.44).toFixed(2)+" 个月）",n("dtm-rule").textContent=p?"已按月末截断（"+S(l)+"）":b?"正好落在月末":"按日对日，未截断",n("dtm-doy").textContent="第 "+o+" 天"+(b?"，且是当月最后一天":""),n("dtm-note").textContent="「N 个月后」按对日算：起始日不存在的那天以月末为准（1/31 加 1 个月是 2/28 或 2/29），所以同一个合同写「3 个月」和写「90 天」能差一两天。到期日遇法定节假日、周末是否顺延，要看合同或票据约定，工具不会自动顺延；票据到期日按《票据法》另有规定，别直接套。"}f(j,"calcDatemath");function Z(){var t=c(n("pct-a"),0),a=c(n("pct-b"),0),s=c(n("pct-p1"),0),l=c(n("pct-p2"),0),e=a-t,p=t!==0?e/t:0,i=t!==0?a/t:0,d=a!==0?t/a:0,o=l-s,b=s!==0?o/s:0;n("pct-big").textContent=t!==0?u(p*100,2):"—",n("pct-diff").textContent=g(e)+" 元",n("pct-share").textContent=t!==0?C(i,2):"—",n("pct-share2").textContent=a!==0?C(d,2):"—",n("pct-pp").textContent=u(o,2)+" 个百分点",n("pct-rel").textContent=s!==0?C(b,2):"—",n("pct-demo").textContent="A 每 100 元变成 "+u(t!==0?a/t*100:0,2)+" 元",n("pct-note").textContent="三个东西别混：占比是「部分 ÷ 整体」，增幅是「差额 ÷ 原来的数」，百分点是两个百分数相减的结果。30% 到 33% 是「涨了 3 个百分点」，相对变化是 "+C(b,2)+"，说成「涨了 3%」会差 10 倍。分母为 0 或为负（比如利润由负转正）时，增幅没有意义，直接看绝对差额。"}f(Z,"calcPct3");function nn(){var t=n("xl-body");if(t){var a=f(function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},"esc");t.innerHTML=Y.map(function(s){return'<tr><td class="tal">'+a(s[0])+'</td><td class="tal"><code>'+a(s[1])+"</code></td></tr>"}).join("")}}f(nn,"calcXlHelp");function tn(){var t=P(n("rk-book").value),a=P(n("rk-bank").value),s=Math.abs(c(n("rk-tol"),.01)),l=a.map(function(){return!1}),e=[],p=[];t.forEach(function(r){for(var h=-1,y=0;y<a.length;y++)if(!l[y]&&Math.abs(a[y]-r)<=s){h=y;break}h>=0?l[h]=!0:e.push(r)});for(var i=0;i<a.length;i++)l[i]||p.push(a[i]);var d=t.reduce(function(r,h){return r+h},0),o=a.reduce(function(r,h){return r+h},0),b=o-d,v=e.map(function(r){return["账面有、流水没有",r]}).concat(p.map(function(r){return["流水有、账面没有",r]})),m=v.reduce(function(r,h){return r+h[1]},0);n("rk-big").textContent=u(b,2),n("rk-booksum").textContent=t.length+" 笔 / "+g(d)+" 元",n("rk-banksum").textContent=a.length+" 笔 / "+g(o)+" 元",n("rk-unmatch").textContent=v.length+" 笔（账面缺 "+e.length+" / 流水缺 "+p.length+"）",n("rk-unsum").textContent=g(m)+" 元",n("rk-body").innerHTML=v.length?v.slice(0,30).map(function(r){return'<tr><td class="tal">'+r[0]+"</td><td>"+g(r[1])+"</td></tr>"}).join(""):'<tr><td class="tal" colspan="2">两边的金额全部配对成功</td></tr>',n("rk-note").textContent=v.length===0?"双向金额完全配对。注意：这只证明「金额和笔数对得上」，不等于业务实质对得上——还需要核日期、对方户名、摘要，避免两笔金额相同但业务不同的款项互相抵消。":"未匹配合计 "+g(m)+" 元，与净差额不同是正常的：一正一负两笔未达会互相抵消。先查是不是在途（银行已收未入账、公司已付未扣款），再查手续费、利息、代扣代缴这类「账面没记」的项目，最后才是真正的错账或漏记。同金额多笔按出现顺序配对，所以明细顺序不影响结果。"}f(tn,"calcCsvRecon");export const PANELS={snaps:`  <section class="panel" id="panel-snaps">
    <div class="cols">
      <div class="card">
        <h2>方案快照</h2>
        <p class="hint">在任意模块调好参数，回来点「存当前方案」，就能把不同方案并排比。快照只存在本机，最多 20 条。</p>
        <span class="row"><label class="f"><span>排序</span><select id="snap-sort">
          <option value="new">最新的在前面</option>
          <option value="old">最早的在前</option>
          <option value="mod">按模块分组</option>
          <option value="name">按方案名</option>
        </select></label><label class="f"><span>只看含关键词的方案</span><input id="snap-q" type="search" placeholder="方案名 / 备注 / 模块名"></label></span>
        <p class="btnrow">
          <button class="ghost" type="button" id="snap-cmp">刷新对比</button>
          <button class="ghost" type="button" id="snap-clear">清空全部</button>
          <button class="ghost" type="button" id="snap-export">导出快照 JSON</button>
          <button class="ghost" type="button" id="snap-import">导入快照</button>
          <button class="ghost" type="button" id="snap-backup">整站备份</button>
          <button class="ghost" type="button" id="snap-csv">导出全部参数 CSV</button>
          <button class="ghost" type="button" id="snap-csvin">从 CSV 导入参数</button>
          <input type="file" id="snap-csvfile" accept=".csv,text/csv" hidden>
          <button class="ghost" type="button" id="snap-restore">恢复备份</button>
          <button class="ghost" type="button" id="snap-png">导出对比图 PNG</button>
          <button class="ghost" type="button" id="snap-del-sel">删除选中</button>
          <input type="file" id="snap-file" accept=".json,application/json" hidden>
          <input type="file" id="bak-file" accept=".json,application/json" hidden>
        </p>
        <em>已存 <b id="snap-count">0</b> / 60 个方案。点模块名可以带着当时的参数跳回那个模块继续调；换手机或换浏览器时用「整站备份」把填写值、置顶、预设、快照一起带走。</em>
      </div>
      <div class="card res">
        <h2>快照列表</h2>
        <div class="tablebox">
          <table>
            <thead><tr><th><input type="checkbox" id="snap-all" aria-label="全选"></th><th class="tal">模块</th><th class="tal">方案名</th><th>主结果</th><th>时间</th></tr></thead>
            <tbody id="snap-body"></tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="card res">
      <h2>并排对比（勾选 2–3 个）</h2>
      <div class="tablebox">
        <table>
          <thead><tr><th class="tal">指标</th><th>—</th></tr></thead>
          <tbody id="snap-cmp-body"></tbody>
        </table>
      </div>
      <p class="hint" id="snap-bak-tip"></p>
      <p class="hint" id="snap-note"></p>
    </div>
    <div class="card res">
      <h2>月度跟踪（同一个模块的前后两版）</h2>
      <p class="btnrow">
        <select class="ghost" id="snap-track-mod" aria-label="选择要跟踪的模块"><option value="">先选模块</option></select>
        <button class="ghost" type="button" id="snap-track">生成跟踪表</button>
      </p>
      <div class="tablebox">
        <table>
          <thead><tr><th class="tal">指标</th><th>上一版</th><th>最新一版</th><th>变化</th></tr></thead>
          <tbody id="snap-track-body"></tbody>
        </table>
      </div>
      <p class="hint" id="snap-track-note"></p>
    </div>
  </section>
`,numwords:`  <section class="panel" id="panel-numwords">
    <div class="cols">
  <div class="card">
    <h2>输入金额</h2>
    <label class="f"><span>金额（元）</span><input id="nw-amount" type="number" inputmode="decimal" step="0.01" value="1234567.89"></label>
    <label class="f"><span>是否加「人民币」前缀</span><span class="row"><input id="nw-prefix" type="number" inputmode="numeric" min="0" max="1" step="1" value="1"></span></label>
    <em>口径：填 1 加「人民币」，填 0 不加；小数位超过两位会被四舍五入到分。财务凭证、发票、支票的大写金额栏都按这套规则写。</em>
  </div>
  <div class="card res">
    <h2>大写金额</h2>
    <div class="big"><span class="k">中文大写</span><strong id="nw-big">—</strong></div>
    <ul class="kv">
      <li><span>小写金额</span><b id="nw-low">—</b></li>
      <li><span>整数部分（元）</span><b id="nw-int">—</b></li>
      <li><span>角 / 分</span><b id="nw-cent">—</b></li>
      <li><span>规范写法</span><b id="nw-rule">—</b></li>
      <li><span>常见错误</span><b id="nw-warn">—</b></li>
    </ul>
    <p class="hint" id="nw-note"></p>
  </div>
    </div>
  </section>
`,duedate:`  <section class="panel" id="panel-duedate">
    <div class="cols">
  <div class="card">
    <h2>账期起算与到期</h2>
    <label class="f"><span>开票 / 起算日</span><input id="ud-start" type="date" value="2026-08-01"></label>
    <label class="f"><span>账期天数</span><input id="ud-days" type="number" inputmode="numeric" min="0" step="1" value="60"></label>
    <label class="f"><span>账期口径</span><span class="row"><input id="ud-basis" type="number" inputmode="numeric" min="0" max="1" step="1" value="0"></span></label>
    <label class="f"><span>应收金额（元）</span><input id="ud-amt" type="number" inputmode="decimal" min="0" step="10000" value="100000"></label>
    <label class="f"><span>逾期日利率（万分之）</span><input id="ud-rate" type="number" inputmode="decimal" min="0" step="0.5" value="5"></label>
    <label class="f"><span>对照日（算逾期用）</span><input id="ud-today" type="date" value="2026-11-10"></label>
    <em>口径：账期口径填 0 = 自然日，1 = 工作日（跳过周六日，不含法定节假日，需自己补）；日利率按万分之填，5 就是 0.05%/天（年化 18.25%）。</em>
  </div>
  <div class="card res">
    <h2>到期与逾期</h2>
    <div class="big"><span class="k">到期日</span><strong id="ud-big">—</strong></div>
    <ul class="kv">
      <li><span>状态</span><b id="ud-state">—</b></li>
      <li><span>逾期天数</span><b id="ud-over">—</b></li>
      <li><span>回款周期（自起算日）</span><b id="ud-cycle">—</b></li>
      <li><span>逾期利息</span><b id="ud-int">—</b></li>
      <li><span>资金占用成本（至到期日）</span><b id="ud-hold">—</b></li>
      <li><span>工作日口径到期日</span><b id="ud-biz">—</b></li>
    </ul>
    <p class="hint" id="ud-note"></p>
  </div>
    </div>
  </section>
`,workday:`  <section class="panel" id="panel-workday">
    <div class="cols">
  <div class="card">
    <h2>工作日与日期差</h2>
    <label class="f"><span>起始日</span><input id="wd-a" type="date" value="2026-11-10"></label>
    <label class="f"><span>结束日</span><input id="wd-b" type="date" value="2026-12-10"></label>
    <label class="f"><span>期间额外非工作日（天）</span><input id="wd-hol" type="number" inputmode="numeric" min="0" step="1" value="0"></label>
    <label class="f"><span>从起始日顺延（工作日）</span><input id="wd-n" type="number" inputmode="numeric" min="0" step="1" value="10"></label>
    <em>口径：工作日只跳过周六日，法定节假日请填在「额外非工作日」里（含调休，按净额填）。结束日不计入跨度天数，与「30 天后」的算法一致。</em>
  </div>
  <div class="card res">
    <h2>天数</h2>
    <div class="big"><span class="k">工作日</span><strong id="wd-big">—</strong><span class="unit">天</span></div>
    <ul class="kv">
      <li><span>自然日</span><b id="wd-cal">—</b></li>
      <li><span>其中周末</span><b id="wd-weekend">—</b></li>
      <li><span>含首尾天数</span><b id="wd-inc">—</b></li>
      <li><span>顺延结果日</span><b id="wd-target">—</b></li>
      <li><span>顺延含周末共</span><b id="wd-span">—</b></li>
      <li><span>折算周数</span><b id="wd-week">—</b></li>
    </ul>
    <p class="hint" id="wd-note"></p>
  </div>
    </div>
  </section>
`,cagr:`  <section class="panel" id="panel-cagr">
    <div class="cols">
  <div class="card">
    <h2>增幅与年化</h2>
    <label class="f"><span>期初值</span><input id="cg-from" type="number" inputmode="decimal" step="1" value="100"></label>
    <label class="f"><span>期末值</span><input id="cg-to" type="number" inputmode="decimal" step="1" value="180"></label>
    <label class="f"><span>间隔年数</span><input id="cg-years" type="number" inputmode="decimal" min="0.01" step="0.5" value="3"></label>
    <em>口径：期初期末可以是收入、利润、人数、股价，单位一致就行。年数按 12 个月 = 1 年折算，比如 18 个月填 1.5。</em>
  </div>
  <div class="card res">
    <h2>增长率</h2>
    <div class="big"><span class="k">年化增速（CAGR）</span><strong id="cg-big">—</strong></div>
    <ul class="kv">
      <li><span>总增长</span><b id="cg-total">—</b></li>
      <li><span>年均增加额</span><b id="cg-avg">—</b></li>
      <li><span>翻倍所需年数</span><b id="cg-double">—</b></li>
      <li><span>按此速度 5 年后</span><b id="cg-y5">—</b></li>
      <li><span>按此速度 10 年后</span><b id="cg-y10">—</b></li>
      <li><span>降至一半所需年数</span><b id="cg-half">—</b></li>
    </ul>
    <p class="hint" id="cg-note"></p>
  </div>
    </div>
  </section>
`,apportion:`  <section class="panel" id="panel-apportion">
    <div class="cols">
  <div class="card">
    <h2>按权重分摊</h2>
    <label class="f"><span>待分摊总额（元）</span><input id="apc-total" type="number" inputmode="decimal" min="0" step="100" value="1000"></label>
    <label class="f"><span>权重（逗号分隔，最多 8 项）</span><input id="apc-w" type="text" inputmode="text" value="1,1,1"></label>
    <em>口径：权重可以是人数、面积、工时、销售额，用逗号分隔，例如 3,2,2,1；金额精确到分，尾差按「最大余额法」补给小数部分最大的项，保证分完合计等于总额。</em>
  </div>
  <div class="card res">
    <h2>分摊结果</h2>
    <div class="big"><span class="k">合计校验</span><strong id="apc-big">—</strong></div>
    <ul class="kv">
      <li><span>项数</span><b id="apc-n">—</b></li>
      <li><span>权重合计</span><b id="apc-wsum">—</b></li>
      <li><span>未分摊尾差</span><b id="apc-diff">—</b></li>
      <li><span>差额最大的一笔</span><b id="apc-max">—</b></li>
    </ul>
    <div class="tablebox"><table><thead><tr><th>序号</th><th>权重</th><th>占比</th><th>分摊金额</th></tr></thead><tbody id="apc-body"></tbody></table></div>
    <p class="hint" id="apc-note"></p>
  </div>
    </div>
  </section>
`,grossup:`  <section class="panel" id="panel-grossup">
    <div class="cols">
  <div class="card">
    <h2>税后反推税前</h2>
    <label class="f"><span>目标到手月薪（元）</span><input id="gu-net" type="number" inputmode="decimal" min="0" step="500" value="20000"></label>
    <label class="f"><span>个人社保公积金比例（%）</span><input id="gu-rate" type="number" inputmode="decimal" min="0" max="60" step="0.5" value="17.5"></label>
    <label class="f"><span>专项附加扣除（元/月）</span><input id="gu-spec" type="number" inputmode="decimal" min="0" step="500" value="2000"></label>
    <label class="f"><span>起征点（元/月）</span><input id="gu-thr" type="number" inputmode="decimal" min="0" step="500" value="5000"></label>
    <em>口径：按月度累计预扣的税率表算，社保按税前×比例（各地有上下限，这里不设）；反推用二分法，结果四舍五入到分后可能差几毛钱。</em>
  </div>
  <div class="card res">
    <h2>倒推结果</h2>
    <div class="big"><span class="k">税前月薪</span><strong id="gu-big">—</strong></div>
    <ul class="kv">
      <li><span>社保公积金（个人）</span><b id="gu-si">—</b></li>
      <li><span>个人所得税</span><b id="gu-tax">—</b></li>
      <li><span>税负率（税/税前）</span><b id="gu-tr">—</b></li>
      <li><span>年到手 / 年税前</span><b id="gu-year">—</b></li>
      <li><span>年薪口径个税合计</span><b id="gu-ytax">—</b></li>
      <li><span>单位总成本（含单位社保 25%）</span><b id="gu-cost">—</b></li>
    </ul>
    <p class="hint" id="gu-note"></p>
  </div>
    </div>
  </section>
`,datemath:`  <section class="panel" id="panel-datemath">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>起始日期</span>
      <input id="dtm-date" type="date" value="2026-01-31">
    </label>
    <label class="f">
      <span>加减月数（负数为往前）</span>
      <input id="dtm-months" type="number" inputmode="numeric" step="1" value="3">
    </label>
    <label class="f">
      <span>再加减天数</span>
      <input id="dtm-days" type="number" inputmode="numeric" step="1" value="0">
      <em>合同「3 个月后」按对日算；到期日遇法定节假日顺延要自己再调</em>
    </label>
  </div>
  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">结果日期</span><strong id="dtm-big">—</strong><span class="unit">日</span></div>
    <ul class="kv">
      <li><span>星期</span><b id="dtm-week">—</b></li>
      <li><span>与起始相隔</span><b id="dtm-gap">—</b></li>
      <li><span>月末对日</span><b id="dtm-rule">—</b></li>
      <li><span>当年第几天</span><b id="dtm-doy">—</b></li>
    </ul>
    <p class="hint" id="dtm-note"></p>
  </div>
    </div>
  </section>
`,pct3:`  <section class="panel" id="panel-pct3">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>基数 A（元）</span>
      <input id="pct-a" type="number" inputmode="decimal" step="1000" value="1000000">
    </label>
    <label class="f">
      <span>比较数 B（元）</span>
      <input id="pct-b" type="number" inputmode="decimal" step="1000" value="1120000">
    </label>
    <label class="f">
      <span>百分比 1（%）</span>
      <input id="pct-p1" type="number" inputmode="decimal" step="0.1" value="30">
    </label>
    <label class="f">
      <span>百分比 2（%）</span>
      <input id="pct-p2" type="number" inputmode="decimal" step="0.1" value="33">
      <em>百分比之间只能相减出「百分点」，不能相除当增幅</em>
    </label>
  </div>
  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">B 相对 A 的增幅</span><strong id="pct-big">—</strong><span class="unit">%</span></div>
    <ul class="kv">
      <li><span>差额（B − A）</span><b id="pct-diff">—</b></li>
      <li><span>B 占 A 的比例</span><b id="pct-share">—</b></li>
      <li><span>A 占 B 的比例</span><b id="pct-share2">—</b></li>
      <li><span>两个百分比的差</span><b id="pct-pp">—</b></li>
      <li><span>百分比的相对变化</span><b id="pct-rel">—</b></li>
      <li><span>换算示例</span><b id="pct-demo">—</b></li>
    </ul>
    <p class="hint" id="pct-note"></p>
  </div>
    </div>
  </section>
`,xlhelp:`  <section class="panel" id="panel-xlhelp">
    <div class="cols">
  <div class="card">
    <h2>怎么用</h2>
    <ul class="kv">
      <li><span>单元格引用</span><b>A1 相对 · $A$1 绝对 · A$1 锁行</b></li>
      <li><span>区域</span><b>A1:A100 · 整列 A:A · 表名 表1[列名]</b></li>
      <li><span>报错速查</span><b>#N/A 没找到 · #REF! 引用被删 · #DIV/0! 除零 · #VALUE! 类型不对</b></li>
      <li><span>WPS</span><b>XLOOKUP/LET 新版支持，老旧版本用 INDEX+MATCH 兜底</b></li>
    </ul>
    <p class="hint">公式只是工具，先想清楚「按什么键匹配、要第几列、找不到怎么办」这三件事，写出来基本不会错。</p>
  </div>
  <div class="card res">
    <h2>常用公式</h2>
    <div class="tablebox">
      <table>
        <thead><tr><th class="tal">场景</th><th class="tal">公式</th></tr></thead>
        <tbody id="xl-body"></tbody>
      </table>
    </div>
  </div>
    </div>
  </section>
`,csvrecon:`  <section class="panel" id="panel-csvrecon">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>账面金额（一行一个，可粘贴）</span>
      <textarea id="rk-book" rows="5">12000
3500.5
8800
-1500</textarea>
    </label>
    <label class="f">
      <span>银行流水金额（一行一个）</span>
      <textarea id="rk-bank" rows="5">12000
3500.5
8800
-1500
260</textarea>
    </label>
    <label class="f">
      <span>允许误差（元）</span>
      <input id="rk-tol" type="number" inputmode="decimal" step="0.01" value="0.01">
      <em>支持负数、逗号和货币符号，会自动清洗；同金额多笔按次数配对</em>
    </label>
  </div>
  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">合计差额（流水 − 账面）</span><strong id="rk-big">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>账面</span><b id="rk-booksum">—</b></li>
      <li><span>流水</span><b id="rk-banksum">—</b></li>
      <li><span>未匹配笔数</span><b id="rk-unmatch">—</b></li>
      <li><span>未匹配合计</span><b id="rk-unsum">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th class="tal">未匹配</th><th>金额</th></tr></thead>
        <tbody id="rk-body"></tbody>
      </table>
    </div>
    <p class="hint" id="rk-note"></p>
  </div>
    </div>
  </section>
`};export default{numwords:V,duedate:X,workday:Q,cagr:z,apportion:$,grossup:q,snaps:J,datemath:j,pct3:Z,xlhelp:nn,csvrecon:tn};
