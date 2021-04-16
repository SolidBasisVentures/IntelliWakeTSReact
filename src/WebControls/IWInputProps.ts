import {InputProps} from 'reactstrap'
import React from 'react'
import {ElementCustomValue} from '../Functions'

export type TChangeValueFunction<T = unknown> = (
	value: any,
	name?: T extends object ? keyof T : string,
	shiftKey?: boolean,
	ctrlKey?: boolean,
	altKey?: boolean
) => void

export interface IIWInputProps<T = unknown> extends InputProps {
	plainText?: boolean
	plainTextURL?: string
	plainTextProps?: any
	changeValue?: TChangeValueFunction<T>
}

export const ReduceInputProps = (props: IIWInputProps | any): InputProps => {
	const subset = {...props}
	delete subset.plainText
	delete subset.plainTextURL
	delete subset.plainTextProps
	delete subset.changeValue
	delete subset.onChange

	return subset
}

export const HandleChangeValue = <T>(
	e: React.ChangeEvent<HTMLInputElement>,
	changeValue?: TChangeValueFunction<T>,
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
	isNumeric?: boolean
) => {
	if (!!changeValue) {
		changeValue(ElementCustomValue(e, isNumeric), e.target.name as any)
	}

	if (!!onChange) {
		onChange(e)
	}
}

//  onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}
