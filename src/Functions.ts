import React from 'react'
import {
	CleanNumber,
	MomentDateString,
	MomentFormatString,
	ReplaceAll
} from '@solidbasisventures/intelliwaketsfoundation'
import moment from 'moment'

export const KEY_UP_ARROW = 38
export const KEY_DOWN_ARROW = 40
export const KEY_LEFT_ARROW = 37
export const KEY_RIGHT_ARROW = 39
export const KEY_SPACE = 32
export const KEY_ENTER = 13
export const KEY_TAB = 9
export const KEY_BACKSPACE = 8
export const KEY_ESCAPE = 27

export const KEY_STRING_ENTER = 'Enter'
export const KEY_STRING_DOWN_ARROW = 'ArrowDown'
export const KEY_STRING_UP_ARROW = 'ArrowUp'
export const KEY_STRING_LEFT_ARROW = 'ArrowLeft'
export const KEY_STRING_RIGHT_ARROW = 'ArrowRight'
export const KEY_STRING_TAB = 'Tab'
export const KEY_STRING_BACKSPACE = 'Backspace'
export const KEY_STRING_ESCAPE = 'Escape'

export const ElementCustomValue = (e: React.ChangeEvent<HTMLInputElement>): any => {
	const target: any = e.target

	if (!!target) {
		const returnValue = target['customValue'] === undefined ? target.value : target.customValue
		if (target.classList.contains('isNumber')) {
			return CleanNumber(returnValue)
		}
		return returnValue
	}

	return null
}

export const ClassNames = (classes: {[key: string]: boolean}): string => {
	return (Object.keys(classes).filter((classitem) => classes[classitem]) ?? []).join(' ')
}

export const HasPathComponent = (search: string): boolean => {
	let searchCalc = search.toLowerCase()

	if (!searchCalc.startsWith('/')) {
		searchCalc = '/' + searchCalc
	}

	if (!searchCalc.endsWith('/')) {
		searchCalc += '/'
	}

	let pathName = window.location.pathname.toLowerCase()
	if (!pathName.endsWith('/')) {
		pathName += '/'
	}

	return pathName.indexOf(searchCalc) >= 0
}

export const GetPathComponentAfter = (search: string): any | undefined => {
	let searchCalc = search.toLowerCase()

	if (!searchCalc.endsWith('/')) {
		searchCalc += '/'
	}

	const startPos = window.location.pathname.toLowerCase().indexOf(searchCalc)

	if (startPos >= 0) {
		const after = window.location.pathname.substr(startPos + searchCalc.length)
		const slashPos = after.toLowerCase().indexOf('/')
		if (slashPos >= 0) {
			return after.substring(0, slashPos)
		} else {
			return after
		}
	}
	return undefined
}

export const GetPathThrough = (search: string): any | undefined => {
	let searchCalc = search.toLowerCase()

	const startPosSlash = window.location.pathname.toLowerCase().lastIndexOf(searchCalc + '/')

	if (startPosSlash >= 0) {
		return window.location.pathname.substr(0, startPosSlash + searchCalc.length)
	}

	const startPosNoSlash = window.location.pathname.toLowerCase().lastIndexOf(searchCalc)

	if (startPosNoSlash >= 0) {
		const possibleComplete = window.location.pathname.substr(0, startPosNoSlash + searchCalc.length)

		if (possibleComplete.length === window.location.pathname.length) {
			return possibleComplete
		}
	}

	return undefined
}

export const CaptureGPS = (): Promise<Position | null> => {
	return new Promise(async (resolve) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					resolve(position)
				},
				function () {
					resolve(null)
				}
			)
		} else {
			resolve(null)
		}
	})
}

export const DownloadBase64Data = (fileName: string, base64: string, type: string) => {
	if (!!window.navigator.msSaveBlob) {
		// IE
		const byteCharacters = atob(base64.replace(/^[^,]+,/, '').replace(/\r\n/g, ''))

		let byteNumbers = new Array(byteCharacters.length)

		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i)
		}

		const byteArray = new Uint8Array(byteNumbers)

		const blob = new Blob([byteArray], {type: type})

		window.navigator.msSaveOrOpenBlob(blob, fileName)
	} else {
		const link = document.createElement('a')
		link.href = base64
		link.setAttribute('download', fileName)
		document.body.appendChild(link)
		link.click()
	}
}

