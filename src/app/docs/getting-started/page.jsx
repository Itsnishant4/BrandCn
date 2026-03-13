export const metadata = {
  title: 'Getting Started - BrandCn Documentation',
  description: 'Learn how to quickly get started with BrandCn themes. Simple setup guide for shadcn/ui and Tailwind CSS projects.',
};

export default function GettingStartedPage() {
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

        <h1 className="text-4xl font-bold mb-6">Getting Started</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Learn how to quickly set up BrandCn themes in your Next.js project with shadcn/ui and Tailwind CSS.
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Next.js 14+ project with App Router</li>
              <li>Tailwind CSS installed</li>
              <li>shadcn/ui initialized (optional but recommended)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
            <p className="text-muted-foreground mb-4">Follow these steps to add a BrandCn theme to your project:</p>
            
            <h3 className="text-xl font-semibold mb-3">Step 1: Browse Themes</h3>
            <p className="text-muted-foreground mb-4">
              Visit our <a href="/themes" className="text-primary hover:underline">theme gallery</a> and find a theme that matches your project.
            </p>

            <h3 className="text-xl font-semibold mb-3">Step 2: Copy the Theme</h3>
            <p className="text-muted-foreground mb-4">
              Click the "Copy CSS" button on your chosen theme. This copies all the CSS variables to your clipboard.
            </p>

            <h3 className="text-xl font-semibold mb-3">Step 3: Add to Your Project</h3>
            <p className="text-muted-foreground mb-4">
              Open your project's <code className="px-2 py-1 bg-muted rounded">globals.css</code> file and paste the theme variables.
            </p>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">{`/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Paste your theme variables here */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... more variables */
  }
  
  .dark {
    /* Dark mode variables */
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }
}`}</pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">That's It!</h2>
            <p className="text-muted-foreground">
              Your project now has a beautiful new theme. The theme will automatically apply to all your shadcn/ui components and Tailwind CSS elements.
            </p>
          </section>

          <section className="mt-12 p-6 bg-primary/10 rounded-xl border">
            <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
            <ul className="space-y-2">
              <li>→ <a href="/docs/customizing" className="hover:underline">Learn how to customize themes</a></li>
              <li>→ <a href="/docs/dark-mode" className="hover:underline">Understand dark mode support</a></li>
              <li>→ <a href="/docs/shadcn-integration" className="hover:underline">Explore shadcn/ui integration</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
