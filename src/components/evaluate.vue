<template>
<div class="">
  <mu-dialog :open="toOpenEvaluate" title="请评价当前学习资源" bodyClass="dialog-body"scrollable>
     <mu-list >
     <mu-list-item title="非常满意" @click="toEvaluate('1')" >
      <mu-icon slot="left" value="subscriptions"/>
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="满意" @click="toEvaluate('2')"  >
      <mu-icon slot="left" value="edit" />
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="一般" @click="toEvaluate('3')" >
      <mu-icon slot="left" value="image" />
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="不满意" @click="toEvaluate('4')" >
      <mu-icon slot="left" value="subscriptions"/>
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="非常不满意" @click="toEvaluate('5')" >
      <mu-icon slot="left" value="edit" />
    </mu-list-item>
  </mu-list>
 
    <mu-flat-button id="close-btn" label="Cancel" slot="actions" primary @click="close"/>
  </mu-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props:['toOpenEvaluate','target','resourceId','courseId'],
  methods: {
    toEvaluate(tag){
      this.$store.commit('loadingToggle')//转菊花
      var formData = new FormData()
      formData.append("resourceId", this.resourceId)
      formData.append("courseId", this.courseId)
      formData.append("judgeType", tag)
      this.axios({//上传信息接口
              url: '/judge/save.action',
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
                this.$store.commit('topPopupToggle',"已评价！")
                this.$store.commit('setEvaluated')
                this.jumpTo()
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
    close () {
      this.$emit('closeEvaluate')
    },
    jumpTo(){
      
     // document.getElementById('close-btn').click()//模拟点击了关闭按钮
      this.$router.push(this.target)
    }
  }
}
</script>

<style lang="css" >
.dialog-body{
  padding: 0px 0px 0px 0px!important;
}
</style>
