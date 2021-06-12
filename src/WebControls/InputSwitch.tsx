import React, {useMemo} from 'react'
import {Form} from 'react-bootstrap'
import {TChangeValueFunction} from './IWInputProps'

export interface IInputSwitchProps<T = unknown> {
	name?: T extends object ? keyof T : string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	checked: boolean
	label: any
	className?: string
	id?: string
	plainText?: boolean
	changeValue?: TChangeValueFunction<T>
	onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
	hidden?: boolean
}

export function InputSwitch<T>(props: IInputSwitchProps<T>) {
	const newID = useMemo(() => props.id ?? 'sw' + props.name + Math.floor(Math.random() * 100000 + 1), [
		props.name,
		props.id
	])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.checked.toString()
		;(e.target as any).customValue = e.target.checked

		if (!!props.onChange) {
			props.onChange(e)
		}

		if (!!props.changeValue) {
			props.changeValue(
				e.target.checked,
				e.target.name as any,
				(e.nativeEvent as any).shiftKey,
				(e.nativeEvent as any).ctrlKey,
				(e.nativeEvent as any).altKey
			)
		}
	}

	return (
		<Form.Check
			type="switch"
			label={props.label}
			name={props.name as string}
			className={'inputSwitch cursor-pointer ' + (props.className ?? '') + (props.plainText ? ' plainText' : '')}
			id={newID}
			hidden={props.hidden}
			checked={props.checked}
			onChange={!props.plainText ? handleInputChange : () => {}}
			disabled={props.plainText}
			onClick={props.onClick}
		/>
	)
}
