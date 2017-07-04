
$(function(){

    var phoReg = /^1(37|38|39|50|57|)\d{8}$/;
    var psdReg = /^\w{6,20}$/;
    $("#tel").blur(function(){
        if(!phoReg.test($("#tel").val())){
            $(this).next().show().addClass("icon-58b471");
        }else{
            $(this).next().show().addClass("icon-shuruzhengquetishi");
        }
    })
    $("#pass").blur(function(){
        if(!psdReg.test($("#pass").val())){
            $(this).next().show().addClass("icon-58b471");
        }else{
            $(this).next().show().addClass("icon-shuruzhengquetishi");
        }
    })

//    点击获取验证码
    var a=60;
    var timer;
    var m;
    //生成验证码
    function yanzheng(){
        var arr=[1,2,3,4,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
            "p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O",
            "P","Q","R","S","T","U","V","W","X","Y","Z"];
         m='';
        for(var i=0;i<4;i++){
            var j=parseInt(Math.random()*arr.length);
            m+=arr[j];
        }
        $(".getVertify").html(m);
    }
    $(".getVertify").click(function(){
        clearInterval(timer);
      timer= setInterval(function(){
            a--;
            $(".getVertify").html(a+"s");
          if(a==1){
              a=60;
              clearInterval(timer);
              yanzheng();
          }
        },1000)
    })
//点击注册
    $(".reg").click(function(){
        if($("#tel").val()&&$("#pass").val()&&$("#verify").val()){
            if(localStorage.getItem("user")){
                var arr= $.parseJSON(localStorage.getItem("user"));
            }else{
                var  arr=[];
            }
            for(var i=0;i<arr.length;i++){
                if(arr[i].phone==$("#tel").val()){
                    alert("该用户已存在");
                    return false;
                }
            }

            var  o={};
            o.phone=$("#tel").val();
            o.psd=$("#pass").val();
            arr.push(o);
            localStorage.setItem("user",JSON.stringify(arr));
            location.href="login.html";
        }else{
            alert("请输入完整信息！");
        }
    })
})