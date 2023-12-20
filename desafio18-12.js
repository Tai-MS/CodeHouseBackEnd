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
        //Si alguno de los campos esta vacio, devuelve un error
        if(!title || !description || !price || !thumbnail || !code || !stock){
            return "All fields must be filled"
        }
        const repeatedCode = this.products.findIndex(product => product.code === code)
        //Si el codigo de producto NO esta repetido, lo agregara al array
        //de lo contrario devolvera un error
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
        //Busca el id ingresado por el usuario entre los elementos de la clase "products"
        //si encuentra una coincidencia, la devolvera por consola, de lo contrario dirá "Not found"
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
console.log(productManager.addProduct( "Este es un producto de prueba", 200, "Sin imagen", "abc123",25 ));
console.log(productManager.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123",25 ));
console.log(productManager.getProducts());
console.log(productManager.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123",25 ));
console.log(productManager.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "def456",25 ));
console.log(productManager.getProducts());
console.log(productManager.getProductById());
console.log(productManager.getProductById(2));


