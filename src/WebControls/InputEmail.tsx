import React, {useMemo} from 'react'
import {Input} from 'reactstrap'
import {HandleChangeValue, IIWInputProps, ReduceInputProps} from './IWInputProps'
import {RandomString} from '@solidbasisventures/intelliwaketsfoundation'

interface IProps<T = unknown> extends IIWInputProps<T> {
	autoCompleteOn?: boolean
}

export function InputEmail<T>(props: IProps<T>) {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)

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
					onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}
					autoComplete={props.autoCompleteOn ? 'on' : `AC_${props.name ?? ''}_${RandomString(5)}`}
				/>
			)}
		</>
	)
}
