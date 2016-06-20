/**
 * Created by apple on 16/6/13.
 */
$(document).ready(function(){
    $('.io').val('');
    var arr = [];
    var lastRes = 0;
    $('.buttons a').on('click', function () {
        var val = this.innerText;
        if(val == 'AC') {
            $('.io').val('');
            arr = [];
            return;
        }

        if(val == 'CE') {
            arr.pop();
            $('.io').val(arr.join(''));
            return;
        }
        if(val == 'Ans') {

            if(arr.length == 0 && lastRes) {
                arr.push(lastRes);
                $('.io').val(arr.join(''));
            }
            return;
        }

        if(val == '=') {
            var str = arr.join('');

            str = str.replace(/(\W)\1+/g,'$1');
            str = str.replace(/(\d*\.)(\W)(.*)/,'$10$2$3');
            str = str.replace(/(.*)(\d)(?=[\W]*$)(.*)/,'$1$2');

            arr = [  eval(str)  ];
            lastRes = arr[0];
            $('.io').val(arr.join(''));
            return;
        }
        arr.push(val);
        $('.io').val(arr.join(''));
    });
});