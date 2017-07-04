"use strict"
import Vue from "vue";
import App from "./App.vue";
import "animate.css/animate.css";
import "bootstrap/dist/css/bootstrap.css";
import LoginComponent from "./components/Login/LoginComponent.vue";
import MainComponent from "./components/main/MainComponent.vue";

//step1: npm install vue-router import
import VueRouter from "vue-router"

//step2:第三方组件的安装
Vue.use(VueRouter);

//step3: 创建一个路由的实例,通过个实例来创建路由表
const router = new VueRouter({
    routes:[
        //localhost:333#/login
        {path:"/login",component:LoginComponent},
        {path:"/main",component:MainComponent}
    ]
})

new Vue({
    el:"#app",
    router,  //step4 : 在vm里面注册路由
    render:(createElement)=>{
        return createElement(App);
    }
});
