
$(function(){
    $(".reg").click(function(){
        var userArr = $.parseJSON(localStorage.getItem("user"));
        var flag=0;
        for(var i=0;i<userArr.length;i++){
            if(userArr[i].phone==$("#tel").val()){
                flag=1;
                if(userArr[i].psd==$("#pass").val()){
                    location.href="../../index.html";
                }else{
                    alert("密码错误");
                }
            }
        }
        if(!flag){
            alert("该用户不存在，请先注册");
        }
    })
})