import React, {useMemo} from 'react'
import {Form} from 'react-bootstrap'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {FormatZip} from '@solidbasisventures/intelliwaketsfoundation'
import {InputWrapper} from './InputWrapper'

export interface IZipProps<T = unknown> extends IIWInputProps<T> {
	withNine?: boolean
}

export function InputZip<T>(props: IZipProps<T>) {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)

		delete subset.withNine

		return subset
	}, [props])

	return (
		<InputWrapper
			{...ReduceToInputAddProps(props)}
			className="inputZip"
			plainTextControl={FormatZip((props.value ?? '').toString())}>
			<Form.Control type="text" {...inputProps} />
		</InputWrapper>
	)
}
