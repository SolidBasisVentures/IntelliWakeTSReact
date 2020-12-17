import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import moment from 'moment'
import React, {ReactNode, ReactNodeArray, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {ActivityOverlayControl} from './ActivityOverlayControl'
import {IsStageDevFocused, JSONParse, MOMENT_FORMAT_DATE_TIME} from '@solidbasisventures/intelliwaketsfoundation'
import _ from 'lodash'

/**
 * The IWServerData control is a React control that calls API's to a server and manages the state of the data in its control.
 *
 * See the accompanying IWServerData.md documentation for examples how to use this control.
 */

/**
 * The standard structure of the RESponse object, which can be a generic type, undefined or null.
 *
 * Default the value to undefined to automatically trigger the API.
 */
export type TServerData<RES = any> = RES | undefined | null

/**
 * An interface that allows for a script-driven API to occur.
 *
 * @example
 * const [serverDataUpdateProps, setServerDataUpdateProps] = useState<TServerDataUpdatedState>(null)
 *
 * setServerDataUpdateProps({
 *   item: 'Employee',
 *   updateVerb: 'Update',
 *   updateRequest: {
 *     id: 1,
 *     name: 'Bob Smith'
 *   },
 *   updatedAction: (response) => {
 *   		console.log(response)
 *   }
 * } as TServerDataUpdatedStateLocal<API_Employee_Update_Request, API_Employee_Update_Response>)
 *
 * <ServerData {...serverDataUpdateProps} setUpdateResponse={setServerDataUpdateProps} />
 */
export interface IServerDataUpdatedState<REQ = any, RES = any> {
	/** First item of URL */
	item?: string
	/** Second item of URL */
	updateVerb: string
	/** Request package sent in the body of the POST */
	updateRequest: REQ
	/** Message to display to the user after a successful API call */
	updateMessage?: string
	/** Sets the state of the response object to null a successful API call */
	setUpdateResponse?: ((response: RES | null) => void)
	/** Action fired with the response object on completion */
	updatedAction?: ((response: RES | null) => void)
	/** Fired when the API starts */
	startingAction?: () => void
	/** Fired if the API fails */
	catchAction?: (err: AxiosError) => void
	/** Fired at end of API, either successful or unsuccessful */
	finallyAction?: () => void
	/** Fired if the API fails */
	failedAction?: (serverStatus: any) => void
	/** Tells the control to display the local child activity overlay while processing */
	noActivityOverlay?: boolean
	/** Tells the control to display the global activity overlay while processing */
	globalActivityOverlay?: boolean
}

/**
 * An interface that allows for a script-driven API to occur.
 *
 * @example
 * const [serverDataUpdateProps, setServerDataUpdateProps] = useState<TServerDataUpdatedState>(null)
 *
 * setServerDataUpdateProps({
 *   item: 'Employee',
 *   updateVerb: 'Update',
 *   updateRequest: {
 *     id: 1,
 *     name: 'Bob Smith'
 *   },
 *   updatedAction: (response) => {
 *   		console.log(response)
 *   }
 * } as TServerDataUpdatedStateLocal<API_Employee_Update_Request, API_Employee_Update_Response>)
 *
 * <ServerData {...serverDataUpdateProps} setUpdateResponse={setServerDataUpdateProps} />
 */
export type TServerDataUpdatedState<REQ = any, RES = any> = IServerDataUpdatedState<REQ, RES> | null

/**
 * Interface for the control, with the main REQuest and RESponse types.
 */
export interface IIWQueryProps<REQ = any, RES = any> {
	/** Tells the control to display the local child activity overlay while processing */
	noActivityOverlay?: boolean
	/** Tells the control to display the global activity overlay while processing */
	globalActivityOverlay?: boolean
	
	/** First item of URL */
	item?: string
	/** Second item of URL */
	verb?: string
	/** Request package sent in the body of the POST.  If changed, will re-fire the API if this changes and noRefreshOnRequestChange is not true. Will run if undefined or defined, but will not run if request is null */
	request?: REQ
	/** The response object shared with the control.  Set to 'undefined' for the API to initiate. */
	response?: TServerData<RES>
	/** Sets the state of the response object to null (if failed), or the server data */
	setResponse?: ((response: RES | null) => void)
	/** Message to display to the user after a successful API call */
	responseMessage?: string
	/** Ignores changes the request object, that would otherwise re-fire the API. */
	noRefreshOnRequestChange?: boolean
	/** If this value changes, the API will re-fire. */
	forceRefresh?: any
	/** Function called when the API determines it needs to fire */
	startingAction?: () => void
	/** Called if the API fails */
	failedAction?: (serverStatus: any) => void
	/** Called after the API returns, whether successful or failed. */
	finallyAction?: () => void
	
	/** Second item of URL */
	updateVerb?: string
	/** Request package sent in the body of the POST */
	updateRequest?: any
	/** Sets the state of the response object to null a successful API call */
	setUpdateResponse?: ((response: any | null) => void)
	/** Message to display to the user after a successful API call */
	updateMessage?: string
	/** After the response is received from the server, this method is fired if successful. */
	updatedAction?: (response: any) => void
	
	/** Items to be shown in side the control */
	children?: false | ReactNodeArray | ReactNode
	/** Items to be shown when the API is working.  Defaults to the <ActivityOverlayControl/> */
	loadingReactNodes?: ReactNodeArray | ReactNode
	
	/** Prefix that the control will append an item and verb to */
	urlPrefix?: string
	/** An object that will be passed to the server in the header */
	authorizationHeader?: any
	
	/** The actual error from Axios on failure */
	axiosResponseAction?: (axiosResponse: AxiosResponse) => void
	/** A function that is fired every time an API happens with the header data in it */
	handleServerData?: (serverData: any) => boolean
	/** A function that is called from the control whenever it needs to alert the user of something */
	showUserMessage?: (message: string, failed?: boolean) => void
	/** A function called when the API fails */
	catchAction?: (err: AxiosError) => void
	
	/** Shows console logs on every fire */
	verboseConsole?: boolean
	/** Shows more console logs on every fire */
	superVerboseConsole?: boolean
	/** Turns off Axios.withCredentials */
	noCredentials?: boolean
}

/**
 * The IWServerData control is a React control that calls API's to a server and manages the state of the data in its control.
 *
 * The below example assumes that a higher-order-component called ServerData has been created.
 *
 * @example
 * const [serverDataUpdateProps, setServerDataUpdateProps] = useState<TServerDataUpdatedState>(null)
 *
 * setServerDataUpdateProps({
 *   item: 'Employee',
 *   updateVerb: 'Update',
 *   updateRequest: {
 *     id: 1,
 *     name: 'Bob Smith'
 *   },
 *   updatedAction: (response) => {
 *   		console.log(response)
 *   }
 * } as TServerDataUpdatedStateLocal<API_Employee_Update_Request, API_Employee_Update_Response>)
 *
 * <ServerData {...serverDataUpdateProps} setUpdateResponse={setServerDataUpdateProps} />
 *
 * @example
 * const apiEmployeeGetRequest: API_Employee_Get_Request = useMemo(() => {
 * 	return {id: props.id}
 * }, [props.id])
 *
 * const [apiEmployeeGetResponse, setAPIEmployeeGetResponse] = useState(undefined as TServerData<API_Employee_Get_Response>)
 *
 * <ServerData<API_Employee_Get_Request, API_Employee_Get_Response>
 *   item="Employee"
 *   verb="Get"
 *   request={apiEmployeeGetRequest}
 *   response={apiEmployeeGetResponse}
 *   setResponse={setAPIEmployeeGetResponse}>
 *   	{!!apiEmployeeGetResponse && (
 *   		<span>Employee: {apiEmployeeGetResponse.name}</span>
 *   	)}
 * </ServerData>
 *
 */
export const IWServerData = <REQ, RES>(props: IIWQueryProps<REQ, RES>) => {
	const isMounted = useRef(true)
	const forceRefreshRef = useRef(props.forceRefresh)
	const lastRequest = useRef(props.request)
	// const cancelTokenSource = useRef(null as CancelTokenSource | null)
	const inProgress = useRef(false)
	const lastTS = useRef(0)
	const [forceRedraw, setForceRedraw] = useState(false)
	
	const setResponse = useCallback(props.setResponse ?? (() => {}), [props.setResponse])
	const setUpdateResponse = useCallback(props.setUpdateResponse ?? (() => {}), [props.setUpdateResponse])
	const startingAction = useCallback(props.startingAction ?? (() => {}), [props.startingAction])
	const axiosResponseAction = useCallback(props.axiosResponseAction ?? (() => {}), [props.axiosResponseAction])
	const handleServerData = useCallback(props.handleServerData ?? (() => {}), [props.handleServerData])
	const updatedAction = useCallback(props.updatedAction ?? (() => {}), [props.updatedAction])
	const catchAction = useCallback(props.catchAction ?? (() => {}), [props.catchAction])
	const finallyAction = useCallback(props.finallyAction ?? (() => {}), [props.finallyAction])
	const showUserMessage = useCallback(props.showUserMessage ?? (() => {}), [props.showUserMessage])
	const failedAction = useCallback(props.failedAction ?? (() => {}), [props.failedAction])
	
	const isGet = useMemo(() =>
		!!props.item &&
		!!props.verb &&
		props.request !== null &&
		!!setResponse &&
		(forceRedraw || !forceRedraw) &&
		(props.response === undefined ||
			forceRefreshRef.current !== props.forceRefresh ||
			(!props.noRefreshOnRequestChange && !_.isEqual(props.request, lastRequest.current))), [props.item, props.verb, setResponse, props.response, props.request, forceRedraw])
	const isUpdate = useMemo(() => !!props.updateVerb && !!props.updateRequest && !!setUpdateResponse && (forceRedraw || !forceRedraw), [props.updateVerb, props.updateRequest, setUpdateResponse, forceRedraw])
	
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
		
		if (!inProgress.current && (isGet || isUpdate)) {
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
						const resultsData = (response.data ?? {}) as RES | any
						
						if (isMounted.current) {
							if (!!serverStatus) {
								if (IsStageDevFocused() && serverStatus.dev_message) {
									console.log(serverStatus.dev_message)
								}
								
								if (serverStatus.success) {
									if (isUpdate) {
										!!setUpdateResponse && setUpdateResponse(null)
										!!props.updateMessage && !!showUserMessage && showUserMessage(props.updateMessage)
										!!updatedAction && updatedAction(resultsData as any)
									} else {
										!!props.responseMessage && !!showUserMessage && showUserMessage(props.responseMessage)
										!!setResponse && setResponse(resultsData as RES)
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
					// if (isMounted.current) {
					// cancelTokenSource.current = null
					// }
					!!finallyAction && finallyAction()
					inProgress.current = false
					if (isMounted.current) {
						setForceRedraw((prevState) => !prevState)
						console.log('forcing redraw')
					} else {
						console.log('is not mounted')
					}
				})
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
		() => (isGet || isUpdate) && (forceRedraw || !forceRedraw) && !props.noActivityOverlay &&
			!props.globalActivityOverlay &&
			!!props.children,
		[isGet, isUpdate, forceRedraw]
	)
	
	if (isGet || isUpdate) {
		console.log(showInProgressControl, props.item, props.verb, !!props.loadingReactNodes)
	}
	
	return (
		<>
			{!!props.children && props.children}
			{showInProgressControl && (props.loadingReactNodes ??
				<ActivityOverlayControl show />)}
		</>
	)
}
