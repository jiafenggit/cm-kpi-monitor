;(function( $ ){

$(function(){
	var _timer_ = undefined;
	
	function refreshIndicator(){
		//刷新指标数据
		////
	}

	function loadAreaData(){
		//加载数据
		////
		//这里假定数据已经组装好了
		setTimeout(function(){
			$("#areaData").css({
				"background": "none"
			}).children().show();
		}, 1000);
	}

	function eventMapAreaClick(e){
		e.preventDefault();

		$("#pop-areaData").hide();

		//突出显示选中区域
		var rel = $(e.target).attr("rel");
		var allArea = $("div.area");
		var clickedArea = $("div.area-" + rel);

		if(clickedArea.hasClass("selected")){
			$("#map-area area").hover(eventMapAreaMouseenter, eventMapAreaMouseleave);
			//当前已选中，恢复默认状态
			allArea.css("opacity", "");
			clickedArea.removeClass("selected");
			//恢复右边的指标数据
			//
		} else {
			$("#map-area area").unbind("mouseenter mouseleave");
			//当前为选中，隐掉其他，突出当前
			allArea.css("opacity", "0.2");
			allArea.filter("div.selected").removeClass("selected");
			clickedArea.animate({opacity: ""}, 150).addClass("selected");
			//clickedArea.css("opacity", "").addClass("selected");

			//更新右边指标数据
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
		$("#areaData").children().hide();
		$("#pop-areaData").hide();
	}

	function eventCategoryClick(e){
		e.preventDefault();

		var target = $(e.target);

		if( target.hasClass("selected") ){
			return
		} else {
			//切换选中的样式
			$("#category a.selected").removeClass("selected");
			target.addClass("selected");
			
			//刷新数据
			////
			refreshIndicator();
		}
	}


	$("#map-area area").bind("click", eventMapAreaClick).hover(eventMapAreaMouseenter,eventMapAreaMouseleave);
	$("#category a").bind("click", eventCategoryClick);

	$("#dateSelector").dateSelect();

});

})( jQuery );