#
# Cookbook Name:: dobrafaza-singlenode-deploy
# Recipe:: default
#
# Copyright 2014, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
include_recipe "dobrafaza-singlenode-deploy::users"
include_recipe "dobrafaza-singlenode-deploy::bower"
include_recipe "dobrafaza-singlenode-deploy::deploy"
include_recipe "dobrafaza-singlenode-deploy::build_npm"
include_recipe "dobrafaza-singlenode-deploy::build_bower"
include_recipe "dobrafaza-singlenode-deploy::dependencies"
include_recipe "dobrafaza-singlenode-deploy::service_control"