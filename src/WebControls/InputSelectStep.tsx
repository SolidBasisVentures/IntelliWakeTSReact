import React, {ReactNode, useMemo} from 'react'
import {TChangeValueFunction} from './IWInputProps'

export interface IOption {
	key: any
	description: ReactNode
}

export const OptionsActive = [
	{key: true, description: 'Active'},
	{key: false, description: 'Inactive'}
]

export const OptionsActiveAll = [...OptionsActive, {key: null, description: 'All'}]

interface IProps<T = unknown> {
	className?: string
	borderless?: boolean
	inline?: boolean
	color?: string
	options: IOption[]
	value: any
	name?: T extends object ? keyof T : string
	changeValue?: TChangeValueFunction<T>
	plainText?: boolean
}

/**
 * A input select that lets you update a state when selecting an option.
 */
export const InputSelectStep = (props: IProps) => {
	let classNames = !!props.inline
		? 'd-inline-block outline-none '
		: 'form-control ' + (!!props.borderless ? ' bg-transparent border-0 ' : '')
	if (!props.plainText) {
		classNames += 'cursor-pointer '
		if (!!props.inline)
			classNames += ' hoverUnderline ' + (props.color === '' ? '' : `text-${props.color ?? 'primary'} `)
	}

	classNames += ' ' + props.className ?? ''

	const currentOptionIDX = useMemo(() => props.options.findIndex((option) => option.key === props.value), [
		props.options,
		props.value
	])

	const click = () => {
		let newValue = props.options.find(() => true)?.key

		if (currentOptionIDX < props.options.length - 1 && currentOptionIDX >= 0) {
			newValue = props.options[currentOptionIDX + 1].key
		}

		if (!!props.changeValue) props.changeValue(newValue, props.name)
	}

	return (
		<div className={classNames} onClick={click} onKeyPress={click} tabIndex={0}>
			{props.options[currentOptionIDX]?.description ?? ''}
		</div>
	)
}
