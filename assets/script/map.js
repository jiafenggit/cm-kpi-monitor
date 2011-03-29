;(function( $ ){

$(function(){
	
	//init map
	(function(){
		var areas = $("#map div.area");

		$.each(arrMapDict, function(index, item){
			var n = parseInt(item.value, 10);
			var area = areas.eq( n );
			var c = "area-" + n;

			switch(item.rank){
				case "1": {
					c += "-db";
					break;
				}
				case "2": {
					c += "-lb";
					break;
				}
				case "3": {
					c += "-og";
					break;
				}
				default: break;
			}

			area.addClass(c);
		});
	})();

	var _timer_ = undefined;
	
	function refreshIndicator(Category){
		//刷新指标数据
		////
	}

	function loadAreaData(){
		//加载数据
		////
		/*
		发ajax请求去取数据，然后更新#areaData,


		最后让#areaData显示
			$("#areaData").css({
				"background": "none"
			}).children().show();

		*/



		//以下是静态页面模拟显示，在添加动态数据时请删除下面代码
		setTimeout(function(){
			$("#areaData").css({
				"background": "none"
			}).children().css("visibility", "visible");
		}, 1000);
	}

	function eventMapAreaClick(e){
		e.preventDefault();

		clearTimeout(_timer_);
		_timer_ = undefined;

		$("#pop-areaData").hide();

		//突出显示选中区域
		var rel = $(e.target).attr("rel");
		var allArea = $("div.area");
		var clickedArea = $("div.area-" + rel);

		if( clickedArea.hasClass("selected") ){
			//当前已选中，恢复默认状态
			$("#map-area area").hover(eventMapAreaMouseenter, eventMapAreaMouseleave);
			allArea.css("backgroundPosition", "0 0");
			clickedArea.removeClass("selected");

			//恢复右边的指标数据
			//
		} else {
			//当前为选中，隐掉其他，突出当前
			$("#map-area area").unbind("mouseenter mouseleave");
			allArea.css("backgroundPosition", "-415px 0");
			allArea.filter("div.selected").removeClass("selected");
			clickedArea.css("backgroundPosition", "0 0").addClass("selected");

			//更新右边指标数据
			//
		}
	}

	function eventMapAreaMouseenter(e){
		e.preventDefault();
		
		_timer_ = setTimeout(function(){
			var left = e.pageX + 30 + "px",
				top = e.pageY + 10 + "px";

			var rel = $(e.target).attr("rel"),
				enterArea = $("div.area-" + rel);

			$("#areaData").show();

			$("#pop-areaData").css({
				"top": top,
				"left": left
			}).show();

			loadAreaData();
		}, 500);
	}

	function eventMapAreaMouseleave(e){
		e.preventDefault();
		
		clearTimeout(_timer_);
		_timer_ = undefined;

		$("#areaData").css({
			"background": "url(assets/img/loading.gif) 50% 50% no-repeat"
		}).hide();
		$("#areaData").children().css("visibility", "hidden");
		$("#pop-areaData").hide();
	}

	function eventCategoryClick(e){
		e.preventDefault();

		var target = $(e.target);

		if( target.hasClass("selected") ||
			target.hasClass("nav-l-selected") ||
			target.hasClass("nav-r-selected") ){
			return
		} else {
			//切换选中的样式
			$("#category a.selected").removeClass("selected");
			$("#category a.nav-l-selected").removeClass("nav-l-selected");
			$("#category a.nav-r-selected").removeClass("nav-r-selected");

			if ( target.hasClass("nav-l") ) {
				target.addClass("nav-l-selected");
			} else if ( target.hasClass("nav-r") ) {
				target.addClass("nav-r-selected");
			} else {
				target.addClass("selected");
			}
			
			//刷新数据
			////
			refreshIndicator(target.text());
		}
	}


	$("#map-area area").bind("click", eventMapAreaClick).hover(eventMapAreaMouseenter,eventMapAreaMouseleave);
	$("#category a").bind("click", eventCategoryClick);

	$("#dateSelector").dateSelect({
		onSelect:function(date){
			//在此实现选择日期后的数据加载
			alert(date);
		}
	});

});

})( jQuery );