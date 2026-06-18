import { useSyncExternalStore } from 'react';

export default useOnlineStatus() {
    const isOnline = useSyncExternalStore(
        (callback) => {
            window.addEventListener('online', callback);
            window.addEventListener('offline', callback);

            return () => {
                window.removeEventListener('online', callback);
                window.removeEventListener('offline', callback);
            };
        },
        () => navigator.onLine,
        () => true
    );

    return isOnline;
}