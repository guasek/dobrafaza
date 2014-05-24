%w[ /home/dobrafaza /home/dobrafaza/private_code/ /home/dobrafaza/.ssh /home/dobrafaza/deploy ].each do |path|
  directory path do
    owner "dobrafaza"
    group "root"
    mode 00755
    action :create
  end
end

cookbook_file "/home/dobrafaza/private_code/wrap-ssh4git.sh" do
  source "wrap-ssh4git.sh"
  owner "dobrafaza"
  mode 00700
end

cookbook_file "/home/dobrafaza/.ssh/id_dobrafaza_bitbucket" do
  source "id_dobrafaza_bitbucket"
  owner "dobrafaza"
  mode 00600
end

directory "/home/dobrafaza/.ssh" do
  owner "dobrafaza"
  recursive true
end

deploy_branch "/home/dobrafaza/deploy" do
  repo "git@bitbucket.org:guasek/dobrafaza.git"
  user "dobrafaza"
  migrate false
  symlink_before_migrate "Vagrantfile" => "Vagrantfile"
  symlinks nil
  deploy_to "/home/dobrafaza/deploy"
  action :deploy
  ssh_wrapper "/home/dobrafaza/private_code/wrap-ssh4git.sh"
  revision "development"
end

directory "/home/dobrafaza/deploy/current/app/bower_components" do
  owner "dobrafaza"

  group "root"
  mode 00777
  action :create
end


