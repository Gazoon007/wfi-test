<script setup lang="ts">
interface Props {
  message: string
}

interface Emits {
  (e: 'dismiss')
}

defineProps<Props>()
const emit = defineEmits<Emits>()

function handleDismiss() {
  emit('dismiss')
}
</script>

<template>
  <div class="error-banner">
    <p>{{ message }}</p>
    <button class="btn btn--small btn--secondary" @click="handleDismiss">
      Dismiss
    </button>
  </div>
</template>

<style scoped lang="postcss">
.error-banner {
  background: var(--color-error-light);
  border: 1px solid var(--color-error-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-error);
}

@media (--md) {
  .error-banner {
    flex-direction: column;
    gap: var(--spacing-4);
    text-align: center;
  }
}
</style>
