var q=Object.defineProperty;var _=(a,i)=>q(a,"name",{value:i,configurable:!0});const{$:n,BACKUP_KEY:z,BUILD_TAG:X,CAT_KEY:j,CAT_LABEL:J,CHUNK_FILES:$,CHUNK_OF:Z,CMP_KEY:nn,CORE_CALC:an,CURS:tn,DEFERRED_TAPS:en,DEMO_SAVED:sn,DIVISOR:ln,EDITED:pn,ERR_BOX:rn,FAV_KEY:dn,FIELDS:cn,FIRST_ACTIVATE:mn,FREQ:on,FREQ_KEY:bn,INSTALL_HIDE_KEY:un,KEY:vn,LAST_KEY:hn,MONTH_CATS:fn,MONTH_TABLE:xn,NEXT_OF:Cn,PALETTE_EL:yn,PENDING_PARAMS:gn,PRE_KEY:Mn,QUOTA_WARNED:wn,RECENT_KEY:Tn,SAVE_TIMER:En,SCHEMA_KEY:Fn,SCHEMA_VERSION:Sn,SEARCH_KEY:_n,SNAP_DROP_SEEN:An,SNAP_KEY:kn,SNAP_MAX:qn,SNAP_PICK:In,STORED:Rn,TABS:Ln,TAB_NATURAL:Nn,THEME_KEY:Wn,TOAST_EL:Pn,TODAYBAR_KEY:On,UNITS:Bn,WF_ARCH_KEY:Hn,WF_AUTO_IDX:Dn,WF_AUTO_LIST:Kn,WF_AUTO_STEP:Yn,WF_AUTO_TIMER:Un,WF_CUSTNAME_KEY:Vn,WF_CUST_KEY:Gn,WF_CUST_NAME:Qn,WF_DONE:zn,WF_EDIT:Xn,WF_EDIT_KEY:jn,WF_KEY:Jn,WF_LAST:$n,WF_LEGACY:Zn,WF_MAN_KEY:na,WF_MD:aa,WF_MD_FIELDS:ta,WF_MD_KEY:ea,WF_MD_LINKS:ia,WF_META_KEY:sa,WF_MONTH_KEY:la,WF_NOTE_KEY:pa,WF_NOTIFIED_KEY:ra,WF_NOTIFY_KEY:da,WF_PATHS:ca,WF_ROLE_KEY:ma,WF_ROLE_READY:oa,WF_SKIP_KEY:ba,WF_TASK_KEY:ua,WF_TEMPLATES:va,XL_ROWS:ha,YEAR_TABLE:fa,_onPanels:xa,a11yTouch:Ca,activate:ya,addMonths:ga,annuityPV:Ma,annuityPayment:wa,applyFilter:Ta,applyParams:Ea,applyStoredTo:Fa,applyWfTpl:Sa,backupAgeDays:_a,bindWfDnd:Aa,bindWfInline:ka,bizAdd:qa,bonusSoloTax:Ia,buildLoanSchedule:Ra,buildShare:La,buildTabBadges:Na,bumpFreq:Wa,calcLoan:Pa,calcMap:Oa,calcWorkflow:Ba,checkInputs:Ha,clearWfMan:Da,closePalette:Ka,cmpTabName:Ya,cnUpper:Ua,combineTax:Va,convertTemp:Ga,copyText:Qa,cumulativeTax:za,curCat:Xa,currentSnap:ja,demoFill:Ja,demoHint:$a,diagText:Za,dlJson:nt,doInstall:at,doPrint:tt,drawMonthCats:et,drawMonthStack:it,drawReportCharts:st,drawRpMini:lt,drawnMonthlyChart:pt,drawnYearChart:rt,enhanceNums:dt,enhancePanelUi:ct,ensureChunk:mt,errHuman:ot,evalExpr:bt,favList:ut,fillCmpMod:vt,fillMonthGrid:ht,fillUnits:ft,flash:xt,flushParams:Ct,flushSave:yt,fmt:s,fmtAt:gt,fmtDate:Mt,fx:wt,gauss:Tt,getWfCust:Et,getWfDone:Ft,getWfMan:St,getWfMeta:_t,getWfNotes:At,getWfSkip:kt,hashTarget:qt,inputIssue:It,installEvt:Rt,installHintHide:Lt,installHintOff:Nt,iosInstallTip:Wt,iosLike:Pt,isFav:Ot,lastName:Bt,leftAfter:Ht,linkTo:Dt,loadCmpA:Kt,loadSnaps:Yt,loadWfArch:Ut,loadWfCust:Vt,loadWfDone:Gt,loadWfEdit:Qt,loadWfMan:zt,loadWfMeta:Xt,loadWfNotes:jt,loadWfSkip:Jt,loadWfTask:$t,loanRows:Zt,makeSnap:ne,markBackup:ae,markBadInputs:te,matchQ:ee,money:t,monthToDate:ie,monthlyIRR:se,months:le,npvDiff:pe,num:e,numBlur:re,numFocus:de,numInput:ce,numKey:me,numOf:oe,openPalette:be,orderTabsForQuery:ue,palKey:ve,panelEls:he,panelParams:fe,parseAmounts:xe,parseDate:Ce,parseNum:ye,pct:v,percentile:ge,plRank:Me,plScoreCov:we,plScoreDsr:Te,plScoreEmg:Ee,plScoreLev:Fe,plScoreSave:Se,prePanels:_e,prefetchAllChunks:Ae,presets:ke,printCover:qe,printSheet:Ie,psEsc:Re,psInputs:Le,psNotes:Ne,psResults:We,psText:Pe,pushRecent:Oe,pushSearch:Be,pwaStandalone:He,quickOf:De,rateOf:Ke,readJsonFile:Ye,readMonthGrid:Ue,recentList:Ve,recordWf:Ge,refreshCounts:Qe,refreshTableTools:ze,refreshTrackMods:Xe,refreshWfBadge:je,renderLoanTable:Je,renderNext:$e,renderPalette:Ze,renderPresets:ni,renderSearchHist:ai,renderSnapCompare:ti,renderSnapList:ei,renderTodayBar:ii,renderTrack:si,renderWfTpl:li,rentBuyAt:pi,restore:ri,runCalc:di,runDeferredTaps:ci,save:mi,saveCmpA:oi,saveFav:bi,savePresets:ui,saveSnaps:vi,saveWfCust:hi,savedCat:fi,schemaInit:xi,schemaMigrate:Ci,scrollResultIfDeepLink:yi,searchHist:gi,setCat:Mi,setSub:wi,setTheme:Ti,shareCalc:Ei,sharePayload:Fi,showErrorBox:Si,showInstBar:_i,showUpdateBar:Ai,snapNameOf:ki,snapTipText:qi,snapshot:Ii,st0:Ri,stamp:Li,startName:Ni,syncInstallUi:Wi,tabCatLabel:Pi,tabScore:Oi,tap:Bi,taxBy:Hi,toast:Di,toggleWfStep:Ki,trimNum:Yi,unitFor:Ui,updShown:Vi,wfAllPaths:Gi,wfArchiveMonth:Qi,wfArchivePut:zi,wfAutoNext:Xi,wfAutoStop:ji,wfAutoWalk:Ji,wfBar:$i,wfBindCustQ:Zi,wfBuildHandoff:ns,wfCarryMissing:as,wfCarryQuery:ts,wfCarryWarn:es,wfCsvCell:is,wfCustNameSave:ss,wfDayDiff:ls,wfDetailRender:ps,wfEditPath:rs,wfEditReset:ds,wfEditSave:cs,wfEditToggle:ms,wfFillCustSel:os,wfHandoff:bs,wfHandoffCopy:us,wfHandoffCsv:vs,wfHandoffPrint:hs,wfHasAnyData:fs,wfHideStep:xs,wfKnownMods:Cs,wfLegacyToNew:ys,wfLoad:gs,wfManSave:Ms,wfMdHref:ws,wfMdRender:Ts,wfMdSave:Es,wfMetaSave:Fs,wfMigrateLegacy:Ss,wfMonthKey:_s,wfMonthRoll:As,wfMonthTouch:ks,wfMoveStep:qs,wfNoteSave:Is,wfNotifyCheck:Rs,wfNotifyGranted:Ls,wfNotifyPref:Ns,wfNotifySend:Ws,wfNotifySetPref:Ps,wfNotifyStatus:Os,wfNotifyToggle:Bs,wfOpenInline:Hs,wfOpenTasks:Ds,wfPad2:Ks,wfPathMods:Ys,wfPlaceInline:Us,wfPlaceNear:Vs,wfProgress:Gs,wfRenderSummary:Qs,wfRoleSaved:zs,wfScopedPaths:Xs,wfSet:js,wfSkipCurrent:Js,wfSkipSave:$s,wfStepKey:Zs,wfStepShare:nl,wfStepState:al,wfTaskAdd:tl,wfTaskBox:el,wfTaskDel:il,wfTaskPending:sl,wfTaskSave:ll,wfTaskToggle:pl,wfTodayPick:rl,wfTodayStr:dl,wfUnhideStep:cl,wfVisiblePaths:ml,yuan:A,zOf:ol}=window.FC;function I(){var a=Math.max(0,e(n("be-price"),0)),i=Math.max(0,e(n("be-vc"),0)),c=Math.max(0,e(n("be-fc"),0)),m=n("be-period").value==="year"?"年":"月",u=Math.max(0,e(n("be-target"),0)),p=Math.max(0,e(n("be-qty"),0)),r=a-i,o=a>0?r/a:0,l=r>0?c/r:1/0,b=r>0?(c+u)/r:1/0,d=p*r-c,h=p>0&&isFinite(l)?(p-l)/p:0,C=d!==0?p*r/d:1/0;n("be-bep").textContent=isFinite(l)?Math.ceil(l).toLocaleString("zh-CN"):"—",n("be-cm").textContent=A(r),n("be-cmr").textContent=v(o),n("be-beps").textContent=isFinite(l)?A(l*a):"—",n("be-tq").textContent=isFinite(b)?Math.ceil(b).toLocaleString("zh-CN")+" 件":"—",n("be-ts").textContent=isFinite(b)?A(b*a):"—",n("be-profit").textContent=A(d),n("be-mos").textContent=r>0?v(h):"—",n("be-dol").textContent=r>0&&isFinite(C)?s(C,2)+" 倍":"—";var f=n("be-body");f.innerHTML="";var x=[.6,.8,1,1.2,1.4],y,g,w;for(y=0;y<x.length;y++)g=isFinite(l)?Math.round(l*x[y]):0,w=document.createElement("tr"),w.innerHTML="<td>"+g.toLocaleString("zh-CN")+" 件</td><td>"+t(g*a)+"</td><td>"+t(g*r)+"</td><td>"+t(g*r-c)+"</td>",f.appendChild(w);if(r<=0){n("be-note").textContent="单价不高于单位变动成本（边际贡献 ≤ 0），每卖一件都在贴钱，卖得越多亏得越多，没有保本销量可言。先把单价、料工费（变动成本）或固定成本这三项之一改到边际贡献为正，再回来看保本点。";return}n("be-note").textContent="保本销量 = 固定成本 ÷ 单位边际贡献；目标销量 = （固定成本 + 目标利润）÷ 单位边际贡献。固定成本按"+m+"填写，结果也都是"+m+"口径。安全边际率 = （实际销量 − 保本销量）÷ 实际销量，低于 20% 说明离亏损很近。经营杠杆 = 边际贡献 ÷ 利润，倍数为 3 表示销量降 10%，利润就掉 30%——固定成本越重，杠杆越高。"}_(I,"calcBreakEven");function R(){var a=Math.max(0,e(n("pr-cost"),0)),i=Math.max(0,Math.min(95,e(n("pr-margin"),0)))/100,c=Math.max(0,e(n("pr-vat"),0))/100,m=Math.max(0,Math.min(90,e(n("pr-disc"),0)))/100,u=Math.max(0,e(n("pr-cust"),0)),p=i>=.999?NaN:a/(1-i),r=p*(1+c),o=p-a,l=r*(1-m),b=l/(1+c),d=b-a,h=a*(1+c),C=m>=.999?NaN:p/(1-m)*(1+c);if(n("pr-in").textContent=isFinite(r)?t(r):"—",n("pr-ex").textContent=isFinite(p)?A(p):"—",n("pr-gp").textContent=isFinite(o)?t(o)+" 元 / "+v(i):"—",n("pr-discin").textContent=isFinite(l)?A(l):"—",n("pr-discgp").textContent=isFinite(d)?t(b)+" / "+t(d)+" 元 / "+(b>0?v(d/b):"—"):"—",n("pr-be").textContent=A(h),n("pr-need").textContent=isFinite(C)?A(C):"—",u>.005){var f=u/(1+c),x=f-a;n("pr-custout").textContent=t(x)+" 元 / "+(f>0?v(x/f):"—")+(x<0?"（亏）":"")}else n("pr-custout").textContent="填了客户价再算";for(var y="",g=[0,.03,.05,.08,.1,.15,.2],w=0;w<g.length;w++){var E=g[w],T=r*(1-E),M=T/(1+c),F=M-a;y+="<tr"+(Math.abs(E-m)<.001?' class="c-info"':"")+"><td>"+s(E*100,0)+"%</td><td>"+t(T)+"</td><td>"+t(M)+"</td><td>"+(M>0?v(F/M):"—")+"</td></tr>"}n("pr-body").innerHTML=y,n("pr-note").textContent="毛利率一律按不含税算：售价 = 成本 ÷ (1 − 毛利率)，再乘 (1 + 税率) 得到含税报价。折扣是从含税价上砍的，砍完不含税售价掉得比你想的快——目标毛利 40%，给 5% 折扣就只剩 "+(isFinite(d)&&b>0?v(d/b,1):"—")+"，所以要么报价时预留折扣空间（本例要报 "+(isFinite(C)?t(C):"—")+" 才能折后仍保住 40%），要么把折扣当成让利、明确走审批。另外毛利不等于净利：运费、销售提成、售后成本都要再摊，含税报价还要考虑客户能否接受、同行的含税口径是否一致（有的报不含税价，比价前统一口径）。"}_(R,"calcPricing");function L(){var a=[],i,c,m,u;for(i=1;i<=4;i++)c=Math.max(0,e(n("mm-q"+i),0)),m=Math.max(0,e(n("mm-p"+i),0)),u=Math.max(0,e(n("mm-c"+i),0)),c>0&&m>0&&a.push({name:"产品 "+i,q:c,p:m,c:u,rev:c*m,gp:c*(m-u)});if(!a.length){n("mm-margin").textContent="—",n("mm-total").textContent="填一个销量再算",n("mm-lag").textContent="—",n("mm-neg").textContent="—",n("mm-cut").textContent="—",n("mm-drag").textContent="—",n("mm-worst").textContent="—",n("mm-body").innerHTML="",n("mm-note").textContent="至少给一个产品填销量，才能算加权毛利率。";return}var p=0,r=0;for(i=0;i<a.length;i++)p+=a[i].rev,r+=a[i].gp;var o=p>0?r/p:0,l=[],b=[];for(i=0;i<a.length;i++){var d=a[i].rev>0?a[i].gp/a[i].rev:0;a[i].margin=d,a[i].share=p>0?a[i].rev/p:0,d<o-1e-4&&l.push(a[i].name+"（"+v(d)+"）"),a[i].gp<-.005&&b.push(a[i].name+"（"+v(d)+"，亏 "+t(-a[i].gp)+" 元）")}var h=0,C=0;for(i=0;i<a.length;i++)a[i].gp>=0&&(h+=a[i].rev,C+=a[i].gp);var f=h>0?C/h:0,x=a[0];for(i=1;i<a.length;i++)a[i].rev>x.rev&&(x=a[i]);n("mm-margin").textContent=v(o),n("mm-total").textContent=t(p)+" / "+t(r)+" 元",n("mm-lag").textContent=l.length?l.join("、"):"没有，都在综合毛利率之上",n("mm-neg").textContent=b.length?b.join("、"):"没有负毛利产品",n("mm-cut").textContent=b.length?t(h)+" / "+t(C)+" 元 / "+v(f):"没有要剔的，等于全部",n("mm-drag").textContent=b.length?s((f-o)*100,2)+" 个百分点":"0.00 个百分点",n("mm-worst").textContent=x.name+"（占收入 "+v(x.share)+"，毛利率 "+v(x.margin)+"）"+(x.margin<o-1e-4?"，比综合线还低，是拖后腿的":"，在综合线之上");var y="";for(i=0;i<a.length;i++){var g=a[i];y+="<tr"+(g.gp<-.005?' class="c-soft"':"")+"><td>"+g.name+"</td><td>"+s(g.q,0)+"</td><td>"+t(g.rev)+"</td><td>"+t(g.gp)+"</td><td>"+v(g.margin)+"</td><td>"+v(g.share)+"</td></tr>"}y+="<tr><td>合计</td><td>—</td><td>"+t(p)+"</td><td>"+t(r)+"</td><td>"+v(o)+"</td><td>100.00%</td></tr>",n("mm-body").innerHTML=y,n("mm-note").textContent="综合毛利率是「各产品毛利率按收入加权」，不是简单平均——低毛利产品占比一大，整体就被拖下去，这也是「越卖越忙却越不赚钱」的原因。"+(b.length?"负毛利产品（"+b[0].split("（")[0]+"）每卖一件都在贴钱，要么提价、要么换料降本、要么直接砍掉或改成外购转手。":"")+"注意这里只算毛利：运费、提成、售后、仓储都还在毛利之下，毛利为正不代表净利为正；砍掉一个产品也只省变动成本，固定费用照旧要摊到剩下产品上。"}_(L,"calcMultiMargin");function N(){var a=Math.max(0,e(n("mb-fc"),0)),i=Math.max(0,e(n("mb-target"),0)),c=[[e(n("mb-p1"),0),e(n("mb-v1"),0),Math.max(0,e(n("mb-q1"),0))],[e(n("mb-p2"),0),e(n("mb-v2"),0),Math.max(0,e(n("mb-q2"),0))],[e(n("mb-p3"),0),e(n("mb-v3"),0),Math.max(0,e(n("mb-q3"),0))]],m=0,u=0,p;for(p=0;p<c.length;p++)m+=c[p][0]*c[p][2],u+=(c[p][0]-c[p][1])*c[p][2];var r=m>0?u/m:0,o=u-a,l=r>0?a/r:0,b=m>0?(m-l)/m:0,d=r>0?(a+i)/r:0;n("mb-bep").textContent=t(l)+" 元",n("mb-cmr").textContent=v(r),n("mb-rev").textContent=t(m)+" / "+t(u)+" 元",n("mb-profit").textContent=(o>=0?"+":"")+t(o)+" 元"+(o>=0?"":"（还没保本）"),n("mb-mos").textContent=v(b)+(b<0?"（亏损区，销售额跌在保本点以下）":b<.15?"（很薄，抗跌能力弱）":"（还行）"),n("mb-gap").textContent=l>m?t(l-m)+" 元":"已超过保本点 "+t(m-l)+" 元",n("mb-need").textContent=t(d)+" 元（比现在多卖 "+t(Math.max(0,d-m))+"）",n("mb-lever").textContent=t(1e4)+" 元";var h="",C=["产品 1","产品 2","产品 3"];for(p=0;p<c.length;p++){var f=c[p][0],x=c[p][1],y=c[p][2],g=f*y,w=(f-x)*y,E=m>0?g/m:0,T=a*E,M=w-T,F=f>0?l*E/f:0,S=M<0?' class="c-bad"':"";h+="<tr"+S+"><td>"+C[p]+"</td><td>"+t(g)+"</td><td>"+v(f>0?(f-x)/f:0)+"</td><td>"+t(T)+"</td><td>"+(M>=0?"+":"")+t(M)+"</td><td>"+s(F,0)+"</td></tr>"}n("mb-body").innerHTML=h,n("mb-note").textContent=" 多产品保本先算「加权平均边际贡献率」= 各产品边际贡献之和 ÷ 销售额之和，再用固定成本除以它得到保本销售额。当前 "+t(m)+" 元销售、边际贡献率 "+v(r)+"，保本要 "+t(l)+" 元，所以现在是"+(o>=0?"盈利":"亏损")+" "+t(Math.abs(o))+" 元。 这张表最有用的地方是右下两列：把固定成本按销售结构分摊后，标红的行都是「毛利撑不起自己那份固定成本」的产品，它们的销量越大，公司亏得越多——涨价、砍产或换结构，比整体降本更直接。 注意：① 「保本销量」是按当前销售结构均摊出来的，结构一变要重算；② 固定成本分摊法是管理口径，不是会计准则要求，只用于判断，不影响对外报表；③ 边际贡献率高的产品优先给产能。"}_(N,"calcMpbe");function W(){var a=Math.max(0,e(n("pc-gross"),0)),i=Math.max(0,e(n("pc-si"),0)),c=Math.max(0,e(n("pc-hf"),0)),m=Math.max(0,e(n("pc-tax"),0)),u=Math.max(0,e(n("pc-other"),0)),p=Math.max(0,e(n("pc-act"),0)),r=Math.max(0,e(n("pc-tax2"),0)),o=Math.max(0,e(n("pc-cosi"),0)),l=Math.max(0,e(n("pc-cohf"),0)),b=Math.max(0,e(n("pc-rev"),0)),d=Math.max(1,e(n("pc-head"),1)),h=i+c+m+u,C=a-h,f=p-C,x=m-r,y=o+l,g=a+y,w=b>0?g/b:0,E=g/d;n("pc-net").textContent=t(C)+" 元",n("pc-diff").textContent=Math.abs(f)<.5?"0.00 元（平）":t(f)+" 元（表上多发了）",n("pc-taxdiff").textContent=Math.abs(x)<.5?"0.00 元（一致）":t(x)+" 元"+(x>0?"（表内多扣，要退给员工并更正申报）":"（表内少扣，员工汇算要补税）"),n("pc-ded").textContent=v(a>0?h/a:0)+"（"+t(h)+" 元）",n("pc-co").textContent=t(y)+" 元",n("pc-cost").textContent=t(g)+" 元",n("pc-rate").textContent=v(w)+(w>.3?"（偏高，人力密集行业一般 15–25%）":""),n("pc-avg").textContent=t(E)+" 元/人";var T=Math.abs(f)<.5&&Math.abs(x)<.5;n("pc-verdict").textContent=T?"三项勾稽全平，可以发放":Math.abs(f)>=.5?"实发金额对不上，先查漏项（补发、扣款、个税零头）":"个税与申报数不一致，先对齐再发";var M=[["应发工资",a,1],["个人社保",-i,a>0?i/a:0],["个人公积金",-c,a>0?c/a:0],["个人所得税",-m,a>0?m/a:0],["其他扣款",-u,a>0?u/a:0],["实发工资",C,a>0?C/a:0]],F="",S;for(S=0;S<M.length;S++){var k=M[S][0]==="实发工资"&&Math.abs(f)>=.5?' class="c-warn"':"";F+="<tr"+k+"><td>"+M[S][0]+"</td><td>"+t(M[S][1])+"</td><td>"+v(M[S][2])+"</td></tr>"}n("pc-body").innerHTML=F,n("pc-note").textContent=" 工资表每月只需三处勾稽：① 应发 − 社保 − 公积金 − 个税 − 其他扣款 = 实发（与银行代发文件总额一致）；② 表内个税合计 = 自然人电子税务局申报数；③ 应发 + 单位承担社保公积金 = 用工总成本（进成本费用的就是这个数，不是实发数）。 本月：代扣合计 "+t(h)+" 元占应发 "+v(a>0?h/a:0)+"，用工总成本 "+t(g)+" 元，人工成本率 "+v(w)+"。 常见不平原因：离职补偿、补发上月工资没进表、商保和工会经费挂错科目、公积金基数年度调整只调了一半人、专项附加扣除当月才采集导致个税跳变。社保和个税都是代扣代缴，多扣了必须退，不能留在账上当收入。"}_(W,"calcPayroll");function P(){var a=Math.max(0,e(n("ic-fob"),0)),i=Math.max(0,e(n("ic-frt"),0)),c=Math.max(0,e(n("ic-ins"),0)),m=Math.max(0,e(n("ic-fx"),1)),u=Math.max(0,e(n("ic-duty"),0))/100,p=Math.min(.99,Math.max(0,e(n("ic-cons"),0)/100)),r=Math.max(0,e(n("ic-vat"),0))/100,o=Math.max(0,e(n("ic-port"),0)),l=Math.max(0,e(n("ic-agent"),0)),b=Math.max(1,e(n("ic-qty"),1)),d=(a+i+c)*m,h=d*u,C=(d+h)/(1-p)*p,f=(d+h+C)*r,x=o+l,y=d+h+C+x,g=y+f,w=y/b,E=g/b,T=d>0?(h+C+f)/d:0;n("ic-big").textContent=s(w,2),n("ic-cif").textContent=A(d)+"（"+s(a+i+c,0)+" 美元）",n("ic-dutyv").textContent=A(h)+"（"+v(u,1)+"）",n("ic-consv").textContent=A(C)+(p>0?"（"+v(p,1)+"，价内税，含在完税价里算）":"（不涉及）"),n("ic-vatv").textContent=A(f)+"（拿来抵扣，不进成本）",n("ic-fees").textContent=A(x),n("ic-land").textContent=A(y),n("ic-cash").textContent=A(g)+" / "+t(E)+" 元/件",n("ic-ratio").textContent=v(T,2)+"（其中可抵扣部分 "+v(d>0?f/d:0,2)+"）";for(var M=[["CIF 完税价格",t(d),"（货值＋运费＋保险）× 汇率"],["关税",t(h),v(u,1)+" × CIF"],["消费税",t(C),p>0?"（CIF＋关税）÷(1−税率)×税率":"本笔不涉及"],["进口增值税",t(f),"（CIF＋关税＋消费税）× "+v(r,0)+"，可抵扣"],["港杂 + 代理",t(x),"国内环节费用"],["到岸成本（进存货）",t(y),"不含可抵扣增值税"],["含税现金支出",t(g),"到岸成本 + 进口增值税"],["单位到岸成本",t(w)+" 元/件","到岸成本 ÷ "+s(b,0)+" 件"]],F="",S=0;S<M.length;S++)F+="<tr"+(S===5||S===7?' class="c-info"':"")+'><td class="tal">'+M[S][0]+"</td><td>"+M[S][1]+'</td><td class="tal">'+M[S][2]+"</td></tr>";n("ic-body").innerHTML=F,n("ic-note").textContent="三个容易算错的地方：一是完税价格用 CIF（货值＋运费＋保险），漏了运费关税就少交、被追缴还带滞纳金；二是消费税是价内税，要用「(CIF＋关税)÷(1−消费税率)」倒算，不是直接乘税率；三是进口增值税可以抵扣，它占压的是资金不是成本，报价时算进单价会把价格报高一大截。从付汇到抵扣通常隔一两个月，这段占压资金也要计入真实成本。"}_(P,"calcImportCost");function O(){var a=Math.max(0,e(n("qf-cost"),0)),i=Math.max(1,e(n("qf-qty"),1)),c=Math.max(0,e(n("qf-dyn"),0)),m=Math.max(0,e(n("qf-port"),0)),u=Math.min(.9,Math.max(0,e(n("qf-gm"),0)/100)),p=Math.min(.2,Math.max(0,e(n("qf-comm"),0)/100)),r=Math.max(.01,e(n("qf-fx"),7)),o=Math.max(0,e(n("qf-frt"),0)),l=Math.max(0,e(n("qf-ins"),0)/100),b=(a*i+c+m)/(1-u),d=b/(1-p),h=d*p,C=o*r,f=(d+C)/(1-l),x=f-d-C,y=d-h-a*i-c-m,g=d/i,w=f/i;n("qf-big").textContent=s(w/r,2),n("qf-fob").textContent=t(d)+" 元 / "+t(g)+" 元（"+s(g/r,2)+" 美元）",n("qf-comv").textContent=t(h)+"（"+v(p,1)+"）",n("qf-real").textContent=d>0?v(y/d,2):"—",n("qf-frtv").textContent=t(C)+"（"+s(o,0)+" 美元）",n("qf-insv").textContent=t(x)+"（CIF × "+v(l,2)+" 倒算）",n("qf-cif").textContent=t(f)+" / "+t(w)+" 元（"+s(w/r,2)+" 美元）",n("qf-profit").textContent=t(y/i)+" 元（扣佣金与国内费用后）",n("qf-fxrisk").textContent="FOB 收汇减少 "+t(d/r*.1)+" 元";for(var E=[["FOB 报价",t(d),s(d/r,2)],["减：佣金","−"+t(h),s(h/r,2)],["减：工厂成本","−"+t(a*i),s(a*i/r,2)],["减：国内运费+港杂","−"+t(c+m),s((c+m)/r,2)],["净利",t(y),s(y/r,2)],["CFR 报价（含海运费）",t(d+C),s((d+C)/r,2)],["CIF 报价（含运保费）",t(f),s(f/r,2)]],T="",M=0;M<E.length;M++)T+="<tr"+(M===4||M===6?' class="c-info"':"")+'><td class="tal">'+E[M][0]+"</td><td>"+E[M][1]+"</td><td>"+E[M][2]+"</td></tr>";n("qf-body").innerHTML=T,n("qf-note").textContent="报价是倒推出来的：先算「这批货必须卖多少钱才够目标毛利和覆盖国内费用」，再按条款往上加。FOB 只管到船舷，CFR 加海运费，CIF 再加保险（保险按 CIF 的 "+v(l,2)+" 倒算，不是按 FOB 乘）。两个坑：一是佣金要从报价里倒着加，直接乘会少算；二是目标毛利率是对 FOB 算的，扣掉佣金后实际只有 "+(d>0?v(y/d,2):"—")+"。收汇还要盯汇率，报出去到收款之间每跌 0.1 元，这批货就少收 "+t(d/r*.1)+" 元。"}_(O,"calcQuoteFx");function B(){var a=Math.max(0,e(n("reb-base"),0)),i=Math.min(1,Math.max(0,e(n("reb-gm"),0)/100)),c=[{t:Math.max(0,e(n("reb-t1"),0)),p:Math.max(0,e(n("reb-p1"),0))/100},{t:Math.max(0,e(n("reb-t2"),0)),p:Math.max(0,e(n("reb-p2"),0))/100},{t:Math.max(0,e(n("reb-t3"),0)),p:Math.max(0,e(n("reb-p3"),0))/100}];c.sort(function(E,T){return E.t-T.t});function m(E){for(var T=0,M=0;M<c.length;M++)E>=c[M].t&&(T=c[M].p);return T}_(m,"rateOf");var u=m(a),p=a*i-a*u,r=u>0?"已达 "+v(u,1)+" 档":"未达任何档位（无返利）";n("reb-cur").textContent=r,n("reb-now").textContent=s(a*u,2)+" 万 / "+s(p,2)+" 万元",n("reb-rate").textContent=v(1-u,2)+"（返点即让价）";for(var o="",l=null,b=0;b<c.length;b++){var d=c[b].t,h=c[b].p,C=d*h,f=d*i-C,x=f-p,y=i>h?p/(i-h):1/0,g=d-a,w;a>=d?w="已达成":x>0?w="冲":w="不划算",a<d&&x>0&&(!l||x>l.delta)&&(l={t:d,p:h,delta:x,net:f,need:g,crit:y}),o+="<tr"+(w==="冲"?' class="c-info"':w==="不划算"?' class="c-warn"':"")+"><td>"+s(d,0)+" 万 / "+v(h,1)+"</td><td>"+s(C,2)+"</td><td>"+s(f,2)+"</td><td>"+(x>=0?"+":"")+s(x,2)+"</td><td>"+(isFinite(y)?s(y,2):"无法达成")+'</td><td class="tal">'+w+"</td></tr>"}n("reb-body").innerHTML=o,l?(n("reb-big").textContent=s(l.delta,2),n("reb-pick").textContent=s(l.t,0)+" 万 / "+v(l.p,1)+" 档（净毛利 "+s(l.net,2)+" 万）",n("reb-crit").textContent=isFinite(l.crit)?s(l.crit,2)+" 万元（相当于只需比现在多卖 "+s(l.crit-a,2)+" 万）":"该档返点高于毛利率，越卖越亏",n("reb-advice").textContent=l.crit<=l.t?"只要真能冲到 "+s(l.t,0)+" 万就划算（临界点 "+s(l.crit,2)+" 万低于门槛），可以把返点当促销工具用":"必须先过临界点 "+s(l.crit,2)+" 万才不亏，冲不到门槛还不如不冲"):(n("reb-big").textContent=a*(1-u)>0?"0.00":"—",n("reb-pick").textContent=a>=c[c.length-1].t?"已在最高档，再冲没有增量":"没有值得冲的档位",n("reb-crit").textContent="—",n("reb-advice").textContent="现有档位跳升幅度过大（返点接近甚至超过毛利率），建议把门槛做得更密、跳升更缓"),n("reb-note").textContent="阶梯返利的坑在「全额返」：跨过门槛那一刻，前面已经卖掉的量也一起降价，所以不是「多卖 50 万只让 50 万」，而是全年的销售额都按新档返。判断标准是「净毛利增量为正」——边际贡献（增量销售 × 毛利率）要大于返利增量。本例从 "+s(a,0)+" 万冲到下一档，临界点 "+(l&&isFinite(l.crit)?s(l.crit,2):"—")+" 万；也就是说跨档的代价固定，销量越接近门槛越危险。返利还要注意：开票与返利的税务处理（销售折让需红字发票）、跨年返利的预提、以及客户为了拿返点年底压货次年退货。"}_(B,"calcRebate");function H(){var a=e(n("po-ret"),0),i=e(n("po-np"),0),c=Math.min(1,Math.max(0,e(n("po-share"),0)/100)),m=Math.min(1,Math.max(0,e(n("po-ratio"),0)/100)),u=Math.min(1,Math.max(0,e(n("po-tax"),0)/100)),p=Math.max(0,e(n("po-roe"),0)/100),r=Math.max(0,e(n("po-loan"),0)),o=i*m,l=o*u,b=o*c,d=b*(1-u),h=a+i-o,C=a+i,f=C*p,x=f*c,y=x*(1-u),g=r*u,w=g*.1825;n("po-big").textContent=s(d,2),n("po-div").textContent=s(o,2)+" / "+s(l,2)+" 万元",n("po-sharev").textContent=s(b,2)+" / "+s(d,2)+" 万元",n("po-keep").textContent=s(h,2)+" 万元",n("po-nodiv").textContent=s(C,2)+" / "+s(f,2)+" 万元",n("po-ind").textContent=s(y,2)+" 万元（税前 "+s(x,2)+"，变现还要再交 "+v(u,0)+"）",n("po-risk").textContent=r>0?"借款 "+s(r,2)+" 万元视同分红，补个税 "+s(g,2)+" 万元，滞纳金约 "+s(w,2)+" 万元":"无借款风险";var E=1-.75*(1-u);n("po-alltax").textContent="利润先交 25% 企业所得税，"+(m>0?"分掉的部分再交 "+v(u,0)+"，综合税负 "+v(E,2):"不分红就暂时没有第二个税");for(var T=[["按 "+v(m,0)+" 分红",s(d,2)+" 万元",s(h,2)+" 万元","当年拿现金，交 20% 个税"],["不分红全留存","0",s(C,2)+" 万元","股东间接受益 "+s(y,2)+" 万元（税后口径）"],["股东借款 "+s(r,0)+" 万元不还",s(r,2)+" 万元（借款）","—","视同分红，补税 "+s(g,2)+" 万元"]],M="",F=0;F<T.length;F++)M+="<tr"+(F===2?' class="c-warn"':F===0?' class="c-info"':"")+'><td class="tal">'+T[F][0]+"</td><td>"+T[F][1]+"</td><td>"+T[F][2]+'</td><td class="tal">'+T[F][3]+"</td></tr>";n("po-body").innerHTML=M,n("po-note").textContent="分红是「两道税」：公司先交 25% 企业所得税，利润分到自然人股东手上再交 20%，合起来 "+v(E,2)+"（不是 45%，因为两道税基数不同）。所以「分还是留」本质是让股东拿现金自己投（税后 80%）还是留在公司按 ROE 再投（"+v(p,1)+"，但将来变现还要再交一次）。本例留存的间接价值 "+s(y,2)+" 万元，高于直接分手的 "+s(d,2)+" 万元——前提是公司真能把钱投出这个回报，投不出去（账上趴着买理财）就该分掉。红线：股东借款年末未归还且未用于生产经营，按「利息、股息、红利所得」视同分红补 20% 个税并加收滞纳金；上市公司持股满 1 年免征、1 个月至 1 年减半，非上市不享受。"}_(H,"calcPayout");function D(){var a=Math.max(0,e(n("cm-sales"),0)),i=Math.min(1,Math.max(0,e(n("cm-ret"),0)/100)),c=Math.min(1,Math.max(0,e(n("cm-gm"),0)/100)),m=Math.max(0,e(n("cm-sr"),0))/100,u=Math.max(0,e(n("cm-gr"),0))/100,p=Math.max(0,e(n("cm-achv"),100))/100,r=Math.min(1,Math.max(0,e(n("cm-cash"),100)/100)),o=a*(1-i),l=o*c,b=o*m,d=l*u,h=p<.8?.5:p<1?1:p<1.2?1.2:1.5,C=u>0?m/u:0;n("cm-big").textContent=t(d),n("cm-c1").textContent=A(b),n("cm-gap").textContent=(b-d>=0?"":"销售额法少付 ")+t(Math.abs(b-d))+" 元",n("cm-crit").textContent=v(C,2)+"（毛利率高于它，按毛利提对销售更有利）",n("cm-coeff").textContent=s(h,1)+"（完成率 "+v(p,0)+"）",n("cm-cashout").textContent=t(b*h*r)+" / "+t(d*h*r)+" 元",n("cm-share").textContent=l>0?v(b/l,2):"—",n("cm-base").textContent=A(o)+"（退货 "+v(i,0)+"）";for(var f=[.2,c,.3,.35,.4],x={},y="",g=0;g<f.length;g++){var w=Math.round(f[g]*1e3)/1e3;if(!x[w]){x[w]=1;var E=o*m,T=o*w*u,M=T-E,F=Math.abs(w-c)<5e-4?' class="c-info"':M<0?' class="c-warn"':"";y+="<tr"+F+"><td>"+v(w,0)+"</td><td>"+t(E)+"</td><td>"+t(T)+"</td><td>"+(M>=0?"+":"")+t(M)+"</td></tr>"}}n("cm-body").innerHTML=y,n("cm-note").textContent="按销售额提成的毛病很简单：打折、赊账、卖高毛利还是低毛利，销售拿的钱差不多，所以他会默认选择「最容易签下来」的方式，而那通常是最不赚钱的方式。按毛利提成把这一层对齐了——降价自己吃亏，但销售会开始挑客户、也和公司抢定价权，所以常见做法是「毛利提成为主 + 销售额门槛（完成率系数）保底」。提成按回款发放是最有效的风控，滞销赊账的提成拖着不发，比任何制度都好使。"}_(D,"calcCommission");function K(){var a=e(n("rba-sales"),0),i=e(n("rba-rate"),0)/100,c=e(n("rba-ach"),0)/100,m=e(n("rba-vc"),0)/100,u=e(n("rba-fee"),0),p=e(n("rba-promo"),0),r=e(n("rba-staff"),0),o=a*i*c,l=a-o,b=u+p+r,d=a*(1-m),h=l*(1-m)-b,C=l>0?b/l:0,f=d>0?o/d:0,x=l>0?h/l:0,y=a*i-o;n("rba-big").textContent=t(h),n("rba-reb").textContent=t(o)+" 元（按 "+v(i,1)+" × 达成 "+v(c,0)+" 计提）",n("rba-net").textContent=t(l)+" 元",n("rba-cost").textContent=t(b)+" 元（进场 "+t(u)+" / 促销 "+t(p)+" / 人员 "+t(r)+"）",n("rba-cr").textContent=v(C,2)+"（渠道费用 ÷ 净销售额）",n("rba-rg").textContent=v(f,2)+"（返利 ÷ 毛利 "+t(d)+"）",n("rba-gm").textContent=v(x,2)+"（原来 "+v(1-m,2)+"）",n("rba-full").textContent="若 100% 达成，再多返 "+t(y)+" 元",n("rba-note").textContent="返利属于可变对价：合同签下去就要按期望值（比例 × 达成概率）冲减收入并计提负债，不能等年底客户来结账才认。计提过头（客户没达成）要转回，但准则要求「极可能不发生重大转回」才敢计，所以保守一点先按达成概率打折更稳。渠道费用要按净销售额看费用率——先减返利再算，否则进场费、促销费的真实占比会被高估；进商场、上平台的生意，渠道费用率 10% 以上很常见，报价时必须把它算进价格里，靠销量摊薄是摊不掉的。"}_(K,"calcRebateAcc");function Y(){var a=e(n("hc-vol"),0),i=e(n("hc-grow"),0)/100,c=Math.max(1,e(n("hc-eff"),1)),m=e(n("hc-now"),0),u=e(n("hc-cost"),0),p=e(n("hc-turn"),0)/100,r=e(n("hc-hire"),0),o=a*(1+i),l=o/c,b=Math.max(0,l-m),d=l*p,h=b+d,C=l*u,f=(l-m)*u,x=o/(c*1.1),y=(l-x)*u;n("hc-big").textContent=s(b,1),n("hc-need").textContent=s(o,0)+" 单 / "+s(l,1)+" 人",n("hc-churn").textContent=s(d,1)+" 人（编制 "+s(l,1)+" × 离职率 "+v(p,0)+"）",n("hc-hireout").textContent=s(h,1)+" 人（缺口 "+s(b,1)+" ＋ 补员 "+s(d,1)+"）",n("hc-budget").textContent=t(C)+" 元",n("hc-inc").textContent=t(f)+" 元（现在 "+t(m*u)+"）",n("hc-hirecost").textContent=t(h*r)+" 元",n("hc-eff10").textContent=t(y)+" 元（"+s(x,1)+" 人即可，少招 "+s(l-x,1)+" 人）",n("hc-note").textContent="编制不是拍脑袋，是「业务量 ÷ 人均效能」倒推出来的；但人均效能要用近 12 个月的实际数据，别用行业标杆，否则永远算不出缺口。离职率要乘在目标编制上（不是现有编制），因为招进来的人也会走——招聘量 = 净增缺口 + 离职补员，这一步最常被漏掉，所以「招 88 人」其实要招 "+s(h,1)+" 人。人力预算别只算工资：社保公积金、年终奖、招聘与培训、工位设备都在里面，人均年成本要按全口径。最后算一遍「提效」的杠杆：人均效能提 10% 就能少招 "+s(l-x,1)+" 人，通常比砍人头更容易被接受，也更可持续。"}_(Y,"calcHeadcount");function U(){var a=e(n("mroi-spend"),0),i=Math.max(1,e(n("mroi-new"),1)),c=e(n("mroi-aov"),0),m=e(n("mroi-gm"),0)/100,u=e(n("mroi-rep"),0),p=e(n("mroi-life"),0),r=a/i,o=c*m,l=c*u*p*m,b=a>0?(i*l-a)/a:0;n("mroi-big").textContent=s(l/r,2),n("mroi-cac").textContent=t(r)+" 元/人",n("mroi-fg").textContent=t(o)+" 元（客单价 "+t(c)+" × "+v(m,0)+"）",n("mroi-be").textContent=s(r/o,3)+" 单"+(r/o<=1?"（首单即回本）":"（首单不够，要等复购）"),n("mroi-ltv").textContent=t(l)+" 元（"+s(u,1)+" 次/年 × "+s(p,1)+" 年）",n("mroi-roi").textContent=s(b,2)+" 倍（毛利额 "+t(i*l)+" ÷ 投入）",n("mroi-line").textContent=t(l/3)+" 元（LTV/CAC ≥ 3 才算健康）",n("mroi-rev").textContent=t(i*c*u*p)+" 元",n("mroi-note").textContent="LTV/CAC ≥ 3 是经验健康线，低于 1 是每获一个客亏一次，1.5–2 之间要靠融资或复购硬撑。几个口径坑：CAC 要算全口径（渠道费＋投放人力＋代理佣金＋首单补贴），只算广告费会把它算便宜；LTV 用「毛利」不用「收入」，用收入会高估 2–3 倍；生命周期别用「预计」，要用历史留存曲线算出来的实际中位年限。另外投产比高不等于该无限加投——边际 CAC 会随投放规模上升，投放量翻倍前先看新增渠道的转化率是否掉、退货率是否上升。"}_(U,"calcMarkRoi");function V(){var a=Math.max(0,e(n("se-sales"),0)),i=Math.max(0,e(n("se-sales0"),0)),c=Math.max(0,e(n("se-exp"),0)),m=Math.max(0,e(n("se-exp0"),0)),u=Math.min(100,Math.max(0,e(n("se-margin"),30)))/100,p=a>0?c/a:0,r=i>0?m/i:0,o=c-m,l=a-i,b=o>0?l*u/o:0,d=l>0&&i>0&&m>0?(c/m-1)/(a/i-1):0,h=l*u,C=h-o;n("se-big").textContent=s(b,2),n("se-rate").textContent=s(p*100,2)+"% / "+s(r*100,2)+"%",n("se-elas").textContent=s(d,2)+"（"+(d<1?"费效改善":"费效变差")+"）",n("se-newgm").textContent=t(h)+"（增量收入 "+t(l)+" × 毛利率 "+v(u,0)+"）",n("se-net").textContent=t(C)+"（增量毛利 − 增量费用）";for(var f=[["销售收入",t(i),t(a),(l>=0?"+":"")+t(l)],["销售费用",t(m),t(c),(o>=0?"+":"")+t(o)],["销售费用率",s(r*100,2)+"%",s(p*100,2)+"%",(p-r>=0?"+":"")+s((p-r)*100,2)+" 点"],["边际毛利","—",t(h),"增量收入 × 毛利率"]],x="",y=0;y<f.length;y++)x+='<tr><td class="tal">'+f[y][0]+"</td><td>"+f[y][1]+"</td><td>"+f[y][2]+"</td><td>"+f[y][3]+"</td></tr>";n("se-body").innerHTML=x,n("se-note").textContent="边际 ROI "+s(b,2)+" 倍，即本期多花的 "+t(o)+" 销售费用换回 "+t(h)+" 毛利，净赚 "+t(C)+"。"+(b>=1?"ROI &gt; 1，这波投入划算；":"ROI &lt; 1，多花的费用连毛利都没赚回来，先停一停；")+"费用弹性 "+s(d,2)+(d<1?"（&lt;1，费用涨得比收入慢，方向健康）。":"（&gt;1，费用跑得比收入快，要盯）。")+"不同渠道分开算，别让高效渠道补贴低效渠道。"}_(V,"calcSaleExp");function G(){for(var a=[],i=1;i<=2;i++){var p=e(n("prc-a"+i),0),c=e(n("prc-b"+i),0),m=e(n("prc-c"+i),0),u=e(n("prc-d"+i),0),r=p-c,o=r-m,l=o-u;a.push({rev:p,cm:r,ctrl:o,cen:l,cr:p>0?o/p*100:0,cmr:p>0?r/p*100:0})}var p=a[0].rev+a[1].rev,r=a[0].cm+a[1].cm,o=a[0].ctrl+a[1].ctrl,l=a[0].cen+a[1].cen,b=a[0].cr>=a[1].cr?"中心 A（可控利润率 "+s(a[0].cr)+"%）":"中心 B（可控利润率 "+s(a[1].cr)+"%）",d=a[0].cr<=a[1].cr?"中心 A（可控利润率 "+s(a[0].cr)+"%）":"中心 B（可控利润率 "+s(a[1].cr)+"%）";n("prc-ctrl").textContent=t(o),n("prc-rev").textContent=t(p),n("prc-cm").textContent=t(r),n("prc-cen").textContent=t(l),n("prc-best").textContent=b,n("prc-focus").textContent=d;var h=n("prc-body");h.innerHTML="",a.forEach(function(C,f){var x=document.createElement("tr");x.innerHTML="<td>"+(f===0?"A":"B")+"</td><td>"+t(C.rev)+"</td><td>"+t(C.cm)+"</td><td>"+t(C.ctrl)+"</td><td>"+t(C.cen)+"</td><td>"+s(C.cr)+"%</td>",h.appendChild(x)}),n("prc-note").textContent="可控利润 = 收入 − 变动成本 − 该中心自己说了算的固定费用；总部分摊下来的（房租、总部费用）只列示、不考核，否则会冤枉把中心做好的负责人。 两家边际贡献率都是 "+s(a[0].cmr)+"%（A）/"+s(a[1].cmr)+"%（B），但 B 可控固定重，可控利润率被压到 "+s(a[1].cr)+"%。先管可控固定费用最高的那家。"}_(G,"calcProfitcenter");export const PANELS={breakeven:`  <section class="panel" id="panel-breakeven">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f"><span>单价（元，不含税）</span>
      <input id="be-price" type="number" inputmode="decimal" min="0" step="1" value="100"></label>
    <label class="f"><span>单位变动成本（元，材料 + 计件工资 + 运费等）</span>
      <input id="be-vc" type="number" inputmode="decimal" min="0" step="1" value="60"></label>
    <label class="f"><span>固定成本总额（房租、工资、折旧等）</span>
      <input id="be-fc" type="number" inputmode="decimal" min="0" step="1000" value="20000"></label>
    <label class="f"><span>固定成本是</span>
      <select id="be-period">
        <option value="month" selected>每月的</option>
        <option value="year">每年的</option>
      </select></label>
    <label class="f"><span>目标利润（元，同期）</span>
      <input id="be-target" type="number" inputmode="decimal" min="0" step="1000" value="10000"></label>
    <label class="f"><span>当前销量（件 / 期）</span>
      <input id="be-qty" type="number" inputmode="decimal" min="0" step="10" value="800"></label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">保本销量（不赚不亏）</span><strong id="be-bep">—</strong><span class="unit">件/期</span></div>
    <ul class="kv">
      <li><span>单位边际贡献</span><b id="be-cm">—</b></li>
      <li><span>边际贡献率</span><b id="be-cmr">—</b></li>
      <li><span>保本销售额</span><b id="be-beps">—</b></li>
      <li><span>达成目标利润要卖</span><b id="be-tq">—</b></li>
      <li><span>对应销售额</span><b id="be-ts">—</b></li>
      <li><span>当前利润</span><b id="be-profit">—</b></li>
      <li><span>安全边际率（还能掉多少量）</span><b id="be-mos">—</b></li>
      <li><span>经营杠杆（利润对销量的敏感度）</span><b id="be-dol">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>销量</th><th>收入</th><th>边际贡献</th><th>利润</th></tr></thead>
        <tbody id="be-body"></tbody>
      </table>
    </div>
    <p class="hint" id="be-note"></p>
  </div>
    </div>
  </section>
`,pricing:`  <section class="panel" id="panel-pricing">
    <div class="cols">
  <div class="card">
    <h2>输入（报一个价之前）</h2>
    <label class="f"><span>单位成本（不含税，元）</span>
      <input id="pr-cost" type="number" inputmode="decimal" min="0" step="1" value="100"></label>
    <label class="f"><span>目标毛利率（%）</span>
      <input id="pr-margin" type="number" inputmode="decimal" min="0" max="95" step="1" value="40"></label>
    <label class="f"><span>增值税税率（%）</span>
      <input id="pr-vat" type="number" inputmode="decimal" min="0" step="1" value="13"></label>
    <label class="f"><span>打算给客户的折扣（%）</span>
      <input id="pr-disc" type="number" inputmode="decimal" min="0" max="90" step="1" value="5"></label>
    <label class="f"><span>客户现成的报价（含税，元，可空）</span>
      <input id="pr-cust" type="number" inputmode="decimal" min="0" step="1" value="170"></label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">建议报价（含税）</span><strong id="pr-in">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>对应不含税售价</span><b id="pr-ex">—</b></li>
      <li><span>单件毛利 / 毛利率</span><b id="pr-gp">—</b></li>
      <li><span>打完折含税价</span><b id="pr-discin">—</b></li>
      <li><span>打完折不含税价 / 毛利 / 毛利率</span><b id="pr-discgp">—</b></li>
      <li><span>保本含税价（毛利率 0）</span><b id="pr-be">—</b></li>
      <li><span>想保住目标毛利，折扣前得报</span><b id="pr-need">—</b></li>
      <li><span>按客户现价做，毛利率</span><b id="pr-custout">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>折扣</th><th>含税报价</th><th>不含税</th><th>毛利率</th></tr></thead>
        <tbody id="pr-body"></tbody>
      </table>
    </div>
    <p class="hint" id="pr-note"></p>
  </div>
    </div>
  </section>
`,multimargin:`  <section class="panel" id="panel-multimargin">
    <div class="cols">
  <div class="card">
    <h2>输入（销量填 0 表示这行不用）</h2>
    <label class="f">
      <span>产品 1</span>
      <span class="row">
        <input id="mm-q1" type="number" inputmode="decimal" min="0" step="1" value="1000" placeholder="销量">
        <input id="mm-p1" type="number" inputmode="decimal" min="0" step="1" value="100" placeholder="单价(不含税)">
        <input id="mm-c1" type="number" inputmode="decimal" min="0" step="1" value="60" placeholder="单位成本">
      </span>
    </label>
    <label class="f">
      <span>产品 2</span>
      <span class="row">
        <input id="mm-q2" type="number" inputmode="decimal" min="0" step="1" value="800" placeholder="销量">
        <input id="mm-p2" type="number" inputmode="decimal" min="0" step="1" value="200" placeholder="单价(不含税)">
        <input id="mm-c2" type="number" inputmode="decimal" min="0" step="1" value="170" placeholder="单位成本">
      </span>
    </label>
    <label class="f">
      <span>产品 3</span>
      <span class="row">
        <input id="mm-q3" type="number" inputmode="decimal" min="0" step="1" value="500" placeholder="销量">
        <input id="mm-p3" type="number" inputmode="decimal" min="0" step="1" value="300" placeholder="单价(不含税)">
        <input id="mm-c3" type="number" inputmode="decimal" min="0" step="1" value="310" placeholder="单位成本">
      </span>
    </label>
    <label class="f">
      <span>产品 4</span>
      <span class="row">
        <input id="mm-q4" type="number" inputmode="decimal" min="0" step="1" value="0" placeholder="销量">
        <input id="mm-p4" type="number" inputmode="decimal" min="0" step="1" value="80" placeholder="单价(不含税)">
        <input id="mm-c4" type="number" inputmode="decimal" min="0" step="1" value="50" placeholder="单位成本">
      </span>
    </label>
    <em>每行三个框依次填：销量 / 单价（不含税）/ 单位成本，销量填 0 表示这行不用；要按含税报价比较，先用「发票价税分离」换算</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">综合毛利率（加权）</span><strong id="mm-margin">—</strong><span class="unit"></span></div>
    <ul class="kv">
      <li><span>总收入 / 总毛利</span><b id="mm-total">—</b></li>
      <li><span>低于综合毛利率的产品</span><b id="mm-lag">—</b></li>
      <li><span>负毛利产品</span><b id="mm-neg">—</b></li>
      <li><span>剔掉负毛利后：收入 / 毛利 / 毛利率</span><b id="mm-cut">—</b></li>
      <li><span>负毛利产品拉低了几个点</span><b id="mm-drag">—</b></li>
      <li><span>收入占比最大的产品</span><b id="mm-worst">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>产品</th><th>销量</th><th>收入</th><th>毛利</th><th>毛利率</th><th>收入占比</th></tr></thead>
        <tbody id="mm-body"></tbody>
      </table>
    </div>
    <p class="hint" id="mm-note"></p>
  </div>
    </div>
  </section>
`,mpbe:`  <section class="panel" id="panel-mpbe">
    <div class="cols">
  <div class="card">
    <h2>输入（多产品，元/件）</h2>
    <label class="f"><span>月固定成本合计（房租、固定工资、折旧等）</span>
      <input id="mb-fc" type="number" inputmode="decimal" min="0" step="10000" value="200000"></label>
    <label class="f"><span>产品 1</span>
      <span class="row">
        <input id="mb-p1" type="number" inputmode="decimal" min="0" step="1" value="100" placeholder="单价">
        <input id="mb-v1" type="number" inputmode="decimal" min="0" step="1" value="60" placeholder="单位变动成本">
        <input id="mb-q1" type="number" inputmode="decimal" min="0" step="10" value="2000" placeholder="销量/件">
      </span></label>
    <label class="f"><span>产品 2</span>
      <span class="row">
        <input id="mb-p2" type="number" inputmode="decimal" min="0" step="1" value="50" placeholder="单价">
        <input id="mb-v2" type="number" inputmode="decimal" min="0" step="1" value="25" placeholder="单位变动成本">
        <input id="mb-q2" type="number" inputmode="decimal" min="0" step="10" value="3000" placeholder="销量/件">
      </span></label>
    <label class="f"><span>产品 3</span>
      <span class="row">
        <input id="mb-p3" type="number" inputmode="decimal" min="0" step="1" value="200" placeholder="单价">
        <input id="mb-v3" type="number" inputmode="decimal" min="0" step="1" value="150" placeholder="单位变动成本">
        <input id="mb-q3" type="number" inputmode="decimal" min="0" step="10" value="500" placeholder="销量/件">
      </span></label>
    <label class="f"><span>想赚到的月利润（元）</span>
      <input id="mb-target" type="number" inputmode="decimal" min="0" step="10000" value="50000"></label>
    <em>每行三个框依次填：单价 / 单位变动成本 / 销量；固定成本按销售结构分摊，用来判断哪个产品其实在补贴哪个</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">保本销售额（多产品合计）</span><strong id="mb-bep">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>加权平均边际贡献率</span><b id="mb-cmr">—</b></li>
      <li><span>当前销售额 / 边际贡献</span><b id="mb-rev">—</b></li>
      <li><span>当前利润</span><b id="mb-profit">—</b></li>
      <li><span>安全边际率（负数表示还没保本）</span><b id="mb-mos">—</b></li>
      <li><span>离保本还差（金额）</span><b id="mb-gap">—</b></li>
      <li><span>要赚到设定利润需要卖</span><b id="mb-need">—</b></li>
      <li><span>固定成本每降 1 万，利润增</span><b id="mb-lever">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>产品</th><th>收入</th><th>边际贡献率</th><th>分摊固定</th><th>利润</th><th>保本销量</th></tr></thead>
        <tbody id="mb-body"></tbody>
      </table>
    </div>
    <p class="hint" id="mb-note"></p>
  </div>
    </div>
  </section>
`,payroll:`  <section class="panel" id="panel-payroll">
    <div class="cols">
  <div class="card">
    <h2>输入（本月工资表汇总，元）</h2>
    <label class="f"><span>应发工资合计（税前，含奖金补贴）</span>
      <input id="pc-gross" type="number" inputmode="decimal" min="0" step="1000" value="500000"></label>
    <label class="f"><span>代扣个人社保</span>
      <input id="pc-si" type="number" inputmode="decimal" min="0" step="1000" value="52500"></label>
    <label class="f"><span>代扣个人公积金</span>
      <input id="pc-hf" type="number" inputmode="decimal" min="0" step="1000" value="60000"></label>
    <label class="f"><span>代扣个人所得税（工资表上的）</span>
      <input id="pc-tax" type="number" inputmode="decimal" min="0" step="1000" value="18000"></label>
    <label class="f"><span>其他扣款（罚款、借款、餐费等）</span>
      <input id="pc-other" type="number" inputmode="decimal" min="0" step="1000" value="3000"></label>
    <label class="f"><span>实发合计（表上、银行代发金额）</span>
      <input id="pc-act" type="number" inputmode="decimal" min="0" step="1000" value="366500"></label>
    <label class="f"><span>税务系统申报个税（自然人电子税务局数）</span>
      <input id="pc-tax2" type="number" inputmode="decimal" min="0" step="1000" value="17600"></label>
    <label class="f"><span>单位承担社保 / 单位承担公积金</span>
      <span class="row">
        <input id="pc-cosi" type="number" inputmode="decimal" min="0" step="1000" value="120000">
        <input id="pc-cohf" type="number" inputmode="decimal" min="0" step="1000" value="60000">
      </span></label>
    <label class="f"><span>同期营业收入（算人工成本率用）</span>
      <input id="pc-rev" type="number" inputmode="decimal" min="0" step="10000" value="3000000"></label>
    <label class="f"><span>发薪人数</span>
      <input id="pc-head" type="number" inputmode="numeric" min="1" step="1" value="50"></label>
    <em>三步勾稽：应发 − 各项代扣 = 实发；表内个税 = 申报个税；应发 + 单位承担 = 用工总成本</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">应发 − 代扣（应有实发）</span><strong id="pc-net">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>与表上实发差额（0 = 平）</span><b id="pc-diff">—</b></li>
      <li><span>个税申报差异（表内 − 申报）</span><b id="pc-taxdiff">—</b></li>
      <li><span>代扣合计占应发</span><b id="pc-ded">—</b></li>
      <li><span>单位承担合计（社保＋公积金）</span><b id="pc-co">—</b></li>
      <li><span>用工总成本（应发＋单位承担）</span><b id="pc-cost">—</b></li>
      <li><span>人工成本率（÷ 同期收入）</span><b id="pc-rate">—</b></li>
      <li><span>人均用工成本</span><b id="pc-avg">—</b></li>
      <li><span>勾稽结论</span><b id="pc-verdict">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>项目</th><th>金额</th><th>占应发</th></tr></thead>
        <tbody id="pc-body"></tbody>
      </table>
    </div>
    <p class="hint" id="pc-note"></p>
  </div>
    </div>
  </section>
`,commission:`  <section class="panel" id="panel-commission">
    <div class="cols">
  <div class="card">
    <h2>输入（销售提成方案对比）</h2>
    <label class="f"><span>销售额（不含税，元）</span>
      <input id="cm-sales" type="number" inputmode="decimal" min="0" step="10000" value="1000000"></label>
    <label class="f"><span>退货率（%）</span>
      <input id="cm-ret" type="number" inputmode="decimal" min="0" max="100" step="1" value="5"></label>
    <label class="f"><span>毛利率（%）</span>
      <input id="cm-gm" type="number" inputmode="decimal" min="0" max="100" step="1" value="25"></label>
    <label class="f"><span>按销售额提成（%）／按毛利提成（%）</span>
      <span class="row"><input id="cm-sr" type="number" inputmode="decimal" min="0" step="0.1" value="3">
        <input id="cm-gr" type="number" inputmode="decimal" min="0" step="0.1" value="10"></span></label>
    <label class="f"><span>目标完成率（%）</span>
      <input id="cm-achv" type="number" inputmode="decimal" min="0" step="5" value="110"></label>
    <label class="f"><span>提成按回款比例发放（%）</span>
      <input id="cm-cash" type="number" inputmode="decimal" min="0" max="100" step="5" value="80"></label>
    <em>口径：两个方案的提成额相等时对应的毛利率就是「临界毛利率」，高于它按毛利提对销售更有利，低于它按销售额提更有利</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">按毛利提成的提成额</span><strong id="cm-big">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>按销售额提成</span><b id="cm-c1">—</b></li>
      <li><span>两者差额（销售额法多付）</span><b id="cm-gap">—</b></li>
      <li><span>临界毛利率</span><b id="cm-crit">—</b></li>
      <li><span>完成率系数</span><b id="cm-coeff">—</b></li>
      <li><span>按回款发放后实发（销 / 毛）</span><b id="cm-cashout">—</b></li>
      <li><span>提成占毛利比（销售额法）</span><b id="cm-share">—</b></li>
      <li><span>退货后提成基数</span><b id="cm-base">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>毛利率</th><th>按销售额提成</th><th>按毛利提成</th><th>差额</th></tr></thead>
        <tbody id="cm-body"></tbody>
      </table>
    </div>
    <p class="hint" id="cm-note"></p>
  </div>
    </div>
  </section>
`,importcost:`  <section class="panel" id="panel-importcost">
    <div class="cols">
  <div class="card">
    <h2>输入（进口到岸成本）</h2>
    <label class="f"><span>FOB 货值（美元）</span>
      <input id="ic-fob" type="number" inputmode="decimal" min="0" step="1000" value="100000"></label>
    <label class="f"><span>国际运费 / 保险费（美元）</span>
      <span class="row"><input id="ic-frt" type="number" inputmode="decimal" min="0" step="500" value="5000">
        <input id="ic-ins" type="number" inputmode="decimal" min="0" step="100" value="1000"></span></label>
    <label class="f"><span>汇率（人民币/美元）</span>
      <input id="ic-fx" type="number" inputmode="decimal" min="0" step="0.01" value="7.1"></label>
    <label class="f"><span>关税税率（%）</span>
      <input id="ic-duty" type="number" inputmode="decimal" min="0" step="0.5" value="8"></label>
    <label class="f"><span>消费税税率（%）</span>
      <input id="ic-cons" type="number" inputmode="decimal" min="0" max="100" step="1" value="0"></label>
    <label class="f"><span>进口增值税率（%）</span>
      <input id="ic-vat" type="number" inputmode="decimal" min="0" step="1" value="13"></label>
    <label class="f"><span>港杂费 / 代理费（元）</span>
      <span class="row"><input id="ic-port" type="number" inputmode="decimal" min="0" step="1000" value="8000">
        <input id="ic-agent" type="number" inputmode="decimal" min="0" step="500" value="3000"></span></label>
    <label class="f"><span>数量（件）</span>
      <input id="ic-qty" type="number" inputmode="decimal" min="1" step="100" value="1000"></label>
    <em>口径：完税价格按 CIF（货值＋运费＋保险）；进口增值税是可抵扣的，进成本的是关税和港杂，别把它算进单价再报价</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">单位到岸成本（不含可抵扣税）</span><strong id="ic-big">—</strong><span class="unit">元/件</span></div>
    <ul class="kv">
      <li><span>CIF 完税价格</span><b id="ic-cif">—</b></li>
      <li><span>关税</span><b id="ic-dutyv">—</b></li>
      <li><span>消费税</span><b id="ic-consv">—</b></li>
      <li><span>进口增值税（可抵扣）</span><b id="ic-vatv">—</b></li>
      <li><span>港杂 + 代理</span><b id="ic-fees">—</b></li>
      <li><span>到岸总成本（进存货）</span><b id="ic-land">—</b></li>
      <li><span>含税现金支出 / 单位含税</span><b id="ic-cash">—</b></li>
      <li><span>税负占货值比例</span><b id="ic-ratio">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>项目</th><th>金额（元）</th><th>说明</th></tr></thead>
        <tbody id="ic-body"></tbody>
      </table>
    </div>
    <p class="hint" id="ic-note"></p>
  </div>
    </div>
  </section>
`,quotefx:`  <section class="panel" id="panel-quotefx">
    <div class="cols">
  <div class="card">
    <h2>输入（出口报价换算）</h2>
    <label class="f"><span>工厂成本（不含税，元/件）</span>
      <input id="qf-cost" type="number" inputmode="decimal" min="0" step="5" value="100"></label>
    <label class="f"><span>数量（件）</span>
      <input id="qf-qty" type="number" inputmode="decimal" min="1" step="500" value="5000"></label>
    <label class="f"><span>国内运费 / 港杂报关（元）</span>
      <span class="row"><input id="qf-dyn" type="number" inputmode="decimal" min="0" step="1000" value="8000">
        <input id="qf-port" type="number" inputmode="decimal" min="0" step="1000" value="6000"></span></label>
    <label class="f"><span>目标毛利率（% of FOB）</span>
      <input id="qf-gm" type="number" inputmode="decimal" min="0" max="90" step="1" value="20"></label>
    <label class="f"><span>佣金率（%）</span>
      <input id="qf-comm" type="number" inputmode="decimal" min="0" max="20" step="1" value="3"></label>
    <label class="f"><span>汇率（人民币/美元）</span>
      <input id="qf-fx" type="number" inputmode="decimal" min="0" step="0.01" value="7.1"></label>
    <label class="f"><span>海运费（美元）/ 保险费率（%）</span>
      <span class="row"><input id="qf-frt" type="number" inputmode="decimal" min="0" step="500" value="3000">
        <input id="qf-ins" type="number" inputmode="decimal" min="0" step="0.1" value="0.5"></span></label>
    <em>口径：FOB/CIF/CFR 的差别只在「谁付运费保险」；报价一律倒推——先算出要卖多少钱，再换算成条款价</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">CIF 报价单价</span><strong id="qf-big">—</strong><span class="unit">美元/件</span></div>
    <ul class="kv">
      <li><span>FOB 总额 / 单价</span><b id="qf-fob">—</b></li>
      <li><span>佣金</span><b id="qf-comv">—</b></li>
      <li><span>扣佣后实际毛利率</span><b id="qf-real">—</b></li>
      <li><span>海运费（折人民币）</span><b id="qf-frtv">—</b></li>
      <li><span>保险费</span><b id="qf-insv">—</b></li>
      <li><span>CIF 总额 / 单价</span><b id="qf-cif">—</b></li>
      <li><span>每件净利</span><b id="qf-profit">—</b></li>
      <li><span>换汇每跌 0.1 元的影响</span><b id="qf-fxrisk">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>项目</th><th>人民币</th><th>美元</th></tr></thead>
        <tbody id="qf-body"></tbody>
      </table>
    </div>
    <p class="hint" id="qf-note"></p>
  </div>
    </div>
  </section>
`,payout:`  <section class="panel" id="panel-payout">
    <div class="cols">
  <div class="card">
    <h2>输入（股东回报与分红，万元）</h2>
    <label class="f"><span>未分配利润 / 当年净利</span>
      <span class="row"><input id="po-ret" type="number" inputmode="decimal" min="0" step="50" value="1000">
        <input id="po-np" type="number" inputmode="decimal" step="50" value="300"></span></label>
    <label class="f"><span>大股东持股 % / 分红比例 %</span>
      <span class="row"><input id="po-share" type="number" inputmode="decimal" min="0" max="100" step="5" value="60">
        <input id="po-ratio" type="number" inputmode="decimal" min="0" max="100" step="5" value="30"></span></label>
    <label class="f"><span>股息红利个税 % / 留存再投资回报 %</span>
      <span class="row"><input id="po-tax" type="number" inputmode="decimal" min="0" max="100" step="1" value="20">
        <input id="po-roe" type="number" inputmode="decimal" min="0" step="1" value="10"></span></label>
    <label class="f"><span>股东借款年末未还（万元）</span>
      <input id="po-loan" type="number" inputmode="decimal" min="0" step="10" value="200"></label>
    <em>口径：分红是「公司交完 25% 企业所得税后，股东再交 20%」；股东借款年底不还又不用于经营，会被视同分红补税</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">分红后大股东到手</span><strong id="po-big">—</strong><span class="unit">万元</span></div>
    <ul class="kv">
      <li><span>分红总额 / 个税</span><b id="po-div">—</b></li>
      <li><span>大股东分得 / 到手</span><b id="po-sharev">—</b></li>
      <li><span>分红后未分配利润</span><b id="po-keep">—</b></li>
      <li><span>不分红：留存 / 次年增利</span><b id="po-nodiv">—</b></li>
      <li><span>留存带给大股东的间接价值</span><b id="po-ind">—</b></li>
      <li><span>股东借款视同分红风险</span><b id="po-risk">—</b></li>
      <li><span>综合税负（企业+个人）</span><b id="po-alltax">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>方案</th><th>大股东当年到手</th><th>留在公司</th><th>说明</th></tr></thead>
        <tbody id="po-body"></tbody>
      </table>
    </div>
    <p class="hint" id="po-note"></p>
  </div>
    </div>
  </section>
`,rebate:`  <section class="panel" id="panel-rebate">
    <div class="cols">
  <div class="card">
    <h2>输入（阶梯返利，三档）</h2>
    <label class="f"><span>客户当前年销售额（万元）</span>
      <input id="reb-base" type="number" inputmode="decimal" min="0" step="50" value="950"></label>
    <label class="f"><span>你的毛利率（%）</span>
      <input id="reb-gm" type="number" inputmode="decimal" min="0" max="100" step="1" value="30"></label>
    <label class="f"><span>第 1 档：门槛 / 返点（%）</span>
      <span class="row"><input id="reb-t1" type="number" inputmode="decimal" min="0" step="50" value="800">
        <input id="reb-p1" type="number" inputmode="decimal" min="0" max="100" step="0.5" value="2"></span></label>
    <label class="f"><span>第 2 档：门槛 / 返点（%）</span>
      <span class="row"><input id="reb-t2" type="number" inputmode="decimal" min="0" step="50" value="1000">
        <input id="reb-p2" type="number" inputmode="decimal" min="0" max="100" step="0.5" value="3"></span></label>
    <label class="f"><span>第 3 档：门槛 / 返点（%）</span>
      <span class="row"><input id="reb-t3" type="number" inputmode="decimal" min="0" step="50" value="1500">
        <input id="reb-p3" type="number" inputmode="decimal" min="0" max="100" step="0.5" value="5"></span></label>
    <em>口径：返点按「全年总销售额」全额计算，不是只算超出部分——所以跨越门槛那一刻，前面卖的量也一起降价</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">最值得冲的那一档净增</span><strong id="reb-big">—</strong><span class="unit">万元</span></div>
    <ul class="kv">
      <li><span>当前处于哪一档</span><b id="reb-cur">—</b></li>
      <li><span>当前返利 / 净毛利</span><b id="reb-now">—</b></li>
      <li><span>当前实际回款率</span><b id="reb-rate">—</b></li>
      <li><span>最值得冲的档位</span><b id="reb-pick">—</b></li>
      <li><span>跨档临界销售额</span><b id="reb-crit">—</b></li>
      <li><span>建议</span><b id="reb-advice">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>档位</th><th>返利额</th><th>净毛利</th><th>净增</th><th>临界销售</th><th>结论</th></tr></thead>
        <tbody id="reb-body"></tbody>
      </table>
    </div>
    <p class="hint" id="reb-note"></p>
  </div>
    </div>
  </section>
`,rebateacc:`  <section class="panel" id="panel-rebateacc">
    <div class="cols">
  <div class="card">
    <h2>输入（不含税口径）</h2>
    <label class="f">
      <span>销售额</span>
      <input id="rba-sales" type="number" inputmode="decimal" min="0" step="10000" value="10000000">
    </label>
    <span class="row">
      <input id="rba-rate" type="number" inputmode="decimal" min="0" step="0.5" value="5" aria-label="合同返利比例">
      <input id="rba-ach" type="number" inputmode="decimal" min="0" max="100" step="5" value="90" aria-label="预计达成率">
    </span>
    <p class="hint">左：合同返利比例（%），右：预计达成概率（%）——按期望值计提，不能等年底一次冲</p>
    <label class="f">
      <span>变动成本率（%）</span>
      <input id="rba-vc" type="number" inputmode="decimal" min="0" max="100" step="1" value="70">
    </label>
    <span class="row">
      <input id="rba-fee" type="number" inputmode="decimal" min="0" step="10000" value="300000" aria-label="进场费">
      <input id="rba-promo" type="number" inputmode="decimal" min="0" step="10000" value="400000" aria-label="促销费">
    </span>
    <p class="hint">左：进场费/条码费，右：促销与陈列费</p>
    <label class="f">
      <span>导购与人员费用</span>
      <input id="rba-staff" type="number" inputmode="decimal" min="0" step="10000" value="200000">
    </label>
  </div>
  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">计入渠道后的净毛利</span><strong id="rba-big">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>应计提返利（期望值）</span><b id="rba-reb">—</b></li>
      <li><span>净销售额</span><b id="rba-net">—</b></li>
      <li><span>渠道费用合计</span><b id="rba-cost">—</b></li>
      <li><span>渠道费用率</span><b id="rba-cr">—</b></li>
      <li><span>返利占毛利</span><b id="rba-rg">—</b></li>
      <li><span>综合毛利率（费用后）</span><b id="rba-gm">—</b></li>
      <li><span>全额达成影响</span><b id="rba-full">—</b></li>
    </ul>
    <p class="hint" id="rba-note"></p>
  </div>
    </div>
  </section>
`,headcount:`  <section class="panel" id="panel-headcount">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>当前年业务量</span>
      <input id="hc-vol" type="number" inputmode="decimal" min="0" step="1000" value="120000">
    </label>
    <span class="row">
      <input id="hc-grow" type="number" inputmode="decimal" min="0" step="5" value="20" aria-label="业务量增长">
      <input id="hc-eff" type="number" inputmode="decimal" min="1" step="10" value="500" aria-label="人均年效能">
    </span>
    <p class="hint">左：业务量增长（%），右：人均年效能（单/人·年）</p>
    <span class="row">
      <input id="hc-now" type="number" inputmode="numeric" min="0" step="5" value="200" aria-label="现有在岗人数">
      <input id="hc-cost" type="number" inputmode="decimal" min="0" step="10000" value="120000" aria-label="人均年成本">
    </span>
    <p class="hint">左：现有在岗人数，右：人均年综合成本（含社保公积金）</p>
    <span class="row">
      <input id="hc-turn" type="number" inputmode="decimal" min="0" max="100" step="1" value="15" aria-label="离职率">
      <input id="hc-hire" type="number" inputmode="decimal" min="0" step="1000" value="8000" aria-label="单人招聘成本">
    </span>
    <p class="hint">左：年离职率（%），右：单人招聘成本（含渠道、面试、培训期损耗）</p>
  </div>
  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">编制缺口</span><strong id="hc-big">—</strong><span class="unit">人</span></div>
    <ul class="kv">
      <li><span>目标业务量 / 需求人数</span><b id="hc-need">—</b></li>
      <li><span>离职补员</span><b id="hc-churn">—</b></li>
      <li><span>全年招聘量</span><b id="hc-hireout">—</b></li>
      <li><span>全年人工预算</span><b id="hc-budget">—</b></li>
      <li><span>比现在多花的钱</span><b id="hc-inc">—</b></li>
      <li><span>招聘费用</span><b id="hc-hirecost">—</b></li>
      <li><span>效能提 10% 可省</span><b id="hc-eff10">—</b></li>
    </ul>
    <p class="hint" id="hc-note"></p>
  </div>
    </div>
  </section>
`,markroi:`  <section class="panel" id="panel-markroi">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>渠道投入合计</span>
      <input id="mroi-spend" type="number" inputmode="decimal" min="0" step="10000" value="1200000">
    </label>
    <span class="row">
      <input id="mroi-new" type="number" inputmode="decimal" min="0" step="100" value="4000" aria-label="获得新客数">
      <input id="mroi-aov" type="number" inputmode="decimal" min="0" step="100" value="2000" aria-label="客单价">
    </span>
    <p class="hint">左：获得新客数，右：客单价（元/单）</p>
    <span class="row">
      <input id="mroi-gm" type="number" inputmode="decimal" min="0" max="100" step="1" value="40" aria-label="毛利率">
      <input id="mroi-rep" type="number" inputmode="decimal" min="0" step="0.1" value="1.5" aria-label="年复购次数">
    </span>
    <p class="hint">左：毛利率（%），右：年均复购次数</p>
    <label class="f">
      <span>客户生命周期（年）</span>
      <input id="mroi-life" type="number" inputmode="decimal" min="0" step="0.5" value="3">
    </label>
  </div>
  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">LTV ÷ CAC</span><strong id="mroi-big">—</strong><span class="unit">倍</span></div>
    <ul class="kv">
      <li><span>CAC（单个获客成本）</span><b id="mroi-cac">—</b></li>
      <li><span>首单毛利</span><b id="mroi-fg">—</b></li>
      <li><span>回本所需单量</span><b id="mroi-be">—</b></li>
      <li><span>LTV（生命周期毛利）</span><b id="mroi-ltv">—</b></li>
      <li><span>投入产出比 ROI</span><b id="mroi-roi">—</b></li>
      <li><span>健康线 CAC（LTV/3）</span><b id="mroi-line">—</b></li>
      <li><span>带来总收入</span><b id="mroi-rev">—</b></li>
    </ul>
    <p class="hint" id="mroi-note"></p>
  </div>
    </div>
  </section>
`,saleexp:`  <section class="panel" id="panel-saleexp">
    <div class="cols">
      <div class="card">
        <h2>输入：两期销售与费用</h2>
        <span class="row">
          <label class="f"><span>本期销售收入</span><input id="se-sales" type="number" inputmode="decimal" min="0" step="100000" value="10000000"></label>
          <label class="f"><span>上期销售收入</span><input id="se-sales0" type="number" inputmode="decimal" min="0" step="100000" value="8000000"></label>
        </span>
        <span class="row">
          <label class="f"><span>本期销售费用</span><input id="se-exp" type="number" inputmode="decimal" min="0" step="10000" value="1200000"></label>
          <label class="f"><span>上期销售费用</span><input id="se-exp0" type="number" inputmode="decimal" min="0" step="10000" value="1000000"></label>
        </span>
        <label class="f"><span>毛利率 %</span><input id="se-margin" type="number" inputmode="decimal" min="0" step="1" value="30"></label>
        <em>口径：边际 ROI = 增量收入 × 毛利率 ÷ 增量销售费用，衡量「多花的每一元费用多赚多少毛利」，&gt;1 才算划算。费用弹性 = 费用增速 ÷ 收入增速，&lt;1 说明费用涨得比收入慢，费效在改善。</em>
      </div>
      <div class="card res">
        <h2>结果：销售费用投入产出</h2>
        <div class="big"><span class="k">边际 ROI</span><strong id="se-big">—</strong><span class="unit">倍</span></div>
        <ul class="kv">
          <li><span>销售费用率（本期 / 上期）</span><b id="se-rate">—</b></li>
          <li><span>费用弹性（费用增速 ÷ 收入增速）</span><b id="se-elas">—</b></li>
          <li><span>增量毛利</span><b id="se-newgm">—</b></li>
          <li><span>增量净贡献</span><b id="se-net">—</b></li>
        </ul>
        <div class="tablebox">
          <table>
            <thead><tr><th class="tal">指标</th><th>上期</th><th>本期</th><th>变化</th></tr></thead>
            <tbody id="se-body"></tbody>
          </table>
        </div>
        <p class="hint" id="se-note"></p>
      </div>
    </div>
  </section>
`,profitcenter:`  <section class="panel" id="panel-profitcenter">
    <div class="cols">
      <div class="card">
        <h2>利润中心责任报告</h2>
        <label class="f"><span>中心 A 收入</span><input id="prc-a1" type="number" inputmode="decimal" min="0" step="10000" value="2000000" class="num"></label>
        <span class="row"><label class="f"><span>A 变动成本</span><input id="prc-b1" type="number" inputmode="decimal" min="0" step="10000" value="1200000" class="num"></label><label class="f"><span>A 可控固定</span><input id="prc-c1" type="number" inputmode="decimal" min="0" step="10000" value="300000" class="num"></label></span>
        <label class="f"><span>A 不可控固定（总部分摊）</span><input id="prc-d1" type="number" inputmode="decimal" min="0" step="10000" value="200000" class="num"></label>
        <label class="f"><span>中心 B 收入</span><input id="prc-a2" type="number" inputmode="decimal" min="0" step="10000" value="1500000" class="num"></label>
        <span class="row"><label class="f"><span>B 变动成本</span><input id="prc-b2" type="number" inputmode="decimal" min="0" step="10000" value="900000" class="num"></label><label class="f"><span>B 可控固定</span><input id="prc-c2" type="number" inputmode="decimal" min="0" step="10000" value="400000" class="num"></label></span>
        <label class="f"><span>B 不可控固定（总部分摊）</span><input id="prc-d2" type="number" inputmode="decimal" min="0" step="10000" value="150000" class="num"></label>
        <em>考核只看「可控利润」，总部摊下来的费用列示但不考核。</em>
      </div>
      <div class="card res">
        <h2>结果</h2>
        <div class="big"><span class="k">可控利润合计</span><strong id="prc-ctrl">—</strong><span class="unit">元</span></div>
        <ul class="kv">
          <li><span>收入合计</span><b id="prc-rev">—</b></li>
          <li><span>边际贡献合计</span><b id="prc-cm">—</b></li>
          <li><span>中心利润合计（减分摊后）</span><b id="prc-cen">—</b></li>
          <li><span>按可控利润率考核</span><b id="prc-best">—</b></li>
          <li><span>最该先管</span><b id="prc-focus">—</b></li>
        </ul>
        <div class="tablebox">
          <table>
            <thead><tr><th>中心</th><th>收入</th><th>边际贡献</th><th>可控利润</th><th>中心利润</th><th>可控利润率</th></tr></thead>
            <tbody id="prc-body"></tbody>
          </table>
        </div>
        <p class="hint" id="prc-note"></p>
      </div>
    </div>
  </section>
`};export default{breakeven:I,pricing:R,multimargin:L,mpbe:N,payroll:W,importcost:P,quotefx:O,rebate:B,payout:H,commission:D,rebateacc:K,headcount:Y,markroi:U,saleexp:V,profitcenter:G};
