import { Component } from 'react';

const { __ } = wp.i18n;
const { TextControl } = wp.components;

class Title extends Component {
	render() {
		return (
			<TextControl
				format="string"
				label={ __( 'Title' ) }
				onChange={ content => {
					const chartOptions = { ...this.props.attributes.chartOptions };
					chartOptions.title = content;
					this.props.setAttributes( { chartOptions } );
				} }
				value={ this.props.attributes.chartOptions.title }
			/>
		);
	}
}

export default Title;
