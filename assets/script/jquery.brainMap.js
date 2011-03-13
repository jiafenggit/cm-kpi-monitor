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
			
			var $this = $(dom),
				$brother = $this.siblings(),
				delta,
				offsetTop,
				offsetLeft,
				width = $this.width(),
				bgOffset;
			
			if ($brother.size() < 1) {
				return
			}

			var	$first = $brother.eq(0).find(".brain-map-node-txt:first"),
				$firstTop = $first.position().top + parseInt( $first.css("marginTop"), 10 ),
				$firstLeft = $first.position().left,
				$firstHeight = $first.height();
			
			if($brother.size() == 1) {
				delta = level;
				offsetTop = $firstTop + $firstHeight / 2 - delta / 2;
				offsetLeft = $firstLeft - width + level;

				bgOffset = "center";
			} else {
				var $last = $brother.eq( $brother.size() - 1 ).find(".brain-map-node-txt:first"),
					$lastTop = $last.position().top + parseInt( $last.css("marginTop"), 10 ),

				width = width;
				delta = $lastTop - $firstTop - $firstHeight + 1;
				offsetTop = $firstTop + $firstHeight - 1;
				offsetLeft = $firstLeft - width + level;

				
				bgOffset = 501
							+ parent.prev().position().top
							+ parseInt( parent.prev().css("marginTop"), 10 )
							+ parent.prev().height()/2
							- $firstTop
							- $firstHeight;

				if (bgOffset < 502) {
					bgOffset = 500 + level/2;
				}

				bgOffset += "px"

				//处理当只有两个子节点且此两节点均无子节点的情况
				if(delta == 1){
					delta = level;
					offsetTop = $firstTop + $firstHeight - delta/2;
					bgOffset = "center";
				}
			}

			$this.css({
				height: delta,
				top: offsetTop,
				left: offsetLeft,
				width: width,
				backgroundPosition:"right " + bgOffset
			});
		});
	};

	var positionNode = function(node){
		var parent =  node.next(".brain-map-node-children"),
			children = parent.children(),
			num = children.size() - 1,
			nodeOffset,
			parentOffset = [];
		
		if(num < 1) return

		for (var i = 0; i < num; i++) {
			positionNode( children.eq(i).find(".brain-map-node-txt:first") );
			//offset.push(node.position().top + node.height()/2 + parseInt( node.css("marginTop"), 10 ));
		}

		parentOffset = parent.position().top 
						+ parent.height()/2 
						+ parseInt( parent.css("marginTop"), 10 );

		nodeOffset = node.position().top 
						+ node.height()/2;

		var nodeMargin = Math.floor(parentOffset - nodeOffset)
		node.css("marginTop", nodeMargin);
/*
		if(num > 1){
			nodeOffset = nodeOffset + nodeMargin;
			var child = children.eq(0).find(".brain-map-node-txt:first");
			var childOffset = child.position().top 
								+ child.height()
								+ parseInt( child.css("marginTop"), 10 );
			if(nodeOffset <= childOffset) node.css("marginTop", nodeMargin + childOffset - nodeOffset + 9)
		}
*/
	};

	//创建思维导图一个节点
	var createNode = function(nodeJSON, opt){
		var c, state, delta, trigger, $dom;

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

		trigger = nodeJSON.children.length > 0 ? "<span class=brain-map-node-btn-trigger />" : "";

		$dom = $("<li><div class='brain-map-node clearfix'>" + 
				"<div class=brain-map-node-txt><div class=" + c + 
				"></div><div class='brain-map-node-btn-wrap " + state + "'><div class=" + 
				delta + "><span class=brain-map-node-txt-trigger title=" + nodeJSON.text + ">" + 
				nodeJSON.text.substring(0, 6) + "</span></div><div class=brain-map-node-btn>" + trigger + "</div></div></div>" + 
				"<ul class='brain-map-node-children brain-map-node-l" + opt.level + "' /></div></li>");

		$dom.find("span.brain-map-node-txt-trigger").bind("click", function(e){
			e.preventDefault();

			var $this = $(this.parentNode.parentNode);
			var isSelect = true;

			if ( $this.hasClass("selected") ) {
				isSelect = false;
				$this.removeClass("selected");
			} else {
				$(".brain-map-node-btn-wrap.selected").removeClass("selected");
				$this.addClass("selected");
			}
			
			config.onSelect(e, isSelect);
		}).data("data", nodeJSON.data);

		$dom.find("span.brain-map-node-btn-trigger").toggle( eventHideChildren, eventShowChildren );

		return $dom;
	};


	var eventHideChildren = function(e){
		var target = $(e.target);
		var $this = target.parents(".brain-map-node-txt");
		var parent = $this.next();

		target.addClass("collapse");
		parent.hide();
		positionBar();
	}

	var eventShowChildren = function(e){
		var target = $(e.target);
		var $this = target.parents(".brain-map-node-txt");
		var parent = $this.next();

		target.removeClass("collapse");
		parent.show();
		positionBar();
	}

	//根据JSON数据生成思维导图的DOM结构,使用递归...
	var init = function(arrJSON, level){

		var arr = [];

		for(var i = 0; i < arrJSON.length; i++) {
			var node = arrJSON[i],
				arrChildren = 0,
				$node = $node_c = null;

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

		$.fn.select.root = $this.find(".brain-map-node-txt:first")

		positionNode( $.fn.select.root );
		positionBar();
	});

};

$.fn.select.settings = {
	onSelect: function(e){}
};

})( jQuery );