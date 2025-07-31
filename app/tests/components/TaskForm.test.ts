import type { Task } from '~/types/task'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import TaskForm from '~/components/task/TaskForm.vue'

describe('taskForm', () => {
  it('renders create form correctly', async () => {
    const wrapper = await mountSuspended(TaskForm, {
      props: {
        mode: 'create',
      },
    })

    expect(wrapper.find('h2').text()).toBe('Create New Task')
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toContain('Create Task')
  })

  it('renders edit form correctly with task data', async () => {
    const mockTask: Task = {
      id: 'test-1',
      title: 'Test Task',
      description: 'Test Description',
      status: 'todo',
      createdAt: '2024-01-01T00:00:00.000Z',
    }

    const wrapper = await mountSuspended(TaskForm, {
      props: {
        task: mockTask,
        mode: 'edit',
      },
    })

    expect(wrapper.find('h2').text()).toBe('Edit Task')
    expect((wrapper.find('input[type="text"]').element as HTMLInputElement).value).toBe('Test Task')
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('Test Description')
    expect((wrapper.find('select').element as HTMLSelectElement).value).toBe('todo')
    expect(wrapper.find('button[type="submit"]').text()).toContain('Update Task')
  })

  it('shows validation errors for empty title', async () => {
    // TODO: Implement this test
  })

  it('emits submit event with correct data', async () => {
    // TODO: Implement this test
  })
})
