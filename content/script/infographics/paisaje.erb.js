<%= @items['/vendor/jquery/'].compiled_content %>

$(function() {
  $('object').on('load', function() {
    var svg    = $(this.getSVGDocument()).find('svg'),
        groups = svg.children('g'),
        delay  = 1000;

    groups
      .attr('transform', 'translate(0, -2000)')
      .each(function() {
        var
        that = $(this),
        to = setTimeout(function() {
          var si = setInterval(function() {
            var y = parseInt(that.attr('transform').match(/(\-?\d+)\)/)[1], 10);
            y += 200;
            y = Math.min(0, y);
            that.attr('transform', 'translate(0, '+y+')');

            if (y === 0) {
              clearInterval(si);
            }
          }, 100);
        }, delay);

        delay += 1000;
      });
  });
});

