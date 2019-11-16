const barChartItem = document.getElementById( 'gutengraphs-bar-chart' );

if ( barChartItem ) {
	google.charts.load( 'current', { packages: [ 'bar' ] } );
	google.charts.setOnLoadCallback( drawBarChart );

	function drawBarChart() {
		const data = google.visualization.arrayToDataTable( JSON.parse( barChartItem.dataset.content ) );
		const chart = new google.charts.Bar( barChartItem );
		chart.draw( data, google.charts.Bar.convertOptions( JSON.parse( barChartItem.dataset.options ) ) );
	}
}

const pieChartItem = document.getElementById( 'gutengraphs-pie-chart' );

if ( pieChartItem ) {
	google.charts.load( 'current', { packages: [ 'corechart' ] } );
	google.charts.setOnLoadCallback( drawPieChart );

	function drawPieChart() {
		const data = google.visualization.arrayToDataTable( JSON.parse( pieChartItem.dataset.content ) );
		const chart = new google.visualization.PieChart( pieChartItem );
		chart.draw( data, JSON.parse( pieChartItem.dataset.options ) );
	}
}
