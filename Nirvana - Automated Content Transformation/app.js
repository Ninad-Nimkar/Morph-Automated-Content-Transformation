/* ============================================================
   TRANSFORMAI — Application Logic
   SPA with hash-based routing, mock AI interactions
   ============================================================ */

// ─── STATE ───────────────────────────────────────────────────
const state = {
  currentScreen: 'landing',
  activeOutputTab: 'script',
  activeSlide: 0,
  sourceText: '',
  audience: 'Executive',
  tone: 'Professional',
  objective: 'Inform',
  detail: 'Standard',
  selectedOutputs: ['summary', 'advisory', 'linkedin', 'xpost', 'infographic', 'presentation', 'video'],
  analysisComplete: false,
  generationComplete: false,
};

// ─── MOCK DATA ──────────────────────────────────────────────
const MOCK_SOURCE = `Cybersecurity Awareness: Protecting Organizations in the Digital Age

Phishing remains one of the most prevalent attack vectors affecting organizations worldwide. In 2024 alone, over 3.4 billion phishing emails were sent daily, representing a 58% increase from the previous year. These attacks have become increasingly sophisticated, utilizing AI-generated content to craft convincing messages that bypass traditional email filters.

Employee awareness training has proven to be the most cost-effective measure against social engineering attacks. Organizations that conduct regular security awareness programs experience 70% fewer successful phishing attempts. The National Institute of Standards and Technology (NIST) recommends quarterly training sessions combined with simulated phishing exercises.

Multi-factor authentication (MFA) remains a critical defense layer. Accounts protected by MFA are 99.9% less likely to be compromised compared to those relying solely on passwords. Despite this, only 57% of enterprise organizations have fully deployed MFA across their user base.

Strong password policies, combined with password managers, can significantly reduce credential-based attacks. The average employee manages 87 passwords, making password reuse a persistent vulnerability. Organizations should implement single sign-on (SSO) solutions alongside MFA to balance security with user experience.

Incident response preparedness is equally important. Organizations with a tested incident response plan reduce the average cost of a data breach by $2.66 million. Regular tabletop exercises and clear communication protocols ensure teams can respond effectively when an incident occurs.`;

const MOCK_PROJECTS = [
  { id: 1, title: 'Cybersecurity Awareness Report', source: 'PDF Document', outputs: 7, updated: '2 hours ago', status: 'Complete' },
  { id: 2, title: 'Quarterly Research Brief', source: 'Pasted Text', outputs: 4, updated: '1 day ago', status: 'Complete' },
  { id: 3, title: 'Incident Communication Draft', source: 'DOCX Upload', outputs: 3, updated: '3 days ago', status: 'In Progress' },
];

const MOCK_ANALYSIS = {
  topic: 'Cybersecurity Awareness',
  keyPoints: [
    'Phishing remains a major attack vector with 3.4B daily emails',
    'Employee awareness training reduces phishing success by 70%',
    'MFA makes accounts 99.9% less likely to be compromised',
    'Strong password policies and SSO improve credential security',
    'Tested incident response plans save $2.66M per breach',
  ],
  entities: ['NIST', 'Enterprise Organizations', 'Security Teams', 'Employees'],
  facts: 5,
  confidence: 'High',
};

const MOCK_OUTPUTS = {
  summary: {
    type: 'Executive Summary',
    icon: 'file-text',
    color: 'blue',
    preview: 'Cybersecurity threats continue to evolve, with phishing remaining the dominant attack vector. This summary outlines key risks and actionable defenses...',
    content: {
      title: 'Executive Summary: Cybersecurity Awareness',
      sections: [
        {
          heading: 'Overview',
          text: 'Cybersecurity threats continue to evolve rapidly, with phishing remaining the dominant attack vector affecting organizations globally. In 2024, daily phishing email volume reached 3.4 billion — a 58% year-over-year increase.',
          source: 'Section 1, Paragraph 1',
        },
        {
          heading: 'Key Findings',
          text: 'Organizations implementing regular security awareness training experience 70% fewer successful phishing attempts. Multi-factor authentication reduces account compromise risk by 99.9%, yet only 57% of enterprises have achieved full deployment.',
          source: 'Sections 2-3',
        },
        {
          heading: 'Recommendations',
          text: 'Deploy MFA organization-wide and conduct quarterly awareness training with simulated exercises. Implement SSO alongside password managers. Develop and regularly test incident response plans — organizations with tested plans save an average of $2.66 million per breach.',
          source: 'Sections 3-5',
        },
      ],
    },
  },
  advisory: {
    type: 'Advisory',
    icon: 'shield-alert',
    color: 'green',
    preview: 'SECURITY ADVISORY: Immediate actions recommended to strengthen organizational cyber defense posture against phishing and credential attacks...',
    content: {
      title: 'Security Advisory: Strengthening Cyber Defense',
      sections: [
        {
          heading: 'Threat Summary',
          text: 'Phishing attacks have increased 58% year-over-year, now averaging 3.4 billion malicious emails daily. AI-generated phishing content bypasses traditional filters with increasing success rates.',
          source: 'Section 1',
        },
        {
          heading: 'Risk Assessment: HIGH',
          text: 'Organizations without MFA face near-certain credential compromise. Only 57% of enterprises have fully deployed MFA, leaving a significant attack surface. The average employee manages 87 passwords, making reuse inevitable without centralized management.',
          source: 'Sections 3-4',
        },
        {
          heading: 'Required Actions',
          text: '1. Complete MFA deployment within 90 days.\n2. Launch quarterly security awareness training.\n3. Deploy simulated phishing exercises monthly.\n4. Implement SSO with password manager integration.\n5. Schedule incident response tabletop exercises quarterly.',
          source: 'Sections 2-5',
        },
      ],
    },
  },
  linkedin: {
    type: 'LinkedIn Post',
    icon: 'linkedin',
    color: 'blue',
    preview: '3.4 billion phishing emails are sent every day. That number is up 58% from last year. Here\'s what the data says about what actually works...',
    content: {
      title: 'LinkedIn Post',
      sections: [
        {
          heading: '',
          text: '3.4 billion phishing emails are sent every day.\n\nThat number is up 58% from last year — and AI is making these attacks harder to spot.\n\nBut here\'s what the data actually shows about what works:\n\n→ Regular awareness training cuts successful phishing by 70%\n→ MFA makes accounts 99.9% less likely to be compromised\n→ Organizations with tested IR plans save $2.66M per breach\n\nThe gap? Only 57% of enterprises have fully deployed MFA.\n\nThe biggest security upgrade most organizations can make isn\'t a new tool. It\'s finishing the rollout of the ones they already have.\n\n#Cybersecurity #InfoSec #CISO',
          source: 'Full document',
        },
      ],
    },
  },
  xpost: {
    type: 'X Post',
    icon: 'twitter',
    color: 'gray',
    preview: '3.4B phishing emails sent daily — up 58% YoY. MFA stops 99.9% of account compromises. Only 57% of orgs have deployed it fully...',
    content: {
      title: 'X/Twitter Post',
      sections: [
        {
          heading: 'Post 1',
          text: '3.4B phishing emails sent daily — up 58% YoY.\n\nMFA stops 99.9% of account compromises. Yet only 57% of enterprises have deployed it fully.\n\nThe biggest cybersecurity upgrade isn\'t a new tool. It\'s finishing the rollout.',
          source: 'Sections 1, 3',
        },
        {
          heading: 'Post 2 (Thread)',
          text: 'What actually reduces phishing risk:\n\n• Regular training → 70% fewer successful attacks\n• MFA → 99.9% reduction in compromises\n• Tested IR plans → $2.66M saved per breach\n\nThe data is clear. Execution is the gap.',
          source: 'Sections 2-5',
        },
      ],
    },
  },
  infographic: {
    type: 'Infographic',
    icon: 'bar-chart-3',
    color: 'purple',
    preview: 'Visual overview of cybersecurity risks and recommended actions with key statistics...',
    content: null,
  },
  presentation: {
    type: 'Presentation',
    icon: 'presentation',
    color: 'amber',
    preview: '8-slide presentation covering threat landscape, key statistics, and actionable recommendations...',
    content: null,
  },
  video: {
    type: 'Video Package',
    icon: 'video',
    color: 'green',
    preview: 'Complete production package with script, storyboard, narration and visual recommendations...',
    content: null,
  },
};

