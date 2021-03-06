import React from 'react';
/**
 * `useDeepCompareEffect` will return a memoized version of the callback that
 * only changes if one of the `deps` has changed.
 *
 * Usage note: only use this if `deps` are objects or arrays that contain
 * objects. Otherwise you should just use React.useEffect.
 *
 */
export declare function useDeepCompareCallback<T extends (...args: any[]) => any>(callback: T, dependencies: React.DependencyList): T;
