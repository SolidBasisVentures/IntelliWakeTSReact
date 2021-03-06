import React, {useMemo} from 'react'
import {Input} from 'reactstrap'
import {Link} from 'react-router-dom'
import {IIWInputProps, ReduceInputProps} from './IWInputProps'
import {RandomString} from '@solidbasisventures/intelliwaketsfoundation'

interface IProps<T = unknown> extends IIWInputProps<T> {
	autoCompleteOn?: boolean
}

export function InputState<T>(props: IProps<T>) {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)
		delete subset.onChange

		if (subset.autoComplete === undefined) {
			subset.autoComplete = 'off'
		}

		return subset
	}, [props])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!!props.onChange) {
			;(e.target as any).customValue = e.target.value.toUpperCase()

			props.onChange(e)
		}

		if (!!props.changeValue) {
			props.changeValue(e.target.value.toUpperCase(), e.target.name as any, (e.nativeEvent as any).shiftKey, (e.nativeEvent as any).ctrlKey, (e.nativeEvent as any).altKey)
		}
	}

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
				<Input type="text" className="inputText" {...inputProps} onChange={handleInputChange}
							 autoComplete={props.autoCompleteOn ? 'on' : `AC_${props.name ?? ''}_${RandomString(5)}`}/>
			)}
		</>
	)
}
