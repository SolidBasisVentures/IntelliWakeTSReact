import React, {useMemo} from 'react'
import {Link} from 'react-router-dom'
import {InputSelect, IPropsSelect} from './InputSelect'
import moment from 'moment-timezone'
import {IIWInputProps, ReduceInputProps} from './IWInputProps'

export const InputTimeZone = (props: IIWInputProps) => {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)

		subset.value = subset.value ?? ''

		if (subset.autoComplete === undefined) {
			subset.autoComplete = 'off'
		}

		return subset as IPropsSelect
	}, [props])

	interface ITZItem {zone: string, olson: string}
	
	const timeZonesList: ITZItem[] = useMemo(() => {
		const tzItems = moment.tz.zonesForCountry('US')
			
			let results = tzItems.map(tzItem => ({zone: moment.tz(tzItem).zoneAbbr(), olson: tzItem}))
		
		if (!!props.value && !tzItems.includes(props.value as string)) {
			results.push({zone: '', olson: props.value as string})
		}
		
		return results
	}, [])
	
	const valueTZ = useMemo(() => !props.value ? '' : moment.tz(props.value as string).zoneAbbr(), [props.value])

	return (
		<>
			{!!props.plainText ? (
				!!props.plainTextURL ? (
					<Link to={props.plainTextURL}>
						<div className="form-control-plaintext" {...props.plainTextProps}>
							{valueTZ}:
							<span className="text-muted"> {props.value}</span>
						</div>
					</Link>
				) : (
					<div className="form-control-plaintext" {...props.plainTextProps}>
						{valueTZ}:
						<span className="text-muted"> {props.value}</span>
					</div>
				)
			) : (
				<>
					<InputSelect {...inputProps} isStringOrNull>
						<option />
						{timeZonesList.map((tzItem) => (
							<option key={tzItem.olson} value={tzItem.olson}>
								{tzItem.zone}: {tzItem.olson}
							</option>
						))}
					</InputSelect>
				</>
			)}
		</>
	)
}
