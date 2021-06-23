import React, {forwardRef} from 'react'

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
	// innerRef?: MutableRefObject<HTMLButtonElement>
	children?: any
	onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>
	onKeyPress?: React.KeyboardEventHandler<HTMLButtonElement>
	title?: string
	// caret?: boolean
	classNameOverride?: string
}

export const Button = forwardRef<HTMLButtonElement, IIWButtonProps>((props, ref) => {
	return (
		<button
			className={
				props.classNameOverride ??
				(props.className ?? '') +
					` btn ` +
					(props.color === 'inline'
						? 'btn btn-link btn-link-inline '
						: `btn-${props.outline ? 'outline-' : ''}${props.color ?? 'secondary'} `) +
					`${!!props.size ? `btn-${props.size}` : ''}` // +
				// ' ' +
				// ClassNames({'btn-block': !!props.block, caret: !!props.caret})
			}
			type={props.type ?? 'button'}
			onClick={props.onClick}
			tabIndex={props.tabIndex}
			ref={ref}
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
})
