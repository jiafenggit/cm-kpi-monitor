

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

$(function(){
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