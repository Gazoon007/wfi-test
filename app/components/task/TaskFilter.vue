<script setup lang="ts">
const taskStore = useTaskStore()
const taskCounts = computed(() => taskStore.taskCounts)
const filter = computed({
  get: () => taskStore.filter,
  set: value => taskStore.setFilter(value),
})

const filterOptions = [
  { value: 'all', label: 'All Tasks' },
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
] as const

function getFilterLabel(option: typeof filterOptions[number]) {
  const count = taskCounts.value[option.value]
  return `${option.label} (${count})`
}
</script>

<template>
  <div class="filter">
    <h3 class="filter__title">
      Filter Tasks
    </h3>
    <div class="filter__options">
      <button
        v-for="option in filterOptions"
        :key="option.value"
        class="filter__option"
        :class="{ 'filter__option--active': filter === option.value }"
        type="button"
        @click="filter = option.value"
      >
        {{ getFilterLabel(option) }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.filter {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-8);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-200);

  &__title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-4);
    color: var(--color-gray-700);
  }

  &__options {
    display: flex;
    gap: var(--spacing-4);
    flex-wrap: wrap;

    @media (--md) {
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--spacing-3);
    }

    @media (--xs) {
      flex-direction: column;
      gap: var(--spacing-2);
    }

    .filter__option {
      padding: var(--spacing-2) var(--spacing-4);
      border: 2px solid var(--color-gray-200);
      border-radius: var(--radius-sm);
      background: var(--color-white);
      cursor: pointer;
      transition: var(--transition-fast);
      font-size: 0.9rem;

      &:hover {
        border-color: var(--color-primary);
      }

      &--active {
        border-color: var(--color-black);
        background: var(--color-primary-dark);
        color: var(--color-white);
        font-weight: 600;
      }

      @media (--xs) {
        width: 100%;
        text-align: center;
        flex: 1;
        min-width: 0;
        font-size: var(--font-size-sm);
        padding: var(--spacing-2) var(--spacing-3);
      }
    }
  }
}
</style>
