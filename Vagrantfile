# -*- mode: ruby -*-
# vi: set ft=ruby :

VM = 'devway'
PORT = 2525

Vagrant.configure(2) do |config|
  # Selecting Cent OS 7.0 Box
  config.vm.box = 'chef/centos-7.0'

  # Proxy network, Node: 3000 & Apache: 1111
  config.vm.network :forwarded_port, guest: 3000, host: PORT, auto_correct: true

  # Virtualbox setup
  config.vm.define VM
  config.vm.provider :virtualbox do |vb|
    vb.name = VM
  end

  # Fixing issue: ´stdin: is not a tty´
  ssh_fix = 'bash -c "BASH_ENV=/etc/profile exec bash"'
  config.ssh.shell = ssh_fix unless ARGV[0] == 'ssh'

  # Adding omnibus & berkshelf plugins
  config.omnibus.chef_version = :latest
  config.berkshelf.enabled = true
  config.berkshelf.berksfile_path = './Berksfile'

  # Chef provisioning
  config.vm.provision :chef_solo do |chef|
    chef.add_recipe VM
    chef.custom_config_path = 'Vagrantfile.chef'
  end

  # Start node app
  config.vm.provision :shell do |s|
    s.privileged = false
    s.inline = 'cd /vagrant && pm2 start pm2.json'
  end
end
