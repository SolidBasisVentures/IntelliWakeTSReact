import {InputProps} from 'reactstrap'
import React from 'react'
import {ElementCustomValue} from '../Functions'

export type TChangeValueFunction = (value: any, name?: string) => void

export interface IIWInputProps extends InputProps {
	plainText?: boolean
	plainTextURL?: string
	plainTextProps?: any
	changeValue?: TChangeValueFunction
}

export const reduceInputProps = (props: IIWInputProps): InputProps => {
	const subset = {...props}
	delete subset.plainText
	delete subset.plainTextURL
	delete subset.plainTextProps
	delete subset.changeValue
	delete subset.onChange

	return subset
}

export const handleChangeValue = (
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
