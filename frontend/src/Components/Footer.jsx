import { useState } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Instagram, Mail, Globe, MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "#courses" },
  { label: "Challenges", to: "/challenges" },
  { label: "Compiler", to: "#compiler" },
  { label: "Dashboard", to: "/" },
  { label: "Contact", to: "mailto:support@codeon.dev" },
];

const resources = [
  { label: "Documentation", to: "#documentation" },
  { label: "Blog", to: "#blog" },
  { label: "Community", to: "#community" },
  { label: "FAQs", to: "#faqs" },
];

const contactItems = [
  { icon: Mail, label: "Email", value: "support@codeon.dev", href: "mailto:support@codeon.dev" },
  { icon: Globe, label: "Website", value: "www.codeon.dev", href: "https://www.codeon.dev" },
  { icon: MapPin, label: "Location", value: "Remote-first, Global" },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    setSubmitted(true);
    setEmail("");
    toast.success("You are subscribed to the CodeOn newsletter.");
  };

  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 xl:grid-cols-[1.8fr_1fr_1fr_1.4fr]">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-600 to-fuchsia-500 shadow-[0_20px_80px_rgba(79,70,229,0.22)] ring-1 ring-white/10">
                <span className="text-2xl font-black tracking-tight text-white">C</span>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-white">CodeOn</p>
                <p className="mt-1 text-sm text-slate-400">Learn, Practice, Build, and Grow as a Developer.</p>
              </div>
            </div>
            <p className="max-w-md text-slate-400 leading-7">
              CodeOn brings a premium developer experience to learning with hands-on challenges, progress-based rewards, and clear goals for every stage of your journey.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                    aria-label={item.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Quick Links</h3>
            <div className="mt-6 grid gap-3 text-slate-400 sm:grid-cols-2">
              {quickLinks.map((item) => (
                <div key={item.label}>
                  {item.to.startsWith("#") || item.to.startsWith("mailto") ? (
                    <a
                      href={item.to}
                      className="text-sm hover:text-white transition"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.to} className="text-sm hover:text-white transition">
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Resources</h3>
            <div className="mt-6 space-y-3 text-slate-400">
              {resources.map((item) => (
                <a
                  key={item.label}
                  href={item.to}
                  className="block text-sm hover:text-white transition"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Contact</h3>
              <div className="mt-6 space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href || "#"}
                      className="group flex items-start gap-3 text-sm transition hover:text-white"
                    >
                      <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/80 text-cyan-400 ring-1 ring-white/10 transition group-hover:bg-cyan-500/15">
                        <Icon size={18} />
                      </span>
                      <span className="max-w-[12rem] leading-6 text-slate-300">
                        <span className="block font-medium text-white">{item.label}</span>
                        {item.value}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Newsletter</h3>
              <p className="mt-3 text-sm text-slate-400">
                Get bite-sized developer insights, new challenges, and platform updates in your inbox.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none ring-1 ring-transparent transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                >
                  Subscribe <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
              {submitted && <p className="mt-3 text-sm text-emerald-300">Thanks — you're now subscribed.</p>}
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-slate-400 sm:flex sm:items-center sm:justify-between">
          <p className="text-sm">Copyright © 2026 CodeOn. All Rights Reserved.</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm sm:mt-0">
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition">Terms of Service</a>
            <a href="#cookies" className="hover:text-white transition">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
