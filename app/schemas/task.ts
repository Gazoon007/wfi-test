import { z } from 'zod'

export const taskStatusSchema = z.enum(['todo', 'in_progress', 'done'])

export const taskSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters')
    .trim(),
  description: z.string()
    .max(200, 'Description must be less than 200 characters')
    .trim()
    .optional()
    .or(z.literal('')),
  status: taskStatusSchema,
  createdAt: z.date(),
})

export const createTaskSchema = taskSchema.omit({ id: true, createdAt: true })

export const updateTaskSchema = createTaskSchema.partial()

export type TaskFormData = z.infer<typeof createTaskSchema>
