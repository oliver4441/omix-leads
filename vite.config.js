import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'error-catcher',
      transformIndexHtml(html) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              injectTo: 'head-prepend',
              children: `window.__errors=[];window.onerror=function(m,u,l,c,e){window.__errors.push({msg:String(m),url:u,line:l,col:c,stack:e&&e.stack?e.stack.substring(0,500):'no stack'})};window.addEventListener('unhandledrejection',function(e){window.__errors.push({msg:String(e.reason),stack:e.reason&&e.reason.stack?e.reason.stack.substring(0,500):'no stack',type:'rejection'})})`
            }
          ]
        }
      }
    }
  ],
})
