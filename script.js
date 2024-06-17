let palabras = [];
let palabraActual = '';
let errores = 0;
let maxErrores = 6;
let letrasAdivinadas = [];
let nocorrectas=[];

document.addEventListener('DOMContentLoaded', () => {
    fetch('ahorcado.json')
        .then(response => response.json())
        .then(data => {
            palabras = data.palabra;
        });
});

function startGame() {
	nocorrectas=[]
    const index = obtenerNumeroAleatorio() 
     //document.getElementById('word-index').value;
    if (index >= 0 && index < palabras.length) {
        palabraActual = palabras[index];
        letrasAdivinadas = Array(palabraActual.length).fill('_');
        errores = 0;
        document.getElementById('input-container').style.display = 'block';
        document.getElementById('nocorrectas').style.display = 'block';
        document.getElementById('chances').style.display = 'block';
        document.getElementById('nocorrectas').textContent = '';
        document.getElementById('chances').textContent = '';
        document.getElementById('word-display').textContent = letrasAdivinadas.join(' ');
        document.getElementById('message').textContent = '';
    } else {
        alert('Por favor ingresa una posición válida del array.');
    }
}
let letra ="";
function checkLetter() {
    letra = document.getElementById('letter-input').value.toLowerCase();
    document.getElementById('letter-input').value = '';
    if (letra && letra.length === 1) {
        if (palabraActual.includes(letra)) {
            for (let i = 0; i < palabraActual.length; i++) {
                if (palabraActual[i] === letra) {
                    letrasAdivinadas[i] = letra;
                }
            }
        } else {
        	
        	// aca escribe cada palabra errada
        // aca dice la cantidad de chance que le quedan y la escribe 
            errores++;
            nocorrectas.push(letra.toUpperCase());
            //alert(nocorrectas);
            document.getElementById('nocorrectas').textContent = `Erradas ${nocorrectas}`;
            document.getElementById('chances').textContent = `Solo tenes 6 chances y vas: ${errores}`;
            
        }
        document.getElementById('word-display').textContent = letrasAdivinadas.join(' ');
        if (!letrasAdivinadas.includes('_')) {
            document.getElementById('message').textContent = '¡Ganaste! para volver a jugar pulsar comenzar juego';
            document.getElementById('input-container').style.display = 'none';
            document.getElementById('nocorrectas').style.display = 'none';
            document.getElementById('chances').style.display = 'none';
        } else if (errores >= maxErrores) {
            document.getElementById('message').textContent = `¡Perdiste! La palabra era: ${palabraActual} para volver a jugar pulsar comenzar juego`;
            document.getElementById('input-container').style.display = 'none';
            document.getElementById('nocorrectas').style.display = 'none';
            document.getElementById('chances').style.display = 'none';
        }
    } else {
        alert('Por favor ingresa una letra válida.');
    }
}


function obtenerNumeroAleatorio() {
    return Math.floor(Math.random() * 50) + 1;
}

// Ejemplo de uso
//console.log(obtenerNumeroAleatorio());

