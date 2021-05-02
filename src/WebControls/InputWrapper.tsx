import React, {ReactElement, ReactNode, useEffect, useRef, useState} from 'react'
import {IIWInputAddProps, IIWInputProps, ReduceInputProps} from './IWInputProps'
import {InputGroupWrapper} from './InputGroupWrapper'
import {RandomString} from '@solidbasisventures/intelliwaketsfoundation'
import {AppendPrependWrapper} from './AppendPrependWrapper'
import {Link} from 'react-router-dom'
import {InputProps} from 'reactstrap'

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

	interface IState {
		name?: T extends object ? keyof T : string
		value: V
		shiftKey: boolean
		ctrlKey: boolean
		altKey: boolean
	}

	const lateState = useRef<IState | undefined>(undefined)

	const [internalState, setInternalState] = useState<InputProps['value'] | undefined>(
		props.children.props.value as InputProps['value'] | undefined
	)
	const isManagingDirtyState = useRef(false)

	useEffect(() => {
		isMounted.current = true

		return () => {
			isMounted.current = false
		}
	})

	useEffect(() => {
		lateState.current = undefined
		if (!isManagingDirtyState.current && internalState !== props.children.props.value) {
			setInternalState(props.children.props.value as any)
		}
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
									lateState.current !== undefined &&
									lateState.current.value !== props.children.props.value
								) {
									props.changeValueLate(
										lateState.current.value,
										lateState.current.name,
										lateState.current.shiftKey,
										lateState.current.ctrlKey,
										lateState.current.altKey
									)
									lateState.current = undefined
								}
								if (props.children.props.onBlur) props.children.props.onBlur(e)
							},
							onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
								clearTimeout(lateTrigger.current)

								if (!props.children.props.plainText && !props.children.props.disabled) {
									const isValid =
										!props.children.props.inputIsValid || props.children.props.inputIsValid(e.target.value)

									isManagingDirtyState.current = isValid

									let customValue = (!isValid
										? !!props.children.props.valueOnInvalid
											? props.children.props.valueOnInvalid(e.target.value)
											: ''
										: ((!props.transformToValid ? e.target.value : props.transformToValid(e.target.value)) as any)) as V

									;(e.target as any).customValue = customValue

									const newState: IState = {
										value: customValue,
										name: e.target.name as any,
										shiftKey: (e.nativeEvent as any).shiftKey,
										ctrlKey: (e.nativeEvent as any).ctrlKey,
										altKey: (e.nativeEvent as any).altKey
									}

									if (!!props.children.props.onChange) {
										props.children.props.onChange(e)
									}
									if (!!props.changeValue) {
										props.changeValue(
											newState.value,
											newState.name,
											newState.shiftKey,
											newState.ctrlKey,
											newState.altKey
										)
									}
									if (!!props.changeValueLate) {
										if (isValid) {
											lateState.current = newState
										}
										lateTrigger.current = setTimeout(() => {
											if (
												!!props.changeValueLate &&
												isMounted.current &&
												lateState.current !== undefined &&
												lateState.current.value !== props.children.props.value
											) {
												props.changeValueLate(
													lateState.current.value,
													lateState.current.name,
													lateState.current.shiftKey,
													lateState.current.ctrlKey,
													lateState.current.altKey
												)
												lateState.current = undefined
											}
										}, props.lateDelayMS ?? 500)
										if (!props.children.props.onChange && !props.changeValue && !props.changeValueLate) {
											setInternalState(e.target.value)
										}
									} else {
										setInternalState(e.target.value)
									}
								}
							},
							autoComplete: props.autoCompleteOn ? 'on' : `AC_${props.children.props.name ?? ''}_${RandomString(5)}`,
							value: internalState
						})
					)}
				</InputGroupWrapper>
			)}
		</>
	)
}
