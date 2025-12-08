'use client'

import { useState, useEffect } from 'react'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ThemePreview } from "@/components/theme-preview" 
import { ArrowLeft, Loader2, Save, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

function AdminThemesPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const editSlug = searchParams.get('edit')
    const isEditing = !!editSlug

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authChecked, setAuthChecked] = useState(false)

    const [loading, setLoading] = useState(false)
    const [aiLoading, setAiLoading] = useState(false)
    const [aiPrompt, setAiPrompt] = useState('')
    const [aiApp, setAiApp] = useState('')
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
        const authStatus = localStorage.getItem('adminAuthenticated')
        if (authStatus === 'true') {
            setIsAuthenticated(true)
        } else {
            router.push('/admin')
            return
        }
        setAuthChecked(true)
    }, [router])

    useEffect(() => {
        if (isEditing) {
            fetchTheme(editSlug)
        }
    }, [isEditing, editSlug])

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const url = isEditing ? `/api/themes/${editSlug}` : '/api/themes'
            const method = isEditing ? 'PUT' : 'POST'
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                alert(`Theme ${isEditing ? 'updated' : 'added'} successfully!`)
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
  /* Add your variables here */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* Dark mode overrides */
}`
                })
                
            } else {
                alert(`Error ${isEditing ? 'updating' : 'adding'} theme`)
            }
        } catch (error) {
            alert('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const generateThemeWithAI = async () => {
        if (!aiPrompt.trim() || !aiApp.trim()) {
            alert('Please fill in both prompt and app description.')
            return
        }

        setAiLoading(true)
        try {
            const systemPrompt = `You are an expert at creating shadcn/ui theme CSS variables. You MUST strictly follow this EXACT CSS structure and include ALL of these variables in your response. Do NOT add extra variables or modify the structure.

Generate a modern shadcn/ui theme based on the user's prompt and app description. The theme should be cohesive and professional.

REQUIRED CSS STRUCTURE - You must include ALL of these variables exactly as shown:

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --font-sans: "Inter", sans-serif;

  --background: #fffaeb;
  --foreground: #1f1f1f;

  --card: #ffffff;
  --card-foreground: #1f1f1f;

  --popover: #ffffff;
  --popover-foreground: #1f1f1f;

  --primary: #fa520f; /* bright Mistral orange */
  --primary-foreground: #ffffff;

  --secondary: #000000;
  --secondary-foreground: #ffffff;

  --muted: #f2efe2;
  --muted-foreground: #6e6e6e;

  --accent: #f4f0e1;
  --accent-foreground: #1f1f1f;

  --destructive: #e03f3f;
  --destructive-foreground: #ffffff;

  --border: #e6e1d4;
  --input: #e6e1d4;
  --ring: #fa520f;

  --chart-1: #fa520f;  /* Mistral orange */
  --chart-2: #000000;  /* Black */
  --chart-3: #3c3c3c;  /* Dark Gray */
  --chart-4: #1f1f1f;  /* Text */
  --chart-5: #fffaeb;  /* Light background */

  --sidebar-background: #ffffff;
  --sidebar-foreground: #1f1f1f;
  --sidebar-primary: #fa520f;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f4f0e1;
  --sidebar-accent-foreground: #1f1f1f;
  --sidebar-border: #e6e1d4;
  --sidebar-ring: #fa520f;

  --radius: 0.5rem;
}

.dark {
  --background: #000000;
  --foreground: #ffffff;

  --card: #1a1a1a;
  --card-foreground: #ffffff;

  --popover: #1a1a1a;
  --popover-foreground: #ffffff;

  --primary: #fa520f;
  --primary-foreground: #000000;

  --secondary: #3c3c3c;
  --secondary-foreground: #ffffff;

  --muted: #262626;
  --muted-foreground: #b5b5b5;

  --accent: #262626;
  --accent-foreground: #ffffff;

  --destructive: #ff6a6a;
  --destructive-foreground: #000000;

  --border: #3c3c3c;
  --input: #3c3c3c;
  --ring: #fa520f;

  --chart-1: #fa520f;
  --chart-2: #ffffff;
  --chart-3: #3c3c3c;
  --chart-4: #1f1f1f;
  --chart-5: #000000;

  --sidebar-background: #000000;
  --sidebar-foreground: #ffffff;
  --sidebar-primary: #fa520f;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #262626;
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: #3c3c3c;
  --sidebar-ring: #fa520f;

  --radius: 0.5rem;
}

@theme inline {
  --font-sans: var(--font-sans);

  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);

  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);

  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);

  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);

  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);

  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);

  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);

  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --color-sidebar: var(--sidebar-background);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

body {
  font-family: var(--font-sans);
}

IMPORTANT: You must ONLY modify the HEX color values (# followed by 6 characters) and make them cohesive for the theme. Do NOT change the variable names, structure, or add any additional variables. Use appropriate colors for the given app type and prompt.`

            const userPrompt = `App: ${aiApp}\n\nPrompt: ${aiPrompt}\n\nGenerate the theme CSS by replacing the color values in the exact structure provided.`

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${systemPrompt}\n\n${userPrompt}`
                        }]
                    }]
                })
            })

            if (response.ok) {
                const data = await response.json()
                let generatedCode = data.candidates[0]?.content?.parts[0]?.text?.trim()
                if (generatedCode) {
                    generatedCode = generatedCode.replaceAll('`','').replaceAll('css','')
                    handleChange('code', generatedCode)
                  
                } else {
                    alert('Failed to generate theme. Please try again.')
                }
            } else {
                alert('Error generating theme with AI. Please check your API key.')
            }
        } catch (error) {
            alert('Error: ' + error.message)
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

    if (!isAuthenticated) {
        return null 
    }

    return (
        <div className="h-screen flex flex-col bg-muted/10">
            <div className="border-b bg-background px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/themes"><ArrowLeft className="w-4 h-4" /></Link>
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
                            <p className="text-xs text-muted-foreground">Generate shadcn/ui themes with Gemini AI. Describe your app and desired theme style.</p>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium">App Description</label>
                                    <Textarea
                                        value={aiApp}
                                        onChange={(e) => setAiApp(e.target.value)}
                                        placeholder="e.g. A productivity app for task management, focused on collaboration"
                                        className="min-h-[60px] resize-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium">Theme Prompt</label>
                                    <Textarea
                                        value={aiPrompt}
                                        onChange={(e) => setAiPrompt(e.target.value)}
                                        placeholder="e.g. Clean and modern design with blue and white color scheme, professional and trustworthy"
                                        className="min-h-[60px] resize-none"
                                    />
                                </div>
                                <Button
                                    onClick={generateThemeWithAI}
                                    disabled={aiLoading || !aiPrompt.trim() || !aiApp.trim()}
                                    className="w-full"
                                >
                                    {aiLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate Theme with AI
                                </Button>
                            </div>
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
