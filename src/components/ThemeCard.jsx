import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ThemeCard({ theme }) {
    return (
        <Card className="hover:shadow-lg transition-shadow bg-transparent overflow-hidden" style={{ backgroundImage: `url(${theme.icon_url})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(10px)' }}>
            <CardHeader className="bg-card/90 backdrop-blur-sm flex flex-row items-center gap-3">
                {theme.icon_url && (
                    <img src={theme.icon_url} alt={theme.name} className="w-10 h-10 rounded" />
                )}
                <div>
                    <CardTitle className="text-lg">{theme.name}</CardTitle>
                    <Badge variant="outline">{theme.category}</Badge>
                </div>
            </CardHeader>
            <CardContent className="bg-card/90 backdrop-blur-sm">
                <Button asChild variant="outline" className="w-full">
                    <Link href={`/themes/${theme.slug}`}>View Theme</Link>
                </Button>
            </CardContent>
        </Card>
    )
}