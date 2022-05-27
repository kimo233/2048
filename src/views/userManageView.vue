<template>
    <el-table
    :data="user"
    border
    style="width: 100%">
     <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="bestGoal"
      label="成绩"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template  v-slot="scope" >
        <el-link @click="delete1(scope.$index)" type="danger">删除</el-link>
        <el-link @click="change(scope.$index)" type="primary">编辑</el-link>
      </template>
    </el-table-column>
  </el-table>
  <el-button @click="addUser;dialogVisible2 = true">添加用户</el-button>


  <el-dialog
  title="修改用户"
  v-model="dialogVisible"
  width="60%">
  
<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="新名称">
    <el-input v-model="newName"></el-input>
  </el-form-item>
  <el-form-item label="新密码">
    <el-input v-model="newPass"></el-input>
  </el-form-item>

</el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false;confirm()" >确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="添加用户"
  v-model="dialogVisible2"
  width="60%">
  
<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="名称">
    <el-input v-model="name"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="pass"></el-input>
  </el-form-item>

</el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible2 = false;addUser()" >确 定</el-button>
  </span>
</el-dialog>

</template>
<script>
import axios from 'axios';
import qs from 'qs';
export default {
    data(){
        return{
            user:[],
            newName:'',
            newPass:'',
            name:'',
            pass:'',
            dialogVisible:false,
            currentId:0,
            dialogVisible2:false,
        }
    },
    methods:{
        delete1(id){
            var that =this
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(that)
                console.log(that.$data.user[id].userName)
            axios({
                    
                    url:`/API/delete/`+that.$data.user[id].userName, //后端的接口地址                    	
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
                     that.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                that.$router.go(0)
                })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                    });          
                });
             
        },
        change(id){
          this.dialogVisible=true
          this.currentId=id
          console.log(this.currentId)
        },
        confirm(){
          var that=this
          axios({
                    
                    url:`/API/updateInfo/`+that.$data.user[that.$data.currentId].userName+"/"+that.$data.newName+"/"+that.$data.newPass, //后端的接口地址                    	
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
                .then((res) => {console.log('修改成功') })
        },
        getUser(){
            var that =this
             axios({
                    url:`/API/search`, //后端的接口地址                    	
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
                    console.log(res.data.msg)
                  for(var i=0;i<res.data.msg.length;i++){
                        that.$data.user.push(res.data.msg[i])
                }
                })
        },
        addUser(){
          var that=this
          axios({
                    
                    url:`/API/add/`+that.$data.name+"/"+that.$data.pass, //后端的接口地址                    	
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
                .then((res) => {console.log('添加成功') })
        }
    },
    created(){
      this.getUser();
  }
}
</script>
<style lang="less" scoped>

</style>