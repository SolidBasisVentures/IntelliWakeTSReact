import React, {useMemo} from 'react'
import {CustomInput} from 'reactstrap'
import {TChangeValueFunction} from './IWInputProps'

export interface IInputSwitchProps {
	name?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	checked: boolean
	label: any
	className?: string
	id?: string
	plainText?: boolean
	changeValue?: TChangeValueFunction
	hidden?: boolean
}

export const InputSwitch = (props: IInputSwitchProps) => {
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
			props.changeValue(e.target.checked, e.target.name)
		}
	}

	return (
		<CustomInput
			type="switch"
			label={props.label}
			name={props.name}
			className={'inputSwitch cursor-pointer ' + (props.className ?? '') + (props.plainText ? ' plainText' : '')}
			id={newID}
			hidden={props.hidden}
			checked={props.checked}
			onChange={!props.plainText ? handleInputChange : () => {}}
			disabled={props.plainText}
		/>
	)
}
