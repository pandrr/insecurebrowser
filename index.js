const electron = require('electron');
// Module to control application life.

const app = electron.app;
const Menu = electron.Menu;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow(
    {
      width: 1920,
      height: 1080,
      webPreferences: {
      	webSecurity: false,
      	nodeIntegration: true
      }
    });
  // mainWindow.setFullScreen(true);


  var menu = Menu.buildFromTemplate([
      {
          label: 'Menu',
          submenu: [
          {
            label:'goto dev.cables.gl',
            click()
            {
              mainWindow.loadURL('https://dev.cables.gl');
            }
          },
          {
            label:'goto cables.gl',
            click()
            {
              mainWindow.loadURL('https://cables.gl');
            }
          },
          {
            label:'fullscreen',
            click()
            {
              mainWindow.setFullScreen(true);
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click: () => {
              mainWindow.webContents.toggleDevTools();
            },
          },
          { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
          ]
      },
      {
        label: "Edit",
submenu: [
{ label: "Undo", accelerator: "CmdOrCtrl+Z", role: "undo" },
{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", role: "redo" },
{ type: "separator" },
{ label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" },
{ label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" },
{ label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" },
{ label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectAll" }
]}


  ])
  Menu.setApplicationMenu(menu); 

  // and load the index.html of the app.
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));

  mainWindow.setAutoHideMenuBar(true);
mainWindow.loadURL('https://cables.gl');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);

app.on('ready', function()
{
  createWindow();
  // const ret = electron.globalShortcut.register(
  //   'Escape',
  //   function()
  //   {
  //     mainWindow.setFullScreen(false);
  //   });
});

app.on('will-quit', function(){

  // electron.globalShortcut.unregister('Escape');

  electron.globalShortcut.unregisterAll();
});





// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
