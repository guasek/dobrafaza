template '/etc/init.d/dobrafaza' do
  source 'dobrafaza.conf.erb'
  mode 0644
end

service 'dobrafaza' do
  action :stop
  Chef::Provider::Service::Upstart
end

service 'dobrafaza' do
  action :start
  Chef::Provider::Service::Upstart
end