---
layout: post
title:  "用R语言画一个曼哈顿图"
date: 2015-09-16 22:13:00
author: 吴珂皓
categories: other
keywords: R语言,曼哈顿图,GWAS,生物信息学
excerpt: 用R语言画一个曼哈顿图
---


>
本代码用于做曼哈顿图。曼哈顿图一般用于在GWAS中集中展示全基因组p值。

!["Manhattan Plot"](https://raw.githubusercontent.com/KehaoWu/Rmanhattanplot/master/Demo/manhattanplot.png "Manhattan Plot")

## 安装 / Installation
  
    install.packages("devtools")
    devtools::install_github("KehaoWu/Rmanhattanplot")

## 使用 / Usage

应提供全基因组数据：p值、染色体物理位置和染色体编号

如：

    # 以下代码仅提供示例数据，不要在真实的环境中运行
    > pvalue = runif(100)
    > bp = sample(10000:20000,100)
    > chr = sample(1:22,100,replace=T)
    > head(pvalue)
    [1] 0.34011080 0.58690499 0.55647674 0.85494148 0.07878192 0.46782922
    > head(bp)
    [1] 10805 13579 19443 10023 19322 18355
    > head(chr)
    [1]  2  9 11 19  8 20

    # 提供类似的数据运行以下代码
    > library(Rmanhattanplot)
    > p = manhattanPlot(pvalue = pvalue,bp = bp,chr = chr,cutoffline = T)
    > plot(p) #返回gglot2对象

[源代码](https://github.com/KehaoWu/Rmanhattanplot)

参考：[Make manhattan plot with ggplot2 script](https://pods.iplantcollaborative.org/wiki/display/eot/Make+manhattan+plot+with+ggplot2+script)

