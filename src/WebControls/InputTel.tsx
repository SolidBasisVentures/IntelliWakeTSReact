import React, {useMemo} from 'react'
import {Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhone} from '@fortawesome/pro-regular-svg-icons'
import {HandleChangeValue, IIWInputProps, ReduceInputProps, TChangeValueFunction} from './IWInputProps'
import {FormatPhoneNumber, RandomString} from '@solidbasisventures/intelliwaketsfoundation'

interface IProps<T = unknown> extends IIWInputProps<T> {
	showFAIcon?: boolean | IconProp
	changeValue?: TChangeValueFunction<T>
	autoCompleteOn?: boolean
}

export function InputTel<T>(props: IProps<T>) {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)
		delete subset.showFAIcon
		delete subset.onChange

		return subset
	}, [props])

	const faIconToShow = useMemo((): null | IconProp => {
		if (!props.showFAIcon) return null

		if (props.showFAIcon === true) return faPhone

		return props.showFAIcon as IconProp
	}, [props.showFAIcon])

	return (
		<>
			{!!props.plainText ? (
				<div className="form-control-plaintext" {...props.plainTextProps}>
					{FormatPhoneNumber(props.value as string)}
				</div>
			) : !faIconToShow ? (
				<Input
					type="tel"
					inputMode="tel"
					className="inputTel"
					{...inputProps}
					onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}
					autoComplete={props.autoCompleteOn ? 'on' : `AC_${props.name ?? ''}_${RandomString(5)}`}
				/>
			) : (
				<InputGroup>
					<Input
						type="tel"
						inputMode="tel"
						className="inputTel"
						{...inputProps}
						onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}
						autoComplete={props.autoCompleteOn ? 'on' : `AC_${props.name ?? ''}_${RandomString(5)}`}
					/>
					<InputGroupAddon addonType="append">
						<InputGroupText>
							<FontAwesomeIcon icon={faIconToShow} />
						</InputGroupText>
					</InputGroupAddon>
				</InputGroup>
			)}
		</>
	)
}
