import React, {useMemo} from 'react'
import {Link} from 'react-router-dom'
import {InputSelect, IPropsSelect} from './InputSelect'
import {HandleChangeValue, IIWInputProps, ReduceInputProps} from './IWInputProps'
import {IANAZoneAbbr, TimeZoneOlsons} from '@solidbasisventures/intelliwaketsfoundation'

export const InputTimeZone = (props: IIWInputProps) => {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)

		subset.value = subset.value ?? ''

		if (subset.autoComplete === undefined) {
			subset.autoComplete = 'off'
		}

		return subset as IPropsSelect
	}, [props])

	const timeZonesList = useMemo(() => {
		let tzItems = TimeZoneOlsons()

		if (!!props.value && !tzItems.map((tzItem) => tzItem.olson).includes(props.value as string)) {
			tzItems.push({zone: '', olson: props.value as string, hours: ''})
		}

		return tzItems
	}, [])

	const valueTZ = useMemo(() => (!props.value ? '' : IANAZoneAbbr(props.value as string)), [props.value])

	return (
		<>
			{!!props.plainText ? (
				!!props.plainTextURL ? (
					<Link to={props.plainTextURL}>
						<div className="form-control-plaintext" {...props.plainTextProps}>
							{!!props.value ? (
								<>
									{valueTZ}:<span className="text-muted"> {props.value}</span>
								</>
							) : (
								<span className="text-danger">No Timezone set</span>
							)}
						</div>
					</Link>
				) : (
					<div className="form-control-plaintext" {...props.plainTextProps}>
						{!!props.value ? (
							<>
								{valueTZ}:<span className="text-muted"> {props.value}</span>
							</>
						) : (
							<span className="text-danger">No Timezone set</span>
						)}
					</div>
				)
			) : (
				<>
					<InputSelect
						{...inputProps}
						isStringOrNull
						onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}>
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
