import React, {useCallback} from 'react'
import {IIWQueryProps, IWServerData} from './IWServerData'

export const ServerData = <REQ, RES>(props: IIWQueryProps<REQ, RES>) => {
	const setMessageBox = useCallback((_message: string, _color: string) => {}, []) // Call some global state to update a message
	const setActivityOverlay = useCallback((_show: boolean) => {}, []) // Call some global state to show the global activity overlay
	
	const globalActivityOverlay = !!props.globalActivityOverlay
	const propsStartingAction = props.startingAction

	const startingAction = useCallback(() => {
		globalActivityOverlay && setActivityOverlay(true)

		!!propsStartingAction && propsStartingAction()
	}, [globalActivityOverlay, propsStartingAction, setActivityOverlay])

	const showUserMessage = useCallback(
		(message: string, failed?: boolean) => {
			setMessageBox(message, !!failed ? 'danger' : 'success')
		},
		[setMessageBox]
	)
	const propsFinallyAction = props.finallyAction

	const finallyAction = useCallback(() => {
		!!propsFinallyAction && propsFinallyAction()
		
		// Check the server heading or cookies for anything coming back to the server that you need to update each time, like user rights, if they're still logged in, etc.

		globalActivityOverlay && setActivityOverlay(false)
	}, [
		propsFinallyAction,
		globalActivityOverlay,
		setActivityOverlay
	])

	return (
		<IWServerData
			{...props}
			urlPrefix={`https://${process.env.REACT_APP_API_URL ?? ''}`}
			showUserMessage={showUserMessage}
			startingAction={startingAction}
			finallyAction={finallyAction}
		/>
	)
}
