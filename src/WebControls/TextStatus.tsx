import React, {ReactNode, useCallback, useEffect, useRef, useMemo, ReactNodeArray} from 'react'

export interface ITextStatusState {
	message: ReactNode | null
	noDismiss?: boolean,
	color?: string,
	className?: string
}

export type TTextStatusState = ITextStatusState | string | null

export const initialTextStatusState: TTextStatusState = {
	message: null
}

interface IProps {
	textStatus: TTextStatusState
	clearTextStatus: () => void
	children?: ReactNode | ReactNodeArray
}

export const TextStatus = (props: IProps) => {
	const dismissTimeout = useRef(setTimeout(() => {}, 1))
	
	const dismissTextStatus = useCallback(props.clearTextStatus, [props.clearTextStatus])
	
	const textStatus = useMemo(() => {
		if (props.textStatus === null) return {...initialTextStatusState} as ITextStatusState
		
		if (typeof props.textStatus === 'string') {
			return {...initialTextStatusState, message: props.textStatus} as ITextStatusState
		}
		
		return props.textStatus
	}, [props.textStatus])
	
	useEffect(() => {
		clearTimeout(dismissTimeout.current)
		if (!!textStatus.message && !textStatus.noDismiss) {
			dismissTimeout.current = setTimeout(dismissTextStatus, 1500)
		}
	}, [textStatus.message, textStatus.noDismiss, dismissTextStatus])
	
	return !!textStatus.message ?
		<span className={(!!textStatus.className ? textStatus.className : '') + (!!textStatus.color ? ` text-${textStatus.color}` : '')}>
			{textStatus.message}
		</span>
		:
		props.children ?? null
}
