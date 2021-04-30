import React, {ReactNode, ReactNodeArray} from 'react'

interface IProps {
	text: string | null | undefined
	prefix?: ReactNode | ReactNodeArray | string | boolean | null
	suffix?: ReactNode | ReactNodeArray | string | boolean | null
	className?: string
	hidden?: boolean
	noTruncate?: boolean
}

export const EllipsesTruncate = (props: IProps) => {
	if (props.hidden || !props.text) return null

	return (
		<>
			{props.prefix}
			<div className={'w-100 ' + (!!props.noTruncate ? '' : 'ellipses-truncate ') + (props.className ?? '')}>
				{props.text}
			</div>
			{props.suffix}
		</>
	)
}
