import React from 'react'
import {CleanNumber} from '@solidbasisventures/intelliwaketsfoundation'

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

export const GetPathComponentAfter = (search: string): string | undefined => {
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

export const GetPathThrough = (search: string): string | undefined => {
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
