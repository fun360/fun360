---
layout: post
title:  "Steps to perform SSH login without password on Linux"
date:   2015-08-29 17:13:00
author: Kehao Wu
categories: other
keywords: SSH, security
excerpt: Steps to perform SSH login without password on Linux
---

#### Step 1: Set Alias on your local machine

    vim ~/.ssh/config

Type your information like:

    Host <alias>
    Hostname <your remote machine address>
    User <your user ID on remote machine>

Below is my config file:

    Host cypress
    Hostname cypress2.tulane.edu
    User kwu9

Then type ESC and :wq to save your file. Now you can type below command to connect our remote machine.

    ssh cypress

For your first time connection, it will show us messages like:

    kwu9@Heracles-CBG:~> ssh cypress
    The authenticity of host 'cypress2.tulane.edu (76.165.13.4)' can't be establid.
    RSA key fingerprint is *******************************.
    Are you sure you want to continue connecting (yes/no)? yes
    Warning: Permanently added 'cypress2.tulane.edu' (RSA) to the list of known hs.
    kwu9@cypress2.tulane.edu's password:

Then you need type your password to login.

#### Step2: Set SSH login without password

Use ssh-keygen to generate public/private rsa key pair

    kwu9@Heracles-CBG:~> ssh-keygen
    Generating public/private rsa key pair.
    Enter file in which to save the key (/extra/kwu9/.ssh/id_rsa):
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in /extra/kwu9/.ssh/id_rsa.
    Your public key has been saved in /extra/kwu9/.ssh/id_rsa.pub.
    The key fingerprint is:
    ********************************** kwu9@Heracles-CBG
    The key's randomart image is:
    +--[ RSA 2048]----+
    | Some code |
    | Some code |
    | Some code |
    | Some code |
    | Some code |
    | Some code |
    +-----------------+

Then copy your public key to remote machine (cypress)

    kwu9@Heracles-CBG:~> ssh-copy-id -i ~/.ssh/id_rsa.pub cypress
    kwu9@cypress2.tulane.edu's password:
    Now try logging into the machine, with "ssh 'cypress'", and check in:

      ~/.ssh/authorized_keys

    to make sure we haven't added extra keys that you weren't expecting.


Then it will be set after you input your password correctly. And you can try to connect your remote machine.

    kwu9@Heracles-CBG:~> ssh cypress
    Last login: Sat Aug 29 17:38:14 2015 from dhcp-103-218.sphtm.tulane.edu

Now it has been set well. 