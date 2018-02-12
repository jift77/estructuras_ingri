function registro(codigo, producto)
{
    this.codigo = codigo;
    this.producto = producto;
}

var model  = function ()
{
    this.codigo = ko.observable("")
    this.producto = ko.observable("")

    this.registros = ko.observableArray([
        new registro('1','televisor'),
        new registro('2','radio')
    ])

    this.add = function () {
        this.registros.push(new registro(this.codigo(), this.producto()))
        //console.log(self)
    }.bind(this)
}

$(document).ready(() => {
    ko.applyBindings(new model())
});

