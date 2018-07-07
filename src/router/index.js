import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 一级路由
import Appmao from '../components/Appmaoyan/Appmain.vue'
import login from '../components/Appmaoyan/Login.vue'
import wel from '../components/Appmaoyan/welcome.vue'

// 二级路由
import movies from '../components/Appmaoyan/movies/movies.vue'
import comingmovies from '../components/Appmaoyan/comingmovies/comingmovies.vue'
import hotmovies from '../components/Appmaoyan/hot_movies/hot_movies.vue'
import macth from '../components/Appmaoyan/macth_manager/MacthManager.vue'
import modules from '../components/Appmaoyan/modules/cinema.vue'
// import user from '../components/Appmaoyan/user/user.vue'
// import usermanager from '../components/Appmaoyan/usermanager/usermanager.vue'
import usermanager from '../components/Appmaoyan/usermanager/usermanager.vue'




//引入ui-css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      component: login,
    },

    {
      path: '/Appmaoyan',
      component: Appmao,
      children: [
        { path: '/', component: wel },
        { path: 'movies', component: movies },
        { path: 'comingmovies', component: comingmovies },
        { path: 'hot_movies', component: hotmovies },
        { path: 'macth_manager', component: macth },
        { path: 'modules', component: modules },
        // { path: 'user', component: user },
        { path: 'usermanager', component: usermanager }
      ]
    }
  ]
})
