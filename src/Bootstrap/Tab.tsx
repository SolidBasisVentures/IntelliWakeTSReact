import React, {Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useState, useMemo} from 'react'
import {FontAwesomeIconProps, FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {TStorageType, useStorage} from '../Hooks/useStorage'
import {Button} from './Button'
import {IModalPromptProps, ModalPrompt} from '../WebControls/ModalPrompt'
import {ClassNames} from '../Functions'

export interface IIWTab {
	faProps?: FontAwesomeIconProps
	title: string
	hide?: boolean
	inactive?: boolean
	pane: ReactNode
	loadedOnlyWhenActive?: boolean
}

export type TPaneLoading = 'All' | 'OnlyActive' | 'KeepOnceLoaded'

export interface IWTabProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	tabs: IIWTab[]
	paneLoading?: TPaneLoading
	rememberKey?: string
	rememberType?: TStorageType
	openTab?: string
	setOpenTab?: Dispatch<SetStateAction<string>>
	openTabChanged?: (tab: string) => void
	isDirty?: boolean
	tabType?: 'tabs' | 'pills'
	fillHeight?: boolean | 'scroll'
	classNamePanes?: string
	classNamePaneActive?: string
	noPanePadding?: boolean
	noPaneBorder?: boolean
}

export const Tab = (props: IWTabProps) => {
	const showTabs = useMemo<IIWTab[]>(() => props.tabs.filter((tab) => !tab.hide), [props.tabs])
	const defaultTab = showTabs.find((tab) => !tab.inactive && (!props.openTab || tab.title === props.openTab))?.title
	const [openTab, setOpenTab] = useStorage<string>(
		props.rememberKey,
		defaultTab ?? ('' as any),
		props.rememberType ?? 'session'
	)
	const [loadedTabs, setLoadedTabs] = useState<string[]>(!defaultTab ? [] : [defaultTab])
	const [modalPromptProps, setModalPromptProps] = useState<null | IModalPromptProps>(null)

	const actualOpenTab = useMemo<string | undefined>(
		() => showTabs.find((tab) => !tab.inactive && tab.title === (!!props.setOpenTab ? props.openTab : openTab))?.title,
		[props.openTab, props.setOpenTab, openTab]
	)

	const setActualOpenTab = useCallback(props.setOpenTab ?? setOpenTab, [props, setOpenTab])

	useEffect(() => {
		if (!!defaultTab && !actualOpenTab) {
			setActualOpenTab(defaultTab)
		}
	}, [defaultTab, actualOpenTab, setActualOpenTab])

	const openTabChanged = useCallback(props.openTabChanged ?? (() => {}), [props])

	const changeOpenTab = useCallback(
		(tabTitle: string) => {
			if (actualOpenTab !== tabTitle) {
				if (!props.isDirty) {
					setActualOpenTab(tabTitle)
					openTabChanged(tabTitle)
					setLoadedTabs((prevState) => [...prevState.filter((pS) => pS !== tabTitle), tabTitle])
				} else {
					setModalPromptProps({
						title: 'Abandon Changes?',
						messageBody: 'Are you sure you want to abandon changes?',
						color: 'danger',
						okLabel: 'Abandon',
						okAction: () => {
							setActualOpenTab(tabTitle)
							openTabChanged(tabTitle)
							setLoadedTabs((prevState) => [...prevState.filter((pS) => pS !== tabTitle), tabTitle])
						}
					})
				}
			}
		},
		[actualOpenTab, openTabChanged, setOpenTab, props.isDirty]
	)

	if (!actualOpenTab) return null

	// "px-4 mt-3 mx-0 gray-tabs"
	// p-2 background-gray overflow-hidden

	return (
		<div className={ClassNames({'fill-height': !!props.fillHeight})}>
			<ModalPrompt {...modalPromptProps} dismiss={setModalPromptProps} />
			<ul className={`nav px-4 mt-3 mx-0 gray-tabs nav-${props.tabType ?? 'tabs'}`}>
				{showTabs.map((tab) => (
					<li key={tab.title} className="nav-item">
						<Button
							color="link"
							className={ClassNames({
								'nav-link': true,
								desktopOnly: true,
								active: actualOpenTab === tab.title
							})}
							onClick={() => changeOpenTab(tab.title)}>
							{!!tab.faProps && <FontAwesomeIcon {...tab.faProps} fixedWidth />}
							{tab.title}
						</Button>
					</li>
				))}
			</ul>
			<div
				className={ClassNames({
					'tab-content': true,
					'fill-height': props.fillHeight === true,
					'fill-height-scroll': props.fillHeight === 'scroll',
					'border-left': !props.noPaneBorder,
					'border-right': !props.noPaneBorder,
					'border-bottom': !props.noPaneBorder
				})}>
				{showTabs
					.filter(
						(tab) =>
							!tab.hide &&
							(!tab.loadedOnlyWhenActive || tab.title === actualOpenTab) &&
							(!props.paneLoading ||
								props.paneLoading === 'All' ||
								tab.title === actualOpenTab ||
								(props.paneLoading === 'KeepOnceLoaded' && loadedTabs.some((loadedTab) => tab.title === loadedTab)))
					)
					.map((tab) => (
						<div
							key={tab.title}
							className={
								(props.classNamePanes ?? '') +
								' ' +
								(tab.title === actualOpenTab ? props.classNamePaneActive ?? '' : '') +
								' ' +
								ClassNames({
									show: tab.title === actualOpenTab,
									active: tab.title === actualOpenTab,
									'p-2': !props.noPanePadding
								}) +
								' tab-pane fade '
							}>
							{tab.pane}
						</div>
					))}
			</div>
		</div>
	)
}
