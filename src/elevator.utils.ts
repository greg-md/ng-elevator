export function offset(element: HTMLElement) {
  // Support: IE <=11 only
  // Running getBoundingClientRect on a
  // disconnected node in IE throws an error
  if (!element || !element.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  let docElem: HTMLElement, rect: ClientRect, doc: Document;

  rect = element.getBoundingClientRect();

  // Make sure element is not hidden (display: none)
  if (rect.width || rect.height) {
    doc = element.ownerDocument;
    docElem = doc.documentElement;

    return {
      top: rect.top + window.pageYOffset - docElem.clientTop,
      left: rect.left + window.pageXOffset - docElem.clientLeft
    };
  }

  // Return zeros for disconnected and hidden elements (gh-2310)
  return rect;
}
