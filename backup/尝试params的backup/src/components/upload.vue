<template>
<div>
 <img id="preview" v-if="src" :src='src'/>
  <mu-raised-button  id="upload-btn " label="上传图片" class="demo-raised-button" @click="toUpload"/>
   <input id="input" type="file" accept="image/*"  @change="getInfo">
</div>

</template>

<script>
import lrz from 'lrz'
	export default {
    data () {
      return {
         src : '',
      }
    },
    mounted(){
     
    },
    methods:{
      getInfo(e){
         var self = this 
         lrz(e.target.files[0])//图片压缩处理
         .then(function (rst) {
            // 把处理的好的图片给用户看看呗
            self.src = rst.base64;
            console.warn("doneeee")
            self.$emit("upload",rst.file,rst.origin.name)
            return rst;
          })

        /*var self = this
        console.warn(e)
        console.warn("pic size: ", e.target.files[0].size)
        if (window.FileReader) {
              var reader = new FileReader()
        } else {
              alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！")
        }
        //获取文件
        var file = e.target.files[0]
        reader.onload = function(e) {
              //获取图片dom
              var img = document.getElementById("preview")
              //图片路径设置为读取的图片
              self.src = e.target.result
              //console.warn(e.target.result)//是一段base64
          }
        reader.readAsDataURL(file)*/
      },
      toUpload(){
        var input = document.getElementById("input")
        input.click()
      }
    },
    components:{

    },
  }
</script>

<style lang="css" scoped>
#preview{
  width: 100%;
}
input{
  display: none;
}
</style>
