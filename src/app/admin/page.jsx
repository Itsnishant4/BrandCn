'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Loader2, Lock } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export default function AdminPage() {
    const router = useRouter()
    
    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const [themes, setThemes] = useState([])
    const [themeLoading, setThemeLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMorePages, setHasMorePages] = useState(true)

    useEffect(() => {
        checkUser()
    }, [])

    useEffect(() => {
        if (user && isAdmin) {
            fetchThemes()
        }
    }, [user, isAdmin])

    const checkUser = async () => {
        if (!supabase) {
            setLoading(false)
            return
        }
        
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
            setUser(user)
            
            const { data: profile } = await supabase
                .from('profiles')
                .select('is_admin')
                .eq('id', user.id)
                .maybeSingle()

            
            
            if (profile?.is_admin === true) {
                setIsAdmin(true)
                router.refresh()
            } else {
                toast.error('Login successful but you are not an admin.')
            }
        }
        setLoading(false)
    }

    const handleLogin = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            toast.error(error.message)
            return
        }

        await checkUser()
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setIsAdmin(false)
        setThemes([])
    }

    const fetchThemes = async (page = 1, append = false) => {
        try {
            setLoadingMore(append)
            setThemeLoading(!append)

            const response = await fetch(`/api/themes?page=${page}&limit=12`)
            if (response.ok) {
                const data = await response.json()

                if (append) {
                    setThemes(prev => [...prev, ...data.themes])
                } else {
                    setThemes(data.themes || [])
                }

                setHasMorePages(page < data.pagination.totalPages)
                if (append) {
                    setCurrentPage(page)
                }
            }
        } catch (error) {
            console.error('Error fetching themes:', error)
        } finally {
            setThemeLoading(false)
            setLoadingMore(false)
        }
    }

    const loadMoreThemes = async () => {
        if (!loadingMore && hasMorePages) {
            const nextPage = currentPage + 1
            await fetchThemes(nextPage, true)
        }
    }

    useEffect(() => {
        if (!isAdmin || themeLoading) return

        const handleWindowScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            const windowHeight = window.innerHeight
            const bodyHeight = document.documentElement.scrollHeight
            const isNearBottom = scrollTop + windowHeight >= bodyHeight - 100

            if (isNearBottom && hasMorePages && !loadingMore) {
                loadMoreThemes()
            }
        }

        window.addEventListener('scroll', handleWindowScroll)
        return () => window.removeEventListener('scroll', handleWindowScroll)
    }, [isAdmin, themeLoading, hasMorePages, loadingMore, currentPage])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        )
    }

    if (!user || !isAdmin) {
        return <AdminLogin onLogin={handleLogin} />
    }

    return (
        <div className="min-h-screen bg-muted/10 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <Badge variant="secondary">Authenticated</Badge>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleLogout}>
                            Logout
                        </Button>
                        <Button asChild>
                            <Link href="/admin/themes">
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Theme
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {themes.map((theme) => (
                        <Card key={theme.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center gap-3">
                                {theme.icon_url && (
                                    <img src={theme.icon_url} alt={theme.name} className="w-10 h-10 rounded" />
                                )}
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{theme.name}</CardTitle>
                                    <Badge variant="outline">{theme.category}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={`/themes/${theme.slug}`}>View Theme</Link>
                                </Button>
                                <Button asChild variant="secondary" className="w-full">
                                    <Link href={`/admin/themes?edit=${theme.slug}`}>
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Theme
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {loadingMore && (
                    <div className="flex justify-center py-8">
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="text-muted-foreground">Loading more themes...</span>
                        </div>
                    </div>
                )}

                {themes.length === 0 && !loadingMore && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No themes found.</p>
                        <Button asChild className="mt-4">
                            <Link href="/admin/themes">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Your First Theme
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

function AdminLogin({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await onLogin(email, password)
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/10">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Admin Access</CardTitle>
                    <p className="text-muted-foreground">Sign in with your admin credentials</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder="Admin email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4 mr-2" />
                                    Sign In
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
