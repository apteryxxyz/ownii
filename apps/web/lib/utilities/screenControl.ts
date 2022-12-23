/** Hide the navbar, footer and border spacing. */
export function goFullscreen() {
    for (const selector of ['#navigation-bar', '#banner-bar', '#footer-bar']) {
        const element = document.querySelector(selector);
        if (element) element.classList.add('hidden');
    }

    const main = document.querySelector('#content');
    if (main) main.classList.remove('max-w-8xl', 'p-3');
    document.body.style.overflow = 'hidden';
}

/** Show the navbar, footer and border spacing. */
export function goMinimised() {
    for (const selector of ['#navigation-bar', '#banner-bar', '#footer-bar']) {
        const element = document.querySelector(selector);
        if (element) element.classList.remove('hidden');
    }

    const main = document.querySelector('#content');
    if (main) main.classList.add('max-w-8xl', 'p-3');
    document.body.style.overflow = 'auto';
}

const contextMenuListener = (event: MouseEvent) => {
    event.preventDefault();
};

const inspectElementListener = (event: KeyboardEvent) => {
    if (
        event.key === 'F12' ||
        (event.ctrlKey &&
            (event.key === 'U' ||
                (event.shiftKey &&
                    (event.key === 'I' ||
                        event.key === 'C' ||
                        event.key === 'J' ||
                        event.key === 'U'))))
    )
        event.preventDefault();
};

/** Disable the normal ways to access the dev tools. */
export function disableInspectElement(onBlur?: () => void) {
    document.addEventListener('contextmenu', contextMenuListener);
    document.addEventListener('keydown', inspectElementListener);
    if (onBlur) window.addEventListener('blur', onBlur);
}

/** Enable the normal ways to access the dev tools. */
export function enableInspectElement(onBlur?: () => void) {
    document.removeEventListener('contextmenu', contextMenuListener);
    document.removeEventListener('keydown', inspectElementListener);
    if (onBlur) window.removeEventListener('blur', onBlur);
}
