;(function( $ ) {

brainMapJSON = [{
	text: "G3客户净增",
		delta: 0,
		data: {id:1, value:9, type:"kpi"},
		state: "root",
		children: [{
			text: "净增客户数",
			delta: 0,
			data: {id:2, value:9, type:"kpi"},
			state: "",
			children: [{
				text: "客户发展增幅2",
				delta: -1,
				data: {id:3, value:9, type:"kpi"},
				state: "",
				children: [{
					text: "客户发展增幅2",
					delta: 0,
					data: {id:4, value:9, type:"kpi"},
					state: "",
					children: []
				}, {
					text: "测试一下3",
					delta: 0,
					data: {id:5, value:9, type:"kpi"},
					state: "",
					children: []
				}]
			},{
				text: "客户发展增幅current",
				delta: 0,
				data: {id:6, value:9, type:"kpi"},
				state: "",
				children: [{
					text: "客户发展增幅2",
					delta: -1,
					data: {id:7, value:9, type:"kpi"},
					state: "",
					children: []
				}, {
					text: "测试一下3",
					delta: 0,
					data: {id:8, value:9, type:"kpi"},
					state: "",
					children: []
				}]
			}]
		}, {
			text: "客户发展增幅1",
			delta: 0,
			data: {id:9, value:9, type:"kpi"},
			state: "",
			children: [{
				text: "客户发展增幅2",
				delta: 0,
				data: {id:10, value:9, type:"kpi"},
				state: "",
				children: []
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:11, value:9, type:"kpi"},
				state: "",
				children: []
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:12, value:9, type:"kpi"},
				state: "",
				children: [{
					text: "测试一下5",
					delta: 0,
					data: {id:13, value:9, type:"kpi"},
					state: "",
					children: []
				}, {
					text: "测试一下5",
					delta: 0,
					data: {id:14, value:9, type:"kpi"},
					state: "",
					children: [{
						text: "测试一下5",
						delta: 0,
						data: {id:15, value:9, type:"kpi"},
						state: "",
						children: [{
							text: "测试一下5",
							delta: 0,
							data: {id:16, value:9, type:"kpi"},
							state: "",
							children: []
						}, {
							text: "测试一下5",
							delta: 0,
							data: {id:17, value:9, type:"kpi"},
							state: "",
							children: []
						}]
					}, {
						text: "测试一下5",
						delta: 0,
						data: {id:18, value:9, type:"kpi"},
						state: "",
						children: []
					}]
				}, {
					text: "测试一下5",
					delta: 0,
					data: {id:19, value:9, type:"kpi"},
					state: "",
					children: []
				}]
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:20, value:9, type:"kpi"},
				state: "",
				children: []
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:21, value:9, type:"kpi"},
				state: "",
				children: []
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:22, value:9, type:"kpi"},
				state: "",
				children: []
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:23, value:9, type:"kpi"},
				state: "",
				children: []
			}]
		}, {
			text: "测试一下2",
			delta: 1,
			data: {id:24, value:9, type:"kpi"},
			state: "",
			children: [{
				text: "测试一下5",
				delta: 0,
				data: {id:25, value:9, type:"kpi"},
				state: "",
				children: []
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:26, value:9, type:"kpi"},
				state: "current",
				children: [{
					text: "测试一下5",
					delta: 0,
					data: {id:27, value:9, type:"kpi"},
					state: "",
					children: []
				}, {
					text: "测试一下5",
					delta: 0,
					data: {id:28, value:9, type:"kpi"},
					state: "",
					children: []
				}]
			}]
		}]
}];

