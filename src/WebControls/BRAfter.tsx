import React, {ReactNode, ReactNodeArray} from 'react'

interface IProps {
	text: ReactNode | ReactNodeArray | string | boolean | null | undefined
	prefix?: ReactNode | ReactNodeArray | string | boolean | null
	suffix?: ReactNode | ReactNodeArray | string | boolean | null
	className?: string
	hidden?: boolean
}

export const BRAfter = (props: IProps) => {
	if (props.hidden || !props.text) return null

	return (
		<span className={props.className}>
			{props.prefix}
			{props.text}
			{props.suffix}
			<br />
		</span>
	)
}
