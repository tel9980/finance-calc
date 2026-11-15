var $=Object.defineProperty;var _=(a,s)=>$(a,"name",{value:s,configurable:!0});const{$:n,BACKUP_KEY:rn,BUILD_TAG:dn,CAT_KEY:on,CAT_LABEL:bn,CHUNK_FILES:cn,CHUNK_OF:un,CMP_KEY:mn,CORE_CALC:vn,CURS:hn,DEFERRED_TAPS:fn,DEMO_SAVED:yn,DIVISOR:xn,EDITED:gn,ERR_BOX:Cn,FAV_KEY:Mn,FIELDS:wn,FIRST_ACTIVATE:En,FREQ:Tn,FREQ_KEY:Sn,INSTALL_HIDE_KEY:_n,KEY:An,LAST_KEY:Rn,MONTH_CATS:Wn,MONTH_TABLE:kn,NEXT_OF:Nn,PALETTE_EL:Pn,PENDING_PARAMS:Fn,PRE_KEY:In,QUOTA_WARNED:Ln,RECENT_KEY:Dn,SAVE_TIMER:Kn,SCHEMA_KEY:Yn,SCHEMA_VERSION:Hn,SEARCH_KEY:On,SNAP_DROP_SEEN:Bn,SNAP_KEY:Un,SNAP_MAX:Vn,SNAP_PICK:Gn,STORED:Qn,TABS:Xn,TAB_NATURAL:jn,THEME_KEY:qn,TOAST_EL:Jn,TODAYBAR_KEY:zn,UNITS:$n,WF_ARCH_KEY:Zn,WF_AUTO_IDX:na,WF_AUTO_LIST:aa,WF_AUTO_STEP:ea,WF_AUTO_TIMER:ta,WF_CUSTNAME_KEY:sa,WF_CUST_KEY:la,WF_CUST_NAME:ia,WF_DONE:pa,WF_EDIT:ra,WF_EDIT_KEY:da,WF_KEY:oa,WF_LAST:ba,WF_LEGACY:ca,WF_MAN_KEY:ua,WF_MD:ma,WF_MD_FIELDS:va,WF_MD_KEY:ha,WF_MD_LINKS:fa,WF_META_KEY:ya,WF_MONTH_KEY:xa,WF_NOTE_KEY:ga,WF_NOTIFIED_KEY:Ca,WF_NOTIFY_KEY:Ma,WF_PATHS:wa,WF_ROLE_KEY:Ea,WF_ROLE_READY:Ta,WF_SKIP_KEY:Sa,WF_TASK_KEY:_a,WF_TEMPLATES:Aa,XL_ROWS:Ra,YEAR_TABLE:Wa,_onPanels:ka,a11yTouch:Na,activate:Pa,addMonths:Fa,annuityPV:Ia,annuityPayment:j,applyFilter:La,applyParams:Da,applyStoredTo:Ka,applyWfTpl:Ya,backupAgeDays:Ha,bindWfDnd:Oa,bindWfInline:Ba,bizAdd:Ua,bonusSoloTax:Va,buildLoanSchedule:Ga,buildShare:Qa,buildTabBadges:Xa,bumpFreq:ja,calcLoan:qa,calcMap:Ja,calcWorkflow:za,checkInputs:$a,clearWfMan:Za,closePalette:ne,cmpTabName:ae,cnUpper:ee,combineTax:te,convertTemp:se,copyText:le,cumulativeTax:ie,curCat:pe,currentSnap:re,demoFill:de,demoHint:oe,diagText:be,dlJson:ce,doInstall:ue,doPrint:me,drawMonthCats:ve,drawMonthStack:he,drawReportCharts:fe,drawRpMini:ye,drawnMonthlyChart:xe,drawnYearChart:ge,enhanceNums:Ce,enhancePanelUi:Me,ensureChunk:we,errHuman:Ee,evalExpr:Te,favList:Se,fillCmpMod:_e,fillMonthGrid:Ae,fillUnits:Re,flash:We,flushParams:ke,flushSave:Ne,fmt:K,fmtAt:Pe,fmtDate:Fe,fx:Ie,gauss:Le,getWfCust:De,getWfDone:Ke,getWfMan:Ye,getWfMeta:He,getWfNotes:Oe,getWfSkip:Be,hashTarget:Ue,inputIssue:Ve,installEvt:Ge,installHintHide:Qe,installHintOff:Xe,iosInstallTip:je,iosLike:qe,isFav:Je,lastName:ze,leftAfter:$e,linkTo:T,loadCmpA:Ze,loadSnaps:nt,loadWfArch:at,loadWfCust:et,loadWfDone:tt,loadWfEdit:st,loadWfMan:lt,loadWfMeta:it,loadWfNotes:pt,loadWfSkip:rt,loadWfTask:dt,loanRows:ot,makeSnap:bt,markBackup:ct,markBadInputs:ut,matchQ:mt,money:e,monthToDate:vt,monthlyIRR:ht,months:ft,npvDiff:yt,num:t,numBlur:xt,numFocus:gt,numInput:Ct,numKey:Mt,numOf:wt,openPalette:Et,orderTabsForQuery:Tt,palKey:St,panelEls:_t,panelParams:At,parseAmounts:Rt,parseDate:Wt,parseNum:kt,pct:i,percentile:Nt,plRank:Pt,plScoreCov:Ft,plScoreDsr:It,plScoreEmg:Lt,plScoreLev:Dt,plScoreSave:Kt,prePanels:Yt,prefetchAllChunks:Ht,presets:Ot,printCover:Bt,printSheet:Ut,psEsc:Vt,psInputs:Gt,psNotes:Qt,psResults:Xt,psText:jt,pushRecent:qt,pushSearch:Jt,pwaStandalone:zt,quickOf:$t,rateOf:Zt,readJsonFile:ns,readMonthGrid:as,recentList:es,recordWf:ts,refreshCounts:ss,refreshTableTools:ls,refreshTrackMods:is,refreshWfBadge:ps,renderLoanTable:rs,renderNext:ds,renderPalette:os,renderPresets:bs,renderSearchHist:cs,renderSnapCompare:us,renderSnapList:ms,renderTodayBar:vs,renderTrack:hs,renderWfTpl:fs,rentBuyAt:q,restore:ys,runCalc:xs,runDeferredTaps:gs,save:Cs,saveCmpA:Ms,saveFav:ws,savePresets:Es,saveSnaps:Ts,saveWfCust:Ss,savedCat:_s,schemaInit:As,schemaMigrate:Rs,scrollResultIfDeepLink:Ws,searchHist:ks,setCat:Ns,setSub:Ps,setTheme:Fs,shareCalc:Is,sharePayload:Ls,showErrorBox:Ds,showInstBar:Ks,showUpdateBar:Ys,snapNameOf:Hs,snapTipText:Os,snapshot:Bs,st0:Us,stamp:Vs,startName:Gs,syncInstallUi:Qs,tabCatLabel:Xs,tabScore:js,tap:qs,taxBy:Js,toast:zs,toggleWfStep:$s,trimNum:Zs,unitFor:nl,updShown:al,wfAllPaths:el,wfArchiveMonth:tl,wfArchivePut:sl,wfAutoNext:ll,wfAutoStop:il,wfAutoWalk:pl,wfBar:rl,wfBindCustQ:dl,wfBuildHandoff:ol,wfCarryMissing:bl,wfCarryQuery:cl,wfCarryWarn:ul,wfCsvCell:ml,wfCustNameSave:vl,wfDayDiff:hl,wfDetailRender:fl,wfEditPath:yl,wfEditReset:xl,wfEditSave:gl,wfEditToggle:Cl,wfFillCustSel:Ml,wfHandoff:wl,wfHandoffCopy:El,wfHandoffCsv:Tl,wfHandoffPrint:Sl,wfHasAnyData:_l,wfHideStep:Al,wfKnownMods:Rl,wfLegacyToNew:Wl,wfLoad:kl,wfManSave:Nl,wfMdHref:Pl,wfMdRender:Fl,wfMdSave:Il,wfMetaSave:Ll,wfMigrateLegacy:Dl,wfMonthKey:Kl,wfMonthRoll:Yl,wfMonthTouch:Hl,wfMoveStep:Ol,wfNoteSave:Bl,wfNotifyCheck:Ul,wfNotifyGranted:Vl,wfNotifyPref:Gl,wfNotifySend:Ql,wfNotifySetPref:Xl,wfNotifyStatus:jl,wfNotifyToggle:ql,wfOpenInline:Jl,wfOpenTasks:zl,wfPad2:$l,wfPathMods:Zl,wfPlaceInline:ni,wfPlaceNear:ai,wfProgress:ei,wfRenderSummary:ti,wfRoleSaved:si,wfScopedPaths:li,wfSet:ii,wfSkipCurrent:pi,wfSkipSave:ri,wfStepKey:di,wfStepShare:oi,wfStepState:bi,wfTaskAdd:ci,wfTaskBox:ui,wfTaskDel:mi,wfTaskPending:vi,wfTaskSave:hi,wfTaskToggle:fi,wfTodayPick:yi,wfTodayStr:xi,wfUnhideStep:gi,wfVisiblePaths:Ci,yuan:l,zOf:Mi}=window.FC;function Z(){var a=t(n("rb-price")),s=Math.max(1,t(n("rb-hold"))),o=t(n("rb-growth"))/100;if(a<=0){["rb-diff","rb-buy-net","rb-rent-net","rb-loan","rb-monthly","rb-house","rb-breakeven"].forEach(function(x){n(x).textContent="—"}),n("rb-note").textContent="填房价后自动比较。";return}var b=q(o),m=b.buyNet-b.rentNet;n("rb-diff-label").textContent=K(s,0)+" 年后：买房比租房"+(m>=0?"多":"少"),n("rb-diff").textContent=e(Math.abs(m)),n("rb-buy-net").textContent=l(b.buyNet),n("rb-rent-net").textContent=l(b.rentNet),n("rb-loan").textContent=e(b.down)+" / "+e(b.loan)+" 元",n("rb-monthly").textContent=e(b.pay)+" / "+e(t(n("rb-rent")))+" / "+e(b.pay+t(n("rb-cost"))/12-t(n("rb-rent")))+" 元",n("rb-house").textContent=l(b.houseValue);for(var c=-.3,d=.3,f,p=0;p<80;p++)f=(c+d)/2,q(f).buyNet-q(f).rentNet<0?c=f:d=f;n("rb-breakeven").textContent=i((c+d)/2);var u="口径：买房期末净资产 = 期末房价 − 剩余贷款；租房期末资产 = 首付按理财年化滚 "+K(s,0)+" 年 + 每月(月供+持有成本−租金)的差额同样拿去理财。两边都不算契税、中介费、装修和卖房税费，所以真实结论通常比这里更偏向租房一点。";u+=m>=0?" 当前假设下买房更划算，主要看房价涨幅能不能撑住：房价年涨幅低于 "+i((c+d)/2)+" 时结论会翻转。":" 当前假设下租房更划算：首付和月供差额拿去理财的钱，比房子升值加上省下的租金更多。把「房价年涨幅」调到 "+i((c+d)/2)+" 以上才反超。",n("rb-note").textContent=u,n("rb-links")&&(n("rb-links").innerHTML="接着算："+T("housecash",{"hcx-price":a},"签字当天要备多少现金")+T("rentyield",{"ry-price":a,"ry-rent":t(n("rb-rent"))},"从房东视角看租售比")+T("deed",{"dd-price":a},"二手房税费多少")+T("budget",{"bg-cash":t(n("rb-price"))*t(n("rb-down"))/100},"这个首付能撑多贵的房"))}_(Z,"calcRentBuy");function nn(){var a=Math.max(0,t(n("dd-price"),0)),s=Math.max(0,t(n("dd-deed"),1))/100,o=n("dd-hold").value,b=Math.max(0,t(n("dd-vat"),5.3))/100,m=n("dd-income-tax").value,c=Math.max(0,t(n("dd-agent"),2))/100,d=Math.max(0,t(n("dd-other"),0)),f=Math.max(0,t(n("dd-cost"),0)),p=a*s,u=a*c,x=o==="0"?a*b:0,M=Math.max(0,a-f),g=m==="0"?0:m==="20"?M*.2:a*.01,r=p+u+x+g+d,y=a+p+u+d;n("dd-deed-amt").textContent=l(p),n("dd-agent-amt").textContent=l(u),n("dd-vat-amt").textContent=x>0?l(x):"免征",n("dd-it-amt").textContent=m==="0"?"免征":l(g)+(m==="20"?"（差额 "+e(M)+" × 20%）":"（成交价 × 1%）"),n("dd-other-amt").textContent=l(d),n("dd-total").textContent=e(r),n("dd-buyer").textContent=l(y),n("dd-ratio").textContent=a>0?i(r/a,2):"—";var v=n("dd-first").value,h=t(n("dd-area"),0),C=v==="1"?h>0&&h<=90?"1%（首套 90㎡ 及以下）":"1.5%（首套 90㎡ 以上）":v==="2"?"1%–2%（二套，各地不同）":"3% 起（三套及以上）";n("dd-note").textContent="按你填的「第 "+v+" 套 / "+(h>0?h+"㎡":"面积未填")+"」，契税常见税率是 "+C+"，当前按 "+i(s,2)+" 计算。税费是「谁名下、第几套、面积多大、持有几年」四个变量一起决定的，这里按最常见的规则估算：契税由买方交（税率自己填，首套 90㎡ 及以下多为 1%、90㎡ 以上 1.5%，二套各地 1%–2%，三套起常按 3%）；增值税及附加在持有满 2 年时免征（北上广深非普通住宅另有规定），不满 2 年按全额约 5.3% 计；个税「满五唯一」免征，否则按核定 1% 或差额 20% 计（能提供原值凭证才可走差额）。中介费一般由买方承担（可谈），其他杂费含评估、登记、公证、贷款服务费等。实际以当地税务核定为准，签约前让中介出一份税费清单。"}_(nn,"calcDeed");function an(){var a=Math.max(0,t(n("sv-price"),0)),s=Math.max(0,t(n("sv-loan"),0)),o=Math.max(0,t(n("sv-vat"),0))/100,b=Math.max(0,t(n("sv-it"),0))/100,m=Math.max(0,t(n("sv-agent"),0))/100,c=Math.max(0,t(n("sv-other"),0))/100,d=Math.max(0,t(n("sv-new"),0)),f=Math.min(100,Math.max(0,t(n("sv-down"),30)))/100,p=Math.max(0,t(n("sv-rate"),0))/100,u=Math.max(1,Math.min(40,Math.round(t(n("sv-years"),30)))),x=a*o,M=a*b,g=a*m,r=a*c,y=x+M+g+r,v=a-s-y,h=d*f,C=h-v,w=Math.max(0,d-h),E=j(w,p/12,u*12);n("sv-net").textContent=e(v),n("sv-tax").textContent=l(y),n("sv-vat-amt").textContent=l(x),n("sv-it-amt").textContent=l(M),n("sv-agent-amt").textContent=l(g),n("sv-other-amt").textContent=l(r),n("sv-tax-ratio").textContent=a>0?i(y/a,2):"—",n("sv-dpay").textContent=l(h),n("sv-gap").textContent=C>0?"还差 "+e(C)+" 元":"结余 "+e(-C)+" 元",n("sv-nloan").textContent=l(w),n("sv-mpay").textContent=w>0?l(E)+" / 月（"+u*12+" 期）":"全款，无月供",n("sv-note").textContent="卖房到手 = 成交价 "+e(a)+" − 剩余贷款 "+e(s)+"（必须先还清解押）− 卖方税费 "+e(y)+" = "+e(v)+"。 换新房首付 "+e(h)+"，"+(C>0?"净额不够，还需再筹 "+e(C)+" 元":"净额还有 "+e(-C)+" 元结余，可补贴税费或装修")+"；新贷 "+e(w)+"、按 "+i(p,2)+" 贷 "+u+" 年，月供 "+e(E)+"。 实操注意：先卖后买要安排好过渡住处，先买后卖则要看首套/二套认定（多地「认房又认贷」，旧房未过户可能被算二套，首付比例和利率都会上去）；新房还有契税、维修基金、装修等一次性支出，别忘了在结余里扣掉。"}_(an,"calcSell");function en(){for(var a=Math.max(0,t(n("ry-price"),0)),s=Math.max(0,t(n("ry-rent"),0)),o=Math.min(100,Math.max(0,t(n("ry-down"),30)))/100,b=Math.max(0,t(n("ry-rate"),0))/100,m=Math.max(1,Math.min(40,Math.round(t(n("ry-years"),30)))),c=Math.max(1,Math.min(40,Math.round(t(n("ry-hold"),10)))),d=t(n("ry-growth"),0)/100,f=t(n("ry-rgrowth"),0)/100,p=Math.max(0,t(n("ry-cost"),0)),u=Math.min(60,Math.max(0,t(n("ry-vac"),0)))/100,x=a*(1-o),M=b/12,g=m*12,r=j(x,M,g),y=s*12*(1-u),v=a>0?s*12/a:0,h=a>0?y/a:0,C=a>0?(y-p)/a:0,w=c*12,E=[-a*o],S=x,B=0,Y=a*o,P=0,H=0,W=1;W<=w;W++){var U=S*M,V=Math.min(S,r-U);S-=V;var O=s*Math.pow(1+f,Math.floor((W-1)/12)),k=O*(1-u)-r-p/12;B+=O*(1-u),k<0&&(Y+=-k),W===w&&(H=S,P=a*Math.pow(1+d,c)-S,k+=P),E.push(k)}for(var F=_(function(N){for(var J=0,z=1,X=0;X<E.length;X++)z*=1+N,J+=E[X]/z;return J},"npv"),I=-.9,L=1,A=0;A<120;A++){var D=(I+L)/2;F(D)>0?I=D:L=D}var R=(I+L)/2,G=(Math.pow(1+R,12)-1)*100;n("ry-irr").textContent=K(G,2),n("ry-ratio").textContent=i(v,2),n("ry-eff").textContent=i(h,2),n("ry-net").textContent=i(C,2),n("ry-pay").textContent=l(r)+" / 月",n("ry-cash").textContent=l(s-r-p/12)+" / 月",n("ry-price-end").textContent=l(a*Math.pow(1+d,c)),n("ry-loan-end").textContent=l(H),n("ry-rent-sum").textContent=l(B),n("ry-invest").textContent=l(Y),n("ry-exit").textContent=l(P);var Q="租售比 = 年租金 "+e(s*12)+" ÷ 房价 "+e(a)+" = "+i(v,2)+"，扣掉 "+i(u,0)+" 空置/欠租后 "+i(h,2)+"，再扣年持有成本 "+e(p)+" 后只有 "+i(C,2)+"。 国际经验把 3%–5% 当合理区间，1.5%–2% 意味着「靠租金回本要 50 年以上」，这种房子买的是涨价预期、不是租金现金流。 上面的年化 "+K(G,2)+"% 是加杠杆后的股东回报（首付 "+e(a*o)+"、月供 "+e(r)+"、持有 "+c+" 年按房价每年 "+i(d,1)+"、租金每年 "+i(f,1)+" 卖出），"+(s-r-p/12<0?"并且已经算进每月还要自己再掏 "+e(r+p/12-s)+" 元的负现金流。":"并且已经算进每月净收 "+e(s-r-p/12)+" 元的正现金流。")+" 没算契税/中介/装修/卖房税费和空置期的物业费；房价涨幅是最大的变量——把年涨幅调到 0% 再看这个数，就知道租金能不能单独撑起这笔投资。";n("ry-note").textContent=Q,n("ry-links")&&(n("ry-links").innerHTML="接着算："+T("rentbuy",{"rb-price":a,"rb-rent":s},"换成租客视角比一比")+T("housecash",{"hcx-price":a},"这套房签字要备多少现金")+T("rentup",{"ru-cur":s},"涨租多少值得搬家"))}_(en,"calcRentYield");function tn(){var a=Math.max(0,t(n("bg-income"),0)),s=Math.max(0,t(n("bg-cash"),0)),o=Math.min(95,Math.max(0,t(n("bg-down"),30)))/100,b=Math.max(0,t(n("bg-rate"),0))/100,m=Math.max(1,Math.min(40,t(n("bg-years"),30))),c=Math.min(80,Math.max(5,t(n("bg-ratio"),40)))/100,d=Math.max(0,t(n("bg-fee"),5))/100,f=Math.round(m*12),p=b/12,u=a*c,x=Math.pow(1+p,f),M=p===0?u*f:u*(1-1/x)/p,g=o<1?M/(1-o):0,r=o+d>0?s/(o+d):0,y=Math.min(g,r),v=y*(1-o),h=y*o,C=y*d,w=j(v,p,f),E=a>0?w/a:0;if(n("bg-total").textContent=e(y),n("bg-paycap").textContent=l(u)+"（收入 "+i(c,0)+"）",n("bg-loancap").textContent=l(M),n("bg-byPay").textContent=l(g),n("bg-byCash").textContent=l(r),n("bg-bottle").textContent=r<=g?"现金（凑首付＋税费）":"月供（收入不够撑）",n("bg-downamt").textContent=l(h)+"（"+i(o,0)+"）",n("bg-feeamt").textContent=l(C)+"（"+i(d,1)+"）",n("bg-loan").textContent=l(v)+" / "+l(w),n("bg-share").textContent=i(E,1),n("bg-int").textContent=l(w*f-v),a<=0||s<=0){n("bg-note").textContent="先把家庭月收入和可动用的现金填上，再看能承受多贵的房子。";return}var S="两个约束同时存在，谁先顶住谁说了算：按收入，"+i(c,0)+" 的月供上限是 "+e(u)+" 元/月，在 "+K(b*100,2)+"%、"+m+" 年下最多贷 "+e(M)+" 元，反推总价上限 "+e(g)+" 元；按现金，扣掉 "+i(o,0)+" 首付和 "+i(d,1)+" 税费装修，总价上限 "+e(r)+" 元。 取小的那个，你能承受的总价是 "+e(y)+" 元，卡在「"+(r<=g?"现金":"月供")+"」这一边。"+(r<=g?" 也就是说，你的收入其实还能撑更贵的房子，是首付和税费的现金不够。":" 也就是说，你的现金够，是收入撑不起更高的月供——这条更该尊重，别为了买大房把月供顶到收入的 50% 以上。")+" 还有三笔钱必须提前留在手里，否则会非常被动：① 契税、增值税、中介费、维修基金（二手房还有卖方税费的谈判空间）； ② 装修与家电，通常占房价 8%–15%，二手房更高；③ 至少 6 个月月供的应急金， 因为交房后最脆弱的时刻就是「首付掏空＋装修超支」的那半年。 另外提醒：月供占比 40% 已经偏紧，30% 以内才叫舒服（银行审批常按 50% 流水，但那是它的风控线，不是你的生活线）； 如果只能靠「30 年 + 顶格月供」才买得起，说明这个价位对你的现金流太薄了，先租一段时间或者买小一点，比硬扛更划算。";n("bg-note").textContent=S}_(tn,"calcBudget");function sn(){var a=Math.max(0,t(n("ru-cur"),0)),s=Math.max(0,t(n("ru-new"),0)),o=Math.max(0,t(n("ru-cost"),0)),b=Math.max(0,t(n("ru-alt"),0)),m=Math.max(.5,Math.min(20,t(n("ru-years"),3))),c=Math.max(0,s-a)*12,d=Math.max(0,s-a)*12*m,f=Math.max(0,b-a)*12*m+o,p=d-f,u=s-b,x=u>0?o/u:1/0;n("ru-diff").textContent=(p>=0?"":"-")+e(Math.abs(p)),n("ru-stayyear").textContent=l(c),n("ru-stay").textContent=l(d)+"（"+m+" 年）",n("ru-move").textContent=l(f)+"（"+m+" 年）",n("ru-breakeven").textContent=u>0?x===1/0?"—":x.toFixed(1)+" 个月":"新房租不比涨后便宜，怎么搬都亏",n("ru-line").textContent=a>0?i((s-a)/a,1)+"（涨到 "+e(s)+" 元）":"—";var M=n("ru-body");M.innerHTML="";for(var g=[1,2,3,5,8],r=0;r<g.length;r++){var y=g[r],v=Math.max(0,s-a)*12*y,h=Math.max(0,b-a)*12*y+o,C=document.createElement("tr");C.innerHTML="<td>"+y+" 年</td><td>"+e(v)+"</td><td>"+e(h)+"</td><td>"+(v>h?"搬走省 "+e(v-h):"留下省 "+e(h-v))+"</td>",M.appendChild(C)}var w="房东把房租从 "+e(a)+" 元涨到 "+e(s)+" 元（涨 "+i(a>0?(s-a)/a:0,1)+"）， 接受的话每年多付 "+e(c)+" 元。搬家在别处租 "+e(b)+" 元、一次性花 "+e(o)+" 元， 两条路比到 "+m+" 年：留下多付 "+e(d)+" 元，搬走多付 "+e(f)+" 元，"+(p>=0?"所以搬走更省 "+e(p)+" 元。":"所以留下更省 "+e(-p)+" 元，别折腾。");u>0&&(w+=" 临界点是住满 "+x.toFixed(1)+" 个月：住得比这更久，搬家的固定成本就摊薄了；住不到就该忍下这次涨价。"),w+=" 搬家成本别只算力气钱：中介费通常半个月到一个月房租、押金可能被扣、宽带移机、通勤变远的时间和交通费—— 一线城市一次搬家真实成本常在 5,000–10,000 元，很多人为了省 200 元/月搬家，结果一年才勉强回本。 另外议价时可以直接拿「同地段同户型现在租多少」跟房东谈，行情在跌的时候，房东宁可少涨也不愿空置一个月。",n("ru-note").textContent=w}_(sn,"calcRentUp");function ln(){var a=Math.max(0,t(n("hcx-price"),0)),s=Math.min(100,Math.max(0,t(n("hcx-dp"),30)))/100,o=Math.max(0,t(n("hcx-deed"),1.5))/100,b=Math.max(0,t(n("hcx-agent"),2))/100,m=Math.max(0,t(n("hcx-fund"),1))/100,c=Math.max(0,t(n("hcx-odd"),0)),d=Math.max(0,t(n("hcx-deco"),0)),f=Math.max(0,t(n("hcx-furn"),0)),p=Math.max(0,t(n("hcx-move"),0)),u=Math.max(0,t(n("hcx-need"),0)),x=Math.max(0,t(n("hcx-cash"),0)),M=a*s,g=a*o,r=a*b,y=a*m,v=M+g+r+y+c,h=d+f+p,C=u*6,w=v+h+C,E=x-w,S=x-v,B=a>0?(v+h)/a:0,Y=s+o+b+m,P=Y>0?Math.max(0,(x-c-h-C)/Y):0,H=n("hcx-big");H&&(H.textContent=K(v));var W=n("hcx-dpout");W&&(W.textContent=e(M)+" 元（"+i(s,0)+"）");var U=n("hcx-tax");U&&(U.textContent=e(g+r+y+c)+" 元（占房价 "+(a>0?i((g+r+y+c)/a,1):"—")+"）");var V=n("hcx-live");V&&(V.textContent=e(h)+" 元");var O=n("hcx-emg");O&&(O.textContent=e(C)+" 元");var k=n("hcx-ratio");k&&(k.textContent=i(B,1)+"（首付＋税费＋装修）");var F=n("hcx-enough");F&&(E>=0?F.textContent="够，还剩 "+e(E)+" 元":S>=0?F.textContent="签字够，装修缺口 "+e(-E)+" 元":F.textContent="不够，签字就缺 "+e(-S)+" 元");var I=n("hcx-cap");I&&(I.textContent=e(P)+" 元（保留 6 个月应急金后）");var L=n("hcx-body");if(L){for(var A=[["首付",i(s,0)+" × 成交价",M],["契税",i(o,2)+" × 成交价",g],["中介费",i(b,2)+" × 成交价",r],["维修基金",i(m,2)+" × 成交价",y],["评估/公证/工本","定额",c],["装修","定额",d],["家具家电","定额",f],["搬家杂费","定额",p],["应急金","6 × 月必需",C],["合计","签字＋入住＋缓冲",w]],D="",R=0;R<A.length;R++){var G=R===A.length-1;D+="<tr"+(G?' class="c-soft"':"")+'><td class="tal">'+A[R][0]+'</td><td class="tal">'+A[R][1]+"</td><td>"+e(A[R][2])+"</td></tr>"}L.innerHTML=D}var Q=n("hcx-note");if(Q){var N=[];N.push("签字当天要付 "+e(v)+" 元（首付＋税费），加上装修家具搬家 "+e(h)+" 元和 6 个月应急金 "+e(C)+" 元，一共 "+e(w)+" 元。"),E<0&&N.push("按现在的现金还差 "+e(-E)+" 元：要么降总价到 "+e(P)+" 元以内，要么延后装修（装修通常在交房后 3–6 个月才花）。"),N.push("容易被漏掉的三笔：契税（按成交价，首套 90㎡ 以下常为 1%、以上 1.5%）、中介费（通常买方 1–2%）、维修基金（多为每平米几十元或房价 1% 上下）。"),N.push("二手房还可能涉及增值税与个税（满五唯一可免），本表未单列，可把金额并入「评估/公证/工本」。"),Q.textContent=N.join(" ")}n("hcx-links")&&(n("hcx-links").innerHTML="接着算："+T("deed",{"dd-price":a},"二手房税费细算")+T("rentbuy",{"rb-price":a},"买还是租")+T("budget",{"bg-cash":x},"这个现金能买多贵")+T("planner",{"pl-price":a},"买完这套之后的体检"))}_(ln,"calcHouseCash");export const PANELS={housecash:`  <section class="panel" id="panel-housecash">
    <div class="cols">
      <div class="card">
        <h2>输入：这套房从签字到住进去要花多少现金</h2>
        <span class="row">
          <label class="f"><span>成交价</span><input id="hcx-price" type="number" inputmode="decimal" min="0" step="10000" value="2000000"></label>
          <label class="f"><span>首付比例 %</span><input id="hcx-dp" type="number" inputmode="decimal" min="0" max="100" step="1" value="30"></label>
        </span>
        <span class="row">
          <label class="f"><span>契税 %（占成交价）</span><input id="hcx-deed" type="number" inputmode="decimal" min="0" max="10" step="0.5" value="1.5"></label>
          <label class="f"><span>中介费 %（占成交价）</span><input id="hcx-agent" type="number" inputmode="decimal" min="0" max="10" step="0.5" value="2"></label>
        </span>
        <span class="row">
          <label class="f"><span>维修基金 %（占成交价）</span><input id="hcx-fund" type="number" inputmode="decimal" min="0" max="5" step="0.5" value="1"></label>
          <label class="f"><span>评估/公证/工本等（元）</span><input id="hcx-odd" type="number" inputmode="decimal" min="0" step="500" value="5000"></label>
        </span>
        <span class="row">
          <label class="f"><span>装修（元）</span><input id="hcx-deco" type="number" inputmode="decimal" min="0" step="10000" value="200000"></label>
          <label class="f"><span>家具家电（元）</span><input id="hcx-furn" type="number" inputmode="decimal" min="0" step="5000" value="80000"></label>
        </span>
        <span class="row">
          <label class="f"><span>搬家/杂费（元）</span><input id="hcx-move" type="number" inputmode="decimal" min="0" step="1000" value="10000"></label>
          <label class="f"><span>月必需支出（算应急金）</span><input id="hcx-need" type="number" inputmode="decimal" min="0" step="500" value="10000"></label>
        </span>
        <label class="f"><span>现有现金（元）</span><input id="hcx-cash" type="number" inputmode="decimal" min="0" step="10000" value="900000"></label>
        <em>口径：契税按成交价×税率估算（首套 90㎡ 以下常为 1%、以上 1.5%，二套更高，以当地为准）；中介费、维修基金各地差异大；二手房还有增值税/个税（满五唯一可免），此处未单列，可并进「税费」。</em>
      </div>
      <div class="card res">
        <h2>结果：签字前要准备多少钱</h2>
        <div class="big"><span class="k">签字前现金总需求</span><strong id="hcx-big">—</strong><span class="unit">元</span></div>
        <ul class="kv">
          <li><span>首付</span><b id="hcx-dpout">—</b></li>
          <li><span>税费（契税＋中介＋基金＋杂费）</span><b id="hcx-tax">—</b></li>
          <li><span>装修家具搬家</span><b id="hcx-live">—</b></li>
          <li><span>建议留的应急金（6 个月）</span><b id="hcx-emg">—</b></li>
          <li><span>一次性支出占房价</span><b id="hcx-ratio">—</b></li>
          <li><span>现金够不够</span><b id="hcx-enough">—</b></li>
          <li><span>能承受的最高成交价</span><b id="hcx-cap">—</b></li>
        </ul>
        <div class="tablebox">
          <table>
            <thead><tr><th class="tal">项目</th><th>算法</th><th>金额</th></tr></thead>
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
    <h2>输入</h2>
    <label class="f">
      <span>房价（元）</span>
      <input id="rb-price" type="number" inputmode="decimal" min="0" step="50000" value="2000000">
    </label>
    <label class="f">
      <span>首付比例（%）</span>
      <input id="rb-down" type="number" inputmode="decimal" min="0" max="100" step="5" value="30">
    </label>
    <label class="f">
      <span>房贷年利率（%）</span>
      <input id="rb-rate" type="number" inputmode="decimal" min="0" step="0.05" value="3.1">
    </label>
    <label class="f">
      <span>贷款年限（年）</span>
      <input id="rb-years" type="number" inputmode="decimal" min="0" step="5" value="30">
    </label>
    <label class="f">
      <span>同地段月租金（元）</span>
      <input id="rb-rent" type="number" inputmode="decimal" min="0" step="500" value="4000">
    </label>
    <label class="f">
      <span>打算持有几年后比较</span>
      <input id="rb-hold" type="number" inputmode="decimal" min="1" step="1" value="10">
    </label>
    <label class="f">
      <span>房价年涨幅（%）</span>
      <input id="rb-growth" type="number" inputmode="decimal" step="0.5" value="2">
    </label>
    <label class="f">
      <span>租金年涨幅（%）</span>
      <input id="rb-rgrowth" type="number" inputmode="decimal" step="0.5" value="3">
    </label>
    <label class="f">
      <span>理财年化（%）（首付和差额的钱）</span>
      <input id="rb-invest" type="number" inputmode="decimal" step="0.5" value="2.5">
    </label>
    <label class="f">
      <span>每年持有成本（物业+维修+取暖等，元）</span>
      <input id="rb-cost" type="number" inputmode="decimal" min="0" step="500" value="5000">
    </label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big">
      <span class="k" id="rb-diff-label">十年后净资产差</span>
      <strong id="rb-diff">—</strong>
      <span class="unit">元</span>
    </div>
    <ul class="kv">
      <li><span>买房：期末净资产（房产 − 剩余贷款）</span><b id="rb-buy-net">—</b></li>
      <li><span>租房：期末资产（首付+差额去理财）</span><b id="rb-rent-net">—</b></li>
      <li><span>首付 / 贷款</span><b id="rb-loan">—</b></li>
      <li><span>月供 / 月租金 / 月差额</span><b id="rb-monthly">—</b></li>
      <li><span>期末房子值多少</span><b id="rb-house">—</b></li>
      <li><span>临界房价年涨幅（低于它租房更划算）</span><b id="rb-breakeven">—</b></li>
    </ul>
    <p class="hint" id="rb-note"></p>
        <p class="jump" id="rb-links"></p>
  </div>
    </div>
  </section>
`,deed:`  <section class="panel" id="panel-deed">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>成交价 / 网签价（元）</span>
      <input id="dd-price" type="number" inputmode="decimal" min="0" step="50000" value="2000000">
    </label>
    <label class="f">
      <span>建筑面积（㎡）</span>
      <input id="dd-area" type="number" inputmode="decimal" min="0" step="5" value="90">
    </label>
    <label class="f">
      <span>买方第几套</span>
      <select id="dd-first">
        <option value="1" selected>首套</option>
        <option value="2">二套</option>
        <option value="3">三套及以上</option>
      </select>
    </label>
    <label class="f">
      <span>契税税率（%）</span>
      <input id="dd-deed" type="number" inputmode="decimal" min="0" step="0.5" value="1">
      <em>首套 90㎡ 及以下多为 1%，90㎡ 以上 1.5%；二套多为 1%–2%，以当地为准</em>
    </label>
    <label class="f">
      <span>卖方持有年限</span>
      <select id="dd-hold">
        <option value="2" selected>满 2 年（免增值税）</option>
        <option value="0">不满 2 年（要交增值税）</option>
      </select>
    </label>
    <label class="f">
      <span>增值税及附加税率（%）</span>
      <input id="dd-vat" type="number" inputmode="decimal" min="0" step="0.1" value="5.3">
    </label>
    <label class="f">
      <span>卖方个税</span>
      <select id="dd-income-tax">
        <option value="1" selected>核定征收 1%（按成交价）</option>
        <option value="0">满五唯一，免征</option>
        <option value="20">差额 20%</option>
      </select>
    </label>
    <label class="f">
      <span>中介费率（%）</span>
      <input id="dd-agent" type="number" inputmode="decimal" min="0" step="0.5" value="2">
    </label>
    <label class="f">
      <span>其他杂费（评估/登记/公证等，元）</span>
      <input id="dd-other" type="number" inputmode="decimal" min="0" step="500" value="2000">
    </label>
    <label class="f">
      <span>卖方原购房价（元，算差额个税用）</span>
      <input id="dd-cost" type="number" inputmode="decimal" min="0" step="50000" value="1200000">
    </label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big">
      <span class="k">税费合计</span>
      <strong id="dd-total">—</strong>
      <span class="unit">元</span>
    </div>
    <ul class="kv">
      <li><span>契税（买方）</span><b id="dd-deed-amt">—</b></li>
      <li><span>中介费</span><b id="dd-agent-amt">—</b></li>
      <li><span>增值税及附加（卖方）</span><b id="dd-vat-amt">—</b></li>
      <li><span>个税（卖方）</span><b id="dd-it-amt">—</b></li>
      <li><span>其他杂费</span><b id="dd-other-amt">—</b></li>
      <li><span>买方要准备（房款+买方税费）</span><b id="dd-buyer">—</b></li>
      <li><span>税费占成交价</span><b id="dd-ratio">—</b></li>
    </ul>
    <p class="hint" id="dd-note"></p>
  </div>
    </div>
  </section>
`,sell:`  <section class="panel" id="panel-sell">
    <div class="cols">
  <div class="card">
    <h2>卖旧房</h2>
    <label class="f">
      <span>现房成交价（元）</span>
      <input id="sv-price" type="number" inputmode="decimal" min="0" step="10000" value="2000000">
    </label>
    <label class="f">
      <span>剩余贷款本金（元）</span>
      <input id="sv-loan" type="number" inputmode="decimal" min="0" step="10000" value="800000">
    </label>
    <label class="f">
      <span>增值税及附加（%，满 2 年多为 0）</span>
      <input id="sv-vat" type="number" inputmode="decimal" min="0" step="0.1" value="0">
    </label>
    <label class="f">
      <span>个人所得税（%，满五唯一为 0）</span>
      <input id="sv-it" type="number" inputmode="decimal" min="0" step="0.1" value="1">
    </label>
    <label class="f">
      <span>中介费（%）</span>
      <input id="sv-agent" type="number" inputmode="decimal" min="0" step="0.1" value="2">
    </label>
    <label class="f">
      <span>其他卖方费用（%，评估/担保等）</span>
      <input id="sv-other" type="number" inputmode="decimal" min="0" step="0.1" value="0.3">
    </label>
    <h2 class="sub">换新房</h2>
    <label class="f">
      <span>新房总价（元）</span>
      <input id="sv-new" type="number" inputmode="decimal" min="0" step="10000" value="3000000">
    </label>
    <label class="f">
      <span>首付比例（%）</span>
      <input id="sv-down" type="number" inputmode="decimal" min="0" max="100" step="1" value="30">
    </label>
    <label class="f">
      <span>新贷款利率（年，%）</span>
      <input id="sv-rate" type="number" inputmode="decimal" min="0" step="0.05" value="3.1">
    </label>
    <label class="f">
      <span>新贷款年限（年）</span>
      <input id="sv-years" type="number" inputmode="numeric" min="1" max="40" step="1" value="30">
    </label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big">
      <span class="k">卖房到手净额</span>
      <strong id="sv-net">—</strong>
      <span class="unit">元</span>
    </div>
    <ul class="kv">
      <li><span>卖方税费合计</span><b id="sv-tax">—</b></li>
      <li><span>其中增值税及附加</span><b id="sv-vat-amt">—</b></li>
      <li><span>其中个人所得税</span><b id="sv-it-amt">—</b></li>
      <li><span>其中中介费</span><b id="sv-agent-amt">—</b></li>
      <li><span>其中其他费用</span><b id="sv-other-amt">—</b></li>
      <li><span>税费占成交价</span><b id="sv-tax-ratio">—</b></li>
      <li><span>新房首付需要</span><b id="sv-dpay">—</b></li>
      <li><span>资金缺口（负数即结余）</span><b id="sv-gap">—</b></li>
      <li><span>新贷款金额</span><b id="sv-nloan">—</b></li>
      <li><span>新贷款月供</span><b id="sv-mpay">—</b></li>
    </ul>
    <p class="hint" id="sv-note"></p>
  </div>
    </div>
  </section>
`,rentyield:`  <section class="panel" id="panel-rentyield">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f">
      <span>房子总价（元）</span>
      <input id="ry-price" type="number" inputmode="decimal" min="0" step="10000" value="2000000">
    </label>
    <label class="f">
      <span>月租金（元）</span>
      <input id="ry-rent" type="number" inputmode="decimal" min="0" step="100" value="4000">
    </label>
    <label class="f">
      <span>首付比例（%）</span>
      <input id="ry-down" type="number" inputmode="decimal" min="0" max="100" step="5" value="30">
    </label>
    <label class="f">
      <span>贷款利率（年，%）</span>
      <input id="ry-rate" type="number" inputmode="decimal" min="0" step="0.05" value="3.1">
    </label>
    <label class="f">
      <span>贷款年限（年）</span>
      <input id="ry-years" type="number" inputmode="numeric" min="1" max="40" step="1" value="30">
    </label>
    <label class="f">
      <span>持有年限（年）</span>
      <input id="ry-hold" type="number" inputmode="numeric" min="1" max="40" step="1" value="10">
    </label>
    <label class="f">
      <span>房价年涨幅（%）</span>
      <input id="ry-growth" type="number" inputmode="decimal" min="-20" max="30" step="0.5" value="2">
    </label>
    <label class="f">
      <span>租金年涨幅（%）</span>
      <input id="ry-rgrowth" type="number" inputmode="decimal" min="-20" max="30" step="0.5" value="3">
    </label>
    <label class="f">
      <span>年持有成本（元，物业+维修+保险）</span>
      <input id="ry-cost" type="number" inputmode="decimal" min="0" step="500" value="6000">
    </label>
    <label class="f">
      <span>空置与欠租（% 年租金）</span>
      <input id="ry-vac" type="number" inputmode="decimal" min="0" max="60" step="1" value="5">
    </label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big">
      <span class="k">持有到期年化收益（IRR）</span>
      <strong id="ry-irr">—</strong>
      <span class="unit">%</span>
    </div>
    <ul class="kv">
      <li><span>租售比（年租金 ÷ 房价）</span><b id="ry-ratio">—</b></li>
      <li><span>扣空置后的有效租金回报</span><b id="ry-eff">—</b></li>
      <li><span>再扣持有成本的净回报</span><b id="ry-net">—</b></li>
      <li><span>月供</span><b id="ry-pay">—</b></li>
      <li><span>每月现金流（租金 − 月供 − 成本）</span><b id="ry-cash">—</b></li>
      <li><span>持有期末房价</span><b id="ry-price-end">—</b></li>
      <li><span>期末剩余贷款</span><b id="ry-loan-end">—</b></li>
      <li><span>累计净租金收入</span><b id="ry-rent-sum">—</b></li>
      <li><span>累计自掏现金（首付+补贴月供）</span><b id="ry-invest">—</b></li>
      <li><span>期末卖出到手（扣贷款）</span><b id="ry-exit">—</b></li>
    </ul>
    <p class="hint" id="ry-note"></p>
        <p class="jump" id="ry-links"></p>
  </div>
    </div>
  </section>
`,budget:`  <section class="panel" id="panel-budget">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f"><span>家庭月收入（税后，元）</span>
      <input id="bg-income" type="number" inputmode="decimal" min="0" step="1000" value="30000"></label>
    <label class="f"><span>手里可用现金（含税费，元）</span>
      <input id="bg-cash" type="number" inputmode="decimal" min="0" step="10000" value="700000"></label>
    <label class="f"><span>首付比例（%）</span>
      <input id="bg-down" type="number" inputmode="decimal" min="0" max="100" step="5" value="30"></label>
    <label class="f"><span>房贷利率（%）</span>
      <input id="bg-rate" type="number" inputmode="decimal" min="0" step="0.05" value="3.1"></label>
    <label class="f"><span>贷款年限（年）</span>
      <input id="bg-years" type="number" inputmode="decimal" min="1" step="1" value="30"></label>
    <label class="f"><span>月供最高占收入（%）</span>
      <input id="bg-ratio" type="number" inputmode="decimal" min="5" max="80" step="5" value="40"></label>
    <label class="f"><span>税费+装修预留（占总价，%）</span>
      <input id="bg-fee" type="number" inputmode="decimal" min="0" step="0.5" value="5"></label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">能承受的房子总价</span><strong id="bg-total">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>月供上限（收入的设定比例）</span><b id="bg-paycap">—</b></li>
      <li><span>按这条月供能贷到</span><b id="bg-loancap">—</b></li>
      <li><span>受月供约束的最高总价</span><b id="bg-byPay">—</b></li>
      <li><span>受现金约束的最高总价</span><b id="bg-byCash">—</b></li>
      <li><span>卡在哪一边</span><b id="bg-bottle">—</b></li>
      <li><span>首付</span><b id="bg-downamt">—</b></li>
      <li><span>税费+装修要预留</span><b id="bg-feeamt">—</b></li>
      <li><span>贷款额 / 月供</span><b id="bg-loan">—</b></li>
      <li><span>月供占收入</span><b id="bg-share">—</b></li>
      <li><span>30 年总共付的利息</span><b id="bg-int">—</b></li>
    </ul>
    <p class="hint" id="bg-note"></p>
  </div>
    </div>
  </section>
`,rentup:`  <section class="panel" id="panel-rentup">
    <div class="cols">
  <div class="card">
    <h2>输入</h2>
    <label class="f"><span>现在月租（元）</span>
      <input id="ru-cur" type="number" inputmode="decimal" min="0" step="100" value="4000"></label>
    <label class="f"><span>房东要涨到（元）</span>
      <input id="ru-new" type="number" inputmode="decimal" min="0" step="100" value="4400"></label>
    <label class="f"><span>搬家一次的总成本（中介/押金损失/搬家，元）</span>
      <input id="ru-cost" type="number" inputmode="decimal" min="0" step="500" value="6000"></label>
    <label class="f"><span>同地段新租价（元）</span>
      <input id="ru-alt" type="number" inputmode="decimal" min="0" step="100" value="4200"></label>
    <label class="f"><span>还打算住几年</span>
      <input id="ru-years" type="number" inputmode="decimal" min="0.5" max="20" step="0.5" value="3"></label>
  </div>

  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">搬走能省（或亏）</span><strong id="ru-diff">—</strong><span class="unit">元</span></div>
    <ul class="kv">
      <li><span>接受涨租：每年多付</span><b id="ru-stayyear">—</b></li>
      <li><span>接受涨租：住满期的总多付</span><b id="ru-stay">—</b></li>
      <li><span>搬走：住满期的总多付（含搬家费）</span><b id="ru-move">—</b></li>
      <li><span>搬家的盈亏平衡要住</span><b id="ru-breakeven">—</b></li>
      <li><span>涨租幅度的临界点</span><b id="ru-line">—</b></li>
    </ul>
    <div class="tablebox">
      <table>
        <thead><tr><th>还住</th><th>接受涨租多付</th><th>搬走多付</th><th>哪边划算</th></tr></thead>
        <tbody id="ru-body"></tbody>
      </table>
    </div>
    <p class="hint" id="ru-note"></p>
  </div>
    </div>
  </section>
`};export default{rentbuy:Z,deed:nn,sell:an,rentyield:en,budget:tn,rentup:sn,housecash:ln};
