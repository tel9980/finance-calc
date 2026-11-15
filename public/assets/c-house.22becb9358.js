var $=Object.defineProperty;var _=(a,s)=>$(a,"name",{value:s,configurable:!0});const{$:n,BACKUP_KEY:rn,BUILD_TAG:dn,CAT_KEY:on,CAT_LABEL:bn,CHUNK_FILES:cn,CHUNK_OF:un,CMP_KEY:mn,CORE_CALC:vn,CURS:hn,DEFERRED_TAPS:fn,DEMO_SAVED:yn,DIVISOR:xn,EDITED:gn,ERR_BOX:Cn,FAV_KEY:Mn,FIELDS:wn,FIRST_ACTIVATE:En,FREQ:Tn,FREQ_KEY:Sn,INSTALL_HIDE_KEY:_n,KEY:An,LAST_KEY:Rn,MONTH_CATS:Wn,MONTH_TABLE:kn,NEXT_OF:Pn,PALETTE_EL:Fn,PENDING_PARAMS:Nn,PRE_KEY:Ln,QUOTA_WARNED:Dn,RECENT_KEY:In,SAVE_TIMER:Kn,SCHEMA_KEY:Yn,SCHEMA_VERSION:On,SEARCH_KEY:Hn,SNAP_DROP_SEEN:Bn,SNAP_KEY:Un,SNAP_MAX:Vn,SNAP_PICK:Gn,STORED:Qn,TABS:Xn,TAB_NATURAL:jn,THEME_KEY:qn,TOAST_EL:Jn,TODAYBAR_KEY:zn,UNITS:$n,WF_ARCH_KEY:Zn,WF_AUTO_IDX:na,WF_AUTO_LIST:aa,WF_AUTO_STEP:ea,WF_AUTO_TIMER:ta,WF_CUSTNAME_KEY:sa,WF_CUST_KEY:la,WF_CUST_NAME:ia,WF_DONE:pa,WF_EDIT:ra,WF_EDIT_KEY:da,WF_KEY:oa,WF_LAST:ba,WF_LEGACY:ca,WF_MAN_KEY:ua,WF_MD:ma,WF_MD_FIELDS:va,WF_MD_KEY:ha,WF_MD_LINKS:fa,WF_META_KEY:ya,WF_MONTH_KEY:xa,WF_NOTE_KEY:ga,WF_NOTIFIED_KEY:Ca,WF_NOTIFY_KEY:Ma,WF_PATHS:wa,WF_ROLE_KEY:Ea,WF_ROLE_READY:Ta,WF_SKIP_KEY:Sa,WF_TASK_KEY:_a,WF_TEMPLATES:Aa,XL_ROWS:Ra,YEAR_TABLE:Wa,_onPanels:ka,a11yTouch:Pa,activate:Fa,addMonths:Na,annuityPV:La,annuityPayment:j,applyFilter:Da,applyParams:Ia,applyStoredTo:Ka,applyWfTpl:Ya,backupAgeDays:Oa,bindWfDnd:Ha,bindWfInline:Ba,bizAdd:Ua,bonusSoloTax:Va,buildLoanSchedule:Ga,buildShare:Qa,buildTabBadges:Xa,bumpFreq:ja,calcLoan:qa,calcMap:Ja,calcWorkflow:za,clearWfMan:$a,closePalette:Za,cmpTabName:ne,cnUpper:ae,combineTax:ee,convertTemp:te,copyText:se,cumulativeTax:le,curCat:ie,currentSnap:pe,demoFill:re,demoHint:de,diagText:oe,dlJson:be,doInstall:ce,doPrint:ue,drawMonthCats:me,drawMonthStack:ve,drawReportCharts:he,drawRpMini:fe,drawnMonthlyChart:ye,drawnYearChart:xe,enhanceNums:ge,enhancePanelUi:Ce,ensureChunk:Me,evalExpr:we,favList:Ee,fillCmpMod:Te,fillMonthGrid:Se,fillUnits:_e,flash:Ae,flushParams:Re,flushSave:We,fmt:K,fmtAt:ke,fmtDate:Pe,fx:Fe,gauss:Ne,getWfCust:Le,getWfDone:De,getWfMan:Ie,getWfMeta:Ke,getWfNotes:Ye,getWfSkip:Oe,hashTarget:He,installEvt:Be,installHintHide:Ue,installHintOff:Ve,iosInstallTip:Ge,iosLike:Qe,isFav:Xe,lastName:je,leftAfter:qe,linkTo:T,loadCmpA:Je,loadSnaps:ze,loadWfArch:$e,loadWfCust:Ze,loadWfDone:nt,loadWfEdit:at,loadWfMan:et,loadWfMeta:tt,loadWfNotes:st,loadWfSkip:lt,loadWfTask:it,loanRows:pt,makeSnap:rt,markBackup:dt,markBadInputs:ot,matchQ:bt,money:e,monthToDate:ct,monthlyIRR:ut,months:mt,npvDiff:vt,num:t,numBlur:ht,numFocus:ft,numInput:yt,numKey:xt,numOf:gt,openPalette:Ct,orderTabsForQuery:Mt,palKey:wt,panelEls:Et,panelParams:Tt,parseAmounts:St,parseDate:_t,parseNum:At,pct:i,percentile:Rt,plRank:Wt,plScoreCov:kt,plScoreDsr:Pt,plScoreEmg:Ft,plScoreLev:Nt,plScoreSave:Lt,prePanels:Dt,prefetchAllChunks:It,presets:Kt,printCover:Yt,pushRecent:Ot,pushSearch:Ht,pwaStandalone:Bt,quickOf:Ut,rateOf:Vt,readJsonFile:Gt,readMonthGrid:Qt,recentList:Xt,recordWf:jt,refreshCounts:qt,refreshTableTools:Jt,refreshTrackMods:zt,refreshWfBadge:$t,renderLoanTable:Zt,renderNext:ns,renderPalette:as,renderPresets:es,renderSearchHist:ts,renderSnapCompare:ss,renderSnapList:ls,renderTodayBar:is,renderTrack:ps,renderWfTpl:rs,rentBuyAt:q,restore:ds,runCalc:os,runDeferredTaps:bs,save:cs,saveCmpA:us,saveFav:ms,savePresets:vs,saveSnaps:hs,saveWfCust:fs,savedCat:ys,schemaInit:xs,schemaMigrate:gs,scrollResultIfDeepLink:Cs,searchHist:Ms,setCat:ws,setSub:Es,setTheme:Ts,shareCalc:Ss,sharePayload:_s,showErrorBox:As,showInstBar:Rs,showUpdateBar:Ws,snapNameOf:ks,snapTipText:Ps,snapshot:Fs,st0:Ns,stamp:Ls,startName:Ds,syncInstallUi:Is,tabCatLabel:Ks,tabScore:Ys,tap:Os,taxBy:Hs,toast:Bs,toggleWfStep:Us,trimNum:Vs,unitFor:Gs,updShown:Qs,wfAllPaths:Xs,wfArchiveMonth:js,wfArchivePut:qs,wfAutoNext:Js,wfAutoStop:zs,wfAutoWalk:$s,wfBar:Zs,wfBindCustQ:nl,wfBuildHandoff:al,wfCarryMissing:el,wfCarryQuery:tl,wfCarryWarn:sl,wfCsvCell:ll,wfCustNameSave:il,wfDayDiff:pl,wfDetailRender:rl,wfEditPath:dl,wfEditReset:ol,wfEditSave:bl,wfEditToggle:cl,wfFillCustSel:ul,wfHandoff:ml,wfHandoffCopy:vl,wfHandoffCsv:hl,wfHandoffPrint:fl,wfHasAnyData:yl,wfHideStep:xl,wfKnownMods:gl,wfLegacyToNew:Cl,wfLoad:Ml,wfManSave:wl,wfMdHref:El,wfMdRender:Tl,wfMdSave:Sl,wfMetaSave:_l,wfMigrateLegacy:Al,wfMonthKey:Rl,wfMonthRoll:Wl,wfMonthTouch:kl,wfMoveStep:Pl,wfNoteSave:Fl,wfNotifyCheck:Nl,wfNotifyGranted:Ll,wfNotifyPref:Dl,wfNotifySend:Il,wfNotifySetPref:Kl,wfNotifyStatus:Yl,wfNotifyToggle:Ol,wfOpenInline:Hl,wfOpenTasks:Bl,wfPad2:Ul,wfPathMods:Vl,wfPlaceInline:Gl,wfPlaceNear:Ql,wfProgress:Xl,wfRenderSummary:jl,wfRoleSaved:ql,wfScopedPaths:Jl,wfSet:zl,wfSkipCurrent:$l,wfSkipSave:Zl,wfStepKey:ni,wfStepShare:ai,wfStepState:ei,wfTaskAdd:ti,wfTaskBox:si,wfTaskDel:li,wfTaskPending:ii,wfTaskSave:pi,wfTaskToggle:ri,wfTodayPick:di,wfTodayStr:oi,wfUnhideStep:bi,wfVisiblePaths:ci,yuan:l,zOf:ui}=window.FC;function Z(){var a=t(n("rb-price")),s=Math.max(1,t(n("rb-hold"))),o=t(n("rb-growth"))/100;if(a<=0){["rb-diff","rb-buy-net","rb-rent-net","rb-loan","rb-monthly","rb-house","rb-breakeven"].forEach(function(x){n(x).textContent="\u2014"}),n("rb-note").textContent="\u586B\u623F\u4EF7\u540E\u81EA\u52A8\u6BD4\u8F83\u3002";return}var b=q(o),m=b.buyNet-b.rentNet;n("rb-diff-label").textContent=K(s,0)+" \u5E74\u540E\uFF1A\u4E70\u623F\u6BD4\u79DF\u623F"+(m>=0?"\u591A":"\u5C11"),n("rb-diff").textContent=e(Math.abs(m)),n("rb-buy-net").textContent=l(b.buyNet),n("rb-rent-net").textContent=l(b.rentNet),n("rb-loan").textContent=e(b.down)+" / "+e(b.loan)+" \u5143",n("rb-monthly").textContent=e(b.pay)+" / "+e(t(n("rb-rent")))+" / "+e(b.pay+t(n("rb-cost"))/12-t(n("rb-rent")))+" \u5143",n("rb-house").textContent=l(b.houseValue);for(var c=-.3,d=.3,f,p=0;p<80;p++)f=(c+d)/2,q(f).buyNet-q(f).rentNet<0?c=f:d=f;n("rb-breakeven").textContent=i((c+d)/2);var u="\u53E3\u5F84\uFF1A\u4E70\u623F\u671F\u672B\u51C0\u8D44\u4EA7 = \u671F\u672B\u623F\u4EF7 \u2212 \u5269\u4F59\u8D37\u6B3E\uFF1B\u79DF\u623F\u671F\u672B\u8D44\u4EA7 = \u9996\u4ED8\u6309\u7406\u8D22\u5E74\u5316\u6EDA "+K(s,0)+" \u5E74 + \u6BCF\u6708(\u6708\u4F9B+\u6301\u6709\u6210\u672C\u2212\u79DF\u91D1)\u7684\u5DEE\u989D\u540C\u6837\u62FF\u53BB\u7406\u8D22\u3002\u4E24\u8FB9\u90FD\u4E0D\u7B97\u5951\u7A0E\u3001\u4E2D\u4ECB\u8D39\u3001\u88C5\u4FEE\u548C\u5356\u623F\u7A0E\u8D39\uFF0C\u6240\u4EE5\u771F\u5B9E\u7ED3\u8BBA\u901A\u5E38\u6BD4\u8FD9\u91CC\u66F4\u504F\u5411\u79DF\u623F\u4E00\u70B9\u3002";u+=m>=0?" \u5F53\u524D\u5047\u8BBE\u4E0B\u4E70\u623F\u66F4\u5212\u7B97\uFF0C\u4E3B\u8981\u770B\u623F\u4EF7\u6DA8\u5E45\u80FD\u4E0D\u80FD\u6491\u4F4F\uFF1A\u623F\u4EF7\u5E74\u6DA8\u5E45\u4F4E\u4E8E "+i((c+d)/2)+" \u65F6\u7ED3\u8BBA\u4F1A\u7FFB\u8F6C\u3002":" \u5F53\u524D\u5047\u8BBE\u4E0B\u79DF\u623F\u66F4\u5212\u7B97\uFF1A\u9996\u4ED8\u548C\u6708\u4F9B\u5DEE\u989D\u62FF\u53BB\u7406\u8D22\u7684\u94B1\uFF0C\u6BD4\u623F\u5B50\u5347\u503C\u52A0\u4E0A\u7701\u4E0B\u7684\u79DF\u91D1\u66F4\u591A\u3002\u628A\u300C\u623F\u4EF7\u5E74\u6DA8\u5E45\u300D\u8C03\u5230 "+i((c+d)/2)+" \u4EE5\u4E0A\u624D\u53CD\u8D85\u3002",n("rb-note").textContent=u,n("rb-links")&&(n("rb-links").innerHTML="\u63A5\u7740\u7B97\uFF1A"+T("housecash",{"hcx-price":a},"\u7B7E\u5B57\u5F53\u5929\u8981\u5907\u591A\u5C11\u73B0\u91D1")+T("rentyield",{"ry-price":a,"ry-rent":t(n("rb-rent"))},"\u4ECE\u623F\u4E1C\u89C6\u89D2\u770B\u79DF\u552E\u6BD4")+T("deed",{"dd-price":a},"\u4E8C\u624B\u623F\u7A0E\u8D39\u591A\u5C11")+T("budget",{"bg-cash":t(n("rb-price"))*t(n("rb-down"))/100},"\u8FD9\u4E2A\u9996\u4ED8\u80FD\u6491\u591A\u8D35\u7684\u623F"))}_(Z,"calcRentBuy");function nn(){var a=Math.max(0,t(n("dd-price"),0)),s=Math.max(0,t(n("dd-deed"),1))/100,o=n("dd-hold").value,b=Math.max(0,t(n("dd-vat"),5.3))/100,m=n("dd-income-tax").value,c=Math.max(0,t(n("dd-agent"),2))/100,d=Math.max(0,t(n("dd-other"),0)),f=Math.max(0,t(n("dd-cost"),0)),p=a*s,u=a*c,x=o==="0"?a*b:0,M=Math.max(0,a-f),g=m==="0"?0:m==="20"?M*.2:a*.01,r=p+u+x+g+d,y=a+p+u+d;n("dd-deed-amt").textContent=l(p),n("dd-agent-amt").textContent=l(u),n("dd-vat-amt").textContent=x>0?l(x):"\u514D\u5F81",n("dd-it-amt").textContent=m==="0"?"\u514D\u5F81":l(g)+(m==="20"?"\uFF08\u5DEE\u989D "+e(M)+" \xD7 20%\uFF09":"\uFF08\u6210\u4EA4\u4EF7 \xD7 1%\uFF09"),n("dd-other-amt").textContent=l(d),n("dd-total").textContent=e(r),n("dd-buyer").textContent=l(y),n("dd-ratio").textContent=a>0?i(r/a,2):"\u2014";var v=n("dd-first").value,h=t(n("dd-area"),0),C=v==="1"?h>0&&h<=90?"1%\uFF08\u9996\u5957 90\u33A1 \u53CA\u4EE5\u4E0B\uFF09":"1.5%\uFF08\u9996\u5957 90\u33A1 \u4EE5\u4E0A\uFF09":v==="2"?"1%\u20132%\uFF08\u4E8C\u5957\uFF0C\u5404\u5730\u4E0D\u540C\uFF09":"3% \u8D77\uFF08\u4E09\u5957\u53CA\u4EE5\u4E0A\uFF09";n("dd-note").textContent="\u6309\u4F60\u586B\u7684\u300C\u7B2C "+v+" \u5957 / "+(h>0?h+"\u33A1":"\u9762\u79EF\u672A\u586B")+"\u300D\uFF0C\u5951\u7A0E\u5E38\u89C1\u7A0E\u7387\u662F "+C+"\uFF0C\u5F53\u524D\u6309 "+i(s,2)+" \u8BA1\u7B97\u3002\u7A0E\u8D39\u662F\u300C\u8C01\u540D\u4E0B\u3001\u7B2C\u51E0\u5957\u3001\u9762\u79EF\u591A\u5927\u3001\u6301\u6709\u51E0\u5E74\u300D\u56DB\u4E2A\u53D8\u91CF\u4E00\u8D77\u51B3\u5B9A\u7684\uFF0C\u8FD9\u91CC\u6309\u6700\u5E38\u89C1\u7684\u89C4\u5219\u4F30\u7B97\uFF1A\u5951\u7A0E\u7531\u4E70\u65B9\u4EA4\uFF08\u7A0E\u7387\u81EA\u5DF1\u586B\uFF0C\u9996\u5957 90\u33A1 \u53CA\u4EE5\u4E0B\u591A\u4E3A 1%\u300190\u33A1 \u4EE5\u4E0A 1.5%\uFF0C\u4E8C\u5957\u5404\u5730 1%\u20132%\uFF0C\u4E09\u5957\u8D77\u5E38\u6309 3%\uFF09\uFF1B\u589E\u503C\u7A0E\u53CA\u9644\u52A0\u5728\u6301\u6709\u6EE1 2 \u5E74\u65F6\u514D\u5F81\uFF08\u5317\u4E0A\u5E7F\u6DF1\u975E\u666E\u901A\u4F4F\u5B85\u53E6\u6709\u89C4\u5B9A\uFF09\uFF0C\u4E0D\u6EE1 2 \u5E74\u6309\u5168\u989D\u7EA6 5.3% \u8BA1\uFF1B\u4E2A\u7A0E\u300C\u6EE1\u4E94\u552F\u4E00\u300D\u514D\u5F81\uFF0C\u5426\u5219\u6309\u6838\u5B9A 1% \u6216\u5DEE\u989D 20% \u8BA1\uFF08\u80FD\u63D0\u4F9B\u539F\u503C\u51ED\u8BC1\u624D\u53EF\u8D70\u5DEE\u989D\uFF09\u3002\u4E2D\u4ECB\u8D39\u4E00\u822C\u7531\u4E70\u65B9\u627F\u62C5\uFF08\u53EF\u8C08\uFF09\uFF0C\u5176\u4ED6\u6742\u8D39\u542B\u8BC4\u4F30\u3001\u767B\u8BB0\u3001\u516C\u8BC1\u3001\u8D37\u6B3E\u670D\u52A1\u8D39\u7B49\u3002\u5B9E\u9645\u4EE5\u5F53\u5730\u7A0E\u52A1\u6838\u5B9A\u4E3A\u51C6\uFF0C\u7B7E\u7EA6\u524D\u8BA9\u4E2D\u4ECB\u51FA\u4E00\u4EFD\u7A0E\u8D39\u6E05\u5355\u3002"}_(nn,"calcDeed");function an(){var a=Math.max(0,t(n("sv-price"),0)),s=Math.max(0,t(n("sv-loan"),0)),o=Math.max(0,t(n("sv-vat"),0))/100,b=Math.max(0,t(n("sv-it"),0))/100,m=Math.max(0,t(n("sv-agent"),0))/100,c=Math.max(0,t(n("sv-other"),0))/100,d=Math.max(0,t(n("sv-new"),0)),f=Math.min(100,Math.max(0,t(n("sv-down"),30)))/100,p=Math.max(0,t(n("sv-rate"),0))/100,u=Math.max(1,Math.min(40,Math.round(t(n("sv-years"),30)))),x=a*o,M=a*b,g=a*m,r=a*c,y=x+M+g+r,v=a-s-y,h=d*f,C=h-v,w=Math.max(0,d-h),E=j(w,p/12,u*12);n("sv-net").textContent=e(v),n("sv-tax").textContent=l(y),n("sv-vat-amt").textContent=l(x),n("sv-it-amt").textContent=l(M),n("sv-agent-amt").textContent=l(g),n("sv-other-amt").textContent=l(r),n("sv-tax-ratio").textContent=a>0?i(y/a,2):"\u2014",n("sv-dpay").textContent=l(h),n("sv-gap").textContent=C>0?"\u8FD8\u5DEE "+e(C)+" \u5143":"\u7ED3\u4F59 "+e(-C)+" \u5143",n("sv-nloan").textContent=l(w),n("sv-mpay").textContent=w>0?l(E)+" / \u6708\uFF08"+u*12+" \u671F\uFF09":"\u5168\u6B3E\uFF0C\u65E0\u6708\u4F9B",n("sv-note").textContent="\u5356\u623F\u5230\u624B = \u6210\u4EA4\u4EF7 "+e(a)+" \u2212 \u5269\u4F59\u8D37\u6B3E "+e(s)+"\uFF08\u5FC5\u987B\u5148\u8FD8\u6E05\u89E3\u62BC\uFF09\u2212 \u5356\u65B9\u7A0E\u8D39 "+e(y)+" = "+e(v)+"\u3002 \u6362\u65B0\u623F\u9996\u4ED8 "+e(h)+"\uFF0C"+(C>0?"\u51C0\u989D\u4E0D\u591F\uFF0C\u8FD8\u9700\u518D\u7B79 "+e(C)+" \u5143":"\u51C0\u989D\u8FD8\u6709 "+e(-C)+" \u5143\u7ED3\u4F59\uFF0C\u53EF\u8865\u8D34\u7A0E\u8D39\u6216\u88C5\u4FEE")+"\uFF1B\u65B0\u8D37 "+e(w)+"\u3001\u6309 "+i(p,2)+" \u8D37 "+u+" \u5E74\uFF0C\u6708\u4F9B "+e(E)+"\u3002 \u5B9E\u64CD\u6CE8\u610F\uFF1A\u5148\u5356\u540E\u4E70\u8981\u5B89\u6392\u597D\u8FC7\u6E21\u4F4F\u5904\uFF0C\u5148\u4E70\u540E\u5356\u5219\u8981\u770B\u9996\u5957/\u4E8C\u5957\u8BA4\u5B9A\uFF08\u591A\u5730\u300C\u8BA4\u623F\u53C8\u8BA4\u8D37\u300D\uFF0C\u65E7\u623F\u672A\u8FC7\u6237\u53EF\u80FD\u88AB\u7B97\u4E8C\u5957\uFF0C\u9996\u4ED8\u6BD4\u4F8B\u548C\u5229\u7387\u90FD\u4F1A\u4E0A\u53BB\uFF09\uFF1B\u65B0\u623F\u8FD8\u6709\u5951\u7A0E\u3001\u7EF4\u4FEE\u57FA\u91D1\u3001\u88C5\u4FEE\u7B49\u4E00\u6B21\u6027\u652F\u51FA\uFF0C\u522B\u5FD8\u4E86\u5728\u7ED3\u4F59\u91CC\u6263\u6389\u3002"}_(an,"calcSell");function en(){for(var a=Math.max(0,t(n("ry-price"),0)),s=Math.max(0,t(n("ry-rent"),0)),o=Math.min(100,Math.max(0,t(n("ry-down"),30)))/100,b=Math.max(0,t(n("ry-rate"),0))/100,m=Math.max(1,Math.min(40,Math.round(t(n("ry-years"),30)))),c=Math.max(1,Math.min(40,Math.round(t(n("ry-hold"),10)))),d=t(n("ry-growth"),0)/100,f=t(n("ry-rgrowth"),0)/100,p=Math.max(0,t(n("ry-cost"),0)),u=Math.min(60,Math.max(0,t(n("ry-vac"),0)))/100,x=a*(1-o),M=b/12,g=m*12,r=j(x,M,g),y=s*12*(1-u),v=a>0?s*12/a:0,h=a>0?y/a:0,C=a>0?(y-p)/a:0,w=c*12,E=[-a*o],S=x,B=0,Y=a*o,F=0,O=0,W=1;W<=w;W++){var U=S*M,V=Math.min(S,r-U);S-=V;var H=s*Math.pow(1+f,Math.floor((W-1)/12)),k=H*(1-u)-r-p/12;B+=H*(1-u),k<0&&(Y+=-k),W===w&&(O=S,F=a*Math.pow(1+d,c)-S,k+=F),E.push(k)}for(var N=_(function(P){for(var J=0,z=1,X=0;X<E.length;X++)z*=1+P,J+=E[X]/z;return J},"npv"),L=-.9,D=1,A=0;A<120;A++){var I=(L+D)/2;N(I)>0?L=I:D=I}var R=(L+D)/2,G=(Math.pow(1+R,12)-1)*100;n("ry-irr").textContent=K(G,2),n("ry-ratio").textContent=i(v,2),n("ry-eff").textContent=i(h,2),n("ry-net").textContent=i(C,2),n("ry-pay").textContent=l(r)+" / \u6708",n("ry-cash").textContent=l(s-r-p/12)+" / \u6708",n("ry-price-end").textContent=l(a*Math.pow(1+d,c)),n("ry-loan-end").textContent=l(O),n("ry-rent-sum").textContent=l(B),n("ry-invest").textContent=l(Y),n("ry-exit").textContent=l(F);var Q="\u79DF\u552E\u6BD4 = \u5E74\u79DF\u91D1 "+e(s*12)+" \xF7 \u623F\u4EF7 "+e(a)+" = "+i(v,2)+"\uFF0C\u6263\u6389 "+i(u,0)+" \u7A7A\u7F6E/\u6B20\u79DF\u540E "+i(h,2)+"\uFF0C\u518D\u6263\u5E74\u6301\u6709\u6210\u672C "+e(p)+" \u540E\u53EA\u6709 "+i(C,2)+"\u3002 \u56FD\u9645\u7ECF\u9A8C\u628A 3%\u20135% \u5F53\u5408\u7406\u533A\u95F4\uFF0C1.5%\u20132% \u610F\u5473\u7740\u300C\u9760\u79DF\u91D1\u56DE\u672C\u8981 50 \u5E74\u4EE5\u4E0A\u300D\uFF0C\u8FD9\u79CD\u623F\u5B50\u4E70\u7684\u662F\u6DA8\u4EF7\u9884\u671F\u3001\u4E0D\u662F\u79DF\u91D1\u73B0\u91D1\u6D41\u3002 \u4E0A\u9762\u7684\u5E74\u5316 "+K(G,2)+"% \u662F\u52A0\u6760\u6746\u540E\u7684\u80A1\u4E1C\u56DE\u62A5\uFF08\u9996\u4ED8 "+e(a*o)+"\u3001\u6708\u4F9B "+e(r)+"\u3001\u6301\u6709 "+c+" \u5E74\u6309\u623F\u4EF7\u6BCF\u5E74 "+i(d,1)+"\u3001\u79DF\u91D1\u6BCF\u5E74 "+i(f,1)+" \u5356\u51FA\uFF09\uFF0C"+(s-r-p/12<0?"\u5E76\u4E14\u5DF2\u7ECF\u7B97\u8FDB\u6BCF\u6708\u8FD8\u8981\u81EA\u5DF1\u518D\u638F "+e(r+p/12-s)+" \u5143\u7684\u8D1F\u73B0\u91D1\u6D41\u3002":"\u5E76\u4E14\u5DF2\u7ECF\u7B97\u8FDB\u6BCF\u6708\u51C0\u6536 "+e(s-r-p/12)+" \u5143\u7684\u6B63\u73B0\u91D1\u6D41\u3002")+" \u6CA1\u7B97\u5951\u7A0E/\u4E2D\u4ECB/\u88C5\u4FEE/\u5356\u623F\u7A0E\u8D39\u548C\u7A7A\u7F6E\u671F\u7684\u7269\u4E1A\u8D39\uFF1B\u623F\u4EF7\u6DA8\u5E45\u662F\u6700\u5927\u7684\u53D8\u91CF\u2014\u2014\u628A\u5E74\u6DA8\u5E45\u8C03\u5230 0% \u518D\u770B\u8FD9\u4E2A\u6570\uFF0C\u5C31\u77E5\u9053\u79DF\u91D1\u80FD\u4E0D\u80FD\u5355\u72EC\u6491\u8D77\u8FD9\u7B14\u6295\u8D44\u3002";n("ry-note").textContent=Q,n("ry-links")&&(n("ry-links").innerHTML="\u63A5\u7740\u7B97\uFF1A"+T("rentbuy",{"rb-price":a,"rb-rent":s},"\u6362\u6210\u79DF\u5BA2\u89C6\u89D2\u6BD4\u4E00\u6BD4")+T("housecash",{"hcx-price":a},"\u8FD9\u5957\u623F\u7B7E\u5B57\u8981\u5907\u591A\u5C11\u73B0\u91D1")+T("rentup",{"ru-cur":s},"\u6DA8\u79DF\u591A\u5C11\u503C\u5F97\u642C\u5BB6"))}_(en,"calcRentYield");function tn(){var a=Math.max(0,t(n("bg-income"),0)),s=Math.max(0,t(n("bg-cash"),0)),o=Math.min(95,Math.max(0,t(n("bg-down"),30)))/100,b=Math.max(0,t(n("bg-rate"),0))/100,m=Math.max(1,Math.min(40,t(n("bg-years"),30))),c=Math.min(80,Math.max(5,t(n("bg-ratio"),40)))/100,d=Math.max(0,t(n("bg-fee"),5))/100,f=Math.round(m*12),p=b/12,u=a*c,x=Math.pow(1+p,f),M=p===0?u*f:u*(1-1/x)/p,g=o<1?M/(1-o):0,r=o+d>0?s/(o+d):0,y=Math.min(g,r),v=y*(1-o),h=y*o,C=y*d,w=j(v,p,f),E=a>0?w/a:0;if(n("bg-total").textContent=e(y),n("bg-paycap").textContent=l(u)+"\uFF08\u6536\u5165 "+i(c,0)+"\uFF09",n("bg-loancap").textContent=l(M),n("bg-byPay").textContent=l(g),n("bg-byCash").textContent=l(r),n("bg-bottle").textContent=r<=g?"\u73B0\u91D1\uFF08\u51D1\u9996\u4ED8\uFF0B\u7A0E\u8D39\uFF09":"\u6708\u4F9B\uFF08\u6536\u5165\u4E0D\u591F\u6491\uFF09",n("bg-downamt").textContent=l(h)+"\uFF08"+i(o,0)+"\uFF09",n("bg-feeamt").textContent=l(C)+"\uFF08"+i(d,1)+"\uFF09",n("bg-loan").textContent=l(v)+" / "+l(w),n("bg-share").textContent=i(E,1),n("bg-int").textContent=l(w*f-v),a<=0||s<=0){n("bg-note").textContent="\u5148\u628A\u5BB6\u5EAD\u6708\u6536\u5165\u548C\u53EF\u52A8\u7528\u7684\u73B0\u91D1\u586B\u4E0A\uFF0C\u518D\u770B\u80FD\u627F\u53D7\u591A\u8D35\u7684\u623F\u5B50\u3002";return}var S="\u4E24\u4E2A\u7EA6\u675F\u540C\u65F6\u5B58\u5728\uFF0C\u8C01\u5148\u9876\u4F4F\u8C01\u8BF4\u4E86\u7B97\uFF1A\u6309\u6536\u5165\uFF0C"+i(c,0)+" \u7684\u6708\u4F9B\u4E0A\u9650\u662F "+e(u)+" \u5143/\u6708\uFF0C\u5728 "+K(b*100,2)+"%\u3001"+m+" \u5E74\u4E0B\u6700\u591A\u8D37 "+e(M)+" \u5143\uFF0C\u53CD\u63A8\u603B\u4EF7\u4E0A\u9650 "+e(g)+" \u5143\uFF1B\u6309\u73B0\u91D1\uFF0C\u6263\u6389 "+i(o,0)+" \u9996\u4ED8\u548C "+i(d,1)+" \u7A0E\u8D39\u88C5\u4FEE\uFF0C\u603B\u4EF7\u4E0A\u9650 "+e(r)+" \u5143\u3002 \u53D6\u5C0F\u7684\u90A3\u4E2A\uFF0C\u4F60\u80FD\u627F\u53D7\u7684\u603B\u4EF7\u662F "+e(y)+" \u5143\uFF0C\u5361\u5728\u300C"+(r<=g?"\u73B0\u91D1":"\u6708\u4F9B")+"\u300D\u8FD9\u4E00\u8FB9\u3002"+(r<=g?" \u4E5F\u5C31\u662F\u8BF4\uFF0C\u4F60\u7684\u6536\u5165\u5176\u5B9E\u8FD8\u80FD\u6491\u66F4\u8D35\u7684\u623F\u5B50\uFF0C\u662F\u9996\u4ED8\u548C\u7A0E\u8D39\u7684\u73B0\u91D1\u4E0D\u591F\u3002":" \u4E5F\u5C31\u662F\u8BF4\uFF0C\u4F60\u7684\u73B0\u91D1\u591F\uFF0C\u662F\u6536\u5165\u6491\u4E0D\u8D77\u66F4\u9AD8\u7684\u6708\u4F9B\u2014\u2014\u8FD9\u6761\u66F4\u8BE5\u5C0A\u91CD\uFF0C\u522B\u4E3A\u4E86\u4E70\u5927\u623F\u628A\u6708\u4F9B\u9876\u5230\u6536\u5165\u7684 50% \u4EE5\u4E0A\u3002")+" \u8FD8\u6709\u4E09\u7B14\u94B1\u5FC5\u987B\u63D0\u524D\u7559\u5728\u624B\u91CC\uFF0C\u5426\u5219\u4F1A\u975E\u5E38\u88AB\u52A8\uFF1A\u2460 \u5951\u7A0E\u3001\u589E\u503C\u7A0E\u3001\u4E2D\u4ECB\u8D39\u3001\u7EF4\u4FEE\u57FA\u91D1\uFF08\u4E8C\u624B\u623F\u8FD8\u6709\u5356\u65B9\u7A0E\u8D39\u7684\u8C08\u5224\u7A7A\u95F4\uFF09\uFF1B \u2461 \u88C5\u4FEE\u4E0E\u5BB6\u7535\uFF0C\u901A\u5E38\u5360\u623F\u4EF7 8%\u201315%\uFF0C\u4E8C\u624B\u623F\u66F4\u9AD8\uFF1B\u2462 \u81F3\u5C11 6 \u4E2A\u6708\u6708\u4F9B\u7684\u5E94\u6025\u91D1\uFF0C \u56E0\u4E3A\u4EA4\u623F\u540E\u6700\u8106\u5F31\u7684\u65F6\u523B\u5C31\u662F\u300C\u9996\u4ED8\u638F\u7A7A\uFF0B\u88C5\u4FEE\u8D85\u652F\u300D\u7684\u90A3\u534A\u5E74\u3002 \u53E6\u5916\u63D0\u9192\uFF1A\u6708\u4F9B\u5360\u6BD4 40% \u5DF2\u7ECF\u504F\u7D27\uFF0C30% \u4EE5\u5185\u624D\u53EB\u8212\u670D\uFF08\u94F6\u884C\u5BA1\u6279\u5E38\u6309 50% \u6D41\u6C34\uFF0C\u4F46\u90A3\u662F\u5B83\u7684\u98CE\u63A7\u7EBF\uFF0C\u4E0D\u662F\u4F60\u7684\u751F\u6D3B\u7EBF\uFF09\uFF1B \u5982\u679C\u53EA\u80FD\u9760\u300C30 \u5E74 + \u9876\u683C\u6708\u4F9B\u300D\u624D\u4E70\u5F97\u8D77\uFF0C\u8BF4\u660E\u8FD9\u4E2A\u4EF7\u4F4D\u5BF9\u4F60\u7684\u73B0\u91D1\u6D41\u592A\u8584\u4E86\uFF0C\u5148\u79DF\u4E00\u6BB5\u65F6\u95F4\u6216\u8005\u4E70\u5C0F\u4E00\u70B9\uFF0C\u6BD4\u786C\u625B\u66F4\u5212\u7B97\u3002";n("bg-note").textContent=S}_(tn,"calcBudget");function sn(){var a=Math.max(0,t(n("ru-cur"),0)),s=Math.max(0,t(n("ru-new"),0)),o=Math.max(0,t(n("ru-cost"),0)),b=Math.max(0,t(n("ru-alt"),0)),m=Math.max(.5,Math.min(20,t(n("ru-years"),3))),c=Math.max(0,s-a)*12,d=Math.max(0,s-a)*12*m,f=Math.max(0,b-a)*12*m+o,p=d-f,u=s-b,x=u>0?o/u:1/0;n("ru-diff").textContent=(p>=0?"":"-")+e(Math.abs(p)),n("ru-stayyear").textContent=l(c),n("ru-stay").textContent=l(d)+"\uFF08"+m+" \u5E74\uFF09",n("ru-move").textContent=l(f)+"\uFF08"+m+" \u5E74\uFF09",n("ru-breakeven").textContent=u>0?x===1/0?"\u2014":x.toFixed(1)+" \u4E2A\u6708":"\u65B0\u623F\u79DF\u4E0D\u6BD4\u6DA8\u540E\u4FBF\u5B9C\uFF0C\u600E\u4E48\u642C\u90FD\u4E8F",n("ru-line").textContent=a>0?i((s-a)/a,1)+"\uFF08\u6DA8\u5230 "+e(s)+" \u5143\uFF09":"\u2014";var M=n("ru-body");M.innerHTML="";for(var g=[1,2,3,5,8],r=0;r<g.length;r++){var y=g[r],v=Math.max(0,s-a)*12*y,h=Math.max(0,b-a)*12*y+o,C=document.createElement("tr");C.innerHTML="<td>"+y+" \u5E74</td><td>"+e(v)+"</td><td>"+e(h)+"</td><td>"+(v>h?"\u642C\u8D70\u7701 "+e(v-h):"\u7559\u4E0B\u7701 "+e(h-v))+"</td>",M.appendChild(C)}var w="\u623F\u4E1C\u628A\u623F\u79DF\u4ECE "+e(a)+" \u5143\u6DA8\u5230 "+e(s)+" \u5143\uFF08\u6DA8 "+i(a>0?(s-a)/a:0,1)+"\uFF09\uFF0C \u63A5\u53D7\u7684\u8BDD\u6BCF\u5E74\u591A\u4ED8 "+e(c)+" \u5143\u3002\u642C\u5BB6\u5728\u522B\u5904\u79DF "+e(b)+" \u5143\u3001\u4E00\u6B21\u6027\u82B1 "+e(o)+" \u5143\uFF0C \u4E24\u6761\u8DEF\u6BD4\u5230 "+m+" \u5E74\uFF1A\u7559\u4E0B\u591A\u4ED8 "+e(d)+" \u5143\uFF0C\u642C\u8D70\u591A\u4ED8 "+e(f)+" \u5143\uFF0C"+(p>=0?"\u6240\u4EE5\u642C\u8D70\u66F4\u7701 "+e(p)+" \u5143\u3002":"\u6240\u4EE5\u7559\u4E0B\u66F4\u7701 "+e(-p)+" \u5143\uFF0C\u522B\u6298\u817E\u3002");u>0&&(w+=" \u4E34\u754C\u70B9\u662F\u4F4F\u6EE1 "+x.toFixed(1)+" \u4E2A\u6708\uFF1A\u4F4F\u5F97\u6BD4\u8FD9\u66F4\u4E45\uFF0C\u642C\u5BB6\u7684\u56FA\u5B9A\u6210\u672C\u5C31\u644A\u8584\u4E86\uFF1B\u4F4F\u4E0D\u5230\u5C31\u8BE5\u5FCD\u4E0B\u8FD9\u6B21\u6DA8\u4EF7\u3002"),w+=" \u642C\u5BB6\u6210\u672C\u522B\u53EA\u7B97\u529B\u6C14\u94B1\uFF1A\u4E2D\u4ECB\u8D39\u901A\u5E38\u534A\u4E2A\u6708\u5230\u4E00\u4E2A\u6708\u623F\u79DF\u3001\u62BC\u91D1\u53EF\u80FD\u88AB\u6263\u3001\u5BBD\u5E26\u79FB\u673A\u3001\u901A\u52E4\u53D8\u8FDC\u7684\u65F6\u95F4\u548C\u4EA4\u901A\u8D39\u2014\u2014 \u4E00\u7EBF\u57CE\u5E02\u4E00\u6B21\u642C\u5BB6\u771F\u5B9E\u6210\u672C\u5E38\u5728 5,000\u201310,000 \u5143\uFF0C\u5F88\u591A\u4EBA\u4E3A\u4E86\u7701 200 \u5143/\u6708\u642C\u5BB6\uFF0C\u7ED3\u679C\u4E00\u5E74\u624D\u52C9\u5F3A\u56DE\u672C\u3002 \u53E6\u5916\u8BAE\u4EF7\u65F6\u53EF\u4EE5\u76F4\u63A5\u62FF\u300C\u540C\u5730\u6BB5\u540C\u6237\u578B\u73B0\u5728\u79DF\u591A\u5C11\u300D\u8DDF\u623F\u4E1C\u8C08\uFF0C\u884C\u60C5\u5728\u8DCC\u7684\u65F6\u5019\uFF0C\u623F\u4E1C\u5B81\u53EF\u5C11\u6DA8\u4E5F\u4E0D\u613F\u7A7A\u7F6E\u4E00\u4E2A\u6708\u3002",n("ru-note").textContent=w}_(sn,"calcRentUp");function ln(){var a=Math.max(0,t(n("hcx-price"),0)),s=Math.min(100,Math.max(0,t(n("hcx-dp"),30)))/100,o=Math.max(0,t(n("hcx-deed"),1.5))/100,b=Math.max(0,t(n("hcx-agent"),2))/100,m=Math.max(0,t(n("hcx-fund"),1))/100,c=Math.max(0,t(n("hcx-odd"),0)),d=Math.max(0,t(n("hcx-deco"),0)),f=Math.max(0,t(n("hcx-furn"),0)),p=Math.max(0,t(n("hcx-move"),0)),u=Math.max(0,t(n("hcx-need"),0)),x=Math.max(0,t(n("hcx-cash"),0)),M=a*s,g=a*o,r=a*b,y=a*m,v=M+g+r+y+c,h=d+f+p,C=u*6,w=v+h+C,E=x-w,S=x-v,B=a>0?(v+h)/a:0,Y=s+o+b+m,F=Y>0?Math.max(0,(x-c-h-C)/Y):0,O=n("hcx-big");O&&(O.textContent=K(v));var W=n("hcx-dpout");W&&(W.textContent=e(M)+" \u5143\uFF08"+i(s,0)+"\uFF09");var U=n("hcx-tax");U&&(U.textContent=e(g+r+y+c)+" \u5143\uFF08\u5360\u623F\u4EF7 "+(a>0?i((g+r+y+c)/a,1):"\u2014")+"\uFF09");var V=n("hcx-live");V&&(V.textContent=e(h)+" \u5143");var H=n("hcx-emg");H&&(H.textContent=e(C)+" \u5143");var k=n("hcx-ratio");k&&(k.textContent=i(B,1)+"\uFF08\u9996\u4ED8\uFF0B\u7A0E\u8D39\uFF0B\u88C5\u4FEE\uFF09");var N=n("hcx-enough");N&&(E>=0?N.textContent="\u591F\uFF0C\u8FD8\u5269 "+e(E)+" \u5143":S>=0?N.textContent="\u7B7E\u5B57\u591F\uFF0C\u88C5\u4FEE\u7F3A\u53E3 "+e(-E)+" \u5143":N.textContent="\u4E0D\u591F\uFF0C\u7B7E\u5B57\u5C31\u7F3A "+e(-S)+" \u5143");var L=n("hcx-cap");L&&(L.textContent=e(F)+" \u5143\uFF08\u4FDD\u7559 6 \u4E2A\u6708\u5E94\u6025\u91D1\u540E\uFF09");var D=n("hcx-body");if(D){for(var A=[["\u9996\u4ED8",i(s,0)+" \xD7 \u6210\u4EA4\u4EF7",M],["\u5951\u7A0E",i(o,2)+" \xD7 \u6210\u4EA4\u4EF7",g],["\u4E2D\u4ECB\u8D39",i(b,2)+" \xD7 \u6210\u4EA4\u4EF7",r],["\u7EF4\u4FEE\u57FA\u91D1",i(m,2)+" \xD7 \u6210\u4EA4\u4EF7",y],["\u8BC4\u4F30/\u516C\u8BC1/\u5DE5\u672C","\u5B9A\u989D",c],["\u88C5\u4FEE","\u5B9A\u989D",d],["\u5BB6\u5177\u5BB6\u7535","\u5B9A\u989D",f],["\u642C\u5BB6\u6742\u8D39","\u5B9A\u989D",p],["\u5E94\u6025\u91D1","6 \xD7 \u6708\u5FC5\u9700",C],["\u5408\u8BA1","\u7B7E\u5B57\uFF0B\u5165\u4F4F\uFF0B\u7F13\u51B2",w]],I="",R=0;R<A.length;R++){var G=R===A.length-1;I+="<tr"+(G?' class="c-soft"':"")+'><td class="tal">'+A[R][0]+'</td><td class="tal">'+A[R][1]+"</td><td>"+e(A[R][2])+"</td></tr>"}D.innerHTML=I}var Q=n("hcx-note");if(Q){var P=[];P.push("\u7B7E\u5B57\u5F53\u5929\u8981\u4ED8 "+e(v)+" \u5143\uFF08\u9996\u4ED8\uFF0B\u7A0E\u8D39\uFF09\uFF0C\u52A0\u4E0A\u88C5\u4FEE\u5BB6\u5177\u642C\u5BB6 "+e(h)+" \u5143\u548C 6 \u4E2A\u6708\u5E94\u6025\u91D1 "+e(C)+" \u5143\uFF0C\u4E00\u5171 "+e(w)+" \u5143\u3002"),E<0&&P.push("\u6309\u73B0\u5728\u7684\u73B0\u91D1\u8FD8\u5DEE "+e(-E)+" \u5143\uFF1A\u8981\u4E48\u964D\u603B\u4EF7\u5230 "+e(F)+" \u5143\u4EE5\u5185\uFF0C\u8981\u4E48\u5EF6\u540E\u88C5\u4FEE\uFF08\u88C5\u4FEE\u901A\u5E38\u5728\u4EA4\u623F\u540E 3\u20136 \u4E2A\u6708\u624D\u82B1\uFF09\u3002"),P.push("\u5BB9\u6613\u88AB\u6F0F\u6389\u7684\u4E09\u7B14\uFF1A\u5951\u7A0E\uFF08\u6309\u6210\u4EA4\u4EF7\uFF0C\u9996\u5957 90\u33A1 \u4EE5\u4E0B\u5E38\u4E3A 1%\u3001\u4EE5\u4E0A 1.5%\uFF09\u3001\u4E2D\u4ECB\u8D39\uFF08\u901A\u5E38\u4E70\u65B9 1\u20132%\uFF09\u3001\u7EF4\u4FEE\u57FA\u91D1\uFF08\u591A\u4E3A\u6BCF\u5E73\u7C73\u51E0\u5341\u5143\u6216\u623F\u4EF7 1% \u4E0A\u4E0B\uFF09\u3002"),P.push("\u4E8C\u624B\u623F\u8FD8\u53EF\u80FD\u6D89\u53CA\u589E\u503C\u7A0E\u4E0E\u4E2A\u7A0E\uFF08\u6EE1\u4E94\u552F\u4E00\u53EF\u514D\uFF09\uFF0C\u672C\u8868\u672A\u5355\u5217\uFF0C\u53EF\u628A\u91D1\u989D\u5E76\u5165\u300C\u8BC4\u4F30/\u516C\u8BC1/\u5DE5\u672C\u300D\u3002"),Q.textContent=P.join(" ")}n("hcx-links")&&(n("hcx-links").innerHTML="\u63A5\u7740\u7B97\uFF1A"+T("deed",{"dd-price":a},"\u4E8C\u624B\u623F\u7A0E\u8D39\u7EC6\u7B97")+T("rentbuy",{"rb-price":a},"\u4E70\u8FD8\u662F\u79DF")+T("budget",{"bg-cash":x},"\u8FD9\u4E2A\u73B0\u91D1\u80FD\u4E70\u591A\u8D35")+T("planner",{"pl-price":a},"\u4E70\u5B8C\u8FD9\u5957\u4E4B\u540E\u7684\u4F53\u68C0"))}_(ln,"calcHouseCash");export const PANELS={housecash:`  <section class="panel" id="panel-housecash">
    <div class="cols">
      <div class="card">
        <h2>\u8F93\u5165\uFF1A\u8FD9\u5957\u623F\u4ECE\u7B7E\u5B57\u5230\u4F4F\u8FDB\u53BB\u8981\u82B1\u591A\u5C11\u73B0\u91D1</h2>
        <span class="row">
          <label class="f"><span>\u6210\u4EA4\u4EF7</span><input id="hcx-price" type="number" inputmode="decimal" min="0" step="10000" value="2000000"></label>
          <label class="f"><span>\u9996\u4ED8\u6BD4\u4F8B %</span><input id="hcx-dp" type="number" inputmode="decimal" min="0" max="100" step="1" value="30"></label>
        </span>
        <span class="row">
          <label class="f"><span>\u5951\u7A0E %\uFF08\u5360\u6210\u4EA4\u4EF7\uFF09</span><input id="hcx-deed" type="number" inputmode="decimal" min="0" max="10" step="0.5" value="1.5"></label>
          <label class="f"><span>\u4E2D\u4ECB\u8D39 %\uFF08\u5360\u6210\u4EA4\u4EF7\uFF09</span><input id="hcx-agent" type="number" inputmode="decimal" min="0" max="10" step="0.5" value="2"></label>
        </span>
        <span class="row">
          <label class="f"><span>\u7EF4\u4FEE\u57FA\u91D1 %\uFF08\u5360\u6210\u4EA4\u4EF7\uFF09</span><input id="hcx-fund" type="number" inputmode="decimal" min="0" max="5" step="0.5" value="1"></label>
          <label class="f"><span>\u8BC4\u4F30/\u516C\u8BC1/\u5DE5\u672C\u7B49\uFF08\u5143\uFF09</span><input id="hcx-odd" type="number" inputmode="decimal" min="0" step="500" value="5000"></label>
        </span>
        <span class="row">
          <label class="f"><span>\u88C5\u4FEE\uFF08\u5143\uFF09</span><input id="hcx-deco" type="number" inputmode="decimal" min="0" step="10000" value="200000"></label>
          <label class="f"><span>\u5BB6\u5177\u5BB6\u7535\uFF08\u5143\uFF09</span><input id="hcx-furn" type="number" inputmode="decimal" min="0" step="5000" value="80000"></label>
        </span>
        <span class="row">
          <label class="f"><span>\u642C\u5BB6/\u6742\u8D39\uFF08\u5143\uFF09</span><input id="hcx-move" type="number" inputmode="decimal" min="0" step="1000" value="10000"></label>
          <label class="f"><span>\u6708\u5FC5\u9700\u652F\u51FA\uFF08\u7B97\u5E94\u6025\u91D1\uFF09</span><input id="hcx-need" type="number" inputmode="decimal" min="0" step="500" value="10000"></label>
        </span>
        <label class="f"><span>\u73B0\u6709\u73B0\u91D1\uFF08\u5143\uFF09</span><input id="hcx-cash" type="number" inputmode="decimal" min="0" step="10000" value="900000"></label>
        <em>\u53E3\u5F84\uFF1A\u5951\u7A0E\u6309\u6210\u4EA4\u4EF7\xD7\u7A0E\u7387\u4F30\u7B97\uFF08\u9996\u5957 90\u33A1 \u4EE5\u4E0B\u5E38\u4E3A 1%\u3001\u4EE5\u4E0A 1.5%\uFF0C\u4E8C\u5957\u66F4\u9AD8\uFF0C\u4EE5\u5F53\u5730\u4E3A\u51C6\uFF09\uFF1B\u4E2D\u4ECB\u8D39\u3001\u7EF4\u4FEE\u57FA\u91D1\u5404\u5730\u5DEE\u5F02\u5927\uFF1B\u4E8C\u624B\u623F\u8FD8\u6709\u589E\u503C\u7A0E/\u4E2A\u7A0E\uFF08\u6EE1\u4E94\u552F\u4E00\u53EF\u514D\uFF09\uFF0C\u6B64\u5904\u672A\u5355\u5217\uFF0C\u53EF\u5E76\u8FDB\u300C\u7A0E\u8D39\u300D\u3002</em>
      </div>
      <div class="card res">
        <h2>\u7ED3\u679C\uFF1A\u7B7E\u5B57\u524D\u8981\u51C6\u5907\u591A\u5C11\u94B1</h2>
        <div class="big"><span class="k">\u7B7E\u5B57\u524D\u73B0\u91D1\u603B\u9700\u6C42</span><strong id="hcx-big">\u2014</strong><span class="unit">\u5143</span></div>
        <ul class="kv">
          <li><span>\u9996\u4ED8</span><b id="hcx-dpout">\u2014</b></li>
          <li><span>\u7A0E\u8D39\uFF08\u5951\u7A0E\uFF0B\u4E2D\u4ECB\uFF0B\u57FA\u91D1\uFF0B\u6742\u8D39\uFF09</span><b id="hcx-tax">\u2014</b></li>
          <li><span>\u88C5\u4FEE\u5BB6\u5177\u642C\u5BB6</span><b id="hcx-live">\u2014</b></li>
          <li><span>\u5EFA\u8BAE\u7559\u7684\u5E94\u6025\u91D1\uFF086 \u4E2A\u6708\uFF09</span><b id="hcx-emg">\u2014</b></li>
          <li><span>\u4E00\u6B21\u6027\u652F\u51FA\u5360\u623F\u4EF7</span><b id="hcx-ratio">\u2014</b></li>
          <li><span>\u73B0\u91D1\u591F\u4E0D\u591F</span><b id="hcx-enough">\u2014</b></li>
          <li><span>\u80FD\u627F\u53D7\u7684\u6700\u9AD8\u6210\u4EA4\u4EF7</span><b id="hcx-cap">\u2014</b></li>
        </ul>
        <div class="tablebox">
          <table>
            <thead><tr><th class="tal">\u9879\u76EE</th><th>\u7B97\u6CD5</th><th>\u91D1\u989D</th></tr></thead>
            <tbody id="hcx-body"></tbody>
          </table>
        </div>
        <p class="hint" id="hcx-note"></p>
        <p class="jump" id="hcx-links"></p>
      </div>
    </div>
  </section>
`,rentbuy:`  <section class="panel" id="panel-rentbuy">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u623F\u4EF7\uFF08\u5143\uFF09</span>
      <input id="rb-price" type="number" inputmode="decimal" min="0" step="50000" value="2000000">
    </label>
    <label class="f">
      <span>\u9996\u4ED8\u6BD4\u4F8B\uFF08%\uFF09</span>
      <input id="rb-down" type="number" inputmode="decimal" min="0" max="100" step="5" value="30">
    </label>
    <label class="f">
      <span>\u623F\u8D37\u5E74\u5229\u7387\uFF08%\uFF09</span>
      <input id="rb-rate" type="number" inputmode="decimal" min="0" step="0.05" value="3.1">
    </label>
    <label class="f">
      <span>\u8D37\u6B3E\u5E74\u9650\uFF08\u5E74\uFF09</span>
      <input id="rb-years" type="number" inputmode="decimal" min="0" step="5" value="30">
    </label>
    <label class="f">
      <span>\u540C\u5730\u6BB5\u6708\u79DF\u91D1\uFF08\u5143\uFF09</span>
      <input id="rb-rent" type="number" inputmode="decimal" min="0" step="500" value="4000">
    </label>
    <label class="f">
      <span>\u6253\u7B97\u6301\u6709\u51E0\u5E74\u540E\u6BD4\u8F83</span>
      <input id="rb-hold" type="number" inputmode="decimal" min="1" step="1" value="10">
    </label>
    <label class="f">
      <span>\u623F\u4EF7\u5E74\u6DA8\u5E45\uFF08%\uFF09</span>
      <input id="rb-growth" type="number" inputmode="decimal" step="0.5" value="2">
    </label>
    <label class="f">
      <span>\u79DF\u91D1\u5E74\u6DA8\u5E45\uFF08%\uFF09</span>
      <input id="rb-rgrowth" type="number" inputmode="decimal" step="0.5" value="3">
    </label>
    <label class="f">
      <span>\u7406\u8D22\u5E74\u5316\uFF08%\uFF09\uFF08\u9996\u4ED8\u548C\u5DEE\u989D\u7684\u94B1\uFF09</span>
      <input id="rb-invest" type="number" inputmode="decimal" step="0.5" value="2.5">
    </label>
    <label class="f">
      <span>\u6BCF\u5E74\u6301\u6709\u6210\u672C\uFF08\u7269\u4E1A+\u7EF4\u4FEE+\u53D6\u6696\u7B49\uFF0C\u5143\uFF09</span>
      <input id="rb-cost" type="number" inputmode="decimal" min="0" step="500" value="5000">
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k" id="rb-diff-label">\u5341\u5E74\u540E\u51C0\u8D44\u4EA7\u5DEE</span>
      <strong id="rb-diff">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u4E70\u623F\uFF1A\u671F\u672B\u51C0\u8D44\u4EA7\uFF08\u623F\u4EA7 \u2212 \u5269\u4F59\u8D37\u6B3E\uFF09</span><b id="rb-buy-net">\u2014</b></li>
      <li><span>\u79DF\u623F\uFF1A\u671F\u672B\u8D44\u4EA7\uFF08\u9996\u4ED8+\u5DEE\u989D\u53BB\u7406\u8D22\uFF09</span><b id="rb-rent-net">\u2014</b></li>
      <li><span>\u9996\u4ED8 / \u8D37\u6B3E</span><b id="rb-loan">\u2014</b></li>
      <li><span>\u6708\u4F9B / \u6708\u79DF\u91D1 / \u6708\u5DEE\u989D</span><b id="rb-monthly">\u2014</b></li>
      <li><span>\u671F\u672B\u623F\u5B50\u503C\u591A\u5C11</span><b id="rb-house">\u2014</b></li>
      <li><span>\u4E34\u754C\u623F\u4EF7\u5E74\u6DA8\u5E45\uFF08\u4F4E\u4E8E\u5B83\u79DF\u623F\u66F4\u5212\u7B97\uFF09</span><b id="rb-breakeven">\u2014</b></li>
    </ul>
    <p class="hint" id="rb-note"></p>
        <p class="jump" id="rb-links"></p>
  </div>
    </div>
  </section>
`,deed:`  <section class="panel" id="panel-deed">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u6210\u4EA4\u4EF7 / \u7F51\u7B7E\u4EF7\uFF08\u5143\uFF09</span>
      <input id="dd-price" type="number" inputmode="decimal" min="0" step="50000" value="2000000">
    </label>
    <label class="f">
      <span>\u5EFA\u7B51\u9762\u79EF\uFF08\u33A1\uFF09</span>
      <input id="dd-area" type="number" inputmode="decimal" min="0" step="5" value="90">
    </label>
    <label class="f">
      <span>\u4E70\u65B9\u7B2C\u51E0\u5957</span>
      <select id="dd-first">
        <option value="1" selected>\u9996\u5957</option>
        <option value="2">\u4E8C\u5957</option>
        <option value="3">\u4E09\u5957\u53CA\u4EE5\u4E0A</option>
      </select>
    </label>
    <label class="f">
      <span>\u5951\u7A0E\u7A0E\u7387\uFF08%\uFF09</span>
      <input id="dd-deed" type="number" inputmode="decimal" min="0" step="0.5" value="1">
      <em>\u9996\u5957 90\u33A1 \u53CA\u4EE5\u4E0B\u591A\u4E3A 1%\uFF0C90\u33A1 \u4EE5\u4E0A 1.5%\uFF1B\u4E8C\u5957\u591A\u4E3A 1%\u20132%\uFF0C\u4EE5\u5F53\u5730\u4E3A\u51C6</em>
    </label>
    <label class="f">
      <span>\u5356\u65B9\u6301\u6709\u5E74\u9650</span>
      <select id="dd-hold">
        <option value="2" selected>\u6EE1 2 \u5E74\uFF08\u514D\u589E\u503C\u7A0E\uFF09</option>
        <option value="0">\u4E0D\u6EE1 2 \u5E74\uFF08\u8981\u4EA4\u589E\u503C\u7A0E\uFF09</option>
      </select>
    </label>
    <label class="f">
      <span>\u589E\u503C\u7A0E\u53CA\u9644\u52A0\u7A0E\u7387\uFF08%\uFF09</span>
      <input id="dd-vat" type="number" inputmode="decimal" min="0" step="0.1" value="5.3">
    </label>
    <label class="f">
      <span>\u5356\u65B9\u4E2A\u7A0E</span>
      <select id="dd-income-tax">
        <option value="1" selected>\u6838\u5B9A\u5F81\u6536 1%\uFF08\u6309\u6210\u4EA4\u4EF7\uFF09</option>
        <option value="0">\u6EE1\u4E94\u552F\u4E00\uFF0C\u514D\u5F81</option>
        <option value="20">\u5DEE\u989D 20%</option>
      </select>
    </label>
    <label class="f">
      <span>\u4E2D\u4ECB\u8D39\u7387\uFF08%\uFF09</span>
      <input id="dd-agent" type="number" inputmode="decimal" min="0" step="0.5" value="2">
    </label>
    <label class="f">
      <span>\u5176\u4ED6\u6742\u8D39\uFF08\u8BC4\u4F30/\u767B\u8BB0/\u516C\u8BC1\u7B49\uFF0C\u5143\uFF09</span>
      <input id="dd-other" type="number" inputmode="decimal" min="0" step="500" value="2000">
    </label>
    <label class="f">
      <span>\u5356\u65B9\u539F\u8D2D\u623F\u4EF7\uFF08\u5143\uFF0C\u7B97\u5DEE\u989D\u4E2A\u7A0E\u7528\uFF09</span>
      <input id="dd-cost" type="number" inputmode="decimal" min="0" step="50000" value="1200000">
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u7A0E\u8D39\u5408\u8BA1</span>
      <strong id="dd-total">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u5951\u7A0E\uFF08\u4E70\u65B9\uFF09</span><b id="dd-deed-amt">\u2014</b></li>
      <li><span>\u4E2D\u4ECB\u8D39</span><b id="dd-agent-amt">\u2014</b></li>
      <li><span>\u589E\u503C\u7A0E\u53CA\u9644\u52A0\uFF08\u5356\u65B9\uFF09</span><b id="dd-vat-amt">\u2014</b></li>
      <li><span>\u4E2A\u7A0E\uFF08\u5356\u65B9\uFF09</span><b id="dd-it-amt">\u2014</b></li>
      <li><span>\u5176\u4ED6\u6742\u8D39</span><b id="dd-other-amt">\u2014</b></li>
      <li><span>\u4E70\u65B9\u8981\u51C6\u5907\uFF08\u623F\u6B3E+\u4E70\u65B9\u7A0E\u8D39\uFF09</span><b id="dd-buyer">\u2014</b></li>
      <li><span>\u7A0E\u8D39\u5360\u6210\u4EA4\u4EF7</span><b id="dd-ratio">\u2014</b></li>
    </ul>
    <p class="hint" id="dd-note"></p>
  </div>
    </div>
  </section>
`,sell:`  <section class="panel" id="panel-sell">
    <div class="cols">
  <div class="card">
    <h2>\u5356\u65E7\u623F</h2>
    <label class="f">
      <span>\u73B0\u623F\u6210\u4EA4\u4EF7\uFF08\u5143\uFF09</span>
      <input id="sv-price" type="number" inputmode="decimal" min="0" step="10000" value="2000000">
    </label>
    <label class="f">
      <span>\u5269\u4F59\u8D37\u6B3E\u672C\u91D1\uFF08\u5143\uFF09</span>
      <input id="sv-loan" type="number" inputmode="decimal" min="0" step="10000" value="800000">
    </label>
    <label class="f">
      <span>\u589E\u503C\u7A0E\u53CA\u9644\u52A0\uFF08%\uFF0C\u6EE1 2 \u5E74\u591A\u4E3A 0\uFF09</span>
      <input id="sv-vat" type="number" inputmode="decimal" min="0" step="0.1" value="0">
    </label>
    <label class="f">
      <span>\u4E2A\u4EBA\u6240\u5F97\u7A0E\uFF08%\uFF0C\u6EE1\u4E94\u552F\u4E00\u4E3A 0\uFF09</span>
      <input id="sv-it" type="number" inputmode="decimal" min="0" step="0.1" value="1">
    </label>
    <label class="f">
      <span>\u4E2D\u4ECB\u8D39\uFF08%\uFF09</span>
      <input id="sv-agent" type="number" inputmode="decimal" min="0" step="0.1" value="2">
    </label>
    <label class="f">
      <span>\u5176\u4ED6\u5356\u65B9\u8D39\u7528\uFF08%\uFF0C\u8BC4\u4F30/\u62C5\u4FDD\u7B49\uFF09</span>
      <input id="sv-other" type="number" inputmode="decimal" min="0" step="0.1" value="0.3">
    </label>
    <h2 class="sub">\u6362\u65B0\u623F</h2>
    <label class="f">
      <span>\u65B0\u623F\u603B\u4EF7\uFF08\u5143\uFF09</span>
      <input id="sv-new" type="number" inputmode="decimal" min="0" step="10000" value="3000000">
    </label>
    <label class="f">
      <span>\u9996\u4ED8\u6BD4\u4F8B\uFF08%\uFF09</span>
      <input id="sv-down" type="number" inputmode="decimal" min="0" max="100" step="1" value="30">
    </label>
    <label class="f">
      <span>\u65B0\u8D37\u6B3E\u5229\u7387\uFF08\u5E74\uFF0C%\uFF09</span>
      <input id="sv-rate" type="number" inputmode="decimal" min="0" step="0.05" value="3.1">
    </label>
    <label class="f">
      <span>\u65B0\u8D37\u6B3E\u5E74\u9650\uFF08\u5E74\uFF09</span>
      <input id="sv-years" type="number" inputmode="numeric" min="1" max="40" step="1" value="30">
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u5356\u623F\u5230\u624B\u51C0\u989D</span>
      <strong id="sv-net">\u2014</strong>
      <span class="unit">\u5143</span>
    </div>
    <ul class="kv">
      <li><span>\u5356\u65B9\u7A0E\u8D39\u5408\u8BA1</span><b id="sv-tax">\u2014</b></li>
      <li><span>\u5176\u4E2D\u589E\u503C\u7A0E\u53CA\u9644\u52A0</span><b id="sv-vat-amt">\u2014</b></li>
      <li><span>\u5176\u4E2D\u4E2A\u4EBA\u6240\u5F97\u7A0E</span><b id="sv-it-amt">\u2014</b></li>
      <li><span>\u5176\u4E2D\u4E2D\u4ECB\u8D39</span><b id="sv-agent-amt">\u2014</b></li>
      <li><span>\u5176\u4E2D\u5176\u4ED6\u8D39\u7528</span><b id="sv-other-amt">\u2014</b></li>
      <li><span>\u7A0E\u8D39\u5360\u6210\u4EA4\u4EF7</span><b id="sv-tax-ratio">\u2014</b></li>
      <li><span>\u65B0\u623F\u9996\u4ED8\u9700\u8981</span><b id="sv-dpay">\u2014</b></li>
      <li><span>\u8D44\u91D1\u7F3A\u53E3\uFF08\u8D1F\u6570\u5373\u7ED3\u4F59\uFF09</span><b id="sv-gap">\u2014</b></li>
      <li><span>\u65B0\u8D37\u6B3E\u91D1\u989D</span><b id="sv-nloan">\u2014</b></li>
      <li><span>\u65B0\u8D37\u6B3E\u6708\u4F9B</span><b id="sv-mpay">\u2014</b></li>
    </ul>
    <p class="hint" id="sv-note"></p>
  </div>
    </div>
  </section>
`,rentyield:`  <section class="panel" id="panel-rentyield">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u623F\u5B50\u603B\u4EF7\uFF08\u5143\uFF09</span>
      <input id="ry-price" type="number" inputmode="decimal" min="0" step="10000" value="2000000">
    </label>
    <label class="f">
      <span>\u6708\u79DF\u91D1\uFF08\u5143\uFF09</span>
      <input id="ry-rent" type="number" inputmode="decimal" min="0" step="100" value="4000">
    </label>
    <label class="f">
      <span>\u9996\u4ED8\u6BD4\u4F8B\uFF08%\uFF09</span>
      <input id="ry-down" type="number" inputmode="decimal" min="0" max="100" step="5" value="30">
    </label>
    <label class="f">
      <span>\u8D37\u6B3E\u5229\u7387\uFF08\u5E74\uFF0C%\uFF09</span>
      <input id="ry-rate" type="number" inputmode="decimal" min="0" step="0.05" value="3.1">
    </label>
    <label class="f">
      <span>\u8D37\u6B3E\u5E74\u9650\uFF08\u5E74\uFF09</span>
      <input id="ry-years" type="number" inputmode="numeric" min="1" max="40" step="1" value="30">
    </label>
    <label class="f">
      <span>\u6301\u6709\u5E74\u9650\uFF08\u5E74\uFF09</span>
      <input id="ry-hold" type="number" inputmode="numeric" min="1" max="40" step="1" value="10">
    </label>
    <label class="f">
      <span>\u623F\u4EF7\u5E74\u6DA8\u5E45\uFF08%\uFF09</span>
      <input id="ry-growth" type="number" inputmode="decimal" min="-20" max="30" step="0.5" value="2">
    </label>
    <label class="f">
      <span>\u79DF\u91D1\u5E74\u6DA8\u5E45\uFF08%\uFF09</span>
      <input id="ry-rgrowth" type="number" inputmode="decimal" min="-20" max="30" step="0.5" value="3">
    </label>
    <label class="f">
      <span>\u5E74\u6301\u6709\u6210\u672C\uFF08\u5143\uFF0C\u7269\u4E1A+\u7EF4\u4FEE+\u4FDD\u9669\uFF09</span>
      <input id="ry-cost" type="number" inputmode="decimal" min="0" step="500" value="6000">
    </label>
    <label class="f">
      <span>\u7A7A\u7F6E\u4E0E\u6B20\u79DF\uFF08% \u5E74\u79DF\u91D1\uFF09</span>
      <input id="ry-vac" type="number" inputmode="decimal" min="0" max="60" step="1" value="5">
    </label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big">
      <span class="k">\u6301\u6709\u5230\u671F\u5E74\u5316\u6536\u76CA\uFF08IRR\uFF09</span>
      <strong id="ry-irr">\u2014</strong>
      <span class="unit">%</span>
    </div>
    <ul class="kv">
      <li><span>\u79DF\u552E\u6BD4\uFF08\u5E74\u79DF\u91D1 \xF7 \u623F\u4EF7\uFF09</span><b id="ry-ratio">\u2014</b></li>
      <li><span>\u6263\u7A7A\u7F6E\u540E\u7684\u6709\u6548\u79DF\u91D1\u56DE\u62A5</span><b id="ry-eff">\u2014</b></li>
      <li><span>\u518D\u6263\u6301\u6709\u6210\u672C\u7684\u51C0\u56DE\u62A5</span><b id="ry-net">\u2014</b></li>
      <li><span>\u6708\u4F9B</span><b id="ry-pay">\u2014</b></li>
      <li><span>\u6BCF\u6708\u73B0\u91D1\u6D41\uFF08\u79DF\u91D1 \u2212 \u6708\u4F9B \u2212 \u6210\u672C\uFF09</span><b id="ry-cash">\u2014</b></li>
      <li><span>\u6301\u6709\u671F\u672B\u623F\u4EF7</span><b id="ry-price-end">\u2014</b></li>
      <li><span>\u671F\u672B\u5269\u4F59\u8D37\u6B3E</span><b id="ry-loan-end">\u2014</b></li>
      <li><span>\u7D2F\u8BA1\u51C0\u79DF\u91D1\u6536\u5165</span><b id="ry-rent-sum">\u2014</b></li>
      <li><span>\u7D2F\u8BA1\u81EA\u638F\u73B0\u91D1\uFF08\u9996\u4ED8+\u8865\u8D34\u6708\u4F9B\uFF09</span><b id="ry-invest">\u2014</b></li>
      <li><span>\u671F\u672B\u5356\u51FA\u5230\u624B\uFF08\u6263\u8D37\u6B3E\uFF09</span><b id="ry-exit">\u2014</b></li>
    </ul>
    <p class="hint" id="ry-note"></p>
        <p class="jump" id="ry-links"></p>
  </div>
    </div>
  </section>
`,budget:`  <section class="panel" id="panel-budget">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f"><span>\u5BB6\u5EAD\u6708\u6536\u5165\uFF08\u7A0E\u540E\uFF0C\u5143\uFF09</span>
      <input id="bg-income" type="number" inputmode="decimal" min="0" step="1000" value="30000"></label>
    <label class="f"><span>\u624B\u91CC\u53EF\u7528\u73B0\u91D1\uFF08\u542B\u7A0E\u8D39\uFF0C\u5143\uFF09</span>
      <input id="bg-cash" type="number" inputmode="decimal" min="0" step="10000" value="700000"></label>
    <label class="f"><span>\u9996\u4ED8\u6BD4\u4F8B\uFF08%\uFF09</span>
      <input id="bg-down" type="number" inputmode="decimal" min="0" max="100" step="5" value="30"></label>
    <label class="f"><span>\u623F\u8D37\u5229\u7387\uFF08%\uFF09</span>
      <input id="bg-rate" type="number" inputmode="decimal" min="0" step="0.05" value="3.1"></label>
    <label class="f"><span>\u8D37\u6B3E\u5E74\u9650\uFF08\u5E74\uFF09</span>
      <input id="bg-years" type="number" inputmode="decimal" min="1" step="1" value="30"></label>
    <label class="f"><span>\u6708\u4F9B\u6700\u9AD8\u5360\u6536\u5165\uFF08%\uFF09</span>
      <input id="bg-ratio" type="number" inputmode="decimal" min="5" max="80" step="5" value="40"></label>
    <label class="f"><span>\u7A0E\u8D39+\u88C5\u4FEE\u9884\u7559\uFF08\u5360\u603B\u4EF7\uFF0C%\uFF09</span>
      <input id="bg-fee" type="number" inputmode="decimal" min="0" step="0.5" value="5"></label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u80FD\u627F\u53D7\u7684\u623F\u5B50\u603B\u4EF7</span><strong id="bg-total">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u6708\u4F9B\u4E0A\u9650\uFF08\u6536\u5165\u7684\u8BBE\u5B9A\u6BD4\u4F8B\uFF09</span><b id="bg-paycap">\u2014</b></li>
      <li><span>\u6309\u8FD9\u6761\u6708\u4F9B\u80FD\u8D37\u5230</span><b id="bg-loancap">\u2014</b></li>
      <li><span>\u53D7\u6708\u4F9B\u7EA6\u675F\u7684\u6700\u9AD8\u603B\u4EF7</span><b id="bg-byPay">\u2014</b></li>
      <li><span>\u53D7\u73B0\u91D1\u7EA6\u675F\u7684\u6700\u9AD8\u603B\u4EF7</span><b id="bg-byCash">\u2014</b></li>
      <li><span>\u5361\u5728\u54EA\u4E00\u8FB9</span><b id="bg-bottle">\u2014</b></li>
      <li><span>\u9996\u4ED8</span><b id="bg-downamt">\u2014</b></li>
      <li><span>\u7A0E\u8D39+\u88C5\u4FEE\u8981\u9884\u7559</span><b id="bg-feeamt">\u2014</b></li>
      <li><span>\u8D37\u6B3E\u989D / \u6708\u4F9B</span><b id="bg-loan">\u2014</b></li>
      <li><span>\u6708\u4F9B\u5360\u6536\u5165</span><b id="bg-share">\u2014</b></li>
      <li><span>30 \u5E74\u603B\u5171\u4ED8\u7684\u5229\u606F</span><b id="bg-int">\u2014</b></li>
    </ul>
    <p class="hint" id="bg-note"></p>
  </div>
    </div>
  </section>
`,rentup:`  <section class="panel" id="panel-rentup">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f"><span>\u73B0\u5728\u6708\u79DF\uFF08\u5143\uFF09</span>
      <input id="ru-cur" type="number" inputmode="decimal" min="0" step="100" value="4000"></label>
    <label class="f"><span>\u623F\u4E1C\u8981\u6DA8\u5230\uFF08\u5143\uFF09</span>
      <input id="ru-new" type="number" inputmode="decimal" min="0" step="100" value="4400"></label>
    <label class="f"><span>\u642C\u5BB6\u4E00\u6B21\u7684\u603B\u6210\u672C\uFF08\u4E2D\u4ECB/\u62BC\u91D1\u635F\u5931/\u642C\u5BB6\uFF0C\u5143\uFF09</span>
      <input id="ru-cost" type="number" inputmode="decimal" min="0" step="500" value="6000"></label>
    <label class="f"><span>\u540C\u5730\u6BB5\u65B0\u79DF\u4EF7\uFF08\u5143\uFF09</span>
      <input id="ru-alt" type="number" inputmode="decimal" min="0" step="100" value="4200"></label>
    <label class="f"><span>\u8FD8\u6253\u7B97\u4F4F\u51E0\u5E74</span>
      <input id="ru-years" type="number" inputmode="decimal" min="0.5" max="20" step="0.5" value="3"></label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u642C\u8D70\u80FD\u7701\uFF08\u6216\u4E8F\uFF09</span><strong id="ru-diff">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u63A5\u53D7\u6DA8\u79DF\uFF1A\u6BCF\u5E74\u591A\u4ED8</span><b id="ru-stayyear">\u2014</b></li>
      <li><span>\u63A5\u53D7\u6DA8\u79DF\uFF1A\u4F4F\u6EE1\u671F\u7684\u603B\u591A\u4ED8</span><b id="ru-stay">\u2014</b></li>
      <li><span>\u642C\u8D70\uFF1A\u4F4F\u6EE1\u671F\u7684\u603B\u591A\u4ED8\uFF08\u542B\u642C\u5BB6\u8D39\uFF09</span><b id="ru-move">\u2014</b></li>
      <li><span>\u642C\u5BB6\u7684\u76C8\u4E8F\u5E73\u8861\u8981\u4F4F</span><b id="ru-breakeven">\u2014</b></li>
      <li><span>\u6DA8\u79DF\u5E45\u5EA6\u7684\u4E34\u754C\u70B9</span><b id="ru-line">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u8FD8\u4F4F</th><th>\u63A5\u53D7\u6DA8\u79DF\u591A\u4ED8</th><th>\u642C\u8D70\u591A\u4ED8</th><th>\u54EA\u8FB9\u5212\u7B97</th></tr></thead>
        <tbody id="ru-body"></tbody>
      </table>
    </div>
    <p class="hint" id="ru-note"></p>
  </div>
    </div>
  </section>
`};export default{rentbuy:Z,deed:nn,sell:an,rentyield:en,budget:tn,rentup:sn,housecash:ln};
