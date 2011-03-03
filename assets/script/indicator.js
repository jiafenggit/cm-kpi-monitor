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
	$("#category-min a").bind("click", eventChangeDayOrMonth);

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

	$("#dateSelector").dateSelect({
		onSelect:function(date){
			alert(date);
		}
	});

	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'chart', 
			defaultSeriesType: 'area'
		},
		title: {
			text: ' '
		},
		subtitle: {
			text: ' '
		},
		xAxis: {
			labels: {
				formatter: function() {
					return Highcharts.dateFormat('%d %b', this.value); // clean, unformatted number for year
				}
			}							
		},
		yAxis: {
			title: {
				text: '净增客户数（单位：千）'
			},
			labels: {
				formatter: function() {
					return this.value / 1000 +'k';
				}
			}
		},
		tooltip: {
			formatter: function() {
				var d = new Date();

				d.setTime(this.x);
				d = d.getFullYear() + '年' + ( d.getMonth() + 1 ) + "月" + d.getDate() + "日   ";

				return d + this.series.name +' : '+
					Highcharts.numberFormat(this.y, 0);
			}
		},
		plotOptions: {
			area: {
				marker: {
					enabled: true,
					symbol: 'circle',
					radius: 3,
					states: {
						hover: {
							enabled: true
						}
					}
				}
			}
		},
		series: [{
			name: '净增用户数',
			data: [1000, 1200, 800, 1200, 1000, 
				1500, 2400, 2000, 3000, 2800,
				2800, 2800, 2800, 2800, 2800, 
				3200, 3600, 3800, 4000, 4200,
				3800, 4200, 4200, 4200, 2800,
				3800, 4200, 4200, 4200, 2800,
				3000
			],
			pointStart: Date.UTC(2010, 0, 1),
			pointInterval: 24 * 3600 * 1000 // one day
		}]
	});

});

})( jQuery );