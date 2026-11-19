const postsContainer = document.querySelector('#posts-container');
const loader = document.querySelector('#loader');

let currentPage = 1;
const limit = 6;
let isLoading = false;
let hasMorePosts = true;

// Pedir los posts a la API
const getPosts = async (page, limit) => {
    const API_URL = `/api/posts/?page=${page}&limit=${limit}`;
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`Ocurrió un error ${response.status}`);
    }
    return await response.json();
};

const renderPosts = (posts) => {
    posts.forEach(post => {
        // Crea un contenedor con enlace y establece el enlace a la id del post
        const postElement = document.createElement('a');
        postElement.href = `./skin/${post.id}`;

        postElement.innerHTML = `
        <div class="card">
        <div class="skinrender-container">
        <img class="skinrender" src="data:${post.skinPreviewFront.contentType};base64,${post.skinPreviewFront.data}" alt="Vista frontal">
        <img class="skinrender" src="data:${post.skinPreviewBack.contentType};base64,${post.skinPreviewBack.data}" alt="Vista trasera">
        </div>
        <div class="container_card">
          <h4><b>${post.displayName}</b></h4>
        </div>
        </div>
        `;
        postsContainer.appendChild(postElement);
    });
};

const hideLoader = () => {
    if (loader) loader.classList.remove('show');
};

const showLoader = () => {
    if (loader) loader.classList.add('show');
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const loadPosts = async () => {
    if (!postsContainer || isLoading || !hasMorePosts) return;

    isLoading = true;
    showLoader();
    try {
        // Pequeño retraso para que el indicador de carga sea visible
        await wait(400);
        const posts = await getPosts(currentPage, limit);
        renderPosts(posts);

        if (posts.length < limit) {
            hasMorePosts = false;
        } else {
            currentPage++;
        }
    } catch (error) {
        console.error(error.message);
    } finally {
        isLoading = false;
        hideLoader();
    }
};

// Inicializar solo en páginas que muestran el listado de posts
if (postsContainer) {
    // Pedir mas posts cuando se scrollea cerca del fondo
    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 200) {
            loadPosts();
        }
    }, { passive: true });

    loadPosts();
}
