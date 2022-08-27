const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  sendAccData: (url) => ipcRenderer.invoke("send-acc-data",url)
  // we can also expose variables, not just functions
})