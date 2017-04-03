<template>
<div>
  <mu-dialog :open="dialog" :title="title" >
    {{info}}
    <mu-flat-button slot="actions" @click="cancel" primary label="Cancel"/>
    <mu-flat-button slot="actions" primary @click="confirm" label="Confirm"/>
  </mu-dialog>
</div>
</template>

<script>
import {mapState} from 'vuex'
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
      this.$store.commit('dialogToggle',{//关闭确认框并清除相关信息
        info : '',
        title:'',
        event : '',
        jumpTo :''
      })
      console.info("canceled")
    },
    confirm () {
      console.warn(this.event)
      if(this.event){
        //this.$store.commit(this.event)//执行传入的mutation
      }
      if(this.event == 'logOut'){ //如果是确认登出则重定向至首页
         this.$store.commit(this.event)//执行传入的mutation
        this.$store.commit('topPopupToggle',"Log out success!")
        this.$router.push({ 
            path : '/'
          })
      }else if(this.event =='jump'){
        this.$router.push({ 
            path : this.jumpTo
          })
      }
      this.$store.commit('dialogToggle',{//关闭确认框并清除相关信息
        info : '',
        title:'',
        event : '',
        jumpTo :''
      })  
    }
  }
}
</script>