import { Component, Fragment } from 'react';

const { Button } = wp.components;

import ReactDataSheet from 'react-datasheet';

class Spreadsheet extends Component {
	constructor( props ) {
		super( props );
		const grid = [
			[ { value: 1 }, { value: 3 } ],
			[ { value: 2 }, { value: 4 } ],
		];
		this.state = {
			grid,
			cell: {
				start: { i: 0, j: 0 },
				end: { i: grid[ 0 ].length - 1, j: grid.length - 1 },
			},
		};
	}

	handleAddRow = below => {
		let grid = [ ...this.state.grid ];

		const newRow = grid[ 0 ].map( row => {
			return { value: null };
		} );

		if ( below && this.state.cell.end.i === this.state.grid.length - 1 ) {
			grid = [ ...grid, newRow ];
			// need to recalc cell here so user is allowed to add multiple rows
			const cell = { ...this.state.cell };
			cell.end.i = this.state.grid.length;
			this.setState( { cell } );
		} else if ( ! below && this.state.cell.start.i === 0 ) {
			grid = [ newRow, ...grid ];
		} else if ( below ) {
			const index = this.state.cell.end.i + 1;
			grid.splice( index, 0, newRow );
		} else {
			const index = this.state.cell.start.i;
			grid.splice( index, 0, newRow );
		}

		this.setState( { grid } );
	}

	handleAddCol = right => {
		let grid = [ ...this.state.grid ];

		if ( right && this.state.cell.end.j === this.state.grid[ 0 ].length - 1 ) {
			grid = grid.map( row => {
				return [ ...row, { value: null } ];
			} );
			// need to recalc cell here so user is allowed to add multiple cols
			const cell = { ...this.state.cell };
			cell.end.j = this.state.grid[ 0 ].length;
			this.setState( { cell } );
		} else if ( ! right && this.state.cell.start.j === 0 ) {
			grid = grid.map( row => {
				return [ { value: null }, ...row ];
			} );
		} else if ( right ) {
			const index = this.state.cell.end.j + 1;
			grid = grid.map( row => {
				row.splice( index, 0, { value: null } );
				return row;
			} );
		} else {
			const index = this.state.cell.start.j;
			grid = grid.map( row => {
				row.splice( index, 0, { value: null } );
				return row;
			} );
		}

		this.setState( { grid } );
	}

	handleRemoveRow = () => {
		const grid = [ ...this.state.grid ];

		const rowsToDelete = this.state.cell.start.i - this.state.cell.end.i + 1;
		grid.splice( this.state.cell.start.i, rowsToDelete );

		this.setState( { grid } );
	}

	handleRemoveCol = () => {
		let grid = [ ...this.state.grid ];

		const colsToDelete = this.state.cell.start.j - this.state.cell.end.j + 1;
		grid = grid.map( row => {
			row.splice( this.state.cell.start.j, colsToDelete );
			return row;
		} );

		this.setState( { grid } );
	}

	handleLargePaste() {

	}

	// handle larger paste
	// hook up to graph

	render() {
		return (
			<Fragment>
				<div className="gutengraphs-datasheet__buttons">
					<Button isDefault isSmall onClick={ () => this.handleAddRow( 0 ) }>Add Row Above</Button>
					<Button isDefault isSmall onClick={ () => this.handleAddRow( 1 ) }>Add Row Below</Button>
					<Button isDefault isSmall onClick={ () => this.handleAddCol( 0 ) }>Add Column Left</Button>
					<Button isDefault isSmall onClick={ () => this.handleAddCol( 1 ) }>Add Column Right</Button>
				</div>
				<div className="gutengraphs-datasheet__buttons">
					<Button isDefault isSmall onClick={ () => this.handleRemoveRow() }>Remove Row(s)</Button>
					<Button isDefault isSmall onClick={ () => this.handleRemoveCol() }>Remove Column(s)</Button>
				</div>
				<ReactDataSheet
					ref={ this.myRef }
					data={ this.state.grid }
					valueRenderer={ ( cell ) => cell.value }
					onCellsChanged={ ( changes, overflow = null ) => {
						const grid = this.state.grid.map( row => [ ...row ] );
						changes.forEach( ( { cell, row, col, value } ) => {
							grid[ row ][ col ] = { ...grid[ row ][ col ], value };
						} );

						if ( overflow !== null ) {
							console.log( overflow );
						}

						this.setState( { grid } );
					} }
					onSelect={ cell => {
						this.setState( { cell } );
					} }
				/>
			</Fragment>
		);
	}
}

export default Spreadsheet;
