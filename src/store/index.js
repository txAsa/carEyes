import Vuex from 'vuex'
import Vue from 'vue'





Vue.use(Vuex)


import usermanager from './modules/usermanager'
import hot_movies from './modules/hotmovies'
import comingmovies from './modules/comingmovies'
import movie from './modules/movies'
//影院匹配
import cinema from '../store/modules/cinema'
import macth from './modules/macth_manager'

export default new Vuex.Store({
    modules: {
        usermanager,
        hot_movies,
        comingmovies,
        movie,
        macth,
        cinema: cinema
    }
})