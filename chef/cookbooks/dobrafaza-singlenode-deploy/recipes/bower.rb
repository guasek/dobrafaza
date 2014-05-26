execute "install Bower npm package" do
  user "root"
  command "npm install -g bower"
  not_if "npm ls 2> /dev/null | grep 'bower'"
end
