import { SetStateAction, useEffect, useState } from 'react'

function useLocalStorage<T>(key: string, initialValue?: T | (() => T)): [value: T, setValue: React.Dispatch<SetStateAction<T>>] {

    const [value, setValue] = useState<T>(() => {
        
        // @ts-ignore
        const newValue = typeof initialValue === 'function' ? initialValue() : initialValue

        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : newValue
        } catch (error) {
            console.error(error)
            return newValue
        }
        
    })


    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export default useLocalStorage