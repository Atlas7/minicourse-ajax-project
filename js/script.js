
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + ''; 

    $body.append('<img class="bgimg" src="' + streetViewUrl + '">')

    // load New York Times (NYT) articles
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=f062c483a5136eb9a300fcf890a8600f:14:72698594'
    $.getJASON(nytimesUrl, function(data){
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        articles = data.response.docs;
        for (var i=0; i<articles.length; ++i) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="' + article.web_urls + '">' +
                article.headline.main + '</a>' +
                '<p>' + article.snippet + '</p>' + '</li>');
        };
    })

    return false;
};

$('#form-container').submit(loadData);

// loadData();
