const uploadForm = document.getElementById('upload-form');
const uploadStatus = document.getElementById('upload-status');

// Convertir el archivo a base64 para enviarlo en el JSON
const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        const result = String(reader.result || '');
        const base64 = result.includes(',') ? result.split(',')[1] : result;
        resolve(base64);
    };
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsDataURL(file);
});

if (uploadForm) {
    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        uploadStatus.textContent = 'Subiendo skin...';

        const formData = new FormData(uploadForm);
        const skinFile = formData.get('skinImage');

        if (!(skinFile instanceof File) || !skinFile.size) {
            uploadStatus.textContent = 'Selecciona un archivo PNG válido.';
            return;
        }

        try {
            const skinImage = await fileToBase64(skinFile);
            const payload = {
                displayName: String(formData.get('displayName') || '').trim(),
                description: String(formData.get('description') || '').trim(),
                isSlim: formData.get('isSlim') === 'on',
                skinImage,
            };

            const API_URL = '/api/posts/';
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const postData = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(postData.message || postData.error || `Error ${response.status}`);
            }

            uploadStatus.innerHTML = `Skin subida correctamente. <a href="/skin/${postData.id}">Ver skin</a>`;
            uploadForm.reset();
        } catch (error) {
            uploadStatus.textContent = error.message || 'Ocurrió un error al subir la skin.';
        }
    });
}
