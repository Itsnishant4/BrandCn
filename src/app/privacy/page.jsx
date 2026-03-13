export const metadata = {
  title: 'Privacy Policy - BrandCn',
  description: 'Read BrandCn privacy policy. We do not collect personal information. Our themes are free and open source.',
  alternates: {
    canonical: 'https://brand-cn.vercel.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">BrandCn</a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 2026</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p>
            This Privacy Policy describes how BrandCn ("we", "us", or "our") collects, uses, and discloses information when you use our website.
          </p>

          <h2 className="text-2xl font-bold mt-8">Information We Collect</h2>
          <p>
            We do not collect any personal information from users of our website. Our themes are free to use and do not require registration.
          </p>

          <h2 className="text-2xl font-bold mt-8">Third-Party Services</h2>
          <p>
            Our website may use third-party services for analytics and hosting (e.g., Vercel, Supabase). These services may collect anonymous usage data.
          </p>

          <h2 className="text-2xl font-bold mt-8">Cookies</h2>
          <p>
            We do not use cookies to track personal information. We may use local storage for non-essential features like saving your liked themes.
          </p>

          <h2 className="text-2xl font-bold mt-8">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page.
          </p>

          <h2 className="text-2xl font-bold mt-8">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our GitHub repository.
          </p>
        </div>
      </main>
    </div>
  );
}
