import React, {useMemo} from 'react'
import {Input} from 'reactstrap'
import {IIWInputProps, ReduceInputProps} from './IWInputProps'
import {ViewEmail} from './ViewEmail'
import {InputWrapper} from './InputWrapper'

interface IProps<T = any, V = any> extends IIWInputProps<T, V> {
	autoCompleteOn?: boolean
	plainTextLabel?: string | null
}

export function InputEmail<T = any, V = any>(props: IProps<T, V>) {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)
		delete subset.plaintext

		if (subset.autoComplete === undefined) {
			subset.autoComplete = 'off'
		}

		return subset
	}, [props])

	return (
		<>
			{!!props.plainText ? (
				!!props.value && (
					<div className="form-control-plaintext" {...props.plainTextProps}>
						<ViewEmail email={props.value as any} label={props.plainTextLabel} />
					</div>
				)
			) : (
				<InputWrapper {...ReduceInputProps(props)} className="inputEmail">
					<Input type="email" inputMode="email" {...inputProps} />
				</InputWrapper>
			)}
		</>
	)
}
