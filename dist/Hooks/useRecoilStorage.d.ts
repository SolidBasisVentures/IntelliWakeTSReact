import { SetStateAction } from 'react';
import { RecoilState } from 'recoil';
import { TStorageStateType, TStorageType } from './useStorage';
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
export declare const useRecoilStorageState: <T extends TStorageStateType>(atom: RecoilState<T>, remember?: TStorageType) => [T, (val: SetStateAction<T>) => void, () => void];
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
export declare const useRecoilStorageValue: <T extends TStorageStateType>(atom: RecoilState<T>, remember?: TStorageType) => T;
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
export declare const useSetRecoilStorageState: <T extends TStorageStateType>(atom: RecoilState<T>, remember?: TStorageType) => (val: SetStateAction<T>) => void;
