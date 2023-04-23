import { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

const useGlobal = <T>(data : BehaviorSubject<T> ): T => {
    const [val, setVal] = useState<T>(data.getValue())

    useEffect(() => {
        const subscription = data.subscribe(setVal)
        return () => subscription.unsubscribe()
    }, [])

    return val
}

export default useGlobal