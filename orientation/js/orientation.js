 /**
   * orientation change for youtube
  */

  $(window).on( "orientationchange resize", function() {
    if(Math.abs(window.orientation) === 90 ) {
      $(".iframeWrap").css("display","block");
      alert("Thank a lot Mr Carlos. (>_<)");
    
      // スクロールを無効にする
      $(window).on('touchmove.noScroll', function(e) {
          e.preventDefault();
      });
      var scrollTop = $(window).scrollTop();
      $('.page-container').css({'position':'fixed','top':-scrollTop});

      // 移動＋フェードイン初期化
      new WOW().init();
    } else {
      $(".iframeWrap").css("display","none");

      // スクロール無効を解除する
      $(window).off('.noScroll');
      $('.page-container').css({'position':'static','top':'0'});
      $('html,body').scrollTop(scrollTop);
    }
  });
