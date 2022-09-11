import {useEffect, useRef} from "react";

// snatched
// god blessing
export const useObserver = (ref, canLoad, isLoading, callback) => {
    const observer = useRef();

    useEffect(() => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();

        var cb = function(entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
    }, [isLoading])
}