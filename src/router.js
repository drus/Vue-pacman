import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/game',
            name: 'game',
            component: () =>
                import ( /* webpackChunkName: "game" */ './views/Game.vue')
        },
        {
            path: '/game/:id',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "game" */ './views/Game.vue')
        },
        {
            path: '/designer',
            name: 'designer',
            component: () =>
                import ( /* webpackChunkName: "game" */ './views/Designer.vue')
        },
        {
            path: '/designer/:id',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "game" */ './views/Designer.vue')
        },
        {
            path: '/screengamelist',
            name: 'screengamelist',
            component: () =>
                import ( /* webpackChunkName: "game" */ './views/ScreenGamesList.vue')
        }
    ]
})