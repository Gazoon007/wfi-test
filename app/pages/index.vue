<script setup lang="ts">
import AppHeader from '~/components/common/AppHeader.vue'
import ErrorBoundary from '~/components/error/ErrorBoundary.vue'
import ErrorMessage from '~/components/error/ErrorMessage.vue'
import TaskList from '~/components/task/TaskList.vue'

useHead({
  title: 'Just a To-do App.',
  meta: [
    { name: 'description', content: 'Todo this todo that.' },
  ],
})

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.initializeSampleData()
})

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

        <ErrorBoundary @error="logError">
          <TaskList />
        </ErrorBoundary>
      </div>
    </main>
  </div>
</template>

<style scoped lang="postcss">
.main {
  padding: var(--spacing-8) 0;
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--container-padding);
}

@container (max-width: 1024px) {
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
</style>
