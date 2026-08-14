/* IPGO 正式站 — 共享交互：主题切换 + 简/繁/EN 三语言 + 验证演示 */
(function () {
  /* ---------- 主题切换（左下角 pill · 月亮/系统/太阳） ---------- */
  var THEME_KEY = 'theme';

  function applyTheme(mode, persist) {
    var root = document.documentElement;
    if (mode === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', mode);
    }
    if (persist) { try { localStorage.setItem(THEME_KEY, mode); } catch (e) {} }
    document.querySelectorAll('.theme-toggle-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-mode') === mode);
    });
  }

  function buildThemeToggle() {
    var wrap = document.createElement('div');
    wrap.className = 'theme-toggle-wrap';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'Theme');
    var icons = {
      dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
      system: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
      light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.3 4.3l1.6 1.6M18.1 18.1l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.3 19.7l1.6-1.6M18.1 5.9l1.6-1.6"/></svg>'
    };
    ['dark', 'system', 'light'].forEach(function (mode) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'theme-toggle-btn';
      btn.setAttribute('data-mode', mode);
      btn.setAttribute('aria-label', mode);
      btn.innerHTML = icons[mode];
      btn.addEventListener('click', function () { applyTheme(mode, true); });
      wrap.appendChild(btn);
    });
    document.body.appendChild(wrap);
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (!saved) saved = document.documentElement.getAttribute('data-default-theme') || 'system';
    applyTheme(saved, false);
  }

  /* ---------- 三语言 ---------- */
  var LANG_KEY = 'ipgo-lang';

  var I18N = {
    zh: {
      'nav.home': '首页', 'nav.cap': '能力', 'nav.partner': '合作', 'nav.about': '关于',
      'header.cta': '联系我们',
      'hero.badge': '为数字时代的原创资产建立全球信任体系',
      'hero.title': 'IPGO 原创资产信任框架',
      'hero.sub': '全球原创资产信任验证平台',
      'hero.desc': 'IPGO 旨在解决一个根本问题：在数字时代，原创性无法被默认信任，也缺乏全球统一的验证标准。',
      'hero.chip1': 'Polygon 网络', 'hero.chip2': 'SHA-256 安全加密', 'hero.chip3': '全球可验证',
      'card.kicker': '验证中心', 'card.title': '证书 / 报告验证',
      'card.label': '证书编号', 'card.ph': '请输入证书编号，如 IPGO-2026-880123',
      'card.btn': '验证',
      'card.f1': '区块链验证系统', 'card.f2': '六层信任框架', 'card.f3': '防篡改记录',
      'card.note': '验证结果依据 IPGO 原创资产信任框架签发，在身份、完整性与区块链各层提供可公开追溯的信任记录。',
      'result.ok': '验证通过', 'result.no': '证书编号', 'result.work': '《星轨旅人》插画作品',
      'result.chain': '已锚定 Polygon 区块 #78,452,190 · 2026-08-01 14:22', 'result.hash': 'SHA-256 完整性校验一致',
      'svc.kicker': '服务入口', 'svc.title': '一站式版权服务',
      'svc.1': '原创作品数字备案', 'svc.2': '产品设计发布存证', 'svc.3': '版权独创性测试',
      'svc.4': '版权风险监测', 'svc.5': '自助取证/固证', 'svc.6': '知识产权管理',
      'svc.w1t': '授权交易', 'svc.w1s': '版权授权、交易撮合、合同存证一站式服务',
      'svc.w2t': '教育培训', 'svc.w2s': '版权课程、企业内训与专业人才认证',
      'svc.w3t': '全球资讯', 'svc.w3s': '全球版权行业动态与政策解读',
      'trust.kicker': '多层验证架构',
      'trust.1': '身份信任', 'trust.2': '提交信任', 'trust.3': '完整性信任',
      'trust.4': '时间不可篡改信任', 'trust.5': '区块链记录信任', 'trust.6': '公开验证信任',
      'why.kicker': '信任基础设施', 'why.title': '为什么选择 IPGO',
      'why.1t': '区块链认证', 'why.1d': '不可篡改的链上记录，快速确认，全球可追溯。',
      'why.2t': '全球验证', 'why.2d': '随时随地进行跨境证书与报告验证。',
      'why.3t': '信任基础设施', 'why.3d': '从创作、存证到维权的端到端信任链。',
      'why.4t': '企业级安全', 'why.4d': '多层加密与合规就绪的审计轨迹。',
      'chain.kicker': '区块链基础设施',
      'chain.desc': 'IPGO 采用 Polygon 区块链，以快速、低成本且环境友好的方式，在全球范围内提供版权验证服务。',
      'chain.s1': '区块确认', 'chain.s2': '网络正常运行时间', 'chain.s3': '不可篡改记录',
      'flow.kicker': '运作方式', 'flow.title': '验证流程',
      'flow.desc': '从作品登记到全球验证，IPGO 以 SHA-256 完整性校验与 Polygon 区块链锚定，提供透明且可追溯的全流程服务。',
      'flow.1': '作品登记', 'flow.2': 'SHA-256 哈希生成', 'flow.3': '区块链锚定', 'flow.4': '证书签发', 'flow.5': '全球验证',
      'idx.more': '查看全部能力 →',
      'cap.kicker': '平台能力', 'cap.pagetitle': '六项核心能力',
      'cap.pagedesc': '从登记存证到监测维权，覆盖原创资产全生命周期的六项能力，全部基于 IPGO 六层信任框架构建。',
      'cap.1t': '原创作品数字备案', 'cap.1d': '为插画、文字、音乐、视频等原创作品生成 SHA-256 数字指纹并锚定至 Polygon 区块链，秒级完成登记，获得全球可验证的备案证书。',
      'cap.1p1': '秒级登记', 'cap.1p2': '链上证书', 'cap.1p3': '全球可查',
      'cap.2t': '产品设计发布存证', 'cap.2d': '在产品设计对外发布前完成时间戳存证，固定“谁先发布”的关键证据，为后续维权与授权谈判提供时间优先权支撑。',
      'cap.2p1': '发布前存证', 'cap.2p2': '时间优先权', 'cap.2p3': '批量处理',
      'cap.3t': '版权独创性测试', 'cap.3d': '通过图像指纹与语义比对引擎，对作品进行独创性评估与相似度检测，输出可用于授权尽调的独创性分析报告。',
      'cap.3p1': '相似度比对', 'cap.3p2': '独创性评分', 'cap.3p3': '分析报告',
      'cap.4t': '版权风险监测', 'cap.4d': '7×24 小时监测全网平台的作品使用情况，发现疑似侵权立即告警，并自动生成侵权证据快照与风险等级评估。',
      'cap.4p1': '全网监测', 'cap.4p2': '实时告警', 'cap.4p3': '证据快照',
      'cap.5t': '自助取证/固证', 'cap.5d': '网页、短视频、电商页面一键取证，取证过程全程录屏并同步上链，生成符合司法实践要求的电子数据固证报告。',
      'cap.5p1': '一键取证', 'cap.5p2': '全程录屏', 'cap.5p3': '司法级报告',
      'cap.6t': '知识产权管理', 'cap.6d': '企业级 IP 资产台账：证书、授权合同、维权案件统一管理，支持团队权限分配与到期提醒，让无形资产管理一目了然。',
      'cap.6p1': '资产台账', 'cap.6p2': '团队协作', 'cap.6p3': '到期提醒',
      'par.kicker': '生态合作', 'par.pagetitle': '战略合作',
      'par.pagedesc': 'IPGO 与行业协会、公证机构、高校与法律服务机构共建版权信任生态。',
      'par.main.kicker': '官方认可',
      'par.main.desc': 'IPGO 与深圳市版权协会建立战略合作关系，共同推动版权数字化、原创作品存证、知识产权资产管理与国际版权服务。',
      'par.a': 'IPGO 超级版权', 'par.b': '深圳市版权协会',
      'par.eco.title': '生态合作伙伴（示例）',
      'par.p1': '华南数字公证中心', 'par.p1s': '公证服务',
      'par.p2': '湾区知识产权研究院', 'par.p2s': '学术研究',
      'par.p3': '星辰律师事务所', 'par.p3s': '法律服务',
      'par.p4': '链安科技', 'par.p4s': '区块链安全',
      'par.p5': '港深创意产业联盟', 'par.p5s': '产业协作',
      'par.p6': '云证数据', 'par.p6s': '数据存证',
      'par.mode.title': '合作模式',
      'par.m1t': '联合存证实验室', 'par.m1d': '共建技术实验室，研究存证与验证的前沿标准。',
      'par.m2t': '人才培训共建', 'par.m2d': '与高校共建课程，培养版权数字化人才。',
      'par.m3t': '国际验证互认', 'par.m3d': '与海外机构互认验证结果，让证书全球通行。',
      'abo.kicker': '关于我们', 'abo.pagetitle': '关于 IPGO',
      'abo.name': 'IPGO Limited（香港）',
      'abo.desc': 'IPGO 是一个面向全球创作者与企业的知识产权科技平台。我们结合区块链技术、人工智能与全球法律专业能力，为数字时代提供最可信的版权保护与验证基础设施。',
      'abo.c1t': '全球', 'abo.c1d': '服务遍及 50 多个国家的创作者与企业',
      'abo.c2t': 'Polygon', 'abo.c2d': '企业级区块链基础设施',
      'abo.c3t': 'SHA-256', 'abo.c3d': '军事级加密保护',
      'abo.c4t': '验证', 'abo.c4d': '全天候证书验证服务',
      'abo.tl.title': '发展历程（示例）',
      'abo.t1y': '2023', 'abo.t1t': 'IPGO 于香港成立', 'abo.t1d': '由版权与区块链从业者共同创立。',
      'abo.t2y': '2024', 'abo.t2t': '接入 Polygon 主网', 'abo.t2d': '存证记录全面上链，验证服务上线。',
      'abo.t3y': '2025', 'abo.t3t': '与深圳市版权协会达成战略合作', 'abo.t3d': '共同推动版权数字化与国际验证服务。',
      'abo.t4y': '2026', 'abo.t4t': '服务覆盖 50+ 国家', 'abo.t4d': '全球创作者与企业用户持续增长。',
      'abo.contact.title': '联系我们',
      'abo.contact.desc': '商务合作与媒体垂询，欢迎邮件联系。',
      'footer.tag': '全球版权存证与验证平台。以区块链驱动的知识产权保护，服务全球创作者与企业。',
      'footer.nav': '网站导航', 'footer.contact': '联系方式',
      'footer.loc': '香港特别行政区',
      'footer.rights': '2026 © IPGO Limited（香港）',
      'footer.chain': '区块链信任 Powered by Polygon Network · 企业级区块链基础设施'
    },
    tw: {
      'nav.home': '首頁', 'nav.cap': '能力', 'nav.partner': '合作', 'nav.about': '關於',
      'header.cta': '聯絡我們',
      'hero.badge': '為數位時代的原創資產建立全球信任體系',
      'hero.title': 'IPGO 原創資產信任框架',
      'hero.sub': '全球原創資產信任驗證平台',
      'hero.desc': 'IPGO 旨在解決一個根本問題：在數位時代，原創性無法被默認信任，也缺乏全球統一的驗證標準。',
      'hero.chip1': 'Polygon 網路', 'hero.chip2': 'SHA-256 安全加密', 'hero.chip3': '全球可驗證',
      'card.kicker': '驗證中心', 'card.title': '證書 / 報告驗證',
      'card.label': '證書編號', 'card.ph': '請輸入證書編號，如 IPGO-2026-880123',
      'card.btn': '驗證',
      'card.f1': '區塊鏈驗證系統', 'card.f2': '六層信任框架', 'card.f3': '防篡改記錄',
      'card.note': '驗證結果依據 IPGO 原創資產信任框架簽發，在身份、完整性與區塊鏈各層提供可公開追溯的信任記錄。',
      'result.ok': '驗證通過', 'result.no': '證書編號', 'result.work': '《星軌旅人》插畫作品',
      'result.chain': '已錨定 Polygon 區塊 #78,452,190 · 2026-08-01 14:22', 'result.hash': 'SHA-256 完整性校驗一致',
      'svc.kicker': '服務入口', 'svc.title': '一站式版權服務',
      'svc.1': '原創作品數字備案', 'svc.2': '產品設計發佈存證', 'svc.3': '版權獨創性測試',
      'svc.4': '版權風險監測', 'svc.5': '自助取證/固證', 'svc.6': '知識產權管理',
      'svc.w1t': '授權交易', 'svc.w1s': '版權授權、交易撮合、合同存證一站式服務',
      'svc.w2t': '教育培訓', 'svc.w2s': '版權課程、企業內訓與專業人才認證',
      'svc.w3t': '全球資訊', 'svc.w3s': '全球版權行業動態與政策解讀',
      'trust.kicker': '多層驗證架構',
      'trust.1': '身份信任', 'trust.2': '提交信任', 'trust.3': '完整性信任',
      'trust.4': '時間不可篡改信任', 'trust.5': '區塊鏈記錄信任', 'trust.6': '公開驗證信任',
      'why.kicker': '信任基礎設施', 'why.title': '為什麼選擇 IPGO',
      'why.1t': '區塊鏈認證', 'why.1d': '不可篡改的鏈上記錄，快速確認，全球可追溯。',
      'why.2t': '全球驗證', 'why.2d': '隨時隨地進行跨境證書與報告驗證。',
      'why.3t': '信任基礎設施', 'why.3d': '從創作、存證到維權的端到端信任鏈。',
      'why.4t': '企業級安全', 'why.4d': '多層加密與合規就緒的審計軌跡。',
      'chain.kicker': '區塊鏈基礎設施',
      'chain.desc': 'IPGO 採用 Polygon 區塊鏈，以快速、低成本且環境友好的方式，在全球範圍內提供版權驗證服務。',
      'chain.s1': '區塊確認', 'chain.s2': '網路正常運行時間', 'chain.s3': '不可篡改記錄',
      'flow.kicker': '運作方式', 'flow.title': '驗證流程',
      'flow.desc': '從作品登記到全球驗證，IPGO 以 SHA-256 完整性校驗與 Polygon 區塊鏈錨定，提供透明且可追溯的全流程服務。',
      'flow.1': '作品登記', 'flow.2': 'SHA-256 雜湊生成', 'flow.3': '區塊鏈錨定', 'flow.4': '證書簽發', 'flow.5': '全球驗證',
      'idx.more': '查看全部能力 →',
      'cap.kicker': '平台能力', 'cap.pagetitle': '六項核心能力',
      'cap.pagedesc': '從登記存證到監測維權，覆蓋原創資產全生命週期的六項能力，全部基於 IPGO 六層信任框架構建。',
      'cap.1t': '原創作品數字備案', 'cap.1d': '為插畫、文字、音樂、視頻等原創作品生成 SHA-256 數字指紋並錨定至 Polygon 區塊鏈，秒級完成登記，獲得全球可驗證的備案證書。',
      'cap.1p1': '秒級登記', 'cap.1p2': '鏈上證書', 'cap.1p3': '全球可查',
      'cap.2t': '產品設計發布存證', 'cap.2d': '在產品設計對外發布前完成時間戳存證，固定「誰先發布」的關鍵證據，為後續維權與授權談判提供時間優先權支撐。',
      'cap.2p1': '發布前存證', 'cap.2p2': '時間優先權', 'cap.2p3': '批量處理',
      'cap.3t': '版權獨創性測試', 'cap.3d': '通過圖像指紋與語義比對引擎，對作品進行獨創性評估與相似度檢測，輸出可用於授權盡調的獨創性分析報告。',
      'cap.3p1': '相似度比對', 'cap.3p2': '獨創性評分', 'cap.3p3': '分析報告',
      'cap.4t': '版權風險監測', 'cap.4d': '7×24 小時監測全網平台的作品使用情況，發現疑似侵權立即告警，並自動生成侵權證據快照與風險等級評估。',
      'cap.4p1': '全網監測', 'cap.4p2': '實時告警', 'cap.4p3': '證據快照',
      'cap.5t': '自助取證/固證', 'cap.5d': '網頁、短視頻、電商頁面一鍵取證，取證過程全程錄屏並同步上鏈，生成符合司法實踐要求的電子數據固證報告。',
      'cap.5p1': '一鍵取證', 'cap.5p2': '全程錄屏', 'cap.5p3': '司法級報告',
      'cap.6t': '知識產權管理', 'cap.6d': '企業級 IP 資產台賬：證書、授權合同、維權案件統一管理，支持團隊權限分配與到期提醒，讓無形資產管理一目了然。',
      'cap.6p1': '資產台賬', 'cap.6p2': '團隊協作', 'cap.6p3': '到期提醒',
      'par.kicker': '生態合作', 'par.pagetitle': '戰略合作',
      'par.pagedesc': 'IPGO 與行業協會、公證機構、高校與法律服務機構共建版權信任生態。',
      'par.main.kicker': '官方認可',
      'par.main.desc': 'IPGO 與深圳市版權協會建立戰略合作關係，共同推動版權數位化、原創作品存證、知識產權資產管理與國際版權服務。',
      'par.a': 'IPGO 超級版權', 'par.b': '深圳市版權協會',
      'par.eco.title': '生態合作夥伴（示例）',
      'par.p1': '華南數字公證中心', 'par.p1s': '公證服務',
      'par.p2': '灣區知識產權研究院', 'par.p2s': '學術研究',
      'par.p3': '星辰律師事務所', 'par.p3s': '法律服務',
      'par.p4': '鏈安科技', 'par.p4s': '區塊鏈安全',
      'par.p5': '港深創意產業聯盟', 'par.p5s': '產業協作',
      'par.p6': '雲證數據', 'par.p6s': '數據存證',
      'par.mode.title': '合作模式',
      'par.m1t': '聯合存證實驗室', 'par.m1d': '共建技術實驗室，研究存證與驗證的前沿標準。',
      'par.m2t': '人才培訓共建', 'par.m2d': '與高校共建課程，培養版權數位化人才。',
      'par.m3t': '國際驗證互認', 'par.m3d': '與海外機構互認驗證結果，讓證書全球通行。',
      'abo.kicker': '關於我們', 'abo.pagetitle': '關於 IPGO',
      'abo.name': 'IPGO Limited（香港）',
      'abo.desc': 'IPGO 是一個面向全球創作者與企業的知識產權科技平台。我們結合區塊鏈技術、人工智慧與全球法律專業能力，為數位時代提供最可信的版權保護與驗證基礎設施。',
      'abo.c1t': '全球', 'abo.c1d': '服務遍及 50 多個國家的創作者與企業',
      'abo.c2t': 'Polygon', 'abo.c2d': '企業級區塊鏈基礎設施',
      'abo.c3t': 'SHA-256', 'abo.c3d': '軍事級加密保護',
      'abo.c4t': '驗證', 'abo.c4d': '全天候證書驗證服務',
      'abo.tl.title': '發展歷程（示例）',
      'abo.t1y': '2023', 'abo.t1t': 'IPGO 於香港成立', 'abo.t1d': '由版權與區塊鏈從業者共同創立。',
      'abo.t2y': '2024', 'abo.t2t': '接入 Polygon 主網', 'abo.t2d': '存證記錄全面上鏈，驗證服務上線。',
      'abo.t3y': '2025', 'abo.t3t': '與深圳市版權協會達成戰略合作', 'abo.t3d': '共同推動版權數位化與國際驗證服務。',
      'abo.t4y': '2026', 'abo.t4t': '服務覆蓋 50+ 國家', 'abo.t4d': '全球創作者與企業用戶持續增長。',
      'abo.contact.title': '聯絡我們',
      'abo.contact.desc': '商務合作與媒體垂詢，歡迎郵件聯絡。',
      'footer.tag': '全球版權存證與驗證平台。以區塊鏈驅動的知識產權保護，服務全球創作者與企業。',
      'footer.nav': '網站導航', 'footer.contact': '聯絡方式',
      'footer.loc': '香港特別行政區',
      'footer.rights': '2026 © IPGO Limited（香港）',
      'footer.chain': '區塊鏈信任 Powered by Polygon Network · 企業級區塊鏈基礎設施'
    },
    en: {
      'nav.home': 'Home', 'nav.cap': 'Capabilities', 'nav.partner': 'Partnership', 'nav.about': 'About',
      'header.cta': 'Contact Us',
      'hero.badge': 'A global trust system for original assets in the digital age',
      'hero.title': 'The IPGO Original Asset Trust Framework',
      'hero.sub': 'Global Trust Verification Platform for Original Assets',
      'hero.desc': 'IPGO solves one fundamental problem: in the digital age, originality cannot be trusted by default — and there is no unified global standard for verification.',
      'hero.chip1': 'Polygon Network', 'hero.chip2': 'SHA-256 Encryption', 'hero.chip3': 'Globally Verifiable',
      'card.kicker': 'Verification Center', 'card.title': 'Certificate / Report Verification',
      'card.label': 'Certificate Number', 'card.ph': 'Enter certificate number, e.g. IPGO-2026-880123',
      'card.btn': 'Verify',
      'card.f1': 'Blockchain Verification', 'card.f2': 'Six-Layer Trust Framework', 'card.f3': 'Tamper-Proof Records',
      'card.note': 'Results are issued under the IPGO Original Asset Trust Framework, providing publicly traceable trust records across identity, integrity, and blockchain layers.',
      'result.ok': 'Verified', 'result.no': 'Certificate No.', 'result.work': 'Illustration "Star Rail Traveler"',
      'result.chain': 'Anchored to Polygon block #78,452,190 · 2026-08-01 14:22', 'result.hash': 'SHA-256 integrity check passed',
      'svc.kicker': 'Services', 'svc.title': 'One-Stop Copyright Services',
      'svc.1': 'Original Work Filing', 'svc.2': 'Design Release Timestamping', 'svc.3': 'Originality Test',
      'svc.4': 'Risk Monitoring', 'svc.5': 'Self-Service Evidence', 'svc.6': 'IP Asset Management',
      'svc.w1t': 'Licensing & Trading', 'svc.w1s': 'One-stop licensing, deal matching, and contract timestamping',
      'svc.w2t': 'Education & Training', 'svc.w2s': 'Copyright courses, corporate training, and certification',
      'svc.w3t': 'Global News', 'svc.w3s': 'Global copyright industry updates and policy insights',
      'trust.kicker': 'Multi-Layer Verification Architecture',
      'trust.1': 'Identity Trust', 'trust.2': 'Submission Trust', 'trust.3': 'Integrity Trust',
      'trust.4': 'Time Immutability Trust', 'trust.5': 'Blockchain Record Trust', 'trust.6': 'Public Verification Trust',
      'why.kicker': 'Trust Infrastructure', 'why.title': 'Why IPGO',
      'why.1t': 'Blockchain Certified', 'why.1d': 'Immutable on-chain records, fast confirmation, globally traceable.',
      'why.2t': 'Global Verification', 'why.2d': 'Cross-border certificate and report verification, anywhere, anytime.',
      'why.3t': 'Trust Infrastructure', 'why.3d': 'An end-to-end trust chain from creation and timestamping to enforcement.',
      'why.4t': 'Enterprise-Grade Security', 'why.4d': 'Multi-layer encryption with compliance-ready audit trails.',
      'chain.kicker': 'Blockchain Infrastructure',
      'chain.desc': 'IPGO uses the Polygon blockchain to deliver fast, low-cost, and environmentally friendly copyright verification worldwide.',
      'chain.s1': 'Block Confirmation', 'chain.s2': 'Network Uptime', 'chain.s3': 'Immutable Records',
      'flow.kicker': 'How It Works', 'flow.title': 'Verification Process',
      'flow.desc': 'From registration to global verification, IPGO combines SHA-256 integrity checks with Polygon blockchain anchoring for a transparent, traceable end-to-end service.',
      'flow.1': 'Work Registration', 'flow.2': 'SHA-256 Hashing', 'flow.3': 'Blockchain Anchoring', 'flow.4': 'Certificate Issuance', 'flow.5': 'Global Verification',
      'idx.more': 'Explore all capabilities →',
      'cap.kicker': 'Capabilities', 'cap.pagetitle': 'Six Core Capabilities',
      'cap.pagedesc': 'From filing and timestamping to monitoring and enforcement — six capabilities covering the full lifecycle of original assets, all built on the IPGO six-layer trust framework.',
      'cap.1t': 'Original Work Digital Filing', 'cap.1d': 'Generate a SHA-256 digital fingerprint for illustrations, text, music, and video works, anchored to the Polygon blockchain — filing completes in seconds with a globally verifiable certificate.',
      'cap.1p1': 'Instant filing', 'cap.1p2': 'On-chain certificate', 'cap.1p3': 'Globally searchable',
      'cap.2t': 'Design Release Timestamping', 'cap.2d': 'Timestamp product designs before public release, locking in the critical evidence of who published first — supporting enforcement and licensing negotiations.',
      'cap.2p1': 'Pre-release proof', 'cap.2p2': 'First-to-publish', 'cap.2p3': 'Batch processing',
      'cap.3t': 'Originality Testing', 'cap.3d': 'Image-fingerprint and semantic comparison engines assess originality and similarity, producing an analysis report ready for licensing due diligence.',
      'cap.3p1': 'Similarity check', 'cap.3p2': 'Originality score', 'cap.3p3': 'Analysis report',
      'cap.4t': 'Risk Monitoring', 'cap.4d': '24/7 monitoring of work usage across the web — suspected infringement triggers instant alerts with evidence snapshots and risk-level assessment.',
      'cap.4p1': 'Web-wide monitoring', 'cap.4p2': 'Real-time alerts', 'cap.4p3': 'Evidence snapshots',
      'cap.5t': 'Self-Service Evidence Capture', 'cap.5d': 'One-click capture of web pages, short videos, and e-commerce listings with full screen recording, anchored on-chain — producing judicial-grade evidence reports.',
      'cap.5p1': 'One-click capture', 'cap.5p2': 'Full recording', 'cap.5p3': 'Judicial-grade report',
      'cap.6t': 'IP Asset Management', 'cap.6d': 'An enterprise IP ledger: certificates, licensing contracts, and enforcement cases in one place, with team permissions and expiry reminders.',
      'cap.6p1': 'Unified ledger', 'cap.6p2': 'Team collaboration', 'cap.6p3': 'Expiry reminders',
      'par.kicker': 'Partnership', 'par.pagetitle': 'Strategic Partnership',
      'par.pagedesc': 'IPGO builds a copyright trust ecosystem with industry associations, notary offices, universities, and legal service providers.',
      'par.main.kicker': 'Official Recognition',
      'par.main.desc': 'IPGO has established a strategic partnership with the Shenzhen Copyright Association to advance copyright digitization, original work timestamping, IP asset management, and international copyright services.',
      'par.a': 'IPGO Super Copyright', 'par.b': 'Shenzhen Copyright Association',
      'par.eco.title': 'Ecosystem Partners (Sample)',
      'par.p1': 'South China Digital Notary Center', 'par.p1s': 'Notary services',
      'par.p2': 'Bay Area IP Institute', 'par.p2s': 'Research',
      'par.p3': 'Starlight Law Firm', 'par.p3s': 'Legal services',
      'par.p4': 'ChainSafe Tech', 'par.p4s': 'Blockchain security',
      'par.p5': 'HK-SZ Creative Alliance', 'par.p5s': 'Industry collaboration',
      'par.p6': 'CloudCert Data', 'par.p6s': 'Data timestamping',
      'par.mode.title': 'Partnership Models',
      'par.m1t': 'Joint Timestamping Lab', 'par.m1d': 'Joint labs researching frontier standards for timestamping and verification.',
      'par.m2t': 'Talent Co-Training', 'par.m2d': 'Co-developed courses with universities to train digital copyright talent.',
      'par.m3t': 'Global Mutual Recognition', 'par.m3d': 'Mutual recognition of verification results with overseas institutions.',
      'abo.kicker': 'About', 'abo.pagetitle': 'About IPGO',
      'abo.name': 'IPGO Limited (Hong Kong)',
      'abo.desc': 'IPGO is an IP technology platform for creators and enterprises worldwide. We combine blockchain, AI, and global legal expertise to deliver the most trusted copyright protection and verification infrastructure for the digital age.',
      'abo.c1t': 'Global', 'abo.c1d': 'Creators and enterprises in 50+ countries',
      'abo.c2t': 'Polygon', 'abo.c2d': 'Enterprise-grade blockchain infrastructure',
      'abo.c3t': 'SHA-256', 'abo.c3d': 'Military-grade encryption',
      'abo.c4t': '24/7', 'abo.c4d': 'Round-the-clock certificate verification',
      'abo.tl.title': 'Milestones (Sample)',
      'abo.t1y': '2023', 'abo.t1t': 'Founded in Hong Kong', 'abo.t1d': 'Founded by copyright and blockchain practitioners.',
      'abo.t2y': '2024', 'abo.t2t': 'Polygon Mainnet Integration', 'abo.t2d': 'All records anchored on-chain; verification service launched.',
      'abo.t3y': '2025', 'abo.t3t': 'Strategic Partnership with SCA', 'abo.t3d': 'Jointly advancing copyright digitization and international verification.',
      'abo.t4y': '2026', 'abo.t4t': 'Serving 50+ Countries', 'abo.t4d': 'A growing global base of creators and enterprises.',
      'abo.contact.title': 'Contact Us',
      'abo.contact.desc': 'For business and media inquiries, contact us by email.',
      'footer.tag': 'A global copyright timestamping and verification platform. Blockchain-driven IP protection for creators and enterprises worldwide.',
      'footer.nav': 'Site Map', 'footer.contact': 'Contact',
      'footer.loc': 'Hong Kong SAR',
      'footer.rights': '2026 © IPGO Limited (Hong Kong)',
      'footer.chain': 'Blockchain trust powered by Polygon Network · Enterprise-grade infrastructure'
    }
  };

  var LANG_ATTR = { zh: 'zh-CN', tw: 'zh-TW', en: 'en' };

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.zh;
    document.documentElement.lang = LANG_ATTR[lang] || 'zh-CN';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      if (dict[k] != null) el.setAttribute('placeholder', dict[k]);
    });
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  function buildLangSwitch() {
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
    });
    var saved = 'zh';
    try { saved = localStorage.getItem(LANG_KEY) || 'zh'; } catch (e) {}
    applyLang(saved);
  }

  /* ---------- 验证演示（假数据） ---------- */
  function buildVerifyDemo() {
    var form = document.getElementById('verifyForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var result = document.getElementById('verifyResult');
      if (!result) return;
      result.classList.add('show');
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ---------- 滚动入场动画 ---------- */
  function buildReveal() {
    var els = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildThemeToggle();
    buildLangSwitch();
    buildVerifyDemo();
    buildReveal();
  });
})();
