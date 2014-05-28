template '/etc/init/dobrafaza.conf' do
  source 'dobrafaza.conf.erb'
  owner "dobrafaza"
  group "root"
  mode 0777
end

execute "stop service" do
  user "root"
  command "initctl stop dobrafaza"
end

execute "start service" do
  user "root"
  command "initctl start dobrafaza"
end