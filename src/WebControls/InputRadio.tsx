import React from 'react'
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
	return !!props.plainText ? (
		props.checked ? (
			props.label
		) : null
	) : (
		<label className="cursor-pointer">
			<input
				type="radio"
				value={props.value}
				checked={props.checked}
				className={'inputRadio ' + (props.className ?? '')}
				name={props.name as string}
				onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}
				onClick={props.onClick}
			/>{' '}
			{props.label}
		</label>
	)
}