export const CopyRefToClipboard = (ref: any, tryFormatted = true): boolean => {
	if (ref && ref.current && document.createRange && window.getSelection) {
		let range = document.createRange()
		let sel = window.getSelection()
		if (sel) {
			// unselect any element in the page
			sel.removeAllRanges()

			let ths = ref.current.getElementsByTagName('th') as any[]
			for (let i = 0; i < ths.length; i++) {
				ths[i].setAttribute('copyuserselect', ths[i].style.userSelect)
				ths[i].style.userSelect = 'auto'
			}
			let tds = ref.current.getElementsByTagName('td') as any[]
			for (let i = 0; i < tds.length; i++) {
				tds[i].setAttribute('copyuserselect', tds[i].style.userSelect)
				tds[i].style.userSelect = 'auto'
			}
			let brs = ref.current.getElementsByTagName('br') as any[]
			for (let i = 0; i < brs.length; i++) {
				brs[i].setAttribute('copyuserdisplay', brs[i].style.display)
				brs[i].style.display = 'none'
			}
			let hrs = ref.current.getElementsByTagName('hr') as any[]
			for (let i = 0; i < hrs.length; i++) {
				hrs[i].setAttribute('copyuserdisplay', hrs[i].style.display)
				hrs[i].style.display = 'none'
			}

			if (tryFormatted) {
				try {
					range.selectNode(ref.current as any)
					sel.addRange(range)
				} catch (e) {
					range.selectNodeContents(ref.current as any)
					sel.addRange(range)
				}
			} else {
				range.selectNodeContents(ref.current as any)
				sel.addRange(range)
			}

			document.execCommand('copy')

			sel.removeAllRanges()

			for (let i = 0; i < ths.length; i++) {
				ths[i].style.userSelect = ths[i].getAttribute('copyuserselect')
				ths[i].removeAttribute('copyuserselect')
			}
			for (let i = 0; i < tds.length; i++) {
				tds[i].style.userSelect = tds[i].getAttribute('copyuserselect')
				tds[i].removeAttribute('copyuserselect')
			}
			for (let i = 0; i < brs.length; i++) {
				brs[i].style.display = brs[i].getAttribute('display')
				brs[i].removeAttribute('copyuserdisplay')
			}
			for (let i = 0; i < hrs.length; i++) {
				hrs[i].style.display = hrs[i].getAttribute('display')
				hrs[i].removeAttribute('copyuserdisplay')
			}

			return true
		}
	}
	return false
}

export const TableIDToExcel = (tableID: string, fileName?: string, appendDateTime = true) => {
	let downloadLink
	let dataType = 'application/vnd.ms-excel'
	let tableSelect = document.getElementById(tableID) as any
	let tableHTML = tableSelect.outerHTML.replace(/ /g, '%20')

	// Specify file name
	let filename = `${fileName ?? tableID}${
		appendDateTime ? `-${MomentDateString(moment())}_${MomentFormatString(moment(), 'HH-MM-SS')}` : ''
	}.xls`

	// Create download link element
	downloadLink = document.createElement('a')

	document.body.appendChild(downloadLink)

	if (navigator.msSaveOrOpenBlob) {
		let blob = new Blob(['\ufeff', tableHTML], {
			type: dataType
		})
		navigator.msSaveOrOpenBlob(blob, filename)
	} else {
		tableHTML = ReplaceAll('<br>', encodeURI('\r'), tableHTML)
		// Create a link to the file
		downloadLink.href = 'data:' + dataType + ', ' + tableHTML
		// Setting the file name
		downloadLink.download = filename

		//triggering the function
		downloadLink.click()
	}
}

export type TBootStrapSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TBootStrapExtendedSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

export const SizeAtMin = (size: TBootStrapExtendedSizes): number => {
	switch (size) {
		case 'xs':
			return 0
		case 'sm':
			return 576
		case 'md':
			return 768
		case 'lg':
			return 992
		case 'xl':
			return 1200
		case 'xxl':
			return 1300
		case 'xxxl':
			return 1400
	}
}

export const SizeAtMax = (size: TBootStrapExtendedSizes): number => {
	switch (size) {
		case 'xs':
			return 575.98
		case 'sm':
			return 767.98
		case 'md':
			return 991.98
		case 'lg':
			return 1199.98
		case 'xl':
			return 1299.98
		case 'xxl':
			return 1399.98
		case 'xxxl':
			return 999999
	}
}
