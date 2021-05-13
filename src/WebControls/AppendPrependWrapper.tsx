import React, {ReactNode, ReactNodeArray} from 'react'

interface IProps {
	children?: ReactNode | ReactNodeArray
	prepend?: ReactNode
	append?: ReactNode
}

export const AppendPrependWrapper = (props: IProps) => {
	if (!props.children) return null

	return (
		<>
			{!!props.prepend && props.prepend}
			{!!props.prepend && ' '}
			{props.children}
			{!!props.append && ' '}
			{!!props.append && props.append}
		</>
	)
}
