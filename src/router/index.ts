import { createRouter, createWebHistory } from 'vue-router'
import TodoLanding from '@/views/TodoLandingPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import CreateTodoPage from '@/views/CreateTodoPage.vue'
import TodoTasksPage from '@/views/TodoTasksPage.vue'
import { authMiddleware } from '../middleware/authMiddleware'

const routes = [
  { path: '/', component: TodoLanding },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage},
  { path: '/create-todo', component: CreateTodoPage, meta: {requiresAuth: true}, beforeEnter: authMiddleware},
  { path: '/todo-list', component: TodoTasksPage, meta: {requiresAuth: true}, beforeEnter: authMiddleware}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
