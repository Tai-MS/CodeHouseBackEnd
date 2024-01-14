const express = require('express')
const fs = require('fs')

const app = express()


// let productsJson = JSON.parse(fs.readFileSync('./productos.json', 'utf-8'))

app.get('/products', async(req, res) => {
    try {
        let products = await fs.promises.readFile('./productos.json', 'utf-8')
        let parsedProducts = JSON.parse(products)
        const limit = parseInt(req.query.limit);
    
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
    try {
        let products = await fs.promises.readFile('./productos.json', 'utf-8')
        let parsedProducts = JSON.parse(products)
        const requestId = req.params.pid;

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
