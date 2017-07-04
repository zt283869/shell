<template>
    <div class="panel-body">
        <!--<form class="form-horizontal">-->
            <div class="form-group">
                <label class="col-md-4 control-label">
                    用户名:
                </label>
                <div class="col-md-6">
                    <input type="text" placeholder="请输入用户名" v-model="user.name" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">
                    密码:
                </label>
                <div class="col-md-6">
                    <input type="text" placeholder="请输入用户名" v-model="user.pass" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-offset-4 col-md-6">
                    <a class="btn btn-danger" @click="login">用户登录</a>
                </div>
            </div>
        <!--</form>-->
    </div>
</template>


<script type='text/ecmascript-6'>
    export default {
        data:function(){
            return {
                user:{}
            }
        },
        methods:{
            login:function(){
                console.log(this.user);
            }
        }
    }
</script>

<style scoped>

</style>