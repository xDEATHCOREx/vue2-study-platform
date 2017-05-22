<template>
<div class="">
  <mu-dialog :open="open" title="选择学习资源" bodyClass="dialog-body"scrollable>
     <mu-list >
     <mu-list-item 
      v-for="(item,index) in resourceList"
      :title="item.resource.resourceName"  
      :to="{path:getResourceType(item.resource.resType),query:{resourceId:item.resourceId}}">
      <mu-icon slot="left" :value="getResourceIcon(item.resource.resType)"/>
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
      resourceList:''

    }
  },
  watch:{
    open:'isOpen'
  },
  props:['open','courseId'],
  methods: {
    isOpen(val){
      if(val){
        this.getResourceList()
      }
    },
    getResourceIcon(tag){
        switch(tag){
          case '1':
            return 'subscriptions'
          case '2':
            return 'image'
          case '3':
            return 'edit'
        }
      },
      getResourceType(tag){
        switch(tag){
          case '1':
            return '/video'
          case '2':
            return '/picture'
          case '3':
            return '/article'
        }
      },
      getResourceList(){
        //获取课程资源列表
        this.axios.get('/resource/list.action?courseId='+this.courseId)
        .then(res =>{
          console.warn(res.data)
          if(res.data.success){
            this.resourceList = res.data.object
          }else{
            this.$store.commit('topPopupToggle',res.data.result_msg)
          }
        })
        .catch(err=> {
          console.log(err)
        })
      },
    close () {
      this.$emit('closeList')
    },
    /*jumpTo(target){
      document.getElementById('close-btn').click()//模拟点击了关闭按钮
      this.$router.push({ 
        path: ''+target ,
        query:{}
      })
    }*/
  }
}
</script>

<style lang="css" >
.dialog-body{
  padding: 0px 0px 0px 0px!important;
}
</style>
