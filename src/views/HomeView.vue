<template>
<div class="Home">
  <div class="text">2048</div>
  <div class="top">当前用户：{{username}}</div>
  <div class="top">当前得分：{{score}}
     <img :src="avatar" @click.stop="uploadHeadImg"/>
  </div>
  <div @click="update">上传</div>
  <game-container></game-container>
</div>
  
</template>
<script>
import axios from 'axios';
import qs from 'qs'
import gameContainer from '../components/gameContainer.vue'
import {mapState} from'vuex'
export default {
  components:{
    gameContainer
  },
  computed:{
    ...mapState(['score','userName','avatar'])
  },
  mounted(){
    this.name()
  },
  data(){ 
    return{
      userName:'',
    }
  },
  methods:{
    name(){
      this.username=localStorage.getItem('userName')
    },
    update(){
      var that =this
      this.userName=localStorage.getItem('userName')
      if(this.userName){
         axios({
                    url:`/API/update/`+that.userName+'/'+that.score, //后端的接口地址                    	
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
                  that.$router.push('/rank')
                })
      }else{
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.text {
        font-size: 20px;
        font-weight: 600;
      }
.home{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>