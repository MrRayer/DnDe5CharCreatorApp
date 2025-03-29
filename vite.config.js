import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({  
  base: "/DnDe5CharCreatorApp/",
  plugins: [react()],
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3003,
  },
})