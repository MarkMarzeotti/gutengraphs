const gutengraphs = document.querySelectorAll( '.gutengraph' );

if ( gutengraphs.length ) {
	/* eslint-disable */
	google.charts.load( 'current', { packages: [ 'corechart' ] } );
	google.charts.setOnLoadCallback( drawChart );
	/* eslint-enable */

	function drawChart() {
		let data, chart;
		for ( let i = 0; i < gutengraphs.length; i++ ) {
			const bool = gutengraphs[ i ].dataset.function === 'CandlestickChart' ? true : false;
			/* eslint-disable */
			data = google.visualization.arrayToDataTable( JSON.parse( gutengraphs[ i ].dataset.content ), bool );
			chart = new google.visualization[gutengraphs[ i ].dataset.function]( gutengraphs[ i ].childNodes[ 0 ].childNodes[ 0 ] );
			/* eslint-enable */
			chart.draw( data, JSON.parse( gutengraphs[ i ].dataset.options ) );
		}
	}
}
