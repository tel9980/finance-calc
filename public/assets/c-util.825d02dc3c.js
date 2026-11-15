var L=Object.defineProperty;var f=(t,a)=>L(t,"name",{value:a,configurable:!0});const{$:n,BACKUP_KEY:en,BUILD_TAG:sn,CAT_KEY:ln,CAT_LABEL:pn,CHUNK_FILES:dn,CHUNK_OF:on,CMP_KEY:rn,CORE_CALC:cn,CURS:un,DEFERRED_TAPS:bn,DEMO_SAVED:vn,DIVISOR:hn,EDITED:fn,ERR_BOX:mn,FAV_KEY:gn,FIELDS:wn,FIRST_ACTIVATE:yn,FREQ:Cn,FREQ_KEY:xn,INSTALL_HIDE_KEY:En,KEY:kn,LAST_KEY:Sn,MONTH_CATS:Tn,MONTH_TABLE:K,NEXT_OF:Mn,PALETTE_EL:An,PENDING_PARAMS:_n,PRE_KEY:Dn,QUOTA_WARNED:Wn,RECENT_KEY:Fn,SAVE_TIMER:Nn,SCHEMA_KEY:Pn,SCHEMA_VERSION:Rn,SEARCH_KEY:Ln,SNAP_DROP_SEEN:Kn,SNAP_KEY:Yn,SNAP_MAX:In,SNAP_PICK:On,STORED:Bn,TABS:Hn,TAB_NATURAL:Un,THEME_KEY:Gn,TOAST_EL:Vn,TODAYBAR_KEY:Xn,UNITS:Qn,WF_ARCH_KEY:zn,WF_AUTO_IDX:$n,WF_AUTO_LIST:qn,WF_AUTO_STEP:Jn,WF_AUTO_TIMER:jn,WF_CUSTNAME_KEY:Zn,WF_CUST_KEY:nt,WF_CUST_NAME:tt,WF_DONE:at,WF_EDIT:et,WF_EDIT_KEY:st,WF_KEY:lt,WF_LAST:it,WF_LEGACY:pt,WF_MAN_KEY:dt,WF_MD:ot,WF_MD_FIELDS:rt,WF_MD_KEY:ct,WF_MD_LINKS:ut,WF_META_KEY:bt,WF_MONTH_KEY:vt,WF_NOTE_KEY:ht,WF_NOTIFIED_KEY:ft,WF_NOTIFY_KEY:mt,WF_PATHS:gt,WF_ROLE_KEY:wt,WF_ROLE_READY:yt,WF_SKIP_KEY:Ct,WF_TASK_KEY:xt,WF_TEMPLATES:Et,XL_ROWS:Y,YEAR_TABLE:kt,_onPanels:St,a11yTouch:Tt,activate:Mt,addMonths:I,annuityPV:At,annuityPayment:_t,applyFilter:Dt,applyParams:Wt,applyStoredTo:Ft,applyWfTpl:Nt,backupAgeDays:Pt,bindWfDnd:Rt,bindWfInline:Lt,bizAdd:D,bonusSoloTax:Kt,buildLoanSchedule:Yt,buildShare:It,buildTabBadges:Ot,bumpFreq:Bt,calcLoan:Ht,calcMap:Ut,calcWorkflow:Gt,clearWfMan:Vt,closePalette:Xt,cmpTabName:Qt,cnUpper:O,combineTax:zt,convertTemp:$t,copyText:qt,cumulativeTax:Jt,curCat:jt,currentSnap:Zt,demoFill:na,demoHint:ta,diagText:aa,dlJson:ea,doInstall:sa,doPrint:la,drawMonthCats:ia,drawMonthStack:pa,drawReportCharts:da,drawRpMini:oa,drawnMonthlyChart:ra,drawnYearChart:ca,enhanceNums:ua,enhancePanelUi:ba,ensureChunk:va,evalExpr:ha,favList:fa,fillCmpMod:ma,fillMonthGrid:ga,fillUnits:wa,flash:ya,flushParams:Ca,flushSave:xa,fmt:u,fmtAt:Ea,fmtDate:S,fx:ka,gauss:Sa,getWfCust:Ta,getWfDone:Ma,getWfMan:Aa,getWfMeta:_a,getWfNotes:Da,getWfSkip:Wa,hashTarget:Fa,installEvt:Na,installHintHide:Pa,installHintOff:Ra,iosInstallTip:La,iosLike:Ka,isFav:Ya,lastName:Ia,leftAfter:Oa,linkTo:Ba,loadCmpA:Ha,loadSnaps:Ua,loadWfArch:Ga,loadWfCust:Va,loadWfDone:Xa,loadWfEdit:Qa,loadWfMan:za,loadWfMeta:$a,loadWfNotes:qa,loadWfSkip:Ja,loadWfTask:ja,loanRows:Za,makeSnap:ne,markBackup:te,markBadInputs:ae,matchQ:ee,money:g,monthToDate:se,monthlyIRR:le,months:ie,npvDiff:pe,num:c,numBlur:de,numFocus:oe,numInput:re,numKey:ce,numOf:ue,openPalette:be,orderTabsForQuery:ve,palKey:he,panelEls:fe,panelParams:me,parseAmounts:P,parseDate:T,parseNum:ge,pct:C,percentile:we,plRank:ye,plScoreCov:Ce,plScoreDsr:xe,plScoreEmg:Ee,plScoreLev:ke,plScoreSave:Se,prePanels:Te,prefetchAllChunks:Me,presets:Ae,printCover:_e,pushRecent:De,pushSearch:We,pwaStandalone:Fe,quickOf:Ne,rateOf:Pe,readJsonFile:Re,readMonthGrid:Le,recentList:Ke,recordWf:Ye,refreshCounts:Ie,refreshTableTools:Oe,refreshTrackMods:B,refreshWfBadge:Be,renderLoanTable:He,renderNext:Ue,renderPalette:Ge,renderPresets:Ve,renderSearchHist:Xe,renderSnapCompare:H,renderSnapList:U,renderTodayBar:Qe,renderTrack:ze,renderWfTpl:$e,rentBuyAt:qe,restore:Je,runCalc:je,runDeferredTaps:Ze,save:ns,saveCmpA:ts,saveFav:as,savePresets:es,saveSnaps:ss,saveWfCust:ls,savedCat:is,schemaInit:ps,schemaMigrate:ds,scrollResultIfDeepLink:os,searchHist:rs,setCat:cs,setSub:us,setTheme:bs,shareCalc:vs,sharePayload:hs,showErrorBox:fs,showInstBar:ms,showUpdateBar:gs,snapNameOf:ws,snapTipText:ys,snapshot:Cs,st0:xs,stamp:Es,startName:ks,syncInstallUi:Ss,tabCatLabel:Ts,tabScore:Ms,tap:As,taxBy:G,toast:_s,toggleWfStep:Ds,trimNum:Ws,unitFor:Fs,updShown:Ns,wfAllPaths:Ps,wfArchiveMonth:Rs,wfArchivePut:Ls,wfAutoNext:Ks,wfAutoStop:Ys,wfAutoWalk:Is,wfBar:Os,wfBindCustQ:Bs,wfBuildHandoff:Hs,wfCarryMissing:Us,wfCarryQuery:Gs,wfCarryWarn:Vs,wfCsvCell:Xs,wfCustNameSave:Qs,wfDayDiff:zs,wfDetailRender:$s,wfEditPath:qs,wfEditReset:Js,wfEditSave:js,wfEditToggle:Zs,wfFillCustSel:nl,wfHandoff:tl,wfHandoffCopy:al,wfHandoffCsv:el,wfHandoffPrint:sl,wfHasAnyData:ll,wfHideStep:il,wfKnownMods:pl,wfLegacyToNew:dl,wfLoad:ol,wfManSave:rl,wfMdHref:cl,wfMdRender:ul,wfMdSave:bl,wfMetaSave:vl,wfMigrateLegacy:hl,wfMonthKey:fl,wfMonthRoll:ml,wfMonthTouch:gl,wfMoveStep:wl,wfNoteSave:yl,wfNotifyCheck:Cl,wfNotifyGranted:xl,wfNotifyPref:El,wfNotifySend:kl,wfNotifySetPref:Sl,wfNotifyStatus:Tl,wfNotifyToggle:Ml,wfOpenInline:Al,wfOpenTasks:_l,wfPad2:Dl,wfPathMods:Wl,wfPlaceInline:Fl,wfPlaceNear:Nl,wfProgress:Pl,wfRenderSummary:Rl,wfRoleSaved:Ll,wfScopedPaths:Kl,wfSet:Yl,wfSkipCurrent:Il,wfSkipSave:Ol,wfStepKey:Bl,wfStepShare:Hl,wfStepState:Ul,wfTaskAdd:Gl,wfTaskBox:Vl,wfTaskDel:Xl,wfTaskPending:Ql,wfTaskSave:zl,wfTaskToggle:$l,wfTodayPick:ql,wfTodayStr:Jl,wfUnhideStep:jl,wfVisiblePaths:Zl,yuan:x,zOf:ni}=window.FC;function V(){var t=c(n("nw-amount"),0),a=c(n("nw-prefix"),0)>=1,s=O(t);n("nw-big").textContent=(t<0?"\u8D1F":"")+(a?"\u4EBA\u6C11\u5E01":"")+s,n("nw-low").textContent="\xA5"+u(Math.abs(t),2);var l=Math.round(Math.abs(t)*100);n("nw-int").textContent=u(Math.floor(l/100),0)+" \u5143";var e=Math.floor(l%100/10),p=l%10;n("nw-cent").textContent=e+" \u89D2 "+p+" \u5206";var i=s.slice(-1);n("nw-rule").textContent=i==="\u6574"?"\u5230\u5143\u4E3A\u6B62\u5199\u300C\u6574\u300D\uFF0C\u89C4\u8303":e>0&&p===0?"\u6709\u89D2\u65E0\u5206\uFF1A\u5199\u300CX\u89D2\u6574\u300D":"\u6709\u5206\uFF1A\u89D2\u5206\u90FD\u8981\u5199\uFF0C\u672B\u5C3E\u4E0D\u52A0\u300C\u6574\u300D",n("nw-warn").textContent=l%100===0&&i!=="\u6574"?"\u6574\u6570\u91D1\u989D\u5FC5\u987B\u8865\u300C\u6574\u300D":"\u4E0D\u5F97\u7528\u300C\u53E6\u300D\u3001\u4E0D\u5F97\u7B80\u5199\u3001\u4E0D\u5F97\u6D82\u6539",n("nw-note").textContent="\u51ED\u8BC1\u548C\u53D1\u7968\u7684\u5927\u5199\u680F\u8981\u6C42\uFF1A\u91D1\u989D\u5230\u300C\u5143\u300D\u7684\u672B\u5C3E\u5199\u300C\u6574\u300D\uFF08\u6216\u300C\u6B63\u300D\uFF09\uFF0C\u6709\u89D2\u65E0\u5206\u5199\u300CX\u89D2\u6574\u300D\uFF0C\u6709\u5206\u5219\u89D2\u5206\u90FD\u5199\u3001\u672B\u5C3E\u4E0D\u52A0\u300C\u6574\u300D\uFF1B\u4E2D\u95F4\u8FDE\u7EED\u7684\u96F6\u53EA\u5199\u4E00\u4E2A\u300C\u96F6\u300D\uFF0C\u5143\u4F4D\u4E3A\u96F6\u65F6\u5199\u300C\u96F6\u5143\u300D\uFF1B\u4E0D\u5F97\u6D82\u6539\uFF0C\u9519\u4E86\u6574\u5F20\u4F5C\u5E9F\u91CD\u5F00\u3002"}f(V,"calcNumWords");function X(){var t=T(n("ud-start").value)||new Date,a=Math.max(0,Math.round(c(n("ud-days"),0))),s=c(n("ud-basis"),0)>=1,l=c(n("ud-amt"),0),e=c(n("ud-rate"),0),p=T(n("ud-today").value)||new Date,i=s?D(t,a):new Date(t.getFullYear(),t.getMonth(),t.getDate()+a),d=Math.round((p-i)/864e5);n("ud-big").textContent=S(i),n("ud-state").textContent=d>0?"\u5DF2\u903E\u671F "+d+" \u5929":d===0?"\u4ECA\u5929\u5230\u671F":"\u8FD8\u6709 "+-d+" \u5929\u5230\u671F",n("ud-over").textContent=d>0?d+" \u5929":"0 \u5929",n("ud-cycle").textContent=Math.round((p-t)/864e5)+" \u5929";var o=e/1e4;n("ud-int").textContent=d>0?x(l*o*d):"0.00 \u5143\uFF08\u672A\u903E\u671F\uFF09",n("ud-hold").textContent=x(l*o*a)+"\uFF08"+u(a,0)+" \u5929 \xD7 "+u(o*100,3)+"%\uFF09",n("ud-biz").textContent=s?S(i)+"\uFF08\u5C31\u662F\u4E0A\u9762\uFF09":S(D(t,a)),n("ud-note").textContent="\u5230\u671F\u65E5\u4ECE\u300C\u8D77\u7B97\u65E5\u300D\u5F00\u59CB\u6570\u8D26\u671F\u5929\u6570\uFF0C\u8D77\u7B97\u65E5\u5F53\u5929\u4E0D\u7B97\uFF08\u6B21\u65E5\u8D77\u7B97\uFF09\uFF0C\u6240\u4EE5 8/1 \u5F00\u7968 + 60 \u5929\u81EA\u7136\u65E5 = 9/30\u3002\u903E\u671F\u5229\u606F\u6309\u300C\u91D1\u989D \xD7 \u65E5\u5229\u7387 \xD7 \u903E\u671F\u5929\u6570\u300D\u7B97\u5355\u5229\uFF0C\u5408\u540C\u6CA1\u7EA6\u5B9A\u7F5A\u606F\u65F6\u901A\u5E38\u6309 LPR \u6216\u4E07\u5206\u4E4B\u4E94\u4E3B\u5F20\uFF1B\u903E\u671F\u8D85\u8FC7 3 \u5E74\u6CE8\u610F\u8BC9\u8BBC\u65F6\u6548\uFF08\u5BF9\u8D26\u786E\u8BA4\u5355\u53EF\u91CD\u65B0\u8D77\u7B97\uFF09\u3002\u5DE5\u4F5C\u65E5\u53E3\u5F84\u4F1A\u628A\u5468\u672B\u8DF3\u8FC7\uFF0C\u6CD5\u5B9A\u8282\u5047\u65E5\u522B\u5FD8\u4E86\u81EA\u5DF1\u6263\u3002"}f(X,"calcDueDate");function Q(){for(var t=T(n("wd-a").value)||new Date,a=T(n("wd-b").value)||new Date,s=Math.max(0,Math.round(c(n("wd-hol"),0))),l=Math.max(0,Math.round(c(n("wd-n"),0))),e=Math.round((a-t)/864e5),p=0,i=0,d=e>=0?1:-1,o=1;o<=Math.abs(e);o++){var b=new Date(t.getFullYear(),t.getMonth(),t.getDate()+o*d);b.getDay()===0||b.getDay()===6?p++:i++}var v=Math.max(0,i-s);n("wd-big").textContent=u(v,0),n("wd-cal").textContent=u(Math.abs(e),0)+" \u5929",n("wd-weekend").textContent=u(p,0)+" \u5929",n("wd-inc").textContent=u(Math.abs(e)+1,0)+" \u5929";var m=D(t,l);n("wd-target").textContent=S(m),n("wd-span").textContent=Math.round((m-t)/864e5)+" \u5929",n("wd-week").textContent=u(Math.abs(e)/7,1)+" \u5468",n("wd-note").textContent="\u5DE5\u4F5C\u65E5 = \u81EA\u7136\u65E5 \u2212 \u5468\u672B \u2212 \u989D\u5916\u975E\u5DE5\u4F5C\u65E5\uFF08\u6CD5\u5B9A\u8282\u5047\u65E5\u4E0E\u8C03\u4F11\u6309\u51C0\u989D\u586B\uFF09\u3002\u7B97\u5DE5\u671F\u3001\u7B97\u5BA1\u6279\u65F6\u9650\u3001\u7B97\u300CN \u4E2A\u5DE5\u4F5C\u65E5\u5185\u4ED8\u6B3E\u300D\u90FD\u7528\u8FD9\u4E2A\uFF1B\u6CE8\u610F\u300C\u542B\u9996\u5C3E\u300D\u6BD4\u8DE8\u5EA6\u591A\u4E00\u5929\uFF0C\u5408\u540C\u91CC\u5199\u300C\u81EA X \u65E5\u8D77 N \u4E2A\u5DE5\u4F5C\u65E5\u5185\u300D\u4EE5\u8D77\u7B97\u65E5\u6B21\u65E5\u8D77\u7B97\u3002"}f(Q,"calcWorkDay");function z(){var t=c(n("cg-from"),0),a=c(n("cg-to"),0),s=c(n("cg-years"),1)||1;if(t<=0||a<=0){n("cg-big").textContent="\u2014",n("cg-note").textContent="\u671F\u521D\u503C\u548C\u671F\u672B\u503C\u90FD\u8981\u5927\u4E8E 0 \u624D\u80FD\u7B97\u5E74\u5316\uFF08\u8DE8\u6B63\u8D1F\u53F7\u65F6\u5E74\u5316\u589E\u901F\u6CA1\u6709\u610F\u4E49\uFF0C\u7528\u7EDD\u5BF9\u5DEE\u989D\u770B\uFF09\u3002";return}var l=a/t-1,e=Math.pow(a/t,1/s)-1;n("cg-big").textContent=C(e,2),n("cg-total").textContent=C(l,2),n("cg-avg").textContent=u((a-t)/s,2),n("cg-double").textContent=e>0?u(Math.log(2)/Math.log(1+e),2)+" \u5E74":"\u4E0D\u4F1A\u7FFB\u500D",n("cg-y5").textContent=u(a*Math.pow(1+e,5),2),n("cg-y10").textContent=u(a*Math.pow(1+e,10),2);var p=Math.abs(Math.log(.5)/Math.log(1+e));n("cg-half").textContent=u(p,2)+" \u5E74"+(e>0?"\uFF08\u7FFB\u500D\u7528\uFF09":"\uFF08\u51CF\u534A\u7528\uFF09"),n("cg-note").textContent="\u603B\u589E\u957F\u770B\u7684\u662F\u7D2F\u8BA1\u5E45\u5EA6\uFF0C\u5E74\u5316\uFF08CAGR\uFF09\u624D\u662F\u53EF\u6BD4\u7684\u901F\u5EA6\uFF1A\u6DA8 80% \u7528 3 \u5E74\uFF0C\u5E74\u5316 21.64%\uFF0C\u4E0D\u662F 26.67%\u3002\u300C\u4E03\u4E8C\u6CD5\u5219\u300D\u4F30\u7FFB\u500D\u7528 72\xF7\u589E\u901F%\uFF0C\u7CBE\u786E\u7B97\u662F ln2\xF7ln(1+g)\u3002\u5229\u6DA6\u4ECE \u2212100 \u5230 +100 \u8FD9\u79CD\u8DE8\u96F6\u7684\u60C5\u51B5\u4E0D\u80FD\u7B97 CAGR\u3002"}f(z,"calcCagr");function $(){for(var t=c(n("apc-total"),0),a=(n("apc-w").value||"").split(/[,，\s]+/).filter(function(E){return E!==""}),s=[],l=0;l<a.length&&l<8;l++){var e=Math.max(0,parseFloat(a[l])||0);s.push(e)}s.length||(s=[1]);for(var p=s.reduce(function(E,k){return E+k},0)||1,i=Math.round(t*100),d=[],o=[],b=0,v=0;v<s.length;v++){var m=i*s[v]/p,r=Math.floor(m);d.push(r),o.push(m-r),b+=r}for(var h=i-b,y=o.map(function(E,k){return k}).sort(function(E,k){return o[k]-o[E]||E-k}),M=0;M<h&&M<y.length;M++)d[y[M]]+=1;for(var W="",A=0,F=0,_=-1,w=0;w<d.length;w++){A+=d[w];var R=i*s[w]/p,N=d[w]-R;N>_&&(_=N,F=w),W+="<tr><td>"+(w+1)+"</td><td>"+u(s[w],2)+"</td><td>"+C(s[w]/p,2)+"</td><td>"+g(d[w]/100)+"</td></tr>"}n("apc-body").innerHTML=W,n("apc-big").textContent=g(A/100)+" / "+g(t,2),n("apc-n").textContent=String(s.length),n("apc-wsum").textContent=u(p,2),n("apc-diff").textContent=g((i-A)/100),n("apc-max").textContent="\u7B2C "+(F+1)+" \u9879\uFF08\u591A\u5206 "+g(_/100)+"\uFF09",n("apc-note").textContent="\u5206\u644A\u6700\u6015\u300C\u5206\u4E0D\u5B8C\u300D\u6216\u300C\u591A\u4E00\u5206\u300D\uFF1A\u5148\u6309\u6743\u91CD\u7B97\u51FA\u5C0F\u6570\u91D1\u989D\uFF0C\u53D6\u6574\u5230\u5206\u540E\u628A\u5269\u4E0B\u7684\u5206\u6309\u5C0F\u6570\u90E8\u5206\u4ECE\u5927\u5230\u5C0F\u8865\uFF0C\u8FD9\u5C31\u662F\u6700\u5927\u4F59\u989D\u6CD5\uFF0C\u4E5F\u53EB\u5C3E\u5DEE\u8C03\u6574\u3002\u603B\u989D 1000 \u5143\u4E09\u4E2A\u4EBA\u5E73\u5206\uFF0C\u5B9E\u9645\u662F 333.34 / 333.33 / 333.33\uFF0C\u4E0D\u662F\u4E09\u4E2A 333.33\uFF08\u90A3\u6837\u5C11 1 \u5206\uFF09\u3002\u8D39\u7528\u5206\u644A\u3001\u6536\u5165\u786E\u8BA4\u3001\u4F63\u91D1\u62C6\u5355\u3001\u5408\u5E76\u62A5\u8868\u62B5\u9500\u90FD\u7528\u5F97\u4E0A\u3002"}f($,"calcApportion");function q(){var t=c(n("gu-net"),0),a=Math.max(0,c(n("gu-rate"),0))/100,s=c(n("gu-spec"),0),l=c(n("gu-thr"),5e3);function e(m){var r=m*a,h=G(K,Math.max(0,m-r-l-s));return{si:r,tax:h,net:m-r-h}}f(e,"netOf");for(var p=t,i=Math.max(t*3,1e3),d=0;d<120;d++){var o=(p+i)/2;e(o).net<t?p=o:i=o}var b=Math.round((p+i)/2*100)/100,v=e(b);n("gu-big").textContent=g(b)+" \u5143",n("gu-si").textContent=x(v.si),n("gu-tax").textContent=x(v.tax),n("gu-tr").textContent=C(v.tax/b,2),n("gu-year").textContent=x(t*12)+" / "+x(b*12),n("gu-ytax").textContent=x(v.tax*12),n("gu-cost").textContent=x(b*1.25),n("gu-note").textContent="\u62DB\u8058\u8C08\u85AA\u6700\u5E38\u88AB\u95EE\u7684\u4E00\u53E5\uFF1A\u300C\u5230\u624B 2 \u4E07\uFF0C\u7A0E\u524D\u8981\u591A\u5C11\uFF1F\u300D\u6309\u6708\u5EA6\u9884\u6263\u8868\u53CD\u63A8\uFF0C\u672C\u4F8B\u7A0E\u524D\u7EA6 2.60 \u4E07\uFF0C\u516C\u53F8\u5B9E\u9645\u6210\u672C\u8FD8\u8981\u52A0\u5355\u4F4D\u793E\u4FDD\u516C\u79EF\u91D1\u7EA6 25%\u3002\u6CE8\u610F\uFF1A\u793E\u4FDD\u6709\u7F34\u8D39\u57FA\u6570\u4E0A\u4E0B\u9650\uFF08\u5404\u5730\u4E0D\u540C\uFF0C\u8FD9\u91CC\u6309\u5DE5\u8D44\u5168\u989D\u7B97\uFF09\uFF0C\u5E74\u7EC8\u5956\u82E5\u5355\u72EC\u8BA1\u7A0E\u4F1A\u8BA9\u5168\u5E74\u7A0E\u8D1F\u4E0D\u540C\uFF1B\u8C08 offer \u65F6\u8BF4\u7684\u300C\u603B\u5305\u300D\u8981\u95EE\u6E05\u662F\u5426\u542B\u5355\u4F4D\u793E\u4FDD\u3001\u662F\u5426\u542B\u5E74\u7EC8\u5956\u3002"}f(q,"calcGrossUp");function J(){U(),H(),B()}f(J,"calcSnaps");function j(){var t=T(n("dtm-date").value),a=Math.round(c(n("dtm-months"),0)),s=Math.round(c(n("dtm-days"),0));if(!t){n("dtm-big").textContent="\u2014",n("dtm-week").textContent="\u2014",n("dtm-gap").textContent="\u2014",n("dtm-rule").textContent="\u2014",n("dtm-doy").textContent="\u2014",n("dtm-note").textContent="\u8D77\u59CB\u65E5\u671F\u8BF7\u6309 2026-01-31 \u7684\u683C\u5F0F\u586B\u5199\u3002";return}var l=I(t,a),e=s?new Date(l.getFullYear(),l.getMonth(),l.getDate()+s):l,p=l.getDate()!==t.getDate(),i=Math.round((e.getTime()-t.getTime())/864e5),d=["\u5468\u65E5","\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D"][e.getDay()],o=Math.round((e-new Date(e.getFullYear(),0,1))/864e5)+1,b=e.getDate()===new Date(e.getFullYear(),e.getMonth()+1,0).getDate();n("dtm-big").textContent=S(e),n("dtm-week").textContent=d,n("dtm-gap").textContent=(i>=0?"+":"")+i+" \u5929\uFF08"+(i/30.44).toFixed(2)+" \u4E2A\u6708\uFF09",n("dtm-rule").textContent=p?"\u5DF2\u6309\u6708\u672B\u622A\u65AD\uFF08"+S(l)+"\uFF09":b?"\u6B63\u597D\u843D\u5728\u6708\u672B":"\u6309\u65E5\u5BF9\u65E5\uFF0C\u672A\u622A\u65AD",n("dtm-doy").textContent="\u7B2C "+o+" \u5929"+(b?"\uFF0C\u4E14\u662F\u5F53\u6708\u6700\u540E\u4E00\u5929":""),n("dtm-note").textContent="\u300CN \u4E2A\u6708\u540E\u300D\u6309\u5BF9\u65E5\u7B97\uFF1A\u8D77\u59CB\u65E5\u4E0D\u5B58\u5728\u7684\u90A3\u5929\u4EE5\u6708\u672B\u4E3A\u51C6\uFF081/31 \u52A0 1 \u4E2A\u6708\u662F 2/28 \u6216 2/29\uFF09\uFF0C\u6240\u4EE5\u540C\u4E00\u4E2A\u5408\u540C\u5199\u300C3 \u4E2A\u6708\u300D\u548C\u5199\u300C90 \u5929\u300D\u80FD\u5DEE\u4E00\u4E24\u5929\u3002\u5230\u671F\u65E5\u9047\u6CD5\u5B9A\u8282\u5047\u65E5\u3001\u5468\u672B\u662F\u5426\u987A\u5EF6\uFF0C\u8981\u770B\u5408\u540C\u6216\u7968\u636E\u7EA6\u5B9A\uFF0C\u5DE5\u5177\u4E0D\u4F1A\u81EA\u52A8\u987A\u5EF6\uFF1B\u7968\u636E\u5230\u671F\u65E5\u6309\u300A\u7968\u636E\u6CD5\u300B\u53E6\u6709\u89C4\u5B9A\uFF0C\u522B\u76F4\u63A5\u5957\u3002"}f(j,"calcDatemath");function Z(){var t=c(n("pct-a"),0),a=c(n("pct-b"),0),s=c(n("pct-p1"),0),l=c(n("pct-p2"),0),e=a-t,p=t!==0?e/t:0,i=t!==0?a/t:0,d=a!==0?t/a:0,o=l-s,b=s!==0?o/s:0;n("pct-big").textContent=t!==0?u(p*100,2):"\u2014",n("pct-diff").textContent=g(e)+" \u5143",n("pct-share").textContent=t!==0?C(i,2):"\u2014",n("pct-share2").textContent=a!==0?C(d,2):"\u2014",n("pct-pp").textContent=u(o,2)+" \u4E2A\u767E\u5206\u70B9",n("pct-rel").textContent=s!==0?C(b,2):"\u2014",n("pct-demo").textContent="A \u6BCF 100 \u5143\u53D8\u6210 "+u(t!==0?a/t*100:0,2)+" \u5143",n("pct-note").textContent="\u4E09\u4E2A\u4E1C\u897F\u522B\u6DF7\uFF1A\u5360\u6BD4\u662F\u300C\u90E8\u5206 \xF7 \u6574\u4F53\u300D\uFF0C\u589E\u5E45\u662F\u300C\u5DEE\u989D \xF7 \u539F\u6765\u7684\u6570\u300D\uFF0C\u767E\u5206\u70B9\u662F\u4E24\u4E2A\u767E\u5206\u6570\u76F8\u51CF\u7684\u7ED3\u679C\u300230% \u5230 33% \u662F\u300C\u6DA8\u4E86 3 \u4E2A\u767E\u5206\u70B9\u300D\uFF0C\u76F8\u5BF9\u53D8\u5316\u662F "+C(b,2)+"\uFF0C\u8BF4\u6210\u300C\u6DA8\u4E86 3%\u300D\u4F1A\u5DEE 10 \u500D\u3002\u5206\u6BCD\u4E3A 0 \u6216\u4E3A\u8D1F\uFF08\u6BD4\u5982\u5229\u6DA6\u7531\u8D1F\u8F6C\u6B63\uFF09\u65F6\uFF0C\u589E\u5E45\u6CA1\u6709\u610F\u4E49\uFF0C\u76F4\u63A5\u770B\u7EDD\u5BF9\u5DEE\u989D\u3002"}f(Z,"calcPct3");function nn(){var t=n("xl-body");if(t){var a=f(function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},"esc");t.innerHTML=Y.map(function(s){return'<tr><td class="tal">'+a(s[0])+'</td><td class="tal"><code>'+a(s[1])+"</code></td></tr>"}).join("")}}f(nn,"calcXlHelp");function tn(){var t=P(n("rk-book").value),a=P(n("rk-bank").value),s=Math.abs(c(n("rk-tol"),.01)),l=a.map(function(){return!1}),e=[],p=[];t.forEach(function(r){for(var h=-1,y=0;y<a.length;y++)if(!l[y]&&Math.abs(a[y]-r)<=s){h=y;break}h>=0?l[h]=!0:e.push(r)});for(var i=0;i<a.length;i++)l[i]||p.push(a[i]);var d=t.reduce(function(r,h){return r+h},0),o=a.reduce(function(r,h){return r+h},0),b=o-d,v=e.map(function(r){return["\u8D26\u9762\u6709\u3001\u6D41\u6C34\u6CA1\u6709",r]}).concat(p.map(function(r){return["\u6D41\u6C34\u6709\u3001\u8D26\u9762\u6CA1\u6709",r]})),m=v.reduce(function(r,h){return r+h[1]},0);n("rk-big").textContent=u(b,2),n("rk-booksum").textContent=t.length+" \u7B14 / "+g(d)+" \u5143",n("rk-banksum").textContent=a.length+" \u7B14 / "+g(o)+" \u5143",n("rk-unmatch").textContent=v.length+" \u7B14\uFF08\u8D26\u9762\u7F3A "+e.length+" / \u6D41\u6C34\u7F3A "+p.length+"\uFF09",n("rk-unsum").textContent=g(m)+" \u5143",n("rk-body").innerHTML=v.length?v.slice(0,30).map(function(r){return'<tr><td class="tal">'+r[0]+"</td><td>"+g(r[1])+"</td></tr>"}).join(""):'<tr><td class="tal" colspan="2">\u4E24\u8FB9\u7684\u91D1\u989D\u5168\u90E8\u914D\u5BF9\u6210\u529F</td></tr>',n("rk-note").textContent=v.length===0?"\u53CC\u5411\u91D1\u989D\u5B8C\u5168\u914D\u5BF9\u3002\u6CE8\u610F\uFF1A\u8FD9\u53EA\u8BC1\u660E\u300C\u91D1\u989D\u548C\u7B14\u6570\u5BF9\u5F97\u4E0A\u300D\uFF0C\u4E0D\u7B49\u4E8E\u4E1A\u52A1\u5B9E\u8D28\u5BF9\u5F97\u4E0A\u2014\u2014\u8FD8\u9700\u8981\u6838\u65E5\u671F\u3001\u5BF9\u65B9\u6237\u540D\u3001\u6458\u8981\uFF0C\u907F\u514D\u4E24\u7B14\u91D1\u989D\u76F8\u540C\u4F46\u4E1A\u52A1\u4E0D\u540C\u7684\u6B3E\u9879\u4E92\u76F8\u62B5\u6D88\u3002":"\u672A\u5339\u914D\u5408\u8BA1 "+g(m)+" \u5143\uFF0C\u4E0E\u51C0\u5DEE\u989D\u4E0D\u540C\u662F\u6B63\u5E38\u7684\uFF1A\u4E00\u6B63\u4E00\u8D1F\u4E24\u7B14\u672A\u8FBE\u4F1A\u4E92\u76F8\u62B5\u6D88\u3002\u5148\u67E5\u662F\u4E0D\u662F\u5728\u9014\uFF08\u94F6\u884C\u5DF2\u6536\u672A\u5165\u8D26\u3001\u516C\u53F8\u5DF2\u4ED8\u672A\u6263\u6B3E\uFF09\uFF0C\u518D\u67E5\u624B\u7EED\u8D39\u3001\u5229\u606F\u3001\u4EE3\u6263\u4EE3\u7F34\u8FD9\u7C7B\u300C\u8D26\u9762\u6CA1\u8BB0\u300D\u7684\u9879\u76EE\uFF0C\u6700\u540E\u624D\u662F\u771F\u6B63\u7684\u9519\u8D26\u6216\u6F0F\u8BB0\u3002\u540C\u91D1\u989D\u591A\u7B14\u6309\u51FA\u73B0\u987A\u5E8F\u914D\u5BF9\uFF0C\u6240\u4EE5\u660E\u7EC6\u987A\u5E8F\u4E0D\u5F71\u54CD\u7ED3\u679C\u3002"}f(tn,"calcCsvRecon");export const PANELS={snaps:`  <section class="panel" id="panel-snaps">
    <div class="cols">
      <div class="card">
        <h2>\u65B9\u6848\u5FEB\u7167</h2>
        <p class="hint">\u5728\u4EFB\u610F\u6A21\u5757\u8C03\u597D\u53C2\u6570\uFF0C\u56DE\u6765\u70B9\u300C\u5B58\u5F53\u524D\u65B9\u6848\u300D\uFF0C\u5C31\u80FD\u628A\u4E0D\u540C\u65B9\u6848\u5E76\u6392\u6BD4\u3002\u5FEB\u7167\u53EA\u5B58\u5728\u672C\u673A\uFF0C\u6700\u591A 20 \u6761\u3002</p>
        <span class="row"><label class="f"><span>\u6392\u5E8F</span><select id="snap-sort">
          <option value="new">\u6700\u65B0\u7684\u5728\u524D\u9762</option>
          <option value="old">\u6700\u65E9\u7684\u5728\u524D</option>
          <option value="mod">\u6309\u6A21\u5757\u5206\u7EC4</option>
          <option value="name">\u6309\u65B9\u6848\u540D</option>
        </select></label><label class="f"><span>\u53EA\u770B\u542B\u5173\u952E\u8BCD\u7684\u65B9\u6848</span><input id="snap-q" type="search" placeholder="\u65B9\u6848\u540D / \u5907\u6CE8 / \u6A21\u5757\u540D"></label></span>
        <p class="btnrow">
          <button class="ghost" type="button" id="snap-cmp">\u5237\u65B0\u5BF9\u6BD4</button>
          <button class="ghost" type="button" id="snap-clear">\u6E05\u7A7A\u5168\u90E8</button>
          <button class="ghost" type="button" id="snap-export">\u5BFC\u51FA\u5FEB\u7167 JSON</button>
          <button class="ghost" type="button" id="snap-import">\u5BFC\u5165\u5FEB\u7167</button>
          <button class="ghost" type="button" id="snap-backup">\u6574\u7AD9\u5907\u4EFD</button>
          <button class="ghost" type="button" id="snap-csv">\u5BFC\u51FA\u5168\u90E8\u53C2\u6570 CSV</button>
          <button class="ghost" type="button" id="snap-csvin">\u4ECE CSV \u5BFC\u5165\u53C2\u6570</button>
          <input type="file" id="snap-csvfile" accept=".csv,text/csv" hidden>
          <button class="ghost" type="button" id="snap-restore">\u6062\u590D\u5907\u4EFD</button>
          <button class="ghost" type="button" id="snap-png">\u5BFC\u51FA\u5BF9\u6BD4\u56FE PNG</button>
          <button class="ghost" type="button" id="snap-del-sel">\u5220\u9664\u9009\u4E2D</button>
          <input type="file" id="snap-file" accept=".json,application/json" hidden>
          <input type="file" id="bak-file" accept=".json,application/json" hidden>
        </p>
        <em>\u5DF2\u5B58 <b id="snap-count">0</b> / 60 \u4E2A\u65B9\u6848\u3002\u70B9\u6A21\u5757\u540D\u53EF\u4EE5\u5E26\u7740\u5F53\u65F6\u7684\u53C2\u6570\u8DF3\u56DE\u90A3\u4E2A\u6A21\u5757\u7EE7\u7EED\u8C03\uFF1B\u6362\u624B\u673A\u6216\u6362\u6D4F\u89C8\u5668\u65F6\u7528\u300C\u6574\u7AD9\u5907\u4EFD\u300D\u628A\u586B\u5199\u503C\u3001\u7F6E\u9876\u3001\u9884\u8BBE\u3001\u5FEB\u7167\u4E00\u8D77\u5E26\u8D70\u3002</em>
      </div>
      <div class="card res">
        <h2>\u5FEB\u7167\u5217\u8868</h2>
        <div class="tablebox">
          <table>
            <thead><tr><th><input type="checkbox" id="snap-all" aria-label="\u5168\u9009"></th><th class="tal">\u6A21\u5757</th><th class="tal">\u65B9\u6848\u540D</th><th>\u4E3B\u7ED3\u679C</th><th>\u65F6\u95F4</th></tr></thead>
            <tbody id="snap-body"></tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="card res">
      <h2>\u5E76\u6392\u5BF9\u6BD4\uFF08\u52FE\u9009 2\u20133 \u4E2A\uFF09</h2>
      <div class="tablebox">
        <table>
          <thead><tr><th class="tal">\u6307\u6807</th><th>\u2014</th></tr></thead>
          <tbody id="snap-cmp-body"></tbody>
        </table>
      </div>
      <p class="hint" id="snap-bak-tip"></p>
      <p class="hint" id="snap-note"></p>
    </div>
    <div class="card res">
      <h2>\u6708\u5EA6\u8DDF\u8E2A\uFF08\u540C\u4E00\u4E2A\u6A21\u5757\u7684\u524D\u540E\u4E24\u7248\uFF09</h2>
      <p class="btnrow">
        <select class="ghost" id="snap-track-mod" aria-label="\u9009\u62E9\u8981\u8DDF\u8E2A\u7684\u6A21\u5757"><option value="">\u5148\u9009\u6A21\u5757</option></select>
        <button class="ghost" type="button" id="snap-track">\u751F\u6210\u8DDF\u8E2A\u8868</button>
      </p>
      <div class="tablebox">
        <table>
          <thead><tr><th class="tal">\u6307\u6807</th><th>\u4E0A\u4E00\u7248</th><th>\u6700\u65B0\u4E00\u7248</th><th>\u53D8\u5316</th></tr></thead>
          <tbody id="snap-track-body"></tbody>
        </table>
      </div>
      <p class="hint" id="snap-track-note"></p>
    </div>
  </section>
`,numwords:`  <section class="panel" id="panel-numwords">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\u91D1\u989D</h2>
    <label class="f"><span>\u91D1\u989D\uFF08\u5143\uFF09</span><input id="nw-amount" type="number" inputmode="decimal" step="0.01" value="1234567.89"></label>
    <label class="f"><span>\u662F\u5426\u52A0\u300C\u4EBA\u6C11\u5E01\u300D\u524D\u7F00</span><span class="row"><input id="nw-prefix" type="number" inputmode="numeric" min="0" max="1" step="1" value="1"></span></label>
    <em>\u53E3\u5F84\uFF1A\u586B 1 \u52A0\u300C\u4EBA\u6C11\u5E01\u300D\uFF0C\u586B 0 \u4E0D\u52A0\uFF1B\u5C0F\u6570\u4F4D\u8D85\u8FC7\u4E24\u4F4D\u4F1A\u88AB\u56DB\u820D\u4E94\u5165\u5230\u5206\u3002\u8D22\u52A1\u51ED\u8BC1\u3001\u53D1\u7968\u3001\u652F\u7968\u7684\u5927\u5199\u91D1\u989D\u680F\u90FD\u6309\u8FD9\u5957\u89C4\u5219\u5199\u3002</em>
  </div>
  <div class="card res">
    <h2>\u5927\u5199\u91D1\u989D</h2>
    <div class="big"><span class="k">\u4E2D\u6587\u5927\u5199</span><strong id="nw-big">\u2014</strong></div>
    <ul class="kv">
      <li><span>\u5C0F\u5199\u91D1\u989D</span><b id="nw-low">\u2014</b></li>
      <li><span>\u6574\u6570\u90E8\u5206\uFF08\u5143\uFF09</span><b id="nw-int">\u2014</b></li>
      <li><span>\u89D2 / \u5206</span><b id="nw-cent">\u2014</b></li>
      <li><span>\u89C4\u8303\u5199\u6CD5</span><b id="nw-rule">\u2014</b></li>
      <li><span>\u5E38\u89C1\u9519\u8BEF</span><b id="nw-warn">\u2014</b></li>
    </ul>
    <p class="hint" id="nw-note"></p>
  </div>
    </div>
  </section>
`,duedate:`  <section class="panel" id="panel-duedate">
    <div class="cols">
  <div class="card">
    <h2>\u8D26\u671F\u8D77\u7B97\u4E0E\u5230\u671F</h2>
    <label class="f"><span>\u5F00\u7968 / \u8D77\u7B97\u65E5</span><input id="ud-start" type="date" value="2026-08-01"></label>
    <label class="f"><span>\u8D26\u671F\u5929\u6570</span><input id="ud-days" type="number" inputmode="numeric" min="0" step="1" value="60"></label>
    <label class="f"><span>\u8D26\u671F\u53E3\u5F84</span><span class="row"><input id="ud-basis" type="number" inputmode="numeric" min="0" max="1" step="1" value="0"></span></label>
    <label class="f"><span>\u5E94\u6536\u91D1\u989D\uFF08\u5143\uFF09</span><input id="ud-amt" type="number" inputmode="decimal" min="0" step="10000" value="100000"></label>
    <label class="f"><span>\u903E\u671F\u65E5\u5229\u7387\uFF08\u4E07\u5206\u4E4B\uFF09</span><input id="ud-rate" type="number" inputmode="decimal" min="0" step="0.5" value="5"></label>
    <label class="f"><span>\u5BF9\u7167\u65E5\uFF08\u7B97\u903E\u671F\u7528\uFF09</span><input id="ud-today" type="date" value="2026-11-10"></label>
    <em>\u53E3\u5F84\uFF1A\u8D26\u671F\u53E3\u5F84\u586B 0 = \u81EA\u7136\u65E5\uFF0C1 = \u5DE5\u4F5C\u65E5\uFF08\u8DF3\u8FC7\u5468\u516D\u65E5\uFF0C\u4E0D\u542B\u6CD5\u5B9A\u8282\u5047\u65E5\uFF0C\u9700\u81EA\u5DF1\u8865\uFF09\uFF1B\u65E5\u5229\u7387\u6309\u4E07\u5206\u4E4B\u586B\uFF0C5 \u5C31\u662F 0.05%/\u5929\uFF08\u5E74\u5316 18.25%\uFF09\u3002</em>
  </div>
  <div class="card res">
    <h2>\u5230\u671F\u4E0E\u903E\u671F</h2>
    <div class="big"><span class="k">\u5230\u671F\u65E5</span><strong id="ud-big">\u2014</strong></div>
    <ul class="kv">
      <li><span>\u72B6\u6001</span><b id="ud-state">\u2014</b></li>
      <li><span>\u903E\u671F\u5929\u6570</span><b id="ud-over">\u2014</b></li>
      <li><span>\u56DE\u6B3E\u5468\u671F\uFF08\u81EA\u8D77\u7B97\u65E5\uFF09</span><b id="ud-cycle">\u2014</b></li>
      <li><span>\u903E\u671F\u5229\u606F</span><b id="ud-int">\u2014</b></li>
      <li><span>\u8D44\u91D1\u5360\u7528\u6210\u672C\uFF08\u81F3\u5230\u671F\u65E5\uFF09</span><b id="ud-hold">\u2014</b></li>
      <li><span>\u5DE5\u4F5C\u65E5\u53E3\u5F84\u5230\u671F\u65E5</span><b id="ud-biz">\u2014</b></li>
    </ul>
    <p class="hint" id="ud-note"></p>
  </div>
    </div>
  </section>
`,workday:`  <section class="panel" id="panel-workday">
    <div class="cols">
  <div class="card">
    <h2>\u5DE5\u4F5C\u65E5\u4E0E\u65E5\u671F\u5DEE</h2>
    <label class="f"><span>\u8D77\u59CB\u65E5</span><input id="wd-a" type="date" value="2026-11-10"></label>
    <label class="f"><span>\u7ED3\u675F\u65E5</span><input id="wd-b" type="date" value="2026-12-10"></label>
    <label class="f"><span>\u671F\u95F4\u989D\u5916\u975E\u5DE5\u4F5C\u65E5\uFF08\u5929\uFF09</span><input id="wd-hol" type="number" inputmode="numeric" min="0" step="1" value="0"></label>
    <label class="f"><span>\u4ECE\u8D77\u59CB\u65E5\u987A\u5EF6\uFF08\u5DE5\u4F5C\u65E5\uFF09</span><input id="wd-n" type="number" inputmode="numeric" min="0" step="1" value="10"></label>
    <em>\u53E3\u5F84\uFF1A\u5DE5\u4F5C\u65E5\u53EA\u8DF3\u8FC7\u5468\u516D\u65E5\uFF0C\u6CD5\u5B9A\u8282\u5047\u65E5\u8BF7\u586B\u5728\u300C\u989D\u5916\u975E\u5DE5\u4F5C\u65E5\u300D\u91CC\uFF08\u542B\u8C03\u4F11\uFF0C\u6309\u51C0\u989D\u586B\uFF09\u3002\u7ED3\u675F\u65E5\u4E0D\u8BA1\u5165\u8DE8\u5EA6\u5929\u6570\uFF0C\u4E0E\u300C30 \u5929\u540E\u300D\u7684\u7B97\u6CD5\u4E00\u81F4\u3002</em>
  </div>
  <div class="card res">
    <h2>\u5929\u6570</h2>
    <div class="big"><span class="k">\u5DE5\u4F5C\u65E5</span><strong id="wd-big">\u2014</strong><span class="unit">\u5929</span></div>
    <ul class="kv">
      <li><span>\u81EA\u7136\u65E5</span><b id="wd-cal">\u2014</b></li>
      <li><span>\u5176\u4E2D\u5468\u672B</span><b id="wd-weekend">\u2014</b></li>
      <li><span>\u542B\u9996\u5C3E\u5929\u6570</span><b id="wd-inc">\u2014</b></li>
      <li><span>\u987A\u5EF6\u7ED3\u679C\u65E5</span><b id="wd-target">\u2014</b></li>
      <li><span>\u987A\u5EF6\u542B\u5468\u672B\u5171</span><b id="wd-span">\u2014</b></li>
      <li><span>\u6298\u7B97\u5468\u6570</span><b id="wd-week">\u2014</b></li>
    </ul>
    <p class="hint" id="wd-note"></p>
  </div>
    </div>
  </section>
`,cagr:`  <section class="panel" id="panel-cagr">
    <div class="cols">
  <div class="card">
    <h2>\u589E\u5E45\u4E0E\u5E74\u5316</h2>
    <label class="f"><span>\u671F\u521D\u503C</span><input id="cg-from" type="number" inputmode="decimal" step="1" value="100"></label>
    <label class="f"><span>\u671F\u672B\u503C</span><input id="cg-to" type="number" inputmode="decimal" step="1" value="180"></label>
    <label class="f"><span>\u95F4\u9694\u5E74\u6570</span><input id="cg-years" type="number" inputmode="decimal" min="0.01" step="0.5" value="3"></label>
    <em>\u53E3\u5F84\uFF1A\u671F\u521D\u671F\u672B\u53EF\u4EE5\u662F\u6536\u5165\u3001\u5229\u6DA6\u3001\u4EBA\u6570\u3001\u80A1\u4EF7\uFF0C\u5355\u4F4D\u4E00\u81F4\u5C31\u884C\u3002\u5E74\u6570\u6309 12 \u4E2A\u6708 = 1 \u5E74\u6298\u7B97\uFF0C\u6BD4\u5982 18 \u4E2A\u6708\u586B 1.5\u3002</em>
  </div>
  <div class="card res">
    <h2>\u589E\u957F\u7387</h2>
    <div class="big"><span class="k">\u5E74\u5316\u589E\u901F\uFF08CAGR\uFF09</span><strong id="cg-big">\u2014</strong></div>
    <ul class="kv">
      <li><span>\u603B\u589E\u957F</span><b id="cg-total">\u2014</b></li>
      <li><span>\u5E74\u5747\u589E\u52A0\u989D</span><b id="cg-avg">\u2014</b></li>
      <li><span>\u7FFB\u500D\u6240\u9700\u5E74\u6570</span><b id="cg-double">\u2014</b></li>
      <li><span>\u6309\u6B64\u901F\u5EA6 5 \u5E74\u540E</span><b id="cg-y5">\u2014</b></li>
      <li><span>\u6309\u6B64\u901F\u5EA6 10 \u5E74\u540E</span><b id="cg-y10">\u2014</b></li>
      <li><span>\u964D\u81F3\u4E00\u534A\u6240\u9700\u5E74\u6570</span><b id="cg-half">\u2014</b></li>
    </ul>
    <p class="hint" id="cg-note"></p>
  </div>
    </div>
  </section>
`,apportion:`  <section class="panel" id="panel-apportion">
    <div class="cols">
  <div class="card">
    <h2>\u6309\u6743\u91CD\u5206\u644A</h2>
    <label class="f"><span>\u5F85\u5206\u644A\u603B\u989D\uFF08\u5143\uFF09</span><input id="apc-total" type="number" inputmode="decimal" min="0" step="100" value="1000"></label>
    <label class="f"><span>\u6743\u91CD\uFF08\u9017\u53F7\u5206\u9694\uFF0C\u6700\u591A 8 \u9879\uFF09</span><input id="apc-w" type="text" inputmode="text" value="1,1,1"></label>
    <em>\u53E3\u5F84\uFF1A\u6743\u91CD\u53EF\u4EE5\u662F\u4EBA\u6570\u3001\u9762\u79EF\u3001\u5DE5\u65F6\u3001\u9500\u552E\u989D\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF0C\u4F8B\u5982 3,2,2,1\uFF1B\u91D1\u989D\u7CBE\u786E\u5230\u5206\uFF0C\u5C3E\u5DEE\u6309\u300C\u6700\u5927\u4F59\u989D\u6CD5\u300D\u8865\u7ED9\u5C0F\u6570\u90E8\u5206\u6700\u5927\u7684\u9879\uFF0C\u4FDD\u8BC1\u5206\u5B8C\u5408\u8BA1\u7B49\u4E8E\u603B\u989D\u3002</em>
  </div>
  <div class="card res">
    <h2>\u5206\u644A\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u5408\u8BA1\u6821\u9A8C</span><strong id="apc-big">\u2014</strong></div>
    <ul class="kv">
      <li><span>\u9879\u6570</span><b id="apc-n">\u2014</b></li>
      <li><span>\u6743\u91CD\u5408\u8BA1</span><b id="apc-wsum">\u2014</b></li>
      <li><span>\u672A\u5206\u644A\u5C3E\u5DEE</span><b id="apc-diff">\u2014</b></li>
      <li><span>\u5DEE\u989D\u6700\u5927\u7684\u4E00\u7B14</span><b id="apc-max">\u2014</b></li>
    </ul>
    <div class="tablebox"><table><thead><tr><th>\u5E8F\u53F7</th><th>\u6743\u91CD</th><th>\u5360\u6BD4</th><th>\u5206\u644A\u91D1\u989D</th></tr></thead><tbody id="apc-body"></tbody></table></div>
    <p class="hint" id="apc-note"></p>
  </div>
    </div>
  </section>
`,grossup:`  <section class="panel" id="panel-grossup">
    <div class="cols">
  <div class="card">
    <h2>\u7A0E\u540E\u53CD\u63A8\u7A0E\u524D</h2>
    <label class="f"><span>\u76EE\u6807\u5230\u624B\u6708\u85AA\uFF08\u5143\uFF09</span><input id="gu-net" type="number" inputmode="decimal" min="0" step="500" value="20000"></label>
    <label class="f"><span>\u4E2A\u4EBA\u793E\u4FDD\u516C\u79EF\u91D1\u6BD4\u4F8B\uFF08%\uFF09</span><input id="gu-rate" type="number" inputmode="decimal" min="0" max="60" step="0.5" value="17.5"></label>
    <label class="f"><span>\u4E13\u9879\u9644\u52A0\u6263\u9664\uFF08\u5143/\u6708\uFF09</span><input id="gu-spec" type="number" inputmode="decimal" min="0" step="500" value="2000"></label>
    <label class="f"><span>\u8D77\u5F81\u70B9\uFF08\u5143/\u6708\uFF09</span><input id="gu-thr" type="number" inputmode="decimal" min="0" step="500" value="5000"></label>
    <em>\u53E3\u5F84\uFF1A\u6309\u6708\u5EA6\u7D2F\u8BA1\u9884\u6263\u7684\u7A0E\u7387\u8868\u7B97\uFF0C\u793E\u4FDD\u6309\u7A0E\u524D\xD7\u6BD4\u4F8B\uFF08\u5404\u5730\u6709\u4E0A\u4E0B\u9650\uFF0C\u8FD9\u91CC\u4E0D\u8BBE\uFF09\uFF1B\u53CD\u63A8\u7528\u4E8C\u5206\u6CD5\uFF0C\u7ED3\u679C\u56DB\u820D\u4E94\u5165\u5230\u5206\u540E\u53EF\u80FD\u5DEE\u51E0\u6BDB\u94B1\u3002</em>
  </div>
  <div class="card res">
    <h2>\u5012\u63A8\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u7A0E\u524D\u6708\u85AA</span><strong id="gu-big">\u2014</strong></div>
    <ul class="kv">
      <li><span>\u793E\u4FDD\u516C\u79EF\u91D1\uFF08\u4E2A\u4EBA\uFF09</span><b id="gu-si">\u2014</b></li>
      <li><span>\u4E2A\u4EBA\u6240\u5F97\u7A0E</span><b id="gu-tax">\u2014</b></li>
      <li><span>\u7A0E\u8D1F\u7387\uFF08\u7A0E/\u7A0E\u524D\uFF09</span><b id="gu-tr">\u2014</b></li>
      <li><span>\u5E74\u5230\u624B / \u5E74\u7A0E\u524D</span><b id="gu-year">\u2014</b></li>
      <li><span>\u5E74\u85AA\u53E3\u5F84\u4E2A\u7A0E\u5408\u8BA1</span><b id="gu-ytax">\u2014</b></li>
      <li><span>\u5355\u4F4D\u603B\u6210\u672C\uFF08\u542B\u5355\u4F4D\u793E\u4FDD 25%\uFF09</span><b id="gu-cost">\u2014</b></li>
    </ul>
    <p class="hint" id="gu-note"></p>
  </div>
    </div>
  </section>
`,datemath:`  <section class="panel" id="panel-datemath">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u8D77\u59CB\u65E5\u671F</span>
      <input id="dtm-date" type="date" value="2026-01-31">
    </label>
    <label class="f">
      <span>\u52A0\u51CF\u6708\u6570\uFF08\u8D1F\u6570\u4E3A\u5F80\u524D\uFF09</span>
      <input id="dtm-months" type="number" inputmode="numeric" step="1" value="3">
    </label>
    <label class="f">
      <span>\u518D\u52A0\u51CF\u5929\u6570</span>
      <input id="dtm-days" type="number" inputmode="numeric" step="1" value="0">
      <em>\u5408\u540C\u300C3 \u4E2A\u6708\u540E\u300D\u6309\u5BF9\u65E5\u7B97\uFF1B\u5230\u671F\u65E5\u9047\u6CD5\u5B9A\u8282\u5047\u65E5\u987A\u5EF6\u8981\u81EA\u5DF1\u518D\u8C03</em>
    </label>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u7ED3\u679C\u65E5\u671F</span><strong id="dtm-big">\u2014</strong><span class="unit">\u65E5</span></div>
    <ul class="kv">
      <li><span>\u661F\u671F</span><b id="dtm-week">\u2014</b></li>
      <li><span>\u4E0E\u8D77\u59CB\u76F8\u9694</span><b id="dtm-gap">\u2014</b></li>
      <li><span>\u6708\u672B\u5BF9\u65E5</span><b id="dtm-rule">\u2014</b></li>
      <li><span>\u5F53\u5E74\u7B2C\u51E0\u5929</span><b id="dtm-doy">\u2014</b></li>
    </ul>
    <p class="hint" id="dtm-note"></p>
  </div>
    </div>
  </section>
`,pct3:`  <section class="panel" id="panel-pct3">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u57FA\u6570 A\uFF08\u5143\uFF09</span>
      <input id="pct-a" type="number" inputmode="decimal" step="1000" value="1000000">
    </label>
    <label class="f">
      <span>\u6BD4\u8F83\u6570 B\uFF08\u5143\uFF09</span>
      <input id="pct-b" type="number" inputmode="decimal" step="1000" value="1120000">
    </label>
    <label class="f">
      <span>\u767E\u5206\u6BD4 1\uFF08%\uFF09</span>
      <input id="pct-p1" type="number" inputmode="decimal" step="0.1" value="30">
    </label>
    <label class="f">
      <span>\u767E\u5206\u6BD4 2\uFF08%\uFF09</span>
      <input id="pct-p2" type="number" inputmode="decimal" step="0.1" value="33">
      <em>\u767E\u5206\u6BD4\u4E4B\u95F4\u53EA\u80FD\u76F8\u51CF\u51FA\u300C\u767E\u5206\u70B9\u300D\uFF0C\u4E0D\u80FD\u76F8\u9664\u5F53\u589E\u5E45</em>
    </label>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">B \u76F8\u5BF9 A \u7684\u589E\u5E45</span><strong id="pct-big">\u2014</strong><span class="unit">%</span></div>
    <ul class="kv">
      <li><span>\u5DEE\u989D\uFF08B \u2212 A\uFF09</span><b id="pct-diff">\u2014</b></li>
      <li><span>B \u5360 A \u7684\u6BD4\u4F8B</span><b id="pct-share">\u2014</b></li>
      <li><span>A \u5360 B \u7684\u6BD4\u4F8B</span><b id="pct-share2">\u2014</b></li>
      <li><span>\u4E24\u4E2A\u767E\u5206\u6BD4\u7684\u5DEE</span><b id="pct-pp">\u2014</b></li>
      <li><span>\u767E\u5206\u6BD4\u7684\u76F8\u5BF9\u53D8\u5316</span><b id="pct-rel">\u2014</b></li>
      <li><span>\u6362\u7B97\u793A\u4F8B</span><b id="pct-demo">\u2014</b></li>
    </ul>
    <p class="hint" id="pct-note"></p>
  </div>
    </div>
  </section>
`,xlhelp:`  <section class="panel" id="panel-xlhelp">
    <div class="cols">
  <div class="card">
    <h2>\u600E\u4E48\u7528</h2>
    <ul class="kv">
      <li><span>\u5355\u5143\u683C\u5F15\u7528</span><b>A1 \u76F8\u5BF9 \xB7 $A$1 \u7EDD\u5BF9 \xB7 A$1 \u9501\u884C</b></li>
      <li><span>\u533A\u57DF</span><b>A1:A100 \xB7 \u6574\u5217 A:A \xB7 \u8868\u540D \u88681[\u5217\u540D]</b></li>
      <li><span>\u62A5\u9519\u901F\u67E5</span><b>#N/A \u6CA1\u627E\u5230 \xB7 #REF! \u5F15\u7528\u88AB\u5220 \xB7 #DIV/0! \u9664\u96F6 \xB7 #VALUE! \u7C7B\u578B\u4E0D\u5BF9</b></li>
      <li><span>WPS</span><b>XLOOKUP/LET \u65B0\u7248\u652F\u6301\uFF0C\u8001\u65E7\u7248\u672C\u7528 INDEX+MATCH \u515C\u5E95</b></li>
    </ul>
    <p class="hint">\u516C\u5F0F\u53EA\u662F\u5DE5\u5177\uFF0C\u5148\u60F3\u6E05\u695A\u300C\u6309\u4EC0\u4E48\u952E\u5339\u914D\u3001\u8981\u7B2C\u51E0\u5217\u3001\u627E\u4E0D\u5230\u600E\u4E48\u529E\u300D\u8FD9\u4E09\u4EF6\u4E8B\uFF0C\u5199\u51FA\u6765\u57FA\u672C\u4E0D\u4F1A\u9519\u3002</p>
  </div>
  <div class="card res">
    <h2>\u5E38\u7528\u516C\u5F0F</h2>
    <div class="tablebox">
      <table>
        <thead><tr><th class="tal">\u573A\u666F</th><th class="tal">\u516C\u5F0F</th></tr></thead>
        <tbody id="xl-body"></tbody>
      </table>
    </div>
  </div>
    </div>
  </section>
`,csvrecon:`  <section class="panel" id="panel-csvrecon">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u8D26\u9762\u91D1\u989D\uFF08\u4E00\u884C\u4E00\u4E2A\uFF0C\u53EF\u7C98\u8D34\uFF09</span>
      <textarea id="rk-book" rows="5">12000
3500.5
8800
-1500</textarea>
    </label>
    <label class="f">
      <span>\u94F6\u884C\u6D41\u6C34\u91D1\u989D\uFF08\u4E00\u884C\u4E00\u4E2A\uFF09</span>
      <textarea id="rk-bank" rows="5">12000
3500.5
8800
-1500
260</textarea>
    </label>
    <label class="f">
      <span>\u5141\u8BB8\u8BEF\u5DEE\uFF08\u5143\uFF09</span>
      <input id="rk-tol" type="number" inputmode="decimal" step="0.01" value="0.01">
      <em>\u652F\u6301\u8D1F\u6570\u3001\u9017\u53F7\u548C\u8D27\u5E01\u7B26\u53F7\uFF0C\u4F1A\u81EA\u52A8\u6E05\u6D17\uFF1B\u540C\u91D1\u989D\u591A\u7B14\u6309\u6B21\u6570\u914D\u5BF9</em>
    </label>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u5408\u8BA1\u5DEE\u989D\uFF08\u6D41\u6C34 \u2212 \u8D26\u9762\uFF09</span><strong id="rk-big">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u8D26\u9762</span><b id="rk-booksum">\u2014</b></li>
      <li><span>\u6D41\u6C34</span><b id="rk-banksum">\u2014</b></li>
      <li><span>\u672A\u5339\u914D\u7B14\u6570</span><b id="rk-unmatch">\u2014</b></li>
      <li><span>\u672A\u5339\u914D\u5408\u8BA1</span><b id="rk-unsum">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th class="tal">\u672A\u5339\u914D</th><th>\u91D1\u989D</th></tr></thead>
        <tbody id="rk-body"></tbody>
      </table>
    </div>
    <p class="hint" id="rk-note"></p>
  </div>
    </div>
  </section>
`};export default{numwords:V,duedate:X,workday:Q,cagr:z,apportion:$,grossup:q,snaps:J,datemath:j,pct3:Z,xlhelp:nn,csvrecon:tn};
