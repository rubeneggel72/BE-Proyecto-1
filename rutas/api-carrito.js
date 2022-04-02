const express = require('express')
const router = express.Router();
const file = require('../archivo/archivo')
const getDateTime = require('../util/fecha-hora.js')

router.get('/', (req, res) => {
    let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: carrito/ metodo GET no autorizado' }); }
    else {
        if (arrayCarrito.length > 0) {
            res.send(arrayCarrito);
        }
        else {
            res.send({ error: 'No hay products cargados en carrito' });
        }
    }
})

router.get('/:id', (req, res) => {
    let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: carrito/:id metodo GET no autorizado' }); }
    else {
        let id = parseInt(req.params.id)
        let idx = getindex(id)
        let product = arrayCarrito[idx]
        if (product != undefined) {
            res.send(product);
            return
        }
        else {
            res.send({ error: 'product no encontrado' });
        }
        res.send(JSON.stringify(product));
    }
})

router.post('/', (req, res) => {
    let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: carrito/ metodo POST no autorizado' }); }
    else {
        var id = 1
        if (arrayCarrito.length > 0) {
            id = arrayCarrito[arrayCarrito.length - 1].id + 1
        }
        req.body.id = id
        req.body.timestamp = getDateTime()
        arrayCarrito.push(req.body)
        file("carrito", "guardar", req.body)
        res.send(req.body);
    }
})

router.put('/:id', (req, res) => {
    let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: carrito/:id metodo PUT no autorizado' }); }
    else {
        let id = parseInt(req.params.id)
        let idx = getindex(id)
        let product = arrayCarrito[idx]
        if (product != undefined) {
            req.body.id = id
            arrayCarrito[idx] = req.body
            file("productos", "borrar")
            file("productos", "crear", arrayCarrito)
            res.send(req.body);
        }
        else {
            res.send({ error: 'product no encontrado' });
        }
    }
})

router.delete('/:id', (req, res) => {
    let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: carrito/:id metodo DELETE no autorizado' }); }
    else {
        let id = parseInt(req.params.id)
        let idx = getindex(id)
        let product = arrayCarrito[idx]

        if (product != undefined) {
            arrayCarrito.splice(idx, 1);
            res.send(product);
            file("carrito", "borrar")
            file("carrito", "crear", arrayCarrito)
            return
        }
        else {
            res.send({ error: 'product no encontrado' });
        }
    }
})

function getindex(id) {
    var index = -1;
    arrayCarrito.filter(function (product, i) {
        if (product.id === id) {
            index = i;
        }
    });
    return index;
}

module.exports = router