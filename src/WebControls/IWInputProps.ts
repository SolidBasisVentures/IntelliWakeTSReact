import {FormControlProps} from 'react-bootstrap'
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
	plainOnClick?: () => void
	changeValue?: TChangeValueFunction<T, V>
	changeValueLate?: TChangeValueFunction<T, V>
	autoCompleteOn?: boolean
	prepend?: ReactNode
	append?: ReactNode
}

export interface IIWInputProps<T = any, V = any> extends Omit<FormControlProps, 'value'>, IIWInputAddProps<T, V> {
	value?: V
	style?: any
	name?: string
	invalid?: boolean
	required?: boolean
	onFocus?: any
	inputIsValid?: any
	onBlur?: any
	valueOnInvalid?: any
	placeholder?: string
	onKeyDown?: any
	autoComplete?: string
	autoFocus?: boolean
}

export const ReduceInputProps = <T = any, V = any>(props: IIWInputProps<T, V> | any): any => {
	const subset = {...props, value: props.value as any}
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
