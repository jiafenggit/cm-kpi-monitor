;(function( $ ) {

$(function(){
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

	$("#category a").bind("click", eventCategoryClick);
	$("#areaSelector").select({"option": arrMapDict});

});

})( jQuery );