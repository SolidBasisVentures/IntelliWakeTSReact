import React, {useMemo} from 'react'
import {Link} from 'react-router-dom'
import {HandleChangeValue, IIWInputProps, ReduceInputProps} from './IWInputProps'
import {Form} from 'react-bootstrap'

export function InputColor<T>(props: IIWInputProps<T>) {
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
							<input
								type="color"
								className={'form-control inputText ' + props.className ?? ''}
								{...inputProps}
								disabled
							/>
							{props.value}
						</div>
					</Link>
				) : (
					<div className="form-control-plaintext" {...props.plainTextProps}>
						<Form.Control
							type="color"
							className={'form-control inputText ' + props.className ?? ''}
							{...inputProps}
							disabled
						/>
						{props.value}
					</div>
				)
			) : (
				<input
					type="color"
					className={'form-control inputText ' + props.className ?? ''}
					{...inputProps}
					onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}
				/>
			)}
		</>
	)
}
