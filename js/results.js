/*
=================================
 GODINÓMETRO v1.0

 MOTOR DE RESULTADOS

=================================
*/


// Recuperar resultado

const savedResult =
JSON.parse(localStorage.getItem("godinometro_result"));



// Si no existe resultado

if(!savedResult){

    window.location.href="index.html";

}



// Datos

const score = savedResult.score;




// Elementos

const levelElement =
document.getElementById("godin-level");


const scoreElement =
document.getElementById("score");


const progress =
document.getElementById("result-progress");


const badgesContainer =
document.getElementById("badges-container");


const messageElement =
document.getElementById("godin-message");


const codeElement =
document.getElementById("result-code");




// ===============================
// Calcular nivel
// ===============================


let level="";

let badges=[];

let code="";





if(score <= 20){


    level="🟢 Godín en entrenamiento";


    badges=[

        "🌱 Sobreviviente inicial",

        "☕ Café pendiente",

        "📚 Aprendiz corporativo"

    ];


    code="GDN-"+score+"-NEW";


}



else if(score <=40){


    level="🔵 Godín junior";


    badges=[

        "📧 Usuario de correo",

        "☕ Primer café",

        "🖥️ Conoce Excel"

    ];


    code="GDN-"+score+"-JUN";


}



else if(score <=60){


    level="🟡 Godín corporativo";


    badges=[

        "📊 Excel básico",

        "📅 Sobrevive reuniones",

        "☕ Café frecuente"

    ];


    code="GDN-"+score+"-COR";


}



else if(score <=80){


    level="🟠 Maestro Godín";


    badges=[

        "📈 Excel avanzado",

        "🔥 Apaga incendios",

        "📅 Guerrero de juntas"

    ];


    code="GDN-"+score+"-PRO";


}



else{


    level="🔴 Godín Supremo";


    badges=[

        "👑 Maestro del Excel",

        "☕ Café nivel máximo",

        "📅 Sobreviviente de reuniones"

    ];


    code="GDN-"+score+"-LEG";


}





// ===============================
// Frases
// ===============================


const messages=[


"Tu calendario tiene más reuniones que espacios libres.",


"Excel te reconoce cuando abres la computadora.",


"Tu café probablemente tiene horario laboral.",


"Teams sabe cuándo estás disponible.",


"Has desbloqueado el modo supervivencia corporativa.",


"Tu bandeja de entrada tiene historias que contar."



];



const randomMessage =
messages[
Math.floor(Math.random()*messages.length)
];




// ===============================
// Mostrar datos
// ===============================



scoreElement.textContent =
score+"%";



levelElement.textContent =
level;



messageElement.textContent =
randomMessage;



codeElement.textContent =
code;



setTimeout(()=>{


    progress.style.width =
    score+"%";


},300);





// Insignias


badges.forEach((badge)=>{


    const span =
    document.createElement("span");


    span.className="badge";


    span.textContent=badge;



    badgesContainer.appendChild(span);



});

// Cargar la animación del trofeo
const animationContainer = document.getElementById('trophy-animation');

if (animationContainer) {
    const animation = lottie.loadAnimation({
        container: animationContainer, // el contenedor
        renderer: 'svg',               // 'svg', 'canvas' o 'html'
        loop: true,                    // repetir
        autoplay: true,               // comenzar automáticamente
        path: 'assets/Champion.json'  // ruta a tu archivo JSON
    });

    // Opcional: cuando termine la animación (si no está en loop)
    animation.addEventListener('complete', () => {
        console.log('Animación terminada');
    });
}

// ===============================
// Función para descargar el resultado como imagen
// ===============================
function downloadResult() {
    const card = document.getElementById('result-card');
    const animation = document.getElementById('trophy-animation');

    // Si existe animación, pausarla para que no interfiera
    let animInstance = null;
    if (animation) {
        // Buscar la instancia de Lottie (si la guardaste globalmente)
        // O podemos intentar obtenerla desde el contenedor
        // Si la tienes en una variable global, úsala. Si no, la buscamos.
        // Como la cargamos con lottie.loadAnimation, podemos asignarla a una variable global.
        // Por simplicidad, vamos a buscar el elemento y detener momentáneamente su renderizado.
        // En lugar de pausar, podemos ocultar la animación y mostrar una imagen estática? No.
        // Mejor pausamos.
        // Necesitamos la instancia. La guardaremos en una variable global cuando cargue.
        // Supongamos que tenemos window.animInstance.
        if (window.animInstance) {
            window.animInstance.pause();
        }
    }

    // Capturar la tarjeta
    htmlToImage.toPng(card)
        .then(function (dataUrl) {
            // Crear enlace de descarga
            const link = document.createElement('a');
            link.download = `godinometro-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();

            // Reanudar animación después de descargar
            if (window.animInstance) {
                window.animInstance.play();
            }
        })
        .catch(function (error) {
            console.error('Error al capturar la imagen:', error);
            alert('Hubo un error al generar la imagen. Intenta de nuevo.');
            // Reanudar animación en caso de error también
            if (window.animInstance) {
                window.animInstance.play();
            }
        });
}