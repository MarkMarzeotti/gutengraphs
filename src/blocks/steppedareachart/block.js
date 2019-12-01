/*
 * BLOCK: Stepped Area Chart
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
 * Register: Stepped Area Chart Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block.
 */
registerBlockType( 'gutengraphs/steppedareachart', {
	title: __( 'Stepped Area Chart' ),
	description: __( 'Display data as a stepped area chart.' ),
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
				[ 'Director (Year)', 'Rotten Tomatoes', 'IMDB' ],
				[ 'Alfred Hitchcock (1935)', 8.4, 7.9 ],
				[ 'Ralph Thomas (1959)', 6.9, 6.5 ],
				[ 'Don Sharp (1978)', 6.5, 6.4 ],
				[ 'James Hawes (2008)', 4.4, 6.2 ],
			],
		},
	},
	keywords: [
		__( 'stepped area chart' ),
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
					chartFunction="SteppedAreaChart"
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
				data-function="SteppedAreaChart"
			>
				<div className="chart-container" style={ { paddingBottom: chartHeight + '%' } }>
					<div className="chart">
					</div>
				</div>
			</div>
		);
	},
} );
