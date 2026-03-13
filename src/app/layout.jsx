import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BrandCn - The Ultimate Theme Library for shadcn/ui & Tailwind CSS",
  description: "Stop wasting time tweaking HSL values. A curated collection of accessible, dark-mode ready themes for shadcn/ui and Tailwind CSS. Browse 50+ professional themes with instant copy-paste functionality.",
  keywords: [
    "theme library",
    "shadcn/ui",
    "Tailwind CSS",
    "dark mode themes",
    "CSS variables",
    "design system",
    "frontend themes",
    "UI components",
    "color palettes",
    "accessibility",
    "dark mode",
    "theme builder",
    "shadcn themes"
  ],
  authors: [{ name: "BrandCn" }],
  creator: "BrandCn",
  publisher: "BrandCn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://brand-cn.vercel.app'), // Your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "BrandCn - The Ultimate Theme Library for shadcn/ui",
    description: "Stop wasting time tweaking HSL values. A curated collection of accessible, dark-mode ready themes for shadcn/ui and Tailwind CSS.",
    url: "https://brand-cn.vercel.app",
    siteName: "BrandCn",
    images: [
      {
        url: "https://brand-cn.vercel.app/og-image.png", // Upload a proper OG image
        width: 1200,
        height: 630,
        alt: "BrandCn - Ultimate Theme Library for shadcn/ui",
      },
    ],
    locale: "en_US",
    type: "website",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandCn - The Ultimate Theme Library for shadcn/ui",
    description: "Stop wasting time tweaking HSL values. A curated collection of accessible, dark-mode ready themes for shadcn/ui and Tailwind CSS.",
    images: ["https://brand-cn.vercel.app/og-image.png"], // Same OG image
    creator: "@NishantPat78737",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BrandCn",
              "url": "https://brand-cn.vercel.app",
              "logo": "https://brand-cn.vercel.app/favicon.ico",
              "description": "The Ultimate Theme Library for shadcn/ui & Tailwind CSS. A curated collection of accessible, dark-mode ready themes.",
              "founder": {
                "@type": "Person",
                "name": "BrandCn"
              },
              "sameAs": [
                "https://github.com/Itsnishant4/BrandCn",
                "https://github.com/Itsnishant4"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "BrandCn Theme Library",
              "description": "A comprehensive theme library featuring curated themes for shadcn/ui and Tailwind CSS with instant copy-paste functionality and dark mode support.",
              "url": "https://brand-cn.vercel.app",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web Browser",
              "softwareVersion": "v2.0 Beta",
              "author": {
                "@type": "Organization",
                "name": "BrandCn"
              },
              "featureList": [
                "50+ Professional Themes",
                "Dark Mode Support",
                "Instant Copy-Paste",
                "Accessibility Compliant",
                "shadcn/ui Integration",
                "Tailwind CSS Compatible"
              ],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "BrandCn",
              "url": "https://brand-cn.vercel.app",
              "description": "The Ultimate Theme Library for shadcn/ui & Tailwind CSS",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://brand-cn.vercel.app/themes?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className={`antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <Toaster richColors closeButton position="top-right" />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
