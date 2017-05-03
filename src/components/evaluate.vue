<template>
<div class="">
  <mu-dialog :open="toOpenEvaluate" title="请评价学习资源" bodyClass="dialog-body"scrollable>
     <mu-list >
     <mu-list-item title="非常满意" @click="jumpTo" >
      <mu-icon slot="left" value="subscriptions"/>
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="满意"  >
      <mu-icon slot="left" value="edit" />
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="一般" >
      <mu-icon slot="left" value="image" />
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="不满意" >
      <mu-icon slot="left" value="subscriptions"/>
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="非常不满意" >
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
  props:['toOpenEvaluate','target'],
  methods: {
    close () {
      this.$emit('closeEvaluate')
    },
    jumpTo(){
      console.warn("click")
      this.$store.commit('setEvaluated')
      document.getElementById('close-btn').click()//模拟点击了关闭按钮
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
