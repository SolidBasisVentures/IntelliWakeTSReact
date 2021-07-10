import React, {forwardRef, ReactNode} from 'react'

export interface IWButtonLightProps {
	color?: string
	outline?: boolean
	hidden?: boolean
	disabled?: boolean
	style?: React.CSSProperties
	className?: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	children?: ReactNode
}

export interface IIWButtonProps extends IWButtonLightProps {
	tag?: string | React.ReactType
	size?: 'sm' | 'lg'
	block?: boolean
	type?: 'button' | 'submit' | 'reset'
	autoFocus?: boolean
	tabIndex?: number
	// innerRef?: MutableRefObject<HTMLButtonElement>
	onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>
	onKeyPress?: React.KeyboardEventHandler<HTMLButtonElement>
	title?: string
	// caret?: boolean
	classNameOverride?: string
	to?: string
}

export const Button = forwardRef<HTMLButtonElement, IIWButtonProps>((props, ref) => {
	const TagToUse = props.tag ?? ('button' as React.ReactType)

	return (
		<TagToUse
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
			to={props.to}
			onKeyDown={props.onKeyDown}
			onKeyPress={props.onKeyPress}
			autoFocus={props.autoFocus}
			hidden={props.hidden}
			disabled={props.disabled}
			style={props.style}
			title={props.title}
			children={props.children}
		/>
	)
})
