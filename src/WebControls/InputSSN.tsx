import React, {useMemo} from 'react'
import {Input} from 'reactstrap'
import {Link} from 'react-router-dom'
import {HandleChangeValue, IIWInputProps, ReduceInputProps} from './IWInputProps'
import {RandomString} from '@solidbasisventures/intelliwaketsfoundation'

interface IProps<T = unknown> extends IIWInputProps<T> {
	plainTextLast4Only?: boolean
	autoCompleteOn?: boolean
}

export function InputSSN<T>(props: IProps<T>) {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)
		delete subset.plainTextLast4Only

		if (subset.autoComplete === undefined) {
			subset.autoComplete = 'off'
		}

		return subset
	}, [props])

	return (
		<>
			{!!props.plainText ? (
				!!props.plainTextURL ? (
					<Link to={props.plainTextURL}>
						<div className="form-control-plaintext" {...props.plainTextProps}>
							{!!props.plainTextLast4Only ? '...-' + (props.value ?? '').toString().substr(-4) : props.value}
						</div>
					</Link>
				) : (
					<div className="form-control-plaintext" {...props.plainTextProps}>
						{!!props.plainTextLast4Only ? '...-' + (props.value ?? '').toString().substr(-4) : props.value}
					</div>
				)
			) : (
				<Input
					type="text"
					className="inputText"
					{...inputProps}
					pattern="\d{3}-?\d{2}-?\d{4}"
					onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}
					autoComplete={props.autoCompleteOn ? 'on' : `AC_${props.name ?? ''}_${RandomString(5)}`}
				/>
			)}
		</>
	)
}
