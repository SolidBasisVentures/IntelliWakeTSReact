import React, {ReactNode, ReactNodeArray} from 'react'

interface IProps {
	text: ReactNode | ReactNodeArray | string | boolean | null | undefined
	className?: string
	hidden?: boolean
}

export const BRBefore = (props: IProps) => {
	if (!props.text || !!props.hidden) return null

	return (
		<span className={props.className}>
			<br />
			{props.text}
		</span>
	)
}
