<template>
<div class="comment-root">
<transition-group name="list-complete" tag="div">
 <mu-card class="answer" v-for="(item,index) in answerData" v-bind:key="item" v-if="item!=''">
  <mu-card-header :title="item.answerNickName" :subTitle="item.communityAnswertime">
     <mu-avatar slot="avatar" color="deepOrange300" backgroundColor="purple500" :src="item.answerAvartarUrl">
       <div v-if="item.answerAvartarUrl==''">MB</div>
     </mu-avatar>
  </mu-card-header>
  <mu-card-text v-html="formattedAnswerText(item.answerText)">
  </mu-card-text>
    <img class="answer-pic" v-if="item.answerPic" :src="item.answerPic">
  <mu-card-actions>
    <mu-flat-button  
      icon="arrow_upward" 
      :label="formattedCount(item.agreeCount)" 
      @click="agree(index)"
      :primary="agreeColorChange(item.agreeType)"/>
    <mu-flat-button  
      icon="arrow_downward" 
      :label="formattedCount(item.disagreeCount)" 
      :primary="disagreeColorChange(item.agreeType)"
      @click="disagree(index)"/>
    <mu-icon-menu
        v-if="isSelf(item.communityAnswerid)"
        icon="more_vert"
        :anchorOrigin="rightBottom"
        :targetOrigin="rightBottom">
        <mu-menu-item title="删除" @click="toDeleteAnswer(index)"/>
    </mu-icon-menu>
  </mu-card-actions>
</mu-card>
 </transition-group>
</div>
</template>

<script>
import {mapState} from 'vuex'
import {eventHub} from './Event-hub.js'
export default {
  data () {
    return {
    rightBottom: {horizontal: 'right', vertical: 'bottom'},
    disabled:false,
    }
  },
  props:['answerData'],
   computed:{
      
      ...mapState({
        logIn:'logIn',//记录了登录态    
        userId:'userId',
      })
    },
  methods: {
     isSelf(id){
      if(this.userId == id){
          return true
      }else{
          return false
      }
     },
      formattedAnswerText (text) { 
        var replaceText = String(text).replace(/\n/g,'<br/>')//注意写法！
        //console.warn(typeof replaceText,replaceText)
         return replaceText
       },
       toDeleteAnswer(index){
        console.warn("delete",index)
        eventHub.$emit('delete',index)
       },
      formattedCount(e){
        return String(e)
      },
      agreeColorChange(tag){
        if(tag=='1'){
          return true
        }else if(tag== null){
          return false
        }
      },
       disagreeColorChange(tag){
        if(tag=='2'){
          return true
        }else if(tag== null){
          return false
        }
      },
       agree(index){
          this.$emit('agree',index)
         
       },
       disagree(index){
        this.$emit('disagree',index)
       }
  },
  watch: {
   
  }
}
</script>

<style lang="css" scoped>
.comment-root{
  position: relative;
}
.answer{
  margin-top: 10px;
  transition: all .75s;

}
.answer-pic{
    width: 92%;
    max-width: 100%;
    display: block;
    vertical-align: top;
    margin: 0 auto;
    box-shadow: 0 3px 10px rgba(0,0,0,0.656863), 0 3px 10px rgba(0,0,0,.227451);
}
.mu-icon-menu{
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
.list-complete-leave-active {
  opacity: 0;
  position: absolute;
  transform: translate(300px,0px);
}
.list-complete-enter{
  opacity: 0;
  transform: translateY(30px);
}

</style>