import { AxiosError, AxiosResponse } from 'axios';
import { ReactNode, ReactNodeArray } from 'react';
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
export declare type TServerData<RES = any> = RES | undefined | null;
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
    item?: string;
    /** Second item of URL */
    updateVerb: string;
    /** Request package sent in the body of the POST */
    updateRequest: REQ;
    /** Message to display to the user after a successful API call */
    updateMessage?: string;
    /** Sets the state of the response object to null a successful API call */
    setUpdateResponse?: ((response: RES | null) => void);
    /** Action fired with the response object on completion */
    updatedAction?: ((response: RES | null) => void);
    /** Fired when the API starts */
    startingAction?: () => void;
    /** Fired if the API fails */
    catchAction?: (err: AxiosError) => void;
    /** Fired at end of API, either successful or unsuccessful */
    finallyAction?: () => void;
    /** Fired if the API fails */
    failedAction?: (serverStatus: any) => void;
    /** Tells the control to display the local child activity overlay while processing */
    noActivityOverlay?: boolean;
    /** Tells the control to display the global activity overlay while processing */
    globalActivityOverlay?: boolean;
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
export declare type TServerDataUpdatedState<REQ = any, RES = any> = IServerDataUpdatedState<REQ, RES> | null;
/**
 * Interface for the control, with the main REQuest and RESponse types.
 */
export interface IIWQueryProps<REQ = any, RES = any> {
    /** Tells the control to display the local child activity overlay while processing */
    noActivityOverlay?: boolean;
    /** Tells the control to display the global activity overlay while processing */
    globalActivityOverlay?: boolean;
    /** First item of URL */
    item?: string;
    /** Second item of URL */
    verb?: string;
    /** Request package sent in the body of the POST.  If changed, will re-fire the API if this changes and noRefreshOnRequestChange is not true. */
    request?: REQ;
    /** The response object shared with the control.  Set to 'undefined' for the API to initiate. */
    response?: TServerData<RES>;
    /** Sets the state of the response object to null (if failed), or the server data */
    setResponse?: ((response: RES | null) => void);
    /** Message to display to the user after a successful API call */
    responseMessage?: string;
    /** Ignores changes the request object, that would otherwise re-fire the API. */
    noRefreshOnRequestChange?: boolean;
    /** If this value changes, the API will re-fire. */
    forceRefresh?: any;
    /** Function called when the API determines it needs to fire */
    startingAction?: () => void;
    /** Called if the API fails */
    failedAction?: (serverStatus: any) => void;
    /** Called after the API returns, whether successful or failed. */
    finallyAction?: () => void;
    /** Second item of URL */
    updateVerb?: string;
    /** Request package sent in the body of the POST */
    updateRequest?: any;
    /** Sets the state of the response object to null a successful API call */
    setUpdateResponse?: ((response: any | null) => void);
    /** Message to display to the user after a successful API call */
    updateMessage?: string;
    /** After the response is received from the server, this method is fired if successful. */
    updatedAction?: (response: any) => void;
    /** Items to be shown in side the control */
    children?: false | ReactNodeArray | ReactNode;
    /** Items to be shown when the API is working.  Defaults to the <ActivityOverlayControl/> */
    loadingReactNodes?: ReactNodeArray | ReactNode;
    /** Items to be shown in the API fails (e.g. when the response is null) */
    failedReactNodes?: ReactNodeArray | ReactNode;
    /** Prefix that the control will append an item and verb to */
    urlPrefix?: string;
    /** An object that will be passed to the server in the header */
    authorizationHeader?: any;
    /** The actual error from Axios on failure */
    axiosResponseAction?: (axiosResponse: AxiosResponse) => void;
    /** A function that is fired every time an API happens with the header data in it */
    handleServerData?: (serverData: any) => boolean;
    /** A function that is called from the control whenever it needs to alert the user of something */
    showUserMessage?: (message: string, failed?: boolean) => void;
    /** A function called when the API fails */
    catchAction?: (err: AxiosError) => void;
    /** Shows console logs on every fire */
    verboseConsole?: boolean;
    /** Shows more console logs on every fire */
    superVerboseConsole?: boolean;
    /** Turns off Axios.withCredentials */
    noCredentials?: boolean;
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
export declare const IWServerData: <REQ, RES>(props: IIWQueryProps<REQ, RES>) => JSX.Element;
