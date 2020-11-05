import React from 'react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import {
	MOMENT_FORMAT_DATE, MomentDateString,
	MomentDisplayDayDate,
	MomentDisplayDayDateTime, MomentTimeString
} from '@solidbasisventures/intelliwaketsfoundation'
import {TChangeValueFunction} from './IWInputProps'

interface IProps {
	value: string
	name?: string
	placeholder?: string
	plainText?: boolean
	plainTextURL?: string
	plainTextProps?: any
	changeValue?: TChangeValueFunction
	showTime?: boolean
	noTodayButton?: boolean
}

export const InputDatePicker = (props: IProps) => {
	const setValue = (date: Date | [Date, Date] | /* for selectsRange */ null) => {
		if (!!props.changeValue) {
			if (!date) {
				props.changeValue(MomentTimeString(props.value ?? ''), props.name)
			} else {
				if (!Array.isArray(date)) {
					const dateValueString = moment(date).format(MOMENT_FORMAT_DATE)

					const timeValueString = MomentTimeString(props.value ?? '') ?? ''

					props.changeValue(`${dateValueString} ${timeValueString}`.trim(), props.name)
				}
			}
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
				<ReactDatePicker
					value={MomentDateString(props.value ?? '') ?? ''}
					onChange={setValue}
					className="form-control inputDate"
					placeholderText={props.placeholder}
					todayButton={!props.noTodayButton ? 'Today' : undefined}
				/>
			)}
		</>
	)
}
