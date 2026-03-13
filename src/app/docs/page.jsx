export const metadata = {
  title: 'Documentation - BrandCn Theme Library',
  description: 'Learn how to use BrandCn themes with shadcn/ui and Tailwind CSS. Complete installation guide, theme customization tips, and best practices.',
  alternates: {
    canonical: 'https://brand-cn.vercel.app/docs',
  },
  openGraph: {
    title: 'Documentation - BrandCn Theme Library',
    description: 'Complete guide to using BrandCn themes with shadcn/ui and Tailwind CSS.',
    url: 'https://brand-cn.vercel.app/docs',
  },
};

export default function DocsPage() {
  const sections = [
    {
      title: 'Getting Started',
      slug: 'getting-started',
      description: 'Learn how to quickly set up BrandCn themes in your project.',
    },
    {
      title: 'Installing Themes',
      slug: 'installing-themes',
      description: 'Step-by-step guide to installing and applying themes.',
    },
    {
      title: 'Customizing Themes',
      slug: 'customizing',
      description: 'Learn how to customize themes to match your brand.',
    },
    {
      title: 'Dark Mode',
      slug: 'dark-mode',
      description: 'Understanding dark mode support in BrandCn themes.',
    },
    {
      title: 'shadcn/ui Integration',
      slug: 'shadcn-integration',
      description: 'How BrandCn themes work with shadcn/ui components.',
    },
    {
      title: 'Tailwind CSS',
      slug: 'tailwind-css',
      description: 'Using themes with Tailwind CSS configuration.',
    },
    {
      title: 'FAQ',
      slug: 'faq',
      description: 'Frequently asked questions about BrandCn themes.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b py-4 sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">BrandCn</a>
          <nav className="flex gap-6 text-sm">
            <a href="/themes" className="hover:text-foreground text-muted-foreground">Themes</a>
            <a href="/features" className="hover:text-foreground text-muted-foreground">Features</a>
            <a href="/docs" className="hover:text-foreground text-muted-foreground">Docs</a>
            <a href="/about" className="hover:text-foreground text-muted-foreground">About</a>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Documentation</h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
          Everything you need to know about using BrandCn themes in your projects. 
          From installation to advanced customization.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <a
              key={index}
              href={`/docs/${section.slug}`}
              className="p-6 rounded-xl border bg-card hover:bg-muted transition-colors group"
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {section.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {section.description}
              </p>
            </a>
          ))}
        </div>

        <section className="mt-16 p-8 rounded-xl border bg-muted/50">
          <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
          <p className="text-muted-foreground mb-6">
            Get started with BrandCn in just 3 simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Browse themes</span> - Visit our <a href="/themes" className="text-primary hover:underline">theme gallery</a> and find one you like
            </li>
            <li>
              <span className="text-foreground font-medium">Copy the CSS</span> - Click the "Copy CSS" button on any theme card
            </li>
            <li>
              <span className="text-foreground font-medium">Paste into your project</span> - Add the variables to your <code className="px-2 py-1 bg-muted rounded text-sm">globals.css</code> file
            </li>
          </ol>
          <div className="mt-6">
            <a 
              href="/themes" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Browse Themes
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
