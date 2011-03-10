;(function( $ ) {

$(function(){

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

	function eventChangeChartAug(e){
		e.preventDefault();

		var target = $(e.target);

		if( target.hasClass("selected") ){
			return
		} else {
			//切换选中的样式
			$("#category-chart a.selected").removeClass("selected");
			target.addClass("selected");
			
			alert("想更新图表？我在'assets/script/indicator_analysis.js [function]-eventChangeChartAug中'");
			//切换图标数据
			////
		}
	}

	$("#category-min a").bind("click", eventChangeDayOrMonth);
	$("#category-chart a").bind("click", eventChangeChartAug);

	$(".indicator-name-help").hover(function(e){
		$(".tool-tips").css({
			left: e.pageX + "px",
			top: e.pageY - 22 + "px"
		}).show();
	}, function(){
		$(".tool-tips").hide();
	});
	
	$("#areaSelector").select({
		option: arrMapDict, 
		width: 300,
		onSelect: function(val, txt){
			alert(val + "-" + txt);
		}
	});

	// Datepicker
	$('#daySelector').datepicker({
		showOn:"button",
		buttonImage: "assets/img/transparet_datepicker.png",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd",
		onSelect: function(date){
			var arrDate = date.split("-")
			var cnDate = arrDate[0] + "年" + arrDate[1] + "月" + arrDate[2] + "日";
			$(this).siblings(".date-selector-text").text(cnDate);
			alert(date);
		}
	});

	$("img.ui-datepicker-trigger").css({
		position: "absolute",
		right: 0,
		top: 0
	});

});

})( jQuery );