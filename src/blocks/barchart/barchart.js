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
const { Component } = wp.element;

const icon = <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 480 480">
	<path style={ { fill: '#1E88E5' } } d="M432,16h-64c-8.832,0-16,7.168-16,16v400c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16V32
	C448,23.168,440.832,16,432,16z" />
	<path style={ { fill: '#2196F3' } } d="M272,240h-64c-8.832,0-16,7.168-16,16v176c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16V256
	C288,247.168,280.832,240,272,240z" />
	<path style={ { fill: '#64B5F6' } } d="M112,144H48c-8.832,0-16,7.168-16,16v272c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16V160
	C128,151.168,120.832,144,112,144z" />
	<path style={ { fill: '#455A64' } } d="M464,464H16c-8.832,0-16-7.168-16-16s7.168-16,16-16h448c8.832,0,16,7.168,16,16S472.832,464,464,464
	z" />
</svg>;

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
		renderedChart: {
			type: 'string',
		},
	},
	keywords: [
		__( 'bar chart' ),
		__( 'chart' ),
		__( 'graph' ),
	],
	edit: class extends Component {
		constructor() {
			super( ...arguments );

			this.state = {
				saveChartData: false,
			};
		}

		componentDidMount() {
			setTimeout( () => {
				const renderedChart = document.body.querySelector( '[data-block="' + this.props.clientId + '"] svg' ).outerHTML;
				this.setState( { renderedChart: renderedChart } );
				this.props.setAttributes( { renderedChart: renderedChart } );
			}, 3000 );
		}

		componentDidUpdate() {
			if ( this.state.saveChartData ) {
				const renderedChart = document.body.querySelector( '[data-block="' + this.props.clientId + '"] svg' ).outerHTML;
				this.setState( { saveChartData: false } );
				this.props.setAttributes( { renderedChart: renderedChart } );
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
				className={ props.className }
				data-title={ props.attributes.chartTitle }
				data-subtitle={ props.attributes.chartSubtitle }
				data-content={ props.attributes.chartData }
				dangerouslySetInnerHTML={ { __html: props.attributes.renderedChart } } />
		);
	},
} );
