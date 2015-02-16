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

192.192.1.10 vagrant.dobrafaza.com

Done.

#Deploy

First you have to have chef and

```sh
$ sudo yum install ruby-devel gcc
$ gem install knife-solo
```

Then you can execute deploy script

```sh
$ knife ssh your.aws.instance.public.ip 'sudo chef-client' -m -x ubuntu -i /path/to/amazon.pem
```

#Bring up new node:

Set up new instance of server then

```sh
$ knife bootstrap your.aws.instance.public.ip -x ubuntu -i /path/to/amazon.pem --sudo
```

Go to chef website and add cookbooks to run list then:
```sh
$ knife ssh your.aws.instance.public.ip 'sudo chef-client' -m -x ubuntu -i /path/to/amazon.pem
```