import React, {useMemo} from 'react'
import {Input} from 'reactstrap'
import {handleChangeValue, IIWInputProps, reduceInputProps} from './IWInputProps'
import {CleanScripts, ReplaceLinks} from '@solidbasisventures/intelliwaketsfoundation'

interface IProps extends IIWInputProps {
	bordered?: boolean
	rows?: number
}

export const InputTextArea = (props: IProps) => {
	const inputProps = useMemo(() => {
		const subset = reduceInputProps(props)
		delete subset.plainText
		delete subset.plainTextProps
		delete subset.bordered
		delete subset.onChange

		return subset
	}, [props])

	return (
		<>
			{!!props.plainText ? (
				<div
					className={'form-control-plaintext vertical-scroll horizontal-scroll' + (!!props.bordered ? ' border' : '')}
					{...props.plainTextProps}
					dangerouslySetInnerHTML={{__html: ReplaceLinks(CleanScripts('' + props.value))}}
					style={{
						maxHeight: !!props.rows ? props.rows + 'rem' : '5rem',
						overflowY: 'scroll'
					}}
				/>
			) : (
				<Input
					type="textarea"
					className="inputTextArea"
					{...inputProps}
					onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}
				/>
			)}
		</>
	)
}
