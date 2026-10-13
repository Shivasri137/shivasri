'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown, ArrowDownRight, ArrowUpRight, BrainCircuit, Check, ChevronRight,
  Command, ExternalLink, Github, Linkedin, Mail, Menu, Moon, Search, Sparkles,
  Sun, X, Zap
} from 'lucide-react';

type Project = {
  id: string; number: string; name: string; label: string; category: string;
  description: string; status: string; stack: string[]; details: string[]; link?: string;
};

const projects: Project[] = [
  {
    id: 'trace', number: '01', name: 'TRACE AI', label: 'AI SYSTEMS', category: 'AI Systems',
    description: 'An AI engineering project focused on turning an intelligent-system idea into a practical, traceable product.',
    status: 'In progress', stack: ['Python', 'LLMs', 'OpenRouter', 'Next.js'],
    details: ['Built as a hands-on AI engineering project, with attention to the product experience around the model.', 'The next useful proof points are a live demo, a clear architecture walkthrough, and documented evaluation.', 'No performance claims are made here until they can be reproduced and verified.'],
    link: 'https://github.com/Shivasri137/TRACE-AI'
  },
  {
    id: 'flowbridge', number: '02', name: 'FlowBridge', label: 'MULTI-AGENT AI', category: 'AI Systems',
    description: 'A role-based multi-agent platform bringing learning and productivity workflows into one Streamlit experience.',
    status: 'Project', stack: ['Python', 'Streamlit', 'LangChain', 'RAG', 'Ollama'],
    details: ['Designed around eight specialised agents: Exam Planner, Resource Collector, Doubt Solver, Mentor, Email Writer, Task Decomposer, Meeting Scheduler, and Insight Agent.', 'The project explores local LLM workflows with Ollama to reduce dependence on paid inference APIs.', 'A useful case study should show agent hand-offs, retrieval behaviour, error handling, and evaluation examples.'],
    link: 'https://github.com/Shivasri137/FlowBridgee'
  },
  {
    id: 'bodha', number: '03', name: 'BODHA.ai', label: 'LEARNING TECHNOLOGY', category: 'AI Products',
    description: 'A learning mentor designed to guide children through worksheets using hints and explanations instead of simply giving answers.',
    status: 'MVP in progress', stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'LLM API'],
    details: ['The intended flow lets a learner upload a worksheet and receive guided support.', 'Class-level personalisation is part of the product direction.', 'Key engineering priorities include worksheet understanding, child-appropriate guidance, and reliable failure states.'],
    link: 'https://github.com/Shivasri137/bodha.ai'
  },
  {
    id: 'jacket', number: '04', name: 'AI-Enabled Smart Jacket', label: 'AI + IOT · PATENT', category: 'AI Systems',
    description: 'A smart-jacket project combining health-sensor inputs with emergency-oriented features and multimedia integration.',
    status: 'Patent published', stack: ['Python', 'IoT Sensors', 'Embedded Systems', 'Computer Vision'],
    details: ['The project description includes SpO₂, heart-rate, and temperature sensing, fall detection, and emergency alerts.', 'Patent publication: 202541020161 A, as listed on the resume.', 'The portfolio avoids medical-performance claims; hardware specifications and test evidence should accompany any technical deep dive.']
  },
  {
    id: 'grammar', number: '05', name: 'Grammar Correction Tool', label: 'NLP · LANGUAGE', category: 'AI Products',
    description: 'A transformer-based language tool for automated grammar correction and clearer writing.',
    status: 'Project', stack: ['Python', 'NLP', 'Transformers'],
    details: ['Built around transformer-based NLP for text correction.', 'The focus is useful feedback and a straightforward correction workflow.', 'Evaluation results should be presented with the dataset, baseline, and measurement method.']
  }
];

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

      <section className="hero section-pad" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> BUILDING WITH INTENT <i /></div>
          <p className="hero-kicker">AI / ML ENGINEERING · PRODUCT THINKING</p>
          <h1>Ideas into<br /><span className="outline-type">impact<span className="lime">.</span></span></h1>
          <p className="hero-description">I’m Shiva Sri — an AI/ML engineer and product-minded builder exploring the space between intelligent systems and useful human experiences.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#work">Explore my work <ArrowDownRight size={17} /></a>
            <a className="text-action" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>
          </div>
          <div className="hero-stats">
            <div><span>EDUCATION</span><strong>B.Tech · AI & ML</strong></div>
            <div><span>ACADEMICS</span><strong>9.05 / 10 GPA</strong></div>
            <div><span>INTERESTS</span><strong>LLMs · Agents · Vision</strong></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-labels"><span>FIG. 01 — THE BUILDER</span><span>INDIA / IN</span></div>
          <div className="portrait-frame">
            <div className="portrait-halo" />
            <Image src="/shiva-portrait.webp" alt="Shiva Sri smiling at a laptop, wearing a cream and black striped sweater" fill priority sizes="(max-width: 800px) 90vw, 42vw" className="portrait-image" />
            <div className="portrait-shade" />
            <div className="portrait-caption"><span>SHIVA SRI</span><span>AI / ML · ENGINEERING</span></div>
            <div className="portrait-index">SS—01</div>
          </div>
          <div className="float-card float-top"><Sparkles size={14} /><span>Curiosity, engineered.</span></div>
          <div className="float-card float-bottom"><span className="float-icon"><BrainCircuit size={19} /></span><span><b>Building with AI</b><small>From model to experience</small></span></div>
          <p className="portrait-footnote">BUILD · TEST · LEARN · REPEAT</p>
        </div>
        <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><div><i /></div><ArrowDown size={14} /></div>
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
            <button key={project.id} className={'project-card project-' + project.id + ' reveal'} onClick={() => setSelected(project)}>
              <div className="project-art">
                <div className="art-grid" />
                <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
                <div className="project-art-symbol">
                  {project.id === 'trace' ? <Command size={52} strokeWidth={1} /> : project.id === 'flowbridge' ? <BrainCircuit size={58} strokeWidth={1} /> : project.id === 'bodha' ? <Sparkles size={54} strokeWidth={1} /> : project.id === 'jacket' ? <Zap size={54} strokeWidth={1} /> : <span className="grammar-symbol">Aa</span>}
                </div>
                <span className="project-number">{project.number} / 05</span><span className="project-status">{project.status}</span><span className="project-open"><ArrowUpRight size={19} /></span>
              </div>
              <div className="project-info">
                <span className="project-label">{project.label}</span><h3>{project.name}</h3><p>{project.description}</p>
                <div className="tag-list">{project.stack.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
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
          <div className="about-note reveal"><div className="note-mark">“</div><h3>Make the complex<br />feel <em>clear.</em></h3><p>Good engineering is not only the model or the code. It is the complete experience around it.</p><div className="note-signature">SHIVA SRI <span>✳</span></div></div>
          <div className="about-details reveal">
            <p className="about-lead">My work spans AI/ML experimentation, LLM-powered applications, agent workflows, and web interfaces.</p>
            <p>I’m also interested in child-focused learning products, computer vision, and tools that make complicated workflows easier to navigate. I value honest evaluation over vanity metrics and working prototypes over slides.</p>
            <div className="facts-grid">
              <div><span>EDUCATION</span><strong>B.Tech · AI & ML</strong><small>Nalla Malla Reddy Engineering College</small></div>
              <div><span>GRADUATION</span><strong>2022–2026</strong><small>GPA 9.05 / 10.0</small></div>
              <div><span>INTELLECTUAL PROPERTY</span><strong>Published patent</strong><small>202541020161 A</small></div>
              <div><span>WORKING PRINCIPLE</span><strong>Build → evaluate → refine</strong><small>With the user in mind</small></div>
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
        <div className="contact-main reveal"><p className="mini-overline">HAVE A PROBLEM WORTH SOLVING?</p><h2>Let’s make<br /><em>something matter.</em></h2><p className="contact-description">Open to AI/ML engineering opportunities, collaborations, and thoughtful conversations about products built with AI.</p>
          <div className="contact-actions"><a className="btn btn-primary" href="mailto:hello.shivasri@gmail.com?subject=Let%E2%80%99s%20connect">Email me <Mail size={16} /></a><a className="btn btn-ghost" href="https://github.com/Shivasri137" target="_blank" rel="noreferrer">GitHub <Github size={16} /><ArrowUpRight size={14} /></a><a className="btn btn-ghost" href="https://www.linkedin.com/in/shivasrijonnala/" target="_blank" rel="noreferrer">LinkedIn <Linkedin size={16} /><ArrowUpRight size={14} /></a></div>
          <p className="contact-location">India · Available for relevant opportunities and collaborations</p>
        </div>
        <div className="contact-bottom"><span>SHIVA SRI © 2026</span><span>BUILT WITH CURIOSITY <b>✳</b></span><a href="#home">BACK TO TOP ↑</a></div>
      </section>

      <footer className="site-footer"><a className="wordmark" href="#home"><span className="wordmark-icon">S<span>.</span></span><span className="wordmark-name">SHIVA SRI<small>AI / ML ENGINEER</small></span></a><p>Designed to evolve as the work does.</p><button onClick={() => setCommandOpen(true)}><Command size={14} /> Explore with commands</button></footer>

      {scrolled && <button className="back-to-top" onClick={() => goTo('home')} aria-label="Back to top"><ArrowUpRight size={18} /></button>}

      {commandOpen && <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setCommandOpen(false); }}><div className="command-modal" role="dialog" aria-modal="true" aria-label="Quick navigation"><div className="command-input"><Search size={17} /><input autoFocus value={search} onChange={event => setSearch(event.target.value)} placeholder="Search sections and projects…" /><kbd>ESC</kbd><button onClick={() => setCommandOpen(false)} aria-label="Close quick navigation"><X size={16} /></button></div><p className="modal-label">JUMP TO</p>{commands.filter(item => (item.label + item.hint).toLowerCase().includes(search.toLowerCase())).map(item => <button className="command-row" key={item.id} onClick={() => goTo(item.id)}><span><b>{item.label}</b><small>{item.hint}</small></span><ChevronRight size={16} /></button>)}<div className="command-help">TIP: PRESS CTRL + K ANYTIME</div></div></div>}

      {selected && <div className="modal-backdrop project-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null); }}><article className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="project-title"><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project details"><X size={19} /></button><div className={'detail-art detail-' + selected.id}><div className="art-grid" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="detail-symbol">{selected.id === 'trace' ? <Command size={58} strokeWidth={1} /> : selected.id === 'flowbridge' ? <BrainCircuit size={62} strokeWidth={1} /> : selected.id === 'bodha' ? <Sparkles size={58} strokeWidth={1} /> : selected.id === 'jacket' ? <Zap size={58} strokeWidth={1} /> : <span className="grammar-symbol">Aa</span>}</div><span>{selected.status}</span></div><div className="detail-content"><p className="mini-overline">{selected.label} / PROJECT {selected.number}</p><h2 id="project-title">{selected.name}</h2><p className="detail-description">{selected.description}</p><h3>Intent & approach</h3><ul>{selected.details.map(detail => <li key={detail}>{detail}</li>)}</ul><h3>Technology</h3><div className="tag-list detail-tags">{selected.stack.map(tag => <span key={tag}>{tag}</span>)}</div><div className="detail-actions">{selected.link && <a className="btn btn-primary" href={selected.link} target="_blank" rel="noreferrer">View repository <ExternalLink size={15} /></a>}<button className="btn btn-ghost" onClick={() => { setSelected(null); goTo('contact'); }}>Discuss this project <ArrowDownRight size={15} /></button></div><p className="detail-disclaimer">Project descriptions reflect the current known scope. Add verified demos, screenshots, and evaluation results as they become available.</p></div></article></div>}
    </main>
  );
}
