<template>
    <div class="login-wrap">
        <div class="ms-title">Works管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="admin"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="admin" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
               const self = this;
              self.$router.push('/readme');
              axios({
                    method:'get',
                    url:window.baseURL+"login/"+self.ruleForm.username+"/"+self.ruleForm.password
                })
                    .then(function(response) {
                        const code = response.data.code;
                        if(code == 200){
                            const token = response.data.body;
                            localStorage.setItem('token',token);
                            localStorage.setItem('ms_username',self.ruleForm.username);
                            self.$router.push('/readme');
                        }else {
                            alert("输入的用户名或密码错误");
                            self.$router.push('/login');
                        }
                    });

            }
        }
    }


</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>