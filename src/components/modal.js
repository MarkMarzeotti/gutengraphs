import { Component } from 'react';

const { Button, Modal } = wp.components;

import SpreadsheetComponent from 'react-spreadsheet-component';

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
							<SpreadsheetComponent initialData={ this.state.chartData } config={ config } />
						</div>
						<div className="gutengraphs-datasheet-ui">
							<Button isDefault isPrimary onClick={ () => this.props.handleUpdateChartData( this.state.chartData.rows ) }>Update Graph Data</Button>
						</div>
					</Modal>
				) }
			</div>
		);
	}
}

export default DataModal;
