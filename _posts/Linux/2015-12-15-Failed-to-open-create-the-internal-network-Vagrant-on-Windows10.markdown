---
layout: post
title:  "如何在VirtualBox上安装Centos7(带samba服务器)"
date:   2015-08-15 12:13:00
author: 吴珂皓
categories: linux
keywords: VirtualBox, Centos7, samba, Linux
excerpt: 怎样在VirtualBox上安装Centos7服务器，并且配置好samba服务
---
I upgraded my Windows 10 to the last update yesterday and now, when I launch  vagrant up command I have this error :

    ==> default: Booting VM...
    ==> default: Waiting for machine to boot. This may take a few minutes...
    The guest machine entered an invalid state while waiting for it
    to boot. Valid states are 'starting, running'. The machine is in the
    'poweroff' state. Please verify everything is configured
    properly and try again.
    
    If the provider you're using has a GUI that comes with it,
    it is often helpful to open that and watch the machine, since the
    GUI often has more helpful error messages than Vagrant can retrieve.
    For example, if you're using VirtualBox, run `vagrant up` while the
    VirtualBox GUI is open.
    
    The primary issue for this error is that the provider you're using
    is not properly configured. This is very rarely a Vagrant issue.
    When I try with GUI I have this error :
    
    Failed to open/create the internal network 'HostInterfaceNetworking-VirtualBox Host-Only Ethernet Adapter' (VERR_INTNET_FLT_IF_NOT_FOUND).
    Failed to attach the network LUN (VERR_INTNET_FLT_IF_NOT_FOUND).
    I have re-installed VirtualBox 5.0.10 and the extension pack, reconfigured Host-Only Ethernet Adaptater, but always the same error...

Any idea ?

## Solution:

 - Open Windows Network Connections
 - Right click on VirtualBox Host only adapter that created
 - Choose properties
 - Check "VirtualBox NDIS6 Bridged Networking driver"
 - disable and Enable the adapter
 
 
