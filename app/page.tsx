'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowDown, ArrowDownRight, ArrowUpRight, BrainCircuit, Check, ChevronRight, ScanFace,
  Command, ExternalLink, Github, Linkedin, Mail, Menu, Moon, Search, Sparkles,
  Sun, X, Zap
} from 'lucide-react';

type Project = {
  id: string; number: string; name: string; label: string; category: string;
  description: string; status: string; stack: string[]; details: string[];
  architecture: string[]; workflow: string[]; link?: string;
};

const projects: Project[] = [
  {
    id: 'trace', number: '01', name: 'TRACE AI', label: 'EVIDENCE-BASED AI', category: 'AI Systems',
    description: 'A claim-verification MVP that checks statements against user-provided research excerpts or text-based PDFs.',
    status: 'MVP', stack: ['Python', 'Streamlit', 'TF-IDF', 'OpenRouter', 'PyMuPDF'],
    details: [
      'Extracts text from supported PDFs or accepts pasted source text, then splits it into overlapping chunks.',
      'Uses TF-IDF and cosine similarity to retrieve passages relevant to a claim before asking an OpenRouter-hosted LLM to classify it as SUPPORTED, CONTRADICTED, or INSUFFICIENT_EVIDENCE.',
      'Validates verdict labels, source IDs, and exact quote matches, then presents evidence with a downloadable JSON report.',
      'Known limits: it does not browse the web, scanned PDFs need OCR, lexical retrieval can miss paraphrases, and valid quotes do not prove semantic support.'
    ],
    architecture: ['Source text / PDF', 'Chunking', 'TF-IDF retrieval', 'LLM verdict', 'Quote + source validation', 'Evidence UI + JSON'],
    workflow: ['Ingest source', 'Rank passages', 'Classify claim', 'Validate evidence', 'Export report'],
    link: 'https://github.com/Shivasri137/TRACE-AI'
  },
  {
    id: 'flowbridge', number: '02', name: 'FlowBridge', label: 'MULTI-AGENT SYSTEMS', category: 'AI Systems',
    description: 'A modular multi-agent platform combining academic support and professional productivity workflows.',
    status: 'Project', stack: ['Python', 'Streamlit', 'Ollama', 'RAG', 'JSON', 'Matplotlib'],
    details: [
      'Brings together eight specialist agents: Exam Planner, Resource Collector, Doubt Solver, Mentor, Email Writer, Task Decomposer, Meeting Scheduler, and Insight Agent.',
      'Separates student-learning tools from professional productivity tools while keeping the application in one interface.',
      'The repository describes local LLMs through Ollama, RAG-supported doubt solving, local JSON storage, and progress visualisation.',
      'Useful next proof points include showing individual agent inputs and outputs, testing multi-step hand-offs, and documenting failure handling.'
    ],
    architecture: ['Student / professional mode', 'Agent selection', '8 specialist agents', 'Ollama + RAG', 'Local JSON + UI'],
    workflow: ['Choose a role', 'Select an agent', 'Run the task', 'Review output', 'Track progress'],
    link: 'https://github.com/Shivasri137/FlowBridgee'
  },
  {
    id: 'bodha', number: '03', name: 'BODHA.ai', label: 'AI LEARNING MENTOR', category: 'AI Products',
    description: 'A child-focused learning mentor designed to guide worksheet problem-solving with hints rather than simply giving answers.',
    status: 'MVP in progress', stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'LLM API'],
    details: [
      'The intended learner journey starts with uploading a worksheet and setting a class level, then receiving age-appropriate guidance.',
      'The product direction prioritises hints, short explanations, follow-up questions, and helping the learner do the reasoning.',
      'Core engineering challenges are reliable worksheet understanding, safe child-oriented instruction, good empty/error states, and evaluating whether guidance helps learning.',
      'The current repository README is still the default Next.js scaffold; the system diagram below is a proposed product flow, not a claim that every stage is already implemented.'
    ],
    architecture: ['Worksheet upload', 'Text / question extraction', 'Mentor API', 'Guidance generation', 'Hints + next step'],
    workflow: ['Upload worksheet', 'Choose class level', 'Identify a question', 'Receive a hint', 'Try + follow up'],
    link: 'https://github.com/Shivasri137/bodha.ai'
  },
  {
    id: 'jacket', number: '04', name: 'AI-Enabled Smart Jacket', label: 'AI + IOT · PATENT', category: 'AI Systems',
    description: 'A smart-jacket concept integrating health sensors, event detection, emergency alerts, and multimedia features.',
    status: 'Patent published', stack: ['Python', 'IoT Sensors', 'Embedded Systems', 'Computer Vision'],
    details: [
      'The supplied résumé describes SpO₂, heart-rate, and temperature sensors, a camera module, fall detection, emergency alerts, and multimedia controls.',
      'Patent publication number listed in the résumé: 202541020161 A; filing date listed as 06/03/2025.',
      'The portfolio does not make clinical-accuracy claims. Any technical case study should distinguish prototype testing from validated health-device performance.'
    ],
    architecture: ['Sensors + camera', 'Embedded processing', 'Event / fall logic', 'Alert trigger', 'User feedback'],
    workflow: ['Read sensor data', 'Process events', 'Check trigger rules', 'Notify / respond']
  },
  {
    id: 'grammar', number: '05', name: 'Grammar Correction Tool', label: 'NLP · LANGUAGE', category: 'AI Products',
    description: 'A transformer-based NLP tool for automated grammar correction and a clearer writing workflow.',
    status: 'Project', stack: ['Python', 'NLP', 'Transformers'],
    details: [
      'The supplied résumé describes a transformer-based grammar-correction tool with a Python inference pipeline.',
      'The résumé reports an improvement in writing accuracy; the underlying dataset and evaluation method were not provided here, so the portfolio does not treat that figure as independently verified.',
      'A stronger public case study would show before-and-after samples, a baseline, an evaluation dataset, and a reproducible metric.'
    ],
    architecture: ['Text input', 'Preprocessing', 'Transformer model', 'Correction output'],
    workflow: ['Paste text', 'Analyse sentence', 'Suggest correction', 'Review revised text']
  },
  {
    id: 'groomgraud', number: '06', name: 'GroomGraud', label: 'COMPUTER VISION', category: 'AI Systems',
    description: 'An AI-based grooming-attribute detection tool designed for image and live-camera input.',
    status: 'Project', stack: ['Python', 'OpenCV', 'Computer Vision', 'Classification'],
    details: [
      'The supplied résumé describes detection of attributes such as beard presence and haircut style from images and live-camera input.',
      'The project combines OpenCV-based image handling with machine-learning classification.',
      'No dataset, evaluation benchmark, or public repository link was supplied for this project; those should be added before making accuracy claims.'
    ],
    architecture: ['Image / camera', 'OpenCV processing', 'Attribute classifier', 'Visual result'],
    workflow: ['Capture image', 'Preprocess frame', 'Classify attributes', 'Show prediction']
  }
];

