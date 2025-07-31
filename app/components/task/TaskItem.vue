<script setup lang="ts">
import type { Task } from '~/types/task'
import { useTaskStore } from '~/stores/task'

interface Props {
  task: Task
}

const props = defineProps<Props>()
const taskStore = useTaskStore()
const router = useRouter()

// Should use day.js, but I failed to set it up, maybe because of incompatibility with Nuxt 4
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInHours < 1) {
    return 'Just now'
  }
  else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }
  else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }
  else {
    return date.toLocaleDateString()
  }
}

function getStatusLabel(status: Task['status']): string {
  const labels = {
    todo: 'To Do',
    in_progress: 'In Progress',
    done: 'Done',
  }
  return labels[status]
}

function handleDelete() {
  taskStore.deleteTask(props.task.id)
}

function handleEdit() {
  router.push(`/task/${props.task.id}`)
}

function handleStatusChange(event: Event) {
  const select = event.target as HTMLSelectElement
  taskStore.updateTask(props.task.id, { status: select.value as Task['status'] })
}
</script>

<template>
  <div
    class="task-item"
  >
    <div class="task-item__header">
      <div class="task-item__content">
        <h3 class="task-item__title">
          {{ task.title }}
        </h3>
        <p v-if="task.description" class="task-item__description">
          {{ task.description }}
        </p>
        <div class="task-item__meta">
          <span class="status-badge" :class="`status-badge--${task.status}`">
            {{ getStatusLabel(task.status) }}
          </span>
          <span>{{ formatDate(task.createdAt) }}</span>
        </div>
      </div>
      <div class="task-item__actions">
        <select
          :value="task.status"
          class="btn btn--small btn--secondary"
          style="min-width: 120px;"
          @change="handleStatusChange"
        >
          <option value="todo">
            To Do
          </option>
          <option value="in_progress">
            In Progress
          </option>
          <option value="done">
            Done
          </option>
        </select>
        <button
          class="btn btn--small btn--secondary"
          @click="handleEdit"
        >
          Edit
        </button>
        <button
          class="btn btn--small btn--danger"
          @click="handleDelete"
        >
          {{ 'Delete' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.task-item {
  border-bottom: 1px solid var(--color-gray-100);
  padding: var(--spacing-6);
  transition: var(--transition-fast);
  animation: slideIn 0.3s ease-out;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--color-gray-50);
  }

  &__header,
  &__actions {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-4);
  }

  &__header {
    justify-content: space-between;
    margin-bottom: var(--spacing-3);
  }

  &__content {
    flex: 1;
  }

  &__title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-gray-800);
    margin-bottom: var(--spacing-2);
    line-height: 1.4;
  }

  &__description {
    color: var(--color-gray-500);
    line-height: 1.5;
    margin-bottom: var(--spacing-3);
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    font-size: var(--font-size-sm);
    color: var(--color-gray-400);
  }

  &__actions {
    gap: var(--spacing-2);

    select {
      appearance: none;
      background-repeat: no-repeat;
      background-position: right 0.5rem center;
      background-size: 1rem;
      padding-right: 2.5rem;
    }
  }

  @media screen and (--md) {
    &__header,
    &__actions {
      flex-direction: column;
      gap: var(--spacing-3);
      width: 100%;
    }

    &__content {
      width: 100%;
    }

    &__actions {
      select,
      .btn {
        width: 100%;
        justify-content: center;
      }

      select {
        font-size: var(--font-size-sm);
        padding: var(--spacing-2) var(--spacing-6) var(--spacing-2) var(--spacing-3);
      }
    }
  }
}

.status-badge {
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &--todo {
    background: var(--color-todo-bg);
    color: var(--color-todo-text);
  }

  &--in_progress {
    background: var(--color-in-progress-bg);
    color: var(--color-in-progress-text);
  }

  &--done {
    background: var(--color-done-bg);
    color: var(--color-done-text);
  }
}

.fade-out {
  animation: fadeOut 0.2s ease-out forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
