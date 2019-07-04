google.charts.load( 'current', { packages: [ 'bar' ] } );
google.charts.setOnLoadCallback( drawChart );

function drawChart() {
	const chartContainer = document.getElementById( 'barchart_material' );

	const data = google.visualization.arrayToDataTable( JSON.parse( chartContainer.dataset.content ) );

	const options = {
		chart: {
			title: chartContainer.dataset.title,
			subtitle: chartContainer.dataset.subtitle,
		},
	};

	const chart = new google.charts.Bar( chartContainer );

	chart.draw( data, google.charts.Bar.convertOptions( options ) );
}
