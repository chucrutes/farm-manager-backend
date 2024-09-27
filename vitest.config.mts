import path from 'path'
import { defineConfig } from 'vitest/config'
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@application': path.resolve(__dirname, './src/application'),
      '@core': path.resolve(__dirname, './src/core'),
      '@infra': path.resolve(__dirname, './src/infra'),
    }
  },
  test: {
    globals: true,
    teardownTimeout: 5000,
    exclude: ['./src/tests', './dist']
  }
})