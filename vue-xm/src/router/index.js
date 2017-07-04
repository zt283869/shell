import Vue from 'vue'
import Router from 'vue-router'
import Head_slide from '@/components/Head_slide'
import Center_frame from '@/components/Center_frame'
import Center_host from '@/components/Center_hot'
import Center_6hot from '@/components/Center_6hot'
import Center_seg from '@/components/Center_seg'
import  Center_daycons from '@/components/Center_daycons'
import  Center_run from '@/components/Conter_run'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/run', name: 'Center_frame', component: Center_run}

  ]
})
