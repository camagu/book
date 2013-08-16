def prepare_pages
  old_prefix = '/pages/'
  new_prefix = '/images/chapters/'

  page_items.each do |page|
    # TODO Use path
    page[:background] = page.identifier
                            .sub(old_prefix, new_prefix).chomp('/') + '.jpg'
  end
end
