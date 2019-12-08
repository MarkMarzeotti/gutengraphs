import { Component } from 'react';

const { __ } = wp.i18n;
const { BaseControl, Button, ButtonGroup } = wp.components;

class Legend extends Component {
	render() {
		return (
			// <TextControl
			// 	format="string"
			// 	label={ __( 'Legend Position' ) }
			// 	onChange={ content => {
			// 		const chartOptions = { ...this.props.attributes.chartOptions };
			// 		chartOptions.hAxis.title = content;
			// 		this.props.setAttributes( { chartOptions } );
			// 	} }
			// 	value={ this.props.attributes.chartOptions.hAxis.title }
			// />
			<BaseControl
				label={ __( 'Legend Position' ) }
			>
				<ButtonGroup>
					{ this.props.positions.map( ( position, index ) => {
						return <Button
							key={ index }
							isPrimary={ position.isSelected }
							isSmall
							onClick={ () => {
								const chartOptions = { ...this.props.attributes.chartOptions };
								chartOptions.legend = position.value;
								this.props.setAttributes( { chartOptions } );
							} }
						>{ position.label }</Button>;
					} ) }
				</ButtonGroup>
			</BaseControl>
		);
	}
}

export default Legend;
