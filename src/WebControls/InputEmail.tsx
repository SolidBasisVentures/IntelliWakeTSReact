import React, {useMemo} from 'react'
import {Input} from 'reactstrap'
import {handleChangeValue, IIWInputProps, reduceInputProps} from './IWInputProps'

export const InputEmail = (props: IIWInputProps) => {
	const inputProps = useMemo(() => {
		const subset = reduceInputProps(props)

		if (subset.autoComplete === undefined) {
			subset.autoComplete = 'off'
		}

		return subset
	}, [props])

	return (
		<>
			{!!props.plainText ? (
				!!props.value ? (
					<div className="form-control-plaintext" {...props.plainTextProps}>
						<a href={'mailto:' + props.value}>{props.value}</a>
					</div>
				) : null
			) : (
				<Input
					type="email"
					inputMode="email"
					className="inputEmail"
					{...inputProps}
					onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}
				/>
			)}
		</>
	)
}
