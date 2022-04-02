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
    async guardar(producto) {
       
        const dataJSON = await this.leer();

        let data = JSON.parse(dataJSON)
        producto.id = data.length + 1
        data.push(producto);

        try {
            await fs.promises.writeFile(this.nombre, JSON.stringify(data));
            return `Producto ${producto.title} fué guardado en archivo ${miArchivo.nombre} `;
        } catch (error) {
            return (console.log(error));
        }
    }

    async borrar() {
        try {
            await fs.promises.unlink(this.nombre);
            return `Archivo ${miArchivo.nombre} borrado`;
        } catch (error) {
            return 'Error al borrar el archivo';
        }
    }
};

const producto01 = {
    title: 'iPhone 11 64 GB (Product)Red',
    price: 159000,
    thumbnail: 'a001.jpg'
}
const producto02 = {
    title: 'iPhone 12 64 GB azul',
    price: 200000,
    thumbnail: 'a002.jpg'
}
const producto03 = {
    title: 'iPhone XR 64 GB negro',
    price: 139000,
    thumbnail: 'a003.jpg'
}
const producto04 = {
    title: 'iPhone 8 64 GB oro',
    price: 98999,
    thumbnail: 'a004.jpg'
}

const miArchivo = new Archivo("./productos.txt")

async function operaciones() {
    
    console.log(JSON.parse(await miArchivo.leer()))
    await miArchivo.guardar(producto01)
    await miArchivo.guardar(producto02)
    console.log(JSON.parse(await miArchivo.leer()))
    await miArchivo.borrar()
    await miArchivo.guardar(producto03)
    await miArchivo.guardar(producto04)
    await miArchivo.guardar(producto01)
    await miArchivo.guardar(producto02)
    console.log(JSON.parse(await miArchivo.leer()))

}

operaciones()