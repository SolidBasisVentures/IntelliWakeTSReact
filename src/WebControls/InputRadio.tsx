import React, {useMemo} from 'react'
import {CustomInput} from 'reactstrap'
import {HandleChangeValue, TChangeValueFunction} from './IWInputProps'

interface IProps {
	name?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	checked: boolean
	value: any
	label: any
	className?: string
	id?: string
	plainText?: boolean
	changeValue?: TChangeValueFunction
}

export const InputRadio = (props: IProps) => {
	const newID = useMemo(() => props.id ?? 'r' + props.name + Math.floor(Math.random() * 100000 + 1), [
		props.name,
		props.id
	])

	return !!props.plainText ? (
		props.checked ? (
			props.label
		) : null
	) : (
		<CustomInput
			type="radio"
			label={props.label}
			name={props.name}
			id={newID}
			className={'inputRadio ' + (props.className ?? '')}
			checked={props.checked}
			onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}
			value={props.value}
		/>
	)
}
