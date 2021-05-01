import React, {ReactElement, ReactNode, useEffect, useRef, useState} from 'react'
import {IIWInputAddProps, IIWInputProps, ReduceInputProps} from './IWInputProps'
import {InputGroupWrapper} from './InputGroupWrapper'
import {RandomString} from '@solidbasisventures/intelliwaketsfoundation'
import {AppendPrependWrapper} from './AppendPrependWrapper'

interface IProps<T> extends IIWInputAddProps<T> {
	children: ReactElement<IIWInputProps<T>>
	className?: string
	inputIsValid?: (value: any) => boolean
	valueOnInvalid?: (value: any) => any
	transformToValid?: (value: any) => any
	doNotSelectOnFocus?: boolean
	plainTextControl?: ReactNode
	lateDelayMS?: number
}

export const InputWrapper = <T,>(props: IProps<T>) => {
	const isMounted = useRef(false)
	const lateTrigger = useRef(setTimeout(() => {}, 100))
	const [lateValue, setLateValue] = useState<any>(props.children.props.value)
	const [currentStringOverride, setCurrentStringOverride] = useState<any>(undefined)

	useEffect(() => {
		isMounted.current = true

		return () => {
			isMounted.current = false
		}
	})

	useEffect(() => setLateValue(props.children.props.value), [props.children.props.value])

	useEffect(() => {
		const newVal = !props.children.props.value ? '' : (props.children.props.value ?? '').toString()
		setCurrentStringOverride(newVal)
	}, [props.children.props.value])

	return (
		<>
			{props.plainText ? (
				<div className="form-control-plaintext " {...props.plainTextProps}>
					<AppendPrependWrapper append={props.append} prepend={props.prepend}>
						{props.plainTextControl ?? props.children.props.value}
					</AppendPrependWrapper>
				</div>
			) : (
				<InputGroupWrapper append={props.append} prepend={props.prepend}>
					{React.cloneElement(
						props.children,
						ReduceInputProps({
							className: (
								(props.children.props.className ?? '') +
								' ' +
								(props.className ?? '') +
								(props.children.props.invalid ? ' is_invalid' : '')
							).trim(),
							onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
								if (!props.doNotSelectOnFocus && !!e.target.select) e.target.select()
								if (props.children.props.onFocus) props.children.props.onFocus(e)
							},
							onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
								if (!!props.changeValueLate && lateValue !== props.children.props.value) {
									clearTimeout(lateTrigger.current)
									props.changeValueLate(
										lateValue,
										e.target.name as any,
										(e.nativeEvent as any).shiftKey,
										(e.nativeEvent as any).ctrlKey,
										(e.nativeEvent as any).altKey
									)
								}
								if (props.children.props.onBlur) props.children.props.onBlur(e)
							},
							onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
								clearTimeout(lateTrigger.current)

								const isValid = !props.children.props.inputIsValid || props.children.props.inputIsValid(e.target.value)
								if (!isValid) {
									setCurrentStringOverride(e.target.value ?? '')
								}

								let customValue = !isValid
									? !!props.children.props.valueOnInvalid
										? props.children.props.valueOnInvalid(e.target.value)
										: ''
									: ((!props.transformToValid ? e.target.value : props.transformToValid(e.target.value)) as any)

								;(e.target as any).customValue = customValue

								const name = e.target.name as any
								const shiftKey = (e.nativeEvent as any).shiftKey
								const ctrlKey = (e.nativeEvent as any).ctrlKey
								const altKey = (e.nativeEvent as any).altKey

								if (!!props.children.props.onChange) {
									props.children.props.onChange(e)
								}
								if (!!props.changeValue) {
									props.changeValue(customValue, name, shiftKey, ctrlKey, altKey)
								}
								if (!!props.changeValueLate) {
									lateTrigger.current = setTimeout(() => {
										if (!!props.changeValueLate && isMounted.current) {
											props.changeValueLate(customValue, name, shiftKey, ctrlKey, altKey)
										}
									}, props.lateDelayMS ?? 500)
								}
								if (isValid) {
									setLateValue(customValue)
								}
							},
							autoComplete: props.autoCompleteOn ? 'on' : `AC_${props.children.props.name ?? ''}_${RandomString(5)}`,
							value: currentStringOverride
						})
					)}
				</InputGroupWrapper>
			)}
		</>
	)
}
