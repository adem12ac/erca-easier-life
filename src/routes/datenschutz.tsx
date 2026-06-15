import { createFileRoute, Link } from "@tanstack/react-router";
import logoAsset from "@/assets/erca-logo.png.asset.json";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung – ERCA Büro" },
      { name: "description", content: "Datenschutzerklärung gemäß DSGVO für die Website von ERCA Büro." },
      { property: "og:title", content: "Datenschutzerklärung – ERCA Büro" },
    ],
    links: [{ rel: "canonical", href: "/datenschutz" }],
  }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logoAsset.url} alt="ERCA Büro" className="h-12 w-auto" />
          </Link>
          <Link to="/" className="text-sm font-semibold text-brand hover:underline">← Zur Startseite</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12 lg:px-8 lg:py-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand sm:text-4xl">Datenschutzerklärung</h1>
        <p className="mt-2 text-sm text-muted-foreground">Stand: {new Date().toLocaleDateString("de-DE")}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-foreground/85">
          <section>
            <h2 className="text-xl font-bold text-brand">1. Verantwortlicher</h2>
            <p className="mt-2">
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO):<br />
              Erkan Catak, ERCA Büro, Juliusstraße 21, 45128 Essen<br />
              Telefon: <a href="tel:+4915212971388" className="text-brand hover:underline">+49 1521 2971388</a><br />
              E-Mail: <a href="mailto:kontakt@erca-buero.de" className="text-brand hover:underline">kontakt@erca-buero.de</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand">2. Allgemeines zur Datenverarbeitung</h2>
            <p className="mt-2">
              Wir verarbeiten personenbezogene Daten unserer Nutzerinnen und Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) oder wenn ein Gesetz die Verarbeitung gestattet (insb. Art. 6 Abs. 1 lit. b, c oder f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand">3. Server-Logfiles</h2>
            <p className="mt-2">
              Beim Aufruf unserer Website werden durch den Hosting-Provider technisch notwendige Daten erhoben (IP-Adresse, Datum/Uhrzeit, abgerufene Seite, User-Agent). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren Betrieb).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand">4. Cookies</h2>
            <p className="mt-2">
              Wir verwenden nur technisch notwendige Cookies sowie einen lokalen Speicher (LocalStorage), um Ihre Cookie-Auswahl und Spracheinstellung zu merken. Es werden keine Tracking- oder Marketing-Cookies eingesetzt. Sie können Cookies in Ihrem Browser jederzeit löschen oder blockieren.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand">5. Kontaktformular &amp; E-Mail-Kontakt</h2>
            <p className="mt-2">
              Wenn Sie uns über das Kontaktformular, per E-Mail oder Telefon kontaktieren, werden Ihre Angaben (Name, Kontaktdaten, Anliegen) zur Bearbeitung Ihrer Anfrage gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung/Erfüllung eines Vertrages) bzw. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Wir geben diese Daten nicht ohne Ihre Einwilligung an Dritte weiter. Die Daten werden gelöscht, sobald sie für den Zweck der Verarbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand">6. WhatsApp-Kontakt</h2>
            <p className="mt-2">
              Wenn Sie uns über WhatsApp kontaktieren, werden personenbezogene Daten (insb. Mobilfunknummer, Profilangaben, Nachrichteninhalt) durch WhatsApp Ireland Ltd. verarbeitet. Wir haben darauf nur eingeschränkten Einfluss. Bitte beachten Sie die{" "}
              <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                Datenschutzhinweise von WhatsApp
              </a>
              . Die Nutzung von WhatsApp erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie durch Senden einer Nachricht an uns erteilen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand">7. Eingebettete Karte (Google Maps)</h2>
            <p className="mt-2">
              Auf unserer Seite ist eine Karte über Google Maps eingebettet. Beim Aufruf der Karte werden Daten an Google übertragen. Anbieter: Google Ireland Ltd. Weitere Informationen:{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">https://policies.google.com/privacy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand">8. Ihre Rechte</h2>
            <p className="mt-2">
              Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch (Art. 21 DSGVO). Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Beschwerderecht bei einer Aufsichtsbehörde besteht ebenfalls; für uns zuständig: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand">9. Kontakt für Datenschutzanfragen</h2>
            <p className="mt-2">
              Bei Fragen zum Datenschutz wenden Sie sich bitte an: <a href="mailto:kontakt@erca-buero.de" className="text-brand hover:underline">kontakt@erca-buero.de</a>
            </p>
          </section>

          <p className="text-xs text-muted-foreground">
            [Platzhalter – Bitte individuell ergänzen, sofern weitere Dienste oder Verarbeitungen hinzukommen.]
          </p>
        </div>
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
