"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft, Copy, Check, LayoutDashboard,
    Settings, Users, BarChart3, Bell, Search,
    Plus, Calendar, Sun, Moon
} from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ThemePreview } from "@/components/theme-preview";

// --- MOCK UI COMPONENTS (Consistent with Gallery) ---




// --- ANIMATION VARIANTS ---
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
};

export default function ThemeDetailPage() {

    const { slug } = useParams()
    const [theme, setTheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {

        if (slug) {

            fetch(`/api/themes/${slug}`)

                .then(res => res.json())

                .then(data => {

                    setTheme(data)

                    setLoading(false)

                })

                .catch(() => setLoading(false))

        }

    }, [slug])

    const handleCopy = () => {
        if (!theme) return;
        navigator.clipboard.writeText(theme.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-3">
            <div className="w-8 h-8 border-2 border-border border-t-foreground rounded-full animate-spin" />
            <p className="text-muted-foreground text-sm animate-pulse">Loading Theme...</p>
        </div>
    );

    if (!theme) return <div className="h-screen flex items-center justify-center">Theme not found</div>;

    return (
        <div className="min-h-screen md:w-5xl mx-auto bg-background text-foreground font-sans selection:bg-purple-100">

            {/* --- STICKY HEADER --- */}
            <div className="sticky top-0 z-50 w-5xl border-b bg-background/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto h-16 flex items-center justify-between ">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild className="rounded-full text-muted-foreground hover:text-foreground">
                            <Link href="/themes"><ChevronLeft className="w-5 h-5" /></Link>
                        </Button>
                        <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {theme.iconUrl && <img src={theme.iconUrl} alt={theme.name} className="h-6 w-6 object-contain" />}
                            <h2 className=" text-lg text-foreground">{theme.name}</h2>
                            <Badge variant="secondary" className="hidden sm:inline-flex bg-muted text-muted-foreground">{theme.category}</Badge>
                        </div>
                    </div>
                    <Button onClick={handleCopy} className={copied ? "bg-green-600 hover:bg-green-700 text-white" : ""}>
                        {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                        {copied ? "Copied!" : "Copy CSS"}
                    </Button>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <main className="max-w-5xl mx-auto pb-20">

                {/* AMBIENT HEADER BACKGROUND */}
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

                    {/* Header Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="w-24 h-24 rounded-2xl bg-card p-4 shadow-xl flex items-center justify-center mb-6">
                            <Image src={theme.icon_url} width={100} height={100} className="w-full h-full object-contain" alt="Icon" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-semibold text-foreground mb-2">{theme.name}</h1>
                            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{theme.description}</p>
                        </div>
                    </motion.div>

                    {/* Preview Section */}
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

                    {/* Code Section */}
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
                </div>
            </main>
        </div>
    );
}