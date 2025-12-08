'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Github, Star, Menu } from 'lucide-react'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'

const GitHubStats = () => {
  const [stars, setStars] = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/Itsnishant4/BrandCn')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count)
        }
      })
      .catch(err => console.error('Failed to fetch GitHub stars:', err))
  }, [])

  return (
    <Link
      href="https://github.com/Itsnishant4/BrandCn"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      <Github className="h-4 w-4" />
      {stars !== null && (
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-current" />
          {stars.toLocaleString()}
        </span>
      )}
    </Link>
  )
}

export default function Header({ title = "Gallery", linkText = "BrandCn" }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md h-12 flex items-center justify-between px-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
        <Link href="/">
          <span className="flex items-center justify-center w-5 h-5 rounded hover:bg-muted transition-colors">
            <Menu className="w-4 h-4" />
          </span>
        </Link>
        <Link href="/">
          <span className="text-foreground">{linkText}</span>
        </Link>
        <span className="text-muted-foreground">/</span>
        <span>{title}</span>
      </div>
      <div className="flex items-center gap-4">
        <GitHubStats />
        <AnimatedThemeToggler />
      </div>
    </header>
  )
}
