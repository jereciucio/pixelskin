
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

    const postData  = await getPost(lastURLSegment);

    if (postData) {
	document.title = postData.displayName + " | PixelSkin";
	document.getElementById("skin-img-front").src = `data:${postData.skinPreviewFront.contentType};base64,${postData.skinPreviewFront.data}`;
	document.getElementById("skin-img-back").src = `data:${postData.skinPreviewBack.contentType};base64,${postData.skinPreviewBack.data}`
	document.getElementById("skin-nombre").textContent = postData.displayName;
	document.getElementById("skin-descripcion").textContent = postData.description;
    }
}

loadPost()
