const fs = require('fs');
class Archivo {
    constructor(nombre) {
        this.nombre = nombre;
    }
    async leer() {
        try {
            return await fs.promises.readFile(this.nombre, 'utf-8') || "[]";
        } catch (error) {
            console.log('No existe el archivo :' + this.nombre)
            return "[]";
        }
    }
    async guardar(contenido) {
        const dataJSON = await this.leer();
        let data = JSON.parse(dataJSON)

        data.push(contenido);
        try {
            await fs.promises.writeFile(this.nombre, JSON.stringify(data))
        } catch (error) {
            return (console.log(error));
        }
    }
    async crearArchivo(contenido) {
        try {
            await fs.promises.writeFile(this.nombre, JSON.stringify(contenido));
        } catch (error) {
            return (console.log(error));
        }
    }
    async borrar() {
        try {
            await fs.promises.unlink(this.nombre);
        } catch (error) {
            return 'Error al borrar el archivo';
        }
    }
};

const archivoProductos = new Archivo("./archivo/productos.txt")
const archivoCarrito = new Archivo("./archivo/carrito.txt")
async function file(nombre, operacion, contenido) {
    if (nombre == "productos") {

        if (operacion == "guardar") {
            await archivoProductos.guardar(contenido)
        }
        if (operacion == "leer") {
            return global.arrayProductos = (JSON.parse(await archivoProductos.leer()))
        }
        if (operacion == "borrar") {
            await archivoProductos.borrar()
        }
        if (operacion == "crear") {
            await archivoProductos.crearArchivo(contenido)
        }
    }
    if (nombre == "carrito") {

        if (operacion == "guardar") {
            await archivoCarrito.guardar(contenido)
        }
        if (operacion == "leer") {

            return global.arrayCarrito = (JSON.parse(await archivoCarrito.leer()))
        }
        if (operacion == "borrar") {

            await archivoCarrito.borrar()
        }
        if (operacion == "crear") {
            await archivoCarrito.crearArchivo(contenido)
        }
    }
}

module.exports = file

