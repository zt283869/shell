$(function(){
//        换一换的点击
    var a=0;
    $(".change").click(function(){
            $(".list").html("");
            $.get("../../data/searchList.json",function(data){
                console.log(data);
                a++;
                if(a==5){
                    a=0;
                }
                for(var i=0;i<data[a].list.length;i++){
                        console.log(data[a].list.length);
                        var oLi ='<li class="border">'+data[a].list[i].name+'</li>';
                        $(".list").append(oLi);
                }
            })
    })
})