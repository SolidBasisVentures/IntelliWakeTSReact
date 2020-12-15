import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Input} from 'reactstrap'
import {IIWInputProps, ReduceInputProps} from './IWInputProps'
import {
	MomentDateString,
	MomentDisplayDayDate,
	MomentDisplayDayDateTime,
	MomentTimeString, RandomString
} from '@solidbasisventures/intelliwaketsfoundation'

interface IProps extends IIWInputProps {
	showTime?: boolean
	autoCompleteOn?: boolean
}

const originalValue = ' '

export const InputDate = (props: IProps) => {
	const lastDateValue = useRef(originalValue)
	const nextDateValue = useRef(originalValue)
	const [overrideValue, setOverrideValue] = useState(originalValue)

	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)
		delete subset.value
		delete subset.onChange

		return subset
	}, [props])

	useEffect(() => {
		if (![lastDateValue.current, nextDateValue.current].includes(MomentDateString(props.value as string) ?? '')) {
			lastDateValue.current = MomentDateString((props.value ?? '') as string) ?? ''
			nextDateValue.current = lastDateValue.current
			setOverrideValue(lastDateValue.current)
		} else {
			lastDateValue.current = MomentDateString((props.value ?? '') as string) ?? ''
		}
	}, [props.value])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		nextDateValue.current = MomentDateString(e.target.value) ?? ''

		setOverrideValue(e.target.value)

		const customValue = (nextDateValue.current + ' ' + (MomentTimeString(props.value as string) ?? '')).trim()

		if (!!props.onChange) {
			;(e.target as any).customValue = customValue

			props.onChange(e)
		}

		if (!!props.changeValue) {
			props.changeValue(customValue, e.target.name)
		}
	}

	return (
		<>
			{!!props.plainText ? (
				<div className="form-control-plaintext" {...props.plainTextProps}>
					{!!props.showTime && !!MomentTimeString(props.value as string)
						? MomentDisplayDayDateTime(props.value as string)
						: MomentDisplayDayDate(props.value as string)}
				</div>
			) : (
				<Input
					type="date"
					className="inputDate"
					{...inputProps}
					value={overrideValue ?? ''}
					onChange={handleInputChange}
					autoComplete={props.autoCompleteOn ? 'on' : `AC_${props.name ?? ''}_${RandomString(5)}`}
				/>
			)}
		</>
	)
}
