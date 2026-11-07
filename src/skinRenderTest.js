const fs = require('fs');
const path = require('path');
const { loadImage } = require('canvas');

const { renderFront , renderBack} = require('./services/skinRenderer');

async function runTest() {
    try {

	const skinPath = path.join(__dirname, 'test_skin.png');

	if (!fs.existsSync(skinPath)) {
	    console.error(`Error: No se pudo encontrar una skin en "${skinPath}". Colocar una skin 64x64 en esa ruta.`);
	    return;
	}

	console.log('Cargando imagen...');

	// Cargar el buffer de archivo en un canvas
	const skinBuffer = fs.readFileSync(skinPath);
	const skinImage = await loadImage(skinBuffer);

	// Opciones de la skin, si es slim y el factor por el cual
	// escalar la imagen final
	const isSlim = false;
	const scale = 128;

	// Llamar renderizador
	const frontBuffer = renderFront(skinImage, isSlim, scale);
	const backBuffer = renderBack(skinImage, isSlim, scale);

	// Guardar resultado en disco
	const outputPathFront = path.join(__dirname, 'output-front-test.png');
	fs.writeFileSync(outputPathFront, frontBuffer);
	console.log(`Generada vista frontal en: ${outputPathFront}`);
	const outputPathBack = path.join(__dirname, 'output-back-test.png');
	fs.writeFileSync(outputPathBack, backBuffer);
	console.log(`Generada vista trasera en: ${outputPathBack}`);



    } catch (error) {
	console.error('Un error ocurrió en el test:', error);
  }
}

runTest();
