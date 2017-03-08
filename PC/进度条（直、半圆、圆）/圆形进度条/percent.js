$(function(){
	var o = {
		num:"100%",
		cicleNum:"100%",
		paperDiv:".paper",
		getDiv:".get",
		init: function(){
			this.paper();
		},
		random: function(l, u){
			var str = 0.35441205295814837;
			return Math.floor((str*(u-l+1))+l);
		},
		paper: function(){
			var r = Raphael(o.paperDiv, 40, 40),//进度条的总体宽度和高度
				rad = 15,//外线的位置定位
				defaultText = o.cicleNum+'%';
				var proceInt=parseInt(defaultText);
				speed = 250;
			
			var rc=r.circle(20, 20, 15);
			//是内线的第一个数值是y值的位置及定位，第二个是x轴的位置和定位；要第一个和第二个两个值要都一样才能正常！
			// 第三个数值是内线的位置定位！要和外线的一样哦，要不然会错开的
				rc.attr({ stroke: "#e6e6e6", "stroke-width": 2});//内线的颜色和内线宽度
			var title = r.text(20, 20, defaultText).attr({//文本位置及定位的（x轴）（y轴）
				font: '12px Microsoft JhengHei', //文字大小
				fill: '#dbdbdb'
			}).toFront();
			
			
			r.customAttributes.arc = function(value, color, rad){
				var v = 3.6*value,
					alpha = v == 360 ? 359.99 : v,
					alpha = v == 360 ? 359.33: v,
					random = o.random(10, 240),
					a = (random-alpha) * Math.PI/180,
					b = random * Math.PI/180,
					sx = 20 + rad * Math.cos(b),
					sy = 20 - rad * Math.sin(b),
					x = 20 + rad * Math.cos(a),
					y = 20 - rad * Math.sin(a),
				//sx sy  x  y着四个是外线的的位置和定位
					path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
				return { path: path, stroke: color }
			}
		
			$(o.getDiv).find('.arc').each(function(i){
				var t = $(this), 
					value=o.num;
					if(Number(value)>=100){
						value=0;
						rc.attr({stroke: "#fcc056", "stroke-width": 2});
					}else if(Number(value)>=70){
						var z = r.path().attr({ arc: [value, "#fe7140", rad], 'stroke-width': 2 });
					}else if(Number(value)>=30){
						var z = r.path().attr({ arc: [value, "#fe7140", rad], 'stroke-width': 2 });//外线宽
					}else{
						var z = r.path().attr({ arc: [value, "#fe7140", rad], 'stroke-width': 2 });
					}
			});
			
		}
	}
	
	function initPercent() {
		$(".paper").each(function() {
            $(this).empty();
			var obj = $(this).next(".get");
			var count = $(obj).find(".arc").find(".percent").val();
			if (Number(count) < 0.001) {
				o.num = 0.01;
				o.cicleNum = count;
			} else {
				o.num = count;
				o.cicleNum = count;
			}
			o.paperDiv = this;
			o.getDiv = obj;
			o.init();
			});
		
	}
	
	initPercent();
	
});