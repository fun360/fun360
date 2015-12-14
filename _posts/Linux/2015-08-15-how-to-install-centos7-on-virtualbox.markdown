---
layout: post
title:  "如何在VirtualBox上安装Centos7(带samba服务器)"
date:   2015-08-15 12:13:00
author: 吴珂皓
categories: linux
keywords: VirtualBox, Centos7, samba, Linux
excerpt: 怎样在VirtualBox上安装Centos7服务器，并且配置好samba服务
---
Linux目前使用越来越广，越来越多的软件、服务都是基于Linux系统的，但是大多数情况下Linux系统的图形界面并不是那么好用，远没有我们习惯的Windows用的顺手，因此，我们渴望能够同时在一台电脑上使用windows和Linux。下面我就介绍一下如何在Windows上安装Linux虚拟机。下面我介绍的内容是以Virtual Box和CentOs 7为主体，并且附带配置samba服务，因为samba服务可以帮助我们有效的从Windows主机上访问Linux虚拟机。废话不多少，just code.

#### 下载centos7
Centos[官方网址：https://www.centos.org/](https://www.centos.org/)。这里我们下载minimal，我想下载minimal可以大大缩短大家的下载时间，不去下载一些不必要的东西。如下图：

![点击minimal](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/1.png)

接下来我们可以看到下面这个界面，我们可以任意选一个链接下载，我选择了aliyun的。

![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/2.jpg)

#### 下载Virtual Box虚拟机
这里我不推荐大家下载最新版本，因为4.3.16以上的版本可能会出现 Unable to load R3 module的报错，见[官方网址 https://www.virtualbox.org/ticket/13504?cversion=1&cnum_hist=1](https://www.virtualbox.org/ticket/13504?cversion=1&cnum_hist=1)。官方建议我们在升级到4.3.18的时候如果出现这个问题建议退回到4.3.16。因此我建议大家直接安装4.3.16。

安装Virtual Box的历史版本请前往[https://www.virtualbox.org/wiki/Download_Old_Builds_4_3_pre24](https://www.virtualbox.org/wiki/Download_Old_Builds_4_3_pre24)。这里我们下载Windows hosts版本，大家可以直接戳[http://download.virtualbox.org/virtualbox/4.3.16/VirtualBox-4.3.16-95972-Win.exe](http://download.virtualbox.org/virtualbox/4.3.16/VirtualBox-4.3.16-95972-Win.exe)。

具体安装过程我就不详述了，一路next就可以了。

#### 下载putty (可省略)

Putty[(官方网址)](http://www.putty.org/)是一个免费的通过SSH协议访问Linux主机的小软件，非常好用，我一直都用这个。 下载链接：[http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe](http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe)

![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/3.png)

下载下来后你记住位置就可以，待会我会跟大家讲如何使用。这里大家可能就会有疑问了，为什么有虚拟机还要用putty呢？虚拟机不就是在本地吗？我个人觉得虚拟机的界面太小 ( 如上图 ) ，没有putty操作起来方便，当然这个看个人，这一步你也可以跳过。

#### 安装Virtual Box

这一步我就真的不详细描述了，大家自己看自己摸索，一路next就可以了。

#### 安装centos7

1. 安装好了Virtual Box后，打开Virtual Box，然后点击New按钮，如下图所示。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/4.png)

2. 点击New按钮后会弹出下图的界面，大家可以设置好你的虚拟机的名字。注意选择的是否是Linux，是否是Red Hat。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/5.png)

3. 这个界面选择内存大小，因为我一般就是做测试用，所以我不是很在乎内存大小，512G就够了。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/6.png)

4. 创建一个虚拟硬盘。点击create键就可以了。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/7.png)

    如下图选择。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/8.png)

    选择虚拟硬盘在物理硬盘上储存的方式，我选择的是固定大小。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/9.png)

    如下图选择虚拟硬盘存放在物理硬盘上的位置，点击箭头所指位置选择。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/10.png)

    点击后就会有如下界面出来，等待即可。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/11.png)

    创建完后就会继续回到最开始的页面。下面我们要网虚拟机的光驱里面装Centos的安装盘了。点击Settings。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/12.png)

5. 出现如下页面。选择Storage,然后选择IDE下面的Empty，出现右边Attributes选项，点击箭头所指位置，选择你下载的centos.iso镜像。然后点击OK。最后回到最开始的页面，点击启动按钮。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/13.png)

6. 按回车键确认安装CentOS 7。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/14.png)

    接这屏幕会闪过一些字符，最后进入到下面这个界面，我一般都会选择英文。然后点击continue

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/15.png)

    进入这个界面我们需要设置一下安装位置。一般你点击下图红色框框框住的区域然后再点击下下张图片的Done键就可以了。一般不需要做过多的设置。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/16.png)

    然后点击下图的Begin Installation按钮

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/17.png)

    如下图所示，在安装过程中你需要设置root密码和创建一个新用户。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/18.png)

    这里我们的用户名叫fantasyee。密码自己设定。如果密码太短的话是需要按两次Done键进行确认的。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/19.png)


    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/20.png)

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/21.png)

#### 配置虚拟机网络，使其能够同时访问互联网且与主机互通

1. 到了这个界面就恭喜你，差不多CentOS 7安装完成了，接下来重启机器。在启动机器钱前，我们需要设置一下网卡。为了能够正常访问互联网，并且主机能够互通，我们一般会安装两张网卡。一张NAT地址转换，用于连接互联网，注意这张网卡连接的物理网卡是要你能连上网的网卡（如果你有多张网卡的话）。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/22.png)

2. 第二张网卡是仅连接主机与虚拟机的。VirtualBox Host-Only Ethernet Adapter。

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/23.png)

#### 配置CentOS 7新机

1. 启动机器后第一件事就是配置你的DNS。root登陆，输入以下命令：

    ```
    vi /etc/resolve.conf
    ```

    然后输入 ```nameserver 8.8.8.8```

2. 因为minimal版本的CentOS 7默认是没有安装ifconfig的，所以需要安装net-tools。顺便我们一起安装一下vim。

    ```yum -y install net-tools vim```


#### 配置samba服务器

1. 关闭selinux服务

    root用户登陆

    ```
    vim /etc/selinux/config
    ```

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/24.png)


2. 打开防火墙对应端口/关闭防火墙

    ```
        systemctl stop firewalld
    ```

    ```
        service firewalled on
    ```

    ```
        chkconfig firewalld off
    ```

3. 安装samba服务

    ```
    yum -y install samba samba-client
    ```

4. 添加samba用户和密码
    smbpasswd -a fantasyee
    vim /etc/samba/smb.conf

    ![选择一个合适的链接下载](/img/post/2015-08-15-how-to-install-centos7-on-virtualbox/25.png)

5. 开启samba服务并设置为开机启动

    ```
    service smb status
    ```

    ```
    chkconfig smb on
    ```

    ```
    reboot
    ```

6. windows端通过samba服务访问虚拟机
用```ifconfig```查询你的IP,一般是192.168.56.101。然后在windows的地址栏输入\\192.168.56.101按照提示输入你的账号和密码就可以通过Windows访问Linux文件了。

#### 写在最后的话
至此，一个基于Virtual Box和CentOS 7的Linux虚拟机就搭建好了。我们可以通过putty使用命令行的方式访问服务器，也可以通过Samba服务器访问文件。欢迎大家有问题跟我联系讨论。联系方式见底部。
