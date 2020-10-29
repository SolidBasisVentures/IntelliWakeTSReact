import React from 'react'
import {CleanNumber} from '@solidbasisventures/intelliwaketsfoundation'

export const KEY_UP_ARROW = 38
export const KEY_DOWN_ARROW = 40
export const KEY_LEFT_ARROW = 37
export const KEY_RIGHT_ARROW = 39
export const KEY_SPACE = 32
export const KEY_ENTER = 13
export const KEY_TAB = 9

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
