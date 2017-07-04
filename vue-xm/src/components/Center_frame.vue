<template>
    <div class="cen_frame">
      <div class="swiper-container" id="swiper-container2" style="width:100%;">
        <div class="swiper-wrapper">
          <div class="swiper-slide active-nav">
            推荐
          </div>
          <div class="swiper-slide">
            楚乔传
          </div>
          <div class="swiper-slide">
            热点
          </div>
          <div class="swiper-slide active-nav">
            电视剧
          </div>
          <div class="swiper-slide">
            电影
          </div>
          <div class="swiper-slide">
            综艺
          </div>
        </div>
      </div>

      <div class="swiper-container" id="swiper-container3" style="width:100%;">
        <div class="swiper-wrapper">
          <div class="swiper-slide blue-slide">
            <head-slide></head-slide>
            <center-seg></center-seg>
            <center-hos></center-hos>
            <center-seg></center-seg>
            <center6-hot></center6-hot>
            <center-seg></center-seg>
            <center-day></center-day>

          </div>
          <div class="swiper-slide red-slide">

          </div>
          <div class="swiper-slide orange-slide">
          </div>
          <div class="swiper-slide blue-slide">


          </div>
          <div class="swiper-slide red-slide">

          </div>
          <div class="swiper-slide orange-slide">

          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import '../js_frame/common'
  import '../js_frame/all.css'
  import '../js_frame/jq'
  import HeadSlide from './Head_slide.vue'
  import CenterHos from './Center_hot.vue'
  import Center6Hot from './Center_6hot.vue'
  import CenterSeg from './Center_seg.vue'
  import CenterDay from './Center_daycons.vue'
    export default{
      components:{
        HeadSlide,
        CenterHos,
        Center6Hot,
        CenterSeg,
        CenterDay

      }
      ,
      mounted:function () {
        var mySwiper2 = new Swiper('#swiper-container2',{
          watchSlidesProgress : true,
          watchSlidesVisibility : true,
          slidesPerView : 3,
          onTap: function(){
            mySwiper3.slideTo( mySwiper2.clickedIndex)
          }
        })
        var mySwiper3 = new Swiper('#swiper-container3',{

          onSlideChangeStart: function(){
            updateNavPosition()
          }

        })

        function updateNavPosition(){
          $('#swiper-container2 .active-nav').removeClass('active-nav')
          var activeNav = $('#swiper-container2 .swiper-slide').eq(mySwiper3.activeIndex).addClass('active-nav');


          if (!activeNav.hasClass('swiper-slide-visible')) {
            console.log(1);
            if (activeNav.index()>mySwiper2.activeIndex) {
              console.log(2);
              var thumbsPerNav = Math.floor(mySwiper2.width/activeNav.width())-1
              mySwiper2.slideTo(activeNav.index()-thumbsPerNav)
            }
            else {
              console.log(3);
              mySwiper2.slideTo(activeNav.index())
            }
          }
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cen_frame{
  width: 100%;
  height: 100%;
  position: relative;
  #swiper-container2 .swiper-slide{
    line-height:2.6 !important;
    color:#5a5151 !important;
    font-size:14px !important;
    background:#eee !important;
  }
  #swiper-container2 .active-nav{
    color:#20bc22 !important;
    border-bottom: 1px solid #20bc22;
  }
  #swiper-container3{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    border-top:1px solid #e8dddd;
    .swiper-slide{
      box-sizing: border-box;
      padding: .06rem 2%;
    }
  }
  #swiper-container2{
    height: .30rem;
    text-align: center;
    background: #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  #swiper-container2 .swiper-slide{
    line-height: .30rem;

  }


}
</style>
