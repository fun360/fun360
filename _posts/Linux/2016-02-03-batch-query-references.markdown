---
layout: post
title:  "NCBI文献批量查询"
date:   2016-02-03 12:13:00
author: 吴珂皓
categories: linux
keywords: NCBI文献批量查询
excerpt: 
---
<style>
  .query, .result {
    padding: 1em;
  }
  .result > ul > li {
    list-style-type:none;
    margin-bottom:0.5em;
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
    color: #BBB;
  }
  .result > ul > li > .author {
    padding-left:1em;
  }
  .process {
    display: none
  }
</style>
<div class = "query">
  <textarea class="form-control" rows="10"></textarea>
  <button type="button" id = "query" class="btn btn-primary btn-lg btn-block">搜  索</button>
</div>
<div class="progress">
  <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
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
                      var url = "http://www.ncbi.nlm.nih.gov/pubmed/?term="+$(data).find('[Name="pubmed"]').text()
                      var author = $(data).find('[Name="LastAuthor"]').text()
                      var journal = $(data).find('[Name="Source"]').text()
                      var date = $(data).find('[Name="PubDate"]').text()
                      var title = $("<h5></h5>").append($("<a></a>").html(title).attr("href",url)).addClass("title")
                      var author = $("<span></span>").html("Last Author: "+author).addClass("author")
                      var journal = $("<span></span>").html("[" + journal + "]").addClass("journal")
                      var date = $("<span></span>").html("Publish Date: " + date).addClass("pubdate")
                      var item = $("<li></li>").append(title).append(author).append(date).append(journal)
                      totalItem.append(item)
                  },
                  async:false
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
  $(".progress").show()
  setTimeout(function(){
    var data = $.trim($("textarea").val()).split("\n")
    for(var i = 0; i < data.length; i++){
      $(".progress-bar").css("width",(i+1)*100/data.length + "%")
      query(data[i])
    }
  }, 300);

})
</script>
