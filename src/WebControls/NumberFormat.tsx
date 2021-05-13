import React from 'react'
import {
	ToCurrency,
	ToCurrencyBlank,
	ToCurrencyDash,
	ToDigits,
	ToDigitsBlank,
	ToDigitsDash,
	ToPercent,
	ToPercentBlank,
	ToPercentDash
} from '@solidbasisventures/intelliwaketsfoundation'

interface IProps {
	value?: number | null
	currency?: boolean
	percent?: boolean
	dash?: boolean
	blank?: boolean
	decimals?: number
	className?: string
	classNameAddOnNegative?: string
}

export function NumberFormat(props: IProps) {
	return (
		<span
			className={
				(props.className ?? '') + ' ' + ((props.value ?? 0) < 0 ? props.classNameAddOnNegative ?? 'text-danger' : '')
			}>
			{props.percent
				? props.blank
					? ToPercentBlank(props.value ?? 0, props.decimals ?? 0)
					: props.dash
					? ToPercentDash(props.value ?? 0, props.decimals ?? 0)
					: ToPercent(props.value ?? 0, props.decimals ?? 0)
				: props.currency
				? props.blank
					? ToCurrencyBlank(props.value ?? 0, props.decimals ?? 2)
					: props.dash
					? ToCurrencyDash(props.value ?? 0, props.decimals ?? 2)
					: ToCurrency(props.value ?? 0, props.decimals ?? 2)
				: props.blank
				? ToDigitsBlank(props.value ?? 0, props.decimals ?? 0)
				: props.dash
				? ToDigitsDash(props.value ?? 0, props.decimals ?? 0)
				: ToDigits(props.value ?? 0, props.decimals ?? 0)}
		</span>
	)
}
