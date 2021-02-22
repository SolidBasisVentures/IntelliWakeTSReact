import React, {useMemo} from 'react'
import {Input} from 'reactstrap'
import {HandleChangeValue, IIWInputProps, ReduceInputProps} from './IWInputProps'
import {RandomString} from '@solidbasisventures/intelliwaketsfoundation'

interface IProps<T = unknown> extends IIWInputProps<T> {
	autoCompleteOn?: boolean
}

export function InputUrl<T>(props: IProps<T>) {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)
		delete subset.plainText
		delete subset.plainTextProps
		delete subset.onChange

		return subset
	}, [props])

	const href: string = useMemo(() => {
		if (!('' + props.value).toString().toLowerCase().startsWith('http')) {
			return 'http://' + props.value
		}

		return '' + props.value
	}, [props.value])

	return (
		<>
			{!!props.plainText ? (
				!!props.value ? (
					<div className="form-control-plaintext ellipses-truncate" {...props.plainTextProps}>
						<a href={href} target="_blank" rel="noopener noreferrer">
							{props.value}
						</a>
					</div>
				) : null
			) : (
				<Input
					type="url"
					pattern="https://.*"
					inputMode="url"
					className="inputUrl"
					{...inputProps}
					onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}
					autoComplete={props.autoCompleteOn ? 'on' : `AC_${props.name ?? ''}_${RandomString(5)}`}
				/>
			)}
		</>
	)
}
