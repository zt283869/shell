<template>
    <div class="eq_6hot">
      <ul class="eq_ul">
        <li class="li_title">爱奇艺6月热播</li>
        <li class="li_banner">
          <img src="http://m.qiyipic.com/image/20170525/c4/c9/a_100027251_m_601_m1_480_270.jpg" alt="">
        </li>
        <li class="li_title_tow">
          <span class="li_title_span_on">万古仙穹</span>
          <span class="li_title_span_two">血➹棋局凌威换名</span>
        </li>
        <li class="li_lsit">
          <ul class="lsit_li_ul">
            <li class="lsit_li_one">
              <a>
                <img src="http://m.qiyipic.com/image/20170614/8f/41/v_112519105_m_601_m1_195_260.jpg" alt="">
              </a>
              <span class="name">非洲黑狗</span>
              <span class="name_text">非洲黑狗的故事</span>
            </li>
            <li class="lsit_li_one">
              <a>
                <img src="http://m.qiyipic.com/image/20170614/7e/0c/v_62650231_m_601_m1_195_260.jpg" alt="">
              </a>
              <span class="name">遍地激情</span>
              <span class="name_text">一个激情的年代</span>
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
.eq_6hot{
  width: 100%;
height: 3.5rem;
  .eq_ul{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column ;
    .li_title{
      width: 100%;
      height: .35rem;
      box-sizing: border-box;
      padding: .1rem 0;
      font-size: .14rem;
    }
    .li_banner{
      width: 100%;
      height: 1.5rem;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .li_title_tow{
      width: 100%;
      height: .44rem;
      box-sizing: border-box;
      padding: .05rem 0;
      display: flex;
      flex-direction: column;
      .li_title_span_on{
        flex: 1;
        font-size: .14rem;
      }
      .li_title_span_two{
        font-size: .12rem;
        color: #201d1d;
        flex:1;
      }
    }
    .li_lsit{
      width: 100%;

      .lsit_li_ul{
        display: flex;
        width: 100%;
        height: 100%;
        li{
          flex: 1;
        }
        .lsit_li_one{
          display: flex;
          flex-direction: column;
          a{
            display: block;
            width: 100%;
            height: .88rem;
            img{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .name{
            width: 100%;
            height: .15rem;
            font-size: .14rem;
          }
          .name_text{
            width: 100%;
            height: .15rem;
            font-size: .12rem;
            color: #686565;
          }
        }
      }
    }
  }
}
</style>
