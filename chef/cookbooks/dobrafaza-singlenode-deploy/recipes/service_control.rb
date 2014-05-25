template '/etc/init/dobrafaza.conf' do
  source 'dobrafaza.conf.erb'
  mode 0440
end

service 'dobrafaza' do
  action :stop
  provider Chef::Provider::Service::Upstart
end

service 'dobrafaza' do
  action :start
  provider Chef::Provider::Service::Upstart
end