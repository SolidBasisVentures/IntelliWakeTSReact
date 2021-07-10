import React, {ReactNode, useEffect, useMemo, useRef, useState} from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {Button} from './Button'
import {ClassNames, KEY_ESCAPE} from '../Functions'
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
import {faCog} from '@fortawesome/pro-regular-svg-icons'
import {DropdownItem} from './DropdownItem'

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface IDDAction {
	hidden?: boolean
	divider?: boolean
	disabled?: boolean
	header?: boolean
	faProps?: FontAwesomeIconProps
	faPropHidden?: boolean
	title?: ReactNode
	action?: () => void
	color?: string
	className?: string
}

export interface IWDropdownProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref' | 'size'> {
	disabled?: boolean
	direction?: Direction
	isOpen?: boolean
	nav?: boolean
	tag?: string | React.ReactType
	toggle?: React.KeyboardEventHandler<any> | React.MouseEventHandler<any>
	size?: 'sm' | 'lg'
	color?: string
	inNavbar?: boolean
	right?: boolean
	buttonLabel?: ReactNode
	buttonFAProps?: FontAwesomeIconProps
	buttonClassName?: string
	menuClassName?: string
	noCaret?: boolean
	ddActions?: IDDAction[] | (() => IDDAction[])
}

export const Dropdown = (props: IWDropdownProps) => {
	const hasOpened = useRef(false)
	const [isOpen, setIsOpen] = useState<boolean>(props.isOpen ?? false)
	const visibleDDActions = useMemo(
		() =>
			!props.ddActions
				? []
				: (typeof props.ddActions === 'function' ? props.ddActions() : props.ddActions).filter(
						(ddAction) => !ddAction.hidden
				  ),
		[props.ddActions]
	)

	const showFAProps = useMemo(() => !!visibleDDActions.find((ddAction) => !!ddAction.faProps), [visibleDDActions])

	const TagToUse = props.tag ?? !!props.inNavbar ? 'li' : ('div' as React.ReactType)

	const isControlled = props.isOpen !== undefined

	const actualIsOpen = isControlled ? !!props.isOpen : isOpen

	// console.log('DD', isControlled, actualIsOpen)

	const externalClick = (e: any) => {
		if (actualIsOpen) {
			e.stopPropagation()

			if (!!props.toggle) {
				props.toggle(e)
			}

			if (!isControlled) {
				setIsOpen(false)
			}
		}
	}

	const externalEsc = (e: any) => {
		if (e.keyCode === KEY_ESCAPE && actualIsOpen) {
			e.stopPropagation()

			if (!!props.toggle) {
				props.toggle(e)
			}

			if (!isControlled) {
				setIsOpen(false)
			}
		}
	}

	useEffect(() => {
		// if (menuRef.current) {
		// 	console.log(1)
		// 	menuRef.current.addEventListener('resize', onResize)
		// }

		// if (actualIsOpen) {
		// 	setOffset((buttonRef?.current?.offsetWidth ?? 0) - (menuRef?.current?.offsetWidth ?? 0))
		// }

		window.addEventListener('click', externalClick)
		window.addEventListener('keydown', externalEsc)
		return () => {
			// menuRef.current.removeEventListener('resize', onResize)
			window.removeEventListener('click', externalClick)
			window.removeEventListener('keydown', externalEsc)
		}
	})

	let classes = props.className ?? ''
	classes +=
		' ' +
		ClassNames({
			dropdown: true,
			show: actualIsOpen,
			'd-inline-block': true,
			'navbar-nav': !!props.inNavbar,
			'nav-item': !!props.nav
		})

	if (actualIsOpen) hasOpened.current = true

	// console.log('Here', buttonRef?.current?.offsetWidth, menuRef?.current?.offsetWidth)
	// console.log('buttonRef', buttonRef?.current)
	// console.log('menuRef', menuRef?.current)

	// console.log('Offset', offset)

	//onClick={(e: any) => e.stopPropagation()}

	return (
		<TagToUse
			{...OmitProperty(
				props,
				'tag',
				'disabled',
				'direction',
				'ddActions',
				'isOpen',
				'nav',
				'toggle',
				'inNavbar',
				'right',
				'buttonLabel',
				'buttonFAProps',
				'buttonClassName',
				'menuClassName',
				'noCaret',
				'size',
				'color',
				'className'
			)}
			className={classes}>
			<Button
				color={props.color}
				size={props.size}
				className={
					!!props.nav || !!props.inNavbar
						? undefined
						: `${props.buttonClassName ?? ''} ${props.noCaret ? '' : 'dropdown-toggle'}`.trim()
				}
				classNameOverride={
					!!props.nav || !!props.inNavbar
						? `text-left nav-link ${props.buttonClassName ?? ''} ${props.noCaret ? '' : 'dropdown-toggle'}`.trim()
						: undefined
				}
				onClick={(e: any) => {
					// e.stopPropagation()

					if (!!props.toggle) {
						props.toggle(e)
					}

					if (!isControlled) {
						setIsOpen((prevState) => !prevState)
					}
				}}
				style={!!props.nav || !!props.inNavbar ? {background: 'none', border: 'none'} : undefined}
				// ref={buttonRef}
			>
				{props.buttonLabel}
			</Button>
			<div
				tabIndex={-1}
				className={`${ClassNames({
					show: actualIsOpen,
					'dropdown-menu-right': !!props.right
				})} dropdown-menu ${props.menuClassName ?? ''}`.trim()}
				onClick={(e: any) => {
					e.stopPropagation()

					if (!!props.toggle) {
						props.toggle(e)
					}

					if (!isControlled) {
						setIsOpen((prevState) => !prevState)
					}
				}}
				// style={
				// 	!props.right
				// 		? {
				// 				visibility: actualIsOpen ? undefined : 'hidden'
				// 		  }
				// 		: {
				// 				visibility: actualIsOpen ? undefined : 'hidden',
				// 				position: 'absolute',
				// 				// 'will-change': 'transform',
				// 				top: 0,
				// 				left: 0,
				// 				transform: `translate3d(${offset}px, ${(buttonRef?.current?.offsetHeight ?? 0) - 2}px, 0px)`
				// 		  }
				// }
				// ref={menuRef}
			>
				{/*{actualIsOpen ? props.children : undefined}*/}
				{hasOpened.current && (
					<>
						{props.children}
						{visibleDDActions.map((ddAction, idx) => (
							<DropdownItem
								className={(ddAction.className ?? '') + (!!ddAction.color ? ` text-${ddAction.color}` : '')}
								key={idx}
								disabled={!!ddAction.disabled || !ddAction.action}
								divider={!!ddAction.divider}
								header={!!ddAction.header}
								onClick={() => (!!ddAction.action ? ddAction.action() : () => {})}>
								{showFAProps && (
									<FontAwesomeIcon
										icon={faCog}
										{...ddAction.faProps}
										className={!ddAction.faProps || ddAction.faPropHidden ? 'invisible' : ''}
										fixedWidth
									/>
								)}
								{ddAction.title}
							</DropdownItem>
						))}
					</>
				)}
			</div>
		</TagToUse>
	)
}
