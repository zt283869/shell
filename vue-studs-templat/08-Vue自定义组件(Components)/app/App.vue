<template>
    <div>
        <v-hello></v-hello>
        <v-world></v-world>
    </div>
</template>


<script type='text/ecmascript-6'>
    import HelloComponent from "./components/Hello/HelloComponent.vue"
    import WorldComponent from "./components/World/WorldComponent.vue"

    export default {

        components:{
            "vHello":HelloComponent,
            "vWorld":WorldComponent
        }
    }
</script>

<style scoped>
  .red {

  }
</style>