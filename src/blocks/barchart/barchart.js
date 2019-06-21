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
	category: 'common',
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
		renderedChart: {
			type: 'array',
			source: 'children',
			selector: 'div',
			default: [],
		},
	},
	keywords: [
		__( 'bar chart' ),
		__( 'chart' ),
		__( 'graph' ),
	],
	edit: class extends wp.element.Component {
		constructor() {
			super( ...arguments );

			this.state = {
				saveChartData: false,
			};
		}

		// componentDidMount() {
		// 	const renderedChart = document.body.querySelector( '[data-block="' + this.props.clientId + '"]' ).innerHTML;
		// 	this.props.setAttributes( { renderedChart: renderedChart } );
		// }

		componentDidUpdate() {
			if ( this.state.saveChartData ) {
				const renderedChart = document.body.querySelector( '[data-block="' + this.props.clientId + '"]' ).innerHTML;
				this.props.setAttributes( { renderedChart: renderedChart } );
				this.setState( { saveChartData: false } );
			}
		}

		render() {
			const chartData = ( this.props.attributes.chartData ) ? JSON.parse( this.props.attributes.chartData ) : [
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

				this.props.setAttributes( { chartData: JSON.stringify( newChartData ) } );
				this.setState( { saveChartData: true } );
			};

			return [
				<InspectorControls key="1">
					<PanelBody title={ __( 'Settings' ) }>
						<TextControl
							id="chart-title"
							format="string"
							label={ __( 'Title' ) }
							onChange={ ( content ) => {
								this.props.setAttributes( { chartTitle: content } );
								this.setState( { saveChartData: true } );
							} }
							value={ this.props.attributes.chartTitle }
						/>
						<TextControl
							id="chart-subtitle"
							format="string"
							label={ __( 'Subtitle' ) }
							onChange={ ( content ) => {
								this.props.setAttributes( { chartSubtitle: content } );
								this.setState( { saveChartData: true } );
							} }
							value={ this.props.attributes.chartSubtitle }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Graph Data' ) }>
						<DataModal
							title={ this.props.attributes.chartTitle }
							chartData={ chartData }
							handleUpdateChartData={ handleUpdateChartData }
						/>
					</PanelBody>
				</InspectorControls>,
				<div className={ this.props.className } key="2">
					<Chart
						chartType="Bar"
						data={ chartData }
						options={ {
							chart: {
								title: this.props.attributes.chartTitle,
								subtitle: this.props.attributes.chartSubtitle,
							},
						} } />
				</div>,
			];
		}
	},
	save: function( props ) {
		return (
			<div
				id="barchart_material"
				data-title={ props.attributes.chartTitle }
				data-subtitle={ props.attributes.chartSubtitle }
				data-content={ props.attributes.chartData }
				dangerouslySetInnerHTML={ { __html: props.attributes.renderedChart } } />
		);
	},
} );
