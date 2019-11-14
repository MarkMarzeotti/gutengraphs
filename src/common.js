google.charts.load( 'current', { packages: [ 'bar' ] } );
google.charts.setOnLoadCallback( drawChart );

function drawChart() {
	const chartItem = document.getElementById( 'gutengraphs-bar-chart' );
	const data = google.visualization.arrayToDataTable( JSON.parse( chartItem.dataset.content ) );
	const chart = new google.charts.Bar( chartItem );
	chart.draw( data, google.charts.Bar.convertOptions( JSON.parse( chartItem.dataset.options ) ) );
}
