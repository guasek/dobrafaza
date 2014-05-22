#
# Cookbook: grunt_cookbook
# install_grunt_prereq
#

#Install nodejs and NPM
include_recipe "nodejs::install_from_source"
include_recipe "nodejs::npm"

