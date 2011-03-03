;(function( $ ) {

$.fn.select = function(setting){

	var config = $.extend({}, $.fn.select.settings, setting);

	var eventHide = function(e){
		var node = e.target;

		while( node.id != e.data.id && node.id != e.data.id+"-options" && node.nodeName.toLowerCase() != "html" ){
			node = node.parentNode;
		}

		if(node.nodeName.toLowerCase() == "html"){
			$("#" + e.data.id + "-options").hide();
			$(document).unbind("click", eventHide);
		}
	};

	var eventChangeOption = function(e){
		var txt = $(e.target).text();
		var val = $(e.target).attr("value");

		$("#" + e.data.id + " .area-selector-text").text(txt).attr("value", val);
		$("#" + e.data.id + "-options").hide();

		$.isFunction(config.onSelect) ? config.onSelect(val, txt) : null;
	};
	
	var eventTriggerClick = function(e){

		var id = e.data.id;
		var select = $("#" + id);
		var optionsWrap = $("#" + id + "-options");

		if(optionsWrap.size() == 0){
			//cal the pop's location
			var offset = select.offset();
			var	top = offset.top + select.height();
			var left = offset.left;

			//not find, create a new one
			var HTML = $("<div />", {
				"id": id + "-options",
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

			var UL = $("<ul />");

			$.each(config.option, function(i, obj){
				var LI = $("<li />", {
					"value": obj.value,
					text: obj.text,
					css: {
						cursor: "pointer",
						float: "left",
						width: "33%",
						color: "#1044AA",
						fontSize: "1.2em",
					}
				}).bind("click", {"id": id}, eventChangeOption);

				LI.appendTo(UL);
			});

			UL.appendTo(HTML.find(".adapt-panel-bd-r"));

			HTML.appendTo(document.body);
		} else {
			//just show the one
			$("#" + id + "-options").show();
		}

		$(document).bind("click", {"id": id}, eventHide)
	};

	return this.each(function(){
		var $this = $(this);

		$this.find(".area-selector-trigger").bind("click", {"id": this.id}, eventTriggerClick);
	});

};

$.fn.select.settings = {
	"option": [{
		"value": "1",
		"text": "测试0"
	}, {
		"value": "1",
		"text": "测试1"
	}]
};

})( jQuery );