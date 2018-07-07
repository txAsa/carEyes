import axios from "axios";
// const IP = 'http://192.168.43.151:5000/'
// const IP = 'http://192.168.11.105:5000/'
// const IP = 'http://192.168.43.49:5000/'
const IP = 'http://127.0.0.1:5000/'
import { Container } from 'element-ui';


export default {
    state: {
        // 全部电影
        movies: [],
        // 热映电影
        comingmovies1: [],
        curpage: 1,
        maxpage: 0,
        isOk: false,
    },
    // mutations
    mutations: {
        // 初始化热映电影
        comingmovie_add2(state, obj) {
            state.comingmovies1 = obj.data.rows;
            // 获取当前页数
            state.curpage = obj.data.curpage;
            // 获取最大页数
            state.maxpage = obj.data.maxpage;
        },
        // 初始化全部电影
        comingmovie_textboder(state, obj) {
            state.movies = obj.data.rows
            // 获取当前页数
            state.curpage = obj.data.curpage;
            // 获取最大页数
            state.maxpage = obj.data.maxpage;
        },


        // 搜索查询
        hot_test2(state, obj) {
            let arr = [];
            for (let i = 0; i < state.comingmovies1.length; i++) {
                if (state.comingmovies1[i][obj.key].search(obj.value) != -1) {
                    arr.push(state.comingmovies1[i])
                }
            }
            state.comingmovies1 = arr
        },
    },
    // action
    actions: {
        // 获取数据电影库里的数据
        comingmovie_getst(contex, obj) {
            axios.get(IP + 'comingmovie/comingmovie_find', { params: { page: obj.page, rows: 10 } }).then(function (res) {
                let att = [];
                if (contex.state.isOk == true) {
                    console.log(contex.state)
                    console.log(contex.state.comingmovies1)
                    console.log(contex.state.comingmovies1.length)
                }
                if (contex.state.comingmovies1.length) {
                    for (let i = 0; i < res.data.rows.length; i++) {
                        for (let j = 0; j < contex.state.comingmovies1.length; j++) {
                            if (res.data.rows[i]._id == contex.state.comingmovies1[j]._id) {
                                res.data.rows.splice(i, 1)
                            }

                        }
                    }
                    att = res.data.rows;

                } else {
                    att = res.data.rows;
                }

                contex.commit({
                    type: 'comingmovie_textboder',
                    data: { maxpage: res.data.maxpage, curpage: res.data.curpage, rows: att }
                })
            })
        },

        // 增加到热映电影里面
        comingmovie_add(contex, obj) {
            axios.get(IP + 'comingmovie/comingmovie_add', { params: { movies: obj.worker } }).then(function (res) {
                console.log('新增成功')
            })
        },
        // 渲染热映电影页面
        comingmovie_find1(contex, obj) {
            axios.get(IP + 'comingmovie/comingmovie_add1', { params: { page: obj.page, rows: obj.rows } }).then(function (res) {
                let arr = [];
                for (let i = 0; i < res.data.rows.length; i++) {
                    arr.push(res.data.rows[i].movies[0])
                }
                contex.commit({
                    type: 'comingmovie_add2',
                    data: { maxpage: res.data.maxpage, curpage: res.data.curpage, rows: arr }
                })
                contex.state.isOk = true
            })
        },
        // 删除热映电影
        comingmovie_del(contex, obj) {
            axios.get(IP + 'comingmovie/comingmovie_moviesdel', { params: { movies: obj.hotdel } }).then(function (res) {
                console.log(res)
                contex.commit({
                    type: 'comingmovie_find1',
                })
                console.log('删除成功')
            })
        },
    }
}