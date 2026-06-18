
function verseccion(idseccion) {
  
  const modulos = [
    
    'modulo-cafe',
    
    'modulo-proveedor',
    
    'modulo-cliente',
    
    'modulo-compra-venta'
    
  ];
  
  modulos.forEach(id => {
    
    const elemento = document.getElementById(id);
    
    if (elemento) {
      
      if (id === idseccion) {
        
        elemento.style.display = 'block';
      }
      
      else {
        
        elemento.style.display = 'none';
        
      }
      
    }
    
  }
    
  );
  
}

window.onload = function() {
  verseccion('modulo-cafe');
  
};

document.getElementById('btn-guardar-proveedor').addEventListener('click', function() {
  
    const nombre = document.getElementById('proveedor-nombre').value;
    
    const rif = document.getElementById('proveedor-rif').value;
    
    const telefono = document.getElementById('proveedor-telefono').value;

    if (nombre === '' || rif === '' || telefono === '') {
      
        alert('Por favor, rellene todos los campos del proveedor');
        
    } else {
      
        alert('Proveedor guardado con éxito:\n' + nombre + ' - ' + rif);
        
        document.getElementById('proveedor-nombre').value = '';
        
        document.getElementById('proveedor-rif').value = '';
        
        document.getElementById('proveedor-telefono').value = '';
        
    }
    
});

document.getElementById('btn-guardar-cliente').addEventListener('click', function() {
  
    const nombre = document.getElementById('cliente-nombre').value;
    
    const cedula = document.getElementById('cliente-cedula').value;
    
    const telefono = document.getElementById('cliente-telefono').value;

    if (nombre === '' || cedula === '' || telefono === '') {
      
        alert('Por favor, rellene todos los campos del cliente');
        
    } else {
      
        alert('Cliente guardado con éxito:\n' + nombre + ' - ' + cedula);
        
        document.getElementById('cliente-nombre').value = '';
        
        document.getElementById('cliente-cedula').value = '';
        
        document.getElementById('cliente-telefono').value = '';
        
    }
    
});

document.getElementById('btn-guardar-lote').addEventListener('click', 

function() {
  
    const tipo = document.getElementById('cafe-tipo').value;
    
    const cantidad = document.getElementById('cafe-cantidad').value;

    if (tipo === '' || cantidad === '') {
      
        alert('Por favor, rellene todos los campos para registrar la compra del lote');
        
    } else {
      
        alert('Lote de compra registrado con éxito:\nCafé Arauca (' + tipo + ') - ' + cantidad + ' kg');
        
        document.getElementById('cafe-tipo').value = '';
        
        document.getElementById('cafe-cantidad').value = '';
        
    }
    
});

