/* IPGO 改版预览 — 共享交互逻辑：主题切换 + 中英切换 + 验证演示 */
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

  /* ---------- 中英双语 ---------- */
  var LANG_KEY = 'ipgo-preview-lang';

  var I18N = {
    zh: {
      'nav.verify': '验证', 'nav.cap': '能力', 'nav.partner': '合作', 'nav.about': '关于',
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
      'cap.kicker': '平台服务', 'cap.title': '核心能力',
      'cap.1t': '原创作品存证', 'cap.1d': '为原创作品提供数字存证，含时间戳与区块链锚定。',
      'cap.2t': '版权监测', 'cap.2d': '全网比对监测，及时发现侵权线索。',
      'cap.3t': '知识产权资产管理', 'cap.3d': '统一管理商标、专利、版权与证书。',
      'cap.4t': 'AI 深度伪造识别', 'cap.4d': 'AI 驱动的合成与篡改内容检测。',
      'cap.5t': '版权维权支持', 'cap.5d': '证据固化与法律维权支持。',
      'cap.6t': '国际版权验证', 'cap.6d': '全球证书与报告真实性验证服务。',
      'partner.kicker': '官方认可', 'partner.title': '战略合作',
      'partner.desc': 'IPGO 与深圳市版权协会建立战略合作关系，共同推动版权数字化、原创作品存证、知识产权资产管理与国际版权服务。',
      'partner.a': 'IPGO 超级版权', 'partner.b': '深圳市版权协会',
      'flow.kicker': '运作方式', 'flow.title': '验证流程',
      'flow.desc': '从作品登记到全球验证，IPGO 以 SHA-256 完整性校验与 Polygon 区块链锚定，提供透明且可追溯的全流程服务。',
      'flow.1': '作品登记', 'flow.2': 'SHA-256 哈希生成', 'flow.3': '区块链锚定', 'flow.4': '证书签发', 'flow.5': '全球验证',
      'about.kicker': '公司', 'about.title': '关于 IPGO',
      'about.name': 'IPGO Limited（香港）',
      'about.desc': 'IPGO 是一个面向全球创作者与企业的知识产权科技平台。我们结合区块链技术、人工智能与全球法律专业能力，为数字时代提供最可信的版权保护与验证基础设施。',
      'about.c1t': '全球', 'about.c1d': '服务遍及 50 多个国家的创作者与企业',
      'about.c2t': 'Polygon', 'about.c2d': '企业级区块链基础设施',
      'about.c3t': 'SHA-256', 'about.c3d': '军事级加密保护',
      'about.c4t': '验证', 'about.c4d': '全天候证书验证服务',
      'footer.tag': '全球版权存证与验证平台。以区块链驱动的知识产权保护，服务全球创作者与企业。',
      'footer.loc': '香港特别行政区', 'footer.rights': '2026 © IPGO Limited（香港）',
      'footer.chain': '区块链信任 Powered by Polygon Network · 企业级区块链基础设施'
    },
    en: {
      'nav.verify': 'Verify', 'nav.cap': 'Capabilities', 'nav.partner': 'Partnership', 'nav.about': 'About',
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
      'cap.kicker': 'Platform Services', 'cap.title': 'Core Capabilities',
      'cap.1t': 'Original Work Timestamping', 'cap.1d': 'Digital timestamping for original works with blockchain anchoring.',
      'cap.2t': 'Copyright Monitoring', 'cap.2d': 'Network-wide monitoring to detect infringement clues early.',
      'cap.3t': 'IP Asset Management', 'cap.3d': 'Unified management of trademarks, patents, copyrights, and certificates.',
      'cap.4t': 'AI Deepfake Detection', 'cap.4d': 'AI-driven detection of synthetic and tampered content.',
      'cap.5t': 'Enforcement Support', 'cap.5d': 'Evidence preservation and legal enforcement support.',
      'cap.6t': 'International Verification', 'cap.6d': 'Global verification of certificate and report authenticity.',
      'partner.kicker': 'Official Recognition', 'partner.title': 'Strategic Partnership',
      'partner.desc': 'IPGO has established a strategic partnership with the Shenzhen Copyright Association to advance copyright digitization, original work timestamping, IP asset management, and international copyright services.',
      'partner.a': 'IPGO Super Copyright', 'partner.b': 'Shenzhen Copyright Association',
      'flow.kicker': 'How It Works', 'flow.title': 'Verification Process',
      'flow.desc': 'From registration to global verification, IPGO combines SHA-256 integrity checks with Polygon blockchain anchoring for a transparent, traceable end-to-end service.',
      'flow.1': 'Work Registration', 'flow.2': 'SHA-256 Hashing', 'flow.3': 'Blockchain Anchoring', 'flow.4': 'Certificate Issuance', 'flow.5': 'Global Verification',
      'about.kicker': 'Company', 'about.title': 'About IPGO',
      'about.name': 'IPGO Limited (Hong Kong)',
      'about.desc': 'IPGO is an IP technology platform for creators and enterprises worldwide. We combine blockchain, AI, and global legal expertise to deliver the most trusted copyright protection and verification infrastructure for the digital age.',
      'about.c1t': 'Global', 'about.c1d': 'Creators and enterprises in 50+ countries',
      'about.c2t': 'Polygon', 'about.c2d': 'Enterprise-grade blockchain infrastructure',
      'about.c3t': 'SHA-256', 'about.c3d': 'Military-grade encryption',
      'about.c4t': '24/7', 'about.c4d': 'Round-the-clock certificate verification',
      'footer.tag': 'A global copyright timestamping and verification platform. Blockchain-driven IP protection for creators and enterprises worldwide.',
      'footer.loc': 'Hong Kong SAR', 'footer.rights': '2026 © IPGO Limited (Hong Kong)',
      'footer.chain': 'Blockchain trust powered by Polygon Network · Enterprise-grade infrastructure'
    }
  };

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.zh;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
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
