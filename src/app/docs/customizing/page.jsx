export const metadata = {
  title: 'Customizing Themes - BrandCn Documentation',
  description: 'Learn how to customize BrandCn themes to match your brand. Modify colors, typography, spacing, and more.',
};

export default function CustomizingPage() {
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

        <h1 className="text-4xl font-bold mb-6">Customizing Themes</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Learn how to modify BrandCn themes to match your brand identity.
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Understanding CSS Variables</h2>
            <p className="text-muted-foreground mb-4">
              BrandCn themes use CSS custom properties (variables) for all colors, spacing, and typography. 
              This makes it easy to customize any aspect of the theme.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">{`:root {
  /* Colors */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  
  /* Border radius */
  --radius: 0.5rem;
  
  /* Typography */
  --font-sans: system-ui, sans-serif;
}`}</pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Changing Colors</h2>
            <p className="text-muted-foreground mb-4">
              To change a color, simply update the corresponding CSS variable. 
              BrandCn themes use HSL format for colors (Hue Saturation Lightness).
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">{`/* Change primary color to purple */
--primary: 262 83% 58%;

/* Change background to dark */
--background: 222 47% 11%;`}</pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Customizing Typography</h2>
            <p className="text-muted-foreground mb-4">
              Update font settings using CSS variables:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">{`/* Use custom font */
--font-sans: 'Inter', system-ui, sans-serif;

/* Adjust heading weights */
--heading-font-weight: 700;`}</pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Border Radius</h2>
            <p className="text-muted-foreground mb-4">
              Control the roundness of corners across your entire application:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">{`/* Square corners */
--radius: 0;

/* Fully rounded */
--radius: 9999px;

/* Custom size */
--radius: 1rem;`}</pre>
            </div>
          </section>

          <section className="mt-12 p-6 bg-primary/10 rounded-xl border">
            <h3 className="text-lg font-semibold mb-2">Pro Tip</h3>
            <p className="text-muted-foreground">
              Use CSS variables consistently throughout your project for easy theme management. 
              Change variables in one place and it updates across your entire application!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
