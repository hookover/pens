/**
 * Created by apple on 16/6/13.
 */
var level = 0;
var computer = [];
var user = [];
var running = false;


$(document).ready(function(){
    //事件
    $('.btns button:first').click(function () {
        $('.btns button:first').prop('disabled',true);
        $('.btns button:last').removeAttr('disabled');
        running = true;
        level++;
        flashShow(level);
        robot(1000);
    });
    $('.btns button:last').click(function () {
        $('.btns button:last').prop('disabled',true);
        $('.btns button:first').removeAttr('disabled');
        running = false;
        computer = [];
        user = [];
        level = 0;
        flashShow();
        userClick(false);
    });
    //#函数#
    function checkWin(index) {
        user.push(index);
        // 失败
        if(computer.length >= user.length) {
            if(computer[user.length - 1] != index) {
                flashShow('error');
                robot(1000, 1500);
                audio(-1, 1000);
                userClick(false);
                return false;
            }
        }

        // 赢了
        if(user.length == computer.length) {
            level ++;
            flashShow(level, false);
            robot(1000, 1000);
            userClick(false);
            return true;
        }
    }
    function userClick(bind) {
        var o = $('.main .bg');
        if(bind !== false) {
            o.off();
            o.on('click','div:lt(4)',function(){
                var index = $(this).index();
                clickDot(index);
                checkWin(index);
            });
        } else {
            o.unbind();
        }
    }
    function robot(time, wait) {
        time = time || 500;
        wait = wait || 100;
        userClick(false);
        setTimeout(function () {
            computer = [];
            user = [];
            for (var i = 0; i < level; ++i) {
                computer.push(Math.floor(Math.random() * 4));
            }
            var count = 0;
            var s = setInterval(function(){
                if(!running){
                    clearInterval(s);
                    return false;
                }
                clickDot(computer[count], Math.floor(time * 0.8));
                count ++;
                if(count >= level) {
                    clearInterval(s);
                    userClick(true);
                }
            },time)
        }, wait);
    }
    function flashShow(val, flash) {
        val = val >= 0 || val == 'error' ? val : '--';

        var o = $('.show .title>span');
        var count = 0;
        if (val == 'error') {
            o.html('error');
        }
        if (flash !== false) {
            var s = setInterval(function(){
                o.toggleClass('hidden');
                count ++;
                if(count == 6) {
                    clearInterval(s);
                    o.html(val == '--' ? val : level - 1);
                }
            },200);
        } else {
            o.html(val - 1);
        }

    }
    function clickDot(index,time){
        time = time || 500;
        $('.main .bg>div:eq('+index+')').addClass('active');
        setTimeout(function () {
            $('.main .bg>div:eq('+index+')').removeClass('active');
        },time);
        audio(index,time);
    }

    function audio(index, time){
        time = time || 300;
        var sound = [261, 330, 370, 392, 888]; //1234 错误音
        var val = sound[sound.length - 1];
        if(sound[index]) {
            val = sound[index];
        }
        var AudioContext = window.AudioContext
            || window.webkitAudioContext
            || false;
        if(!AudioContext) {
            return false;
        }
        var context = new AudioContext();
        var s = context.createOscillator();
        s.frequency.value = val;
        s.start();
        s.connect(context.destination);
        setTimeout(function(){
            s.disconnect();
        },time);
    }
});