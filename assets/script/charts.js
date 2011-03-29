var chart;

;(function( $ ) {

$(function(){

	function initChart(type){
		type = parseInt(type, 10);

		switch(type){

			case 0: {
				chart = new Highcharts.Chart({
					chart: {
						renderTo: 'chart', 
						defaultSeriesType: 'area'
					},
					title: {
						text: ' '
					},
					subtitle: {
						text: ' '
					},
					xAxis: {
						title:{
							align: "high",
							text: "2011年3月"
						},
						labels: {
							formatter: function() {
								return Highcharts.dateFormat('%e', this.value); // clean, unformatted number for year
							}
						}							
					},
					yAxis: {
						title: {
							text: '净增客户数（单位：千）'
						},
						labels: {
							formatter: function() {
								return this.value / 1000 +'k';
							}
						}
					},
					legend: {
						layout: 'vertical',
						backgroundColor: '#FFFFFF',
						align: 'left',
						verticalAlign: 'top',
						x: 100,
						y: 70,
						floating: true,
						shadow: true
					},
					tooltip: {
						formatter: function() {
							var d = new Date();

							d.setTime(this.x);
							d = d.getFullYear() + '年' + ( d.getMonth() + 1 ) + "月" + d.getDate() + "日   ";

							return d + this.series.name +' : '+
								Highcharts.numberFormat(this.y, 0);
						}
					},
					plotOptions: {
						area: {
							marker: {
								enabled: true,
								symbol: 'circle',
								radius: 3,
								states: {
									hover: {
										enabled: true
									}
								}
							}
						}
					},
					series: [{
						name: '净增用户数',
						data: [1000, 1200, 800, 1200, 1000, 
							1500, 2400, 2000, 3000, 2800,
							2800, 2800, 2800, 2800, 2800, 
							3200, 3600, 3800, 4000, 4200,
							3800, 4200, 4200, 4200, 2800,
							3800, 4200, 4200, 4200, 2800,
							3000
						],
						pointStart: Date.UTC(2010, 0, 1),
						pointInterval: 24 * 3600 * 1000 // one day
					}]
				});

				break;
			}

			case 1: {
				chart = new Highcharts.Chart({
					chart: {
						renderTo: 'chart', 
						defaultSeriesType: 'column'
					},
					title: {
						text: ' '
					},
					subtitle: {
						text: ' '
					},
					xAxis: {
						title: {
							align: "high",
							text: '月份'
						},
						categories: [
							'1月', 
							'2月', 
							'3月', 
							'4月', 
							'5月', 
							'6月', 
							'7月', 
							'8月', 
							'9月', 
							'10月', 
							'11月', 
							'12月'
						]					
					},
					yAxis: {
						title: {
							text: '净增客户数（单位：千）'
						},
						labels: {
							formatter: function() {
								return this.value / 1000 +'k';
							}
						}
					},
					legend: {
						layout: 'vertical',
						backgroundColor: '#FFFFFF',
						align: 'left',
						verticalAlign: 'top',
						x: 100,
						y: 70,
						floating: true,
						shadow: true
					},
					tooltip: {
						formatter: function() {
							return this.series.name + this.x + ' : ' + Highcharts.numberFormat(this.y, 0);
						}
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{
						name: '2010年',
						data: [1000, 1200, 800, 1200, 1000, 
							1500, 2400, 2000, 3000, 2800,
							2800, 2800
						]
					}, {
						name: '2009年',
						data: [800, 1100, 300, 300, 600, 
							600, 1200, 1800, 2600, 2100,
							2500, 2200
						]
					}]
				});

				break;
			}

			case 2: {
				chart = new Highcharts.Chart({
					chart: {
						renderTo: 'chart'
					},
					title: {
						text: ' '
					},
					subtitle: {
						text: ' '
					},
					xAxis: {
						title: {
							align: "high",
							text: '时间'
						},
						categories: [
							'1月', 
							'2月', 
							'3月', 
							'4月', 
							'5月', 
							'6月', 
							'7月', 
							'8月', 
							'9月', 
							'10月', 
							'11月', 
							'12月'
						]					
					},
					yAxis: {
						title: {
							text: '净增客户数（单位：千）'
						},
						labels: {
							formatter: function() {
								return this.value / 1000 +'k';
							}
						}
					},
					legend: {
						layout: 'vertical',
						backgroundColor: '#FFFFFF',
						align: 'left',
						verticalAlign: 'top',
						x: 100,
						y: 70,
						floating: true,
						shadow: true
					},
					tooltip: {
						formatter: function() {
							return this.series.name + this.x + ' : ' + Highcharts.numberFormat(this.y, 0);
						}
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{
						type: 'column',
						name: '2010年',
						data: [1000, 1200, 800, 1200, 1000, 
							1500, 2400, 2000, 3000, 2800,
							2800, 2800
						]
					}, {
						type: 'column',
						name: '2009年',
						data: [800, 1100, 300, 300, 600, 
							600, 1200, 1800, 2600, 2100,
							2500, 2200
						]
					}, {
						type: 'line',
						name: '率',
						data: [800, 1100, 300, 300, 600, 
							600, 1200, 1800, 2600, 2100,
							2500, 2200
						]
					}]
				});

				break;
			}

			case 3: {
				chart = new Highcharts.Chart({
					chart: {
						renderTo: 'chart', 
						defaultSeriesType: 'column'
					},
					title: {
						text: ' '
					},
					subtitle: {
						text: ' '
					},
					xAxis: {
						title: {
							align: "high",
							text: '地区'
						},
						categories: getArea()
					},
					yAxis: {
						title: {
							text: '净增客户数（单位：千）'
						},
						labels: {
							formatter: function() {
								return this.value / 1000 +'k';
							}
						}
					},
					legend: {
						layout: 'vertical',
						backgroundColor: '#FFFFFF',
						align: 'left',
						verticalAlign: 'top',
						x: 100,
						y: 70,
						floating: true,
						shadow: true
					},
					tooltip: {
						formatter: function() {
							return this.series.name + this.x + ' : ' + Highcharts.numberFormat(this.y, 0);
						}
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{
						name: '本月',
						data: [1000, 1200, 800, 1200, 1000, 
							1500, 2400, 2000, 3000, 2800,
							2800, 2800, 2000,2000
						]
					}, {
						name: '上月',
						data: [800, 1100, 300, 300, 600, 
							600, 1200, 1800, 2600, 2100,
							2500, 2200, 1400, 1800
						]
					}]
				});

				break;
			}

			case 4: {
				chart = new Highcharts.Chart({
					chart: {
						renderTo: 'chart'
					},
					title: {
						text: ' '
					},
					subtitle: {
						text: ' '
					},
					xAxis: {
						title: {
							align: "high",
							text: '地区'
						},
						categories: getArea()
					},
					yAxis: {
						title: {
							text: '净增客户数（单位：千）'
						},
						labels: {
							formatter: function() {
								return this.value / 1000 +'k';
							}
						}
					},
					legend: {
						layout: 'vertical',
						backgroundColor: '#FFFFFF',
						align: 'left',
						verticalAlign: 'top',
						x: 100,
						y: 70,
						floating: true,
						shadow: true
					},
					tooltip: {
						formatter: function() {
							return this.series.name + this.x + ' : ' + Highcharts.numberFormat(this.y, 0);
						}
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{
						type: 'column',
						name: '本月',
						data: [1000, 1200, 800, 1200, 1000, 
							1500, 2400, 2000, 3000, 2800,
							2800, 2800, 2000, 2000
						]
					}, {
						type: 'line',
						name: '平均值',
						data: [1200, 1200, 1200, 1200, 1200, 
							1200, 1200, 1200, 1200, 1200,
							1200, 1200, 1200, 1200
						]
					}]
				});

				break;
			}

			case 5: {
				chart = new Highcharts.Chart({
					chart: {
						renderTo: 'chart'
					},
					title: {
						text: ' '
					},
					subtitle: {
						text: ' '
					},
					xAxis: {
						title:{
							align: "high",
							text: "2011年3月"
						},
						labels: {
							formatter: function() {
								return Highcharts.dateFormat('%e', this.value); // clean, unformatted number for year
							}
						}							
					},
					yAxis: {
						title: {
							text: '净增客户数（单位：千）'
						},
						labels: {
							formatter: function() {
								return this.value / 1000 +'k';
							}
						}
					},
					legend: {
						layout: 'vertical',
						backgroundColor: '#FFFFFF',
						align: 'left',
						verticalAlign: 'top',
						x: 100,
						y: 70,
						floating: true,
						shadow: true
					},
					tooltip: {
						formatter: function() {
							var d = new Date();

							d.setTime(this.x);
							d = d.getFullYear() + '年' + ( d.getMonth() + 1 ) + "月" + d.getDate() + "日   ";

							return d + this.series.name +' : '+
								Highcharts.numberFormat(this.y, 0);
						}
					},
					plotOptions: {
						area: {
							marker: {
								enabled: true,
								symbol: 'circle',
								radius: 3,
								states: {
									hover: {
										enabled: true
									}
								}
							}
						}
					},
					series: [{
						type: 'area',
						name: '本月',
						data: [1100, 1200, 1200, 1300, 1300, 
							1350, 1400, 1400, 1500, 1700,
							2000
						],
						pointStart: Date.UTC(2010, 0, 1),
						pointInterval: 24 * 3600 * 1000 // one day
					}, {
						type: 'spline',
						name: '上月',
						data: [1000, 1200, 800, 1200, 1000, 
							1500, 2400, 2000, 3000, 2800,
							2800, 2800, 2800, 2800, 2800, 
							3200, 3600, 3800, 4000, 4200,
							3800, 4200, 4200, 4200, 2800,
							3800, 4200, 4200, 4200, 2800,
							3000
						],
						pointStart: Date.UTC(2010, 0, 1),
						pointInterval: 24 * 3600 * 1000 // one day
					}]
				});

				break;
			}

			case 6: {
				chart = new Highcharts.Chart({
					chart: {
						renderTo: 'chart',
						defaultSeriesType: 'column'
						
					},
					title: {
						text: ' '
					},
					subtitle: {
						text: ' '
					},
					xAxis: {
						title: {
							align: "high",
							text: '分类'
						},
						categories: [
							"销售类",
							"服务类",
							"渠道类",
							"集团客户类"
						]
					},
					yAxis: {
						title: {
							text: '数量（单位：千）'
						},
						labels: {
							formatter: function() {
								return this.value / 1000 +'k';
							}
						}
					},
					tooltip: {
						formatter: function() {
							return this.series.name + this.x + ' : ' + Highcharts.numberFormat(this.y, 0) + '<br/>' +
									'Total: '+ this.point.stackTotal;
						}
					},
					plotOptions: {
						column: {
							stacking: 'normal'
						}
					},
					series: [{
						name: '值11',
						data: [3000, 3000, 4000, 2000],
						stack: '本月'
					}, {
						name: '值22',
						data: [5000, 2000, 3000, 5000],
						stack: '本月'
					}, {
						name: '值33',
						data: [4000, 3500, 2500, 3500],
						stack: '上月'
					}, {
						name: '值44',
						data: [3500, 4000, 3200, 4000],
						stack: '上月'
					}]
				});

				break; 
			}

			case 7: {
				chart = new Highcharts.Chart({
					chart: {
						renderTo: 'chart',
						defaultSeriesType: 'column',
						height: 600
					}, 
					title: {
						text: 'G3客户净增',
						style:{
							font:'微软雅黑',
							fontSize: '16px',
							fontWeight: 'bold',
							color:"#333"
						}
					}, 
					subtitle: {
						text: ' ' 
					},
					xAxis: {
						title: {
							align: "high",
							text: ''
						},
						categories: ["中心分公司甜度发的发的发的饭的发达发的发发放的算法大额饿啊","西区分公司的发达饭的发达","南区分公司的发达饭的发达","朝阳分公司的发达饭万恶放大萨芬大放送的发达饭地方","昌平分公司的肤色算法瓦房额的算法的饭","顺义分公司大放送费的发送份额色放阿飞斯蒂芬","通州分公司发送到份额色放的份额的份额","房山分公司","大兴分公司","平谷分公司","延庆分公司","密云分公司","怀柔分公司","海淀分公司"],
						labels: {
							align:'left',
							rotation:45,
							y:10,
							x:-5,
							style: {
								color: '#333',
								font: '11px 微软雅黑'
							}
						}
					},
					yAxis: {
						labels: {
							style: {
								color: '#333',
								font: '11px 微软雅黑'
							}
						},
						title: {
							formatter: function() {
								return this.value/1+'户';
							},
							style: {
								color: '#333',
								fontWeight: 'bold',
								fontSize: '12px',
								fontFamily: '微软雅黑'
							},
							text: 'G3客户净增（单位：户）'
						}
					},
					legend: {
						layout: 'vertical',
						backgroundColor: '#FFF',
						align: 'left',
						verticalAlign: 'top',
						x: 100,
						y: 70,
						floating: true,
						shadow: true
					},
					tooltip: {
						formatter: function() {
							return this.series.name + this.x + ' : ' + this.y+' 户';
						}
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					labels: {
						style: {
							color: '#99b'
						}
					}, 
					series: [{
							name: '本月',
							data:[10,null,null,null,5,6,7,18,9,10,11,12,14,14]
						}, {
							name: '上月',
							data: [5,null,null,null,2,2,4,5,7,8,9,4,12,13]
						}
					]
				});
			}
		}
	}
	
	$("#chooseChart").bind("change", function(e){
		initChart( $(e.target).val() );
	});

	initChart($("#chooseChart").val());

});

})( jQuery );
