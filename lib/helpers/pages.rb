module PagesHelper
  def page_items
    @items.select { |i| i.identifier.start_with?('/pages') }
          .sort   { |a, b| a.identifier <=> b.identifier }
  end

  def pages
    pages = {}

    page_items.each do |item|
      segments = item.identifier.sub('/pages/', '').split('/')

      current = pages
      segments.each_with_index do |segment, i|
        current[segment] ||= (i == segments.length - 1 && item) || { }
        current = current[segment]
      end
    end

    pages
  end
end
