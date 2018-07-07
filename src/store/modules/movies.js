import axios from 'axios'
import { isObject } from "util";

export default {
    state: {
        // IP: 'http://192.168.43.171:5000/',
        // IP: 'http://192.168.11.105:5000/',
        // IP: 'http://192.168.11.104:5000/',
        // IP: 'http://192.168.43.49:5000/',
        IP: 'http://127.0.0.1:5000/',
        movies: [],
        total: 1,
        page: 1,
    },
    mutations: {
        changeMovies(state, obj) {
            state.movies = obj.data.rows;
            state.total = obj.data.total;
        },
        searchMovies(state, obj) {
            state.movies = obj.rows;
            state.total = obj.total

        }
    },
    actions: {
        //刷新影院数据
        refreshMovies(context, obj) {
            axios.post(context.state.IP + 'movies/getMovies', {
                page: obj.page,
                rows: obj.rows
            }).then(function (res) {
                context.commit({
                    type: 'changeMovies',
                    data: res.data
                })
            })
        },
        //增加
        addMovies(context, obj) {
            axios.post(context.state.IP + "movies/addMovies", obj.data).then(data => {

                // context.commit("InitMovies", data.data)
            });
        },
        //修改 upMovies
        upMovies(context, obj) {
            axios.post(context.state.IP + "movies/upMovies", obj.data).then(data => {

            });
        },
        //删除
        movies_Delete(context, obj) {
            axios.get(context.state.IP + "movies/movies_Delete", { params: { id: obj.id } }).then(data => {
                context.commit({
                    type: "changeMovies",
                    data: data.data
                })
            })
        },
        //搜索
        movies_searchMovies(context, obj) {
            delete obj.type;
            axios.get(context.state.IP + "movies/searchMovies", { params: obj }).then(data => {
                context.commit("searchMovies", data.data)
            });
        },

    }
}