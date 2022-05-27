
<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" >
            <el-input  v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
export default {
   data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass:'',
                    name:"",
                    exist:false,
                    admin:[],
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],

                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            search(){
                  var that = this
                 axios({
                    url:`/API/search/`, //后端的接口地址                    	
                    method:"get",
                    transformRequest:[
                        function(data){
                            data = qs.stringify(data);
                            return data;
                        },
                    ],
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                    dataType:"json",
                })
                .then((res) => { 
                     for(var i=0;i<res.data.msg.length;i++){
                         console.log(res.data.msg[i].userName===that.$data.ruleForm.name)
                        if(res.data.msg[i].userName===that.$data.ruleForm.name){
                            that.$data.ruleForm.exist=true
                            break
                        }
                    }
                     if(!that.$data.ruleForm.exist){
                        console.log("用户不存在");
                    }else{
                        axios({
                        url:`/API/login/`+that.$data.ruleForm.name, //后端的接口地址                    	
                        method:"get",
                        transformRequest:[
                            function(data){
                                data = qs.stringify(data);
                                return data;
                            },
                        ],
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                        },
                        dataType:"json",
                        })
                        .then((res) => {
                        console.log("连接成功");//这里打印出来是为了更直观的看到连接成功了
                        if(that.$data.ruleForm.pass==res.data.msg[0].password){
                            if(res.data.msg[0].isAdmin == 1){
                                that.$router.push('/manage')
                            }else{
                                that.$router.push('/rank')
                            
                            }
                            that.$store.commit('setUserName',that.$data.ruleForm.name)
                            console.log(that.$store.state.userName)
                        }else{
                            console.log("密码错误")
                        }

                        })
                        .catch(function(error){
                        
                        });
                    }
                })
                .catch(function(error){
                    console.log(error);
                });
            },

            async login(){
                
                await this.search()                   
            }   
        }
}
</script>