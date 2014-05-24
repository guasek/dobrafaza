execute "build npm" do
  user "dobrafaza"
  cwd "/home/dobrafaza/deploy/current"
  command "npm install --production"
end