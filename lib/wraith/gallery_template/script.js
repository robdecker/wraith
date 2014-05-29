$(window).load(function() {
  var counter = 0;

  $('.short-screenshot').on('click', function(e) {
    e.preventDefault();

    var $this = $(this),
        $group = $this.closest('.image-group'),
        $images = $group.find('a');
        selection = $images.index($this.parent());
        content = "";
        controls = "";

    $images.each(function(i) {
      $this = $(this);
      src = $this.attr('href');
      title = $this.next().html();
      if (src) {
        content += "<div class='img'><img src='" + src + "'/></div>";
        controls += "<li><a href='#' data-target='" + i + "'>" + title + "</a></li>";
      }
    });

    controls += "<li><a class='close' href='#' data-target='close'>Close X</a></li> "
    $('.overlay').html(content).addClass('active');
    $('.controls').html(controls).show();
    $('.overlay .img').eq(selection).addClass('top');
    counter = selection;


    $('.controls a').on('click', function(e) {
      e.preventDefault();
      $this = $(this);
      dataTarget = $this.attr('data-target');
      if (dataTarget == "close" ) {
        $('.overlay').html("").removeClass('active');
        $('.controls').html("").hide();
      }
      else {
        $('.overlay .img').removeClass('top');
        $('.overlay .img').eq(dataTarget).addClass('top');
      }
    });

  });
});
