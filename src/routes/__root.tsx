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
      { title: "Trust and Hope Rad Pvt. Ltd. | 24x7 Teleradiology Services India" },
      {
        name: "description",
        content:
          "India's premier 24x7 teleradiology reporting service for hospitals and diagnostic centres. High-accuracy CT, MRI, X-Ray & subspecialty reporting with 15-30 min emergency TAT.",
      },
      { name: "author", content: "Trust and Hope Rad Pvt. Ltd." },
      {
        name: "keywords",
        content:
          "teleradiology India, 24x7 teleradiology reporting, CT scan reporting, MRI reporting, X-Ray reporting, emergency radiologist, PACS teleradiology, subspecialty radiology, TAH RAD, Trust and Hope Rad, remote radiology",
      },
      { property: "og:title", content: "Trust and Hope Rad Pvt. Ltd. | 24x7 Teleradiology Services India" },
      {
        property: "og:description",
        content:
          "Fast, accurate, and secure 24x7 radiology reporting for hospitals across India. 140+ fellowship-trained radiologists and cloud PACS integration.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Trust and Hope Rad Pvt. Ltd." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Trust and Hope Rad Pvt. Ltd. | 24x7 Teleradiology Services" },
      {
        name: "twitter:description",
        content: "24x7 remote radiology reporting for CT, MRI, X-Ray & emergency reads across India.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/brand/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
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

  useEffect(() => {
    import("../lib/stats-store").then(({ updateStatsInDOM, STATS_UPDATED_EVENT }) => {
      updateStatsInDOM();
      const handleUpdate = () => updateStatsInDOM();
      window.addEventListener(STATS_UPDATED_EVENT, handleUpdate);
      window.addEventListener("storage", handleUpdate);
      return () => {
        window.removeEventListener(STATS_UPDATED_EVENT, handleUpdate);
        window.removeEventListener("storage", handleUpdate);
      };
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Invisible link for CMS route, not indexed */}
      <a
        href="/stats"
        rel="nofollow"
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
          opacity: 0,
          pointerEvents: "auto",
        }}
      >
        https://trustandhoperad.com/stats
      </a>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