const MOCK_SLIDES = [
  { title: 'Cybersecurity Awareness', subtitle: 'Protecting Organizations in the Digital Age', type: 'title' },
  { title: 'The Threat Landscape', bullets: ['3.4B phishing emails sent daily', '58% increase year-over-year', 'AI-generated content bypasses filters'], notes: 'Start by establishing the scale of the problem. These numbers should create urgency without causing panic.' },
  { title: 'Employee Awareness Training', bullets: ['70% reduction in successful phishing', 'NIST recommends quarterly sessions', 'Combine with simulated exercises'], notes: 'Training is the highest-ROI investment. Highlight the NIST recommendation for credibility.' },
  { title: 'Multi-Factor Authentication', bullets: ['99.9% reduction in account compromise', 'Only 57% of enterprises fully deployed', 'Critical defense layer for all accounts'], notes: 'The gap between effectiveness and adoption is the key message here.' },
  { title: 'Password & Credential Security', bullets: ['Average employee manages 87 passwords', 'Password reuse is a persistent vulnerability', 'SSO + MFA balances security and UX'], notes: 'Make the case that humans will always take shortcuts — the system needs to account for that.' },
  { title: 'Incident Response', bullets: ['Tested plans save $2.66M per breach', 'Regular tabletop exercises are essential', 'Clear communication protocols needed'], notes: 'Incident response is often overlooked until it is too late. This slide drives that point.' },
  { title: 'Recommended Actions', bullets: ['Deploy MFA organization-wide', 'Launch quarterly awareness training', 'Implement SSO with password managers', 'Test incident response plans quarterly'], notes: 'End with clear, actionable steps. Each bullet should be achievable within 90 days.' },
  { title: 'Summary', bullets: ['Phishing is the top threat — train for it', 'MFA is the top defense — deploy it', 'Preparation cuts cost — test your IR plan'], notes: 'Three-line summary reinforces the three pillars: awareness, authentication, response.' },
];

const MOCK_SCENES = [
  { num: 1, title: 'The Scale of the Problem', narration: 'Every day, 3.4 billion phishing emails flood inboxes worldwide. That is a 58 percent increase from just one year ago. And with AI making these attacks more convincing than ever, traditional defenses are no longer enough.', visual: 'Wide shot of office. Animated inbox showing incoming emails. Counter ticking up.', duration: '0:00 – 0:25' },
  { num: 2, title: 'What Actually Works', narration: 'The data tells a clear story. Organizations that run regular security awareness training see 70 percent fewer successful phishing attacks. Multi-factor authentication makes accounts 99.9 percent less likely to be compromised. And companies with tested incident response plans save over two and a half million dollars per breach.', visual: 'Split screen showing statistics with animated charts. Clean data visualization style.', duration: '0:25 – 0:55' },
  { num: 3, title: 'The Action Gap', narration: 'But here is the gap. Despite its effectiveness, only 57 percent of enterprises have fully deployed MFA. The average employee manages 87 passwords, making reuse practically inevitable. The biggest upgrade most organizations can make is not buying a new tool — it is finishing the rollout of the tools they already have.', visual: 'Progress bar animation showing 57% MFA deployment. Employee at desk with password prompts.', duration: '0:55 – 1:25' },
  { num: 4, title: 'Your Next Steps', narration: 'Start with three actions. Complete your MFA rollout. Launch quarterly training with simulated phishing. And schedule your first tabletop incident response exercise. These are not aspirational goals. They are proven, measurable defenses that work.', visual: 'Checklist appearing item by item. Clean ending card with organization logo.', duration: '1:25 – 1:50' },
];

const MOCK_VERSIONS = [
  { version: 4, label: 'Updated audience → Executive', date: '2 hours ago', detail: 'Changed audience setting from General Public to Executive. Regenerated summary and advisory.' },
  { version: 3, label: 'Regenerated infographic', date: '5 hours ago', detail: 'Updated infographic with simplified visuals and new statistics layout.' },
  { version: 2, label: 'Added advisory output', date: '1 day ago', detail: 'Generated advisory output with HIGH risk classification and required actions.' },
  { version: 1, label: 'Initial generation', date: '1 day ago', detail: 'Created project from PDF upload. Generated all 7 output formats.' },
];

