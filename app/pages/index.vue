<script setup lang="ts">
import type { TaskFormData } from '~/schemas/task'
import AppHeader from '~/components/common/AppHeader.vue'
import Modal from '~/components/common/Modal.vue'
import ErrorBoundary from '~/components/error/ErrorBoundary.vue'
import ErrorMessage from '~/components/error/ErrorMessage.vue'
import TaskForm from '~/components/task/TaskForm.vue'
import TaskList from '~/components/task/TaskList.vue'

useHead({
  title: 'Just a To-do App.',
  meta: [
    { name: 'description', content: 'Todo this todo that.' },
  ],
})

const taskStore = useTaskStore()

const isCreateModalOpen = ref(false)

function openCreateModal() {
  isCreateModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeCreateModal() {
  isCreateModalOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  taskStore.initializeSampleData()
})

function handleCreateTask(taskData: TaskFormData) {
  taskStore.createTask(taskData)
  closeCreateModal()
}

const error = computed(() => taskStore.error)

onUnmounted(() => {
  taskStore.clearError()
  document.body.style.overflow = ''
})

function logError(error: Error) {
  console.error('Caught an error:', error)
}
</script>

<template>
  <div>
    <AppHeader
      title="Task Manager"
      subtitle="Stay organized and get things done"
    />
    <main class="main">
      <div class="container">
        <ErrorMessage
          v-if="error"
          :message="error"
          class="mb-6"
        />

        <div class="task-header">
          <h2 class="task-header__title">
            Your Tasks
          </h2>
          <button
            type="button"
            class="btn btn--primary btn--with-icon"
            @click="openCreateModal"
          >
            <span class="icon">+</span>
            Create Task
          </button>
        </div>

        <ErrorBoundary @error="logError">
          <TaskList />
        </ErrorBoundary>

        <Modal
          :is-open="isCreateModalOpen"
          @close="closeCreateModal"
        >
          <ErrorBoundary>
            <TaskForm
              mode="create"
              @submit="handleCreateTask"
              @cancel="closeCreateModal"
            />
          </ErrorBoundary>
        </Modal>
      </div>
    </main>
  </div>
</template>

<style scoped lang="postcss">
@container (--lg) {
  .container {
    padding: 0 var(--spacing-3);
  }
}

@container (--md) {
  .container {
    padding: 0 var(--spacing-2);
  }

  .main {
    padding: var(--spacing-4) 0;
  }
}

.task-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-6);

  &__title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-gray-900);
    margin: 0;
  }
}

.btn--with-icon {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);

  .icon {
    font-size: 1.2em;
    font-weight: bold;
  }
}

@media (--md) {
  .task-header {
    align-items: flex-start;
    gap: var(--spacing-4);
  }
}
</style>
