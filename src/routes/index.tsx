import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Phone, MessageCircle, Mail, MapPin, Clock, ChevronDown, Menu, X, Printer,
  FileText, Building2, Globe2, Briefcase, Languages as LangIcon, Wallet, Wrench,
  ClipboardList, Network, Home, FolderOpen, Calculator, Instagram, Facebook,
  Check, ArrowRight, ShieldCheck, Star,
} from "lucide-react";
import bewerbungImg from "@/assets/bewerbung-service.jpg";
import aufenthaltImg from "@/assets/aufenthalt-service.jpg";
import buergergeldImg from "@/assets/buergergeld-service.jpg";
import handwerkerImg from "@/assets/handwerker-service.jpg";
import buerokratieImg from "@/assets/buerokratie-service.jpg";
import { useI18n, LANGUAGES, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ERCA Büro – Büroservice, Behördenhilfe & Sozialleistungsservice in Essen" },
      { name: "description", content: "Mehrsprachige Unterstützung bei Anträgen, Behörden, Sozialleistungen und Bewerbungen. Persönlich, schnell und zuverlässig in Essen." },
      { property: "og:title", content: "ERCA Büro – Bürokratie einfach erledigt" },
      { property: "og:description", content: "Mehrsprachige Hilfe bei Anträgen, Behörden und Bewerbungen in Essen." },
      { property: "og:image", content: "/erca-logo.png" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

const WHATSAPP = "https://wa.me/4915216651944";
const PHONE = "+4915216651944";
const PHONE_DISPLAY = "+49 1521 6651944";
const FAX_DISPLAY = "0201 84168352";
const EMAIL_DISPLAY = "kontakt@ercabüro.de";
const EMAIL_HREF = "mailto:kontakt@ercabüro.de";
const SOCIALS = {
  instagram: "https://www.instagram.com/buroerca?utm_source=qr&igsh=MW84YXR0cG9sNGl6Yw==",
  facebook: "https://www.facebook.com/share/1EQS3cAbZu/",
  tiktok: "https://pro.tiktok.com/t/ZG9jXXg7DrnDr-lsEwM/",
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
      <CookieBanner />
    </div>
  );
}

function useNavItems() {
  const { t } = useI18n();
  return [
    { id: "start", label: t("nav.start") },
    { id: "leistungen", label: t("nav.services") },
    { id: "ablauf", label: t("nav.process") },
    { id: "bewertungen", label: t("nav.reviews") },
    { id: "faq", label: t("nav.faq") },
    { id: "kontakt", label: t("nav.contact") },
  ];
}

// Subtle reveal: content stays visible (opacity 1), only a light translate.
const reveal = {
  hidden: { opacity: 1, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
} as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

function LanguageSwitcher({ inverted = false }: { inverted?: boolean }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onClick = () => setOpen(false);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [open]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("nav.lang")}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition ${
          inverted
            ? "text-white/90 hover:bg-white/10"
            : "text-foreground/70 hover:bg-brand-soft hover:text-brand"
        }`}
      >
        <Globe2 className="h-4 w-4" />
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-white p-1 shadow-lift"
          >
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => { setLang(l.code as Lang); setOpen(false); }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition hover:bg-brand-soft ${
                    l.code === lang ? "bg-brand-soft font-semibold text-brand" : "text-foreground/80"
                  }`}
                >
                  <span className="text-base">{l.flag}</span>
                  <span>{l.native}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function Nav() {
  const { t } = useI18n();
  const NAV = useNavItems();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "glass-nav" : "bg-white/60 backdrop-blur"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8">
        <a href="#start" className="flex items-center gap-3 shrink-0">
          <img
            src="/erca-logo.png"
            alt="ERCA Büro Logo"
            className="h-16 w-auto sm:h-20"
            style={{ imageRendering: "auto" }}
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/70 transition hover:bg-brand-soft hover:text-brand">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-brand transition hover:bg-brand-soft">
            <Phone className="h-4 w-4" /> {t("nav.call")}
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-success px-4 py-2.5 text-sm font-semibold text-success-foreground btn-glow transition hover:scale-[1.03]">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-1.5 lg:hidden">
          <LanguageSwitcher />
          <button onClick={() => setOpen((v) => !v)} className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-white" aria-label="Menü" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="glass-nav border-t border-border lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3.5 text-base font-medium text-foreground/80 hover:bg-brand-soft">
                  {n.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 px-4 py-3.5 text-sm font-semibold text-brand">
                  <Phone className="h-4 w-4" /> {t("nav.call")}
                </a>
                <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-success px-4 py-3.5 text-sm font-semibold text-success-foreground">
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
  const { t } = useI18n();
  const trust = [t("hero.t1"), t("hero.t2"), t("hero.t3"), t("hero.t4")];
  return (
    <section className="relative overflow-hidden pt-28 lg:min-h-[80vh] lg:pt-32">
      <div className="absolute inset-0">
        <img
          src="/erca-hero.jpg"
          alt="ERCA Büro – Arbeitsplatz mit Laptop, Ordnern und Unterlagen"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/65 to-white/20" />
      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:pb-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            {t("hero.badge")}
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-brand sm:text-5xl lg:text-6xl">
            {t("hero.title1")}<br />
            <span className="bg-gradient-to-r from-brand to-success bg-clip-text text-transparent">{t("hero.title2")}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-foreground/75 sm:text-lg">
            {t("hero.sub")}
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {trust.map((tr) => (
              <li key={tr} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {tr}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={WHATSAPP} target="_blank" rel="noopener" className="group inline-flex items-center justify-center gap-2 rounded-full bg-success px-6 py-3.5 text-sm font-semibold text-success-foreground btn-glow transition hover:scale-[1.03]">
              <MessageCircle className="h-4 w-4" /> {t("hero.cta1")}
            </a>
            <a href="#kontakt" className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-lift transition hover:scale-[1.03]">
              {t("hero.cta2")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-brand" />
            <span>{t("hero.disclaimer")}</span>
          </p>
        </div>

        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -10% 0px" }}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LanguagesSection() {
  const { t } = useI18n();
  return (
    <section className="border-y border-border bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <motion.div variants={reveal} className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
            <LangIcon className="h-3.5 w-3.5" /> {t("nav.lang")}
          </motion.div>
          <motion.h2 variants={reveal} className="mt-4 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            {t("lang.title")}
          </motion.h2>
          <motion.p variants={reveal} className="mt-3 text-base text-foreground/70 sm:text-lg">
            {t("lang.sub")}
          </motion.p>
        </SectionReveal>

        <LangGrid />

        <div className="mt-8 text-center">
          <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-success px-6 py-3 text-sm font-semibold text-success-foreground btn-glow transition hover:scale-[1.03]">
            <MessageCircle className="h-4 w-4" /> {t("lang.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}

function LangGrid() {
  const { lang, setLang } = useI18n();
  return (
    <SectionReveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {LANGUAGES.map((l) => {
        const active = l.code === lang;
        return (
          <motion.button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code as Lang)}
            variants={reveal}
            whileHover={{ y: -4 }}
            aria-pressed={active}
            className={`group flex flex-col items-center gap-2 rounded-2xl border bg-white p-5 shadow-soft transition hover:shadow-lift ${active ? "border-success ring-2 ring-success/30" : "border-border hover:border-success/40"}`}
          >
            <div className="text-4xl transition-transform group-hover:scale-110">{l.flag}</div>
            <div className="text-sm font-semibold text-brand">{l.native}</div>
          </motion.button>
        );
      })}
    </SectionReveal>
  );
}


const PROBLEMS_KEYS = ["ps.p.1","ps.p.2","ps.p.3","ps.p.4","ps.p.5","ps.p.6"];
const SOLUTIONS_KEYS = ["ps.s.1","ps.s.2","ps.s.3","ps.s.4","ps.s.5","ps.s.6"];

function ProblemSolution() {
  const { t } = useI18n();
  return (
    <section className="bg-background py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <motion.h2 variants={reveal} className="text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            {t("ps.title")}
          </motion.h2>
          <motion.p variants={reveal} className="mt-3 text-base text-foreground/70 sm:text-lg">
            {t("ps.sub")}
          </motion.p>
        </SectionReveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <SectionReveal className="rounded-3xl border border-border bg-white p-7 shadow-soft sm:p-9">
            <motion.div variants={reveal} className="mb-5 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
              {t("ps.problems")}
            </motion.div>
            <ul className="space-y-3">
              {PROBLEMS_KEYS.map((p) => (
                <motion.li key={p} variants={reveal} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-foreground/80">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose-50 text-rose-500">
                    <X className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium sm:text-base">{t(p)}</span>
                </motion.li>
              ))}
            </ul>
          </SectionReveal>

          <SectionReveal className="rounded-3xl border border-success/20 bg-gradient-to-br from-success/5 to-white p-7 shadow-lift sm:p-9">
            <motion.div variants={reveal} className="mb-5 inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
              {t("ps.solutions")}
            </motion.div>
            <ul className="space-y-3">
              {SOLUTIONS_KEYS.map((s) => (
                <motion.li key={s} variants={reveal} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-foreground">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-success text-success-foreground">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold sm:text-base">{t(s)}</span>
                </motion.li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}


type ServiceItem = {
  title: string;
  highlight?: string;
  description: string;
  image: string;
  alt: string;
  benefits: string[];
  cta: string;
};

const SERVICE_IMAGES = [bewerbungImg, aufenthaltImg, buergergeldImg, handwerkerImg, buerokratieImg];

type ServiceTxt = { title: string; highlight: string; description: string; benefits: [string, string, string]; cta: string; alt: string };

const SERVICE_TEXTS: Record<Lang, ServiceTxt[]> = {
  de: [
    { title: "Bewerbung", highlight: "die überzeugt", description: "Professionelle Erstellung von Lebenslauf, Anschreiben und vollständigen Bewerbungsunterlagen.", benefits: ["Individuell erstellt", "Professionell formatiert", "Vollständig und fehlerfrei"], cta: "Jetzt Bewerbung erstellen lassen", alt: "Bewerbungsservice – Lebenslauf und Anschreiben" },
    { title: "Behördenhilfe", highlight: "& Aufenthalt", description: "Unterstützung bei Aufenthaltstiteln, Familiennachzug und Einbürgerung.", benefits: ["Persönliche Beratung", "Diskrete Bearbeitung", "Zuverlässige Unterstützung"], cta: "Beratung anfragen", alt: "Behördenhilfe – Aufenthalt, Familiennachzug, Einbürgerung" },
    { title: "Bürgergeld, Wohngeld", highlight: "& Kindergeld", description: "Wir helfen bei Anträgen, Bescheiden und Nachweisen.", benefits: ["Verständlich erklärt", "Schnell bearbeitet", "Unterstützung in Ihrer Sprache"], cta: "Jetzt Unterstützung erhalten", alt: "Hilfe bei Bürgergeld, Wohngeld und Kindergeld" },
    { title: "Handwerker", highlight: "& Kleinunternehmen", description: "Angebote, Rechnungen, Stundenzettel und komplette Büroorganisation – wir erledigen den Papierkram, Sie machen Ihr Geschäft.", benefits: ["Angebote & Rechnungen", "Stundenzettel & Ablage", "Büroorganisation aus einer Hand"], cta: "Unverbindlich anfragen", alt: "Service für Handwerker und Kleinunternehmen" },
    { title: "Deutsche Bürokratie –", highlight: "wir machen es einfach", description: "Anträge, Formulare und Behördenschreiben – persönlich, zuverlässig und in Ihrer Sprache.", benefits: ["In Ihrer Sprache", "Persönlich betreut", "Zuverlässig & diskret"], cta: "Termin vereinbaren", alt: "Bürokratie-Service – Anträge, Formulare, Behördenschreiben" },
  ],
  en: [
    { title: "Job application", highlight: "that convinces", description: "Professional creation of CV, cover letter and complete application portfolio.", benefits: ["Individually crafted", "Professionally formatted", "Complete and error-free"], cta: "Get your application now", alt: "Application service – CV and cover letter" },
    { title: "Authority help", highlight: "& residence", description: "Support with residence permits, family reunification and naturalisation.", benefits: ["Personal consultation", "Discreet handling", "Reliable support"], cta: "Request consultation", alt: "Authority help – residence, family reunification, naturalisation" },
    { title: "Bürgergeld, housing", highlight: "& child benefit", description: "We help with applications, decisions and proof documents.", benefits: ["Clearly explained", "Quickly processed", "Support in your language"], cta: "Get support now", alt: "Help with Bürgergeld, housing and child benefit" },
    { title: "Tradespeople", highlight: "& small businesses", description: "Quotes, invoices, time sheets and complete office organisation – we handle the paperwork, you run your business.", benefits: ["Quotes & invoices", "Time sheets & filing", "Office organisation from one source"], cta: "Make a free enquiry", alt: "Service for tradespeople and small businesses" },
    { title: "German bureaucracy –", highlight: "we make it easy", description: "Applications, forms and official letters – personal, reliable and in your language.", benefits: ["In your language", "Personally handled", "Reliable & discreet"], cta: "Make an appointment", alt: "Bureaucracy service – applications, forms, official letters" },
  ],
  tr: [
    { title: "İş başvurusu", highlight: "ikna eden", description: "Profesyonel CV, ön yazı ve eksiksiz başvuru dosyası hazırlığı.", benefits: ["Bireysel hazırlanır", "Profesyonel biçim", "Eksiksiz ve hatasız"], cta: "Hemen başvuru hazırlat", alt: "Başvuru servisi – CV ve ön yazı" },
    { title: "Resmi daire yardımı", highlight: "& oturum", description: "Oturum izni, aile birleşimi ve vatandaşlıkta destek.", benefits: ["Kişisel danışmanlık", "Gizli işlem", "Güvenilir destek"], cta: "Danışmanlık talep et", alt: "Resmi daire yardımı – oturum, aile birleşimi, vatandaşlık" },
    { title: "Bürgergeld, Wohngeld", highlight: "& çocuk parası", description: "Başvuru, karar ve belgelerde yardımcı oluyoruz.", benefits: ["Anlaşılır anlatım", "Hızlı işlem", "Kendi dilinizde destek"], cta: "Hemen destek al", alt: "Bürgergeld, Wohngeld ve çocuk parası yardımı" },
    { title: "Esnaf", highlight: "& küçük işletmeler", description: "Teklif, fatura, mesai listesi ve tüm büro organizasyonu – evrak bizden, iş sizden.", benefits: ["Teklif & fatura", "Mesai & arşiv", "Tek elden büro organizasyonu"], cta: "Ücretsiz sor", alt: "Esnaf ve küçük işletmeler için servis" },
    { title: "Alman bürokrasisi –", highlight: "biz kolaylaştırıyoruz", description: "Başvuru, form ve resmi yazılar – kişisel, güvenilir ve kendi dilinizde.", benefits: ["Kendi dilinizde", "Kişisel ilgi", "Güvenilir & gizli"], cta: "Randevu al", alt: "Bürokrasi servisi – başvuru, form, resmi yazı" },
  ],
  ar: [
    { title: "طلب التوظيف", highlight: "الذي يُقنع", description: "إعداد احترافي للسيرة الذاتية وخطاب التقديم وملف التوظيف الكامل.", benefits: ["إعداد فردي", "تنسيق احترافي", "كامل وخالٍ من الأخطاء"], cta: "اطلب إعداد طلبك الآن", alt: "خدمة طلبات التوظيف – السيرة الذاتية وخطاب التقديم" },
    { title: "مساعدة الدوائر", highlight: "والإقامة", description: "دعم في تصاريح الإقامة ولمّ شمل الأسرة والتجنّس.", benefits: ["استشارة شخصية", "معالجة سرّية", "دعم موثوق"], cta: "اطلب استشارة", alt: "مساعدة الدوائر – الإقامة، لمّ الشمل، التجنّس" },
    { title: "Bürgergeld و Wohngeld", highlight: "وعلاوة الأطفال", description: "نساعدك في الطلبات والقرارات والمستندات.", benefits: ["شرح واضح", "معالجة سريعة", "دعم بلغتك"], cta: "احصل على الدعم", alt: "مساعدة في Bürgergeld و Wohngeld وعلاوة الأطفال" },
    { title: "الحرفيون", highlight: "والشركات الصغيرة", description: "عروض، فواتير، كشوف ساعات وتنظيم مكتبي كامل – نحن للأوراق وأنت لعملك.", benefits: ["عروض وفواتير", "كشوف وأرشفة", "تنظيم مكتبي من جهة واحدة"], cta: "استفسار مجاني", alt: "خدمة للحرفيين والشركات الصغيرة" },
    { title: "البيروقراطية الألمانية –", highlight: "نجعلها سهلة", description: "طلبات ونماذج ورسائل رسمية – بشكل شخصي، موثوق وبلغتك.", benefits: ["بلغتك", "متابعة شخصية", "موثوق وسرّي"], cta: "احجز موعداً", alt: "خدمة البيروقراطية – طلبات، نماذج، رسائل رسمية" },
  ],
  ru: [
    { title: "Резюме и заявка", highlight: "которые убеждают", description: "Профессиональное составление резюме, сопроводительного письма и полного пакета документов.", benefits: ["Индивидуально", "Профессиональное оформление", "Полно и без ошибок"], cta: "Заказать заявку", alt: "Сервис заявок – резюме и сопроводительное письмо" },
    { title: "Помощь в ведомствах", highlight: "и ВНЖ", description: "Поддержка по ВНЖ, воссоединению семьи и натурализации.", benefits: ["Личная консультация", "Конфиденциально", "Надёжная поддержка"], cta: "Запросить консультацию", alt: "Помощь в ведомствах – ВНЖ, воссоединение, натурализация" },
    { title: "Bürgergeld, Wohngeld", highlight: "и Kindergeld", description: "Помогаем с заявлениями, решениями и документами.", benefits: ["Понятно объясняем", "Быстрая обработка", "Поддержка на вашем языке"], cta: "Получить поддержку", alt: "Помощь по Bürgergeld, Wohngeld и Kindergeld" },
    { title: "Ремесленники", highlight: "и малый бизнес", description: "Сметы, счета, табели и полное офисное сопровождение – бумаги на нас, дело за вами.", benefits: ["Сметы и счета", "Табели и архив", "Офис из одних рук"], cta: "Бесплатный запрос", alt: "Сервис для ремесленников и малого бизнеса" },
    { title: "Немецкая бюрократия –", highlight: "мы упрощаем", description: "Заявления, формы и письма ведомств – лично, надёжно и на вашем языке.", benefits: ["На вашем языке", "Личное сопровождение", "Надёжно и конфиденциально"], cta: "Записаться", alt: "Бюрократия – заявления, формы, письма" },
  ],
  uk: [
    { title: "Резюме та заявка", highlight: "що переконують", description: "Професійне складання резюме, супровідного листа і повного пакету документів.", benefits: ["Індивідуально", "Професійне оформлення", "Повно та без помилок"], cta: "Замовити заявку", alt: "Сервіс заявок – резюме та супровідний лист" },
    { title: "Допомога з відомствами", highlight: "та ВНЖ", description: "Підтримка з ВНЖ, возз'єднанням сім'ї та натуралізацією.", benefits: ["Особиста консультація", "Конфіденційно", "Надійна підтримка"], cta: "Запитати консультацію", alt: "Допомога з відомствами – ВНЖ, возз'єднання, натуралізація" },
    { title: "Bürgergeld, Wohngeld", highlight: "та Kindergeld", description: "Допомагаємо з заявами, рішеннями та документами.", benefits: ["Зрозуміло пояснюємо", "Швидко обробляємо", "Підтримка вашою мовою"], cta: "Отримати підтримку", alt: "Допомога з Bürgergeld, Wohngeld та Kindergeld" },
    { title: "Ремісники", highlight: "та малий бізнес", description: "Пропозиції, рахунки, табелі та повна офісна організація – папери на нас, справа за вами.", benefits: ["Пропозиції та рахунки", "Табелі та архів", "Офіс з одних рук"], cta: "Безкоштовний запит", alt: "Сервіс для ремісників та малого бізнесу" },
    { title: "Німецька бюрократія –", highlight: "ми спрощуємо", description: "Заяви, форми та листи відомств – особисто, надійно та вашою мовою.", benefits: ["Вашою мовою", "Особистий супровід", "Надійно та конфіденційно"], cta: "Записатися", alt: "Бюрократія – заяви, форми, листи" },
  ],
  sq: [
    { title: "Aplikim pune", highlight: "që bind", description: "Përgatitje profesionale e CV-së, letrës motivuese dhe dosjes së plotë.", benefits: ["I personalizuar", "Formatim profesional", "I plotë dhe pa gabime"], cta: "Porosit aplikimin tani", alt: "Shërbim aplikimi – CV dhe letër motivuese" },
    { title: "Ndihmë me institucionet", highlight: "& qëndrimi", description: "Mbështetje për leje qëndrimi, bashkim familjar dhe natyralizim.", benefits: ["Këshillim personal", "Trajtim diskret", "Mbështetje e besueshme"], cta: "Kërko këshillim", alt: "Ndihmë me institucionet – qëndrim, bashkim familjar, natyralizim" },
    { title: "Bürgergeld, Wohngeld", highlight: "& pagesa fëmijësh", description: "Ndihmojmë me aplikime, vendime dhe dokumente.", benefits: ["Shpjegim i qartë", "Përpunim i shpejtë", "Mbështetje në gjuhën tuaj"], cta: "Merr mbështetje tani", alt: "Ndihmë me Bürgergeld, Wohngeld dhe pagesa fëmijësh" },
    { title: "Mjeshtër", highlight: "& biznese të vogla", description: "Oferta, fatura, fletëpunësh dhe organizim i plotë i zyrës – ne marrim letrat, ju biznesin.", benefits: ["Oferta & fatura", "Fletëpunësh & arkivim", "Zyra nga një burim"], cta: "Pyetje pa detyrim", alt: "Shërbim për mjeshtër dhe biznese të vogla" },
    { title: "Burokracia gjermane –", highlight: "ne e bëjmë të lehtë", description: "Aplikime, formularë dhe letra zyrtare – personalisht, me besueshmëri dhe në gjuhën tuaj.", benefits: ["Në gjuhën tuaj", "Trajtim personal", "I besueshëm & diskret"], cta: "Cakto takim", alt: "Shërbim burokracie – aplikime, formularë, letra zyrtare" },
  ],
};

function Services() {
  const { t, lang } = useI18n();
  const texts = SERVICE_TEXTS[lang] ?? SERVICE_TEXTS.de;
  const services: ServiceItem[] = texts.map((x, i) => ({
    title: x.title, highlight: x.highlight, description: x.description,
    image: SERVICE_IMAGES[i], alt: x.alt, benefits: x.benefits, cta: x.cta,
  }));
  return (
    <section id="leistungen" className="relative bg-gradient-to-b from-white via-brand-soft/30 to-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <motion.div variants={reveal} className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
            {t("nav.services")}
          </motion.div>
          <motion.h2 variants={reveal} className="mt-4 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            {t("svc.title")}
          </motion.h2>
          <motion.p variants={reveal} className="mt-3 text-base text-foreground/70 sm:text-lg">
            {t("svc.sub")}
          </motion.p>
        </SectionReveal>

        <div className="mt-14 space-y-12 lg:space-y-20">
          {services.map((s, i) => (
            <ServiceRow key={s.title} service={s} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service, reverse }: { service: ServiceItem; reverse: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`group grid items-center gap-8 lg:gap-12 lg:grid-cols-2 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}
    >
      {/* Text card */}
      <div className="relative overflow-hidden rounded-[24px] border border-white/60 bg-white/70 p-7 shadow-soft backdrop-blur-xl transition-all duration-500 group-hover:shadow-lift sm:p-9 lg:p-10">
        <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-success/10 blur-3xl" aria-hidden />
        <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-brand/10 blur-3xl" aria-hidden />
        <div className="relative">
          <h3 className="text-2xl font-extrabold leading-tight text-brand sm:text-3xl lg:text-4xl">
            {service.title}{" "}
            {service.highlight && <span className="text-success">{service.highlight}</span>}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-foreground/75 sm:text-lg">
            {service.description}
          </p>
          <ul className="mt-6 space-y-3">
            {service.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm sm:text-base text-foreground/80">
                <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-success/15 text-success">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lift transition hover:bg-brand/90 hover:shadow-glow"
            >
              {service.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-5 py-3 text-sm font-semibold text-brand transition hover:border-brand/40 hover:bg-brand-soft"
            >
              <Phone className="h-4 w-4" /> Anrufen
            </a>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        <div className="overflow-hidden rounded-[24px] shadow-soft transition-all duration-500 group-hover:shadow-lift">
          <img
            src={service.image}
            alt={service.alt}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:aspect-[4/3] lg:aspect-square"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-black/5" aria-hidden />
      </div>
    </motion.article>
  );
}

function Process() {
  const { t } = useI18n();
  const steps = [1, 2, 3, 4, 5];
  return (
    <section id="ablauf" className="bg-background py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <motion.div variants={reveal} className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
            {t("proc.badge")}
          </motion.div>
          <motion.h2 variants={reveal} className="mt-4 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            {t("proc.title")}
          </motion.h2>
        </SectionReveal>

        <div className="relative mt-12">
          <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-brand via-success to-transparent sm:block lg:left-1/2 lg:-translate-x-1/2" />
          <ol className="space-y-6 lg:space-y-10">
            {steps.map((n, i) => (
              <motion.li
                key={n}
                initial={{ opacity: 1, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.45, delay: i * 0.03 }}
                className={`relative grid items-center gap-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>.card]:col-start-2" : ""}`}
              >
                <div className="brand-gradient relative z-10 grid h-12 w-12 place-items-center rounded-2xl font-bold text-white shadow-lift lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                  0{n}
                </div>
                <div className={`card rounded-2xl border border-border bg-white p-6 shadow-soft transition hover:shadow-lift ${i % 2 === 1 ? "lg:mr-auto lg:ml-12" : "lg:ml-auto lg:mr-12"} lg:max-w-md`}>
                  <h3 className="text-lg font-bold text-brand">{t(`proc.${n}.t`)}</h3>
                  <p className="mt-1.5 text-sm text-foreground/70">{t(`proc.${n}.d`)}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const WHY = ["why.1","why.2","why.3","why.4","why.5","why.6","why.7","why.8"];

function WhyUs() {
  const { t } = useI18n();
  return (
    <section className="bg-brand py-14 text-brand-foreground lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <motion.div variants={reveal} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            {t("why.badge")}
          </motion.div>
          <motion.h2 variants={reveal} className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("why.title")}
          </motion.h2>
        </SectionReveal>

        <SectionReveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {WHY.map((w) => (
            <motion.div key={w} variants={reveal} whileHover={{ y: -4 }} className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:bg-white/10">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-success text-success-foreground">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <span className="text-sm font-semibold text-white">{t(w)}</span>
            </motion.div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}

const REVIEWS = [
  { initial: "M.", k: 1 }, { initial: "F.", k: 2 }, { initial: "O.", k: 3 },
  { initial: "D.", k: 4 }, { initial: "T.", k: 5 }, { initial: "S.", k: 6 },
];

function Reviews() {
  const { t } = useI18n();
  return (
    <section id="bewertungen" className="bg-background py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <motion.div variants={reveal} className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
            {t("rev.badge")}
          </motion.div>
          <motion.h2 variants={reveal} className="mt-4 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            {t("rev.title")}
          </motion.h2>
          <motion.p variants={reveal} className="mt-3 text-sm text-foreground/60">
            {t("rev.disclaimer")}
          </motion.p>
        </SectionReveal>

        <SectionReveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.div key={i} variants={reveal} whileHover={{ y: -4 }} className="flex flex-col rounded-3xl border border-border bg-white p-6 shadow-soft transition hover:shadow-lift">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">„{t(`rev.${r.k}.t`)}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="brand-gradient grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white">
                  {r.initial}
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-bold text-brand">{t("rev.client")} {r.initial}</div>
                  <div className="text-xs text-foreground/60">{t(`rev.${r.k}.r`)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}

const FAQS = [1, 2, 3, 4, 5, 6, 7];

function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionReveal className="text-center">
          <motion.div variants={reveal} className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">FAQ</motion.div>
          <motion.h2 variants={reveal} className="mt-4 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            {t("faq.title")}
          </motion.h2>
        </SectionReveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((n, i) => {
            const isOpen = open === i;
            return (
              <div key={n} className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-brand-soft/50">
                  <span className="text-sm font-semibold text-brand sm:text-base">{t(`faq.${n}.q`)}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-brand transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <div className="px-5 pb-5 text-sm leading-relaxed text-foreground/75 sm:text-base">{t(`faq.${n}.a`)}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type FormState = "idle" | "sending" | "success" | "error";

function Contact() {
  const { t } = useI18n();
  const [state, setState] = useState<FormState>("idle");
  const [errMsg, setErrMsg] = useState<string>("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", consent: false });

  const update = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg("");
    // Simple validation
    if (!form.name.trim() || form.name.length > 100 || !form.phone.trim() || form.phone.length > 50 || !form.message.trim() || form.message.length > 2000 || !form.consent) {
      setState("error");
      setErrMsg(t("contact.validation"));
      return;
    }
    if (form.email && form.email.length > 0) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      if (!ok) { setState("error"); setErrMsg(t("contact.validation")); return; }
    }

    setState("sending");
    try {
      // Compose WhatsApp message (reliable, no backend dependency).
      const lines = [
        `Neue Anfrage über die Website`,
        `Name: ${form.name}`,
        `Telefon: ${form.phone}`,
        form.email ? `E-Mail: ${form.email}` : "",
        ``,
        `Anliegen:`,
        form.message,
      ].filter(Boolean).join("\n");
      const url = `${WHATSAPP}?text=${encodeURIComponent(lines)}`;
      // Also try a mailto fallback in a separate tab is brittle; we offer the link in success state instead.
      setState("success");
      // Open WhatsApp in new tab so the visitor's message reaches us.
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      setState("error");
      setErrMsg(t("contact.error"));
    }
  };

  return (
    <section id="kontakt" className="relative overflow-hidden bg-background py-14 lg:py-20">
      <div className="absolute inset-0 -z-10 hero-bg opacity-70" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <motion.h2 variants={reveal} className="text-3xl font-extrabold tracking-tight text-brand sm:text-4xl lg:text-5xl">
            {t("contact.title")}
          </motion.h2>
          <motion.p variants={reveal} className="mt-3 text-base text-foreground/70 sm:text-lg">
            {t("contact.sub")}
          </motion.p>
        </SectionReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="rounded-3xl bg-brand p-7 text-brand-foreground shadow-lift lg:col-span-2 lg:p-9">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white p-1.5">
                <img src="/erca-logo.png" alt="ERCA" className="h-full w-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ERCA Büro</h3>
                <p className="text-sm text-white/70">Erkan Catak</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <a href={`tel:${PHONE}`} className="group flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition hover:bg-white/10">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-success text-success-foreground"><Phone className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="text-xs text-white/60">{t("contact.label.phone")}</div>
                  <div className="truncate text-sm font-semibold">{PHONE_DISPLAY}</div>
                </div>
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener" className="group flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition hover:bg-white/10">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-success text-success-foreground"><MessageCircle className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="text-xs text-white/60">{t("contact.label.whatsapp")}</div>
                  <div className="truncate text-sm font-semibold">{t("contact.label.whatsapp.cta")}</div>
                </div>
              </a>
              <a href={EMAIL_HREF} className="group flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition hover:bg-white/10">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-success text-success-foreground"><Mail className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="text-xs text-white/60">{t("contact.label.email")}</div>
                  <div className="truncate text-sm font-semibold">{EMAIL_DISPLAY}</div>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10"><Printer className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="text-xs text-white/60">{t("contact.label.fax")}</div>
                  <div className="text-sm font-semibold">{FAX_DISPLAY}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10"><MapPin className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="text-xs text-white/60">{t("contact.label.location")}</div>
                  <div className="text-sm font-semibold">Juliusstraße 21, 45128 Essen</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10"><Clock className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <div className="text-xs text-white/60">{t("contact.label.hours")}</div>
                  <div className="text-sm font-semibold">{t("contact.hours.weekdays")}</div>
                  <div className="text-xs text-white/60">{t("contact.hours.sat")}</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">{t("contact.label.social")}</div>
              <div className="grid grid-cols-3 gap-2">
                <a href={SOCIALS.instagram} target="_blank" rel="noopener" aria-label="Instagram"
                  className="group flex flex-col items-center gap-1.5 rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-amber-400 p-3 text-white shadow-lift transition hover:scale-[1.04]">
                  <Instagram className="h-5 w-5" />
                  <span className="text-[11px] font-bold">Instagram</span>
                </a>
                <a href={SOCIALS.facebook} target="_blank" rel="noopener" aria-label="Facebook"
                  className="group flex flex-col items-center gap-1.5 rounded-2xl bg-[#1877F2] p-3 text-white shadow-lift transition hover:scale-[1.04]">
                  <Facebook className="h-5 w-5" />
                  <span className="text-[11px] font-bold">Facebook</span>
                </a>
                <a href={SOCIALS.tiktok} target="_blank" rel="noopener" aria-label="TikTok"
                  className="group flex flex-col items-center gap-1.5 rounded-2xl bg-black p-3 text-white shadow-lift transition hover:scale-[1.04]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M19.6 6.8a5.6 5.6 0 0 1-3.3-1.1 5.6 5.6 0 0 1-2.2-3.7H10.6v12.1a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V8a6.1 6.1 0 1 0 5.3 6V9a8.4 8.4 0 0 0 5.5 1.9V6.8z"/></svg>
                  <span className="text-[11px] font-bold">TikTok</span>
                </a>
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
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-3xl border border-border bg-white p-7 shadow-soft lg:col-span-3 lg:p-9"
          >
            <h3 className="text-xl font-bold text-brand">{t("contact.heading")}</h3>
            <p className="mt-1.5 text-sm text-foreground/70">{t("contact.hint")}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label={t("contact.name")} required value={form.name} onChange={(v) => update("name", v)} maxLength={100} />
              <Field label={t("contact.phone")} required type="tel" value={form.phone} onChange={(v) => update("phone", v)} maxLength={50} />
              <div className="sm:col-span-2">
                <Field label={t("contact.email")} type="email" value={form.email} onChange={(v) => update("email", v)} maxLength={150} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-brand">{t("contact.message")} *</label>
                <textarea
                  required
                  rows={4}
                  maxLength={2000}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-success focus:ring-4 focus:ring-success/15"
                  placeholder={t("contact.placeholder")}
                />
              </div>
            </div>

            <label className="mt-4 flex items-start gap-2.5 text-xs text-foreground/70">
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border accent-[color:var(--success)]"
              />
              <span>
                {t("contact.consent")}{" "}
                <Link to="/datenschutz" className="font-semibold text-brand underline hover:no-underline">
                  {t("contact.consent.link")}
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={state === "sending"}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-success px-6 py-3.5 text-sm font-semibold text-success-foreground btn-glow transition hover:scale-[1.01] disabled:opacity-70 sm:w-auto"
            >
              {state === "sending" ? t("contact.sending") : state === "success" ? `${t("contact.success")} ✓` : t("contact.submit")}
              {state !== "sending" && state !== "success" && <ArrowRight className="h-4 w-4 rtl:rotate-180" />}
            </button>

            {state === "error" && errMsg && (
              <p className="mt-3 text-xs font-semibold text-rose-600">{errMsg}</p>
            )}
            {state === "success" && (
              <p className="mt-3 text-xs text-success">
                {t("contact.success")}
              </p>
            )}

            <p className="mt-4 text-xs text-foreground/60">
              {t("contact.altline")}{" "}
              <a href={`tel:${PHONE}`} className="font-semibold text-brand hover:underline">{PHONE_DISPLAY}</a>{" · "}
              <a href={WHATSAPP} target="_blank" rel="noopener" className="font-semibold text-success hover:underline">WhatsApp</a>{" · "}
              <a href={EMAIL_HREF} className="font-semibold text-brand hover:underline">{EMAIL_DISPLAY}</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, type = "text", required, value, onChange, maxLength,
}: {
  label: string; type?: string; required?: boolean; value: string;
  onChange: (v: string) => void; maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-brand">{label}{required && " *"}</label>
      <input
        type={type}
        required={required}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-success focus:ring-4 focus:ring-success/15"
      />
    </div>
  );
}

function LegalNotice() {
  const { t } = useI18n();
  return (
    <section className="bg-brand-soft py-10">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-brand/10 bg-white p-6 shadow-soft sm:flex-row sm:items-start">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-foreground/75">
            <p className="text-base font-semibold italic text-brand">{t("legal.quote")}</p>
            <p>
              <strong className="text-brand">{t("legal.heading")}</strong> {t("legal.text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-brand py-10 text-brand-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 text-center sm:flex-row sm:text-left lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white p-2">
            <img src="/erca-logo.png" alt="ERCA Büro Logo" className="h-full w-full object-contain" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold">ERCA Büro</div>
            <div className="text-xs text-white/60">Erkan Catak · Juliusstraße 21, 45128 Essen</div>
            <div className="text-xs text-white/60">{PHONE_DISPLAY} · {EMAIL_DISPLAY}</div>
            <div className="text-xs text-white/60">Fax: {FAX_DISPLAY}</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 sm:items-end">
          <div className="flex items-center gap-2">
            <a href={SOCIALS.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-amber-400 text-white transition hover:scale-110"><Instagram className="h-4 w-4" /></a>
            <a href={SOCIALS.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-[#1877F2] text-white transition hover:scale-110"><Facebook className="h-4 w-4" /></a>
            <a href={SOCIALS.tiktok} target="_blank" rel="noopener" aria-label="TikTok" className="grid h-10 w-10 place-items-center rounded-full bg-black text-white transition hover:scale-110">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M19.6 6.8a5.6 5.6 0 0 1-3.3-1.1 5.6 5.6 0 0 1-2.2-3.7H10.6v12.1a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V8a6.1 6.1 0 1 0 5.3 6V9a8.4 8.4 0 0 0 5.5 1.9V6.8z"/></svg>
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm">
            <Link to="/impressum" className="font-semibold text-white hover:underline">{t("footer.impressum")}</Link>
            <Link to="/datenschutz" className="font-semibold text-white hover:underline">{t("footer.datenschutz")}</Link>
          </div>
          <div className="text-xs text-white/60">
            © {new Date().getFullYear()} ERCA Büro. {t("footer.rights")}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP} target="_blank" rel="noopener"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-success py-3 pl-3 pr-4 text-success-foreground shadow-lift btn-glow transition hover:scale-105"
      aria-label="WhatsApp Kontakt"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
        <MessageCircle className="h-5 w-5" />
      </span>
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success ring-2 ring-white">
        <span className="absolute inset-0 animate-ping rounded-full bg-success" />
      </span>
    </a>
  );
}

function CookieBanner() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem("erca-cookies")) setVisible(true);
    } catch { setVisible(true); }
  }, []);
  const choose = (val: "accepted" | "declined") => {
    try { localStorage.setItem("erca-cookies", val); } catch { /* ignore */ }
    setVisible(false);
  };
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 220 }}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-3xl border border-border bg-white/95 p-4 shadow-lift backdrop-blur sm:inset-x-5 sm:bottom-5 sm:p-5"
          role="dialog" aria-label="Cookie-Hinweis"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="min-w-0 text-sm leading-relaxed text-foreground/80">
                <strong className="text-brand">Cookies.</strong> {t("cookies.text")}{" "}
                <Link to="/datenschutz" className="font-semibold text-brand underline hover:no-underline">{t("footer.datenschutz")}</Link>
              </div>
            </div>
            <div className="flex shrink-0 gap-2 sm:ml-auto">
              <button onClick={() => choose("declined")} className="flex-1 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground/80 transition hover:bg-brand-soft sm:flex-none">
                {t("cookies.decline")}
              </button>
              <button onClick={() => choose("accepted")} className="flex-1 rounded-full bg-success px-5 py-2.5 text-sm font-semibold text-success-foreground btn-glow transition hover:scale-[1.03] sm:flex-none">
                {t("cookies.accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Keep import to avoid unused warning if reduced motion path skips it.
void useMemo;
