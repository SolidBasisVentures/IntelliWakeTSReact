import React, {useMemo} from 'react'
import {Form} from 'react-bootstrap'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {InputWrapper} from './InputWrapper'
import {EllipsesTruncate} from './EllipsesTruncate'

interface IProps<T = unknown> extends IIWInputProps<T> {}

export function InputUrl<T>(props: IProps<T>) {
	const href: string = useMemo(() => {
		if (!('' + props.value).toString().toLowerCase().startsWith('http')) {
			return 'http://' + props.value
		}

		return '' + props.value
	}, [props.value])

	return (
		<>
			<InputWrapper
				{...ReduceToInputAddProps(props)}
				className="inputUrl"
				plainTextControl={
					<a href={href} target="_blank" rel="noopener noreferrer" className="d-block w-100">
						<EllipsesTruncate text={props.value} />
					</a>
				}>
				<Form.Control
					type="url"
					pattern="https://.*"
					inputMode="url"
					className="inputText"
					{...ReduceInputProps(props)}
				/>
			</InputWrapper>
		</>
	)
}
