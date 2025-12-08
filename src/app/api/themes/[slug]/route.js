import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        const { slug } = await params

        const { data: theme, error } = await supabase
            .from('themes')
            .select('*')
            .eq('slug', slug)
            .single()

        if (error) throw error

        if (!theme) {
            return NextResponse.json({ error: 'Theme not found' }, { status: 404 })
        }

        return NextResponse.json(theme)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    try {
        const { slug } = await params
        const body = await request.json()
        const { name, icon_url, category, code } = body

        // Generate new slug if name changed
        const newSlug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : slug

        const { data, error } = await supabase
            .from('themes')
            .update({ name, slug: newSlug, icon_url, category, code })
            .eq('slug', slug)
            .select()

        if (error) throw error

        return NextResponse.json(data[0])
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}