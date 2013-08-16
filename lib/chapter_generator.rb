def generate_chapters
  pages.each_pair do |chapter, sections|
    @items << Nanoc::Item.new(
      "==render 'partials/chapter', chapter: '#{chapter}'",
      { title: "Capitulo #{chapter}",
        stylesheets: ["/stylesheets/chapters/#{chapter}/"] },
      "/chapter/#{chapter}"
    )
  end
end
