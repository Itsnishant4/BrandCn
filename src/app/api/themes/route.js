import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '12')
        let sortBy = searchParams.get('sortBy') || 'created_at'
        let order = searchParams.get('order') || 'desc'
        const offset = (page - 1) * limit

        // Normalize common aliases
        const sortByAliases = {
            'copy': 'copy_count'
        }
        const orderAliases = {
            'count': 'desc'  // assume descending for count (most first)
        }

        if (sortByAliases[sortBy]) {
            sortBy = sortByAliases[sortBy]
        }
        if (orderAliases[order]) {
            order = orderAliases[order]
        }

        // Validate sortBy parameter
        const validSortFields = ['created_at', 'name', 'copy_count', 'updated_at']

        if (!validSortFields.includes(sortBy) || (order !== 'asc' && order !== 'desc')) {
            return NextResponse.json({
                error: 'Invalid sorting parameters',
                validSortBy: validSortFields,
                validOrder: ['asc', 'desc'],
                provided: { sortBy, order },
                example: '/api/themes?page=1&sortBy=copy_count&order=desc'
            }, { status: 400 })
        }

        let query = supabase
            .from('themes')
            .select('*', { count: 'exact' })

        // Apply sorting
        if (sortBy === 'copy_count') {
            // For copy_count, sort by copy_count first, then by created_at as tiebreaker
            query = query
                .order(sortBy, { ascending: order === 'asc', nullsFirst: false })
                .order('created_at', { ascending: false })
        } else {
            query = query.order(sortBy, { ascending: order === 'asc' })
        }

        query = query.range(offset, offset + limit - 1)

        const { data: themes, error, count } = await query

        if (error) throw error

        return NextResponse.json({
            themes,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
                hasNext: page * limit < count
            },
            sorting: {
                sortBy,
                order
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
            .insert([{ name, slug, icon_url, category, code, copy_count: 0 }])
            .select()

        if (error) throw error

        return NextResponse.json(data[0], { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PATCH(request) {
    try {
        const body = await request.json()
        const { id, action } = body

        if (action === 'increment_copy') {
            // First get the current copy count
            const { data: current, error: fetchError } = await supabase
                .from('themes')
                .select('copy_count')
                .eq('id', id)
                .single()

            if (fetchError) throw fetchError

            const newCount = (current.copy_count || 0) + 1

            // Then update with the new count
            const { data, error } = await supabase
                .from('themes')
                .update({ copy_count: newCount })
                .eq('id', id)
                .select('id, copy_count')
                .single()

            if (error) throw error

            return NextResponse.json(data)
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
