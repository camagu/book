// Project lib

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
