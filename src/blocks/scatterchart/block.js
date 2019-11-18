/*
 * BLOCK: Scatter Chart
 */

import ScatterChart from '../../components/charts/ScatterChart';
import DataModal from '../../components/DataModal';

import icon from '../../icons/scatterchart';

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { MenuGroup, MenuItemsChoice, PanelBody, TextControl } = wp.components;
const { registerBlockType } = wp.blocks;

/*
 * Register: Scatter Chart Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block.
 */
registerBlockType( 'gutengraphs/scatterchart', {
	title: __( 'Scatter Chart' ),
	description: __( 'Display data as a scatter chart.' ),
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
				[ 'Age', 'Weight' ],
				[ 8, 12 ],
				[ 4, 5.5 ],
				[ 11, 14 ],
				[ 4, 5 ],
				[ 3, 3.5 ],
				[ 6.5, 7 ],
			],
		},
	},
	keywords: [
		__( 'scatter chart' ),
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
					<MenuGroup label="Chart Direction">
						<MenuItemsChoice
							choices={ [
								{
									value: 'vertical',
									label: 'Vertical',
								},
								{
									value: 'horizontal',
									label: 'Horizontal',
								},
							] }
							value={ props.attributes.chartOptions.bars }
							onSelect={ mode => {
								const chartOptions = { ...props.attributes.chartOptions };
								chartOptions.bars = mode;
								props.setAttributes( { chartOptions } );
							} }
						/>
					</MenuGroup>
					<MenuGroup label="Chart Format">
						<MenuItemsChoice
							choices={ [
								{
									value: false,
									label: 'Separate',
								},
								{
									value: true,
									label: 'Stacked',
								},
							] }
							value={ props.attributes.chartOptions.isStacked }
							onSelect={ stacked => {
								const chartOptions = { ...props.attributes.chartOptions };
								chartOptions.isStacked = stacked;
								props.setAttributes( { chartOptions } );
							} }
						/>
					</MenuGroup>
				</PanelBody>
				<PanelBody title={ __( 'Data' ) }>
					<DataModal
						title={ __( 'Scatter Chart Data' ) }
						chartData={ props.attributes.chartData }
						handleUpdateChartData={ handleUpdateChartData }
					/>
				</PanelBody>
			</InspectorControls>,
			<div id="gutengraphs-scatter-chart" className={ props.className } key="2">
				<ScatterChart
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
				id="gutengraphs-scatter-chart"
				className={ props.className }
				data-options={ JSON.stringify( props.attributes.chartOptions ) }
				data-content={ JSON.stringify( props.attributes.chartData ) }
			>
				<div className="scatter-chart-container">
					<div className="scatter-chart">
					</div>
				</div>
			</div>
		);
	},
} );
