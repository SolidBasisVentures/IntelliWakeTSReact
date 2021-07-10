import React, {CSSProperties} from 'react'
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
import {faSpinnerThird} from '@fortawesome/pro-solid-svg-icons/faSpinnerThird'

export interface IIWSpinnerProps extends Partial<FontAwesomeIconProps> {}

export const Spinner = (props: IIWSpinnerProps) => {
	let style: CSSProperties = {}

	if (!props.spin && !props.pulse) {
		style.animation = 'fa-spin 0.75s infinite linear'
	}

	return <FontAwesomeIcon icon={faSpinnerThird} style={style} {...props} />
}
