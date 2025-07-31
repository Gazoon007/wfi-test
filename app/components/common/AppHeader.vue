<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <header class="header">
    <div class="container">
      <h1 class="header__title">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="header__subtitle">
        {{ subtitle }}
      </p>
    </div>
  </header>
</template>

<style scoped lang="postcss">
.header {
  background: var(--color-primary-gradient);
  color: var(--color-white);
  padding: var(--spacing-8) 0;
  box-shadow: var(--shadow-md);

  &__title {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    text-align: center;
    margin-bottom: var(--spacing-2);
  }

  &__subtitle {
    text-align: center;
    opacity: 0.9;
    font-size: var(--font-size-lg);
  }
}

@media (--md) {
  .header {
    padding: var(--spacing-6) 0;

    &__title {
      font-size: var(--font-size-3xl);
    }

    &__subtitle {
      font-size: var(--font-size-base);
    }
  }
}

@media (--xs) {
  .header {
    padding: var(--spacing-4) 0;

    &__title {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--spacing-1);
    }

    &__subtitle {
      font-size: var(--font-size-sm);
    }
  }
}
</style>
