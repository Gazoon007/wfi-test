<script setup lang="ts">
const taskStore = useTaskStore()
const taskCounts = computed(() => taskStore.taskCounts)

function handleClearCompleted() {
  taskStore.deleteCompletedTasks()
}

function handleMarkAllCompleted() {
  taskStore.markAllAsCompleted()
}
</script>

<template>
  <div v-if="taskCounts.all > 0" class="bulk-actions">
    <div class="bulk-actions__content">
      <p class="bulk-actions__summary">
        Total: {{ taskCounts.all }} tasks
        ({{ taskCounts.done }} completed, {{ taskCounts.todo + taskCounts.in_progress }} remaining)
      </p>
      <div class="bulk-actions__buttons">
        <button
          v-if="taskCounts.done > 0"
          class="btn btn--small btn--danger"
          @click="handleClearCompleted"
        >
          🗑️ Clear Completed ({{ taskCounts.done }})
        </button>
        <button
          v-if="taskCounts.todo + taskCounts.in_progress > 0"
          class="btn btn--small btn--secondary"
          @click="handleMarkAllCompleted"
        >
          ✓ Mark All Completed
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.bulk-actions {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  margin-top: var(--spacing-8);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-gray-200);

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-4);

    @media (--md) {
      flex-direction: column;
      text-align: center;
      gap: var(--spacing-4);
    }
  }

  &__summary {
    color: var(--color-gray-500);
    font-size: var(--font-size-sm);
  }

  &__buttons {
    display: flex;
    gap: var(--spacing-3);

    @media (--md) {
      justify-content: center;
      flex-wrap: wrap;
    }

    @media (--xs) {
      flex-direction: column;
      width: 100%;
      gap: var(--spacing-3);

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  }
}
</style>
