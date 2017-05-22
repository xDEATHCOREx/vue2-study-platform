import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './components/index.vue'
import login from './components/login.vue'
import regist from './components/regist.vue'
import detail from './components/detail.vue'
import personal from './components/personal.vue'
import video from './routes/videoCourse.vue'
import picture from './routes/pictureCourse.vue'
import article from './routes/articleCourse.vue'
import starred from './routes/starred.vue'
import personalInfo from './routes/personalInfo.vue'
import exam from './routes/exam.vue'
import questions from './routes/questions.vue'
import question from './routes/question.vue'
import ask from './routes/ask.vue'
import answer from './routes/answer.vue'
//const score = resolve => require(['./routes/score.vue'], resolve)//AMD风格的require，似乎不能设置chunkname
const score = r => require.ensure([], () => r(require('./routes/score.vue')), 'score')
//import score from './routes/score.vue'
import addCourseInfo from './routes/addCourseInfo.vue'

import store from './store/store'

import axios from 'axios'

Vue.use(VueRouter)

const routes = [
	{
		path:'/login',
		name:'login',
		component:login
	},
	{
		path:'/regist',
		name:'regist',
		component:regist
	},
	{
		path:'/detail',
		name:'detail',
		component:detail,
		meta:{
			requireAuth:true,
		}
	},
	{
		path:'/personal',
		name:'personal',
		component:personal,
		meta:{
			requireAuth:true,
		}
	},
	{
		path:'/video',
		name:'video',
		component:video,
		meta:{
			requireAuth:true,
		}
	},
	{
		path:'/picture',
		name:'picture',
		component:picture,
		meta:{
			requireAuth:true,
		}
	},
	{
		path:'/article',
		name:'article',
		component:article,
		meta:{
			requireAuth:true,
		}
	},
	{
		path:'/starred',
		name:'starred',
		component:starred,
		meta:{
			requireAuth:true,
		}
	},
	{
		path:'/personalInfo',
		name:'personalInfo',
		component:personalInfo,
		meta:{
			requireAuth:true,
		}
	},
	{
		path:'/exam',
		name:'exam',
		component:exam,
		meta:{
			requireAuth:true,
			requireConfirm:true,
		},
	},
	{
		path:'/questions',
		name:'questions',
		component:questions,
		
	},
	{
		path:'/question',
		name:'question',
		component:question,
		
	},
	{
		path:'/ask',
		name:'ask',
		component:ask,
		meta:{
			requireAuth:true,
		}		
	},
	{
		path:'/answer',
		name:'answer',
		component:answer,
		meta:{
			requireAuth:true,
		}		
	},
	{
		path:'/score',
		name:'score',
		component:score,
		meta:{
			requireAuth:true,
		}		
	},
	{
		path:'/addCourseInfo',
		name:'addCourseInfo',
		component:addCourseInfo,
		meta:{
			requireAuth:true,
		}		
	},
	{
		path:'/',
		name:'index',
		component:index,
	},
	{
	//没有匹配的路由时重定向到主页，这里必须写在最后
	//问题1：这里重定向不会去掉?的query string
		path:'*',
		redirect:'/',
	},
	
]

var user = ''

axios.get('user/isAutoLogin.action')//与后端交互检测自动登录的接口
.then(res=>{
	console.warn(res)
	if(res.data.success){
		user = localStorage.getItem('user') //每次刷新时检测LS中相关值以自动登录
		console.info("user existed,automatic logging in...")
		store.commit('logIn',user)
	}else{
		store.commit('logOut')//清除登录态以防bug
		console.info("user non-exist,please log in")
	}
})
.catch(err=>{
	console.warn(err)
})


/*if(user!==''){
	console.info("user existed,automatic logging in...")
	store.commit('logIn',user)
}else{
	store.commit('logOut')//清除登录态以防bug
	console.info("user non-exist,please log in")
}*/

const router = new VueRouter({
	mode: 'history',//这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
	//base: '/vue2-study-platform',
	routes,
	scrollBehavior (to, from, savedPosition) {
	 if (to.hash) { //如果有锚点#xxx则滚动到制定元素位置，配合a标签暗锚
    	return {
     	 selector: to.hash,
    	}
 	 }
    return { x: 0, y: 0 }//对于所有路由导航，简单地让页面滚动到顶部。
  }
})


router.beforeEach((to,from,next)=>{
	//window.scrollTo(0,0)//替代上面history模式+scrollBehavior的解决方案？
	console.warn(to)
	if(to.matched.some(r=>r.meta.requireAuth)){
		if(store.state.user){//已登录
			//需要跳转确认的页面都是在已登录的前提下
			next();
		}else{//未登录
			next({
				path:'/login',
				query:{redirect: to.fullPath}// 将跳转的路由path作为参数，登录成功后跳转到该路由，如/login?redirect=%2Frepository
			})
		}
	}
	else {
		
		next()
	}
});

export default router