---
layout: post
title:  "Steps to perform SSH login without password on Windows"
date:   2015-08-29 17:15:00
author: Kehao Wu
categories: other
keywords: SSH, security
excerpt: Steps to perform SSH login without password on Linux
---

#### Download PuTTY and PuTTYgen.

PuTTY is a tool to connect your remote machine using SSH, you can go to [http://www.putty.org/](http://www.putty.org/) and download it.

PuTTYgen is a tool to generate your RSA public/private key pairs, you can go to [http://www.putty.org/](http://www.putty.org/) and download it.

#### Generate your RSA public/private key pairs.

Click "Generate" button to create your public and private key paris.

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\1.png)

Then move your mouse over the blank area to generte some randomness.

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\2.png)

PuTTYgen is generating your key pairs.

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\3.png)

Type your key comment. I often use it to describe my local machine.

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\4.png)

Copy your public key. You also can save your publick key by press the "Save public key" button.

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\5.png)

Press the "Save private key" button to save your private key to ppk file.

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\6.png)

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\7.png)

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\8.png)

#### Config your PuTTY

Go back to your PuTTY and input your username and remote machine name or IP. And input the session name.

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\9.png)

Click Connection > SSH > Auth and select your ppk file.

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\10.png)

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\11.png)

Go back to Session and save your session. Then open your session.

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\12.png)

#### Add your public key to your remote machine.

After you open your session, the remote machine will refuse our key due to we didn't add our public key to the ~/.ssh/authorized_keys.

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\13.png)

Type command ```vim ~/.ssh/authorized_keys``` and add your public key and save it.

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\14.png)

OK. Go back to your windows and open the session you saved. It works.

!["Steps to perform SSH login without password on Windows"](\img\post\2015-08-29-Steps-to-perform-SSH-login-without-password-on-Windows\15.png)

