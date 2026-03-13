"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

function scopeThemeCss(css) {
    let scoped = css
        .replace(/:root/g, ".theme-preview")
        .replace(/\.dark\b/g, ".theme-preview.dark")

    // Auto-wrap raw HSL values (e.g., 217 9% 18%) in hsl() for Tailwind 4 compatibility
    scoped = scoped.replace(/(--[a-zA-Z0-9-]+)\s*:\s*(\d+(?:\.\d+)?(?:deg|rad|grad|turn)?\s+\d+(?:\.\d+)?%\s+\d+(?:\.\d+)?%)\s*([;!\}]|$)/g, (match, prop, val, suffix) => {
        return `${prop}: hsl(${val})${suffix}`;
    });

    return scoped
}

export function ThemePreview({ code }) {
    const [mode, setMode] = useState("light")

    const scopedCss = useMemo(() => scopeThemeCss(code), [code])

    return (
        <div className="relative rounded-2xl border overflow-hidden bg-background">
            {/* inject scoped CSS */}
            <style dangerouslySetInnerHTML={{ __html: scopedCss }} />

            <div
                className={`
          theme-preview
          ${mode === "dark" ? "dark" : ""}
          p-4 md:p-6 flex flex-col gap-4 bg-background text-foreground
        `}
            >
                {/* header */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                            AP
                        </div>
                        <div>
                            <p className="text-sm font-medium">Demo App</p>
                            <p className="text-xs text-muted-foreground">Preview of your theme</p>
                        </div>
                    </div>

                    <Tabs value={mode} onValueChange={setMode}>
                        <TabsList className="grid grid-cols-2">
                            <TabsTrigger value="light">Light</TabsTrigger>
                            <TabsTrigger value="dark">Dark</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* main content */}
                <div className="grid gap-4 md:grid-cols-[2fr,1.25fr] items-start">
                    {/* left: stats cards */}
                    <div className="grid gap-3 sm:grid-cols-2">
                        <Card className="bg-card/80 backdrop-blur">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-medium text-muted-foreground">
                                    Total Revenue
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-semibold">$15,231.89</p>
                                <p className="text-xs text-emerald-500 mt-1">+20.1% from last month</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/80 backdrop-blur">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-medium text-muted-foreground">
                                    Subscriptions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-semibold">+2,350</p>
                                <p className="text-xs text-primary mt-1">+180.1% from last month</p>
                            </CardContent>
                        </Card>

                        <Card className="sm:col-span-2 bg-muted/60 border-dashed">
                            <CardHeader className="pb-2 flex flex-row items-center justify-between gap-2">
                                <div>
                                    <CardTitle className="text-sm font-medium">Upgrade your subscription</CardTitle>
                                    <p className="text-xs text-muted-foreground">
                                        You are currently on the free plan.
                                    </p>
                                </div>
                                <Badge variant="outline">Free</Badge>
                            </CardHeader>
                            <CardContent className="flex gap-2">
                                <Button size="sm">Upgrade to Pro</Button>
                                <Button size="sm" variant="outline">
                                    Learn more
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* right: mini form like tweakcn */}
                    <Card className="bg-card/80 backdrop-blur">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Create an account</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-xs text-muted-foreground">
                                Enter your email below to create your account.
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <Button size="sm" variant="outline">
                                    GitHub
                                </Button>
                                <Button size="sm" variant="outline">
                                    Google
                                </Button>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Email</label>
                                <input
                                    className="w-full rounded-md border bg-background px-2 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Password</label>
                                <input
                                    type="password"
                                    className="w-full rounded-md border bg-background px-2 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    placeholder="********"
                                />
                            </div>
                            <Button className="w-full" size="sm">
                                Create account
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}