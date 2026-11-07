const { createCanvas, loadImage } = require('canvas');

// ---- Determinar coordenadas del inicio de cada parte
// Brazos y mangas
const rightArmFront = { x: 44, y: 20 };
const rightSleeveFront = { x: 44, y: 36 };
const leftArmFront = { x: 36, y: 52 };
const leftSleeveFront = { x: 52, y: 52};
// Torso y chaqueta
const torsoFront =  { x: 20, y: 20 };
const jacketFront =  { x: 20, y: 36 };
// Piernas y pantalones
const rightLegFront =  { x: 4, y: 20 };
const rightPantsFront =  { x: 4, y: 36 };
const leftLegFront =  { x: 20, y: 52 };
const leftPantsFront = { x: 4,y: 52 };
// Cabeza y sombrero
const headFront = { x: 8, y: 8 };
const hatFront = { x: 40, y: 8 };


// ---- Vista Trasera
// Brazos y mangas traseras
const rightArmBack = { x: 52, y: 20 };
const rightSleeveBack = { x: 52, y: 36 };
const leftArmBack = { x: 44, y: 52 };
const leftSleeveBack = { x: 60, y: 52 };
// Torso y chaqueta trasera
const torsoBack = { x: 32, y: 20 };
const jacketBack = { x: 32, y: 36 };
// Piernas y pantalones traseros
const rightLegBack = { x: 12, y: 20 };
const rightPantsBack = { x: 12, y: 36 };
const leftLegBack = { x: 28, y: 52 };
const leftPantsBack = { x: 12, y: 52 };
// Cabeza y sombrero trasero
const headBack = { x: 24, y: 8 };
const hatBack = { x: 56, y: 8 };

function drawPart(destinationCanvas, skinImage, scale, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, mirror = false) {
    // Guarda la 'configuración' del canvas, ya que en las partes
    // traseras de la skin lo invertimos, si lo guardamos acá se puede
    // luego restaurar
    destinationCanvas.save();

    if (mirror) {
	// Movemos el punto de origen al borde derecho de la parte que queremos dibujar, así al invertir el canvas queda bien
	destinationCanvas.translate((destinationX + sourceWidth) * scale, destinationY * scale);

	// Invertimos horizontalmente
	destinationCanvas.scale(-1, 1);

	// Dibujamos en (0,0), relativo a nuestras coordenadas que
	// movimos e invertimos
	destinationCanvas.drawImage(skinImage, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth * scale, sourceHeight * scale);
    } else {
	// En el caso normal, es decir, cuando dibujamos la skin de
	// frente, no hace falta invertir ni mover el origen de
	// coordenadas, así que copiamos la imagen directamente en las
	// coordenadas destino, escalándola.
	destinationCanvas.drawImage(skinImage, sourceX, sourceY, sourceWidth, sourceHeight, destinationX * scale, destinationY * scale, sourceWidth * scale, sourceHeight * scale);
    }

    destinationCanvas.restore();
}


