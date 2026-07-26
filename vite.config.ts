import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite build and dev server configuration
export default defineConfig({
  plugins: [react()],
});
