/*
 * BLOCK: Area Chart
 */

import Chart from '../../components/Chart';

import Data from '../../components/options/Data';
import Title from '../../components/options/Title';
import HAxis from '../../components/options/HAxis';
import VAxis from '../../components/options/VAxis';
import Legend from '../../components/options/Legend';
import Height from '../../components/options/Height';

import icon from './icon';

import './style.scss';

const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { PanelBody } = wp.components;
const { registerBlockType } = wp.blocks;

/*
 * Register: Area Chart Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block.
 */
registerBlockType( 'gutengraphs/areachart', {
	title: __( 'Area Chart' ),
	description: __( 'Display data as an area chart.' ),
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
				title: '',
				hAxis: {
					title: '',
					ticks: [ 0 ],
				},
				vAxis: {
					title: '',
					ticks: 'auto', // [ 0 ],
				},
				legend: {
					position: 'bottom',
				},
				// chartArea: {
				// 	left: 0,
				// 	top: 0,
				// 	width: '100%',
				// 	height: '100%',
				// },
				// colors: [ 'red', '#004411' ],
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
	},
	keywords: [
		__( 'area' ),
		__( 'chart' ),
		__( 'graph' ),
	],
	edit: props => {
		const positions = [
			{
				label: 'Top',
				value: {
					position: 'top',
				},
				isSelected: props.attributes.chartOptions.legend.position === 'top',
			},
			{
				label: 'Right',
				value: {
					position: 'right',
				},
				isSelected: props.attributes.chartOptions.legend.position === 'right',
			},
			{
				label: 'Bottom',
				value: {
					position: 'bottom',
				},
				isSelected: props.attributes.chartOptions.legend.position === 'bottom',
			},
			{
				label: 'None',
				value: 'none',
				isSelected: props.attributes.chartOptions.legend === 'none',
			},
		];

		return [
			<InspectorControls key="1">
				<PanelBody title={ __( 'Settings' ) }>
					<Title setAttributes={ props.setAttributes } attributes={ props.attributes } />
					<Height setAttributes={ props.setAttributes } attributes={ props.attributes } />
				</PanelBody>
				<PanelBody
					title={ __( 'Horizontal Axis' ) }
					initialOpen={ false }
				>
					<HAxis setAttributes={ props.setAttributes } attributes={ props.attributes } />
				</PanelBody>
				<PanelBody
					title={ __( 'Vertical Axis' ) }
					initialOpen={ false }
				>
					<VAxis setAttributes={ props.setAttributes } attributes={ props.attributes } />
				</PanelBody>
				<Data setAttributes={ props.setAttributes } attributes={ props.attributes } />
			</InspectorControls>,
			<div className="gutengraph" key="2">
				<Chart
					clientId={ props.clientId }
					attributes={ props.attributes }
					chartFunction="AreaChart"
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
				data-function="AreaChart"
			>
				<div className="chart-container" style={ { paddingBottom: chartHeight + '%' } }>
					<div className="chart">
					</div>
				</div>
			</div>
		);
	},
} );
