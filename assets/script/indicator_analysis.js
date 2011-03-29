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
	$.datepicker.regional['zh-CN'] = {
			closeText: '关闭',
			prevText: '&#x3c;上月',
			nextText: '下月&#x3e;',
			currentText: '今天',
			monthNames: ['一月','二月','三月','四月','五月','六月',
			'七月','八月','九月','十月','十一月','十二月'],
			monthNamesShort: ['一','二','三','四','五','六',
			'七','八','九','十','十一','十二'],
			dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
			dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
			dayNamesMin: ['日','一','二','三','四','五','六'],
			weekHeader: '周',
			dateFormat: 'yy-mm-dd',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: true,
			yearSuffix: '年'};
	$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
	
	$('#daySelector').datepicker({
		showOn:"button",
		buttonImage: "assets/img/transparet_datepicker.png",
		buttonImageOnly: true,
		dateFormat: "yy-mm-dd",
		beforeShow: function () {
			setTimeout(
				function () {
					$('#ui-datepicker-div').css("z-index", 1000000001);
				}, 100
			);
		},
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
