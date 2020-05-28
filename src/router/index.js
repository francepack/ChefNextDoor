import Vue from 'vue'
import Router from 'vue-router'
import Signin from '../components/Signin.vue'
import Signup from '../components/Signup.vue'
import Vendors from '../components/vendors/Vendors.vue'
import Dishes from '../components/dishes/Dishes.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/vendors',
      name: 'Vendors',
      component: Vendors
    },
    {
      path: '/dishes',
      name: 'Dishes',
      component: Dishes
    }
  ]
})
