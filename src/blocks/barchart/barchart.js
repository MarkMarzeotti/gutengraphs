/*
 * BLOCK: Bar Chart
 */

import Chart from 'react-google-charts';

import DataModal from '../../components/modal';

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { InspectorControls } = wp.editor;
const { PanelBody, TextControl } = wp.components;
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
		chartData: {
			selector: 'div', // From tag a
			source: 'attribute', // binds an attribute of the tag
			attribute: 'data-content', // binds href of a: the link url
		},
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
		const chartData = ( props.attributes.chartData ) ? JSON.parse( props.attributes.chartData ) : [
			[ 'Year', 'Revenue', 'Sales', 'Expenses' ],
			[ '2014', 1000, 400, 200 ],
			[ '2015', 1170, 460, 250 ],
			[ '2016', 660, 1120, 300 ],
			[ '2017', 1030, 540, 350 ],
		];

		const handleUpdateChartData = ( newChartData ) => {
			let currentRowEmpty = true;
			const emptyColumns = [];
			let offset = 0;
			newChartData[ 0 ].map( ( col, colIndex ) => {
				emptyColumns[ colIndex ] = col ? false : true;
			} );
			newChartData.map( ( row, rowIndex ) => {
				row.map( ( col, colIndex ) => {
					const value = ( rowIndex === 0 || colIndex === 0 ) ? String( col ) : Number( col );
					if ( col ) {
						currentRowEmpty = false;
						emptyColumns[ colIndex ] = false;
					}
					if ( value ) {
						col = value;
					}
					row[ colIndex ] = col;
				} );
				if ( currentRowEmpty ) {
					newChartData.splice( rowIndex, 1 );
				}
				currentRowEmpty = true;
			} );
			emptyColumns.map( ( col, colIndex ) => {
				if ( col ) {
					newChartData.map( ( row ) => {
						row.splice( colIndex - offset, 1 );
					} );
					offset++;
				}
			} );
			props.setAttributes( { chartData: JSON.stringify( newChartData ) } );
		};

		return [
			<InspectorControls key="1">
				<PanelBody title={ __( 'Settings' ) }>
					<TextControl
						id="chart-title"
						format="string"
						label={ __( 'Title' ) }
						onChange={ ( content ) => props.setAttributes( { chartTitle: content } ) }
						value={ props.attributes.chartTitle }
					/>
					<TextControl
						id="chart-subtitle"
						format="string"
						label={ __( 'Subtitle' ) }
						onChange={ ( content ) => props.setAttributes( { chartSubtitle: content } ) }
						value={ props.attributes.chartSubtitle }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Graph Data' ) }>
					<DataModal title={ props.attributes.chartTitle } chartData={ chartData } handleUpdateChartData={ handleUpdateChartData } />
				</PanelBody>
			</InspectorControls>,
			<div className={ props.className } key="2">
				<Chart
					chartType="Bar"
					data={ chartData }
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
				data-content={ props.attributes.chartData }></div>
		);
	},
} );
