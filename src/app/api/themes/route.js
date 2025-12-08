import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '12')
        const offset = (page - 1) * limit

        const { data: themes, error, count } = await supabase
            .from('themes')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: true })
            .range(offset, offset + limit - 1)

        if (error) throw error

        return NextResponse.json({
            themes,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
                hasNext: page * limit < count
            }
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, slug, icon_url, category, code } = body

        const { data, error } = await supabase
            .from('themes')
            .insert([{ name, slug, icon_url, category, code }])
            .select()

        if (error) throw error

        return NextResponse.json(data[0], { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
