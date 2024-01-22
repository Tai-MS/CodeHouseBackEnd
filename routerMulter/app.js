import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'

const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT, ()=>{
    console.log(`Server listening at port ${PORT}`);
})