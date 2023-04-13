import { useState, useEffect } from "react";
import { Observable } from "rxjs";

const useGlobal = <T>(data : Observable<T>, initialValue: T): T => {
    const [val, setVal] = useState<T>(initialValue)

    useEffect(() => {
        const subscription = data.subscribe(setVal)
        return () => subscription.unsubscribe()
    }, [])

    return val
}

export default useGlobal