google.charts.load( 'current', { packages: [ 'bar' ] } );
google.charts.setOnLoadCallback( drawChart );

function drawChart() {
	const chartContainer = document.getElementById( 'barchart_material' );

	const data = google.visualization.arrayToDataTable( [
		[ 'Year', 'Sales', 'Expenses', 'Profit' ],
		[ '2014', 1000, 400, 200 ],
		[ '2015', 1170, 460, 250 ],
		[ '2016', 660, 1120, 300 ],
		[ '2017', 1030, 540, 350 ],
	] );

	const options = {
		chart: {
			title: chartContainer.dataset.title,
			subtitle: chartContainer.dataset.subtitle,
		},
	};

	const chart = new google.charts.Bar( chartContainer );

	chart.draw( data, google.charts.Bar.convertOptions( options ) );
}
