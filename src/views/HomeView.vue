<template>
<div class="Home">
  <div>当前得分：{{score}}</div>
  <div @click="update">上传</div>
  <game-container></game-container>
</div>
  
</template>
<script>
import gameContainer from '../components/gameContainer.vue'
import {mapState} from'vuex'
export default {
  components:{
    gameContainer
  },
  computed:{
    ...mapState(['score','userName'])
  },
  methods:{
    update(){
      var that =this
      if(this.userName){
         axios({
                    url:`/API/update/`+that.$data.userName+'/'+that.$data.score, //后端的接口地址                    	
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
                  that.$router.push("/rank")
                })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.home{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>