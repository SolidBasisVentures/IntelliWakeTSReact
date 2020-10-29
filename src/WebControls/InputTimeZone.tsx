import React, {useMemo} from 'react'
import {Link} from 'react-router-dom'
import {InputSelect, IPropsSelect} from './InputSelect'
import moment from 'moment-timezone'
import {IIWInputProps, reduceInputProps} from './IWInputProps'

export const InputTimeZone = (props: IIWInputProps) => {
	const inputProps = useMemo(() => {
		const subset = reduceInputProps(props)

		subset.value = subset.value ?? ''

		if (subset.autoComplete === undefined) {
			subset.autoComplete = 'off'
		}

		return subset as IPropsSelect
	}, [props])

	const timeZonesList = moment.tz.zonesForCountry('US')

	return (
		<>
			{!!props.plainText ? (
				!!props.plainTextURL ? (
					<Link to={props.plainTextURL}>
						<div className="form-control-plaintext" {...props.plainTextProps}>
							{props.value}
						</div>
					</Link>
				) : (
					<div className="form-control-plaintext" {...props.plainTextProps}>
						{props.value}
					</div>
				)
			) : (
				<>
					<InputSelect {...inputProps} isStringOrNull>
						<option />
						{timeZonesList.map((tzItem) => (
							<option key={tzItem} value={tzItem}>
								TZ: {tzItem}
							</option>
						))}
						{!!props.value && !timeZonesList.includes(props.value as string) && (
							<option value={props.value}>{props.value}</option>
						)}
					</InputSelect>
				</>
			)}
		</>
	)
}
