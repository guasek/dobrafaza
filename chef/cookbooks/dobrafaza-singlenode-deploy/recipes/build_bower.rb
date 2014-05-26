execute "build bower" do
  cwd "/home/dobrafaza/deploy/current"
  command "bower cache clean --allow-root"
  command "bower install --production --allow-root"
end