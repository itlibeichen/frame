/**
 * Created by 刘庆伟 on 2016/5/13.
 * input默认placeholder样式
 */

function inputPlaceholder(input, colorIn, colorPl) {
    try {
        //如果不是IE浏览器，则抛出，使用默认的placeholder
        if (!window.navigator.userAgent.match(/IE (\d)/)) {
            throw new Error();
        }
        //如果是IE 9、8、7……则执行方法
        if (!(window.navigator.userAgent.match(/IE (\d)/)[1] > 9)) {
            //获取所有input
            var input = $('input');
            //如果有input，则继续
            if (input[0]) {
                //给每一个input绑定方法
                $(document).find(input).each(function () {
                    //获取input元素对象
                    var _this = $(this)[0];
                    //给每一个input元素添加value属性，属性值为该元素的placeholder，如果没有该属性，则给value值为空
                    _this.setAttribute('value', _this.getAttribute('placeholder') || "");
                    //设置input元素颜色为提示语颜色
                    _this.style.color = colorPl;
                });
                //当该input被点击时
                input.on('click', function (e) {
                    //事件对象兼容性处理
                    e = e || window.event;
                    //如果value的值与placeholder值相等或为空时
                    if ((this.value == this.getAttribute('placeholder')) || (this.value == '')) {
                        //设置value的值为placeholder的值
                        this.value = this.getAttribute('placeholder') || "";
                        //设置颜色为提示语颜色
                        this.style.color = colorPl;
                        //设置光标位置为最左侧
                        setCursorPosition($(this)[0], 0);
                    }
                    //如果此时事件为点击退格键
                    if (e.keyCode == 8) {
                        //设置value的值为placeholder的值并跳出
                        this.value = this.getAttribute('placeholder');
                        return;
                    }
                    //当键盘某个按键被按下时
                }).on('keydown', function (e) {
                    //获取事件
                    e = e || window.event;
                    //如果当前input的value与placeholder值相等或为空时
                    if ((this.value == this.getAttribute('placeholder')) || (this.value == '')) {
                        //设置value的值为空
                        this.value = '';
                        //设置颜色为文字颜色
                        this.style.color = colorIn;
                    }
                    //如果点击的按键是tab键时
                    if (e.keyCode == 9) {//处理按tab键的时候,input中的value消失的问题
                        //该input的value的值重置为placeholder的值
                        this.value = this.value || this.getAttribute('placeholder');
                        //如果value的值与placeholder的值相等
                        if (this.value == this.getAttribute('placeholder')) {//如果是，提示语的颜色
                            //设置颜色为提示语颜色
                            this.style.color = colorPl;
                        }
                    }
                    //当键盘中某个按键被抬起时
                }).on('keyup', function (e) {
                    //如果该input的value的值与placeholder的值相等或为空时
                    if ((this.value == this.getAttribute('placeholder')) || (this.value == '')) {
                        //设置该value的值为placeholder的值或为空
                        this.value = this.getAttribute('placeholder') || "";
                        //设置颜色为提示语颜色
                        this.style.color = colorPl;
                        //设置光标位置在最左侧
                        setCursorPosition($(this)[0], 0);
                    }
                    //console.log(e.keyCode);   这行现在没用了
                });
            }
        }
    } catch (e) {
        //踹完了。
    }
    /*
     ?* 设置输入域(input/textarea)光标的位置
     ?* @param {HTMLInputElement/HTMLTextAreaElement} elem
     ?* @param {Number} index
     ?*/
    function setCursorPosition(elem, index) {
        var val = elem.value;
        var len = val.length;

        // 超过文本长度直接返回
        if (len < index) return;
        setTimeout(function () {
            elem.focus();
            if (elem.setSelectionRange) { // 标准浏览器
                elem.setSelectionRange(index, index);
            } else { // IE9-
                var range = elem.createTextRange();
                range.moveStart("character", -len);
                range.moveEnd("character", -len);
                range.moveStart("character", index);
                range.moveEnd("character", 0);
                range.select();
            }
        }, 10)
        ;
        (function (e) {
            e = e || window.event;
            if (this.value == this.getAttribute('placeholder')) {
                if (e.keyCode == 8) {
                    setCursorPosition($(this)[0], 0);
                    return;
                }
            }
        })();
    }
}
/********** ie8 placeholder *********/
//placeholder的使用方法
$(function () {
//获取所有input，绑定placeholder的方法
    $('input').each(function () {
        var _this = $(this)[0];
        //三个参数，第一个不用管，第二个是输入文字时的颜色，第三个是提示语的颜色
        inputPlaceholder(_this, '#000', '#9A9A9A');
    })
})