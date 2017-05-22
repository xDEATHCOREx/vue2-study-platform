<template>
<div>
  <mu-dialog :open="dialog" :title="title" >
    {{info}}
    <mu-flat-button slot="actions" @click="cancel" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="confirm" label="确认"/>
  </mu-dialog>
</div>
</template>

<script>
import {mapState} from 'vuex'
import {eventHub} from './Event-hub.js'
export default {
  data () {
    return {

    }
  },
  computed:mapState({
     dialog:state=>state.dialog.show,
     info:state=>state.dialog.info,
     title:state=>state.dialog.title,
     event:state=>state.event,
     jumpTo:state=>state.jumpTo,
     docked:state=>state.docked,
  }),
  methods: {
    cancel(){
      this.$store.commit('dialogCancel')
      console.info("canceled")
    },
    confirm () {
      console.warn(this.event)
      if(this.event){
        //this.$store.commit(this.event)//执行传入的mutation
      }
      if(this.event == 'logOut'){ //如果是确认登出则重定向至首页
        this.axios.post('/user/logout.action')//登出请求提交到后端
            .then(res =>{
              console.warn(res)
              this.$store.commit(this.event)//执行传入的mutation
              this.$store.commit('topPopupToggle',"登出成功!")
              this.$store.commit('clearScore')//清除用户测试得分

              eventHub.$emit('updateTestStatus')//更新测试态
              eventHub.$emit('resetStar')//更新首页收藏态，防止在首页登出没有更新收藏态
              this.$router.push({ 
                path : '/'
              })
            })
            .catch(err =>{
              console.warn(err)
            })   
        
      }else if(this.event =='jump'){
        this.$store.commit('setJumpConfirm')
          setTimeout(()=>{
            this.$store.commit('cancelJumpConfirm')
          },1000)
        if(this.jumpTo){
          this.$router.push({ 
              path : this.jumpTo
            })
        }
      }
      this.$store.commit('dialogCancel')  
    }
  }
}
</script>