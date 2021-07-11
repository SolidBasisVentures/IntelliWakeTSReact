import React, {useMemo} from 'react'
import {CleanNumber} from '@solidbasisventures/intelliwaketsfoundation'
import {
	IIWInputAddProps,
	IIWInputProps,
	ILegacyInputProps,
	ReduceInputProps,
	ReduceToInputAddProps
} from './IWInputProps'
import {InputWrapper} from './InputWrapper'

export interface IPropsSelect<T = any, V = any, H = HTMLSelectElement> extends IIWInputProps<T, V, H> {
	innerRef?: (ref: any) => void
	children?: any
	isNumeric?: boolean
	isNumericOrNull?: boolean
	isStringOrNull?: boolean
	plainOnClick?: () => void
	multiple?: boolean
	required?: boolean
}

export function InputSelect<T, V>(props: IPropsSelect<T, V>) {
	const inputProps = useMemo<ILegacyInputProps>(() => {
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
			transformToValid={(val, e) => {
				if (!!props.multiple) {
					if (!!props.isNumeric) {
						return (Array.from(e.target.children) as HTMLOptionElement[])
							.filter((child) => child.selected)
							.map((child) => CleanNumber(child.value))
					} else {
						return (Array.from(e.target.children) as HTMLOptionElement[])
							.filter((child) => child.selected)
							.map((child) => child.value)
					}
				} else if (!!props.isNumeric || !!props.isNumericOrNull) {
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
			}}
			internalStateValue={(val, e) => {
				if (!!props.multiple) {
					if (!!props.isNumeric) {
						return (Array.from(e.target.children) as HTMLOptionElement[])
							.filter((child) => child.selected)
							.map((child) => CleanNumber(child.value))
					} else {
						return (Array.from(e.target.children) as HTMLOptionElement[])
							.filter((child) => child.selected)
							.map((child) => child.value)
					}
				}

				return val
			}}>
			<select
				{...inputProps}
				value={inputProps.value ?? ''}
				style={{
					...props.style,
					pointerEvents: !!props.plainText ? 'none' : undefined
				}}
				tabIndex={!!props.plainText ? -1 : undefined}>
				{props.children}
			</select>
		</InputWrapper>
	)
}
