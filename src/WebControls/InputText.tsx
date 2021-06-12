import React from 'react'
import {Input} from 'reactstrap'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {InputWrapper} from './InputWrapper'

interface IProps<T = unknown> extends IIWInputProps<T> {}

export function InputText<T>(props: IProps<T>) {
	return (
		<InputWrapper {...ReduceToInputAddProps(props)} className="inputText">
			<Input type="text" {...ReduceInputProps(props)} />
		</InputWrapper>
	)
}
