const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const textareas = document.querySelectorAll('#formulario textarea');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,13}$/, // 7 a 14 numeros.
    mensaje: /^\s*$/ // controlar si esta vacio

}

const campos = {
    nombre: false,
    correo: false,
    telefono: false,
    mensaje: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');            
        break;
    
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
        break;
    
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono')
        break

        case "mensaje":
            validarCampo(expresiones.mensaje, e.target, 'mensaje')
        break
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('quitar-icono');
        document.querySelector(`#grupo__${campo} i`).classList.add('mostrar-icono');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('mostrar-icono');
        document.querySelector(`#grupo__${campo} i`).classList.add('quitar-icono');
        campos[campo] = false;
    }           
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

textareas.forEach((textarea) => {
     textarea.addEventListener('keyup', validarmensaje);
     textarea.addEventListener('blur', validarmensaje);
})

function validarmensaje() {
    let campoInput = document.getElementById("mensaje");
    let campo = campoInput.value.trim();
    
    if (!campo || campo.length < 3) {
        document.getElementById('grupo__mensaje').classList.add('formulario__grupo-incorrecto');
        document.querySelector('#grupo__mensaje i').classList.add('quitar-icono');
        document.querySelector('#grupo__mensaje i').classList.remove('mostrar-icono');
        campos['mensaje'] = false;
    } else {
        document.getElementById('grupo__mensaje').classList.remove('formulario__grupo-incorrecto');
        document.querySelector('#grupo__mensaje i').classList.add('mostrar-icono');
        document.querySelector('#grupo__mensaje i').classList.remove('quitar-icono');
        campos['mensaje'] = true;
    }
  }

formulario.addEventListener('submit', (e) => {
    e.preventDefault();


    if(campos.nombre && campos.correo && campos.telefono && campos.mensaje) {       
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000)

        document.querySelector('#grupo__mensaje i').classList.add('quitar-icono');
        document.querySelector('#grupo__nombre i').classList.add('quitar-icono');
        document.querySelector('#grupo__correo i').classList.add('quitar-icono');
        document.querySelector('#grupo__telefono i').classList.add('quitar-icono');
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo')

        campos.nombre = false;
        campos.correo = false;
        campos.telefono = false;
        campos.mensaje = false
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
    }
})

//API

document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos de la lista y el botón
    const exchangeList = document.getElementById('exchangeList');
    const exchangeButton = document.getElementById('exchangeButton');

    // Función para mostrar los valores de cambio al hacer clic en el botón
    const showExchangeValues = () => {
      // Realizar la solicitud HTTP GET a la API
    fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
        .then(response => response.json())
        .then(data => {
          // Limpiar la lista antes de mostrar los nuevos resultados
        exchangeList.innerHTML = '';

          // Recorrer los resultados y agregarlos a la lista
        data.forEach(item => {
            const casa = item.casa;
            const nombre = casa.nombre;
            const venta = casa.venta;

            const li = document.createElement('li');
            li.textContent = `${nombre}: ${venta}`;
            exchangeList.appendChild(li);
        });
        })
        .catch(error => console.error(error));
    };

    // Agregar evento de clic al botón
    exchangeButton.addEventListener('click', showExchangeValues);
});