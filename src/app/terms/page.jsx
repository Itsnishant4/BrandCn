export const metadata = {
  title: 'Terms of Service - BrandCn',
  description: 'BrandCn terms of service. Our themes are open source under MIT license. Free to use in personal and commercial projects.',
  alternates: {
    canonical: 'https://brand-cn.vercel.app/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">BrandCn</a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 2026</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p>
            By using the BrandCn website and theme library, you agree to these terms. If you do not agree to these terms, please do not use our website.
          </p>

          <h2 className="text-2xl font-bold mt-8">Use of Themes</h2>
          <p>
            BrandCn themes are provided under the MIT License. You are free to use, modify, and distribute our themes in personal and commercial projects.
          </p>

          <h2 className="text-2xl font-bold mt-8">Intellectual Property</h2>
          <p>
            While our themes are open source, the underlying design concepts and brand names (e.g., "Linear", "Vercel") are property of their respective owners. Our themes are inspired by these designs but are original creations.
          </p>

          <h2 className="text-2xl font-bold mt-8">No Warranty</h2>
          <p>
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. We are not responsible for any issues arising from the use of our themes.
          </p>

          <h2 className="text-2xl font-bold mt-8">Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY. Our themes are provided without any guarantees.
          </p>

          <h2 className="text-2xl font-bold mt-8">User Data</h2>
          <p>
            We do not collect personal information. Any data stored locally (like liked themes) remains on your device.
          </p>

          <h2 className="text-2xl font-bold mt-8">Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the website constitutes acceptance of any changes.
          </p>

          <h2 className="text-2xl font-bold mt-8">Contact</h2>
          <p>
            For questions about these terms, please contact us through our GitHub repository.
          </p>
        </div>
      </main>
    </div>
  );
}
