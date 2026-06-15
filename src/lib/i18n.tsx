import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "de" | "tr" | "ar" | "ru" | "uk" | "sq";

export const LANGUAGES: { code: Lang; label: string; flag: string; native: string }[] = [
  { code: "de", label: "Deutsch", flag: "🇩🇪", native: "Deutsch" },
  { code: "tr", label: "Türkisch", flag: "🇹🇷", native: "Türkçe" },
  { code: "ar", label: "Arabisch", flag: "🇸🇦", native: "العربية" },
  { code: "ru", label: "Russisch", flag: "🇷🇺", native: "Русский" },
  { code: "uk", label: "Ukrainisch", flag: "🇺🇦", native: "Українська" },
  { code: "sq", label: "Albanisch", flag: "🇦🇱", native: "Shqip" },
];

type Dict = Record<string, string>;

const de: Dict = {
  "nav.start": "Start",
  "nav.services": "Leistungen",
  "nav.process": "Ablauf",
  "nav.reviews": "Stimmen",
  "nav.faq": "FAQ",
  "nav.contact": "Kontakt",
  "nav.call": "Anrufen",
  "nav.lang": "Sprache",
  "hero.badge": "Büroservice & Behördenhilfe in Essen",
  "hero.title1": "Deutschland verstehen.",
  "hero.title2": "Anträge richtig erledigen.",
  "hero.sub": "Hilfe bei Anträgen, Briefen vom Amt, Bewerbungen und Büroarbeit – in Ihrer Sprache.",
  "hero.t1": "Mehrsprachige Betreuung",
  "hero.t2": "Persönlicher Ansprechpartner",
  "hero.t3": "Schnell & zuverlässig",
  "hero.t4": "Vor Ort & Online",
  "hero.cta1": "WhatsApp Kontakt",
  "hero.cta2": "Kostenloses Erstgespräch",
  "hero.disclaimer": "Hinweis: Wir machen keine Rechts-, Steuer- oder Schuldnerberatung.",
  "lang.title": "Wir sprechen Ihre Sprache.",
  "lang.sub": "Wir erklären Briefe und Anträge in Ihrer Sprache.",
  "lang.cta": "Jetzt Hilfe erhalten",
  "ps.title": "Aus Stress wird Klarheit.",
  "ps.sub": "Wir nehmen Ihnen den Papierkram ab.",
  "ps.problems": "Ihre Herausforderungen",
  "ps.solutions": "Unsere Lösung",
  "svc.title": "Unsere Leistungen.",
  "svc.sub": "Vom Antrag bis zur Büroarbeit – wir kümmern uns.",
  "svc.1.t": "Behörden & Formulare", "svc.1.d": "Anträge ausfüllen, Briefe vom Amt erklären, Termine vorbereiten.",
  "svc.2.t": "Jobcenter & Soziales", "svc.2.d": "Bürgergeld, Wohngeld, Kindergeld und mehr – Antrag und Weiterbewilligung.",
  "svc.3.t": "Aufenthalt & Integration", "svc.3.d": "Aufenthalt, Familiennachzug, Einbürgerung und Sprachkurse.",
  "svc.4.t": "Bewerbung & Karriere", "svc.4.d": "Lebenslauf, Anschreiben und komplette Bewerbungsmappe als PDF.",
  "svc.5.t": "Übersetzung & Sprache", "svc.5.d": "Mehrsprachig: Deutsch, Türkisch, Arabisch, Ukrainisch, Russisch, Albanisch.",
  "svc.6.t": "Finanzen ordnen", "svc.6.d": "Einnahmen, Ausgaben und Schulden übersichtlich sortiert.",
  "svc.7.t": "Handwerk & Kleinbetrieb", "svc.7.d": "Angebote, Rechnungen, Stundenzettel und digitale Ablage.",
  "svc.8.t": "Allgemeiner Büroservice", "svc.8.d": "Schreiben, Scannen, Archivieren, Termine – diskret und zuverlässig.",
  "svc.9.t": "Netzwerk & Vermittlung", "svc.9.d": "Wir vermitteln an Steuerberater, Anwälte, Notare und Fachbetriebe.",
  "proc.badge": "So einfach geht's",
  "proc.title": "In 5 Schritten zur Lösung.",
  "proc.1.t": "Kontakt aufnehmen", "proc.1.d": "Per WhatsApp, Telefon oder Formular.",
  "proc.2.t": "Kostenloses Erstgespräch", "proc.2.d": "Wir hören zu – in Ihrer Sprache.",
  "proc.3.t": "Unterlagen prüfen", "proc.3.d": "Wir sortieren und finden den schnellsten Weg.",
  "proc.4.t": "Wir übernehmen", "proc.4.d": "Formulare und Anträge erledigen wir für Sie.",
  "proc.5.t": "Fertig!", "proc.5.d": "Sie erhalten alle Unterlagen klar und sortiert.",
  "why.badge": "Warum ERCA Büro",
  "why.title": "Persönlich. Verlässlich. Verständlich.",
  "rev.badge": "Beispielstimmen",
  "rev.title": "Vertrauen, das spürbar ist.",
  "rev.disclaimer": "Die folgenden Stimmen sind Beispieltexte und dienen der Veranschaulichung. Echte Google-Bewertungen werden hier gerne ergänzt.",
  "faq.title": "Häufig gestellte Fragen.",
  "contact.title": "Schreiben Sie uns.",
  "contact.sub": "Wir melden uns schnell zurück.",
  "contact.heading": "Kostenlos anfragen",
  "contact.hint": "Antwort meist am selben Tag.",
  "contact.name": "Name",
  "contact.phone": "Telefon / WhatsApp",
  "contact.email": "E-Mail",
  "contact.message": "Ihr Anliegen",
  "contact.placeholder": "Worum geht es? In welcher Sprache möchten Sie betreut werden?",
  "contact.consent": "Ich willige ein, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert werden. Details in der",
  "contact.consent.link": "Datenschutzerklärung",
  "contact.submit": "Jetzt kostenlos anfragen",
  "contact.sending": "Wird gesendet…",
  "contact.success": "Vielen Dank! Sie werden zu WhatsApp weitergeleitet.",
  "contact.error": "Es gab ein Problem. Bitte versuchen Sie es erneut.",
  "contact.validation": "Bitte alle Pflichtfelder ausfüllen.",
  "contact.altline": "Oder direkt:",
  "footer.rights": "Alle Rechte vorbehalten.",
  "footer.impressum": "Impressum",
  "footer.datenschutz": "Datenschutz",
  "cookies.text": "Wir nutzen nur Cookies, die für die Seite nötig sind. Sie können selbst entscheiden.",
  "cookies.accept": "Akzeptieren",
  "cookies.decline": "Ablehnen",
};

