/**
 * Created by zhutao on 2017/6/16.
 */
var vm = new Vue({
    el:"#app",
    data:{
        totalPrice:0,
        totalCount:0,
        productLists:[
            {"price":100,"qal":1},
            {"price":200,"qal":1}
        ],
    },
    computed:{
        formatCount:function(){
            return this.totalPrice + "元";
        }
    },
    methods:{
        addQal:function(idx){
            this.productLists[idx].qal++;
            this.countProduct(this.productLists)
        },
        subQal:function(idx){
            if(this.productLists[idx].qal <=1){
                this.productLists[idx].qal=1;
            }else{
                this.productLists[idx].qal--;
                this.countProduct(this.productLists)
            }
        },
        countProduct:function(){
            this.totalCount=0;
            this.totalPrice=0;
            this.productLists.forEach((val,index)=>{
                this.totalCount += val.qal;
                this.totalPrice += val.qal *val.price;
            })
        },
        // listnum:function(){
        //     axios.get("data/cart.json")
        //         .then((res)=>{
        //             this.productLists = res.data;
        //             this.countProduct();
        //         })
        // }
    },
    created:function(){
        this.countProduct();
    }
});