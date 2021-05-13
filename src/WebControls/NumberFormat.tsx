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
	displayType?: 'Digits' | 'Currency' | 'Percent'
	zeroShows?: 'Zero' | 'Dash' | 'Blank'
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
			{props.displayType === 'Percent'
				? props.zeroShows === 'Blank'
					? ToPercentBlank(props.value ?? 0, props.decimals ?? 0)
					: props.zeroShows === 'Dash'
					? ToPercentDash(props.value ?? 0, props.decimals ?? 0)
					: ToPercent(props.value ?? 0, props.decimals ?? 0)
				: props.displayType === 'Currency'
				? props.zeroShows === 'Blank'
					? ToCurrencyBlank(props.value ?? 0, props.decimals ?? 2)
					: props.zeroShows === 'Dash'
					? ToCurrencyDash(props.value ?? 0, props.decimals ?? 2)
					: ToCurrency(props.value ?? 0, props.decimals ?? 2)
				: props.zeroShows === 'Blank'
				? ToDigitsBlank(props.value ?? 0, props.decimals ?? 0)
				: props.zeroShows === 'Dash'
				? ToDigitsDash(props.value ?? 0, props.decimals ?? 0)
				: ToDigits(props.value ?? 0, props.decimals ?? 0)}
		</span>
	)
}