const tr: Dict = {
  "nav.start": "Başlangıç", "nav.services": "Hizmetler", "nav.process": "Süreç", "nav.reviews": "Yorumlar",
  "nav.faq": "SSS", "nav.contact": "İletişim", "nav.call": "Ara", "nav.lang": "Dil",
  "hero.badge": "Essen'de Büro & Resmi İşlem Yardımı",
  "hero.title1": "Almanya'yı anlayın.", "hero.title2": "Başvurularınızı doğru yapın.",
  "hero.sub": "Başvurularda, resmi yazılarda, iş başvurularında ve büro işlerinde – kendi dilinizde yardım.",
  "hero.t1": "Çok dilli destek", "hero.t2": "Kişisel ilgilenen", "hero.t3": "Hızlı & güvenilir", "hero.t4": "Yerinde & çevrimiçi",
  "hero.cta1": "WhatsApp ile yaz", "hero.cta2": "Ücretsiz ilk görüşme",
  "hero.disclaimer": "Not: Hukuki, mali veya borç danışmanlığı yapmıyoruz.",
  "lang.title": "Dilinizi konuşuyoruz.", "lang.sub": "Mektupları ve formları kendi dilinizde açıklıyoruz.", "lang.cta": "Hemen yardım al",
  "ps.title": "Stres yerine netlik.", "ps.sub": "Evrak işlerini sizin yerinize yapıyoruz.",
  "ps.problems": "Karşılaştığınız zorluklar", "ps.solutions": "Bizim çözümümüz",
  "svc.title": "Hizmetlerimiz.", "svc.sub": "Başvurudan büro işine kadar – biz hallederiz.",
  "svc.1.t": "Resmi daireler & formlar", "svc.1.d": "Başvuru doldurma, resmi yazıları açıklama, randevu hazırlığı.",
  "svc.2.t": "İş & Sosyal Kurum", "svc.2.d": "Bürgergeld, Wohngeld, Kindergeld ve daha fazlası.",
  "svc.3.t": "Oturum & Entegrasyon", "svc.3.d": "Oturum izni, aile birleşimi, vatandaşlık ve dil kursları.",
  "svc.4.t": "Başvuru & Kariyer", "svc.4.d": "CV, ön yazı ve eksiksiz başvuru dosyası (PDF).",
  "svc.5.t": "Çeviri & Dil", "svc.5.d": "Almanca, Türkçe, Arapça, Ukraynaca, Rusça, Arnavutça.",
  "svc.6.t": "Mali düzen", "svc.6.d": "Gelir, gider ve borçların düzenli sınıflandırılması.",
  "svc.7.t": "Esnaf & Küçük işletme", "svc.7.d": "Teklif, fatura, mesai listesi ve dijital arşiv.",
  "svc.8.t": "Genel büro hizmeti", "svc.8.d": "Yazışma, tarama, arşivleme – gizli ve güvenilir.",
  "svc.9.t": "Ağ & Yönlendirme", "svc.9.d": "Mali müşavir, avukat, noter ve uzmanlara yönlendirme.",
  "proc.badge": "Bu kadar kolay", "proc.title": "5 adımda çözüm.",
  "proc.1.t": "İletişime geç", "proc.1.d": "WhatsApp, telefon veya form ile.",
  "proc.2.t": "Ücretsiz ilk görüşme", "proc.2.d": "Dinliyoruz – kendi dilinizde.",
  "proc.3.t": "Belge incelemesi", "proc.3.d": "En hızlı yolu buluyoruz.",
  "proc.4.t": "Biz hallediyoruz", "proc.4.d": "Form ve başvuruları sizin için yapıyoruz.",
  "proc.5.t": "Tamamlandı!", "proc.5.d": "Tüm belgeleri düzenli teslim alın.",
  "why.badge": "Neden ERCA Büro", "why.title": "Kişisel. Güvenilir. Anlaşılır.",
  "rev.badge": "Örnek yorumlar", "rev.title": "Hissedilen güven.",
  "rev.disclaimer": "Aşağıdaki yorumlar örnek metinlerdir. Gerçek Google yorumları buraya eklenecektir.",
  "faq.title": "Sıkça sorulan sorular.",
  "contact.title": "Bize yazın.", "contact.sub": "Hızlı dönüş yapıyoruz.",
  "contact.heading": "Ücretsiz başvuru", "contact.hint": "Genellikle aynı gün yanıt.",
  "contact.name": "Ad Soyad", "contact.phone": "Telefon / WhatsApp", "contact.email": "E-posta",
  "contact.message": "Konunuz", "contact.placeholder": "Ne hakkında? Hangi dilde hizmet istiyorsunuz?",
  "contact.consent": "Bilgilerimin başvuru için kaydedilmesini kabul ediyorum. Ayrıntılar:",
  "contact.consent.link": "Gizlilik Politikası",
  "contact.submit": "Şimdi ücretsiz başvur", "contact.sending": "Gönderiliyor…",
  "contact.success": "Teşekkürler! WhatsApp'a yönlendiriliyorsunuz.",
  "contact.error": "Bir sorun oluştu. Lütfen tekrar deneyin.",
  "contact.validation": "Lütfen zorunlu alanları doldurun.",
  "contact.altline": "Veya doğrudan:",
  "footer.rights": "Tüm hakları saklıdır.", "footer.impressum": "Künye", "footer.datenschutz": "Gizlilik",
  "cookies.text": "Sadece zorunlu çerezleri kullanıyoruz. Siz karar verirsiniz.",
  "cookies.accept": "Kabul et", "cookies.decline": "Reddet",
};

