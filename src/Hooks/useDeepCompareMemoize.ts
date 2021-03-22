import React from "react";
import _ from 'lodash'

export function checkDeps(deps: React.DependencyList, name: string) {
  const reactHookName = `React.${name.replace(/DeepCompare/, "")}`;

  if (!deps || deps.length === 0) {
    throw new Error(
      `${name} should not be used with no dependencies. Use ${reactHookName} instead.`
    );
  }
}

export function useDeepCompareMemoize(value: React.DependencyList) {
  const ref = React.useRef<React.DependencyList>([]);

  if (!_.isEqual(value, ref.current)) {
    ref.current = {...value};
  }

  return ref.current;
}
