$('.ripple').click(function(e){
  var ripple = $('<span class="rippling">');
  var xPos = e.pageX - $(this).offset().left,
      yPos = e.pageY - $(this).offset().top,
      animateSize = parseInt(Math.max($(this).width(), $(this).height()) * Math.PI),
      size = 0;
  ripple.css({
    top: yPos,
    left: xPos,
    width: size,
    height: size
  });
  ripple.appendTo($(this)).animate({
    width: animateSize,
    height: animateSize,
    opacity: 0
  }, 500, function() {
    $(this).remove();
  });
})
// $('input.card-number').payment('formatCardNumber');
$('.card-number').on('keypress change', function () {
  if($(this).val().length < 19){
    $(this).val(function (index, value) {
      return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    });
  }
}); 

$('.card-number').on('keypress change', function () {
  if($(this).val().length < 19){
    $(this).val(function (index, value) {
      return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    });
  }
}); 