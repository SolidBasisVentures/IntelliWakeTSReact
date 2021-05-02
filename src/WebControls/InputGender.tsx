import React, {useMemo} from 'react'
import {InputSelect, IPropsSelect} from './InputSelect'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {InputWrapper} from './InputWrapper'

export function InputGender<T>(props: IIWInputProps<T>) {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)

		subset.value = subset.value ?? ''

		if (subset.autoComplete === undefined) {
			subset.autoComplete = 'off'
		}

		return subset as IPropsSelect
	}, [props])

	return (
		<InputWrapper {...ReduceToInputAddProps(props)} className="inputGender">
			<InputSelect {...inputProps} isStringOrNull>
				<option />
				<option value="Male">Male</option>
				<option value="Female">Female</option>
			</InputSelect>
		</InputWrapper>
	)
}
