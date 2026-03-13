import { themeService, authService } from '@/services/theme.service'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams)
    
    const result = await themeService.getThemes(query)
    
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation error',
        details: error.errors
      }, { status: 400 })
    }
    console.error('GET /api/themes error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const auth = await authService.verifyAdmin(request)
    
    if (!auth.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const theme = await themeService.createTheme(body, auth.user?.id)
    
    return NextResponse.json(theme, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation error',
        details: error.errors
      }, { status: 400 })
    }
    console.error('POST /api/themes error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
