import React from 'react'
import {Input} from 'reactstrap'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {InputWrapper} from './InputWrapper'

interface IProps<T = unknown> extends IIWInputProps<T> {}

export function InputPassword<T>(props: IProps<T>) {
	return (
		<InputWrapper {...ReduceToInputAddProps(props)} className="inputPassword">
			<Input type="password" {...ReduceInputProps(props)} placeholder={props.placeholder ?? '******'} />
		</InputWrapper>
	)
}
