<template>
    <div class="eq_son">
      <footer>
        <video controls="controls" style="width: 100%;height: 100%;" autoplay class="v-video">
          <source :src="url" >
          <object :data="url" >
            <embed  :src="url" />
          </object>
          <p>很抱歉！您的浏览器不支持视频控件请更新版本/使用uc浏览器等</p>
        </video>
        <a class="back iconfont icon-back" href="javascript:history.back(-1)"></a>
      </footer>
      <div class="Tab_Control">
        <span class="av active">
          <a></a>
          <span>视频</span>
          <a class="bot_bor">
            <span class="active_s"></span>
          </a>
        </span>
        <span class="title">
           <a></a>
          <span>泡泡</span>
          <a class="bot_bor">
            <span></span>
          </a>
        </span>
      </div>
      <center-seg></center-seg>
      <div class="text_sm">
        <ul class="text_ul">
          <li class="title_one">
            <span>宰相刘罗锅的爱情故事</span>
          <i class="iconfont icon-back v-if"></i>
          </li>
          <li class="class_x">
              <a>类型:</a><span>爱奇艺出品内涵段子</span>
          </li>
          <li class="text_janj">
            <a>主吃人:</a><span>诗人-杰；上海-龙；</span>
          </li>
          <li class="bq_jianj">
            <a class="bl_title">本期哔哩哔哩:</a>
            <span></span>
            <span class="bl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;凤凰网娱乐讯 当地时间2017年6月22日，纽约，中国电商巨头阿里巴巴的创始人马云亮相街头，他身穿休闲T恤咬着眼镜架气场十足。

然而马云身为多金大佬，却脚踩黑色布鞋，裤兜里还塞得满满当当，还真事干大事不拘小节呀。身后那位身穿灰色T恤的男子被眼尖的网友认出并非保镖，而是赵薇老公黄有龙，两位大佬亲密同行，十分拉风。

