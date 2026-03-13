"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft, Copy, Check, LayoutDashboard,
    Settings, Users, BarChart3, Bell, Search,
    Plus, Calendar, Sun, Moon, Heart, Eye, Download
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ThemePreview } from "@/components/theme-preview";




const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
};

export default function ThemeDetailClient({ theme: initialTheme }) {
    const [theme, setTheme] = useState(initialTheme);
    const [copied, setCopied] = useState(false);
    const [liked, setLiked] = useState(false);
    const [copyCount, setCopyCount] = useState(initialTheme?.copy_count || 0);

    useEffect(() => {
        const likedThemes = JSON.parse(localStorage.getItem('likedThemes') || '[]');
        setLiked(likedThemes.includes(theme?.slug));
    }, [theme?.slug])

    useEffect(() => {
        if (theme) {
            const productSchema = {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": theme.name,
                "description": theme.description || `Get the ${theme.name} theme for shadcn/ui and Tailwind CSS`,
                "image": theme.icon_url,
                "category": theme.category,
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                }
            };
            
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(productSchema);
            document.head.appendChild(script);
            
            return () => {
                document.head.removeChild(script);
            };
        }
    }, [theme]);

    const handleLike = () => {
        if (!theme) return;
        const likedThemes = JSON.parse(localStorage.getItem('likedThemes') || '[]');
        let newLikedThemes;

        if (liked) {
            newLikedThemes = likedThemes.filter(s => s !== theme.slug);
            setLiked(false);
        } else {
            newLikedThemes = [...likedThemes, theme.slug];
            setLiked(true);
        }

        localStorage.setItem('likedThemes', JSON.stringify(newLikedThemes));
    };

    const handleCopy = async () => {
        if (!theme) return;
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        try {
            await navigator.clipboard.writeText(theme.code);

            const response = await fetch('/api/themes', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: theme.id, action: 'increment_copy' })
            });

            if (response.ok) {
                const data = await response.json();
                setCopyCount(data.copy_count);
            }

        } catch (error) {
            console.error('Error copying theme:', error);
        }
    };

    if (!theme) return <div className="h-screen flex items-center justify-center">Theme not found</div>;

    return (
        <div className="min-h-screen md:w-5xl w-full mx-auto bg-background text-foreground font-sans selection:bg-purple-100">

            <div className="sticky top-0 z-50 md:w-5xl border-b bg-background/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto h-16 flex items-center justify-between ">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild className="rounded-full text-muted-foreground hover:text-foreground">
                            <Link href="/themes"><ChevronLeft className="w-5 h-5" /></Link>
                        </Button>
                        <div className="flex items-center gap-3">
                            {theme.icon_url && <Image src={theme.icon_url} alt={theme.name} width={24} height={24} className="h-6 w-6 object-contain" />}
                            <span className=" text-lg text-foreground">{theme.name}</span>
                            <Badge variant="secondary" className="hidden sm:inline-flex bg-muted text-muted-foreground">{theme.category}</Badge>
                        </div>
                    </div>
                    <Button onClick={handleCopy} className={copied ? "bg-green-600 hover:bg-green-700 text-white " : "mr-2!"}>
                        {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                        {copied ? "Copied!" : "Copy CSS"}
                    </Button>
                </div>
            </div>

            <nav aria-label="Breadcrumb" className="px-6 md:px-8 py-3 border-b">
                <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                    <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
                    <li>/</li>
                    <li><Link href="/themes" className="hover:text-foreground transition-colors">Themes</Link></li>
                    <li>/</li>
                    <li><Link href={`/themes?category=${theme.category}`} className="hover:text-foreground transition-colors capitalize">{theme.category}</Link></li>
                    <li>/</li>
                    <li className="text-foreground font-medium">{theme.name}</li>
                </ol>
            </nav>

      
            <main className="max-w-5xl mx-auto pb-20">

          
                <motion.div
                    className="relative w-full h-48 md:h-64 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 overflow-hidden"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                    style={{ backgroundSize: "400% 400%" }}
                >
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
                </motion.div>

                <div className="px-6 md:px-8 -mt-20 relative z-10 space-y-12">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="w-24 h-24 rounded-2xl bg-card p-4 shadow-xl flex items-center justify-center mb-6">
                            <Image src={theme.icon_url} width={100} height={100} className="w-full h-full object-contain" alt="Icon" />
                        </div>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h1 className="text-4xl font-semibold text-foreground mb-2">{theme.name}</h1>
                                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{theme.description}</p>
                            </div>
                            <div className="flex items-center gap-4 ml-8">
                                <Button
                                    variant="outline"
                                    onClick={handleLike}
                                    className={`flex items-center gap-2 transition-colors ${liked ? 'text-red-500 border-red-200 hover:bg-red-50' : 'text-muted-foreground hover:text-red-500'}`}
                                >
                                    <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                                    <span className="text-sm">{liked ? 'Liked' : 'Like'}</span>
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span>{copyCount} copies</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                                <span>{liked ? 'Liked' : 'Not liked'}</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        initial="initial" animate="animate"
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between border-b border-border pb-2">
                            <h2 className="text-xl font-semibold  text-foreground">Component Preview</h2>
                            <span className="text-xs text-muted-foreground font-mono">dashboard.tsx</span>
                        </div>
                        <div className="rounded-xl border border-border bg-card p-2 shadow-sm">
                            <ThemePreview code={theme.code} />
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        initial="initial" animate="animate"
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between border-b border-border pb-2">
                            <h2 className="text-xl  text-foreground">CSS Variables</h2>
                            <span className="text-xs text-muted-foreground font-mono">globals.css</span>
                        </div>

                        <div className="relative rounded-xl border border-border bg-muted p-1 group">
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="secondary" size="sm" onClick={handleCopy} className="bg-card shadow-sm border border-border text-foreground">
                                    <Copy className="w-3.5 h-3.5 mr-2" /> Copy
                                </Button>
                            </div>
                            <div className="max-h-[500px] overflow-y-auto rounded-lg bg-card border border-border p-6 scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent">
                                <pre className="text-xs sm:text-sm font-mono leading-relaxed text-muted-foreground">
                                    <code>{theme.code}</code>
                                </pre>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        initial="initial" animate="animate"
                        className="space-y-4 pt-8 border-t"
                    >
                        <h2 className="text-xl font-semibold text-foreground">Related Themes</h2>
                        <p className="text-muted-foreground">Explore more themes in the {theme.category} category</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {initialTheme.relatedThemes?.map((relatedTheme) => (
                                <Link 
                                    key={relatedTheme.slug} 
                                    href={`/themes/${relatedTheme.slug}`}
                                    className="p-4 rounded-xl border border-border bg-card hover:bg-muted transition-colors"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        {relatedTheme.icon_url && (
                                            <Image 
                                                src={relatedTheme.icon_url} 
                                                alt={relatedTheme.name} 
                                                width={32} 
                                                height={32} 
                                                className="h-8 w-8 object-contain" 
                                            />
                                        )}
                                        <span className="font-medium">{relatedTheme.name}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedTheme.description}</p>
                                </Link>
                            ))}
                        </div>
                        <Button variant="outline" asChild className="w-full mt-4">
                            <Link href={`/themes?category=${theme.category}`}>
                                View All {theme.category} Themes
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
