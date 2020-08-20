const { app, BrowserWindow } = require('electron')

const path = require('path')

function createWindow() {
  var executablePath = 'python3 ./resources/app/argoui/app.py';
  var child = require('child_process').exec;
  child(executablePath, function (err, data) {
    if (err) {
      console.error(err);
      console.log(data.toString());
      var executablePath = 'python3 ./argoui/app.py';
      var child = require('child_process').exec;
      child(executablePath, function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
      }); 
    }
  });
  
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 620,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadFile("index.html")
  function loadflask() {
    const urlExist = require("url-exist");
    (async () => {
      const exists = await urlExist("http://127.0.0.1:5000/");
      mainWindow.loadURL('http://127.0.0.1:5000/')
    })();
  }

  setTimeout(loadflask, 4000);
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', function () {
    const { exec } = require('child_process');
    exec('pkill -9 python', (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return;
      }
      // the *entire* stdout and stderr (buffered) 
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);

    });

  });

}
// This method will be called when Electron has finished 
// initialization and is ready to create browser windows. 
// Some APIs can only be used after this event occurs. 
app.whenReady().then(createWindow)
// Quit when all windows are closed. 
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar 
  // to stay active until the user quits explicitly with Cmd + Q 
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the 
  // dock icon is clicked and there are no other windows open. 
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


// In this file you can include the rest of your app's specific main process 

// code. You can also put them in separate files and require them here. 

