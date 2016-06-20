/**
 * Created by apple on 16/6/10.
 */
function initData() {
    var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","ESL_SC2"];
    function generateUrl(type,user) {
        return 'https://api.twitch.tv/kraken/' + type + '/' + user + '?callback=?';;
    }
    users.forEach(function (user) {
        //获得用户在线状态
        $.getJSON(generateUrl('streams',user),function(response) {
            var title,status;

            switch (response.stream) {
                case null:
                    title = "Offline";
                    status = "offline";
                    break;
                case undefined:
                    title = "Account Closed";
                    status = "offline";
                    break;
                default :
                    title = response.stream.game;
                    status = "online";
            }

            $.getJSON(generateUrl("channels", user), function(response) {
                var logo = response.logo != null ? response.logo : "http://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
                    name = response.display_name != null ? response.display_name : user,
                    description = status === "online" ? ': ' + response.status : "";

                var html =  '<div class="user ' + status + '">'+
                    '<div class="col-xs-2 col-sm-1">'+
                    '<img class="img-circle" src="'+logo+'">'+
                    '</div>'+
                    '<div class="col-xs-3 col-sm-3">'+
                    '<a target="_blank" href="'+response.url+'">'+name+'</a>'+
                    '</div>'+
                    '<div class="col-xs-7 col-sm-8">'+title+description+'</div>'+
                    '</div>';

                (status === "online") ? $(".data").prepend(html) : $(".data").append(html);
            });

        });
    });
}

$(document).ready(function(){
    initData();

    $(function(){
        $('.header ul li').click(function(e){
            var obj = $('li.'+this.className);
            obj.siblings().removeClass('active');
            obj.addClass('active');

            if (obj.hasClass('all')) {
                $('.data .user').removeClass('hidden');
            }

            if (obj.hasClass('offline')) {
                $('.data .online').addClass('hidden');
                $('.data .offline').removeClass('hidden');
            }

            if (obj.hasClass('online')) {
                $('.data .online').removeClass('hidden');
                $('.data .offline').addClass('hidden');
            }

        });
    })
});
