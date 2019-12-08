import { Component } from 'react';

const { __ } = wp.i18n;
const { TextControl } = wp.components;

class VAxis extends Component {
	render() {
		return (
			<TextControl
				format="string"
				label={ __( 'Axis Label' ) }
				onChange={ content => {
					const chartOptions = { ...this.props.attributes.chartOptions };
					chartOptions.vAxis.title = content;
					this.props.setAttributes( { chartOptions } );
				} }
				value={ this.props.attributes.chartOptions.vAxis.title }
			/>
		);
	}
}

export default VAxis;
