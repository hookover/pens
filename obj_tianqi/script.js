$(document).ready(function () {
    var weather_url = 'http://v.juhe.cn/weather/ip?format=2&key=bbf65b2ee875064f60033ff552e80a10&ip=';

    var render = new Vue({
        el: '#man',
        data: {}
    });
    $.ajax({
        url: encodeURI('http://ipinfo.io/json?callback=?'),
        dataType: 'jsonp',
        async: false,
        success: function(response) {
            ip = response.ip;
            if(ip) {
                $.ajax({
                    url: encodeURI(weather_url + ip),
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback:"flightHandler",
                    success: function (res) {
                        if (res.resultcode != 200) {
                            alert('获取内容错误，请刷新页面重试:' + res.reason)
                            return false;
                        }
                        delete res.result.future[0];
                        render.$data = res;
                    }
                });
            } else {
                alert('ip地址获取错误，请刷新页面重试');
            }
        },
        error: function(err){
            alert(err);
        }
    });
});