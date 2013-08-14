def generate_chapters
  pages.each_pair do |chapter, sections|
    @items << Nanoc::Item.new(
      "==render 'chapter', chapter: '#{chapter}'",
      { title: "Capitulo #{chapter}",
        stylesheets: ["/style/chapters/#{chapter.sub('.', '_')}/"] },
      "/chapter/#{chapter}"
    )
  end
end
