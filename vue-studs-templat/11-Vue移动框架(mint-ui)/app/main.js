"use strict"

import Vue from 'vue';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import App from "./App.vue";

Vue.use(Mint);


new Vue({
    el: '#app',
    render:(h)=>{
        return h(App);
    }
})