<%= @items['/vendor/jquery/'].compiled_content %>
<%= @items['/vendor/jquery-hammer/'].compiled_content %>

Array.prototype.has = function(element) {
  return this.indexOf(element) !== -1;
};

(function($) {
  $.fn.swipable = function(options) {
    var settings = $.extend({
      direction: 'horizontal',
      handles: null
    }, options);

    var findHandles = function(swipable, handles) {
      if (null == handles) {
        handles = swipable.children();
      } else if (typeof handles === 'string') {
        handles = swipable.find(handles);
      }

      return handles.hammer();
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

      handles.not(':first').on(swipe.prev, function(e) {
        e.preventDefault();
        swipable.css(property, '+='+$(this)[dimension]());
      });

      handles.not(':last').on(swipe.next, function(e) {
        e.preventDefault();
        swipable.css(property, '-='+$(this)[dimension]());
      });
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
  });

  $('.section').each(function() {
    $('.chapter').swipable({
      direction: 'vertical',
      handles:   $(this).find('.page')
    });
  });

  /**
  * Widgets
  **/
  $('.interview').swipable();
});
