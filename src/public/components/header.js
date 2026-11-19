const headerContainer = document.querySelector("#header-container");

headerContainer.innerHTML =  `
<header>
        <nav>
            <div class="login">
                <a class="nav_link" href="Login">Iniciar sesión</a>
                <a class="nav_link_register" href="Sign in">Registrarse</a>
            </div>
        </nav>
    </header>

    <div id="title-container">
        <!-- Aca va el TITULO-->
        <a href="/"><img id="title-image" src="/images/logo_full.png" alt="Título de Pixelskin"></a>
    </div>
    <nav>
        <!--ACA VA EL BUSCADOR-->
        <search class="buscador">
            <label>
                <input type="search" id="query" placeholder="Buscar por Nombre/Tag" />
            </label>
            <button type="submit">Buscar</button>
            <section>
                <ul id="results">
                    <!-- search result content-->
                </ul>
                <output id="no-result">
                    <!-- no results content -->
                </output>
            </section>
        </search>
    </nav>
`
