// express
// bodyparser (npm install express body-parser --save"
// importar
const express = require('express');
const bodyparser = require('body-parser');
// inicialización
const app = express();

app.use(bodyparser.json());

// ruta de ejemplo
/* app.get('/', (req, res) => {
    res.send("hola con node.js");
}); */

let items = ['manzana', 'papaya', 'limon'];
app.get('/', (req, res) => {
    res.send("Hola con node.js");
});

// endpoint 1 / rutas GET
app.get('/items', (req, res) => {
    res.status(200).json(items);
});

// endpoint 1.2 / rutas GET con ID
app.get('/items/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (!isNaN(id) && id >= 0 && id < items.length) {
        let fruta = items[id];
        res.status(200).send(fruta);
    } else {
        res.status(404).send("No se encontró la fruta con el identificador proporcionado");
    }
});

// endpoint 2 / rutas POST
app.post('/items', (req, res) => {
    const fruta = req.body;
    if (fruta) {
        items.push(fruta.item);
        res.status(200).send(`Se agregó la fruta: ${fruta.item} \n Lista: ${JSON.stringify(items)}`);
    } else {
        res.status(400).send("El item es inválido");
    }
});

// endpoint 3 / rutas PUT
app.put('/items/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (!isNaN(id) && id >= 0 && id < items.length) {
        let updatedItem = req.body.item;
        if (updatedItem) {
            items[id] = updatedItem;
            res.status(200).send(`Se actualizó la fruta en la posición ${id}: ${updatedItem}\n Lista: ${JSON.stringify(items)}`);
        } else {
            res.status(400).send("El item es inválido");
        }
    } else {
        res.status(404).send("No se encontró la fruta con el identificador proporcionado");
    }
});

// endpoint 4 / rutas DELETE
app.delete('/items/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (!isNaN(id) && id >= 0 && id < items.length) {
        let deletedItem = items.splice(id, 1);
        res.status(200).send(`Se eliminó la fruta en la posición ${id}: ${deletedItem} \n Lista: ${JSON.stringify(items)}`);
    } else {
        res.status(404).send("No se encontró la fruta con el identificador proporcionado");
    }
});

// escuchar en el puerto 3000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { console.log(`Servicor en funcionamiento: ${PORT}`) });