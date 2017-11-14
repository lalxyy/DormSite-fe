import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import LoginPage from '@/components/LoginPage'
import Management from '@/components/Management'

// Management
import EmptyPage from '@/components/manage/EmptyPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/manage'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/manage',
      component: Management,
      children: [
        {
          path: '',
          component: EmptyPage
        }
      ]
    }
  ]
})
