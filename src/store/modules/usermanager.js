import axios from "axios";
// const IP = 'http://192.168.43.151:5000/'
// const IP = 'http://192.168.11.105:5000/'
// const IP = 'http://192.168.43.49:5000/'
const IP = 'http://127.0.0.1:5000/'
export default {
    state: {
        user: [],
        curpage: 1,
        maxpage: 0,
    },
    // mutations
    mutations: {
        // 获取数据库里的数据
        manager_textboder(state, obj) {
            state.user = obj.data.rows
            // 获取当前页数
            state.curpage = obj.data.curpage;
            // 获取最大页数
            state.maxpage = obj.data.maxpage;
        },
    },
    // action
    actions: {
        // 获取数据库里的数据
        manager_getst(contex, obj) {
            axios.get(IP + 'usermanager/manages_find', {
                params: {
                    change: obj.change, empselect: obj.empselect
                    , page: obj.page, rows: obj.rows
                }
            }).then(function (res) {
                contex.commit({
                    type: 'manager_textboder',
                    data: res.data
                })
            })
        },
        // 增加
        manager_add(contex, obj) {
            axios.get(IP + 'usermanager/managers_add', { params: obj.worker }).then(function (res) {
                console.log('新增成功')
                // contex.dispatch({
                //     type: 'manager_getst',
                // })
            })
        },
        // 删除
        manager_del(contex, obj) {
            axios.get(IP + 'usermanager/managers_del', { params: { _id: obj.delstu } }).then(function (res) {
                contex.dispatch({
                    type: 'manager_getst',
                    page: context.state.curpage,
                    rows: 10
                })
            })
        },
        // 修改数据信息
        manager_update(contex, obj) {
            axios.get(IP + 'usermanager/managers_up', { params: obj.workers }).then(function (res) {
                contex.dispatch({
                    type: 'manager_getst',
                })
            })
        },
        // 查询数据
        manager_find(contex, obj) {
            axios.get(IP + 'usermanager/managers_find', {
                params: {
                    change: obj.change, empselect: obj.empselect
                    , page: obj.page, rows: obj.rows
                }
            }).then(function (res) {
                contex.commit({
                    type: 'manager_textboder',
                    data: res.data
                })
            })
        },

    }
}