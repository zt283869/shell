"use strict"

/**
 * 模块名称: ShopCart.js
 * 模块说明：购物车模块:xxxxxxx
 * 创建人:  henrry
 * 创建时间: 2017/06/10
 *
 * 修改原因:xxxx
 * 修改人： xxx
 * 修改时间：xx
 *
 * 审批：xxxx jira -> test -> loadRUNNER
 * @type {Vue|any}
 */

var vm = new Vue({
    el:"#app",
    data:{
        //总价格
        totalPrice:0,
        //总件数
        totalCount:0,
        //商品列表
        productLists:[],
    },
    computed:{
        //格式化价格
        formatCount:function(){
            return this.totalPrice + "元";
        }
    },
    methods:{
        //增加单品数量 : idx:下标
        addQal:function(idx){
            this.productLists[idx].qal++;
            this.countProduct(this.productLists)
        },
        //删减单品数量
        subQal:function(idx){
            if(this.productLists[idx].qal <=1){
                this.productLists[idx].qal=1;
            }else{
                this.productLists[idx].qal--;
                this.countProduct(this.productLists)
            }
        },
        //统计购物车总价格，总件数
        countProduct:function(){
            this.totalCount=0;
            this.totalPrice=0;
            this.productLists.forEach((val,index)=>{
                this.totalCount += val.qal;
                this.totalPrice += val.qal *val.price;
            })
        },
        //加载购物车
        loadProductList:function(){
            axios.get("data/cart.json")
                .then((res)=>{
                    this.productLists = res.data;
                    this.countProduct();
                })
        }
    },
    created:function(){
        this.loadProductList();
    },
    watch:{
        //满减总积份: -> v1.0
        totalPrice:function(n,o){
            if(n>=10000){
                console.log("congradulation! 10000 score to your count!");
            }
        }
    }
});