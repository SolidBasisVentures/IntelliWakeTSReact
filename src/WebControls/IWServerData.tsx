import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import moment from 'moment'
import React, {Dispatch, ReactNode, ReactNodeArray, SetStateAction, useEffect, useMemo, useRef, useState} from 'react'
import {ActivityOverlayControl} from './ActivityOverlayControl'
import {IsStageDevFocused, JSONParse, MOMENT_FORMAT_DATE_TIME} from '@solidbasisventures/intelliwaketsfoundation'
import _ from 'lodash'

/**
 * The IWServerData control is a React control that calls API's to a server and manages the state of the data in its control.
 *
 * See the accompanying IWServerData.md documentation for examples how to use this control.
 */

export type TServerData<T = any> = T | undefined | null

export interface IServerDataUpdatedState<U = any> {
	item?: string
	updateVerb: string
	updateRequest: any
	updateMessage?: string
	setUpdateResponse?: Dispatch<SetStateAction<U | null>>
	updatedAction?: (response: U) => void
	startingAction?: () => void
	catchAction?: (err: AxiosError) => void
	finallyAction?: () => void
	failedAction?: (serverStatus: any) => void
	globalActivityOverlay?: boolean
	noActivityOverlay?: boolean
}

export type TServerDataUpdatedState<U = any> = IServerDataUpdatedState<U> | null

// G = Get, U = Update
export interface IIWQueryProps<G = any, U = any> {
	noActivityOverlay?: boolean
	globalActivityOverlay?: boolean

	item?: string
	verb?: string
	request?: any
	response?: TServerData<G>
	setResponse?: Dispatch<SetStateAction<G | null>>
	responseMessage?: string
	noRefreshOnRequestChange?: boolean
	forceRefresh?: any
	startingAction?: () => void
	failedAction?: (serverStatus: any) => void
	finallyAction?: () => void

	updateVerb?: string
	updateRequest?: any
	setUpdateResponse?: Dispatch<SetStateAction<U | null>>
	updateMessage?: string
	updatedAction?: (response: U) => void

	children?: false | ReactNodeArray | ReactNode
	loadingReactNodes?: ReactNodeArray | ReactNode
	failedReactNodes?: ReactNodeArray | ReactNode
	
	urlPrefix?: string
	authorizationHeader?: any
	
	axiosResponseAction?: (axiosResponse: AxiosResponse) => void
	handleServerData?: (serverData: any) => boolean
	showUserMessage?: (message: string, failed?: boolean) => void
	catchAction?: (err: AxiosError) => void

	verboseConsole?: boolean
	superVerboseConsole?: boolean
	noCredentials?: boolean
}

