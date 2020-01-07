import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Login from '@/components/Login' //登录
import Home from '@/components/Home' //首页

import Grouping from '@/components/Grouping' //分组管理
import Equipment from '@/components/Equipment' //设备管理-机器人
import Gateway from '@/components/Gateway' //设备管理-网关
import Policelist from '@/components/Policelist' //报警管理-报警列表
import Policeset from '@/components/Policeset' //报警管理-报警设置
import Timing from '@/components/Timing' //定时管理

import {getUserInfo} from '@/assets/js/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/Home',
          name: 'Home',
          component: Home
        },
        {
          path: '/Gateway',
          name: 'Gateway',
          component: Gateway
        },
        {
          path: '/Grouping',
          name: 'Grouping',
          component: Grouping
        },
        {
          path: '/Equipment',
          name: 'Equipment',
          component: Equipment
        },
        {
          path: '/Policelist',
          name: 'Policelist',
          component: Policelist
        },
        {
          path: '/Policeset',
          name: 'Policeset',
          component: Policeset
        },
        {
          path: '/Timing',
          name: 'Timing',
          component: Timing
        },
      ]
    }
  ]
})
// 添加路由拦截钩子
router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    // console.log('1')
    // 如果是登录页，就放行，直接跳转到登录页
    next()
  } else {
    // 如果不是登录页面，就先获取token,判断是否有token，没有token就跳转到登录页，有token就直接跳转
    const token = getUserInfo()
    if (!token) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  }
})
export default router
