
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
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street+', '+city;
    $greeting.text(address);
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=1800x1200&location=' +address +'';
    //$body.append('<img class= "bgimg" src="'+streetviewUrl+'">');
    console.log(street+"    "+city);
    var NYTurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    NYTurl += '?' + $.param({
            'api-key': "7b3752510c8d426d9182b1beb2f507e3",
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
        for(var i= 0;i<40;i++){
            var headline = data.response.docs[i].headline.main;
            var snippet = data.response.docs[i].snippet;
            var web_url = data.response.docs[i].web_url;
            var img_url = "http://www.nytimes.com/"+data.response.docs[i].multimedia[1].url;
            var ran_position = Math.floor(Math.random()*40);
            var ran_img_position;
            if (ran_position>20){
                ran_img_position= -Math.floor(Math.random()*100+400);
            }
            else{
                ran_img_position= Math.floor(Math.random()*100+400);//Math.floor(Math.random()*600+400);
            }
            /*console.log(data.response.docs[i].snippet);
            console.log(img_url);*/
            $nytElem.append('<li class="article" style="margin-left:'+ ran_position+'%"><a target="view_window" href='+web_url+'><h2>'+headline+'</h2></a><p class="snippet">'+snippet+'</p><img src='+img_url+' style=margin-left:'+ran_img_position+'px;></li>');
                //'<li class="article"><h1>'+headline+'</h1><a href="'+web_url+'">'+snippet+'</a></li>');
        }
    }).error(function(){
        $nytElem.append('<h1>New York Times Articles are unable to load</h1>');
    });
    return false;
};

if (loadData(true)){
    $('.article').each(function () {
        $(this).css({
            "margin-left": "" + Math.floor(Math.random() * 60) + "%"
        });
    });
}
$("button").click(function(){
    $('#nytimes-articles').text("");
    $('form').animate({
        "margin-top": "0px",
    });
    $("#nyta").fadeIn(2000);
    $('#form-container').submit(loadData);
    $("#lee").hide();

})


