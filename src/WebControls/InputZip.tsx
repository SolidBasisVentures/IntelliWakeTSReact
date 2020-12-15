import React, {useMemo} from 'react'
import {Input} from 'reactstrap'
import {IIWInputProps, ReduceInputProps, HandleChangeValue} from './IWInputProps'
import {FormatZip, RandomString} from '@solidbasisventures/intelliwaketsfoundation'

export interface IZipProps extends IIWInputProps {
	withNine?: boolean
	autoCompleteOn?: boolean
}


export const InputZip = (props: IZipProps) => {
	const inputProps = useMemo(() => {
		return ReduceInputProps(props)
	}, [props])

	//pattern={!!props.withNine ? 'd{5}-?d{4}' : 'd{5}'}

	return (
		<>
			{!!props.plainText ? (
				<div className="form-control-plaintext" {...props.plainTextProps}>
					{FormatZip((props.value ?? '').toString())}
				</div>
			) : (
				<Input
					type="text"
					className="inputZip"
					{...inputProps}
					onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}
					autoComplete={props.autoCompleteOn ? 'on' : `AC_${props.name ?? ''}_${RandomString(5)}`}
				/>
			)}
		</>
	)
}
