import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum – ERCA Büro" },
      { name: "description", content: "Impressum gemäß § 5 TMG für ERCA Büro, Erkan Catak, Essen." },
      { property: "og:title", content: "Impressum – ERCA Büro" },
    ],
    links: [{ rel: "canonical", href: "/impressum" }],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/erca-logo.png" alt="ERCA Büro" className="h-12 w-auto" />
          </Link>
          <Link to="/" className="text-sm font-semibold text-brand hover:underline">← Zur Startseite</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12 lg:px-8 lg:py-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand sm:text-4xl">Impressum</h1>
        <p className="mt-2 text-sm text-muted-foreground">Angaben gemäß § 5 TMG</p>

        <section className="prose prose-sm mt-8 max-w-none text-foreground/85">
          <h2 className="mt-8 text-xl font-bold text-brand">Anbieter</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Erkan Catak<br />
            ERCA Büro<br />
            Juliusstraße 21<br />
            45128 Essen<br />
            Deutschland
          </p>

          <h2 className="mt-8 text-xl font-bold text-brand">Kontakt</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Telefon: <a href="tel:+4915216651944" className="text-brand hover:underline">+49 1521 6651944</a><br />
            Fax: 0201 84168352<br />
            E-Mail: <a href="mailto:kontakt@ercabüro.de" className="text-brand hover:underline">kontakt@ercabüro.de</a>
          </p>

          <h2 className="mt-8 text-xl font-bold text-brand">Umsatzsteuer-ID</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Umsatzsteuer-Identifikationsnummer gem. § 27 a UStG:<br />
            <span className="text-muted-foreground">[Platzhalter – bitte ergänzen]</span>
          </p>

          <h2 className="mt-8 text-xl font-bold text-brand">Steuernummer</h2>
          <p className="mt-2 text-sm leading-relaxed">
            <span className="text-muted-foreground">[Platzhalter – bitte ergänzen]</span>
          </p>

          <h2 className="mt-8 text-xl font-bold text-brand">Aufsichtsbehörde</h2>
          <p className="mt-2 text-sm leading-relaxed">
            <span className="text-muted-foreground">[Platzhalter – falls erforderlich, zuständige Aufsichtsbehörde ergänzen]</span>
          </p>

          <h2 className="mt-8 text-xl font-bold text-brand">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p className="mt-2 text-sm leading-relaxed">Erkan Catak, Anschrift wie oben.</p>

          <h2 className="mt-8 text-xl font-bold text-brand">EU-Streitschlichtung</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>
            . Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2 className="mt-8 text-xl font-bold text-brand">Haftungshinweis</h2>
          <p className="mt-2 text-sm leading-relaxed">
            ERCA Büro bietet ausschließlich organisatorische Unterstützung und Hilfe beim Ausfüllen von Formularen sowie bei der Vorbereitung von Unterlagen.
            <strong> Es erfolgt keine Rechts-, Steuer- oder Schuldnerberatung.</strong> Rechtsverbindliche Auskünfte erteilen ausschließlich entsprechend zugelassene Fachstellen.
          </p>
        </section>
      </main>

      <footer className="border-t border-border bg-brand py-8 text-brand-foreground">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-5 text-center sm:flex-row sm:text-left lg:px-8">
          <div className="text-xs text-white/70">© {new Date().getFullYear()} ERCA Büro</div>
          <div className="flex gap-4 text-xs">
            <Link to="/impressum" className="text-white/80 hover:text-white hover:underline">Impressum</Link>
            <Link to="/datenschutz" className="text-white/80 hover:text-white hover:underline">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
