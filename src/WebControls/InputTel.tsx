import React, {useMemo} from 'react'
import {Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhone} from '@fortawesome/pro-regular-svg-icons'
import {handleChangeValue, IIWInputProps, reduceInputProps} from './IWInputProps'
import {FormatPhoneNumber} from '@solidbasisventures/intelliwaketsfoundation'

interface IProps extends IIWInputProps {
	showFAIcon?: boolean | IconProp
	changeValue?: (value: any, name?: string) => void
}

export const InputTel = (props: IProps) => {
	const inputProps = useMemo(() => {
		const subset = reduceInputProps(props)
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
					onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}
				/>
			) : (
				<InputGroup>
					<Input
						type="tel"
						inputMode="tel"
						className="inputTel"
						{...inputProps}
						onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}
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
