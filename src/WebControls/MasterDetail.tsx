import React, {CSSProperties, Dispatch, SetStateAction, useContext, useEffect, useMemo, useRef} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
// AddMenuBackItem, CleanMenuBackItem,
// import {useDispatch} from "react-redux";
import {GetPathComponentAfter, GetPathThrough} from '../Functions'
import {RandomString} from '@solidbasisventures/intelliwaketsfoundation'

export interface MenuBackItem {
	menuBackActive: boolean
	menuBackButtonTitle: string
	menuBackButtonURL: string
	menuPageTitle: string
	menuDisplaySize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const initialMenuBackItem: MenuBackItem = {
	menuBackActive: false,
	menuBackButtonTitle: '',
	menuBackButtonURL: '',
	menuPageTitle: '',
	menuDisplaySize: undefined
}

interface IMDContext {
	breakAt: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	mdPath: string
	baseFullPath: string
	isOpen: boolean
	backText?: string
	parentMDContext?: IMDContext | undefined // undefined = no parent, null = is the parent
	setMenuBackItemState: Dispatch<SetStateAction<MenuBackItem[]>>
}

const initialMDContext: IMDContext = {
	breakAt: 'lg',
	mdPath: '',
	baseFullPath: '',
	isOpen: false,
	setMenuBackItemState: () => {}
}

const MDContext = React.createContext(initialMDContext)

export interface IMasterDetailProps {
	children: any
	mdPath: string
	backText?: string
	breakAt: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	rememberLast?: boolean
	className?: string
	setMenuBackItemState: Dispatch<SetStateAction<MenuBackItem[]>>
}

export const MasterDetail = (props: IMasterDetailProps) => {
	const mdContextParent_RAW = useContext(MDContext)

	const mdContextParent = mdContextParent_RAW.baseFullPath ? mdContextParent_RAW : undefined
	// const basePath = mdContextParent_RAW.baseFullPath ?
	//     mdContextParent_RAW.baseFullPath + props.mdPath
	//     :
	//     window.location.pathname.substr(0, window.location.pathname.indexOf(props.mdPath)) + props.mdPath;
	const basePath = GetPathThrough(props.mdPath) ?? window.location.pathname + '/' + props.mdPath
	const isOpen = window.location.pathname.length > basePath.length && GetPathComponentAfter(basePath) !== '~'

	const mdContext: IMDContext = {
		breakAt: props.breakAt,
		mdPath: props.mdPath,
		baseFullPath: basePath,
		backText: props.backText ?? 'Back',
		isOpen: isOpen,
		parentMDContext: mdContextParent,
		setMenuBackItemState: props.setMenuBackItemState
	}

	const previousDashboardLastURL = window.sessionStorage.getItem(basePath + '-LastURL')
	if (
		props.rememberLast &&
		!GetPathComponentAfter(basePath) &&
		previousDashboardLastURL &&
		previousDashboardLastURL !== window.location.pathname
	) {
		return <Redirect to={previousDashboardLastURL} />
	} else {
		if (props.rememberLast) {
			window.sessionStorage.setItem(basePath + '-LastURL', window.location.pathname)
		}

		return (
			<MDContext.Provider value={mdContext}>
				<div className={(props.className ?? '') + ' masterDetail masterDetail-' + props.breakAt}>{props.children}</div>
			</MDContext.Provider>
		)
	}
}

interface IPropsMaster {
	children: any
	width?: string
	className?: string
	includePrint?: boolean
}

export const MDMaster = (props: IPropsMaster) => {
	const mdContext = useContext(MDContext)

	const id = useMemo(() => `MDM-ID-${RandomString(5)}`, [])

	let style: CSSProperties = {}

	if (props.width) {
		style.width = props.width
		style.minWidth = props.width
	}

	return (
		<div
			className={
				(!!props.includePrint ? '' : 'd-print-none ') +
				props.className +
				' masterDetailMaster' +
				(mdContext.isOpen ? ' isOpen' : '')
			}
			id={id}
			style={style}>
			{props.children}
		</div>
	)
}

interface IPropsMasterLink {
	panel: string
	id?: any
	activeClassName?: string
	className?: string
	children?: any
	tag?: 'li' | 'tr' | 'div' | 'span'
	style?: any
	title?: string
	onClick?: () => void
	onDoubleClick?: () => void
	noAutoScroll?: boolean
	postPath?: string
	blockActivate?: boolean
}

export const MDLink = (props: IPropsMasterLink | any) => {
	const history = useHistory()
	const mdContext = useContext(MDContext)
	const selectedRow = useRef(null as any | null)

	const panelURLAddOn =
		mdContext.baseFullPath +
		(props.panel ? '/' + props.panel.replace(/\s+/g, '') : '') +
		(props.id ? '/' + props.id : '') +
		(!!props.postPath ? '/' + props.postPath : '')
	const linkActive =
		(!props.blockActivate &&
			props.panel &&
			(window.location.pathname.startsWith(panelURLAddOn + '/') || window.location.pathname === panelURLAddOn)) ||
		(!props.panel && window.location.pathname === panelURLAddOn)

	let displayProps = {...props}
	let classNames: string[] = ['cursor-pointer']
	if (displayProps.className) classNames.push(displayProps.className)
	if (linkActive) classNames.push('active')
	if (linkActive && props.activeClassName) classNames.push(props.activeClassName)

	displayProps.className = classNames.join(' ')
	delete displayProps.postPath
	delete displayProps.id
	delete displayProps.blockActivate

	const selectItem = () => {
		if (!props.blockActivate) {
			window.sessionStorage.removeItem(mdContext.baseFullPath + '-LastURL')
			history.push(linkActive ? mdContext.baseFullPath : panelURLAddOn)
		}
	}

	useEffect(() => {
		if (!!selectedRow.current) {
			selectedRow.current?.scrollIntoView({block: 'nearest'})

			selectedRow.current = null
		}
	}, [props.children])

	switch (props.tag) {
		case 'li':
			return (
				<li
					{...displayProps}
					onClick={() => {
						if (!!props.onClick) {
							if (props.onClick() === true) selectItem()
						} else {
							selectItem()
						}
					}}
					onDoubleClick={props.onDoubleClick}
					style={props.style}
					title={props.title}
					ref={!props.noAutoScroll && linkActive ? selectedRow : null}>
					{props.children}
				</li>
			)
		case 'tr':
			return (
				<tr
					{...displayProps}
					onClick={props.onClick ?? selectItem}
					onDoubleClick={props.onDoubleClick}
					style={props.style}
					title={props.title}
					ref={!props.noAutoScroll && linkActive ? selectedRow : null}>
					{props.children}
				</tr>
			)
		case 'div':
			return (
				<div
					{...displayProps}
					onClick={props.onClick ?? selectItem}
					onDoubleClick={props.onDoubleClick}
					style={props.style}
					title={props.title}
					ref={!props.noAutoScroll && linkActive ? selectedRow : null}>
					{props.children}
				</div>
			)
		default:
			return (
				<span
					{...displayProps}
					onClick={props.onClick ?? selectItem}
					onDoubleClick={props.onDoubleClick}
					style={props.style}
					title={props.title}
					ref={!props.noAutoScroll && linkActive ? selectedRow : null}>
					{props.children}
				</span>
			)
	}
}

interface IPropsDetail {
	children: any
	titleText?: string
	backText?: string
	exact?: boolean
	panel?: string
	hidden?: boolean
	className?: string
}

export const MDDetail = (props: IPropsDetail) => {
	// const dispatch = useDispatch();
	const mdContext = useContext(MDContext)

	const checkPath = mdContext.baseFullPath + '/' + (props.panel ?? '').replace(/\s+/g, '')

	const activated =
		(props.panel &&
			!props.hidden &&
			(window.location.pathname.startsWith(checkPath + '/') || window.location.pathname === checkPath)) ||
		(!props.panel && window.location.pathname === mdContext.baseFullPath)

	useEffect(() => {
		if (activated) {
			if (props.panel) {
				if (!props.titleText) {
					console.log('titleText not set on MDDetail!')
				}
				mdContext.setMenuBackItemState((prevState) => {
					const location = window.location.pathname

					const newMenuBackItem: MenuBackItem = {
						menuBackActive: activated,
						menuBackButtonTitle: props.backText ?? mdContext.backText ?? 'Back',
						menuBackButtonURL: mdContext.baseFullPath,
						menuPageTitle: props.titleText ?? 'Detail',
						menuDisplaySize: mdContext.breakAt
					}

					return [...prevState, newMenuBackItem].filter((item) => {
						return item.menuBackButtonURL.length < location.length
					})
				})

				// AddMenuBackItem(menuBackItem)(dispatch)
			}
		}

		return () => {
			mdContext.setMenuBackItemState((prevState) => {
				const location = window.location.pathname

				return [...prevState].filter((item) => {
					return item.menuBackButtonURL.length < location.length
				})
			})
			// CleanMenuBackItem()(dispatch)
		}
	}, [
		/*dispatch, */ activated,
		props.titleText,
		props.panel,
		props.backText,
		mdContext.backText,
		mdContext.baseFullPath,
		mdContext.breakAt
	])

	if (activated) {
		return (
			<div
				className={
					(props.className ?? '') +
					' masterDetailDetail' +
					(window.location.pathname === mdContext.baseFullPath ? ' hideWhenSmall' : '')
				}
				hidden={props.hidden}>
				{props.children}
			</div>
		)
	} else {
		return null
	}
}
