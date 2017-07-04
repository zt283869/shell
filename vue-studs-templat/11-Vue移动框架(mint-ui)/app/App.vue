<script src="main.js"></script>
<template>
    <div>
        <mt-button @click.native="handleClick">按钮</mt-button>


        <mt-swipe :auto="4000">
            <mt-swipe-item><div class="box box1">1</div></mt-swipe-item>
            <mt-swipe-item><div class="box box2">2</div></mt-swipe-item>
            <mt-swipe-item><div class="box box3">2</div></mt-swipe-item>
        </mt-swipe>


        <mt-tabbar v-model="selected">
            <mt-tab-item id="外卖">
                <img slot="icon" src="assets/100.png">
                外卖
            </mt-tab-item>
            <mt-tab-item id="订单">
                <img slot="icon" src="assets/100.png">
                订单
            </mt-tab-item>
            <mt-tab-item id="发现">
                <img slot="icon" src="assets/100.png">
                发现
            </mt-tab-item>
            <mt-tab-item id="我的">
                <img slot="icon" src="assets/100.png">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>


<script type='text/ecmascript-6'>
    import Vue from 'vue';
    import Mint from 'mint-ui';
    import 'mint-ui/lib/style.css';
    export default {
            methods: {
                handleClick: function() {
                    this.$toast('Hello world!')
                }
            }
    }
</script>

<style scoped>
    .mint-swipe,.box {
        margin: 0; padding: 0;
       width: 100%;height: 300px;
   }

    .box1 {
        background-color: red;
    }

   .box2 {
       background-color: green;
   }
   .box3 {
       background-color:yellow;
   }
</style>