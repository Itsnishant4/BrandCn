import { notFound } from 'next/navigation';
import ThemeDetailClient from './theme-detail-client';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://brand-cn.vercel.app'}/api/themes/${slug}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      return {
        title: 'Theme Not Found - BrandCn',
      };
    }
    
    const theme = await res.json();
    
    return {
      title: `${theme.name} - Theme by BrandCn`,
      description: theme.description || `Get the ${theme.name} theme for shadcn/ui and Tailwind CSS. ${theme.category} theme with dark mode support.`,
      openGraph: {
        title: `${theme.name} - BrandCn Theme`,
        description: theme.description || `Get the ${theme.name} theme for shadcn/ui and Tailwind CSS`,
        url: `https://brand-cn.vercel.app/themes/${slug}`,
        siteName: 'BrandCn',
        images: [
          {
            url: theme.icon_url || 'https://brand-cn.vercel.app/og-image.png',
            width: 1200,
            height: 630,
            alt: `${theme.name} theme preview`,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${theme.name} - BrandCn Theme`,
        description: theme.description || `Get the ${theme.name} theme for shadcn/ui and Tailwind CSS`,
        images: [theme.icon_url || 'https://brand-cn.vercel.app/og-image.png'],
        creator: '@NishantPat78737',
      },
      alternates: {
        canonical: `https://brand-cn.vercel.app/themes/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    return {
      title: 'BrandCn - Theme Library',
    };
  }
}

export default async function ThemeDetailPage({ params }) {
  const { slug } = await params;
  
  let theme = null;
  let relatedThemes = [];
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://brand-cn.vercel.app'}/api/themes/${slug}`, {
      next: { revalidate: 60 }
    });
    
    if (res.ok) {
      theme = await res.json();
      
      const relatedRes = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || 'https://brand-cn.vercel.app'}/api/themes?category=${theme.category}&limit=4`,
        { next: { revalidate: 60 } }
      );
      
      if (relatedRes.ok) {
        const relatedData = await relatedRes.json();
        relatedThemes = (relatedData.themes || []).filter(t => t.slug !== slug).slice(0, 3);
      }
    }
  } catch (e) {
    console.error('Error loading theme:', e);
  }
  
  if (!theme) {
    notFound();
  }
  
  return <ThemeDetailClient theme={{ ...theme, relatedThemes }} />;
}
