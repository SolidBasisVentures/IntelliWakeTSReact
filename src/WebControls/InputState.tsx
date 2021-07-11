import React from 'react'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {InputWrapper} from './InputWrapper'

interface IProps<T = unknown> extends IIWInputProps<T> {}

export function InputState<T>(props: IProps<T>) {
	return (
		<InputWrapper
			{...ReduceToInputAddProps(props)}
			className="inputText inputState"
			transformToValid={(val) => val.toUpperCase()}>
			<input type="text" {...ReduceInputProps(props, 'form-control')} />
		</InputWrapper>
	)
}
