import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/page/layout'
import login from '@/page/login'
//主页
import home from '@/page/home/home'
// 表格
import tablepage from '@/page/table/index'
import table from '@/page/table/table'
import addTable from '@/page/table/addTable'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: login,
            redirect: '/login',
            meta: {
                title: '渠道中心管理平台',
            }
        },
        {
            path: '/login',
            component: login,
            meta: {
                title: '渠道中心管理平台',
            }
        },
        {
            path: '/',
            name: '首页',
            component: layout,
            children: [
                {
                    path: '/home',
                    name: "home",
                    component: home
                },
                {
                    path: '/tablepage',
                    component: tablepage,
                    children:[
                        {
                            path: 'table',
                            name: "table",
                            component: table
                        },
                        {
                            path: 'addTable',
                            name: "addTable",
                            component: addTable
                        },
                    ]
                },
                
            ]
        }
    ]
})
