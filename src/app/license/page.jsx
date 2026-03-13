export const metadata = {
  title: 'License - BrandCn',
  description: 'BrandCn themes are open source under MIT license. Free to use in personal and commercial projects.',
  alternates: {
    canonical: 'https://brand-cn.vercel.app/license',
  },
};

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">BrandCn</a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">License</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            BrandCn themes are open source and available under the MIT License.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">MIT License</h2>
          
          <pre className="bg-muted p-6 rounded-lg overflow-x-auto text-sm">
{`MIT License

Copyright (c) 2024-2026 BrandCn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
          </pre>

          <h2 className="text-2xl font-bold mt-12 mb-4">What This Means</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>You can use our themes in personal projects</li>
            <li>You can use our themes in commercial projects</li>
            <li>You can modify and adapt our themes</li>
            <li>You can distribute our themes</li>
            <li>You can use them privately or commercially</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Brand Names</h2>
          <p className="text-muted-foreground">
            While our themes are inspired by popular products (like Linear, Vercel, etc.), 
            the themes themselves are original designs. The brand names mentioned in theme 
            descriptions are for inspiration purposes only and are not affiliated with or 
            endorsed by BrandCn.
          </p>
        </div>
      </main>
    </div>
  );
}
