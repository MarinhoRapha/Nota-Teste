const modalGaleria = document.getElementById("modalGaleria");
const imagemModal = document.getElementById("imagemModal");
const tituloGaleria = document.getElementById("tituloGaleria");
const contadorImagens = document.getElementById("contadorImagens");

const fecharModal = document.getElementById("fecharModal");
const imagemAnterior = document.getElementById("imagemAnterior");
const imagemProxima = document.getElementById("imagemProxima");

let imagensAtuais = [];
let indiceAtual = 0;


/* ===========================================
    Atualiza a imagem exibida
=========================================== */

function mostrarImagem() {

    imagemModal.src = imagensAtuais[indiceAtual];

    contadorImagens.textContent =
        `${indiceAtual + 1} de ${imagensAtuais.length}`;

    const possuiVariasImagens = imagensAtuais.length > 1;

    imagemAnterior.style.display =
        possuiVariasImagens ? "block" : "none";

    imagemProxima.style.display =
        possuiVariasImagens ? "block" : "none";
}


/* ===========================================
    Abre a galeria
=========================================== */

function abrirGaleria(elemento) {

    imagensAtuais = elemento.dataset.images
        .split(",")
        .map(imagem => imagem.trim())
        .filter(Boolean);

    if (imagensAtuais.length === 0) {
        return;
    }

    indiceAtual = 0;

    tituloGaleria.textContent =
        elemento.dataset.titulo || "Imagens do item";

    modalGaleria.classList.add("aberto");
    modalGaleria.setAttribute("aria-hidden", "false");

    mostrarImagem();
}


/* ===========================================
    Fecha a galeria
=========================================== */

function fecharGaleria() {

    modalGaleria.classList.remove("aberto");
    modalGaleria.setAttribute("aria-hidden", "true");

}


/* ===========================================
    Clique nas imagens e botões
=========================================== */

document
    .querySelectorAll(".abrir-galeria")
    .forEach(function (elemento) {

        elemento.addEventListener("click", function () {

            abrirGaleria(elemento);

        });

    });


/* ===========================================
    Próxima imagem
=========================================== */

imagemProxima.addEventListener("click", function () {

    indiceAtual++;

    if (indiceAtual >= imagensAtuais.length) {

        indiceAtual = 0;

    }

    mostrarImagem();

});


/* ===========================================
    Imagem anterior
=========================================== */

imagemAnterior.addEventListener("click", function () {

    indiceAtual--;

    if (indiceAtual < 0) {

        indiceAtual = imagensAtuais.length - 1;

    }

    mostrarImagem();

});


/* ===========================================
    Fechar pelo X
=========================================== */

fecharModal.addEventListener("click", fecharGaleria);


/* ===========================================
    Clique fora da janela
=========================================== */

modalGaleria.addEventListener("click", function (evento) {

    if (evento.target === modalGaleria) {

        fecharGaleria();

    }

});


/* ===========================================
    Teclas do teclado
=========================================== */

document.addEventListener("keydown", function (evento) {

    if (!modalGaleria.classList.contains("aberto")) {
        return;
    }

    switch (evento.key) {

        case "Escape":

            fecharGaleria();
            break;

        case "ArrowRight":

            if (imagensAtuais.length > 1) {

                indiceAtual++;

                if (indiceAtual >= imagensAtuais.length) {
                    indiceAtual = 0;
                }

                mostrarImagem();

            }

            break;

        case "ArrowLeft":

            if (imagensAtuais.length > 1) {

                indiceAtual--;

                if (indiceAtual < 0) {
                    indiceAtual = imagensAtuais.length - 1;
                }

                mostrarImagem();

            }

            break;

    }

});