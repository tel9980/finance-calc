var I=Object.defineProperty;var w=(t,e)=>I(t,"name",{value:e,configurable:!0});const{$:n,BACKUP_KEY:j,BUILD_TAG:nn,CAT_KEY:an,CAT_LABEL:tn,CHUNK_FILES:en,CHUNK_OF:ln,CMP_KEY:sn,CORE_CALC:pn,CURS:dn,DEFERRED_TAPS:rn,DEMO_SAVED:on,DIVISOR:cn,EDITED:un,ERR_BOX:mn,FAV_KEY:vn,FIELDS:fn,FIRST_ACTIVATE:bn,FREQ:hn,FREQ_KEY:gn,INSTALL_HIDE_KEY:Cn,KEY:xn,LAST_KEY:yn,MONTH_CATS:wn,MONTH_TABLE:Mn,NEXT_OF:En,PALETTE_EL:Tn,PENDING_PARAMS:Sn,PRE_KEY:_n,QUOTA_WARNED:An,RECENT_KEY:Wn,SAVE_TIMER:Fn,SCHEMA_KEY:Pn,SCHEMA_VERSION:Dn,SEARCH_KEY:Nn,SNAP_DROP_SEEN:kn,SNAP_KEY:Ln,SNAP_MAX:Rn,SNAP_PICK:Kn,STORED:In,TABS:Yn,TAB_NATURAL:On,THEME_KEY:Hn,TOAST_EL:Bn,TODAYBAR_KEY:Un,UNITS:Vn,WF_ARCH_KEY:Qn,WF_AUTO_IDX:Gn,WF_AUTO_LIST:Xn,WF_AUTO_STEP:zn,WF_AUTO_TIMER:Jn,WF_CUSTNAME_KEY:$n,WF_CUST_KEY:Zn,WF_CUST_NAME:qn,WF_DONE:jn,WF_EDIT:na,WF_EDIT_KEY:aa,WF_KEY:ta,WF_LAST:ea,WF_LEGACY:la,WF_MAN_KEY:sa,WF_MD:ia,WF_MD_FIELDS:pa,WF_MD_KEY:da,WF_MD_LINKS:ra,WF_META_KEY:oa,WF_MONTH_KEY:ca,WF_NOTE_KEY:ua,WF_NOTIFIED_KEY:ma,WF_NOTIFY_KEY:va,WF_PATHS:fa,WF_ROLE_KEY:ba,WF_ROLE_READY:ha,WF_SKIP_KEY:ga,WF_TASK_KEY:Ca,WF_TEMPLATES:xa,XL_ROWS:ya,YEAR_TABLE:wa,_onPanels:Ma,a11yTouch:Ea,activate:Ta,addMonths:k,annuityPV:Sa,annuityPayment:_a,applyFilter:Aa,applyParams:Wa,applyStoredTo:Fa,applyWfTpl:Pa,backupAgeDays:Da,bindWfDnd:Na,bindWfInline:ka,bizAdd:La,bonusSoloTax:Ra,buildLoanSchedule:Ka,buildShare:Ia,buildTabBadges:Ya,bumpFreq:Oa,calcLoan:Ha,calcMap:Ba,calcWorkflow:Ua,clearWfMan:Va,closePalette:Qa,cmpTabName:Ga,cnUpper:Xa,combineTax:za,convertTemp:Ja,copyText:$a,cumulativeTax:Za,curCat:qa,currentSnap:ja,demoFill:nt,demoHint:at,diagText:tt,dlJson:et,doInstall:lt,doPrint:st,drawMonthCats:it,drawMonthStack:pt,drawReportCharts:dt,drawRpMini:rt,drawnMonthlyChart:ot,drawnYearChart:ct,enhanceNums:ut,enhancePanelUi:mt,ensureChunk:vt,evalExpr:ft,favList:bt,fillCmpMod:ht,fillMonthGrid:gt,fillUnits:Ct,flash:xt,flushParams:yt,flushSave:wt,fmt:M,fmtAt:Mt,fmtDate:E,fx:Y,gauss:O,getWfCust:Et,getWfDone:Tt,getWfMan:St,getWfMeta:_t,getWfNotes:At,getWfSkip:Wt,hashTarget:Ft,installEvt:Pt,installHintHide:Dt,installHintOff:Nt,iosInstallTip:kt,iosLike:Lt,isFav:Rt,lastName:Kt,leftAfter:It,linkTo:L,loadCmpA:Yt,loadSnaps:Ot,loadWfArch:Ht,loadWfCust:Bt,loadWfDone:Ut,loadWfEdit:Vt,loadWfMan:Qt,loadWfMeta:Gt,loadWfNotes:Xt,loadWfSkip:zt,loadWfTask:Jt,loanRows:$t,makeSnap:Zt,markBackup:qt,markBadInputs:jt,matchQ:ne,money:d,monthToDate:H,monthlyIRR:ae,months:D,npvDiff:te,num:r,numBlur:ee,numFocus:le,numInput:se,numKey:ie,numOf:pe,openPalette:de,orderTabsForQuery:re,palKey:oe,panelEls:ce,panelParams:ue,parseAmounts:me,parseDate:B,parseNum:ve,pct:x,percentile:T,plRank:fe,plScoreCov:be,plScoreDsr:he,plScoreEmg:ge,plScoreLev:Ce,plScoreSave:xe,prePanels:ye,prefetchAllChunks:we,presets:Me,printCover:Ee,pushRecent:Te,pushSearch:Se,pwaStandalone:_e,quickOf:Ae,rateOf:We,readJsonFile:Fe,readMonthGrid:Pe,recentList:De,recordWf:Ne,refreshCounts:ke,refreshTableTools:Le,refreshTrackMods:Re,refreshWfBadge:Ke,renderLoanTable:Ie,renderNext:Ye,renderPalette:Oe,renderPresets:He,renderSearchHist:Be,renderSnapCompare:Ue,renderSnapList:Ve,renderTodayBar:Qe,renderTrack:Ge,renderWfTpl:Xe,rentBuyAt:ze,restore:Je,runCalc:$e,runDeferredTaps:Ze,save:U,saveCmpA:qe,saveFav:je,savePresets:nl,saveSnaps:al,saveWfCust:tl,savedCat:el,schemaInit:ll,schemaMigrate:sl,scrollResultIfDeepLink:il,searchHist:pl,setCat:dl,setSub:rl,setTheme:ol,shareCalc:cl,sharePayload:ul,showErrorBox:ml,showInstBar:vl,showUpdateBar:fl,snapNameOf:bl,snapTipText:hl,snapshot:gl,st0:Cl,stamp:xl,startName:yl,syncInstallUi:wl,tabCatLabel:Ml,tabScore:El,tap:Tl,taxBy:Sl,toast:_l,toggleWfStep:Al,trimNum:Wl,unitFor:Fl,updShown:Pl,wfAllPaths:Dl,wfArchiveMonth:Nl,wfArchivePut:kl,wfAutoNext:Ll,wfAutoStop:Rl,wfAutoWalk:Kl,wfBar:Il,wfBindCustQ:Yl,wfBuildHandoff:Ol,wfCarryMissing:Hl,wfCarryQuery:Bl,wfCarryWarn:Ul,wfCsvCell:Vl,wfCustNameSave:Ql,wfDayDiff:Gl,wfDetailRender:Xl,wfEditPath:zl,wfEditReset:Jl,wfEditSave:$l,wfEditToggle:Zl,wfFillCustSel:ql,wfHandoff:jl,wfHandoffCopy:ns,wfHandoffCsv:as,wfHandoffPrint:ts,wfHasAnyData:es,wfHideStep:ls,wfKnownMods:ss,wfLegacyToNew:is,wfLoad:ps,wfManSave:ds,wfMdHref:rs,wfMdRender:os,wfMdSave:cs,wfMetaSave:us,wfMigrateLegacy:ms,wfMonthKey:vs,wfMonthRoll:fs,wfMonthTouch:bs,wfMoveStep:hs,wfNoteSave:gs,wfNotifyCheck:Cs,wfNotifyGranted:xs,wfNotifyPref:ys,wfNotifySend:ws,wfNotifySetPref:Ms,wfNotifyStatus:Es,wfNotifyToggle:Ts,wfOpenInline:Ss,wfOpenTasks:_s,wfPad2:As,wfPathMods:Ws,wfPlaceInline:Fs,wfPlaceNear:Ps,wfProgress:Ds,wfRenderSummary:Ns,wfRoleSaved:ks,wfScopedPaths:Ls,wfSet:Rs,wfSkipCurrent:Ks,wfSkipSave:Is,wfStepKey:Ys,wfStepShare:Os,wfStepState:Hs,wfTaskAdd:Bs,wfTaskBox:Us,wfTaskDel:Vs,wfTaskPending:Qs,wfTaskSave:Gs,wfTaskToggle:Xs,wfTodayPick:zs,wfTodayStr:Js,wfUnhideStep:$s,wfVisiblePaths:Zs,yuan:c,zOf:qs}=window.FC;function V(){var t=r(n("dp-principal")),e=r(n("dp-rate"))/100,s=r(n("dp-term")),i=n("dp-unit").value,p=n("dp-mode").value,a=i==="year"?s:i==="month"?s/12:s/365,l=0;t>0&&a>0&&e>=0&&(p==="simple"?l=t*e*a:p==="year"?l=t*(Math.pow(1+e,a)-1):l=t*(Math.pow(1+e/12,a*12)-1));var o=t+l,u=t>0&&a>0&&o>0?Math.pow(o/t,1/a)-1:0,f=a*12;n("dp-interest").textContent=d(l),n("dp-total").textContent=c(o),n("dp-real").textContent=x(u,3),n("dp-permonth").textContent=f>0?c(l/f):"\u2014",n("dp-perday").textContent=a>0?c(l/(a*365)):"\u2014";var m="";t<=0||a<=0?m="\u586B\u597D\u672C\u91D1\u548C\u671F\u9650\u540E\u81EA\u52A8\u8BA1\u7B97\u3002":p==="simple"?(m="\u5355\u5229\uFF1A\u5229\u606F = \u672C\u91D1 \xD7 \u5E74\u5229\u7387 \xD7 \u5E74\u6570\u3002\u6574\u5B58\u6574\u53D6\u5B9A\u671F\u5230\u671F\u4E00\u6B21\u6027\u4ED8\u606F\uFF0C\u5229\u606F\u514D\u5F81\u4E2A\u4EBA\u6240\u5F97\u7A0E\u3002",i==="day"&&(m+=" \u6309\u5929\u7B97\u65F6\u4E00\u5E74\u6309 365 \u5929\u6298\u3002")):m="\u590D\u5229\u53E3\u5F84\uFF1A\u6BCF\u5E74\uFF08\u6216\u6BCF\u6708\uFF09\u7684\u5229\u606F\u6EDA\u5165\u672C\u91D1\u518D\u8BA1\u606F\u3002\u94F6\u884C\u5B9A\u671F\u5230\u671F\u4E00\u6B21\u6027\u4ED8\u606F\u5E76\u4E0D\u6EDA\u5229\uFF0C\u5B9E\u9645\u6536\u76CA\u4EE5\u5355\u5229\u53E3\u5F84\u4E3A\u51C6\u3002",n("dp-note").textContent=m}w(V,"calcDeposit");function Q(){var t=r(n("cp-start")),e=r(n("cp-monthly")),s=r(n("cp-rate"))/100,i=D(r(n("cp-years"))*12),p=n("cp-timing").value,a=s/12,l=Math.pow(1+a,i),o=t*l,u;i<=0?u=0:a===0?u=e*i:u=e*((l-1)/a)*(p==="begin"?1+a:1);var f=o+u,m=t+e*i,v=f-m;n("cp-fv").textContent=d(f),n("cp-cost").textContent=c(m),n("cp-gain").textContent=c(v),n("cp-ratio").textContent=m>0?x(v/m):"\u2014";var b="\u2014";s>0?b=M(Math.log(2)/Math.log(1+s),1)+" \u5E74":s===0&&(b="\u4E0D\u4F1A\u7FFB\u500D"),n("cp-double").textContent=b;var h;i<=0?h="\u586B\u597D\u5E74\u9650\u540E\u81EA\u52A8\u8BA1\u7B97\u3002":s<=0?h="\u5E74\u5316\u6536\u76CA\u7387\u4E3A 0 \u65F6\uFF0C\u671F\u672B\u603B\u989D\u5C31\u662F\u672C\u91D1\u7D2F\u52A0\u3002":(h="\u6309\u6708\u590D\u5229\u6D4B\u7B97\uFF1A\u672C\u91D1\u6EDA "+i+" \u4E2A\u6708\uFF0C\u5B9A\u6295\u6309"+(p==="begin"?"\u6708\u521D":"\u6708\u5E95")+"\u6295\u5165\u3002\u5B9A\u671F\u5B9A\u989D\u4E70\u57FA\u91D1\u3001\u7406\u8D22\u7684\u957F\u671F\u7ED3\u679C\u63A5\u8FD1\u8FD9\u4E2A\u53E3\u5F84\u3002",e>0&&(h+=" \u5176\u4E2D\u6BCF\u6708\u5B9A\u6295\u90E8\u5206\u5230\u671F\u503C "+d(u)+" \u5143\u3002")),n("cp-note").textContent=h}w(Q,"calcCompound");function G(){var t=r(n("gl-target")),e=r(n("gl-start")),s=r(n("gl-monthly")),i=r(n("gl-rate"))/100/12,p=r(n("gl-years"));if(!(t>0)){n("gl-time").textContent="\u2014",["gl-date","gl-cost","gl-gain","gl-need"].forEach(function(h){n(h).textContent="\u2014"}),n("gl-note").textContent="\u586B\u597D\u76EE\u6807\u91D1\u989D\u540E\u81EA\u52A8\u8BA1\u7B97\u3002";return}if(e>=t){n("gl-time").textContent="\u5DF2\u7ECF\u6512\u591F\u4E86",n("gl-time-unit").textContent="",n("gl-date").textContent="\u2014",n("gl-cost").textContent=c(e),n("gl-gain").textContent="\u2014",n("gl-need").textContent="0 \u5143",n("gl-note").textContent="\u73B0\u6709\u8D44\u91D1\u5DF2\u7ECF\u8FBE\u5230\u76EE\u6807\u91D1\u989D\uFF0C\u4E0D\u7528\u518D\u5B58\u3002";return}for(var a=-1,l=0,o=1;o<=1200;o++)if(l=i>0?e*Math.pow(1+i,o)+s*((Math.pow(1+i,o)-1)/i):e+s*o,l>=t){a=o;break}if(a<0)n("gl-time").textContent="\u6512\u4E0D\u5230",n("gl-time-unit").textContent="",n("gl-date").textContent="\u2014",n("gl-cost").textContent="\u2014",n("gl-gain").textContent="\u2014",n("gl-need").textContent="\u2014",n("gl-note").textContent="\u6BCF\u6708\u5B58\u7684\u94B1\u592A\u5C11\u3001\u6536\u76CA\u7387\u53C8\u4E0D\u591F\uFF0C100 \u5E74\u4E5F\u5230\u4E0D\u4E86\u76EE\u6807\uFF0C\u5F97\u63D0\u9AD8\u6BCF\u6708\u5B58\u6B3E\u989D\u3002";else{var u=Math.floor(a/12),f=a%12;n("gl-time").textContent=u>0?u+" \u5E74"+(f>0?" "+f+" \u4E2A\u6708":""):f+" \u4E2A\u6708",n("gl-time-unit").textContent="",n("gl-date").textContent="\u7EA6 "+H(a);var m=e+s*a;n("gl-cost").textContent=c(m),n("gl-gain").textContent=c(l-m)}var v=D(p*12),b=0;v>0&&(b=i>0?(t-e*Math.pow(1+i,v))*i/(Math.pow(1+i,v)-1):(t-e)/v,b=Math.max(0,b)),n("gl-need").textContent=v>0?c(b)+"\uFF08"+M(p,p%1===0?0:1)+" \u5E74\u5185\uFF09":"\u2014",a>=0&&(n("gl-note").textContent=Y("\u6309\u6BCF\u6708\u5B58 "+d(s)+" \u5143\u3001\u5E74\u5316 "+M(r(n("gl-rate")),2)+"% \u6D4B\u7B97\uFF0C\u7EA6 "+a+" \u4E2A\u6708\u540E\u8FBE\u6210 "+d(t)+" \u5143\u76EE\u6807\u3002\u60F3\u66F4\u5FEB\u5C31\u4E24\u6761\u8DEF\uFF1A\u591A\u5B58\uFF08\u6BCF\u6708\u591A "+d(Math.max(0,b-s))+" \u5143\u53EF\u5728\u8BBE\u5B9A\u5E74\u9650\u5185\u8FBE\u6210\uFF09\u6216\u8005\u63D0\u9AD8\u6536\u76CA\u7387\u2014\u2014\u4F46\u6536\u76CA\u7387\u8D8A\u9AD8\u98CE\u9669\u8D8A\u5927\uFF0C\u65E5\u5E38\u6512\u94B1\u522B\u628A\u6536\u76CA\u7387\u5F53\u6210\u4E3B\u8981\u53D8\u91CF\u3002")),n("gl-links")&&(n("gl-links").innerHTML="\u63A5\u7740\u7B97\uFF1A"+L("compound",{"cp-start":e,"cp-monthly":s,"cp-rate":r(n("gl-rate")),"cp-years":p},"\u653E\u7740\u4E0D\u52A8\u80FD\u6EDA\u6210\u591A\u5C11")+L("fire",{"fr-has":e+s*12,"fr-save":s},"\u79BB\u8D22\u52A1\u81EA\u7531\u8FD8\u6709\u591A\u8FDC")+L("deposit",{"dp-principal":t},"\u76EE\u6807\u91D1\u989D\u5B58\u5B9A\u671F\u80FD\u6709\u591A\u5C11\u5229\u606F"))}w(G,"calcGoal");function X(){var t=r(n("an-start")),e=r(n("an-end")),s=r(n("an-days"));if(!(t>0&&e>0&&s>0)){["an-cagr","an-simple","an-return","an-perday","an-yeargain"].forEach(function(l){n(l).textContent="\u2014"}),n("an-note").textContent="\u672C\u91D1\u3001\u671F\u672B\u91D1\u989D\u3001\u6301\u6709\u5929\u6570\u90FD\u8981\u5927\u4E8E 0\u3002";return}var i=e/t-1,p=Math.pow(e/t,365/s)-1,a=i*365/s;n("an-cagr").textContent=M(p*100,2),n("an-simple").textContent=x(a),n("an-return").textContent=x(i),n("an-perday").textContent=c((e-t)/s),n("an-yeargain").textContent=c(t*p),n("an-note").textContent="\u590D\u5229\u5E74\u5316 = (\u671F\u672B\xF7\u672C\u91D1)^(365\xF7\u5929\u6570) \u2212 1\uFF0C\u7528\u6765\u6A2A\u5411\u6BD4\u8F83\u4E0D\u540C\u671F\u9650\u7684\u4EA7\u54C1\uFF1B\u6301\u6709\u4E0D\u6EE1\u4E00\u5E74\u65F6\u77ED\u671F\u6CE2\u52A8\u4F1A\u88AB\u653E\u5927\uFF0C\u522B\u62FF\u51E0\u5929\u7684\u9AD8\u6536\u76CA\u76F4\u63A5\u5E74\u5316\u5F53\u9884\u671F\u3002"}w(X,"calcAnnual");function z(){var t=r(n("if-amount")),e=r(n("if-rate"))/100,s=r(n("if-years")),i=t>0&&s>0,p=Math.pow(1+e,s),a=i?t/p:0,l=i?t*p:0,o=i?1-1/p:0;n("if-main").textContent=d(a),n("if-main-label").textContent="N \u5E74\u540E\u7684\u8D2D\u4E70\u529B",n("if-power").textContent=c(a),n("if-need").textContent=c(l),n("if-loss").textContent=x(o),n("if-annualloss").textContent=i?x(1-1/(1+e),3)+" / \u5E74":"\u2014";var u;i?e===0?u="\u901A\u80C0\u7387\u4E3A 0 \u65F6\uFF0C\u94B1\u7684\u8D2D\u4E70\u529B\u4E0D\u53D8\u3002":u="\u6309 "+M(e*100,2)+"% \u7684\u5E74\u901A\u80C0\u7387\uFF1A\u4ECA\u5929\u7684 "+d(t)+" \u5143\uFF0C\u8FC7 "+M(s,0)+" \u5E74\u7684\u8D2D\u4E70\u529B\u53EA\u76F8\u5F53\u4E8E\u4ECA\u5929\u7684 "+d(a)+" \u5143\uFF1B\u60F3\u4E70\u5230\u4ECA\u5929\u540C\u6837\u7684\u4E1C\u897F\uFF0C\u5C4A\u65F6\u9700\u8981 "+d(l)+" \u5143\u3002\u4E5F\u5C31\u662F\u8BF4\uFF0C\u7406\u8D22\u5E74\u5316\u6536\u76CA\u7387\u957F\u671F\u81F3\u5C11\u8981\u8DD1\u8FC7\u901A\u80C0\u7387\uFF0C\u94B1\u624D\u6CA1\u5728\u53D8\u8584\u3002":u="\u586B\u597D\u91D1\u989D\u548C\u5E74\u6570\u540E\u81EA\u52A8\u8BA1\u7B97\u3002",n("if-note").textContent=u}w(z,"calcInflation");function J(){var t=Math.max(0,r(n("ld-total"),0)),e=Math.max(0,r(n("ld-r1"),0))/100,s=Math.max(0,r(n("ld-r2"),0))/100,i=Math.max(0,r(n("ld-r3"),0))/100,p=t/3,a=p*e*1,l=p*s*2,o=p*i*3,u=a+l+o,f=t*i*3,m=t>0?u/t/3:0;n("ld-int").textContent=d(u),n("ld-part").textContent=c(p),n("ld-i1").textContent=c(a),n("ld-i2").textContent=c(l),n("ld-i3").textContent=c(o),n("ld-all").textContent=c(f),n("ld-cost").textContent=c(Math.max(0,f-u)),n("ld-avg").textContent=x(m,3),n("ld-m12").textContent=c(p+a)+"\uFF08\u672C\u606F\uFF09";var v=[["\u7B2C 1 \u5E74\u672B",p,"1 \u5E74\u671F",a,p+a],["\u7B2C 2 \u5E74\u672B",p,"2 \u5E74\u671F",l,p+l],["\u7B2C 3 \u5E74\u672B",p,"3 \u5E74\u671F",o,p+o]],b=n("ld-body");b.innerHTML="";for(var h=0;h<v.length;h++){for(var y=document.createElement("tr"),g=0;g<v[h].length;g++){var C=document.createElement("td");C.textContent=g===1||g===3||g===4?d(v[h][g]):v[h][g],y.appendChild(C)}b.appendChild(y)}n("ld-note").textContent="\u628A "+d(t)+" \u5143\u62C6\u6210\u4E09\u4EFD\u5404 "+d(p)+"\uFF0C\u5206\u522B\u5B58 1 \u5E74\u30012 \u5E74\u30013 \u5E74\u671F\uFF0C\u4E8E\u662F\u4ECE\u7B2C 1 \u5E74\u672B\u5F00\u59CB\u6BCF\u5E74\u90FD\u6709\u4E00\u7B14\u5230\u671F\uFF0C\u7528\u94B1\u4E0D\u7528\u5168\u7838\u5728\u5B9A\u671F\u91CC\u63D0\u524D\u652F\u53D6\uFF08\u90A3\u6837\u53EA\u80FD\u62FF\u6D3B\u671F\u5229\u606F\uFF09\u3002 \u4E09\u5E74\u7D2F\u8BA1\u5229\u606F "+d(u)+"\uFF0C\u5E73\u5747\u5E74\u5316 "+x(m,3)+"\uFF1B\u5982\u679C\u4E00\u5F00\u59CB\u5168\u5B58 3 \u5E74\u671F\uFF0C\u5229\u606F\u662F "+d(f)+"\uFF0C\u4E5F\u5C31\u662F\u4E3A\u4E86\u300C\u6BCF\u5E74\u90FD\u6709\u4E00\u7B14\u80FD\u53D6\u300D\u591A\u4ED8\u51FA\u7684\u4EE3\u4EF7\u7EA6 "+d(Math.max(0,f-u))+" \u5143\u3002 \u6EDA\u52A8\u8D77\u6765\u7684\u505A\u6CD5\u662F\uFF1A\u7B2C 1 \u5E74\u672B\u5230\u671F\u7684\u90A3\u7B14\u6539\u5B58 3 \u5E74\u671F\uFF0C\u7B2C 2 \u5E74\u672B\u5230\u671F\u7684\u90A3\u7B14\u4E5F\u6539\u5B58 3 \u5E74\u671F\u2014\u2014\u4E09\u5E74\u4E4B\u540E\u4E09\u7B14\u5168\u90E8\u53D8\u6210 3 \u5E74\u671F\uFF0C\u4E14\u4ECD\u7136\u6BCF\u5E74\u5230\u671F\u4E00\u7B14\uFF0C\u6536\u76CA\u5C31\u8FFD\u4E0A\u300C\u5168\u5B58 3 \u5E74\u300D\u4E86\u3002 \u5229\u7387\u6309\u4F60\u80FD\u62FF\u5230\u7684\u6302\u724C\u4EF7\u586B\uFF08\u4E2D\u5C0F\u94F6\u884C\u3001\u5927\u989D\u5B58\u5355\u901A\u5E38\u66F4\u9AD8\uFF09\uFF0C\u5B58\u6B3E\u4FDD\u9669\u5BF9\u540C\u4E00\u5BB6\u94F6\u884C\u672C\u606F\u6700\u9AD8\u507F\u4ED8 50 \u4E07\u5143\uFF0C\u8D85\u8FC7\u5C31\u5206\u6563\u5230\u4E0D\u540C\u94F6\u884C\u3002"}w(J,"calcLadder");function $(){for(var t=Math.max(0,r(n("dc-amount"),0)),e=Math.max(1,D(r(n("dc-months"),12))),s=Math.max(-.99,r(n("dc-return"),6)/100),i=Math.max(0,Math.min(2,r(n("dc-vol"),18)/100)),p=Math.max(0,r(n("dc-cash"),2)/100),a=Math.max(0,r(n("dc-hold"),0)),l=e+Math.round(a*12),o=t*Math.pow(1+s,l/12),u=0,f=t/e,m=0;m<e&&m<l;m++)u+=f*Math.pow(1+p,m/12)*Math.pow(1+s,(l-m)/12);for(var v=i/Math.sqrt(12),b=Math.log(1+s)/12-v*v/2,h=2e3,y=0,g=[],C=[],W=0;W<h;W++){var S=new Array(l+1),_=1;S[l]=1;for(var A=l-1;A>=0;A--)_*=Math.exp(b+v*O()),S[A]=_;for(var F=t*S[0],N=0,P=0;P<e&&P<l;P++)N+=f*Math.pow(1+p,P/12)*S[P];g.push(F),C.push(N),F>N&&y++}var R=y/h;n("dc-dca").textContent=d(u),n("dc-lump").textContent=c(o),n("dc-gap").textContent=c(o-u),n("dc-win").textContent=x(R,1),n("dc-dcaMed").textContent=c(T(C,.5)),n("dc-lumpMed").textContent=c(T(g,.5)),n("dc-dcaBad").textContent=c(T(C,.05)),n("dc-lumpBad").textContent=c(T(g,.05)),n("dc-info").textContent=d(t)+" \u5143 / "+l+" \u4E2A\u6708";var K=T(C,.05)-T(g,.05);n("dc-note").textContent="\u540C\u6837 "+d(t)+" \u5143\uFF0C"+e+" \u4E2A\u6708\u5185\u5206\u6279\u6295\u5B8C\uFF0C\u4E4B\u540E\u7EE7\u7EED\u6301\u6709 "+M(a,0)+" \u5E74\uFF1A \u5B9A\u6295\u671F\u671B "+d(u)+" \u5143\uFF0C\u4E00\u6B21\u6027\u671F\u671B "+d(o)+" \u5143\uFF0C\u4E00\u6B21\u6027\u9AD8\u51FA "+d(o-u)+" \u5143\u3002 \u8FD9\u4E0D\u662F bug\uFF1A\u94B1\u8D8A\u65E9\u5165\u5E02\uFF0C\u4EAB\u53D7\u4E0A\u6DA8\u7684\u65F6\u95F4\u8D8A\u957F\uFF0C\u5B9A\u6295\u5E73\u5747\u6709\u4E00\u534A\u7684\u94B1\u665A\u4E86\u534A\u5E74\u8FDB\u573A\u3002 2000 \u6B21\u8499\u7279\u5361\u6D1B\u6A21\u62DF\u91CC\uFF0C\u4E00\u6B21\u6027\u6709 "+x(R,1)+" \u7684\u6982\u7387\u8DD1\u8D62\u5B9A\u6295\u2014\u2014\u671F\u671B\u503C\u548C\u80DC\u7387\u90FD\u504F\u5411\u4E00\u6B21\u6027\u3002 \u5B9A\u6295\u6362\u6765\u7684\u4E0D\u662F\u66F4\u9AD8\u6536\u76CA\uFF0C\u800C\u662F\u66F4\u7A84\u7684\u7ED3\u679C\u5206\u5E03\uFF1A\u770B\u6700\u5DEE 5% \u7684\u60C5\u5F62\uFF0C\u4E00\u6B21\u6027\u53EA\u5269 "+d(T(g,.05))+" \u5143\uFF0C\u5B9A\u6295\u6709 "+d(T(C,.05))+" \u5143\uFF08\u9AD8 "+d(K)+"\uFF09\uFF0C \u56E0\u4E3A\u5B9A\u6295\u7684\u540E\u7EED\u4E70\u5165\u662F\u5728\u8DCC\u4E0B\u6765\u4E4B\u540E\u53D1\u751F\u7684\u3002 \u6240\u4EE5\uFF1A\u624B\u91CC\u5DF2\u6709\u4E00\u5927\u7B14\u94B1\u3001\u4E14\u80FD\u627F\u53D7 30% \u4EE5\u4E0A\u6D6E\u4E8F\u7684\uFF0C\u4E00\u6B21\u6027\uFF08\u6216 3\u20136 \u4E2A\u6708\u5206\u6279\uFF09\u66F4\u5408\u7406\uFF1B\u9760\u6BCF\u6708\u5DE5\u8D44\u7ED3\u4F59\u6512\u94B1\u7684\uFF0C\u5B9A\u6295\u672C\u6765\u5C31\u662F\u552F\u4E00\u9009\u9879\u3002 \u53C2\u6570\u63D0\u9192\uFF1A\u9884\u671F\u6536\u76CA\u586B\u7684\u662F\u957F\u671F\u5E74\u5316\u671F\u671B\uFF08\u80A1\u57FA\u5386\u53F2 6\u20138% \u662F\u5E38\u89C1\u5047\u8BBE\uFF09\uFF0C\u6CE2\u52A8\u7387 18% \u7EA6\u7B49\u4E8E\u6CAA\u6DF1 300 \u91CF\u7EA7\u3001\u503A\u57FA 3\u20135%\u3002 \u4E24\u4E2A\u53EF\u4EE5\u81EA\u5DF1\u9A8C\u8BC1\u7684\u5730\u65B9\uFF1A\u2460 \u628A\u300C\u672A\u6295\u5165\u8D44\u91D1\u6536\u76CA\u300D\u586B 0\u3001\u9884\u671F\u6536\u76CA\u4E5F\u586B 0\uFF0C\u4E24\u8FB9\u671F\u671B\u503C\u4F1A\u5B8C\u5168\u76F8\u7B49\u2014\u2014\u8BF4\u660E\u96F6\u6F02\u79FB\u4E0B\u6CE2\u52A8\u672C\u8EAB\u4E0D\u521B\u9020\u6536\u76CA\uFF0C\u8FD9\u91CC\u5B9A\u6295\u671F\u671B\u9AD8\u51FA\u7684\u90A3\u90E8\u5206\u5168\u90E8\u6765\u81EA\u6CA1\u6295\u51FA\u53BB\u7684\u94B1\u8D5A\u4E86\u8D27\u57FA\u5229\u606F\uFF1B \u2461 \u628A\u6CE2\u52A8\u7387\u4E5F\u586B 0\uFF0C\u4E24\u8FB9\u9000\u5316\u4E3A\u7EAF\u590D\u5229\uFF0C\u4E00\u6B21\u6027\u5FC5\u7136\u66F4\u9AD8\u3002\u6240\u4EE5\u522B\u628A\u5B9A\u6295\u5F53\u300C\u63D0\u9AD8\u6536\u76CA\u300D\u7684\u5DE5\u5177\uFF0C\u5B83\u4E70\u7684\u662F\u7EAA\u5F8B\u548C\u66F4\u7A84\u7684\u4E0B\u9650\u3002"}w($,"calcDCA");function Z(){var t=Math.max(0,r(n("cl-total"),0)),e=Math.max(1,Math.min(36,Math.round(r(n("cl-count"),12)))),s=Math.max(1,D(r(n("cl-gap"),1))),i=Math.max(1,D(r(n("cl-term"),12))),p=Math.max(0,r(n("cl-rate"),0))/100,a=B(n("cl-start").value);a||(a=new Date,a=new Date(a.getFullYear(),a.getMonth(),a.getDate()),n("cl-start").value=E(a),U());var l=t/e,o=l*p*i/12,u=[],f=n("cl-body");f.innerHTML="";for(var m=null,v=null,b=0;b<e;b++){var h=k(a,b*s),y=k(h,i);b===0&&(m=y),v=y;for(var g=[b+1+"",E(h),E(y),d(l),d(o),d(l+o)],C=document.createElement("tr"),W=0;W<g.length;W++){var S=document.createElement("td");S.textContent=g[W],C.appendChild(S)}f.appendChild(C)}var _=o*e,A=0;e>1&&(A=Math.round((k(a,s)-a)/864e5));var F=Math.round((v-m)/864e5);n("cl-each").textContent=d(l+o),n("cl-per").textContent=c(l),n("cl-first").textContent=E(m),n("cl-last").textContent=E(v),n("cl-gapdays").textContent=e>1?A+" \u5929\uFF08"+s+" \u4E2A\u6708\uFF09":"\u53EA\u6709\u4E00\u7B14",n("cl-span").textContent=e>1?F+" \u5929\uFF08\u7EA6 "+M(F/30.44,1)+" \u4E2A\u6708\uFF09":"\u2014",n("cl-int").textContent=c(_),n("cl-sum").textContent=c(t+_),n("cl-note").textContent="\u628A "+d(t)+" \u62C6\u6210 "+e+" \u7B14\u5404 "+d(l)+"\uFF0C\u4ECE "+E(a)+" \u8D77\u6BCF "+s+" \u4E2A\u6708\u5B58\u4E00\u7B14\u3001\u6BCF\u7B14\u5B58 "+i+" \u4E2A\u6708\uFF1A\u7B2C\u4E00\u7B14 "+E(m)+" \u5230\u671F\uFF0C\u6700\u540E\u4E00\u7B14 "+E(v)+" \u5230\u671F\uFF0C\u6B64\u540E\u6BCF "+(e>1?A+" \u5929":"\u2014")+"\u5C31\u6709\u4E00\u7B14\u94B1\u5230\u671F\u3002 \u6BCF\u7B14\u5229\u606F "+d(o)+"\uFF0C\u5168\u90E8\u5230\u671F\u5229\u606F\u5408\u8BA1 "+d(_)+"\uFF0C\u5230\u671F\u672C\u606F "+d(t+_)+" \u5143\u3002 \u8FD9\u4E48\u6392\u7684\u610F\u4E49\uFF1A\u65E2\u4E0D\u662F\u628A\u94B1\u5168\u538B\u5728\u4E00\u7B14\u5B9A\u671F\u4E0A\uFF08\u6025\u7528\u5C31\u5F97\u63D0\u524D\u652F\u53D6\u3001\u6309\u6D3B\u671F\u7B97\uFF09\uFF0C\u4E5F\u4E0D\u4F1A\u51FA\u73B0\u300C\u597D\u51E0\u7B14\u540C\u65F6\u5230\u671F\u3001\u5230\u671F\u65E5\u5168\u6324\u5728\u4E00\u4E2A\u6708\u300D\u2014\u2014\u90A3\u6837\u518D\u6295\u8D44\u65F6\u70B9\u96C6\u4E2D\uFF0C\u4E00\u65E6\u8D76\u4E0A\u5229\u7387\u4E0B\u884C\u5C31\u4E00\u8D77\u88AB\u538B\u4EF7\u3002\u5747\u5300\u9519\u5F00\u4E4B\u540E\uFF0C\u6BCF\u9694\u4E00\u6BB5\u65F6\u95F4\u90FD\u6709\u4E00\u7B14\u53EF\u7EED\u6295\u3001\u53EF\u53D6\u7528\u3002 \u73A9\u6CD5\u5EF6\u5C55\uFF1A\u2460 \u5DE5\u8D44\u5230\u8D26\u5C31\u5B58\u4E00\u7B14\uFF08\u95F4\u9694 1 \u4E2A\u6708\uFF09\uFF0C\u4E00\u5E74\u540E\u6BCF\u6708\u90FD\u6709\u4E00\u7B14\u5230\u671F\uFF0C\u7B49\u4E8E\u81EA\u5DF1\u7684\u300C\u6708\u5EA6\u73B0\u91D1\u6D41\u300D\uFF1B \u2461 \u671F\u9650\u8BBE\u6210\u9636\u68AF\uFF081 \u5E74\u30012 \u5E74\u30013 \u5E74\u5404\u6392\u51E0\u7B14\uFF09\uFF0C\u517C\u987E\u6536\u76CA\u548C\u7075\u6D3B\uFF1B\u2462 \u5230\u671F\u5C31\u7EED\u5B58\u6700\u957F\u53EF\u63A5\u53D7\u671F\u9650\uFF0C\u6536\u76CA\u4F1A\u9010\u6B65\u8FFD\u4E0A\u5168\u5B58\u957F\u671F\u3002 \u4E24\u4E2A\u63D0\u9192\uFF1A\u5B58\u6B3E\u4FDD\u9669\u5BF9\u540C\u4E00\u5BB6\u94F6\u884C\u672C\u606F\u6700\u9AD8\u507F\u4ED8 50 \u4E07\u5143\uFF0C\u603B\u989D\u8D85\u8FC7\u5C31\u5206\u6563\u5230\u4E0D\u540C\u94F6\u884C\uFF1B\u5229\u7387\u6309\u4F60\u80FD\u62FF\u5230\u7684\u6302\u724C\u4EF7\u586B\uFF0C\u4E2D\u5C0F\u94F6\u884C\u3001\u5927\u989D\u5B58\u5355\u901A\u5E38\u66F4\u9AD8\uFF0C\u4F46\u8981\u6CE8\u610F\u662F\u5426\u6709\u300C\u9760\u6863\u8BA1\u606F\u300D\u300C\u63D0\u524D\u652F\u53D6\u6309\u6D3B\u671F\u300D\u7684\u6761\u6B3E\u3002\u65E5\u671F\u8BA1\u7B97\u6309\u81EA\u7136\u6708\u5BF9\u65E5\u3001\u9047\u5230\u6708\u672B\u81EA\u52A8\u53D6\u5F53\u6708\u6700\u540E\u4E00\u5929\u3002"}w(Z,"calcCalendar");export const PANELS={deposit:`  <section class="panel" id="panel-deposit">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u5B58\u6B3E\u672C\u91D1\uFF08\u5143\uFF09</span>
      <input id="dp-principal" type="number" inputmode="decimal" min="0" step="1000" value="100000">
    </label>
    <label class="f">
      <span>\u5E74\u5229\u7387\uFF08%\uFF09</span>
      <input id="dp-rate" type="number" inputmode="decimal" min="0" step="0.05" value="1.05">
      <em>\u586B\u94F6\u884C\u6302\u724C\u7684\u5E74\u5229\u7387\uFF0C\u5982 1.05 \u8868\u793A 1.05%</em>
    </label>
    <label class="f">
      <span>\u5B58\u6B3E\u671F\u9650</span>
      <span class="row">
        <input id="dp-term" type="number" inputmode="decimal" min="0" step="1" value="2">
        <select id="dp-unit">
          <option value="year" selected>\u5E74</option>
          <option value="month">\u4E2A\u6708</option>
          <option value="day">\u5929</option>
        </select>
      </span>
    </label>
    <label class="f">
      <span>\u8BA1\u606F\u65B9\u5F0F</span>
      <select id="dp-mode">
        <option value="simple" selected>\u5355\u5229\uFF08\u6574\u5B58\u6574\u53D6\u5B9A\u671F\uFF09</option>
        <option value="year">\u6309\u5E74\u590D\u5229\uFF08\u5229\u6EDA\u5229\uFF09</option>
        <option value="month">\u6309\u6708\u590D\u5229</option>
      </select>
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u5230\u671F\u5229\u606F</span>
      <strong id="dp-interest">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u672C\u606F\u5408\u8BA1</span><b id="dp-total">\u2014</b></li>
      <li><span>\u5B9E\u9645\u5E74\u5316\uFF08\u590D\u5229\u53E3\u5F84\uFF09</span><b id="dp-real">\u2014</b></li>
      <li><span>\u6298\u5408\u6BCF\u6708\u5229\u606F</span><b id="dp-permonth">\u2014</b></li>
      <li><span>\u6298\u5408\u6BCF\u5929\u5229\u606F</span><b id="dp-perday">\u2014</b></li>
    </ul>
    <p class="hint" id="dp-note"></p>
  </div>
    </div>
  </section>
`,compound:`  <section class="panel" id="panel-compound">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u521D\u59CB\u672C\u91D1\uFF08\u5143\uFF09</span>
      <input id="cp-start" type="number" inputmode="decimal" min="0" step="10000" value="100000">
    </label>
    <label class="f">
      <span>\u6BCF\u6708\u8FFD\u52A0\u6295\u5165\uFF08\u5143\uFF09</span>
      <input id="cp-monthly" type="number" inputmode="decimal" min="0" step="500" value="1000">
    </label>
    <label class="f">
      <span>\u5E74\u5316\u6536\u76CA\u7387\uFF08%\uFF09</span>
      <input id="cp-rate" type="number" inputmode="decimal" min="0" step="0.5" value="3">
    </label>
    <label class="f">
      <span>\u6295\u8D44\u5E74\u9650</span>
      <input id="cp-years" type="number" inputmode="decimal" min="0" step="1" value="10">
    </label>
    <label class="f">
      <span>\u6295\u5165\u65F6\u70B9</span>
      <select id="cp-timing">
        <option value="end" selected>\u671F\u672B\uFF08\u6708\u5E95\u6295\uFF09</option>
        <option value="begin">\u671F\u521D\uFF08\u6708\u521D\u6295\uFF09</option>
      </select>
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u671F\u672B\u603B\u989D</span>
      <strong id="cp-fv">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u7D2F\u8BA1\u6295\u5165\u672C\u91D1</span><b id="cp-cost">\u2014</b></li>
      <li><span>\u7D2F\u8BA1\u6536\u76CA</span><b id="cp-gain">\u2014</b></li>
      <li><span>\u6536\u76CA / \u672C\u91D1</span><b id="cp-ratio">\u2014</b></li>
      <li><span>\u8D44\u91D1\u7FFB\u500D\u7EA6\u9700</span><b id="cp-double">\u2014</b></li>
    </ul>
    <p class="hint" id="cp-note"></p>
  </div>
    </div>
  </section>
`,goal:`  <section class="panel" id="panel-goal">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u76EE\u6807\u91D1\u989D\uFF08\u5143\uFF09</span>
      <input id="gl-target" type="number" inputmode="decimal" min="0" step="10000" value="500000">
    </label>
    <label class="f">
      <span>\u73B0\u5728\u5DF2\u7ECF\u6709\u7684\uFF08\u5143\uFF09</span>
      <input id="gl-start" type="number" inputmode="decimal" min="0" step="10000" value="100000">
    </label>
    <label class="f">
      <span>\u6BCF\u6708\u80FD\u5B58\u4E0B\uFF08\u5143\uFF09</span>
      <input id="gl-monthly" type="number" inputmode="decimal" min="0" step="500" value="3000">
    </label>
    <label class="f">
      <span>\u5E74\u5316\u6536\u76CA\u7387\uFF08%\uFF0C\u5B58\u5B9A\u671F\u5C31\u586B\u5B58\u6B3E\u5229\u7387\uFF09</span>
      <input id="gl-rate" type="number" inputmode="decimal" min="0" step="0.5" value="2">
    </label>
    <label class="f">
      <span>\u5982\u679C\u5E0C\u671B\u51E0\u5E74\u5185\u6512\u591F\uFF1F</span>
      <input id="gl-years" type="number" inputmode="decimal" min="0" step="1" value="5">
      <em>\u7528\u6765\u53CD\u63A8\u300C\u6BCF\u6708\u81F3\u5C11\u8981\u5B58\u591A\u5C11\u300D</em>
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u6309\u73B0\u5728\u7684\u5B58\u6CD5\uFF0C\u8FD8\u9700</span>
      <strong id="gl-time">\u2014</strong>
      <span class="unit" id="gl-time-unit"></span>
    </div>
    <ul class="kv">
      <li><span>\u9884\u8BA1\u8FBE\u6210\u65F6\u95F4</span><b id="gl-date">\u2014</b></li>
      <li><span>\u671F\u95F4\u7D2F\u8BA1\u6295\u5165</span><b id="gl-cost">\u2014</b></li>
      <li><span>\u5176\u4E2D\u5229\u606F\u8D21\u732E</span><b id="gl-gain">\u2014</b></li>
      <li><span>\u60F3\u5728\u8BBE\u5B9A\u5E74\u9650\u5185\u6512\u591F\uFF0C\u6BCF\u6708\u9700\u5B58</span><b id="gl-need">\u2014</b></li>
    </ul>
    <p class="hint" id="gl-note"></p>
        <p class="jump" id="gl-links"></p>
  </div>
    </div>
  </section>
`,annual:`  <section class="panel" id="panel-annual">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u6295\u5165\u672C\u91D1\uFF08\u5143\uFF09</span>
      <input id="an-start" type="number" inputmode="decimal" min="0" step="1000" value="100000">
    </label>
    <label class="f">
      <span>\u5F53\u524D\u5E02\u503C / \u5230\u671F\u91D1\u989D\uFF08\u5143\uFF09</span>
      <input id="an-end" type="number" inputmode="decimal" min="0" step="1000" value="106000">
    </label>
    <label class="f">
      <span>\u6301\u6709\u5929\u6570</span>
      <input id="an-days" type="number" inputmode="decimal" min="0" step="1" value="365">
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u590D\u5229\u5E74\u5316\u6536\u76CA\u7387</span>
      <strong id="an-cagr">\u2014</strong>
      <span class="unit">%</span>
    </div>
    <ul class="kv">
      <li><span>\u5355\u5229\u5E74\u5316</span><b id="an-simple">\u2014</b></li>
      <li><span>\u533A\u95F4\u603B\u6536\u76CA\u7387</span><b id="an-return">\u2014</b></li>
      <li><span>\u65E5\u5747\u6536\u76CA</span><b id="an-perday">\u2014</b></li>
      <li><span>\u5E74\u5316\u6536\u76CA\u989D</span><b id="an-yeargain">\u2014</b></li>
    </ul>
    <p class="hint" id="an-note"></p>
  </div>
    </div>
  </section>
`,inflation:`  <section class="panel" id="panel-inflation">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u91D1\u989D\uFF08\u5143\uFF09</span>
      <input id="if-amount" type="number" inputmode="decimal" min="0" step="10000" value="1000000">
    </label>
    <label class="f">
      <span>\u5E74\u901A\u80C0\u7387\uFF08%\uFF09</span>
      <input id="if-rate" type="number" inputmode="decimal" min="0" step="0.1" value="2.5">
      <em>\u8FD1\u5E74\u56FD\u5185 CPI \u591A\u5728 0\u20133% \u533A\u95F4\uFF0C\u53EF\u586B\u4F60\u5B9E\u9645\u611F\u53D7\u5230\u7684\u6DA8\u5E45</em>
    </label>
    <label class="f">
      <span>\u5E74\u6570</span>
      <input id="if-years" type="number" inputmode="decimal" min="0" step="1" value="20">
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k" id="if-main-label">\u672A\u6765\u8D2D\u4E70\u529B</span>
      <strong id="if-main">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u73B0\u5728\u8FD9\u7B14\u94B1\u7684\u8D2D\u4E70\u529B\uFF08\u6298\u4ECA\u5929\uFF09</span><b id="if-power">\u2014</b></li>
      <li><span>\u60F3\u7EF4\u6301\u540C\u6837\u751F\u6D3B\uFF0C\u5C4A\u65F6\u9700\u8981</span><b id="if-need">\u2014</b></li>
      <li><span>\u8D2D\u4E70\u529B\u7D2F\u8BA1\u7F29\u6C34</span><b id="if-loss">\u2014</b></li>
      <li><span>\u8D2D\u4E70\u529B\u5E74\u5747\u7F29\u6C34</span><b id="if-annualloss">\u2014</b></li>
    </ul>
    <p class="hint" id="if-note"></p>
  </div>
    </div>
  </section>
`,ladder:`  <section class="panel" id="panel-ladder">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u603B\u91D1\u989D\uFF08\u5143\uFF09</span>
      <input id="ld-total" type="number" inputmode="decimal" min="0" step="10000" value="300000">
    </label>
    <label class="f">
      <span>1 \u5E74\u671F\u5229\u7387\uFF08\u5E74\uFF0C%\uFF09</span>
      <input id="ld-r1" type="number" inputmode="decimal" min="0" step="0.05" value="1.35">
    </label>
    <label class="f">
      <span>2 \u5E74\u671F\u5229\u7387\uFF08\u5E74\uFF0C%\uFF09</span>
      <input id="ld-r2" type="number" inputmode="decimal" min="0" step="0.05" value="1.45">
    </label>
    <label class="f">
      <span>3 \u5E74\u671F\u5229\u7387\uFF08\u5E74\uFF0C%\uFF09</span>
      <input id="ld-r3" type="number" inputmode="decimal" min="0" step="0.05" value="1.75">
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u9636\u68AF\u5B58\u4E09\u5E74\u7D2F\u8BA1\u5229\u606F</span>
      <strong id="ld-int">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u6BCF\u4EFD\u91D1\u989D\uFF08\u4E09\u7B49\u5206\uFF09</span><b id="ld-part">\u2014</b></li>
      <li><span>1 \u5E74\u671F\u5229\u606F</span><b id="ld-i1">\u2014</b></li>
      <li><span>2 \u5E74\u671F\u5229\u606F</span><b id="ld-i2">\u2014</b></li>
      <li><span>3 \u5E74\u671F\u5229\u606F</span><b id="ld-i3">\u2014</b></li>
      <li><span>\u5168\u90E8\u5B58 3 \u5E74\u671F\u5229\u606F</span><b id="ld-all">\u2014</b></li>
      <li><span>\u9636\u68AF\u7684\u673A\u4F1A\u6210\u672C</span><b id="ld-cost">\u2014</b></li>
      <li><span>\u9636\u68AF\u5E73\u5747\u5E74\u5316</span><b id="ld-avg">\u2014</b></li>
      <li><span>\u7B2C 1 \u5E74\u672B\u53EF\u52A8\u7528</span><b id="ld-m12">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u5230\u671F\u65F6\u70B9</th><th>\u672C\u91D1</th><th>\u5B58\u671F</th><th>\u5229\u606F</th><th>\u5230\u671F\u672C\u606F</th></tr></thead>
        <tbody id="ld-body"></tbody>
      </table>
    </div>
    <p class="hint" id="ld-note"></p>
  </div>
    </div>
  </section>
`,dca:`  <section class="panel" id="panel-dca">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u603B\u91D1\u989D\uFF08\u5143\uFF09</span>
      <input id="dc-amount" type="number" inputmode="decimal" min="0" step="10000" value="120000">
    </label>
    <label class="f">
      <span>\u5206\u51E0\u4E2A\u6708\u6295\u5B8C\uFF08\u6708\uFF09</span>
      <input id="dc-months" type="number" inputmode="decimal" min="1" step="1" value="12">
    </label>
    <label class="f">
      <span>\u9884\u671F\u5E74\u5316\u6536\u76CA\uFF08%\uFF0C\u671F\u671B\u503C\uFF09</span>
      <input id="dc-return" type="number" inputmode="decimal" step="0.5" value="6">
    </label>
    <label class="f">
      <span>\u5E74\u5316\u6CE2\u52A8\u7387\uFF08%\uFF0C\u80A1\u57FA\u7EA6 15\u201320\uFF09</span>
      <input id="dc-vol" type="number" inputmode="decimal" min="0" step="1" value="18">
    </label>
    <label class="f">
      <span>\u6295\u5B8C\u540E\u7EE7\u7EED\u6301\u6709\uFF08\u5E74\uFF09</span>
      <input id="dc-hold" type="number" inputmode="decimal" min="0" step="1" value="5">
    </label>
    <label class="f">
      <span>\u672A\u6295\u5165\u8D44\u91D1\u6536\u76CA\uFF08\u5E74\u5316 %\uFF0C\u8D27\u5E01\u57FA\u91D1\uFF09</span>
      <input id="dc-cash" type="number" inputmode="decimal" min="0" step="0.1" value="2">
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u5B9A\u6295\u7684\u671F\u671B\u671F\u672B\u503C</span>
      <strong id="dc-dca">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u4E00\u6B21\u6027\u4E70\u5165\u7684\u671F\u671B\u671F\u672B\u503C</span><b id="dc-lump">\u2014</b></li>
      <li><span>\u671F\u671B\u5DEE\uFF08\u4E00\u6B21\u6027 \u2212 \u5B9A\u6295\uFF09</span><b id="dc-gap">\u2014</b></li>
      <li><span>\u6A21\u62DF\u4E2D\u4E00\u6B21\u6027\u80DC\u51FA\u7684\u6982\u7387</span><b id="dc-win">\u2014</b></li>
      <li><span>\u5B9A\u6295\u4E2D\u4F4D\u6570</span><b id="dc-dcaMed">\u2014</b></li>
      <li><span>\u4E00\u6B21\u6027\u4E2D\u4F4D\u6570</span><b id="dc-lumpMed">\u2014</b></li>
      <li><span>\u5B9A\u6295\u6700\u5DEE 5% \u60C5\u5F62</span><b id="dc-dcaBad">\u2014</b></li>
      <li><span>\u4E00\u6B21\u6027\u6700\u5DEE 5% \u60C5\u5F62</span><b id="dc-lumpBad">\u2014</b></li>
      <li><span>\u603B\u6295\u5165 / \u6301\u6709\u603B\u6708\u6570</span><b id="dc-info">\u2014</b></li>
    </ul>
    <p class="hint" id="dc-note"></p>
  </div>
    </div>
  </section>
`,calendar:`  <section class="panel" id="panel-calendar">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u603B\u91D1\u989D\uFF08\u5143\uFF09</span>
      <input id="cl-total" type="number" inputmode="decimal" min="0" step="10000" value="120000">
    </label>
    <label class="f">
      <span>\u5206\u51E0\u7B14\uFF08\u7B14\uFF09</span>
      <input id="cl-count" type="number" inputmode="decimal" min="1" max="36" step="1" value="12">
    </label>
    <label class="f">
      <span>\u6BCF\u7B14\u95F4\u9694\uFF08\u6708\uFF09</span>
      <input id="cl-gap" type="number" inputmode="decimal" min="1" step="1" value="1">
    </label>
    <label class="f">
      <span>\u6BCF\u7B14\u671F\u9650\uFF08\u6708\uFF09</span>
      <input id="cl-term" type="number" inputmode="decimal" min="1" step="1" value="12">
    </label>
    <label class="f">
      <span>\u5E74\u5229\u7387\uFF08%\uFF09</span>
      <input id="cl-rate" type="number" inputmode="decimal" min="0" step="0.05" value="1.9">
    </label>
    <label class="f">
      <span>\u9996\u7B14\u8D77\u5B58\u65E5</span>
      <input id="cl-start" type="date" value="">
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u6BCF\u7B14\u5230\u671F\u672C\u606F</span>
      <strong id="cl-each">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u6BCF\u7B14\u672C\u91D1</span><b id="cl-per">\u2014</b></li>
      <li><span>\u9996\u7B14\u5230\u671F\u65E5</span><b id="cl-first">\u2014</b></li>
      <li><span>\u672B\u7B14\u5230\u671F\u65E5</span><b id="cl-last">\u2014</b></li>
      <li><span>\u76F8\u90BB\u4E24\u7B14\u5230\u671F\u95F4\u9694</span><b id="cl-gapdays">\u2014</b></li>
      <li><span>\u5168\u90E8\u5230\u671F\u8986\u76D6\u65F6\u957F</span><b id="cl-span">\u2014</b></li>
      <li><span>\u603B\u5229\u606F</span><b id="cl-int">\u2014</b></li>
      <li><span>\u5230\u671F\u672C\u606F\u5408\u8BA1</span><b id="cl-sum">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u671F\u6B21</th><th>\u8D77\u5B58\u65E5</th><th>\u5230\u671F\u65E5</th><th>\u672C\u91D1</th><th>\u5229\u606F</th><th>\u5230\u671F\u672C\u606F</th></tr></thead>
        <tbody id="cl-body"></tbody>
      </table>
    </div>
    <p class="hint" id="cl-note"></p>
  </div>
    </div>
  </section>
`};export default{deposit:V,compound:Q,goal:G,annual:X,inflation:z,ladder:J,dca:$,calendar:Z};
