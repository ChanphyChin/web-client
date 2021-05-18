export const IframeManager = {
    src: `${process.env.REACT_APP_IFRAME_ROOT}/#/pages/index/index`,
    callback: (message: any) => {},
    postMessage(message: any) {
        window.parent.postMessage(message,'*');
    },
    subscrib(callback: (message: any) => void) {
        this.callback = callback;
        window.addEventListener("message", callback, false);
    },
    unSubscrib() {
        window.removeEventListener("message", this.callback);
    }
}