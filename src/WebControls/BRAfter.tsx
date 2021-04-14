import React, {ReactNode, ReactNodeArray} from 'react'

interface IProps {
	text: ReactNode | ReactNodeArray | string | boolean | null | undefined
	className?: string
	hidden?: boolean
}

export const BRAfter = (props: IProps) => {
	return (
		<span className={props.className} hidden={props.hidden || !props.text}>
			{props.text}
			<br />
		</span>
	)
}
