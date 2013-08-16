def generate_chapters
  pages.each_pair do |chapter, sections|
    layout = @layouts.map(&:identifier).find { |i| i == "/chapters/#{chapter}/"} || 'elements/chapter'

    @items << Nanoc::Item.new(
      "==render '#{layout}', chapter: '#{chapter}'",
      { title: "Capitulo #{chapter}",
        stylesheets: ["/stylesheets/chapters/#{chapter}/"] },
      "/chapter/#{chapter}"
    )
  end
end
