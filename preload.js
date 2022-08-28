const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  sendProfUrl: (url) => ipcRenderer.invoke("send-prof-url",url),
  sendProfData: (data) => ipcRenderer.on("send-prof-data",data)
  // we can also expose variables, not just functions
})