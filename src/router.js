import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './components/index.vue'
import login from './components/login.vue'
import regist from './components/regist.vue'
import detail from './components/detail.vue'
import personal from './components/personal.vue'
import video from './routes/videoCourse.vue'
import starred from './routes/starred.vue'
import personalInfo from './routes/personalInfo.vue'
import exam from './routes/exam.vue'
import store from './store/store'
Vue.use(VueRouter)

const routes = [
	{
		path:'/',
		name:'index',
		component:index,
	},
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
		}
	},
	{
	//没有匹配的路由时重定向到主页，这里必须写在最后
	//问题1：这里重定向不会去掉?的query string
		path:'*',
		redirect:'/',
	},
	
]

let user = localStorage.getItem('user') //每次刷新时检测LS中相关值以自动登录
if(user){
	console.info("user existed,automatic logging in...")
	store.commit('logIn',user)
}else{
	console.info("user non-exist,please log in")
}

const router = new VueRouter({
	mode: 'history',//这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
	base: '/vue2-study-platform/',
	routes,
	 scrollBehavior (to, from, savedPosition) {
	 if (to.hash) {
    	return {
     	 selector: to.hash
    	}
 	 }
    return { x: 0, y: 0 }//对于所有路由导航，简单地让页面滚动到顶部。
  }
})


router.beforeEach((to,from,next)=>{
	//window.scrollTo(0,0)//替代上面history模式+scrollBehavior的解决方案？
	console.warn(to)
	if(to.matched.some(r=>r.meta.requireAuth)){
		if(store.state.user){
			next();
		}else{
			next({
				path:'/login',
				query:{redirect: to.fullPath}// 将跳转的路由path作为参数，登录成功后跳转到该路由，如/login?redirect=%2Frepository
			})
		}
	}
	else {
		next();
	}
});

export default router