网友们都对这张照片十分感兴趣，赵薇老公黄有龙和马云鲜少同框，平时大多也不见黄有龙与赵薇晒出照片。不过赵薇一家曾回到老家，三人同行显得幸福。</span>
          </li>
        </ul>
      </div>
      <div class="text_pl">
        <ul class="text_ul">
          <li class="pllist" v-for="(n,index) in title">
            <span>
           <i class="iconfont icon-nanren1"></i>
           <a>
             <p>{{n.name}}</p>
             <b>{{n.time}}分钟前</b>
           </a>
            </span>
            <a class="love_a">我是爱吃兔子的乌龟</a>
            <div>
              <ul class="div_ul">
                <li>
                  <i class="iconfont icon-muying"></i>
                  <span>分享</span>
                </li>
                <li>
                  <i class="iconfont icon-icon"></i>
                  <span>评论</span>
                </li>
                <li>
                  <i class="iconfont icon-bangdan"></i>
                  <span @click="num(index)">{{n.msg}}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import CenterSeg from './Center_seg.vue'
  import '../js_frame/jq'
    export default{
      data:function(){
          return{
              url:"http://sunxin11.duapp.com/ms.ifox",
            msg:1,
            title:[{
              "name":"爱吃兔子的乌龟",
              "time":"52",
              "msg":'2'
            },
              {
                  "name":"爱吃乌龟的狮子",
                "time":"39",
                "msg":"4"
              },
              {
                "name":"爱吃乌龟的豹子",
                "time":"45",
                "msg":"6"
              },
              {
                "name":"爱吃乌龟的兔子",
                "time":"30",
                "msg":"4"
              },
              {
                "name":"爱吃乌龟的兔子",
                "time":"30",
                "msg":"4"
              }

            ]
          }
      },
      methods:{
          num:function (index) {
            this.title[index].msg++
          }
      },
      components:{
        CenterSeg
      },
      mounted:function(){
          $(".av").on("click",function(){
            $(this).addClass("active");
            $(this).find("a").eq(1).find("span").addClass("active_s");
            $(".title").removeClass("active");
            $(".title").find("a").eq(1).find("span").removeClass("active_s");
            $(".text_sm").css("display","block")
            $(".text_pl").css("display","none")
          });
        $(".title").on("click",function(){
          $(this).addClass("active");
          $(this).find("a").eq(1).find("span").addClass("active_s");
          $(".av").removeClass("active");
          $(".av").find("a").eq(1).find("span").removeClass("active_s");
          $(".text_sm").css("display","none")
          $(".text_pl").css("display","block")
        });
        var str = false;
        $(".v-if").on("click",function(){
              if(str){
                  $(".bl").css("display","block")
                $(this).removeClass("icon-you")
                $(this).addClass("icon-back")
                str = !str;
              }else{
                $(".bl").css("display","none")
                $(this).removeClass("icon-back")
                $(this).addClass("icon-you")
                str = !str;
              }
          })
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .eq_son{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    background: white;
    footer{
      width: 100%;
      box-sizing: border-box;
      border-bottom:1px solid #aaa;
      .v-video{
        display: block;
      }
      .back{
        position: absolute;
        display: block;
        width: 10%;
        height: .3rem;
        background: rgba(0,0,0,.5);
        top:.05rem;
        left: 2%;
        border-radius: 100%;
        font-size: .24rem;
        color: white;
        text-align: center;
        line-height: .3rem;
      }
    }
    .Tab_Control{
      width: 100%;
      display: flex;
      span{
        flex: 1;
        text-align: center;
      }
      .av,.title{
        display: flex;
        font-size: .16rem;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        a{

          height: .1rem;
        }
        span{
          flex: 1;
        }
        .bot_bor{
          display: block;
          text-align: center;
          display: inline-block;
        span{
          display: block;
          width: 7%;
          margin-left: 45%;
          margin-top: .07rem;
        }
        }
      }
      .active{
        color: #00AA00;
      }
      .active_s{
        border:1px solid #00AA00;
      }
    }
    .text_sm{
      width: 100%;
     .text_ul{
       width: 100%;
       .title_one{
         width: 100%;
         display: flex;
         box-sizing: border-box;
         padding: .1rem 0;
         span{
           font-size: .16rem;
           flex: 1;
           color: #1e1a1a;
         }
        i{
          text-align: center;
          font-size: .17rem;
        }
       }
       .class_x{
         width: 100%;
         display: flex;
         a{
           width: 10%;
           font-size: .11rem;
           color: #aaaaaa;
         }
         span{
           flex: 1;
           font-size: .13rem;
           color: #393232;
         }
       }
       .text_janj{
         width: 100%;
         display: flex;
         box-sizing: border-box;
         padding: .1rem 0;
         a{

           color: #aaaaaa;
           font-size: .11rem;
         }
         span{
           flex: 1;
           font-size: .13rem;
           color: #393232;
         }
       }
       .bq_jianj{
         width: 100%;
         display: flex;
         flex-direction: column;
         position: relative;
         a{
           color: #aaaaaa;
           font-size: .11rem;
         }
         span{
           flex: 1;
           font-size: .13rem;
           color: #665c5c;
           position: absolute;
         }
       }
     }
    }
    .text_pl{
      width:100%;
      height: 100%;
      overflow-y: auto;
      display: none;
      .text_ul{
        width: 100%;
      .pllist{
        width: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: .09rem 0;
        border-bottom: 1px solid #aaa;
        span{
          width: 100%;
          display: flex;
          i{
            width: 10%;
            height: .33rem;
            font-size: .3rem;
          }
          a{
            flex: 1;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            padding: 0 0 0 .1rem;
            p{
              flex: 1;
              font-size: .16rem;

            }
            b{
              flex: 1;
              font-size: .10rem;
              color: #aaaaaa;
            }
          }
        }
        a{
          height: .33rem;
          width: 100%;
          font-size: .15rem;
        }
        .love_a{
          line-height: .33rem;
        }
        div{
          width: 100%;
         .div_ul{
           width: 100%;
           display: flex;
           li{
             flex: 1;
             display: flex;
             box-sizing: border-box;
             padding: .07rem;
             i{
               flex: 1;
               text-align: right;
               font-size: .17rem;
             }
             span{
               flex: 1;
               font-size: .14rem;
               display: flex;
               align-items: center;
             }
           }
         }
        }
      }
    }
    }
  }
</style>
