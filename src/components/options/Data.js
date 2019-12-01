import { Component } from 'react';

import DataModal from '../../components/DataModal';

const { __ } = wp.i18n;
const { PanelBody } = wp.components;

class Title extends Component {
	handleUpdateChartData = newChartData => {
		// change updated chart data to the chart's expected format
		const chartData = newChartData.map( row => {
			return row.map( col => {
				return col.value;
			} );
		} );

		const emptyRows = [];
		const emptyColumns = [];

		// identify empty columns in first row
		chartData[ 0 ].map( ( col, colIndex ) => {
			emptyColumns[ colIndex ] = col ? false : true;
		} );

		// identify empty rows
		chartData.map( ( row, rowIndex ) => {
			let currentRowEmpty = true;
			row.map( ( col, colIndex ) => {
				if ( col ) {
					currentRowEmpty = false;
					emptyColumns[ colIndex ] = false;
				}
				const colValue = ( rowIndex === 0 || colIndex === 0 ) ? String( col ) : Number( col );
				row[ colIndex ] = colValue;
			} );
			emptyRows[ rowIndex ] = currentRowEmpty;
		} );

		let offset = 0;

		// remove the empty rows
		emptyRows.map( ( row, rowIndex ) => {
			if ( row ) {
				chartData.splice( rowIndex - offset, 1 );
				offset++;
			}
		} );

		offset = 0;

		// remove empty columns
		emptyColumns.map( ( col, colIndex ) => {
			if ( col ) {
				chartData.map( row => {
					row.splice( colIndex - offset, 1 );
				} );
				offset++;
			}
		} );

		// update the chart with new data
		this.props.setAttributes( { chartData } );
	};

	render() {
		return (
			<PanelBody title={ __( 'Data' ) }>
				<DataModal
					title={ __( 'Chart Data' ) }
					chartData={ this.props.attributes.chartData }
					handleUpdateChartData={ this.handleUpdateChartData }
				/>
			</PanelBody>
		);
	}
}

export default Title;
