import React from 'react'
import {Spinner} from 'reactstrap'

interface IProps {
	show: boolean,
	spinnerSize?: string
}

/**
 * An overlay with a white background and a spinner that covers the entire surface of it's parent component.
 */
export const ActivityOverlayControl = (props: IProps) => {
	console.log('AOC Show', props.show)
	return props.show ? <div className="System_ActivityOverlay_Control">
			<Spinner style={{width: props.spinnerSize ?? '2rem', height: props.spinnerSize ?? '2rem'}} />
		</div>
		:
		null
}
