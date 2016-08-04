
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

    // YOUR CODE GOES HERE!
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street+', '+city;
    $greeting.text(address);
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=1800x1200&location=' +address +'';
    //$body.append('<img class= "bgimg" src="'+streetviewUrl+'">');
    console.log(street+"    "+city);
    var NYTurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    NYTurl += '?' + $.param({
            'api-key': "9aff8c97ee85495baca98ab56d506ebd",
            'fq': address
        });
    $.ajax({
        url: NYTurl,
        method: 'GET',
    });/*.done(function(result) {
        console.log(result);
    }).fail(function(err) {
        throw err;
    });*/
    $.getJSON(NYTurl,function(data){
        for(var i= 0;i<20;i++){
            var headline = data.response.docs[i].headline.main;
            var snippet = data.response.docs[i].snippet;
            var web_url = data.response.docs[i].web_url;
            //var img_url = data.response.
            console.log(data.response.docs[i].snippet);
            $nytElem.append('<li class="article" style="margin-left:'+Math.floor(Math.random()*100)+'%"><a href='+web_url+'>'+headline+'</a><p class="snippet">'+snippet+'</p></li>');
                //'<li class="article"><h1>'+headline+'</h1><a href="'+web_url+'">'+snippet+'</a></li>');
        }
    }).error(function(){
        $nytElem.append('<h1>New York Times Articles are unable to load</h1>');
    });
    return false;
};
$('#form-container').submit(loadData);
$('.article').each(function(){
    $(this).css({
        "margin-left":Math.floor(Math.random()*400)
    });
});



