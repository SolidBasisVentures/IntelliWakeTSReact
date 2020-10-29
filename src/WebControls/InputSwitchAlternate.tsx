import React, {useMemo} from 'react'
import {CustomInput} from 'reactstrap'

interface IInputSwitchAlternateProps {
	name?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	value: string | number | boolean
	label: any
	valuesOnOff?: [string | number | boolean, string | number | boolean]
	className?: string
	id?: string
	plainText?: boolean
	changeValue?: (value: any, name?: string) => void
}

export const InputSwitchAlternate = (props: IInputSwitchAlternateProps) => {
	const newID = useMemo(() => props.id ?? 'sw' + props.name + Math.floor(Math.random() * 100000 + 1), [
		props.name,
		props.id
	])

	const valuesOnOff = props.valuesOnOff ?? [1, 0]

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = (e.target.checked ? valuesOnOff[0] : valuesOnOff[1]).toString()
		;(e.target as any).customValue = e.target.checked ? valuesOnOff[0] : valuesOnOff[1]

		if (!!props.onChange) props.onChange(e)

		if (!!props.changeValue) props.changeValue((e.target as any).customValue, e.target.name)
	}

	return (
		<CustomInput
			type="switch"
			label={props.label}
			name={props.name}
			className={'inputSwitch ' + (props.className ?? '') + (props.plainText ? ' plainText' : '')}
			id={newID}
			checked={props.value === valuesOnOff[0]}
			onChange={!props.plainText ? handleInputChange : () => {}}
		/>
	)
}
