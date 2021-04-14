import React, {ReactNode, ReactNodeArray} from 'react'

interface IProps {
	text: ReactNode | ReactNodeArray | string | boolean | null | undefined
	className?: string
	hidden?: boolean
}

export const BRBefore = (props: IProps) => {
	return (
		<span className={props.className} hidden={props.hidden || !props.text}>
			<br />
			{props.text}
		</span>
	)
}
