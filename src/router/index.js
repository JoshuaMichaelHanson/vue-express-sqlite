import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: process.env.VUE_APP_OKTA_DOMAIN,
  client_id: process.env.VUE_APP_CLIENT_ID,
  redirectUri: window.location.origin + '/implicit/callback',
  scope: 'openid profile email'
})

//  redirectUri: window.location.origin + '/implicit/callback',
// redirect_uri: 'http://localhost:3000/implicit/callback',
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/implicit/callback',
    component: Auth.handleCallback()
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
