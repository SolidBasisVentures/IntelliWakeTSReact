import React, {ReactNode, ReactNodeArray} from 'react'

interface IProps {
	text: ReactNode | ReactNodeArray | string | boolean | null | undefined
	className?: string
	hidden?: boolean
}

export const BRAfter = (props: IProps) => {
	if (!props.text || !!props.hidden) return null

	return (
		<span className={props.className}>
			{props.text}
			<br />
		</span>
	)
}
