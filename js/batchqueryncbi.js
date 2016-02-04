var query  = function(keyword){
    var xmlDoc 
    $.ajax({
        url:"http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?usehistory=y&db=pubmed&term="+keyword,
        dataType:'xml',
        type:'get',
        success:function( data ){
            xmlDoc = data
        },
        async: false
    })

    var ids = $.trim($(xmlDoc).find('IdList').text()).split("\n")
    console.log(ids)
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
}

$("#query").click(function(){
  var data = $.trim($("textarea").val()).split("\n")
  for(var i = 0; i < data.length; i++){
    query(item)
  }
})
