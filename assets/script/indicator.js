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
		}
	}

	function eventChangeDayOrMonth(e){
		e.preventDefault();

		var target = $(e.target);

		if( target.hasClass("selected") ){
			return
		} else {
			//切换选中的样式
			$("#category-min a.selected").removeClass("selected");
			target.addClass("selected");
			
			//刷新数据
			////
		}
	}

	$("#category a").bind("click", eventCategoryClick);
	$("#areaSelector").select({"option": arrMapDict, "width": 300});
	$("#category-min a").bind("click", eventChangeDayOrMonth);

	$(".indicator-name-help").hover(function(e){
		$(".tool-tips").css({
			left: e.pageX + "px",
			top: e.pageY - 22 + "px"
		}).fadeIn();
	}, function(){
		$(".tool-tips").hide();
	});

	// Datepicker
	$('#daySelector').datepicker({
		showOn:"button",
		buttonImage: "assets/img/transparet_datepicker.png",
		buttonImageOnly: true,
		dateFormat: "yy年mm月dd日",
		onSelect: function(date){
			$(this).siblings(".date-selector-text").text(date);
		}
	});

	$("img.ui-datepicker-trigger").css({
		position: "absolute",
		right: 0,
		top: 0
	});

});

})( jQuery );