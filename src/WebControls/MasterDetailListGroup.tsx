import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
import React, {ReactNode, useMemo} from 'react'
import {Badge, ListGroup, Spinner} from 'reactstrap'
import {IMasterDetailProps, MasterDetail, MDDetail, MDLink, MDMaster} from './MasterDetail'
import {ToDigits, ToPascalCase} from '@solidbasisventures/intelliwaketsfoundation'

export interface IMasterDetailListGroupMDLink {
	hidden?: boolean
	faProps?: FontAwesomeIconProps
	color?: string
	title: ReactNode
	/** undefined = don't show, null = show with spinner, number (0, 1, etc.) = show */
	counter?: number | null
	counterColor?: string
	panelTitle: string
	panelURL?: string
	id?: any
	mdDetail?: ReactNode
	section?: string
	sectionNode?: ReactNode
}

export interface IMasterDetailListGroupProps extends Omit<IMasterDetailProps, 'children'> {
	mdMasterWidth?: string
	mdMasterClassName?: string
	mdMasterTopNode?: ReactNode
	mdMasterBottomNode?: ReactNode
	sectionBreak?: 'Title' | 'HR' | 'Gap'
	listGroupClassName?: string
	listGroupItems: IMasterDetailListGroupMDLink[]
	mdLinkClassName?: string
}

export const MasterDetailListGroup = (props: IMasterDetailListGroupProps) => {
	interface IListGroupItem extends IMasterDetailListGroupMDLink {
		key: string
		panelURLCalc: string
	}

	const listGroupItems = useMemo<IListGroupItem[]>(
		() =>
			props.listGroupItems
				.filter((listGroupItem) => !listGroupItem.hidden)
				.map((listGroupItem, idx) => ({
					...listGroupItem,
					key: listGroupItem.panelTitle + listGroupItem.id + idx,
					panelURLCalc: listGroupItem.panelURL ?? ToPascalCase(listGroupItem.panelTitle)
				})),
		[props.listGroupItems]
	)

	return (
		<MasterDetail
			setMenuBackItemState={props.setMenuBackItemState}
			mdPath={props.mdPath}
			breakAt={props.breakAt}
			backText={props.backText}
			rememberLast={props.rememberLast}
			className={props.className}>
			<MDMaster width={props.mdMasterWidth} className={props.mdMasterClassName}>
				{props.mdMasterTopNode}
				<ListGroup
					flush
					className={`fill-height-scroll text-large-${props.breakAt}-smaller ` + (props.listGroupClassName ?? '')}>
					{listGroupItems.map((listGroupItem) => (
						<React.Fragment key={listGroupItem.key}>
							<MDLink
								tag="li"
								panel={listGroupItem.panelURLCalc}
								className={'list-group-item list-group-item-action ' + (props.mdLinkClassName ?? '')}>
								{!!listGroupItem.faProps && <FontAwesomeIcon fixedWidth {...listGroupItem.faProps} />}
								{listGroupItem.title}
								{listGroupItem.counter !== undefined && (
									<Badge color={listGroupItem.counterColor} className="float-right small text-white border-round ml-2">
										{listGroupItem.counter !== null ? (
											ToDigits(listGroupItem.counter, 0)
										) : (
											<Spinner size="sm" style={{width: '0.8em', height: '0.8em'}} />
										)}
									</Badge>
								)}
							</MDLink>
						</React.Fragment>
					))}
					{props.mdMasterBottomNode}
				</ListGroup>
			</MDMaster>
			{listGroupItems.map((listGroupItem) => (
				<MDDetail key={listGroupItem.key} panel={listGroupItem.panelURLCalc} titleText={listGroupItem.panelTitle}>
					{listGroupItem.mdDetail}
				</MDDetail>
			))}
		</MasterDetail>
	)
}
