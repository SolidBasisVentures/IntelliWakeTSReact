import React from 'react'
import moment from 'moment'
import {Spinner} from './Spinner'
import {SizeProp} from '@fortawesome/fontawesome-svg-core'

export interface IActivityOverlayState {
	nestedCount: number
	lastStart: moment.Moment | undefined
}

export const initialActivityOverlayState: IActivityOverlayState = {
	nestedCount: 0,
	lastStart: undefined
}

interface IProps {
	activityOverlayState: IActivityOverlayState
	resetActivityOverlay: () => void
	size?: SizeProp
}

export const AddActivityOverlay = (prevState: IActivityOverlayState): IActivityOverlayState => {
	return {
		nestedCount: prevState.nestedCount + 1,
		lastStart: moment()
	}
}

export const RemoveActivityOverlay = (prevState: IActivityOverlayState): IActivityOverlayState => {
	if (prevState.nestedCount < 1) {
		console.log('WARNING: Additional RemoveActivityOverlay called')
		return initialActivityOverlayState
	}

	return {
		nestedCount: prevState.nestedCount - 1,
		lastStart: moment()
	}
}

/**
 * An overlay with a black background and a spinner that covers the entire screen.
 */
export const ActivityOverlay = (props: IProps) => {
	function resetActivityOverlay() {
		if (props.activityOverlayState.nestedCount > 0) {
			const seconds = 5
			if (moment().diff(props.activityOverlayState.lastStart ?? 0, 'seconds') >= seconds) {
				props.resetActivityOverlay()
			}
		}
	}

	if (props.activityOverlayState.nestedCount > 0) {
		return (
			<div className="System_ActivityOverlay" onClick={resetActivityOverlay} color="primary">
				<Spinner size={props.size ?? '3x'} />
			</div>
		)
	}

	return null
}
