import { Component } from 'react';

const { __ } = wp.i18n;
const { RangeControl } = wp.components;

class Height extends Component {
	render() {
		return (
			<RangeControl
				label={ __( 'Chart Height' ) }
				value={ this.props.attributes.chartHeight }
				onChange={ ( chartHeight ) => this.props.setAttributes( { chartHeight } ) }
				min={ 1 }
				max={ 100 }
			/>
		);
	}
}

export default Height;
