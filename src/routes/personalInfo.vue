<template>
<div class="root">
{{compressedPicFile}}


 <mu-paper class="demo-paper " :zDepth="2" >
  <mu-icon-button class="head-upload" icon="cloud_upload" :disabled="disabled" @click="toUpload"/>
  <div class="user-head-blur " :style="{backgroundImage: 'url(' + userInfo.userPic + ')'}"></div>
 <h6 class="user-id">ID:{{userInfo.userId}}</h6>
 <img class="user-head" :src="userInfo.userPic">
 <p class="user-name">{{userInfo.userName}}</p>
 <input class="hidden-input" name="pictureFile" id="userPicUpload" type="file" accept="image/*"  @change="getPicInfo" >
 </mu-paper>

<mu-text-field 
  name="userName"
  hintText="Your real name"
  label="Name" 
  type="text" 
  icon="N" 
  :errorText="inputNameErrorText" 
  @textOverflow="handleNameInputOverflow" 
  :maxLength="8"
  v-model="userInfo.userName" 
  labelFloat
  :disabled="disabled"/>
<br/>
<mu-text-field 
  name="userNickname"
  hintText="Your nick name"
  label="Nick name" 
  type="text" 
  icon="insert_emoticon" 
  :errorText="inputNickNameErrorText" 
  @textOverflow="handleNickNameInputOverflow" 
  :maxLength="8"
  v-model="userInfo.userNickname" 
  labelFloat
  :disabled="disabled"/>
<br/>
<mu-text-field 
  name="userPhone"
  hintText="A way to contact"
  label="Phone number" 
  type="number" 
  icon="phone" 
  v-model="userInfo.userPhone" 
  labelFloat
  :disabled="disabled"/>
<br/>
<mu-text-field 
  name="userIdnumber"
  hintText="your identification"
  label="ID number" 
  type="number" 
  icon="credit_card" 
  v-model="userInfo.userIdnumber" 
  labelFloat
  :disabled="disabled"/>
<br/>
<mu-text-field 
  name="userEmail"
  hintText="Another way to contact"
  label="Mail adress" 
  type="email" 
  icon="email" 
  v-model="userInfo.userEmail" 
  labelFloat
  :disabled="disabled"/>
<br/>
<mu-text-field 
  name="userCity"
  hintText="Where r u from"
  label="City" 
  type="text" 
  icon="location_city" 
  v-model="userInfo.userCity" 
  labelFloat
  :disabled="disabled"/>
<br/>
<mu-text-field 
  name="userSignature"
  hintText="Show your personality" 
  label="Signature" 
  type="text" 
  icon="comment"
  v-model="userInfo.userSignature"    
  :rows="1" 
  :rowsMax="3" 
  :disabled="disabled"
  labelFloat
  multiLine />
<br/>
<mu-date-picker 
  name="userBirthday"
  hintText="Here's your birthday"
  label="birthday" 
  icon="cake"
  v-model="userInfo.userBirthday" 
  :disabled="disabled"
  labelFloat
  />
  <input class="hidden-input" name="userBirthday" type="text" :value="userInfo.userBirthday"></input>
<br/>
 <mu-dropDown-menu 
  :value="userInfo.userSex" 
  :disabled="disabled"
  @change="genderChange">
    <mu-menu-item value="1" title="male"/>
    <mu-menu-item value="0" title="female"/>
  </mu-dropDown-menu>
  <input class="hidden-input" name="userSex" type="text" :value="userInfo.userSex"></input>
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
{{userInfo}}
{{userInfoBackUp}}
</div>
</template>

