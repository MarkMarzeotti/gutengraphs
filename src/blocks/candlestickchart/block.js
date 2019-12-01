/*
 * BLOCK: Bar Chart
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
 * Register: Bar Chart Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block.
 */
registerBlockType( 'gutengraphs/candlestickchart', {
	title: __( 'Candlestick Chart' ),
	description: __( 'Display data as a candlestick chart.' ),
	icon: icon,
	category: 'graphs',
	attributes: {
		chartHeight: {
			type: 'integer',
			default: 25,
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
				[ 'Mon', 20, 28, 38, 45 ],
				[ 'Tue', 31, 38, 55, 66 ],
				[ 'Wed', 50, 55, 77, 80 ],
				[ 'Thu', 77, 77, 66, 50 ],
				[ 'Fri', 68, 66, 22, 15 ],
			],
		},
	},
	keywords: [
		__( 'candlestick chart' ),
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
					chartFunction="CandlestickChart"
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
				data-function="CandlestickChart"
			>
				<div className="chart-container" style={ { paddingBottom: chartHeight + '%' } }>
					<div className="chart">
					</div>
				</div>
			</div>
		);
	},
} );
