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
			var r = Raphael(o.paperDiv, 70, 70),
				rad = 22,//外线的位置定位
				defaultText = o.cicleNum+'%';
				var proceInt=parseInt(defaultText);
				speed = 250;
			
			var rc=r.circle(35, 35,22);//15 内线位置定位
				rc.attr({ stroke: "#e6e6e6", "stroke-width": 3});//内线宽度
			var title = r.text(35, 35, defaultText).attr({
				font: '12px Microsoft JhengHei', //文字大小
				fill: '#999999'
			}).toFront();
			
			r.customAttributes.arc = function(value, color, rad){
				var v = 3.6*value,
					alpha = v == 360 ? 359.99 : v,
					alpha = v == 360 ? 359.33: v,
					random = o.random(10, 240),
					a = (random-alpha) * Math.PI/180,
					b = random * Math.PI/180,
					sx = 35 + rad * Math.cos(b),
					sy = 35 - rad * Math.sin(b),
					x = 35 + rad * Math.cos(a),
					y = 35 - rad * Math.sin(a),
					path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
				return { path: path, stroke: color }
			}
		
			$(o.getDiv).find('.arc').each(function(i){
				var t = $(this), 
					value=o.num;
					if(Number(value)>=100){
						value=0;
						rc.attr({stroke: "#fe7140", "stroke-width": 3});
					}else if(Number(value)>=70){
						var z = r.path().attr({ arc: [value, "#fe7140", rad], 'stroke-width': 3 });
					}else if(Number(value)>=30){
						var z = r.path().attr({ arc: [value, "#fe7140", rad], 'stroke-width': 3 });//外线宽
					}else{
						var z = r.path().attr({ arc: [value, "#fe7140", rad], 'stroke-width': 3 });
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

