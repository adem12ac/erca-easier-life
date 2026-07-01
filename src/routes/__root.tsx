import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "../lib/i18n";

const SITE_URL = "https://www.xn--ercabro-r2a.de"; // ercabüro.de
const OG_IMAGE = `${SITE_URL}/erca-logo.png`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0D2A52" },
      { title: "ERCA Büro Essen – Büroservice, Behördenhilfe & Bewerbungen" },
      { name: "description", content: "ERCA Büro in Essen: mehrsprachige Hilfe bei Anträgen, Behörden, Bürgergeld, Aufenthalt und Bewerbungen. Persönlich, schnell und zuverlässig." },
      { name: "keywords", content: "ERCA Büro, ERCA Büro Essen, Büroservice Essen, Behördenhilfe Essen, Bewerbungsservice Essen, Bürgergeld Antrag, Aufenthalt Einbürgerung, Anträge ausfüllen Essen" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "ERCA Büro" },
      { name: "geo.region", content: "DE-NW" },
      { name: "geo.placename", content: "Essen" },
      { property: "og:site_name", content: "ERCA Büro" },
      { property: "og:title", content: "ERCA Büro Essen – Büroservice, Behördenhilfe & Bewerbungen" },
      { property: "og:description", content: "Mehrsprachige Hilfe bei Anträgen, Behörden, Bürgergeld, Aufenthalt und Bewerbungen in Essen. Persönlich und zuverlässig." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "de_DE" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ERCA Büro Essen – Büroservice, Behördenhilfe & Bewerbungen" },
      { name: "twitter:description", content: "Mehrsprachige Hilfe bei Anträgen, Behörden, Bürgergeld, Aufenthalt und Bewerbungen in Essen." },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "icon", href: "/erca-logo.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/erca-logo.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "ERCA Büro",
  description:
    "Mehrsprachiger Büroservice in Essen: Hilfe bei Anträgen, Behörden, Bürgergeld, Aufenthalt, Einbürgerung und Bewerbungen.",
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  logo: OG_IMAGE,
  telephone: "+4915216651944",
  faxNumber: "+4920184168352",
  email: "kontakt@ercabüro.de",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Essen",
    addressRegion: "NRW",
    addressCountry: "DE",
  },
  areaServed: { "@type": "City", name: "Essen" },
  sameAs: [
    "https://www.instagram.com/buroerca",
    "https://www.facebook.com/share/1EQS3cAbZu/",
  ],
};

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </I18nProvider>
    </QueryClientProvider>
  );
}
