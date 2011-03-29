;(function( $ ) {

arrMapDict = [{
		"value": "1",
		"text": "大兴区",
		"rank": "1"
	}, {
		"value": "2",
		"text": "西区分公司",
		"rank": "3"
	}, {
		"value": "3",
		"text": "城中区",
		"rank": "2"
	}, {
		"value": "4",
		"text": "怀柔区",
		"rank": "1"
	}, {
		"value": "5",
		"text": "延庆县",
		"rank": "2"
	}, {
		"value": "6",
		"text": "密云县",
		"rank": "2"
	}, {
		"value": "7",
		"text": "通州区",
		"rank": "3"
	}, {
		"value": "8",
		"text": "房山区",
		"rank": "3"
	}, {
		"value": "9",
		"text": "海淀区",
		"rank": "1"
	}, {
		"value": "10",
		"text": "顺义区",
		"rank": "2"
	}, {
		"value": "11",
		"text": "昌平区",
		"rank": "2"
	}, {
		"value": "12",
		"text": "平谷区",
		"rank": "3"
	}, {
		"value": "13",
		"text": "南区分公司",
		"rank": "2"
	}, {
		"value": "14",
		"text": "朝阳区",
		"rank": "2"
	}
];

objMapDict = (function(){
	var obj = {};

	$.each(arrMapDict, function(index, item){
		obj[item.value] = item.text;
	});

	return obj;
})();

//系统导航
$(function(){
	$("#nav-map, #nav-indicator").bind("click", function(e){
		e.preventDefault();

		var target = $(e.target);

		if( target.hasClass("selected") ||
			target.hasClass("nav-l-selected") ||
			target.hasClass("nav-r-selected") ){
			return
		} else {
			//切换选中的样式
			$("#header div.nav a.selected").removeClass("selected");
			$("#header div.nav a.nav-l-selected").removeClass("nav-l-selected");
			$("#header div.nav a.nav-r-selected").removeClass("nav-r-selected");

			if ( target.hasClass("nav-l") ) {
				target.addClass("nav-l-selected");
			} else if ( target.hasClass("nav-r") ) {
				target.addClass("nav-r-selected");
			} else {
				target.addClass("selected");
			}
			
			
			var href = target.attr("href");
			alert("我在assets/script/base.js中，过来找我吧:)");
			//刷新iframe......
		}
	});
});

})( jQuery );

function getArea(){
	var arr = [];

	for (area in objMapDict) {
		arr.push(objMapDict[area]);
	}

	return arr
}