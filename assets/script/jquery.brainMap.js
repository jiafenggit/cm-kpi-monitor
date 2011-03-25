;(function( $ ) {

$.fn.brainMap = function(setting){

	var config = $.extend({}, $.fn.brainMap.settings, setting);
	var colorIndex = 0;

	function getChildren_W_H(children){
		var max = 0,
			height = 0;

		children.each(function(){
			var $this = $(this),
				w = $this.width(),
				h = $this.height();

			if (w > max) max = w;
			height += h;
		});

		return {
			"maxWidth": max,
			"height": height
		}
	}

	function branchPosition(parent){
		var branchHeight = 0,
			branchTop = 0,
			level,
			bgPosition;
		
		var children = parent.children(),
			firstChild = children.eq(0),
			lastChild = children.eq(children.size() - 1),
			firstChildNode = firstChild.children("div.bm-node"),
			lastChildNode = lastChild.children("div.bm-node");

		var firstChildHeight = firstChild.height(),
			lastChildHeight = lastChild.height(),
			firstChildNodeHeight = firstChildNode.height(),
			firstChildNodeTop = firstChildNode.position().top,
			lastChildNodeTop = lastChildNode.position().top,
			parentHeight = parent.height();

		branchHeight = parentHeight 
						- firstChildHeight
						- lastChildHeight 
						+ firstChildNodeTop
						+ lastChildNodeTop;

		if ( firstChild.hasClass("bm-node-level-1") ) {
			level = 16;
		} else if ( firstChild.hasClass("bm-node-level-2") ) {
			level = 12;
		} else {
			level = 8;
		}

		branchTop = firstChildHeight - firstChildNodeTop;
		bgPosition =  -5000 +  parentHeight / 2 
						- firstChildNodeTop 
						- firstChildNodeHeight;

		if (branchHeight <= 0) {
			branchHeight = level;

			if (children.size() == 1) {
				branchTop = ( parentHeight - level ) / 2;
			} else {
				branchTop -= level / 2;
			}

			bgPosition = -4996;
		}

		if ( (firstChildNodeHeight + firstChildNodeTop) == parentHeight / 2 
			&& lastChildHeight < firstChildHeight ) {

			branchTop -= level/2;
			branchHeight += level/2;
			bgPosition += level/2;

		} else if ( (lastChildHeight - lastChildNodeTop) == parentHeight / 2 
			&& lastChildHeight > firstChildHeight ) {

			branchHeight += level/2;
		}

		return {
			height: branchHeight,
			top: branchTop,
			level: level,
			bgPosition: bgPosition + "px"
		}
	}

	function positionNode(node){
		var parent = node.siblings("div.bm-children"),
			children = parent.children(),
			nodeWrap = node.parent("div.bm-node-wrap"),
			nodeWrapPrev = nodeWrap.prev(),
			branch = node.siblings("div.bm-point-branch"),
			point = node.siblings("div.bm-point"),
			num = children.size();

		var	nodeHeight, 
			nodeWidth, 
			parentHeight, 
			parentWidth, 
			nodeWrapOffsetTop, 
			nodeOffsetTop;

		for (var i = 0; i < num; i++) {
			positionNode( children.eq(i).children("div.bm-node") );
		}

		var childrenInfo = getChildren_W_H(children);
		
		parent.css({
			"position": "absolute",
			"top": 0,
			"width": childrenInfo.maxWidth,
			"height": childrenInfo.height
		});

		parentHeight = parent.height();
		parentWidth = parent.width();
		nodeHeight = node.height();
		nodeOffsetTop = parentHeight / 2 - nodeHeight / 2;

		if (nodeOffsetTop < 0) {
			nodeOffsetTop = 0;
		}

		node.css({
			"position": "absolute",
			"left": 0,
			"top": nodeOffsetTop
		});

		nodeWidth = node.width();
		
		point.css({
			"position": "absolute",
			"left": nodeWidth,
			"height": 26,
			"top": childrenInfo.height / 2 - 13,
			"width": 40
		});

		if (parent.size() > 0) {
			var branchPositionInfo = branchPosition(parent);

			branch.css({
				"position": "absolute",
				"left": nodeWidth + 40,
				"top": branchPositionInfo.top,
				"width": 20 + branchPositionInfo.level,
				"height": branchPositionInfo.height,
				"backgroundPosition": "right " + branchPositionInfo.bgPosition
			});

			parent.css({
				"left": nodeWidth + 60
			});
		}

		//for nodeWrap
		if (nodeWrapPrev.size() == 1) {
			nodeWrapOffsetTop = nodeWrapPrev.position().top + nodeWrapPrev.height();
		} else {
			nodeWrapOffsetTop = 0
		}

		nodeWrap.css({
			"position": "absolute",
			"left": 0,
			"top": nodeWrapOffsetTop,
			"height": parentHeight || nodeHeight,
			"width": nodeWidth + parentWidth + 60
		});
	};

	function createNode(nodeJSON, opt){
		var delta, $dom;
		
		if (nodeJSON.delta == 1) {
			delta = "bm-node-up";
		} else if (nodeJSON.delta == -1) {
			delta = "bm-node-down";
		} else {
			delta = "bm-node-keep";
		}

		var branchColor = (opt.level == 2) ? " color"+(colorIndex++) : "";
		
		$dom = $("<div class='bm-node-wrap" + " bm-node-level-" + opt.level + branchColor + 
					"'></div>");

		$("<div id='node-" + nodeJSON.data.id + "-" + nodeJSON.data.type + "' class='bm-node " + opt.branchLocation + " " + nodeJSON.state + "'>" + 
			"<div class=bm-node-btn-wrap>" +
				"<div class=bm-node-btn>" +
					"<div class='bm-node-name " + delta + "'>" + 
						"<span class=bm-node-name-txt>" +
							nodeJSON.text +
						"</span>" + 
					"</div>" +
				"</div>" +
			"</div></div>").data("data", nodeJSON.data).appendTo($dom);

		if (nodeJSON.children.length != 0) {
			$("<div class=bm-point>" +
					"<div class=bm-point-btn></div>" +
				"</div>" +
				"<div class=bm-point-branch></div>" +
				"<div class=bm-children></div>").appendTo($dom);
		}

		if (nodeJSON.state != "root") {
			$dom.find("div.bm-node-btn").bind("click", function(e){
				e.preventDefault();

				var $this = $(this.parentNode.parentNode),
					isSelect = true;

				if ( $this.hasClass("selected") ) {
					isSelect = false;
					$this.removeClass("selected");
				} else {
					$("div.bm-node.selected").removeClass("selected");
					$this.addClass("selected");
				}
				
				config.onSelect(e, $.data(this.parentNode.parentNode, "data"), isSelect);

			});
		}
		
		$dom.find("div.bm-point-btn").click( eventToggleChildren );

		return $dom;
	};

	function eventToggleChildren(e){
		e.preventDefault();

		var pointBtn = $(e.target),
			point = pointBtn.parent(),
			branch = point.next(),
			parent = branch.next(),
			node = point.prev(),
			nodeWrap = node.parent();
			
		pointBtn.toggleClass("collapse");
		branch.toggle();
		parent.toggle();

		if ( pointBtn.hasClass("collapse") ) {
			//calc delta
			var originHeight = nodeWrap.height(),
				newHeight = node.height(),
				deltaHeight = (originHeight - newHeight) / 2;

			hideChildren(node, deltaHeight);
		} else {
			
			var originHeight = nodeWrap.height(),
				newHeight = parent.height(),
				deltaHeight = (originHeight - newHeight) / 2;

			showChildren(node, deltaHeight);
		}
	}

	function showChildren(node, deltaHeight){
		//get dom
		var point = node.next(),
			nodeWrap = node.parent(),
			ancestor = nodeWrap.parent(),
			branch = ancestor.prev(),
			parent = node.siblings("div.bm-children");

		//get offset top
		var nodeOffsetTop = node.position().top - deltaHeight,
			pointOffsetTop = point.position().top - deltaHeight,
			nodeWrapHeight = parent.height(),
			nodeWrapOffsetTop;

		nodeOffsetTop = nodeOffsetTop < 0 ? 0 : nodeOffsetTop;
		pointOffsetTop = pointOffsetTop < 0 ? 0 : pointOffsetTop;

		//update this node position
		node.css("top", nodeOffsetTop);
		point.css("top", pointOffsetTop);
		nodeWrap.height(nodeWrapHeight);

		//update this node's younger brother
		nodeWrap.nextAll().each(function(){
			var $this = $(this),
				originTop = $this.position().top;

			$this.css("top", originTop - deltaHeight * 2);

		});

		//update this node's all brother position
		var childrenInfo = getChildren_W_H( ancestor.children() );
		ancestor.height(childrenInfo.height);
		
		var branchPositionInfo = branchPosition(ancestor);

		branch.css({
			"height": branchPositionInfo.height,
			"top": branchPositionInfo.top,
			"backgroundPosition": "right " + branchPositionInfo.bgPosition
		});

		var ancestorNode = ancestor.siblings("div.bm-node");

		if(ancestorNode.size() == 1) {
			hideChildren(ancestorNode, deltaHeight);
		} else {
			nodeWrapOffsetTop = nodeWrap.position().top + deltaHeight;
			nodeWrap.css("top", nodeWrapOffsetTop);
		}
	}

	function hideChildren(node, deltaHeight){
		//get dom
		var point = node.next(),
			nodeWrap = node.parent(),
			ancestor = nodeWrap.parent(),
			branch = ancestor.prev(),
			parent = node.siblings("div.bm-children");

		//get offset top
		var nodeOffsetTop = node.position().top - deltaHeight,
			pointOffsetTop = point.position().top - deltaHeight,
			nodeWrapHeight,
			nodeWrapOffsetTop;


		nodeOffsetTop = nodeOffsetTop < 0 ? 0 : nodeOffsetTop;
		pointOffsetTop = pointOffsetTop < 0 ? 0 : pointOffsetTop;

		//update this node position
		node.css("top", nodeOffsetTop);
		point.css("top", pointOffsetTop);

		//update this node's younger brother
		nodeWrap.nextAll().each(function(){
			var $this = $(this),
				originTop = $this.position().top;

			$this.css("top", originTop - deltaHeight * 2);

		});
		
		if (parent.css("display") == "none") {
			nodeWrapHeight = node.height();
		} else {
			nodeWrapHeight = parent.height();
		}
		nodeWrap.height(nodeWrapHeight);

		//update this node's all brother position
		var childrenInfo = getChildren_W_H( ancestor.children() );

		ancestor.height(childrenInfo.height);

		var branchPositionInfo = branchPosition(ancestor);

		branch.css({
			"height": branchPositionInfo.height,
			"top": branchPositionInfo.top,
			"backgroundPosition": "right " + branchPositionInfo.bgPosition
		});

		var ancestorNode = ancestor.siblings("div.bm-node");

		if(ancestorNode.size() == 1) {
			hideChildren(ancestorNode, deltaHeight);
		} else {
			nodeWrapOffsetTop = nodeWrap.position().top + deltaHeight;
			nodeWrap.css("top", nodeWrapOffsetTop);
		}
	}

	function recursiveJSON(arrJSON, numLevel){
		var arrNode = [],
			nodeJSON,
			arrChildrenDOM,
			$node,
			$children,
			opt = {};

		for (var i = 0, len1 = arrJSON.length; i < len1; i++) {
			nodeJSON = arrJSON[i];
			arrChildrenDOM = [];
			$node = $children = null;
			
			opt = {
				branchLocation: "bm-node-middle",
				level: numLevel
			};

			if (len1 == 1) {
				opt.branchLocation = "bm-node-middle";
			} else if (i == 0) {
				opt.branchLocation = "bm-node-first";
			} else if (i == len1 - 1) {
				opt.branchLocation = "bm-node-last";
			}

			if (nodeJSON.children.length > 0) {
				arrChildrenDOM = recursiveJSON( nodeJSON.children, numLevel + 1 );
			}

			$node = createNode(nodeJSON, opt);
			$children = $node.find("div.bm-children");

			for (var j = 0, len2 = arrChildrenDOM.length; j < len2; j++) {
				$children.append( arrChildrenDOM[j] );	
			}

			arrNode[i] = $node;
		}

		return arrNode;
	};

	function init($stage, json){
		var stageWrap = $stage[0].parentNode.parentNode,
			$stageWrap = $(stageWrap);

		stageWrap.scrollTop = 10000;
		
		var loading = $("<div></div>", {
				"class": "stage-loading",
				html: $("<div />", {
					css: {
						"height": "100%",
						"width": "100%",
						"background": "url(assets/img/brain_map_loading.png) center 40% no-repeat"
					}
				}),
				css: {
					position: "fixed",
					background: "#bbb",
					opacity: "0.8",
					height: $stageWrap.height(),
					width : $stageWrap.width(),
					"textAlign": "center",
					"zIndex": 100001
				}
			});
			
		loading.appendTo($stageWrap);

		var tree = recursiveJSON(json, 1);
		$stage.append(tree[0]);

		var rootNode = $stage.find("div.bm-node:first"),
			rootWrap = $stage.children("div.bm-node-wrap");

		positionNode(rootNode);

		
		var current = $stage.find("div.bm-node.current");

		if ( config.collapse ) {
			
			current.parents("div.bm-node-wrap").each( function() {
				$(this).siblings().each( function() {
					var btn = $(this).find("div.bm-point-btn");
					var length = btn.size();
					
					for (var i = length - 1; i >= 0; i--) {
						btn.eq(i).trigger("click");
					}
				} );
			} );
			/*
			current.parents("div.bm-node-wrap").each( function() {
				$(this).siblings().each( function() {
					$(this).find("div.bm-point-btn:first").trigger("click");
				} );
			} );*/
		}

		var rootOffsetTop = $stage.parent().height() / 2 - rootWrap.height() / 2;
		rootWrap.css("top", rootOffsetTop);
		rootWrap.css("left", 300);

		loading.hide().remove();

		stageWrap.scrollTop = 4700;
		stageWrap.scrollLeft = 300;
	};

	$.fn.brainMap.updateIndicate = function(type){
		var $stage = config.stage,
			$stageWrap = $stage.parent().parent();

		if (type == "open") {
			var loading = $("<div></div>", {
				"class": "update-loading",
				html: $("<div />", {
					css: {
						"height": "100%",
						"width": "100%",
						"background": "url(assets/img/brain_map_loading.png) center 40% no-repeat"
					}
				}),
				css: {
					position: "fixed",
					background: "#bbb",
					opacity: "0.8",
					height: $stageWrap.height(),
					width : $stageWrap.width(),
					"textAlign": "center",
					"zIndex": 100001
				}
			});
				
			loading.appendTo($stageWrap);
		} else if (type == "close") {
			$stageWrap.find("div.update-loading").hide().remove();
		}
	};

	$.fn.brainMap.update = function(json){
		var recursiveNewJSON = function(arrJSON){
			var nodeJSON, data, nodeDOM, nodeName;

			for (var i = 0, len1 = arrJSON.length; i < len1; i++) {
				nodeJSON = arrJSON[i];
				data = nodeJSON.data;
				nodeDOM = $("#node-" + nodeJSON.data.id + "-" + nodeJSON.data.type);
				
				if (nodeJSON.children.length > 0) {
					recursiveNewJSON( nodeJSON.children );
				}

				nodeDOM.data("data", data);
				nodeName = nodeDOM.find("div.bm-node-name");

				nodeName.attr("class", "bm-node-name");

				if (nodeJSON.delta == 1) {
					nodeName.addClass("bm-node-up");
				} else if (nodeJSON.delta == -1) {
					nodeName.addClass("bm-node-down");
				} else if (nodeJSON.delta == 0) {
					nodeName.addClass("bm-node-keep");
				}
			}
		};

		recursiveNewJSON(json);

		config.onUpdate();

		//隐藏"正在加载提示"
		$.fn.brainMap.updateIndicate("close");
	};

	return this.each(function(){
		var $this = $(this);

		config.stage = $this;

		init($this, config.json);
	});


};

$.fn.brainMap.settings = {
	onSelect: function(){},
	collapse: true,
	loadingText: "正在加载...",
	onUpdate: function(){}
};

})( jQuery );
