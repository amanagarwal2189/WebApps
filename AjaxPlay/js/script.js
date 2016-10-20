function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
	var $streetStr = $('#street').val()
	var $cityStr = $('#city').val();
	var address = $streetStr+", "+ $cityStr;
	var web_adress = $streetStr+"%2C%20"+ $cityStr;
	var api_NYT = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+ web_adress +"&api-key=7bec642e9708479c8c48f4c9645c5070";
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
	$body.append('<img class="bgimg" src =  "http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ address +'"/>');
	$.getJSON( api_NYT, function( data ) {
		var items = [];
		$.each( data.response.docs, function( key, val ) {
				var url = val.web_url;
				var lead_para = val.lead_paragraph;
				var headline = val.headline.main;
				items.push( '<li class = "article" ><a href="' + url + '">' + headline + '</a><p>'+lead_para+'</p></li>' );
		});
		$( "<ul/>", {
			"class": "article-list",
			html: items.join( "" )
		}).appendTo($nytElem);
		console.log(data);
	});	
    return false;
};

$('#form-container').submit(loadData);
//when someone hits submit, runs the load data function
