import { getSupabaseClient } from '@/lib/supabase'

function generateFallbackSitemap(staticRoutes, baseUrl) {
  const fallbackRoutes = staticRoutes.map(route => ({
    url: route,
    lastModified: new Date()
  }))

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${fallbackRoutes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastModified.toISOString()}</lastmod>
    <priority>${route.url === '' ? '1.0' : '0.7'}</priority>
    <changefreq>weekly</changefreq>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400'
    }
  })
}

export async function GET() {
  const baseUrl = 'https://brand-cn.vercel.app'
  const staticRoutes = [
    '',
    '/themes',
    '/features',
    '/use-cases',
    '/compare',
    '/about',
    '/contact',
    '/docs',
    '/docs/getting-started',
    '/docs/customizing',
    '/docs/dark-mode',
    '/docs/shadcn-integration',
    '/privacy',
    '/terms',
    '/license'
  ]

  const supabase = getSupabaseClient()
  if (!supabase) {
    return generateFallbackSitemap(staticRoutes, baseUrl)
  }

  try {
    const { data: themes, error } = await supabase
      .from('themes')
      .select('slug, updated_at')
      .order('updated_at', { ascending: false })

    if (error) throw error

    const themeRoutes = themes?.map(theme => ({
      url: `/themes/${theme.slug}`,
      lastModified: new Date(theme.updated_at)
    })) || []

    const allRoutes = [
      ...staticRoutes.map(route => ({
        url: route,
        lastModified: new Date()
      })),
      ...themeRoutes
    ]

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastModified.toISOString()}</lastmod>
    <priority>${route.url === '' ? '1.0' : route.url.startsWith('/themes/') ? '0.8' : '0.7'}</priority>
    <changefreq>${route.url === '' ? 'weekly' : route.url.startsWith('/themes/') ? 'monthly' : 'weekly'}</changefreq>
  </url>`).join('\n')}
</urlset>`

    return new Response(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return generateFallbackSitemap(staticRoutes, baseUrl)
  }
}
