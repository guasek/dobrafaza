execute "build npm" do
  cwd "/home/dobrafaza/deploy/current"
  command "apt-get install ruby-dev"
  command "gem install compass"
end