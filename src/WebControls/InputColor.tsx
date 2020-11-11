import React, {useMemo} from 'react'
import {Input} from 'reactstrap'
import {Link} from 'react-router-dom'
import {HandleChangeValue, IIWInputProps, ReduceInputProps} from './IWInputProps'

export const InputColor = (props: IIWInputProps) => {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)
		delete subset.className

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
							<Input type="color" className={'inputText ' + props.className ?? ''} {...inputProps} disabled />
							{props.value}
						</div>
					</Link>
				) : (
					<div className="form-control-plaintext" {...props.plainTextProps}>
						<Input type="color" className={'inputText ' + props.className ?? ''} {...inputProps} disabled />
						{props.value}
					</div>
				)
			) : (
				<Input
					type="color"
					className={'inputText ' + props.className ?? ''}
					{...inputProps}
					onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}
				/>
			)}
		</>
	)
}
