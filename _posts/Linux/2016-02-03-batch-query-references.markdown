---
layout: post
title:  "NCBI Pubmed文献批量查询工具"
date:   2016-02-03 12:13:00
author: 吴珂皓 版本： 1.0.0 beta 发布于：2016-2-4
categories: linux
keywords: NCBI文献批量查询
excerpt: 
---
<style>
  .query, .result {
    padding: 1em;
  }
  .query > button {
    margin-top:1em;
  }
  .result > ul > li {
    list-style-type:decimal;
    margin-bottom:1.5em;
  }
  .result > ul > li > h5 {
    padding:0;
    margin:0;
  }
  .result > ul > li > h5 > .title {
    font-size: 1em;
  }
  .result > ul > li > span {
    font-size: 0.8em;
    color: #888;
    display: block;
  }
  .heart {
    display: none;
    margin: auto;
  }

</style>

<div class = "query">
  示例：<span class = "text-danger">目前仅支持每个关键词显示20条记录！</span><br/>
  <pre>bone density
rs6311</pre>
  <textarea class="form-control" rows="10" placeholder = "#请输入查询关键词，每行一个"></textarea>
  <button type="button" id = "query" class="btn btn-primary btn-lg btn-block">搜  索</button>
</div>
<div class="text-center">
  <div class="heart">
      <img src = "/img/heart.gif">
  </div>
</div>
<div class = "result">
</div>
<script type="text/javascript" src="/js/jquery-1.11.3.min.js"></script>
<script>
var query  = function(keyword){
    var xmlDoc 
    $.ajax({
        url:"http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?usehistory=y&db=pubmed&term="+keyword,
        dataType:'xml',
        type:'get',
        success:function(xmlDoc){
          var ids = $.trim($(xmlDoc).find('IdList').text()).split("\n")
          var totalItem = $("<ul></ul>")
          $.each(ids,function(i,v){
              $.ajax({
                  url:"http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=" + ids[i],
                  dataType:'xml',
                  type:'get',
                  success:function(data){
                      console.log(data)
                      var title = $(data).find('[Name="Title"]').text()
                      var url = "http://www.ncbi.nlm.nih.gov/pubmed/?term="+ids[i]
                      var author = $(data).find('[Name="LastAuthor"]').text()
                      var journal = $(data).find('[Name="Source"]').text()
                      var date = $(data).find('[Name="PubDate"]').text()
                      var title = $("<h5></h5>").append($("<a></a>").html(title).attr("href",url).attr('target','_blank')).addClass("title")
                      var author = $("<span></span>").html("Last Author: "+author).addClass("author")
                      var journal = $("<span></span>").html("[" + journal + "]").addClass("journal")
                      var date = $("<span></span>").html("Publish Date: " + date).addClass("pubdate")
                      var readmore = $("<span></span>").html("Read More").attr("href",url).attr('target','_blank')
                      var item = $("<li></li>").append(title).append(author).append(date).append(journal)
                      totalItem.append(item)
                  }
              })
          })
          $(".result").prepend(totalItem)
          $(".result").prepend($("<h4></h4>").html(keyword))
        },
        async:false
    })
}

$("#query").click(function(){
  $(".query").hide()
  $(".heart").show()
  setTimeout(function(){
    var data = $.trim($("textarea").val()).split("\n")
    for(var i = 0; i < data.length; i++){
      query(data[i])
    }
    $(".heart").hide()
  }, 300);

})
</script>
