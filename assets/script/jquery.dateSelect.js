;(function( $ ) {

$.fn.dateSelect = function(setting){

	var config = $.extend({}, $.fn.dateSelect.settings, setting);

	var eventHide = function(e){
		var node = e.target;

		while( node.id != e.data.id && node.id != e.data.id+"-panel" && node.nodeName.toLowerCase() != "html" ){
			node = node.parentNode;
		}

		if(node.nodeName.toLowerCase() == "html"){
			$("#" + e.data.id + "-panel").hide();
			$(document).unbind("click", eventHide);
		}
	};

	var eventChangeOption = function(e){
		e.preventDefault();
		e.stopPropagation();

		var year = $("#" + e.data.id + "-panel .date-selector-year").text();
		var month = $(e.target).text();

		var dateFormat = parseInt(year, 10) + "-" + parseInt(month, 10);

		$("#" + e.data.id + " .date-selector-text").text(year + month).attr("value", dateFormat);
		$("#" + e.data.id + "-panel").hide();

		$.isFunction(config.onSelect) ? config.onSelect(dateFormat) : null;
	};

	var eventChangeYear = function(e){
		e.preventDefault();
		e.stopPropagation();

		var $this = $(this);
		var $year= $this.siblings("div.date-selector-year");
		var year = parseInt($year.text(), 10);
		var date = getDate();
		var optionsWrap = $("#" + e.data.id);

		if ( $this.hasClass("date-selector-prev-year") ) {
			year--;
			$year.text(year + "年" );
		} else if ( $this.hasClass("date-selector-next-year") ) {
			year++;
			$year.text( year + "年" );
		}

		if(year == date.year){
			optionsWrap.find("li").eq(--date.month).addClass("current");
		} else {
			optionsWrap.find("li").removeClass("current");
		}
	};
	
	var eventTriggerClick = function(e){
		e.preventDefault();
		e.stopPropagation();

		var id = e.data.id;
		var select = $("#" + id);
		var optionsWrap = $("#" + id + "-panel");

		if(optionsWrap.size() == 0){
			//cal the pop's location
			var offset = select.offset();
			var	top = offset.top + select.height();
			var left = offset.left;

			//not find, create a new one
			var HTML = $("<div />", {
				"id": id + "-panel",
				css: {
					position: "absolute",
					top: top,
					left: left - 4,
					width: config.width || select.width(),
					textAlign: "left"
				}
			});

			HTML.append("<div class=adapt-panel>" +
				"<div class=adapt-panel-hd>" +
					"<div class=adapt-panel-hd-l></div><div class=adapt-panel-hd-r></div>" + 
				"</div>" +
				"<div class=adapt-panel-bd>" +
					"<div class=adapt-panel-bd-l></div><div class=adapt-panel-bd-r></div>" +
				"</div>" +
				"<div class=adapt-panel-ft>" +
					"<div class=adapt-panel-ft-l></div><div class=adapt-panel-ft-r></div>" +
				"</div>" +
			"</div>");

			var date = getDate();
			
			var yearBar = $("<div />", {
				"class": "date-selector-year-bar",
				html: $("<a class=date-selector-prev-year /><a class=date-selector-next-year /><div class=date-selector-year>" + date.year + "年" + "</div>")
			});

			yearBar.find("a.date-selector-prev-year, a.date-selector-next-year").bind("click", {"id": id + "-panel"}, eventChangeYear);

			yearBar.appendTo(HTML.find(".adapt-panel-bd-r"));

			var UL = $("<ul class=date-selector-ul />");

			for(var i = 1; i <= 12; i++){
				var cur = (i == date.month) ? "current" : "";
				var LI = $("<li />", {
					"value": i,
					text: i+"月",
					"class": cur
				}).bind("click", {"id": id}, eventChangeOption);

				LI.appendTo(UL);
			}

			UL.appendTo(HTML.find(".adapt-panel-bd-r"));

			HTML.appendTo(document.body);
		} else if(optionsWrap.css("display") == "none") {
			//just show the one
			optionsWrap.show();
			$(document).bind("click", {"id": id}, eventHide);
		} else {
			optionsWrap.hide();
			$(document).unbind("click", eventHide);
		}
	};

	var getDate = function(){
		var d = new Date(),
			year = d.getFullYear(),
			month = d.getMonth() + 1;
			date = d.getDate();

		return {
			"year": year,
			"month": month,
			"text": year + "年" + month + "月",
			"value": year + "-" + month
		};
	};

	return this.each(function(){
		var $this = $(this);

		//init
		var date = getDate();
		$this.find(".date-selector-text").text(date.text).attr("value", date.value);

		$this.bind("click", {"id": this.id}, eventTriggerClick);
	});

};

$.fn.dateSelect.settings = {
	"width": 240
};

})( jQuery );