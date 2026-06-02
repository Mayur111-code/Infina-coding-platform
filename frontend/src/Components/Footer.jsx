// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Github, Linkedin, Twitter, Instagram, Mail, Globe, MapPin, ArrowRight } from "lucide-react";
// import { toast } from "sonner";

// const quickLinks = [
//   { label: "Dashboard", to: "/" },
//   { label: "Courses", to: "#courses" },
//   { label: "Challenges", to: "/challenges" },
//   { label: "Marketplace", to: "/marketplace" },
//   { label: "Leaderboard", to: "/leaderboard" },
//   { label: "Referrals", to: "/referrals" },
//   { label: "Settings", to: "/settings" },
//   { label: "Contact", to: "webcarftservices@gmail.com" },
// ];

// const resources = [
//   { label: "Documentation", to: "#documentation" },
//   { label: "Blog", to: "#blog" },
//   { label: "Community", to: "#community" },
//   { label: "FAQs", to: "#faqs" },
// ];

// const contactItems = [
//   { icon: Mail, label: "Email", value: "webcarftservices@gmail.com", href: "mailto:webcarftservices@gmail.com" },
//   { icon: Globe, label: "Website", value: "www.web-craft-services", href: "https://web-craft-services.vercel.app/" },
//   { icon: MapPin, label: "Location", value: "Remote-first, Global" },
// ];

// const socialLinks = [
//   { icon: Github, label: "GitHub", href: "https://github.com/Mayur111-code" },
//   { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mayur-borse-88b802367/" },
//   { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
//   { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/web_craft_services?igsh=aDVtazJpeWxmdm9h" },
// ];

// export default function Footer() {
//   const [email, setEmail] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubscribe = (event) => {
//     event.preventDefault();
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       toast.error("Enter a valid email address.");
//       return;
//     }
//     setSubmitted(true);
//     setEmail("");
//     toast.success("You are subscribed to the CodeOn newsletter.");
//   };

//   return (
//     <footer className="bg-slate-950 text-slate-100">
//       <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
//         <div className="grid gap-10 xl:grid-cols-[1.8fr_1fr_1fr_1.4fr]">
//           <div className="space-y-6">
//             <div className="flex items-start gap-4">
//               <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-600 to-fuchsia-500 shadow-[0_20px_80px_rgba(79,70,229,0.22)] ring-1 ring-white/10">
//                 <span className="text-2xl font-black tracking-tight text-white">C</span>
//               </div>
//               <div>
//                 <p className="text-2xl font-semibold tracking-tight text-white">CodeOn</p>
//                 <p className="mt-1 text-sm text-slate-400">Learn, Practice, Build, and Grow as a Developer.</p>
//               </div>
//             </div>
//             <p className="max-w-md text-slate-400 leading-7">
//               CodeOn brings a premium developer experience to learning with hands-on challenges, progress-based rewards, and clear goals for every stage of your journey.
//             </p>
//             <div className="flex flex-wrap items-center gap-3">
//               {socialLinks.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <a
//                     key={item.label}
//                     href={item.href}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
//                     aria-label={item.label}
//                   >
//                     <Icon size={18} />
//                   </a>
//                 );
//               })}
//             </div>
//           </div>

//           <div>
//             <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Quick Links</h3>
//             <div className="mt-6 grid gap-3 text-slate-400 sm:grid-cols-2">
//               {quickLinks.map((item) => (
//                 <div key={item.label}>
//                   {item.to.startsWith("#") || item.to.startsWith("mailto") ? (
//                     <a
//                       href={item.to}
//                       className="text-sm hover:text-white transition"
//                     >
//                       {item.label}
//                     </a>
//                   ) : (
//                     <Link to={item.to} className="text-sm hover:text-white transition">
//                       {item.label}
//                     </Link>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Resources</h3>
//             <div className="mt-6 space-y-3 text-slate-400">
//               {resources.map((item) => (
//                 <a
//                   key={item.label}
//                   href={item.to}
//                   className="block text-sm hover:text-white transition"
//                 >
//                   {item.label}
//                 </a>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl">
//               <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Contact</h3>
//               <div className="mt-6 space-y-4">
//                 {contactItems.map((item) => {
//                   const Icon = item.icon;
//                   return (
//                     <a
//                       key={item.label}
//                       href={item.href || "#"}
//                       className="group flex items-start gap-3 text-sm transition hover:text-white"
//                     >
//                       <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/80 text-cyan-400 ring-1 ring-white/10 transition group-hover:bg-cyan-500/15">
//                         <Icon size={18} />
//                       </span>
//                       <span className="max-w-[12rem] leading-6 text-slate-300">
//                         <span className="block font-medium text-white">{item.label}</span>
//                         {item.value}
//                       </span>
//                     </a>
//                   );
//                 })}
//               </div>
//             </div>

