const postsContainer = document.querySelector('#posts-container');
const loader = document.querySelector('#loader');

// Pedir los posts a la API
const getPosts = async (page, limit) => {
    const API_URL = `/api/posts/?page=${page}&limit=${limit}`;

    const response = await fetch(API_URL);

    if(!response.ok) {
	throw new Error(`Ocurrió un error ${response.status}`);
    }
    return await response.json();
}

const renderPosts = (posts) => {
    posts.forEach(post => {
	// Crea un contenedor con enlace y establece el enlace a la id
	// del post
	const postElement = document.createElement("a");
	postElement.href = `./skin/${post.id}`;

	postElement.innerHTML =
	`
        <div class="card">
        <div class="skinrender-container">
        <img class="skinrender" src="data:${post.skinPreviewFront.contentType};base64,${post.skinPreviewFront.data}" alt="Vista frontal">
        <img class="skinrender" src="data:${post.skinPreviewBack.contentType};base64,${post.skinPreviewBack.data}" alt="Vista frontal">
        </div>
        <div class="container_card">
          <h4><b>${post.displayName}</b></h4>
        </div>
	</div>
        `
	postsContainer.appendChild(postElement);
    })
}

const hideLoader = () => {
    loader.classList.remove('show');
}

const showLoader = () => {
    loader.classList.add('show');
}

// Chequea si la API tiene más posts para retornar en el proximo llamado
const hasMorePosts = (page, limit, total) => {
    const startIndex = (page - 1) *  limit + 1;
    if (total == 0) {
	return true;
    } else {
	return startIndex < total;
    }
}

const loadPosts = async (page, limit) => {
    showLoader();
    try {
	// si hay mas posts para mostrar
	if (hasMorePosts(page, limit, total)) {
	    // Pedirle posts a la API
	    const response = await getPosts(page, limit);

	    // Mostrar los posts
	    renderPosts(response);

	    // Actualizar el total
	    total = response.length;
	}

    } catch (error) {
	console.log(error.message);
    } finally {
	hideLoader();
    }
}


let currentPage = 1;
const limit = 10;

// Guardamos el total de posts retornados por la API
let total = 0;

// Pedir mas posts cuando se scrollea hasta el fondo
window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 &&
        hasMorePosts(currentPage, limit, total)) {
        currentPage++;
        loadPosts(currentPage, limit);
    }
}, {
    passive: true
});


// Inicializamos
loadPosts(currentPage, limit)
