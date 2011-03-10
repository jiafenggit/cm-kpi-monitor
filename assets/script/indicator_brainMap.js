

;(function( $ ) {

brainMapJSON = [{
	text: "销售分类",
	delta: 0,
	rel: 0,
	state: null,
	children: [{
		text: "客户发展",
		delta: 1,
		rel: 1,
		state: null,
		children: [{
			text: "净增客户数",
			delta: 0,
			rel: 3,
			state: "current",
			children: [{
				text: "新增客户数",
				delta: 0,
				rel: 6,
				state: null,
				children: [{
					text: "测试1",
					delta: 0,
					rel: 6,
					state: null,
					children: []
				}, {
					text: "测试2",
					delta: 0,
					rel: 6,
					state: null,
					children: []
				}, {
					text: "测试2",
					delta: 0,
					rel: 6,
					state: null,
					children: []
				}, {
					text: "测试2",
					delta: 0,
					rel: 6,
					state: null,
					children: []
				}, {
					text: "测试2",
					delta: 0,
					rel: 6,
					state: null,
					children: []
				}, {
					text: "测试2",
					delta: 0,
					rel: 6,
					state: null,
					children: []
				}, {
					text: "测试2",
					delta: 0,
					rel: 6,
					state: null,
					children: []
				}, {
					text: "测试2",
					delta: 0,
					rel: 6,
					state: null,
					children: []
				}]
			}]
		}, {
			text: "新增价值客户存活率贡献度",
			delta: 0,
			rel: 4,
			state: null,
			children: [{
				text: "新增价值客户存活率",
				delta: 0,
				rel: 7,
				state: null,
				children: []
			}]
		}, {
			text: "客户发展贡献度",
			delta: 0,
			rel: 5,
			state: null,
			children: [{
				text: "净增客户数",
				delta: 0,
				rel: 8,
				state: null,
				children: []
			}, {
				text: "客户发展增幅",
				delta: 0,
				rel: 9,
				state: null,
				children: []
			}]
		}]
	}, {
		text: "G3客户净增",
		delta: -1,
		rel: 2,
		state: null,
		children: []
	}]
}];

brainMapJSON_test = [{
	text: "销售分类",
	delta: 0,
	rel: 0,
	state: null,
	children: [{
		text: "客户发展",
		delta: 0,
		rel: 1,
		state: null,
		children: []
	}, {
		text: "G3客户净增",
		delta: -1,
		rel: 2,
		state: null,
		children: []
	}]
}];

function _getPageSize() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		if(document.documentElement.clientWidth){
			windowWidth = document.documentElement.clientWidth; 
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}
	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = xScroll;		
	} else {
		pageWidth = windowWidth;
	}
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	return arrayPageSize;
};

function calcBrainMapSize(){
	
	var viewHeight = _getPageSize()[3],
		offset = $("#brainMap").offset(),
		mapTop = offset.top;

	$("#brainMap").height(viewHeight - mapTop - 40);
}

$(function(){
	calcBrainMapSize();
	window.onresize = calcBrainMapSize;
			

	$("#areaSelector").select({
		option: arrMapDict, 
		width: 300,
		onSelect: function(val, txt){
			alert(val + "-" + txt);
		}
	});

	$("#dateSelector").dateSelect({
		onSelect:function(date){
			alert(date);
		}
	});

	$("#brainMap ul.root").brainMap({
		json:brainMapJSON,
		onSelect: function(e, isSelected){
			if(isSelected){
				//更新面板数据
				$("#indicator-selected h5").text($(e.target).text());
				$("#indicator-selected").show();
			} else {
				$("#indicator-selected").hide();
			}
		}
	});

	/*
	$( ".stage-inner" ).mouscroll({
		handle: ".stage-inner",
		cancel: ""
	}); */

});

})( jQuery );