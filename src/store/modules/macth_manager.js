import axios from 'axios'


// const IP = 'http://192.168.43.201:5000/macth'
// const IP = 'http://192.168.11.105:5000/macth'
// const IP = 'http://192.168.43.49:5000/macth'
const IP = 'http://127.0.0.1:5000/macth'
export default ({
    state: {
        macthData: [],                       //已匹配数据
        cinemaData: [],                      //影院数据
        moviesData: [],                      //电影数据
        cinemaTing: [],                       //影厅数据

        curpage: 1,                           //当前页数
        rows: 9,                             //页数
        maxpage: 0,                           //最大页数
        total: 0                              //总数
    },
    mutations: {
        initial(state, obj) {
            if (obj.macthData) {
                state.macthData = obj.macthData.rows;
                state.maxpage = obj.macthData.maxpage;
                state.curpage = obj.macthData.curpage;
                state.total = obj.macthData.total
            } else if (obj.cinemaData) {
                state.cinemaData = obj.cinemaData
            } else if (obj.moviesData) {
                state.moviesData = obj.moviesData
            } else if (obj.cinemaTing) {
                state.cinemaTing = obj.cinemaTing
            }

        },
    },
    getters: {

    },
    actions: {
        //获取已匹配所有数据
        getMarchData(constext, obj) {
            let searchObj = {
                page: obj.page,
                rows: obj.rows,
            }
            if (obj.searchClass) {
                searchObj[obj.searchClass] = obj.text
            }
            axios.post(IP + '/getMarchData', searchObj).then((user) => {
                constext.commit({
                    type: 'initial',
                    macthData: user.data
                })
            })
        },
        //获取所有电影数据
        getMovise(constext) {
            axios.post(IP + '/getMovise').then((user) => {
                constext.commit({
                    type: 'initial',
                    moviesData: user.data
                })
            })
        },
        //获取所有影院数据
        getCinema(constext) {
            axios.post(IP + '/getCinema').then((user) => {
                constext.commit({
                    type: 'initial',
                    cinemaData: user.data
                })
            })
        },
        //获取所有影厅数据
        getCinemaTing(constext, obj) {
            delete obj.type
            axios.post(IP + '/getCinemaTing', obj).then((user) => {
                constext.commit({
                    type: 'initial',
                    cinemaTing: user.data
                })
            })
        },
        //添加数据进匹配
        addmacth(constext, obj) {
            delete obj.type
            let searchClass = obj.obj.searchClass
            let text = obj.obj.text
            delete obj.obj.text
            delete obj.obj.searchClass
            axios.post(IP + '/addmacth', obj).then((user) => {
                constext.dispatch({
                    type: 'getMarchData',
                    page: constext.state.curpage,
                    rows: constext.state.rows,
                    // text,
                    // searchClass
                })
            })
        },
        //修改匹配里的数据
        amendMacth(constext, obj) {
            delete obj.type
            let searchClass = obj.obj.searchClass
            let text = obj.obj.text
            delete obj.obj.text
            delete obj.obj.searchClass
            console.log(obj)
            axios.post(IP + '/amendMacth', obj).then((user) => {
                constext.dispatch({
                    type: 'getMarchData',
                    page: constext.state.curpage,
                    rows: constext.state.rows,
                    // text,
                    // searchClass
                })
            })
        },
        //删除匹配数据
        deleteData(constext, obj) {
            delete obj.type
            axios.post(IP + '/deleteData', obj).then((user) => {
                constext.dispatch({
                    type: 'getMarchData',
                    page: constext.state.curpage,
                    rows: constext.state.rows,
                    // text: obj.text,
                    // searchClass: obj.searchClass
                })
            })
        },

        //获取搜索数据
        calssSearch(constext, obj) {
            delete obj.type
            console.log(obj)
            axios.post(IP + '/calssSearch', obj).then((user) => {
                constext.commit({
                    type: 'initial',
                    macthData: user.data
                })
            })
        },

        // // 获取对应推荐歌单的信息+歌曲
        // getSongList(constext, obj) {
        //     delete obj.type
        //     axios.post(IP + 'getSongList', obj).then((user) => {
        //         constext.commit({
        //             type: 'initial',
        //             songList: user.data
        //         })
        //     })
        // },

    }
})