const preguntas = [
  {
    pregunta: '¿Cuál es la capital de Francia?',
    opciones: ['Madrid', 'París', 'Berlín', 'Londres'],
    indiceCorrecto: 1,
  },
  {
    pregunta: '¿En qué año se fundó Google?',
    opciones: ['1995', '2000', '2004', '1998'],
    indiceCorrecto: 3,
  },
  {
    pregunta: '¿Cuál es el río más largo del mundo?',
    opciones: ['Amazonas', 'Nilo', 'Misisipi', 'Yangtsé'],
    indiceCorrecto: 0,
  },
  {
    pregunta: '¿Cuántos continentes hay en el mundo?',
    opciones: ['4', '6', '7', '5'],
    indiceCorrecto: 2,
  },
  {
    pregunta: '¿Quién escribió "Cien años de soledad"?',
    opciones: ['Julio Cortázar', 'Mario Vargas Llosa', 'Gabriel García Márquez', 'Isabel Allende'],
    indiceCorrecto: 2,
  },
];

const elementoPregunta = document.getElementById('pregunta');
const contenedorOpciones = document.getElementById('contenedor-opciones');
const elementoPuntuacion = document.getElementById('valor-puntuacion');

let indicePreguntaActual = 0;
let puntuacion = 0;
let respuestasUsuario = [];

function cargarPregunta() {
  const preguntaActual = preguntas[indicePreguntaActual];
  elementoPregunta.textContent = preguntaActual.pregunta;

  contenedorOpciones.innerHTML = '';

  preguntaActual.opciones.forEach((opcion, indice) => {
    const boton = document.createElement('button');
    boton.textContent = opcion;
    boton.addEventListener('click', () => verificarRespuesta(indice));
    contenedorOpciones.appendChild(boton);
  });
}

function volverAInicio() {
  window.location.href = "index.html";
}


function verificarRespuesta(indiceOpcionSeleccionada) {
  const preguntaActual = preguntas[indicePreguntaActual];

  respuestasUsuario.push(indiceOpcionSeleccionada);

  const botonesOpciones = contenedorOpciones.querySelectorAll('button');
  botonesOpciones.forEach((boton, indice) => {
    if (indice === preguntaActual.indiceCorrecto) {
      boton.style.backgroundColor = '#4caf50';
    } else {
      boton.style.backgroundColor = '#ff5252';
    }

    boton.disabled = true;
  });

  if (indiceOpcionSeleccionada === preguntaActual.indiceCorrecto) {
    puntuacion++;
  }

  indicePreguntaActual++;

  if (indicePreguntaActual < preguntas.length) {
    setTimeout(cargarPregunta, 1000);
  } else {
    finDelJuego();
  }

  actualizarPuntuacion();
}

function actualizarPuntuacion() {
  elementoPuntuacion.textContent = puntuacion;
}

function finDelJuego() {
  elementoPregunta.textContent = 'Juego terminado. ¡Tu puntuación es ' + puntuacion + '!';
  contenedorOpciones.innerHTML = '';

  preguntas.forEach((pregunta, indice) => {
    const indiceRespuestaUsuario = respuestasUsuario[indice];
    const indiceRespuestaCorrecta = pregunta.indiceCorrecto;

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('resultado');

    const textoPregunta = document.createElement('p');
    textoPregunta.textContent = pregunta.pregunta;
    resultadoDiv.appendChild(textoPregunta);

    const textoRespuestaUsuario = document.createElement('p');
    textoRespuestaUsuario.textContent = `Tu respuesta: ${pregunta.opciones[indiceRespuestaUsuario]}`;
    resultadoDiv.appendChild(textoRespuestaUsuario);

    const textoRespuestaCorrecta = document.createElement('p');
    textoRespuestaCorrecta.textContent = `Respuesta correcta: ${pregunta.opciones[indiceRespuestaCorrecta]}`;
    resultadoDiv.appendChild(textoRespuestaCorrecta);

    contenedorOpciones.appendChild(resultadoDiv);
  });

  // Mostrar el botón de reinicio al final del juego
  const botonReinicio = document.getElementById('boton-reinicio');
  botonReinicio.style.display = 'block';
}

function reiniciarJuego() {
  indicePreguntaActual = 0;
  puntuacion = 0;
  respuestasUsuario = [];
  contenedorOpciones.innerHTML = '';
  cargarPregunta();
  actualizarPuntuacion();

  const botonReinicio = document.getElementById('boton-reinicio');
  botonReinicio.style.display = 'none';
}


cargarPregunta();


