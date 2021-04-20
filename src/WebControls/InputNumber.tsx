import React, {ReactNode, useEffect, useState} from 'react'
import Cleave from 'cleave.js/react'
import {CleanNumber, RandomString, ToCurrency, ToDigits} from '@solidbasisventures/intelliwaketsfoundation'
import {TChangeValueFunction} from './IWInputProps'
import {CleaveOptions} from 'cleave.js/options'
import {InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'
import {ClassNames} from '../Functions'

export interface IPropsInputNumber<T = unknown> {
	name?: T extends object ? keyof T : string
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
	changeValue?: TChangeValueFunction<T>
	changeValueLate?: TChangeValueFunction<T>
	prepend?: ReactNode
	append?: ReactNode
}

export function InputNumber<T>(props: IPropsInputNumber<T>) {
	const [currentStringOverride, setCurrentStringOverride] = useState<string | undefined>(undefined)
	const [lateValue, setLateValue] = useState<number | null>(props.value)

	useEffect(() => setLateValue(props.value), [props.value])

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
				props.changeValue(
					(e.target as any).customValue,
					e.target.name as any,
					(e.nativeEvent as any).shiftKey,
					(e.nativeEvent as any).ctrlKey,
					(e.nativeEvent as any).altKey
				)
			}
		} else {
			if (props.lowerBound !== undefined && cleanNumber < props.lowerBound) cleanNumber = props.lowerBound
			if (props.upperBound !== undefined && cleanNumber > props.upperBound)
				cleanNumber = props.upperBound
				// cleanNumber = RoundTo(cleanNumber, props.decimalScale === undefined ? 2 : (props.decimalScale ?? 2))
				// if (props.decimalScale === 0) cleanNumber = CleanNumber(cleanNumber, 0)
				// if (props.decimalScale && props.decimalScale > 0) cleanNumber = CleanNumber(cleanNumber, props.decimalScale)
			;(e.target as any).customValue = cleanNumber
			if (!!props.onChange) {
				props.onChange(e)
			}
			if (!!props.changeValue) {
				props.changeValue(
					(e.target as any).customValue,
					e.target.name as any,
					(e.nativeEvent as any).shiftKey,
					(e.nativeEvent as any).ctrlKey,
					(e.nativeEvent as any).altKey
				)
			}
			setLateValue((e.target as any).customValue)
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

	const showCleave = (
		<Cleave
			options={options}
			className={ClassNames({
				'inputNumber form-control': true,
				numerics: hasDecimals,
				integers: !hasDecimals,
				is_invalid: !!props.invalid
			})}
			name={props.name as string | undefined}
			inputMode={hasDecimals ? 'decimal' : 'numeric'}
			value={currentStringOverride}
			onChange={handleInputChange}
			onBlur={(e) => {
				if (!!props.onBlur) props.onBlur(e)
				if (!!props.changeValueLate && lateValue !== props.value) {
					props.changeValueLate(
						lateValue,
						props.name,
						(e.nativeEvent as any).shiftKey,
						(e.nativeEvent as any).ctrlKey,
						(e.nativeEvent as any).altKey
					)
				}
			}}
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
	)

	return (
		<>
			{!!props.plainText ? (
				<div className="form-control-plaintext " {...props.plainTextProps}>
					{props.value !== null && !!props.currency ? (
						<>
							{props.prepend} {ToCurrency(props.value, props.decimalScale ?? 0)} {props.append}
						</>
					) : (
						<>
							{props.prepend} {ToDigits(props.value, props.decimalScale ?? 0)} {props.append}
						</>
					)}
				</div>
			) : !!props.prepend || !!props.append ? (
				<InputGroup>
					<InputGroupAddon addonType="prepend" hidden={!props.prepend}>
						<InputGroupText>{props.prepend}</InputGroupText>
					</InputGroupAddon>
					{showCleave}
					<InputGroupAddon addonType="append" hidden={!props.append}>
						<InputGroupText>{props.append}</InputGroupText>
					</InputGroupAddon>
				</InputGroup>
			) : (
				<>{showCleave}</>
			)}
		</>
	)
}

// !== undefined
//              ? currentStringOverride
//              : props.value === null || (!!props.hideZero && !CleanNumber(props.value))
//              ? undefined
//              : props.value
//
