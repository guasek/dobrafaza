template '/etc/init/dobrafaza.conf' do
  source 'dobrafaza.conf.erb'
  mode 0440
end

service 'dobrafaza' do
  action :enable
  Chef::Provider::Service::Upstart
end

service 'dobrafaza' do
  action :stop
  Chef::Provider::Service::Upstart
end

service 'dobrafaza' do
  action :start
  Chef::Provider::Service::Upstart
end