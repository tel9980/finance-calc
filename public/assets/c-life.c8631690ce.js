var Q=Object.defineProperty;var _=(t,d)=>Q(t,"name",{value:d,configurable:!0});const{$:n,BACKUP_KEY:un,BUILD_TAG:vn,CAT_KEY:fn,CAT_LABEL:bn,CHUNK_FILES:hn,CHUNK_OF:xn,CMP_KEY:yn,CORE_CALC:Cn,CURS:L,DEFERRED_TAPS:Mn,DEMO_SAVED:wn,DIVISOR:En,EDITED:gn,ERR_BOX:Sn,FAV_KEY:Tn,FIELDS:_n,FIRST_ACTIVATE:An,FREQ:kn,FREQ_KEY:Dn,INSTALL_HIDE_KEY:Fn,KEY:Pn,LAST_KEY:Nn,MONTH_CATS:Rn,MONTH_TABLE:Yn,NEXT_OF:Wn,PALETTE_EL:Ln,PENDING_PARAMS:Kn,PRE_KEY:In,QUOTA_WARNED:Hn,RECENT_KEY:On,SAVE_TIMER:Bn,SCHEMA_KEY:Un,SCHEMA_VERSION:Gn,SEARCH_KEY:qn,SNAP_DROP_SEEN:Vn,SNAP_KEY:Jn,SNAP_MAX:Qn,SNAP_PICK:Xn,STORED:zn,TABS:jn,TAB_NATURAL:$n,THEME_KEY:Zn,TOAST_EL:na,TODAYBAR_KEY:aa,UNITS:X,WF_ARCH_KEY:ea,WF_AUTO_IDX:ta,WF_AUTO_LIST:la,WF_AUTO_STEP:ia,WF_AUTO_TIMER:sa,WF_CUSTNAME_KEY:pa,WF_CUST_KEY:da,WF_CUST_NAME:oa,WF_DONE:ra,WF_EDIT:ca,WF_EDIT_KEY:ma,WF_KEY:ua,WF_LAST:va,WF_LEGACY:fa,WF_MAN_KEY:ba,WF_MD:ha,WF_MD_FIELDS:xa,WF_MD_KEY:ya,WF_MD_LINKS:Ca,WF_META_KEY:Ma,WF_MONTH_KEY:wa,WF_NOTE_KEY:Ea,WF_NOTIFIED_KEY:ga,WF_NOTIFY_KEY:Sa,WF_PATHS:Ta,WF_ROLE_KEY:_a,WF_ROLE_READY:Aa,WF_SKIP_KEY:ka,WF_TASK_KEY:Da,WF_TEMPLATES:Fa,XL_ROWS:Pa,YEAR_TABLE:Na,_onPanels:Ra,a11yTouch:Ya,activate:Wa,addMonths:La,annuityPV:Ka,annuityPayment:Ia,applyFilter:Ha,applyParams:Oa,applyStoredTo:Ba,applyWfTpl:Ua,backupAgeDays:Ga,bindWfDnd:qa,bindWfInline:Va,bizAdd:Ja,bonusSoloTax:Qa,buildLoanSchedule:Xa,buildShare:za,buildTabBadges:ja,bumpFreq:$a,calcLoan:Za,calcMap:ne,calcWorkflow:ae,clearWfMan:ee,closePalette:te,cmpTabName:le,cnUpper:ie,combineTax:se,convertTemp:z,copyText:pe,cumulativeTax:de,curCat:oe,currentSnap:re,demoFill:ce,demoHint:me,diagText:ue,dlJson:ve,doInstall:fe,doPrint:be,drawMonthCats:he,drawMonthStack:xe,drawReportCharts:ye,drawRpMini:Ce,drawnMonthlyChart:Me,drawnYearChart:we,enhanceNums:Ee,enhancePanelUi:ge,ensureChunk:Se,evalExpr:Te,favList:_e,fillCmpMod:Ae,fillMonthGrid:ke,fillUnits:j,flash:De,flushParams:Fe,flushSave:Pe,fmt:A,fmtAt:Ne,fmtDate:Re,fx:B,gauss:Ye,getWfCust:We,getWfDone:Le,getWfMan:Ke,getWfMeta:Ie,getWfNotes:He,getWfSkip:Oe,hashTarget:Be,installEvt:Ue,installHintHide:Ge,installHintOff:qe,iosInstallTip:Ve,iosLike:Je,isFav:Qe,lastName:Xe,leftAfter:ze,linkTo:je,loadCmpA:$e,loadSnaps:Ze,loadWfArch:nt,loadWfCust:at,loadWfDone:et,loadWfEdit:tt,loadWfMan:lt,loadWfMeta:it,loadWfNotes:st,loadWfSkip:pt,loadWfTask:dt,loanRows:ot,makeSnap:rt,markBackup:ct,markBadInputs:mt,matchQ:ut,money:a,monthToDate:vt,monthlyIRR:$,months:Z,npvDiff:ft,num:e,numBlur:bt,numFocus:ht,numInput:xt,numKey:yt,numOf:Ct,openPalette:Mt,orderTabsForQuery:wt,palKey:Et,panelEls:gt,panelParams:St,parseAmounts:Tt,parseDate:_t,parseNum:At,pct:P,percentile:kt,plRank:Dt,plScoreCov:Ft,plScoreDsr:Pt,plScoreEmg:Nt,plScoreLev:Rt,plScoreSave:Yt,prePanels:Wt,prefetchAllChunks:Lt,presets:Kt,printCover:It,pushRecent:Ht,pushSearch:Ot,pwaStandalone:Bt,quickOf:Ut,rateOf:Gt,readJsonFile:qt,readMonthGrid:Vt,recentList:Jt,recordWf:Qt,refreshCounts:Xt,refreshTableTools:zt,refreshTrackMods:jt,refreshWfBadge:$t,renderLoanTable:Zt,renderNext:nl,renderPalette:al,renderPresets:el,renderSearchHist:tl,renderSnapCompare:ll,renderSnapList:il,renderTodayBar:sl,renderTrack:pl,renderWfTpl:dl,rentBuyAt:ol,restore:rl,runCalc:cl,runDeferredTaps:ml,save:ul,saveCmpA:vl,saveFav:fl,savePresets:bl,saveSnaps:hl,saveWfCust:xl,savedCat:yl,schemaInit:Cl,schemaMigrate:Ml,scrollResultIfDeepLink:wl,searchHist:El,setCat:gl,setSub:Sl,setTheme:Tl,shareCalc:_l,sharePayload:Al,showErrorBox:kl,showInstBar:Dl,showUpdateBar:Fl,snapNameOf:Pl,snapTipText:Nl,snapshot:Rl,st0:Yl,stamp:Wl,startName:Ll,syncInstallUi:Kl,tabCatLabel:Il,tabScore:Hl,tap:Ol,taxBy:Bl,toast:Ul,toggleWfStep:Gl,trimNum:ql,unitFor:Vl,updShown:Jl,wfAllPaths:Ql,wfArchiveMonth:Xl,wfArchivePut:zl,wfAutoNext:jl,wfAutoStop:$l,wfAutoWalk:Zl,wfBar:ni,wfBindCustQ:ai,wfBuildHandoff:ei,wfCarryMissing:ti,wfCarryQuery:li,wfCarryWarn:ii,wfCsvCell:si,wfCustNameSave:pi,wfDayDiff:di,wfDetailRender:oi,wfEditPath:ri,wfEditReset:ci,wfEditSave:mi,wfEditToggle:ui,wfFillCustSel:vi,wfHandoff:fi,wfHandoffCopy:bi,wfHandoffCsv:hi,wfHandoffPrint:xi,wfHasAnyData:yi,wfHideStep:Ci,wfKnownMods:Mi,wfLegacyToNew:wi,wfLoad:Ei,wfManSave:gi,wfMdHref:Si,wfMdRender:Ti,wfMdSave:_i,wfMetaSave:Ai,wfMigrateLegacy:ki,wfMonthKey:Di,wfMonthRoll:Fi,wfMonthTouch:Pi,wfMoveStep:Ni,wfNoteSave:Ri,wfNotifyCheck:Yi,wfNotifyGranted:Wi,wfNotifyPref:Li,wfNotifySend:Ki,wfNotifySetPref:Ii,wfNotifyStatus:Hi,wfNotifyToggle:Oi,wfOpenInline:Bi,wfOpenTasks:Ui,wfPad2:Gi,wfPathMods:qi,wfPlaceInline:Vi,wfPlaceNear:Ji,wfProgress:Qi,wfRenderSummary:Xi,wfRoleSaved:zi,wfScopedPaths:ji,wfSet:$i,wfSkipCurrent:Zi,wfSkipSave:ns,wfStepKey:as,wfStepShare:es,wfStepState:ts,wfTaskAdd:ls,wfTaskBox:is,wfTaskDel:ss,wfTaskPending:ps,wfTaskSave:ds,wfTaskToggle:os,wfTodayPick:rs,wfTodayStr:cs,wfUnhideStep:ms,wfVisiblePaths:us,yuan:w,zOf:vs}=window.FC;function nn(){var t=e(n("is-amount")),d=Z(e(n("is-months"))),o=n("is-mode").value,s=e(n("is-rate"));if(n("is-rate-label").textContent=o==="monthly"?"\u6BCF\u671F\u8D39\u7387\uFF08%\uFF09":o==="once"?"\u603B\u8D39\u7387\uFF08%\uFF09":"\u603B\u624B\u7EED\u8D39\uFF08\u5143\uFF09",!(t>0&&d>0)){n("is-apr").textContent="\u2014",["is-pay","is-fee","is-nominal","is-multiple"].forEach(function(f){n(f).textContent="\u2014"}),n("is-note").textContent="\u586B\u597D\u5206\u671F\u91D1\u989D\u548C\u671F\u6570\u540E\u81EA\u52A8\u8BA1\u7B97\u3002";return}var p;o==="monthly"?p=t*(s/100)*d:o==="once"?p=t*(s/100):p=s;var m=(t+p)/d,u=$(t,m,d),l=Math.pow(1+u,12)-1,c=p/t*(12/d);n("is-apr").textContent=A(l*100,2),n("is-pay").textContent=w(m),n("is-fee").textContent=w(p),n("is-nominal").textContent=P(c),n("is-multiple").textContent=c>0?A(l/c,2)+" \u500D":"\u2014";var i=o==="monthly"?"\u6BCF\u671F\u6309\u6700\u521D\u672C\u91D1\u6536 "+A(s,2)+"% \u624B\u7EED\u8D39":o==="once"?"\u4E00\u6B21\u6027\u6309\u6700\u521D\u672C\u91D1\u6536 "+A(s,2)+"% \u624B\u7EED\u8D39":"\u603B\u5171\u6536 "+a(s)+" \u5143\u624B\u7EED\u8D39";n("is-note").textContent=B("\u8FD9\u7B14\u5206\u671F\u662F"+i+"\uFF0C\u4F46\u4F60\u6BCF\u6708\u90FD\u5728\u8FD8\u672C\u91D1\uFF0C\u5B9E\u9645\u5360\u7528\u7684\u94B1\u8D8A\u6765\u8D8A\u5C11\uFF0C\u6240\u4EE5\u771F\u5B9E\u6210\u672C\u8FDC\u9AD8\u4E8E\u8868\u9762\u8D39\u7387\u2014\u2014\u4E0A\u9762\u90A3\u4E00\u680F\u5C31\u662F IRR\uFF08\u5185\u90E8\u6536\u76CA\u7387\uFF09\u53E3\u5F84\uFF0C\u76F8\u5F53\u4E8E\u300C\u6309\u5B9E\u9645\u5360\u7528\u8D44\u91D1\u6298\u7B97\u7684\u5E74\u5316\u5229\u7387\u300D\uFF0C\u4E5F\u662F\u300A\u6C11\u6CD5\u5178\u300B\u548C\u76D1\u7BA1\u8981\u6C42\u91D1\u878D\u673A\u6784\u62AB\u9732\u7684\u5E74\u5316\u7EFC\u5408\u6210\u672C\u53E3\u5F84\u3002\u8868\u9762\u770B\u53EA\u6709 "+P(c)+"\uFF0C\u5B9E\u9645\u5E74\u5316 "+A(l*100,2)+"%\u3002\u63D0\u524D\u8FD8\u6B3E\u901A\u5E38\u4E0D\u9000\u624B\u7EED\u8D39\uFF0C\u529E\u4E4B\u524D\u5148\u7B97\u8FD9\u4E00\u680F\u3002")}_(nn,"calcInstallment");function an(){var t=e(n("dl-price")),d=e(n("dl-discount"))/10,o=e(n("dl-threshold")),s=e(n("dl-off")),p=e(n("dl-qty"));if(!(t>0&&p>0))n("dl-pay").textContent="\u2014",["dl-real-discount","dl-save","dl-unit","dl-next"].forEach(function(D){n(D).textContent="\u2014"}),n("dl-note").textContent="\u586B\u597D\u539F\u4EF7\u548C\u6570\u91CF\u540E\u81EA\u52A8\u8BA1\u7B97\u3002";else{d<=0&&(d=1);var m=t*p,u=m*d,l=o>0?Math.floor(u/o):0,c=l*s,i=Math.max(0,u-c);if(n("dl-pay").textContent=a(i),n("dl-real-discount").textContent=A(i/m*10,2)+" \u6298",n("dl-save").textContent=w(m-i),n("dl-unit").textContent=w(i/p),o>0){var f=u%o,b=f===0?o:o-f;n("dl-next").textContent="\u8FD8\u5DEE "+a(b)+" \u5143\u53EF\u518D\u591A\u51CF "+a(s)+" \u5143"}else n("dl-next").textContent="\u672A\u8BBE\u6EE1\u51CF";var M="";if(o>0){var r=o-f;r>0&&r<=s&&(M=" \u6CE8\u610F\uFF1A\u53EA\u5DEE "+a(r)+" \u5143\u5C31\u80FD\u518D\u51CF "+a(s)+" \u5143\uFF0C\u51D1\u5355\u66F4\u5212\u7B97\u3002")}n("dl-note").textContent=o>0?B("\u5148\u6253\u6298\u518D\u6EE1\u51CF\uFF08\u591A\u6570\u5E73\u53F0\u7684\u7B97\u6CD5\uFF09\uFF1A\u6298\u540E\u5C0F\u8BA1 "+a(u)+" \u5143\uFF0C\u6EE1 "+a(o)+" \u51CF "+a(s)+" \u547D\u4E2D "+l+" \u6B21\uFF0C\u51CF\u6389 "+a(c)+" \u5143\u3002\u7B97\u4E0B\u6765\u76F8\u5F53\u4E8E "+A(i/m*10,2)+" \u6298\uFF0C\u6BD4\u5355\u770B\u6298\u6263\u529B\u5EA6\u66F4\u771F\u5B9E\u3002"+M):B("\u53EA\u6309\u6298\u6263\u7B97\uFF1A\u539F\u4EF7 "+a(t)+" \xD7 "+A(d*10,2)+" \u6298 \xD7 "+A(p,0)+" \u4EF6\uFF0C\u6298\u540E "+a(u)+" \u5143\u3002\u8981\u53E0\u52A0\u6EE1\u51CF\u5C31\u5728\u4E0A\u9762\u586B\u6EE1\u51CF\u6761\u4EF6\u3002")}var C=e(n("dl-pa")),h=e(n("dl-qa")),x=n("dl-ua").value,E=e(n("dl-pb")),k=e(n("dl-qb")),g=n("dl-ub").value;if(C>0&&h>0&&E>0&&k>0){var y=C/h,S=E/k,T=Math.min(y,S),N=Math.max(y,S),v=(N-T)/T,F=y<=S;n("dl-winner").textContent=F?"\u5546\u54C1 A":"\u5546\u54C1 B",n("dl-winner-unit").textContent="\u6BCF"+(F?x:g)+"\u66F4\u4FBF\u5B9C";var R=_(function(D){return A(D,D>=10?2:D>=1?3:4)},"ud");n("dl-unit-a").textContent="\u6BCF"+x+" "+R(y)+" \u5143",n("dl-unit-b").textContent="\u6BCF"+g+" "+R(S)+" \u5143",n("dl-diff").textContent=P(v)+"\uFF08\u8D35\u7684\u90A3\u65B9\u8D35\u8FD9\u4E48\u591A\uFF09",n("dl-note2").textContent=B((F?"A":"B")+" \u7684\u6BCF "+(F?x:g)+" \u5355\u4EF7\u66F4\u4F4E\uFF0C\u53E6\u4E00\u4EF6\u8D35\u4E86 "+P(v)+"\u3002\u6BD4\u4EF7\u522B\u770B\u603B\u4EF7\u548C\u5305\u88C5\u5927\u5C0F\uFF0C\u7B97\u5230\u6BCF\u514B/\u6BCF\u6BEB\u5347\u624D\u51C6\uFF1B"+(x!==g?"\u4E24\u8FB9\u5355\u4F4D\u4E0D\u540C\u65F6\uFF08"+x+" vs "+g+"\uFF09\u8981\u5148\u628A\u5355\u4F4D\u6362\u7B97\u7EDF\u4E00\u518D\u6BD4\u3002":"\u540C\u7C7B\u5355\u4F4D\u76F4\u63A5\u6BD4\u5355\u4EF7\u5373\u53EF\u3002"))}else n("dl-winner").textContent="\u2014",n("dl-winner-unit").textContent="",["dl-unit-a","dl-unit-b","dl-diff"].forEach(function(D){n(D).textContent="\u2014"}),n("dl-note2").textContent="\u4E24\u4EF6\u5546\u54C1\u7684\u4EF7\u683C\u548C\u6570\u91CF\u90FD\u586B\u4E0A\u624D\u80FD\u6BD4\u5355\u4EF7\u3002"}_(an,"calcDeal");function en(){var t=e(n("cd-balance")),d=e(n("cd-min"))/100,o=e(n("cd-rate"))/100,s=Math.max(1,e(n("cd-days"))||30),p=o*s;if(t<=0||d<=0){["cd-interest","cd-apr","cd-min-amt","cd-months","cd-total-int","cd-left","cd-save"].forEach(function(r){n(r).textContent="\u2014"}),n("cd-note").textContent="\u586B\u8D26\u5355\u91D1\u989D\u548C\u6700\u4F4E\u8FD8\u6B3E\u6BD4\u4F8B\u540E\u81EA\u52A8\u8BA1\u7B97\u3002";return}for(var m=t*p,u=t*d,l=t+m-u,c=m,i=1,f=l;l>.5&&i<1200;){var b=l*p,M=Math.max(l*d,10);M>l+b&&(M=l+b),l=l+b-M,c+=b,i++,i===12&&(f=l)}n("cd-interest").textContent=a(m),n("cd-apr").textContent=P(o*365,2)+"\uFF08\u65E5\u606F "+A(o*100,3)+"% \xD7 365\uFF09",n("cd-min-amt").textContent=w(u),n("cd-months").textContent=i>=1200?"\u51E0\u4E4E\u8FD8\u4E0D\u5B8C":i+" \u671F\uFF08\u7EA6 "+A(i/12,1)+" \u5E74\uFF09",n("cd-total-int").textContent=w(c),n("cd-left").textContent=w(f),n("cd-save").textContent=w(c),n("cd-note").textContent="\u5173\u952E\u70B9\uFF1A\u53EA\u8981\u6CA1\u5728\u5230\u671F\u8FD8\u6B3E\u65E5\u524D\u5168\u989D\u8FD8\u6E05\uFF0C\u5C31\u5DF2\u7ECF\u4E0D\u4EAB\u53D7\u514D\u606F\u671F\u2014\u2014\u5DF2\u8FD8\u7684\u90E8\u5206\u4E5F\u4F1A\u4ECE\u6D88\u8D39\u8BB0\u8D26\u65E5\u8D77\u6309\u65E5\u606F\u8BA1\u606F\uFF0C\u6240\u4EE5\u53EA\u8FD8\u6700\u4F4E\u8FD8\u6B3E\uFF0C\u5229\u606F\u662F\u6309\u6574\u7B14\u6B20\u6B3E\u6EDA\u7684\u3002\u65E5\u606F\u4E07\u5206\u4E4B\u4E94\u6298\u5408\u5E74\u5316 18.25%\uFF0C\u6BD4\u5927\u591A\u6570\u6D88\u8D39\u8D37\u90FD\u8D35\uFF1B\u80FD\u5168\u989D\u8FD8\u5C31\u5168\u989D\u8FD8\uFF0C\u5B9E\u5728\u4E0D\u884C\u4F18\u5148\u8003\u8651\u8D26\u5355\u5206\u671F\uFF08\u5E74\u5316\u901A\u5E38 13%\u201316%\uFF09\uFF0C\u522B\u957F\u671F\u53EA\u8FD8\u6700\u4F4E\u3002"}_(en,"calcCard");function tn(){var t=e(n("fx-amount")),d=e(n("fx-rate")),o=e(n("fx-fee"))/100,s=n("fx-cur").value,p=t*d,m=p*(1-o),u=d>0?t/d:0,l=u*(1-o);n("fx-main-label").textContent=s+" \u2192 \u4EBA\u6C11\u5E01",n("fx-main").textContent=a(p),n("fx-main-unit").textContent="\u5143",n("fx-net").textContent=a(m)+" \u5143"+(o>0?"\uFF08\u6263 "+P(o)+"\uFF09":""),n("fx-rev").textContent=a(u)+" "+s+(o>0?"\uFF0C\u5B9E\u9645\u5230\u624B "+a(l):"");var c=n("fx-cat").value,i=X[c];n("fx-from").options.length!==i.length&&j();var f=e(n("fx-value")),b=parseInt(n("fx-from").value,10)||0,M=parseInt(n("fx-to").value,10)||0,r,C;if(c==="temp")r=z(f,b,M),C=i[b][0]+" \u2192 "+i[M][0];else{var h=i[b][1],x=i[M][1];r=f*h/x,C="1 "+i[b][0]+" = "+A(h/x,4)+" "+i[M][0]}var E=Math.abs(r)<1?6:2;n("fx-unit-result").textContent=A(r,E)+" "+i[M][0],n("fx-unit-formula").textContent=C,n("fx-note").textContent="\u6C47\u7387\u8FD9\u91CC\u4E0D\u8054\u7F51\uFF0C\u9700\u8981\u4F60\u6309\u5F53\u5929\u94F6\u884C\u724C\u4EF7\u624B\u586B\uFF08\u73B0\u6C47\u5356\u51FA\u4EF7\u66F4\u9002\u5408\u7B97\u6362\u6C47\u6210\u672C\uFF09\u3002\u5355\u4F4D\u6362\u7B97\u91CC 1 \u65A4 = 500 \u514B\u30011 \u4EA9 = 666.67 \u5E73\u65B9\u7C73\u30011 \u7801 = 0.9144 \u7C73\u3002"}_(tn,"calcFx");function ln(){var t=Math.max(0,e(n("sp-total"),0)),d=Math.max(1,Math.round(e(n("sp-people"),1))),o=Math.max(0,e(n("sp-fee"),0))/100,s=e(n("sp-round"),0),p=n("sp-who").value,m=t*o,u=t+m,l=u/d,c=l;p==="self"&&(c=s>0?Math.floor(l/s)*s:Math.round(l*100)/100);var i=p==="self"?u-c*(d-1):l,f=c*(d-1)+i;n("sp-gross").textContent=w(u),n("sp-fee-amt").textContent=w(m),n("sp-each").textContent=a(c),n("sp-others").textContent=d>1?w(c)+" \xD7 "+(d-1)+" \u4EBA":"\u2014",n("sp-self").textContent=w(i)+(p==="self"&&i>=c-1e-4?"\uFF08\u542B\u96F6\u5934 "+a(i-c)+"\uFF09":""),n("sp-check").textContent=w(f),n("sp-note").textContent="\u7B97\u6CD5\uFF1A\uFF08\u6D88\u8D39\u603B\u989D "+a(t)+" + \u670D\u52A1\u8D39 "+P(o,2)+"\uFF09\xF7 "+d+" \u4EBA = \u6BCF\u4EBA "+a(l)+"\u3002"+(p==="self"&&s>0?"\u6309\u300C\u62B9\u5230 "+s+" \u5143\u300D\u5904\u7406\uFF0C\u5176\u4ED6\u4EBA\u5404\u4ED8 "+a(c)+"\uFF0C\u96F6\u5934 "+a(u-c*d)+" \u7531\u53D1\u8D77\u4EBA\u627F\u62C5\uFF0C\u6536\u6B3E\u5408\u8BA1 "+a(f)+" \u4E0E\u5B9E\u4ED8\u4E00\u81F4\u3002":"\u6BCF\u4EBA\u91D1\u989D\u5148\u56DB\u820D\u4E94\u5165\u5230\u5206\uFF0C\u5DEE\u51FA\u6765\u7684\u51E0\u5206\u94B1\u7531\u53D1\u8D77\u4EBA\u8865\uFF0C\u6536\u6B3E\u5408\u8BA1\u4E0E\u5B9E\u4ED8\u4E00\u81F4\u3002")+" \u805A\u9910 AA \u91CC\u6700\u5BB9\u6613\u5435\u7684\u4E24\u4EF6\u4E8B\uFF1A\u670D\u52A1\u8D39\u6709\u6CA1\u6709\u7B97\u8FDB\u4EBA\u5747\u3001\u4EE5\u53CA\u6709\u6CA1\u6709\u4EBA\u6CA1\u559D\u9152/\u6CA1\u5403\u67D0\u9053\u83DC\u2014\u2014\u540E\u8005\u5EFA\u8BAE\u5355\u72EC\u628A\u9152\u6C34\u5254\u9664\u540E\u518D\u6309\u4EBA\u6570\u5206\u3002"}_(ln,"calcSplit");function sn(){for(var t=Math.max(0,e(n("mc-amount"),0)),d=n("mc-cur").value||"CNY",o={},s=t,p=0;p<L.length;p++)o[L[p].k]=Math.max(0,e(n(L[p].id),0));d!=="CNY"&&(s=t*(o[d]||0)),n("mc-cny").textContent=a(s);for(var m=[],u=0;u<L.length;u++){var l=L[u],c=o[l.k],i=c>0?s/c:0;n(l.out).textContent=c>0?A(i,l.digits)+" "+l.name:"\u8BF7\u586B\u6C47\u7387",c>0&&m.push(l.name+" "+A(i,l.digits))}var f=s/1.004;n("mc-spread").textContent=a(f)+" \u5143\uFF08\u5C11\u7684 "+a(s-f)+" \u5C31\u662F\u70B9\u5DEE\u6210\u672C\uFF09",n("mc-note").textContent="\u5148\u628A\u91D1\u989D\u7EDF\u4E00\u6298\u6210\u4EBA\u6C11\u5E01 "+a(s)+" \u5143\uFF08"+(d==="CNY"?"\u672C\u6765\u5C31\u662F\u4EBA\u6C11\u5E01":"\u6309\u4F60\u586B\u7684 "+d+" \u6C47\u7387\u6298\u7B97")+"\uFF09\uFF0C\u518D\u6309\u5404\u5E01\u79CD\u6C47\u7387\u6362\u51FA\u53BB\uFF1A"+(m.length?m.join("\u3001"):"\uFF08\u6C47\u7387\u672A\u586B\uFF09")+"\u3002 \u8FD9\u91CC\u7684\u6C47\u7387\u5FC5\u987B\u4F60\u81EA\u5DF1\u586B\u2014\u2014\u672C\u9875\u4E0D\u8054\u7F51\u3001\u4E0D\u53D6\u5B9E\u65F6\u884C\u60C5\uFF0C\u5199\u4E0A\u4F60\u80FD\u6362\u5230\u7684\u5B9E\u9645\u4EF7\u683C\u624D\u6709\u610F\u4E49\u3002 \u771F\u5B9E\u6362\u6C47\u4E09\u4E2A\u635F\u8017\u70B9\uFF1A\u94F6\u884C\u300C\u73B0\u6C47/\u73B0\u949E\u300D\u4E70\u5356\u4EF7\u5DEE\uFF08\u4E2A\u4EBA\u8D2D\u6C47\u6309\u94F6\u884C\u5356\u51FA\u4EF7\uFF0C\u901A\u5E38\u6BD4\u4E2D\u95F4\u4EF7\u8D35 0.3%\u20131%\uFF09\uFF1B\u8DE8\u5883\u6C47\u6B3E\u7535\u62A5\u8D39/\u624B\u7EED\u8D39\uFF08\u6BCF\u7B14\u51E0\u5341\u5230\u4E24\u767E\u5143\uFF09\uFF1B\u5883\u5916\u5237\u5361\u8D70\u5361\u7EC4\u7EC7\u6C47\u7387\uFF0CVisa/Mastercard \u53EF\u80FD\u518D\u6536 0\u20133% \u8D27\u5E01\u8F6C\u6362\u8D39\uFF08\u94F6\u8054\u591A\u6570\u514D\uFF09\u3002 \u53E6\u5916\u4E2A\u4EBA\u5E74\u5EA6\u4FBF\u5229\u5316\u989D\u5EA6\u662F\u6BCF\u4EBA\u6BCF\u5E74\u7B49\u503C 5 \u4E07\u7F8E\u5143\uFF0C\u8D85\u8FC7\u8981\u63D0\u4F9B\u771F\u5B9E\u7528\u9014\u51ED\u8BC1\u3002"}_(sn,"calcMulti");function pn(){var t=Math.max(0,e(n("cr-price"),0)),d=Math.max(1,Math.min(20,Math.round(e(n("cr-years"),8)))),o=Math.min(100,Math.max(0,e(n("cr-residual"),30)))/100,s=Math.max(0,e(n("cr-km"),0)),p=Math.max(0,e(n("cr-fc"),0)),m=Math.max(0,e(n("cr-oil"),0)),u=Math.max(0,e(n("cr-ins"),0)),l=Math.max(0,e(n("cr-maint"),0)),c=Math.max(0,e(n("cr-park"),0)),i=Math.max(0,e(n("cr-taxi"),0)),f=(t-t*o)/d,b=s*p/100*m,M=u+l+c,r=f+b+M,C=s>0?r/s:0,h=s*i,x=h-r;n("cr-total").textContent=a(r),n("cr-dep").textContent=w(f),n("cr-fuel").textContent=w(b),n("cr-fixed").textContent=w(M),n("cr-perkm").textContent=s>0?a(C)+" \u5143 / \u516C\u91CC":"\u2014\uFF08\u586B\u4E86\u91CC\u7A0B\u624D\u7B97\uFF09",n("cr-taxi-year").textContent=w(h),n("cr-diff").textContent=(x>=0?"\u6253\u8F66\u8D35 ":"\u517B\u8F66\u8D35 ")+a(Math.abs(x))+" \u5143 / \u5E74",n("cr-life").textContent=w(r*d)+"\uFF08"+d+" \u5E74\uFF09",n("cr-note").textContent="\u6BCF\u5E74\u771F\u5B9E\u6210\u672C = \u6298\u65E7 "+a(f)+"\uFF08"+a(t)+" \u5143\u5F00 "+d+" \u5E74\u3001\u6B8B\u503C "+P(o,0)+" \u5356\u6389\uFF0C\u8FD9\u662F\u6700\u5927\u7684\u4E00\u5757\uFF0C\u4E5F\u6700\u5BB9\u6613\u88AB\u5FFD\u7565\uFF09 + \u6CB9\u8D39 "+a(b)+"\uFF08"+A(s,0)+" \u516C\u91CC \xD7 "+A(p,1)+"L/100km \xD7 "+a(m)+" \u5143\uFF09 + \u4FDD\u9669\u4FDD\u517B\u505C\u8F66 "+a(M)+" = "+a(r)+" \u5143\uFF0C\u6298\u5408 "+a(C)+" \u5143/\u516C\u91CC\u3002 \u540C\u6837\u91CC\u7A0B\u6253\u8F66\u8981 "+a(h)+" \u5143\uFF0C"+(x>=0?"\u6253\u8F66\u53CD\u800C\u8D35 "+a(x):"\u517B\u8F66\u8D35 "+a(-x))+" \u5143/\u5E74\u3002 \u5173\u952E\u7ED3\u8BBA\uFF1A\u8F66\u7684\u5927\u90E8\u5206\u6210\u672C\u662F\u300C\u56FA\u5B9A\u300D\u7684\uFF08\u6298\u65E7\u3001\u4FDD\u9669\u3001\u505C\u8F66\uFF09\uFF0C\u5F00\u5F97\u8D8A\u5C11\u6BCF\u516C\u91CC\u8D8A\u8D35\u2014\u2014\u5E74\u91CC\u7A0B\u4F4E\u4E8E 8000 \u516C\u91CC\u3001\u53C8\u5728\u9650\u884C/\u505C\u8F66\u8D35\u7684\u57CE\u5E02\uFF0C\u6253\u8F66+\u79DF\u8F66\u901A\u5E38\u66F4\u5212\u7B97\uFF1B\u5E74\u91CC\u7A0B\u8FC7 1.5 \u4E07\u516C\u91CC\u3001\u6709\u5B69\u5B50\u8981\u63A5\u9001\u3001\u5E38\u8DD1\u90CA\u533A\uFF0C\u4E70\u8F66\u624D\u503C\u3002 \u53E6\u5916\u522B\u5FD8\u4E86\uFF1A\u8D2D\u7F6E\u7A0E\uFF08\u71C3\u6CB9\u8F66\u7EA6\u8F66\u4EF7 8.85%\uFF09\u3001\u4E0A\u724C\u8D39\u3001\u9996\u5E74\u4FDD\u9669\u3001\u8D37\u6B3E\u5229\u606F\u90FD\u6CA1\u7B97\u5728\u8FD9\u91CC\uFF1B\u7535\u8F66\u8FD8\u6709\u5145\u7535/\u5BB6\u5145\u6869/\u7535\u6C60\u8870\u51CF\uFF0C\u6CB9\u8F66\u8FD8\u6709\u5927\u4FDD\u517B\u548C\u8F6E\u80CE\u3002\u4E70\u4E4B\u524D\u5148\u628A\u8FD9\u7B14\u8D26\u7B97\u6E05\uFF0C\u522B\u53EA\u770B\u6708\u4F9B\u3002"}_(pn,"calcCar");function dn(){var t=[{n:"\u8F66\u8D37\u5C3E\u6B3E",b:Math.max(0,e(n("df-bal1"),0)),r:Math.max(0,e(n("df-rate1"),0))/100,m:Math.max(0,e(n("df-min1"),0))},{n:"\u4FE1\u7528\u5361",b:Math.max(0,e(n("df-bal2"),0)),r:Math.max(0,e(n("df-rate2"),0))/100,m:Math.max(0,e(n("df-min2"),0))},{n:"\u6D88\u8D39\u8D37",b:Math.max(0,e(n("df-bal3"),0)),r:Math.max(0,e(n("df-rate3"),0))/100,m:Math.max(0,e(n("df-min3"),0))}].filter(function(r){return r.b>.005}),d=Math.max(0,e(n("df-extra"),0));function o(r,C){for(var h=t.map(function(v){return{n:v.n,b:v.b,r:v.r,m:v.m,done:0,int0:0}}),x=C,E=0,k=0,g=h.length>0;g&&E<600;){E++,h.forEach(function(v){if(!(v.b<=.005)){var F=v.b*v.r/12;v.b+=F,v.int0+=F,k+=F}}),h.forEach(function(v){v.b<=.005||(v.b-=Math.min(v.b,v.m))});for(var y=x;y>.005;){var S=h.filter(function(v){return v.b>.005});if(!S.length)break;var T=S[0];S.forEach(function(v){(r==="avalanche"?v.r>T.r:v.b<T.b)&&(T=v)});var N=Math.min(T.b,y);T.b-=N,y-=N}x=C,h.forEach(function(v){v.b<=.005&&(x+=v.m)}),h.forEach(function(v){v.b<=.005&&!v.done&&(v.done=E)}),g=h.some(function(v){return v.b>.005})}return{months:E,interest:k,rows:h,capped:g}}_(o,"run");var s=o("avalanche",d),p=o("snowball",d),m=o("avalanche",0),u=t.reduce(function(r,C){return r+C.b},0),l=d+t.reduce(function(r,C){return r+C.m},0),c=p.interest-s.interest,i=null,f=null;t.forEach(function(r){(!i||r.r>i.r)&&(i=r),(!f||r.b<f.b)&&(f=r)}),n("df-months").textContent=s.capped?">600":String(s.months),n("df-total").textContent=w(u),n("df-permonth").textContent=w(l)+(d>0?"\uFF08\u542B\u989D\u5916 "+a(d)+"\uFF09":""),n("df-intA").textContent=w(s.interest),n("df-intS").textContent=w(p.interest),n("df-diff").textContent=c>.005?w(c)+"\uFF08\u9AD8\u606F\u4F18\u5148\u66F4\u7701\uFF09":"\u4E24\u8005\u4E00\u6837",n("df-minonly").textContent=m.capped?"50 \u5E74\u90FD\u8FD8\u4E0D\u5B8C":m.months+" \u4E2A\u6708 / \u5229\u606F "+a(m.interest)+" \u5143",n("df-first").textContent=(i?i.n:"\u2014")+"\uFF08"+(i?a(i.b):"0")+" \u5143\uFF0C\u5229\u7387 "+(i?A(i.r*100,1):"0")+"%\uFF09";var b=n("df-body");if(b.innerHTML="",t.forEach(function(r,C){var h=document.createElement("tr"),x=s.rows[C]||{done:0,int0:0},E=p.rows[C]||{done:0,int0:0};[r.n,a(r.b),A(r.r*100,1)+"%",(s.capped?">600":x.done)+" \u6708",(p.capped?">600":E.done)+" \u6708",a(x.int0)].forEach(function(k){var g=document.createElement("td");g.textContent=k,h.appendChild(g)}),b.appendChild(h)}),!t.length){n("df-note").textContent="\u5148\u586B\u4E0A\u81F3\u5C11\u4E00\u7B14\u6B20\u6B3E\u7684\u4F59\u989D\u548C\u5229\u7387\u3002";return}var M="\u4E24\u79CD\u6253\u6CD5\u7684\u533A\u522B\u53EA\u6709\u4E00\u53E5\uFF1A\u96EA\u5D29\u6CD5\u628A\u989D\u5916\u7684\u94B1\u5148\u7838\u5411\u5229\u7387\u6700\u9AD8\u7684\u90A3\u7B14\uFF08\u6570\u5B66\u6700\u4F18\uFF09\uFF0C\u96EA\u7403\u6CD5\u5148\u7838\u5411\u4F59\u989D\u6700\u5C0F\u7684\u90A3\u7B14\uFF08\u6700\u5FEB\u770B\u5230\u300C\u6E05\u96F6\u300D\uFF0C\u5FC3\u7406\u6700\u4F18\uFF09\u3002 \u5728\u4F60\u8FD9\u4E2A\u4F8B\u5B50\u91CC\uFF0C\u96EA\u5D29\u6CD5\u603B\u5229\u606F "+a(s.interest)+" \u5143\uFF0C\u96EA\u7403\u6CD5 "+a(p.interest)+" \u5143\uFF0C\u5DEE "+a(Math.abs(c))+" \u5143";M+=c>.005?"\uFF0C\u96EA\u5D29\u6CD5\u66F4\u7701\u3002\u5DEE\u989D\u770B\u7740\u4E0D\u5927\uFF0C\u662F\u56E0\u4E3A\u4F60\u7684\u6708\u4F9B\u5DF2\u7ECF\u538B\u8FC7\u5229\u606F\u4E86\uFF1B\u5982\u679C\u4FE1\u7528\u5361\u4F59\u989D\u518D\u5927\u4E00\u70B9\u3001\u6216\u8005\u989D\u5916\u52A0\u7684\u94B1\u518D\u591A\u4E00\u70B9\uFF0C\u8FD9\u4E2A\u5DEE\u8DDD\u4F1A\u8FC5\u901F\u653E\u5927\u3002":"\uFF0C\u4E24\u8005\u4E00\u6837\u2014\u2014\u8BF4\u660E\u4F60\u7684\u6700\u4F4E\u8FD8\u6B3E\u5DF2\u7ECF\u8FDC\u9AD8\u4E8E\u5229\u606F\uFF0C\u94B1\u7684\u987A\u5E8F\u6392\u4E0D\u6392\u961F\u90FD\u65E0\u6240\u8C13\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E0B\u5148\u6E05\u54EA\u7B14\u770B\u5FC3\u60C5\u5C31\u884C\u3002",M+=" \u771F\u6B63\u7684\u6740\u624B\u662F\u8FD9\u4E2A\uFF1A\u53EA\u8FD8\u6700\u4F4E\u3001\u4E00\u5206\u4E0D\u52A0\uFF0C\u8981 "+(m.capped?"50 \u5E74\u4EE5\u4E0A\uFF08\u7B49\u4E8E\u6C38\u8FDC\u8FD8\u4E0D\u5B8C\uFF09":m.months+" \u4E2A\u6708\u3001\u4ED8 "+a(m.interest)+" \u5143\u5229\u606F")+"\u3002 \u6240\u4EE5\u987A\u5E8F\u95EE\u9898\u8FDC\u4E0D\u5982\u300C\u6BCF\u6708\u591A\u7838\u8FDB\u53BB "+a(d)+" \u5143\u300D\u91CD\u8981\u3002 \u4E09\u6761\u5B9E\u64CD\uFF1A\u2460 \u5148\u628A\u5E94\u6025\u91D1\u7559\u591F\uFF083\u20136 \u4E2A\u6708\u652F\u51FA\uFF09\u518D\u52A0\u901F\u8FD8\u503A\uFF0C\u5426\u5219\u4E00\u9047\u5230\u610F\u5916\u53C8\u5F97\u5237\u5361\uFF0C\u767D\u5E72\uFF1B \u2461 \u4FE1\u7528\u5361\u5FAA\u73AF\u5229\u606F\u6309\u65E5\u606F\u4E07\u5206\u4E4B\u4E94\u7B97\uFF0C\u5E74\u5316 18% \u5DE6\u53F3\uFF0C\u4EFB\u4F55\u300C\u7406\u8D22\u300D\u90FD\u8DD1\u4E0D\u8D62\u5B83\uFF0C\u4F18\u5148\u6E05\u6389\uFF1B \u2462 \u522B\u7528\u300C\u65B0\u8D37\u8FD8\u65E7\u8D37\u300D\u628A\u9AD8\u606F\u6362\u6210\u770B\u8D77\u6765\u4F4E\u606F\u7684\u957F\u671F\u8D37\u6B3E\u2014\u2014\u5982\u679C\u603B\u6210\u672C\u6CA1\u964D\uFF0C\u4F60\u53EA\u662F\u628A\u75DB\u82E6\u62C9\u957F\u4E86\u3002 \u8FD8\u6E05\u4E00\u7B14\u4E4B\u540E\uFF0C\u8BB0\u5F97\u628A\u539F\u6765\u90A3\u7B14\u6708\u4F9B\u7EE7\u7EED\u6295\u51FA\u53BB\uFF0C\u522B\u8BA9\u5B83\u6084\u6084\u53D8\u6210\u6D88\u8D39\u3002",n("df-note").textContent=M}_(dn,"calcDebtFree");function on(){var t=Math.max(0,e(n("dm-bal"),0)),d=Math.max(0,e(n("dm-old"),0))/100,o=Math.max(0,e(n("dm-new"),0))/100,s=Math.max(0,e(n("dm-fee"),0))/100,p=Math.max(0,e(n("dm-pay"),0));function m(v,F,R){var D=v*(1+R),Y=0,W=0,K=F/12;if(p<=D*K)return null;for(;D>.005&&Y<720;){var I=D*K;W+=I,D=D+I-p,Y++}return D>.005?null:{m:Y,tot:W}}_(m,"sim");var u=m(t,d,0),l=m(t,o,s),c=t*s,i=n("dm-body");if(i.innerHTML="",!u||!l){n("dm-save").textContent="\u2014",["dm-m1","dm-t1","dm-m2","dm-t2","dm-feeamt","dm-breakeven"].forEach(function(v){n(v).textContent="\u2014"}),n("dm-note").textContent="\u6BCF\u6708\u8FD8\u6B3E\u989D\u592A\u5C0F\uFF08\u8FDE\u5229\u606F\u90FD\u4E0D\u591F\u8FD8\uFF09\uFF0C\u672C\u91D1\u6C38\u8FDC\u8FD8\u4E0D\u5B8C\u3002\u628A\u300C\u6BCF\u6708\u80FD\u8FD8\u591A\u5C11\u300D\u8C03\u5927\u5230\u8D85\u8FC7\u300C\u4F59\u989D \xD7 \u6708\u5229\u7387\u300D\u518D\u7B97\u3002";return}var f=u.tot-l.tot-c;n("dm-save").textContent=a(f),n("dm-m1").textContent=u.m+" \u4E2A\u6708",n("dm-t1").textContent=w(u.tot),n("dm-m2").textContent=l.m+" \u4E2A\u6708",n("dm-t2").textContent=w(l.tot),n("dm-feeamt").textContent=w(c)+"\uFF08"+P(s,2)+"\uFF09";for(var b=null,M=0,r=.6,C=0;C<60;C++){var h=(M+r)/2,x=m(t,o,h),E=x?u.tot-x.tot-t*h:-1;if(E>0?M=h:r=h,x&&Math.abs(E)<.5){b=h;break}}b===null&&(b=r),n("dm-breakeven").textContent=P(b,2)+"\uFF08"+a(t*b)+" \u5143\uFF09";for(var k=[0,.01,.02,.03,.05,.08],g=0;g<k.length;g++){var y=k[g],S=m(t,o,y),T=S?u.tot-S.tot-t*y:-1,N=document.createElement("tr");N.innerHTML="<td>"+P(y,0)+"</td><td>"+a(t*y)+"</td><td>"+(T>=0?"+":"")+a(T)+"</td><td>"+(T>0?"\u5212\u7B97":T>-50?"\u6253\u5E73":"\u4E0D\u5212\u7B97")+"</td>",i.appendChild(N)}n("dm-note").textContent="\u7528\u540C\u6837\u6BCF\u6708\u8FD8 "+a(p)+" \u5143\u6765\u6BD4\uFF1A\u4E0D\u7F6E\u6362\u8981\u8FD8 "+u.m+" \u4E2A\u6708\u3001\u4ED8\u5229\u606F "+a(u.tot)+" \u5143\uFF1B\u6362\u6210 "+P(o,2)+" \u7684\u65B0\u8D37\uFF08\u624B\u7EED\u8D39 "+a(c)+" \u5143\u8BA1\u8FDB\u672C\u91D1\uFF09\u53EA\u8981 "+l.m+" \u4E2A\u6708\u3001\u4ED8\u5229\u606F "+a(l.tot)+" \u5143\u3002\u5408\u8BA1\uFF08\u542B\u624B\u7EED\u8D39\uFF09\u7701 "+a(f)+" \u5143\uFF0C\u624B\u7EED\u8D39\u7387\u53EA\u8981\u4F4E\u4E8E "+P(b,2)+" \u5C31\u8FD8\u662F\u5212\u7B97\u7684\u3002 \u5224\u65AD\u6807\u51C6\u4E00\u53E5\u8BDD\uFF1A\u65B0\u8D37\u7684\u771F\u5B9E\u5E74\u5316\uFF08\u5229\u7387 + \u624B\u7EED\u8D39\u644A\u5230\u671F\u9650\u91CC\uFF09\u4F4E\u4E8E\u65E7\u503A\u5229\u7387\uFF0C\u5C31\u503C\u5F97\u6362\u3002 \u4F46\u7F6E\u6362\u6709\u4E09\u4E2A\u5751\uFF1A\u2460 \u53EA\u6709\u300C\u771F\u964D\u606F\u300D\u624D\u5212\u7B97\uFF0C\u5F88\u591A\u4EA7\u54C1\u770B\u7740\u5229\u7387\u4F4E\uFF0C\u52A0\u4E0A\u624B\u7EED\u8D39\u3001\u670D\u52A1\u8D39\u3001\u4FDD\u8BC1\u91D1\u540E\u771F\u5B9E\u5E74\u5316\u5E76\u6CA1\u964D\u591A\u5C11\uFF1B \u2461 \u501F\u65B0\u8FD8\u65E7\u672C\u8D28\u662F\u628A\u77ED\u671F\u9AD8\u606F\u6362\u6210\u957F\u671F\u4F4E\u606F\uFF0C\u5982\u679C\u4F60\u8FD8\u6309\u539F\u6765\u90A3\u6837\u6162\u6162\u8FD8\uFF0C\u603B\u5229\u606F\u53CD\u800C\u53EF\u80FD\u53D8\u591A\u2014\u2014\u6240\u4EE5\u8FD9\u91CC\u56FA\u5B9A\u4E86\u300C\u6BCF\u6708\u8FD8\u591A\u5C11\u300D\u6765\u6BD4\uFF1B \u2462 \u522B\u4E3A\u4E86\u7F6E\u6362\u53BB\u78B0\u300C\u4EE5\u8D37\u517B\u8D37\u300D\u7684\u4E2D\u4ECB\u8FC7\u6865\uFF0C\u90A3\u7C7B\u7EFC\u5408\u6210\u672C\u7ECF\u5E38\u8D85\u8FC7 24%\uFF0C\u6BD4\u539F\u6765\u7684\u4FE1\u7528\u5361\u8FD8\u8D35\u3002"}_(on,"calcDebtMerge");function rn(){var t=Math.min(28,Math.max(1,Math.round(e(n("fp-bill"),5)))),d=Math.min(28,Math.max(1,Math.round(e(n("fp-due"),25)))),o=Math.max(0,e(n("fp-amount"),0)),s=864e5,p=new Date;p.setHours(0,0,0,0);function m(y){var S=y.getFullYear(),T=y.getMonth();return y.getDate()<=t?new Date(S,T,t):new Date(S,T+1,t)}_(m,"billFor");function u(y){return d>t?new Date(y.getFullYear(),y.getMonth(),d):new Date(y.getFullYear(),y.getMonth()+1,d)}_(u,"payFor");function l(y){return y.getMonth()+1+"/"+y.getDate()}_(l,"md");function c(y){var S=m(y),T=u(S);return{bd:S,pay:T,days:Math.max(0,Math.round((T-y)/s))}}_(c,"info");var i=c(p),f=new Date(p.getFullYear(),p.getMonth(),t+1);f<=p&&(f=new Date(p.getFullYear(),p.getMonth()+1,t+1));var b=c(f);n("fp-days").textContent=i.days,n("fp-billdate").textContent=l(i.bd)+" \u51FA\u8D26",n("fp-paydate").textContent=l(i.pay),n("fp-max").textContent=b.days+" \u5929",n("fp-best").textContent=l(f)+"\uFF08\u8D26\u5355\u65E5 "+l(b.bd)+" \u2192 \u8FD8\u6B3E "+l(b.pay)+"\uFF09",n("fp-lost").textContent=Math.max(0,b.days-i.days)+" \u5929",n("fp-cost").textContent=o>0?w(o*.138)+"\uFF08\u6309 13.8% \u5E74\u5316\u501F\u4E00\u5E74\u7684\u5229\u606F\uFF09":"\u586B\u4E2A\u91D1\u989D\u5C31\u80FD\u770B\u5230";var M=n("fp-body");M.innerHTML="";var r=m(p),C=[p,r,new Date(r.getFullYear(),r.getMonth(),r.getDate()+1)];[3,7,14,20,25].forEach(function(y){C.push(new Date(r.getFullYear(),r.getMonth(),r.getDate()+y))});for(var h=0;h<C.length;h++){var x=C[h],E=c(x),k=x.getTime()===p.getTime()?l(x)+"\uFF08\u4ECA\u5929\uFF09":l(x),g=document.createElement("tr");g.innerHTML="<td>"+k+"</td><td>"+l(E.bd)+"</td><td>"+l(E.pay)+"</td><td>"+E.days+"</td>",M.appendChild(g)}n("fp-note").textContent="\u514D\u606F\u671F\u7684\u8D77\u70B9\u4E0D\u662F\u5237\u5361\u90A3\u5929\uFF0C\u800C\u662F\u300C\u8FD9\u7B14\u94B1\u88AB\u7B97\u8FDB\u54EA\u671F\u8D26\u5355\u300D\u2014\u2014\u8D26\u5355\u65E5 "+t+" \u53F7\u4E4B\u540E\u5237\u7684\uFF0C\u4F1A\u63A8\u5230\u4E0B\u4E2A\u6708 "+t+" \u53F7\u51FA\u8D26\uFF0C\u4E8E\u662F\u767D\u62FF\u66F4\u591A\u5929\u3002 \u4F60\u8FD9\u5F20\u5361\u6700\u957F\u514D\u606F "+b.days+" \u5929\uFF0C\u5C31\u662F\u5237\u5728 "+l(f)+"\uFF08\u8D26\u5355\u65E5\u6B21\u65E5\uFF09\u7684\u65F6\u5019\uFF1B \u4ECA\u5929\u5237\u53EA\u6709 "+i.days+" \u5929\uFF0C\u6BD4\u6700\u4F18\u5C11 "+Math.max(0,b.days-i.days)+" \u5929\u3002\u5927\u989D\u6D88\u8D39\u632A\u5230\u8D26\u5355\u65E5\u6B21\u65E5\u518D\u5237\uFF0C\u7B49\u4E8E\u767D\u62FF\u4E00\u4E2A\u591A\u6708\u7684\u65E0\u606F\u8D37\u6B3E\u3002\u4E0B\u65B9\u8868\u683C\u7684\u6D88\u8D39\u65E5\u4F1A\u8DDF\u7740\u8D26\u5355\u65E5\u81EA\u52A8\u91CD\u7B97\uFF1A\u7B2C\u4E00\u884C\u662F\u4ECA\u5929\uFF0C\u5176\u540E\u662F\u51FA\u8D26\u65E5\u3001\u51FA\u8D26\u6B21\u65E5\uFF08\u6700\u4F18\uFF09\u548C\u51FA\u8D26\u540E\u51E0\u4E2A\u5173\u952E\u65E5\u5B50\uFF1B\u6539\u8D26\u5355\u65E5/\u8FD8\u6B3E\u65E5\uFF0C\u5168\u8868\u540C\u6B65\u5237\u65B0\u3002 \u4F46\u8981\u8BB0\u4F4F\u4E09\u4EF6\u4E8B\uFF1A\u2460 \u514D\u606F\u671F\u53EA\u5BF9\u300C\u5168\u989D\u8FD8\u6B3E\u300D\u6709\u6548\uFF0C\u54EA\u6015\u5DEE 1 \u5143\u6CA1\u8FD8\u6E05\uFF0C\u5168\u90E8\u6D88\u8D39\u90FD\u4ECE\u8BB0\u8D26\u65E5\u8D77\u6309\u65E5\u606F 0.05% \u8BA1\u606F\uFF08\u5E74\u5316 18.25%\uFF09\uFF0C\u514D\u606F\u4E00\u5929\u90FD\u6CA1\u6709\uFF1B \u2461 \u53D6\u73B0\u3001\u8F6C\u8D26\u3001\u5206\u671F\u4E0D\u4EAB\u53D7\u514D\u606F\uFF0C\u53D6\u73B0\u5F53\u5929\u5C31\u5F00\u59CB\u7B97\u5229\u606F\u8FD8\u6709\u624B\u7EED\u8D39\uFF1B \u2462 \u6240\u8C13\u300C\u6700\u4F4E\u8FD8\u6B3E\u300D\u53EA\u662F\u4E0D\u903E\u671F\uFF0C\u5229\u606F\u7167\u6837\u5168\u989D\u7B97\uFF0C\u6240\u4EE5\u522B\u628A\u514D\u606F\u671F\u5F53\u6536\u5165\uFF0C\u5B83\u53EA\u662F\u8BA9\u73B0\u91D1\u6D41\u987A\u4E00\u70B9\u3002"}_(rn,"calcFreePeriod");function cn(){var t=Math.max(0,e(n("ev-km"),0)),d=Math.max(0,e(n("ev-oil"),0)),o=Math.max(0,e(n("ev-price"),0)),s=Math.max(0,e(n("ev-kwh"),0)),p=Math.max(0,e(n("ev-eprice"),0)),m=Math.max(0,e(n("ev-p1"),0)),u=Math.max(0,e(n("ev-p2"),0)),l=Math.max(1,Math.min(20,Math.round(e(n("ev-years"),8)))),c=Math.min(100,Math.max(0,e(n("ev-res1"),30)))/100,i=Math.min(100,Math.max(0,e(n("ev-res2"),25)))/100,f=Math.max(0,e(n("ev-m1"),0)),b=Math.max(0,e(n("ev-m2"),0)),M=Math.max(0,e(n("ev-i1"),0)),r=Math.max(0,e(n("ev-i2"),0)),C=t*d/100*o,h=t*s/100*p,x=C+f+M,E=h+b+r;function k(G,q,V,J){return G+q*J-G*V}_(k,"total");var g=k(m,x,c,l),y=k(u,E,i,l),S=g-y,T=f-b+(M-r),N=(d*o-s*p)/100,v=u-m-(u*i-m*c),F=N>0?(v/l-T)/N:0;n("ev-diff").textContent=(S>=0?"":"-")+a(Math.abs(S)),n("ev-energy").textContent=a(C)+" / "+a(h),n("ev-year").textContent=a(x)+" / "+a(E),n("ev-perkm").textContent=a(t>0?x/t:0)+" / "+a(t>0?E/t:0)+" \u5143",n("ev-t1").textContent=w(g),n("ev-t2").textContent=w(y),n("ev-crit").textContent=Math.max(0,Math.round(F)).toLocaleString("zh-CN")+" \u516C\u91CC/\u5E74";var R=n("ev-body");R.innerHTML="";for(var D=[5e3,1e4,15e3,2e4,3e4],Y=0;Y<D.length;Y++){var W=D[Y],K=W*d/100*o+f+M,I=W*s/100*p+b+r,H=k(m,K,c,l),O=k(u,I,i,l),U=document.createElement("tr");U.innerHTML="<td>"+a(W)+"</td><td>"+a(H)+"</td><td>"+a(O)+"</td><td>"+(H>O?"\u7535\u8F66\u7701 "+a(H-O):"\u6CB9\u8F66\u7701 "+a(O-H))+"</td>",R.appendChild(U)}n("ev-note").textContent="\u6309\u4E00\u5E74\u5F00 "+a(t)+" \u516C\u91CC\uFF08\u6CB9\u4EF7 "+o+" \u5143/L\u3001\u7535\u8017 "+s+" \u5EA6/100km\u3001\u7535\u4EF7 "+p+" \u5143/\u5EA6\uFF09\u7B97\uFF1A\u6CB9\u8D39 "+a(C)+" \u5143\u3001\u7535\u8D39 "+a(h)+" \u5143\uFF0C\u4E00\u5E74\u5149\u80FD\u6E90\u5C31\u5DEE "+a(C-h)+" \u5143\u3002 \u52A0\u4E0A\u4FDD\u517B\u548C\u4FDD\u9669\uFF0C\u6CB9\u8F66\u4E00\u5E74 "+a(x)+" \u5143\u3001\u7535\u8F66 "+a(E)+" \u5143\u3002 \u628A\u8D2D\u8F66\u5DEE\u4EF7\u548C "+l+" \u5E74\u540E\u7684\u6B8B\u503C\u4E5F\u7B97\u8FDB\u6765\uFF0C\u5F00\u6EE1 "+l+" \u5E74\u6CB9\u8F66\u603B\u82B1\u8D39 "+a(g)+" \u5143\u3001\u7535\u8F66 "+a(y)+" \u5143\uFF0C"+(S>=0?"\u7535\u8F66\u7701 "+a(S)+" \u5143\u3002":"\u7535\u8F66\u53CD\u800C\u8D35 "+a(-S)+" \u5143\u3002")+" \u5173\u952E\u53D8\u91CF\u662F\u91CC\u7A0B\uFF1A\u76C8\u4E8F\u5E73\u8861\u70B9\u5927\u7EA6\u5728\u6BCF\u5E74 "+Math.max(0,Math.round(F)).toLocaleString("zh-CN")+" \u516C\u91CC\uFF0C\u5F00\u5F97\u6BD4\u8FD9\u591A\u7535\u8F66\u624D\u5212\u7B97\u3002 \u4E09\u4E2A\u5E38\u88AB\u5FFD\u7565\u7684\u9879\uFF1A\u2460 \u7535\u8F66\u9996\u5E74\u6298\u65E7\u5F88\u731B\uFF08\u4E09\u5E74\u6389\u4EF7\u5E38\u8D85\u4E00\u534A\uFF09\uFF0C\u4FDD\u503C\u7387\u5DEE\u7684\u90E8\u5206\u6211\u6309\u6B8B\u503C\u7387\u7B97\u4E86\uFF0C\u5B9E\u9645\u53EF\u80FD\u66F4\u72E0\uFF1B \u2461 \u5BB6\u91CC\u80FD\u4E0D\u80FD\u88C5\u5145\u7535\u6869\u51B3\u5B9A\u7535\u4EF7\uFF0C\u5168\u9760\u516C\u5171\u5FEB\u5145\uFF081.5 \u5143/\u5EA6\u4EE5\u4E0A\uFF09\u65F6\u4F18\u52BF\u4F1A\u88AB\u5403\u6389\u4E00\u534A\uFF1B \u2462 \u7535\u6C60\u8870\u51CF\u3001\u6362\u7535\u6210\u672C\u3001\u4FDD\u9669\u9010\u5E74\u4E0A\u6DA8\u90FD\u6CA1\u7B97\u8FDB\u53BB\uFF0C\u957F\u9014\u591A\u7684\u4EBA\u8FD8\u8981\u7B97\u4E0A\u8865\u80FD\u65F6\u95F4\u6210\u672C\u3002"}_(cn,"calcEv");export const PANELS={installment:`  <section class="panel" id="panel-installment">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u5206\u671F\u91D1\u989D\uFF08\u5143\uFF09</span>
      <input id="is-amount" type="number" inputmode="decimal" min="0" step="1000" value="12000">
    </label>
    <label class="f">
      <span>\u5206\u671F\u671F\u6570\uFF08\u6708\uFF09</span>
      <input id="is-months" type="number" inputmode="decimal" min="0" step="1" value="12">
    </label>
    <label class="f">
      <span>\u624B\u7EED\u8D39\u600E\u4E48\u6536</span>
      <select id="is-mode">
        <option value="monthly" selected>\u6BCF\u671F\u6536\uFF0C\u6309\u671F\u8D39\u7387</option>
        <option value="once">\u4E00\u6B21\u6027\u6536\uFF0C\u6309\u603B\u8D39\u7387</option>
        <option value="fixed">\u76F4\u63A5\u7ED9\u603B\u624B\u7EED\u8D39\u91D1\u989D</option>
      </select>
    </label>
    <label class="f">
      <span id="is-rate-label">\u6BCF\u671F\u8D39\u7387\uFF08%\uFF09</span>
      <input id="is-rate" type="number" inputmode="decimal" min="0" step="0.01" value="0.6">
      <em>\u94F6\u884C/\u5E73\u53F0\u5E38\u5199\u300C\u6708\u8D39\u7387 0.6%\u300D\u6216\u300C\u6BCF\u671F 0.6%\u300D\uFF0C\u5C31\u586B\u8FD9\u91CC</em>
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u5B9E\u9645\u5E74\u5316\u5229\u7387\uFF08IRR \u53E3\u5F84\uFF09</span>
      <strong id="is-apr">\u2014</strong>
      <span class="unit">%</span>
    </div>
    <ul class="kv">
      <li><span>\u6BCF\u671F\u8FD8\u6B3E</span><b id="is-pay">\u2014</b></li>
      <li><span>\u624B\u7EED\u8D39\u5408\u8BA1</span><b id="is-fee">\u2014</b></li>
      <li><span>\u540D\u4E49\u5E74\u5316\uFF08\u8D39\u7387\xD712\uFF09</span><b id="is-nominal">\u2014</b></li>
      <li><span>\u6BD4\u5BA3\u4F20\u7684\u8D39\u7387\u8D35\u591A\u5C11\u500D</span><b id="is-multiple">\u2014</b></li>
    </ul>
    <p class="hint" id="is-note"></p>
  </div>
    </div>
  </section>
`,deal:`  <section class="panel" id="panel-deal">
    <div class="cols">
  <div class="card">
    <h2>\u6253\u6298 / \u6EE1\u51CF</h2>
    <label class="f">
      <span>\u539F\u4EF7\uFF08\u5143 / \u4EF6\uFF09</span>
      <input id="dl-price" type="number" inputmode="decimal" min="0" step="10" value="299">
    </label>
    <label class="f">
      <span>\u6298\u6263\uFF08\u51E0\u6298\uFF0C\u4E0D\u6253\u6298\u586B 10\uFF09</span>
      <input id="dl-discount" type="number" inputmode="decimal" min="0" step="0.5" value="8.5">
    </label>
    <label class="f">
      <span>\u6EE1\u51CF\u6761\u4EF6\uFF08\u6EE1 X \u5143\uFF0C\u6CA1\u6709\u586B 0\uFF09</span>
      <input id="dl-threshold" type="number" inputmode="decimal" min="0" step="50" value="300">
    </label>
    <label class="f">
      <span>\u6EE1\u51CF\u91D1\u989D\uFF08\u51CF Y \u5143\uFF09</span>
      <input id="dl-off" type="number" inputmode="decimal" min="0" step="10" value="50">
    </label>
    <label class="f">
      <span>\u6570\u91CF\uFF08\u4EF6\uFF09</span>
      <input id="dl-qty" type="number" inputmode="decimal" min="0" step="1" value="2">
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u5B9E\u9645\u8981\u4ED8</span>
      <strong id="dl-pay">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u76F8\u5F53\u4E8E\u6253\u51E0\u6298</span><b id="dl-real-discount">\u2014</b></li>
      <li><span>\u7701\u4E86\u591A\u5C11\u94B1</span><b id="dl-save">\u2014</b></li>
      <li><span>\u6BCF\u4EF6\u5B9E\u9645\u5355\u4EF7</span><b id="dl-unit">\u2014</b></li>
      <li><span>\u79BB\u4E0B\u4E00\u6863\u6EE1\u51CF\u8FD8\u5DEE</span><b id="dl-next">\u2014</b></li>
    </ul>
    <p class="hint" id="dl-note"></p>
  </div>
    </div>

    <div class="cols">
  <div class="card">
    <h2>\u5355\u4EF7\u6BD4\u8F83\uFF1A\u54EA\u4E2A\u66F4\u5212\u7B97</h2>
    <label class="f">
      <span>\u5546\u54C1 A</span>
      <span class="row">
        <input id="dl-pa" type="number" inputmode="decimal" min="0" step="1" value="39.9" placeholder="\u4EF7\u683C">
        <input id="dl-qa" type="number" inputmode="decimal" min="0" step="1" value="750" placeholder="\u6570\u91CF">
        <select id="dl-ua">
          <option value="\u514B" selected>\u514B</option>
          <option value="\u6BEB\u5347">\u6BEB\u5347</option>
          <option value="\u4E2A">\u4E2A</option>
          <option value="\u7247">\u7247</option>
        </select>
      </span>
    </label>
    <label class="f">
      <span>\u5546\u54C1 B</span>
      <span class="row">
        <input id="dl-pb" type="number" inputmode="decimal" min="0" step="1" value="56" placeholder="\u4EF7\u683C">
        <input id="dl-qb" type="number" inputmode="decimal" min="0" step="1" value="1100" placeholder="\u6570\u91CF">
        <select id="dl-ub">
          <option value="\u514B" selected>\u514B</option>
          <option value="\u6BEB\u5347">\u6BEB\u5347</option>
          <option value="\u4E2A">\u4E2A</option>
          <option value="\u7247">\u7247</option>
        </select>
      </span>
    </label>
  </div>

  <div class="card res">
    <h2>\u6BD4\u8F83\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u66F4\u5212\u7B97\u7684\u662F</span>
      <strong id="dl-winner">\u2014</strong>
      <span class="unit" id="dl-winner-unit"></span>
    </div>
    <ul class="kv">
      <li><span>\u5546\u54C1 A \u5355\u4EF7</span><b id="dl-unit-a">\u2014</b></li>
      <li><span>\u5546\u54C1 B \u5355\u4EF7</span><b id="dl-unit-b">\u2014</b></li>
      <li><span>\u5DEE\u4EF7\u6BD4\u4F8B</span><b id="dl-diff">\u2014</b></li>
    </ul>
    <p class="hint" id="dl-note2"></p>
  </div>
    </div>
  </section>
`,card:`  <section class="panel" id="panel-card">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u672C\u671F\u8D26\u5355\u91D1\u989D\uFF08\u5143\uFF09</span>
      <input id="cd-balance" type="number" inputmode="decimal" min="0" step="500" value="10000">
    </label>
    <label class="f">
      <span>\u6700\u4F4E\u8FD8\u6B3E\u6BD4\u4F8B\uFF08%\uFF09</span>
      <input id="cd-min" type="number" inputmode="decimal" min="0" max="100" step="1" value="10">
    </label>
    <label class="f">
      <span>\u65E5\u5229\u7387\uFF08%\uFF09</span>
      <input id="cd-rate" type="number" inputmode="decimal" min="0" step="0.005" value="0.05">
      <em>\u4FE1\u7528\u5361\u5FAA\u73AF\u5229\u606F\u4E00\u822C\u662F\u65E5\u606F\u4E07\u5206\u4E4B\u4E94\uFF0C\u5373 0.05%</em>
    </label>
    <label class="f">
      <span>\u6BCF\u671F\u8BA1\u606F\u5929\u6570</span>
      <input id="cd-days" type="number" inputmode="numeric" min="1" step="1" value="30">
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C\uFF08\u53EA\u8FD8\u6700\u4F4E\u8FD8\u6B3E\uFF09</h2>
    <div class="big">
      <span class="k">\u9996\u671F\u5229\u606F</span>
      <strong id="cd-interest">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u6298\u5408\u5E74\u5316\u5229\u7387</span><b id="cd-apr">\u2014</b></li>
      <li><span>\u672C\u671F\u6700\u4F4E\u8FD8\u6B3E\u989D</span><b id="cd-min-amt">\u2014</b></li>
      <li><span>\u4E00\u76F4\u53EA\u8FD8\u6700\u4F4E\uFF0C\u8FD8\u6E05\u9700\u8981</span><b id="cd-months">\u2014</b></li>
      <li><span>\u7D2F\u8BA1\u5229\u606F</span><b id="cd-total-int">\u2014</b></li>
      <li><span>12 \u671F\u540E\u4ECD\u6B20</span><b id="cd-left">\u2014</b></li>
      <li><span>\u82E5\u8FD9\u6B21\u5168\u989D\u8FD8\u6E05\u53EF\u7701\u5229\u606F</span><b id="cd-save">\u2014</b></li>
    </ul>
    <p class="hint" id="cd-note"></p>
  </div>
    </div>
  </section>
`,fx:`  <section class="panel" id="panel-fx">
    <div class="cols">
  <div class="card">
    <h2>\u6C47\u7387\u6362\u7B97</h2>
    <label class="f">
      <span>\u91D1\u989D</span>
      <span class="row">
        <input id="fx-amount" type="number" inputmode="decimal" min="0" step="100" value="1000">
        <select id="fx-cur">
          <option value="\u7F8E\u5143">\u7F8E\u5143 USD</option>
          <option value="\u6B27\u5143">\u6B27\u5143 EUR</option>
          <option value="\u65E5\u5143">\u65E5\u5143 JPY</option>
          <option value="\u6E2F\u5E01">\u6E2F\u5E01 HKD</option>
          <option value="\u82F1\u9551">\u82F1\u9551 GBP</option>
          <option value="\u6FB3\u5143">\u6FB3\u5143 AUD</option>
          <option value="\u52A0\u5143">\u52A0\u5143 CAD</option>
          <option value="\u97E9\u5143">\u97E9\u5143 KRW</option>
          <option value="\u65B0\u5E01">\u65B0\u5E01 SGD</option>
          <option value="\u6CF0\u94E2">\u6CF0\u94E2 THB</option>
        </select>
      </span>
    </label>
    <label class="f">
      <span>\u6C47\u7387\uFF1A1 \u5916\u5E01 = ? \u4EBA\u6C11\u5E01</span>
      <input id="fx-rate" type="number" inputmode="decimal" min="0" step="0.01" value="7.10">
      <em>\u6C47\u7387\u6BCF\u5929\u53D8\uFF0C\u6309\u4F60\u624B\u4E0A\u94F6\u884C App \u7684\u5B9E\u65F6\u724C\u4EF7\u586B</em>
    </label>
    <label class="f">
      <span>\u6362\u6C47\u624B\u7EED\u8D39 / \u70B9\u5DEE\uFF08%\uFF09</span>
      <input id="fx-fee" type="number" inputmode="decimal" min="0" step="0.1" value="0">
    </label>

    <h2 class="sub">\u5355\u4F4D\u6362\u7B97</h2>
    <label class="f">
      <span>\u7C7B\u522B</span>
      <select id="fx-cat">
        <option value="length" selected>\u957F\u5EA6</option>
        <option value="weight">\u91CD\u91CF</option>
        <option value="area">\u9762\u79EF</option>
        <option value="volume">\u4F53\u79EF</option>
        <option value="temp">\u6E29\u5EA6</option>
      </select>
    </label>
    <label class="f">
      <span>\u6570\u503C</span>
      <input id="fx-value" type="number" inputmode="decimal" step="1" value="1">
    </label>
    <label class="f">
      <span>\u4ECE / \u5230</span>
      <span class="row">
        <select id="fx-from"></select>
        <select id="fx-to"></select>
      </span>
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k" id="fx-main-label">\u6298\u5408\u4EBA\u6C11\u5E01</span>
      <strong id="fx-main">\u2014</strong>
      <span class="unit" id="fx-main-unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u6263\u6389\u624B\u7EED\u8D39\u540E\u5B9E\u9645\u5230\u8D26</span><b id="fx-net">\u2014</b></li>
      <li><span>\u53CD\u8FC7\u6765\uFF1A\u4EBA\u6C11\u5E01 \u2192 \u5916\u5E01</span><b id="fx-rev">\u2014</b></li>
      <li><span>\u5355\u4F4D\u6362\u7B97\u7ED3\u679C</span><b id="fx-unit-result">\u2014</b></li>
      <li><span>\u6362\u7B97\u5173\u7CFB</span><b id="fx-unit-formula">\u2014</b></li>
    </ul>
    <p class="hint" id="fx-note"></p>
  </div>
    </div>
  </section>
`,split:`  <section class="panel" id="panel-split">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u6D88\u8D39\u603B\u989D\uFF08\u5143\uFF09</span>
      <input id="sp-total" type="number" inputmode="decimal" min="0" step="50" value="1288">
    </label>
    <label class="f">
      <span>\u53C2\u4E0E\u4EBA\u6570\uFF08\u542B\u81EA\u5DF1\uFF09</span>
      <input id="sp-people" type="number" inputmode="numeric" min="1" step="1" value="6">
    </label>
    <label class="f">
      <span>\u670D\u52A1\u8D39 / \u5C0F\u8D39\uFF08%\uFF09</span>
      <input id="sp-fee" type="number" inputmode="decimal" min="0" step="1" value="10">
    </label>
    <label class="f">
      <span>\u62B9\u96F6\u65B9\u5F0F</span>
      <select id="sp-round">
        <option value="0" selected>\u7CBE\u786E\u5230\u5206</option>
        <option value="1">\u62B9\u5230\u5143</option>
        <option value="10">\u62B9\u5230 10 \u5143</option>
      </select>
    </label>
    <label class="f">
      <span>\u8C01\u627F\u62C5\u62B9\u96F6\u5DEE\u989D</span>
      <select id="sp-who">
        <option value="self" selected>\u53D1\u8D77\u4EBA\uFF08\u81EA\u5DF1\u591A\u51FA\uFF09</option>
        <option value="all">\u5927\u5BB6\u5E73\u644A\uFF08\u4E0D\u62B9\u96F6\uFF09</option>
      </select>
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u6BCF\u4EBA\u5E94\u4ED8</span>
      <strong id="sp-each">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u542B\u670D\u52A1\u8D39\u7684\u5B9E\u4ED8\u603B\u989D</span><b id="sp-gross">\u2014</b></li>
      <li><span>\u5176\u4E2D\u670D\u52A1\u8D39</span><b id="sp-fee-amt">\u2014</b></li>
      <li><span>\u5176\u4ED6\u4EBA\u5404\u4ED8</span><b id="sp-others">\u2014</b></li>
      <li><span>\u53D1\u8D77\u4EBA\uFF08\u4F60\uFF09\u5B9E\u9645\u4ED8</span><b id="sp-self">\u2014</b></li>
      <li><span>\u6536\u6B3E\u5408\u8BA1\u6838\u5BF9</span><b id="sp-check">\u2014</b></li>
    </ul>
    <p class="hint" id="sp-note"></p>
  </div>
    </div>
  </section>
`,multi:`  <section class="panel" id="panel-multi">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u91D1\u989D</span>
      <input id="mc-amount" type="number" inputmode="decimal" min="0" step="100" value="10000">
    </label>
    <label class="f">
      <span>\u8FD9\u7B14\u94B1\u662F\u54EA\u79CD\u8D27\u5E01</span>
      <select id="mc-cur">
        <option value="CNY" selected>\u4EBA\u6C11\u5E01 CNY</option>
        <option value="USD">\u7F8E\u5143 USD</option>
        <option value="EUR">\u6B27\u5143 EUR</option>
        <option value="JPY">\u65E5\u5143 JPY</option>
        <option value="HKD">\u6E2F\u5E01 HKD</option>
        <option value="GBP">\u82F1\u9551 GBP</option>
      </select>
    </label>
    <h2 class="sub">\u6C47\u7387\uFF08\u5143 / 1 \u5916\u5E01\uFF0C\u624B\u52A8\u586B\uFF09</h2>
    <label class="f">
      <span>\u7F8E\u5143 USD</span>
      <input id="mc-usd" type="number" inputmode="decimal" min="0" step="0.01" value="7.10">
    </label>
    <label class="f">
      <span>\u6B27\u5143 EUR</span>
      <input id="mc-eur" type="number" inputmode="decimal" min="0" step="0.01" value="7.75">
    </label>
    <label class="f">
      <span>\u65E5\u5143 JPY\uFF08\u6BCF 1 \u65E5\u5143\uFF09</span>
      <input id="mc-jpy" type="number" inputmode="decimal" min="0" step="0.001" value="0.0475">
    </label>
    <label class="f">
      <span>\u6E2F\u5E01 HKD</span>
      <input id="mc-hkd" type="number" inputmode="decimal" min="0" step="0.001" value="0.912">
    </label>
    <label class="f">
      <span>\u82F1\u9551 GBP</span>
      <input id="mc-gbp" type="number" inputmode="decimal" min="0" step="0.01" value="9.05">
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u6298\u5408\u4EBA\u6C11\u5E01</span>
      <strong id="mc-cny">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u7F8E\u5143 USD</span><b id="mc-usd-out">\u2014</b></li>
      <li><span>\u6B27\u5143 EUR</span><b id="mc-eur-out">\u2014</b></li>
      <li><span>\u65E5\u5143 JPY</span><b id="mc-jpy-out">\u2014</b></li>
      <li><span>\u6E2F\u5E01 HKD</span><b id="mc-hkd-out">\u2014</b></li>
      <li><span>\u82F1\u9551 GBP</span><b id="mc-gbp-out">\u2014</b></li>
      <li><span>\u94F6\u884C\u5356\u51FA\u4EF7\u4E0A\u6D6E 0.4% \u540E</span><b id="mc-spread">\u2014</b></li>
    </ul>
    <p class="hint" id="mc-note"></p>
  </div>
    </div>
  </section>
`,car:`  <section class="panel" id="panel-car">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u8F66\u4EF7\uFF08\u5143\uFF0C\u542B\u8D2D\u7F6E\u7A0E\u7B49\u843D\u5730\u4EF7\u5DEE\u53EF\u53E6\u8BA1\uFF09</span>
      <input id="cr-price" type="number" inputmode="decimal" min="0" step="10000" value="150000">
    </label>
    <label class="f">
      <span>\u8BA1\u5212\u5F00\u51E0\u5E74</span>
      <input id="cr-years" type="number" inputmode="numeric" min="1" max="20" step="1" value="8">
    </label>
    <label class="f">
      <span>\u5C4A\u65F6\u6B8B\u503C\u7387\uFF08%\uFF09</span>
      <input id="cr-residual" type="number" inputmode="decimal" min="0" max="100" step="5" value="30">
    </label>
    <label class="f">
      <span>\u6BCF\u5E74\u884C\u9A76\uFF08\u516C\u91CC\uFF09</span>
      <input id="cr-km" type="number" inputmode="decimal" min="0" step="1000" value="15000">
    </label>
    <label class="f">
      <span>\u7EFC\u5408\u6CB9\u8017\uFF08L/100km\uFF09</span>
      <input id="cr-fc" type="number" inputmode="decimal" min="0" step="0.5" value="8">
    </label>
    <label class="f">
      <span>\u6CB9\u4EF7\uFF08\u5143/\u5347\uFF09</span>
      <input id="cr-oil" type="number" inputmode="decimal" min="0" step="0.1" value="8">
    </label>
    <label class="f">
      <span>\u4FDD\u9669\uFF08\u5143/\u5E74\uFF09</span>
      <input id="cr-ins" type="number" inputmode="decimal" min="0" step="500" value="5000">
    </label>
    <label class="f">
      <span>\u4FDD\u517B\u7EF4\u4FEE\uFF08\u5143/\u5E74\uFF09</span>
      <input id="cr-maint" type="number" inputmode="decimal" min="0" step="500" value="2000">
    </label>
    <label class="f">
      <span>\u505C\u8F66\u6D17\u8F66\u8FC7\u8DEF\uFF08\u5143/\u5E74\uFF09</span>
      <input id="cr-park" type="number" inputmode="decimal" min="0" step="500" value="3600">
    </label>
    <label class="f">
      <span>\u6253\u8F66\u6298\u7B97\u5355\u4EF7\uFF08\u5143/\u516C\u91CC\uFF09</span>
      <input id="cr-taxi" type="number" inputmode="decimal" min="0" step="0.1" value="2.4">
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u517B\u8F66\u6BCF\u5E74\u603B\u6210\u672C</span>
      <strong id="cr-total">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u6BCF\u5E74\u6298\u65E7</span><b id="cr-dep">\u2014</b></li>
      <li><span>\u6BCF\u5E74\u6CB9\u8D39</span><b id="cr-fuel">\u2014</b></li>
      <li><span>\u4FDD\u9669+\u4FDD\u517B+\u505C\u8F66</span><b id="cr-fixed">\u2014</b></li>
      <li><span>\u6BCF\u516C\u91CC\u6210\u672C</span><b id="cr-perkm">\u2014</b></li>
      <li><span>\u540C\u7B49\u91CC\u7A0B\u6253\u8F66\u6BCF\u5E74</span><b id="cr-taxi-year">\u2014</b></li>
      <li><span>\u6253\u8F66 \u2212 \u517B\u8F66</span><b id="cr-diff">\u2014</b></li>
      <li><span>\u6301\u6709\u671F\u5185\u603B\u82B1\u8D39</span><b id="cr-life">\u2014</b></li>
    </ul>
    <p class="hint" id="cr-note"></p>
  </div>
    </div>
  </section>
`,debtfree:`  <section class="panel" id="panel-debtfree">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u4E09\u7B14\u503A\u52A1\uFF0C\u7528\u4E0D\u5230\u7684\u586B 0\uFF09</h2>
    <label class="f"><span>\u7B2C 1 \u7B14\uFF1A\u540D\u79F0</span><span class="hint">\u8F66\u8D37\u5C3E\u6B3E</span></label>
    <label class="f"><span>\u4F59\u989D\uFF08\u5143\uFF09</span>
      <input id="df-bal1" type="number" inputmode="decimal" min="0" step="1000" value="15000"></label>
    <label class="f"><span>\u5E74\u5229\u7387\uFF08%\uFF09</span>
      <input id="df-rate1" type="number" inputmode="decimal" min="0" step="0.1" value="4"></label>
    <label class="f"><span>\u6BCF\u6708\u6700\u4F4E\u8FD8\u6B3E\uFF08\u5143\uFF09</span>
      <input id="df-min1" type="number" inputmode="decimal" min="0" step="100" value="1200"></label>
    <label class="f"><span>\u7B2C 2 \u7B14\uFF1A\u540D\u79F0</span><span class="hint">\u4FE1\u7528\u5361</span></label>
    <label class="f"><span>\u4F59\u989D\uFF08\u5143\uFF09</span>
      <input id="df-bal2" type="number" inputmode="decimal" min="0" step="1000" value="50000"></label>
    <label class="f"><span>\u5E74\u5229\u7387\uFF08%\uFF09</span>
      <input id="df-rate2" type="number" inputmode="decimal" min="0" step="0.1" value="18"></label>
    <label class="f"><span>\u6BCF\u6708\u6700\u4F4E\u8FD8\u6B3E\uFF08\u5143\uFF09</span>
      <input id="df-min2" type="number" inputmode="decimal" min="0" step="100" value="500"></label>
    <label class="f"><span>\u7B2C 3 \u7B14\uFF1A\u540D\u79F0</span><span class="hint">\u6D88\u8D39\u8D37</span></label>
    <label class="f"><span>\u4F59\u989D\uFF08\u5143\uFF09</span>
      <input id="df-bal3" type="number" inputmode="decimal" min="0" step="1000" value="60000"></label>
    <label class="f"><span>\u5E74\u5229\u7387\uFF08%\uFF09</span>
      <input id="df-rate3" type="number" inputmode="decimal" min="0" step="0.1" value="9"></label>
    <label class="f"><span>\u6BCF\u6708\u6700\u4F4E\u8FD8\u6B3E\uFF08\u5143\uFF09</span>
      <input id="df-min3" type="number" inputmode="decimal" min="0" step="100" value="800"></label>
    <label class="f"><span>\u6BCF\u6708\u989D\u5916\u80FD\u591A\u8FD8\uFF08\u5143\uFF09</span>
      <input id="df-extra" type="number" inputmode="decimal" min="0" step="500" value="2000"></label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u9AD8\u606F\u4F18\u5148\uFF0C\u8FD8\u6E05\u8981</span><strong id="df-months">\u2014</strong><span class="unit">\u4E2A\u6708</span></div>
    <ul class="kv">
      <li><span>\u6B20\u6B3E\u5408\u8BA1</span><b id="df-total">\u2014</b></li>
      <li><span>\u6BCF\u6708\u5B9E\u9645\u6295\u5165\uFF08\u6700\u4F4E\u8FD8\u6B3E\uFF0B\u989D\u5916\uFF09</span><b id="df-permonth">\u2014</b></li>
      <li><span>\u96EA\u5D29\u6CD5\uFF08\u5148\u8FD8\u5229\u7387\u6700\u9AD8\uFF09\u603B\u5229\u606F</span><b id="df-intA">\u2014</b></li>
      <li><span>\u96EA\u7403\u6CD5\uFF08\u5148\u8FD8\u91D1\u989D\u6700\u5C0F\uFF09\u603B\u5229\u606F</span><b id="df-intS">\u2014</b></li>
      <li><span>\u96EA\u5D29\u6CD5\u5C11\u4ED8\u5229\u606F</span><b id="df-diff">\u2014</b></li>
      <li><span>\u53EA\u8FD8\u6700\u4F4E\u3001\u4E00\u5206\u4E0D\u52A0</span><b id="df-minonly">\u2014</b></li>
      <li><span>\u7B2C\u4E00\u7B14\u8BE5\u5148\u6E05\u6389</span><b id="df-first">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u503A\u52A1</th><th>\u4F59\u989D</th><th>\u5229\u7387</th><th>\u96EA\u5D29</th><th>\u96EA\u7403</th><th>\u5229\u606F</th></tr></thead>
        <tbody id="df-body"></tbody>
      </table>
    </div>
    <p class="hint" id="df-note"></p>
  </div>
    </div>
  </section>
`,debtmerge:`  <section class="panel" id="panel-debtmerge">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f"><span>\u73B0\u5728\u6B20\u591A\u5C11\uFF08\u9AD8\u606F\u90A3\u8FB9\uFF0C\u5143\uFF09</span>
      <input id="dm-bal" type="number" inputmode="decimal" min="0" step="1000" value="50000"></label>
    <label class="f"><span>\u73B0\u5728\u8FD9\u7B14\u7684\u5E74\u5229\u7387\uFF08%\uFF09</span>
      <input id="dm-old" type="number" inputmode="decimal" min="0" step="0.5" value="18"></label>
    <label class="f"><span>\u7F6E\u6362\u540E\u7684\u5E74\u5229\u7387\uFF08%\uFF09</span>
      <input id="dm-new" type="number" inputmode="decimal" min="0" step="0.5" value="7"></label>
    <label class="f"><span>\u7F6E\u6362\u624B\u7EED\u8D39\uFF08\u6309\u672C\u91D1 %\uFF09</span>
      <input id="dm-fee" type="number" inputmode="decimal" min="0" step="0.5" value="2"></label>
    <label class="f"><span>\u6BCF\u6708\u80FD\u8FD8\u591A\u5C11\uFF08\u5143\uFF09</span>
      <input id="dm-pay" type="number" inputmode="decimal" min="0" step="100" value="2500"></label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u7F6E\u6362\u540E\u80FD\u7701</span><strong id="dm-save">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u4E0D\u7F6E\u6362\uFF1A\u8FD8\u6E05\u8981</span><b id="dm-m1">\u2014</b></li>
      <li><span>\u4E0D\u7F6E\u6362\uFF1A\u4ED8\u7684\u5229\u606F</span><b id="dm-t1">\u2014</b></li>
      <li><span>\u7F6E\u6362\u540E\uFF1A\u8FD8\u6E05\u8981</span><b id="dm-m2">\u2014</b></li>
      <li><span>\u7F6E\u6362\u540E\uFF1A\u4ED8\u7684\u5229\u606F</span><b id="dm-t2">\u2014</b></li>
      <li><span>\u624B\u7EED\u8D39\uFF08\u8BA1\u5165\u672C\u91D1\uFF09</span><b id="dm-feeamt">\u2014</b></li>
      <li><span>\u624B\u7EED\u8D39\u7387\u9AD8\u5230\u591A\u5C11\u5C31\u4E0D\u5212\u7B97\u4E86</span><b id="dm-breakeven">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u624B\u7EED\u8D39\u7387</th><th>\u624B\u7EED\u8D39</th><th>\u51C0\u7701</th><th>\u7ED3\u8BBA</th></tr></thead>
        <tbody id="dm-body"></tbody>
      </table>
    </div>
    <p class="hint" id="dm-note"></p>
  </div>
    </div>
  </section>
`,freeperiod:`  <section class="panel" id="panel-freeperiod">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f"><span>\u8D26\u5355\u65E5\uFF08\u6BCF\u6708\u7684\u51E0\u53F7\u51FA\u8D26\uFF09</span>
      <input id="fp-bill" type="number" inputmode="decimal" min="1" max="28" step="1" value="5"></label>
    <label class="f"><span>\u8FD8\u6B3E\u65E5\uFF08\u6BCF\u6708\u7684\u51E0\u53F7\u8FD8\u94B1\uFF09</span>
      <input id="fp-due" type="number" inputmode="decimal" min="1" max="28" step="1" value="25"></label>
    <label class="f"><span>\u8BA1\u5212\u5237\u591A\u5C11\uFF08\u5143\uFF0C\u53EF\u7559\u7A7A\uFF09</span>
      <input id="fp-amount" type="number" inputmode="decimal" min="0" step="500" value="5000"></label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u4ECA\u5929\u5237\uFF0C\u80FD\u514D\u606F\u7528</span><strong id="fp-days">\u2014</strong><span class="unit">\u5929</span></div>
    <ul class="kv">
      <li><span>\u8FD9\u7B14\u94B1\u7B97\u5728\u54EA\u671F\u8D26\u5355</span><b id="fp-billdate">\u2014</b></li>
      <li><span>\u6700\u665A\u54EA\u5929\u8FD8</span><b id="fp-paydate">\u2014</b></li>
      <li><span>\u6700\u957F\u80FD\u514D\u606F\u591A\u5C11\u5929</span><b id="fp-max">\u2014</b></li>
      <li><span>\u6700\u4F18\u5237\u5361\u65E5</span><b id="fp-best">\u2014</b></li>
      <li><span>\u4ECA\u5929\u5237\u6BD4\u6700\u4F18\u5DEE\u591A\u5C11\u5929</span><b id="fp-lost">\u2014</b></li>
      <li><span>\u8FD9\u7B14\u94B1\u5982\u679C\u6309\u5206\u671F\u771F\u5B9E\u6210\u672C\uFF08\u5E74\u5316 13.8%\uFF09</span><b id="fp-cost">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u6D88\u8D39\u65E5</th><th>\u7B97\u8FDB\u8D26\u5355</th><th>\u6700\u665A\u8FD8\u6B3E</th><th>\u514D\u606F\u5929\u6570</th></tr></thead>
        <tbody id="fp-body"></tbody>
      </table>
    </div>
    <p class="hint" id="fp-note"></p>
  </div>
    </div>
  </section>
`,ev:`  <section class="panel" id="panel-ev">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f"><span>\u4E00\u5E74\u5F00\u591A\u5C11\u516C\u91CC</span>
      <input id="ev-km" type="number" inputmode="decimal" min="0" step="1000" value="15000"></label>
    <label class="f"><span>\u6CB9\u8F66\u767E\u516C\u91CC\u6CB9\u8017\uFF08L\uFF09</span>
      <input id="ev-oil" type="number" inputmode="decimal" min="0" step="0.5" value="8"></label>
    <label class="f"><span>\u6CB9\u4EF7\uFF08\u5143/L\uFF09</span>
      <input id="ev-price" type="number" inputmode="decimal" min="0" step="0.1" value="8"></label>
    <label class="f"><span>\u7535\u8F66\u767E\u516C\u91CC\u7535\u8017\uFF08\u5EA6\uFF09</span>
      <input id="ev-kwh" type="number" inputmode="decimal" min="0" step="0.5" value="15"></label>
    <label class="f"><span>\u7535\u4EF7\uFF08\u5143/\u5EA6\uFF0C\u5BB6\u5145\u7EA6 0.6\u3001\u516C\u5145\u7EA6 1.5\uFF09</span>
      <input id="ev-eprice" type="number" inputmode="decimal" min="0" step="0.1" value="0.6"></label>
    <label class="f"><span>\u6CB9\u8F66\u843D\u5730\u4EF7 / \u7535\u8F66\u843D\u5730\u4EF7\uFF08\u5143\uFF09</span>
      <div class="row">
        <input id="ev-p1" type="number" inputmode="decimal" min="0" step="5000" value="150000">
        <input id="ev-p2" type="number" inputmode="decimal" min="0" step="5000" value="180000">
      </div></label>
    <label class="f"><span>\u5F00\u51E0\u5E74 / \u6B8B\u503C\u7387\uFF08%\uFF09</span>
      <div class="row">
        <input id="ev-years" type="number" inputmode="decimal" min="1" max="20" step="1" value="8">
        <input id="ev-res1" type="number" inputmode="decimal" min="0" max="100" step="5" value="30">
        <input id="ev-res2" type="number" inputmode="decimal" min="0" max="100" step="5" value="25">
      </div></label>
    <label class="f"><span>\u6BCF\u5E74\u4FDD\u517B\uFF08\u6CB9/\u7535\uFF0C\u5143\uFF09</span>
      <div class="row">
        <input id="ev-m1" type="number" inputmode="decimal" min="0" step="200" value="2000">
        <input id="ev-m2" type="number" inputmode="decimal" min="0" step="200" value="800">
      </div></label>
    <label class="f"><span>\u6BCF\u5E74\u4FDD\u9669\uFF08\u6CB9/\u7535\uFF0C\u5143\uFF09</span>
      <div class="row">
        <input id="ev-i1" type="number" inputmode="decimal" min="0" step="500" value="4000">
        <input id="ev-i2" type="number" inputmode="decimal" min="0" step="500" value="5500">
      </div></label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u7535\u8F66\u5F00\u6EE1\u671F\u6BD4\u6CB9\u8F66\u7701</span><strong id="ev-diff">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u6BCF\u5E74\u6CB9\u8D39 / \u7535\u8D39</span><b id="ev-energy">\u2014</b></li>
      <li><span>\u6BCF\u5E74\u7528\u8F66\u603B\u6210\u672C\uFF08\u6CB9 / \u7535\uFF09</span><b id="ev-year">\u2014</b></li>
      <li><span>\u6BCF\u516C\u91CC\uFF08\u6CB9 / \u7535\uFF09</span><b id="ev-perkm">\u2014</b></li>
      <li><span>\u5F00\u6EE1\u671F\u603B\u6210\u672C\uFF08\u6CB9\uFF09</span><b id="ev-t1">\u2014</b></li>
      <li><span>\u5F00\u6EE1\u671F\u603B\u6210\u672C\uFF08\u7535\uFF09</span><b id="ev-t2">\u2014</b></li>
      <li><span>\u4E34\u754C\u5E74\u91CC\u7A0B\uFF08\u4F4E\u4E8E\u5B83\u6CB9\u8F66\u66F4\u7701\uFF09</span><b id="ev-crit">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u4E00\u5E74\u5F00</th><th>\u6CB9\u8F66\u603B\u6210\u672C</th><th>\u7535\u8F66\u603B\u6210\u672C</th><th>\u8C01\u7701</th></tr></thead>
        <tbody id="ev-body"></tbody>
      </table>
    </div>
    <p class="hint" id="ev-note"></p>
  </div>
    </div>
  </section>
`};export default{installment:nn,deal:an,card:en,fx:tn,split:ln,multi:sn,car:pn,debtfree:dn,debtmerge:on,freeperiod:rn,ev:cn};
