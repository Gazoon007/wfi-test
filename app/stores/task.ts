import type { Task, TaskStatus } from '~/types/task'
import { defineStore } from 'pinia'

interface TaskState {
  tasks: Task[]
  filter: TaskStatus | 'all'
  error: string | null
}

export const useTaskStore = defineStore('task', {
  state: (): TaskState => ({
    tasks: [],
    filter: 'all',
    error: null,
  }),

  getters: {
    filteredTasks: (state): Task[] => {
      if (state.filter === 'all') {
        return state.tasks
      }
      return state.tasks.filter(task => task.status === state.filter)
    },

    taskById: (state) => {
      return (id: string): Task | undefined => {
        return state.tasks.find(task => task.id === id)
      }
    },
  },

  actions: {
    createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Task {
      this.error = null

      try {
        const newTask: Task = {
          id: this.generateId(),
          ...taskData,
          createdAt: new Date().toISOString(),
        }

        this.tasks.unshift(newTask)
        return newTask
      }
      catch (error) {
        this.error = 'Failed to create task'
        throw error
      }
    },

    updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
      this.error = null

      try {
        const taskIndex = this.tasks.findIndex(task => task.id === id)

        if (!this.tasks[taskIndex]) {
          this.error = 'Task not found'
          return null
        }

        const updatedTask: Task = {
          ...this.tasks[taskIndex],
          ...updates,
        }

        this.tasks[taskIndex] = updatedTask
        return updatedTask
      }
      catch (error) {
        this.error = 'Failed to update task'
        throw error
      }
    },

    deleteTask(id: string): boolean {
      this.error = null

      try {
        const taskIndex = this.tasks.findIndex(task => task.id === id)

        if (taskIndex === -1) {
          this.error = 'Task not found'
          return false
        }

        this.tasks.splice(taskIndex, 1)
        return true
      }
      catch (error) {
        this.error = 'Failed to delete task'
        throw error
      }
    },

    setFilter(filter: TaskStatus | 'all') {
      this.filter = filter
    },

    clearError() {
      this.error = null
    },

    generateId(): string {
      return crypto.randomUUID()
    },
  },

  persist: true,
})
