;(function( $ ) {

$(function(){

	function eventCategoryClick(e){
		e.preventDefault();

		var li = $(e.target).parent( "li" ); //modified by farthinker

		if( li.hasClass("selected") ){
			return
		} else {
			//切换选中的样式
			li.addClass("selected") //modified by farthinker
			    .siblings( "li" )
			    .removeClass("selected");
			
			//刷新数据
			////
		}
	}

	$("#category a").bind("click", eventCategoryClick);
	
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


});

})( jQuery );