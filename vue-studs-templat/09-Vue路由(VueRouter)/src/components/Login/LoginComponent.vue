<template>
    <div class="panel panel-danger">
        <login-header></login-header>
        <login-form></login-form>
        <login-footer></login-footer>
    </div>
</template>


<script type='text/ecmascript-6'>
    import LoginFooter from "./LoginFooter.vue";
    import LoginForm from "./LoginForm.vue";
    import LoginHeader from "./LoginHeader.vue";


    export default {

        components:{
            LoginFooter,
            LoginForm,
            LoginHeader
        }
    }
</script>

<style scoped>

</style>