;(function( $ ) {

$.fn.brainMap = function(setting){

	var config = $.extend({}, $.fn.brainMap.settings, setting);

	var positionBar = function(){
		var bar = $("#brainMap li.brain-map-node-bar-v");

		bar.each(function(){
			var parent = $(this.parentNode),
				level = 0,
				$this = $(this),
				$brother = $this.siblings(),
				delta,
				offsetTop,
				offsetLeft,
				width = $this.width(),
				bgOffset;

			if(parent.hasClass("brain-map-node-l1")){
				level = 17;
			} else if (parent.hasClass("brain-map-node-l2")) {
				level = 12;
			} else {
				level = 8;
			}
			
			if ($brother.size() < 1) {
				return
			}

			var	$first = $brother.eq(0).find("div.brain-map-node-txt:first"),
				$firstPosition = $first.position();
				$firstTop = $firstPosition.top 
							+ parseInt( $first.css("marginTop"), 10 ),
				$firstLeft = $firstPosition.left,
				$firstHeight = $first.height();
			
			if($brother.size() == 1) {
				delta = level;
				offsetTop = $firstTop + ($firstHeight - delta) / 2;
				offsetLeft = $firstLeft - width + level;
				bgOffset = "center";
			} else {
				var $last = $brother.eq( $brother.size() - 1 ).find("div.brain-map-node-txt:first"),
					$lastTop = $last.position().top 
								+ parseInt( $last.css("marginTop"), 10 ),


				delta = $lastTop - $firstTop - $firstHeight + 1;
				offsetTop = $firstTop + $firstHeight - 1;
				offsetLeft = $firstLeft - width + level;

				//特殊情况, 重定位枝干的高度和背景位置
				var node = parent.prev(),
					nodeOffset = node.position().top
									+ parseInt( node.css("marginTop"), 10 )
									+ node.height() / 2;

				bgOffset = 501 + nodeOffset
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
				} else if(nodeOffset >= $lastTop){
					delta += level/2;
				}

				if(nodeOffset <= offsetTop+1){
					delta += level/2;
					offsetTop = offsetTop - level/2 + 1;
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
		var parent =  node.next("ul.brain-map-node-children"),
			children = parent.children(),
			num = children.size() - 1,
			nodeOffset,
			parentOffset = [];
		
		if(num < 1) return

		for (var i = 0; i < num; i++) {
			positionNode( $(children[i].firstChild.firstChild) );
		}

		parentOffset = parent.position().top 
						+ parent.height()/2 
						+ parseInt( parent.css("marginTop"), 10 );

		nodeOffset = node.position().top 
						+ node.height()/2;

		node.css("marginTop", Math.floor(parentOffset - nodeOffset));
	};

	//创建思维导图一个节点
	var createNode = function(nodeJSON, opt){
		var delta, trigger, $dom;

		if (nodeJSON.delta == 1) {
			delta = "brain-map-node-up";
		} else if (nodeJSON.delta == -1) {
			delta = "brain-map-node-down";
		} else {
			delta = "brain-map-node-keep";
		}

		trigger = nodeJSON.children.length > 0 ? "<span class=brain-map-node-btn-trigger />" : "";

		$dom = $("<li>"
					+"<div class='brain-map-node clearfix'>"
						+ "<div class=brain-map-node-txt>"
							+"<div class=" + opt.nodeClass + "></div>"
							+"<div class='brain-map-node-btn-wrap " + nodeJSON.state + "'>"
								+"<div class=" + delta + ">"
									+"<span class=brain-map-node-txt-trigger title=" + nodeJSON.text + ">" 
										+  $.fn.brainMap.formatNodeText(nodeJSON.text) + "</span></div>"
							+"<div class=brain-map-node-btn>" + trigger + "</div></div></div>" 
						+ "<ul class='brain-map-node-children brain-map-node-l" + opt.level + "' />"
					+"</div></li>");

		$dom.find("span.brain-map-node-txt-trigger").bind("click", function(e){
			e.preventDefault();

			var $this = $(this.parentNode.parentNode),
				isSelect = true;

			if ( $this.hasClass("selected") ) {
				isSelect = false;
				$this.removeClass("selected");
			} else {
				$("div.brain-map-node-btn-wrap.selected").removeClass("selected");
				$this.addClass("selected");
			}
			
			config.onSelect(e, isSelect);

		}).data("data", nodeJSON.data);

		$dom.find("span.brain-map-node-btn-trigger").click( eventToggleHideChildren );

		return $dom;
	};

	var eventToggleHideChildren = function(e){
		var target = $(e.target),
			$this = target.parents("div.brain-map-node-txt:first"),
			parent = $this.next();

		target.toggleClass("collapse");
		parent.toggle();
		positionBar();
	}

	//根据JSON数据生成思维导图的DOM结构,使用递归...
	var init = function(arrJSON, level){

		var arr = [];

		for (var i = 0, len1 = arrJSON.length; i < len1; i++) {
			var node = arrJSON[i],
				arrChildren = 0,
				$node = $node_c = null,
				opt = {
					nodePositionClass: "",
					level: level
				};

			if (len1 == 1) {
				opt.nodeClass = "brain-map-node-middle";
			} else if (i == 0) {
				opt.nodeClass = "brain-map-node-first";
			} else if (i == len1 - 1) {
				opt.nodeClass = "brain-map-node-last";
			} else {
				opt.nodeClass = "brain-map-node-middle";
			}

			if(node.children.length > 0){
				arrChildren = init(node.children, level+1);
			}

			$node = createNode(node, opt);
			$node_c = $node.find("ul.brain-map-node-children");

			if(arrChildren != 0){
				for (var j = 0, len2 = arrChildren.length; j < len2; j++) {
					$node_c.append(arrChildren[j]);	
				}
			}

			$node_c.append( $("<li class=brain-map-node-bar-v />") );

			arr[i] = $node;
		}

		return arr;
	};

	return this.each(function(){
		var $this = $(this);

		//初始化DOM结构
		var dom = init(config.json, 1);
		$this.append(dom[0]);

		//定位节点和枝干
		$.fn.brainMap.root = $this.find("div.brain-map-node-txt:first");
		positionNode( $.fn.brainMap.root );
		positionBar();

		//收起未标注为当前节点的枝干
		if ( config.collapse ) {
			var current = $this.find("div.brain-map-node-btn-wrap.current");

			//选中了所有的祖先，然后把祖先的兄弟姐妹们全都折叠起来
			current.parents("li").each( function() {
				$(this).siblings().each( function() {
					$(this).find("span.brain-map-node-btn-trigger:first").trigger("click");
				} );
			} );
		}
	});

};

$.fn.brainMap.settings = {
	onSelect: function(e){},
	collapse: true
};

$.fn.brainMap.formatNodeText = function(str){
	return str.length <= 6 ? str : str.substring(0, 5) + "..."
};

})( jQuery );