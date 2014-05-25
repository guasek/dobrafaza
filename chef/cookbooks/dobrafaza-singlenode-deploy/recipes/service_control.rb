template '/etc/init.d/dobrafaza' do
  source 'dobrafaza.conf.erb'
  owner "dobrafaza"
  group "root"
  mode 0777
end

service 'dobrafaza' do
  action :stop
  Chef::Provider::Service::Upstart
end

service 'dobrafaza' do
  action :start
  Chef::Provider::Service::Upstart
end