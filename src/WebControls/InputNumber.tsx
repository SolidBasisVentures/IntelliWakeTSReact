import React, {useEffect, useState} from 'react'
import Cleave from 'cleave.js/react'
import {CleanNumber, RandomString, RoundTo, ToCurrency, ToDigits} from '@solidbasisventures/intelliwaketsfoundation'
import {TChangeValueFunction} from './IWInputProps'
import {CleaveOptions} from 'cleave.js/options'

export interface IPropsInputNumber {
	name?: string
	value: number | null
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
	htmlRef?: (ref: any) => void
	onKeyDown?: (e: React.KeyboardEvent) => void
	decimalScale?: number | null
	integerScale?: number | null
	allowNegative?: boolean
	lowerBound?: number
	upperBound?: number
	currency?: boolean
	required?: boolean
	placeholder?: string
	autoCompleteOn?: boolean
	autoFocus?: boolean
	className?: string
	style?: any
	id?: string
	hideZero?: boolean
	plainText?: boolean
	plainTextProps?: any
	invalid?: boolean
	changeValue?: TChangeValueFunction
}

export const InputNumber = (props: IPropsInputNumber) => {
	const [currentStringOverride, setCurrentStringOverride] = useState<string | undefined>(undefined)

	const handleKeyDown = (e: React.KeyboardEvent) => {
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let cleanNumber = CleanNumber(e.target.value ?? '')

		if (isNaN(cleanNumber)) {
			setCurrentStringOverride(e.target.value ?? '')
			;(e.target as any).customValue = 0
			if (!!props.onChange) {
				props.onChange(e)
			}
			if (!!props.changeValue) {
				props.changeValue((e.target as any).customValue, e.target.name)
			}
		} else {
			if (props.lowerBound !== undefined && cleanNumber < props.lowerBound) cleanNumber = props.lowerBound
			if (props.upperBound !== undefined && cleanNumber > props.upperBound) cleanNumber = props.upperBound
			cleanNumber = RoundTo(cleanNumber, props.decimalScale === undefined ? 2 : (props.decimalScale ?? 2))
			;(e.target as any).customValue = cleanNumber
			if (!!props.onChange) {
				props.onChange(e)
			}
			if (!!props.changeValue) {
				props.changeValue((e.target as any).customValue, e.target.name)
			}
			// setCurrentStringOverride(undefined)
		}
	}

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		e.target.select()
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
	
	useEffect(() => {
		const newVal = !props.value ? '' : (props.value ?? '').toString()
		setCurrentStringOverride(newVal)
	}, [props.value])

	return (
		<>
			{!!props.plainText ? (
				<div className="form-control-plaintext" {...props.plainTextProps}>
					{props.value !== null
						? !!props.currency
							? ToCurrency(props.value, props.decimalScale ?? 0)
							: ToDigits(props.value, props.decimalScale ?? 0)
						: null}
				</div>
			) : (
				<Cleave
					options={options}
					className={
						props.className +
						' inputNumber form-control ' +
						(hasDecimals ? 'numerics' : 'integers') +
						(!!props.invalid ? ' is-invalid' : '')
					}
					name={props.name}
					inputMode={hasDecimals ? 'decimal' : 'numeric'}
					
					value={currentStringOverride}
					onChange={handleInputChange}
					onBlur={props.onBlur}
					htmlRef={props.htmlRef}
					onKeyDown={handleKeyDown}
					onFocus={handleFocus}
					autoComplete={props.autoCompleteOn ? 'on' : `AC_${props.name ?? ''}_${RandomString(5)}`}
					placeholder={props.placeholder}
					required={props.required}
					autoFocus={props.autoFocus}
					style={props.style}
					id={props.id}
				/>
			)}
		</>
	)
}

// !== undefined
// 							? currentStringOverride
// 							: props.value === null || (!!props.hideZero && !CleanNumber(props.value))
// 							? undefined
// 							: props.value
//
