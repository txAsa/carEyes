<template>
    <div>
        <el-container class='outbox'>
            <el-header>
                <div>
                    <img src="../../assets/title.png" alt="">
                </div>
                <div>
                    猫眼App后台管理
                </div>
                <div v-if='acc==""'>请登录</div>
                <div v-else>{{acc}},欢迎您,
                    <label @click='exit'>安全退出</label>
                </div>
            </el-header>
            <el-container>
                <el-aside width="150px">
                    <el-col :span="24">
                        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#4e96df" text-color="#fff"
                            active-text-color="#ffd04b">
                            <el-menu-item index="1">
                                <i class="tianxu iss-dianyingziyuan" style="font-size:30px"></i>
                                <router-link to="/Appmaoyan/movies" class='ahref'>
                                    电影管理
                                </router-link>
                            </el-menu-item>


                            <el-menu-item index="2">
                                <i class="tianxu iss-yuanxianxinpian" style="font-size:30px"></i>
                                <router-link to="/Appmaoyan/macth_manager" class='ahref'>
                                    院线匹配
                                </router-link>
                            </el-menu-item>


                            <el-menu-item index="3">
                                <i class="tianxu iss-yingyuanguanli" style="font-size:30px"></i>
                                <router-link to="/Appmaoyan/modules" class='ahref'>
                                    影院管理
                                </router-link>
                            </el-menu-item>

                            <el-menu-item index="4">
                                <i class="tianxu iss-weibiaoti--" style="font-size:30px"></i>
                                <router-link to="/Appmaoyan/hot_movies" class='ahref'>
                                    热映电影
                                </router-link>
                            </el-menu-item>

                            <el-menu-item index="5">
                                <i class="tianxu iss-hudongjiadaibo" style="font-size:30px"></i>
                                <router-link to="/Appmaoyan/comingmovies" class='ahref'>
                                    待映电影
                                </router-link>
                            </el-menu-item>

                            <!-- <el-menu-item index="6">
                                <i class="el-icon-menu"></i>
                                <router-link to="/Appmaoyan/user">
                                    我的猫眼
                                </router-link>
                            </el-menu-item> -->

                            <el-menu-item index="7">
                                <i class="tianxu iss-yonghuguanli" style="font-size:30px"></i>
                                <router-link to="/Appmaoyan/usermanager" class='ahref'>
                                    用户管理
                                </router-link>
                            </el-menu-item>
                        </el-menu>

                    </el-col>

                </el-aside>
                <el-main style="padding:0">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>您确定需要退出？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="reall">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                acc: ''
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            //管理员退出
            exit() {
                this.dialogVisible = true
            },
            // 确认退出
            reall() {
                sessionStorage.acc = ""
                this.dialogVisible = false
                this.$router.push('/');
            }
        },
        created() {
            if (sessionStorage.acc) {
                this.acc = sessionStorage.acc
            } else {
                this.acc = ''
            }
        }
    }

</script>

<style scoped>
    .ahref {
        text-decoration: none;
        color: white
    }

    img {
        width: 50px;
    }

    .outbox {
        height: 100vh;
    }

    .el-menu-item {
        min-width: 0;
        height: 40px;
        line-height: 40px
    }

    .el-menu {
        border: none;
    }

    .el-header {
        background-color: #3a3a38;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center
    }

    .el-aside {
        background-color: #4e96df;
        color: #333;
        text-align: center;
        /* line-height: 200px; */
        overflow: auto;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }

    body>.el-container {
        margin-bottom: 40px;

    }

    /* body {
        background: cadetblue
    } */
</style>