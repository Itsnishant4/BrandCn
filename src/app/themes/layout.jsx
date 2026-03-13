import { Metadata } from 'next';

export const metadata = {
  title: 'Theme Gallery - 50+ Professional Themes for shadcn/ui & Tailwind CSS',
  description: 'Browse our curated collection of 50+ professional themes for shadcn/ui and Tailwind CSS. Filter by category, sort by popularity, and copy CSS variables instantly.',
  alternates: {
    canonical: 'https://brand-cn.vercel.app/themes',
  },
  openGraph: {
    title: 'Theme Gallery - BrandCn',
    description: 'Browse 50+ professional themes for shadcn/ui and Tailwind CSS. Copy CSS variables instantly.',
    url: 'https://brand-cn.vercel.app/themes',
    siteName: 'BrandCn',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ThemesLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Theme Gallery",
            "description": "Browse professional themes for shadcn/ui and Tailwind CSS",
            "url": "https://brand-cn.vercel.app/themes",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Themes",
              "description": "Curated collection of professional themes"
            }
          })
        }}
      />
      {children}
    </>
  );
}
