---
layout: post
title:  "How to install dos2unix"
date:   2015-09-02 11:09:00
author: Kehao Wu
categories: other
keywords: dos2unix
excerpt: How to install dos2unix
---

#### Download dos2unix tar package

    [kwu9@cypress1 src]$ wget http://sourceforge.net/projects/dos2unix/files/dos2unix/7.3/dos2unix-7.3.tar.gz/download

#### Unzip the file you download

    [kwu9@cypress1 src]$ tar -zxvf download

#### Come to the directory dos2unix-7.3

    [kwu9@cypress1 src]$ cd dos2unix-7.3/

#### Without configure, you can make it directly.

    [kwu9@cypress1 src]$ make

#### Then copy dos2unix and unix2dos to your own binnary path.

    [kwu9@cypress1 src]$ cp dos2unix ~/bin/
    [kwu9@cypress1 src]$ cp unix2dos ~/bin/