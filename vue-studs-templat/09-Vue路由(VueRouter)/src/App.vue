<template>
    <div>
        <a class="link" @click="changeCom(1)">登录页</a>
        <a class="link" @click="changeCom(2)">管理首页</a>
        <div :is="cc"></div>
        <!--<router-link to="/login">Go to login</router-link>-->
        <!--<router-link to="/main">Go to main</router-link>-->
        <!--<transition-->
        <!--name="fade"-->
        <!--enter-active-class="animated bounceInRight"-->
        <!--leave-active-class="animated bounceOutRight"-->
        <!--&gt;-->
        <!--<router-view></router-view>-->
        <!--</transition>-->
    </div>
</template>


<script type='text/ecmascript-6'>
    import LoginComponent from "./components/Login/LoginComponent.vue"
    import MainComponent from "./components/main/MainComponent.vue";
    export default {
        data:function(){
            return {
                cc:LoginComponent
            }
        },
        methods:{
            changeCom :function(i){
                if(i===1){
                    this.cc = LoginComponent
                }else{
                    this.cc = MainComponent
                }
            }
        },
        components:{
            LoginComponent,
            MainComponent
        }
    }
</script>

<style scoped>

</style>