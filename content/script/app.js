<%= @items['/vendor/jquery/'].compiled_content %>
<%= @items['/vendor/jquery-hammer/'].compiled_content %>

Array.prototype.has = function(element) {
  return this.indexOf(element) !== -1;
};

(function($) {
  $.fn.swipable = function(options) {
    var

    settings = $.extend({
      direction: 'horizontal',
      handles: null
    }, options),

    findHandles = function(swipable, handles) {
      if (null == handles) {
        handles = swipable.children();
      } else if (typeof handles === 'string') {
        handles = swipable.find(handles);
      }

      return handles.hammer();
    },

    onSwipe = function(e) {
      var swipable   = e.data.swipable,
          property   = e.data.property,
          dimension  = e.data.dimension,
          op         = e.data.op,
          properties = {};

        e.preventDefault();
        if (!swipable.is(':animated')) {
          properties[property] = op+'='+$(this)[dimension]();
          swipable.animate(properties, 500, function() {
            swipable.trigger('swiped');
          });
        }
    };

    return this.each(function() {
      var swipable = $(this),
          swipe, property, dimension,
          handles = findHandles(swipable, settings.handles);

      if (settings.direction === 'horizontal') {
        swipe     = {prev: 'swiperight', next: 'swipeleft'};
        property  = 'left';
        dimension = 'outerWidth';
      } else if (settings.direction === 'vertical') {
        swipe     = {prev: 'swipedown', next: 'swipeup'};
        property  = 'top';
        dimension = 'outerHeight';
      } else {
        throw 'Unrecognized direction "'+settings.direction+'".';
      }

      handles.not(':first').on(swipe.prev, {
        swipable:  swipable,
        property:  property,
        dimension: dimension,
        op:        '+'
      }, onSwipe);

      handles.not(':last').on(swipe.next, {
        swipable:  swipable,
        property:  property,
        dimension: dimension,
        op:        '-'
      }, onSwipe);
    });
  };
}(jQuery));

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
