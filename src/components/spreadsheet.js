import { Component } from 'react';
import { ReactDOM } from 'react-dom';
import { jexcel } from 'jexcel';

class Spreadsheet extends Component {
	constructor( props ) {
		super( props );
		this.options = props.options;
	}

	componentDidMount = function() {
		this.el = jexcel( ReactDOM.findDOMNode( this ).children[ 0 ], this.options );
	}

	addRow = function() {
		this.el.insertRow();
	}

	render() {
		return (
			<div>
				<div></div><br />
				<input type="button" value="Add new row" onClick={ () => this.addRow() }></input>
			</div>
		);
	}
}

export default Spreadsheet;
