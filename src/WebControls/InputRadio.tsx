import React, {useMemo} from 'react'
import {Form} from 'react-bootstrap'
import {HandleChangeValue, TChangeValueFunction} from './IWInputProps'

interface IProps<T = unknown> {
	name?: T extends object ? keyof T : string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	checked: boolean
	value: any
	label: any
	className?: string
	id?: string
	plainText?: boolean
	changeValue?: TChangeValueFunction<T>
	onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
}

export function InputRadio<T>(props: IProps<T>) {
	const newID = useMemo(() => props.id ?? 'r' + props.name + Math.floor(Math.random() * 100000 + 1), [
		props.name,
		props.id
	])

	return !!props.plainText ? (
		props.checked ? (
			props.label
		) : null
	) : (
		<Form.Check
			type="radio"
			label={props.label}
			name={props.name as string}
			id={newID}
			className={'inputRadio ' + (props.className ?? '')}
			checked={props.checked}
			onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}
			value={props.value}
			onClick={props.onClick}
		/>
	)
}
