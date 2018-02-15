import fs from 'fs'

// Clase producto y los atribtos de la clase
function producto(codigo, nombre, activo)
{
    this.codigo = codigo;
    this.nombre = nombre;
    this.activo = activo

    this.ConvetirmeEnPlano = function(){
        return `${this.codigo},${this.nombre},${this.activo}\r\n`
    }

    this.toBool = function() {
        return this.activo.trim() == "true"
    } 
}

// model es para manipular mas facil los datos entre javascript y html
var model  = function ()
{
    var _this = this;

    // variables q contienen los valores que se ingresan en pantalla 
    this.codigo = ko.observable("")
    this.nombre = ko.observable("")

    this.productos = ko.observableArray([])

    this.insertar = function () {
        let existe = ko.utils.arrayFirst(this.productos(), (producto) => {
            return producto.codigo == _this.codigo()
        })

        if(existe != null)
        {
            alert('Este codigo ya existe')
            return
        }

        let productoAInsertar = new producto(this.codigo(), this.nombre(), true);
        fs.appendFileSync('tabla.txt', productoAInsertar.ConvetirmeEnPlano())
        this.leerArchivo()
    }

    this.borrar = function(){        
        let existe = ko.utils.arrayFirst(this.productos(), (producto) => {
            return producto.codigo == _this.codigo()
        })
        if(existe != null){
            existe.activo = false;
            let registros =  ''
            
            ko.utils.arrayForEach(this.productos(), (p) => {
                registros += p.ConvetirmeEnPlano();
            })
            fs.writeFile('tabla.txt',registros,'utf-8',(err) =>{
                console.log(err)
            })
            this.leerArchivo()
        }
        else
            alert('Este codigo no existe')
    }

    this.leerArchivo = function()
    {
        fs.readFile('tabla.txt','utf-8',(err,data)=> {
            _this.productos.removeAll();
            let array = data.toString().split("\n");
            let la = array.length;
            for(let i = 0; i < la; i++) 
            {
                if(array[i].length > 0)
                {
                    let registro = array[i].split(',');
                    _this.productos.push(new producto(registro[0],registro[1], registro[2]));
                }
            }
        })
    }
}

$(document).ready(() => {
    ko.applyBindings(new model())
});

