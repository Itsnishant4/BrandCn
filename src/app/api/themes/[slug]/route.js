import { themeService, authService } from '@/services/theme.service'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function GET(request, { params }) {
  try {
    const { slug } = await params
    const theme = await themeService.getThemeBySlug(slug)
    
    if (!theme) {
      return NextResponse.json({ error: 'Theme not found' }, { status: 404 })
    }
    
    return NextResponse.json(theme)
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation error',
        details: error.errors
      }, { status: 400 })
    }
    console.error('GET /api/themes/[slug] error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const auth = await authService.verifyAdmin(request)
    
    if (!auth.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const { slug } = await params
    const body = await request.json()
    const theme = await themeService.updateTheme(slug, body)
    
    return NextResponse.json(theme)
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation error',
        details: error.errors
      }, { status: 400 })
    }
    console.error('PUT /api/themes/[slug] error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    const body = await request.json()
    const { action, id } = body

    if (action === 'increment_copy') {
      await themeService.incrementCopyCount(id)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('PATCH /api/themes/[slug] error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const auth = await authService.verifyAdmin(request)
    
    if (!auth.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const { slug } = await params
    await themeService.deleteTheme(slug)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation error',
        details: error.errors
      }, { status: 400 })
    }
    console.error('DELETE /api/themes/[slug] error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