//             <form onSubmit={handleSubscribe} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl">
//               <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Newsletter</h3>
//               <p className="mt-3 text-sm text-slate-400">
//                 Get bite-sized developer insights, new challenges, and platform updates in your inbox.
//               </p>
//               <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
//                 <label htmlFor="footer-email" className="sr-only">Email address</label>
//                 <input
//                   id="footer-email"
//                   type="email"
//                   value={email}
//                   onChange={(event) => setEmail(event.target.value)}
//                   placeholder="Enter your email"
//                   className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none ring-1 ring-transparent transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
//                 />
//                 <button
//                   type="submit"
//                   className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
//                 >
//                   Subscribe <ArrowRight size={16} className="ml-2" />
//                 </button>
//               </div>
//               {submitted && <p className="mt-3 text-sm text-emerald-300">Thanks — you're now subscribed.</p>}
//             </form>
//           </div>
//         </div>

//         <div className="mt-12 border-t border-white/10 pt-6 text-slate-400 sm:flex sm:items-center sm:justify-between">
//           <p className="text-sm">Copyright © 2026 CodeOn. Powered by Webcraft
// All rights reserved</p>
//           <div className="mt-4 flex flex-wrap gap-4 text-sm sm:mt-0">
//             <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
//             <a href="#terms" className="hover:text-white transition">Terms of Service</a>
//             <a href="#cookies" className="hover:text-white transition">Cookies Policy</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }





import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Instagram, Mail, Globe, MapPin, ArrowRight, Code2, Zap } from "lucide-react";
import { toast } from "sonner";

const quickLinks = [
  { label: "Dashboard", to: "/" },
  { label: "Courses", to: "#courses" },
  { label: "Challenges", to: "/challenges" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "Leaderboard", to: "/leaderboard" },
  { label: "Referrals", to: "/referrals" },
  { label: "Settings", to: "/settings" },
  { label: "Contact", to: "mailto:webcarftservices@gmail.com" },
];

const resources = [
  { label: "Documentation", to: "#documentation" },
  { label: "Blog", to: "#blog" },
  { label: "Community", to: "#community" },
  { label: "FAQs", to: "#faqs" },
];

const contactItems = [
  { icon: Mail, label: "Email", value: "webcarftservices@gmail.com", href: "mailto:webcarftservices@gmail.com" },
  { icon: Globe, label: "Website", value: "web-craft-services.vercel.app", href: "https://web-craft-services.vercel.app/" },
  { icon: MapPin, label: "Location", value: "Remote-first, Global" },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Mayur111-code", color: "#e2e8f0" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mayur-borse-88b802367/", color: "#60a5fa" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com", color: "#38bdf8" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/web_craft_services", color: "#f472b6" },
];

// Floating particle component
function Particle({ style }) {
  return <div className="footer-particle" style={style} />;
}

// Animated grid line
function GridLines() {
  return (
    <div className="footer-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="grid-col-line" style={{ left: `${(i + 1) * 12.5}%`, animationDelay: `${i * 0.3}s` }} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="grid-row-line" style={{ top: `${(i + 1) * 20}%`, animationDelay: `${i * 0.4}s` }} />
      ))}
    </div>
  );
}

