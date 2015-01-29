# See https://docs.chef.io/config_rb_knife.html for more information on knife configuration options

current_dir = File.dirname(__FILE__)
log_level                :info
log_location             STDOUT
node_name                "guasek"
client_key               "#{current_dir}/guasek.pem"
validation_client_name   "dobrafaza-validator"
validation_key           "#{current_dir}/dobrafaza-validator.pem"
chef_server_url          "https://api.opscode.com/organizations/dobrafaza"
cache_type               'BasicFile'
cache_options( :path => "#{ENV['HOME']}/.chef/checksums" )
cookbook_path            ["#{current_dir}/../cookbooks"]
