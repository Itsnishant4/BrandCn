export const metadata = {
  title: 'About - BrandCn Theme Library',
  description: 'Learn about BrandCn, the ultimate theme library for shadcn/ui and Tailwind CSS. Open source, free to use, and built with love by developers for developers.',
  alternates: {
    canonical: 'https://brand-cn.vercel.app/about',
  },
  openGraph: {
    title: 'About - BrandCn Theme Library',
    description: 'Open source theme library for shadcn/ui and Tailwind CSS.',
    url: 'https://brand-cn.vercel.app/about',
  },
};

export default function AboutPage() {
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

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">About BrandCn</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            BrandCn is an open-source theme library for developers who use <strong>shadcn/ui</strong> and <strong>Tailwind CSS</strong>. 
            We believe beautiful design should be accessible to everyone.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            We started BrandCn to solve a simple problem: designers and developers spend too much time tweaking HSL values 
            to create beautiful themes. Our goal is to provide production-ready themes that you can copy and paste 
            directly into your project.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Why We Exist</h2>
          <p className="text-muted-foreground mb-6">
            Building a design system from scratch is time-consuming. Most theme libraries either require complex setup 
            or cost money. BrandCn is different - we offer:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
            <li>Instant copy-paste functionality</li>
            <li>Free and open source</li>
            <li>50+ professionally designed themes</li>
            <li>Built-in dark mode support</li>
            <li>Accessibility compliant designs</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Open Source</h2>
          <p className="text-muted-foreground mb-6">
            BrandCn is open source under the MIT license. This means you can use our themes in personal and commercial 
            projects without any restrictions. We welcome contributions from the community!
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Get Started</h2>
          <p className="text-muted-foreground mb-6">
            Ready to transform your project? Browse our theme gallery and find the perfect match for your next project.
          </p>
          
          <div className="flex gap-4 mt-8">
            <a 
              href="/themes" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Browse Themes
            </a>
            <a 
              href="https://github.com/Itsnishant4/BrandCn" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg border border-input bg-background hover:bg-accent"
            >
              Contribute on GitHub
            </a>
          </div>
        </div>

        <div className="mt-16 p-8 rounded-xl border bg-muted/50">
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="text-muted-foreground mb-4">
            Have questions or want to contribute? Reach out to us:
          </p>
          <div className="flex gap-6">
            <a 
              href="https://github.com/Itsnishant4/BrandCn" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
            <a 
              href="https://x.com/NishantPat78737" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
