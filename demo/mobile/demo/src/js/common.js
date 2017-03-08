//console.log("common....");
;(function($, undefined){
$.toast = function(content,time){
    function show(){
        $(".toast").html('<div class="content">'+content+'</div>');
        if(!$(".toast").is(":visible")){
            $(".toast").fadeIn();
            hide();
        }
    }
    function  hide(){
        setTimeout(function(){
            $(".toast").fadeOut();
        },time)
    }
    time= (time?time:1000);
    if($(".toast").length<=0){
        $("body").append($('<div class="toast"><div class="content">'+content+'</div></div>'));
    }
    show();
};
window.alert = function(content){
    $.toast(content);
}
})(Zepto);
$(function(){
    //解决键盘弹出 输入框被覆盖的bug
    (function(){
        var h = $("body").height();
        $(window).on("resize",function(){
            //alert(window.innerHeight);
            var temp = $(window).height();
            if(temp<h){
                $("body").height(h);
            }else{
                $("body").height(temp);
            }
        });

    })();


    $(".checkbox").click(function(){
        if($(this).hasClass('checked')){
            $(this).removeClass('checked').addClass('check-none');
            $(this).siblings('input').removeAttr("checked");
        }
        else
        {
            $(this).removeClass('check-none').addClass('checked');
            $(this).siblings('input').attr('checked','checked');
        }

    });

    /********弹框**********/
    $('#bomb').click(function(){
        $("#bomb_tk").show();
        $(".blockUI").show();
    });
    $(".close,.blockUI").click(function(){
        $("#bomb_tk").hide();
        $(".blockUI").hide();
    });
});

function check(obj){
    if(obj.checked=="checked")
    {
        $(".item span").removeClass('check-none').addClass('checked');
    }else if(obj.checked=="false")
    {
        $(".item span").removeClass('checked').addClass('check-none');
    }
}
