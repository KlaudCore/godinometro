/*
=================================
 GODINÓMETRO v1.0

 SISTEMA DE COMPARTIR

=================================
*/


// Librería para convertir HTML a imagen
// Se carga desde CDN más abajo



// ===============================
// Descargar tarjeta
// ===============================


function downloadResult(){


    const card =
    document.getElementById("result-card");



htmlToImage.toPng(card, {

    width: card.offsetWidth,

    height: card.offsetHeight,

    style: {

        transform: "none",

        margin: "0"

    }

})

    .then(function(dataUrl){


        const link =
        document.createElement("a");


        link.download =
        "mi-resultado-godinometro.png";


        link.href=dataUrl;


        link.click();


    })


    .catch(function(error){


        console.error(
            "Error generando imagen:",
            error
        );


        alert(
            "No pudimos generar la imagen 😢"
        );


    });


}





// ===============================
// Compartir LinkedIn
// ===============================


function shareLinkedin(){



    const score =
    document.getElementById("score")
    .textContent;



    const level =
    document.getElementById("godin-level")
    .textContent;




    const text = `

☕ Descubrí mi nivel en el Godinómetro.

Mi resultado:

${level}

Nivel Godín:
${score}


¿Cuánto Godín eres tú? 😂


👉 Próximamente más versiones.

#Godinometro #VidaGodin #Oficina

`;




    const url =

    "https://www.linkedin.com/sharing/share-offsite/?url="

    + encodeURIComponent(

        window.location.href

    );




    window.open(

        url,

        "_blank"

    );



}