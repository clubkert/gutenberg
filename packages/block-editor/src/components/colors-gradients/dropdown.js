/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	__experimentalItem as Item,
	__experimentalHStack as HStack,
	FlexItem,
	ColorIndicator,
	Dropdown,
} from '@wordpress/components';
import { isRTL } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ColorGradientControl from './control';

export default function ColorGradientDropdown( {
	colors,
	gradients,
	disableCustomColors,
	disableCustomGradients,
	__experimentalHasMultipleOrigins,
	__experimentalIsRenderedInSidebar,
	enableAlpha,
	settings,
} ) {
	let dropdownPosition;
	let popoverProps;
	if ( __experimentalIsRenderedInSidebar ) {
		dropdownPosition = isRTL() ? 'bottom right' : 'bottom left';
		popoverProps = { __unstableForcePosition: true };
	}

	return (
		<Dropdown
			position={ dropdownPosition }
			popoverProps={ popoverProps }
			className="block-editor-panel-color-gradient-settings__dropdown"
			contentClassName="block-editor-panel-color-gradient-settings__dropdown-content"
			renderToggle={ ( { isOpen, onToggle } ) => {
				return (
					<Item
						onClick={ onToggle }
						className={ classnames(
							'block-editor-panel-color-gradient-settings__item',
							{ 'is-open': isOpen }
						) }
					>
						<HStack justify="flex-start">
							<ColorIndicator
								className="block-editor-panel-color-gradient-settings__color-indicator"
								colorValue={
									settings.gradientValue ??
									settings.colorValue
								}
							/>
							<FlexItem>{ settings.label }</FlexItem>
						</HStack>
					</Item>
				);
			} }
			renderContent={ () => (
				<ColorGradientControl
					showTitle={ false }
					{ ...{
						colors,
						gradients,
						disableCustomColors,
						disableCustomGradients,
						__experimentalHasMultipleOrigins,
						__experimentalIsRenderedInSidebar,
						enableAlpha,
						...settings,
					} }
				/>
			) }
		/>
	);
}
