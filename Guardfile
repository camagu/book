# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'nanoc' do
  watch('nanoc.yaml')
  watch('Rules')
  watch(%r{^(content|layouts|lib)/.*$})
end

guard 'livereload' do
  watch('nanoc.yaml')
  watch('Rules')
  watch(%r{^(content|layouts|lib)/.*$})
end
