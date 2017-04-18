<template>
<div class="root">
{{title}}
<br/>
<mu-list>
  <mu-list-item :title="'User name:'+user" disabled>
    <mu-avatar slot="left" src="/images/uicon.jpg"/>
     <mu-icon slot="right" icon="info"/>
  </mu-list-item>
</mu-list>
<mu-text-field 
  hintText="A way to contact"
  label="Phone number" 
  type="number" 
  icon="phone" 
  v-model="userInfo.phone" 
  labelFloat
  :disabled="disabled"/>
<br/>
<mu-text-field 
  hintText="Another way to contact"
  label="Mail adress" 
  type="email" 
  icon="email" 
  v-model="userInfo.email" 
  labelFloat
  :disabled="disabled"/>
<br/>
<mu-text-field 
  hintText="Show your personality" 
  label="Signature" 
  type="text" 
  icon="comment"
  v-model="userInfo.signature"    
  :rows="1" 
  :rowsMax="3" 
  :disabled="disabled"
  labelFloat
  multiLine />
<br/>
<mu-date-picker 
  hintText="Here's your birthday"
  label="birthday" 
  icon="comment"
  v-model="userInfo.birthday" 
  :disabled="disabled"
  labelFloat
  />
<br/>
<div class="demo-chip-container">
<mu-chip class="demo-chip" backgroundColor="blue300" v-for="item,index in userInfo.skill" >
    <mu-avatar color="blue300" backgroundColor="indigo900" :size="32">{{firstLetter(item)}}</mu-avatar> {{item}}
  </mu-chip>
</div>
<br/>
<mu-raised-button 
    label="Save" 
    class="demo-raised-button save-btn" 
    v-if="isEdit"
    :disabled="saveDisabled"
    @click.native="save"
    primary/>
<mu-raised-button 
    label="Cancel" 
    class="demo-raised-button cancel-btn" 
    v-if="isEdit"
    @click.native="cancel" />
<mu-raised-button 
  label="Edit info" 
  class="demo-raised-button edit-btn" 
  icon="edit" 
  touch="true" 
  v-else
  secondary 
  fullWidth 
  @click.native="edit"/>
{{userInfoBackUp}}
</div>
</template>

<script>
import {mapState} from 'vuex'
	export default {
    data () {
      return {
        title:'Personl Info',
        userInfo:{
          name:'jack',
          gender:'male',
          birthday:'1994-11-27',
          phone:'15679135464', //这里注意要不要处理数据类型是字符串还是数字，后者则v-model.number
          email:'530063781@qq.com',
          skill:['HTML5','CSS','JavaScript','Vue','Angular.js','Webpack','Node.js','Mysql'],
          signature:'Just do it.'
        },
        userInfoBackUp:{},
        isEdit:false, //是否进入修改模式，影响两个按钮出现
        disabled:true, //信息是否可以修改
        saveDisabled: false,//保存按钮的可用态
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      //应该每次读取后端的信息
    },
    computed:mapState({
      user:'user',    
    }),
    methods:{
      edit(){
        this.isEdit = true
        this.disabled = false
        this.userInfoBackUp = Object.assign({},this.userInfo) //注意这里备份数据的方式
      },
      save(){
        //收集数据并post到后端，然后更新数据（更新方式是直接覆盖还是再从后端取一次待定）
        //此处可有转菊花和成功、失败提示
        this.saveDisabled = true
        this.disabled = true
        this.userInfoBackUp = {}//重置备份数据
         this.$store.commit('loadingToggle')
        setTimeout(()=>{
          this.isEdit = false       
          this.saveDisabled = false
          this.$store.commit('topPopupToggle',"Saved！")
          this.$store.commit('loadingToggle')
        },1000)
        //if保存失败需再次this.disabled = false
      },
      cancel(){
        this.isEdit = false
        this.disabled = true
        this.userInfo = this.userInfoBackUp
        this.userInfoBackUp = {}//重置备份数据
      },
      firstLetter(item){
         return item.slice(0,1)
      }
    },
    components:{
    },
  }
</script>

<style lang="css" scoped>
.root{
  margin-bottom: 36px;
}
.demo-chip-container{
  display: flex;
  flex-wrap: wrap;
  
      padding-left: 12px;
}
.demo-chip{
  margin: 5px;
}
  .edit-btn{
    position: fixed;
    bottom: 0;
  }
  .save-btn{
    width: 50%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .cancel-btn{
     width: 50%;
    position: fixed;
    right: 0;
    bottom: 0;
  }
  
</style>
