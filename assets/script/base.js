;(function( $ ) {

objMapDict = {
	"1": "大兴区",
	"2": "门头沟区",
	"3": "城中区",
	"4": "怀柔区",
	"5": "延庆县",
	"6": "密云县",
	"7": "通州区",
	"8": "房山区",
	"9": "海淀区",
	"10": "顺义区",
	"11": "昌平区",
	"12": "平谷区",
	"13": "丰台区",
	"14": "朝阳区"
}

arrMapDict = [{
		"value": "1",
		"text": "大兴区",
		"rank": "db"
	}, {
		"value": "2",
		"text": "门头沟区",
		"rank": "og"
	}, {
		"value": "3",
		"text": "城中区",
		"rank": "lb"
	}, {
		"value": "4",
		"text": "怀柔区",
		"rank": "db"
	}, {
		"value": "5",
		"text": "延庆县",
		"rank": "lb"
	}, {
		"value": "6",
		"text": "密云县",
		"rank": "lb"
	}, {
		"value": "7",
		"text": "通州区",
		"rank": "og"
	}, {
		"value": "8",
		"text": "房山区",
		"rank": "og"
	}, {
		"value": "9",
		"text": "海淀区",
		"rank": "db"
	}, {
		"value": "10",
		"text": "顺义区",
		"rank": "lb"
	}, {
		"value": "11",
		"text": "昌平区",
		"rank": "lb"
	}, {
		"value": "12",
		"text": "平谷区",
		"rank": "og"
	}, {
		"value": "13",
		"text": "丰台区",
		"rank": "lb"
	}, {
		"value": "14",
		"text": "朝阳区",
		"rank": "lb"
	}
];

})( jQuery );

function getArea(){
	var arr = [];

	for (area in objMapDict) {
		arr.push(objMapDict[area]);
	}

	return arr
}