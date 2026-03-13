export const metadata = {
  title: 'Contact - BrandCn Theme Library',
  description: 'Get in touch with BrandCn. Questions about themes, contributions, partnerships, or just want to say hello? We would love to hear from you.',
  alternates: {
    canonical: 'https://brand-cn.vercel.app/contact',
  },
  openGraph: {
    title: 'Contact - BrandCn Theme Library',
    description: 'Get in touch with the BrandCn team.',
    url: 'https://brand-cn.vercel.app/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">BrandCn</a>
          <nav className="flex gap-6 text-sm">
            <a href="/themes" className="hover:text-foreground text-muted-foreground">Themes</a>
            <a href="/features" className="hover:text-foreground text-muted-foreground">Features</a>
            <a href="/docs" className="hover:text-foreground text-muted-foreground">Docs</a>
            <a href="/about" className="hover:text-foreground text-muted-foreground">About</a>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Have questions about BrandCn? Want to contribute? Just want to say hello? 
          We would love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 rounded-xl border bg-card">
            <h3 className="text-lg font-semibold mb-2">GitHub</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Report bugs, request features, or contribute to the project.
            </p>
            <a 
              href="https://github.com/Itsnishant4/BrandCn" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              github.com/Itsnishant4/BrandCn →
            </a>
          </div>

          <div className="p-6 rounded-xl border bg-card">
            <h3 className="text-lg font-semibold mb-2">Twitter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Follow us for updates and news about new themes.
            </p>
            <a 
              href="https://x.com/NishantPat78737" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @NishantPat78737 →
            </a>
          </div>

          <div className="p-6 rounded-xl border bg-card">
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground text-sm mb-4">
              For business inquiries or general questions.
            </p>
            <a 
              href="mailto:patelnishant2006@gmail.com" 
              className="text-primary hover:underline"
            >
              patelnishant2006@gmail.com
            </a>
          </div>

          <div className="p-6 rounded-xl border bg-card">
            <h3 className="text-lg font-semibold mb-2">Discord</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Join our community to discuss themes and get help.
            </p>
            <span className="text-muted-foreground text-sm">
              Coming soon
            </span>
          </div>
        </div>

        <div className="p-8 rounded-xl border bg-muted/50">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Can I use BrandCn themes in commercial projects?</h3>
              <p className="text-muted-foreground">
                Yes! All BrandCn themes are open source under the MIT license. You can use them in personal and commercial projects without any restrictions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do I request a new theme?</h3>
              <p className="text-muted-foreground">
                Open an issue on our GitHub repository with your theme request. We also welcome pull requests if you want to contribute your own theme!
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer custom theme design?</h3>
              <p className="text-muted-foreground">
                Contact us via email for custom theme design services. We can create custom themes tailored to your brand.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
