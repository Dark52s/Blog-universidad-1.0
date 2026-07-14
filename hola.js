const libro = {
    nombre: "La biografia de Marcus Person",
    autor: "Marcus Person",
    precio: 10.5,
    
    vender() {
        console.log("Se ha vendido el libro a " + this.precio + "$");
        
    }
}

libro.vender();