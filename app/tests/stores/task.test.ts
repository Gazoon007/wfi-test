import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTaskStore } from '@/stores/task'

describe('task Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with empty state', () => {
    const store = useTaskStore()

    expect(store.tasks).toEqual([])
    expect(store.filter).toBe('all')
    expect(store.error).toBe(null)
  })

  it('creates a new task', () => {
    const store = useTaskStore()

    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'todo' as const,
    }

    const createdTask = store.createTask(taskData)

    expect(createdTask.title).toBe('Test Task')
    expect(createdTask.description).toBe('Test Description')
    expect(createdTask.status).toBe('todo')
    expect(createdTask.id).toBeDefined()
    expect(createdTask.createdAt).toBeDefined()
    expect(store.tasks).toHaveLength(1)
    expect(store.tasks[0]).toEqual(createdTask)
  })

  it('updates an existing task', () => {
    const store = useTaskStore()

    const task = store.createTask({
      title: 'Original Title',
      description: 'Original Description',
      status: 'todo',
    })

    const updatedTask = store.updateTask(task.id, {
      title: 'Updated Title',
      status: 'done',
    })

    expect(updatedTask?.title).toBe('Updated Title')
    expect(updatedTask?.description).toBe('Original Description') // Should remain unchanged
    expect(updatedTask?.status).toBe('done')
  })

  it('returns null when updating non-existent task', () => {
    const store = useTaskStore()

    const result = store.updateTask('non-existent-id', { title: 'New Title' })

    expect(result).toBe(null)
    expect(store.error).toBe('Task not found')
  })

  it('deletes a task', () => {
    const store = useTaskStore()

    const task = store.createTask({
      title: 'Task to Delete',
      description: '',
      status: 'todo',
    })

    expect(store.tasks).toHaveLength(1)

    const result = store.deleteTask(task.id)

    expect(result).toBe(true)
    expect(store.tasks).toHaveLength(0)
  })

  it('returns false when deleting non-existent task', () => {
    const store = useTaskStore()

    const result = store.deleteTask('non-existent-id')

    expect(result).toBe(false)
    expect(store.error).toBe('Task not found')
  })

  it('filters tasks correctly', () => {
    const store = useTaskStore()

    store.createTask({ title: 'Todo Task', description: '', status: 'todo' })
    store.createTask({ title: 'In Progress Task', description: '', status: 'in_progress' })
    store.createTask({ title: 'Done Task', description: '', status: 'done' })

    store.setFilter('all')
    expect(store.filteredTasks).toHaveLength(3)

    store.setFilter('todo')
    expect(store.filteredTasks).toHaveLength(1)
    expect(store.filteredTasks[0]?.status).toBe('todo')

    store.setFilter('in_progress')
    expect(store.filteredTasks).toHaveLength(1)
    expect(store.filteredTasks[0]?.status).toBe('in_progress')

    store.setFilter('done')
    expect(store.filteredTasks).toHaveLength(1)
    expect(store.filteredTasks[0]?.status).toBe('done')
  })

  it('calculates task counts correctly', () => {
    const store = useTaskStore()

    store.createTask({ title: 'Todo 1', description: '', status: 'todo' })
    store.createTask({ title: 'Todo 2', description: '', status: 'todo' })
    store.createTask({ title: 'In Progress', description: '', status: 'in_progress' })
    store.createTask({ title: 'Done', description: '', status: 'done' })

    const counts = store.taskCounts

    expect(counts.all).toBe(4)
    expect(counts.todo).toBe(2)
    expect(counts.in_progress).toBe(1)
    expect(counts.done).toBe(1)
  })

  it('finds task by id', () => {
    const store = useTaskStore()

    const task = store.createTask({
      title: 'Findable Task',
      description: '',
      status: 'todo',
    })

    const foundTask = store.taskById(task.id)
    expect(foundTask).toEqual(task)

    const notFoundTask = store.taskById('non-existent-id')
    expect(notFoundTask).toBeUndefined()
  })

  it('deletes completed tasks', () => {
    const store = useTaskStore()

    store.createTask({ title: 'Todo', description: '', status: 'todo' })
    store.createTask({ title: 'Done 1', description: '', status: 'done' })
    store.createTask({ title: 'Done 2', description: '', status: 'done' })

    const deletedCount = store.deleteCompletedTasks()

    expect(deletedCount).toBe(2)
    expect(store.tasks).toHaveLength(1)
    expect(store.tasks[0]?.status).toBe('todo')
  })

  it('marks all tasks as completed', () => {
    const store = useTaskStore()

    store.createTask({ title: 'Todo', description: '', status: 'todo' })
    store.createTask({ title: 'In Progress', description: '', status: 'in_progress' })
    store.createTask({ title: 'Already Done', description: '', status: 'done' })

    store.markAllAsCompleted()

    expect(store.tasks.every(task => task.status === 'done')).toBe(true)
  })

  it('generates unique IDs', () => {
    const store = useTaskStore()

    const id1 = store.generateId()
    const id2 = store.generateId()

    expect(id1).not.toBe(id2)
  })
})
