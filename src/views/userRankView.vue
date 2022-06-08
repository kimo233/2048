<template>
<div class="text">排行榜</div>
    <el-table
      :data="arr"
      style="width: 100%">
       <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bestGoal"
        label="成绩">
      </el-table-column>
    </el-table>
    <el-button @click="save">存到本地</el-button>
    <el-button @click="play">游玩2048</el-button>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
export default {
    data(){
        return {
            arr:[]
        }
    },
methods:{
       getdata(){
           var that=this
          console.log('函数执行了');
                axios({
                    url:`/API/getUser`, //后端的接口地址                    	
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
                    console.log(res); //res是后端返回来的数据，如果连接成功，则把res打印出来
                    for(var i=0;i<res.data.msg.length;i++){
                        that.$data.arr.push(res.data.msg[i])
                    }
                    console.log(that.$data.arr)
                })
                .catch(function(error){
                    console.log("连接失败");
                    console.log(error); //如果连接失败，则抛出错误的信息
                });
      },
      save(){
          localStorage.rank=JSON.stringify(this.arr)
          console.log(localStorage.rank)
      },
      play(){
          this.$router.push('/')
      }
  },
  created(){
      this.getdata();
  }
}
</script>
<style lang="less" scoped>
.text {
        font-size: 20px;
        font-weight: 600;
      }
</style>