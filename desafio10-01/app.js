const express = require('express')
const fs = require('fs')

const app = express()

app.get('/products', async(req, res) => {
    //Se intenta leer el archivo products.json, en caso de existir lanzara un error
    try {
        let products = await fs.promises.readFile('./productos.json', 'utf-8')
        let parsedProducts = JSON.parse(products)
        const limit = parseInt(req.query.limit);

        //Si el limite del req.query de la url no un numero, se devolverá el JSON de productos completo 
        if (!isNaN(limit) && limit > 0) {
            let limitedProducts = parsedProducts.slice(0, limit);
            if (limitedProducts) {
                res.json(limitedProducts);
            } 
        } else {
            res.json(parsedProducts);
        }
    } catch (error) {
        res.status(500).send(`Internal Server ${error}`);
    }
});

app.get('/products/:pid', async(req, res) => {
    //Se intenta leer el archivo products.json, en caso de existir lanzara un error
    try {
        let products = await fs.promises.readFile('./productos.json', 'utf-8')
        let parsedProducts = JSON.parse(products)
        const requestId = req.params.pid;

        //Se busca un ID que coincida con el ingresado en la url
        //Si no existe, se devolvera un error
        let product = parsedProducts.find((u) => u.id == requestId);
        if (!product) {
            return res.send({ error: "Product not found" });
        } else {
            return res.send(product);
        }
    } catch (error) {
        res.status(500).send(`Internal Server ${error}`);
    }
});

app.listen(8080, ()=>console.log("Server online"))
