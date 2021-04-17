import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
import React, {Dispatch, ReactNode, SetStateAction, useMemo} from 'react'
import {Badge, ListGroup, ListGroupItemHeading, Spinner} from 'reactstrap'
import {IMasterDetailProps, MasterDetail, MDDetail, MDLink, MDMaster} from './MasterDetail'
import {ToDigits, ToPascalCase} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IMasterDetailListGroupMDLink {
	hidden?: boolean
	faProps?: FontAwesomeIconProps
	color?: string
	linkNode: ReactNode
	linkClick?: React.MouseEventHandler<any>
	/** undefined = don't show, null = show with spinner, number (0, 1, etc.) = show */
	counter?: number | null
	counterColor?: string
	panelTitle?: string
	panelURL?: string
	id?: any
	mdDetail?: ReactNode
	section?: string
	sectionNode?: ReactNode
	className?: string
}

export interface IMasterDetailListGroupDetail {
	panelTitle: string
	panelURL?: string
	mdDetail: ReactNode
}

export interface IMasterDetailListGroupProps extends Omit<IMasterDetailProps, 'children'> {
	mdMasterWidth?: string
	mdMasterClassName?: string
	mdMasterTopNode?: ReactNode
	mdMasterBottomNode?: ReactNode
	sectionBreak?: 'Title' | 'HR' | 'Gap'
	listGroupItems: IMasterDetailListGroupMDLink[]
	collapsedSections?: string[]
	setCollapsedSections?: Dispatch<SetStateAction<string[]>>
	noTextLargeSmaller?: boolean
	mdDetails?: IMasterDetailListGroupDetail[]
}

export const MasterDetailListGroup = (props: IMasterDetailListGroupProps) => {
	interface IListGroupItem extends IMasterDetailListGroupMDLink {
		key: string
		panelURLCalc: string
		collapsed: boolean
	}

	const listGroupItems = useMemo<IListGroupItem[]>(
		() =>
			props.listGroupItems
				.filter((listGroupItem) => !listGroupItem.hidden)
				.map((listGroupItem, idx) => ({
					...listGroupItem,
					key: (listGroupItem.panelTitle ?? listGroupItem.linkNode ?? idx).toString() + (listGroupItem.id ?? '') + idx,
					panelURLCalc:
						listGroupItem.panelURL ??
						ToPascalCase(listGroupItem.panelTitle ?? (listGroupItem.linkNode ?? idx).toString()),
					collapsed: !!listGroupItem.section && (props.collapsedSections ?? []).includes(listGroupItem.section)
				})),
		[props.listGroupItems, props.collapsedSections]
	)

	let prevListGroupItem: IListGroupItem | null = null

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
					className={`fill-height-scroll ${props.noTextLargeSmaller ? '' : `text-large-${props.breakAt}-smaller`}`}>
					{listGroupItems.map((listGroupItem) => {
						let prefix: ReactNode = null

						if (!!listGroupItem.section) {
							if (!prevListGroupItem || prevListGroupItem.section !== listGroupItem.section) {
								switch (props.sectionBreak) {
									case 'HR':
										prefix = <hr />
										break
									case 'Gap':
										prefix = ''
										break
									default:
										prefix = (
											<ListGroupItemHeading
												onClick={() => {
													if (!!props.setCollapsedSections && !!listGroupItem.section) {
														props.setCollapsedSections((prevState) => {
															if (!listGroupItem.section) return prevState

															if (prevState.includes(listGroupItem.section)) {
																return prevState.filter((pS) => pS !== listGroupItem.section)
															}

															return [...prevState, listGroupItem.section]
														})
													}
												}}
												className={ClassNames({
													'cursor-pointer': !!props.setCollapsedSections && !!listGroupItem.section
												})}>
												{listGroupItem.sectionNode ?? listGroupItem.section}
											</ListGroupItemHeading>
										)
										break
								}
							}
						} else if (!!listGroupItem.sectionNode) {
							console.warn(
								`MasterDetail ${props.mdPath} Item ${listGroupItem.panelTitle}:${
									listGroupItem.id ?? ''
								} has a sectionNode, but no section`
							)
						}

						prevListGroupItem = listGroupItem

						return (
							<React.Fragment key={listGroupItem.key}>
								{prefix}
								<MDLink
									hidden={listGroupItem.collapsed}
									tag="li"
									panel={listGroupItem.panelURLCalc}
									onClick={listGroupItem.linkClick ?? undefined}
									className={
										ClassNames({
											'list-group-item': true,
											'list-group-item-action': !!listGroupItem.mdDetail || !!listGroupItem.linkClick,
											'mt-4': prefix === ''
										}) +
										' ' +
										(listGroupItem.className ?? '')
									}>
									{!!listGroupItem.faProps && <FontAwesomeIcon fixedWidth {...listGroupItem.faProps} />}
									{listGroupItem.linkNode}
									{listGroupItem.counter !== undefined && (
										<Badge
											color={listGroupItem.counterColor}
											className="float-right small text-white border-round ml-2">
											{listGroupItem.counter !== null ? (
												ToDigits(listGroupItem.counter, 0)
											) : (
												<Spinner size="sm" style={{width: '0.8em', height: '0.8em'}} />
											)}
										</Badge>
									)}
								</MDLink>
							</React.Fragment>
						)
					})}
					{props.mdMasterBottomNode}
				</ListGroup>
			</MDMaster>
			{listGroupItems.map(
				(listGroupItem) =>
					!listGroupItem.collapsed &&
					!!listGroupItem.mdDetail && (
						<MDDetail
							key={listGroupItem.key}
							panel={listGroupItem.panelURLCalc}
							titleText={listGroupItem.panelTitle ?? listGroupItem.linkNode}>
							{listGroupItem.mdDetail}
						</MDDetail>
					)
			)}
			{(props.mdDetails ?? []).map((mdDetail, idx) => (
				<MDDetail
					key={(mdDetail.panelURL ?? mdDetail.panelTitle).toString() + idx}
					panel={mdDetail.panelURL ?? ToPascalCase(mdDetail.panelTitle)}
					titleText={mdDetail.panelTitle}>
					{mdDetail.mdDetail}
				</MDDetail>
			))}
		</MasterDetail>
	)
}
