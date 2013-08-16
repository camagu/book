<%= @items['/vendor/jquery/'].compiled_content %>
<%= @items['/vendor/jquery-hammer/'].compiled_content %>
<%= @items['/vendor/jquery-swipable/'].compiled_content %>

$(function() {

  /**
  * Navigation
  **/
  $('.chapter').swipable({
    direction: 'horizontal',
    handles:   '.page-0'
  }).on('swiped', function() {
    $('.chapter').trigger('changedsection');
  });

  $('.section').each(function() {
    $('.chapter').swipable({
      direction: 'vertical',
      handles:   $(this).find('.page')
    });
  }).on('swiped', function() {
    $('.chapter').trigger('changedpage');
  });

  /**
   * Chapter 3 menu
   */
  $('.chapter').hammer().on('doubletap', function(e) {
    e.preventDefault();
    $('.navigator').addClass('visible');
  });

  $('.navigator').hammer().on('doubletap', function(e) {
    e.preventDefault();
    $(this).removeClass('visible');
  });

  /**
  * Widgets
  **/
  $('.interview').swipable();

  /**
   * Infographics
   */
  $('#infographic-paisaje').on('load', function() {
    var

    svg      = $(this.getSVGDocument()).find('svg'),
    groups   = svg.children('g'),
    $element = $(this),

    play = function() {
      var delay = 0;

      groups.each(function() {
        var
        group = $(this),
        to = setTimeout(function() {
          var si = setInterval(function() {
            var y = parseInt(group.attr('transform').match(/(\-?\d+)\)/)[1], 10);
            y += 75;
            y = Math.min(0, y);
            group.attr('transform', 'translate(0, '+y+')');

            if (y === 0) {
              clearInterval(si);
            }
          }, 50);
        }, delay);

        delay += 250;
      });
    };

    groups.attr('transform', 'translate(0, -2000)');

    $('.chapter').on('changedsection changedpage', function() {
      var offset = $element.offset();
      if (offset.top === 1 && offset.left === 0) {
        play();
      }
    });
  });
});
