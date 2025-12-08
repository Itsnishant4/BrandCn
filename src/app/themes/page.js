'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Copy, Eye, Search, Filter, Menu, Check, Grid, List, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from "@/components/ui/skeleton"
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'

const CustomSelect = ({ value, onChange, options }) => (
    <div className="relative">
        <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-full appearance-none rounded-md border border-border bg-card pl-9 pr-8 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
        <div className="absolute right-3 top-3 h-4 w-4 pointer-events-none opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </div>
    </div>
);

export default function ThemesPage() {
    const [themes, setThemes] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [copiedId, setCopiedId] = useState(null);
    const [viewMode, setViewMode] = useState('gallery');

    const fetchThemes = async (page = 1, append = false) => {
        try {
            const url = new URL('/api/themes', window.location.origin)
            url.searchParams.set('page', page.toString())
            url.searchParams.set('limit', '12')

            const res = await fetch(url)
            const data = await res.json()

            if (data.themes && Array.isArray(data.themes)) {
                setThemes(prev => append ? [...prev, ...data.themes] : data.themes)
                setHasNextPage(data.pagination?.hasNext || false)
                setCurrentPage(data.pagination?.page || 1)
            }
        } catch (error) {
            console.error('Error fetching themes:', error)
        }
    }

    useEffect(() => {
        const loadInitialThemes = async () => {
            try {
                await fetchThemes(1, false)
            } finally {
                setLoading(false)
            }
        }
        loadInitialThemes()
    }, [])

    useEffect(() => {
        const handleFilters = async () => {
            if (search !== '' || category !== 'all') {
                // When filtering, get all themes for proper client-side filtering
                try {
                    const res = await fetch('/api/themes?page=1&limit=1000')
                    const data = await res.json()
                    if (data.themes && Array.isArray(data.themes)) {
                        setThemes(data.themes)
                        setHasNextPage(false) // Disable infinite scroll during filtering
                    }
                } catch (error) {
                    console.error('Error fetching filtered themes:', error)
                }
            } else {
                // Reset to normal pagination when filters are cleared
                if (themes.length > 12) {
                    setLoading(true)
                    try {
                        await fetchThemes(1, false)
                        setTimeout(() => setHasNextPage(true), 100) // Re-enable infinite scroll
                    } finally {
                        setLoading(false)
                    }
                }
            }
        }

        handleFilters()
    }, [search, category])

    const filteredThemes = themes.filter(theme => {
        const matchesSearch = theme.name.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = category === 'all' || !category || theme.category === category
        return matchesSearch && matchesCategory
    })

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.05
            }
        }
    };
    // Load more themes function
    const loadMoreThemes = useCallback(async () => {
        if (!hasNextPage || loadingMore) return

        setLoadingMore(true)
        try {
            await fetchThemes(currentPage + 1, true)
        } finally {
            setLoadingMore(false)
        }
    }, [hasNextPage, loadingMore, currentPage, fetchThemes])

    const handleCopy = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);

    }

    // Intersection Observer for infinite scroll
    const observerRef = useRef()
    const lastElementRef = useCallback((node) => {
        if (loadingMore) return
        if (observerRef.current) observerRef.current.disconnect()

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage && search === '' && category === 'all') {
                loadMoreThemes()
            }
        })

        if (node) observerRef.current.observe(node)
    }, [loadingMore, hasNextPage, search, category, loadMoreThemes])

    return (
        <div className="min-h-screen md:w-5xl mx-auto  item-center flex flex-col bg-background">
            {/* Header Area */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md h-12 flex items-center px-4 justify-between max-w-5xl mx-auto">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <span className="flex items-center justify-center w-5 h-5 rounded hover:bg-muted transition-colors">
                        <Menu className="w-4 h-4" />
                    </span>
                    <Link href={"/"}>
                        <span className="text-foreground">BrandCn</span>
                    </Link>
                    <span className="text-muted-foreground">/</span>
                    <span>Gallery</span>
                </div>
                <AnimatedThemeToggler />
            </header>
            <motion.div
                className="relative flex justify-center items-center max-w-4xl mx-auto  w-full h-48  bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 overflow-hidden"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                style={{ backgroundSize: "400% 400%" }}
            >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
                <div className="relative z-10 px-6 md:px-20 text-center py-5">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl text-white font-bold tracking-tight mb-4 drop-shadow-md"
                    >
                        Explore the Gallery
                    </motion.h1>

                </div>
            </motion.div>
            <div className="px-6 md:px-44 -mt-8 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card rounded-xl border border-border shadow-xl p-4 flex flex-col sm:flex-row gap-4 items-center"
                >
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search themes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 border-border bg-muted focus:bg-card transition-all"
                        />
                    </div>
                    <div className="w-full sm:w-[200px]">
                        <CustomSelect
                            value={category}
                            onChange={setCategory}
                            options={[
                                { value: "all", label: "All Categories" },
                                { value: "company", label: "Company" },
                                { value: "framework", label: "Framework" },
                                { value: "product", label: "Product" },
                                { value: "tool", label: "Tool" },
                            ]}
                        />
                    </div>
                    <div className="flex gap-1">
                        <Button
                            variant={viewMode === 'gallery' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('gallery')}
                            className="h-9"
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className="h-9"
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Themes Area */}
            <div className="px-6 max-w-4xl w-full mx-auto py-12">
                {loading ? (
                    viewMode === 'gallery' ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="space-y-3">
                                    <Skeleton className="h-[180px] w-full rounded-xl" />
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-1/3" />
                                        <Skeleton className="h-4 w-1/4" />
                                    </div>
                                    <Skeleton className="h-8 w-full" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="flex gap-4">
                                    <Skeleton className="h-16 w-16 rounded-md" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-1/4" />
                                        <Skeleton className="h-8 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className={viewMode === 'gallery' ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}
                    >
                        {filteredThemes.map((theme) =>
                            viewMode === 'gallery' ? (
                                <motion.div key={theme.id} layout>
                                    <Card className="group flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-border">
                                        {/* Card Preview Area */}
                                        <div className="relative h-40 bg-linear-to-br from-muted to-accent p-6 flex items-center justify-center group-hover:from-purple-50 group-hover:to-indigo-50 transition-colors duration-500">
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                                            <Image
                                                src={`${theme.icon_url}`}
                                                alt={theme.name}
                                                width={100}
                                                height={100}
                                                className="h-full w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 relative z-10"
                                            />
                                            <Badge variant="secondary" className="absolute top-3 right-3 bg-card/80 backdrop-blur shadow-sm text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                                                {theme.category}
                                            </Badge>
                                        </div>

                                        {/* Card Content */}
                                        <div className="pb-5 px-5 flex flex-col grow">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-semibold text-foreground">{theme.name}</h3>
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 rounded-full bg-muted" />
                                                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                                                </div>
                                            </div>

                                            <div className="mt-auto flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 bg-card hover:bg-muted border-border text-foreground"
                                                    onClick={() => handleCopy(theme.code, theme.id)}
                                                >
                                                    {copiedId === theme.id ? (
                                                        <Check className="mr-2 h-3.5 w-3.5 text-green-600" />
                                                    ) : (
                                                        <Copy className="mr-2 h-3.5 w-3.5" />
                                                    )}
                                                    {copiedId === theme.id ? "Copied" : "Copy"}
                                                </Button>
                                                <Button size="sm" className="flex-1" asChild>
                                                    <Link href={`/themes/${theme.slug}`}>
                                                        <Eye className="mr-2 h-3.5 w-3.5" /> View
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ) : (
                                <motion.div key={theme.id} layout className="group flex w-3xl mx-auto items-center gap-4 p-4 border-b border-border hover:bg-muted/50 transition-colors duration-200">
                                    <div className="relative h-12 w-12 bg-linear-to-br from-muted to-accent rounded p-1.5 flex items-center justify-center shrink-0 group-hover:from-purple-50 group-hover:to-indigo-50 transition-colors duration-500">
                                        <Image
                                            src={`${theme.icon_url}`}
                                            alt={theme.name}
                                            width={48}
                                            height={48}
                                            className="h-full w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-foreground text-lg">{theme.name}</h3>
                                        <Badge variant="secondary" className="mt-1 text-xs uppercase tracking-wider font-medium">
                                            {theme.category}
                                        </Badge>
                                    </div>
                                    <div className="flex gap-3 shrink-0">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleCopy(theme.code, theme.id)}
                                            className="h-8 px-2 hover:bg-background"
                                        >
                                            {copiedId === theme.id ? (
                                                <>
                                                    <Check className="mr-1 h-3.5 w-3.5 text-green-600" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="mr-1 h-3.5 w-3.5" />
                                                    Copy
                                                </>
                                            )}
                                        </Button>
                                        <Button size="sm" variant="ghost" asChild className="h-8 px-2 hover:bg-background">
                                            <Link href={`/themes/${theme.slug}`}>
                                                <Eye className="mr-1 h-3.5 w-3.5" />
                                                View
                                            </Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            )
                        )}

                        {filteredThemes.length === 0 && (
                            viewMode === 'gallery' ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full py-20 text-center"
                                >
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground text-lg">No themes found matching your criteria.</p>
                                    <Button variant="link" onClick={() => { setSearch(''); setCategory('all') }} className="text-purple-600">
                                        Clear filters
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-20 text-center"
                                >
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground text-lg">No themes found matching your criteria.</p>
                                    <Button variant="link" onClick={() => { setSearch(''); setCategory('all') }} className="text-purple-600">
                                        Clear filters
                                    </Button>
                                </motion.div>
                            )
                        )}

                        {/* Infinite Scroll Sentinel */}

                    </motion.div>
                )}
                {hasNextPage && search === '' && category === 'all' && !loadingMore && filteredThemes.length >= 12 && (
                    <div ref={lastElementRef} className="flex justify-center py-8">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Loading more themes...</span>
                        </div>
                    </div>
                )}

                {/* Load More Button for when infinite scroll doesn't work or for filtered results */}
                {hasNextPage && search === '' && category === 'all' && !loading && (
                    <div className="flex justify-center mx-auto py-8 pt-4">
                        <Button
                            onClick={loadMoreThemes}
                            disabled={loadingMore}
                            variant="outline"
                            className="mx-auto"
                        >
                            {loadingMore ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                'Load More Themes'
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