// Renderiza una skin. Recibe la imagen de la skin, si la skin es de
// tipo slim y la escala por la que se multiplacará la
// skin. Generalmente queremos escalar la imagen debido a que las
// skins de minecraft son imágenes muy chicas.
function renderFront(skinImage, isSlim, scale) {

    // Definimos el tamaño del canvas multiplicando el tamaño de una
    // skin rederizada normal por la escala
    const canvasWidth = 16 * scale;
    const canvasHeight = 32 * scale;

    // Creamos el canvas para armar la vista frontal
    const canvas = createCanvas(canvasWidth, canvasHeight);

    const context = canvas.getContext("2d");

    // Deshabilitar el anti-aliasing para que no se ponga borroso
    context.imageSmoothingEnabled = false;

    // Guardar ancho de los brazos
    const armWidth = isSlim ? 3 : 4;

    // Dibujamos ahora cada una de las partes

    // Cabeza: Tamaño 8x8, dibujamos en (4,0)
    drawPart(context, skinImage, scale, headFront.x, headFront.y, 8, 8, 4, 0);
    drawPart(context, skinImage, scale, hatFront.x, hatFront.y, 8, 8, 4, 0);

    // Torso: Tamaño 8x12, dibujamos en (4, 8)
    drawPart(context, skinImage, scale, torsoFront.x, torsoFront.y, 8, 12, 4, 8, false);
    drawPart(context, skinImage, scale, jacketFront.x, jacketFront.y, 8, 12, 4, 8);

    // Brazo derecho: Tamaño 4x12 o 3x12, dibujamos en (0,8) o en
    // (1,8) dependiendo el ancho
    drawPart(context, skinImage, scale, rightArmFront.x, rightArmFront.y, armWidth, 12, isSlim ? 1 : 0, 8);
    drawPart(context, skinImage, scale, rightSleeveFront.x, rightSleeveFront.y, armWidth, 12, isSlim ? 1 : 0, 8);

    // Brazo izquierdo: Tamaño 4x12 o 3x12, dibujamos en (12,8)
    drawPart(context, skinImage, scale, leftArmFront.x, leftArmFront.y, armWidth, 12, 12, 8);
    drawPart(context, skinImage, scale, leftSleeveFront.x, leftSleeveFront.y, armWidth, 12, 12, 8);

    // Piernas: Tamaño 4x12, dibujamos en (4, 20) y (8, 20)
    drawPart(context, skinImage, scale, rightLegFront.x, rightLegFront.y, 4, 12, 4, 20);
    drawPart(context, skinImage, scale, rightPantsFront.x, rightPantsFront.y, 4, 12, 4, 20);
    drawPart(context, skinImage, scale, leftLegFront.x, leftLegFront.y, 4, 12, 8, 20);
    drawPart(context, skinImage, scale, leftPantsFront.x, leftPantsFront.y, 4, 12, 8, 20);

    return canvas.toBuffer('image/png');
}

function renderBack(skinImage, isSlim, scale) {

    // Definimos el tamaño del canvas multiplicando el tamaño de una
    // skin rederizada normal por la escala
    const canvasWidth = 16 * scale;
    const canvasHeight = 32 * scale;

    // Creamos el canvas para armar la vista frontal
    const canvas = createCanvas(canvasWidth, canvasHeight);

    const context = canvas.getContext("2d");

    // Deshabilitar el anti-aliasing para que no se ponga borroso
    context.imageSmoothingEnabled = false;

    // Guardar ancho de los brazos
    const armWidth = isSlim ? 3 : 4;

    // Dibujamos ahora cada una de las partes

    // Cabeza: Tamaño 8x8, dibujamos en (4,0)
    drawPart(context, skinImage, scale, headBack.x, headBack.y, 8, 8, 4, 0);
    drawPart(context, skinImage, scale, hatBack.x, hatBack.y, 8, 8, 4, 0);

    // Torso: Tamaño 8x12, dibujamos en (4, 8)
    drawPart(context, skinImage, scale, torsoBack.x, torsoBack.y, 8, 12, 4, 8);
    drawPart(context, skinImage, scale, jacketBack.x, jacketBack.y, 8, 12, 4, 8);

    // Brazo derecho: Tamaño 4x12 o 3x12, dibujamos en (0,8) o en
    // (1,8) dependiendo el ancho
    drawPart(context, skinImage, scale, isSlim ? rightArmBack.x -1 : rightArmBack.x, rightArmBack.y, armWidth, 12, 12, 8);
    drawPart(context, skinImage, scale, isSlim ? rightSleeveBack.x - 1 : rightSleeveBack.x, rightSleeveBack.y, armWidth, 12, isSlim ? 1 : 12, 8);
    // Brazo izquierdo: Tamaño 4x12 o 3x12, dibujamos en (12,8)
    drawPart(context, skinImage, scale, isSlim ? leftArmBack.x - 1 : leftArmBack.x, leftArmBack.y, armWidth, 12, isSlim ? 1 : 0, 8);
    drawPart(context, skinImage, scale, isSlim ? leftSleeveBack.x - 1 : leftSleeveBack.x, leftSleeveBack.y, armWidth, 12, isSlim ? 1 : 0, 8);

    // Piernas: Tamaño 4x12, dibujamos en (4, 20) y (8, 20)
    drawPart(context, skinImage, scale, rightLegBack.x, rightLegBack.y, 4, 12, 8, 20);
    drawPart(context, skinImage, scale, rightPantsBack.x, rightPantsBack.y, 4, 12, 8, 20);
    drawPart(context, skinImage, scale, leftLegBack.x, leftLegBack.y, 4, 12, 4, 20);
    drawPart(context, skinImage, scale, leftPantsBack.x, leftPantsBack.y, 4, 12, 4, 20);

    return canvas.toBuffer('image/png');
}

module.exports = {renderFront, renderBack};
