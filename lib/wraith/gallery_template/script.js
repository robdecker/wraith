$(window).load(function() {
  $('.short-screenshot').on('click', function(e) {
    e.preventDefault();

    var $this = $(this),
        $group = $this.closest('.image-group'),
        $images = $group.find('a');
        content = "";

    $images.each(function(i) {
      $this = $(this);
      src = $this.attr('href');
      if (src) {
        content += "<img src='" + src + "'/>";
      }
    });

    $('.overlay').html(content).addClass('active');

  });

  var counter = "0";

  $('.controls a').on('click', function(e) {
    e.preventDefault();

    $('.overlay img').removeClass('top');
    $('.overlay img').eq(counter).addClass('top');
    counter = counter + 1;
  });
});
