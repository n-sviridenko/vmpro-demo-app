# -*- mode: ruby -*-
# vi: set ft=ruby :

app = {
  :name        => 'demo-app',
  :box         => 'manala/app-dev-debian',
  :box_version => '~> 3.0.0',
  :aliases     => ['api.demo-app.dev'],
  :box_memory  => 4096
}

Vagrant.require_version '>= 1.9.1'

Vagrant.configure(2) do |config|

  # Ssh
  config.ssh.username      = 'app'
  config.ssh.forward_agent = true

  # Vm
  config.vm.box           = app[:box]
  config.vm.box_version   = app[:box_version]
  config.vm.hostname      = app[:name] + '.dev'
  config.vm.network       'private_network', ip: '192.168.55.5'
  config.vm.define        'localhost' do |localhost| end

  # Share the whole project
  config.vm.synced_folder '.', '/srv/app',
    type: 'nfs',
    mount_options: ['nolock', 'actimeo=1', 'fsc']

  # Vm - Provider - Virtualbox
  config.vm.provider :virtualbox do |virtualbox|
    virtualbox.name   = app[:name]
    virtualbox.memory = app[:box_memory]
    virtualbox.customize ['modifyvm', :id, '--natdnshostresolver1', 'on']
    virtualbox.customize ['modifyvm', :id, '--natdnsproxy1', 'on']
  end

  # Vm - Provision - Dotfiles
  for dotfile in ['.ssh/config', '.gitconfig', '.gitignore', '.composer/auth.json']
    if File.exists?(File.join(Dir.home, dotfile)) then
      config.vm.provision dotfile, type: 'file', run: 'always' do |file|
        file.source      = '~/' + dotfile
        file.destination = '/home/' + config.ssh.username + '/' + dotfile
      end
    end
  end

  # Vm - Provision - Setup
  for playbook in ['ansible', 'install']
    config.vm.provision playbook, type: 'ansible_local' do |ansible|
      ansible.provisioning_path = '/srv/app/ansible'
      ansible.version           = (playbook == 'ansible') ? 'latest' : ''
      ansible.playbook          = playbook + '.yml'
      ansible.inventory_path    = '/etc/ansible/hosts'
      ansible.tags              = ENV['ANSIBLE_TAGS']
      ansible.extra_vars        = JSON.parse(ENV['ANSIBLE_EXTRA_VARS'] || '{"manala":{"update":true}}')
    end
  end

  # Hosts
  if Vagrant.has_plugin?('vagrant-hostmanager')
      config.hostmanager.enabled     = true
      config.hostmanager.manage_host = true
      if app[:aliases].any?
          config.hostmanager.aliases = ''
          for item in app[:aliases]
              config.hostmanager.aliases += item + ' '
          end
      end
  end

end