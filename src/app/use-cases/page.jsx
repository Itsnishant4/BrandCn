export const metadata = {
  title: 'Use Cases - Where to Use BrandCn Themes',
  description: 'Discover use cases for BrandCn themes. Perfect for SaaS dashboards, landing pages, portfolio sites, and more. Learn how to use themes in different project types.',
  alternates: {
    canonical: 'https://brand-cn.vercel.app/use-cases',
  },
  openGraph: {
    title: 'Use Cases - BrandCn Theme Library',
    description: 'Perfect themes for SaaS apps, dashboards, landing pages, and portfolios.',
    url: 'https://brand-cn.vercel.app/use-cases',
  },
};

export default function UseCasesPage() {
  const useCases = [
    {
      title: 'SaaS Dashboards',
      description: 'Build beautiful admin dashboards with themes designed for data-heavy applications.',
      examples: ['Linear-style analytics', 'User management panels', 'E-commerce backends'],
      themeCategory: 'framework',
    },
    {
      title: 'Landing Pages',
      description: 'Create stunning marketing pages with themes that convert.',
      examples: ['Startup websites', 'Product launches', 'Feature showcases'],
      themeCategory: 'product',
    },
    {
      title: 'Portfolio Sites',
      description: 'Showcase your work with themes designed for creative professionals.',
      examples: ['Designer portfolios', 'Developer profiles', 'Agency websites'],
      themeCategory: 'company',
    },
    {
      title: 'Developer Tools',
      description: 'Build IDE-like interfaces and developer documentation with specialized themes.',
      examples: ['Code editors', 'API documentation', 'Dev tools'],
      themeCategory: 'tool',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">BrandCn</a>
          <nav className="flex gap-6 text-sm">
            <a href="/themes" className="hover:text-foreground text-muted-foreground">Themes</a>
            <a href="/features" className="hover:text-foreground text-muted-foreground">Features</a>
            <a href="/about" className="hover:text-foreground text-muted-foreground">About</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Use Cases</h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-2xl">
          Find the perfect theme for your project type. Each use case is optimized for specific workflows and user experiences.
        </p>

        <div className="grid gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="p-8 rounded-xl border bg-card">
              <h2 className="text-2xl font-bold mb-3">{useCase.title}</h2>
              <p className="text-muted-foreground mb-6">{useCase.description}</p>
              <div className="mb-6">
                <h3 className="font-medium mb-2">Popular examples:</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  {useCase.examples.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </div>
              <a 
                href={`/themes?category=${useCase.themeCategory}`}
                className="inline-flex items-center text-primary hover:underline"
              >
                Browse {useCase.themeCategory} themes →
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
