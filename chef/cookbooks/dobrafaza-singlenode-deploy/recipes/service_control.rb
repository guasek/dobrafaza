template '/etc/init/dobrafaza.conf' do
  source 'dobrafaza.conf.erb'
  owner "dobrafaza"
  group "root"
  mode 0777
end

execute "restart service" do
  user "root"
  command "initctl stop dobrafaza"
  command "initctl start dobrafaza"
end