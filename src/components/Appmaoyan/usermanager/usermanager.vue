<template>
    <div class='out'>
        <h3 class='manger_user'>用户管理</h3>
        <div>
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="用户名" value="acc"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click='clickfind'></el-button>
            </el-input>
            <el-button type="primary" @click="clickqingk">清空</el-button>
            <el-button type="primary" @click="dialogFormVisible = true">新增信息</el-button>

            <!-- 新增用户 -->
            <el-dialog title="新增用户" :visible.sync="dialogFormVisible" class='addxx'>
                <el-form :model="form">
                    <el-form-item label="用户" :label-width="formLabelWidth" class="mangeruser">
                        <el-input v-model="form.acc" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth" class="mangeruser">
                        <el-input v-model="form.pwd" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="clickadd">确 定</el-button>
                </div>
            </el-dialog>
        </div>


        <!-- 主页面 -->
        <el-table ref="multipleTable" :data="user" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="acc" label="用户名" width="400">
            </el-table-column>
            <el-table-column prop="pwd" label="密码" width="400">
            </el-table-column>
            <el-table-column label="操作" className='manager_cz'>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deletRow(scope.$index, user)">删除</el-button>

                    <!-- 修改用户 -->
                    <el-dialog title="修改学生" :visible.sync="dialogFormVisible1" class='addxx'>
                        <el-form :model="form">
                            <el-form-item label="用户" :label-width="formLabelWidth" class="mangeruser">
                                <el-input v-model="form1.acc" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" :label-width="formLabelWidth" class="mangeruser">
                                <el-input v-model="form1.pwd" auto-complete="off"></el-input>
                            </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                            <el-button type="primary" @click='clickupdata'>确 定</el-button>
                        </div>
                    </el-dialog>

                </template>
            </el-table-column>
        </el-table>
        <div>
            <!-- 分页 -->
            <div class="block">
                <el-pagination background layout="prev, pager, next" :total="maxpage*10" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <!-- @next-click='butclick' @prev-click='topclick' -->
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
                dialogFormVisible1: false,
                form: {
                    acc: '',
                    pwd: ''
                },
                form1: {
                    acc: '',
                    pwd: '',
                    _id: ''
                },
                formLabelWidth: '120px',
                input5: '',
                select: '',
                isSrearch: false,
                val: 0,
                rows: 10,
                sreach: false
            }
        },
        // 增加用户数据
        methods: {
            handleCurrentChange(val) {
                this.val = val;
                // 查看是什么搜索状态还是原有状态
                this.changmv(val, this.rows)
            },
            // 查看是什么搜索状态还是原有状态
            changmv(page, rows) {
                console.log(page)
                console.log(rows)
                if (this.sreach) {
                    this.$store.dispatch({
                        type: 'manager_find',
                        change: this.select,
                        empselect: this.input5,
                        page,
                        rows
                    })
                } else {
                    this.$store.dispatch({
                        type: 'manager_getst',
                        change: this.select,
                        empselect: this.input5,
                        page,
                        rows
                    })
                }
            },

            // 点击上一页
            // topclick() {
            //     if (this.curpage - 1 > 0) {
            //         this.refesh(this.curpage - 1, 10)
            //     }
            // },
            // // 点击下一页
            // butclick() {
            //     if (this.curpage + 1 <= this.maxpage) {
            //         this.refesh(this.curpage + 1, 10)
            //     }
            // },
            // 用于提交action
            refesh(page, rows) {
                this.$store.dispatch({
                    type: 'manager_getst',
                    page,
                    rows
                })
            },
            // 增加用户
            clickadd() {
                this.$store.dispatch({
                    type: 'manager_add',
                    worker: this.form,
                })
                this.refesh(this.curpage, 10)
                this.dialogFormVisible = false;

            },
            // 删除用户数据
            deletRow(index, rows) {

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch({
                        type: 'manager_del',
                        delstu: rows[index]._id
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
                })


            },
            // 修改的弹出框出来
            handleDelete(index, rows) {
                this.dialogFormVisible1 = true;
                this.form1.acc = rows.acc,
                    this.form1.pwd = rows.pwd,
                    this.form1._id = rows._id
            },
            // 修改数据信息
            clickupdata() {
                this.$store.dispatch({
                    type: 'manager_update',
                    workers: this.form1
                })
                this.dialogFormVisible1 = false

            },
            // 搜索数据
            clickfind() {
                this.isSrearch = true;
                this.$store.dispatch({
                    type: 'manager_find',
                    change: this.select,
                    empselect: this.input5,
                    page: 1,
                    rows: 10
                })
            },
            // 清空
            clickqingk() {
                this.refesh(this.curpage, 10)
                this.input5 = '';
            }

        },
        // 页面初始化
        created() {
            this.$store.dispatch({
                type: 'manager_getst',
                page: 1,
                rows: 10
            })
        },

        computed: {
            user() {
                return this.$store.state.usermanager.user
            },
            // 单前页
            curpage() {
                return this.$store.state.usermanager.curpage
            },
            // 最大页
            maxpage() {
                return this.$store.state.usermanager.maxpage
            }
        }
    }
</script>
<style scoped>
    .input-with-select {
        width: 500px;
        margin-bottom: 10px;
    }

    .addxx {
        width: 800px;
        height: 800px;
        margin: 50px auto
    }

    .manger_user {
        margin-top: 5px;
        margin-bottom: 5px;
        color: rgb(136, 136, 240)
    }

    .mangeruser {

        margin-right: 60px;

    }

    .block {
        text-align: center
    }

    .dialog-footer {
        text-align: center
    }

    .el-select {
        width: 130px;
    }

    .el-input-group__prepend {
        background-color: #fff;
    }

    .out {
        margin-left: 15px
    }
</style>