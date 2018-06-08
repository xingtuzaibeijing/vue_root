import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Mian from '../components/Mian'
import MassTexing from '../components/MassTexing'
import Template from '../components/Template'
import AuditTpl from '../components/AuditTpl'
import MassTexingForm from '../components/MassTexingForm'
import AuditTplForm from '../components/AuditTplForm'
import AuditSms from '../components/AuditSms'
import AuditSmsForm from '../components/AuditSmsForm'
import DayBill from '../components/DayBill'
import SystemUser from '../components/SystemUser'
import SmsRecordDetail from '../components/SmsRecordDetail'
import LinkAdmin from '../components/LinkAdmin'
import ChannelBalance from '../components/ChannelBalance'
import SystemSet from '../components/SystemSet'
import User from '../components/User'
import Cookies from 'js-cookie'
import "babel-polyfill"
import NoPage from "../error-page/404"
import NoRoot from "../error-page/403"
import Error from "../error-page/500"
import SendRules from "../components/SendRules"

Vue.use(Router);
export const router = new Router({
  base: "/sp-dmp-vue",
  routes: [
    {
      // / 跳转到首页 设置登录拦截 没有登录回到登录页面
      path: '/',
      name: 'inedx',
      component: Home,
      redirect:"/mian",
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home,
          level: 1,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/mian',//后台总览
          name: 'Mian',
          component: Mian,
          level: 3,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: '/massTexing',//短信群发
          name: 'MassTexing',
          component: MassTexing,
          level: 6,
          meta: {
            requireAuth: true,
            keepAlive: true, // 需要被缓存
          }
        },
        {
          path: '/template',//模板报备
          name: 'Template',
          component: Template,
          level: 7,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: '/auditTpl',//模板审批
          name: 'AuditTpl',
          component: AuditTpl,
          level: 8,
          meta: {
            requireAuth: true,
           
          },
        },
        {
          path: '/massTexingForm',//短信群发
          name: 'MassTexingForm',
          component: MassTexingForm,
          level: 9,
          meta: {
            requireAuth: true,
            keepAlive: true, // 需要被缓存
          },
        },
        {
          path: '/auditTplForm',//审批模板
          name: 'AuditTplForm',
          component: AuditTplForm,
          level: 10,
          meta: {
            requireAuth: true,
            
          },
        },
        {
          path: '/auditSms',//审批短信列表
          name: 'AuditSms',
          component: AuditSms,
          level: 11,
          meta: {
            requireAuth: true,
            
          },
        },
        {
          path: '/auditSmsForm',//审批短信
          name: 'AuditSmsForm',
          component: AuditSmsForm,
          level: 12,
          meta: {
            requireAuth: true,
            
          },
        },
        {
          path: '/dayBill',//日账单
          name: 'DayBill',
          component: DayBill,
          level: 13,
          meta: {
            requireAuth: true,
            
          },
        },
        {
          path: '/systemUser',//用户列表
          name: 'SystemUser',
          component: SystemUser,
          level: 14,
          meta: {
            requireAuth: true,
            
          },
        },
        {
          path: '/smsRecordDetail',//短信发送记录详情
          name: 'SmsRecordDetail',
          component: SmsRecordDetail,
          level: 15,
          meta: {
            requireAuth: true,
            
          },
        },
        {
          path: '/linkAdmin',//链接管理
          name: 'LinkAdmin',
          component: LinkAdmin,
          level: 16,
          meta: {
            requireAuth: true,
            
          },
        },
        {
          path: '/channelBalance',//渠道余额
          name: 'ChannelBalance',
          component: ChannelBalance,
          level: 17,
          meta: {
            requireAuth: true,
            
          },
        },
        {
          path: '/systemSet',//系统用户管理（用户）
          name: 'SystemSet',
          component: SystemSet,
          level: 18,
          meta: {
            requireAuth: true,
            
          },
        },
        {
          path: '/user',//用户（用户）
          name: 'User',
          component: User,
          level: 19,
          meta: {
            requireAuth: true,
            
          },
        }, 
        {
          path: '/sendRules',//发送规则
          name: 'SendRules',
          component: SendRules,
          level: 20,
          meta: {
            requireAuth: true,
            
          },
        },
      ]
    },
    {
      path: '/login',//登录
      name: 'Login',
      component: Login,
      level: 2,
    },
    {
      path: '/register',//注册
      name: 'Register',
      component: Register,
      level: 3,
    },
   {
    path: '/*',//404
    name: 'error-404',
    meta: {
      title: '404-页面不存在',
      
    },
    component: NoPage,
    level: 4,
  },
  {
    path: '/*',//403
    name: 'error-403',
    meta: {
      title: 'NoRoot'
    },
    component: NoRoot,
    level: 5,
  },
  {
    path: '/*',//404
    name: 'error-500',
    meta: {
      title: 'Error'
    },
    component: Error,
    level: 6,
  },
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (Cookies.get("sp_dmp_token")) { // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        name:"Login"
      })
    }
  }
  else {
    next();
  }
});

export default router
