import { Component } from 'react';

const { Button, Modal } = wp.components;

// import SpreadsheetComponent from 'react-spreadsheet-component';
import Spread from './spread';

// jexcel import
// import Spreadsheet from './spreadsheet';

class DataModal extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			isOpen: false,
			cols: 5,
			rows: 6,
			chartData: {
				rows: props.chartData,
			},
		};
	}

	render() {
		const config = {
			rows: 5,
			columns: 4,
			hasHeadColumn: false,
			isHeadColumnString: false,
			hasHeadRow: false,
			isHeadRowString: false,
			canAddRow: true,
			canAddColumn: true,
			emptyValueSymbol: '',
			hasLetterNumberHeads: false,
		};

		// jexcel options
		// const data = [
		// 	[ 'Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700' ],
		// 	[ 'Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777' ],
		// ];

		// const options = {
		// 	data: data,
		// 	columns: [
		// 		{ type: 'text', title: 'Car', width: '120px' },
		// 		{ type: 'dropdown', title: 'Make', width: '250px', source: [ 'Alfa Romeo', 'Audi', 'Bmw' ] },
		// 		{ type: 'calendar', title: 'Available', width: '250px' },
		// 		{ type: 'image', title: 'Photo', width: '120px' },
		// 		{ type: 'checkbox', title: 'Stock', width: '80px' },
		// 		{ type: 'numeric', title: 'Price', width: '100px', mask: '$ #.##,00', decimal: ',' },
		// 		{ type: 'color', width: '100px', render: 'square' },
		// 	],
		// };

		return (
			<div>
				<Button isDefault onClick={ () => this.setState( { isOpen: true } ) }>Edit Chart Data</Button>
				{ this.state.isOpen && (
					<Modal
						title={ this.props.title }
						onRequestClose={ () => this.setState( { isOpen: false } ) }>
						<div className="gutengraphs-datasheet-instructions">
							<p>Empty rows and columns are cleared on graph update. To create a new row or column, focus the last cell in a row or column and navigate down or to the right respectively.</p>
						</div>
						<div className="gutengraphs-datasheet">
							{/* <SpreadsheetComponent initialData={ this.state.chartData } config={ config } /> */}
							{ /* <Spreadsheet options={ options } /> */ }
							<Spread chartData={ this.props.chartData } />
						</div>
						<div className="gutengraphs-datasheet-ui">
							<Button isDefault isPrimary onClick={ () => {
								this.props.handleUpdateChartData( this.state.chartData.rows );
								this.setState( { isOpen: false } );
							} }>Update Graph Data</Button>
						</div>
					</Modal>
				) }
			</div>
		);
	}
}

export default DataModal;
