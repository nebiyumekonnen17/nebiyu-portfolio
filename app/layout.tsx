import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { profile } from "@/data/profile";
import { absoluteUrl, siteConfig } from "@/lib/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Nebiyu Mekonnen | Full Stack Software Engineer & AWS Cloud Builder",
    template: "%s | Nebiyu Mekonnen",
  },
  description:
    "Nebiyu Mekonnen is a full stack software engineer and AWS cloud builder based in Washington State. He designs, builds and deploys production applications, AI platforms, and business systems.",
  keywords: [
    "Nebiyu Mekonnen",
    "Software Engineer",
    "Full Stack Developer",
    "AWS Cloud Engineer",
    "AI Engineer",
    "Cloud Architecture",
    "Portfolio",
  ],
  authors: [{ name: "Nebiyu Mekonnen" }],
  creator: "Nebiyu Mekonnen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: "Nebiyu Mekonnen",
    title: "Nebiyu Mekonnen | Full Stack Software Engineer & AWS Cloud Builder",
    description:
      "Full stack software engineer and AWS cloud builder. Real projects, production AWS experience, and a clear engineering story.",
    images: [{ url: absoluteUrl("/opengraph-image.png"), width: 1200, height: 630, alt: "Nebiyu Mekonnen — Full Stack Software Engineer and AWS Cloud Builder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nebiyu Mekonnen | Full Stack Software Engineer & AWS Cloud Builder",
    description:
      "Full stack software engineer and AWS cloud builder. Real projects, production AWS experience, and a clear engineering story.",
    images: [absoluteUrl("/opengraph-image.png")],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: absoluteUrl("/icon"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: profile.name,
        url: siteConfig.siteUrl,
        jobTitle: "Full Stack Software Engineer",
        description: profile.subheadline,
        image: absoluteUrl("/opengraph-image.png"),
        knowsAbout: ["Full stack software engineering", "AWS cloud architecture", "AI engineering", "Product architecture"],
        address: {
          "@type": "PostalAddress",
          addressRegion: "Washington",
          addressCountry: "US",
        },
        sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.credly].filter(Boolean),
      },
      {
        "@type": "WebSite",
        name: `${profile.name} Portfolio`,
        url: siteConfig.siteUrl,
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-on-gold focus:font-semibold"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
