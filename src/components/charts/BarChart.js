import { Component } from 'react';

import scriptjs from 'scriptjs';

class BarChart extends Component {
	componentDidMount() {
		scriptjs.get( 'https://www.gstatic.com/charts/loader.js', () => {
			/* eslint-disable */
			google.charts.load( 'current', { packages: [ 'bar' ] } );
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
		const chartItem = document.body.querySelector( '[data-block="' + this.props.clientId + '"] .bar-chart' );
		/* eslint-disable */
		const data = google.visualization.arrayToDataTable( this.props.chartData );
		const chart = new google.charts.Bar( chartItem );
		chart.draw( data, google.charts.Bar.convertOptions( this.props.chartOptions ) );
		/* eslint-enable */
	}

	render() {
		return (
			<div className="bar-chart">
			</div>
		);
	}
}

export default BarChart;
