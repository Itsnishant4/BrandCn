'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Loader2, Lock } from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [authLoading, setAuthLoading] = useState(false)
    const [authError, setAuthError] = useState('')
    const [themes, setThemes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const authStatus = localStorage.getItem('adminAuthenticated')
        if (authStatus === 'true') {
            setIsAuthenticated(true)
        }
        fetchThemes()
    }, [])

    const handleLogin = async () => {
        if (!password.trim()) {
            setAuthError('Please enter a password')
            return
        }

        setAuthLoading(true)
        setAuthError('')

        // Check against environment variable
        const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

        if (password === correctPassword) {
            setIsAuthenticated(true)
            localStorage.setItem('adminAuthenticated', 'true')
        } else {
            setAuthError('Invalid password')
        }

        setAuthLoading(false)
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        setPassword('')
        setAuthError('')
        localStorage.removeItem('adminAuthenticated')
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }

    const fetchThemes = async () => {
        try {
            const response = await fetch('/api/themes')
            if (response.ok) {
                const data = await response.json()
                setThemes(data.themes || [])
            }
        } catch (error) {
            console.error('Error fetching themes:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/10">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Admin Access</CardTitle>
                        <p className="text-muted-foreground">Enter the admin password to continue</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full"
                            />
                            {authError && (
                                <p className="text-sm text-destructive mt-2">{authError}</p>
                            )}
                        </div>
                        <Button
                            onClick={handleLogin}
                            disabled={authLoading}
                            className="w-full"
                        >
                            {authLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4 mr-2" />
                                    Access Admin
                                </>
                            )}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                            Session persists until browser refresh
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
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

                {themes.length === 0 && (
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
