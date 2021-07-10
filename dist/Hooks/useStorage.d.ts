import { SetStateAction } from 'react';
export declare type TStorageStateType = null | string | object | number | boolean | any[];
export declare type TStorageType = 'local' | 'session';
export declare const setStorage: <T>(key: string, newValue: T, remember: TStorageType, defaultValue: T) => void;
export declare const getStorage: <T>(key: string, remember: TStorageType, defaultValue: T) => T;
export declare const useStorage: <T>(key: string, defaultValue: T, remember?: TStorageType) => [T, (val: SetStateAction<T>) => void, () => void];
