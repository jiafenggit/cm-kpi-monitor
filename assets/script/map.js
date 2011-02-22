;(function( $ ){

$(function(){

	function eventMapAreaClick(e){
		e.preventDefault();

		//突出显示选中区域
		var rel = $(e.target).attr("rel");
		var allArea = $("div.area");
		var clickedArea = $("div.area-" + rel);

		if(clickedArea.hasClass("selected")){
			//当前已选中，恢复默认状态
			allArea.css("opacity", "1");
			clickedArea.removeClass("selected");
			//恢复右边的指标数据
			//
		} else {
			//当前为选中，隐掉其他，突出当前
			allArea.css("opacity", "0.3");
			allArea.filter("div.selected").removeClass("selected");
			clickedArea.animate({opacity: 1}, 300).addClass("selected");

			//更新右边指标数据
		}
	}

	$("#map-area area").bind("click", eventMapAreaClick);

});

})( jQuery );