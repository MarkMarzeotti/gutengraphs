import { Component } from 'react';

import scriptjs from 'scriptjs';

class Chart extends Component {
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
		const chartItem = document.body.querySelector( '[data-block="' + this.props.clientId + '"] .chart' );
		const bool = this.props.chartFunction === 'CandlestickChart' ? true : false;
		/* eslint-disable */
		const data = google.visualization.arrayToDataTable( this.props.attributes.chartData, bool );
		const chart = new google.visualization[this.props.chartFunction]( chartItem );
		/* eslint-enable */
		chart.draw( data, this.props.attributes.chartOptions );
	}

	render() {
		const chartHeight = this.props.attributes.chartHeight * 2;
		return (
			<div className="chart-container" style={ { paddingBottom: chartHeight + '%' } }>
				<div className="chart">
				</div>
			</div>
		);
	}
}

export default Chart;
