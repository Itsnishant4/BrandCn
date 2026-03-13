export const metadata = {
  title: 'Features - Why Choose BrandCn Theme Library',
  description: 'Discover why BrandCn is the best theme library for shadcn/ui and Tailwind CSS. Features include instant copy-paste, dark mode support, accessibility compliance, and more.',
  alternates: {
    canonical: 'https://brand-cn.vercel.app/features',
  },
  openGraph: {
    title: 'Features - BrandCn Theme Library',
    description: 'Instant copy-paste themes, dark mode support, accessibility compliant. Built for shadcn/ui and Tailwind CSS.',
    url: 'https://brand-cn.vercel.app/features',
  },
};

export default function FeaturesPage() {
  const features = [
    {
      title: 'Instant Copy-Paste',
      description: 'One-click to copy CSS variables. No npm install, no configuration needed. Just copy and paste into your globals.css.',
      icon: '⚡',
    },
    {
      title: 'Dark Mode Ready',
      description: 'Every theme comes with built-in dark mode support. All themes are tested for both light and dark modes.',
      icon: '🌙',
    },
    {
      title: 'Accessibility Compliant',
      description: 'All themes meet WCAG accessibility standards with proper color contrast ratios and ARIA support.',
      icon: '♿',
    },
    {
      title: 'shadcn/ui Compatible',
      description: 'Themes work seamlessly with shadcn/ui components. Uses standard utility classes like bg-primary, text-muted.',
      icon: '🧩',
    },
    {
      title: 'Tailwind CSS Native',
      description: 'Built with Tailwind CSS in mind. Uses native HSL color format that works perfectly with Tailwind.',
      icon: '🎨',
    },
    {
      title: 'Regular Updates',
      description: 'New themes added regularly. Request new themes or contribute your own through GitHub.',
      icon: '🔄',
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Choose BrandCn?</h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-2xl">
          The ultimate theme library for shadcn/ui and Tailwind CSS developers. 
          Beautiful, accessible, and production-ready themes in seconds.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl border bg-card">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <section className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">Browse our collection of 50+ professional themes</p>
          <a 
            href="/themes" 
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Browse Themes
          </a>
        </section>
      </main>
    </div>
  );
}
