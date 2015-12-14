---
layout: post
title:  "阅读SKAT源代码 第一篇"
date:   2015-08-16 14:13:00
author: 吴珂皓
categories: r
keywords: SKAT, SNP, R语言, 罕见变异, Rare variant
excerpt: 解读SKAT源代码
---

#### Null_Model.R: SKAT_Null_Model 调用了以下几个函数
1. SKAT_MAIN_Check_OutType
2. model.frame
3. SKAT_Null_Model_Get_Includes
4. SKAT_Null_Model_MomentAdjust
5. Get_SKAT_Residuals.linear
6. Get_SKAT_Residuals.logistic

##### Main.R: SKAT_MAIN_Check_OutType 用于检查参数，以下是该函数的源代码：


    SKAT_MAIN_Check_OutType<-function(out_type){
        
        if(out_type != "C" && out_type != "D"){
            stop("Invalid out_type!. Please use either \"C\" for the continous outcome or \"D\" for the dichotomous outcome.")
        }

    }

#### model.frame: 返回一个公式所需的数据库，如：

    > dat = data.frame(x=1:10,y=rnorm(10))
    > model.frame(y~x,dat)
                 y  x
    1   0.47451611  1
    2  -0.66305651  2
    3   1.13616805  3
    4  -3.06632904  4
    5  -0.16649692  5
    6  -1.14074946  6
    7   2.40499396  7
    8   0.01473065  8
    9  -0.83050144  9
    10  0.14527556 10

#### Null_Model.R: SKAT_Null_Model_Get_Includes的源代码：

    SKAT_Null_Model_Get_Includes<-function( obj_omit, obj_pass){

        ID1<-rownames(obj_omit)
        ID2<-rownames(obj_pass)

        d1<-data.frame(ID=ID1)
        d2<-data.frame(ID=ID2, idx=1:length(ID2))

        d3<-merge(d1, d2,by.x="ID", by.y="ID")
        id_include = sort(d3$idx)

        return(id_include)
    }

在这个函数中，我们可以看到它接收了obj_omit和obj_pass两个参数，然后将他们的行名取出并生成了d1,d2两个数据框，并且d2数据框的第二列是序列。然后d1,d2合并起来再按照d2开始的顺序排序。

#### Null_Model.R : SKAT_Null_Model_MomentAdjust 

    SKAT_Null_Model_MomentAdjust = function(formula, data=NULL, n.Resampling=0, type.Resampling="bootstrap", is_kurtosis_adj=TRUE, n.Resampling.kurtosis=10000){
        
        
        # check missing 
        obj1<-model.frame(formula,na.action = na.omit,data)
        obj2<-model.frame(formula,na.action = na.pass,data)

        n<-dim(obj2)[1]
        n1<-dim(obj1)[1]
        id_include<-SKAT_Null_Model_Get_Includes(obj1,obj2)


        if(n - n1 > 0){
            MSG<-sprintf("%d  samples have either missing phenotype or missing covariates. They are excluded from the analysis!",n - n1)
            warning(MSG,call.=FALSE)
        }

        re1<-Get_SKAT_Residuals.logistic (formula, data, n.Resampling, type.Resampling, id_include )
        re1$n.all<-n
        re2<-NULL

        if(is_kurtosis_adj == TRUE){
            re2<-Get_SKAT_Residuals.logistic (formula, data, n.Resampling.kurtosis, type.Resampling, id_include )
        }

        class(re1)<-"SKAT_NULL_Model"
        re<-list(re1=re1, re2=re2, is_kurtosis_adj= is_kurtosis_adj, type = "binary")

        
        class(re)<-"SKAT_NULL_Model_ADJ"
        return(re)
        
    }

以上是该函数的源代码，下面我们一步一步来解析：
```obj1<-model.frame(formula,na.action = na.omit,data)```这一句的作用正如我们前面所述，就是把data里面的数据抽提出来，然后这里有一个参数```na.action```它接收的值是na.omit。然后查询model.frame这个函数，对于na.action具体描述请见我上一篇博文[na.action是什么？](/r/how-does-na-action-act-in-R.html)