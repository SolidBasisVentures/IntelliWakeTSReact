import React from 'react'
import {Input} from 'reactstrap'
import {ElementCustomValue} from '../Functions'
import {Link} from 'react-router-dom'
import {CleanNumber} from '@solidbasisventures/intelliwaketsfoundation'
import {TChangeValueFunction} from './IWInputProps'

export interface IPropsSelect {
	name?: string
	value: string | number
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
	onKeyDown?: (e: React.KeyboardEvent) => void
	innerRef?: (ref: any) => void
	className?: string
	style?: any
	children?: any
	isNumeric?: boolean
	isNumericOrNull?: boolean
	isStringOrNull?: boolean
	id?: string
	plainText?: boolean
	plainTextURL?: string
	plainOnClick?: () => void
	invalid?: boolean
	changeValue?: TChangeValueFunction
}

export const InputSelect = (props: IPropsSelect) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!!props.isNumeric || !!props.isNumericOrNull) {
			const value = CleanNumber(e.target.value)

			if (!!props.isNumericOrNull && value === 0) {
				;(e.target as any).customValue = null
			} else {
				;(e.target as any).customValue = value
			}
		} else if (!!props.isStringOrNull && !e.target.value) {
			;(e.target as any).customValue = null
		}

		if (!!props.onChange) props.onChange(e)
		if (!!props.changeValue) props.changeValue(ElementCustomValue(e), e.target.name)
	}

	return !!props.plainText && !!props.plainTextURL ? (
		<Link to={props.plainTextURL}>
			<Input
				type="select"
				name={props.name}
				value={props.value}
				onChange={() => {}}
				innerRef={props.innerRef}
				className={'inputSelect disabledLink ' + props.className}
				style={{
					...props.style,
					pointerEvents: 'none'
				}}
				id={props.id}
				invalid={props.invalid}>
				{props.children}
			</Input>
		</Link>
	) : !!props.plainText && !!props.plainOnClick ? (
		<div onClick={props.plainOnClick} className="cursor-pointer">
			<Input
				type="select"
				name={props.name}
				value={props.value}
				onChange={() => {}}
				innerRef={props.innerRef}
				className={'inputSelect disabledLink ' + props.className}
				style={{
					...props.style,
					pointerEvents: 'none'
				}}
				id={props.id}
				invalid={props.invalid}>
				{props.children}
			</Input>
		</div>
	) : (
		<Input
			type="select"
			name={props.name}
			value={props.value}
			onChange={handleInputChange}
			onBlur={props.onBlur}
			onKeyDown={props.onKeyDown}
			innerRef={props.innerRef}
			className={'inputSelect ' + props.className}
			style={props.style}
			id={props.id}
			disabled={!!props.plainText}
			invalid={props.invalid}>
			{props.children}
		</Input>
	)
}