<script>
import {mapState} from 'vuex'
import {eventHub} from '../components/Event-hub.js'
import lrz from 'lrz'
	export default {
    data () {
      return {
        title:'Personl Info',
        userInfo:{
          userId:'',
          userName:'jack',
          userNickname:'test#1945',
          userSex:'1',
          userBirthday:'1994-11-27',
          userCity:'Guangzhou',
          userPic:'',
          userId:'10264',
          userPhone:'123333', //这里注意要不要处理数据类型是字符串还是数字，后者则v-model.number
          userEmail:'530063781@qq.com',
          skill:['HTML5','CSS','JavaScript','Vue','Angular.js','Webpack','Node.js','Mysql'],
          userSignature:'Just do it.'
        },
        userInfoBackUp:{},
        isEdit:false, //是否进入修改模式，影响两个按钮出现
        disabled:true, //信息是否可以修改
        saveDisabled: false,//保存按钮的可用态
        inputNameErrorText: '',
        inputNickNameErrorText:'',
        compressedPicFile:'',
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      //应该每次读取后端的信息(因为可以拿到最新的后端数据)
      this.getInfo()
    },
    computed:{
      localComputed () { 

       },
      ...mapState({
        user:'user',    
      })
    },
    watch:{
      saveDisabled:function(val,oldVal){
        if(this.inputNameErrorText==''&&this.inputNickNameErrorText==''){
          this.saveDisabled = false
        }else{
          this.saveDisabled = true
        }
      },
    },
    methods:{
      isNickNameNull(){
        if(this.userInfo.userNickname==''){
          this.inputNickNameErrorText = 'Nick name must not be null'
          this.saveDisabled = true
        }else{
          this.inputNickNameErrorText = ''
          this.saveDisabled = false
        }
      },
      handleNameInputOverflow (isOverflow) {
       this.saveDisabled = isOverflow ? true : false
       this.inputNameErrorText = isOverflow ? 'Over length!' : ''
      },
      handleNickNameInputOverflow(isOverflow){
        this.saveDisabled = isOverflow ? true : false
        this.inputNickNameErrorText = isOverflow ? 'Over length!' : ''
      },
      getInfo(){
        var self = this
        this.axios.get('/user/getInfo.action')
        .then(function (res) {
          console.warn(res)
          self.userInfo = res.data.object
          console.warn("USER INFO",self.userInfo)
        })
        .catch(function (err) {
          console.log(err)
        })
      },
      edit(){
        if (typeof Object.assign != 'function') { //polyfill for Object.assign
          Object.assign = function(target) {
            'use strict';
            if (target == null) {
              throw new TypeError('Cannot convert undefined or null to object');
            }
            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
              var source = arguments[index];
              if (source != null) {
                for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }
            }
            return target;
          };
        }
        this.isEdit = true
        this.disabled = false
        this.userInfoBackUp = Object.assign({},this.userInfo) //注意这里备份数据的方式，qq uc浏览器不支持需要polyfill
      },
      save(){
        var self = this
        //收集数据并post到后端，然后更新数据（更新方式是直接覆盖还是再从后端取一次待定）
        //此处可有转菊花和成功、失败提示
        this.saveDisabled = true
        this.disabled = true
        this.userInfoBackUp = {}//重置备份数据
        this.$store.commit('loadingToggle')
        
        //构建要上传的form表单,字段要填写完整！！
        var formData = new FormData()
        var userPicUpload = document.getElementById("userPicUpload").files[0]
        
    /*    formData.append("userName", this.userInfo.userName)
        formData.append("userSex", this.userInfo.userSex)
        formData.append("userNickname", this.userInfo.userNickname)
        formData.append("userCity", this.userInfo.userCity)
        formData.append("userSignature", this.userInfo.userSignature)
        formData.append("userBirthday", this.userInfo.userBirthday)
        formData.append("userPhone", this.userInfo.userPhone)   
        formData.append("userIdnumber", this.userInfo.userIdnumber)  */
        if(userPicUpload){//用户修改了头像
          lrz(userPicUpload,{fieldName:"pictureFile"})//compress picture
          .then(function (rst) {//关于rst.formData实际构成可看github上的issues
              // 处理成功会执行
              console.warn(rst,"lrz upload!!!");
              rst.formData.append("userName", self.userInfo.userName)
              rst.formData.append("userSex", self.userInfo.userSex)
              rst.formData.append("userNickname", self.userInfo.userNickname)
              rst.formData.append("userCity", self.userInfo.userCity)
              rst.formData.append("userSignature", self.userInfo.userSignature)
              rst.formData.append("userBirthday", self.userInfo.userBirthday)
              rst.formData.append("userPhone", self.userInfo.userPhone)   
              rst.formData.append("userIdnumber", self.userInfo.userIdnumber) 
              //rst.formData.append("pictureFile", rst.file)
              self.upload(rst.formData)
          })
          .catch(function (err) {
              // 处理失败会执行
              document.getElementById("userPicUpload").value = ''//重要！重置上传图片的value
              console.warn("lrz fail!!!");
          })
          .always(function () {
              // 不管是成功失败，都会执行
              console.warn("lrz whatever!!!");
          });
        }else{//没有修改头像
          formData.append("userName", this.userInfo.userName)
          formData.append("userSex", this.userInfo.userSex)
          formData.append("userNickname", this.userInfo.userNickname)
          formData.append("userCity", this.userInfo.userCity)
          formData.append("userSignature", this.userInfo.userSignature)
          formData.append("userBirthday", this.userInfo.userBirthday)
          formData.append("userPhone", this.userInfo.userPhone)   
          formData.append("userIdnumber", this.userInfo.userIdnumber)
          this.upload(formData)
        }
        //formData.append("pictureFile", userPicUpload)//上传图片
        /*this.axios({//上传信息接口
              url: '/user/update.action',
              method: 'post',
              data: formData,
              transformRequest: [function (data) {//这里重置http.js中全局的transform
                // Do whatever you want to transform the data
                return data;
              }],
            })
        .then(res=>{
          this.isEdit = false       
          this.saveDisabled = false
          this.$store.commit('topPopupToggle',"Saved！")
          this.$store.commit('loadingToggle')
          console.warn(res)    
        })
        .catch(err =>{
          //if保存失败需再次this.saveDisabled = false
          this.saveDisabled = false
          //转菊花消失
          this.disabled = false
          this.$store.commit('loadingToggle')
           this.$store.commit('topPopupToggle',"Failed！")
          console.warn(err)
        })  */
      },
      upload(formData){
        this.axios({//上传信息接口
              url: '/user/update.action',
              method: 'post',
              data: formData,
              transformRequest: [function (data) {//这里重置http.js中全局的transform
                // Do whatever you want to transform the data
                return data;
              }],
            })
            .then(res=>{
              this.isEdit = false       
              this.saveDisabled = false
              //弹出提示
              this.$store.commit('topPopupToggle',"Saved！")
              //转菊花消失
              this.$store.commit('loadingToggle')
              this.$store.commit('userHeadUpdate',this.userInfo.userPic)//上传成功后给全局提供头像url
              console.warn(res)    
              //提交事件让menu信息更新
              setTimeout(()=>{
                eventHub.$emit('update')
              },2000)         
            })
            .catch(err =>{
              //if保存失败需再次this.saveDisabled = false
              this.saveDisabled = false
              //转菊花消失
              this.$store.commit('loadingToggle')
               this.$store.commit('topPopupToggle',"Failed！")
               document.getElementById("userPicUpload").value = ''//重要！重置上传图片的value
              console.warn(err)
            })  
      },
      cancel(){
        document.getElementById("userPicUpload").value = ''//重要！重置上传图片的value
        this.isEdit = false
        this.disabled = true
        this.userInfo = this.userInfoBackUp
        this.userInfoBackUp = {}//重置备份数据

      },
      firstLetter(item){
         return item.slice(0,1)
      },
      genderChange (value) {
        this.userInfo.userSex = value
      },
      toUpload(){
        if(this.disabled == false){
          var input = document.getElementById("userPicUpload")
          input.click()
        }else{
          return
        }
      },
      getPicInfo(e){
       var self = this
        console.warn(e,e.target.files[0])
        console.warn("pic size: ", e.target.files[0].size)
        lrz(e.target.files[0])//compress picture
        .then(function (rst) {
            // 处理成功会执行
            console.warn(rst,"lrz!!!");
            self.userInfo.userPic = rst.base64 //picture preview!!
        })
        .catch(function (err) {
            // 处理失败会执行
            console.warn("lrz fail!!!");
        })
        .always(function () {
            // 不管是成功失败，都会执行
            console.warn("lrz whatever!!!");
        });
        /*if (window.FileReader) {
              var reader = new FileReader()
        } else {
              console.error("您的设备不支持图片预览功能，如需该功能请升级您的设备！")
        }
        //获取文件
        var file = e.target.files[0]
        //this.picFile =  e.target.files[0]
        reader.onload = function(e) {
          self.userInfo.userPic = e.target.result
          //console.warn(e.target.result)//是一段base64
        }
        reader.readAsDataURL(file)*/
      },
    },
    components:{
    },
  }
</script>

<style lang="css" scoped>
.root{
  height: 100%;
  overflow: auto;
}
.head-upload{
  position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
}
.user-id{
  margin: 0 auto;
  position: absolute;
  color: #fff;
  z-index: 20;
}
.user-head-blur{
position: absolute;
top: 0px;
left: 0px;
background-size: 100% 200%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
   -webkit-filter: blur(5px); /* Chrome, Opera */
       -moz-filter: blur(5px);
        -ms-filter: blur(5px);    
            filter: blur(5px);   
}
.user-head{
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto;
  position: relative;
  z-index: 20;
}
.user-name{
  margin: 0 auto;
  text-align: center;
  font-size: 20px;
  color: #fff;
  position: relative;
  z-index: 20;
}
.mu-text-field{
  width: 93%;
}
.mu-dropDown-menu{
      margin-top: 25px;
    left: 50%;
    transform: translate(-50%,-50%);
}
.mu-paper{
  width: 90%;
    margin: 0 auto;
    position: relative;
    padding: 5px;
   /*  background-color: #9575cd; */
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
  .hidden-input{
    display: none;
    /* visibility: hidden; */
  }
</style>
