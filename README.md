# Task Manager (To-do App) - Nuxt 4 Application

A modern, responsive task management application built with Nuxt 4, Vue 3, and Pinia. This application demonstrates best practices in modern web development including TypeScript, form validation, state persistence, and comprehensive testing.

## 🚀 Features

### Core Functionality
- ✅ **CRUD Operations**: Create, read, update, and delete tasks
- 🔍 **Task Filtering**: Filter tasks by status (All, To Do, In Progress, Done)
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- 💾 **State Persistence**: Tasks are automatically saved to localStorage
- 🎯 **URL-based Editing**: Edit tasks via direct URLs (`/task/:id`)

### Technical Features
- ⚡ **Nuxt 4**: Latest version with new app directory structure
- 🏪 **Pinia State Management**: Centralized state with persistence
- 📝 **Form Validation**: Using vee-validate with Zod schemas
- 🎨 **BEM CSS Methodology**: Organized and maintainable styling
- 🧪 **Component Testing**: Comprehensive test suite with Vitest
- 📱 **Animations**: Smooth transitions and micro-interactions
- 🔤 **TypeScript**: Fully typed for better developer experience

### Bonus Features
- 🎭 **Animations**: Task creation/deletion animations
- 🧪 **Testing**: Component and store tests with Nuxt Test Utils
- 🛡️ **Error Handling**: Comprehensive error states and validation
- 🎨 **Modern UI**: Beautiful gradient design with Inter font
- 📊 **Bulk Operations**: Mark all complete, clear completed tasks

## 🏗️ Project Structure

```
app/
├── assets/
│   └── css/            # Global styles with BEM methodology
├── components/
│   ├── task/          # Task-related components
│   │   ├── TaskForm.vue      # Task creation/editing form
│   │   ├── TaskList.vue      # Task list display
│   │   └── TaskBulkActions.vue # Bulk task operations
│   └── error/          # Error components
│       └── NotFound.vue # 404 page
├── pages/
│   ├── index.vue       # Main task management page
│   └── task/
│       └── [id].vue    # Task detail/edit page
├── stores/
│   └── task.ts         # Pinia store for task management
├── types/
│   └── task.ts         # TypeScript type definitions
└── tests/
    ├── components/     # Component tests
    └── stores/         # Store tests
```

## 🛠️ Tech Stack

- **Framework**: Nuxt 4 (Vue 3)
- **State Management**: Pinia with persistence
- **Styling**: PostCSS with BEM methodology
- **Validation**: vee-validate + Zod
- **Testing**: Vitest + Nuxt Test Utils
- **TypeScript**: Strict typing throughout
- **Fonts**: Inter via @nuxt/fonts

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wfi-test
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run tests once
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage

# Run tests with UI
pnpm run test:ui
```

## 🏃‍♂️ Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run generate` - Generate static site
- `pnpm run test` - Run tests
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm run test:coverage` - Run tests with coverage report
- `pnpm run test:ui` - Run tests with UI interface

## 📱 Usage

### Creating Tasks
1. Fill out the task form at the top of the page
2. Title is required, description is optional
3. Select initial status (To Do, In Progress, Done)
4. Click "Create Task"

### Managing Tasks
- **Edit**: Click the "Edit" button or navigate to `/task/:id`
- **Delete**: Click the "Delete" button and confirm
- **Change Status**: Use the status dropdown on each task
- **Filter**: Use the filter buttons to show specific task statuses

### Bulk Operations
- **Mark All Complete**: Mark all remaining tasks as done
- **Clear Completed**: Remove all completed tasks

## 🎨 Design System

The application uses a consistent design system based on:

- **Colors**: Blue-purple gradient primary, semantic status colors
- **Typography**: Inter font family with consistent sizing
- **Spacing**: 8px base unit with consistent margins/padding
- **Components**: Reusable button styles and form elements
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Configuration

### Nuxt Configuration
The app is configured with:
- Pinia for state management
- Font optimization via @nuxt/fonts
- PostCSS with nested CSS support
- ESLint for code quality, based on antfu config
- Test utilities for component testing (not finished)

### State Persistence
Tasks are automatically persisted to localStorage using `pinia-plugin-persistedstate`. The persistence includes:
- All tasks data
- Current filter selection

How to apply it: install the plugin and set `persist: true` inside the store.

## 🧪 Testing Strategy

The application includes comprehensive tests for:

### Component Tests
- **TaskForm**: Form validation, submission, error handling
- **TaskList**: Task rendering, interactions, animations (Postponed)
- **TaskFilter**: Filter functionality and state management (Postponed)

### Store Tests
- **Task Store**: CRUD operations, filtering, bulk operations
- **State Management**: Getters, actions, and persistence

## 🙏 Acknowledgments

- Built with [Nuxt 4](https://nuxt.com/)
- State management by [Pinia](https://pinia.vuejs.org/)
- Form validation by [vee-validate](https://vee-validate.logaretm.com/)
- Testing with [Vitest](https://vitest.dev/)

---