// Typewriter code snippet
function CodeSnippet() {
  const lines = [
    { text: "const dev = new Developer();", color: "#e879f9" },
    { text: "dev.learn('everything');", color: "#38bdf8" },
    { text: "dev.build('the future');", color: "#a78bfa" },
    { text: "dev.grow('limitlessly');", color: "#34d399" },
  ];
  return (
    <div className="code-snippet">
      <div className="code-header">
        <span className="dot" style={{ background: "#ff5f57" }} />
        <span className="dot" style={{ background: "#febc2e" }} />
        <span className="dot" style={{ background: "#28c840" }} />
        <span className="code-title">codeon.js</span>
      </div>
      <div className="code-body">
        {lines.map((line, i) => (
          <div key={i} className="code-line" style={{ animationDelay: `${i * 0.5}s` }}>
            <span className="line-num">{i + 1}</span>
            <span style={{ color: line.color }}>{line.text}</span>
          </div>
        ))}
        <div className="code-cursor" />
      </div>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    setSubmitted(true);
    setEmail("");
    toast.success("You are subscribed to the CodeOn newsletter.");
  };

  const particles = Array.from({ length: 18 }, (_, i) => ({
    width: `${Math.random() * 4 + 1}px`,
    height: `${Math.random() * 4 + 1}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 6}s`,
    animationDuration: `${Math.random() * 8 + 6}s`,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600&family=Syne:wght@400;600;700;800&display=swap');

        .codeon-footer {
          position: relative;
          background: #020817;
          color: #e2e8f0;
          font-family: 'Syne', sans-serif;
          overflow: hidden;
        }

        /* Animated top border beam */
        .footer-beam {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #06b6d4, #8b5cf6, #ec4899, transparent);
          background-size: 200% 100%;
          animation: beamSlide 4s linear infinite;
        }
        @keyframes beamSlide {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Radial glow bg */
        .footer-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(99,102,241,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 80% 20%, rgba(6,182,212,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Grid overlay */
        .footer-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .grid-col-line, .grid-row-line {
          position: absolute;
          background: linear-gradient(to bottom, transparent, rgba(99,102,241,0.08), transparent);
          animation: gridPulse 6s ease-in-out infinite;
        }
        .grid-col-line { width: 1px; top: 0; bottom: 0; }
        .grid-row-line { height: 1px; left: 0; right: 0;
          background: linear-gradient(to right, transparent, rgba(99,102,241,0.08), transparent);
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }

        /* Floating particles */
        .footer-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #06b6d4, #8b5cf6);
          animation: floatUp linear infinite;
          pointer-events: none;
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 0.5; }
          100% { transform: translateY(-120px) scale(0.3); opacity: 0; }
        }

        /* Entry animations */
        .footer-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .footer-visible .footer-section {
          opacity: 1;
          transform: translateY(0);
        }
        .footer-section:nth-child(1) { transition-delay: 0.1s; }
        .footer-section:nth-child(2) { transition-delay: 0.2s; }
        .footer-section:nth-child(3) { transition-delay: 0.3s; }
        .footer-section:nth-child(4) { transition-delay: 0.4s; }

        /* Brand logo */
        .brand-logo {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .logo-icon {
          position: relative;
          width: 56px; height: 56px;
          border-radius: 18px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed, #c026d3);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(79,70,229,0.4);
          animation: logoPulse 3s ease-in-out infinite;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .logo-icon:hover { transform: scale(1.08) rotate(3deg); }
        @keyframes logoPulse {
          0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(79,70,229,0.4); }
          50% { box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 20px 80px rgba(79,70,229,0.6), 0 0 40px rgba(192,38,211,0.2); }
        }
        .logo-ring {
          position: absolute;
          inset: -6px;
          border-radius: 24px;
          border: 1px solid transparent;
          background: linear-gradient(135deg, rgba(99,102,241,0.4), rgba(192,38,211,0.4)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          animation: ringRotate 8s linear infinite;
        }
        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Code snippet */
        .code-snippet {
          font-family: 'JetBrains Mono', monospace;
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 14px;
          overflow: hidden;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .code-snippet:hover {
          border-color: rgba(99,102,241,0.4);
          box-shadow: 0 8px 40px rgba(99,102,241,0.15), 0 0 0 1px rgba(99,102,241,0.1);
        }
        .code-header {
          display: flex; align-items: center; gap: 7px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .code-title { margin-left: 6px; font-size: 11px; color: rgba(148,163,184,0.6); }
        .code-body { padding: 12px 14px; }
        .code-line {
          display: flex; gap: 14px;
          font-size: 12px; line-height: 1.9;
          opacity: 0;
          animation: fadeIn 0.4s forwards;
        }
        @keyframes fadeIn { to { opacity: 1; } }
        .line-num { color: rgba(148,163,184,0.3); user-select: none; min-width: 14px; }
        .code-cursor {
          display: inline-block;
          width: 2px; height: 14px;
          background: #06b6d4;
          margin-left: 4px;
          animation: blink 1s step-end infinite;
          vertical-align: text-bottom;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* Social buttons */
        .social-btn {
          position: relative;
          display: inline-flex; align-items: center; justify-content: center;
          width: 44px; height: 44px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          overflow: hidden;
        }
        .social-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--social-color, #06b6d4);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .social-btn:hover {
          transform: translateY(-4px) scale(1.1);
          border-color: var(--social-color, #06b6d4);
          color: #fff;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3), 0 0 20px var(--social-glow, rgba(6,182,212,0.3));
        }
        .social-btn:hover::before { opacity: 0.12; }
        .social-btn svg { position: relative; z-index: 1; }

        /* Section headings */
        .section-heading {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #94a3b8;
          position: relative;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }
        .section-heading::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 24px; height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #06b6d4, #8b5cf6);
          transition: width 0.4s ease;
        }
        .section-heading:hover::after { width: 100%; }

        /* Nav links */
        .nav-link {
          position: relative;
          font-size: 13.5px;
          color: #64748b;
          text-decoration: none;
          padding: 3px 0;
          transition: color 0.25s;
          display: inline-block;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: linear-gradient(90deg, #06b6d4, #8b5cf6);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #e2e8f0; }
        .nav-link:hover::after { width: 100%; }

        /* Contact card */
        .contact-card {
          background: rgba(15,23,42,0.6);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 22px;
          backdrop-filter: blur(16px);
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .contact-card:hover {
          border-color: rgba(99,102,241,0.25);
          box-shadow: 0 0 40px rgba(99,102,241,0.08);
        }
        .contact-item {
          display: flex; align-items: flex-start; gap: 12px;
          text-decoration: none;
          padding: 8px;
          border-radius: 12px;
          transition: background 0.25s;
        }
        .contact-item:hover { background: rgba(99,102,241,0.07); }
        .contact-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(6,182,212,0.1);
          border: 1px solid rgba(6,182,212,0.15);
          display: flex; align-items: center; justify-content: center;
          color: #06b6d4;
          flex-shrink: 0;
          transition: all 0.3s;
        }
        .contact-item:hover .contact-icon {
          background: rgba(6,182,212,0.2);
          box-shadow: 0 0 16px rgba(6,182,212,0.2);
        }

        /* Newsletter */
        .newsletter-card {
          background: rgba(15,23,42,0.6);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 22px;
          backdrop-filter: blur(16px);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }
        .newsletter-card::before {
          content: '';
          position: absolute; top: -40px; right: -40px;
          width: 120px; height: 120px;
          background: radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%);
          pointer-events: none;
        }
        .newsletter-card:hover { border-color: rgba(99,102,241,0.25); }

        .email-input {
          flex: 1;
          background: rgba(2,8,23,0.6);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 11px 16px;
          font-size: 13px;
          font-family: 'Syne', sans-serif;
          color: #e2e8f0;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .email-input::placeholder { color: #334155; }
        .email-input:focus {
          border-color: rgba(6,182,212,0.4);
          box-shadow: 0 0 0 3px rgba(6,182,212,0.07);
        }

        .subscribe-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #06b6d4, #6366f1);
          border: none; border-radius: 12px;
          padding: 11px 18px;
          font-size: 13px; font-weight: 600;
          font-family: 'Syne', sans-serif;
          color: #020817;
          cursor: pointer;
          white-space: nowrap;
          position: relative; overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
        }
        .subscribe-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .subscribe-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(6,182,212,0.35);
        }
        .subscribe-btn:hover::after { opacity: 1; }
        .subscribe-btn:active { transform: translateY(0) scale(0.97); }

        /* Big "CODEON" watermark text */
        .footer-wordmark {
          position: absolute;
          bottom: 20px; left: 50%;
          transform: translateX(-50%);
          font-family: 'Syne', sans-serif;
          font-size: clamp(60px, 10vw, 140px);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(99,102,241,0.08);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          animation: wordmarkDrift 12s ease-in-out infinite;
        }
        @keyframes wordmarkDrift {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) translateY(0); }
          50% { opacity: 1; transform: translateX(-50%) translateY(-4px); }
        }

        /* Bottom bar */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 24px;
          margin-top: 48px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
          position: relative; z-index: 1;
        }
        .footer-bottom-text {
          font-size: 12.5px;
          color: #334155;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.02em;
        }
        .footer-bottom-text span {
          color: #e879f9;
          animation: textGlow 3s ease-in-out infinite;
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: none; }
          50% { text-shadow: 0 0 12px rgba(232,121,249,0.6); }
        }
        .legal-link {
          font-size: 12px; color: #334155;
          text-decoration: none;
          transition: color 0.25s;
          font-family: 'JetBrains Mono', monospace;
        }
        .legal-link:hover { color: #94a3b8; }

        /* Status dot */
        .status-dot {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 11px; font-family: 'JetBrains Mono', monospace;
          color: #334155;
          padding: 5px 10px;
          background: rgba(52,211,153,0.06);
          border: 1px solid rgba(52,211,153,0.12);
          border-radius: 20px;
        }
        .status-dot::before {
          content: '';
          width: 6px; height: 6px; border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 8px #34d399;
          animation: statusPulse 2s ease-in-out infinite;
        }
        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 4px #34d399; }
          50% { box-shadow: 0 0 12px #34d399; }
        }

        /* Success message */
        .success-msg {
          margin-top: 12px;
          font-size: 12.5px;
          color: #34d399;
          display: flex; align-items: center; gap: 7px;
          animation: slideIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .success-msg::before {
          content: '✓';
          display: inline-flex; align-items: center; justify-content: center;
          width: 18px; height: 18px;
          background: rgba(52,211,153,0.15);
          border-radius: 50%;
          font-size: 10px;
        }
      `}</style>

      <footer ref={footerRef} className={`codeon-footer ${isVisible ? "footer-visible" : ""}`}>
        <div className="footer-beam" />
        <div className="footer-glow" />
        <GridLines />

        {/* Floating particles */}
        {particles.map((p, i) => <Particle key={i} style={p} />)}

        {/* Big watermark */}
        <div className="footer-wordmark">CODEON</div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "64px 32px 32px" }}>
          <div style={{ display: "grid", gap: "40px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>

            {/* Brand column */}
            <div className="footer-section" style={{ gridColumn: "span 1" }}>
              <div className="brand-logo" style={{ marginBottom: "20px" }}>
                <div className="logo-icon">
                  <div className="logo-ring" />
                  <span style={{ fontSize: "24px", fontWeight: 900, color: "#fff", fontFamily: "'Syne', sans-serif" }}>C</span>
                </div>
                <div>
                  <p style={{ fontSize: "22px", fontWeight: 700, color: "#fff", margin: 0, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>
                    Code<span style={{ color: "#06b6d4" }}>On</span>
                  </p>
                  <div className="status-dot" style={{ marginTop: "6px" }}>All systems live</div>
                </div>
              </div>

              <p style={{ fontSize: "13.5px", color: "#475569", lineHeight: 1.8, maxWidth: "280px", marginBottom: "20px" }}>
                A premium developer experience — hands-on challenges, progress-based rewards, and clear goals for every stage of your journey.
              </p>

              <CodeSnippet />

              <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="social-btn"
                      style={{ "--social-color": item.color, "--social-glow": `${item.color}44` }}
                      aria-label={item.label}
                      onMouseEnter={() => setHoveredSocial(item.label)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <Icon size={17} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="section-heading">Quick Links</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px" }}>
                {quickLinks.map((item) => (
                  <div key={item.label} style={{ padding: "4px 0" }}>
                    {item.to.startsWith("#") || item.to.startsWith("mailto") ? (
                      <a href={item.to} className="nav-link">{item.label}</a>
                    ) : (
                      <Link to={item.to} className="nav-link">{item.label}</Link>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "32px" }}>
                <h3 className="section-heading">Resources</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {resources.map((item) => (
                    <a key={item.label} href={item.to} className="nav-link">{item.label}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="footer-section">
              <h3 className="section-heading">Contact</h3>
              <div className="contact-card">
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {contactItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a key={item.label} href={item.href || "#"} className="contact-item">
                        <div className="contact-icon">
                          <Icon size={16} />
                        </div>
                        <div>
                          <div style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: "12.5px", color: "#64748b", wordBreak: "break-all" }}>{item.value}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="footer-section">
              <h3 className="section-heading">Newsletter</h3>
              <div className="newsletter-card">
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <Zap size={14} color="#f59e0b" />
                  <span style={{ fontSize: "12px", color: "#f59e0b", fontWeight: 600, letterSpacing: "0.05em" }}>
                    WEEKLY DROPS
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.7, marginBottom: "16px", marginTop: 0 }}>
                  Bite-sized dev insights, new challenges & platform updates — zero noise.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label htmlFor="footer-email" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="email-input"
                  />
                  <button type="button" onClick={handleSubscribe} className="subscribe-btn">
                    Subscribe <ArrowRight size={14} />
                  </button>
                </div>
                {submitted && (
                  <div className="success-msg">You're on the list — see you in your inbox!</div>
                )}
              </div>

              {/* Stats pills */}
              <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
                {[
                  { icon: <Code2 size={12} />, label: "500+ Challenges" },
                  { icon: <Zap size={12} />, label: "10K+ Devs" },
                ].map((stat) => (
                  <div key={stat.label} style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "5px 10px",
                    background: "rgba(99,102,241,0.07)",
                    border: "1px solid rgba(99,102,241,0.15)",
                    borderRadius: "20px",
                    fontSize: "11px", color: "#6366f1", fontWeight: 600,
                  }}>
                    {stat.icon}
                    {stat.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <p className="footer-bottom-text">
              © 2026 CodeOn · Powered by <span>Webcraft</span> · All rights reserved
            </p>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="legal-link">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}