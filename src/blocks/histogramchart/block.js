/*
 * BLOCK: Area Chart
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
 * Register: Histogram Chart Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block.
 */
registerBlockType( 'gutengraphs/histogramchart', {
	title: __( 'Histogram Chart' ),
	description: __( 'Display data as a histogram chart.' ),
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
				[ 'Dinosaur', 'Length' ],
				[ 'Acrocanthosaurus (top-spined lizard)', 12.2 ],
				[ 'Albertosaurus (Alberta lizard)', 9.1 ],
				[ 'Allosaurus (other lizard)', 12.2 ],
				[ 'Apatosaurus (deceptive lizard)', 22.9 ],
				[ 'Archaeopteryx (ancient wing)', 0.9 ],
				[ 'Argentinosaurus (Argentina lizard)', 36.6 ],
				[ 'Baryonyx (heavy claws)', 9.1 ],
				[ 'Brachiosaurus (arm lizard)', 30.5 ],
				[ 'Ceratosaurus (horned lizard)', 6.1 ],
				[ 'Coelophysis (hollow form)', 2.7 ],
				[ 'Compsognathus (elegant jaw)', 0.9 ],
				[ 'Deinonychus (terrible claw)', 2.7 ],
				[ 'Diplodocus (double beam)', 27.1 ],
				[ 'Dromicelomimus (emu mimic)', 3.4 ],
				[ 'Gallimimus (fowl mimic)', 5.5 ],
				[ 'Mamenchisaurus (Mamenchi lizard)', 21.0 ],
				[ 'Megalosaurus (big lizard)', 7.9 ],
				[ 'Microvenator (small hunter)', 1.2 ],
				[ 'Ornithomimus (bird mimic)', 4.6 ],
				[ 'Oviraptor (egg robber)', 1.5 ],
				[ 'Plateosaurus (flat lizard)', 7.9 ],
				[ 'Sauronithoides (narrow-clawed lizard)', 2.0 ],
				[ 'Seismosaurus (tremor lizard)', 45.7 ],
				[ 'Spinosaurus (spiny lizard)', 12.2 ],
				[ 'Supersaurus (super lizard)', 30.5 ],
				[ 'Tyrannosaurus (tyrant lizard)', 15.2 ],
				[ 'Ultrasaurus (ultra lizard)', 30.5 ],
				[ 'Velociraptor (swift robber)', 1.8 ],
			],
		},
	},
	keywords: [
		__( 'histogram chart' ),
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
					chartFunction="Histogram"
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
				data-function="Histogram"
			>
				<div className="chart-container" style={ { paddingBottom: chartHeight + '%' } }>
					<div className="chart">
					</div>
				</div>
			</div>
		);
	},
} );
