class ProductManager{
    constructor(){
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code,stock){
        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const repeatedCode = this.products.findIndex(product => product.code === code)
        // return repeatedCode
        if(repeatedCode === -1){
            this.products.push(newProduct)
        }else{
            return "Error. The product code already exists"
        }
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const idCoincidence = this.products.findIndex(evento => evento.id === id)
        if(idCoincidence === -1){
            return "Not found"
        }else{
            return this.products[idCoincidence]
        }

    }
}

const productManager = new ProductManager()
console.log(productManager.getProducts());
console.log(productManager.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123",25 ));
console.log(productManager.getProducts());
console.log(productManager.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123",25 ));
console.log(productManager.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "def456",25 ));
console.log(productManager.getProducts());
console.log(productManager.getProductById());
console.log(productManager.getProductById(2));


