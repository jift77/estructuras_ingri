'use strict' //uso de use strict para evtar problemas futuros
// ventana vacia

//instancia de los oobjetos app y BrowserWindow
import {app, BrowserWindow} from 'electron'

// importar tambien el compile electron, estas herrmientas se corren 
//solo en el entorno de ejecucion de desarrollo, para eso se va a detectar
//cundo estamos en el proceso de desarrollo con un if
import devtools from './devtools'

if (process.env.NODE_ENV === 'development'){ //la variable entorno hay q configurarla
                                            //para que diga q es = a development
                                            //y si se cumple se ejecuta la funcion de devtools
    devtools()

}

// imprime un mensaje en la consola antes de salir
app.on('before-quit', () => {
   console.log('saliendo..')

})

// ejecutando ordenes cuando la app esta lista
app.on('ready', () => {
    //creand una ventana
   let win = new BrowserWindow({
   width: 800,
   height: 600,
   title: 'Taller ED 2',
   center:true,
   maximizable:false,
   show:false
})
win.once('ready-to-show',() => {
    win.show()
})

// detectando el cierre de la ventana para cerrar el app
win.on('closed',() => {
  win:null
  app.quit()
})

win.loadURL(`file://${__dirname}/index.html`)
})