---
layout: post
title:  "运用贝叶斯方法预测PM2.5 - 基于中国PM2.5数据"
date:   2015-09-16 22:13:00
author: 吴珂皓
categories: r
keywords: 贝叶斯,PM2.5,预测
excerpt: 运用贝叶斯方法预测PM2.5
---

我们这里通过把PM2.5值转换为分类变量来进行预测，精度是有所降低。我们定义S集合，S集合包含是个元素，下标依次为1到10，分别表示PM2.5>0且<=30、PM2.5大于30小于等于60等以此类推，直到第10个元素时，为PM2.5大于300。
那么根据贝叶斯公式，我们有以下两个式子：

$$Pr(P_{i+1}\in S_{k}|P_{i}\in S_{l})Pr(P_{i}\in S_{l}) = Pr(P_{i+1}\in S_{k}\cap P_{i}\in S_{l})$$

$$Pr(P_{i}\in S_{l}|P_{i+1}\in S_{k})Pr(P_{i+1}\in S_{k}) = Pr(P_{i+1}\in S_{k}\cap P_{i}\in S_{l})$$

$$****************************$$
$$其中Pr(P_{i}\in S_{l})表示当天PM2.5属于集合S_{l}的概率，$$
$$Pr(P_{i+1}\in S_{k})表示第二天PM2.5属于集合S_{k}的概率，$$
$$且k,l\in \left \{1,...,10  \right \}。$$
$$Pr(P_{i+1}\in S_{k}|P_{i}\in S_{l})表示当天PM2.5属于集合S_{l}时，$$
$$明天PM2.5属于集合S_{k}的概率，即我们想要得到的概率$$
$$Pr(P_{i+1}\in S_{k}\cap P_{i}\in S_{l})表示第一天PM2.5属于集合S_{l}$$
$$且第二天PM2.5属于集合S_{k}的概率$$
$$那么Pr(P_{i}\in S_{l})和Pr(P_{i+1}\in S_{k})就是发生PM2.5在属于某一个$$
$$S元素的概率，这些数据我们都可以通过抓取全国PM2.5数据得到。$$

理论大致就是这样的，欢迎大家拍砖。

代码：[Github KehaoWu/PredictPM25](https://github.com/KehaoWu/PredictPM25)
