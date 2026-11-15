var F=Object.defineProperty;var k=(e,c)=>F(e,"name",{value:c,configurable:!0});const{$:n,BACKUP_KEY:bn,BUILD_TAG:un,CAT_KEY:mn,CAT_LABEL:fn,CHUNK_FILES:xn,CHUNK_OF:hn,CMP_KEY:yn,CORE_CALC:Cn,CURS:gn,DEFERRED_TAPS:wn,DEMO_SAVED:Mn,DIVISOR:kn,EDITED:Tn,ERR_BOX:En,FAV_KEY:Sn,FIELDS:An,FIRST_ACTIVATE:_n,FREQ:Wn,FREQ_KEY:Rn,INSTALL_HIDE_KEY:Dn,KEY:Fn,LAST_KEY:Ln,MONTH_CATS:Nn,MONTH_TABLE:jn,NEXT_OF:Pn,PALETTE_EL:Hn,PENDING_PARAMS:In,PRE_KEY:Kn,QUOTA_WARNED:On,RECENT_KEY:Yn,SAVE_TIMER:Bn,SCHEMA_KEY:Un,SCHEMA_VERSION:Vn,SEARCH_KEY:qn,SNAP_DROP_SEEN:Gn,SNAP_KEY:Qn,SNAP_MAX:Xn,SNAP_PICK:zn,STORED:Jn,TABS:$n,TAB_NATURAL:Zn,THEME_KEY:na,TOAST_EL:aa,TODAYBAR_KEY:ta,UNITS:ea,WF_ARCH_KEY:sa,WF_AUTO_IDX:ia,WF_AUTO_LIST:la,WF_AUTO_STEP:pa,WF_AUTO_TIMER:da,WF_CUSTNAME_KEY:ra,WF_CUST_KEY:ca,WF_CUST_NAME:oa,WF_DONE:va,WF_EDIT:ba,WF_EDIT_KEY:ua,WF_KEY:ma,WF_LAST:fa,WF_LEGACY:xa,WF_MAN_KEY:ha,WF_MD:ya,WF_MD_FIELDS:Ca,WF_MD_KEY:ga,WF_MD_LINKS:wa,WF_META_KEY:Ma,WF_MONTH_KEY:ka,WF_NOTE_KEY:Ta,WF_NOTIFIED_KEY:Ea,WF_NOTIFY_KEY:Sa,WF_PATHS:Aa,WF_ROLE_KEY:_a,WF_ROLE_READY:Wa,WF_SKIP_KEY:Ra,WF_TASK_KEY:Da,WF_TEMPLATES:Fa,XL_ROWS:La,YEAR_TABLE:Na,_onPanels:ja,a11yTouch:Pa,activate:Ha,addMonths:Ia,annuityPV:Ka,annuityPayment:Oa,applyFilter:Ya,applyParams:Ba,applyStoredTo:Ua,applyWfTpl:Va,backupAgeDays:qa,bindWfDnd:Ga,bindWfInline:Qa,bizAdd:Xa,bonusSoloTax:za,buildLoanSchedule:Ja,buildShare:$a,buildTabBadges:Za,bumpFreq:nt,calcLoan:at,calcMap:tt,calcWorkflow:et,clearWfMan:st,closePalette:it,cmpTabName:lt,cnUpper:pt,combineTax:dt,convertTemp:rt,copyText:ct,cumulativeTax:ot,curCat:vt,currentSnap:bt,demoFill:ut,demoHint:mt,diagText:ft,dlJson:xt,doInstall:ht,doPrint:yt,drawMonthCats:Ct,drawMonthStack:gt,drawReportCharts:wt,drawRpMini:Mt,drawnMonthlyChart:kt,drawnYearChart:Tt,enhanceNums:Et,enhancePanelUi:St,ensureChunk:At,evalExpr:_t,favList:Wt,fillCmpMod:Rt,fillMonthGrid:Dt,fillUnits:Ft,flash:Lt,flushParams:Nt,flushSave:jt,fmt:o,fmtAt:Pt,fmtDate:Ht,fx:It,gauss:Kt,getWfCust:Ot,getWfDone:Yt,getWfMan:Bt,getWfMeta:Ut,getWfNotes:Vt,getWfSkip:qt,hashTarget:Gt,installEvt:Qt,installHintHide:Xt,installHintOff:zt,iosInstallTip:Jt,iosLike:$t,isFav:Zt,lastName:ne,leftAfter:ae,linkTo:te,loadCmpA:ee,loadSnaps:se,loadWfArch:ie,loadWfCust:le,loadWfDone:pe,loadWfEdit:de,loadWfMan:re,loadWfMeta:ce,loadWfNotes:oe,loadWfSkip:ve,loadWfTask:be,loanRows:ue,makeSnap:me,markBackup:fe,markBadInputs:xe,matchQ:he,money:a,monthToDate:ye,monthlyIRR:Ce,months:ge,npvDiff:we,num:t,numBlur:Me,numFocus:ke,numInput:Te,numKey:Ee,numOf:Se,openPalette:Ae,orderTabsForQuery:_e,palKey:We,panelEls:Re,panelParams:De,parseAmounts:Fe,parseDate:Le,parseNum:Ne,pct:y,percentile:je,plRank:Pe,plScoreCov:He,plScoreDsr:Ie,plScoreEmg:Ke,plScoreLev:Oe,plScoreSave:Ye,prePanels:Be,prefetchAllChunks:Ue,presets:Ve,printCover:qe,pushRecent:Ge,pushSearch:Qe,pwaStandalone:Xe,quickOf:ze,rateOf:Je,readJsonFile:$e,readMonthGrid:Ze,recentList:ns,recordWf:as,refreshCounts:ts,refreshTableTools:es,refreshTrackMods:ss,refreshWfBadge:is,renderLoanTable:ls,renderNext:ps,renderPalette:ds,renderPresets:rs,renderSearchHist:cs,renderSnapCompare:os,renderSnapList:vs,renderTodayBar:bs,renderTrack:us,renderWfTpl:ms,rentBuyAt:fs,restore:xs,runCalc:hs,runDeferredTaps:ys,save:Cs,saveCmpA:gs,saveFav:ws,savePresets:Ms,saveSnaps:ks,saveWfCust:Ts,savedCat:Es,schemaInit:Ss,schemaMigrate:As,scrollResultIfDeepLink:_s,searchHist:Ws,setCat:Rs,setSub:Ds,setTheme:Fs,shareCalc:Ls,sharePayload:Ns,showErrorBox:js,showInstBar:Ps,showUpdateBar:Hs,snapNameOf:Is,snapTipText:Ks,snapshot:Os,st0:Ys,stamp:Bs,startName:Us,syncInstallUi:Vs,tabCatLabel:qs,tabScore:Gs,tap:Qs,taxBy:Xs,toast:zs,toggleWfStep:Js,trimNum:$s,unitFor:Zs,updShown:ni,wfAllPaths:ai,wfArchiveMonth:ti,wfArchivePut:ei,wfAutoNext:si,wfAutoStop:ii,wfAutoWalk:li,wfBar:pi,wfBindCustQ:di,wfBuildHandoff:ri,wfCarryMissing:ci,wfCarryQuery:oi,wfCarryWarn:vi,wfCsvCell:bi,wfCustNameSave:ui,wfDayDiff:mi,wfDetailRender:fi,wfEditPath:xi,wfEditReset:hi,wfEditSave:yi,wfEditToggle:Ci,wfFillCustSel:gi,wfHandoff:wi,wfHandoffCopy:Mi,wfHandoffCsv:ki,wfHandoffPrint:Ti,wfHasAnyData:Ei,wfHideStep:Si,wfKnownMods:Ai,wfLegacyToNew:_i,wfLoad:Wi,wfManSave:Ri,wfMdHref:Di,wfMdRender:Fi,wfMdSave:Li,wfMetaSave:Ni,wfMigrateLegacy:ji,wfMonthKey:Pi,wfMonthRoll:Hi,wfMonthTouch:Ii,wfMoveStep:Ki,wfNoteSave:Oi,wfNotifyCheck:Yi,wfNotifyGranted:Bi,wfNotifyPref:Ui,wfNotifySend:Vi,wfNotifySetPref:qi,wfNotifyStatus:Gi,wfNotifyToggle:Qi,wfOpenInline:Xi,wfOpenTasks:zi,wfPad2:Ji,wfPathMods:$i,wfPlaceInline:Zi,wfPlaceNear:nl,wfProgress:al,wfRenderSummary:tl,wfRoleSaved:el,wfScopedPaths:sl,wfSet:il,wfSkipCurrent:ll,wfSkipSave:pl,wfStepKey:dl,wfStepShare:rl,wfStepState:cl,wfTaskAdd:ol,wfTaskBox:vl,wfTaskDel:bl,wfTaskPending:ul,wfTaskSave:ml,wfTaskToggle:fl,wfTodayPick:xl,wfTodayStr:hl,wfUnhideStep:yl,wfVisiblePaths:Cl,yuan:T,zOf:gl}=window.FC;function L(){var e=Math.max(0,t(n("vt-amount"),0)),c=n("vt-mode").value==="net"?"net":"gross",v=Math.max(0,t(n("vt-rate"),.13)),i=Math.min(30,Math.max(0,t(n("vt-surtax"),12)))/100,d,r,s;c==="net"?(d=e,r=d*v,s=d+r):(s=e,d=s/(1+v),r=s-d);var l=r*i;n("vt-vat").textContent=a(r),n("vt-net").textContent=T(d),n("vt-gross").textContent=T(s),n("vt-share").textContent=s>0?y(r/s):"\u2014",n("vt-surtax-amt").textContent=T(l),n("vt-total-tax").textContent=T(r+l),n("vt-deduct").textContent=T(r);var p=[.13,.09,.06,.05,.03,.01],b=n("vt-body");b.innerHTML="";for(var u=0;u<p.length;u++){var m=p[u],f,h,x;c==="net"?(f=e,h=f*m,x=f+h):(x=e,f=x/(1+m),h=x-f);var C=document.createElement("tr");C.innerHTML="<td>"+y(m,0)+"</td><td>"+a(f)+"</td><td>"+a(h)+"</td><td>"+a(x)+"</td>",Math.abs(m-v)<1e-9&&(C.style.fontWeight="650"),b.appendChild(C)}n("vt-note").textContent="\u516C\u5F0F\uFF1A\u4E0D\u542B\u7A0E = \u542B\u7A0E \xF7 (1 + \u7A0E\u7387)\uFF0C\u7A0E\u989D = \u4E0D\u542B\u7A0E \xD7 \u7A0E\u7387\u3002\u5F00\u4E13\u7968\u7684\u7A0E\u989D\u5BF9\u4E00\u822C\u7EB3\u7A0E\u4EBA\u53EF\u62B5\u6263\uFF0C\u5F00\u666E\u7968\u4E0D\u80FD\u62B5\u6263\uFF08\u5BF9\u65B9\u662F\u5C0F\u89C4\u6A21\u6216\u514D\u7A0E\u9879\u76EE\uFF09\u3002\u9644\u52A0\u7A0E\u8D39\uFF08\u57CE\u5EFA 7% + \u6559\u80B2 3% + \u5730\u65B9\u6559\u80B2 2%\uFF0C\u5E02\u533A\u53E3\u5F84\uFF0C\u53BF\u57CE/\u9547\u4E3A 5%+3%+2%\uFF09\u6309\u5B9E\u9645\u7F34\u7EB3\u7684\u589E\u503C\u7A0E\u8BA1\u5F81\uFF0C\u4E0D\u662F\u53D1\u7968\u4E0A\u7684\u9879\u76EE\uFF0C\u522B\u628A\u5B83\u7B97\u8FDB\u4EF7\u7A0E\u5408\u8BA1\u3002\u5C0F\u89C4\u6A21\u7EB3\u7A0E\u4EBA\u6708\u9500\u552E\u989D\u672A\u8D85\u8D77\u5F81\u70B9\u53EF\u514D\u5F81\u589E\u503C\u7A0E\uFF0C\u5177\u4F53\u4EE5\u5F53\u671F\u653F\u7B56\u4E0E\u5F53\u5730\u7A0E\u52A1\u53E3\u5F84\u4E3A\u51C6\u3002"}k(L,"calcVat");function N(){var e=Math.max(0,t(n("vd-out"),0)),c=Math.max(0,t(n("vd-in"),0)),v=Math.max(0,t(n("vd-carry"),0)),i=Math.max(0,t(n("vd-sales"),0)),d=Math.min(20,Math.max(0,t(n("vd-urban"),7)))/100,r=Math.min(10,Math.max(0,t(n("vd-edu"),3)))/100,s=Math.min(10,Math.max(0,t(n("vd-local"),2)))/100,l=e-c-v,p=Math.max(0,l),b=Math.max(0,-l),u=p*d,m=p*r,f=p*s,h=u+m+f;n("vd-due").textContent=a(p),n("vd-raw").textContent=T(l),n("vd-left").textContent=T(b),n("vd-urban-amt").textContent=T(u),n("vd-edu-amt").textContent=T(m),n("vd-local-amt").textContent=T(f),n("vd-surtax").textContent=T(h),n("vd-total").textContent=T(p+h),n("vd-burden").textContent=i>0?y(p/i):"\u2014";var x=n("vd-body");x.innerHTML="";for(var C=[0,.1,.2,.3,.4],w=0;w<C.length;w++){var g=C[w],M=i*g*.13,E=document.createElement("tr");E.innerHTML="<td>"+y(g,0)+"</td><td>"+a(M)+"</td><td>"+(i>0?y(M/i):"\u2014")+"</td>",x.appendChild(E)}n("vd-note").textContent="\u5E94\u4EA4\u589E\u503C\u7A0E = \u9500\u9879 \u2212 \u8FDB\u9879 \u2212 \u671F\u521D\u7559\u62B5\uFF0C\u7ED3\u679C\u4E3A\u8D1F\u5C31\u662F\u7559\u62B5\uFF0C\u7ED3\u8F6C\u4E0B\u671F\u7EE7\u7EED\u62B5\uFF0C\u4E0D\u9000\u7A0E\uFF08\u9664\u975E\u7B26\u5408\u7559\u62B5\u9000\u7A0E\u6761\u4EF6\uFF09\u3002\u4E0B\u8868\u6309 13% \u7A0E\u7387\u6F14\u793A\u300C\u6BDB\u5229\u7387\u8D8A\u9AD8\u3001\u589E\u503C\u7A0E\u7A0E\u8D1F\u8D8A\u91CD\u300D\uFF1A\u7A0E\u8D1F\u7387 \u2248 \u7A0E\u7387 \xD7 \u6BDB\u5229\u7387\uFF0C\u8FD9\u4E5F\u662F\u4E3A\u4EC0\u4E48\u8FDB\u9879\u7968\u8981\u5C3D\u91CF\u53D6\u5168\u3002\u9644\u52A0\u7A0E\u8D39\u4EE5\u5B9E\u9645\u7F34\u7EB3\u7684\u589E\u503C\u7A0E\u4E3A\u8BA1\u7A0E\u4F9D\u636E\uFF0C\u6CA1\u6709\u5E94\u4EA4\u589E\u503C\u7A0E\u5C31\u4E0D\u7528\u4EA4\u9644\u52A0\u3002\u5C0F\u5FAE\u4F01\u4E1A\u300C\u516D\u7A0E\u4E24\u8D39\u300D\u51CF\u534A\u7B49\u4F18\u60E0\u4EE5\u5F53\u671F\u6587\u4EF6\u4E3A\u51C6\u3002"}k(N,"calcVatDue");function j(){var e=Math.max(0,t(n("er-exp"),0)),c=Math.max(0,t(n("er-vat"),0))/100,v=Math.max(0,Math.min(100,t(n("er-reb"),0)))/100,i=Math.max(0,t(n("er-dom"),0)),d=Math.max(0,t(n("er-in"),0)),r=Math.max(0,t(n("er-carry"),0)),s=e*Math.max(0,c-v),l=d-s,p=i*c,b=p-l-r,u=b>0?b:0,m=b<0?-b:0,f=e*v,h=Math.min(m,f),x=f-h,C=m>f?m-f:0;n("er-refund").textContent=a(h)+" \u5143",n("er-ec").textContent=a(f)+" \u5143",n("er-non").textContent="-"+a(s)+" \u5143\uFF08\u8F6C\u5165\u6210\u672C\uFF09",n("er-avail").textContent=a(l)+" \u5143",n("er-dout").textContent=a(p)+" \u5143",n("er-raw").textContent=u>0?"\u5E94\u7F34 "+a(u)+" \u5143\uFF08\u6CA1\u6709\u9000\u7A0E\uFF09":"\u7559\u62B5 "+a(m)+" \u5143",n("er-exempt").textContent=a(x)+" \u5143",n("er-carryleft").textContent=a(C)+" \u5143";var w=[["\u2460 \u514D\u62B5\u9000\u7A0E\u989D = \u51FA\u53E3\u989D \xD7 \u9000\u7A0E\u7387",f,"\u9000\u7A0E\u7684\u4E0A\u9650\uFF0C\u4E0D\u662F\u5B9E\u9645\u9000\u5230\u7684\u94B1"],["\u2461 \u4E0D\u5F97\u514D\u5F81\u548C\u62B5\u6263 = \u51FA\u53E3\u989D \xD7 (\u5F81\u7A0E\u7387 \u2212 \u9000\u7A0E\u7387)",-s,"\u8FD9\u90E8\u5206\u8FDB\u9879\u4E0D\u80FD\u9000\uFF0C\u8F6C\u5230\u6210\u672C\u91CC"],["\u2462 \u8F6C\u51FA\u540E\u53EF\u62B5\u6263\u8FDB\u9879 = \u8FDB\u9879 \u2212 \u2461",l,"\u62FF\u53BB\u62B5\u5185\u9500\u9500\u9879"],["\u2463 \u5185\u9500\u9500\u9879 \u2212 \u2462 \u2212 \u4E0A\u671F\u7559\u62B5",b,b>0?"\u4E3A\u6B63\uFF1A\u8981\u4EA4\u7A0E\uFF0C\u6CA1\u6709\u9000\u7A0E":"\u4E3A\u8D1F\uFF1A\u5F62\u6210\u671F\u672B\u7559\u62B5"],["\u2464 \u5E94\u9000\u7A0E\u989D = min(\u2463\u7684\u7559\u62B5, \u2460)",h,"\u5B9E\u9645\u80FD\u9000\u5230\u7684\u73B0\u91D1"],["\u2465 \u514D\u62B5\u989D = \u2460 \u2212 \u2464",x,"\u62B5\u6389\u5185\u9500\u5E94\u4EA4\u7A0E\u7684\u90E8\u5206\uFF0C\u4E0D\u53D1\u73B0\u91D1"],["\u2466 \u7ED3\u8F6C\u4E0B\u671F\u7559\u62B5",C,"\u7559\u62B5\u8D85\u8FC7\u514D\u62B5\u9000\u7A0E\u989D\u7684\u90E8\u5206\u7559\u5230\u4EE5\u540E"]],g="",M;for(M=0;M<w.length;M++){var E=w[M][1];g+="<tr"+(E<0?' class="c-bad"':"")+"><td>"+w[M][0]+"</td><td>"+(E>=0?"":"-")+a(Math.abs(E))+"</td><td>"+w[M][2]+"</td></tr>"}n("er-body").innerHTML=g,n("er-note").textContent=" \u514D\u62B5\u9000\u7684\u7B97\u6CD5\u5C31\u4E00\u53E5\u8BDD\uFF1A\u5148\u7B97\u300C\u4E0D\u5F97\u514D\u5F81\u548C\u62B5\u6263\u300D\u628A\u8FDB\u9879\u8F6C\u51FA\u4E00\u5757\uFF0C\u5269\u4E0B\u7684\u8FDB\u9879\u53BB\u62B5\u5185\u9500\u9500\u9879\uFF0C\u62B5\u4E0D\u5B8C\u7684\u7559\u62B5\u518D\u548C\u300C\u514D\u62B5\u9000\u7A0E\u989D\u300D\u6BD4\uFF0C\u5C0F\u7684\u90A3\u4E2A\u624D\u662F\u771F\u9000\u7ED9\u4F60\u7684\u94B1\u3002 \u672C\u4F8B\u9000\u7A0E\u7387\u6BD4\u5F81\u7A0E\u7387\u4F4E "+y(c-v,0)+"\uFF0C\u7B49\u4E8E\u51FA\u53E3\u989D\u91CC\u6709 "+a(s)+" \u5143\u7684\u8FDB\u9879\u9000\u4E0D\u56DE\u6765\uFF0C\u76F4\u63A5\u53D8\u6210\u6210\u672C\u2014\u2014\u8FD9\u5C31\u662F\u300C\u9000\u7A0E\u7387\u5DEE\u300D\u5BF9\u6BDB\u5229\u7684\u5F71\u54CD\uFF0C\u62A5\u4EF7\u65F6\u5982\u679C\u6309\u6EE1\u989D\u9000\u7A0E\u7B97\u6210\u672C\uFF0C\u4F1A\u4F4E\u4F30 "+a(s)+" \u5143\u3002 \u51E0\u4E2A\u5B9E\u52A1\u53E3\u5F84\uFF1A\u2460 \u51FA\u53E3\u989D\u6309 FOB \u4EF7\uFF08\u79BB\u5CB8\u4EF7\uFF09\u6298\u7B97\u4EBA\u6C11\u5E01\uFF0C\u8FD0\u8D39\u4FDD\u8D39\u7531\u5BA2\u6237\u627F\u62C5\u7684 CIF \u8981\u5254\u6389\uFF1B\u2461 \u5355\u8BC1\u8981\u9F50\uFF08\u62A5\u5173\u5355\u3001\u51FA\u53E3\u53D1\u7968\u3001\u6536\u6C47\u51ED\u8BC1\uFF09\uFF0C\u903E\u671F\u4E0D\u7533\u62A5\u5C31\u89C6\u540C\u5185\u9500\u8865\u7A0E\uFF1B\u2462 \u9000\u7A0E\u7387\u6309\u5546\u54C1\u7F16\u7801\uFF08HS\uFF09\u5B9A\uFF0C\u4E0D\u662F\u6309\u884C\u4E1A\u5B9A\uFF0C\u540C\u4E00\u5F20\u62A5\u5173\u5355\u91CC\u4E0D\u540C\u5546\u54C1\u53EF\u80FD\u4E0D\u4E00\u6837\uFF0C\u8981\u5206\u522B\u7B97\uFF1B\u2463 \u65B0\u529E\u4F01\u4E1A\u6709\u514D\u62B5\u9000\u7A0E\u5BA1\u6838\u671F\uFF0C\u9996\u51E0\u7B14\u53EF\u80FD\u5148\u300C\u514D\u62B5\u300D\u4E0D\u9000\uFF0C\u522B\u6309\u6EE1\u989D\u505A\u73B0\u91D1\u6D41\u9884\u7B97\uFF1B\u2464 \u7559\u62B5\u9000\u7A0E\u548C\u51FA\u53E3\u9000\u7A0E\u662F\u4E24\u5957\u653F\u7B56\uFF0C\u522B\u53E0\u52A0\u91CD\u590D\u7B97\u3002"}k(j,"calcExport");function P(){var e=Math.max(0,t(n("tbr-sales"),0)),c=Math.max(0,t(n("tbr-out"),0)),v=Math.max(0,t(n("tbr-in"),0)),i=Math.max(0,t(n("tbr-begin"),0)),d=t(n("tbr-prev"),0),r=t(n("tbr-ind"),0),s=Math.max(0,t(n("tbr-surch"),0))/100,l=c-v-i,p=l<0?-l:0;l<0&&(l=0);var b=e>0?l/e*100:0,u=l*s,m=c>0?v/(c/e):0,f=e>0?(e-m)/e:0,h=r*.7,x=r*1.3,C=b>=h&&b<=x,w=!isFinite(b)||e===0?"\u5148\u586B\u9500\u552E\u989D":l===0?"\u672C\u6708\u65E0\u5E94\u4EA4\uFF08\u7559\u62B5\u6216\u514D\u7A0E\uFF09":b>x?"\u504F\u9AD8\uFF1A"+(v<=0?"\u7F3A\u8FDB\u9879\uFF0C\u786E\u8BA4\u662F\u5426\u6F0F\u62B5":"\u8FDB\u9879\u4E0D\u8DB3\uFF0C\u770B\u91C7\u8D2D\u8282\u594F"):b<h?"\u504F\u4F4E\uFF1A\u7559\u610F\u88AB\u7EA6\u8C08\uFF0C\u51C6\u5907\u597D\u6BDB\u5229\u4E0E\u8FDB\u9879\u8BF4\u660E":"\u5728\u53C2\u8003\u533A\u95F4\u5185";n("tbr-big").textContent=o(b,2),n("tbr-pay").textContent=T(l)+(p>0?"\uFF08\u671F\u672B\u7559\u62B5 "+a(p)+"\uFF09":""),n("tbr-surcharge").textContent=T(u)+"\uFF08"+y(s,0)+"\uFF09",n("tbr-mom").textContent=(b-d>=0?"+":"")+o(b-d,2)+" \u4E2A\u767E\u5206\u70B9\uFF08\u4E0A\u671F "+o(d,2)+"%\uFF09",n("tbr-gap").textContent=(b-r>=0?"+":"")+o(b-r,2)+" \u4E2A\u767E\u5206\u70B9\uFF08\u884C\u4E1A "+o(r,2)+"%\uFF09",n("tbr-buy").textContent=T(m),n("tbr-gr").textContent=y(f,2)+"\uFF08\u6309\u8FDB\u9879\u5012\u63A8\uFF09",n("tbr-band").textContent=o(h,2)+"% ~ "+o(x,2)+"%",n("tbr-verdict").textContent=w;for(var g=[["\u9500\u9879\u7A0E\u989D",T(c),"\u6309\u5F00\u7968\u9500\u552E\u989D\u8BA1"],["\u672C\u6708\u8FDB\u9879\u7A0E\u989D",T(v),"\u5DF2\u8BA4\u8BC1\u62B5\u6263\u90E8\u5206"],["\u671F\u521D\u7559\u62B5",T(i),i>0?"\u672C\u671F\u5DF2\u62B5\u51CF":"\u65E0"],["\u5E94\u4EA4\u589E\u503C\u7A0E",T(l),"\u9500\u9879 \u2212 \u8FDB\u9879 \u2212 \u7559\u62B5"],["\u57CE\u5EFA\u7A0E\u53CA\u9644\u52A0",T(u),y(s,0)+" \u5408\u8BA1\u7387"],["\u589E\u503C\u7A0E\u7A0E\u8D1F\u7387",o(b,2)+"%","\u5E94\u4EA4\u589E\u503C\u7A0E \xF7 \u4E0D\u542B\u7A0E\u9500\u552E\u989D"]],M="",E=0;E<g.length;E++)M+="<tr"+(E===3||E===5?' class="c-info"':"")+'><td class="tal">'+g[E][0]+"</td><td>"+g[E][1]+'</td><td class="tal">'+g[E][2]+"</td></tr>";n("tbr-body").innerHTML=M,n("tbr-note").textContent="\u7A0E\u8D1F\u7387\u662F\u4E2A\u6BD4\u503C\uFF0C\u4E0D\u662F\u7A0E\u3002\u504F\u4F4E\u901A\u5E38\u4E09\u6761\u8DEF\uFF1A\u8FDB\u9879\u591A\uFF08\u5907\u8D27\u3001\u8BBE\u5907\u96C6\u4E2D\u91C7\u8D2D\uFF09\u3001\u4EAB\u53D7\u4F18\u60E0\uFF08\u514D\u7A0E/\u5373\u5F81\u5373\u9000\uFF09\u3001\u6216\u8005\u6536\u5165\u6CA1\u5F00\u7968\u2014\u2014\u524D\u4E24\u6761\u89E3\u91CA\u5F97\u6E05\uFF0C\u7B2C\u4E09\u6761\u89E3\u91CA\u4E0D\u6E05\u3002\u504F\u9AD8\u591A\u534A\u662F\u300C\u6709\u9500\u9879\u6CA1\u8FDB\u9879\u300D\uFF0C\u5E38\u89C1\u4E8E\u5BA2\u6237\u8981\u7968\u3001\u4F9B\u5E94\u5546\u4E0D\u7ED9\u7968\u3002\u7559\u5B58\u597D\u8FDB\u9500\u9879\u53F0\u8D26\u548C\u5408\u540C\uFF0C\u88AB\u95EE\u5230\u65F6\u80FD\u5F53\u573A\u5BF9\u4E0A\uFF0C\u6BD4\u4E8B\u540E\u627E\u53D1\u7968\u6709\u7528\u3002"}k(P,"calcTaxBurden");function H(){var e=Math.max(0,t(n("rf-exp"),0)),c=Math.max(0,t(n("rf-reb"),0))/100,v=Math.max(0,t(n("rf-rate"),0))/100,i=Math.max(0,t(n("rf-lag"),0)),d=Math.max(0,t(n("rf-audit"),0)),r=Math.max(0,t(n("rf-cost"),0))/100,s=e*c,l=i+d,p=s*l/30,b=p*r,u=e*Math.max(0,v-c),m=s*10/30*r,f=45,h=s*f/30,x=h*r;n("rf-big").textContent=a(p),n("rf-month").textContent=T(s),n("rf-year").textContent=T(s*12),n("rf-days").textContent=o(l,0)+" \u5929\uFF08\u7533\u62A5\u6EDE\u540E "+o(i,0)+" + \u5BA1\u6838\u5230\u8D26 "+o(d,0)+"\uFF09",n("rf-costv").textContent=T(b)+"\uFF08\u5E74\u5316 "+y(r,1)+"\uFF09",n("rf-gap").textContent=u>0?T(u)+"/\u6708\uFF0C\u5168\u5E74 "+a(u*12)+" \u5143":"\u65E0\uFF08\u5F81\u9000\u7A0E\u7387\u76F8\u540C\uFF09",n("rf-ten").textContent=T(m),n("rf-opt").textContent="\u5728\u9014 "+a(h)+" \u5143\uFF0C\u6210\u672C "+a(x)+" \u5143\uFF0C\u7701 "+a(b-x)+" \u5143/\u5E74",n("rf-advice").textContent=l>60?"\u538B\u7F29\u7533\u62A5\u6EDE\u540E\u6700\u5212\u7B97\uFF1A\u5355\u8BC1\u9F50\u5168\u5C31\u62A5\uFF0C\u522B\u6512\u5230\u6708\u5E95":"\u5468\u671F\u5DF2\u7ECF\u4E0D\u6162\uFF0C\u91CD\u70B9\u8F6C\u5230\u5F81\u9000\u5DEE\u4E0E\u8FDB\u9879\u7BA1\u7406";for(var C=[["\u51FA\u53E3 \u2192 \u7533\u62A5",i,s*i/30,s*i/30*r],["\u7533\u62A5 \u2192 \u5BA1\u6838 \u2192 \u5230\u8D26",d,s*d/30,s*d/30*r],["\u5408\u8BA1",l,p,b]],w="",g=0;g<C.length;g++)w+="<tr"+(g===2?' class="c-info"':"")+'><td class="tal">'+C[g][0]+"</td><td>"+o(C[g][1],0)+" \u5929</td><td>"+a(C[g][2])+"</td><td>"+a(C[g][3])+"</td></tr>";n("rf-body").innerHTML=w,n("rf-note").textContent="\u9000\u7A0E\u6B3E\u4E0D\u662F\u300C\u56FD\u5BB6\u7684\u94B1\u665A\u70B9\u7ED9\u300D\uFF0C\u662F\u4F60\u5148\u57AB\u7684\u94B1\u3002\u771F\u6B63\u8981\u7BA1\u7684\u662F\u300C\u5E73\u5747\u5728\u9014\u4F59\u989D \xD7 \u8D44\u91D1\u6210\u672C\u300D\uFF0C\u6240\u4EE5\u4E24\u4E2A\u52A8\u4F5C\u6700\u6709\u6548\uFF1A\u5355\u8BC1\u9F50\u4E86\u9A6C\u4E0A\u7533\u62A5\uFF08\u522B\u7B49\u6708\u672B\u51D1\u6279\uFF09\u3001\u628A\u51FA\u53E3\u53D1\u7968\u548C\u62A5\u5173\u5355\u4FE1\u606F\u63D0\u524D\u5BF9\u9F50\u51CF\u5C11\u9000\u56DE\u91CD\u62A5\u3002\u53E6\u5916\u5F81\u9000\u7A0E\u7387\u4E4B\u5DEE\uFF08\u672C\u4F8B "+y(Math.max(0,v-c),1)+"\uFF09\u662F\u6C38\u4E45\u6027\u6210\u672C\uFF0C\u8FDB\u9879\u4E0D\u8DB3\u65F6\u8FD9\u90E8\u5206\u8F6C\u4E0D\u56DE\u6765\uFF0C\u62A5\u4EF7\u65F6\u5C31\u8981\u542B\u8FDB\u53BB\uFF0C\u522B\u7B49\u5230\u5E74\u5E95\u624D\u53D1\u73B0\u6BDB\u5229\u88AB\u5403\u6389\u3002"}k(H,"calcRefundFlow");function I(){var e=Math.max(0,t(n("txj-rev"),0)),c=t(n("txj-profit"),0),v=Math.max(0,t(n("txj-ent"),0)),i=Math.max(0,t(n("txj-ad"),0)),d=Math.max(0,t(n("txj-fine"),0)),r=Math.max(0,t(n("txj-don"),0)),s=Math.max(0,t(n("txj-rd"),0)),l=Math.max(0,t(n("txj-rdr"),0))/100,p=Math.max(0,t(n("txj-pre"),0)),b=Math.min(v*.6,e*.005),u=Math.max(0,v-b),m=e*.15,f=Math.max(0,i-m),h=Math.max(0,c)*.12,x=Math.max(0,r-h),C=s*l,w=c+u+f+d+x-C,g=w*.25,M=g-p;n("txj-big").textContent=o(w,2),n("txj-entv").textContent=o(b,2)+" / +"+o(u,2)+" \u4E07\u5143",n("txj-adv").textContent=o(m,2)+" / +"+o(f,2)+" \u4E07\u5143"+(f>0?"\uFF08\u8D85\u652F\u53EF\u7ED3\u8F6C\u4EE5\u540E\u5E74\u5EA6\uFF09":""),n("txj-donv").textContent=o(h,2)+" / +"+o(x,2)+" \u4E07\u5143",n("txj-finev").textContent="+"+o(d,2)+" \u4E07\u5143\uFF08\u5168\u989D\u8C03\u589E\uFF09",n("txj-rdv").textContent="-"+o(C,2)+" \u4E07\u5143\uFF08"+y(l,0)+" \u52A0\u8BA1\uFF09",n("txj-tax").textContent=o(g,2)+" / "+o(p,2)+" \u4E07\u5143",n("txj-due").textContent=(M>=0?"\u8865\u7F34 ":"\u53EF\u9000 ")+o(Math.abs(M),2)+" \u4E07\u5143",n("txj-rate").textContent=e>0?y(g/e,2)+"\uFF08\u6240\u5F97\u7A0E \xF7 \u6536\u5165\uFF09":"\u2014";for(var E=[["\u4F1A\u8BA1\u5229\u6DA6\u603B\u989D",c,"\u8D77\u70B9"],["\u4E1A\u52A1\u62DB\u5F85\u8D39\u8D85\u9650",u,u>0?"\u8C03\u589E":"\u65E0\u8C03\u6574"],["\u5E7F\u544A\u5BA3\u4F20\u8D39\u8D85\u9650",f,f>0?"\u8C03\u589E\uFF08\u53EF\u7ED3\u8F6C\uFF09":"\u65E0\u8C03\u6574"],["\u7F5A\u6B3E\u3001\u6EDE\u7EB3\u91D1\u3001\u8D5E\u52A9",d,"\u8C03\u589E\uFF08\u6C38\u4E45\u6027\uFF09"],["\u516C\u76CA\u6027\u6350\u8D60\u8D85\u9650",x,x>0?"\u8C03\u589E":"\u65E0\u8C03\u6574"],["\u7814\u53D1\u8D39\u7528\u52A0\u8BA1\u6263\u9664",-C,"\u8C03\u51CF"],["\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D",w,"\xD725% = "+o(g,2)+" \u4E07\u5143"]],A="",S=0;S<E.length;S++){var _=S===0||S===6?' class="c-info"':E[S][1]!==0?' class="c-warn"':"";A+="<tr"+_+'><td class="tal">'+E[S][0]+"</td><td>"+(E[S][1]>0&&S>0&&S<6?"+":"")+o(E[S][1],2)+'</td><td class="tal">'+E[S][2]+"</td></tr>"}n("txj-body").innerHTML=A,n("txj-note").textContent="\u6C47\u7B97\u5C31\u662F\u628A\u4F1A\u8BA1\u5229\u6DA6\u6309\u7A0E\u6CD5\u91CD\u7B97\u4E00\u904D\uFF0C\u65B9\u5411\u53EA\u6709\u4E24\u4E2A\uFF1A\u4E0D\u8BA9\u6263\u7684\u8C03\u589E\uFF08\u7F5A\u6B3E\u3001\u8D85\u9650\u62DB\u5F85\u3001\u8D85\u6807\u6350\u8D60\uFF09\uFF0C\u8BA9\u591A\u6263\u7684\u8C03\u51CF\uFF08\u7814\u53D1\u52A0\u8BA1\u3001\u52A0\u901F\u6298\u65E7\uFF09\u3002\u62DB\u5F85\u8D39\u6C38\u8FDC\u53EA\u6709 60% \u80FD\u6263\u4E14\u4E0D\u8D85\u8FC7\u6536\u5165 5\u2030\uFF0C\u662F\u5178\u578B\u7684\u300C\u5403\u4E00\u534A\u6254\u4E00\u534A\u300D\uFF1B\u5E7F\u544A\u8D39\u8D85\u4E86\u522B\u614C\uFF0C\u53EF\u4EE5\u7ED3\u8F6C\u4EE5\u540E\u5E74\u5EA6\uFF1B\u6350\u8D60\u8981\u533A\u5206\u516C\u76CA\u6027\uFF08\u6709\u8D44\u683C\u7968\u636E\u3001\u9650 12%\uFF09\u4E0E\u975E\u516C\u76CA\u6027\uFF08\u4E00\u5206\u4E0D\u80FD\u6263\uFF09\u3002\u672C\u4F8B\u4F1A\u8BA1\u5229\u6DA6 "+o(c,2)+" \u4E07\u5143\uFF0C\u8C03\u6574\u540E\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D "+o(w,2)+" \u4E07\u5143\uFF0C\u5E94\u4EA4 "+o(g,2)+" \u4E07\u5143\u3002"}k(I,"calcTaxAdj");function K(){var e=Math.max(0,t(n("dtc-loan"),0)),c=Math.max(0,t(n("dtc-eq"),0)),v=Math.max(0,t(n("dtc-rate"),0))/100,i=Math.max(0,t(n("dtc-bank"),0))/100,d=Math.max(1,t(n("dtc-mult"),2)),r=e*v,s=c*d,l=Math.min(v,i),p=e*l,b=Math.min(e,s)*l,u=b,m=r-u,f=m*.25;n("dtc-big").textContent=o(m,2),n("dtc-ratio").textContent=c>0?o(e/c,2)+" : 1\uFF08\u4E0A\u9650 "+o(d,1)+" : 1\uFF09":"\u2014",n("dtc-lim").textContent=o(s,2)+" \u4E07\u5143\uFF08\u6743\u76CA "+o(c,2)+" \xD7 "+o(d,1)+"\uFF09",n("dtc-paid").textContent=o(r,2)+" \u4E07\u5143",n("dtc-ratecap").textContent=o(p,2)+" \u4E07\u5143\uFF08\u6309 "+y(l,2)+"\uFF09",n("dtc-multcap").textContent=o(b,2)+" \u4E07\u5143",n("dtc-final").textContent=o(u,2)+" / "+o(m,2)+" \u4E07\u5143",n("dtc-tax").textContent=o(f,2)+" \u4E07\u5143",n("dtc-advice").textContent=e>s?"\u8D85\u51FA "+o(e-s,2)+" \u4E07\u5143\uFF1A\u589E\u8D44\u3001\u6539\u80A1\u6743\u878D\u8D44\u6216\u8D70\u94F6\u884C\u59D4\u8D37\u538B\u4F4E\u5173\u8054\u501F\u6B3E":v>i?"\u5229\u7387\u504F\u9AD8\uFF1A\u964D\u5230\u91D1\u878D\u4F01\u4E1A\u540C\u671F\u540C\u7C7B\u6C34\u5E73\u4EE5\u5185":"\u4E24\u9053\u5173\u90FD\u8FC7\uFF0C\u53EF\u5168\u989D\u6263\u9664",n("dtc-note").textContent="\u7A0E\u52A1\u5C40\u67E5\u5173\u8054\u65B9\u501F\u6B3E\u662F\u4E24\u9053\u5173\uFF0C\u5148\u770B\u5229\u7387\uFF08\u4E0D\u9AD8\u4E8E\u91D1\u878D\u4F01\u4E1A\u540C\u671F\u540C\u7C7B\u8D37\u6B3E\u5229\u7387\uFF09\uFF0C\u518D\u770B\u503A\u8D44\u6BD4\uFF08\u975E\u91D1\u878D\u4F01\u4E1A 2:1\u3001\u91D1\u878D 5:1\uFF0C\u6309\u5E74\u5EA6\u5404\u6708\u5E73\u5747\u501F\u6B3E\u4F59\u989D \xF7 \u5404\u6708\u5E73\u5747\u6743\u76CA\u6027\u6295\u8D44\uFF09\u3002\u4E24\u9053\u90FD\u8FC7\u624D\u5168\u989D\u6263\uFF1B\u8D85\u9650\u90E8\u5206\u4E0D\u4EC5\u4E0D\u80FD\u6263\uFF0C\u8FD8\u8981\u6309 25% \u8865\u7A0E\u3002\u5B9E\u52A1\u4E0A\u5E38\u88AB\u5FFD\u7565\u7684\u4E09\u70B9\uFF1A\u4E00\u662F\u6743\u76CA\u6027\u6295\u8D44\u4E0D\u662F\u5B9E\u6536\u8D44\u672C\uFF0C\u662F\u6240\u6709\u8005\u6743\u76CA\uFF08\u542B\u8D44\u672C\u516C\u79EF\u3001\u7559\u5B58\u6536\u76CA\uFF09\uFF1B\u4E8C\u662F\u96C6\u56E2\u5185\u7EDF\u501F\u7EDF\u8FD8\u3001\u59D4\u6258\u8D37\u6B3E\u4E5F\u53EF\u80FD\u88AB\u8BA4\u5B9A\u4E3A\u5173\u8054\u503A\u6743\uFF1B\u4E09\u662F\u540C\u671F\u8D44\u6599\u4E0E\u72EC\u7ACB\u4EA4\u6613\u539F\u5219\u8981\u80FD\u81EA\u8BC1\uFF0C\u5426\u5219\u53EF\u80FD\u88AB\u6838\u5B9A\u8C03\u6574\u3002"}k(K,"calcDebtCap");function O(){var e=Math.max(0,t(n("adp-cost"),0)),c=Math.max(1,t(n("adp-life"),1)),v=Math.min(1,Math.max(0,t(n("adp-salv"),0)/100)),i=Math.min(1,Math.max(0,t(n("adp-tax"),0)/100)),d=Math.max(0,t(n("adp-disc"),0))/100,r=e*(1-v)/c,s=e-r,l=s*i,p=r*i,b=c-1,u=0,m;for(m=1;m<=b;m++)u+=p/Math.pow(1+d,m);var f=l-u,h=l>0?f/l*100:0;n("adp-big").textContent=o(l,2),n("adp-acc").textContent=o(r,2)+" \u4E07\u5143/\u5E74\uFF08"+o(c,0)+" \u5E74\uFF0C\u6B8B\u503C "+y(v,1)+"\uFF09",n("adp-taxdep").textContent=o(e,2)+" \u4E07\u5143\uFF08\u4E00\u6B21\u6027\u5168\u989D\u6263\u9664\uFF09",n("adp-diff").textContent="-"+o(s,2)+" \u4E07\u5143\uFF08\u5F53\u5E74\u7EB3\u7A0E\u8C03\u51CF\uFF09",n("adp-later").textContent=o(r,2)+" / "+o(p,2)+" \u4E07\u5143 \xD7 "+o(b,0)+" \u5E74",n("adp-pv").textContent=o(u,2)+" \u4E07\u5143\uFF08\u6309 "+y(d,1)+" \u6298\u73B0\uFF09",n("adp-net").textContent=o(f,2)+" \u4E07\u5143",n("adp-yield").textContent=o(h,1)+"%\uFF08\u5360\u9012\u5EF6\u7A0E\u6B3E\u7684\u6BD4\u4F8B\uFF09",n("adp-advice").textContent=f>0?"\u80FD\u7528\u5C31\u7528\uFF1A\u7B49\u4E8E\u5411\u7A0E\u5C40\u62FF\u4E86\u4E00\u7B14\u65E0\u606F\u8D37\u6B3E":"\u6298\u73B0\u7387\u592A\u9AD8\u6216\u5E74\u9650\u592A\u77ED\uFF0C\u6536\u76CA\u6709\u9650";var x='<tr><td class="tal">\u7B2C 1 \u5E74</td><td>'+o(r,2)+"</td><td>"+o(e,2)+'</td><td class="tal">\u8C03\u51CF '+o(s,2)+"</td></tr>";for(m=2;m<=c;m++)x+='<tr><td class="tal">\u7B2C '+m+" \u5E74</td><td>"+o(r,2)+"</td><td>"+o(r,2)+'</td><td class="tal">\u8C03\u589E '+o(r,2)+"</td></tr>";n("adp-body").innerHTML=x,n("adp-note").textContent="\u8FD9\u662F\u65F6\u95F4\u6027\u5DEE\u5F02\uFF0C\u4E0D\u662F\u6C38\u4E45\u6027\u4F18\u60E0\uFF1A\u4E00\u6B21\u6027\u6263\u9664\u53EA\u662F\u628A\u6263\u9664\u63D0\u524D\uFF0C\u6574\u4E2A\u5468\u671F\u4EA4\u7684\u7A0E\u4E00\u5206\u4E0D\u5DEE\u3002\u5B83\u7684\u4EF7\u503C\u5728\u4E8E\u300C\u94B1\u7684\u65F6\u95F4\u4EF7\u503C\u300D\u2014\u2014\u5F53\u5E74\u5C11\u4EA4 "+o(l,2)+" \u4E07\u5143\uFF0C\u4EE5\u540E "+o(b,0)+" \u5E74\u9010\u5E74\u8FD8\u56DE\u53BB\uFF0C\u6298\u73B0\u540E\u51C0\u8D5A "+o(f,2)+" \u4E07\u5143\u3002\u6240\u4EE5\uFF1A\u4F01\u4E1A\u5F53\u5E74\u6709\u5229\u6DA6\u3001\u7F3A\u73B0\u91D1\uFF0C\u5C31\u5C3D\u91CF\u7528\uFF1B\u8FDE\u7EED\u4E8F\u635F\u3001\u672C\u6765\u5C31\u4E0D\u4EA4\u7A0E\uFF0C\u7528\u4E86\u53CD\u800C\u6D6A\u8D39\u989D\u5EA6\u3002\u4F1A\u8BA1\u4E0A\u4ECD\u6309\u5E74\u9650\u6298\u65E7\uFF0C\u5F62\u6210\u300C\u9012\u5EF6\u6240\u5F97\u7A0E\u8D1F\u503A\u300D\uFF0C\u62A5\u8868\u8981\u5982\u5B9E\u53CD\u6620\u3002\u6CE8\u610F\u653F\u7B56\u8D44\u683C\uFF08\u884C\u4E1A\u9650\u5236\u3001\u5355\u4F4D\u4EF7\u503C\u6807\u51C6\u3001\u8D2D\u5165\u65F6\u70B9\uFF09\u5404\u5730\u53E3\u5F84\u6709\u5DEE\u5F02\uFF0C\u6309\u5F53\u5E74\u6587\u4EF6\u6267\u884C\u3002"}k(O,"calcAccDep");function Y(){for(var e=Math.max(0,t(n("es-shares"),0)),c=Math.max(0,t(n("es-fair"),0)),v=Math.max(0,t(n("es-strike"),0)),i=Math.max(1,Math.round(t(n("es-years"),1))),d=Math.min(1,Math.max(0,t(n("es-leave"),0)/100)),r=Math.min(1,Math.max(0,t(n("es-tax"),0)/100)),s=Math.max(0,c-v)*1e4,l=e*(1-d),p=s*l/1e4,b=p/i,u=[.4,.3,.2,.1],m=[],f="",h=0,x=0,C=1;C<=i;C++){var w=b,g=C<=4?p*u[C-1]:0;i>4&&C>4&&(g=0),C===1&&(x=g);var M=C===i?p:0;h+=w*r,f+="<tr"+(C===i?' class="c-info"':"")+"><td>\u7B2C "+C+" \u5E74</td><td>"+o(w,2)+"</td><td>"+o(g,2)+"</td><td>"+(M>0?o(M,2):"\u2014")+"</td></tr>"}n("es-body").innerHTML=f,n("es-big").textContent=o(p,2),n("es-per").textContent=o(Math.max(0,c-v),2)+" \u5143/\u80A1\uFF08\u516C\u5141 "+o(c,2)+" \u2212 \u884C\u6743 "+o(v,2)+"\uFF09",n("es-qty").textContent=o(l,2)+" \u4E07\u80A1\uFF08\u6263 "+y(d,0)+" \u79BB\u804C\u7387\uFF09",n("es-flat").textContent=o(b,2)+" \u4E07\u5143\uFF08"+i+" \u5E74\u5300\u901F\uFF09",n("es-acc").textContent=o(x,2)+" \u4E07\u5143",n("es-diff").textContent="\u4F1A\u8BA1\u6BCF\u5E74\u786E\u8BA4 "+o(b,2)+" \u4E07\u5143\uFF0C\u7A0E\u52A1\u4E0A\u5F52\u5C5E\u524D\u4E0D\u6263\u9664 \u2192 \u524D\u671F\u7EB3\u7A0E\u8C03\u589E",n("es-dta").textContent=o(h,2)+" \u4E07\u5143\uFF08"+y(r,0)+"\uFF09",n("es-deduct").textContent=o(p,2)+" \u4E07\u5143\uFF08\u6309\u5DE5\u8D44\u85AA\u91D1\u6263\u9664\uFF09",n("es-advice").textContent=i>4?"\u7B49\u5F85\u671F\u8D8A\u957F\uFF0C\u6BCF\u5E74\u644A\u9500\u8D8A\u8F7B\uFF0C\u4F46\u6FC0\u52B1\u611F\u4E5F\u8D8A\u5F31":"\u5E38\u89C1 3\u20134 \u5E74\u5300\u901F\u5F52\u5C5E\uFF0C\u52A0\u901F\u5F52\u5C5E\u9996\u5E74\u8D39\u7528\u66F4\u91CD",n("es-note").textContent="\u80A1\u4EFD\u652F\u4ED8\u8D39\u7528\u662F\u300C\u4E0D\u82B1\u94B1\u7684\u6210\u672C\u300D\uFF1A\u4E0D\u5F71\u54CD\u73B0\u91D1\u6D41\uFF0C\u4F46\u76F4\u63A5\u538B\u51C0\u5229\u6DA6\uFF0C\u8FD8\u4F1A\u62C9\u4F4E\u6BCF\u80A1\u6536\u76CA\u3002\u603B\u989D\u53EA\u8DDF\u6388\u4E88\u65E5\u516C\u5141\u4EF7\u503C\u3001\u884C\u6743\u4EF7\u3001\u6570\u91CF\u548C\u9884\u8BA1\u79BB\u804C\u7387\u6709\u5173\uFF0C\u8DDF\u4EE5\u540E\u80A1\u4EF7\u6DA8\u8DCC\u65E0\u5173\uFF08\u540E\u7EED\u516C\u5141\u4EF7\u503C\u53D8\u52A8\u4E0D\u518D\u8C03\u6574\uFF09\u3002\u5173\u952E\u5DEE\u5F02\u5728\u65F6\u70B9\uFF1A\u4F1A\u8BA1\u5728\u7B49\u5F85\u671F\u5185\u5206\u671F\u786E\u8BA4\uFF0C\u7A0E\u52A1\u8981\u7B49\u5F52\u5C5E/\u89E3\u7981\u3001\u6309\u300C\u516C\u5141\u4EF7\u503C \u2212 \u884C\u6743\u4EF7\u300D\u4F5C\u4E3A\u5DE5\u8D44\u85AA\u91D1\u624D\u80FD\u6263\uFF0C\u6240\u4EE5\u524D\u51E0\u5E74\u4F1A\u8BA1\u8D39\u7528\u591A\u3001\u7A0E\u4E0A\u4E0D\u8BA9\u6263\uFF08\u8C03\u589E\u5E76\u786E\u8BA4\u9012\u5EF6\u6240\u5F97\u7A0E\u8D44\u4EA7\uFF09\uFF0C\u5F52\u5C5E\u90A3\u5E74\u4E00\u6B21\u6027\u5927\u989D\u6263\u9664\u3002\u53E6\u5916\u6CE8\u610F\uFF1A\u6FC0\u52B1\u5BF9\u8C61\u4E2A\u7A0E\u6309\u300C\u5DE5\u8D44\u85AA\u91D1\u300D\u5355\u72EC\u8BA1\u7A0E\u7684\u4F18\u60E0\u653F\u7B56\u3001\u4EE5\u53CA\u96C6\u56E2\u5185\u8DE8\u4E3B\u4F53\u6388\u4E88\u8FD8\u8981\u8003\u8651\u8D39\u7528\u7531\u8C01\u627F\u62C5\u3002"}k(Y,"calcEsop");function B(){var e=Math.max(0,t(n("rd-labor"),0)),c=Math.max(0,t(n("rd-mat"),0)),v=Math.max(0,t(n("rd-dep"),0)),i=Math.max(0,t(n("rd-other"),0)),d=Math.max(0,t(n("rd-pct"),0))/100,r=Math.min(1,Math.max(0,t(n("rd-tax"),0)/100)),s=e+c+v,l=s/9*.1*1;l=s/(1-.1)*.1;var p=Math.min(i,l),b=s+p,u=b*d,m=u*r,f=e+c+v+i,h=Math.max(0,i-p),x=f>0?1-m/f:0;n("rd-big").textContent=o(u,2),n("rd-total").textContent=o(f,2)+" \u4E07\u5143",n("rd-cap").textContent=o(l,2)+" \u4E07\u5143\uFF08\u524D\u4E09\u9879 \xF7 9 \xD7 1\uFF09",n("rd-effect").textContent=o(p,2)+" \u4E07\u5143"+(h>0?"\uFF08\u8D85\u9650 "+o(h,2)+" \u4E0D\u80FD\u52A0\u8BA1\uFF09":"\uFF08\u672A\u8D85\u9650\uFF0C\u5168\u989D\u8BA1\u5165\uFF09"),n("rd-base").textContent=o(b,2)+" \u4E07\u5143",n("rd-save").textContent=y(d,0)+" \u52A0\u8BA1 / \u5C11\u7F34 "+o(m,2)+" \u4E07\u5143",n("rd-eff").textContent="\u5B9E\u9645\u8D1F\u62C5 "+y(x,2)+"\uFF08\u76F8\u5F53\u4E8E\u6BCF 100 \u4E07\u7814\u53D1\u53EA\u82B1 "+o(x*100,2)+" \u4E07\uFF09",n("rd-lost").textContent=h>0?o(h,2)+" \u4E07\u5143":"\u65E0";for(var C=[["\u4EBA\u5458\u4EBA\u5DE5\u8D39\u7528",e,"\u53EF\u4EE5"],["\u76F4\u63A5\u6295\u5165\u8D39\u7528",c,"\u53EF\u4EE5"],["\u6298\u65E7 / \u644A\u9500",v,"\u53EF\u4EE5"],["\u5176\u4ED6\u76F8\u5173\u8D39\u7528",i,p>=i?"\u53EF\u4EE5":"\u90E8\u5206\u53EF\u4EE5\uFF08"+o(p,2)+"\uFF09"]],w="",g=0;g<C.length;g++)w+="<tr"+(g===3&&h>0?' class="c-warn"':"")+'><td class="tal">'+C[g][0]+"</td><td>"+o(C[g][1],2)+'</td><td class="tal">'+C[g][2]+"</td></tr>";n("rd-body").innerHTML=w,n("rd-note").textContent="\u52A0\u8BA1\u6263\u9664\u7B49\u4E8E\u56FD\u5BB6\u66FF\u4F60\u5206\u62C5\u4E00\u90E8\u5206\u7814\u53D1\u6210\u672C\uFF1A\u6309 "+y(d,0)+" \u52A0\u8BA1\u3001\u7A0E\u7387 "+y(r,0)+"\uFF0C\u5C31\u662F\u7814\u53D1\u652F\u51FA\u7684 "+y(d*r,0)+" \u80FD\u5C11\u7F34\u7A0E\uFF0C\u672C\u4F8B "+o(m,2)+" \u4E07\u5143\u3002\u4E09\u4E2A\u5BB9\u6613\u8E29\u7684\u70B9\uFF1A\u5176\u4ED6\u76F8\u5173\u8D39\u7528\u6709 10% \u9650\u989D\uFF08\u7B97\u6CD5\u662F\u524D\u4E09\u9879 \xF7 9 \xD7 1\uFF0C\u4E0D\u662F\u7B80\u5355\u4E58 10%\uFF09\uFF1B\u5931\u8D25\u7684\u7814\u53D1\u6D3B\u52A8\u3001\u5E38\u89C4\u6027\u5347\u7EA7\u3001\u4EA7\u54C1\u76F4\u63A5\u76F8\u5173\u7684\u5916\u89C2\u8BBE\u8BA1\u4E0D\u7B97\uFF1B\u5F62\u6210\u65E0\u5F62\u8D44\u4EA7\u7684\u6309\u8D44\u672C\u5316\u91D1\u989D\u7684 200% \u644A\u9500\uFF0C\u4E0D\u80FD\u65E2\u8D39\u7528\u5316\u53C8\u8D44\u672C\u5316\u3002\u53E6\u5916\u8981\u7559\u5B58\u7ACB\u9879\u51B3\u8BAE\u3001\u7814\u53D1\u4EBA\u5458\u540D\u5355\u3001\u5DE5\u65F6\u4E0E\u8D39\u7528\u5F52\u96C6\u8868\uFF0C\u62BD\u67E5\u65F6\u62FF\u4E0D\u51FA\u5C31\u662F\u5168\u989D\u5254\u9664\u3002"}k(B,"calcRdExp");function U(){var e=t(n("ggr-amt"),0),c=Math.max(1,Math.round(t(n("ggr-years"),1))),v=t(n("ggr-tax"),25)/100,i=t(n("ggr-rate"),5)/100,d=n("ggr-type").value!=="income",r=d?c:1,s=e/r,l=s/12,p=i>0?(1-Math.pow(1+i,-r))/i:r,b=s*v*p,u=e*v-b,m=b,f=u<=m;n("ggr-big").textContent=a(d?l:e),n("ggr-year").textContent=a(s)+" \u5143\uFF08"+r+" \u5E74\u644A\u5B8C\uFF09",n("ggr-taxnow").textContent=a(e*v)+" \u5143",n("ggr-pvded").textContent=a(b)+" \u5143",n("ggr-pv1").textContent=a(u)+" \u5143",n("ggr-pv2").textContent=a(m)+" \u5143",n("ggr-pick").textContent=f?"\u4F5C\u5E94\u7A0E\u6536\u5165\u66F4\u5212\u7B97\uFF0C\u73B0\u503C\u7701 "+a(m-u)+" \u5143":"\u4F5C\u4E0D\u5F81\u7A0E\u6536\u5165\u66F4\u5212\u7B97\uFF0C\u73B0\u503C\u7701 "+a(u-m)+" \u5143",n("ggr-note").textContent="\u300C\u4E0D\u5F81\u7A0E\u6536\u5165\u300D\u4E0D\u662F\u514D\u7A0E\uFF1A\u62FF\u4E86\u5B83\uFF0C\u5BF9\u5E94\u7684\u652F\u51FA\uFF08\u6298\u65E7\u3001\u8D39\u7528\uFF09\u5C31\u4E0D\u80FD\u7A0E\u524D\u6263\u9664\uFF0C\u4E00\u514D\u4E00\u6263\u4E92\u76F8\u62B5\u6D88\uFF0C\u53EA\u5269\u8D44\u91D1\u65F6\u95F4\u4EF7\u503C\u3002\u6240\u4EE5\u5BF9\u4E8F\u635F\u6216\u4F4E\u7A0E\u7387\u4F01\u4E1A\uFF0C\u653E\u5F03\u4E0D\u5F81\u7A0E\u3001\u6309\u5E94\u7A0E\u5904\u7406\u5F80\u5F80\u66F4\u5212\u7B97\uFF08\u5F53\u5E74\u4EA4\u7A0E\u4F46\u6298\u65E7\u80FD\u62B5\u3001\u4E8F\u635F\u8FD8\u80FD\u5F25\u8865\uFF09\u3002\u8981\u4EAB\u53D7\u4E0D\u5F81\u7A0E\uFF0C\u5F97\u6EE1\u8DB3\u4E13\u9879\u7528\u9014\u3001\u4E13\u6B3E\u4E13\u7528\u3001\u5355\u72EC\u6838\u7B97\u3001\u6709\u8D44\u91D1\u62E8\u4ED8\u6587\u4EF6\u8FD9\u51E0\u4E2A\u6761\u4EF6\uFF0C\u800C\u4E14 5 \u5E74\uFF0860 \u4E2A\u6708\uFF09\u5185\u6CA1\u82B1\u5B8C\u8981\u9000\u56DE\u3002 \u4F1A\u8BA1\u4E0A\uFF1A\u4E0E\u8D44\u4EA7\u76F8\u5173\u7684\u5148\u8BB0\u9012\u5EF6\u6536\u76CA\u3001\u6309\u8D44\u4EA7\u4F7F\u7528\u5BFF\u547D\u5206\u671F\u8FDB\u5176\u4ED6\u6536\u76CA\uFF1B\u4E0E\u6536\u76CA\u76F8\u5173\u7684\u8865\u5DF2\u53D1\u751F\u8D39\u7528\u76F4\u63A5\u8FDB\u5F53\u671F\uFF0C\u8865\u4EE5\u540E\u671F\u95F4\u7684\u8D39\u7528\u5148\u8BB0\u9012\u5EF6\u6536\u76CA\u3002\u4E0E\u65E5\u5E38\u6D3B\u52A8\u65E0\u5173\u7684\u8865\u52A9\u624D\u8FDB\u8425\u4E1A\u5916\u6536\u5165\u3002"}k(U,"calcGovGrant");function V(){var e=t(n("rdc-total"),0),c=t(n("rdc-cap"),0)/100,v=Math.max(1,t(n("rdc-years"),5)),i=Math.min(12,Math.max(1,t(n("rdc-months"),6))),d=t(n("rdc-tax"),0)/100,r=e*c,s=e-r,l=r/v,p=l*i/12,b=s+p,u=e-b,m=u*(1-d),f=s+p*2,h=f*d,x=r-p;n("rdc-big").textContent=a(b),n("rdc-split").textContent=a(s)+" / "+a(r)+" \u5143\uFF08\u8D44\u672C\u5316\u7387 "+y(c,1)+"\uFF09",n("rdc-amort").textContent=a(p)+" \u5143\uFF08\u6BCF\u5E74 "+a(l)+"\uFF0C\u5F53\u5E74\u644A "+i+" \u4E2A\u6708\uFF09",n("rdc-gain").textContent=a(u)+" \u5143\uFF08\u5168\u90E8\u8D39\u7528\u5316\u4F1A\u662F "+a(e)+"\uFF09",n("rdc-np").textContent=a(m)+" \u5143\uFF08\u7A0E\u7387 "+y(d,0)+"\uFF09",n("rdc-add").textContent=a(f)+" \u5143\uFF08\u8D39\u7528\u5316 "+a(s)+" \uFF0B \u644A\u9500 "+a(p)+" \xD72\uFF09",n("rdc-taxout").textContent=a(h)+" \u5143",n("rdc-left").textContent=a(x)+" \u5143\uFF0C\u5269\u4F59 "+o((v*12-i)/12,1)+" \u5E74",n("rdc-note").textContent="\u8D44\u672C\u5316\u7684\u95E8\u69DB\u662F\u516D\u4E2A\u6761\u4EF6\u540C\u65F6\u6EE1\u8DB3\uFF1A\u6280\u672F\u4E0A\u53EF\u884C\u3001\u6709\u4F7F\u7528\u6216\u51FA\u552E\u610F\u56FE\u3001\u80FD\u5E26\u6765\u7ECF\u6D4E\u5229\u76CA\u3001\u8D44\u6E90\u5145\u8DB3\u3001\u652F\u51FA\u80FD\u53EF\u9760\u8BA1\u91CF\u3001\u5F00\u53D1\u9636\u6BB5\uFF08\u7814\u7A76\u9636\u6BB5\u4E00\u5F8B\u8D39\u7528\u5316\uFF09\u3002\u5B9E\u52A1\u91CC\u6700\u5BB9\u6613\u51FA\u9519\u7684\u662F\u300C\u7ACB\u9879\u5C31\u8D44\u672C\u5316\u300D\u2014\u2014\u53EF\u884C\u6027\u8FD8\u6CA1\u9A8C\u8BC1\u5C31\u8F6C\u65E0\u5F62\u8D44\u4EA7\uFF0C\u5C5E\u4E8E\u5178\u578B\u7684\u9AD8\u4F30\u5229\u6DA6\u3002\u7A0E\u52A1\u4E0A\u8D39\u7528\u5316\u90E8\u5206\u53EF\u6309 100% \u52A0\u8BA1\u6263\u9664\u3001\u8D44\u672C\u5316\u90E8\u5206\u6309 200% \u644A\u9500\uFF08\u73B0\u884C\u653F\u7B56\uFF0C\u6309\u6700\u65B0\u6587\u4EF6\u6267\u884C\uFF09\uFF0C\u6240\u4EE5\u8D44\u672C\u5316\u4F1A\u63A8\u8FDF\u52A0\u8BA1\u6263\u9664\u3001\u4E5F\u8BA9\u5F53\u671F\u7A0E\u8D1F\u5148\u9AD8\u540E\u4F4E\uFF1B\u8F6F\u4EF6\u3001\u533B\u836F\u8FD9\u7C7B\u9879\u76EE\u8FD8\u8981\u6CE8\u610F\u644A\u9500\u5E74\u9650\u4E0D\u77ED\u4E8E 10 \u5E74\uFF08\u90E8\u5206\u60C5\u5F62\uFF09\u4E0E\u51CF\u503C\u6D4B\u8BD5\u3002\u8D44\u672C\u5316\u53EA\u662F\u628A\u5229\u6DA6\u5F80\u540E\u632A\uFF0C\u4E0D\u662F\u51ED\u7A7A\u591A\u8D5A "+a(u)+" \u5143\u3002"}k(V,"calcRdCap");function q(){var e=t(n("rdt-rebate"),0),c=t(n("rdt-return"),0),v=t(n("rdt-stock"),0),i=t(n("rdt-tax"),0)/100,d=e+c,r=d*i,s=(e+c-v)*(1-i)-v*0,l=v;n("rdt-big").textContent=a(r),n("rdt-td").textContent=a(d)+" \u5143\uFF08\u8FD4\u5229 "+a(e)+" \uFF0B \u9000\u8D27 "+a(c)+"\uFF09",n("rdt-add").textContent=a(d)+" \u5143\uFF08\u7A0E\u6CD5\u8981\u7B49\u5B9E\u9645\u652F\u4ED8/\u5B9E\u9645\u9000\u8D27\u624D\u8BA4\uFF09",n("rdt-cash").textContent="\u5F53\u671F\u591A\u7F34 "+a(r)+"\uFF0C\u5B9E\u9645\u53D1\u751F\u65F6\u5C11\u7F34 "+a(r)+" \u5143",n("rdt-same").textContent=a(l)+" \u5143\uFF08\u9000\u8D27\u5B58\u8D27\u6210\u672C\u51B2\u56DE\uFF0C\u8D26\u7A0E\u4E00\u81F4\uFF09",n("rdt-pl").textContent=a(s)+" \u5143\uFF08\u6536\u5165\u51B2\u51CF "+a(e+c)+"\uFF0C\u7A0E\u540E "+a((e+c)*(1-i))+"\uFF0C\u6263\u9664\u5B58\u8D27\u6210\u672C\u540E\uFF09",n("rdt-note").textContent="\u4F1A\u8BA1\u6309\u6743\u8D23\u53D1\u751F\u5236\u5148\u51B2\u6536\u5165\u3001\u786E\u8BA4\u300C\u5E94\u4ED8\u9000\u8D27\u9000\u6B3E\u300D\u548C\u300C\u9884\u8BA1\u8D1F\u503A\u300D\uFF0C\u7A0E\u6CD5\u53EA\u8BA4\u5B9E\u9645\u53D1\u751F\u5E76\u6709\u5408\u6CD5\u51ED\u636E\u7684\u90E8\u5206\uFF0C\u4E8E\u662F\u5F62\u6210\u53EF\u62B5\u6263\u6682\u65F6\u6027\u5DEE\u5F02 "+a(d)+"\uFF0C\u786E\u8BA4\u9012\u5EF6\u6240\u5F97\u7A0E\u8D44\u4EA7 "+a(r)+"\uFF0C\u540C\u65F6\u5F53\u671F\u7EB3\u7A0E\u8C03\u589E\u3002\u6CE8\u610F\u4E09\u70B9\uFF1A\u2460 \u8FD4\u5229\u8981\u51ED\u7EA2\u5B57\u53D1\u7968\u6216\u5BF9\u65B9\u5F00\u5177\u7684\u6536\u6B3E\u51ED\u8BC1\u624D\u80FD\u6263\uFF0C\u5149\u6709\u5408\u540C\u548C\u8BA1\u63D0\u8868\u4E0D\u884C\uFF1B\u2461 \u9000\u8D27\u7684\u5B58\u8D27\u6210\u672C\u90E8\u5206\uFF08"+a(v)+"\uFF09\u8D26\u7A0E\u4E00\u81F4\uFF0C\u4E0D\u4EA7\u751F\u5DEE\u5F02\uFF0C\u522B\u91CD\u590D\u7B97\uFF1B\u2462 \u9012\u5EF6\u6240\u5F97\u7A0E\u8D44\u4EA7\u8981\u8BC4\u4F30\u300C\u672A\u6765\u6709\u6CA1\u6709\u8DB3\u591F\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D\u300D\uFF0C\u8FDE\u7EED\u4E8F\u635F\u7684\u4F01\u4E1A\u8FD9\u90E8\u5206\u8D44\u4EA7\u53EF\u80FD\u786E\u8BA4\u4E0D\u4E86\uFF0C\u8BA1\u63D0\u4E86\u4E5F\u8981\u505A\u51CF\u503C\u3002"}k(q,"calcRebateDTA");function G(){var e=t(n("wlf-wage"),0),c=t(n("wlf-wel"),0),v=t(n("wlf-edu"),0),i=t(n("wlf-union"),0),d=t(n("wlf-tax"),0)/100,r=t(n("wlf-emp"),0),s=t(n("wlf-dis"),0),l=t(n("wlf-avg"),0),p=t(n("wlf-rate"),0)/100,b=e*.14,u=e*.08,m=e*.02,f=Math.max(0,c-b),h=Math.max(0,v-u),x=Math.max(0,i-m),C=f+h+x,w=C*d,g=r*.015,M=Math.max(0,g-s),E=M*l*p,A=Math.min(M,1)>0?l*p:0;n("wlf-big").textContent=a(C),n("wlf-welout").textContent=a(b)+" / "+a(c)+(f>0?"\uFF08\u8D85 "+a(f)+"\uFF09":"\uFF08\u672A\u8D85\uFF09"),n("wlf-eduout").textContent=a(u)+" / "+a(v)+(h>0?"\uFF08\u8D85 "+a(h)+"\uFF0C\u53EF\u7ED3\u8F6C\u4EE5\u540E\u5E74\u5EA6\uFF09":"\uFF08\u672A\u8D85\uFF09"),n("wlf-uniout").textContent=a(m)+" / "+a(i)+(x>0?"\uFF08\u8D85 "+a(x)+"\uFF09":"\uFF08\u672A\u8D85\uFF09"),n("wlf-taxout").textContent=a(w)+" \u5143\uFF08\u8C03\u589E "+a(C)+" \xD7 "+y(d,0)+"\uFF09",n("wlf-gap").textContent=o(g,2)+" \u2212 "+o(s,0)+" = "+o(M,2)+" \u4EBA\uFF08\u6309 1.5% \u5E94\u5B89\u7F6E "+o(g,2)+" \u4EBA\uFF09",n("wlf-fund").textContent=a(E)+" \u5143\uFF08"+o(M,2)+" \u4EBA \xD7 \u5E74\u5747\u5DE5\u8D44 "+a(l)+" \xD7 \u5F81\u6536\u6BD4\u4F8B "+y(p,0)+"\uFF09",n("wlf-save").textContent=a(A)+" \u5143/\u5E74\uFF08\u518D\u591A\u5B89\u7F6E 1 \u4EBA\uFF09",n("wlf-note").textContent="\u4E09\u9879\u7ECF\u8D39\u7684\u6263\u9664\u57FA\u6570\u90FD\u662F\u300C\u5B9E\u9645\u53D1\u653E\u300D\u7684\u5DE5\u8D44\u85AA\u91D1\uFF0C\u8BA1\u63D0\u672A\u53D1\u7684\u4E0D\u7B97\uFF1B\u798F\u5229\u8D39\u8D85 14% \u6C38\u4E45\u6027\u8C03\u589E\uFF08\u4E0D\u80FD\u7ED3\u8F6C\uFF09\uFF0C\u6559\u80B2\u7ECF\u8D39\u8D85 8% \u53EF\u4EE5\u7ED3\u8F6C\u4EE5\u540E\u5E74\u5EA6\u7EE7\u7EED\u6263\uFF0C\u5DE5\u4F1A\u7ECF\u8D39\u8981\u53D6\u5F97\u300A\u5DE5\u4F1A\u7ECF\u8D39\u6536\u5165\u4E13\u7528\u6536\u636E\u300B\u6216\u7A0E\u52A1\u4EE3\u6536\u51ED\u636E\u624D\u80FD\u6263\uFF0C\u53EA\u8BA1\u63D0\u4E0D\u4E0A\u7F34\u7684\u4E0D\u8BA4\u3002\u6B8B\u4FDD\u91D1 = \u5DEE\u989D\u4EBA\u6570 \xD7 \u5E74\u5E73\u5747\u5DE5\u8D44 \xD7 \u5206\u6863\u6BD4\u4F8B\uFF0C\u5B89\u6392\u6B8B\u75BE\u4EBA\u5C31\u4E1A\u6BD4\u4F8B\u8D8A\u9AD8\u5F81\u5F97\u8D8A\u5C11\uFF0C\u5B89\u7F6E 1\u20132 \u7EA7\u6B8B\u75BE\u6216\u91CD\u5EA6\u6B8B\u75BE\u901A\u5E38\u6309 2 \u4EBA\u6298\u7B97\uFF0C\u4E14\u8981\u7B7E 1 \u5E74\u4EE5\u4E0A\u5408\u540C\u3001\u5B9E\u9645\u652F\u4ED8\u4E0D\u4F4E\u4E8E\u6700\u4F4E\u5DE5\u8D44\u3001\u8DB3\u989D\u7F34\u793E\u4FDD\u624D\u7B97\u3002"}k(G,"calcWelfare");function Q(){var e=t(n("itr-input"),0),c=t(n("itr-tax"),0),v=t(n("itr-simple"),0),i=t(n("itr-free"),0),d=t(n("itr-welf"),0),r=t(n("itr-loss"),0),s=c+v+i,l=s>0?(v+i)/s:0,p=e*l,b=d+r,u=p+b,m=e-p;n("itr-big").textContent=a(u),n("itr-ratio").textContent=y(l,2)+"\uFF08\u514D\u7A0E\uFF0B\u7B80\u6613 "+a(v+i)+" \xF7 \u5168\u90E8 "+a(s)+"\uFF09",n("itr-part").textContent=a(p)+" \u5143\uFF08\u65E0\u6CD5\u5212\u5206\u8FDB\u9879 "+a(e)+" \xD7 \u6BD4\u4F8B\uFF09",n("itr-full").textContent=a(d)+" / "+a(r)+" \u5143",n("itr-left").textContent=a(m)+" \u5143\uFF08\u53EA\u5C31\u4E00\u822C\u8BA1\u7A0E\u9879\u76EE\u62B5\u6263\uFF09",n("itr-pct").textContent=e>0?y(u/e,2):"\u2014",n("itr-risk").textContent=a(u*12)+" \u5143\uFF0F\u5E74\uFF08\u6309\u672C\u6708\u6C34\u5E73\u5916\u63A8\uFF0C\u53E6\u52A0\u6BCF\u65E5\u4E07\u5206\u4E4B\u4E94\u6EDE\u7EB3\u91D1\uFF09",n("itr-note").textContent="\u80FD\u5212\u5206\u7684\u6309\u7528\u9014\u76F4\u63A5\u5F52\u96C6\uFF1A\u4E13\u7528\u4E8E\u7B80\u6613\u8BA1\u7A0E\u3001\u514D\u7A0E\u3001\u96C6\u4F53\u798F\u5229\u3001\u4E2A\u4EBA\u6D88\u8D39\u7684\u8FDB\u9879\uFF0C\u4EE5\u53CA\u975E\u6B63\u5E38\u635F\u5931\u5BF9\u5E94\u7684\u8FDB\u9879\uFF0C\u4E00\u5F8B\u4E0D\u5F97\u62B5\u6263\u3001\u5168\u989D\u8F6C\u51FA\uFF1B\u53EA\u6709\u300C\u65E0\u6CD5\u5212\u5206\u300D\u7684\u90E8\u5206\u624D\u6309\u9500\u552E\u989D\u6BD4\u4F8B\u5206\u644A\uFF0C\u516C\u5F0F\u662F\uFF1A\u4E0D\u5F97\u62B5\u6263\u8FDB\u9879 = \u65E0\u6CD5\u5212\u5206\u8FDB\u9879 \xD7\uFF08\u514D\u7A0E\uFF0B\u7B80\u6613\u9500\u552E\u989D \xF7 \u5168\u90E8\u9500\u552E\u989D\uFF09\u3002\u5E38\u89C1\u6F0F\u9879\uFF1A\u98DF\u5802\u5BBF\u820D\u7684\u6C34\u7535\u6C14\u3001\u7ED9\u5458\u5DE5\u53D1\u7684\u81EA\u4EA7\u4EA7\u54C1\u3001\u7BA1\u7406\u4E0D\u5584\u5BFC\u81F4\u7684\u5B58\u8D27\u6BC1\u635F\u3001\u7B80\u6613\u8BA1\u7A0E\u9879\u76EE\u9886\u7528\u7684\u539F\u6750\u6599\uFF1B\u6F0F\u8F6C\u88AB\u67E5\u8981\u8865\u7A0E\u5E76\u52A0\u6536\u6EDE\u7EB3\u91D1\uFF0C\u8FD8\u4F1A\u5F71\u54CD\u7EB3\u7A0E\u4FE1\u7528\u8BC4\u7EA7\u3002\u5E74\u5EA6\u7EC8\u4E86\u8FD8\u8981\u6309\u5168\u5E74\u6570\u636E\u6E05\u7B97\u4E00\u6B21\uFF0C\u5E73\u65F6\u6309\u6708\u5EA6\u6BD4\u4F8B\u8F6C\u51FA\u7684\u5DEE\u989D\u8981\u8C03\u6574\u3002"}k(Q,"calcInputOut");function X(){var e=t(n("sdt-sale"),0),c=t(n("sdt-loan"),0),v=t(n("sdt-lease"),0),i=t(n("sdt-trans"),0),d=t(n("sdt-equity"),0),r=t(n("sdt-capital"),0),s=n("sdt-half").value==="1",l=e*3e-4,p=c*5e-5,b=v*.001,u=i*3e-4,m=d*5e-4,f=r*25e-5,h=l+p+b+u+m+f,x=s?h*.5:h,C=e+c+v+i+d+r;n("sdt-big").textContent=a(x),n("sdt-k1").textContent=a(l)+" / "+a(p)+" \u5143",n("sdt-k2").textContent=a(b)+" / "+a(u)+" \u5143",n("sdt-k3").textContent=a(m)+" / "+a(f)+" \u5143",n("sdt-raw").textContent=a(h)+" \u5143\uFF08\u51CF\u534A\u989D "+a(h-x)+"\uFF09",n("sdt-rate").textContent=C>0?y(x/C,3):"\u2014",n("sdt-tip").textContent="\u82E5\u5408\u540C\u53EA\u5199\u542B\u7A0E\u603B\u4EF7\uFF0C\u6309\u542B\u7A0E\u91D1\u989D\u8BA1\u7A0E\uFF0C\u591A\u7F34 "+a(x*.13/1.13)+" \u5143\u5DE6\u53F3",n("sdt-note").textContent="\u5370\u82B1\u7A0E\u6309\u5408\u540C\u6240\u5217\u91D1\u989D\u8BA1\u5F81\uFF0C\u5408\u540C\u5206\u522B\u5217\u660E\u4EF7\u6B3E\u548C\u589E\u503C\u7A0E\u7684\u53EF\u6309\u4E0D\u542B\u7A0E\u91D1\u989D\u7B97\uFF0C\u6CA1\u5206\u522B\u5217\u660E\u7684\u4ECE\u9AD8\u6309\u542B\u7A0E\u91D1\u989D\uFF0C\u6240\u4EE5\u7B7E\u5408\u540C\u65F6\u628A\u300C\u4E0D\u542B\u7A0E\u4EF7\uFF0B\u7A0E\u7387\uFF0B\u7A0E\u989D\u300D\u5199\u6E05\u695A\u662F\u7701\u94B1\u52A8\u4F5C\u3002\u5E38\u89C1\u5751\uFF1A\u6846\u67B6\u534F\u8BAE\u53EA\u5199\u300C\u6309\u5B9E\u9645\u53D1\u751F\u7ED3\u7B97\u300D\u7684\uFF0C\u5148\u6309 0 \u7533\u62A5\u4F46\u8981\u5728\u5B9E\u9645\u7ED3\u7B97\u65F6\u8865\uFF1B\u540C\u4E00\u5408\u540C\u542B\u4E0D\u540C\u7A0E\u76EE\u8981\u5206\u522B\u8BA1\u7A0E\uFF0C\u4ECE\u9AD8\u9002\u7528\u7A0E\u7387\uFF1B\u7535\u5B50\u5408\u540C\u3001\u8BA2\u5355\u4E5F\u7B97\u5E94\u7A0E\u51ED\u8BC1\u3002\u5C0F\u89C4\u6A21\u7EB3\u7A0E\u4EBA\u3001\u5C0F\u578B\u5FAE\u5229\u4F01\u4E1A\u548C\u4E2A\u4F53\u5DE5\u5546\u6237\u53EF\u4EAB\u300C\u516D\u7A0E\u4E24\u8D39\u300D\u51CF\u534A\uFF08\u653F\u7B56\u6709\u671F\u9650\uFF0C\u6309\u5F53\u671F\u6267\u884C\uFF09\u3002\u5370\u82B1\u7A0E\u4E0D\u8BA1\u5165\u5E94\u4EA4\u7A0E\u8D39\u7684\u300C\u5E94\u4EA4\u589E\u503C\u7A0E\u300D\uFF0C\u800C\u662F\u7A0E\u91D1\u53CA\u9644\u52A0\uFF0C\u4E00\u6B21\u7F34\u6E05\u4E0D\u9000\u7A0E\u3002"}k(X,"calcStampDuty");function z(){var e=t(n("isv-cost"),0),c=t(n("isv-mark"),0)/100,v=t(n("isv-low"),0)/100,i=t(n("isv-high"),0)/100,d=t(n("isv-ta"),0)/100,r=t(n("isv-tb"),0)/100,s=e*(1+c),l=s-e,p=s*r-l*d,b=s*.06,u=Math.max(0,c-i)*e;n("isv-big").textContent=a(p),n("isv-fee").textContent=a(s)+" \u5143\uFF08\u6210\u672C "+a(e)+" \xD7(1\uFF0B"+y(c,1)+")\uFF09",n("isv-add").textContent=a(l)+" \u5143\uFF08\u7559\u5B58\u5728 "+y(d,0)+" \u7A0E\u7387\u65B9\uFF09",n("isv-range").textContent=y(c,2)+" vs "+y(v,1)+"\u2013"+y(i,1)+(c>=v&&c<=i?"\uFF08\u5728\u533A\u95F4\u5185\uFF09":"\uFF08\u8D85\u51FA\u533A\u95F4\uFF0C\u6709\u8C03\u6574\u98CE\u9669\uFF09"),n("isv-vat").textContent=a(b)+" \u5143\uFF08\u63A5\u6536\u65B9\u53D6\u5F97\u4E13\u7968\u53EF\u62B5\uFF0C\u96C6\u56E2\u5185\u4E0D\u589E\u8D1F\uFF09",n("isv-vatcost").textContent=a(b)+" \u5143\u4F1A\u53D8\u6210\u771F\u5B9E\u6210\u672C",n("isv-adj").textContent=u>0?"\u52A0\u6210\u989D\u8C03\u51CF "+a(u)+" \u5143\uFF0C\u63A5\u6536\u65B9\u8865\u7A0E "+a(u*r)+" \u5143":"\u65E0\uFF08\u533A\u95F4\u5185\u4E0D\u8C03\u6574\uFF09",n("isv-note").textContent="\u5173\u8054\u65B9\u670D\u52A1\u8D39\u8981\u8FC7\u4E09\u9053\u5173\uFF1A\u2460 \u53D7\u76CA\u6027\u6D4B\u8BD5\u2014\u2014\u63A5\u6536\u65B9\u771F\u7684\u83B7\u5F97\u4E86\u670D\u52A1\u3001\u6709\u5B9E\u8D28\u5185\u5BB9\uFF08\u6709\u5408\u540C\u3001\u6709\u6210\u679C\u3001\u6709\u5B9A\u4EF7\u4F9D\u636E\uFF09\uFF0C\u6BCD\u516C\u53F8\u300C\u7BA1\u7406\u8D39\u300D\u7B3C\u7EDF\u644A\u6D3E\u4E0D\u4E88\u6263\u9664\uFF1B\u2461 \u5B9A\u4EF7\u7B26\u5408\u72EC\u7ACB\u4EA4\u6613\u539F\u5219\uFF0C\u5E38\u7528\u6210\u672C\u52A0\u6210\u6CD5\uFF0C\u52A0\u6210\u7387\u843D\u5728\u53EF\u6BD4\u533A\u95F4 "+y(v,1)+"\u2013"+y(i,1)+" \u5185\uFF1B\u2462 \u6709\u540C\u671F\u8D44\u6599\uFF08\u672C\u5730\u6587\u6863\uFF09\uFF0C\u91D1\u989D\u8FBE\u5230\u95E8\u69DB\u7684\u8981\u51C6\u5907\u4E3B\u4F53\u6587\u6863\u4E0E\u56FD\u522B\u62A5\u544A\u3002\u8282\u7A0E\u7684\u539F\u7406\u662F\u628A\u5229\u6DA6\u4ECE\u9AD8\u7A0E\u7387\u4E3B\u4F53\u632A\u5230\u4F4E\u7A0E\u7387\u4E3B\u4F53\uFF0C\u672C\u4F8B\u51C0\u7701 "+a(p)+" \u5143\uFF0C\u4F46\u5982\u679C\u4E24\u8FB9\u7A0E\u7387\u76F8\u540C\uFF0C\u9664\u4E86\u589E\u52A0\u5408\u89C4\u6210\u672C\u6CA1\u6709\u4EFB\u4F55\u597D\u5904\uFF1B\u82E5\u63A5\u6536\u65B9\u662F\u4E8F\u635F\u4F01\u4E1A\uFF0C\u5F53\u671F\u7701\u4E0D\u4E86\u7A0E\u53CD\u800C\u66F4\u4E8F\u3002\u589E\u503C\u7A0E 6% \u5728\u73B0\u4EE3\u670D\u52A1\u4E1A\uFF0C\u63A5\u6536\u65B9\u4E0D\u80FD\u62B5\u6263\uFF08\u5982\u7528\u4E8E\u7B80\u6613\u8BA1\u7A0E\u3001\u514D\u7A0E\u9879\u76EE\uFF09\u65F6\uFF0C"+a(b)+" \u5143\u5C31\u662F\u51C0\u6210\u672C\u3002"}k(z,"calcIntSvc");function J(){var e=t(n("exc-usd"),0),c=t(n("exc-fx"),0),v=t(n("exc-inv"),0),i=t(n("exc-rec"),0),d=t(n("exc-rate"),0)/100,r=t(n("exc-credit"),0),s=e*c,l=v-s,p=e>0?i/e:0,b=s*d,u=Math.min(b,r),m=b-u,f=s*(.13-d);n("exc-big").textContent=a(u),n("exc-cny").textContent=a(s)+" \u5143",n("exc-diff").textContent=a(l)+" \u5143\uFF08"+y(s>0?l/s:0,2)+"\uFF09"+(Math.abs(s>0?l/s:0)>.05?"\uFF0C\u8D85 5% \u9700\u4E66\u9762\u8BF4\u660E":""),n("exc-recrate").textContent=y(p,2)+(p<1?"\uFF08\u672A\u6536\u6C47 "+a((e-i)*c)+" \u5143\uFF09":"\uFF08\u5DF2\u5168\u989D\u6536\u6C47\uFF09"),n("exc-rebate").textContent=a(b)+" \u5143\uFF08"+a(s)+" \xD7 "+y(d,0)+"\uFF09",n("exc-free").textContent=a(m)+" \u5143\uFF08\u7559\u62B5\u4E0D\u8DB3\uFF0C\u62B5\u51CF\u5185\u9500\u5E94\u7EB3\u7A0E\u989D\uFF09",n("exc-gap").textContent=a(f)+" \u5143\uFF08\u5F81 13% \u2212 \u9000 "+y(d,0)+"\uFF0C\u8F6C\u5165\u6210\u672C\uFF09",n("exc-note").textContent="\u514D\u62B5\u9000\u7684\u4E09\u5355\u8981\u80FD\u5BF9\u4E0A\uFF1A\u62A5\u5173\u5355\uFF08\u51FA\u53E3\u989D\uFF09\u3001\u51FA\u53E3\u53D1\u7968\uFF08\u4EBA\u6C11\u5E01\u91D1\u989D\uFF09\u3001\u6536\u6C47\u6C34\u5355\u3002\u53D1\u7968\u548C\u62A5\u5173\u5355\u7684\u5DEE\u5F02\u6700\u597D\u63A7\u5236\u5728 5% \u4EE5\u5185\uFF08\u6C47\u7387\u3001\u8FD0\u4FDD\u8D39\u53E3\u5F84\u4E0D\u540C\u4F1A\u6709\u5C0F\u989D\u5DEE\uFF09\uFF0C\u8D85\u4E86\u8981\u80FD\u62FF\u51FA\u8BF4\u660E\uFF1B\u6536\u6C47\u662F\u9000\u7A0E\u7684\u9690\u6027\u6761\u4EF6\uFF0C\u8D85\u8FC7\u89C4\u5B9A\u671F\u9650\u672A\u6536\u6C47\u3001\u4E14\u4E0D\u7B26\u5408\u89C6\u540C\u6536\u6C47\u60C5\u5F62\u7684\uFF0C\u5DF2\u9000\u7A0E\u6B3E\u53EF\u80FD\u88AB\u8FFD\u56DE\u3002\u9000\u7A0E\u989D\u53D6\u300C\u514D\u62B5\u9000\u7A0E\u989D\u300D\u4E0E\u300C\u671F\u672B\u7559\u62B5\u300D\u7684\u8F83\u5C0F\u8005\uFF1A\u7559\u62B5\u5927\u5C31\u5168\u9000\uFF0C\u7559\u62B5\u5C0F\u5219\u5DEE\u989D\u53D8\u6210\u514D\u62B5\u989D\u53BB\u62B5\u5185\u9500\u5E94\u7EB3\u7A0E\u989D\u3002\u5F81\u9000\u7A0E\u7387\u4E4B\u5DEE\uFF0813% \u2212 \u9000\u7A0E\u7387\uFF09\u4E0D\u80FD\u9000\uFF0C\u8981\u8F6C\u8FDB\u6210\u672C\uFF0C\u505A\u62A5\u4EF7\u65F6\u5C31\u5F97\u628A\u5B83\u7B97\u8FDB\u6BDB\u5229\u91CC\u3002\u5355\u8BC1\u4E0D\u9F50\u3001\u903E\u671F\u4E0D\u7533\u62A5\u7684\u51FA\u53E3\u8D27\u7269\uFF0C\u6309\u89C4\u5B9A\u8981\u89C6\u540C\u5185\u9500\u5F81\u7A0E\uFF0C\u8FD9\u662F\u5916\u8D38\u4F01\u4E1A\u6700\u5E38\u89C1\u7684\u8865\u7A0E\u70B9\u3002"}k(J,"calcExportCheck");function $(){var e=t(n("vchk-out"),0),c=t(n("vchk-inv"),0),v=t(n("vchk-noinv"),0),i=t(n("vchk-in"),0),d=t(n("vchk-cert"),0),r=t(n("vchk-tr"),0),s=c+v,l=d-r,p=e-s,b=i-l,u=s-l,m=Math.abs(p)+Math.abs(b),f=m===0?"\u8D26\u8868\u4E00\u81F4":m>Math.abs(s)*.05?"\u5DEE\u5F02\u504F\u5927\uFF0C\u9700\u9010\u7B14\u8C03\u8282":"\u5C0F\u989D\u5DEE\u5F02\uFF0C\u7F16\u5236\u8C03\u8282\u8868\u8BF4\u660E";n("vchk-big").textContent=a(u),n("vchk-outp").textContent=a(s)+" \u5143\uFF08\u5F00\u7968 "+a(c)+" \uFF0B \u672A\u5F00\u7968 "+a(v)+"\uFF09",n("vchk-outdiff").textContent=a(p)+" \u5143"+(p<0?"\uFF08\u8D26\u9762\u5C11\u4E8E\u7533\u62A5\uFF0C\u53EF\u80FD\u5C11\u8BA1\u6536\u5165\uFF09":"\uFF08\u8D26\u9762\u591A\u4E8E\u7533\u62A5\uFF0C\u53EF\u80FD\u591A\u8BA1\u6216\u672A\u5F00\u7968\u672A\u7533\u62A5\uFF09"),n("vchk-inp").textContent=a(l)+" \u5143\uFF08\u8BA4\u8BC1 "+a(d)+" \u2212 \u8F6C\u51FA "+a(r)+"\uFF09",n("vchk-indiff").textContent=a(b)+" \u5143"+(b>0?"\uFF08\u8D26\u9762\u591A\uFF0C\u53EF\u80FD\u6709\u672A\u8BA4\u8BC1\u6216\u672A\u53D6\u5F97\u4E13\u7968\uFF09":"\uFF08\u8D26\u9762\u5C11\uFF0C\u53EF\u80FD\u91CD\u590D\u62B5\u6263\u6216\u8DE8\u671F\uFF09"),n("vchk-total").textContent=a(m)+" \u5143",n("vchk-risk").textContent=f,n("vchk-note").textContent="\u7533\u62A5\u8868\u548C\u8D26\u9762\u7684\u5DEE\u5F02\u4E0D\u53EF\u80FD\u4E3A\u96F6\uFF0C\u5173\u952E\u662F\u6BCF\u4E00\u7B14\u90FD\u80FD\u8BF4\u51FA\u539F\u56E0\uFF0C\u5E76\u7559\u4E0B\u8C03\u8282\u8868\u3002\u9500\u9879\u4FA7\u5E38\u89C1\u5DEE\u5F02\uFF1A\u5F00\u4E86\u7968\u672A\u786E\u8BA4\u6536\u5165\uFF08\u9884\u6536\uFF09\u3001\u786E\u8BA4\u6536\u5165\u672A\u5F00\u7968\uFF08\u8981\u586B\u300C\u672A\u5F00\u5177\u53D1\u7968\u300D\u680F\uFF0C\u5426\u5219\u4E0B\u671F\u51B2\u56DE\u5F88\u9EBB\u70E6\uFF09\u3001\u89C6\u540C\u9500\u552E\u6CA1\u7533\u62A5\uFF08\u8D60\u54C1\u3001\u81EA\u7528\u3001\u804C\u5DE5\u798F\u5229\uFF09\u3001\u4EF7\u5916\u8D39\u7528\u6F0F\u8BA1\uFF08\u8FDD\u7EA6\u91D1\u3001\u5EF6\u671F\u4ED8\u6B3E\u5229\u606F\uFF09\u3002\u8FDB\u9879\u4FA7\u5E38\u89C1\u5DEE\u5F02\uFF1A\u4E13\u7968\u672A\u8BA4\u8BC1\u3001\u8BA4\u8BC1\u4E86\u4F46\u5C5E\u4E8E\u4E0D\u5F97\u62B5\u6263\u9879\u76EE\u6CA1\u8F6C\u51FA\u3001\u65C5\u5BA2\u8FD0\u8F93\u4E0E\u519C\u4EA7\u54C1\u8BA1\u7B97\u62B5\u6263\u6F0F\u586B\u3001\u7EA2\u5B57\u53D1\u7968\u51B2\u51CF\u6EDE\u540E\u3002\u5DEE\u5F02\u8D85\u8FC7\u9500\u9879 5% \u5C31\u5C5E\u4E8E\u91D1\u7A0E\u7CFB\u7EDF\u5BB9\u6613\u9884\u8B66\u7684\u533A\u95F4\uFF0C\u5EFA\u8BAE\u6BCF\u6708\u56FA\u5B9A\u505A\u8FD9\u5F20\u52FE\u7A3D\u8868\uFF0C\u548C\u5F00\u7968\u7CFB\u7EDF\u3001\u8BA4\u8BC1\u5E73\u53F0\u3001\u8D26\u9762\u4E09\u4E2A\u53E3\u5F84\u4E00\u8D77\u5BF9\u3002"}k($,"calcVatCheck");function Z(){var e=t(n("alw-sales"),0),c=t(n("alw-allow"),0)/100,v=t(n("alw-ret"),0)/100,i=t(n("alw-giftcost"),0),d=t(n("alw-giftval"),0),r=t(n("alw-vc"),0)/100,s=t(n("alw-vat"),0)/100,l=.12,p=.25,b=e*c,u=e*v,m=b+u,f=e-m,h=(e-m)*s,x=d*s,C=h+x,w=C*l,g=f*(1-r),M=g-i,E=x*l,A=Math.max(0,d-i),S=A*p,_=i+x+E+S;n("alw-big").textContent=a(_),n("alw-cut").textContent=a(m)+" \u5143\uFF08\u6298\u8BA9 "+a(b)+" / \u9000\u8D27 "+a(u)+"\uFF09",n("alw-net").textContent=a(f)+" \u5143",n("alw-vatout").textContent=a(C)+" \u5143\uFF08\u5176\u4E2D\u8D60\u54C1\u89C6\u540C\u9500\u552E "+a(x)+"\uFF09",n("alw-surtax").textContent=a(w)+" \u5143\uFF08\u6309 12%\uFF09",n("alw-gp").textContent=a(g)+" / "+a(M)+" \u5143",n("alw-gv").textContent=a(x)+" / "+a(E)+" \u5143",n("alw-gt").textContent="\u89C6\u540C\u9500\u552E\u6240\u5F97 "+a(A)+" \xD7 "+y(p,0)+" = "+a(S)+" \u5143",n("alw-note").textContent="\u4E09\u4EF6\u4E8B\u5206\u5F00\u5904\u7406\uFF1A\u2460 \u6298\u8BA9\u548C\u9000\u8D27\u662F\u51B2\u51CF\u6536\u5165\uFF08\u540C\u65F6\u51B2\u51CF\u9500\u9879\u7A0E\uFF09\uFF0C\u5DF2\u7ECF\u5F00\u7968\u7684\u8981\u5F00\u7EA2\u5B57\u53D1\u7968\uFF0C\u4E0D\u80FD\u6302\u300C\u5176\u4ED6\u5E94\u6536\u300D\u6216\u8BA9\u4E1A\u52A1\u5458\u57AB\uFF1B\u2461 \u8D60\u54C1\u662F\u300C\u89C6\u540C\u9500\u552E\u300D\u2014\u2014\u589E\u503C\u7A0E\u6309\u516C\u5141\u4EF7\u503C\u8BA1\u9500\u9879\u3001\u6240\u5F97\u7A0E\u6309\u516C\u5141\u4EF7\u503C\u786E\u8BA4\u6536\u5165\u5E76\u7ED3\u8F6C\u6210\u672C\uFF0C\u6240\u4EE5\u9001\u51FA\u53BB\u7684\u6210\u672C\u4E0D\u53EA\u662F\u6210\u672C "+a(i)+"\uFF0C\u5168\u53E3\u5F84\u662F "+a(_)+" \u5143\uFF0C\u76F8\u5F53\u4E8E\u5B9E\u9645\u6210\u672C\u7684 "+o(i>0?_/i:0,2)+" \u500D\uFF1B\u2462 \u4FC3\u9500\u8D60\u54C1\u5EFA\u8BAE\u6309\u300C\u4E70\u4E00\u8D60\u4E00\u300D\u7EC4\u5408\u9500\u552E\u5F00\u7968\uFF08\u540C\u4E00\u5F20\u53D1\u7968\u4E0A\u5206\u644A\u4EF7\u683C\uFF09\uFF0C\u53EF\u4EE5\u907F\u514D\u89C6\u540C\u9500\u552E\u91CD\u590D\u8BA1\u7A0E\u3002\u53E6\u5916\u6CE8\u610F\uFF1A\u6298\u8BA9\u3001\u9000\u56DE\u8981\u51B2\u51CF\u5F53\u671F\u6536\u5165\uFF0C\u4E0D\u80FD\u8FFD\u6EAF\u8C03\u6574\u4E0A\u5E74\u62A5\u8868\uFF08\u9664\u975E\u662F\u5DEE\u9519\u66F4\u6B63\uFF09\u3002"}k(Z,"calcSalesAllow");function nn(){var e=t(n("vtc-sales"),0),c=t(n("vtc-cost"),0)/100,v=t(n("vtc-ded"),0)/100,i=t(n("vtc-rate13"),0)/100,d=t(n("vtc-rate3"),0)/100,r=t(n("vtc-tax"),0)/100,s=.12,l=e*c,p=e*i,b=l*v*i,u=Math.max(0,p-b),m=u*s,f=(e-l-m)*(1-r),h=e*d,x=h*s,C=l*(1+i*v),w=(e-C-x)*(1-r),g=f-w,M=v>0&&i>0?s*(i-d)/(v*i*(1+s)):99;n("vtc-big").textContent=a(Math.abs(g)),n("vtc-g1").textContent=a(p)+" / "+a(b)+" / "+a(u)+" \u5143",n("vtc-g2").textContent=a(m)+" / "+a(f)+" \u5143",n("vtc-s1").textContent=a(h)+" \u5143\uFF08\u6309 "+y(d,1)+"\uFF0C\u8FDB\u9879\u4E0D\u80FD\u62B5\uFF09",n("vtc-s2").textContent=a(C)+" / "+a(x)+" \u5143",n("vtc-s3").textContent=a(w)+" \u5143",n("vtc-be").textContent=M>1?"\u8FDB\u9879\u62B5\u6263\u7387\u4E3A 0\uFF0C\u5C0F\u89C4\u6A21\u4E00\u76F4\u66F4\u4F18":"\u6210\u672C\u7387 "+y(M,2)+" / \u6BDB\u5229\u7387 "+y(1-M,2),n("vtc-note").textContent=(g>=0?"\u6309\u73B0\u5728\u7684\u6210\u672C\u7ED3\u6784\u548C\u62B5\u6263\u7387\uFF0C\u4E00\u822C\u7EB3\u7A0E\u4EBA\u7A0E\u540E\u591A\u8D5A "+a(g)+" \u5143\u3002":"\u6309\u73B0\u5728\u7684\u6210\u672C\u7ED3\u6784\u548C\u62B5\u6263\u7387\uFF0C\u5C0F\u89C4\u6A21\u7A0E\u540E\u591A\u8D5A "+a(Math.abs(g))+" \u5143\u2014\u2014\u56E0\u4E3A\u8FDB\u9879\u62B5\u6263\u62FF\u4E0D\u56DE\u6765\uFF0C13% \u9500\u9879\u57FA\u672C\u767D\u4EA4\u3002")+"\u5224\u65AD\u7684\u5173\u952E\u4E0D\u662F\u7A0E\u7387\u9AD8\u4F4E\uFF0C\u800C\u662F\u300C\u8FDB\u9879\u80FD\u4E0D\u80FD\u62B5\u300D\uFF1A\u91C7\u8D2D\u80FD\u62FF\u5230 13% \u4E13\u7968\u7684\u8D38\u6613\u3001\u5236\u9020\uFF0C\u4E00\u822C\u7EB3\u7A0E\u4EBA\u5408\u7B97\uFF1B\u4EBA\u5DE5\u4E3A\u4E3B\u3001\u91C7\u8D2D\u96F6\u6563\u62FF\u4E0D\u5230\u4E13\u7968\u7684\u670D\u52A1\u4E1A\uFF0C\u5C0F\u89C4\u6A21 3%\uFF08\u73B0\u884C\u4F18\u60E0\u671F\u53EF\u80FD 1%\uFF09\u5B8C\u80DC\u3002\u8FD8\u6709\u4E09\u4E2A\u975E\u7A0E\u56E0\u7D20\u8981\u4E00\u8D77\u770B\uFF1A\u5BA2\u6237\u8981\u4E0D\u8981 13% \u4E13\u7968\uFF08\u8981\u5C31\u57FA\u672C\u6CA1\u5F97\u9009\uFF09\u3001\u4E00\u822C\u7EB3\u7A0E\u4EBA\u8981\u5EFA\u8D26\u3001\u8FDB\u9879\u7BA1\u7406\u6210\u672C\u548C\u88AB\u7A3D\u67E5\u6982\u7387\u66F4\u9AD8\u3001\u5C0F\u89C4\u6A21\u5E74\u9500\u552E\u989D\u8D85\u8FC7 500 \u4E07\u5FC5\u987B\u8F6C\u4E00\u822C\u7EB3\u7A0E\u4EBA\u3002\u65E0\u5DEE\u5F02\u70B9\u4F1A\u968F\u5F81\u6536\u7387\u4F18\u60E0\u3001\u884C\u4E1A\u52A0\u8BA1\u62B5\u51CF\u653F\u7B56\u53D8\u5316\uFF0C\u7B97\u5B8C\u8981\u6309\u6700\u65B0\u6587\u4EF6\u590D\u6838\u3002"}k(nn,"calcVatChoose");function an(){var e=Math.max(0,t(n("cit-income"),0)),c=Math.max(0,t(n("cit-cost"),0)),v=Math.max(0,t(n("cit-expense"),0)),i=t(n("cit-other"),0),d=Math.max(0,t(n("cit-adjust"),0)),r=Math.max(0,t(n("cit-loss"),0)),s=Math.max(0,t(n("cit-prepaid"),0)),l=Math.max(0,t(n("cit-rate"),25))/100,p=e-c-v+i,b=Math.max(0,p+d-r),u=b*l,m=u-s;n("cit-profit").textContent=a(p),n("cit-taxable").textContent=a(b),n("cit-tax").textContent=a(u),n("cit-burden").textContent=e>0?y(u/e):"\u2014",n("cit-big").textContent=a(m),n("cit-note").textContent=m>=0?"\u7D2F\u8BA1\u53E3\u5F84\u4E0B\u8FD8\u8981\u8865\u7F34 "+a(m)+" \u5143\u3002\u5B63\u5EA6\u9884\u7F34\u6309\u300C\u7D2F\u8BA1\u6570\u300D\u7B97\uFF0C\u4E0D\u662F\u6BCF\u5B63\u5EA6\u5229\u6DA6\u5355\u72EC\u4E58\u7A0E\u7387\uFF1B\u4E8F\u635F\u5B63\u5EA6\u53EF\u96F6\u7533\u62A5\uFF0C\u4E0B\u5B63\u5EA6\u7D2F\u8BA1\u8F6C\u6B63\u518D\u7F34\u3002":"\u7D2F\u8BA1\u5DF2\u591A\u7F34 "+a(-m)+" \u5143\uFF0C\u53EF\u4EE5\u7559\u62B5\u4EE5\u540E\u5B63\u5EA6\uFF0C\u6216\u6B21\u5E74\u6C47\u7B97\u6E05\u7F34\u65F6\u7533\u8BF7\u9000\u7A0E\u3002"}k(an,"calcCitPrep");function tn(){var e=Math.max(0,t(n("tbw-sales"),0)),c=Math.max(0,t(n("tbw-input"),0)),v=Math.max(0,t(n("tbw-vatrate"),13))/100,i=Math.max(0,t(n("tbw-profit"),0)),d=Math.max(0,t(n("tbw-itrate"),25))/100,r=Math.max(0,t(n("tbw-paid"),0)),s=Math.max(0,t(n("tbw-vatref"),3)),l=Math.max(0,t(n("tbw-itref"),1)),p=Math.max(0,t(n("tbw-band"),.5)),b=e*v,u=b-c,m=i*d,f=e>0?u/e*100:0,h=e>0?m/e*100:0,x=e>0?(u+m)/e*100:0;function C(_,W){var R=W-p,D=W+p;return _>D?{t:"\u504F\u9AD8",d:"\u9AD8\u4E8E\u53C2\u8003\u533A\u95F4"}:_<R?{t:"\u504F\u4F4E",d:"\u4F4E\u4E8E\u53C2\u8003\u533A\u95F4"}:{t:"\u5728\u533A\u95F4\u5185",d:"\u5728\u53C2\u8003\u533A\u95F4\u5185"}}k(C,"verdict");var w=C(f,s),g=C(h,l);n("tbw-big").textContent=o(x,2),n("tbw-vat").textContent=a(u)+"\uFF08"+o(f,2)+"%\uFF0C\u53C2\u8003 "+o(s,2)+"%\uFF09",n("tbw-vverdict").textContent=w.t+"\uFF08"+w.d+"\uFF09",n("tbw-it").textContent=a(m)+"\uFF08\u5DF2\u7F34 "+a(r)+"\uFF0C\u5E94\u8865 "+a(Math.max(0,m-r))+"\uFF09",n("tbw-iverdict").textContent=g.t+"\uFF08"+g.d+"\uFF09";for(var M=[["\u589E\u503C\u7A0E\u7A0E\u8D1F\u7387",o(f,2)+"%",o(s,2)+"%",o(s-p,2)+" ~ "+o(s+p,2)+"%",w.t],["\u6240\u5F97\u7A0E\u8D21\u732E\u7387",o(h,2)+"%",o(l,2)+"%",o(l-p,2)+" ~ "+o(l+p,2)+"%",g.t],["\u7EFC\u5408\u7A0E\u8D1F\u7387",o(x,2)+"%",o(s+l,2)+"%","\u2014",x>s+l+p*2?"\u504F\u9AD8":x<s+l-p*2?"\u504F\u4F4E":"\u5728\u533A\u95F4\u5185"]],E="",A=0;A<M.length;A++)E+='<tr><td class="tal">'+M[A][0]+"</td><td>"+M[A][1]+"</td><td>"+M[A][2]+"</td><td>"+M[A][3]+'</td><td class="tal">'+M[A][4]+"</td></tr>";n("tbw-body").innerHTML=E;var S=[];w.t==="\u504F\u4F4E"&&S.push("\u589E\u503C\u7A0E\u7A0E\u8D1F\u7387\u504F\u4F4E\u2014\u2014\u4F18\u5148\u6838\u5BF9\uFF1A\u6709\u6CA1\u6709\u63D0\u524D\u5F00\u7968\u3001\u672A\u5F00\u7968\u6536\u5165\u6F0F\u62A5\u3001\u8FDB\u9879\u591A\u53D6\uFF08\u5907\u8D27/\u8BBE\u5907\u96C6\u4E2D\u91C7\u8D2D\uFF09\uFF0C\u628A\u53F0\u8D26\u5907\u597D"),w.t==="\u504F\u9AD8"&&S.push("\u589E\u503C\u7A0E\u7A0E\u8D1F\u7387\u504F\u9AD8\u2014\u2014\u591A\u4E3A\u6709\u9500\u9879\u6CA1\u8FDB\u9879\uFF0C\u786E\u8BA4\u4F9B\u5E94\u5546\u53D1\u7968\u662F\u5426\u8DB3\u989D\u53D6\u5F97\u3001\u52A0\u8BA1\u62B5\u51CF/\u5373\u5F81\u5373\u9000\u662F\u5426\u5E94\u4EAB\u672A\u4EAB"),g.t==="\u504F\u4F4E"&&S.push("\u6240\u5F97\u7A0E\u8D21\u732E\u7387\u504F\u4F4E\u2014\u2014\u591A\u4E3A\u5229\u6DA6\u4F4E\u6216\u7EB3\u7A0E\u8C03\u6574\u4E0D\u8DB3\uFF0C\u51C6\u5907\u597D\u6BDB\u5229\u7387\u4E0E\u8D39\u7528\u7ED3\u6784\u8BF4\u660E"),g.t==="\u504F\u9AD8"&&S.push("\u6240\u5F97\u7A0E\u8D21\u732E\u7387\u504F\u9AD8\u2014\u2014\u6838\u5BF9\u6210\u672C\u8D39\u7528\u53D1\u7968\u3001\u7814\u53D1\u52A0\u8BA1\u3001\u5C0F\u5FAE/\u9AD8\u65B0\u4F18\u60E0\u662F\u5426\u6F0F\u4EAB"),S.length||S.push("\u4E24\u7A0E\u90FD\u5728\u53C2\u8003\u533A\u95F4\u5185\uFF0C\u4FDD\u6301\u8FDB\u9500\u9879\u4E0E\u5229\u6DA6\u7684\u5339\u914D\u5EA6\u5373\u53EF"),n("tbw-note").textContent="\u884C\u4E1A\u53C2\u8003\u503C\uFF08\u589E\u503C\u7A0E "+o(s,2)+"%\u3001\u6240\u5F97\u7A0E "+o(l,2)+"%\uFF09\u53EA\u662F\u793A\u4F8B\uFF0C\u4EE5\u5F53\u5730\u4E3B\u7BA1\u673A\u5173\u53E3\u5F84\u4E3A\u51C6\u3002\u7A0E\u8D1F\u662F\u6BD4\u503C\u4E0D\u662F\u7A0E\uFF1A\u504F\u4F4E\u8C03\u98CE\u9669\uFF0C\u504F\u9AD8\u8C03\u5229\u6DA6\u3002"+S.join("\uFF1B")+"\u3002"}k(tn,"calcTaxWarn");function en(){var e=Math.max(0,t(n("dtx-unreal"),0)),c=Math.max(0,t(n("dtx-buy"),25))/100,v=Math.max(0,t(n("dtx-sell"),15))/100,i=e*c,d=e*v,r=-i,s=-e+i,l=i-d;n("dtx-big").textContent=a(i),n("dtx-diff").textContent=a(e)+"\uFF08\u5B58\u8D27\u8D26\u9762 < \u8BA1\u7A0E\u57FA\u7840\uFF09",n("dtx-paid").textContent=a(d)+"\uFF08\u9500\u552E\u65B9\u7A0E\u7387 "+y(v,0)+"\uFF09",n("dtx-taxeff").textContent="-"+a(i)+"\uFF08\u62B5\u51CF\u6240\u5F97\u7A0E\u8D39\u7528\uFF09",n("dtx-ni").textContent=a(s)+"\uFF08\u62B5\u5229\u6DA6 -"+a(e)+" + \u6240\u5F97\u7A0E\u8D39\u7528\u62B5\u51CF "+a(i)+"\uFF09",n("dtx-spread").textContent=a(l)+(l>=0?"\uFF08DTA \u5927\u4E8E\u5355\u4F53\u5DF2\u7F34\uFF0C\u5C06\u6765\u6309\u8D2D\u4E70\u65B9\u7A0E\u7387\u591A\u62B5\uFF09":"\uFF08DTA \u5C0F\u4E8E\u5355\u4F53\u5DF2\u7F34\uFF09");for(var p=[["\u62B5\u9500\u672A\u5B9E\u73B0\u5229\u6DA6","-"+a(e),"\u501F\u6536\u5165/\u8D37\u6210\u672C\u3001\u8D37\u5B58\u8D27"],["\u53EF\u62B5\u6263\u6682\u65F6\u6027\u5DEE\u5F02",a(e),"\u8D26\u9762\u4EF7\u503C < \u8BA1\u7A0E\u57FA\u7840"],["\u9012\u5EF6\u6240\u5F97\u7A0E\u8D44\u4EA7",a(i),"\u5DEE\u5F02 \xD7 \u8D2D\u4E70\u65B9\u7A0E\u7387 "+y(c,0)],["\u5355\u4F53\u5DF2\u7F34\u6240\u5F97\u7A0E",a(d),"\u9500\u552E\u65B9\u5DF2\u6309 "+y(v,0)+" \u7F34\uFF0C\u7A0E\u5C40\u4E0D\u9000"]],b="",u=0;u<p.length;u++)b+='<tr><td class="tal">'+p[u][0]+"</td><td>"+p[u][1]+'</td><td class="tal">'+p[u][2]+"</td></tr>";n("dtx-body").innerHTML=b,n("dtx-note").textContent="\u5408\u5E76\u5C42\u9762\u8FD9\u7B14\u5185\u90E8\u5229\u6DA6\u4E0D\u8BA4\uFF0C\u4F46\u5355\u4F53\u5DF2\u7ECF\u7F34\u4E86 "+a(d)+" \u7684\u7A0E\uFF0C\u7A0E\u5C40\u4E0D\u4F1A\u9000\uFF1B\u5408\u5E76\u8D26\u4E0A\u786E\u8BA4\u9012\u5EF6\u6240\u5F97\u7A0E\u8D44\u4EA7 "+a(i)+"\uFF0C\u7B49\u4E8E\u300C\u9884\u7F34\u300D\u6302\u5728\u8D44\u4EA7\u91CC\uFF0C\u7B49\u5B58\u8D27\u771F\u6B63\u5BF9\u5916\u5356\u51FA\u53BB\u65F6\u8F6C\u56DE\u3002\u7A0E\u7387\u5DEE "+y(v,0)+" \u2192 "+y(c,0)+" \u4F1A\u8BA9 DTA \u4E0E\u5DF2\u7F34\u5DEE "+a(Math.abs(l))+"\uFF0C\u8FD9\u662F\u6309\u8D2D\u4E70\u65B9\u7A0E\u7387\u8BA1\u91CF\u5E26\u6765\u7684\u6B63\u5E38\u7ED3\u679C\uFF0C\u4E0D\u662F\u9519\u8D26\u3002"}k(en,"calcDTax");function sn(){var e=n("adt-mode").value,c=t(n("adt-price"),452e3),v=t(n("adt-net"),4e5),i=t(n("adt-fee"),5e3),d=t(n("adt-vat"),13),r=t(n("adt-add"),12)/100,s=t(n("adt-rate"),25)/100,l,p,b,u,m,f;e==="simple"?(l=c/1.03,p=l*.02,b=p*r,u=l-v-i,m=u*(1-s),f=(v+i)*1.03/.98,n("adt-modekv").textContent="\u7B80\u6613\u8BA1\u7A0E\uFF083% \u51CF\u6309 2%\uFF09"):(l=c/(1+d/100),p=c-l,b=p*r,u=l-v-i,m=u*(1-s),f=(v+i)*(1+d/100),n("adt-modekv").textContent="\u4E00\u822C\u8BA1\u7A0E\uFF08"+d+"%\uFF09");var h=e==="simple"?(c/(1+d/100)-v-i)*(1-s):(c/1.03-v-i)*(1-s);n("adt-big").textContent=T(m),n("adt-ni").textContent=a(l),n("adt-vt").textContent=a(p),n("adt-ad").textContent=a(b),n("adt-pl").textContent=T(u),n("adt-be").textContent=a(f),n("adt-cmp").textContent=e==="simple"?"\u4E00\u822C\u8BA1\u7A0E\u7A0E\u540E "+T(h):"\u7B80\u6613\u8BA1\u7A0E\u7A0E\u540E "+T(h)+"\uFF08\u82E5\u9002\u7528\uFF09",n("adt-note").textContent="\u4E00\u822C\u8BA1\u7A0E\uFF1A\u9500\u9879 13%\uFF0C\u8FDB\u9879\u53EF\u62B5\uFF1B\u7B80\u6613\u8BA1\u7A0E 3% \u51CF\u6309 2%\uFF08\u9650\u4E8E 2016 \u5E74 4 \u6708 30 \u65E5\u524D\u53D6\u5F97\u6216\u4E0D\u5F97\u62B5\u6263\u8FDB\u9879\u7684\u8D44\u4EA7\uFF09\u3002\u4FDD\u672C\u552E\u4EF7 =\uFF08\u51C0\u503C+\u6E05\u7406\u8D39\uFF09\xD7\uFF081+\u7A0E\u7387\uFF09[\u7B80\u6613\u4E3A \xD71.03/0.98]\uFF0C\u4F4E\u4E8E\u5B83\u5356\u5C31\u662F\u4E8F\u3002"}k(sn,"calcAssetDispTax");function ln(){var e=t(n("tpd-related"),3e7),c=t(n("tpd-revenue"),1e8),v=t(n("tpd-threshold"),25e6),i=t(n("tpd-group"),6e9),d=t(n("tpd-master"),1e9),r=t(n("tpd-cbr"),55e8),s=c>0?e/c:0,l=e>v,p=i>d,b=i>r;n("tpd-big").textContent=y(s,2),n("tpd-local").textContent=l?"\u9700\u8981\u51C6\u5907\uFF08\u5173\u8054\u4EA4\u6613\u989D\u8D85\u95E8\u69DB\uFF09":"\u672A\u8FBE\u95E8\u69DB",n("tpd-masterkv").textContent=p?"\u9700\u8981\uFF08\u96C6\u56E2\u5408\u5E76\u6536\u5165\u8D85\u95E8\u69DB\uFF09":"\u4E0D\u9700\u8981",n("tpd-cbrkv").textContent=b?"\u9700\u8981\uFF08\u96C6\u56E2\u5408\u5E76\u6536\u5165\u8D85\u95E8\u69DB\uFF09":"\u4E0D\u9700\u8981",n("tpd-risk").textContent=l?"\u672A\u6309\u671F\u51C6\u5907\u7684\uFF0C\u7A0E\u52A1\u673A\u5173\u53EF\u6838\u5B9A\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D\u3001\u8865\u7A0E\u5E76\u52A0\u6536\u5229\u606F":"\u5F53\u524D\u672A\u8FBE\u672C\u5730\u6587\u6863\u95E8\u69DB\uFF0C\u4F46\u5B9A\u4EF7\u4ECD\u9700\u7B26\u5408\u72EC\u7ACB\u4EA4\u6613\u539F\u5219";var u=[["\u672C\u5730\u6587\u6863",a(v),a(e),l?"\u9700\u8981":"\u4E0D\u9700\u8981"],["\u4E3B\u4F53\u6587\u6863",a(d),a(i),p?"\u9700\u8981":"\u4E0D\u9700\u8981"],["\u56FD\u522B\u62A5\u544A",a(r),a(i),b?"\u9700\u8981":"\u4E0D\u9700\u8981"]],m=n("tpd-body");m.innerHTML="";for(var f=0;f<u.length;f++){for(var h=document.createElement("tr"),x=0;x<u[f].length;x++){var C=document.createElement("td");C.textContent=u[f][x],h.appendChild(C)}m.appendChild(h)}n("tpd-note").textContent="\u4E09\u4E2A\u95E8\u69DB\u4E92\u4E0D\u66FF\u4EE3\uFF1A\u672C\u5730\u6587\u6863\u770B\u300C\u672C\u4F01\u4E1A\u5173\u8054\u4EA4\u6613\u989D\u300D\uFF0C\u4E3B\u4F53\u6587\u6863\u548C\u56FD\u522B\u62A5\u544A\u770B\u300C\u96C6\u56E2\u5408\u5E76\u6536\u5165\u300D\u3002\u95E8\u69DB\u6570\u5B57\u53EF\u6539\uFF08\u5404\u5730/\u6BCF\u5E74\u8C03\u6574\u4EE5\u4E3B\u7BA1\u7A0E\u52A1\u673A\u5173\u53E3\u5F84\u4E3A\u51C6\uFF09\uFF0C\u7B26\u5408\u72EC\u7ACB\u4EA4\u6613\u539F\u5219\u662F\u6839\u672C\u3002"}k(ln,"calcTpdocs");function pn(){var e=n("dfr-mode").value,c=t(n("dfr-amt"),12e5),v=Math.max(1,t(n("dfr-months"),12)),i=Math.max(0,t(n("dfr-elapsed"),3)),d=t(n("dfr-tax"),25)/100,r=c/v,s=r*Math.min(i,v),l=c-s,p=c>0?s/c:0;n("dfr-big").textContent=a(l),n("dfr-mo").textContent=a(r),n("dfr-rec").textContent=a(s),n("dfr-pct").textContent=y(p,2),n("dfr-bal").textContent=a(l),e==="grant"?(n("dfr-taxline").textContent="\u4E0D\u5F81\u7A0E\u6536\u5165\uFF1A\u5BF9\u5E94\u652F\u51FA\u4E0D\u5F97\u7A0E\u524D\u6263\u9664\uFF08\u53EA\u5F71\u54CD\u65F6\u95F4\u4EF7\u503C\uFF09\uFF0C5 \u5E74\u672A\u4F7F\u7528\u8981\u7F34\u56DE",n("dfr-note").textContent="\u653F\u5E9C\u8865\u52A9\u8D70\u300C\u9012\u5EF6\u6536\u76CA\u300D\uFF0C\u4E0E\u8D44\u4EA7\u76F8\u5173\u6309\u8D44\u4EA7\u5BFF\u547D\u3001\u4E0E\u6536\u76CA\u76F8\u5173\u6309\u671F\u95F4\u644A\u9500\uFF1B\u4F5C\u4E0D\u5F81\u7A0E\u6536\u5165\u5904\u7406\u65F6\uFF0C\u5BF9\u5E94\u7684\u6298\u65E7/\u652F\u51FA\u4E0D\u5F97\u7A0E\u524D\u6263\u9664\uFF0C\u53EA\u662F\u63A8\u8FDF\u4E0D\u662F\u514D\u7A0E\u3002"):(n("dfr-taxline").textContent="\u9884\u6536\u8D26\u6B3E\u5148\u6302\u8D1F\u503A\uFF0C\u6309\u5C65\u7EA6\u8FDB\u5EA6\u8F6C\u6536\u5165\uFF0C\u4E0D\u63D0\u524D\u7F34\u589E\u503C\u7A0E",n("dfr-note").textContent="\u9884\u6536\u8D26\u6B3E\u6309\u670D\u52A1\u671F/\u5C65\u7EA6\u8FDB\u5EA6\u9010\u6708\u786E\u8BA4\u6536\u5165\uFF1B\u786E\u8BA4\u8282\u594F\u4E0E\u589E\u503C\u7A0E\u7EB3\u7A0E\u4E49\u52A1\u53D1\u751F\u65F6\u95F4\u53EF\u80FD\u4E0D\u540C\uFF08\u9884\u6536\u65F6\u70B9 vs \u670D\u52A1\u5B8C\u6210\u65F6\u70B9\uFF09\uFF0C\u4EE5\u5408\u540C\u548C\u7A0E\u6CD5\u89C4\u5B9A\u4E3A\u51C6\u3002")}k(pn,"calcDeferred");function dn(){var e=t(n("vrf-credit"),2e5),c=t(n("vrf-ratio"),100)/100,v=t(n("vrf-refund"),60)/100,i=t(n("vrf-had"),0),d=e*c*v-i;d<0&&(d=0);var r=e-d;n("vrf-big").textContent=a(d),n("vrf-left").textContent=a(r),n("vrf-ratiokv").textContent=y(c,2),n("vrf-refundkv").textContent=y(v,0),n("vrf-cash").textContent=a(d),n("vrf-note").textContent="\u53EF\u9000\u7A0E\u989D = \u671F\u672B\u7559\u62B5 \xD7 \u8FDB\u9879\u6784\u6210\u6BD4\u4F8B \xD7 \u9000\u7A0E\u6BD4\u4F8B \u2212 \u5DF2\u9000\u3002\u6BD4\u4F8B\u53EF\u6539\uFF1A\u5148\u8FDB\u5236\u9020\u4E1A\u7B49\u884C\u4E1A\u7528 100%\uFF0C\u4E00\u822C\u884C\u4E1A 60%\uFF08\u4EE5\u5F53\u671F\u653F\u7B56\u4E3A\u51C6\uFF09\u3002\u9000\u7A0E\u662F\u62FF\u56DE\u81EA\u5DF1\u57AB\u7684\u94B1\uFF0C\u4E0D\u662F\u5229\u6DA6\uFF1B\u9000\u7A0E\u540E\u7559\u62B5 = \u671F\u672B\u7559\u62B5 \u2212 \u9000\u7A0E\u989D\u3002\u7533\u8BF7\u6761\u4EF6\uFF08\u8FDE\u7EED\u516D\u4E2A\u6708\u589E\u91CF\u7559\u62B5 >0\u3001\u7EB3\u7A0E\u4FE1\u7528\u7B49\u7EA7\u7B49\uFF09\u4EE5\u4E3B\u7BA1\u7A0E\u52A1\u673A\u5173\u53E3\u5F84\u4E3A\u51C6\u3002"}k(dn,"calcVatrefund");function rn(){var e=t(n("smm-income"),2e6),c=t(n("smm-people"),80),v=t(n("smm-assets"),1e7),i=t(n("smm-cap"),3e6),d=t(n("smm-peoplecap"),300),r=t(n("smm-assetcap"),5e7),s=t(n("smm-rate"),25)/100,l=e<=i&&c<=d&&v<=r,p,b,u,m=[];l?(p=e*.05,b=5,u=e*s-p):(p=e*s,b=s*100,u=0,e>i&&m.push("\u6240\u5F97\u989D\u8D85 "+a(i)),c>d&&m.push("\u4EBA\u6570\u8D85 "+d),v>r&&m.push("\u8D44\u4EA7\u8D85 "+a(r))),n("smm-big").textContent=a(p),n("smm-verdict").textContent=l?"\u7B26\u5408\u5C0F\u578B\u5FAE\u5229\uFF08\u51CF\u6309 25% \u8BA1\u5165\u3001\u6309 20% \u5F81\u6536\uFF0C\u5B9E\u9645 5%\uFF09":"\u4E0D\u7B26\u5408\u5C0F\u578B\u5FAE\u5229",n("smm-ratekv").textContent=b+"%",n("smm-save").textContent=l?T(u):"0.00 \u5143",n("smm-fail").textContent=m.length?m.join("\uFF1B"):"\u65E0",n("smm-note").textContent="\u4E09\u6761\u4EF6\u540C\u65F6\u6EE1\u8DB3\uFF1A\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D \u2264 "+a(i)+"\u3001\u4ECE\u4E1A\u4EBA\u6570 \u2264 "+d+"\u3001\u8D44\u4EA7\u603B\u989D \u2264 "+a(r)+"\u3002\u4ECE\u4E1A\u4EBA\u6570\u4E0E\u8D44\u4EA7\u603B\u989D\u53D6\u5168\u5E74\u5B63\u5EA6\u5E73\u5747\u503C\uFF08\u4E0D\u662F\u671F\u672B\u6570\uFF09\u3002\u4E0A\u9650\u4E0E\u4F18\u60E0\u53E3\u5F84\u53EF\u6539\uFF08\u4EE5\u5F53\u671F\u653F\u7B56\u4E3A\u51C6\uFF0C\u5386\u53F2\u4E0A\u4E00\u5EA6 100 \u4E07\u4EE5\u5185\u518D\u51CF\u534A\uFF09\u3002"}k(rn,"calcSmallmicro");function cn(){var e=t(n("acd-input"),1e5),c=t(n("acd-plus"),10)/100,v=t(n("acd-brought"),15e3),i=t(n("acd-tax"),5e4),d=t(n("acd-taken"),0),r=e*c-d;r<0&&(r=0);var s=r+v,l=Math.min(s,i),p=i-l,b=s-l;n("acd-big").textContent=a(p),n("acd-accrue").textContent=a(r),n("acd-avail").textContent=a(s),n("acd-save").textContent=a(l),n("acd-carry").textContent=a(b),n("acd-note").textContent="\u52A0\u8BA1\u62B5\u51CF\u8BA1\u63D0\u989D = \u5F53\u671F\u8FDB\u9879\u7A0E\u989D \xD7 \u52A0\u8BA1\u6BD4\u4F8B\uFF08\u751F\u4EA7\u6027\u670D\u52A1\u4E1A 10%/15%\u3001\u5148\u8FDB\u5236\u9020\u4E1A 5%\uFF0C\u53EF\u6539\uFF09\uFF1B\u672C\u671F\u53EF\u62B5\u51CF = \u8BA1\u63D0 + \u4E0A\u671F\u7ED3\u8F6C\uFF1B\u5B9E\u9645\u5E94\u7EB3\u7A0E = \u672A\u52A0\u8BA1\u5E94\u7EB3\u7A0E \u2212 \u62B5\u51CF\u989D\uFF08\u62B5\u4E0D\u5B8C\u7684\u7ED3\u8F6C\u4E0B\u671F\uFF0C\u4E0D\u52A0\u8BA1\u90E8\u5206\u4E0D\u8DB3\u62B5\u65F6\u4E0D\u8BA1\u63D0\u4E0D\u7ED3\u8F6C\uFF09\u3002\u653F\u7B56\u6267\u884C\u671F\u4EE5\u5F53\u671F\u516C\u544A\u4E3A\u51C6\u3002"}k(cn,"calcAddcredit");function on(){var e=t(n("dli-bad"),5e5),c=t(n("dli-inv"),3e5),v=t(n("dli-dep"),1e5),i=t(n("dli-tax"),25)/100,d=t(n("dli-dta0"),15e4),r=t(n("dli-dtl0"),0),s=(e+c)*i,l=v*i,p=s-d,b=l-r,u=b-p;n("dli-big").textContent=a(s),n("dli-dtl").textContent=a(l),n("dli-dta1").textContent=(p>=0?"+":"")+a(p),n("dli-dtl1").textContent=(b>=0?"+":"")+a(b),n("dli-net").textContent=(u>=0?"+":"")+a(u),n("dli-note").textContent="\u9012\u5EF6\u6240\u5F97\u7A0E\u8D44\u4EA7 = \u53EF\u62B5\u6263\u6682\u65F6\u6027\u5DEE\u5F02 \xD7 \u7A0E\u7387\uFF08\u574F\u8D26\u51C6\u5907\u3001\u5B58\u8D27\u8DCC\u4EF7\u7B49\uFF0C\u9884\u671F\u80FD\u8F6C\u56DE\u65F6\u786E\u8BA4\uFF09\uFF1B\u9012\u5EF6\u6240\u5F97\u7A0E\u8D1F\u503A = \u5E94\u7EB3\u7A0E\u6682\u65F6\u6027\u5DEE\u5F02 \xD7 \u7A0E\u7387\uFF08\u52A0\u901F\u6298\u65E7\u7B49\uFF09\u3002\u672C\u671F\u53D8\u52A8 = \u671F\u672B \u2212 \u671F\u521D\uFF1B\u9012\u5EF6\u6240\u5F97\u7A0E\u8D39\u7528 = \u8D1F\u503A\u589E\u52A0 \u2212 \u8D44\u4EA7\u589E\u52A0\uFF0C\u8D1F\u6570\u8868\u793A\u6240\u5F97\u7A0E\u8D39\u7528\u51CF\u5C11\uFF08\u4F46\u4E0D\u662F\u5C11\u7F34\uFF0C\u662F\u65F6\u95F4\u6027\u5DEE\u5F02\uFF09\u3002"}k(on,"calcDtlind");export const PANELS={vat:`  <section class="panel" id="panel-vat">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f"><span>\u91D1\u989D\uFF08\u5143\uFF09</span>
      <input id="vt-amount" type="number" inputmode="decimal" min="0" step="100" value="113000"></label>
    <label class="f"><span>\u8FD9\u4E2A\u91D1\u989D\u662F</span>
      <select id="vt-mode">
        <option value="gross" selected>\u542B\u7A0E\u4EF7\uFF08\u53D1\u7968\u4EF7\u7A0E\u5408\u8BA1\uFF09</option>
        <option value="net">\u4E0D\u542B\u7A0E\u4EF7\uFF08\u9500\u552E\u989D\uFF09</option>
      </select></label>
    <label class="f"><span>\u7A0E\u7387 / \u5F81\u6536\u7387</span>
      <select id="vt-rate">
        <option value="0.13" selected>13% \u2014\u2014 \u8D27\u7269\u3001\u52A0\u5DE5\u4FEE\u7406\u4FEE\u914D\u3001\u6709\u5F62\u52A8\u4EA7\u79DF\u8D41</option>
        <option value="0.09">9% \u2014\u2014 \u4EA4\u901A\u8FD0\u8F93\u3001\u5EFA\u7B51\u3001\u4E0D\u52A8\u4EA7\u3001\u519C\u4EA7\u54C1\u3001\u90AE\u7535</option>
        <option value="0.06">6% \u2014\u2014 \u73B0\u4EE3\u670D\u52A1\u3001\u91D1\u878D\u3001\u751F\u6D3B\u670D\u52A1\u3001\u65E0\u5F62\u8D44\u4EA7</option>
        <option value="0.05">5% \u2014\u2014 \u7B80\u6613\u8BA1\u7A0E\uFF08\u4E0D\u52A8\u4EA7\u9500\u552E/\u51FA\u79DF\u7B49\uFF09</option>
        <option value="0.03">3% \u2014\u2014 \u5C0F\u89C4\u6A21\u7EB3\u7A0E\u4EBA\u5F81\u6536\u7387</option>
        <option value="0.01">1% \u2014\u2014 \u5C0F\u89C4\u6A21\u51CF\u6309\u5F81\u6536</option>
      </select></label>
    <label class="f"><span>\u9644\u52A0\u7A0E\u8D39\u5408\u8BA1\uFF08% \u7684\u589E\u503C\u7A0E\uFF0C\u57CE\u5EFA 7 + \u6559\u80B2 3 + \u5730\u65B9\u6559\u80B2 2\uFF09</span>
      <input id="vt-surtax" type="number" inputmode="decimal" min="0" max="30" step="1" value="12"></label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u7A0E\u989D</span><strong id="vt-vat">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u4E0D\u542B\u7A0E\u91D1\u989D\uFF08\u6536\u5165 / \u6210\u672C\uFF09</span><b id="vt-net">\u2014</b></li>
      <li><span>\u4EF7\u7A0E\u5408\u8BA1\uFF08\u542B\u7A0E\uFF09</span><b id="vt-gross">\u2014</b></li>
      <li><span>\u7A0E\u989D\u5360\u542B\u7A0E\u4EF7</span><b id="vt-share">\u2014</b></li>
      <li><span>\u57CE\u5EFA\u53CA\u9644\u52A0\uFF08\u6309\u4E0A\u9762\u7684\u6BD4\u4F8B\uFF09</span><b id="vt-surtax-amt">\u2014</b></li>
      <li><span>\u8FD9\u7B14\u4E1A\u52A1\u5B9E\u9645\u7A0E\u8D1F\uFF08\u7A0E + \u9644\u52A0\uFF09</span><b id="vt-total-tax">\u2014</b></li>
      <li><span>\u4E00\u822C\u7EB3\u7A0E\u4EBA\u53EF\u62B5\u6263\u8FDB\u9879\uFF08\u62FF\u5230\u4E13\u7968\u65F6\uFF09</span><b id="vt-deduct">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u7A0E\u7387</th><th>\u4E0D\u542B\u7A0E</th><th>\u7A0E\u989D</th><th>\u542B\u7A0E</th></tr></thead>
        <tbody id="vt-body"></tbody>
      </table>
    </div>
    <p class="hint" id="vt-note"></p>
  </div>
    </div>
  </section>
`,vatdue:`  <section class="panel" id="panel-vatdue">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u672C\u671F\uFF09</h2>
    <label class="f"><span>\u9500\u9879\u7A0E\u989D\uFF08\u5143\uFF0C\u5F00\u51FA\u53BB\u7684\u53D1\u7968\uFF09</span>
      <input id="vd-out" type="number" inputmode="decimal" min="0" step="1000" value="130000"></label>
    <label class="f"><span>\u8FDB\u9879\u7A0E\u989D\uFF08\u5143\uFF0C\u6536\u5230\u7684\u4E13\u7968\u8BA4\u8BC1\u62B5\u6263\uFF09</span>
      <input id="vd-in" type="number" inputmode="decimal" min="0" step="1000" value="78000"></label>
    <label class="f"><span>\u671F\u521D\u7559\u62B5\u7A0E\u989D\uFF08\u5143\uFF0C\u4E0A\u671F\u6CA1\u62B5\u5B8C\u7ED3\u8F6C\u7684\uFF09</span>
      <input id="vd-carry" type="number" inputmode="decimal" min="0" step="1000" value="5000"></label>
    <label class="f"><span>\u672C\u671F\u4E0D\u542B\u7A0E\u9500\u552E\u989D\uFF08\u5143\uFF0C\u7B97\u7A0E\u8D1F\u7387\u7528\uFF09</span>
      <input id="vd-sales" type="number" inputmode="decimal" min="0" step="10000" value="1000000"></label>
    <label class="f"><span>\u57CE\u5E02\u7EF4\u62A4\u5EFA\u8BBE\u7A0E / \u6559\u80B2\u8D39\u9644\u52A0 / \u5730\u65B9\u6559\u80B2\u9644\u52A0\uFF08%\uFF09</span>
      <div class="row">
        <input id="vd-urban" type="number" inputmode="decimal" min="0" max="20" step="1" value="7">
        <input id="vd-edu" type="number" inputmode="decimal" min="0" max="10" step="1" value="3">
        <input id="vd-local" type="number" inputmode="decimal" min="0" max="10" step="1" value="2">
      </div></label>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u672C\u671F\u5E94\u4EA4\u589E\u503C\u7A0E</span><strong id="vd-due">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u9500\u9879 \u2212 \u8FDB\u9879 \u2212 \u671F\u521D\u7559\u62B5</span><b id="vd-raw">\u2014</b></li>
      <li><span>\u671F\u672B\u7559\u62B5\uFF08\u7ED3\u8F6C\u4E0B\u671F\uFF09</span><b id="vd-left">\u2014</b></li>
      <li><span>\u57CE\u5EFA\u7A0E</span><b id="vd-urban-amt">\u2014</b></li>
      <li><span>\u6559\u80B2\u8D39\u9644\u52A0</span><b id="vd-edu-amt">\u2014</b></li>
      <li><span>\u5730\u65B9\u6559\u80B2\u9644\u52A0</span><b id="vd-local-amt">\u2014</b></li>
      <li><span>\u9644\u52A0\u7A0E\u8D39\u5408\u8BA1</span><b id="vd-surtax">\u2014</b></li>
      <li><span>\u672C\u671F\u8981\u4EA4\u51FA\u53BB\u7684\u94B1\uFF08\u7A0E + \u9644\u52A0\uFF09</span><b id="vd-total">\u2014</b></li>
      <li><span>\u589E\u503C\u7A0E\u7A0E\u8D1F\u7387\uFF08\u5E94\u4EA4 \xF7 \u9500\u552E\u989D\uFF09</span><b id="vd-burden">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u6BDB\u5229\u7387</th><th>\u5E94\u4EA4\u589E\u503C\u7A0E</th><th>\u7A0E\u8D1F\u7387</th></tr></thead>
        <tbody id="vd-body"></tbody>
      </table>
    </div>
    <p class="hint" id="vd-note"></p>
  </div>
    </div>
  </section>
`,taxburden:`  <section class="panel" id="panel-taxburden">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u672C\u6708\u589E\u503C\u7A0E\u6570\u636E\uFF09</h2>
    <label class="f"><span>\u4E0D\u542B\u7A0E\u9500\u552E\u989D\uFF08\u5143\uFF09</span>
      <input id="tbr-sales" type="number" inputmode="decimal" min="0" step="10000" value="1000000"></label>
    <label class="f"><span>\u9500\u9879\u7A0E\u989D\uFF08\u5143\uFF09</span>
      <input id="tbr-out" type="number" inputmode="decimal" min="0" step="1000" value="130000"></label>
    <label class="f"><span>\u672C\u6708\u8BA4\u8BC1\u8FDB\u9879\u7A0E\u989D\uFF08\u5143\uFF09</span>
      <input id="tbr-in" type="number" inputmode="decimal" min="0" step="1000" value="90000"></label>
    <label class="f"><span>\u671F\u521D\u7559\u62B5\u7A0E\u989D\uFF08\u5143\uFF09</span>
      <input id="tbr-begin" type="number" inputmode="decimal" min="0" step="1000" value="5000"></label>
    <label class="f"><span>\u4E0A\u671F\u7A0E\u8D1F\u7387\uFF08%\uFF09</span>
      <input id="tbr-prev" type="number" inputmode="decimal" min="0" step="0.1" value="3.2"></label>
    <label class="f"><span>\u884C\u4E1A\u53C2\u8003\u7A0E\u8D1F\u7387\uFF08%\uFF09</span>
      <input id="tbr-ind" type="number" inputmode="decimal" min="0" step="0.1" value="3"></label>
    <label class="f"><span>\u9644\u52A0\u7A0E\u8D39\u5408\u8BA1\u7387\uFF08%\uFF09</span>
      <input id="tbr-surch" type="number" inputmode="decimal" min="0" step="1" value="12"></label>
    <em>\u53E3\u5F84\uFF1A\u7A0E\u8D1F\u7387 = \u5E94\u4EA4\u589E\u503C\u7A0E \xF7 \u4E0D\u542B\u7A0E\u9500\u552E\u989D\u3002\u884C\u4E1A\u53C2\u8003\u503C\u53EA\u4E3A\u5BF9\u7167\uFF0C\u5404\u5730\u5404\u884C\u4E1A\u5DEE\u5F02\u5927\uFF0C\u4EE5\u4E3B\u7BA1\u7A0E\u52A1\u673A\u5173\u53E3\u5F84\u4E3A\u51C6</em>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u672C\u6708\u589E\u503C\u7A0E\u7A0E\u8D1F\u7387</span><strong id="tbr-big">\u2014</strong><span class="unit">%</span></div>
    <ul class="kv">
      <li><span>\u5E94\u4EA4\u589E\u503C\u7A0E</span><b id="tbr-pay">\u2014</b></li>
      <li><span>\u57CE\u5EFA\u7A0E\u53CA\u6559\u80B2\u8D39\u9644\u52A0</span><b id="tbr-surcharge">\u2014</b></li>
      <li><span>\u73AF\u6BD4\u4E0A\u671F</span><b id="tbr-mom">\u2014</b></li>
      <li><span>\u5BF9\u6BD4\u884C\u4E1A\u53C2\u8003</span><b id="tbr-gap">\u2014</b></li>
      <li><span>\u91C7\u8D2D\u989D\uFF08\u4E0D\u542B\u7A0E\uFF09</span><b id="tbr-buy">\u2014</b></li>
      <li><span>\u5012\u63A8\u6BDB\u5229\u7387</span><b id="tbr-gr">\u2014</b></li>
      <li><span>\u9884\u8B66\u533A\u95F4\uFF08\u884C\u4E1A \xB130%\uFF09</span><b id="tbr-band">\u2014</b></li>
      <li><span>\u5224\u65AD</span><b id="tbr-verdict">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u9879\u76EE</th><th>\u91D1\u989D</th><th>\u8BF4\u660E</th></tr></thead>
        <tbody id="tbr-body"></tbody>
      </table>
    </div>
    <p class="hint" id="tbr-note"></p>
  </div>
    </div>
  </section>
`,refundflow:`  <section class="panel" id="panel-refundflow">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u51FA\u53E3\u9000\u7A0E\u8D44\u91D1\u5360\u7528\uFF09</h2>
    <label class="f"><span>\u6708\u5747\u51FA\u53E3\u989D\uFF08\u5143\uFF0C\u4EBA\u6C11\u5E01\uFF09</span>
      <input id="rf-exp" type="number" inputmode="decimal" min="0" step="100000" value="5000000"></label>
    <label class="f"><span>\u9000\u7A0E\u7387 / \u5F81\u7A0E\u7387\uFF08%\uFF09</span>
      <span class="row"><input id="rf-reb" type="number" inputmode="decimal" min="0" max="100" step="1" value="10">
        <input id="rf-rate" type="number" inputmode="decimal" min="0" max="100" step="1" value="13"></span></label>
    <label class="f"><span>\u51FA\u53E3\u5230\u7533\u62A5\u6EDE\u540E\uFF08\u5929\uFF09</span>
      <input id="rf-lag" type="number" inputmode="decimal" min="0" step="5" value="30"></label>
    <label class="f"><span>\u7533\u62A5\u5230\u5230\u8D26\uFF08\u5929\uFF09</span>
      <input id="rf-audit" type="number" inputmode="decimal" min="0" step="5" value="45"></label>
    <label class="f"><span>\u4F60\u7684\u8D44\u91D1\u6210\u672C\uFF08\u5E74\u5316 %\uFF09</span>
      <input id="rf-cost" type="number" inputmode="decimal" min="0" step="0.5" value="6"></label>
    <em>\u53E3\u5F84\uFF1A\u9000\u7A0E\u6B3E\u5728\u300C\u7533\u62A5\u2014\u5BA1\u6838\u2014\u5230\u8D26\u300D\u8FD9\u6BB5\u65F6\u95F4\u662F\u57AB\u7740\u7684\u94B1\uFF0C\u6309\u5728\u9014\u4F59\u989D\u4E58\u8D44\u91D1\u6210\u672C\u7B97\u5360\u7528\uFF0C\u4E0D\u662F\u6309\u5E74\u9000\u7A0E\u603B\u989D\u7B97</em>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u5728\u9014\u9000\u7A0E\u989D\uFF08\u57AB\u7740\u7684\u94B1\uFF09</span><strong id="rf-big">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u6BCF\u6708\u5E94\u9000\u7A0E\u989D</span><b id="rf-month">\u2014</b></li>
      <li><span>\u5168\u5E74\u9000\u7A0E\u989D</span><b id="rf-year">\u2014</b></li>
      <li><span>\u603B\u5360\u7528\u5929\u6570</span><b id="rf-days">\u2014</b></li>
      <li><span>\u5E74\u8D44\u91D1\u5360\u7528\u6210\u672C</span><b id="rf-costv">\u2014</b></li>
      <li><span>\u5F81\u9000\u7A0E\u7387\u5DEE\uFF08\u4E0D\u53EF\u9000\uFF0C\u8FDB\u6210\u672C\uFF09</span><b id="rf-gap">\u2014</b></li>
      <li><span>\u6BCF\u538B\u7F29 10 \u5929\u53EF\u7701</span><b id="rf-ten">\u2014</b></li>
      <li><span>\u82E5\u538B\u5230 15+30 \u5929</span><b id="rf-opt">\u2014</b></li>
      <li><span>\u5EFA\u8BAE</span><b id="rf-advice">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u73AF\u8282</th><th>\u5929\u6570</th><th>\u5728\u9014\u9000\u7A0E\u989D</th><th>\u5360\u7528\u6210\u672C\uFF08\u5E74\uFF09</th></tr></thead>
        <tbody id="rf-body"></tbody>
      </table>
    </div>
    <p class="hint" id="rf-note"></p>
  </div>
    </div>
  </section>
`,taxadj:`  <section class="panel" id="panel-taxadj">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u4F01\u4E1A\u6240\u5F97\u7A0E\u6C47\u7B97\u8C03\u6574\uFF09</h2>
    <label class="f"><span>\u8425\u4E1A\u6536\u5165\uFF08\u4E07\u5143\uFF09</span>
      <input id="txj-rev" type="number" inputmode="decimal" min="0" step="100" value="5000"></label>
    <label class="f"><span>\u4F1A\u8BA1\u5229\u6DA6\u603B\u989D\uFF08\u4E07\u5143\uFF09</span>
      <input id="txj-profit" type="number" inputmode="decimal" step="50" value="500"></label>
    <label class="f"><span>\u4E1A\u52A1\u62DB\u5F85\u8D39\u53D1\u751F\u989D\uFF08\u4E07\u5143\uFF09</span>
      <input id="txj-ent" type="number" inputmode="decimal" min="0" step="1" value="20"></label>
    <label class="f"><span>\u5E7F\u544A\u5BA3\u4F20\u8D39\u53D1\u751F\u989D\uFF08\u4E07\u5143\uFF09</span>
      <input id="txj-ad" type="number" inputmode="decimal" min="0" step="10" value="300"></label>
    <label class="f"><span>\u7F5A\u6B3E\u6EDE\u7EB3\u91D1\u7B49\uFF08\u4E07\u5143\uFF0C\u4E0D\u5F97\u6263\u9664\uFF09</span>
      <input id="txj-fine" type="number" inputmode="decimal" min="0" step="1" value="5"></label>
    <label class="f"><span>\u516C\u76CA\u6027\u6350\u8D60\uFF08\u4E07\u5143\uFF09</span>
      <input id="txj-don" type="number" inputmode="decimal" min="0" step="5" value="40"></label>
    <label class="f"><span>\u7814\u53D1\u8D39\u7528\uFF08\u4E07\u5143\uFF0C\u52A0\u8BA1\u6BD4\u4F8B %\uFF09</span>
      <span class="row"><input id="txj-rd" type="number" inputmode="decimal" min="0" step="10" value="100">
        <input id="txj-rdr" type="number" inputmode="decimal" min="0" max="100" step="25" value="100"></span></label>
    <label class="f"><span>\u5DF2\u9884\u7F34\u6240\u5F97\u7A0E\uFF08\u4E07\u5143\uFF09</span>
      <input id="txj-pre" type="number" inputmode="decimal" min="0" step="10" value="90"></label>
    <em>\u53E3\u5F84\uFF1A\u62DB\u5F85\u8D39\u6309\u300C\u53D1\u751F\u989D 60%\u300D\u4E0E\u300C\u6536\u5165 5\u2030\u300D\u5B70\u4F4E\uFF1B\u5E7F\u544A\u8D39\u9650 15%\uFF08\u8D85\u652F\u53EF\u7ED3\u8F6C\u4EE5\u540E\u5E74\u5EA6\uFF09\uFF1B\u6350\u8D60\u9650\u5229\u6DA6\u603B\u989D 12%\uFF1B\u7814\u53D1\u52A0\u8BA1\u6BD4\u4F8B\u8FD9\u91CC\u505A\u6210\u53C2\u6570\uFF0C\u6309\u4F60\u9002\u7528\u7684\u653F\u7B56\u586B</em>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D</span><strong id="txj-big">\u2014</strong><span class="unit">\u4E07\u5143</span></div>
    <ul class="kv">
      <li><span>\u62DB\u5F85\u8D39\u9650\u989D / \u8C03\u589E</span><b id="txj-entv">\u2014</b></li>
      <li><span>\u5E7F\u544A\u8D39\u9650\u989D / \u8C03\u589E</span><b id="txj-adv">\u2014</b></li>
      <li><span>\u6350\u8D60\u9650\u989D / \u8C03\u589E</span><b id="txj-donv">\u2014</b></li>
      <li><span>\u7F5A\u6B3E\u7C7B\u8C03\u589E</span><b id="txj-finev">\u2014</b></li>
      <li><span>\u7814\u53D1\u52A0\u8BA1\u8C03\u51CF</span><b id="txj-rdv">\u2014</b></li>
      <li><span>\u5E94\u4EA4\u6240\u5F97\u7A0E / \u5DF2\u9884\u7F34</span><b id="txj-tax">\u2014</b></li>
      <li><span>\u5E94\u8865\uFF08\u9000\uFF09\u7A0E\u989D</span><b id="txj-due">\u2014</b></li>
      <li><span>\u5B9E\u9645\u7A0E\u8D1F\u7387</span><b id="txj-rate">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u8C03\u6574\u9879\u76EE</th><th>\u91D1\u989D</th><th>\u65B9\u5411</th></tr></thead>
        <tbody id="txj-body"></tbody>
      </table>
    </div>
    <p class="hint" id="txj-note"></p>
  </div>
    </div>
  </section>
`,debtcap:`  <section class="panel" id="panel-debtcap">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u5173\u8054\u65B9\u5229\u606F\u6263\u9664\u9650\u989D\uFF09</h2>
    <label class="f"><span>\u5173\u8054\u65B9\u501F\u6B3E\u4F59\u989D\uFF08\u4E07\u5143\uFF09</span>
      <input id="dtc-loan" type="number" inputmode="decimal" min="0" step="100" value="3000"></label>
    <label class="f"><span>\u6743\u76CA\u6027\u6295\u8D44\uFF08\u4E07\u5143\uFF0C\u6240\u6709\u8005\u6743\u76CA\uFF09</span>
      <input id="dtc-eq" type="number" inputmode="decimal" min="0" step="100" value="1000"></label>
    <label class="f"><span>\u501F\u6B3E\u5E74\u5229\u7387\uFF08%\uFF09</span>
      <input id="dtc-rate" type="number" inputmode="decimal" min="0" step="0.1" value="6"></label>
    <label class="f"><span>\u540C\u671F\u91D1\u878D\u4F01\u4E1A\u540C\u7C7B\u8D37\u6B3E\u5229\u7387\uFF08%\uFF09</span>
      <input id="dtc-bank" type="number" inputmode="decimal" min="0" step="0.1" value="5"></label>
    <label class="f"><span>\u503A\u8D44\u6BD4\u4E0A\u9650\uFF08\u500D\uFF09</span>
      <input id="dtc-mult" type="number" inputmode="decimal" min="1" step="0.5" value="2"></label>
    <em>\u53E3\u5F84\uFF1A\u4E24\u9053\u5173\u2014\u2014\u5229\u7387\u4E0D\u8D85\u91D1\u878D\u4F01\u4E1A\u540C\u671F\u540C\u7C7B\u6C34\u5E73\uFF0C\u4E14\u501F\u6B3E\u4E0D\u8D85\u6743\u76CA\u6027\u6295\u8D44\u7684\u89C4\u5B9A\u500D\u6570\uFF08\u975E\u91D1\u878D 2:1\uFF0C\u91D1\u878D 5:1\uFF09\uFF1B\u4E24\u9053\u90FD\u8FC7\u624D\u5168\u989D\u6263</em>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u4E0D\u5F97\u7A0E\u524D\u6263\u9664\u7684\u5229\u606F</span><strong id="dtc-big">\u2014</strong><span class="unit">\u4E07\u5143</span></div>
    <ul class="kv">
      <li><span>\u5B9E\u9645\u503A\u8D44\u6BD4</span><b id="dtc-ratio">\u2014</b></li>
      <li><span>\u53EF\u8BA1\u7B97\u5229\u606F\u7684\u501F\u6B3E\u4E0A\u9650</span><b id="dtc-lim">\u2014</b></li>
      <li><span>\u5B9E\u9645\u652F\u4ED8\u5229\u606F</span><b id="dtc-paid">\u2014</b></li>
      <li><span>\u6309\u5229\u7387\u5173\u53EF\u6263</span><b id="dtc-ratecap">\u2014</b></li>
      <li><span>\u6309\u503A\u8D44\u6BD4\u5173\u53EF\u6263</span><b id="dtc-multcap">\u2014</b></li>
      <li><span>\u6700\u7EC8\u53EF\u6263\u9664 / \u4E0D\u5F97\u6263\u9664</span><b id="dtc-final">\u2014</b></li>
      <li><span>\u591A\u7F34\u4F01\u4E1A\u6240\u5F97\u7A0E</span><b id="dtc-tax">\u2014</b></li>
      <li><span>\u5EFA\u8BAE</span><b id="dtc-advice">\u2014</b></li>
    </ul>
    <p class="hint" id="dtc-note"></p>
  </div>
    </div>
  </section>
`,accdep:`  <section class="panel" id="panel-accdep">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u8BBE\u5907\u4E00\u6B21\u6027\u6263\u9664 / \u52A0\u901F\u6298\u65E7\uFF09</h2>
    <label class="f"><span>\u8BBE\u5907\u539F\u503C\uFF08\u4E07\u5143\uFF09</span>
      <input id="adp-cost" type="number" inputmode="decimal" min="0" step="10" value="480"></label>
    <label class="f"><span>\u4F1A\u8BA1\u6298\u65E7\u5E74\u9650\uFF08\u5E74\uFF09</span>
      <input id="adp-life" type="number" inputmode="decimal" min="1" step="1" value="10"></label>
    <label class="f"><span>\u9884\u8BA1\u6B8B\u503C\u7387\uFF08%\uFF09</span>
      <input id="adp-salv" type="number" inputmode="decimal" min="0" max="100" step="1" value="5"></label>
    <label class="f"><span>\u4F01\u4E1A\u6240\u5F97\u7A0E\u7387\uFF08%\uFF09</span>
      <input id="adp-tax" type="number" inputmode="decimal" min="0" max="100" step="1" value="25"></label>
    <label class="f"><span>\u8D44\u91D1\u6210\u672C\uFF08\u6298\u73B0\u7387 %\uFF09</span>
      <input id="adp-disc" type="number" inputmode="decimal" min="0" step="0.5" value="6"></label>
    <em>\u53E3\u5F84\uFF1A\u4F1A\u8BA1\u6309\u5E74\u9650\u5E73\u5747\u644A\uFF0C\u7A0E\u6CD5\u5141\u8BB8\u4E00\u6B21\u6027\u6263\u9664\uFF08\u8BBE\u5907\u5668\u5177\u5355\u4F4D\u4EF7\u503C\u5728\u4E00\u5B9A\u6807\u51C6\u4EE5\u4E0B\uFF09\uFF1B\u5DEE\u5F02\u53EA\u662F\u300C\u4EC0\u4E48\u65F6\u5019\u4EA4\u300D\uFF0C\u4E0D\u662F\u300C\u5C11\u4EA4\u300D</em>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u5F53\u5E74\u5C11\u7F34\u6240\u5F97\u7A0E\uFF08\u9012\u5EF6\u91D1\u989D\uFF09</span><strong id="adp-big">\u2014</strong><span class="unit">\u4E07\u5143</span></div>
    <ul class="kv">
      <li><span>\u4F1A\u8BA1\u6BCF\u5E74\u6298\u65E7</span><b id="adp-acc">\u2014</b></li>
      <li><span>\u7A0E\u6CD5\u5F53\u5E74\u6263\u9664</span><b id="adp-taxdep">\u2014</b></li>
      <li><span>\u5F53\u5E74\u7A0E\u4F1A\u5DEE\u5F02</span><b id="adp-diff">\u2014</b></li>
      <li><span>\u540E\u7EED\u6BCF\u5E74\u7EB3\u7A0E\u8C03\u589E / \u591A\u7F34</span><b id="adp-later">\u2014</b></li>
      <li><span>\u540E\u7EED\u8C03\u589E\u7684\u73B0\u503C\u5408\u8BA1</span><b id="adp-pv">\u2014</b></li>
      <li><span>\u9012\u5EF6\u5E26\u6765\u7684\u51C0\u73B0\u503C\u6536\u76CA</span><b id="adp-net">\u2014</b></li>
      <li><span>\u76F8\u5F53\u4E8E\u767D\u62FF\u7684\u5E74\u5316\u6536\u76CA\u7387</span><b id="adp-yield">\u2014</b></li>
      <li><span>\u5EFA\u8BAE</span><b id="adp-advice">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u5E74\u5EA6</th><th>\u4F1A\u8BA1\u6298\u65E7</th><th>\u7A0E\u524D\u6263\u9664</th><th>\u7EB3\u7A0E\u8C03\u6574</th></tr></thead>
        <tbody id="adp-body"></tbody>
      </table>
    </div>
    <p class="hint" id="adp-note"></p>
  </div>
    </div>
  </section>
`,esop:`  <section class="panel" id="panel-esop">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u80A1\u6743\u6FC0\u52B1\u8D39\u7528\u644A\u9500\uFF09</h2>
    <label class="f"><span>\u6388\u4E88\u6570\u91CF\uFF08\u4E07\u80A1\uFF09</span>
      <input id="es-shares" type="number" inputmode="decimal" min="0" step="10" value="100"></label>
    <label class="f"><span>\u6388\u4E88\u65E5\u516C\u5141\u4EF7\u503C\uFF08\u5143/\u80A1\uFF09</span>
      <input id="es-fair" type="number" inputmode="decimal" min="0" step="0.5" value="10"></label>
    <label class="f"><span>\u884C\u6743\u4EF7\uFF08\u5143/\u80A1\uFF09</span>
      <input id="es-strike" type="number" inputmode="decimal" min="0" step="0.5" value="4"></label>
    <label class="f"><span>\u7B49\u5F85\u671F / \u5F52\u5C5E\u5E74\u6570</span>
      <input id="es-years" type="number" inputmode="decimal" min="1" step="1" value="4"></label>
    <label class="f"><span>\u9884\u8BA1\u79BB\u804C\u7387\uFF08%\uFF0C\u6BCF\u5E74\uFF09</span>
      <input id="es-leave" type="number" inputmode="decimal" min="0" max="100" step="1" value="5"></label>
    <label class="f"><span>\u6240\u5F97\u7A0E\u7387\uFF08%\uFF09</span>
      <input id="es-tax" type="number" inputmode="decimal" min="0" max="100" step="1" value="25"></label>
    <em>\u53E3\u5F84\uFF1A\u8D39\u7528 =\uFF08\u516C\u5141\u4EF7\u503C \u2212 \u884C\u6743\u4EF7\uFF09\xD7 \u6570\u91CF \xD7\uFF081 \u2212 \u9884\u8BA1\u79BB\u804C\u7387\uFF09\uFF0C\u5728\u7B49\u5F85\u671F\u5185\u6309\u671F\u5206\u644A\uFF1B\u7A0E\u52A1\u4E0A\u8981\u7B49\u5230\u5F52\u5C5E/\u89E3\u7981\u624D\u6309\u5DE5\u8D44\u85AA\u91D1\u6263\u9664</em>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u80A1\u4EFD\u652F\u4ED8\u8D39\u7528\u603B\u989D</span><strong id="es-big">\u2014</strong><span class="unit">\u4E07\u5143</span></div>
    <ul class="kv">
      <li><span>\u6BCF\u80A1\u6FC0\u52B1\u4EF7\u503C</span><b id="es-per">\u2014</b></li>
      <li><span>\u8003\u8651\u79BB\u804C\u540E\u7684\u53EF\u884C\u6743\u6570\u91CF</span><b id="es-qty">\u2014</b></li>
      <li><span>\u5300\u901F\u5F52\u5C5E\uFF1A\u6BCF\u5E74\u8D39\u7528</span><b id="es-flat">\u2014</b></li>
      <li><span>\u52A0\u901F\u5F52\u5C5E\uFF0840/30/20/10\uFF09\u9996\u5E74\u8D39\u7528</span><b id="es-acc">\u2014</b></li>
      <li><span>\u4F1A\u8BA1\u4E0E\u7A0E\u52A1\u5DEE\u5F02\uFF08\u524D\u51E0\u5E74\uFF09</span><b id="es-diff">\u2014</b></li>
      <li><span>\u9012\u5EF6\u6240\u5F97\u7A0E\u8D44\u4EA7\uFF08\u7D2F\u8BA1\uFF09</span><b id="es-dta">\u2014</b></li>
      <li><span>\u5F52\u5C5E\u5E74\u5EA6\u53EF\u7A0E\u524D\u6263\u9664</span><b id="es-deduct">\u2014</b></li>
      <li><span>\u63D0\u793A</span><b id="es-advice">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u5E74\u5EA6</th><th>\u5300\u901F\u5F52\u5C5E</th><th>\u52A0\u901F\u5F52\u5C5E</th><th>\u7A0E\u52A1\u6263\u9664</th></tr></thead>
        <tbody id="es-body"></tbody>
      </table>
    </div>
    <p class="hint" id="es-note"></p>
  </div>
    </div>
  </section>
`,rdexp:`  <section class="panel" id="panel-rdexp">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u7814\u53D1\u8D39\u7528\u52A0\u8BA1\u6263\u9664\uFF09</h2>
    <label class="f"><span>\u4EBA\u5458\u4EBA\u5DE5\u8D39\u7528\uFF08\u4E07\u5143\uFF09</span>
      <input id="rd-labor" type="number" inputmode="decimal" min="0" step="10" value="300"></label>
    <label class="f"><span>\u76F4\u63A5\u6295\u5165\u8D39\u7528\uFF08\u4E07\u5143\uFF09</span>
      <input id="rd-mat" type="number" inputmode="decimal" min="0" step="10" value="150"></label>
    <label class="f"><span>\u6298\u65E7 / \u65E0\u5F62\u8D44\u4EA7\u644A\u9500\uFF08\u4E07\u5143\uFF09</span>
      <input id="rd-dep" type="number" inputmode="decimal" min="0" step="5" value="30"></label>
    <label class="f"><span>\u5176\u4ED6\u76F8\u5173\u8D39\u7528\uFF08\u4E07\u5143\uFF09</span>
      <input id="rd-other" type="number" inputmode="decimal" min="0" step="5" value="20"></label>
    <label class="f"><span>\u52A0\u8BA1\u6263\u9664\u6BD4\u4F8B\uFF08%\uFF09</span>
      <input id="rd-pct" type="number" inputmode="decimal" min="0" max="200" step="25" value="100"></label>
    <label class="f"><span>\u4F01\u4E1A\u6240\u5F97\u7A0E\u7387\uFF08%\uFF09</span>
      <input id="rd-tax" type="number" inputmode="decimal" min="0" max="100" step="1" value="25"></label>
    <em>\u53E3\u5F84\uFF1A\u300C\u5176\u4ED6\u76F8\u5173\u8D39\u7528\u300D\u6709 10% \u9650\u989D\uFF08\uFF1D\u524D\u4E09\u9879 \xF7 9% \u7684\u5C01\u9876\u7B97\u6CD5\uFF09\uFF0C\u8D85\u4E86\u4E0D\u80FD\u52A0\u8BA1\uFF1B\u5931\u8D25\u7684\u7814\u53D1\u6D3B\u52A8\u3001\u5E38\u89C4\u6027\u5347\u7EA7\u4E0D\u7B97</em>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u53EF\u52A0\u8BA1\u6263\u9664\u91D1\u989D\uFF08\u518D\u52A0\u4E00\u6B21\uFF09</span><strong id="rd-big">\u2014</strong><span class="unit">\u4E07\u5143</span></div>
    <ul class="kv">
      <li><span>\u7814\u53D1\u8D39\u7528\u5F52\u96C6\u5408\u8BA1</span><b id="rd-total">\u2014</b></li>
      <li><span>\u5176\u4ED6\u76F8\u5173\u8D39\u7528\u9650\u989D</span><b id="rd-cap">\u2014</b></li>
      <li><span>\u53EF\u8BA1\u5165\u7684\u5176\u4ED6\u8D39\u7528</span><b id="rd-effect">\u2014</b></li>
      <li><span>\u52A0\u8BA1\u6263\u9664\u57FA\u6570</span><b id="rd-base">\u2014</b></li>
      <li><span>\u52A0\u8BA1\u6BD4\u4F8B / \u5C11\u7F34\u6240\u5F97\u7A0E</span><b id="rd-save">\u2014</b></li>
      <li><span>\u76F8\u5F53\u4E8E\u7814\u53D1\u6295\u5165\u6253\u6298\u540E</span><b id="rd-eff">\u2014</b></li>
      <li><span>\u4E0D\u80FD\u52A0\u8BA1\u7684\u90E8\u5206</span><b id="rd-lost">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u9879\u76EE</th><th>\u91D1\u989D\uFF08\u4E07\u5143\uFF09</th><th>\u80FD\u5426\u52A0\u8BA1</th></tr></thead>
        <tbody id="rd-body"></tbody>
      </table>
    </div>
    <p class="hint" id="rd-note"></p>
  </div>
    </div>
  </section>
`,exportrebate:`  <section class="panel" id="panel-exportrebate">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u751F\u4EA7\u4F01\u4E1A\u514D\u62B5\u9000\uFF0C\u6708\u7533\u62A5\u6570\uFF09</h2>
    <label class="f"><span>\u51FA\u53E3\u9500\u552E\u989D FOB\uFF08\u4EBA\u6C11\u5E01\uFF0C\u5143\uFF09</span>
      <input id="er-exp" type="number" inputmode="decimal" min="0" step="10000" value="5000000"></label>
    <label class="f"><span>\u5F81\u7A0E\u7387\uFF08%\uFF09</span>
      <input id="er-vat" type="number" inputmode="decimal" min="0" max="20" step="1" value="13"></label>
    <label class="f"><span>\u51FA\u53E3\u9000\u7A0E\u7387\uFF08%\uFF09</span>
      <input id="er-reb" type="number" inputmode="decimal" min="0" max="20" step="1" value="10"></label>
    <label class="f"><span>\u5185\u9500\u9500\u552E\u989D\uFF08\u4E0D\u542B\u7A0E\uFF0C\u5143\uFF09</span>
      <input id="er-dom" type="number" inputmode="decimal" min="0" step="10000" value="1000000"></label>
    <label class="f"><span>\u672C\u671F\u8FDB\u9879\u7A0E\u989D\uFF08\u5143\uFF0C\u5DF2\u8BA4\u8BC1\uFF09</span>
      <input id="er-in" type="number" inputmode="decimal" min="0" step="10000" value="400000"></label>
    <label class="f"><span>\u4E0A\u671F\u7559\u62B5\u7A0E\u989D\uFF08\u5143\uFF09</span>
      <input id="er-carry" type="number" inputmode="decimal" min="0" step="10000" value="0"></label>
    <em>\u51FA\u53E3\u989D\u6309 FOB \u4EF7\u6298\u7B97\u4EBA\u6C11\u5E01\uFF1B\u9000\u7A0E\u7387\u4F4E\u4E8E\u5F81\u7A0E\u7387\u7684\u90A3\u90E8\u5206\u5DEE\u989D\u4E0D\u80FD\u9000\uFF0C\u8981\u505A\u8FDB\u9879\u7A0E\u989D\u8F6C\u51FA</em>
  </div>

  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u672C\u671F\u5E94\u9000\u7A0E\u989D</span><strong id="er-refund">\u2014</strong><span class="unit"></span></div>
    <ul class="kv">
      <li><span>\u514D\u62B5\u9000\u7A0E\u989D\uFF08\u51FA\u53E3\u989D \xD7 \u9000\u7A0E\u7387\uFF09</span><b id="er-ec">\u2014</b></li>
      <li><span>\u4E0D\u5F97\u514D\u5F81\u548C\u62B5\u6263\u7A0E\u989D\uFF08\u8FDB\u9879\u8F6C\u51FA\uFF09</span><b id="er-non">\u2014</b></li>
      <li><span>\u8F6C\u51FA\u540E\u53EF\u62B5\u6263\u8FDB\u9879</span><b id="er-avail">\u2014</b></li>
      <li><span>\u5185\u9500\u9500\u9879\u7A0E\u989D</span><b id="er-dout">\u2014</b></li>
      <li><span>\u5E94\u7EB3\u7A0E\u989D / \u671F\u672B\u7559\u62B5</span><b id="er-raw">\u2014</b></li>
      <li><span>\u514D\u62B5\u989D\uFF08\u62B5\u6389\u5185\u9500\u7A0E\u7684\u90E8\u5206\uFF09</span><b id="er-exempt">\u2014</b></li>
      <li><span>\u9000\u7A0E\u540E\u4ECD\u7ED3\u8F6C\u4E0B\u671F\u7684\u7559\u62B5</span><b id="er-carryleft">\u2014</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>\u6B65\u9AA4</th><th>\u91D1\u989D</th><th>\u8BF4\u660E</th></tr></thead>
        <tbody id="er-body"></tbody>
      </table>
    </div>
    <p class="hint" id="er-note"></p>
  </div>
    </div>
  </section>
`,govgrant:`  <section class="panel" id="panel-govgrant">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u8865\u52A9\u91D1\u989D</span>
      <input id="ggr-amt" type="number" inputmode="decimal" min="0" step="10000" value="2400000">
    </label>
    <label class="f">
      <span>\u7C7B\u578B</span>
      <select id="ggr-type">
        <option value="asset">\u4E0E\u8D44\u4EA7\u76F8\u5173\uFF08\u4E70\u8BBE\u5907\u3001\u5EFA\u623F\uFF09</option>
        <option value="income">\u4E0E\u6536\u76CA\u76F8\u5173\uFF08\u8865\u5DF2\u53D1\u751F\u6216\u672A\u6765\u7684\u8D39\u7528\uFF09</option>
      </select>
    </label>
    <span class="row">
      <input id="ggr-years" type="number" inputmode="numeric" min="1" step="1" value="10" aria-label="\u644A\u9500\u5E74\u9650">
      <input id="ggr-tax" type="number" inputmode="decimal" min="0" step="1" value="25" aria-label="\u4F01\u4E1A\u6240\u5F97\u7A0E\u7387">
    </span>
    <p class="hint">\u5DE6\uFF1A\u644A\u9500\u5E74\u9650\uFF08\u5E74\uFF09\uFF0C\u53F3\uFF1A\u4F01\u4E1A\u6240\u5F97\u7A0E\u7387\uFF08%\uFF09</p>
    <label class="f">
      <span>\u8D44\u91D1\u6210\u672C / \u6298\u73B0\u7387\uFF08%\uFF09</span>
      <input id="ggr-rate" type="number" inputmode="decimal" min="0" step="0.1" value="5">
      <em>\u7528\u6765\u6BD4\u8F83\u300C\u4F5C\u4E0D\u5F81\u7A0E\u6536\u5165\u300D\u548C\u300C\u4F5C\u5E94\u7A0E\u6536\u5165\u300D\u54EA\u4E2A\u5212\u7B97</em>
    </label>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u6BCF\u6708\u8BA1\u5165\u635F\u76CA</span><strong id="ggr-big">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u5E74\u8BA1\u5165\u635F\u76CA</span><b id="ggr-year">\u2014</b></li>
      <li><span>\u4F5C\u5E94\u7A0E\u6536\u5165\uFF1A\u5F53\u671F\u7EB3\u7A0E</span><b id="ggr-taxnow">\u2014</b></li>
      <li><span>10 \u5E74\u6298\u65E7/\u8D39\u7528\u62B5\u7A0E\u73B0\u503C</span><b id="ggr-pvded">\u2014</b></li>
      <li><span>\u4F5C\u5E94\u7A0E\uFF1A\u51C0\u7A0E\u6536\u6210\u672C\u73B0\u503C</span><b id="ggr-pv1">\u2014</b></li>
      <li><span>\u4F5C\u4E0D\u5F81\u7A0E\uFF1A\u51C0\u7A0E\u6536\u6210\u672C\u73B0\u503C</span><b id="ggr-pv2">\u2014</b></li>
      <li><span>\u7ED3\u8BBA</span><b id="ggr-pick">\u2014</b></li>
    </ul>
    <p class="hint" id="ggr-note"></p>
  </div>
    </div>
  </section>
`,rdcap:`  <section class="panel" id="panel-rdcap">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u5F53\u5E74\u7814\u53D1\u652F\u51FA\u5408\u8BA1</span>
      <input id="rdc-total" type="number" inputmode="decimal" min="0" step="100000" value="6000000">
    </label>
    <span class="row">
      <input id="rdc-cap" type="number" inputmode="decimal" min="0" max="100" step="5" value="40" aria-label="\u8D44\u672C\u5316\u6BD4\u4F8B">
      <input id="rdc-years" type="number" inputmode="numeric" min="1" step="1" value="5" aria-label="\u644A\u9500\u5E74\u9650">
    </span>
    <p class="hint">\u5DE6\uFF1A\u8D44\u672C\u5316\u6BD4\u4F8B\uFF08%\uFF09\uFF0C\u53F3\uFF1A\u644A\u9500\u5E74\u9650\uFF08\u5E74\uFF09</p>
    <span class="row">
      <input id="rdc-months" type="number" inputmode="numeric" min="1" max="12" step="1" value="6" aria-label="\u5F53\u5E74\u644A\u9500\u6708\u6570">
      <input id="rdc-tax" type="number" inputmode="decimal" min="0" max="100" step="1" value="25" aria-label="\u6240\u5F97\u7A0E\u7387">
    </span>
    <p class="hint">\u5DE6\uFF1A\u5F53\u5E74\u644A\u9500\u6708\u6570\uFF0C\u53F3\uFF1A\u6240\u5F97\u7A0E\u7387\uFF08%\uFF09</p>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u5F53\u5E74\u7814\u53D1\u5F71\u54CD\u635F\u76CA</span><strong id="rdc-big">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u8D39\u7528\u5316 / \u8D44\u672C\u5316</span><b id="rdc-split">\u2014</b></li>
      <li><span>\u5F53\u5E74\u644A\u9500</span><b id="rdc-amort">\u2014</b></li>
      <li><span>\u6BD4\u5168\u90E8\u8D39\u7528\u5316\u591A\u51FA\u5229\u6DA6</span><b id="rdc-gain">\u2014</b></li>
      <li><span>\u51C0\u5229\u5F71\u54CD\uFF08\u7A0E\u540E\uFF09</span><b id="rdc-np">\u2014</b></li>
      <li><span>\u52A0\u8BA1\u6263\u9664\u57FA\u6570</span><b id="rdc-add">\u2014</b></li>
      <li><span>\u5C11\u7F34\u4F01\u4E1A\u6240\u5F97\u7A0E</span><b id="rdc-taxout">\u2014</b></li>
      <li><span>\u672A\u6765\u4ECD\u9700\u644A\u9500</span><b id="rdc-left">\u2014</b></li>
    </ul>
    <p class="hint" id="rdc-note"></p>
  </div>
    </div>
  </section>
`,salesallow:`  <section class="panel" id="panel-salesallow">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u4E0D\u542B\u7A0E\u53E3\u5F84\uFF09</h2>
    <label class="f">
      <span>\u9500\u552E\u989D\uFF08\u5F00\u7968\u4E0D\u542B\u7A0E\uFF09</span>
      <input id="alw-sales" type="number" inputmode="decimal" min="0" step="10000" value="1000000">
    </label>
    <span class="row">
      <input id="alw-allow" type="number" inputmode="decimal" min="0" max="100" step="0.5" value="3" aria-label="\u6298\u8BA9\u7387">
      <input id="alw-ret" type="number" inputmode="decimal" min="0" max="100" step="0.5" value="2" aria-label="\u9000\u8D27\u7387">
    </span>
    <p class="hint">\u5DE6\uFF1A\u9500\u552E\u6298\u8BA9\u7387\uFF08%\uFF09\uFF0C\u53F3\uFF1A\u9884\u8BA1\u9000\u8D27\u7387\uFF08%\uFF09</p>
    <span class="row">
      <input id="alw-giftcost" type="number" inputmode="decimal" min="0" step="10000" value="50000" aria-label="\u8D60\u54C1\u6210\u672C">
      <input id="alw-giftval" type="number" inputmode="decimal" min="0" step="10000" value="80000" aria-label="\u8D60\u54C1\u516C\u5141\u4EF7">
    </span>
    <p class="hint">\u5DE6\uFF1A\u8D60\u54C1\u6210\u672C\uFF0C\u53F3\uFF1A\u8D60\u54C1\u516C\u5141\u4EF7\u503C\uFF08\u89C6\u540C\u9500\u552E\u7684\u8BA1\u7A0E\u4F9D\u636E\uFF09</p>
    <span class="row">
      <input id="alw-vc" type="number" inputmode="decimal" min="0" max="100" step="1" value="70" aria-label="\u6210\u672C\u7387">
      <input id="alw-vat" type="number" inputmode="decimal" min="0" step="1" value="13" aria-label="\u589E\u503C\u7A0E\u7387">
    </span>
    <p class="hint">\u5DE6\uFF1A\u6210\u672C\u7387\uFF08%\uFF09\uFF0C\u53F3\uFF1A\u589E\u503C\u7A0E\u7387\uFF08%\uFF09\uFF1B\u9644\u52A0\u6309 12%\u3001\u6240\u5F97\u7A0E 25% \u56FA\u5B9A</p>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u8D60\u54C1\u5168\u53E3\u5F84\u4EE3\u4EF7</span><strong id="alw-big">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u6298\u8BA9 / \u9000\u8D27\u51B2\u51CF\u6536\u5165</span><b id="alw-cut">\u2014</b></li>
      <li><span>\u6536\u5165\u51C0\u989D</span><b id="alw-net">\u2014</b></li>
      <li><span>\u9500\u9879\u7A0E\u5408\u8BA1\uFF08\u542B\u89C6\u540C\u9500\u552E\uFF09</span><b id="alw-vatout">\u2014</b></li>
      <li><span>\u9644\u52A0\u7A0E\u8D39</span><b id="alw-surtax">\u2014</b></li>
      <li><span>\u6BDB\u5229\uFF08\u8D60\u54C1\u8D39\u7528\u524D / \u540E\uFF09</span><b id="alw-gp">\u2014</b></li>
      <li><span>\u8D60\u54C1\u9500\u9879\u7A0E / \u9644\u52A0</span><b id="alw-gv">\u2014</b></li>
      <li><span>\u8D60\u54C1\u6240\u5F97\u7A0E\u5F71\u54CD</span><b id="alw-gt">\u2014</b></li>
    </ul>
    <p class="hint" id="alw-note"></p>
  </div>
    </div>
  </section>
`,vatchoose:`  <section class="panel" id="panel-vatchoose">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u4E0D\u542B\u7A0E\u53E3\u5F84\uFF09</h2>
    <label class="f">
      <span>\u5E74\u9500\u552E\u989D</span>
      <input id="vtc-sales" type="number" inputmode="decimal" min="0" step="100000" value="5000000">
    </label>
    <span class="row">
      <input id="vtc-cost" type="number" inputmode="decimal" min="0" max="100" step="1" value="70" aria-label="\u6210\u672C\u7387">
      <input id="vtc-ded" type="number" inputmode="decimal" min="0" max="100" step="5" value="100" aria-label="\u8FDB\u9879\u53EF\u62B5\u6263\u6BD4\u4F8B">
    </span>
    <p class="hint">\u5DE6\uFF1A\u6210\u672C\u7387\uFF08%\uFF09\uFF0C\u53F3\uFF1A\u91C7\u8D2D\u4E2D\u80FD\u62FF\u5230\u4E13\u7968\u7684\u6BD4\u4F8B\uFF08%\uFF09\u2014\u2014\u4EBA\u5DE5\u4E3A\u4E3B\u7684\u884C\u4E1A\u8981\u8C03\u4F4E</p>
    <span class="row">
      <input id="vtc-rate13" type="number" inputmode="decimal" min="0" step="1" value="13" aria-label="\u4E00\u822C\u7EB3\u7A0E\u4EBA\u7A0E\u7387">
      <input id="vtc-rate3" type="number" inputmode="decimal" min="0" step="0.5" value="3" aria-label="\u5C0F\u89C4\u6A21\u5F81\u6536\u7387">
    </span>
    <p class="hint">\u5DE6\uFF1A\u4E00\u822C\u7EB3\u7A0E\u4EBA\u7A0E\u7387\uFF08%\uFF09\uFF0C\u53F3\uFF1A\u5C0F\u89C4\u6A21\u5F81\u6536\u7387\uFF08%\uFF09</p>
    <label class="f">
      <span>\u6240\u5F97\u7A0E\u7387\uFF08%\uFF09</span>
      <input id="vtc-tax" type="number" inputmode="decimal" min="0" max="100" step="1" value="25">
    </label>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u4E00\u822C\u7EB3\u7A0E\u4EBA\u591A\u8D5A\uFF08\u7A0E\u540E\uFF09</span><strong id="vtc-big">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u4E00\u822C\uFF1A\u9500\u9879 / \u8FDB\u9879 / \u5E94\u4EA4</span><b id="vtc-g1">\u2014</b></li>
      <li><span>\u4E00\u822C\uFF1A\u9644\u52A0 / \u51C0\u5229</span><b id="vtc-g2">\u2014</b></li>
      <li><span>\u5C0F\u89C4\u6A21\uFF1A\u5E94\u4EA4\u589E\u503C\u7A0E</span><b id="vtc-s1">\u2014</b></li>
      <li><span>\u5C0F\u89C4\u6A21\uFF1A\u542B\u7A0E\u6210\u672C / \u9644\u52A0</span><b id="vtc-s2">\u2014</b></li>
      <li><span>\u5C0F\u89C4\u6A21\uFF1A\u51C0\u5229</span><b id="vtc-s3">\u2014</b></li>
      <li><span>\u65E0\u5DEE\u5F02\u6210\u672C\u7387 / \u6BDB\u5229\u7387</span><b id="vtc-be">\u2014</b></li>
    </ul>
    <p class="hint" id="vtc-note"></p>
  </div>
    </div>
  </section>
`,rebatedta:`  <section class="panel" id="panel-rebatedta">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u6743\u8D23\u53D1\u751F\u5236\u4E0B\u5DF2\u8BA1\u63D0\uFF09</h2>
    <label class="f">
      <span>\u5DF2\u8BA1\u63D0\u672A\u652F\u4ED8\u7684\u9500\u552E\u8FD4\u5229</span>
      <input id="rdt-rebate" type="number" inputmode="decimal" min="0" step="10000" value="800000">
    </label>
    <label class="f">
      <span>\u9884\u8BA1\u9000\u8D27\u8D1F\u503A\uFF08\u5E94\u4ED8\u9000\u8D27\u6B3E\uFF09</span>
      <input id="rdt-return" type="number" inputmode="decimal" min="0" step="10000" value="300000">
    </label>
    <label class="f">
      <span>\u9884\u8BA1\u9000\u8D27\u5B58\u8D27\u6210\u672C\u53EF\u6536\u56DE</span>
      <input id="rdt-stock" type="number" inputmode="decimal" min="0" step="10000" value="210000">
      <em>\u9000\u8D27\u5165\u5E93\u7684\u5B58\u8D27\uFF0C\u6309\u8D26\u9762\u6210\u672C\u51B2\u56DE\u4E3B\u8425\u6210\u672C\uFF0C\u8FD9\u90E8\u5206\u4E0D\u4EA7\u751F\u7A0E\u4F1A\u5DEE\u5F02</em>
    </label>
    <label class="f">
      <span>\u6240\u5F97\u7A0E\u7387\uFF08%\uFF09</span>
      <input id="rdt-tax" type="number" inputmode="decimal" min="0" max="100" step="1" value="25">
    </label>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u786E\u8BA4\u9012\u5EF6\u6240\u5F97\u7A0E\u8D44\u4EA7</span><strong id="rdt-big">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u53EF\u62B5\u6263\u6682\u65F6\u6027\u5DEE\u5F02</span><b id="rdt-td">\u2014</b></li>
      <li><span>\u5F53\u671F\u7EB3\u7A0E\u8C03\u589E</span><b id="rdt-add">\u2014</b></li>
      <li><span>\u5F53\u671F\u591A\u7F34\u7A0E / \u672A\u6765\u5C11\u7F34</span><b id="rdt-cash">\u2014</b></li>
      <li><span>\u5176\u4E2D\u7A0E\u4F1A\u4E00\u81F4\u90E8\u5206</span><b id="rdt-same">\u2014</b></li>
      <li><span>\u5229\u6DA6\u8868\u5F71\u54CD\uFF08\u7A0E\u540E\uFF09</span><b id="rdt-pl">\u2014</b></li>
    </ul>
    <p class="hint" id="rdt-note"></p>
  </div>
    </div>
  </section>
`,welfare:`  <section class="panel" id="panel-welfare">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u5DE5\u8D44\u85AA\u91D1\u603B\u989D</span>
      <input id="wlf-wage" type="number" inputmode="decimal" min="0" step="100000" value="10000000">
      <em>\u9650\u989D\u7684\u8BA1\u7B97\u57FA\u6570\u662F\u300C\u5B9E\u9645\u53D1\u653E\u7684\u5408\u7406\u5DE5\u8D44\u85AA\u91D1\u300D\uFF0C\u4E0D\u662F\u8BA1\u63D0\u6570</em>
    </label>
    <span class="row">
      <input id="wlf-wel" type="number" inputmode="decimal" min="0" step="10000" value="1600000" aria-label="\u804C\u5DE5\u798F\u5229\u8D39\u5B9E\u9645\u53D1\u751F">
      <input id="wlf-edu" type="number" inputmode="decimal" min="0" step="10000" value="900000" aria-label="\u804C\u5DE5\u6559\u80B2\u7ECF\u8D39\u5B9E\u9645\u53D1\u751F">
    </span>
    <p class="hint">\u5DE6\uFF1A\u804C\u5DE5\u798F\u5229\u8D39\uFF08\u9650\u989D 14%\uFF09\uFF0C\u53F3\uFF1A\u804C\u5DE5\u6559\u80B2\u7ECF\u8D39\uFF08\u9650\u989D 8%\uFF0C\u8D85\u989D\u53EF\u7ED3\u8F6C\u4EE5\u540E\u5E74\u5EA6\uFF09</p>
    <span class="row">
      <input id="wlf-union" type="number" inputmode="decimal" min="0" step="10000" value="180000" aria-label="\u5DE5\u4F1A\u7ECF\u8D39\u5B9E\u9645\u53D1\u751F">
      <input id="wlf-tax" type="number" inputmode="decimal" min="0" max="100" step="1" value="25" aria-label="\u6240\u5F97\u7A0E\u7387">
    </span>
    <p class="hint">\u5DE6\uFF1A\u5DE5\u4F1A\u7ECF\u8D39\uFF08\u9650\u989D 2%\uFF0C\u987B\u6709\u4E13\u7528\u6536\u636E\uFF09\uFF0C\u53F3\uFF1A\u6240\u5F97\u7A0E\u7387\uFF08%\uFF09</p>
    <span class="row">
      <input id="wlf-emp" type="number" inputmode="numeric" min="0" step="10" value="200" aria-label="\u5728\u804C\u804C\u5DE5\u4EBA\u6570">
      <input id="wlf-dis" type="number" inputmode="numeric" min="0" step="1" value="2" aria-label="\u5DF2\u5B89\u7F6E\u6B8B\u75BE\u4EBA\u6570">
    </span>
    <p class="hint">\u5DE6\uFF1A\u5728\u804C\u804C\u5DE5\u4EBA\u6570\uFF0C\u53F3\uFF1A\u5DF2\u5B89\u7F6E\u6B8B\u75BE\u4EBA\u6570\uFF08\u6BD4\u4F8B 1.5%\uFF09</p>
    <span class="row">
      <input id="wlf-avg" type="number" inputmode="decimal" min="0" step="1000" value="90000" aria-label="\u5E74\u5E73\u5747\u5DE5\u8D44">
      <input id="wlf-rate" type="number" inputmode="decimal" min="0" max="100" step="5" value="90" aria-label="\u6B8B\u4FDD\u91D1\u5F81\u6536\u6BD4\u4F8B">
    </span>
    <p class="hint">\u5DE6\uFF1A\u804C\u5DE5\u5E74\u5E73\u5747\u5DE5\u8D44\uFF0C\u53F3\uFF1A\u5206\u6863\u5F81\u6536\u6BD4\u4F8B\uFF08%\uFF0C\u6309\u5F53\u5730\u5206\u6863\u653F\u7B56\u586B\uFF09</p>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u8D85\u9650\u8C03\u589E\u5408\u8BA1</span><strong id="wlf-big">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u798F\u5229\u8D39\uFF1A\u9650\u989D / \u5B9E\u9645</span><b id="wlf-welout">\u2014</b></li>
      <li><span>\u6559\u80B2\u7ECF\u8D39\uFF1A\u9650\u989D / \u5B9E\u9645</span><b id="wlf-eduout">\u2014</b></li>
      <li><span>\u5DE5\u4F1A\u7ECF\u8D39\uFF1A\u9650\u989D / \u5B9E\u9645</span><b id="wlf-uniout">\u2014</b></li>
      <li><span>\u5408\u8BA1\u591A\u7F34\u4F01\u4E1A\u6240\u5F97\u7A0E</span><b id="wlf-taxout">\u2014</b></li>
      <li><span>\u6B8B\u4FDD\u91D1\u5DEE\u989D\u4EBA\u6570</span><b id="wlf-gap">\u2014</b></li>
      <li><span>\u5E94\u7F34\u6B8B\u4FDD\u91D1</span><b id="wlf-fund">\u2014</b></li>
      <li><span>\u518D\u5B89\u7F6E 1 \u4EBA\u53EF\u7701</span><b id="wlf-save">\u2014</b></li>
    </ul>
    <p class="hint" id="wlf-note"></p>
  </div>
    </div>
  </section>
`,inputout:`  <section class="panel" id="panel-inputout">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u5F53\u671F\u65E0\u6CD5\u5212\u5206\u7684\u8FDB\u9879\u7A0E\u989D</span>
      <input id="itr-input" type="number" inputmode="decimal" min="0" step="1000" value="130000">
      <em>\u5982\u529E\u516C\u8D39\u3001\u6C34\u7535\u3001\u623F\u79DF\u3001\u901A\u4FE1\u7528\u8F66\u7B49\u540C\u65F6\u670D\u52A1\u4E24\u7C7B\u4E1A\u52A1\u7684\u8FDB\u9879</em>
    </label>
    <span class="row">
      <input id="itr-tax" type="number" inputmode="decimal" min="0" step="100000" value="8000000" aria-label="\u4E00\u822C\u8BA1\u7A0E\u9500\u552E\u989D">
      <input id="itr-simple" type="number" inputmode="decimal" min="0" step="100000" value="2000000" aria-label="\u7B80\u6613\u8BA1\u7A0E\u9500\u552E\u989D">
    </span>
    <p class="hint">\u5DE6\uFF1A\u4E00\u822C\u8BA1\u7A0E\u9500\u552E\u989D\uFF0C\u53F3\uFF1A\u7B80\u6613\u8BA1\u7A0E\u9500\u552E\u989D</p>
    <label class="f">
      <span>\u514D\u7A0E\u9500\u552E\u989D</span>
      <input id="itr-free" type="number" inputmode="decimal" min="0" step="100000" value="0">
    </label>
    <span class="row">
      <input id="itr-welf" type="number" inputmode="decimal" min="0" step="1000" value="50000" aria-label="\u96C6\u4F53\u798F\u5229\u4E2A\u4EBA\u6D88\u8D39\u8FDB\u9879">
      <input id="itr-loss" type="number" inputmode="decimal" min="0" step="1000" value="30000" aria-label="\u975E\u6B63\u5E38\u635F\u5931\u8FDB\u9879">
    </span>
    <p class="hint">\u5DE6\uFF1A\u7528\u4E8E\u96C6\u4F53\u798F\u5229/\u4E2A\u4EBA\u6D88\u8D39\u7684\u8FDB\u9879\uFF08\u5168\u989D\u8F6C\u51FA\uFF09\uFF0C\u53F3\uFF1A\u975E\u6B63\u5E38\u635F\u5931\u8FDB\u9879\uFF08\u5168\u989D\u8F6C\u51FA\uFF09</p>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u672C\u671F\u5E94\u8F6C\u51FA\u8FDB\u9879</span><strong id="itr-big">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u4E0D\u5F97\u62B5\u6263\u6BD4\u4F8B</span><b id="itr-ratio">\u2014</b></li>
      <li><span>\u6309\u6BD4\u4F8B\u8F6C\u51FA</span><b id="itr-part">\u2014</b></li>
      <li><span>\u798F\u5229 / \u635F\u5931\u5168\u989D\u8F6C\u51FA</span><b id="itr-full">\u2014</b></li>
      <li><span>\u4ECD\u53EF\u62B5\u6263\u8FDB\u9879</span><b id="itr-left">\u2014</b></li>
      <li><span>\u8F6C\u51FA\u5360\u8FDB\u9879\u6BD4</span><b id="itr-pct">\u2014</b></li>
      <li><span>\u6F0F\u8F6C\u7684\u5E74\u5EA6\u98CE\u9669</span><b id="itr-risk">\u2014</b></li>
    </ul>
    <p class="hint" id="itr-note"></p>
  </div>
    </div>
  </section>
`,stampduty:`  <section class="panel" id="panel-stampduty">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165\uFF08\u4E0D\u542B\u7A0E\u91D1\u989D\uFF0C\u5408\u540C\u5206\u522B\u5217\u660E\u4EF7\u6B3E\u4E0E\u7A0E\u989D\u7684\u6309\u4E0D\u542B\u7A0E\uFF09</h2>
    <span class="row">
      <input id="sdt-sale" type="number" inputmode="decimal" min="0" step="100000" value="10000000" aria-label="\u4E70\u5356\u5408\u540C">
      <input id="sdt-loan" type="number" inputmode="decimal" min="0" step="100000" value="5000000" aria-label="\u501F\u6B3E\u5408\u540C">
    </span>
    <p class="hint">\u5DE6\uFF1A\u4E70\u5356\u5408\u540C\uFF080.03%\uFF09\uFF0C\u53F3\uFF1A\u501F\u6B3E\u5408\u540C\uFF080.005%\uFF0C\u4EC5\u94F6\u884C\u7B49\u91D1\u878D\u673A\u6784\u501F\u6B3E\uFF09</p>
    <span class="row">
      <input id="sdt-lease" type="number" inputmode="decimal" min="0" step="100000" value="1200000" aria-label="\u79DF\u8D41\u5408\u540C">
      <input id="sdt-trans" type="number" inputmode="decimal" min="0" step="100000" value="800000" aria-label="\u8FD0\u8F93\u5408\u540C">
    </span>
    <p class="hint">\u5DE6\uFF1A\u79DF\u8D41\u5408\u540C\uFF080.1%\uFF09\uFF0C\u53F3\uFF1A\u8FD0\u8F93\u5408\u540C\uFF080.03%\uFF09</p>
    <span class="row">
      <input id="sdt-equity" type="number" inputmode="decimal" min="0" step="100000" value="2000000" aria-label="\u4EA7\u6743\u8F6C\u79FB\u4E66\u636E">
      <input id="sdt-capital" type="number" inputmode="decimal" min="0" step="100000" value="3000000" aria-label="\u8425\u4E1A\u8D26\u7C3F">
    </span>
    <p class="hint">\u5DE6\uFF1A\u80A1\u6743\u8F6C\u8BA9\u7B49\u4EA7\u6743\u8F6C\u79FB\u4E66\u636E\uFF080.05%\uFF09\uFF0C\u53F3\uFF1A\u5B9E\u6536\u8D44\u672C\uFF0B\u8D44\u672C\u516C\u79EF\u5408\u8BA1\uFF080.025%\uFF09</p>
    <label class="f">
      <span>\u662F\u5426\u9002\u7528\u5C0F\u89C4\u6A21/\u5C0F\u5FAE\u51CF\u534A</span>
      <select id="sdt-half">
        <option value="1" selected>\u662F\uFF0C\u51CF\u534A\u5F81\u6536</option>
        <option value="0">\u5426\uFF0C\u5168\u989D</option>
      </select>
    </label>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u5370\u82B1\u7A0E\u5408\u8BA1</span><strong id="sdt-big">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u4E70\u5356 / \u501F\u6B3E</span><b id="sdt-k1">\u2014</b></li>
      <li><span>\u79DF\u8D41 / \u8FD0\u8F93</span><b id="sdt-k2">\u2014</b></li>
      <li><span>\u4EA7\u6743\u8F6C\u79FB / \u8D26\u7C3F</span><b id="sdt-k3">\u2014</b></li>
      <li><span>\u51CF\u534A\u524D\u5408\u8BA1</span><b id="sdt-raw">\u2014</b></li>
      <li><span>\u7EFC\u5408\u7A0E\u8D1F\u7387</span><b id="sdt-rate">\u2014</b></li>
      <li><span>\u672A\u5217\u660E\u589E\u503C\u7A0E\u7684\u540E\u679C</span><b id="sdt-tip">\u2014</b></li>
    </ul>
    <p class="hint" id="sdt-note"></p>
  </div>
    </div>
  </section>
`,intsvc:`  <section class="panel" id="panel-intsvc">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <label class="f">
      <span>\u670D\u52A1\u63D0\u4F9B\u7684\u5B9E\u9645\u6210\u672C</span>
      <input id="isv-cost" type="number" inputmode="decimal" min="0" step="100000" value="2000000">
    </label>
    <label class="f">
      <span>\u52A0\u6210\u7387\uFF08%\uFF09</span>
      <input id="isv-mark" type="number" inputmode="decimal" min="0" step="1" value="8">
      <em>\u6210\u672C\u52A0\u6210\u6CD5\uFF1A\u670D\u52A1\u8D39 = \u6210\u672C \xD7(1\uFF0B\u52A0\u6210\u7387)\uFF0C\u52A0\u6210\u7387\u8981\u5728\u53EF\u6BD4\u533A\u95F4\u5185</em>
    </label>
    <span class="row">
      <input id="isv-low" type="number" inputmode="decimal" min="0" step="1" value="5" aria-label="\u53EF\u6BD4\u533A\u95F4\u4E0B\u9650">
      <input id="isv-high" type="number" inputmode="decimal" min="0" step="1" value="12" aria-label="\u53EF\u6BD4\u533A\u95F4\u4E0A\u9650">
    </span>
    <p class="hint">\u5DE6\uFF1A\u53EF\u6BD4\u52A0\u6210\u7387\u4E0B\u9650\uFF08%\uFF09\uFF0C\u53F3\uFF1A\u4E0A\u9650\uFF08%\uFF09</p>
    <span class="row">
      <input id="isv-ta" type="number" inputmode="decimal" min="0" max="100" step="1" value="25" aria-label="\u63D0\u4F9B\u670D\u52A1\u65B9\u7A0E\u7387">
      <input id="isv-tb" type="number" inputmode="decimal" min="0" max="100" step="1" value="15" aria-label="\u63A5\u6536\u65B9\u7A0E\u7387">
    </span>
    <p class="hint">\u5DE6\uFF1A\u63D0\u4F9B\u670D\u52A1\u65B9\u6240\u5F97\u7A0E\u7387\uFF08%\uFF09\uFF0C\u53F3\uFF1A\u63A5\u6536\u65B9\u6240\u5F97\u7A0E\u7387\uFF08%\uFF09</p>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u96C6\u56E2\u51C0\u7701\u7A0E</span><strong id="isv-big">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u5185\u90E8\u670D\u52A1\u8D39</span><b id="isv-fee">\u2014</b></li>
      <li><span>\u52A0\u6210\u989D\uFF08\u5229\u6DA6\u8F6C\u79FB\uFF09</span><b id="isv-add">\u2014</b></li>
      <li><span>\u52A0\u6210\u7387 vs \u53EF\u6BD4\u533A\u95F4</span><b id="isv-range">\u2014</b></li>
      <li><span>\u589E\u503C\u7A0E\uFF086%\uFF0C\u63A5\u6536\u65B9\u53EF\u62B5\uFF09</span><b id="isv-vat">\u2014</b></li>
      <li><span>\u82E5\u63A5\u6536\u65B9\u4E0D\u80FD\u62B5\u6263</span><b id="isv-vatcost">\u2014</b></li>
      <li><span>\u52A0\u6210\u7387\u8D85\u51FA\u533A\u95F4\u7684\u8C03\u6574</span><b id="isv-adj">\u2014</b></li>
    </ul>
    <p class="hint" id="isv-note"></p>
  </div>
    </div>
  </section>
`,exportcheck:`  <section class="panel" id="panel-exportcheck">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <span class="row">
      <input id="exc-usd" type="number" inputmode="decimal" min="0" step="10000" value="1000000" aria-label="\u62A5\u5173\u51FA\u53E3\u989D\u7F8E\u5143">
      <input id="exc-fx" type="number" inputmode="decimal" min="0" step="0.01" value="7.10" aria-label="\u6C47\u7387">
    </span>
    <p class="hint">\u5DE6\uFF1A\u62A5\u5173\u5355\u51FA\u53E3\u989D\uFF08\u7F8E\u5143\uFF09\uFF0C\u53F3\uFF1A\u8BB0\u8D26\u6C47\u7387</p>
    <span class="row">
      <input id="exc-inv" type="number" inputmode="decimal" min="0" step="10000" value="7120000" aria-label="\u51FA\u53E3\u53D1\u7968\u4EBA\u6C11\u5E01">
      <input id="exc-rec" type="number" inputmode="decimal" min="0" step="10000" value="950000" aria-label="\u5DF2\u6536\u6C47\u7F8E\u5143">
    </span>
    <p class="hint">\u5DE6\uFF1A\u51FA\u53E3\u53D1\u7968\u4EBA\u6C11\u5E01\u91D1\u989D\uFF0C\u53F3\uFF1A\u5DF2\u6536\u6C47\u7F8E\u5143\u91D1\u989D</p>
    <span class="row">
      <input id="exc-rate" type="number" inputmode="decimal" min="0" max="100" step="1" value="10" aria-label="\u9000\u7A0E\u7387">
      <input id="exc-credit" type="number" inputmode="decimal" min="0" step="10000" value="600000" aria-label="\u671F\u672B\u7559\u62B5\u7A0E\u989D">
    </span>
    <p class="hint">\u5DE6\uFF1A\u51FA\u53E3\u8D27\u7269\u9000\u7A0E\u7387\uFF08%\uFF09\uFF0C\u53F3\uFF1A\u671F\u672B\u7559\u62B5\u7A0E\u989D</p>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u672C\u671F\u5E94\u9000\u7A0E\u989D</span><strong id="exc-big">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u62A5\u5173\u6298\u4EBA\u6C11\u5E01</span><b id="exc-cny">\u2014</b></li>
      <li><span>\u53D1\u7968 \u2212 \u62A5\u5173 \u5DEE\u5F02</span><b id="exc-diff">\u2014</b></li>
      <li><span>\u6536\u6C47\u7387</span><b id="exc-recrate">\u2014</b></li>
      <li><span>\u514D\u62B5\u9000\u7A0E\u989D</span><b id="exc-rebate">\u2014</b></li>
      <li><span>\u514D\u62B5\u989D</span><b id="exc-free">\u2014</b></li>
      <li><span>\u4E0D\u5F97\u514D\u5F81\u548C\u62B5\u6263\uFF08\u5F81\u9000\u5DEE\uFF09</span><b id="exc-gap">\u2014</b></li>
    </ul>
    <p class="hint" id="exc-note"></p>
  </div>
    </div>
  </section>
`,vatcheck:`  <section class="panel" id="panel-vatcheck">
    <div class="cols">
  <div class="card">
    <h2>\u8F93\u5165</h2>
    <span class="row">
      <input id="vchk-out" type="number" inputmode="decimal" min="0" step="10000" value="1300000" aria-label="\u8D26\u9762\u9500\u9879\u7A0E\u989D">
      <input id="vchk-inv" type="number" inputmode="decimal" min="0" step="10000" value="1250000" aria-label="\u5F00\u7968\u7CFB\u7EDF\u9500\u9879">
    </span>
    <p class="hint">\u5DE6\uFF1A\u8D26\u9762\u300C\u5E94\u4EA4\u7A0E\u8D39\u2014\u5E94\u4EA4\u589E\u503C\u7A0E\uFF08\u9500\u9879\u7A0E\u989D\uFF09\u300D, \u53F3\uFF1A\u5F00\u7968\u7CFB\u7EDF\u5DF2\u5F00\u7968\u9500\u9879\u7A0E\u989D</p>
    <span class="row">
      <input id="vchk-noinv" type="number" inputmode="decimal" min="0" step="10000" value="60000" aria-label="\u672A\u5F00\u7968\u6536\u5165\u9500\u9879">
      <input id="vchk-in" type="number" inputmode="decimal" min="0" step="10000" value="900000" aria-label="\u8D26\u9762\u8FDB\u9879\u7A0E\u989D">
    </span>
    <p class="hint">\u5DE6\uFF1A\u672A\u5F00\u7968\u6536\u5165\u5BF9\u5E94\u9500\u9879\uFF0C\u53F3\uFF1A\u8D26\u9762\u8FDB\u9879\u7A0E\u989D</p>
    <span class="row">
      <input id="vchk-cert" type="number" inputmode="decimal" min="0" step="10000" value="880000" aria-label="\u52FE\u9009\u8BA4\u8BC1\u8FDB\u9879">
      <input id="vchk-tr" type="number" inputmode="decimal" min="0" step="10000" value="30000" aria-label="\u8FDB\u9879\u8F6C\u51FA">
    </span>
    <p class="hint">\u5DE6\uFF1A\u5DF2\u52FE\u9009\u8BA4\u8BC1\u7684\u8FDB\u9879\u7A0E\u989D\uFF0C\u53F3\uFF1A\u672C\u671F\u8FDB\u9879\u7A0E\u989D\u8F6C\u51FA</p>
  </div>
  <div class="card res">
    <h2>\u7ED3\u679C</h2>
    <div class="big"><span class="k">\u672C\u671F\u5E94\u4EA4\u589E\u503C\u7A0E</span><strong id="vchk-big">\u2014</strong><span class="unit">\u5143</span></div>
    <ul class="kv">
      <li><span>\u7533\u62A5\u5E94\u5217\u9500\u9879</span><b id="vchk-outp">\u2014</b></li>
      <li><span>\u9500\u9879\uFF1A\u8D26\u9762 \u2212 \u7533\u62A5</span><b id="vchk-outdiff">\u2014</b></li>
      <li><span>\u7533\u62A5\u53EF\u62B5\u8FDB\u9879</span><b id="vchk-inp">\u2014</b></li>
      <li><span>\u8FDB\u9879\uFF1A\u8D26\u9762 \u2212 \u7533\u62A5</span><b id="vchk-indiff">\u2014</b></li>
      <li><span>\u52FE\u7A3D\u5DEE\u5F02\u5408\u8BA1</span><b id="vchk-total">\u2014</b></li>
      <li><span>\u98CE\u9669\u5224\u65AD</span><b id="vchk-risk">\u2014</b></li>
    </ul>
    <p class="hint" id="vchk-note"></p>
  </div>
    </div>
  </section>
`,citprep:`  <section class="panel" id="panel-citprep">
    <div class="cols">
      <div class="card">
        <h2>\u8F93\u5165\uFF1A\u5B63\u5EA6\u4F01\u4E1A\u6240\u5F97\u7A0E\u9884\u7F34</h2>
        <label class="f"><span>\u7D2F\u8BA1\u8425\u4E1A\u6536\u5165\uFF08\u5143\uFF09</span><input id="cit-income" type="number" inputmode="decimal" step="10000" value="5000000"></label>
        <label class="f"><span>\u7D2F\u8BA1\u8425\u4E1A\u6210\u672C\uFF08\u5143\uFF09</span><input id="cit-cost" type="number" inputmode="decimal" step="10000" value="3500000"></label>
        <label class="f"><span>\u7D2F\u8BA1\u671F\u95F4\u8D39\u7528\uFF08\u5143\uFF09</span><input id="cit-expense" type="number" inputmode="decimal" step="10000" value="800000"></label>
        <label class="f"><span>\u5176\u4ED6\u635F\u76CA\uFF08\u5143\uFF0C\u53EF\u8D1F\u6570\uFF09</span><input id="cit-other" type="number" inputmode="decimal" step="10000" value="0"></label>
        <label class="f"><span>\u7EB3\u7A0E\u8C03\u589E\u989D\uFF08\u5143\uFF09</span><input id="cit-adjust" type="number" inputmode="decimal" step="10000" value="200000"></label>
        <label class="f"><span>\u5F25\u8865\u4EE5\u524D\u5E74\u5EA6\u4E8F\u635F\uFF08\u5143\uFF09</span><input id="cit-loss" type="number" inputmode="decimal" step="10000" value="100000"></label>
        <label class="f"><span>\u5DF2\u9884\u7F34\u6240\u5F97\u7A0E\uFF08\u5143\uFF09</span><input id="cit-prepaid" type="number" inputmode="decimal" step="10000" value="80000"></label>
        <label class="f"><span>\u9002\u7528\u7A0E\u7387\uFF08%\uFF09</span><input id="cit-rate" type="number" inputmode="decimal" min="0" max="35" step="0.25" value="25"></label>
        <em>\u6309\u300C\u7D2F\u8BA1\u6570\u300D\u53E3\u5F84\uFF1A\u672C\u5B63\u9884\u7F34 = \u7D2F\u8BA1\u5E94\u7EB3\u7A0E\u989D \u2212 \u5DF2\u9884\u7F34\u3002\u5C0F\u578B\u5FAE\u5229\u3001\u9AD8\u65B0\u7B49\u4F18\u60E0\u7A0E\u7387\u6CA1\u5199\u6B7B\uFF0C\u7A0E\u7387\u81EA\u5DF1\u6539\u3002</em>
      </div>
      <div class="card res">
        <h2>\u9884\u7F34\u7ED3\u679C</h2>
        <div class="big"><span class="k">\u672C\u5B63\u5E94\u8865\uFF08\u9000\uFF09\u7A0E\u989D</span><strong id="cit-big">\u2014</strong><span class="unit">\u5143</span></div>
        <ul class="kv">
          <li><span>\u5229\u6DA6\u603B\u989D</span><b id="cit-profit">\u2014</b></li>
          <li><span>\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D</span><b id="cit-taxable">\u2014</b></li>
          <li><span>\u7D2F\u8BA1\u5E94\u7EB3\u6240\u5F97\u7A0E\u989D</span><b id="cit-tax">\u2014</b></li>
          <li><span>\u7D2F\u8BA1\u5B9E\u9645\u7A0E\u8D1F\u7387</span><b id="cit-burden">\u2014</b></li>
        </ul>
        <p class="hint" id="cit-note"></p>
      </div>
    </div>
  </section>
`,taxwarn:`  <section class="panel" id="panel-taxwarn">
    <div class="cols">
      <div class="card">
        <h2>\u8F93\u5165\uFF1A\u7A0E\u989D\u4E0E\u884C\u4E1A\u53C2\u8003</h2>
        <span class="row">
          <label class="f"><span>\u4E0D\u542B\u7A0E\u9500\u552E\u989D</span><input id="tbw-sales" type="number" inputmode="decimal" min="0" step="100000" value="10000000"></label>
          <label class="f"><span>\u8FDB\u9879\u7A0E\u989D</span><input id="tbw-input" type="number" inputmode="decimal" min="0" step="10000" value="1200000"></label>
        </span>
        <span class="row">
          <label class="f"><span>\u589E\u503C\u7A0E\u7387 %</span><input id="tbw-vatrate" type="number" inputmode="decimal" min="0" step="1" value="13"></label>
          <label class="f"><span>\u5229\u6DA6\u603B\u989D</span><input id="tbw-profit" type="number" inputmode="decimal" min="0" step="100000" value="1000000"></label>
        </span>
        <span class="row">
          <label class="f"><span>\u6240\u5F97\u7A0E\u7387 %</span><input id="tbw-itrate" type="number" inputmode="decimal" min="0" step="1" value="25"></label>
          <label class="f"><span>\u5DF2\u7F34\u6240\u5F97\u7A0E</span><input id="tbw-paid" type="number" inputmode="decimal" min="0" step="10000" value="200000"></label>
        </span>
        <span class="row">
          <label class="f"><span>\u884C\u4E1A\u589E\u503C\u7A0E\u7A0E\u8D1F %</span><input id="tbw-vatref" type="number" inputmode="decimal" min="0" step="0.1" value="3"></label>
          <label class="f"><span>\u884C\u4E1A\u6240\u5F97\u7A0E\u8D21\u732E\u7387 %</span><input id="tbw-itref" type="number" inputmode="decimal" min="0" step="0.1" value="1"></label>
        </span>
        <label class="f"><span>\u9884\u8B66\u533A\u95F4 \xB1 \u767E\u5206\u70B9</span><input id="tbw-band" type="number" inputmode="decimal" min="0" step="0.1" value="0.5"></label>
        <em>\u53E3\u5F84\uFF1A\u589E\u503C\u7A0E\u7A0E\u8D1F\u7387 = \u5E94\u4EA4\u589E\u503C\u7A0E \xF7 \u4E0D\u542B\u7A0E\u9500\u552E\u989D\uFF1B\u6240\u5F97\u7A0E\u8D21\u732E\u7387 = \u5E94\u7EB3\u6240\u5F97\u7A0E \xF7 \u4E0D\u542B\u7A0E\u9500\u552E\u989D\u3002\u884C\u4E1A\u53C2\u8003\u503C\u53EA\u662F\u793A\u4F8B\uFF0C\u4EE5\u5F53\u5730\u4E3B\u7BA1\u673A\u5173\u53E3\u5F84\u4E3A\u51C6\u3002</em>
      </div>
      <div class="card res">
        <h2>\u7ED3\u679C\uFF1A\u7EFC\u5408\u7A0E\u8D1F\u9884\u8B66</h2>
        <div class="big"><span class="k">\u7EFC\u5408\u7A0E\u8D1F\u7387</span><strong id="tbw-big">\u2014</strong><span class="unit">%</span></div>
        <ul class="kv">
          <li><span>\u5E94\u4EA4\u589E\u503C\u7A0E / \u7A0E\u8D1F\u7387</span><b id="tbw-vat">\u2014</b></li>
          <li><span>\u589E\u503C\u7A0E\u5224\u5B9A</span><b id="tbw-vverdict">\u2014</b></li>
          <li><span>\u5E94\u7EB3\u6240\u5F97\u7A0E\uFF08\u5E94\u8865\uFF09</span><b id="tbw-it">\u2014</b></li>
          <li><span>\u6240\u5F97\u7A0E\u5224\u5B9A</span><b id="tbw-iverdict">\u2014</b></li>
        </ul>
        <div class="tablebox">
          <table>
            <thead><tr><th class="tal">\u6307\u6807</th><th>\u4F60\u7684\u6570</th><th>\u53C2\u8003</th><th>\u9884\u8B66\u533A\u95F4</th><th class="tal">\u5224\u5B9A</th></tr></thead>
            <tbody id="tbw-body"></tbody>
          </table>
        </div>
        <p class="hint" id="tbw-note"></p>
      </div>
    </div>
  </section>
`,dtax:`  <section class="panel" id="panel-dtax">
    <div class="cols">
      <div class="card">
        <h2>\u8F93\u5165\uFF1A\u5185\u90E8\u4EA4\u6613\u672A\u5B9E\u73B0\u5229\u6DA6</h2>
        <label class="f"><span>\u5185\u90E8\u672A\u5B9E\u73B0\u5229\u6DA6</span><input id="dtx-unreal" type="number" inputmode="decimal" min="0" step="10000" value="500000"></label>
        <span class="row">
          <label class="f"><span>\u8D2D\u4E70\u65B9\u7A0E\u7387 %</span><input id="dtx-buy" type="number" inputmode="decimal" min="0" step="1" value="25"></label>
          <label class="f"><span>\u9500\u552E\u65B9\u7A0E\u7387 %</span><input id="dtx-sell" type="number" inputmode="decimal" min="0" step="1" value="15"></label>
        </span>
        <em>\u53E3\u5F84\uFF1A\u5408\u5E76\u62B5\u9500\u5185\u90E8\u672A\u5B9E\u73B0\u5229\u6DA6\u540E\uFF0C\u5B58\u8D27\u8D26\u9762\u4EF7\u503C\u4F4E\u4E8E\u8BA1\u7A0E\u57FA\u7840\uFF0C\u5F62\u6210\u53EF\u62B5\u6263\u6682\u65F6\u6027\u5DEE\u5F02\uFF1B\u9012\u5EF6\u6240\u5F97\u7A0E\u6309\u300C\u8D44\u4EA7\u5C06\u6765\u5B9E\u73B0\u7684\u4E3B\u4F53\uFF08\u8D2D\u4E70\u65B9\uFF09\u7A0E\u7387\u300D\u8BA1\u91CF\uFF0C\u4E0D\u662F\u9500\u552E\u65B9\u7A0E\u7387\u3002\u9500\u552E\u65B9\u662F\u9AD8\u65B0\u6280\u672F\u4F01\u4E1A\uFF0815%\uFF09\u800C\u8D2D\u4E70\u65B9\u662F\u666E\u901A\u7A0E\u7387\uFF0825%\uFF09\u65F6\uFF0CDTA \u4F1A\u5927\u4E8E\u5355\u4F53\u5DF2\u7F34\u3002</em>
      </div>
      <div class="card res">
        <h2>\u7ED3\u679C\uFF1A\u5408\u5E76\u9012\u5EF6\u6240\u5F97\u7A0E</h2>
        <div class="big"><span class="k">\u9012\u5EF6\u6240\u5F97\u7A0E\u8D44\u4EA7</span><strong id="dtx-big">\u2014</strong><span class="unit">\u5143</span></div>
        <ul class="kv">
          <li><span>\u53EF\u62B5\u6263\u6682\u65F6\u6027\u5DEE\u5F02</span><b id="dtx-diff">\u2014</b></li>
          <li><span>\u5355\u4F53\u5DF2\u7F34\u6240\u5F97\u7A0E\uFF08\u9500\u552E\u65B9\uFF09</span><b id="dtx-paid">\u2014</b></li>
          <li><span>\u5408\u5E76\u6240\u5F97\u7A0E\u8D39\u7528\u5F71\u54CD</span><b id="dtx-taxeff">\u2014</b></li>
          <li><span>\u5408\u5E76\u51C0\u5229\u5F71\u54CD</span><b id="dtx-ni">\u2014</b></li>
          <li><span>\u7A0E\u7387\u5DEE\u5F71\u54CD\uFF08DTA \u2212 \u5DF2\u7F34\uFF09</span><b id="dtx-spread">\u2014</b></li>
        </ul>
        <div class="tablebox">
          <table>
            <thead><tr><th class="tal">\u9879\u76EE</th><th>\u91D1\u989D</th><th class="tal">\u8BF4\u660E</th></tr></thead>
            <tbody id="dtx-body"></tbody>
          </table>
        </div>
        <p class="hint" id="dtx-note"></p>
      </div>
    </div>
  </section>
`,assetdisptax:`  <section class="panel" id="panel-assetdisptax">
    <div class="cols">
      <div class="card">
        <h2>\u56FA\u5B9A\u8D44\u4EA7\u5904\u7F6E\u7A0E\u52A1</h2>
        <label class="f"><span>\u8BA1\u7A0E\u65B9\u5F0F</span><select id="adt-mode"><option value="gen" selected>\u4E00\u822C\u8BA1\u7A0E 13%</option><option value="simple">\u7B80\u6613\u8BA1\u7A0E 3% \u51CF\u6309 2%</option></select></label>
        <span class="row">
          <label class="f"><span>\u542B\u7A0E\u552E\u4EF7</span><input id="adt-price" type="number" inputmode="decimal" min="0" value="452000"></label>
          <label class="f"><span>\u8D26\u9762\u51C0\u503C</span><input id="adt-net" type="number" inputmode="decimal" min="0" value="400000"></label>
        </span>
        <label class="f"><span>\u6E05\u7406\u8D39</span><input id="adt-fee" type="number" inputmode="decimal" min="0" value="5000"></label>
        <span class="row">
          <label class="f"><span>\u589E\u503C\u7A0E\u7A0E\u7387 %</span><input id="adt-vat" type="number" inputmode="decimal" min="0" value="13"></label>
          <label class="f"><span>\u9644\u52A0\u7A0E\u8D39 %</span><input id="adt-add" type="number" inputmode="decimal" min="0" value="12"></label>
        </span>
        <label class="f"><span>\u6240\u5F97\u7A0E\u7A0E\u7387 %</span><input id="adt-rate" type="number" inputmode="decimal" min="0" value="25"></label>
      </div>
      <div class="card res">
        <h2>\u7ED3\u679C</h2>
        <div class="big"><span class="k">\u7A0E\u540E\u5F71\u54CD</span><strong id="adt-big">\u2014</strong><span class="unit">\u5143</span></div>
        <ul class="kv">
          <li><span>\u8BA1\u7A0E\u65B9\u5F0F</span><b id="adt-modekv">\u2014</b></li>
          <li><span>\u4E0D\u542B\u7A0E\u6536\u5165</span><b id="adt-ni">\u2014</b></li>
          <li><span>\u5E94\u7EB3\u589E\u503C\u7A0E</span><b id="adt-vt">\u2014</b></li>
          <li><span>\u9644\u52A0\u7A0E\u8D39</span><b id="adt-ad">\u2014</b></li>
          <li><span>\u5904\u7F6E\u635F\u76CA</span><b id="adt-pl">\u2014</b></li>
          <li><span>\u542B\u7A0E\u4FDD\u672C\u552E\u4EF7</span><b id="adt-be">\u2014</b></li>
          <li><span>\u53E6\u4E00\u53E3\u5F84\u7A0E\u540E</span><b id="adt-cmp">\u2014</b></li>
        </ul>
        <p class="hint" id="adt-note"></p>
      </div>
    </div>
  </section>
`,tpdocs:`  <section class="panel" id="panel-tpdocs">
    <div class="cols">
      <div class="card">
        <h2>\u5173\u8054\u4EA4\u6613\u540C\u671F\u8D44\u6599</h2>
        <span class="row">
          <label class="f"><span>\u5173\u8054\u4EA4\u6613\u989D</span><input id="tpd-related" type="number" inputmode="decimal" min="0" step="10000" value="30000000"></label>
          <label class="f"><span>\u672C\u516C\u53F8\u6536\u5165</span><input id="tpd-revenue" type="number" inputmode="decimal" min="0" step="10000" value="100000000"></label>
        </span>
        <label class="f"><span>\u540C\u671F\u8D44\u6599\u95E8\u69DB\uFF08\u672C\u5730\u6587\u6863\uFF09</span><input id="tpd-threshold" type="number" inputmode="decimal" min="0" step="10000" value="25000000"></label>
        <label class="f"><span>\u96C6\u56E2\u5408\u5E76\u6536\u5165</span><input id="tpd-group" type="number" inputmode="decimal" min="0" step="1000000" value="6000000000"></label>
        <span class="row">
          <label class="f"><span>\u4E3B\u4F53\u6587\u6863\u95E8\u69DB</span><input id="tpd-master" type="number" inputmode="decimal" min="0" step="1000000" value="1000000000"></label>
          <label class="f"><span>\u56FD\u522B\u62A5\u544A\u95E8\u69DB</span><input id="tpd-cbr" type="number" inputmode="decimal" min="0" step="1000000" value="5500000000"></label>
        </span>
      </div>
      <div class="card res">
        <h2>\u7ED3\u679C</h2>
        <div class="big"><span class="k">\u5173\u8054\u4EA4\u6613\u5360\u6BD4</span><strong id="tpd-big">\u2014</strong><span class="unit">%</span></div>
        <ul class="kv">
          <li><span>\u672C\u5730\u6587\u6863</span><b id="tpd-local">\u2014</b></li>
          <li><span>\u4E3B\u4F53\u6587\u6863</span><b id="tpd-masterkv">\u2014</b></li>
          <li><span>\u56FD\u522B\u62A5\u544A</span><b id="tpd-cbrkv">\u2014</b></li>
          <li><span>\u98CE\u9669\u63D0\u793A</span><b id="tpd-risk">\u2014</b></li>
        </ul>
        <div class="tablebox"><table><thead><tr><th>\u8D44\u6599</th><th>\u95E8\u69DB</th><th>\u4F60\u65B9\u91D1\u989D</th><th>\u662F\u5426\u9700\u8981</th></tr></thead><tbody id="tpd-body"></tbody></table></div>
        <p class="hint" id="tpd-note"></p>
      </div>
    </div>
  </section>
`,deferred:`  <section class="panel" id="panel-deferred">
    <div class="cols">
      <div class="card">
        <h2>\u9012\u5EF6\u6536\u76CA\u4E0E\u9884\u6536\u6B3E\u786E\u8BA4</h2>
        <label class="f"><span>\u7C7B\u578B</span><select id="dfr-mode"><option value="prepay" selected>\u9884\u6536\u8D26\u6B3E\uFF08\u6309\u670D\u52A1\u671F\u786E\u8BA4\uFF09</option><option value="grant">\u653F\u5E9C\u8865\u52A9\uFF08\u9012\u5EF6\u6536\u76CA\uFF09</option></select></label>
        <label class="f"><span>\u5DF2\u6536 / \u6536\u5230\u603B\u989D</span><input id="dfr-amt" type="number" inputmode="decimal" min="0" step="10000" value="1200000"></label>
        <span class="row">
          <label class="f"><span>\u5206\u644A\u671F\u6570\uFF08\u6708\uFF09</span><input id="dfr-months" type="number" inputmode="decimal" min="1" value="12"></label>
          <label class="f"><span>\u5DF2\u8FC7\u6708\u6570</span><input id="dfr-elapsed" type="number" inputmode="decimal" min="0" value="3"></label>
        </span>
        <label class="f"><span>\u6240\u5F97\u7A0E\u7A0E\u7387 %\uFF08\u653F\u5E9C\u8865\u52A9\u7528\uFF09</span><input id="dfr-tax" type="number" inputmode="decimal" min="0" value="25"></label>
      </div>
      <div class="card res">
        <h2>\u7ED3\u679C</h2>
        <div class="big"><span class="k">\u9012\u5EF6\u4F59\u989D</span><strong id="dfr-big">\u2014</strong><span class="unit">\u5143</span></div>
        <ul class="kv">
          <li><span>\u6BCF\u6708\u786E\u8BA4</span><b id="dfr-mo">\u2014</b></li>
          <li><span>\u5DF2\u786E\u8BA4</span><b id="dfr-rec">\u2014</b></li>
          <li><span>\u786E\u8BA4\u8FDB\u5EA6</span><b id="dfr-pct">\u2014</b></li>
          <li><span>\u9012\u5EF6\u4F59\u989D</span><b id="dfr-bal">\u2014</b></li>
          <li><span>\u7A0E\u52A1\u63D0\u793A</span><b id="dfr-taxline">\u2014</b></li>
        </ul>
        <p class="hint" id="dfr-note"></p>
      </div>
    </div>
  </section>
`,vatrefund:`  <section class="panel" id="panel-vatrefund">
    <div class="cols">
      <div class="card">
        <h2>\u7559\u62B5\u9000\u7A0E\u6D4B\u7B97</h2>
        <label class="f"><span>\u671F\u672B\u7559\u62B5\u7A0E\u989D</span><input id="vrf-credit" type="number" inputmode="decimal" min="0" step="1000" value="200000"></label>
        <label class="f"><span>\u8FDB\u9879\u6784\u6210\u6BD4\u4F8B %</span><input id="vrf-ratio" type="number" inputmode="decimal" min="0" max="100" value="100"></label>
        <label class="f"><span>\u9000\u7A0E\u6BD4\u4F8B %</span><input id="vrf-refund" type="number" inputmode="decimal" min="0" max="100" value="60"></label>
        <label class="f"><span>\u5DF2\u9000\u7A0E\u989D</span><input id="vrf-had" type="number" inputmode="decimal" min="0" step="1000" value="0"></label>
      </div>
      <div class="card res">
        <h2>\u7ED3\u679C</h2>
        <div class="big"><span class="k">\u672C\u6B21\u53EF\u9000\u7A0E</span><strong id="vrf-big">\u2014</strong><span class="unit">\u5143</span></div>
        <ul class="kv">
          <li><span>\u9000\u7A0E\u540E\u7559\u62B5</span><b id="vrf-left">\u2014</b></li>
          <li><span>\u8FDB\u9879\u6784\u6210\u6BD4\u4F8B</span><b id="vrf-ratiokv">\u2014</b></li>
          <li><span>\u9000\u7A0E\u6BD4\u4F8B</span><b id="vrf-refundkv">\u2014</b></li>
          <li><span>\u76F8\u5F53\u4E8E\u63D0\u524D\u56DE\u7B3C\u73B0\u91D1</span><b id="vrf-cash">\u2014</b></li>
        </ul>
        <p class="hint" id="vrf-note"></p>
      </div>
    </div>
  </section>
`,smallmicro:`  <section class="panel" id="panel-smallmicro">
    <div class="cols">
      <div class="card">
        <h2>\u5C0F\u578B\u5FAE\u5229\u4F01\u4E1A\u5224\u5B9A\u4E0E\u7A0E\u8D1F</h2>
        <label class="f"><span>\u5E74\u5E94\u7EB3\u7A0E\u6240\u5F97\u989D</span><input id="smm-income" type="number" inputmode="decimal" min="0" step="10000" value="2000000"></label>
        <span class="row">
          <label class="f"><span>\u4ECE\u4E1A\u4EBA\u6570</span><input id="smm-people" type="number" inputmode="decimal" min="0" value="80"></label>
          <label class="f"><span>\u8D44\u4EA7\u603B\u989D</span><input id="smm-assets" type="number" inputmode="decimal" min="0" step="10000" value="10000000"></label>
        </span>
        <span class="row">
          <label class="f"><span>\u6240\u5F97\u989D\u4E0A\u9650</span><input id="smm-cap" type="number" inputmode="decimal" min="0" step="10000" value="3000000"></label>
          <label class="f"><span>\u4EBA\u6570\u4E0A\u9650</span><input id="smm-peoplecap" type="number" inputmode="decimal" min="0" value="300"></label>
        </span>
        <span class="row">
          <label class="f"><span>\u8D44\u4EA7\u4E0A\u9650</span><input id="smm-assetcap" type="number" inputmode="decimal" min="0" step="10000" value="50000000"></label>
          <label class="f"><span>\u6240\u5F97\u7A0E\u7A0E\u7387 %</span><input id="smm-rate" type="number" inputmode="decimal" min="0" value="25"></label>
        </span>
      </div>
      <div class="card res">
        <h2>\u7ED3\u679C</h2>
        <div class="big"><span class="k">\u5E94\u7EB3\u6240\u5F97\u7A0E</span><strong id="smm-big">\u2014</strong><span class="unit">\u5143</span></div>
        <ul class="kv">
          <li><span>\u5224\u5B9A</span><b id="smm-verdict">\u2014</b></li>
          <li><span>\u5B9E\u9645\u7A0E\u8D1F\u7387</span><b id="smm-ratekv">\u2014</b></li>
          <li><span>\u4E0E\u4E00\u822C\u7A0E\u7387\u6BD4\u7701</span><b id="smm-save">\u2014</b></li>
          <li><span>\u672A\u8FBE\u6807\u9879</span><b id="smm-fail">\u2014</b></li>
        </ul>
        <p class="hint" id="smm-note"></p>
      </div>
    </div>
  </section>
`,addcredit:`  <section class="panel" id="panel-addcredit">
    <div class="cols">
      <div class="card">
        <h2>\u589E\u503C\u7A0E\u52A0\u8BA1\u62B5\u51CF</h2>
        <label class="f"><span>\u5F53\u671F\u8FDB\u9879\u7A0E\u989D</span><input id="acd-input" type="number" inputmode="decimal" min="0" step="1000" value="100000"></label>
        <label class="f"><span>\u52A0\u8BA1\u62B5\u51CF\u6BD4\u4F8B %</span><input id="acd-plus" type="number" inputmode="decimal" min="0" max="100" value="10"></label>
        <label class="f"><span>\u4E0A\u671F\u7ED3\u8F6C\u53EF\u62B5\u51CF\u4F59\u989D</span><input id="acd-brought" type="number" inputmode="decimal" min="0" step="1000" value="15000"></label>
        <span class="row">
          <label class="f"><span>\u5F53\u671F\u5E94\u7EB3\u7A0E\u989D\uFF08\u672A\u52A0\u8BA1\uFF09</span><input id="acd-tax" type="number" inputmode="decimal" min="0" step="1000" value="50000"></label>
          <label class="f"><span>\u5DF2\u8BA1\u63D0\u989D</span><input id="acd-taken" type="number" inputmode="decimal" min="0" step="1000" value="0"></label>
        </span>
      </div>
      <div class="card res">
        <h2>\u7ED3\u679C</h2>
        <div class="big"><span class="k">\u5B9E\u9645\u5E94\u7EB3\u7A0E</span><strong id="acd-big">\u2014</strong><span class="unit">\u5143</span></div>
        <ul class="kv">
          <li><span>\u672C\u671F\u8BA1\u63D0\u989D</span><b id="acd-accrue">\u2014</b></li>
          <li><span>\u672C\u671F\u53EF\u62B5\u51CF</span><b id="acd-avail">\u2014</b></li>
          <li><span>\u6BD4\u4E0D\u52A0\u8BA1\u5C11\u7F34</span><b id="acd-save">\u2014</b></li>
          <li><span>\u7ED3\u8F6C\u4E0B\u671F\u4F59\u989D</span><b id="acd-carry">\u2014</b></li>
        </ul>
        <p class="hint" id="acd-note"></p>
      </div>
    </div>
  </section>
`,dtlind:`  <section class="panel" id="panel-dtlind">
    <div class="cols">
      <div class="card">
        <h2>\u9012\u5EF6\u6240\u5F97\u7A0E\u660E\u7EC6\uFF08\u4E2A\u4F53\uFF09</h2>
        <span class="row">
          <label class="f"><span>\u53EF\u62B5\u6263\u5DEE\u5F02\uFF1A\u574F\u8D26\u51C6\u5907</span><input id="dli-bad" type="number" inputmode="decimal" min="0" step="10000" value="500000"></label>
          <label class="f"><span>\u53EF\u62B5\u6263\u5DEE\u5F02\uFF1A\u5B58\u8D27\u8DCC\u4EF7</span><input id="dli-inv" type="number" inputmode="decimal" min="0" step="10000" value="300000"></label>
        </span>
        <label class="f"><span>\u5E94\u7EB3\u7A0E\u5DEE\u5F02\uFF1A\u52A0\u901F\u6298\u65E7</span><input id="dli-dep" type="number" inputmode="decimal" min="0" step="10000" value="100000"></label>
        <span class="row">
          <label class="f"><span>\u6240\u5F97\u7A0E\u7A0E\u7387 %</span><input id="dli-tax" type="number" inputmode="decimal" min="0" max="100" value="25"></label>
          <label class="f"><span>\u671F\u521D\u9012\u5EF6\u6240\u5F97\u7A0E\u8D44\u4EA7</span><input id="dli-dta0" type="number" inputmode="decimal" min="0" step="10000" value="150000"></label>
        </span>
        <label class="f"><span>\u671F\u521D\u9012\u5EF6\u6240\u5F97\u7A0E\u8D1F\u503A</span><input id="dli-dtl0" type="number" inputmode="decimal" min="0" step="10000" value="0"></label>
      </div>
      <div class="card res">
        <h2>\u7ED3\u679C</h2>
        <div class="big"><span class="k">\u9012\u5EF6\u6240\u5F97\u7A0E\u8D44\u4EA7</span><strong id="dli-big">\u2014</strong><span class="unit">\u5143</span></div>
        <ul class="kv">
          <li><span>\u9012\u5EF6\u6240\u5F97\u7A0E\u8D1F\u503A</span><b id="dli-dtl">\u2014</b></li>
          <li><span>\u672C\u671F\u786E\u8BA4\u8D44\u4EA7\u53D8\u52A8</span><b id="dli-dta1">\u2014</b></li>
          <li><span>\u672C\u671F\u786E\u8BA4\u8D1F\u503A\u53D8\u52A8</span><b id="dli-dtl1">\u2014</b></li>
          <li><span>\u9012\u5EF6\u6240\u5F97\u7A0E\u8D39\u7528\uFF08\u51CF\u9879\u4E3A\u5C11\u7F34\uFF09</span><b id="dli-net">\u2014</b></li>
        </ul>
        <p class="hint" id="dli-note"></p>
      </div>
    </div>
  </section>
`};export default{vat:L,vatdue:N,exportrebate:j,taxburden:P,refundflow:H,taxadj:I,debtcap:K,accdep:O,esop:Y,rdexp:B,govgrant:U,rdcap:V,rebatedta:q,welfare:G,inputout:Q,stampduty:X,intsvc:z,exportcheck:J,vatcheck:$,salesallow:Z,vatchoose:nn,citprep:an,taxwarn:tn,dtax:en,assetdisptax:sn,tpdocs:ln,deferred:pn,vatrefund:dn,smallmicro:rn,addcredit:cn,dtlind:on};
