import React, {useMemo} from 'react'
import {Link} from 'react-router-dom'
import {InputSelect, IPropsSelect} from './InputSelect'
import {HandleChangeValue, IIWInputProps, ReduceInputProps} from './IWInputProps'

export const InputGender = (props: IIWInputProps) => {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)

		subset.value = subset.value ?? ''

		if (subset.autoComplete === undefined) {
			subset.autoComplete = 'off'
		}

		return subset as IPropsSelect
	}, [props])

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
					<InputSelect
						{...inputProps}
						isStringOrNull
						onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}>
						<option />
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</InputSelect>
				</>
			)}
		</>
	)
}
