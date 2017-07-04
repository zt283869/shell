<template>
  <div id="app" >
    <div :is="cc"></div>
    <transition
    name="fade"
    enter-active-class="animated fadeInRightBig"
    >
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  import CenterFrame from './components/Center_frame.vue'
  import "animate.css/animate.css"
export default {
  name: 'app',
  data:function () {
    return{
        cc:CenterFrame
    }
  },
    components:{
      CenterFrame
    }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100%;
  height: 100%;
 overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
}
</style>
