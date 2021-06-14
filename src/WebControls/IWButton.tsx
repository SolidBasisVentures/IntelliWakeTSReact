import React, {LegacyRef} from 'react'
import {ClassNames} from '../Functions'

export interface IIWButtonProps {
	size?: 'sm' | 'lg'
	color?: string
	outline?: boolean
	hidden?: boolean
	disabled?: boolean
	block?: boolean
	style?: React.CSSProperties
	type?: 'button' | 'submit' | 'reset'
	autoFocus?: boolean
	className?: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	tabIndex?: number
	innerRef?: LegacyRef<HTMLButtonElement>
	children?: any
	onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>
	onKeyPress?: React.KeyboardEventHandler<HTMLButtonElement>
	title?: string
}

export const IWButton = (props: IIWButtonProps) => {
	return (
		<button
			className={
				(props.className ?? '') +
				` btn ` +
				(props.color === 'inline'
					? 'btn btn-link btn-link-inline '
					: `btn-${props.outline ? 'outline-' : ''}${props.color ?? 'secondary'} `) +
				`${!!props.size ? `btn-${props.size}` : ''}` +
				' ' +
				ClassNames({'btn-block': !!props.block})
			}
			type={props.type ?? 'button'}
			onClick={props.onClick}
			tabIndex={props.tabIndex}
			ref={props.innerRef}
			onKeyDown={props.onKeyDown}
			onKeyPress={props.onKeyPress}
			autoFocus={props.autoFocus}
			hidden={props.hidden}
			disabled={props.disabled}
			style={props.style}
			title={props.title}>
			{props.children}
		</button>
	)
}
