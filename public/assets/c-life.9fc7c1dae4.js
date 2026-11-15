var Q=Object.defineProperty;var _=(t,d)=>Q(t,"name",{value:d,configurable:!0});const{$:n,BACKUP_KEY:un,BUILD_TAG:vn,CAT_KEY:fn,CAT_LABEL:bn,CHUNK_FILES:hn,CHUNK_OF:xn,CMP_KEY:yn,CORE_CALC:Cn,CURS:L,DEFERRED_TAPS:Mn,DEMO_SAVED:wn,DIVISOR:En,EDITED:gn,ERR_BOX:Sn,FAV_KEY:Tn,FIELDS:_n,FIRST_ACTIVATE:An,FREQ:kn,FREQ_KEY:Dn,INSTALL_HIDE_KEY:Fn,KEY:Pn,LAST_KEY:Nn,MONTH_CATS:Rn,MONTH_TABLE:Yn,NEXT_OF:Wn,PALETTE_EL:Ln,PENDING_PARAMS:Kn,PRE_KEY:In,QUOTA_WARNED:Hn,RECENT_KEY:On,SAVE_TIMER:Bn,SCHEMA_KEY:Un,SCHEMA_VERSION:Gn,SEARCH_KEY:qn,SNAP_DROP_SEEN:Vn,SNAP_KEY:Jn,SNAP_MAX:Qn,SNAP_PICK:Xn,STORED:zn,TABS:jn,TAB_NATURAL:$n,THEME_KEY:Zn,TOAST_EL:na,TODAYBAR_KEY:aa,UNITS:X,WF_ARCH_KEY:ea,WF_AUTO_IDX:ta,WF_AUTO_LIST:la,WF_AUTO_STEP:ia,WF_AUTO_TIMER:sa,WF_CUSTNAME_KEY:pa,WF_CUST_KEY:da,WF_CUST_NAME:oa,WF_DONE:ra,WF_EDIT:ca,WF_EDIT_KEY:ma,WF_KEY:ua,WF_LAST:va,WF_LEGACY:fa,WF_MAN_KEY:ba,WF_MD:ha,WF_MD_FIELDS:xa,WF_MD_KEY:ya,WF_MD_LINKS:Ca,WF_META_KEY:Ma,WF_MONTH_KEY:wa,WF_NOTE_KEY:Ea,WF_NOTIFIED_KEY:ga,WF_NOTIFY_KEY:Sa,WF_PATHS:Ta,WF_ROLE_KEY:_a,WF_ROLE_READY:Aa,WF_SKIP_KEY:ka,WF_TASK_KEY:Da,WF_TEMPLATES:Fa,XL_ROWS:Pa,YEAR_TABLE:Na,_onPanels:Ra,a11yTouch:Ya,activate:Wa,addMonths:La,annuityPV:Ka,annuityPayment:Ia,applyFilter:Ha,applyParams:Oa,applyStoredTo:Ba,applyWfTpl:Ua,backupAgeDays:Ga,bindWfDnd:qa,bindWfInline:Va,bizAdd:Ja,bonusSoloTax:Qa,buildLoanSchedule:Xa,buildShare:za,buildTabBadges:ja,bumpFreq:$a,calcLoan:Za,calcMap:ne,calcWorkflow:ae,clearWfMan:ee,closePalette:te,cmpTabName:le,cnUpper:ie,combineTax:se,convertTemp:z,copyText:pe,cumulativeTax:de,curCat:oe,currentSnap:re,demoFill:ce,demoHint:me,diagText:ue,dlJson:ve,doInstall:fe,doPrint:be,drawMonthCats:he,drawMonthStack:xe,drawReportCharts:ye,drawRpMini:Ce,drawnMonthlyChart:Me,drawnYearChart:we,enhanceNums:Ee,enhancePanelUi:ge,ensureChunk:Se,evalExpr:Te,favList:_e,fillCmpMod:Ae,fillMonthGrid:ke,fillUnits:j,flash:De,flushParams:Fe,flushSave:Pe,fmt:A,fmtAt:Ne,fmtDate:Re,fx:B,gauss:Ye,getWfCust:We,getWfDone:Le,getWfMan:Ke,getWfMeta:Ie,getWfNotes:He,getWfSkip:Oe,hashTarget:Be,installEvt:Ue,installHintHide:Ge,installHintOff:qe,iosInstallTip:Ve,iosLike:Je,isFav:Qe,lastName:Xe,leftAfter:ze,linkTo:je,loadCmpA:$e,loadSnaps:Ze,loadWfArch:nt,loadWfCust:at,loadWfDone:et,loadWfEdit:tt,loadWfMan:lt,loadWfMeta:it,loadWfNotes:st,loadWfSkip:pt,loadWfTask:dt,loanRows:ot,makeSnap:rt,markBackup:ct,markBadInputs:mt,matchQ:ut,money:a,monthToDate:vt,monthlyIRR:$,months:Z,npvDiff:ft,num:e,numBlur:bt,numFocus:ht,numInput:xt,numKey:yt,numOf:Ct,openPalette:Mt,orderTabsForQuery:wt,palKey:Et,panelEls:gt,panelParams:St,parseAmounts:Tt,parseDate:_t,parseNum:At,pct:P,percentile:kt,plRank:Dt,plScoreCov:Ft,plScoreDsr:Pt,plScoreEmg:Nt,plScoreLev:Rt,plScoreSave:Yt,prePanels:Wt,prefetchAllChunks:Lt,presets:Kt,printCover:It,pushRecent:Ht,pushSearch:Ot,pwaStandalone:Bt,quickOf:Ut,rateOf:Gt,readJsonFile:qt,readMonthGrid:Vt,recentList:Jt,recordWf:Qt,refreshCounts:Xt,refreshTableTools:zt,refreshTrackMods:jt,refreshWfBadge:$t,renderLoanTable:Zt,renderNext:nl,renderPalette:al,renderPresets:el,renderSearchHist:tl,renderSnapCompare:ll,renderSnapList:il,renderTodayBar:sl,renderTrack:pl,renderWfTpl:dl,rentBuyAt:ol,restore:rl,runCalc:cl,runDeferredTaps:ml,save:ul,saveCmpA:vl,saveFav:fl,savePresets:bl,saveSnaps:hl,saveWfCust:xl,savedCat:yl,schemaInit:Cl,schemaMigrate:Ml,scrollResultIfDeepLink:wl,searchHist:El,setCat:gl,setSub:Sl,setTheme:Tl,shareCalc:_l,sharePayload:Al,showErrorBox:kl,showInstBar:Dl,showUpdateBar:Fl,snapNameOf:Pl,snapTipText:Nl,snapshot:Rl,st0:Yl,stamp:Wl,startName:Ll,syncInstallUi:Kl,tabCatLabel:Il,tabScore:Hl,tap:Ol,taxBy:Bl,toast:Ul,toggleWfStep:Gl,trimNum:ql,unitFor:Vl,updShown:Jl,wfAllPaths:Ql,wfArchiveMonth:Xl,wfArchivePut:zl,wfAutoNext:jl,wfAutoStop:$l,wfAutoWalk:Zl,wfBar:ni,wfBindCustQ:ai,wfBuildHandoff:ei,wfCarryMissing:ti,wfCarryQuery:li,wfCarryWarn:ii,wfCsvCell:si,wfCustNameSave:pi,wfDayDiff:di,wfDetailRender:oi,wfEditPath:ri,wfEditReset:ci,wfEditSave:mi,wfEditToggle:ui,wfFillCustSel:vi,wfHandoff:fi,wfHandoffCopy:bi,wfHandoffCsv:hi,wfHandoffPrint:xi,wfHasAnyData:yi,wfHideStep:Ci,wfKnownMods:Mi,wfLegacyToNew:wi,wfLoad:Ei,wfManSave:gi,wfMdHref:Si,wfMdRender:Ti,wfMdSave:_i,wfMetaSave:Ai,wfMigrateLegacy:ki,wfMonthKey:Di,wfMonthRoll:Fi,wfMonthTouch:Pi,wfMoveStep:Ni,wfNoteSave:Ri,wfNotifyCheck:Yi,wfNotifyGranted:Wi,wfNotifyPref:Li,wfNotifySend:Ki,wfNotifySetPref:Ii,wfNotifyStatus:Hi,wfNotifyToggle:Oi,wfOpenInline:Bi,wfOpenTasks:Ui,wfPad2:Gi,wfPathMods:qi,wfPlaceInline:Vi,wfPlaceNear:Ji,wfProgress:Qi,wfRenderSummary:Xi,wfRoleSaved:zi,wfScopedPaths:ji,wfSet:$i,wfSkipCurrent:Zi,wfSkipSave:ns,wfStepKey:as,wfStepShare:es,wfStepState:ts,wfTaskAdd:ls,wfTaskBox:is,wfTaskDel:ss,wfTaskPending:ps,wfTaskSave:ds,wfTaskToggle:os,wfTodayPick:rs,wfTodayStr:cs,wfUnhideStep:ms,wfVisiblePaths:us,yuan:w,zOf:vs}=window.FC;function nn(){var t=e(n("is-amount")),d=Z(e(n("is-months"))),o=n("is-mode").value,s=e(n("is-rate"));if(n("is-rate-label").textContent=o==="monthly"?"每期费率（%）":o==="once"?"总费率（%）":"总手续费（元）",!(t>0&&d>0)){n("is-apr").textContent="—",["is-pay","is-fee","is-nominal","is-multiple"].forEach(function(f){n(f).textContent="—"}),n("is-note").textContent="填好分期金额和期数后自动计算。";return}var p;o==="monthly"?p=t*(s/100)*d:o==="once"?p=t*(s/100):p=s;var m=(t+p)/d,u=$(t,m,d),l=Math.pow(1+u,12)-1,c=p/t*(12/d);n("is-apr").textContent=A(l*100,2),n("is-pay").textContent=w(m),n("is-fee").textContent=w(p),n("is-nominal").textContent=P(c),n("is-multiple").textContent=c>0?A(l/c,2)+" 倍":"—";var i=o==="monthly"?"每期按最初本金收 "+A(s,2)+"% 手续费":o==="once"?"一次性按最初本金收 "+A(s,2)+"% 手续费":"总共收 "+a(s)+" 元手续费";n("is-note").textContent=B("这笔分期是"+i+"，但你每月都在还本金，实际占用的钱越来越少，所以真实成本远高于表面费率——上面那一栏就是 IRR（内部收益率）口径，相当于「按实际占用资金折算的年化利率」，也是《民法典》和监管要求金融机构披露的年化综合成本口径。表面看只有 "+P(c)+"，实际年化 "+A(l*100,2)+"%。提前还款通常不退手续费，办之前先算这一栏。")}_(nn,"calcInstallment");function an(){var t=e(n("dl-price")),d=e(n("dl-discount"))/10,o=e(n("dl-threshold")),s=e(n("dl-off")),p=e(n("dl-qty"));if(!(t>0&&p>0))n("dl-pay").textContent="—",["dl-real-discount","dl-save","dl-unit","dl-next"].forEach(function(D){n(D).textContent="—"}),n("dl-note").textContent="填好原价和数量后自动计算。";else{d<=0&&(d=1);var m=t*p,u=m*d,l=o>0?Math.floor(u/o):0,c=l*s,i=Math.max(0,u-c);if(n("dl-pay").textContent=a(i),n("dl-real-discount").textContent=A(i/m*10,2)+" 折",n("dl-save").textContent=w(m-i),n("dl-unit").textContent=w(i/p),o>0){var f=u%o,b=f===0?o:o-f;n("dl-next").textContent="还差 "+a(b)+" 元可再多减 "+a(s)+" 元"}else n("dl-next").textContent="未设满减";var M="";if(o>0){var r=o-f;r>0&&r<=s&&(M=" 注意：只差 "+a(r)+" 元就能再减 "+a(s)+" 元，凑单更划算。")}n("dl-note").textContent=o>0?B("先打折再满减（多数平台的算法）：折后小计 "+a(u)+" 元，满 "+a(o)+" 减 "+a(s)+" 命中 "+l+" 次，减掉 "+a(c)+" 元。算下来相当于 "+A(i/m*10,2)+" 折，比单看折扣力度更真实。"+M):B("只按折扣算：原价 "+a(t)+" × "+A(d*10,2)+" 折 × "+A(p,0)+" 件，折后 "+a(u)+" 元。要叠加满减就在上面填满减条件。")}var C=e(n("dl-pa")),h=e(n("dl-qa")),x=n("dl-ua").value,E=e(n("dl-pb")),k=e(n("dl-qb")),g=n("dl-ub").value;if(C>0&&h>0&&E>0&&k>0){var y=C/h,S=E/k,T=Math.min(y,S),N=Math.max(y,S),v=(N-T)/T,F=y<=S;n("dl-winner").textContent=F?"商品 A":"商品 B",n("dl-winner-unit").textContent="每"+(F?x:g)+"更便宜";var R=_(function(D){return A(D,D>=10?2:D>=1?3:4)},"ud");n("dl-unit-a").textContent="每"+x+" "+R(y)+" 元",n("dl-unit-b").textContent="每"+g+" "+R(S)+" 元",n("dl-diff").textContent=P(v)+"（贵的那方贵这么多）",n("dl-note2").textContent=B((F?"A":"B")+" 的每 "+(F?x:g)+" 单价更低，另一件贵了 "+P(v)+"。比价别看总价和包装大小，算到每克/每毫升才准；"+(x!==g?"两边单位不同时（"+x+" vs "+g+"）要先把单位换算统一再比。":"同类单位直接比单价即可。"))}else n("dl-winner").textContent="—",n("dl-winner-unit").textContent="",["dl-unit-a","dl-unit-b","dl-diff"].forEach(function(D){n(D).textContent="—"}),n("dl-note2").textContent="两件商品的价格和数量都填上才能比单价。"}_(an,"calcDeal");function en(){var t=e(n("cd-balance")),d=e(n("cd-min"))/100,o=e(n("cd-rate"))/100,s=Math.max(1,e(n("cd-days"))||30),p=o*s;if(t<=0||d<=0){["cd-interest","cd-apr","cd-min-amt","cd-months","cd-total-int","cd-left","cd-save"].forEach(function(r){n(r).textContent="—"}),n("cd-note").textContent="填账单金额和最低还款比例后自动计算。";return}for(var m=t*p,u=t*d,l=t+m-u,c=m,i=1,f=l;l>.5&&i<1200;){var b=l*p,M=Math.max(l*d,10);M>l+b&&(M=l+b),l=l+b-M,c+=b,i++,i===12&&(f=l)}n("cd-interest").textContent=a(m),n("cd-apr").textContent=P(o*365,2)+"（日息 "+A(o*100,3)+"% × 365）",n("cd-min-amt").textContent=w(u),n("cd-months").textContent=i>=1200?"几乎还不完":i+" 期（约 "+A(i/12,1)+" 年）",n("cd-total-int").textContent=w(c),n("cd-left").textContent=w(f),n("cd-save").textContent=w(c),n("cd-note").textContent="关键点：只要没在到期还款日前全额还清，就已经不享受免息期——已还的部分也会从消费记账日起按日息计息，所以只还最低还款，利息是按整笔欠款滚的。日息万分之五折合年化 18.25%，比大多数消费贷都贵；能全额还就全额还，实在不行优先考虑账单分期（年化通常 13%–16%），别长期只还最低。"}_(en,"calcCard");function tn(){var t=e(n("fx-amount")),d=e(n("fx-rate")),o=e(n("fx-fee"))/100,s=n("fx-cur").value,p=t*d,m=p*(1-o),u=d>0?t/d:0,l=u*(1-o);n("fx-main-label").textContent=s+" → 人民币",n("fx-main").textContent=a(p),n("fx-main-unit").textContent="元",n("fx-net").textContent=a(m)+" 元"+(o>0?"（扣 "+P(o)+"）":""),n("fx-rev").textContent=a(u)+" "+s+(o>0?"，实际到手 "+a(l):"");var c=n("fx-cat").value,i=X[c];n("fx-from").options.length!==i.length&&j();var f=e(n("fx-value")),b=parseInt(n("fx-from").value,10)||0,M=parseInt(n("fx-to").value,10)||0,r,C;if(c==="temp")r=z(f,b,M),C=i[b][0]+" → "+i[M][0];else{var h=i[b][1],x=i[M][1];r=f*h/x,C="1 "+i[b][0]+" = "+A(h/x,4)+" "+i[M][0]}var E=Math.abs(r)<1?6:2;n("fx-unit-result").textContent=A(r,E)+" "+i[M][0],n("fx-unit-formula").textContent=C,n("fx-note").textContent="汇率这里不联网，需要你按当天银行牌价手填（现汇卖出价更适合算换汇成本）。单位换算里 1 斤 = 500 克、1 亩 = 666.67 平方米、1 码 = 0.9144 米。"}_(tn,"calcFx");function ln(){var t=Math.max(0,e(n("sp-total"),0)),d=Math.max(1,Math.round(e(n("sp-people"),1))),o=Math.max(0,e(n("sp-fee"),0))/100,s=e(n("sp-round"),0),p=n("sp-who").value,m=t*o,u=t+m,l=u/d,c=l;p==="self"&&(c=s>0?Math.floor(l/s)*s:Math.round(l*100)/100);var i=p==="self"?u-c*(d-1):l,f=c*(d-1)+i;n("sp-gross").textContent=w(u),n("sp-fee-amt").textContent=w(m),n("sp-each").textContent=a(c),n("sp-others").textContent=d>1?w(c)+" × "+(d-1)+" 人":"—",n("sp-self").textContent=w(i)+(p==="self"&&i>=c-1e-4?"（含零头 "+a(i-c)+"）":""),n("sp-check").textContent=w(f),n("sp-note").textContent="算法：（消费总额 "+a(t)+" + 服务费 "+P(o,2)+"）÷ "+d+" 人 = 每人 "+a(l)+"。"+(p==="self"&&s>0?"按「抹到 "+s+" 元」处理，其他人各付 "+a(c)+"，零头 "+a(u-c*d)+" 由发起人承担，收款合计 "+a(f)+" 与实付一致。":"每人金额先四舍五入到分，差出来的几分钱由发起人补，收款合计与实付一致。")+" 聚餐 AA 里最容易吵的两件事：服务费有没有算进人均、以及有没有人没喝酒/没吃某道菜——后者建议单独把酒水剔除后再按人数分。"}_(ln,"calcSplit");function sn(){for(var t=Math.max(0,e(n("mc-amount"),0)),d=n("mc-cur").value||"CNY",o={},s=t,p=0;p<L.length;p++)o[L[p].k]=Math.max(0,e(n(L[p].id),0));d!=="CNY"&&(s=t*(o[d]||0)),n("mc-cny").textContent=a(s);for(var m=[],u=0;u<L.length;u++){var l=L[u],c=o[l.k],i=c>0?s/c:0;n(l.out).textContent=c>0?A(i,l.digits)+" "+l.name:"请填汇率",c>0&&m.push(l.name+" "+A(i,l.digits))}var f=s/1.004;n("mc-spread").textContent=a(f)+" 元（少的 "+a(s-f)+" 就是点差成本）",n("mc-note").textContent="先把金额统一折成人民币 "+a(s)+" 元（"+(d==="CNY"?"本来就是人民币":"按你填的 "+d+" 汇率折算")+"），再按各币种汇率换出去："+(m.length?m.join("、"):"（汇率未填）")+"。 这里的汇率必须你自己填——本页不联网、不取实时行情，写上你能换到的实际价格才有意义。 真实换汇三个损耗点：银行「现汇/现钞」买卖价差（个人购汇按银行卖出价，通常比中间价贵 0.3%–1%）；跨境汇款电报费/手续费（每笔几十到两百元）；境外刷卡走卡组织汇率，Visa/Mastercard 可能再收 0–3% 货币转换费（银联多数免）。 另外个人年度便利化额度是每人每年等值 5 万美元，超过要提供真实用途凭证。"}_(sn,"calcMulti");function pn(){var t=Math.max(0,e(n("cr-price"),0)),d=Math.max(1,Math.min(20,Math.round(e(n("cr-years"),8)))),o=Math.min(100,Math.max(0,e(n("cr-residual"),30)))/100,s=Math.max(0,e(n("cr-km"),0)),p=Math.max(0,e(n("cr-fc"),0)),m=Math.max(0,e(n("cr-oil"),0)),u=Math.max(0,e(n("cr-ins"),0)),l=Math.max(0,e(n("cr-maint"),0)),c=Math.max(0,e(n("cr-park"),0)),i=Math.max(0,e(n("cr-taxi"),0)),f=(t-t*o)/d,b=s*p/100*m,M=u+l+c,r=f+b+M,C=s>0?r/s:0,h=s*i,x=h-r;n("cr-total").textContent=a(r),n("cr-dep").textContent=w(f),n("cr-fuel").textContent=w(b),n("cr-fixed").textContent=w(M),n("cr-perkm").textContent=s>0?a(C)+" 元 / 公里":"—（填了里程才算）",n("cr-taxi-year").textContent=w(h),n("cr-diff").textContent=(x>=0?"打车贵 ":"养车贵 ")+a(Math.abs(x))+" 元 / 年",n("cr-life").textContent=w(r*d)+"（"+d+" 年）",n("cr-note").textContent="每年真实成本 = 折旧 "+a(f)+"（"+a(t)+" 元开 "+d+" 年、残值 "+P(o,0)+" 卖掉，这是最大的一块，也最容易被忽略） + 油费 "+a(b)+"（"+A(s,0)+" 公里 × "+A(p,1)+"L/100km × "+a(m)+" 元） + 保险保养停车 "+a(M)+" = "+a(r)+" 元，折合 "+a(C)+" 元/公里。 同样里程打车要 "+a(h)+" 元，"+(x>=0?"打车反而贵 "+a(x):"养车贵 "+a(-x))+" 元/年。 关键结论：车的大部分成本是「固定」的（折旧、保险、停车），开得越少每公里越贵——年里程低于 8000 公里、又在限行/停车贵的城市，打车+租车通常更划算；年里程过 1.5 万公里、有孩子要接送、常跑郊区，买车才值。 另外别忘了：购置税（燃油车约车价 8.85%）、上牌费、首年保险、贷款利息都没算在这里；电车还有充电/家充桩/电池衰减，油车还有大保养和轮胎。买之前先把这笔账算清，别只看月供。"}_(pn,"calcCar");function dn(){var t=[{n:"车贷尾款",b:Math.max(0,e(n("df-bal1"),0)),r:Math.max(0,e(n("df-rate1"),0))/100,m:Math.max(0,e(n("df-min1"),0))},{n:"信用卡",b:Math.max(0,e(n("df-bal2"),0)),r:Math.max(0,e(n("df-rate2"),0))/100,m:Math.max(0,e(n("df-min2"),0))},{n:"消费贷",b:Math.max(0,e(n("df-bal3"),0)),r:Math.max(0,e(n("df-rate3"),0))/100,m:Math.max(0,e(n("df-min3"),0))}].filter(function(r){return r.b>.005}),d=Math.max(0,e(n("df-extra"),0));function o(r,C){for(var h=t.map(function(v){return{n:v.n,b:v.b,r:v.r,m:v.m,done:0,int0:0}}),x=C,E=0,k=0,g=h.length>0;g&&E<600;){E++,h.forEach(function(v){if(!(v.b<=.005)){var F=v.b*v.r/12;v.b+=F,v.int0+=F,k+=F}}),h.forEach(function(v){v.b<=.005||(v.b-=Math.min(v.b,v.m))});for(var y=x;y>.005;){var S=h.filter(function(v){return v.b>.005});if(!S.length)break;var T=S[0];S.forEach(function(v){(r==="avalanche"?v.r>T.r:v.b<T.b)&&(T=v)});var N=Math.min(T.b,y);T.b-=N,y-=N}x=C,h.forEach(function(v){v.b<=.005&&(x+=v.m)}),h.forEach(function(v){v.b<=.005&&!v.done&&(v.done=E)}),g=h.some(function(v){return v.b>.005})}return{months:E,interest:k,rows:h,capped:g}}_(o,"run");var s=o("avalanche",d),p=o("snowball",d),m=o("avalanche",0),u=t.reduce(function(r,C){return r+C.b},0),l=d+t.reduce(function(r,C){return r+C.m},0),c=p.interest-s.interest,i=null,f=null;t.forEach(function(r){(!i||r.r>i.r)&&(i=r),(!f||r.b<f.b)&&(f=r)}),n("df-months").textContent=s.capped?">600":String(s.months),n("df-total").textContent=w(u),n("df-permonth").textContent=w(l)+(d>0?"（含额外 "+a(d)+"）":""),n("df-intA").textContent=w(s.interest),n("df-intS").textContent=w(p.interest),n("df-diff").textContent=c>.005?w(c)+"（高息优先更省）":"两者一样",n("df-minonly").textContent=m.capped?"50 年都还不完":m.months+" 个月 / 利息 "+a(m.interest)+" 元",n("df-first").textContent=(i?i.n:"—")+"（"+(i?a(i.b):"0")+" 元，利率 "+(i?A(i.r*100,1):"0")+"%）";var b=n("df-body");if(b.innerHTML="",t.forEach(function(r,C){var h=document.createElement("tr"),x=s.rows[C]||{done:0,int0:0},E=p.rows[C]||{done:0,int0:0};[r.n,a(r.b),A(r.r*100,1)+"%",(s.capped?">600":x.done)+" 月",(p.capped?">600":E.done)+" 月",a(x.int0)].forEach(function(k){var g=document.createElement("td");g.textContent=k,h.appendChild(g)}),b.appendChild(h)}),!t.length){n("df-note").textContent="先填上至少一笔欠款的余额和利率。";return}var M="两种打法的区别只有一句：雪崩法把额外的钱先砸向利率最高的那笔（数学最优），雪球法先砸向余额最小的那笔（最快看到「清零」，心理最优）。 在你这个例子里，雪崩法总利息 "+a(s.interest)+" 元，雪球法 "+a(p.interest)+" 元，差 "+a(Math.abs(c))+" 元";M+=c>.005?"，雪崩法更省。差额看着不大，是因为你的月供已经压过利息了；如果信用卡余额再大一点、或者额外加的钱再多一点，这个差距会迅速放大。":"，两者一样——说明你的最低还款已经远高于利息，钱的顺序排不排队都无所谓，这种情况下先清哪笔看心情就行。",M+=" 真正的杀手是这个：只还最低、一分不加，要 "+(m.capped?"50 年以上（等于永远还不完）":m.months+" 个月、付 "+a(m.interest)+" 元利息")+"。 所以顺序问题远不如「每月多砸进去 "+a(d)+" 元」重要。 三条实操：① 先把应急金留够（3–6 个月支出）再加速还债，否则一遇到意外又得刷卡，白干； ② 信用卡循环利息按日息万分之五算，年化 18% 左右，任何「理财」都跑不赢它，优先清掉； ③ 别用「新贷还旧贷」把高息换成看起来低息的长期贷款——如果总成本没降，你只是把痛苦拉长了。 还清一笔之后，记得把原来那笔月供继续投出去，别让它悄悄变成消费。",n("df-note").textContent=M}_(dn,"calcDebtFree");function on(){var t=Math.max(0,e(n("dm-bal"),0)),d=Math.max(0,e(n("dm-old"),0))/100,o=Math.max(0,e(n("dm-new"),0))/100,s=Math.max(0,e(n("dm-fee"),0))/100,p=Math.max(0,e(n("dm-pay"),0));function m(v,F,R){var D=v*(1+R),Y=0,W=0,K=F/12;if(p<=D*K)return null;for(;D>.005&&Y<720;){var I=D*K;W+=I,D=D+I-p,Y++}return D>.005?null:{m:Y,tot:W}}_(m,"sim");var u=m(t,d,0),l=m(t,o,s),c=t*s,i=n("dm-body");if(i.innerHTML="",!u||!l){n("dm-save").textContent="—",["dm-m1","dm-t1","dm-m2","dm-t2","dm-feeamt","dm-breakeven"].forEach(function(v){n(v).textContent="—"}),n("dm-note").textContent="每月还款额太小（连利息都不够还），本金永远还不完。把「每月能还多少」调大到超过「余额 × 月利率」再算。";return}var f=u.tot-l.tot-c;n("dm-save").textContent=a(f),n("dm-m1").textContent=u.m+" 个月",n("dm-t1").textContent=w(u.tot),n("dm-m2").textContent=l.m+" 个月",n("dm-t2").textContent=w(l.tot),n("dm-feeamt").textContent=w(c)+"（"+P(s,2)+"）";for(var b=null,M=0,r=.6,C=0;C<60;C++){var h=(M+r)/2,x=m(t,o,h),E=x?u.tot-x.tot-t*h:-1;if(E>0?M=h:r=h,x&&Math.abs(E)<.5){b=h;break}}b===null&&(b=r),n("dm-breakeven").textContent=P(b,2)+"（"+a(t*b)+" 元）";for(var k=[0,.01,.02,.03,.05,.08],g=0;g<k.length;g++){var y=k[g],S=m(t,o,y),T=S?u.tot-S.tot-t*y:-1,N=document.createElement("tr");N.innerHTML="<td>"+P(y,0)+"</td><td>"+a(t*y)+"</td><td>"+(T>=0?"+":"")+a(T)+"</td><td>"+(T>0?"划算":T>-50?"打平":"不划算")+"</td>",i.appendChild(N)}n("dm-note").textContent="用同样每月还 "+a(p)+" 元来比：不置换要还 "+u.m+" 个月、付利息 "+a(u.tot)+" 元；换成 "+P(o,2)+" 的新贷（手续费 "+a(c)+" 元计进本金）只要 "+l.m+" 个月、付利息 "+a(l.tot)+" 元。合计（含手续费）省 "+a(f)+" 元，手续费率只要低于 "+P(b,2)+" 就还是划算的。 判断标准一句话：新贷的真实年化（利率 + 手续费摊到期限里）低于旧债利率，就值得换。 但置换有三个坑：① 只有「真降息」才划算，很多产品看着利率低，加上手续费、服务费、保证金后真实年化并没降多少； ② 借新还旧本质是把短期高息换成长期低息，如果你还按原来那样慢慢还，总利息反而可能变多——所以这里固定了「每月还多少」来比； ③ 别为了置换去碰「以贷养贷」的中介过桥，那类综合成本经常超过 24%，比原来的信用卡还贵。"}_(on,"calcDebtMerge");function rn(){var t=Math.min(28,Math.max(1,Math.round(e(n("fp-bill"),5)))),d=Math.min(28,Math.max(1,Math.round(e(n("fp-due"),25)))),o=Math.max(0,e(n("fp-amount"),0)),s=864e5,p=new Date;p.setHours(0,0,0,0);function m(y){var S=y.getFullYear(),T=y.getMonth();return y.getDate()<=t?new Date(S,T,t):new Date(S,T+1,t)}_(m,"billFor");function u(y){return d>t?new Date(y.getFullYear(),y.getMonth(),d):new Date(y.getFullYear(),y.getMonth()+1,d)}_(u,"payFor");function l(y){return y.getMonth()+1+"/"+y.getDate()}_(l,"md");function c(y){var S=m(y),T=u(S);return{bd:S,pay:T,days:Math.max(0,Math.round((T-y)/s))}}_(c,"info");var i=c(p),f=new Date(p.getFullYear(),p.getMonth(),t+1);f<=p&&(f=new Date(p.getFullYear(),p.getMonth()+1,t+1));var b=c(f);n("fp-days").textContent=i.days,n("fp-billdate").textContent=l(i.bd)+" 出账",n("fp-paydate").textContent=l(i.pay),n("fp-max").textContent=b.days+" 天",n("fp-best").textContent=l(f)+"（账单日 "+l(b.bd)+" → 还款 "+l(b.pay)+"）",n("fp-lost").textContent=Math.max(0,b.days-i.days)+" 天",n("fp-cost").textContent=o>0?w(o*.138)+"（按 13.8% 年化借一年的利息）":"填个金额就能看到";var M=n("fp-body");M.innerHTML="";var r=m(p),C=[p,r,new Date(r.getFullYear(),r.getMonth(),r.getDate()+1)];[3,7,14,20,25].forEach(function(y){C.push(new Date(r.getFullYear(),r.getMonth(),r.getDate()+y))});for(var h=0;h<C.length;h++){var x=C[h],E=c(x),k=x.getTime()===p.getTime()?l(x)+"（今天）":l(x),g=document.createElement("tr");g.innerHTML="<td>"+k+"</td><td>"+l(E.bd)+"</td><td>"+l(E.pay)+"</td><td>"+E.days+"</td>",M.appendChild(g)}n("fp-note").textContent="免息期的起点不是刷卡那天，而是「这笔钱被算进哪期账单」——账单日 "+t+" 号之后刷的，会推到下个月 "+t+" 号出账，于是白拿更多天。 你这张卡最长免息 "+b.days+" 天，就是刷在 "+l(f)+"（账单日次日）的时候； 今天刷只有 "+i.days+" 天，比最优少 "+Math.max(0,b.days-i.days)+" 天。大额消费挪到账单日次日再刷，等于白拿一个多月的无息贷款。下方表格的消费日会跟着账单日自动重算：第一行是今天，其后是出账日、出账次日（最优）和出账后几个关键日子；改账单日/还款日，全表同步刷新。 但要记住三件事：① 免息期只对「全额还款」有效，哪怕差 1 元没还清，全部消费都从记账日起按日息 0.05% 计息（年化 18.25%），免息一天都没有； ② 取现、转账、分期不享受免息，取现当天就开始算利息还有手续费； ③ 所谓「最低还款」只是不逾期，利息照样全额算，所以别把免息期当收入，它只是让现金流顺一点。"}_(rn,"calcFreePeriod");function cn(){var t=Math.max(0,e(n("ev-km"),0)),d=Math.max(0,e(n("ev-oil"),0)),o=Math.max(0,e(n("ev-price"),0)),s=Math.max(0,e(n("ev-kwh"),0)),p=Math.max(0,e(n("ev-eprice"),0)),m=Math.max(0,e(n("ev-p1"),0)),u=Math.max(0,e(n("ev-p2"),0)),l=Math.max(1,Math.min(20,Math.round(e(n("ev-years"),8)))),c=Math.min(100,Math.max(0,e(n("ev-res1"),30)))/100,i=Math.min(100,Math.max(0,e(n("ev-res2"),25)))/100,f=Math.max(0,e(n("ev-m1"),0)),b=Math.max(0,e(n("ev-m2"),0)),M=Math.max(0,e(n("ev-i1"),0)),r=Math.max(0,e(n("ev-i2"),0)),C=t*d/100*o,h=t*s/100*p,x=C+f+M,E=h+b+r;function k(G,q,V,J){return G+q*J-G*V}_(k,"total");var g=k(m,x,c,l),y=k(u,E,i,l),S=g-y,T=f-b+(M-r),N=(d*o-s*p)/100,v=u-m-(u*i-m*c),F=N>0?(v/l-T)/N:0;n("ev-diff").textContent=(S>=0?"":"-")+a(Math.abs(S)),n("ev-energy").textContent=a(C)+" / "+a(h),n("ev-year").textContent=a(x)+" / "+a(E),n("ev-perkm").textContent=a(t>0?x/t:0)+" / "+a(t>0?E/t:0)+" 元",n("ev-t1").textContent=w(g),n("ev-t2").textContent=w(y),n("ev-crit").textContent=Math.max(0,Math.round(F)).toLocaleString("zh-CN")+" 公里/年";var R=n("ev-body");R.innerHTML="";for(var D=[5e3,1e4,15e3,2e4,3e4],Y=0;Y<D.length;Y++){var W=D[Y],K=W*d/100*o+f+M,I=W*s/100*p+b+r,H=k(m,K,c,l),O=k(u,I,i,l),U=document.createElement("tr");U.innerHTML="<td>"+a(W)+"</td><td>"+a(H)+"</td><td>"+a(O)+"</td><td>"+(H>O?"电车省 "+a(H-O):"油车省 "+a(O-H))+"</td>",R.appendChild(U)}n("ev-note").textContent="按一年开 "+a(t)+" 公里（油价 "+o+" 元/L、电耗 "+s+" 度/100km、电价 "+p+" 元/度）算：油费 "+a(C)+" 元、电费 "+a(h)+" 元，一年光能源就差 "+a(C-h)+" 元。 加上保养和保险，油车一年 "+a(x)+" 元、电车 "+a(E)+" 元。 把购车差价和 "+l+" 年后的残值也算进来，开满 "+l+" 年油车总花费 "+a(g)+" 元、电车 "+a(y)+" 元，"+(S>=0?"电车省 "+a(S)+" 元。":"电车反而贵 "+a(-S)+" 元。")+" 关键变量是里程：盈亏平衡点大约在每年 "+Math.max(0,Math.round(F)).toLocaleString("zh-CN")+" 公里，开得比这多电车才划算。 三个常被忽略的项：① 电车首年折旧很猛（三年掉价常超一半），保值率差的部分我按残值率算了，实际可能更狠； ② 家里能不能装充电桩决定电价，全靠公共快充（1.5 元/度以上）时优势会被吃掉一半； ③ 电池衰减、换电成本、保险逐年上涨都没算进去，长途多的人还要算上补能时间成本。"}_(cn,"calcEv");export const PANELS={installment:`  <section class="panel" id="panel-installment">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>分期金额（元）</span>
      <input id="is-amount" type="number" inputmode="decimal" min="0" step="1000" value="12000">
    </label>
    <label class="f">
      <span>分期期数（月）</span>
      <input id="is-months" type="number" inputmode="decimal" min="0" step="1" value="12">
    </label>
    <label class="f">
      <span>手续费怎么收</span>
      <select id="is-mode">
        <option value="monthly" selected>每期收，按期费率</option>
        <option value="once">一次性收，按总费率</option>
        <option value="fixed">直接给总手续费金额</option>
      </select>
    </label>
    <label class="f">
      <span id="is-rate-label">每期费率（%）</span>
      <input id="is-rate" type="number" inputmode="decimal" min="0" step="0.01" value="0.6">
      <em>银行/平台常写「月费率 0.6%」或「每期 0.6%」，就填这里</em>
    </label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big">
      <span class="k">实际年化利率（IRR 口径）</span>
      <strong id="is-apr">—</strong>
      <span class="unit">%</span>
    </div>
    <ul class="kv">
      <li><span>每期还款</span><b id="is-pay">—</b></li>
      <li><span>手续费合计</span><b id="is-fee">—</b></li>
      <li><span>名义年化（费率×12）</span><b id="is-nominal">—</b></li>
      <li><span>比宣传的费率贵多少倍</span><b id="is-multiple">—</b></li>
    </ul>
    <p class="hint" id="is-note"></p>
  </div>
    </div>
  </section>
`,deal:`  <section class="panel" id="panel-deal">
    <div class="cols">
  <div class="card">
    <h2>打折 / 满减</h2>
    <label class="f">
      <span>原价（元 / 件）</span>
      <input id="dl-price" type="number" inputmode="decimal" min="0" step="10" value="299">
    </label>
    <label class="f">
      <span>折扣（几折，不打折填 10）</span>
      <input id="dl-discount" type="number" inputmode="decimal" min="0" step="0.5" value="8.5">
    </label>
    <label class="f">
      <span>满减条件（满 X 元，没有填 0）</span>
      <input id="dl-threshold" type="number" inputmode="decimal" min="0" step="50" value="300">
    </label>
    <label class="f">
      <span>满减金额（减 Y 元）</span>
      <input id="dl-off" type="number" inputmode="decimal" min="0" step="10" value="50">
    </label>
    <label class="f">
      <span>数量（件）</span>
      <input id="dl-qty" type="number" inputmode="decimal" min="0" step="1" value="2">
    </label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big">
      <span class="k">实际要付</span>
      <strong id="dl-pay">—</strong>
      <span class="unit">元</span>
    </div>
    <ul class="kv">
      <li><span>相当于打几折</span><b id="dl-real-discount">—</b></li>
      <li><span>省了多少钱</span><b id="dl-save">—</b></li>
      <li><span>每件实际单价</span><b id="dl-unit">—</b></li>
      <li><span>离下一档满减还差</span><b id="dl-next">—</b></li>
    </ul>
    <p class="hint" id="dl-note"></p>
  </div>
    </div>

    <div class="cols">
  <div class="card">
    <h2>单价比较：哪个更划算</h2>
    <label class="f">
      <span>商品 A</span>
      <span class="row">
        <input id="dl-pa" type="number" inputmode="decimal" min="0" step="1" value="39.9" placeholder="价格">
        <input id="dl-qa" type="number" inputmode="decimal" min="0" step="1" value="750" placeholder="数量">
        <select id="dl-ua">
          <option value="克" selected>克</option>
          <option value="毫升">毫升</option>
          <option value="个">个</option>
          <option value="片">片</option>
        </select>
      </span>
    </label>
    <label class="f">
      <span>商品 B</span>
      <span class="row">
        <input id="dl-pb" type="number" inputmode="decimal" min="0" step="1" value="56" placeholder="价格">
        <input id="dl-qb" type="number" inputmode="decimal" min="0" step="1" value="1100" placeholder="数量">
        <select id="dl-ub">
          <option value="克" selected>克</option>
          <option value="毫升">毫升</option>
          <option value="个">个</option>
          <option value="片">片</option>
        </select>
      </span>
    </label>
  </div>

  <div class="card res">
    <h2>比较结果</h2>
    <div class="big">
      <span class="k">更划算的是</span>
      <strong id="dl-winner">—</strong>
      <span class="unit" id="dl-winner-unit"></span>
    </div>
    <ul class="kv">
      <li><span>商品 A 单价</span><b id="dl-unit-a">—</b></li>
      <li><span>商品 B 单价</span><b id="dl-unit-b">—</b></li>
      <li><span>差价比例</span><b id="dl-diff">—</b></li>
    </ul>
    <p class="hint" id="dl-note2"></p>
  </div>
    </div>
  </section>
`,card:`  <section class="panel" id="panel-card">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>本期账单金额（元）</span>
      <input id="cd-balance" type="number" inputmode="decimal" min="0" step="500" value="10000">
    </label>
    <label class="f">
      <span>最低还款比例（%）</span>
      <input id="cd-min" type="number" inputmode="decimal" min="0" max="100" step="1" value="10">
    </label>
    <label class="f">
      <span>日利率（%）</span>
      <input id="cd-rate" type="number" inputmode="decimal" min="0" step="0.005" value="0.05">
      <em>信用卡循环利息一般是日息万分之五，即 0.05%</em>
    </label>
    <label class="f">
      <span>每期计息天数</span>
      <input id="cd-days" type="number" inputmode="numeric" min="1" step="1" value="30">
    </label>
  </div>

  <div class="card res">
    <h2>结果（只还最低还款）</h2>
    <div class="big">
      <span class="k">首期利息</span>
      <strong id="cd-interest">—</strong>
      <span class="unit">元</span>
    </div>
    <ul class="kv">
      <li><span>折合年化利率</span><b id="cd-apr">—</b></li>
      <li><span>本期最低还款额</span><b id="cd-min-amt">—</b></li>
      <li><span>一直只还最低，还清需要</span><b id="cd-months">—</b></li>
      <li><span>累计利息</span><b id="cd-total-int">—</b></li>
      <li><span>12 期后仍欠</span><b id="cd-left">—</b></li>
      <li><span>若这次全额还清可省利息</span><b id="cd-save">—</b></li>
    </ul>
    <p class="hint" id="cd-note"></p>
  </div>
    </div>
  </section>
`,fx:`  <section class="panel" id="panel-fx">
    <div class="cols">
  <div class="card">
    <h2>汇率换算</h2>
    <label class="f">
      <span>金额</span>
      <span class="row">
        <input id="fx-amount" type="number" inputmode="decimal" min="0" step="100" value="1000">
        <select id="fx-cur">
          <option value="美元">美元 USD</option>
          <option value="欧元">欧元 EUR</option>
          <option value="日元">日元 JPY</option>
          <option value="港币">港币 HKD</option>
          <option value="英镑">英镑 GBP</option>
          <option value="澳元">澳元 AUD</option>
          <option value="加元">加元 CAD</option>
          <option value="韩元">韩元 KRW</option>
          <option value="新币">新币 SGD</option>
          <option value="泰铢">泰铢 THB</option>
        </select>
      </span>
    </label>
    <label class="f">
      <span>汇率：1 外币 = ? 人民币</span>
      <input id="fx-rate" type="number" inputmode="decimal" min="0" step="0.01" value="7.10">
      <em>汇率每天变，按你手上银行 App 的实时牌价填</em>
    </label>
    <label class="f">
      <span>换汇手续费 / 点差（%）</span>
      <input id="fx-fee" type="number" inputmode="decimal" min="0" step="0.1" value="0">
    </label>

    <h2 class="sub">单位换算</h2>
    <label class="f">
      <span>类别</span>
      <select id="fx-cat">
        <option value="length" selected>长度</option>
        <option value="weight">重量</option>
        <option value="area">面积</option>
        <option value="volume">体积</option>
        <option value="temp">温度</option>
      </select>
    </label>
    <label class="f">
      <span>数值</span>
      <input id="fx-value" type="number" inputmode="decimal" step="1" value="1">
    </label>
    <label class="f">
      <span>从 / 到</span>
      <span class="row">
        <select id="fx-from"></select>
        <select id="fx-to"></select>
      </span>
    </label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big">
      <span class="k" id="fx-main-label">折合人民币</span>
      <strong id="fx-main">—</strong>
      <span class="unit" id="fx-main-unit">元</span>
    </div>
    <ul class="kv">
      <li><span>扣掉手续费后实际到账</span><b id="fx-net">—</b></li>
      <li><span>反过来：人民币 → 外币</span><b id="fx-rev">—</b></li>
      <li><span>单位换算结果</span><b id="fx-unit-result">—</b></li>
      <li><span>换算关系</span><b id="fx-unit-formula">—</b></li>
    </ul>
    <p class="hint" id="fx-note"></p>
  </div>
    </div>
  </section>
`,split:`  <section class="panel" id="panel-split">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>消费总额（元）</span>
      <input id="sp-total" type="number" inputmode="decimal" min="0" step="50" value="1288">
    </label>
    <label class="f">
      <span>参与人数（含自己）</span>
      <input id="sp-people" type="number" inputmode="numeric" min="1" step="1" value="6">
    </label>
    <label class="f">
      <span>服务费 / 小费（%）</span>
      <input id="sp-fee" type="number" inputmode="decimal" min="0" step="1" value="10">
    </label>
    <label class="f">
      <span>抹零方式</span>
      <select id="sp-round">
        <option value="0" selected>精确到分</option>
        <option value="1">抹到元</option>
        <option value="10">抹到 10 元</option>
      </select>
    </label>
    <label class="f">
      <span>谁承担抹零差额</span>
      <select id="sp-who">
        <option value="self" selected>发起人（自己多出）</option>
        <option value="all">大家平摊（不抹零）</option>
      </select>
    </label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big">
      <span class="k">每人应付</span>
      <strong id="sp-each">—</strong>
      <span class="unit">元</span>
    </div>
    <ul class="kv">
      <li><span>含服务费的实付总额</span><b id="sp-gross">—</b></li>
      <li><span>其中服务费</span><b id="sp-fee-amt">—</b></li>
      <li><span>其他人各付</span><b id="sp-others">—</b></li>
      <li><span>发起人（你）实际付</span><b id="sp-self">—</b></li>
      <li><span>收款合计核对</span><b id="sp-check">—</b></li>
    </ul>
    <p class="hint" id="sp-note"></p>
  </div>
    </div>
  </section>
`,multi:`  <section class="panel" id="panel-multi">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>金额</span>
      <input id="mc-amount" type="number" inputmode="decimal" min="0" step="100" value="10000">
    </label>
    <label class="f">
      <span>这笔钱是哪种货币</span>
      <select id="mc-cur">
        <option value="CNY" selected>人民币 CNY</option>
        <option value="USD">美元 USD</option>
        <option value="EUR">欧元 EUR</option>
        <option value="JPY">日元 JPY</option>
        <option value="HKD">港币 HKD</option>
        <option value="GBP">英镑 GBP</option>
      </select>
    </label>
    <h2 class="sub">汇率（元 / 1 外币，手动填）</h2>
    <label class="f">
      <span>美元 USD</span>
      <input id="mc-usd" type="number" inputmode="decimal" min="0" step="0.01" value="7.10">
    </label>
    <label class="f">
      <span>欧元 EUR</span>
      <input id="mc-eur" type="number" inputmode="decimal" min="0" step="0.01" value="7.75">
    </label>
    <label class="f">
      <span>日元 JPY（每 1 日元）</span>
      <input id="mc-jpy" type="number" inputmode="decimal" min="0" step="0.001" value="0.0475">
    </label>
    <label class="f">
      <span>港币 HKD</span>
      <input id="mc-hkd" type="number" inputmode="decimal" min="0" step="0.001" value="0.912">
    </label>
    <label class="f">
      <span>英镑 GBP</span>
      <input id="mc-gbp" type="number" inputmode="decimal" min="0" step="0.01" value="9.05">
    </label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big">
      <span class="k">折合人民币</span>
      <strong id="mc-cny">—</strong>
      <span class="unit">元</span>
    </div>
    <ul class="kv">
      <li><span>美元 USD</span><b id="mc-usd-out">—</b></li>
      <li><span>欧元 EUR</span><b id="mc-eur-out">—</b></li>
      <li><span>日元 JPY</span><b id="mc-jpy-out">—</b></li>
      <li><span>港币 HKD</span><b id="mc-hkd-out">—</b></li>
      <li><span>英镑 GBP</span><b id="mc-gbp-out">—</b></li>
      <li><span>银行卖出价上浮 0.4% 后</span><b id="mc-spread">—</b></li>
    </ul>
    <p class="hint" id="mc-note"></p>
  </div>
    </div>
  </section>
`,car:`  <section class="panel" id="panel-car">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>车价（元，含购置税等落地价差可另计）</span>
      <input id="cr-price" type="number" inputmode="decimal" min="0" step="10000" value="150000">
    </label>
    <label class="f">
      <span>计划开几年</span>
      <input id="cr-years" type="number" inputmode="numeric" min="1" max="20" step="1" value="8">
    </label>
    <label class="f">
      <span>届时残值率（%）</span>
      <input id="cr-residual" type="number" inputmode="decimal" min="0" max="100" step="5" value="30">
    </label>
    <label class="f">
      <span>每年行驶（公里）</span>
      <input id="cr-km" type="number" inputmode="decimal" min="0" step="1000" value="15000">
    </label>
    <label class="f">
      <span>综合油耗（L/100km）</span>
      <input id="cr-fc" type="number" inputmode="decimal" min="0" step="0.5" value="8">
    </label>
    <label class="f">
      <span>油价（元/升）</span>
      <input id="cr-oil" type="number" inputmode="decimal" min="0" step="0.1" value="8">
    </label>
    <label class="f">
      <span>保险（元/年）</span>
      <input id="cr-ins" type="number" inputmode="decimal" min="0" step="500" value="5000">
    </label>
    <label class="f">
      <span>保养维修（元/年）</span>
      <input id="cr-maint" type="number" inputmode="decimal" min="0" step="500" value="2000">
    </label>
    <label class="f">
      <span>停车洗车过路（元/年）</span>
      <input id="cr-park" type="number" inputmode="decimal" min="0" step="500" value="3600">
    </label>
    <label class="f">
      <span>打车折算单价（元/公里）</span>
      <input id="cr-taxi" type="number" inputmode="decimal" min="0" step="0.1" value="2.4">
    </label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big">
      <span class="k">养车每年总成本</span>
      <strong id="cr-total">—</strong>
      <span class="unit">元</span>
    </div>
    <ul class="kv">
      <li><span>每年折旧</span><b id="cr-dep">—</b></li>
      <li><span>每年油费</span><b id="cr-fuel">—</b></li>
      <li><span>保险+保养+停车</span><b id="cr-fixed">—</b></li>
      <li><span>每公里成本</span><b id="cr-perkm">—</b></li>
      <li><span>同等里程打车每年</span><b id="cr-taxi-year">—</b></li>
      <li><span>打车 − 养车</span><b id="cr-diff">—</b></li>
      <li><span>持有期内总花费</span><b id="cr-life">—</b></li>
    </ul>
    <p class="hint" id="cr-note"></p>
  </div>
    </div>
  </section>
`,debtfree:`  <section class="panel" id="panel-debtfree">
    <div class="cols">
  <div class="card">
    <h2>输入（三笔债务，用不到的填 0）</h2>
    <label class="f"><span>第 1 笔：名称</span><span class="hint">车贷尾款</span></label>
    <label class="f"><span>余额（元）</span>
      <input id="df-bal1" type="number" inputmode="decimal" min="0" step="1000" value="15000"></label>
    <label class="f"><span>年利率（%）</span>
      <input id="df-rate1" type="number" inputmode="decimal" min="0" step="0.1" value="4"></label>
    <label class="f"><span>每月最低还款（元）</span>
      <input id="df-min1" type="number" inputmode="decimal" min="0" step="100" value="1200"></label>
    <label class="f"><span>第 2 笔：名称</span><span class="hint">信用卡</span></label>
    <label class="f"><span>余额（元）</span>
      <input id="df-bal2" type="number" inputmode="decimal" min="0" step="1000" value="50000"></label>
    <label class="f"><span>年利率（%）</span>
      <input id="df-rate2" type="number" inputmode="decimal" min="0" step="0.1" value="18"></label>
    <label class="f"><span>每月最低还款（元）</span>
      <input id="df-min2" type="number" inputmode="decimal" min="0" step="100" value="500"></label>
    <label class="f"><span>第 3 笔：名称</span><span class="hint">消费贷</span></label>
    <label class="f"><span>余额（元）</span>
      <input id="df-bal3" type="number" inputmode="decimal" min="0" step="1000" value="60000"></label>
    <label class="f"><span>年利率（%）</span>
      <input id="df-rate3" type="number" inputmode="decimal" min="0" step="0.1" value="9"></label>
    <label class="f"><span>每月最低还款（元）</span>
      <input id="df-min3" type="number" inputmode="decimal" min="0" step="100" value="800"></label>
    <label class="f"><span>每月额外能多还（元）</span>
      <input id="df-extra" type="number" inputmode="decimal" min="0" step="500" value="2000"></label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">高息优先，还清要</span><strong id="df-months">—</strong><span class="unit">个月</span></div>
    <ul class="kv">
      <li><span>欠款合计</span><b id="df-total">—</b></li>
      <li><span>每月实际投入（最低还款＋额外）</span><b id="df-permonth">—</b></li>
      <li><span>雪崩法（先还利率最高）总利息</span><b id="df-intA">—</b></li>
      <li><span>雪球法（先还金额最小）总利息</span><b id="df-intS">—</b></li>
      <li><span>雪崩法少付利息</span><b id="df-diff">—</b></li>
      <li><span>只还最低、一分不加</span><b id="df-minonly">—</b></li>
      <li><span>第一笔该先清掉</span><b id="df-first">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>债务</th><th>余额</th><th>利率</th><th>雪崩</th><th>雪球</th><th>利息</th></tr></thead>
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
    <h2>输入</h2>
    <label class="f"><span>现在欠多少（高息那边，元）</span>
      <input id="dm-bal" type="number" inputmode="decimal" min="0" step="1000" value="50000"></label>
    <label class="f"><span>现在这笔的年利率（%）</span>
      <input id="dm-old" type="number" inputmode="decimal" min="0" step="0.5" value="18"></label>
    <label class="f"><span>置换后的年利率（%）</span>
      <input id="dm-new" type="number" inputmode="decimal" min="0" step="0.5" value="7"></label>
    <label class="f"><span>置换手续费（按本金 %）</span>
      <input id="dm-fee" type="number" inputmode="decimal" min="0" step="0.5" value="2"></label>
    <label class="f"><span>每月能还多少（元）</span>
      <input id="dm-pay" type="number" inputmode="decimal" min="0" step="100" value="2500"></label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">置换后能省</span><strong id="dm-save">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>不置换：还清要</span><b id="dm-m1">—</b></li>
      <li><span>不置换：付的利息</span><b id="dm-t1">—</b></li>
      <li><span>置换后：还清要</span><b id="dm-m2">—</b></li>
      <li><span>置换后：付的利息</span><b id="dm-t2">—</b></li>
      <li><span>手续费（计入本金）</span><b id="dm-feeamt">—</b></li>
      <li><span>手续费率高到多少就不划算了</span><b id="dm-breakeven">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>手续费率</th><th>手续费</th><th>净省</th><th>结论</th></tr></thead>
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
    <h2>输入</h2>
    <label class="f"><span>账单日（每月的几号出账）</span>
      <input id="fp-bill" type="number" inputmode="decimal" min="1" max="28" step="1" value="5"></label>
    <label class="f"><span>还款日（每月的几号还钱）</span>
      <input id="fp-due" type="number" inputmode="decimal" min="1" max="28" step="1" value="25"></label>
    <label class="f"><span>计划刷多少（元，可留空）</span>
      <input id="fp-amount" type="number" inputmode="decimal" min="0" step="500" value="5000"></label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">今天刷，能免息用</span><strong id="fp-days">—</strong><span class="unit">天</span></div>
    <ul class="kv">
      <li><span>这笔钱算在哪期账单</span><b id="fp-billdate">—</b></li>
      <li><span>最晚哪天还</span><b id="fp-paydate">—</b></li>
      <li><span>最长能免息多少天</span><b id="fp-max">—</b></li>
      <li><span>最优刷卡日</span><b id="fp-best">—</b></li>
      <li><span>今天刷比最优差多少天</span><b id="fp-lost">—</b></li>
      <li><span>这笔钱如果按分期真实成本（年化 13.8%）</span><b id="fp-cost">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>消费日</th><th>算进账单</th><th>最晚还款</th><th>免息天数</th></tr></thead>
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
    <h2>输入</h2>
    <label class="f"><span>一年开多少公里</span>
      <input id="ev-km" type="number" inputmode="decimal" min="0" step="1000" value="15000"></label>
    <label class="f"><span>油车百公里油耗（L）</span>
      <input id="ev-oil" type="number" inputmode="decimal" min="0" step="0.5" value="8"></label>
    <label class="f"><span>油价（元/L）</span>
      <input id="ev-price" type="number" inputmode="decimal" min="0" step="0.1" value="8"></label>
    <label class="f"><span>电车百公里电耗（度）</span>
      <input id="ev-kwh" type="number" inputmode="decimal" min="0" step="0.5" value="15"></label>
    <label class="f"><span>电价（元/度，家充约 0.6、公充约 1.5）</span>
      <input id="ev-eprice" type="number" inputmode="decimal" min="0" step="0.1" value="0.6"></label>
    <label class="f"><span>油车落地价 / 电车落地价（元）</span>
      <div class="row">
        <input id="ev-p1" type="number" inputmode="decimal" min="0" step="5000" value="150000">
        <input id="ev-p2" type="number" inputmode="decimal" min="0" step="5000" value="180000">
      </div></label>
    <label class="f"><span>开几年 / 残值率（%）</span>
      <div class="row">
        <input id="ev-years" type="number" inputmode="decimal" min="1" max="20" step="1" value="8">
        <input id="ev-res1" type="number" inputmode="decimal" min="0" max="100" step="5" value="30">
        <input id="ev-res2" type="number" inputmode="decimal" min="0" max="100" step="5" value="25">
      </div></label>
    <label class="f"><span>每年保养（油/电，元）</span>
      <div class="row">
        <input id="ev-m1" type="number" inputmode="decimal" min="0" step="200" value="2000">
        <input id="ev-m2" type="number" inputmode="decimal" min="0" step="200" value="800">
      </div></label>
    <label class="f"><span>每年保险（油/电，元）</span>
      <div class="row">
        <input id="ev-i1" type="number" inputmode="decimal" min="0" step="500" value="4000">
        <input id="ev-i2" type="number" inputmode="decimal" min="0" step="500" value="5500">
      </div></label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">电车开满期比油车省</span><strong id="ev-diff">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>每年油费 / 电费</span><b id="ev-energy">—</b></li>
      <li><span>每年用车总成本（油 / 电）</span><b id="ev-year">—</b></li>
      <li><span>每公里（油 / 电）</span><b id="ev-perkm">—</b></li>
      <li><span>开满期总成本（油）</span><b id="ev-t1">—</b></li>
      <li><span>开满期总成本（电）</span><b id="ev-t2">—</b></li>
      <li><span>临界年里程（低于它油车更省）</span><b id="ev-crit">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>一年开</th><th>油车总成本</th><th>电车总成本</th><th>谁省</th></tr></thead>
        <tbody id="ev-body"></tbody>
      </table>
    </div>
    <p class="hint" id="ev-note"></p>
  </div>
    </div>
  </section>
`};export default{installment:nn,deal:an,card:en,fx:tn,split:ln,multi:sn,car:pn,debtfree:dn,debtmerge:on,freeperiod:rn,ev:cn};
