module Path
  require 'nanoc/helpers/link_to'
  include Nanoc::Helpers::LinkTo

  def path(identifier)
    path = @items[identifier].path
    raise RuntimeError, "Cannot create a link to #{target.inspect} because this target is not outputted (its routing rule returns nil)" if path.nil?

    path
  end

  def relative_path(identifier)
    relative_path_to(path(identifier))
  end
end
