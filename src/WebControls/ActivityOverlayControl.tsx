import React from 'react'
import {SizeProp} from '@fortawesome/fontawesome-svg-core'
import {Spinner} from './Spinner'

interface IProps {
	show: boolean
	size?: SizeProp
}

/**
 * An overlay with a white background and a spinner that covers the entire surface of it's parent component.
 */
export const ActivityOverlayControl = (props: IProps) => {
	return props.show ? (
		<div className="System_ActivityOverlay_Control">
			<Spinner size={props.size ?? '2x'} />
		</div>
	) : null
}
