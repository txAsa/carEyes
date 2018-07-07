<template>
    <div class="match_main">
        <!-- 标题 -->
        <h3>电影匹配</h3>
        <!-- 头部 -->
        <div class="header">
            <el-input placeholder="请输入内容    日期（月-日）" v-model="input5" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="电影名" value="movies"></el-option>
                    <el-option label="影院" value="cinema"></el-option>
                    <el-option label="日期" value="time"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click='clickSearch'></el-button>
            </el-input>
            <el-button type="primary" @click='clean' class="clean">清空</el-button>
            <!-- <el-button type="primary" @click='addmacth'>新增</el-button> -->
            <el-button type="primary" @click="dialogVisible = true">新增</el-button>

            <!-- 添加弹框 -->
            <el-dialog title="添加" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
                <div class="addContainer">
                    <div>
                        <span>电影名称</span>
                        <el-select v-model="movie_name" filterable placeholder="请选择" v-on:change="changeMovies()">
                            <el-option v-for="item in moviesData" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>影院名称</span>
                        <el-select v-model="cinema_name" filterable placeholder="请选择" v-on:change="changeCount()">
                            <el-option v-for="item in cinemaData" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>影厅名称</span>
                        <el-select v-model="ting" filterable placeholder="请选择">
                            <el-option v-for="item in cinemaTing" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>播放时间</span>
                        <el-date-picker v-model="dateOf" type="date" placeholder="选择日期" :picker-options="pickerOptions1" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                    <span class="isAnn">{{ this.uptime }}</span>
                    <div>
                        <span>起始时间</span>
                        <el-time-select placeholder="起始时间" v-on:blur="changeTime()" v-model="startTime" :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '23:30'
                          }">
                        </el-time-select>
                    </div>
                    <div>
                        <span>结束时间</span>
                        <el-input placeholder="结束时间" prefix-icon="el-icon-time" v-model="endTime">
                        </el-input>
                    </div>
                    <div>
                        <span>售票价格</span>
                        <el-input v-model="money" placeholder="请输入内容"></el-input>
                    </div>
                </div>



                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addDetermine">确 定</el-button>
                </span>
            </el-dialog>


            <!-- 修改弹框 -->
            <el-dialog title="修改" :visible.sync="modification" width="50%" :before-close="handleClose">
                <div class="addContainer">
                    <div>
                        <span>电影名称</span>
                        <el-select v-model="movie_name" filterable placeholder="请修改" v-on:change="changeMovies()">
                            <el-option v-for="item in moviesData" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>影院名称</span>
                        <el-select v-model="cinema_name" filterable placeholder="请修改" v-on:change="changeCount()">
                            <el-option v-for="item in cinemaData" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>影厅名称</span>
                        <el-select v-model="ting" filterable placeholder="请修改">
                            <el-option v-for="item in cinemaTing" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>播放时间</span>
                        <el-date-picker v-model="dateOf" type="date" placeholder="选择日期" :picker-options="pickerOptions1" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                    <span class="isAnn">{{ this.uptime }}</span>
                    <div>
                        <span>起始时间</span>
                        <el-time-select placeholder="起始时间" v-on:blur="changeTime()" v-model="startTime" :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '23:30'
                          }">
                        </el-time-select>
                    </div>
                    <div>
                        <span>结束时间</span>
                        <el-input placeholder="结束时间" prefix-icon="el-icon-time" v-model="endTime">
                        </el-input>
                    </div>
                    <div>
                        <span>售票价格</span>
                        <el-input v-model="money" placeholder="请输入内容"></el-input>
                    </div>
                </div>



                <span slot="footer" class="dialog-footer">
                    <el-button @click="modification = false">取 消</el-button>
                    <el-button type="primary" @click="modificationData">确 定</el-button>
                </span>
            </el-dialog>
        </div>

        <!-- 中间表格内容 -->
        <div class="content">
            <template>
                <el-table :data="macthData" style="width: 100%" border>

                    <el-table-column label="播放日期" width="130%">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.dateOf }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="起始时间" width="130%">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" width="130%">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="价格" width="130%">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.money }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="电影名称" width="130%">
                        <template slot-scope="scope">
                            <span>{{ scope.row.movie_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="影院" width="200%">
                        <template slot-scope="scope">
                            <span>{{ scope.row.cinema_name }}（{{ scope.row.address }}）</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="影厅" width="130%">
                        <template slot-scope="scope">
                            <span>{{ scope.row.ting }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                <el-pagination :page-size='rows' layout="prev, pager, next" :total='total' @prev-click='upPage' @next-click='nextPage' @current-change="current">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    },
                },



                input5: '',
                select: '',
                dialogVisible: false,
                modification: false,

                dateOf: '',
                startTime: '',
                endTime: '',
                money: '',
                movie_name: '',
                cinema_name: '',
                ting: '',

                isID: '',                                //修改当前数据的ID
                isTime: '',                             //电影播放时间
                isSearch: false,                        //判断是否是搜索
                uptime: '',                              //电影上映时间
            }
        },


        methods: {
            //点击编辑时执行
            handleEdit(index, row) {
                this.modification = true
                this.dateOf = row.dateOf
                this.startTime = row.startTime
                this.endTime = row.endTime
                this.money = row.money
                this.isID = row._id
            },
            //确定修改
            modificationData() {
                this.modification = false
                let obj = {
                    _id: this.isID,
                    dateOf: this.dateOf,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    money: this.money,
                    // text: this.input,
                    // searchClass: this.select
                }

                if (this.movie_name) {
                    obj.movies = [this.movie_name]
                }

                if (this.cinema_name) {
                    obj.cinema = [this.cinema_name]
                }

                if (this.ting) {
                    obj.cinema_ting = [this.ting]
                }
                // 修改匹配里的数据
                this.$store.dispatch({
                    type: 'amendMacth',
                    obj
                })
                this.dateOf = ''
                this.startTime = ''
                this.endTime = ''
                this.money = ''
                this.movie_name = ''
                this.cinema_name = ''
                this.ting = ''
                this.uptime = ''
                // this.modification = false
            },
            //点击删除时执行
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //删除匹配数据
                    this.$store.dispatch({
                        type: 'deleteData',
                        _id: row._id,
                        // text: this.input,
                        // searchClass: this.select
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //清空数据
            clean() {
                this.input5 = ''
                this.select = ''
                this.isSearch = false
                this.refreshEmps(1, this.rows)
            },
            //搜索
            clickSearch() {
                if (this.input5) {
                    this.isSearch = true
                }
                this.searchEmps(this.curpage, this.rows, this.input5, this.select)
            },
            //增加按钮点击
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => { });
            },
            //确定添加
            addDetermine() {
                this.dialogVisible = false
                let obj = {
                    dateOf: this.dateOf,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    money: this.money,
                    movies: [this.movie_name],
                    cinema: [this.cinema_name],
                    cinema_ting: [this.ting],
                    // text: this.input,
                    // searchClass: this.select
                }
                // 添加数据进匹配
                this.$store.dispatch({
                    type: 'addmacth',
                    obj
                })
                this.dateOf = ''
                this.startTime = ''
                this.endTime = ''
                this.money = ''
                this.movie_name = ''
                this.cinema_name = ''
                this.ting = ''
                this.uptime = ''
                // console.log(this.dateOf)
            },
            //电影发生改变时触发
            changeMovies() {
                for (let i = 0; i < this.moviesData.length; i++) {
                    if (this.moviesData[i].value == this.movie_name) {
                        this.uptime = '*注：该电影于' + this.moviesData[i].movie_uptime + '上映'
                    }
                }
            },
            //影院发生改变时触发
            changeCount() {
                //获取所有影厅数据
                this.$store.dispatch({
                    type: 'getCinemaTing',
                    _id: this.cinema_name
                })
            },
            //选取开始时间得出结束时间
            changeTime() {
                for (let i = 0; i < this.moviesData.length; i++) {
                    if (this.moviesData[i].value == this.movie_name) {
                        let time = Number(this.moviesData[i].time)
                        let hours = Math.floor(time / 60)
                        let minutes = time % 60
                        let arr = this.startTime.split(':')
                        hours = hours + (arr[0] - 0)
                        minutes = minutes + (arr[1] - 0)
                        if (minutes >= 60) {
                            minutes = minutes - 60;
                            hours = hours + 1
                        }
                        if (hours >= 24) {
                            hours = hours - 24
                            if (hours < 10) {
                                hours = '0' + hours
                            }
                        }
                        if (minutes < 10) {
                            minutes = '0' + minutes
                        }
                        this.endTime = hours + ':' + minutes
                    }
                }

            },
            //上一页
            upPage() {
                if (this.isSearch) {
                    this.searchEmps(this.curpage - 1, this.rows, this.input5, this.select)
                } else {
                    this.refreshEmps(this.curpage - 1, this.rows)
                }
            },
            //下一页
            nextPage() {
                if (this.isSearch) {
                    this.searchEmps(this.curpage + 1, this.rows, this.input5, this.select)
                } else {
                    this.refreshEmps(this.curpage + 1, this.rows)
                }
            },
            //跳到点击页
            current(val) {
                if (this.isSearch) {
                    this.searchEmps(val, this.rows, this.input5, this.select)
                } else {
                    this.refreshEmps(val, this.rows)
                }
            },
            //渲染页面
            refreshEmps(page, rows) {
                // 获取已匹配所有数据
                this.$store.dispatch({
                    type: 'getMarchData',
                    page,
                    rows,
                })
            },
            //搜索渲染页面
            searchEmps(page, rows, value, valueClass) {
                this.$store.dispatch({
                    type: 'calssSearch',
                    page,
                    rows,
                    text: value,
                    searchClass: valueClass
                })
            }
        },

        computed: {
            macthData() {
                return this.$store.state.macth.macthData
            },
            moviesData() {
                return this.$store.state.macth.moviesData
            },
            cinemaData() {
                return this.$store.state.macth.cinemaData
            },
            cinemaTing() {
                return this.$store.state.macth.cinemaTing
            },

            count() {
                return this.$store.state.macth.count
            },
            rows() {
                return this.$store.state.macth.rows
            },
            curpage() {
                return this.$store.state.macth.curpage
            },
            total() {
                return this.$store.state.macth.total
            },
        },
        created() {
            this.refreshEmps(this.curpage, this.rows)
            //获取所有电影数据
            this.$store.dispatch({
                type: 'getMovise',
            })
            //获取所有影院数据
            this.$store.dispatch({
                type: 'getCinema',
            })

        }
    }

</script>

<style>
    .match_main {
        padding-left: 15px;
    }

    /* -------------------------------------------------导航部分------------------------------------------------------- */

    .match_main h3 {
        color: rgb(74, 194, 235);
        padding: 10px 0
    }

    .match_main>.header {
        /* background: #E9EEF3; */
        padding: 10px 0;
    }


    /* 导航搜索框部分 */

    .match_main>.header>.el-input {
        width: 500px;
    }

    .match_main .el-select .el-input {
        width: 100px;
    }

    .match_main .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    /* 导航按钮 */

    .match_main .clean {
        margin: 0 5px 0 15px
    }

    /* 增加框 */

    .match_main .addContainer {
        width: 350px;
        margin: auto
    }

    .match_main .addContainer>div {
        margin: 20px 0
    }

    .match_main .addContainer .el-input {
        width: 260px;
    }

    .match_main .block {
        display: flex;
        justify-content: center;
        margin-top: 25px;
    }

    .match_main .isAnn {
        font-size: 12px;
        color: red;
    }
</style>