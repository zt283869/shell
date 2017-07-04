<template>
    <div>
        <m-header></m-header>
        <music-component></music-component>
        <m-footer></m-footer>
    </div>
</template>


<script type='text/ecmascript-6'>
    import mHeader from "./components/musiclibrary/mHeader.vue";
    import MusicComponent from "./components/musiclibrary/MusicComponent.vue";
    import mFooter from "./components/musiclibrary/mFooter.vue"
    export default {
        components:{
            mHeader,
            MusicComponent,
            mFooter
        }
    }
</script>

<style scoped>

</style>