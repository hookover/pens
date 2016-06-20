/**
 * Created by apple on 16/6/13.
 */

var runing = false;
var current = 'session';
var breakTime = 5;
var sessionTime = 25;
var breakTimeSecond = breakTime * 60;
var sessionTimeSecond = sessionTime * 60;
var timer = null;

function controller(element){
    var type = $(element.parentNode.parentNode)[0].className;
    var method = $(element)[0].className;
    var breakText = $('.controller .break .btn-box span');
    var sessionText = $('.controller .session .btn-box span');

    // break
    if(type == 'break' && !runing) {
        if(method == 'drop') {
            if(breakTime>=2) {
                --breakTime;
            }
            breakText.html(breakTime);
        } else {
            ++breakTime;
            breakText.html(breakTime);
        }
    }

    // session
    if(type == 'session' && !runing){
        if(current != 'session') return;
        if(method == 'drop') {
            if(sessionTime>=2) {
                --sessionTime;
            }
            sessionText.html(sessionTime);
        } else {
            ++sessionTime;
            sessionText.html(sessionTime);
        }
    }
    if(!runing) {
        breakTimeSecond = breakTime * 60;
        sessionTimeSecond = sessionTime * 60;
    }
    render();
}

function run(){
    if(!runing) {                        //如果未运行，则运行
        timer = setInterval(function () {
            // 执行到0时，切换并重置
            if (sessionTimeSecond <= 0 && current == 'session') {
                current = 'break';
                sessionTimeSecond = sessionTime * 60;
            }
            if(breakTimeSecond <= 0 && current == 'break'){
                current = 'session';
                breakTimeSecond = breakTime * 60;
            }
            if (current == 'session' ) {
                --sessionTimeSecond;
            } else {
                --breakTimeSecond;
            }

            render();
        },1000);
        runing = true;
        //console.log('start!');
    } else {                            //如果运行中，则停止
        clearInterval(timer);
        runing = false;
        //console.log('stop');
    }
}

function timeFormat(v){
    var len = ''.split.call(v,'').length;

    if(len < 2 ){
        return 0+''+v;
    }
    return v;
}
function render() {
    var tmpTitle = (current == 'session' ? 'Session' : 'Break');
    var minTime = (current == 'session' ? sessionTime : breakTime);
    var tmpTime = 0;
    var tmpProgress = 0;
    var progressColor = {
        'session':'rgba(220,20,60,0.7)',
        'break':'rgba(9,43,64,0.5)'
    };

    if(!runing) {
        tmpTime = (current == 'session' ? sessionTime : breakTime);
    } else {
        tmpTime = (current == 'session' ? sessionTimeSecond : breakTimeSecond);
        tmpProgress = Math.round(((minTime * 60) - tmpTime ) / (minTime * 60) * 100);


        var h = timeFormat(parseInt( tmpTime / 3600 ));
        var min =timeFormat(parseInt( ( tmpTime - h*3600 ) / 60 ));
        var s = timeFormat(tmpTime % 60);

        tmpTime = h + ':' + min + ':' + s;
    }


    $('.show .title').html(tmpTitle);
    $('.show .time').html(tmpTime);

    $('.show .background').css({
        'height':tmpProgress+'%',
        'background':progressColor[current]
    });
}

$(document).ready(function(){
    // 初始化
    $('.controller .break .btn-box span').html(breakTime);
    $('.controller .session .btn-box span').html(sessionTime);
    $('.show .time').html(sessionTime);

    $('.controller .btn-box a').on('click',function(){
        controller(this);
    });

    $('.show .title').on('click',function(){
        run();
    });

});