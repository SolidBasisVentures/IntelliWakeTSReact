import React from 'react'
import Cleave from 'cleave.js/react'
import {CleanNumber} from '@solidbasisventures/intelliwaketsfoundation'
import {IIWInputProps, ReduceToInputAddProps} from './IWInputProps'
import {CleaveOptions} from 'cleave.js/options'
import {ClassNames} from '../Functions'
import {InputWrapper} from './InputWrapper'

export interface IPropsInputNumber<T = unknown> extends Omit<IIWInputProps<T>, 'value'> {
	value: number | null
	htmlRef?: (ref: any) => void
	decimalScale?: number | null
	integerScale?: number | null
	allowNegative?: boolean
	lowerBound?: number
	upperBound?: number
	currency?: boolean
	required?: boolean
	hideZero?: boolean
}

export function InputNumber<T>(props: IPropsInputNumber<T>) {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === '-') {
			if (!(props.lowerBound !== undefined && props.lowerBound < 0)) {
				if (!props.allowNegative || (props.lowerBound !== undefined && props.lowerBound >= 0)) {
					e.preventDefault()
				}
			}
		}

		if (e.key === '.' && props.decimalScale === 0) {
			e.preventDefault()
		}

		if (!!props.onKeyDown) props.onKeyDown(e)
	}

	let options: CleaveOptions = {
		numeral: true,
		numeralThousandsGroupStyle: 'thousand'
	}

	if (!!props.decimalScale) options.numeralDecimalScale = props.decimalScale
	if (!!props.integerScale) options.numeralIntegerScale = props.integerScale
	if (!!props.currency) {
		options.prefix = '$ '
		options.numeralDecimalScale = props.decimalScale === undefined ? 2 : props.decimalScale ?? undefined
	}

	const hasDecimals = (props.decimalScale ?? 0) > 0

	return (
		<InputWrapper
			{...ReduceToInputAddProps(props)}
			inputIsValid={(val) => !isNaN(CleanNumber(val))}
			valueOnInvalid={() => 0}
			transformToValid={(val) => {
				const cleanNumber = CleanNumber(val)
				if (props.lowerBound !== undefined && cleanNumber < props.lowerBound) return props.lowerBound
				if (props.upperBound !== undefined && cleanNumber > props.upperBound) return props.upperBound
				return cleanNumber
			}}>
			<Cleave
				options={options}
				className={ClassNames({
					'inputNumber form-control': true,
					numerics: hasDecimals,
					integers: !hasDecimals
				})}
				htmlRef={props.htmlRef}
				inputMode={hasDecimals ? 'decimal' : 'numeric'}
				onKeyDown={handleKeyDown}
			/>
		</InputWrapper>
	)
}
