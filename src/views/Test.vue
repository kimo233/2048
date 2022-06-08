<template>
    <div class="hello">
    <div class="user-header">
      <input type="file" name="image" accept="image/*" @change='onchangeImgFun'
       class="header-upload-btn user-header-com">
      <img  alt="" :src='imgStr' class="user-header-img user-header-com">
      <p class="tip">图片限制50kb <span class="error">{{errorStr}}</span></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      imgStr: '',
      errorStr: ''
    }
  },
  methods: {
    onchangeImgFun (e) {
      var file = e.target.files[0]
      console.log(file)
      // 获取图片的大小，做大小限制有用
      let imgSize = file.size
      console.log(imgSize)
      var _this = this // this指向问题，所以在外面先定义
      // 比如上传头像限制5M大小，这里获取的大小单位是b
      if (imgSize <= 50 * 1024) {
        // 合格
        _this.errorStr = ''
        console.log('大小合适')
        // 开始渲染选择的图片
        // 本地路径方法 1
        // this.imgStr = window.URL.createObjectURL(e.target.files[0])
        // console.log(window.URL.createObjectURL(e.target.files[0])) // 获取当前文件的信息

        // base64方法 2
        var reader = new FileReader()
        reader.readAsDataURL(file) // 读出 base64
        reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result
          console.log(dataURL)
          localStorage.setItem('pic',dataURL)
          _this.imgStr = dataURL
        }
      } else {
        console.log('大小不合适')
        _this.errorStr = '图片大小超出范围'
      }
    },
    getPic(){
      if(localStorage.getItem('pic')){
        this.imgStr=(localStorage.getItem('pic')).replace(/[\r\n]/g,"")
      }
    }
  },
  mounted(){
    this.getPic()
  }

}
</script>

<style scoped>
.user-header{
  position: relative;
  display: inline-block;
}
.user-header-com{
  width: 144px;
  height: 144px;
  display: inline-block;
}
.header-upload-btn{
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  /* 通过定位把input放在img标签上面，通过不透明度隐藏 */
}
.tip{
  font-size: 14px;
  color: #666;
}
/* error是用于错误提示 */
.error{
  font-size: 12px;
  color: tomato;
  margin-left: 10px;
}
</style>