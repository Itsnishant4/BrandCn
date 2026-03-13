'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ThemePreview } from "@/components/theme-preview" 
import { ArrowLeft, Loader2, Save, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

function AdminThemesPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const editSlug = searchParams.get('edit')
    const isEditing = !!editSlug

    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [authChecked, setAuthChecked] = useState(false)

    const [loading, setLoading] = useState(false)
    const [aiLoading, setAiLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        icon_url: '',
        category: '',
        code: `:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  /* Add your variables here */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* Dark mode overrides */
}`
    })

    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {
        if (isEditing && authChecked) {
            fetchTheme(editSlug)
        }
    }, [isEditing, editSlug, authChecked])

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
            router.push('/admin')
            return
        }

        setUser(user)
        
        let { data: profile } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .maybeSingle()

        if (!profile) {
            const { data: newProfile } = await supabase
                .from('profiles')
                .insert([{ id: user.id, email: user.email, is_admin: false }])
                .select('is_admin')
                .maybeSingle()
            profile = newProfile
        }

        if (!profile?.is_admin) {
            router.push('/admin')
            return
        }

        setIsAdmin(true)
        setAuthChecked(true)
    }

    const fetchTheme = async (slug) => {
        try {
            const response = await fetch(`/api/themes/${slug}`)
            if (response.ok) {
                const theme = await response.json()
                setFormData({
                    name: theme.name,
                    slug: theme.slug,
                    icon_url: theme.icon_url,
                    category: theme.category,
                    code: theme.code
                })
            }
        } catch (error) {
            console.error('Error fetching theme:', error)
        }
    }

    const getAuthHeaders = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const headers = await getAuthHeaders()
            const url = isEditing ? `/api/themes/${editSlug}` : '/api/themes'
            const method = isEditing ? 'PUT' : 'POST'
            const response = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(formData)
            })
            
            if (response.ok) {
                toast.success(`Theme ${isEditing ? 'updated' : 'added'} successfully!`)
                setFormData({
                    name: '',
                    slug: '',
                    icon_url: '',
                    category: '',
                    code: `:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
}`
                })
            } else {
                const error = await response.json()
                toast.error(`Error: ${error.error || 'Unknown error'}`)
            }
        } catch (error) {
            toast.error('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const generateThemeWithAI = async () => {
        setAiLoading(true)
        try {
            const response = await fetch('/api/ai-generate-theme', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ appDescription: '' })
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to generate theme')
            }

            const themeData = await response.json()
            
            setFormData(prev => ({
                ...prev,
                name: themeData.name || '',
                slug: themeData.slug || '',
                category: themeData.category || '',
                icon_url: themeData.icon_url || '',
                code: themeData.code || prev.code
            }))

            // Since it's auto-saved, we should be in editing mode for this slug
            if (themeData.slug) {
                router.replace(`/admin/themes?edit=${themeData.slug}`)
            }

            toast.success('Theme generated and saved successfully!')
        } catch (error) {
            toast.error('Error: ' + error.message)
        } finally {
            setAiLoading(false)
        }
    }

    useEffect(() => {
        if (formData.name) {
            const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            if (!formData.slug || formData.slug.includes('-')) { 
                setFormData(prev => ({ ...prev, slug }))
            }
        }
    }, [formData.name])

    if (!authChecked) {
        return null 
    }

    return (
        <div className="h-screen flex flex-col bg-muted/10">
            <div className="border-b bg-background px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin"><ArrowLeft className="w-4 h-4" /></Link>
                    </Button>
                    <h1 className="text-lg font-semibold">{isEditing ? 'Edit Theme' : 'Theme Editor'}</h1>
                </div>
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" /> {isEditing ? 'Update Theme' : 'Save Theme'}
                </Button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row ">
                <div className="w-full md:w-1/3 md:min-w-[400px] border-r bg-background overflow-y-auto p-6 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-1">General Info</h3>
                            <p className="text-xs text-muted-foreground mb-4">Basic details about the theme.</p>
                            <div className="grid gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium">Name</label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        placeholder="e.g. Vercel Dark"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium">Slug</label>
                                    <Input
                                        value={formData.slug}
                                        onChange={(e) => handleChange('slug', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium">Category</label>
                                    <Select value={formData.category} onValueChange={(val) => handleChange('category', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="company">Company</SelectItem>
                                            <SelectItem value="framework">Framework</SelectItem>
                                            <SelectItem value="product">Product</SelectItem>
                                            <SelectItem value="tool">Tool</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium">Icon URL</label>
                                    <Input
                                        value={formData.icon_url}
                                        onChange={(e) => handleChange('icon_url', e.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>
                                {formData.icon_url && (
                                    <Image src={formData.icon_url} width={100} alt='icon image' height={100}></Image>
                                )}
                            </div>
                        </div>

                        <div className="h-px bg-border" />

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                <h3 className="font-medium">AI Theme Generator</h3>
                            </div>
                            <p className="text-xs text-muted-foreground">Click the button to generate a random beautiful theme!</p>
                            <Button
                                onClick={generateThemeWithAI}
                                disabled={aiLoading}
                                className="w-full"
                                size="lg"
                            >
                                {aiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                {aiLoading ? 'AI is creating...' : 'Generate Random Theme'}
                            </Button>
                        </div>

                        <div className="h-px bg-border" />

                        <div className="flex-1 flex flex-col">
                            <h3 className="font-medium mb-1">CSS Variables</h3>
                            <p className="text-xs text-muted-foreground mb-4">Paste your globals.css content here.</p>
                            <Textarea
                                value={formData.code}
                                onChange={(e) => handleChange('code', e.target.value)}
                                className="font-mono text-xs min-h-[300px] max-h-[300px] flex-1 resize-none"
                                placeholder=":root { ... }"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-muted/30 p-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Live Preview</h2>
                            <Badge variant="outline">Auto-updates</Badge>
                        </div>
                    
                        <ThemePreview code={formData.code} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Wrapper() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="text-lg">Loading...</div></div>}>
            <AdminThemesPage />
        </Suspense>
    )
}
