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
  return (
    <div className="case-study-visuals">
      <section className="diagram-panel">
        <div className="diagram-heading">
          <span>01 / SYSTEM MAP</span>
          <small>HIGH-LEVEL ARCHITECTURE</small>
        </div>
        <div className="architecture-track">
          {project.architecture.map((node, index) => (
            <div className="architecture-step-wrap" key={node}>
              <div className="architecture-node">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{node}</strong>
              </div>
              {index < project.architecture.length - 1 && <div className="architecture-arrow" aria-hidden="true"><ChevronRight size={15} /></div>}
            </div>
          ))}
        </div>
        <p className="diagram-caption">Conceptual system map based on the available project description. Implementation details may differ.</p>
      </section>
      <section className="diagram-panel workflow-panel">
        <div className="diagram-heading">
          <span>02 / WORKFLOW</span>
          <small>FROM INPUT TO OUTPUT</small>
        </div>
        <div className="workflow-track">
          {project.workflow.map((step, index) => (
            <div className="workflow-step" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const skills = [
  'Python', 'Machine Learning', 'Deep Learning', 'LLMs & RAG', 'Agentic AI',
  'TensorFlow / Keras', 'PyTorch', 'OpenCV', 'SQL', 'Next.js', 'TypeScript',
  'Streamlit', 'Flask', 'Git & GitHub', 'n8n', 'Ollama'
];

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
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
    return matchesFilter && haystack.includes(search.toLowerCase());
  }), [filter, search]);

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
    const body = encodeURIComponent(contactForm.message + '\\n\\nFrom: ' + contactForm.name + ' <' + contactForm.email + '>');
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
    { label: 'About', hint: 'Background and approach', id: 'about' },
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
          <a href="#about" onClick={() => setMobileOpen(false)}>About <span>02</span></a>
          <a href="#toolkit" onClick={() => setMobileOpen(false)}>Toolkit <span>03</span></a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>Contact <span>04</span></a>
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
            src="/shiva-header-banner.webp"
            alt="Professional portfolio hero image of Shiva Sri in a cream suit against a deep green modern workspace"
            width={1024}
            height={440}
            priority
            sizes="100vw"
          />
        </div>
        <div className="banner-underbar">
          <div className="banner-underbar-copy">
            <p className="mini-overline">SHIVA SRI · AI / ML ENGINEER</p>
            <p>Building intelligent systems and thoughtful digital experiences.</p>
          </div>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#work">Explore my work <ArrowDownRight size={17} /></a>
            <a className="btn btn-ghost" href="#contact">Let’s connect <ArrowUpRight size={16} /></a>
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
          <label className="project-search"><Search size={15} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Find a project…" aria-label="Search projects" />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={14} /></button>}</label>
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
                <span className="project-number">{project.number} / 05</span><span className="project-status">{project.status}</span><span className="project-open"><ArrowUpRight size={19} /></span>
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

      <section id="about" className="about-section section-pad">
        <div className="section-heading reveal">
          <div><p className="section-overline"><span>02 / ABOUT</span><span>BEYOND THE CODE</span></p><h2>Engineer by practice.<br /><em>Builder by instinct.</em></h2></div>
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
              <div><span>ACADEMICS</span><strong>9.05 / 10.0 GPA</strong><small>Graduation period listed: 2022–2026</small></div>
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
          <div><p className="section-overline"><span>03 / TOOLKIT</span><span>TOOLS I WORK WITH</span></p><h2>Technical by choice.<br /><em>Curious by nature.</em></h2></div>
          <p>A practical toolkit across machine learning, language models, and product engineering. Familiarity varies by tool and project.</p>
        </div>
        <div className="toolkit-layout">
          <div className="toolkit-card reveal"><div className="toolkit-icon"><BrainCircuit size={25} /></div><span className="mini-overline">THE MINDSET</span><h3>The stack is a tool.<br />The problem is the point.</h3><p>I choose technologies based on the job to be done, not the trend of the week.</p><div className="toolkit-footer"><span>AI / ML</span><span>PRODUCT</span><span>ENGINEERING</span></div></div>
          <div className="skills-cloud reveal">{skills.map((skill, index) => <span key={skill} className={'skill-chip chip-' + (index % 4)}><i />{skill}</span>)}</div>
        </div>
      </section>

      <section className="process-section section-pad">
        <p className="section-overline reveal"><span>04 / PROCESS</span><span>HOW IDEAS BECOME PRODUCTS</span></p>
        <div className="process-grid">
          {[['01', 'Understand', 'Define the user, the problem, and what a useful result looks like.'], ['02', 'Prototype', 'Build the smallest complete version that can be tested.'], ['03', 'Evaluate', 'Check real behaviour, edge cases, and failure modes.'], ['04', 'Refine', 'Improve the experience and document what changed.']].map(step => (
            <article className="process-step reveal" key={step[0]}><span>{step[0]}</span><div className="process-rule"><i /></div><h3>{step[1]}</h3><p>{step[2]}</p></article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section section-pad">
        <div className="contact-glow glow-one" /><div className="contact-glow glow-two" />
        <p className="section-overline reveal"><span>05 / CONTACT</span><span>GOOD THINGS START WITH A CONVERSATION</span></p>
        <div className="contact-layout">
          <div className="contact-main reveal"><p className="mini-overline">HAVE A PROBLEM WORTH SOLVING?</p><h2>Let’s make<br /><em>something matter.</em></h2><p className="contact-description">Open to AI/ML engineering opportunities, collaborations, and thoughtful conversations about products built with AI.</p>
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

      {commandOpen && <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setCommandOpen(false); }}><div className="command-modal" role="dialog" aria-modal="true" aria-label="Quick navigation"><div className="command-input"><Search size={17} /><input autoFocus value={search} onChange={event => setSearch(event.target.value)} placeholder="Search sections and projects…" /><kbd>ESC</kbd><button onClick={() => setCommandOpen(false)} aria-label="Close quick navigation"><X size={16} /></button></div><p className="modal-label">JUMP TO</p>{commands.filter(item => (item.label + item.hint).toLowerCase().includes(search.toLowerCase())).map(item => <button className="command-row" key={item.id} onClick={() => goTo(item.id)}><span><b>{item.label}</b><small>{item.hint}</small></span><ChevronRight size={16} /></button>)}<div className="command-help">TIP: PRESS CTRL + K ANYTIME</div></div></div>}

      {selected && <div className="modal-backdrop project-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null); }}><article className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="project-title"><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project details"><X size={19} /></button><div className={'detail-art detail-' + selected.id}><div className="art-grid" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="detail-symbol">{selected.id === 'trace' ? <Command size={58} strokeWidth={1} /> : selected.id === 'flowbridge' ? <BrainCircuit size={62} strokeWidth={1} /> : selected.id === 'bodha' ? <Sparkles size={58} strokeWidth={1} /> : selected.id === 'jacket' ? <Zap size={58} strokeWidth={1} /> : selected.id === 'groomgraud' ? <ScanFace size={58} strokeWidth={1} /> : <span className="grammar-symbol">Aa</span>}</div><span>{selected.status}</span></div><div className="detail-content"><p className="mini-overline">{selected.label} / PROJECT {selected.number}</p><h2 id="project-title">{selected.name}</h2><p className="detail-description">{selected.description}</p><h3>Intent & approach</h3><ul>{selected.details.map(detail => <li key={detail}>{detail}</li>)}</ul><ProjectCaseStudy project={selected} /><h3>Technology</h3><div className="tag-list detail-tags">{selected.stack.map(tag => <span key={tag}>{tag}</span>)}</div><div className="detail-actions">{selected.link && <a className="btn btn-primary" href={selected.link} target="_blank" rel="noreferrer">View GitHub repository <ExternalLink size={15} /></a>}<button className="btn btn-ghost" onClick={() => { setSelected(null); goTo('contact'); }}>Discuss this project <ArrowDownRight size={15} /></button></div><p className="detail-disclaimer">Diagrams are high-level summaries, not guarantees of every implementation detail. Add verified demos, screenshots, and evaluation results as they become available.</p></div></article></div>}
    </main>
  );
}
