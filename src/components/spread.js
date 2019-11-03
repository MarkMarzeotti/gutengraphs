import { Component, Fragment } from 'react';

const { Button } = wp.components;

import ReactDataSheet from 'react-datasheet';

class Spread extends Component {
	constructor( props ) {
		super( props );
		const grid = [
			[ { value: 1 }, { value: 3 } ],
			[ { value: 2 }, { value: 4 } ],
		];
		this.state = {
			grid,
			cellSelected: [
				{ i: 0, j: 0 },
				{ i: grid[ 0 ].length, j: grid.length },
			],
		};
	}

	handleAddRow = position => {

	}

	handleAddCol = position => {

	}

	handleSelect( e ) {
		this.setState( { cellSelected: e.target.value } );
	}

	render() {
		return (
			<Fragment>
				<div className="gutengraphs-datasheet__buttons">
					<Button isDefault isSmall onClick={ () => this.handleAddRow( this.state.grid.length ) }>Add Row Above</Button>
					<Button isDefault isSmall onClick={ () => this.handleAddRow( this.state.grid.length ) }>Add Row Below</Button>
					<Button isDefault isSmall onClick={ () => this.handleAddRow( this.state.grid[ 0 ].length ) }>Add Column Left</Button>
					<Button isDefault isSmall onClick={ () => this.handleAddRow( this.state.grid[ 0 ].length ) }>Add Column Right</Button>
				</div>
				<ReactDataSheet
					ref={ this.myRef }
					data={ this.state.grid }
					valueRenderer={ ( cell ) => cell.value }
					onCellsChanged={ changes => {
						const grid = this.state.grid.map( row => [ ...row ] );
						changes.forEach( ( { cell, row, col, value } ) => {
							grid[ row ][ col ] = { ...grid[ row ][ col ], value };
						} );
						this.setState( { grid } );
					} }
					onSelect={ cell => {
						this.setState( { cellSelected: [ cell.start, cell.end ] } );
					} }
				/>
			</Fragment>
		);
	}
}

export default Spread;
