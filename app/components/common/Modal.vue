<script setup lang="ts">
interface Props {
  isOpen: boolean
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: '70vw',
})

const emit = defineEmits<{
  (e: 'close')
}>()

function handleBackdropClick(event: MouseEvent) {
  if ((event.target as HTMLElement).classList.contains('modal')) {
    emit('close')
  }
}

function handleEscKey(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscKey)
})
</script>

<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="modal"
      @click="handleBackdropClick"
    >
      <div
        class="modal-content"
        :style="{ maxWidth }"
      >
        <div class="modal-header">
          <button
            class="modal-close"
            aria-label="Close modal"
            @click="emit('close')"
          >
            ✕
          </button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="postcss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  &-content {
    background: var(--color-white);
    border-radius: var(--radius-lg);
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-4) var(--spacing-6);
    border-bottom: 1px solid var(--color-gray-200);
  }

  &-close {
    background: transparent;
    border: none;
    font-size: var(--font-size-xl);
    cursor: pointer;
    color: var(--color-gray-500);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
    flex-flow: row-reverse;

    &:hover {
      background-color: var(--color-gray-100);
      color: var(--color-gray-700);
    }
  }

  &-body {
    padding: var(--spacing-6);
    background-color: var(--color-primary-dark);
    flex-grow: 1;
  }

  &-footer {
    padding: var(--spacing-4) var(--spacing-6);
    border-top: 1px solid var(--color-gray-200);
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-3);
  }

  @media (--md) {
    padding: var(--spacing-3);

    &-content {
      max-height: 95vh;
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content {
  animation: modal-in 0.3s ease-out forwards;
}

.modal-leave-active .modal-content {
  animation: modal-out 0.2s ease-in forwards;
}

@keyframes modal-in {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes modal-out {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(50px);
    opacity: 0;
  }
}
</style>
