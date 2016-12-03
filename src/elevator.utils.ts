export function offset(elem: HTMLElement) {
    let docElem: HTMLElement, rect: ClientRect, doc: Document;

    if (!elem) {
        return;
    }

    // Support: IE <=11 only
    // Running getBoundingClientRect on a
    // disconnected node in IE throws an error
    if (!elem.getClientRects().length) {
        return { top: 0, left: 0 };
    }

    rect = elem.getBoundingClientRect();

    // Make sure element is not hidden (display: none)
    if (rect.width || rect.height) {
        doc = elem.ownerDocument;
        docElem = doc.documentElement;

        return {
            top: rect.top + window.pageYOffset - docElem.clientTop,
            left: rect.left + window.pageXOffset - docElem.clientLeft
        };
    }

    // Return zeros for disconnected and hidden elements (gh-2310)
    return rect;
}
