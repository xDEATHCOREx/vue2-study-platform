<template>
<div class="">
  <mu-dialog :open="open" title="选择学习资源" bodyClass="dialog-body"scrollable>
     <mu-list >
     <mu-list-item title="5分钟学会前端"  @click="jumpTo('video')">
      <mu-icon slot="left" value="subscriptions"/>
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="关于java的100条知识"  @click="jumpTo('article')">
      <mu-icon slot="left" value="edit" />
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="Vue组件生命周期图解" :to="{path:'/picture'}">
      <mu-icon slot="left" value="image" />
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="苍老师陪你学JS" :to="{path:'/video'}">
      <mu-icon slot="left" value="subscriptions"/>
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="C语言设计基础" :to="{path:'/article'}">
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
      password:'',
      passwordConfirm:'',
      errorText:'',
      equal:false,
    }
  },
  props:['open'],
  methods: {
    close () {
      this.$emit('closeList')
    },
    jumpTo(target){
      document.getElementById('close-btn').click()//模拟点击了关闭按钮
      this.$router.push({ 
        path: ''+target ,
        query:{}
      })
    }
  }
}
</script>

<style lang="css" >
.dialog-body{
  padding: 0px 0px 0px 0px!important;
}
</style>
