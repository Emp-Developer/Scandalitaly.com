function headerSize() {
  var $headerHeight = $('div#shopify-section-header').outerHeight();
  $('#PageContainer').css('padding-top', $headerHeight);
}

$(window).on("load", headerSize);
$(window).on("resize", $.debounce(500, headerSize));