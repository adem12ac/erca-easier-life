import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Phone, MessageCircle, Mail, MapPin, Clock, ChevronDown, Menu, X,
  FileText, Building2, Globe2, Briefcase, Languages as LangIcon, Wallet, Wrench,
  ClipboardList, Network, Check, ArrowRight, Sparkles, ShieldCheck, Star,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ERCA Büro – Büroservice, Behördenhilfe & Sozialleistungsservice in Essen" },
      { name: "description", content: "Mehrsprachige Unterstützung bei Anträgen, Behördenangelegenheiten, Sozialleistungen, Bewerbungen und Büroorganisation. Persönlich, schnell und zuverlässig in Essen." },
      { property: "og:title", content: "ERCA Büro – Bürokratie einfach erledigt" },
      { property: "og:description", content: "Mehrsprachige Unterstützung bei Anträgen, Behörden und Bewerbungen. Persönlich, schnell und zuverlässig." },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const WHATSAPP = "https://wa.me/4915212971388";
const PHONE = "+4915212971388";
const PHONE_DISPLAY = "+49 1521 2971388";
const EMAIL = "kontakt@erca-buero.de";

const NAV = [
  { id: "start", label: "Start" },
  { id: "leistungen", label: "Leistungen" },
  { id: "ablauf", label: "Ablauf" },
  { id: "bewertungen", label: "Bewertungen" },
  { id: "faq", label: "FAQ" },
  { id: "kontakt", label: "Kontakt" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
} as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function LandingPage() {
  return (
    <div id="start" className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <LanguagesSection />
      <ProblemSolution />
      <Services />
      <Process />
      <WhyUs />
      <Reviews />
      <FAQ />
      <Contact />
      <LegalNotice />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "glass-nav" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        <a href="#start" className="flex items-center gap-2.5">
          <div className="brand-gradient grid h-9 w-9 place-items-center rounded-xl text-white shadow-lift">
            <Sparkles className="h-4.5 w-4.5" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="text-base font-extrabold tracking-tight text-brand">ERCA Büro</div>
            <div className="text-[10px] font-medium text-muted-foreground">Bürokratie. Einfach erledigt.</div>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition hover:bg-brand-soft hover:text-brand">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand-soft">
            <Phone className="h-4 w-4" /> Anrufen
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-success px-5 py-2.5 text-sm font-semibold text-success-foreground btn-glow transition hover:scale-[1.03]">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-white lg:hidden" aria-label="Menü">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="glass-nav border-t border-border lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-brand-soft">
                  {n.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 px-4 py-3 text-sm font-semibold text-brand">
                  <Phone className="h-4 w-4" /> Anrufen
                </a>
                <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-success px-4 py-3 text-sm font-semibold text-success-foreground">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const trust = [
    "Mehrsprachige Betreuung",
    "Persönlicher Ansprechpartner",
    "Schnell & zuverlässig",
    "Vor Ort & Online",
  ];
  return (
    <section className="hero-bg relative overflow-hidden pt-28 lg:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-28">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Büroservice & Behördenhilfe in Essen
          </motion.div>
          <motion.h1 variants={fadeUp} className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-brand sm:text-5xl lg:text-6xl">
            Deutschland verstehen.<br />
            <span className="bg-gradient-to-r from-brand to-success bg-clip-text text-transparent">Anträge richtig erledigen.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Hilfe bei Anträgen, Briefen vom Amt, Bewerbungen und Büroarbeit – in Ihrer Sprache.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={WHATSAPP} target="_blank" rel="noopener" className="group inline-flex items-center justify-center gap-2 rounded-full bg-success px-6 py-3.5 text-sm font-semibold text-success-foreground btn-glow transition hover:scale-[1.03]">
              <MessageCircle className="h-4.5 w-4.5" /> WhatsApp Kontakt
            </a>
            <a href="#kontakt" className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-lift transition hover:scale-[1.03]">
              Kostenloses Erstgespräch <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-brand" />
            <span><strong className="text-brand">Hinweis:</strong> Wir machen keine Rechts-, Steuer- oder Schuldnerberatung.</span>
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {["bg-success", "bg-brand", "bg-amber-400", "bg-rose-400"].map((c, i) => (
                <div key={i} className={`h-7 w-7 rounded-full border-2 border-white ${c}`} />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
              <span className="ml-1 font-semibold text-foreground">Zufriedene Mandanten in Essen</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-success/20 via-brand/10 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/40 p-2 shadow-lift backdrop-blur">
            <img src={heroImg} alt="ERCA Büro Beratungssituation mit Familie" width={1536} height={1280} className="h-full w-full rounded-[1.25rem] object-cover" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="absolute -bottom-4 -left-4 hidden items-center gap-3 rounded-2xl bg-white p-3.5 shadow-lift sm:flex"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-success-soft text-success">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold text-brand">Diskret & Vertraulich</div>
              <div className="text-xs text-muted-foreground">Persönlich begleitet</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 top-6 hidden items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground shadow-lift sm:flex"
          >
            <LangIcon className="h-3.5 w-3.5" /> 6 Sprachen
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const LANGS = [
  { flag: "🇩🇪", name: "Deutsch" },
  { flag: "🇹🇷", name: "Türkisch" },
  { flag: "🇸🇦", name: "Arabisch" },
  { flag: "🇺🇦", name: "Ukrainisch" },
  { flag: "🇷🇺", name: "Russisch" },
  { flag: "🇦🇱", name: "Albanisch" },
];

function LanguagesSection() {
  return (
    <section className="border-y border-border bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="mx-auto max-w-2xl text-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
            <LangIcon className="h-3.5 w-3.5" /> Mehrsprachig
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            Wir sprechen Ihre Sprache.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base text-muted-foreground sm:text-lg">
            Wir erklären Briefe und Anträge in Ihrer Sprache.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {LANGS.map((l) => (
            <motion.div
              key={l.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-white p-5 shadow-soft transition hover:border-success/40 hover:shadow-lift"
            >
              <div className="text-4xl transition-transform group-hover:scale-110">{l.flag}</div>
              <div className="text-sm font-semibold text-brand">{l.name}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-success px-6 py-3 text-sm font-semibold text-success-foreground btn-glow transition hover:scale-[1.03]">
            <MessageCircle className="h-4 w-4" /> Jetzt Hilfe erhalten
          </a>
        </div>
      </div>
    </section>
  );
}

const PROBLEMS = [
  "Formulare sind kompliziert",
  "Briefe vom Amt verstehen",
  "Jobcenter-Anträge",
  "Aufenthaltstitel",
  "Bewerbungen erstellen",
  "Dokumente organisieren",
];
const SOLUTIONS = [
  "Persönliche Unterstützung",
  "Mehrsprachige Betreuung",
  "Strukturierte Vorbereitung",
  "Schnelle Bearbeitung",
  "Klare Erklärungen",
  "Professionelle Unterstützung",
];

function ProblemSolution() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-2xl text-center">
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            Aus Stress wird Klarheit.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base text-muted-foreground sm:text-lg">
            Wir nehmen Ihnen den Papierkram ab.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="rounded-3xl border border-border bg-white p-7 shadow-soft sm:p-9">
            <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
              Ihre Herausforderungen
            </motion.div>
            <ul className="space-y-3">
              {PROBLEMS.map((p) => (
                <motion.li key={p} variants={fadeUp} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-foreground/80">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose-50 text-rose-500">
                    <X className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium sm:text-base">{p}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="rounded-3xl border border-success/20 bg-gradient-to-br from-success/5 to-white p-7 shadow-lift sm:p-9">
            <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
              Unsere Lösung
            </motion.div>
            <ul className="space-y-3">
              {SOLUTIONS.map((s) => (
                <motion.li key={s} variants={fadeUp} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-foreground">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-success text-success-foreground">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold sm:text-base">{s}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: FileText, title: "Behörden & Formulare", desc: "Anträge ausfüllen, Briefe vom Amt erklären, Termine vorbereiten." },
  { icon: Wallet, title: "Jobcenter & Soziales", desc: "Bürgergeld, Wohngeld, Kindergeld und mehr – Antrag und Weiterbewilligung." },
  { icon: Globe2, title: "Aufenthalt & Integration", desc: "Aufenthalt, Familiennachzug, Einbürgerung und Sprachkurse." },
  { icon: Briefcase, title: "Bewerbung & Karriere", desc: "Lebenslauf, Anschreiben und komplette Bewerbungsmappe als PDF." },
  { icon: LangIcon, title: "Übersetzung & Sprache", desc: "Mehrsprachig: Deutsch, Türkisch, Arabisch, Ukrainisch, Russisch, Albanisch." },
  { icon: ClipboardList, title: "Finanzen ordnen", desc: "Einnahmen, Ausgaben und Schulden übersichtlich sortiert." },
  { icon: Wrench, title: "Handwerk & Kleinbetrieb", desc: "Angebote, Rechnungen, Stundenzettel und digitale Ablage." },
  { icon: Building2, title: "Allgemeiner Büroservice", desc: "Schreiben, Scannen, Archivieren, Termine – diskret und zuverlässig." },
  { icon: Network, title: "Netzwerk & Vermittlung", desc: "Wir vermitteln an Steuerberater, Anwälte, Notare und Fachbetriebe." },
];

function Services() {
  return (
    <section id="leistungen" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-2xl text-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
            Leistungen
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            Alles, was Sie brauchen.<br className="hidden sm:block" /> An einem Ort.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base text-muted-foreground sm:text-lg">
            Vom ersten Antrag bis zur kompletten Büroorganisation – wir kümmern uns.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-soft transition hover:border-brand/30 hover:shadow-lift"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-success/20 to-brand/10 opacity-0 blur-2xl transition group-hover:opacity-100" />
                <div className="brand-gradient mb-5 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-lift transition group-hover:scale-110">
                  <Icon className="h-5.5 w-5.5" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-brand">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Kontakt aufnehmen", desc: "Per WhatsApp, Telefon oder über das Formular – wir melden uns schnell zurück." },
  { n: "02", title: "Kostenlose Erstberatung", desc: "Wir besprechen Ihr Anliegen unverbindlich und in Ihrer Sprache." },
  { n: "03", title: "Unterlagen prüfen", desc: "Wir sichten Schreiben, Dokumente und finden den schnellsten Weg." },
  { n: "04", title: "Bearbeitung übernehmen", desc: "Wir füllen Formulare aus, bereiten Anträge vor und kümmern uns." },
  { n: "05", title: "Ergebnis erhalten", desc: "Klare Übersicht, fertige Unterlagen und ein gutes Gefühl." },
];

function Process() {
  return (
    <section id="ablauf" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-2xl text-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
            So einfach geht's
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            In 5 Schritten zur Lösung.
          </motion.h2>
        </motion.div>

        <div className="relative mt-16">
          <motion.div
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute left-6 top-0 hidden h-full w-0.5 origin-top bg-gradient-to-b from-brand via-success to-transparent sm:block lg:left-1/2 lg:-translate-x-1/2"
          />
          <ol className="space-y-6 lg:space-y-10">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`relative grid items-center gap-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>.card]:col-start-2" : ""}`}
              >
                <div className="brand-gradient relative z-10 grid h-12 w-12 place-items-center rounded-2xl font-bold text-white shadow-lift lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                  {s.n}
                </div>
                <div className={`card rounded-2xl border border-border bg-white p-6 shadow-soft transition hover:shadow-lift ${i % 2 === 1 ? "lg:mr-auto lg:ml-12" : "lg:ml-auto lg:mr-12"} lg:max-w-md`}>
                  <h3 className="text-lg font-bold text-brand">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const WHY = [
  "Mehrsprachig", "Persönlich", "Schnell erreichbar", "Diskret",
  "Zuverlässig", "Faire Preise", "Vor Ort & Online", "Individuelle Unterstützung",
];

function WhyUs() {
  return (
    <section className="bg-brand py-20 text-brand-foreground lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-2xl text-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            Warum ERCA Büro
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Persönlich. Verlässlich. Verständlich.
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {WHY.map((w) => (
            <motion.div key={w} variants={fadeUp} whileHover={{ y: -4 }} className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:bg-white/10">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-success text-success-foreground">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <span className="text-sm font-semibold text-white">{w}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "Murat Y.", role: "Familienvater, Essen", text: "Endlich jemand, der mir alle Briefe vom Amt auf Türkisch erklärt. Schnell, freundlich und absolut zuverlässig." },
  { name: "Familie Al-Hassan", role: "Neu in Deutschland", text: "ERCA Büro hat uns durch die ganze Bürokratie geführt. Auf Arabisch erklärt, in Ruhe und mit viel Geduld. Danke!" },
  { name: "Oksana K.", role: "aus der Ukraine", text: "Hilfe bei Anträgen, Aufenthalt und Wohngeld – alles auf Ukrainisch. Ich habe mich endlich verstanden gefühlt." },
  { name: "Daniel R.", role: "Bewerber", text: "Mein Lebenslauf und meine Bewerbung sehen jetzt richtig professionell aus. Direkt zwei Einladungen bekommen." },
  { name: "Tarek B.", role: "Kleinunternehmer", text: "Endlich Ordnung im Büroalltag. Rechnungen, Schreiben, Anträge – alles strukturiert und pünktlich." },
  { name: "Stefan M.", role: "Handwerksbetrieb", text: "Ich konzentriere mich auf die Baustelle, ERCA macht den Papierkram. Beste Entscheidung des Jahres." },
];

function Reviews() {
  return (
    <section id="bewertungen" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-2xl text-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
            Bewertungen
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            Vertrauen, das spürbar ist.
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <motion.div key={r.name} variants={fadeUp} whileHover={{ y: -4 }} className="flex flex-col rounded-3xl border border-border bg-white p-6 shadow-soft transition hover:shadow-lift">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">„{r.text}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="brand-gradient grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white">
                  {r.name.charAt(0)}
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-bold text-brand">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Welche Sprachen werden angeboten?", a: "Wir betreuen Sie auf Deutsch, Türkisch, Arabisch, Ukrainisch, Russisch und Albanisch – persönlich oder online." },
  { q: "Was kostet die Unterstützung?", a: "Das Erstgespräch ist kostenlos. Danach erhalten Sie ein transparentes Angebot, abgestimmt auf Ihr Anliegen." },
  { q: "Arbeiten Sie auch online?", a: "Ja. Viele Anliegen können wir vollständig digital per WhatsApp, E-Mail oder Videocall bearbeiten." },
  { q: "Begleiten Sie zu Terminen?", a: "Auf Wunsch begleiten wir Sie zu Behörden- oder Beratungsterminen und unterstützen vor Ort." },
  { q: "Bieten Sie Rechtsberatung an?", a: "Nein. ERCA Büro bietet ausschließlich organisatorische Unterstützung und Büroservice – keine Rechts-, Steuer- oder Schuldnerberatung." },
  { q: "Wie schnell bekomme ich Hilfe?", a: "In der Regel melden wir uns innerhalb weniger Stunden zurück, oft schon am selben Tag." },
  { q: "Welche Unterlagen benötige ich?", a: "Bringen Sie einfach mit, was Sie haben – wir prüfen alles gemeinsam und sagen Ihnen, was noch fehlt." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">FAQ</motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            Häufig gestellte Fragen.
          </motion.h2>
        </motion.div>

        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={f.q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }} className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-brand-soft/50">
                  <span className="text-sm font-semibold text-brand sm:text-base">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-brand transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="kontakt" className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div className="absolute inset-0 -z-10 hero-bg opacity-70" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-2xl text-center">
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            Lassen Sie uns Ihre Bürokratie erledigen.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base text-muted-foreground sm:text-lg">
            Schreiben Sie uns – wir melden uns schnell und unverbindlich zurück.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl bg-brand p-7 text-brand-foreground shadow-lift lg:col-span-2 lg:p-9">
            <h3 className="text-xl font-bold">Kontakt</h3>
            <p className="mt-2 text-sm text-white/70">Erkan Catak · ERCA Büro</p>
            <div className="mt-7 space-y-4">
              <a href={`tel:${PHONE}`} className="group flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition hover:bg-white/10">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-success text-success-foreground"><Phone className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="text-xs text-white/60">Telefon</div>
                  <div className="truncate text-sm font-semibold">{PHONE_DISPLAY}</div>
                </div>
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener" className="group flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition hover:bg-white/10">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-success text-success-foreground"><MessageCircle className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="text-xs text-white/60">WhatsApp</div>
                  <div className="truncate text-sm font-semibold">Direkt schreiben</div>
                </div>
              </a>
              <a href={`mailto:${EMAIL}`} className="group flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition hover:bg-white/10">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-success text-success-foreground"><Mail className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="text-xs text-white/60">E-Mail</div>
                  <div className="truncate text-sm font-semibold">{EMAIL}</div>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10"><MapPin className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="text-xs text-white/60">Standort</div>
                  <div className="text-sm font-semibold">Juliusstraße 21, 45128 Essen</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10"><Clock className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="text-xs text-white/60">Öffnungszeiten</div>
                  <div className="text-sm font-semibold">Mo – Fr · 09:00 – 18:00</div>
                  <div className="text-xs text-white/60">Sa nach Vereinbarung</div>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="ERCA Büro – Essen"
                src="https://www.google.com/maps?q=Juliusstra%C3%9Fe+21,+45128+Essen&output=embed"
                className="h-48 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-3xl border border-border bg-white p-7 shadow-soft lg:col-span-3 lg:p-9"
          >
            <h3 className="text-xl font-bold text-brand">Kostenlose Anfrage</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">Wir melden uns innerhalb weniger Stunden bei Ihnen.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Telefon / WhatsApp" name="phone" type="tel" required />
              <div className="sm:col-span-2"><Field label="E-Mail" name="email" type="email" /></div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-brand">Ihr Anliegen *</label>
                <textarea required name="message" rows={4} className="mt-1.5 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-success focus:ring-4 focus:ring-success/15" placeholder="Worum geht es? In welcher Sprache möchten Sie betreut werden?" />
              </div>
            </div>

            <label className="mt-4 flex items-start gap-2.5 text-xs text-muted-foreground">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-border accent-[color:var(--success)]" />
              Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage genutzt werden.
            </label>

            <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-success px-6 py-3.5 text-sm font-semibold text-success-foreground btn-glow transition hover:scale-[1.01] sm:w-auto">
              {sent ? "Anfrage gesendet ✓" : "Jetzt kostenlos anfragen"} {!sent && <ArrowRight className="h-4 w-4" />}
            </button>

            <p className="mt-4 text-xs text-muted-foreground">
              Oder direkt: <a href={`tel:${PHONE}`} className="font-semibold text-brand hover:underline">{PHONE_DISPLAY}</a> · <a href={WHATSAPP} target="_blank" rel="noopener" className="font-semibold text-success hover:underline">WhatsApp</a>
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-brand">{label}{required && " *"}</label>
      <input
        name={name} type={type} required={required}
        className="mt-1.5 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-success focus:ring-4 focus:ring-success/15"
      />
    </div>
  );
}

function LegalNotice() {
  return (
    <section className="bg-brand-soft py-12">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-brand/10 bg-white p-6 shadow-soft sm:flex-row sm:items-start">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p className="text-base font-semibold italic text-brand">„Wo unsere Leistung endet, beginnt unser Netzwerk."</p>
            <p>
              <strong className="text-brand">Wichtiger Hinweis.</strong> ERCA Büro bietet ausschließlich organisatorische Unterstützung, Büroservice sowie Hilfe bei Formularen, Verwaltungsangelegenheiten und Unternehmensorganisation an. Es erfolgt <strong>keine Rechtsberatung</strong>, <strong>keine Steuerberatung</strong> und <strong>keine Schuldnerberatung</strong>. Rechtsverbindliche Auskünfte dürfen ausschließlich von entsprechend zugelassenen Fachstellen erteilt werden.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-brand py-10 text-brand-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:text-left lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="brand-gradient grid h-9 w-9 place-items-center rounded-xl">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold">ERCA Büro</div>
            <div className="text-xs text-white/60">Erkan Catak · Juliusstraße 21, 45128 Essen</div>
          </div>
        </div>
        <div className="text-xs text-white/60">
          © {new Date().getFullYear()} ERCA Büro. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP} target="_blank" rel="noopener"
      initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, type: "spring" }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-success py-3 pl-3 pr-4 text-success-foreground shadow-lift btn-glow"
      aria-label="WhatsApp Kontakt"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
        <MessageCircle className="h-5 w-5" />
      </span>
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success ring-2 ring-white">
        <span className="absolute inset-0 animate-ping rounded-full bg-success" />
      </span>
    </motion.a>
  );
}
