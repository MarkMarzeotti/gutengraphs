/*
 * BLOCK: Bubble Chart
 */

import Chart from '../../components/Chart';

import Data from '../../components/options/Data';
import Title from '../../components/options/Title';
import Subtitle from '../../components/options/Subtitle';
import Height from '../../components/options/Height';

import icon from './icon';

import './style.scss';

const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { PanelBody } = wp.components;
const { registerBlockType } = wp.blocks;

/*
 * Register: Bubble Chart Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block.
 */
registerBlockType( 'gutengraphs/bubblechart', {
	title: __( 'Bubble Chart' ),
	description: __( 'Display data as a bubble chart.' ),
	icon: icon,
	category: 'graphs',
	attributes: {
		chartHeight: {
			type: 'integer',
			default: 30,
		},
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
				[ 'ID', 'Life Expectancy', 'Fertility Rate', 'Region', 'Population' ],
				[ 'CAN', 80.66, 1.67, 'North America', 33739900 ],
				[ 'DEU', 79.84, 1.36, 'Europe', 81902307 ],
				[ 'DNK', 78.6, 1.84, 'Europe', 5523095 ],
				[ 'EGY', 72.73, 2.78, 'Middle East', 79716203 ],
				[ 'GBR', 80.05, 2, 'Europe', 61801570 ],
				[ 'IRN', 72.49, 1.7, 'Middle East', 73137148 ],
				[ 'IRQ', 68.09, 4.77, 'Middle East', 31090763 ],
				[ 'ISR', 81.55, 2.96, 'Middle East', 7485600 ],
				[ 'RUS', 68.6, 1.54, 'Europe', 141850000 ],
				[ 'USA', 78.09, 2.05, 'North America', 307007000 ],
			],
		},
	},
	keywords: [
		__( 'bubble chart' ),
		__( 'chart' ),
		__( 'graph' ),
	],
	edit: props => {
		return [
			<InspectorControls key="1">
				<PanelBody title={ __( 'Settings' ) }>
					<Title setAttributes={ props.setAttributes } attributes={ props.attributes } />
					<Subtitle setAttributes={ props.setAttributes } attributes={ props.attributes } />
					<Height setAttributes={ props.setAttributes } attributes={ props.attributes } />
				</PanelBody>
				<Data setAttributes={ props.setAttributes } attributes={ props.attributes } />
			</InspectorControls>,
			<div className="gutengraph" key="2">
				<Chart
					clientId={ props.clientId }
					attributes={ props.attributes }
					chartFunction="BubbleChart"
				/>
			</div>,
		];
	},
	save: props => {
		const chartHeight = props.attributes.chartHeight * 2;
		return (
			<div
				className="gutengraph"
				data-options={ JSON.stringify( props.attributes.chartOptions ) }
				data-content={ JSON.stringify( props.attributes.chartData ) }
				data-function="BubbleChart"
			>
				<div className="chart-container" style={ { paddingBottom: chartHeight + '%' } }>
					<div className="chart">
					</div>
				</div>
			</div>
		);
	},
} );