const ar: Dict = {
  "nav.start": "الرئيسية", "nav.services": "الخدمات", "nav.process": "آلية العمل", "nav.reviews": "آراء",
  "nav.faq": "الأسئلة", "nav.contact": "اتصل بنا", "nav.call": "اتصال", "nav.lang": "اللغة",
  "hero.badge": "خدمات مكتبية ومساعدة في المعاملات الرسمية في إيسن",
  "hero.title1": "افهم ألمانيا.", "hero.title2": "أنجز معاملاتك بشكل صحيح.",
  "hero.sub": "مساعدة في الطلبات والرسائل الرسمية والسير الذاتية والأعمال المكتبية – بلغتك.",
  "hero.t1": "دعم بعدة لغات", "hero.t2": "متابعة شخصية", "hero.t3": "سريع وموثوق", "hero.t4": "حضوريًا وعن بُعد",
  "hero.cta1": "تواصل عبر واتساب", "hero.cta2": "استشارة أولى مجانية",
  "hero.disclaimer": "تنبيه: لا نقدّم استشارات قانونية أو ضريبية أو ديون.",
  "lang.title": "نتحدث لغتك.", "lang.sub": "نشرح لك الرسائل والطلبات بلغتك.", "lang.cta": "احصل على المساعدة الآن",
  "ps.title": "من التوتر إلى الوضوح.", "ps.sub": "نتولى عنك الأوراق الرسمية.",
  "ps.problems": "التحديات", "ps.solutions": "حلولنا",
  "svc.title": "خدماتنا.", "svc.sub": "من الطلب إلى المكتب – نهتم بكل شيء.",
  "svc.1.t": "الدوائر الرسمية والاستمارات", "svc.1.d": "تعبئة الطلبات وشرح الرسائل وتحضير المواعيد.",
  "svc.2.t": "مركز العمل والشؤون الاجتماعية", "svc.2.d": "Bürgergeld وWohngeld وKindergeld وغيرها.",
  "svc.3.t": "الإقامة والاندماج", "svc.3.d": "الإقامة، لمّ الشمل، التجنّس ودورات اللغة.",
  "svc.4.t": "السيرة والمهنة", "svc.4.d": "سيرة ذاتية وخطاب تقديم وملف كامل بصيغة PDF.",
  "svc.5.t": "ترجمة ولغات", "svc.5.d": "الألمانية، التركية، العربية، الأوكرانية، الروسية، الألبانية.",
  "svc.6.t": "تنظيم المالية", "svc.6.d": "ترتيب الدخل والمصاريف والديون.",
  "svc.7.t": "حِرَف ومشاريع صغيرة", "svc.7.d": "عروض أسعار، فواتير، ساعات عمل وأرشفة رقمية.",
  "svc.8.t": "خدمات مكتبية عامة", "svc.8.d": "كتابة، مسح، أرشفة ومواعيد – بسرية واحتراف.",
  "svc.9.t": "شبكة وإحالات", "svc.9.d": "إحالة لمحاسبين ومحامين وكتّاب عدل ومختصين.",
  "proc.badge": "بكل بساطة", "proc.title": "الحل في 5 خطوات.",
  "proc.1.t": "تواصل معنا", "proc.1.d": "عبر واتساب أو الهاتف أو النموذج.",
  "proc.2.t": "استشارة أولى مجانية", "proc.2.d": "نستمع إليك – بلغتك.",
  "proc.3.t": "مراجعة المستندات", "proc.3.d": "نرتّب ونختار أسرع طريق.",
  "proc.4.t": "نتولى المهمة", "proc.4.d": "نملأ ونرسل الطلبات نيابةً عنك.",
  "proc.5.t": "تم!", "proc.5.d": "تستلم جميع الوثائق منظمة.",
  "why.badge": "لماذا ERCA Büro", "why.title": "شخصي. موثوق. مفهوم.",
  "rev.badge": "آراء توضيحية", "rev.title": "ثقة ملموسة.",
  "rev.disclaimer": "النصوص أدناه نماذج توضيحية. سنُضيف هنا تقييمات Google الحقيقية لاحقًا.",
  "faq.title": "الأسئلة الشائعة.",
  "contact.title": "راسلنا.", "contact.sub": "نرد بسرعة.",
  "contact.heading": "طلب مجاني", "contact.hint": "الرد عادةً في نفس اليوم.",
  "contact.name": "الاسم", "contact.phone": "هاتف / واتساب", "contact.email": "البريد الإلكتروني",
  "contact.message": "طلبك", "contact.placeholder": "ما الموضوع؟ بأي لغة تريد المتابعة؟",
  "contact.consent": "أوافق على معالجة بياناتي لأغراض طلبي. التفاصيل في",
  "contact.consent.link": "سياسة الخصوصية",
  "contact.submit": "أرسل الطلب الآن", "contact.sending": "يتم الإرسال…",
  "contact.success": "شكرًا! يتم تحويلك إلى واتساب.",
  "contact.error": "حدث خطأ. يرجى المحاولة مرة أخرى.",
  "contact.validation": "يرجى تعبئة الحقول المطلوبة.",
  "contact.altline": "أو مباشرةً:",
  "footer.rights": "جميع الحقوق محفوظة.", "footer.impressum": "بيانات النشر", "footer.datenschutz": "الخصوصية",
  "cookies.text": "نستخدم فقط ملفات تعريف الارتباط الضرورية. القرار لك.",
  "cookies.accept": "موافق", "cookies.decline": "رفض",
};

// For ru/uk/sq, fall back to de for now to keep scope manageable.
const DICTS: Record<Lang, Dict> = { de, tr, ar, ru: de, uk: de, sq: de };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string; dir: "ltr" | "rtl" };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("erca-lang") as Lang | null;
      if (stored && DICTS[stored]) setLangState(stored);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("erca-lang", l); } catch { /* ignore */ }
  };

  const t = (key: string) => DICTS[lang][key] ?? DICTS.de[key] ?? key;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return <I18nContext.Provider value={{ lang, setLang, t, dir }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
