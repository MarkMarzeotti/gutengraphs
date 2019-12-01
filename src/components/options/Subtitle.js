import { Component } from 'react';

const { __ } = wp.i18n;
const { TextControl } = wp.components;

class Subtitle extends Component {
	render() {
		return (
			<TextControl
				format="string"
				label={ __( 'Subtitle' ) }
				onChange={ content => {
					const chartOptions = { ...this.props.attributes.chartOptions };
					chartOptions.chart.subtitle = content;
					this.props.setAttributes( { chartOptions } );
				} }
				value={ this.props.attributes.chartOptions.chart.subtitle }
			/>
		);
	}
}

export default Subtitle;
