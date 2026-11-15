var Y=Object.defineProperty;var h=(s,p)=>Y(s,"name",{value:p,configurable:!0});const{$:e,BACKUP_KEY:B,BUILD_TAG:U,CAT_KEY:V,CAT_LABEL:Q,CHUNK_FILES:G,CHUNK_OF:X,CMP_KEY:q,CORE_CALC:z,CURS:J,DEFERRED_TAPS:$,DEMO_SAVED:Z,DIVISOR:j,EDITED:ee,ERR_BOX:ae,FAV_KEY:ne,FIELDS:te,FIRST_ACTIVATE:se,FREQ:re,FREQ_KEY:ie,INSTALL_HIDE_KEY:le,KEY:pe,LAST_KEY:oe,MONTH_CATS:de,MONTH_TABLE:he,NEXT_OF:fe,PALETTE_EL:ce,PENDING_PARAMS:ue,PRE_KEY:me,QUOTA_WARNED:we,RECENT_KEY:ke,SAVE_TIMER:Ee,SCHEMA_KEY:Te,SCHEMA_VERSION:Se,SEARCH_KEY:_e,SNAP_DROP_SEEN:ve,SNAP_KEY:be,SNAP_MAX:Ae,SNAP_PICK:Ce,STORED:Me,TABS:ye,TAB_NATURAL:We,THEME_KEY:Fe,TOAST_EL:Ne,TODAYBAR_KEY:Pe,UNITS:Re,WF_ARCH_KEY:ge,WF_AUTO_IDX:De,WF_AUTO_LIST:xe,WF_AUTO_STEP:Ie,WF_AUTO_TIMER:Ke,WF_CUSTNAME_KEY:Le,WF_CUST_KEY:Ye,WF_CUST_NAME:Oe,WF_DONE:He,WF_EDIT:Be,WF_EDIT_KEY:Ue,WF_KEY:Ve,WF_LAST:Qe,WF_LEGACY:Ge,WF_MAN_KEY:Xe,WF_MD:qe,WF_MD_FIELDS:ze,WF_MD_KEY:Je,WF_MD_LINKS:$e,WF_META_KEY:Ze,WF_MONTH_KEY:je,WF_NOTE_KEY:ea,WF_NOTIFIED_KEY:aa,WF_NOTIFY_KEY:na,WF_PATHS:ta,WF_ROLE_KEY:sa,WF_ROLE_READY:ra,WF_SKIP_KEY:ia,WF_TASK_KEY:la,WF_TEMPLATES:pa,XL_ROWS:oa,YEAR_TABLE:da,_onPanels:ha,a11yTouch:fa,activate:ca,addMonths:ua,annuityPV:ma,annuityPayment:wa,applyFilter:ka,applyParams:Ea,applyStoredTo:Ta,applyWfTpl:Sa,backupAgeDays:_a,bindWfDnd:va,bindWfInline:ba,bizAdd:Aa,bonusSoloTax:Ca,buildLoanSchedule:Ma,buildShare:ya,buildTabBadges:Wa,bumpFreq:Fa,calcLoan:Na,calcMap:Pa,calcWorkflow:Ra,checkInputs:ga,clearWfMan:Da,closePalette:xa,cmpTabName:Ia,cnUpper:Ka,combineTax:La,convertTemp:Ya,copyText:Oa,cumulativeTax:Ha,curCat:Ba,currentSnap:Ua,demoFill:Va,demoHint:Qa,diagText:Ga,dlJson:Xa,doInstall:qa,doPrint:za,drawMonthCats:Ja,drawMonthStack:$a,drawReportCharts:Za,drawRpMini:ja,drawnMonthlyChart:en,drawnYearChart:an,enhanceNums:nn,enhancePanelUi:tn,ensureChunk:sn,errHuman:rn,evalExpr:ln,favList:pn,fillCmpMod:on,fillMonthGrid:dn,fillUnits:hn,flash:fn,flushParams:cn,flushSave:un,fmt:E,fmtAt:mn,fmtDate:wn,fx:kn,gauss:En,getWfCust:Tn,getWfDone:Sn,getWfMan:_n,getWfMeta:vn,getWfNotes:bn,getWfSkip:An,hashTarget:Cn,inputIssue:Mn,installEvt:yn,installHintHide:Wn,installHintOff:Fn,iosInstallTip:Nn,iosLike:Pn,isFav:Rn,lastName:gn,leftAfter:Dn,linkTo:F,loadCmpA:xn,loadSnaps:In,loadWfArch:Kn,loadWfCust:Ln,loadWfDone:Yn,loadWfEdit:On,loadWfMan:Hn,loadWfMeta:Bn,loadWfNotes:Un,loadWfSkip:Vn,loadWfTask:Qn,loanRows:Gn,makeSnap:Xn,markBackup:qn,markBadInputs:zn,matchQ:Jn,money:t,monthToDate:$n,monthlyIRR:Zn,months:jn,npvDiff:et,num:a,numBlur:at,numFocus:nt,numInput:tt,numKey:st,numOf:rt,openPalette:it,orderTabsForQuery:lt,palKey:pt,panelEls:ot,panelParams:dt,parseAmounts:ht,parseDate:ft,parseNum:ct,pct:l,percentile:ut,plRank:mt,plScoreCov:wt,plScoreDsr:kt,plScoreEmg:Et,plScoreLev:Tt,plScoreSave:St,prePanels:_t,prefetchAllChunks:vt,presets:bt,printCover:At,printSheet:Ct,psEsc:Mt,psInputs:yt,psNotes:Wt,psResults:Ft,psText:Nt,pushRecent:Pt,pushSearch:Rt,pwaStandalone:gt,quickOf:Dt,rateOf:xt,readJsonFile:It,readMonthGrid:Kt,recentList:Lt,recordWf:Yt,refreshCounts:Ot,refreshTableTools:Ht,refreshTrackMods:Bt,refreshWfBadge:Ut,renderLoanTable:Vt,renderNext:Qt,renderPalette:Gt,renderPresets:Xt,renderSearchHist:qt,renderSnapCompare:zt,renderSnapList:Jt,renderTodayBar:$t,renderTrack:Zt,renderWfTpl:jt,rentBuyAt:es,restore:as,runCalc:ns,runDeferredTaps:ts,save:ss,saveCmpA:rs,saveFav:is,savePresets:ls,saveSnaps:ps,saveWfCust:os,savedCat:ds,schemaInit:hs,schemaMigrate:fs,scrollResultIfDeepLink:cs,searchHist:us,setCat:ms,setSub:ws,setTheme:ks,shareCalc:Es,sharePayload:Ts,showErrorBox:Ss,showInstBar:_s,showUpdateBar:vs,snapNameOf:bs,snapTipText:As,snapshot:Cs,st0:Ms,stamp:ys,startName:Ws,syncInstallUi:Fs,tabCatLabel:Ns,tabScore:Ps,tap:Rs,taxBy:gs,toast:Ds,toggleWfStep:xs,trimNum:Is,unitFor:Ks,updShown:Ls,wfAllPaths:Ys,wfArchiveMonth:Os,wfArchivePut:Hs,wfAutoNext:Bs,wfAutoStop:Us,wfAutoWalk:Vs,wfBar:Qs,wfBindCustQ:Gs,wfBuildHandoff:Xs,wfCarryMissing:qs,wfCarryQuery:zs,wfCarryWarn:Js,wfCsvCell:$s,wfCustNameSave:Zs,wfDayDiff:js,wfDetailRender:er,wfEditPath:ar,wfEditReset:nr,wfEditSave:tr,wfEditToggle:sr,wfFillCustSel:rr,wfHandoff:ir,wfHandoffCopy:lr,wfHandoffCsv:pr,wfHandoffPrint:or,wfHasAnyData:dr,wfHideStep:hr,wfKnownMods:fr,wfLegacyToNew:cr,wfLoad:ur,wfManSave:mr,wfMdHref:wr,wfMdRender:kr,wfMdSave:Er,wfMetaSave:Tr,wfMigrateLegacy:Sr,wfMonthKey:_r,wfMonthRoll:vr,wfMonthTouch:br,wfMoveStep:Ar,wfNoteSave:Cr,wfNotifyCheck:Mr,wfNotifyGranted:yr,wfNotifyPref:Wr,wfNotifySend:Fr,wfNotifySetPref:Nr,wfNotifyStatus:Pr,wfNotifyToggle:Rr,wfOpenInline:gr,wfOpenTasks:Dr,wfPad2:xr,wfPathMods:Ir,wfPlaceInline:Kr,wfPlaceNear:Lr,wfProgress:Yr,wfRenderSummary:Or,wfRoleSaved:Hr,wfScopedPaths:Br,wfSet:Ur,wfSkipCurrent:Vr,wfSkipSave:Qr,wfStepKey:Gr,wfStepShare:Xr,wfStepState:qr,wfTaskAdd:zr,wfTaskBox:Jr,wfTaskDel:$r,wfTaskPending:Zr,wfTaskSave:jr,wfTaskToggle:ei,wfTodayPick:ai,wfTodayStr:ni,wfUnhideStep:ti,wfVisiblePaths:si,yuan:ri,zOf:ii}=window.FC;function O(){var s=Math.max(0,a(e("hk-inc"),0)),p=Math.max(0,a(e("hk-need"),0)),T=Math.max(0,a(e("hk-want"),0)),c=Math.max(0,a(e("hk-cash"),0)),C=Math.max(0,a(e("hk-inv"),0)),N=Math.max(0,a(e("hk-house"),0)),m=Math.max(0,a(e("hk-debt"),0)),M=Math.max(0,a(e("hk-loan"),0)),y=Math.max(0,a(e("hk-prem"),0)),S=Math.max(0,a(e("hk-ins"),0)),_=s>0?(s-p-T)/s:0,v=p>0?c/p:0,w=c+C+N,b=w>0?m/w:0,k=s>0?M/s:0,o=s*12*10+m-(c+C);o<0&&(o=0);var A=o>0?S/o:1,P=s>0?y/(s*12):0,R=w-m;function g(n){return n>=.3?20:n>=.2?15:n>=.1?10:5}h(g,"scoreSave");function D(n){return n>=6?20:n>=4?15:n>=2?10:5}h(D,"scoreEmg");function x(n){return n<.3?20:n<.5?15:n<.7?10:5}h(x,"scoreLev");function I(n){return n<.3?20:n<.4?15:n<.5?10:5}h(I,"scoreDsr");function K(n){return n>=1?20:n>=.7?15:n>=.4?10:5}h(K,"scoreCover");for(var r=[["储蓄率",l(_,1),g(_),"≥30%"],["应急金月数",E(v,1)+" 个月",D(v),"≥6 个月"],["资产负债率",l(b,1),x(b),"<50%"],["月供收入比",l(k,1),I(k),"<40%"],["保障覆盖",l(A,1),K(A),"≥100%"]],f=0,i=r[0],u=0;u<r.length;u++)f+=r[u][2],r[u][2]<i[2]&&(i=r[u]);var L=f>=85?"优秀":f>=70?"良好":f>=55?"及格，有明显短板":"需要改善";e("hk-big").textContent=E(f,0),e("hk-save").textContent=l(_,1)+"（月存 "+t(s-p-T)+" 元）",e("hk-emg").textContent=E(v,1)+" 个月（现金 "+t(c)+" ÷ 必需支出 "+t(p)+"）",e("hk-lev").textContent=l(b,1)+"（负债 "+t(m)+" ÷ 资产 "+t(w)+"）",e("hk-dsr").textContent=l(k,1)+"（月供 "+t(M)+" ÷ 收入 "+t(s)+"）",e("hk-cover").textContent=l(A,1)+"（保额 "+t(S)+" ÷ 应配 "+t(o)+"）",e("hk-premp").textContent=l(P,2)+"（年保费 "+t(y)+"；保障型 5–10% 属正常）",e("hk-net").textContent=t(R)+" 元",e("hk-weak").textContent=i[0]+"（"+i[1]+"，得分 "+i[2]+"/20）";for(var W=[],d=0;d<r.length;d++)W.push("<tr"+(r[d][2]<=10?' class="c-warn"':"")+'><td class="tal">'+r[d][0]+"</td><td>"+r[d][1]+"</td><td>"+r[d][2]+" / 20</td><td>"+r[d][3]+"</td></tr>");e("hk-body").innerHTML=W.join(""),e("hk-links")&&(e("hk-links").innerHTML="把这里的数搬过去看完整版："+F("report",{"rp-inc":a(e("hk-inc"),0),"rp-need":a(e("hk-need"),0),"rp-want":a(e("hk-want"),0),"rp-cash":a(e("hk-cash"),0),"rp-inv":a(e("hk-inv"),0),"rp-house":a(e("hk-house"),0),"rp-debt":a(e("hk-debt"),0),"rp-loan":a(e("hk-loan"),0),"rp-ins":a(e("hk-ins"),0),"rp-prem":a(e("hk-prem"),0),"rp-age":a(e("hk-age"),0)},"一页体检报告")+F("emergency",{"em-exp":a(e("hk-need"),0)},"应急金缺口")),e("hk-note").textContent="综合得分 "+E(f,0)+" 分，评级「"+L+"」。五项各 20 分，取的是最常见的达标线：储蓄率 30%、应急金 6 个月、资产负债率 50%、月供收入比 40%、保障覆盖 100%。你最短的那块板是「"+i[0]+"」，先补它性价比最高——"+(i[0]==="保障覆盖"?"按责任法应配 "+t(o)+" 元（年收入 ×10 ＋ 负债 － 流动资产），现在还差 "+t(Math.max(0,o-S))+" 元；定期寿险比重疾便宜一个量级，先补寿险和意外。":i[0]==="应急金月数"?"应急金要能覆盖 6 个月必需支出，缺口 "+t(Math.max(0,p*6-c))+" 元，放在货币基金里，别拿去买股票。":i[0]==="储蓄率"?"储蓄率低于 20% 时，先砍可选支出而不是硬省必需支出，月存 "+t(Math.max(0,s*.3-(s-p-T)))+" 元才够 30% 线。":i[0]==="资产负债率"?"负债率高于 50% 时，新增债务要先还旧债，别用新贷养旧贷；房贷月供已占收入的 "+l(k,1)+"。":"月供收入比超过 40%，收入哪怕短暂中断也会立刻吃紧，先把月供压到 "+t(s*.4)+" 元以内。")+" 这套体检只做粗筛：没有统计你的养老金、公积金、年终奖和未来的大额支出，所以分数低不等于财务不健康，要看具体是哪一项低。数据只在本机浏览器，不上传。"}h(O,"calcHealth");export const PANELS={healthcheck:`  <section class="panel" id="panel-healthcheck">
    <div class="cols">
  <div class="card">
    <h2>输入 <button class="ghost sm" id="hk-pull" type="button">读取我填过的数据</button></h2>
    <span class="row">
      <input id="hk-inc" type="number" inputmode="decimal" min="0" step="1000" value="20000" aria-label="月收入">
      <input id="hk-age" type="number" inputmode="numeric" min="16" max="90" step="1" value="32" aria-label="年龄">
    </span>
    <p class="hint">左：家庭月收入（税后），右：年龄</p>
    <span class="row">
      <input id="hk-need" type="number" inputmode="decimal" min="0" step="500" value="10000" aria-label="月必需支出">
      <input id="hk-want" type="number" inputmode="decimal" min="0" step="500" value="3000" aria-label="月可选支出">
    </span>
    <p class="hint">左：月必需支出（房租房贷、吃饭、水电、学费），右：月可选支出（娱乐、旅游、非必需）</p>
    <span class="row">
      <input id="hk-cash" type="number" inputmode="decimal" min="0" step="10000" value="50000" aria-label="现金及活期">
      <input id="hk-inv" type="number" inputmode="decimal" min="0" step="10000" value="300000" aria-label="投资资产">
    </span>
    <p class="hint">左：现金、活期、货币基金，右：股票基金等投资资产（按市值）</p>
    <span class="row">
      <input id="hk-house" type="number" inputmode="decimal" min="0" step="100000" value="2000000" aria-label="自住房市值">
      <input id="hk-debt" type="number" inputmode="decimal" min="0" step="10000" value="800000" aria-label="负债余额">
    </span>
    <p class="hint">左：自住房当前市值（无房填 0），右：全部负债余额（房贷＋车贷＋信用贷）</p>
    <span class="row">
      <input id="hk-loan" type="number" inputmode="decimal" min="0" step="500" value="6000" aria-label="月还款">
      <input id="hk-prem" type="number" inputmode="decimal" min="0" step="1000" value="8000" aria-label="年保费">
    </span>
    <p class="hint">左：每月还本付息合计，右：全家年缴保费</p>
    <label class="f">
      <span>已配置的身故/重疾保额合计</span>
      <input id="hk-ins" type="number" inputmode="decimal" min="0" step="100000" value="500000">
      <em>只算保障型（定期寿险、重疾、意外），不含理财型保额</em>
    </label>
  </div>
  <div class="card res">
    <h2>结果</h2>
    <div class="big"><span class="k">综合得分</span><strong id="hk-big">—</strong><span class="unit">/ 100</span></div>
    <ul class="kv">
      <li><span>储蓄率 / 建议 ≥30%</span><b id="hk-save">—</b></li>
      <li><span>应急金 / 建议 ≥6 个月</span><b id="hk-emg">—</b></li>
      <li><span>资产负债率 / 建议 &lt;50%</span><b id="hk-lev">—</b></li>
      <li><span>月供收入比 / 建议 &lt;40%</span><b id="hk-dsr">—</b></li>
      <li><span>保障覆盖 / 建议 ≥100%</span><b id="hk-cover">—</b></li>
      <li><span>保费占收入</span><b id="hk-premp">—</b></li>
      <li><span>家庭净资产</span><b id="hk-net">—</b></li>
      <li><span>最短的那块板</span><b id="hk-weak">—</b></li>
    </ul>
    <div class="tablebox"><table><thead><tr><th>维度</th><th>你的数</th><th>得分</th><th>达标线</th></tr></thead><tbody id="hk-body"></tbody></table></div>
    <p class="jump" id="hk-links"></p>
    <p class="hint" id="hk-note"></p>
  </div>
    </div>
  </section>
`};export default{healthcheck:O};
