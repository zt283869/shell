<template>
    <div class="eq_hot">
      <ul class="eq_ul">
        <li class="lione">
          <ul class="eq_heder">
            <li class="eq_heder_one"><i class="iconfont icon-vip"></i></li>
            <span class="spanleft">
              <router-link to="/run">正在热播</router-link>
            </span>
            <span class="spanright">实时热播榜</span>
            <li class="eq_heder_later"><i class="iconfont icon-you"></i></li>
          </ul>
        </li>
        <li class="litwo">
          <ul class="litwo_ul">
            <li>
              <a><img src="http://m.qiyipic.com/image/20170531/5c/10/a_100054479_m_601_195_260.jpg" alt=""></a>
              <span>
                <span class="bot_spanon">不期而遇</span>
              </span>
            </li>
            <span></span>
            <li>
              <a><img src="http://m.qiyipic.com/image/20170620/4d/e2/a_100055589_m_601_m2_195_260.jpg" alt=""></a>
              <span>
                <span class="bot_spanon">盲侠大律师</span>
              </span>
            </li>
            <span></span>
            <li>
              <a><img src="http://m.qiyipic.com/image/20170605/90/65/a_100049242_m_601_m2_195_260.jpg" alt=""></a>
              <span>
                 <span class="bot_spanon">寻人大师</span>
              </span>
            </li>
            <li>
              <a><img src="http://m.qiyipic.com/common/lego/20170622/e8a415c63417409992eaf9bea651b9b7.gif" alt=""></a>
              <span>
                 <span class="bot_spanon">夏至未来</span>
              </span>
            </li>
            <span></span>
            <li>
              <a><img src="http://m.qiyipic.com/image/20170609/f7/9c/a_100036831_m_601_m1_195_260.jpg" alt=""></a>
              <span>
                 <span class="bot_spanon">深夜食堂</span>
              </span>
            </li>
            <span></span>
            <li>
              <a><img src="http://m.qiyipic.com/image/20170511/59/ba/a_100051918_m_601_m1_195_260.jpg" alt=""></a>
              <span>
                 <span class="bot_spanon">采花大盗</span>
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

<style rel="stylesheet/scss" lang="scss"  scoped>
.eq_hot{
  width: 100%;
  height: 3.3rem;
  .eq_ul{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .lione{
      width: 100%;
      height: .3rem;
      box-sizing: border-box;
      padding: .05rem 0;
      .eq_heder{
        width: 100%;
        height: 100%;
        display: flex;
        .eq_heder_one{
          width: 10%;
          line-height: .2rem;
          i{
            display: block;
            color: #cbcb69;
          }
        }
        .spanleft{
          font-size: .16rem;
          text-align: left;
        }
        .spanright{
          font-size: .15rem;
          text-align: right;
          color: #565050;
        }
        .eq_heder_later{
          width: 5%;
          text-align: right;
          line-height: .2rem;
          i{
            display: block;
            color: #0c0c0b;
          }
        }
        span{
          flex: 1;
        }
      }
    }
    .litwo{
     flex: 1;
      .litwo_ul{
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        span{
          width: 3%;
          height: 1.5rem;
        }
        li{
          width: 31%;
          display: flex;
          flex-direction: column;
          height: 1.5rem;
          a{
            flex: 1;
            img{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          span{
            width: 100%;
            height: .33rem;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding: .01rem 0 .01rem 0;
            .bot_spanon{
              flex: 1;
              font-size: .15rem;
              line-height: .15rem;
            }

          }
        }
      }
    }
  }
}
</style>