brainMap = [{
		text: "G3客户净增",
		delta: 0,
		data: {id:1, value:0, type:"kpi"},
		state: "root",
		children: [{
			text: "净增客户数",
			delta: 0,
			data: {id:2, value:0, type:"kpi"},
			state: "",
			children: [{
				text: "客户发展增幅2",
				delta: 1,
				data: {id:3, value:0, type:"kpi"},
				state: "",
				children: [{
					text: "客户发展增幅2",
					delta: 1,
					data: {id:4, value:0, type:"kpi"},
					state: "",
					children: []
				}, {
					text: "测试一下3333333333333",
					delta: 0,
					data: {id:5, value:0, type:"kpi"},
					state: "",
					children: [{
						text: "测试一下3333333333333333",
						delta: 0,
						data: {id:5, value:9, type:"kpi"},
						state: "",
						children: []
					}]
				}]
			},{
				text: "客户发展增幅current",
				delta: 0,
				data: {id:6, value:0, type:"kpi"},
				state: "",
				children: [{
					text: "客户发展增幅2",
					delta: 1,
					data: {id:7, value:0, type:"kpi"},
					state: "",
					children: []
				}, {
					text: "测试一下3",
					delta: 0,
					data: {id:8, value:0, type:"kpi"},
					state: "",
					children: []
				}]
			}]
		}, {
			text: "客户发展增幅1",
			delta: -1,
			data: {id:9, value:0, type:"kpi"},
			state: "",
			children: [{
				text: "客户发展增幅2",
				delta: 0,
				data: {id:10, value:0, type:"kpi"},
				state: "",
				children: []
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:11, value:0, type:"kpi"},
				state: "",
				children: []
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:12, value:0, type:"kpi"},
				state: "",
				children: [{
					text: "测试一下5",
					delta: 0,
					data: {id:13, value:0, type:"kpi"},
					state: "",
					children: []
				}, {
					text: "测试一下5",
					delta: 0,
					data: {id:14, value:0, type:"kpi"},
					state: "",
					children: [{
						text: "测试一下5",
						delta: 0,
						data: {id:15, value:0, type:"kpi"},
						state: "",
						children: [{
							text: "测试一下5",
							delta: 0,
							data: {id:16, value:0, type:"kpi"},
							state: "",
							children: []
						}, {
							text: "测试一下5",
							delta: 0,
							data: {id:17, value:0, type:"kpi"},
							state: "",
							children: []
						}]
					}, {
						text: "测试一下5",
						delta: 0,
						data: {id:18, value:0, type:"kpi"},
						state: "",
						children: []
					}]
				}, {
					text: "测试一下5",
					delta: 0,
					data: {id:19, value:0, type:"kpi"},
					state: "",
					children: []
				}]
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:20, value:0, type:"kpi"},
				state: "",
				children: []
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:21, value:0, type:"kpi"},
				state: "",
				children: []
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:22, value:0, type:"kpi"},
				state: "",
				children: []
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:23, value:0, type:"kpi"},
				state: "",
				children: []
			}]
		}, {
			text: "测试一下2",
			delta: 0,
			data: {id:24, value:0, type:"kpi"},
			state: "",
			children: [{
				text: "测试一下5",
				delta: 0,
				data: {id:25, value:0, type:"kpi"},
				state: "",
				children: []
			}, {
				text: "测试一下5",
				delta: 0,
				data: {id:26, value:0, type:"kpi"},
				state: "current",
				children: [{
					text: "测试一下5",
					delta: 0,
					data: {id:27, value:0, type:"kpi"},
					state: "",
					children: []
				}, {
					text: "测试一下5",
					delta: 0,
					data: {id:28, value:0, type:"kpi"},
					state: "",
					children: []
				}]
			}]
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
			
			//for binbin
			var swfOBJ = $("#brainMapCanvas")[0];
			swfOBJ.updateBrainMapNode(brainMapJSON);
		}
	});

	$("#dateSelector").dateSelect({
		onSelect:function(date){
			loadingIndicator("open");
			//for binbin

			setTimeout(function(){
			loadingIndicator("close");
			var swfOBJ = $("#brainMapCanvas")[0];
			swfOBJ.updateBrainMapNode(brainMapJSON);
			}, 3000)
		}
	});
	$("#back-btn").click(function(){
		alert("要返回，请到assets/script/indicator_brainMap.js中实现我");
	});

	initBrainMap();

});

})( jQuery );

function eventBrainMapNodeSelect(text, data, isSelected){
	alert(data.value);

	if(isSelected){
		//更新面板数据
			$("#indicator-selected h5").text( text );
		$("#indicator-selected").show();
	} else {
		$("#indicator-selected").hide();
	}
}

function initBrainMap(){
    var swfOBJ = $("#brainMapCanvas")[0];
    try {
        swfOBJ.updateBrainMapNode(brainMap);
    } catch(e) { };
}

function getInfo(data){
    alert(data.id + '-' + data.type);
}


function loadingIndicator(flag){
	if (flag == "open") {
		var $stage = $("#brainMap");
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
				position: "absolute",
				top:0,
				left:0,
				background: "#bbb",
				opacity: "0.8",
				height: $stage.height(),
				width : $stage.width(),
				"textAlign": "center",
				"zIndex": 100001
			}
		});
			
		loading.appendTo($stage);
	} else {
		$("div.update-loading").remove();
	}
}
