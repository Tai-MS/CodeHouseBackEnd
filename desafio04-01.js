const { json } = require('express/lib/response')
const fs = require('fs')
const { title } = require('process')

class ProductManager{
    constructor(){
        this.products = []
        this.path = './productos.json'
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
        if(!title || !description || !price || !thumbnail || !code || !stock){
            return "Todos los campos son obligatorios"
        }
        const repeatedCode = this.products.findIndex(product => product.code === code)
        //Si el codigo de producto NO esta repetido, lo agregara al array
        //de lo contrario devolvera un error
        if(repeatedCode === -1){
            this.products.push(newProduct)
            //Transforme el array en formato JSON
            //Luego modifica el archivo .JSON
            let newProductStr = JSON.stringify(this.products, null, 2)
            fs.writeFileSync(this.path, newProductStr)
            return 'Product added'
        }else{
            return "Error. The product code already exists"
        }
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path)
    
            this.products = JSON.parse(data)
            console.log("Archivo leido");
        } catch (error) {
            console.error("Error al leer el archuvo")
            if(error.errno === -4058) console.error("El archivo no existe")
            else console.error(error)
        }
        return this.products
    }


    getProductById(id){
        //Busca el id ingresado por el usuario entre los elementos de la clase "products"
        //si encuentra una coincidencia, la devolvera por consola, de lo contrario dirá "Not found"
        const idCoincidence = this.products.findIndex(evento => evento.id === id)
        if(idCoincidence === -1){
            return "Product not found"
        }else{
            console.log('The chosen product is: ');
            return (this.products[idCoincidence])
        }
    }

    async updateProduct(id, updatedFields) {
        const idCoincidence = this.products.findIndex(evento => evento.id === id);
        //Si el resultado de la variable idCoincidence es -1 siginifica que no se encontro
        //El id proporcionado, si el id es encontrado se ejecutara el intento de 
        //modificación del objeto 
        if (idCoincidence === -1) {
            return "Not found";
        } else {
            try {
                //Variable que guarda el producto que este en dicho indice
                let selectedProduct = this.products[idCoincidence];
                // Actualiza todas las propiedades proporcionadas en updatedFields
                Object.assign(selectedProduct, updatedFields);
                //Convierte el string a formato JSON
                const updatedProductsStr = JSON.stringify(this.products, null, 2);
                //Escribe en el archivo JSON la variable proporcionada
                fs.promises.writeFile(this.path, updatedProductsStr);
                console.log(this.products[idCoincidence]);
                return `The product with the ID ${id} was successfully modified.`
            } catch (error) {
                return `Error updating the product. Error: ${error}`;
            }
        }
    }

    async deleteProduct(id) {
        const idCoincidence = this.products.findIndex(evento => evento.id === id);
    
        if (idCoincidence === -1) {
            return "Not found";
        } else {
            this.products.splice(idCoincidence, 1);
    
            try {
                //Lee el contenido del JSON y luego lo transforma a un string
                const fileContent = await fs.promises.readFile(this.path, 'utf-8');
                const data = JSON.parse(fileContent);
                //Busca y devuelve los elementos q no coinciden con el argumento ID pasado a la función
                const updatedData = data.filter(product => product.id !== id);
                //Reescribe el JSON con los productos que quedaran en él
                await fs.promises.writeFile(this.path, JSON.stringify(updatedData, null, 2));
                // console.log(this.products);
                return `Product with the ID ${id} succesfully deleted`;
            } catch (error) {
                return `Error deleting the product. Error: ${error}`;
            }
        }
    }
}

const productManager = new ProductManager()
console.log(productManager.getProducts())
console.log(productManager.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25));
console.log(productManager.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25));
console.log(productManager.addProduct("segundo producto prueba", "Este es el segundo producto de prueba", 400, "Sin imagen", "def456", 50));
console.log("----------------------------------- \n Test getProducts\n-----------------------------------");
console.log(productManager.getProducts())
console.log("----------------------------------- \n Test getProductById\n-----------------------------------");
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(3));
console.log("----------------------------------- \n Test updateProduct\n-----------------------------------");
console.log(productManager.updateProduct(1, {title: "Este producto ha sido modificado", stock: 0}));
console.log(productManager.updateProduct(3, {title:"Este id no existe"}));
console.log("----------------------------------- \n Test deleteProduct\n-----------------------------------");
productManager.deleteProduct(1)
    .then(result => console.log(result))
    .catch(error => console.error(error));

productManager.deleteProduct(3)
    .then(result => console.log(result))
    .catch(error => console.error(error));
