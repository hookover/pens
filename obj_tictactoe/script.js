/**
 * Created by apple on 16/6/13.
 */
var checkerboard = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

var step = 0;
var vm = null;
var userTag = 'x';
var robotTag = 'o';
var msg = '';

function isEnd(){
    return step>=9;
}
function win(x,y){
    if(Math.abs(checkerboard[x][0]+checkerboard[x][1]+checkerboard[x][2])==3){
        return true;
    }
    if(Math.abs(checkerboard[0][y]+checkerboard[1][y]+checkerboard[2][y])==3){
        return true;
    }
    if(Math.abs(checkerboard[0][0]+checkerboard[1][1]+checkerboard[2][2])==3){
        return true;
    }
    if(Math.abs(checkerboard[2][0]+checkerboard[1][1]+checkerboard[0][2])==3){
        return true;
    }
    return false;
}
function worst(){
    var bestx;
    var besty;
    var bestv = 0;
    for(var x=0;x<3;x++){
        for(var y=0;y<3;y++){
            if(checkerboard[x][y] == 0){
                checkerboard[x][y] = -1;
                step++;
                if(win(x,y)){
                    step--;
                    checkerboard[x][y] = 0;
                    return {'x':x,'y':y,'v':-1000};
                }else if(isEnd()){
                    step--;
                    checkerboard[x][y]=0;
                    return {'x':x,'y':y,'v':0};
                }else{
                    var v=best().v;
                    step--;
                    checkerboard[x][y]=0;
                    if(bestx==null || v<=bestv){
                        bestx=x;
                        besty=y;
                        bestv=v;
                    }
                }

            }
        }
    }
    return {'x':bestx,'y':besty,'v':bestv};
}
function best(){
    var bestx;
    var besty;
    var bestv=0;
    for(var x=0;x<3;x++){
        for(var y=0;y<3;y++){
            if(checkerboard[x][y]==0){
                checkerboard[x][y] = 1;
                step++;
                if(win(x,y)){
                    step--;
                    checkerboard[x][y] = 0;
                    return {'x':x,'y':y,'v':1000};
                }else if(isEnd()){
                    step--;
                    checkerboard[x][y]=0;
                    return {'x':x,'y':y,'v':0};
                }else{
                    var v=worst().v;
                    step--;
                    checkerboard[x][y]=0;
                    if(bestx==null || v>=bestv){
                        bestx=x;
                        besty=y;
                        bestv=v;
                    }
                }
            }
        }
    }
    return {'x':bestx,'y':besty,'v':bestv};
}
function reBoot() {
    setTimeout(function(){
        checkerboard = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];
        vm.$data = {
            data: checkerboard,
            msg: '点击棋盘开始游戏'
        };
        step = 0;
    },3000);
    step = 99;
}
function render() {
    vm.$data = {
        data: checkerboard,
        msg: msg
    };
}
$(document).ready(function () {
    Vue.filter('show', function (value) {
        if(value == 0) {
            return '';
        }
        if(value > 0) {
            return robotTag;
        }

        if(value < 0) {
            return userTag;
        }
    });
    vm = new Vue({
        el: 'body',
        data: {
            data: checkerboard,
            msg: '点击棋盘开始游戏'
        }
    });

    $('.modal').modal();


    $('.main>div').on('click',function(){
        var xy = this.className[1];

        var map = [
            [1,2,3],
            [4,5,6],
            [7,8,9]
        ];
        var x = -1;
        var y = -1;
        for(var rx=0;rx<3;++rx){
            for(var ry=0;ry<3;++ry){
                if(map[rx][ry] == xy){
                    x = rx;
                    y = ry;
                }
            }
        }

        if(checkerboard[x][y] !== 0 || isEnd()){
            return false;
        }

        // 人
        checkerboard[x][y] = -1;
        step++;
        if(win(x,y)) {
            msg = '你赢了！不可能的！';
            reBoot();
            render();
            return;
        }
        if(isEnd()) {
            msg = '平局！3秒后重新开始';
            reBoot();
            render();
            alert(msg);
            return;
        }
        // 机器
        var robot = best();
        if(robot.x !== undefined){
            checkerboard[robot.x][robot.y] = 1;
            step++;
            msg = '该你了！';
            if(win(robot.x,robot.y)) {
                msg = '你输了！3秒后重新开局';
                reBoot();
                render();
                alert(msg);
                return;
            }
            if(isEnd()) {
                msg = '平局！3秒后重新开始';
                reBoot();
                alert(msg);
            }
        }
        render();
    });


    $('#x').on('click',function () {
        userTag = 'x';
        robotTag = 'o';
    });
    $('#o').on('click',function () {
        userTag = 'o';
        robotTag = 'x';
        // 选o，电脑先手
        checkerboard[best().x][best().y] = 1;
        step++;
        msg = '点击棋盘加入战局！';
        render();
    });
});


/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://v3.bootcss.com/customize/?id=3aa45d3974e0551099e3fb2b8ad87672)
 * Config saved to config.json and https://gist.github.com/3aa45d3974e0551099e3fb2b8ad87672
 */
