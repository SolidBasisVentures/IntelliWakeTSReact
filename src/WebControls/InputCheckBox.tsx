import React, {useMemo} from 'react'
import {CustomInput} from 'reactstrap'
import {IInputSwitchProps} from './InputSwitch'

export function InputCheckBox<T>(props: IInputSwitchProps<T>) {
	const newID = useMemo(() => props.id ?? 'cb' + props.name + Math.floor(Math.random() * 100000 + 1), [
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
			props.changeValue(e.target.checked, e.target.name as any, (e.nativeEvent as any).shiftKey, (e.nativeEvent as any).ctrlKey, (e.nativeEvent as any).altKey)
		}
	}

	return (
		<CustomInput
			type="checkbox"
			label={props.label}
			name={props.name as string}
			className={'inputCheckbox ' + (props.className ?? '') + (props.plainText ? ' plainText' : '')}
			id={newID}
			hidden={props.hidden}
			checked={props.checked}
			onChange={!props.plainText ? handleInputChange : () => {}}
			disabled={props.plainText}
		/>
	)
}
