/**
 * External dependencies
 */
import { Text } from 'react-native';
import tinycolor from 'tinycolor2';

/**
 * WordPress dependencies
 */
import { speak } from '@wordpress/a11y';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { withPreferredColorScheme } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import styles from './style.scss';

function ContrastCheckerMessage( {
	tinyBackgroundColor,
	tinyTextColor,
	backgroundColor,
	textColor,
	msgStyle,
} ) {
	const msg =
		tinyBackgroundColor.getBrightness() < tinyTextColor.getBrightness()
			? __(
					'This color combination may be hard for people to read. Try using a darker background color and/or a brighter text color.'
			  )
			: __(
					'This color combination may be hard for people to read. Try using a brighter background color and/or a darker text color.'
			  );

	// Note: The `Notice` component can speak messages via its `spokenMessage`
	// prop, but the contrast checker requires granular control over when the
	// announcements are made. Notably, the message will be re-announced if a
	// new color combination is selected and the contrast is still insufficient.
	useEffect( () => {
		speak( __( 'This color combination may be hard for people to read.' ) );
	}, [ backgroundColor, textColor ] );

	return <Text style={ msgStyle }>{ msg }</Text>;
}

function ContrastChecker( {
	backgroundColor,
	fallbackBackgroundColor,
	fallbackTextColor,
	fontSize, // font size value in pixels
	isLargeText,
	textColor,
	getStylesFromColorScheme,
} ) {
	if (
		! ( backgroundColor || fallbackBackgroundColor ) ||
		! ( textColor || fallbackTextColor )
	) {
		return null;
	}

	const tinyBackgroundColor = tinycolor(
		backgroundColor || fallbackBackgroundColor
	);
	const tinyTextColor = tinycolor( textColor || fallbackTextColor );
	const hasTransparency =
		tinyBackgroundColor.getAlpha() !== 1 || tinyTextColor.getAlpha() !== 1;

	if (
		hasTransparency ||
		tinycolor.isReadable( tinyBackgroundColor, tinyTextColor, {
			level: 'AA',
			size:
				isLargeText || ( isLargeText !== false && fontSize >= 24 )
					? 'large'
					: 'small',
		} )
	) {
		return null;
	}

	const msgStyle = getStylesFromColorScheme(
		styles.message,
		styles.messageDark
	);

	return (
		<ContrastCheckerMessage
			backgroundColor={ backgroundColor }
			textColor={ textColor }
			tinyBackgroundColor={ tinyBackgroundColor }
			tinyTextColor={ tinyTextColor }
			msgStyle={ msgStyle }
		/>
	);
}

export default withPreferredColorScheme( ContrastChecker );