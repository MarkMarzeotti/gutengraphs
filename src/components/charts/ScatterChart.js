import { Component } from 'react';

import scriptjs from 'scriptjs';

class ScatterChart extends Component {
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
		const chartItem = document.body.querySelector( '[data-block="' + this.props.clientId + '"] .scatter-chart' );
		/* eslint-disable */
		const data = google.visualization.arrayToDataTable( this.props.chartData );
		const chart = new google.visualization.ScatterChart( chartItem );
		/* eslint-enable */
		chart.draw( data, this.props.chartOptions );
	}

	render() {
		return (
			<div className="scatter-chart-container">
				<div className="scatter-chart">
				</div>
			</div>
		);
	}
}

export default ScatterChart;
