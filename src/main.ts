import { createApp } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './style.css'
import App from './App.vue'
import { initializeTheme } from './store'

// Initialize theme before mounting app
initializeTheme()

createApp(App).mount('#app')
