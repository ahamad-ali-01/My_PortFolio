import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Code2, RadioTower, Braces, Database, ExternalLink, GraduationCap, Terminal, Send, CheckCircle2, LoaderCircle, Sparkles, MapPin, GitBranch, Download } from 'lucide-react'
import './styles.css'

const skills = [
  { title: 'Languages & CS', icon: Code2, items: ['C++', 'JavaScript', 'Python', 'SQL', 'OOP', 'DSA', 'DBMS', 'Operating Systems'] },
  { title: 'Frontend & Backend', icon: Braces, items: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'REST APIs', 'FastAPI', 'Flask', 'JWT'] },
  { title: 'Data & Infrastructure', icon: Database, items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'Docker', 'Vercel', 'Google Cloud', 'Git'] },
  { title: 'AI & Research', icon: RadioTower, items: ['LLM applications', 'RAG', 'PyTorch', 'Semantic communication', 'PSNR / SSIM', 'FID / BER'] },
]
const projects = [
  { num: '01', title: 'NexaAI — AI Chatbot', type: 'AI PRODUCT · FULL STACK', description: 'A full-stack AI chat experience designed around streaming responses, authenticated users, and persistent conversations.', stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Vercel AI SDK'], icon: Sparkles, tone: 'mint', points: ['Streaming AI responses and persistent chat history', 'Authentication and REST API integration', 'PostgreSQL-backed data with rate limiting'], url: 'https://github.com/' },
  { num: '02', title: 'Semantic Image Communication Dashboard', type: 'RESEARCH · FULL STACK', description: 'A dashboard for exploring image transmission over noisy wireless channels and comparing reconstruction quality using quantitative metrics.', stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Python'], icon: RadioTower, tone: 'violet', points: ['AWGN, Rayleigh and Rician channel simulation with configurable SNR', 'PSNR, SSIM and BER image-quality evaluation', 'Historical runs and performance comparisons'], url: 'https://github.com/ahamad-ali-01/semantic-image-communication-dashboard1' },
  { num: '03', title: 'RAG-AI Document Assistant', type: 'GENERATIVE AI · BACKEND', description: 'A retrieval-augmented question-answering workflow for searching information across text-based and scanned documents.', stack: ['FastAPI', 'FastEmbed', 'ChromaDB', 'PDF processing', 'Tesseract OCR'], icon: Database, tone: 'mint', points: ['Document chunking and embedding generation', 'Vector search for context-aware retrieval', 'PDF parsing and OCR support for scanned files'], url: 'https://github.com/' },
  { num: '04', title: 'InterviewPrep Platform', type: 'DEVELOPER PRODUCT · FULL STACK', description: 'A MERN-stack interview preparation platform with topic-wise coding questions and personalized progress tracking.', stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'], icon: Terminal, tone: 'violet', points: ['JWT authentication and protected user experiences', 'Question banks, bookmarks and progress dashboards', 'REST APIs backed by MongoDB'], url: 'https://github.com/' },
]
const socials = [
  { label: 'GitHub', href: 'https://github.com/ahamad-ali-01', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: Linkedin },
  { label: 'LeetCode', href: 'https://leetcode.com/', icon: Code2 },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const closeMenu = () => setMenuOpen(false)
  async function submit(e) {
    e.preventDefault()
    setStatus({ type: '', message: '' })
    setSending(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/api/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to send your message right now.')
      setStatus({ type: 'success', message: 'Message sent. Thanks for reaching out — I’ll get back to you soon.' })
      setForm({ name: '', email: '', subject: '', message: '', website: '' })
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong. Please email me directly instead.' })
    } finally { setSending(false) }
  }

  return <div className="site-shell">
    <div className="grain" aria-hidden="true" />
    <header className="topbar">
      <a href="#home" className="brand" onClick={closeMenu}><span className="brand-mark">AA</span><span>Ahamad Ali<span className="brand-dot">.</span></span></a>
      <button className="mobile-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
        {[['Work','#work'],['About','#about'],['Stack','#stack'],['Contact','#contact']].map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
        <a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s talk <ArrowUpRight size={15}/></a>
      </nav>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot"/> AVAILABLE FOR OPPORTUNITIES <span className="eyebrow-line"/></div>
          <h1>I'm software Developer<br/>that <span className="accent-word">moves ideas forward.</span></h1>
          <p className="hero-intro">I’m Ahamad Ali Ansari, a software developer and M.Tech researcher at <span className="accent-word">Atal Bihari Vajpayee Institute of Technology and Management Gwalior</span>. I build full-stack applications, dependable APIs, and data-driven tools — with a strong interest in AI-powered products and system design.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={17}/></a><a className="text-link" href="#contact">Get in touch <ArrowUpRight size={16}/></a></div>
          <div className="hero-meta"><span><MapPin size={14}/> India · IIITM Gwalior</span><span className="meta-divider"/><span>Software Development · AI Systems</span></div>
        </div>
        <div className="hero-art">
          <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
          <div className="art-card card-back"><span className="tiny-label">SYSTEM STATUS</span><div className="terminal-line"><i/> building things</div><div className="terminal-line muted"><i/> learning always</div><div className="mini-bars"><span/><span/><span/><span/><span/><span/><span/><span/><span/></div></div>
          <div className="art-card profile-card"><div className="profile-top"><span className="tiny-label">DEVELOPER / RESEARCHER</span><span className="online-chip"><i/> ONLINE</span></div><div className="avatar">AA<span className="avatar-spark">✳</span></div><h3>Ahamad Ali Ansari</h3><p>Software engineer<br/>curious by default.</p><div className="profile-tags"><span>Build</span><span>Measure</span><span>Improve</span></div></div>
          <div className="floating-chip chip-code"><Code2 size={16}/><span>Clean code</span></div><div className="floating-chip chip-data"><RadioTower size={16}/><span>Applied research</span></div>
          <div className="art-caption">DESIGNING · BUILDING · ITERATING <ArrowUpRight size={13}/></div>
        </div>
        <div className="hero-index"><span>01 / 04</span><span className="index-line"/><span>SCROLL TO EXPLORE</span></div>
      </section>

      <section className="proof-strip section-wrap">
        <div className="proof-label">A LITTLE ABOUT MY JOURNEY</div>
        <div className="proof-item"><strong>300<span>+</span></strong><span>DSA problems solved</span></div>
        <div className="proof-item"><strong>8.34<span>/10</span></strong><span>M.Tech CGPA</span></div>
        <div className="proof-item"><strong>16<span>+</span></strong><span>Responsive pages shipped</span></div>
        <div className="proof-item"><strong>GATE</strong><span>CS/IT · 2025 qualified</span></div>
      </section>

      <section className="section-wrap section-block" id="work">
        <div className="section-heading"><div><span className="section-kicker">01 — SELECTED WORK</span><h2>Ideas made <span className="serif-accent">real.</span></h2></div><p>AI applications, full-stack products, and research tooling — selected work across the software stack.</p></div>
        <div className="project-list">{projects.map((p) => <article className={`project-card ${p.tone}`} key={p.num}>
          <div className="project-visual"><div className="visual-top"><span>PROJECT / {p.num}</span><span className="visual-dot">↗</span></div><div className="visual-icon"><p.icon size={34} strokeWidth={1.4}/></div><div className="visual-grid"/><div className="visual-foot"><span>END-TO-END BUILD</span><span>0{p.num === '01' ? 1 : 2} — 2026</span></div></div>
          <div className="project-info"><div className="project-type">{p.type}</div><h3>{p.title}</h3><p className="project-desc">{p.description}</p><ul>{p.points.map(point => <li key={point}><span className="list-bullet"/> {point}</li>)}</ul><div className="stack-list">{p.stack.map(s => <span key={s}>{s}</span>)}</div><a className="project-link" href={p.url} target="_blank" rel="noreferrer">View project <ArrowUpRight size={16}/></a></div>
        </article>)}</div>
      </section>

      <section className="about-band" id="about"><div className="section-wrap about-inner"><div className="about-label"><span className="section-kicker">02 — HOW I APPROACH ENGINEERING</span><div className="about-stamp"><Sparkles size={19}/><span>Curiosity<br/>over complexity</span></div></div><div className="about-copy"><h2>Build with clarity.<br/><span className="serif-accent">Engineer</span> with intent.</h2><p>I’m pursuing an M.Tech in Wireless Networks & Computing at ABV-IIITM Gwalior, where I also work as a Teaching Assistant in the Machine Learning Lab and a Research Assistant on semantic image communication.</p><p>My software development experience includes building responsive React interfaces, reusable components, API integrations, full-stack applications, and AI-enabled workflows. I enjoy working across the stack — from user experience and API design to data persistence, deployment, and measurement.</p><p>I care about readable code, practical security, useful product details, and understanding how systems behave under real constraints.</p><a className="text-link light-link" href="#experience">Explore my experience <ArrowUpRight size={16}/></a></div></div></section>

      <section className="section-wrap section-block experience-section" id="experience">
        <div className="section-heading"><div><span className="section-kicker">03 — EXPERIENCE</span><h2>Where I’ve <span className="serif-accent">contributed.</span></h2></div><p>Product development, teaching, and research — three perspectives that shape how I solve problems.</p></div>
        <div className="timeline">
          <article className="timeline-item"><div className="timeline-marker"/><div className="timeline-date">JAN 2026 — PRESENT</div><div className="timeline-content"><div className="timeline-heading"><div><h3>Research Assistant — Semantic Communication</h3><p>ABV-IIITM Gwalior · Gwalior, India</p></div><span className="timeline-tag">RESEARCH</span></div><ul><li>Researching deep-learning-based semantic image communication over wireless channels.</li><li>Implementing diffusion-based image reconstruction models using Python and PyTorch.</li><li>Evaluating reconstruction quality with PSNR, SSIM, and FID metrics.</li></ul></div></article>
          <article className="timeline-item"><div className="timeline-marker"/><div className="timeline-date">JAN 2026 — PRESENT</div><div className="timeline-content"><div className="timeline-heading"><div><h3>Teaching Assistant — Machine Learning Lab</h3><p>ABV-IIITM Gwalior · Gwalior, India</p></div><span className="timeline-tag">TEACHING</span></div><ul><li>Conducting practical lab sessions for 50+ students.</li><li>Guiding students in Python programming and ML algorithm implementation.</li><li>Helping debug code, train models, and complete practical assignments.</li></ul></div></article>
          <article className="timeline-item"><div className="timeline-marker"/><div className="timeline-date">JAN 2024 — MAY 2024</div><div className="timeline-content"><div className="timeline-heading"><div><h3>Software Developer Intern</h3><p>Coding Spark · Gurgaon, India</p></div><span className="timeline-tag">SOFTWARE</span></div><ul><li>Developed 8+ responsive React.js pages for desktop and mobile devices.</li><li>Built reusable UI components and integrated RESTful APIs.</li><li>Resolved cross-browser UI issues to improve consistency and usability.</li></ul></div></article>
        </div>
      </section>

      <section className="section-wrap section-block skills-section" id="stack"><div className="section-heading"><div><span className="section-kicker">04 — ENGINEERING TOOLKIT</span><h2>My working <span className="serif-accent">toolkit.</span></h2></div><p>The languages, frameworks, data stores, and engineering concepts I use to build and ship software.</p></div><div className="skills-grid">{skills.map((s, i) => <article className="skill-card" key={s.title}><div className="skill-top"><span className="skill-icon"><s.icon size={20}/></span><span className="skill-number">0{i+1}</span></div><h3>{s.title}</h3><div className="skill-tags">{s.items.map(item => <span key={item}>{item}</span>)}</div></article>)}</div><div className="education-row"><div className="education-icon"><GraduationCap size={22}/></div><div><span className="section-kicker">EDUCATION</span><h3>M.Tech · Wireless Networks & Computing</h3><p>ABV-IIITM Gwalior <span>·</span> 2025–2027 <span>·</span> CGPA 8.34/10</p></div><div className="education-secondary"><strong>B.Tech · Mechanical Engineering</strong><span>MITS Gwalior · 2020–2024 · CGPA 7.27/10</span></div></div></section>

      <section className="contact-section" id="contact"><div className="section-wrap contact-grid"><div className="contact-copy"><span className="section-kicker">05 — LET’S CONNECT</span><h2>Let’s make<br/>something <span className="serif-accent">matter.</span></h2><p>Have a role, a product idea, or a challenging problem? Send a note. I’d love to hear what you’re working on.</p><a className="email-direct" href="mailto:ahamad2711@gmail.com"><Mail size={17}/> ahamad2711@gmail.com <ArrowUpRight size={15}/></a><div className="social-row">{socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}><s.icon size={18}/><span>{s.label}</span><ArrowUpRight size={12}/></a>)}</div></div>
        <form className="contact-form" onSubmit={submit}><div className="form-heading"><div><span className="tiny-label">CONTACT FORM</span><h3>Send a message<span>.</span></h3></div><Send size={20}/></div><div className="field-row"><label>Your name<input name="name" value={form.name} onChange={update} placeholder="Jane Smith" autoComplete="name" required minLength={2} maxLength={80}/></label><label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="jane@company.com" autoComplete="email" required maxLength={254}/></label></div><label>Subject <span className="optional">(optional)</span><input name="subject" value={form.subject} onChange={update} placeholder="A little about your message" maxLength={120}/></label><label>Message<textarea name="message" value={form.message} onChange={update} placeholder="Tell me what you have in mind..." required minLength={10} maxLength={4000} rows={4}/></label><label className="honeypot" aria-hidden="true">Leave this field empty<input name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off"/></label>{status.message && <div className={`form-status ${status.type}`} role="status">{status.type === 'success' ? <CheckCircle2 size={17}/> : <Mail size={17}/>}<span>{status.message}</span></div>}<button className="button button-submit" disabled={sending}>{sending ? <>Sending <LoaderCircle className="spin" size={16}/></> : <>Send message <ArrowUpRight size={16}/></>}</button><p className="privacy-note">Your details are only used to reply to your message.</p></form>
      </div></section>
    </main>
    <footer className="footer section-wrap"><a href="#home" className="brand"><span className="brand-mark">AA</span><span>Ahamad Ali<span className="brand-dot">.</span></span></a><span>Software engineering · Applied AI · Research</span><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={13}/></a><span className="copyright">© {new Date().getFullYear()} Ahamad Ali Ansari</span></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
