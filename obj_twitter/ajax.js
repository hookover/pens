/**
 * Created by apple on 16/6/7.
 */


function getColor() {
    var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
    return colors[ Math.floor(Math.random() * colors.length) ];
}
function getQuote() {
    $.ajax({
        headers: {
            "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
        success: function(response) {

            var res = JSON.parse(response);
            $('.quote-text').animate({ opacity: 0 },1000, function () {
                $(this).animate({ opacity: 1 },1000);
                $('.quote-text').html(res.quote);
            });
            $('.author').animate({ opacity: 0 },1000, function () {
                $(this).animate({ opacity: 1 },1000);
                $('.author').html(res.author);
            });

            $('#twitter').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + res.quote + '" ' + res.author));
            $('#tumblr').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(res.author)+'&content=' + encodeURIComponent(res.quote));

            var color = getColor();
            $("body").animate({
                backgroundColor: color,
                color: color
            }, 2000);
            $(".btn").animate({
                backgroundColor: color
            }, 2000);
        }
    });
}
$(document).ready(function(){
    getQuote();

    $('#new').on('click',function(){
        getQuote();
    });
    setInterval(function(){
        getQuote();
    },1000*30);
});
