import { Component } from 'react';

const { __ } = wp.i18n;
const { TextControl } = wp.components;

class HAxis extends Component {
	render() {
		return (
			<TextControl
				format="string"
				label={ __( 'Axis Label' ) }
				onChange={ content => {
					const chartOptions = { ...this.props.attributes.chartOptions };
					chartOptions.hAxis.title = content;
					this.props.setAttributes( { chartOptions } );
				} }
				value={ this.props.attributes.chartOptions.hAxis.title }
			/> // add a show ticks option!!!!!
		);
	}
}

export default HAxis;
