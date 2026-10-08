// Leer de la URL que pixelskin pidió (lo que va después en ?skin=)
const params = new URLSearchParams(window.location.search);
const id = params.get("skin");

// Asigna skin sobre la lista skins.js
const skin = skins[id];

if (skin) {
    // Rellena la página con sus datos
    document.title = skin.nombre + " | PixelSkin";
    document.getElementById("skin-img").src = skin.imagen;
    document.getElementById("skin-img").alt = "skin de " + skin.nombre;
    document.getElementById("skin-nombre").textContent = skin.nombre;
    document.getElementById("skin-fecha").textContent = skin.fecha;
    document.getElementById("skin-descripcion").textContent = skin.descricion;

    const lista = document.getElementById("skin-etiquetas");
    skin.etiquetas.forEach(function (etiqueta) {
        const li = document.createElement("li");
        li.textContent = etiqueta;
        lista.appendChild(li);
    })
}