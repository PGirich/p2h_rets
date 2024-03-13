import { ChangeEvent, useState } from "react"

const useInput = (initialValue:string, regExp : string = '') => {
    const [value,setValue] = useState(initialValue)
    return {
        value,
        pattern: regExp,
        onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value.toUpperCase())
    }
}
export default useInput