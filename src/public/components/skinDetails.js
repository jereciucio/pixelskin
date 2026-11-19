
const getPost = async (post) => {
    const API_URL = `/api/posts/${post}`;

    const response = await fetch(API_URL);

    if(!response.ok) {
	throw new Error(`Ocurrió un error ${response.status}`);
    }
    return await response.json();
}

var pageURL = window.location.href;
var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);


const loadPost = async () => {
    try {
        const postData = await getPost(lastURLSegment);

        if (postData) {
            document.title = postData.displayName + " | PixelSkin";
            document.getElementById("skin-img-front").src = `data:${postData.skinPreviewFront.contentType};base64,${postData.skinPreviewFront.data}`;
            document.getElementById("skin-img-back").src = `data:${postData.skinPreviewBack.contentType};base64,${postData.skinPreviewBack.data}`;
            document.getElementById("skin-nombre").textContent = postData.displayName;
            document.getElementById("skin-descripcion").textContent = postData.description;

            const downloadButton = document.getElementById("download-skin");
            if (downloadButton && postData.skinImage && postData.skinImage.data) {
		// Eliminar caracteres especiales de el nombre de la
		// skin que no pueden estar en el nombre de un archivo
                const safeName = (postData.displayName || "skin")
                    .replace(/[^a-z0-9_\-]+/gi, "_")
                    .replace(/^_+|_+$/g, "") || "skin";
                downloadButton.href = `data:${postData.skinImage.contentType};base64,${postData.skinImage.data}`;
                downloadButton.download = `${safeName}.png`;
                downloadButton.removeAttribute("aria-disabled");
            }
        }
    } catch (error) {
        console.error(error.message);
    }
}

loadPost()
