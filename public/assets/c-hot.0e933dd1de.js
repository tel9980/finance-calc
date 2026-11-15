var Y=Object.defineProperty;var h=(s,o)=>Y(s,"name",{value:o,configurable:!0});const{$:e,BACKUP_KEY:B,BUILD_TAG:U,CAT_KEY:V,CAT_LABEL:Q,CHUNK_FILES:G,CHUNK_OF:X,CMP_KEY:q,CORE_CALC:z,CURS:J,DEFERRED_TAPS:$,DEMO_SAVED:Z,DIVISOR:j,EDITED:ee,ERR_BOX:ae,FAV_KEY:ne,FIELDS:te,FIRST_ACTIVATE:se,FREQ:re,FREQ_KEY:le,INSTALL_HIDE_KEY:ie,KEY:oe,LAST_KEY:pe,MONTH_CATS:de,MONTH_TABLE:he,NEXT_OF:fe,PALETTE_EL:ce,PENDING_PARAMS:ue,PRE_KEY:me,QUOTA_WARNED:we,RECENT_KEY:ke,SAVE_TIMER:Ee,SCHEMA_KEY:Te,SCHEMA_VERSION:Se,SEARCH_KEY:_e,SNAP_DROP_SEEN:ve,SNAP_KEY:be,SNAP_MAX:Ae,SNAP_PICK:Ce,STORED:Me,TABS:ye,TAB_NATURAL:We,THEME_KEY:Fe,TOAST_EL:Ne,TODAYBAR_KEY:Pe,UNITS:ge,WF_ARCH_KEY:Re,WF_AUTO_IDX:De,WF_AUTO_LIST:Ke,WF_AUTO_STEP:xe,WF_AUTO_TIMER:Le,WF_CUSTNAME_KEY:Ie,WF_CUST_KEY:Ye,WF_CUST_NAME:Oe,WF_DONE:He,WF_EDIT:Be,WF_EDIT_KEY:Ue,WF_KEY:Ve,WF_LAST:Qe,WF_LEGACY:Ge,WF_MAN_KEY:Xe,WF_MD:qe,WF_MD_FIELDS:ze,WF_MD_KEY:Je,WF_MD_LINKS:$e,WF_META_KEY:Ze,WF_MONTH_KEY:je,WF_NOTE_KEY:ea,WF_NOTIFIED_KEY:aa,WF_NOTIFY_KEY:na,WF_PATHS:ta,WF_ROLE_KEY:sa,WF_ROLE_READY:ra,WF_SKIP_KEY:la,WF_TASK_KEY:ia,WF_TEMPLATES:oa,XL_ROWS:pa,YEAR_TABLE:da,_onPanels:ha,a11yTouch:fa,activate:ca,addMonths:ua,annuityPV:ma,annuityPayment:wa,applyFilter:ka,applyParams:Ea,applyStoredTo:Ta,applyWfTpl:Sa,backupAgeDays:_a,bindWfDnd:va,bindWfInline:ba,bizAdd:Aa,bonusSoloTax:Ca,buildLoanSchedule:Ma,buildShare:ya,buildTabBadges:Wa,bumpFreq:Fa,calcLoan:Na,calcMap:Pa,calcWorkflow:ga,clearWfMan:Ra,closePalette:Da,cmpTabName:Ka,cnUpper:xa,combineTax:La,convertTemp:Ia,copyText:Ya,cumulativeTax:Oa,curCat:Ha,currentSnap:Ba,demoFill:Ua,demoHint:Va,diagText:Qa,dlJson:Ga,doInstall:Xa,doPrint:qa,drawMonthCats:za,drawMonthStack:Ja,drawReportCharts:$a,drawRpMini:Za,drawnMonthlyChart:ja,drawnYearChart:en,enhanceNums:an,enhancePanelUi:nn,ensureChunk:tn,evalExpr:sn,favList:rn,fillCmpMod:ln,fillMonthGrid:on,fillUnits:pn,flash:dn,flushParams:hn,flushSave:fn,fmt:E,fmtAt:cn,fmtDate:un,fx:mn,gauss:wn,getWfCust:kn,getWfDone:En,getWfMan:Tn,getWfMeta:Sn,getWfNotes:_n,getWfSkip:vn,hashTarget:bn,installEvt:An,installHintHide:Cn,installHintOff:Mn,iosInstallTip:yn,iosLike:Wn,isFav:Fn,lastName:Nn,leftAfter:Pn,linkTo:F,loadCmpA:gn,loadSnaps:Rn,loadWfArch:Dn,loadWfCust:Kn,loadWfDone:xn,loadWfEdit:Ln,loadWfMan:In,loadWfMeta:Yn,loadWfNotes:On,loadWfSkip:Hn,loadWfTask:Bn,loanRows:Un,makeSnap:Vn,markBackup:Qn,markBadInputs:Gn,matchQ:Xn,money:t,monthToDate:qn,monthlyIRR:zn,months:Jn,npvDiff:$n,num:a,numBlur:Zn,numFocus:jn,numInput:et,numKey:at,numOf:nt,openPalette:tt,orderTabsForQuery:st,palKey:rt,panelEls:lt,panelParams:it,parseAmounts:ot,parseDate:pt,parseNum:dt,pct:i,percentile:ht,plRank:ft,plScoreCov:ct,plScoreDsr:ut,plScoreEmg:mt,plScoreLev:wt,plScoreSave:kt,prePanels:Et,prefetchAllChunks:Tt,presets:St,printCover:_t,pushRecent:vt,pushSearch:bt,pwaStandalone:At,quickOf:Ct,rateOf:Mt,readJsonFile:yt,readMonthGrid:Wt,recentList:Ft,recordWf:Nt,refreshCounts:Pt,refreshTableTools:gt,refreshTrackMods:Rt,refreshWfBadge:Dt,renderLoanTable:Kt,renderNext:xt,renderPalette:Lt,renderPresets:It,renderSearchHist:Yt,renderSnapCompare:Ot,renderSnapList:Ht,renderTodayBar:Bt,renderTrack:Ut,renderWfTpl:Vt,rentBuyAt:Qt,restore:Gt,runCalc:Xt,runDeferredTaps:qt,save:zt,saveCmpA:Jt,saveFav:$t,savePresets:Zt,saveSnaps:jt,saveWfCust:es,savedCat:as,schemaInit:ns,schemaMigrate:ts,scrollResultIfDeepLink:ss,searchHist:rs,setCat:ls,setSub:is,setTheme:os,shareCalc:ps,sharePayload:ds,showErrorBox:hs,showInstBar:fs,showUpdateBar:cs,snapNameOf:us,snapTipText:ms,snapshot:ws,st0:ks,stamp:Es,startName:Ts,syncInstallUi:Ss,tabCatLabel:_s,tabScore:vs,tap:bs,taxBy:As,toast:Cs,toggleWfStep:Ms,trimNum:ys,unitFor:Ws,updShown:Fs,wfAllPaths:Ns,wfArchiveMonth:Ps,wfArchivePut:gs,wfAutoNext:Rs,wfAutoStop:Ds,wfAutoWalk:Ks,wfBar:xs,wfBindCustQ:Ls,wfBuildHandoff:Is,wfCarryMissing:Ys,wfCarryQuery:Os,wfCarryWarn:Hs,wfCsvCell:Bs,wfCustNameSave:Us,wfDayDiff:Vs,wfDetailRender:Qs,wfEditPath:Gs,wfEditReset:Xs,wfEditSave:qs,wfEditToggle:zs,wfFillCustSel:Js,wfHandoff:$s,wfHandoffCopy:Zs,wfHandoffCsv:js,wfHandoffPrint:er,wfHasAnyData:ar,wfHideStep:nr,wfKnownMods:tr,wfLegacyToNew:sr,wfLoad:rr,wfManSave:lr,wfMdHref:ir,wfMdRender:or,wfMdSave:pr,wfMetaSave:dr,wfMigrateLegacy:hr,wfMonthKey:fr,wfMonthRoll:cr,wfMonthTouch:ur,wfMoveStep:mr,wfNoteSave:wr,wfNotifyCheck:kr,wfNotifyGranted:Er,wfNotifyPref:Tr,wfNotifySend:Sr,wfNotifySetPref:_r,wfNotifyStatus:vr,wfNotifyToggle:br,wfOpenInline:Ar,wfOpenTasks:Cr,wfPad2:Mr,wfPathMods:yr,wfPlaceInline:Wr,wfPlaceNear:Fr,wfProgress:Nr,wfRenderSummary:Pr,wfRoleSaved:gr,wfScopedPaths:Rr,wfSet:Dr,wfSkipCurrent:Kr,wfSkipSave:xr,wfStepKey:Lr,wfStepShare:Ir,wfStepState:Yr,wfTaskAdd:Or,wfTaskBox:Hr,wfTaskDel:Br,wfTaskPending:Ur,wfTaskSave:Vr,wfTaskToggle:Qr,wfTodayPick:Gr,wfTodayStr:Xr,wfUnhideStep:qr,wfVisiblePaths:zr,yuan:Jr,zOf:$r}=window.FC;function O(){var s=Math.max(0,a(e("hk-inc"),0)),o=Math.max(0,a(e("hk-need"),0)),T=Math.max(0,a(e("hk-want"),0)),c=Math.max(0,a(e("hk-cash"),0)),C=Math.max(0,a(e("hk-inv"),0)),N=Math.max(0,a(e("hk-house"),0)),m=Math.max(0,a(e("hk-debt"),0)),M=Math.max(0,a(e("hk-loan"),0)),y=Math.max(0,a(e("hk-prem"),0)),S=Math.max(0,a(e("hk-ins"),0)),_=s>0?(s-o-T)/s:0,v=o>0?c/o:0,w=c+C+N,b=w>0?m/w:0,k=s>0?M/s:0,p=s*12*10+m-(c+C);p<0&&(p=0);var A=p>0?S/p:1,P=s>0?y/(s*12):0,g=w-m;function R(n){return n>=.3?20:n>=.2?15:n>=.1?10:5}h(R,"scoreSave");function D(n){return n>=6?20:n>=4?15:n>=2?10:5}h(D,"scoreEmg");function K(n){return n<.3?20:n<.5?15:n<.7?10:5}h(K,"scoreLev");function x(n){return n<.3?20:n<.4?15:n<.5?10:5}h(x,"scoreDsr");function L(n){return n>=1?20:n>=.7?15:n>=.4?10:5}h(L,"scoreCover");for(var r=[["储蓄率",i(_,1),R(_),"≥30%"],["应急金月数",E(v,1)+" 个月",D(v),"≥6 个月"],["资产负债率",i(b,1),K(b),"<50%"],["月供收入比",i(k,1),x(k),"<40%"],["保障覆盖",i(A,1),L(A),"≥100%"]],f=0,l=r[0],u=0;u<r.length;u++)f+=r[u][2],r[u][2]<l[2]&&(l=r[u]);var I=f>=85?"优秀":f>=70?"良好":f>=55?"及格，有明显短板":"需要改善";e("hk-big").textContent=E(f,0),e("hk-save").textContent=i(_,1)+"（月存 "+t(s-o-T)+" 元）",e("hk-emg").textContent=E(v,1)+" 个月（现金 "+t(c)+" ÷ 必需支出 "+t(o)+"）",e("hk-lev").textContent=i(b,1)+"（负债 "+t(m)+" ÷ 资产 "+t(w)+"）",e("hk-dsr").textContent=i(k,1)+"（月供 "+t(M)+" ÷ 收入 "+t(s)+"）",e("hk-cover").textContent=i(A,1)+"（保额 "+t(S)+" ÷ 应配 "+t(p)+"）",e("hk-premp").textContent=i(P,2)+"（年保费 "+t(y)+"；保障型 5–10% 属正常）",e("hk-net").textContent=t(g)+" 元",e("hk-weak").textContent=l[0]+"（"+l[1]+"，得分 "+l[2]+"/20）";for(var W=[],d=0;d<r.length;d++)W.push("<tr"+(r[d][2]<=10?' class="c-warn"':"")+'><td class="tal">'+r[d][0]+"</td><td>"+r[d][1]+"</td><td>"+r[d][2]+" / 20</td><td>"+r[d][3]+"</td></tr>");e("hk-body").innerHTML=W.join(""),e("hk-links")&&(e("hk-links").innerHTML="把这里的数搬过去看完整版："+F("report",{"rp-inc":a(e("hk-inc"),0),"rp-need":a(e("hk-need"),0),"rp-want":a(e("hk-want"),0),"rp-cash":a(e("hk-cash"),0),"rp-inv":a(e("hk-inv"),0),"rp-house":a(e("hk-house"),0),"rp-debt":a(e("hk-debt"),0),"rp-loan":a(e("hk-loan"),0),"rp-ins":a(e("hk-ins"),0),"rp-prem":a(e("hk-prem"),0),"rp-age":a(e("hk-age"),0)},"一页体检报告")+F("emergency",{"em-exp":a(e("hk-need"),0)},"应急金缺口")),e("hk-note").textContent="综合得分 "+E(f,0)+" 分，评级「"+I+"」。五项各 20 分，取的是最常见的达标线：储蓄率 30%、应急金 6 个月、资产负债率 50%、月供收入比 40%、保障覆盖 100%。你最短的那块板是「"+l[0]+"」，先补它性价比最高——"+(l[0]==="保障覆盖"?"按责任法应配 "+t(p)+" 元（年收入 ×10 ＋ 负债 － 流动资产），现在还差 "+t(Math.max(0,p-S))+" 元；定期寿险比重疾便宜一个量级，先补寿险和意外。":l[0]==="应急金月数"?"应急金要能覆盖 6 个月必需支出，缺口 "+t(Math.max(0,o*6-c))+" 元，放在货币基金里，别拿去买股票。":l[0]==="储蓄率"?"储蓄率低于 20% 时，先砍可选支出而不是硬省必需支出，月存 "+t(Math.max(0,s*.3-(s-o-T)))+" 元才够 30% 线。":l[0]==="资产负债率"?"负债率高于 50% 时，新增债务要先还旧债，别用新贷养旧贷；房贷月供已占收入的 "+i(k,1)+"。":"月供收入比超过 40%，收入哪怕短暂中断也会立刻吃紧，先把月供压到 "+t(s*.4)+" 元以内。")+" 这套体检只做粗筛：没有统计你的养老金、公积金、年终奖和未来的大额支出，所以分数低不等于财务不健康，要看具体是哪一项低。数据只在本机浏览器，不上传。"}h(O,"calcHealth");export const PANELS={healthcheck:`  <section class="panel" id="panel-healthcheck">
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
