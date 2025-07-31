import globalData from '@csstools/postcss-global-data'
import postcssCustomMedia from 'postcss-custom-media'
import postcssNested from 'postcss-nested'

export default defineNuxtConfig({
  modules: [
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate',
    '@nuxt/test-utils/module',
  ],
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Task Manager',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A modern task management application built with Nuxt 4' },
      ],
    },
  },
  css: ['@/assets/css/main.pcss'],
  experimental: {
    payloadExtraction: false,
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'static',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
      postcss: {
        plugins: [
          globalData({
            files: ['./app/assets/css/custom-media.pcss'],
          }),
          postcssNested(),
          postcssCustomMedia({
            preserve: false,
          }),
        ],
      },
    },
  },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weight: '400 700' },
    ],
  },
  pinia: {
    storesDirs: ['./app/stores/**'],
  },
})
