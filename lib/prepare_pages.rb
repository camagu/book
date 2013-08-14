def prepare_pages
  prefix = '/pages/'

  page_items.each do |page|
    page[:background] = page.identifier[prefix.length..-1].chomp('/') + '.jpg'
  end
end
