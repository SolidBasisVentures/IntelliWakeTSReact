import React, {CSSProperties, ReactNode, useCallback, useEffect, useRef} from 'react'
import {KEY_ESCAPE} from '../Functions'
import Portal from './Portal'

export interface IWModalProps {
	isOpen?: boolean
	// autoFocus?: boolean
	autoFocusElement?: any
	size?: 'sm' | 'lg'
	toggle?: React.KeyboardEventHandler<any> | React.MouseEventHandler<any>
	color?: string
	title?: ReactNode
	body?: ReactNode
	dialogStyle?: CSSProperties
	dialogClassName?: string
	bodyStyle?: CSSProperties
	bodyClassName?: string
	noCancel?: boolean
	cancelLabel?: ReactNode
	noCancelButton?: boolean
	okAction?: () => void | false
	okLabel?: ReactNode
	okDisabled?: boolean
	footerLeft?: ReactNode
	footerRight?: ReactNode
}

export const Modal = (props: IWModalProps) => {
	const divRef = useRef<any>()

	const toggle = useCallback((e: any) => (!!props.toggle && !props.noCancel ? props.toggle(e) : () => {}), [props])

	const okAction = useCallback(
		(e: any) => {
			if (!!props.okAction) {
				const okResult = props.okAction()
				if (okResult === undefined || okResult !== false) {
					if (!!props.toggle) {
						props.toggle(e)
					}
				}
			}
		},
		[props]
	)

	const keyDown = (e: any) => {
		if (props.isOpen) {
			e.stopPropagation()

			switch (e.keyCode) {
				case KEY_ESCAPE:
					toggle(e)
					break
				// case KEY_ENTER:
				// 	okAction(e)
				// 	break
			}
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', keyDown)
		return () => {
			window.removeEventListener('keydown', keyDown)
		}
	})

	useEffect(() => {
		if (props.isOpen) {
			if (!!props.autoFocusElement.current) {
				props.autoFocusElement.current.focus()
			} else if (divRef.current) {
				divRef.current.focus()
			}
		}
	}, [props.isOpen])

	return (
		<Portal>
			<div
				className={'modal fade' + (props.isOpen ? ' show' : '')}
				role="dialog"
				style={{
					display: props.isOpen ? 'block' : 'none',
					pointerEvents: props.isOpen ? undefined : 'none'
				}}
				onClick={toggle}
				onKeyDown={keyDown}>
				<div
					className={
						'modal-dialog' +
						(!props.size ? '' : props.size === 'sm' ? ' modal-sm' : ' modal-lg') +
						' ' +
						(props.dialogClassName ?? '')
					}
					role="document"
					onClick={(e) => e.stopPropagation()}
					style={props.dialogStyle}>
					<div className="modal-content">
						{!!props.title && (
							<div className={`alert-${props.color ?? 'primary'} modal-header`}>
								<h5 className="modal-title">{props.title}</h5>
								{!props.noCancel && (
									<button className="close" onClick={toggle}>
										×{' '}
									</button>
								)}
							</div>
						)}
						{!!props.body && (
							<div className={'modal-body ' + (props.bodyClassName ?? '')} style={props.bodyStyle}>
								{props.body}
							</div>
						)}
						{(!!props.okAction || !props.noCancelButton || !!props.footerLeft || !!props.footerRight) && (
							<div className="modal-footer">
								<div className="mr-auto">
									{(!props.noCancel || !props.noCancelButton) && (
										<button className=" btn btn-link  " type="button" onClick={toggle}>
											{props.cancelLabel ?? 'Cancel'}
										</button>
									)}
									{props.footerLeft}
								</div>
								<div className="text-right">
									{props.footerRight}
									{!!props.okAction && (
										<button
											className={`ml-1 btn btn-${props.color ?? 'primary'}`}
											type="button"
											disabled={props.okDisabled}
											onClick={(e) => {
												e.stopPropagation()
												okAction(e)
											}}
											ref={divRef}>
											{props.okLabel ?? 'OK'}
										</button>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div
				className={'modal-backdrop fade' + (props.isOpen ? ' show' : '')}
				style={{pointerEvents: props.isOpen ? undefined : 'none'}}
				onClick={toggle}
			/>
		</Portal>
	)
}
