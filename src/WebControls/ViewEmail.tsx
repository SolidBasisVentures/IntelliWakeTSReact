import React from 'react'

interface IProps {
	email?: string | null
	label?: string | null
}

export function ViewEmail(props: IProps) {
	return !!props.email ? (
		<a href={'mailto:' + props.email}>{props.label ?? props.email}</a>
	) : (props.label ?? null)
}