if (typeof jQuery === 'undefined') {
    throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
    'use strict';
    var version = $.fn.jquery.split(' ')[0].split('.')
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
        throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
    }
}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================

    var Modal = function (element, options) {
        this.options             = options
        this.$body               = $(document.body)
        this.$element            = $(element)
        this.$dialog             = this.$element.find('.modal-dialog')
        this.$backdrop           = null
        this.isShown             = null
        this.originalBodyPad     = null
        this.scrollbarWidth      = 0
        this.ignoreBackdropClick = false

        if (this.options.remote) {
            this.$element
                .find('.modal-content')
                .load(this.options.remote, $.proxy(function () {
                    this.$element.trigger('loaded.bs.modal')
                }, this))
        }
    }

    Modal.VERSION  = '3.3.5'

    Modal.TRANSITION_DURATION = 300
    Modal.BACKDROP_TRANSITION_DURATION = 150

    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    }

    Modal.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget)
    }

    Modal.prototype.show = function (_relatedTarget) {
        var that = this
        var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.checkScrollbar()
        this.setScrollbar()
        this.$body.addClass('modal-open')

        this.escape()
        this.resize()

        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

        this.$dialog.on('mousedown.dismiss.bs.modal', function () {
            that.$element.one('mouseup.dismiss.bs.modal', function (e) {
                if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
            })
        })

        this.backdrop(function () {
            var transition = $.support.transition && that.$element.hasClass('fade')

            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body) // don't move modals dom position
            }

            that.$element
                .show()
                .scrollTop(0)

            that.adjustDialog()

            if (transition) {
                that.$element[0].offsetWidth // force reflow
            }

            that.$element.addClass('in')

            that.enforceFocus()

            var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

            transition ?
                that.$dialog // wait for modal to slide in
                    .one('bsTransitionEnd', function () {
                        that.$element.trigger('focus').trigger(e)
                    })
                    .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
                that.$element.trigger('focus').trigger(e)
        })
    }

    Modal.prototype.hide = function (e) {
        if (e) e.preventDefault()

        e = $.Event('hide.bs.modal')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()
        this.resize()

        $(document).off('focusin.bs.modal')

        this.$element
            .removeClass('in')
            .off('click.dismiss.bs.modal')
            .off('mouseup.dismiss.bs.modal')

        this.$dialog.off('mousedown.dismiss.bs.modal')

        $.support.transition && this.$element.hasClass('fade') ?
            this.$element
                .one('bsTransitionEnd', $.proxy(this.hideModal, this))
                .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
            this.hideModal()
    }

    Modal.prototype.enforceFocus = function () {
        $(document)
            .off('focusin.bs.modal') // guard against infinite focus loop
            .on('focusin.bs.modal', $.proxy(function (e) {
                if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                    this.$element.trigger('focus')
                }
            }, this))
    }

    Modal.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
                e.which == 27 && this.hide()
            }, this))
        } else if (!this.isShown) {
            this.$element.off('keydown.dismiss.bs.modal')
        }
    }

    Modal.prototype.resize = function () {
        if (this.isShown) {
            $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
        } else {
            $(window).off('resize.bs.modal')
        }
    }

    Modal.prototype.hideModal = function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
            that.$body.removeClass('modal-open')
            that.resetAdjustments()
            that.resetScrollbar()
            that.$element.trigger('hidden.bs.modal')
        })
    }

    Modal.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
    }

    Modal.prototype.backdrop = function (callback) {
        var that = this
        var animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate

            this.$backdrop = $(document.createElement('div'))
                .addClass('modal-backdrop ' + animate)
                .appendTo(this.$body)

            this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false
                    return
                }
                if (e.target !== e.currentTarget) return
                this.options.backdrop == 'static'
                    ? this.$element[0].focus()
                    : this.hide()
            }, this))

            if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

            this.$backdrop.addClass('in')

            if (!callback) return

            doAnimate ?
                this.$backdrop
                    .one('bsTransitionEnd', callback)
                    .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callback()

        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in')

            var callbackRemove = function () {
                that.removeBackdrop()
                callback && callback()
            }
            $.support.transition && this.$element.hasClass('fade') ?
                this.$backdrop
                    .one('bsTransitionEnd', callbackRemove)
                    .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
                callbackRemove()

        } else if (callback) {
            callback()
        }
    }

    // these following methods are used to handle overflowing modals

    Modal.prototype.handleUpdate = function () {
        this.adjustDialog()
    }

    Modal.prototype.adjustDialog = function () {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

        this.$element.css({
            paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        })
    }

    Modal.prototype.resetAdjustments = function () {
        this.$element.css({
            paddingLeft: '',
            paddingRight: ''
        })
    }

    Modal.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth
        if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect()
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
        this.scrollbarWidth = this.measureScrollbar()
    }

    Modal.prototype.setScrollbar = function () {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
        this.originalBodyPad = document.body.style.paddingRight || ''
        if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
    }

    Modal.prototype.resetScrollbar = function () {
        this.$body.css('padding-right', this.originalBodyPad)
    }

    Modal.prototype.measureScrollbar = function () { // thx walsh
        var scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        this.$body.append(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        this.$body[0].removeChild(scrollDiv)
        return scrollbarWidth
    }


    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.modal')
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
            if (typeof option == 'string') data[option](_relatedTarget)
            else if (options.show) data.show(_relatedTarget)
        })
    }

    var old = $.fn.modal

    $.fn.modal             = Plugin
    $.fn.modal.Constructor = Modal


    // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function () {
        $.fn.modal = old
        return this
    }


    // MODAL DATA-API
    // ==============

    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
        var $this   = $(this)
        var href    = $this.attr('href')
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
        var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

        if ($this.is('a')) e.preventDefault()

        $target.one('show.bs.modal', function (showEvent) {
            if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
            $target.one('hidden.bs.modal', function () {
                $this.is(':visible') && $this.trigger('focus')
            })
        })
        Plugin.call($target, option, this)
    })

}(jQuery);