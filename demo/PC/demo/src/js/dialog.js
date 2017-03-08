/**
 * Created by Administrator-PRP on 2016/1/13.
 */
(function(window,jQuery){
    $.dialog = function(el,callback){
        var showMask=true;
        var index ;
        var $this = $(el);
        var area = ['428px', '298px'];
        if($this.hasClass("dialog2")){
            area= ['430px', '398px'];
        }else if($this.hasClass("dialog3")){
            area=  [ '680px','665px'];
        }else if($this.hasClass("dialog4")){
            area= [ "430px","290px"];
        }else if($this.hasClass("dialog5")){
            area= [ "659px","489px"];
        }else if($this.hasClass("dialog6")){
            area=["430px","360px"];
        }
        function open(callback) {
                index = layer.open({
                    type: 1,
                    closeBtn: 0, //不显示关闭按钮
                    shift: 2,
                    skin:$this.hasClass("dialog5")?'new-skin':"",
                    shadeClose: showMask, //开启遮罩关闭
                    content: el,
                    title: false,
                    area:area,
                    success: function(layero, index){
                        callback($this);
                    }
                });

        }
        $this.close=function(){
            layer.close(index);
        };
        el.find(".close-btn").click(function(){
            layer.close(index);
        });
        open(callback);
    };
})(window,jQuery);
