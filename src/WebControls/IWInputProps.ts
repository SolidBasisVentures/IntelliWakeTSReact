import {InputProps} from 'reactstrap'
import React, {ReactNode} from 'react'
import {ElementCustomValue} from '../Functions'

export type TChangeValueFunction<T = unknown> = (
	value: any,
	name?: T extends object ? keyof T : string,
	shiftKey?: boolean,
	ctrlKey?: boolean,
	altKey?: boolean
) => void

export interface IIWInputAddProps<T = unknown> {
	plainText?: boolean
	plainTextURL?: string
	plainTextProps?: any
	changeValue?: TChangeValueFunction<T>
	changeValueLate?: TChangeValueFunction<T>
	autoCompleteOn?: boolean
	prepend?: ReactNode
	append?: ReactNode
}

export interface IIWInputProps<T = unknown> extends InputProps, IIWInputAddProps<T> {}

export const ReduceInputProps = (props: IIWInputProps | any): InputProps => {
	const subset = {...props}
	delete subset.plainText
	delete subset.plainTextURL
	delete subset.plainTextProps
	delete subset.changeValue
	delete subset.changeValueLate
	delete subset.autoCompleteOn
	delete subset.append
	delete subset.prepend
	// delete subset.onChange

	return subset
}

export const ReduceToInputAddProps = (props: IIWInputProps | any): IIWInputAddProps => {
	return {
		plainText: props.plainText,
		plainTextURL: props.plainTextURL,
		plainTextProps: props.plainTextProps,
		changeValue: props.changeValue,
		changeValueLate: props.changeValueLate,
		autoCompleteOn: props.autoCompleteOn,
		prepend: props.prepend,
		append: props.append
	}
}

export const HandleChangeValue = <T>(
	e: React.ChangeEvent<HTMLInputElement>,
	changeValue?: TChangeValueFunction<T>,
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
	if (!!changeValue) {
		changeValue(ElementCustomValue(e), e.target.name as any)
	}

	if (!!onChange) {
		onChange(e)
	}
}

//  onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}
