<template>
    <div class='out'>

        <h3 class='manger_user'>待映电影</h3>
        <div>
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="电影名" value="1"></el-option>
                    <el-option label="评分" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click='clickfind1'></el-button>
            </el-input>
            <el-button type="primary" @click='hot_qk1'>清空</el-button>
            <el-button type="primary" @click="hotmovies_addmv1">新增电影</el-button>
            <!-- dialogFormVisible = true -->

            <!-- 新增rey电影 -->
            <el-dialog title="新增热映电影" :visible.sync="dialogFormVisible" class='addxx' style="width: 100%">

                <el-table ref="multipleTable" :data="movies" tooltip-effect="dark" class='movies_from' @selection-change="handleSelectionChange1">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="movie_name" label="电影名" width="150">
                    </el-table-column>
                    <el-table-column prop="en_name" label="电影英文名" width='250'>
                    </el-table-column>
                    <el-table-column prop="movie_type" label="类型1" width="150">
                    </el-table-column>
                    <el-table-column prop="effect" label="类型2" width="150">
                    </el-table-column>
                    <el-table-column prop="movie_soc" label="评分" width="150">
                    </el-table-column>
                    <!-- <el-table-column prop="actor" label="演职人员" width="300">
                    </el-table-column> -->
                    <!-- <el-table-column prop="director" label="导演" width="150">
                    </el-table-column> -->
                    <el-table-column prop="like" label="想看" width="150">
                    </el-table-column>
                    <el-table-column prop="area" label="产地" width="150">
                    </el-table-column>
                    <el-table-column prop="year" label="年份" width="150">
                    </el-table-column>
                    <el-table-column prop="movie_time" label="时长" width="150">
                    </el-table-column>
                    <el-table-column prop="movie_uptime" label="上映时间" width="150">
                    </el-table-column>
                    <el-table-column prop="box_office_Y" label="昨日票房" width="150">
                    </el-table-column>
                    <el-table-column prop="box_office_week" label="首周票房" width="150">
                    </el-table-column>
                    <el-table-column prop="box_office_all" label="累计票房" width="150">
                    </el-table-column>
                    <el-table-column prop="info" label="简介" width="1000">
                    </el-table-column>
                    <el-table-column prop="movie_img" label="电影图片" width="150">
                    </el-table-column>
                    <!-- <el-table-column prop="director_img" label="导演" width="150">
                    </el-table-column> -->
                    <!-- <el-table-column prop="actor_img" label="演员" width="600">
                    </el-table-column> -->
                    <el-table-column prop="img_box" label="相关图片" width="1000">
                    </el-table-column>
                    <el-table-column prop="video" label="相关视频" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <!-- 所有电影进行翻页 -->
                <div class="block">
                    <el-pagination background layout="prev, pager, next" :total="maxpage*10" @current-change="handleCurrentChange1">
                    </el-pagination>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="hotclickadd1">确 定</el-button>
                </div>

            </el-dialog>
        </div>
        <el-table ref="multipleTable" :data="hotmovies" tooltip-effect="dark">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="movie_name" label="电影名" width="150">
            </el-table-column>
            <el-table-column prop="en_name" label="电影英文名" width='250'>
            </el-table-column>
            <el-table-column prop="movie_type" label="类型1" width="150">
            </el-table-column>
            <el-table-column prop="effect" label="类型2" width="150">
            </el-table-column>
            <el-table-column prop="movie_soc" label="评分" width="150">
            </el-table-column>
            <!-- <el-table-column prop="actor" label="演职人员" width="300">
            </el-table-column>
            <el-table-column prop="director" label="导演" width="150">
            </el-table-column> -->
            <el-table-column prop="like" label="想看" width="150">
            </el-table-column>
            <el-table-column prop="area" label="产地" width="150">
            </el-table-column>
            <el-table-column prop="year" label="年份" width="150">
            </el-table-column>
            <el-table-column prop="movie_time" label="时长" width="150">
            </el-table-column>
            <el-table-column prop="movie_uptime" label="上映时间" width="150">
            </el-table-column>
            <el-table-column prop="box_office_Y" label="昨日票房" width="150">
            </el-table-column>
            <el-table-column prop="box_office_week" label="首周票房" width="150">
            </el-table-column>
            <el-table-column prop="box_office_all" label="累计票房" width="150">
            </el-table-column>
            <el-table-column prop="info" label="简介" width="1000">
            </el-table-column>
            <el-table-column prop="movie_img" label="电影图片" width="150">
            </el-table-column>
            <!-- <el-table-column prop="director_img" label="导演" width="150">
            </el-table-column>
            <el-table-column prop="actor_img" label="演员" width="600">
            </el-table-column> -->
            <el-table-column prop="img_box" label="相关图片" width="1000">
            </el-table-column>
            <el-table-column prop="video" label="相关视频" show-overflow-tooltip>
            </el-table-column>

            <el-table-column label="操作" className='manager_cz'>
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="deletRow1(scope.$index, hotmovies)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
            <el-pagination background layout="prev, pager, next" :total="maxpage*10" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                prev: this.topclick,
                next: this.butclick,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                input5: '',
                select: '',
                form: {
                    acc: '',
                    pwd: ''
                },
                multipleSelection: [],
                isSrearch: false,
                val: 0,
                rows: 10,
                srearch: false
            }
        },
        // 增加热映电影
        methods: {
            // ------------------热映电影进行翻页----------------------
            handleCurrentChange(val) {
                this.val = val;
                this.changmv(val, this.rows)
            },
            changmv(page, rows) {
                this.$store.dispatch({
                    type: 'comingmovie_find1',
                    page,
                    rows
                })
            },
            //----------------------全部电影进行翻页------------------------ 
            handleCurrentChange1(val) {
                this.val = val;
                this.changmv1(val, this.rows)

            },
            changmv1(page, rows) {
                this.$store.dispatch({
                    type: 'comingmovie_getst',
                    page,
                    rows
                })
            },
            // 用于提交action
            refesh(page, rows) {
                this.$store.dispatch({
                    type: 'comingmovie_getst',
                    page,
                    rows
                })
            },
            hotmovies_addmv1() {
                this.dialogFormVisible = true;
                this.$store.dispatch({
                    type: 'comingmovie_getst',
                    page: 1,
                    rows: 10
                })
            },
            // 点击增加到热映电影
            hotclickadd1() {
                console.log(this.multipleSelection[0]._id)
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    console.log(this.multipleSelection[i]._id)
                    this.$store.dispatch({
                        type: 'comingmovie_add',
                        worker: JSON.stringify([this.multipleSelection[i]._id])
                    })
                    this.dialogFormVisible = false;
                    this.$store.dispatch({
                        type: 'comingmovie_find1',
                        page: 1,
                        rows: 10
                    })
                }
            },
            // 选择增加的电影
            handleSelectionChange1(val) {
                this.multipleSelection = val;
            },
            // 删除
            deletRow1(index, rows) {
                console.log(rows[index]._id)
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch({
                        type: 'comingmovie_del',
                        hotdel: JSON.stringify([rows[index]._id])
                    })
                    rows.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 搜索
            clickfind1() {
                if (this.input5 == '' || this.select == '') {
                    this.$store.dispatch({
                        type: 'comingmovie_find1',
                        page,
                        rows
                    })
                }
                if (this.input5 != '' && this.select != '') {
                    let obj = { type: 'hot_test2' }
                    if (this.select == 1) {
                        obj.key = 'movie_name'
                        obj.value = this.input5
                    }
                    if (this.select == 2) {
                        obj.key = 'movie_soc'
                        obj.value = this.input5
                    }
                    this.$store.commit(obj)

                }
            },
            // 清空
            hot_qk1() {
                this.input5 = ''
                this.$store.dispatch({
                    type: 'comingmovie_find1',
                    page: 1,
                    rows: 10
                })
            }
        },
        //页面初始化
        created() {
            // 初始化热映
            this.$store.dispatch({
                type: 'comingmovie_find1',
                page: 1,
                rows: 10
            })
            //初始化全部电影
            this.$store.dispatch({
                type: 'comingmovie_getst',
                page: 1,
                rows: 10
            })
        },
        computed: {
            // 热映电影
            hotmovies() {
                return this.$store.state.comingmovies.comingmovies1
            },
            // 全部电影
            movies() {
                return this.$store.state.comingmovies.movies
            },
            // 单前页
            curpage() {
                return this.$store.state.comingmovies.curpage
            },
            // 最大页
            maxpage() {
                return this.$store.state.comingmovies.maxpage
            }
        }
    }
</script>
<style scoped>
    .input-with-select {
        width: 500px;
        margin-bottom: 10px;
    }

    .manger_user {
        margin-top: 5px;
        margin-bottom: 5px;
        color: rgb(136, 136, 240)
    }

    .movies_from {
        height: 300px;
        width: 800px;
        overflow: auto;
    }

    .el-select {
        width: 130px;
    }

    .el-input {
        width: 500px;
    }

    .el-input-group__prepend {
        background-color: #fff;
    }

    .block {
        text-align: center
    }

    .out {
        margin-left: 15px
    }
</style>