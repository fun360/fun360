---
layout: post
title:  "NCBI Pubmed文献批量查询工具"
date:   2016-02-03 12:13:00
author: 吴珂皓 版本： 1.1.2 beta 发布于：2016-2-9
categories: tools
keywords: NCBI文献批量查询
excerpt: 
---
<style>
  textarea {
   font-weight: bold;
   color: #111;
  }
  .query, .result {
    padding: 1em;
  }
  .query > button {
    margin-top:1em;
  }
  .result {
    margin-bottom: 5em;
  }
  .result > div > ul > li {
    list-style-type:decimal;
    margin-bottom:1.5em;
  }
  .result > div > ul > li:hover {
    list-style-type:decimal;
    margin-bottom:1.5em;
    background-color: #EEE;
  }
  .result > div > ul > li > h5 {
    padding:0;
    margin:0;
  }
  .result > div > ul > li > h5 > .title {
    font-size: 1em;
  }
  .result > div > ul > li > span {
    font-size: 0.8em;
    color: #888;
    display: block;
  }
  .heart {
    display: none;
    margin: auto;
  }
  .save, .refresh {
    font-size: 0.8em;
    cursor: pointer;
    padding: 0;
    margin: 0;
    display: none;
  }
  .author:before {
    content: "作者："
  }
  .date:before {
    content: "发表日期：";
  }
  .journal:before {
    content: "发表杂志：";
  }
  .result > div > h4 >a {
    font-size: 0.5em;
    margin-left: 1em;
    color: green;
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

<div class = "query">
  <small>Chrome浏览器(推荐使用)下载 <a href="http://pan.baidu.com/s/1nu09u5r">http://pan.baidu.com/s/1nu09u5r</a>密码：ngm5</small><br/>
  示例：<small class = "text-danger">目前仅支持20行关键词，每行关键词最多显示50条记录。</small>
  <pre>bone density
rs6311</pre>
  <textarea class="form-control" rows="10" placeholder = "#请输入查询关键词，每行一个"></textarea>
  <button type="button" id = "query" class="btn btn-primary btn-lg btn-block">搜  索</button>
</div>
<div class="text-center">
  <div class="heart">
      <img src = "/img/heart.gif">
      <p>搜索中...</p>
  </div>
</div>
<div class="row">
  <div class="col-md-6">
    <p class="text-left refresh"><a>重新检索</a></p>
  </div>
  <div class="col-md-6">
    <p class="text-right save"><a>保存为excel格式</a></p>
  </div>
</div>
<div class = "result">
</div>

**版本日志：**
  
  - **2016/02/09 版本：1.1.2**
     - 增加收起按钮
     - 增加BioGrid和NCBI基因链接

  - **2016/02/06 版本：1.1.1**
     - 增加重新搜索按钮

  - **2016/02/05 版本：1.1.0**
     - 支持excel文件保存至本地
     - 支持每个关键字50条记录搜索
     - 支持搜索关键词不超过20行

  - **2016/02/04 版本：1.0.0**
     - 支持每个关键字20条记录搜索pubmed数据库
     - 支持搜索多个关键字

[**生物信息学分析网址大全**](/tools/bio-websites.html)

<script type="text/javascript" src="/js/jquery-1.11.3.min.js"></script>
<script>
var query  = function(keyword){
    var xmlDoc 
    $.ajax({
        url:"http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?usehistory=y&db=pubmed&term="+keyword+"&retmax=50",
        dataType:'xml',
        type:'get',
        success:function(xmlDoc){
          var ids = $.trim($(xmlDoc).find('IdList').text()).split("\n")
          var totalItem = $("<ul></ul>").attr("id",keyword)
          $.each(ids,function(i,v){
              $.ajax({
                  url:"http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=" + ids[i],
                  dataType:'xml',
                  type:'get',
                  success:function(data){
                      var title = $(data).find('[Name="Title"]').text()
                      var url = "http://www.ncbi.nlm.nih.gov/pubmed/?term="+ids[i]
                      var author = $(data).find('[Name="LastAuthor"]').text()
                      var journal = $(data).find('[Name="Source"]').text()
                      var date = $(data).find('[Name="PubDate"]').text()
                      var title = $("<h5></h5>").append($("<a></a>").html(title).attr("href",url).attr('target','_blank')).addClass("title")
                      var author = $("<span></span>").html(author).addClass("author")
                      var date = $("<span></span>").html(date).addClass("date")
                      var journal = $("<span></span>").html(journal).addClass("journal")
                      var readmore = $("<span></span>").append($("<a></a>").html("点击查看详情").attr("href",url).attr('target','_blank'))
                      var item = $("<li></li>").append(title).append(author).append(date).append(journal).append(readmore)
                      totalItem.append(item)
                  }
              })
          })
          var biogridurl = "http://thebiogrid.org/search.php?search="+keyword+"&organism=all"
          var geneurl = "http://www.ncbi.nlm.nih.gov/gene/?term=" + keyword
          var ncbiurl = "http://www.ncbi.nlm.nih.gov/gquery/?term=" + keyword
          var biogrid = $("<a></a>").html("TheBioGrid").attr("href",biogridurl).attr('target','_blank')
          var ncbigene = $("<a></a>").html("Gene").attr("href",geneurl).attr('target','_blank')
          var ncbi = $("<a></a>").html("NCBI").attr("href",ncbiurl).attr('target','_blank')
          var button = $("<a></a>").attr("id",keyword).html("收起").click(function(){
            var $this = $(this)
            if ($this.html() == "收起"){
              $this.parent().siblings().css("display","none")
            }else{
              $this.parent().siblings().css("display","block")
            }
            var html = $this.html() == "收起" ? "展开" : "收起"
            $this.html(html)
            return $this
          })
          var t = $("<h4></h4>").append($("<b></b>").html(keyword)).append(ncbi).append(biogrid).append(ncbigene).append(button)
          var bigItem = $("<div></div>").append(t,totalItem)
          $(".result").prepend(bigItem)
        },
        async:false
    })
}

$("#query").click(function(){
  $(".query").hide()
  $(".heart").show()
  setTimeout(function(){
    var data = $.trim($("textarea").val()).split("\n")
    if(data.length <= 20){
      for(var i = 0; i < data.length; i++){
        query(data[i])
        $(".heart").hide()
        $(".save").show()
        $(".refresh").show()
      }
    }else{
      $(".query").show()
      $(".heart").hide()
    }
  }, 300);
})
$(".refresh").click(function(){
  $(".result").empty()
  $(".query").show()
  $(".save").hide()
  $(".refresh").hide()
})
</script>
<script type="text/javascript" src="/js/xlsx.core.min.js"></script>
<script type="text/javascript" src="/js/Blob.js"></script>
<script type="text/javascript" src="/js/FileSaver.js"></script>
<script type="text/javascript">
function Workbook() {
  if(!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}
function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
function datenum(v, date1904) {
  if(date1904) v+=1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}
 
function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
  for(var R = 0; R != data.length; ++R) {
    for(var C = 0; C != data[R].length; ++C) {
      if(range.s.r > R) range.s.r = R;
      if(range.s.c > C) range.s.c = C;
      if(range.e.r < R) range.e.r = R;
      if(range.e.c < C) range.e.c = C;
      var cell = {v: data[R][C] };
      if(cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
      
      if(typeof cell.v === 'number') cell.t = 'n';
      else if(typeof cell.v === 'boolean') cell.t = 'b';
      else if(cell.v instanceof Date) {
        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      }
      else cell.t = 's';
      
      ws[cell_ref] = cell;
    }
  }
  if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}
var filename = function(){
  var date = new Date()
  var year = date.getYear() + 1900
  var month = date.getMonth()
  var day = date.getDay()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  var filename = "how-to-code-" + year + month + day + hour + minute + second + ".xlsx"
  return(filename)
}
$(".save").click(function(){
    var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
    var wb = new Workbook()
    var data = [['KeyWords','Title','Journal','Author','Date','Link']]
    var kws = []
    $(".result div h4 b").each(function(i,v){
      kws.push($(v).html())
    })
    $(".result div ul").each(function(i,v){
      /*
      var title = ['title']
      var url = ['url']
      var author = ['author']
      var journal = ['journal']
      var date = ['date']
      */
      $(v).children("li").each(function(ii,vv){
        /*
        title.push($(vv).children("h5").children("a").html())
        author.push($(vv).children("[class='author']").html())
        journal.push($(vv).children("[class='journal']").html())
        date.push($(vv).children("[class='date']").html())
        url.push($(vv).children("h5").children("a").attr("href"))
        */
        var title = $(vv).children("h5").children("a").html()
        var author = $(vv).children("[class='author']").html()
        var journal = $(vv).children("[class='journal']").html()
        var date = $(vv).children("[class='date']").html()
        var url = $(vv).children("h5").children("a").attr("href")
        var kw = kws[i]
        data.push([kw,title,journal,author,date,url])
      })
      //var data = [title,journal,author,date,url]
    })
    data.push(['免责声明：所有文献均搜索自PubMed，本站不对文献可靠性负责。吴珂皓',null,null,null,null,null])
    data.push(['免费PubMed NCBI文献批量搜索：http://www.how-to-code.info/tools/batch-query-references.html',null,null,null,null,null])
    wb.SheetNames.push("Search Result")
    wb.Sheets["Search Result"] = sheet_from_array_of_arrays(data)
    var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'})
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), filename())
})
</script>
