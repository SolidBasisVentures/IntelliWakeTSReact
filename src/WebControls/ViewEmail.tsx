import React from 'react'

interface IProps {
	email?: string | null
	label?: string | null
}

export function ViewEmail(props: IProps) {
	if (!props.email) return null
	
	return (
		<a href={'mailto:' + props.email}>{props.label ?? props.email}</a>
	)
}
