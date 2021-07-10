import {SetStateAction} from 'react'
import {RecoilState, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import {getStorage, setStorage, TStorageStateType, TStorageType} from './useStorage'

/**
 *
 * A Recoil-based hook that persists the value in the browsers LocalStorage (by default), or SessionStorage (optionally).  If the value is changed in one component, it will use Recoil to update all other components subscribed to it.
 *
 * @param atom
 * @param {"local" | "session"} remember
 * @returns [(TRecoilStorageStateType), ((val: React.SetStateAction<TRecoilStorageStateType>) => void), (() => void)]
 *
 * @example
 *
 * const [myValue, setMyValue, clearMyValue] = useRecoilStorageState(myAtom, 'local')
 *
 * setMyValue('MyNewValue') // Changes the value
 *
 * console.log(myValue) // Prints 'MyNewValue'
 *
 * clearMyValue() // Clears the value
 *
 */
export const useRecoilStorageState = <T extends TStorageStateType>(
	atom: RecoilState<T>,
	remember: TStorageType = 'local'
): [T, (val: SetStateAction<T>) => void, () => void] => {
	const [value, setValue] = useRecoilState(atom)

	const key = atom.key

	const saveValue = (val: SetStateAction<T>) => {
		if (typeof val === 'function') {
			setValue((prevState) => {
				const newValue = val(getStorage(key, remember, prevState))

				setStorage(key, newValue, remember, null)

				return newValue
			})
		} else {
			setStorage(key, val, remember, null)

			setValue(val)
		}
	}

	const currentValue = getStorage(key, remember, value) as T

	return [currentValue, saveValue, () => saveValue(null as T)]
}

/**
 *
 * A Recoil-based hook that returns the value that was persisted in the browsers LocalStorage (by default), or SessionStorage (optionally).  If the value is changed in one component, it will use Recoil to update all other components subscribed to it.
 *
 * @param atom
 * @param {"local" | "session"} remember
 * @returns TStorageStateType
 *
 * @example
 *
 * const myValue = useRecoilStorageValue(myAtom, 'local')
 *
 * console.log(myValue) // Prints 'MyNewValue'
 *
 */
export const useRecoilStorageValue = <T extends TStorageStateType>(
	atom: RecoilState<T>,
	remember: TStorageType = 'local'
): T => {
	const value = useRecoilValue(atom) as T

	return getStorage(atom.key, remember, value)
}

/**
 *
 * A Recoil-based hook that sets the persisted value in the browsers LocalStorage (by default), or SessionStorage (optionally) without re-rendering on every change.  If the value is changed in one component, it will use Recoil to update all other components subscribed to it.
 *
 * @param atom
 * @param {"local" | "session"} remember
 * @returns TStorageStateType
 *
 * @example
 *
 * const setMyValue = useSetRecoilStorageState(myAtom, 'local')
 *
 * setMyValue('MyNewValue') // Changes the value
 *
 */
export const useSetRecoilStorageState = <T extends TStorageStateType>(
	atom: RecoilState<T>,
	remember: TStorageType = 'local'
): ((val: SetStateAction<T>) => void) => {
	const setValue = useSetRecoilState(atom)

	return (val: SetStateAction<T>) => {
		if (typeof val === 'function') {
			setValue((prevState) => {
				const newValue = val(getStorage(atom.key, remember, prevState))

				setStorage(atom.key, newValue, remember, null)

				return newValue
			})
		} else {
			setStorage(atom.key, val, remember, null)

			setValue(val)
		}
	}
}
