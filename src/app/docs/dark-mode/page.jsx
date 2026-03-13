export const metadata = {
  title: 'Dark Mode - BrandCn Documentation',
  description: 'Learn how BrandCn themes handle dark mode. All themes include automatic dark mode support with proper color contrast.',
};

export default function DarkModePage() {
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

        <h1 className="text-4xl font-bold mb-6">Dark Mode Support</h1>
        <p className="text-xl text-muted-foreground mb-12">
          All BrandCn themes include built-in dark mode support with proper color contrast and accessibility.
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground mb-4">
              BrandCn themes use CSS variables for both light and dark modes. The dark mode styles 
              are applied when the <code className="px-2 py-1 bg-muted rounded">.dark</code> class is added to the HTML element.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">{`:root {
  /* Light mode */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

.dark {
  /* Dark mode */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}`}</pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Using with shadcn/ui</h2>
            <p className="text-muted-foreground mb-4">
              If you're using shadcn/ui, dark mode is handled automatically through their theme provider:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">{`// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

export function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`}</pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Manual Toggle</h2>
            <p className="text-muted-foreground mb-4">
              You can also manually toggle dark mode by adding/removing the class:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">{`// Toggle dark mode
document.documentElement.classList.toggle('dark')

// Check if dark mode is enabled
const isDark = document.documentElement.classList.contains('dark')`}</pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
            <p className="text-muted-foreground mb-4">
              All BrandCn themes are designed with accessibility in mind. Dark mode colors maintain proper 
              contrast ratios for WCAG compliance.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Minimum 4.5:1 contrast ratio for text</li>
              <li>3:1 contrast ratio for large text and UI components</li>
              <li>No pure black (#000) or pure white (#fff) - reduces eye strain</li>
            </ul>
          </section>

          <section className="mt-12 p-6 bg-primary/10 rounded-xl border">
            <h3 className="text-lg font-semibold mb-2">Note</h3>
            <p className="text-muted-foreground">
              Dark mode is automatically applied based on user system preferences when using the shadcn/ui theme provider.
              You can also allow users to manually override this setting.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
