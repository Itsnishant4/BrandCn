export const metadata = {
  title: 'shadcn/ui Integration - BrandCn Documentation',
  description: 'Learn how BrandCn themes integrate seamlessly with shadcn/ui components. All themes work out of the box with shadcn/ui.',
};

export default function ShadcnIntegrationPage() {
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

      <div className="max-w-4xl mx-auto px-6 py-12">
        <nav className="mb-8 text-sm">
          <a href="/docs" className="text-primary hover:underline">← Back to Documentation</a>
        </nav>

        <h1 className="text-4xl font-bold mb-6">shadcn/ui Integration</h1>
        <p className="text-xl text-muted-foreground mb-12">
          BrandCn themes work seamlessly with shadcn/ui components. Learn how they integrate and what classes to use.
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground mb-4">
              BrandCn themes use the exact same CSS variable names that shadcn/ui expects. 
              This means themes automatically apply to all shadcn/ui components without any extra configuration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Supported Classes</h2>
            <p className="text-muted-foreground mb-4">
              All these shadcn/ui utility classes work with BrandCn themes:
            </p>
            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">{`/* Background colors */
bg-background, bg-foreground
bg-primary, bg-primary-foreground
bg-secondary, bg-secondary-foreground
bg-muted, bg-muted-foreground
bg-accent, bg-accent-foreground
bg-card, bg-popover

/* Text colors */
text-background, text-foreground
text-primary, text-primary-foreground
text-secondary, text-secondary-foreground
text-muted, text-muted-foreground
text-accent, text-accent-foreground

/* Border colors */
border-input
border-ring
border-primary

/* And more... */`}</pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Example Components</h2>
            <p className="text-muted-foreground mb-4">
              Here's how BrandCn themes style shadcn/ui components:
            </p>
            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">{`/* Button component */
<Button className="bg-primary text-primary-foreground hover:bg-primary/90" />

/* Card component */
<Card className="bg-card text-card-foreground border-border">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
</Card>

/* Input component */
<Input className="bg-background border-input focus:ring-ring" />`}</pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why It Works</h2>
            <p className="text-muted-foreground mb-4">
              Both BrandCn and shadcn/ui use CSS variables that map to Tailwind's color system. 
              When you apply a theme, all the variables update automatically.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">{`/* shadcn/ui uses these variables */
.bg-primary {
  background-color: hsl(var(--primary));
}

/* BrandCn defines these variables */
:root {
  --primary: 221.2 83.2% 53.3%;
}`}</pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Installation</h2>
            <p className="text-muted-foreground mb-4">
              If you haven't set up shadcn/ui yet, here's how:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">{`/* Initialize shadcn/ui */
npx shadcn@latest init

/* Add components */
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input`}</pre>
            </div>
          </section>

          <section className="mt-12 p-6 bg-primary/10 rounded-xl border">
            <h3 className="text-lg font-semibold mb-2">Compatibility</h3>
            <p className="text-muted-foreground">
              BrandCn themes are compatible with shadcn/ui v0.5+ and Tailwind CSS v3+. 
              They also work with Tailwind v4 with minimal adjustments.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
