/**
 * Created by Administrator-PRP on 2015/12/25.
 */
/*
console.log("lib!!");
*/
//日历
(function(jQuery){
    $.fn.datePicker = function(options){
        //指定日期格式,未指定日期格式
        function getDay4Mon(year,month){//获取指定月份有几天
            var count=0;
            switch(month){
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    count=31;
                    return count;
                case 4:
                case 6:
                case 9:
                case 11:
                    count=30;
                    return count;
                case 2:
                    if(year%4==0)
                        count=29;
                    else
                        count=28;
                    if((year%100==0)&&(year%400!=0))
                        count=28;
                    return count;
            }
        }
        //标准日期格式化
        // 对Date的扩展，将 Date 转化为指定格式的String
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
        // 例子：
        // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
        // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
        Date.prototype.Format = function(fmt)
        { //author: meizz
            var o = {
                "M+" : this.getMonth()+1,                 //月份
                "d+" : this.getDate(),                    //日
                "h+" : this.getHours(),                   //小时
                "m+" : this.getMinutes(),                 //分
                "s+" : this.getSeconds(),                 //秒
                "q+" : Math.floor((this.getMonth()+3)/3), //季度
                "S"  : this.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt))
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)
                if(new RegExp("("+ k +")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            return fmt;
        };
        /**
         * @param year
         * @param month
         * @param type  1 星期日在前，2 星期日在后
         * @param isFull  是否全部填满，全部填满需要涉及到上个月和下个月的数据
         * @returns {Array}
         */
        function getGrid(year,month,type,isFull){//返回计算后的格子数组
            //console.log("获取格子数组");
            var firstDay = new Date(year,month,1).getDay();
            firstDay=(firstDay==0?7:firstDay);
            month =month+1;
            var countDays = getDay4Mon(year,month);
            //console.log(year+"/"+month+"/1");
            //console.log("总天数："+countDays+"--->第一天星期："+firstDay);

            var row = 7;//列数
            var t = row-firstDay+1;//第一行几个
            var t2 = (countDays -t)%row;//最后一行几个
            var col = t2==0?(countDays -t)/row+1:(countDays-t-t2)/row+2;//列数

            var count = col*row;//纵行数列数
            var index1 = firstDay-1;//第一个的索引
            var index2 = count-(t2==0?0:(row - t2))-1;//最后一个的索引
            //console.log("第一天的索引:"+index1+",最后一天的索引:"+index2);
            //console.log("总格子数："+count+"-->col="+col+"|row="+row);
            //生成数组
            var arr = [];
            for(var i= 0,j=0;i<count;i++){
                if(i>=index1&&index2>=i){
                    j++;
                }else{
                    j=0;
                }
                arr.push(j);
            }
            //console.log(arr);
            return arr;
        }
        //格式化
        var formatType =(!options.format?"yyyy/MM/dd":options.format);
        var filter = (!options.filter?[]:options.filter);
        $(this).each(function(){
            var $this =$(this);
            var options= options||{};
            var currentTime = options.currentTime? new Date(options.currentTime):new Date();
            var year = currentTime.getFullYear();
            var month = currentTime.getMonth();
            //初始化dom
            /*
             模拟json：{
             语言：中文，英文 （快捷）
             月份：[] （配置：1-12月份的显示方式）
             }
             */
            var months = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
            //var months2 = ["Jan.","Feb.","Mar.","April.","May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];
            //语言：中文
            //var weeks = ["周一","周二","周三","周四","周五","周六","周日"];
            //var weeks2 = ["周日","周一","周二","周三","周四","周五","周六"];
            //语言：英文
            //MO,TU,WE,TH,FR,FA,SU
            var weeks3 = ["MO","TU","WE","TH","FR","FA","SU"];
            //var weeks4 = ["SU","MO","TU","WE","TH","FR","FA"];
            //日期的方式
            //初始化月份
            function init(arr){
                var arr1=[];
                var content = '<div class="date-bar"><span class="prev"></span><span class="content">'+months[month]+'&nbsp;&nbsp;'+year+'</span><span class="next"></span></div>';
                var dls = '<div class="date-selector"><dl class="date-row date-title"><dd class="date-col">MO</dd><dd class="date-col">TU</dd><dd class="date-col">WE</dd><dd class="date-col">TH</dd><dd class="date-col">FR</dd><dd class="date-col">FA</dd><dd class="date-col">SU</dd></dl>';
                arr1.push(content);
                arr1.push(dls);
                //特殊处理
                if(Math.floor(arr.length/7)==6){
                    $this.css("padding-bottom","0px");
                }else{
                    $this.css("padding-bottom","30px");
                }
                var temp ="<dl class='date-row'>";
                for(var i=1;i<=arr.length;i++){
                    var t = arr[i-1];
                    var t2 = new Date(year,month,t);
                    var isActive = false;
                    var value = "";
                    for(var m=0;m<filter.length;m++){
                        //console.log("mm==="+filter[m]+"|"+(new Date(filter[m].date).getTime()==t2.getTime()));
                        if(new Date(filter[m].date).getTime()==t2.getTime()){
                            isActive=true;
                            value="回款额:"+filter[m].money+"元";
                            break;
                        }
                    }
                    temp+='<dd data-date="'+t2.Format(formatType)+'"'+(isActive?('data-value="'+value+'"'):"")+' class="date-col '+(t==0?"":"date")+(isActive?" active":"")+'">'+(t==0?"":t)+ '</dd>';
                    if(i%7==0){
                        temp+="</dl>";
                        arr1.push(temp);
                        temp="<dl class='date-row'>";
                    }
                }
                $this.html(arr1.join("")+"</div>");
                //init(getGrids(year,month));
                $this.find(".next").click(function(){
                    //初始化年份和月份
                    if(month>=11){
                        month=0;
                        year+=1;
                    }else{
                        month+=1;
                    }
                    //初始化日期
                    init(getGrid(year,month));
                    //console.log("----"+month+"|"+year);

                });
                $this.find(".prev").click(function(){
                    //初始化日期
                    if(month<=0){
                        month=11;
                        year-=1;
                    }else{
                        month-=1;
                    }
                    init(getGrid(year,month));
                    //console.log("----"+month+"|"+year)
                });
                $this.find(".date").hover(function(e){
                    if(!!$(this).attr("data-value")){
                        if($this.find(".tip").length<=0){
                            $this.append('<div class="tip" style="display: none"><i class="icon-tip"></i></div>');
                        }
                        var position = $(this).position();
                        var w = $(this).outerWidth();
                        var h = $(this).innerHeight();
                        //console.log(w+"|"+h);
                        $this.find(".tip").css({"top":position.top+h+10,"left":position.left-(150-w)/2+15}).html("<i class='icon-tip'></i><p class='p1'>"+$(this).data("date")+"</p><p>"+$(this).data("value")+"</p>").fadeIn("fast");
                    }
                },function(){
                    $this.find(".tip").stop(true).fadeOut("fast");
                });
            }
            init(getGrid(year,month));
        });
    };
})();
//图表
(function($){
    $.initCharts=function(el,xdata,ydata){
        el.highcharts({
            title :{

                text:null//禁用标题
            },
            xAxis: {
                labels:{
                    enabled:false
                },
                lineColor:"#c8c8c8",
                lineWidth:2,
                tickLength:0,
                tickWidth:0,
                categories: xdata,
                offset:0
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels:{
                    enabled:false
                },
                lineWidth:2,
                lineColor:"#c8c8c8",
                minPadding:0, startOnTick:false
            },
            Color: '#359df6',
            plotOptions: {
                area: {
                    color:"#b2dcff"
                }
            },
            tooltip: {
                valueSuffix: '元'
            },
            legend: {
                enabled :false//去掉图例
            },
            credits:{
                enabled:false // 禁用版权信息
            },
            series: [{
                type: 'area',
                name: '投资额',
                data:ydata
            }]
        });
    }
})(jQuery);
