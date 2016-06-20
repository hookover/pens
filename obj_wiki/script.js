/**
 * Created by apple on 16/6/10.
 */
$(document).ready(function(){
    $('.close').click(function(){
        $('.from').toggleClass('open');
        $('.from input').toggleClass('hidden').val('').focus();
        $('.main').css('margin','10% auto');
        $('#tip').toggleClass('hidden');

    });

    var vm = new Vue({
        el: '.data',
        data: {}
    });

    $(".from input").keydown(function(event){
        if(event.which == "13") {
            $('.main').css('margin','2% auto');
            $.ajax({
                url: encodeURI(
                    "http://en.wikipedia.org/w/api.php?" +
                    "format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max" +
                    "&gsrsearch=" + $(".from input").val()+
                    "&callback=JSON_CALLBACK"
                ),
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback:"JSON_CALLBACK",
                success: function(response) {
                    console.log(response);

                    if (!response.query) {
                        alert('没有搜索到结果，请使用其它关键字');
                        return false;
                    }
                    response.baseUrl = 'http://en.wikipedia.org/?curid=';
                    vm.$data = response;
                    $('.data').removeClass('hidden');
                }
            });

        }
    });

});