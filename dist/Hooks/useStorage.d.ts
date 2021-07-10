import { SetStateAction } from 'react';
export declare type TStorageStateType = null | string | object | number | boolean | any[];
export declare type TStorageType = 'local' | 'session';
export declare const setStorage: <T>(key: string | null | undefined, newValue: T, remember: TStorageType, defaultValue: T) => void;
export declare const getStorage: <T>(key: string | null | undefined, remember: TStorageType, defaultValue: T) => T;
export declare const useStorage: <T>(key: string | null | undefined, defaultValue: T, remember?: TStorageType) => [T, (val: SetStateAction<T>) => void, () => void];
