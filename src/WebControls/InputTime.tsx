import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Input} from 'reactstrap'
import {
	MOMENT_FORMAT_TIME_NO_SECONDS,
	MOMENT_FORMAT_TIME_SECONDS,
	MomentDateString,
	MomentDisplayTime,
	MomentTimeString
} from '../Functions'
import {IIWInputProps, reduceInputProps} from './IWInputProps'

interface IProps extends IIWInputProps {
	includeDate?: boolean
	editSeconds?: boolean
}

const originalValue = ' '

export const InputTime = (props: IProps) => {
	const lastTimeValue = useRef(originalValue)
	const nextTimeValue = useRef(originalValue)
	const [overrideValue, setOverrideValue] = useState(originalValue)

	const inputProps = useMemo(() => {
		const subset = reduceInputProps(props)
		delete subset.value
		delete subset.onChange
		delete subset.editSeconds

		return subset
	}, [props])

	useEffect(() => {
		if (![lastTimeValue.current, nextTimeValue.current].includes(MomentTimeString(props.value as string) ?? '')) {
			lastTimeValue.current = MomentTimeString((props.value ?? '') as string) ?? ''
			nextTimeValue.current = lastTimeValue.current
			setOverrideValue(
				MomentTimeString(
					lastTimeValue.current,
					!!props.editSeconds ? MOMENT_FORMAT_TIME_SECONDS : MOMENT_FORMAT_TIME_NO_SECONDS
				) ?? ''
			)
		} else {
			lastTimeValue.current = MomentTimeString((props.value ?? '') as string) ?? ''
		}
	}, [props.value, props.editSeconds])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		nextTimeValue.current = MomentTimeString(e.target.value) ?? ''

		setOverrideValue(e.target.value)

		const customValue = ((MomentDateString(props.value as string) ?? '') + ' ' + nextTimeValue.current).trim()

		if (!!props.onChange) {
			;(e.target as any).customValue = customValue

			props.onChange(e)
		}

		if (!!props.changeValue) props.changeValue(customValue, e.target.name)
	}

	return (
		<>
			{!!props.plainText ? (
				<div className="form-control-plaintext" {...props.plainTextProps}>
					{MomentDisplayTime(props.value as string)}
				</div>
			) : (
				<Input
					type="time"
					className="inputTime"
					{...inputProps}
					value={overrideValue}
					onChange={handleInputChange}
					step={!!props.editSeconds ? 1 : 60}
				/>
			)}
		</>
	)
}
