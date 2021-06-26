import React, {CSSProperties, ReactNode, useCallback, useEffect, useRef} from 'react'
import {KEY_ENTER, KEY_ESCAPE} from '../Functions'
import Portal from './Portal'
import {Form} from './Form'
import {Button} from './Button'

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
	bodyContainerFormSubmit?: boolean | string
	noCancel?: boolean
	cancelLabel?: ReactNode
	noCancelButton?: boolean
	okAction?: () => void | false
	okLabel?: ReactNode
	okDisabled?: boolean
	footerLeft?: ReactNode
	footerRight?: ReactNode
	children?: any
}

export const Modal = (props: IWModalProps) => {
	const divRef = useRef<any>()

	const toggle = useCallback(
		(e: any) => {
			if (!!props.toggle && !props.noCancel) {
				props.toggle(e)
			}
		},
		[props]
	)

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
				case KEY_ENTER:
					okAction(e)
					break
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
			if (!!props.autoFocusElement?.current) {
				props.autoFocusElement.current.focus()
			} else if (divRef?.current) {
				divRef.current.focus()
			}
		}
	}, [props.isOpen, props.autoFocusElement])

	return (
		<Portal>
			<div
				className={'modal fade' + (props.isOpen ? ' show' : '')}
				role="dialog"
				style={{
					display: props.isOpen ? 'block' : 'none',
					pointerEvents: props.isOpen ? undefined : 'none'
				}}
				onClick={(e) => {
					if (props.isOpen) {
						e.stopPropagation()

						toggle(e)
					}
				}}
				onKeyDown={keyDown}>
				<div
					className={
						'modal-dialog' +
						(!props.size ? '' : props.size === 'sm' ? ' modal-sm' : ' modal-lg') +
						' ' +
						(props.dialogClassName ?? '')
					}
					role="document"
					style={props.dialogStyle}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						{props.title !== undefined ? (
							<>
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
								<div className={'modal-body ' + (props.bodyClassName ?? '')} style={props.bodyStyle}>
									{!!props.bodyContainerFormSubmit ? (
										<Form
											className={`container ${
												typeof props.bodyContainerFormSubmit === 'string' ? props.bodyContainerFormSubmit : ''
											}`.trim()}
											onSubmitCapture={(e) => {
												e.preventDefault()
												if (!props.okDisabled) {
													okAction(e)
												}
											}}>
											{props.body}
											{props.children}
											<Button className="d-none" type="submit" />
										</Form>
									) : (
										<>
											{props.body}
											{props.children}
										</>
									)}
								</div>
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
							</>
						) : (
							props.children
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
