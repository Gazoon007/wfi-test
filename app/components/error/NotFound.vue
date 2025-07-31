<script setup lang="ts">
interface Props {
  title?: string
  message?: string
  buttonText?: string
  buttonLink?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Not Found',
  message: 'The item you\'re looking for doesn\'t exist or may have been deleted.',
  buttonText: 'Go Back',
  buttonLink: '/',
})
</script>

<template>
  <div class="not-found">
    <h2 class="not-found__title">
      {{ title }}
    </h2>
    <p class="not-found__message">
      {{ message }}
    </p>
    <NuxtLink :to="buttonLink" class="btn btn--primary">
      {{ buttonText }}
    </NuxtLink>
  </div>
</template>

<style scoped lang="postcss">
.not-found {
  text-align: center;
  padding: var(--spacing-12);
  max-width: 500px;
  margin: 0 auto;

  &__title {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-4);
  }

  &__message {
    color: var(--color-gray-500);
    margin-bottom: var(--spacing-8);
    line-height: 1.6;
  }
}

@media (--md) {
  .not-found {
    padding: var(--spacing-8) var(--spacing-4);

    &__title {
      font-size: var(--font-size-2xl);
    }

    &__icon {
      font-size: 3rem;
    }
  }
}
</style>
