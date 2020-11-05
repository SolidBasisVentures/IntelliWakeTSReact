# IWServerData

## Overview

The IWServerData control is a React control that calls API's to a server and manages the state of the data in its control.

The best practice is to provide a higher-order-component in the consuming app, generally called `<ServerData/>` that provides all the administrative settings to this control to simplify its usage across the app.  The description for that higher-order-component is described below.

In general, there are 3 ways to utilize the resulting `<ServerData/>` control that uses `<IWServerData/>`:

## Scenario #1: Simple Retrieval of a JSON dataset from an API

Let's say that you have an api at the following address: `https://mysite/Employee/Get` 

For this example, we are going to pass an `id` to the server, and we expect to receive an object with `id`, `name`, and `start_date` of the employee.

An example of how this could be coded would be as follows:

    interface IProps {
        id: number
    }
    
    interface API_Employee_Get_Request {
        id: number
    }

    interface API_Employee_Get_Response {
        id: number
        name: string
        start_date: string
    }

    export const MyControl = (props: IProps) => {
    	const apiEmployeeGetRequest: API_Employee_Get_Request = useMemo(() => {
    	    return {id: props.id}
    	}, [props.id])
    
    	const [apiEmployeeGetResponse, setAPIEmployeeGetResponse] = useState(undefined as TServerData<API_Employee_Get_Response>)
    	
    	return (
            <ServerData<API_Employee_Get_Request, API_Employee_Get_Response>
                item="Employee"
                verb="Get"
                request={apiEmployeeGetRequest}
                response={apiEmployeeGetResponse}
                setResponse={setAPIEmployeeGetResponse}>
                {!!apiEmployeeGetResponse && (
                    <span>Employee: {apiEmployeeGetResponse.name}</span>
                )}
            </ServerData>
    	)
    }

Let's walk through each part of this:

#### `interface IProps` 

Provides the employee ID from the component calling this component

#### `interface API_Employee_Get_(Request/Response)`  

Are the definitions that should be shared with the back-end server so that the front-end and back-end can communicate with the exact same data structures

#### `const apiEmployeeGetRequest: API_Employee_Get_Request`

This variable is used to populate the request package being sent to the server to tell it what id to retrieve.  *(Note: In IntelliWake, we pass all requests to the API handler as POST requests, with the parameters securely encoded in a json body package.  We **do not** do something like `https://mysite/Employee/Get/ID/1`)*

#### `useState(undefined as TServerData<API_Employee_Get_Response>)`

`TServerData` provides one of three states that are passed to the IWServerData object to tell it what to do.  The three states are as follows:
* `undefined` triggers the control to call the API.  In concept `undefined` means that the api has not been called yet, and will tell the IWServerData control it needs to execute the API.  Initialize the state as `undefined` to have the IWServerData control automatically call the API on control load.  This control will **NEVER** call `setAPIEmployeeGetResponse(undefined)` from the setResponse property, which might put it into a continuous loop.
* `null` tells the server NOT to call the API.  In concept `null` means we do not have a valid employee loaded, but that the control should not be attempting to populate it from the API.  If IWServerData fails to connect to the server, or receives an error, it will call `setAPIEmployeeGetResponse(null)` from the setResponse property.  
* `{id: 1, name: 'Bob', start_date: '2020-01-01'} as API_Employee_Get_Response` (or any other API_Employee_Get_Response value) is the response back from the server, and since it is NOT `undefined` the server knows not to run the API again.  

#### `<ServerData/>`

Description of each of the properties:

`item` and `verb` are the items used to build the URL to the server.  The higher-order-component `<ServerData/>` will provide the base URL to the `<IWServerData/>` component for it to build the final URL with.  In this case, `<ServerData/>` will provide the "mysite" value, and `<IWServerData/>` will combine that with the item and verb to result in `https://mysite/Employee/Get`

