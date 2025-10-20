import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    sourcemap: false, // 🔒 Matikan sourcemap agar source code gak kebaca di browser
    minify: 'terser', // Gunakan terser untuk obfuscation yang lebih kuat
    terserOptions: {
      mangle: true, // Ubah nama variabel & fungsi jadi acak
      compress: {
        drop_console: true, // Hilangkan semua console.log()
        drop_debugger: true, // Hilangkan debugger statements
        passes: 3, // Kompresi berlapis agar makin sulit dibaca
      },
      format: {
        comments: false, // Hilangkan semua komentar
      },
    },
    rollupOptions: {
      output: {
        manualChunks: undefined, // satukan jadi 1 file besar (opsional)
      },
    },
  },
});
