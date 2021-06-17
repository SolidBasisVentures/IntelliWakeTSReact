import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWModalBodyProps extends React.HTMLProps<HTMLDivElement> {}

export const ModalBody = (props: IWModalBodyProps) => {
	return <div {...OmitProperty(props, 'className')} className={'modal-body ' + (props.className ?? '')} />
}
