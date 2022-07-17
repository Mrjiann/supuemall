import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = ()=> import ("views/home/Home.vue");
const Cart = ()=> import ("views/cart/Cart.vue");
const Profile = ()=> import ("views/profile/Profile.vue");
const Category = ()=> import ("views/category/Category.vue");
const Detail = ()=> import ("views/detail/Detail.vue");

export default new Router({
  routes: [
   {
    path:"",
    redirect:"/home"
   },
   {
    path:"/home",
    component:Home
   },
   {
    path:"/profile",
    component:Profile
   },
   {
    path:"/cart",
    component:Cart
   },
   {
    path:"/category",
    component:Category
   },
   {
    path:"/detail/:iid",
    component:Detail
   }
  ],
  mode:"history"
})
