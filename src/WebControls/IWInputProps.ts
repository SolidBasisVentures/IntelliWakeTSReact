import {InputProps} from 'reactstrap'
import React, {ReactNode} from 'react'
import {ClassNames, ElementCustomValue, TClassNames} from '../Functions'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

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

export interface IIWInputProps<T = any, V = any> extends Omit<InputProps, 'value'>, IIWInputAddProps<T, V> {
	value?: V
}

export const ReduceInputProps = <T = any, V = any>(
	props: IIWInputProps<T, V> | any,
	classNameAdd?: string | string[] | TClassNames
): InputProps => {
	const subset = OmitProperty(
		props,
		'plainText',
		'plainTextURL',
		'plainTextProps',
		'changeValue',
		'changeValueLate',
		'autoCompleteOn',
		'append',
		'prepend'
	)

	if (!!classNameAdd) {
		if (typeof classNameAdd === 'string') {
			subset.className = `${subset.className ?? ''} ${classNameAdd}`.trim()
		} else if (Array.isArray(classNameAdd)) {
			subset.className = `${subset.className ?? ''} ${classNameAdd.join(' ')}`.trim()
		} else {
			subset.className = `${subset.className ?? ''} ${ClassNames(classNameAdd)}`.trim()
		}
	}

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
