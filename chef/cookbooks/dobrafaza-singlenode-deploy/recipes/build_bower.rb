execute "build bower" do
  user "dobrafaza"
  cwd "/home/dobrafaza/deploy/current"
  command "bower install --production"
end