// setTimeout max accepted value for the interval parameter is max signed 32-bit integer.
// Any greater value will be treated as 0 and invoke callback immediately.
const maxTimeout = Math.pow(2, 31) - 1;

function onDate(callback, timestamp = Date.now(), maxInterval = Infinity) {
    let timeoutId;
    const cleanup = [() => clearTimeout(timeoutId)];
    const cancel = () => {
        cleanup.forEach(fn => fn());
        cleanup.length = 0;
    };

    // Check if timestamp has passed. If it does not - schedule a timeout for next check.
    const checkFn = (forceTimeout) => {
        clearTimeout(timeoutId);
        const diff = Math.max(/** @type {any} */(timestamp) - Date.now(), 0);
        if (diff === 0 && forceTimeout !== true) {
            try {
                cancel();
                callback();
            } catch (error) {
                reportError(error);
            }
        } else {
            timeoutId = setTimeout(checkFn, Math.min(diff, maxInterval, maxTimeout));
        }
    };

    // List of additional events when timeout should be verified
    // to make sure calllback will be called ASAP when browser/tab wakes from sleep.
    ['focus', 'online', 'pageshow'].forEach((eventName) => {
        addEventListener(eventName, checkFn, true);
        cleanup.push(() => removeEventListener(eventName, checkFn, true));
    });

    // Force timeout to call callback on next loop even when timeout is 0
    // and also start checking loop
    checkFn(true);

    return cancel;
}

function setDelay(callback, timeout = 0, maxInterval = Infinity) {
    return onDate(callback, Date.now() + timeout, maxInterval);
}

export { setDelay, onDate };
