import { useState, useCallback } from 'react';

interface UseControllableStateParams<T> {
    prop?: T;
    defaultProp?: T;
    onChange?: (state: T) => void;
}

export function useControllableState<T>({
    prop,
    defaultProp,
    onChange = () => {},
}: UseControllableStateParams<T>) {
    const [uncontrolledProp, setUncontrolledProp] = useState(defaultProp);
    const isControlled = prop !== undefined;
    const value = isControlled ? prop : uncontrolledProp;

    const setValue = useCallback(
        (nextValue: T | ((prevState: T) => T)) => {
            const resolvedValue =
                typeof nextValue === 'function'
                    ? (nextValue as (prevState: T) => T)(value as T)
                    : nextValue;
            if (!isControlled) {
                setUncontrolledProp(resolvedValue);
            }
            onChange(resolvedValue);
        },
        [isControlled, onChange, value],
    );

    return [value, setValue] as const;
}
