/*
 * BLOCK: Pie Chart
 */

import PieChart from '../../components/charts/PieChart';
import DataModal from '../../components/DataModal';

import icon from '../../icons/piechart';

import './style.scss';

const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { PanelBody, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;

/*
 * Register: Pie Chart Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block.
 */
registerBlockType( 'gutengraphs/piechart', {
	title: __( 'Pie Chart' ),
	description: __( 'Display data as a pie chart.' ),
	icon: icon,
	category: 'graphs',
	attributes: {
		chartOptions: {
			type: 'object',
			default: {
				chart: {
					title: '',
					subtitle: '',
				},
				legend: {
					position: 'bottom',
				},
			},
		},
		chartData: {
			type: 'array',
			default: [
				[ 'Task', 'Hours per Day' ],
				[ 'Work', 11 ],
				[ 'Eat', 2 ],
				[ 'Commute', 2 ],
				[ 'Watch TV', 2 ],
				[ 'Sleep', 7 ],
			],
		},
	},
	keywords: [
		__( 'pie chart' ),
		__( 'chart' ),
		__( 'graph' ),
	],
	edit: props => {
		const handleUpdateChartData = newChartData => {
			// change updated chart data to the chart's expected format
			const chartData = newChartData.map( row => {
				return row.map( col => {
					return col.value;
				} );
			} );

			const emptyRows = [];
			const emptyColumns = [];

			// identify empty columns in first row
			chartData[ 0 ].map( ( col, colIndex ) => {
				emptyColumns[ colIndex ] = col ? false : true;
			} );

			// identify empty rows
			chartData.map( ( row, rowIndex ) => {
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

			// remove the empty rows
			emptyRows.map( ( row, rowIndex ) => {
				if ( row ) {
					chartData.splice( rowIndex - offset, 1 );
					offset++;
				}
			} );

			offset = 0;

			// remove empty columns
			emptyColumns.map( ( col, colIndex ) => {
				if ( col ) {
					chartData.map( row => {
						row.splice( colIndex - offset, 1 );
					} );
					offset++;
				}
			} );

			// update the chart with new data
			props.setAttributes( { chartData } );
		};

		return [
			<InspectorControls key="1">
				<PanelBody title={ __( 'Settings' ) }>
					<TextControl
						id="chart-title"
						format="string"
						label={ __( 'Title' ) }
						onChange={ content => {
							const chartOptions = { ...props.attributes.chartOptions };
							chartOptions.chart.title = content;
							props.setAttributes( { chartOptions } );
						} }
						value={ props.attributes.chartOptions.chart.title }
					/>
					<TextControl
						id="chart-subtitle"
						format="string"
						label={ __( 'Subtitle' ) }
						onChange={ content => {
							const chartOptions = { ...props.attributes.chartOptions };
							chartOptions.chart.subtitle = content;
							props.setAttributes( { chartOptions } );
						} }
						value={ props.attributes.chartOptions.chart.subtitle }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Data' ) }>
					<DataModal
						title={ __( 'Pie Chart Data' ) }
						chartData={ props.attributes.chartData }
						handleUpdateChartData={ handleUpdateChartData }
					/>
				</PanelBody>
				{ /* <PanelBody title={ __( 'Style' ) }>
					props.attributes.chartData[ 0 ].map( ( col, index ) => {
						if ( index !== 0 ) {
							return <Fragment>
								<p>{ props.attributes.chartData[ 0 ][ index ] } Color</p>
								<ColorPalette
									colors={ chartDefaultColors }
									value={ props.attributes.chartStyle[ index ] }
									onChange={ ( color ) => {
										const chartStyle = { ...props.attributes.chartStyle };
										chartStyle[ index ] = color;
										props.setAttributes( { chartStyle } );
									} }
								/>
							</Fragment>;
						}
					} )
				</PanelBody> */ }
			</InspectorControls>,
			<div id="gutengraphs-pie-chart" className={ props.className } key="2">
				<PieChart
					clientId={ props.clientId }
					chartOptions={ props.attributes.chartOptions }
					chartData={ props.attributes.chartData }
				/>
			</div>,
		];
	},
	save: props => {
		return (
			<div
				id="gutengraphs-pie-chart"
				className={ props.className }
				data-options={ JSON.stringify( props.attributes.chartOptions ) }
				data-content={ JSON.stringify( props.attributes.chartData ) }
			>
				<div className="pie-chart-container">
					<div className="pie-chart">
					</div>
				</div>
			</div>
		);
	},
} );
