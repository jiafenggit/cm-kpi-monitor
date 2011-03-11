;(function( $ ) {

$.fn.brainMap = function(setting){

	var config = $.extend({}, $.fn.select.settings, setting);

	var positionBar = function(){
		var bar = $("#brainMap li.brain-map-node-bar-v");

		bar.each(function(index, dom){
			var parent = $(dom.parentNode);
			var level = 0;

			if(parent.hasClass("brain-map-node-l1")){
				level = 17;
			} else if (parent.hasClass("brain-map-node-l2")) {
				level = 12;
			} else {
				level = 8;
			}
			
			var $this = $(dom);
			var $brother = $this.siblings();
			var delta,
				offsetTop,
				offsetLeft,
				width = $this.width();
		
			var	$first = $brother.eq(0).find(".brain-map-node-txt:first");
			
			if ($brother.size() < 1) {
				return
			} else if($brother.size() == 1) {
				delta = level;
				
				offsetTop = $first.position().top 
								+ $first.height() / 2
								+ parseInt( $first.css("marginTop"), 10 ) 
								- delta/2;
			
				offsetLeft = $first.position().left 
								- $this.width() 
								+ level + 10;

			} else {

				width = width - level;

				var $last = $brother.eq($brother.size()-1).find(".brain-map-node-txt:first");

				delta = $last.position().top 
							+ parseInt( $last.css("marginTop"), 10 ) 
							- $first.position().top 
							- $first.height() 
							- parseInt( $first.css("marginTop"), 10 ) 
							+ 1;

				offsetTop = $first.position().top 
								+ $first.height() 
								+ parseInt( $first.css("marginTop"), 10 ) 
								- 1;
				

				offsetLeft = $first.position().left 
								- width
								+ level;

				if(delta == 1){
					delta = level;

					offsetTop = $first.position().top 
									+ $first.height() 
									+ parseInt( $first.css("marginTop"), 10 ) 
									- delta/2;
					

					offsetLeft = $first.position().left 
									- width
									+ level;
					
				}
			}

			$this.css({
				height: delta,
				top: offsetTop,
				left: offsetLeft,
				width: width
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
				"></div><div class='brain-map-node-btn-wrap " + state + "'><div class=" + delta + ">" + 
				nodeJSON.text.substring(0, 5) + "</div><div class=brain-map-node-btn></div></div></div>" + 
				"<ul class='brain-map-node-children brain-map-node-l" + opt.level + "' /></div></li>");

		$dom.find(".brain-map-node-btn").bind("click", function(e){
			e.preventDefault();

			var $this = $(this.parentNode);
			var isSelect = true;

			if ( $this.hasClass("selected") ) {
				isSelect = false;
				$this.removeClass("selected");
			} else {
				$(".brain-map-node-btn-wrap.selected").removeClass("selected");
				$this.addClass("selected");
			}
			
			config.onSelect(e, isSelect);
		});

		return $dom;
	};

	//根据JSON数据生成思维导图的DOM结构,使用递归...
	var init = function(arrJSON, level){

		var arr = [];

		for(var i = 0; i < arrJSON.length; i++) {
			var node = arrJSON[i];
			var arrChildren = 0;
			var $node = null;
			var $node_c = null;

			var nodeOpt = {
				isFirstNode: false,
				isLastNode: false,
				level: level
			};

			if (arrJSON.length == 1) {
				nodeOpt.isFirstNode = nodeOpt.isLastNode = false;
			} else if (i == 0) {
				nodeOpt.isFirstNode = true;
			} else if (i == arrJSON.length - 1) {
				nodeOpt.isLastNode = true;
			}

			if(node.children.length > 0){
				arrChildren = init(node.children, level+1);
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
		var dom = init(config.json, 1);
		$this.append(dom[0]);

		positionNode( $this.find(".brain-map-node-txt:first") );
		positionBar();
	});

};

$.fn.select.settings = {
	onSelect: function(e){}
};

})( jQuery );