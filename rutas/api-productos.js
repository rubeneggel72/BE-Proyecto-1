const express = require('express')
const router = express.Router();
const file = require('../archivo/archivo')
const getDateTime = require('../util/fecha-hora')

router.get('/', (req, res) => {
    let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: producto/ metodo GET no autorizado' }); }
    else {
        if (arrayProductos.length > 0) {
            res.send(arrayProductos);
        }
        else {
            res.send({ error: 'No hay products cargados en lista de productos' });
        }
    }
})

router.get('/:id', (req, res) => {
    let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: producto/:id metodo GET no autorizado' }); }
    else {
        let id = parseInt(req.params.id)
        let idx = getindex(id)
        let product = arrayProductos[idx]
        if (product != undefined) {
            res.send(product);
            return
        }
        else {
            res.send({ error: 'producto no encontrado en lista de productos' });
        }
        res.send(JSON.stringify(product));
    }
})

router.post('/', (req, res) => {
    let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: producto/ metodo POST no autorizado' }); }
    else {
        var id = 1
        if (arrayProductos.length > 0) {
            id = (arrayProductos[arrayProductos.length - 1].id) + 1
        }

        req.body.id = id
        req.body.timestamp = getDateTime()
        arrayProductos.push(req.body)
        file("productos", "guardar", req.body)
        
        res.send(req.body);
    }
})

router.put('/:id', (req, res) => {
    let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: producto/:id metodo PUT no autorizado' }); }
    else {
        let id = parseInt(req.params.id)
        let idx = getindex(id)
        let product = arrayProductos[idx]
        if (product != undefined) {
            req.body.id = id
            arrayProductos[idx] = req.body
            file("productos", "borrar")
            file("productos", "crear", arrayProductos)
            res.send(req.body);
        }
        else {
            res.send({ error: 'producto no encontrado en lista de productos' });
        }
    }
})

router.delete('/:id', (req, res) => {
    let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: producto/:id metodo DELETE no autorizado' }); }
    else {
        let id = parseInt(req.params.id)
        let idx = getindex(id)
        let product = arrayProductos[idx]
        if (product != undefined) {
            arrayProductos.splice(idx, 1);
            res.send(product);
            file("productos", "borrar")
            file("productos", "crear", arrayProductos)
            return
        }
        else {
            res.send({ error: 'producto no encontrado en lista de productos' });
        }
    }
}
)

function getindex(id) {
    var index = -1;
    arrayProductos.filter(function (product, i) {
        if (product.id === id) {
            index = i;
        }
    });
    return index;
}

module.exports = router