import { Component, Fragment } from 'react';

const { Button } = wp.components;

import ReactDataSheet from 'react-datasheet';

class Spreadsheet extends Component {
	constructor( props ) {
		super( props );
		// const grid = [
		// 	[ { value: 1 }, { value: 3 } ],
		// 	[ { value: 2 }, { value: 4 } ],
		// ];
		const grid = props.chartData.map( row => {
			return row.map( col => {
				return { value: col };
			} );
		} );
		this.state = {
			grid,
			cell: {
				start: { i: 0, j: 0 },
				end: { i: grid[ 0 ].length - 1, j: grid.length - 1 },
			},
		};
	}

	handleCellChange( changes, overflow = [] ) {
		let maxCol = 0;
		let maxRow = 0;
		let difference = 0;

		let grid = [ ...this.state.grid ];

		// apply the changes in cells currently available
		changes.forEach( ( { row, col, value } ) => {
			grid[ row ][ col ] = { ...grid[ row ][ col ], value };
		} );

		if ( overflow.length ) {
			// determine necessary rows and cols to fit full paste
			overflow.map( cell => {
				maxCol = cell.col > maxCol ? cell.col : maxCol;
				maxRow = cell.row > maxRow ? cell.row : maxRow;
			} );

			// determine number of aditional rows and add them with empty values
			difference = maxRow - grid.length + 1;
			if ( difference ) {
				const newRow = grid[ 0 ].map( () => {
					return { value: null };
				} );

				for ( difference; difference !== 0; difference-- ) {
					grid = [ ...grid, newRow ];
				}
			}

			// determine number of aditional cols and add them with empty values
			difference = maxCol - grid[ 0 ].length + 1;
			if ( difference ) {
				let newCol = [];

				for ( difference; difference !== 0; difference-- ) {
					newCol = [ ...newCol, { value: null } ];
				}

				grid = grid.map( row => {
					return [ ...row, ...newCol ];
				} );
			}

			// apply the changes in cells recently made available
			overflow.forEach( ( { row, col, value } ) => {
				grid[ row ][ col ] = { ...grid[ row ][ col ], value };
			} );
		}

		this.setState( { grid } );
		this.props.handleUpdateChartData( grid );
	}

	handleAddRow = below => {
		let grid = [ ...this.state.grid ];

		const newRow = grid[ 0 ].map( () => {
			return { value: null };
		} );

		if ( below && this.state.cell.end.i === this.state.grid.length - 1 ) {
			grid = [ ...grid, newRow ];
			// set selected cell to last cell in col when adding to bottom
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
		this.props.handleUpdateChartData( grid );
	}

	handleAddCol = right => {
		let grid = [ ...this.state.grid ];

		if ( right && this.state.cell.end.j === this.state.grid[ 0 ].length - 1 ) {
			grid = grid.map( row => {
				return [ ...row, { value: null } ];
			} );
			// set selected cell to last cell in row when adding to the right
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
		this.props.handleUpdateChartData( grid );
	}

	handleRemoveRow = () => {
		const grid = [ ...this.state.grid ];

		const rowsToDelete = this.state.cell.end.i - this.state.cell.start.i + 1;
		grid.splice( this.state.cell.start.i, rowsToDelete );

		this.setState( { grid } );
		this.props.handleUpdateChartData( grid );
	}

	handleRemoveCol = () => {
		let grid = [ ...this.state.grid ];

		const colsToDelete = this.state.cell.end.j - this.state.cell.start.j + 1;
		grid = grid.map( row => {
			row.splice( this.state.cell.start.j, colsToDelete );
			return row;
		} );

		this.setState( { grid } );
		this.props.handleUpdateChartData( grid );
	}

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
					data={ this.state.grid }
					valueRenderer={ ( cell ) => cell.value }
					onCellsChanged={ ( changes, overflow ) => this.handleCellChange( changes, overflow ) }
					onSelect={ cell => this.setState( { cell } ) }
				/>
			</Fragment>
		);
	}
}

export default Spreadsheet;
