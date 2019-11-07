import { Component, Fragment } from 'react';

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
			<Fragment>
				<Button isDefault onClick={ () => this.setState( { isOpen: true } ) }>Edit Chart Data</Button>
				{ this.state.isOpen && (
					<Modal
						title={ this.props.title }
						onRequestClose={ () => this.setState( { isOpen: false } ) }
					>
						<div className="gutengraphs-datasheet__instructions">
							<p>Empty rows and columns are cleared on graph update. To create a new row or column, focus the last cell in a row or column and navigate down or to the right respectively.</p>
						</div>
						<div className="gutengraphs-datasheet__spreadsheet">
							<Spreadsheet
								chartData={ this.props.chartData }
								handleUpdateChartData={ this.props.handleUpdateChartData }
							/>
						</div>
					</Modal>
				) }
			</Fragment>
		);
	}
}

export default DataModal;
