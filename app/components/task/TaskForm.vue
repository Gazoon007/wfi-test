<script setup lang="ts">
import type { TaskFormData } from '~/schemas/task'
import type { Task } from '~/types/task'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { createTaskSchema, updateTaskSchema } from '~/schemas/task'

interface Props {
  task?: Task
  mode?: 'create' | 'edit'
}

interface Emits {
  (e: 'submit', data: TaskFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'create',
})

const emit = defineEmits<Emits>()

const validationSchema = computed(() =>
  props.mode === 'edit' ? updateTaskSchema : createTaskSchema,
)

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(validationSchema.value),
  initialValues: props.task
    ? {
        title: props.task.title,
        description: props.task.description || '',
        status: props.task.status,
      }
    : {
        title: '',
        description: '',
        status: 'todo' as const,
      },
})

const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')
const [status, statusAttrs] = defineField('status')

const isSubmitting = ref(false)

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  try {
    emit('submit', values as TaskFormData)
    if (props.mode === 'create') {
      resetForm()
    }
  }
  finally {
    isSubmitting.value = false
  }
})

function onCancel() {
  emit('cancel')
  if (props.mode === 'create') {
    resetForm()
  }
}

const formTitle = computed(() =>
  props.mode === 'edit' ? 'Edit Task' : 'Create New Task',
)

const submitButtonText = computed(() =>
  props.mode === 'edit' ? 'Update Task' : 'Create Task',
)
</script>

<template>
  <form class="task-form" @submit="onSubmit">
    <h2 class="task-form__title">
      {{ formTitle }}
    </h2>

    <div class="task-form__group">
      <label for="title" class="task-form__label">
        Title <span style="color: #ef4444;">*</span>
      </label>
      <input
        id="title"
        v-model="title"
        v-bind="titleAttrs"
        type="text"
        class="task-form__input"
        :class="{ 'task-form__input--error': errors.title }"
        placeholder="Enter task title..."
        :disabled="isSubmitting"
      >
      <div v-if="errors.title" class="task-form__error">
        {{ errors.title }}
      </div>
    </div>

    <div class="task-form__group">
      <label for="description" class="task-form__label">
        Description
      </label>
      <textarea
        id="description"
        v-model="description"
        v-bind="descriptionAttrs"
        class="task-form__textarea"
        :class="{ 'task-form__textarea--error': errors.description }"
        placeholder="Enter task description (optional)..."
        :disabled="isSubmitting"
      />
      <div v-if="errors.description" class="task-form__error">
        {{ errors.description }}
      </div>
    </div>

    <div class="task-form__group">
      <label for="status" class="task-form__label">
        Status
      </label>
      <select
        id="status"
        v-model="status"
        v-bind="statusAttrs"
        class="task-form__select"
        :class="{ 'task-form__select--error': errors.status }"
        :disabled="isSubmitting"
      >
        <option value="todo">
          To Do
        </option>
        <option value="in_progress">
          In Progress
        </option>
        <option value="done">
          Done
        </option>
      </select>
      <div v-if="errors.status" class="task-form__error">
        {{ errors.status }}
      </div>
    </div>

    <div class="task-form__actions">
      <button
        v-if="mode === 'edit'"
        type="button"
        class="btn btn--secondary"
        :disabled="isSubmitting"
        @click="onCancel"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="btn btn--primary"
      >
        <span v-if="isSubmitting">
          {{ mode === 'edit' ? 'Updating...' : 'Creating...' }}
        </span>
        <span v-else>
          {{ submitButtonText }}
        </span>
      </button>
    </div>
  </form>
</template>

<style scoped lang="postcss">
.task-form {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  margin-bottom: var(--spacing-8);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-gray-200);

  &__title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-6);
    color: var(--color-gray-700);
  }

  &__group {
    margin-bottom: var(--spacing-6);
  }

  &__label {
    display: block;
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-2);
    color: var(--color-gray-700);
  }

  &__input,
  &__textarea,
  &__select {
    width: 100%;
    padding: var(--spacing-3);
    border: 2px solid var(--color-gray-200);
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    transition: var(--transition-fast);

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &--error {
      border-color: var(--color-error);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  }

  &__textarea {
    resize: vertical;
    min-height: 100px;
  }

  &__error {
    color: var(--color-error);
    font-size: var(--font-size-sm);
    margin-top: var(--spacing-1);
  }

  &__actions {
    display: flex;
    gap: var(--spacing-4);
    justify-content: flex-end;
    margin-top: var(--spacing-8);

    @media (--md) {
      flex-wrap: wrap;
      gap: var(--spacing-3);
    }

    @media (--xs) {
      flex-direction: column;
      width: 100%;

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  }

  @media (--md) {
    margin-left: calc(-1 * var(--spacing-3));
    margin-right: calc(-1 * var(--spacing-3));
    border-radius: 0;
  }

  @media (--xs) {
    padding: var(--spacing-6);

    &__title {
      font-size: var(--font-size-xl);
    }
  }
}
</style>
