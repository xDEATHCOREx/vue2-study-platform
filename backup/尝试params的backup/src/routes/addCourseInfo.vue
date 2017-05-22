<template>
<div class="add-course-root">

 <mu-text-field 
  label="课程标题" 
  labelFloat
  v-model.trim="courseName"
  />
  <br/>
  <mu-text-field 
    label="课程描述" 
    labelFloat
    v-model.trim="courseDesc"
    multiLine 
    :rows="3" 
    :rowsMax="6" />
    <br/>
    <upload @upload="uploadPic"></upload>
    <br/>
    <mu-raised-button label="提交" class="demo-raised-button" @click="submit"secondary/>
</div>

</template>

<script>
import lrz from 'lrz'
import upload from '../components/upload.vue'
	export default {
    data () {
      return {
        title:'添加课程',
        courseName :'',
        courseDesc : '',
        coursePic:'',
        coursePicName:''
      }
    },
    mounted(){
     //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
    },
    methods:{
      uploadPic(data,name){
        this.coursePic = data
        this.coursePicName = name
      },
      submit(){
      this.$store.commit('loadingToggle')//转菊花
      var formData = new FormData()
      if(this.coursePic!=''){//若父组件有接收到图片数据
        formData.append("pictureFile", this.coursePic,this.coursePicName)
      }
      formData.append("courseName", this.courseName)
      formData.append("courseDesc", this.courseDesc)
      this.axios({//上传信息接口
              url: '/course/add.action',
              method: 'post',
              data: formData,
              transformRequest: [function (data) {//这里重置http.js中全局的transform
                // Do whatever you want to transform the data
                return data;
              }],
            })
            .then(res=>{
              this.$store.commit('loadingToggle')
              console.warn(res)
              if(res.data.success){              
                //弹出提示
                this.$store.commit('topPopupToggle',"已提交")
              }else{//其他情况
                this.$store.commit('topPopupToggle',res.data.result_msg)
              }
            })
            .catch(err =>{
              this.$store.commit('topPopupToggle',"Error！")
             this.$store.commit('loadingToggle')
              console.warn(err)
            })  
      },
    },
    components:{
      'upload':upload
    },
  }
</script>

<style lang="css" scoped>
.add-course-root{
  text-align: center;
}
</style>
