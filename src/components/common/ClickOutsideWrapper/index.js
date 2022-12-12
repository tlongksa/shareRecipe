import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useOutsideHandler(ref, cb, idToIgnore) {
    useEffect(() => {
        function handleClickOutside(e) {
            const target = e.target;
            const wrapperElementToIgnore = document.getElementById(idToIgnore || '');
            const shouldPreventCallback = wrapperElementToIgnore?.contains(target);
            if (ref.current && !ref.current.contains(target) && !shouldPreventCallback) {
                cb();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, cb, idToIgnore]);
}

function ClickOutsideWrapper({ children, cb, idToIgnore }) {
    const ref = useRef(null);

    useOutsideHandler(ref, cb, idToIgnore);

    return <div ref={ref}>{children}</div>;
}

export default ClickOutsideWrapper;
