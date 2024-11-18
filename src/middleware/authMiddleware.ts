import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const authMiddleware = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const token = localStorage.getItem('authToken') 
  
  if (to.meta.requiresAuth && !token) {
    localStorage.setItem('authMessage', 'Please sign in first')
    next('/login')
  } else {
    next()
  }
}
