/**
 * Created by ����ΰ on 2016/5/13.
 * inputĬ��placeholder��ʽ
 */

function inputPlaceholder(input, colorIn, colorPl) {
    try {
        //�������IE����������׳���ʹ��Ĭ�ϵ�placeholder
        if (!window.navigator.userAgent.match(/IE (\d)/)) {
            throw new Error();
        }
        //�����IE 9��8��7������ִ�з���
        if (!(window.navigator.userAgent.match(/IE (\d)/)[1] > 9)) {
            //��ȡ����input
            var input = $('input');
            //�����input�������
            if (input[0]) {
                //��ÿһ��input�󶨷���
                $(document).find(input).each(function () {
                    //��ȡinputԪ�ض���
                    var _this = $(this)[0];
                    //��ÿһ��inputԪ�����value���ԣ�����ֵΪ��Ԫ�ص�placeholder�����û�и����ԣ����valueֵΪ��
                    _this.setAttribute('value', _this.getAttribute('placeholder') || "");
                    //����inputԪ����ɫΪ��ʾ����ɫ
                    _this.style.color = colorPl;
                });
                //����input�����ʱ
                input.on('click', function (e) {
                    //�¼���������Դ���
                    e = e || window.event;
                    //���value��ֵ��placeholderֵ��Ȼ�Ϊ��ʱ
                    if ((this.value == this.getAttribute('placeholder')) || (this.value == '')) {
                        //����value��ֵΪplaceholder��ֵ
                        this.value = this.getAttribute('placeholder') || "";
                        //������ɫΪ��ʾ����ɫ
                        this.style.color = colorPl;
                        //���ù��λ��Ϊ�����
                        setCursorPosition($(this)[0], 0);
                    }
                    //�����ʱ�¼�Ϊ����˸��
                    if (e.keyCode == 8) {
                        //����value��ֵΪplaceholder��ֵ������
                        this.value = this.getAttribute('placeholder');
                        return;
                    }
                    //������ĳ������������ʱ
                }).on('keydown', function (e) {
                    //��ȡ�¼�
                    e = e || window.event;
                    //�����ǰinput��value��placeholderֵ��Ȼ�Ϊ��ʱ
                    if ((this.value == this.getAttribute('placeholder')) || (this.value == '')) {
                        //����value��ֵΪ��
                        this.value = '';
                        //������ɫΪ������ɫ
                        this.style.color = colorIn;
                    }
                    //�������İ�����tab��ʱ
                    if (e.keyCode == 9) {//����tab����ʱ��,input�е�value��ʧ������
                        //��input��value��ֵ����Ϊplaceholder��ֵ
                        this.value = this.value || this.getAttribute('placeholder');
                        //���value��ֵ��placeholder��ֵ���
                        if (this.value == this.getAttribute('placeholder')) {//����ǣ���ʾ�����ɫ
                            //������ɫΪ��ʾ����ɫ
                            this.style.color = colorPl;
                        }
                    }
                    //��������ĳ��������̧��ʱ
                }).on('keyup', function (e) {
                    //�����input��value��ֵ��placeholder��ֵ��Ȼ�Ϊ��ʱ
                    if ((this.value == this.getAttribute('placeholder')) || (this.value == '')) {
                        //���ø�value��ֵΪplaceholder��ֵ��Ϊ��
                        this.value = this.getAttribute('placeholder') || "";
                        //������ɫΪ��ʾ����ɫ
                        this.style.color = colorPl;
                        //���ù��λ���������
                        setCursorPosition($(this)[0], 0);
                    }
                    //console.log(e.keyCode);   ��������û����
                });
            }
        }
    } catch (e) {
        //�����ˡ�
    }
    /*
     ?* ����������(input/textarea)����λ��
     ?* @param {HTMLInputElement/HTMLTextAreaElement} elem
     ?* @param {Number} index
     ?*/
    function setCursorPosition(elem, index) {
        var val = elem.value;
        var len = val.length;

        // �����ı�����ֱ�ӷ���
        if (len < index) return;
        setTimeout(function () {
            elem.focus();
            if (elem.setSelectionRange) { // ��׼�����
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
//placeholder��ʹ�÷���
$(function () {
//��ȡ����input����placeholder�ķ���
    $('input').each(function () {
        var _this = $(this)[0];
        //������������һ�����ùܣ��ڶ�������������ʱ����ɫ������������ʾ�����ɫ
        inputPlaceholder(_this, '#000', '#9A9A9A');
    })
})