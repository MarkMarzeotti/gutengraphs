/*
 * BLOCK: Bar Chart
 */

import Chart from 'react-google-charts';

import DataModal from '../../components/modal';

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { PanelBody, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;

/*
 * Register: Bar Chart Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block.
 */
registerBlockType( 'gutengraphs/barchart', {
	title: __( 'Bar Chart' ),
	icon: 'shield',
	category: 'gutengraphs',
	attributes: {
		chartTitle: {
			selector: 'div',
			source: 'attribute',
			attribute: 'data-title',
		},
		chartSubtitle: {
			selector: 'div',
			source: 'attribute',
			attribute: 'data-subtitle',
		},
		chartData: {
			selector: 'div',
			source: 'attribute',
			attribute: 'data-content',
		},
	},
	keywords: [
		__( 'bar chart' ),
		__( 'chart' ),
		__( 'graph' ),
	],
	edit: function( props ) {
		const chartData = ( props.attributes.chartData ) ? JSON.parse( props.attributes.chartData ) : [
			[ 'Year', 'Revenue', 'Sales', 'Expenses' ],
			[ '2014', 1000, 400, 200 ],
			[ '2015', 1170, 460, 250 ],
			[ '2016', 660, 1120, 300 ],
			[ '2017', 1030, 540, 350 ],
		];

		const handleUpdateChartData = ( newChartData ) => {
			const emptyRows = [];
			const emptyColumns = [];

			newChartData[ 0 ].map( ( col, colIndex ) => {
				emptyColumns[ colIndex ] = col ? false : true;
			} );

			newChartData.map( ( row, rowIndex ) => {
				let currentRowEmpty = true;
				row.map( ( col, colIndex ) => {
					if ( col ) {
						currentRowEmpty = false;
						emptyColumns[ colIndex ] = false;
					}
					const colValue = ( rowIndex === 0 || colIndex === 0 ) ? String( col ) : Number( col );
					row[ colIndex ] = colValue;
				} );
				emptyRows[ rowIndex ] = currentRowEmpty;
			} );

			let offset = 0;

			emptyRows.map( ( row, rowIndex ) => {
				if ( row ) {
					newChartData.splice( rowIndex - offset, 1 );
					offset++;
				}
			} );

			offset = 0;

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
