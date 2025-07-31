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

    taskCounts: (state) => {
      const counts = {
        all: state.tasks.length,
        todo: 0,
        in_progress: 0,
        done: 0,
      }

      state.tasks.forEach((task) => {
        counts[task.status]++
      })

      return counts
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

    deleteCompletedTasks(): number {
      const completedTasks = this.tasks.filter(task => task.status === 'done')
      this.tasks = this.tasks.filter(task => task.status !== 'done')
      return completedTasks.length
    },

    markAllAsCompleted() {
      this.tasks.forEach((task) => {
        if (task.status !== 'done') {
          task.status = 'done'
        }
      })
    },

    initializeSampleData() {
      if (this.tasks.length === 0) {
        this.tasks = [
          {
            id: this.generateId(),
            title: 'Take a walk',
            description: 'We walk the talk not only talk the talk.',
            status: 'done',
            createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          },
          {
            id: this.generateId(),
            title: 'Buy groceries',
            description: 'Lets buy some groceries in supermarket.',
            status: 'in_progress',
            createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
          },
          {
            id: this.generateId(),
            title: 'Play acoustic guitar',
            description: 'Do not forget to train for the upcoming gigs.',
            status: 'todo',
            createdAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
          },
          {
            id: this.generateId(),
            title: 'Write unit tests',
            description: 'We postpone writing unit tests for now.',
            status: 'todo',
            createdAt: new Date().toISOString(),
          },
        ]
      }
    },
  },

  persist: true,
})
