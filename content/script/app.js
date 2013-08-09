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

  $('.chapter').hammer().on('doubletap', function(e) {
    e.preventDefault();
    window.location = '/capitulo-3/'
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
      var $window = $(window);
      var window_left = $window.scrollLeft();
      var window_top = $window.scrollTop();
      var offset = $element.offset();
      var left = offset.left;
      var top = offset.top;

      if (top + $element.height() >= window_top &&
          top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
          left + $element.width() >= window_left &&
          left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
        play();
      } else {

      }
    });

  });
});
