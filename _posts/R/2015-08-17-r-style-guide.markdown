---
layout: post
title:  "R语言代码规范"
date:   2015-08-17 22:31:00
author: 吴珂皓（翻译）
categories: r
keywords: R语言,代码规范,style guide,代码风格,编码风格,教程
excerpt: R语言代码风格
---
> 本文翻译自[http://stat405.had.co.nz/r-style.html](http://stat405.had.co.nz/r-style.html)。如有任何版权问题请联系本人[kehao.wu@gmail.com](mailto:kehao.wu@gmail.com)

代码风格非常重要，当你的代码还只有一个人的时候，可能会有多个人需要阅读你的代码；或者当你和其他人一起合作写代码的时候，统一的代码风格是一个不错的想法。（译者注：当你一个写代码，而且还没有别人看的时候，统一的代码风格也是非常重要的，这样你会知道你自己到底写了什么，以致于下次自己看的时候不会很混乱。当然必要的注释有时候也能帮你解决一部分这个问题。）

### 注释和命名风格

#### 文件名

文件名应该以.r结尾，并且文件名应该是有意义的。（译者注：我的文件名一般以.R结尾，我喜欢大写字母）

    # 好的代码风格
    explore-diamonds.r
    hadley-wickham-hw-1.r
    # 不好的代码风格
    foo.r
    my-homework.R

#### 标识符(Identifier)（译者注：变量和函数）

变量和函数名应该是小写。用下划线_来区分单词（译者注：我一般用驼峰命名法）。一般变量应该是名词，函数名应该是动词。努力是你的名字简介并且有意义（这并不容易）。

    # 好的代码风格
    day_one
    day_1
    # 不好的代码风格
    first_day_of_the_month
    DayOne
    dayone
    djm1

### 符号

#### 空格
在所有二元运算符周围都加上空格（比如：=，+，-，<-等等）。不要再逗号前加空格，但应该总是在逗号后加上一个空格。
    
    # 好的代码风格
    average <- mean(feet / 12 + inches, na.rm = T)
    # 不好的代码风格
    average<-mean(feet/12+inches,na.rm=T)

    译者注：
    # 不好的代码风格
    average<-mean(feet/12+inches , na.rm=T)

在左括号前加上空格，但调用函数时除外：

    # 好的代码风格
    `if (debug)`
    `plot(x, y)`

    # 不好的代码风格
    `if(debug)`
    `plot (x, y)`

如果额外的空格能够使等号或者箭头对齐，那么这些二外的空格是允许的（也就是说一行不止一个空格）。

    list(
      x = call_this_long_function(a, b), 
      y = a * e / d ^ f)

    list(
      total = a + b + c, 
      mean  = (a + b + c) / n)

不要在括号或者方括号周围加空格，除非后面有一个逗号，因为逗号后总是要有一个空格。

    # 好的代码风格
    if (debug)
    diamonds[5, ]

    # 不好的代码风格
    if ( debug )  # No spaces around debug
    x[1,]  # Needs a space after the comma
    x[1 ,]  # Space goes after, not before

#### 大括号

左大括号永远不要在一行的开头，应该总是在一行的结尾；右大括号应该总是在一行的结尾，除非是else语句。

    # 好的代码风格

    if (y < 0 && debug) {
      message("Y is negative")
    }

    if (y == 0) {
      log(x)
    } else {
      y ^ x
    }

    # 不好的代码风格

    if (y < 0 && debug)
    message("Y is negative")

    if (y == 0) {
      log(x)
    } 
    else {
      y ^ x
    }

把一些很短的语句放在一行也是可以的：

    if (y < 0 && debug) message("Y is negative") 

### 缩进

#### 行长

保持你每行代码不超过80个字符（译者注：其实目前来看这并没有什么必要，因为大多数编辑器都支持自动换行）。这个量可以使你的代码适应一个合理的打印页面（译者注：现在应该打印代码出来看的人不多）。如果你的发现你的代码超出了这个范围，最好把其中一些工作封装成一个独立的函数。

#### 赋值

使用<-而不是=进行赋值（译者注：我其实喜欢用=号，而且也并没有带来什么不便）

    # 好的代码风格
    x <- 5
    # 不好的代码风格
    x = 5

### 组织性

#### Commenting guidelines

评论你的代码。整个评论行应该以一个#和一个空格开头。评论应该解释“为什么”，而不是“是什么”。

用-或者=组成的行来分割你的文件成为可查看的块。

    译者注
    ==============================
    ------------------------------

