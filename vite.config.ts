import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Performance Optimizations
  build: {
    // Minificação otimizada
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: {
        safari10: true
      }
    },
    
    // Code splitting otimizado
    rollupOptions: {
      output: {
        // Separar chunks por vendor
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
          utils: ['react-helmet-async']
        },
        
        // Nomes de arquivo com hash para cache
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (/\.(css)$/.test(assetInfo.name || '')) {
            return 'assets/css/[name]-[hash].[ext]';
          }
          
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name || '')) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          
          return 'assets/[name]-[hash].[ext]';
        }
      },
      
      // Tree-shaking otimizado
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },
    
    // Otimizações de chunk
    chunkSizeWarningLimit: 1000,
    
    // Sourcemap apenas em desenvolvimento
    sourcemap: false,
    
    // Compressão CSS
    cssMinify: true,
    
    // Target para melhor compatibilidade
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13.1']
  },
  
  // Otimizações de desenvolvimento
  server: {
    // Preload de módulos
    warmup: {
      clientFiles: [
        './src/components/**/*.tsx',
        './src/hooks/**/*.ts',
        './src/utils/**/*.ts'
      ]
    }
  },
  
  // Otimizações de dependências
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react',
      'react-helmet-async'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  
  // CSS otimizações
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      // Otimizações para PostCSS/Tailwind
    }
  }
})
