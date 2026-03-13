export const metadata = {
  title: 'Compare - BrandCn vs Other Theme Libraries',
  description: 'See how BrandCn compares to other theme libraries for shadcn/ui and Tailwind CSS. Find out why BrandCn is the best choice for your next project.',
  alternates: {
    canonical: 'https://brand-cn.vercel.app/compare',
  },
  openGraph: {
    title: 'Compare - BrandCn vs Other Theme Libraries',
    description: 'Compare BrandCn with other theme libraries. Free, open-source, instant copy-paste.',
    url: 'https://brand-cn.vercel.app/compare',
  },
};

export default function ComparePage() {
  const comparisons = [
    {
      feature: 'Pricing',
      brandcn: 'Free',
      others: 'Freemium / Paid',
    },
    {
      feature: 'Copy-Paste',
      brandcn: '✓ Instant',
      others: 'Requires setup',
    },
    {
      feature: 'Dark Mode',
      brandcn: '✓ All themes',
      others: 'Limited',
    },
    {
      feature: 'shadcn/ui ready',
      brandcn: '✓ Native',
      others: 'Partial',
    },
    {
      feature: 'Tailwind CSS',
      brandcn: '✓ Native',
      others: 'Requires config',
    },
    {
      feature: 'Open Source',
      brandcn: '✓ Yes',
      others: 'Usually No',
    },
    {
      feature: 'Theme Count',
      brandcn: '50+',
      others: '10-30',
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6">How We Compare</h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-2xl">
          See how BrandCn stacks up against other theme libraries in the market.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 pr-8 font-semibold">Feature</th>
                <th className="text-center py-4 px-8 font-semibold bg-primary/10 rounded-t-lg">BrandCn</th>
                <th className="text-center py-4 px-8 font-semibold text-muted-foreground">Others</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="py-4 pr-8">{row.feature}</td>
                  <td className="text-center py-4 px-8 bg-primary/5 font-medium text-primary">{row.brandcn}</td>
                  <td className="text-center py-4 px-8 text-muted-foreground">{row.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-16 p-8 rounded-xl border bg-card text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to try BrandCn?</h2>
          <p className="text-muted-foreground mb-8">Start using free themes in your project today.</p>
          <div className="flex justify-center gap-4">
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
              View on GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
