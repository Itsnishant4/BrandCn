'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Copy, Eye, Search, Filter, Menu, Check, Grid, List, Loader2, ArrowUpDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'



export default function ThemesPage() {
    const [themes, setThemes] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [sortBy, setSortBy] = useState('created_at')
    const [sortOrder, setSortOrder] = useState('desc')
    const [copiedId, setCopiedId] = useState(null);
    const [viewMode, setViewMode] = useState('gallery');

    const fetchThemes = async (page = 1, append = false, sortByParam = sortBy, orderParam = sortOrder) => {
        try {
            const url = new URL('/api/themes', window.location.origin)
            url.searchParams.set('page', page.toString())
            url.searchParams.set('limit', '12')
            if (sortByParam) url.searchParams.set('sortBy', sortByParam)
            if (orderParam) url.searchParams.set('order', orderParam)

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
                try {
                    const res = await fetch('/api/themes?page=1&limit=1000')
                    const data = await res.json()
                    if (data.themes && Array.isArray(data.themes)) {
                        setThemes(data.themes)
                        setHasNextPage(false) 
                    }
                } catch (error) {
                    console.error('Error fetching filtered themes:', error)
                }
            } else {
       
                if (themes.length > 12) {
                    setLoading(true)
                    try {
                        await fetchThemes(1, false)
                        setTimeout(() => setHasNextPage(true), 100) 
                    } finally {
                        setLoading(false)
                    }
                }
            }
        }

        handleFilters()
    }, [search, category])

    useEffect(() => {
        const handleSortingChange = async () => {
            setLoading(true)
            try {
                await fetchThemes(1, false, sortBy, sortOrder)
            } finally {
                setLoading(false)
            }
        }

        if (search === '' && category === 'all') {
            handleSortingChange()
        }
    }, [sortBy, sortOrder])

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
    const loadMoreThemes = useCallback(async () => {
        if (!hasNextPage || loadingMore) return

        setLoadingMore(true)
        try {
            await fetchThemes(currentPage + 1, true, sortBy, sortOrder)
        } finally {
            setLoadingMore(false)
        }
    }, [hasNextPage, loadingMore, currentPage, fetchThemes, sortBy, sortOrder])

    const handleCopy = async (code, id) => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
        try {
            await navigator.clipboard.writeText(code);

            const response = await fetch('/api/themes', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, action: 'increment_copy' })
            });

            if (response.ok) {
                setThemes(prev => prev.map(theme =>
                    theme.id === id
                        ? { ...theme, copy_count: (theme.copy_count || 0) + 1 }
                        : theme
                ));
            }

        } catch (error) {
            console.error('Error copying theme:', error);
        }
    }

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
            <Header title="Gallery" />
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
                    <div className="">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className=" h-9 justify-start pl-9">
                                    <Filter className=" h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setCategory('all')}>All Categories</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setCategory('company')}>Company</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setCategory('framework')}>Framework</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setCategory('product')}>Product</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setCategory('tool')}>Tool</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="">
                        <div className="relative">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full h-9 justify-start pl-8">
                                        <ArrowUpDown className=" h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => { setSortBy('created_at'); setSortOrder('desc'); }}>Newest First</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setSortBy('created_at'); setSortOrder('asc'); }}>Oldest First</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setSortBy('name'); setSortOrder('asc'); }}>Name A-Z</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setSortBy('name'); setSortOrder('desc'); }}>Name Z-A</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setSortBy('copy_count'); setSortOrder('desc'); }}>Most Copied</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setSortBy('copy_count'); setSortOrder('asc'); }}>Least Copied</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            
                        </div>
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
                                                        <>
                                                            <Check className="mr-2 h-3.5 w-3.5 text-green-600" />
                                                            Copied
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="mr-2 h-3.5 w-3.5" />
                                                            {theme.copy_count || 0}
                                                        </>
                                                    )}
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
