#Project setup

```sh
$ vagrant up
$ vagrant provision
$ vagrant ssh
$ cd /project
$ npm install
$ sudo npm install -g bower
$ bower install
$ sudo grunt serve
```

Then on your own machine:

edit /etc/hosts and add:

192.192.1.10 vagrant.dobrafaza.pl

Done.

#Deploy

First you have to have chef and

```sh
$ sudo yum install ruby-devel gcc
$ gem install knife-solo
```

Then you can execute deploy script

```sh
$ knife ssh ec2-54-200-237-88.us-west-2.compute.amazonaws.com 'sudo chef-client' -m -x ubuntu -i /home/glasek/.ssh/amazon.pem
```