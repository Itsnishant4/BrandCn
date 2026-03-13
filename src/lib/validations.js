import { z } from 'zod'

export const themeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  slug: z.string()
    .min(1, 'Slug is required')
    .max(100, 'Slug too long')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  icon_url: z.string().url('Invalid icon URL').optional().or(z.literal('')),
  category: z.enum(['company', 'framework', 'product', 'tool']).optional(),
  code: z.string().min(1, 'CSS code is required')
})

export const themeUpdateSchema = themeSchema.partial()

export const themeQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  sortBy: z.enum(['created_at', 'name', 'copy_count', 'updated_at', 'copy']).default('created_at'),
  order: z.enum(['asc', 'desc', 'count']).default('desc'),
  category: z.string().optional()
})

export const actionSchema = z.object({
  id: z.string().uuid('Invalid theme ID'),
  action: z.literal('increment_copy')
})

export const apiResponse = {
  success: (data, status = 200) => {
    return { success: true, data }
  },
  error: (message, status = 400) => {
    return { success: false, error: message, status }
  }
}
