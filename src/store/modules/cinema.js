import axios from 'axios'
// const IP = 'http://192.168.43.49:5000'
// const IP = 'http://192.168.11.105:5000'
// const IP = 'http://192.168.11.155:5000'
const IP = 'http://127.0.0.1:5000'
export default {
    state: {
        cinema: [],//所有影院
        // alltingID: [],//对应的影院的所有影厅的id
        allcinemating: [],//使用联合查询找到影院对应的所有影厅
        maxPage: 0,
        // idOJK:false
    },
    mutations: {
        cinema_allhouse(state, obj) {
            state.cinema = obj.data
            state.maxPage = obj.maxPage
        },
        // cinema_alltingID(state, obj) {
        //     state.alltingID.push(obj.data)
        // },
        cinema_allsameting(state, obj) {
            state.allcinemating = obj.data
        },


    },
    actions: {
        // 所有影院请求
        cinema_all(state, obj) {
            axios.post(IP + '/cinema/cinemaAll', {
                page: obj.page, rows: obj.rows
            }).then((data) => {
                state.commit({
                    type: 'cinema_allhouse',
                    data: data.data.rows,
                    maxPage: data.data.maxpage
                })
            })
        },
        // 搜索
        cinema_search(state, obj) {
            axios.post(IP + '/cinema/search', {
                [obj.select]: obj.data,
                page: obj.page,
                rows: obj.rows
            }).then((data) => {
                state.commit({
                    type: 'cinema_allhouse',
                    data: data.data.rows,
                    maxPage: data.data.maxpage
                })
                // console.log(data.data.maxPage)
            })
        },
        // 保存座位
        cinema_savechair(state, obj) {
            //保存影院
            let idd;
            axios.post(IP + '/cinema/save_cinema', {
                name: obj.name,
                address: obj.address,
                phone: obj.phone,
                www: obj.www,
                special: JSON.stringify(obj.special)
            }).then((cinema) => {
                idd = cinema.data
                console.log('成功')
            })
            for (let i = 0; i < obj.data.length; i++) {
                console.log(obj.data[i].chair, '这是是')
                axios.post(IP + '/cinema/cinemachairID', {
                    chair: JSON.stringify(obj.data[i].chair)
                }).then((data) => {
                    //返回的座位id给影厅
                    axios.post(IP + '/cinema/cinema_tingID', {
                        tingname: obj.data[i].tingname, cinema_chair: JSON.stringify([data.data])
                    }).then((tingID) => {
                        axios.post(IP + '/cinema/save_cinemaid', {
                            _id: idd,
                            cinema_ting: tingID.data,
                            isPush: 'true'
                        }).then((tingID) => {
                            console.log('chengd')
                            state.dispatch({
                                type: 'cinema_all',
                                page: 1,
                                rows: 10
                            })
                        })
                    })
                })
            }
        },
        //删除影院（不能及时刷新）
        cinema_del(state, obj) {
            axios.post(IP + '/cinema/cinemaDel', {
                _id: obj.id
            }).then((data) => {
                console.log('删除成功');
                state.dispatch({
                    type: 'cinema_all',
                    page: obj.page,
                    rows: obj.rows
                })
            })
        },
        // 翻页没做好......................................
        info_getEmps(state, obj) {
            axios.get(IP + '/page', {
                params: {
                    page: obj.page,
                    rows: obj.rows
                }
            }).then((emps) => {
                state.commit({
                    type: 'changeemp',
                    data: emps.data
                })
            })
        },
        // 编辑的时候显示对应的影厅
        cinema_sameting(state, obj) {
            axios.post(IP + '/cinema/cinematingmes', {
                _id: obj.id,
                submitType: "findJoin",
                ref: ["cinema_ting", '']
            }).then((data) => {
                console.log(data.data.cinema_ting, '开始')
                state.commit({
                    type: 'cinema_allsameting',
                    data: data.data.cinema_ting
                })
            })
        },
        //修改更新影厅座位信息
        cinema_updatatingname(state, obj) {
            axios.post(IP + '/cinema/tingnameupdata', {
                _id: obj.id,
                tingname: obj.tingname
            }).then((data) => {
                console.log('修改厅名成功')
            })
        },
        //更新座位信息
        cinema_updatachair(state, obj) {
            axios.post(IP + '/cinema/chairupdata', {
                _id: obj.id,
                chair: JSON.stringify(obj.newchair)
            }).then((data) => {
                console.log('座位修改成功')
            })
        },
        //更新影院信息
        cinema_updatacinema(state, obj) {
            axios.post(IP + '/cinema/updatacinema', {
                _id: obj.id,
                name: obj.name,
                address: obj.address,
                phone: obj.phone,
                www: obj.www,
                special: JSON.stringify(obj.special)
            }).then((data) => {
                // console.log('影院信息修改成功')
                state.dispatch({
                    type: 'cinema_all',
                    page: 1,
                    rows: 10
                })
            })
        },
        //用来保存在修改里面新增的影厅
        cinema_updataAddArr(state, obj) {
            console.log(obj.data)
            for (let j = 0; j < obj.data.length; j++) {
                axios.post(IP + '/cinema/cinemachairID', {
                    chair: JSON.stringify(obj.data[j].chair)
                }).then((data) => {
                    axios.post(IP + '/cinema/cinema_tingID', {
                        tingname: obj.data[j].tingname, cinema_chair: JSON.stringify([data.data])
                    }).then((tingID) => {
                        axios.post(IP + '/cinema/save_cinemaid', {
                            _id: obj.id,
                            cinema_ting: tingID.data,
                            isPush: 'true'
                        }).then((date) => {
                            console.log('ok')

                        })
                    })
                })
            }
        },
    }
}

