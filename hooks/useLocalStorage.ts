import { useCallback, useState } from 'react'

type Dispatch<A> = (action: A) => void
type SetAction<S> = S | ((prevState: S) => S)

function useLocalStorage<T>(key: string, initialValue?: T): [value: T, set: Dispatch<SetAction<T>>] {
    
    const [value, setValue] = useState<T>(() => {
        if (typeof window === undefined) return initialValue

        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            return initialValue
        }
        
    })

    const set = useCallback((newValue: T) => {
        setValue(newValue)
        try {
            localStorage.setItem(key, JSON.stringify(newValue))
        } catch (error) {}
    }, [key])

    return [value, set]
}

export default useLocalStorage