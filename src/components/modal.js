const { Button, Modal } = wp.components;

import SpreadsheetComponent from 'react-spreadsheet-component';

class DataModal extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			isOpen: false,
			cols: 5,
			rows: 6,
			grid: {
				rows: [
					[ 'Year', 'Revenue', 'Sales', 'Expenses' ],
					[ '2014', '1000', '400', '200' ],
					[ '2015', '1170', '460', '250' ],
					[ '2016', '660', '1120', '300' ],
					[ '2017', '1030', '540', '350' ],
				],
			},
		};
	}

	handleClearEmpty = () => {
		console.log( 'clear empty' );
	}

	prepareSaveGrid = () => {
		console.log( 'save grid' );
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
			emptyValueSymbol: '-',
			hasLetterNumberHeads: false,
		};

		return (
			<div>
				<Button isDefault onClick={ () => this.setState( { isOpen: true } ) }>Edit Chart Data</Button>
				{ this.state.isOpen && (
					<Modal
						title={ this.props.title }
						onRequestClose={ () => this.setState( { isOpen: false } ) }>
						<div className="gutengraphs-datasheet-ui">
							<Button isDefault onClick={ this.handleClearEmpty }>Clear Empty Rows and Columns</Button>
							<Button isDefault isPrimary onClick={ () => this.props.handleSaveGrid( this.state.grid.rows ) }>Save Data</Button>
						</div>
						<div className="gutengraphs-datasheet">
							<SpreadsheetComponent initialData={ this.state.grid } config={ config } />
						</div>
					</Modal>
				) }
			</div>
		);
	}
}

export default DataModal;
