<script setup lang="ts">
import { useTaskStore } from '~/stores/task'

const taskStore = useTaskStore()
const tasks = computed(() => taskStore.filteredTasks)
</script>

<template>
  <div class="task-list">
    <div class="task-list__header">
      <h2 class="task-list__title">
        Tasks ({{ tasks.length }})
      </h2>
    </div>

    <div v-if="tasks.length === 0" class="task-list__empty">
      <div class="task-list__empty-icon">
        📝
      </div>
      <p>No tasks found. Create your first task to get started!</p>
    </div>

    <div v-else>
      <TransitionGroup name="task" tag="div">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.task-enter-active,
.task-leave-active {
  transition: all 0.3s ease;
}

.task-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.task-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.task-move {
  transition: transform 0.3s ease;
}

.task-list {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-gray-200);

  &__header {
    background: var(--color-gray-50);
    padding: var(--spacing-6);
    border-bottom: 1px solid var(--color-gray-200);
  }

  &__title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-gray-700);
  }

  &__empty {
    padding: var(--spacing-12);
    text-align: center;
    color: var(--color-gray-500);

    &-icon {
      font-size: 3rem;
      margin-bottom: var(--spacing-4);
      opacity: 0.5;
    }
  }

  @media (--md) {
    margin-left: calc(-1 * var(--spacing-3));
    margin-right: calc(-1 * var(--spacing-3));
    border-radius: 0;
  }

  @media (--xs) {
    &__empty {
      padding: var(--spacing-6);
    }
  }
}
</style>
