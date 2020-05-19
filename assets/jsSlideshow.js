var Shopify = window.Shopify || {};
Shopify.theme.jsSlideshow = {
  init: function($section) {
    $('.homepage_slider').each(function (index, value){
      var homepageSlider = $(this);
      var slideshowAnimation = homepageSlider.data('slideshow-animation');
      var slideshowSpeed = homepageSlider.data('slideshow-speed');

      homepageSlider.flexslider({
        touch: true,
        controlNav: true,
        animation: slideshowAnimation,
        slideshowSpeed: slideshowSpeed ? slideshowSpeed*1000 : 10*1000,
        start: function(){
          $('.homepage_slider').removeClass('slider-loading')
        }
      });

      if($('.slides li', homepageSlider).length == 1) {
        $('.flex-direction-nav', homepageSlider).hide()
      }
    });
  },
  blockSelect: function(blockId, $parentSection) {
    var $blocks = $parentSection.find('li[data-block-id]:not(".clone")');
    var blockIdsArray = $blocks.map(function() {
      return String($(this).data('block-id'));
    });
    var slider = $parentSection.find('.flexslider').data('flexslider');

    if (slider) {
      slider.pause();

      for(var i = 0; i < blockIdsArray.length; i++){
        if(blockIdsArray[i] === blockId){
          var currentSlide = i;
          if (currentSlide !== slider.currentSlide){
            slider.flexAnimate(parseInt(currentSlide));
          }
        }
      }
    }
  },
  blockDeselect: function($parentSection) {
    var slider = $parentSection.find('.flexslider').data('flexslider');
    if(slider) {
      slider.play();
    }
  },
  unload: function($target) {
    var slider = $target.find('.homepage_slider');

    // Destroy slider
    if (slider && slider.data('flexslider')){

      var slider = slider.data('flexslider');

      // Namespaced class selector
      var classNamespace = '.' + slider.vars.namespace;

      // Remove control elements if present
      if (slider.vars.controlNav) slider.controlNav.closest(classNamespace + 'control-nav').remove();

      // Remove direction-nav elements if present
      if (slider.vars.directionNav) slider.directionNav.closest(classNamespace + 'direction-nav').remove();

      // Remove pauseplay elements if present
      if (slider.vars.pausePlay) slider.pausePlay.closest(classNamespace + 'pauseplay').remove();

      // Remove any flexslider clones
      slider.find('.clone').remove();

      // Remove events on slider
      slider.unbind(slider.vars.eventNamespace);

      // Remove the .flex-viewport div
      if ( slider.vars.animation != "fade" ) slider.container.unwrap();

      // Remove generated CSS (could collide with 3rd parties)
      slider.container.removeAttr('style')

      // Remove events on slider
      slider.container.unbind(slider.vars.eventNamespace);

      // Remove generated CSS (could collide with 3rd parties)
      slider.slides.removeAttr('style');

      // Remove slide active class
      slider.slides.filter(classNamespace + 'active-slide').removeClass(slider.vars.namespace + 'active-slide');

      // Remove events on slides
      slider.slides.unbind(slider.vars.eventNamespace);

      // Remove events from document for this instance only
      $(document).unbind(slider.vars.eventNamespace + "-" + slider.id);

      // Remove events from window for this instance only
      $(window).unbind(slider.vars.eventNamespace + "-" + slider.id);

      // Stop the interval
      slider.stop();

      // Remove data
      slider.removeData('flexslider');
    }
  }
}
