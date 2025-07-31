<script setup lang="ts">
import type { TaskFormData } from '~/schemas/task'
import AppHeader from '~/components/common/AppHeader.vue'
import ErrorBoundary from '~/components/error/ErrorBoundary.vue'
import ErrorMessage from '~/components/error/ErrorMessage.vue'
import NotFound from '~/components/error/NotFound.vue'
import TaskForm from '~/components/task/TaskForm.vue'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()
const taskId = route.params.id as string
const task = computed(() => taskStore.taskById(taskId))

function handleUpdateTask(taskData: TaskFormData) {
  taskStore.updateTask(taskId, taskData)
  router.push('/')
}

const error = computed(() => taskStore.error)

onUnmounted(() => {
  taskStore.clearError()
})

function logError(error: Error) {
  console.error('Caught an error in task edit page:', error)
}
</script>

<template>
  <div>
    <AppHeader
      title="Edit Task"
      subtitle="Update your task details"
    />
    <main class="main">
      <div class="container">
        <div class="navigation">
          <NuxtLink to="/" class="btn btn--secondary">
            ← Back to Tasks
          </NuxtLink>
        </div>

        <ErrorMessage
          v-if="error"
          :message="error"
          class="mt-6 mb-6"
        />

        <ErrorBoundary
          :show-back-link="true"
          back-link-text="Back to Tasks"
          back-link-to="/"
          @error="logError"
        >
          <template v-if="task">
            <TaskForm
              mode="edit"
              :task="task"
              @submit="handleUpdateTask"
              @cancel="router.push('/')"
            />
          </template>
          <template v-else>
            <NotFound
              title="Task Not Found"
              message="The task you're looking for doesn't exist or has been removed."
              button-text="Go Back to Tasks"
              button-link="/"
            />
          </template>
        </ErrorBoundary>
      </div>
    </main>
  </div>
</template>

<style scoped lang="postcss">
.navigation {
  margin-bottom: var(--spacing-6);
}

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

  .navigation {
    margin-bottom: var(--spacing-6);
  }
}
</style>
