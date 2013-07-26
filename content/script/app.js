<%= @items['/vendor/jquery/'].compiled_content %>
<%= @items['/vendor/jquery-hammer/'].compiled_content %>

Array.prototype.has = function(element) {
  return this.indexOf(element) !== -1;
};

$(function() {
  (function() {
    var handles = $('.page-0').hammer(),
        target  = handles.parents('.chapter');

    handles.not(':first').on('swiperight', function() {
      target.css('left', '+=' + $(this).width());
    });

    handles.not(':last').on('swipeleft', function() {
      target.css('left', '-=' + $(this).width());
    });
  }());

  (function() {
    $('.section').each(function() {
      var handles = $(this).find('.page').hammer(),
          target  = handles.parents('.chapter');

      handles.not(':last').on('swipeup', function() {
        target.css('top', '-=' + $(this).height());
      });

      handles.not(':first').on('swipedown', function() {
        target.css('top', '+=' + $(this).height());
      });
    });
  }());
});
