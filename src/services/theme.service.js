import { supabaseAdmin } from '@/lib/supabase-admin'
import { themeSchema, themeUpdateSchema, themeQuerySchema, actionSchema } from '@/lib/validations'

export const themeService = {
  async getThemes(query) {
    const validated = themeQuerySchema.parse(query)
    const { page, limit, sortBy, order, category } = validated
    const offset = (page - 1) * limit

    let sortField = sortBy === 'copy' ? 'copy_count' : sortBy
    let sortOrder = order === 'count' ? 'desc' : order

    let queryBuilder = supabaseAdmin
      .from('themes')
      .select('*', { count: 'exact' })

    if (category) {
      queryBuilder = queryBuilder.eq('category', category)
    }

    if (sortField === 'copy_count') {
      queryBuilder = queryBuilder
        .order(sortField, { ascending: sortOrder === 'asc', nullsFirst: false })
        .order('created_at', { ascending: false })
    } else {
      queryBuilder = queryBuilder.order(sortField, { ascending: sortOrder === 'asc' })
    }

    queryBuilder = queryBuilder.range(offset, offset + limit - 1)

    const { data, error, count } = await queryBuilder

    if (error) throw error

    return {
      themes: data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
        hasNext: page * limit < count
      }
    }
  },

  async getThemeBySlug(slug) {
    const { data, error } = await supabaseAdmin
      .from('themes')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  async createTheme(themeData, userId = null) {
    const validated = themeSchema.parse(themeData)
    
    const insertData = {
      ...validated,
      copy_count: 0
    }

    if (userId) {
      insertData.user_id = userId
    }

    const { data, error } = await supabaseAdmin
      .from('themes')
      .insert([insertData])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateTheme(slug, themeData) {
    const validated = themeUpdateSchema.parse(themeData)
    
    if (validated.name) {
      validated.slug = validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }

    const { data, error } = await supabaseAdmin
      .from('themes')
      .update(validated)
      .eq('slug', slug)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async incrementCopyCount(themeId) {
    const { data, error } = await supabaseAdmin.rpc('increment_copy_count', {
      theme_id: themeId
    })

    if (error) throw error
    return { success: true }
  },

  async deleteTheme(slug) {
    const { error } = await supabaseAdmin
      .from('themes')
      .delete()
      .eq('slug', slug)

    if (error) throw error
    return { success: true }
  }
}

export const authService = {
  async verifyAdmin(request) {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { isAdmin: false, error: 'No authorization header' }
    }

    const token = authHeader.replace('Bearer ', '')
    
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
    
    if (error || !user) {
      return { isAdmin: false, error: 'Invalid token' }
    }

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .maybeSingle()

    return { 
      isAdmin: profile?.is_admin || false, 
      user,
      error: null 
    }
  }
}
