import React from 'react'
import {Form} from 'react-bootstrap'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {InputWrapper} from './InputWrapper'

interface IProps<T = unknown> extends IIWInputProps<T> {}

export function InputPassword<T>(props: IProps<T>) {
	return (
		<InputWrapper {...ReduceToInputAddProps(props)} className="inputPassword">
			<Form.Control type="password" {...ReduceInputProps(props)} placeholder={props.placeholder ?? '******'} />
		</InputWrapper>
	)
}
