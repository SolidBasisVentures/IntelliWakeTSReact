import React, {useMemo} from 'react'
import {Input} from 'reactstrap'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {CleanScripts, ReplaceLinks} from '@solidbasisventures/intelliwaketsfoundation'
import {InputWrapper} from './InputWrapper'

interface IProps<T = unknown> extends IIWInputProps<T> {
	bordered?: boolean
	rows?: number
}

export function InputTextArea<T>(props: IProps<T>) {
	const inputProps = useMemo(() => {
		let subset = ReduceInputProps(props)
		delete subset.bordered

		subset.value = props.value ?? ''

		return subset
	}, [props])

	return (
		<>
			<InputWrapper
				doNotSelectOnFocus
				{...ReduceToInputAddProps(props)}
				className="inputTextArea"
				plainTextControl={
					<div
						className={'form-control-plaintext vertical-scroll horizontal-scroll' + (!!props.bordered ? ' border' : '')}
						{...props.plainTextProps}
						dangerouslySetInnerHTML={{__html: ReplaceLinks(CleanScripts('' + props.value))}}
						style={{
							maxHeight: !!props.rows ? props.rows + 'em' : '5em',
							overflowY: 'scroll'
						}}
					/>
				}>
				<Input type="textarea" {...inputProps} />
			</InputWrapper>
		</>
	)
}
