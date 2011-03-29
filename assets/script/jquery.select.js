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
		var val = $(e.target).parent().attr("value");

		$("#" + e.data.id + " .area-selector-text").text(txt).attr("value", val);
		$("#" + e.data.id + "-options").find("li").removeClass("current");
		$(e.target).parent().addClass("current");
		$("#" + e.data.id + "-options").hide();

		$.isFunction(config.onSelect) ? config.onSelect(val, txt) : null;
	};
	
	var eventTriggerClick = function(e){
		e.preventDefault();

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
					top: top + 2 + "px",
					left: left,
					width: config.width || select.width(),
					textAlign: "left",
					zIndex:100001,
					background:"#fff",
					padding:"5px",
					border:"1px solid #9B9F9F",
					"border-radius": "5px",
					"box-shadow": "1px 1px 5px #aaa"
				}
			});

			var UL = $("<ul class=area-selector-ul />");

			$("<li value=0 class='capital current'><a href=#>北京市</a></li>").bind("click", {"id": id}, eventChangeOption).appendTo(UL);;

			$.each(config.option, function(i, obj){
				$("<li value=" + obj.value + "><a href=#>" + obj.text + "</a></li>").bind("click", {"id": id}, eventChangeOption).appendTo(UL);
			});

			UL.appendTo(HTML);

			HTML.appendTo(document.body);

			$(document).bind("click", {"id": id}, eventHide);
		} else if(optionsWrap.css("display") == "none") {
			//just show the one
			optionsWrap.show();
			$(document).bind("click", {"id": id}, eventHide);
		} else {
			optionsWrap.hide();
			$(document).unbind("click", eventHide);
		}

	};

	return this.each(function(){
		var $this = $(this);

		$this.bind("click", {"id": this.id}, eventTriggerClick);
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