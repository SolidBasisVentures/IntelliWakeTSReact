import React, {useMemo} from 'react'
import {CleanNumber} from '@solidbasisventures/intelliwaketsfoundation'
import {IIWInputAddProps, IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {InputWrapper} from './InputWrapper'
import {Input, InputProps} from 'reactstrap'

export interface IPropsSelect<T = any, V = any> extends IIWInputProps<T, V> {
	innerRef?: (ref: any) => void
	children?: any
	isNumeric?: boolean
	isNumericOrNull?: boolean
	isStringOrNull?: boolean
	plainOnClick?: () => void
	required?: boolean
}

export function InputSelect<T>(props: IPropsSelect<T>) {
	const inputProps = useMemo<InputProps>(() => {
		const subset = {...ReduceInputProps(props)}

		delete subset.isNumeric
		delete subset.isNumericOrNull
		delete subset.isStringOrNull
		delete subset.plainOnClick

		return subset
	}, [props])

	const wrapperProps = useMemo<IIWInputAddProps>(() => {
		const subset = {...ReduceToInputAddProps(props)}

		delete subset.plainTextURL
		delete subset.plainText
		delete subset.plainTextProps

		return subset
	}, [props])

	return (
		<InputWrapper
			{...wrapperProps}
			className={'inputSelect' + (props.plainText ? ' disabledLink' : '')}
			transformToValid={(val) => {
				if (!!props.isNumeric || !!props.isNumericOrNull) {
					const value = CleanNumber(val)

					if (!!props.isNumericOrNull && value === 0) {
						return null
					} else {
						return value
					}
				} else if (!!props.isStringOrNull && !val) {
					return null
				}

				return val
			}}>
			<Input
				type="select"
				{...inputProps}
				style={{
					...props.style,
					pointerEvents: !!props.plainText ? 'none' : undefined
				}}>
				{props.children}
			</Input>
		</InputWrapper>
	)
}