`request` is the request object to be sent to the server.  **NOTE**: Unless the flag "noRefreshOnRequestChange = true" is set, a change to the `request` property will trigger a refresh with the server.  So, if you had a prop.id = 1, and then you passed this a prop.id = 2, the API will fire again and retrieve the new employee record.

`response` is the `TServerData<API_...>` value, that is either `undefined`, `null`, or some valid value.  **NOTE**: `undefined` here will tell this control to execute the API with the server.

`setResponse` is how this control tells your state to change based on the data received from the server.  It will only ever set this value to either `null` (on error) or some valid value from the server.  It will never set it to `undefined`.

#### `{!!apiEmployeeGetResponse && ()}`

Now for the fun part!  

If the server has NOT loaded any data yet apiEmpeloyeeGetResponse is undefined and none of the children will show.  

If the API failed apiEmployeeGetResponse is null and none of the children will show. 

However, if apiEmployeeGetResponse is populated, then the children will display.

Note: While apiEmpeloyeeGetResponse === undefined, an `<ActivityOverlayControl/>` spinner is shown, and wants to fill the current parent object, which should be set to 'position: relative' to display the spinner properly just within this control.  This feature can be turned off with the property `noActivityOverlay = true`.  Or, if you want to lock up the entire screen while this API is running you could turn on the `globalActivityOverlay = true` flag, which needs to be handled by the `<ServerData/>` higher-order-component.

### Other Optional Properties

`noActivityOverlay?: boolean`

If not set, the control will automatically show the `<ActivityOverlay/>` in its children area when processing an API.

`globalActivityOverlay?: boolean` 

Will tell higher-order-component to show the `<ActivityOverlay/>` control that covers the whole screen.  Setting this to true, will automatically hide the local `<ActivityOverlay/>`.

`responseMessage?: string`

Will show a temporary message box on the screen when the API completes successfully (not if failed) with whatever text is included.  For example: `responseMessage="Employee loaded!"` will open the `<MessageBox/>` control to show the user a brief message that the employee loaded.

`noRefreshOnRequestChange?: boolean`

If set to true, then the control will not re-run the API when the `request` value changes.  If not set, or set to false, the API will re-run based on a deep compare of the `request` object, regardless of the value of the `reponse` object.

`forceRefresh?: any`

If this value changes, the API will fire again, regardless of the value of the `reponse` object.

`startingAction?: () => void`

Always fires at the beginning of an API.

`failedAction?: (serverStatus: any) => void`

This method fires if the API received an error from the server.

`finallyAction?: () => void`

Always fires after the API is called, regardless of the success of the API.

`loadingReactNodes?: ReactNodeArray | ReactNode`

A control that would show in the children section while the API is running.

`failedReactNodes?: ReactNodeArray | ReactNode`

A control that would show if the response is blank (e.g. an error returned from the server).

`verboseConsole?: boolean`

Set this to true to have the control provide more console logs so you can see when certain activities are firing.

`superVerboseConsole?: boolean`

Shows what "verboseConsole" shows, plus even more.

## Scenario #2: Execute an API from a function

The next scenario handles the case where you want to call an API for the server to execute some process, like for instance updating the Employee record.  Consider the URL `https://mysite/Employee/Save`.

For this example, we are going to pass an object of changes we want to make to the server, and we expect to receive an object with the changes from the server back (although, in some cases this may just be an empty object if no data is needed from the server).

