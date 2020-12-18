import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import board from '@/components/board'
import boardsearch from '@/components/boardsearch'
//import modal from '@/components/modal'
import boardread from '@/components/boardread'
import boardwrite from '@/components/boardwrite'
import info from '@/components/info'
import create from '@/components/CreateAccount'
import infowrite from '@/components/infowrite'
import inforead from '@/components/inforead'
import infosearch from '@/components/infosearch'
import members from '@/components/Members'

Vue.use(Router)




export const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'main',
            component: Main
        },
        {
            path: '/create',
            name: 'create',
            component: create
        },
        {
            path: '/info',
            name: 'info',
            component: info
        },
        {
            path: '/board',
            name: 'board',
            component: board
        },
        {
            path: '/boardread',
            name: 'boardread',
            component: boardread
        },
        {
            path: '/boardwrite',
            name: 'boardwrite',
            component: boardwrite
        },
        {
            path: '/infowrite',
            name: 'infowrite',
            component: infowrite
        },
        {
            path: '/inforead',
            name: 'inforead',
            component: inforead
        },
        {
            path: '/boardsearch:contents',
            name: 'boardsearch',
            component: boardsearch
        },
        {
            path: '/infosearch:contents',
            name: 'infosearch',
            component: infosearch
        },
        {
            path: '/members',
            name: 'members',
            component: members
        }
    ]
})