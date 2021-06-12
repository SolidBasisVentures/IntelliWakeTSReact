import React from 'react'
import {Form} from 'react-bootstrap'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {InputWrapper} from './InputWrapper'

interface IProps<T = unknown> extends IIWInputProps<T> {}

export function InputState<T>(props: IProps<T>) {
	return (
		<InputWrapper
			{...ReduceToInputAddProps(props)}
			className="inputText inputState"
			transformToValid={(val) => val.toUpperCase()}>
			<Form.Control type="text" {...ReduceInputProps(props)} />
		</InputWrapper>
	)
}