export const IWServerData = <G, U>(props: IIWQueryProps<G, U>) => {
	const isMounted = useRef(true)
	const forceRefreshRef = useRef(props.forceRefresh)
	const lastRequest = useRef(props.request)
	// const cancelTokenSource = useRef(null as CancelTokenSource | null)
	const inProgress = useRef(false)
	const lastTS = useRef(0)
	const [forceRedraw, setForceRedraw] = useState(false)

	const setResponse = props.setResponse
	const setUpdateResponse = props.setUpdateResponse
	const startingAction = props.startingAction
	const axiosResponseAction = props.axiosResponseAction
	const handleServerData = props.handleServerData
	const updatedAction = props.updatedAction
	const catchAction = props.catchAction
	const finallyAction = props.finallyAction
	const showUserMessage = props.showUserMessage
	const failedAction = props.failedAction

	const isGet =
		!!props.item &&
		!!props.verb &&
		!!setResponse &&
		(props.response === undefined ||
			forceRefreshRef.current !== props.forceRefresh ||
			(!props.noRefreshOnRequestChange && !_.isEqual(props.request, lastRequest.current)))
	const isUpdate = !!props.updateVerb && !!props.updateRequest && !!setUpdateResponse

	if (props.verboseConsole && (props.superVerboseConsole || ((isGet || isUpdate) && !inProgress.current)))
		console.log(
			'IWServerData-Local',
			props.item,
			props.verb,
			props.updateVerb,
			'isGet',
			isGet,
			'isUpdate',
			isUpdate,
			'inProgress',
			inProgress.current,
			'starting',
			(isGet || isUpdate) && !inProgress.current
		)

	useEffect(() => {
		isMounted.current = true

		if (!inProgress.current) {
			if (isGet || isUpdate) {
				inProgress.current = true

				const currentTS = moment().valueOf()
				if (lastTS.current > currentTS - 1000) {
					console.log('!WARNING!', props.item, props.verb, 'processed less than a second ago!')
					if (props.response === undefined) console.log('Get re-run due to undefined response')
					if (forceRefreshRef.current !== props.forceRefresh) console.log('Get re-run due to forceRefresh flag')
					if (!props.noRefreshOnRequestChange && !_.isEqual(props.request, lastRequest.current))
						console.log('Get re-run due to request change')
					if (isUpdate) console.log('Update re-run')
				}

				if (isGet) {
					lastRequest.current = props.request
				}
				lastTS.current = currentTS

				forceRefreshRef.current = props.forceRefresh
				// cancelTokenSource.current = axios.CancelToken.source()

				setForceRedraw((prevState) => !prevState)

				const authorizationHeader = {
					timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
					localtime: moment().format(MOMENT_FORMAT_DATE_TIME),
					locationhref: window.location.href,
					...props.authorizationHeader
				} as any

				if (!!props.superVerboseConsole) console.log('aH', authorizationHeader)

				let headers: any = {
					Authorization: JSON.stringify(authorizationHeader)
				}

				let config: AxiosRequestConfig = {
					headers: headers
				}

				// if (!!cancelTokenSource.current) {
				// 	config.cancelToken = cancelTokenSource.current.token
				// }

				!!startingAction && startingAction()

				const verb = isUpdate ? props.updateVerb : props.verb
				const request = isUpdate ? props.updateRequest : props.request ?? {}

				// if (!props.noCredentials) axios.defaults.withCredentials = true
				if (!props.noCredentials) config.withCredentials = true
				// if (!props.noCrossDomain) {
				// 	config.baseURL = `${window.location.origin ?? ''}`
				// }
				if (!!props.verboseConsole)
					console.log(`API Request for ${props.urlPrefix ?? ''}/${props.item}/${verb}`, request, config)
				axios
					.post(`${props.urlPrefix ?? ''}/${props.item}/${verb}`, request, config)
					.then((response: any) => {
						if (isMounted.current) {
							if (!!props.verboseConsole)
								console.log(`API Response for ${props.urlPrefix ?? ''}/${props.item}/${verb}`, response)
							if (!!props.superVerboseConsole) console.log('headers', response.headers)

							!!axiosResponseAction && axiosResponseAction(response)

							if (!!handleServerData && !!response.headers.serverdata) {
								if (!handleServerData(JSONParse(response.headers.serverdata ?? '{}'))) {
									if (isUpdate) {
										!!setUpdateResponse && setUpdateResponse(null)
									} else {
										!!setResponse && setResponse(null)
									}

									return
								}
							}

							const serverStatus: any = JSONParse(
								response.headers.serverstatus ?? '{}'
							)
							const resultsData = (response.data ?? {}) as G | U

							if (isMounted.current) {
								if (!!serverStatus) {
									if (IsStageDevFocused() && serverStatus.dev_message) {
										console.log(serverStatus.dev_message)
									}

									if (serverStatus.success) {
										if (isUpdate) {
											!!setUpdateResponse && setUpdateResponse(null)
											!!props.updateMessage && !!showUserMessage && showUserMessage(props.updateMessage)
											!!updatedAction && updatedAction(resultsData as U)
										} else {
											!!props.responseMessage && !!showUserMessage && showUserMessage(props.responseMessage)
											!!setResponse && setResponse(resultsData as G)
										}

										!!serverStatus.message && !!showUserMessage && showUserMessage(serverStatus.message)
									} else {
										!!failedAction && failedAction(serverStatus)

										if (isUpdate) {
											!!setUpdateResponse && setUpdateResponse(null)
										} else {
											!!setResponse && setResponse(null)
										}
									}
								} else {
									if (IsStageDevFocused()) {
										console.warn(props.item, verb, 'API: Response Empty', response)
									}
									!!showUserMessage && showUserMessage('Could not connect to server', true)

									if (isUpdate) {
										!!setUpdateResponse && setUpdateResponse(null)
									} else {
										!!setResponse && setResponse(null)
									}
								}
							}
						}
					})
					.catch((error: any) => {
						if (isMounted.current) {
							if (IsStageDevFocused()) {
								console.warn(`API Error for ${props.urlPrefix ?? ''}/${props.item}/${verb}`, error)
							}
							// axios.isCancel(error)
							!!showUserMessage && showUserMessage('Could not connect to server', true)
							if (isUpdate) {
								!!setUpdateResponse && setUpdateResponse(null)
							} else {
								!!setResponse && setResponse(null)
							}
							!!catchAction && catchAction(error)
						}
					})
					.finally(() => {
						if (isMounted.current) {
							// cancelTokenSource.current = null
						}
						!!finallyAction && finallyAction()
						inProgress.current = false
						if (isMounted.current) {
							setForceRedraw((prevState) => !prevState)
						}
					})
			}
		}

		return () => {
			isMounted.current = false
			// if (cancelTokenSource.current) {
			// 	cancelTokenSource.current.cancel()
			// 	cancelTokenSource.current = null
			// }
		}
	}, [
		props.item,
		props.verb,
		props.request,
		props.response,
		props.responseMessage,
		props.forceRefresh,
		props.updateVerb,
		props.updateRequest,
		props.updateMessage,
		setResponse,
		setUpdateResponse,
		startingAction,
		axiosResponseAction,
		handleServerData,
		catchAction,
		updatedAction,
		finallyAction,
		failedAction,
		showUserMessage,
		props.authorizationHeader,
		props.urlPrefix,
		isGet,
		isUpdate,
		props.verboseConsole,
		props.superVerboseConsole,
		props.noCredentials
	])

	const showInProgressControl = useMemo(
		() => (isGet || isUpdate || (forceRedraw && !forceRedraw)) && inProgress.current,
		[isGet, isUpdate, forceRedraw]
	)

	return (
		<>
			{!!props.children && (props.response !== null || !props.failedReactNodes) && props.children}
			{props.response === null && props.failedReactNodes}
			{showInProgressControl && props.loadingReactNodes}
			<ActivityOverlayControl
				show={
					showInProgressControl &&
					!props.loadingReactNodes &&
					!props.noActivityOverlay &&
					!props.globalActivityOverlay &&
					props.children !== undefined
				}
			/>
		</>
	)
}
