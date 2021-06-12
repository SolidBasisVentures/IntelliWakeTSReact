import React from 'react'
import {Spinner} from 'react-bootstrap'

interface IProps {
	show: boolean
	spinnerSize?: string
}

/**
 * An overlay with a white background and a spinner that covers the entire surface of it's parent component.
 */
export const ActivityOverlayControl = (props: IProps) => {
	return props.show ? (
		<div className="System_ActivityOverlay_Control">
			<Spinner animation="border" style={{width: props.spinnerSize ?? '2rem', height: props.spinnerSize ?? '2rem'}} />
		</div>
	) : null
}
