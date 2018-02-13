import fs from 'fs'

// Clase producto y los atribtos de la clase
function producto(codigo, nombre)
{
    this.codigo = codigo;
    this.nombre = nombre;

    this.ConvetirmeEnPlano = function(){
        return `${this.codigo},${this.nombre}\n`
    }
}

// model es para manipular mas facil los datos entre javascript y html
var model  = function ()
{
    // variables q contienen los valores que se ingresan en pantalla 
    this.codigo = ko.observable("")
    this.nombre = ko.observable("")

    this.productos = ko.observableArray([
        //new producto('1','televisor'),
        //new producto('2','radio')
    ])

    this.add = function () {
        //this.productos.push(new producto(this.codigo(), this.nombre()))
        alert('algo')
        console.log(self)
        let productoAInsertar = new producto(this.codigo(), this.nombre());
        fs.appendFileSync('tabla.txt',productoAInsertar.ConvetirmeEnPlano())
        fs.readFile('tabla.txt','utf-8',(err,data)=> {
            this.productos.removeAll();
            let array = data.toString().split("\n");
            let la = array.length;
            for(let i = 0; i < la; i++) 
            {
                let registro = array[i].split(',');
                this.productos.push(new producto(registro[0],registro[1]));
            }
        })
    }.bind(this)

    this.leerArchivo = function()
    {
        fs.readFile('tabla.txt','utf-8',(err,data)=> {
            this.productos.removeAll();
            let array = data.toString().split("\n");
            let la = array.length;
            for(let i = 0; i < la; i++) 
            {
                let registro = array[i].split(',');
                this.productos.push(new producto(registro[0],registro[1]));
            }
        })
    }.bind(this)

    function actualizarInterfaz() {
        fs.readFile('tabla.txt','utf-8',(err,data)=> {
            this.productos.removeAll();
            let array = data.toString().split("\n");
            let la = array.length;
            for(let i = 0; i < la; i++) 
            {
                let registro = array[i].split(',');
                this.productos.push(new producto(registro[0],registro[1]));
            }
        })
    } 
}

$(document).ready(() => {
    ko.applyBindings(new model())
});

