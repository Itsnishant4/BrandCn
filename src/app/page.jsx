"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, Search, ArrowRight, Layout, Palette, Zap, Moon,
  Terminal, CheckCircle2, Check, Star, MoreHorizontal,
  Code2,
  GitBranch,
  Monitor,
  Sparkles,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Github } from "lucide-react";

const Card = ({ className, children, ...props }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);


const GitHubStats = () => {
  const [stars, setStars] = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/Itsnishant4/BrandCn')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count)
        }
      })
      .catch(err => console.error('Failed to fetch GitHub stars:', err))
  }, [])

  return (
    <Link
      href="https://github.com/Itsnishant4/BrandCn"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      <Github className="h-4 w-4" />
      {stars !== null && (
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-current" />
          {stars.toLocaleString()}
        </span>
      )}
    </Link>
  )
}




const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border-b border-border">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:text-foreground text-muted-foreground w-full text-left"
          >
            <span className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">▶</span> {item.question}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 }
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <div className="pb-4 pt-0 text-sm text-muted-foreground px-6">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen md:w-5xl mx-auto bg-background text-foreground font-sans selection:bg-purple-100">

     
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md h-12 flex items-center px-4 justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <span className="flex items-center justify-center w-5 h-5 rounded hover:bg-muted transition-colors">
            <Menu className="w-4 h-4" />
          </span>
          <span className="text-foreground">BrandCn</span>
          <span className="text-muted-foreground">/</span>
          <span>Home</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => router.push(`/themes?search=${encodeURIComponent(search)}`)}>
              <Search className="w-3 h-3" />
            </Button>
          </div>
          <Button size="sm" className="h-7 text-xs px-3" asChild>
            <Link href="/themes">Get Started</Link>
          </Button>
            <GitHubStats />
          <AnimatedThemeToggler />
        </div>

      </header>

      <main className="max-w-4xl mx-auto pb-32">
        <motion.div
          className="group relative  h-48 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-90"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          style={{ backgroundSize: "400% 400%" }}
        >
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Badge variant="secondary" className="bg-card/50 backdrop-blur hover:bg-card/80 cursor-pointer text-xs">
              Change cover
            </Badge>
          </div>
        </motion.div>


        <div className="px-8 md:px-20 relative -mt-10 mb-16">

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative -rotate-6 w-20 h-20 md:w-24 md:h-24 text-6xl flex items-center justify-center bg-transparent drop-shadow-sm select-none hover:scale-105 transition-transform cursor-pointer"
          >
            😎
          </motion.div>

          <div className="mt-1 space-y-6">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
              >
                The Ultimate Theme Library
              </motion.h1>

              <motion.div variants={fadeInUp} className="flex items-center gap-4 mt-6 text-muted-foreground border-b border-border pb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src="https://firebasestorage.googleapis.com/v0/b/ganesha-9f5a9.appspot.com/o/uploads%2F1765095680889_logo.png?alt=media&token=d78ebf4c-41bc-4e7d-bef4-e19e232a6ffe" />
                    <AvatarFallback>UI</AvatarFallback>
                  </Avatar>
                  <span>Created by BrandCn</span>
                </div>
                <span className="text-muted-foreground/50">•</span>
                <div className="text-sm">Updated today</div>
                <span className="text-muted-foreground/50">•</span>
                <Badge variant="secondary" className="text-xs font-normal">v2.0 Beta</Badge>
              </motion.div>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              initial="initial" animate="animate"
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
            >
              Stop wasting time tweaking HSL values. A curated collection of accessible, dark-mode ready themes for
              <span className="px-1.5 py-0.5 mx-1 rounded-md bg-muted text-foreground font-mono text-md  inset-shadow-sm  border ">shadcn/ui</span>
              and
              <span className="px-1.5 py-0.5 mx-1 rounded-md bg-muted text-foreground font-mono text-md  inset-shadow-sm  border ">Tailwind CSS</span>
              .
            </motion.p>



          </div>
        </div>

        <div className="px-8 md:px-20 space-y-16">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            <Button size="lg" className="h-10 text-sm font-medium shadow-sm" asChild>
              <Link href="/themes">Browse Gallery <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>

          </motion.div>

          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Sparkles className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-foreground">Trending Now</h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-card border border-border rounded-2xl overflow-hidden grid md:grid-cols-2 shadow-lg"
            >
              <div className="p-8 flex flex-col justify-center space-y-4">
                <Badge className="w-fit " variant="outline">Best of the month</Badge>
                <h3 className="text-3xl font-bold">Gemini Ultra</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A futuristic, clean interface with deep blues, subtle gradients, and rounded aesthetics. Perfect for AI dashboards and modern SaaS apps.
                </p>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="gap-2"><Eye className="w-4 h-4" /> Preview</Button>
                  <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90"><Code2 className="w-4 h-4" /> Copy CSS</Button>
                </div>
              </div>
              <div className="bg-muted p-8 flex items-center justify-center border-l border-border relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05]" />
                <div className="relative z-10 w-64 h-48 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md flex flex-col p-4 space-y-2 rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="h-4 w-1/3 bg-black/10 rounded" />
                  <div className="h-24 w-full bg-purple-100 border-2 border-black/10 rounded flex items-center justify-center">
                    <span className="font-bold text-purple-900">Hero Section</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-1/2 bg-black text-white text-xs flex items-center justify-center font-bold">CTA</div>
                    <div className="h-8 w-1/2 border-2 border-black text-xs flex items-center justify-center font-bold">Learn More</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Layout className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-foreground">Features Database</h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]"
            >
              <Card className="md:col-span-2 row-span-2 group bg-card  border-border overflow-hidden relative group">
                <div className="absolute inset-0 group-hover:bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <CardContent className="px-6 pt-6 flex flex-col h-full justify-between relative z-10">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-card border shadow-sm flex items-center justify-center">
                      <Palette className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-lg">Visual Theme Gallery</h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Browse 50+ themes inspired by top-tier products. Visual previews for light and dark modes.
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="w-full h-38 bg-card rounded-t-xl border shadow-lg translate-y-4 group-hover:translate-y-2 transition-transform p-3 space-y-2"
                  >
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="h-2 w-1/2 bg-muted rounded" />
                    <div className="h-16 w-full bg-muted rounded border border-dashed border-border" />
                  </motion.div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:bg-muted transition-colors">
                <CardContent className="p-6 flex flex-col h-full justify-between">
                  <Zap className="w-6 h-6 text-yellow-500 mb-2" />
                  <div>
                    <h3 className="font-medium">Instant Copy</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      One-click to copy CSS variables. No npm install needed.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:bg-muted transition-colors">
                <CardContent className="p-6 flex flex-col h-full justify-between">
                  <Moon className="w-6 h-6 text-blue-500 mb-2" />
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Automatic dark mode support for every single theme.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-3 bg-gradient-to-r from-card to-muted border-border">
                <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between h-full gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                      <Code2 className="w-4 h-4" />
                      <span>Native Compatibility</span>
                    </div>
                    <h3 className="font-semibold text-lg">Built for Shadcn Classes</h3>
                    <p className="text-sm text-muted-foreground leading-[30px]  max-w-md">
                      Seamlessly integrates with standard utility classes like <code className="px-1.5 py-0.5 mx-1 text-nowrap rounded-md bg-muted text-foreground font-mono text-md  inset-shadow-sm  border">bg-primary</code>, <code className="px-1.5 text-nowrap py-0.5 mx-1 rounded-md bg-muted text-foreground font-mono text-md  inset-shadow-sm  border">text-muted</code>, and <code className="px-1.5 text-nowrap py-0.5 mx-1 rounded-md bg-muted text-foreground font-mono text-md  inset-shadow-sm  border">border-input</code>.
                    </p>
                  </div>
                  <div className="hidden sm:block font-mono text-xs text-muted-foreground bg-muted p-3 rounded border border-border">
                    &lt;<span className="text-red-500">Button</span> <span className="text-purple-600">className</span>="<span className="text-green-600">bg-primary text-primary-foreground</span>" /&gt;
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Terminal className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-foreground">Under the Hood</h2>
            </div>

            <div className="bg-[#1e1e1e] rounded-xl border border-border shadow-2xl overflow-hidden text-sm">
              <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-[#3e3e3e]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-400 text-xs ml-2 font-mono">globals.css</span>
              </div>
              <div className="p-6 font-mono overflow-x-auto text-gray-300 leading-relaxed">
                <p><span className="text-purple-400">@layer</span> base &#123;</p>
                <p className="pl-4"><span className="text-yellow-300">:root</span> &#123;</p>
                <p className="pl-8"><span className="text-blue-300">--background</span>: <span className="text-orange-300">0 0% 100%</span>; <span className="text-gray-500">// White</span></p>
                <p className="pl-8"><span className="text-blue-300">--foreground</span>: <span className="text-orange-300">222.2 84% 4.9%</span>; <span className="text-gray-500">// Dark Blue</span></p>
                <p className="pl-8"><span className="text-blue-300">--primary</span>: <span className="text-orange-300">221.2 83.2% 53.3%</span>; <span className="text-gray-500">// Brand Blue</span></p>
                <p className="pl-8"><span className="text-blue-300">--radius</span>: <span className="text-orange-300">0.5rem</span>;</p>
                <p className="pl-4">&#125;</p>
                <p className="pl-4 mt-2"><span className="text-yellow-300">.dark</span> &#123;</p>
                <p className="pl-8"><span className="text-blue-300">--background</span>: <span className="text-orange-300">222.2 84% 4.9%</span>;</p>
                <p className="pl-8"><span className="text-blue-300">--foreground</span>: <span className="text-orange-300">210 40% 98%</span>;</p>
                <p className="pl-4">&#125;</p>
                <p>&#125;</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-foreground">How to use</h2>
            </div>

            <div className="space-y-1 pl-2">
              {[
                "Browse the gallery and find a style you love",
                "Click the 'Copy CSS' button on the card",
                "Open your app's global.css file",
                "Paste the variables into :root and .dark layers",
                "Enjoy your new design system 🎉"
              ].map((step, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="flex items-start gap-3 p-2 hover:bg-muted rounded-md transition-colors group"
                >
                  <div className="mt-1 w-5 h-5 border border-border rounded flex items-center justify-center text-transparent group-hover:text-green-500 group-hover:border-green-200 bg-card transition-all">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">{step}</span>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <GitBranch className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-foreground">Roadmap</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4 border-l-2 border-green-500/50 pl-4">
                <h3 className="font-semibold text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Released</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 50+ Pro Themes</li>
                  <li>• Dark Mode Support</li>
                  <li>• Copy-Paste Logic</li>
                </ul>
              </div>
              <div className="space-y-4 border-l-2 border-yellow-500/50 pl-4">
                <h3 className="font-semibold text-sm flex items-center gap-2"><Monitor className="w-4 h-4 text-yellow-500" /> In Progress</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Theme Builder UI</li>
                  <li>• Color Blindness Check</li>
                  <li>• Contrast Scorer</li>
                </ul>
              </div>

            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Star className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-foreground">Community Feedback</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="p-4 rounded-lg bg-muted border border-border hover:bg-card hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={`https://avatar.vercel.sh/${t.name}`} />
                      <AvatarFallback>{t.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{t.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    "{t.text}"
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="space-y-4 pb-12">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-foreground">Questions</h2>
            </div>

            <Accordion items={FAQS} />
          </section>

        </div>
      </main>

      <footer className="border-t py-12 mt-12 bg-muted/50">
        <div className="max-w-5xl mx-auto px-8 md:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Themes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/themes" className="hover:text-foreground transition-colors">Browse All</Link></li>
                <li><Link href="/themes?category=company" className="hover:text-foreground transition-colors">Company</Link></li>
                <li><Link href="/themes?category=framework" className="hover:text-foreground transition-colors">Framework</Link></li>
                <li><Link href="/themes?category=product" className="hover:text-foreground transition-colors">Product</Link></li>
                <li><Link href="/themes?category=tool" className="hover:text-foreground transition-colors">Tools</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/use-cases" className="hover:text-foreground transition-colors">Use Cases</Link></li>
                <li><Link href="/compare" className="hover:text-foreground transition-colors">Compare</Link></li>
                <li><Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="https://github.com/Itsnishant4/BrandCn" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</Link></li>
                <li><Link href="https://x.com/NishantPat78737" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="/license" className="hover:text-foreground transition-colors">License</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">Built with ❤️ and Shadcn UI. Open source and free to use.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <span>© 2026 BrandCn</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


const TESTIMONIALS = [
  {
    text: "I literally just copied the Linear theme and my app looks 10x better.",
    name: "Alex Rivera",
  },
  {
    text: "The best collection of Shadcn themes I've found. Dark mode is spot on.",
    name: "Sarah Chen",
  },
  {
    text: "A clean way to manage design tokens without the headache.",
    name: "Marcus J.",
  },
  {
    text: "Finally, decent palettes that work with standard Tailwind classes.",
    name: "David K.",
  }
]

const FAQS = [
  {
    question: "Is this free to use?",
    answer: "Yep, totally free and open source 🍋. Use it in personal or commercial projects, no problem at all."
  },
  {
    question: "Does it work with Tailwind v4?",
    answer: "Yesss 😎 all themes use simple CSS vars, so they work fine with Tailwind v4's new engine."
  },
  {
    question: "How do I use a theme?",
    answer: "Just open the theme file → copy the variables → paste inside your main CSS file. That's literally it 💥."
  },
  {
    question: "Do I need to install any npm package?",
    answer: "Nope! Zero installation, zero nonsense. Just copy and paste the code 😌."
  },
  {
    question: "Will you add more brand themes?",
    answer: "Yes ofc! Slowly adding more when I get time ⏳. You can also contribute if you want 💛."
  },
  {
    question: "Can i use this in my client projects?",
    answer: "Absolutely yes 🙌. Just follow the open-source license rules if you modify the repo."
  },
  {
    question: "Where can I add preview images?",
    answer: "You can put them inside an /images folder and link them in your README using markdown 🖼️."
  },
  {
    question: "Can I contribute new themes?",
    answer: "Yup! Just submit a PR with your theme file and I'll check it fast (unless I'm sleeping 😴)."
  }
];


