const footerContainer = document.querySelector('#footer-container');

footerContainer.innerHTML = `
    <footer>
        <div class="footer-flex-container">
            <div class="footer-entry">
                <h2 class="footer-heading"><img id="footer-img" src="./images/icono_alfabetoromano.png"
                        alt="Logo de Pixelskin"> Pixelskin</h2>
                Pixelskin sirve para buscar, descargar y subir aspectos (skins) personalizados para personajes de
                Minecraft de forma gratuita, utilizando su biblioteca comunitaria.
            </div>

            <div class="footer-entry">
                <h2 class="footer-heading">Contacto</h2>
                <ul class="footer-linklist">
                    <li><a class="footer-link" href="mailto:jeremias.martinez@est.fi.uncoma.edu.ar">
                            <i class="fa-solid fa-envelope"></i>
                            Jeremías Martinez
                        </a>
                    <li><a class="footer-link" href="mailto:lucas.sepulveda@est.fi.uncoma.edu.ar">
                            <i class="fa-solid fa-envelope"></i>
                            Lucas Sepúlveda
                        </a>
                    <li><a class="footer-link" href="mailto:jorge.ugarte@est.fi.uncoma.edu.ar">
                            <i class="fa-solid fa-envelope"></i>
                            Jorge Ugarte
                        </a>
                </ul>
            </div>

            <div class="footer-entry">
                <h2 class="footer-heading">Recursos</h2>
                <ul>
                    <li><a class="footer-link" href="https://github.com/jereciucio/pixelskin"><i
                                class="fa-brands fa-github"></i> GitHub</li></a>
                </ul>
            </div>
        </div>
    </footer>
`
