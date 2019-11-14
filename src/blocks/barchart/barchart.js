/*
 * BLOCK: Bar Chart
 */

// import Chart from 'react-google-charts';
import BarChart from '../../components/charts/BarChart';
import DataModal from '../../components/DataModal';

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { ColorPicker, PanelBody, TextControl, ToggleControl } = wp.components;
const { registerBlockType } = wp.blocks;

const icon = <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 480 480">
	<path style={ { fill: '#555d66' } } d="M432,16h-64c-8.832,0-16,7.168-16,16v400c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16V32
	C448,23.168,440.832,16,432,16z" />
	<path style={ { fill: '#555d66' } } d="M272,240h-64c-8.832,0-16,7.168-16,16v176c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16V256
	C288,247.168,280.832,240,272,240z" />
	<path style={ { fill: '#555d66' } } d="M112,144H48c-8.832,0-16,7.168-16,16v272c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16V160
	C128,151.168,120.832,144,112,144z" />
	<path style={ { fill: '#555d66' } } d="M464,464H16c-8.832,0-16-7.168-16-16s7.168-16,16-16h448c8.832,0,16,7.168,16,16S472.832,464,464,464
	z" />
</svg>;

const chartDefaultColors = [
	'#3366cc',
	'#dc3912',
	'#ff9900',
	'#109618',
	'#990099',
	'#0099c6',
	'#dd4477',
	'#66aa00',
	'#b82e2e',
	'#316395',
	'#994499',
	'#22aa99',
	'#aaaa11',
	'#6633cc',
	'#e67300',
	'#8b0707',
	'#651067',
	'#329262',
	'#5574a6',
	'#3b3eac',
	'#b77322',
	'#16d620',
	'#b91383',
	'#f4359e',
	'#9c5935',
	'#a9c413',
	'#2a778d',
	'#668d1c',
	'#bea413',
	'#0c5922',
	'#743411',
];

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
				bars: 'vertical',
				isStacked: false,
			},
		},
		chartData: {
			type: 'array',
			default: [
				[ 'Year', 'Revenue', 'Sales', 'Expenses' ],
				[ '2014', 1000, 400, 200 ],
				[ '2015', 1170, 460, 250 ],
				[ '2016', 660, 1120, 300 ],
				[ '2017', 1030, 540, 350 ],
			],
		},
		chartStyle: {
			type: 'array',
			default: [
				{ role: 'style' },
				'color: ' + chartDefaultColors[ 0 ],
				'color: ' + chartDefaultColors[ 1 ],
				'color: ' + chartDefaultColors[ 2 ],
				'color: ' + chartDefaultColors[ 3 ],
			],
		},
	},
	keywords: [
		__( 'bar chart' ),
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
					<ToggleControl
						label="Chart Direction"
						help={ props.attributes.chartOptions.bars === 'horizontal' ? 'Horizontal' : 'Vertical' }
						checked={ props.attributes.chartOptions.bars === 'horizontal' }
						onChange={ () => {
							const chartOptions = { ...props.attributes.chartOptions };
							chartOptions.bars = chartOptions.bars === 'horizontal' ? 'vertical' : 'horizontal';
							props.setAttributes( { chartOptions } );
						} }
					/>
					<ToggleControl
						label="Chart Format"
						help={ props.attributes.chartOptions.isStacked ? 'Stacked' : 'Separate' }
						checked={ props.attributes.chartOptions.isStacked }
						onChange={ () => {
							const chartOptions = { ...props.attributes.chartOptions };
							chartOptions.isStacked = ! chartOptions.isStacked;
							props.setAttributes( { chartOptions } );
						} }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Data' ) }>
					<DataModal
						title={ __( 'Bar Chart Data' ) }
						chartData={ props.attributes.chartData }
						handleUpdateChartData={ handleUpdateChartData }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Style' ) }>
					{ /* props.attributes.chartData.map( ( row, index ) => {
						if ( index !== 0 ) {
							return <ColorPicker
								color={ props.attributes.chartStyle[ index ] }
								onChangeComplete={ ( value ) => {
									const chartStyle = { ...props.attributes.chartStyle };
									chartStyle[ index ] = `color: rgba(${ value.rgb.r }, ${ value.rgb.g }, ${ value.rgb.b }, ${ value.rgb.a })`;
									props.setAttributes( { chartStyle } );
								} }
							/>;
						}
					} ) */ }
				</PanelBody>
			</InspectorControls>,
			<div className={ props.className } key="2">
				<BarChart
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
				id="gutengraphs-bar-chart"
				className={ props.className }
				data-options={ JSON.stringify( props.attributes.chartOptions ) }
				data-content={ JSON.stringify( props.attributes.chartData ) }
			/>
		);
	},
} );
