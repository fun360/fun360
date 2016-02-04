---
layout: post
title:  "用1000 Genome数据和plink来做SNP Prune"
date:   2016-02-03 20:54 PM
author: 吴珂皓
categories: linux
keywords: SNP
---

## 1、下载1000 Genome数据并解压
 - 下载plink 1.9 [右键在新窗口打开](https://www.cog-genomics.org/plink2)

```shell
for chr in `seq 1 22`
do
  wget \
        ftp://ftp.1000genomes.ebi.ac.uk/vol1/ftp/release/20130502/ALL.chr${chr}.phase3_shapeit2_mvncall_integrated_v5a.20130502.genotypes.vcf.gz \
        -O $chr.vcf.gz
  gzip -d $chr.vcf.gz
done
```

## 2、把1000 Genome数据转换成plink格式
  - 由于1000 Genome数据中有多等位位点，所以我们只保留二等位位点
  - 由于1000 Genome数据中有重复位点，所以我们在这一步还要删除重复值

```shell
echo -n > merge.list
for chr in `seq 1 22`
do
    # 保留二等位位点
    plink --vcf chr${chr}.vcf \
      --make-bed \
      --biallelic-only strict \
      --out $chr
    
    # 删除重复值
    grep -v '^#' chr${chr}.vcf | cut -f 3 | sort | uniq -d > reference.dups
    plink --bfile $chr \
      --exclude reference.dups \
      --recode  \
      --out $chr
    echo "$chr.ped $chr.map" >> merge.list
done
```

## 3、合并文件并筛选出目的SNP并做Prune

```shell
plink --file $chr \
    --merge-list merge.list \
    --extract targetSNPlist \
    --recode \
    --out beforeprune
plink --file beforeprune \
    --indep-pairwise 50 50 0.2 \
    --out afterprune
```

## 4、如果还需要转换成vcf格式
```shell
plink --file afterprune \
    --recode vcf \
    --extract afterprune.prune.in \
    --out afterpruned
```
