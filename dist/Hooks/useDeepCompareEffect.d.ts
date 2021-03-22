import React from 'react';
/**
 * `useDeepCompareEffect` Accepts a function that contains imperative, possibly
 * effectful code.
 *
 * @param effect Imperative function that can return a cleanup function
 * @param dependencies
 * change.
 *
 * Usage note: only use this if `deps` are objects or arrays that contain
 * objects. Otherwise you should just use React.useEffect.
 *
 */
export declare function useDeepCompareEffect(effect: React.EffectCallback, dependencies: React.DependencyList): void;
