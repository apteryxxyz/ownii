/** Get a cookie from the document by its name. */
export function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
}

/** Set a cookie on the document. */
export function setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

/** Remove a cookie from the document. */
export function removeCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

/** Remove all cookies from the document. */
export function clear() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.slice(0, Math.max(0, eqPos)) : cookie;
        removeCookie(name);
    }
}

/** A structure to mimic the localStorage API but for cookies. */
export const documentCookie = {
    getItem: getCookie,
    setItem: setCookie,
    removeItem: removeCookie,
    clear,
};