// ─── ROUTER ──────────────────────────────────────────────────
function navigate(screen) {
  state.currentScreen = screen;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── TOAST ───────────────────────────────────────────────────
function showToast(message, icon = 'check-circle') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="${icon}"></i> ${message}`;
  document.body.appendChild(toast);
  lucide.createIcons({ nodes: [toast] });
  setTimeout(() => toast.remove(), 3000);
}

// ─── RENDER ENGINE ───────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  let html = '';

  switch (state.currentScreen) {
    case 'landing': html = renderLanding(); break;
    case 'dashboard': html = renderNavbar() + renderDashboard(); break;
    case 'create': html = renderNavbar() + renderCreate(); break;
    case 'analysis': html = renderNavbar() + renderAnalysis(); break;
    case 'workspace': html = renderNavbar() + renderWorkspace(); break;
    case 'editor': html = renderNavbar() + renderEditor(); break;
    case 'presentation': html = renderNavbar() + renderPresentation(); break;
    case 'infographic': html = renderNavbar() + renderInfographic(); break;
    case 'video': html = renderNavbar() + renderVideo(); break;
    case 'history': html = renderNavbar() + renderHistory(); break;
    default: html = renderLanding();
  }

  app.innerHTML = html;
  lucide.createIcons();
  attachEventListeners();
}

// ─── NAVBAR ──────────────────────────────────────────────────
function renderNavbar() {
  const links = [
    { label: 'Dashboard', screen: 'dashboard' },
    { label: 'Projects', screen: 'workspace' },
    { label: 'Templates', screen: 'dashboard' },
    { label: 'Settings', screen: 'dashboard' },
  ];
  return `
    <nav class="navbar">
      <div class="navbar-logo" data-nav="landing" style="cursor:pointer">
        <div class="logo-icon"><i data-lucide="zap"></i></div>
        TransformAI
      </div>
      <div class="navbar-links">
        ${links.map(l => `<button class="navbar-link ${state.currentScreen === l.screen ? 'active' : ''}" data-nav="${l.screen}">${l.label}</button>`).join('')}
      </div>
      <div class="navbar-right">
        <button class="btn btn-primary btn-sm" data-nav="create"><i data-lucide="plus" style="width:14px;height:14px"></i> New Project</button>
        <div class="avatar">NS</div>
      </div>
    </nav>`;
}

// ─── LANDING PAGE ────────────────────────────────────────────
function renderLanding() {
  return `
    <div class="landing">
      <nav class="navbar">
        <div class="navbar-logo">
          <div class="logo-icon"><i data-lucide="zap"></i></div>
          TransformAI
        </div>
        <div class="navbar-links">
          <button class="navbar-link" data-nav="dashboard">Dashboard</button>
          <button class="navbar-link" data-nav="create">Create</button>
        </div>
        <div class="navbar-right">
          <button class="btn btn-secondary btn-sm" data-nav="dashboard">Sign In</button>
          <button class="btn btn-primary btn-sm" data-nav="create">Get Started</button>
        </div>
      </nav>

      <section class="landing-hero fade-in">
        <h1>Transform one source into everything you need.</h1>
        <p class="subtitle">AI-powered content transformation for summaries, advisories, social posts, infographics, presentations and video packages.</p>
        <div class="landing-hero-ctas">
          <button class="btn btn-primary btn-lg" data-nav="create"><i data-lucide="plus"></i> Create Project</button>
          <button class="btn btn-secondary btn-lg" data-nav="dashboard"><i data-lucide="play"></i> View Demo</button>
        </div>

        <div class="hero-diagram">
          <div class="diagram-node diagram-node-source">Source Document</div>
          <div class="diagram-arrow"><i data-lucide="arrow-down"></i></div>
          <div class="diagram-node diagram-node-analysis">AI Analysis</div>
          <div class="diagram-arrow"><i data-lucide="arrow-down"></i></div>
          <div class="diagram-node diagram-node-canonical">Canonical Content</div>
          <div class="diagram-arrow"><i data-lucide="arrow-down"></i></div>
          <div class="diagram-outputs">
            <span class="diagram-output-pill">Summary</span>
            <span class="diagram-output-pill">Advisory</span>
            <span class="diagram-output-pill">Social</span>
            <span class="diagram-output-pill">Infographic</span>
            <span class="diagram-output-pill">Presentation</span>
          </div>
        </div>
      </section>

      <section class="landing-features slide-up">
        <div class="feature-card">
          <div class="feature-icon feature-icon-blue"><i data-lucide="scan-search"></i></div>
          <h3>Analyze Once</h3>
          <p>Upload or paste your source content. Our AI reads it once, extracts key information, and builds a canonical understanding that powers every output.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon feature-icon-green"><i data-lucide="users"></i></div>
          <h3>Audience-Aware</h3>
          <p>Configure audience, tone and objectives. Each output is tailored — an executive summary reads differently from a social post or a training advisory.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon feature-icon-purple"><i data-lucide="layers"></i></div>
          <h3>Multi-Format</h3>
          <p>Generate summaries, advisories, LinkedIn and X posts, infographics, presentations and video packages — all from a single source of truth.</p>
        </div>
      </section>
    </div>`;
}

// ─── DASHBOARD ───────────────────────────────────────────────
function renderDashboard() {
  return `
    <div class="dashboard-page fade-in">
      <div class="dashboard-header">
        <div>
          <h2>Good evening 👋</h2>
          <p class="subtitle">Transform information into communication-ready content.</p>
        </div>
        <button class="btn btn-primary" data-nav="create"><i data-lucide="plus"></i> New Project</button>
      </div>

      <div class="stats-grid">
        <div class="card stat-card">
          <div class="stat-label"><i data-lucide="folder"></i> Projects</div>
          <div class="stat-value">12</div>
          <div class="stat-change">+3 this week</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label"><i data-lucide="file-output"></i> Outputs Generated</div>
          <div class="stat-value">47</div>
          <div class="stat-change">+11 this week</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label"><i data-lucide="clock"></i> Time Saved</div>
          <div class="stat-value">18h</div>
          <div class="stat-change">~1.5h per project</div>
        </div>
        <div class="card stat-card">
          <div class="stat-label"><i data-lucide="activity"></i> Recent Activity</div>
          <div class="stat-value">6</div>
          <div class="stat-change">actions today</div>
        </div>
      </div>

      <div class="projects-section">
        <h3>Recent Projects</h3>
        <div class="projects-list">
          ${MOCK_PROJECTS.map(p => `
            <div class="card project-row card-interactive" data-nav="workspace" style="cursor:pointer">
              <div class="project-title">${p.title}</div>
              <div class="project-meta">${p.source}</div>
              <div class="project-meta">${p.outputs} outputs</div>
              <div class="project-meta">${p.updated}</div>
              <div><span class="badge ${p.status === 'Complete' ? 'badge-green' : 'badge-amber'}">${p.status}</span></div>
              <div><button class="btn-icon"><i data-lucide="arrow-right"></i></button></div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
}

// ─── CREATE PROJECT ──────────────────────────────────────────
function renderCreate() {
  const audiences = ['Executive', 'Technical', 'General Public', 'Students', 'Social Media'];
  const tones = ['Professional', 'Concise', 'Educational', 'Urgent', 'Conversational'];
  const objectives = ['Inform', 'Explain', 'Summarize', 'Persuade', 'Create Awareness'];
  const details = ['Brief', 'Standard', 'Detailed'];
  const outputs = [
    { key: 'summary', label: 'Executive Summary' },
    { key: 'advisory', label: 'Advisory' },
    { key: 'linkedin', label: 'LinkedIn Post' },
    { key: 'xpost', label: 'X Post' },
    { key: 'infographic', label: 'Infographic' },
    { key: 'presentation', label: 'Presentation' },
    { key: 'video', label: 'Video Package' },
  ];

  return `
    <div class="create-page fade-in">
      <h2>Create a new transformation</h2>
      <div class="create-layout">
        <div class="card source-card">
          <div class="source-tabs">
            <button class="source-tab active" data-tab="paste">Paste Text</button>
            <button class="source-tab" data-tab="upload">Upload Document</button>
          </div>
          <div class="source-body">
            <div id="tab-paste">
              <textarea class="form-textarea" id="source-input" rows="14" placeholder="Paste your report, article, advisory, research paper or other source content...">${state.sourceText || ''}</textarea>
              <div style="margin-top:10px; text-align:right;">
                <button class="btn btn-ghost btn-sm" id="load-sample">Load sample content</button>
              </div>
            </div>
            <div id="tab-upload" class="hidden">
              <div class="upload-zone" id="upload-zone">
                <i data-lucide="upload-cloud"></i>
                <p>Drop PDF, DOCX or TXT here</p>
                <span>or click to browse</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card settings-card">
          <h3>Transformation Settings</h3>
          <div class="form-group">
            <label class="form-label">Audience</label>
            <select class="form-select" id="sel-audience">${audiences.map(a => `<option ${a === state.audience ? 'selected' : ''}>${a}</option>`).join('')}</select>
          </div>
          <div class="form-group">
            <label class="form-label">Tone</label>
            <select class="form-select" id="sel-tone">${tones.map(t => `<option ${t === state.tone ? 'selected' : ''}>${t}</option>`).join('')}</select>
          </div>
          <div class="form-group">
            <label class="form-label">Objective</label>
            <select class="form-select" id="sel-objective">${objectives.map(o => `<option ${o === state.objective ? 'selected' : ''}>${o}</option>`).join('')}</select>
          </div>
          <div class="form-group">
            <label class="form-label">Detail Level</label>
            <select class="form-select" id="sel-detail">${details.map(d => `<option ${d === state.detail ? 'selected' : ''}>${d}</option>`).join('')}</select>
          </div>
          <div class="form-group">
            <label class="form-label">Outputs</label>
            <div class="output-checkboxes">
              ${outputs.map(o => `
                <label class="checkbox-item">
                  <input type="checkbox" value="${o.key}" ${state.selectedOutputs.includes(o.key) ? 'checked' : ''} />
                  ${o.label}
                </label>
              `).join('')}
            </div>
          </div>
          <div class="create-footer">
            <button class="btn btn-primary btn-lg" id="btn-analyze"><i data-lucide="sparkles"></i> Analyze Source</button>
          </div>
        </div>
      </div>
    </div>`;
}

// ─── ANALYSIS SCREEN ─────────────────────────────────────────
function renderAnalysis() {
  const steps = [
    { label: 'Reading source', status: 'done' },
    { label: 'Identifying key information', status: 'done' },
    { label: 'Building canonical content', status: state.analysisComplete ? 'done' : 'active' },
    { label: 'Preparing transformations', status: state.analysisComplete ? 'done' : 'pending' },
  ];

  return `
    <div class="analysis-page fade-in">
      <h2>${state.analysisComplete ? 'Analysis complete' : 'Understanding your source'}<span class="${state.analysisComplete ? '' : 'loading-dots'}"></span></h2>

      <div class="analysis-steps">
        ${steps.map(s => `
          <div class="analysis-step">
            <div class="step-icon ${s.status === 'done' ? 'step-done' : s.status === 'active' ? 'step-active' : 'step-pending'}">
              ${s.status === 'done' ? '<i data-lucide="check"></i>' : s.status === 'active' ? '<div class="step-spinner"></div>' : '<i data-lucide="circle"></i>'}
            </div>
            <span style="color: ${s.status === 'pending' ? 'var(--gray-400)' : 'var(--gray-800)'}">${s.label}</span>
          </div>
        `).join('')}
      </div>

      <div class="analysis-diagram">
        <div class="diagram-node diagram-node-source" style="font-size:0.75rem;padding:10px 20px">Source</div>
        <div class="diagram-arrow"><i data-lucide="arrow-down"></i></div>
        <div class="diagram-node diagram-node-analysis" style="font-size:0.75rem;padding:10px 20px">AI Analysis</div>
        <div class="diagram-arrow"><i data-lucide="arrow-down"></i></div>
        <div class="diagram-node diagram-node-canonical" style="font-size:0.75rem;padding:10px 20px">Canonical Content</div>
      </div>

      ${state.analysisComplete ? `
        <div class="analysis-results slide-up">
          <div class="card">
            <div class="result-row">
              <div class="result-label">Topic</div>
              <div class="result-value"><strong>${MOCK_ANALYSIS.topic}</strong></div>
            </div>
            <div class="result-row">
              <div class="result-label">Key Points</div>
              <div class="result-value">
                <ul>${MOCK_ANALYSIS.keyPoints.map(p => `<li>${p}</li>`).join('')}</ul>
              </div>
            </div>
            <div class="result-row">
              <div class="result-label">Entities</div>
              <div class="result-value">${MOCK_ANALYSIS.entities.map(e => `<span class="badge badge-blue" style="margin-right:4px;margin-bottom:4px">${e}</span>`).join('')}</div>
            </div>
            <div class="result-row">
              <div class="result-label">Key Facts</div>
              <div class="result-value"><strong>${MOCK_ANALYSIS.facts}</strong> extracted</div>
            </div>
            <div class="result-row">
              <div class="result-label">Confidence</div>
              <div class="result-value"><span class="badge badge-green">● ${MOCK_ANALYSIS.confidence}</span></div>
            </div>
          </div>
          <div class="analysis-continue">
            <button class="btn btn-primary btn-lg" data-nav="workspace"><i data-lucide="arrow-right"></i> Continue to Outputs</button>
          </div>
        </div>
      ` : ''}
    </div>`;
}

// ─── OUTPUT WORKSPACE ────────────────────────────────────────
function renderWorkspace() {
  const outputKeys = ['summary', 'advisory', 'linkedin', 'xpost', 'infographic', 'presentation', 'video'];
  const colorMap = { blue: 'blue', green: 'green', purple: 'purple', amber: 'amber', gray: 'gray' };

  return `
    <div class="workspace-layout">
      <aside class="sidebar">
        <div class="sidebar-project-name">Cybersecurity Awareness Report</div>
        <nav class="sidebar-nav">
          <button class="sidebar-link" data-nav="create"><i data-lucide="file-text"></i> Source</button>
          <button class="sidebar-link" data-nav="analysis"><i data-lucide="brain"></i> Analysis</button>
          <button class="sidebar-link active"><i data-lucide="layout-grid"></i> Outputs</button>
          <button class="sidebar-link" data-nav="history"><i data-lucide="history"></i> Versions</button>
        </nav>
      </aside>
      <main class="workspace-main">
        <div class="workspace-header">
          <div>
            <h2>Your outputs</h2>
            <p class="subtitle">Generated from the same canonical source.</p>
          </div>
          <div class="workspace-actions">
            <button class="btn btn-secondary btn-sm" id="btn-regen-all"><i data-lucide="refresh-cw"></i> Regenerate All</button>
            <button class="btn btn-primary btn-sm" id="btn-export-all"><i data-lucide="download"></i> Export All</button>
          </div>
        </div>
        <div class="outputs-grid">
          ${outputKeys.map(key => {
            const o = MOCK_OUTPUTS[key];
            const iconBg = `var(--${o.color}-50)`;
            const iconColor = `var(--${o.color === 'gray' ? 'gray-600' : o.color + '-500'})`;
            let navTarget = 'editor';
            if (key === 'infographic') navTarget = 'infographic';
            if (key === 'presentation') navTarget = 'presentation';
            if (key === 'video') navTarget = 'video';
            let extraPreview = '';
            if (key === 'presentation') extraPreview = '<div style="margin-top:6px"><span class="badge badge-amber">8 slides</span></div>';
            if (key === 'video') extraPreview = '<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap"><span class="badge badge-gray">Script</span><span class="badge badge-gray">Storyboard</span><span class="badge badge-gray">Narration</span><span class="badge badge-gray">Subtitles</span></div>';
            return `
              <div class="card output-card card-interactive" data-output="${key}" data-nav="${navTarget}">
                <div class="output-card-header">
                  <div class="output-type-icon" style="background:${iconBg};color:${iconColor}"><i data-lucide="${o.icon}"></i></div>
                  <span class="badge badge-green">Generated</span>
                </div>
                <div class="output-card-body">
                  <h4>${o.type}</h4>
                  <p class="preview-text">${o.preview}</p>
                  ${extraPreview}
                </div>
                <div class="output-card-footer">
                  <button class="btn btn-ghost btn-sm" data-nav="${navTarget}" data-output="${key}"><i data-lucide="external-link"></i> Open</button>
                  <div class="output-card-actions">
                    <button class="btn-icon" title="Edit" data-nav="${navTarget}" data-output="${key}"><i data-lucide="pencil"></i></button>
                    <button class="btn-icon btn-regen-single" title="Regenerate" data-output="${key}"><i data-lucide="refresh-cw"></i></button>
                  </div>
                </div>
              </div>`;
          }).join('')}
        </div>
      </main>
    </div>`;
}

// ─── OUTPUT EDITOR ───────────────────────────────────────────
function renderEditor() {
  const outputKeys = Object.keys(MOCK_OUTPUTS).filter(k => MOCK_OUTPUTS[k].content);
  const activeKey = state.activeEditorOutput || 'summary';
  const output = MOCK_OUTPUTS[activeKey];
  const content = output.content;

  return `
    <div class="editor-layout">
      <aside class="editor-sidebar">
        <div class="editor-sidebar-title">Outputs</div>
        ${outputKeys.map(k => `
          <button class="editor-nav-item ${k === activeKey ? 'active' : ''}" data-editor-output="${k}">
            <i data-lucide="${MOCK_OUTPUTS[k].icon}"></i>
            ${MOCK_OUTPUTS[k].type}
          </button>
        `).join('')}
        <div style="margin-top:auto;padding-top:20px;border-top:1px solid var(--gray-200);margin-top:24px;">
          <button class="editor-nav-item" data-nav="workspace"><i data-lucide="arrow-left"></i> Back to Outputs</button>
        </div>
      </aside>
      <main class="editor-main">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <h2>${content.title}</h2>
            <p class="text-sm text-muted" style="margin-top:2px">Audience: ${state.audience} · Tone: ${state.tone}</p>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-secondary btn-sm" data-nav="workspace"><i data-lucide="arrow-left"></i> Back</button>
            <button class="btn btn-primary btn-sm" id="btn-download-output"><i data-lucide="download"></i> Export</button>
          </div>
        </div>
        <div class="editor-content">
          ${content.sections.map(s => `
            ${s.heading ? `<h3>${s.heading}</h3>` : ''}
            <p>${s.text.replace(/\n/g, '<br>')} ${s.source ? `<span class="source-tag" data-source="${s.source}"><i data-lucide="link"></i> Source: ${s.source}</span>` : ''}</p>
          `).join('')}
        </div>
      </main>
      <aside class="editor-controls">
        <h4>AI Controls</h4>
        <div class="form-group">
          <label class="form-label">Tone</label>
          <select class="form-select" id="editor-tone">
            <option>Professional</option><option>Concise</option><option>Educational</option><option>Urgent</option><option>Conversational</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Audience</label>
          <select class="form-select" id="editor-audience">
            <option>Executive</option><option>Technical</option><option>General Public</option><option>Students</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Length</label>
          <select class="form-select">
            <option>Standard</option><option>Brief</option><option>Detailed</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Style</label>
          <select class="form-select">
            <option>Narrative</option><option>Bullet Points</option><option>Q&A</option>
          </select>
        </div>
        <div class="ai-actions">
          <h4>Quick Actions</h4>
          <button class="btn btn-secondary btn-sm" id="btn-improve"><i data-lucide="sparkles"></i> Improve</button>
          <button class="btn btn-secondary btn-sm" id="btn-shorten"><i data-lucide="minimize-2"></i> Shorten</button>
          <button class="btn btn-secondary btn-sm" id="btn-expand"><i data-lucide="maximize-2"></i> Expand</button>
          <button class="btn btn-blue btn-sm" id="btn-regen-editor"><i data-lucide="refresh-cw"></i> Regenerate</button>
        </div>
      </aside>
    </div>

    <div class="source-panel-overlay" id="source-panel-overlay">
      <div class="source-panel">
        <div class="source-panel-header">
          <h3>Source Passage</h3>
          <button class="btn-icon" id="close-source-panel"><i data-lucide="x"></i></button>
        </div>
        <p class="text-label" style="margin-bottom:12px" id="source-section-label">Section Reference</p>
        <div class="source-passage" id="source-passage-content">
          Phishing remains one of the most prevalent attack vectors affecting organizations worldwide. In 2024 alone, over 3.4 billion phishing emails were sent daily, representing a 58% increase from the previous year. These attacks have become increasingly sophisticated, utilizing AI-generated content to craft convincing messages that bypass traditional email filters.
        </div>
      </div>
    </div>`;
}

// ─── PRESENTATION PREVIEW ────────────────────────────────────
function renderPresentation() {
  const idx = state.activeSlide;
  const slide = MOCK_SLIDES[idx];

  return `
    <div class="pres-layout">
      <div class="pres-thumbnails">
        ${MOCK_SLIDES.map((s, i) => `
          <div class="pres-thumb ${i === idx ? 'active' : ''}" data-slide="${i}">
            <div class="pres-thumb-inner">${s.title}</div>
            <span class="pres-thumb-num">${i + 1}</span>
          </div>
        `).join('')}
      </div>
      <div class="pres-main">
        <div class="pres-slide fade-in">
          ${slide.type === 'title' ? `
            <h2 style="font-size:1.75rem;text-align:center">${slide.title}</h2>
            <p style="text-align:center;margin-top:8px">${slide.subtitle}</p>
          ` : `
            <h2>${slide.title}</h2>
            <ul>${slide.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
          `}
        </div>
        <div class="pres-info">Slide ${idx + 1} of ${MOCK_SLIDES.length}</div>
        ${slide.notes ? `
          <details class="pres-notes">
            <summary>Speaker Notes</summary>
            <p>${slide.notes}</p>
          </details>
        ` : ''}
      </div>
      <div class="pres-controls">
        <h4>Slide Controls</h4>
        <div class="pres-controls-btns">
          <button class="btn btn-secondary btn-sm" id="btn-regen-slide"><i data-lucide="refresh-cw"></i> Regenerate Slide</button>
          <button class="btn btn-secondary btn-sm" id="btn-simplify-slide"><i data-lucide="minimize-2"></i> Simplify</button>
          <button class="btn btn-secondary btn-sm" id="btn-detail-slide"><i data-lucide="maximize-2"></i> Add Detail</button>
          <button class="btn btn-secondary btn-sm" id="btn-tone-slide"><i data-lucide="message-square"></i> Change Tone</button>
        </div>
        <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--gray-200)">
          <h4>Navigation</h4>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn-secondary btn-sm" id="btn-prev-slide" ${idx === 0 ? 'disabled style="opacity:.4;pointer-events:none"' : ''}><i data-lucide="chevron-left"></i> Prev</button>
            <button class="btn btn-secondary btn-sm" id="btn-next-slide" ${idx === MOCK_SLIDES.length - 1 ? 'disabled style="opacity:.4;pointer-events:none"' : ''}>Next <i data-lucide="chevron-right"></i></button>
          </div>
        </div>
        <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--gray-200)">
          <button class="btn btn-primary btn-sm" style="width:100%" id="btn-download-pptx"><i data-lucide="download"></i> Download PPTX</button>
          <button class="btn btn-ghost btn-sm" style="width:100%;margin-top:8px" data-nav="workspace"><i data-lucide="arrow-left"></i> Back to Outputs</button>
        </div>
      </div>
    </div>`;
}

// ─── INFOGRAPHIC PREVIEW ─────────────────────────────────────
function renderInfographic() {
  return `
    <div class="infographic-page fade-in">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
        <div>
          <h2 style="font-size:1.375rem">Infographic Preview</h2>
          <p class="text-sm text-muted">Visual summary of your source content</p>
        </div>
        <button class="btn btn-secondary btn-sm" data-nav="workspace"><i data-lucide="arrow-left"></i> Back to Outputs</button>
      </div>

      <div class="infographic-canvas">
        <div class="infographic-title">Cybersecurity Awareness</div>
        <div class="infographic-subtitle">Protecting Organizations in the Digital Age</div>

        <div class="infographic-section-label">3 Key Risks</div>
        <div class="infographic-row">
          <div class="infographic-item infographic-risk">
            <div class="infographic-icon"><i data-lucide="mail-warning"></i></div>
            <h4>Phishing</h4>
            <p>3.4B emails daily, up 58% YoY</p>
          </div>
          <div class="infographic-item infographic-risk">
            <div class="infographic-icon"><i data-lucide="key-round"></i></div>
            <h4>Weak Passwords</h4>
            <p>87 passwords per employee on average</p>
          </div>
          <div class="infographic-item infographic-risk">
            <div class="infographic-icon"><i data-lucide="shield-off"></i></div>
            <h4>Account Compromise</h4>
            <p>43% of enterprises lack full MFA</p>
          </div>
        </div>

        <div class="infographic-section-label">3 Actions</div>
        <div class="infographic-row">
          <div class="infographic-item infographic-action">
            <div class="infographic-icon"><i data-lucide="search-check"></i></div>
            <h4>Verify Links</h4>
            <p>Train employees to inspect before clicking</p>
          </div>
          <div class="infographic-item infographic-action">
            <div class="infographic-icon"><i data-lucide="smartphone"></i></div>
            <h4>Use MFA</h4>
            <p>99.9% reduction in account compromise</p>
          </div>
          <div class="infographic-item infographic-action">
            <div class="infographic-icon"><i data-lucide="flag"></i></div>
            <h4>Report Suspicious Activity</h4>
            <p>Clear protocols save $2.66M per breach</p>
          </div>
        </div>
      </div>

      <div class="infographic-footer">
        <button class="btn btn-secondary" id="btn-regen-infographic"><i data-lucide="refresh-cw"></i> Regenerate Visual</button>
        <button class="btn btn-secondary"><i data-lucide="pencil"></i> Edit Content</button>
        <button class="btn btn-primary" id="btn-download-png"><i data-lucide="download"></i> Download PNG</button>
      </div>
    </div>`;
}

// ─── VIDEO PACKAGE ───────────────────────────────────────────
function renderVideo() {
  const tabs = ['Script', 'Storyboard', 'Narration', 'Subtitles', 'Visual Recommendations'];
  const activeTab = state.activeOutputTab || 'Script';

  return `
    <div class="video-page fade-in">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <h2>Video Production Package</h2>
          <p class="subtitle">Complete production materials for a 1:50 explainer video</p>
        </div>
        <button class="btn btn-secondary btn-sm" data-nav="workspace"><i data-lucide="arrow-left"></i> Back to Outputs</button>
      </div>

      <div class="video-tabs">
        ${tabs.map(t => `<button class="video-tab ${t === activeTab ? 'active' : ''}" data-video-tab="${t}">${t}</button>`).join('')}
      </div>

      <div class="video-script-content">
        ${activeTab === 'Script' || activeTab === 'Storyboard' ? `
          ${MOCK_SCENES.map(s => `
            <div class="card scene-card">
              <div class="scene-header">
                <div class="scene-num">${s.num}</div>
                <h4>${s.title}</h4>
              </div>
              ${activeTab === 'Script' ? `<p>${s.narration}</p>` : `<p style="color:var(--gray-500);font-style:italic">${s.visual}</p>`}
              <div class="scene-meta">
                <span><i data-lucide="clock" style="width:12px;height:12px;vertical-align:middle;margin-right:4px"></i>${s.duration}</span>
              </div>
            </div>
          `).join('')}
        ` : activeTab === 'Narration' ? `
          <div class="card" style="padding:28px">
            <h4 style="margin-bottom:16px">Full Narration Script</h4>
            <div style="font-size:0.9375rem;line-height:1.8;color:var(--gray-700)">
              ${MOCK_SCENES.map(s => `<p style="margin-bottom:16px"><span class="badge badge-gray" style="margin-right:8px">Scene ${s.num}</span>${s.narration}</p>`).join('')}
            </div>
            <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--gray-200);display:flex;gap:16px;font-size:0.8125rem;color:var(--gray-500)">
              <span>Word count: 184</span>
              <span>Estimated duration: 1:50</span>
              <span>Reading pace: ~150 WPM</span>
            </div>
          </div>
        ` : activeTab === 'Subtitles' ? `
          <div class="card" style="padding:28px">
            <h4 style="margin-bottom:16px">Subtitle Preview (SRT)</h4>
            <pre style="font-size:0.8125rem;line-height:1.8;color:var(--gray-700);background:var(--gray-50);padding:20px;border-radius:var(--radius-md);font-family:'Inter',sans-serif">1
00:00:00,000 --> 00:00:06,000
Every day, 3.4 billion phishing emails
flood inboxes worldwide.

2
00:00:06,000 --> 00:00:12,000
That is a 58 percent increase
from just one year ago.

3
00:00:12,000 --> 00:00:18,000
And with AI making these attacks more
convincing, traditional defenses fall short.

4
00:00:18,000 --> 00:00:25,000
Organizations that run regular security
awareness training see 70% fewer attacks.</pre>
          </div>
        ` : `
          <div class="card" style="padding:28px">
            <h4 style="margin-bottom:16px">Visual Recommendations</h4>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
              <div style="padding:20px;background:var(--gray-50);border-radius:var(--radius-md)">
                <h4 style="font-size:0.875rem;margin-bottom:8px"><i data-lucide="palette" style="width:14px;height:14px;vertical-align:middle;margin-right:6px"></i>Color Palette</h4>
                <p style="font-size:0.8125rem;color:var(--gray-600)">Deep navy backgrounds for data slides. White text for contrast. Blue and green accents for positive actions. Red accents for threat indicators.</p>
              </div>
              <div style="padding:20px;background:var(--gray-50);border-radius:var(--radius-md)">
                <h4 style="font-size:0.875rem;margin-bottom:8px"><i data-lucide="type" style="width:14px;height:14px;vertical-align:middle;margin-right:6px"></i>Typography</h4>
                <p style="font-size:0.8125rem;color:var(--gray-600)">Inter or similar modern sans-serif. Large stat callouts at 72pt. Body text at 24pt minimum for readability.</p>
              </div>
              <div style="padding:20px;background:var(--gray-50);border-radius:var(--radius-md)">
                <h4 style="font-size:0.875rem;margin-bottom:8px"><i data-lucide="film" style="width:14px;height:14px;vertical-align:middle;margin-right:6px"></i>Animation Style</h4>
                <p style="font-size:0.8125rem;color:var(--gray-600)">Clean motion graphics. Smooth counter animations for statistics. Fade-in text reveals timed to narration. No 3D effects.</p>
              </div>
              <div style="padding:20px;background:var(--gray-50);border-radius:var(--radius-md)">
                <h4 style="font-size:0.875rem;margin-bottom:8px"><i data-lucide="music" style="width:14px;height:14px;vertical-align:middle;margin-right:6px"></i>Audio</h4>
                <p style="font-size:0.8125rem;color:var(--gray-600)">Professional male or female voice. Calm, authoritative delivery. Subtle ambient background music. Increase tension slightly for threat sections.</p>
              </div>
            </div>
          </div>
        `}
      </div>

      <div class="video-footer">
        <button class="btn btn-secondary"><i data-lucide="refresh-cw"></i> Regenerate Package</button>
        <button class="btn btn-primary" id="btn-export-video"><i data-lucide="download"></i> Export Production Package</button>
      </div>
    </div>`;
}

// ─── PROJECT HISTORY ─────────────────────────────────────────
function renderHistory() {
  return `
    <div class="history-page fade-in">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32px">
        <div>
          <h2>Project History</h2>
          <p class="subtitle">Version history for Cybersecurity Awareness Report</p>
        </div>
        <button class="btn btn-secondary btn-sm" data-nav="workspace"><i data-lucide="arrow-left"></i> Back to Outputs</button>
      </div>

      <div class="history-timeline">
        ${MOCK_VERSIONS.map(v => `
          <div class="card history-item">
            <div class="history-version">Version ${v.version}</div>
            <h4>${v.label}</h4>
            <div class="history-date">${v.date}</div>
            <p style="font-size:0.8125rem;color:var(--gray-600);margin-bottom:14px">${v.detail}</p>
            <div class="history-actions">
              <button class="btn btn-secondary btn-sm" data-nav="workspace"><i data-lucide="eye"></i> View</button>
              ${v.version < 4 ? `<button class="btn btn-ghost btn-sm btn-restore" data-version="${v.version}"><i data-lucide="rotate-ccw"></i> Restore</button>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
}

// ─── EVENT LISTENERS ─────────────────────────────────────────
function attachEventListeners() {
  // Navigation
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = el.dataset.nav;
      if (el.dataset.output) {
        state.activeEditorOutput = el.dataset.output;
      }
      navigate(target);
    });
  });

  // Source tabs
  document.querySelectorAll('.source-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.source-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabName = tab.dataset.tab;
      document.getElementById('tab-paste').classList.toggle('hidden', tabName !== 'paste');
      document.getElementById('tab-upload').classList.toggle('hidden', tabName !== 'upload');
    });
  });

  // Load sample
  const loadSample = document.getElementById('load-sample');
  if (loadSample) {
    loadSample.addEventListener('click', () => {
      const textarea = document.getElementById('source-input');
      textarea.value = MOCK_SOURCE;
      state.sourceText = MOCK_SOURCE;
      showToast('Sample content loaded');
    });
  }

  // Analyze Source
  const btnAnalyze = document.getElementById('btn-analyze');
  if (btnAnalyze) {
    btnAnalyze.addEventListener('click', () => {
      const textarea = document.getElementById('source-input');
      if (textarea && textarea.value.trim().length > 20) {
        state.sourceText = textarea.value;
      } else {
        state.sourceText = MOCK_SOURCE;
      }
      // Save settings
      const selAudience = document.getElementById('sel-audience');
      const selTone = document.getElementById('sel-tone');
      const selObj = document.getElementById('sel-objective');
      const selDetail = document.getElementById('sel-detail');
      if (selAudience) state.audience = selAudience.value;
      if (selTone) state.tone = selTone.value;
      if (selObj) state.objective = selObj.value;
      if (selDetail) state.detail = selDetail.value;

      state.analysisComplete = false;
      navigate('analysis');
      // Simulate analysis completing
      setTimeout(() => {
        state.analysisComplete = true;
        render();
      }, 3000);
    });
  }

  // Slide navigation
  document.querySelectorAll('[data-slide]').forEach(thumb => {
    thumb.addEventListener('click', () => {
      state.activeSlide = parseInt(thumb.dataset.slide);
      render();
    });
  });
  const btnPrev = document.getElementById('btn-prev-slide');
  const btnNext = document.getElementById('btn-next-slide');
  if (btnPrev) btnPrev.addEventListener('click', () => { state.activeSlide = Math.max(0, state.activeSlide - 1); render(); });
  if (btnNext) btnNext.addEventListener('click', () => { state.activeSlide = Math.min(MOCK_SLIDES.length - 1, state.activeSlide + 1); render(); });

  // Video tabs
  document.querySelectorAll('[data-video-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      state.activeOutputTab = tab.dataset.videoTab;
      render();
    });
  });

  // Editor output switching
  document.querySelectorAll('[data-editor-output]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeEditorOutput = btn.dataset.editorOutput;
      render();
    });
  });

  // Source traceability panel
  document.querySelectorAll('.source-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.stopPropagation();
      const overlay = document.getElementById('source-panel-overlay');
      const label = document.getElementById('source-section-label');
      const passage = document.getElementById('source-passage-content');
      if (overlay) {
        label.textContent = tag.dataset.source;
        // Show appropriate source passage
        const sourceMap = {
          'Section 1, Paragraph 1': 'Phishing remains one of the most prevalent attack vectors affecting organizations worldwide. In 2024 alone, over 3.4 billion phishing emails were sent daily, representing a 58% increase from the previous year. These attacks have become increasingly sophisticated, utilizing AI-generated content to craft convincing messages that bypass traditional email filters.',
          'Sections 2-3': 'Employee awareness training has proven to be the most cost-effective measure against social engineering attacks. Organizations that conduct regular security awareness programs experience 70% fewer successful phishing attempts. Multi-factor authentication (MFA) remains a critical defense layer. Accounts protected by MFA are 99.9% less likely to be compromised compared to those relying solely on passwords.',
          'Sections 3-5': 'Despite this, only 57% of enterprise organizations have fully deployed MFA across their user base. Strong password policies, combined with password managers, can significantly reduce credential-based attacks. Organizations with a tested incident response plan reduce the average cost of a data breach by $2.66 million.',
          'Section 1': 'Phishing remains one of the most prevalent attack vectors affecting organizations worldwide. In 2024 alone, over 3.4 billion phishing emails were sent daily, representing a 58% increase from the previous year.',
          'Sections 3-4': 'Accounts protected by MFA are 99.9% less likely to be compromised compared to those relying solely on passwords. Despite this, only 57% of enterprise organizations have fully deployed MFA across their user base. The average employee manages 87 passwords, making password reuse a persistent vulnerability.',
          'Sections 2-5': 'Employee awareness training has proven to be the most cost-effective measure. Organizations with a tested incident response plan reduce the average cost of a data breach by $2.66 million. Regular tabletop exercises and clear communication protocols ensure teams can respond effectively.',
          'Full document': MOCK_SOURCE.substring(0, 400) + '...',
          'Section 1, 3': 'Phishing remains one of the most prevalent attack vectors. In 2024 alone, over 3.4 billion phishing emails were sent daily. Accounts protected by MFA are 99.9% less likely to be compromised.',
        };
        passage.textContent = sourceMap[tag.dataset.source] || MOCK_SOURCE.substring(0, 300) + '...';
        overlay.classList.add('open');
      }
    });
  });

  // Close source panel
  const closePanel = document.getElementById('close-source-panel');
  if (closePanel) {
    closePanel.addEventListener('click', () => {
      document.getElementById('source-panel-overlay').classList.remove('open');
    });
  }
  const overlay = document.getElementById('source-panel-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  }

  // Action buttons (mock interactions)
  const mockButtons = [
    { id: 'btn-regen-all', msg: 'All outputs regenerated' },
    { id: 'btn-export-all', msg: 'Exporting all outputs...' },
    { id: 'btn-improve', msg: 'Content improved' },
    { id: 'btn-shorten', msg: 'Content shortened' },
    { id: 'btn-expand', msg: 'Content expanded' },
    { id: 'btn-regen-editor', msg: 'Output regenerated' },
    { id: 'btn-regen-slide', msg: 'Slide regenerated' },
    { id: 'btn-simplify-slide', msg: 'Slide simplified' },
    { id: 'btn-detail-slide', msg: 'Detail added to slide' },
    { id: 'btn-tone-slide', msg: 'Slide tone updated' },
    { id: 'btn-download-pptx', msg: 'PPTX download started' },
    { id: 'btn-download-output', msg: 'Export started' },
    { id: 'btn-regen-infographic', msg: 'Infographic regenerated' },
    { id: 'btn-download-png', msg: 'PNG download started' },
    { id: 'btn-export-video', msg: 'Production package exported' },
  ];
  mockButtons.forEach(({ id, msg }) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', () => showToast(msg));
  });

  // Regenerate single output
  document.querySelectorAll('.btn-regen-single').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast(`${MOCK_OUTPUTS[btn.dataset.output]?.type || 'Output'} regenerated`);
    });
  });

  // Restore version
  document.querySelectorAll('.btn-restore').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast(`Restored to Version ${btn.dataset.version}`);
    });
  });

  // Editor AI controls — simulate tone/audience change
  const editorTone = document.getElementById('editor-tone');
  const editorAudience = document.getElementById('editor-audience');
  if (editorTone) {
    editorTone.addEventListener('change', () => {
      showToast(`Tone updated to ${editorTone.value}`);
    });
  }
  if (editorAudience) {
    editorAudience.addEventListener('change', () => {
      showToast(`Audience updated to ${editorAudience.value}`);
    });
  }
}

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  render();
});
