import {InputProps} from 'reactstrap'
import React from 'react'
import {ElementCustomValue} from '../Functions'

export type TChangeValueFunction<T = any> = (value: any, name?: T extends object ? keyof T : string) => void

export interface IIWInputProps<T = any> extends InputProps {
	plainText?: boolean
	plainTextURL?: string
	plainTextProps?: any
	changeValue?: TChangeValueFunction<T>
}

export const ReduceInputProps = (props: IIWInputProps): InputProps => {
	const subset = {...props}
	delete subset.plainText
	delete subset.plainTextURL
	delete subset.plainTextProps
	delete subset.changeValue
	delete subset.onChange

	return subset
}

export const HandleChangeValue = (
	e: React.ChangeEvent<HTMLInputElement>,
	changeValue?: (value: any, name: string) => void,
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
	if (!!changeValue) {
		changeValue(ElementCustomValue(e), e.target.name)
	}

	if (!!onChange) {
		onChange(e)
	}
}

//  onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}