function ProjectCaseStudy({ project }: { project: Project }) {
  const [activeArchitecture, setActiveArchitecture] = useState(0);
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  useEffect(() => {
    setActiveArchitecture(0);
    setActiveWorkflow(0);
  }, [project.id]);

  const architectureDescription = project.details[Math.min(activeArchitecture, project.details.length - 1)]
    || 'This is a conceptual architecture stage. Add implementation-specific detail as the system evolves.';
  const workflowDescription = project.details[Math.min(activeWorkflow, project.details.length - 1)]
    || 'This is a conceptual workflow step. Add implementation-specific detail as the system evolves.';

  return (
    <div className="case-study-visuals">
      <section className="diagram-panel architecture-panel">
        <div className="diagram-heading">
          <span>01 / SYSTEM MAP</span>
          <small>SELECT A NODE TO EXPLORE</small>
        </div>
        <div className="diagram-instruction"><span className="diagram-live-dot" /> Interactive architecture <span className="diagram-muted">/ {project.architecture.length} stages</span></div>
        <div className="architecture-track" role="group" aria-label={project.name + ' architecture diagram'}>
          {project.architecture.map((node, index) => (
            <div className="architecture-step-wrap" key={node}>
              <button type="button" className={'architecture-node' + (activeArchitecture === index ? ' is-active' : '')} aria-pressed={activeArchitecture === index} onClick={() => setActiveArchitecture(index)}>
                <span className="diagram-node-index">{String(index + 1).padStart(2, '0')}</span>
                <strong>{node}</strong>
                <span className="diagram-node-pick">{activeArchitecture === index ? 'SELECTED' : 'EXPLORE'}</span>
              </button>
              {index < project.architecture.length - 1 && <div className={'architecture-arrow' + (activeArchitecture > index ? ' is-passed' : '')} aria-hidden="true"><ChevronRight size={16} /></div>}
            </div>
          ))}
        </div>
        <div className="diagram-detail" aria-live="polite">
          <div className="diagram-detail-index">STAGE {String(activeArchitecture + 1).padStart(2, '0')} <span>/ {String(project.architecture.length).padStart(2, '0')}</span></div>
          <div className="diagram-detail-body"><h4>{project.architecture[activeArchitecture]}</h4><p>{architectureDescription}</p></div>
          <div className="diagram-meter" aria-label={'Architecture stage ' + (activeArchitecture + 1) + ' of ' + project.architecture.length}><span style={{ width: (((activeArchitecture + 1) / project.architecture.length) * 100) + '%' }} /></div>
        </div>
        <p className="diagram-caption">Conceptual system map grounded in the available project description—not a claim that every stage has shipped exactly as shown.</p>
      </section>
      <section className="diagram-panel workflow-panel">
        <div className="diagram-heading">
          <span>02 / WORKFLOW</span>
          <small>STEP THROUGH THE JOURNEY</small>
        </div>
        <div className="workflow-toolbar">
          <span><i /> Workflow explorer</span>
          <span className="workflow-count">{String(activeWorkflow + 1).padStart(2, '0')} <b>/</b> {String(project.workflow.length).padStart(2, '0')}</span>
        </div>
        <div className="workflow-track" role="group" aria-label={project.name + ' workflow'}>
          {project.workflow.map((step, index) => (
            <button type="button" className={'workflow-step' + (activeWorkflow === index ? ' is-active' : '')} key={step} aria-pressed={activeWorkflow === index} onClick={() => setActiveWorkflow(index)}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
              <i className="workflow-step-indicator" />
            </button>
          ))}
        </div>
        <div className="workflow-detail" aria-live="polite">
          <span className="workflow-detail-label">CURRENT STEP · {String(activeWorkflow + 1).padStart(2, '0')}</span>
          <h4>{project.workflow[activeWorkflow]}</h4>
          <p>{workflowDescription}</p>
          <div className="workflow-controls">
            <button type="button" className="workflow-nav-button" onClick={() => setActiveWorkflow(value => Math.max(0, value - 1))} disabled={activeWorkflow === 0} aria-label="Previous workflow step">← Previous</button>
            <div className="workflow-progress-dots" aria-label={'Step ' + (activeWorkflow + 1) + ' of ' + project.workflow.length}>
              {project.workflow.map((step, index) => <button type="button" key={step} onClick={() => setActiveWorkflow(index)} className={activeWorkflow === index ? 'is-active' : ''} aria-label={'Go to step ' + (index + 1)} />)}
            </div>
            <button type="button" className="workflow-nav-button" onClick={() => setActiveWorkflow(value => Math.min(project.workflow.length - 1, value + 1))} disabled={activeWorkflow === project.workflow.length - 1} aria-label="Next workflow step">Next →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

const skillGroups = [
  {
    title: 'Programming & product development',
    items: ['Python', 'TypeScript', 'Next.js', 'Streamlit', 'Git & GitHub']
  },
  {
    title: 'Machine learning',
    items: ['Machine Learning', 'Deep Learning', 'TensorFlow / Keras', 'OpenCV']
  },
  {
    title: 'Generative AI & automation',
    items: ['LLMs & RAG', 'LangChain', 'Agno', 'Ollama', 'n8n', 'Prompt Engineering', 'Workflow Automation']
  }
];

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [filter, setFilter] = useState('All');
  const [projectSearch, setProjectSearch] = useState('');
  const [commandSearch, setCommandSearch] = useState('');
  const [selected, setSelected] = useState<Project | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSending, setContactSending] = useState(false);
  const [contactStatus, setContactStatus] = useState('');

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(value => !value);
      }
      if (event.key === 'Escape') {
        setCommandOpen(false);
        setSelected(null);
        setMobileOpen(false);
      }
    };
    const onScroll = () => setScrolled(window.scrollY > 450);
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll);
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const visibleProjects = useMemo(() => projects.filter(project => {
    const matchesFilter = filter === 'All' || project.category === filter;
    const haystack = [project.name, project.label, project.description, ...project.stack].join(' ').toLowerCase();
    return matchesFilter && haystack.includes(projectSearch.toLowerCase());
  }), [filter, projectSearch]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setCommandOpen(false);
    setMobileOpen(false);
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSending(true);
    setContactStatus('');
    const subject = encodeURIComponent('Portfolio enquiry from ' + contactForm.name);
    const body = encodeURIComponent(contactForm.message + '\n\nFrom: ' + contactForm.name + ' <' + contactForm.email + '>');
    const mailto = 'mailto:hello.shivasri@gmail.com?subject=' + subject + '&body=' + body;
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok) {
        setContactStatus("Message sent. Thank you for reaching out.");
        setContactForm({ name: '', email: '', message: '' });
      } else if (response.status === 503) {
        setContactStatus("Email delivery isn't configured on this deployment yet. Opening your email app instead.");
        window.location.href = mailto;
      } else {
        setContactStatus(result.error || 'The message could not be sent. Please use the email link.');
      }
    } catch {
      setContactStatus('Could not reach the contact service. Opening your email app instead.');
      window.location.href = mailto;
    } finally {
      setContactSending(false);
    }
  };

  const commands = [
    { label: 'Home', hint: 'Back to the introduction', id: 'home' },
    { label: 'Selected work', hint: 'Projects and case studies', id: 'work' },
    { label: 'Experience', hint: 'Internships and education', id: 'experience' },
    { label: 'About', hint: 'Background and approach', id: 'about' }
    { label: 'Toolkit', hint: 'Skills and technologies', id: 'toolkit' },
    { label: 'Contact', hint: 'Start a conversation', id: 'contact' }
  ];

  return (
    <main className="site-shell" data-theme={theme}>
      <div className="ambient-grain" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Shiva Sri home">
          <span className="wordmark-icon">S<span>.</span></span>
          <span className="wordmark-name">SHIVA SRI<small>AI / ML ENGINEER</small></span>
        </a>
        <nav className={mobileOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#work" onClick={() => setMobileOpen(false)}>Work <span>01</span></a>
          <a href="#experience" onClick={() => setMobileOpen(false)}>Experience <span>02</span></a>
          <a href="#about" onClick={() => setMobileOpen(false)}>About <span>03</span></a>
          <a href="#toolkit" onClick={() => setMobileOpen(false)}>Toolkit <span>04</span></a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>Contact <span>06</span></a>
          <button className="mobile-theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} Switch theme
          </button>
        </nav>
        <div className="header-actions">
          <button className="icon-btn theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle colour theme">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="quick-find" onClick={() => setCommandOpen(true)}><Search size={15} /><span>Quick find</span><kbd>Ctrl K</kbd></button>
          <button className="icon-btn menu-btn" onClick={() => setMobileOpen(value => !value)} aria-label="Toggle navigation">
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <section className="hero-banner" id="home" aria-label="Shiva Sri portfolio introduction">
        <div className="hero-banner-image">
          <Image
            src="/shiva-portfolio-banner-v2.webp"
            alt="Shiva Sri in her cream blazer against a deep forest-green background"
            width={1200}
            height={465}
            priority
            sizes="100vw"
          />
          <div className="hero-banner-copy">
            <p className="banner-eyebrow"><span /> OPEN TO AI/ML ENGINEERING ROLES</p>
            <h1>Building useful<br /><em>AI systems.</em></h1>
            <p className="banner-skills">PYTHON <b>·</b> GENAI <b>·</b> RAG <b>·</b> AI AGENTS</p>
            <a className="banner-open" href="#work"><span /> EXPLORE THE WORK <ArrowDownRight size={15} /></a>
          </div>
        </div>
        <div className="banner-underbar">
          <div className="banner-underbar-copy">
            <p className="mini-overline">SHIVA SRI JONNALA · AI / ML</p>
            <p>B.Tech AI & ML graduate building Python, LLM and RAG-powered applications. Based in Hyderabad, India.</p>
          </div>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#work">View selected projects <ArrowDownRight size={17} /></a>
            <a className="btn btn-ghost" href="https://www.linkedin.com/in/shivasrijonnala/" target="_blank" rel="noreferrer">LinkedIn <Linkedin size={16} /><ArrowUpRight size={14} /></a>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Areas of interest">
        <div>LLMS <b>✳</b> RAG <b>✳</b> AI AGENTS <b>✳</b> COMPUTER VISION <b>✳</b> PRODUCT ENGINEERING <b>✳</b> LLMS <b>✳</b> RAG <b>✳</b> AI AGENTS <b>✳</b> COMPUTER VISION <b>✳</b> PRODUCT ENGINEERING <b>✳</b></div>
      </section>

      <section className="manifesto section-pad reveal">
        <p className="section-overline"><span>00 / PRINCIPLE</span><span>LESS HYPE. MORE PROOF.</span></p>
        <h2>I don’t want AI to look impressive.<br /><em>I want it to be useful.</em></h2>
        <p className="manifesto-copy">I’m interested in systems that solve a real problem, explain their limits, and feel clear to the people using them.</p>
      </section>

      <section id="work" className="work-section section-pad">
        <div className="section-heading reveal">
          <div><p className="section-overline"><span>01 / SELECTED WORK</span><span>PROJECTS & EXPERIMENTS</span></p><h2>Things I’ve<br /><em>been building.</em></h2></div>
          <p>Each project is an opportunity to test an idea, work through trade-offs, and make something people can actually use.</p>
        </div>
        <div className="project-controls reveal">
          <div className="filter-tabs" role="group" aria-label="Filter projects">
            {['All', 'AI Systems', 'AI Products'].map(item => (
              <button key={item} className={filter === item ? 'filter-tab active' : 'filter-tab'} onClick={() => setFilter(item)}>{item}</button>
            ))}
          </div>
          <label className="project-search"><Search size={15} /><input value={projectSearch} onChange={event => setProjectSearch(event.target.value)} placeholder="Find a project…" aria-label="Search projects" />{projectSearch && <button onClick={() => setProjectSearch('')} aria-label="Clear search"><X size={14} /></button>}</label>
        </div>
        <div className="project-grid">
          {visibleProjects.map(project => (
            <button
              key={project.id}
              className={'project-card project-' + project.id + ' reveal'}
              onClick={() => setSelected(project)}
              onPointerMove={event => {
                if (event.pointerType === 'touch') return;
                const rect = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                event.currentTarget.style.setProperty('--tilt-x', ((x - 0.5) * 6).toFixed(2) + 'deg');
                event.currentTarget.style.setProperty('--tilt-y', ((0.5 - y) * 5).toFixed(2) + 'deg');
                event.currentTarget.style.setProperty('--glow-x', (x * 100).toFixed(1) + '%');
                event.currentTarget.style.setProperty('--glow-y', (y * 100).toFixed(1) + '%');
              }}
              onPointerLeave={event => {
                event.currentTarget.style.setProperty('--tilt-x', '0deg');
                event.currentTarget.style.setProperty('--tilt-y', '0deg');
                event.currentTarget.style.setProperty('--glow-x', '50%');
                event.currentTarget.style.setProperty('--glow-y', '30%');
              }}
            >
              <div className="project-art">
                <div className="art-grid" />
                <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
                <div className="project-art-symbol">
                  {project.id === 'trace' ? <Command size={52} strokeWidth={1} /> : project.id === 'flowbridge' ? <BrainCircuit size={58} strokeWidth={1} /> : project.id === 'bodha' ? <Sparkles size={54} strokeWidth={1} /> : project.id === 'jacket' ? <Zap size={54} strokeWidth={1} /> : project.id === 'groomgraud' ? <ScanFace size={54} strokeWidth={1} /> : <span className="grammar-symbol">Aa</span>}
                </div>
                <div className="mini-architecture" aria-hidden="true"><i /><b /><i /><b /><i /></div>
                <span className="project-number">{project.number} / 06</span><span className="project-status">{project.status}</span><span className="project-open"><ArrowUpRight size={19} /></span>
              </div>
              <div className="project-info">
                <span className="project-label">{project.label}</span><h3>{project.name}</h3><p>{project.description}</p>
                <div className="tag-list">{project.stack.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
                <span className="know-more-pill">Know more <ArrowUpRight size={14} /></span>
              </div>
            </button>
          ))}
        </div>
        {visibleProjects.length === 0 && <div className="empty-state">Nothing matched that search. Try another term.</div>}
        <p className="work-note"><span><i /> PROJECTS, NOT PROMISES</span><span>Details and statuses reflect the current known scope.</span></p>
      </section>

      <section id="experience" className="experience-section section-pad">
        <div className="section-heading reveal">
          <div>
            <p className="section-overline"><span>02 / EXPERIENCE</span><span>INDUSTRY & LEARNING</span></p>
            <h2>Experience that<br /><em>shapes how I build.</em></h2>
          </div>
          <p>Early-career experience across web development, digital product work and AI-focused projects, supported by a strong academic foundation.</p>
        </div>
        <div className="experience-grid">
          <div className="experience-list">
            <article className="experience-card reveal">
              <div className="experience-card-top"><span className="experience-kind">PROJECT EXPERIENCE</span><span className="experience-date">DIGITAL CONNECT</span></div>
              <h3>Digital Design & Web Projects</h3>
              <p className="experience-role">Digital Connect</p>
              <p>Contributed to website and UI work, digital design, SEO support and practical workflow automation tasks.</p>
              <div className="tag-list"><span>Web & UI</span><span>Digital design</span><span>SEO</span><span>Automation</span></div>
            </article>
            <article className="experience-card reveal">
              <div className="experience-card-top"><span className="experience-kind">VIRTUAL INTERNSHIP</span><span className="experience-date">AUG – OCT 2025</span></div>
              <h3>Front-End Web Development Intern</h3>
              <p className="experience-role">Edunet Foundation · AICTE · IBM SkillsBuild</p>
              <p>Completed a structured virtual internship focused on front-end web development and practical web application fundamentals.</p>
              <div className="tag-list"><span>Front-end development</span><span>IBM SkillsBuild</span><span>AICTE</span></div>
            </article>
          </div>
          <aside className="education-card reveal">
            <p className="mini-overline">EDUCATION</p>
            <span className="education-period">2022 — 2026</span>
            <h3>B.Tech · Computer Science & Engineering</h3>
            <p className="education-specialisation">Artificial Intelligence & Machine Learning</p>
            <p className="education-institution">Nalla Malla Reddy Engineering College</p>
            <div className="education-score"><strong>9.5</strong><span>/ 10.0<br />CGPA</span></div>
            <div className="education-divider" />
            <p className="mini-overline">PUBLISHED PATENT</p>
            <h4>AI-Enabled Smart Jacket</h4>
            <p className="education-institution">Patent publication 202541020161 A · 2025</p>
          </aside>
        </div>
      </section>

      <section id="about" className="about-section section-pad">
        <div className="section-heading reveal">
          <div><p className="section-overline"><span>03 / ABOUT</span><span>BEYOND THE CODE</span></p><h2>Engineer by practice.<br /><em>Builder by instinct.</em></h2></div>
          <p>I like moving from an unclear problem to a working prototype — then asking harder questions about reliability, usability, and what to improve next.</p>
        </div>
        <div className="about-grid">
          <div className="about-photo-card reveal">
            <div className="about-photo-frame">
              <Image src="/shiva-portrait.webp" alt="Shiva Sri smiling at a laptop in a cream and black striped sweater" width={420} height={630} sizes="(max-width: 800px) 90vw, 34vw" />
              <div className="about-photo-overlay"><span>SHIVA SRI JONNALA</span><span>AI / ML ENGINEER</span></div>
            </div>
            <div className="about-photo-foot"><span><i /> BUILD · TEST · LEARN · REPEAT</span><span>IN / HYDERABAD</span></div>
          </div>
          <div className="about-details reveal">
            <p className="about-lead">I build AI/ML applications, LLM-powered workflows, multi-agent systems, and practical web experiences.</p>
            <p>My projects span evidence-based claim verification, learning support, computer vision, and AI + IoT. I care about describing what a system actually does, showing its architecture, and being clear about limitations as well as strengths.</p>
            <div className="facts-grid">
              <div><span>EDUCATION</span><strong>B.Tech · AI & ML</strong><small>Nalla Malla Reddy Engineering College</small></div>
              <div><span>ACADEMICS</span><strong>9.5 / 10.0 GPA</strong><small>Graduation period listed: 2022–2026</small></div>
              <div><span>INTELLECTUAL PROPERTY</span><strong>Published patent</strong><small>202541020161 A</small></div>
              <div><span>FOCUS AREAS</span><strong>LLMs · RAG · AI agents</strong><small>Computer vision · product engineering</small></div>
            </div>
            <div className="linkedin-highlights">
              <p className="section-overline"><span>LINKEDIN / SELECTED HIGHLIGHTS</span><span>OPEN PROFILE ↗</span></p>
              <a className="linkedin-feature-card" href="https://www.linkedin.com/in/shivasrijonnala/" target="_blank" rel="noreferrer">
                <div className="linkedin-feature-mark"><Linkedin size={22} /></div>
                <div className="linkedin-feature-copy"><span>ARTICLE · AUG 2025</span><strong>Agentic AI: Unlocking the Power of Autonomous Intelligence</strong><p>A published article exploring agentic AI.</p></div>
                <span className="linkedin-feature-arrow"><ArrowUpRight size={20} /></span>
              </a>
              <a className="linkedin-feature-card" href="https://www.linkedin.com/in/shivasrijonnala/" target="_blank" rel="noreferrer">
                <div className="linkedin-feature-mark linkedin-project-mark"><BrainCircuit size={21} /></div>
                <div className="linkedin-feature-copy"><span>PROJECT LISTING</span><strong>FlowBridge — Productivity Automation across Classroom and Career</strong><p>Multi-agent AI platform listed on my LinkedIn profile.</p></div>
                <span className="linkedin-feature-arrow"><ArrowUpRight size={20} /></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="toolkit" className="toolkit-section section-pad">
        <div className="section-heading reveal">
          <div><p className="section-overline"><span>04 / TOOLKIT</span><span>TOOLS I WORK WITH</span></p><h2>Technical by choice.<br /><em>Curious by nature.</em></h2></div>
          <p>A practical toolkit across machine learning, language models, and product engineering. Familiarity varies by tool and project.</p>
        </div>
        <div className="toolkit-layout">
          <div className="toolkit-card reveal"><div className="toolkit-icon"><BrainCircuit size={25} /></div><span className="mini-overline">THE MINDSET</span><h3>The stack is a tool.<br />The problem is the point.</h3><p>I choose technologies based on the job to be done, not the trend of the week.</p><div className="toolkit-footer"><span>AI / ML</span><span>PRODUCT</span><span>ENGINEERING</span></div></div>
          <div className="skills-groups reveal">
            {skillGroups.map(group => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="skills-cloud">{group.items.map(skill => <span key={skill} className="skill-chip"><i />{skill}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section section-pad">
        <p className="section-overline reveal"><span>05 / PROCESS</span><span>HOW IDEAS BECOME PRODUCTS</span></p>
        <div className="process-grid">
          {[['01', 'Understand', 'Define the user, the problem, and what a useful result looks like.'], ['02', 'Prototype', 'Build the smallest complete version that can be tested.'], ['03', 'Evaluate', 'Check real behaviour, edge cases, and failure modes.'], ['04', 'Refine', 'Improve the experience and document what changed.']].map(step => (
            <article className="process-step reveal" key={step[0]}><span>{step[0]}</span><div className="process-rule"><i /></div><h3>{step[1]}</h3><p>{step[2]}</p></article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section section-pad">
        <div className="contact-glow glow-one" /><div className="contact-glow glow-two" />
        <p className="section-overline reveal"><span>06 / CONTACT</span><span>GOOD THINGS START WITH A CONVERSATION</span></p>
        <div className="contact-layout">
          <div className="contact-main reveal"><p className="mini-overline">HAVE A PROBLEM WORTH SOLVING?</p><h2>Let’s make<br /><em>something matter.</em></h2><p className="contact-description">Open to entry-level AI/ML Engineer, Generative AI Engineer and Python Developer opportunities. I’m also interested in teams building practical LLM-powered products.</p>
            <div className="contact-actions"><a className="btn btn-primary" href="mailto:hello.shivasri@gmail.com?subject=Let%E2%80%99s%20connect">Email me <Mail size={16} /></a><a className="btn btn-ghost" href="https://github.com/Shivasri137" target="_blank" rel="noreferrer">GitHub <Github size={16} /><ArrowUpRight size={14} /></a><a className="btn btn-ghost" href="https://www.linkedin.com/in/shivasrijonnala/" target="_blank" rel="noreferrer">LinkedIn <Linkedin size={16} /><ArrowUpRight size={14} /></a></div>
            <p className="contact-location">India · Open to relevant opportunities and collaborations</p>
          </div>
          <form className="contact-form reveal" onSubmit={submitContact}>
            <div className="contact-form-heading"><span>DIRECT MESSAGE</span><small>REPLY BY EMAIL</small></div>
            <label>Your name<input name="name" autoComplete="name" required maxLength={100} value={contactForm.name} onChange={event => setContactForm({ ...contactForm, name: event.target.value })} placeholder="Your name" /></label>
            <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} value={contactForm.email} onChange={event => setContactForm({ ...contactForm, email: event.target.value })} placeholder="you@company.com" /></label>
            <label>What would you like to discuss?<textarea name="message" rows={4} required minLength={10} maxLength={5000} value={contactForm.message} onChange={event => setContactForm({ ...contactForm, message: event.target.value })} placeholder="A role, a project, or an idea…" /></label>
            <button className="btn btn-primary contact-submit" type="submit" disabled={contactSending}>{contactSending ? 'Sending…' : 'Send message'} <ArrowUpRight size={16} /></button>
            {contactStatus && <p className="contact-form-status" role="status">{contactStatus}</p>}
            <p className="contact-form-note">If email delivery is not configured yet, this form opens your email app as a fallback.</p>
          </form>
        </div>
        <div className="contact-bottom"><span>SHIVA SRI © 2026</span><span>BUILT WITH CURIOSITY <b>✳</b></span><a href="#home">BACK TO TOP ↑</a></div>
      </section><footer className="site-footer"><a className="wordmark" href="#home"><span className="wordmark-icon">S<span>.</span></span><span className="wordmark-name">SHIVA SRI<small>AI / ML ENGINEER</small></span></a><p>Designed to evolve as the work does.</p><button onClick={() => setCommandOpen(true)}><Command size={14} /> Explore with commands</button></footer>

      {scrolled && <button className="back-to-top" onClick={() => goTo('home')} aria-label="Back to top"><ArrowUpRight size={18} /></button>}

      {commandOpen && <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setCommandOpen(false); }}><div className="command-modal" role="dialog" aria-modal="true" aria-label="Quick navigation"><div className="command-input"><Search size={17} /><input autoFocus value={commandSearch} onChange={event => setCommandSearch(event.target.value)} placeholder="Search sections and projects…" /><kbd>ESC</kbd><button onClick={() => setCommandOpen(false)} aria-label="Close quick navigation"><X size={16} /></button></div><p className="modal-label">JUMP TO</p>{commands.filter(item => (item.label + item.hint).toLowerCase().includes(commandSearch.toLowerCase())).map(item => <button className="command-row" key={item.id} onClick={() => goTo(item.id)}><span><b>{item.label}</b><small>{item.hint}</small></span><ChevronRight size={16} /></button>)}<div className="command-help">TIP: PRESS CTRL + K ANYTIME</div></div></div>}

      {selected && <div className="modal-backdrop project-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null); }}><article className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="project-title"><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project details"><X size={19} /></button><div className={'detail-art detail-' + selected.id}><div className="art-grid" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="detail-symbol">{selected.id === 'trace' ? <Command size={58} strokeWidth={1} /> : selected.id === 'flowbridge' ? <BrainCircuit size={62} strokeWidth={1} /> : selected.id === 'bodha' ? <Sparkles size={58} strokeWidth={1} /> : selected.id === 'jacket' ? <Zap size={58} strokeWidth={1} /> : selected.id === 'groomgraud' ? <ScanFace size={58} strokeWidth={1} /> : <span className="grammar-symbol">Aa</span>}</div><span>{selected.status}</span></div><div className="detail-content"><p className="mini-overline">{selected.label} / PROJECT {selected.number}</p><h2 id="project-title">{selected.name}</h2><p className="detail-description">{selected.description}</p><h3>Intent & approach</h3><ul>{selected.details.map(detail => <li key={detail}>{detail}</li>)}</ul><ProjectCaseStudy project={selected} /><h3>Technology</h3><div className="tag-list detail-tags">{selected.stack.map(tag => <span key={tag}>{tag}</span>)}</div><div className="detail-actions">{selected.link && <a className="btn btn-primary" href={selected.link} target="_blank" rel="noreferrer">View GitHub repository <ExternalLink size={15} /></a>}<button className="btn btn-ghost" onClick={() => { setSelected(null); goTo('contact'); }}>Discuss this project <ArrowDownRight size={15} /></button></div><p className="detail-disclaimer">Diagrams are high-level summaries, not guarantees of every implementation detail. Add verified demos, screenshots, and evaluation results as they become available.</p></div></article></div>}
    </main>
  );