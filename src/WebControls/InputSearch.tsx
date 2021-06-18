import React, {ReactNode, useEffect, useRef, useState} from 'react'
import {Input, InputGroup, InputGroupText, InputProps} from 'reactstrap'
import {RandomString} from '@solidbasisventures/intelliwaketsfoundation'
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/pro-regular-svg-icons'
import {InputType} from 'reactstrap/lib/Input'

export interface IPropsInputSearch {
	initialValue?: string
	triggerSearchText: (value: string) => void
	triggerDelayAmount?: number
	triggerOnEnter?: boolean
	innerRef?: any
	className?: string
	style?: any
	placeholder?: string
	id?: string
	bordered?: boolean
	iconPrefix?: boolean | FontAwesomeIconProps
	reactPrefix?: ReactNode
	inputGroupClass?: string
	size?: 'lg' | 'sm'
	autoFocus?: boolean
	onKeyDown?: (e: React.KeyboardEvent) => void
	onFocus?: (e: React.FocusEvent) => void
	noSelectOnFocus?: boolean
	autoCompleteOn?: boolean
}

/**
 * A search input with an option to have a trigger delay or not.
 */
export const InputSearch = (props: IPropsInputSearch) => {
	const inputRef = useRef<HTMLInputElement | null>()
	const triggeredText = useRef(props.initialValue ?? '')
	const searchTimeout = useRef(setTimeout(() => {}, 100))
	const [currentText, setCurrentText] = useState('')

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value ?? ''
		setCurrentText(value)

		if (!!props.triggerDelayAmount) {
			clearTimeout(searchTimeout.current)
			searchTimeout.current = setTimeout(() => {
				triggerChange(value)
			}, props.triggerDelayAmount)
		} else if (!props.triggerOnEnter) {
			props.triggerSearchText(value)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			clearTimeout(searchTimeout.current)
			triggerChange(currentText, true)
		}

		if (!!props.onKeyDown) {
			props.onKeyDown(e)
		}
	}

	const handleOnBlur = () => {
		clearTimeout(searchTimeout.current)
		triggerChange()
	}

	const triggerChange = (searchText?: string, force?: boolean) => {
		const textToSearch = searchText ?? currentText

		if (!!force || textToSearch !== triggeredText.current) {
			triggeredText.current = textToSearch
			props.triggerSearchText(textToSearch)
		}
	}

	useEffect(() => {
		setCurrentText(props.initialValue ?? '')
	}, [props.initialValue])

	const handleOnFocus = (e: any) => {
		if (!!props.onFocus) {
			props.onFocus(e)
		}

		if (!props.noSelectOnFocus) {
			setTimeout(() => {
				if (!!inputRef?.current) {
					inputRef.current.select()
				}
			}, 250)
		}
	}

	const inputProps: InputProps = {
		type: 'search' as InputType,
		inputMode: 'search',
		className: `inputSearch ${props.className ?? ''} ${!!props.bordered ? '' : 'bg-transparent border-0'}`,
		value: currentText,
		onChange: handleInputChange,
		onBlur: handleOnBlur,
		// innerRef: props.innerRef,
		innerRef: (ref: any) => {
			if (!!props.innerRef) {
				console.log(typeof props.innerRef)
				if (typeof props.innerRef === 'function') {
					props.innerRef(ref)
				}
			}

			inputRef.current = ref
		},
		bsSize: props.size,
		style: props.style,
		placeholder: props.placeholder,
		onKeyDown: handleKeyDown,
		id: props.id,
		autoFocus: props.autoFocus,
		onFocus: handleOnFocus,
		autoComplete: props.autoCompleteOn ? 'on' : `AC_${RandomString(12)}`
	}

	return !!props.iconPrefix || !!props.reactPrefix ? (
		<InputGroup className={`searchGroup ${props.inputGroupClass ?? ''} ${props.bordered ? '' : 'transparent'}`}>
			{(!!props.iconPrefix || !!props.reactPrefix) && (
				<InputGroupText
					onClick={() => {
						if (!!props.innerRef.current) props.innerRef.current.focus()
					}}>
					{props.iconPrefix !== undefined ? (
						typeof props.iconPrefix === 'boolean' ? (
							<FontAwesomeIcon icon={faSearch} />
						) : (
							<FontAwesomeIcon {...props.iconPrefix} />
						)
					) : (
						props.reactPrefix
					)}
				</InputGroupText>
			)}
			<Input {...inputProps} />
		</InputGroup>
	) : (
		<Input {...inputProps} />
	)
}
