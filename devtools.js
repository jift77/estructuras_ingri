// modulo nuevo para activar otra funcion de dev compile
import {enableLiveReload} from 'electron-compile'
// exportar un modulo con e nombre devtools
module.exports = function devtools() {
   enableLiveReload()

}
