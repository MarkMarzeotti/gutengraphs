import { Component } from 'react';

import scriptjs from 'scriptjs';

class PieChart extends Component {
	componentDidMount() {
		scriptjs.get( 'https://www.gstatic.com/charts/loader.js', () => {
			/* eslint-disable */
			google.charts.load( 'current', { packages: [ 'corechart' ] } );
			google.charts.setOnLoadCallback( () => {
				/* eslint-enable */
				this.drawChart();
			} );
		} );
	}

	componentDidUpdate() {
		this.drawChart();
	}

	drawChart() {
		const chartItem = document.body.querySelector( '[data-block="' + this.props.clientId + '"] .pie-chart' );
		/* eslint-disable */
		const data = google.visualization.arrayToDataTable( this.props.chartData );
		const chart = new google.visualization.PieChart( chartItem );
		/* eslint-enable */
		chart.draw( data, this.props.chartOptions );
	}

	render() {
		return (
			<div className="pie-chart">
			</div>
		);
	}
}

export default PieChart;
