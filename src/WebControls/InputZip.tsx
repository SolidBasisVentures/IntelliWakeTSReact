import React, {useMemo} from 'react'
import {Input} from 'reactstrap'
import {FormatZip} from '../Functions'
import {IIWInputProps, reduceInputProps, handleChangeValue} from './IWInputProps'

export interface IZipProps extends IIWInputProps {
	withNine?: boolean
}

export const InputZip = (props: IZipProps) => {
	const inputProps = useMemo(() => {
		return reduceInputProps(props)
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
					onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}
				/>
			)}
		</>
	)
}
