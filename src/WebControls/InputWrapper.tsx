import React, {ReactElement, ReactNode, useEffect, useRef, useState} from 'react'
import {IIWInputAddProps, IIWInputProps, ReduceInputProps} from './IWInputProps'
import {InputGroupWrapper} from './InputGroupWrapper'
import {RandomString} from '@solidbasisventures/intelliwaketsfoundation'
import {AppendPrependWrapper} from './AppendPrependWrapper'
import {Link} from 'react-router-dom'

interface IProps<T = any, V = any> extends IIWInputAddProps<T, V> {
	children: ReactElement<IIWInputProps<T, V>>
	className?: string
	inputIsValid?: (value: any) => boolean
	valueOnInvalid?: (value: any) => any
	transformToValid?: (value: any) => any
	doNotSelectOnFocus?: boolean
	plainTextControl?: ReactNode
	lateDelayMS?: number
}

export const InputWrapper = <T, V>(props: IProps<T, V>) => {
	const isMounted = useRef(false)
	const lateTrigger = useRef(setTimeout(() => {}, 100))
	const lateValue = useRef<V | undefined>(undefined)
	const [currentStringOverride, setCurrentStringOverride] = useState<string>('')

	useEffect(() => {
		isMounted.current = true

		return () => {
			isMounted.current = false
		}
	})

	useEffect(() => {
		const newVal = !props.children.props.value ? '' : props.children.props.value ?? ''
		lateValue.current = undefined
		setCurrentStringOverride((newVal as any).toString())
	}, [props.children.props.value])

	return (
		<>
			{props.plainText ? (
				!!props.plainTextURL ? (
					<Link to={props.plainTextURL}>
						<div className="form-control-plaintext " {...props.plainTextProps}>
							<AppendPrependWrapper append={props.append} prepend={props.prepend}>
								{props.plainTextControl ?? props.children.props.value}
							</AppendPrependWrapper>
						</div>
					</Link>
				) : (
					<div
						className={'form-control-plaintext' + (!!props.plainOnClick ? ' cursor-pointer' : '')}
						{...props.plainTextProps}
						onClick={() => {
							if (!!props.plainOnClick) props.plainOnClick()
						}}>
						<AppendPrependWrapper append={props.append} prepend={props.prepend}>
							{props.plainTextControl ?? props.children.props.value}
						</AppendPrependWrapper>
					</div>
				)
			) : (
				<InputGroupWrapper append={props.append} prepend={props.prepend}>
					{React.cloneElement<any>(
						props.children,
						ReduceInputProps({
							...props.children.props,
							className: (
								(props.children.props.className ?? '') +
								' ' +
								(props.className ?? '') +
								(props.children.props.invalid ? ' is_invalid' : '') +
								(props.children.props.required ? ' is-required' : '')
							).trim(),
							onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
								if (!props.doNotSelectOnFocus && !!e.target.select) e.target.select()
								if (props.children.props.onFocus) props.children.props.onFocus(e)
							},
							onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
								clearTimeout(lateTrigger.current)
								if (
									!!props.changeValueLate &&
									lateValue.current !== undefined &&
									lateValue.current !== ((props.children.props.value as unknown) as V)
								) {
									props.changeValueLate(
										lateValue.current,
										e.target.name as any,
										(e.nativeEvent as any).shiftKey,
										(e.nativeEvent as any).ctrlKey,
										(e.nativeEvent as any).altKey
									)
									lateValue.current = undefined
								}
								if (props.children.props.onBlur) props.children.props.onBlur(e)
							},
							onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
								clearTimeout(lateTrigger.current)

								if (!props.children.props.plainText && !props.children.props.disabled) {
									const isValid =
										!props.children.props.inputIsValid || props.children.props.inputIsValid(e.target.value)
									if (!isValid) {
										setCurrentStringOverride(e.target.value ?? '')
									}

									let customValue = (!isValid
										? !!props.children.props.valueOnInvalid
											? props.children.props.valueOnInvalid(e.target.value)
											: ''
										: ((!props.transformToValid ? e.target.value : props.transformToValid(e.target.value)) as any)) as V

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
										if (isValid) {
											lateValue.current = customValue
										}
										lateTrigger.current = setTimeout(() => {
											if (!!props.changeValueLate && isMounted.current && lateValue.current !== undefined) {
												props.changeValueLate(lateValue.current, name, shiftKey, ctrlKey, altKey)
												lateValue.current = undefined
											}
										}, props.lateDelayMS ?? 500)
									}
								}
							},
							autoComplete: props.autoCompleteOn ? 'on' : `AC_${props.children.props.name ?? ''}_${RandomString(5)}`,
							value: (currentStringOverride ?? '') as any
						})
					)}
				</InputGroupWrapper>
			)}
		</>
	)
}
