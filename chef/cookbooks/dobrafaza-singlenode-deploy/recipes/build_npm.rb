execute "build npm" do
  cwd "/home/dobrafaza/deploy/current"
  command "npm install --production"
end