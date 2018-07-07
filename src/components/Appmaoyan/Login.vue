<template>
    <div>
        <div class='titlemao'>猫眼App后台管理系统
            <div class='eng'>Cat's eye App backstage management system</div>
        </div>
        <div class='loginForm'>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
                <div class='loginTitle'>系统登录</div>
                <el-form-item prop="pass">
                    <el-input type="text" v-model="ruleForm2.pass" style="width:300px" placeholder="用户名" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" placeholder="密码" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')" style="width:300px">提交</el-button>
                </el-form-item>
                <div id='waring' v-if='isOK'>密码或用户名错误，请重新输入</div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    // const IP = 'http://192.168.11.155:5000'
    // const IP = 'http://192.168.43.49:5000'
    // const IP = 'http://192.168.11.105:5000'
    const IP = 'http://127.0.0.1:5000'
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输用户名'));
                } else {

                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                isOK: false,
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post(IP + '/login', { acc: this.ruleForm2.pass, pwd: this.ruleForm2.checkPass, findType: "exact" }).then((data) => {
                            if (data.data.length != 0) {
                                sessionStorage.acc = data.data[0].acc
                                this.$router.push('/Appmaoyan');
                            }
                            else {
                                location.reload();
                                this.$router.push('/?isOK');
                            }
                        })

                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            let isOK = window.location.hash.replace('#/?', '')
            if (isOK == 'isOK') {
                this.isOK = true
            }
        }
    }
</script>

<style scoped>
    .loginForm {
        width: 400px;
        height: 300px;
        box-shadow: 0 0 25px #cac6c6;
        border-radius: 5px;
        display: flex;
        margin: 200px auto 0;
        justify-content: center;
        align-items: center;
        background: white;
        position: relative;
    }

    .loginTitle {
        text-align: center;
        margin-bottom: 30px;
        font-size: 24px;
    }

    .titlemao {
        position: absolute;
        top: 100px;
        left: calc( 50% - 180px);
        color: white;
        font-size: 24px;
        text-align: center
    }

    .eng {
        font-size: 16px
    }

    #waring {
        position: absolute;
        top: 260px;
        color: red;
    }
</style>