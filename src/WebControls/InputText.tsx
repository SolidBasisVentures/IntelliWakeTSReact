import React, {useMemo} from 'react'
import {Input} from 'reactstrap'
import {Link} from 'react-router-dom'
import {handleChangeValue, IIWInputProps, reduceInputProps} from './IWInputProps'

export const InputText = (props: IIWInputProps) => {
	const inputProps = useMemo(() => {
		const subset = reduceInputProps(props)
		delete subset.className
		delete subset.onChange

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
							{props.value}
						</div>
					</Link>
				) : (
					<div className="form-control-plaintext" {...props.plainTextProps}>
						{props.value}
					</div>
				)
			) : (
				<Input
					type="text"
					className={'inputText ' + props.className ?? ''}
					{...inputProps}
					onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}
				/>
			)}
		</>
	)
}
