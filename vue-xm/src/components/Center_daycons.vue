<template>
    <div class="eq_daycons">
      <ul class="eq_day_ul">
        <li class="day-title">
          <i class="iconfont icon-zixun i_one"></i>
          <span>今日资讯</span>
          <a>非洲兄弟的一天</a>
          <i class="iconfont icon-you i_tow"></i>
        </li>
        <li class="list_title">
          <span>
            <a class="a_one">
              <i class="iconfont icon-icon02"></i>
              <span>睡Force your mother-写代码</span>
            </a>
           <a class="a_tow">
               <i class="iconfont icon-icon02"></i>
              <span>睡gross-写代码</span>
           </a>
          </span>
          <a class="rig_a">
            <span class="iconfont icon-paotubiao"></span>
            <i class="iconfont icon-you"></i>
          </a>
        </li>
        <li class="list_img">
        <ul class="list_ul">

          <li>
            <a>
              <img src="http://m.qiyipic.com/image/20170622/81/ec/v_112596888_m_601_m1_284_160.jpg" alt="">
            </a>
            <span >
          <span>深夜拍下灵异事件</span>
            <a>1秒后他也看见了</a>
            </span>
          </li>

          <span></span>
          <li>
            <a>
              <img src="http://m.qiyipic.com/image/20170622/bc/2a/v_112600708_m_601_m1_284_160.jpg" alt="">
            </a>
            <span >
          <span>程序员写代码到深夜</span>
            <a>早上不省人事</a>
            </span>
          </li>

          <li>
            <a>
              <img src="http://m.qiyipic.com/image/20170622/7f/f3/v_112600707_m_601_m1_284_160.jpg" alt="">
            </a>
            <span >
          <span>八旬老人竟然爱这个</span>
            <a>看完之后儿女很生气</a>
            </span>
          </li>
          <span></span>
          <li>
            <a>
              <img src="http://m.qiyipic.com/image/20170622/fe/df/v_112600843_m_601_m1_284_160.jpg" alt="">
            </a>
            <span >
          <span>墙内竟然出现死尸</span>
            <a>警察终于破案了</a>
            </span>
          </li>
        </ul>
        </li>
        <li class="bot_nav">
          <ul class="bot_ul">
            <li>
              <span>
                更多妹子
                <i class="iconfont icon-nvrenzhuanhuan01
"></i>
              </span>
            </li>
            <span class="border"></span>
            <li>
              <span>
                 更多票子
                <i class="iconfont icon-qian"></i>
              </span>
            </li>
            <span class="border"></span>
            <li>
              <span>
                 更多汉子
                <i class="iconfont icon-nanren1"></i>
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
</template>

<script>
    export default{}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .eq_daycons{
    width: 100%;
    .eq_day_ul{
      width: 100%;
      display: flex;
      flex-direction: column;
      .day-title{
        width: 100%;
        height: .33rem;
        box-sizing: border-box;
        padding: 0.05rem 0;
        display: flex;
        .i_one{
          text-align: left;
          width: 10%;
          font-size: .2rem;
          color: #7ff2a2;
        }
        .i_tow{
          text-align: right;
          width: 4%;
          font-size: .16rem;
          line-height: .25rem;
          color: #666666;
        }
        a{
          flex:1;
          font-size: .14rem;
          text-align: right;
          color: #666666;
          line-height: .25rem;
        }
        span{
          display: block;
          width: 22%;
          height: 100%;
          font-size: .16rem;
          color: #454141;
        }
      }
      .list_title{
        width: 100%;
        height: .50rem;
        display: flex;
        span{
          display: block;
          width: 80%;
          height: 100%;
          display: flex;
          flex-direction: column;
          a{
            display: block;
            flex: 1;
          }
          .a_one,.a_tow{
            display: flex;
            align-items: center;
            font-size: .14rem;
            color: #83fe83;
            span{
              flex: 1;
              color: #93883c;
              font-size: .14rem;
              text-indent: 3%;
              line-height:.28rem;
            }
          }
        }
        .rig_a{
          flex:1;
          display: flex;
          span{
            width: 70%;
            height: 100%;
            font-size: .3rem;
            color: #7ff2a2;
            line-height: .5rem;
            text-align: right;
          }
          i{
            flex: 1;
            line-height: .45rem;
            font-size: .2rem;
            text-align: right;
          }
        }
      }
      .list_img{
        width: 100%;
       .list_ul{
         width: 100%;
         display: flex;
         flex-wrap: wrap;
         li{
           width: 49.2%;
           display: flex;
           flex-direction: column;
           a{
             display: block;
             width: 100%;
             height:.66rem;
             img{
               display: block;
               width: 100%;
               height: 100%;
             }
           }
           span{
             width: 100%;
             height: .40rem;
             display: flex;
             flex-direction: column;
             box-sizing: border-box;
             padding: .03rem 0;
             span{
               flex: 1;
               font-size: .1rem;
               color: #000000;
             }
             a{
               flex: 1;
               font-size: .08rem;
               color: #aaaaaa;
             }
           }
         }
         span{
           width: 1.5%;
           display: block;
         }
       }
      }
      .bot_nav{
        width: 100%;
        border-top: 1px solid #aaaaaa;
        .bot_ul{
          width: 100%;
          display: flex;
          li{
            flex: 1;
            height: .33rem;
            span{
              display: block;
              font-size: .1rem;
              color: #00AA00;
              text-align: center;
              line-height: .33rem;
              i{
                font-size: .1rem;
                color: #00AA00;
                text-align: center;
                line-height: .33rem;
              }
            }
          }
          .border{
            border: 0.1px solid #eaeaea;
            height: .22rem;
            margin-top: .03rem;
          }
        }
      }
    }
  }
</style>