An example of how this could be coded would be as follows:

    interface Iemployee {
        id: number
        name: string
        start_date: string
    }

    interface API_Employee_Save_Request extends Iemployee {}

    interface API_Employee_Save_Response extends Iemployee {}

    export const MyControl = (props: IProps) => {
        const [employee, setEmployee] = useState({id: 1, name: 'Bob', start_date: '2020-01-01'} as Iemployee)
        const [serverDataUpdateProps, setServerDataUpdateProps] = useState(null as TServerDataUpdatedStateLocal<API_Employee_Save_Response, API_Employee_Save_Response>)
    	
    	const changeValue = (value: any, name?: string) => {
    	    if (!!name) {
                setEmployee((prevState) => ({
                    ...prevState,
                    [name]: value
                }))
    	    }
    	}
    	
    	const saveEmployee = () => {
    	    setServerDataUpdateProps({
                item: 'Employee',
                updateVerb: 'Save',
                updateRequest: employee,
                updateMessage: 'Saved!',
                updatedAction: (result) => {
                    setEmployee(result as Iemployee)
                }
            })
    	}
    	
    	return (
    	    <>
                <ServerData {...serverDataUpdateProps} setUpdateResponse={setServerDataUpdateProps} />
                <InputText value={employee.name} name="name" changeValue={changeValue} placeholder="Employee Name"/>
                <Button type="button" onClick={saveEmployee}>
                    Save
                </Button>
            </>
    	)
    }

Let's walk through each part of this:

#### `interface Iemployee`, `API_Employee_Save_(Request / Response) extends Iemployee {}`

These are the main interfaces defining the data we want to send back and forth to the server.

#### `const [employee, setEmployee]`

Track the state of the employee information in the control.  This will be used to send to the server to save.

#### `const [serverDataUpdateProps, setServerDataUpdateProps] = useState(null as TServerDataUpdatedStateLocal)`

**This is code you want to reuse!**

This is a state object with a special definition of properties that make it easy to set parameters for the API to call.

It starts in a null state, which means the API will not fire anything until you actually set values through the `setServerDataUpdateProps` function, which we'll see in a minute.

#### `const changeValue = (value: any, name?: string) => {}`

This method simply gets the values from the local input, and updates the state.

#### `saveEmployee` => `setServerDataUpdateProps`

Here's where the `serverDataUpdateProps` state is changed to tell `<ServerData/>` to perform the API call. 

Let's look at the properties being set:

`item` and `updateVerb` are used to build the API, similar to the `item` and `verb` properties in the previous section.  `updateVerb` and `verb` behave identically, but are separate for reasons discussed in the 3rd scenario.

`updateRequest` is the request json package being sent to the server.  In this example, we are passing in the updated employee information for the server to save to the database.

`updateMessage` is optional but displays a short message to the user telling them the API executed successfully.

`updatedAction` receives the results back from the server, and in this example updates the employee state in case any changes had happened on the server.

#### `<ServerData {...serverDataUpdateProps} setUpdateResponse={setServerDataUpdateProps} />`

**This is code you want to reuse!**

This is the control that actually runs the API.  It reads in the state of the `serverDataUpdateProps` which contains everything the control needs to execute the API.  However, it also sets the state of that control back to `null` when the API is completed in the `setUpdateResponse` property, telling it not to fire again.

For an example, please see the `IWServerDataHOCExample.tsx` file in the current directory.

Key functions to implement in the higher-order-component include:

`urlPrefix={`https://${process.env.REACT_APP_API_URL ?? ''}`}`

This will be consumed and have the item/verb appended to the end of it for the API action.

`startingAction()`  

Override this property to check if the `globalActivityOverlay` flag is set, and turn it on in the app.

`finallyAction()`

Override this property to check if the `globalActivityOverlay` flag is set, and turn it off in the app.

`showUserMessage(message: string, failed?: boolean)`

Override this property so that `<IWServerData/>` can pass back up a request to display some message to the user.

Other optional functions to implement include:

`authorizationHeader?: any`

Adds items to the header of the API request to the server.

`handleServerData?: (serverData: any) => boolean`

Provides the exact package returned by Axios in the response of the API.

`catchAction?: (err: AxiosError) => void`

Provides the exact Axios error in the event that the API throws an error.

`noCredentials?: boolean`

Turns off the Axios.withCredentials feature if needed.

## `<ServerData/>` Higher-Order-Component best practices


