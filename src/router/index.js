import Vue from 'vue'
import Router from 'vue-router'

import LoginPage from '@/components/LoginPage'
import Management from '@/components/Management'

// Management
import EmptyPage from '@/components/manage/EmptyPage'
import SanitaryStatus from '@/components/manage/SanitaryStatus'
import StudentInformation from '@/components/manage/StudentInformation'
import ElectricalApplianceUsage from '@/components/manage/ElectricalApplianceUsage'
import ChangeRoom from '@/components/manage/ChangeRoom'
import AppointRoomLeader from '@/components/manage/AppointRoomLeader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
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
        },
        {
          path: 'sanitary-status',
          component: SanitaryStatus
        },
        {
          path: 'students',
          component: StudentInformation
        },
        {
          path: 'electrical-appliance',
          component: ElectricalApplianceUsage
        },
        {
          path: 'change-room',
          component: ChangeRoom
        },
        {
          path: 'appoint-room-leader',
          component: AppointRoomLeader
        }
      ]
    }
  ]
})
