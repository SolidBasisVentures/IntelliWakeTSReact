import React, {useMemo} from 'react'
import {Input} from 'reactstrap'
import {handleChangeValue, IIWInputProps, reduceInputProps} from './IWInputProps'

export const InputUrl = (props: IIWInputProps) => {
	const inputProps = useMemo(() => {
		const subset = reduceInputProps(props)
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
					onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}
				/>
			)}
		</>
	)
}
