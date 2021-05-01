import {InputProps} from 'reactstrap'
import React, {ReactNode} from 'react'
import {ElementCustomValue} from '../Functions'

export type TChangeValueFunction<T = any, V = any> = (
	value: V,
	name?: T extends object ? keyof T : string,
	shiftKey?: boolean,
	ctrlKey?: boolean,
	altKey?: boolean
) => void

export interface IIWInputAddProps<T = any, V = any> {
	plainText?: boolean
	plainTextURL?: string
	plainTextProps?: any
	changeValue?: TChangeValueFunction<T, V>
	changeValueLate?: TChangeValueFunction<T, V>
	autoCompleteOn?: boolean
	prepend?: ReactNode
	append?: ReactNode
}

export interface IIWInputProps<T = any, V = any> extends InputProps, IIWInputAddProps<T, V> {}

export const ReduceInputProps = <T = any, V = any>(props: IIWInputProps<T, V> | any): InputProps => {
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

export const ReduceToInputAddProps = <T = any, V = any>(props: IIWInputProps<T, V> | any): IIWInputAddProps<T, V> => {
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

export const HandleChangeValue = <T = any, V = any>(
	e: React.ChangeEvent<HTMLInputElement>,
	changeValue?: TChangeValueFunction<T, V>,
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
	if (!!changeValue) {
		changeValue(ElementCustomValue(e) as V, e.target.name as any)
	}

	if (!!onChange) {
		onChange(e)
	}
}

//  onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}
