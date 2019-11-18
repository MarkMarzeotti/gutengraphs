const barChart = document.querySelectorAll( '.wp-block-gutengraphs-barchart' );

if ( barChart.length ) {
	/* eslint-disable */
	google.charts.load( 'current', { packages: [ 'corechart' ] } );
	google.charts.setOnLoadCallback( drawBarChart );
	/* eslint-enable */

	function drawBarChart() {
		let data, chart;
		for ( let i = 0; i < barChart.length; i++ ) {
			/* eslint-disable */
			data = google.visualization.arrayToDataTable( JSON.parse( barChart[ i ].dataset.content ) );
			chart = new google.visualization.ColumnChart( barChart[ i ].childNodes[ 0 ].childNodes[ 0 ] );
			/* eslint-enable */
			chart.draw( data, JSON.parse( barChart[ i ].dataset.options ) );
		}
	}
}

const pieChart = document.querySelectorAll( '.wp-block-gutengraphs-piechart' );

if ( pieChart.length ) {
	/* eslint-disable */
	google.charts.load( 'current', { packages: [ 'corechart' ] } );
	google.charts.setOnLoadCallback( drawPieChart );
	/* eslint-enable */

	function drawPieChart() {
		let data, chart;
		for ( let i = 0; i < pieChart.length; i++ ) {
			/* eslint-disable */
			data = google.visualization.arrayToDataTable( JSON.parse( pieChart[ i ].dataset.content ) );
			chart = new google.visualization.PieChart( pieChart[ i ].childNodes[ 0 ].childNodes[ 0 ] );
			/* eslint-enable */
			chart.draw( data, JSON.parse( pieChart[ i ].dataset.options ) );
		}
	}
}
