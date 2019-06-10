/*
 * BLOCK: Bar Chart
 */

import Chart from 'react-google-charts';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
	Add: AddBox,
	Check: Check,
	Clear: Clear,
	Delete: DeleteOutline,
	// DetailPanel: ChevronRight,
	Edit: Edit,
	// Export: SaveAlt,
	// Filter: FilterList,
	// FirstPage: FirstPage,
	// LastPage: LastPage,
	// NextPage: ChevronRight,
	// PreviousPage: ChevronLeft,
	// ResetSearch: Clear,
	// Search: Search,
	// SortArrow: ArrowUpward,
	// ThirdStateCheck: Remove,
	// ViewColumn: ViewColumn,
};

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { InspectorControls } = wp.editor;
const { PanelBody, TextControl, TextareaControl, Button, Modal } = wp.components;
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/*
 * Register: Bar Chart Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'gutengraphs/barchart', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Bar Chart' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		chartTitle: {
			selector: 'div', // From tag a
			source: 'attribute', // binds an attribute of the tag
			attribute: 'data-title', // binds href of a: the link url
		},
		chartSubtitle: {
			selector: 'div', // From tag a
			source: 'attribute', // binds an attribute of the tag
			attribute: 'data-subtitle', // binds href of a: the link url
		},
		chartColumns: {
			selector: 'div', // From tag a
			source: 'attribute', // binds an attribute of the tag
			attribute: 'data-columns', // binds href of a: the link url
		},
		chartData: {
			selector: 'div', // From tag a
			source: 'attribute', // binds an attribute of the tag
			attribute: 'data-content', // binds href of a: the link url
		},
		modalOpen: false,
	},
	keywords: [
		__( 'bar chart' ),
		__( 'chart' ),
		__( 'graph' ),
	],

	/*
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		function onChangeChartTitle( content ) {
			props.setAttributes( { chartTitle: content } );
		}

		function onChangeChartSubtitle( content ) {
			props.setAttributes( { chartSubtitle: content } );
		}

		function onChangeChartColumns( content ) {
			props.setAttributes( { chartColumns: content } );
		}

		let columnsArray = props.attributes.chartColumns.split( ',' );
		let columnsObject = columnsArray.map( function( col, index ) {
			return { title: col, field: index };
		} );

		let chartArray = [];
		if ( props.attributes.chartData ) {
			chartArray = JSON.parse( props.attributes.chartData );
		}

		let chartObject = chartArray.map( function( row ) {
			return Object.assign( {}, row );
		} );

		let fullChart = chartArray;
		fullChart.unshift( props.attributes.chartColumns.split( ',' ) );

		return [
			<InspectorControls key="1">
				<PanelBody title={ __( 'Settings' ) }>
					<TextControl
						id="chart-title"
						format="string"
						label={ __( 'Title' ) }
						onChange={ onChangeChartTitle }
						value={ props.attributes.chartTitle }
					/>
					<TextControl
						id="chart-subtitle"
						format="string"
						label={ __( 'Subtitle' ) }
						onChange={ onChangeChartSubtitle }
						value={ props.attributes.chartSubtitle }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Graph Data' ) }>
					<TextareaControl
						label="Columns"
						help="Separate columns by comma"
						value={ props.attributes.chartColumns }
						onChange={ onChangeChartColumns }
					/>
					<Button isDefault onClick={ () => props.setAttributes( { modalOpen: true } ) }>Edit Graph Data</Button>
					{ props.attributes.modalOpen && (
						<Modal
							title="Edit Graph Data"
							onRequestClose={ () => props.setAttributes( { modalOpen: false } ) }>
							<MaterialTable
								icons={ tableIcons }
								columns={ columnsObject }
								data={ chartObject }
								options={ {
									search: false,
									paging: false,
								} }
								title={ props.attributes.chartTitle }
								editable={ {
									onRowAdd: newData => new Promise( ( resolve, reject ) => {
										setTimeout( () => {
											{
												const data = JSON.parse( props.attributes.chartData );
												data.push( newData );
												props.setAttributes( { chartData: JSON.stringify( data ) }, () => resolve() );
											}
											resolve();
										}, 1000 );
									} ),
									onRowUpdate: ( newData, oldData ) => new Promise( ( resolve, reject ) => {
										setTimeout( () => {
											{
												const data = JSON.parse( props.attributes.chartData );
												const index = data.indexOf( oldData );
												data[ index ] = newData;
												props.setAttributes( { chartData: JSON.stringify( data ) }, () => resolve() );
											}
											resolve();
										}, 1000 );
									} ),
									onRowDelete: oldData => new Promise( ( resolve, reject ) => {
										setTimeout( () => {
											{
												const data = JSON.parse( props.attributes.chartData );
												const index = data.indexOf( oldData );
												data.splice( index, 1 );
												props.setAttributes( { chartData: JSON.stringify( data ) }, () => resolve() );
											}
											resolve();
										}, 1000 );
									} ),
								} }
							/>
						</Modal>
					) }
				</PanelBody>
			</InspectorControls>,
			<div className={ props.className } key="2">
				<Chart
					chartType="Bar"
					data={ fullChart }
					options={ {
						chart: {
							title: props.attributes.chartTitle,
							subtitle: props.attributes.chartSubtitle,
						},
					} } />
			</div>,
		];
	},

	/*
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div
				id="barchart_material"
				data-title={ props.attributes.chartTitle }
				data-subtitle={ props.attributes.chartSubtitle }
				data-columns={ props.attributes.chartColumns }
				data-content={ props.attributes.chartData }></div>
		);
	},
} );
