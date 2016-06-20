window.onload = function () {
    var arr = [];
    var ref = new Wilddog("https://hare.wilddogio.com/");
    var put = $('#put');
    var put_text = $('#speak');
    var clean = $('#clean');
    var show = $('#show');

    //生成一点默认数据
    var data = [
        '你好，中国',
        '你好，世界',
        '你好，代码',
        'hello world',
        'day day up',
        '努力，加油',
        '朝秦暮楚',
        '魂牵梦萦',
        'aabbccc',
    ];
    ref.remove(); //清空服务器上的数据，防止发非法内容
    var time = 300;
    $.each(data, function (k, v) {
        setTimeout(function(){
            ref.child('messages').push(v);
        },time);
        time += 300;
    });
    //循环显示数据，为了页面不那么空？
    var index = 0;
    setInterval(function () {
        var nodes = $('#show').find('div').length;
        if(index >= arr.length) {
            index = 0;
        }
        if(nodes < arr.length) {
            if(arr[index]) {
                appendToHtml(createShowObj(arr[index]));
            }
            index ++;
        }
        console.log(index, arr.length);
    },200);


    put_text.keydown(function (event) {
        if(event.keyCode == 13) {
            put.trigger('click');
        }
    });

    clean.click(function() {
        arr = [];
        ref.remove();
        show.empty();
    });

    put.click(function () {
        ref.child('messages').push(put_text.val());
        put_text.val('');
    });

    function appendToHtml($showObj) {
        show.append($showObj);
    }

    function randColor() {
        return 'rgb('+ Math.round(Math.random()*240) +','+ Math.round(Math.random()*240) +','+ Math.round(Math.random()*240) +')';
    }

    function createShowObj($message) {
        var obj = $('<div>' + $message + '</div>');
        var color = randColor();
        var top = Math.abs(Math.round(Math.random() * show.height() - show.offset().top * 2));
        var left = Math.round(show.width() - obj.width());
        obj.css({
            left: left,
            top: top,
            color: color
        });
        var time = Math.round(10000 + Math.random() * 40000);
        obj.animate({
            left: '-' + left +'px'
        },time,function(){
            obj.remove();
        });
        return obj;
    }

    ref.child('messages').on('child_added',function(o){
        arr.push(o.val());
        appendToHtml(createShowObj(o.val()));
    });
};