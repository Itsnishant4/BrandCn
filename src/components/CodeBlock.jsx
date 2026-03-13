import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export function CodeBlock({ code }) {
    const copyCode = () => {
        navigator.clipboard.writeText(code)
        toast.success('Code copied!')
    }

    return (
        <div className="relative bg-gray-900 p-4 rounded-lg border">
            <Button
                className="absolute right-2 top-2"
                size="sm"
                variant="secondary"
                onClick={copyCode}
            >
                <Copy className="w-4 h-4" />
            </Button>
            <pre className="text-green-400 text-sm whitespace-pre-wrap overflow-x-auto">
                <code>{code}</code>
            </pre>
        </div>
    )
}