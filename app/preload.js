const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  ipcRenderer: ipcRenderer,
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  onLyric: (fn) => {
    ipcRenderer.on("currentLyric", (event, ...args) => fn(...args));
  },
  onTranslLyric: (fn) => {
    ipcRenderer.on("currentLyricTrans", (event, ...args) => fn(...args));
  },
  onNextLyric: (fn) => {
    ipcRenderer.on("nextLyric", (event, ...args) => fn(...args));
  },
  cookieGet: (cookieRequest) => {
    return ipcRenderer.invoke("cookie-get", cookieRequest);
  },
  cookieSet: (cookie) => {
    return ipcRenderer.invoke("cookie-set", cookie);
  },
  cookieRemove: (cookie) => {
    return ipcRenderer.invoke("cookie-remove", cookie);
  },
  openAuthWindow: (url) => {
    return ipcRenderer.invoke("open-auth-window", url);
  },
  showOpenDialog: (options) => {
    return ipcRenderer.invoke("show-open-dialog", options);
  },
  readAudioTags: (filePath) => {
    return ipcRenderer.invoke("read-audio-tags", filePath);
  },
});
