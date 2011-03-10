;(function( $ ) {

$.fn.brainMap = function(setting){

	var config = $.extend({}, $.fn.select.settings, setting);

	var positionBar = function(){
		var bar = $("#brainMap li.brain-map-node-bar-v");

		bar.each(function(index, dom){
			
			var $this = $(dom);
			var $brother = $this.siblings();
			
			if($brother.size() < 2) return

			var	$first = $brother.eq(0).find(".brain-map-node-txt:first"),
				$last = $brother.eq($brother.size()-1).find(".brain-map-node-txt:first");

			var delta = $last.position().top + parseInt( $last.css("marginTop"), 10 ) - $first.position().top - $first.height() - parseInt( $first.css("marginTop"), 10 ) + 1;
			var offsetTop = $first.position().top + $first.height() + parseInt( $first.css("marginTop"), 10 ) - 1;
			
			$this.css({
				height: delta,
				top: offsetTop
			});
		});
	};

	var positionNode = function(parent){
		var children = parent.next(".brain-map-node-children").children();
		var num = children.size() - 1;
		var parentOffset;
		var offset = [];
		
		if(num < 1) return

		for (var i = 0; i < num; i++) {
			var node = children.eq(i).find(".brain-map-node-txt:first");
			positionNode(node);

			if(i == 0 || i == num - 1){
				offset.push(node.position().top + node.height()/2 + parseInt( node.css("marginTop"), 10 ));
			}
		}

		if(offset.length > 1){
			offset = (offset[0] + offset[1])/2;
		} else {
			offset = offset[0];
		}


		parentOffset = parent.position().top + parent.height()/2;

		parent.css("marginTop", Math.floor(offset - parentOffset));
	};

	//创建思维导图一个节点
	var createNode = function(nodeJSON, opt){
		var c, state, delta, $dom;

		if(opt.isFirstNode){
			c = "brain-map-node-first";
		} else if(opt.isLastNode) {
			c = "brain-map-node-last";
		} else {
			c = "brain-map-node-middle";
		}

		if (nodeJSON.state == null) {
			state = "";
		} else {
			state = nodeJSON.state;
		}

		if (nodeJSON.delta == 1) {
			delta = "brain-map-node-up";
		} else if (nodeJSON.delta == -1) {
			delta = "brain-map-node-down";
		} else {
			delta = "brain-map-node-keep";
		}

		$dom = $("<li><div class='brain-map-node clearfix'>" + 
				"<div class=brain-map-node-txt><div class=" + c + 
				"></div><div class=" + delta + "></div><div class='brain-map-node-btn " + state + "'>" + 
				nodeJSON.text.substring(0, 5) + "</div></div>" + 
				"<ul class=brain-map-node-children /></div></li>");

		$dom.find(".brain-map-node-btn").bind("click", function(e){
			e.preventDefault();

			var $this = $(this);
			var isSelect = true;

			if ( $this.hasClass("selected") ) {
				isSelect = false;
				$this.removeClass("selected");
			} else {
				$(".brain-map-node-btn.selected").removeClass("selected");
				$this.addClass("selected");
			}
			
			config.onSelect(e, isSelect);
		});

		return $dom;
	};

	//根据JSON数据生成思维导图的DOM结构,使用递归...
	var init = function(arrJSON){

		var arr = [];

		for(var i = 0; i < arrJSON.length; i++) {
			var node = arrJSON[i];
			var arrChildren = 0;
			var $node = null;
			var $node_c = null;

			var nodeOpt = {
				isFirstNode: false,
				isLastNode: false
			};

			if (arrJSON.length == 1) {
				nodeOpt.isFirstNode = nodeOpt.isLastNode = false;
			} else if (i == 0) {
				nodeOpt.isFirstNode = true;
			} else if (i == arrJSON.length - 1) {
				nodeOpt.isLastNode = true;
			}

			if(node.children.length > 0){
				arrChildren = init(node.children);
			}

			$node = createNode(node, nodeOpt);
			$node_c = $node.find("ul.brain-map-node-children");

			if(arrChildren != 0){
				for (var j = 0; j < arrChildren.length ; j++) {
					$node_c.append(arrChildren[j]);	
				}
			}
			$node_c.append($("<li class=brain-map-node-bar-v />"));

			arr[i] = $node;
		}

		return arr;
	};

	return this.each(function(){
		var $this = $(this);

		//初始化DOM结构
		var dom = init(config.json);
		$this.append(dom[0]);

		positionNode( $this.find(".brain-map-node-txt:first") );
		positionBar();
	});

};

$.fn.select.settings = {
	onSelect: function(e){}
};

})( jQuery );