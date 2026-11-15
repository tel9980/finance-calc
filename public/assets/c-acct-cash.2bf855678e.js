var P=Object.defineProperty;var S=(e,s)=>P(e,"name",{value:s,configurable:!0});const{$:n,BACKUP_KEY:Z,BUILD_TAG:j,CAT_KEY:nn,CAT_LABEL:an,CHUNK_FILES:tn,CHUNK_OF:en,CMP_KEY:ln,CORE_CALC:sn,CURS:pn,DEFERRED_TAPS:dn,DEMO_SAVED:rn,DIVISOR:on,EDITED:cn,ERR_BOX:bn,FAV_KEY:mn,FIELDS:un,FIRST_ACTIVATE:vn,FREQ:fn,FREQ_KEY:hn,INSTALL_HIDE_KEY:xn,KEY:gn,LAST_KEY:yn,MONTH_CATS:wn,MONTH_TABLE:Cn,NEXT_OF:Mn,PALETTE_EL:kn,PENDING_PARAMS:Tn,PRE_KEY:En,QUOTA_WARNED:Sn,RECENT_KEY:_n,SAVE_TIMER:An,SCHEMA_KEY:Fn,SCHEMA_VERSION:Nn,SEARCH_KEY:Wn,SNAP_DROP_SEEN:Pn,SNAP_KEY:Rn,SNAP_MAX:In,SNAP_PICK:Ln,STORED:Dn,TABS:Kn,TAB_NATURAL:On,THEME_KEY:Hn,TOAST_EL:Yn,TODAYBAR_KEY:Bn,UNITS:Un,WF_ARCH_KEY:Vn,WF_AUTO_IDX:Gn,WF_AUTO_LIST:Qn,WF_AUTO_STEP:Xn,WF_AUTO_TIMER:qn,WF_CUSTNAME_KEY:zn,WF_CUST_KEY:Jn,WF_CUST_NAME:$n,WF_DONE:Zn,WF_EDIT:jn,WF_EDIT_KEY:na,WF_KEY:aa,WF_LAST:ta,WF_LEGACY:ea,WF_MAN_KEY:la,WF_MD:sa,WF_MD_FIELDS:ia,WF_MD_KEY:pa,WF_MD_LINKS:da,WF_META_KEY:ra,WF_MONTH_KEY:oa,WF_NOTE_KEY:ca,WF_NOTIFIED_KEY:ba,WF_NOTIFY_KEY:ma,WF_PATHS:ua,WF_ROLE_KEY:va,WF_ROLE_READY:fa,WF_SKIP_KEY:ha,WF_TASK_KEY:xa,WF_TEMPLATES:ga,XL_ROWS:ya,YEAR_TABLE:wa,_onPanels:Ca,a11yTouch:Ma,activate:ka,addMonths:Ta,annuityPV:Ea,annuityPayment:Sa,applyFilter:_a,applyParams:Aa,applyStoredTo:Fa,applyWfTpl:Na,backupAgeDays:Wa,bindWfDnd:Pa,bindWfInline:Ra,bizAdd:Ia,bonusSoloTax:La,buildLoanSchedule:Da,buildShare:Ka,buildTabBadges:Oa,bumpFreq:Ha,calcLoan:Ya,calcMap:Ba,calcWorkflow:Ua,checkInputs:Va,clearWfMan:Ga,closePalette:Qa,cmpTabName:Xa,cnUpper:qa,combineTax:za,convertTemp:Ja,copyText:$a,cumulativeTax:Za,curCat:ja,currentSnap:nt,demoFill:at,demoHint:tt,diagText:et,dlJson:lt,doInstall:st,doPrint:it,drawMonthCats:pt,drawMonthStack:dt,drawReportCharts:rt,drawRpMini:ot,drawnMonthlyChart:ct,drawnYearChart:bt,enhanceNums:mt,enhancePanelUi:ut,ensureChunk:vt,errHuman:ft,evalExpr:ht,favList:xt,fillCmpMod:gt,fillMonthGrid:yt,fillUnits:wt,flash:Ct,flushParams:Mt,flushSave:kt,fmt:k,fmtAt:Tt,fmtDate:Et,fx:St,gauss:_t,getWfCust:At,getWfDone:Ft,getWfMan:Nt,getWfMeta:Wt,getWfNotes:Pt,getWfSkip:Rt,hashTarget:It,inputIssue:Lt,installEvt:Dt,installHintHide:Kt,installHintOff:Ot,iosInstallTip:Ht,iosLike:Yt,isFav:Bt,lastName:Ut,leftAfter:Vt,linkTo:Gt,loadCmpA:Qt,loadSnaps:Xt,loadWfArch:qt,loadWfCust:zt,loadWfDone:Jt,loadWfEdit:$t,loadWfMan:Zt,loadWfMeta:jt,loadWfNotes:ne,loadWfSkip:ae,loadWfTask:te,loanRows:ee,makeSnap:le,markBackup:se,markBadInputs:ie,matchQ:pe,money:a,monthToDate:de,monthlyIRR:re,months:oe,npvDiff:ce,num:t,numBlur:be,numFocus:me,numInput:ue,numKey:ve,numOf:fe,openPalette:he,orderTabsForQuery:xe,palKey:ge,panelEls:ye,panelParams:we,parseAmounts:Ce,parseDate:Me,parseNum:ke,pct:w,percentile:Te,plRank:Ee,plScoreCov:Se,plScoreDsr:_e,plScoreEmg:Ae,plScoreLev:Fe,plScoreSave:Ne,prePanels:We,prefetchAllChunks:Pe,presets:Re,printCover:Ie,printSheet:Le,psEsc:De,psInputs:Ke,psNotes:Oe,psResults:He,psText:Ye,pushRecent:Be,pushSearch:Ue,pwaStandalone:Ve,quickOf:Ge,rateOf:Qe,readJsonFile:Xe,readMonthGrid:qe,recentList:ze,recordWf:Je,refreshCounts:$e,refreshTableTools:Ze,refreshTrackMods:je,refreshWfBadge:nl,renderLoanTable:al,renderNext:tl,renderPalette:el,renderPresets:ll,renderSearchHist:sl,renderSnapCompare:il,renderSnapList:pl,renderTodayBar:dl,renderTrack:rl,renderWfTpl:ol,rentBuyAt:cl,restore:bl,runCalc:ml,runDeferredTaps:ul,save:vl,saveCmpA:fl,saveFav:hl,savePresets:xl,saveSnaps:gl,saveWfCust:yl,savedCat:wl,schemaInit:Cl,schemaMigrate:Ml,scrollResultIfDeepLink:kl,searchHist:Tl,setCat:El,setSub:Sl,setTheme:_l,shareCalc:Al,sharePayload:Fl,showErrorBox:Nl,showInstBar:Wl,showUpdateBar:Pl,snapNameOf:Rl,snapTipText:Il,snapshot:Ll,st0:Dl,stamp:Kl,startName:Ol,syncInstallUi:Hl,tabCatLabel:Yl,tabScore:Bl,tap:Ul,taxBy:Vl,toast:Gl,toggleWfStep:Ql,trimNum:Xl,unitFor:ql,updShown:zl,wfAllPaths:Jl,wfArchiveMonth:$l,wfArchivePut:Zl,wfAutoNext:jl,wfAutoStop:ns,wfAutoWalk:as,wfBar:ts,wfBindCustQ:es,wfBuildHandoff:ls,wfCarryMissing:ss,wfCarryQuery:is,wfCarryWarn:ps,wfCsvCell:ds,wfCustNameSave:rs,wfDayDiff:os,wfDetailRender:cs,wfEditPath:bs,wfEditReset:ms,wfEditSave:us,wfEditToggle:vs,wfFillCustSel:fs,wfHandoff:hs,wfHandoffCopy:xs,wfHandoffCsv:gs,wfHandoffPrint:ys,wfHasAnyData:ws,wfHideStep:Cs,wfKnownMods:Ms,wfLegacyToNew:ks,wfLoad:Ts,wfManSave:Es,wfMdHref:Ss,wfMdRender:_s,wfMdSave:As,wfMetaSave:Fs,wfMigrateLegacy:Ns,wfMonthKey:Ws,wfMonthRoll:Ps,wfMonthTouch:Rs,wfMoveStep:Is,wfNoteSave:Ls,wfNotifyCheck:Ds,wfNotifyGranted:Ks,wfNotifyPref:Os,wfNotifySend:Hs,wfNotifySetPref:Ys,wfNotifyStatus:Bs,wfNotifyToggle:Us,wfOpenInline:Vs,wfOpenTasks:Gs,wfPad2:Qs,wfPathMods:Xs,wfPlaceInline:qs,wfPlaceNear:zs,wfProgress:Js,wfRenderSummary:$s,wfRoleSaved:Zs,wfScopedPaths:js,wfSet:ni,wfSkipCurrent:ai,wfSkipSave:ti,wfStepKey:ei,wfStepShare:li,wfStepState:si,wfTaskAdd:ii,wfTaskBox:pi,wfTaskDel:di,wfTaskPending:ri,wfTaskSave:oi,wfTaskToggle:ci,wfTodayPick:bi,wfTodayStr:mi,wfUnhideStep:ui,wfVisiblePaths:vi,yuan:h,zOf:fi}=window.FC;function R(){var e=Math.max(0,t(n("fg-open"),0)),s=[];function c(o,u,g){Math.abs(o)>.005&&s.push({amt:o,day:Math.max(1,Math.min(30,Math.round(u))),name:g})}S(c,"pushEv");var b=Math.max(0,t(n("fg-in"),0));b>.005&&s.push({amt:b,day:Math.max(1,Math.min(30,Math.round(t(n("fg-ind"),25)))),name:"客户回款"}),c(-Math.max(0,t(n("fg-a"),0)),t(n("fg-ad"),10),"工资社保"),c(-Math.max(0,t(n("fg-b"),0)),t(n("fg-bd"),15),"供应商货款"),c(-Math.max(0,t(n("fg-c"),0)),t(n("fg-cd"),20),"税金"),c(-Math.max(0,t(n("fg-d"),0)),t(n("fg-dd"),5),"其他支出"),s.sort(function(o,u){return o.day-u.day});for(var m=e,x=e,p=0,d=0,i="",r=0,l=0;l<s.length;l++)m+=s[l].amt,r+=s[l].amt,m<x&&(x=m,p=s[l].day),m<-.005&&!d&&(d=s[l].day),i+="<tr"+(m<-.005?' class="c-bad"':"")+"><td>"+s[l].day+" 日</td><td>"+s[l].name+"</td><td>"+(s[l].amt>=0?"+":"−")+a(Math.abs(s[l].amt))+"</td><td>"+a(m)+"</td></tr>";i+="<tr><td>30 日</td><td><b>月末结存</b></td><td>—</td><td><b>"+a(m)+"</b></td></tr>",n("fg-body").innerHTML=i,n("fg-min").textContent=a(x),n("fg-minday").textContent=p?"第 "+p+" 天":"全程未下探",n("fg-gap").textContent=x<-.005?h(-x):"不需要，余额始终为正",n("fg-firstneg").textContent=d?"第 "+d+" 天开始不够付":"无",n("fg-end").textContent=h(m),n("fg-net").textContent=(r>=0?"+":"−")+a(Math.abs(r))+" 元",n("fg-note").textContent="资金计划按「钱真正进出账户的日期」排，不是发票日期——客户说月底付却压到下月 5 号到账，是资金链断掉的典型原因，票期、账期、到账日要分开记。月初余额为正、月中却出现负数（本例第 "+(d||0)+" 天）说明钱不是不够，是时点错配，靠挪付款日、票据贴现或短期授信过桥就能解决，别等到账上真没钱。这里没算票据贴现成本、授信提款利息，也没算月初现金之外的可动用额度，实际排期要把这些额度一起标进去。"}S(R,"calcFunding");function I(){var e=Math.max(0,t(n("fc-amt"),0)),s=Math.max(1,Math.round(t(n("fc-days"),90))),c=Math.max(0,t(n("fc-rate"),0))/100,b=Math.max(0,t(n("fc-fee"),0))/100,m=Math.min(100,Math.max(0,t(n("fc-margin"),0)))/100,x=Math.max(0,t(n("fc-loan"),0))/100,p=e*c*s/365,d=e*b,i=e*m,r=p+d,l=e-r-i,o=e>0?r/e*365/s:0,u=l>0?r/l*365/s:0,g=i*c*s/365,y=l>0?(r+g)/l*365/s:0,C=e*x*s/365,v=r-C;n("fc-net").textContent=a(l)+" 元",n("fc-int").textContent=a(p)+" 元",n("fc-feeamt").textContent=a(d)+" 元（"+w(b)+"）",n("fc-hold").textContent=a(i)+" 元",n("fc-cost").textContent=a(r)+" 元",n("fc-nominal").textContent=w(o),n("fc-real").textContent=w(u),n("fc-allin").textContent=w(y),n("fc-diff").textContent=(v>=0?"+":"")+a(v)+" 元"+(v>0?"（保理更贵）":"（保理更便宜）");var f=[30,60,90,120,180],M="",T;for(T=0;T<f.length;T++){var _=f[T],E=e*c*_/365+d,A=e-E-i,F=e>0?E/e*365/_:0,N=A>0?E/A*365/_:0,W=_===s;M+='<tr class="'+(W?"c-info":"")+'"><td>'+_+" 天"+(W?"（本次）":"")+"</td><td>"+a(E)+"</td><td>"+w(F)+"</td><td>"+w(N)+"</td></tr>"}n("fc-body").innerHTML=M,n("fc-note").textContent=" 这笔保理实际到账 "+a(l)+" 元，综合成本 "+a(r)+" 元，折成真实年化 "+w(u)+"。为什么真实年化比名义年化高：① 手续费按应收账款全额一次性收，不按天数摊；② 保证金被扣着但不计息，能用的钱变少了。 判断标准：拿真实年化去比自己的替代融资成本（流贷 "+w(x)+"）。本例保理比借流贷多花 "+a(v)+" 元，"+(v>0?"如果应收质量好、能拿到流贷，就先用流贷。":"保理反而更便宜，优先做保理。")+" 另外三个容易被忽略的点：有追索权保理本质是借款（应收继续挂在表上），无追索权才是真卖断（可以出表）；带追索权的话客户不还钱你要回购；保理商还会查买方资信，账期越长、买方越弱，费率越高。 表里可以看到：期限越短，手续费被摊得越薄，年化反而越高——所以拿保理给 30 天的应收做短期周转是最贵的。"}S(I,"calcFactoring");function L(){var e=Math.max(0,t(n("tn-buy"),0)),s=Math.max(0,t(n("tn-now"),0)),c=Math.max(0,t(n("tn-target"),0)),b=Math.max(0,t(n("tn-rate"),0))/100,m=Math.max(0,t(n("tn-markup"),0))/100,x=c-s,p=x>0?e*x/30:0,d=p*b*x/365,i=e*m,r=d-i,l=e>0?d/e:0;n("tn-gain").textContent=a(d)+" 元/月",n("tn-ext").textContent=(x>0?"+":"")+x+" 天"+(x<=0?"（没延长就不用谈）":""),n("tn-occ").textContent=a(p)+" 元",n("tn-cost").textContent=a(i)+" 元（"+w(m)+"）",n("tn-net").textContent=(r>=0?"+":"")+a(r)+" 元"+(r>=0?"（划算）":"（不划算）"),n("tn-crit").textContent=w(l),n("tn-year").textContent=a(r*12)+" 元";var o;r>0?o="接受：加价 "+w(m)+" 低于可承受上限 "+w(l):l>0?o="不接受：加价 "+w(m)+" 高于上限，最多能给到 "+w(l)+" 或要求降到 "+a(l*e)+" 元/月以内":o="不延长：没有可量的资金收益",n("tn-verdict").textContent=o;var u=[45,60,75,90],g="",y;for(y=0;y<u.length;y++){var C=u[y],v=C-s,f=v>0?e*v/30:0,M=f*b*v/365,T=e>0?M/e:0;g+='<tr class="'+(C===c?"c-info":"")+'"><td>'+C+" 天</td><td>"+a(f)+"</td><td>"+a(M)+"</td><td>"+w(T)+"</td></tr>"}n("tn-body").innerHTML=g,n("tn-note").textContent=" 账期从 "+s+" 天谈到 "+c+" 天，等于多占用供应商 "+a(p)+" 元，按你的资金成本 "+w(b)+" 算，这段无息资金值 "+a(d)+" 元/月。供应商为此要加价 "+a(i)+" 元/月，净 "+(r>=0?"赚 ":"亏 ")+a(Math.abs(r))+" 元/月，一年 "+a(r*12)+" 元。 换算成一句能直接谈判的话：加价率只要低于 "+w(l)+" 就接，高于就要求打折或用别的方式补（比如免运费、缩短交期、承担包装）。 三个提醒：① 这是现金流游戏，不是利润游戏——延长账期不增加利润，只改善现金，供应商加价却是实打实的成本进毛利；② 别忘了早付折扣（2/10 net 30 那种）的反面：放弃折扣的年化成本通常远高于资金成本，谈判时先算清折不折得起；③ 账期拉长会得罪小供应商（他们也缺钱），把最长账期留给大供应商，小供应商用准时付款换价格。"}S(L,"calcApTalk");function D(){var e=t(n("wk-open"),0),s=Math.max(0,t(n("wk-in"),0)),c=Math.max(0,t(n("wk-out"),0)),b=Math.max(0,t(n("wk-e1"),0)),m=Math.round(t(n("wk-w1"),0)),x=Math.max(0,t(n("wk-e2"),0)),p=Math.round(t(n("wk-w2"),0)),d=Math.max(0,t(n("wk-safe"),0)),i=e,r=e,l=0,o=[],u="",g,y=0,C=0;for(g=1;g<=13;g++){var v=(g===m?-b:0)+(g===p?-x:0),f=s-c+v;i+=f,y+=s,C+=c-v,i<r&&(r=i,l=g),i<d&&o.push(g),u+="<tr"+(i<d?' class="c-warn"':"")+"><td>第 "+g+" 周</td><td>"+a(s)+"</td><td>"+a(c)+"</td><td>"+(v===0?"—":a(v))+"</td><td>"+a(i)+"</td></tr>"}n("wk-body").innerHTML=u;var M=d-r;n("wk-min").textContent=a(r)+" 元",n("wk-minw").textContent="第 "+l+" 周",n("wk-below").textContent=o.length+" 周"+(o.length?"（第 "+o.join("、")+" 周）":""),n("wk-gap").textContent=M>0?a(M)+" 元":"0 元（没跌破）",n("wk-end").textContent=a(i)+" 元",n("wk-net").textContent=(i-e>=0?"+":"")+a(i-e)+" 元";var T;r<0?T="危险：第 "+l+" 周现金会转负，必须提前安排融资或推迟付款":M>0?T="偏紧："+o.length+" 周低于安全线，最低点距安全线差 "+a(M)+" 元，先备好授信额度":T="安全：13 周内始终高于安全线，最低 "+a(r)+" 元",n("wk-verdict").textContent=T,n("wk-note").textContent=" 13 周最低现金 "+a(r)+" 元，出现在第 "+l+" 周；期末 "+a(i)+" 元，13 周净变动 "+a(i-e)+" 元。 这张表的用处不是预测得多准，而是提前看清「哪一周会紧」——现金流危机几乎都是时点错配，不是全年没钱。 判断顺序：先看会不会转负（要立刻安排），再看能否守住安全线（备授信），最后看期末是否在改善（结构性失血还是季节性）。 三条止血手段按优先级：① 催收（把大客户的收款日往前挪，比融资便宜）；② 谈付款节奏（工资、税金、货款错开同一周）；③ 融资（银行授信、票据、保理），这一步放最后，因为最贵。 口径提醒：按「钱真正进出账户的日期」排，不是按合同日期；税金和工资是硬时点不能挪；已开未收的承兑汇票、已被质押的保证金不算可用现金，别把它们算进期初。"}S(D,"calcCash13");function K(){var e=Math.max(0,t(n("nt-face"),0)),s=Math.max(1,Math.round(t(n("nt-days"),180))),c=Math.max(0,t(n("nt-rate"),0))/100,b=Math.max(0,t(n("nt-openfee"),0))/100,m=Math.min(100,Math.max(0,t(n("nt-margin"),0)))/100,x=Math.max(0,t(n("nt-cap"),0))/100,p=Math.max(0,t(n("nt-loan"),0))/100,d=e*c*s/360,i=e-d,r=e*b,l=e*m*x*s/360,o=d+r+l,u=e>0?o/e*360/s:0,g=e*p*s/360,y=g-o;n("nt-net").textContent=a(i)+" 元",n("nt-int").textContent=a(d)+" 元（按 360 天）",n("nt-real").textContent=i>0?w(d/i*360/s):"—",n("nt-ofee").textContent=a(r)+" 元",n("nt-mcost").textContent=a(l)+" 元",n("nt-total").textContent=a(o)+" 元（占票面 "+w(e>0?o/e:0)+"）",n("nt-any").textContent=w(u),n("nt-loanint").textContent=a(g)+" 元",n("nt-save").textContent=(y>=0?"省 ":"贵 ")+a(Math.abs(y))+" 元";var C=[30,60,90,180,270,360],v="",f;for(f=0;f<C.length;f++){var M=C[f],T=e*c*M/360,_=T+r+e*m*x*M/360,E=e>0?_/e*360/M:0;v+='<tr class="'+(M===s?"c-info":"")+'"><td>'+M+" 天</td><td>"+a(T)+"</td><td>"+a(e-T)+"</td><td>"+w(E)+"</td></tr>"}n("nt-body").innerHTML=v,n("nt-note").textContent=" 票面 "+a(e)+" 元的票据，贴现息 "+a(d)+"，实际到账 "+a(i)+"，贴现这一段折年化 "+w(d/(i||1)*360/s)+"。 但开票环节还有两块成本：手续费 "+a(r)+"（按票面、一次性）、保证金 "+a(e*m)+" 被银行占着，按你的资金成本折 "+a(l)+"。 加上这两块，票据全链条折年化 "+w(u)+"，和同期借流贷 "+w(p)+" 比"+(y>=0?"省 "+a(y):"贵 "+a(Math.abs(y)))+" 元。 三个实务点：① 贴现按 360 天计息，别用 365 天算；② 银行承兑汇票信用好、贴现率低，商票贴现率通常高出一大截，还要看开票人资质；③ 保证金比例是隐形成本——30% 保证金意味着你实际只拿到 70% 的钱，却付了 100% 的手续费。 决策口诀：票据成本要比的是「不贴现、等到期的机会成本」或「流贷利率」，不是比票面。"}S(K,"calcBill");function O(){var e=Math.max(0,t(n("sw-amt"),0)),s=Math.max(0,t(n("sw-mon"),0)),c=Math.max(0,t(n("sw-rate"),0))/100,b=Math.min(1,Math.max(0,t(n("sw-disc"),0))/100),m=Math.max(0,t(n("sw-bank"),0))/100,x=Math.max(0,t(n("sw-com"),0))/100,p=Math.max(0,t(n("sw-bd"),0))/100,d=Math.max(0,t(n("sw-cd"),0))/100,i=s/12,r=1+c*i;function l(F){return r>0?F/r:F}S(l,"pvEnd");var o=l(e),u=e*(1-b),g=e*(1+m),y=e*(1+x),C=[["立即付（享 "+w(b,1)+" 折扣）",u,u,0],["现汇立即付（无折扣）",e,e,0],["银行承兑 "+k(s,0)+" 个月",g,l(g),i],["商业承兑 "+k(s,0)+" 个月",y,l(y),i],["月结 "+k(s,0)+" 个月（基准）",e,o,i]],v=0,f;for(f=0;f<C.length;f++)C[f][2]<C[v][2]&&(v=f);var M="";for(f=0;f<C.length;f++){var T=C[f][2]-o,_=f===v?' class="c-info"':T>0?' class="c-warn"':"";M+="<tr"+_+"><td>"+C[f][0]+(f===v?" ◀ 最省":"")+"</td><td>"+a(C[f][1])+"</td><td>"+a(C[f][2])+"</td><td>"+(T===0?"基准":(T>0?"+":"")+a(T))+"</td></tr>"}n("sw-body").innerHTML=M;var E=i>0?b/(1-b)/i:NaN,A=u-o;n("sw-big").textContent=a(Math.abs(A)),n("sw-discrate").textContent=isFinite(E)?w(E):"—",n("sw-cost").textContent=w(c),n("sw-verdict").textContent=isFinite(E)?E>c?"该提前付（折扣收益高于资金成本）":"别为折扣提前付（折扣收益低于资金成本）":"—",n("sw-base").textContent=h(o),n("sw-bankdisc").textContent=h(g*p*i),n("sw-comdisc").textContent=h(y*d*i),n("sw-bankgap").textContent=h(l(g)-o),n("sw-comgap").textContent=h(l(y)-o),n("sw-note").textContent=" 比法：把每种方式的钱都折算到「现在」这个时点（单利、按 "+k(i*12,0)+" 个月 / 12 计），再看谁便宜。 现汇折扣这笔：拿到 "+w(b,1)+" 折扣相当于年化 "+(isFinite(E)?w(E):"—")+"，"+(isFinite(E)&&E>c?"高于":"低于")+"你的资金成本 "+w(c)+"，所以"+(isFinite(E)&&E>c?"值得提前付":"不值得为折扣提前付款")+"，月结反而"+(A>=0?"省 "+h(A):"多花 "+h(-A))+"。 票据这头：开票加价只是名义，真正的钱是供应商拿去贴现的利息——银承 "+h(g*p*i)+"、商承 "+h(y*d*i)+"，商承贴现率高是因为它是企业信用、不是银行信用，供应商往往还要再加价或直接拒收。 口径提醒：贴现一般按 360 天计息；银承还有开票手续费和保证金占用，这部分没算进加价里，实际成本会更高；反过来，如果你自己是收票方，收到的票要贴现，同样按这个成本从毛利里扣。"}S(O,"calcSettleWay");function H(){var e=Math.max(0,t(n("crd-sales"),0)),s=Math.max(0,t(n("crd-net"),0)),c=Math.max(0,t(n("crd-coll"),0)),b=Math.min(1,Math.max(0,t(n("crd-collrate"),0))/100),m=Math.max(0,t(n("crd-creditrate"),0))/100,x=Math.max(0,t(n("crd-guar"),0)),p=Math.max(0,t(n("crd-used"),0)),d=Math.max(0,t(n("crd-need"),0)),i=c*b,r=e*m,l=i+r+x,o=Math.max(0,l-p),u=d>0?o/d:NaN,g=Math.max(0,s*.7-p),y=b>0?Math.max(0,d*2-o)/b:NaN,C=l>0?i/l:NaN,v=isFinite(C)?C>.6?"偏重抵押，想再扩额得先加抵押物":C<.35?"信用额度为主，注意银行抽贷":"抵押与信用较均衡":"—";n("crd-big").textContent=a(o),n("crd-c1").textContent=h(i),n("crd-c2").textContent=h(r),n("crd-c3").textContent=h(x),n("crd-total").textContent=h(l),n("crd-split").textContent=a(p)+" / "+a(o)+" 元",n("crd-cover").textContent=isFinite(u)?k(u,2)+" 倍":"—",n("crd-space").textContent=h(g),n("crd-extra").textContent=isFinite(y)?h(y):"—",n("crd-flex").textContent=v;var f=[["抵押类（房产/土地/设备）",h(i),"评估 "+a(c)+" × 抵押率 "+w(b,0)],["信用类（看流水与报表）",h(r),"销售 "+a(e)+" × 系数 "+w(m,0)],["保证类（担保公司/股东）",h(x),"按可增额度直接取数"],["理论总额",h(l),"三类相加，实际以银行审批为准"],["已用授信",h(p),l>0?"占总额 "+w(p/l,0):"—"],["可用余额",h(o),isFinite(u)?"可覆盖月均需求 "+k(u,2)+" 倍":"—"]],M="",T;for(T=0;T<f.length;T++){var _=T===5&&isFinite(u)&&u<1;M+="<tr"+(_?' class="c-warn"':"")+"><td>"+f[T][0]+"</td><td>"+f[T][1]+"</td><td>"+f[T][2]+"</td></tr>"}n("crd-body").innerHTML=M,n("crd-note").textContent=" 结论怎么用：理论总额 "+h(l)+"、已用 "+h(p)+"，手上还有 "+h(o)+(isFinite(u)?"，能顶 "+k(u,2)+" 个月的月均资金需求":"")+"。"+(isFinite(u)&&u<1?" 覆盖不到 1 倍，属于偏紧，先把回款节奏和付款周期捋一遍，再谈扩额。":" 覆盖超过 1 倍，短期不缺，重点转到额度的期限结构和成本上。")+" 注意三点：① 抵押率各行不同，房产常见 50%–70%、厂房土地更低，设备要打折且不好处置；② 信用额度几乎都盯着销售收入和纳税流水，报表一旦下滑银行会缩额甚至抽贷，这是中小企业最常见的断粮方式；③ 净资产 70% 的负债率是常见的内部风控线，本例还能新增 "+h(g)+"，超了即使有抵押物也难批。 想覆盖 2 倍需求，按当前抵押率还需再拿出 "+(isFinite(y)?h(y):"—")+" 的抵押物评估值。"}S(H,"calcCreditLine");function Y(){var e=Math.max(0,t(n("fxg-usd"),0)),s=Math.max(0,t(n("fxg-signed"),0)),c=Math.max(0,t(n("fxg-book"),0)),b=Math.max(0,t(n("fxg-spot"),0)),m=Math.max(0,t(n("fxg-spread"),0))/100,x=Math.max(0,t(n("fxg-fwd"),0)),p=e*s,d=e*c,i=e*b,r=i*m,l=i-r,o=i-d,u=i-p,g=e*x,y=g-i,C=i*.01;n("fxg-big").textContent=(o>=0?"+":"−")+a(Math.abs(o)),n("fxg-signedout").textContent=h(p),n("fxg-spotout").textContent=h(i),n("fxg-loss").textContent=(u>=0?"+":"−")+a(Math.abs(u))+" 元",n("fxg-bookout").textContent=h(d),n("fxg-fee").textContent=h(r),n("fxg-cash").textContent=h(l),n("fxg-fwdout").textContent=(y>=0?"+":"−")+a(Math.abs(y))+" 元",n("fxg-exp").textContent=h(C);var v=[["签约 / 报价汇率",k(s,4),h(p),"—"],["账面记账汇率",k(c,4),h(d),(d-p>=0?"+":"−")+a(Math.abs(d-p))],["收款日即期汇率",k(b,4),h(i),(u>=0?"+":"−")+a(Math.abs(u))],["远期锁汇价",k(x,4),h(g),(g-p>=0?"+":"−")+a(Math.abs(g-p))],["实际到账（扣点差）","—",h(l),(l-p>=0?"+":"−")+a(Math.abs(l-p))]],f="",M;for(M=0;M<v.length;M++){var T=M===2&&u<0||M===4&&l<p;f+="<tr"+(T?' class="c-warn"':"")+"><td>"+v[M][0]+"</td><td>"+v[M][1]+"</td><td>"+v[M][2]+"</td><td>"+v[M][3]+"</td></tr>"}n("fxg-body").innerHTML=f,n("fxg-note").textContent=" 两笔账别混：① 汇兑损益是 "+(o>=0?"收益 ":"损失 ")+h(Math.abs(o))+"——账面按 "+k(c,4)+" 记的应收 "+h(d)+"，实际按 "+k(b,4)+" 收，差额进财务费用；② 相对当初报价 "+k(s,4)+" 少了 "+h(Math.abs(u))+"，这才是生意层面真正被吃掉的毛利，报价时若按 "+k(s,4)+" 算利润，这笔等于白干一部分。 结汇点差 "+w(m)+" 又吃掉 "+h(r)+"，实际到账 "+h(l)+"。 怎么防：汇率每波动 1%，这笔业务的敞口就是 "+h(C)+"；超过毛利一半的单子就该锁汇。远期按 "+k(x,4)+" 锁住能多拿 "+h(Math.abs(y))+"（本例相当于把不确定性换成确定收益），期权则保留下行保护但要先付权利金。 口径提醒：外币货币性项目期末按即期汇率折算，差额进财务费用—汇兑损益；收到的美元若留在账户上不结汇，汇率变动会继续影响账面，这也是常见的「利润被汇率吃掉」的来源。"}S(Y,"calcFxGain");function B(){var e=Math.max(0,t(n("tp-cost"),0)),s=Math.max(0,t(n("tp-price"),0)),c=Math.max(0,t(n("tp-inner"),0)),b=Math.min(1,Math.max(0,t(n("tp-ratea"),0)/100)),m=Math.min(1,Math.max(0,t(n("tp-rateb"),0)/100)),x=Math.max(0,t(n("tp-lo"),0)/100),p=Math.max(0,t(n("tp-hi"),0)/100);function d(A){var F=A-e,N=s-A;return{pa:F,pb:N,ta:F*b,tb:N*m,tt:F*b+N*m}}S(d,"part");var i=d(c),r=e*(1+x),l=e*(1+p),o=d(r),u=d(l),g=Math.min(o.tt,u.tt),y=i.tt-g,C=100*(b-m);n("tp-big").textContent=k(i.tt,2),n("tp-a").textContent=k(i.pa,2)+" / "+k(i.ta,2)+" 万元",n("tp-b").textContent=k(i.pb,2)+" / "+k(i.tb,2)+" 万元",n("tp-profit").textContent=k(s-e,2)+" 万元（定价怎么变都不变）",n("tp-rate").textContent=s>e?w(i.tt/(s-e),2):"—",n("tp-low").textContent=k(r,2)+" 万元（税负 "+k(o.tt,2)+"）",n("tp-high").textContent=k(l,2)+" 万元（税负 "+k(u.tt,2)+"）",n("tp-save").textContent=y>0?"省 "+k(y,2)+" 万元":"当前定价已在区间内较优点",n("tp-per").textContent=(C>=0?"省 ":"多交 ")+k(Math.abs(C),2)+" 万元（税率差 "+w(Math.abs(b-m),0)+"）";for(var v=[],f=[r,c,l,s],M=0;M<f.length;M++){var T=d(f[M]);v.push([k(f[M],2),T.ta,T.tb,T.tt])}for(var _="",E=0;E<v.length;E++)_+="<tr"+(E===1?' class="c-info"':E===0?' class="c-soft"':"")+"><td>"+v[E][0]+"</td><td>"+k(v[E][1],2)+"</td><td>"+k(v[E][2],2)+"</td><td>"+k(v[E][3],2)+"</td></tr>";n("tp-body").innerHTML=_,n("tp-note").textContent="集团赚的总额是 "+k(s-e,2)+" 万元，一分不会变；能被「安排」的只有这些利润在哪个税率下交税。把利润往低税率一方挪，每挪 100 万元省 "+k(Math.abs(C),2)+" 万元（等于两边税率差）。但定价必须有支持：成本加成法要能说明加成率的可比性，否则税务机关有权按合理方法核定，补税还加利息；跨境还要叠加关税、预提所得税（股息 10%、利息/特许权 10% 或协定优惠）和同期资料准备义务，别只盯企业所得税。"}S(B,"calcTrPrice");function U(){var e=Math.max(0,t(n("pool-idle"),0)),s=Math.max(0,t(n("pool-a"),0)),c=Math.max(0,t(n("pool-b"),0)),b=Math.max(0,t(n("pool-in"),0))/100,m=Math.max(0,t(n("pool-out"),0))/100,x=Math.max(0,t(n("pool-demand"),0))/100,p=Math.min(1,Math.max(0,t(n("pool-rate"),100)/100)),d=Math.max(0,t(n("pool-wealth"),0))/100,i=Math.max(0,t(n("pool-equity"),0)),r=e*p,l=Math.min(r,s+c),o=s+c,u=l*b,g=l*m-l*x,y=Math.max(0,r-l),C=y*d,v=g+C,f=i>0?l/i:0,M=i*2;n("pool-big").textContent=(v>=0?"":"−")+a(Math.abs(v)),n("pool-pooled").textContent=h(r)+"（可归集 "+w(p,0)+"）",n("pool-loans").textContent=h(l)+(l<o?"（缺口 "+a(o-l)+" 元仍要外部融资）":"（缺口已全覆盖）"),n("pool-int").textContent=h(u)+"（A "+a(s*b)+" / B "+a(c*b)+"）",n("pool-rest").textContent=h(C)+"（闲置 "+a(y)+" 元 × "+w(d,1)+"）",n("pool-all").textContent=h(v)+" / "+w(e>0?v/e:0,2),n("pool-ratio").textContent=k(f,2)+" 倍（上限 2 倍，即 "+a(M)+" 元）",n("pool-verdict").textContent=f<=2?"利息可全额税前扣除":"超债资比：超额 "+a(l-M)+" 元对应利息不得扣除";for(var T=[["母公司归集闲置资金",a(r),"—","转入资金池"],["子公司 A 内部借款",a(Math.min(s,l)),w(b,2),a(Math.min(s,l)*b)],["子公司 B 内部借款",a(Math.min(c,Math.max(0,l-s))),w(b,2),a(Math.min(c,Math.max(0,l-s))*b)],["对照：外部流贷同额",a(l),w(m,2),a(l*m)],["剩余资金理财",a(y),w(d,2),a(C)]],_="",E=0;E<T.length;E++)_+="<tr"+(E===3?' class="c-warn"':E===4?' class="c-info"':"")+'><td class="tal">'+T[E][0]+"</td><td>"+T[E][1]+"</td><td>"+T[E][2]+"</td><td>"+T[E][3]+"</td></tr>";n("pool-body").innerHTML=_,n("pool-note").textContent="资金池的收益不是「子公司付的利息」——那笔钱在集团合并报表里会互相抵销，等于没赚。真正赚的是「子公司少付外部利息 − 母公司闲置资金本来能赚的那点活期」，本例差额主要来自这个利差。税务上要盯两点：一是关联方借款利息必须符合独立交易原则（利率要有可比依据、要有借款合同和资金流水），二是债资比 2:1（金融企业 5:1）超限部分利息不得扣除。另外资金池要做成「委托贷款」或持牌财务公司模式，直接划转在部分地区和银行会被认定为无真实交易背景。"}S(U,"calcPooling");function V(){var e=Math.max(0,t(n("crl-buy"),0)),s=Math.max(0,t(n("crl-term"),0)),c=Math.max(0,t(n("crl-vat"),0))/100,b=Math.min(1,Math.max(0,t(n("crl-gm"),0)/100)),m=Math.max(0,t(n("crl-netw"),0)),x=Math.min(1,Math.max(0,t(n("crl-lev"),0)/100)),p=Math.max(0,t(n("crl-late"),0)),d=Math.max(0,t(n("crl-cost"),0))/100,i=e*(1+c)/365*s,r=i*d,l=e*b,o=r>0?l/r:0,u=e*.2,g=m*.1,y=i*1.2,C=Math.min(u,g,y),v=100;x>.7?v-=20:x>=.6&&(v-=10),v-=Math.floor(p/2)*10,p>=3&&(v-=10);var f=.01+p*.01+(x>.7?.02:0),M=C*f;n("crl-big").textContent=a(C),n("crl-ar").textContent=h(i)+"（含税销售 ÷ 365 × "+k(s,0)+" 天）",n("crl-cost2").textContent=h(r),n("crl-mult").textContent=k(o,2)+" 倍"+(o<5?"（薄，扛不住拖欠）":"（厚，值得放）"),n("crl-score").textContent=k(Math.max(0,v),0)+" 分（负债率 "+w(x,0)+"，逾期 "+k(p,0)+" 次）",n("crl-pd").textContent=w(f,2),n("crl-el").textContent=h(M),n("crl-verdict").textContent=l>M*5?"可放："+k(o,1)+" 倍毛利覆盖，预期损失只占毛利 "+w(l>0?M/l:0,2):"谨慎：预期损失已接近毛利，要求预付或提供担保/信保";for(var T=[["年采购额的 20%",a(e)+" × 20%",a(u)],["客户净资产的 10%",a(m)+" × 10%",a(g)],["账期占用的 1.2 倍",a(i)+" × 1.2",a(y)],["取最小 → 建议额度","min(以上三项)",a(C)]],_="",E=0;E<T.length;E++)_+="<tr"+(E===3?' class="c-info"':"")+'><td class="tal">'+T[E][0]+'</td><td class="tal">'+T[E][1]+"</td><td>"+T[E][2]+"</td></tr>";n("crl-body").innerHTML=_,n("crl-note").textContent="额度不是拍出来的，是三条硬约束里最小的那条：他一年能买多少（20%）、他自己有多少底子（净资产 10%）、以及他占你多少钱（应收占用的 1.2 倍）。真正决定赚不赚的是「毛利 ÷ 占用成本」——毛利薄的生意，一笔坏账能吃掉好几单的利润。放账期前先查两样：涉诉与被执行记录、有没有拖欠别家的货款。有条件的话，要求客户提供担保、投保信用险，或者做有追索权保理，把风险先转移出去再谈额度。"}S(V,"calcCreditLimit");function G(){var e=t(n("plg-ar"),0),s=t(n("plg-ratio"),0)/100,c=t(n("plg-rate"),0)/100,b=Math.max(1,t(n("plg-days"),90)),m=t(n("plg-fee"),0)/100,x=t(n("plg-fact"),0)/100,p=e*s,d=p*c*b/360,i=p*m,r=d+i,l=p>0?r/p*360/b:0,o=e*x*b/360,u=o-r,g=e-p;n("plg-big").textContent=k(l*100,2),n("plg-amt").textContent=a(p)+" 元（"+w(s,0)+" × "+a(e)+"）",n("plg-int").textContent=a(d)+" 元",n("plg-feeout").textContent=a(i)+" 元",n("plg-tot").textContent=a(r)+" 元",n("plg-factout").textContent=a(o)+" 元（按 "+w(x,2)+" 全额计息）",n("plg-diff").textContent=(u>=0?"保理多花 ":"保理少花 ")+a(Math.abs(u))+" 元",n("plg-rest").textContent=a(g)+" 元（"+w(1-s,2)+"）",n("plg-note").textContent=(u>=0?"这笔业务质押贷款更便宜，省 "+a(u)+" 元。":"这笔业务保理反而更便宜，因为保理能按全额融资、把更多应收账款变成现金。")+"两者的差别不只在利率：质押是「借钱」，应收账款还在你账上、要继续催收、要计提坏账，贷款到期必须还；保理是「卖债权」，无追索权保理才能出表（拿到银行的放弃追索确认），有追索权的保理实质仍是融资、不能出表还要确认负债。另外质押率通常 70%–90%，剩下一截仍压在自己身上，客户回款直接进监管账户、挪用会被认定违规。"}S(G,"calcPledgeLoan");function Q(){var e=t(n("lbu-price"),0),s=t(n("lbu-rent"),0),c=Math.max(1,Math.round(t(n("lbu-years"),8))),b=t(n("lbu-rate"),0)/100,m=t(n("lbu-tax"),0)/100,x=t(n("lbu-maint"),0),p=t(n("lbu-resid"),0),d=b>0?(1-Math.pow(1+b,-c))/b:c,i=Math.pow(1+b,-c),r=s*(1-m),l=r*d,o=e/c,u=o*m*d,g=x*(1-m)*d,y=p*(1-m),C=y*i,v=e+g-u-C,f=v-l,M=d>0?v/((1-m)*d):0;n("lbu-big").textContent=a(Math.abs(f))+(f>=0?"（租赁更省）":"（购买更省）"),n("lbu-lse").textContent=a(r)+" / "+a(l)+" 元",n("lbu-buy").textContent=a(v)+" 元（买价 "+a(e)+" ＋ 维护 "+a(g)+" − 税盾 "+a(u)+" − 残值 "+a(C)+"）",n("lbu-shield").textContent=a(u)+" 元（年折旧 "+a(o)+" × "+w(m,0)+"）",n("lbu-mr").textContent=a(g)+" / "+a(C)+" 元（残值税后 "+a(y)+"）",n("lbu-crit").textContent=a(M)+" 元/年（超过这个租金就该买）",n("lbu-note").textContent="比的是「税后现金流现值」，不是租金总额和买价：租赁租金当期全额可扣税，购买的钱要通过每年折旧慢慢抵税（税盾现值 "+a(u)+"），期末残值还要交处置所得税。本案例租赁现值 "+a(l)+" vs 购买现值 "+a(v)+"，"+(f>=0?"租赁更省 ":"购买更省 ")+a(Math.abs(f))+" 元；临界年租金 "+a(M)+" 元。真正决定胜负的是折现率与残值假设：折现率高、残值低、租期短，租赁更容易赢；能拿到加速折旧或一次性税前扣除优惠、且残值高的资产，购买通常更划算。别忘了租赁还有额度占用、提前解约罚则和资产不归自己的问题，购买则压现金流、占授信。"}S(Q,"calcLeaseBuy");function X(){for(var e=[],s=1;s<=3;s++){var c=Math.max(0,t(n("lnl-a"+s),0)),b=Math.max(0,t(n("lnl-r"+s),0)),m=Math.max(0,t(n("lnl-m"+s),0));c>0&&e.push({n:s,a:c,r:b,mo:m})}for(var x=Math.max(0,t(n("lnl-cap"),0)),p=0,d=0,i=0;i<e.length;i++)p+=e[i].a,d+=e[i].a*e[i].r/100;var r=p>0?d/p*100:0,l=d/12,o=l*x,u=d-o;n("lnl-big").textContent=k(r,2),n("lnl-total").textContent=a(p)+"（"+e.length+" 笔）",n("lnl-mi").textContent=a(d)+" / "+a(l),n("lnl-capint").textContent=a(o)+"（月利息 × "+x+" 个月）",n("lnl-expint").textContent=a(u);for(var g=null,y=0;y<e.length;y++)(!g||e[y].mo<g.mo)&&(g=e[y]);n("lnl-next").textContent=g?"第 "+Math.round(g.mo)+" 个月：借款"+"①②③".charAt(g.n-1)+" "+a(g.a):"—";for(var C="",v=0;v<e.length;v++){var f=e[v];C+='<tr><td class="tal">借款'+"①②③".charAt(f.n-1)+"</td><td>"+a(f.a)+"</td><td>"+k(f.r,2)+"%</td><td>"+Math.round(f.mo)+"</td><td>"+a(f.a*f.r/100)+"</td><td>"+a(f.a*f.r/100/12)+"</td></tr>"}C+='<tr class="c-info"><td class="tal">合计</td><td>'+a(p)+"</td><td>"+k(r,2)+"%</td><td>—</td><td>"+a(d)+"</td><td>"+a(l)+"</td></tr>",n("lnl-body").innerHTML=C,n("lnl-note").textContent="加权平均利率 "+k(r,2)+"% 是所有借款按金额加权的一年成本。利息资本化：专门借款先资本化（闲置收益可冲减），一般借款按加权平均利率；本表按「月利息 × 资本化月数」粗算为 "+a(o)+"，实际要按累计资产支出加权平均。费用化部分进财务费用，直接影响当期利润。"}S(X,"calcLoanLedger");function q(){var e=t(n("exr-fob"),5e5),s=t(n("exr-collect"),46e4),c=t(n("exr-rate"),7.1),b=t(n("exr-rateset"),7.08),m=t(n("exr-spot"),7.05),x=t(n("exr-over"),30),p=t(n("exr-warn"),6)/100,d=Math.max(0,e-s),i=(b-c)*s+(m-c)*d,r=d*m,l=r*p/365*x,o=e>0?s/e:0;n("exr-big").textContent=k(d,2),n("exr-cr").textContent=w(o,2),n("exr-fx").textContent=h(i),n("exr-cny").textContent=a(r),n("exr-occ").textContent=a(l),n("exr-verdict").textContent=o>=.95?"收汇率正常（≥95%）":o>=.9?"收汇率偏低，要盯紧（90%–95%）":"收汇率风险（<90%），该催收了",n("exr-note").textContent="汇兑损益 = 已收汇按收汇日汇率重估 + 未收汇按期末即期重估；逾期成本只算未收汇部分的资金占用（年化 "+p*100+"%，按 "+x+" 天）。报关（FOB）与收汇要逐笔核销，差 4,000 美元以上让单证查核销单。"}S(q,"calcExcoll");function z(){var e=t(n("fxh-expo"),1e6),s=t(n("fxh-spot"),7.1),c=t(n("fxh-fwd"),7.05),b=t(n("fxh-ratio"),80)/100,m=t(n("fxh-fee"),.1)/100,x=t(n("fxh-down"),6.9),p=e*b,d=e-p,i=p*c,r=d*x,l=i+r,o=e*x,u=l-o,g=(s-c)*p,y=i*m,C=u-g-y,v=p>0?c-y/p:c;n("fxh-big").textContent=h(C),n("fxh-locked").textContent=a(p)+" 美元",n("fxh-unlocked").textContent=a(d)+" 美元",n("fxh-hedged").textContent=a(l),n("fxh-noh").textContent=a(o),n("fxh-diff").textContent=h(u),n("fxh-cost").textContent=a(g),n("fxh-feekv").textContent=a(y),n("fxh-be").textContent=k(v,5),n("fxh-note").textContent="净收益 = 套保多收（锁汇部分按远期、未锁按情景即期）− 贴水成本（即期与远期的价差×锁汇额）− 手续费。盈亏平衡汇率 = 远期 − 手续费/锁汇额，情景即期低于它套保就赚。套保目的是锁定成本，不是博方向。"}S(z,"calcFxhedge");function J(){var e=[t(n("bk-b1"),12e5),t(n("bk-b2"),8e5),t(n("bk-b3"),5e5),t(n("bk-b4"),3e5)],s=[t(n("bk-s1"),1200500),t(n("bk-s2"),78e4),t(n("bk-s3"),5e5),t(n("bk-s4"),3e5)],c=t(n("bk-restrict"),1e5),b=e[0]+e[1]+e[2]+e[3],m=s[0]+s[1]+s[2]+s[3],x=m-b,p=b-c;n("bk-big").textContent=a(p),n("bk-book").textContent=a(b),n("bk-stmt").textContent=a(m),n("bk-diff").textContent=(x>=0?"+":"")+a(x),n("bk-restkv").textContent=a(c),n("bk-note").textContent="账面余额与对账单余额的差就是未达账项（企业已收银行未收、企业已付银行未付、银行已收企业未收、银行已付企业未付），要逐笔用「银行余额调节表」对平；受限资金（保证金、冻结款）账面有但用不了，所以可用资金 = 账面合计 − 受限。"}S(J,"calcBankacct");export const PANELS={funding:`  <section class="panel" id="panel-funding">
    <div class="cols">
  <div class="card">
    <h2>输入（本月 30 天资金计划）</h2>
    <label class="f"><span>月初可用余额（元）</span>
      <input id="fg-open" type="number" inputmode="decimal" min="0" step="1000" value="200000"></label>
    <label class="f"><span>预计回款金额（元）</span>
      <input id="fg-in" type="number" inputmode="decimal" min="0" step="1000" value="600000"></label>
    <label class="f"><span>回款到账日（几号）</span>
      <input id="fg-ind" type="number" inputmode="numeric" min="1" max="30" step="1" value="25"></label>
    <label class="f"><span>工资（元）/ 发放日</span>
      <span class="row"><input id="fg-a" type="number" inputmode="decimal" min="0" step="1000" value="150000"><input id="fg-ad" type="number" inputmode="numeric" min="1" max="30" step="1" value="10"></span></label>
    <label class="f"><span>货款（元）/ 付款日</span>
      <span class="row"><input id="fg-b" type="number" inputmode="decimal" min="0" step="1000" value="300000"><input id="fg-bd" type="number" inputmode="numeric" min="1" max="30" step="1" value="15"></span></label>
    <label class="f"><span>税金（元）/ 缴款日</span>
      <span class="row"><input id="fg-c" type="number" inputmode="decimal" min="0" step="1000" value="80000"><input id="fg-cd" type="number" inputmode="numeric" min="1" max="30" step="1" value="20"></span></label>
    <label class="f"><span>其他支出（元）/ 付款日</span>
      <span class="row"><input id="fg-d" type="number" inputmode="decimal" min="0" step="1000" value="60000"><input id="fg-dd" type="number" inputmode="numeric" min="1" max="30" step="1" value="5"></span></label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">本月最低余额</span><strong id="fg-min">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>最低余额出现在</span><b id="fg-minday">—</b></li>
      <li><span>需要提前备的头寸（缺口）</span><b id="fg-gap">—</b></li>
      <li><span>首次转负的日子</span><b id="fg-firstneg">—</b></li>
      <li><span>月末余额</span><b id="fg-end">—</b></li>
      <li><span>当月净流入</span><b id="fg-net">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>日期</th><th>事项</th><th>金额</th><th>当日余额</th></tr></thead>
        <tbody id="fg-body"></tbody>
      </table>
    </div>
    <p class="hint" id="fg-note"></p>
  </div>
    </div>
  </section>
`,factoring:`  <section class="panel" id="panel-factoring">
    <div class="cols">
  <div class="card">
    <h2>输入（一笔应收做保理 / 贴现）</h2>
    <label class="f"><span>应收账款金额（元）</span>
      <input id="fc-amt" type="number" inputmode="decimal" min="0" step="10000" value="1000000"></label>
    <label class="f"><span>距到期还有（天）</span>
      <input id="fc-days" type="number" inputmode="numeric" min="1" step="1" value="90"></label>
    <label class="f"><span>保理 / 贴现年化利率（%）</span>
      <input id="fc-rate" type="number" inputmode="decimal" min="0" step="0.1" value="8"></label>
    <label class="f"><span>一次性手续费率（%）</span>
      <input id="fc-fee" type="number" inputmode="decimal" min="0" step="0.1" value="0.8"></label>
    <label class="f"><span>保证金扣留比例（%，到期退还不计息）</span>
      <input id="fc-margin" type="number" inputmode="decimal" min="0" max="100" step="1" value="10"></label>
    <label class="f"><span>不保理改借流贷的年化利率（%）</span>
      <input id="fc-loan" type="number" inputmode="decimal" min="0" step="0.1" value="6"></label>
    <em>手续费按应收账款全额一次性收，所以期限越短、年化越吓人</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">实际到账金额</span><strong id="fc-net">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>融资利息</span><b id="fc-int">—</b></li>
      <li><span>一次性手续费</span><b id="fc-feeamt">—</b></li>
      <li><span>保证金扣留（到期退）</span><b id="fc-hold">—</b></li>
      <li><span>综合融资成本</span><b id="fc-cost">—</b></li>
      <li><span>名义年化（成本 ÷ 全额 × 365 ÷ 天）</span><b id="fc-nominal">—</b></li>
      <li><span>真实年化（成本 ÷ 实际到账 × 365 ÷ 天）</span><b id="fc-real">—</b></li>
      <li><span>全口径年化（含保证金占用）</span><b id="fc-allin">—</b></li>
      <li><span>比借流贷多花</span><b id="fc-diff">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>剩余期限</th><th>综合成本</th><th>名义年化</th><th>真实年化</th></tr></thead>
        <tbody id="fc-body"></tbody>
      </table>
    </div>
    <p class="hint" id="fc-note"></p>
  </div>
    </div>
  </section>
`,aptalk:`  <section class="panel" id="panel-aptalk">
    <div class="cols">
  <div class="card">
    <h2>输入（跟供应商谈账期）</h2>
    <label class="f"><span>月采购额（元，不含税）</span>
      <input id="tn-buy" type="number" inputmode="decimal" min="0" step="10000" value="2000000"></label>
    <label class="f"><span>现在账期（天）</span>
      <input id="tn-now" type="number" inputmode="numeric" min="0" step="1" value="30"></label>
    <label class="f"><span>想谈到（天）</span>
      <input id="tn-target" type="number" inputmode="numeric" min="0" step="1" value="60"></label>
    <label class="f"><span>自己的资金年化成本（%）</span>
      <input id="tn-rate" type="number" inputmode="decimal" min="0" step="0.1" value="6"></label>
    <label class="f"><span>供应商要求加价（%）</span>
      <input id="tn-markup" type="number" inputmode="decimal" min="0" step="0.1" value="1"></label>
    <em>账期延长等于向供应商借了一笔无息货款，值不值看能不能盖住加价</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">延长账期带来的资金收益</span><strong id="tn-gain">—</strong><span class="unit">元/月</span></div>
    <ul class="kv">
      <li><span>账期能延长</span><b id="tn-ext">—</b></li>
      <li><span>多占用供应商资金</span><b id="tn-occ">—</b></li>
      <li><span>加价要多付（按加价率）</span><b id="tn-cost">—</b></li>
      <li><span>净收益</span><b id="tn-net">—</b></li>
      <li><span>可接受的最高加价率</span><b id="tn-crit">—</b></li>
      <li><span>一年下来值多少</span><b id="tn-year">—</b></li>
      <li><span>结论</span><b id="tn-verdict">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>谈到</th><th>多占用资金</th><th>资金收益</th><th>可接受最高加价</th></tr></thead>
        <tbody id="tn-body"></tbody>
      </table>
    </div>
    <p class="hint" id="tn-note"></p>
  </div>
    </div>
  </section>
`,cash13:`  <section class="panel" id="panel-cash13">
    <div class="cols">
  <div class="card">
    <h2>输入（13 周滚动）</h2>
    <label class="f"><span>期初现金（元）</span>
      <input id="wk-open" type="number" inputmode="decimal" min="0" step="10000" value="500000"></label>
    <label class="f"><span>每周平均回款（元）</span>
      <input id="wk-in" type="number" inputmode="decimal" min="0" step="10000" value="300000"></label>
    <label class="f"><span>每周平均付款（元）</span>
      <input id="wk-out" type="number" inputmode="decimal" min="0" step="10000" value="280000"></label>
    <label class="f"><span>大额支出 1（元）/ 第几周</span>
      <span class="row"><input id="wk-e1" type="number" inputmode="decimal" min="0" step="10000" value="400000">
        <input id="wk-w1" type="number" inputmode="numeric" min="1" max="13" step="1" value="6"></span></label>
    <label class="f"><span>大额支出 2（元）/ 第几周</span>
      <span class="row"><input id="wk-e2" type="number" inputmode="decimal" min="0" step="10000" value="200000">
        <input id="wk-w2" type="number" inputmode="numeric" min="1" max="13" step="1" value="10"></span></label>
    <label class="f"><span>安全现金线（元）</span>
      <input id="wk-safe" type="number" inputmode="decimal" min="0" step="10000" value="200000"></label>
    <em>周均回款付款按经验值填，大额支出单独放；真做预测请把已签合同和已承诺付款逐笔列进去</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">13 周内最低现金</span><strong id="wk-min">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>最低点出现在</span><b id="wk-minw">—</b></li>
      <li><span>低于安全线的周数 / 周次</span><b id="wk-below">—</b></li>
      <li><span>最大缺口（相对安全线）</span><b id="wk-gap">—</b></li>
      <li><span>13 周末现金</span><b id="wk-end">—</b></li>
      <li><span>13 周净变动</span><b id="wk-net">—</b></li>
      <li><span>风险判断</span><b id="wk-verdict">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>周</th><th>回款</th><th>付款</th><th>一次性</th><th>周末余额</th></tr></thead>
        <tbody id="wk-body"></tbody>
      </table>
    </div>
    <p class="hint" id="wk-note"></p>
  </div>
    </div>
  </section>
`,bill:`  <section class="panel" id="panel-bill">
    <div class="cols">
  <div class="card">
    <h2>输入（银承 / 商票贴现）</h2>
    <label class="f"><span>票面金额（元）</span>
      <input id="nt-face" type="number" inputmode="decimal" min="0" step="10000" value="1000000"></label>
    <label class="f"><span>距到期（天）</span>
      <input id="nt-days" type="number" inputmode="numeric" min="1" step="1" value="180"></label>
    <label class="f"><span>贴现年化利率（%）</span>
      <input id="nt-rate" type="number" inputmode="decimal" min="0" step="0.05" value="2.8"></label>
    <label class="f"><span>开票手续费率（%，万分之五填 0.05）</span>
      <input id="nt-openfee" type="number" inputmode="decimal" min="0" step="0.05" value="0.05"></label>
    <label class="f"><span>开票保证金比例（%）</span>
      <input id="nt-margin" type="number" inputmode="decimal" min="0" max="100" step="5" value="30"></label>
    <label class="f"><span>自有资金年化成本 / 流贷年化（%）</span>
      <div class="row">
        <input id="nt-cap" type="number" inputmode="decimal" min="0" step="0.1" value="6">
        <input id="nt-loan" type="number" inputmode="decimal" min="0" step="0.1" value="6">
      </div></label>
    <em>票据贴现按 360 天计息（不是 365），这是行业惯例</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">贴现实际到账</span><strong id="nt-net">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>贴现息</span><b id="nt-int">—</b></li>
      <li><span>贴现实际年化（息 ÷ 到账 × 360 ÷ 天）</span><b id="nt-real">—</b></li>
      <li><span>开票手续费</span><b id="nt-ofee">—</b></li>
      <li><span>保证金占用成本</span><b id="nt-mcost">—</b></li>
      <li><span>票据全链条成本</span><b id="nt-total">—</b></li>
      <li><span>全成本折年化</span><b id="nt-any">—</b></li>
      <li><span>同期借流贷的利息</span><b id="nt-loanint">—</b></li>
      <li><span>开票贴现比流贷</span><b id="nt-save">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>剩余期限</th><th>贴现息</th><th>到账</th><th>全成本年化</th></tr></thead>
        <tbody id="nt-body"></tbody>
      </table>
    </div>
    <p class="hint" id="nt-note"></p>
  </div>
    </div>
  </section>
`,settleway:`  <section class="panel" id="panel-settleway">
    <div class="cols">
  <div class="card">
    <h2>输入（同一笔货款，比四种结算方式）</h2>
    <label class="f"><span>货款金额（元）</span>
      <input id="sw-amt" type="number" inputmode="decimal" min="0" step="10000" value="1000000"></label>
    <label class="f"><span>账期（月）</span>
      <input id="sw-mon" type="number" inputmode="decimal" min="0" step="1" value="6"></label>
    <label class="f"><span>你的资金成本（年化 %）</span>
      <input id="sw-rate" type="number" inputmode="decimal" min="0" step="0.1" value="6"></label>
    <label class="f"><span>现汇现金折扣（%）</span>
      <input id="sw-disc" type="number" inputmode="decimal" min="0" step="0.1" value="2"></label>
    <label class="f"><span>银行承兑开票加价（%）</span>
      <input id="sw-bank" type="number" inputmode="decimal" min="0" step="0.1" value="1.5"></label>
    <label class="f"><span>商业承兑开票加价（%）</span>
      <input id="sw-com" type="number" inputmode="decimal" min="0" step="0.1" value="2"></label>
    <label class="f"><span>银承 / 商承贴现年化（%）</span>
      <span class="row"><input id="sw-bd" type="number" inputmode="decimal" min="0" step="0.1" value="2.8">
        <input id="sw-cd" type="number" inputmode="decimal" min="0" step="0.1" value="6"></span></label>
    <em>口径：把「什么时候付钱」和「付多少钱」折算到同一个时间点比较，而不是只比名义金额</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">月结比「现汇拿折扣」省</span><strong id="sw-big">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>现金折扣折算年化收益</span><b id="sw-discrate">—</b></li>
      <li><span>你的资金成本（年化）</span><b id="sw-cost">—</b></li>
      <li><span>该不该为折扣提前付款</span><b id="sw-verdict">—</b></li>
      <li><span>月结基准的现值</span><b id="sw-base">—</b></li>
      <li><span>银承贴现成本（转嫁给供应商）</span><b id="sw-bankdisc">—</b></li>
      <li><span>商承贴现成本（转嫁给供应商）</span><b id="sw-comdisc">—</b></li>
      <li><span>银承比月结贵</span><b id="sw-bankgap">—</b></li>
      <li><span>商承比月结贵</span><b id="sw-comgap">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>结算方式</th><th>名义支出</th><th>折现后现值</th><th>相对月结</th></tr></thead>
        <tbody id="sw-body"></tbody>
      </table>
    </div>
    <p class="hint" id="sw-note"></p>
  </div>
    </div>
  </section>
`,creditline:`  <section class="panel" id="panel-creditline">
    <div class="cols">
  <div class="card">
    <h2>输入（授信测算）</h2>
    <label class="f"><span>年销售收入（元）</span>
      <input id="crd-sales" type="number" inputmode="decimal" min="0" step="100000" value="50000000"></label>
    <label class="f"><span>净资产（元）</span>
      <input id="crd-net" type="number" inputmode="decimal" min="0" step="100000" value="20000000"></label>
    <label class="f"><span>抵押物评估值（元）</span>
      <input id="crd-coll" type="number" inputmode="decimal" min="0" step="100000" value="15000000"></label>
    <label class="f"><span>抵押率（%）</span>
      <input id="crd-collrate" type="number" inputmode="decimal" min="0" max="100" step="1" value="60"></label>
    <label class="f"><span>信用额度系数（占销售收入 %）</span>
      <input id="crd-creditrate" type="number" inputmode="decimal" min="0" step="1" value="20"></label>
    <label class="f"><span>保证担保可增额度（元）</span>
      <input id="crd-guar" type="number" inputmode="decimal" min="0" step="100000" value="5000000"></label>
    <label class="f"><span>已用授信（元）</span>
      <input id="crd-used" type="number" inputmode="decimal" min="0" step="100000" value="12000000"></label>
    <label class="f"><span>月均资金需求（元）</span>
      <input id="crd-need" type="number" inputmode="decimal" min="0" step="100000" value="8000000"></label>
    <em>抵押率、信用系数各行差异大，用你银行给的实际数替换默认值</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">还没用的授信额度</span><strong id="crd-big">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>抵押可贷（评估值 × 抵押率）</span><b id="crd-c1">—</b></li>
      <li><span>信用可贷（销售收入 × 系数）</span><b id="crd-c2">—</b></li>
      <li><span>保证担保可增</span><b id="crd-c3">—</b></li>
      <li><span>理论授信总额</span><b id="crd-total">—</b></li>
      <li><span>已用 / 可用</span><b id="crd-split">—</b></li>
      <li><span>能覆盖几个月均需求</span><b id="crd-cover">—</b></li>
      <li><span>70% 负债率下的新增空间</span><b id="crd-space">—</b></li>
      <li><span>要覆盖 2 倍需求还需抵押物</span><b id="crd-extra">—</b></li>
      <li><span>结构评价</span><b id="crd-flex">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>额度来源</th><th>可贷金额</th><th>测算依据</th></tr></thead>
        <tbody id="crd-body"></tbody>
      </table>
    </div>
    <p class="hint" id="crd-note"></p>
  </div>
    </div>
  </section>
`,fxgain:`  <section class="panel" id="panel-fxgain">
    <div class="cols">
  <div class="card">
    <h2>输入（出口收汇）</h2>
    <label class="f"><span>出口金额（美元）</span>
      <input id="fxg-usd" type="number" inputmode="decimal" min="0" step="10000" value="1000000"></label>
    <label class="f"><span>签约 / 报价汇率</span>
      <input id="fxg-signed" type="number" inputmode="decimal" min="0" step="0.001" value="7.1"></label>
    <label class="f"><span>账面应收记账汇率</span>
      <input id="fxg-book" type="number" inputmode="decimal" min="0" step="0.001" value="7.08"></label>
    <label class="f"><span>收款日即期汇率</span>
      <input id="fxg-spot" type="number" inputmode="decimal" min="0" step="0.001" value="7.05"></label>
    <label class="f"><span>结汇点差 / 手续费（%）</span>
      <input id="fxg-spread" type="number" inputmode="decimal" min="0" step="0.01" value="0.2"></label>
    <label class="f"><span>远期锁汇价</span>
      <input id="fxg-fwd" type="number" inputmode="decimal" min="0" step="0.001" value="7.09"></label>
    <em>汇率只作示例，请换成你实际的签约价与收款日价</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">汇兑损益（计入财务费用）</span><strong id="fxg-big">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>签约汇率口径收入</span><b id="fxg-signedout">—</b></li>
      <li><span>按即期结汇可得</span><b id="fxg-spotout">—</b></li>
      <li><span>相对签约汇率少收</span><b id="fxg-loss">—</b></li>
      <li><span>账面应收（记账汇率）</span><b id="fxg-bookout">—</b></li>
      <li><span>结汇点差成本</span><b id="fxg-fee">—</b></li>
      <li><span>实际到账人民币</span><b id="fxg-cash">—</b></li>
      <li><span>做了远期锁汇多得</span><b id="fxg-fwdout">—</b></li>
      <li><span>汇率每波动 1% 的敞口</span><b id="fxg-exp">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>口径</th><th>汇率</th><th>人民币金额</th><th>与签约比</th></tr></thead>
        <tbody id="fxg-body"></tbody>
      </table>
    </div>
    <p class="hint" id="fxg-note"></p>
  </div>
    </div>
  </section>
`,pooling:`  <section class="panel" id="panel-pooling">
    <div class="cols">
  <div class="card">
    <h2>输入（资金归集与内部借款）</h2>
    <label class="f"><span>母公司闲置资金（元）</span>
      <input id="pool-idle" type="number" inputmode="decimal" min="0" step="1000000" value="30000000"></label>
    <label class="f"><span>子公司 A / B 资金缺口（元）</span>
      <span class="row"><input id="pool-a" type="number" inputmode="decimal" min="0" step="1000000" value="12000000">
        <input id="pool-b" type="number" inputmode="decimal" min="0" step="1000000" value="8000000"></span></label>
    <label class="f"><span>内部借款利率 / 外部流贷利率（%）</span>
      <span class="row"><input id="pool-in" type="number" inputmode="decimal" min="0" step="0.1" value="4.5">
        <input id="pool-out" type="number" inputmode="decimal" min="0" step="0.1" value="5.5"></span></label>
    <label class="f"><span>原闲置资金收益率（活期 %）</span>
      <input id="pool-demand" type="number" inputmode="decimal" min="0" step="0.05" value="0.2"></label>
    <label class="f"><span>可归集比例（%）</span>
      <input id="pool-rate" type="number" inputmode="decimal" min="0" max="100" step="5" value="90"></label>
    <label class="f"><span>剩余资金理财收益率（%）</span>
      <input id="pool-wealth" type="number" inputmode="decimal" min="0" step="0.1" value="2.5"></label>
    <label class="f"><span>借款子公司权益（元，算债资比）</span>
      <input id="pool-equity" type="number" inputmode="decimal" min="0" step="1000000" value="15000000"></label>
    <em>口径：集团层面的利息收支互相抵销，真正省下来的是「少付外部利息 − 闲置资金原本能赚的钱」</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">集团每年净省</span><strong id="pool-big">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>可归集金额</span><b id="pool-pooled">—</b></li>
      <li><span>内部借款合计</span><b id="pool-loans">—</b></li>
      <li><span>内部利息（母收子付，合并抵销）</span><b id="pool-int">—</b></li>
      <li><span>剩余资金理财收益</span><b id="pool-rest">—</b></li>
      <li><span>合计收益 / 综合收益率</span><b id="pool-all">—</b></li>
      <li><span>债资比（关联借款 ÷ 权益）</span><b id="pool-ratio">—</b></li>
      <li><span>利息扣除结论</span><b id="pool-verdict">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>动作</th><th>金额</th><th>利率</th><th>年利息</th></tr></thead>
        <tbody id="pool-body"></tbody>
      </table>
    </div>
    <p class="hint" id="pool-note"></p>
  </div>
    </div>
  </section>
`,creditlimit:`  <section class="panel" id="panel-creditlimit">
    <div class="cols">
  <div class="card">
    <h2>输入（客户信用额度核定）</h2>
    <label class="f"><span>客户年采购额（元，不含税）</span>
      <input id="crl-buy" type="number" inputmode="decimal" min="0" step="100000" value="12000000"></label>
    <label class="f"><span>申请账期（天）／增值税率（%）</span>
      <span class="row"><input id="crl-term" type="number" inputmode="decimal" min="0" step="15" value="60">
        <input id="crl-vat" type="number" inputmode="decimal" min="0" step="1" value="13"></span></label>
    <label class="f"><span>毛利率（%）</span>
      <input id="crl-gm" type="number" inputmode="decimal" min="0" max="100" step="1" value="25"></label>
    <label class="f"><span>客户净资产（元）</span>
      <input id="crl-netw" type="number" inputmode="decimal" min="0" step="100000" value="20000000"></label>
    <label class="f"><span>客户资产负债率（%）</span>
      <input id="crl-lev" type="number" inputmode="decimal" min="0" max="100" step="1" value="60"></label>
    <label class="f"><span>近一年逾期次数（次）</span>
      <input id="crl-late" type="number" inputmode="decimal" min="0" step="1" value="1"></label>
    <label class="f"><span>你的资金成本（%）</span>
      <input id="crl-cost" type="number" inputmode="decimal" min="0" step="0.5" value="6"></label>
    <em>口径：额度取「年采购的 20% / 净资产的 10% / 应收占用的 1.2 倍」三者最小，再用毛利率与预期损失比一次</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">建议信用额度</span><strong id="crl-big">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>账期占用的应收资金</span><b id="crl-ar">—</b></li>
      <li><span>这笔占用的年利息成本</span><b id="crl-cost2">—</b></li>
      <li><span>毛利 ÷ 占用成本</span><b id="crl-mult">—</b></li>
      <li><span>客户信用评分</span><b id="crl-score">—</b></li>
      <li><span>预估违约概率</span><b id="crl-pd">—</b></li>
      <li><span>预期损失（额度 × 违约率）</span><b id="crl-el">—</b></li>
      <li><span>结论</span><b id="crl-verdict">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>约束</th><th>算法</th><th>额度</th></tr></thead>
        <tbody id="crl-body"></tbody>
      </table>
    </div>
    <p class="hint" id="crl-note"></p>
  </div>
    </div>
  </section>
`,trprice:`  <section class="panel" id="panel-trprice">
    <div class="cols">
  <div class="card">
    <h2>输入（关联方转移定价）</h2>
    <label class="f"><span>甲公司生产成本（万元）</span>
      <input id="tp-cost" type="number" inputmode="decimal" min="0" step="50" value="800"></label>
    <label class="f"><span>乙公司对外售价（万元）</span>
      <input id="tp-price" type="number" inputmode="decimal" min="0" step="50" value="1200"></label>
    <label class="f"><span>当前内部定价（万元）</span>
      <input id="tp-inner" type="number" inputmode="decimal" min="0" step="50" value="1000"></label>
    <label class="f"><span>甲 / 乙 所得税率（%）</span>
      <span class="row"><input id="tp-ratea" type="number" inputmode="decimal" min="0" max="100" step="1" value="25">
        <input id="tp-rateb" type="number" inputmode="decimal" min="0" max="100" step="1" value="15"></span></label>
    <label class="f"><span>成本加成法区间（%，下限 / 上限）</span>
      <span class="row"><input id="tp-lo" type="number" inputmode="decimal" min="0" step="1" value="5">
        <input id="tp-hi" type="number" inputmode="decimal" min="0" step="1" value="10"></span></label>
    <em>口径：集团总利润不变，变的是利润留在哪个税率的口袋里。定价必须落在可比区间内，否则税务机关可核定调整并加收利息</em>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">当前方案集团总税负</span><strong id="tp-big">—</strong><span class="unit">万元</span></div>
    <ul class="kv">
      <li><span>甲利润 / 甲税</span><b id="tp-a">—</b></li>
      <li><span>乙利润 / 乙税</span><b id="tp-b">—</b></li>
      <li><span>集团利润合计</span><b id="tp-profit">—</b></li>
      <li><span>综合税率</span><b id="tp-rate">—</b></li>
      <li><span>合规区间内最低价（加成下限）</span><b id="tp-low">—</b></li>
      <li><span>合规区间内最高价（加成上限）</span><b id="tp-high">—</b></li>
      <li><span>区间内最优可省税</span><b id="tp-save">—</b></li>
      <li><span>内部价每下调 100 万</span><b id="tp-per">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>内部定价</th><th>甲税</th><th>乙税</th><th>合计税负</th></tr></thead>
        <tbody id="tp-body"></tbody>
      </table>
    </div>
    <p class="hint" id="tp-note"></p>
  </div>
    </div>
  </section>
`,pledgeloan:`  <section class="panel" id="panel-pledgeloan">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>应收账款余额（合格账款）</span>
      <input id="plg-ar" type="number" inputmode="decimal" min="0" step="10000" value="5000000">
    </label>
    <span class="row">
      <input id="plg-ratio" type="number" inputmode="decimal" min="0" max="100" step="5" value="80" aria-label="质押率">
      <input id="plg-rate" type="number" inputmode="decimal" min="0" step="0.1" value="5" aria-label="质押贷款利率">
    </span>
    <p class="hint">左：质押率（%），右：质押贷款利率（%）</p>
    <span class="row">
      <input id="plg-days" type="number" inputmode="numeric" min="0" step="30" value="90" aria-label="融资期限">
      <input id="plg-fee" type="number" inputmode="decimal" min="0" step="0.1" value="0.3" aria-label="手续费率">
    </span>
    <p class="hint">左：期限（天），右：一次性手续费率（%）</p>
    <label class="f">
      <span>保理综合年化（对比）</span>
      <input id="plg-fact" type="number" inputmode="decimal" min="0" step="0.5" value="9">
      <em>保理按发票全额计息，往往还要留 10% 保证金</em>
    </label>
  </div>
  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">质押融资实际年化</span><strong id="plg-big">—</strong><span class="unit">%</span></div>
    <ul class="kv">
      <li><span>可融资额度</span><b id="plg-amt">—</b></li>
      <li><span>利息</span><b id="plg-int">—</b></li>
      <li><span>手续费</span><b id="plg-feeout">—</b></li>
      <li><span>本期总成本</span><b id="plg-tot">—</b></li>
      <li><span>同期限保理成本</span><b id="plg-factout">—</b></li>
      <li><span>差额（保理 − 质押）</span><b id="plg-diff">—</b></li>
      <li><span>未融资部分仍占压</span><b id="plg-rest">—</b></li>
    </ul>
    <p class="hint" id="plg-note"></p>
  </div>
    </div>
  </section>
`,leasebuy:`  <section class="panel" id="panel-leasebuy">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>资产买价</span>
      <input id="lbu-price" type="number" inputmode="decimal" min="0" step="10000" value="1000000">
    </label>
    <span class="row">
      <input id="lbu-rent" type="number" inputmode="decimal" min="0" step="10000" value="180000" aria-label="年租金">
      <input id="lbu-years" type="number" inputmode="numeric" min="1" step="1" value="8" aria-label="租期与折旧年限">
    </span>
    <p class="hint">左：年租金（含维护），右：租期＝折旧年限（年）</p>
    <span class="row">
      <input id="lbu-rate" type="number" inputmode="decimal" min="0" step="0.5" value="6" aria-label="折现率">
      <input id="lbu-tax" type="number" inputmode="decimal" min="0" max="100" step="1" value="25" aria-label="所得税率">
    </span>
    <p class="hint">左：折现率/借款利率（%），右：所得税率（%）</p>
    <span class="row">
      <input id="lbu-maint" type="number" inputmode="decimal" min="0" step="5000" value="30000" aria-label="购买年维护费">
      <input id="lbu-resid" type="number" inputmode="decimal" min="0" step="10000" value="80000" aria-label="期末残值">
    </span>
    <p class="hint">左：购买方案自担维护费（元/年），右：期末可回收残值</p>
  </div>
  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">租赁比购买省（现值）</span><strong id="lbu-big">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>租赁：税后年成本 / 现值</span><b id="lbu-lse">—</b></li>
      <li><span>购买：现值合计</span><b id="lbu-buy">—</b></li>
      <li><span>其中折旧税盾现值</span><b id="lbu-shield">—</b></li>
      <li><span>维护费现值 / 残值现值</span><b id="lbu-mr">—</b></li>
      <li><span>盈亏临界年租金</span><b id="lbu-crit">—</b></li>
    </ul>
    <p class="hint" id="lbu-note"></p>
  </div>
    </div>
  </section>
`,loanledger:`  <section class="panel" id="panel-loanledger">
    <div class="cols">
      <div class="card">
        <h2>输入：多笔借款台账</h2>
        <span class="row">
          <label class="f"><span>借款①金额</span><input id="lnl-a1" type="number" inputmode="decimal" min="0" step="100000" value="5000000"></label>
          <label class="f"><span>①年利率 %</span><input id="lnl-r1" type="number" inputmode="decimal" min="0" step="0.1" value="4.2"></label>
        </span>
        <label class="f"><span>①剩余月数</span><input id="lnl-m1" type="number" inputmode="decimal" min="0" step="1" value="18"></label>
        <span class="row">
          <label class="f"><span>借款②金额</span><input id="lnl-a2" type="number" inputmode="decimal" min="0" step="100000" value="3000000"></label>
          <label class="f"><span>②年利率 %</span><input id="lnl-r2" type="number" inputmode="decimal" min="0" step="0.1" value="3.7"></label>
        </span>
        <label class="f"><span>②剩余月数</span><input id="lnl-m2" type="number" inputmode="decimal" min="0" step="1" value="30"></label>
        <span class="row">
          <label class="f"><span>借款③金额</span><input id="lnl-a3" type="number" inputmode="decimal" min="0" step="100000" value="2000000"></label>
          <label class="f"><span>③年利率 %</span><input id="lnl-r3" type="number" inputmode="decimal" min="0" step="0.1" value="5"></label>
        </span>
        <label class="f"><span>③剩余月数</span><input id="lnl-m3" type="number" inputmode="decimal" min="0" step="1" value="12"></label>
        <label class="f"><span>资本化月数（有在建工程才填）</span><input id="lnl-cap" type="number" inputmode="decimal" min="0" step="1" value="6"></label>
        <em>口径：一般借款资本化按加权平均利率；专门借款先资本化、其闲置收益可冲减。本表按「月利息 × 资本化月数」粗算，实际按累计资产支出加权平均。</em>
      </div>
      <div class="card res">
        <h2>结果：加权成本与到期日历</h2>
        <div class="big"><span class="k">加权平均利率</span><strong id="lnl-big">—</strong><span class="unit">%</span></div>
        <ul class="kv">
          <li><span>借款总额</span><b id="lnl-total">—</b></li>
          <li><span>年利息 / 月利息</span><b id="lnl-mi">—</b></li>
          <li><span>可资本化利息</span><b id="lnl-capint">—</b></li>
          <li><span>费用化利息</span><b id="lnl-expint">—</b></li>
          <li><span>最近到期</span><b id="lnl-next">—</b></li>
        </ul>
        <div class="tablebox">
          <table>
            <thead><tr><th class="tal">借款</th><th>金额</th><th>年利率</th><th>剩余月</th><th>年利息</th><th>月利息</th></tr></thead>
            <tbody id="lnl-body"></tbody>
          </table>
        </div>
        <p class="hint" id="lnl-note"></p>
      </div>
    </div>
  </section>
`,excoll:`  <section class="panel" id="panel-excoll">
    <div class="cols">
      <div class="card">
        <h2>出口收汇核销</h2>
        <label class="f"><span>报关金额 FOB（美元）</span><input id="exr-fob" type="number" inputmode="decimal" min="0" step="1000" value="500000"></label>
        <label class="f"><span>已收汇（美元）</span><input id="exr-collect" type="number" inputmode="decimal" min="0" step="1000" value="460000"></label>
        <span class="row">
          <label class="f"><span>记账汇率</span><input id="exr-rate" type="number" inputmode="decimal" step="0.01" value="7.10"></label>
          <label class="f"><span>收汇时汇率</span><input id="exr-rateset" type="number" inputmode="decimal" step="0.01" value="7.08"></label>
        </span>
        <label class="f"><span>期末即期汇率</span><input id="exr-spot" type="number" inputmode="decimal" step="0.01" value="7.05"></label>
        <span class="row">
          <label class="f"><span>收汇期限（天）</span><input id="exr-terms" type="number" inputmode="decimal" min="0" value="90"></label>
          <label class="f"><span>逾期天数</span><input id="exr-over" type="number" inputmode="decimal" min="0" value="30"></label>
        </span>
        <label class="f"><span>逾期资金成本（年 %）</span><input id="exr-warn" type="number" inputmode="decimal" min="0" step="0.1" value="6"></label>
      </div>
      <div class="card res">
        <h2>结果</h2>
        <div class="big"><span class="k">未收汇</span><strong id="exr-big">—</strong><span class="unit">美元</span></div>
        <ul class="kv">
          <li><span>收汇率</span><b id="exr-cr">—</b></li>
          <li><span>汇兑损益</span><b id="exr-fx">—</b></li>
          <li><span>期末应收折算</span><b id="exr-cny">—</b></li>
          <li><span>逾期资金成本</span><b id="exr-occ">—</b></li>
          <li><span>判定</span><b id="exr-verdict">—</b></li>
        </ul>
        <p class="hint" id="exr-note"></p>
      </div>
    </div>
  </section>
`,fxhedge:`  <section class="panel" id="panel-fxhedge">
    <div class="cols">
      <div class="card">
        <h2>外汇套期保值</h2>
        <label class="f"><span>外汇敞口（美元）</span><input id="fxh-expo" type="number" inputmode="decimal" min="0" step="10000" value="1000000"></label>
        <span class="row">
          <label class="f"><span>即期汇率</span><input id="fxh-spot" type="number" inputmode="decimal" step="0.01" value="7.10"></label>
          <label class="f"><span>远期汇率</span><input id="fxh-fwd" type="number" inputmode="decimal" step="0.01" value="7.05"></label>
        </span>
        <label class="f"><span>套保比例 %</span><input id="fxh-ratio" type="number" inputmode="decimal" min="0" max="100" value="80"></label>
        <label class="f"><span>手续费率 %</span><input id="fxh-fee" type="number" inputmode="decimal" min="0" step="0.01" value="0.1"></label>
        <label class="f"><span>到期情景即期</span><input id="fxh-down" type="number" inputmode="decimal" step="0.01" value="6.90"></label>
      </div>
      <div class="card res">
        <h2>结果</h2>
        <div class="big"><span class="k">净套保收益</span><strong id="fxh-big">—</strong><span class="unit">元</span></div>
        <ul class="kv">
          <li><span>锁汇金额</span><b id="fxh-locked">—</b></li>
          <li><span>未锁敞口</span><b id="fxh-unlocked">—</b></li>
          <li><span>套保后合计</span><b id="fxh-hedged">—</b></li>
          <li><span>全不锁（情景）</span><b id="fxh-noh">—</b></li>
          <li><span>套保多收</span><b id="fxh-diff">—</b></li>
          <li><span>贴水成本</span><b id="fxh-cost">—</b></li>
          <li><span>手续费</span><b id="fxh-feekv">—</b></li>
          <li><span>盈亏平衡汇率</span><b id="fxh-be">—</b></li>
        </ul>
        <p class="hint" id="fxh-note"></p>
      </div>
    </div>
  </section>
`,bankacct:`  <section class="panel" id="panel-bankacct">
    <div class="cols">
      <div class="card">
        <h2>银行账户与余额汇总</h2>
        <span class="row">
          <label class="f"><span>账户 1 账面余额</span><input id="bk-b1" type="number" inputmode="decimal" min="0" step="1000" value="1200000"></label>
          <label class="f"><span>账户 1 对账单余额</span><input id="bk-s1" type="number" inputmode="decimal" min="0" step="1000" value="1200500"></label>
        </span>
        <span class="row">
          <label class="f"><span>账户 2 账面余额</span><input id="bk-b2" type="number" inputmode="decimal" min="0" step="1000" value="800000"></label>
          <label class="f"><span>账户 2 对账单余额</span><input id="bk-s2" type="number" inputmode="decimal" min="0" step="1000" value="780000"></label>
        </span>
        <span class="row">
          <label class="f"><span>账户 3 账面余额</span><input id="bk-b3" type="number" inputmode="decimal" min="0" step="1000" value="500000"></label>
          <label class="f"><span>账户 3 对账单余额</span><input id="bk-s3" type="number" inputmode="decimal" min="0" step="1000" value="500000"></label>
        </span>
        <span class="row">
          <label class="f"><span>账户 4 账面余额</span><input id="bk-b4" type="number" inputmode="decimal" min="0" step="1000" value="300000"></label>
          <label class="f"><span>账户 4 对账单余额</span><input id="bk-s4" type="number" inputmode="decimal" min="0" step="1000" value="300000"></label>
        </span>
        <label class="f"><span>其中受限资金（保证金等）</span><input id="bk-restrict" type="number" inputmode="decimal" min="0" step="1000" value="100000"></label>
      </div>
      <div class="card res">
        <h2>结果</h2>
        <div class="big"><span class="k">可用资金</span><strong id="bk-big">—</strong><span class="unit">元</span></div>
        <ul class="kv">
          <li><span>账面合计</span><b id="bk-book">—</b></li>
          <li><span>对账单合计</span><b id="bk-stmt">—</b></li>
          <li><span>差额（未达账项待查）</span><b id="bk-diff">—</b></li>
          <li><span>受限资金</span><b id="bk-restkv">—</b></li>
        </ul>
        <p class="hint" id="bk-note"></p>
      </div>
    </div>
  </section>
`};export default{funding:R,factoring:I,aptalk:L,cash13:D,bill:K,settleway:O,creditline:H,fxgain:Y,trprice:B,pooling:U,creditlimit:V,pledgeloan:G,leasebuy:Q,loanledger:X,excoll:q,fxhedge:z,bankacct:J};
