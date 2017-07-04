<template>
    <div class="eq_slide">
      <div class="swiper-container" id="swi">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a>
              <img src="http://m.qiyipic.com/common/lego/20170621/900370cafdee4a97ae832fff82946ed4.jpg" alt="">
            </a>
          </div>
          <div class="swiper-slide">
            <a>
              <img src="http://m.qiyipic.com/common/lego/20170620/cf8d18520cf44ecb8e8cd067e24d91cb.jpg" alt="">
            </a>
          </div>
          <div class="swiper-slide">
            <a>
              <img src="http://m.qiyipic.com/common/lego/20170621/123f402c1ea3436bb43710c8abd42b3b.jpg" alt="">
            </a>
          </div>
          <div class="swiper-slide">
            <a>
              <img src="http://m.qiyipic.com/common/lego/20170621/0f022114e47c4ebcaf9a0b49fb39d81c.jpg" alt="">
            </a>
          </div>
          <div class="swiper-slide">
            <a>
              <img src="http://m.qiyipic.com/common/lego/20170621/900370cafdee4a97ae832fff82946ed4.jpg" alt="">
            </a>
          </div>
          <div class="swiper-slide">
            <a>
              <img src="http://m.qiyipic.com/common/lego/20170617/87b1857555b74ef8acdb500565206595.jpg" alt="">
            </a>
          </div>
        </div>
        <div class="swiper-pagination" style="bottom: -3px"></div>
        <div class="cenner_div">
          <span>
            <span></span>
            <i></i>
          </span>
          <i>
            <i></i>
            <a></a>
          </i>
        </div>
      </div>
    </div>
</template>

<script>
    export default{
      mounted:function () {
        var mySwiper = new Swiper('#swi', {
          autoplay: 3000,
          loop:true,
          autoplayDisableOnInteraction : false,
          pagination : '.swiper-pagination',
          onSlideChangeEnd:function(swiper){
            var span = ['万古长青','手游正式版','小八','少年团','楚乔转','小萝莉陪你海','万古长青']
            var i = ['2-7','','2-8','','','更新第七集','']
            $(".cenner_div").find("span").find("i").html();
            $(".cenner_div").find("span").find("i").html(span[swiper.activeIndex-1]);
            $(".cenner_div").find("i").find("i").html();
            $(".cenner_div").find("i").find("i").html(i[swiper.activeIndex-1]);
          }
        })
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.eq_slide{
  width: 100%;
  height: 1.5rem;
  box-sizing: border-box;
  .swiper-container{
    width: 100%;
    height: 100%;
    position: relative;
    .cenner_div{
      position: absolute;
      width: 100%;
      height: .2rem;
      left: 0;
      bottom: 0;
      background: rgba(0,0,0,.5);
      font-size: .15rem;
      line-height: .2rem;
      z-index: 100;
      display: flex;
      span{
        width: 70%;
        font-size:.16rem;
        color: white;
        display: flex;
        span{
          width: 3%;
        }
        i{
          flex: 1;
          text-align: left;
          line-height: .21rem;
        }
      }
      i{
        color: white;
        flex: 1;
        font-size: .16rem;
        font-style: normal;
        display: flex;
        text-align: right;

        i{
         flex: 1;
          display: block;
          line-height: .21rem;
        }
        a{
          display: inline-block;
          width: 6%;
        }
      }
    }
    .swiper-wrapper{
      width:100%;
      height: 100%;
      .swiper-slide{
        a{
          display: block;
          width: 100%;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
