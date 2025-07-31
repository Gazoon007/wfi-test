<script setup lang="ts">
interface Props {
  logErrors?: boolean
  showBackLink?: boolean
  backLinkText?: string
  backLinkTo?: string
}

const props = withDefaults(defineProps<Props>(), {
  logErrors: true,
  showBackLink: false,
  backLinkText: 'Back',
  backLinkTo: '/',
})

const emit = defineEmits<{
  (e: 'error', error: Error)
}>()

function handleError(error: Error) {
  if (props.logErrors) {
    console.error('Error caught by ErrorBoundary:', error)
  }
  emit('error', error)
}
</script>

<template>
  <NuxtErrorBoundary @error="handleError">
    <slot />

    <template #error="{ error, clearError }">
      <div class="error-boundary">
        <div class="error-boundary__content">
          <h2 class="error-boundary__title">
            Something went wrong
          </h2>
          <p class="error-boundary__message">
            {{ error.message || 'An unexpected error occurred' }}
          </p>
          <div class="error-boundary__actions">
            <NuxtLink
              v-if="showBackLink"
              :to="backLinkTo"
              class="btn btn--secondary"
            >
              {{ backLinkText }}
            </NuxtLink>
            <button
              class="btn btn--primary"
              @click="clearError"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>

<style scoped lang="postcss">
.error-boundary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-8);
  background-color: var(--color-gray-50);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-200);
  text-align: center;
  margin: var(--spacing-6) 0;

  &__title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-gray-900);
    margin-bottom: var(--spacing-4);
  }

  &__message {
    font-size: var(--font-size-base);
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-6);
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: var(--spacing-4);
  }
}
</style>
