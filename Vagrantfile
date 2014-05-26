# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = 'ubuntu-trusty-14.04'
  config.vm.box_url = 'https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box'
  config.vm.hostname = 'vagrant.dobrafaza.pl'

  config.vm.network :forwarded_port, guest: 9000, host: 9000
  config.vm.network :forwarded_port, guest: 3306, host: 3306

  config.vm.network :private_network, ip: '192.192.1.2'

  config.ssh.forward_agent = true
  
  if RUBY_PLATFORM =~ /mingw32/
    config.vm.synced_folder '.', '/project'
  else
    config.vm.synced_folder '.', '/project', nfs: true
  end

  config.vm.provision "chef_solo" do |chef|
  
    chef.cookbooks_path = "chef/cookbooks"
    chef.roles_path = "chef/roles"
    chef.data_bags_path = "chef/data_bags"
#    chef.log_level = :debug
#    chef.add_role "dobrafaza-single-node"
  end
end
