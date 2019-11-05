import { Component } from 'react';

const { Button, Modal } = wp.components;

import Spreadsheet from './spreadsheet';

class DataModal extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			isOpen: false,
			chartData: props.chartData,
		};
	}

	render() {
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
							<Spreadsheet chartData={ this.props.chartData } />
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
